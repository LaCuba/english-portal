import {
  Navigate,
  Outlet,
} from "react-router"

import { store } from "@/store"

export function Private() {
  const isAuth = store.useAuthStore((state) => state.isAuth)

  if (isAuth) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}
