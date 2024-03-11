import { useSelector, useDispatch } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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

  const vote = (anecdote) => {
    dispatch((voteFor(anecdote)))

    dispatch(setNotification(`you voted for '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <ul style={{ listStyle:'none', paddingLeft:0 }}>
        {anecdotes.map((anecdote) =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
          />
        )}
      </ul>
    </div>
  )
}

export default Anecdotes