import { Outlet } from "react-router"

import { Header } from "@/components/ui/Header"

import styles from "./Main.module.scss"

export function Main() {
  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <Header withLogo />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  )
}
