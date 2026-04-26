import { useEffect } from "react";

interface DocumentMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  /** Canonical path relative to site origin (e.g. "/work"). */
  path?: string;
  /** Optional og:image URL. */
  image?: string;
  /** Optional JSON-LD structured data object. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_ORIGIN = "https://zihotech.com";
const DEFAULT_IMAGE = "/logo.png";

function setMetaByName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
  return el;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  return el;
}

/**
 * SPA-friendly document head manager. Updates <title>, description,
 * keywords, canonical, OpenGraph + Twitter tags, and optional JSON-LD
 * per route. We mutate (not remove) tags so the previous route's values
 * are simply overwritten on the next navigation.
 */
export function useDocumentMeta({
  title,
  description,
  keywords,
  path,
  image,
  jsonLd,
}: DocumentMeta) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (title) document.title = title;
    if (description) {
      setMetaByName("description", description);
      setMetaByProperty("og:title", title ?? document.title);
      setMetaByProperty("og:description", description);
      setMetaByName("twitter:title", title ?? document.title);
      setMetaByName("twitter:description", description);
    }
    if (keywords && keywords.length) {
      setMetaByName("keywords", keywords.join(", "));
    }
    const url = SITE_ORIGIN + (path ?? (typeof window !== "undefined" ? window.location.pathname : "/"));
    setLink("canonical", url);
    setMetaByProperty("og:url", url);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:site_name", "ZihoTech");
    const img = image ?? DEFAULT_IMAGE;
    const fullImg = img.startsWith("http") ? img : SITE_ORIGIN + img;
    setMetaByProperty("og:image", fullImg);
    setMetaByName("twitter:image", fullImg);
    setMetaByName("twitter:card", "summary_large_image");

    const scriptEls: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const el = document.createElement("script");
        el.type = "application/ld+json";
        el.text = JSON.stringify(item);
        el.setAttribute("data-route-jsonld", "true");
        document.head.appendChild(el);
        scriptEls.push(el);
      }
    }

    return () => {
      for (const el of scriptEls) {
        if (el.parentNode) el.parentNode.removeChild(el);
      }
    };
  }, [title, description, keywords?.join("|"), path, image, JSON.stringify(jsonLd)]);
}
