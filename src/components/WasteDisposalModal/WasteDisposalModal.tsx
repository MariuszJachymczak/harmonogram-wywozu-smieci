import React from "react";
import { Button, Grid, Modal } from "@mui/material";
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
    <Modal
      open={isOpen}
      onClose={onClose}
      className={styles.modalContainer}
      data-testid="modal"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          position: "relative",
        }}
      >
        <Grid
          container
          spacing={6}
          justifyContent={"center"}
          style={{ flexWrap: "wrap", maxWidth: "100%" }}
        >
          {wasteCollections.map((collection, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <WasteCollectionCard
                city={collection.city}
                wasteType={collection.wasteType}
                date={collection.date}
                differenceInDays={collection.differenceInDays}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ position: "absolute", top: 16, right: 16, zIndex: 99 }}
        >
          Zamknij
        </Button>
      </div>
    </Modal>
  </>
);

export default WasteDisposalModal;
