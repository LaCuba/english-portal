// import { Server, Socket } from "socket.io"
// import { prismaClient } from "~/plugins/prisma"

// // Socket handler for chat events
// export function chatSocketHandler(io: Server, socket: Socket) {
//   console.log(`User connected: ${socket.id}`)

//   socket.on("create_room", async ({ roomName, creatorId }) => {
//     try {
//       const room = await prismaClient.room.create({
//         data: { name: roomName, creatorId },
//       })
//       socket.emit("room_created", room)
//     } catch (error) {
//       console.error("Error creating room:", error)
//       socket.emit("error", { message: "Failed to create room" })
//     }
//   })

//   // Join a chat room
//   socket.on("join_room", async ({ roomId, userId }) => {
//     socket.join(roomId)
//     console.log(`User ${userId} joined room ${roomId}`)
//     socket.to(roomId).emit("user_joined", { userId })
//   })

//   // Handle new chat message
//   socket.on("chat_message", async ({ roomId, userId, message }) => {
//     try {
//       const chatMessage = await prismaClient.message.create({
//         data: { content: message, userId, roomId },
//       })
//       await redisClient.lpush(`room:${roomId}:messages`, JSON.stringify(chatMessage));
//       io.to(roomId).emit("new_message", chatMessage)
//     } catch (error) {
//       console.error("Error saving message:", error)
//     }
//   })

//   // Fetch previous messages with pagination
//   socket.on("fetch_messages", async ({ roomId, page = 1, limit = 10 }) => {
//     try {
//       const messages = await prismaClient.message.findMany({
//         where: { roomId },
//         orderBy: { createdAt: "desc" },
//         skip: (page - 1) * limit,
//         take: limit,
//       })
//       socket.emit("messages_fetched", messages)
//     } catch (error) {
//       console.error("Error fetching messages:", error)
//       socket.emit("error", { message: "Failed to fetch messages" })
//     }
//   })

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`)
//   })
// }
