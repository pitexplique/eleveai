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
  Brain,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
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
  const [valeriaOpen, setValeriaOpen] = useState(false);

  const valeriaRef = useRef<HTMLDivElement>(null);

  const closeValeria = useCallback(() => setValeriaOpen(false), []);
  useOnClickOutside(valeriaRef, closeValeria, valeriaOpen);

  useEffect(() => {
    setMobileOpen(false);
    setValeriaOpen(false);
  }, [pathname]);

  const topLink = (active: boolean) =>
    `px-3 py-1.5 text-sm rounded-xl transition ${
      active
        ? "text-white bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
        : "text-slate-200 hover:text-white hover:bg-white/5"
    }`;

  const pill = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold transition border ${
      active
        ? "border-amber-300/50 bg-amber-400/15 text-amber-50 shadow-[0_0_0_1px_rgba(251,191,36,0.08)]"
        : "border-white/10 bg-slate-900/60 text-slate-100 hover:border-amber-300/30 hover:bg-slate-800/70"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[linear-gradient(180deg,rgba(9,14,33,0.96)_0%,rgba(12,20,43,0.94)_100%)] backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/accueil" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-cyan-400 text-slate-950 shadow-lg shadow-orange-500/20">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-base font-semibold text-slate-50">EleveAI</span>
            <span className="text-xs text-slate-300">
              IA encadrée • usages réels
            </span>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center gap-2">
          <Link href="/profs" className={topLink(isActive(pathname, "/profs"))}>
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-300" />
              Profs
            </span>
          </Link>

          <Link href="/eleves" className={topLink(isActive(pathname, "/eleves"))}>
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-cyan-300" />
              Élèves
            </span>
          </Link>

          <Link href="/parents" className={topLink(isActive(pathname, "/parents"))}>
            <span className="inline-flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-orange-300" />
              Parents
            </span>
          </Link>

          <Link
            href="/espace-ecoles"
            className={topLink(isActive(pathname, "/espace-ecoles"))}
          >
            <span className="inline-flex items-center gap-2">
              <School className="h-4 w-4 text-emerald-300" />
              Établissement
            </span>
          </Link>

          <Link
            href="/tutor-v4"
            className={topLink(isActive(pathname, "/tutor-v4"))}
          >
            <span className="inline-flex items-center gap-2">
              <Brain className="h-4 w-4 text-fuchsia-300" />
              Tutor IA
            </span>
          </Link>

          <Link
            href="/valeria-consulting"
            className={topLink(isActive(pathname, "/valeria-consulting"))}
          >
            <span className="inline-flex items-center gap-2">
              <Building2 className="h-4 w-4 text-orange-300" />
              Entreprise
            </span>
          </Link>

          <span className="mx-2 h-5 w-px bg-white/10" />

          {/* VALERIA */}
          <div ref={valeriaRef} className="relative">
            <button
              type="button"
              onClick={() => setValeriaOpen((v) => !v)}
              className={pill(
                isActive(pathname, "/optimiseur") ||
                  isActive(pathname, "/valeria-consulting"),
              )}
              aria-expanded={valeriaOpen}
              aria-haspopup="menu"
              title="Valeria — Optimisation mesurable"
            >
              <BadgeCheck className="h-4 w-4 text-amber-300" />
              Valeria
              <span className="rounded-full border border-amber-200/20 bg-slate-950/70 px-2 py-0.5 text-[10px] font-bold text-amber-100">
                /20
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  valeriaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {valeriaOpen && (
              <div className="absolute right-0 mt-2 w-[22rem] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98)_0%,rgba(30,41,59,0.98)_100%)] shadow-2xl shadow-black/40 backdrop-blur">
                <div className="p-2">
                  <Link
                    href="/optimiseur"
                    onClick={() => setValeriaOpen(false)}
                    className={`flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive(pathname, "/optimiseur")
                        ? "bg-amber-400/12 text-amber-50"
                        : "text-slate-100 hover:bg-white/5"
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950/50">
                      <BadgeCheck className="h-4 w-4 text-amber-300" />
                    </span>

                    <span className="flex-1">
                      <span className="block font-semibold">
                        Optimiseur (score /20)
                      </span>
                      <span className="mt-0.5 block text-[11px] text-slate-300">
                        Itérations contrôlées • robustesse • reproductibilité
                      </span>
                    </span>

                    <span className="rounded-full border border-amber-300/20 bg-amber-400/15 px-2 py-0.5 text-[10px] font-bold text-amber-100">
                      System
                    </span>
                  </Link>

                  <Link
                    href="/valeria-consulting"
                    onClick={() => setValeriaOpen(false)}
                    className={`mt-1 flex items-start gap-3 rounded-xl px-3 py-2 text-sm transition ${
                      isActive(pathname, "/valeria-consulting")
                        ? "bg-orange-400/12 text-orange-50"
                        : "text-slate-100 hover:bg-white/5"
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-slate-950/50">
                      <Building2 className="h-4 w-4 text-orange-300" />
                    </span>

                    <span className="flex-1">
                      <span className="block font-semibold">
                        Valeria Consulting
                      </span>
                      <span className="mt-0.5 block text-[11px] text-slate-300">
                        Audit IA • indicateurs • ISO/IEC 42001
                      </span>
                    </span>

                    <span className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-slate-200">
                      Pro
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <span className="mx-2 h-5 w-px bg-white/10" />

          <Link href="/contact" className={topLink(isActive(pathname, "/contact"))}>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-300" />
              Contact
            </span>
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 transition hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(9,14,33,0.98)_0%,rgba(16,24,48,0.98)_100%)] backdrop-blur lg:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/profs"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Profs
              </Link>

              <Link
                href="/eleves"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Élèves
              </Link>

              <Link
                href="/parents"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Parents
              </Link>

              <Link
                href="/espace-ecoles"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Établissement
              </Link>

              <Link
                href="/tutor-v4"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Tutor IA
              </Link>

              <Link
                href="/valeria-consulting"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Entreprise
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                Contact
              </Link>
            </div>

            <div className="rounded-2xl border border-amber-300/20 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-cyan-400/10 p-3">
              <p className="text-xs font-semibold text-amber-100">Valeria</p>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/optimiseur"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-50 hover:bg-white/10"
                >
                  Optimiseur (/20)
                </Link>

                <Link
                  href="/valeria-consulting"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-50 hover:bg-white/10"
                >
                  Consulting
                </Link>
              </div>

              <p className="mt-2 text-[11px] text-slate-300">
                Optimisation mesurable • audit IA • ISO/IEC 42001
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}