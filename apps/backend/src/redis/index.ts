// import Redis from "ioredis"
// import { FastifyPluginAsync } from "fastify"
// import { env } from "~/env"

// const redisPlugin: FastifyPluginAsync = async (fastify, options) => {
//   const redis = new Redis({
//     host: env.REDIS_HOST,
//     port: env.REDIS_PORT,
//     // password: env.REDIS_HOST,
//     db: 0,
//   })

//   fastify.decorate("redis", redis)

//   fastify.addHook("onClose", async (instance, done) => {
//     await redis.quit()
//     done()
//   })
// }

// export default redisPlugin
