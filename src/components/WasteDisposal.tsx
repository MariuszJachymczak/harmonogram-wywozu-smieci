import React, { useState, useEffect, useMemo, useCallback } from "react";
import calculateDifferencesInDays from "./utils/CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import schedule from "../data/schedule";
import SelectCity from "./SelectCity/SelectCity";
import WasteDisposalModal from "./WasteDisposalModal/WasteDisposalModal";

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
  const DEFAULT_CITY = "Wybierz Miasto";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(DEFAULT_CITY);
  const [cities, setCities] = useState<string[]>([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentMonth = useMemo(
    () => format(new Date(), "MMMM", { locale: pl }).toLowerCase(),
    []
  );

  useEffect(() => {
    setCities(Object.keys(schedule));
  }, []);

  const getFilteredData = useCallback(() => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextMonthName = format(nextMonth, "MMMM", {
      locale: pl,
    }).toLowerCase();

    return calculateDifferencesInDays().filter(
      ({ city, date }) =>
        city === selectedCity &&
        (format(date, "MMMM", { locale: pl }).toLowerCase() === currentMonth ||
          format(date, "MMMM", { locale: pl }).toLowerCase() === nextMonthName)
    );
  }, [calculateDifferencesInDays, selectedCity, currentMonth]);

  useEffect(() => {
    let filteredData = getFilteredData();
    filteredData.sort(
      (a: WasteCollection, b: WasteCollection) =>
        a.differenceInDays - b.differenceInDays
    );
    setUpcomingWasteCollections(filteredData);
  }, [currentMonth, selectedCity]);

  useEffect(() => {
    let filteredData = getFilteredData();
    filteredData.sort(
      (a: WasteCollection, b: WasteCollection) =>
        a.differenceInDays - b.differenceInDays
    );
    setUpcomingWasteCollections(filteredData);
  }, [currentMonth, selectedCity, getFilteredData]);

  return (
    <>
      <div className={styles.img}>
        <div className={styles.centerContainer}>
          <SelectCity
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
          <Button
            color="info"
            variant="outlined"
            onClick={toggleModal}
            endIcon={<ArrowForwardIcon />}
            disabled={selectedCity === DEFAULT_CITY}
          >
            Odpady Selektywne
          </Button>
        </div>
      </div>
      <WasteDisposalModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        wasteCollections={upcomingWasteCollections}
      />
    </>
  );
};

export default WasteDisposal;
