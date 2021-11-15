import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";

export default function CreateDay() {
  const daysUrl = "http://localhost:3001/days"
  const days = useFetch(daysUrl).length;
  const [daysLen, setDaysLen] = useState(days);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setDaysLen(days)
  }, [days])

  function addDay() {
    if (!isLoading) {
    setIsLoading(true);
    fetch(daysUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        day: daysLen + 1
      })
    })
    .then(res => {
      if (res.ok) {
        alert("날짜가 추가되었습니다");
        setDaysLen(daysLen + 1);
      }
    })
    .catch(err => {
      alert("에러가 발생했습니다");
      console.log(err);
    })
  }
}
function subDay() {
  fetch(daysUrl + `/${daysLen}`, {
    method: "DELETE",
  })
  .then(res => {if (res.ok) {
    alert("날짜가 제거되었습니다");
    setDaysLen(daysLen - 1);
  }
})
  .catch(err => {
    alert("에러가 발생했습니다");
    console.log(err);
  })
}
  if (days === 0) {
    return <p>로딩중...</p>
  }
  return (
    <div>
      <h3>현재 일수 : {daysLen}일</h3>
      <button onClick={addDay}>1 Day 추가</button>&nbsp;
      <button onClick={subDay}>1 Day 제거</button>
    </div>
  );
}