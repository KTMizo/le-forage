"use client";
import React, { useEffect, useRef } from "react";
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
  questions: readonly string[];
  imageSrc: string;
  index: number;
}

const ServiceSection: React.FC<ServiceSectionProps> = ({
  title,
  questions,
  index,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

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
  const servicesRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

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
  ] as const;

  useEffect(() => {
    const services = servicesRef.current;
    const imageContainer = imageContainerRef.current;
    const scrollContent = scrollContentRef.current;

    if (!services || !imageContainer || !scrollContent) return;

    const sections = [...scrollContent.children];
    const images = imagesRef.current.filter(
      (img): img is HTMLDivElement => img !== null
    );

    // Reset initial positions
    gsap.set(images, { yPercent: 100 });
    gsap.set(images[0], { yPercent: 0 });

    // Create timeline for image animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContent,
        start: "top top",
        end: () => `+=${scrollContent.offsetHeight - window.innerHeight}`,
        pin: imageContainer,
        pinSpacing: false,
        scrub: true,
        invalidateOnRefresh: true,
        markers: true,
      },
    });

    // Add animations for each section transition
    sections.forEach((_, index) => {
      if (index === 0) return; // Skip first section

      const triggerElement = sections[index];
      const prevImage = images[index - 1];
      const currentImage = images[index];

      if (!triggerElement || !prevImage || !currentImage) return;

      // Create a ScrollTrigger for each section transition
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(currentImage, {
            yPercent: 0,
            duration: 0.7,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to(currentImage, {
            yPercent: 100,
            duration: 0.7,
            ease: "power2.inOut",
          });
        },
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={servicesRef} className={styles.services}>
      <div className={styles.servicesTitle}>
        <h2 className={styles.title}>Nos services</h2>
      </div>
      <div className={styles.servicesContent}>
        <div ref={scrollContentRef} className={styles.scrollContent}>
          {services.map((service, index) => (
            <ServiceSection
              key={index}
              index={index}
              title={service.title}
              questions={service.questions}
              imageSrc={service.imageSrc}
            />
          ))}
        </div>
        <div ref={imageContainerRef} className={styles.fixedImageContainer}>
          <div className={styles.imageWrapper}>
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (imagesRef.current) {
                    imagesRef.current[index] = el;
                  }
                }}
                className={styles.imageSlide}>
                <Image
                  src={service.imageSrc}
                  alt={`Service ${service.title}`}
                  width={800}
                  height={600}
                  className={styles.servicesImage}
                  priority={index === 0}
                  quality={85}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
