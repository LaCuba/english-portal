import { Profile } from "@/api/user/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type State = {
  user: Profile | null
  isAuth: boolean
}

export type Actions = {
  setUser: (user: Profile | null) => void
  setIsAuth: (isAuth: boolean) => void
  reset: () => void
}

const initialState: State = {
  user: null,
  isAuth: false,
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setUser: (user: Profile | null) => set({ user }),
      setIsAuth: (isAuth: boolean) => set({ isAuth }),
      reset: () => set(initialState),
    }),
    {
      name: "auth-storage",
    },
  ),
)
