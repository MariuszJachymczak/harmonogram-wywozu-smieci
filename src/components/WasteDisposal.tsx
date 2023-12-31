import React, { useState, useEffect } from "react";
import calculateDifferencesInDays from "./utils/CalculateDifferenceInDays";
import styles from "./styling/WasteDisposal.module.scss";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
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
    filteredData.sort((a, b) => a.differenceInDays - b.differenceInDays);
    setUpcomingWasteCollections(filteredData);
  }, [currentMonth, selectedCity]);

  return (
    <>
      <div className={styles.img}>
        <div className={styles.centerContainer} data-testid="modal">
          <SelectCity
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={(city) => {
              setSelectedCity(city);
              if (city !== DEFAULT_CITY) {
                toggleModal();
              }
            }}
          />
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
