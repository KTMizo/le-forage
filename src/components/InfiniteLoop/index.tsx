"use client";
// Scroll infini : footer, zone rouge (50vh), puis une copie du hero.
// Quand la copie atteint le haut de l'écran, on revient sans à-coup au vrai hero (même rendu).
// Une seule foreuse court du footer jusqu'à la copie ; son motif est recalé pour tomber
// exactement comme celle du vrai hero au moment du saut.
import { useEffect, useRef, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fore from "@/components/Fore";
import { useLenis } from "@/app/LenisProvider";
import styles from "./InfiniteLoop.module.css";

interface InfiniteLoopProps {
  footer: ReactNode;
  clone: ReactNode;
}

export default function InfiniteLoop({ footer, clone }: InfiniteLoopProps) {
  const loopRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const foreRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const loop = loopRef.current;
    const cloneEl = cloneRef.current;
    const foreEl = foreRef.current;
    if (!loop || !cloneEl || !foreEl || !lenis) return;

    // Position de la copie dans la page, recalculée seulement au redimensionnement
    let cloneTop = Infinity;
    const measure = () => {
      cloneTop = cloneEl.getBoundingClientRect().top + window.scrollY;

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
      // Marge d'un pixel : les positions de scroll ne tombent pas toujours sur un entier
      if (lenis.animatedScroll < cloneTop - 1) return;
      // Élan restant du scroll fluide, rejoué après le saut
      const remaining = lenis.targetScroll - lenis.animatedScroll;
      const landing = Math.max(0, lenis.animatedScroll - cloneTop);
      lenis.scrollTo(landing, { immediate: true, force: true });
      if (remaining > 1) lenis.scrollTo(landing + remaining, { force: true });
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
      <div className={styles.gap} data-theme="red" aria-hidden="true" />
      <div ref={cloneRef} className={styles.clone}>
        {clone}
      </div>
    </div>
  );
}
