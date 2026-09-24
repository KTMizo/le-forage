// types/modules/legal.ts

export interface LegalSectionData {
  title: string;
  // HTML (texte riche Prismic, ou texte WordPress échappé)
  content: string;
}

export interface LegalPageData {
  title: string;
  subtitle: string;
  sections: LegalSectionData[];
}
