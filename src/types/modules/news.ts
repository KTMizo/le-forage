export interface NewsImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface NewsArticle {
  uid: string;
  title: string;
  date: string; // AAAA-MM-JJ
  excerpt: string;
  cover: NewsImage | null;
  contentHTML: string;
  gallery: NewsImage[];
  linkedinUrl: string;
  metaTitle: string;
  metaDescription: string;
}
