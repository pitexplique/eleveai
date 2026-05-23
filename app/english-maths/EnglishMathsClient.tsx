// app/english-maths/EnglishMathsClient.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  englishMathsWords,
  getEnglishMathsWordsByIds,
  getTodayEnglishMathsDay,
  type EnglishMathsNiveau,
} from "@/lib/english-maths";

import { generateEnglishMathsQuestions } from "@/lib/english-maths/generateQuestions";

function playAudio(src?: string) {
  if (!src) return;

  const audio = new Audio(src);

  audio.play().catch(() => {
    // Le navigateur peut bloquer l'audio si l'action n'est pas déclenchée par l'utilisateur.
  });
}

export default function EnglishMathsClient() {
  // V1 : routine commune pour tous.
  // On garde techniquement "6e" pour récupérer la semaine commune.
  const niveau: EnglishMathsNiveau = "6e";

  const [mode, setMode] = useState<"words" | "quiz" | "result">("words");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const day = useMemo(() => getTodayEnglishMathsDay(niveau), [niveau]);

  const wordsOfDay = useMemo(() => {
    if (!day) return [];
    return getEnglishMathsWordsByIds(day.wordIds);
  }, [day]);

  const questions = useMemo(() => {
    return generateEnglishMathsQuestions(wordsOfDay, englishMathsWords);
  }, [wordsOfDay]);

  const score = questions.reduce((total, question) => {
    return total + (answers[question.id] === question.expected ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(answers).length;
  const canShowScore = answeredCount >= questions.length && questions.length > 0;

  function goToQuiz() {
    setAnswers({});
    setMode("quiz");
  }

  function restartWords() {
    setAnswers({});
    setMode("words");
  }

  function restartQuiz() {
    setAnswers({});
    setMode("quiz");
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/accueil"
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            ← Accueil
          </Link>

          <div className="rounded-full bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-200 ring-1 ring-emerald-300/30">
            5 mots par jour
          </div>
        </div>

        <section className="mb-6 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-sky-200">
            EleveAI
          </p>

          <h1 className="text-3xl font-black md:text-5xl">English Maths</h1>

          <p className="mt-3 max-w-2xl text-base font-semibold text-white/75">
            Chaque jour : 5 mots de maths en anglais, l&apos;audio, une phrase
            simple, puis un mini-défi.
          </p>
        </section>

        {day ? (
          <section className="mb-6 rounded-3xl border border-white/10 bg-white p-5 text-slate-950 shadow-2xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {day.dayLabel} · {day.week}
                </div>

                <h2 className="text-2xl font-black">{day.title}</h2>
              </div>

              <div className="rounded-full bg-sky-100 px-4 py-2 text-sm font-black text-sky-900">
                {day.theme}
              </div>
            </div>

            {mode === "words" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {wordsOfDay.map((word) => (
                    <article
                      key={word.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm"
                    >
                      <div className="mb-3 text-5xl">{word.image}</div>

                      <div className="text-2xl font-black text-slate-950">
                        {word.english}
                      </div>

                      <div className="mt-1 text-sm font-bold text-slate-500">
                        {word.french}
                      </div>

                      <div className="mt-4 flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => playAudio(word.audioWordSrc)}
                          className="rounded-full bg-sky-600 px-3 py-2 text-xs font-black text-white"
                        >
                          🔊 mot
                        </button>

                        <button
                          type="button"
                          onClick={() => playAudio(word.audioSentenceSrc)}
                          className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-black text-white"
                        >
                          🔊 phrase
                        </button>
                      </div>

                      <p className="mt-3 text-xs font-semibold text-slate-600">
                        {word.sentenceEn}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={goToQuiz}
                    disabled={wordsOfDay.length === 0}
                    className="rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-xl hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Je suis prêt pour le mini-défi →
                  </button>
                </div>
              </>
            ) : null}

            {mode === "quiz" ? (
              <>
                <div className="mb-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700">
                  Question {Math.min(answeredCount + 1, questions.length)} /{" "}
                  {questions.length}
                </div>

                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const isAnswered = Boolean(answers[question.id]);

                    return (
                      <article
                        key={question.id}
                        className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <h3 className="text-base font-black">
                            Question {index + 1}
                          </h3>

                          {question.audioSrc ? (
                            <button
                              type="button"
                              onClick={() => playAudio(question.audioSrc)}
                              className="rounded-full bg-sky-600 px-3 py-2 text-xs font-black text-white"
                            >
                              🔊 écouter
                            </button>
                          ) : null}
                        </div>

                        {question.image ? (
                          <div className="mb-3 text-center text-5xl">
                            {question.image}
                          </div>
                        ) : null}

                        <p className="mb-3 text-sm font-bold text-slate-700">
                          {question.question}
                        </p>

                        <div className="grid gap-2 md:grid-cols-2">
                          {question.choices.map((choice) => {
                            const selected = answers[question.id] === choice;

                            return (
                              <button
                                key={choice}
                                type="button"
                                onClick={() =>
                                  setAnswers((current) => ({
                                    ...current,
                                    [question.id]: choice,
                                  }))
                                }
                                className={[
                                  "rounded-2xl border px-4 py-3 text-left text-sm font-black",
                                  selected
                                    ? "border-emerald-500 bg-emerald-100 text-emerald-950"
                                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-100",
                                ].join(" ")}
                              >
                                {choice}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered ? (
                          <p className="mt-3 text-xs font-bold text-slate-500">
                            Réponse enregistrée.
                          </p>
                        ) : null}
                      </article>
                    );
                  })}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={restartWords}
                    className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-black text-slate-800 shadow hover:bg-slate-200"
                  >
                    Revoir les mots
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode("result")}
                    disabled={!canShowScore}
                    className="rounded-2xl bg-emerald-500 px-6 py-4 text-base font-black text-slate-950 shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Voir mon score
                  </button>
                </div>
              </>
            ) : null}

            {mode === "result" ? (
              <div className="rounded-3xl bg-emerald-50 p-6 text-center">
                <div className="text-5xl">⭐</div>

                <h2 className="mt-3 text-3xl font-black text-emerald-950">
                  Bravo !
                </h2>

                <p className="mt-2 text-lg font-black text-emerald-900">
                  Score : {score} / {questions.length}
                </p>

                <div className="mt-4 grid gap-2 text-left md:grid-cols-2">
                  {questions.map((question) => {
                    const answer = answers[question.id];
                    const correct = answer === question.expected;

                    return (
                      <div
                        key={question.id}
                        className={[
                          "rounded-2xl px-4 py-3 text-sm font-bold",
                          correct
                            ? "bg-white text-emerald-800"
                            : "bg-white text-rose-800",
                        ].join(" ")}
                      >
                        <div>
                          {correct ? "✅" : "❌"} {question.question}
                        </div>

                        <div className="mt-1 text-xs opacity-80">
                          Réponse attendue : {question.expected}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={restartWords}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 shadow"
                  >
                    Revoir les mots
                  </button>

                  <button
                    type="button"
                    onClick={restartQuiz}
                    className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow"
                  >
                    Refaire le mini-défi
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        ) : (
          <div className="rounded-3xl bg-white p-6 text-slate-950">
            Aucun jour English Maths trouvé.
          </div>
        )}
      </div>
    </main>
  );
}