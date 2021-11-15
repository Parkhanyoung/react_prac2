import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function Daylist() {
  const days = useFetch("http://localhost:3001/days") 
  if (days.length === 0) {
    return (
      <p>로딩중...</p>
    )
  }
  return (
    <ul className="list_day">
      {days.map(day => (
      <li key={day.id}>
        <Link to={`/day/${day.day}`}>Day {day.day}</Link>
      </li>
      ))}
    </ul>
  );
}
