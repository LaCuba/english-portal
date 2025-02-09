import { Card } from "@/components/ui/Card"
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

import styles from "./ChatsList.module.scss"
import mockImage from "./image.png"

import { api } from "@/api"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"
import { __ } from "@/helpers"
import clsx from "clsx"
import { Chat } from "@/api/chat/types"

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
