"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
// CSS officiel : bloque le scroll natif quand Lenis est stoppé (menu, popins)
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    });
    //@ts-ignore
    window.lenis = lenis;
    setInstance(lenis);

    // Lenis et ScrollTrigger avancent sur la même horloge (celle de GSAP)
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      window.clearTimeout(refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setInstance(null);
    };
  }, [pathname]);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}
