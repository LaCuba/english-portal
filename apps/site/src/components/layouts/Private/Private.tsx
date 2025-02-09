import { store } from "@/store"
import { Navigate, Outlet } from "react-router"

export function Private() {
  const isAuth = store.useAuthStore((state) => state.isAuth)

  if (isAuth) {
    return <Outlet />
  }

  return <Navigate to="/" replace />
}
