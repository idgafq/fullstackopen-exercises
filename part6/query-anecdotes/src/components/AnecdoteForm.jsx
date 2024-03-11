import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      console.log(newAnecdote)
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => oldAnecdotes.concat(newAnecdote))
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `added ${newAnecdote.content}`})
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (error) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote too short, must have length 5 or more`})
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
