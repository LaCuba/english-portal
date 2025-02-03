import clsx from "clsx"
import styles from "./Feedback.module.scss"
import { Avatar } from "@mui/material"
import { green } from "@mui/material/colors"

export type Props = {
  name: string
  avatar?: string
  className?: string
  text?: string
}

export function Feedback(props: Props) {
  return (
    <div className={clsx(styles.base, props.className)}>
      <div className={styles.header}>
        {props.avatar ? (
          <Avatar src={props.avatar} />
        ) : (
          <Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>
            {props.name[0].toLocaleUpperCase()}
          </Avatar>
        )}
        <div className={styles.name}>{props.name}</div>
      </div>
      <div className={styles.text}>{props.text}</div>
    </div>
  )
}
