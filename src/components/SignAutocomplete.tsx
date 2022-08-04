import React from "react";
import {
  Autocomplete,
  TextField,
} from "../../node_modules/@mui/material/index";
export default function SignAutocomplete({ signOptions, onSignChange }: any) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={signOptions}
      sx={{
        width: 300,
        "padding-bottom": "16px",
      }}
      onChange={onSignChange}
      renderInput={(params: object) => <TextField {...params} label="Sign" />}
    />
  );
}
