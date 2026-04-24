import { useEffect } from "react";
import Lenis from "lenis";

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

    // Heuristic for "low-end" — coarse pointer (most phones) or very limited
    // hardware. Smooth scroll stays on, but velocity-blur is bypassed so the
    // page stays responsive on cheap devices.
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const lowEnd =
      window.matchMedia("(pointer: coarse)").matches ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency <= 4);

    // Heavier scroll feel: longer duration + lower lerp = more inertia,
    // like dragging a weighted page.
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.06,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const root = document.documentElement;

    let raf = 0;
    let currentBlur = 0;
    let targetBlur = 0;
    // Stronger cap than before, but still under the legibility cliff.
    const MAX_BLUR = lowEnd ? 0 : 5;
    const VELOCITY_SCALE = 0.0018; // ramps blur a bit faster
    const DECAY = 0.16;            // slightly slower decay = lingering trail

    function loop(time: number) {
      lenis.raf(time);

      if (MAX_BLUR > 0) {
        currentBlur += (targetBlur - currentBlur) * DECAY;
        if (Math.abs(currentBlur - targetBlur) < 0.01 && targetBlur === 0) {
          currentBlur = 0;
        }
        root.style.setProperty("--scroll-blur", `${currentBlur.toFixed(3)}px`);
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onScroll = ({ velocity }: { velocity: number }) => {
      if (MAX_BLUR === 0) return;
      const speed = Math.abs(velocity);
      targetBlur = Math.min(MAX_BLUR, speed * VELOCITY_SCALE);
    };

    const onSettle = () => {
      targetBlur = 0;
    };

    lenis.on("scroll", onScroll);
    // @ts-expect-error — Lenis emits "settle" but the type union is narrow
    lenis.on("settle", onSettle);

    // Ensure low-end devices never inherit a stale blur value.
    if (MAX_BLUR === 0) {
      root.style.setProperty("--scroll-blur", "0px");
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      root.style.removeProperty("--scroll-blur");
    };
  }, []);

  return null;
}
