import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Resets scroll to the top whenever the pathname changes. Works alongside
 * Lenis smooth-scroll: if a Lenis instance is mounted on `window.__lenis`,
 * we stop its momentum and jump to 0 instantly so the new page always
 * starts from the top, not from the previous page's scroll offset.
 *
 * Hash links (e.g. /page#section) are preserved — we only force-scroll
 * when there is no hash target.
 */
export function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hash) return; // let the browser/router handle in-page anchors

    const lenis = window.__lenis;
    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.start();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}
