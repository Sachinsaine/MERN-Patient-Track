import { DiagnosisHistory } from "../DiagnosisHistory/DiagnosisHistory";
import { PatientProfile } from "../PatientProfile/PatientProfile";
import { Patients } from "../Patients/Patients";
import styles from "./dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Patients />
      <DiagnosisHistory />
      <PatientProfile />
    </div>
  );
};
