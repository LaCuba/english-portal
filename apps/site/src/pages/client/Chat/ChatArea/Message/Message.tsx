import clsx from "clsx"
import dayjs from "dayjs"
import isToday from "dayjs/plugin/isToday"
import styles from "./Message.module.scss"

export type Props = {
  id: number
  content: string
  created: string
  userName: string
  isOwner: boolean
}

dayjs.extend(isToday)

const formatDate = (checkDate: string) => {
  const date = dayjs(checkDate)

  if (date.isToday()) {
    return date.format("HH:mm:ss")
  } else {
    return date.format("HH:mm DD.MM.YYYY")
  }
}

export function Message(props: Props) {
  const date = formatDate(props.created)
  return (
    <div className={clsx(styles.base, props.isOwner && styles.owner)}>
      <div
        className={clsx(styles.message, props.isOwner && styles.messageOwner)}
      >
        <div className={styles.header}>
          <div className={styles.userName}>{props.userName}</div>
        </div>
        <div className={styles.content}>{props.content}</div>
        <div className={styles.footer}>
          <div className={styles.reaction}></div>
          <div className={styles.time}>{date}</div>
        </div>
      </div>
    </div>
  )
}
