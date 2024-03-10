import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
  })

  const vote = ({ id, content }) => {
    dispatch((voteFor(id)))

    dispatch(setNotification(`you voted for '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return (
    <div>
      <ul style={{ listStyle:'none', paddingLeft:0 }}>
        {anecdotes.map((anecdote) =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote({ id: anecdote.id, content: anecdote.content })}
          />
        )}
      </ul>
    </div>
  )
}

export default Anecdotes