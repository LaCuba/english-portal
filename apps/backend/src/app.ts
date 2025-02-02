import fastify from "fastify"
import fastifyJWT from "@fastify/jwt"
import fastifyRedis from "@fastify/redis"
import { registerRoutes } from "./routes"
import { prismaPlugin } from "./prisma/client"
import fastifyCookie from "@fastify/cookie"

const app = fastify({ logger: true })

app.register(fastifyJWT, { secret: process.env.JWT_SECRET })
app.register(fastifyRedis, {
  url: process.env.REDIS_URL,
})
app.register(prismaPlugin)

app.register(fastifyCookie, {
  secret: "cookie-secret",
  parseOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
})

app.decorate("verifyJWT", async (request: any, reply: any) => {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.code(401).send({ error: "Unauthorized" })
  }
})

registerRoutes(app)

export default app
