"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import Link from "next/link";
import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
  token?: string | null;
};

import {
  TriangleCanvas,
  QuadrilatereCanvas,
  FigureLibreCanvas,
  DroiteGradueeCanvas,
  ThalesCanvas,
  Solide3DCanvas,
  StatGraphCanvas,
  CanvasProbabilites,
  ArbreProbabilitesCanvas,
  Repere3dCanvas,
  AngleCanvas,
  FonctionGraphiqueCanvas,
  FonctionTableauCanvas,
  TransformationCanvas,
  TableauDonneesCanvas,
  CalculPoseCanvas,
  FractionCanvas,
  TableauProportionnaliteCanvas,
  ScratchCanvas,
  SectionSolideCanvas,
  AlgebreCanvas,
  SuiteCanvas,
  DureeCanvas,
  ReperageCanvas,
  DroitesCanvas,
  MasseCanvas,
  ContenanceCanvas,
  EchelleCanvas,
  SchemaBarreCanvas
} from "@/lib/canvas";

import {
  getNotionMicroMap,
  getNotionOptions,
  notionLabel,
  microLabel,
  type Classe,
  type Matiere,
} from "@/lib/tutor-v4/catalog";
import {
  defaultDisplayModeForClasse,
  displayParamForClasse,
  type TutorDisplayMode,
} from "@/lib/tutor-v4/displayMode";

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
  RevisionFocus,
} from "@/lib/tutor-v4/types";

import {
  lireQuestionsVues,
  retenirQuestionVue,
} from "@/lib/tutor-v4/memoireQuestions";
// La leçon écrite est retirée du tutor : elle se construisait sur les items
// `fixed` et rendait mal. En attendant de revoir le principe, l'aide passe par
// le Coach IA proposé sur l'écran d'erreur (`CoachErrorHelp`).
import TutorSimpleView from "./TutorSimpleView";
import {
  ListenButton,
  speakText,
  stopSpeak,
  buildReadableQuestion,
  speechLangForMatiere,
} from "./ListenButton";
import AudioBoost from "@/components/AudioBoost";
import { MarkdownMath } from "@/components/MarkdownMath";
import BoiteAOutils from "@/components/BoiteAOutils";
import Image from "next/image";

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
  matiere: Matiere;
}) {
  // ❌ plus de message par défaut
  if (args.ok === undefined || !args.microId) {
    return "";
  }

  // ✅ succès → court et impactant
  if (args.ok) {
    return `✅ ${microLabel(args.microId, args.classe, args.matiere)}${
      args.points ? ` +${args.points}` : ""
    }`;
  }

  // ⚠️ erreur → simple
  return args.mode === "coaching"
    ? `⚠️ ${microLabel(args.microId, args.classe, args.matiere)} (indice)`
    : `⚠️ ${microLabel(args.microId, args.classe, args.matiere)}`;
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

  if (canvas.kind === "arbre_proba") {
    return <ArbreProbabilitesCanvas figure={canvas} />;
  }

  if (canvas.kind === "repere3d") {
    return <Repere3dCanvas figure={canvas} />;
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

if (canvas.kind === "tableau_proportionnalite") {
  return <TableauProportionnaliteCanvas figure={canvas} />;
}

  if (canvas.kind === "calcul_pose") {
    return <CalculPoseCanvas figure={canvas} />;
  }

  if (canvas.kind === "fraction") {
    return <FractionCanvas figure={canvas} />;
  }
  if (canvas.kind === "scratch") {
  return <ScratchCanvas canvas={canvas} />;
 }

 if (canvas.kind === "section_solide") {
  return <SectionSolideCanvas figure={canvas} />;
}

  if (canvas.kind === "algebre") {
    return <AlgebreCanvas figure={canvas} />;
  }

  if (canvas.kind === "suite") {
    return <SuiteCanvas figure={canvas} />;
  }
 
  if (canvas.kind === "duree") {
    return <DureeCanvas figure={canvas} />;
}

if (canvas.kind === "reperage") {
  return <ReperageCanvas figure={canvas} />;
}

if (canvas.kind === "droites") {
  return <DroitesCanvas figure={canvas} />;
}

if (canvas.kind === "masse") {
  return <MasseCanvas figure={canvas} />;
}

if (canvas.kind === "contenance") {
  return <ContenanceCanvas figure={canvas} />;
}

if (canvas.kind === "echelle") {
  return <EchelleCanvas figure={canvas} />;
}

if (canvas.kind === "schema_barre") {
  return <SchemaBarreCanvas figure={canvas} />;
}

  return null;
}

function normalizeClasse(value: string | null): Classe {
  if (
    value === "cp" ||
    value === "ce1" ||
    value === "ce2" ||
    value === "cm1" ||
    value === "cm2" ||
    value === "6e" ||
    value === "5e" ||
    value === "4e" ||
    value === "3e" ||
    value === "seconde" ||
    value === "premiere" ||
    value === "premiere-spe" ||
    value === "terminale-spe" ||
    value === "stmg" ||
    value === "adulte" ||
    value === "a1" ||
    value === "a2" ||
    value === "b1" ||
    value === "b2" ||
    value === "c1" ||
    value === "eco-decouverte" ||
    value === "eco-college" ||
    value === "eco-lycee" ||
    value === "pix-college" ||
    value === "pix-lycee"
  ) {
    return value;
  }

  /* ⚠️ CE REPLI EST MUET, ET IL A MORDU LE 16/08/2026. Une classe absente
     de la liste ci-dessus ne l'est pas rejetée : elle devient « 6e », et
     l'API répond 500 sur une combinaison qui n'existe pas (« Knowledge V4
     introuvable pour 6e/ia »). L'élève voit « Chargement du tutor… » pour
     toujours. Ajouter une classe au catalogue oblige à l'ajouter ICI AUSSI. */
  return "6e";
}

function normalizeMatiere(value: string | null): Matiere {
  if (value === "francais") return "francais";
  if (value === "english-maths") return "english-maths";
  if (value === "economie") return "economie";
  if (value === "espagnol") return "espagnol";
  if (value === "ia") return "ia";
  return "maths";
}

function isPrimaryClasse(value: Classe) {
  return ["cp", "ce1", "ce2", "cm1", "cm2"].includes(value);
}

function normalizeDisplayMode(value: string | null): TutorDisplayMode | null {
  return value === "simple" || value === "complete" ? value : null;
}

function selectSimpleOption(pair: TutorQuestionPair): TutorQuestionOption {
  const options = [pair.optionA, pair.optionB];

  return options.sort((a, b) => {
    const distanceA = Math.abs(a.meta.starLevel - pair.recommendedStar);
    const distanceB = Math.abs(b.meta.starLevel - pair.recommendedStar);

    if (distanceA !== distanceB) return distanceA - distanceB;
    if (a.meta.starLevel !== b.meta.starLevel) {
      return a.meta.starLevel - b.meta.starLevel;
    }

    // À pertinence égale, on départage AU HASARD (et non par longueur de texte) :
    // sinon le mode simple choisissait toujours l'énoncé le plus court, donc
    // toujours le QCM, et n'affichait jamais les questions en saisie libre
    // (orthographe). Appelé dans un effet, pas au rendu → pas de souci d'hydratation.
    return Math.random() - 0.5;
  })[0];
}

export default function TutorV4Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const eleveContext = useEleve() as unknown as { eleve?: EleveSession | null };
  const eleve = eleveContext.eleve ?? null;

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [classe, setClasse] = useState<Classe>("6e");

  const [matiere, setMatiere] = useState<Matiere>("maths");

  // ⛔ L'épreuve anticipée de mathématiques se passe SANS CALCULATRICE : deux
  // heures, coefficient 2, six points d'automatismes en QCM. En première
  // « maths spécifique », la boîte à outils reste donc fermée — on s'entraîne
  // dans les conditions de l'épreuve, et tous les items de cette classe sont
  // écrits pour se calculer de tête (les sujets, eux, fournissent un tableau
  // de puissances quand un calcul le demande).
  const calculatriceAutorisee = matiere === "maths" && classe !== "premiere";
  const [notion, setNotion] = useState("");
  const [urlInitDone, setUrlInitDone] = useState(false);
  const [displayMode, setDisplayMode] = useState<TutorDisplayMode>("simple");
  // Mode « affichage classe » : agrandit énoncé + réponses pour la projection
  // (plus besoin de zoomer le navigateur).
  const [classBoard, setClassBoard] = useState(false);
  // Micro-compétences repliées : on n'affiche le détail qu'au clic.
  const [expandedMicroId, setExpandedMicroId] = useState<string | null>(null);

  const hasInitializedFromUrl = useRef(false);
  const hasStartedFromUrl = useRef(false);
const initialMicroIdRef = useRef<string | null>(null);
const initialUrlClasseRef = useRef<Classe | null>(null);
const initialUrlNotionRef = useRef<string | null>(null);
const hasPreservedInitialUrlNotionRef = useRef(false);
const lastUrlSelectionRef = useRef<string>("");

const questionTopRef = useRef<HTMLDivElement | null>(null);
const hasForcedTopScrollRef = useRef(false);
const autoActivatedPairRef = useRef<string | null>(null);
// Garde synchrone contre le double-envoi : l'état `busy` se met à jour un
// rendu trop tard, donc un double-clic (fréquent sur mobile) peut lancer
// deux fois submitAnswer ; le 2e tombait sur « Aucune question choisie ».
const submitInFlightRef = useRef(false);

function scrollToQuestions() {
  window.setTimeout(() => {
    questionTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 80);
}
function forceScrollTopOnArrival() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  window.requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });

  window.setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, 120);
}
  const notionOptions = useMemo(
    () => getNotionOptions(classe, matiere),
    [classe, matiere]
  );
  const notionMicroMap = useMemo(
    () => getNotionMicroMap(classe, matiere),
    [classe, matiere]
  );

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

  // Prérequis signalés « à réviser » par la remédiation pendant la séance
  // (dédupliqués par micro, le plus récent en tête). Sauvés dans details.
  const [aReviserList, setAReviserList] = useState<RevisionFocus[]>([]);

  // Statut de remédiation EN COURS (bandeau persistant). null = pas en remédiation.
  const [remediationState, setRemediationState] = useState<{
    prereqLabel: string;
    targetLabel: string;
  } | null>(null);

  // ACCESSIBILITÉ — lecture auto à voix haute (pensé pour les élèves déficients
  // visuels). Préférence mémorisée dans localStorage.
  const [autoRead, setAutoRead] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setAutoRead(window.localStorage.getItem("tutorv4-auto-read") === "1");
  }, []);
  function toggleAutoRead() {
    setAutoRead((v) => {
      const next = !v;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("tutorv4-auto-read", next ? "1" : "0");
      }
      if (!next) stopSpeak();
      return next;
    });
  }

  // Langue de lecture : anglais/espagnol → voix cible, le reste → français.
  const speechLang = speechLangForMatiere(matiere);

  // Lit automatiquement la question + les choix dès qu'elle apparaît
  // (sauf sur l'écran de correction).
  useEffect(() => {
    if (!autoRead || wrongAnswerPanelOpen || !currentQuestion) return;
    speakText(buildReadableQuestion(currentQuestion, speechLang), speechLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRead, currentQuestion?.id, wrongAnswerPanelOpen]);

  // Lit automatiquement la correction quand l'écran « mauvaise réponse » s'ouvre.
  useEffect(() => {
    if (!autoRead || !wrongAnswerPanelOpen || !currentQuestion) return;
    const expected = currentQuestion.expected?.join(" ou ") ?? "";
    const { brief } = extractConclusion(explanationText);
    speakText(`Pas tout à fait. La bonne réponse était : ${expected}. ${brief}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRead, wrongAnswerPanelOpen]);

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
    return getNotionOptions(currentClasse, matiere).includes(value);
  }

useEffect(() => {
  if (hasInitializedFromUrl.current) return;

  const urlClasse = normalizeClasse(searchParams.get("classe"));
  const urlMatiere = normalizeMatiere(searchParams.get("matiere"));
  const urlNotion = searchParams.get("notion");
  const urlMicroId = searchParams.get("microId");
  const urlDisplayMode = normalizeDisplayMode(searchParams.get("display"));

  const options = getNotionOptions(urlClasse, urlMatiere);
  const initialNotion =
    urlNotion && options.includes(urlNotion) ? urlNotion : options[0] ?? "";

  initialUrlClasseRef.current = urlClasse;
  initialUrlNotionRef.current = urlNotion;

  setClasse(urlClasse);
  setMatiere(urlMatiere);
  setNotion(initialNotion);
  setDisplayMode(urlDisplayMode ?? defaultDisplayModeForClasse(urlClasse));

  initialMicroIdRef.current = urlMicroId;
  hasInitializedFromUrl.current = true;
  setUrlInitDone(true);
}, [searchParams]);

useEffect(() => {
  if (!urlInitDone) return;
  if (hasForcedTopScrollRef.current) return;

  hasForcedTopScrollRef.current = true;
  forceScrollTopOnArrival();
}, [urlInitDone]);


useEffect(() => {
  if (!urlInitDone) return;
  if (!notionOptions.length) return;

  const initialUrlNotion = initialUrlNotionRef.current;
  const shouldPreserveInitialUrlNotion =
    initialUrlClasseRef.current === classe &&
    initialUrlNotion !== null &&
    notionOptions.includes(initialUrlNotion) &&
    !hasPreservedInitialUrlNotionRef.current;

  if (shouldPreserveInitialUrlNotion) {
    if (notion !== initialUrlNotion) {
      setNotion(initialUrlNotion);
      return;
    }

    hasPreservedInitialUrlNotionRef.current = true;
  }

  if (!notion || !notionOptions.includes(notion)) {
    setNotion(notionOptions[0]);
  }
}, [classe, urlInitDone, notion, notionOptions]);

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

  // L'« affichage classe » est une préférence du prof : on la garde d'une
  // notion à l'autre (et après rechargement) pour ne pas la réactiver sans
  // cesse en classe. Lecture après montage pour éviter un écart d'hydratation.
  useEffect(() => {
    try {
      if (localStorage.getItem("tutorv4-class-board") === "1") {
        setClassBoard(true);
      }
    } catch {
      /* localStorage indisponible : on reste sur l'affichage normal. */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tutorv4-class-board", classBoard ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [classBoard]);

  // Flèches ← → pour enchaîner les notions (télécommande de présentation),
  // dans les deux modes (simple et complet), sauf focus dans un champ.
  useEffect(() => {
    function onKey(event: WindowEventMap["keydown"]) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        shiftNotion(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        shiftNotion(-1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayMode, notion, notionOptions, busy]);

  const bonnesReponses = sessionResults.filter(Boolean).length;
  const nbTentatives = sessionResults.length;

  const scoreSeanceSur20 =
    possiblePoints > 0 ? ((earnedPoints / possiblePoints) * 20).toFixed(1) : "0.0";

  // Tailles agrandies en mode « affichage classe » (sinon valeurs normales).
  const boardQuestionClass = classBoard
    ? "text-2xl leading-relaxed sm:text-3xl"
    : "text-base";
  const boardChoiceClass = classBoard
    ? "py-5 text-xl sm:text-2xl"
    : "py-4 text-base";
  const boardInputClass = classBoard ? "text-xl sm:text-2xl" : "text-base";

  const notionMicros = useMemo(() => {
    if (!notion) return [];
    return notionMicroMap[notion] ?? [];
  }, [notion, notionMicroMap]);

useEffect(() => {
  if (displayMode !== "simple") return;
  if (!sessionId || !pair || currentQuestion || busy || wrongAnswerPanelOpen) return;
  if (autoActivatedPairRef.current === pair.pairId) return;

  autoActivatedPairRef.current = pair.pairId;
  void activateQuestion(sessionId, selectSimpleOption(pair));
}, [displayMode, sessionId, pair, currentQuestion, busy, wrongAnswerPanelOpen]);

  function resetMicroStatusesForNotion(notionId: string) {
    const micros = notionMicroMap[notionId] ?? [];
    const initial: Record<string, MicroStatus> = {};
    micros.forEach((microId) => {
      initial[microId] = "idle";
    });
    setMicroStatuses(initial);
    setAReviserList([]);
    setRemediationState(null);
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
    /* La question est SERVIE : on la retient ici, et pas à la réponse — une
       question vue puis abandonnée a quand même été vue. */
    retenirQuestionVue(classe, matiere, option.id);
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

  async function startSession(targetMicroId?: string, notionOverride?: string) {
    // notionOverride permet de démarrer immédiatement sur une autre notion
    // sans attendre la mise à jour d'état (changement de notion par le prof).
    const activeNotion = notionOverride ?? notion;
    if (!activeNotion) return;

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
      resetMicroStatusesForNotion(activeNotion);
      initMicroScoresForNotion(activeNotion);
      setActiveMicroId(targetMicroId ?? null);

      const res = await fetch("/api/tutor-v4/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classe,
          matiere,
          notion: activeNotion,
          microId: targetMicroId,
          displayMode,
          /* Ce que cet élève a déjà vu, gardé d'une séance à l'autre : sans
             cela le coach lui reposerait les questions d'hier. */
          seenQuestionIds: lireQuestionsVues(classe, matiere),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback(data?.error ?? "Erreur au démarrage du tutor.");
        return;
      }

      const typed = data as StartResponse;

      setSessionId(typed.sessionId);
      setRemediationState(null);
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

  // Change de notion ET démarre directement une mission : pour un prof qui
  // passe d'une notion à l'autre en classe, plus besoin de recliquer « Démarrer ».
  function goToNotion(notionId: string) {
    if (!notionId) return;
    // Reclic sur la notion déjà en cours : on ne relance pas inutilement.
    if (notionId === notion && pair) return;
    setNotion(notionId);
    setExpandedMicroId(null);
    void startSession(undefined, notionId);
  }

  // ⭐ LE RETOUR AU COACH RAMÈNE LA CLASSE (18/08/2026, signalé par Frédéric).
  //
  // Le bouton renvoyait vers `/coach-ia/<matiere>` tout court. Le coach, lui,
  // lit la classe dans `?classe=`, puis dans le compte de l'élève connecté,
  // puis retombe sur son repli — la 6e en maths, le CP en français. Un
  // professeur qui n'est pas connecté en tant qu'élève partait donc de sa
  // classe, entrait dans le tutor (qui la recevait bien), et revenait en 6e :
  // toute sa navigation était à refaire à chaque aller-retour.
  //
  // ⛔ LA CLASSE, ET RIEN D'AUTRE. On a d'abord renvoyé `?notion=` aussi, pour
  // revenir devant la notion qu'on travaillait. Mauvaise idée : côté coach ce
  // paramètre ne sélectionne pas une notion, il PRÉ-REMPLIT LA BARRE DE
  // RECHERCHE (usage venu de l'évaluation blanche, où il vaut « 2.3 »). On y
  // écrivait donc un identifiant technique — `fractions_rationnelles` — que le
  // filtre compare aux libellés affichés : il ne matche rien, et la liste des
  // notions revenait VIDE. Frédéric, 18/08 : « laisse le champ vide au retour ».
  function retourCoach() {
    router.push(
      `/coach-ia/${matiere}?classe=${encodeURIComponent(classe)}`,
    );
  }

  // Notion précédente / suivante (rebouclage), pour enchaîner au clic ou au clavier.
  function shiftNotion(delta: number) {
    if (busy || !notionOptions.length) return;
    const index = notionOptions.indexOf(notion);
    const base = index === -1 ? 0 : index;
    const nextIndex =
      (base + delta + notionOptions.length) % notionOptions.length;
    goToNotion(notionOptions[nextIndex]);
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
    if (submitInFlightRef.current) {
      return;
    }

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

    submitInFlightRef.current = true;

    try {
      setBusy(true);

      const currentMicro = currentQuestion.microId;
      const currentMicroLabel = microLabel(currentMicro, classe, matiere);
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
        const message = String(data?.error ?? "");

        // Le serveur a perdu le choix courant (course/persistance de session).
        // Plutôt que d'afficher une erreur bloquante, on relance la mission :
        // on réactive la question affichée si possible, sinon on redémarre.
        if (message.includes("Aucune question choisie")) {
          try {
            await activateQuestion(sessionId, currentQuestion);
            setFeedback("");
          } catch {
            await startSession(activeMicroId ?? undefined);
          }
          return;
        }

        setFeedback(data?.error ?? "Erreur pendant la correction.");
        return;
      }

      const typed = data as AnswerResponse;

      // Remédiation : on a été rerouté vers un prérequis → on le note « à réviser ».
      if (typed.aReviser) {
        const rev = typed.aReviser;
        setAReviserList((prev) =>
          [rev, ...prev.filter((r) => r.microId !== rev.microId)].slice(0, 8)
        );
      }

      // Bandeau persistant : présent tant qu'on est en remédiation, null sinon.
      setRemediationState(typed.remediation ?? null);

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
        // Si la remédiation s'est déclenchée, on montre le message causal du
        // serveur (« c'est les tables qui bloquent… »), sinon message générique.
        setFeedback(
          typed.aReviser ? typed.feedback : "Ce n’est pas la bonne réponse…"
        );
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
      submitInFlightRef.current = false;
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

  async function enregistrerSeance() {
    setSaveMessage(null);

    if (!eleve) {
      setSaveMessage("Tu dois être connecté pour enregistrer ta séance.");
      return;
    }

    if (nbTentatives === 0) {
      setSaveMessage("Fais au moins une question avant d'enregistrer.");
      return;
    }

    const codeEtablissement = eleve.code_etablissement?.trim() ?? "";
    const codeUtilisateur = eleve.code_eleve?.trim() ?? eleve.code_utilisateur?.trim() ?? "";

    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Impossible d'identifier ton compte élève.");
      return;
    }

    setSaving(true);

    const scoreSur20 = possiblePoints > 0
      ? parseFloat(((earnedPoints / possiblePoints) * 20).toFixed(1))
      : 0;

    // Insert via /api/resultats : identité prise dans le jeton de session.
    const { error } = await saveResultat(eleve, "tutor", {
      classe,
      matiere,
      notion_id: notion,
      mode,
      score_sur_20: scoreSur20,
      earned_points: earnedPoints,
      possible_points: possiblePoints,
      bonnes_reponses: bonnesReponses,
      nb_tentatives: nbTentatives,
      temps_sec: elapsedSeconds,
      details: {
        notionLabel: notionLabel(notion, classe, matiere),
        microStatuses,
        microScores,
        aReviser: aReviserList,
        badges: visibleProgress.unlockedStars,
        savedAt: new Date().toISOString(),
      },
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveMessage("Erreur : la séance n'a pas été enregistrée.");
      return;
    }

    setSaveMessage("Séance enregistrée ✅");
  }

  // Ressources internes proposées après la réponse de l'IA : on entraîne sur le
  // micro raté + quelques voisins de la même notion (liens vers le tutor ciblé).
  const coachSuggestions = currentQuestion
    ? (() => {
        const nId = currentQuestion.notionId;
        const micros = notionMicroMap[nId] ?? [];
        const ordered = [
          currentQuestion.microId,
          ...micros.filter((m) => m !== currentQuestion.microId),
        ];
        return ordered.slice(0, 3).map((mId) => ({
          label: microLabel(mId, classe, matiere),
          href: `/tutor-v4?classe=${encodeURIComponent(
            classe
          )}&matiere=${encodeURIComponent(matiere)}&notion=${encodeURIComponent(
            nId
          )}&microId=${encodeURIComponent(mId)}&${displayParamForClasse(classe)}`,
        }));
      })()
    : [];

  // Contexte transmis au Coach IA pour « Aide-toi de notre Coach IA » sur une
  // erreur. RGPD : classe oui, prénom/nom JAMAIS.
  const coachContext: CoachContext = {
    codeEtablissement: eleve?.code_etablissement?.trim() ?? "",
    codeUtilisateur:
      eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "",
    classe,
    notionLabel: currentQuestion
      ? notionLabel(currentQuestion.notionId, classe, matiere)
      : "",
    suggestions: coachSuggestions,
  };

  const questionListenButton = currentQuestion ? (
    <ListenButton
      text={buildReadableQuestion(currentQuestion, speechLang)}
      lang={speechLang}
      label="Écouter la question"
      className="inline-flex items-center gap-1 rounded-full border border-sky-300 bg-white px-3 py-1.5 text-xs font-black text-sky-700 shadow-sm hover:bg-sky-50"
    />
  ) : null;

  const remediationBanner = remediationState ? (
    <div className="mb-4 flex items-start gap-3 rounded-2xl border-2 border-amber-300 bg-amber-50 px-4 py-3 shadow-sm">
      <span className="text-xl leading-none">🔧</span>
      <p className="text-sm font-bold text-amber-900">
        Remédiation en cours — on consolide d&apos;abord «&nbsp;{remediationState.prereqLabel}&nbsp;».
        <span className="font-semibold text-amber-700">
          {" "}On reviendra à «&nbsp;{remediationState.targetLabel}&nbsp;» juste après.
        </span>
      </p>
    </div>
  ) : null;

  if (displayMode === "simple") {
    return (
      <>
        <TutorSimpleView
          remediationBanner={remediationBanner}
          questionListenButton={questionListenButton}
          autoRead={autoRead}
          onToggleAutoRead={toggleAutoRead}
          classe={classe}
          matiere={matiere}
          notionLabel={notion ? notionLabel(notion, classe, matiere) : "Entraînement"}
          microLabel={
            currentQuestion
              ? microLabel(currentQuestion.microId, classe, matiere)
              : activeMicroId
              ? microLabel(activeMicroId, classe, matiere)
              : undefined
          }
          currentQuestion={currentQuestion}
          answer={answer}
          setAnswer={setAnswer}
          busy={busy}
          feedback={feedback}
          wrongAnswerPanelOpen={wrongAnswerPanelOpen}
          wrongAnswerPanel={
            currentQuestion ? (
              <WrongAnswerPanel
                question={currentQuestion}
                userAnswer={lastSubmittedAnswer}
                explanation={explanationText}
                onContinue={continueAfterExplanation}
                coach={coachContext}
              />
            ) : null
          }
          score={scoreSeanceSur20}
          elapsedTime={formatDuration(elapsedSeconds)}
          questionsDone={nbTentatives}
          currentStar={recommendedStar}
          mode={mode}
          streak={visibleProgress.streak}
          classBoard={classBoard}
          onToggleClassBoard={() => setClassBoard((v) => !v)}
          notion={notion}
          notionOptions={notionOptions.map((id) => ({
            id,
            label: notionLabel(id, classe, matiere),
          }))}
          onSelectNotion={goToNotion}
          onPrevNotion={() => shiftNotion(-1)}
          onNextNotion={() => shiftNotion(1)}
          renderCanvas={(question) => renderCanvas(question.canvas)}
          onBackCoach={retourCoach}
          onSwitchToComplete={() => setDisplayMode("complete")}
          onStart={() => void startSession(activeMicroId ?? undefined)}
          onSubmit={() => void submitAnswer()}
          onQcmClick={(choice) => void handleQcmClick(choice)}
          onInputKeyDown={handleInputKeyDown}
          isLoggedIn={!!eleve}
          canSave={nbTentatives > 0}
          saving={saving}
          saveMessage={saveMessage}
          onSave={() => void enregistrerSeance()}
        />
        {calculatriceAutorisee && <BoiteAOutils />}
      </>
    );
  }

 return (
  <main className="min-h-screen bg-[#f3f4f6] px-2 py-3 sm:px-4 sm:py-6">
    <div className="mx-auto max-w-7xl">
       {remediationBanner}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          {/* Contrôles + notion sur une seule ligne pour garder la question
              dans l'écran sans avoir à scroller. */}
          <section className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              onClick={retourCoach}
              className="flex items-center justify-center rounded-2xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white shadow hover:bg-orange-600"
            >
              ← Retour Coach
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-black text-slate-800 shadow-sm">
              Classe : {classe}
            </div>

            <button
              type="button"
              onClick={() => setDisplayMode("simple")}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-black text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Mode simple
            </button>


            <button
              type="button"
              onClick={() => setClassBoard((v) => !v)}
              aria-pressed={classBoard}
              className={`rounded-2xl border px-4 py-2.5 text-center text-sm font-black shadow-sm ${
                classBoard
                  ? "border-indigo-500 bg-indigo-600 text-white hover:bg-indigo-500"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              {classBoard ? "🔍 Affichage classe : on" : "🔍 Affichage classe"}
            </button>

            {/* Navigation rapide entre notions : ◀ ▶ (ou flèches clavier),
                et le changement démarre directement une mission. */}
            <div className="flex min-w-0 flex-1 items-stretch gap-2">
              <button
                type="button"
                onClick={() => shiftNotion(-1)}
                disabled={busy || notionOptions.length < 2}
                aria-label="Notion précédente"
                title="Notion précédente (←)"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              >
                ◀
              </button>

              <select
                aria-label="Notion"
                value={notion}
                onChange={(e) => goToNotion(e.target.value)}
                disabled={busy}
                className="min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 outline-none focus:border-orange-500 disabled:opacity-60"
              >
                {notionOptions.map((notionId) => (
                  <option key={notionId} value={notionId}>
                    {notionLabel(notionId, classe, matiere)}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => shiftNotion(1)}
                disabled={busy || notionOptions.length < 2}
                aria-label="Notion suivante"
                title="Notion suivante (→)"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-40"
              >
                ▶
              </button>
            </div>
          </section>

          <header className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-lg sm:rounded-[28px]">
            <div className="bg-gradient-to-r from-indigo-600 via-sky-600 to-cyan-500 px-4 py-4 text-white sm:px-6">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Tout le bandeau mission sur une seule ligne. Les pastilles
                    sont masquées sur petit écran pour alléger l'affichage. */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wide">
                    MODE MISSION
                  </div>
                  <h1 className="text-xl font-black tracking-tight sm:text-2xl">
                    Tutor {matiere === "francais" ? "Français" : "Maths"} V4
                  </h1>
                  <div className="hidden flex-wrap items-center gap-2 sm:flex">
                    <GamePill>
                      🎮 {mode === "evaluation" ? "Évaluation" : "Coaching"}
                    </GamePill>
                    <GamePill>⭐ {stars(recommendedStar)}</GamePill>
                    <GamePill>🔥 Série {visibleProgress.streak}</GamePill>
                  </div>
                </div>

                {/* Score/Temps vivent désormais uniquement dans le Tableau de
                    bord à droite : ici on ne garde que les actions. */}
                <div className="hidden flex-col items-stretch gap-2 md:flex md:w-56">
                  <button
                    onClick={() => void startSession()}
                    disabled={busy || wrongAnswerPanelOpen || !notion}
                    className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-900 shadow hover:bg-slate-100 disabled:opacity-50"
                  >
                    {busy ? "Chargement..." : "Démarrer une mission"}
                  </button>

                  {nbTentatives > 0 && (
                    eleve ? (
                      <button
                        type="button"
                        onClick={() => void enregistrerSeance()}
                        disabled={saving}
                        className="rounded-2xl bg-emerald-500 px-6 py-2.5 text-sm font-black text-white shadow hover:bg-emerald-400 disabled:opacity-60"
                      >
                        {saving ? "Enregistrement..." : "✅ Enregistrer ma séance"}
                      </button>
                    ) : (
                      <Link
                        href="/auth/signin-eleve"
                        className="rounded-2xl bg-amber-500 px-6 py-2.5 text-center text-sm font-black text-white shadow hover:bg-amber-400"
                      >
                        Se connecter pour enregistrer
                      </Link>
                    )
                  )}

                  {saveMessage && (
                    <p className={[
                      "rounded-2xl px-4 py-2 text-xs font-black text-center",
                      saveMessage.includes("✅") ? "bg-white/90 text-emerald-800" : "bg-white/90 text-red-700",
                    ].join(" ")}>
                      {saveMessage}
                    </p>
                  )}
                </div>
              </div>
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

            {/* Enregistrement aussi sur mobile : un élève connecté doit pouvoir
                sauvegarder sa séance depuis son téléphone. */}
            {nbTentatives > 0 && (
              eleve ? (
                <button
                  type="button"
                  onClick={() => void enregistrerSeance()}
                  disabled={saving}
                  className="rounded-2xl bg-emerald-500 px-5 py-3 text-base font-black text-white shadow hover:bg-emerald-400 disabled:opacity-60"
                >
                  {saving ? "Enregistrement..." : "✅ Enregistrer ma séance"}
                </button>
              ) : (
                <Link
                  href="/auth/signin-eleve"
                  className="rounded-2xl bg-amber-500 px-5 py-3 text-center text-base font-black text-white shadow hover:bg-amber-400"
                >
                  Se connecter pour enregistrer
                </Link>
              )
            )}

            {saveMessage && (
              <p className={[
                "rounded-2xl px-4 py-2 text-sm font-black text-center",
                saveMessage.includes("✅") ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700",
              ].join(" ")}>
                {saveMessage}
              </p>
            )}
          </section>

          {(() => {
            // N'affiche la barre d'encouragement que si elle a un contenu :
            // sinon elle prenait une ligne vide et poussait la question hors écran.
            const encouragement = simpleEncouragement({
              ok: lastResult.ok,
              microId: lastResult.microId,
              points: lastResult.points,
              mode,
              classe,
              matiere,
            });
            const progressText = visibleProgressText(visibleProgress.encouragement);
            const hasContent =
              !!encouragement ||
              !!progressText ||
              visibleProgress.unlockedStars.length > 0;

            if (!hasContent) return null;

            return (
              <section className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-sm font-semibold text-slate-800">
                    {encouragement}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {progressText ? (
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-900">
                        {progressText}
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
            );
          })()}

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
              <MarkdownMath className="text-sm font-semibold text-slate-700">{feedback}</MarkdownMath>
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
                    {microLabel(pair.microId, classe, matiere)}
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
                      <Tag>{microLabel(option.microId, classe, matiere)}</Tag>
                      <Tag>{starPoints(option.meta.starLevel)} pts</Tag>
                      {option.canvas ? <Tag>Figure</Tag> : null}
                    </div>

                    {option.canvas ? (
                      <div className="mb-4 overflow-x-auto rounded-2xl bg-slate-50 p-3">
                        {renderCanvas(option.canvas)}
                      </div>
                    ) : null}

                    <MarkdownMath className={`leading-6 text-slate-900 ${boardQuestionClass}`}>
                      {option.text}
                    </MarkdownMath>

                    {option.audioSrc ? (
                      <div
                        className="mt-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <AudioBoost
                          key={option.audioSrc}
                          src={option.audioSrc}
                          gain={3.5}
                          compact
                        />
                      </div>
                    ) : null}
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
                      {microLabel(currentQuestion.microId, classe, matiere)}
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
                  <MarkdownMath className={`mb-3 rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 ${boardQuestionClass}`}>
                    {currentQuestion.text}
                  </MarkdownMath>

                  {currentQuestion.audioSrc ? (
                    <div className="mb-5 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-sky-600">
                        🔊 Écoute et réponds
                      </p>
                      <AudioBoost
                        key={currentQuestion.audioSrc}
                        src={currentQuestion.audioSrc}
                        autoPlay
                        gain={3.5}
                      />
                    </div>
                  ) : null}

                  {currentQuestion.canvas ? (
                    <div className="mb-5 overflow-x-auto rounded-2xl bg-slate-50 p-3">
                      {renderCanvas(currentQuestion.canvas)}
                    </div>
                  ) : null}

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
                            className={`rounded-2xl border border-slate-300 bg-white px-4 text-left font-medium text-slate-900 transition hover:bg-slate-50 disabled:opacity-50 ${boardChoiceClass}`}
                          >
                            <MarkdownMath inline>{choice}</MarkdownMath>
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
                        className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 ${boardInputClass}`}
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
                        className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-4 text-slate-900 ${boardInputClass}`}
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
                      <MarkdownMath inline>{currentQuestion.hint}</MarkdownMath>
                    </div>
                  ) : null}
                </>
              ) : (
                <WrongAnswerPanel
                  question={currentQuestion}
                  userAnswer={lastSubmittedAnswer}
                  explanation={explanationText}
                  onContinue={continueAfterExplanation}
                  coach={coachContext}
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

          <SidebarCard title={`Micro-compétences : ${notionLabel(notion, classe, matiere)}`}>
            <div className="mb-3 text-xs text-slate-500">
              Clique sur une micro-compétence pour voir le détail.
            </div>

            <div className="space-y-2">
              {notionMicros.map((microId) => {
                const status = microStatuses[microId] ?? "idle";
                const score = microScores[microId] ?? {
                  attempts: 0,
                  success: 0,
                  earnedPoints: 0,
                  possiblePoints: 0,
                };
                const isActive = activeMicroId === microId;
                const isOpen = expandedMicroId === microId;

                return (
                  <div
                    key={microId}
                    className={`rounded-2xl border shadow-sm ${statusClasses(
                      status
                    )} ${isActive ? "ring-2 ring-slate-900/20" : ""}`}
                  >
                    {/* Ligne repliée : une seule ligne, détail au clic. */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMicroId(isOpen ? null : microId)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left"
                    >
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                        {microLabel(microId, classe, matiere)}
                      </span>
                      <span className="shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold shadow-sm">
                        {statusLabel(status)}
                      </span>
                      <span
                        className={`shrink-0 text-xs transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </button>

                    {isOpen ? (
                      <div className="space-y-2 px-3 pb-3">
                        <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-700">
                          <div className="rounded-xl bg-white/70 px-2 py-1">
                            Score :{" "}
                            {scoreOn20(score.earnedPoints, score.possiblePoints)}
                          </div>
                          <div className="rounded-xl bg-white/70 px-2 py-1">
                            Réussites : {score.success}/{score.attempts}
                          </div>
                          <div className="rounded-xl bg-white/70 px-2 py-1">
                            Points : {score.earnedPoints}/{score.possiblePoints}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleMicroClick(microId)}
                          disabled={busy || wrongAnswerPanelOpen}
                          className="w-full rounded-xl bg-slate-900 px-3 py-2 text-xs font-black text-white shadow hover:bg-slate-800 disabled:opacity-50"
                        >
                          S’entraîner sur cette compétence
                        </button>
                      </div>
                    ) : null}
                  </div>
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
    {calculatriceAutorisee && <BoiteAOutils />}
  </main>
);
}

// Isole la « Conclusion : … » d'une explication structurée (Définition / Méthode
// / Calcul / Conclusion) pour n'afficher que l'essentiel par défaut. Si le
// format n'est pas reconnu, on garde le texte entier comme résumé.
function extractConclusion(explanation: string): {
  brief: string;
  full: string;
  hasMore: boolean;
} {
  const full = (explanation || "").trim();
  const m = full.match(/Conclusion\s*:\s*([\s\S]*)$/i);
  const brief = m ? m[1].trim() : full;
  return { brief, full, hasMore: full.length > 0 && brief !== full };
}

type CoachContext = {
  codeEtablissement: string;
  codeUtilisateur: string;
  classe: string;
  notionLabel: string;
  // Ressources internes proposées après la réponse de l'IA (entraînements ciblés).
  suggestions: { label: string; href: string }[];
};

// « Aide-toi de notre Coach IA » : à la demande, l'IA explique l'erreur précise
// de l'élève et il peut rebondir. RGPD : on envoie la classe, JAMAIS le prénom.
function CoachErrorHelp({
  question,
  userAnswer,
  explanation,
  coach,
}: {
  question: TutorQuestionOption;
  userAnswer: string;
  explanation: string;
  coach: CoachContext;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "coach" | "eleve"; content: string }[]
  >([]);
  const [followup, setFollowup] = useState("");
  const [loading, setLoading] = useState(false);

  const canAsk = Boolean(coach.codeEtablissement && coach.codeUtilisateur);
  const expectedAnswer =
    question.expected && question.expected.length > 0
      ? question.expected.join(" ou ")
      : "";

  async function ask(studentQuestion: string, showUser: boolean) {
    if (showUser) {
      setMessages((prev) => [...prev, { role: "eleve", content: studentQuestion }]);
    }
    setLoading(true);
    try {
      const res = await fetch("/api/parcours/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // RGPD : classe envoyée, JAMAIS le prénom/nom de l'élève.
          codeEtablissement: coach.codeEtablissement,
          codeUtilisateur: coach.codeUtilisateur,
          classe: coach.classe,
          notionId: question.notionId,
          notionLabel: coach.notionLabel,
          questionText: question.text,
          studentAnswer: userAnswer || "Aucune réponse",
          expectedAnswer,
          explanation,
          studentQuestion,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        answer?: string;
        error?: string;
      };
      if (!res.ok || !data.answer) throw new Error(data.error ?? "indisponible");
      setMessages((prev) => [...prev, { role: "coach", content: data.answer! }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "coach",
          content:
            "Je n'arrive pas à répondre pour le moment. Réessaie dans un instant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function start() {
    setOpen(true);
    if (messages.length === 0) {
      void ask(
        "Aide-moi à comprendre mon erreur et ce que je dois corriger.",
        false
      );
    }
  }

  function submitFollowup() {
    const t = followup.trim();
    if (!t || loading) return;
    setFollowup("");
    void ask(t, true);
  }

  if (!open) {
    return (
      <div className="flex justify-center">
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 px-5 py-2.5 text-sm font-black text-white shadow-md transition hover:brightness-105"
        >
          🤖 Aide-toi de notre Coach IA
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-cyan-200 bg-[#05213f] p-4 text-white shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-black">🤖 Coach IA — ton erreur</span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold hover:bg-white/30"
        >
          ✕
        </button>
      </div>

      {!canAsk ? (
        <p className="text-sm font-semibold text-white/80">
          Connecte-toi pour demander de l&apos;aide au Coach IA.
        </p>
      ) : (
        <>
          <div className="space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`rounded-2xl px-3 py-2 text-sm font-semibold leading-relaxed ${
                  m.role === "coach"
                    ? "bg-white/10 text-white/90"
                    : "ml-6 bg-emerald-500/30 text-white"
                }`}
              >
                <div>{m.content}</div>
                {m.role === "coach" ? (
                  <ListenButton
                    text={m.content}
                    className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-cyan-200 hover:bg-white/20"
                  />
                ) : null}
              </div>
            ))}
            {loading ? (
              <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm text-white/60">
                Je réfléchis…
              </div>
            ) : null}
          </div>

          {messages.some((m) => m.role === "coach") &&
          coach.suggestions.length > 0 ? (
            <div className="mt-3 rounded-2xl bg-white/5 p-3">
              <p className="mb-2 text-xs font-black uppercase tracking-wide text-cyan-300">
                📚 EleveAI te propose de réviser
              </p>
              <div className="flex flex-wrap gap-2">
                {coach.suggestions.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-100 transition hover:bg-emerald-500/30"
                  >
                    🎯 {s.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-3 flex gap-2">
            <input
              value={followup}
              onChange={(e) => setFollowup(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitFollowup();
                }
              }}
              placeholder="Pose une question au coach…"
              disabled={loading}
              className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white placeholder-white/40 outline-none focus:border-emerald-400 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={submitFollowup}
              disabled={!followup.trim() || loading}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-black text-white disabled:opacity-40"
            >
              Envoyer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function WrongAnswerPanel({
  question,
  userAnswer,
  explanation,
  onContinue,
  coach,
}: {
  question: TutorQuestionOption;
  userAnswer: string;
  explanation: string;
  onContinue: () => void;
  coach?: CoachContext;
}) {
  const [showDetail, setShowDetail] = useState(false);

  const correctAnswer =
    question.expected && question.expected.length > 0
      ? question.expected.join(" ou ")
      : "—";

  const { brief, full, hasMore } = extractConclusion(explanation);

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-sky-200 bg-[#f5f7fa] p-6 text-center">
        {/* ⭐ TI MARGO À LA PLACE DU ROBOT (18/08/2026). Un émoji robot annonçait
            l'erreur — or ce n'est pas une machine qui accompagne l'élève ici,
            c'est le margouillat de l'accueil, des cahiers et des vidéos. Le
            robot reste sur le Coach IA plus bas : celui-là EST une IA, et il
            doit se dire.
            « Hmm… pas tout à fait » est parti avec lui : la phrase devient un
            mensonge quand l'élève a répondu au hasard, et un élève le sent.
            « Ce n'est pas encore ça » reste vrai dans tous les cas, et le
            « encore » laisse la porte ouverte — du CP à la Terminale.
            ⚠️ `ti-margo-112.webp` (4,8 Ko) et non `ti-margo.png` (163 Ko pour
            un dessin de 56 px), avec `unoptimized` : ce bandeau naît au moment
            où l'élève se trompe, donc l'image se télécharge à cet instant
            précis. On lui sert un fichier déjà à la bonne taille, sans passer
            par l'optimiseur Vercel — le vrai dessin au prix d'un émoji. */}
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/cahier-vacances/ti-margo-112.webp"
            alt="Ti Margo, le margouillat d'EleveAI"
            width={90}
            height={112}
            unoptimized
            className="h-9 w-auto md:h-10"
          />
          <h2 className="text-2xl font-light tracking-tight text-sky-500 md:text-3xl">
            Ce n’est pas encore ça
          </h2>
        </div>

        {/* ⭐⭐ L'ÉNONCÉ REVIENT SOUS LES YEUX (18/08/2026, idée de Frédéric).
            Le bandeau remplaçait la question : l'élève lisait « la bonne réponse
            était : alors » sans plus voir de quoi on parlait, et la correction
            courte du CP — « Le mot est "alors" » — devenait illisible. C'est le
            défaut qui a lancé cette session, sur une capture de Langage oral.
            L'ordre compte : la question, PUIS la réponse. L'inverse demanderait
            à l'élève de retenir une réponse avant de savoir à quoi elle répond.
            Ti Margo et le titre ont maigri d'un cran pour lui faire la place —
            le bandeau ne grandit donc pas, il se réorganise.
            ⚠️ `whitespace-pre-line` : les énoncés portent leurs propres retours
            à la ligne (« On te dit :\n« … » »), et sans lui tout se recollait en
            un seul paragraphe. `MarkdownMath` parce qu'un énoncé de maths
            contient des formules — sinon on afficherait le LaTeX brut.
            ⏳ La FIGURE ne revient pas : le canvas se dessine dans la vue
            parente, ce panneau ne le reçoit pas. Sur une question de géométrie
            (« quelle est l'aire de ce triangle ? »), le rappel reste donc
            incomplet. */}
        {question.text ? (
          <div className="mx-auto mt-4 max-w-2xl rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              La question
            </div>
            <MarkdownMath className="whitespace-pre-line text-sm font-semibold leading-6 text-slate-700">
              {question.text}
            </MarkdownMath>
          </div>
        ) : null}

        <div className="mt-4 text-base font-medium text-slate-500">
          La bonne réponse était :
        </div>
        <div className="mt-2 inline-flex min-w-[88px] items-center justify-center rounded-2xl border-2 border-lime-400 bg-white px-5 py-2 text-3xl font-bold text-lime-700 shadow-sm">
          <MarkdownMath inline>{correctAnswer}</MarkdownMath>
        </div>

        {userAnswer ? (
          <div className="mt-3 text-sm font-semibold text-slate-400">
            Ta réponse : {userAnswer}
          </div>
        ) : null}
      </div>

      <div className="rounded-[28px] border border-violet-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-sm font-bold uppercase tracking-wide text-orange-500">
            Explication
          </span>
          <div className="flex items-center gap-2">
            <ListenButton text={showDetail ? full : brief} />
            {hasMore ? (
              <button
                type="button"
                onClick={() => setShowDetail((v) => !v)}
                className="rounded-full border border-violet-200 px-3 py-1 text-xs font-bold text-violet-600 hover:bg-violet-50"
              >
                {showDetail ? "Masquer le détail" : "Voir le détail"}
              </button>
            ) : null}
          </div>
        </div>
        <MarkdownMath className="whitespace-pre-line text-[15px] leading-7 text-slate-900">
          {showDetail
            ? full
            : brief || "Relis l’énoncé et compare bien les nombres."}
        </MarkdownMath>
      </div>

      {coach ? (
        <CoachErrorHelp
          question={question}
          userAnswer={userAnswer}
          explanation={explanation}
          coach={coach}
        />
      ) : null}

      <div className="flex justify-center">
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
