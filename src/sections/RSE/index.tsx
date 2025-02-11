// sections/RSE/index.tsx
"use client";

import React, { useState } from "react";
import styles from "./Rse.module.css";
import PartnersCard from "@/components/Cards/PartnersCard/PartnersCard";
import PartnersPopUp from "@/components/Cards/PartnersPopUp/PartnersPopUp";
import type { RSEModules, RSECard } from "@/types/modules/rse";

interface RSEProps {
  data: RSEModules;
}

const RSE = ({ data }: RSEProps) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const renderCards = (cards: RSECard[]) =>
    cards.map((card) => (
      <React.Fragment key={card.text}>
        <PartnersCard
          logo={{
            src: card.logo, // Utiliser directement l'URL retournée par l'API
            alt: card.text,
            width: 48,
            height: 48,
          }}
          text={card.text}
          hasTooltip={true}
          tooltipContent={card.tooltip_content}
          onClick={() => setActivePopup(card.text)}
        />
        <PartnersPopUp
          isOpen={activePopup === card.text}
          onClose={() => setActivePopup(null)}
          title={card.popup.title}
          description={card.popup.description}
          imageSrc={card.popup.image}
          imageAlt={card.text}
          iconSrc={card.popup.icon}
          iconAlt={`Icône ${card.text}`}
        />
      </React.Fragment>
    ));

  return (
    <section className={styles.rse}>
      <div className={styles.rseHeader}>
        <div className={styles.titleGroup}>
          <span className={styles.tagTitle}>{data.rse_header.tag_title}</span>
          <h1 className={styles.mainTitle}>{data.rse_header.main_title}</h1>
        </div>
      </div>

      <div className={styles.rseContent}>
        <div className={styles.rseLeft}>
          <div className={styles.textGroup}>
            <p className={styles.description}>{data.rse_content.description}</p>
            <p className={styles.methodNote}>{data.rse_content.method_note}</p>
          </div>
        </div>

        <div className={styles.rseCards}>
          <div className={styles.security}>
            <h4 className={styles.securityTitle}>
              Nos engagements pour la sécurité :
            </h4>
            <div className={styles.securityCards}>
              {renderCards(data.security_cards)}
            </div>
          </div>

          <div className={styles.qualifications}>
            <h4 className={styles.qualificationsTitle}>Nos qualifications :</h4>
            <div className={styles.qualificationsCards}>
              {renderCards(data.qualifications_cards)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSE;
