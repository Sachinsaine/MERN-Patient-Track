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
import { useContext, useState } from "react";
import { PatientContext } from "../../context/PatientContext";
import { Loader } from "../Loader/Loader";

export const Schedule = () => {
  const { appointments } = useAppointments();
  const { loading, currentPage, setCurrentPage } = useContext(PatientContext);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByDropdown, setFilterByDropdown] = useState("All");
  const [input, setInput] = useState("");
  const [filterByType, setFilterByType] = useState("All");

  if (loading) {
    return <Loader />;
  }

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed",
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "Confirmed",
  ).length;

  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Scheduled",
  ).length;

  const filteredAppointments = appointments.filter((app) => {
    const filteredByDate = !filterByDate || app.date === filterByDate;
    const filteredByDropdown =
      filterByDropdown === "All" || app.status === filterByDropdown;

    const filterByName = app.patient
      .toLowerCase()
      .includes(input.toLowerCase());

    const filteredByType = filterByType === "All" || app.type === filterByType;

    return (
      filteredByDate && filterByName && filteredByDropdown && filteredByType
    );
  });

  const appointmentsPerPage = 5;

  const lastIndex = currentPage * appointmentsPerPage;
  const firstIndex = lastIndex - appointmentsPerPage;

  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage,
  );
  const appointmentPerPage = filteredAppointments.slice(firstIndex, lastIndex);
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
                <strong>{totalAppointments}</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.greenCard}`}>
              <span className={styles.summaryIcon}>
                <FiCheckCircle size={21} />
              </span>

              <div>
                <p>Confirmed</p>
                <strong>{confirmedAppointments}</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.yellowCard}`}>
              <span className={styles.summaryIcon}>
                <FiClock size={21} />
              </span>

              <div>
                <p>Scheduled</p>
                <strong>{scheduledAppointments}</strong>
              </div>
            </article>

            <article className={`${styles.summaryCard} ${styles.pinkCard}`}>
              <span className={styles.summaryIcon}>
                <FiCheckCircle size={21} />
              </span>

              <div>
                <p>Completed</p>
                <strong>{completedAppointments}</strong>
              </div>
            </article>
          </section>
        </div>

        <section className={styles.scheduleCard}>
          <div className={styles.scheduleHeader}>
            <div className={styles.scheduleTitle}>
              <h2>Daily Schedule</h2>
              <p>
                {filterByDate
                  ? new Date(`${filterByDate}T00:00:00`).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )
                  : "All appointment dates"}
              </p>
            </div>

            <div className={styles.filtersContainer}>
              <div className={styles.filterGroup}>
                <label>Date</label>
                <div className={styles.dateWrapper}>
                  <FiCalendar size={16} />
                  <input
                    className={styles.dateInput}
                    type="date"
                    value={filterByDate}
                    onChange={(e) => {
                      setFilterByDate(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              <div className={styles.filterGroup}>
                <label>Search Patient</label>
                <input
                  className={styles.searchInput}
                  type="text"
                  placeholder="Search patient..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className={styles.filterGroup}>
                <label>Appointment Status</label>
                <select
                  className={styles.filterSelect}
                  value={filterByDropdown}
                  onChange={(e) => {
                    setFilterByDropdown(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Status</option>
                  {[...new Set(appointments.map((app) => app.status))].map(
                    (status) => (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    ),
                  )}
                </select>
              </div>

              <div className={styles.filterGroup}>
                <label>Appointment Type</label>
                <select
                  className={styles.filterSelect}
                  value={filterByType}
                  onChange={(e) => {
                    setFilterByType(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Types</option>
                  {[...new Set(appointments.map((app) => app.type))].map(
                    (type) => (
                      <option value={type} key={type}>
                        {type}
                      </option>
                    ),
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.timeline}>
            {appointmentPerPage.length === 0 ? (
              <p className={styles.emptyAppointments}>
                No appointments available.
              </p>
            ) : (
              appointmentPerPage.map((appointment) => (
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
              ))
            )}

            <div className={styles.pagination}>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <div className={styles.paginationButtons}>
                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <button
                  className={styles.pageButton}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
};
