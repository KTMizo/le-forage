"use client";
// Osmo Supply : Animated Grid Overlay (Columns). Shift + G pour afficher / masquer.
// Colonnes et marges calées sur la grille du site (voir GridOverlay.module.css).
import { useEffect } from "react";
import gsap from "gsap";
import styles from "./GridOverlay.module.css";

const COLUMNS = 12;

export default function GridOverlay() {
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>("[data-animated-grid]");
    const cols = document.querySelectorAll("[data-animated-grid-col]");
    const toggles = document.querySelectorAll("[data-animated-grid-toggle]");

    if (!grid || !cols.length) return;

    const storageKey = "animatedGridState";
    let isOpen = false;
    try {
      isOpen = localStorage.getItem(storageKey) === "open";
    } catch {}
    const save = (state: string) => {
      try {
        localStorage.setItem(storageKey, state);
      } catch {}
    };

    gsap.set(grid, { display: "block" });
    gsap.set(cols, { yPercent: isOpen ? 0 : 100 });

    function openGrid() {
      isOpen = true;
      save("open");
      gsap.fromTo(
        cols,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: "expo.inOut",
          stagger: { each: 0.03, from: "start" },
          overwrite: true,
        },
      );
    }

    function closeGrid() {
      isOpen = false;
      save("closed");
      gsap.fromTo(
        cols,
        { yPercent: 0 },
        {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          stagger: { each: 0.03, from: "start" },
          overwrite: true,
        },
      );
    }

    const toggleGrid = () => (isOpen ? closeGrid() : openGrid());

    const isTypingContext = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return false;
      const tag = (el.tagName || "").toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        el.isContentEditable
      );
    };

    const onClick = (e: Event) => {
      e.preventDefault();
      toggleGrid();
    };
    const onKey = (e: KeyboardEvent) => {
      if (isTypingContext(e)) return;
      if (!(e.shiftKey && (e.key || "").toLowerCase() === "g")) return;
      e.preventDefault();
      toggleGrid();
    };

    toggles.forEach((btn) => btn.addEventListener("click", onClick));
    window.addEventListener("keydown", onKey);
    return () => {
      toggles.forEach((btn) => btn.removeEventListener("click", onClick));
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div data-animated-grid className={styles.grid} aria-hidden="true">
      <div className={styles.container}>
        <div className={styles.row}>
          {Array.from({ length: COLUMNS }, (_, i) => (
            <div key={i} data-animated-grid-col className={styles.col} />
          ))}
        </div>
      </div>
    </div>
  );
}
