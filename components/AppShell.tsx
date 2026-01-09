// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

import { pickAccessMock } from "@/lib/access/access.mock";

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // ✅ OK (pas de suspense requis)
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Mode démo via URL : ?mock=anon|email_free|email_paid|college
  // On évite useSearchParams() => on lit window.location.search
  const [mockKey, setMockKey] = useState<string | null>(null);

  useEffect(() => {
    // sécurité SSR: window existe uniquement côté client
    const sp = new URLSearchParams(window.location.search);
    setMockKey(sp.get("mock"));
  }, [pathname]); // ✅ recalcul à chaque navigation

  const access = useMemo(() => {
    return pickAccessMock(mockKey);
  }, [mockKey]);

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
    // ⚠️ Assure-toi que <header> dans Header.tsx a bien id="app-header"
    const header = document.getElementById("app-header");
    if (!header) return;

    const update = () => {
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--app-header-h",
        `${Math.round(h)}px`,
      );
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

      {/* ===== LAYOUT PRINCIPAL ===== */}
      <div className="w-full px-3 sm:px-5 lg:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <aside className="hidden lg:block">
            <Sidebar access={access} />
          </aside>

          <main className="min-w-0 w-full">{children}</main>
        </div>
      </div>

      {/* ===== BOUTON FLOTTANT MOBILE ===== */}
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

      {/* ===== DRAWER MOBILE ===== */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          <div
            className="
              absolute inset-y-0 left-0 w-[88%] max-w-[340px]
              bg-slate-950 border-r border-slate-800 shadow-2xl
            "
          >
            <Sidebar
              access={access}
              variant="mobile"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
