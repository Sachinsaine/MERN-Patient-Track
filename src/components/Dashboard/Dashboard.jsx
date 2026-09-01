import { DiagnosisHistory } from "../DiagnosisHistory/DiagnosisHistory";
import { PatientProfile } from "../PatientProfile/PatientProfile";
import { Patients } from "../Patients/Patients";
import styles from "./dashboard.module.css";

// export const Dashboard = () => {
//   return (
//     <div className={styles.dashboard}>
//       <Patients />
//       <DiagnosisHistory />
//       <PatientProfile />
//     </div>
//   );
// };
export const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.patients}>
        <Patients />
      </div>

      <div className={styles.diagnosis}>
        <DiagnosisHistory />
      </div>

      <div className={styles.profile}>
        <PatientProfile />
      </div>
    </div>
  );
};
