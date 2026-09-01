import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import { BsDownload } from "react-icons/bs";
import styles from "./labresults.module.css";

export const LabResults = () => {
  const { patient } = useContext(PatientContext);
  const results = patient.lab_results;
  return (
    <section className={styles.resultsCard}>
      {" "}
      <h2 className={styles.title}>Lab Results</h2>{" "}
      <div className={styles.resultsList}>
        {" "}
        {results.map((result, index) => (
          <div key={index} className={styles.download}>
            {" "}
            <span>{result}</span>{" "}
            <BsDownload className={styles.downloadIcon} />{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </section>
  );
};
