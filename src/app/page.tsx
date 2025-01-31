import styles from "./page.module.css";

import Button from "@/components/UI/Button";
import Nav from "@/components/Nav";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";
import About from "@/sections/About";
import RSE from "@/sections/RSE";
import Machine from "@/sections/Machine";
import FAQ from "@/sections/FAQ";
import Divider from "@/components/Divider";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <Nav />
      </div>
      <div className={styles.contact}>
        <Button variant="primary" href="/destination">
          Nous contacter
        </Button>
      </div>
      <Hero />
      <ImageBreak
        src="/assets/images/hero-cover.jpg"
        alt="Description de l'image"
        width={1600}
        height={900}
        quality={90}
        priority={true}
      />
      <About />
      <ImageBreak
        src="/assets/images/separate.jpg"
        alt="Description de l'image"
        width={1600}
        height={700}
        quality={90}
        priority={true}
      />
      <RSE />
      <Machine />
      <FAQ />
      <Footer />
      <Divider />
    </main>
  );
}
