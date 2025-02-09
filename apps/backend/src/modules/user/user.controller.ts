import { FastifyReply, FastifyRequest } from "fastify"

import { services } from "./user.service"

//FIXME: СДелать обработку ошибок
async function getUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    const users = await services.getUsers(
      request.server,
      request.user as { userId?: number },
    )

    reply.status(200).send(users)
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

export const controllers = { getUsers }
