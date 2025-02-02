import { FastifyRequest, FastifyReply } from "fastify"
import { services } from "./auth.service"
import { RegisterInput, LoginInput } from "./auth.types"

async function register(
  request: FastifyRequest<{ Body: RegisterInput }>,
  reply: FastifyReply,
) {
  try {
    const user = await services.register(request.server, request.body)
    reply.status(201).send({ user })
  } catch (err) {
    reply.status(400).send({ error: err.message })
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
      secure: true,
      maxAge: 60 * 15,
      path: "/",
    })

    reply.setCookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })
    reply.status(200).send({ user })
  } catch (err) {
    reply.status(400).send({ error: err.message })
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
    reply.status(400).send({ error: err.message })
  }
}

async function user(request: FastifyRequest, reply: FastifyReply) {
  try {
    reply.status(200).send("Its your data")
  } catch (err) {
    reply.status(400).send({ error: err.message })
  }
}

export const controllers = { register, login, logout, user }
