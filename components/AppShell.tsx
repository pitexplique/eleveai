// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { pickAccessMock } from "@/lib/access/access.mock";

const APP_ROUTES = [
  "/espace-eleves",
  "/espace-profs",
  "/espace-parents",
  "/espace-atelier-IA",
  "/espace-atelier-ia",
  "/dashboard",
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

      <div className="w-full px-3 sm:px-5 lg:px-6 py-4">
        <div
          className={[
            "grid gap-4 transition-all duration-300 ease-out",
            sidebarOpen ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-[72px_1fr]",
          ].join(" ")}
        >
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block">
            <Sidebar
              access={access}
              open={sidebarOpen}
              onToggle={() => setSidebarOpen((v) => !v)}
              variant="desktop"
            />
          </aside>

          {/* MAIN */}
          <main className="min-w-0 w-full">{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
}





