"use client";
 
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
 
// ─── Data ────────────────────────────────────────────────────────────────────
 
const actualites = [
  {
    tag: "À la une",
    title: "Sprint Bac Spé Maths",
    description:
      "Suites, fonctions, probabilités et automatismes pour préparer l'épreuve.",
    href: "/coach-bac-spe",
    action: "Réviser maintenant",
    accent: "#7C3AED",
  },
  {
    tag: "Défis du jour",
    title: "Hydro Tanika",
    description:
      "Un défi pour comprendre comment l'eau peut servir à stocker de l'énergie à La Réunion.",
    href: "/defis-du-jour",
    action: "Découvrir le défi",
    accent: "#E11D48",
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
      "Apprendre le vocabulaire des maths en anglais : point, vertex, angle, fraction…",
    href: "/english-maths",
    action: "Découvrir",
    accent: "#1D4ED8",
  },
];
 
const besoins = [
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
  { href: "/coach-maths-ia",  image: "/images/cards/coach.webp",         label: "Coach Maths IA" },
  { href: "/parcours",        image: "/images/cards/parcours.webp",       label: "Parcours" },
  { href: "/calcul-rapide",   image: "/images/cards/calcul-rapide.webp",  label: "Calcul rapide" },
  { href: "/lecon-du-jour",   image: "/images/cards/lecondujour.webp",    label: "Leçon du jour" },
  { href: "/defis-du-jour",   image: "/images/cards/defis-du-jour.webp",  label: "Défis du jour" },
  { href: "/concours-general",image: "/images/cards/concours-general.webp",label: "Concours général" },
  { href: "/coach-bac-spe",   image: "/images/cards/coach-bac-spe.webp",  label: "Coach Bac Spé Maths" },
  { href: "/english-maths",   image: "/images/cards/english-maths.webp",  label: "English Maths" },
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
 
          {/* Image hero — l'image porte déjà tout le message visuel */}
          <div className="relative h-[42vh] min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl sm:h-[48vh] sm:min-h-[340px] lg:h-[52vh] lg:min-h-[420px]">
            <Image
              src="/images/accueil-eleveai-reunion.webp"
              alt="EleveAI – Les maths : un jeu, un enjeu, un avenir. Du CM1 à la Terminale Spé Maths."
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
 
            {/* Bouton audio uniquement */}
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
 
      {/* H1 masqué visuellement — pour le SEO, l'image porte le message */}
      <h1 className="sr-only">
        EleveAI – Un vrai parcours d'apprentissage du CM1 à la 3e + Bac Spé Maths
      </h1>
 
      {/* ── 2. DÉMARRAGE RAPIDE ─────────────────────────────────────────── */}
      {/*
          Placé juste après le hero : c'est la première question que se pose
          l'élève — "par où je commence ?"
      */}
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
                {/* Bande colorée */}
                <div className={`bg-gradient-to-br ${besoin.color} px-4 py-4 text-slate-950`}>
                  <span className="text-2xl">{besoin.icon}</span>
                  <p className="mt-2 text-sm font-black leading-tight">{besoin.title}</p>
                </div>
                {/* Action */}
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs font-bold text-slate-300">{besoin.action}</span>
                  <span className="text-sm font-black text-white transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 3. JOURNAL / ACTUALITÉS ──────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#0B4F7A] to-[#0A6B9A] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
                Journal EleveAI
              </p>
              <h2 className="mt-1 text-2xl font-black md:text-3xl">
                Aujourd'hui sur EleveAI
              </h2>
            </div>
            <span className="rounded-full bg-yellow-300 px-4 py-1.5 text-xs font-black text-[#041B33] shadow">
              ✨ Actualité
            </span>
          </div>
 
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {actualites.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group rounded-2xl border border-white/10 bg-white/90 p-4 text-[#041B33] shadow-lg transition-all hover:-translate-y-1 hover:bg-white hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: a.accent }}>
                  {a.tag}
                </p>
                <h3 className="mt-2 text-base font-black leading-snug">{a.title}</h3>
                <p className="mt-1.5 text-xs font-semibold leading-relaxed text-slate-600">{a.description}</p>
                <p className="mt-3 text-xs font-black" style={{ color: a.accent }}>
                  {a.action} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── 4. CHOIX DE CLASSE ───────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#0A6B9A] to-[#062A4F] px-4 py-8 sm:px-6 lg:px-8">
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
 
      {/* ── 5. DÉCOUVRIR TOUS LES MODULES (cards images) ─────────────────── */}
      {/*
          Placée en dernier : ce sont les entrées "découverte"
          pour ceux qui veulent explorer sans intention précise.
      */}
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
                {/* Shimmer */}
                <div className="pointer-events-none absolute -left-20 top-0 h-full w-16 rotate-12 bg-white/25 blur-md transition-transform duration-700 group-hover:translate-x-[300px]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
 
    </main>
  );
}