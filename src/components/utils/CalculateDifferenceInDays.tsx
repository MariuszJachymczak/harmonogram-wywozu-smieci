import { differenceInDays, startOfDay } from "date-fns";
import schedule from "../../data/schedule";
import monthNames from "../../data/months";

const calculateDifferencesInDays = () => {
  const today = startOfDay(new Date());
  const currentYear = today.getFullYear();
  const differences: {
    city: string;
    wasteType: string;
    date: Date;
    differenceInDays: number;
  }[] = [];

  Object.entries(schedule).forEach(([city, months]) => {
    Object.entries(months).forEach(([month, wasteTypes]) => {
      const monthIndex =
        monthNames[month.toLowerCase() as keyof typeof monthNames];
      Object.entries(wasteTypes).forEach(([wasteType, dates]) => {
        dates.forEach((dateString) => {
          const wasteDate = startOfDay(
            new Date(currentYear, monthIndex, parseInt(dateString, 10))
          );
          const difference = differenceInDays(wasteDate, today);

          if (difference >= 0) {
            differences.push({
              city,
              wasteType,
              date: wasteDate,
              differenceInDays: difference,
            });
          }
        });
      });
    });
  });
  return differences;
};

export default calculateDifferencesInDays;
