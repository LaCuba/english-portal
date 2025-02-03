import styles from "./Profile.module.scss"
import { ProfileBlock } from "./ProfileBlock"

export function Profile() {
  return (
    <div className={styles.base}>
      <ProfileBlock />
    </div>
  )
}
