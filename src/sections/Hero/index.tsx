"use client";

import React, { useEffect, useRef } from "react";
import { drillTo } from "@/lib/drill";
import styles from "./Hero.module.css";
import Button from "@/components/UI/Button";
import Fore from "@/components/Fore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

import { HeroData, ButtonVariant } from "@/types/modules/hero";

interface HeroProps {
  data: HeroData;
  // Copie affichée après le footer (scroll infini) : état final, sans animation ni foreuse
  clone?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC<HeroProps> = ({ data, clone = false }) => {
  const buttonVariant = (data?.button?.variant || "outline") as ButtonVariant;

  const buttonData = {
    variant: buttonVariant,
    text: data?.button?.text ?? "Demandez un devis",
    url: data?.button?.url ?? "/test",
    showArrow: data?.button?.showArrow ?? true,
  };

  const HeadingTag = clone ? "p" : "h1";

  // Refs pour les éléments animés
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (
      clone ||
      !titleRef.current ||
      !descriptionRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const tl = gsap.timeline();

    // Configuration de SplitType pour le titre
    const splitTitle = new SplitType(titleRef.current, {
      types: "words",
      wordClass: styles.animatedWord,
    });

    // Configuration de SplitType pour la description
    const splitDescription = new SplitType(descriptionRef.current, {
      types: "lines",
      lineClass: styles.animatedLine,
    });

    // Création des wrappers pour les lignes
    splitDescription.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.className = styles.lineWrapper;
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Rendre le conteneur visible avant l'animation
    gsap.set(containerRef.current, { visibility: "visible" });

    // Animation des mots du titre
    tl.fromTo(
      `.${styles.animatedWord}`,
      {
        y: 100,
        opacity: 1,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 2,
      }
    );

    // Animation des lignes de description
    tl.fromTo(
      `.${styles.animatedLine}`,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.9"
    );

    // Nettoyage des animations
    return () => {
      tl.kill();
      splitTitle.revert();
      splitDescription.revert();
    };
  }, [clone]);

  return (
    <>
      <section
        id={clone ? undefined : "hero"}
        data-hero-clone={clone || undefined}
        data-theme="red"
        aria-hidden={clone || undefined}
        inert={clone}
        ref={heroRef}
        className={`${styles.hero} ${clone ? styles.clone : ""}`}
      >
        {/* La copie reçoit la foreuse continue posée par InfiniteLoop */}
        {!clone && (
          <div className={styles.pattern}>
            <Fore />
          </div>
        )}
        <div
          ref={containerRef}
          className={styles.container}
          style={{ visibility: clone ? "visible" : "hidden" }}
        >
          <div className={styles.content}>
            <div className="grid gap-y-8 grid-cols-8 gap-x-4">
              <HeadingTag
                ref={titleRef}
                className="font-articulate text-beige lg:text-desk-xxl text-38 leading-20 lg:leading-40 col-start-1 col-span-6 overflow-hidden"
              >
                {data.title}
              </HeadingTag>
              <p
                ref={descriptionRef}
                className="col-start-1 col-span-7 text-s lg:text-desk-s lg:max-w-362 font-articulate text-beige"
              >
                {data.description}
              </p>
            </div>
            <Button
              variant={buttonData.variant}
              href={buttonData.url}
              showArrow={buttonData.showArrow}
            >
              {buttonData.text}
            </Button>
          </div>
          <div className={styles.footer}>
            <button
              onClick={() => drillTo("#a-propos")}
              className={styles.tag}
            >
              [Forer la page]
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;