import React from 'react'

const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;

const Header = (props) => {
  return (
    <>
      <h2>{props.name}</h2>
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
  let val = props.arr.reduce(reducer, 0)
  return (
    <>
      <h3>Number of exercises {val}</h3>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content arr={course.parts} />
      <Total arr={course.parts} />
    </>
  )
}

export default Course