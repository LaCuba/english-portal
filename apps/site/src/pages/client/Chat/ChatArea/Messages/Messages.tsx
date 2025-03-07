import React from "react"

import { __, utils } from "@/helpers"
import { store } from "@/store"

import { Message } from "../Message"
import styles from "./Messages.module.scss"

type Message = {
  id: number
  content: string
  createdAt: string
  userName: string
  userId: number
}

type SocketMessage = {
  event: "new_message"
  message: Message
}

type SocketMessages = {
  event: "more_messages" | "recent_messages"
  messages: Message[]
}

export function Messages() {
  const socket = store.useChatStore((state) => state.socket)
  const user = store.useAuthStore((state) => state.user)

  const [messages, setMessages] = React.useState<Message[]>([])
  // const [page, setPage] = React.useState(0)

  React.useEffect(() => {
    socket?.addEventListener("message", (event) => {
      console.log("Сообщение от сервера:", event.data)
      const parsedResponse = utils.safeJsonParse<
        SocketMessages | SocketMessage
      >(event.data)

      switch (parsedResponse?.event) {
        case "more_messages":
        case "recent_messages":
          const messages = parsedResponse?.messages
          if (messages) {
            setMessages((prev) => [...prev, ...messages])
          }
          break
        case "new_message":
          const message = parsedResponse?.message
          if (message) {
            setMessages((prev) => [message, ...prev])
          }
          break
        default:
          break
      }
    })
  }, [socket])

  return (
    <div className={styles.base}>
      <div className={styles.messages}>
        {__.map(messages, (message) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              content={message.content}
              created={message.createdAt}
              userName={message.userName}
              isOwner={message.userId === user?.id}
            />
          )
        })}
      </div>
    </div>
  )
}
