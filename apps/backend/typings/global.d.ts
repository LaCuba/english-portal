// import "@types/ws"
import('ws')

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

declare type TokenData = {
  userId: number 
} 