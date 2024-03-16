import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const gotErrorSlice = createSlice({
  name: 'gotError',
  initialState,
  reducers: {
    setErrorState(state, action) {
      return action.payload
    },
    clearErrorState() {
      return false
    }
  },
})

export const { setErrorState, clearErrorState } = gotErrorSlice.actions

export const setGotError = (delay) => {
  return async (dispatch) => {
    dispatch(setErrorState(true))
    setTimeout(() => dispatch(clearErrorState()), delay * 1000)
  }
}

export default gotErrorSlice.reducer