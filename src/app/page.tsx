export const revalidate = 3600;

import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";
import TAbout from "@/sections/About";
import TServices from "@/sections/Services";
import RSE from "@/sections/RSE";
import Machine from "@/sections/Machine";
import Footer from "@/sections/Footer";
import InfiniteLoop from "@/components/InfiniteLoop";

import type { HeroData } from "@/types/modules/hero";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import type { AboutData } from "@/types/modules/about";
import type { RSEModules } from "@/types/modules/rse";
import type { Machine as MachineType } from "@/types/modules/machine";
import type { ServicesSection } from "@/types/modules/services";
import type { ImageBreakSection } from "@/types/modules/imageBreak";
import type { Footer as FooterType } from "@/types/modules/footer";
import type { FaqData } from "@/types/modules/faq";

import {
  getHeroData,
  getTitleAboutData,
  getAboutData,
  getRSERelatedData,
  getMachineData,
  getServicesData,
  getImageBreakData,
  getFooterData,
  getFaqData,
} from "@/lib/prismic";
import TFAQ from "@/sections/Faq";

// Créer des valeurs par défaut typées
const defaultHeroData: HeroData = {
  title: "",
  description: "",
  button: { text: "", url: "", variant: "primary", showArrow: true },
};

const defaultTitleAboutData: TitleAboutData = {
  subtitle: "",
  highlight: "",
  mainText: "",
};

const defaultAboutData: AboutData = {
  mainImage: { url: "", alt: "", width: 0, height: 0 },
  skills: [],
};

const defaultRSEData: RSEModules = {
  rse_header: { tag_title: "", main_title: "" },
  rse_content: { description: "", method_note: "" },
  security_cards: [],
  qualifications_cards: [],
};

const defaultMachineData: MachineType = {
  machines_section_header: { tag_title: "", main_title: "" },
  machines: [],
};

const defaultServicesData: ServicesSection = {
  services_title: "",
  services: [],
};

const defaultImageBreakData: ImageBreakSection = {
  hero_about_break: {
    image: { ID: 0, id: 0, title: "", url: "", alt: "", width: 0, height: 0 },
    alt: "",
    params: { quality: 75, priority: true, parallax_strength: 0.1 },
  },
  services_rse_break: {
    image: { ID: 0, id: 0, title: "", url: "", alt: "", width: 0, height: 0 },
    alt: "",
    params: { quality: 75, priority: true, parallax_strength: 0.1 },
  },
};

const defaultFooterData: FooterType = {
  footer_card: {
    title: "",
    button: { text: "", url: "", variant: "primary", showArrow: true },
  },
  footer_info: { company: "", legal_links: [] },
};

const defaultFaqData: FaqData = {
  faq_title: "",
  faq_cover_image: "",
  faq_items: [],
};

async function fetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await fetchFn();
  } catch (error) {
    console.error("Error fetching data:", error);
    return fallback;
  }
}

export default async function Home() {
  const results = await Promise.allSettled([
    fetchWithFallback(getHeroData, defaultHeroData),
    fetchWithFallback(getTitleAboutData, defaultTitleAboutData),
    fetchWithFallback(getAboutData, defaultAboutData),
    fetchWithFallback(getRSERelatedData, defaultRSEData),
    fetchWithFallback(getMachineData, defaultMachineData),
    fetchWithFallback(getServicesData, defaultServicesData),
    fetchWithFallback(getImageBreakData, defaultImageBreakData),
    fetchWithFallback(getFooterData, defaultFooterData),
    fetchWithFallback(getFaqData, defaultFaqData),
  ]);

  const [
    heroData,
    titleAboutData,
    aboutData,
    rseData,
    machineData,
    servicesData,
    imageBreakData,
    footerData,
    faqData,
  ] = results.map((result) =>
    result.status === "fulfilled" ? result.value : result.reason,
  );

  // Image sous le hero : aussi rejouée dans la copie de fin de page (scroll infini)
  const hb = imageBreakData.hero_about_break;
  const heroBreak = {
    src: hb.image.url,
    alt: hb.alt,
    width: hb.image.width,
    height: hb.image.height,
    quality: hb.params.quality,
    priority: hb.params.priority,
    parallaxStrength: hb.params.parallax_strength,
  };

  return (
    <main>
      <ScrollProgress />

      <Header />
      {/* Contenu qui vibre pendant le forage. L'en-tête et la barre de progression restent
          hors de ce bloc : un transform sur un parent casserait leur position: fixed. */}
      <div id="page-content">
        <Hero data={heroData} />
        <ImageBreak {...heroBreak} />
        <TAbout titleAboutData={titleAboutData} aboutData={aboutData} />
        <TServices data={servicesData} />
        <ImageBreak
          showLogo
          src={imageBreakData.services_rse_break.image.url}
          alt={imageBreakData.services_rse_break.alt}
          width={imageBreakData.services_rse_break.image.width}
          height={imageBreakData.services_rse_break.image.height}
          quality={imageBreakData.services_rse_break.params.quality}
          priority={imageBreakData.services_rse_break.params.priority}
          parallaxStrength={
            imageBreakData.services_rse_break.params.parallax_strength
          }
        />
        <RSE data={rseData} />
        <Machine data={machineData} />
        <TFAQ data={faqData} />
        <InfiniteLoop
          footer={<Footer data={footerData} />}
          clone={
            <>
              <Hero data={heroData} clone />
              <ImageBreak {...heroBreak} clone />
            </>
          }
        />
      </div>
    </main>
  );
}
