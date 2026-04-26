import { SITE, ORGANIZATION_JSONLD } from "./site";

/** Build BreadcrumbList JSON-LD from an ordered list of segments. */
export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

/** Standard WebPage JSON-LD wrapping a page with the org as publisher. */
export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  type?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${SITE.url}${opts.path}#webpage`,
    url: `${SITE.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${SITE.url}/#website` },
    publisher: { "@id": `${SITE.url}/#organization` },
    primaryImageOfPage: opts.image
      ? { "@type": "ImageObject", url: `${SITE.url}${opts.image}` }
      : undefined,
    inLanguage: "en",
  };
}

/** FAQPage JSON-LD for SERP-rich FAQ snippets. */
export function faqJsonLd(
  faqs: { q: string; a: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Service JSON-LD per offering, linked back to the org. */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  serviceType: string;
  path?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    provider: { "@id": `${SITE.url}/#organization` },
    areaServed: ORGANIZATION_JSONLD.areaServed,
    url: opts.path ? `${SITE.url}${opts.path}` : undefined,
  };
}
