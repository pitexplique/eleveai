"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import {
  TriangleCanvas,
  QuadrilatereCanvas,
  FigureLibreCanvas,
  DroiteGradueeCanvas,
  ThalesCanvas,
  Solide3DCanvas,
  StatGraphCanvas,
  CanvasProbabilites,
  AngleCanvas,
  FonctionGraphiqueCanvas,
  FonctionTableauCanvas,
  TransformationCanvas,
  TableauDonneesCanvas,
  CalculPoseCanvas ,
  FractionCanvas,
} from "@/lib/tutor-v4/components";

import {
  getNotionMicroMap,
  getNotionOptions,
  notionLabel,
  microLabel,
  type Classe,
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

import { getTutorLesson } from "@/lib/tutor-v4/lessons/getTutorLesson";
import { LessonPanel } from "@/lib/tutor-v4/lessons/components/LessonPanel";

import { useRouter, useSearchParams } from "next/navigation";

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
  classe: Classe;
}) {
  // ❌ plus de message par défaut
  if (args.ok === undefined || !args.microId) {
    return "";
  }

  // ✅ succès → court et impactant
  if (args.ok) {
    return `✅ ${microLabel(args.microId, args.classe)}${
      args.points ? ` +${args.points}` : ""
    }`;
  }

  // ⚠️ erreur → simple
  return args.mode === "coaching"
    ? `⚠️ ${microLabel(args.microId, args.classe)} (indice)`
    : `⚠️ ${microLabel(args.microId, args.classe)}`;
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

  if (canvas.kind === "figure_libre") {
    return <FigureLibreCanvas figure={canvas} />;
  }

  if (canvas.kind === "number_line") {
    return <DroiteGradueeCanvas figure={canvas} />;
  }

  if (canvas.kind === "thales") {
    return <ThalesCanvas figure={canvas} />;
  }

  if (canvas.kind === "solide_3d") {
    return <Solide3DCanvas figure={canvas} />;
  }

  if (canvas.kind === "stat_graph") {
    return <StatGraphCanvas figure={canvas} />;
  }

  if (canvas.kind === "probabilites") {
    return <CanvasProbabilites figure={canvas} />;
  }

  if (canvas.kind === "angle") {
    return <AngleCanvas figure={canvas} />;
  }

  if (canvas.kind === "fonctionGraphique") {
    return <FonctionGraphiqueCanvas figure={canvas} />;
  }

  if (canvas.kind === "fonction_tableau") {
    return <FonctionTableauCanvas figure={canvas} />;
  }

  if (canvas.kind === "transformation") {
    return <TransformationCanvas figure={canvas} />;
  }

  if (canvas.kind === "tableau_donnees") {
    return <TableauDonneesCanvas figure={canvas} />;
  }

  if (canvas.kind === "calcul_pose") {
    return <CalculPoseCanvas figure={canvas} />;
  }

  if (canvas.kind === "fraction") {
    return <FractionCanvas figure={canvas} />;
  }

  return null;
}

function normalizeClasse(value: string | null): Classe {
  if (
    value === "cm2" ||
    value === "6e" ||
    value === "5e" ||
    value === "4e" ||
    value === "3e"
  ) {
    return value;
  }

  return "6e";
}

export default function TutorV4Page() {
  const searchParams = useSearchParams();
  const router = useRouter(); // ✅ ICI

  const [classe, setClasse] = useState<Classe>("6e");
  const [matiere, setMatiere] = useState("maths");
  const [notion, setNotion] = useState("");
  const [urlInitDone, setUrlInitDone] = useState(false);
  const [showLesson, setShowLesson] = useState(false);

  const hasInitializedFromUrl = useRef(false);
  const hasStartedFromUrl = useRef(false);
const initialMicroIdRef = useRef<string | null>(null);
const lastUrlSelectionRef = useRef<string>("");

const questionTopRef = useRef<HTMLDivElement | null>(null);

function scrollToQuestions() {
  window.setTimeout(() => {
    questionTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 80);
}

  const notionOptions = useMemo(() => getNotionOptions(classe), [classe]);
  const notionMicroMap = useMemo(() => getNotionMicroMap(classe), [classe]);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [pair, setPair] = useState<TutorQuestionPair | null>(null);
  const [mode, setMode] = useState<TutorMode>("evaluation");
  const [recommendedStar, setRecommendedStar] = useState<StarLevel>(2);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] =
    useState<TutorQuestionOption | null>(null);

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [explanationText, setExplanationText] = useState("");
  const [wrongAnswerPanelOpen, setWrongAnswerPanelOpen] = useState(false);
  const [lastSubmittedAnswer, setLastSubmittedAnswer] = useState("");

  const [pendingNextPair, setPendingNextPair] = useState<TutorQuestionPair | null>(
    null
  );
  const [pendingNextMode, setPendingNextMode] = useState<TutorMode | null>(null);
  const [pendingNextRecommendedStar, setPendingNextRecommendedStar] =
    useState<StarLevel | null>(null);
  const [pendingNextVisibleProgress, setPendingNextVisibleProgress] =
    useState<VisibleProgress | null>(null);

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

  const [successBanner, setSuccessBanner] = useState<{
    open: boolean;
    title: string;
    message?: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  function isValidNotionId(value: string, currentClasse: Classe): boolean {
    return getNotionOptions(currentClasse).includes(value);
  }

useEffect(() => {
  if (hasInitializedFromUrl.current) return;

  const urlClasse = normalizeClasse(searchParams.get("classe"));
  const urlMatiere = searchParams.get("matiere") ?? "maths";
  const urlNotion = searchParams.get("notion");
  const urlMicroId = searchParams.get("microId");

  const options = getNotionOptions(urlClasse);
  const initialNotion =
    urlNotion && options.includes(urlNotion) ? urlNotion : options[0] ?? "";

  setClasse(urlClasse);
  setMatiere(urlMatiere);
  setNotion(initialNotion);

  initialMicroIdRef.current = urlMicroId;
  hasInitializedFromUrl.current = true;
  setUrlInitDone(true);
}, [searchParams]);

useEffect(() => {
  if (!urlInitDone) return;
  if (!notionOptions.length) return;

  if (!notion || !notionOptions.includes(notion)) {
    setNotion(notionOptions[0]);
  }
}, [urlInitDone, notion, notionOptions]);

useEffect(() => {
  if (!urlInitDone) return;
  if (hasStartedFromUrl.current) return;
  if (!initialMicroIdRef.current) return;
  if (!notion) return;

  hasStartedFromUrl.current = true;
  void startSession(initialMicroIdRef.current);
}, [urlInitDone, notion]);

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

  useEffect(() => {
    if (!successBanner.open) return;

    const timeout = window.setTimeout(() => {
      closeSuccessBanner();
    }, 1200);

    return () => window.clearTimeout(timeout);
  }, [successBanner.open]);

  const bonnesReponses = sessionResults.filter(Boolean).length;
  const nbTentatives = sessionResults.length;

  const scoreSeanceSur20 =
    possiblePoints > 0 ? ((earnedPoints / possiblePoints) * 20).toFixed(1) : "0.0";

  const notionMicros = useMemo(() => {
    if (!notion) return [];
    return notionMicroMap[notion] ?? [];
  }, [notion, notionMicroMap]);

  const currentLesson = useMemo(() => {
  if (!notion) return null;

  return getTutorLesson({
    classe,
    matiere,
    notionId: notion,
    microId: activeMicroId,
    notionLabel: notionLabel(notion, classe),
    microLabel: activeMicroId ? microLabel(activeMicroId, classe) : undefined,
  });
}, [classe, matiere, notion, activeMicroId]);

  function resetMicroStatusesForNotion(notionId: string) {
    const micros = notionMicroMap[notionId] ?? [];
    const initial: Record<string, MicroStatus> = {};
    micros.forEach((microId) => {
      initial[microId] = "idle";
    });
    setMicroStatuses(initial);
  }

  function initMicroScoresForNotion(notionId: string) {
    const micros = notionMicroMap[notionId] ?? [];
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

  function openSuccessBanner(message?: string) {
    setSuccessBanner({
      open: true,
      title: randomSuccessTitle(),
      message,
    });
  }

  function closeSuccessBanner() {
    setSuccessBanner({
      open: false,
      title: "",
      message: "",
    });
  }

  function resetWrongAnswerFlow() {
    setFeedback("");
    setExplanationText("");
    setWrongAnswerPanelOpen(false);
    setLastSubmittedAnswer("");
    setPendingNextPair(null);
    setPendingNextMode(null);
    setPendingNextRecommendedStar(null);
    setPendingNextVisibleProgress(null);
  }

function continueAfterExplanation() {
  if (
    !pendingNextPair ||
    !pendingNextMode ||
    !pendingNextRecommendedStar ||
    !pendingNextVisibleProgress
  ) {
    return;
  }

  setPair(pendingNextPair);
  setMode(pendingNextMode);
  setRecommendedStar(pendingNextRecommendedStar);
  setVisibleProgress(pendingNextVisibleProgress);
  setActiveMicroId(pendingNextPair.microId);

  setMicroStatuses((prev) => ({
    ...prev,
    [pendingNextPair.microId]:
      prev[pendingNextPair.microId] === "success" ? "success" : "current",
  }));

  setSelectedOptionId(null);
  setCurrentQuestion(null);
  setAnswer("");
  resetWrongAnswerFlow();

  scrollToQuestions();
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
    resetWrongAnswerFlow();
    closeSuccessBanner();
    setActiveMicroId(option.microId);

    setMicroStatuses((prev) => ({
      ...prev,
      [option.microId]:
        prev[option.microId] === "success" ? "success" : "current",
    }));
  }

  async function startSession(targetMicroId?: string) {
    if (!notion) return;

    try {
      setBusy(true);
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
      closeSuccessBanner();
      resetWrongAnswerFlow();
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
      setNotion(typed.pair.notionId);
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
      resetWrongAnswerFlow();
      closeSuccessBanner();
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

    if (wrongAnswerPanelOpen) {
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
      const currentMicroLabel = microLabel(currentMicro, classe);
      const pointsForQuestion = starPoints(currentQuestion.meta.starLevel);
      const currentExplanation = currentQuestion.explanation?.trim();
      const hasExplanation =
        typeof currentExplanation === "string" &&
        currentExplanation.length > 0;

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
        scrollToQuestions();
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

      if (typed.result.ok) {
        setFeedback(`Bonne réponse : ${currentMicroLabel}`);
        setExplanationText("");
        setWrongAnswerPanelOpen(false);
        setLastSubmittedAnswer("");

        openSuccessBanner(
          `Mission réussie : ${currentMicroLabel}${
            pointsForQuestion > 0
              ? ` — +${pointsForQuestion} point${
                  pointsForQuestion > 1 ? "s" : ""
                }`
              : ""
          }`
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
        setPendingNextPair(null);
        setPendingNextMode(null);
        setPendingNextRecommendedStar(null);
        setPendingNextVisibleProgress(null);
      } else {
        closeSuccessBanner();
        setFeedback("Ce n’est pas la bonne réponse…");
        setLastSubmittedAnswer(finalAnswer);

        if (hasExplanation) {
          setExplanationText(currentExplanation);
          setWrongAnswerPanelOpen(true);

          setPendingNextPair(typed.pair);
          setPendingNextMode(typed.mode);
          setPendingNextRecommendedStar(typed.recommendedStar);
          setPendingNextVisibleProgress(typed.visibleProgress);
        } else {
          setExplanationText("");
          setWrongAnswerPanelOpen(false);

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
          setPendingNextPair(null);
          setPendingNextMode(null);
          setPendingNextRecommendedStar(null);
          setPendingNextVisibleProgress(null);
        }
      }
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

function handleInputKeyDown(
  e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  if (currentQuestion?.format !== "short") return;

  if (e.key === "Enter" && !busy && !wrongAnswerPanelOpen) {
    e.preventDefault();
    void submitAnswer();
  }
}

  function handleMicroClick(microId: string) {
    void jumpToMicro(microId);
  }

 return (
  <main className="min-h-screen bg-[#f3f4f6] px-2 py-3 sm:px-4 sm:py-6">
    <div className="mx-auto max-w-7xl">
       <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowLesson(true)}
          className="rounded-full bg-sky-500 px-5 py-3 text-sm font-black text-white shadow-xl hover:bg-sky-600"
        >
          📘 Leçon écrite
        </button>
        {showLesson ? (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/60 px-3 py-6">
          <div className="mx-auto max-w-2xl">
            <LessonPanel
              lesson={currentLesson}
              onClose={() => setShowLesson(false)}
            />
          </div>
        </div>
      ) : null}
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <section className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <button
                onClick={() => router.push("/coach-maths-ia")}
                className="flex w-full items-center justify-center rounded-2xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow hover:bg-orange-600"
              >
                ← Retour Coach
              </button>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-800 shadow-sm">
                Classe : {classe}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-500">
                Notion
              </label>
              <select
                value={notion}
                onChange={(e) => {
                  const notionId = e.target.value;
                  setNotion(notionId);
                  setPair(null);
                  setCurrentQuestion(null);
                  setSessionId(null);
                  setActiveMicroId(null);
                  resetWrongAnswerFlow();
                  resetMicroStatusesForNotion(notionId);
                  initMicroScoresForNotion(notionId);
                }}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-bold text-slate-900 outline-none focus:border-orange-500"
              >
                {notionOptions.map((notionId) => (
                  <option key={notionId} value={notionId}>
                    {notionLabel(notionId, classe)}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <header className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg sm:rounded-[28px]">
            <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-5 text-white sm:px-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide">
                    MODE MISSION
                  </div>

                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    Tutor Maths V4
                  </h1>

                  <p className="text-sm text-white/90">
                    Choisis une notion, puis démarre une mission.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <GamePill>
                    🎮 {mode === "evaluation" ? "Évaluation" : "Coaching"}
                  </GamePill>
                  <GamePill>⭐ {stars(recommendedStar)}</GamePill>
                  <GamePill>🔥 Série {visibleProgress.streak}</GamePill>
                </div>
              </div>
            </div>

            <div className="hidden gap-4 px-6 py-5 md:flex md:items-center md:justify-between">
              <div className="grid flex-1 gap-3 sm:grid-cols-3">
                <HeroStat title="Score" value={`${scoreSeanceSur20}/20`} icon="🎯" />
                <HeroStat title="Points" value={`${earnedPoints}/${possiblePoints}`} icon="⭐" />
                <HeroStat title="Temps" value={formatDuration(elapsedSeconds)} icon="⏱️" />
              </div>

              <button
                onClick={() => void startSession()}
                disabled={busy || wrongAnswerPanelOpen || !notion}
                className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-black text-white shadow hover:bg-slate-800 disabled:opacity-50"
              >
                {busy ? "Chargement..." : "Démarrer une mission"}
              </button>
            </div>
          </header>

          <section className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:hidden">
            <h2 className="text-base font-black text-slate-900">Tableau de bord</h2>

            <div className="grid grid-cols-2 gap-3">
              <HeroStat title="Score" value={`${scoreSeanceSur20}/20`} icon="🎯" />
              <HeroStat title="Temps" value={formatDuration(elapsedSeconds)} icon="⏱️" />
            </div>

            <button
              onClick={() => void startSession()}
              disabled={busy || wrongAnswerPanelOpen || !notion}
              className="mt-1 rounded-2xl bg-slate-900 px-5 py-4 text-base font-black text-white shadow hover:bg-slate-800 disabled:opacity-50"
            >
              {busy ? "Chargement..." : "Démarrer une mission"}
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm font-semibold text-slate-800">
                {simpleEncouragement({
                  ok: lastResult.ok,
                  microId: lastResult.microId,
                  points: lastResult.points,
                  mode,
                  classe,
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

          {successBanner.open ? (
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 shadow-sm">
              <div className="text-lg font-black text-emerald-800">
                {successBanner.title}
              </div>
              {successBanner.message ? (
                <div className="mt-1 text-sm font-medium text-emerald-700">
                  {successBanner.message}
                </div>
              ) : null}
            </section>
          ) : null}

          {feedback && !wrongAnswerPanelOpen ? (
            <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
              <div className="text-sm font-semibold text-slate-700">{feedback}</div>
            </section>
          ) : null}

          <div ref={questionTopRef} />
          {pair && !currentQuestion ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 space-y-1">
                <div className="text-xl font-black text-slate-900">
                  Choisis ta question
                </div>
                <p className="text-sm text-slate-500">
                  Compétence active :{" "}
                  <span className="font-semibold">
                    {microLabel(pair.microId, classe)}
                  </span>
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[pair.optionA, pair.optionB].map((option, idx) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => void chooseOption(option)}
                    disabled={busy || wrongAnswerPanelOpen}
                    className={`group rounded-[24px] border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 sm:p-5 ${
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
                      <Tag>
                        {option.format === "qcm"
                          ? "QCM"
                          : option.format === "open"
                          ? "Réponse rédigée"
                          : "Réponse courte"}
                      </Tag>
                      <Tag>{microLabel(option.microId, classe)}</Tag>
                      <Tag>{starPoints(option.meta.starLevel)} pts</Tag>
                      {option.canvas ? <Tag>Figure</Tag> : null}
                    </div>

                    {option.canvas ? (
                      <div className="mb-4 overflow-x-auto rounded-2xl bg-slate-50 p-3">
                        {renderCanvas(option.canvas)}
                      </div>
                    ) : null}

                    <p className="text-base leading-6 text-slate-900">
                      {option.text}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {currentQuestion ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xl font-black text-slate-900">
                    Mission en cours
                  </div>
                  <p className="text-sm text-slate-500">
                    Compétence :{" "}
                    <span className="font-semibold">
                      {microLabel(currentQuestion.microId, classe)}
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

              {!wrongAnswerPanelOpen ? (
                <>
                  <div className="mb-4 rounded-2xl bg-gradient-to-r from-violet-100 to-fuchsia-100 px-4 py-3 text-sm font-bold text-violet-900">
                    Compétence travaillée :{" "}
                    {microLabel(currentQuestion.microId, classe)}
                  </div>

                  <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-900">
                    {currentQuestion.text}
                  </div>

                  {currentQuestion.canvas ? (
                    <div className="mb-5 overflow-x-auto rounded-2xl bg-slate-50 p-3">
                      {renderCanvas(currentQuestion.canvas)}
                    </div>
                  ) : null}

                  <div className="mb-4 flex flex-wrap gap-2">
                    <Tag>
                      {currentQuestion.format === "qcm"
                        ? "QCM"
                        : currentQuestion.format === "open"
                        ? "Réponse rédigée"
                        : "Réponse courte"}
                    </Tag>
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
                            disabled={busy || wrongAnswerPanelOpen}
                            className="rounded-2xl border border-slate-300 bg-white px-4 py-4 text-left text-base font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-50"
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : currentQuestion.format === "open" ? (
                    <div className="space-y-3">
                      <div className="text-sm font-bold text-slate-800">
                        Rédige ta réponse
                      </div>

                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Explique ton raisonnement..."
                        disabled={busy || wrongAnswerPanelOpen}
                        rows={5}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900"
                      />

                      <button
                        onClick={() => void submitAnswer()}
                        disabled={busy || wrongAnswerPanelOpen}
                        className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-base font-black text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto"
                      >
                        Valider ma réponse
                      </button>
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
                        disabled={busy || wrongAnswerPanelOpen}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-base text-slate-900"
                      />

                      <button
                        onClick={() => void submitAnswer()}
                        disabled={busy || wrongAnswerPanelOpen}
                        className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-base font-black text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto"
                      >
                        Valider ma réponse
                      </button>
                    </div>
                  )}

                  {mode === "coaching" && currentQuestion.hint ? (
                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                      <span className="font-black">Indice :</span>{" "}
                      {currentQuestion.hint}
                    </div>
                  ) : null}
                </>
              ) : (
                <WrongAnswerPanel
                  question={currentQuestion}
                  userAnswer={lastSubmittedAnswer}
                  explanation={explanationText}
                  onContinue={continueAfterExplanation}
                />
              )}
            </section>
          ) : null}

          {!pair && !currentQuestion ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm sm:p-10">
              Clique sur <span className="font-bold">Démarrer une mission</span>.
            </div>
          ) : null}
        </div>

        <aside className="hidden space-y-5 lg:block">
          <SidebarCard title="Tableau de bord">
            <div className="grid gap-3">
              <StatLine label="Score" value={`${scoreSeanceSur20}/20`} />
              <StatLine label="Temps" value={formatDuration(elapsedSeconds)} />
              <StatLine label="Points" value={`${earnedPoints}/${possiblePoints}`} />
              <StatLine label="Bonnes réponses" value={`${bonnesReponses}`} />
              <StatLine label="Questions faites" value={`${nbTentatives}`} />
            </div>
          </SidebarCard>

          <SidebarCard title={`Micro-compétences : ${notionLabel(notion, classe)}`}>
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
                    disabled={busy || wrongAnswerPanelOpen}
                    className={`w-full rounded-2xl border px-4 py-3 text-left shadow-sm transition hover:shadow-md disabled:opacity-50 ${
                      statusClasses(status)
                    } ${isActive ? "ring-2 ring-slate-900/20" : ""}`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold leading-5">
                        {microLabel(microId, classe)}
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
  </main>
);
}

function WrongAnswerPanel({
  question,
  userAnswer,
  explanation,
  onContinue,
}: {
  question: TutorQuestionOption;
  userAnswer: string;
  explanation: string;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-sky-200 bg-[#f5f7fa] p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-4xl font-light tracking-tight text-sky-500 md:text-6xl">
              Hmm… pas tout à fait 🤖
            </h2>
            <div className="mt-4 text-lg text-lime-700">La bonne réponse est :</div>
            <div className="mt-2 inline-flex min-w-[96px] items-center justify-center rounded-md border border-sky-400 bg-white px-4 py-2 text-3xl font-semibold text-slate-900 shadow-sm">
              ?
            </div>
          </div>

          <div className="pt-2">
            <ContinueButton onClick={onContinue} />
          </div>
        </div>

        <div className="text-5xl font-light text-lime-700">Explication</div>
      </div>

      <div className="relative rounded-sm border border-violet-200 bg-white p-6 shadow-sm">
        <VerticalRibbon label="examiner" colorClass="bg-lime-500" />
        <div className="pl-2">
          <div className="rounded-xl bg-white p-4">
            <div className="mb-4 text-base text-slate-900">{question.text}</div>

            {question.canvas ? (
              <div className="mb-4 rounded-2xl bg-slate-50 p-3">
                {renderCanvas(question.canvas)}
              </div>
            ) : null}

            <div className="mb-4 inline-flex min-w-[88px] rounded-sm border border-sky-400 bg-[#eaf3ff] px-3 py-2 text-lg text-slate-900">
              {""}
            </div>

            <div className="text-2xl font-light text-lime-700">Ta réponse :</div>
            <div
              className={`mt-3 rounded-sm border border-sky-400 bg-[#eaf3ff] px-3 py-2 text-slate-900 ${
                question.format === "open"
                  ? "min-h-[96px] whitespace-pre-wrap text-base"
                  : "inline-flex min-w-[88px] text-lg"
              }`}
            >
              {userAnswer || "—"}
            </div>
          </div>
        </div>
      </div>

      <div className="relative rounded-sm border border-violet-200 bg-white p-6 shadow-sm">
        <VerticalRibbon label="résoudre" colorClass="bg-orange-400" />
        <div className="pl-2">
          <div className="whitespace-pre-line text-[15px] leading-8 text-slate-900">
            {explanation || "Relis l’énoncé et compare bien les rangs des chiffres."}
          </div>
        </div>
      </div>

      <div className="flex justify-start">
        <ContinueButton onClick={onContinue} />
      </div>
    </div>
  );
}

function ContinueButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-lime-500 px-6 py-3 text-base font-bold text-white shadow hover:bg-lime-600"
    >
      Question suivante
    </button>
  );
}

function VerticalRibbon({
  label,
  colorClass,
}: {
  label: string;
  colorClass: string;
}) {
  return (
    <div
      className={`absolute left-0 top-6 -translate-x-1/2 rounded-sm px-2 py-1 text-sm font-medium text-white shadow ${colorClass}`}
      style={{ writingMode: "vertical-rl", transform: "translateX(-50%) rotate(180deg)" }}
    >
      {label}
    </div>
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
      <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-4">
        <div className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="text-xl font-black text-slate-900 sm:text-2xl">
          {value}
        </div>
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