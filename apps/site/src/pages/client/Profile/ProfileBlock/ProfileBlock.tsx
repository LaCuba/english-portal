import { Avatar } from "@mui/material"
import styles from "./ProfileBlock.module.scss"
import { green } from "@mui/material/colors"

export function ProfileBlock() {
  return (
    <div className={styles.base}>
      <div className={styles.block}>
        <Avatar
          className={styles.avatar}
          sx={{ bgcolor: green[500], width: 110, height: 110 }}
        >
          N
        </Avatar>
        <div className={styles.info}>
          <div className={styles.name}>Тестовое имя</div>
          <div className={styles.email}>email.com</div>
        </div>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <div className={styles.advantageTitle}>Видео уроки</div>
            <div className={styles.advantageValue}>24</div>
          </div>
          <div className={styles.divider} />
          <div className={styles.advantage}>
            <div className={styles.advantageTitle}>Курсы</div>
            <div className={styles.advantageValue}>1</div>
          </div>
        </div>
      </div>
    </div>
  )
}
