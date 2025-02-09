import { MODAL_NAME } from "@/store/modals"
import { Auth } from "./Auth"
import { store } from "@/store"
import { Registration } from "./Registration"
import { AddGroup } from "./AddGroup"

export function ModalChooser() {
  const active = store.useModalStore((state) => state.active)

  switch (active) {
    case MODAL_NAME.AUTH:
      return <Auth />
    case MODAL_NAME.REGISTRATION:
      return <Registration />
    case MODAL_NAME.ADD_CHAT_GROUP:
      return <AddGroup />
    default:
      return null
  }
}
