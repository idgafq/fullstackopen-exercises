import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((({ user }) => user.token))

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideViewButton = () => {
    return (
      <button onClick={() => setShowDetails(!showDetails)}
      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        {showDetails? 'hide' : 'view'}
      </button>
    )
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog({ blog, token }))
    }
  }

  return (
    <li className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      {hideViewButton()}
      {showDetails &&
          <p>
            {blog.url}<br />
            <span className='likes'>likes {blog.likes}</span>
            <button onClick={handleLike} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              like
            </button><br />
            {blog.user.name}<br />
            {user.username === blog.user.username &&
              <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                remove
              </button>
            }
          </p>
      }
    </li>
  )
}

export default Blog