import { Modal } from "@/components/ui/Modal"
import styles from "./Auth.module.scss"
import { store } from "@/store"
import { Button, TextField } from "@mui/material"
import { FieldWrap } from "@/components/ui/FieldWrap"
import { MODAL_NAME } from "@/store/modals"

export function Auth() {
  const setActive = store.useModalStore((state) => state.setActive)

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
        <Button variant="outlined">Войти</Button>
        <Button variant="text" onClick={() => setActive(MODAL_NAME.REGISTRATION)}>Зарегистрироваться</Button>
      </div>
    </Modal>
  )
}
