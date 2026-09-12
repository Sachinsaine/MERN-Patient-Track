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

// const appointments = [
//   {
//     id: 1,
//     time: "09:00 AM",
//     patient: "Emily Johnson",
//     type: "General Checkup",
//     doctor: "Dr. Sarah Wilson",
//     status: "Confirmed",
//     statusClass: "statusConfirmed",
//   },
//   {
//     id: 2,
//     time: "10:30 AM",
//     patient: "Michael Smith",
//     type: "Blood Pressure Review",
//     doctor: "Dr. Robert Brown",
//     status: "Pending",
//     statusClass: "statusPending",
//   },
//   {
//     id: 3,
//     time: "12:00 PM",
//     patient: "Sophia Davis",
//     type: "Follow-up Consultation",
//     doctor: "Dr. Sarah Wilson",
//     status: "Completed",
//     statusClass: "statusCompleted",
//   },
//   {
//     id: 4,
//     time: "02:30 PM",
//     patient: "James Wilson",
//     type: "Diabetes Consultation",
//     doctor: "Dr. Robert Brown",
//     status: "Cancelled",
//     statusClass: "statusCancelled",
//   },
// ];

export const Schedule = () => {
  const { appointments } = useAppointments();
  console.log(appointments);

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
                  <span>30 min</span>
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
