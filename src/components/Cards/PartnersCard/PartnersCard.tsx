// components/Cards/PartnersCard/PartnersCard.tsx

"use client";

import Image from "next/image";
import styles from "./PartnersCard.module.css";
import { useState } from "react";

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
    <button
      type="button"
      className={styles.card}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`Voir les détails de ${text}`}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 48}
            height={logo.height || 48}
            className={styles.logo}
          />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.text}>{text}</h3>
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
      <div className={styles.rightIcon}>
        <PlusIcon />
      </div>
    </button>
  );
};

export default PartnersCard;
