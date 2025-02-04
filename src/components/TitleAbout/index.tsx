"use client";

import React, { useEffect, useRef } from "react";
import styles from "./TitleAbout.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const TitleAbout = () => {
  const subtitleRef = useRef(null);

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
          Qui sommes nous
        </h3>
      </div>
      <h2 className={styles.titleAbout}>
        <span className={styles.hightLight}>Le Forage</span> est votre
        partenaire spécialisé dans les sondages géotechniques et
        environnementaux. Grâce à une expertise reconnue et une expérience
        solide, nous offrons un savoir-faire unique pour explorer, analyser, et
        comprendre les différentes couches du sol.
      </h2>
    </div>
  );
};

export default TitleAbout;
