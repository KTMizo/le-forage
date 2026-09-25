"use client";
import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";
import Link from "next/link";
import { Footer as FooterType } from "@/types/modules/footer";
import { drillTo } from "@/lib/drill";

const Footer: React.FC<{ data: FooterType }> = ({ data }) => {
  const { footer_card, footer_info } = data;

  return (
    <footer data-theme="red" className="relative px-8 py-19 lg:px-40 lg:py-50">
      <div className="grid gap-y-15 lg:gap-y-40">
        <FooterCards title={footer_card.title} button={footer_card.button} />
        <div className="grid gap-y-12 text-center lg:flex lg:items-center lg:justify-between lg:max-w-657">
          <div className="flex justify-center gap-x-8 lg:gap-x-12 lg:order-1">
            <div className={styles.footerYear}>
              <span>
                © {new Date().getFullYear()} {footer_info.company}
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/le-forage/"
              >
                Linkedin
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:order-2">
            <button
              onClick={() => drillTo("#a-propos")}
              className={styles.scrollToTopBtn}
            >
              [Forer la page]
            </button>
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
