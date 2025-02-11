// components/Footer/index.tsx
import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";
import Link from "next/link";
import Fore from "@/components/Fore";
import { Footer as FooterType } from "@/types/modules/footer"; // Assurez-vous que ce chemin est correct

const Footer: React.FC<{ data: FooterType }> = ({ data }) => {
  const { footer_card, footer_info } = data;

  return (
    <section className={styles.footer}>
      <div className={styles.pattern}>
        <Fore />
      </div>

      <div className={styles.footerContent}>
        <FooterCards title={footer_card.title} button={footer_card.button} />
        <div className={styles.footerInfos}>
          <div className={styles.footerLeft}>
            <div className={styles.footerYear}>
              © 2025 {footer_info.company}
            </div>
          </div>
          <div className={styles.footerRight}>
            {footer_info.legal_links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={
                  index === 0
                    ? styles.footerCookie
                    : styles.footerMentionslegales
                }>
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
