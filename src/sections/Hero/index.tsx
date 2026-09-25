"use client";

import React, { useEffect, useRef } from "react";
import { drillTo } from "@/lib/drill";
import styles from "./Hero.module.css";
import Button from "@/components/UI/Button";
import Fore from "@/components/Fore";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

import { HeroData, ButtonVariant } from "@/types/modules/hero";

interface HeroProps {
  data: HeroData;
  // Copie affichée après le footer (scroll infini) : état final, sans animation ni foreuse
  clone?: boolean;
}

gsap.registerPlugin(SplitText);

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

    const tl = gsap.timeline({ delay: 2 }); // après le loader

    // Titre : mot par mot dans un masque ; description : ligne par ligne
    const splitTitle = SplitText.create(titleRef.current, {
      type: "words",
      mask: "words",
    });
    const splitDescription = SplitText.create(descriptionRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.set(containerRef.current, { visibility: "visible" });

    tl.from(splitTitle.words, {
      yPercent: 100,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    }).from(
      splitDescription.lines,
      {
        yPercent: 100,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.9",
    );

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
            <button onClick={() => drillTo("#a-propos")} className={styles.tag}>
              [Forer la page]
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
