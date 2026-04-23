import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a Lenis smooth-scroll instance and adds an `is-scrolling` class to
 * <html> while the user is actively scrolling — used to apply the cinematic
 * motion-blur effect on `.scroll-blur` content.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const root = document.documentElement;
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      root.classList.add("is-scrolling");
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => root.classList.remove("is-scrolling"), 120);
    };

    lenis.on("scroll", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      lenis.destroy();
      root.classList.remove("is-scrolling");
    };
  }, []);

  return null;
}
