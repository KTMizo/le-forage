// components/Footer/index.tsx
import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";
import Link from "next/link";
import Fore from "@/components/Fore";
import { Footer as FooterType } from "@/types/modules/footer";

const Footer: React.FC<{ data: FooterType }> = ({ data }) => {
  const { footer_card, footer_info } = data;

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-19 px-8 bg-red relative lg:py-50 lg:px-40">
      <div className={styles.pattern}>
        <Fore />
      </div>

      <div className="grid gap-y-15  lg:gap-y-40">
        <FooterCards title={footer_card.title} button={footer_card.button} />
        <div className="grid gap-y-12 text-center lg:flex lg:items-center lg:justify-between lg:max-w-657">
          <div className="flex justify-center gap-x-8 lg:gap-x-12 lg:order-1">
            <div className={styles.footerYear}>
              <span>© 2025 {footer_info.company}</span>
              <a target="_blank" href="https://www.linkedin.com/company/le-forage/">
                Linkedin
              </a>
            </div>
          </div>
          
          {/* Nouveau bouton centré */}
          <div className="flex justify-center lg:order-2">
            <a 
              href="#" 
              onClick={handleScrollToTop}
              className={styles.scrollToTopBtn}
            >
              [Forer la page]
            </a>
          </div>

          <div className="flex justify-center gap-x-8 lg:gap-x-12 lg:order-3">
            {footer_info.legal_links.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className={
                  index === 0
                    ? styles.footerCookie
                    : styles.footerMentionslegales
                }
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
