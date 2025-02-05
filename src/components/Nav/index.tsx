// index.tsx
import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.navItems}>
          <a data-text="À propos" href="#">
            À propos
          </a>
          <a data-text="Nos services" href="#">
            Nos services
          </a>
          <a data-text="Sécurité" href="#">
            Sécurité
          </a>
          <a data-text="Nos machines" href="#">
            Nos machines
          </a>
          <a data-text="FAQ" href="#">
            FAQ
          </a>
        </div>
        <div className={styles.navIcon}>Navigation</div>
      </div>
    </div>
  );
};

export default Nav;
