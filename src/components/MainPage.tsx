import { useEffect, useState } from "react";
import { schedule } from "../data/schedule";

const Mainpage = () => {
  const [closestWasteType, setClosestWasteType] = useState<string | null>(null);
  const [closestCollectionDate, setClosestCollectionDate] = useState<
    number | null
  >(null);
  const [whatMonth, setWhatMonth] = useState<Date | null>(null);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = currentDate.getDate();
    setWhatMonth(currentDate);

    const monthSchedule = schedule[currentMonth];
    if (monthSchedule) {
      let closestDate: number | null = null;
      let closestType = null;

      Object.entries(monthSchedule).forEach(([type, dates]) => {
        const futureDates = dates.map(Number).filter((date) => date >= day);

        if (futureDates.length > 0) {
          const minDate = Math.min(...futureDates);
          if (closestDate === null || minDate < closestDate) {
            closestDate = minDate;
            closestType = type;
          }
        }
      });

      setClosestWasteType(closestType);
      setClosestCollectionDate(closestDate);
    }
  }, []);

  const formattedMonth = whatMonth
    ? whatMonth.toLocaleString("default", { month: "long" })
    : "";

  return (
    <>
      <h1>Następny odbiór śmieci:</h1>
      {closestWasteType && closestCollectionDate !== null ? (
        <>
          <h2>Rodzaj śmieci: {closestWasteType}</h2>
          <h3>
            Data: {closestCollectionDate} {formattedMonth}
          </h3>
        </>
      ) : (
        <h2>Brak danych o odbiorze śmieci w tym miesiącu</h2>
      )}
    </>
  );
};

export default Mainpage;
