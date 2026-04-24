import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Globe2,
  Layers,
  Sparkles,
  Zap,
  Star,
  Gauge,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { FadeUp, Section, SectionHeading } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { Typewriter } from "@/components/Typewriter";
import { CASE_STUDIES } from "@/lib/case-studies";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { SITE } from "@/lib/site";
import heroVideo from "/hero-bg.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const ROTATING_HEADLINES = [
  "Moves Your Business Forward.",
  "Turns AI Hype Into Real Leverage.",
  "Outlasts Your Next Funding Round.",
  "Engineers Trust, One Release at a Time.",
  "Ships in Weeks, Not Quarters.",
];

const WHY = [
  { title: "Timezone-Flexible", text: "We work async and sync across US, EU, and UK timezones — no missed handoffs.", Icon: Globe2 },
  { title: "End-to-End Ownership", text: "From architecture to deployment, we own the full stack and the outcome.", Icon: Layers },
  { title: "AI-First Mindset", text: "Every solution we build considers where AI can add real, measurable value.", Icon: Sparkles },
  { title: "Fast Delivery, Zero Bloat", text: "Lean teams, clear milestones, no agency fluff or padded retainers.", Icon: Zap },
];

const PARTNER_STATS = [
  { Icon: Gauge, metric: "2–6 wks", label: "From kickoff to first production deploy" },
  { Icon: Users2, metric: "100%", label: "Senior engineers, no junior shadow team" },
  { Icon: ShieldCheck, metric: "24h", label: "Average response from your engineer, not a PM" },
  { Icon: Sparkles, metric: "13+", label: "Live products shipped across AI, Web & Mobile" },
];

const TESTIMONIALS = [
  {
    quote:
      "ZihoTech shipped what our previous agency promised in six months — in six weeks. Genuinely senior engineers.",
    name: "Sarah Lindqvist",
    title: "VP of Product",
    company: "NorthArc Logistics",
  },
  {
    quote:
      "They built our RAG pipeline like product engineers, not consultants. Evals, guardrails, the whole thing — production grade.",
    name: "Marcus Chen",
    title: "CTO",
    company: "Verdantly",
  },
  {
    quote:
      "Zero hand-holding required. They scoped, executed, and handed over a clean codebase. That's rare.",
    name: "Priya Anand",
    title: "Head of Engineering",
    company: "Ledgerline",
  },
];

function HomePage() {
  useDocumentMeta({
    title: "ZihoTech — AI-First Software Engineering for Ambitious Businesses",
    description:
      "ZihoTech (Ziho Technologies) builds enterprise-grade AI, web, and mobile software for startups and businesses that need to ship fast. AI engineering, AIOps, RAG, LLM integration, and custom software — delivered by senior engineers across US, EU, and UK timezones.",
    keywords: SITE.keywords,
    path: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.legalName,
        alternateName: ["ZihoTech", "Ziho Tech", "Ziho"],
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        email: SITE.email,
        sameAs: [
          SITE.social.linkedin,
          SITE.social.github,
          SITE.social.twitter,
        ],
        description:
          "ZihoTech is an AI-first software engineering studio building web, mobile, and AI products for businesses across the US, EU, and UK.",
        areaServed: ["United States", "European Union", "United Kingdom"],
        knowsAbout: [
          "Artificial Intelligence",
          "AIOps",
          "Machine Learning",
          "LLM Engineering",
          "RAG",
          "Software Engineering",
          "Web Development",
          "Mobile Development",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "ZihoTech",
        url: SITE.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE.url}/work?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  });

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          poster=""
        />
        {/* Layered overlays for legibility on both themes */}
        <div className="absolute inset-0 bg-background/70 dark:bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

        {/* floating orbs */}
        <motion.div
          aria-hidden
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-24 h-[480px] w-[480px] rounded-full bg-secondary/15 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl w-full px-6 md:px-10 py-16 md:py-24 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              AI &amp; Software Engineering · US · EU · UK
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-5xl">
              We Build the Software That{" "}
              <br className="hidden md:block" />
              <Typewriter
                phrases={ROTATING_HEADLINES}
                className="inline-block min-h-[1.2em]"
              />
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-7 text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              ZihoTech delivers enterprise-grade AI, web, and mobile systems for
              founders and operators who'd rather have one senior team that owns
              the outcome — than three vendors fighting over the spec.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
              <CTAButton to="/contact" variant="primary">
                Schedule a Discovery Call <ArrowRight className="h-4 w-4" />
              </CTAButton>
              <CTAButton to="/work" variant="secondary">
                View Our Work
              </CTAButton>
            </div>
          </FadeUp>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground/70"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* PARTNER STATS — replaces the old "What We Build" tech marquee */}
      <section className="relative py-16 md:py-20 border-y border-border bg-surface/40 overflow-hidden scroll-blur">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              How We Partner
            </p>
            <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight max-w-2xl mx-auto">
              The numbers behind the <span className="text-gradient">handshake</span>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:gap-6 grid-cols-2 lg:grid-cols-4">
            {PARTNER_STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl glass p-6 md:p-7 text-center"
              >
                <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient/10 border border-secondary/30">
                  <s.Icon className="h-5 w-5 text-secondary" />
                </div>
                <p className="mt-4 text-3xl md:text-4xl font-extrabold text-gradient leading-none">
                  {s.metric}
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <Section>
        <SectionHeading
          eyebrow="Why ZihoTech"
          title={<>Why Businesses <span className="text-gradient">Choose Us</span></>}
        />
        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass p-7 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient/10 border border-secondary/30">
                  <w.Icon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{w.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{w.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section className="bg-surface/30 border-y border-border">
        <SectionHeading
          eyebrow="Featured Work"
          title={<>Work That <span className="text-gradient">Speaks</span></>}
          subtitle="A few recent engagements. Real problems, measurable outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((c, i) => (
            <motion.a
              key={c.slug}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl glass p-7 flex flex-col hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full border border-border px-2.5 py-0.5">{c.industry}</span>
                <span className="rounded-full bg-secondary/15 border border-secondary/40 px-2.5 py-0.5 text-secondary font-semibold">
                  {c.type}
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-bold tracking-tight">{c.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.problem}</p>
              <p className="mt-5 text-base font-semibold text-gradient">{c.result}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.stack.map((s) => (
                  <span key={s} className="text-[11px] text-muted-foreground rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5">
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:gap-2.5 transition-all">
                Visit live site <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:gap-2.5 transition-all"
          >
            See all {CASE_STUDIES.length} projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section>
        <SectionHeading
          eyebrow="Testimonials"
          title={<>What Clients <span className="text-gradient">Say</span></>}
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl glass p-7"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-[0.95rem] leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.title} · {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA BANNER */}
      <Section>
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface p-10 md:p-16 text-center glow-strong">
            <div className="absolute inset-0 bg-mesh opacity-80" />
            <div className="absolute inset-0 bg-dots opacity-40" />
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
                Ready to Build Something <span className="text-gradient">That Lasts?</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
                Let's talk about your project. No commitment, just a conversation.
              </p>
              <div className="mt-9 flex justify-center">
                <CTAButton to="/contact" variant="primary">
                  Schedule a Free Call <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
