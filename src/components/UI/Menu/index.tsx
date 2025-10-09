// index.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/UI/Button";
import styles from "./Menu.module.css";

const MenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div id="t-menu" className={styles.menu}>
      <button
        onClick={handleMenuToggle}
        className={`${styles.menu__button} ${
          isVisible ? styles.menu__button_visible : ""
        }`}
        aria-label="Menu"
      >
        <span className={styles.menu__buttonText}>Menu</span>
        <svg
          className={`${styles.menu__buttonIcon} ${
            isMenuOpen ? styles.menu__buttonIcon_hidden : ""
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            transform="translate(0, -3.03571)"
            stroke="#AB2325"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="8"
            x2="16"
            y2="8"
            transform="translate(0, 3.82141)"
            stroke="#AB2325"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      <div
        className={`${styles.menu__overlay} ${
          isMenuOpen ? styles.menu__overlay_active : ""
        } ${isAnimating ? styles.menu__overlay_animating : ""}`}
        onAnimationEnd={handleAnimationEnd}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`${styles.menu__panel} ${
            isMenuOpen ? styles.menu__panel_active : ""
          }`}
        >
          <div className="flex pt-8 px-8 pb-16 justify-between items-start">
            <svg
              className="w-55 h-25"
              viewBox="0 0 110 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_566_1972)">
                <path
                  d="M32.6543 50H50.0002V0H35.9784C34.9582 1.19554 33.8465 2.30634 32.6543 3.3228V13.2134C33.6877 12.9295 34.7374 12.7011 35.7992 12.53C36.3981 12.4335 36.7991 13.1281 36.416 13.5985C35.2788 14.9952 34.0192 16.2826 32.6543 17.4463V27.337C33.6877 27.0531 34.7374 26.8247 35.7992 26.6536C36.3981 26.5571 36.7991 27.2517 36.416 27.7221C35.2788 29.1188 34.0192 30.4062 32.6543 31.57V41.4606C33.6877 41.1766 34.7374 40.9483 35.7992 40.7772C36.3981 40.6807 36.7991 41.3752 36.416 41.8456C35.2788 43.2423 34.0192 44.5297 32.6543 45.6935V50Z"
                  fill="#AB2325"
                />
              </g>
              <g clipPath="url(#clip1_566_1972)">
                <path
                  d="M17.5924 0H0V50H16.8625C18.1993 48.873 19.6358 47.8639 21.1563 46.9861L25.2884 44.6004C23.8465 44.6902 20.744 45.1539 17.5924 46.3466V39.9673C16.2844 40.3693 14.9476 40.6812 13.5914 40.8998C12.9925 40.9963 12.5915 40.3017 12.9746 39.8313C15.2554 37.0302 18.028 34.6687 21.1563 32.8625L25.2884 30.4768C23.8465 30.5666 20.744 31.0303 17.5924 32.2231V25.8437C16.2844 26.2457 14.9476 26.5576 13.5914 26.7762C12.9925 26.8727 12.5915 26.1781 12.9746 25.7077C15.2554 22.9066 18.028 20.545 21.1563 18.7389L25.2884 16.3532C23.8465 16.443 20.744 16.9067 17.5924 18.0995V11.7201C16.2844 12.1221 14.9476 12.4341 13.5914 12.6526C12.9925 12.7491 12.5915 12.0546 12.9746 11.5842C15.2554 8.78308 18.028 6.42151 21.1563 4.61539L25.2884 2.2297C23.8465 2.31948 20.744 2.7832 17.5924 3.97592V0Z"
                  fill="#AB2325"
                />
              </g>
              <g clipPath="url(#clip2_566_1972)">
                <path
                  d="M102.652 34.1118H109.311V36.3314H105.094V40.4377H108.446V42.6573H105.094V47.4295H109.311V49.6491H102.652V34.1118Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip3_566_1972)">
                <path
                  d="M97.4448 49.8709C96.2611 49.8709 95.3584 49.5379 94.7369 48.872C94.1154 48.1913 93.8047 47.2221 93.8047 45.9643V37.7962C93.8047 36.5384 94.1154 35.5766 94.7369 34.9107C95.3584 34.23 96.2611 33.8896 97.4448 33.8896C98.6286 33.8896 99.5313 34.23 100.153 34.9107C100.774 35.5766 101.085 36.5384 101.085 37.7962V39.1279H98.7766V37.6408C98.7766 36.6198 98.3549 36.1093 97.5114 36.1093C96.668 36.1093 96.2463 36.6198 96.2463 37.6408V46.1419C96.2463 47.1481 96.668 47.6512 97.5114 47.6512C98.3549 47.6512 98.7766 47.1481 98.7766 46.1419V43.101H97.5558V40.8814H101.085V45.9643C101.085 47.2221 100.774 48.1913 100.153 48.872C99.5313 49.5379 98.6286 49.8709 97.4448 49.8709Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip4_566_1972)">
                <path
                  d="M87.005 34.1113H90.3122L92.8425 49.6486H90.401L89.9571 46.5633V46.6077H87.1825L86.7386 49.6486H84.4746L87.005 34.1113ZM89.6685 44.4991L88.5809 36.8193H88.5365L87.4711 44.4991H89.6685Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip5_566_1972)">
                <path
                  d="M76.1665 34.1113H79.7845C81.0423 34.1113 81.9597 34.4073 82.5368 34.9992C83.1139 35.5763 83.4024 36.4715 83.4024 37.6849V38.6393C83.4024 40.2523 82.8697 41.2733 81.8043 41.7024V41.7468C82.3962 41.9244 82.8105 42.2869 83.0473 42.8344C83.2989 43.3819 83.4246 44.1144 83.4246 45.0318V47.7619C83.4246 48.2059 83.4394 48.5684 83.469 48.8496C83.4986 49.1159 83.5726 49.3823 83.691 49.6486H81.205C81.1162 49.3971 81.057 49.1603 81.0275 48.9383C80.9979 48.7164 80.9831 48.3168 80.9831 47.7397V44.8986C80.9831 44.1884 80.8647 43.6927 80.6279 43.4115C80.406 43.1304 80.0138 42.9898 79.4515 42.9898H78.6081V49.6486H76.1665V34.1113ZM79.4959 40.7702C79.9842 40.7702 80.3468 40.6444 80.5835 40.3928C80.8351 40.1413 80.9609 39.7195 80.9609 39.1277V37.9291C80.9609 37.3668 80.8573 36.9598 80.6501 36.7083C80.4578 36.4567 80.147 36.3309 79.7179 36.3309H78.6081V40.7702H79.4959Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip6_566_1972)">
                <path
                  d="M70.8088 49.8709C69.6102 49.8709 68.6928 49.5305 68.0565 48.8498C67.4202 48.1692 67.1021 47.2073 67.1021 45.9643V37.7962C67.1021 36.5532 67.4202 35.5913 68.0565 34.9107C68.6928 34.23 69.6102 33.8896 70.8088 33.8896C72.0074 33.8896 72.9248 34.23 73.5611 34.9107C74.1974 35.5913 74.5156 36.5532 74.5156 37.7962V45.9643C74.5156 47.2073 74.1974 48.1692 73.5611 48.8498C72.9248 49.5305 72.0074 49.8709 70.8088 49.8709ZM70.8088 47.6512C71.6523 47.6512 72.074 47.1407 72.074 46.1197V37.6408C72.074 36.6198 71.6523 36.1093 70.8088 36.1093C69.9654 36.1093 69.5436 36.6198 69.5436 37.6408V46.1197C69.5436 47.1407 69.9654 47.6512 70.8088 47.6512Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip7_566_1972)">
                <path
                  d="M59.6484 34.1113H66.1075V36.3309H62.09V40.6592H65.2419V42.8788H62.09V49.6486H59.6484V34.1113Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip8_566_1972)">
                <path
                  d="M67.2769 13.0044H73.9357V15.224H69.7184V19.3303H73.07V21.5499H69.7184V26.3221H73.9357V28.5417H67.2769V13.0044Z"
                  fill="#003B87"
                />
              </g>
              <g clipPath="url(#clip9_566_1972)">
                <path
                  d="M59.6479 13.0039H62.0895V26.3216H66.107V28.5412H59.6479V13.0039Z"
                  fill="#003B87"
                />
              </g>
              <defs>
                <clipPath id="clip0_566_1972">
                  <rect
                    width="17.3459"
                    height="50"
                    fill="white"
                    transform="translate(32.6543)"
                  />
                </clipPath>
                <clipPath id="clip1_566_1972">
                  <rect width="25.2884" height="50" fill="white" />
                </clipPath>
                <clipPath id="clip2_566_1972">
                  <rect
                    width="6.65884"
                    height="15.5373"
                    fill="white"
                    transform="translate(102.652 34.1113)"
                  />
                </clipPath>
                <clipPath id="clip3_566_1972">
                  <rect
                    width="7.28033"
                    height="15.9812"
                    fill="white"
                    transform="translate(93.8047 33.8896)"
                  />
                </clipPath>
                <clipPath id="clip4_566_1972">
                  <rect
                    width="8.36794"
                    height="15.5373"
                    fill="white"
                    transform="translate(84.4746 34.1113)"
                  />
                </clipPath>
                <clipPath id="clip5_566_1972">
                  <rect
                    width="7.52448"
                    height="15.5373"
                    fill="white"
                    transform="translate(76.1665 34.1113)"
                  />
                </clipPath>
                <clipPath id="clip6_566_1972">
                  <rect
                    width="7.4135"
                    height="15.9812"
                    fill="white"
                    transform="translate(67.1021 33.8896)"
                  />
                </clipPath>
                <clipPath id="clip7_566_1972">
                  <rect
                    width="6.45907"
                    height="15.5373"
                    fill="white"
                    transform="translate(59.6484 34.1113)"
                  />
                </clipPath>
                <clipPath id="clip8_566_1972">
                  <rect
                    width="6.65884"
                    height="15.5373"
                    fill="white"
                    transform="translate(67.2769 13.0039)"
                  />
                </clipPath>
                <clipPath id="clip9_566_1972">
                  <rect
                    width="6.45907"
                    height="15.5373"
                    fill="white"
                    transform="translate(59.6484 13.0039)"
                  />
                </clipPath>
              </defs>
            </svg>
            <button
              onClick={handleMenuToggle}
              className={`${styles.menu__closeButton} ${
                !isVisible ? styles.menu__button_visible : ""
              }`}
              aria-label="Fermer le menu"
            >
              <span>Fermer</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav
            className={`${styles.menu__nav} ${
              isMenuOpen ? styles.menu__nav_active : ""
            }`}
          >
            {[
              { title: "À propos", url: "#a-propos" },
              { title: "Nos services", url: "#services" },
              { title: "Sécurité", url: "#rse" },
              { title: "Nos machines", url: "#machines" },
              { title: "FAQ", url: "#faq" },
            ].map((item, index) => (
              <Link
                onClick={handleMenuToggle}
                href={item.url}
                key={item.title}
                className={styles.menu__navLink}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
