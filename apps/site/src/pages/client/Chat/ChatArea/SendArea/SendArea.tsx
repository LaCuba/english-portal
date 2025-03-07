import React from "react"

import { store } from "@/store"
import SendIcon from "@mui/icons-material/Send"
import { Button, TextField } from "@mui/material"

import styles from "./SendArea.module.scss"

export function SendArea() {
  const socket = store.useChatStore((state) => state.socket)
  const [inputValue, setInputValue] = React.useState("")

  function handleSendMessage() {
    if (inputValue.trim() !== "" && socket) {
      socket.send(JSON.stringify({ message: inputValue }))
      setInputValue("")
    }
  }
  return (
    <div className={styles.base}>
      <TextField
        value={inputValue}
        onChange={(event) => setInputValue(event.currentTarget.value)}
        variant="outlined"
        placeholder="Text your message..."
        fullWidth
      />
      <Button
        onClick={handleSendMessage}
        disabled={!inputValue.length}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  )
}
