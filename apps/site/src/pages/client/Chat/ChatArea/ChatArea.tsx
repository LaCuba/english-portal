import { Card } from "@/components/ui/Card"

import styles from "./ChatArea.module.scss"
import { ChatInput } from "@/components/ui/ChatInput"

export function ChatArea() {
  return (
    <Card
      title="Чат"
      className={styles.base}
      contentClassName={styles.content}
    >
      <div>
        
      </div>
      <ChatInput />
    </Card>
  )
}
