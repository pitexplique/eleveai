"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type {
  CalculRapideItem,
  NiveauCalculRapide,
} from "@/lib/calcul-rapide/types";

import { weekly6e } from "@/lib/calcul-rapide/data/6e/weekly";
import { calculsFixed6e } from "@/lib/calcul-rapide/data/6e/calculs.fixed";
import { calculsTemplates6e } from "@/lib/calcul-rapide/data/6e/calculs.templates";
import { problemesFixed6e } from "@/lib/calcul-rapide/data/6e/problemes.fixed";
import { problemesTemplates6e } from "@/lib/calcul-rapide/data/6e/problemes.templates";

import { weekly5e } from "@/lib/calcul-rapide/data/5e/weekly";
import { calculsFixed5e } from "@/lib/calcul-rapide/data/5e/calculs.fixed";
import { calculsTemplates5e } from "@/lib/calcul-rapide/data/5e/calculs.templates";
import { problemesFixed5e } from "@/lib/calcul-rapide/data/5e/problemes.fixed";
import { problemesTemplates5e } from "@/lib/calcul-rapide/data/5e/problemes.templates";

import { weekly4e } from "@/lib/calcul-rapide/data/4e/weekly";
import { calculsFixed4e } from "@/lib/calcul-rapide/data/4e/calculs.fixed";
import { calculsTemplates4e } from "@/lib/calcul-rapide/data/4e/calculs.templates";
import { problemesFixed4e } from "@/lib/calcul-rapide/data/4e/problemes.fixed";
import { problemesTemplates4e } from "@/lib/calcul-rapide/data/4e/problemes.templates";

import { weekly3e } from "@/lib/calcul-rapide/data/3e/weekly";
import { calculsFixed3e } from "@/lib/calcul-rapide/data/3e/calculs.fixed";
import { calculsTemplates3e } from "@/lib/calcul-rapide/data/3e/calculs.templates";
import { problemesFixed3e } from "@/lib/calcul-rapide/data/3e/problemes.fixed";
import { problemesTemplates3e } from "@/lib/calcul-rapide/data/3e/problemes.templates";

type GeneratedCalculRapideItem = CalculRapideItem & {
  displayText: string;
  displayExplanation?: string;
  generatedExpected: string[];
};

function normalize(value: string) {
  return value.trim().toLowerCase().replace(",", ".").replace(/\s/g, "");
}

function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(6))).replace(".", ",");
}

function pickRandom(values: unknown[]) {
  return values[Math.floor(Math.random() * values.length)];
}

function replaceTemplate(text: string, values: Record<string, unknown>) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => String(values[key] ?? ""));
}

function computeAnswer(rule: string, values: Record<string, unknown>) {
  const keys = Object.keys(values);
  const args = keys.map((key) => Number(values[key]));
  const fn = new Function(...keys, `return ${rule};`);
  const result = fn(...args);

  return typeof result === "number" ? formatNumber(result) : String(result);
}

function generateItem(item: CalculRapideItem): GeneratedCalculRapideItem {
  if (
    item.mode !== "template" ||
    !item.template ||
    !item.variables ||
    !item.answerRule
  ) {
    return {
      ...item,
      displayText: item.media.text,
      displayExplanation: item.explanation,
      generatedExpected: item.expected ?? [],
    };
  }

  const values: Record<string, unknown> = {};

  Object.entries(item.variables).forEach(([key, possibleValues]) => {
    if (Array.isArray(possibleValues)) {
      values[key] = pickRandom(possibleValues);
    }
  });

  const answer = computeAnswer(item.answerRule, values);
  const displayText = replaceTemplate(item.template, values);

  const explanationWithValues = item.explanationTemplate
    ? replaceTemplate(item.explanationTemplate, { ...values, answer })
    : undefined;

  return {
    ...item,
    media: { ...item.media, text: displayText },
    displayText,
    displayExplanation: explanationWithValues,
    generatedExpected: [
      answer,
      answer.replace(".", ","),
      answer.replace(",", "."),
    ],
  };
}

function getDataByNiveau(niveau: NiveauCalculRapide) {
  if (niveau === "5e") {
    return {
      weeks: weekly5e,
      items: [
        ...calculsFixed5e,
        ...calculsTemplates5e,
        ...problemesFixed5e,
        ...problemesTemplates5e,
      ],
    };
  }

  if (niveau === "4e") {
    return {
      weeks: weekly4e,
      items: [
        ...calculsFixed4e,
        ...calculsTemplates4e,
        ...problemesFixed4e,
        ...problemesTemplates4e,
      ],
    };
  }

  if (niveau === "3e") {
    return {
      weeks: weekly3e,
      items: [
        ...calculsFixed3e,
        ...calculsTemplates3e,
        ...problemesFixed3e,
        ...problemesTemplates3e,
      ],
    };
  }

  return {
    weeks: weekly6e,
    items: [
      ...calculsFixed6e,
      ...calculsTemplates6e,
      ...problemesFixed6e,
      ...problemesTemplates6e,
    ],
  };
}

function getTodayDay() {
  const todayRaw = new Date()
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .toLowerCase();

  const map: Record<string, string> = {
    lundi: "lundi",
    mardi: "mardi",
    mercredi: "mercredi",
    jeudi: "jeudi",
    vendredi: "vendredi",
    samedi: "samedi",
    dimanche: "dimanche",
    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    saturday: "samedi",
    sunday: "dimanche",
  };

  return map[todayRaw];
}

function buildSession(niveau: NiveauCalculRapide): GeneratedCalculRapideItem[] {
  const { weeks, items } = getDataByNiveau(niveau);
  const day = getTodayDay();

  const week = weeks[0];
  const session = week?.sessions.find((session) => session.day === day);

  if (!session) return [];

  return session.itemIds
    .map((id: string) => items.find((item) => item.id === id))
    .filter((item): item is CalculRapideItem => Boolean(item))
    .map(generateItem);
}

function getScoreMessage(score: number, total: number) {
  const ratio = score / total;

  if (ratio >= 0.85) {
    return {
      title: "Excellent 🔥",
      message:
        "Tu maîtrises bien les automatismes. Continue avec des défis plus difficiles dans Coach-IA.",
      color: "text-emerald-300",
    };
  }

  if (ratio >= 0.6) {
    return {
      title: "Bon travail 💪",
      message:
        "Tu as de bonnes bases, mais quelques notions méritent d’être renforcées dans Coach-IA.",
      color: "text-amber-300",
    };
  }

  return {
    title: "Il faut s’entraîner 🧠",
    message:
      "Pas grave : l’erreur sert à apprendre. Va t’entraîner dans Coach-IA puis reviens refaire le défi.",
    color: "text-red-300",
  };
}

export default function CalculRapideDefiClient() {
  const searchParams = useSearchParams();
  const niveauParam = searchParams.get("niveau");

  const niveau: NiveauCalculRapide =
    niveauParam === "5e" ||
    niveauParam === "6e" ||
    niveauParam === "4e" ||
    niveauParam === "3e"
      ? niveauParam
      : "6e";

  const questions = useMemo(() => buildSession(niveau), [niveau]);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<null | boolean>(null);
  const [showHint, setShowHint] = useState(false);
  const [lockedCorrection, setLockedCorrection] = useState(false);
  const [correctionTimeLeft, setCorrectionTimeLeft] = useState(0);

  const currentQuestion = questions[currentIndex];
  const [timeLeft, setTimeLeft] = useState(currentQuestion?.durationSec ?? 20);

  useEffect(() => {
    setStarted(false);
    setPaused(false);
    setCurrentIndex(0);
    setAnswer("");
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setShowHint(false);
    setLockedCorrection(false);
    setCorrectionTimeLeft(0);
  }, [niveau]);

  useEffect(() => {
    if (currentQuestion) setTimeLeft(currentQuestion.durationSec);
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (!started || finished || paused || lockedCorrection) return;

    if (timeLeft <= 0) {
      goNext();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [started, finished, paused, lockedCorrection, timeLeft]);

  useEffect(() => {
    if (!lockedCorrection || correctionTimeLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setCorrectionTimeLeft((time) => time - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [lockedCorrection, correctionTimeLeft]);

  function goNext() {
    setAnswer("");
    setFeedback(null);
    setShowHint(false);
    setLockedCorrection(false);
    setCorrectionTimeLeft(0);
    setPaused(false);

    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function validateAndNext() {
    if (feedback !== null || lockedCorrection) return;

    const acceptedAnswers = [
      ...(currentQuestion.expected ?? []),
      ...currentQuestion.generatedExpected,
    ];

    const isCorrect = acceptedAnswers.map(normalize).includes(normalize(answer));

    setFeedback(isCorrect);

    if (isCorrect) {
      setScore((score) => score + 1);
      window.setTimeout(goNext, 1200);
      return;
    }

    setPaused(true);
    setLockedCorrection(true);
    setCorrectionTimeLeft(20);

    window.setTimeout(() => {
      goNext();
    }, 20000);
  }

  if (!questions.length) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-slate-950 px-4 text-center text-white">
        Aucune session trouvée pour le niveau {niveau}
      </main>
    );
  }

  if (!started) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-slate-950 px-4 py-4 text-white">
        <section className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur sm:p-8">
          <div className="mx-auto mb-4 inline-flex rounded-full bg-emerald-400 px-5 py-2 text-sm font-black text-slate-950 sm:text-base">
            Niveau {niveau}
          </div>

          <h1 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Défi calcul rapide
          </h1>

          <p className="mt-4 text-lg text-white/80 sm:text-2xl">
            ⚡ Calculs + 🧠 Défis
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-8 rounded-full bg-emerald-400 px-9 py-4 text-xl font-black text-slate-950 sm:text-2xl"
          >
            🚀 Démarrer
          </button>
        </section>
      </main>
    );
  }

  if (finished) {
    const bilan = getScoreMessage(score, questions.length);

    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-slate-950 px-4 py-4 text-white">
        <section className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-6 text-center shadow-2xl backdrop-blur sm:p-8">
          <h1 className="text-4xl font-black sm:text-5xl md:text-6xl">
            Bravo 🎉
          </h1>

          <p className="mt-4 text-3xl font-black text-emerald-300 sm:text-4xl">
            Score : {score} / {questions.length}
          </p>

          <div className="mx-auto mt-5 max-w-3xl rounded-3xl border border-white/15 bg-slate-900/80 p-4 sm:p-5">
            <p className={`text-2xl font-black sm:text-3xl ${bilan.color}`}>
              {bilan.title}
            </p>

            <p className="mt-3 text-base font-bold text-white/85 sm:text-xl">
              {bilan.message}
            </p>
          </div>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/calcul-rapide"
              className="rounded-full bg-white px-8 py-4 text-xl font-black text-slate-950"
            >
              Retour
            </Link>

            <Link
              href={`/coach-maths-ia?classe=${niveau}`}
              className="rounded-full bg-amber-300 px-8 py-4 text-xl font-black text-slate-950"
            >
              S’entraîner dans Coach-IA
            </Link>

            <button
              type="button"
              onClick={() => window.location.reload()}
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
    <main className="flex min-h-[100svh] items-center justify-center bg-slate-950 px-3 py-3 text-white sm:px-6">
      <section className="w-full max-w-6xl rounded-[1.75rem] border border-white/15 bg-white/10 p-4 text-center shadow-2xl backdrop-blur sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2 sm:mb-5">
          <div className="rounded-full bg-white/10 px-3 py-2 text-sm font-black sm:px-5 sm:text-xl">
            Question {currentIndex + 1} / {questions.length}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setPaused((paused) => !paused)}
              disabled={lockedCorrection}
              className="rounded-full bg-yellow-400 px-3 py-2 text-base font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-lg"
            >
              {paused ? "▶️" : "⏸️"}
            </button>

            <div
              className={`rounded-full px-4 py-2 text-xl font-black sm:px-6 sm:text-3xl ${
                timeLeft <= 5
                  ? "bg-red-500 text-white"
                  : "bg-emerald-400 text-slate-950"
              }`}
            >
              ⏱️ {timeLeft}s
            </div>
          </div>
        </div>

        <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white/75 sm:text-base">
          {currentQuestion.type === "calcul"
            ? "Calcul"
            : currentQuestion.type === "boss"
              ? "Boss 🔥"
              : "Problème"}
        </div>

        <div className="mb-3 flex flex-col items-center gap-1">
          <div className="animate-bounce text-4xl sm:text-5xl">🦎</div>

          <p className="hidden text-lg font-bold text-amber-200 sm:block">
            Besoin d’un coup de pouce ?
          </p>

          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            disabled={lockedCorrection}
            className="rounded-full bg-amber-300 px-5 py-2 text-base font-black text-slate-950 shadow-lg hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg"
          >
            👉 Obtenir un indice
          </button>
        </div>

        {showHint && (
          <div className="mx-auto mb-3 mt-2 max-w-3xl rounded-2xl border border-amber-300/40 bg-amber-100 px-4 py-3 text-base font-bold text-slate-900 sm:text-lg">
            {currentQuestion.hint}
          </div>
        )}

        <h1 className="mx-auto flex min-h-[110px] max-w-5xl items-center justify-center text-3xl font-black leading-tight sm:min-h-[130px] sm:text-5xl md:text-6xl">
          {currentQuestion.displayText}
        </h1>

        <div className="mx-auto mt-5 flex max-w-3xl flex-col gap-3 sm:flex-row">
          <input
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") validateAndNext();
            }}
            disabled={feedback !== null || lockedCorrection}
            autoFocus
            placeholder="Ta réponse..."
            className="min-h-[56px] flex-1 rounded-3xl border border-white/20 bg-white px-5 text-2xl font-black text-slate-950 outline-none disabled:cursor-not-allowed disabled:bg-slate-200 sm:min-h-[64px] sm:text-3xl"
          />

          <button
            type="button"
            onClick={validateAndNext}
            disabled={feedback !== null || lockedCorrection}
            className="rounded-3xl bg-emerald-400 px-7 py-4 text-xl font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-50 sm:text-2xl"
          >
            Valider
          </button>
        </div>

        {feedback !== null && (
          <div className="mx-auto mt-4 max-w-4xl rounded-3xl border border-white/15 bg-slate-900/80 p-4 text-lg font-bold sm:text-2xl">
            {feedback ? (
              <span className="text-green-400">✔ Bonne réponse</span>
            ) : (
              <div className="text-left text-red-300">
                <p className="mb-2 text-center text-2xl font-black">
                  ❌ Pas encore. Lis bien la correction.
                </p>

                <p className="whitespace-pre-line text-white">
                  {currentQuestion.displayExplanation ??
                    currentQuestion.explanation ??
                    "Réponse incorrecte."}
                </p>

                <p className="mt-3 text-center text-sm font-black text-amber-300 sm:text-lg">
                  Prochaine question dans {correctionTimeLeft}s
                </p>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={goNext}
          disabled={lockedCorrection}
          className={`mt-3 text-sm font-bold sm:text-lg ${
            lockedCorrection
              ? "cursor-not-allowed text-white/25"
              : "text-white/60 hover:text-white"
          }`}
        >
          Passer cette question
        </button>
      </section>
    </main>
  );
}