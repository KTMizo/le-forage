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
      lineClass: "animated-line inline-block",
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
      },
    );

    return () => {
      splitTitle.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full">
      <div className="grid grid-cols-8 lg:gap-y-22  relative bg-beige py-12  lg:pt-71 lg:pb-73 gap-y-12 lg:max-w-657 lg:h-250">
        <div className={styles.corner} id={styles.topLeft}></div>
        <div className={styles.corner} id={styles.topRight}></div>
        <div className={styles.corner} id={styles.bottomLeft}></div>
        <div className={styles.corner} id={styles.bottomRight}></div>
        <h2
          ref={titleRef}
          className="font-articulate text-xl lg:pl-37 lg:text-48 pl-12 col-start-1 lg:max-w-510 lg:min-h-60 lg:leading-30 col-span-7 overflow-hidden text-24 leading-18 inline-block"
        >
          {title}
        </h2>
        <div className="col-span-6  grid lg:flex gap-8 pl-12 lg:pl-37 col-start-1">
          <Button
            variant={button.variant}
            href={button.url}
            showArrow={button.showArrow}
          >
            {button.text}
          </Button>
          <Button variant="blue" href={button.url} showMap={button.showArrow}>
            Notre adresse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterCards;
