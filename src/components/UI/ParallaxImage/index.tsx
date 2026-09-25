"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  // Amplitude du déplacement de l'image dans son cadre, en % de sa hauteur
  strength?: number;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  children?: React.ReactNode;
}

// Image dans un cadre fixe, qui glisse au scroll (scrub) : même effet partout sur le site.
export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  strength = 20,
  quality = 85,
  priority = false,
  sizes = "100vw",
  className = "",
  children,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frameRef.current || !innerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -strength / 2 },
        {
          yPercent: strength / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [strength]);

  return (
    <div ref={frameRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${strength / 2}%`, height: `${100 + strength}%` }}
      >
        <Image
          className="h-full w-full object-cover"
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          sizes={sizes}
        />
      </div>
      {children}
    </div>
  );
}
