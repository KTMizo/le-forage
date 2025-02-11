// types/modules/machine.ts

import type { WordPressACF } from "@/types/wordpress";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-accent"
  | "accent-outline";

export interface MachineImage {
  ID: number;
  id: number;
  title: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface MachineButton {
  text: string;
  url: string;
  variant: ButtonVariant;
  showArrow: boolean;
  target?: string; // Ajoutez cette ligne
}

export interface MachineItem {
  image: MachineImage;
  title: string;
  technical_sheet: string;
  boutton: MachineButton;
}

export interface MachinesSectionHeader {
  tag_title: string;
  main_title: string;
}

export interface Machine {
  machines_section_header: MachinesSectionHeader;
  machines: MachineItem[];
}

// Extend WordPressACF interface
export interface MachineACF extends WordPressACF {
  machines_section_header: MachinesSectionHeader;
  machines: MachineItem[];
}

export interface WordPressMachineRaw {
  image: number;
  title: string;
  technical_sheet: number;
  button: {
    text: string;
    url: string;
    variant: ButtonVariant;
    showArrow: boolean;
  };
}

export interface WordPressMediaResponse {
  id: number;
  title: {
    rendered: string;
  };
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
}
