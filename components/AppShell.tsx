// components/AppShell.tsx
"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

import { pickAccessMock } from "@/lib/access/access.mock";

type MockKey = "anon" | "email_free" | "email_paid" | "college";

const STORAGE_KEY = "eleveai:mock-access";
const DEFAULT_MOCK: MockKey = "anon";

function normalizeMockKey(v: string | null): MockKey | null {
  if (!v) return null;
  const s = v.toLowerCase().trim();
  if (s === "anon" || s === "email_free" || s === "email_paid" || s === "college") {
    return s;
  }
  return null;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Mock mode persistant (sans useSearchParams)
  const [mockKey, setMockKey] = useState<MockKey>(DEFAULT_MOCK);

  // ✅ Au montage : lit ?mock=... puis localStorage
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const urlMock = normalizeMockKey(url.searchParams.get("mock"));

      if (urlMock) {
        localStorage.setItem(STORAGE_KEY, urlMock);
        setMockKey(urlMock);
        return;
      }

      const stored = normalizeMockKey(localStorage.getItem(STORAGE_KEY));
      if (stored) {
        setMockKey(stored);
        return;
      }

      setMockKey(DEFAULT_MOCK);
    } catch {
      setMockKey(DEFAULT_MOCK);
    }
  }, []);

  const access = useMemo(() => pickAccessMock(mockKey), [mockKey]);

  // ✅ iOS/Android : empêche le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // ===== Swipe logic (global overlay + drawer) =====
  const startXRef = useRef<number | null>(null);
  const startYRef = useRef<number | null>(null);
  const draggingRef = useRef(false);

  const SWIPE_CLOSE_PX = 60;

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    startXRef.current = t.clientX;
    startYRef.current = t.clientY;
    draggingRef.current = true;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!draggingRef.current) return;
    const t = e.touches[0];

    const startX = startXRef.current;
    const startY = startYRef.current;
    if (startX == null || startY == null) return;

    const dx = t.clientX - startX;
    const dy = t.clientY - startY;

    // ✅ Si c'est surtout un scroll vertical, on ignore
    if (Math.abs(dy) > Math.abs(dx)) return;

    // ✅ Swipe vers la gauche pour fermer
    if (dx < -SWIPE_CLOSE_PX) {
      setMobileOpen(false);
      draggingRef.current = false;
      startXRef.current = null;
      startYRef.current = null;
    }
  }

  function handleTouchEnd() {
    draggingRef.current = false;
    startXRef.current = null;
    startYRef.current = null;
  }

  return (
    <>
      <Header />

      {/* Wrapper principal */}
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 py-4">
        {/* Layout desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <aside className="hidden lg:block">
            <Sidebar access={access} />
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>

      {/* ✅ Bouton flottant mobile (comme ChatGPT) */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-[55]
                   inline-flex items-center gap-2 rounded-full
                   border border-slate-800 bg-slate-900/80 backdrop-blur
                   px-4 py-2 text-sm font-semibold text-slate-100
                   shadow-lg shadow-black/40 hover:bg-slate-900"
        aria-label="Ouvrir le menu"
      >
        <span aria-hidden>☰</span>
        <span>Menu</span>
      </button>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          // ✅ iOS : autorise le scroll vertical, laisse le pan horizontal à notre logique
          style={{ touchAction: "pan-y" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Overlay (tap pour fermer) */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />

          {/* Panneau */}
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-[340px] bg-slate-950 border-r border-slate-800 shadow-2xl">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-100 truncate">
                  Menu
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {access.userLabel ??
                    (access.uiMode === "anon"
                      ? "Invité"
                      : access.uiMode === "subscribed"
                      ? "Abonné"
                      : "Connecté")}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-100 hover:bg-slate-900"
              >
                Fermer
              </button>
            </div>

            <div className="p-3">
              <Sidebar
                access={access}
                variant="mobile"
                onNavigate={() => setMobileOpen(false)}
              />
            </div>

            <div className="px-4 pb-4 text-[10px] text-slate-600">
              Astuce : glisse vers la gauche pour fermer.
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
