import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ThemeProvider } from "@/components/ThemeProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

/**
 * Update <title> + meta description per route. In SPA mode (Vercel-friendly)
 * we manage head tags imperatively. Each route file passes its own title
 * via window event or here we read from document — but to keep things simple
 * each page sets its own document.title via its component.
 */
function useDefaultDocumentMeta() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!document.title) {
      document.title = "ZihoTech — Enterprise Software & AI Engineering";
    }
  }, []);
}

function RootComponent() {
  useDefaultDocumentMeta();
  return (
    <ThemeProvider>
      <SmoothScroll />
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
