import { configureStore } from "@reduxjs/toolkit"
import { reducers } from "./slices"
import * as actions from "./actions"

export { actions }

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type Actions = typeof actions
