import { FastifyInstance } from "fastify"

import { controllers } from "./user.controller"
import { middleware } from "~/middlewares"

export const userRoutes = async (app: FastifyInstance) => {
  app.get("/list", { preHandler: middleware.auth }, controllers.getUsers)
}
