import fastify from "fastify"

import fastifyCookie from "@fastify/cookie"
import fastifyJWT from "@fastify/jwt"
import fastifyRedis from "@fastify/redis"
import websocketPlugin from "@fastify/websocket"

import { env } from "./env"
import { plugins } from "./plugins"
import { registerRoutes } from "./routes"

const app = fastify({ logger: true })

app.register(plugins.cors)
app.register(plugins.jwt)
app.register(fastifyJWT, { secret: env.JWT_SECRET })
app.register(fastifyRedis, {
  url: env.REDIS_URL,
}).after((err) => {
  if (err) {
    console.error('Redis connection error:', err);
    process.exit(1);
  }
});
app.register(websocketPlugin)
app.register(plugins.prisma)

app.register(fastifyCookie, {
  secret: "cookie-secret",
  parseOptions: {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  },
})

registerRoutes(app)

export default app
