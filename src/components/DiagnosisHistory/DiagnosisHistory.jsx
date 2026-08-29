// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
import { FaLungs, FaHeartPulse } from "react-icons/fa6";
import { FiThermometer } from "react-icons/fi";
import styles from "./diagnosisHistory.module.css";

// Dummy data — replace with real data (props, context, or API) later
const dummyBloodPressure = [
  { label: "Oct, 2023", systolic: 120, diastolic: 110 },
  { label: "Nov, 2023", systolic: 130, diastolic: 65 },
  { label: "Dec, 2023", systolic: 160, diastolic: 110 },
  { label: "Jan, 2024", systolic: 122, diastolic: 90 },
  { label: "Feb, 2024", systolic: 148, diastolic: 72 },
  { label: "Mar, 2024", systolic: 155, diastolic: 78 },
];

const dummyLatest = {
  systolic: { value: 160, levels: "Higher than Average" },
  diastolic: { value: 78, levels: "Lower than Average" },
  respiratory_rate: { value: 20, levels: "Normal" },
  temperature: { value: 98.6, levels: "Normal" },
  heart_rate: { value: 78, levels: "Lower than Average" },
};

export const DiagnosisHistory = () => {
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
            {dummyLatest.respiratory_rate.value}
            <span className={styles.tileUnit}> bpm</span>
          </p>
          <p className={styles.tileLabel}>Respiratory Rate</p>
          <p className={styles.tileStatus}>
            {dummyLatest.respiratory_rate.levels}
          </p>
        </div>

        <div className={`${styles.vitalTile} ${styles.tileRed}`}>
          <div className={styles.tileIcon}>
            <FiThermometer size={22} color="#e05a5a" />
          </div>
          <p className={styles.tileValue}>{dummyLatest.temperature.value}°F</p>
          <p className={styles.tileLabel}>Temperature</p>
          <p className={styles.tileStatus}>{dummyLatest.temperature.levels}</p>
        </div>

        <div className={`${styles.vitalTile} ${styles.tilePink}`}>
          <div className={styles.tileIcon}>
            <FaHeartPulse size={22} color="#e0559a" />
          </div>
          <p className={styles.tileValue}>
            {dummyLatest.heart_rate.value}
            <span className={styles.tileUnit}> bpm</span>
          </p>
          <p className={styles.tileLabel}>Heart Rate</p>
          <p className={styles.tileStatus}>▼ {dummyLatest.heart_rate.levels}</p>
        </div>
      </div>
    </div>
  );
};
