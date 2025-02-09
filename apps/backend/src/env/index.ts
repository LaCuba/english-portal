import * as dotenv from "dotenv"
// import path from 'path';

// dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV
const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const REDIS_URL = process.env.REDIS_URL
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT
const HOST = process.env.HOST
const FRONTEND_URL = process.env.FRONTEND_URL

export const env = {
  JWT_SECRET,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_URL,
  NODE_ENV,
  DATABASE_URL,
  FRONTEND_URL,
  PORT,
  HOST,
}

for (const variableName in env) {
  if (Object.prototype.hasOwnProperty.call(env, variableName)) {
    const element = env[variableName as keyof typeof env]
    if (!element) {
      throw new Error(`${variableName} not found`)
    }
  }
}
