import React from "react";
import styles from "./AboutCards.module.css";

type CardProps = {
  iconSrc: string;
  title: string;
  description: string;
};

const AboutSkill = ({ iconSrc, title, description }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <div className={styles.iconContainer}>
          <img src={iconSrc} alt={title} className={styles.icon} />
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
