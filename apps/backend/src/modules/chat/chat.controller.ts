import { FastifyReply, FastifyRequest } from "fastify"
import { type WebSocket } from "ws"

import { services } from "./chat.service"
import {
  CreateGroupInput,
  CreateMessageInput,
  LoadMoreMessagesInput,
} from "./chat.types"

interface WebSocketConnection {
  socket: WebSocket
  roomId: number
}

const connections = new Map<number, Set<WebSocketConnection>>()

async function roomChannel(connection: WebSocket, request: FastifyRequest) {
  const paramsRoomId = (request.params as { roomId: number }).roomId
  if (!paramsRoomId) {
    console.error(`Dont have roomId`)

    connection.close()
  }
  const roomId = Number(paramsRoomId)
  const user = request.user as TokenData
  console.log(`User connected to room: ${roomId}`)

  if (!connections.has(roomId)) {
    connections.set(roomId, new Set())
  }

  connections.get(roomId)?.add({ socket: connection, roomId })

  async function fetchRecentMessages(roomId: number, limit = 20) {
    return request.server.prisma.message.findMany({
      where: { roomId },
      orderBy: { createdAt: "desc" },
      take: limit,
    })
  }

  const recentMessages = await fetchRecentMessages(roomId)
  connection.send(
    JSON.stringify({ event: "recent_messages", messages: recentMessages }),
  )

  connection.on("message", async (data) => {
    try {
      const parsedData: CreateMessageInput | LoadMoreMessagesInput = JSON.parse(
        data.toString(),
      )

      switch (parsedData.event) {
        case "send_message":
          const chatMessage = await services.handleMassage(request.server, {
            message: parsedData.message,
            roomId,
            userId: user.userId,
          })
          for (const conn of connections.get(roomId) || []) {
            conn.socket.send(
              JSON.stringify({ event: "new_message", message: chatMessage }),
            )
          }
          break
        case "load_more_messages": {
          const { page = 1, limit = 20 } = parsedData
          const messages = await services.loadMoreMessages(request.server, {
            page,
            limit,
            roomId,
          })
          connection.send(JSON.stringify({ event: "more_messages", messages }))
          break
        }
      }
      // connection.send(JSON.stringify({ event: "new_message", chatMessage }))
    } catch (error) {
      console.error("Error processing WebSocket message:", error)
      connection.send(
        JSON.stringify({ error: "Invalid message format or server error" }),
      )
    }
  })

  connection.on("close", () => {
    connections.get(roomId)?.delete({ socket: connection, roomId })
    if (connections.get(roomId)?.size === 0) {
      connections.delete(roomId)
    }
    console.log("WebSocket connection closed")
  })
}

async function createGroup(
  request: FastifyRequest<{ Body: CreateGroupInput }>,
  reply: FastifyReply,
) {
  try {
    const user = request.user as TokenData
    if (!user.userId) {
      reply
        .status(400)
        .send({ error: "Произошла ошибка обратитесь к администратору" })
      return
    }
    const room = await services.createRoom(request.server, {
      ...request.body,
      userId: user.userId,
    })
    reply.status(201).send({ room })
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

async function getChats(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = request.user as TokenData
    if (!user.userId) {
      reply
        .status(400)
        .send({ error: "Произошла ошибка обратитесь к администратору" })
      return
    }
    const userWithRooms = await services.getRooms(request.server, user)
    if (!userWithRooms) {
      throw new Error(`User with id ${user.userId} not found`)
    }

    return userWithRooms.rooms
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

export const controllers = { roomChannel, createGroup, getChats }
