import Image from "next/image";
import React, { useRef, useEffect } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
type CardProps = {
  iconSrc: string;
  title: string;
  description: string;
};
export default function TAboutSkill({
  iconSrc,
  title,
  description,
}: CardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current || !cardRef.current)
      return;

    // Animation d'opacité pour le titre
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      },
    );

    // Animation d'opacité pour la description
    gsap.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
          once: true,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <article
      ref={cardRef}
      className="py-12 grid lg:py-20 gap-y-8 border-t border-black-10 lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-10 lg:justify-between"
    >
      <div className="flex items-center gap-x-8 lg:gap-x-12 lg:min-w-[18rem] ">
        <figure className="bg-bleu grid items-center justify-center rounded-3 w-16 h-16 lg:rounded-5 lg:w-25 lg:h-25">
          <Image
            src={iconSrc || "/assets/svg/Icones/default.svg"}
            alt={title}
            width="520"
            height="520"
            className="w-10 h-10 lg:w-15 lg:h-15"
          />
        </figure>
        <h3
          ref={titleRef}
          className="text-18  block lg:text-24 lg:leading-none font-bebas  uppercase text-bleu"
        >
          {title}
        </h3>
      </div>
      <div className="max-w-[42rem] lg:w-full inline-grid justify-self-end">
        <p
          ref={descriptionRef}
          className="font-articulate text-xs lg:text-desk-xs"
        >
          {description}
        </p>
      </div>
    </article>
  );
}
