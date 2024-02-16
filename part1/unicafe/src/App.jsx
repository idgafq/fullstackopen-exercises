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
      <Button handleClick={() => addGood()} text='good' />
      <Button handleClick={() => addNeutral()} text='neutral' />
      <Button handleClick={() => addBad()} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine value={good} text='good' />
          <StatisticLine value={neutral} text='neutral' />
          <StatisticLine value={bad} text='bad' />
          <StatisticLine value={good + neutral + bad} text='all' />
          <StatisticLine value={(good - bad) / (good + neutral + bad)} text='average' />
          <StatisticLinePercent value={good / (good + neutral + bad) * 100} text='positive' />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const StatisticLinePercent = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value} %</td>
  </tr>
)

export default App