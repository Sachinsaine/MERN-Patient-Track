import styles from "./footer.module.css";

import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiCreditCard,
} from "react-icons/fi";

export const Footer = () => {
  const navItems = [
    {
      name: "Overview",
      path: "/",
      icon: FiHome,
    },
    {
      name: "Patients",
      path: "/dashboard",
      icon: FiUsers,
    },
    {
      name: "Schedule",
      path: "/schedule",
      icon: FiCalendar,
    },
    {
      name: "Message",
      path: "/message",
      icon: FiMessageSquare,
    },
    {
      name: "Transactions",
      path: "/transaction",
      icon: FiCreditCard,
    },
  ];

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ""}`
              }
            >
              <Icon className={styles.icon} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </footer>
  );
};
