import React from "react";
import styles from "./TitleAbout.module.css"; // Assurez-vous que le chemin est correct

const TitleAbout = () => {
  return (
    <div className={styles.titleContent}>
      <div className={styles.subtitleWapper}>
        <h3 className={styles.subtitleAbout}>Qui sommes nous</h3>
      </div>
      <h2 className={styles.titleAbout}>
        Le Forage est votre partenaire spécialisé dans les sondages
        géotechniques et environnementaux. Grâce à une expertise reconnue et une
        expérience solide, nous offrons un savoir-faire unique pour explorer,
        analyser, et comprendre les différentes couches du sol.
      </h2>
    </div>
  );
};

export default TitleAbout;
