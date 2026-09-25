"use client";
// Scroll infini : footer, zone rouge (100vh), puis une copie du hero.
// Sous le footer, le scroll est freiné puis rebondit ; en forçant, l'animation de forage
// se déclenche et descend automatiquement jusqu'à la copie ; on revient alors sans à-coup au vrai hero (même rendu)
// et le scroll reprend normalement.
// Une seule foreuse court du footer jusqu'à la copie ; son motif est recalé pour tomber
// exactement comme celle du vrai hero au moment du saut.
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fore from "@/components/Fore";
import { addScrollModifier, useLenis } from "@/app/LenisProvider";
import { drillScroll } from "@/lib/drill";
import styles from "./InfiniteLoop.module.css";

// Dépassement sous le footer : jusqu'à 25 % d'écran, de plus en plus freiné.
// Relâché, la page rebondit sur la fin du footer ; forcé jusqu'à 85 % de la zone, le forage part.
const BOUNCE_RATIO = 0.25;
const BOUNCE_TRIGGER = 0.85;
// Tactile : le défilement natif ne se freine pas, on déclenche à la moitié de l'écran
const TOUCH_TRIGGER_RATIO = 0.5;
// Délai sans défilement avant le rebond
const IDLE_MS = 180;

// Retour avec léger dépassement : le « rebond »
const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};

interface InfiniteLoopProps {
  footer: ReactNode;
  clone: ReactNode;
}

export default function InfiniteLoop({ footer, clone }: InfiniteLoopProps) {
  const loopRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const foreRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const loop = loopRef.current;
    const cloneEl = cloneRef.current;
    const foreEl = foreRef.current;
    const gapEl = gapRef.current;
    if (!loop || !cloneEl || !foreEl || !gapEl || !lenis) return;

    // Positions, recalculées seulement au rafraîchissement de ScrollTrigger (chargement, resize)
    let cloneTop = Infinity;
    let restAt = Infinity; // fin naturelle de la page : bas du footer au bas de l'écran
    let bounceMax = 0; // profondeur maximale du dépassement freiné
    let touchTriggerAt = Infinity;
    let drilling = false;
    let idleTimer = 0;

    const measure = () => {
      cloneTop = cloneEl.getBoundingClientRect().top + window.scrollY;
      const gapTop = gapEl.getBoundingClientRect().top + window.scrollY;
      restAt = gapTop - window.innerHeight;
      bounceMax = window.innerHeight * BOUNCE_RATIO;
      touchTriggerAt = gapTop - window.innerHeight * (1 - TOUCH_TRIGGER_RATIO);

      // Recalage du motif de la foreuse (période = hauteur d'un motif)
      const container = foreEl.firstElementChild as HTMLElement | null;
      const motif = container?.firstElementChild as HTMLElement | null;
      if (!container || !motif) return;
      container.style.paddingTop = "0px";
      const period = motif.offsetHeight;
      const distance = cloneEl.offsetTop; // du haut de la colonne au haut de la copie
      container.style.paddingTop = `${period ? distance % period : 0}px`;
    };

    const startDrill = () => {
      if (drilling) return;
      drilling = true;
      window.clearTimeout(idleTimer);
      drillScroll(lenis, cloneTop, () => {
        // La copie remplit l'écran : on se replace sur le vrai hero, identique
        lenis.scrollTo(0, { immediate: true, force: true });
        drilling = false;
      });
    };

    // Au relâché, si on a dépassé la fin du footer : retour élastique (petit rebond)
    const scheduleBounceBack = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (drilling || lenis.animatedScroll <= restAt + 1) return;
        lenis.scrollTo(restAt, { duration: 0.9, easing: easeOutBack, force: true });
      }, IDLE_MS);
    };

    // Molette / trackpad : au-delà du footer, chaque cran avance de moins en moins.
    // Arriver au bout de la zone freinée (en forçant) déclenche le forage.
    const offModifier = addScrollModifier((data) => {
      if (drilling || data.deltaY <= 0 || data.event.type.includes("touch")) return;
      const target = lenis.targetScroll;
      const free = Math.max(0, restAt - target); // partie du cran avant la fin du footer
      const extra = data.deltaY - free;
      if (extra <= 0) return;
      const depth = Math.max(0, target - restAt);
      const resistance = Math.max(0.07, 0.35 * (1 - depth / bounceMax) ** 2);
      data.deltaY = free + extra * resistance;
      if (depth + extra * resistance >= bounceMax * BOUNCE_TRIGGER) {
        data.deltaY = 0;
        startDrill();
      }
    });

    const onScroll = () => {
      if (drilling) return;
      // Tactile (défilement natif, non freinable) : seuil de déclenchement plus loin
      if (lenis.animatedScroll >= touchTriggerAt) {
        startDrill();
        return;
      }
      if (lenis.animatedScroll > restAt + 1) scheduleBounceBack();
    };

    const off = lenis.on("scroll", onScroll);
    ScrollTrigger.addEventListener("refresh", measure);
    measure();

    return () => {
      off();
      offModifier();
      window.clearTimeout(idleTimer);
      ScrollTrigger.removeEventListener("refresh", measure);
    };
  }, [lenis]);

  return (
    <div ref={loopRef} className={styles.loop}>
      <div ref={foreRef} className={styles.fore} aria-hidden="true">
        <Fore count={24} />
      </div>
      {footer}
      <div
        ref={gapRef}
        className={styles.gap}
        data-theme="red"
        aria-hidden="true"
      />
      <div ref={cloneRef} className={styles.clone}>
        {clone}
      </div>
    </div>
  );
}
