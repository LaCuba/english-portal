import { create } from "zustand"

export type User = {
  name: string
  email: string
}

export type State = {
  user: User | null
  isAuth: boolean
}

export type Actions = {
  setUser: (user: User | null) => void
  setIsAuth: (isAuth: boolean) => void
  reset: () => void
}

const initialState: State = {
  user: null,
  isAuth: false,
}

export const useAuthStore = create<State & Actions>((set) => ({
  ...initialState,
  setUser: (user: User | null) => set({ user }),
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  reset: () => set(initialState),
}))
