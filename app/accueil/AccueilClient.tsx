"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const BREVET_DATE = new Date("2026-06-27T08:00:00");

function joursAvantBrevet() {
  const diff = BREVET_DATE.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const jours = joursAvantBrevet();

const uneJournal = {
  tag: "🎯 Sprint Brevet",
  date: `J−${jours} avant le brevet`,
  title: `${jours} jours pour décrocher ton brevet`,
  description:
    "Fractions, Pythagore, probabilités, équations, Thalès… EleveAI t'accompagne notion par notion jusqu'au jour J. Automatismes, problèmes guidés et sujets express.",
  href: "/coach-brevet",
  image: "/images/defis-du-jour/piton-fournaise.webp",
  action: "Commencer le sprint",
  ctaColor: "bg-emerald-500 group-hover:bg-emerald-400",
  borderHover: "hover:border-emerald-400/50 hover:shadow-emerald-900/40",
  tagColor: "bg-emerald-500",
};

const secondaires = [
  {
    tag: "Défis du jour",
    title: "Le Piton de la Fournaise en chiffres",
    description:
      "Altitude, coulées de lave, volume émis… 7 défis maths inspirés du volcan le plus actif de France.",
    href: "/defis-du-jour",
    action: "Relever le défi",
    accent: "#EA580C",
  },
  {
    tag: "Bac Spé Maths",
    title: "Sprint 16 juin",
    description:
      "Suites, fonctions, probabilités et automatismes pour préparer l'épreuve.",
    href: "/coach-bac-spe",
    action: "Réviser maintenant",
    accent: "#7C3AED",
  },
  {
    tag: "Calcul rapide",
    title: "7 questions en 5 min",
    description:
      "Un entraînement express pour renforcer les automatismes de calcul.",
    href: "/calcul-rapide",
    action: "Commencer",
    accent: "#65A30D",
  },
  {
    tag: "English Maths",
    title: "5 mots par jour",
    description:
      "Point, vertex, angle, fraction… le vocabulaire des maths en anglais.",
    href: "/english-maths",
    action: "Découvrir",
    accent: "#1D4ED8",
  },
];

const besoins = [
  {
    title: "Je prépare le brevet",
    href: "/coach-brevet",
    action: "Sprint 30 jours",
    icon: "📚",
    color: "from-emerald-400 to-teal-600",
  },
  {
    title: "Je veux faire un bilan",
    href: "/parcours",
    action: "Lancer Parcours",
    icon: "🛤️",
    color: "from-violet-500 to-indigo-600",
  },
  {
    title: "Je veux travailler une compétence",
    href: "/coach-maths-ia",
    action: "Coach Maths IA",
    icon: "🧠",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Je veux aller vite",
    href: "/calcul-rapide",
    action: "Calcul rapide",
    icon: "⚡",
    color: "from-lime-500 to-green-600",
  },
  {
    title: "Je veux réviser doucement",
    href: "/lecon-du-jour",
    action: "Écouter la leçon",
    icon: "🎧",
    color: "from-orange-400 to-amber-500",
  },
  {
    title: "Maths en anglais",
    href: "/english-maths",
    action: "English Maths",
    icon: "🇬🇧",
    color: "from-blue-700 to-blue-500",
  },
  {
    title: "Je relève le défi du jour",
    href: "/defis-du-jour",
    action: "Commencer le défi",
    icon: "🎯",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Je veux un challenge avancé",
    href: "/concours-general",
    action: "S'entraîner",
    icon: "🏆",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Je prépare le bac spé maths",
    href: "/coach-bac-spe",
    action: "Sprint 16 juin",
    icon: "🎓",
    color: "from-blue-600 to-violet-700",
  },
];

const classes = [
  { label: "CM1", href: "/coach-maths-ia?classe=cm1", description: "Consolider les bases et prendre confiance." },
  { label: "CM2", href: "/coach-maths-ia?classe=cm2", description: "Préparer l'entrée au collège." },
  { label: "6e",  href: "/coach-maths-ia?classe=6e",  description: "Décimaux, fractions, géométrie, grandeurs." },
  { label: "5e",  href: "/coach-maths-ia?classe=5e",  description: "Relatifs, fractions, proportionnalité, angles." },
  { label: "4e",  href: "/coach-maths-ia?classe=4e",  description: "Calcul littéral, Pythagore, Thalès, stats." },
  { label: "3e",  href: "/coach-maths-ia?classe=3e",  description: "Brevet, fonctions, volumes, probabilités." },
];

const cards = [
  { href: "/coach-maths-ia",   image: "/images/cards/coach.webp",           label: "Coach Maths IA" },
  { href: "/parcours",         image: "/images/cards/parcours.webp",         label: "Parcours" },
  { href: "/calcul-rapide",    image: "/images/cards/calcul-rapide.webp",    label: "Calcul rapide" },
  { href: "/lecon-du-jour",    image: "/images/cards/lecondujour.webp",      label: "Leçon du jour" },
  { href: "/defis-du-jour",    image: "/images/cards/defis-du-jour.webp",    label: "Défis du jour" },
  { href: "/concours-general", image: "/images/cards/concours-general.webp", label: "Concours général" },
  { href: "/coach-brevet",     image: "/images/cards/coach-brevet.webp",      label: "Coach Brevet Maths" },
  { href: "/coach-bac-spe",    image: "/images/cards/coach-bac-spe.webp",    label: "Coach Bac Spé Maths" },
  { href: "/english-maths",    image: "/images/cards/english-maths.webp",    label: "English Maths" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function AccueilPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }
    try {
      audio.currentTime = 0;
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#041B33] text-white">

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#041B33] to-[#062A4F] px-4 pt-5 pb-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative h-[42vh] min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl sm:h-[48vh] sm:min-h-[340px] lg:h-[52vh] lg:min-h-[420px]">
            <Image
              src="/images/accueil-eleveai-reunion.webp"
              alt="EleveAI – Les maths : un jeu, un enjeu, un avenir. Du CM1 à la Terminale Spé Maths."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4">
              <audio
                ref={audioRef}
                src="/audio/accueil/presentation.mp3"
                preload="none"
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
              />
              <button
                type="button"
                onClick={toggleAudio}
                aria-label="Écouter le message de bord EleveAI"
                className="flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[#041B33] shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-300/80 sm:px-4 sm:py-2"
              >
                <span className="text-lg">{isPlaying ? "⏹️" : "🔊"}</span>
                <span className="hidden text-sm font-black sm:inline">
                  {isPlaying ? "Stop" : "Message de bord"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <h1 className="sr-only">
        EleveAI – Plusieurs portes pour apprendre les maths et suivre la progression des élèves. Du CM1 au Bac, à La Réunion.
      </h1>

      {/* ── 2. DÉMARRAGE RAPIDE ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#062A4F] to-[#0B4F7A] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
              Démarrage rapide
            </p>
            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              Je commence selon mon besoin
            </h2>
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            {besoins.map((besoin) => (
              <Link
                key={besoin.href}
                href={besoin.href}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#041B33]/60 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/40"
              >
                <div className={`bg-gradient-to-br ${besoin.color} px-4 py-4 text-slate-950`}>
                  <span className="text-2xl">{besoin.icon}</span>
                  <p className="mt-2 text-sm font-black leading-tight">{besoin.title}</p>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs font-bold text-slate-300">{besoin.action}</span>
                  <span className="text-sm font-black text-white transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. JOURNAL — UNE DE PRESSE ──────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#0B4F7A] to-[#0A3F60] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          {/* En-tête journal */}
          <div className="mb-1 flex items-center justify-between border-b border-white/20 pb-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-300">
                Journal EleveAI
              </p>
              <h2 className="mt-0.5 font-black text-2xl md:text-3xl tracking-tight">
                Aujourd&apos;hui sur EleveAI
              </h2>
            </div>
            <time className="hidden text-[11px] font-bold text-slate-400 sm:block">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Ligne de filet décorative */}
          <div className="mb-5 flex gap-1">
            <div className="h-[3px] w-16 bg-emerald-400 rounded-full" />
            <div className="h-[3px] flex-1 bg-white/10 rounded-full" />
          </div>

          {/* Grille journal : grande UNE à gauche + brèves à droite */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">

            {/* Article principal — Brevet */}
            <Link
              href={uneJournal.href}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all ${uneJournal.borderHover} hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/50`}
            >
              <div className="relative h-[300px] sm:h-[380px] lg:h-full lg:min-h-[400px] w-full">
                <Image
                  src={uneJournal.image}
                  alt={uneJournal.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className={`rounded-full ${uneJournal.tagColor} px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white`}>
                      {uneJournal.tag}
                    </span>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                      {uneJournal.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-black leading-tight text-white sm:text-2xl lg:text-3xl">
                    {uneJournal.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-white/80 max-w-xl">
                    {uneJournal.description}
                  </p>

                  <div className={`mt-4 inline-flex items-center gap-2 rounded-full ${uneJournal.ctaColor} px-5 py-2.5 text-sm font-black text-white shadow-lg transition-all group-hover:gap-3`}>
                    {uneJournal.action}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Colonne brèves */}
            <div className="flex flex-col gap-3">

              {/* Bandeau compte à rebours brevet */}
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
                  Compte à rebours
                </p>
                <p className="mt-1 text-3xl font-black text-white">J−{jours}</p>
                <p className="text-xs font-semibold text-slate-300">
                  Jours restants avant le brevet des collèges. Chaque jour compte !
                </p>
              </div>

              {/* Brèves secondaires */}
              {secondaires.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-2xl border border-white/10 bg-white/90 p-4 text-[#041B33] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="h-3 w-1 rounded-full"
                      style={{ backgroundColor: s.accent }}
                    />
                    <p
                      className="text-[10px] font-black uppercase tracking-[0.2em]"
                      style={{ color: s.accent }}
                    >
                      {s.tag}
                    </p>
                  </div>
                  <h3 className="text-base font-black leading-snug text-[#041B33]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-slate-600">
                    {s.description}
                  </p>
                  <p className="mt-3 text-xs font-black" style={{ color: s.accent }}>
                    {s.action} →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CHOIX DE CLASSE ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#0A3F60] to-[#062A4F] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-300">
                Compétences
              </p>
              <h2 className="mt-1 text-2xl font-black md:text-3xl">
                Je choisis ma classe
              </h2>
            </div>
            <Link
              href="/coach-maths-ia"
              className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:inline-flex"
            >
              Voir toutes les compétences
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {classes.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-lg transition-all hover:-translate-y-1 hover:border-emerald-300/60 hover:bg-white/[0.14] focus:outline-none focus:ring-4 focus:ring-emerald-300/50"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-black">{c.label}</span>
                  <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-xs font-black text-[#041B33] transition group-hover:scale-110">
                    Go
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">{c.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TOUS LES MODULES ──────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#062A4F] to-[#041B33] px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
              Modules
            </p>
            <h2 className="mt-1 text-2xl font-black md:text-3xl">
              Tous les espaces
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                aria-label={card.label}
                className="group relative h-[115px] w-[220px] overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <Image
                  src={card.image}
                  alt={card.label}
                  fill
                  sizes="220px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[300px]" />
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
