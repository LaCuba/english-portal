import { axiosInstance } from "../axios"
import { CreateChatGroupBody, GetChatsResponse } from "./types"

const getChats = async () => {
  const { data } = await axiosInstance.get("/chat/list")
  return data as GetChatsResponse
}

const createChatGroup = async (body: CreateChatGroupBody) => {
  const { data } = await axiosInstance.post("/chat/group", body)
  return data
}

export const chatApi = {
  getChats,
  createChatGroup,
}
