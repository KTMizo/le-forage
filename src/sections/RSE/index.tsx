"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Rse.module.css";
import PartnersCard from "@/components/Cards/PartnersCard/PartnersCard";
import PartnersPopUp from "@/components/Cards/PartnersPopUp/PartnersPopUp";
import type { RSEModules, RSECard } from "@/types/modules/rse";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface RSEProps {
  data: RSEModules;
}

const RSE = ({ data }: RSEProps) => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  // Refs pour les animations
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const methodNoteRef = useRef<HTMLParagraphElement>(null);
  const tagTitleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!tagTitleRef.current) return;

    const splitTagTitle = new SplitType(tagTitleRef.current, {
      types: "words",
      wordClass: styles.animatedWord,
    });

    // Animation du tag title
    gsap.fromTo(
      `.${styles.animatedWord}`,
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
          trigger: tagTitleRef.current,
          start: "bottom bottom",
          once: true,
        },
      },
    );

    // Liste des paragraphes à animer
    const elements = [{ ref: descriptionRef }, { ref: methodNoteRef }];

    // Animation pour chaque paragraphe
    elements.forEach(({ ref }) => {
      if (!ref.current) return;

      const splitText = SplitText.create(ref.current, {
        type: "lines,words",
        //mask: "lines",
        wordsClass: "inline!",
        linesClass: "inline!", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
      });

      // THOMAS
      // Animation d'opacité au scroll
      gsap.fromTo(
        splitText.words,
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          stagger: {
            each: 0.1,
            amount: 1,
            from: "random",
          },
          scrollTrigger: {
            trigger: ref.current,
              start: "bottom bottom",
              end: "bottom center",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cleanup
      return () => {
        //splitText.revert();
        //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });

    return () => {
      splitTagTitle.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const renderCards = (cards: RSECard[]) =>
    cards.map((card) => (
      <React.Fragment key={card.text}>
        <PartnersCard
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
    <section id="rse" className={styles.rse}>
      <div className={styles.rseHeader}>
        <div className="grid lg:grid-cols-2 gap-y-8">
          <span
            ref={tagTitleRef}
            className="text-tag  lg:col-span-1 lg:col-start-1 lg:row-span-full lg:text-desk-tag uppercase font-bebas text-bleu"
          >
            {data.rse_header.tag_title}
          </span>
          <h2 className="text-xl lg:row-span-full lg:col-span-full lg:justify-self-center lg:text-desk-xl text-red font-articulate max-w-124 lg:max-w-312 lg:text-center">
            {data.rse_header.main_title}
          </h2>
        </div>
      </div>

      <div className={styles.rseContent}>
        <div className={styles.rseLeft}>
          <div className={styles.textGroup}>
            <p
              className="font-articulate text-m text-black lg:text-desk-m"
              ref={descriptionRef}
            >
              {data.rse_content.description}
            </p>
            <p
              className="font-articulate text-m text-black lg:text-desk-m"
              ref={methodNoteRef}
            >
              {data.rse_content.method_note}
            </p>
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
    </section>
  );
};

export default RSE;
