import { useEffect } from "react";
import styles from "./Slide.module.css";

function Slide({ type }) {
  const handleSlide = (event) => {
    const target = event.target;
    const slideSection = target.closest(".root").previousSibling.firstChild;
    const listClientWidth = slideSection.clientWidth;
    const computedStyle = window.getComputedStyle(slideSection);
    const transformMatrix = new DOMMatrix(computedStyle.transform);
    let translateXValue = transformMatrix.m41;
    translateXValue = target.className === `${styles.arrow__leftImage}` ? translateXValue + listClientWidth : translateXValue - listClientWidth;
    if (translateXValue > 0 || translateXValue <= slideSection.scrollWidth * -1) {
      return;
    }
    slideSection.style.transform = `translateX(${translateXValue}px)`;
  };
  useEffect(() => {
    const arrowLeft = document.querySelectorAll(`.${styles.arrow__leftImage}`);
    const arrowRight = document.querySelectorAll(`.${styles.arrow__rightImage}`);
    if (arrowLeft.length > 0) {
      arrowLeft.forEach((element) => element.addEventListener("click", handleSlide));
    }
    if (arrowRight.length > 0) {
      arrowRight.forEach((element) => element.addEventListener("click", handleSlide));
    }
  });

  return (
    <div className={[type === "basic" ? styles.container : styles.containerSm, "root"].join(" ")}>
      <div className={[styles.btn__arrow, styles.arrow__left].join(" ")}>
        <div className={styles.arrow__leftImage}></div>
      </div>
      <div className={[styles.btn__arrow, styles.arrow__right].join(" ")}>
        <div className={styles.arrow__rightImage}></div>
      </div>
    </div>
  );
}

export default Slide;
