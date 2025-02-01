import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";
import Link from "next/link"; // Importation du Link de Next.js

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footerContent}>
        <FooterCards />
        <div className={styles.footerInfos}>
          <div className={styles.footerLeft}>
            <div className={styles.footerYear}>© 2025 Le forage</div>
            <Link
              href="/mentions-legales"
              className={styles.footerMentionslegales}>
              Mentions légales
            </Link>
          </div>

          <div className={styles.footerRight}>
            <Link href="/protection-donnees" className={styles.footerCookie}>
              Protection des données
            </Link>
            <Link href="/design-thomas-b" className={styles.footerMentions}>
              Design Thomas B
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
