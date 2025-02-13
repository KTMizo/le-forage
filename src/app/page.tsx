import styles from "./page.module.css";
import Button from "@/components/UI/Button";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Menu from "@/components/UI/Menu";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";
import About from "@/sections/About";
import Services from "@/sections/Services";
import RSE from "@/sections/RSE";
import Machine from "@/sections/Machine";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";

import type { HeroData } from "@/types/modules/hero";
import type { TitleAboutData } from "@/types/modules/titleAbout";
import type { AboutData } from "@/types/modules/about";
import type { RSEModules } from "@/types/modules/rse";
import type { Machine as MachineType } from "@/types/modules/machine";
import type { ServicesSection } from "@/types/modules/services";
import type { ImageBreakSection } from "@/types/modules/imageBreak";
import type { Footer as FooterType } from "@/types/modules/footer";
import type { ACFFaqFields } from "@/types/modules/faq";

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
} from "@/lib/api";

export const revalidate = 10;

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

const defaultFaqData: ACFFaqFields = {
  faq_title: "",
  faq_cover_image: "",
  faq_items: [],
};

async function fetchWithFallback<T>(
  fetchFn: () => Promise<T>,
  fallback: T
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
    fetchWithFallback(() => getRSERelatedData("home"), defaultRSEData),
    fetchWithFallback(getMachineData, defaultMachineData),
    fetchWithFallback(getServicesData, defaultServicesData),
    fetchWithFallback(getImageBreakData, defaultImageBreakData),
    fetchWithFallback(getFooterData, defaultFooterData),
    fetchWithFallback(() => getFaqData("home"), defaultFaqData),
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
    result.status === "fulfilled" ? result.value : result.reason
  );

  return (
    <main className={styles.main}>
      <ScrollProgress />
      <div className={styles.nav}>
        <Nav />
      </div>
      <div className={styles.contact}>
        <Button variant="primary" href="/destination">
          Nous contacter
        </Button>
      </div>
      <div className={styles.menu}>
        <Menu />
      </div>
      <Hero data={heroData} />
      <ImageBreak
        src={imageBreakData.hero_about_break.image.url}
        alt={imageBreakData.hero_about_break.alt}
        width={imageBreakData.hero_about_break.image.width}
        height={imageBreakData.hero_about_break.image.height}
        quality={imageBreakData.hero_about_break.params.quality}
        priority={imageBreakData.hero_about_break.params.priority}
        parallaxStrength={
          imageBreakData.hero_about_break.params.parallax_strength
        }
      />
      <About titleAboutData={titleAboutData} aboutData={aboutData} />
      <Services data={servicesData} />
      <ImageBreak
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
      <FAQ data={faqData} />
      <Footer data={footerData} />
    </main>
  );
}
