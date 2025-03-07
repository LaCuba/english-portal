import clsx from "clsx"

import styles from "./Logo.module.scss"

export type Props = {
  className?: string
  onClick?: () => void
}

export function Logo({ className, onClick }: Props) {
  return (
    <div onClick={onClick} className={clsx(styles.base, className)}>
      Lingo talk
    </div>
  )
}
