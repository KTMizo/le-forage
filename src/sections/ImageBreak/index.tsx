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
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  quality = 85,
  priority = false,
  parallaxStrength = 0.1,
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
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (rect.top - windowHeight) * parallaxStrength;
        image.style.transform = `translateY(${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallaxStrength]);

  return (
    <section ref={containerRef} className={styles.imageWrapper}>
      <div
        ref={imageRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "120%",
          transform: "translateY(0)",
          willChange: "transform",
        }}>
        <Image
          className={styles.image}
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
        />
      </div>
    </section>
  );
};

export default ParallaxImage;
