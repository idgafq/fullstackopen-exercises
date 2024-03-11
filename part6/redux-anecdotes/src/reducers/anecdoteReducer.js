import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers:{
    updateAnecdote(state, action) {
      return state.map((a) => a.id !== action.payload.id ? a : action.payload)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(sate, action) {
      return action.payload
    }
  }
})

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const resData = await anecdoteService.createNew({ content, votes: 0 })
    dispatch(appendAnecdote(resData))
  }
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const resData = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(updateAnecdote(resData))
  }
}
export default anecdoteSlice.reducer