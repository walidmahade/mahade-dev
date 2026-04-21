import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let mounted = true;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!mounted) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        if (heroItems.length) {
          gsap.from(heroItems, {
            y: 12,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          });
        }

        const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        const viewportH = window.innerHeight;
        revealItems.forEach((el) => {
          // Skip animation for items already in the viewport on load.
          // CSS defaults keep them visible. This prevents blank sections
          // if ScrollTrigger hasn't initialized yet (e.g. during
          // pre-render screenshots or slow first paint).
          if (el.getBoundingClientRect().top < viewportH * 0.9) return;

          gsap.from(el, {
            y: 16,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });
      });
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  return null;
}
