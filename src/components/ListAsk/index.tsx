// components/ListAsk/index.tsx
import React from "react";
import styles from "./Ask.module.css";

interface ListAskProps {
  question: string;
}

const ListAsk: React.FC<ListAskProps> = ({ question }) => {
  return (
    <div className={styles.container}>
      <div className={styles.questionItem}>
        <button className={styles.questionButton}>
          <span className={styles.questionText}>{question}</span>
          <div className={styles.readMoreWrapper}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              className={styles.toggleIcon}>
              <path
                d="M0 9.00052L16 9.00051M8 17.1485L8 0.852539"
                stroke="#AB2325"
                strokeWidth="2"
              />
            </svg>
            <span className={styles.readMore}>Lire plus</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ListAsk;
