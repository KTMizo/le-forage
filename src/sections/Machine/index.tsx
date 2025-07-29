"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Machine.module.css";
import MachineCard from "@/components/Cards/MachineCard/MachineCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { Machine as MachineType } from "@/types/modules/machine";
import SplitType from "split-type";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const defaultData: MachineType = {
  machines_section_header: {
    tag_title: "NOS MACHINES",
    main_title: "Aux services de vos projets",
  },
  machines: [
    {
      image: {
        ID: 1,
        id: 1,
        title: "Machine de forage E 4.50",
        url: "/assets/images/machines/machinetest.png",
        alt: "Machine de forage E 4.50",
        width: 520,
        height: 718,
      },
      title: "E 4.50 - Machine de forage",
      technical_sheet: "/fiches-techniques/e450.pdf",
      boutton: {
        text: "Télécharger la fiche technique",
        url: "/fiches-techniques/e450.pdf",
        variant: "primary",
        showArrow: true,
      },
    },
  ],
};

interface MachineProps {
  data?: MachineType;
}

const Machine = ({ data = defaultData }: MachineProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tagTitleRef = useRef<HTMLSpanElement>(null);
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  // Slider state
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalMachines = data.machines.length;
  const maxPositions = Math.max(1, totalMachines - 1); // Minimum 1 position
  const slideWidth = 50; // 50vw per slide

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Text animations
  useEffect(() => {
    const textElements = [
      { ref: tagTitleRef, start: "top 90%" },
      { ref: mainTitleRef, start: "top 90%" },
    ];

    textElements.forEach(({ ref, start }) => {
      if (!ref.current) return;

      const splitText = new SplitType(ref.current, {
        types: "lines",
        lineClass: "animated-line",
      });

      gsap.fromTo(
        ref.current.querySelectorAll(".animated-line"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ref.current,
            start,
            once: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Slider position update
  const updateSliderPosition = useCallback((position: number, smooth: boolean = true) => {
    if (!containerRef.current) return;

    const translateX = -position * slideWidth;
    
    if (smooth) {
      gsap.to(containerRef.current, {
        x: `${translateX}vw`,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setIsTransitioning(false),
      });
    } else {
      gsap.set(containerRef.current, { x: `${translateX}vw` });
    }
  }, [slideWidth]);

  // Navigation functions
  const goToPosition = useCallback((position: number) => {
    if (isTransitioning || totalMachines <= 1) return;
    
    // Ensure position is within bounds
    const validPosition = ((position % maxPositions) + maxPositions) % maxPositions;
    
    setIsTransitioning(true);
    setCurrentPosition(validPosition);
    updateSliderPosition(validPosition);
  }, [isTransitioning, updateSliderPosition, maxPositions, totalMachines]);

  const nextSlide = useCallback(() => {
    if (totalMachines <= 1) return;
    const nextPosition = (currentPosition + 1) % maxPositions;
    goToPosition(nextPosition);
  }, [currentPosition, maxPositions, goToPosition, totalMachines]);

  const prevSlide = useCallback(() => {
    if (totalMachines <= 1) return;
    const prevPosition = currentPosition === 0 ? maxPositions - 1 : currentPosition - 1;
    goToPosition(prevPosition);
  }, [currentPosition, maxPositions, goToPosition, totalMachines]);

  // Touch/Mouse handlers
  const handleStart = useCallback((clientX: number) => {
    if (isTransitioning || totalMachines <= 1) return;
    
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
    
    if (containerRef.current) {
      gsap.killTweensOf(containerRef.current);
    }
  }, [isTransitioning, totalMachines]);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !containerRef.current || totalMachines <= 1) return;
    
    setCurrentX(clientX);
    const deltaX = clientX - startX;
    const currentTranslateX = -currentPosition * slideWidth;
    const newTranslateX = currentTranslateX + (deltaX / window.innerWidth) * 100;
    
    gsap.set(containerRef.current, { x: `${newTranslateX}vw` });
  }, [isDragging, startX, currentPosition, slideWidth, totalMachines]);

  const handleEnd = useCallback(() => {
    if (!isDragging || totalMachines <= 1) return;
    
    setIsDragging(false);
    const deltaX = currentX - startX;
    const threshold = window.innerWidth * 0.1; // 10% threshold
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Snap back to current position
      updateSliderPosition(currentPosition);
    }
  }, [isDragging, currentX, startX, currentPosition, prevSlide, nextSlide, updateSliderPosition, totalMachines]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Initialize slider position
  useEffect(() => {
    updateSliderPosition(0, false);
  }, [updateSliderPosition]);

  return (
    <section id="machines" ref={sectionRef} className={styles.section}>
      {/* Header */}
      <div className={styles.sectionHeader}>
        <span className={styles.tagTitle} ref={tagTitleRef}>
          {data.machines_section_header.tag_title}
        </span>
        <h2 className={styles.mainTitle} ref={mainTitleRef}>
          {data.machines_section_header.main_title}
        </h2>
      </div>

      {/* Slider */}
      <div className={styles.sliderWrapper}>
        <div
          ref={sliderRef}
          className={styles.slider}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={containerRef} 
            className={styles.slidesContainer}
            style={{
              width: `${maxPositions * slideWidth}vw`
            }}
          >
            {data.machines.map((machine, index) => (
              <div key={index} className={styles.slide}>
                <MachineCard
                  image={machine.image}
                  title={machine.title}
                  technical_sheet={machine.technical_sheet}
                  boutton={machine.boutton}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {totalMachines > 1 && (
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${styles.navPrev}`}
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Slide précédent"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`${styles.navButton} ${styles.navNext}`}
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Slide suivant"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Machine;