// types/modules/about.ts

export interface Skill {
  icon: string;
  title: string;
  description: string;
}

export interface AboutImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface AboutData {
  mainImage: AboutImage;
  skills: Skill[];
}
