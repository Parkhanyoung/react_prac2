import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word from "./Word";

export default function Day() {
  const days = useFetch("http://localhost:3001/days").length
  const [daysLen, setDaysLen] = useState(days);
  useEffect(() => {
    setDaysLen(days);
  },  [days])

  const day = useParams().day;
  const wordList = useFetch(`http://localhost:3001/words/?day=${day}`)

  const history = useHistory(); 
  function pageBefore() {
    history.push(`/day/${Number(day) - 1}`)
  }
  function pageAfter() {
    history.push(`/day/${Number(day) + 1}`)
  }

  return (
    <>
    <h2>{(day !== "1") && <button onClick={pageBefore}>이전</button>}
        Day {day} 
        {(Number(day) !== daysLen) && <button onClick={pageAfter}>다음</button>}
    </h2>
    <table>
      <tbody>
        {wordList.map(word => (
          <Word word={word} key={word.id} />
        ))}
      </tbody>
    </table>
    </>
  );
}
