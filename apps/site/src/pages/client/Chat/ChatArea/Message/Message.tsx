import styles from "./Message.module.scss"

export function Message() {
  return (
    <div className={styles.base}>
      <div className={styles.content}></div>
      <div className={styles.info}>
        <div className={styles.time}></div>
        <div className={styles.reaction}></div>
      </div>
    </div>
  )
}
