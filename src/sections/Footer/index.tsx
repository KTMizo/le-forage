import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <FooterCards />
        <div className={styles.footerInfos}>
          <div className={styles.footerLeft}>
            <div className={styles.footerYear}>© 2025 Le forage</div>
            <div className={styles.footerMentionslegales}>Mentions légales</div>
          </div>

          <div className={styles.footerRight}>
            <div className={styles.footerCookie}>Protection des données</div>
            <div className={styles.footerMentions}>Design Thomas B</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
