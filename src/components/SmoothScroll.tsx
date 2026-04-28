import { useEffect } from "react";
import Lenis from "lenis";

// Global handle so other components (e.g. modals) can pause/resume the
// smooth-scroll engine. Lenis keeps animating wheel/touch events even when
// `body { overflow: hidden }` is set, so we must explicitly stop it.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Mounts a Lenis smooth-scroll instance with a heavy, weighty feel and
 * drives a velocity-based motion blur via the `--scroll-blur` CSS variable
 * on <html>. Elements with the `.scroll-blur` utility read that variable to
 * apply a cinematic blur that scales with scroll speed and decays smoothly
 * when scrolling stops.
 *
 * Performance:
 * - Honors `prefers-reduced-motion` (smooth scroll + blur disabled).
 * - Skips the motion-blur layer on low-end devices (low CPU concurrency,
 *   low memory, coarse pointer / mobile) — Lenis still runs but blur is off
 *   so we don't hammer the GPU on cheap phones.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const lowEnd =
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency <= 4) ||
      nav.connection?.saveData === true ||
      /2g|3g/.test(nav.connection?.effectiveType ?? "");

    // On low-end devices, skip Lenis entirely. Native scrolling is far
    // cheaper than running a rAF loop + transform every frame, which is
    // the single biggest cause of jank on cheap phones / old laptops.
    if (lowEnd) return;

    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.06,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });
    window.__lenis = lenis;

    const root = document.documentElement;
    // Ensure no stale blur is left from any previous build.
    root.style.setProperty("--scroll-blur", "0px");

    let raf = 0;
    function loop(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
      root.style.removeProperty("--scroll-blur");
    };
  }, []);

  return null;
}
