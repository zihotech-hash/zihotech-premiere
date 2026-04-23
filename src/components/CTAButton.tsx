import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

interface Props {
  to: LinkProps["to"];
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

export function CTAButton({ to, variant = "primary", children, className }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm md:text-[0.95rem] font-semibold transition-all duration-300 ease-out";
  const styles =
    variant === "primary"
      ? "bg-brand-gradient text-white shadow-md hover:-translate-y-0.5 hover:glow-primary"
      : "border border-white/20 bg-white/[0.02] text-foreground hover:bg-white/[0.06] hover:border-white/40";

  return (
    <Link to={to} className={cn(base, styles, className)}>
      {children}
    </Link>
  );
}
