// index.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";
import styles from "./Menu.module.css";

const MenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const handleMenuToggle = () => {
    setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className={styles.menu}>
      <button
        onClick={handleMenuToggle}
        className={`${styles.menu__button} ${
          isVisible ? styles.menu__button_visible : ""
        }`}
        aria-label="Menu">
        <span className={styles.menu__buttonText}>Menu</span>
        <svg
          className={`${styles.menu__buttonIcon} ${
            isMenuOpen ? styles.menu__buttonIcon_hidden : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            transform="translate(0, -3.03571)"
            stroke="#AB2325"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            transform="translate(0, 3.82141)"
            stroke="#AB2325"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div
        className={`${styles.menu__overlay} ${
          isMenuOpen ? styles.menu__overlay_active : ""
        } ${isAnimating ? styles.menu__overlay_animating : ""}`}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden={!isMenuOpen}>
        <div
          className={`${styles.menu__panel} ${
            isMenuOpen ? styles.menu__panel_active : ""
          }`}>
          <div className={styles.menu__header}>
            <span className={styles.menu__headerText}>Fermer</span>
            <button
              onClick={handleMenuToggle}
              className={styles.menu__closeButton}
              aria-label="Fermer le menu">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                className={styles.menu__closeIcon}>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav
            className={`${styles.menu__nav} ${
              isMenuOpen ? styles.menu__nav_active : ""
            }`}>
            {[
              "À propos",
              "Nos services",
              "Sécurité",
              "Nos machines",
              "FAQ",
            ].map((item, index) => (
              <Link
                href="#"
                key={item}
                className={styles.menu__navLink}
                style={{ animationDelay: `${index * 0.1}s` }}>
                {item}
              </Link>
            ))}
            <div
              className={styles.menu__contactWrapper}
              style={{ animationDelay: "0.5s" }}>
              <Button
                variant="secondary"
                href="/destination"
                className={styles.menu__contactButton}>
                Nous contacter
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
