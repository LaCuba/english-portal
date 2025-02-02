import clsx from "clsx"
import styles from "./Logo.module.scss"

export type Props = {
  className?: string
}

export function Logo({ className }: Props) {
  return <div className={clsx(styles.base, className)}>Logo</div>
}
