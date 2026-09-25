"use client";
// En-tête du site, toujours fixe à 1.5rem du haut.
// Trois thèmes selon la section qui passe dessous (attribut data-theme des sections) :
// « red » (fond rouge), « dark » (image ou fond noir), « beige » (fond clair).
// Le logo reste complet et se réduit au scroll.
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoFull from "./LogoFull";
import MobileMenu from "@/components/UI/Menu";
import { NAV_LINKS, CONTACT_MAILTO } from "@/lib/site";
import styles from "./Header.module.css";

gsap.registerPlugin(ScrollTrigger);

type Theme = "red" | "dark" | "beige";

// Distance de scroll (px) sur laquelle le logo passe de sa grande taille à sa petite taille
const LOGO_SHRINK_DISTANCE = 400;

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const [theme, setTheme] = useState<Theme>("red");

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    if (!header || !logo) return;

    const ctx = gsap.context(() => {
      // Réduction du logo : de --logo-big à --logo-small (définis en CSS, donc en rem)
      gsap.fromTo(
        logo,
        { "--logo-progress": 0 },
        {
          "--logo-progress": 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: LOGO_SHRINK_DISTANCE,
            scrub: true,
          },
        },
      );

      // Thème : la section sous le milieu de l'en-tête donne sa couleur
      const line = () => header.offsetTop + header.offsetHeight / 2;
      document.querySelectorAll<HTMLElement>("[data-theme]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: () => `top ${line()}`,
          end: () => `bottom ${line()}`,
          onToggle: (self) => {
            if (self.isActive) setTheme(section.dataset.theme as Theme);
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className={styles.header} data-header-theme={theme}>
      <a ref={logoRef} href="#hero" className={styles.logo} aria-label="Le Forage, retour en haut">
        <LogoFull className={styles.logoSvg} />
      </a>

      <nav className={styles.nav} aria-label="Navigation principale">
        {NAV_LINKS.map((link) => (
          <a key={link.url} href={link.url} className={styles.navLink}>
            {link.title}
          </a>
        ))}
      </nav>

      <a href={CONTACT_MAILTO} className={styles.contact}>
        Nous contacter
      </a>

      <div className={styles.mobile}>
        <MobileMenu />
      </div>
    </header>
  );
}
