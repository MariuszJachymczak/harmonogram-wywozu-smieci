// src/components/WasteDisposal/Month.tsx

import React from "react";
import WasteType from "./WasteType";

const Month: React.FC<{
  month: string;
  wasteTypes: Record<string, string[]>;
  year: string;
}> = ({ month, wasteTypes, year }) => {
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
