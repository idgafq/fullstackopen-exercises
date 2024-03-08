import { useState, useEffect, useRef } from 'react'
import Blog from'./components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [sortedBlogs, setSortedBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [gotError, setGotError] = useState(false)
  const [messageTimeOutObject, setMessageTimeOutObject] = useState(null)

  const toggalbleBlogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((data) => setBlogs(data))
      .catch((error) => {
        setGotError(true)
        displayMessage({ message: error.message, delay: 5000 })
      })
  }, [])

  useEffect(() => {
    const userLoggedinInfoJSON = window.localStorage.getItem('userLoggedinInfo')
    if (userLoggedinInfoJSON) {
      const user = JSON.parse(userLoggedinInfoJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }, [blogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginResponse = await loginService.login({
        username, password
      })
      const user = loginResponse.data
      window.localStorage.setItem(
        'userLoggedinInfo', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setGotError(true)
      if (exception.response) {
        if (exception.response.status === 401) {
          displayMessage({ message: 'wrong username or password', delay: 5000 })
        } else if (exception.response.status === 500) {
          displayMessage({ message: 'not connected to server', delay: 5000 })
        } else {
          displayMessage({ message: 'unspecified error', delay: 5000 })
        }
      } else {
        displayMessage({ message: 'network error', delay: 5000 })
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = (newBlog) => {
    toggalbleBlogFormRef.current.toggleVisibility()
    blogService
      .create({ newObject: newBlog, token: user.token })
      .then((data) => {
        setBlogs(blogs.concat(data))
        displayMessage({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, delay: 5000 })
      })
      .catch((error) => {
        setGotError(true)
        displayMessage({ message: error.message, delay: 5000 })
      })
  }

  const updateBlog = async (newBlog) => {
    try {
      const updatedBlogPopulated = await blogService.update({ id: newBlog.id, newObject: newBlog })
      setBlogs(blogs.map((b) => b.id !== updatedBlogPopulated.id ? b: updatedBlogPopulated))
      displayMessage({ message: `liked ${updatedBlogPopulated.title} by ${updatedBlogPopulated.author}`, delay: 5000 })
    } catch (exception) {
      setGotError(true)
      displayMessage({ message: exception.message, delay: 5000 })
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove({ id, token: user.token })
      setBlogs(blogs.filter((b) => b.id !== id))
    } catch (exception) {
      setGotError(true)
      displayMessage({ message: exception.message, delay: 5000 })
    }
  }

  const loginPage = () => {
    return (
      <div>
        <h2>log in to application</h2>
        {message && <Notification message={message} isError={gotError} />}
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  const displayMessage = ({ message, delay }) => {
    setMessage(message)
    if (messageTimeOutObject) {
      clearTimeout(messageTimeOutObject)
    }
    setMessageTimeOutObject(setTimeout(() => {
      setMessage(null)
      setGotError(false)
    }, delay))
  }

  return (
    user === null ?
      loginPage() :
      <div>
        {message && <Notification message={message} isError={gotError} />}
        <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
        <h2>create new</h2>
        <Togglable buttonLabel="new blog" ref={toggalbleBlogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        <h2>blogs</h2>
        <ul style={{ listStyle:'none', paddingLeft:0 }}>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
          )}
        </ul>
      </div>
  )
}

export default App