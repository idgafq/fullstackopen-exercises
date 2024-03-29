import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const getRandomAnecdote = () => {
    setSelected(getRandomIntInclusive(0, anecdotes.length - 1))
  }

  const voteSelected = () => {
    const newArray = [...votes]
    newArray[selected] += 1
    setVotes(newArray)

    newArray.forEach((votes, idx) => {
      if (votes > newArray[mostVoted]) {
        setMostVoted(idx)
      }
    })
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handleClick = {() => voteSelected()} text = 'vote' />
      <Button handleClick = {() => getRandomAnecdote()} text = 'next anecdote' />
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

const getRandomIntInclusive = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


export default App