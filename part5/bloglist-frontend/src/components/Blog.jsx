import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideViewButton = () => {
    return (
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails? 'hide' : 'view'}
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

  return (
    <li className='blog' style={blogStyle}>
      {blog.title} {blog.author} {hideViewButton()}
      {showDetails &&
          <p>
            {blog.url}<br />
            <span className='likes'>likes {blog.likes}</span>{likeButton()}<br />
            {blog.user.name}<br />
            {user.username === blog.user.username && deleteButton()}
          </p>
      }
    </li>
  )
}

export default Blog