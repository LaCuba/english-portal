// src/plugins/redis.ts
import Redis from "ioredis"
import { FastifyPluginAsync } from "fastify"

// Плагин Redis
const redisPlugin: FastifyPluginAsync = async (fastify, options) => {
  const redis = new Redis({
    host: process.env.REDIS_HOST, // Адрес Redis-сервера
    port: process.env.REDIS_PORT, // Порт Redis
    password: process.env.REDIS_HOST, // Если Redis защищен паролем
    db: 0, // Используемая база данных Redis
  })

  // Инжектим Redis в контекст Fastify
  fastify.decorate("redis", redis)

  // Очистка подключения при завершении работы
  fastify.addHook("onClose", async (instance, done) => {
    await redis.quit()
    done()
  })
}

export default redisPlugin
