import { MODAL_NAME } from "@/store/modals"
import { Auth } from "./Auth"
import { store } from "@/store"
import { Registration } from "./Registration"

export function Modal() {
  const active = store.useModalStore((state) => state.active)

  switch (active) {
    case MODAL_NAME.AUTH:
      return <Auth />
    case MODAL_NAME.REGISTRATION:
      return <Registration />
    default:
      return null
  }
}
