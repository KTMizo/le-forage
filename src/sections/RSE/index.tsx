"use client";

import React, { useState } from "react";
import styles from "./Rse.module.css";
import PartnersCard from "@/components/Cards/PartnersCard/PartnersCard";
import PartnersPopUp from "@/components/Cards/PartnersPopUp";

interface PopupData {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  iconSrc: string;
  iconAlt: string;
}

interface CardData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  text: string;
  hasTooltip: boolean;
  tooltipContent: string;
  popup: PopupData;
}

const RSE = () => {
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const securityCards: CardData[] = [
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
      popup: {
        title: "Équipements de Protection Individuelle",
        description:
          "Tous nos intervenants sont systématiquement équipés des EPI adaptés à chaque tâche. Ces équipements comprennent les casques, les gilets haute visibilité, les protections auditives, les gants, et autres protections spécifiques.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Équipements de protection individuelle",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône EPI",
      },
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
      popup: {
        title: "Kit d'intervention d'urgence",
        description:
          "Nos équipes sont équipées de kits d'intervention d'urgence complets pour réagir rapidement et efficacement en cas d'incident. Ces kits sont régulièrement vérifiés et mis à jour selon les normes de sécurité en vigueur.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Kit d'intervention d'urgence",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône kit d'urgence",
      },
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
      popup: {
        title: "Déclaration d'Intention de Commencement de Travaux",
        description:
          "La DICT est une démarche obligatoire pour tous nos chantiers. Elle permet de prévenir les accidents en identifiant les réseaux souterrains et aériens présents sur la zone de travaux.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "DICT illustration",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône DICT",
      },
    },
  ];

  const qualificationsCards: CardData[] = [
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
      popup: {
        title: "Certificat d'Aptitude à la Conduite En Sécurité",
        description:
          "Le CACES est obligatoire pour nos opérateurs. Nous assurons des formations continues et des renouvellements réguliers pour garantir la sécurité sur nos chantiers.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Formation CACES",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône CACES",
      },
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
      popup: {
        title: "Autorisation d'Intervention à Proximité des Réseaux",
        description:
          "L'AIPR est une certification obligatoire pour tout intervenant à proximité des réseaux. Nos équipes sont formées et certifiées pour garantir la sécurité des interventions.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Formation AIPR",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône AIPR",
      },
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
      popup: {
        title: "Sauveteur Secouriste du Travail",
        description:
          "Nos équipes comptent des SST formés pour intervenir en cas d'accident. Cette formation est régulièrement mise à jour pour maintenir un haut niveau de compétence.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Formation SST",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône SST",
      },
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
      popup: {
        title: "Certification Amiante Sous-Section 4",
        description:
          "Cette certification permet d'intervenir sur des matériaux susceptibles de contenir de l'amiante. Nos équipes sont formées aux procédures spécifiques de sécurité.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Formation Amiante",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône Amiante",
      },
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
      popup: {
        title: "Formation Risque Chimique Niveau 1",
        description:
          "Cette formation permet d'identifier et de prévenir les risques liés aux produits chimiques. Nos équipes sont formées à la manipulation et au stockage sécurisé des produits.",
        imageSrc: "/assets/images/hero-cover.jpg",
        imageAlt: "Formation Risque Chimique",
        iconSrc: "/assets/images/logo-test.png",
        iconAlt: "Icône Risque Chimique",
      },
    },
  ];

  return (
    <section className={styles.rse}>
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
              La sécurité de nos équipes est une de nos priorités. Nous mettons
              en place des procédures rigoureuses, des équipements de protection
              adaptés à chaque type intervention et des formations continues.
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
                <React.Fragment key={card.text}>
                  <PartnersCard
                    {...card}
                    onClick={() => setActivePopup(card.text)}
                  />
                  <PartnersPopUp
                    isOpen={activePopup === card.text}
                    onClose={() => setActivePopup(null)}
                    title={card.popup.title}
                    description={card.popup.description}
                    imageSrc={card.popup.imageSrc}
                    imageAlt={card.popup.imageAlt}
                    iconSrc={card.popup.iconSrc}
                    iconAlt={card.popup.iconAlt}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className={styles.qualifications}>
            <h4 className={styles.qualificationsTitle}>Nos qualifications :</h4>
            <div className={styles.qualificationsCards}>
              {qualificationsCards.map((card) => (
                <React.Fragment key={card.text}>
                  <PartnersCard
                    {...card}
                    onClick={() => setActivePopup(card.text)}
                  />
                  <PartnersPopUp
                    isOpen={activePopup === card.text}
                    onClose={() => setActivePopup(null)}
                    title={card.popup.title}
                    description={card.popup.description}
                    imageSrc={card.popup.imageSrc}
                    imageAlt={card.popup.imageAlt}
                    iconSrc={card.popup.iconSrc}
                    iconAlt={card.popup.iconAlt}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSE;
