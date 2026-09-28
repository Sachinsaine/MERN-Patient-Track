import styles from "./loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p>Loading...</p>
    </div>
  );
};
