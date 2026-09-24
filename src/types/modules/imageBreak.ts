// types/modules/imageBreak.ts

export interface ImageBreakParams {
  quality: number;
  priority: boolean;
  parallax_strength: number;
}

export interface ImageBreakData {
  image: {
    ID: number;
    id: number;
    title: string;
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  alt: string;
  params: ImageBreakParams;
}

export interface ImageBreakSection {
  hero_about_break: ImageBreakData;
  services_rse_break: ImageBreakData;
}
