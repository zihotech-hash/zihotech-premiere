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

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const lowEnd =
      window.matchMedia("(pointer: coarse)").matches ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" &&
        nav.hardwareConcurrency <= 4);

    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.06,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    const root = document.documentElement;

    // ── Blur engine ──────────────────────────────────────────────────────────
    // Compute velocity from lenis.scroll delta per RAF frame — reliable
    // regardless of what unit Lenis reports for its own velocity property.
    //   delta  = px moved this frame  (typically 0–25 for smooth scroll)
    //   SCALE  = px of blur per px of delta
    //   MAX    = blur cap in px
    //   DECAY  = lerp factor each frame (smaller = longer trail)
    const MAX_BLUR   = lowEnd ? 0 : 4;
    const SCALE      = 0.15;  // 20 px/frame → ~3 px blur (fast scroll)
    const DECAY      = 0.10;  // trail lingers ~30 frames after stopping

    let raf         = 0;
    let prevScroll  = lenis.scroll;
    let currentBlur = 0;

    function loop(time: number) {
      lenis.raf(time);

      if (MAX_BLUR > 0) {
        const currScroll = lenis.scroll;
        const delta      = Math.abs(currScroll - prevScroll);
        prevScroll       = currScroll;

        const targetBlur = Math.min(MAX_BLUR, delta * SCALE);
        currentBlur     += (targetBlur - currentBlur) * DECAY;

        // Snap cleanly to zero — never hold a stale tiny value.
        if (currentBlur < 0.02) currentBlur = 0;

        root.style.setProperty("--scroll-blur", `${currentBlur.toFixed(3)}px`);
      }

      raf = requestAnimationFrame(loop);
    }

    // Let Lenis settle one tick before recording prevScroll so we don't
    // spike the blur on initial mount.
    raf = requestAnimationFrame((t) => {
      lenis.raf(t);
      prevScroll = lenis.scroll;
      raf = requestAnimationFrame(loop);
    });

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
