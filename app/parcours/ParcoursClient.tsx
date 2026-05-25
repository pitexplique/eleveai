"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { CanvasRenderer } from "@/lib/canvas";

import type {
  ParcoursAnswer,
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursNotionScore,
} from "@/lib/parcours/types";

import { getClasseNotions } from "@/lib/parcours/getClasseNotions";
import { getDefiQuestionForNotion } from "@/lib/parcours/getDefiQuestionForNotion";
import {
  getStatusLabel,
  isCorrectAnswer,
  scoreParcours,
} from "@/lib/parcours/scoreParcours";

const classes: ParcoursClasse[] = ["cm1","cm2","6e", "5e", "4e", "3e", "terminale-spe"];

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
  <main className="relative min-h-screen overflow-hidden bg-[#F0FDF4] px-4 py-8 text-slate-950">
    {/* FOND LUMINEUX */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full opacity-95"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="g1" cx="18%" cy="18%" r="60%">
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="1" />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="g2" cx="82%" cy="15%" r="55%">
            <stop offset="0%" stopColor="#7DD3FC" stopOpacity="1" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="g3" cx="50%" cy="88%" r="55%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
            <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="wave" x1="0" x2="1">
            <stop offset="0%" stopColor="#F0FDF4" />
            <stop offset="50%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#FEFCE8" />
          </linearGradient>
        </defs>

        <rect width="1440" height="900" fill="url(#wave)" />
        <rect width="1440" height="900" fill="url(#centerGlow)" />
        <rect width="1440" height="900" fill="url(#g1)" />
        <rect width="1440" height="900" fill="url(#g2)" />
        <rect width="1440" height="900" fill="url(#g3)" />

        <circle cx="180" cy="170" r="60" fill="#34D399" opacity="0.35" />
        <circle cx="1240" cy="180" r="80" fill="#38BDF8" opacity="0.35" />
        <circle cx="1120" cy="720" r="70" fill="#FACC15" opacity="0.35" />
        <circle cx="260" cy="720" r="85" fill="#A78BFA" opacity="0.25" />

        <path
          d="M0 700 C220 620 340 760 560 690 C780 620 930 720 1140 660 C1280 620 1370 640 1440 610 V900 H0 Z"
          fill="#FFFFFF"
          opacity="0.75"
        />

        <text x="150" y="485" fontSize="54" opacity="0.2">
          ⭐
        </text>
        <text x="1180" y="520" fontSize="64" opacity="0.2">
          🏆
        </text>
        <text x="720" y="765" fontSize="58" opacity="0.2">
          🚀
        </text>
        <text x="1030" y="355" fontSize="52" opacity="0.16">
          🧭
        </text>
        <text x="340" y="620" fontSize="52" opacity="0.16">
          🗺️
        </text>
      </svg>
    </div>

    <section className="relative z-10 mx-auto max-w-5xl">
      <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
          <span>🚀</span>
          <span>EleveAI · Parcours</span>
        </div>

        <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">
          Ton voyage mathématique
        </h1>

        <p className="mt-3 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
          Choisis ta classe. EleveAI te propose un défi ⭐⭐⭐ par notion,
          puis affiche une carte claire de tes forces : 🟢 maîtrisé, 🟡 à revoir,
          🔴 fragile.
        </p>

        <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-100 via-sky-100 to-yellow-100 p-4 ring-1 ring-white/80">
          <p className="text-sm font-black text-slate-800">
            🎯 Objectif : savoir exactement quelles notions tu maîtrises et lesquelles retravailler.
          </p>
        </div>

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
                "rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5",
                classe === c
                  ? "bg-slate-950 text-white ring-4 ring-yellow-300"
                  : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50",
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
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            🚀 Démarrer le parcours
          </button>

          <Link
            href="/accueil"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            Retour accueil
          </Link>
        </div>
      </div>

      {!started && (
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="mb-3 text-2xl font-black text-slate-950">
            🗺️ Notions prévues en {classe}
          </h2>

          <p className="mb-5 text-sm font-semibold text-slate-600">
            Chaque carte correspondra à un défi dans ton parcours.
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {notions.map((notion, index) => (
              <div
                key={notion.id}
                className="rounded-3xl border border-white bg-gradient-to-br from-white to-emerald-50 p-4 shadow-md ring-1 ring-emerald-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-black text-emerald-800">
                    {index + 1}
                  </div>

                  <div>
                    <div className="font-black text-slate-950">
                      {notion.label}
                    </div>
                    <div className="mt-1 text-xs font-bold text-slate-500">
                      {notion.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {started && questions.length === 0 && (
        <div className="rounded-[2rem] border border-red-200 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
          <h2 className="text-xl font-black text-red-700">
            Aucun défi trouvé
          </h2>
          <p className="mt-2 text-sm font-semibold text-red-700">
            Il faut au moins une question de difficulté 3 dans les
            question-banks pour cette classe.
          </p>
        </div>
      )}

      {started && questions.length > 0 && (
        <div className="space-y-5">
          {submitted && (
            <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="text-3xl font-black text-slate-950">
                🏆 Bilan du parcours
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-600">
                Voici ta carte de progression. Les notions fragiles peuvent être retravaillées directement.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {scores.map((score) => (
                  <div
                    key={score.notionId}
                    className="rounded-3xl border border-white bg-gradient-to-br from-white to-sky-50 p-4 shadow-md ring-1 ring-sky-100"
                  >
                    <div className="font-black text-slate-950">
                      {score.notionLabel}
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-600">
                      Score : {score.score} / {score.maxScore}
                    </div>

                    <div className="mt-2 text-lg font-black">
                      {getStatusLabel(score.status)}
                    </div>

                    {score.status !== "maitrise" && (
                      <Link
                        href={`/tutor-v4?classe=${classe}&matiere=maths&notion=${score.notionId}`}
                        className="mt-3 inline-block rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white hover:bg-slate-800"
                      >
                        Retravailler cette notion
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {questions.map((q, index) => {
            const userAnswer = answers[q.notionId] ?? "";
            const expected = q.question.expected ?? [];
            const correct = isCorrectAnswer(userAnswer, expected);

            return (
              <article
                key={`${q.notionId}-${index}`}
                className="rounded-[2rem] border border-white bg-white/90 p-5 text-slate-950 shadow-xl ring-1 ring-white/80 backdrop-blur"
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                      Étape {index + 1} / {questions.length}
                    </p>
                    <h2 className="text-2xl font-black">{q.notionLabel}</h2>
                  </div>

                  <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200">
                    ⭐⭐⭐ défi
                  </span>
                </div>

                <p className="whitespace-pre-line text-base font-semibold leading-relaxed">
                  {q.question.text}
                </p>

                {q.question.canvas ? (
                  <div className="mt-4 overflow-x-auto rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-100">
                    <CanvasRenderer figure={q.question.canvas} />
                  </div>
                ) : null}

                {q.question.format === "qcm" && q.question.choices ? (
                  <div className="mt-4 grid gap-2">
                    {q.question.choices.map((choice) => (
                      <button
                        key={choice}
                        type="button"
                        disabled={submitted}
                        onClick={() => handleAnswer(q.notionId, choice)}
                        className={[
                          "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                          answers[q.notionId] === choice
                            ? "border-emerald-500 bg-emerald-100 text-emerald-900"
                            : "border-slate-200 bg-white hover:bg-emerald-50",
                          submitted ? "cursor-not-allowed opacity-80" : "",
                        ].join(" ")}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                ) : (
                  <input
                    value={answers[q.notionId] ?? ""}
                    disabled={submitted}
                    onChange={(e) => handleAnswer(q.notionId, e.target.value)}
                    placeholder="Ta réponse..."
                    className="mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />
                )}

                {submitted ? (
                  <div
                    className={[
                      "mt-4 rounded-2xl border p-4",
                      correct
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-red-200 bg-red-50",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "text-sm font-black",
                        correct ? "text-emerald-700" : "text-red-700",
                      ].join(" ")}
                    >
                      {correct ? "✅ Bonne réponse" : "❌ Réponse à corriger"}
                    </p>

                    <p className="mt-2 text-sm font-bold text-slate-700">
                      Ta réponse : {userAnswer || "Aucune réponse"}
                    </p>

                    <p className="mt-1 text-sm font-bold text-emerald-700">
                      Bonne réponse :{" "}
                      {expected.length > 0
                        ? expected.join(" ou ")
                        : "Non disponible"}
                    </p>

                    {q.question.explanation ? (
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                        {q.question.explanation}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}

          {!submitted ? (
            <div className="sticky bottom-4 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-4 text-base font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
              >
                🏁 Voir ma carte de progression
              </button>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={startParcours}
                className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
              >
                Refaire un parcours
              </button>

              <button
                type="button"
                onClick={resetParcours}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Changer de classe
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  </main>
);
}