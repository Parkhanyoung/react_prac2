import useFecth from "../hooks/useFetch"
import { useRef, useState } from "react"
import { useHistory } from "react-router-dom"

export default function CreateWord() {
  const days = useFecth("http://localhost:3001/days");
  const dayList = days.map(day => {
    return <option key={day.id}>{day.day}</option>
  })
  console.log(days)
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();

  function onSubmit(e) {
    e.preventDefault();
    
    if (!isLoading) {
      setIsLoading(true);
      fetch("http://localhost:3001/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day: dayRef.current.value,
        eng: engRef.current.value,
        kor: korRef.current.value,
        isDone: false,
      })
    })
    .then(res => {
      if (res.ok) {
        alert("생성이 완료되었습니다.")
        history.push(`/day/${dayRef.current.value}`)
      }
    })
  }
}

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {dayList}
        </select>
      </div>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1
        }}
      >{isLoading ? "saving" : "저장"}</button>
    </form>
  );
}