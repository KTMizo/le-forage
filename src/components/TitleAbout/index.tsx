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
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 300ms ease-out'
      }}
    >
      <h2 style={{ 
        color: 'var(--bleu)', 
        fontSize: '20px', 
        fontFamily: 'bebas_neueregular', 
        textTransform: 'uppercase',
        marginBottom: '1rem'
      }}>
        {subtitle}
      </h2>
      <h1 style={{ 
        fontSize: 'clamp(32px, 5vw, 48px)', 
        lineHeight: '1.2',
        margin: 0
      }}>
        <span style={{ color: 'var(--rouge)' }}>{highlight}</span>{' '}
        <span style={{ color: 'var(--noir)' }}>{mainText}</span>
      </h1>
    </div>
  );
};

export default TitleAbout;