import { useParams } from "react-router-dom";
import { DiagnosisHistory } from "../DiagnosisHistory/DiagnosisHistory";
import { PatientProfile } from "../PatientProfile/PatientProfile";
import { useContext, useEffect } from "react";
import { PatientContext } from "../../context/PatientContext";
import { LabResults } from "../LabResults/LabResults";
import { motion } from "motion/react";
import styles from "./patientDetails.module.css";

export const PatientDetails = () => {
  const { id } = useParams();
  const { setSelectedPatient } = useContext(PatientContext);

  useEffect(() => {
    setSelectedPatient(id);
  }, [id, setSelectedPatient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.cont}>
        <PatientProfile />
        <DiagnosisHistory />
        <LabResults />
      </div>
    </motion.div>
  );
};
