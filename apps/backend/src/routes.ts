import { FastifyInstance } from "fastify"

import { authRoutes } from "./modules/auth/auth.routes"
import { chatRoutes } from "./modules/chat/chat.routes"
import { userRoutes } from "./modules/user/user.routes"

export const registerRoutes = async (app: FastifyInstance) => {
  await app.register(authRoutes, { prefix: "/api/auth" })
  await app.register(userRoutes, {
    prefix: "/api/user",
  })
  await app.register(chatRoutes, {
    prefix: "/api/chat",
  })
}
