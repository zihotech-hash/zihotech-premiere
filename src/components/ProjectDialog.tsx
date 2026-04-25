import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Layers3, Target, Sparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/case-studies";

export type DialogAnchor = { x: number; y: number } | null;

type Props = {
  project: CaseStudy | null;
  anchor?: DialogAnchor;
  onClose: () => void;
};

// Margins kept clear from the viewport edges when positioning the dialog.
const EDGE_MARGIN = 16;
const MOBILE_BREAKPOINT = 768;

export function ProjectDialog({ project, anchor, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  // Resolved fixed-position offsets (px) computed from the click anchor.
  // null = not yet measured / mobile sheet mode (uses CSS bottom-sheet).
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  // ── Scroll lock & keyboard ────────────────────────────────────────────────
  useEffect(() => {
    if (!project) return;

    const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
    lenis?.stop();

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyOverscroll = body.style.overscrollBehavior;
    const scrollbarGap = window.innerWidth - html.clientWidth;
    const prevPaddingRight = body.style.paddingRight;
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "contain";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overscrollBehavior = prevBodyOverscroll;
      body.style.paddingRight = prevPaddingRight;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  // ── Position the dialog near the click anchor (desktop) ───────────────────
  // We measure after mount so we know the rendered dialog size, then clamp
  // it inside the viewport with EDGE_MARGIN. On mobile we keep the
  // bottom-sheet layout (CSS handles it via items-end), so we skip this.
  useLayoutEffect(() => {
    if (!project) {
      setPos(null);
      return;
    }
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (isMobile || !anchor) {
      setPos(null);
      return;
    }

    const compute = () => {
      const el = dialogRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Center the dialog horizontally around the anchor x; vertically place
      // it so the anchor sits roughly 25% from the top of the dialog — that
      // way the modal grows downward from the click point but the user can
      // still see the title without scrolling.
      let left = anchor.x - rect.width / 2;
      let top = anchor.y - rect.height * 0.25;

      // Clamp to viewport with margins.
      left = Math.max(EDGE_MARGIN, Math.min(left, vw - rect.width - EDGE_MARGIN));
      top = Math.max(EDGE_MARGIN, Math.min(top, vh - rect.height - EDGE_MARGIN));

      setPos({ top, left });
    };

    // Two RAFs — first lets the dialog mount with `visibility:hidden`, second
    // measures after layout has settled (fonts, images, etc).
    const r1 = requestAnimationFrame(() => {
      const r2 = requestAnimationFrame(compute);
      (compute as unknown as { _r2: number })._r2 = r2;
    });

    const onResize = () => compute();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(r1);
      const r2 = (compute as unknown as { _r2?: number })._r2;
      if (r2) cancelAnimationFrame(r2);
      window.removeEventListener("resize", onResize);
    };
  }, [project, anchor]);

  const isAnchored = pos !== null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={
            isAnchored
              ? "fixed inset-0 z-[100]"
              : "fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6"
          }
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={
              isAnchored
                ? "absolute w-[min(92vw,42rem)] max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-surface shadow-2xl glow-strong"
                : "relative w-full md:max-w-2xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-t-3xl md:rounded-3xl border border-border bg-surface shadow-2xl glow-strong"
            }
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
              ...(isAnchored
                ? {
                    top: pos!.top,
                    left: pos!.left,
                    transformOrigin: anchor
                      ? `${anchor.x - pos!.left}px ${anchor.y - pos!.top}px`
                      : "center",
                  }
                : {}),
            }}
            onClick={(e) => e.stopPropagation()}
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
