import React from "react";
import { parse, isSameDay, format } from "date-fns";
import { pl } from "date-fns/locale";
import monthNames from "../../data/months";
import { schedule } from "../../data/schedule";
import styles from "./../styling/WasteDisposal.module.scss";

const today = new Date();
const currentYear = format(today, "yyyy");

const checkIfDateIsToday = (dates: string[], month: string, year: string) => {
  const monthIndex = monthNames[month.toLowerCase()];

  return dates.some((dateString) => {
    const date = parse(
      dateString,
      "dd",
      new Date(parseInt(year, 10), monthIndex)
    );
    return isSameDay(date, today);
  });
};

const WasteDisposal: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        {Object.entries(schedule).map(([city, months]) => (
          <div key={city}>
            <h2>{city}</h2>
            {Object.entries(months).map(([month, wasteTypes]) => {
              if (!month) return null; // Sprawdzenie, czy month jest zdefiniowane

              return (
                <div key={month}>
                  <h3>{month}</h3>
                  {Object.entries(wasteTypes).map(([wasteType, dates]) => {
                    const isToday = checkIfDateIsToday(
                      dates,
                      month,
                      currentYear
                    );

                    return isToday ? <p key={wasteType}>{wasteType}</p> : null;
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default WasteDisposal;
