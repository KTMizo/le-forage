import React, { useEffect, useRef, useState } from "react";
import type { TitleAboutData } from "@/types/modules/titleAbout";

const TitleAbout: React.FC<TitleAboutData> = ({
  subtitle,
  highlight,
  mainText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div className="grid gap-y-8 lg:grid-cols-[auto_1fr] lg:gap-x-40">
      <h3
        className="text-tag lg:text-desk-tag uppercase font-bebas text-bleu"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 300ms ease-out' }}
      >
        {subtitle}
      </h3>
      <h2
        ref={containerRef}
        className="text-black font-articulate text-m lg:text-desk-m lg:indent-[9.375rem] lg:max-w-657"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 300ms ease-out' }}
      >
        <span className="text-red inline">{highlight}&nbsp;</span>
        <span className="inline">{mainText}</span>
      </h2>
    </div>
  );
};

export default TitleAbout;
