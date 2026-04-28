import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Rocket, Heart } from "lucide-react";
import { FadeUp, Section, SectionHeading } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { SITE, ORGANIZATION_JSONLD } from "@/lib/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});



const STACK_GROUPS = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "TypeScript"],
  },
  {
    label: "Backend",
    items: ["Python", "FastAPI", "Django", "Node.js", "GraphQL"],
  },
  {
    label: "AI / ML",
    items: ["OpenAI", "LangChain", "LangGraph", "FAISS", "HuggingFace"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "GCP", "AWS", "Vercel", "PostgreSQL"],
  },
];

const VALUES = [
  { title: "Ownership", text: "We own the outcome, not just the ticket.", Icon: Award },
  { title: "Speed", text: "We ship in weeks, not quarters — without cutting corners.", Icon: Rocket },
  { title: "Honesty", text: "If something is the wrong call, we say so.", Icon: Heart },
];

function AboutPage() {
  useDocumentMeta({
    title: "About Ziho Technologies (ZihoTech) — Senior AI & Software Engineering Team",
    description:
      "ZihoTech (Ziho Technologies) was founded in 2021 to build software that actually works. A lean, senior team of AI engineers and product builders serving US, EU, and UK.",
    keywords: [
      "About ZihoTech",
      "Ziho Tech team",
      "Ziho Technologies",
      "AI engineering team",
      "senior software engineers",
      "AI consultancy team",
      "AIOps team",
      ...SITE.keywords.slice(0, 12),
    ],
    path: "/about",
    image: "/og/og-about.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE.url}/about#webpage`,
        url: `${SITE.url}/about`,
        name: "About ZihoTech",
        description:
          "About Ziho Technologies — a senior AI and software engineering team.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        publisher: { "@id": `${SITE.url}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/og/og-about.jpg`,
        },
        mainEntity: ORGANIZATION_JSONLD,
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });
  return (
    <>
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              About Ziho Technologies
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
              Built to Solve <span className="text-gradient">Hard Problems</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-7 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Ziho Technologies was founded with one goal — to build software that actually works.
              We're a lean, senior team of engineers and AI specialists who've shipped
              products across industries. We don't do bloated retainers or endless meetings.
              We build, we ship, we deliver.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Mission */}
      <Section className="pt-4 md:pt-8">
        <FadeUp>
          <div className="relative rounded-2xl border-l-4 border-secondary glass p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.25em] text-secondary font-medium">
              Our Mission
            </p>
            <p className="mt-4 text-xl md:text-3xl font-semibold leading-snug max-w-4xl">
              To make enterprise-grade AI and software accessible to businesses that want to
              <span className="text-gradient"> move fast without breaking things</span>.
            </p>
          </div>
        </FadeUp>
      </Section>


      {/* Stack */}
      <Section>
        <SectionHeading
          eyebrow="Stack"
          title={<>Technologies <span className="text-gradient">We Trust</span></>}
          subtitle="A pragmatic, modern toolset. We pick what fits — not what's trending."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STACK_GROUPS.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass p-6"
            >
              <h3 className="text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                {g.label}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="text-sm text-foreground/90">
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-surface/30 border-y border-border">
        <SectionHeading
          eyebrow="Values"
          title={<>What We <span className="text-gradient">Stand For</span></>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass p-7"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient/10 border border-secondary/30">
                <v.Icon className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section>
        <FadeUp>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold">
              Want to <span className="text-gradient">work with us?</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <CTAButton to="/contact">
                Start a Project <ArrowRight className="h-4 w-4" />
              </CTAButton>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
