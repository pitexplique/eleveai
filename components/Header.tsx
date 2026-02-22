// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  Users,
  GraduationCap,
  UsersRound,
  School,
  BadgeCheck,
  Mail,
  Menu,
  ChevronDown,
  Building2,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    function listener(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (!ref.current?.contains(target)) handler();
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
}

export default function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Valeria dropdown (desktop)
  const [valeriaOpen, setValeriaOpen] = useState(false);
  const valeriaRef = useRef<HTMLDivElement>(null);

  const closeValeria = useCallback(() => setValeriaOpen(false), []);
  useOnClickOutside(valeriaRef, closeValeria, valeriaOpen);

  useEffect(() => {
    setMobileOpen(false);
    setValeriaOpen(false);
  }, [pathname]);

  // ✅ Apple-like link (subtle)
  const topLink = (active: boolean) =>
    `px-2.5 py-1.5 text-sm rounded-lg transition ${
      active ? "text-white" : "text-slate-300 hover:text-white"
    }`;

  // ✅ Premium pill button (Valeria)
  const pill = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition border ${
      active
        ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
        : "border-slate-700 bg-slate-950/40 text-slate-100 hover:border-slate-500 hover:bg-slate-900/40"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/accueil" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-slate-900">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-base font-semibold text-slate-50">EleveAI</span>
            <span className="text-xs text-slate-400">IA encadrée • usages réels</span>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/profs" className={topLink(isActive(pathname, "/profs"))}>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4" />
              Profs
            </span>
          </Link>

          <Link href="/eleves" className={topLink(isActive(pathname, "/eleves"))}>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Élèves
            </span>
          </Link>

          <Link href="/parents" className={topLink(isActive(pathname, "/parents"))}>
            <span className="inline-flex items-center gap-2">
              <UsersRound className="h-4 w-4" />
              Parents
            </span>
          </Link>

          <Link
            href="/espace-ecoles"
            className={topLink(isActive(pathname, "/espace-ecoles"))}
          >
            <span className="inline-flex items-center gap-2">
              <School className="h-4 w-4" />
              Établissement
            </span>
          </Link>

          {/* ✅ Entreprise (simple link) */}
          <Link
            href="/valeria-consulting"
            className={topLink(isActive(pathname, "/valeria-consulting"))}
          >
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Entreprise
            </span>
          </Link>

          <span className="mx-2 h-5 w-px bg-slate-800" />

          {/* ⭐ VALERIA (comme sidebar) */}
          <div ref={valeriaRef} className="relative">
            <button
              type="button"
              onClick={() => setValeriaOpen((v) => !v)}
              className={pill(
                isActive(pathname, "/optimiseur") || isActive(pathname, "/valeria-consulting")
              )}
              aria-expanded={valeriaOpen}
              aria-haspopup="menu"
              title="Valeria — Optimisation mesurable"
            >
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Valeria
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-slate-200 border border-slate-700">
                /20
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${valeriaOpen ? "rotate-180" : ""}`}
              />
            </button>

            {valeriaOpen && (
              <div className="absolute right-0 mt-2 w-[22rem] rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur">
                <div className="p-2">
                  <Link
                    href="/optimiseur"
                    onClick={() => setValeriaOpen(false)}
                    className={`flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive(pathname, "/optimiseur")
                        ? "bg-emerald-500/10 text-emerald-100"
                        : "text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/60">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">Optimiseur (score /20)</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Itérations contrôlées • robustesse • reproductibilité
                      </span>
                    </span>
                    <span className="rounded-full bg-emerald-600/15 text-emerald-200 text-[10px] font-bold px-2 py-0.5 border border-emerald-500/20">
                      System
                    </span>
                  </Link>

                  <Link
                    href="/valeria-consulting"
                    onClick={() => setValeriaOpen(false)}
                    className={`mt-1 flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive(pathname, "/valeria-consulting")
                        ? "bg-emerald-500/10 text-emerald-100"
                        : "text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-700 bg-slate-950/60">
                      <Building2 className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">Valeria Consulting</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Audit IA • indicateurs • ISO/IEC 42001
                      </span>
                    </span>
                    <span className="rounded-full bg-slate-900 text-slate-200 text-[10px] font-bold px-2 py-0.5 border border-slate-700">
                      Pro
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <span className="mx-2 h-5 w-px bg-slate-800" />

          <Link href="/contact" className={topLink(isActive(pathname, "/contact"))}>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </span>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="lg:hidden inline-flex items-center justify-center rounded-full border border-slate-700 p-2 text-slate-200 hover:bg-slate-900 transition"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-2">
            {/* EleveAI */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/profs"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Profs
              </Link>
              <Link
                href="/eleves"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Élèves
              </Link>
              <Link
                href="/parents"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Parents
              </Link>
              <Link
                href="/espace-ecoles"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Établissement
              </Link>

              {/* ✅ Entreprise */}
              <Link
                href="/valeria-consulting"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Entreprise
              </Link>

              {/* ✅ Contact */}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Contact
              </Link>
            </div>

            {/* Valeria (comme sidebar : Optimiseur + Consulting) */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-3">
              <p className="text-xs font-semibold text-emerald-200">Valeria</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/optimiseur"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900"
                >
                  Optimiseur (/20)
                </Link>
                <Link
                  href="/valeria-consulting"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-100 hover:bg-slate-900"
                >
                  Consulting
                </Link>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Optimisation mesurable • audit IA • ISO/IEC 42001
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
