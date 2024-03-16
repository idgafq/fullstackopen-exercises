import { useRef } from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import BlogList from "./BlogList"

const Home = () => {
  const toggalbleBlogFormRef = useRef()
  const toggleVisibility = () => {
    toggalbleBlogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <Togglable buttonLabel="create new" ref={toggalbleBlogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
    <BlogList />
    </div>
  )
}

export default Home