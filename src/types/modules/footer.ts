// Supposant que FooterType est défini quelque part dans vos types
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-accent"
  | "accent-outline";

export interface FooterCard {
  title: string;
  button: {
    text: string;
    url: string;
    variant: ButtonVariant;
    showArrow: boolean;
  };
}

export interface FooterType {
  footer_card: FooterCard;
  footer_info: {
    company: string;
    legal_links: Array<{ text: string; url: string }>;
  };
}

export interface FooterInfo {
  company: string;
  legal_links: {
    text: string;
    url: string;
  }[];
}

export interface Footer {
  footer_card: FooterCard;
  footer_info: FooterInfo;
}

export interface ACFFooter {
  acf: Footer;
}
