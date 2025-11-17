// components/Cards/PartnersPopUp/PartnersPopUp.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./PartnersPopUp.module.css";

interface PartnersPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  iconSrc: string;
  iconAlt: string;
}

export default function PartnersPopUp({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  title,
  description,
  imageSrc,
  imageAlt,
  iconSrc,
  iconAlt,
}: PartnersPopUpProps): React.ReactNode {
  // Bloquer le scroll du body quand la popup est ouverte
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position de scroll actuelle
      const scrollY = window.scrollY;

      // Bloquer le scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        // Restaurer le scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Restaurer la position de scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Empêcher la propagation du clic sur le popup
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={handlePopupClick}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer">
          ×
        </button>

        <div className={styles.contentWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={600}
              height={400}
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.textContent}>
            <div className={styles.iconContainer}>
              <Image
                src={iconSrc}
                alt={iconAlt}
                width={50}
                height={50}
                className={styles.icon}
              />
            </div>

            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>

            <div className={styles.navigation}>
              {onPrevious && (
                <button
                  onClick={onPrevious}
                  className={styles.navButton}
                  aria-label="Précédent">
                  ←
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className={styles.navButton}
                  aria-label="Suivant">
                  →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
