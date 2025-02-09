import React from "react"

import { store } from "@/store"

import { Messages } from "../Messages"
import { SendArea } from "../SendArea"
import styles from "./Content.module.scss"

export type Props = {
  chatId: number
}

export function Content({ chatId }: Props) {
  const setSocket = store.useChatStore((state) => state.setSocket)

  React.useEffect(() => {
    const socket = new WebSocket(`ws://localhost:4000/api/chat/ws/${chatId}`)
    setSocket(socket)

    return () => {
      setSocket(null)
      socket.close()
    }
  }, [chatId, setSocket])

  return (
    <div className={styles.base}>
      <div className={styles.messages}>
        <Messages />
      </div>
      <SendArea />
    </div>
  )
}
