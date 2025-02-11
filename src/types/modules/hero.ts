// src/types/modules/hero.ts

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-accent"
  | "accent-outline";

export type HeroButton = {
  text: string;
  url: string;
  variant: ButtonVariant;
  showArrow: boolean;
};

// Dans un fichier de types, par exemple types/modules/hero.ts

// src/types/modules/hero.ts
export interface HeroData {
  title: string;
  description: string;
  button: {
    text: string;
    url: string;
    variant: ButtonVariant; // Modifier ici de 'string' à 'ButtonVariant'
    showArrow: boolean;
  };
}

export interface HeroProps {
  data: HeroData;
}
