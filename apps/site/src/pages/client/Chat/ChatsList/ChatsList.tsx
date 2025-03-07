import clsx from "clsx"

import { api } from "@/api"
import { Chat } from "@/api/chat/types"
import { Card } from "@/components/ui/Card"
import { __ } from "@/helpers"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"
import AddIcon from "@mui/icons-material/Add"
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material"

import styles from "./ChatsList.module.scss"
import mockImage from "./image.png"

export function ChatsList() {
  const setActive = store.useModalStore((state) => state.setActive)
  const setCurrent = store.useChatStore((state) => state.setCurrent)
  const currentChat = store.useChatStore((state) => state.current)
  const { data, isLoading } = api.chat.useGetChats()

  function handleClickChat(chat: Chat) {
    setCurrent(chat)
  }

  return (
    <Card
      title="Список чатов"
      rightHeader={
        <IconButton
          onClick={() => setActive(MODAL_NAME.ADD_CHAT_GROUP)}
          size="small"
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      }
      className={styles.base}
      contentClassName={styles.content}
    >
      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        placeholder="Search..."
      />
      <div className={styles.list}>
        {!isLoading && !data?.length && (
          <div className={styles.noChatMessage}>У вас пока нет чатов</div>
        )}
        {__.map(data, (chat) => {
          return (
            <ListItem
              key={chat.id}
              onClick={() => handleClickChat(chat)}
              className={clsx(
                styles.listItem,
                currentChat?.id === chat.id && styles.listItem__active,
              )}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={mockImage} />
              </ListItemAvatar>
              <ListItemText primary={chat.name} secondary="message" />
            </ListItem>
          )
        })}
      </div>
    </Card>
  )
}
