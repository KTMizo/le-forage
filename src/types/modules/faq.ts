// src/types/modules/faq.ts

export interface FaqData {
  faq_title: string;
  faq_cover_image: string;
  faq_items: FaqItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

// Types pour les composants React
export interface FaqSectionProps {
  data: FaqData;
}
