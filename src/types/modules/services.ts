// types/modules/services.ts
import type { WordPressACF } from "@/types/wordpress";

export interface ServiceImage {
  ID: number;
  id: number;
  title: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface ServiceQuestion {
  question: string;
  image?: ServiceImage; // ✅ Image optionnelle pour chaque question
  zone_de_texte?: string; // ✅ Texte optionnel pour chaque question
}

export interface Service {
  title: string;
  image: ServiceImage;
  questions: ServiceQuestion[];
}

export interface ServicesSection {
  services_title: string;
  services: Service[];
}

// Types pour l'ACF
export interface ServicesACF extends WordPressACF {
  services_title: string;
  services: Service[];
}