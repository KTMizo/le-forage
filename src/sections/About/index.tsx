"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./About.module.css";
import TitleAbout from "@/components/TitleAbout";
import AboutSkill from "@/components/Cards/AboutCards/AboutSkill";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import type { AboutData } from "@/types/modules/about";

interface AboutProps {
  titleAboutData: TitleAboutData;
  aboutData: AboutData;
}

const About: React.FC<AboutProps> = ({ titleAboutData, aboutData }) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const currentElement = imageRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <section id="a-propos" className={styles.about}>
      <div className={styles.aboutTitle}>
        <TitleAbout
          subtitle={titleAboutData.subtitle}
          highlight={titleAboutData.highlight}
          mainText={titleAboutData.mainText}
        />
      </div>
      <div className={styles.aboutContent}>
        <div
          ref={imageRef}
          className={`${styles.aboutImageContainer} ${
            isVisible ? styles.visible : ""
          }`}>
          <Image
            className={styles.aboutImage}
            src={aboutData.mainImage.url || "/assets/images/about-cover.jpg"} // Assurez-vous d'avoir une image de secours
            alt={aboutData.mainImage.alt || "Image par défaut"}
            width={aboutData.mainImage.width || 425}
            height={aboutData.mainImage.height || 530}
            priority
            quality={85}
          />
        </div>
        <div className={styles.aboutCards}>
          {aboutData.skills.map((skill, index) => (
            <AboutSkill
              key={index}
              iconSrc={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
