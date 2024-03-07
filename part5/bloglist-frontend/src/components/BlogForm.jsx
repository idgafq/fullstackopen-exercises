import { useState } from 'react'
const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await addBlog({ title: newTitle, author: newAuthor, url: newUrl })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input name='title' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} placeholder='blog title' />
      </div>
      <div>
        author:
        <input name='author' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} placeholder='blog author' />
      </div>
      <div>
        url:
        <input name='url' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} placeholder='blog url' />
      </div>
      <button type="submit">
        create
      </button>
    </form>
  )
}
export default BlogForm