import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="ml-4">
        username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-64 block w-full rounded-md border-grey-300 shadow-sm" />
      </div>
      <div className="ml-4">
        password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-64 block w-full rounded-md border-gray-300 shadow-sm" />
      </div>
      <button type="submit" className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        login
      </button>
    </form>
  )
}

export default LoginForm