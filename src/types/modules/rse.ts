// types/modules/rse.ts

export interface RSEPopup {
  title: string;
  description: string;
  image: string; // URL de l'image après traitement
  icon: string; // URL de l'icône après traitement
}

// types/modules/rse.ts

export interface RSECard {
  logo: string;
  text: string;
  tooltip_content: string;
  popup: {
    title: string;
    description: string;
    image: string;
    icon: string;
  };
}
export interface RSEModules {
  rse_header: {
    tag_title: string;
    main_title: string;
  };
  rse_content: {
    description: string;
    method_note: string;
  };
  security_cards: RSECard[];
  qualifications_cards: RSECard[];
}
