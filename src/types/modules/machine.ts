// types/modules/machine.ts

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
