import { FastifyInstance } from "fastify"
import { controllers } from "./auth.controller"
import { schemas } from "./auth.schema"

export const authRoutes = async (app: FastifyInstance) => {
  app.get("/auth/user", {}, controllers.user)
  app.post("/auth/register", { schema: schemas.register }, controllers.register)
  app.post("/auth/login", { schema: schemas.login }, controllers.login)
}
