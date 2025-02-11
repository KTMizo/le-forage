// src/types/modules/faq.ts

// Types pour les données brutes d'ACF
export interface ACFFaqFields {
  faq_title: string;
  faq_cover_image: string;
  faq_items: ACFFaqItem[];
}

export interface ACFFaqItem {
  question: string;
  answer: string;
}

// Types pour les composants React
export interface FaqSectionProps {
  data: ACFFaqFields;
}

export interface ListAskProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}
