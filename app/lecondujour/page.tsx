"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

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

  const lesson = useMemo(
    () => lessons.find((l) => l.day === selectedDay) ?? lessons[0],
    [selectedDay]
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-emerald-50 px-4 py-8 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-orange-200 bg-white/90 p-6 shadow-xl">

          {/* HEADER */}
          <div className="mb-6 text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
              Semaine des pourcentages
            </p>
            <h1 className="mt-2 text-3xl font-black">
              🧠 Leçon du jour
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              10 secondes pour comprendre. Puis entraîne-toi.
            </p>
          </div>

          {/* SELECT JOUR */}
          <div className="mb-5 grid grid-cols-7 gap-2">
            {lessons.map((l) => (
              <button
                key={l.day}
                onClick={() => setSelectedDay(l.day)}
                className={`rounded-xl py-2 text-sm font-black transition ${
                  selectedDay === l.day
                    ? "bg-orange-500 text-white shadow scale-105"
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`}
              >
                J{l.day}
              </button>
            ))}
          </div>

          {/* CARD */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-100 to-yellow-100 p-5">

            <div className="mb-4">
              <h2 className="text-2xl font-black text-orange-700">
                {lesson.title}
              </h2>
              <p className="mt-1 text-lg font-semibold text-slate-800">
                {lesson.notion}
              </p>
            </div>

            {/* AUDIO */}
            <audio key={lesson.audio} controls className="w-full mb-4">
              <source src={lesson.audio} type="audio/mpeg" />
            </audio>

            {/* CTA */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/calcul-rapide"
                className="rounded-2xl bg-emerald-500 px-5 py-3 text-center font-black text-white shadow hover:bg-emerald-600"
              >
                ⚡ Calcul rapide
              </Link>

              <Link
                href="/coach-maths-ia"
                className="rounded-2xl bg-purple-500 px-5 py-3 text-center font-black text-white shadow hover:bg-purple-600"
              >
                🧠 Coach IA
              </Link>
            </div>

            {/* FOOTER */}
            <div className="mt-4 text-center text-sm text-slate-600">
              📅 Jour {lesson.day} / 7
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}