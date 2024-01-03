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
      <div>
        <Grid
          container
          spacing={1}
          justifyContent={"left"}
        >
          {wasteCollections.map((collection, index) => (
            <Grid item xs={12} sm={8} md={8} lg={8} key={index}>
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
          size='small'
          sx={{ position: "absolute", top: 16, right: 5, zIndex: 99 }}
        >
          Zamknij
        </Button>
      </div>
    </Modal>
  </>
);

export default WasteDisposalModal;
