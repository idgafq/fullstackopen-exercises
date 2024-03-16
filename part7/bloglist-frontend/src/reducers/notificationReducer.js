import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return ''
    }
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(clearMessage()), delay * 1000)
  }
}

export default notificationSlice.reducer