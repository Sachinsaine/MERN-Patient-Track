import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiMessageSquare,
  FiCreditCard,
  FiSettings,
  FiMoreVertical,
} from "react-icons/fi";
import Logo from "../../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import styles from "./navabar.module.css";

const NAV_ITEMS = [
  { label: "Overview", icon: FiHome, path: "/overview" },
  { label: "Patients", icon: FiUsers, path: "/" },
  { label: "Schedule", icon: FiCalendar, path: "/schedule" },
  { label: "Message", icon: FiMessageSquare, path: "/message" },
  { label: "Transactions", icon: FiCreditCard, path: "/transaction" },
];

const dummyDoctor = {
  name: "Dr. Jose Simmons",
  title: "General Practitioner",
  avatar: "https://i.pravatar.cc/40?img=12",
};

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
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ""}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
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
