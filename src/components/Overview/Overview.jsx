import { Link } from "react-router-dom";
import styles from "./overview.module.css";

import {
  // FiSearch,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiClipboard,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowRight,
  FiUser,
  FiFileText,
} from "react-icons/fi";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import { motion } from "motion/react";

export const Overview = () => {
  const { patients } = useContext(PatientContext);
  const totalPatients = patients.length;

  const getDate = new Date();
  const date = getDate.getDate();
  const year = getDate.getFullYear();
  const day = getDate.toLocaleString("en-US", { weekday: "long" });
  const monthName = getDate.toLocaleString("en-US", {
    month: "long",
  });

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      change: "+38 this month",
      icon: FiUsers,
      iconClass: styles.blueIcon,
    },
    {
      title: "Appointments",
      value: "16",
      change: "4 remaining",
      icon: FiCalendar,
      iconClass: styles.greenIcon,
    },
    {
      title: "Pending Reports",
      value: "7",
      change: "2 urgent",
      icon: FiClipboard,
      iconClass: styles.pinkIcon,
    },
    {
      title: "Revenue",
      value: "$48.2k",
      change: "+12% this month",
      icon: FiCreditCard,
      iconClass: styles.purpleIcon,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <main className={styles.overview}>
        <section className={styles.header}>
          <div className={styles.welcome}>
            <p className={styles.greeting}>
              {day}, {monthName} {date} , {year}
            </p>

            <h1>
              Good morning, <span>Dr. Simmons</span>
            </h1>

            <p className={styles.subtitle}>
              Here's what's happening across your practice today.
            </p>
          </div>

          <Link to="/addPatient" className={styles.addPatientBtn}>
            <FiUserPlus size={19} />
            <span>Add Patient</span>
          </Link>
        </section>

        <div className={styles.sectionHeader}>
          <div>
            <h2>Practice Overview</h2>
            <p>Your practice performance today</p>
          </div>
        </div>

        <section className={styles.statsGrid}>
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <article className={styles.statCard} key={item.title}>
                <div className={styles.cardTop}>
                  <div className={`${styles.iconBox} ${item.iconClass}`}>
                    <Icon size={21} />
                  </div>

                  <FiArrowUpRight className={styles.arrowIcon} size={18} />
                </div>

                <p className={styles.cardTitle}>{item.title}</p>

                <h2>{item.value}</h2>

                <span className={styles.cardChange}>{item.change}</span>
              </article>
            );
          })}
        </section>

        <section className={styles.dashboardBottom}>
          <div className={styles.recentPatients}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Recent Patients</h2>
                <p>Recently added patients to your practice</p>
              </div>

              <Link to="/dashboard" className={styles.viewAll}>
                View all <FiArrowRight size={15} />
              </Link>
            </div>

            <div className={styles.patientList}>
              {patients.length > 0 ? (
                patients
                  .slice(-5)
                  .reverse()
                  .map((patient) => (
                    <div className={styles.patientRow} key={patient._id}>
                      <div className={styles.patientAvatar}>
                        {patient.profile_picture ? (
                          <img
                            src={patient.profile_picture}
                            alt={patient.name}
                          />
                        ) : (
                          <FiUser size={19} />
                        )}
                      </div>

                      <div className={styles.patientDetails}>
                        <h3>{patient.name}</h3>
                        <p>
                          {patient.gender} • {patient.age} years
                        </p>
                      </div>

                      <span className={styles.patientStatus}>Active</span>
                    </div>
                  ))
              ) : (
                <div className={styles.emptyState}>
                  <FiUsers size={24} />
                  <p>No patients added yet.</p>

                  <Link to="/addPatient">Add your first patient</Link>
                </div>
              )}
            </div>
          </div>

          <div className={styles.quickActions}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Quick Actions</h2>
                <p>Common tasks</p>
              </div>
            </div>

            <div className={styles.actionGrid}>
              <Link to="/addPatient" className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <FiUserPlus />
                </div>

                <div>
                  <strong>Add Patient</strong>
                  <span>Create a new patient profile</span>
                </div>

                <FiArrowRight className={styles.actionArrow} />
              </Link>

              <Link to="/dashboard" className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <FiUsers />
                </div>

                <div>
                  <strong>View Patients</strong>
                  <span>Browse all patient records</span>
                </div>

                <FiArrowRight className={styles.actionArrow} />
              </Link>

              <Link to="/dashboard" className={styles.actionCard}>
                <div className={styles.actionIcon}>
                  <FiFileText />
                </div>

                <div>
                  <strong>Patient Records</strong>
                  <span>Manage medical information</span>
                </div>

                <FiArrowRight className={styles.actionArrow} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};
