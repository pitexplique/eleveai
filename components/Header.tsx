// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Sparkles,
  Users,
  GraduationCap,
  UsersRound,
  School,
  BadgeCheck,
  Euro,
  Mail,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Menu,
  ChevronDown,
  Building2,
} from "lucide-react";

const AUTH_ROUTES = {
  signin: "/auth/signin",
  signup: "/auth/signup",
};

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
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [authLoading, setAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

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

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUserEmail(data.user?.email ?? null);
      setAuthLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const isLoggedIn = !!userEmail;

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    router.replace("/accueil");
  }, [router, supabase]);

  // ✅ Apple-like link (subtle)
  const topLink = (active: boolean) =>
    `px-2.5 py-1.5 text-sm rounded-lg transition ${
      active
        ? "text-white"
        : "text-slate-300 hover:text-white"
    }`;

  // ✅ Premium pill button (Valeria)
  const pill = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition border ${
      active
        ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
        : "border-slate-700 bg-slate-950/40 text-slate-100 hover:border-slate-500 hover:bg-slate-900/40"
    }`;

  const ghostBtn =
    "inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-900 hover:border-slate-500 transition";

  const primaryBtn =
    "inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15 hover:border-emerald-400/60 transition";

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

          <Link href="/espace-ecoles" className={topLink(isActive(pathname, "/espace-ecoles"))}>
            <span className="inline-flex items-center gap-2">
              <School className="h-4 w-4" />
              Établissement
            </span>
          </Link>

          <span className="mx-2 h-5 w-px bg-slate-800" />

          {/* ⭐ VALERIA — SYSTEM (CTA principal) */}
          <div ref={valeriaRef} className="relative">
            <button
              type="button"
              onClick={() => setValeriaOpen((v) => !v)}
              className={pill(isActive(pathname, "/optimiseur") || isActive(pathname, "/valeria-consulting"))}
              aria-expanded={valeriaOpen}
              aria-haspopup="menu"
              title="Valeria — Optimisation mesurable"
            >
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Valeria
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-slate-200 border border-slate-700">
                /20
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${valeriaOpen ? "rotate-180" : ""}`} />
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
                      <span className="block font-semibold">Formation & Consulting</span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        Entreprises • centres de formation • accompagnement
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

          <Link href="/tarifs" className={topLink(isActive(pathname, "/tarifs"))}>
            <span className="inline-flex items-center gap-2">
              <Euro className="h-4 w-4" />
              Tarifs
            </span>
          </Link>

          <Link href="/contact" className={topLink(isActive(pathname, "/contact"))}>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact
            </span>
          </Link>
        </div>

        {/* RIGHT CTA */}
        <div className="hidden lg:flex items-center gap-2">
          {!authLoading && !isLoggedIn && (
            <>
              <Link href={AUTH_ROUTES.signin} className={ghostBtn}>
                <LogIn className="h-4 w-4" />
                Connexion
              </Link>
              <Link href={AUTH_ROUTES.signup} className={primaryBtn}>
                <UserPlus className="h-4 w-4" />
                Inscription
              </Link>
            </>
          )}

          {!authLoading && isLoggedIn && (
            <>
              <Link href="/dashboard" className={primaryBtn}>
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <button onClick={logout} className={ghostBtn} title={userEmail ?? "Déconnexion"}>
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </>
          )}
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
            </div>

            {/* Valeria (business highlight) */}
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
                Système d’optimisation mesurable • entreprises & formation
              </p>
            </div>

            {/* Tarifs / Contact */}
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/tarifs"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Tarifs
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
              >
                Contact
              </Link>
            </div>

            {/* Auth */}
            {!authLoading && !isLoggedIn && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href={AUTH_ROUTES.signin}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900"
                >
                  Connexion
                </Link>
                <Link
                  href={AUTH_ROUTES.signup}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15"
                >
                  Inscription
                </Link>
              </div>
            )}

            {!authLoading && isLoggedIn && (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/15"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    setMobileOpen(false);
                  }}
                  className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 text-left"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


