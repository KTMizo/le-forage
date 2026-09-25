// Menu mobile (plein écran)
"use client";

import { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import CloseIcon from "@/components/UI/CloseIcon";
import Logo from "@/components/UI/Logo";
import { NAV_LINKS, navHref } from "@/lib/site";
import { usePathname } from "next/navigation";

type LenisWindow = Window & {
  lenis?: { stop: () => void; start: () => void };
};

const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onHome = usePathname() === "/";

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
    <div>
      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        className={styles.menu__button}
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
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            transform="translate(0, 3.82141)"
            stroke="currentColor"
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
            {NAV_LINKS.map((item, index) => (
              <a
                onClick={closeMenu}
                href={navHref(item.url, onHome)}
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
