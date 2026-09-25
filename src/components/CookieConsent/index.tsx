"use client";
// Bandeau cookies (recommandations CNIL) :
// - Google Analytics n'est chargé qu'après un accord explicite ;
// - « Refuser » est aussi visible et aussi simple que « Accepter » ;
// - le choix est conservé 6 mois, puis redemandé ;
// - « Gestion des cookies » (footer) rouvre le bandeau ; retirer son accord supprime les cookies GA.
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Button from "@/components/UI/Button";
import styles from "./CookieConsent.module.css";

const GA_ID = "G-9XPYMXJKWN";
const STORAGE_KEY = "cookieConsent";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // environ 6 mois
export const OPEN_COOKIE_SETTINGS = "cookies:open";

type Consent = "granted" | "denied";

function readConsent(): Consent | null {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved || Date.now() - saved.date > MAX_AGE_MS) return null;
    return saved.value === "granted" || saved.value === "denied" ? saved.value : null;
  } catch {
    return null;
  }
}

function saveConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, date: Date.now() }));
  } catch {}
}

// Supprime les cookies _ga / _ga_XXXX sur le domaine et ses parents
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga")) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setOpen(saved === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  const choose = (value: Consent) => {
    saveConsent(value);
    if (value === "denied" && consent === "granted") {
      // Retrait de l'accord : GA arrête de collecter et ses cookies sont supprimés
      (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
      clearAnalyticsCookies();
    }
    setConsent(value);
    setOpen(false);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {open && (
        <div
          className={styles.banner}
          role="dialog"
          aria-live="polite"
          aria-label="Gestion des cookies"
          data-lenis-prevent
        >
          <p className={styles.title}>Cookies</p>
          <p className={styles.text}>
            Nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour
            comprendre comment le site est consulté et l&apos;améliorer. Ils ne sont déposés
            qu&apos;avec votre accord, et vous pouvez changer d&apos;avis à tout moment via le
            lien « Gestion des cookies » en bas de page.{" "}
            <Link href="/protection-donnees">En savoir plus</Link>
          </p>
          <div className={styles.actions}>
            <Button variant="accent-outline" onClick={() => choose("denied")}>
              Refuser
            </Button>
            <Button variant="secondary" onClick={() => choose("granted")}>
              Accepter
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
