// src/components/WasteDisposal/WasteDisposal.tsx

import React, { useState, useEffect } from "react";
import calculateDifferencesInDays from "../WasteDisposal/CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface WasteCollection {
  city: string;
  wasteType: string;
  date: Date;
  differenceInDays: number;
}

const WasteDisposal: React.FC = () => {
  const [upcomingWasteCollections, setUpcomingWasteCollections] = useState<
    WasteCollection[]
  >([]);

  const currentMonth = format(new Date(), "MMMM", { locale: pl }).toLowerCase();

  useEffect(() => {
    const filteredData = calculateDifferencesInDays().filter(
      ({ date }) =>
        format(date, "MMMM", { locale: pl }).toLowerCase() === currentMonth
    );
    setUpcomingWasteCollections(filteredData);
  }, [currentMonth]);

  return (
    <div className={styles.container}>
      {upcomingWasteCollections.map(
        ({ city, wasteType, date, differenceInDays }, index) => (
          <div key={index}>
            <h2>{city}</h2>
            <p>Typ odpadów: {wasteType}</p>
            <p>Data odbioru: {date.toLocaleDateString()}</p>
            <p>
              Dni do odbioru:
              {differenceInDays === 0
                ? "Odbiór już dzisiaj"
                : `odbiór za ${differenceInDays} dni`}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default WasteDisposal;
