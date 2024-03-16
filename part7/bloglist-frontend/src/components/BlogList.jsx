import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const blogsSorted = useMemo(() =>  [...blogs].sort((a, b) => b.likes - a.likes), [blogs])
  const user = useSelector((({ user }) => user))

  return (
    <div>
      <h2 className="ml-4 font-bold text-xl">blogs</h2>
      <ul>
        {blogsSorted.map((blog) =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )}
      </ul>
    </div>
  )
}

export default BlogList