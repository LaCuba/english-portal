import React from "react"

import { useNavigate } from "react-router"

import { api } from "@/api"
import { FieldWrap } from "@/components/ui/FieldWrap"
import { Modal } from "@/components/ui/Modal"
import { typings } from "@/helpers"
import { store } from "@/store"
import { MODAL_NAME } from "@/store/modals"
import { Button, TextField } from "@mui/material"

import styles from "./Registration.module.scss"

type FormState = {
  email: string
  name: string
  password: string
}

const INITIAL_STATE = {
  email: "",
  name: "",
  password: "",
} as FormState

export function Registration() {
  const navigate = useNavigate()
  const [form, setForm] = React.useState(INITIAL_STATE)
  const [errorMessage, setErrorMessage] = React.useState("")

  const registerMutation = api.auth.useRegisterUser()

  const setActive = store.useModalStore((state) => state.setActive)

  React.useEffect(() => {
    if (registerMutation.isSuccess) {
      setActive(null)
      navigate("/client/profile")
    }
    if (registerMutation.isError) {
      setErrorMessage("Неправильный email или пароль")
      console.error(registerMutation.error)
    }
  }, [
    registerMutation.isSuccess,
    registerMutation.isError,
    registerMutation.error,
    setActive,
    navigate,
  ])

  function handleRegister() {
    registerMutation.mutateAsync(form)
  }

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
      title="Регистрация"
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
        <FieldWrap label="Имя пользователя">
          <TextField
            variant="outlined"
            name="name"
            size="small"
            placeholder="nickname"
            value={form.name}
            onChange={(event) =>
              setValue({ key: "name", value: event.currentTarget.value })
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
        <Button variant="outlined" onClick={handleRegister}>
          Зарегистрироваться
        </Button>
        <Button variant="text" onClick={() => setActive(MODAL_NAME.AUTH)}>
          Уже есть аккаунт
        </Button>
      </div>
    </Modal>
  )
}
