const UserInfo = ({ userInfo }) => {
  if (!userInfo) {
    return null
  }
  return (
    <div>
      <h2 className="text-2xl text-blue-700 font-bold ml-4">{userInfo.name}</h2>
      <h3 className="text-xl text-blue-600 font-bold mb-2 ml-4">added blogs</h3>
      <ul className="list-decimal list-inside pl-4 text-gray-700">
        {userInfo.blogs.map((blog) =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default UserInfo