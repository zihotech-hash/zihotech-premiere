import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Calendar,
  Linkedin,
  Instagram,
  Facebook,
  Globe2,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { FadeUp, Section } from "@/components/Section";
import { SITE } from "@/lib/site";
import { useDocumentMeta } from "@/hooks/use-document-meta";
import { breadcrumbJsonLd } from "@/lib/seo";

const EMAILJS_SERVICE_ID = "service_stg32xk";
const EMAILJS_TEMPLATE_ID = "template_jjbsovh";
const EMAILJS_PUBLIC_KEY = "2MxOvtcPFVvBmg3Sd";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const PROJECT_TYPES = [
  "Web Dev",
  "Mobile App",
  "AI Development",
  "AI Ops",
  "Custom Software",
  "Other",
] as const;

const BUDGETS = [
  "Under $5k",
  "$5k–$15k",
  "$15k–$50k",
  "$50k+",
  "Prefer not to say",
] as const;

const formSchema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPES),
  budget: z.enum(BUDGETS),
  message: z.string().trim().min(10, "Please share a few details").max(2000),
});

type FormErrors = Partial<Record<keyof z.infer<typeof formSchema>, string>>;

function ContactPage() {
  useDocumentMeta({
    title: "Contact Ziho Technologies (ZihoTech) — Start an AI or Software Project",
    description:
      "Tell us about your project. ZihoTech (Ziho Technologies) responds within 24 hours, US/EU/UK timezones. AI engineering, AIOps, web, mobile, and custom software.",
    keywords: [
      "Contact ZihoTech",
      "Ziho Tech contact",
      "hire AI engineers",
      "hire AI development team",
      "AI consulting contact",
      "AIOps consultant",
      "software development quote",
    ],
    path: "/contact",
    image: "/og/og-contact.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${SITE.url}/contact#webpage`,
        name: "Contact ZihoTech",
        url: `${SITE.url}/contact`,
        description:
          "Get in touch with ZihoTech. We respond within 24 hours across US, EU, and UK timezones.",
        isPartOf: { "@id": `${SITE.url}/#website` },
        publisher: { "@id": `${SITE.url}/#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE.url}/og/og-contact.jpg`,
        },
      },
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      projectType: String(fd.get("projectType") ?? "") as (typeof PROJECT_TYPES)[number],
      budget: String(fd.get("budget") ?? "") as (typeof BUDGETS)[number],
      message: String(fd.get("message") ?? ""),
    };

    const parsed = formSchema.safeParse(data);
    if (!parsed.success) {
      const next: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSendError(null);
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: parsed.data.name,
          email: parsed.data.email,
          company: parsed.data.company || "—",
          projectType: parsed.data.projectType,
          budget: parsed.data.budget,
          message: parsed.data.message,
          to_email: SITE.email,
          reply_to: parsed.data.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setSubmitted(true);
      form.reset();
    } catch (err) {
      console.error("EmailJS send failed", err);
      setSendError(
        "Couldn't send your message. Please try again or email us directly.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10 scroll-blur">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-secondary">
              Contact
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl">
              Let's Build Something <span className="text-gradient">Together</span>.
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      <Section className="pt-4 md:pt-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          {/* FORM */}
          <FadeUp>
            <div className="rounded-2xl glass p-6 md:p-10">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="mx-auto h-14 w-14 text-secondary" />
                    <h3 className="mt-5 text-2xl font-semibold">Message received</h3>
                    <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
                      We've received your message. Expect to hear from us within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-7 text-sm text-secondary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <Field label="Full Name" name="name" error={errors.name}>
                      <input
                        name="name"
                        type="text"
                        required
                        maxLength={100}
                        className={inputClass}
                        placeholder="Jane Doe"
                      />
                    </Field>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Email Address" name="email" error={errors.email}>
                        <input
                          name="email"
                          type="email"
                          required
                          maxLength={255}
                          className={inputClass}
                          placeholder="jane@company.com"
                        />
                      </Field>
                      <Field label="Company / Organization" name="company" error={errors.company}>
                        <input
                          name="company"
                          type="text"
                          maxLength={150}
                          className={inputClass}
                          placeholder="Acme Inc."
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Field label="Project Type" name="projectType" error={errors.projectType}>
                        <select name="projectType" required defaultValue="" className={inputClass}>
                          <option value="" disabled>Select a type…</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Budget Range" name="budget" error={errors.budget}>
                        <select name="budget" required defaultValue="" className={inputClass}>
                          <option value="" disabled>Select a range…</option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Tell us about your project" name="message" error={errors.message}>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        maxLength={2000}
                        className={`${inputClass} resize-none`}
                        placeholder="What are you trying to build, and what's the timeline?"
                      />
                    </Field>

                    {sendError && (
                      <p className="text-sm text-destructive">{sendError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-lg bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-md hover:-translate-y-0.5 hover:glow-primary transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {sending ? (
                        <>
                          Sending… <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* SIDE INFO */}
          <FadeUp delay={0.1}>
            <div className="space-y-5">
              <div className="rounded-2xl glass p-6 md:p-7 space-y-3">
                <h3 className="text-lg font-semibold">Or reach out directly</h3>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-2 flex items-center gap-3 text-foreground hover:text-secondary transition-colors group"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <Mail className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm break-all">{SITE.email}</span>
                </a>
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors group"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <MessageCircle className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm">Chat on WhatsApp</span>
                </a>
              </div>

              <a
                href={SITE.social.calendly}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl glass p-6 md:p-7 hover:border-primary/40 transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <Calendar className="h-4 w-4 text-secondary" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Prefer to talk?</p>
                    <p className="text-xs text-muted-foreground">Book a 30-min discovery call</p>
                  </div>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-secondary group-hover:gap-2.5 transition-all">
                  Open Calendly <ArrowRight className="h-4 w-4" />
                </span>
              </a>

              <div className="rounded-2xl glass p-6 md:p-7 space-y-4">
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <Linkedin className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm">LinkedIn — Ziho Technologies</span>
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <Instagram className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm">Instagram — @zihotech</span>
                </a>
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <Facebook className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm">Facebook Page</span>
                </a>
                <a
                  href={SITE.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-secondary transition-colors"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient/10 border border-primary/30">
                    <MessageCircle className="h-4 w-4 text-secondary" />
                  </span>
                  <span className="text-sm">WhatsApp Chat</span>
                </a>
              </div>

              <div className="rounded-2xl border border-border bg-surface/40 p-6 md:p-7">
                <div className="flex items-center gap-2 text-secondary">
                  <Globe2 className="h-4 w-4" />
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold">Coverage</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  We work across <span className="text-foreground">US · EU · UK</span> timezones.
                  Async-first, sync when it matters.
                </p>
              </div>
            </div>
          </FadeUp>
        </div>
      </Section>
    </>
  );
}

const inputClass =
  "w-full rounded-lg bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all";

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-muted-foreground mb-2">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
