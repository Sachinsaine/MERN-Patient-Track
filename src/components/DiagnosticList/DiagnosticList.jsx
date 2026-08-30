import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import styles from "./diagnosticList.module.css";

export const DiagnosticList = () => {
  const { patient, loading } = useContext(PatientContext);

  if (loading || !patient) {
    return <p>Loading...</p>;
  }

  const diagnosticList = patient.diagnostic_list || [];

  return (
    <section className={styles.diagnosticCard}>
      <h2 className={styles.title}>Diagnostic List</h2>

      <div className={styles.tableContainer}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
          <div>Problem/Diagnosis</div>
          <div>Description</div>
          <div>Status</div>
        </div>

        {/* Table Body */}
        <div className={styles.tableBody}>
          {diagnosticList.map((data, index) => (
            <div className={styles.tableRow} key={`${data.name}-${index}`}>
              <div className={styles.name}>{data.name}</div>

              <div className={styles.description}>{data.description}</div>

              <div className={styles.status}>{data.status}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
