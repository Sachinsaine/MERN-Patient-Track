import { useContext, useState } from "react";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import styles from "./patient.module.css";
import { PatientContext } from "../../context/PatientContext";
import { PatientsSkeleton } from "../PatientSkeleton/PatientsSkeleton";
import { useNavigate } from "react-router-dom";

export const Patients = () => {
  const { patients, loading, error, selectedPatient, setSelectedPatient } =
    useContext(PatientContext);

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
