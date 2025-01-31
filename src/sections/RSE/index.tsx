"use client";

import React from "react";
import styles from "./Rse.module.css";
import PartnersCard from "@/components/Cards/PartnersCard/PartnersCard";

const RSE = () => {
  const securityCards = [
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "EPI Logo",
        width: 48,
        height: 48,
      },
      text: "EPI",
      hasTooltip: true,
      tooltipContent: "Information supplémentaire sur les EPI",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "Kit d'urgence Logo",
        width: 48,
        height: 48,
      },
      text: "Kit d'intervention d'urgence",
      hasTooltip: true,
      tooltipContent: "Information sur le kit d'intervention d'urgence",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "DICT Logo",
        width: 48,
        height: 48,
      },
      text: "DICT",
      hasTooltip: true,
      tooltipContent: "Information supplémentaire sur DICT",
    },
  ];

  const qualificationsCards = [
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "CACES Logo",
        width: 48,
        height: 48,
      },
      text: "CACES",
      hasTooltip: true,
      tooltipContent: "Information sur les CACES",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "AIPR Logo",
        width: 48,
        height: 48,
      },
      text: "AIPR",
      hasTooltip: true,
      tooltipContent: "Information sur l'AIPR",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "SST Logo",
        width: 48,
        height: 48,
      },
      text: "SST",
      hasTooltip: true,
      tooltipContent: "Information sur le SST",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "Amiante Logo",
        width: 48,
        height: 48,
      },
      text: "Risque Amiante SS4",
      hasTooltip: true,
      tooltipContent: "Information sur le Risque Amiante",
    },
    {
      logo: {
        src: "/assets/images/logo-test.png",
        alt: "Risque Chimique Logo",
        width: 48,
        height: 48,
      },
      text: "Risque Chimique N1",
      hasTooltip: true,
      tooltipContent: "Information sur le Risque Chimique",
    },
  ];

  return (
    <div className={styles.rse}>
      <div className={styles.rseHeader}>
        <div className={styles.titleGroup}>
          <span className={styles.tagTitle}>RSE</span>
          <h1 className={styles.mainTitle}>
            La sécurité, au cœur
            <br />
            de nos chantiers
          </h1>
        </div>
      </div>

      <div className={styles.rseContent}>
        <div className={styles.rseLeft}>
          <div className={styles.textGroup}>
            <p className={styles.description}>
              {`La sécurité de nos équipes est une de nos priorités. Nous mettons
              en place des procédures rigoureuses, des équipements de protection
              adaptés à chaque type d'intervention et des formations continues.`}
            </p>
            <p className={styles.methodNote}>
              Notre méthode garantie des conditions de travail sûres, tout en
              respectant les normes environnementales et HSE les plus
              exigeantes.
            </p>
          </div>
        </div>

        <div className={styles.rseCards}>
          <div className={styles.security}>
            <h4 className={styles.securityTitle}>
              Nos engagements pour la sécurité :
            </h4>
            <div className={styles.securityCards}>
              {securityCards.map((card) => (
                <PartnersCard key={card.text} {...card} />
              ))}
            </div>
          </div>

          <div className={styles.qualifications}>
            <h4 className={styles.qualificationsTitle}>Nos qualifications :</h4>
            <div className={styles.qualificationsCards}>
              {qualificationsCards.map((card) => (
                <PartnersCard key={card.text} {...card} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSE;
