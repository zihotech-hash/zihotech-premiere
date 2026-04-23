import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FadeUp, Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — ZihoTech Case Studies" },
      {
        name: "description",
        content:
          "Real problems. Real solutions. Real results. Selected case studies from ZihoTech across AI, web, and mobile.",
      },
      { property: "og:title", content: "Our Work — ZihoTech Case Studies" },
      {
        property: "og:description",
        content:
          "Featured engagements across FinTech, Healthcare, Logistics, and LegalTech.",
      },
    ],
  }),
  component: WorkPage,
});

const FILTERS = ["All", "Web", "Mobile", "AI"] as const;
type Filter = (typeof FILTERS)[number];

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible: CaseStudy[] =
    filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.type === filter);

  return (
    <>
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              Case Studies
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
              Our <span className="text-gradient">Work</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              Real problems. Real solutions. Real results.
            </p>
          </FadeUp>
        </div>
      </section>

      <Section className="pt-4 md:pt-8">
        <div className="flex flex-wrap items-center gap-2 mb-10 md:mb-14">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((c, i) => (
              <motion.article
                key={c.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.015 }}
                className="group relative rounded-2xl glass p-8 md:p-10 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="rounded-full border border-border px-2.5 py-0.5">{c.industry}</span>
                  <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-secondary">
                    {c.type}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                  {c.name}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{c.problem}</p>

                <div className="mt-7 rounded-xl border border-secondary/20 bg-secondary/[0.04] p-5">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Result
                  </p>
                  <p className="mt-1 text-xl md:text-2xl font-bold text-gradient">{c.result}</p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] text-muted-foreground rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:gap-2.5 transition-all"
                >
                  Read case study <ArrowRight className="h-4 w-4" />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface p-10 md:p-14 text-center glow-strong">
            <div className="absolute inset-0 bg-mesh opacity-60" />
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mx-auto">
                Have a project we should see in this list next?
              </h2>
              <div className="mt-8 flex justify-center">
                <CTAButton to="/contact">
                  Start the Conversation <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
