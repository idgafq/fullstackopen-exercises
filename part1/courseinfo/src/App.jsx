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

const Content = (props) => {
  const component = []
  props.content.forEach((part) => (component.push(<p>{part.name} {part.exercises}</p>)))
  return component
}

const Total = (props) => {
  let sum = 0
  props.content.forEach((part) => (sum += part.exercises))
  return (
    <p>Number of exercises {sum}</p>
  )
}

export default App