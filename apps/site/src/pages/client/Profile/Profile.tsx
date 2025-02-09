import React from "react"

import { api } from "@/api"
import { store } from "@/store"

import styles from "./Profile.module.scss"
import { ProfileBlock } from "./ProfileBlock"

export function Profile() {
  const { data } = api.user.useGetProfile(true)
  const setUser = store.useAuthStore((state) => state.setUser)

  React.useEffect(() => {
    if (data) {
      setUser(data.user)
    }
  }, [data, setUser])

  return (
    <div className={styles.base}>
      <ProfileBlock />
    </div>
  )
}
