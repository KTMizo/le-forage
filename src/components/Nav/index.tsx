import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <div className={styles.navItems}>
          <a href="#">À propos</a>
          <a href="#">Nos services</a>
          <a href="#">Sécurité</a>
          <a href="#">Nos machines</a>
          <a href="#">FAQ</a>
        </div>
        <div className={styles.navIcon}>Navigation</div>
      </div>
    </div>
  );
};

export default Nav;
