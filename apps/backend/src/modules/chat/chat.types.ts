export type JoinRoomInput = {
  roomId: number
}

export type CreateMessageInput = {
  event: "send_message"
  message: string
}

export type LoadMoreMessagesInput = {
  event: "load_more_messages"
  page: number
  limit: number
}

export type CreateGroupInput = {
  name: string
  userIds: string[]
}
