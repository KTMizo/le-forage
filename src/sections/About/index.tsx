import React from "react";
import Image from "next/image";
import styles from "./About.module.css";
import TitleAbout from "@/components/TitleAbout";
import AboutSkill from "@/components/Cards/AboutCards/AboutSkill";

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutTitle}>
        <TitleAbout />
      </div>
      <div className={styles.aboutContent}>
        <Image
          className={styles.aboutImage}
          src="/assets/images/about-cover.jpg"
          alt="Le Forage"
          width={425}
          height={530}
          priority
          quality={85}
        />
        <div className={styles.aboutCards}>
          <AboutSkill
            iconSrc="/assets/svg/Icones/expertise-et-savoir-faire.svg"
            title="EXPERTISE ET SAVOIR-FAIRE"
            description="Une équipe qualifiée et expérimentée, appliquant des méthodes fiables pour intervenir dans différents environnements, y compris les plus complexes."
          />
          <AboutSkill
            iconSrc="/assets/svg/Icones/securite-et-qualite.svg"
            title="SÉCURITÉ ET QUALITÉ"
            description="Le respect des normes de sécurité et des protocoles de qualité est une priorité, assurant la protection des équipes, des clients et de l'environnement."
          />
          <AboutSkill
            iconSrc="/assets/svg/Icones/technologie-de-pointe.svg"
            title="TECHNOLOGIE DE POINTE"
            description="Des outils modernes et des technologies récentes sont intégrés à nos prestations pour garantir des résultats précis et adaptés aux spécificités de chaque projet."
          />
          <AboutSkill
            iconSrc="/assets/svg/Icones/reactivite.svg"
            title="RÉACTIVITÉ"
            description="Grâce à une organisation optimisée, nous répondons rapidement aux besoins de nos clients, en assurant un suivi rigoureux et des délais respectés."
          />
        </div>
      </div>
    </section>
  );
};

export default About;
