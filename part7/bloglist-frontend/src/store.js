import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import gotErrorReducer from './reducers/gotErrorReducer'
import userReducer from './reducers/userReducer'
import usersInfoReducer from './reducers/usersInfoReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    gotError: gotErrorReducer,
    user: userReducer,
    usersInfo: usersInfoReducer
  }
})

export default store