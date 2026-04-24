import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useState } from "react";
import { FadeUp, Section } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { ProjectDialog } from "@/components/ProjectDialog";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/work")({
  component: WorkPage,
});

function WorkPage() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  useDocumentMeta({
    title: "Our Work — AI, Web & Mobile Case Studies | ZihoTech",
    description:
      "Real ZihoTech client work — AI platforms, generative tools, marketplaces, EdTech, healthcare, Web3 and SaaS. Live URLs, real outcomes.",
    keywords: [
      "ZihoTech case studies",
      "Ziho Tech portfolio",
      "AI case studies",
      "AI portfolio",
      "AI engineering portfolio",
      "generative AI case study",
      "LLM case study",
      "RAG case study",
      "AIOps case study",
      "software development portfolio",
      ...SITE.keywords.slice(0, 15),
    ],
    path: "/work",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ZihoTech Work",
      url: `${SITE.url}/work`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CASE_STUDIES.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
        })),
      },
    },
  });

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
              Work that <span className="text-gradient">ships</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
              {CASE_STUDIES.length} live engagements across AI, generative tools,
              marketplaces, healthcare, and Web3. Click any project to visit the
              live site.
            </p>
          </FadeUp>
        </div>
      </section>

      <Section className="pt-4 md:pt-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((c, i) => (
            <motion.a
              key={c.slug}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col rounded-2xl glass p-7 md:p-8 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span className="rounded-full border border-border px-2.5 py-0.5">{c.industry}</span>
                  <span
                    className={
                      c.type === "AI"
                        ? "rounded-full bg-secondary/15 border border-secondary/40 px-2.5 py-0.5 text-secondary font-semibold"
                        : "rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-secondary"
                    }
                  >
                    {c.type}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>

              <h2 className="mt-5 text-2xl md:text-[1.7rem] font-bold tracking-tight">
                {c.name}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">
                {c.problem}
              </p>

              <div className="mt-5 rounded-xl border border-secondary/20 bg-secondary/[0.04] px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Outcome
                </p>
                <p className="mt-1 text-sm md:text-base font-semibold text-gradient">
                  {c.result}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] text-muted-foreground rounded-md bg-white/[0.04] border border-white/10 px-2 py-0.5"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
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
                  Start the Conversation
                </CTAButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
