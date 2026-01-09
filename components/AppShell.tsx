// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { pickAccessMock } from "@/lib/access/access.mock";

export default function AppShell({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const access = useMemo(
    () => pickAccessMock(searchParams.get("mock")),
    [searchParams],
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Header />

      <div className="w-full px-3 sm:px-5 lg:px-6 py-4">
        <div
          className={`
            grid gap-4 transition-all duration-300 ease-out
            ${sidebarOpen ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-[72px_1fr]"}
          `}
        >
          {/* SIDEBAR DESKTOP */}
          <aside className="hidden lg:block">
            <Sidebar
              access={access}
              open={sidebarOpen}
              onToggle={() => setSidebarOpen((v) => !v)}
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




