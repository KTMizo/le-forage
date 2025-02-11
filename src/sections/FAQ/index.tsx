"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./Faq.module.css";
import ListAsk from "@/components/ListAsk";
import { FaqSectionProps, ACFFaqItem } from "@/types/modules/faq";

interface FaqItemWithState extends ACFFaqItem {
  isOpen: boolean;
}

const FAQ: React.FC<FaqSectionProps> = ({ data }) => {
  const [faqItems, setFaqItems] = useState<FaqItemWithState[]>(
    data.faq_items.map((item) => ({
      ...item,
      isOpen: false,
    }))
  );

  const handleToggle = (index: number) => {
    setFaqItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false,
      }))
    );
  };

  return (
    <section className={styles.faq}>
      <div className={styles.faqContent}>
        <div className={styles.subtitle}>
          <h2>{data.faq_title}</h2>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={data.faq_cover_image}
            alt={data.faq_title}
            fill
            sizes="(max-width: 100vw) 100vw, 50vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={styles.faqList}>
        {faqItems.map((item, index) => (
          <ListAsk
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={item.isOpen}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
