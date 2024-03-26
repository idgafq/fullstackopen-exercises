import { useState } from "react"
import { NewDiaryEntry } from "../types"
import { Visibility, Weather } from "../types"

interface DiaryFormProps {
  handleAdd: (values: NewDiaryEntry) => void
}

const DiaryForm = ({ handleAdd }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleAdd({ date, visibility, weather, comment });
  };

  const parseVisibility = (value: string): Visibility => {
    if (Object.values(Visibility).map((v) => v.toString()).includes(value)) {
      return value as Visibility;
    } else {
      throw new Error('Incorrect visiblity')
    }
  }

  const parseWeather = (value: string): Weather => {
    if (Object.values(Weather).map((w) => w.toString()).includes(value)) {
      return value as Weather;
    } else {
      throw new Error('Incorrect weather')
    }
  }

  return (
  <form onSubmit={addDiary}>
    <div>
      date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
    </div>
    <div>
      visibility{Object.values(Visibility).map((v) => {
        return (
          <div key={v} style={{ display: 'inline-block', marginRight: '10px' }}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={(e) => setVisibility(parseVisibility(e.target.value))}
            />
            <label htmlFor={v}>{v}</label>
          </div>
        );
      })}
    </div>
    <div>
      weather{Object.values(Weather).map((w) => {
        return (
          <div key={w} style={{ display: 'inline-block', marginRight: '10px' }}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={(e) => setWeather(parseWeather(e.target.value))}
            />
            <label htmlFor={w}>{w}</label>
          </div>
        );
      })}
    </div>
    <div>
      comment<input value={comment} onChange={(e) =>setComment(e.target.value)} />
    </div>
    <button type="submit">
      add
    </button>
  </form>
  )
}

export default DiaryForm