import { NonSensitiveDiaryEntry } from "../types";
interface DiaryEntryProps {
  diaryEntry: NonSensitiveDiaryEntry
}

const DiaryEntry = (props: DiaryEntryProps) => {
  return (
    <div>
      <h3>{props.diaryEntry.date}</h3>
      <p>
        visibility: {props.diaryEntry.visibility}<br />
        weather: {props.diaryEntry.weather}
      </p>
    </div>
  )
}

export default DiaryEntry