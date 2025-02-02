import { FastifyInstance } from "fastify"
import { hashPassword, verifyPassword } from "./auth.utils"
import {
  RegisterInput,
  LoginInput,
  AuthTokenPayload,
  LogoutInput,
} from "./auth.types"

async function register(app: FastifyInstance, input: RegisterInput) {
  const { email, password, name } = input

  const user = await app.prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (user) {
    throw new Error("User already exists")
  }

  try {
    const hashedPassword = await hashPassword(password)
    const user = await app.prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        name,
      },
    })
    return user
  } catch (error) {
    throw new Error(`Error --->, ${error}`)
  }
}

async function login(app: FastifyInstance, input: LoginInput) {
  const { email, password } = input

  const user = await app.prisma.user.findUnique({ where: { email } })

  if (!user) {
    throw new Error("Invalid email or password")
  }

  const isPasswordValid = await verifyPassword(password, user.password)
  if (!isPasswordValid) {
    throw new Error("Invalid email or password")
  }

  const accessToken = app.jwt.sign({ userId: user.id })
  const refreshToken = app.jwt.sign({ userId: user.id }, { expiresIn: "7d" })

  await app.redis.set(
    `refresh_token_${user.id}`,
    refreshToken,
    "EX",
    60 * 60 * 24 * 7,
  )

  return {
    accessToken,
    refreshToken,
    user: { email: user.email, name: user.name },
  }
}

async function logout(app: FastifyInstance, input: LogoutInput) {
  const decoded = app.jwt.verify(input.refreshToken) as { userId: string }
  return await app.redis.del(`refresh_token_${decoded.userId}`)
}

export const services = { register, login, logout }
