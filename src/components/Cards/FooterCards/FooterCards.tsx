"use client";
// components/Cards/FooterCards/FooterCards.tsx
import React from "react";
import styles from "./FooterCards.module.css";
import Button from "@/components/UI/Button";
import { ButtonVariant } from "@/types/modules/footer"; // Assurez-vous que le chemin est correct

interface ButtonProps {
  variant: ButtonVariant; // Assumer que ButtonVariant est importé correctement
  url: string;
  showArrow: boolean;
  text: string; // Cette prop est inutile si vous utilisez des enfants (children)
}

interface FooterCardsProps {
  title: string;
  button: ButtonProps;
}

const FooterCards: React.FC<FooterCardsProps> = ({ title, button }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.corner} id={styles.topLeft}></div>
        <div className={styles.corner} id={styles.topRight}></div>
        <div className={styles.corner} id={styles.bottomLeft}></div>
        <div className={styles.corner} id={styles.bottomRight}></div>
        <h2 className={styles.title}>{title}</h2>
        <Button
          variant={button.variant}
          href={button.url}
          showArrow={button.showArrow}>
          {button.text}
        </Button>
      </div>
    </div>
  );
};

export default FooterCards;
