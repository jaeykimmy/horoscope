import { useState } from "react";
import axios from "../node_modules/axios/index";
import {
  TextField,
  Button,
  Autocomplete,
} from "../node_modules/@mui/material/index";
import "./App.scss";

export default function Aztro() {
  interface JsonResponse {
    current_date: string;
    compatibility: string;
    lucky_number: string;
    lucky_time: string;
    color: string;
    date_range: string;
    mood: string;
    description: string;
  }
  const [json, setJson] = useState<JsonResponse>();
  const [sign, setSign] = useState("");
  const [day, setDay] = useState("");

  const dayOptions = ["yesterday", "today", "tomorrow"];
  const signOptions = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ];
  const onSignChange = (_: any, value: string) => {
    setSign(value);
  };
  const onDayChange = (_: any, value: string) => {
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
      .then(function (response: any) {
        setJson(response.data);
      });
  };
  console.log(json);

  return (
    <div className="App">
      <h1>Daily Horoscope</h1>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={signOptions}
        sx={{ width: 300 }}
        onChange={onSignChange}
        renderInput={(params: object) => <TextField {...params} label="Sign" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={dayOptions}
        sx={{ width: 300 }}
        onChange={onDayChange}
        renderInput={(params: object) => <TextField {...params} label="Day" />}
      />
      <Button type="submit" onClick={searchSignDay}>
        Submit
      </Button>
      {json && (
        <div className="response-container">
          Your Horoscope for: {json.current_date} <br />
          Compatibility: {json.compatibility} <br />
          Lucky Number: {json.lucky_number} <br />
          Lucky Time: {json.lucky_time} <br />
          Date Range: {json.date_range} <br />
          Mood: {json.mood} <br />
          <div style={{ "background-color": `${json.color}` }}>
            Color: {json.color} <br />
          </div>
          Description: {json.description} <br />
        </div>
      )}
    </div>
  );
}
