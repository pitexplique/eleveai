"use client";

import type { KeyboardEvent, ReactNode } from "react";
import type { Classe, Matiere } from "@/lib/tutor-v4/catalog";
import type { TutorQuestionOption } from "@/lib/tutor-v4/types";
import { buildLearningVideoHref } from "@/lib/videoSearch";

type TutorSimpleViewProps = {
  classe: Classe;
  matiere: Matiere;
  notionLabel: string;
  microLabel?: string;
  currentQuestion: TutorQuestionOption | null;
  answer: string;
  setAnswer: (value: string) => void;
  busy: boolean;
  feedback: string;
  wrongAnswerPanel: ReactNode;
  wrongAnswerPanelOpen: boolean;
  score: string;
  elapsedTime: string;
  questionsDone: number;
  currentStar: number;
  renderCanvas: (question: TutorQuestionOption) => ReactNode;
  onBackCoach: () => void;
  onSwitchToComplete: () => void;
  onStart: () => void;
  onSubmit: () => void;
  onQcmClick: (choice: string) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onShowLesson: () => void;
};

function classLabel(classe: Classe) {
  return classe === "terminale-spe" ? "Terminale spé" : classe.toUpperCase();
}

function matiereLabel(matiere: Matiere) {
  return matiere === "francais" ? "Français" : "Maths";
}

export default function TutorSimpleView({
  classe,
  matiere,
  notionLabel,
  microLabel,
  currentQuestion,
  answer,
  setAnswer,
  busy,
  feedback,
  wrongAnswerPanel,
  wrongAnswerPanelOpen,
  score,
  elapsedTime,
  questionsDone,
  currentStar,
  renderCanvas,
  onBackCoach,
  onSwitchToComplete,
  onStart,
  onSubmit,
  onQcmClick,
  onInputKeyDown,
  onShowLesson,
}: TutorSimpleViewProps) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-100 px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto max-w-6xl">
        <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-slate-600">
            {classLabel(classe)} &gt; {matiereLabel(matiere)} &gt; {notionLabel}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onBackCoach}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Retour Coach
            </button>
            <button
              type="button"
              onClick={onSwitchToComplete}
              className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Mode complet
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_120px]">
          <section className="min-h-[520px] rounded-2xl bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 sm:px-8 lg:px-12">
            <div className="mb-5 flex justify-center">
              <button
                type="button"
                onClick={onShowLesson}
                className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-700 hover:bg-sky-200"
              >
                J'apprends !
              </button>
            </div>

            {wrongAnswerPanelOpen ? (
              wrongAnswerPanel
            ) : currentQuestion ? (
              <div className="mx-auto max-w-3xl">
                <div className="mb-5 flex flex-wrap items-center gap-2 text-sm font-bold text-slate-500">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                    Niveau {currentQuestion.meta.starLevel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                    {microLabel ?? "Entraînement"}
                  </span>
                </div>

                <p className="mb-6 text-xl leading-8 text-slate-950">
                  {currentQuestion.text}
                </p>

                <div className="mb-6 rounded-2xl border border-sky-100 bg-sky-50 p-4 text-slate-900">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-black text-sky-900">
                        Tu ne comprends pas la notion ?
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-700">
                        Regarde une video d'explication avant de repondre.
                      </p>
                    </div>

                    <a
                      href={buildLearningVideoHref({
                        matiere: matiereLabel(matiere),
                        niveau: classLabel(classe),
                        notionLabel,
                        microLabel,
                        notionId: currentQuestion.notionId,
                        microId: currentQuestion.microId,
                        questionText: currentQuestion.text,
                        type: currentQuestion.format,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-sm hover:bg-sky-500"
                    >
                      Regarder la video
                    </a>
                  </div>
                </div>

                {currentQuestion.canvas ? (
                  <div className="mb-6 overflow-x-auto rounded-xl bg-slate-50 p-3">
                    {renderCanvas(currentQuestion)}
                  </div>
                ) : null}

                {currentQuestion.format === "qcm" && currentQuestion.choices?.length ? (
                  <div className="grid gap-3">
                    {currentQuestion.choices.map((choice, index) => (
                      <button
                        key={`${choice}-${index}`}
                        type="button"
                        onClick={() => onQcmClick(choice)}
                        disabled={busy}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-4 text-left text-lg font-semibold text-slate-900 shadow-sm hover:bg-sky-50 disabled:opacity-60"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                ) : currentQuestion.format === "open" ? (
                  <div className="space-y-4">
                    <textarea
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      onKeyDown={onInputKeyDown}
                      disabled={busy}
                      rows={5}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none focus:border-sky-500"
                      placeholder="Ta réponse..."
                    />
                    <button
                      type="button"
                      onClick={onSubmit}
                      disabled={busy}
                      className="rounded-md bg-lime-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-lime-600 disabled:opacity-60"
                    >
                      Valider
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <input
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      onKeyDown={onInputKeyDown}
                      disabled={busy}
                      className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none focus:border-sky-500"
                      placeholder="Réponse"
                    />
                    <div>
                      <button
                        type="button"
                        onClick={onSubmit}
                        disabled={busy}
                        className="rounded-md bg-lime-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-lime-600 disabled:opacity-60"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
                )}

                {feedback ? (
                  <div className="mt-6 rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                    {feedback}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <div className="mb-4 text-2xl font-black text-slate-900">
                  Prêt pour une question ?
                </div>
                <button
                  type="button"
                  onClick={onStart}
                  disabled={busy}
                  className="rounded-md bg-lime-500 px-8 py-3 text-base font-black text-white shadow-sm hover:bg-lime-600 disabled:opacity-60"
                >
                  {busy ? "Préparation..." : "Commencer"}
                </button>
              </div>
            )}
          </section>

          <aside className="grid grid-cols-3 gap-2 lg:block lg:space-y-0">
            <SimpleStat title="Questions" value={`${questionsDone}`} tone="green" />
            <SimpleStat title="Temps" value={elapsedTime} tone="blue" />
            <SimpleStat title="Score" value={`${score}/20`} tone="orange" />
          </aside>
        </div>

        <div className="mt-3 text-center text-xs font-semibold text-slate-500">
          Progression automatique : niveau {Math.max(1, Math.min(5, currentStar))}
        </div>
      </div>
    </main>
  );
}

function SimpleStat({
  title,
  value,
  tone,
}: {
  title: string;
  value: string;
  tone: "green" | "blue" | "orange";
}) {
  const toneClass = {
    green: "bg-lime-500 text-white",
    blue: "bg-sky-500 text-white",
    orange: "bg-orange-500 text-white",
  }[tone];

  return (
    <div className="overflow-hidden bg-white text-center shadow-sm ring-1 ring-slate-200 lg:mb-0">
      <div className={`${toneClass} px-2 py-2 text-xs font-black`}>{title}</div>
      <div className="px-2 py-4 text-2xl font-black text-slate-700">{value}</div>
    </div>
  );
}
