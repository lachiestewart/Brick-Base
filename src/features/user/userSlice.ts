import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../types"


const initialState: { user: IUser | null } = {
  user: null,
}

export const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      login: (state, action: { payload: IUser }) => {
        console.log('login')
        state.user = action.payload
      },
      logout: (state) => {
        console.log('logout')
        state.user = null
      }
    }
  }
)

export const { login, logout } = userSlice.actions

export default userSlice.reducer