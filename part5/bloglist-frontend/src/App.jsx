import { useState, useEffect } from 'react'
import Blog from'./components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')
  const [gotError, setGotError] = useState(false)
  const [messageTimeOutObject, setMessageTimeOutObject] = useState(null)

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

  const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.clear()
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

  const addBlog = (event) => {
    event.preventDefault()
    blogService
      .create({ newObject: { title: newTitle, author: newAuthor, url: newUrl, likes: newLikes }, token: user.token })
      .then((data) =>{
        setBlogs(blogs.concat(data))
        displayMessage({ message: `a new blog ${newTitle} by ${newAuthor} added`, delay: 5000 })
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
      })
      .catch((error) => {
        setGotError(true)
        displayMessage({ message: error.message, delay: 5000 })
      })
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

  return (
    user === null ?
      loginPage() :
      <div>
        {message && <Notification message={message} isError={gotError} />}
        <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title:<input name='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
          <div>author:<input name='author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
          <div>url:<input name='url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>
          <div>likes:<input name='likes' value={newLikes} onChange={({ target }) => setNewLikes(target.value)} /></div>
          <button type="submit">create</button>
        </form>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App