import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector(({ notification }) => notification)
  const gotErrorState = useSelector(({ gotError }) => gotError)

  if (!message) {
    return null
  }
  return (
    <div className={gotErrorState? 'error' : 'notification'}>
      {message}
    </div>
  )
}

export default Notification