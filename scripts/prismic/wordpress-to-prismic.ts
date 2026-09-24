/**
 * Construit la migration WordPress → Prismic à partir de l'export JSON
 * (migration/wordpress-export/). Rien n'est envoyé ici : voir migrate.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createMigration, type RichTextField } from "@prismicio/client";

const LANG = "fr-fr";
const EXPORT_DIR = join(process.cwd(), "migration", "wordpress-export");

// ---------------------------------------------------------------------------
// Lecture de l'export WordPress (format ACF "standard" : médias résolus)
// ---------------------------------------------------------------------------

type WPImage = { id: number; url: string; alt?: string; filename?: string };
type WPMedia = { id: number; source_url: string; alt_text?: string };
type WPButton = { text?: string; url?: string; variant?: string; showArrow?: boolean };
type WPCard = {
  logo: WPImage | false;
  text: string;
  tooltip_content: string;
  popup: { title: string; description: string; image: WPImage | false; icon: WPImage | false };
};

const readJSON = <T>(file: string): T =>
  JSON.parse(readFileSync(join(EXPORT_DIR, file), "utf8")) as T;

/* eslint-disable @typescript-eslint/no-explicit-any */
const home = readJSON<any[]>("page-home.json")[0].acf;
const mediaLibrary = new Map(
  readJSON<WPMedia[]>("media.json").map((m) => [m.id, m]),
);
export const legalPages = ["mentions-legales", "protection-donnees"].map(
  (slug) => readJSON<any[]>(`page-${slug}.json`)[0],
);
/* eslint-enable @typescript-eslint/no-explicit-any */

// ---------------------------------------------------------------------------
// Conversion des champs
// ---------------------------------------------------------------------------

export const migration = createMigration();
export const assetURLs = new Set<string>();

const decodeEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&rsquo;/g, "’");

// Texte brut ou HTML simple (<p>) → texte riche Prismic (un paragraphe par bloc)
const toRichText = (value: unknown): RichTextField => {
  if (typeof value !== "string" || !value.trim()) return [];
  const blocks = value
    .replace(/<\/p>\s*/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\n\s*\n/)
    .map((block) => decodeEntities(block).trim())
    .filter(Boolean);
  return blocks.map((text) => ({ type: "paragraph", text, spans: [] })) as RichTextField;
};

const text = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const number = (value: unknown): number | null => {
  const n = Number(value);
  return value === "" || value == null || Number.isNaN(n) ? null : n;
};

const variant = (value: unknown) => {
  const allowed = ["primary", "secondary", "outline", "outline-accent", "accent-outline"] as const;
  return allowed.find((v) => v === value) ?? "primary";
};

const filenameOf = (url: string) => decodeURIComponent(url.split("?")[0].split("/").pop() || "fichier");

const asset = (url: string, alt?: string) => {
  assetURLs.add(url);
  return migration.createAsset(url, filenameOf(url), { alt: alt || undefined });
};

// Image ACF : objet (format standard), ID numérique, URL, ou false si vide
const image = (value: unknown) => {
  if (!value) return {};
  if (typeof value === "number") {
    const media = mediaLibrary.get(value);
    return media ? asset(media.source_url, media.alt_text) : {};
  }
  if (typeof value === "string") return asset(value);
  const img = value as WPImage;
  return img.url ? asset(img.url, img.alt) : {};
};

const pdf = (value: unknown) => {
  const url = typeof value === "string" ? value : (value as WPImage | null)?.url;
  return url ? { link_type: "Media" as const, id: asset(url) } : { link_type: "Media" as const };
};

const card = (c: WPCard) => ({
  logo: image(c.logo),
  text: text(c.text),
  tooltip_content: text(c.tooltip_content),
  popup_title: text(c.popup?.title),
  popup_description: text(c.popup?.description),
  popup_image: image(c.popup?.image),
  popup_icon: image(c.popup?.icon),
});

const button = (b: WPButton | undefined) => ({
  text: text(b?.text),
  url: text(b?.url),
  variant: variant(b?.variant),
  show_arrow: b?.showArrow ?? true,
});

// ---------------------------------------------------------------------------
// Document "home"
// ---------------------------------------------------------------------------

const heroButton = button(home.button);
const footerButton = button(home.footer_card?.button);

const homeData = {
  // Hero
  hero_title: text(home.title),
  hero_description: text(home.description),
  hero_button_text: heroButton.text,
  hero_button_url: heroButton.url,
  hero_button_variant: heroButton.variant,
  hero_button_show_arrow: heroButton.show_arrow,

  // Images de séparation
  hero_about_break_image: image(home.hero_about_break?.image),
  hero_about_break_quality: number(home.hero_about_break?.params?.quality),
  hero_about_break_priority: home.hero_about_break?.params?.priority ?? true,
  hero_about_break_parallax_strength: number(home.hero_about_break?.params?.parallax_strength),
  services_rse_break_image: image(home.services_rse_break?.image),
  services_rse_break_quality: number(home.services_rse_break?.params?.quality),
  services_rse_break_priority: home.services_rse_break?.params?.priority ?? true,
  services_rse_break_parallax_strength: number(home.services_rse_break?.params?.parallax_strength),

  // À propos
  about_subtitle: text(home.subtitle),
  about_highlight: text(home.highlight),
  about_main_text: text(home.main_text),
  about_image: image(home.about_image),
  about_skills: (home.about_skills || []).map(
    (s: { icon: unknown; title: string; description: string }) => ({
      icon: image(s.icon),
      title: text(s.title),
      description: text(s.description),
    }),
  ),

  // Services
  services_title: text(home.services_title),
  services: (home.services || []).map(
    (s: {
      title: string;
      image: unknown;
      questions?: { question: string; img: unknown; zone_de_texte: string }[];
    }) => ({
      title: text(s.title),
      image: image(s.image),
      questions: (s.questions || []).map((q) => ({
        question: text(q.question),
        image: image(q.img),
        text: toRichText(q.zone_de_texte),
      })),
    }),
  ),

  // RSE
  rse_tag_title: text(home.rse_header?.tag_title),
  rse_main_title: text(home.rse_header?.main_title),
  rse_description: text(home.rse_content?.description),
  rse_method_note: text(home.rse_content?.method_note),
  security_cards: (home.security_cards || []).map(card),
  qualifications_cards: (home.qualifications_cards || []).map(card),

  // Machines
  machines_tag_title: text(home.machines_section_header?.tag_title),
  machines_main_title: text(home.machines_section_header?.main_title),
  machines: (home.machines || []).map(
    (m: { image: unknown; title: string; technical_sheet: unknown; button?: WPButton }) => {
      const b = button(m.button);
      return {
        image: image(m.image),
        title: text(m.title),
        technical_sheet: pdf(m.technical_sheet),
        // Le champ "url" WordPress contenait le libellé : seul le texte est repris
        button_text: b.text,
        button_variant: b.variant,
        button_show_arrow: b.show_arrow,
      };
    },
  ),

  // FAQ
  faq_title: text(home.faq_title),
  faq_cover_image: image(home.faq_cover_image),
  faq_items: (home.faq_items || []).map((f: { question: string; answer: string }) => ({
    question: text(f.question),
    answer: toRichText(f.answer),
  })),

  // Footer
  footer_title: text(home.footer_card?.title),
  footer_button_text: footerButton.text,
  footer_button_url: footerButton.url,
  footer_button_variant: footerButton.variant,
  footer_button_show_arrow: footerButton.show_arrow,
  footer_company: text(home.footer_info?.company),
  legal_links: (home.footer_info?.legal_links || []).map((l: { text: string; url: string }) => ({
    text: text(l.text),
    url: text(l.url),
  })),
};

migration.createDocument(
  // Les champs médias sont résolus par l'API Migration au moment de l'envoi
  { type: "home", lang: LANG, uid: null, tags: [], data: homeData } as never,
  "Accueil",
);

// ---------------------------------------------------------------------------
// Documents "legal_page"
// ---------------------------------------------------------------------------

for (const page of legalPages) {
  const acf = page.acf || {};
  migration.createDocument(
    {
      type: "legal_page",
      uid: page.slug,
      lang: LANG,
      tags: [],
      data: {
        title: text(page.title?.rendered),
        // "subtile" : faute de frappe du champ ACF sur protection-donnees
        subtitle: text(acf.subtitle ?? acf.subtile),
        sections: (acf.sections || []).map((s: { title: string; content: string }) => ({
          title: text(s.title),
          content: toRichText(s.content),
        })),
      },
    } as never,
    text(page.title?.rendered) || page.slug,
  );
}
