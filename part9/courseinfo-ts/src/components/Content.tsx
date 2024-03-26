import Part from "./Part";
import { CoursePart } from "../App";

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return props.courseParts.map((c) => <Part coursePart={c} key={c.name} />)
};

export default Content