// app/concours-general/ConcoursGeneralClient.tsx

"use client";

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-35">
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

        {/* grands halos */}
        <circle cx="120" cy="120" r="180" fill="url(#goldGlow)" />
        <circle cx="1080" cy="180" r="220" fill="url(#goldGlow)" />
        <circle cx="940" cy="760" r="260" fill="#7c3aed" opacity="0.12" />
        <circle cx="160" cy="720" r="220" fill="#22c55e" opacity="0.10" />

        {/* courbes mathématiques */}
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

        {/* trophée stylisé */}
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

        {/* symboles discrets */}
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

        {/* formes géométriques */}
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

        {/* étoiles */}
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

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState<Record<string, ConcoursGeneralAnswer>>({});
  const [visibleHints, setVisibleHints] = useState<Record<string, number>>({});

  const allItems = useMemo(() => {
    return week.blocks.flatMap((block) =>
      getConcoursGeneralItemsByIds(block.itemIds)
    );
  }, [week.blocks]);

  const activeItem =
    allItems.find((item) => item.id === activeItemId) ?? allItems[0] ?? null;

  const score = Object.values(validated).reduce(
    (sum, answer) => sum + answer.score,
    0
  );

  const maxScore = allItems.length;

  function handleAnswerChange(itemId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  }

  function validateItem(item: ConcoursGeneralItem) {
    const answer = answers[item.id] ?? "";
    const correct = isAnswerCorrect(item, answer);

    setValidated((prev) => ({
      ...prev,
      [item.id]: {
        itemId: item.id,
        answer,
        isCorrect: correct,
        score: correct ? 1 : 0,
      },
    }));
  }

  function showNextHint(itemId: string) {
    setVisibleHints((prev) => ({
      ...prev,
      [itemId]: Math.min((prev[itemId] ?? 0) + 1, 3),
    }));
  }

  function resetSession() {
    setAnswers({});
    setValidated({});
    setVisibleHints({});
    setActiveItemId(allItems[0]?.id ?? null);
  }

  function getItemStatus(item: ConcoursGeneralItem) {
    const result = validated[item.id];

    if (!result) return "À faire";
    return result.isCorrect ? "Réussi" : "À retravailler";
  }

  function canDisplayForSelectedLevel(item: ConcoursGeneralItem) {
    const order: Record<ConcoursGeneralNiveau, number> = {
      "6e": 1,
      "5e": 2,
      "4e": 3,
      "3e": 4,
    };

    return order[item.accessibleFrom] <= order[selectedNiveau];
  }

  const visibleItemsForLevel = allItems.filter(canDisplayForSelectedLevel);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <ConcoursBackgroundSvg />
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 p-6 shadow-2xl">
          <p className="mb-2 text-sm font-black uppercase tracking-wide text-amber-300">
            EleveAI · Préparation Concours général des collèges
          </p>

          <h1 className="text-3xl font-black md:text-5xl">
            Des maths pas comme les autres
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            20 défis par semaine pour apprendre à chercher, raisonner,
            tester, expliquer et rédiger. Niveau cible : 3e. Accessible
            progressivement aux élèves curieux dès la 6e.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {niveaux.map((niveau) => (
              <button
                key={niveau}
                type="button"
                onClick={() => setSelectedNiveau(niveau)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-black transition",
                  selectedNiveau === niveau
                    ? "bg-amber-300 text-slate-950"
                    : "border border-slate-700 bg-slate-900 text-slate-200 hover:border-amber-300",
                ].join(" ")}
              >
                Je suis en {niveau}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">
                Semaine
              </p>
              <p className="mt-1 text-xl font-black">1</p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">
                Défis disponibles
              </p>
              <p className="mt-1 text-xl font-black">
                {visibleItemsForLevel.length} / {allItems.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">
                Durée conseillée
              </p>
              <p className="mt-1 text-xl font-black">
                {week.durationMinutes} min
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">
                Score
              </p>
              <p className="mt-1 text-xl font-black">
                {score} / {maxScore}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-4">
            {week.blocks.map((block) => {
              const items = getConcoursGeneralItemsByIds(block.itemIds);

              return (
                <div
                  key={block.id}
                  className="rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-xl"
                >
                  <h2 className="text-lg font-black text-amber-200">
                    {block.title}
                  </h2>

                  {block.description ? (
                    <p className="mt-1 text-xs text-slate-400">
                      {block.description}
                    </p>
                  ) : null}

                  <div className="mt-4 space-y-2">
                    {items.map((item) => {
                      const visible = canDisplayForSelectedLevel(item);
                      const active = activeItem?.id === item.id;
                      const status = getItemStatus(item);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          disabled={!visible}
                          onClick={() => setActiveItemId(item.id)}
                          className={[
                            "w-full rounded-2xl border p-3 text-left transition",
                            active
                              ? "border-amber-300 bg-amber-300 text-slate-950"
                              : visible
                                ? "border-slate-700 bg-slate-950 text-slate-100 hover:border-amber-300"
                                : "cursor-not-allowed border-slate-800 bg-slate-950/40 text-slate-600",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-black">
                              {item.title}
                            </span>
                            <span className="text-xs">
                              {stars(item.difficulty)}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold">
                            <span
                              className={[
                                "rounded-full px-2 py-1",
                                active
                                  ? "bg-slate-950/10"
                                  : "bg-slate-800 text-slate-300",
                              ].join(" ")}
                            >
                              {accessibleLabel(item.accessibleFrom)}
                            </span>

                            <span
                              className={[
                                "rounded-full px-2 py-1",
                                active
                                  ? "bg-slate-950/10"
                                  : status === "Réussi"
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : status === "À retravailler"
                                      ? "bg-rose-500/20 text-rose-300"
                                      : "bg-slate-800 text-slate-300",
                              ].join(" ")}
                            >
                              {status}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={resetSession}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-black text-slate-200 hover:border-amber-300"
            >
              Recommencer la session
            </button>
          </aside>

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            {activeItem ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-amber-300">
                      {activeItem.theme.replaceAll("_", " ")}
                    </p>

                    <h2 className="mt-1 text-2xl font-black">
                      {activeItem.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs font-black">
                    <span className="rounded-full bg-amber-300 px-3 py-1 text-slate-950">
                      {stars(activeItem.difficulty)}
                    </span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                      {accessibleLabel(activeItem.accessibleFrom)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-950 p-5">
                  <p className="whitespace-pre-line text-base leading-relaxed text-slate-100">
                    {activeItem.statement}
                  </p>

                  <p className="mt-5 text-lg font-black text-white">
                    {activeItem.question}
                  </p>
                </div>

                {activeItem.format === "qcm" && activeItem.choices ? (
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {activeItem.choices.map((choice) => {
                      const selected = answers[activeItem.id] === choice;

                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() =>
                            handleAnswerChange(activeItem.id, choice)
                          }
                          className={[
                            "rounded-2xl border px-4 py-3 text-left font-bold transition",
                            selected
                              ? "border-amber-300 bg-amber-300 text-slate-950"
                              : "border-slate-700 bg-slate-950 text-slate-100 hover:border-amber-300",
                          ].join(" ")}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <textarea
                    value={answers[activeItem.id] ?? ""}
                    onChange={(event) =>
                      handleAnswerChange(activeItem.id, event.target.value)
                    }
                    placeholder="Écris ta réponse ici..."
                    className="mt-5 min-h-28 w-full rounded-2xl border border-slate-700 bg-slate-950 p-4 text-white outline-none focus:border-amber-300"
                  />
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => validateItem(activeItem)}
                    className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-emerald-300"
                  >
                    Valider ma réponse
                  </button>

                  <button
                    type="button"
                    onClick={() => showNextHint(activeItem.id)}
                    className="rounded-2xl border border-amber-300 px-5 py-3 text-sm font-black text-amber-200 hover:bg-amber-300 hover:text-slate-950"
                  >
                    Demander un indice
                  </button>
                </div>

                {(visibleHints[activeItem.id] ?? 0) > 0 ? (
                  <div className="mt-5 space-y-3">
                    {(visibleHints[activeItem.id] ?? 0) >= 1 ? (
                      <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-4 text-sm text-blue-100">
                        <strong>Indice 1 — Comprendre :</strong>{" "}
                        {activeItem.hint1}
                      </div>
                    ) : null}

                    {(visibleHints[activeItem.id] ?? 0) >= 2 ? (
                      <div className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-4 text-sm text-violet-100">
                        <strong>Indice 2 — Choisir une méthode :</strong>{" "}
                        {activeItem.hint2}
                      </div>
                    ) : null}

                    {(visibleHints[activeItem.id] ?? 0) >= 3 ? (
                      <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
                        <strong>Indice 3 — Avancer :</strong>{" "}
                        {activeItem.hint3}
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {validated[activeItem.id] ? (
                  <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950 p-5">
                    <p
                      className={[
                        "text-lg font-black",
                        validated[activeItem.id].isCorrect
                          ? "text-emerald-300"
                          : "text-rose-300",
                      ].join(" ")}
                    >
                      {validated[activeItem.id].isCorrect
                        ? "Bonne réponse ✅"
                        : "Réponse à retravailler 🔎"}
                    </p>

                    <div className="mt-4 rounded-2xl bg-slate-900 p-4">
                      <p className="text-sm font-black text-amber-200">
                        Correction
                      </p>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-200">
                        {activeItem.correction}
                      </p>
                    </div>

                    {activeItem.redactionAttendue ? (
                      <div className="mt-4 rounded-2xl bg-slate-900 p-4">
                        <p className="text-sm font-black text-sky-200">
                          Rédaction attendue
                        </p>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-200">
                          {activeItem.redactionAttendue}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : (
              <p className="text-slate-300">
                Aucun défi disponible pour le moment.
              </p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}