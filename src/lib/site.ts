export const SITE = {
  name: "ZihoTech",
  legalName: "Ziho Technologies",
  tagline: "AI-first software engineering for ambitious businesses.",
  email: "info.zihotech@gmail.com",
  phoneRaw: "+923244793027",
  url: "https://zihotechnologies.com",
  logo: "/logo.png",
  founded: "2021",
  /**
   * Primary keyword set used across SEO meta tags and JSON-LD.
   */
  keywords: [
    "Ziho",
    "Ziho Tech",
    "ZihoTech",
    "Ziho Technologies",
    "ZihoTech AI",
    "ZihoTech software",
    "AI engineering company",
    "AI development agency",
    "AIOps",
    "MLOps",
    "LLM engineering",
    "RAG pipelines",
    "AI consulting",
    "enterprise AI",
    "AI automation",
    "AI integration",
    "OpenAI integration",
    "LangChain development",
    "vector database",
    "AI agents",
    "generative AI",
    "machine learning consulting",
    "custom software development",
    "web application development",
    "mobile app development",
    "React development",
    "Next.js development",
    "Python AI development",
    "FastAPI",
    "Node.js development",
    "SaaS development",
    "MVP development",
    "enterprise software",
    "B2B SaaS",
    "fractional engineering",
    "software agency",
    "software company",
    "software solutions",
    "computer science company",
    "software consulting US",
    "software consulting EU",
    "software consulting UK",
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/ziho-technologies/",
    instagram:
      "https://www.instagram.com/zihotech?igsh=MWljcWxhZmcydXVzag%3D%3D&utm_source=qr",
    facebook: "https://www.facebook.com/share/1CZbYrgHLh/?mibextid=wwXIfr",
    whatsapp: "https://wa.me/923244793027",
    calendly: "https://calendly.com/zihotech/discovery",
  },
  address: {
    country: "PK",
    region: "Punjab",
    locality: "Lahore",
  },
};

/**
 * Canonical Organization JSON-LD — single source of truth for all pages.
 * Includes ProfessionalService type, ContactPoint, address, founder details
 * and consistent social URLs to maximize E-E-A-T and brand entity signals.
 */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.legalName,
  alternateName: ["ZihoTech", "Ziho Tech", "Ziho", "Ziho Technologies"],
  legalName: SITE.legalName,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.url}/logo.png`,
  email: SITE.email,
  telephone: SITE.phoneRaw,
  foundingDate: SITE.founded,
  description:
    "ZihoTech (Ziho Technologies) is an AI-first software engineering company building enterprise-grade AI, web, and mobile products for businesses across the US, EU, and UK. Services include AI engineering, AIOps, RAG, LLM integration, custom software, and SaaS development.",
  slogan: SITE.tagline,
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "European Union" },
    { "@type": "Place", name: "Worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: SITE.address.country,
    addressRegion: SITE.address.region,
    addressLocality: SITE.address.locality,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      telephone: SITE.phoneRaw,
      availableLanguage: ["English"],
      areaServed: ["US", "GB", "EU", "Worldwide"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: SITE.social.calendly,
      availableLanguage: ["English"],
    },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AIOps",
    "MLOps",
    "Machine Learning",
    "LLM Engineering",
    "Retrieval Augmented Generation",
    "RAG",
    "Generative AI",
    "AI Agents",
    "Software Engineering",
    "Web Development",
    "Mobile Development",
    "SaaS Development",
    "Custom Software Development",
    "Enterprise Software",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "Node.js",
    "LangChain",
  ],
  sameAs: [
    SITE.social.linkedin,
    SITE.social.instagram,
    SITE.social.facebook,
  ],
};

/** Per-route SEO metadata used for both runtime + build-time injection. */
export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: "/",
    title:
      "ZihoTech — AI-First Software Engineering | Ziho Technologies",
    description:
      "ZihoTech (Ziho Technologies) builds enterprise-grade AI, web, and mobile software. AI engineering, AIOps, RAG, LLM integration, and custom software for the US, EU, and UK.",
    image: "/og/og-home.jpg",
  },
  {
    path: "/services",
    title:
      "Services — AI, Web, Mobile & Custom Software | ZihoTech",
    description:
      "Web, mobile, AI development, AI engineering, AIOps, and custom software — built by senior engineers at ZihoTech (Ziho Technologies).",
    image: "/og/og-services.jpg",
  },
  {
    path: "/work",
    title: "Our Work — AI, Web & Mobile Case Studies | ZihoTech",
    description:
      "Real ZihoTech client work — AI platforms, generative tools, marketplaces, EdTech, healthcare, Web3 and SaaS. Live URLs, real outcomes.",
    image: "/og/og-work.jpg",
  },
  {
    path: "/mission",
    title: "Our Mission — ZihoTech",
    description:
      "Why ZihoTech exists: building AI-first software with the rigor of an engineering org and the speed of a product team.",
    image: "/og/og-mission.jpg",
  },
  {
    path: "/about",
    title: "About ZihoTech — Senior AI & Software Engineering Team",
    description:
      "ZihoTech (Ziho Technologies) was founded in 2021 to build software that actually works. A lean, senior team of AI engineers serving the US, EU, and UK.",
    image: "/og/og-about.jpg",
  },
  {
    path: "/contact",
    title: "Contact ZihoTech — Start an AI or Software Project",
    description:
      "Tell us about your project. ZihoTech responds within 24 hours, US/EU/UK timezones. AI engineering, AIOps, web, mobile, and custom software.",
    image: "/og/og-contact.jpg",
  },
];
