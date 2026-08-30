import {
  FiCalendar,
  FiUser,
  FiPhone,
  FiPhoneCall,
  FiShield,
} from "react-icons/fi";

import styles from "./patientProfile.module.css";

import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import { Link } from "react-router-dom";

export const PatientProfile = () => {
  const { loading, patient } = useContext(PatientContext);

  if (loading) {
    return <div className={styles.card}>Loading...</div>;
  }

  if (!patient) {
    return <div className={styles.card}>No patient selected</div>;
  }

  return (
    <div className={styles.card}>
      <img
        src={patient.profile_picture}
        alt={patient.name}
        className={styles.avatar}
      />

      <h3 className={styles.name}>{patient.name}</h3>

      <div className={styles.rows}>
        <div className={styles.row}>
          <FiCalendar size={16} className={styles.rowIcon} />

          <div>
            <p className={styles.rowLabel}>Date Of Birth</p>
            <p className={styles.rowValue}>{patient.date_of_birth}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FiUser size={16} className={styles.rowIcon} />

          <div>
            <p className={styles.rowLabel}>Gender</p>
            <p className={styles.rowValue}>{patient.gender}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FiPhone size={16} className={styles.rowIcon} />

          <div>
            <p className={styles.rowLabel}>Contact Info.</p>
            <p className={styles.rowValue}>{patient.phone_number}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FiPhoneCall size={16} className={styles.rowIcon} />

          <div>
            <p className={styles.rowLabel}>Emergency Contacts</p>
            <p className={styles.rowValue}>{patient.emergency_contact}</p>
          </div>
        </div>

        <div className={styles.row}>
          <FiShield size={16} className={styles.rowIcon} />

          <div>
            <p className={styles.rowLabel}>Insurance Provider</p>
            <p className={styles.rowValue}>{patient.insurance_type}</p>
          </div>
        </div>
      </div>

      <Link to="/patientInfo">
        <button className={styles.ctaBtn}>Show All Information</button>
      </Link>
    </div>
  );
};
