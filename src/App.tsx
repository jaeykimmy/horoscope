import { useState } from "react";
import axios from "../node_modules/axios/index";
import {
  TextField,
  Button,
  Autocomplete,
  Card,
} from "../node_modules/@mui/material/index";
import "./App.scss";
import SignAutocomplete from "./components/SignAutocomplete";

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
    window.scrollTo(0, 0);
  };
  console.log(json);

  return (
    <>
      <div className="App">
        <Card sx={{ padding: "16px" }}>
          <h1>Daily Horoscope</h1>
          <div className="response"></div>

          {json && (
            <Card className="response-container" sx={{ padding: "16px" }}>
              Your Horoscope for: {json.current_date} <br />
              <h2>
                {sign}:<br />
                {json.date_range}{" "}
              </h2>
              <div
                style={{
                  "background-color": `${json.color}`.substring(
                    `${json.color}`.indexOf(" ") + 1
                  ),
                  padding: "10px",
                  "border-radius": "32px",
                  "margin-bottom": "8px",
                }}
              >
                <div
                  style={
                    ["Black", "Blue", "Grey", "Red"].some((x) =>
                      json.color.includes(x)
                    )
                      ? { color: "white" }
                      : { color: "black" }
                  }
                >
                  {json.color}
                </div>
              </div>
              Compatibility: {json.compatibility} <br />
              Lucky Number: {json.lucky_number} <br />
              Lucky Time: {json.lucky_time} <br />
              Mood: {json.mood} <br />"{json.description}" <br />
              <Button onClick={() => window.location.reload()}>
                Check another Sign
              </Button>
            </Card>
          )}
          {!json && (
            <div>
              <SignAutocomplete
                signOptions={signOptions}
                onSignChange={onSignChange}
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
              <Button type="submit" onClick={searchSignDay}>
                Submit
              </Button>
              <p>What's in the stars for you today</p>
            </div>
          )}
        </Card>
      </div>
      <footer className="footer">
        <a
          href="https://aztro.sameerkumar.website/"
          style={{ "text-decoration": "none", color: "black" }}
        >
          <p>made using aztro API</p>
        </a>
      </footer>
    </>
  );
}
