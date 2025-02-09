import { Chat } from "@/api/chat/types"
import { create } from "zustand"

export type Store = {
  current: Chat | null
  socket: WebSocket | null
  setCurrent: (current: Chat | null) => void
  setSocket: (current: WebSocket | null) => void
}

export const useChatStore = create<Store>((set) => ({
  current: null,
  socket: null,
  setCurrent: (current: Chat | null) => set(() => ({ current })),
  setSocket: (socket: WebSocket | null) => set(() => ({ socket })),
}))
