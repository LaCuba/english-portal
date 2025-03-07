import React from "react"

import clsx from "clsx"

import styles from "./Card.module.scss"

export type Props = React.PropsWithChildren<{
  title: string
  rightHeader?: React.ReactNode
  className?: string
  contentClassName?: string
}>

export function Card(props: Props) {
  return (
    <div className={clsx(styles.base, props.className)}>
      <div className={styles.header}>
        <div className={styles.title}>{props.title}</div>
        {props.rightHeader}
      </div>
      <div className={clsx(styles.content, props.contentClassName)}>
        {props.children}
      </div>
    </div>
  )
}
