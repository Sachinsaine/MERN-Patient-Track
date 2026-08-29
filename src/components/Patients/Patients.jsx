import { useContext } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import styles from "./patient.module.css";
import { PatientContext } from "../../context/PatientContext";

export const Patients = () => {
  const { patients, loading, error, selectedPatient, setSelectedPatient } =
    useContext(PatientContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleSelectedPatient = (id) => {
    setSelectedPatient(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Patients</h2>
        <button className={styles.searchBtn} aria-label="Search patients">
          <FiSearch size={18} />
        </button>
      </div>

      <ul className={styles.list}>
        {patients.map((patient) => {
          const isActive = patient._id === selectedPatient;
          return (
            <li key={patient._id}>
              <button
                className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                onClick={() => handleSelectedPatient(patient._id)}
              >
                <img
                  src={patient.profile_picture}
                  alt={patient.name}
                  className={styles.avatar}
                />
                <div className={styles.info}>
                  <p className={styles.name}>{patient.name}</p>
                  <p className={styles.meta}>
                    {patient.gender}, {patient.age}
                  </p>
                </div>
                <span className={styles.moreBtn} aria-label="More options">
                  <FiMoreVertical size={16} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
