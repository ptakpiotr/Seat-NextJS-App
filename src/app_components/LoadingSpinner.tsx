import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return <div className={styles.spinner}>
    <div className={styles.spinnerBlock}></div>
    <div className={styles.spinnerBlock}></div>
    <div className={styles.spinnerBlock}></div>
  </div>;
}

export default LoadingSpinner;
