import React from "react"

import { api } from "@/api"
import { FieldWrap } from "@/components/ui/FieldWrap"
import { Modal } from "@/components/ui/Modal"
import { __, typings } from "@/helpers"
import { store } from "@/store"
import { Button, MenuItem, Select, TextField } from "@mui/material"

import styles from "./AddGroup.module.scss"

type FormState = {
  name: string
  userIds: number[]
}

const INITIAL_STATE = {
  name: "",
  userIds: [],
} as FormState

export function AddGroup() {
  const [form, setForm] = React.useState(INITIAL_STATE)
  const [errorMessage, setErrorMessage] = React.useState("")

  const createChat = api.chat.useCreateChatGroup()
  const { data } = api.user.useGetUsers()

  const setActive = store.useModalStore((state) => state.setActive)

  React.useEffect(() => {
    if (createChat.isError) {
      setErrorMessage("Ошибка, обратитесь к администратору")
    }
    if (createChat.isSuccess) {
      setActive(null)
    }
  }, [createChat.isError, createChat.isSuccess, setActive])

  function setValue({
    key,
    value,
  }: typings.CreatePayloadType<typeof INITIAL_STATE>) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  function handleCreateGroup() {
    if (!form.name || !form.userIds.length) {
      setErrorMessage("Заполните все поля")
      return
    }
    createChat.mutate(form)
  }

  return (
    <Modal
      title="Создание чат группы"
      className={styles.base}
      onClose={() => setActive(null)}
    >
      <div className={styles.form}>
        <FieldWrap label="Наименование чата">
          <TextField
            variant="outlined"
            required
            size="small"
            placeholder="Мой чат"
            value={form.name}
            onChange={(event) =>
              setValue({ key: "name", value: event.currentTarget.value })
            }
          />
        </FieldWrap>
        <FieldWrap label="Выбери пользователей">
          <Select
            multiple
            value={form.userIds}
            size="small"
            required
            onChange={(event) =>
              setValue({
                key: "userIds",
                value: event.target.value as number[],
              })
            }
            // input={<OutlinedInput label="Name" />}
            // MenuProps={MenuProps}
          >
            {__.map(data?.users, (user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FieldWrap>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
      <div className={styles.buttons}>
        <Button variant="outlined" onClick={handleCreateGroup}>
          Создать
        </Button>
        <Button variant="text" onClick={() => setActive(null)}>
          Отмена
        </Button>
      </div>
    </Modal>
  )
}
