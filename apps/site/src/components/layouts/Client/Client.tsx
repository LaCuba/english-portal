import { Outlet } from "react-router"

import { Header } from "@/components/ui/Header"

import { Sidebar } from "../../ui/Sidebar"
import styles from "./Client.module.scss"
import { SIDEBAR_NAV_LINKS } from "./const"

export function Client() {
  return (
    <div className={styles.base}>
      <Sidebar navLinks={SIDEBAR_NAV_LINKS} />
      <div className={styles.content}>
        <Header withLogo={false} />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
