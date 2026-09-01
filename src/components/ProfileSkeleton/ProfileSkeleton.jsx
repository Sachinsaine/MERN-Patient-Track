import styles from "./profileSkeleton.module.css";

export const ProfileSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.avatar}`} />

      <div className={`${styles.skeleton} ${styles.name}`} />

      <div className={styles.rows}>
        <div className={styles.row}>
          <div className={`${styles.skeleton} ${styles.icon}`} />

          <div className={styles.content}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.value}`} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.skeleton} ${styles.icon}`} />

          <div className={styles.content}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.value}`} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.skeleton} ${styles.icon}`} />

          <div className={styles.content}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.value}`} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.skeleton} ${styles.icon}`} />

          <div className={styles.content}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.value}`} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={`${styles.skeleton} ${styles.icon}`} />

          <div className={styles.content}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.value}`} />
          </div>
        </div>
      </div>

      <div className={`${styles.skeleton} ${styles.button}`} />
    </div>
  );
};
