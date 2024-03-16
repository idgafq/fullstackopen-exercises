import { createSlice } from '@reduxjs/toolkit'
import { setGotError } from './gotErrorReducer'
import { setNotification } from './notificationReducer'
import loginService from '../services/login'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  },
})

export const { setUser, clearUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('userLoggedinInfo', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(clearUser())
    window.localStorage.clear()
  }
}

export const getLocalUser = () => {
  return (dispatch) => {
    const userLoggedinInfoJSON = window.localStorage.getItem('userLoggedinInfo')
    if (userLoggedinInfoJSON) {
      const user = JSON.parse(userLoggedinInfoJSON)
      dispatch(setUser(user))
    }
  }
}

export default userSlice.reducer