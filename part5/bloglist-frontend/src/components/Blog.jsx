import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetials] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideViewButton = () => {
    return (
      <button onClick={() => setShowDetials(!showDetails)}>
        {showDetails? 'hide' : 'view'}
      </button>
    )
  }

  const likeButton = () => {
    return (
      <button onClick={handleLike}>
        like
      </button>
    )
  }

  const deleteButton = () => {
    return (
      <button onClick={handleDelete}>
        remove
      </button>
    )
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {hideViewButton()}
      {showDetails &&
          <p>
            {blog.url}<br />
            likes {blog.likes} {likeButton()}<br />
            {blog.user.name}<br />
            {user.username === blog.user.username && deleteButton()}
          </p>
      }
    </div>
  )
}

export default Blog