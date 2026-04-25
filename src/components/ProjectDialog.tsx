import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Layers3, Target, Sparkles } from "lucide-react";
import { useEffect } from "react";
import type { CaseStudy } from "@/lib/case-studies";

type Props = {
  project: CaseStudy | null;
  onClose: () => void;
};

export function ProjectDialog({ project, onClose }: Props) {
  // Lock scroll while open + handle Escape.
  // Lenis keeps running even when body has overflow:hidden, so we must stop
  // it explicitly. We also freeze the body position so mobile browsers don't
  // drag the page underneath when users swipe inside the modal.
  useEffect(() => {
    if (!project) return;

    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    lenis?.stop();

    const scrollY = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      window.scrollTo(0, scrollY);
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl md:rounded-3xl border border-border bg-surface shadow-2xl glow-strong"
          >
            <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none rounded-t-3xl md:rounded-3xl" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full glass hover:border-primary/40 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="rounded-full border border-border px-2.5 py-0.5">
                  {project.industry}
                </span>
                <span
                  className={
                    project.type === "AI"
                      ? "rounded-full bg-secondary/15 border border-secondary/40 px-2.5 py-0.5 text-secondary font-semibold"
                      : "rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-secondary"
                  }
                >
                  {project.type}
                </span>
              </div>

              <h2
                id="project-title"
                className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight"
              >
                {project.name}
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Target className="h-3.5 w-3.5 text-secondary" />
                    The Challenge
                  </p>
                  <p className="mt-2 text-sm md:text-base text-foreground/90 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="rounded-xl border border-secondary/25 bg-secondary/[0.05] px-4 md:px-5 py-4">
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-secondary" />
                    Outcome
                  </p>
                  <p className="mt-1.5 text-base md:text-lg font-semibold text-gradient">
                    {project.result}
                  </p>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <Layers3 className="h-3.5 w-3.5 text-secondary" />
                    Stack
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] md:text-xs text-muted-foreground rounded-md bg-white/[0.04] border border-white/10 px-2.5 py-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    "End-to-end ownership from architecture to deployment",
                    "Senior engineers — no junior shadow team",
                    "Performance, security, and accessibility baked in",
                    "Documented handover and ongoing support",
                  ].map((line) => (
                    <div
                      key={line}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-secondary shrink-0" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
