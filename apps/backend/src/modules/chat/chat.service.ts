import { FastifyInstance } from "fastify"

import {
  CreateGroupInput,
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
  }
}

export const services = {
  loadMoreMessages,
  handleMassage,
  createRoom,
  getRooms,
}
