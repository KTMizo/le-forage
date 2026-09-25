"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ScrollProgress.module.css";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = "#003B87",
  height = 4,
  zIndex = 1000,
}) => {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    let scrollable = 1;

    // Fin de la page = bas du footer. Le scroll infini ajoute ensuite une zone rouge et une
    // copie du hero ([data-scroll-end] marque leur début) : elles ne comptent pas.
    // Mesuré au chargement et quand la page change de taille, jamais pendant le scroll.
    const measure = (): void => {
      const end = document.querySelector<HTMLElement>("[data-scroll-end]");
      const bottom = end
        ? end.getBoundingClientRect().top + window.scrollY
        : document.documentElement.scrollHeight;
      scrollable = Math.max(1, bottom - window.innerHeight);
    };

    const updateProgress = (): void => {
      if (!progressBarRef.current) return;

      const scrolled = Math.max(
        0,
        Math.min(100, (window.scrollY / scrollable) * 100)
      );

      progressBarRef.current.style.transform = `translateX(${scrolled - 100}%)`;
      ticking = false;
    };

    const onScroll = (): void => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      updateProgress();
    });
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      resizeObserver.disconnect();
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className={styles.progressContainer}
      style={{
        height: `${height}px`,
        zIndex,
      }}>
      <div
        ref={progressBarRef}
        className={styles.progressBar}
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default ScrollProgress;
