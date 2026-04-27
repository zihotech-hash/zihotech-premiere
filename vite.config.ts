import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import fs from "node:fs/promises";

const SITE_URL = "https://zihotechnologies.com";

interface RouteSeo {
  path: string;
  title: string;
  description: string;
  image: string;
  faqs?: { q: string; a: string }[];
}

/**
 * Per-route SEO injected into static HTML at build time. This means
 * Googlebot, Bingbot, LinkedInBot, Twitterbot, WhatsApp, etc. ALL see
 * route-specific titles/descriptions/og:image without needing JS execution.
 */
const ROUTES: RouteSeo[] = [
  {
    path: "/",
    title: "ZihoTech — AI-First Software Engineering | Ziho Technologies",
    description:
      "ZihoTech (Ziho Technologies) builds enterprise-grade AI, web, and mobile software. AI engineering, AIOps, RAG, LLM integration, and custom software for the US, EU, and UK.",
    image: "/og/og-home.jpg",
    faqs: [
      {
        q: "What does ZihoTech (Ziho Technologies) do?",
        a: "ZihoTech is an AI-first software engineering company that builds web, mobile, and AI products for businesses. Our services span AI engineering, AIOps, RAG and LLM integration, custom software, SaaS, and MVP development.",
      },
      {
        q: "Where is ZihoTech based and which regions do you serve?",
        a: "ZihoTech is headquartered in Lahore, Pakistan, and works async-first across US, EU, and UK timezones. We collaborate with founders and enterprises worldwide.",
      },
      {
        q: "What is AIOps and do you provide AIOps services?",
        a: "AIOps (Artificial Intelligence for IT Operations) uses ML and AI to automate and improve IT operations such as monitoring, incident response, and capacity planning. Yes, ZihoTech designs and ships production-grade AIOps and MLOps pipelines.",
      },
      {
        q: "How fast can ZihoTech ship a project to production?",
        a: "Most engagements go from kickoff to first production deploy in 2 to 6 weeks. Larger systems are broken into shippable milestones rather than one big-bang release.",
      },
      {
        q: "Do you build with React, Next.js, Python and FastAPI?",
        a: "Yes. Our default stack includes React, Next.js, React Native, Tailwind, TypeScript, Python, FastAPI, Node.js, PostgreSQL, OpenAI, LangChain, and the major cloud providers (AWS, GCP, Vercel).",
      },
    ],
  },
  {
    path: "/services",
    title: "Services — AI, Web, Mobile & Custom Software | ZihoTech",
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRouteHtml(template: string, route: RouteSeo): string {
  const url = `${SITE_URL}${route.path}`;
  const fullImg = `${SITE_URL}${route.image}`;
  const title = escapeHtml(route.title);
  const desc = escapeHtml(route.description);

  // Replace title
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${title}</title>`,
  );

  // Replace description
  html = html.replace(
    /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${desc}" />`,
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/>/,
    `<link rel="canonical" href="${url}" />`,
  );

  // Replace og:title / og:description / og:url / og:image
  html = html.replace(
    /<meta\s+property="og:title"[^>]*\/>/,
    `<meta property="og:title" content="${title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*\/>/,
    `<meta property="og:description" content="${desc}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:url"[^>]*\/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:image"[^>]*\/>/,
    `<meta property="og:image" content="${fullImg}" />`,
  );

  // Twitter
  html = html.replace(
    /<meta\s+name="twitter:title"[^>]*\/>/,
    `<meta name="twitter:title" content="${title}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:description"[^>]*\/>/,
    `<meta name="twitter:description" content="${desc}" />`,
  );
  html = html.replace(
    /<meta\s+name="twitter:image"[^>]*\/>/,
    `<meta name="twitter:image" content="${fullImg}" />`,
  );

  // Inject route-specific JSON-LD (WebPage + Breadcrumb + optional FAQ)
  const segments = route.path.split("/").filter(Boolean);
  const breadcrumbItems = [
    { name: "Home", item: SITE_URL + "/" },
    ...segments.map((seg, i) => ({
      name: seg.charAt(0).toUpperCase() + seg.slice(1),
      item: `${SITE_URL}/${segments.slice(0, i + 1).join("/")}`,
    })),
  ];

  const blocks: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: fullImg,
        width: 1200,
        height: 630,
      },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
  ];

  if (route.faqs && route.faqs.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: route.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  const ldScripts = blocks
    .map(
      (b) =>
        `<script type="application/ld+json">${JSON.stringify(b)}</script>`,
    )
    .join("\n    ");

  // Inject before </head>
  html = html.replace("</head>", `    ${ldScripts}\n  </head>`);

  return html;
}

/**
 * Vite plugin: after the SPA build, write per-route static HTML files
 * (e.g. dist/services/index.html) with that route's SEO baked in.
 * Vercel/static hosts will serve the matching file directly when a
 * crawler requests /services, /work, etc. — giving them full
 * route-specific title/description/OG/JSON-LD without JS execution.
 */
function seoPrerenderPlugin(): Plugin {
  return {
    name: "ziho-seo-prerender",
    apply: "build",
    async closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const indexPath = path.join(distDir, "index.html");
      let template: string;
      try {
        template = await fs.readFile(indexPath, "utf-8");
      } catch {
        // dist not built — nothing to do.
        return;
      }

      for (const route of ROUTES) {
        const html = buildRouteHtml(template, route);
        if (route.path === "/") {
          await fs.writeFile(indexPath, html, "utf-8");
        } else {
          const dir = path.join(distDir, route.path.replace(/^\//, ""));
          await fs.mkdir(dir, { recursive: true });
          await fs.writeFile(path.join(dir, "index.html"), html, "utf-8");
        }
      }
      // eslint-disable-next-line no-console
      console.log(
        `[ziho-seo-prerender] Wrote ${ROUTES.length} SEO-optimized HTML files.`,
      );
    },
  };
}

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
    seoPrerenderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
