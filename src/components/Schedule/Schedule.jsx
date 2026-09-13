import {
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiUser,
} from "react-icons/fi";
import styles from "./schedule.module.css";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useAppointments } from "../../hooks/useAppointments";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";

export const Schedule = () => {
  const { appointments } = useAppointments();
  const { loading } = useContext(PatientContext);

  if (loading) {
    return <h1 className={styles.headingCont}>Loading...</h1>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <main className={styles.page}>
        <div className={styles.headingCont}>
          <header className={styles.pageHeader}>
            <div>
              <p className={styles.eyebrow}>Patient Track</p>

              <h1>Schedule</h1>

              <p className={styles.subtitle}>
                Manage appointments and daily patient visits.
              </p>
            </div>

            <Link to="/appointment">
              <button className={styles.primaryButton} type="button">
                <FiPlus size={18} />
                Add Appointment
              </button>
            </Link>
          </header>

          <section className={styles.summaryGrid}>
            <article className={`${styles.summaryCard} ${styles.blueCard}`}>
              <span className={styles.summaryIcon}>
                <FiCalendar size={21} />
              </span>

              <div>
                <p>Total Appointments</p>
                <strong>4</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.greenCard}`}>
              <span className={styles.summaryIcon}>
                <FiCheckCircle size={21} />
              </span>

              <div>
                <p>Confirmed</p>
                <strong>1</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.yellowCard}`}>
              <span className={styles.summaryIcon}>
                <FiClock size={21} />
              </span>

              <div>
                <p>Pending</p>
                <strong>1</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.pinkCard}`}>
              <span className={styles.summaryIcon}>
                <FiCheckCircle size={21} />
              </span>

              <div>
                <p>Completed</p>
                <strong>1</strong>
              </div>
            </article>
          </section>
        </div>

        <section className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            <div>
              <h2>Daily Schedule</h2>
              <p>Friday, September 11, 2026</p>
            </div>

            <div className={styles.dateWrapper}>
              <FiCalendar size={17} />
              <input
                className={styles.dateInput}
                type="date"
                defaultValue="2026-09-11"
              />
            </div>
          </div>

          <div className={styles.timeline}>
            {appointments.map((appointment) => (
              <article className={styles.appointment} key={appointment.id}>
                <div className={styles.timeColumn}>
                  <strong>{appointment.time}</strong>
                  <span>{appointment.duration} min</span>
                </div>

                <div className={styles.timelineLine}>
                  <span />
                </div>

                <div className={styles.appointmentContent}>
                  <div className={styles.appointmentTop}>
                    <div>
                      <h3>{appointment.patient}</h3>
                      <p>{appointment.type}</p>
                    </div>

                    <span
                      className={`${styles.statusBadge} ${
                        styles[appointment.statusClass]
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  <div className={styles.appointmentBottom}>
                    <span className={styles.doctorInfo}>
                      <FiUser size={15} />
                      {appointment.doctor}
                    </span>

                    <button className={styles.viewButton} type="button">
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};
