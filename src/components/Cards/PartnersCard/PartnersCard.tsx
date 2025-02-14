"use client";

import Image from "next/image";
import styles from "./PartnersCard.module.css";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8L16 8M8 16L8 0" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface PartnersCardProps {
  logo: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  text: string;
  hasTooltip?: boolean;
  tooltipContent?: string;
  onClick?: () => void;
}

const PartnersCard = ({
  logo,
  text,
  hasTooltip = false,
  tooltipContent,
  onClick,
}: PartnersCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const cardWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Initial states
    gsap.set(cardWrapperRef.current, {
      clipPath: "inset(0 100% 0 0)",
      overflow: "visible",
    });

    gsap.set([logoRef.current, textRef.current, iconRef.current], {
      opacity: 0,
      y: 20,
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 90%",
        once: true,
      },
    });

    tl.to(cardWrapperRef.current, {
      clipPath: "inset(0 0% 0 0)",
      overflow: "visible",
      duration: 0.8,
      ease: "power4.inOut",
    })
      .to(
        logoRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(
        iconRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5"
      );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick?.();
  };

  const handleMouseEnter = () => {
    if (hasTooltip) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (hasTooltip) {
      setShowTooltip(false);
    }
  };

  return (
    <div className={styles.cardContainer} ref={cardWrapperRef}>
      <button
        ref={cardRef}
        type="button"
        className={styles.card}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={`Voir les détails de ${text}`}>
        <div className={styles.content}>
          <div className={styles.logoContainer} ref={logoRef}>
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 48}
              height={logo.height || 48}
              className={styles.logo}
            />
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.text} ref={textRef}>
              {text}
            </h3>
            {hasTooltip && (
              <div className={styles.tooltipIcon}>
                i
                {showTooltip && (
                  <div className={styles.tooltip}>{tooltipContent}</div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.rightIcon} ref={iconRef}>
          <PlusIcon />
        </div>
      </button>
    </div>
  );
};

export default PartnersCard;
