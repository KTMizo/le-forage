"use client";

import React, { useState } from "react";
import styles from "./Rse.module.css";
import PartnersCard from "@/components/Cards/PartnersCard/PartnersCard";
import PartnersPopUp from "@/components/Cards/PartnersPopUp/PartnersPopUp";
import type { RSEModules, RSECard } from "@/types/modules/rse";
import RevealText from "@/components/UI/RevealText";
import GradientWaveText from "@/components/GradientWaveText";

interface RSEProps {
  data: RSEModules;
}

const RSE = ({ data }: RSEProps) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const allCards = [...data.security_cards, ...data.qualifications_cards];
  const openCard = allCards.find((card) => card.text === activePopup);

  // Les popups sont rendues hors des grilles de cartes : dans la grille, elles
  // devenaient le « dernier élément » et décalaient la dernière carte (div:last-child).
  const renderCards = (cards: RSECard[]) =>
    cards.map((card) => (
      <PartnersCard
        key={card.text}
        logo={{
          src: card.logo,
          alt: card.text,
          width: 48,
          height: 48,
        }}
        text={card.text}
        hasTooltip={true}
        tooltipContent={card.tooltip_content}
        onClick={() => setActivePopup(card.text)}
      />
    ));

  return (
    <section id="rse" data-theme="beige" className={styles.rse}>
      <div className={styles.rseHeader}>
        <div className="grid lg:grid-cols-2 gap-y-8">
          <RevealText
            as="span"
            className="text-tag lg:col-span-1 lg:col-start-1 lg:row-span-full lg:text-desk-tag uppercase font-bebas text-bleu"
          >
            {data.rse_header.tag_title}
          </RevealText>
          <RevealText className="text-xl lg:row-span-full lg:col-span-full lg:justify-self-center lg:text-desk-xl text-red font-articulate max-w-124 lg:max-w-312 lg:text-center">
            {data.rse_header.main_title}
          </RevealText>
        </div>
      </div>

      <div className={styles.rseContent}>
        <div className={styles.rseLeft}>
          <div className={styles.textGroup}>
            <GradientWaveText className="font-articulate text-m text-black lg:text-desk-m">
              {data.rse_content.description}
            </GradientWaveText>
            <GradientWaveText className="font-articulate text-m text-black lg:text-desk-m">
              {data.rse_content.method_note}
            </GradientWaveText>
          </div>
        </div>

        <div className={styles.rseCards}>
          <div className={styles.security}>
            <h3 className="uppercase font-bebas text-18 text-bleu lg:text-24 ">
              Nos engagements pour la sécurité
            </h3>
            <div className={styles.securityCards}>
              {renderCards(data.security_cards)}
            </div>
          </div>

          <div className={styles.qualifications}>
            <h3 className="uppercase font-bebas text-18 text-bleu lg:text-24">
              Nos qualifications
            </h3>
            <div className={styles.qualificationsCards}>
              {renderCards(data.qualifications_cards)}
            </div>
          </div>
        </div>
      </div>

      {openCard && (
        <PartnersPopUp
          isOpen
          onClose={() => setActivePopup(null)}
          title={openCard.popup.title}
          description={openCard.popup.description}
          imageSrc={openCard.popup.image}
          imageAlt={openCard.text}
          iconSrc={openCard.popup.icon}
          iconAlt={`Icône ${openCard.text}`}
        />
      )}
    </section>
  );
};

export default RSE;
