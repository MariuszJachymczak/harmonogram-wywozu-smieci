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

const WasteCollectionCard: React.FC<WasteCollectionCardProps> = ({
  city,
  wasteType,
  date,
  differenceInDays,
}) => (
  <Card
    sx={{
      margin: 2,
      maxWidth: 200,
      borderRadius: "16px",
      flex: 1,
      flexBasis: 150,
      backgroundColor: WasteTypeColor(wasteType),
    }}
    className={
      differenceInDays === 0 ? styles.highlightedCardToday : styles.normalCard
    }
  >
    <CardMedia
      component="img"
      alt="wastes symbol"
      height="150"
      image={paperWasteImage}
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
        }}
        gutterBottom
      >
        {wasteType}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={2}>
        Data odbioru: {date.toLocaleDateString()}
      </Typography>
      <Typography variant="body1" color="text.primary" component="div" mt={2}>
        {differenceInDays === 0 ? (
          <h3>Odbiór już dzisiaj.</h3>
        ) : differenceInDays === 1 ? (
          <h3>Odbiór już jutro.</h3>
        ) : (
          <h4>Odbiór za {differenceInDays} dni.</h4>
        )}
      </Typography>
    </CardContent>
  </Card>
);

export default WasteCollectionCard;
