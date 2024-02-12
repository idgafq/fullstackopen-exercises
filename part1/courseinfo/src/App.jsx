const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {
      name: 'Fundamentals of React', exercises: 10
    },
    {
      name: 'Using props to pass data', exercises: 7
    },
    {
      name: 'State of a component', exercises: 14
    }
  ]
  
  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.content[0].name} exercises={props.content[0].exercises} />
      <Part name={props.content[1].name} exercises={props.content[1].exercises} />
      <Part name={props.content[2].name} exercises={props.content[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.content.forEach((part) => (sum += part.exercises))
  return (
    <p>Number of exercises {sum}</p>
  )
}

export default App