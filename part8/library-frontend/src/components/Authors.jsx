import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from './queries'
import { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  let authors = []

  const result = useQuery(ALL_AUTHORS)
  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR)

  const submit = (event) => {
    event.preventDefault()
    setBirthyear({ variables: { name, setBornTo: parseInt(year) } })
  }


  if (!props.show) {
    return null
  }
  
  if (result.loading) {
    return <div>loading</div>
  }

  if (result.data.allAuthors) {
    authors = result.data.allAuthors
    if (authors.length > 0 && name === '') {
      setName(authors[0].name)
    }
  }

  return (
    <div>

      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
        </select>
        <div>
          born <input value={year} onChange={({ target }) => setYear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors