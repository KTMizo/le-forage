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

    const updateProgress = (): void => {
      if (!progressBarRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollable = documentHeight - windowHeight;

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

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
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
