import { Link } from "react-router-dom";
import styles from "./overview.module.css";

import {
  FiSearch,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiClipboard,
  FiCreditCard,
} from "react-icons/fi";

export const Overview = () => {
  const stats = [
    {
      title: "Total patients",
      value: "1,248",
      change: "+38 this month",
      icon: FiUsers,
      iconClass: styles.blueIcon,
    },
    {
      title: "Today's appointments",
      value: "16",
      change: "4 remaining",
      icon: FiCalendar,
      iconClass: styles.greenIcon,
    },
    {
      title: "Pending reports",
      value: "7",
      change: "2 urgent",
      icon: FiClipboard,
      iconClass: styles.pinkIcon,
    },
    {
      title: "Revenue this month",
      value: "$48.2k",
      change: "+12% vs last month",
      icon: FiCreditCard,
      iconClass: styles.purpleIcon,
    },
  ];

  return (
    <main className={styles.overview}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Good morning, Dr. Simmons</h1>
          <p>Here's what's happening across your practice today.</p>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <FiSearch size={20} />
            <span>Search patients</span>
          </div>

          <Link to="/addPatient" className={styles.addPatientBtn}>
            <FiUserPlus size={19} />
            <span>Add Patient</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className={styles.statCard} key={item.title}>
              {/* Icon */}
              <div className={`${styles.iconBox} ${item.iconClass}`}>
                <Icon size={22} />
              </div>

              {/* Title */}
              <p className={styles.cardTitle}>{item.title}</p>

              {/* Value */}
              <h2>{item.value}</h2>

              {/* Change */}
              <span className={styles.cardChange}>{item.change}</span>
            </div>
          );
        })}
      </div>
    </main>
  );
};
