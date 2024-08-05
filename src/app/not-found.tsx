import styles from "@/misc/NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFound}>
        <div className={styles.first}>4</div>
        <div className={styles.second}>0</div>
        <div className={styles.third}>4</div>
      </div>
      <div className={styles.notFoundDesc}>Not found</div>
    </div>
  );
}

export default NotFound;
