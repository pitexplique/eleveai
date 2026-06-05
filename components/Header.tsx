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
  GraduationCap,
  LogOut,
  Flame,
  Puzzle,
  Trophy,
  BookOpen,
} from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coachOpen, setCoachOpen] = useState(false);
  const { eleve, logout } = useEleve();
  const supabase = createClient();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  async function logoutEleve() {
    await supabase.auth.signOut();
    logout();
    window.location.href = "/accueil";
  }

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-white text-[#041B33] shadow-lg"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  const mobileCardClass = (
    active: boolean,
    gradient: string,
    textColor = "text-white"
  ) =>
    [
      "flex items-center justify-center gap-3 rounded-2xl",
      "px-4 py-4 text-sm font-black shadow-lg transition",
      "hover:scale-[1.015] active:scale-[0.99]",
      gradient,
      textColor,
      active ? "ring-2 ring-white/80" : "ring-1 ring-white/15",
    ].join(" ");

  const eleveLabel = eleve?.nom || eleve?.code_eleve || "Élève";
  const eleveClasse = eleve?.classe?.toUpperCase() ?? null;

  const typeUtilisateur = eleve?.type_utilisateur ?? null;
  const isProf = typeUtilisateur === "prof";
  const isPrincipal =
    typeUtilisateur === "principal" || typeUtilisateur === "boss";
  const isStaff = isProf || isPrincipal;
  const dashboardHref = isPrincipal
    ? "/dashboard-principal"
    : isProf
      ? "/dashboard-prof"
      : "/dashboard-eleve";
  const dashboardLabel = isPrincipal
    ? "Principal"
    : isProf
      ? "Prof"
      : eleveClasse
        ? `${eleveLabel} · ${eleveClasse}`
        : eleveLabel;
  const dashboardColor = isStaff
    ? "bg-gradient-to-r from-blue-300 to-indigo-300"
    : "bg-gradient-to-r from-emerald-300 to-cyan-300";

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/20 bg-gradient-to-r from-[#041B33]/95 via-[#062A4F]/95 to-[#073B63]/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/accueil" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-emerald-300 to-amber-300 text-[#041B33] shadow-lg">
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

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/accueil"
            className={linkClass(isActive(pathname, "/accueil"))}
          >
            <Home className="h-4 w-4 text-cyan-300" />
            Accueil
          </Link>

          <div
            className="relative flex items-center"
            onMouseEnter={() => setCoachOpen(true)}
            onMouseLeave={() => setCoachOpen(false)}
          >
            <Link
              href="/coach-ia/maths"
              onClick={() => setCoachOpen(false)}
              className={linkClass(isActive(pathname, "/coach-ia"))}
            >
              <Brain className="h-4 w-4 text-orange-300" />
              Coach IA
            </Link>

            <button
              type="button"
              onClick={() => setCoachOpen((value) => !value)}
              onMouseEnter={() => setCoachOpen(true)}
              aria-label="Choisir la matiere du coach IA"
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white/90 transition hover:bg-white/15 hover:text-white"
            >
              v
            </button>

            {coachOpen && (
              <div className="absolute left-0 top-full z-[80] w-52 rounded-xl border border-white/10 bg-[#041B33] shadow-xl">
                <Link
                  href="/coach-ia/maths"
                  onClick={() => setCoachOpen(false)}
                  className="flex items-center gap-2 rounded-t-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Maths
                </Link>
                <Link
                  href="/coach-ia/francais"
                  onClick={() => setCoachOpen(false)}
                  className="flex items-center gap-2 rounded-b-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Français
                </Link>
              </div>
            )}
          </div>

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
            href="/coach-brevet"
            className={`relative ${linkClass(isActive(pathname, "/coach-brevet"))}`}
          >
            <BookOpen className="h-4 w-4 text-emerald-300" />
            Brevet
            <span className="absolute -right-2 -top-2 rounded-full bg-emerald-400 px-1.5 text-[10px] font-black text-[#041B33]">
              J−30
            </span>
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
            <span className="text-lg leading-none">GB</span>
            <span className="leading-tight">
              English
              <br />
              5 mots / jour
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
              feu
            </span>
          </Link>

          <Link
            href="/defis-du-jour"
            className={linkClass(isActive(pathname, "/defis-du-jour"))}
          >
            <Puzzle className="h-4 w-4 text-pink-300" />
            Défis 974
          </Link>

          {eleve ? (
            <div className="ml-2 flex items-center gap-2">
              <Link
                href={dashboardHref}
                className={`inline-flex items-center gap-2 rounded-full ${dashboardColor} px-4 py-2 text-sm font-black text-[#041B33] shadow-lg hover:brightness-110`}
                title="Mon tableau de bord"
              >
                <GraduationCap className="h-4 w-4" />
                {dashboardLabel}
              </Link>

              <button
                type="button"
                onClick={logoutEleve}
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3.5 py-2 text-sm font-bold text-white hover:bg-red-600"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin?mode=eleve"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-black text-[#041B33] shadow-lg hover:brightness-110"
            >
              <GraduationCap className="h-4 w-4" />
              Connexion / inscription
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          {!eleve && (
            <Link
              href="/auth/signin?mode=eleve"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-3 py-2 text-xs font-black text-[#041B33] shadow-lg"
            >
              <GraduationCap className="h-4 w-4" />
              Connexion
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="rounded-full border border-cyan-200/20 bg-white/10 p-2 text-white shadow-lg"
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-cyan-300/20 bg-gradient-to-b from-[#062A4F] to-[#041B33] px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {eleve ? (
              <div className="mb-3 grid gap-2 border-b border-cyan-300/20 pb-3">
                <Link
                  href={dashboardHref}
                  className={mobileCardClass(
                    isActive(pathname, dashboardHref),
                    isStaff
                      ? "bg-gradient-to-r from-blue-300 to-indigo-300"
                      : "bg-gradient-to-r from-emerald-300 to-cyan-300",
                    "text-[#041B33]"
                  )}
                >
                  <GraduationCap className="h-5 w-5" />
                  {isStaff
                    ? `Dashboard ${dashboardLabel}`
                    : `Mon espace - ${dashboardLabel}`}
                </Link>
              </div>
            ) : (
              <Link
                href="/auth/signin?mode=eleve"
                className={mobileCardClass(
                  isActive(pathname, "/auth/signin"),
                  "mb-3 bg-gradient-to-r from-emerald-300 to-cyan-300",
                  "text-[#041B33]"
                )}
              >
                <GraduationCap className="h-5 w-5" />
                Connexion / inscription
              </Link>
            )}

            <Link
              href="/accueil"
              className={mobileCardClass(
                isActive(pathname, "/accueil"),
                "bg-gradient-to-r from-cyan-500 to-blue-600"
              )}
            >
              <Home className="h-5 w-5" />
              Accueil
            </Link>

            <Link
              href="/coach-brevet"
              className={mobileCardClass(
                isActive(pathname, "/coach-brevet"),
                "bg-gradient-to-r from-emerald-400 to-teal-500",
                "text-[#041B33]"
              )}
            >
              <BookOpen className="h-5 w-5" />
              Brevet Maths · J−30
            </Link>

            <Link
              href="/coach-bac-spe"
              className={mobileCardClass(
                isActive(pathname, "/coach-bac-spe"),
                "bg-gradient-to-r from-blue-600 to-violet-700"
              )}
            >
              <GraduationCap className="h-5 w-5" />
              Bac Spé Maths · 16 juin
            </Link>

            <Link
              href="/coach-ia/maths"
              className={mobileCardClass(
                isActive(pathname, "/coach-ia/maths"),
                "bg-gradient-to-r from-orange-400 to-red-500"
              )}
            >
              <Brain className="h-5 w-5" />
              Coach Maths IA
            </Link>

            <Link
              href="/coach-ia/francais"
              className={mobileCardClass(
                isActive(pathname, "/coach-ia/francais"),
                "bg-gradient-to-r from-sky-500 to-indigo-600"
              )}
            >
              <BookOpen className="h-5 w-5" />
              Coach Français IA
            </Link>

            <Link
              href="/parcours"
              className={mobileCardClass(
                isActive(pathname, "/parcours"),
                "bg-gradient-to-r from-purple-500 to-fuchsia-600"
              )}
            >
              <Route className="h-5 w-5" />
              Parcours
            </Link>

            <Link
              href="/calcul-rapide"
              className={mobileCardClass(
                isActive(pathname, "/calcul-rapide"),
                "bg-gradient-to-r from-emerald-400 to-green-600"
              )}
            >
              <Target className="h-5 w-5" />
              Calcul rapide
            </Link>

            <Link
              href="/concours-general"
              className={mobileCardClass(
                isActive(pathname, "/concours-general"),
                "bg-gradient-to-r from-amber-300 to-orange-400",
                "text-[#041B33]"
              )}
            >
              <Trophy className="h-5 w-5" />
              Concours général
            </Link>

            <Link
              href="/english-maths"
              className={mobileCardClass(
                isActive(pathname, "/english-maths"),
                "bg-gradient-to-r from-blue-700 via-slate-50 to-red-500",
                "text-[#041B33]"
              )}
            >
              <span className="text-xl leading-none">GB</span>
              English Maths
            </Link>

            <Link
              href="/lecon-du-jour"
              className={mobileCardClass(
                isActive(pathname, "/lecon-du-jour"),
                "bg-gradient-to-r from-orange-500 to-red-600"
              )}
            >
              <Flame className="h-5 w-5" />
              Leçon du jour
            </Link>

            <Link
              href="/defis-du-jour"
              className={mobileCardClass(
                isActive(pathname, "/defis-du-jour"),
                "bg-gradient-to-r from-pink-500 to-rose-600"
              )}
            >
              <Puzzle className="h-5 w-5" />
              Défis 974
            </Link>

            {eleve && (
              <button
                type="button"
                onClick={logoutEleve}
                className="mt-3 flex items-center justify-center gap-3 rounded-2xl border border-red-300/30 bg-red-500/15 px-4 py-4 text-sm font-black text-red-100 shadow-lg transition hover:bg-red-500/25 active:scale-[0.99]"
              >
                <LogOut className="h-5 w-5" />
                Deconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
