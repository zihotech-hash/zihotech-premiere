import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeUp, Section, SectionHeading } from "@/components/Section";
import { CTAButton } from "@/components/CTAButton";
import { SERVICES } from "@/components/ServiceCard";
import { useDocumentMeta } from "@/hooks/use-document-meta";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  useDocumentMeta({
    title: "Services — ZihoTech",
    description:
      "Web, mobile, AI development, AI engineering, AI ops, and custom software — built by senior engineers at ZihoTech.",
  });
  return (
    <>
      <section className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              Services
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
              Engineering capabilities, <span className="text-gradient">end to end</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl">
              We're a senior team of engineers and AI specialists who own the work from architecture
              to production. Here's how we help.
            </p>
          </FadeUp>
        </div>
      </section>

      <Section className="pt-8 md:pt-12">
        <div className="space-y-16 md:space-y-24">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12 pb-16 md:pb-24 border-b border-border last:border-b-0 last:pb-0"
            >
              <div className="flex md:flex-col items-start gap-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient/10 border border-primary/30 glow-primary">
                  <s.Icon className="h-6 w-6 text-secondary" />
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground md:mt-2">
                  0{i + 1}
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight">{s.title}</h2>
                <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">
                  {s.long}
                </p>
                <p className="mt-5 text-sm text-foreground/90">
                  <span className="text-secondary font-medium">Who it's for: </span>
                  {s.audience}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs rounded-full glass px-3 py-1.5 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/30 border-t border-border">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-mesh opacity-60" />
            <div className="relative">
              <h2 className="text-2xl md:text-4xl font-bold max-w-2xl mx-auto">
                Not sure what you need? <span className="text-gradient">Let's figure it out together.</span>
              </h2>
              <p className="mt-5 text-muted-foreground max-w-lg mx-auto">
                A 30-minute call is usually enough to map a clear path forward.
              </p>
              <div className="mt-8 flex justify-center">
                <CTAButton to="/contact" variant="primary">
                  Book a Call <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </Section>
    </>
  );
}
