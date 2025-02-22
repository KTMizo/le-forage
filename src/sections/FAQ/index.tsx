"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Faq.module.css";
import ListAsk from "@/components/ListAsk";
import { FaqSectionProps, ACFFaqItem } from "@/types/modules/faq";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqItemWithState extends ACFFaqItem {
  isOpen: boolean;
}

const FAQ: React.FC<FaqSectionProps> = ({ data }) => {
  const [faqItems, setFaqItems] = useState<FaqItemWithState[]>(
    data.faq_items.map((item) => ({
      ...item,
      isOpen: false,
    }))
  );

  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      // Split et anime le titre
      const splitTitle = new SplitType(titleRef.current, {
        types: "lines",
        lineClass: "animated-line",
      });

      gsap.fromTo(
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
        splitTitle.revert();
      };
    }
  }, []);

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

    const currentElement = imageWrapperRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const handleToggle = (index: number) => {
    setFaqItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false,
      }))
    );
  };

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.faqContent}>
        <div className={styles.subtitle}>
          <h2 ref={titleRef}>{data.faq_title}</h2>
        </div>
        <div
          ref={imageWrapperRef}
          className={`${styles.imageWrapper} ${
            isVisible ? styles.visible : ""
          }`}>
          <Image
            src={data.faq_cover_image}
            alt={data.faq_title}
            fill
            sizes="(max-width: 100vw) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <ListAsk
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={item.isOpen}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
