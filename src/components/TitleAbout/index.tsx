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
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!subtitleRef.current || !titleRef.current) return;

    const splitSubtitle = new SplitType(subtitleRef.current, {
      types: "words",
      wordClass: styles.animatedWord,
    });

    // Attendre que les éléments soient dans le DOM
    requestAnimationFrame(() => {
      // Animation du sous-titre
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
        },
      );

      // Animation de l'opacité du texte principal au scroll
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      splitSubtitle.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="grid gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-40">
      <h3
        ref={subtitleRef}
        className="text-tag   lg:text-desk-tag uppercase font-bebas text-bleu"
      >
        {subtitle}
      </h3>
      <h2
        ref={titleRef}
        className="text-black font-articulate text-m lg:text-desk-m lg:indent-[9.375rem] lg:max-w-657"
      >
        <span className="text-red">{highlight}&nbsp;</span>
        <span>{mainText}</span>
      </h2>
    </div>
  );
};

export default TitleAbout;
