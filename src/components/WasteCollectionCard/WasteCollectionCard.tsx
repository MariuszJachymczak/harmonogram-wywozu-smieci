import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import paperWasteImage from "../../assets/garbagecan.png";
import styles from "../styling/WasteDisposal.module.scss";
import WasteTypeColor from "../utils/WasteTypeColor";

interface WasteCollectionCardProps {
  city: string;
  wasteType: string;
  date: Date;
  differenceInDays: number;
}

const getDifferenceInDaysMessage = (differenceInDays: number) => {
  if (differenceInDays === 0) {
    return "Odbiór już dzisiaj.";
  } else if (differenceInDays === 1) {
    return "Odbiór jutro.";
  } else {
    return `Odbiór za ${differenceInDays} dni.`;
  }
};

const WasteCollectionCard: React.FC<WasteCollectionCardProps> = ({
  city,
  wasteType,
  date,
  differenceInDays,
}) => {
  if (differenceInDays >= 15) {
    return null;
  }

  return (
    <Card
      sx={{
        margin: 2,
        maxWidth: 200,
        borderRadius: "12px",
        flex: 1,
        flexBasis: "150vh",
        backgroundColor: WasteTypeColor(wasteType),
      }}
      className={
        differenceInDays === 0 ? styles.highlightedCardToday : styles.normalCard
      }
    >
      <CardMedia
        component="img"
        alt="wastes symbol"
        height="140"
        image={paperWasteImage}
        className={styles.cardMedia}
      />
      <CardContent sx={{ maxWidth: 145 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {city}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            margin: "auto",
          }}
          gutterBottom
        >
          {wasteType}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Data odbioru: {date.toLocaleDateString()}
        </Typography>
        <Typography variant="body1" color="text.primary" component="div" mt={2}>
          {getDifferenceInDaysMessage(differenceInDays)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WasteCollectionCard;
