import React, { useState, useEffect } from "react";
import calculateDifferencesInDays from "./CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import allWasted from "../../../assets/background/paula-vermeulen-_f2m3mEkaaU-unsplash.jpg";
import paperWasteImage from "../../../assets/paper.webp";
import plasticWasteImage from "../../../assets/plastic.webp";
import glassWasteImage from "../../../assets/glass.webp";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import schedule from "../../../data/schedule";

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
  const [selectedCity, setSelectedCity] = useState("Wybierz Miasto");
  const [cities, setCities] = useState<string[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentMonth = format(new Date(), "MMMM", { locale: pl }).toLowerCase();

  useEffect(() => {
    setCities(Object.keys(schedule));
  }, []);

  useEffect(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonthName = format(nextMonth, "MMMM", {
      locale: pl,
    }).toLowerCase();

    let filteredData = calculateDifferencesInDays().filter(
      ({ city, date }) =>
        city === selectedCity &&
        (format(date, "MMMM", { locale: pl }).toLowerCase() === currentMonth ||
          format(date, "MMMM", { locale: pl }).toLowerCase() === nextMonthName)
    );

    setUpcomingWasteCollections(filteredData);
  }, [currentMonth, selectedCity]);

  return (
    <>
      <div className={styles.img}>
        <div className={styles.centerContainer}>
          <div>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
              <InputLabel
                sx={{
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
                size="small"
              >
                Wybierz Miasto
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                label="city"
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            color="info"
            variant="outlined"
            onClick={toggleModal}
            endIcon={<ArrowForwardIcon />}
            disabled={selectedCity === "Wybierz Miasto"}
          >
            Odpady Selektywne
          </Button>
        </div>
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
            )
          )}
        </div>
      </Modal>
    </>
  );
};

export default WasteDisposal;
