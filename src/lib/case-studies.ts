export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  type: "Web" | "Mobile" | "AI";
  problem: string;
  result: string;
  stack: string[];
  url: string;
};

/**
 * Real ZihoTech client engagements. AI / data projects are listed first
 * so they always surface at the top of the work grid.
 */
export const CASE_STUDIES: CaseStudy[] = [
  // ── AI-FIRST ──────────────────────────────────────────────────────────────
  {
    slug: "openklass",
    name: "Open Klass",
    industry: "EdTech",
    type: "AI",
    problem:
      "ACHIEVEMOR needed an AI co-pilot that lets domain experts spin up production-ready courses without learning an LMS. We built an LLM-driven course creator with a chatbot interface that turns rough notes into structured curricula.",
    result: "Course authoring time cut by ~80%",
    stack: ["OpenAI", "LangChain", "Next.js", "PostgreSQL"],
    url: "https://openklass.ai/",
  },
  {
    slug: "muralcolor",
    name: "Mural Color",
    industry: "Generative AI",
    type: "AI",
    problem:
      "An interior brand wanted homeowners to generate custom murals from a text prompt — and order them as physical prints. We shipped a generative pipeline that converts prompts into print-ready, scaled mural artwork.",
    result: "Live generative-to-print pipeline",
    stack: ["Diffusion Models", "Python", "FastAPI", "React"],
    url: "https://underconstruction.muralcolor.com/",
  },
  {
    slug: "asg-course-creator",
    name: "Access AI Course Creator",
    industry: "EdTech / AI",
    type: "AI",
    problem:
      "Trainers on the Boost|Bridge platform needed a faster way to translate expertise into structured, interactive learning. We built an AI authoring layer that drafts lessons, quizzes, and assessments from a few prompts.",
    result: "Trainers ship full courses in days, not weeks",
    stack: ["LLM", "Node.js", "React", "PostgreSQL"],
    url: "http://asg.today/",
  },
  {
    slug: "episource",
    name: "Episource",
    industry: "Healthcare Risk Adjustment",
    type: "AI",
    problem:
      "Episource serves payers and providers across the risk-adjustment continuum. We helped modernize the front-end experience and integrate intelligent workflows that surface insights buried inside clinical data.",
    result: "Faster, clearer risk-adjustment workflows",
    stack: ["WordPress", "React", "AI Workflows", "WP Engine"],
    url: "https://episourcenew.wpenginepowered.com/",
  },

  {
    slug: "ai-sales-chatbot",
    name: "AI Sales Automation Chatbot",
    industry: "Wholesale / AI Automation",
    type: "AI",
    problem:
      "A wholesale client needed to eliminate manual sales rep workload across their entire order pipeline. We built an autonomous WhatsApp AI agent that handles customer inquiries, negotiates pricing, collects order and delivery details, processes orders, dispatches receipts, and logs all entries into the CRM — end to end.",
    result: "Full sales pipeline automated — zero manual rep involvement",
    stack: ["FastAPI", "OpenAI", "Twilio", "DigitalOcean"],
    url: "#",
  },

  // ── WEB / SOFTWARE ────────────────────────────────────────────────────────
  {
    slug: "devryte",
    name: "Devryte",
    industry: "B2B Services",
    type: "Web",
    problem:
      "Devryte needed a premium marketing presence that communicated three offerings — team augmentation, software development, and AI development — without diluting any of them. We delivered a fast, conversion-focused site.",
    result: "Higher qualified-lead conversion at launch",
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    url: "https://devryte.com/",
  },
  {
    slug: "petserv",
    name: "PetServ",
    industry: "Pet Marketplace",
    type: "Web",
    problem:
      "PetServ wanted a discovery platform for pet attractions, services, and activities across Chile. We built a search-first marketplace with provider profiles, location filtering, and a clean booking funnel.",
    result: "Nationwide pet-services marketplace launched",
    stack: ["React", "Node.js", "PostgreSQL", "Maps APIs"],
    url: "https://www.petserv.cl/",
  },
  {
    slug: "home123",
    name: "Home",
    industry: "Real Estate / Fintech",
    type: "Web",
    problem:
      "Home123 helps American families navigate financing, search, and personalization in one journey. We delivered the digital experience that walks buyers through loan, listing, and customization in three guided steps.",
    result: "Unified pathway-to-homeownership experience",
    stack: ["Next.js", "Node.js", "Mortgage APIs", "PostgreSQL"],
    url: "https://home123.com/",
  },
  {
    slug: "delta",
    name: "Delta International",
    industry: "Recruitment",
    type: "Web",
    problem:
      "A leading Pakistani recruitment agency needed a credibility-driven web presence to attract overseas employers and skilled candidates. We rebuilt their platform around trust signals, industry verticals, and applicant flow.",
    result: "Stronger global employer pipeline",
    stack: ["WordPress", "Custom PHP", "MySQL", "SEO"],
    url: "https://www.ditrc.com/",
  },
  {
    slug: "prokey",
    name: "Pro Key",
    industry: "E-commerce / Automotive",
    type: "Web",
    problem:
      "Keyless Canada sells replacement key fobs across thousands of vehicle SKUs. We delivered a fast, structured catalog with vehicle-aware part matching so customers find the right key the first time.",
    result: "Higher conversion via accurate part matching",
    stack: ["Shopify", "Custom Apps", "Node.js"],
    url: "https://keylesscanada.com/",
  },
  {
    slug: "directkitchen",
    name: "Direct Kitchen Equipment",
    industry: "B2B E-commerce",
    type: "Web",
    problem:
      "A commercial kitchen-equipment supplier needed a catalog that buyers could trust under high-stakes purchasing decisions. We rebuilt the storefront with structured product data, fast filtering, and quote workflows.",
    result: "Streamlined high-ticket B2B catalog",
    stack: ["Shopify", "Custom Theme", "Liquid", "Node.js"],
    url: "https://directkitchenequip.com/",
  },
  {
    slug: "lumturo",
    name: "Lumturo Academy",
    industry: "Corporate Learning",
    type: "Web",
    problem:
      "An Italian L&D firm wanted a refined catalog where corporate buyers could browse, filter, and request training programs across leadership, digital, and behavioral skills. We delivered a polished bilingual catalog UX.",
    result: "Multilingual catalog with frictionless lead capture",
    stack: ["WordPress", "Custom Plugins", "i18n", "Schema.org"],
    url: "https://lumturo.academy/it/offerte/catalogo/",
  },
  {
    slug: "sapphirechain",
    name: "Sapphire Chain",
    industry: "Web3 / Fintech",
    type: "Web",
    problem:
      "Blue Sapphire Trading wanted a credibility-first web presence for a cryptocurrency backed by precious gemstones. We built a wallet-aware marketing site for a regulated, investor-facing audience.",
    result: "Investor-grade Web3 presence shipped",
    stack: ["React", "Web3.js", "Solidity", "Node.js"],
    url: "https://sapphirechain.group/",
  },
  {
    slug: "sapphire-nft",
    name: "BIO Sapphire NFT Marketplace",
    industry: "Web3 / NFT",
    type: "Web",
    problem:
      "BST Group needed a full NFT marketplace — minting, listing, owning, staking — that felt as polished as a top-tier marketplace but bound to their own gemstone-backed assets.",
    result: "End-to-end NFT marketplace with staking",
    stack: ["React", "Solidity", "Ethers.js", "IPFS", "Node.js"],
    url: "https://marketplace.sapphirechain.group/",
  },
  {
    slug: "tayarishayari",
    name: "TayariShayari",
    industry: "EdTech",
    type: "Web",
    problem:
      "A full-featured entry test preparation platform for Pakistani university aspirants. Covers NUST, FAST, LUMS, GIKI and more — with 10,000+ MCQs, timed mock tests, past papers, and aggregate calculators. Built to serve thousands of FSc students navigating Pakistan's competitive admissions landscape.",
    result: "Thousands of students served across Pakistan's top entry tests",
    stack: ["React", "Supabase", "PostgreSQL", "Vercel"],
    url: "https://tayarishayari.com/",
  },
  {
    slug: "streetapp",
    name: "StreetApp",
    industry: "C2C Marketplace / Mobile",
    type: "Mobile",
    problem:
      "A landing page and marketing site for StreetApp — an AI-powered local marketplace mobile app available on iOS and Android. The site showcases the app's core AI listing generation feature, community-driven local selling model, and drives app store conversions. Clean, mobile-first single-page design.",
    result: "Mobile-first marketing site driving iOS & Android installs",
    stack: ["React", "TypeScript", "Vercel"],
    url: "https://streetapp.com/",
  },
  {
    slug: "juraab",
    name: "Juraab Shop",
    industry: "E-commerce",
    type: "Web",
    problem:
      "A custom high-performance e-commerce platform engineered to outperform Shopify and WordPress on page load speed — achieving ~60% faster load times. Built for ad-driven traffic where milliseconds directly impact conversions, with lazy loading, cost-optimised data fetching, and a lean architecture from the ground up.",
    result: "~60% faster load times vs. Shopify/WordPress baselines",
    stack: ["React", "Node.js", "Supabase", "Vercel"],
    url: "https://juraab.shop/",
  },
];

