"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Target,
  Brain,
  Route,
  Menu,
  X,
  Home,
  BadgeCheck,
  GraduationCap,
  LogOut,
  Flame,
  Puzzle,
  Trophy,
} from "lucide-react";
import { useEleve } from "@/context/EleveContext";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { eleve, logout } = useEleve();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function logoutEleve() {
    logout();
    window.location.href = "/accueil";
  }

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-white text-[#041B33] shadow-lg"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      active
        ? "bg-white text-[#041B33]"
        : "bg-white/10 text-white hover:bg-white/15"
    }`;

  const eleveLabel = eleve?.nom || eleve?.code_eleve || "Élève";

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-cyan-300/20
        bg-gradient-to-r from-[#041B33]/95 via-[#062A4F]/95 to-[#073B63]/95
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
      "
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* LOGO */}
        <Link href="/accueil" className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 items-center justify-center rounded-2xl
              bg-gradient-to-br from-cyan-200 via-emerald-300 to-amber-300
              text-[#041B33] shadow-lg
            "
          >
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-white">
              Eleve<span className="text-emerald-300">AI</span>
            </span>
            <span className="hidden text-xs text-cyan-100/75 sm:block">
              Comprendre • S’entraîner • Réussir
            </span>
          </div>
        </Link>

        {/* DESKTOP */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/accueil"
            className={linkClass(isActive(pathname, "/accueil"))}
          >
            <Home className="h-4 w-4 text-cyan-300" />
            Accueil
          </Link>

          <Link
            href="/coach-bac-spe"
            className={`relative ${linkClass(
              isActive(pathname, "/coach-bac-spe")
            )}`}
          >
            <GraduationCap className="h-4 w-4 text-violet-300" />
            Bac Spé
            <span className="absolute -right-2 -top-2 rounded-full bg-violet-400 px-1.5 text-[10px] font-black text-white">
              16 juin
            </span>
          </Link>

          <Link
            href="/coach-maths-ia"
            className={linkClass(isActive(pathname, "/coach-maths-ia"))}
          >
            <Brain className="h-4 w-4 text-orange-300" />
            Coach
          </Link>

          <Link
            href="/parcours"
            className={linkClass(isActive(pathname, "/parcours"))}
          >
            <Route className="h-4 w-4 text-purple-300" />
            Parcours
          </Link>

          <Link
            href="/calcul-rapide"
            className={linkClass(isActive(pathname, "/calcul-rapide"))}
          >
            <Target className="h-4 w-4 text-green-300" />
            Calcul rapide
          </Link>

          <Link
            href="/concours-general"
            className={`relative ${linkClass(
              isActive(pathname, "/concours-general")
            )}`}
          >
            <Trophy className="h-4 w-4 text-amber-300" />
            Concours général
            <span className="absolute -right-2 -top-2 rounded-full bg-amber-400 px-1.5 text-[10px] font-black text-[#041B33]">
              new
            </span>
          </Link>

          <Link
            href="/english-maths"
            className={[
              "relative flex items-center justify-center gap-2 rounded-2xl",
              "bg-gradient-to-r from-blue-700 via-white to-red-500",
              "px-3 py-2 text-xs font-black text-[#041B33]",
              "shadow-lg transition hover:scale-[1.03] hover:shadow-xl",
              isActive(pathname, "/english-maths")
                ? "ring-2 ring-white/80"
                : "ring-1 ring-white/20",
            ].join(" ")}
          >
            <span className="text-lg leading-none">🇬🇧</span>
            <span className="leading-tight">
              English
              <br />
              5 mots / jours
            </span>
          </Link>

          <Link
            href="/lecon-du-jour"
            className={`relative ${linkClass(
              isActive(pathname, "/lecon-du-jour")
            )}`}
          >
            <Flame className="h-4 w-4 text-orange-300" />
            Leçon du jour
            <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-1.5 text-[10px] text-white">
              🔥
            </span>
          </Link>

          <Link
            href="/defis-du-jour"
            className={linkClass(isActive(pathname, "/defis-du-jour"))}
          >
            <Puzzle className="h-4 w-4 text-pink-300" />
            Défis 974
          </Link>

          <Link
            href="/optimiseur"
            className={linkClass(isActive(pathname, "/optimiseur"))}
          >
            <BadgeCheck className="h-4 w-4 text-amber-300" />
            Valéria
          </Link>

          {/* AUTH */}
          {eleve ? (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href="/parcours"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-gradient-to-r from-emerald-300 to-cyan-300
                  px-4 py-2 text-sm font-black text-[#041B33]
                  shadow-lg hover:brightness-110
                "
              >
                <GraduationCap className="h-4 w-4" />
                {eleveLabel}
              </Link>

              <button
                type="button"
                onClick={logoutEleve}
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-red-500 px-3.5 py-2 text-sm font-bold text-white
                  hover:bg-red-600
                "
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin-eleve"
              className="
                ml-2 inline-flex items-center gap-2 rounded-full
                bg-gradient-to-r from-emerald-300 to-cyan-300
                px-4 py-2 text-sm font-black text-[#041B33]
                shadow-lg hover:brightness-110
              "
            >
              <GraduationCap className="h-4 w-4" />
              Connexion élève
            </Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="
            rounded-full border border-cyan-200/20
            bg-white/10 p-2 text-white
            shadow-lg lg:hidden
          "
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          className="
            border-t border-cyan-300/20
            bg-gradient-to-b from-[#062A4F] to-[#041B33]
            px-4 py-4 lg:hidden
          "
        >
          <div className="grid gap-2">
            <Link
              href="/accueil"
              className={mobileLinkClass(isActive(pathname, "/accueil"))}
            >
              <Home className="h-4 w-4 text-cyan-300" />
              Accueil
            </Link>

            <Link
              href="/coach-bac-spe"
              className="
                flex items-center justify-center gap-3 rounded-2xl
                bg-gradient-to-r from-blue-600 to-violet-700
                px-4 py-4 font-black text-white shadow-lg
              "
            >
              <GraduationCap className="h-5 w-5" />
              Bac Spé Maths · 16 juin
            </Link>

            <Link
              href="/coach-maths-ia"
              className={mobileLinkClass(isActive(pathname, "/coach-maths-ia"))}
            >
              <Brain className="h-4 w-4 text-orange-300" />
              Coach Maths IA
            </Link>

            <Link
              href="/parcours"
              className={mobileLinkClass(isActive(pathname, "/parcours"))}
            >
              <Route className="h-4 w-4 text-purple-300" />
              Parcours
            </Link>

            <Link
              href="/calcul-rapide"
              className={mobileLinkClass(isActive(pathname, "/calcul-rapide"))}
            >
              <Target className="h-4 w-4 text-green-300" />
              Calcul rapide
            </Link>

            <Link
              href="/concours-general"
              className="
                flex items-center justify-center gap-3 rounded-2xl
                bg-gradient-to-r from-amber-300 to-orange-400
                px-4 py-4 font-black text-[#041B33] shadow-lg
              "
            >
              <Trophy className="h-5 w-5" />
              Concours général 🏆
            </Link>

            <Link
              href="/english-maths"
              className="
                flex items-center justify-center gap-3 rounded-2xl
                bg-gradient-to-r from-blue-700 via-slate-50 to-red-500
                px-4 py-4 font-black text-[#041B33] shadow-lg
              "
            >
              <span className="text-xl leading-none">🇬🇧</span>
              English Maths
            </Link>

            <Link
              href="/lecon-du-jour"
              className="
                flex items-center justify-center gap-3 rounded-2xl
                bg-orange-500 px-4 py-4 font-black text-white shadow-lg
              "
            >
              <Flame className="h-5 w-5" />
              Leçon du jour 🔥
            </Link>

            <Link
              href="/defis-du-jour"
              className={mobileLinkClass(
                isActive(pathname, "/defis-du-jour")
              )}
            >
              <Puzzle className="h-4 w-4 text-pink-300" />
              Défis 974
            </Link>

            <Link
              href="/optimiseur"
              className={mobileLinkClass(isActive(pathname, "/optimiseur"))}
            >
              <BadgeCheck className="h-4 w-4 text-amber-300" />
              Valéria
            </Link>

            {eleve ? (
              <div className="mt-3 grid gap-2 border-t border-cyan-300/20 pt-3">
                <Link
                  href="/parcours"
                  className="
                    flex items-center justify-center gap-2 rounded-2xl
                    bg-gradient-to-r from-emerald-300 to-cyan-300
                    px-4 py-3 font-black text-[#041B33]
                  "
                >
                  <GraduationCap className="h-4 w-4" />
                  {eleveLabel}
                </Link>

                <button
                  type="button"
                  onClick={logoutEleve}
                  className="
                    flex items-center justify-center gap-2 rounded-2xl
                    bg-red-500 px-4 py-3 font-black text-white
                  "
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin-eleve"
                className="
                  mt-3 flex items-center justify-center gap-2 rounded-2xl
                  bg-gradient-to-r from-emerald-300 to-cyan-300
                  px-4 py-3 font-black text-[#041B33]
                "
              >
                <GraduationCap className="h-4 w-4" />
                Connexion élève
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}