import {
  FiHome,
  FiUsers,
  FiCalendar,
  // FiMessageSquare,
  // FiCreditCard,
  FiLogOut,
} from "react-icons/fi";
import Logo from "../../assets/Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./navabar.module.css";
import { useAuth } from "../../hooks/useAuth";

const NAV_ITEMS = [
  { label: "Overview", icon: FiHome, path: "/overview" },
  { label: "Patients", icon: FiUsers, path: "/dashboard" },
  { label: "Schedule", icon: FiCalendar, path: "/schedule" },
  // { label: "Message", icon: FiMessageSquare, path: "/message" },
  // { label: "Transactions", icon: FiCreditCard, path: "/transaction" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.brandName}>
          <Link to="/overview">
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
        <button
          type="button"
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};
