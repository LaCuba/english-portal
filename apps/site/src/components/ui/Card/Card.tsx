import clsx from "clsx"
import styles from "./Card.module.scss"
import React from "react"

export type Props = React.PropsWithChildren<{
  title: string
  className?: string
  contentClassName?: string
}>

export function Card(props: Props) {
  return (
    <div className={clsx(styles.base, props.className)}>
      <div className={styles.title}>{props.title}</div>
      <div className={clsx(styles.content, props.contentClassName)}>
        {props.children}
      </div>
    </div>
  )
}
