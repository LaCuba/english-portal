import { Avatar } from "@mui/material"
import styles from "./ProfileBlock.module.scss"
import { green } from "@mui/material/colors"
import { store } from "@/store"

export function ProfileBlock() {
  const user = store.useAuthStore((state) => state.user)
  const firstLetter = user?.name?.[0]?.toLocaleUpperCase()

  return (
    <div className={styles.base}>
      <div className={styles.block}>
        <Avatar
          className={styles.avatar}
          sx={{ bgcolor: green[500], width: 110, height: 110 }}
        >
          {firstLetter}
        </Avatar>
        <div className={styles.info}>
          <div className={styles.name}>{user?.name}</div>
          <div className={styles.email}>{user?.email}</div>
        </div>
        <div className={styles.advantages}>
          <div className={styles.advantage}>
            <div className={styles.advantageTitle}>Видеоуроки</div>
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
