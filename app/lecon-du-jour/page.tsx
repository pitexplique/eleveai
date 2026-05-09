"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const tutorLinks = {
  pourcentages: {
    comprendre:
      "/tutor-v4?classe=6e&matiere=maths&notion=pourcentages&microId=pourcentage_comprendre",
  },
};

const lessons = [
  {
    day: 1,
    title: "Jour 1 — 10%",
    notion: "10%, c’est diviser par 10.",
    audio: "/audio/lecondujour/pourcentages/jour1.mp3",
  },
  {
    day: 2,
    title: "Jour 2 — 50% et 25%",
    notion: "50% = moitié, 25% = diviser par 4.",
    audio: "/audio/lecondujour/pourcentages/jour2.mp3",
  },
  {
    day: 3,
    title: "Jour 3 — 20% et 30%",
    notion: "20% = 2×10%, 30% = 3×10%.",
    audio: "/audio/lecondujour/pourcentages/jour3.mp3",
  },
  {
    day: 4,
    title: "Jour 4 — 100%, 200%, 300%",
    notion: "100% = tout, 200% = double, 300% = triple.",
    audio: "/audio/lecondujour/pourcentages/jour4.mp3",
  },
  {
    day: 5,
    title: "Jour 5 — 1%, 2%, 3%",
    notion: "1% = ÷100, puis ×2 ou ×3.",
    audio: "/audio/lecondujour/pourcentages/jour5.mp3",
  },
  {
    day: 6,
    title: "Jour 6 — Révision",
    notion: "On mélange tout 🔥",
    audio: "/audio/lecondujour/pourcentages/jour6.mp3",
  },
  {
    day: 7,
    title: "Jour 7 — Défi final",
    notion: "Teste-toi sur toute la semaine 🏆",
    audio: "/audio/lecondujour/pourcentages/jour7.mp3",
  },
];

export default function LeconDuJourPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const lesson = useMemo(
    () => lessons.find((l) => l.day === selectedDay) ?? lessons[0],
    [selectedDay]
  );

  useEffect(() => {
    setSeconds(0);

    const interval = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [selectedDay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        // Autoplay parfois bloqué : l'élève appuie sur play.
      }
    };

    playAudio();
  }, [lesson.audio]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 px-3 py-4 text-slate-900 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
      {/* SVG MATHS EN FOND */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="mathPattern"
              width="240"
              height="180"
              patternUnits="userSpaceOnUse"
            >
              <text x="20" y="40" fontSize="34" fontWeight="900" fill="#fb923c">
                %
              </text>
              <text x="95" y="70" fontSize="28" fontWeight="900" fill="#16a34a">
                10%
              </text>
              <text x="160" y="42" fontSize="30" fontWeight="900" fill="#7c3aed">
                1/4
              </text>

              <circle
                cx="55"
                cy="125"
                r="34"
                fill="none"
                stroke="#f97316"
                strokeWidth="5"
              />
              <path
                d="M55 125 L55 91 A34 34 0 0 1 89 125 Z"
                fill="#fdba74"
              />

              <line
                x1="125"
                y1="130"
                x2="215"
                y2="130"
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="145"
                y1="115"
                x2="145"
                y2="145"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <line
                x1="175"
                y1="115"
                x2="175"
                y2="145"
                stroke="#0f172a"
                strokeWidth="3"
              />
              <line
                x1="205"
                y1="115"
                x2="205"
                y2="145"
                stroke="#0f172a"
                strokeWidth="3"
              />

              <text x="125" y="168" fontSize="24" fontWeight="900" fill="#2563eb">
                × ÷ =
              </text>
            </pattern>
          </defs>

          <rect width="1200" height="800" fill="url(#mathPattern)" />
        </svg>
      </div>

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-3xl items-start pt-2 sm:pt-4 lg:pt-6">
        <div className="w-full rounded-[1.5rem] border border-orange-200 bg-white/95 p-4 shadow-xl backdrop-blur sm:rounded-[2rem] sm:p-6 lg:p-7">
          {/* HEADER */}
          <div className="mb-5 text-center sm:mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-600 sm:text-sm">
              Semaine des pourcentages
            </p>

            <h1 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
              🧠 Leçon du jour
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Écoute, comprends, puis relis la leçon à l’écrit.
            </p>

            <p className="mt-2 text-sm font-bold text-orange-600">
              ⏱️ {seconds} s
            </p>
          </div>

          {/* SELECT JOUR */}
          <div className="mb-5 grid grid-cols-7 gap-1.5 sm:gap-2">
            {lessons.map((l) => (
              <button
                key={l.day}
                type="button"
                onClick={() => setSelectedDay(l.day)}
                className={`rounded-xl py-2 text-xs font-black transition sm:text-sm ${
                  selectedDay === l.day
                    ? "scale-105 bg-orange-500 text-white shadow"
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`}
              >
                J{l.day}
              </button>
            ))}
          </div>

          {/* CARD */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-yellow-100 p-4 sm:p-5 lg:p-6">
            <div className="mb-4">
              <h2 className="text-xl font-black text-orange-700 sm:text-2xl">
                {lesson.title}
              </h2>

              <p className="mt-2 text-base font-semibold leading-relaxed text-slate-800 sm:text-lg">
                {lesson.notion}
              </p>
            </div>

            {/* AUDIO */}
            <audio
              ref={audioRef}
              key={lesson.audio}
              controls
              autoPlay
              className="mb-4 w-full"
            >
              <source src={lesson.audio} type="audio/mpeg" />
            </audio>

            {/* LIENS */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/lecon-du-jour/ecrit/pourcentages"
                className="rounded-2xl bg-orange-500 px-5 py-3 text-center text-sm font-black text-white shadow hover:bg-orange-600 sm:text-base"
              >
                📖 Voir la leçon écrite
              </Link>

              <Link
                href={tutorLinks.pourcentages.comprendre}
                className="rounded-2xl bg-purple-500 px-5 py-3 text-center text-sm font-black text-white shadow hover:bg-purple-600 sm:text-base"
              >
                🧠 S’entraîner avec le Coach IA
              </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-4 text-center text-sm font-semibold text-slate-600">
              📅 Jour {lesson.day} / 7
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}