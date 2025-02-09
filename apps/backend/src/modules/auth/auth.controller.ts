import { FastifyRequest, FastifyReply } from "fastify"
import { services } from "./auth.service"
import { RegisterInput, LoginInput } from "./auth.types"
import { env } from "~/env"

//FIXME: СДелать обработку ошибок

async function register(
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply,
) {
  try {
    const user = await services.register(request.server, request.body)
    reply.status(201).send({ user })
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

async function login(
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) {
  try {
    const { accessToken, refreshToken, user } = await services.login(
      request.server,
      request.body,
    )

    reply.setCookie("access_token", accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 15,
      path: "/",
      sameSite: 'lax',
    })

    reply.setCookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: 'lax',
    })
    reply.status(200).send({ user })
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

async function logout(request: FastifyRequest, reply: FastifyReply) {
  try {
    const refreshToken = request.cookies.refresh_token
    if (refreshToken) {
      await services.logout(request.server, {
        refreshToken,
      })
    }
    reply.clearCookie("access_token")
    reply.clearCookie("refresh_token")
    reply.status(200).send("Logged out successfully")
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

async function getUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const user = await services.getUser(
      request.server,
      request.user as { userId?: number },
    )

    reply.status(200).send(user)
  } catch (err) {
    console.log(err.message)
    reply
      .status(400)
      .send({ error: "Произошла ошибка обратитесь к администратору" })
  }
}

export const controllers = { register, login, logout, getUser }
