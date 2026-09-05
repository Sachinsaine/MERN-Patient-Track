import { useContext, useState } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import styles from "./patient.module.css";
import { PatientContext } from "../../context/PatientContext";
import { PatientsSkeleton } from "../PatientSkeleton/PatientsSkeleton";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../DeleteDialog";

export const Patients = () => {
  const {
    patients,
    loading,
    error,
    selectedPatient,
    setSelectedPatient,
    setOpen,
  } = useContext(PatientContext);

  const [input, setInput] = useState("");

  const filterPatient = patients.filter((patient) =>
    patient.name?.toLowerCase().includes(input.toLowerCase()),
  );

  const navigate = useNavigate();
  if (loading) {
    return (
      <h1 className={styles.card}>
        <PatientsSkeleton />
      </h1>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleSelectedPatient = (id) => {
    if (window.innerWidth <= 768) {
      navigate(`/patientDetails/${id}`);
    } else {
      setSelectedPatient(id);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div className={styles.searchWrapper}>
          <FiSearch size={18} className={styles.searchIcon} />

          <input
            type="text"
            placeholder="Search patients..."
            className={styles.searchInput}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>

      <ul className={styles.list}>
        {filterPatient.map((patient) => {
          const isActive = patient._id === selectedPatient;
          return (
            <li key={patient._id}>
              <button
                className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
              >
                <img
                  src={patient.profile_picture}
                  alt={patient.name}
                  className={styles.avatar}
                />
                <div
                  className={styles.info}
                  onClick={() => handleSelectedPatient(patient._id)}
                >
                  <p className={styles.name}>{patient.name}</p>
                  <p className={styles.meta}>
                    {patient.gender}, {patient.age}
                  </p>
                </div>
                <span
                  className={styles.moreBtn}
                  aria-label="More options"
                  onClick={handleOpen}
                >
                  <FiMoreVertical size={16} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <DeleteDialog open={handleOpen} close={handleClose} />
    </div>
  );
};
