// Animation de forage : la page vibre pendant un défilement automatique vers une position.
import gsap from "gsap";
import type Lenis from "lenis";

const SHAKE_TARGET = "#page-content";

export function drillScroll(
  lenis: Lenis,
  target: number,
  onComplete?: () => void,
) {
  const shake = window.setInterval(() => {
    gsap.to(SHAKE_TARGET, {
      x: gsap.utils.random(-15, 15),
      y: gsap.utils.random(-12, 12),
      duration: 0.05,
      ease: "none",
    });
  }, 50);

  lenis.scrollTo(target, {
    duration: 1.6,
    lock: true, // l'utilisateur ne peut pas interrompre le forage
    force: true,
    easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    onComplete: () => {
      window.clearInterval(shake);
      // clearProps : aucun transform ne doit rester, même nul (il changerait le rendu de la page)
      gsap.to(SHAKE_TARGET, {
        x: 0,
        y: 0,
        duration: 0.15,
        ease: "power2.out",
        clearProps: "transform",
      });
      onComplete?.();
    },
  });
}
