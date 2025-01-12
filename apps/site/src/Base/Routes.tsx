import { Route, Routes as ReactRoutes } from "react-router"
import { Main } from "../pages/Main"
import { Profile } from "../pages/client/Profile"

export function Routes() {
  return (
    <ReactRoutes>
      <Route path="/client">
        <Route path="/client/profile" element={<Profile />} />
      </Route>
      <Route path="/">
        <Route index element={<Main />} />
      </Route>
    </ReactRoutes>
  )
}
