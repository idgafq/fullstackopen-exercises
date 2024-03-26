import { useEffect, useState } from 'react'
import diariesService from './services/diaries'
import { NewDiaryEntry, NonSensitiveDiaryEntry } from './types'
import DiaryEntry from './components/DiaryEntry'
import DiaryForm from './components/DiaryForm'
import axios from 'axios'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDiaries = async () => {
      const allDiaries = await diariesService.getAll();
      setDiaries(allDiaries);
    };
  
    fetchDiaries();
  }, []);

  const addDiary = async (values: NewDiaryEntry) => {
    try {
      const addedDiary = await diariesService.create(values)
      setDiaries(diaries.concat(addedDiary))
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        setError(error.response.data)
        setTimeout(() => setError(''), 5000)
      } else {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <DiaryForm handleAdd={addDiary} />
      <h2>Diary entries</h2>
      {diaries.map((d) => <DiaryEntry diaryEntry={d} key={d.id} />)}
    </div>
  )
}

export default App