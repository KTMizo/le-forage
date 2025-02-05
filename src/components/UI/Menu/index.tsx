"use client";

import React, { useState, useEffect } from "react";
import styles from "./Menu.module.css";

const MenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`${styles.menuButton} ${isVisible ? styles.visible : ""}`}
      aria-label="Menu">
      <span className={styles.menuText}>Menu</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <line
          y1="4.96429"
          x2="16"
          y2="4.96429"
          stroke="#AB2325"
          strokeWidth="1.5"
        />
        <line
          y1="11.8214"
          x2="16"
          y2="11.8214"
          stroke="#AB2325"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};

export default MenuButton;
