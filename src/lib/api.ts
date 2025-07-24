import type { WordPressPage } from "@/types/wordpress";
import type { HeroData } from "@/types/modules/hero";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import { Skill, AboutData } from "@/types/modules/about";
import { RSEModules } from "@/types/modules/rse";
import type { Footer } from "@/types/modules/footer";
import type { ACFFaqFields, ACFFaqItem } from "@/types/modules/faq";
import type {
  Machine,
  WordPressMachineRaw,
  WordPressMediaResponse,
} from "@/types/modules/machine";
import type { ServicesSection } from "@/types/modules/services";
import type {
  ImageBreakSection,
  ImageBreakData,
} from "@/types/modules/imageBreak";

// Define API URLs
const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || process.env.WORDPRESS_API_URL || 'https://demo.wp-api.org/wp-json/wp/v2';
const DISABLE_WORDPRESS = process.env.DISABLE_WORDPRESS === 'true';

// Ensure the WordPress API URL is defined (modified to not throw error)
if (!WP_API_URL && !DISABLE_WORDPRESS) {
  console.warn("WordPress API URL is not defined, using demo API");
}

// Helper function to fetch data from API
// 1. Modifier la fonction getPageData pour être plus robuste
async function getPageData(slug: string) {
  try {
    // Try multiple endpoints in sequence
    const endpoints = [
      `${WP_API_URL}/pages?slug=${slug}`,
      `${WP_API_URL}/posts?slug=${slug}`,
      `${WP_API_URL}/${slug}`,
    ];

    let data = null;

    for (const endpoint of endpoints) {
      data = await fetchFromAPI(endpoint);

      if (data) {
        // Handle both array and single object responses
        const pageData = Array.isArray(data) ? data[0] : data;

        if (pageData) {
          // Ensure ACF data exists
          if (!pageData.acf) {
            pageData.acf = {};
          }
          return pageData;
        }
      }
    }

    // If no data found, return a default structure instead of throwing
    console.warn(
      `No data found for slug: ${slug}, returning default structure`
    );
    return {
      title: { rendered: "" },
      content: { rendered: "" },
      acf: {},
    };
  } catch (error) {
    console.error(`Error in getPageData for slug ${slug}:`, error);
    // Return default structure instead of throwing
    return {
      title: { rendered: "" },
      content: { rendered: "" },
      acf: {},
    };
  }
}

// 2. Modifier la fonction fetchFromAPI pour gérer les erreurs plus gracieusement
async function fetchFromAPI(endpoint: string) {
  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WP_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      console.warn(
        `API request failed for ${endpoint}: ${res.status} ${res.statusText}`
      );
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from API: ${endpoint}`, error);
    return null;
  }
}

// 3. Modifier getImageUrl pour être plus robuste
async function getImageUrl(imageId: number): Promise<string> {
  try {
    if (!imageId) return "";

    const response = await fetch(`${WP_API_URL}/media/${imageId}`, {
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch image ${imageId}: ${response.status}`);
      return "";
    }

    const data = await response.json();
    return data.source_url || "";
  } catch (error) {
    console.error(`Error fetching image with ID ${imageId}:`, error);
    return "";
  }
}

// Fetch a WordPress page by slug
export async function getPage(slug: string): Promise<WordPressPage> {
  const url = `${WP_API_URL}/pages?slug=${slug}&_embed`;
  try {
    const data = await fetchFromAPI(url);
    if (!data?.[0]) {
      throw new Error(`Page with slug ${slug} not found`);
    }
    return data[0];
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    throw error;
  }
}

// Fetch hero data for the home page
export async function getHeroData(): Promise<HeroData> {
  const pageData = await getPageData("home");
  return {
    title: pageData.acf?.title || "Titre par défaut",
    description: pageData.acf?.description || "Description par défaut",
    button: {
      text: pageData.acf?.button?.text || "Demandez un devis",
      url: pageData.acf?.button?.url || "/destination",
      variant: pageData.acf?.button?.variant || "outline",
      showArrow: pageData.acf?.button?.showArrow ?? true,
    },
  };
}

// Fetch title about data for the home page
export async function getTitleAboutData(): Promise<TitleAboutData> {
  const pageData = await getPageData("home");
  return {
    subtitle: pageData.acf?.subtitle || "Qui sommes nous",
    highlight: pageData.acf?.highlight || "Le Forage",
    mainText: pageData.acf?.main_text || "...",
  };
}

// Fetch about data for the home page
export async function getAboutData(): Promise<AboutData> {
  try {
    const pageData = await getPageData("home");

    const aboutImageId = pageData?.acf?.about_image;
    const aboutSkills = pageData?.acf?.about_skills || [];

    const mainImageUrl = aboutImageId
      ? await getImageUrl(aboutImageId)
      : "/assets/images/about-cover.jpg";

    const skills = await Promise.all(
      aboutSkills.map(async (skill: Skill) => {
        const iconUrl = skill.icon
          ? await getImageUrl(Number(skill.icon))
          : "/assets/svg/Icones/default.svg";

        return {
          icon: iconUrl,
          title: skill.title || "Titre par défaut",
          description: skill.description || "Description par défaut",
        };
      })
    );

    return {
      mainImage: {
        url: mainImageUrl,
        alt: "Le Forage",
        width: 425,
        height: 530,
      },
      skills,
    };
  } catch (error) {
    console.error("Error in getAboutData:", error);
    // Return default data instead of throwing
    return {
      mainImage: {
        url: "/assets/images/about-cover.jpg",
        alt: "Le Forage",
        width: 425,
        height: 530,
      },
      skills: [],
    };
  }
}

// Interface for WordPress card data
interface WordPressCard {
  logo: number;
  text: string;
  tooltip_content: string;
  popup: {
    title: string;
    description: string;
    image: number;
    icon: number;
  };
}

// Fetch RSE related data for a given page slug
export async function getRSERelatedData(slug: string): Promise<RSEModules> {
  try {
    const pageData = await getPageData(slug);
    if (!pageData.acf) throw new Error("No RSE data found");

    const securityCards = await Promise.all(
      ((pageData.acf.security_cards as WordPressCard[]) || []).map(
        async (card) => {
          const logoUrl = await getImageUrl(Number(card.logo));
          return {
            logo: logoUrl || "/assets/svg/Icones/default.svg",
            text: card.text || "",
            tooltip_content: card.tooltip_content || "",
            popup: {
              title: card.popup?.title || "",
              description: card.popup?.description || "",
              image:
                (await getImageUrl(card.popup?.image)) ||
                "/assets/images/default.jpg",
              icon:
                (await getImageUrl(card.popup?.icon)) ||
                "/assets/svg/Icones/default.svg",
            },
          };
        }
      )
    );

    // Same treatment for qualificationsCards
    const qualificationsCards = await Promise.all(
      ((pageData.acf.qualifications_cards as WordPressCard[]) || []).map(
        async (card) => {
          const logoUrl = await getImageUrl(Number(card.logo));
          return {
            logo: logoUrl || "/assets/svg/Icones/default.svg",
            text: card.text || "",
            tooltip_content: card.tooltip_content || "",
            popup: {
              title: card.popup?.title || "",
              description: card.popup?.description || "",
              image:
                (await getImageUrl(card.popup?.image)) ||
                "/assets/images/default.jpg",
              icon:
                (await getImageUrl(card.popup?.icon)) ||
                "/assets/svg/Icones/default.svg",
            },
          };
        }
      )
    );

    return {
      rse_header: {
        tag_title: pageData.acf.rse_header?.tag_title || "RSE",
        main_title:
          pageData.acf.rse_header?.main_title ||
          "La sécurité, au cœur de nos chantiers",
      },
      rse_content: {
        description: pageData.acf.rse_content?.description || "",
        method_note: pageData.acf.rse_content?.method_note || "",
      },
      security_cards: securityCards,
      qualifications_cards: qualificationsCards,
    };
  } catch (error) {
    console.error("Error in getRSERelatedData:", error);
    throw error;
  }
}

// Fetch footer data for the home page
export async function getFooterData(): Promise<Footer> {
  try {
    const pageData = await getPageData("home");
    console.log("ACF Footer Data:", pageData.acf?.footer_card); // Debug log

    return {
      footer_card: {
        title:
          pageData.acf?.footer_card?.title ||
          "Contactez nos experts pour une évaluation rapide et précise de votre projet",
        button: {
          text: pageData.acf?.footer_card?.button?.text || "Demandez un devis",
          url: pageData.acf?.footer_card?.button?.url || "/destination",
          variant:
            pageData.acf?.footer_card?.button?.variant || "accent-outline", // Changed from 'style' to 'variant'
          showArrow: pageData.acf?.footer_card?.button?.showArrow ?? true,
        },
      },
      footer_info: {
        company: pageData.acf?.footer_info?.company || "Le Forage",
        legal_links: pageData.acf?.footer_info?.legal_links || [
          {
            text: "Protection des données",
            url: "/protection-donnees",
          },
          {
            text: "Mentions légales",
            url: "/mentions-legales",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching footer data:", error);
    return {
      footer_card: {
        title:
          "Contactez nos experts pour une évaluation rapide et précise de votre projet",
        button: {
          text: "Demandez un devis",
          url: "/destination",
          variant: "accent-outline", // Changed from 'style' to 'variant'
          showArrow: true,
        },
      },
      footer_info: {
        company: "Le Forage",
        legal_links: [
          {
            text: "Protection des données",
            url: "/protection-donnees",
          },
          {
            text: "Mentions légales",
            url: "/mentions-legales",
          },
        ],
      },
    };
  }
}

// Fetch FAQ data for a given page slug
export async function getFaqData(slug: string): Promise<ACFFaqFields> {
  try {
    const pageData = await getPageData(slug);
    if (!pageData.acf) throw new Error("No FAQ data found");

    return {
      faq_title: pageData.acf.faq_title || "FAQ",
      faq_cover_image:
        (await getImageUrl(pageData.acf.faq_cover_image)) ||
        "/assets/images/faq-cover.jpg",
      faq_items: Array.isArray(pageData.acf.faq_items)
        ? await Promise.all(
            pageData.acf.faq_items.map(async (item: ACFFaqItem) => ({
              question: item.question || "",
              answer: item.answer || "",
            }))
          )
        : [],
    };
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    throw error;
  }
}

export async function getMachineData(): Promise<Machine> {
  try {
    const pageData = await getPageData("home");

    // Récupération des machines avec résolution des images et fichiers
    const machines = await Promise.all(
      (pageData.acf?.machines || []).map(
        async (machine: WordPressMachineRaw) => {
          // Récupérer l'URL de l'image
          const imageUrl = await getImageUrl(machine.image);
          const imageResponse = await fetch(
            `${WP_API_URL}/media/${machine.image}`
          );
          const imageData: WordPressMediaResponse = await imageResponse.json();

          // Récupérer l'URL du PDF
          const pdfUrl = await getImageUrl(machine.technical_sheet);

          return {
            image: {
              ID: imageData.id,
              id: imageData.id,
              title: imageData.title?.rendered || "",
              url: imageUrl || "/assets/images/machine-default.jpg",
              alt: imageData.alt_text || "Machine",
              width: imageData.media_details?.width || 520,
              height: imageData.media_details?.height || 718,
            },
            title: machine.title,
            technical_sheet: pdfUrl || "#",
            boutton: {
              text: machine.button?.text || "Télécharger la fiche technique",
              url: pdfUrl || "#",
              variant: machine.button?.variant || "primary",
              showArrow: machine.button?.showArrow ?? true,
            },
          };
        }
      )
    );

    return {
      machines_section_header: {
        tag_title:
          pageData.acf?.machines_section_header?.tag_title || "NOS MACHINES",
        main_title:
          pageData.acf?.machines_section_header?.main_title ||
          "Aux services de vos projets",
      },
      machines,
    };
  } catch (error) {
    console.error("Error fetching machine data:", error);
    return {
      machines_section_header: {
        tag_title: "NOS MACHINES",
        main_title: "Aux services de vos projets",
      },
      machines: [],
    };
  }
}
// lib/api.ts
export async function getServicesData(): Promise<ServicesSection> {
  try {
    const pageData = await getPageData("home");
    const acfData = pageData.acf;

    const services = await Promise.all(
      (acfData?.services || []).map(
        async (service: {
          title: string;
          image: number;
          questions: Array<{ question: string }>;
        }) => {
          // Récupérer les données de l'image depuis WordPress
          const imageUrl = await getImageUrl(service.image);
          const imageResponse = await fetch(
            `${WP_API_URL}/media/${service.image}`
          );
          const imageData = await imageResponse.json();

          return {
            title: service.title || "",
            image: {
              ID: imageData.id || 0,
              id: imageData.id || 0,
              title: imageData.title?.rendered || "",
              url: imageUrl || "/assets/images/first-forage.jpg",
              alt: imageData.alt_text || service.title || "Service image",
              width: imageData.media_details?.width || 800,
              height: imageData.media_details?.height || 600,
            },
            questions:
              service.questions?.map((q) => ({
                question: q.question || "",
              })) || [],
          };
        }
      )
    );

    return {
      services_title: acfData?.services_title || "Nos services",
      services,
    };
  } catch (error) {
    console.error("Error fetching services data:", error);
    return {
      services_title: "Nos services",
      services: [],
    };
  }
}

// lib/api.ts
// lib/api.ts

interface WordPressImageBreakRaw {
  image: number;
  alt: string;
  params: {
    quality: number;
    priority: boolean;
    parallax_strength: number;
  };
}

export async function getImageBreakData(): Promise<ImageBreakSection> {
  try {
    const pageData = await getPageData("home");
    const acfData = pageData.acf;

    // Fonction helper pour traiter les données d'image
    const processImageBreakData = async (
      data: WordPressImageBreakRaw
    ): Promise<ImageBreakData> => {
      const imageUrl = await getImageUrl(data.image);
      const imageResponse = await fetch(`${WP_API_URL}/media/${data.image}`);
      const imageData = await imageResponse.json();

      return {
        image: {
          ID: imageData.id || 0,
          id: imageData.id || 0,
          title: imageData.title?.rendered || "",
          url: imageUrl || "/assets/images/default-break.jpg",
          alt: imageData.alt_text || data.alt || "Image de séparation",
          width: imageData.media_details?.width || 1920,
          height: imageData.media_details?.height || 1080,
        },
        alt: data.alt || "Image de séparation",
        params: {
          quality: data.params?.quality || 90,
          priority: data.params?.priority ?? true,
          parallax_strength: data.params?.parallax_strength || 0.1,
        },
      };
    };

    const heroAboutBreak = await processImageBreakData(
      acfData?.hero_about_break
    );
    const servicesRseBreak = await processImageBreakData(
      acfData?.services_rse_break
    );

    return {
      hero_about_break: heroAboutBreak,
      services_rse_break: servicesRseBreak,
    };
  } catch (error) {
    console.error("Error fetching image break data:", error);
    return {
      hero_about_break: {
        image: {
          ID: 0,
          id: 0,
          title: "",
          url: "/assets/images/hero-cover.jpg",
          alt: "Image de séparation",
          width: 1920,
          height: 1080,
        },
        alt: "Image de séparation",
        params: {
          quality: 90,
          priority: true,
          parallax_strength: 0.1,
        },
      },
      services_rse_break: {
        image: {
          ID: 0,
          id: 0,
          title: "",
          url: "/assets/images/separate.jpg",
          alt: "Image de séparation",
          width: 1920,
          height: 1080,
        },
        alt: "Image de séparation",
        params: {
          quality: 90,
          priority: true,
          parallax_strength: 0.1,
        },
      },
    };
  }
}
