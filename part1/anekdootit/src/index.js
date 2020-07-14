import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.onClick} >{props.text}</button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const randNum = () => {
    return Math.floor(Math.random() * props.anecdotes.length)
  }

  const addVote = () => {
    const arr = [...votes]
    arr[selected] += 1
    return arr
  }

  const subtractVote = () => {
    const arr = [...votes]
    arr[selected] -= 1
    return arr
  }

  const mostVotes = () => {
    let winnerIndex = 0
    let winnerVotes = 0

    let i = 0
    for (i; i < votes.length; i++) {
    if (votes[i] > winnerVotes) {
      winnerIndex = i
      winnerVotes = votes[i]
    }
   }
    return props.anecdotes[winnerIndex]
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Button onClick={() => setSelected(() => randNum())} text="Random anecdote" />
      <Button onClick={() => setVotes(() => addVote())} text="Vote +1" />
      <Button onClick={() => setVotes(() => subtractVote())} text="Vote -1" />
      <p>{props.anecdotes[selected]}</p>
      <h4>{votes[selected]} votes</h4>
      <h2>Anecdote with most votes</h2>
      <p>{mostVotes()}</p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)