"use client";

import React from "react";
import ListAsk from "@/components/ListAsk";
import styles from "./Services.module.css";
import Image from "next/image";

interface ServiceSectionProps {
  title: string;
  questions: string[];
  imageSrc: string;
  imageAlt: string;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  questions,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className={styles.contentSection}>
      <div className={styles.textContent}>
        <div className={styles.sectionTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.sectionDescription}>
          {questions.map((question, index) => (
            <ListAsk key={index} question={question} />
          ))}
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={600}
          className={styles.servicesImage}
          priority
          quality={85}
        />
      </div>
    </div>
  );
};

const Services = () => {
  const forageQuestions = [
    "Sondage pressiométrique",
    "Sondage carotté",
    "Sondage destructif instrumenté",
    "Sondage à la Tarière",
    "Pénétromètre dynamique",
    "Pénétromètre statique",
  ];

  const environQuestions = [
    "Sondage pressiométrique",
    "Sondage carotté",
    "Sondage destructif instrumenté",
  ];

  const essaisQuestions = [
    "Sondage pressiométrique",
    "Sondage carotté",
    "Sondage destructif instrumenté",
  ];

  return (
    <section className={styles.services}>
      <div className={styles.servicesTitle}>
        <h2 className={styles.title}>Nos services</h2>
      </div>
      <div className={styles.servicesContent}>
        <ServiceSection
          title="Forage géotechniques"
          questions={forageQuestions}
          imageSrc="/assets/images/first-forage.jpg"
          imageAlt="Forage géotechnique"
        />
        <ServiceSection
          title="Forage environnementaux"
          questions={environQuestions}
          imageSrc="/assets/images/forage-environnementaux.jpg"
          imageAlt="Forage environnemental"
        />
        <ServiceSection
          title="Essais d'eau"
          questions={essaisQuestions}
          imageSrc="/assets/images/forage-geotechniques.jpg"
          imageAlt="Forage environnemental"
        />
      </div>
    </section>
  );
};

export default Services;
