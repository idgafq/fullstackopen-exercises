import { useDispatch, useSelector } from "react-redux"
import { voteFor } from "../reducers/anecdoteReducer"

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
  const anecdotes = useSelector((s) => s.sort((a, b) => b.votes - a.votes))

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul style={{ listStyle:'none', paddingLeft:0 }}>
        {anecdotes.map((anecdote) =>
          <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteFor(anecdote.id))}
          />
        )}
      </ul>
    </div>
  )
}

export default Anecdotes