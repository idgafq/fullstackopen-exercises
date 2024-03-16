import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const token = useSelector((({ user }) => user.token))

  const handleSubmit = async (event) => {
    event.preventDefault()
    await dispatch(createBlog({ newObject: { title, author, url }, token }))
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleVisibility()
  }

  return (
    <form className="ml-4 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className='font-bold'>title:</label>
        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        name='title' value={title} onChange={({ target }) => setTitle(target.value)} placeholder='blog title' />
      </div>
      <div>
        <label className='font-bold'>author:</label>
        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        name='author' value={author} onChange={({ target }) => setAuthor(target.value)} placeholder='blog author' />
      </div>
      <div>
      < label className='font-bold'>url:</label>
        <input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        name='url' value={url} onChange={({ target }) => setUrl(target.value)} placeholder='blog url' />
      </div>
      <button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        create
      </button>
    </form>
  )
}
export default BlogForm