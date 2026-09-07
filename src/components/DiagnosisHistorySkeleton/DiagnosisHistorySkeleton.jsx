import styles from "./diagnosisHistorySkeleton.module.css";

export const DiagnosisHistorySkeleton = () => {
  return (
    <div className={styles.mainCont}>
      <div className={styles.wrapper}>
        <div className={`${styles.skeleton} ${styles.heading}`} />

        <div className={styles.chartCard}>
          <div className={styles.chartArea}>
            <div className={styles.chartHeaderRow}>
              <div className={`${styles.skeleton} ${styles.chartTitle}`} />
              <div className={`${styles.skeleton} ${styles.range}`} />
            </div>

            <div className={styles.chartWrapper}>
              <div className={styles.chartLines}>
                <div className={styles.horizontalLine} />
                <div className={styles.horizontalLine} />
                <div className={styles.horizontalLine} />
                <div className={styles.horizontalLine} />
                <div className={styles.horizontalLine} />

                <div className={styles.fakeGraph}>
                  <div className={styles.graphLine} />
                  <div className={styles.graphLine} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div className={`${styles.skeleton} ${styles.legendLabel}`} />
              <div className={`${styles.skeleton} ${styles.legendValue}`} />
              <div className={`${styles.skeleton} ${styles.legendSub}`} />
            </div>

            <div className={styles.divider} />

            <div className={styles.legendItem}>
              <div className={`${styles.skeleton} ${styles.legendLabel}`} />
              <div className={`${styles.skeleton} ${styles.legendValue}`} />
              <div className={`${styles.skeleton} ${styles.legendSub}`} />
            </div>
          </div>
        </div>

        <div className={styles.vitalsGrid}>
          <div className={styles.vitalTile}>
            <div className={`${styles.skeleton} ${styles.tileIcon}`} />
            <div className={`${styles.skeleton} ${styles.tileValue}`} />
            <div className={`${styles.skeleton} ${styles.tileLabel}`} />
            <div className={`${styles.skeleton} ${styles.tileStatus}`} />
          </div>

          <div className={styles.vitalTile}>
            <div className={`${styles.skeleton} ${styles.tileIcon}`} />
            <div className={`${styles.skeleton} ${styles.tileValue}`} />
            <div className={`${styles.skeleton} ${styles.tileLabel}`} />
            <div className={`${styles.skeleton} ${styles.tileStatus}`} />
          </div>

          <div className={styles.vitalTile}>
            <div className={`${styles.skeleton} ${styles.tileIcon}`} />
            <div className={`${styles.skeleton} ${styles.tileValue}`} />
            <div className={`${styles.skeleton} ${styles.tileLabel}`} />
            <div className={`${styles.skeleton} ${styles.tileStatus}`} />
          </div>
        </div>
      </div>
    </div>
  );
};
