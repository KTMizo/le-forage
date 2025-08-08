import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Ask.module.css";
import { ListAskProps } from "@/types/modules/faq";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExtendedListAskProps extends ListAskProps {
  displayMode?: "inline" | "modal";
  onClose?: () => void;
  // ✅ Nouveaux props pour image et texte
  questionImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  questionText?: string;
}

const ListAsk: React.FC<ExtendedListAskProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
  displayMode = "inline",
  onClose,
  questionImage, // ✅ Image de la prestation
  questionText,  // ✅ Texte de la prestation
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLSpanElement>(null);
  const readMoreRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const splitQuestion = new SplitType(questionRef.current!, {
      types: "lines",
      lineClass: "animated-line",
    });

    const splitReadMore = new SplitType(readMoreRef.current!, {
      types: "lines",
      lineClass: "animated-line",
    });

    const elements = containerRef.current.querySelectorAll(".animated-line");
    const line = lineRef.current;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
        once: true,
      },
    });

    timeline
      .fromTo(
        elements,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" },
      )
      .fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power4.out" },
        "-=0.5",
      );

    return () => {
      splitQuestion.revert();
      splitReadMore.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animation pour le modal
  useEffect(() => {
    if (displayMode === "modal" && modalRef.current) {
      if (isOpen) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "power2.out" },
        );
      }
    }
  }, [isOpen, displayMode]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={`${styles.questionItem} ${
          isOpen ? styles.hasOpenAnswer : ""
        }`}
      >
        <div className={styles.animatedLine} ref={lineRef}></div>

        <button
          className={`${styles.questionButton} ${isOpen ? styles.open : ""}`}
          onClick={onToggle}
          type="button"
        >
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
              className={`${styles.toggleIcon} ${isOpen ? styles.open : ""}`}
            >
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

        {displayMode === "inline" && (
          <div className={`${styles.answer} ${isOpen ? styles.open : ""}`}>
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        )}

        {displayMode === "modal" && isOpen && (
          <div className={styles.modal} ref={modalRef}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={onClose}>
                <X size={24} />
              </button>
              
              <h2>{question}</h2>
              
              {/* ✅ Affichage de l'image si présente */}
              {questionImage && (
                <div className={styles.modalImage}>
                  <Image
                    src={questionImage.url}
                    alt={questionImage.alt}
                    width={questionImage.width}
                    height={questionImage.height}
                    style={{ 
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "1.5rem"
                    }}
                    priority
                  />
                </div>
              )}
              
              {/* ✅ Affichage du texte de la prestation */}
              {questionText && (
                <div 
                  className={styles.modalText}
                  dangerouslySetInnerHTML={{ __html: questionText }} 
                />
              )}
              
              {/* Texte answer original (si présent) */}
              {answer && (
                <div dangerouslySetInnerHTML={{ __html: answer }} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAsk;