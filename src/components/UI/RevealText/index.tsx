"use client";
// Apparition des titres, identique sur tout le site : découpage mot par mot, chaque mot
// glisse dans son masque, avec un décalage (stagger), piloté par le scroll (scrub).
import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// -1 : les mots arrivent du haut et descendent à leur place. 1 : ils montent depuis le bas.
export const REVEAL_DIRECTION = -1;

interface RevealTextProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  start?: string;
  end?: string;
}

export default function RevealText({
  as = "h2",
  className = "",
  children,
  start = "top 95%",
  end = "top 65%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Découpage unique, une fois les polices chargées (mesures justes). Pas d'autoSplit :
    // les mots ne dépendent pas de la largeur, et le re-découpage automatique au chargement
    // des polices recréait des ScrollTrigger pendant un refresh, ce qui faisait planter GSAP.
    let cancelled = false;
    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      split = SplitText.create(el, { type: "words", mask: "words" });
      tween = gsap.fromTo(
        split.words,
        { yPercent: REVEAL_DIRECTION * 100 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start, end, scrub: 0.6 },
        },
      );
    });
    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, [start, end]);

  return createElement(as, { ref, className: `t-reveal ${className}` }, children);
}
