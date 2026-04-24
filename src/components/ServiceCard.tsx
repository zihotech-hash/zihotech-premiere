import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Brain,
  Cpu,
  Cloud,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  audience: string;
  stack: string[];
  Icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "ai-dev",
    title: "AI Development",
    short: "Custom AI models, LLM integrations, and intelligent automation.",
    long:
      "We integrate frontier models (OpenAI, Anthropic, Gemini) into real product workflows, fine-tune smaller models for specialized tasks, and build NLP systems that move beyond demos into production.",
    audience: "For teams adding AI features to products or automating internal workflows.",
    stack: ["OpenAI", "Anthropic", "Gemini", "HuggingFace", "PyTorch", "NLP"],
    Icon: Brain,
  },
  {
    slug: "ai-eng",
    title: "AI Engineering",
    short: "RAG pipelines, vector databases, and production-ready LLM systems.",
    long:
      "Production LLM systems are an engineering discipline, not a prompt. We build retrieval pipelines, agent orchestration, evaluation harnesses, and guardrails that make your AI features reliable enough to ship to paying customers.",
    audience: "For products that need RAG, agents, or multi-step LLM workflows in production.",
    stack: ["LangChain", "LangGraph", "FAISS", "pgvector", "Pinecone", "FastAPI"],
    Icon: Cpu,
  },
  {
    slug: "ai-ops",
    title: "AI Ops",
    short: "Deploy, monitor, and scale your AI infrastructure with confidence.",
    long:
      "We containerize, deploy, monitor, and scale model and inference workloads. Cost-aware architectures, observability, automated rollbacks, and CI/CD designed for ML — so your AI doesn't fall over the moment it gets traction.",
    audience: "For teams running models in production and needing real reliability.",
    stack: ["Docker", "GCP", "AWS", "Kubernetes", "MLflow", "Prometheus"],
    Icon: Cloud,
  },
  {
    slug: "web",
    title: "Web Development",
    short: "Scalable, fast, modern web applications built for performance.",
    long:
      "We design and ship production web platforms that hold up under real traffic. From marketing sites to complex internal dashboards, we focus on architecture, performance, and developer experience so your team can move fast for years — not weeks.",
    audience: "For startups launching MVPs and enterprises modernizing legacy systems.",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "REST", "GraphQL"],
    Icon: Code2,
  },
  {
    slug: "mobile",
    title: "Mobile App Development",
    short: "Cross-platform iOS & Android apps that users love.",
    long:
      "We build cross-platform mobile apps that feel native on both iOS and Android. Offline-first patterns, push notifications, secure auth, and tight integrations with your existing backend — shipped through real CI/CD, not zip files.",
    audience: "For consumer products, internal tools, and B2B field applications.",
    stack: ["React Native", "Expo", "TypeScript", "Firebase", "REST APIs"],
    Icon: Smartphone,
  },
  {
    slug: "custom",
    title: "Custom Software",
    short: "Tailored solutions for complex business problems.",
    long:
      "When off-the-shelf doesn't cut it, we design and build bespoke systems — internal tools, API integrations, legacy modernization, and complex domain platforms. Senior engineers, clear scope, real ownership.",
    audience: "For operations-heavy businesses with workflows no SaaS quite fits.",
    stack: ["Architecture", "API Design", "PostgreSQL", "TypeScript", "Python"],
    Icon: Boxes,
  },
];

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { Icon, title, short } = service;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      className="group relative rounded-2xl glass p-7 transition-all duration-300 hover:border-primary/40"
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
           style={{ background: "radial-gradient(400px circle at 50% 0%, oklch(0.65 0.19 255 / 0.08), transparent 60%)" }} />
      <div className="relative">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient/10 border border-primary/30">
          <Icon className="h-5 w-5 text-secondary" />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-[0.95rem] text-muted-foreground leading-relaxed">{short}</p>
        <Link
          to="/services"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:gap-2.5 transition-all"
        >
          Learn more <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}
