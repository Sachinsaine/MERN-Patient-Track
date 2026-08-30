import { FaLungs, FaHeartPulse } from "react-icons/fa6";
import { FiThermometer } from "react-icons/fi";
import styles from "./diagnosisHistory.module.css";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";

const dummyLatest = {
  systolic: { value: 160, levels: "Higher than Average" },
  diastolic: { value: 78, levels: "Lower than Average" },
  respiratory_rate: { value: 20, levels: "Normal" },
  temperature: { value: 98.6, levels: "Normal" },
  heart_rate: { value: 78, levels: "Lower than Average" },
};

export const DiagnosisHistory = () => {
  const { patient, loading } = useContext(PatientContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!patient) {
    return <h1>No patient is selected</h1>;
  }

  const heartRate = patient.diagnosis_history[0].heart_rate.value;
  const temperature = patient.diagnosis_history[0].temperature.value;
  const respiratoryRate = patient.diagnosis_history[0].respiratory_rate.value;

  const heartRateLevel = patient.diagnosis_history[0].heart_rate.levels;
  const temperatureLevel = patient.diagnosis_history[0].temperature.levels;
  const respiratoryRateLevel =
    patient.diagnosis_history[0].respiratory_rate.levels;

  console.log(respiratoryRate);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Diagnosis History</h2>

      <div className={styles.chartCard}>
        <div className={styles.chartArea}>
          <div className={styles.chartHeaderRow}>
            <p className={styles.chartTitle}>Blood Pressure</p>
            <span className={styles.range}>Last 6 months ▾</span>
          </div>

          {/* <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dummyBloodPressure}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e1f5"
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#8a93a6" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#8a93a6" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#e0559a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#6c63e0"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer> */}
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <span className={`${styles.dot} ${styles.dotPink}`} />
              Systolic
            </div>
            <p className={styles.legendValue}>{dummyLatest.systolic.value}</p>
            <p className={styles.legendSub}>▲ {dummyLatest.systolic.levels}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.legendItem}>
            <div className={styles.legendLabel}>
              <span className={`${styles.dot} ${styles.dotPurple}`} />
              Diastolic
            </div>
            <p className={styles.legendValue}>{dummyLatest.diastolic.value}</p>
            <p className={styles.legendSub}>▼ {dummyLatest.diastolic.levels}</p>
          </div>
        </div>
      </div>

      <div className={styles.vitalsGrid}>
        <div className={`${styles.vitalTile} ${styles.tileBlue}`}>
          <div className={styles.tileIcon}>
            <FaLungs size={22} color="#3aa9dc" />
          </div>
          <p className={styles.tileValue}>
            {respiratoryRate}
            <span className={styles.tileUnit}> bpm</span>
          </p>
          <p className={styles.tileLabel}>Respiratory Rate</p>
          <p className={styles.tileStatus}>{respiratoryRateLevel}</p>
        </div>

        <div className={`${styles.vitalTile} ${styles.tileRed}`}>
          <div className={styles.tileIcon}>
            <FiThermometer size={22} color="#e05a5a" />
          </div>
          <p className={styles.tileValue}>{temperature}°F</p>
          <p className={styles.tileLabel}>Temperature</p>
          <p className={styles.tileStatus}>{temperatureLevel}</p>
        </div>

        <div className={`${styles.vitalTile} ${styles.tilePink}`}>
          <div className={styles.tileIcon}>
            <FaHeartPulse size={22} color="#e0559a" />
          </div>
          <p className={styles.tileValue}>
            {heartRate}
            <span className={styles.tileUnit}> bpm</span>
          </p>
          <p className={styles.tileLabel}>Heart Rate</p>
          <p className={styles.tileStatus}>▼ {heartRateLevel}</p>
        </div>
      </div>
    </div>
  );
};
