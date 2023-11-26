import React from "react";
import { parse, isSameDay } from "date-fns";
import monthNames from "../../../data/months";

const checkIfDateIsToday = (dates: string[], month: string, year: string) => {
  const monthIndex = monthNames[month.toLowerCase()];

  return dates.some((dateString) => {
    const date = parse(
      dateString,
      "dd",
      new Date(parseInt(year, 10), monthIndex)
    );
    return isSameDay(date, new Date());
  });
};

const WasteType: React.FC<{
  wasteType: string;
  dates: string[];
  month: string;
  year: string;
}> = ({ wasteType, dates, month, year }) => {
  const isToday = checkIfDateIsToday(dates, month, year);
  return isToday ? <p>{wasteType}</p> : null;
};

export default WasteType;
