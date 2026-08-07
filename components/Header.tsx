"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, GraduationCap, LogOut, ChevronDown } from "lucide-react";
import { useEleve } from "@/context/EleveContext";
import { createClient } from "@/lib/supabase/client";
import { useAudience, type Audience } from "@/lib/useAudience";
import { ouvrirEcrireAuProf } from "@/lib/ecrireAuProf";
import { urlGuidePour } from "@/lib/matrice/guides";
import { PROFILS } from "@/lib/matrice/profils";
import type { ProfilId } from "@/lib/matrice/types";

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_MATHS = [
  { href: "/coach-ia/maths",   icon: "🧠", label: "Coach Maths IA",    desc: "Séries d'exercices corrigés, CP → Terminale" },
  { href: "/parcours",         icon: "🛤️", label: "Parcours Maths",    desc: "Bilan de compétences personnalisé" },
  { href: "/coach-brevet",     icon: "📚", label: "Coach Brevet",       desc: "Sprint J−30, toutes les notions" },
  { href: "/coach-bac-spe",    icon: "🎓", label: "Coach Bac Spé",      desc: "Suites, fonctions, proba" },
  { href: "/calcul-rapide",    icon: "⚡", label: "Calcul rapide",      desc: "5 min d'automatismes" },
  { href: "/dico/maths/6e",    icon: "📒", label: "Dico Maths 6e",      desc: "50 mots & gestes pour l'éval nationale" },
  { href: "/fiches-cours/maths", icon: "PDF", label: "Fiches de cours",    desc: "Cours maths courts à télécharger" },
  { href: "/guide-de-survie",    icon: "🆘", label: "Guides de survie",  desc: "Maths (CM1 → Tle), français (CM1 → 3e) & anglais (A1 → B2) : l'essentiel, pièges & réflexes à imprimer" },
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
          // ⚠️ `font-black` et `px-3` comme TOUS ses voisins de rangée (06/08).
          // Elle était seule en `font-semibold px-4` : dans une rangée de cinq,
          // un élément plus léger et plus large se lit comme un accident, pas
          // comme une intention. Mesuré après : la nav tient toujours à 1024 px.
          "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-black transition",
          paper
            ? active
              ? "bg-teal-700 text-white shadow"
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
            paper ? "border-[#1d1c16]/25 bg-[#d8e9ee]" : "border-white/10 bg-[#041B33]"
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
                          <Link prefetch={false} href={item.href} onClick={() => setOpen(false)} className={cls}>
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
            <Link prefetch={false} key={item.href} href={item.href} className={cls}>
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
//
// ⭐ AU PLURIEL DEPUIS LE 07/08 (« Élèves », « Parents »…). Ce ne sont pas des
// étiquettes qu'on se colle en arrivant — ce sont des rayons. Au singulier, la
// rangée demandait « qui es-tu ? » une deuxième fois, à deux centimètres de
// l'endroit où la page le demande déjà.
const AUDIENCE_DOORS: { space: Audience; emoji: string; label: string; href: string }[] = [
  { space: "eleve", emoji: "🎓", label: "Élèves", href: "/espace-eleves" },
  { space: "parent", emoji: "👪", label: "Parents", href: "/parents" },
  { space: "enseignant", emoji: "🍎", label: "Enseignants", href: "/enseignants" },
  { space: "etablissement", emoji: "🏫", label: "Établissements", href: "/espace-ecoles" },
];

// ─── Le menu d'un élève CONNECTÉ ─────────────────────────────────────────────
//
// ⭐ REFAIT LE 07/08. Il portait « Dictée · Cahiers · Jeux · Explorer ·
// Matières » : deux rituels, deux catalogues, et pas une seule porte vers ce
// pour quoi les élèves viennent. Le coach et les parcours — les deux endroits
// qui gardent une trace de son travail — n'étaient nulle part.
//   ⛔ « Jeux » part : c'était /qui-suis-je-a-imprimer, des cartes à imprimer.
//      Excellent en classe, mais le mot promettait un jeu à l'écran.
//   ⛔ « Explorer » part : c'est le catalogue, et depuis que l'accueil demande
//      ce qu'on cherche, un catalogue en haut de page est la question qu'on
//      vient justement d'éviter. Il reste dans /espace-eleves et dans la
//      matrice.
//   ⭐ « Guide de survie » entre, et il ouvre CELUI DE SA CLASSE.
const MENU_ELEVE: { href: string; label: string; court: string }[] = [
  { href: "/coach-ia/maths", label: "🧠 Coach", court: "🧠 Coach" },
  { href: "/parcours", label: "🛤️ Parcours", court: "🛤️ Parcours" },
  { href: "/dictee-du-jour", label: "✍️ Dictée", court: "✍️ Dictée" },
  { href: "/cahier-vacances", label: "☀️ Cahier", court: "☀️ Cahier" },
];

/**
 * La classe enregistrée d'un élève → le niveau de la matrice.
 *
 * ⚠️ Les deux vocabulaires ne coïncident pas : le compte dit « premiere-spe »,
 * la matrice dit « premiere ». Sans cette traduction, « Guide de survie »
 * retombait sur le sommaire pour tout le lycée — c'est-à-dire au moment précis
 * où le guide de SA classe existe.
 */
function profilDeLaClasse(classe?: string | null): ProfilId | null {
  if (!classe) return null;
  const c = classe.trim().toLowerCase();
  const direct = PROFILS.find((p) => p.id === c);
  if (direct) return direct.id;
  if (c.startsWith("premiere")) return "premiere";
  if (c.startsWith("terminale")) return "terminale";
  if (c.startsWith("seconde") || c === "2nde") return "seconde";
  return null;
}

// ─── Le menu du compte, à droite ─────────────────────────────────────────────

function MenuCompte({
  nom,
  sousTitre,
  dashboardHref,
  estEleve,
  paper,
  onLogout,
}: {
  nom: string;
  sousTitre: string | null;
  dashboardHref: string;
  estEleve: boolean;
  paper: boolean;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const initiales = nom.trim().slice(0, 2).toUpperCase() || "?";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Mon compte"
        className={`inline-flex items-center gap-1.5 rounded-full p-0.5 pr-2 transition ${
          paper ? "hover:bg-[#1d1c16]/10" : "hover:bg-white/15"
        }`}
      >
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
            paper ? "bg-teal-700 text-white" : "bg-cyan-300 text-[#041B33]"
          }`}
        >
          {initiales}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""} ${
            paper ? "text-[#1d1c16]/60" : "text-white/70"
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full z-[80] mt-1 w-60 rounded-2xl border py-2 shadow-2xl ${
            paper ? "border-[#1d1c16]/20 bg-white" : "border-white/10 bg-[#041B33]"
          }`}
        >
          <div className={`px-4 pb-2 pt-1 ${paper ? "text-[#1d1c16]" : "text-white"}`}>
            <p className="truncate text-sm font-black">{nom}</p>
            {sousTitre && (
              <p className={`truncate text-xs ${paper ? "text-[#1d1c16]/60" : "text-white/60"}`}>
                {sousTitre}
              </p>
            )}
          </div>

          <div className={`border-t px-1 pt-1 ${paper ? "border-[#1d1c16]/10" : "border-white/10"}`}>
            {[
              { label: "Tableau de bord", href: dashboardHref },
              { label: "Mes apprentissages", href: "/parcours" },
              { label: "Donner mon avis", href: "/votre-avis" },
            ].map((l) => (
              <Link
                key={l.href}
                prefetch={false}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-1.5 text-sm ${
                  paper
                    ? "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* ⭐ « ÉCRIS-MOI » — déplacé ici le 07/08 depuis la pastille
                flottante qui occupait le bas-gauche de toutes les pages.
                Le formulaire est intact ; c'est le rappel permanent qui est
                parti. Réservé aux élèves : c'est la condition du composant. */}
            {estEleve && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  ouvrirEcrireAuProf();
                }}
                className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm ${
                  paper
                    ? "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                    : "text-white/85 hover:bg-white/10"
                }`}
              >
                ✉️ Écris-moi
              </button>
            )}
          </div>

          <div className={`mt-1 border-t px-1 pt-1 ${paper ? "border-[#1d1c16]/10" : "border-white/10"}`}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm ${
                paper ? "text-red-800 hover:bg-red-800/10" : "text-red-300 hover:bg-red-500/20"
              }`}
            >
              <LogOut className="h-4 w-4" />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
  // ⭐ LE NOM N'EST PLUS DANS LA BARRE (07/08), il est dans le menu du compte.
  // Le bouton affichait « MARIE DUPONT · 4C » en pastille pleine au milieu du
  // header : le nom d'un élève, en grand, sur un écran souvent partagé en
  // classe ou projeté. Ce qui reste visible dit la fonction — « Mon espace » —
  // et l'identité attend qu'on ouvre son propre menu.
  const dashboardSousTitre = isPrincipal
    ? "Chef d'établissement"
    : isProf
      ? "Enseignant"
      : eleveClasse
        ? `Élève · ${eleveClasse}`
        : "Élève";
  const dashboardColor = isStaff
    ? "bg-gradient-to-r from-blue-300 to-indigo-300"
    : "bg-gradient-to-r from-emerald-300 to-cyan-300";


  // Le guide de survie de SA classe — et le sommaire quand sa classe en a
  // plusieurs (ou aucun). On ne choisit pas les maths à la place de quelqu'un.
  const hrefGuide = urlGuidePour(profilDeLaClasse(eleve?.classe));

  return (
    <header
      className={
        paper
          ? "sticky top-0 z-50 border-b border-[#1d1c16]/25 bg-[#d8e9ee]/95 backdrop-blur-xl"
          : "sticky top-0 z-50 border-b border-cyan-300/20 bg-gradient-to-r from-[#041B33]/95 via-[#062A4F]/95 to-[#073B63]/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      }
    >
      {/* ⭐ TROIS ZONES, ET LA DU MILIEU EST VRAIMENT AU MILIEU (07/08).
          Le header était un `justify-between` : la marque à gauche, TOUT le
          reste poussé à droite en un seul bloc. La navigation d'audience et les
          boutons de compte se touchaient, et le centre de la page était vide.

          `grid-cols-[1fr_auto_1fr]` est la construction qui centre pour de bon :
          la colonne du milieu prend la largeur de son contenu, les deux autres
          se partagent EXACTEMENT ce qui reste. Le centre de la nav tombe donc
          sur le centre de la page, quelle que soit la longueur du logo à gauche
          ou du nom à droite. Un `justify-center` dans un flex ne fait pas ça :
          il centre dans la place restante, ce qui n'est pas la même chose.

          ⚠️ SUR L'ACCUEIL, LE HEADER VA D'UN BORD À L'AUTRE (06/08). Le
          conteneur de 1 280 px centré vient du journal ; depuis que l'accueil a
          sa colonne de gauche, il laissait un coin vide au-dessus d'elle.
          Sans effet sous 1 280 px : seuls les grands écrans changent. */}
      <nav
        className={[
          "grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2.5",
          paper ? "w-full" : "mx-auto max-w-7xl",
        ].join(" ")}
      >
        {/* ── ZONE 1 : LA MARQUE, complètement à gauche ─────────────────── */}
        <div className="flex min-w-0 items-center gap-1.5 justify-self-start">
          <Link
            prefetch={false}
            href="/accueil"
            className="group flex shrink-0 items-center gap-2.5 rounded-full pr-1 transition hover:brightness-110"
          >
            <div className="relative h-10 w-[72px] overflow-hidden rounded-[16px] shadow-[0_0_22px_rgba(248,200,70,0.22)] ring-1 ring-white/15">
              <Image
                src="/logo-eleveai-header.svg"
                alt=""
                fill
                sizes="72px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`text-[1.05rem] font-black tracking-tight ${paper ? "text-[#1d1c16]" : "text-white"}`}>
                Eleve<span className={paper ? "text-cyan-800" : "text-cyan-200"}>AI</span>
              </span>
              <span className={`hidden text-xs xl:block ${paper ? "font-serif italic text-[#1d1c16]/60" : "text-cyan-100/75"}`}>
                La liberté d&apos;apprendre
              </span>
            </div>
          </Link>

          {/* ── LA PORTE DE RETOUR ────────────────────────────────────────
              L'onglet « 🏠 Accueil » est parti le 06/08 avec le journal, puis
              revenu le soir même : Frédéric lui-même ne l'a pas trouvé en
              revenant de /espace-eleves. Si l'auteur du site cherche la sortie,
              un élève de 6ᵉ ne la cherche pas — il part.
              ⛔ MAIS PAS SUR L'ACCUEIL ELLE-MÊME (`!paper`) : là, le lien
              répéterait la destination du logo à deux centimètres.
              Hors du bloc d'audience : c'est une porte de RETOUR, pas une porte
              d'audience — elle vaut pour tout le monde, connecté ou non. */}
          {!paper && (
            <Link
              prefetch={false}
              href="/accueil"
              title="Accueil"
              className={`hidden shrink-0 rounded-full px-2.5 py-2 text-sm font-black transition lg:inline-flex ${
                paper
                  ? "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                  : "text-white/85 hover:bg-white/15 hover:text-white"
              }`}
            >
              <span aria-hidden="true">🏠</span>
              <span className="sr-only">Accueil</span>
            </Link>
          )}
        </div>

        {/* ── ZONE 2 : LA NAVIGATION, au centre de la page ──────────────── */}
        <div className="hidden items-center gap-1 justify-self-center lg:flex">
          {eleve && !isStaff ? (
            /* Élève CONNECTÉ → son menu de travail.
               Coach et Parcours en tête : ce sont les deux seuls endroits qui
               gardent une trace de ce qu'il a fait. */
            <>
              {MENU_ELEVE.map((c) => (
                <Link
                  prefetch={false}
                  key={c.href}
                  href={c.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-black transition ${
                    paper
                      ? isActive(pathname, c.href)
                        ? "bg-teal-700 text-white shadow"
                        : "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                      : isActive(pathname, c.href)
                        ? "bg-white text-[#041B33] shadow-lg"
                        : "text-white/85 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
              {/* Le guide de SA classe. Le mot complet n'apparaît qu'à partir
                  de `xl` : à 1 024 px, six entrées plus le compte tiennent à
                  quelques pixels près, et c'est ce libellé-là le plus long. */}
              <Link
                prefetch={false}
                href={hrefGuide}
                title="Guide de survie"
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-black transition ${
                  paper
                    ? isActive(pathname, "/guide-de-survie")
                      ? "bg-teal-700 text-white shadow"
                      : "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                    : isActive(pathname, "/guide-de-survie")
                      ? "bg-white text-[#041B33] shadow-lg"
                      : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                <span aria-hidden="true">🆘</span>
                <span className="hidden xl:inline">Guide de survie</span>
                <span className="xl:hidden">Guide</span>
              </Link>
              <MatieresMenu pathname={pathname} paper={paper} />
            </>
          ) : (
            AUDIENCE_DOORS.map((d) => (
              <Link
                prefetch={false}
                key={d.space}
                href={d.href}
                className={[
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-black transition xl:px-3",
                  paper
                    ? d.space === space
                      ? "bg-teal-700 text-white shadow"
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
        </div>

        {/* ── ZONE 3 : LE COMPTE, complètement à droite ─────────────────── */}
        <div className="flex items-center gap-1.5 justify-self-end">
          {eleve ? (
            <>
              {/* « MON ESPACE » plutôt que le nom et la classe (07/08).
                  Le bouton affichait « MARIE DUPONT · 4C » en pastille verte
                  au milieu de la barre : le nom d'un élève, en grand, sur un
                  écran souvent partagé en classe. Le nom vit maintenant dans le
                  menu du compte, là où on va exprès. */}
              <Link
                prefetch={false}
                href={dashboardHref}
                className={`hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-black shadow-lg transition hover:brightness-110 lg:inline-flex ${
                  paper ? "bg-teal-700 text-white" : `${dashboardColor} text-[#041B33]`
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Mon espace
              </Link>
              <Link
                prefetch={false}
                href="/besoin-de-vous"
                className={`hidden items-center rounded-full px-3 py-2 text-sm font-black transition lg:inline-flex ${
                  paper
                    ? "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                Participer
              </Link>
              <div className="hidden lg:block">
                <MenuCompte
                  nom={eleveLabel}
                  sousTitre={dashboardSousTitre}
                  dashboardHref={dashboardHref}
                  estEleve={!isStaff}
                  paper={paper}
                  onLogout={logoutEleve}
                />
              </div>
            </>
          ) : (
            <>
              {/* CONNEXION ET INSCRIPTION, séparées (07/08). Le bouton unique
                  disait « Connexion / inscription » : deux mots pour une seule
                  pastille, dont le second était systématiquement coupé sous
                  `xl`. Quelqu'un qui n'a pas de compte ne cherche pas
                  « connexion ». Les deux mènent au même flux — l'email suffit,
                  et le formulaire sait tout seul si le compte existe. */}
              <Link
                prefetch={false}
                href="/auth/signin?mode=eleve"
                className={`hidden items-center rounded-full px-3 py-2 text-sm font-black transition lg:inline-flex ${
                  paper
                    ? "text-[#1d1c16]/85 hover:bg-[#1d1c16]/10"
                    : "text-white/85 hover:bg-white/15 hover:text-white"
                }`}
              >
                Connexion
              </Link>
              <Link
                prefetch={false}
                href="/auth/signin?mode=eleve&inscription=1"
                className={`hidden items-center gap-2 rounded-full px-3.5 py-2 text-sm font-black shadow-lg transition hover:brightness-110 lg:inline-flex ${
                  paper
                    ? "bg-teal-700 text-white hover:bg-cyan-800"
                    : "bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#041B33]"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                Inscription
              </Link>
            </>
          )}

          {/* Mobile — bouton hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            {!eleve && (
              <Link
                prefetch={false}
                href="/auth/signin?mode=eleve"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-black shadow-lg ${
                  paper
                    ? "bg-teal-700 text-white"
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
              aria-label="Ouvrir le menu du site"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className={`max-h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain border-t px-4 pb-10 pt-4 lg:hidden ${
            paper
              ? "border-[#1d1c16]/25 bg-[#d8e9ee]"
              : "border-cyan-300/20 bg-gradient-to-b from-[#062A4F] to-[#041B33]"
          }`}
        >
          <div className="space-y-4">
            {/* Le retour à l'accueil, en tête du menu. Sur téléphone la colonne
                de gauche est un tiroir : sans cette ligne, revenir en arrière
                demande de trouver le logo, puis de viser juste. */}
            <Link
              prefetch={false}
              href="/accueil"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black ${
                paper
                  ? "border-[#1d1c16]/15 bg-[#1d1c16]/5 text-[#1d1c16]"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              <span aria-hidden="true">🏠</span> Accueil
            </Link>

            {/* Auth mobile */}
            {eleve ? (
              <div
                className={`rounded-2xl border px-4 py-3 ${
                  paper ? "border-[#1d1c16]/15 bg-[#1d1c16]/5" : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <Link
                    prefetch={false}
                    href={dashboardHref}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 text-sm font-black ${paper ? "text-[#1d1c16]" : "text-white"}`}
                  >
                    <GraduationCap className={`h-4 w-4 ${paper ? "text-cyan-800" : "text-emerald-300"}`} />
                    Mon espace
                  </Link>
                  <button
                    type="button"
                    onClick={logoutEleve}
                    aria-label="Se déconnecter"
                    className={`rounded-full p-2 ${
                      paper
                        ? "bg-red-800/10 text-red-800 hover:bg-red-800/20"
                        : "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
                <div className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-bold ${paper ? "text-[#1d1c16]/70" : "text-white/70"}`}>
                  <Link prefetch={false} href="/besoin-de-vous" onClick={() => setMobileOpen(false)}>
                    Participer
                  </Link>
                  <Link prefetch={false} href="/votre-avis" onClick={() => setMobileOpen(false)}>
                    Donner mon avis
                  </Link>
                  {!isStaff && (
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        ouvrirEcrireAuProf();
                      }}
                    >
                      ✉️ Écris-moi
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  prefetch={false}
                  href="/auth/signin?mode=eleve"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-black ${
                    paper
                      ? "border-[#1d1c16]/25 bg-white/60 text-[#1d1c16]"
                      : "border-white/15 bg-white/5 text-white"
                  }`}
                >
                  Connexion
                </Link>
                <Link
                  prefetch={false}
                  href="/auth/signin?mode=eleve&inscription=1"
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-black shadow ${
                    paper
                      ? "bg-teal-700 text-white"
                      : "bg-gradient-to-r from-emerald-300 to-cyan-300 text-[#041B33]"
                  }`}
                >
                  Inscription
                </Link>
              </div>
            )}

            {eleve && !isStaff ? (
              /* Élève connecté → son menu, puis toutes ses matières */
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {[...MENU_ELEVE, { href: hrefGuide, label: "🆘 Guide de survie", court: "🆘 Guide" }].map((c) => (
                    <Link
                      prefetch={false}
                      key={c.href}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold ${
                        paper
                          ? "border-[#1d1c16]/15 bg-[#1d1c16]/5 text-[#1d1c16]"
                          : "border-white/10 bg-white/5 text-white"
                      }`}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
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
                    prefetch={false}
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
