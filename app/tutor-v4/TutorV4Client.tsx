"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import TriangleCanvas from "@/lib/tutor-v4/components/TriangleCanvas";
import QuadrilatereCanvas from "@/lib/tutor-v4/components/QuadrilatereCanvas";
import {
  NOTION_MICRO_MAP,
  NOTION_OPTIONS,
  notionLabel,
  microLabel,
} from "@/lib/tutor-v4/catalog";
import type {
  HiddenStarState,
  StarLevel,
  StartTutorV4Response,
  AnswerTutorV4Response,
  TutorMode,
  TutorQuestionOption,
  TutorQuestionPair,
  VisibleProgress,
  CanvasFigure,
} from "@/lib/tutor-v4/types";

type StartResponse = StartTutorV4Response;
type AnswerResponse = AnswerTutorV4Response;

type JumpResponse = {
  pair: TutorQuestionPair;
  mode: TutorMode;
  recommendedStar: StarLevel;
  recommendedDifficulty: 1 | 2 | 3 | 4 | 5;
  visibleProgress: VisibleProgress;
  mastery: {
    boMastery: Record<string, number>;
    notionMastery: Record<string, number>;
    microMastery: Record<string, number>;
  };
};

type MicroStatus = "idle" | "current" | "success" | "retry";

type MicroScore = {
  attempts: number;
  success: number;
  earnedPoints: number;
  possiblePoints: number;
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

function statusLabel(status: MicroStatus) {
  switch (status) {
    case "current":
      return "Mission en cours";
    case "success":
      return "Réussie";
    case "retry":
      return "À retravailler";
    default:
      return "Pas encore";
  }
}

function statusClasses(status: MicroStatus) {
  switch (status) {
    case "current":
      return "border-sky-300 bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-900";
    case "success":
      return "border-emerald-300 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-900";
    case "retry":
      return "border-amber-300 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900";
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
    return "Choisis une mission puis avance à ton rythme.";
  }

  if (args.ok) {
    return `✅ Mission réussie : ${microLabel(args.microId)}${
      args.points ? ` — +${args.points} point${args.points > 1 ? "s" : ""}` : ""
    }`;
  }

  return args.mode === "coaching"
    ? `⚠️ Mission à retravailler : ${microLabel(args.microId)} — un indice apparaît.`
    : `⚠️ Mission à retravailler : ${microLabel(args.microId)}`;
}

function visibleProgressText(text: string) {
  const t = text.toLowerCase();
  if (t.includes("débloquée")) return "⭐ Badge gagné";
  if (t.includes("progression solide")) return "🚀 Progression solide";
  return "";
}

function studentBadgeLabel(star: HiddenStarState) {
  switch (star.id) {
    case "starter":
      return "Départ";
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
      return "Maîtrise";
    default:
      return "Bravo";
  }
}

function feedbackTone(ok?: boolean) {
  if (ok === undefined) return "border-slate-200 bg-slate-50 text-slate-800";
  return ok
    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
    : "border-amber-200 bg-amber-50 text-amber-900";
}

function scoreOn20(earned: number, possible: number) {
  if (possible <= 0) return "—";
  return ((earned / possible) * 20).toFixed(1);
}

function renderCanvas(canvas?: CanvasFigure | null) {
  if (!canvas) return null;

  if (canvas.kind === "triangle") {
    return <TriangleCanvas figure={canvas} />;
  }

  if (canvas.kind === "quadrilatere") {
    return <QuadrilatereCanvas figure={canvas} />;
  }

  return null;
}

export default function TutorV4Page() {
  const searchParams = useSearchParams();

  const [classe, setClasse] = useState("6e");
  const [matiere, setMatiere] = useState("maths");
  const [notion, setNotion] = useState("decimaux");

  const hasInitializedFromUrl = useRef(false);
  const hasStartedFromUrl = useRef(false);
  const initialMicroIdRef = useRef<string | null>(null);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pair, setPair] = useState<TutorQuestionPair | null>(null);
  const [mode, setMode] = useState<TutorMode>("evaluation");
  const [recommendedStar, setRecommendedStar] = useState<StarLevel>(2);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<TutorQuestionOption | null>(null);
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

  const [microStatuses, setMicroStatuses] = useState<
    Record<string, MicroStatus>
  >({});
  const [microScores, setMicroScores] = useState<Record<string, MicroScore>>({});
  const [activeMicroId, setActiveMicroId] = useState<string | null>(null);

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

  const [resultModal, setResultModal] = useState<{
    open: boolean;
    ok: boolean;
    title: string;
    message?: string;
  }>({
    open: false,
    ok: true,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (hasInitializedFromUrl.current) return;

    const urlClasse = searchParams.get("classe");
    const urlMatiere = searchParams.get("matiere");
    const urlNotion = searchParams.get("notion");
    const urlMicroId = searchParams.get("microId");

    if (urlClasse) {
      setClasse(urlClasse);
    }

    if (urlMatiere) {
      setMatiere(urlMatiere);
    }

    if (
      urlNotion &&
      NOTION_OPTIONS.includes(urlNotion as (typeof NOTION_OPTIONS)[number])
    ) {
      setNotion(urlNotion);
    }

    if (urlMicroId) {
      initialMicroIdRef.current = urlMicroId;
    }

    hasInitializedFromUrl.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!hasInitializedFromUrl.current) return;
    if (hasStartedFromUrl.current) return;
    if (!initialMicroIdRef.current) return;

    hasStartedFromUrl.current = true;
    void startSession(initialMicroIdRef.current);
  }, [notion]);

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

  const notionMicros = useMemo(
    () => NOTION_MICRO_MAP[notion as keyof typeof NOTION_MICRO_MAP] ?? [],
    [notion]
  );

  function resetMicroStatusesForNotion(notionId: string) {
    const micros = NOTION_MICRO_MAP[notionId as keyof typeof NOTION_MICRO_MAP] ?? [];
    const initial: Record<string, MicroStatus> = {};
    micros.forEach((microId) => {
      initial[microId] = "idle";
    });
    setMicroStatuses(initial);
  }

  function initMicroScoresForNotion(notionId: string) {
    const micros = NOTION_MICRO_MAP[notionId as keyof typeof NOTION_MICRO_MAP] ?? [];
    const initial: Record<string, MicroScore> = {};
    micros.forEach((microId) => {
      initial[microId] = {
        attempts: 0,
        success: 0,
        earnedPoints: 0,
        possiblePoints: 0,
      };
    });
    setMicroScores(initial);
  }

  function randomSuccessTitle() {
    const items = ["Super !", "Magnifique !", "OK !"];
    return items[Math.floor(Math.random() * items.length)];
  }

  function openResultModal(ok: boolean, message?: string) {
    setResultModal({
      open: true,
      ok,
      title: ok ? randomSuccessTitle() : "Oups !",
      message,
    });
  }

  function closeResultModal() {
    setResultModal((prev) => ({ ...prev, open: false }));
  }

  async function activateQuestion(
    currentSessionId: string,
    option: TutorQuestionOption
  ) {
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
    setActiveMicroId(option.microId);

    setMicroStatuses((prev) => ({
      ...prev,
      [option.microId]:
        prev[option.microId] === "success" ? "success" : "current",
    }));
  }

  async function startSession(targetMicroId?: string) {
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
      initMicroScoresForNotion(notion);
      setActiveMicroId(targetMicroId ?? null);

      const res = await fetch("/api/tutor-v4/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classe,
          matiere,
          notion,
          microId: targetMicroId,
        }),
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
      setActiveMicroId(typed.pair.microId);

      setMicroStatuses((prev) => ({
        ...prev,
        [typed.pair.microId]: "current",
      }));
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Erreur au démarrage du tutor."
      );
    } finally {
      setBusy(false);
    }
  }

  async function jumpToMicro(microId: string) {
    if (!sessionId) {
      await startSession(microId);
      return;
    }

    try {
      setBusy(true);
      setFeedback("");
      setSelectedOptionId(null);
      setCurrentQuestion(null);
      setAnswer("");

      const res = await fetch("/api/tutor-v4/jump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, microId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(
          data?.error ?? "Erreur pendant le changement de micro-compétence."
        );
        return;
      }

      const typed = data as JumpResponse;

      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setVisibleProgress(typed.visibleProgress);
      setActiveMicroId(typed.pair.microId);

      setMicroStatuses((prev) => ({
        ...prev,
        [typed.pair.microId]:
          prev[typed.pair.microId] === "success" ? "success" : "current",
      }));
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Erreur pendant le changement de micro-compétence."
      );
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
        error instanceof Error
          ? error.message
          : "Erreur pendant le choix de la question."
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

      setMicroScores((prev) => {
        const current = prev[currentMicro] ?? {
          attempts: 0,
          success: 0,
          earnedPoints: 0,
          possiblePoints: 0,
        };

        return {
          ...prev,
          [currentMicro]: {
            attempts: current.attempts + 1,
            success: current.success + (typed.result.ok ? 1 : 0),
            earnedPoints:
              current.earnedPoints + (typed.result.ok ? pointsForQuestion : 0),
            possiblePoints: current.possiblePoints + pointsForQuestion,
          },
        };
      });

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

      openResultModal(
        typed.result.ok,
        typed.result.ok
          ? `Mission réussie : ${currentMicroLabel}`
          : `Mission à retravailler : ${currentMicroLabel}`
      );

      setPair(typed.pair);
      setMode(typed.mode);
      setRecommendedStar(typed.recommendedStar);
      setVisibleProgress(typed.visibleProgress);
      setActiveMicroId(typed.pair.microId);

      setMicroStatuses((prev) => ({
        ...prev,
        [typed.pair.microId]:
          prev[typed.pair.microId] === "success" ? "success" : "current",
      }));

      setSelectedOptionId(null);
      setCurrentQuestion(null);
      setAnswer("");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Erreur pendant la correction."
      );
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

  function handleMicroClick(microId: string) {
    void jumpToMicro(microId);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#eef2ff_70%,_#ffffff)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
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
                  {NOTION_OPTIONS.map((item) => (
                    <option key={item} value={item}>
                      {notionLabel(item)}
                    </option>
                  ))}
                </select>
              </Card>
            </section>

            <header className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-6 py-5 text-white">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide">
                      MODE MISSION
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">
                      Tutor Maths V4
                    </h1>
                    <p className="text-sm text-white/90">
                      Clique sur une micro-compétence à droite pour cibler ton entraînement.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <GamePill>
                      🎮 {mode === "evaluation" ? "Évaluation" : "Coaching"}
                    </GamePill>
                    <GamePill>⭐ {stars(recommendedStar)}</GamePill>
                    <GamePill>🔥 Série {visibleProgress.streak}</GamePill>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
                <div className="grid flex-1 gap-3 sm:grid-cols-3">
                  <HeroStat title="Score" value={`${scoreSeanceSur20}/20`} icon="🎯" />
                  <HeroStat
                    title="Points"
                    value={`${earnedPoints}/${possiblePoints}`}
                    icon="⭐"
                  />
                  <HeroStat title="Temps" value={formatDuration(elapsedSeconds)} icon="⏱️" />
                </div>

                <button
                  onClick={() => void startSession()}
                  disabled={busy}
                  className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-black text-white shadow hover:bg-slate-800 disabled:opacity-50"
                >
                  {busy ? "Chargement..." : "Démarrer une mission"}
                </button>
              </div>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
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
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 space-y-1">
                  <div className="text-xl font-black text-slate-900">
                    Choisis ta question
                  </div>
                  <p className="text-sm text-slate-500">
                    Micro active :{" "}
                    <span className="font-semibold">{microLabel(pair.microId)}</span>
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {[pair.optionA, pair.optionB].map((option, idx) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => void chooseOption(option)}
                      disabled={busy}
                      className={`group rounded-[26px] border p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 ${
                        idx === 0
                          ? "border-sky-200 bg-gradient-to-b from-sky-50 to-white"
                          : "border-violet-200 bg-gradient-to-b from-violet-50 to-white"
                      }`}
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="text-base font-black text-slate-900">
                          Question {idx === 0 ? "A" : "B"}
                        </span>
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                          {stars(option.meta.starLevel)}
                        </span>
                      </div>

                      <div className="mb-3 flex flex-wrap gap-2">
                        <Tag>{option.format === "qcm" ? "QCM" : "Réponse libre"}</Tag>
                        <Tag>{microLabel(option.microId)}</Tag>
                        <Tag>{starPoints(option.meta.starLevel)} pts</Tag>
                        {option.canvas ? <Tag>Figure</Tag> : null}
                      </div>

                      {option.canvas ? (
                        <div className="mb-4 rounded-2xl bg-slate-50 p-3">
                          {renderCanvas(option.canvas)}
                        </div>
                      ) : null}

                      <p className="text-base leading-6 text-slate-900">{option.text}</p>
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            {currentQuestion ? (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xl font-black text-slate-900">
                      Mission en cours
                    </div>
                    <p className="text-sm text-slate-500">
                      Compétence :{" "}
                      <span className="font-semibold">
                        {microLabel(currentQuestion.microId)}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                      {stars(currentQuestion.meta.starLevel)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                      {starPoints(currentQuestion.meta.starLevel)} pts
                    </span>
                  </div>
                </div>

                <div className="mb-4 rounded-2xl bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-3 text-sm font-bold text-violet-900">
                  Compétence travaillée : {microLabel(currentQuestion.microId)}
                </div>

                <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-900">
                  {currentQuestion.text}
                </div>

                {currentQuestion.canvas ? (
                  <div className="mb-5 rounded-2xl bg-slate-50 p-3">
                    {renderCanvas(currentQuestion.canvas)}
                  </div>
                ) : null}

                <div className="mb-4 flex flex-wrap gap-2">
                  <Tag>{currentQuestion.format === "qcm" ? "QCM" : "Réponse libre"}</Tag>
                  <Tag>{mode === "evaluation" ? "Évaluation" : "Coaching"}</Tag>
                </div>

                {currentQuestion.format === "qcm" &&
                currentQuestion.choices?.length ? (
                  <div className="space-y-3">
                    <div className="text-sm font-bold text-slate-800">
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
                    <div className="text-sm font-bold text-slate-800">
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
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-black text-white hover:bg-slate-800 disabled:opacity-50"
                    >
                      Valider ma réponse
                    </button>
                  </div>
                )}

                {mode === "coaching" && currentQuestion.hint ? (
                  <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                    <span className="font-black">Indice :</span> {currentQuestion.hint}
                  </div>
                ) : null}

                {feedback ? (
                  <div
                    className={`mt-5 whitespace-pre-line rounded-2xl border px-4 py-4 text-sm font-medium ${feedbackTone(
                      lastResult.ok
                    )}`}
                  >
                    {feedback}
                  </div>
                ) : null}
              </section>
            ) : null}

            {!pair && !currentQuestion ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
                Clique sur <span className="font-bold">Démarrer une mission</span> ou
                sur une micro-compétence à droite.
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
              </div>
            </SidebarCard>

            <SidebarCard title={`Micro-compétences : ${notionLabel(notion)}`}>
              <div className="mb-3 text-xs text-slate-500">
                Clique sur une micro-compétence pour t’entraîner dessus.
              </div>

              <div className="space-y-3">
                {notionMicros.map((microId) => {
                  const status = microStatuses[microId] ?? "idle";
                  const score = microScores[microId] ?? {
                    attempts: 0,
                    success: 0,
                    earnedPoints: 0,
                    possiblePoints: 0,
                  };
                  const isActive = activeMicroId === microId;

                  return (
                    <button
                      key={microId}
                      type="button"
                      onClick={() => handleMicroClick(microId)}
                      disabled={busy}
                      className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:shadow-md disabled:opacity-50 ${
                        statusClasses(status)
                      } ${isActive ? "ring-2 ring-slate-900/20" : ""}`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <div className="text-sm font-semibold leading-5">
                          {microLabel(microId)}
                        </div>

                        <span className="rounded-full bg-white/80 px-2 py-1 text-[11px] font-bold shadow-sm">
                          {statusLabel(status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                        <div className="rounded-xl bg-white/70 px-2 py-1">
                          Score : {scoreOn20(score.earnedPoints, score.possiblePoints)}
                        </div>
                        <div className="rounded-xl bg-white/70 px-2 py-1">
                          Réussites : {score.success}/{score.attempts}
                        </div>
                        <div className="rounded-xl bg-white/70 px-2 py-1">
                          Points : {score.earnedPoints}/{score.possiblePoints}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </SidebarCard>

            <SidebarCard title="Badges gagnés">
              {visibleProgress.unlockedStars.length === 0 ? (
                <p className="text-sm text-slate-500">Aucun badge pour le moment.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {visibleProgress.unlockedStars.map((star) => (
                    <span
                      key={star.id}
                      className="rounded-full bg-amber-100 px-3 py-2 text-xs font-bold text-amber-900"
                    >
                      ⭐ {studentBadgeLabel(star)}
                    </span>
                  ))}
                </div>
              )}
            </SidebarCard>

            <SidebarCard title="Repères">
              <div className="space-y-2 text-sm text-slate-700">
                <p>• Plus une mission a d’étoiles, plus elle rapporte de points.</p>
                <p>• Tu peux choisir la mission qui te paraît la plus adaptée.</p>
                <p>• En coaching, un indice peut apparaître pour t’aider.</p>
                <p>• Certaines missions affichent une figure.</p>
              </div>
            </SidebarCard>
          </aside>
        </div>
      </div>

      <ResultModal
        open={resultModal.open}
        ok={resultModal.ok}
        title={resultModal.title}
        message={resultModal.message}
        onClose={closeResultModal}
      />
    </main>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
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
    <section className="rounded-3xl border border-slate-200 bg-white/95 p-4 shadow-sm">
      <h2 className="mb-3 text-base font-black text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

function HeroStat({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="text-2xl font-black text-slate-900">{value}</div>
    </div>
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
    "Bonnes réponses":
      "bg-gradient-to-r from-green-400 to-emerald-600 text-white",
    "Questions faites":
      "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
  };

  const icons: Record<string, string> = {
    Score: "🎯",
    Temps: "⏱️",
    Points: "⭐",
    "Bonnes réponses": "✅",
    "Questions faites": "📊",
  };

  return (
    <div
      className={`flex items-center justify-between rounded-2xl px-4 py-3 shadow-md ${
        styles[label] ?? "bg-slate-200"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
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

function GamePill({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur-sm">
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

function ResultModal({
  open,
  ok,
  title,
  message,
  onClose,
}: {
  open: boolean;
  ok: boolean;
  title: string;
  message?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      onClose();
    }, 1000);

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div
        className={`w-full max-w-md rounded-[28px] border p-6 shadow-2xl ${
          ok
            ? "border-emerald-200 bg-white"
            : "border-amber-200 bg-white"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-sm ${
              ok
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {ok ? "🎉" : "😅"}
          </div>

          <div>
            <div
              className={`text-2xl font-black ${
                ok ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {title}
            </div>
            <div className="text-sm text-slate-500">
              {ok ? "Ta réponse est correcte." : "Ce n’est pas grave, on continue."}
            </div>
          </div>
        </div>

        {message ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {message}
          </div>
        ) : null}
      </div>
    </div>
  );
}