import React, { useEffect, useRef } from "react";
import styles from "./Ask.module.css";
import { ListAskProps } from "@/types/modules/faq";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ListAsk: React.FC<ListAskProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const readMoreRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Split tous les textes
    const splitQuestion = new SplitType(questionRef.current!, {
      types: "lines",
      lineClass: "animated-line",
    });

    const splitReadMore = new SplitType(readMoreRef.current!, {
      types: "lines",
      lineClass: "animated-line",
    });

    // Animation pour tous les éléments
    const elements = containerRef.current.querySelectorAll(".animated-line");
    const line = lineRef.current;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        once: true,
      },
    });

    // Anime les textes
    timeline
      .fromTo(
        elements,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        }
      )
      // Anime la ligne
      .fromTo(
        line,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.5" // Commence l'animation de la ligne un peu avant la fin des textes
      );

    return () => {
      splitQuestion.revert();
      splitReadMore.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.questionItem}>
        {/* Ligne animée */}
        <div className={styles.animatedLine} ref={lineRef}></div>

        <button
          className={`${styles.questionButton} ${isOpen ? styles.open : ""}`}
          onClick={onToggle}
          type="button">
          <span className={styles.questionText} ref={questionRef}>
            {question}
          </span>
          <div className={styles.readMoreWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              className={`${styles.toggleIcon} ${isOpen ? styles.open : ""}`}>
              <path
                d="M0 9.00052L16 9.00051M8 17.1485L8 0.852539"
                stroke="#AB2325"
                strokeWidth="2"
              />
            </svg>
            <span className={styles.readMore} ref={readMoreRef}>
              {isOpen ? "Lire moins" : "Lire plus"}
            </span>
          </div>
        </button>
        <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>
          <div dangerouslySetInnerHTML={{ __html: answer }} />
        </div>
      </div>
    </div>
  );
};

export default ListAsk;
