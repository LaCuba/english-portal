import clsx from "clsx"
import styles from "./Block.module.scss"
import React from "react"

export type Props = {
  title: string
  image: React.ReactNode
  className?: string
  text?: string
}

export function Block(props: Props) {
  return (
    <div className={clsx(styles.base, props.className)}>
      <div className={styles.image}>{props.image}</div>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.text}>{props.text}</div>
      </div>
    </div>
  )
}
