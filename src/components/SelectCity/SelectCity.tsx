import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface SelectCityProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const SelectCity: React.FC<SelectCityProps> = ({
  cities,
  selectedCity,
  onCityChange,
}) => (
  <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
    <InputLabel sx={{ fontWeight: "bold" }} data-testid="selected-city">
      Wybierz Miasto
    </InputLabel>
    <Select
      labelId="city-select-label"
      id="city-select"
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
    >
      {cities.map((city, index) => (
        <MenuItem key={index} value={city}>
          {city}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectCity;
