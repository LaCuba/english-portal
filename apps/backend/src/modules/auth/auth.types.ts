export interface RegisterInput {
  email: string
  password: string
  name: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface LogoutInput {
  refreshToken: string
}

export interface AuthTokenPayload {
  userId: number
}
