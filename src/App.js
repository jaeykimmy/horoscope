import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";

export default function Aztro() {
  const [json, setJson] = useState({});
  const [sign, setSign] = useState("");
  const [day, setDay] = useState("");

  const handleSign = (event) => {
    event.preventDefault();
  };
  const searchSignDay = () => {
    axios
      .post("https://aztro.sameerkumar.website", null, {
        params: {
          sign: sign,
          day: day,
        },
      })
      .then(function (response) {
        setJson(response.data);
      });
  };

  return (
    <div>
      <>
        <TextField onChange={(e) => setSign(e.target.value)} />
        <TextField onChange={(e) => setDay(e.target.value)} />
        <Button type="submit" onClick={searchSignDay}>
          Submit
        </Button>

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
      </>
    </div>
  );
}
