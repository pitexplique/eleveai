"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_MATHS = [
  { href: "/coach-ia/maths",   icon: "🧠", label: "Coach Maths IA",    desc: "Toutes notions, CP → Terminale" },
  { href: "/parcours",         icon: "🛤️", label: "Parcours Maths",    desc: "Bilan de compétences personnalisé" },
  { href: "/coach-brevet",     icon: "📚", label: "Coach Brevet",       desc: "Sprint J−30, toutes les notions" },
  { href: "/coach-bac-spe",    icon: "🎓", label: "Coach Bac Spé",      desc: "Suites, fonctions, proba" },
  { href: "/calcul-rapide",    icon: "⚡", label: "Calcul rapide",      desc: "5 min d'automatismes" },
  { href: "/dico/maths/6e",    icon: "📒", label: "Dico Maths 6e",      desc: "50 mots & gestes pour l'éval nationale" },
  { href: "/fiches-cours/maths", icon: "PDF", label: "Fiches de cours",    desc: "Cours maths courts à télécharger" },
  { href: "/cahier-vacances/vers-la-6e", icon: "☀️", label: "Cahier de vacances", desc: "Vers la 6e : 1 page/jour à imprimer" },
  { href: "/concours-general", icon: "🏆", label: "Concours général",   desc: "Problèmes avancés" },
  { href: "/defis-du-jour",    icon: "🎯", label: "Défis du jour",      desc: "Grand Raid 2026" },
  { href: "/podcast-maths",    icon: "🎧", label: "Podcast maths",      desc: "Fractions, pourcentages, probas en audio" },
];

const NAV_FRANCAIS = [
  { href: "/coach-ia/francais",  icon: "📖", label: "Coach Français IA", desc: "Grammaire, conjugaison, vocabulaire" },
  { href: "/parcours-francais",  icon: "🛤️", label: "Parcours Français", desc: "Bilan de compétences français" },
  { href: "/dico/francais/6e",   icon: "📒", label: "Dico Français 6e",  desc: "50 mots & gestes pour l'éval nationale" },
];

const NAV_ANGLAIS = [
  { href: "/coach-ia/english-maths", icon: "🇬🇧", label: "Coach English Maths", desc: "A1 → B2, vocabulaire maths en anglais" },
  { href: "/parcours-english-maths", icon: "🛤️", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio" },
  { href: "/english-maths",          icon: "📅", label: "Semaine des verbes",     desc: "Vocabulaire anglais de la semaine" },
];

const NAV_ESPAGNOL = [
  { href: "/coach-ia/espagnol",          icon: "🇪🇸", label: "Coach Espagnol IA",  desc: "A1 → B2, vocabulaire & expressions" },
  { href: "/parcours-espagnol",          icon: "🛤️", label: "Parcours Espagnol",  desc: "Bilan de niveau CECRL avec audio"    },
  { href: "/coach-ia/espagnol?classe=a1",icon: "🌱",  label: "Niveau A1",          desc: "Chiffres, couleurs, famille, école"  },
  { href: "/coach-ia/espagnol?classe=a2",icon: "🏙️", label: "Niveau A2",          desc: "Vie quotidienne, voyage, métiers"    },
  { href: "/coach-ia/espagnol?classe=b1",icon: "🌍",  label: "Niveau B1",          desc: "Opinions, environnement, société"    },
  { href: "/coach-ia/espagnol?classe=b2",icon: "🎓",  label: "Niveau B2",          desc: "Géopolitique, littérature, culture"  },
];

const NAV_IA = [
  { href: "/coach-ia/ia",          icon: "IA", label: "Coach IA", desc: "A1 -> C1, comprendre, utiliser, verifier, creer" },
  { href: "/parcours-ia",          icon: "🛤️", label: "Parcours IA", desc: "Bilan de culture et de reflexes IA, A1 -> C1" },
  { href: "/eval-pix-ia",          icon: "🎓", label: "Éval blanche Pix IA", desc: "Prépa éval nationale : 3 domaines, profil de compétences" },
  { href: "/fiches-cours/ia",      icon: "PDF", label: "Fiches de cours IA", desc: "Cours IA par domaine, à lire ou télécharger en PDF" },
  { href: "/fiches-cours/ia/livre", icon: "📕", label: "Le livre IA", desc: "Les 16 fiches en un livre, à télécharger en PDF ou EPUB" },
  { href: "/livre/comprendre-l-ia.epub", icon: "⬇️", label: "Ebook IA (EPUB)", desc: "Télécharger le livre au format liseuse", download: true },
  { href: "/coach-ia/ia?classe=a1", icon: "A1", label: "A1 Comprendre", desc: "Comprendre et expliquer" },
  { href: "/coach-ia/ia?classe=a2", icon: "A2", label: "A2 Utiliser", desc: "Utiliser pour apprendre" },
  { href: "/coach-ia/ia?classe=b1", icon: "B1", label: "B1 Securite", desc: "Verifier et se proteger" },
  { href: "/coach-ia/ia?classe=b2", icon: "B2", label: "B2 Creer", desc: "Produire avec methode" },
  { href: "/coach-ia/ia?classe=c1", icon: "C1", label: "C1 Projet", desc: "Concevoir un projet utile" },
];

const NAV_ECONOMIE = [
  { href: "/coach-ia/economie",                          icon: "💰", label: "Coach Économie IA",    desc: "Entreprise, marché, travail, fiscalité"  },
  { href: "/coach-ia/economie?classe=eco-decouverte",    icon: "🌱", label: "Découverte",            desc: "Budget famille, argent, épargne"         },
  { href: "/coach-ia/economie?classe=eco-college",       icon: "🏫", label: "Collège",               desc: "Entreprise, marché, fiscalité, élections" },
  { href: "/coach-ia/economie?classe=eco-lycee",         icon: "🎓", label: "Lycée",                 desc: "Macro-économie, politiques publiques"    },
];

const NAV_PARCOURS = [
  { href: "/parcours",               icon: "🛤️", label: "Parcours Maths",    desc: "Bilan de compétences personnalisé" },
  { href: "/parcours-francais",      icon: "📖", label: "Parcours Français", desc: "Bilan de compétences français" },
  { href: "/parcours-english-maths", icon: "🇬🇧", label: "Parcours English",  desc: "Niveau CECRL avec audio" },
  { href: "/parcours-espagnol",      icon: "🇪🇸", label: "Parcours Espagnol", desc: "Niveau CECRL avec audio" },
  { href: "/parcours-ia",            icon: "🤖", label: "Parcours IA",       desc: "Culture et réflexes IA, A1 → C1" },
];

type NavItem = { href: string; icon: string; label: string; desc: string; download?: boolean };

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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  // Close on click outside
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      cancelClose();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => { cancelClose(); setOpen(true); }}
      onMouseLeave={scheduleClose}
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
        <div
          className="absolute left-0 top-full z-[80] mt-1 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#041B33] shadow-2xl"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          {items.map((item, i) => {
            const cls = [
              "flex items-start gap-3 px-4 py-3 transition hover:bg-white/10",
              i === 0 ? "rounded-t-2xl" : "",
              i === items.length - 1 ? "rounded-b-2xl" : "border-b border-white/5",
            ].join(" ");
            const inner = (
              <>
                <span className="mt-0.5 text-lg leading-none">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              </>
            );
            return item.download ? (
              <a key={item.href} href={item.href} download onClick={() => setOpen(false)} className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls}>
                {inner}
              </Link>
            );
          })}
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
        {items.map((item) => {
          const cls = [
            "flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold text-white transition hover:bg-white/15",
            isActive(pathname, item.href)
              ? "border-white/40 bg-white/15"
              : "border-white/10 bg-white/5",
          ].join(" ");
          const inner = (
            <>
              <span className="text-base">{item.icon}</span>
              <span className="leading-tight">{item.label}</span>
            </>
          );
          return item.download ? (
            <a key={item.href} href={item.href} download className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className={cls}>
              {inner}
            </Link>
          );
        })}
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
        <Link href="/accueil" className="group flex shrink-0 items-center gap-3 rounded-full pr-1 transition hover:brightness-110">
          <div className="relative h-11 w-20 overflow-hidden rounded-[18px] shadow-[0_0_22px_rgba(248,200,70,0.22)] ring-1 ring-white/15">
            <Image
              src="/logo-eleveai-header.svg"
              alt=""
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[1.05rem] font-black tracking-tight text-white">
              Eleve<span className="text-cyan-200">AI</span>
            </span>
            <span className="hidden text-xs text-cyan-100/75 sm:block">
              Un détail peut tout changer
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

          <NavDropdown
            label="Espagnol"
            items={NAV_ESPAGNOL}
            active={anyActive(pathname, NAV_ESPAGNOL)}
            accent="text-red-300"
          />

          <NavDropdown
            label="IA"
            items={NAV_IA}
            active={anyActive(pathname, NAV_IA)}
            accent="text-cyan-300"
          />

          <NavDropdown
            label="Économie"
            items={NAV_ECONOMIE}
            active={anyActive(pathname, NAV_ECONOMIE)}
            accent="text-amber-300"
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
        <div className="max-h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain border-t border-cyan-300/20 bg-gradient-to-b from-[#062A4F] to-[#041B33] px-4 pb-10 pt-4 lg:hidden">
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
            <MobileSection title="Anglais"   accent="text-blue-300"   items={NAV_ANGLAIS}   pathname={pathname} />
            <MobileSection title="Espagnol" accent="text-red-300"    items={NAV_ESPAGNOL}  pathname={pathname} />
            <MobileSection title="IA"       accent="text-cyan-300"   items={NAV_IA}       pathname={pathname} />
            <MobileSection title="Économie" accent="text-amber-300"  items={NAV_ECONOMIE}  pathname={pathname} />

          </div>
        </div>
      )}
    </header>
  );
}
