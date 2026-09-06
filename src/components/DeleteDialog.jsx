import { Dialog } from "@mui/material";
import { useContext } from "react";
import { PatientContext } from "../context/PatientContext";
import styles from "./deleteDialog.module.css";

export const DeleteDialog = ({ close, patientDelete }) => {
  const { open, setOpen, setPatients } = useContext(PatientContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/patient/${patientDelete}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      setPatients((prev) =>
        prev.filter((patient) => patient._id !== patientDelete),
      );

      close();
    } catch (error) {
      console.log("Error:", error);
    }
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

          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
};
