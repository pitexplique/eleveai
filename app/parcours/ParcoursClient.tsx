"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type {
  ParcoursAnswer,
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursNotionScore,
} from "@/lib/tutor-v4/parcours/types";

import { getClasseNotions } from "@/lib/tutor-v4/parcours/getClasseNotions";
import { getDefiQuestionForNotion } from "@/lib/tutor-v4/parcours/getDefiQuestionForNotion";
import {
  getStatusLabel,
  isCorrectAnswer,
  scoreParcours,
} from "@/lib/tutor-v4/parcours/scoreParcours";

const classes: ParcoursClasse[] = ["6e", "5e", "4e", "3e"];

export default function ParcoursClient() {
  const [classe, setClasse] = useState<ParcoursClasse>("6e");
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ParcoursQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const notions = useMemo(() => getClasseNotions(classe), [classe]);

  const scores = useMemo<ParcoursNotionScore[]>(() => {
    if (!submitted) return [];

    const parcoursAnswers: ParcoursAnswer[] = questions.map((q) => {
      const userAnswer = answers[q.notionId] ?? "";
      const expected = q.question.expected ?? [];

      return {
        notionId: q.notionId,
        userAnswer,
        expected,
        isCorrect: isCorrectAnswer(userAnswer, expected),
      };
    });

    return questions.map((q) =>
      scoreParcours({
        notionId: q.notionId,
        notionLabel: q.notionLabel,
        answers: parcoursAnswers,
      })
    );
  }, [answers, questions, submitted]);

  function startParcours() {
    const generatedQuestions = notions
      .map((notion) =>
        getDefiQuestionForNotion({
          classe,
          notionId: notion.id,
        })
      )
      .filter((q): q is ParcoursQuestion => q !== null);

    setQuestions(generatedQuestions);
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
  }

  function resetParcours() {
    setStarted(false);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
  }

  function handleAnswer(notionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [notionId]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-3xl border border-violet-500/30 bg-slate-900/80 p-6 shadow-2xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-wide text-violet-300">
            EleveAI · Parcours
          </p>

          <h1 className="text-3xl font-black md:text-4xl">
            Diagnostic rapide par notions
          </h1>

          <p className="mt-3 max-w-3xl text-sm text-slate-300 md:text-base">
            Choisis ta classe. EleveAI propose un défi niveau ⭐⭐⭐ par notion,
            puis affiche un bilan clair : 🟢 maîtrisé, 🟡 à revoir, 🔴 fragile.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {classes.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setClasse(c);
                  resetParcours();
                }}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-black transition",
                  classe === c
                    ? "bg-violet-400 text-slate-950"
                    : "bg-slate-800 text-white hover:bg-slate-700",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startParcours}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300"
            >
              Démarrer le parcours
            </button>

            <Link
              href="/accueil"
              className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-black text-white hover:bg-slate-700"
            >
              Retour accueil
            </Link>
          </div>
        </div>

        {!started && (
          <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6">
            <h2 className="mb-3 text-xl font-black">
              Notions prévues en {classe}
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              {notions.map((notion) => (
                <div
                  key={notion.id}
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-4"
                >
                  <div className="font-black text-white">{notion.label}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {notion.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {started && questions.length === 0 && (
          <div className="rounded-3xl border border-red-500/40 bg-red-950/40 p-6">
            <h2 className="text-xl font-black text-red-200">
              Aucun défi trouvé
            </h2>
            <p className="mt-2 text-sm text-red-100">
              Il faut au moins une question de difficulté 3 dans les
              question-banks pour cette classe.
            </p>
          </div>
        )}

        {started && questions.length > 0 && !submitted && (
          <div className="space-y-4">
            {questions.map((q, index) => (
              <article
                key={`${q.notionId}-${index}`}
                className="rounded-3xl border border-slate-700 bg-white p-5 text-slate-950 shadow-xl"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-violet-700">
                      Notion {index + 1} / {questions.length}
                    </p>
                    <h2 className="text-xl font-black">{q.notionLabel}</h2>
                  </div>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                    ⭐⭐⭐
                  </span>
                </div>

                <p className="whitespace-pre-line text-base font-semibold">
                  {q.question.text}
                </p>

                {q.question.format === "qcm" && q.question.choices ? (
                  <div className="mt-4 grid gap-2">
                    {q.question.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        onClick={() => handleAnswer(q.notionId, choice)}
                        className={[
                          "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                          answers[q.notionId] === choice
                            ? "border-violet-500 bg-violet-100 text-violet-900"
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100",
                        ].join(" ")}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    value={answers[q.notionId] ?? ""}
                    onChange={(e) =>
                      handleAnswer(q.notionId, e.target.value)
                    }
                    placeholder="Ta réponse..."
                    className="mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                  />
                )}
              </article>
            ))}

            <div className="sticky bottom-4 rounded-3xl border border-violet-400/40 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full rounded-2xl bg-violet-400 px-5 py-4 text-base font-black text-slate-950 hover:bg-violet-300"
              >
                Voir mon bilan
              </button>
            </div>
          </div>
        )}

        {submitted && (
          <div className="rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-2xl font-black">Bilan du parcours</h2>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {scores.map((score) => (
                <div
                  key={score.notionId}
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-4"
                >
                  <div className="font-black">{score.notionLabel}</div>
                  <div className="mt-1 text-sm text-slate-300">
                    Score : {score.score} / {score.maxScore}
                  </div>
                  <div className="mt-2 text-lg font-black">
                    {getStatusLabel(score.status)}
                  </div>

                  {score.status !== "maitrise" && (
                    <Link
                      href={`/tutor-v4?classe=${classe}&matiere=maths&notion=${score.notionId}`}
                      className="mt-3 inline-block rounded-xl bg-slate-700 px-3 py-2 text-xs font-black text-white hover:bg-slate-600"
                    >
                      Retravailler cette notion
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startParcours}
                className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300"
              >
                Refaire un parcours
              </button>

              <button
                type="button"
                onClick={resetParcours}
                className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-black text-white hover:bg-slate-700"
              >
                Changer de classe
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}