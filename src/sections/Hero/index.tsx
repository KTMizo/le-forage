"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import Button from "@/components/UI/Button";
import Fore from "@/components/Fore";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import SplitType from "split-type";
import Nav from "@/components/Nav";

import { HeroData, ButtonVariant } from "@/types/modules/hero";

interface HeroProps {
  data: HeroData;
}

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Hero: React.FC<HeroProps> = ({ data }) => {
  const buttonVariant = (data?.button?.variant || "outline") as ButtonVariant;

  const buttonData = {
    variant: buttonVariant,
    text: data?.button?.text ?? "Demandez un devis",
    url: data?.button?.url ?? "/test",
    showArrow: data?.button?.showArrow ?? true,
  };

  // Refs pour les éléments animés
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const stickyWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef(null);

  // Fonction de forage (wizz + scroll)
  const handleDrillClick = () => {
    const aboutSection = document.getElementById("about");
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

  useEffect(() => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !logoRef.current ||
      !containerRef.current
    ) {
      return;
    }

    const tl = gsap.timeline();

    // Configuration de SplitType pour le titre
    const splitTitle = new SplitType(titleRef.current, {
      types: "words",
      wordClass: styles.animatedWord,
    });

    // Configuration de SplitType pour la description
    const splitDescription = new SplitType(descriptionRef.current, {
      types: "lines",
      lineClass: styles.animatedLine,
    });

    // Création des wrappers pour les lignes
    splitDescription.lines?.forEach((line) => {
      const wrapper = document.createElement("div");
      wrapper.className = styles.lineWrapper;
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Rendre le conteneur visible avant l'animation
    gsap.set(containerRef.current, { visibility: "visible" });

    // Animation des mots du titre
    tl.fromTo(
      `.${styles.animatedWord}`,
      {
        y: 100,
        opacity: 1,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        delay: 2,
      }
    );

    // Animation des lignes de description
    tl.fromTo(
      `.${styles.animatedLine}`,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.9"
    );

    // Animation du logo au scroll
    gsap.to(logoRef.current, {
      scale: 0.4,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=500",
        scrub: true,
      },
    });

    // Animation des lettres du logo
    const logoLetters = document.querySelectorAll(".logo-letter");
    gsap.to(logoLetters, {
      y: 200,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "+=250",
        scrub: true,
      },
    });

    // Nettoyage des animations
    return () => {
      splitTitle.revert();
      splitDescription.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Logo sticky */}
      <div
        id="nav-sticky"
        ref={stickyWrapperRef}
        className={styles.stickyWrapper}
      >
        <div ref={logoRef} className={styles.logo}>
          <svg
            id="hero-logo"
            width="100%"
            height="100%"
            viewBox="0 0 351 161"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M104.853 160.551H160.551V0H115.527C112.251 3.83891 108.681 7.40569 104.853 10.6696V42.4285C108.171 41.5167 111.542 40.7835 114.951 40.2341C116.874 39.9242 118.162 42.1545 116.932 43.665C113.28 48.1498 109.236 52.2837 104.853 56.0205V87.7797C108.171 86.8678 111.542 86.1347 114.951 85.5853C116.874 85.2754 118.162 87.5057 116.932 89.0162C113.28 93.5009 109.236 97.6348 104.853 101.372V133.131C108.171 132.219 111.542 131.486 114.951 130.936C116.874 130.626 118.162 132.857 116.932 134.367C113.28 138.852 109.236 142.986 104.853 146.723V160.551Z"
              fill="#F9F1EA"
            />
            <path
              d="M56.4893 0H0V160.551H54.1458C58.4383 156.932 63.0509 153.692 67.9332 150.873L81.2016 143.213C76.5715 143.501 66.6093 144.99 56.4893 148.82V128.336C52.2894 129.626 47.9972 130.628 43.6423 131.33C41.7192 131.64 40.4316 129.41 41.6615 127.899C48.9853 118.905 57.8882 111.322 67.9332 105.522L81.2016 97.8617C76.5715 98.15 66.6093 99.639 56.4893 103.469V82.9844C52.2894 84.2753 47.9972 85.277 43.6423 85.9788C41.7192 86.2887 40.4316 84.0584 41.6615 82.5479C48.9853 73.5536 57.8882 65.9705 67.9332 60.171L81.2016 52.5105C76.5715 52.7988 66.6093 54.2878 56.4893 58.1177V37.6335C52.2894 38.9244 47.9972 39.926 43.6423 40.6278C41.7192 40.9377 40.4316 38.7075 41.6615 37.197C48.9853 28.2026 57.8882 20.6196 67.9332 14.8201L81.2016 7.15961C76.5715 7.44788 66.6093 8.9369 56.4893 12.7667V0Z"
              fill="#F9F1EA"
            />
            <g className="logo-letter">
              <path
                d="M329.619 109.531H351V116.659H337.459V129.844H348.221V136.971H337.459V152.295H351V159.422H329.619V109.531Z"
                fill="#F9F1EA"
              />
              <path
                d="M312.897 160.14C309.096 160.14 306.197 159.071 304.201 156.933C302.206 154.747 301.208 151.635 301.208 147.596V121.368C301.208 117.329 302.206 114.241 304.201 112.102C306.197 109.917 309.096 108.824 312.897 108.824C316.698 108.824 319.596 109.917 321.592 112.102C323.588 114.241 324.585 117.329 324.585 121.368V125.644H317.173V120.869C317.173 117.59 315.819 115.951 313.111 115.951C310.402 115.951 309.048 117.59 309.048 120.869V148.166C309.048 151.397 310.402 153.013 313.111 153.013C315.819 153.013 317.173 151.397 317.173 148.166V138.402H313.253V131.275H324.585V147.596C324.585 151.635 323.588 154.747 321.592 156.933C319.596 159.071 316.698 160.14 312.897 160.14Z"
                fill="#F9F1EA"
              />
              <path
                d="M279.375 109.531H289.994L298.119 159.422H290.279L288.854 149.515V149.658H279.945L278.519 159.422H271.25L279.375 109.531ZM287.927 142.887L284.435 118.227H284.292L280.871 142.887H287.927Z"
                fill="#F9F1EA"
              />
              <path
                d="M244.57 109.531H256.188C260.226 109.531 263.172 110.482 265.025 112.382C266.878 114.235 267.805 117.11 267.805 121.006V124.071C267.805 129.25 266.094 132.528 262.673 133.906V134.049C264.574 134.619 265.904 135.783 266.665 137.541C267.472 139.299 267.876 141.651 267.876 144.597V153.364C267.876 154.789 267.924 155.953 268.019 156.856C268.114 157.711 268.351 158.566 268.732 159.422H260.749C260.464 158.614 260.274 157.854 260.179 157.141C260.084 156.428 260.036 155.145 260.036 153.292V144.17C260.036 141.889 259.656 140.297 258.896 139.394C258.183 138.491 256.924 138.04 255.119 138.04H252.41V159.422H244.57V109.531ZM255.261 130.913C256.829 130.913 257.993 130.509 258.753 129.701C259.561 128.894 259.965 127.539 259.965 125.639V121.79C259.965 119.984 259.632 118.678 258.967 117.87C258.35 117.062 257.352 116.658 255.974 116.658H252.41V130.913H255.261Z"
                fill="#F9F1EA"
              />
              <path
                d="M227.366 160.14C223.518 160.14 220.572 159.047 218.529 156.861C216.485 154.676 215.464 151.587 215.464 147.596V121.368C215.464 117.377 216.485 114.288 218.529 112.102C220.572 109.917 223.518 108.824 227.366 108.824C231.215 108.824 234.161 109.917 236.204 112.102C238.247 114.288 239.269 117.377 239.269 121.368V147.596C239.269 151.587 238.247 154.676 236.204 156.861C234.161 159.047 231.215 160.14 227.366 160.14ZM227.366 153.013C230.075 153.013 231.429 151.373 231.429 148.095V120.869C231.429 117.59 230.075 115.951 227.366 115.951C224.658 115.951 223.304 117.59 223.304 120.869V148.095C223.304 151.373 224.658 153.013 227.366 153.013Z"
                fill="#F9F1EA"
              />
              <path
                d="M191.533 109.531H212.273V116.658H199.373V130.557H209.493V137.684H199.373V159.422H191.533V109.531Z"
                fill="#F9F1EA"
              />
              <path
                d="M216.029 41.7559H237.411V48.8831H223.869V62.0684H234.631V69.1956H223.869V84.5191H237.411V91.6463H216.029V41.7559Z"
                fill="#F9F1EA"
              />
              <path
                d="M191.533 41.7559H199.373V84.5191H212.273V91.6463H191.533V41.7559Z"
                fill="#F9F1EA"
              />
            </g>
          </svg>
        </div>
        <div className={styles.nav}>
          <Nav />
        </div>
        <div id="contact-btn" className={styles.contact}>
          <Button variant="primary" href="mailto:bonjour@antoinepiney.fr">
            Nous contacter
          </Button>
        </div>
      </div>

      <section id="hero" ref={heroRef} className={styles.hero}>
        <div
          ref={containerRef}
          className={styles.container}
          style={{ visibility: "hidden" }}
        >
          <div className={styles.content}>
            <div className="grid gap-y-8 grid-cols-8 gap-x-4">
              <h1
                ref={titleRef}
                className="font-articulate text-beige lg:text-desk-xxl text-38 leading-20 lg:leading-40 col-start-1 col-span-6 overflow-hidden"
              >
                {data.title}
              </h1>
              <p
                ref={descriptionRef}
                className="col-start-1 col-span-7 text-s lg:text-desk-s lg:max-w-362 font-articulate text-beige"
              >
                {data.description}
              </p>
            </div>
            <Button
              variant={buttonData.variant}
              href={buttonData.url}
              showArrow={buttonData.showArrow}
            >
              {buttonData.text}
            </Button>
          </div>
          <div className={styles.pattern}>
            <Fore />
          </div>
          <div className={styles.footer}>
            <button
              onClick={handleDrillClick}
              className={styles.tag}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              [Forer la page]
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;