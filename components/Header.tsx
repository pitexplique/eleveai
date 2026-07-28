"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";
import { useAudience, type Audience } from "@/lib/useAudience";

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_MATHS = [
  { href: "/coach-ia/maths",   icon: "🧠", label: "Coach Maths IA",    desc: "Séries d'exercices corrigés, CP → Terminale" },
  { href: "/parcours",         icon: "🛤️", label: "Parcours Maths",    desc: "Bilan de compétences personnalisé" },
  { href: "/coach-brevet",     icon: "📚", label: "Coach Brevet",       desc: "Sprint J−30, toutes les notions" },
  { href: "/coach-bac-spe",    icon: "🎓", label: "Coach Bac Spé",      desc: "Suites, fonctions, proba" },
  { href: "/calcul-rapide",    icon: "⚡", label: "Calcul rapide",      desc: "5 min d'automatismes" },
  { href: "/dico/maths/6e",    icon: "📒", label: "Dico Maths 6e",      desc: "50 mots & gestes pour l'éval nationale" },
  { href: "/fiches-cours/maths", icon: "PDF", label: "Fiches de cours",    desc: "Cours maths courts à télécharger" },
  { href: "/guide-de-survie",    icon: "🆘", label: "Guides de survie",  desc: "Maths (CM1 → Tle) & français (CM1 → 3e) : l'essentiel, pièges & réflexes à imprimer" },
  { href: "/maths-974",        icon: "🌋", label: "Maths Réel · 974",       desc: "La Réunion en vidéo : à quoi servent les maths" },
  { href: "/picto-maths",      icon: "🃏", label: "Picto Maths · 974",      desc: "Défis « 1 image, 1 question » à imprimer" },
  { href: "/carte",            icon: "🗺️", label: "Chasse aux trésors · 974", desc: "La Réunion : trouve les trésors — maths, écologie, histoire" },
  { href: "/concours-general", icon: "🏆", label: "Concours général",   desc: "Problèmes avancés" },
  { href: "/defis-du-jour",    icon: "🎯", label: "Défis du jour",      desc: "Un défi maths chaque jour" },
  { href: "/podcast-maths",    icon: "🎧", label: "Podcast maths",      desc: "Fractions, pourcentages, probas en audio" },
];

const NAV_FRANCAIS = [
  { href: "/coach-ia/francais",  icon: "📖", label: "Coach Français IA", desc: "Séries d'exercices : grammaire, conjugaison, vocabulaire" },
  { href: "/parcours-francais",  icon: "🛤️", label: "Parcours Français", desc: "Bilan de compétences français" },
  { href: "/dico/francais/6e",   icon: "📒", label: "Dico Français 6e",  desc: "50 mots & gestes pour l'éval nationale" },
];

const NAV_ANGLAIS = [
  { href: "/coach-ia/english-maths", icon: "🇬🇧", label: "Coach English Maths", desc: "Séries d'exercices A1 → B2, maths en anglais" },
  { href: "/parcours-english-maths", icon: "🛤️", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio" },
  { href: "/english-maths",          icon: "📅", label: "Semaine des verbes",     desc: "Vocabulaire anglais de la semaine" },
];

const NAV_ESPAGNOL = [
  { href: "/coach-ia/espagnol",          icon: "🇪🇸", label: "Coach Espagnol IA",  desc: "Séries d'exercices A1 → B2, vocabulaire & expressions" },
  { href: "/parcours-espagnol",          icon: "🛤️", label: "Parcours Espagnol",  desc: "Bilan de niveau CECRL avec audio"    },
  { href: "/coach-ia/espagnol?classe=a1",icon: "🌱",  label: "Niveau A1",          desc: "Chiffres, couleurs, famille, école"  },
  { href: "/coach-ia/espagnol?classe=a2",icon: "🏙️", label: "Niveau A2",          desc: "Vie quotidienne, voyage, métiers"    },
  { href: "/coach-ia/espagnol?classe=b1",icon: "🌍",  label: "Niveau B1",          desc: "Opinions, environnement, société"    },
  { href: "/coach-ia/espagnol?classe=b2",icon: "🎓",  label: "Niveau B2",          desc: "Géopolitique, littérature, culture"  },
];

const NAV_IA = [
  { href: "/coach-ia/ia",          icon: "IA", label: "Coach IA", desc: "Séries d'exercices A1 -> C1, comprendre, utiliser, verifier, creer" },
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

// Économie MASQUÉE du menu le 23/07 (coach pas assez fourni — décision de
// Frédéric). La route /coach-ia/economie reste accessible (lien direct +
// sitemap). Pour la re-sortir : rétablir ce NAV_ECONOMIE + son entrée dans
// MATIERES (desktop) et sa MobileSection, et la carte de la grille accueil.

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

// ─── Desktop : un seul menu « Matières » (mega-menu en colonnes) ──────────────

const MATIERES: { label: string; accent: string; items: NavItem[] }[] = [
  { label: "Maths",    accent: "text-orange-300", items: NAV_MATHS },
  { label: "Français", accent: "text-sky-300",    items: NAV_FRANCAIS },
  { label: "Anglais",  accent: "text-blue-300",   items: NAV_ANGLAIS },
  { label: "Espagnol", accent: "text-red-300",    items: NAV_ESPAGNOL },
  { label: "IA",       accent: "text-cyan-300",   items: NAV_IA },
];

function MatieresMenu({ pathname, paper }: { pathname: string; paper: boolean }) {
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

  const active = MATIERES.some((m) => anyActive(pathname, m.items));

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
          paper
            ? active
              ? "bg-[#1d1c16] text-[#f6f1e4] shadow"
              : "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10 hover:text-[#1d1c16]"
            : active
              ? "bg-white text-[#041B33] shadow-lg"
              : "text-white/90 hover:bg-white/15 hover:text-white",
        ].join(" ")}
      >
        Matières
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full z-[80] mt-1 max-h-[78vh] w-[min(92vw,720px)] overflow-y-auto overscroll-contain rounded-2xl border p-4 shadow-2xl ${
            paper ? "border-[#1d1c16]/25 bg-[#f6f1e4]" : "border-white/10 bg-[#041B33]"
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
            {MATIERES.map((m) => (
              <div key={m.label}>
                <p className={`mb-1.5 text-[11px] font-black uppercase tracking-[0.18em] ${paper ? "text-cyan-800" : m.accent}`}>
                  {m.label}
                </p>
                <ul className="space-y-0.5">
                  {m.items.map((item) => {
                    const cls = paper
                      ? "flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-[#1d1c16]/80 transition hover:bg-[#1d1c16]/10 hover:text-[#1d1c16]"
                      : "flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-white/80 transition hover:bg-white/10 hover:text-white";
                    const inner = (
                      <>
                        <span className="text-base leading-none">{item.icon}</span>
                        <span className="leading-tight">{item.label}</span>
                      </>
                    );
                    return (
                      <li key={item.href}>
                        {item.download ? (
                          <a href={item.href} download onClick={() => setOpen(false)} className={cls}>
                            {inner}
                          </a>
                        ) : (
                          <Link href={item.href} onClick={() => setOpen(false)} className={cls}>
                            {inner}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
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
  paper,
}: {
  title: string;
  accent: string;
  items: NavItem[];
  pathname: string;
  paper: boolean;
}) {
  return (
    <div>
      <p className={`mb-2 text-[10px] font-black uppercase tracking-[0.2em] ${paper ? "text-cyan-800" : accent}`}>
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const cls = [
            "flex items-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition",
            paper
              ? isActive(pathname, item.href)
                ? "border-[#1d1c16]/40 bg-[#1d1c16]/10 text-[#1d1c16]"
                : "border-[#1d1c16]/15 bg-[#1d1c16]/5 text-[#1d1c16] hover:bg-[#1d1c16]/10"
              : isActive(pathname, item.href)
                ? "border-white/40 bg-white/15 text-white hover:bg-white/15"
                : "border-white/10 bg-white/5 text-white hover:bg-white/15",
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

// Les 4 portes d'audience — affichées quand l'élève n'est pas connecté (barre
// déconnectée) ; un élève connecté voit ses matières à la place.
// « Élève » → /espace-eleves (25/07) : même destination que les sitelinks
// Google/Bing — la vitrine curée. Le catalogue /explorer reste à un clic
// (hero + fin de page d'espace-eleves, et menu de l'élève connecté).
const AUDIENCE_DOORS: { space: Audience; emoji: string; label: string; href: string }[] = [
  { space: "eleve", emoji: "🎓", label: "Élève", href: "/espace-eleves" },
  { space: "parent", emoji: "👪", label: "Parent", href: "/parents" },
  { space: "enseignant", emoji: "🍎", label: "Enseignant", href: "/enseignants" },
  { space: "etablissement", emoji: "🏫", label: "Établissement", href: "/espace-ecoles" },
];

// ─── Main Header ──────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { eleve, logout } = useEleve();
  const { space } = useAudience();
  const supabase = createClient();

  // Variante « papier » : sur l'accueil-journal, le header devient la tranche
  // haute du quotidien (crème + encre) ; partout ailleurs il reste bleu nuit.
  const paper = pathname === "/" || pathname === "/accueil";

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

  return (
    <header
      className={
        paper
          ? "sticky top-0 z-50 border-b border-[#1d1c16]/25 bg-[#f6f1e4]/95 backdrop-blur-xl"
          : "sticky top-0 z-50 border-b border-cyan-300/20 bg-gradient-to-r from-[#041B33]/95 via-[#062A4F]/95 to-[#073B63]/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      }
    >
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
            <span className={`text-[1.05rem] font-black tracking-tight ${paper ? "text-[#1d1c16]" : "text-white"}`}>
              Eleve<span className={paper ? "text-cyan-800" : "text-cyan-200"}>AI</span>
            </span>
            <span className={`hidden text-xs sm:block ${paper ? "font-serif italic text-[#1d1c16]/60" : "text-cyan-100/75"}`}>
              La liberté d&apos;apprendre
            </span>
          </div>
        </Link>

        {/* Desktop nav — Accueil (la Une) + les 4 audiences / rituels + auth.
            Avant, seul le logo ramenait à la Une : peu évident pour les élèves
            et les parents → un lien « Accueil » explicite (demande de Frédéric). */}
        <div className="hidden items-center gap-1.5 lg:flex">
          <Link
            href="/accueil"
            className={[
              "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-black transition",
              paper
                ? "bg-[#1d1c16] text-[#f6f1e4] shadow"
                : "text-white/85 hover:bg-white/15 hover:text-white",
            ].join(" ")}
          >
            <span>🗞️</span> Accueil
          </Link>
          {eleve && !isStaff ? (
            /* Élève CONNECTÉ → ses matières + rituels (pas les portes d'audience) */
            <>
              {(
                [
                  { href: "/dictee-du-jour", label: "✍️ Dictée", active: "bg-cyan-300 text-[#041B33] shadow-lg", idle: "bg-cyan-300/15 text-cyan-100 hover:bg-cyan-300/25 hover:text-white" },
                  { href: "/cahier-vacances", label: "☀️ Cahiers", active: "bg-amber-300 text-[#041B33] shadow-lg", idle: "bg-amber-300/15 text-amber-200 hover:bg-amber-300/25 hover:text-amber-100" },
                  { href: "/qui-suis-je-a-imprimer", label: "🃏 Jeux", active: "bg-fuchsia-300 text-[#041B33] shadow-lg", idle: "bg-fuchsia-300/15 text-fuchsia-200 hover:bg-fuchsia-300/25 hover:text-fuchsia-100" },
                  { href: "/explorer", label: "🧭 Explorer", active: "bg-violet-300 text-[#041B33] shadow-lg", idle: "bg-violet-300/15 text-violet-200 hover:bg-violet-300/25 hover:text-violet-100" },
                ] as const
              ).map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-black transition ${
                    paper
                      ? isActive(pathname, c.href)
                        ? "bg-[#1d1c16] text-[#f6f1e4] shadow"
                        : "bg-[#1d1c16]/10 text-[#1d1c16] hover:bg-[#1d1c16]/20"
                      : isActive(pathname, c.href)
                        ? c.active
                        : c.idle
                  }`}
                >
                  {c.label}
                </Link>
              ))}
              <MatieresMenu pathname={pathname} paper={paper} />
            </>
          ) : (
            AUDIENCE_DOORS.map((d) => (
              <Link
                key={d.space}
                href={d.href}
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-black transition",
                  paper
                    ? d.space === space
                      ? "bg-[#1d1c16] text-[#f6f1e4] shadow"
                      : "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10 hover:text-[#1d1c16]"
                    : d.space === space
                      ? "bg-white text-[#041B33] shadow-lg"
                      : "text-white/85 hover:bg-white/15 hover:text-white",
                ].join(" ")}
              >
                <span>{d.emoji}</span> {d.label}
              </Link>
            ))
          )}

          {eleve ? (
            <div className="ml-1 flex items-center gap-2">
              <Link
                href={dashboardHref}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black shadow-lg hover:brightness-110 ${
                  paper ? "bg-[#1d1c16] text-[#f6f1e4]" : `${dashboardColor} text-[#041B33]`
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                {dashboardLabel}
              </Link>
              <button
                type="button"
                onClick={logoutEleve}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-bold transition ${
                  paper
                    ? "border-red-800/30 bg-red-800/10 text-red-800 hover:bg-red-800/20"
                    : "border-red-400/30 bg-red-500/20 text-red-300 hover:bg-red-500/30"
                }`}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin?mode=eleve"
              className={`ml-1 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black shadow-lg transition hover:brightness-110 ${
                paper
                  ? "bg-[#1d1c16] text-[#f6f1e4] hover:bg-cyan-800"
                  : "bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#041B33]"
              }`}
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
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black shadow-lg ${
                paper
                  ? "bg-[#1d1c16] text-[#f6f1e4]"
                  : "bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#041B33]"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Connexion
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className={`rounded-full border p-2 shadow-lg ${
              paper
                ? "border-[#1d1c16]/25 bg-[#1d1c16]/5 text-[#1d1c16]"
                : "border-cyan-200/20 bg-white/10 text-white"
            }`}
            aria-label="Ouvrir le menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`max-h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain border-t px-4 pb-10 pt-4 lg:hidden ${
            paper
              ? "border-[#1d1c16]/25 bg-[#f6f1e4]"
              : "border-cyan-300/20 bg-gradient-to-b from-[#062A4F] to-[#041B33]"
          }`}
        >
          <div className="space-y-5">

            {/* Accueil (la Une) — même raison qu'en desktop : le logo ne suffit pas */}
            <Link
              href="/accueil"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black transition ${
                paper
                  ? isActive(pathname, "/accueil")
                    ? "border-[#1d1c16]/40 bg-[#1d1c16]/10 text-[#1d1c16]"
                    : "border-[#1d1c16]/15 bg-[#1d1c16]/5 text-[#1d1c16] hover:bg-[#1d1c16]/10"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/15"
              }`}
            >
              <span>🗞️</span> Accueil
            </Link>

            {/* Auth mobile */}
            {eleve ? (
              <div
                className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${
                  paper ? "border-[#1d1c16]/15 bg-[#1d1c16]/5" : "border-white/10 bg-white/5"
                }`}
              >
                <Link
                  href={dashboardHref}
                  className={`flex items-center gap-2 text-sm font-black ${paper ? "text-[#1d1c16]" : "text-white"}`}
                >
                  <GraduationCap className={`h-4 w-4 ${paper ? "text-cyan-800" : "text-emerald-300"}`} />
                  {dashboardLabel}
                </Link>
                <button
                  type="button"
                  onClick={logoutEleve}
                  className={`rounded-full p-2 ${
                    paper
                      ? "bg-red-800/10 text-red-800 hover:bg-red-800/20"
                      : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                  }`}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin?mode=eleve"
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black shadow ${
                  paper
                    ? "bg-[#1d1c16] text-[#f6f1e4]"
                    : "bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#041B33]"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Connexion / inscription
              </Link>
            )}

            {eleve && !isStaff ? (
              /* Élève connecté → toutes ses matières */
              <div className="space-y-5">
                <MobileSection title="Maths"    accent="text-orange-300" items={NAV_MATHS}    pathname={pathname} paper={paper} />
                <MobileSection title="Français" accent="text-sky-300"    items={NAV_FRANCAIS} pathname={pathname} paper={paper} />
                <MobileSection title="Anglais"  accent="text-blue-300"   items={NAV_ANGLAIS}  pathname={pathname} paper={paper} />
                <MobileSection title="Espagnol" accent="text-red-300"    items={NAV_ESPAGNOL} pathname={pathname} paper={paper} />
                <MobileSection title="IA"       accent="text-cyan-300"   items={NAV_IA}       pathname={pathname} paper={paper} />
              </div>
            ) : (
              /* Sinon → les 4 portes d'audience */
              <div className={`grid grid-cols-2 gap-2 border-t pt-4 ${paper ? "border-[#1d1c16]/15" : "border-white/10"}`}>
                {AUDIENCE_DOORS.map((d) => (
                  <Link
                    key={d.space}
                    href={d.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition",
                      paper
                        ? d.space === space
                          ? "border-[#1d1c16]/40 bg-[#1d1c16]/10 text-[#1d1c16]"
                          : "border-[#1d1c16]/15 bg-[#1d1c16]/5 text-[#1d1c16]/80"
                        : d.space === space
                          ? "border-white/40 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/80",
                    ].join(" ")}
                  >
                    <span className="text-base">{d.emoji}</span> {d.label}
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}
