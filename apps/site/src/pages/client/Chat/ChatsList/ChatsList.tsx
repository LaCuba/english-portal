import { Card } from "@/components/ui/Card"
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material"

import styles from "./ChatsList.module.scss"
import mockImage from "./image.png"

export function ChatsList() {
  return (
    <Card
      title="Список чатов"
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
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={mockImage} />
          </ListItemAvatar>
          <ListItemText primary="Name" secondary="message" />
        </ListItem>
      </div>
    </Card>
  )
}
