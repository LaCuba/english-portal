import { FastifyRequest } from "fastify"
import fp from "fastify-plugin"

export const jwt = fp(async (fastify) => {
  fastify.decorate("verifyJWT", async (request: FastifyRequest) => {
    const token = request.cookies.access_token
    if (!token) {
      throw new Error("Token not provided")
    }

    try {
      const decoded = fastify.jwt.verify(token)
      request.user = decoded
    } catch (err) {
      throw new Error("Invalid token")
    }
  })
})
