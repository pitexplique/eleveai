"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import GoogleFollowChip from "@/components/GoogleFollowChip";
import FloatingCoach from "@/components/FloatingCoach";
import ElevesALHonneur from "@/components/ameliorations/ElevesALHonneur";
import { type EleveALHonneur } from "@/lib/ameliorations/aLHonneur";

// ─── Drag-to-scroll (glisser à la souris sur desktop) ──────────────────────────
// Sur mobile le scroll horizontal au doigt est natif. Sur desktop il n'y a pas de
// « glisser à la souris » : on le simule ici (retour Lazslo).
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const onMouseDown = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft, moved: false };
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el || !drag.current.down) return;
    const dx = e.pageX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const stop = () => {
    drag.current.down = false;
  };

  // Empêche la navigation du <Link> quand on a glissé plutôt que cliqué.
  const onClickCapture = (e: ReactMouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return {
    ref,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp: stop,
      onMouseLeave: stop,
      onClickCapture,
    },
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BREVET_DATE = new Date("2026-06-27T08:00:00");
function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
const jours = joursAvantBrevet();

// ─── Subject cards ────────────────────────────────────────────────────────────

const SUBJECTS = [
  {
    icon: "🧮",
    label: "Maths",
    desc: "Calculer, raisonner, prouver",
    href: "/coach-ia/maths",
    bg: "from-cyan-500 to-blue-600",
    border: "border-cyan-400/50",
    glow: "group-hover:shadow-cyan-500/40",
    cm: true,
  },
  {
    icon: "📖",
    label: "Français",
    desc: "Lire, comprendre, s'exprimer",
    href: "/coach-ia/francais",
    bg: "from-emerald-500 to-green-700",
    border: "border-emerald-400/50",
    glow: "group-hover:shadow-emerald-500/40",
    cm: true,
  },
  {
    icon: "🇬🇧",
    label: "Anglais",
    desc: "Comprendre, parler, progresser",
    href: "/coach-ia/english-maths",
    bg: "from-blue-500 to-indigo-700",
    border: "border-blue-400/50",
    glow: "group-hover:shadow-blue-500/40",
    cm: true,
  },
  {
    icon: "🇪🇸",
    label: "Espagnol",
    desc: "Comprendre, parler, découvrir",
    href: "/coach-ia/espagnol",
    bg: "from-red-500 to-rose-700",
    border: "border-red-400/50",
    glow: "group-hover:shadow-red-500/40",
    cm: false,
  },
  {
    icon: "📊",
    label: "Économie",
    desc: "Comprendre le monde économique",
    href: "/coach-ia/economie",
    bg: "from-amber-500 to-orange-600",
    border: "border-amber-400/50",
    glow: "group-hover:shadow-amber-500/40",
    cm: false,
  },
];

// Niveaux pour lesquels le coach sait pré-sélectionner la classe via ?classe=.
// (À la connexion on connaît la classe → proposer directement le bon niveau.
//  À terme : suggestions plus fines par niveau.)
const MATHS_LEVELS = new Set([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "terminale-spe",
]);
const FRANCAIS_LEVELS = new Set([
  "cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e",
]);
const CLASSE_LABELS: Record<string, string> = {
  cp: "CP", ce1: "CE1", ce2: "CE2", cm1: "CM1", cm2: "CM2",
  "6e": "6e", "5e": "5e", "4e": "4e", "3e": "3e", "terminale-spe": "Terminale",
};

// ─── Bottom features bar ──────────────────────────────────────────────────────

const FEATURES = [
  { icon: "🧮", label: "Parcours Maths",    desc: "Diagnostic et entraînement maths",   href: "/parcours"               },
  { icon: "📖", label: "Parcours Français", desc: "Lecture, grammaire, expression",     href: "/parcours-francais"      },
  { icon: "🇬🇧", label: "Parcours English",  desc: "Bilan de niveau CECRL avec audio",   href: "/parcours-english-maths" },
  { icon: "🇪🇸", label: "Parcours Espagnol", desc: "Bilan de niveau A1 → B2 avec audio", href: "/parcours-espagnol"      },
];

// ─── Main component ───────────────────────────────────────────────────────────

function getPrenomAffiche(nom?: string | null) {
  const premierMot = nom?.trim().split(/\s+/)[0] ?? "";
  const normalise = premierMot.toLowerCase();
  if (!premierMot || normalise === "élève" || normalise === "eleve") {
    return null;
  }
  return premierMot;
}

export type AvisPublic = {
  prenom: string;
  detail: string;
  note: number;
  quote: string;
};

// Avis affichés si la base ne renvoie rien (chargement, erreur, env absente).
const AVIS_FALLBACK: AvisPublic[] = [
  {
    quote:
      "Rubrique très intéressante pour revoir les bases et acquérir des automatismes. Très rapide, mais très intuitif.",
    prenom: "Pierre",
    detail: "Défis du jour",
    note: 5,
  },
  {
    quote:
      "C'est trop bien, on peut vraiment progresser sur ce site comparé à d'autres.",
    prenom: "Tamara",
    detail: "6e",
    note: 5,
  },
  {
    quote:
      "Je pense qu'il faudrait mettre une calculatrice sur le site, au cas où on ne sait plus.",
    prenom: "Guilianne",
    detail: "4e",
    note: 4,
  },
];

export default function AccueilPage({
  avis,
  honneur,
}: {
  avis?: AvisPublic[];
  honneur?: EleveALHonneur[];
}) {
  const derniersAvis = avis && avis.length > 0 ? avis : AVIS_FALLBACK;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { eleve } = useEleve();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSignatureMeaning, setShowSignatureMeaning] = useState(true);
  const nouveautes = useDragScroll();

  // Bandeau d'avis sur une ligne sous l'image (retour d'une élève) : on fait
  // défiler un avis à la fois, toutes les 5 s.
  const [avisLigneIndex, setAvisLigneIndex] = useState(0);
  useEffect(() => {
    if (derniersAvis.length <= 1) return;
    const id = setInterval(
      () => setAvisLigneIndex((i) => (i + 1) % derniersAvis.length),
      5000,
    );
    return () => clearInterval(id);
  }, [derniersAvis.length]);
  const avisLigne = derniersAvis[avisLigneIndex % derniersAvis.length];

  const eleveClasse = eleve?.classe?.toLowerCase() ?? null;
  const prenomAffiche = getPrenomAffiche(eleve?.nom);
  const isCmPrimary = eleveClasse === "cm1" || eleveClasse === "cm2";

  // Passe la classe de l'élève au coach quand le niveau est géré, pour qu'il
  // atterrisse directement sur le bon niveau (sinon le coach ouvre 6e par défaut).
  function getHref(href: string) {
    if (!eleveClasse) return href;
    if (href === "/coach-ia/maths" && MATHS_LEVELS.has(eleveClasse)) {
      return `/coach-ia/maths?classe=${eleveClasse}`;
    }
    if (href === "/coach-ia/francais" && FRANCAIS_LEVELS.has(eleveClasse)) {
      return `/coach-ia/francais?classe=${eleveClasse}`;
    }
    return href;
  }

  const classeLabel = eleveClasse ? (CLASSE_LABELS[eleveClasse] ?? "") : "";

  // Chemins proposés à l'élève. La 1re carte est la sélection mise en avant ;
  // Maths/Français portent le niveau quand on le connaît ; Anglais/Espagnol
  // restent généraux (niveaux CECRL, pas la classe).
  const suggestions = [
    {
      icon: "✨",
      title: "Sélection du jour",
      desc: "EleveAI a choisi pour toi aujourd'hui",
      href: "/defis-du-jour",
      tone: "from-amber-500 to-orange-600",
    },
    {
      icon: "🧮",
      title: classeLabel ? `Maths ${classeLabel}` : "Maths",
      desc: "Reprends une notion avec le coach",
      href: getHref("/coach-ia/maths"),
      tone: "from-cyan-500 to-blue-600",
    },
    ...(!eleveClasse || FRANCAIS_LEVELS.has(eleveClasse)
      ? [{
          icon: "📖",
          title: classeLabel ? `Français ${classeLabel}` : "Français",
          desc: "Lecture, grammaire, expression",
          href: getHref("/coach-ia/francais"),
          tone: "from-emerald-500 to-green-700",
        }]
      : []),
    {
      icon: "🇬🇧",
      title: "Anglais",
      desc: "Vocabulaire et maths en anglais",
      href: "/coach-ia/english-maths",
      tone: "from-blue-500 to-indigo-700",
    },
    {
      icon: "🇪🇸",
      title: "Espagnol",
      desc: "Vocabulaire et audio, A1 → B2",
      href: "/coach-ia/espagnol",
      tone: "from-red-500 to-rose-700",
    },
    {
      icon: "🧭",
      title: "Parcours",
      desc: "Teste ton niveau, vois tes forces",
      href: "/parcours",
      tone: "from-violet-500 to-purple-700",
    },
  ];

  const visibleSubjects = isCmPrimary ? SUBJECTS.filter(s => s.cm) : SUBJECTS;

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); audio.currentTime = 0; return; }
    try { audio.currentTime = 0; await audio.play(); }
    catch { /* ignore */ }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#041B33] text-white">

      <h1 className="sr-only">EleveAI – Coach IA maths, français, anglais et espagnol. Du CP au Bac.</h1>

      <audio
        ref={audioRef}
        src="/audio/accueil/presentation.mp3"
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* ── HERO — Image plein écran ────────────────────────────────────────── */}
      <section
        className="relative w-full animate-gradient-shift px-3 pt-2 sm:px-6"
        style={{
          backgroundImage:
            "linear-gradient(115deg, #041B33 0%, #0a2a55 35%, #251355 65%, #041B33 100%)",
        }}
      >
        {/* L'image ne doit pas contenir d'éléments qui ressemblent à des boutons :
            les élèves essayaient de cliquer sur les cartes dessinées (retours du
            11-12/06/2026). Les vraies actions sont sous l'image. */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-3 text-center md:w-[72%] xl:w-[56rem]">
          <p className="text-2xl font-black tracking-wide text-white sm:text-3xl">
            La liberté d&apos;apprendre
          </p>
        </div>
        <Image
          src="/images/accueil-eleveai-reunion.webp"
          alt="EleveAI – Comprendre, S'entraîner, Réussir – CP à Terminale"
          width={1920}
          height={1080}
          priority
          sizes="100vw"
          className="mx-auto block h-auto w-full max-w-5xl border-x border-b border-white/10 shadow-2xl md:w-[72%] xl:w-[56rem]"
        />
        {/* Fondu bas vers le fond de page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-[#041B33]" />

        {/* Prénom uniquement : aucun nom de famille n'est affiché. */}
        {prenomAffiche && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <p className="rounded-full bg-black/50 border border-white/20 px-5 py-2 text-sm font-black text-white backdrop-blur-sm whitespace-nowrap">
              Bonjour, {prenomAffiche}
            </p>
          </div>
        )}

        {/* Brevet countdown si 3e/4e */}
        {(eleveClasse === "3e" || eleveClasse === "4e") && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <Link
              href="/coach-brevet"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white shadow-lg transition hover:bg-emerald-400 hover:scale-105 whitespace-nowrap"
            >
              🎯 Sprint Brevet · J−{jours} → Commencer
            </Link>
          </div>
        )}
      </section>

      {/* ── AVIS EN UNE LIGNE (sous l'image) — retour d'une élève ────────────── */}
      <section className="border-b border-white/10 bg-[#041B33] px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 sm:gap-3">
          <span
            className="shrink-0 text-sm tracking-widest text-amber-300"
            aria-label={`Note ${avisLigne.note} sur 5`}
          >
            {"★".repeat(avisLigne.note)}
          </span>
          <p className="min-w-0 truncate text-xs font-medium text-white/85 sm:text-sm">
            «&nbsp;{avisLigne.quote}&nbsp;»
            <span className="ml-1.5 font-black text-white/55">
              — {avisLigne.prenom} · {avisLigne.detail}
            </span>
          </p>
          <Link
            href="/votre-avis"
            className="shrink-0 text-[11px] font-black text-emerald-300 transition hover:translate-x-0.5 sm:text-xs"
          >
            Donner mon avis →
          </Link>
        </div>
      </section>

      {/* ── CHEMINS CONSEILLÉS — suggestions personnalisées ───────────────────── */}
      <section className="bg-[#041B33] px-4 pb-7 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 text-center">
            <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl">
              {prenomAffiche
                ? `Que veux-tu travailler aujourd'hui, ${prenomAffiche} ?`
                : "Que veux-tu travailler aujourd'hui ?"}
            </h2>
            {classeLabel ? (
              <p className="mt-1 text-xs font-bold text-white/50">
                Chemins conseillés pour la {classeLabel}
              </p>
            ) : (
              <p className="mt-1 text-xs font-bold text-white/50">
                Connecte-toi pour des suggestions adaptées à ta classe
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {suggestions.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={[
                  "group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl p-4 text-left transition-transform hover:-translate-y-1 hover:scale-[1.03]",
                  // Premier chemin (matière principale) mis en avant par le halo néon.
                  i === 0 ? "animate-neon-pulse" : "",
                ].join(" ")}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.tone} opacity-90 transition-opacity group-hover:opacity-100`} />
                <span className="relative z-10 text-2xl">{s.icon}</span>
                <div className="relative z-10">
                  <p className="text-base font-black leading-tight text-white">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-tight text-white/80">
                    {s.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECT CARDS cliquables ────────────────────────────────────────── */}
      <section className="bg-[#061f39] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-200/70">
              Choisir une matière
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              Les coachs principaux
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {visibleSubjects.map((subject) => (
              <Link
                key={subject.label}
                href={getHref(subject.href)}
                className={[
                  "group relative flex min-h-[122px] flex-col items-center justify-center gap-2 rounded-2xl border p-4 sm:p-5 text-center",
                  "bg-white/5 backdrop-blur-md transition-all duration-300",
                  "hover:-translate-y-2 hover:scale-105",
                  `hover:shadow-2xl ${subject.glow}`,
                  subject.border,
                ].join(" ")}
              >
                {/* Gradient bg on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${subject.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <span className="relative z-10 text-3xl sm:text-4xl drop-shadow-lg">
                  {subject.icon}
                </span>
                <div className="relative z-10">
                  <p className="text-sm sm:text-base font-black text-white leading-tight">
                    {subject.label}
                  </p>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-white/60 leading-tight hidden sm:block">
                    {subject.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#071f3a] border-y border-white/10 px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-200/70">
              Progresser pas à pas
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              Parcours guidés
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.href}
                className="group flex min-h-[104px] flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center transition-all hover:bg-white/10 hover:border-white/25 hover:-translate-y-1"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{f.icon}</span>
                <p className="text-xs font-black text-white">{f.label}</p>
                <p className="text-[10px] text-white/50 leading-tight hidden sm:block">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOUVEAUTÉS ───────────────────────────────────────────────────────── */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-white">✨ Nouveautés</h2>
            <span className="text-xs font-bold text-white/40">Fais glisser →</span>
          </div>
          {/* Fondu à droite : montre qu'il y a d'autres cartes à faire défiler
              (retour élève du 11/06/2026 : « on voit pas la droite de nouveautés ») */}
          <div className="relative">
          <div
            ref={nouveautes.ref}
            {...nouveautes.handlers}
            className="flex gap-3 overflow-x-auto pb-3 pr-12 cursor-grab active:cursor-grabbing select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[
              { icon: "🇪🇸", label: "Parcours Espagnol",  desc: "Bilan de niveau A1 → B2 avec audio",    href: "/parcours-espagnol",           color: "from-rose-600 to-red-800"     },
              { icon: "🇪🇸", label: "Coach Espagnol",     desc: "A1 → B2, vocabulaire & audio",          href: "/coach-ia/espagnol",           color: "from-red-600 to-rose-800"     },
              { icon: "🇬🇧", label: "Coach English",       desc: "A1 → B2, vocabulaire maths en anglais",  href: "/coach-ia/english-maths",       color: "from-sky-600 to-blue-800"     },
              { icon: "🎧", label: "Parcours English",     desc: "Bilan de niveau CECRL avec audio",        href: "/parcours-english-maths",       color: "from-orange-600 to-amber-700" },
              { icon: "💰", label: "Coach Économie",       desc: "Entreprise, marché, élections…",          href: "/coach-ia/economie",            color: "from-amber-600 to-yellow-700" },
              { icon: "🏃", label: "Défis du jour",        desc: "Grand Raid · Maths 974",                  href: "/defis-du-jour",                color: "from-emerald-600 to-teal-700" },
              { icon: "🌿", label: "Environnement B1",     desc: "Biodiversité, climat, écosystèmes",       href: "/coach-ia/english-maths?niveau=b1", color: "from-lime-600 to-green-700" },
            ].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative flex h-[110px] w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-4 transition-all hover:-translate-y-1 hover:border-white/30 hover:shadow-lg"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${n.color} opacity-80 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-2xl">{n.icon}</span>
                  <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-black tracking-wider text-white">NEW</span>
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-black text-white leading-tight">{n.label}</p>
                  <p className="mt-0.5 text-[11px] leading-tight text-white/70">{n.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#041B33] to-transparent" />
          </div>
        </div>
      </section>

      {/* ── FEATURED BANNER ──────────────────────────────────────────────────── */}
      <section className="px-4 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {eleveClasse === "3e" || eleveClasse === "4e" ? (
            <Link href="/coach-brevet" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src="/images/defis-du-jour/grand_raid_2026.webp" alt="Sprint Brevet" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Sprint Brevet · J−{jours}</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">{jours} jours pour décrocher ton brevet</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75">Fractions, Pythagore, probabilités, équations, Thalès… notion par notion jusqu&apos;au jour J.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Commencer le sprint <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Compte à rebours</p>
                <p className="text-3xl font-black text-white">J−{jours}</p>
              </div>
            </Link>
          ) : (
            <Link href="/defis-du-jour" className="group relative block h-[220px] overflow-hidden rounded-2xl shadow-2xl sm:h-[280px]">
              <Image src="/images/lagon.webp" alt="Mission lagon" fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-white">🎯 Défi du jour</span>
                <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">Mission lagon : compter pour protéger</h3>
                <p className="mt-2 max-w-lg text-sm text-white/75">Poissons-perroquets, coraux, tortues, déchets… 7 défis maths pour observer et protéger le lagon de La Réunion.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition-all group-hover:bg-emerald-400 group-hover:gap-3">Relever le défi <span className="transition-transform group-hover:translate-x-1">→</span></div>
              </div>
              <div className="absolute right-6 top-6 rounded-xl border border-white/20 bg-black/60 px-4 py-2 text-center backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Aujourd&apos;hui</p>
                <p className="text-2xl font-black text-white">🐠</p>
                <p className="text-[10px] font-bold text-white/60">7 défis</p>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── CONCOURS LOGO ────────────────────────────────────────────────────── */}
      <section className="px-4 pb-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/concours-logo"
            className="group relative grid overflow-hidden rounded-2xl border border-amber-300/25 bg-gradient-to-br from-[#082b4d] via-[#041B33] to-[#311b08] p-5 shadow-2xl transition hover:-translate-y-1 hover:border-amber-300/50 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
          >
            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-amber-300/15 blur-2xl transition group-hover:bg-amber-300/25" />
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">
                Concours logo
              </p>
              <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
                Et si les élèves dessinaient le prochain logo EleveAI ?
              </h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-white/70">
                Imagine un logo avec l&apos;île de La Réunion, un margouillat et l&apos;esprit
                epsilon → infini. Télécharge le modèle, dessine, puis envoie ton fichier.
              </p>
            </div>
            <div className="relative z-10 mt-5 flex items-center gap-3 sm:mt-0">
              <span className="hidden text-5xl sm:block">🦎</span>
              <span className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-amber-200">
                Participer
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ÉLÈVES À L'HONNEUR ───────────────────────────────────────────────── */}
      <ElevesALHonneur eleves={honneur} />

      {/* ── DERNIERS AVIS ────────────────────────────────────────────────────── */}
      <section className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-black text-white">💬 Derniers avis</h2>
            <Link
              href="/votre-avis"
              className="text-xs font-black text-emerald-300 transition hover:translate-x-1"
            >
              Donner mon avis →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {derniersAvis.map((avis, i) => (
              <figure
                key={i}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-sm tracking-widest" aria-label={`Note ${avis.note} sur 5`}>
                  <span className="text-amber-300">{"★".repeat(avis.note)}</span>
                  <span className="text-white/20">{"★".repeat(5 - avis.note)}</span>
                </div>
                <blockquote className="mt-2 grow text-sm font-medium leading-relaxed text-white/80">
                  « {avis.quote} »
                </blockquote>
                <figcaption className="mt-3 text-xs font-black text-white">
                  {avis.prenom}{" "}
                  <span className="font-bold text-white/50">· {avis.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFIANCE ────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-lg font-black text-white mb-4">🤝 Une plateforme de confiance</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/qui-sommes-nous"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10"
            >
              <span className="text-2xl">🧑‍🏫</span>
              <p className="mt-2 text-sm font-black text-white">Conçu par un enseignant</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                EleveAI est créé par un enseignant en activité à La Réunion, en lien avec les programmes officiels.
              </p>
              <p className="mt-2 text-xs font-black text-emerald-300 transition group-hover:translate-x-1">Notre démarche →</p>
            </Link>
            <Link
              href="/remerciements"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10"
            >
              <span className="text-2xl">🙏</span>
              <p className="mt-2 text-sm font-black text-white">Amélioré avec les élèves</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Des élèves testeurs donnent leur avis, signalent les problèmes et font progresser la plateforme.
              </p>
              <p className="mt-2 text-xs font-black text-yellow-300 transition group-hover:translate-x-1">Nos élèves testeurs →</p>
            </Link>
            <Link
              href="/politique-confidentialite"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/10"
            >
              <span className="text-2xl">🔒</span>
              <p className="mt-2 text-sm font-black text-white">Données protégées</p>
              <p className="mt-1 text-xs leading-relaxed text-white/60">
                Conforme au RGPD : droit d&apos;accès et de suppression. Aucun nom de famille d&apos;élève n&apos;est publié.
              </p>
              <p className="mt-2 text-xs font-black text-sky-300 transition group-hover:translate-x-1">Notre politique →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TARIFS ───────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6 sm:flex-row">
          <div>
            <p className="text-base font-black text-white">💶 Des tarifs simples et justes</p>
            <p className="mt-1 text-sm leading-relaxed text-white/70">
              Gratuit pour les élèves dans le cadre scolaire · 4,99 €/mois pour une famille (prix de lancement, bloqué à vie) · Classes et établissements : sur devis.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-3">
            <Link
              href="/tarifs"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-black text-white transition hover:bg-emerald-400 hover:scale-105"
            >
              Voir les tarifs
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-emerald-400/50 bg-white/5 px-5 py-2.5 text-sm font-black text-emerald-200 transition hover:bg-white/10 hover:scale-105"
            >
              Pilote gratuit · 4 semaines
            </Link>
          </div>
        </div>
      </section>

      {/* ── GOOGLE FOLLOW ────────────────────────────────────────────────────── */}
      <div className="flex justify-center py-8">
        <GoogleFollowChip />
      </div>

      {/* ── COACH FLOTTANT ───────────────────────────────────────────────────── */}
      <FloatingCoach />

    </main>
  );
}
