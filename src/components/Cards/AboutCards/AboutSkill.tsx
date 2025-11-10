import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./AboutCards.module.css";

type CardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

const AboutSkill = ({ iconSrc, title, description }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className={`${styles.card} ${isVisible ? styles.visible : ''}`} ref={cardRef}>
      <div className={styles.cardTitle}>
        <div className={styles.iconContainer}>
          <Image
            src={iconSrc || "/assets/svg/Icones/default.svg"}
            alt={title}
            width="520"
            height="520"
            className={styles.icon}
          />
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default AboutSkill;