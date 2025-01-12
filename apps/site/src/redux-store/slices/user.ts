import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type State = {
  name: string | null
}

export const initialState: State = {
  name: null
}

const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload
    }
  }
})

export const actions = userSlice.actions

export const { setName } = userSlice.actions
export default userSlice.reducer