import { useEffect, useState } from "react";
import { schedule } from "../data/schedule";
import "./styling/MainPage.css";

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
      <div className="main-container">
        <div>
          <div>
            Następny odbiór śmieci: {closestCollectionDate} {formattedMonth}
          </div>
          {closestWasteType && closestCollectionDate !== null ? (
            <>
              <div>Rodzaj śmieci: {closestWasteType}</div>
            </>
          ) : (
            <h2>Brak danych o odbiorze śmieci w tym miesiącu</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default Mainpage;
