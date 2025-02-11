"use client";

import React, { useEffect, useRef } from "react";
import styles from "./TitleAbout.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import type { TitleAboutData } from "@/types/modules/titleAbout";

gsap.registerPlugin(ScrollTrigger);

const TitleAbout: React.FC<TitleAboutData> = ({
  subtitle,
  highlight,
  mainText,
}) => {
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!subtitleRef.current) return;

    // Split le texte en mots
    const splitSubtitle = new SplitType(subtitleRef.current, {
      types: "words",
      wordClass: styles.animatedWord,
    });

    // Animation pour le sous-titre
    gsap.fromTo(
      `.${styles.animatedWord}`,
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
          trigger: subtitleRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      splitSubtitle.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.titleContent}>
      <div className={styles.subtitleWapper}>
        <h3 ref={subtitleRef} className={styles.subtitleAbout}>
          {subtitle}
        </h3>
      </div>
      <h2 className={styles.titleAbout}>
        <span className={styles.hightLight}>{highlight}</span> {mainText}
      </h2>
    </div>
  );
};

export default TitleAbout;
