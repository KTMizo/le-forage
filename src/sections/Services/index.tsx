"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ListAsk from "@/components/ListAsk";
import styles from "./Services.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceSectionProps {
  title: string;
  questions: string[];
  imageSrc: string;
  setActiveImage: (src: string) => void;
  index: number;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  questions,
  imageSrc,
  setActiveImage,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActiveImage(imageSrc),
      onEnterBack: () => setActiveImage(imageSrc),
      markers: false, // Aide au débug si nécessaire
    });

    return () => {
      trigger.kill();
    };
  }, [imageSrc, setActiveImage]);

  return (
    <div
      ref={sectionRef}
      className={styles.contentSection}
      data-section={`section-${index}`}>
      <div className={styles.textContent}>
        <div className={styles.sectionTitle}>
          <h3>{title}</h3>
        </div>
        <div className={styles.sectionDescription}>
          {questions.map((question, idx) => (
            <ListAsk key={`${index}-${idx}`} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [activeImage, setActiveImage] = useState(
    "/assets/images/first-forage.jpg"
  );
  const servicesRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!servicesRef.current || !imageContainerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const mainTrigger = ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: imageContainerRef.current,
        pinSpacing: false,
        pinType: "fixed",
        anticipatePin: 1,
      });

      return () => {
        mainTrigger.kill();
      };
    });

    return () => {
      mm.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const services = [
    {
      title: "Forage géotechniques",
      questions: [
        "Sondage pressiométrique",
        "Sondage carotté",
        "Sondage destructif instrumenté",
        "Sondage à la Tarière",
        "Pénétromètre dynamique",
        "Pénétromètre statique",
      ],
      imageSrc: "/assets/images/first-forage.jpg",
    },
    {
      title: "Forage environnementaux",
      questions: [
        "Sondage pressiométrique",
        "Sondage carotté",
        "Sondage destructif instrumenté",
      ],
      imageSrc: "/assets/images/forage-environnementaux.jpg",
    },
    {
      title: "Essais d'eau",
      questions: [
        "Sondage pressiométrique",
        "Sondage carotté",
        "Sondage destructif instrumenté",
      ],
      imageSrc: "/assets/images/forage-geotechniques.jpg",
    },
  ];

  return (
    <section ref={servicesRef} className={styles.services}>
      <div className={styles.servicesTitle}>
        <h2 className={styles.title}>Nos services</h2>
      </div>
      <div className={styles.servicesContent}>
        <div className={styles.scrollContent}>
          {services.map((service, index) => (
            <ServiceSection
              key={index}
              index={index}
              title={service.title}
              questions={service.questions}
              imageSrc={service.imageSrc}
              setActiveImage={setActiveImage}
            />
          ))}
        </div>
        <div ref={imageContainerRef} className={styles.fixedImageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={activeImage}
              alt="Service illustration"
              width={800}
              height={600}
              className={styles.servicesImage}
              priority
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
