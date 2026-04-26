"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Wand2,
  Target,
  Brain,
  Route,
  Mail,
  Menu,
  X,
  Home,
  BadgeCheck,
} from "lucide-react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-white text-slate-950 shadow-lg"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  const mobileLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
      active
        ? "bg-white text-slate-950"
        : "bg-white/10 text-white hover:bg-white/15"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/accueil" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-amber-300 text-slate-950 shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-white">
              Eleve<span className="text-emerald-300">AI</span>
            </span>
            <span className="hidden text-xs text-white/70 sm:block">
              Comprendre • S’entraîner • Réussir
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/accueil" className={linkClass(isActive(pathname, "/accueil"))}>
            <Home className="h-4 w-4 text-cyan-300" />
            Accueil
          </Link>

          <Link href="/optimiseur" className={linkClass(isActive(pathname, "/optimiseur"))}>
            <BadgeCheck className="h-4 w-4 text-amber-300" />
            Valéria
          </Link>

          <Link href="/espace-profs" className={linkClass(isActive(pathname, "/espace-profs"))}>
            <Wand2 className="h-4 w-4 text-blue-300" />
            Générateur profs
          </Link>

          <Link href="/coach-maths-ia" className={linkClass(isActive(pathname, "/coach-maths-ia"))}>
            <Brain className="h-4 w-4 text-orange-300" />
            Coach Maths
          </Link>

          <Link href="/calcul-rapide" className={linkClass(isActive(pathname, "/calcul-rapide"))}>
            <Target className="h-4 w-4 text-green-300" />
            Calcul Rapide
          </Link>

          <Link href="/parcours" className={linkClass(isActive(pathname, "/parcours"))}>
            <Route className="h-4 w-4 text-purple-300" />
            Parcours
          </Link>

          <Link href="/contact" className={linkClass(isActive(pathname, "/contact"))}>
            <Mail className="h-4 w-4 text-cyan-300" />
            Contact
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20 lg:hidden"
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            <Link href="/accueil" className={mobileLinkClass(isActive(pathname, "/accueil"))}>
              <Home className="h-4 w-4 text-cyan-300" />
              Accueil
            </Link>

            <Link href="/optimiseur" className={mobileLinkClass(isActive(pathname, "/optimiseur"))}>
              <BadgeCheck className="h-4 w-4 text-amber-300" />
              Valéria
            </Link>

            <Link href="/espace-profs" className={mobileLinkClass(isActive(pathname, "/espace-profs"))}>
              <Wand2 className="h-4 w-4 text-blue-300" />
              Générateur de prompts profs
            </Link>

            <Link href="/coach-maths-ia" className={mobileLinkClass(isActive(pathname, "/coach-maths-ia"))}>
              <Brain className="h-4 w-4 text-orange-300" />
              Coach maths
            </Link>

            <Link href="/calcul-rapide" className={mobileLinkClass(isActive(pathname, "/calcul-rapide"))}>
              <Target className="h-4 w-4 text-green-300" />
              Calcul Rapide
            </Link>

            <Link href="/parcours" className={mobileLinkClass(isActive(pathname, "/parcours"))}>
              <Route className="h-4 w-4 text-purple-300" />
              Parcours
            </Link>

            <Link href="/contact" className={mobileLinkClass(isActive(pathname, "/contact"))}>
              <Mail className="h-4 w-4 text-cyan-300" />
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}