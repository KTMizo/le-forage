import styles from "./page.module.css";

import Grid from "@/components/Grid";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <ImageBreak />
      </main>
    </div>
  );
}
