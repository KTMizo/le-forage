"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./Machine.module.css";
import MachineCard from "@/components/Cards/MachineCard/MachineCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface Machine {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  technicalSheetUrl: string;
}

const machines: Machine[] = [
  {
    image: {
      src: "/assets/images/machines/machinetest.png",
      alt: "Machine de forage E 4.50",
      width: 520,
      height: 718,
    },
    title: "E 4.50 - Machine de forage",
    technicalSheetUrl: "/fiches-techniques/e450.pdf",
  },
  {
    image: {
      src: "/assets/images/machines/machinetest.png",
      alt: "DPM 30 - Pénétromètre",
      width: 520,
      height: 718,
    },
    title: "DPM 30 - Pénétromètre",
    technicalSheetUrl: "/fiches-techniques/dpm30.pdf",
  },
  {
    image: {
      src: "/assets/images/machines/machinetest.png",
      alt: "Machine de forage E 4.50",
      width: 520,
      height: 718,
    },
    title: "Machine test",
    technicalSheetUrl: "/fiches-techniques/test.pdf",
  },
  {
    image: {
      src: "/assets/images/machines/machinetest.png",
      alt: "Machine de forage E 4.50",
      width: 520,
      height: 718,
    },
    title: "Machine test",
    technicalSheetUrl: "/fiches-techniques/test.pdf",
  },
];

const Machine = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const initScrollTrigger = useCallback(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !horizontalRef.current) return;

    const container = horizontalRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${container.scrollWidth - window.innerWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    initScrollTrigger();
  }, [initScrollTrigger]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.tagTitle}>NOS MACHINES</span>
        <h2 className={styles.mainTitle}>Aux services de vos projets</h2>
      </div>
      <div className={styles.horizontalSection}>
        <div ref={horizontalRef} className={styles.cardsContainer}>
          {machines.map((machine, index) => (
            <div key={index} className={styles.cardWrapper}>
              <MachineCard {...machine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Machine;
