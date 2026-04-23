import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts a Lenis smooth-scroll instance and drives a velocity-based motion
 * blur via the `--scroll-blur` CSS variable on <html>. Elements with the
 * `.scroll-blur` utility read that variable to apply a cinematic blur that
 * scales with scroll speed and decays smoothly when scrolling stops.
 *
 * Notes:
 * - We deliberately avoid using `filter: blur()` on containers that need
 *   `position: sticky` or `backdrop-filter` children (the navbar / glass
 *   cards) — the `.scroll-blur` utility is only applied to inner content.
 * - Honors `prefers-reduced-motion`: smooth scroll + blur are disabled.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.1,
    });

    const root = document.documentElement;

    let raf = 0;
    let currentBlur = 0;
    let targetBlur = 0;
    const MAX_BLUR = 2.5; // px — keep subtle; high values destroy text legibility
    const VELOCITY_SCALE = 0.0009; // tune: how quickly blur ramps with px/s
    const DECAY = 0.18; // how fast blur eases back toward target each frame

    function loop(time: number) {
      lenis.raf(time);

      // Smoothly approach the target blur so it decays naturally when the
      // user stops scrolling — no abrupt class toggles, no sticky timeouts.
      currentBlur += (targetBlur - currentBlur) * DECAY;
      // Snap tiny residuals to 0 to avoid permanent sub-pixel blur.
      if (Math.abs(currentBlur - targetBlur) < 0.01 && targetBlur === 0) {
        currentBlur = 0;
      }
      root.style.setProperty("--scroll-blur", `${currentBlur.toFixed(3)}px`);

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    const onScroll = ({ velocity }: { velocity: number }) => {
      const speed = Math.abs(velocity);
      targetBlur = Math.min(MAX_BLUR, speed * VELOCITY_SCALE);
    };

    // Reset target whenever Lenis finishes its inertial settle.
    const onSettle = () => {
      targetBlur = 0;
    };

    lenis.on("scroll", onScroll);
    // @ts-expect-error — Lenis emits "settle" but the type union is narrow
    lenis.on("settle", onSettle);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      root.style.removeProperty("--scroll-blur");
    };
  }, []);

  return null;
}
