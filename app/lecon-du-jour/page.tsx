"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type LessonTheme = "fractions" | "pourcentages" | "probabilites";

type DailyLesson = {
  day: number;
  title: string;
  notion: string;
  audio: string;
};

const lessonPacks: Record<
  LessonTheme,
  {
    label: string;
    badge: string;
    writtenHref: string;
    coachHref: string;
    accent: {
      page: string;
      badge: string;
      card: string;
      activeDay: string;
      idleDay: string;
      primary: string;
      secondary: string;
    };
    lessons: DailyLesson[];
  }
> = {
  fractions: {
    label: "Fractions",
    badge: "Semaine des fractions",
    writtenHref: "/lecon-du-jour/ecrit/fractions",
    coachHref:
      "/tutor-v4?classe=6e&matiere=maths&notion=fraction_nombre&microId=fraction_lire_ecrire",
    accent: {
      page: "from-sky-50 via-indigo-50 to-purple-50",
      badge: "bg-sky-100 text-sky-700",
      card: "from-sky-100 to-indigo-100",
      activeDay: "bg-sky-600 text-white",
      idleDay: "bg-sky-100 text-sky-800 hover:bg-sky-200",
      primary: "bg-sky-500 hover:bg-sky-600",
      secondary: "bg-purple-500 hover:bg-purple-600",
    },
    lessons: [
      {
        day: 1,
        title: "Jour 1 - Comprendre une fraction",
        notion: "Une fraction represente des parts egales d'un tout.",
        audio: "/audio/lecondujour/fractions/jour1.mp3",
      },
      {
        day: 2,
        title: "Jour 2 - Les fractions simples",
        notion: "1/2, 1/4, 3/4 et 1/10 sont des fractions a connaitre.",
        audio: "/audio/lecondujour/fractions/jour2.mp3",
      },
      {
        day: 3,
        title: "Jour 3 - Comparer des fractions",
        notion: "A denominateur egal, on compare les numerateurs.",
        audio: "/audio/lecondujour/fractions/jour3.mp3",
      },
      {
        day: 4,
        title: "Jour 4 - Fractions equivalentes",
        notion: "1/2, 2/4 et 5/10 representent la meme quantite.",
        audio: "/audio/lecondujour/fractions/jour4.mp3",
      },
      {
        day: 5,
        title: "Jour 5 - Additionner des fractions",
        notion: "Avec le meme denominateur, on additionne les numerateurs.",
        audio: "/audio/lecondujour/fractions/jour5.mp3",
      },
      {
        day: 6,
        title: "Jour 6 - Fraction d'une quantite",
        notion:
          "Pour calculer 3/4 de 80, on calcule 1/4 puis on multiplie par 3.",
        audio: "/audio/lecondujour/fractions/jour6.mp3",
      },
      {
        day: 7,
        title: "Jour 7 - Defi final fractions",
        notion: "On combine comprehension, comparaison et calculs.",
        audio: "/audio/lecondujour/fractions/jour7.mp3",
      },
    ],
  },
  pourcentages: {
    label: "Pourcentages",
    badge: "Semaine des pourcentages",
    writtenHref: "/lecon-du-jour/ecrit/pourcentages",
    coachHref:
      "/tutor-v4?classe=6e&matiere=maths&notion=pourcentage_nombre&microId=pourcentage_comprendre",
    accent: {
      page: "from-orange-50 via-yellow-50 to-emerald-50",
      badge: "bg-orange-100 text-orange-700",
      card: "from-orange-100 to-yellow-100",
      activeDay: "bg-orange-500 text-white",
      idleDay: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      primary: "bg-orange-500 hover:bg-orange-600",
      secondary: "bg-emerald-500 hover:bg-emerald-600",
    },
    lessons: [
      {
        day: 1,
        title: "Jour 1 - Calculer 10%",
        notion: "10%, c'est diviser par 10.",
        audio: "/audio/lecondujour/pourcentages/jour1.mp3",
      },
      {
        day: 2,
        title: "Jour 2 - Calculer 50% et 25%",
        notion: "50%, c'est la moitie. 25%, c'est le quart.",
        audio: "/audio/lecondujour/pourcentages/jour2.mp3",
      },
      {
        day: 3,
        title: "Jour 3 - Calculer 20% et 30%",
        notion: "20% = 2 x 10% et 30% = 3 x 10%.",
        audio: "/audio/lecondujour/pourcentages/jour3.mp3",
      },
      {
        day: 4,
        title: "Jour 4 - 100%, 200%, 300%",
        notion: "100%, c'est tout. 200%, c'est le double.",
        audio: "/audio/lecondujour/pourcentages/jour4.mp3",
      },
      {
        day: 5,
        title: "Jour 5 - Calculer 1%, 2%, 3%",
        notion: "1%, c'est diviser par 100.",
        audio: "/audio/lecondujour/pourcentages/jour5.mp3",
      },
      {
        day: 6,
        title: "Jour 6 - Revision",
        notion: "On choisit la methode la plus rapide.",
        audio: "/audio/lecondujour/pourcentages/jour6.mp3",
      },
      {
        day: 7,
        title: "Jour 7 - Defi final pourcentages",
        notion: "On combine les methodes de calcul mental.",
        audio: "/audio/lecondujour/pourcentages/jour7.mp3",
      },
    ],
  },
  probabilites: {
    label: "Probabilites",
    badge: "Semaine des probabilites",
    writtenHref: "/lecon-du-jour/ecrit/probabilites",
    coachHref:
      "/tutor-v4?classe=6e&matiere=maths&notion=proba_experience&microId=proba_vocabulaire",
    accent: {
      page: "from-emerald-50 via-cyan-50 to-violet-50",
      badge: "bg-emerald-100 text-emerald-700",
      card: "from-emerald-100 to-cyan-100",
      activeDay: "bg-emerald-500 text-white",
      idleDay: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      primary: "bg-emerald-500 hover:bg-emerald-600",
      secondary: "bg-violet-500 hover:bg-violet-600",
    },
    lessons: [
      {
        day: 1,
        title: "Jour 1 - Situation de hasard",
        notion:
          "Une situation de hasard est une situation dont on ne peut pas prevoir le resultat avec certitude.",
        audio: "/audio/lecondujour/probabilites/jour1.mp3",
      },
      {
        day: 2,
        title: "Jour 2 - Issues et evenement",
        notion:
          "Les issues sont tous les resultats possibles d'une experience aleatoire.",
        audio: "/audio/lecondujour/probabilites/jour2.mp3",
      },
      {
        day: 3,
        title: "Jour 3 - Impossible, possible, certain",
        notion:
          "Impossible correspond a 0, certain correspond a 1, possible est entre 0 et 1.",
        audio: "/audio/lecondujour/probabilites/jour3.mp3",
      },
      {
        day: 4,
        title: "Jour 4 - Probabilite entre 0 et 1",
        notion: "Une probabilite est toujours comprise entre 0 et 1.",
        audio: "/audio/lecondujour/probabilites/jour4.mp3",
      },
      {
        day: 5,
        title: "Jour 5 - Equiprobabilite",
        notion:
          "Il y a equiprobabilite quand toutes les issues ont la meme chance d'arriver.",
        audio: "/audio/lecondujour/probabilites/jour5.mp3",
      },
      {
        day: 6,
        title: "Jour 6 - Calculer une probabilite",
        notion:
          "En equiprobabilite, probabilite = issues favorables / issues possibles.",
        audio: "/audio/lecondujour/probabilites/jour6.mp3",
      },
      {
        day: 7,
        title: "Jour 7 - Fraction, decimal, pourcentage",
        notion:
          "Une probabilite peut s'ecrire en fraction, en decimal ou en pourcentage.",
        audio: "/audio/lecondujour/probabilites/jour7.mp3",
      },
    ],
  },
};

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

export default function LeconDuJourPage() {
  const [theme, setTheme] = useState<LessonTheme>("fractions");
  const [selectedDay, setSelectedDay] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pack = lessonPacks[theme];

  const lesson = useMemo(
    () => pack.lessons.find((item) => item.day === selectedDay) ?? pack.lessons[0],
    [pack.lessons, selectedDay]
  );

  useEffect(() => {
    setSeconds(0);
    setIsPlaying(false);

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
  }, [lesson.audio]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  function selectTheme(nextTheme: LessonTheme) {
    setTheme(nextTheme);
    setSelectedDay(1);
  }

  return (
    <main
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${pack.accent.page} px-3 py-4 text-slate-900 sm:px-5 sm:py-6 lg:px-6 lg:py-8`}
    >
      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-3xl items-start pt-2 sm:pt-4 lg:pt-6">
        <div className="w-full rounded-[1.5rem] border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur sm:rounded-[2rem] sm:p-6 lg:p-7">
          <div className="mb-5 text-center sm:mb-6">
            <p
              className={`inline-flex rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide sm:text-sm ${pack.accent.badge}`}
            >
              {pack.badge}
            </p>

            <h1 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
              Lecon du jour
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Ecoute, comprends, puis relis la lecon a l'ecrit.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
              Temps d'ecoute : {formatTime(seconds)}
            </div>
          </div>

          <div className="mb-5 grid gap-2 sm:grid-cols-3">
            {(Object.keys(lessonPacks) as LessonTheme[]).map((item) => {
              const active = item === theme;
              const itemPack = lessonPacks[item];

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectTheme(item)}
                  className={[
                    "rounded-2xl px-4 py-3 text-sm font-black shadow-sm transition",
                    active
                      ? "bg-slate-950 text-white"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200",
                  ].join(" ")}
                >
                  {itemPack.label}
                </button>
              );
            })}
          </div>

          <div className="mb-5 grid grid-cols-7 gap-1.5 sm:gap-2">
            {pack.lessons.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => setSelectedDay(item.day)}
                className={`rounded-xl py-2 text-xs font-black transition sm:text-sm ${
                  selectedDay === item.day
                    ? `scale-105 shadow ${pack.accent.activeDay}`
                    : pack.accent.idleDay
                }`}
              >
                J{item.day}
              </button>
            ))}
          </div>

          <div className={`rounded-3xl bg-gradient-to-br ${pack.accent.card} p-4 sm:p-5 lg:p-6`}>
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                  {lesson.title}
                </h2>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700 shadow-sm">
                  Jour {lesson.day}/7
                </span>
              </div>

              <p className="mt-2 text-base font-semibold leading-relaxed text-slate-800 sm:text-lg">
                {lesson.notion}
              </p>
            </div>

            <audio
              ref={audioRef}
              key={lesson.audio}
              controls
              className="mb-4 w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={handlePause}
              onEnded={handlePause}
            >
              <source src={lesson.audio} type="audio/mpeg" />
              Votre navigateur ne peut pas lire cet audio.
            </audio>

            <button
              type="button"
              onClick={handlePlay}
              className="mb-4 w-full rounded-2xl bg-emerald-500 px-5 py-3 text-center text-sm font-black text-white shadow hover:bg-emerald-600 sm:text-base"
            >
              Lancer la lecon audio
            </button>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href={pack.writtenHref}
                className={`rounded-2xl px-5 py-3 text-center text-sm font-black text-white shadow sm:text-base ${pack.accent.primary}`}
              >
                Voir la lecon ecrite
              </Link>

              <Link
                href={pack.coachHref}
                className={`rounded-2xl px-5 py-3 text-center text-sm font-black text-white shadow sm:text-base ${pack.accent.secondary}`}
              >
                S'entrainer avec le Coach IA
              </Link>
            </div>

            <div className="mt-4 rounded-2xl bg-white/80 p-3 text-center text-sm font-semibold text-slate-600">
              Conseil : ecoute une fois, puis essaie de refaire l'exemple sans
              regarder.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
