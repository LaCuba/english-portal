import { Card } from "@/components/ui/Card"

import styles from "./ChatArea.module.scss"

export function ChatArea() {
  return (
    <Card
      title="Чат"
      className={styles.base}
      contentClassName={styles.content}
    >
      Чат
    </Card>
  )
}
