import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersInfo = () => {
  const usersInfo = useSelector(({ usersInfo }) => usersInfo)
  return (
    <div>
      <h3>Users</h3>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <ul style={{ listStyle:'none', paddingLeft:0 }}>
          <li>&nbsp;</li>
          {usersInfo.map((userInfo) =>
            <li key={userInfo.id}>
              <Link to={`/users/${userInfo.id}`}>
                {userInfo.name}
              </Link>
            </li>
          )}
        </ul>
        <ul style={{ listStyle:'none', paddingLeft:0, marginLeft: '1em' }}>
          <li><b>blogs created</b></li>
          {usersInfo.map((userInfo) =>
            <li key={userInfo.id}>{userInfo.blogs.length}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default UsersInfo