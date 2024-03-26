import { CoursePart } from '../App';

interface PartProps {
  coursePart: CoursePart
}

const Part = (props: PartProps) => {
  const coursePart = props.coursePart
  switch (coursePart.kind) {
    case "basic":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <em>{coursePart.description}</em>
        </p>
      )
    case "group":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <span>project exercises {coursePart.groupProjectCount}</span>
        </p>
      )
    case "background":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <em>{coursePart.description}</em><br />
          <span>submit to {coursePart.backgroundMaterial}</span>
        </p>
      )
    case "special":
      return (
        <p>
          <b>{coursePart.name} {coursePart.exerciseCount}</b><br />
          <em>{coursePart.description}</em><br />
          <span>required skills: {coursePart.requirements.join(", ")}</span>
        </p>
      )
    default:
      return assertNever(props.coursePart)
  }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part