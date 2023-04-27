import React, { useState, useEffect } from "react";
import Theme from "./Theme";
import styles from "./Nav.module.css";

function NavHomePc() {
  return (
    <header className={styles.page__head_pc}>
      <div className={styles.header__layout}>
        <ul className={styles.header__menu}>
          <li className={[styles.menu__item, styles.menu__logo].join(" ")}>
            <a href="/">
              <h1 className={styles.logo}>NFLEX</h1>
            </a>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>TOP</span>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>COMEDY</span>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>THRILLER</span>
          </li>
          <li className={[styles.menu__item, styles.menu02].join(" ")}>
            <span>ROMANCE</span>
          </li>
          <li className={[styles.menu__item, styles.space].join(" ")}></li>
          <li className={[styles.menu__item, styles.menu03].join(" ")}>
            <Theme />
          </li>
        </ul>
      </div>
    </header>
  );
}

function NavHomeMobile() {
  return (
    <header className={styles.page__head_mobile}>
      <ul className={styles.header__menu}>
        <li className={styles.menu01}>
          <span className={styles.selectedmenu}>TOP</span>
        </li>
        <li className={styles.menu01}>
          <span>COMEDY</span>
        </li>
        <li className={styles.menu01}>
          <span>THRILLER</span>
        </li>
        <li className={styles.menu01}>
          <span>ROMANCE</span>
        </li>
      </ul>
    </header>
  );
}

function NavDetailPc() {
  const [headerClass, setHeaderClass] = useState([styles.page__head_pc, styles.header__fixed].join(" "));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderClass([styles.page__head_pc, styles.header__scrolled].join(" "));
      } else {
        setHeaderClass([styles.page__head_pc, styles.header__fixed].join(" "));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={headerClass}>
      <div className={styles.header__layout}>
        <ul className={styles.header__menu}>
          <li className={[styles.menu__item, styles.menu__logo].join(" ")}>
            <a href="/">
              <h1 className={styles.logo}>NFLEX</h1>
            </a>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>TOP</span>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>COMEDY</span>
          </li>
          <li className={[styles.menu__item, styles.menu01].join(" ")}>
            <span>THRILLER</span>
          </li>
          <li className={[styles.menu__item, styles.menu02].join(" ")}>
            <span>ROMANCE</span>
          </li>
          <li className={[styles.menu__item, styles.space].join(" ")}></li>
          <li className={[styles.menu__item, styles.menu03].join(" ")}></li>
        </ul>
      </div>
    </header>
  );
}

export { NavHomePc };
export { NavHomeMobile };
export { NavDetailPc };
