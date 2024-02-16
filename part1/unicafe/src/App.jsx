import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <AButton handleClick={() => addGood()} text='good' />
      <AButton handleClick={() => addNeutral()} text='neutral' />
      <AButton handleClick={() => addBad()} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <Display value={good} text='good' />
      <Display value={neutral} text='neutral' />
      <Display value={bad} text='bad' />
      <Display value={good + neutral + bad} text='all' />
      <Display value={(good - bad) / (good + neutral + bad)} text='average' />
      <PercentDisplay value={good / (good + neutral + bad) * 100} text='positive' />
    </div>
  )
}

const AButton = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ value, text }) => <div>{text} {value}</div>

const PercentDisplay = ({ value, text }) => <div>{text} {value} %</div>

export default App