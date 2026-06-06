"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Menu, X, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_MATHS = [
  { href: "/coach-ia/maths",   icon: "🧠", label: "Coach Maths IA",    desc: "Toutes notions, CP → Terminale" },
  { href: "/parcours",         icon: "🛤️", label: "Parcours Maths",    desc: "Bilan de compétences personnalisé" },
  { href: "/coach-brevet",     icon: "📚", label: "Coach Brevet",       desc: "Sprint J−30, toutes les notions" },
  { href: "/coach-bac-spe",    icon: "🎓", label: "Coach Bac Spé",      desc: "Suites, fonctions, proba" },
  { href: "/calcul-rapide",    icon: "⚡", label: "Calcul rapide",      desc: "5 min d'automatismes" },
  { href: "/concours-general", icon: "🏆", label: "Concours général",   desc: "Problèmes avancés" },
  { href: "/defis-du-jour",    icon: "🎯", label: "Défis du jour",      desc: "Maths contextualisés 974" },
];

const NAV_FRANCAIS = [
  { href: "/coach-ia/francais", icon: "📖", label: "Coach Français IA", desc: "Grammaire, conjugaison, vocabulaire" },
  { href: "/lecon-du-jour",     icon: "🎧", label: "Leçon du jour",     desc: "Écoute et comprends en 10 min" },
];

const NAV_ANGLAIS = [
  { href: "/coach-ia/english-maths", icon: "🇬🇧", label: "Coach English Maths", desc: "A1 → B2, vocabulaire maths en anglais" },
  { href: "/parcours-english-maths", icon: "🛤️", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio" },
  { href: "/english-maths",          icon: "📋", label: "English Maths",         desc: "Accueil & présentation" },
];

const NAV_PARCOURS = [
  { href: "/parcours",               icon: "🛤️", label: "Parcours Maths",   desc: "Bilan de compétences personnalisé" },
  { href: "/parcours-english-maths", icon: "🇬🇧", label: "Parcours English", desc: "Niveau CECRL avec audio" },
];

type NavItem = { href: string; icon: string; label: string; desc: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function anyActive(pathname: string, items: NavItem[]) {
  return items.some((item) => isActive(pathname, item.href));
}

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function NavDropdown({
  label,
  items,
  active,
  accent,
}: {
  label: string;
  items: NavItem[];
  active: boolean;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition",
          active
            ? "bg-white text-[#041B33] shadow-lg"
            : "text-white/90 hover:bg-white/15 hover:text-white",
        ].join(" ")}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-[80] mt-1 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#041B33] shadow-2xl">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={[
                "flex items-start gap-3 px-4 py-3 transition hover:bg-white/10",
                i === 0 ? "rounded-t-2xl" : "",
                i === items.length - 1 ? "rounded-b-2xl" : "border-b border-white/5",
              ].join(" ")}
            >
              <span className="mt-0.5 text-lg leading-none">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-xs text-white/50">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Mobile section ───────────────────────────────────────────────────────────

function MobileSection({
  title,
  accent,
  items,
  pathname,
}: {
  title: string;
  accent: string;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <div>
      <p className={`mb-2 text-[10px] font-black uppercase tracking-[0.2em] ${accent}`}>
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold text-white transition hover:bg-white/15",
              isActive(pathname, item.href)
                ? "border-white/40 bg-white/15"
                : "border-white/10 bg-white/5",
            ].join(" ")}
          >
            <span className="text-base">{item.icon}</span>
            <span className="leading-tight">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const eleveLabel = eleve?.nom || eleve?.code_eleve || "Élève";
  const eleveClasse = eleve?.classe?.toUpperCase() ?? null;
  const typeUtilisateur = eleve?.type_utilisateur ?? null;
  const isProf = typeUtilisateur === "prof";
  const isPrincipal = typeUtilisateur === "principal" || typeUtilisateur === "boss";
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

  const linkBase = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
      active
        ? "bg-white text-[#041B33] shadow-lg"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/20 bg-gradient-to-r from-[#041B33]/95 via-[#062A4F]/95 to-[#073B63]/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link href="/accueil" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-200 via-emerald-300 to-amber-300 text-[#041B33] shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-white">
              Eleve<span className="text-emerald-300">AI</span>
            </span>
            <span className="hidden text-xs text-cyan-100/75 sm:block">
              Comprendre · S&apos;entraîner · Réussir
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">

          <Link href="/accueil" className={linkBase(isActive(pathname, "/accueil"))}>
            Accueil
          </Link>

          <NavDropdown
            label="Maths"
            items={NAV_MATHS}
            active={anyActive(pathname, NAV_MATHS)}
            accent="text-orange-300"
          />

          <NavDropdown
            label="Français"
            items={NAV_FRANCAIS}
            active={anyActive(pathname, NAV_FRANCAIS)}
            accent="text-sky-300"
          />

          <NavDropdown
            label="Anglais"
            items={NAV_ANGLAIS}
            active={anyActive(pathname, NAV_ANGLAIS)}
            accent="text-blue-300"
          />


          {/* Auth */}
          {eleve ? (
            <div className="ml-3 flex items-center gap-2">
              <Link
                href={dashboardHref}
                className={`inline-flex items-center gap-2 rounded-full ${dashboardColor} px-4 py-2 text-sm font-black text-[#041B33] shadow-lg hover:brightness-110`}
              >
                <GraduationCap className="h-4 w-4" />
                {dashboardLabel}
              </Link>
              <button
                type="button"
                onClick={logoutEleve}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 border border-red-400/30 px-3 py-2 text-sm font-bold text-red-300 hover:bg-red-500/30 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin?mode=eleve"
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-2 text-sm font-black text-[#041B33] shadow-lg hover:brightness-110 transition"
            >
              <GraduationCap className="h-4 w-4" />
              Connexion / inscription
            </Link>
          )}
        </div>

        {/* Mobile — bouton hamburger */}
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
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-cyan-200/20 bg-white/10 p-2 text-white shadow-lg"
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-cyan-300/20 bg-gradient-to-b from-[#062A4F] to-[#041B33] px-4 pb-6 pt-4 lg:hidden">
          <div className="space-y-5">

            {/* Auth mobile */}
            {eleve ? (
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Link href={dashboardHref} className="flex items-center gap-2 text-sm font-black text-white">
                  <GraduationCap className="h-4 w-4 text-emerald-300" />
                  {dashboardLabel}
                </Link>
                <button
                  type="button"
                  onClick={logoutEleve}
                  className="rounded-full bg-red-500/20 p-2 text-red-300 hover:bg-red-500/30"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin?mode=eleve"
                className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-4 py-3 text-sm font-black text-[#041B33] shadow"
              >
                <GraduationCap className="h-4 w-4" />
                Connexion / inscription
              </Link>
            )}

            <MobileSection title="Maths"    accent="text-orange-300" items={NAV_MATHS}    pathname={pathname} />
            <MobileSection title="Français" accent="text-sky-300"    items={NAV_FRANCAIS} pathname={pathname} />
            <MobileSection title="Anglais"  accent="text-blue-300"   items={NAV_ANGLAIS}  pathname={pathname} />

          </div>
        </div>
      )}
    </header>
  );
}
