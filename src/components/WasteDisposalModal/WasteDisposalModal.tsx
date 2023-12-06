import React from "react";
import { Modal } from "@mui/material";
import WasteCollectionCard from "../WasteCollectionCard/WasteCollectionCard";
import styles from "../styling/WasteDisposal.module.scss";

interface WasteCollection {
  city: string;
  wasteType: string;
  date: Date;
  differenceInDays: number;
}

interface WasteDisposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  wasteCollections: WasteCollection[];
  getWasteTypeColor: (wasteType: string) => string;
}

const WasteDisposalModal: React.FC<WasteDisposalModalProps> = ({
  isOpen,
  onClose,
  wasteCollections,
  getWasteTypeColor,
}) => (
  <Modal open={isOpen} onClose={onClose} className={styles.modalContainer}>
    <div className={styles.modalContent}>
      {wasteCollections.map((collection, index) => (
        <WasteCollectionCard
          key={index}
          city={collection.city}
          wasteType={collection.wasteType}
          date={collection.date}
          differenceInDays={collection.differenceInDays}
          getWasteTypeColor={getWasteTypeColor}
        />
      ))}
    </div>
  </Modal>
);

export default WasteDisposalModal;
