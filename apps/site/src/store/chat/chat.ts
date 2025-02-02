import { create } from "zustand"

export type Store = {
  current: string | null
  setCurrent: (current: string | null) => void
}

export const useChatStore = create<Store>((set) => ({
  current: null,
  setCurrent: (current: string | null) => set(() => ({ current })),
}))
