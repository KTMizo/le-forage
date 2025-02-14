"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import ListAsk from "@/components/ListAsk";
import styles from "./Services.module.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import type { ServicesSection } from "@/types/modules/services";
import SplitType from "split-type";

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
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (!titleRef.current) return;

    const splitTitle = new SplitType(titleRef.current, {
      types: "lines",
      lineClass: "animated-line",
    });

    const animation = gsap.fromTo(
      titleRef.current.querySelectorAll(".animated-line"),
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
          trigger: titleRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      if (splitTitle) splitTitle.revert();
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={styles.contentSection}
      data-section={`section-${index}`}>
      <div className={styles.textContent}>
        <div className={styles.sectionTitle}>
          <h3 ref={titleRef}>{title}</h3>
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
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const lineDecorRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (!mainTitleRef.current) return;

    const splitMainTitle = new SplitType(mainTitleRef.current, {
      types: "lines",
      lineClass: "animated-line",
    });

    const animation = gsap.fromTo(
      mainTitleRef.current.querySelectorAll(".animated-line"),
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
          trigger: mainTitleRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      if (splitMainTitle) splitMainTitle.revert();
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const services = servicesRef.current;
    const imageContainer = imageContainerRef.current;
    const scrollContent = scrollContentRef.current;

    if (!services || !imageContainer || !scrollContent) return;

    const sections = [...scrollContent.children];
    const images = imagesRef.current.filter(
      (img): img is HTMLDivElement => img !== null
    );

    gsap.set(images, { yPercent: 100 });
    gsap.set(images[0], { yPercent: 0 });

    const containerTrigger = ScrollTrigger.create({
      trigger: scrollContent,
      start: "top top",
      end: () => `+=${scrollContent.offsetHeight - window.innerHeight}`,
      pin: imageContainer,
      pinSpacing: false,
      scrub: true,
      invalidateOnRefresh: true,
    });

    const sectionTriggers = sections.slice(1).map((section, index) => {
      const prevImage = images[index];
      const currentImage = images[index + 1];

      if (!prevImage || !currentImage) return null;

      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(prevImage, {
            scale: 1.3,
            duration: 0.7,
            ease: "power2.inOut",
          });
          gsap.to(currentImage, {
            yPercent: 0,
            duration: 0.7,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          gsap.to(prevImage, {
            scale: 1,
            duration: 0.7,
            ease: "power2.inOut",
          });
          gsap.to(currentImage, {
            yPercent: 100,
            duration: 0.7,
            ease: "power2.inOut",
          });
        },
      });
    });

    return () => {
      if (containerTrigger) containerTrigger.kill();
      sectionTriggers.forEach((trigger) => trigger?.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const services = servicesRef.current;
    const lineDecor = lineDecorRef.current;

    if (!services || !lineDecor) return;

    gsap.to(lineDecor, {
      y: `${services.offsetHeight - 146}px`,
      ease: "none",
      scrollTrigger: {
        trigger: services,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={servicesRef} className={styles.services}>
      {/* Placer votre SVG ici */}
      <svg
        ref={lineDecorRef}
        className={styles.lineDecoration}
        width="32"
        height="32"
        viewBox="0 0 146 146"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_4296_6513)">
          <path
            d="M143.6 2H2V143.6H143.6V2Z"
            fill="#F9F1EA"
            stroke="#C7C1BB"
            strokeWidth="3.9"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M40.8998 96.8C39.8998 98.1 40.8998 100 42.5998 99.7C45.1998 99.3 47.6998 98.7 50.1998 98.1C51.2998 97.8 52.3998 97.5 53.3998 97.2V114.5C54.4998 114.1 55.5998 113.7 56.5998 113.4C59.7998 112.4 62.8998 111.6 65.6998 111C69.2998 110.3 72.3998 109.9 74.2998 109.8L63.0998 116.3C54.5998 121.2 47.0998 127.6 40.8998 135.2C39.8998 136.5 40.8998 138.4 42.5998 138.1C45.1998 137.7 47.6998 137.1 50.1998 136.5C51.2998 136.2 52.3998 135.9 53.3998 135.6V141.9H50.1998V139.8C47.8998 140.4 45.4998 140.9 43.0998 141.3C38.4998 142 35.4998 136.7 38.3998 133.2C43.3998 127.1 49.1998 121.7 55.6998 117.2C55.2998 117.3 54.9998 117.5 54.5998 117.6L50.1998 119.3V101.6C47.8998 102.2 45.4998 102.7 43.0998 103.1C38.4998 103.8 35.4998 98.5 38.3998 95C43.3998 88.9 49.1998 83.5 55.6998 79C55.2998 79.1 54.9998 79.3 54.5998 79.4L50.1998 81.1V63.3C47.8998 63.9 45.4998 64.4 43.0998 64.8C38.4998 65.5 35.4998 60.2 38.3998 56.7C43.3998 50.6 49.1998 45.2 55.6998 40.7C55.2998 40.8 54.9998 41 54.5998 41.1L50.1998 42.8V25.3C47.8998 25.9 45.4998 26.4 43.0998 26.8C38.4998 27.5 35.4998 22.2 38.3998 18.7C43.3998 12.6 49.1998 7.2 55.6998 2.7C55.2998 2.8 54.9998 3 54.5998 3.1L50.1998 4.8V2H62.1998C54.0998 6.8 46.8998 13 40.8998 20.4C39.8998 21.7 40.8998 23.6 42.5998 23.3C45.1998 22.9 47.6998 22.3 50.1998 21.7C51.2998 21.4 52.3998 21.1 53.3998 20.8V37.9C54.4998 37.5 55.5998 37.1 56.5998 36.8C59.7998 35.8 62.8998 35 65.6998 34.4C69.2998 33.7 72.3998 33.3 74.2998 33.2L63.0998 39.7C54.5998 44.6 47.0998 51 40.8998 58.6C39.8998 59.9 40.8998 61.8 42.5998 61.5C45.1998 61.1 47.6998 60.5 50.1998 59.9C51.2998 59.6 52.3998 59.3 53.3998 59V76.3C54.4998 75.9 55.5998 75.5 56.5998 75.2C59.7998 74.2 62.8998 73.4 65.6998 72.8C69.2998 72.1 72.3998 71.7 74.2998 71.6L63.0998 78.1C54.5998 83 47.0998 89.4 40.8998 97V96.8Z"
            fill="#C7C1BB"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.6999 114.2V135.5C99.2999 135.1 100.9 134.8 102.5 134.6C106.7 133.9 109.7 138.4 107.7 141.9H103.6C103.9 141.5 104.3 141.1 104.6 140.7C105.6 139.4 104.6 137.5 102.9 137.8C101.1 138.1 99.2999 138.4 97.5999 138.8C96.4999 139 95.4999 139.3 94.3999 139.6V112.7C98.0999 109.5 101.5 106 104.6 102.3C105.6 101 104.6 99.1 102.9 99.4C101.1 99.7 99.2999 100 97.5999 100.4C96.4999 100.6 95.3999 100.9 94.3999 101.2V74.3C98.0999 71.1 101.5 67.6 104.6 63.8C105.6 62.5 104.6 60.6 102.9 60.9C101.1 61.2 99.2999 61.5 97.5999 61.9C96.4999 62.1 95.3999 62.4 94.3999 62.7V35.8C96.4999 34 98.5999 32.1 100.5 30C101.5 29 102.5 27.9 103.4 26.8H103.6C103.9 26.4 104.3 26 104.6 25.6C105.6 24.3 104.6 22.4 102.9 22.7C101.1 23 99.2999 23.3 97.5999 23.7C96.4999 23.9 95.4999 24.2 94.3999 24.5V2H97.5999V20.7C99.1999 20.3 100.8 20 102.4 19.8C106.6 19.1 109.6 23.6 107.6 27.1L105.8 29.2C103.2 32.2 100.5 35 97.4999 37.6V58.9C99.0999 58.5 100.7 58.2 102.3 58C106.9 57.3 109.9 62.6 107 66.1C104.1 69.7 100.9 73 97.4999 76V97.3C99.0999 96.9 100.7 96.6 102.3 96.4C106.9 95.7 109.9 101 107 104.5C104.1 108.1 100.9 111.4 97.4999 114.4L97.6999 114.2Z"
            fill="#C7C1BB"
          />
        </g>
        <defs>
          <clipPath id="clip0_4296_6513">
            <rect width="145.6" height="145.6" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.servicesTitle}>
        <h2 className={styles.title} ref={mainTitleRef}>
          {data.services_title}
        </h2>
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
