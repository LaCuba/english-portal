import styles from "./Chat.module.scss"
import { ChatsList } from "./ChatsList"
import { ChatArea } from "./ChatArea"

export function Chat() {
  return (
    <div className={styles.base}>
      <ChatsList />
      <ChatArea />
    </div>
  )
}
