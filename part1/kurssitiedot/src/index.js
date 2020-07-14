import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return <p>{props.name} {props.val}</p>
}

const Content = (props) => {
  let results = []
  props.arr.forEach(e => {
    let x = <Part name={e.name} val={e.exercises} />
    results = results.concat([x])
  })
  return (
    <div>
      {results}
    </div>
  )
}

const Total = (props) => {
  let val = 0
  props.arr.forEach(e => {
    val += e.exercises
  });
  return (
    <>
      <p>Number of exercises {val}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content arr={course.parts} />
      <Total arr={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))