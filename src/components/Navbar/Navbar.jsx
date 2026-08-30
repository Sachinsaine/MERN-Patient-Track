import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiCreditCard,
  FiSettings,
  FiMoreVertical,
} from "react-icons/fi";
import styles from "./navabar.module.css";

// Dummy data — replace with real data (props, context, or API) later
const NAV_ITEMS = [
  { label: "Overview", icon: FiHome },
  { label: "Patients", icon: FiUsers, active: true },
  { label: "Schedule", icon: FiCalendar },
  { label: "Message", icon: FiMessageSquare },
  { label: "Transactions", icon: FiCreditCard },
];

const dummyDoctor = {
  name: "Dr. Jose Simmons",
  title: "General Practitioner",
  avatar: "https://i.pravatar.cc/40?img=12",
};

import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandName}>
          <Link to="/">
            <img src={Logo} alt="TechCareLogo" />
          </Link>
        </span>
      </div>

      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className={styles.profile}>
        <img
          src={dummyDoctor.avatar}
          alt={dummyDoctor.name}
          className={styles.avatar}
        />
        <div className={styles.profileText}>
          <p className={styles.profileName}>{dummyDoctor.name}</p>
          <p className={styles.profileTitle}>{dummyDoctor.title}</p>
        </div>
        <FiSettings size={18} className={styles.iconButton} />
        <FiMoreVertical size={18} className={styles.iconButton} />
      </div>
    </header>
  );
};
