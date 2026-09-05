import { Dialog } from "@mui/material";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import styles from "./deleteDialog.module.css";

export const DeleteDialog = () => {
  const { open, setOpen } = useContext(PatientContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        className: styles.dialog,
      }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>Delete Patient?</h2>

        <p className={styles.message}>
          Are you sure you want to delete this patient? This action cannot be
          undone.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </button>

          <button type="button" className={styles.deleteButton}>
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
};
