export type CreateChatGroupBody = {
  name: string
  userIds: number[]
}

export type Chat = {
  id: number
  name: string
}

export type GetChatsResponse = Chat[]
