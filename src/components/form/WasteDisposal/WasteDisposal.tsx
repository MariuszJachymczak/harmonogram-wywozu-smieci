import React, { useState, useEffect } from "react";
import calculateDifferencesInDays from "../WasteDisposal/CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import allWasted from "../../../assets/background/pexels-daniel-absi-952670.webp";
import paperWasteImage from "../../../assets/paper.webp";
import plasticWasteImage from "../../../assets/plastic.webp";
import glassWasteImage from "../../../assets/glass.webp";
import { Button, Modal } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentMonth = format(new Date(), "MMMM", { locale: pl }).toLowerCase();

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
  }, [currentMonth]);

  return (
    <>
      <div>
        <div className={styles.img}>
          <div className={styles.button}>
            <Button
              variant="contained"
              onClick={toggleModal}
              endIcon={<ArrowForwardIcon />}
            >
              Pokaż harmonogram odpadów zmieszanych
            </Button>
          </div>
          <Modal
            open={isModalOpen}
            onClose={toggleModal}
            className={styles.modalContainer}
          >
            <div className={styles.modalContent}>
              {upcomingWasteCollections.map(
                ({ city, wasteType, date, differenceInDays }, index) => (
                  <Card
                    sx={{
                      margin: 2,
                      maxWidth: 200,
                      borderRadius: "16px",
                      flex: 1,
                      flexBasis: 150,
                    }}
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
          </Modal>
        </div>
      </div>
    </>
  );
};

export default WasteDisposal;
