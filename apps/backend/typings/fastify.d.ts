import { PrismaClient } from "@prisma/client"
import { type FastifyRequest } from "fastify"

interface JwtPayload {
  id: string
}

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    prisma: PrismaClient
    verifyJWT: (request: any, reply: any) => Promise<void>
  }
  interface FastifyRequest extends FastifyRequest {
    user: JwtPayload
  }
}
