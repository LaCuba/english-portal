import { Card } from "@/components/ui/Card"
import { store } from "@/store"
import CloseIcon from "@mui/icons-material/Close"
import { IconButton } from "@mui/material"

import styles from "./ChatArea.module.scss"
import { Content } from "./Content"

export function ChatArea() {
  const setCurrentChat = store.useChatStore((state) => state.setCurrent)
  const currentChat = store.useChatStore((state) => state.current)

  return (
    <Card
      title="Чат"
      className={styles.base}
      rightHeader={
        currentChat && (
          <IconButton onClick={() => setCurrentChat(null)} size="small">
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )
      }
    >
      {currentChat ? (
        <Content chatId={currentChat.id} />
      ) : (
        <div className={styles.noChat}>Выберите чат</div>
      )}
    </Card>
  )
}
