import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type Chat = {
  id: number
  name: string
  icon?: string
  lastMessage?: string
}

export type State = {
  chats: Chat[] | null
}

const MOCK = [
  {
    id: 1,
    name: "Общий",
  },
  {
    id: 2,
    name: "Тест"
  },
  {
    id: 3,
    name: "Kolya"
  }
]

export const initialState: State = {
  chats: MOCK,
}

const userSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload
    },
  },
})

export const actions = userSlice.actions

export const { setChats } = userSlice.actions
export default userSlice.reducer
