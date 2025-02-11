import styles from "./page.module.css";

import Button from "@/components/UI/Button";
import Nav from "@/components/Nav";
import ScrollProgress from "@/components/ScrollProgress";
import Loader from "@/components/Loader";
import Menu from "@/components/UI/Menu";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";
import About from "@/sections/About";
import Services from "@/sections/Services";
import RSE from "@/sections/RSE";
import Machine from "@/sections/Machine";
import FAQ from "@/sections/FAQ";
import Footer from "@/sections/Footer";
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

export const revalidate = 60; // Revalidate every hour

export default async function Home() {
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
  ] = await Promise.all([
    getHeroData(),
    getTitleAboutData(),
    getAboutData(),
    getRSERelatedData("home"),
    getMachineData(),
    getServicesData(),
    getImageBreakData(),
    getFooterData(),
    getFaqData("home"),
  ]);

  return (
    <main className={styles.main}>
      <Loader />
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
