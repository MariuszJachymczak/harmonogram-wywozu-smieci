import React from "react";
import WasteType from "./WasteType";

interface MonthProps {
  month: string;
  wasteTypes: Record<string, string[]>;
  year: string;
}

const Month: React.FC<MonthProps> = ({ month, wasteTypes, year }) => {
  if (!month) return null;
  return (
    <div>
      {Object.entries(wasteTypes).map(([wasteType, dates]) => (
        <WasteType
          key={wasteType}
          wasteType={wasteType}
          dates={dates}
          month={month}
          year={year}
        />
      ))}
    </div>
  );
};

export default Month;
