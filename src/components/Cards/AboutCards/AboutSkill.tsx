import React, { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./AboutCards.module.css";
import SplitType from "split-type";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

const AboutSkill = ({ iconSrc, title, description }: CardProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current || !cardRef.current)
      return;

    // Split le texte du titre
    const splitTitle = new SplitType(titleRef.current, {
      types: "lines",
      lineClass: styles.animatedLine,
    });

    // Split le texte de la description
    const splitDescription = new SplitType(descriptionRef.current, {
      types: "lines",
      lineClass: styles.animatedLine,
    });

    // Animation pour le titre et la description
    gsap.fromTo(
      cardRef.current.querySelectorAll(`.${styles.animatedLine}`),
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
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      splitTitle.revert();
      splitDescription.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.cardTitle}>
        <div className={styles.iconContainer}>
          <Image
            src={iconSrc || "/assets/svg/Icones/default.svg"} // Assurez-vous d'avoir une image de secours
            alt={title}
            width="520"
            height="520"
            className={styles.icon}
          />
        </div>
        <h3 className={styles.title} ref={titleRef}>
          {title}
        </h3>
      </div>
      <div className={styles.content}>
        <p className={styles.description} ref={descriptionRef}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutSkill;
