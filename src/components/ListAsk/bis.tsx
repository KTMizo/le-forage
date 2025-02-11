// components/ListAsk/index.tsx
import React from "react";
import styles from "./Ask.module.css";
import { ListAskProps } from "@/types/modules/faq";

const ListAsk: React.FC<ListAskProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionItem}>
        <button
          className={`${styles.questionButton} ${isOpen ? styles.open : ""}`}
          onClick={onToggle}
          type="button">
          <span className={styles.questionText}>{question}</span>
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
            <span className={styles.readMore}>
              {isOpen ? "Lire moins" : "Lire plus"}
            </span>
          </div>
        </button>
        {isOpen && (
          <div className={styles.answer}>
            <div dangerouslySetInnerHTML={{ __html: answer }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAsk;
