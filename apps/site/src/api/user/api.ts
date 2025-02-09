import { axiosInstance } from "../axios"
import { ResponseGetUsers, ResponseUser } from "./types"

const getProfile = async () => {
  const { data } = await axiosInstance.get("/auth/user")
  return data as ResponseUser
}

const getUsers = async () => {
  const { data } = await axiosInstance.get("/user/list")
  return data as ResponseGetUsers
}

export const userApi = {
  getProfile,
  getUsers,
}
