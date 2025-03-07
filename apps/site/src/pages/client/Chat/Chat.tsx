import styles from "./Chat.module.scss"
import { ChatArea } from "./ChatArea"
import { ChatsList } from "./ChatsList"

export function Chat() {
  return (
    <div className={styles.base}>
      <ChatsList />
      <ChatArea />
    </div>
  )
}
