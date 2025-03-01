"use client";
// components/Cards/FooterCards/FooterCards.tsx
import React, { useRef, useEffect } from "react";
import styles from "./FooterCards.module.css";
import Button from "@/components/UI/Button";
import { ButtonVariant } from "@/types/modules/footer"; // Assurez-vous que le chemin est correct
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ButtonProps {
  variant: ButtonVariant; // Assumer que ButtonVariant est importé correctement
  url: string;
  showArrow: boolean;
  text: string; // Cette prop est inutile si vous utilisez des enfants (children)
}

interface FooterCardsProps {
  title: string;
  button: ButtonProps;
}

const FooterCards: React.FC<FooterCardsProps> = ({ title, button }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const splitTitle = new SplitType(titleRef.current, {
      types: "lines",
      lineClass: "animated-line",
    });

    // Animation du titre
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
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      splitTitle.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.corner} id={styles.topLeft}></div>
        <div className={styles.corner} id={styles.topRight}></div>
        <div className={styles.corner} id={styles.bottomLeft}></div>
        <div className={styles.corner} id={styles.bottomRight}></div>
        <h2 ref={titleRef} className={styles.title}>
          {title}
        </h2>
        <Button
          variant={button.variant}
          href={button.url}
          showArrow={button.showArrow}>
          {button.text}
        </Button>
      </div>
    </div>
  );
};

export default FooterCards;
