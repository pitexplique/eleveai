"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    href: "/coach-maths-ia",
    image: "/images/cards/coach.webp",
    label: "Coach Maths IA",
  },
  {
    href: "/parcours",
    image: "/images/cards/parcours.webp",
    label: "Parcours",
  },
  {
    href: "/calcul-rapide",
    image: "/images/cards/calcul-rapide.webp",
    label: "Calcul rapide",
  },
  {
    href: "/lecon-du-jour",
    image: "/images/cards/lecondujour.webp",
    label: "Leçon du jour",
  },
  {
    href: "/probleme-du-jour",
    image: "/images/cards/probleme-du-jour.webp",
    label: "Problème du jour",
  },
  {
    href: "/concours-general",
    image: "/images/cards/concours-general.webp",
    label: "Concours général",
  },
  {
    href: "/english-maths",
    image: "/images/cards/english-maths.webp",
    label: "English Maths",
  },
];

const classes = [
  {
    label: "CM1",
    href: "/coach-maths-ia?classe=cm1",
    description: "Consolider les bases et prendre confiance.",
  },
  {
    label: "CM2",
    href: "/coach-maths-ia?classe=cm2",
    description: "Préparer l’entrée au collège.",
  },
  {
    label: "6e",
    href: "/coach-maths-ia?classe=6e",
    description: "Décimaux, fractions, géométrie, grandeurs.",
  },
  {
    label: "5e",
    href: "/coach-maths-ia?classe=5e",
    description: "Relatifs, fractions, proportionnalité, angles.",
  },
  {
    label: "4e",
    href: "/coach-maths-ia?classe=4e",
    description: "Calcul littéral, Pythagore, Thalès, stats.",
  },
  {
    label: "3e",
    href: "/coach-maths-ia?classe=3e",
    description: "Brevet, fonctions, volumes, probabilités.",
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
    action: "Ouvrir Coach Maths IA",
    icon: "🧠",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Je veux aller vite",
    href: "/calcul-rapide",
    action: "Faire du calcul rapide",
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
    title: "Je veux apprendre les maths en anglais",
    href: "/english-maths",
    action: "Lancer English Maths",
    icon: "🇬🇧",
    color: "from-blue-600 via-white to-red-500",
  },
  {
    title: "Je veux chercher un problème",
    href: "/probleme-du-jour",
    action: "Voir le problème",
    icon: "🎯",
    color: "from-pink-500 to-rose-600",
  },
  {
    title: "Je veux un challenge avancé",
    href: "/concours-general",
    action: "S’entraîner",
    icon: "🏆",
    color: "from-yellow-400 to-orange-500",
  },
];

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
    <main className="min-h-screen bg-[#062A4F] text-white">
      {/* HERO IMAGE */}
      <section className="bg-gradient-to-b from-[#061B33] via-[#073B63] to-[#0B4F7A] px-3 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="
              relative h-[42vh] min-h-[260px]
              overflow-hidden rounded-[2rem]
              border border-white/10 shadow-2xl
              sm:h-[48vh] sm:min-h-[340px]
              lg:h-[52vh] lg:min-h-[420px]
            "
          >
            <Image
              src="/images/accueil-eleveai-reunion.webp"
              alt="EleveAI - Un vrai parcours d’apprentissage"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-[#061B33]/20" />

            <audio
              ref={audioRef}
              src="/audio/accueil/presentation.mp3"
              preload="none"
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />

            <div
              className="
                absolute right-3 top-3 z-20
                flex items-center justify-end gap-2
                sm:right-4 sm:top-4
                md:flex-col md:items-end
              "
            >
              <button
                type="button"
                onClick={toggleAudio}
                aria-label="Écouter le message de bord EleveAI"
                title="Écouter le message de bord"
                className="
                  flex items-center justify-center gap-2
                  rounded-full border border-white/40
                  bg-white/90 px-3 py-1.5
                  text-[#041B33]
                  shadow-2xl backdrop-blur-md
                  transition-all duration-300
                  hover:scale-105 hover:bg-white
                  focus:outline-none focus:ring-4 focus:ring-cyan-300/80
                  sm:px-4 sm:py-2
                "
              >
                <span className="text-lg">{isPlaying ? "⏹️" : "🔊"}</span>

                <span className="hidden text-sm font-black sm:inline">
                  {isPlaying ? "Stop" : "Message de bord"}
                </span>
              </button>

              <div
                className="
                  flex items-center gap-2
                  rounded-full border border-white/35
                  bg-white/85 px-2.5 py-1.5
                  text-[11px] font-black text-[#041B33]
                  shadow-xl backdrop-blur-md
                  sm:px-3 sm:py-2 sm:text-xs
                "
              >
                <div className="flex -space-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-pink-400 text-xs text-white shadow sm:h-7 sm:w-7 sm:text-sm">
                    👧
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-fuchsia-500 text-xs text-white shadow sm:h-7 sm:w-7 sm:text-sm">
                    👧
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-rose-500 text-xs text-white shadow sm:h-7 sm:w-7 sm:text-sm">
                    👧
                  </div>
                </div>

                <span className="hidden sm:inline">
                  6°C Collège Dimitile - Entre-Deux - île de La Réunion
                </span>

                <span className="sm:hidden">6°C</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS PRINCIPALES */}
      <section className="relative z-10 bg-gradient-to-b from-[#0B4F7A] via-[#0A6B9A] to-[#062A4F] px-4 pb-10 pt-6">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              rounded-[2rem] border border-white/15
              bg-white/[0.08] p-4 shadow-2xl backdrop-blur-md
            "
          >
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
              {cards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  aria-label={card.label}
                  className="
                    group relative h-[92px]
                    overflow-hidden rounded-3xl
                    border border-white/25
                    bg-white/10 shadow-xl
                    transition-all duration-300
                    hover:-translate-y-2 hover:scale-[1.03]
                    hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]
                    focus:outline-none focus:ring-4 focus:ring-white/70
                    sm:h-[105px]
                  "
                >
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 160px"
                    className="
                      object-cover
                      transition-transform duration-500
                      group-hover:scale-[1.05]
                    "
                  />

                  <div
                    className="
                      pointer-events-none absolute -left-20 top-0
                      h-full w-16 rotate-12 bg-white/30 blur-md
                      transition-transform duration-700
                      group-hover:translate-x-[300px]
                    "
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <section className="relative z-20 bg-gradient-to-b from-[#062A4F] via-[#0B74A5] to-[#041B33] px-4 py-10">
        <div className="mx-auto max-w-6xl">
          {/* ACCROCHE */}
          <div className="mb-8 rounded-3xl border border-white/20 bg-[#041B33]/70 p-6 shadow-2xl backdrop-blur-md">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              EleveAI · Apprendre autrement
            </p>

            <h1 className="text-3xl font-black leading-tight md:text-5xl">
              Un vrai parcours d’apprentissage du CM1 à la 3e.
            </h1>

            <p className="mt-4 max-w-3xl text-base text-slate-200 md:text-lg">
              EleveAI aide les élèves à progresser en mathématiques avec des
              parcours, des défis, du calcul rapide, des leçons courtes, un coach
              par compétences, English Maths et des entraînements au Concours
              général des collèges.
            </p>
          </div>

          {/* CHOIX DE CLASSE */}
          <div className="mb-10 rounded-3xl border border-white/15 bg-[#041B33]/65 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
                  Compétences
                </p>

                <h2 className="mt-1 text-2xl font-black md:text-3xl">
                  Je choisis ma classe
                </h2>
              </div>

              <Link
                href="/coach-maths-ia"
                className="hidden rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 md:inline-flex"
              >
                Voir toutes les compétences
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((classe) => (
                <Link
                  key={classe.label}
                  href={classe.href}
                  className="
                    group rounded-3xl border border-white/15
                    bg-white/[0.10] p-5 shadow-xl
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-emerald-300/70 hover:bg-white/[0.16]
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-4xl font-black text-white">
                        {classe.label}
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-slate-200">
                        {classe.description}
                      </p>
                    </div>

                    <div className="rounded-full bg-emerald-400 px-3 py-1 text-sm font-black text-[#041B33] transition group-hover:scale-110">
                      Go
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* COMMENCER SELON LE BESOIN */}
          <div className="rounded-3xl border border-white/15 bg-[#041B33]/65 p-5 shadow-2xl backdrop-blur-md">
            <div className="mb-4">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-300">
                Démarrage rapide
              </p>

              <h2 className="mt-1 text-2xl font-black md:text-3xl">
                Je commence selon mon besoin
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {besoins.map((besoin) => (
                <Link
                  key={besoin.href}
                  href={besoin.href}
                  className="
                    group overflow-hidden rounded-3xl border border-white/15
                    bg-[#041B33]/75 shadow-xl backdrop-blur-md
                    transition-all duration-300
                    hover:-translate-y-1 hover:border-white/40
                  "
                >
                  <div
                    className={`bg-gradient-to-br ${besoin.color} p-5 text-slate-950`}
                  >
                    <div className="text-3xl">{besoin.icon}</div>

                    <h3 className="mt-3 text-xl font-black">
                      {besoin.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <span className="text-sm font-bold text-slate-100">
                      {besoin.action}
                    </span>

                    <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#041B33] transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}