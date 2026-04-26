import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/mission", label: "Mission" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ZihoTech logo" width={36} height={36} className="h-9 w-9 object-contain" />
              <span className="text-2xl font-extrabold text-gradient">ZihoTech</span>
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
            <div className="space-y-2.5 mb-5">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="break-all">{SITE.email}</span>
              </a>
              <a
                href={SITE.social.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
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
                href={SITE.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg glass hover:border-primary/40 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 grid place-items-center rounded-lg glass hover:border-primary/40 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2021 ZihoTech. All rights reserved.</p>
          <p>Crafted with precision in US · EU · UK timezones.</p>
        </div>
      </div>
    </footer>
  );
}
