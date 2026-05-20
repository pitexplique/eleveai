"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const lessons = [
  {
    day: 1,
    title: "Jour 1 — Comprendre une fraction",
    notion: "Une fraction représente des parts égales d’un tout.",
    audio: "/audio/lecondujour/fractions/jour1.mp3",
  },
  {
    day: 2,
    title: "Jour 2 — Les fractions simples",
    notion: "1/2, 1/4, 3/4 et 1/10 sont des fractions à connaître.",
    audio: "/audio/lecondujour/fractions/jour2.mp3",
  },
  {
    day: 3,
    title: "Jour 3 — Comparer des fractions",
    notion: "À dénominateur égal, on compare les numérateurs.",
    audio: "/audio/lecondujour/fractions/jour3.mp3",
  },
  {
    day: 4,
    title: "Jour 4 — Fractions équivalentes",
    notion: "1/2, 2/4 et 5/10 représentent la même quantité.",
    audio: "/audio/lecondujour/fractions/jour4.mp3",
  },
  {
    day: 5,
    title: "Jour 5 — Additionner des fractions",
    notion: "Avec le même dénominateur, on additionne les numérateurs.",
    audio: "/audio/lecondujour/fractions/jour5.mp3",
  },
  {
    day: 6,
    title: "Jour 6 — Fraction d’une quantité",
    notion:
      "Pour calculer 3/4 de 80, on calcule 1/4 puis on multiplie par 3.",
    audio: "/audio/lecondujour/fractions/jour6.mp3",
  },
  {
    day: 7,
    title: "Jour 7 — Défi final fractions",
    notion: "On combine compréhension, comparaison et calculs.",
    audio: "/audio/lecondujour/fractions/jour7.mp3",
  },
];

function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}

export default function LeconDuJourPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lesson = useMemo(
    () => lessons.find((l) => l.day === selectedDay) ?? lessons[0],
    [selectedDay]
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
      setSeconds((s) => s + 1);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 px-3 py-4 text-slate-900 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="fractionPattern"
              width="250"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              <text
                x="30"
                y="48"
                fontSize="34"
                fontWeight="900"
                fill="#2563eb"
              >
                1/2
              </text>

              <text
                x="145"
                y="48"
                fontSize="34"
                fontWeight="900"
                fill="#7c3aed"
              >
                3/4
              </text>

              <circle
                cx="62"
                cy="125"
                r="34"
                fill="none"
                stroke="#2563eb"
                strokeWidth="5"
              />
              <path
                d="M62 125 L62 91 A34 34 0 0 1 96 125 Z"
                fill="#93c5fd"
              />

              <rect
                x="130"
                y="100"
                width="92"
                height="42"
                rx="8"
                fill="white"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <line
                x1="153"
                y1="100"
                x2="153"
                y2="142"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <line
                x1="176"
                y1="100"
                x2="176"
                y2="142"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <line
                x1="199"
                y1="100"
                x2="199"
                y2="142"
                stroke="#0f172a"
                strokeWidth="2"
              />
              <rect
                x="130"
                y="100"
                width="46"
                height="42"
                rx="8"
                fill="#c4b5fd"
                opacity="0.8"
              />
            </pattern>
          </defs>

          <rect width="1200" height="800" fill="url(#fractionPattern)" />
        </svg>
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-3xl items-start pt-2 sm:pt-4 lg:pt-6">
        <div className="w-full rounded-[1.5rem] border border-sky-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:rounded-[2rem] sm:p-6 lg:p-7">
          <div className="mb-5 text-center sm:mb-6">
            <p className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-sky-700 sm:text-sm">
              Semaine des fractions
            </p>

            <h1 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl">
              🧠 Leçon du jour
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Écoute, comprends, puis relis la leçon à l’écrit.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-700">
              ⏱️ Temps d’écoute : {formatTime(seconds)}
            </div>
          </div>

          <div className="mb-5 grid grid-cols-7 gap-1.5 sm:gap-2">
            {lessons.map((l) => (
              <button
                key={l.day}
                type="button"
                onClick={() => setSelectedDay(l.day)}
                className={`rounded-xl py-2 text-xs font-black transition sm:text-sm ${
                  selectedDay === l.day
                    ? "scale-105 bg-sky-600 text-white shadow"
                    : "bg-sky-100 text-sky-800 hover:bg-sky-200"
                }`}
              >
                J{l.day}
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-sky-100 to-indigo-100 p-4 sm:p-5 lg:p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h2 className="text-xl font-black text-sky-800 sm:text-2xl">
                  {lesson.title}
                </h2>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-sky-700 shadow-sm">
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
              🔊 Lancer la leçon audio
            </button>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/lecon-du-jour/ecrit/fractions"
                className="rounded-2xl bg-sky-500 px-5 py-3 text-center text-sm font-black text-white shadow hover:bg-sky-600 sm:text-base"
              >
                📖 Voir la leçon écrite
              </Link>

              <Link
                href="/tutor-v4?classe=6e&matiere=maths&notion=fractions&microId=fraction_comprendre"
                className="rounded-2xl bg-purple-500 px-5 py-3 text-center text-sm font-black text-white shadow hover:bg-purple-600 sm:text-base"
              >
                🧠 S’entraîner avec le Coach IA
              </Link>
            </div>

            <div className="mt-4 rounded-2xl bg-white/80 p-3 text-center text-sm font-semibold text-slate-600">
              Conseil : écoute une fois, puis essaie de refaire l’exemple sans
              regarder.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}