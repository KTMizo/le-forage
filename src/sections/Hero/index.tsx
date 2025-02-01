import React from "react";
import Image from "next/image";
import styles from "./Hero.module.css";
import Button from "@/components/UI/Button";
import Fore from "@/components/Fore";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <Image
            src="/assets/svg/Logo/logo.svg"
            alt="Le Forage Logo"
            width={350}
            height={160}
            priority
          />
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.contentText}>
            <h1 className={styles.title}>{`L'art de sonder le sol`}</h1>

            <p className={styles.description}>
              {`Nous accompagnons de nombreux bureaux d'études géotechniques et environnementaux dans la réussite de leurs projets.`}
            </p>
          </div>
          <Button variant="outline" href="/destination" showArrow>
            Demandez un devis
          </Button>
        </div>
        <div className={styles.pattern}>
          <Fore />
        </div>

        {/* Footer Text */}
        <div className={styles.footer}>
          <span className={styles.tag}>[FORER LA PAGE]</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
