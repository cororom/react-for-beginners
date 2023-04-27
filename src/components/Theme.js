import { useState, useEffect } from "react";
import styles from "./Theme.module.css";

function Theme() {
  const [isToggled, setIsToggled] = useState(localStorage.getItem("isToggled") === "true");

  useEffect(() => {
    localStorage.setItem("isToggled", isToggled);
    document.documentElement.setAttribute("color-theme", isToggled === false ? "light" : "dark");
  }, [isToggled]);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className={styles.toggleWrapper}>
      <input type="checkbox" name="theme" id="theme" placeholder="theme" checked={isToggled} onChange={handleToggle} />
      <label htmlFor="theme" className={styles.toggle}>
        <span className={styles.toggle__handler}>
          <span className={[styles.crater, styles.crater01].join(" ")}></span>
          <span className={[styles.crater, styles.crater02].join(" ")}></span>
          <span className={[styles.crater, styles.crater03].join(" ")}></span>
        </span>
        <span className={[styles.star, styles.star01].join(" ")}></span>
        <span className={[styles.star, styles.star02].join(" ")}></span>
        <span className={[styles.star, styles.star03].join(" ")}></span>
        <span className={[styles.star, styles.star04].join(" ")}></span>
        <span className={[styles.star, styles.star05].join(" ")}></span>
        <span className={[styles.star, styles.star06].join(" ")}></span>
      </label>
    </div>
  );
}

export default Theme;
