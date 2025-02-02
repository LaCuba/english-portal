import { IconButton, Modal as MuiModal } from "@mui/material"
import styles from "./Modal.module.scss"
import { Close } from "@mui/icons-material"
import clsx from "clsx"

export type Props = React.PropsWithChildren<{
  isOpen?: boolean
  title?: string
  width?: string
  height?: string
  className?: string
  onClose?: () => void
}>

export function Modal({
  isOpen = true,
  width = "400px",
  height = "600px",
  title,
  children,
  className,
  onClose,
}: Props) {
  return (
    <MuiModal className={styles.base} open={isOpen} onClose={onClose}>
      <div className={styles.modal} style={{ width, height }}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </div>
        <div className={clsx(styles.content, className)}>{children}</div>
      </div>
    </MuiModal>
  )
}
