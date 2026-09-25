"use client";
// Scroll infini : footer, zone rouge (100vh), puis une copie du hero.
// Dès qu'on scrolle dans la zone rouge, l'animation de forage se déclenche et descend
// automatiquement jusqu'à la copie ; on revient alors sans à-coup au vrai hero (même rendu)
// et le scroll reprend normalement.
// Une seule foreuse court du footer jusqu'à la copie ; son motif est recalé pour tomber
// exactement comme celle du vrai hero au moment du saut.
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fore from "@/components/Fore";
import { useLenis } from "@/app/LenisProvider";
import { drillScroll } from "@/lib/drill";
import styles from "./InfiniteLoop.module.css";

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
    let triggerAt = Infinity;
    let drilling = false;

    const measure = () => {
      cloneTop = cloneEl.getBoundingClientRect().top + window.scrollY;
      const gapTop = gapEl.getBoundingClientRect().top + window.scrollY;
      // Déclenchement : 8 % d'écran de zone rouge visible sous le footer
      triggerAt = gapTop - window.innerHeight * 0.92;

      // Recalage du motif de la foreuse (période = hauteur d'un motif)
      const container = foreEl.firstElementChild as HTMLElement | null;
      const motif = container?.firstElementChild as HTMLElement | null;
      if (!container || !motif) return;
      container.style.paddingTop = "0px";
      const period = motif.offsetHeight;
      const distance = cloneEl.offsetTop; // du haut de la colonne au haut de la copie
      container.style.paddingTop = `${period ? distance % period : 0}px`;
    };

    const onScroll = () => {
      if (drilling || lenis.animatedScroll < triggerAt) return;
      drilling = true;
      drillScroll(lenis, cloneTop, () => {
        // La copie remplit l'écran : on se replace sur le vrai hero, identique
        lenis.scrollTo(0, { immediate: true, force: true });
        drilling = false;
      });
    };

    const off = lenis.on("scroll", onScroll);
    ScrollTrigger.addEventListener("refresh", measure);
    measure();

    return () => {
      off();
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
