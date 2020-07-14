import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick} >{props.text}</button>
)

const StatisticLine = (props) => (
  <>
    <td>{props.name}</td>
    <td>{props.value} {props.after}</td>
  </>
)

const Statistics = (props) => {
  const parseResult = result => isNaN(result) ? 0 : result

  const good = parseResult(props.good)
  const neutral = parseResult(props.neutral)
  const bad = parseResult(props.bad)
  const all = parseResult(good + neutral + bad)
  const average = parseResult((good - bad) / (good + neutral + bad))
  const positive = parseResult((good / (good + neutral + bad)) * 100)

  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <tr><StatisticLine name="good" value={good} /></tr>
        <tr><StatisticLine name="neutral" value={neutral} /></tr>
        <tr><StatisticLine name="bad" value={bad} /></tr>
        <tr><StatisticLine name="all" value={all} /></tr>
        <tr><StatisticLine name="average" value={average} /></tr>
        <tr><StatisticLine name="positive" value={positive} after="%" /></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>Feedback</h2>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <div>
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)