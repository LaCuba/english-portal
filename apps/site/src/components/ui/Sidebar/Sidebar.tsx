import { NavLink } from "react-router"
import clsx from "clsx"
import styles from "./Sidebar.module.scss"

export type SidebarNavLink = {
  id: string | number
  icon?: React.ReactNode
  label: string
  to: string
}

export type SidebarProps = {
  navLinks: SidebarNavLink[]
}

export function Sidebar(props: SidebarProps) {
  return (
    <div className={styles.base}>
      <div className={styles.logo}>Logo</div>
      <div className={styles.navLinks}>
        {props.navLinks.map((navLink) => {
          return (
            <NavLink key={navLink.id} to={navLink.to}>
              {({ isActive }) => (
                <div
                  className={clsx(
                    styles.navLink,
                    isActive && styles.navLink__active,
                  )}
                >
                  {navLink.icon}
                  <span>{navLink.label}</span>
                </div>
              )}
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
