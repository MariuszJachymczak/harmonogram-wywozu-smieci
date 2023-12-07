import React from "react";
import { Box, Grid, Modal } from "@mui/material";
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
}

const WasteDisposalModal: React.FC<WasteDisposalModalProps> = ({
  isOpen,
  onClose,
  wasteCollections,
}) => (
  <>
    <Modal open={isOpen} onClose={onClose} className={styles.modalContainer}>
      <Grid
        container
        spacing={4}
        justifyContent={"center"}
        alignContent="center"
        style={{ height: "100%" }}
      >
        {wasteCollections.map((collection, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <WasteCollectionCard
              city={collection.city}
              wasteType={collection.wasteType}
              date={collection.date}
              differenceInDays={collection.differenceInDays}
            />
          </Grid>
        ))}
      </Grid>
    </Modal>
  </>
);

export default WasteDisposalModal;
