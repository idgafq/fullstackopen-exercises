const Course = ({ courses }) => {
    return (
        <ul style={{ listStyle:'none', paddingLeft:0 }}>
            {courses.map(course =>
                <Content key={course.id} course={course} />
            )}
        </ul>
    )
}

const Content = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <div>
            <h2>{course.name}</h2>
            <ul style={{ listStyle:'none', paddingLeft:0 }}>
                {course.parts.map((part) =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
            <b>total of {total} exercises</b>
        </div>
    )
}

const Part = ({ part }) => {
    return(
        <li>{part.name} {part.exercises}</li>
    )
}

export default Course