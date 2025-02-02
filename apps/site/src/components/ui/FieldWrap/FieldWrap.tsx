import styles from "./FieldWrap.module.scss"

export type Props = React.PropsWithChildren<{
  label: string
}>

export function FieldWrap({ label, children }: Props) {
  return (
    <div className={styles.base}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  )
}
