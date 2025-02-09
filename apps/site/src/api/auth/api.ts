import { axiosInstance } from "../axios"
import { LoginBody, RegisterBody } from "./types"

const register = async (userData: RegisterBody) => {
  const { data } = await axiosInstance.post("/auth/register", userData)
  return data
}

const login = async (credentials: LoginBody) => {
  const { data } = await axiosInstance.post("/auth/login", credentials)
  return data
}

const logout = async () => {
  const { data } = await axiosInstance.get("/auth/logout")
  return data
}


export const authApi = {
  register,
  login,
  logout,
}
