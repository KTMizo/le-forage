import React from "react";
import styles from "./FooterCards.module.css";
import Button from "@/components/UI/Button";

const FooterCards = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.corner} id={styles.topLeft}></div>
        <div className={styles.corner} id={styles.topRight}></div>
        <div className={styles.corner} id={styles.bottomLeft}></div>
        <div className={styles.corner} id={styles.bottomRight}></div>
        <h2 className={styles.title}>
          Contactez nos experts pour une évaluation rapide et précise de votre
          projet
        </h2>
        <Button variant="accent-outline" href="/destination" showArrow>
          Demandez un devis
        </Button>
      </div>
    </div>
  );
};

export default FooterCards;
