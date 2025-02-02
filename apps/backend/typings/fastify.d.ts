import { PrismaClient } from "@prisma/client"

declare module "fastify" {
  interface FastifyInstance
    extends FastifyJwtNamespace<{ namespace: "security" }> {
    prisma: PrismaClient
  }
}
