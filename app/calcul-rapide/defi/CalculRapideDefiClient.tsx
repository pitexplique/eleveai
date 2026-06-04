"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";

import type {
  CalculRapideItem,
  NiveauCalculRapide,
} from "@/lib/calcul-rapide/types";

import { weeklyCM1 } from "@/lib/calcul-rapide/data/cm1/weekly";
import { calculsFixedCM1 } from "@/lib/calcul-rapide/data/cm1/calculs.fixed";
import { calculsTemplatesCM1 } from "@/lib/calcul-rapide/data/cm1/calculs.templates";
import { problemesFixedCM1 } from "@/lib/calcul-rapide/data/cm1/problemes.fixed";
import { problemesTemplatesCM1 } from "@/lib/calcul-rapide/data/cm1/problemes.templates";

import { weeklyCM2 } from "@/lib/calcul-rapide/data/cm2/weekly";
import { calculsFixedCM2 } from "@/lib/calcul-rapide/data/cm2/calculs.fixed";
import { calculsTemplatesCM2 } from "@/lib/calcul-rapide/data/cm2/calculs.templates";
import { problemesFixedCM2 } from "@/lib/calcul-rapide/data/cm2/problemes.fixed";
import { problemesTemplatesCM2 } from "@/lib/calcul-rapide/data/cm2/problemes.templates";

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

import { weeklyTerminaleSpe } from "@/lib/calcul-rapide/data/terminale-spe/weekly";
import { calculsFixedTerminaleSpe } from "@/lib/calcul-rapide/data/terminale-spe/calculs.fixed";
import { calculsTemplatesTerminaleSpe } from "@/lib/calcul-rapide/data/terminale-spe/calculs.templates";
import { problemesFixedTerminaleSpe } from "@/lib/calcul-rapide/data/terminale-spe/problemes.fixed";
import { problemesTemplatesTerminaleSpe } from "@/lib/calcul-rapide/data/terminale-spe/problemes.templates";

import { weeklyAdulte } from "@/lib/calcul-rapide/data/adulte/weekly";
import { calculsFixedAdulte } from "@/lib/calcul-rapide/data/adulte/calculs.fixed";
import { calculsTemplatesAdulte } from "@/lib/calcul-rapide/data/adulte/calculs.templates";
import { problemesFixedAdulte } from "@/lib/calcul-rapide/data/adulte/problemes.fixed";
import { problemesTemplatesAdulte } from "@/lib/calcul-rapide/data/adulte/problemes.templates";

type GeneratedCalculRapideItem = CalculRapideItem & {
  displayText: string;
  displayExplanation?: string;
  generatedExpected: string[];
};

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
};

type ReponseCalculRapide = {
  itemId: string;
  type: string;
  text: string;
  userAnswer: string;
  expected: string[];
  isCorrect: boolean;
  status: "answered" | "timeout" | "skipped";
  notionId?: string | null;
  microId?: string | null;
  theme?: string | null;
  difficulty?: number | null;
  durationSec?: number | null;
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
  if (niveau === "CM1") {
    return {
      weeks: weeklyCM1,
      items: [
        ...calculsFixedCM1,
        ...calculsTemplatesCM1,
        ...problemesFixedCM1,
        ...problemesTemplatesCM1,
      ],
    };
  }

  if (niveau === "CM2") {
    return {
      weeks: weeklyCM2,
      items: [
        ...calculsFixedCM2,
        ...calculsTemplatesCM2,
        ...problemesFixedCM2,
        ...problemesTemplatesCM2,
      ],
    };
  }

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

  if (niveau === "terminale-spe") {
    return {
      weeks: weeklyTerminaleSpe,
      items: [
        ...calculsFixedTerminaleSpe,
        ...calculsTemplatesTerminaleSpe,
        ...problemesFixedTerminaleSpe,
        ...problemesTemplatesTerminaleSpe,
      ],
    };
  }

  if (niveau === "adulte") {
    return {
      weeks: weeklyAdulte,
      items: [
        ...calculsFixedAdulte,
        ...calculsTemplatesAdulte,
        ...problemesFixedAdulte,
        ...problemesTemplatesAdulte,
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

  return map[todayRaw] ?? "lundi";
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

function getSessionMeta(niveau: NiveauCalculRapide) {
  const { weeks } = getDataByNiveau(niveau);
  const day = getTodayDay();

  const week = weeks[0];
  const session = week?.sessions.find((session) => session.day === day);

  return {
    weekId: week?.id ?? null,
    week: week?.week ?? null,
    day: session?.day ?? day ?? null,
    sessionId: session?.id ?? null,
    titreSession: session?.title ?? "Défi calcul rapide",
    theme: session?.theme ?? week?.themeDominant ?? null,
    durationTotalSec: session?.durationTotalSec ?? null,
  };
}

function getScoreMessage(score: number, total: number) {
  const ratio = total > 0 ? score / total : 0;

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

function humanizeId(value?: string | null) {
  return value
    ? value.replace(/[_-]/g, " ").replace(/\s+/g, " ").trim()
    : "";
}

function getLearningVideoHref(
  question: GeneratedCalculRapideItem,
  niveau: NiveauCalculRapide
) {
  const notion = humanizeId(question.notionId);
  const micro = humanizeId(question.microId);
  const query = [
    "cours maths",
    niveau,
    notion,
    micro,
    "explication video",
  ]
    .filter(Boolean)
    .join(" ");

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
}

export default function CalculRapideDefiClient() {
  const supabase = createClient();

  const eleveContext = useEleve() as unknown as {
    eleve?: EleveSession | null;
    currentUser?: EleveSession | null;
    user?: EleveSession | null;
  };

  const eleve =
    eleveContext.eleve ?? eleveContext.currentUser ?? eleveContext.user ?? null;

  const searchParams = useSearchParams();
  const niveauParam = searchParams.get("niveau");

  const niveau: NiveauCalculRapide =
    niveauParam === "CM1" ||
    niveauParam === "CM2" ||
    niveauParam === "5e" ||
    niveauParam === "6e" ||
    niveauParam === "4e" ||
    niveauParam === "3e" ||
    niveauParam === "terminale-spe" ||
    niveauParam === "adulte"
      ? niveauParam
      : "6e";

  const questions = useMemo(() => buildSession(niveau), [niveau]);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [lockedCorrection, setLockedCorrection] = useState(false);
  const [correctionTimeLeft, setCorrectionTimeLeft] = useState(0);

  const [answerHistory, setAnswerHistory] = useState<ReponseCalculRapide[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  const currentQuestion = questions[currentIndex] ?? null;

  const [timeLeft, setTimeLeft] = useState(currentQuestion?.durationSec ?? 30);

  const scoreMessage = getScoreMessage(score, questions.length);
  const sessionMeta = getSessionMeta(niveau);

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
    setAnswerHistory([]);
    setSaving(false);
    setSaveMessage(null);
    setHasSaved(false);
  }, [niveau]);

  useEffect(() => {
    setTimeLeft(currentQuestion?.durationSec ?? 30);
    setAnswer("");
    setFeedback(null);
    setShowHint(false);
    setLockedCorrection(false);
    setCorrectionTimeLeft(0);
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (!started || finished || paused || lockedCorrection || feedback !== null) {
      return;
    }

    if (timeLeft <= 0) {
      if (currentQuestion) {
        recordAnswer(currentQuestion, "", false, "timeout");
      }

      goNext();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    started,
    finished,
    paused,
    lockedCorrection,
    feedback,
    timeLeft,
    currentQuestion,
  ]);

  useEffect(() => {
    if (!lockedCorrection || correctionTimeLeft <= 0) return;

    const timer = window.setTimeout(() => {
      setCorrectionTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [lockedCorrection, correctionTimeLeft]);

  function startDefi() {
    setStarted(true);
    setPaused(false);
    setCurrentIndex(0);
    setAnswer("");
    setScore(0);
    setFinished(false);
    setFeedback(null);
    setShowHint(false);
    setLockedCorrection(false);
    setCorrectionTimeLeft(0);
    setAnswerHistory([]);
    setSaving(false);
    setSaveMessage(null);
    setHasSaved(false);
  }

  function restartDefi() {
    startDefi();
  }

  function recordAnswer(
    question: GeneratedCalculRapideItem,
    userAnswer: string,
    isCorrect: boolean,
    status: "answered" | "timeout" | "skipped"
  ) {
    setAnswerHistory((prev) => [
      ...prev,
      {
        itemId: question.id,
        type: String(question.type),
        text: question.displayText,
        userAnswer,
        expected: [...(question.expected ?? []), ...question.generatedExpected],
        isCorrect,
        status,
        notionId: question.notionId ?? null,
        microId: question.microId ?? null,
        difficulty: question.difficulty ?? null,
        durationSec: question.durationSec ?? null,
      },
    ]);
  }

  function goNext() {
    setFeedback(null);
    setShowHint(false);
    setLockedCorrection(false);
    setCorrectionTimeLeft(0);
    setAnswer("");

    if (currentIndex >= questions.length - 1) {
      setFinished(true);
      setStarted(false);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  function validateAndNext() {
    if (!currentQuestion) return;
    if (feedback !== null || lockedCorrection) return;

    const acceptedAnswers = [
      ...(currentQuestion.expected ?? []),
      ...currentQuestion.generatedExpected,
    ];

    const isCorrect = acceptedAnswers.map(normalize).includes(normalize(answer));

    recordAnswer(currentQuestion, answer, isCorrect, "answered");

    if (isCorrect) {
      setScore((value) => value + 1);
    }

    setFeedback(isCorrect);
    setLockedCorrection(true);
    setCorrectionTimeLeft(2);

    window.setTimeout(() => {
      goNext();
    }, 1800);
  }

  function skipQuestion() {
    if (!currentQuestion) return;
    if (lockedCorrection) return;

    recordAnswer(currentQuestion, answer, false, "skipped");
    goNext();
  }

  async function enregistrerResultatCalculRapide() {
    setSaveMessage(null);

    if (!eleve) {
      setSaveMessage("Tu dois être connecté pour enregistrer ton score.");
      return;
    }

    if (!finished) {
      setSaveMessage("Termine d’abord le défi.");
      return;
    }

    if (hasSaved) {
      setSaveMessage("Score déjà enregistré ✅");
      return;
    }

    const codeEtablissement = eleve.code_etablissement?.trim() ?? "";
    const codeUtilisateur =
      eleve.code_eleve?.trim() ?? eleve.code_utilisateur?.trim() ?? "";

    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Impossible d’identifier ton compte élève.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("resultats_calcul_rapide").insert({
      code_etablissement: codeEtablissement,
      code_utilisateur: codeUtilisateur,
      nom: eleve.nom ?? null,

      classe: niveau,
      niveau,
      matiere: "maths",

      session_id: sessionMeta.sessionId,
      titre_session: sessionMeta.titreSession,
      theme: sessionMeta.theme,

      score,
      total: questions.length,

      temps_total_sec: sessionMeta.durationTotalSec,

      details: {
        niveau,
        session: sessionMeta,
        score,
        total: questions.length,
        pourcentage:
          questions.length > 0
            ? Math.round((score / questions.length) * 100)
            : 0,
        answers: answerHistory,
        savedAt: new Date().toISOString(),
      },
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveMessage("Erreur : le score n’a pas été enregistré.");
      return;
    }

    setHasSaved(true);
    setSaveMessage("Score enregistré ✅ Tu peux le retrouver dans ton dashboard.");
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <section className="mx-auto max-w-3xl rounded-3xl bg-white/10 p-6 shadow-xl ring-1 ring-white/10">
          <h1 className="text-3xl font-black">Calcul rapide</h1>

          <p className="mt-4 font-bold text-red-200">
            Aucun défi disponible aujourd’hui pour le niveau {niveau}.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/calcul-rapide"
              className="rounded-full bg-white px-5 py-3 font-black text-slate-950"
            >
              Changer de niveau
            </Link>

            <Link
              href="/accueil"
              className="rounded-full bg-slate-800 px-5 py-3 font-black text-white"
            >
              Retour accueil
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (finished) {
    const pct =
      questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#062A4F] to-slate-950 px-4 py-8 text-white">
        <section className="mx-auto max-w-5xl text-center">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mx-auto mb-4 inline-flex rounded-full bg-emerald-300 px-5 py-2 text-sm font-black text-slate-950">
              Calcul rapide · {niveau}
            </div>

            <h1 className="text-4xl font-black sm:text-6xl">
              Défi terminé 🏁
            </h1>

            <p className="mt-5 text-5xl font-black text-emerald-300 sm:text-7xl">
              {score} / {questions.length}
            </p>

            <p className="mt-2 text-xl font-black text-white/80">
              Réussite : {pct} %
            </p>

            <div className="mx-auto mt-5 max-w-3xl rounded-3xl border border-white/15 bg-slate-900/80 p-4 sm:p-5">
              <h2 className={`text-2xl font-black ${scoreMessage.color}`}>
                {scoreMessage.title}
              </h2>

              <p className="mt-2 text-base font-bold text-white/80">
                {scoreMessage.message}
              </p>
            </div>

            <div className="mx-auto mt-5 max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-4 sm:p-5">
              {eleve ? (
                <>
                  <p className="text-sm font-bold text-white/80 sm:text-base">
                    Connecté : {eleve.nom ?? "Élève"} ·{" "}
                    {eleve.code_etablissement ?? ""} ·{" "}
                    {eleve.code_eleve ?? eleve.code_utilisateur ?? ""}
                  </p>

                  <button
                    type="button"
                    onClick={enregistrerResultatCalculRapide}
                    disabled={saving || hasSaved}
                    className="mt-4 rounded-full bg-emerald-400 px-8 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 sm:text-xl"
                  >
                    {saving
                      ? "Enregistrement..."
                      : hasSaved
                        ? "✅ Score enregistré"
                        : "✅ Enregistrer mon score"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm font-bold text-amber-200 sm:text-base">
                    Tu peux faire le défi librement, mais il faut être connecté
                    pour enregistrer ton score.
                  </p>

                  <Link
                    href="/auth/signin-eleve"
                    className="mt-4 inline-flex rounded-full bg-amber-300 px-8 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-amber-200 sm:text-xl"
                  >
                    Se connecter pour enregistrer
                  </Link>
                </>
              )}

              {saveMessage ? (
                <p className="mt-4 rounded-2xl bg-slate-950/70 px-4 py-3 text-sm font-black text-white">
                  {saveMessage}
                </p>
              ) : null}
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={restartDefi}
                className="rounded-full bg-white px-7 py-4 text-base font-black text-slate-950 shadow-lg hover:bg-slate-100"
              >
                Refaire le défi
              </button>

              <Link
                href="/dashboard-eleve"
                className="rounded-full bg-emerald-500 px-7 py-4 text-base font-black text-white shadow-lg hover:bg-emerald-400"
              >
                Mon dashboard
              </Link>

              <Link
                href="/calcul-rapide"
                className="rounded-full bg-slate-800 px-7 py-4 text-base font-black text-white shadow-lg hover:bg-slate-700"
              >
                Changer de niveau
              </Link>

              <Link
                href="/accueil"
                className="rounded-full bg-white/10 px-7 py-4 text-base font-black text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                Accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!started || !currentQuestion) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#062A4F] to-slate-950 px-4 py-8 text-white">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="inline-flex rounded-full bg-emerald-300 px-5 py-2 text-sm font-black text-slate-950">
              Calcul rapide · {niveau}
            </div>

            <h1 className="mt-5 text-4xl font-black sm:text-6xl">
              Défi du jour ⚡
            </h1>

            <p className="mt-4 max-w-3xl text-lg font-bold text-white/80">
              {questions.length} questions courtes pour travailler les automatismes. Réponds vite,
              mais garde le contrôle.
            </p>

            {eleve ? (
              <div className="mt-5 rounded-3xl border border-emerald-300/30 bg-emerald-300/10 p-4 text-sm font-black text-emerald-100">
                Connecté : {eleve.nom ?? "Élève"} ·{" "}
                {eleve.code_etablissement ?? ""} ·{" "}
                {eleve.code_eleve ?? eleve.code_utilisateur ?? ""}
              </div>
            ) : (
              <div className="mt-5 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-4 text-sm font-black text-amber-100">
                Tu peux jouer sans connexion. Il faudra être connecté pour
                enregistrer ton score.
              </div>
            )}

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                <p className="text-sm font-black text-white/60">Questions</p>
                <p className="mt-2 text-3xl font-black">{questions.length}</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                <p className="text-sm font-black text-white/60">Niveau</p>
                <p className="mt-2 text-3xl font-black">{niveau}</p>
              </div>

              <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
                <p className="text-sm font-black text-white/60">Session</p>
                <p className="mt-2 text-xl font-black">
                  {sessionMeta.titreSession}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startDefi}
                className="rounded-full bg-emerald-400 px-8 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-emerald-300"
              >
                🚀 Commencer
              </button>

              <Link
                href="/calcul-rapide"
                className="rounded-full bg-white px-8 py-4 text-lg font-black text-slate-950 shadow-lg hover:bg-slate-100"
              >
                Changer de niveau
              </Link>

              <Link
                href="/accueil"
                className="rounded-full bg-white/10 px-8 py-4 text-lg font-black text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                Accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const acceptedAnswers = [
    ...(currentQuestion.expected ?? []),
    ...currentQuestion.generatedExpected,
  ];
  const learningVideoHref = getLearningVideoHref(currentQuestion, niveau);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#062A4F] to-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/calcul-rapide"
            className="rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/15 hover:bg-white/15"
          >
            ← Retour
          </Link>

          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
          >
            {paused ? "Reprendre" : "Pause"}
          </button>
        </div>

        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-300">
                Question {currentIndex + 1} / {questions.length}
              </p>

              <h1 className="mt-1 text-2xl font-black sm:text-4xl">
                Calcul rapide · {niveau}
              </h1>
            </div>

            <div className="rounded-3xl bg-slate-950/70 px-5 py-3 text-center ring-1 ring-white/10">
              <p className="text-xs font-black text-white/60">Temps</p>
              <p
                className={[
                  "text-4xl font-black",
                  timeLeft <= 5 ? "text-red-300" : "text-emerald-300",
                ].join(" ")}
              >
                {timeLeft}s
              </p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{
                width: `${
                  questions.length > 0
                    ? ((currentIndex + 1) / questions.length) * 100
                    : 0
                }%`,
              }}
            />
          </div>

          <div className="mt-6 rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
                {currentQuestion.type}
              </span>

              {currentQuestion.difficulty ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                  {"⭐".repeat(currentQuestion.difficulty)}
                </span>
              ) : null}
            </div>

            <p className="whitespace-pre-line text-2xl font-black leading-relaxed sm:text-4xl">
              {currentQuestion.displayText}
            </p>

            <div className="mt-5 rounded-3xl border border-sky-100 bg-sky-50 p-4 text-slate-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-sky-900">
                    Tu ne comprends pas la notion ?
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-700">
                    Regarde une video d'explication avant de repondre, puis
                    reviens au defi.
                  </p>
                </div>

                <a
                  href={learningVideoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setPaused(true)}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-500"
                >
                  Regarder la video
                </a>
              </div>
            </div>

            <div className="mt-6">
              <input
                value={answer}
                disabled={paused || lockedCorrection}
                onChange={(event) => setAnswer(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    validateAndNext();
                  }
                }}
                placeholder="Ta réponse..."
                className="w-full rounded-3xl border-2 border-slate-200 bg-slate-50 px-5 py-4 text-2xl font-black outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                autoFocus
              />
            </div>

            {showHint && currentQuestion.hint ? (
              <div className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-900 ring-1 ring-amber-100">
                💡 Indice : {currentQuestion.hint}
              </div>
            ) : null}

            {feedback !== null ? (
              <div
                className={[
                  "mt-4 rounded-2xl p-4 text-sm font-black",
                  feedback
                    ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100"
                    : "bg-red-50 text-red-800 ring-1 ring-red-100",
                ].join(" ")}
              >
                {feedback ? "✅ Bonne réponse" : "❌ Réponse à corriger"}

                {!feedback ? (
                  <div className="mt-2 font-bold text-slate-700">
                    Réponse attendue : {acceptedAnswers.join(" ou ")}
                  </div>
                ) : null}

                {currentQuestion.displayExplanation ? (
                  <div className="mt-2 font-semibold text-slate-700">
                    {currentQuestion.displayExplanation}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/15">
              Score : {score} / {questions.length}
            </div>

            <div className="flex flex-wrap gap-3">
              {currentQuestion.hint ? (
                <button
                  type="button"
                  onClick={() => setShowHint((value) => !value)}
                  disabled={paused || lockedCorrection}
                  className="rounded-full bg-amber-300 px-5 py-3 text-sm font-black text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  💡 Indice
                </button>
              ) : null}

              <button
                type="button"
                onClick={skipQuestion}
                disabled={paused || lockedCorrection}
                className="rounded-full bg-white/10 px-5 py-3 text-sm font-black text-white ring-1 ring-white/15 hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Passer
              </button>

              <button
                type="button"
                onClick={validateAndNext}
                disabled={paused || lockedCorrection}
                className="rounded-full bg-emerald-400 px-7 py-3 text-sm font-black text-slate-950 shadow-lg hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Valider
              </button>
            </div>
          </div>

          {lockedCorrection ? (
            <p className="mt-4 text-center text-sm font-bold text-white/70">
              Correction affichée... question suivante dans {correctionTimeLeft || 1}s.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
}
