// Menu mobile (plein écran)
"use client";

import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import CloseIcon from "@/components/UI/CloseIcon";
import Logo from "@/components/UI/Logo";

type LenisWindow = Window & {
  lenis?: { stop: () => void; start: () => void };
};

const LINKS = [
  { title: "À propos", url: "#a-propos" },
  { title: "Nos services", url: "#services" },
  { title: "Sécurité", url: "#rse" },
  { title: "Nos machines", url: "#machines" },
  { title: "FAQ", url: "#faq" },
];

const MenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Le bouton n'apparaît sur mobile qu'après 200px de scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // La page ne défile pas derrière le menu ouvert
  useEffect(() => {
    const lenis = (window as LenisWindow).lenis;
    if (isMenuOpen) lenis?.stop();
    else lenis?.start();
  }, [isMenuOpen]);

  const closeMenu = () => {
    // Relancer Lenis avant que son gestionnaire d'ancres (sur window) ne scrolle
    (window as LenisWindow).lenis?.start();
    setIsMenuOpen(false);
  };

  return (
    <div id="t-menu" className={styles.menu}>
      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        className={`${styles.menu__button} ${
          isVisible ? styles.menu__button_visible : ""
        }`}
        aria-label="Menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.menu__buttonText}>Menu</span>
        <svg
          className={`${styles.menu__buttonIcon} ${
            isMenuOpen ? styles.menu__buttonIcon_hidden : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
        }`}
        aria-hidden={!isMenuOpen}
        data-lenis-prevent
      >
        <div
          className={`${styles.menu__panel} ${
            isMenuOpen ? styles.menu__panel_active : ""
          }`}
        >
          <div className="flex pt-8 px-8 pb-16 justify-between items-start">
            <Logo className="w-55 h-25" />
            <button
              onClick={closeMenu}
              className={styles.menu__closeButton}
              aria-label="Fermer le menu"
            >
              <span>Fermer</span>
              <span className={styles.menu__closeIcon}>
                <CloseIcon />
              </span>
            </button>
          </div>

          <nav
            className={`${styles.menu__nav} ${
              isMenuOpen ? styles.menu__nav_active : ""
            }`}
          >
            {/* Ancres simples : le scroll fluide est géré par Lenis (option anchors) */}
            {LINKS.map((item, index) => (
              <a
                onClick={closeMenu}
                href={item.url}
                key={item.title}
                className={styles.menu__navLink}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
