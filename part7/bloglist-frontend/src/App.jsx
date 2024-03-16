import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { getLocalUser, logout } from './reducers/userReducer'
import { getUsersInfo } from './reducers/usersInfoReducer'

import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersInfo from './components/UsersInfo'
import UserInfo from './components/UserInfo'
import BlogView from './components/BlogView'
import './App.css'

const App = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [blog, setBlog] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getLocalUser())
    dispatch(getUsersInfo())
  }, [dispatch])

  const user = useSelector(({ user }) => user)
  const usersInfo = useSelector(({ usersInfo }) => usersInfo)
  const blogs = useSelector(({ blogs }) => blogs)

  const matchUser = useMatch('/users/:id')
  useEffect(() => {
    setUserInfo(matchUser ? usersInfo.find((u) => u.id === matchUser.params.id) : null)
  }, [usersInfo, matchUser])

  const matchBlog = useMatch('/blogs/:id')
  useEffect(() => {
    setBlog(matchBlog ? blogs.find((b) => b.id === matchBlog.params.id) : null)
  }, [blogs, matchBlog])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const loginPage = () => {
    return (
      <div className="max-w-screen-md mx-auto">
        <h2 className="text-2xl text-blue-700 font-bold mb-4 ml-4">log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }
  
  return (
    user === null ? loginPage() :
      <div>
        <div className="flex space-x-4 items-center p-4">
          <Link className="font-bold text-xl text-blue-500 hover:text-blue-800" to="/">blogs</Link>
          <Link className="font-bold text-xl text-blue-500 hover:text-blue-800" to="/users">users</Link>
          <span className="text-sm ml-auto">{user.name} logged in </span>
          <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>logout</button>
        </div>
        <h2 className="text-2xl font-bold ml-4 mb-4">blog app</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersInfo />} />
          <Route path="/users/:id" element={<UserInfo userInfo={userInfo} />} />
          <Route path="/blogs/:id" element={<BlogView blog={blog} />} />
        </Routes>
      </div>
  )
}

export default App