// tutor-v4/page.tsx
"use client";

import { useEffect, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";

type TutorMode = "evaluation" | "coaching";
type StarLevel = 1 | 2 | 3 | 4 | 5;

type HiddenStarId =
  | "starter"
  | "confidence"
  | "regularity"
  | "autonomy"
  | "precision"
  | "perseverance"
  | "theme_explorer"
  | "micro_mastery";

type HiddenStarState = {
  id: HiddenStarId;
  label: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
  relatedMicroIds?: string[];
};

type VisibleProgress = {
  unlockedStars: HiddenStarState[];
  lastUnlockedStar?: HiddenStarState;
  encouragement: string;
  streak: number;
  sessionStep: number;
};

type TutorQuestionOption = {
  id: string;
  notionId: string;
  microId: string;
  text: string;
  format: "short" | "qcm";
  choices?: string[];
  expected: string[];
  comparator:
    | "exact_text"
    | "mcq_exact"
    | "number_equal"
    | "fraction_decimal_equivalent"
    | "contains_keyword";
  hint?: string;
  meta: {
    familyId: string;
    theme: "neutral" | "reunion" | "sport" | "cuisine" | "jeux_video";
    supportLevel: "low" | "medium" | "high";
    readingLoad: "short" | "medium" | "long";
    challengeType: "direct" | "guided" | "transfer" | "challenge";
    difficulty: 1 | 2 | 3 | 4 | 5;
    starLevel: StarLevel;
  };
};

type TutorQuestionPair = {
  pairId: string;
  notionId: string;
  microId: string;
  recommendedDifficulty: 1 | 2 | 3 | 4 | 5;
  recommendedStar: StarLevel;
  optionA: TutorQuestionOption;
  optionB: TutorQuestionOption;
};

type StartResponse = {
  sessionId: string;
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: 1 | 2 | 3 | 4 | 5;
  notionCatalog: Array<{ id: string; label: string }>;
  visibleProgress: VisibleProgress;
};

type AnswerResponse = {
  feedback: string;
  result: {
    ok: boolean;
    flags: string[];
  };
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: 1 | 2 | 3 | 4 | 5;
  visibleProgress: VisibleProgress;
};

type MicroStatus = "idle" | "current" | "success" | "retry";

const notionMicroMap: Record<string, string[]> = {
  decimaux: [
    "decimal_compare",
    "decimal_write",
    "decimal_add",
    "decimal_multiply",
    "decimal_divide_by_integer",
  ],
  fractions: ["fraction_read", "fraction_compare", "fraction_quantity"],
  proportionnalite: ["prop_table", "prop_unit", "prop_direct"],
  perimetre: ["perim_square", "perim_rectangle"],
  aires: ["area_rectangle", "area_square"],
  angles: ["angle_right", "angle_compare"],
};

function stars(level: number) {
  return "⭐".repeat(Math.max(1, Math.min(5, level)));
}

function starPoints(level: number) {
  return Math.max(1, Math.min(5, level));
}

function formatDuration(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function microLabel(microId?: string) {
  switch (microId) {
    case "decimal_compare":
      return "Comparer des nombres décimaux";
    case "decimal_write":
      return "Écrire un nombre décimal";
    case "decimal_add":
      return "Additionner des nombres décimaux";
    case "decimal_multiply":
      return "Multiplier des nombres décimaux";
    case "decimal_divide_by_integer":
      return "Diviser un nombre décimal par un entier";
    case "fraction_read":
      return "Lire une fraction";
    case "fraction_compare":
      return "Comparer des fractions";
    case "fraction_quantity":
      return "Comprendre une fraction comme quantité";
    case "prop_table":
      return "Compléter un tableau de proportionnalité";
    case "prop_unit":
      return "Passer par l’unité";
    case "prop_direct":
      return "Résoudre une situation de proportionnalité";
    case "perim_square":
      return "Calculer le périmètre d’un carré";
    case "perim_rectangle":
      return "Calculer le périmètre d’un rectangle";
    case "area_rectangle":
      return "Calculer l’aire d’un rectangle";
    case "area_square":
      return "Calculer l’aire d’un carré";
    case "angle_right":
      return "Identifier un angle droit";
    case "angle_compare":
      return "Comparer deux angles";
    default:
      return "Compétence en cours";
  }
}

function notionLabel(notionId: string) {
  switch (notionId) {
    case "decimaux":
      return "Nombres décimaux";
    case "fractions":
      return "Fractions";
    case "proportionnalite":
      return "Proportionnalité";
    case "perimetre":
      return "Périmètre";
    case "aires":
      return "Aires";
    case "angles":
      return "Angles";
    default:
      return notionId;
  }
}

function statusLabel(status: MicroStatus) {
  switch (status) {
    case "current":
      return "🔵 En cours";
    case "success":
      return "🟢 Réussi";
    case "retry":
      return "🟠 À retravailler";
    default:
      return "⚪ Pas encore";
  }
}

function statusClasses(status: MicroStatus) {
  switch (status) {
    case "current":
      return "border-sky-200 bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-900";
    case "success":
      return "border-emerald-200 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-900";
    case "retry":
      return "border-amber-200 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900";
    default:
      return "border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 text-slate-700";
  }
}

function simpleEncouragement(args: {
  ok?: boolean;
  microId?: string;
  points?: number;
  mode: TutorMode;
}) {
  if (args.ok === undefined || !args.microId) {
    return "Choisis une question puis réponds tranquillement.";
  }

  if (args.ok) {
    return `✅ Bonne réponse sur : ${microLabel(args.microId)}${
      args.points ? ` — +${args.points} point${args.points > 1 ? "s" : ""}` : ""
    }`;
  }

  return args.mode === "coaching"
    ? `⚠️ À retravailler : ${microLabel(args.microId)} — un indice est proposé.`
    : `⚠️ À retravailler : ${microLabel(args.microId)}`;
}

function visibleProgressText(text: string) {
  const t = text.toLowerCase();
  if (t.includes("débloquée")) return "⭐ Nouveau badge gagné";
  if (t.includes("progression solide")) return "⭐ Belle progression";
  return "";
}

function studentBadgeLabel(star: HiddenStarState) {
  switch (star.id) {
    case "starter":
      return "Je commence";
    case "confidence":
      return "Confiance";
    case "regularity":
      return "Régulier";
    case "autonomy":
      return "Autonome";
    case "precision":
      return "Précis";
    case "perseverance":
      return "Persévérant";
    case "theme_explorer":
      return "Explorateur";
    case "micro_mastery":
      return "Tu progresses";
    default:
      return "Bravo";
  }
}

export default function TutorV4Page() {
  const [classe] = useState("6e");
  const [matiere] = useState("maths");
  const [notion, setNotion] = useState("fractions");

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pair, setPair] = useState<TutorQuestionPair | null>(null);
  const [mode, setMode] = useState<TutorMode>("evaluation");
  const [recommendedStar, setRecommendedStar] = useState<StarLevel>(2);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<TutorQuestionOption | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const [sessionResults, setSessionResults] = useState<boolean[]>([]);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [possiblePoints, setPossiblePoints] = useState(0);
  const [lastResult, setLastResult] = useState<{
    ok?: boolean;
    microId?: string;
    points?: number;
  }>({});

  const [microStatuses, setMicroStatuses] = useState<Record<string, MicroStatus>>({});

  const [visibleProgress, setVisibleProgress] = useState<VisibleProgress>({
    unlockedStars: [],
    lastUnlockedStar: undefined,
    encouragement: "Bienvenue. On avance étape par étape.",
    streak: 0,
    sessionStep: 0,
  });

  const [busy, setBusy] = useState(false);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!sessionStartedAt) {
      setElapsedSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - sessionStartedAt) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStartedAt]);

  const bonnesReponses = sessionResults.filter(Boolean).length;
  const nbTentatives = sessionResults.length;

  const scoreSeanceSur20 =
    possiblePoints > 0 ? ((earnedPoints / possiblePoints) * 20).toFixed(1) : "0.0";

  const notionMicros = useMemo(() => notionMicroMap[notion] ?? [], [notion]);

  async function activateQuestion(currentSessionId: string, option: TutorQuestionOption) {
    const res = await fetch("/api/tutor-v4/choose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: currentSessionId, optionId: option.id }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error ?? "Erreur pendant l’activation de la question.");
    }

    setSelectedOptionId(option.id);
    setCurrentQuestion(option);
    setAnswer("");
    setMicroStatuses((prev) => ({
      ...prev,
      [option.microId]:
        prev[option.microId] === "success" ? "success" : "current",
    }));
  }

  function resetMicroStatusesForNotion(notionId: string) {
    const micros = notionMicroMap[notionId] ?? [];
    const initial: Record<string, MicroStatus> = {};
    micros.forEach((microId) => {
      initial[microId] = "idle";
    });
    setMicroStatuses(initial);
  }

  async function startSession() {
    try {
      setBusy(true);
      setFeedback("");
      setAnswer("");
      setSessionResults([]);
      setEarnedPoints(0);
      setPossiblePoints(0);
      setSelectedOptionId(null);
      setCurrentQuestion(null);
      setPair(null);
      setLastResult({});
      setSessionStartedAt(null);
      setElapsedSeconds(0);
      resetMicroStatusesForNotion(notion);

      const res = await fetch("/api/tutor-v4/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classe, matiere, notion }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur au démarrage du tutor.");
        return;
      }

      const typed = data as StartResponse;

      setSessionId(typed.sessionId);
      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setVisibleProgress(typed.visibleProgress);
      setSessionStartedAt(Date.now());
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Erreur au démarrage du tutor.");
    } finally {
      setBusy(false);
    }
  }

  async function chooseOption(option: TutorQuestionOption) {
    if (!sessionId) {
      setFeedback("Aucune session active.");
      return;
    }

    try {
      setBusy(true);
      await activateQuestion(sessionId, option);
      setFeedback("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Erreur pendant le choix de la question."
      );
    } finally {
      setBusy(false);
    }
  }

  async function submitAnswer(submittedAnswer?: string) {
    if (!sessionId) {
      setFeedback("Aucune session active.");
      return;
    }

    if (!currentQuestion) {
      setFeedback("Choisis d’abord une question.");
      return;
    }

    const finalAnswer = (submittedAnswer ?? answer).trim();

    if (!finalAnswer) {
      setFeedback("Entre une réponse ou clique sur un choix.");
      return;
    }

    try {
      setBusy(true);

      const currentMicro = currentQuestion.microId;
      const currentMicroLabel = microLabel(currentMicro);
      const pointsForQuestion = starPoints(currentQuestion.meta.starLevel);

      const res = await fetch("/api/tutor-v4/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, answer: finalAnswer }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur pendant la correction.");
        return;
      }

      const typed = data as AnswerResponse;

      setSessionResults((prev) => [...prev, typed.result.ok]);
      setPossiblePoints((prev) => prev + pointsForQuestion);
      if (typed.result.ok) {
        setEarnedPoints((prev) => prev + pointsForQuestion);
      }

      setLastResult({
        ok: typed.result.ok,
        microId: currentMicro,
        points: typed.result.ok ? pointsForQuestion : 0,
      });

      setMicroStatuses((prev) => ({
        ...prev,
        [currentMicro]: typed.result.ok ? "success" : "retry",
      }));

      setFeedback(
        `${typed.result.ok ? "✅ Bonne réponse" : "⚠️ À retravailler"} : ${currentMicroLabel}\n\n${typed.feedback}`
      );
      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setVisibleProgress(typed.visibleProgress);

      setSelectedOptionId(null);
      setCurrentQuestion(null);
      setAnswer("");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Erreur pendant la correction.");
    } finally {
      setBusy(false);
    }
  }

  async function handleQcmClick(choice: string) {
    setAnswer(choice);
    await submitAnswer(choice);
  }

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !busy) {
      e.preventDefault();
      void submitAnswer();
    }
  }

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-fixed px-4 py-6"
      style={{ backgroundImage: "url('/images/tutor-bg.png')" }}
    >
      <div className="absolute inset-0 pointer-events-none bg-white/60" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <section className="grid gap-4 md:grid-cols-3">
              <Card>
                <Label>Classe</Label>
                <input
                  value={classe}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700"
                />
              </Card>

              <Card>
                <Label>Matière</Label>
                <input
                  value={matiere}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-700"
                />
              </Card>

              <Card>
                <Label>Notion</Label>
                <select
                  value={notion}
                  onChange={(e) => setNotion(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="decimaux">Nombres décimaux</option>
                  <option value="fractions">Fractions</option>
                  <option value="proportionnalite">Proportionnalité</option>
                  <option value="perimetre">Périmètre</option>
                  <option value="aires">Aires</option>
                  <option value="angles">Angles</option>
                </select>
              </Card>
            </section>

            <header className="rounded-3xl bg-white/95 p-5 shadow-sm ring-1 ring-slate-200 backdrop-blur-[1px]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                    Tutor de maths
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900">
                    Je m’entraîne
                  </h1>
                  <p className="text-sm text-slate-600">
                    Choisis la question qui te convient, puis réponds à ton rythme.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={startSession}
                    disabled={busy}
                    className="rounded-2xl bg-sky-700 px-5 py-3 text-sm font-bold text-white hover:bg-sky-600 disabled:opacity-50"
                  >
                    Démarrer
                  </button>

                  <MiniPill>
                    {mode === "evaluation" ? "Mode évaluation" : "Mode coaching"}
                  </MiniPill>
                  <MiniPill>Niveau {stars(recommendedStar)}</MiniPill>
                  <MiniPill>Série {visibleProgress.streak}</MiniPill>
                </div>
              </div>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-[1px]">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-sm font-semibold text-slate-800">
                  {simpleEncouragement({
                    ok: lastResult.ok,
                    microId: lastResult.microId,
                    points: lastResult.points,
                    mode,
                  })}
                </div>

                <div className="flex flex-wrap gap-2">
                  {visibleProgressText(visibleProgress.encouragement) ? (
                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                      {visibleProgressText(visibleProgress.encouragement)}
                    </span>
                  ) : null}

                  {visibleProgress.unlockedStars.map((star) => (
                    <span
                      key={star.id}
                      className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
                    >
                      ⭐ {studentBadgeLabel(star)}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {pair && !currentQuestion ? (
              <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-[1px]">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-slate-900">
                    Choisis ta question
                  </div>
                  <p className="text-sm text-slate-500">
                    Tu peux prendre la plus rassurante ou tenter la plus ambitieuse.
                  </p>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {[pair.optionA, pair.optionB].map((option, idx) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => void chooseOption(option)}
                      disabled={busy}
                      className="rounded-3xl border border-slate-200 bg-white p-5 text-left transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-base font-bold text-slate-900">
                          Question {idx === 0 ? "A" : "B"}
                        </span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                          {stars(option.meta.starLevel)}
                        </span>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-2">
                        <Tag>{option.format === "qcm" ? "QCM" : "Réponse libre"}</Tag>
                        <Tag>{microLabel(option.microId)}</Tag>
                        <Tag>{starPoints(option.meta.starLevel)} pts</Tag>
                      </div>

                      <p className="text-base leading-6 text-slate-900">{option.text}</p>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {currentQuestion ? (
              <section className="rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm backdrop-blur-[1px]">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-lg font-bold text-slate-900">Ta question</div>
                    <p className="text-sm text-slate-500">
                      Réponds puis une nouvelle paire de questions apparaîtra.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                      {stars(currentQuestion.meta.starLevel)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                      {starPoints(currentQuestion.meta.starLevel)} pts
                    </span>
                  </div>
                </div>

                <div className="mb-4 rounded-2xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-900 ring-1 ring-violet-200">
                  Compétence travaillée : {microLabel(currentQuestion.microId)}
                </div>

                <div className="mb-5 rounded-2xl bg-white p-4 text-base text-slate-900 ring-1 ring-slate-200">
                  {currentQuestion.text}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <Tag>{currentQuestion.format === "qcm" ? "QCM" : "Réponse libre"}</Tag>
                  <Tag>{mode === "evaluation" ? "Évaluation" : "Coaching"}</Tag>
                </div>

                {currentQuestion.format === "qcm" && currentQuestion.choices?.length ? (
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-slate-800">
                      Clique sur ta réponse
                    </div>

                    <div className="grid gap-2">
                      {currentQuestion.choices.map((choice, idx) => (
                        <button
                          key={`${choice}-${idx}`}
                          type="button"
                          onClick={() => void handleQcmClick(choice)}
                          disabled={busy}
                          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-slate-800">
                      Écris ta réponse
                    </div>

                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      onKeyDown={handleInputKeyDown}
                      placeholder="Ta réponse..."
                      disabled={busy}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900"
                    />

                    <button
                      onClick={() => void submitAnswer()}
                      disabled={busy}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                      Valider ma réponse
                    </button>
                  </div>
                )}

                {mode === "coaching" && currentQuestion.hint ? (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <span className="font-bold">Indice :</span> {currentQuestion.hint}
                  </div>
                ) : null}

                {feedback ? (
                  <div className="mt-5 whitespace-pre-line rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-800">
                    {feedback}
                  </div>
                ) : null}
              </section>
            ) : null}

            {!pair && !currentQuestion ? (
              <div className="rounded-3xl border border-slate-200 bg-white/95 p-8 text-center text-sm text-slate-600 shadow-sm backdrop-blur-[1px]">
                Clique sur <span className="font-semibold">Démarrer</span> pour lancer
                une séance.
              </div>
            ) : null}
          </div>

          <aside className="space-y-5">
            <SidebarCard title="Tableau de bord">
              <div className="grid gap-3">
                <StatLine label="Score" value={`${scoreSeanceSur20}/20`} />
                <StatLine label="Temps" value={formatDuration(elapsedSeconds)} />
                <StatLine label="Points" value={`${earnedPoints}/${possiblePoints}`} />
                <StatLine label="Bonnes réponses" value={`${bonnesReponses}`} />
                <StatLine label="Questions faites" value={`${nbTentatives}`} />
                <StatLine label="Série" value={`${visibleProgress.streak}`} />
                <StatLine label="Niveau" value={stars(recommendedStar)} />
              </div>
            </SidebarCard>
          <SidebarCard title={`Micro-compétences : ${notionLabel(notion)}`}>
            <div className="mb-3 text-xs text-slate-500">
              Suis ta progression dans la notion choisie.
            </div>

            <div className="space-y-3">
              {notionMicros.map((microId) => {
                const status = microStatuses[microId] ?? "idle";

                return (
                  <div
                    key={microId}
                    className={`rounded-2xl border px-4 py-3 shadow-sm transition ${statusClasses(status)}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold leading-5">
                        {microLabel(microId)}
                      </div>

                      <span className="rounded-full bg-white/80 px-2 py-1 text-[11px] font-bold shadow-sm">
                        {statusLabel(status)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SidebarCard>

            <SidebarCard title="Repères">
              <div className="space-y-2 text-sm text-slate-700">
                <p>• Plus la question a d’étoiles, plus elle rapporte de points.</p>
                <p>• Tu peux choisir la question qui te semble la plus adaptée.</p>
                <p>• En coaching, un indice peut apparaître pour t’aider.</p>
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-[1px]">
      {children}
    </div>
  );
}

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur-[1px]">
      <h2 className="mb-3 text-base font-bold text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function StatLine({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const styles: Record<string, string> = {
    Score: "bg-gradient-to-r from-sky-400 to-blue-500 text-white",
    Temps: "bg-gradient-to-r from-violet-400 to-purple-500 text-white",
    Points: "bg-gradient-to-r from-emerald-400 to-green-500 text-white",
    "Bonnes réponses": "bg-gradient-to-r from-green-400 to-emerald-600 text-white",
    "Questions faites": "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
    Série: "bg-gradient-to-r from-pink-400 to-rose-500 text-white",
    Niveau: "bg-gradient-to-r from-indigo-400 to-indigo-600 text-white",
  };

  const icons: Record<string, string> = {
    Score: "🎯",
    Temps: "⏱️",
    Points: "⭐",
    "Bonnes réponses": "✅",
    "Questions faites": "📊",
    Série: "🔥",
    Niveau: "🚀",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-3 shadow-md ${
        styles[label] ?? "bg-slate-200"
      }`}
    >
      <span className="text-sm font-semibold flex items-center gap-2">
        <span>{icons[label] ?? "📌"}</span>
        {label}
      </span>

      <span className="text-lg font-extrabold">{value}</span>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-xs font-semibold text-slate-600">
      {children}
    </label>
  );
}

function MiniPill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 backdrop-blur-[1px]">
      {children}
    </div>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
      {children}
    </span>
  );
}