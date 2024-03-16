import { createSlice } from '@reduxjs/toolkit'
import { setGotError } from "./gotErrorReducer"
import { setNotification } from "./notificationReducer"
import userService from '../services/users'

const initialState = []

const usersInfoSlice = createSlice({
  name: 'usersInfo',
  initialState,
  reducers: {
    setUsersInfo(state, action) {
      return action.payload
    },
    appendUserBlog(state, action) {
      for (const user of state) {
        if (user.id === action.payload.user.id) {
          user.blogs.push(action.payload)
        }
      }
    },
    removeUserBlog(state, action) {
      for (const user of state) {
        if (user.id === action.payload.user.id) {
          user.blogs = user.blogs.filter((b) => b.id !== action.payload.id)
        }
      }
    },
    updateUserBlog(state, action) {
      for (const user of state) {
        if (user.id === action.payload.user.id) {
          user.blogs = user.blogs.map((b) => b.id !== action.payload.id ? b : action.payload)
        }
      }
    }
  }
})

export const { setUsersInfo, appendUserBlog, removeUserBlog, updateUserBlog } = usersInfoSlice.actions

export const getUsersInfo = () => {
  return async (dispatch) => {
    try {
      const usersInfo = await userService.getAll()
      dispatch(setUsersInfo(usersInfo))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export default usersInfoSlice.reducer