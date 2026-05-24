// app/coach-bac-spe/CoachBacSpeClient.tsx

"use client";

import { useMemo, useState } from "react";
import { coachBacSpeWeekly } from "@/lib/coach-bac-spe/weekly";
import {
  getCoachBacItemsByIds,
  getCoachBacProblemById,
} from "@/lib/coach-bac-spe";

type TabMode = "search" | "correction";

export default function CoachBacSpeClient() {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [showHints, setShowHints] = useState(false);
  const [activeTabs, setActiveTabs] = useState<Record<string, TabMode>>({});

  const selectedDay = useMemo(() => {
    return (
      coachBacSpeWeekly.find(
        (day) => day.dayNumber === selectedDayNumber
      ) ?? coachBacSpeWeekly[0]
    );
  }, [selectedDayNumber]);

  const items = useMemo(() => {
    return getCoachBacItemsByIds(selectedDay.itemIds);
  }, [selectedDay]);

  const problem = useMemo(() => {
    if (selectedDay.problemId) {
      return getCoachBacProblemById(selectedDay.problemId);
    }

    if (selectedDay.expressSubjectId) {
      return getCoachBacProblemById(selectedDay.expressSubjectId);
    }

    return undefined;
  }, [selectedDay]);

  function getActiveTab(id: string): TabMode {
    return activeTabs[id] ?? "search";
  }

  function setActiveTab(id: string, tab: TabMode) {
    setActiveTabs((prev) => ({
      ...prev,
      [id]: tab,
    }));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#EAF7FF] px-4 py-8 text-slate-950">
      {/* FOND SVG LUMINEUX */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 1200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="bgGlow1" cx="18%" cy="18%" r="58%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="bgGlow2" cx="82%" cy="16%" r="52%">
              <stop offset="0%" stopColor="#C084FC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="bgGlow3" cx="52%" cy="82%" r="62%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="bgGlow4" cx="48%" cy="34%" r="42%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="trail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.24" />
              <stop offset="35%" stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#C084FC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.38" />
            </linearGradient>

            <filter id="softBlur">
              <feGaussianBlur stdDeviation="30" />
            </filter>

            <filter id="starGlow">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="1440" height="1200" fill="#EAF7FF" />
          <rect width="1440" height="1200" fill="url(#bgGlow1)" />
          <rect width="1440" height="1200" fill="url(#bgGlow2)" />
          <rect width="1440" height="1200" fill="url(#bgGlow3)" />
          <rect width="1440" height="1200" fill="url(#bgGlow4)" />

          <circle
            cx="220"
            cy="160"
            r="190"
            fill="#38BDF8"
            opacity="0.25"
            filter="url(#softBlur)"
          />
          <circle
            cx="1180"
            cy="160"
            r="230"
            fill="#A855F7"
            opacity="0.24"
            filter="url(#softBlur)"
          />
          <circle
            cx="920"
            cy="760"
            r="300"
            fill="#22C55E"
            opacity="0.13"
            filter="url(#softBlur)"
          />
          <circle
            cx="640"
            cy="330"
            r="260"
            fill="#FFFFFF"
            opacity="0.55"
            filter="url(#softBlur)"
          />

          <path
            d="M -100 960 C 180 840, 360 980, 620 840 S 1040 560, 1540 740"
            fill="none"
            stroke="url(#trail)"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.95"
          />
          <path
            d="M -80 1040 C 160 940, 360 1060, 620 930 S 1090 650, 1520 820"
            fill="none"
            stroke="url(#trail)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 120 470 L 650 470"
            fill="none"
            stroke="url(#lineGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.75"
          />

          <circle
            cx="220"
            cy="120"
            r="3"
            fill="#FFFFFF"
            opacity="0.9"
            filter="url(#starGlow)"
          />
          <circle
            cx="720"
            cy="140"
            r="2.8"
            fill="#7C3AED"
            opacity="0.55"
            filter="url(#starGlow)"
          />
          <circle
            cx="1020"
            cy="240"
            r="2.2"
            fill="#0EA5E9"
            opacity="0.55"
            filter="url(#starGlow)"
          />
          <circle
            cx="1280"
            cy="110"
            r="2.8"
            fill="#A855F7"
            opacity="0.55"
            filter="url(#starGlow)"
          />
          <circle
            cx="1360"
            cy="260"
            r="2.3"
            fill="#0EA5E9"
            opacity="0.55"
            filter="url(#starGlow)"
          />
          <circle
            cx="830"
            cy="470"
            r="2.1"
            fill="#22C55E"
            opacity="0.5"
            filter="url(#starGlow)"
          />

          <g opacity="0.18" fill="#4F46E5" fontFamily="serif" fontStyle="italic">
            <text x="150" y="240" fontSize="72">
              f&apos;(x)
            </text>
            <text x="840" y="230" fontSize="72">
              e^x
            </text>
            <text x="1080" y="250" fontSize="64">
              uₙ
            </text>
            <text x="900" y="410" fontSize="58">
              P(A∩B)
            </text>
            <text x="1240" y="430" fontSize="62">
              ln(x)
            </text>
            <text x="130" y="760" fontSize="62">
              ∑ k
            </text>
          </g>

          <g opacity="0.2" stroke="#2563EB" strokeWidth="4" fill="none">
            <line x1="70" y1="250" x2="250" y2="250" />
            <line x1="95" y1="275" x2="95" y2="95" />
            <path d="M 75 250 C 130 250, 140 200, 180 200 S 225 260, 290 70" />
          </g>

          <g opacity="0.18" stroke="#0EA5E9" strokeWidth="4" fill="none">
            <line x1="470" y1="850" x2="650" y2="850" />
            <line x1="510" y1="890" x2="510" y2="720" />
            <path d="M 470 850 C 520 850, 530 790, 575 790 S 630 860, 675 820" />
          </g>

          <g opacity="0.18" stroke="#7C3AED" strokeWidth="4" fill="none">
            <path d="M 960 930 L 1040 800 L 1130 930 Z" />
            <path d="M 985 930 L 985 885 L 1018 885" />
          </g>
        </svg>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.35)_45%,rgba(234,247,255,0.82)_100%)]" />
      </div>

      {/* CONTENU */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <section className="rounded-[2rem] border border-white/80 bg-white/75 p-6 text-slate-950 shadow-[0_20px_60px_rgba(59,130,246,0.22)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-700">
                EleveAI · Sprint Bac
              </p>

              <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">
                Coach Bac Spé Maths
              </h1>

              <p className="mt-3 max-w-3xl text-base font-semibold text-slate-700 sm:text-lg">
                Cap sur le 16 juin : automatismes, pièges classiques,
                problèmes guidés et sujets express pour arriver plus confiant.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-black text-sky-800 shadow-sm">
                  <span className="text-lg">🎯</span>
                  Objectif 16 juin
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-black text-violet-800 shadow-sm">
                  <span className="text-lg">⚡</span>
                  Calcul rapide + problèmes
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHints((value) => !value)}
              className="w-fit rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-900 shadow-lg transition hover:bg-amber-200"
            >
              {showHints ? "Masquer les indices" : "Voir les indices"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {coachBacSpeWeekly.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => {
                  setSelectedDayNumber(day.dayNumber);
                  setShowHints(false);
                  setActiveTabs({});
                }}
                className={[
                  "rounded-full px-4 py-2 text-sm font-black transition-all duration-200",
                  selectedDayNumber === day.dayNumber
                    ? "bg-yellow-300 text-slate-950 shadow-lg shadow-yellow-300/40 ring-2 ring-yellow-200"
                    : "bg-white/75 text-slate-700 shadow-sm hover:bg-sky-100 hover:text-sky-900",
                ].join(" ")}
              >
                Jour {day.dayNumber}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/80 bg-white/90 p-6 text-slate-950 shadow-[0_18px_45px_rgba(59,130,246,0.18)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                Programme du jour
              </p>

              <h2 className="mt-1 text-2xl font-black text-slate-950 sm:text-3xl">
                {selectedDay.title}
              </h2>

              {selectedDay.description ? (
                <p className="mt-2 max-w-3xl text-sm font-semibold text-slate-600 sm:text-base">
                  {selectedDay.description}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-black text-sky-800 ring-1 ring-sky-100">
              Jour {selectedDay.dayNumber} / {coachBacSpeWeekly.length}
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {items.map((item, index) => {
              const generated =
                item.kind === "template" ? item.generate() : item;

              const tab = getActiveTab(item.id);

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-black text-slate-900">
                      Question {index + 1}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-800">
                        {item.notionId}
                      </span>

                      <span
                        className={[
                          "rounded-full px-3 py-1 text-xs font-black",
                          item.theme === "piege"
                            ? "bg-rose-100 text-rose-800"
                            : item.theme === "automatisme"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200 text-slate-700",
                        ].join(" ")}
                      >
                        {item.theme}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    {generated.text}
                  </p>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="flex border-b border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => setActiveTab(item.id, "search")}
                        className={[
                          "flex-1 px-4 py-3 text-sm font-black transition",
                          tab === "search"
                            ? "bg-sky-100 text-sky-900"
                            : "bg-white text-slate-500 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        À chercher
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveTab(item.id, "correction")}
                        className={[
                          "flex-1 px-4 py-3 text-sm font-black transition",
                          tab === "correction"
                            ? "bg-emerald-100 text-emerald-900"
                            : "bg-white text-slate-500 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        Correction
                      </button>
                    </div>

                    {tab === "search" ? (
                      <div className="p-4">
                        {generated.format === "qcm" && generated.choices ? (
                          <div className="grid gap-2 sm:grid-cols-2">
                            {generated.choices.map((choice) => (
                              <div
                                key={choice}
                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800"
                              >
                                {choice}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-600">
                            Cherche la réponse, puis ouvre l’onglet correction.
                          </div>
                        )}

                        {showHints && generated.hint ? (
                          <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 ring-1 ring-amber-100">
                            Indice : {generated.hint}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="space-y-3 bg-emerald-50 p-4">
                        <div className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-emerald-900 shadow-sm">
                          Réponse attendue : {generated.expected.join(" ou ")}
                        </div>

                        {generated.explanation ? (
                          <div className="rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm">
                            {generated.explanation}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {problem ? (
          <section className="mt-6 rounded-[2rem] border border-white/80 bg-white/90 p-6 text-slate-950 shadow-[0_18px_45px_rgba(124,58,237,0.16)] backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-wide text-purple-700">
              {selectedDay.expressSubjectId ? "Sujet express" : "Problème guidé"}
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {problem.title}
            </h2>

            {problem.intro ? (
              <p className="mt-3 rounded-2xl bg-purple-50 p-4 font-semibold text-purple-950 ring-1 ring-purple-100">
                {problem.intro}
              </p>
            ) : null}

            <div className="mt-5 space-y-4">
              {problem.steps.map((step, index) => {
                const stepTabId = `${problem.id}_${step.id}`;
                const tab = getActiveTab(stepTabId);

                return (
                  <article
                    key={step.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <p className="font-black text-slate-950">
                      {index + 1}. {step.text}
                    </p>

                    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="flex border-b border-slate-200">
                        <button
                          type="button"
                          onClick={() => setActiveTab(stepTabId, "search")}
                          className={[
                            "flex-1 px-4 py-2 text-sm font-black transition",
                            tab === "search"
                              ? "bg-purple-100 text-purple-900"
                              : "bg-white text-slate-500 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          À chercher
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab(stepTabId, "correction")
                          }
                          className={[
                            "flex-1 px-4 py-2 text-sm font-black transition",
                            tab === "correction"
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-white text-slate-500 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          Correction
                        </button>
                      </div>

                      {tab === "search" ? (
                        <div className="p-3">
                          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
                            Cherche l’étape avant d’ouvrir la correction.
                          </div>

                          {showHints && step.hint ? (
                            <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800">
                              Indice : {step.hint}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div className="space-y-2 bg-emerald-50 p-3">
                          {step.expected ? (
                            <div className="rounded-xl bg-white px-3 py-2 text-sm font-black text-emerald-900 shadow-sm">
                              Réponse attendue : {step.expected.join(" ou ")}
                            </div>
                          ) : null}

                          {step.explanation ? (
                            <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-sm">
                              {step.explanation}
                            </div>
                          ) : (
                            <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-800 shadow-sm">
                              Correction à compléter.
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}