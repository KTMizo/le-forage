"use client";

import React, { useEffect, useRef } from "react";
import ParallaxImage from "@/components/UI/ParallaxImage";
import LogoMark from "@/components/UI/LogoMark";
import styles from "./ImageBreak.module.css";
import type { ImageBreakData } from "@/types/modules/imageBreak";

interface ImageBreakProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality: number;
  priority: boolean;
  parallaxStrength: number;
  className?: string;
}

const ImageBreak: React.FC<ImageBreakProps> & {
  fromData: (data: ImageBreakData) => ImageBreakProps;
} = ({
  src,
  alt,
  width = 1920,
  height = 1080,
  quality = 85,
  priority = false,
  parallaxStrength = 0.1,
  className = "",
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Rideau beige qui se lève à l'entrée dans l'écran
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add(styles.reveal);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      data-theme="dark"
      className={`${styles.imageWrapper} ${className}`}
    >
      {/* parallax_strength (Prismic, 0.1 par défaut) = amplitude de 20 % de la hauteur */}
      <ParallaxImage
        className="h-full w-full"
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        strength={parallaxStrength * 200}
      />
      <LogoMark className={styles.logo} />
    </section>
  );
};

// Static method to create an ImageBreak from ImageBreakData
ImageBreak.fromData = (data: ImageBreakData) => {
  return {
    src: data.image.url,
    alt: data.alt,
    width: data.image.width,
    height: data.image.height,
    quality: data.params.quality,
    priority: data.params.priority,
    parallaxStrength: data.params.parallax_strength,
  };
};

export default ImageBreak;
