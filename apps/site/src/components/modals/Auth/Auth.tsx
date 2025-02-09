import React from "react"

import { useNavigate } from "react-router"

import { api } from "@/api"
import { FieldWrap } from "@/components/ui/FieldWrap"
import { Modal } from "@/components/ui/Modal"
import { typings } from "@/helpers"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"
import { Button, TextField } from "@mui/material"

import styles from "./Auth.module.scss"

type FormState = {
  email: string
  password: string
}

const INITIAL_STATE = {
  email: "",
  password: "",
} as FormState

export function Auth() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState(INITIAL_STATE)
  const [errorMessage, setErrorMessage] = React.useState("")
  const loginMutation = api.auth.useLoginUser()

  const setActive = store.useModalStore((state) => state.setActive)
  const setIsAuth = store.useAuthStore((state) => state.setIsAuth)

  React.useEffect(() => {
    if (loginMutation.isSuccess) {
      setActive(null)
      setIsAuth(true)
      navigate("/client/profile")
    }
    if (loginMutation.isError) {
      setErrorMessage("Неправильный email или пароль")
      console.error(loginMutation.error)
    }
  }, [
    loginMutation.isSuccess,
    loginMutation.isError,
    loginMutation.error,
    setActive,
    navigate,
    setIsAuth,
  ])

  const handleLogin = React.useCallback(
    function handleLogin() {
      loginMutation.mutateAsync(form)
    },
    [form, loginMutation],
  )

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Enter") {
        handleLogin()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleLogin])

  function setValue({
    key,
    value,
  }: typings.CreatePayloadType<typeof INITIAL_STATE>) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Modal
      title="Авторизация"
      className={styles.base}
      onClose={() => setActive(null)}
    >
      <div className={styles.form}>
        <FieldWrap label="Email">
          <TextField
            variant="outlined"
            size="small"
            type="email"
            name="email"
            placeholder="email@mail.ru"
            value={form.email}
            onChange={(event) =>
              setValue({ key: "email", value: event.currentTarget.value })
            }
          />
        </FieldWrap>
        <FieldWrap label="Пароль">
          <TextField
            type="password"
            name="password"
            variant="outlined"
            size="small"
            placeholder="*********"
            value={form.password}
            onChange={(event) =>
              setValue({ key: "password", value: event.currentTarget.value })
            }
          />
        </FieldWrap>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
      <div className={styles.buttons}>
        <Button
          disabled={!form.email || !form.password}
          variant="outlined"
          onClick={handleLogin}
        >
          Войти
        </Button>
        <Button
          variant="text"
          onClick={() => setActive(MODAL_NAME.REGISTRATION)}
        >
          Зарегистрироваться
        </Button>
      </div>
    </Modal>
  )
}
