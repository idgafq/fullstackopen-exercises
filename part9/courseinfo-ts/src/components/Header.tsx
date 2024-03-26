interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  return <h1>Hello, {props.courseName}</h1>;
};

export default Header