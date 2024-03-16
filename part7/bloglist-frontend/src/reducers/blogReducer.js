import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setGotError } from './gotErrorReducer'
import { appendUserBlog, removeUserBlog, updateUserBlog } from './usersInfoReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    updateBlog(state, action) {
      return state.map((b) => b.id !== action.payload.id ? b : action.payload)
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload.id)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const { updateBlog, removeBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export const createBlog = (newObjectAndToken) => {
  return async (dispatch) => {
    try {
      const resPopulatedData = await blogService.create(newObjectAndToken)
      dispatch(appendBlog(resPopulatedData))
      dispatch(appendUserBlog(resPopulatedData))
      dispatch(setNotification(`added ${resPopulatedData.title} by ${resPopulatedData.author}`, 5))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      delete updatedBlog.comments
      const resPopulatedData = await blogService.update(updatedBlog)
      dispatch(updateBlog(resPopulatedData))
      dispatch(updateUserBlog(resPopulatedData))
      dispatch(setNotification(`liked ${resPopulatedData.title} by ${resPopulatedData.author}`, 5))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export const deleteBlog = (blogAndToken) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogAndToken)
      dispatch(removeBlog(blogAndToken.blog))
      dispatch(removeUserBlog(blogAndToken.blog))
      dispatch(setNotification(`removed ${blogAndToken.blog.title} by ${blogAndToken.blog.author}`, 5))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export const addComment = (blogAndContent) => {
  return async (dispatch) => {
    try {
      const resPopulatedData = await blogService.postComment(blogAndContent)
      dispatch(updateBlog(resPopulatedData))
      dispatch(updateUserBlog(resPopulatedData))
    } catch (e) {
      dispatch(setGotError(5))
      dispatch(setNotification(e.message, 5))
    }
  }
}

export default blogSlice.reducer