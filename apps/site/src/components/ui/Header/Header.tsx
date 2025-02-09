import React from "react"

import { useNavigate } from "react-router"

import { api } from "@/api"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"
import { Button } from "@mui/material"

import { AvatarMenu } from "../AvatartMenu"
import { Logo } from "../Logo"
import styles from "./Header.module.scss"

export type Props = {
  withLogo: boolean
}

//TODO: Исправить на имя пользователя
export function Header({ withLogo }: Props) {
  const navigate = useNavigate()
  const logout = api.auth.useLogout()
  const setActive = store.useModalStore((state) => state.setActive)
  const isAuth = store.useAuthStore((state) => state.isAuth)
  const user = store.useAuthStore((state) => state.user)

  const menuItems = React.useMemo(() => {
    return [
      {
        label: "Профиль",
        onClick: () => {
          navigate("/client/profile")
        },
      },
      {
        label: "Выйти",
        onClick: () => {
          logout.mutate()
        },
      },
    ]
  }, [navigate, logout])

  return (
    <div className={styles.base}>
      {withLogo ? (
        <Logo className={styles.logo} />
      ) : (
        <div className={styles.greetings}>Welcome User!</div>
      )}
      <div className={styles.control}>
        <div className={styles.navigation}></div>
        {isAuth ? (
          <AvatarMenu userName={user?.name} items={menuItems} />
        ) : (
          <Button
            variant="contained"
            onClick={() => setActive(MODAL_NAME.AUTH)}
          >
            Войти
          </Button>
        )}
      </div>
    </div>
  )
}
