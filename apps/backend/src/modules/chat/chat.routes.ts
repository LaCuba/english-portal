import { FastifyInstance } from "fastify"
import { middleware } from "~/middlewares"

import { controllers } from "./chat.controller"

export function chatRoutes(app: FastifyInstance) {
  //TODO: Исправить типизацию
  app.post(
    "/group",
    { preHandler: middleware.auth },
    controllers.createGroup as any,
  )
  app.get("/list", { preHandler: middleware.auth }, controllers.getChats)
  app.get(
    "/ws/:roomId",
    { preHandler: middleware.auth, websocket: true },
    controllers.roomChannel,
  )
}
