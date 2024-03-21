import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])

  const allResult = useQuery(ALL_BOOKS)
  const filteredResult = useQuery(ALL_BOOKS, { variables: { genre } })

  useEffect(() => {
    if (allResult.data) {
      setGenres([...new Set(allResult.data.allBooks.flatMap((b) => b.genres))])
    }
  }, [allResult.data])

  if (!props.show) {
    return null
  }

  if (allResult.loading || filteredResult.loading) {
    return <div>loading...</div>
  }
  
  const books = genre ? filteredResult.data.allBooks : allResult.data.allBooks
  
  return (
    <div>
      <h2>books</h2>

      {genre && <div>in genre <b>{genre}</b></div>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {genres.map((g) => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      <button key={"all"} onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books