import { BrowserRouter } from "react-router"
import { store } from "../redux-store"
import { Routes } from "./Routes"
import { Provider } from "react-redux"

export function Base() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}
