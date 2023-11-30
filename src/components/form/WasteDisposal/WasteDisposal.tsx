import React, { useState, useEffect } from "react";
import calculateDifferencesInDays from "../WasteDisposal/CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import allWasted from "../../../assets/background/pexels-daniel-absi-952670.jpg";
import paperWasteImage from "../../../assets/paper.png";
import plasticWasteImage from "../../../assets/plastic.png";
import glassWasteImage from "../../../assets/glass.png";

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
  console.log(currentMonth, "Current Month");

  useEffect(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonthName = format(nextMonth, "MMMM", {
      locale: pl,
    }).toLowerCase();

    let filteredData = calculateDifferencesInDays().filter(
      ({ date }) =>
        format(date, "MMMM", { locale: pl }).toLowerCase() === currentMonth ||
        format(date, "MMMM", { locale: pl }).toLowerCase() === nextMonthName
    );

    setUpcomingWasteCollections(filteredData);
    console.log(filteredData, "filtered data");
  }, [currentMonth]);

  return (
    <div className={styles.img}>
      <div className={styles.wasteDisposal}>
        {upcomingWasteCollections.map(
          ({ city, wasteType, date, differenceInDays }, index) => (
            <Card
              sx={{ margin: 2, maxWidth: 200, borderRadius: "16px" }}
              key={index}
              className={
                differenceInDays === 0
                  ? styles.highlightedCardToday
                  : styles.normalCard
              }
            >
              <CardMedia
                component="img"
                alt="wastes symbol"
                height="150"
                image={
                  wasteType === "Makulatura"
                    ? paperWasteImage
                    : wasteType === "Plastik"
                    ? plasticWasteImage
                    : wasteType === "Szklo"
                    ? glassWasteImage
                    : allWasted
                }
              />
              <CardContent sx={{ maxWidth: 145 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {city}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Typ odpadów: {wasteType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data odbioru: {date.toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {differenceInDays === 0
                    ? "Odbiór już dzisiaj"
                    : `Odbiór za ${differenceInDays} dni.`}
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default WasteDisposal;
