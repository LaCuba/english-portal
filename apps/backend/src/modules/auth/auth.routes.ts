import { FastifyInstance } from "fastify"
import { middleware } from "~/middlewares"

import { controllers } from "./auth.controller"
import { schemas } from "./auth.schema"

export const authRoutes = async (app: FastifyInstance) => {
  app.get("/user", { preHandler: middleware.auth }, controllers.getUser)
  app.post("/register", { schema: schemas.register }, controllers.register)
  app.post("/login", { schema: schemas.login }, controllers.login)
  app.get("/logout", {}, controllers.logout)
}
