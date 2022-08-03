import { useState } from "react";
import axios from "../node_modules/axios/index";
import {
  TextField,
  Button,
  Autocomplete,
  Card,
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
  const [day, setDay] = useState("Today");

  const dayOptions = ["Yesterday", "Today", "Tomorrow"];
  const signOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
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
      <Card sx={{ padding: "16px" }}>
        <h1>Daily Horoscope</h1>
        <div className="response">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={signOptions}
            sx={{
              width: 300,
              "padding-bottom": "16px",
            }}
            onChange={onSignChange}
            renderInput={(params: object) => (
              <TextField {...params} label="Sign" />
            )}
          />
          <Autocomplete
            defaultValue="Today"
            disablePortal
            id="combo-box-demo"
            options={dayOptions}
            sx={{ width: 300, "padding-bottom": "16px" }}
            onChange={onDayChange}
            renderInput={(params: object) => (
              <TextField {...params} label="Day" />
            )}
          />
        </div>
        <Button type="submit" onClick={searchSignDay}>
          Submit
        </Button>
        {json && (
          <Card className="response-container" sx={{ padding: "16px" }}>
            Your Horoscope for: {json.current_date} <br />
            <h2>
              {sign}: {json.date_range}{" "}
            </h2>
            <div
              style={{
                "background-color": `${json.color}`,
                padding: "10px",
                "border-radius": "32px",
                "margin-bottom": "8px",
              }}
            >
              {json.color} <br />
            </div>
            Compatibility: {json.compatibility} <br />
            Lucky Number: {json.lucky_number} <br />
            Lucky Time: {json.lucky_time} <br />
            Mood: {json.mood} <br />"{json.description}" <br />
          </Card>
        )}
        {!json && <p>What's in the stars for you today</p>}
      </Card>
      <footer>
        <a
          href="https://aztro.sameerkumar.website/"
          style={{ "text-decoration": "none", color: "white" }}
        >
          <p>made using aztro API</p>
        </a>
      </footer>
    </div>
  );
}
