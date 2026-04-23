import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="text-2xl font-extrabold">
              <span className="text-gradient">ZihoTech</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {SITE.tagline}
            </p>
          </div>

          <div className="md:justify-self-center">
            <h4 className="text-sm font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:justify-self-end">
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-4">
              <a href={`mailto:${SITE.email}`} className="hover:text-foreground transition-colors">
                {SITE.email}
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg glass hover:border-primary/40 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg glass hover:border-primary/40 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.twitter}
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg glass hover:border-primary/40 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ZihoTech. All rights reserved.</p>
          <p>Crafted with precision in US · EU · UK timezones.</p>
        </div>
      </div>
    </footer>
  );
}
