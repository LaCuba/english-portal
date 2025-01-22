import { combineReducers } from "redux"
import user from "./user"
import chat from "./chat"

export const reducers = combineReducers({
  user,
  chat,
})
