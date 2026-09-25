// « [Forer la page] » : la page vibre pendant qu'elle défile jusqu'à la section cible.
import gsap from "gsap";

type LenisLike = {
  scrollTo: (
    target: Element,
    options: { duration: number; onComplete: () => void },
  ) => void;
};

export function drillTo(selector: string) {
  const target = document.querySelector(selector);
  const lenis = (window as Window & { lenis?: LenisLike }).lenis;
  if (!target || !lenis) return;

  const shake = window.setInterval(() => {
    gsap.to(document.body, {
      x: gsap.utils.random(-15, 15),
      y: gsap.utils.random(-12, 12),
      duration: 0.05,
      ease: "none",
    });
  }, 50);

  lenis.scrollTo(target, {
    duration: 1.2,
    onComplete: () => {
      window.clearInterval(shake);
      gsap.to(document.body, {
        x: 0,
        y: 0,
        duration: 0.15,
        ease: "power2.out",
      });
    },
  });
}
