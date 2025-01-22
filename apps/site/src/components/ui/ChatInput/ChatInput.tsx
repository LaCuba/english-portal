import { Button, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import styles from "./ChatInput.module.scss"

export function ChatInput() {
  return (
    <div className={styles.base}>
      <TextField
        variant="outlined"
        placeholder="Text your message..."
        fullWidth
      />
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </div>
  )
}
