// types/modules/legal.ts

export interface LegalSectionData {
  title: string;
  // HTML issu d'un champ texte riche Prismic
  content: string;
}

export interface LegalPageData {
  title: string;
  subtitle: string;
  sections: LegalSectionData[];
}
