import { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Autocomplete } from "@mui/material";

export default function Aztro() {
  const [json, setJson] = useState({});
  const [sign, setSign] = useState("");
  const [day, setDay] = useState("");
  const dayOptions = ["yesterday", "today", "tomorrow"];

  const onDayChange = (_, value) => {
    setDay(value);
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
        {/* <TextField onChange={(e) => setDay(e.target.value)} /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={dayOptions}
          sx={{ width: 300 }}
          onChange={onDayChange}
          renderInput={(params) => <TextField {...params} label="Day" />}
        />
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
