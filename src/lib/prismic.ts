// Source de contenu Prismic.
// Chaque fonction renvoie exactement la même forme de données que son
// équivalent WordPress dans src/lib/api.ts : les composants ne changent pas.
import { cache } from "react";
import {
  asHTML,
  isFilled,
  type ImageField,
  type RichTextField,
} from "@prismicio/client";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

import type { HeroData, ButtonVariant } from "@/types/modules/hero";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import type { AboutData } from "@/types/modules/about";
import type { RSECard, RSEModules } from "@/types/modules/rse";
import type { Footer } from "@/types/modules/footer";
import type { ACFFaqFields } from "@/types/modules/faq";
import type { Machine } from "@/types/modules/machine";
import type { ServiceImage, ServicesSection } from "@/types/modules/services";
import type {
  ImageBreakData,
  ImageBreakSection,
} from "@/types/modules/imageBreak";
import type { LegalPageData } from "@/types/modules/legal";

type HomeData = Content.HomeDocument["data"];
type CardItem = HomeData["security_cards"][number];

// Une seule requête par rendu, partagée entre toutes les sections
const getHome = cache(async (): Promise<HomeData> => {
  const page = await createClient().getSingle("home");
  return page.data;
});

const imageUrl = (field: ImageField, fallback: string): string =>
  isFilled.image(field) ? field.url : fallback;

const imageObject = (
  field: ImageField,
  fallback: { url: string; alt: string; width: number; height: number },
): ServiceImage => ({
  ID: 0,
  id: 0,
  title: "",
  url: isFilled.image(field) ? field.url : fallback.url,
  alt: field.alt || fallback.alt,
  width: field.dimensions?.width ?? fallback.width,
  height: field.dimensions?.height ?? fallback.height,
});

const richHTML = (field: RichTextField): string =>
  isFilled.richText(field) ? asHTML(field) : "";

const variant = (
  value: ButtonVariant | null | undefined,
  fallback: ButtonVariant,
): ButtonVariant => value || fallback;

export async function getHeroData(): Promise<HeroData> {
  const d = await getHome();
  return {
    title: d.hero_title || "Titre par défaut",
    description: d.hero_description || "Description par défaut",
    button: {
      text: d.hero_button_text || "Demandez un devis",
      url: d.hero_button_url || "/destination",
      variant: variant(d.hero_button_variant, "outline"),
      showArrow: d.hero_button_show_arrow,
    },
  };
}

export async function getTitleAboutData(): Promise<TitleAboutData> {
  const d = await getHome();
  return {
    subtitle: d.about_subtitle || "Qui sommes nous",
    highlight: d.about_highlight || "Le Forage",
    mainText: d.about_main_text || "...",
  };
}

export async function getAboutData(): Promise<AboutData> {
  const d = await getHome();
  return {
    mainImage: {
      url: imageUrl(d.about_image, "/assets/images/about-cover.jpg"),
      alt: "Le Forage",
      width: 425,
      height: 530,
    },
    skills: d.about_skills.map((skill) => ({
      icon: imageUrl(skill.icon, "/assets/svg/Icones/default.svg"),
      title: skill.title || "Titre par défaut",
      description: skill.description || "Description par défaut",
    })),
  };
}

const toRSECard = (card: CardItem): RSECard => ({
  logo: imageUrl(card.logo, "/assets/svg/Icones/default.svg"),
  text: card.text || "",
  tooltip_content: card.tooltip_content || "",
  popup: {
    title: card.popup_title || "",
    description: card.popup_description || "",
    image: imageUrl(card.popup_image, "/assets/images/default.jpg"),
    icon: imageUrl(card.popup_icon, "/assets/svg/Icones/default.svg"),
  },
});

export async function getRSERelatedData(): Promise<RSEModules> {
  const d = await getHome();
  return {
    rse_header: {
      tag_title: d.rse_tag_title || "RSE",
      main_title: d.rse_main_title || "La sécurité, au cœur de nos chantiers",
    },
    rse_content: {
      description: d.rse_description || "",
      method_note: d.rse_method_note || "",
    },
    security_cards: d.security_cards.map(toRSECard),
    qualifications_cards: d.qualifications_cards.map(toRSECard),
  };
}

export async function getFooterData(): Promise<Footer> {
  const d = await getHome();
  const legalLinks = d.legal_links
    .filter((link) => link.text && link.url)
    .map((link) => ({ text: link.text as string, url: link.url as string }));

  return {
    footer_card: {
      title:
        d.footer_title ||
        "Contactez nos experts pour une évaluation rapide et précise de votre projet",
      button: {
        text: d.footer_button_text || "Demandez un devis",
        url: d.footer_button_url || "/destination",
        variant: variant(d.footer_button_variant, "accent-outline"),
        showArrow: d.footer_button_show_arrow,
      },
    },
    footer_info: {
      company: d.footer_company || "Le Forage",
      legal_links: legalLinks.length
        ? legalLinks
        : [
            { text: "Protection des données", url: "/protection-donnees" },
            { text: "Mentions légales", url: "/mentions-legales" },
          ],
    },
  };
}

export async function getFaqData(): Promise<ACFFaqFields> {
  const d = await getHome();
  return {
    faq_title: d.faq_title || "FAQ",
    faq_cover_image: imageUrl(d.faq_cover_image, "/assets/images/faq-cover.jpg"),
    faq_items: d.faq_items.map((item) => ({
      question: item.question || "",
      answer: richHTML(item.answer),
    })),
  };
}

export async function getMachineData(): Promise<Machine> {
  const d = await getHome();
  return {
    machines_section_header: {
      tag_title: d.machines_tag_title || "NOS MACHINES",
      main_title: d.machines_main_title || "Aux services de vos projets",
    },
    machines: d.machines.map((machine) => {
      const pdfUrl = isFilled.linkToMedia(machine.technical_sheet)
        ? machine.technical_sheet.url
        : "#";
      return {
        image: imageObject(machine.image, {
          url: "/assets/images/machine-default.jpg",
          alt: "Machine",
          width: 520,
          height: 718,
        }),
        title: machine.title || "",
        technical_sheet: pdfUrl,
        boutton: {
          text: machine.button_text || "Télécharger la fiche technique",
          url: pdfUrl,
          variant: variant(machine.button_variant, "primary"),
          showArrow: machine.button_show_arrow,
        },
      };
    }),
  };
}

export async function getServicesData(): Promise<ServicesSection> {
  const d = await getHome();
  return {
    services_title: d.services_title || "Nos services",
    services: d.services.map((service) => ({
      title: service.title || "",
      image: imageObject(service.image, {
        url: "/assets/images/first-forage.jpg",
        alt: service.title || "Service image",
        width: 800,
        height: 600,
      }),
      questions: service.questions.map((q) => ({
        question: q.question || "",
        image: isFilled.image(q.image)
          ? imageObject(q.image, {
              url: "/assets/images/default-question.jpg",
              alt: q.question || "Image prestation",
              width: 800,
              height: 600,
            })
          : undefined,
        zone_de_texte: richHTML(q.text),
      })),
    })),
  };
}

export async function getImageBreakData(): Promise<ImageBreakSection> {
  const d = await getHome();

  const toImageBreak = (
    image: ImageField,
    quality: number | null,
    priority: boolean,
    parallaxStrength: number | null,
    fallbackUrl: string,
  ): ImageBreakData => {
    const alt = image.alt || "Image de séparation";
    return {
      image: imageObject(image, { url: fallbackUrl, alt, width: 1920, height: 1080 }),
      alt,
      params: {
        quality: quality || 90,
        priority,
        parallax_strength: parallaxStrength || 0.1,
      },
    };
  };

  return {
    hero_about_break: toImageBreak(
      d.hero_about_break_image,
      d.hero_about_break_quality,
      d.hero_about_break_priority,
      d.hero_about_break_parallax_strength,
      "/assets/images/hero-cover.jpg",
    ),
    services_rse_break: toImageBreak(
      d.services_rse_break_image,
      d.services_rse_break_quality,
      d.services_rse_break_priority,
      d.services_rse_break_parallax_strength,
      "/assets/images/separate.jpg",
    ),
  };
}

export async function getLegalPage(uid: string): Promise<LegalPageData> {
  const page = await createClient().getByUID("legal_page", uid);
  return {
    title: page.data.title || "",
    subtitle: page.data.subtitle || "",
    sections: page.data.sections
      .filter((section) => section.title)
      .map((section) => ({
        title: section.title as string,
        content: richHTML(section.content),
      })),
  };
}
