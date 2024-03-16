import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, addComment } from '../reducers/blogReducer'

const BlogView = ({blog}) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(addComment({ blog, content: comment }))
    setComment('')
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>
      <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes<button onClick={handleLike}>like</button><br />
        added by {blog.user.name}
      </p>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input name='comment' value={comment} onChange={({ target }) => setComment(target.value)} placeholder='comment' />
            <button type="submit">add comment</button>
          </div>
          <ul>
            {blog.comments.map((comment) =>
              <li key={comment.id}>{comment.content}</li>
            )}
          </ul>
        </form>
      </div>
    </div>
  )
}

export default BlogView