// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { pickAccessMock } from "@/lib/access/access.mock";

const APP_ROUTES = [
  "/accueil",
];

function isAppRoute(pathname: string) {
  return APP_ROUTES.some((base) => pathname === base || pathname.startsWith(base + "/"));
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const showAppShell = isAppRoute(pathname);

  // ✅ Pour l’instant: pas de useSearchParams (pas de bug Vercel)
  // On gardera les mocks plus tard, quand tu voudras tester.
const [mockKey, setMockKey] = useState<string | null>(null);

useEffect(() => {
  // ✅ safe côté client, ne casse pas le build
  const key = new URLSearchParams(window.location.search).get("mock");
  setMockKey(key);
}, []);

const access = useMemo(() => pickAccessMock(mockKey), [mockKey]);

const [sidebarOpen, setSidebarOpen] = useState(true);

// ✅ Remettre la variable CSS du header (indispensable pour la hauteur sidebar)
useEffect(() => {
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


  // ✅ Pages publiques: header + contenu + footer, point.
  if (!showAppShell) {
    return (
      <>
        <Header />
        <main className="min-w-0 w-full">{children}</main>
        <Footer />
      </>
    );
  }

  // ✅ Pages "app": sidebar + contenu
  return (
    <>
      <Header />

 {/* ✅ MODIF #1 : enlever py-4 ici (sinon ça casse la hauteur sidebar) */}
      <div className="w-full px-3 sm:px-5 lg:px-6">
        {/* ✅ MODIF #2 : forcer la hauteur sous header + stretch */}
        <div
          className={[
            "grid gap-4 items-stretch",
            "min-h-[calc(100vh-var(--app-header-h))]",
            "transition-all duration-300 ease-out",
            sidebarOpen ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-[72px_1fr]",
          ].join(" ")}
        >
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block">
            <Sidebar
              access={access}
              open={sidebarOpen}
              onToggle={() => setSidebarOpen((v) => !v)}
            />
          </aside>

          {/* ✅ padding ici, pas sur le wrapper global */}
          <main className="min-w-0 w-full py-4">{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
}





