"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { TitleAboutData } from "@/types/modules/titleAbout";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const TitleAbout: React.FC<TitleAboutData> = ({
  subtitle,
  highlight,
  mainText,
}) => {
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!subtitleRef.current || !titleRef.current) return;

    const splitSubtitle = SplitText.create(subtitleRef.current, {
      type: "lines,words",
      //mask: "lines",
      wordsClass: "inline!",
      linesClass: "inline!", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });

    const splitTitle = SplitText.create(".textrnormal", {
      type: "lines,words",
      //mask: "lines",
      wordsClass: "inline!",
      linesClass: "inline!", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });
    const splitTitleRed = SplitText.create(".textred", {
      type: "lines,words",
      wordsClass: "inline!",
      linesClass: "inline!",
      //mask: "lines", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
      //linesClass: "indent-0", // adds extra wrapper element around lines with overflow: clip (v3.13.0+)
    });
    console.log(splitSubtitle);

    // Attendre que les éléments soient dans le DOM
    // THOMAS
    requestAnimationFrame(() => {
      // Animation du sous-titre
      gsap.fromTo(
        splitSubtitle.words,
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "bottom bottom",
            end: "bottom center",
            id: "animation 1",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );

      // THOMAS
      // Animation de l'opacité du texte principal au scroll
      gsap.fromTo(
        [splitTitle.words, splitTitleRed.words],
        {
          opacity: 0.2,
        },
        {
          opacity: 1,
          stagger: {
            each: 0.1,
            amount: 1,
            from: "random",
          },
          scrollTrigger: {
            trigger: titleRef.current,
            start: "bottom bottom",
            end: "bottom center",
            scrub: true,
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      //splitTitle.revert();
      //ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="grid gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-40">
      <h3
        ref={subtitleRef}
        className="text-tag   lg:text-desk-tag uppercase font-bebas text-bleu"
      >
        {subtitle}
      </h3>
      <h2
        id="test"
        ref={titleRef}
        className="text-black  font-articulate text-m lg:text-desk-m lg:indent-[9.375rem] lg:max-w-657"
      >
        <span className="text-red textred inline">{highlight}&nbsp;</span>
        <span className="textrnormal inline"> {mainText}</span>
      </h2>
    </div>
  );
};

export default TitleAbout;
