import { useEffect } from "react";

interface DocumentMeta {
  title?: string;
  description?: string;
}

/**
 * SPA-friendly document head manager. Sets <title> and meta description
 * per-route. Restores defaults on unmount so route changes work cleanly.
 */
export function useDocumentMeta({ title, description }: DocumentMeta) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prevTitle = document.title;

    if (title) document.title = title;

    let metaEl: HTMLMetaElement | null = null;
    let prevDescription: string | null = null;
    if (description) {
      metaEl = document.querySelector('meta[name="description"]');
      if (!metaEl) {
        metaEl = document.createElement("meta");
        metaEl.setAttribute("name", "description");
        document.head.appendChild(metaEl);
      }
      prevDescription = metaEl.getAttribute("content");
      metaEl.setAttribute("content", description);
    }

    return () => {
      document.title = prevTitle;
      if (metaEl && prevDescription !== null) {
        metaEl.setAttribute("content", prevDescription);
      }
    };
  }, [title, description]);
}
