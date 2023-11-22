import React, { useEffect, useState } from "react";

const Mainpage = () => {
  const [closestWasteType, setClosestWasteType] = useState<string | null>(null);
  const [closestCollectionDate, setClosestCollectionDate] = useState<
    number | null
  >(null);

  useEffect(() => {
    const schedule: { [key: string]: { [type: string]: string[] } } = {
      grudzień: {
        Plastik: ["5", "19"],
        Makulatura: ["12"],
        Szkło: ["30"],
      },
    };

    const currentDate = new Date();
    const currentMonth = currentDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const day = currentDate.getDate();

    if (schedule[currentMonth]) {
      let closestDate: number | null = null;
      let closestType: string | null = null;

      for (const [type, dates] of Object.entries(schedule[currentMonth])) {
        for (const date of dates) {
          const collectionDay = parseInt(date);
          if (
            collectionDay >= day &&
            (closestDate === null || collectionDay < closestDate)
          ) {
            closestDate = collectionDay;
            closestType = type;
          }
        }
      }

      setClosestWasteType(closestType);
      setClosestCollectionDate(closestDate);
    }
  }, []);

  return (
    <>
      <h1>Następny odbiór śmieci:</h1>
      {closestWasteType && closestCollectionDate !== null ? (
        <>
          <h2>Rodzaj śmieci: {closestWasteType}</h2>
          <h3>Data: {closestCollectionDate} grudzień</h3>
        </>
      ) : (
        <h2>Brak danych o odbiorze śmieci w tym miesiącu</h2>
      )}
    </>
  );
};

export default Mainpage;
