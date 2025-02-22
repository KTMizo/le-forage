// index.tsx
import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.navItems}>
          <a data-text="À propos" href="#a-propos">
            À propos
          </a>
          <a data-text="Nos services" href="#services">
            Nos services
          </a>
          <a data-text="Sécurité" href="#rse">
            Sécurité
          </a>
          <a data-text="Nos machines" href="#machines">
            Nos machines
          </a>
          <a data-text="FAQ" href="#faq">
            FAQ
          </a>
        </div>
        <div className={styles.navIcon}>Navigation</div>
      </div>
    </div>
  );
};

export default Nav;
