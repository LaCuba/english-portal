import fp from "fastify-plugin"
import { PrismaClient } from "@prisma/client"
import { FastifyPluginAsync } from "fastify"

export const prismaPlugin: FastifyPluginAsync = fp(async (app) => {
  const prisma = new PrismaClient()

  await prisma.$connect()

  app.decorate("prisma", prisma)

  app.addHook("onClose", async (server) => {
    await server.prisma.$disconnect()
  })
})
