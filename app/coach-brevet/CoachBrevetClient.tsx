"use client";

import { useMemo, useState } from "react";
import {
  coachBrevetWeekly,
  getCoachBrevetItemsByIds,
  getCoachBrevetProblemById,
} from "@/lib/coach-brevet";
import BoutonSignalerQuestion from "@/components/signalement/BoutonSignalerQuestion";

type TabMode = "search" | "correction";

export default function CoachBrevetClient() {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [showHints, setShowHints] = useState(false);
  const [activeTabs, setActiveTabs] = useState<Record<string, TabMode>>({});

  const selectedDay = useMemo(() => {
    return (
      coachBrevetWeekly.find((day) => day.dayNumber === selectedDayNumber) ??
      coachBrevetWeekly[0]
    );
  }, [selectedDayNumber]);

  const items = useMemo(() => {
    return getCoachBrevetItemsByIds(selectedDay.itemIds);
  }, [selectedDay]);

  const problem = useMemo(() => {
    if (selectedDay.problemId) {
      return getCoachBrevetProblemById(selectedDay.problemId);
    }
    if (selectedDay.expressSubjectId) {
      return getCoachBrevetProblemById(selectedDay.expressSubjectId);
    }
    return undefined;
  }, [selectedDay]);

  function getActiveTab(id: string): TabMode {
    return activeTabs[id] ?? "search";
  }

  function setActiveTab(id: string, tab: TabMode) {
    setActiveTabs((prev) => ({ ...prev, [id]: tab }));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FDF4] px-4 py-8 text-slate-950">
      {/* FOND SVG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 1200"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="br-glow1" cx="20%" cy="20%" r="55%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="br-glow2" cx="80%" cy="18%" r="50%">
              <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FCD34D" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="br-glow3" cx="50%" cy="85%" r="60%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="br-center" cx="50%" cy="38%" r="42%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="br-trail" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
            </linearGradient>
            <filter id="br-blur">
              <feGaussianBlur stdDeviation="28" />
            </filter>
          </defs>

          <rect width="1440" height="1200" fill="#F0FDF4" />
          <rect width="1440" height="1200" fill="url(#br-glow1)" />
          <rect width="1440" height="1200" fill="url(#br-glow2)" />
          <rect width="1440" height="1200" fill="url(#br-glow3)" />
          <rect width="1440" height="1200" fill="url(#br-center)" />

          <circle cx="210" cy="170" r="180" fill="#34D399" opacity="0.22" filter="url(#br-blur)" />
          <circle cx="1200" cy="160" r="220" fill="#FBBF24" opacity="0.2" filter="url(#br-blur)" />
          <circle cx="900" cy="780" r="280" fill="#38BDF8" opacity="0.14" filter="url(#br-blur)" />

          <path
            d="M -80 940 C 200 820, 400 970, 660 840 S 1080 570, 1540 750"
            fill="none"
            stroke="url(#br-trail)"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.9"
          />

          <g opacity="0.15" fill="#065F46" fontFamily="serif" fontStyle="italic">
            <text x="120" y="260" fontSize="68">a²+b²</text>
            <text x="870" y="235" fontSize="66">f(x)</text>
            <text x="1100" y="250" fontSize="60">P(A)</text>
            <text x="880" y="420" fontSize="56">3/4</text>
            <text x="140" y="780" fontSize="60">x²−9</text>
          </g>

          <g opacity="0.18" stroke="#16A34A" strokeWidth="3.5" fill="none">
            <line x1="60" y1="300" x2="260" y2="300" />
            <line x1="90" y1="330" x2="90" y2="140" />
            <path d="M 65 300 C 125 300, 135 240, 180 240 S 235 310, 290 90" />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.3)_45%,rgba(240,253,244,0.85)_100%)]" />
      </div>

      {/* CONTENU */}
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <section className="rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_20px_60px_rgba(16,185,129,0.2)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                EleveAI · Sprint Brevet
              </p>
              <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-5xl">
                Coach Brevet Maths
              </h1>
              <p className="mt-3 max-w-3xl text-base font-semibold text-slate-700 sm:text-lg">
                Sprint 30 jours pour le brevet des collèges. Automatismes,
                pièges classiques, problèmes guidés et sujets express.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 shadow-sm">
                  <span className="text-lg">🎯</span>
                  Brevet dans 30 jours
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-black text-amber-800 shadow-sm">
                  <span className="text-lg">⚡</span>
                  Maths 3e — toutes notions
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHints((v) => !v)}
              className="w-fit rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-900 shadow-lg transition hover:bg-amber-200"
            >
              {showHints ? "Masquer les indices" : "Voir les indices"}
            </button>
          </div>

          {/* Sélecteur de jours */}
          <div className="mt-6 flex flex-wrap gap-2">
            {coachBrevetWeekly.map((day) => (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => {
                  setSelectedDayNumber(day.dayNumber);
                  setShowHints(false);
                  setActiveTabs({});
                }}
                className={[
                  "rounded-full px-4 py-2 text-sm font-black transition-all duration-200",
                  selectedDayNumber === day.dayNumber
                    ? "bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-300/40 ring-2 ring-emerald-200"
                    : "bg-white/75 text-slate-700 shadow-sm hover:bg-emerald-100 hover:text-emerald-900",
                ].join(" ")}
              >
                J{day.dayNumber}
              </button>
            ))}
          </div>
        </section>

        {/* PROGRAMME DU JOUR */}
        <section className="mt-6 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_45px_rgba(16,185,129,0.16)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-emerald-700">
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
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-800 ring-1 ring-emerald-100">
              Jour {selectedDay.dayNumber} / {coachBrevetWeekly.length}
            </div>
          </div>

          {/* Questions */}
          <div className="mt-6 grid gap-4">
            {items.map((item, index) => {
              const generated = item.kind === "template" ? item.generate() : item;
              const format = item.kind === "template" ? item.format : item.format;
              const hint = item.kind === "template" ? item.hint : item.hint;
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
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800">
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
                      {/* Ne s'affiche que pour un bêta testeur accepté. */}
                      <BoutonSignalerQuestion
                        page="/coach-brevet"
                        question={generated.text}
                        notion={item.notionId}
                      />
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
                            ? "bg-emerald-100 text-emerald-900"
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
                            ? "bg-amber-100 text-amber-900"
                            : "bg-white text-slate-500 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        Correction
                      </button>
                    </div>

                    {tab === "search" ? (
                      <div className="p-4">
                        {format === "qcm" && generated.choices ? (
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
                            Cherche la réponse, puis ouvre l&apos;onglet correction.
                          </div>
                        )}
                        {showHints && hint ? (
                          <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900 ring-1 ring-amber-100">
                            Indice : {hint}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="space-y-3 bg-amber-50 p-4">
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

        {/* PROBLÈME / SUJET EXPRESS */}
        {problem ? (
          <section className="mt-6 rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-[0_18px_45px_rgba(245,158,11,0.18)] backdrop-blur-xl">
            <p className="text-sm font-black uppercase tracking-wide text-amber-700">
              {selectedDay.expressSubjectId ? "Sujet express" : "Problème guidé"}
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {problem.title}
            </h2>
            <p className="mt-1 text-xs font-bold text-slate-500">
              ⏱ {problem.durationMinutes} min
            </p>
            {problem.intro ? (
              <p className="mt-3 rounded-2xl bg-amber-50 p-4 font-semibold text-amber-950 ring-1 ring-amber-100">
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
                              ? "bg-amber-100 text-amber-900"
                              : "bg-white text-slate-500 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          À chercher
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab(stepTabId, "correction")}
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
                            Cherche l&apos;étape avant d&apos;ouvrir la correction.
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
                              Réponse libre — aucun corrigé automatique.
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
