import fp from "fastify-plugin"
import fastifyCors from "@fastify/cors"
import { env } from "~/env"

export const cors = fp(async (fastify) => {
  fastify.register(fastifyCors, {
    origin: (origin, callback) => {
      console.log("env.FRONTEND_URL ---->", [env.FRONTEND_URL])
      console.log("origin ---->", origin)
      if (!origin || [env.FRONTEND_URL].includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"), false)
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
})
