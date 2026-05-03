"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CalculRapideItem, NiveauCalculRapide } from "@/lib/calcul-rapide/types";

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
  if (item.mode !== "template" || !item.template || !item.variables || !item.answerRule) {
    return {
      ...item,
      displayText: item.media.text,
      displayExplanation: item.explanation,
      generatedExpected: item.expected ?? [],
    };
  }

  const values: Record<string, unknown> = {};

  Object.entries(item.variables).forEach(([key, possibleValues]) => {
    if (Array.isArray(possibleValues)) values[key] = pickRandom(possibleValues);
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
    generatedExpected: [answer, answer.replace(".", ","), answer.replace(",", ".")],
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
    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    samedi: "samedi",
    saturday: "samedi",
    dimanche: "dimanche",
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

export default function CalculRapideDefiClient() {
  const searchParams = useSearchParams();
  const niveauParam = searchParams.get("niveau");

  const niveau: NiveauCalculRapide =
    niveauParam === "5e" || niveauParam === "6e" || niveauParam === "4e" || niveauParam === "3e"
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
  }, [niveau]);

  useEffect(() => {
    if (currentQuestion) setTimeLeft(currentQuestion.durationSec);
  }, [currentIndex, currentQuestion]);

  if (!questions.length) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Aucune session trouvée pour le niveau {niveau}
      </main>
    );
  }

  function goNext() {
    setAnswer("");
    setFeedback(null);
    setShowHint(false);

    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function validateAndNext() {
    const acceptedAnswers = [
      ...(currentQuestion.expected ?? []),
      ...currentQuestion.generatedExpected,
    ];

    const isCorrect = acceptedAnswers.map(normalize).includes(normalize(answer));

    setFeedback(isCorrect);
    if (isCorrect) setScore((score) => score + 1);

    setTimeout(goNext, 1200);
  }

  useEffect(() => {
    if (!started || finished || paused) return;

    if (timeLeft <= 0) {
      goNext();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [started, finished, paused, timeLeft]);

  if (!started) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <section className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto mb-6 inline-flex rounded-full bg-emerald-400 px-5 py-2 font-black text-slate-950">
            Niveau {niveau}
          </div>

          <h1 className="text-5xl font-black md:text-7xl">Défi calcul rapide</h1>

          <p className="mt-5 text-2xl text-white/80">⚡ Calculs + 🧠 Défis</p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-10 rounded-full bg-emerald-400 px-10 py-5 text-2xl font-black text-slate-950"
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
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="w-full max-w-6xl rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="rounded-full bg-white/10 px-5 py-3 text-xl font-black">
            Question {currentIndex + 1} / {questions.length}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaused((paused) => !paused)}
              className="rounded-full bg-yellow-400 px-4 py-2 text-lg font-black text-slate-950"
            >
              {paused ? "▶️" : "⏸️"}
            </button>

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
        </div>

        <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-lg font-bold uppercase tracking-widest text-white/75">
          {currentQuestion.type === "calcul"
            ? "Calcul"
            : currentQuestion.type === "boss"
              ? "Boss 🔥"
              : "Problème"}
        </div>
        <div className="mb-6 flex flex-col items-center gap-2">

          <div className="text-6xl animate-bounce">
            🦎
          </div>

          <p className="text-lg font-bold text-amber-200">
            Besoin d’un coup de pouce ?
          </p>

          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="rounded-full bg-amber-300 px-6 py-3 text-lg font-black text-slate-950 shadow-lg hover:bg-amber-200"
          >
            👉 Obtenir un indice
          </button>

        </div>

        {showHint && (
          <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-amber-300/40 bg-amber-100 px-5 py-4 text-lg font-bold text-slate-900">
            {currentQuestion.hint}
          </div>
        )}



        <h1 className="mx-auto flex min-h-[220px] max-w-5xl items-center justify-center text-5xl font-black leading-tight md:text-7xl">
          {currentQuestion.displayText}
        </h1>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
          <input
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") validateAndNext();
            }}
            autoFocus
            placeholder="Ta réponse..."
            className="min-h-[70px] flex-1 rounded-3xl border border-white/20 bg-white px-6 text-3xl font-black text-slate-950 outline-none"
          />

          <button
            type="button"
            onClick={validateAndNext}
            className="rounded-3xl bg-emerald-400 px-8 py-5 text-2xl font-black text-slate-950"
          >
            Valider
          </button>
        </div>

        {feedback !== null && (
          <div className="mt-4 text-2xl font-bold">
            {feedback ? (
              <span className="text-green-400">✔ Bonne réponse</span>
            ) : (
              <span className="text-red-400">
                ❌{" "}
                {currentQuestion.displayExplanation ??
                  currentQuestion.explanation ??
                  "Réponse incorrecte."}
              </span>
            )}
          </div>
        )}

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