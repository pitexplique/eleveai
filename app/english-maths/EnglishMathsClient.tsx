// app/english-maths/EnglishMathsClient.tsx

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  englishMathsWords,
  getEnglishMathsDaysByNiveau,
  getEnglishMathsWordsByIds,
  getTodayEnglishMathsDay,
  type EnglishMathsNiveau,
  type EnglishMathsLanguageLevel,
} from "@/lib/english-maths";

import { generateEnglishMathsQuestions } from "@/lib/english-maths/generateQuestions";
import { createClient } from "@/lib/supabase/client";
import { useEleve } from "@/context/EleveContext";

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
};

const niveaux: EnglishMathsNiveau[] = ["cm1", "cm2", "6e", "5e", "4e", "3e"];
const languageLevels: EnglishMathsLanguageLevel[] = ["A1", "A2", "B1", "B2"];

function niveauLabel(niveau: EnglishMathsNiveau) {
  if (niveau === "cm1") return "CM1";
  if (niveau === "cm2") return "CM2";
  return niveau;
}

function playAudio(src?: string) {
  if (!src) return;

  const audio = new Audio(src);

  audio.play().catch(() => {
    // Le navigateur peut bloquer l'audio si l'action n'est pas déclenchée par l'utilisateur.
  });
}

function EnglishMathsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="english-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#075985" />
            <stop offset="42%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>

          <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="glow-green" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </radialGradient>

          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#english-bg)" />

        <circle
          cx="250"
          cy="170"
          r="310"
          fill="url(#glow-cyan)"
          filter="url(#soft-blur)"
        />
        <circle
          cx="1280"
          cy="170"
          r="320"
          fill="url(#glow-green)"
          filter="url(#soft-blur)"
        />
        <circle
          cx="780"
          cy="760"
          r="360"
          fill="url(#glow-blue)"
          filter="url(#soft-blur)"
        />

        <g opacity="0.11" stroke="white" strokeWidth="1">
          {Array.from({ length: 17 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1="0"
              x2={i * 100}
              y2="900"
            />
          ))}

          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 100}
              x2="1600"
              y2={i * 100}
            />
          ))}
        </g>

        <g
          opacity="0.16"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="185" cy="610" r="54" />
          <circle cx="1385" cy="610" r="78" />
          <path d="M 1120 360 L 1180 460 L 1060 460 Z" />
          <path d="M 420 330 L 510 330 L 510 420 L 420 420 Z" />
        </g>

        <g opacity="0.16" fill="white" fontFamily="Arial" fontWeight="900">
          <text x="125" y="250" fontSize="54">
            +
          </text>
          <text x="1380" y="290" fontSize="54">
            =
          </text>
          <text x="1030" y="165" fontSize="42">
            x
          </text>
          <text x="520" y="735" fontSize="46">
            %
          </text>
          <text x="1185" y="755" fontSize="38">
            triangle
          </text>
          <text x="250" y="760" fontSize="34">
            number
          </text>
          <text x="760" y="250" fontSize="38">
            English Maths
          </text>
        </g>

        <rect width="1600" height="900" fill="black" opacity="0.18" />
      </svg>
    </div>
  );
}

export default function EnglishMathsClient() {
  const supabase = createClient();
  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;

  const [niveau, setNiveau] = useState<EnglishMathsNiveau>("6e");
  const [selectedWeek, setSelectedWeek] = useState<string>("verbs-A1");
  const [mode, setMode] = useState<"words" | "quiz" | "result">("words");
  const [selectedDayId, setSelectedDayId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const allDaysForNiveau = useMemo(
    () => getEnglishMathsDaysByNiveau(niveau),
    [niveau]
  );

  const availableWeeks = useMemo(() => {
    return Array.from(new Set(allDaysForNiveau.map((item) => item.week)));
  }, [allDaysForNiveau]);

  const activeWeek = availableWeeks.includes(selectedWeek)
    ? selectedWeek
    : availableWeeks[availableWeeks.length - 1] ?? "2026-S01";

  const weekDays = useMemo(
    () => allDaysForNiveau.filter((item) => item.week === activeWeek),
    [activeWeek, allDaysForNiveau]
  );

  const todayDay = useMemo(() => getTodayEnglishMathsDay(niveau), [niveau]);

  const currentUnlockedIndex =
    todayDay?.week === activeWeek ? todayDay.dayIndex : weekDays.length;

  const visibleWeekDays = useMemo(() => {
    return weekDays.filter((item) => item.dayIndex <= currentUnlockedIndex);
  }, [weekDays, currentUnlockedIndex]);

  const day = useMemo(() => {
    if (selectedDayId) {
      return (
        visibleWeekDays.find((item) => item.id === selectedDayId) ??
        visibleWeekDays[visibleWeekDays.length - 1] ??
        weekDays[0]
      );
    }

    if (todayDay?.week === activeWeek) {
      return todayDay;
    }

    return visibleWeekDays[visibleWeekDays.length - 1] ?? weekDays[0];
  }, [activeWeek, selectedDayId, todayDay, visibleWeekDays, weekDays]);

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

  function selectDay(dayId: string) {
    const unlockedDay = visibleWeekDays.find((item) => item.id === dayId);
    if (!unlockedDay) return;

    setSelectedDayId(dayId);
    setMode("words");
    setAnswers({});
  }

  function selectNiveau(nextNiveau: EnglishMathsNiveau) {
    setNiveau(nextNiveau);
    setSelectedDayId(null);
    setMode("words");
    setAnswers({});
    setSaveMessage(null);
  }

  function selectWeek(week: string) {
    setSelectedWeek(week);
    setSelectedDayId(null);
    setMode("words");
    setAnswers({});
    setSaveMessage(null);
  }

  function selectLanguageLevel(level: EnglishMathsLanguageLevel) {
    selectWeek(`verbs-${level}`);
  }

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
    setSaveMessage(null);
  }

  async function enregistrerScore() {
    setSaveMessage(null);

    if (!eleve) {
      setSaveMessage("Tu dois être connecté pour enregistrer ta note.");
      return;
    }

    const codeEtablissement = eleve.code_etablissement?.trim() ?? "";
    const codeUtilisateur = eleve.code_eleve?.trim() ?? eleve.code_utilisateur?.trim() ?? "";

    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Impossible d'identifier ton compte élève.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("resultats_english_maths").insert({
      code_etablissement: codeEtablissement,
      code_utilisateur: codeUtilisateur,
      nom: eleve.nom ?? null,
      niveau,
      jour: day?.dayIndex ?? null,
      theme: day?.theme ?? null,
      score,
      total: questions.length,
      details: {
        dayId: day?.id,
        dayLabel: day?.dayLabel,
        languageLevel: day?.languageLevel ?? null,
        title: day?.title,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          expected: q.expected,
          answer: answers[q.id] ?? "",
          correct: answers[q.id] === q.expected,
        })),
        savedAt: new Date().toISOString(),
      },
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveMessage("Erreur : la note n'a pas été enregistrée.");
      return;
    }

    setSaveMessage("Note enregistrée ✅");
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 text-white sm:py-8">
      <EnglishMathsBackground />

      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/accueil"
            className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur hover:bg-white/20"
          >
            ← Accueil
          </Link>

          <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-black text-white ring-1 ring-white/25 backdrop-blur">
            Concours CDI
          </div>
        </div>

        <section className="mb-5 rounded-[2rem] border border-white/20 bg-white/15 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-100">
            EleveAI
          </p>

          <h1 className="text-3xl font-black md:text-5xl">
            English Maths Challenge
          </h1>

          <p className="mt-3 max-w-2xl text-base font-semibold text-white/85">
            Le challenge de la semaine : des mots, de l’audio et un mini-défi chaque jour.
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                Niveau
              </div>

              <div className="flex flex-wrap gap-2">
                {niveaux.map((item) => {
                  const active = niveau === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => selectNiveau(item)}
                      className={[
                        "rounded-full px-4 py-2 text-sm font-black ring-1 transition",
                        active
                          ? "bg-white text-slate-950 ring-white"
                          : "bg-white/10 text-white ring-white/20 hover:bg-white/20",
                      ].join(" ")}
                    >
                      {niveauLabel(item)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100">
                Niveau de langue
              </div>

              <div className="flex flex-wrap gap-2">
                {languageLevels.map((level) => {
                  const active = activeWeek === `verbs-${level}`;

                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => selectLanguageLevel(level)}
                      className={[
                        "rounded-full px-4 py-2 text-sm font-black ring-1 transition",
                        active
                          ? "bg-emerald-300 text-slate-950 ring-emerald-200"
                        : "bg-white/10 text-white ring-white/20 hover:bg-white/20",
                      ].join(" ")}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-[2rem] border border-white/20 bg-white/15 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.22em] text-white/70">
                Étapes disponibles
              </div>

              <div className="mt-1 text-sm font-semibold text-white/80">
                Clique sur une carte pour charger les mots.
              </div>
            </div>

            <div className="hidden rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/20 sm:block">
              {day?.dayLabel ?? "J-5"}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {visibleWeekDays.map((item) => {
              const active = day?.id === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectDay(item.id)}
                  className={[
                    "group min-h-[92px] rounded-2xl border px-3 py-3 text-left shadow-lg transition",
                    active
                      ? "border-white bg-white text-slate-950"
                      : "border-white/15 bg-white/12 text-white hover:bg-white/20",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "mb-2 inline-flex rounded-full px-2.5 py-1 text-xs font-black",
                      active
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-white/15 text-white",
                    ].join(" ")}
                  >
                    {item.dayLabel}
                  </div>

                  <div className="line-clamp-2 text-xs font-black leading-snug sm:text-[13px]">
                    {item.title}
                  </div>

                  <div
                    className={[
                      "mt-1 line-clamp-1 text-[11px] font-bold",
                      active ? "text-slate-600" : "text-white/65",
                    ].join(" ")}
                  >
                    {item.theme}
                  </div>
                </button>
              );
            })}
          </div>

          {visibleWeekDays.length < weekDays.length ? (
            <div className="mt-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-white/75">
              Les prochaines étapes seront affichées plus tard.
            </div>
          ) : null}
        </section>

        {day ? (
          <section className="mb-6 rounded-[2rem] border border-white/20 bg-white p-4 text-slate-950 shadow-2xl sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {day.dayLabel} · {day.week}
                </div>

                <h2 className="text-2xl font-black">
                  {day.title}
                </h2>
              </div>

              <div className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-black text-cyan-950">
                {day.theme}
              </div>
            </div>

            {mode === "words" ? (
              <>
                <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  {wordsOfDay.map((word) => (
                    <article
                      key={word.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center shadow-sm"
                    >
                      <div className="mb-2 text-4xl">{word.image}</div>

                      <div className="text-lg font-black text-slate-950">
                        {word.english}
                      </div>

                      <div className="mt-1 text-xs font-bold text-slate-500">
                        {word.french}
                      </div>

                      <div className="mt-3 flex justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => playAudio(word.audioWordSrc)}
                          className="rounded-full bg-sky-600 px-2.5 py-1.5 text-[11px] font-black text-white"
                        >
                          🔊 mot
                        </button>

                        <button
                          type="button"
                          onClick={() => playAudio(word.audioSentenceSrc)}
                          className="rounded-full bg-emerald-600 px-2.5 py-1.5 text-[11px] font-black text-white"
                        >
                          🔊 phrase
                        </button>
                      </div>

                      <p className="mt-2 line-clamp-3 text-[11px] font-semibold leading-snug text-slate-600">
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
                  {eleve ? (
                    <button
                      type="button"
                      onClick={enregistrerScore}
                      disabled={saving}
                      className="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Enregistrement..." : "✅ Enregistrer ma note"}
                    </button>
                  ) : (
                    <Link
                      href="/auth/signin-eleve"
                      className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-amber-400"
                    >
                      Se connecter pour enregistrer
                    </Link>
                  )}

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

                {saveMessage && (
                  <p className={[
                    "mt-4 rounded-2xl px-4 py-3 text-sm font-black",
                    saveMessage.includes("✅")
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800",
                  ].join(" ")}>
                    {saveMessage}
                  </p>
                )}
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
