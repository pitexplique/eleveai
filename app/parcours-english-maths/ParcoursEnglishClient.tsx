"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";

import type { ParcoursNiveauEnglish, ParcoursQuestion, ParcoursAnswer, ParcoursNotionScore } from "@/lib/parcours/types";
import { getDefiQuestionsForEnglish } from "@/lib/parcours/getDefiQuestionForEnglish";
import { isCorrectAnswer, scoreParcours } from "@/lib/parcours/scoreParcours";
import {
  useClassBoard,
  ClassBoardToggle,
  classText,
} from "@/components/parcours/ClassBoard";
import BoutonSignalerQuestion from "@/components/signalement/BoutonSignalerQuestion";

const NIVEAUX: ParcoursNiveauEnglish[] = ["a1", "a2", "b1", "b2"];

const niveauLabels: Record<ParcoursNiveauEnglish, string> = {
  a1: "A1", a2: "A2", b1: "B1", b2: "B2",
};

const niveauColors: Record<ParcoursNiveauEnglish, { active: string; inactive: string }> = {
  a1: { active: "border-lime-500 bg-lime-500 text-white",    inactive: "border-slate-200 bg-white text-lime-600 hover:bg-lime-50" },
  a2: { active: "border-sky-500 bg-sky-500 text-white",      inactive: "border-slate-200 bg-white text-sky-600 hover:bg-sky-50" },
  b1: { active: "border-violet-500 bg-violet-500 text-white", inactive: "border-slate-200 bg-white text-violet-600 hover:bg-violet-50" },
  b2: { active: "border-rose-500 bg-rose-500 text-white",    inactive: "border-slate-200 bg-white text-rose-600 hover:bg-rose-50" },
};

const questionCountOptions = [
  { value: 5,  label: "Sprint",        emoji: "⚡", description: "5 questions" },
  { value: 10, label: "Course",        emoji: "🏃", description: "10 questions" },
  { value: 15, label: "Challenge",     emoji: "🔥", description: "15 questions" },
  { value: 20, label: "Grand parcours", emoji: "🏆", description: "20 questions" },
] as const;

type QuestionCount = (typeof questionCountOptions)[number]["value"];

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  token?: string | null;
};

function getStatusStyle(status: string) {
  switch (status) {
    case "maitrise": return "bg-green-100 text-green-800";
    case "fragile":  return "bg-yellow-100 text-yellow-800";
    default:         return "bg-red-100 text-red-800";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "maitrise": return "✅ Mastered";
    case "fragile":  return "⚠️ Fragile";
    default:         return "❌ To review";
  }
}

export default function ParcoursEnglishClient() {
  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;
  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur = eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "";

  const bilanRef = useRef<HTMLDivElement>(null);
  const { classBoard, toggleClassBoard } = useClassBoard();

  const [niveau, setNiveau] = useState<ParcoursNiveauEnglish>("a1");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ParcoursQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const scores = useMemo<ParcoursNotionScore[]>(() => {
    if (!submitted) return [];

    const parcoursAnswers: ParcoursAnswer[] = questions.map((q) => {
      const userAnswer = answers[q.notionId] ?? "";
      const expected = q.question.expected ?? [];
      return { notionId: q.notionId, userAnswer, expected, isCorrect: isCorrectAnswer(userAnswer, expected) };
    });

    return questions.map((q) =>
      scoreParcours({ notionId: q.notionId, notionLabel: q.notionLabel, answers: parcoursAnswers })
    );
  }, [answers, questions, submitted]);

  const totalScore = useMemo(() => scores.reduce((s, n) => s + n.score, 0), [scores]);
  const totalMaxScore = useMemo(() => scores.reduce((s, n) => s + n.maxScore, 0), [scores]);
  const pourcentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  function startParcours() {
    const qs = getDefiQuestionsForEnglish(niveau, questionCount);
    setQuestions(qs);
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    setSaveMessage(null);
  }

  function resetParcours() {
    setStarted(false);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    setSaveMessage(null);
  }

  async function enregistrerScore() {
    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Tu dois être connecté pour enregistrer.");
      return;
    }
    setSaving(true);
    // Insert via /api/resultats : identité prise dans le jeton de session.
    // "pourcentage" est une colonne générée côté base : on ne l'insère pas.
    const { error } = await saveResultat(eleve, "parcours_english", {
      niveau,
      score: totalScore,
      total: totalMaxScore,
      details: {
        questions: questions.map((q) => ({
          notionId: q.notionId,
          notionLabel: q.notionLabel,
          answer: answers[q.notionId] ?? "",
          expected: q.question.expected,
          isCorrect: isCorrectAnswer(answers[q.notionId] ?? "", q.question.expected),
        })),
        savedAt: new Date().toISOString(),
      },
    });
    setSaving(false);
    setSaveMessage(error ? "Erreur lors de l'enregistrement." : "Score enregistré ✅");
  }

  // ─── Écran de départ ───
  if (!started) {
    return (
      <main className="min-h-screen bg-[#f0f4ff] px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link href="/accueil" className="text-sm font-bold text-slate-500 hover:text-slate-800">
              ← Accueil
            </Link>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400">Parcours</p>
            <h1 className="text-3xl font-black text-sky-600 sm:text-4xl">English Maths</h1>
            <p className="mt-2 text-slate-500 font-medium">
              Diagnostique ton vocabulaire mathématique en anglais.
            </p>

            <div className="mt-8">
              <p className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">
                Choose your level
              </p>
              <div className="flex flex-wrap gap-3">
                {NIVEAUX.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNiveau(n)}
                    className={[
                      "rounded-2xl border px-5 py-3 text-sm font-black transition",
                      niveau === n ? niveauColors[n].active : niveauColors[n].inactive,
                    ].join(" ")}
                  >
                    {niveauLabels[n]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-black uppercase tracking-wider text-slate-500">
                Nombre de questions
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {questionCountOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQuestionCount(opt.value)}
                    className={[
                      "rounded-2xl border p-3 text-center transition",
                      questionCount === opt.value
                        ? "border-sky-500 bg-sky-50 text-sky-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="text-xl">{opt.emoji}</div>
                    <div className="mt-0.5 text-sm font-black">{opt.label}</div>
                    <div className="text-xs text-slate-400">{opt.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={startParcours}
              className="mt-8 w-full rounded-2xl bg-sky-600 px-6 py-4 text-base font-black text-white shadow-lg hover:bg-sky-500 transition"
            >
              Start — {niveauLabels[niveau]} · {questionCount} questions →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Exercice ───
  if (!submitted) {
    return (
      <main className="min-h-screen bg-[#f0f4ff] px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <button type="button" onClick={resetParcours} className="text-sm font-bold text-slate-500 hover:text-slate-800">
              ← Retour
            </button>
            <div className="flex flex-wrap items-center gap-2">
              <ClassBoardToggle classBoard={classBoard} onToggle={toggleClassBoard} />
              <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-700">
                {niveauLabels[niveau]} · {questions.length} questions
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, index) => {
              const isAnswered = Boolean(answers[q.notionId]);
              const choices = q.question.choices ?? [];

              return (
                <article
                  key={q.notionId}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                      {index + 1} / {questions.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">{q.notionLabel}</span>
                      {/* Ne s'affiche que pour un bêta testeur accepté. */}
                      <BoutonSignalerQuestion
                        page="/parcours-english-maths"
                        question={q.question.text}
                        notion={q.notionId}
                      />
                    </div>
                  </div>

                  <p className={`mb-4 font-bold text-slate-800 ${classText.question(classBoard)}`}>{q.question.text}</p>

                  {q.question.audioSrc ? (
                    <div className="mb-4 rounded-2xl border border-sky-200 bg-sky-50 p-3">
                      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-sky-600">
                        🔊 Listen
                      </p>
                      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                      <audio
                        key={q.question.audioSrc}
                        controls
                        src={q.question.audioSrc}
                        className="w-full rounded-xl"
                      />
                    </div>
                  ) : null}

                  {choices.length > 0 ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {choices.map((choice) => {
                        const selected = answers[q.notionId] === choice;
                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setAnswers((prev) => ({ ...prev, [q.notionId]: choice }))}
                            className={[
                              "rounded-2xl border px-4 py-3 text-left font-bold transition",
                              classText.choice(classBoard),
                              selected
                                ? "border-sky-500 bg-sky-100 text-sky-950"
                                : "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100",
                            ].join(" ")}
                          >
                            {choice}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="Your answer…"
                      value={answers[q.notionId] ?? ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.notionId]: e.target.value }))}
                      className={`w-full rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-800 focus:border-sky-400 focus:outline-none ${classText.input(classBoard)}`}
                    />
                  )}

                  {isAnswered && (
                    <p className="mt-2 text-xs font-bold text-slate-400">Answer recorded.</p>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < questions.length}
              className="rounded-2xl bg-sky-600 px-8 py-4 text-base font-black text-white shadow-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 transition"
            >
              See my results →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ─── Bilan ───
  return (
    <main className="min-h-screen bg-[#f0f4ff] px-4 py-6" ref={bilanRef}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 text-center">
          <p className="text-4xl font-black text-sky-600">{pourcentage}%</p>
          <p className="mt-1 text-lg font-bold text-slate-700">
            {totalScore} / {totalMaxScore} correct
          </p>
          <p className="mt-1 text-sm text-slate-400 font-medium">Level {niveauLabels[niveau]}</p>
        </div>

        <div className="space-y-3 mb-6">
          {scores.map((s) => (
            <div
              key={s.notionId}
              className="flex items-center justify-between rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200"
            >
              <span className="text-sm font-bold text-slate-800">{s.notionLabel}</span>
              <span className={["rounded-full px-3 py-1 text-xs font-black", getStatusStyle(s.status)].join(" ")}>
                {getStatusLabel(s.status)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {eleve && (
            <button
              type="button"
              onClick={enregistrerScore}
              disabled={saving}
              className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white hover:bg-sky-500 disabled:opacity-60 transition"
            >
              {saving ? "Saving…" : "✅ Save my score"}
            </button>
          )}
          <button
            type="button"
            onClick={resetParcours}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 transition"
          >
            New parcours
          </button>
          <Link
            href={`/coach-ia/english-maths?niveau=${niveau}`}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 transition"
          >
            Train with Coach →
          </Link>
        </div>

        {saveMessage && (
          <p className={[
            "rounded-2xl px-4 py-3 text-sm font-black text-center",
            saveMessage.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          ].join(" ")}>
            {saveMessage}
          </p>
        )}
      </div>
    </main>
  );
}
