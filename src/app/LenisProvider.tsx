"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
// CSS officiel : bloque le scroll natif quand Lenis est stoppé (menu, popins)
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Modificateurs du défilement molette/trackpad, appliqués avant que Lenis ne consomme
// l'événement (utilisé par le scroll infini pour freiner le scroll sous le footer)
type VirtualScrollData = { deltaX: number; deltaY: number; event: WheelEvent | TouchEvent };
const scrollModifiers = new Set<(data: VirtualScrollData) => void>();
export function addScrollModifier(fn: (data: VirtualScrollData) => void) {
  scrollModifiers.add(fn);
  return () => {
    scrollModifiers.delete(fn);
  };
}

// Instance Lenis accessible aux composants (créée après leurs propres effets, d'où le state)
const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [instance, setInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Toujours repartir du haut au rechargement
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // Liens d'ancre (#faq, #rse…) : scroll fluide géré par Lenis
      anchors: true,
      virtualScroll: (data) => {
        scrollModifiers.forEach((fn) => fn(data));
        return true;
      },
    });
    //@ts-ignore
    window.lenis = lenis;
    setInstance(lenis);

    // Lenis et ScrollTrigger avancent sur la même horloge (celle de GSAP)
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = window.setTimeout(() => {
      ScrollTrigger.refresh();
      // Arrivée depuis une autre page sur une ancre (ex. /#faq depuis la page contact)
      const hash = window.location.hash;
      if (hash.length > 1 && document.querySelector(hash)) lenis.scrollTo(hash, { immediate: true });
    }, 100);

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setInstance(null);
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
  );
}
