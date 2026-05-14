// app/concours-general/ConcoursGeneralClient.tsx

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { concoursGeneralSemaine01 } from "@/lib/concours-general/weeks/semaine-01";
import { getConcoursGeneralItemsByIds } from "@/lib/concours-general";
import type {
  ConcoursGeneralAnswer,
  ConcoursGeneralItem,
  ConcoursGeneralNiveau,
} from "@/lib/concours-general/types";

const niveaux: ConcoursGeneralNiveau[] = ["6e", "5e", "4e", "3e"];

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(",", ".")
    .replace(/\s+/g, " ");
}

function isAnswerCorrect(item: ConcoursGeneralItem, answer: string) {
  const normalizedAnswer = normalize(answer);

  if (!item.expected || item.expected.length === 0) {
    return false;
  }

  if (item.format === "open" || item.format === "multi_step") {
    return item.expected.some((expected) =>
      normalizedAnswer.includes(normalize(expected))
    );
  }

  return item.expected.some(
    (expected) => normalize(expected) === normalizedAnswer
  );
}

function stars(count: 3 | 4 | 5) {
  return "⭐".repeat(count);
}

function accessibleLabel(niveau: ConcoursGeneralNiveau) {
  return `Accessible dès la ${niveau}`;
}

function ConcoursBackgroundSvg() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-90">
      <svg
        className="h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="mathLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="180" fill="url(#goldGlow)" />
        <circle cx="1080" cy="180" r="220" fill="url(#goldGlow)" />
        <circle cx="940" cy="760" r="260" fill="#7c3aed" opacity="0.12" />
        <circle cx="160" cy="720" r="220" fill="#22c55e" opacity="0.10" />

        <path
          d="M-50,610 C180,420 300,760 520,560 C720,380 850,620 1250,360"
          fill="none"
          stroke="url(#mathLine)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.55"
        />

        <path
          d="M-30,250 C180,120 310,360 510,220 C720,70 880,250 1230,120"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.22"
        />

        <g transform="translate(940 85)" opacity="0.18">
          <path
            d="M55 20 H145 V70 C145 105 122 130 100 138 C78 130 55 105 55 70 Z"
            fill="#fbbf24"
          />
          <path
            d="M55 35 H25 C25 70 42 88 60 92"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M145 35 H175 C175 70 158 88 140 92"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <rect x="85" y="138" width="30" height="45" rx="8" fill="#fbbf24" />
          <rect x="60" y="180" width="80" height="18" rx="8" fill="#fbbf24" />
        </g>

        <text
          x="70"
          y="190"
          fill="#fbbf24"
          opacity="0.18"
          fontSize="72"
          fontWeight="900"
        >
          π
        </text>

        <text
          x="1010"
          y="690"
          fill="#fbbf24"
          opacity="0.16"
          fontSize="64"
          fontWeight="900"
        >
          x²
        </text>

        <text
          x="170"
          y="820"
          fill="#38bdf8"
          opacity="0.14"
          fontSize="58"
          fontWeight="900"
        >
          ∑
        </text>

        <polygon
          points="230,150 280,240 180,240"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3"
          opacity="0.22"
        />

        <rect
          x="760"
          y="640"
          width="90"
          height="90"
          rx="20"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          opacity="0.18"
          transform="rotate(14 805 685)"
        />

        <circle
          cx="370"
          cy="650"
          r="55"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          opacity="0.18"
        />

        {[
          [180, 360],
          [330, 100],
          [690, 160],
          [1070, 390],
          [580, 780],
          [880, 500],
        ].map(([x, y], index) => (
          <g key={index} transform={`translate(${x} ${y})`} opacity="0.28">
            <path
              d="M0 -18 L5 -5 L18 0 L5 5 L0 18 L-5 5 L-18 0 L-5 -5 Z"
              fill="#fbbf24"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ConcoursGeneralClient() {
  const week = concoursGeneralSemaine01;

  const [selectedNiveau, setSelectedNiveau] =
    useState<ConcoursGeneralNiveau>("6e");

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ConcoursGeneralItem[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [visibleHints, setVisibleHints] = useState<Record<string, number>>({});

  const allItems = useMemo(() => {
    return week.blocks.flatMap((block) =>
      getConcoursGeneralItemsByIds(block.itemIds)
    );
  }, [week.blocks]);

  const visibleItemsForLevel = useMemo(() => {
    const order: Record<ConcoursGeneralNiveau, number> = {
      "6e": 1,
      "5e": 2,
      "4e": 3,
      "3e": 4,
    };

    return allItems.filter((item) => {
      return order[item.accessibleFrom] <= order[selectedNiveau];
    });
  }, [allItems, selectedNiveau]);

  const results: ConcoursGeneralAnswer[] = useMemo(() => {
    if (!submitted) return [];

    return questions.map((item) => {
      const answer = answers[item.id] ?? "";
      const correct = isAnswerCorrect(item, answer);

      return {
        itemId: item.id,
        answer,
        isCorrect: correct,
        score: correct ? 1 : 0,
      };
    });
  }, [answers, questions, submitted]);

  const score = results.reduce((sum, result) => sum + result.score, 0);
  const maxScore = questions.length;

  function startConcours() {
    setQuestions(visibleItemsForLevel);
    setAnswers({});
    setVisibleHints({});
    setSubmitted(false);
    setStarted(true);
  }

  function resetConcours() {
    setStarted(false);
    setQuestions([]);
    setAnswers({});
    setVisibleHints({});
    setSubmitted(false);
  }

  function handleAnswer(itemId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  }

  function showNextHint(itemId: string) {
    setVisibleHints((prev) => ({
      ...prev,
      [itemId]: Math.min((prev[itemId] ?? 0) + 1, 3),
    }));
  }

  function getResultForItem(itemId: string) {
    return results.find((result) => result.itemId === itemId);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 px-4 py-8 text-white">
      <ConcoursBackgroundSvg />

      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-amber-950/40 p-6 shadow-2xl backdrop-blur-sm">
          <p className="mb-2 text-sm font-black uppercase tracking-wide text-amber-300">
            EleveAI · Préparation Concours général des collèges
          </p>

          <h1 className="text-3xl font-black md:text-5xl">
            Des maths pas comme les autres
          </h1>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-300 md:text-base">
            20 défis par semaine pour apprendre à chercher, visualiser,
            raisonner, tester et expliquer. Les questions sont inspirées de
            l’esprit des grands concours internationaux : Singapour,
            Royaume-Uni, Australie et olympiades junior. Niveau cible : 3e,
            accessible progressivement aux élèves curieux dès la 6e.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-black text-amber-200">
              🇸🇬 Singapour · Ingéniosité
            </span>

            <span className="rounded-full border border-sky-300/40 bg-sky-300/10 px-3 py-1 text-xs font-black text-sky-200">
              🇬🇧 UKMT · QCM intelligents
            </span>

            <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">
              🇦🇺 Australie · Progression
            </span>

            <span className="rounded-full border border-violet-300/40 bg-violet-300/10 px-3 py-1 text-xs font-black text-violet-200">
              🧠 Olympiades junior · Raisonnement
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {niveaux.map((niveau) => (
              <button
                key={niveau}
                type="button"
                onClick={() => {
                  setSelectedNiveau(niveau);
                  resetConcours();
                }}
                className={[
                  "rounded-2xl px-5 py-3 text-sm font-black transition",
                  selectedNiveau === niveau
                    ? "bg-amber-300 text-slate-950"
                    : "bg-slate-800 text-white hover:bg-slate-700",
                ].join(" ")}
              >
                {niveau}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startConcours}
              className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300"
            >
              Démarrer l’entraînement
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
          <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm">
            <h2 className="mb-3 text-xl font-black">
              Défis disponibles pour {selectedNiveau}
            </h2>

            <p className="mb-5 text-sm text-slate-300">
              Les défis sont classés par blocs. Certains sont accessibles dès la
              6e, d’autres demandent plutôt un niveau 4e ou 3e.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {visibleItemsForLevel.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-700 bg-slate-800/90 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-black text-white">{item.title}</div>
                      <div className="mt-1 text-xs font-bold text-slate-400">
                        {item.theme.replaceAll("_", " ")}
                      </div>
                    </div>

                    <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">
                      {stars(item.difficulty)}
                    </span>
                  </div>

                  <div className="mt-3 text-xs font-bold text-amber-200">
                    {accessibleLabel(item.accessibleFrom)}
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
              Il faut ajouter des questions dans la bank Concours général.
            </p>
          </div>
        )}

        {started && questions.length > 0 && (
          <div className="space-y-4">
            {submitted && (
              <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-sm">
                <h2 className="text-2xl font-black">
                  Bilan de l’entraînement
                </h2>

                <p className="mt-3 text-lg font-black text-emerald-300">
                  Score : {score} / {maxScore}
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  L’objectif n’est pas seulement d’avoir juste : c’est
                  d’apprendre à chercher, visualiser et expliquer.
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {questions.map((item, index) => {
                    const result = getResultForItem(item.id);

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-700 bg-slate-800/90 p-4"
                      >
                        <div className="text-xs font-black uppercase tracking-wide text-amber-300">
                          Défi {index + 1}
                        </div>

                        <div className="mt-1 font-black">{item.title}</div>

                        <div
                          className={[
                            "mt-2 text-sm font-black",
                            result?.isCorrect
                              ? "text-emerald-300"
                              : "text-red-300",
                          ].join(" ")}
                        >
                          {result?.isCorrect
                            ? "✅ Réussi"
                            : "🔎 À retravailler"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {questions.map((item, index) => {
              const userAnswer = answers[item.id] ?? "";
              const result = getResultForItem(item.id);
              const expected = item.expected ?? [];
              const correct = result?.isCorrect ?? false;

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-700 bg-white p-5 text-slate-950 shadow-xl"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-amber-700">
                        Défi {index + 1} / {questions.length}
                      </p>

                      <h2 className="text-xl font-black">{item.title}</h2>

                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {item.theme.replaceAll("_", " ")} ·{" "}
                        {accessibleLabel(item.accessibleFrom)}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                      {stars(item.difficulty)}
                    </span>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="whitespace-pre-line text-base font-semibold">
                      {item.statement}
                    </p>

                    <p className="mt-4 text-base font-black">
                      {item.question}
                    </p>
                  </div>

                  {item.format === "qcm" && item.choices ? (
                    <div className="mt-4 grid gap-2">
                      {item.choices.map((choice) => (
                        <button
                          key={choice}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleAnswer(item.id, choice)}
                          className={[
                            "rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                            answers[item.id] === choice
                              ? "border-amber-500 bg-amber-100 text-amber-900"
                              : "border-slate-200 bg-slate-50 hover:bg-slate-100",
                            submitted ? "cursor-not-allowed opacity-80" : "",
                          ].join(" ")}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={answers[item.id] ?? ""}
                      disabled={submitted}
                      onChange={(event) =>
                        handleAnswer(item.id, event.target.value)
                      }
                      placeholder="Ta réponse..."
                      className="mt-4 min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-slate-100"
                    />
                  )}

                  {!submitted ? (
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => showNextHint(item.id)}
                        className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-black text-amber-800 hover:bg-amber-100"
                      >
                        Demander un indice
                      </button>

                      {(visibleHints[item.id] ?? 0) > 0 ? (
                        <div className="mt-3 space-y-2">
                          {(visibleHints[item.id] ?? 0) >= 1 ? (
                            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-3 text-sm font-semibold text-blue-800">
                              <strong>Indice 1 — Comprendre :</strong>{" "}
                              {item.hint1}
                            </div>
                          ) : null}

                          {(visibleHints[item.id] ?? 0) >= 2 ? (
                            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-3 text-sm font-semibold text-violet-800">
                              <strong>Indice 2 — Méthode :</strong>{" "}
                              {item.hint2}
                            </div>
                          ) : null}

                          {(visibleHints[item.id] ?? 0) >= 3 ? (
                            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
                              <strong>Indice 3 — Avancer :</strong>{" "}
                              {item.hint3}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

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
                        {correct
                          ? "✅ Bonne réponse"
                          : "❌ Réponse à corriger"}
                      </p>

                      <p className="mt-2 text-sm font-bold text-slate-700">
                        Ta réponse : {userAnswer || "Aucune réponse"}
                      </p>

                      <p className="mt-1 text-sm font-bold text-emerald-700">
                        Réponse attendue :{" "}
                        {expected.length > 0
                          ? expected.join(" ou ")
                          : "Non disponible"}
                      </p>

                      <div className="mt-3 rounded-2xl bg-white p-4">
                        <p className="text-sm font-black text-amber-700">
                          Correction
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                          {item.correction}
                        </p>
                      </div>

                      {item.redactionAttendue ? (
                        <div className="mt-3 rounded-2xl bg-white p-4">
                          <p className="text-sm font-black text-sky-700">
                            Rédaction attendue
                          </p>

                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                            {item.redactionAttendue}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              );
            })}

            {!submitted ? (
              <div className="sticky bottom-4 rounded-3xl border border-amber-400/40 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="w-full rounded-2xl bg-amber-300 px-5 py-4 text-base font-black text-slate-950 hover:bg-amber-200"
                >
                  Voir mon bilan
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={startConcours}
                  className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300"
                >
                  Refaire l’entraînement
                </button>

                <button
                  type="button"
                  onClick={resetConcours}
                  className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-black text-white hover:bg-slate-700"
                >
                  Changer de niveau
                </button>

                <Link
                  href="/accueil"
                  className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-black text-white hover:bg-slate-700"
                >
                  Retour accueil
                </Link>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}