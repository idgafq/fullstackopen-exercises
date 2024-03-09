import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote