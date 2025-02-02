declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string
    REDIS_HOST: string
    REDIS_PORT: number
    REDIS_URL: string
    PORT?: number
    DATABASE_URL: string
  }
}
