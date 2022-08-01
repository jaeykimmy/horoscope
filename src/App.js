import { useState, useEffect } from "react";
import axios from "axios";

export default function Aztro() {
  const [json, setJson] = useState({});

  useEffect(() => {
    axios
      .post("https://aztro.sameerkumar.website", null, {
        params: {
          sign: "gemini",
          day: "today",
        },
      })
      // .then((response) => response.json())
      .then(function (response) {
        setJson(response.data);
      });
  }, []);

  return (
    <div>
      Current Date: {json.current_date} <br />
      Compatibility: {json.compatibility} <br />
      Lucky Number: {json.lucky_number} <br />
      Lucky Time: {json.lucky_time} <br />
      Color: {json.color} <br />
      Date Range: {json.date_range} <br />
      Mood: {json.mood} <br />
      Description: {json.description} <br />
    </div>
  );
}
