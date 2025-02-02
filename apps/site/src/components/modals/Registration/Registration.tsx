import { Modal } from "@/components/ui/Modal"
import styles from "./Registration.module.scss"
import { store } from "@/store"
import { Button, TextField } from "@mui/material"
import { FieldWrap } from "@/components/ui/FieldWrap"
import { MODAL_NAME } from "@/store/modals"

export function Registration() {
  const setActive = store.useModalStore((state) => state.setActive)

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
          />
        </FieldWrap>
        <FieldWrap label="Имя пользователя">
          <TextField
            variant="outlined"
            name="name"
            size="small"
            placeholder="nickname"
          />
        </FieldWrap>
        <FieldWrap label="Пароль">
          <TextField
            type="password"
            name="password"
            variant="outlined"
            size="small"
            placeholder="*********"
          />
        </FieldWrap>
      </div>
      <div className={styles.buttons}>
        <Button variant="outlined">Зарегистрироваться</Button>
        <Button variant="text" onClick={() => setActive(MODAL_NAME.AUTH)}>
          Уже есть аккаунт
        </Button>
      </div>
    </Modal>
  )
}
