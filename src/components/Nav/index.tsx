"use client";
import React, { useState, useEffect } from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Active l'animation quand l'utilisateur descend de plus de 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
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
