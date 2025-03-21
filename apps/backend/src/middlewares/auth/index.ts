import { FastifyReply, FastifyRequest } from "fastify"
import { env } from "~/env"

export const auth = async (request: FastifyRequest<any>, reply: FastifyReply) => {
  try {
    const accessToken = request.cookies.access_token
    if (!accessToken) {
      return reply.status(401).send({ message: "No access token" })
    }

    const decoded = request.server.jwt.verify(accessToken)

    request.user = decoded
    console.log(
      "accessToken ---==============================================================================->",
      decoded.userId,
    )
    return
  } catch (error) {
    const refreshToken = request.cookies.refresh_token

    if (!refreshToken) {
      return reply.status(401).send({ message: "No refresh token" })
    }

    try {
      const decoded = request.server.jwt.verify(refreshToken) as {
        userId: string
      }

      const redisToken = await request.server.redis.get(
        `refresh_token_${decoded.userId}`,
      )
      if (redisToken !== refreshToken) {
        return reply.status(401).send({ message: "Invalid refresh token" })
      }

      const newAccessToken = request.server.jwt.sign({ userId: decoded.userId })

      reply.setCookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        maxAge: 60 * 15,
        path: "/",
        sameSite: "lax",
      })

      request.user = decoded
      return
    } catch (refreshError) {
      return reply.status(401).send({ message: "Invalid refresh token" })
    }
  }
}
