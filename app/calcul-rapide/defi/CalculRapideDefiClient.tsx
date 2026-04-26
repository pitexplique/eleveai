"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Question = {
  id: string;
  type: "calcul" | "probleme";
  text: string;
  durationSec: number;
  expected: string[];
};

const questions6e: Question[] = [
  {
    id: "q1",
    type: "calcul",
    text: "11 × 12",
    durationSec: 20,
    expected: ["132"],
  },
  {
    id: "q2",
    type: "calcul",
    text: "Combien font 75 % de 500 ?",
    durationSec: 20,
    expected: ["375"],
  },
  {
    id: "q3",
    type: "calcul",
    text: "Quel est le reste de la division euclidienne de 206 par 5 ?",
    durationSec: 20,
    expected: ["1"],
  },
  {
    id: "q4",
    type: "calcul",
    text: "4130,7 : 100",
    durationSec: 20,
    expected: ["41,307", "41.307"],
  },
  {
    id: "q5",
    type: "calcul",
    text: "Convertir 150 cm en mètres",
    durationSec: 20,
    expected: ["1,5", "1.5", "1,5 m", "1.5 m"],
  },
  {
    id: "q6",
    type: "probleme",
    text: "Quel est le périmètre d’un carré d’aire 49 cm² ?",
    durationSec: 60,
    expected: ["28", "28 cm"],
  },
  {
    id: "q7",
    type: "probleme",
    text: "Dans un collège de 2000 élèves, il y a 400 demi-pensionnaires. Donne le pourcentage.",
    durationSec: 60,
    expected: ["20", "20%", "20 %"],
  },
];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(",", ".").replace(/\s/g, "");
}

export default function CalculRapideDefiClient() {
  const searchParams = useSearchParams();
  const niveau = searchParams.get("niveau") ?? "6e";

  const questions = useMemo(() => questions6e, []);

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[0].durationSec);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  function goNext() {
    setAnswer("");

    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setTimeLeft(questions[nextIndex].durationSec);
  }

  function validateAndNext() {
    const isCorrect = currentQuestion.expected
      .map(normalize)
      .includes(normalize(answer));

    if (isCorrect) setScore((s) => s + 1);

    goNext();
  }

  useEffect(() => {
    if (!started || finished) return;

    if (timeLeft <= 0) {
      goNext();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [started, finished, timeLeft]);

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <section className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto mb-6 inline-flex rounded-full bg-emerald-400 px-5 py-2 font-black text-slate-950">
            Niveau {niveau}
          </div>

          <h1 className="text-5xl font-black md:text-7xl">
            Défi calcul rapide
          </h1>

          <p className="mt-5 text-2xl text-white/80">
            5 calculs + 2 problèmes. Chronomètre visible.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-10 rounded-full bg-emerald-400 px-10 py-5 text-2xl font-black text-slate-950 transition hover:scale-105"
          >
            🚀 Démarrer
          </button>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <section className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
          <h1 className="text-5xl font-black md:text-7xl">Bravo 🎉</h1>

          <p className="mt-6 text-4xl font-black text-emerald-300">
            Score : {score} / {questions.length}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/calcul-rapide"
              className="rounded-full bg-white px-8 py-4 text-xl font-black text-slate-950"
            >
              Retour
            </Link>

            <button
              type="button"
              onClick={() => {
                setStarted(true);
                setFinished(false);
                setCurrentIndex(0);
                setTimeLeft(questions[0].durationSec);
                setScore(0);
                setAnswer("");
              }}
              className="rounded-full bg-emerald-400 px-8 py-4 text-xl font-black text-slate-950"
            >
              Recommencer
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-6xl rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="rounded-full bg-white/10 px-5 py-3 text-xl font-black">
            Question {currentIndex + 1} / {questions.length}
          </div>

          <div
            className={`rounded-full px-6 py-3 text-3xl font-black ${
              timeLeft <= 5
                ? "bg-red-500 text-white"
                : "bg-emerald-400 text-slate-950"
            }`}
          >
            ⏱️ {timeLeft}s
          </div>
        </div>

        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-lg font-bold uppercase tracking-widest text-white/75">
          {currentQuestion.type === "calcul" ? "Calcul" : "Problème"}
        </div>

        <h1 className="mx-auto flex min-h-[220px] max-w-5xl items-center justify-center text-5xl font-black leading-tight md:text-7xl">
          {currentQuestion.text}
        </h1>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") validateAndNext();
            }}
            autoFocus
            placeholder="Ta réponse..."
            className="min-h-[70px] flex-1 rounded-3xl border border-white/20 bg-white px-6 text-3xl font-black text-slate-950 outline-none"
          />

          <button
            type="button"
            onClick={validateAndNext}
            className="rounded-3xl bg-emerald-400 px-8 py-5 text-2xl font-black text-slate-950 transition hover:scale-105"
          >
            Valider
          </button>
        </div>

        <button
          type="button"
          onClick={goNext}
          className="mt-6 text-lg font-bold text-white/60 hover:text-white"
        >
          Passer cette question
        </button>
      </section>
    </main>
  );
}