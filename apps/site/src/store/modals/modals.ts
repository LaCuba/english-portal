import { create } from "zustand"
import { MODAL_NAME } from "./const"

export type ModalName = ValueOf<typeof MODAL_NAME>

export type Store = {
  active: ModalName | null
  setActive: (active: ModalName | null) => void
}

export const useModalStore = create<Store>((set) => ({
  active: null,
  setActive: (active: ModalName | null) => set(() => ({ active })),
}))
