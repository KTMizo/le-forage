"use client";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import type { AboutData } from "@/types/modules/about";
import TitleAbout from "@/components/TitleAbout";
import Image from "next/image";

import React, { useRef, useEffect, useState } from "react";
import TAboutSkill from "@/components/t-about-skill";

interface AboutProps {
  titleAboutData: TitleAboutData;
  aboutData: AboutData;
}
export default function TAbout({ titleAboutData, aboutData }: AboutProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    const currentElement = imageRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  return (
    <section className="px-8 py-20 grid gap-y-20 lg:px-40 lg:gap-y-96 lg:py-44">
      <div className="grid gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-40">
        <TitleAbout
          subtitle={titleAboutData.subtitle}
          highlight={titleAboutData.highlight}
          mainText={titleAboutData.mainText}
        />
      </div>
      <div className="grid gap-y-16 lg:grid-cols-[auto_1fr] lg:gap-x-84">
        <figure
          ref={imageRef}
          className={`t-image-clip-path ${isVisible ? "is-visible" : ""}`}
        >
          <Image
            src={aboutData.mainImage.url || "/assets/images/about-cover.jpg"} // Assurez-vous d'avoir une image de secours
            alt={aboutData.mainImage.alt || "Image par défaut"}
            width={aboutData.mainImage.width || 425}
            height={aboutData.mainImage.height || 530}
            priority
            quality={85}
          />
        </figure>
        <div className="grid self-center">
          {aboutData.skills.map((skill, index) => (
            <TAboutSkill
              key={index}
              iconSrc={skill.icon}
              title={skill.title}
              description={skill.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
