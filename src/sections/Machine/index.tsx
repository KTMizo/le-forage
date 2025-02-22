"use client";

import React, { useEffect, useRef, useCallback } from "react";
import styles from "./Machine.module.css";
import MachineCard from "@/components/Cards/MachineCard/MachineCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Machine as MachineType } from "@/types/modules/machine";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const defaultData: MachineType = {
  machines_section_header: {
    tag_title: "NOS MACHINES",
    main_title: "Aux services de vos projets",
  },
  machines: [
    {
      image: {
        ID: 1,
        id: 1,
        title: "Machine de forage E 4.50",
        url: "/assets/images/machines/machinetest.png",
        alt: "Machine de forage E 4.50",
        width: 520,
        height: 718,
      },
      title: "E 4.50 - Machine de forage",
      technical_sheet: "/fiches-techniques/e450.pdf",
      boutton: {
        text: "Télécharger la fiche technique",
        url: "/fiches-techniques/e450.pdf",
        variant: "primary",
        showArrow: true,
      },
    },
  ],
};

interface MachineProps {
  data?: MachineType;
}

const Machine = ({ data = defaultData }: MachineProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const tagTitleRef = useRef<HTMLSpanElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animation des textes
    const textElements = [
      { ref: tagTitleRef, start: "top 90%" },
      { ref: mainTitleRef, start: "top 90%" },
    ];

    textElements.forEach(({ ref, start }) => {
      if (!ref.current) return;

      // Split le texte
      const splitText = new SplitType(ref.current, {
        types: "lines",
        lineClass: "animated-line",
      });

      // Animation
      gsap.fromTo(
        ref.current.querySelectorAll(".animated-line"),
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );

      return () => {
        splitText.revert();
      };
    });
  }, []);

  const initScrollTrigger = useCallback(() => {
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
    <section id="machines" ref={sectionRef} className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.tagTitle} ref={tagTitleRef}>
          {data.machines_section_header.tag_title}
        </span>
        <h2 className={styles.mainTitle} ref={mainTitleRef}>
          {data.machines_section_header.main_title}
        </h2>
      </div>
      <div className={styles.horizontalSection}>
        <div ref={horizontalRef} className={styles.cardsContainer}>
          {data.machines.map((machine, index) => (
            <div key={index} className={styles.cardWrapper}>
              <MachineCard
                image={machine.image}
                title={machine.title}
                technical_sheet={machine.technical_sheet}
                boutton={machine.boutton}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Machine;
