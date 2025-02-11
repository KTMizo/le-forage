"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ListAsk from "@/components/ListAsk";
import styles from "./Services.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServicesSection } from "@/types/modules/services";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceSectionProps {
  title: string;
  questions: { question: string }[];
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
          {questions.map((item, idx) => (
            <ListAsk
              key={`${index}-${idx}`}
              question={item.question}
              answer=""
              isOpen={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ServicesProps {
  data: ServicesSection;
}

const Services: React.FC<ServicesProps> = ({ data }) => {
  const servicesRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

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
          // Scale up de l'image précédente pendant que la nouvelle arrive
          if (index > 0) {
            gsap.to(images[index - 1], {
              scale: 1.3,
              duration: 0.7,
              ease: "power2.inOut",
            });
          }
          // Animation normale de l'image courante qui monte
          gsap.to(currentImage, {
            yPercent: 0,
            duration: 0.7,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          // Retour à la normale pour l'image précédente
          if (index > 0) {
            gsap.to(images[index - 1], {
              scale: 1,
              duration: 0.7,
              ease: "power2.inOut",
            });
          }
          // Animation normale de l'image courante qui descend
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
        <h2 className={styles.title}>{data.services_title}</h2>
      </div>
      <div className={styles.servicesContent}>
        <div ref={scrollContentRef} className={styles.scrollContent}>
          {data.services.map((service, index) => (
            <ServiceSection
              key={index}
              index={index}
              title={service.title}
              questions={service.questions}
            />
          ))}
        </div>
        <div ref={imageContainerRef} className={styles.fixedImageContainer}>
          <div className={styles.imageWrapper}>
            {data.services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (imagesRef.current) {
                    imagesRef.current[index] = el;
                  }
                }}
                className={styles.imageSlide}>
                <Image
                  src={service.image.url}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
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
