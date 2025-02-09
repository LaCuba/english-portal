import { FastifyInstance } from "fastify"

async function getUsers(app: FastifyInstance, user: { userId?: number }) {
  if (!user?.userId) throw new Error("Invalid user id")

  const users = await app.prisma.user.findMany()

  if (!users) {
    throw new Error("Not found user")
  }

  return {
    users: users.map((user) => ({ id: user.id, name: user.name })),
  }
}

export const services = { getUsers }
