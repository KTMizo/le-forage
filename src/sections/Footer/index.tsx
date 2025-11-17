"use client";
import React from "react";
import styles from "./Footer.module.css";
import FooterCards from "@/components/Cards/FooterCards/FooterCards";
import Link from "next/link";
import Fore from "@/components/Fore";
import { Footer as FooterType } from "@/types/modules/footer";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const Footer: React.FC<{ data: FooterType }> = ({ data }) => {
  const { footer_card, footer_info } = data;

  // Fonction de forage (wizz + scroll)
  const handleDrillClick = () => {
    const aboutSection = document.getElementById("a-propos");
    if (!aboutSection) return;

    const scrollDuration = 1200; // 1.2 secondes

    // Vibration continue pendant le scroll
    const shakeInterval = setInterval(() => {
      gsap.to(document.body, {
        x: gsap.utils.random(-15, 15),
        y: gsap.utils.random(-12, 12),
        duration: 0.05,
        ease: "none",
      });
    }, 50);

    // Scroll vers la section About
    gsap.to(window, {
      scrollTo: {
        y: aboutSection,
        offsetY: 0,
      },
      duration: scrollDuration / 1000,
      ease: "power2.inOut",
      onComplete: () => {
        clearInterval(shakeInterval);
        gsap.to(document.body, {
          x: 0,
          y: 0,
          duration: 0.15,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <footer className="py-19 px-8 bg-red relative lg:py-50 lg:px-40">
      <div className={styles.pattern}>
        <Fore />
      </div>

      <div className="grid gap-y-15 lg:gap-y-40">
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
          
          <div className="flex justify-center lg:order-2">
            <button
              onClick={handleDrillClick}
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
