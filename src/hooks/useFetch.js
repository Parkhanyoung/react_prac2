import { useState, useEffect } from "react";

export default function useFetch(url) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      setdata(data)
    });
  }, [url]);

  return data;
}