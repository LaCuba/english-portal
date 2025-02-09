import { FastifyInstance } from "fastify"

import {
  CreateGroupInput,
  CreateMessageInput,
  LoadMoreMessagesInput,
} from "./chat.types"

async function handleMassage(
  app: FastifyInstance,
  data: {
    message: string
    userId: number
    roomId: number
  },
) {
  const chatMessage = await app.prisma.message.create({
    data: { content: data.message, userId: data.userId, roomId: data.roomId },
  })
  const foundUser = await app.prisma.user.findUnique({
    where: { id: chatMessage.userId },
  })

  // await app.redis.lpush(
  //   `room:${data.roomId}:messages`,
  //   JSON.stringify(chatMessage),
  // )
  // await app.redis.publish(
  //   `chat_room:${data.roomId}`,
  //   JSON.stringify(chatMessage),
  // )
  return {
    id: chatMessage.id,
    content: chatMessage.content,
    createdAt: chatMessage.createdAt,
    userName: foundUser?.name,
    userId: foundUser?.id,
  }
}

async function loadMoreMessages(
  app: FastifyInstance,
  data: Omit<LoadMoreMessagesInput, "event"> & { roomId: number },
) {
  const offset = (data.page - 1) * data.limit
  const messages = await app.prisma.message.findMany({
    where: { roomId: data.roomId },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: data.limit,
  })
  return messages
}

async function createRoom(
  app: FastifyInstance,
  data: CreateGroupInput & TokenData,
) {
  const { userId, name, userIds } = data
  try {
    const room = await app.prisma.room.create({
      data: { name, creatorId: userId },
    })
    await app.prisma.room.update({
      where: { id: room.id },
      data: {
        users: {
          connect: userIds.map((userId) => ({ id: userId })),
        },
      },
    })
    return room
  } catch (error) {
    console.error("Error creating room:", error)
    throw new Error("Error creating room")
    // connection.send(JSON.stringify({ error: 'Failed to create room' }));
  }
}

async function getRooms(app: FastifyInstance, data: TokenData) {
  try {
    const userWithRooms = await app.prisma.user.findUnique({
      where: { id: data.userId },
      include: {
        rooms: true,
      },
    })
    return userWithRooms
  } catch (error) {
    console.error("Error creating room:", error)
    throw new Error("Error creating room")
    // connection.send(JSON.stringify({ error: 'Failed to create room' }));
  }
}

// function joinRoom(app: FastifyInstance, data: any) {
//   const { roomId, userId } = data
//   console.log(`User ${userId} joined room ${roomId}`)
//   connection.socket.send(JSON.stringify({ event: "user_joined", userId }))
// }

// function handleJoinRoom(connection: any, data: any) {
//   const { roomId, userId } = data
//   console.log(`User ${userId} joined room ${roomId}`)
//   connection.socket.send(JSON.stringify({ event: "user_joined", userId }))
// }

// async function handleChatMessage(connection: any, data: ChatMessage) {
//   try {
//     const chatMessage = await prisma.message.create({
//       data: { content: data.message, userId: data.userId, roomId: data.roomId },
//     })
//     // Cache the message in Redis
//     await redisClient.lpush(
//       `room:${data.roomId}:messages`,
//       JSON.stringify(chatMessage),
//     )
//     connection.socket.send(
//       JSON.stringify({ event: "new_message", chatMessage }),
//     )
//   } catch (error) {
//     console.error("Error saving message:", error)
//   }
// }

// async function handleFetchMessages(
//   connection: any,
//   data: FetchMessagesRequest,
// ) {
//   const { roomId, page = 1, limit = 10 } = data
//   try {
//     const start = (page - 1) * limit
//     const end = start + limit - 1

//     // Fetch from Redis first
//     const cachedMessages = await redisClient.lrange(
//       `room:${roomId}:messages`,
//       start,
//       end,
//     )

//     if (cachedMessages.length > 0) {
//       const messages = cachedMessages.map((msg) => JSON.parse(msg))
//       connection.socket.send(
//         JSON.stringify({ event: "messages_fetched", messages }),
//       )
//     } else {
//       const messages = await prisma.message.findMany({
//         where: { roomId },
//         orderBy: { createdAt: "desc" },
//         skip: start,
//         take: limit,
//       })
//       connection.socket.send(
//         JSON.stringify({ event: "messages_fetched", messages }),
//       )
//     }
//   } catch (error) {
//     console.error("Error fetching messages:", error)
//     connection.socket.send(
//       JSON.stringify({ error: "Failed to fetch messages" }),
//     )
//   }
// }

// async function getMessages(app: FastifyInstance, roomId: number) {
//   return app.prisma.message.findMany({ where: { roomId } })
// }

// async function createMessage(
//   app: FastifyInstance,
//   { roomId, userId, message }: CreateMessageInput,
// ) {
//   return app.prisma.message.create({
//     data: { roomId, userId, content: message },
//   })
// }

export const services = {
  loadMoreMessages,
  handleMassage,
  createRoom,
  getRooms,
}
