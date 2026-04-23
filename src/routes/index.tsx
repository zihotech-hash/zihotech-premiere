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
} from "lucide-react";
import { FadeUp, Section, SectionHeading } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { SERVICES, ServiceCard } from "@/components/ServiceCard";
import { CASE_STUDIES } from "@/lib/case-studies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZihoTech — Enterprise Software & AI Engineering" },
      {
        name: "description",
        content:
          "ZihoTech delivers enterprise-grade web, mobile, and AI solutions for startups and businesses that need to scale — fast.",
      },
      { property: "og:title", content: "ZihoTech — Enterprise Software & AI Engineering" },
      {
        property: "og:description",
        content:
          "We build the software that moves your business forward. Web, mobile, and AI engineering across US · EU · UK.",
      },
    ],
  }),
  component: HomePage,
});

const TECHS = [
  "React", "Node.js", "Python", "FastAPI", "OpenAI", "LangChain",
  "Docker", "AWS", "GCP", "PostgreSQL", "TensorFlow", "Next.js",
];

const WHY = [
  { title: "Timezone-Flexible", text: "We work async and sync across US, EU, and UK timezones — no missed handoffs.", Icon: Globe2 },
  { title: "End-to-End Ownership", text: "From architecture to deployment, we own the full stack and the outcome.", Icon: Layers },
  { title: "AI-First Mindset", text: "Every solution we build considers where AI can add real, measurable value.", Icon: Sparkles },
  { title: "Fast Delivery, Zero Bloat", text: "Lean teams, clear milestones, no agency fluff or padded retainers.", Icon: Zap },
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
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {/* floating orbs */}
        <motion.div
          aria-hidden
          className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-24 -right-24 h-[480px] w-[480px] rounded-full bg-secondary/20 blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-7xl w-full px-6 md:px-10 py-16 md:py-24 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
              AI &amp; Software Engineering
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight max-w-5xl">
              We Build the Software That{" "}
              <span className="text-gradient">Moves Your Business Forward</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p className="mt-7 text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              ZihoTech delivers enterprise-grade web, mobile, and AI solutions for startups and
              businesses that need to scale — fast.
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

      {/* TRUST BAR */}
      <section className="relative py-14 border-y border-border bg-surface/40 overflow-hidden scroll-blur">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Technologies We Work With
          </p>
        </div>
        <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max marquee gap-12 md:gap-16 px-6">
            {[...TECHS, ...TECHS].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="text-lg md:text-xl font-semibold text-muted-foreground/60 whitespace-nowrap tracking-tight"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section>
        <SectionHeading
          eyebrow="Services"
          title={<>What We <span className="text-gradient">Build</span></>}
          subtitle="Six core capabilities, one senior team. We pick the right tool for the problem — never the other way around."
        />
        <div className="grid gap-5 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section className="bg-surface/30 border-y border-border">
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
      <Section>
        <SectionHeading
          eyebrow="Featured Work"
          title={<>Work That <span className="text-gradient">Speaks</span></>}
          subtitle="A few recent engagements. Real problems, measurable outcomes."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.slice(0, 3).map((c, i) => (
            <motion.article
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-2xl glass p-7 flex flex-col hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full border border-border px-2.5 py-0.5">{c.industry}</span>
                <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-secondary">
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
              <Link
                to="/work"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:gap-2.5 transition-all"
              >
                View case study <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-surface/30 border-y border-border">
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
