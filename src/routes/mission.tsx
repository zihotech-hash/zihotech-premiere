import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Infinity as InfinityIcon,
  Sparkles,
} from "lucide-react";
import { FadeUp, Section, SectionHeading } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { SITE } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/mission")({
  component: MissionPage,
});

const PILLARS = [
  {
    Icon: Compass,
    title: "Engineering with intent",
    text: "Every architecture decision starts with a question, not a framework. We design systems for the next five years of your business — not the loudest tweet of the week.",
  },
  {
    Icon: Lightbulb,
    title: "AI as a tool, not a religion",
    text: "We use AI where it measurably moves the needle: cost, speed, or insight. Where a 50-line script outperforms a model, we ship the script.",
  },
  {
    Icon: ShieldCheck,
    title: "Production over prototypes",
    text: "Demo-grade AI is easy. We obsess over evaluation, guardrails, observability, and rollback — the unsexy 90% that keeps systems alive in production.",
  },
  {
    Icon: HeartHandshake,
    title: "Partnerships, not retainers",
    text: "We refuse engagements where we can't tell the truth. If your idea needs to change, we'll say it. Our reputation is the product.",
  },
];

const COMMITMENTS = [
  { metric: "< 24h", label: "First response, every inbound" },
  { metric: "100%", label: "Senior engineers, no juniors hidden behind PMs" },
  { metric: "0", label: "Lock-in clauses. Walk away any cycle." },
  { metric: "1:1", label: "Direct line to the engineer building your system" },
];

function MissionPage() {
  useDocumentMeta({
    title: "Our Mission — ZihoTech",
    description:
      "Why ZihoTech exists: building AI-first software with the rigor of an engineering org and the speed of a product team. Our principles, commitments, and the line we won't cross.",
    keywords: [
      "ZihoTech mission",
      "Ziho Tech values",
      "AI engineering principles",
      "responsible AI",
      "AI consultancy mission",
      ...SITE.keywords.slice(0, 12),
    ],
    path: "/mission",
    image: "/og/og-mission.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "@id": `${SITE.url}/mission#webpage`,
        name: "Our Mission — ZihoTech",
        url: `${SITE.url}/mission`,
        description:
          "ZihoTech's mission: AI-first software with engineering rigor and product-team speed.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        publisher: { "@id": `${SITE.url}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/og/og-mission.jpg`,
        },
        mainEntity: { "@id": `${SITE.url}/#organization` },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Mission", path: "/mission" },
      ]),
    ],
  });

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 bg-mesh opacity-80" />
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

        <motion.div
          aria-hidden
          className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-5xl px-6 md:px-10 text-center scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              <Sparkles className="h-3 w-3" /> Our Mission
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              Make AI <span className="text-gradient">earn its keep</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mx-auto mt-7 max-w-2xl text-base md:text-xl text-muted-foreground leading-relaxed">
              We build software that actually moves a business — not pitch decks dressed
              as products. Ziho Technologies exists to give serious operators a senior engineering
              team that ships AI-powered systems with the same rigor as a category leader.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* MANIFESTO */}
      <Section className="bg-surface/30 border-y border-border">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.25em] text-secondary font-semibold">
              Manifesto
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
              We don't sell <span className="text-gradient">hours</span>.<br />
              We sell <span className="text-gradient">leverage</span>.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The AI industry is full of people selling time. We're not interested.
                A six-month engagement that ships nothing is failure, regardless of
                how clean the timesheet is.
              </p>
              <p>
                <span className="text-foreground font-medium">Our unit of work is outcome</span> —
                a system in production, an automation saving hours, a feature that
                customers reach for. If we can deliver that in two weeks, we deliver
                in two weeks. If it takes a re-architecture, we say so out loud.
              </p>
              <p>
                We exist for founders, CTOs, and operators who'd rather have one
                senior team that owns the outcome than three vendors fighting over
                the spec.
              </p>
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* PILLARS */}
      <Section>
        <SectionHeading
          eyebrow="Principles"
          title={<>The four <span className="text-gradient">non-negotiables</span></>}
          subtitle="These are the rules we use to decide what to take on, how to build it, and when to walk away."
        />
        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl glass p-7 md:p-8 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient/10 border border-secondary/30">
                  <p.Icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{p.text}</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* COMMITMENTS */}
      <Section className="bg-surface/30 border-y border-border">
        <SectionHeading
          eyebrow="Commitments"
          title={<>What we <span className="text-gradient">guarantee</span></>}
          subtitle="Concrete, measurable promises — not aspirational fluff."
        />
        <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass p-7 text-center"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-gradient leading-none">
                {c.metric}
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* THE LINE */}
      <Section>
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-16">
            <div className="absolute inset-0 bg-mesh opacity-50" />
            <div className="absolute inset-0 bg-dots opacity-30" />
            <div className="relative grid gap-10 md:grid-cols-[auto_1fr] md:gap-14 items-start">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient/10 border border-primary/30 glow-primary">
                <InfinityIcon className="h-7 w-7 text-secondary" />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
                  The line we <span className="text-gradient">won't cross</span>.
                </h2>
                <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  We don't ship surveillance products, dark patterns, or AI systems
                  designed to manipulate the people they serve. If the brief asks us
                  to engineer against the user, we politely decline and refund the
                  deposit. There are projects we want, and there are projects we'll
                  refuse — and we'd rather say no early than be ashamed later.
                </p>
                <div className="mt-8">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:gap-2.5 transition-all"
                  >
                    Have a project that fits? Let's talk <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <FadeUp>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold">
              Ready to build something <span className="text-gradient">worth shipping?</span>
            </h2>
            <div className="mt-8 flex justify-center">
              <CTAButton to="/contact">
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </CTAButton>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
