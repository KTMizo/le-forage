import React from "react";
import Image from "next/image";
import styles from "./Faq.module.css";
import ListAsk from "@/components/ListAsk";

const FAQ = () => {
  return (
    <div className={styles.faq}>
      <div className={styles.faqContent}>
        <div className={styles.subtitle}>
          <h2>FAQ</h2>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/images/faq-cover.jpg"
            alt="FAQ"
            fill
            sizes="(max-width: 100vw) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className={styles.faqList}>
        <ListAsk question="Quels types de forage proposez-vous ?" />
        <ListAsk question="Quelle est la durée typique d'un projet de forage ?" />
        <ListAsk question="Quels équipements utilisez-vous pour le forage ?" />
        <ListAsk question="Intervenez-vous uniquement en Île-de-France ?" />
        <ListAsk question="Proposez-vous des analyses en laboratoire ?" />
        <ListAsk question="Les DICT sont elles obligatoires ?" />
      </div>
    </div>
  );
};

export default FAQ;
