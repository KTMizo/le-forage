// types/wordpress.ts
import type { MachinesSectionHeader, MachineItem } from "./modules/machine";

export interface WordPressSection {
  title: string;
  content: string;
}

export interface WordPressPage {
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf: WordPressACF;
}

export interface HeroSection {
  title: string;
  description: string;
}

export interface WordPressACF {
  subtitle: string;
  sections: WordPressSection[];
  hero: HeroSection;
  machines_section_header?: MachinesSectionHeader;
  machines?: MachineItem[];
}
