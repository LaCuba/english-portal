import { Avatar, Button } from "@mui/material"
import { green } from "@mui/material/colors"
import styles from "./Header.module.scss"

const isUser = true

//TODO: Исправить на имя пользователя
export function Header() {
  return (
    <div className={styles.base}>
      <div className={styles.greetings}>Welcome User!</div>
      <div className={styles.control}>
        <div className={styles.navigation}></div>
        {isUser ? (
          <Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>N</Avatar>
        ) : (
          <Button variant="contained">Войти</Button>
        )}
      </div>
    </div>
  )
}
