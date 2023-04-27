import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.loader}>
      <div className={styles.shadow}></div>
      <div className={styles.box}></div>
    </div>
  );
}

export default Loading;
