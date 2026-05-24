// app/coach-bac-spe/CoachBacSpeClient.tsx

"use client";

import { useMemo, useState } from "react";
import { coachBacSpeWeekly } from "@/lib/coach-bac-spe/weekly";
import {
  getCoachBacItemsByIds,
  getCoachBacProblemById,
} from "@/lib/coach-bac-spe";

export default function CoachBacSpeClient() {
  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [showCorrections, setShowCorrections] = useState(false);
  const [showHints, setShowHints] = useState(false);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-300">
            EleveAI · Sprint Bac
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Coach Bac Spé Maths
          </h1>

          <p className="mt-3 max-w-3xl text-base font-medium text-slate-200 sm:text-lg">
            21 jours pour réviser les automatismes, les pièges classiques et les
            problèmes guidés de spécialité maths.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {coachBacSpeWeekly.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => {
                  setSelectedDayNumber(day.dayNumber);
                  setShowCorrections(false);
                  setShowHints(false);
                }}
                className={[
                  "rounded-full px-4 py-2 text-sm font-black transition",
                  selectedDayNumber === day.dayNumber
                    ? "bg-yellow-300 text-slate-950 shadow-lg shadow-yellow-300/30"
                    : "bg-white/10 text-white hover:bg-white/20",
                ].join(" ")}
              >
                Jour {day.dayNumber}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                Programme du jour
              </p>

              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                {selectedDay.title}
              </h2>

              {selectedDay.description ? (
                <p className="mt-2 max-w-3xl text-sm font-semibold text-slate-600 sm:text-base">
                  {selectedDay.description}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setShowHints((value) => !value)}
                className="rounded-2xl bg-amber-100 px-4 py-2 text-sm font-black text-amber-900 hover:bg-amber-200"
              >
                {showHints ? "Masquer les indices" : "Voir les indices"}
              </button>

              <button
                type="button"
                onClick={() => setShowCorrections((value) => !value)}
                className="rounded-2xl bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-900 hover:bg-emerald-200"
              >
                {showCorrections
                  ? "Masquer les corrections"
                  : "Voir les corrections"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            {items.map((item, index) => {
              const generated =
                item.kind === "template" ? item.generate() : item;

              return (
                <article
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-black text-slate-900">
                      Question {index + 1}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-sky-800">
                        {item.notionId}
                      </span>

                      <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700">
                        {item.theme}
                      </span>
                    </div>
                  </div>

                  <p className="text-lg font-black text-slate-950">
                    {generated.text}
                  </p>

                  {generated.format === "qcm" && generated.choices ? (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
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
                    <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-500">
                      Réponse à faire sur feuille ou à l’oral.
                    </div>
                  )}

                  {showHints && generated.hint ? (
                    <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">
                      Indice : {generated.hint}
                    </div>
                  ) : null}

                  {showCorrections && generated.explanation ? (
                    <div className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-900">
                      Correction : {generated.explanation}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        {problem ? (
          <section className="mt-6 rounded-3xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl">
            <p className="text-sm font-black uppercase tracking-wide text-purple-700">
              {selectedDay.expressSubjectId ? "Sujet express" : "Problème guidé"}
            </p>

            <h2 className="mt-1 text-2xl font-black">{problem.title}</h2>

            {problem.intro ? (
              <p className="mt-3 rounded-2xl bg-purple-50 p-4 font-semibold text-purple-950">
                {problem.intro}
              </p>
            ) : null}

            <div className="mt-5 space-y-4">
              {problem.steps.map((step, index) => (
                <article
                  key={step.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="font-black">
                    {index + 1}. {step.text}
                  </p>

                  {showHints && step.hint ? (
                    <p className="mt-2 text-sm font-bold text-amber-800">
                      Indice : {step.hint}
                    </p>
                  ) : null}

                  {showCorrections && step.explanation ? (
                    <p className="mt-2 text-sm font-bold text-emerald-800">
                      Correction : {step.explanation}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}