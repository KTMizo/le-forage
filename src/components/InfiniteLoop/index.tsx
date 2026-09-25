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
// Relâché, la page rebondit tout de suite sur la fin du footer ; il faut forcer longtemps pour le forage.
const BOUNCE_RATIO = 0.25;
// Poussée à fournir une fois la zone au maximum : 2,5 écrans de molette
const FORCE_RATIO = 2.5;
// Tactile : le défilement natif ne se freine pas, on déclenche à la moitié de l'écran
const TOUCH_TRIGGER_RATIO = 0.5;
// Molette relâchée = plus d'événement depuis RELEASE_MS : le rebond part tout de suite,
// sans attendre la fin du lissage de Lenis
const RELEASE_MS = 90; // au-dessus de l'écart entre deux crans de molette (50 à 100 ms)
const BOUNCE_DURATION = 0.5;

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
    // Suivi du geste molette / trackpad dans la zone freinée
    let lastDelta = 0;
    let decaying = 0; // événements consécutifs de plus en plus faibles = inertie après le lâcher
    let bouncing = false;
    let force = 0; // poussée accumulée une fois la zone freinée au maximum

    const resetGesture = () => {
      lastDelta = 0;
      decaying = 0;
      force = 0;
    };

    const bounceBack = () => {
      window.clearTimeout(idleTimer);
      force = 0;
      if (drilling || Math.max(lenis.animatedScroll, lenis.targetScroll) <= restAt + 1) return;
      bouncing = true;
      lenis.scrollTo(restAt, {
        duration: BOUNCE_DURATION,
        easing: easeOutBack,
        force: true,
        onComplete: () => {
          bouncing = false;
        },
      });
    };
    // Molette classique (crans réguliers) : plus d'événement depuis RELEASE_MS = relâchée
    const bounceOnRelease = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        bounceBack();
        resetGesture();
      }, RELEASE_MS);
    };

    // Au-delà du footer, chaque cran avance de moins en moins. Une fois la zone au maximum,
    // il faut continuer de pousser (FORCE_RATIO d'écran de molette) pour lancer le forage.
    const offModifier = addScrollModifier((data) => {
      if (drilling || data.deltaY <= 0 || data.event.type.includes("touch")) return;
      const delta = data.deltaY;
      const target = lenis.targetScroll;
      if (target + delta <= restAt && !bouncing) {
        resetGesture();
        return; // pas encore dans la zone : scroll normal
      }

      // Trackpad : l'inertie envoie des valeurs qui décroissent après le lâcher.
      // Dès qu'on la détecte, rebond immédiat et on ignore le reste de l'inertie.
      const pushingAgain = delta > lastDelta * 1.3 && delta > 8;
      decaying = delta < lastDelta * 0.92 ? decaying + 1 : 0;
      lastDelta = delta;
      if (bouncing && !pushingAgain) {
        data.deltaY = 0;
        return;
      }
      if (decaying >= 2) {
        data.deltaY = 0;
        bounceBack();
        return;
      }
      bouncing = false;
      bounceOnRelease();

      const free = Math.max(0, restAt - target); // partie du cran avant la fin du footer
      const extra = delta - free;
      const depth = Math.max(0, target - restAt);
      const resistance = Math.max(0.02, 0.35 * (1 - depth / bounceMax) ** 2);
      const newDepth = Math.min(bounceMax, depth + extra * resistance);
      data.deltaY = free + (newDepth - depth);

      if (newDepth >= bounceMax * 0.95) {
        force += extra;
        if (force >= window.innerHeight * FORCE_RATIO) {
          data.deltaY = 0;
          startDrill();
        }
      }
    });

    const onScroll = () => {
      if (drilling) return;
      // Tactile (défilement natif, non freinable) : seuil de déclenchement plus loin
      if (lenis.animatedScroll >= touchTriggerAt) {
        startDrill();
        return;
      }
    };

    // Tactile : rebond dès que le doigt quitte l'écran
    const onTouchEnd = () => {
      if (lenis.animatedScroll > restAt + 1) bounceBack();
    };
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const off = lenis.on("scroll", onScroll);
    ScrollTrigger.addEventListener("refresh", measure);
    measure();

    return () => {
      off();
      offModifier();
      window.removeEventListener("touchend", onTouchEnd);
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
        data-scroll-end
        aria-hidden="true"
      />
      <div ref={cloneRef} className={styles.clone}>
        {clone}
      </div>
    </div>
  );
}
