import { Outlet } from "react-router"
import styles from "./Client.module.scss"
import { Sidebar } from "../../ui/Sidebar"
import { SIDEBAR_NAV_LINKS } from "./const"
import { Header } from "@/components/ui/Header"

export function Client() {
  return (
    <div className={styles.base}>
      <Sidebar navLinks={SIDEBAR_NAV_LINKS} />
      <div className={styles.content}>
        <Header />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
