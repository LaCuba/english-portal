import fp from "fastify-plugin"
import { PrismaClient } from "@prisma/client"
import { FastifyPluginAsync } from "fastify"

export const prismaClient = new PrismaClient()

export const prisma: FastifyPluginAsync = fp(async (app) => {
  await prismaClient.$connect()

  app.decorate("prisma", prismaClient)

  app.addHook("onClose", async (server) => {
    await server.prisma.$disconnect()
  })
})
