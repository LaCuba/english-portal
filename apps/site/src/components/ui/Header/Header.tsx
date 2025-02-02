import { Button } from "@mui/material"
import styles from "./Header.module.scss"
import { AvatarMenu } from "../AvatartMenu"
import React from "react"
import { useNavigate } from "react-router"
import { Logo } from "../Logo"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"

const isUser = false

export type Props = {
  withLogo: boolean
}

//TODO: Исправить на имя пользователя
export function Header({ withLogo }: Props) {
  const navigate = useNavigate()
  const setActive = store.useModalStore((state) => state.setActive)

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
          //TODO: Сделать выход пользователя
        },
      },
    ]
  }, [navigate])

  return (
    <div className={styles.base}>
      {withLogo ? (
        <Logo className={styles.logo} />
      ) : (
        <div className={styles.greetings}>Welcome User!</div>
      )}
      <div className={styles.control}>
        <div className={styles.navigation}></div>
        {isUser ? (
          <AvatarMenu items={menuItems} />
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
