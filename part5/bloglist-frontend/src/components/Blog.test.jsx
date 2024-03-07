import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('initial render has title and author, not url or likes', async () => {
  const { container } = render(
    <Blog
      blog={blog}
      user={{ username: 'webuser' }}
      updateBlog={async () => undefined}
      deleteBlog={async () => undefined}
    />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
})

test('clicking view button shows url and likes', async () => {
  const { container } = render(
    <Blog
      blog={blog}
      user={{ username: 'webuser' }}
      updateBlog={async () => undefined}
      deleteBlog={async () => undefined}
    />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).toHaveTextContent(blog.url)
  expect(div).toHaveTextContent(blog.likes)
})

test('clicking like button calls event handler', async () => {
  const mockHandler = vi.fn()
  const { container } = render(
    <Blog
      blog={blog}
      user={{ username: 'webuser' }}
      updateBlog={mockHandler}
      deleteBlog={async () => undefined}
    />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})