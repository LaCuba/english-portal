import { Route, Routes as ReactRoutes } from "react-router"

import {
  Client as ClientLayout,
  Main as MainLayout,
  Private as PrivateLayout,
} from "../components/layouts"
import { Chat } from "../pages/client/Chat"
import { Profile } from "../pages/client/Profile"
import { Main } from "../pages/Main"

export function Routes() {
  return (
    <ReactRoutes>
      <Route element={<MainLayout />}>
        <Route index element={<Main />} />
      </Route>
      <Route element={<PrivateLayout />}>
        <Route path="/client" element={<ClientLayout />}>
          <Route path="/client/profile" element={<Profile />} />
          <Route path="/client/chat" element={<Chat />} />
        </Route>
      </Route>
    </ReactRoutes>
  )
}
