import styles from "./patientsSkeleton.module.css";

export const PatientsSkeleton = () => {
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={`${styles.skeleton} ${styles.title}`} />

        <div className={`${styles.skeleton} ${styles.searchBtn}`} />
      </div>

      {/* Patient list */}
      <ul className={styles.list}>
        {Array.from({ length: 8 }).map((_, index) => (
          <li key={index}>
            <div className={styles.row}>
              {/* Avatar */}
              <div className={`${styles.skeleton} ${styles.avatar}`} />

              {/* Name + gender/age */}
              <div className={styles.info}>
                <div className={`${styles.skeleton} ${styles.name}`} />
                <div className={`${styles.skeleton} ${styles.meta}`} />
              </div>

              {/* More icon */}
              <div className={`${styles.skeleton} ${styles.moreBtn}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
