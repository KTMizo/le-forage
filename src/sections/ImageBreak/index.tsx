"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ImageBreak.module.css";

interface ParallaxImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
  parallaxStrength?: number;
  className?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  quality = 85,
  priority = false,
  parallaxStrength = 0.1,
  className = "",
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add(styles.reveal);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    const handleScroll = () => {
      if (window.innerWidth < 768) return; // Désactive l'effet parallax sur mobile

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (rect.top + windowHeight) * -parallaxStrength;
        image.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const handleResize = () => {
      if (window.innerWidth < 768) {
        image.style.transform = "translateY(0)";
      } else {
        handleScroll();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [parallaxStrength]);

  return (
    <section
      ref={containerRef}
      className={`${styles.imageWrapper} ${className}`}>
      <div ref={imageRef} className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default ParallaxImage;
