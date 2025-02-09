import React from "react"

// import { Virtuoso } from "react-virtuoso"

import { Message } from "../Message"
import styles from "./Messages.module.scss"
import { store } from "@/store"
import { __, utils } from "@/helpers"

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
  // const virtuosoRef = React.useRef<any>(null)

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
    // socket?.onmessage?.((event: MessageEvent) => {
    //   debugger
    //   const message = event.data as Message
    //   setMessages((prev) => [...prev, message]);
    // })
    // loadMoreMessages(page, true) // Изначальная загрузка сообщений
  }, [socket])
  // const loadMoreMessages = (page: number, initialLoad = false) => {
  //   // Имитируем загрузку старых сообщений
  //   const newMessages = Array.from(
  //     { length: 20 },
  //     (_, i) => `Message ${i + page * 20}`,
  //   )

  //   setMessages((prev) => [...newMessages, ...prev])

  //   if (initialLoad) {
  //     // Установка позиции на последний элемент при первой загрузке
  //     setTimeout(() => {
  //       virtuosoRef.current?.scrollToIndex(newMessages.length - 1)
  //     }, 0)
  //   } else {
  //     // Фиксация позиции после подгрузки новых сообщений
  //     setTimeout(() => {
  //       virtuosoRef.current?.scrollToIndex(newMessages.length)
  //     }, 0)
  //   }
  // }
  return (
    <div className={styles.base}>
      {/* <div className={styles.noMessageText}>
        У вас пока нет ни одного сообщения.
      </div> */}
      <div className={styles.messages}>
        {/* <Virtuoso
          ref={virtuosoRef}
          data={messages}
          // initialLocation={{ index: 'LAST', align: 'end' }}
          firstItemIndex={0}
          startReached={() => console.log("234")}
          itemContent={(_, message) => (
            <Message
              key={message.id}
              id={message.id}
              content={message.content}
              created={message.createdAt}
              userName={message.userName}
              isOwner={message.userId === user?.id}
            />
          )}
          // endReached={loadMore}
          //     increaseViewportBy={200}
          // components={{ Footer }}
          // style={{ height: "500px" }} // Ограничение высоты контейнера
        /> */}
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
