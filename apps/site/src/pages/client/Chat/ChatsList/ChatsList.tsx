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
import _ from "lodash"

const MOCK = [
  {
    id: 1,
    name: "Общий",
  },
  {
    id: 2,
    name: "Тест",
  },
  {
    id: 3,
    name: "Kolya",
  },
]

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
        {_.map(MOCK, (chat) => {
          return (
            <ListItem
              key={chat.id}
              className={styles.listItem}
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
