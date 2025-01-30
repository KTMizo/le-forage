import styles from "./page.module.css";

import Hero from "@/sections/Hero";
import ImageBreak from "@/sections/ImageBreak";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <ImageBreak />
      </main>
    </>
  );
}
