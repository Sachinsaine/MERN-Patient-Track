import { FaLungs, FaHeartPulse } from "react-icons/fa6";
import { FiThermometer } from "react-icons/fi";
import styles from "./diagnosisHistory.module.css";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DiagnosticList } from "../DiagnosticList/DiagnosticList";

export const DiagnosisHistory = () => {
  const { patient, loading } = useContext(PatientContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!patient) {
    return <h1>No patient is selected</h1>;
  }

  const latestDiagnosis = patient.diagnosis_history[0];

  const heartRate = latestDiagnosis.heart_rate.value;
  const temperature = latestDiagnosis.temperature.value;
  const respiratoryRate = latestDiagnosis.respiratory_rate.value;

  const heartRateLevel = latestDiagnosis.heart_rate.levels;
  const temperatureLevel = latestDiagnosis.temperature.levels;
  const respiratoryRateLevel = latestDiagnosis.respiratory_rate.levels;

  const systolic = latestDiagnosis.blood_pressure.systolic.value;
  const systolicLevel = latestDiagnosis.blood_pressure.systolic.levels;

  const diastolic = latestDiagnosis.blood_pressure.diastolic.value;
  const diastolicLevel = latestDiagnosis.blood_pressure.diastolic.levels;

  const bloodPressureData = patient.diagnosis_history
    .slice(0, 6)
    .reverse()
    .map((data) => ({
      month: data.month,
      systolic: data.blood_pressure.systolic.value,
      diastolic: data.blood_pressure.diastolic.value,
    }));

  return (
    <div className={styles.mainCont}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>Diagnosis History</h2>

        <div className={styles.chartCard}>
          <div className={styles.chartArea}>
            <div className={styles.chartHeaderRow}>
              <p className={styles.chartTitle}>Blood Pressure</p>

              <span className={styles.range}>
                Last 6 months <span className={styles.arrow}>▼</span>
              </span>
            </div>

            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={bloodPressureData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#cfd0db"
                    strokeWidth={1}
                    opacity={1}
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 11,
                      fill: "#8a93a6",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                  />

                  <YAxis
                    domain={[60, 180]}
                    ticks={[60, 80, 100, 120, 140, 160, 180]}
                    tick={{
                      fontSize: 11,
                      fill: "#8a93a6",
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    width={35}
                  />

                  <Tooltip
                    cursor={{
                      stroke: "#d9d4ee",
                      strokeWidth: 1,
                    }}
                    contentStyle={{
                      border: "none",
                      borderRadius: "10px",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
                      fontSize: "12px",
                    }}
                    labelStyle={{
                      fontWeight: 600,
                      color: "#072635",
                      marginBottom: "4px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="systolic"
                    name="Systolic"
                    stroke="var(--color-chart-systolic)"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                      fill: "#ffffff",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    name="Diastolic"
                    stroke="var(--color-chart-diastolic)"
                    strokeWidth={3}
                    dot={{
                      r: 4,
                      strokeWidth: 2,
                      fill: "#ffffff",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={styles.legendLabel}>
                <span className={`${styles.dot} ${styles.dotPink}`} />
                <span>Systolic</span>
              </div>

              <p className={styles.legendValue}>{systolic}</p>

              <p className={styles.legendSub}>
                {systolicLevel === "Lower than Average" && "▼ "}
                {systolicLevel === "Higher than Average" && "▲ "}
                {systolicLevel}
              </p>
            </div>

            <div className={styles.divider} />

            <div className={styles.legendItem}>
              <div className={styles.legendLabel}>
                <span className={`${styles.dot} ${styles.dotPurple}`} />
                <span>Diastolic</span>
              </div>

              <p className={styles.legendValue}>{diastolic}</p>

              <p className={styles.legendSub}>
                {diastolicLevel === "Lower than Average" && "▼ "}
                {diastolicLevel === "Higher than Average" && "▲ "}
                {diastolicLevel}
              </p>
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
              <span className={styles.tileUnit}> breaths/min</span>
            </p>

            <p className={styles.tileLabel}>Respiratory Rate</p>

            <p className={styles.tileStatus}>
              {respiratoryRateLevel === "Lower than Average" && "▼ "}
              {respiratoryRateLevel === "Higher than Average" && "▲ "}
              {respiratoryRateLevel}
            </p>
          </div>

          <div className={`${styles.vitalTile} ${styles.tileRed}`}>
            <div className={styles.tileIcon}>
              <FiThermometer size={22} color="#e05a5a" />
            </div>

            <p className={styles.tileValue}>
              {temperature}
              <span className={styles.temperatureUnit}>°F</span>
            </p>

            <p className={styles.tileLabel}>Temperature</p>

            <p className={styles.tileStatus}>
              {temperatureLevel === "Lower than Average" && "▼ "}
              {temperatureLevel === "Higher than Average" && "▲ "}
              {temperatureLevel}
            </p>
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

            <p className={styles.tileStatus}>
              {heartRateLevel === "Lower than Average" && "▼ "}
              {heartRateLevel === "Higher than Average" && "▲ "}
              {heartRateLevel}
            </p>
          </div>
        </div>
      </div>
      <DiagnosticList />
    </div>
  );
};
