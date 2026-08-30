import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import styles from "./patientInfo.module.css";

export const PatientInfo = () => {
  const { patient, loading } = useContext(PatientContext);

  if (loading) {
    return <h1 className={styles.loading}>Loading...</h1>;
  }

  if (!patient) {
    return <h1 className={styles.loading}>No patient selected</h1>;
  }

  const diagnosisHistory = patient.diagnosis_history.map((data) => ({
    month: data.month,
    year: data.year,

    systolic: data.blood_pressure.systolic.value,
    systolicLevel: data.blood_pressure.systolic.levels,

    diastolic: data.blood_pressure.diastolic.value,
    diastolicLevel: data.blood_pressure.diastolic.levels,

    heartRate: data.heart_rate.value,
    heartRateLevel: data.heart_rate.levels,

    respiratoryRate: data.respiratory_rate.value,
    respiratoryRateLevel: data.respiratory_rate.levels,

    temperature: data.temperature?.value,
    temperatureLevel: data.temperature?.levels,
  }));

  const diagnosticList = patient.diagnostic_list.map((data) => ({
    name: data.name,
    description: data.description,
    status: data.status,
  }));

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Patient Info</h1>

        <div className={styles.profileSection}>
          <img
            className={styles.profileImage}
            src={patient.profile_picture}
            alt={patient.name}
          />

          <div>
            <h2 className={styles.patientName}>{patient.name}</h2>
            <p className={styles.patientAge}>
              {patient.gender} · {patient.age} years
            </p>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Date of Birth</span>
            <span className={styles.value}>{patient.date_of_birth}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Gender</span>
            <span className={styles.value}>{patient.gender}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Phone Number</span>
            <span className={styles.value}>{patient.phone_number}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Emergency Contact</span>
            <span className={styles.value}>{patient.emergency_contact}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Insurance Type</span>
            <span className={styles.value}>{patient.insurance_type}</span>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Diagnosis History</h2>
          <span className={styles.count}>
            {diagnosisHistory.length} Records
          </span>
        </div>

        <div className={styles.historyList}>
          {diagnosisHistory.map((data, index) => (
            <div className={styles.historyCard} key={index}>
              <div className={styles.historyHeader}>
                <h3>
                  {data.month} {data.year}
                </h3>
              </div>

              <div className={styles.vitalsGrid}>
                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Blood Pressure</span>

                  <div className={styles.vitalValue}>
                    <span>{data.systolic}</span>
                    <span className={styles.slash}>/</span>
                    <span>{data.diastolic}</span>
                    <span className={styles.unit}>mmHg</span>
                  </div>

                  <p className={styles.status}>{data.systolicLevel}</p>
                </div>

                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Heart Rate</span>

                  <div className={styles.vitalValue}>
                    {data.heartRate}
                    <span className={styles.unit}>bpm</span>
                  </div>

                  <p className={styles.status}>{data.heartRateLevel}</p>
                </div>

                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Respiratory Rate</span>

                  <div className={styles.vitalValue}>
                    {data.respiratoryRate}
                    <span className={styles.unit}>breaths/min</span>
                  </div>

                  <p className={styles.status}>{data.respiratoryRateLevel}</p>
                </div>

                <div className={styles.vitalItem}>
                  <span className={styles.vitalLabel}>Temperature</span>

                  <div className={styles.vitalValue}>
                    {data.temperature}
                    <span className={styles.unit}>°F</span>
                  </div>

                  <p className={styles.status}>{data.temperatureLevel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Diagnostic List</h2>

          <span className={styles.count}>
            {diagnosticList.length} Conditions
          </span>
        </div>

        <div className={styles.diagnosticList}>
          {diagnosticList.map((data, index) => (
            <div className={styles.diagnosticItem} key={index}>
              <div className={styles.diagnosticContent}>
                <h3>{data.name}</h3>
                <p>{data.description}</p>
              </div>

              <span className={styles.diagnosticStatus}>{data.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
