// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

import { pickAccessMock } from "@/lib/access/access.mock";

const APP_PREFIXES = [
  "/espace-eleves",
  "/espace-profs",
  "/espace-parents",
  "/espace-atelier-IA",
  "/espace-atelier-ia",
  "/dashboard",
];

function isAppRoute(pathname: string) {
  return APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const appMode = isAppRoute(pathname);

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Mode démo via URL : ?mock=anon|email_free|email_paid|college
  const [mockKey, setMockKey] = useState<string | null>(null);

  useEffect(() => {
    // On lit les query params côté client pour éviter useSearchParams() et le souci Vercel
    const sp = new URLSearchParams(window.location.search);
    setMockKey(sp.get("mock"));
  }, [pathname]);

  const access = useMemo(() => pickAccessMock(mockKey), [mockKey]);

  // ✅ Empêche le scroll du body quand le drawer mobile est ouvert
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ✅ CALCUL EXACT DE LA HAUTEUR DU HEADER (anti-tremblement)
  useEffect(() => {
    const header = document.getElementById("app-header");
    if (!header) return;

    const update = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--app-header-h", `${Math.round(h)}px`);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(header);

    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <Header />

      {/* ===== MODE SITE : PAS DE SIDEBAR ===== */}
      {!appMode && (
        <div className="w-full">
          <main className="w-full">{children}</main>
        </div>
      )}

      {/* ===== MODE APP : SIDEBAR + FULL WIDTH ===== */}
      {appMode && (
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            {/* Sidebar desktop */}
            <aside className="hidden lg:block border-r border-slate-800 bg-slate-950">
              <div className="sticky" style={{ top: "var(--app-header-h, 72px)" }}>
                <Sidebar access={access} />
              </div>
            </aside>

            {/* Contenu */}
            <main className="min-w-0 w-full">{children}</main>
          </div>
        </div>
      )}

      {/* ===== BOUTON FLOTTANT MOBILE (APP uniquement) ===== */}
      {appMode && (
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="
            lg:hidden fixed bottom-4 left-4 z-[55]
            inline-flex items-center gap-2 rounded-full
            border border-slate-800 bg-slate-900/80 backdrop-blur
            px-4 py-2 text-sm font-semibold text-slate-100
            shadow-lg shadow-black/40
          "
        >
          ☰ Menu
        </button>
      )}

      {/* ===== DRAWER MOBILE (APP uniquement) ===== */}
      {appMode && mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />

          <div
            className="
              absolute inset-y-0 left-0 w-[88%] max-w-[340px]
              bg-slate-950 border-r border-slate-800 shadow-2xl
            "
            style={{ paddingTop: "var(--app-header-h, 72px)" }}
          >
            <Sidebar access={access} variant="mobile" onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}


