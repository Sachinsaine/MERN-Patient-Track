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
} from "react-icons/fi";
import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";
import { motion } from "motion/react";

export const Overview = () => {
  const { patients } = useContext(PatientContext);
  const totalPatients = patients.length;

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
            <p className={styles.greeting}>Sunday, September 6</p>

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

        {/* <div className={styles.searchBox}>
        <FiSearch size={20} />

        <input
          type="text"
          placeholder="Search patients..."
          aria-label="Search patients"
        />
      </div> */}

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
      </main>
    </motion.div>
  );
};
