import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const blog = {
  title: 'Imaginary Post',
  author: 'Cartoon Character',
  url: 'abcdefg.com',
  likes: 999,
  user: {
    name: 'Web User',
    username: 'webuser'
  }
}

test('clicking create button calls event handler with right details', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()
  render(<BlogForm addBlog={mockHandler} />)

  const titleInput = screen.getByPlaceholderText('blog title')
  const authorInput = screen.getByPlaceholderText('blog author')
  const urlInput = screen.getByPlaceholderText('blog url')
  const createButton = screen.getByText('create')

  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(blog.title)
  expect(mockHandler.mock.calls[0][0].author).toBe(blog.author)
  expect(mockHandler.mock.calls[0][0].url).toBe(blog.url)
})