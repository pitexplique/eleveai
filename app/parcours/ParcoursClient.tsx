// app/parcours/parcoursClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { CanvasRenderer } from "@/lib/canvas";
import { MarkdownMath } from "@/components/MarkdownMath";
import BoutonSignalerQuestion from "@/components/signalement/BoutonSignalerQuestion";
import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";
import { buildLearningVideoHref } from "@/lib/videoSearch";

import type {
  ParcoursAnswer,
  ParcoursClasse,
  ParcoursQuestion,
  ParcoursNotionScore,
} from "@/lib/parcours/types";

import { getClasseNotions } from "@/lib/parcours/getClasseNotions";
import { getDefiQuestionForNotion } from "@/lib/parcours/getDefiQuestionForNotion";
import { getAnneesNotions, sansMarqueurAnnee } from "@/lib/tutor-v4/catalog";
import {
  filtrerNotionsParAnnee,
  marqueurAnneeUtile,
  normalizeAnnee,
  type ParcoursAnnee,
} from "@/lib/parcours/annee";
import {
  getStatusLabel,
  isCorrectAnswer,
  scoreParcours,
} from "@/lib/parcours/scoreParcours";

import type { ParcoursDifficulteMode } from "@/lib/parcours/getDefiQuestionForNotion";
import {
  useClassBoard,
  ClassBoardToggle,
  classText,
} from "@/components/parcours/ClassBoard";

const classes: ParcoursClasse[] = [
  "cp",
  "ce1",
  "ce2",
  "cm1",
  "cm2",
  "6e",
  "5e",
  "4e",
  "3e",
  "seconde",
  "premiere-spe",
  "terminale-spe",
  "stmg",
  "adulte",
];

const classeLabels: Record<ParcoursClasse, string> = {
  cp: "CP",
  ce1: "CE1",
  ce2: "CE2",
  cm1: "CM1",
  cm2: "CM2",
  "6e": "6e",
  "5e": "5e",
  "4e": "4e",
  "3e": "3e",
  seconde: "Seconde",
  "premiere-spe": "Première",
  "terminale-spe": "Terminale spé",
  stmg: "STMG",
  adulte: "Calculs du quotidien",
};

/**
 * DEUX ANNÉES DANS UNE SEULE CLASSE — le parcours, à son tour (21/08/2026).
 *
 * Le coach a ces trois pastilles depuis le 18/08 ; le parcours, lui, tirait
 * encore ses défis dans les 86 notions de la STMG d'un bloc. Un élève de
 * première pouvait recevoir une loi binomiale ou un logarithme sans que rien
 * ne le prévienne — et, à la différence du coach, il ne choisissait pas la
 * ligne : elle lui tombait dessus.
 *
 * ⛔ Toujours pas deux classes : les suites commencent en première et se
 * terminent en terminale. Une classe, une LISTE filtrée — ici avant le tirage.
 *
 * Le filtre lui-même vit dans `lib/parcours/annee.ts`, pour que le vérificateur
 * mesure celui de la page et non une copie.
 */
const ANNEE_CHIPS: { id: ParcoursAnnee; label: string }[] = [
  { id: "premiere", label: "1re STMG" },
  { id: "terminale", label: "Tle STMG" },
  { id: "cycle", label: "Les deux" },
];

const questionCountOptions = [
  {
    value: 5,
    label: "Sprint",
    emoji: "⚡",
    description: "5 questions",
  },
  {
    value: 10,
    label: "Course",
    emoji: "🏃",
    description: "10 questions",
  },
  {
    value: 15,
    label: "Challenge",
    emoji: "🔥",
    description: "15 questions",
  },
  {
    value: 20,
    label: "Grand parcours",
    emoji: "🏆",
    description: "20 questions",
  },
] as const;

type QuestionCount = (typeof questionCountOptions)[number]["value"];

type EleveSession = {
  acces_id?: string | null;
  code_etablissement?: string | null;
  code_eleve?: string | null;
  code_utilisateur?: string | null;
  nom?: string | null;
  type_utilisateur?: string | null;
  token?: string | null;
};

type ParcoursChatMessage = {
  role: "student" | "coach";
  text: string;
};

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export default function ParcoursClient() {
  const eleveContext = useEleve() as unknown as {
    eleve?: EleveSession | null;
    currentUser?: EleveSession | null;
    user?: EleveSession | null;
  };

  const eleve =
    eleveContext.eleve ?? eleveContext.currentUser ?? eleveContext.user ?? null;
  const codeEtablissement = eleve?.code_etablissement?.trim() ?? "";
  const codeUtilisateur =
    eleve?.code_eleve?.trim() ?? eleve?.code_utilisateur?.trim() ?? "";
  const canAskCorrectionQuestion = Boolean(codeEtablissement && codeUtilisateur);

  const bilanRef = useRef<HTMLDivElement>(null);
  const { classBoard, toggleClassBoard } = useClassBoard();

  const [classe, setClasse] = useState<ParcoursClasse>("6e");
  const [questionCount, setQuestionCount] = useState<QuestionCount>(10);
  const [difficulteMode, setDifficulteMode] = useState<ParcoursDifficulteMode>("revision");

  // ⭐ `?classe=` — ajouté le 12/08 pour que « Photographier un cours » puisse
  // ouvrir le BON parcours. Cette page ne lisait aucun paramètre d'URL : un
  // élève de 4ᵉ envoyé ici arrivait sur la 6ᵉ, et rien ne le lui disait. Même
  // piège silencieux que `normalizeClasse` côté coach.
  //
  // ⚠️ On lit `window.location` plutôt que `useSearchParams` : ce dernier
  // impose une frontière Suspense en App Router et changerait la façon dont
  // cette page est rendue. Un effet au montage suffit — le paramètre ne change
  // jamais en cours de session.
  //
  // ⚠️ Validé contre `classes` : une valeur inconnue est ignorée, on garde la
  // 6ᵉ. Il ne s'agit pas de se protéger d'un attaquant (il n'y a rien à
  // prendre) mais d'un lien mal écrit, qui casserait la page au lieu de
  // simplement ne rien faire.
  // ⭐ `?annee=` — même lecture, même effet, même raison qu'au-dessus (⛔ pas
  // `useSearchParams`). Le coach écrit ce paramètre : un lien qui vient de là
  // garde l'année choisie en arrivant ici. Défaut : `premiere`, comme le coach.
  const [annee, setAnnee] = useState<ParcoursAnnee>("premiere");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const demandee = params.get("classe");
    if (demandee && (classes as string[]).includes(demandee)) {
      setClasse(demandee as ParcoursClasse);
    }

    setAnnee(normalizeAnnee(params.get("annee")));
  }, []);

  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<ParcoursQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ParcoursChatMessage[]>([]);
  const [chatQuestionContext, setChatQuestionContext] =
    useState<ParcoursQuestion | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // `anneesNotions` vaut `null` pour toutes les autres classes : une classe =
  // une année, les pastilles n'apparaissent pas et la liste ne bouge pas.
  // ⚠️ Ce `null` n'est pas un repli, c'est « la question ne se pose pas ».
  const anneesNotions = useMemo(() => getAnneesNotions(classe, "maths"), [classe]);

  const toutesLesNotions = useMemo(() => getClasseNotions(classe), [classe]);

  // LE FILTRE EST AVANT LE TIRAGE : `startParcours` pioche dans `notions`, donc
  // une notion écartée ici ne peut pas revenir par la porte des questions.
  const notions = useMemo(
    () => filtrerNotionsParAnnee(toutesLesNotions, anneesNotions, annee),
    [toutesLesNotions, anneesNotions, annee]
  );

  // Quand l'élève a choisi son année, le « (Tle) » collé au libellé n'apprend
  // plus rien : la pastille active le dit déjà.
  const libelleNotion = useMemo(
    () =>
      marqueurAnneeUtile(anneesNotions, annee)
        ? sansMarqueurAnnee
        : (label: string) => label,
    [anneesNotions, annee]
  );

  const comptesAnnee = useMemo(() => {
    if (!anneesNotions) return null;
    let premiere = 0;
    let terminale = 0;
    for (const notion of toutesLesNotions) {
      if (anneesNotions[notion.id] === "terminale") terminale += 1;
      else premiere += 1;
    }
    return { premiere, terminale, cycle: premiere + terminale };
  }, [anneesNotions, toutesLesNotions]);

  const scores = useMemo<ParcoursNotionScore[]>(() => {
    if (!submitted) return [];

    const parcoursAnswers: ParcoursAnswer[] = questions.map((q) => {
      const userAnswer = answers[q.notionId] ?? "";
      const expected = q.question.expected ?? [];

      return {
        notionId: q.notionId,
        userAnswer,
        expected,
        isCorrect: isCorrectAnswer(userAnswer, expected),
      };
    });

    return questions.map((q) =>
      scoreParcours({
        notionId: q.notionId,
        notionLabel: q.notionLabel,
        answers: parcoursAnswers,
      })
    );
  }, [answers, questions, submitted]);

  const totalScore = useMemo(() => {
    return scores.reduce((sum, s) => sum + s.score, 0);
  }, [scores]);

  const totalMaxScore = useMemo(() => {
    return scores.reduce((sum, s) => sum + s.maxScore, 0);
  }, [scores]);

  const pourcentage = useMemo(() => {
    if (totalMaxScore <= 0) return 0;
    return Math.round((totalScore / totalMaxScore) * 100);
  }, [totalScore, totalMaxScore]);

  useEffect(() => {
    if (!submitted || !canAskCorrectionQuestion) return;

    setChatOpen(true);
    setChatQuestionContext((current) => current ?? questions[0] ?? null);
  }, [submitted, canAskCorrectionQuestion, questions]);

  function startParcours() {
    const allQuestions = notions
      .map((notion) =>
        getDefiQuestionForNotion({
          classe,
          notionId: notion.id,
          mode: difficulteMode,
        })
      )
      .filter((q): q is ParcoursQuestion => q !== null)
      // Le libellé voyage avec la question jusqu'au bilan : on le nettoie ici,
      // une fois, plutôt qu'à chacun des endroits qui l'affichent.
      .map((q) => ({ ...q, notionLabel: libelleNotion(q.notionLabel) }));

    const selectedQuestions = shuffleArray(allQuestions).slice(
      0,
      Math.min(questionCount, allQuestions.length)
    );

    setQuestions(selectedQuestions);
    setAnswers({});
    setSubmitted(false);
    resetCorrectionChat();
    setStarted(true);
    setSaved(false);
    setSaveMessage(null);
  }

  function resetParcours() {
    setStarted(false);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    resetCorrectionChat();
    setSaved(false);
    setSaveMessage(null);
  }

  function handleAnswer(notionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [notionId]: value,
    }));
  }

  function resetCorrectionChat() {
    setChatOpen(false);
    setChatQuestion("");
    setChatMessages([]);
    setChatQuestionContext(null);
    setChatLoading(false);
  }

  function openCorrectionChat(question: ParcoursQuestion) {
    setChatQuestionContext(question);
    setChatOpen(true);
  }

  function buildLocalCoachAnswer(
    question: ParcoursQuestion,
    studentQuestion: string
  ) {
    const userAnswer = answers[question.notionId] ?? "Aucune réponse";
    const expected = question.question.expected?.join(" ou ") ?? "Non disponible";
    const explanation =
      question.question.explanation ??
      "Regarde la réponse attendue et compare-la à ta réponse.";

    return [
      `Je reprends cette correction plus simplement.`,
      `Dans la notion "${question.notionLabel}", la réponse attendue est : ${expected}.`,
      `Ta réponse était : ${userAnswer}.`,
      `L'idée importante : ${explanation.split("\n")[0]}`,
      `Pour ta question "${studentQuestion}", essaie de repérer dans l'énoncé l'information qui mène directement à la bonne réponse.`,
    ].join("\n\n");
  }

  async function sendChatQuestion() {
    const trimmed = chatQuestion.trim();
    if (!trimmed || !chatQuestionContext) return;
    if (!canAskCorrectionQuestion) {
      setChatOpen(true);
      return;
    }

    const currentContext = chatQuestionContext;
    const currentQuestionIndex =
      questions.findIndex((question) => question === currentContext) + 1;

    setChatMessages((prev) => [...prev, { role: "student", text: trimmed }]);
    setChatQuestion("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/parcours/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement,
          codeUtilisateur,
          classe,
          notionId: currentContext.notionId,
          notionLabel: currentContext.notionLabel,
          questionIndex: currentQuestionIndex > 0 ? currentQuestionIndex : null,
          questionText: currentContext.question.text,
          studentAnswer: answers[currentContext.notionId] ?? "",
          expectedAnswer: currentContext.question.expected?.join(" ou ") ?? "",
          explanation: currentContext.question.explanation ?? "",
          studentQuestion: trimmed,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        answer?: string;
        error?: string;
      };

      if (!response.ok || !data.answer) {
        throw new Error(data.error ?? "Reponse indisponible.");
      }

      setChatMessages((prev) => [
        ...prev,
        { role: "coach", text: data.answer ?? "" },
      ]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        { role: "coach", text: buildLocalCoachAnswer(currentContext, trimmed) },
      ]);
    } finally {
      setChatLoading(false);
    }
  }

  async function enregistrerResultatParcours() {
    setSaveMessage(null);

    if (!eleve) {
      setSaveMessage(
        "Tu dois être connecté pour enregistrer ta note. Retourne sur la page de connexion élève."
      );
      return;
    }

    if (!submitted || scores.length === 0) {
      setSaveMessage("Termine d’abord le parcours avant d’enregistrer.");
      return;
    }

    const codeEtablissement = eleve.code_etablissement?.trim() ?? "";
    const codeUtilisateur =
      eleve.code_eleve?.trim() ?? eleve.code_utilisateur?.trim() ?? "";

    if (!codeEtablissement || !codeUtilisateur) {
      setSaveMessage("Impossible d’identifier ton compte élève.");
      return;
    }

    setSaving(true);

    // Insert via /api/resultats : l'identité (codes + nom) est prise dans
    // le jeton de session, pas dans le payload.
    const { error } = await saveResultat(eleve, "parcours_maths", {
      classe,
      niveau: classe,
      matiere: "maths",

      score: totalScore,
      total: totalMaxScore,

      details: {
        classe,
        nombreQuestionsChoisi: questionCount,
        nombreQuestionsReel: questions.length,
        pourcentage,
        scores,
        answers,
        questions: questions.map((q) => ({
          notionId: q.notionId,
          notionLabel: q.notionLabel,
          text: q.question.text,
          expected: q.question.expected ?? [],
          userAnswer: answers[q.notionId] ?? "",
          isCorrect: isCorrectAnswer(
            answers[q.notionId] ?? "",
            q.question.expected ?? []
          ),
        })),
        savedAt: new Date().toISOString(),
      },
    });

    setSaving(false);

    if (error) {
      console.error(error);
      setSaveMessage("Erreur : la note n’a pas été enregistrée.");
      return;
    }

    setSaved(true);
    setSaveMessage(
      "Note enregistrée ✅ Tu peux refaire le parcours pour améliorer ton score."
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F0FDF4] px-4 py-8 text-slate-950">
      {/* FOND LUMINEUX */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full opacity-95"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="38%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g1" cx="18%" cy="18%" r="60%">
              <stop offset="0%" stopColor="#6EE7B7" stopOpacity="1" />
              <stop offset="100%" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g2" cx="82%" cy="15%" r="55%">
              <stop offset="0%" stopColor="#7DD3FC" stopOpacity="1" />
              <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="g3" cx="50%" cy="88%" r="55%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="1" />
              <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="wave" x1="0" x2="1">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#FEFCE8" />
            </linearGradient>
          </defs>

          <rect width="1440" height="900" fill="url(#wave)" />
          <rect width="1440" height="900" fill="url(#centerGlow)" />
          <rect width="1440" height="900" fill="url(#g1)" />
          <rect width="1440" height="900" fill="url(#g2)" />
          <rect width="1440" height="900" fill="url(#g3)" />

          <circle cx="180" cy="170" r="60" fill="#34D399" opacity="0.35" />
          <circle cx="1240" cy="180" r="80" fill="#38BDF8" opacity="0.35" />
          <circle cx="1120" cy="720" r="70" fill="#FACC15" opacity="0.35" />
          <circle cx="260" cy="720" r="85" fill="#A78BFA" opacity="0.25" />

          <path
            d="M0 700 C220 620 340 760 560 690 C780 620 930 720 1140 660 C1280 620 1370 640 1440 610 V900 H0 Z"
            fill="#FFFFFF"
            opacity="0.75"
          />

          <text x="150" y="485" fontSize="54" opacity="0.2">
            ⭐
          </text>
          <text x="1180" y="520" fontSize="64" opacity="0.2">
            🏆
          </text>
          <text x="720" y="765" fontSize="58" opacity="0.2">
            🚀
          </text>
          <text x="1030" y="355" fontSize="52" opacity="0.16">
            🧭
          </text>
          <text x="340" y="620" fontSize="52" opacity="0.16">
            🗺️
          </text>
        </svg>
      </div>

      <section className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-2xl backdrop-blur-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-200">
            <span>🚀</span>
            <span>EleveAI · Parcours</span>
          </div>

          <h1 className="text-3xl font-black leading-tight text-slate-950 md:text-5xl">
            Ton voyage mathématiques
          </h1>

          <p className="mt-3 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg">
            Choisis ton parcours, le nombre de questions et ton niveau.
            EleveAI affiche ensuite une carte claire de tes forces :
            🟢 maîtrisé, 🟡 à revoir, 🔴 fragile.
          </p>

          {eleve ? (
            <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-black text-emerald-900">
              Connecté : {eleve.nom ?? "Élève"} ·{" "}
              {eleve.code_etablissement ?? ""} ·{" "}
              {eleve.code_eleve ?? eleve.code_utilisateur ?? ""}
            </div>
          ) : (
            <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm font-black text-amber-900">
              Tu peux faire le parcours sans connexion, mais il faudra être
              connecté pour enregistrer ta note.
            </div>
          )}

          <div className="mt-6 rounded-3xl bg-gradient-to-r from-emerald-100 via-sky-100 to-yellow-100 p-4 ring-1 ring-white/80">
            <p className="text-sm font-black text-slate-800">
              🎯 Objectif : savoir exactement quelles notions tu maîtrises et
              lesquelles retravailler.
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
              1. Choisis ton parcours
            </p>

            <div className="flex flex-wrap gap-3">
              {classes.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setClasse(c);
                    resetParcours();
                  }}
                  className={[
                    "rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5",
                    classe === c
                      ? "bg-slate-950 text-white ring-4 ring-yellow-300"
                      : "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  {classeLabels[c]}
                </button>
              ))}
            </div>
          </div>

          {/* Année, à l'intérieur d'une classe qui en couvre deux (STMG). */}
          {anneesNotions && comptesAnnee ? (
            <div className="mt-6 rounded-3xl border border-sky-200 bg-sky-50/80 p-4">
              <p className="text-sm font-black uppercase tracking-wide text-sky-700">
                Ton année
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {ANNEE_CHIPS.map((chip) => {
                  const actif = annee === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => {
                        setAnnee(chip.id);
                        resetParcours();
                      }}
                      aria-pressed={actif}
                      className={[
                        "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-black shadow-sm transition hover:-translate-y-0.5",
                        actif
                          ? "bg-sky-700 text-white ring-4 ring-yellow-300"
                          : "bg-white text-sky-800 ring-1 ring-sky-200 hover:bg-sky-100",
                      ].join(" ")}
                    >
                      {chip.label}
                      <span
                        className={[
                          "rounded-full px-2 py-0.5 text-xs font-black",
                          actif ? "bg-white/20 text-white" : "bg-sky-100 text-sky-800",
                        ].join(" ")}
                      >
                        {comptesAnnee[chip.id]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 text-sm font-bold leading-6 text-sky-900/80">
                {annee === "terminale"
                  ? "Ce qui est nouveau en terminale. Le programme de première reste au menu toute l'année : clique sur « Les deux » pour le revoir."
                  : annee === "premiere"
                    ? "Le programme de première. Les suites, elles, se terminent en terminale : elles sont sur l'autre pastille."
                    : "Les deux années du cycle, dans l'ordre du programme."}
              </p>
            </div>
          ) : null}

          <div className="mt-6">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
              2. Combien de questions ?
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {questionCountOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setQuestionCount(option.value);
                    resetParcours();
                  }}
                  className={[
                    "rounded-3xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5",
                    questionCount === option.value
                      ? "border-slate-950 bg-slate-950 text-white ring-4 ring-yellow-300"
                      : "border-white bg-white/90 text-slate-900 ring-1 ring-slate-200 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  <div className="text-3xl">{option.emoji}</div>
                  <div className="mt-2 text-lg font-black">{option.label}</div>
                  <div
                    className={[
                      "mt-1 text-sm font-bold",
                      questionCount === option.value
                        ? "text-slate-200"
                        : "text-slate-600",
                    ].join(" ")}
                  >
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-sm font-black uppercase tracking-wide text-slate-700">
              3. Choisis ton niveau
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => { setDifficulteMode("revision"); resetParcours(); }}
                className={[
                  "rounded-3xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5",
                  difficulteMode === "revision"
                    ? "border-slate-950 bg-slate-950 text-white ring-4 ring-yellow-300"
                    : "border-white bg-white/90 text-slate-900 ring-1 ring-slate-200 hover:bg-emerald-50",
                ].join(" ")}
              >
                <div className="text-3xl">⭐⭐⭐</div>
                <div className="mt-2 text-lg font-black">Révision</div>
                <div className={["mt-1 text-sm font-bold", difficulteMode === "revision" ? "text-slate-200" : "text-slate-600"].join(" ")}>
                  Difficultés 1 → 3 · Pour consolider
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setDifficulteMode("defi"); resetParcours(); }}
                className={[
                  "rounded-3xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5",
                  difficulteMode === "defi"
                    ? "border-slate-950 bg-slate-950 text-white ring-4 ring-yellow-300"
                    : "border-white bg-white/90 text-slate-900 ring-1 ring-slate-200 hover:bg-emerald-50",
                ].join(" ")}
              >
                <div className="text-3xl">⭐⭐⭐⭐⭐</div>
                <div className="mt-2 text-lg font-black">Défi</div>
                <div className={["mt-1 text-sm font-bold", difficulteMode === "defi" ? "text-slate-200" : "text-slate-600"].join(" ")}>
                  Difficultés 3 → 5 · Pour se dépasser
                </div>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startParcours}
              className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 text-sm font-black text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              🚀 Démarrer · {questionCount} questions
            </button>

            <ClassBoardToggle classBoard={classBoard} onToggle={toggleClassBoard} />

            <Link
              href="/accueil"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Retour accueil
            </Link>
          </div>
        </div>

        {!started && (
          <div className="rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-xl backdrop-blur-xl">
            <h2 className="mb-3 text-2xl font-black text-slate-950">
              🗺️ Notions prévues en {classe}
            </h2>

            <p className="mb-5 text-sm font-semibold text-slate-600">
              Chaque carte peut devenir un défi. Tu en feras seulement{" "}
              <span className="font-black text-emerald-700">
                {questionCount}
              </span>{" "}
              dans ce parcours.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              {notions.map((notion, index) => (
                <div
                  key={notion.id}
                  className="rounded-3xl border border-white bg-gradient-to-br from-white to-emerald-50 p-4 shadow-md ring-1 ring-emerald-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-black text-emerald-800">
                      {index + 1}
                    </div>

                    <div>
                      <div className="font-black text-slate-950">
                        {libelleNotion(notion.label)}
                      </div>
                      <div className="mt-1 text-xs font-bold text-slate-500">
                        {notion.id}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {started && questions.length === 0 && (
          <div className="rounded-[2rem] border border-red-200 bg-white/85 p-6 shadow-xl backdrop-blur-xl">
            <h2 className="text-xl font-black text-red-700">
              Aucun défi trouvé
            </h2>
            <p className="mt-2 text-sm font-semibold text-red-700">
              Il faut au moins une question de difficulté 3 dans les
              question-banks pour cette classe.
            </p>
          </div>
        )}

        {started && questions.length > 0 && (
          <div className="space-y-5">
            {submitted && (
              <div ref={bilanRef} className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-3xl font-black text-slate-950">
                  🏆 Bilan du parcours
                </h2>

                <p className="mt-2 text-sm font-semibold text-slate-600">
                  Voici ta carte de progression. Les notions fragiles peuvent
                  être retravaillées directement.
                </p>

                <div className="mt-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-2xl font-black text-emerald-950">
                    Score global : {totalScore} / {totalMaxScore}
                  </p>

                  <p className="mt-1 text-sm font-black text-emerald-800">
                    Réussite : {pourcentage} %
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-700">
                    Nombre de questions : {questions.length} question
                    {questions.length > 1 ? "s" : ""}
                  </p>

                  <p className="mt-3 text-sm font-bold text-emerald-900">
                    {eleve
                      ? "Tu peux enregistrer cette tentative. Si tu refais le parcours, une nouvelle tentative pourra être enregistrée."
                      : "Tu peux faire le parcours librement, mais il faut être connecté pour enregistrer ta progression."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {eleve ? (
                      <button
                        type="button"
                        onClick={enregistrerResultatParcours}
                        disabled={saving}
                        className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving
                          ? "Enregistrement..."
                          : "✅ Enregistrer ma note"}
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
                      onClick={startParcours}
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-emerald-900 shadow-sm ring-1 ring-emerald-200 hover:bg-emerald-100"
                    >
                      Refaire pour améliorer
                    </button>
                  </div>

                  {saveMessage ? (
                    <p className="mt-4 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-700 ring-1 ring-emerald-100">
                      {saveMessage}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {scores.map((score) => (
                    <div
                      key={score.notionId}
                      className="rounded-3xl border border-white bg-gradient-to-br from-white to-sky-50 p-4 shadow-md ring-1 ring-sky-100"
                    >
                      <div className="font-black text-slate-950">
                        {score.notionLabel}
                      </div>

                      <div className="mt-1 text-sm font-bold text-slate-600">
                        Score : {score.score} / {score.maxScore}
                      </div>

                      <div className="mt-2 text-lg font-black">
                        {getStatusLabel(score.status)}
                      </div>

                      {score.status !== "maitrise" && (
                        <Link
                          href={`/tutor-v4?classe=${classe}&matiere=maths&notion=${score.notionId}`}
                          className="mt-3 inline-block rounded-xl bg-slate-950 px-3 py-2 text-xs font-black text-white hover:bg-slate-800"
                        >
                          Retravailler cette notion
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {questions.map((q, index) => {
              const userAnswer = answers[q.notionId] ?? "";
              const expected = q.question.expected ?? [];
              const correct = isCorrectAnswer(userAnswer, expected);
              const learningVideoHref = buildLearningVideoHref({
                matiere: "maths",
                niveau: classe,
                notionLabel: q.notionLabel,
                notionId: q.notionId,
                questionText: q.question.text,
                type: q.question.format,
              });

              return (
                <article
                  key={`${q.notionId}-${index}`}
                  className="rounded-[2rem] border border-white bg-white/90 p-5 text-slate-950 shadow-xl ring-1 ring-white/80 backdrop-blur"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                        Étape {index + 1} / {questions.length}
                      </p>
                      <h2 className="text-2xl font-black">{q.notionLabel}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Ne s'affiche que pour un bêta testeur accepté. */}
                      <BoutonSignalerQuestion
                        page="/parcours"
                        question={q.question.text}
                        notion={q.notionId}
                      />
                      <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-black text-amber-800 ring-1 ring-amber-200">
                        ⭐⭐⭐ défi
                      </span>
                    </div>
                  </div>

                  <MarkdownMath className={`whitespace-pre-line font-semibold leading-relaxed ${classText.question(classBoard)}`}>
                    {q.question.text}
                  </MarkdownMath>

                  <div className="mt-4 rounded-3xl border border-sky-100 bg-sky-50 p-4 text-slate-900">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-black text-sky-900">
                          Tu ne comprends pas la notion ?
                        </p>
                        <p className="mt-1 text-sm font-bold text-slate-700">
                          Regarde une video d&apos;explication avant de repondre.
                        </p>
                      </div>

                      <a
                        href={learningVideoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-sky-500"
                      >
                        Regarder la video
                      </a>
                    </div>
                  </div>

                  {q.question.canvas ? (
                    <div className="mt-4 overflow-x-auto rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-100">
                      <CanvasRenderer figure={q.question.canvas} />
                    </div>
                  ) : null}

                  {q.question.format === "qcm" && q.question.choices ? (
                    <div className="mt-4 grid gap-2">
                      {q.question.choices.map((choice, choiceIndex) => (
                        <button
                          key={`${q.notionId}-${index}-${choiceIndex}`}
                          type="button"
                          disabled={submitted}
                          onClick={() => handleAnswer(q.notionId, choice)}
                          className={[
                            "rounded-2xl border px-4 py-3 text-left font-bold transition",
                            classText.choice(classBoard),
                            answers[q.notionId] === choice
                              ? "border-emerald-500 bg-emerald-100 text-emerald-900"
                              : "border-slate-200 bg-white hover:bg-emerald-50",
                            submitted ? "cursor-not-allowed opacity-80" : "",
                          ].join(" ")}
                        >
                          <MarkdownMath inline>{choice}</MarkdownMath>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      value={answers[q.notionId] ?? ""}
                      disabled={submitted}
                      onChange={(e) =>
                        handleAnswer(q.notionId, e.target.value)
                      }
                      placeholder="Ta réponse..."
                      className={`mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-bold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-slate-100 ${classText.input(classBoard)}`}
                    />
                  )}

                  {submitted ? (
                    <div
                      className={[
                        "mt-4 rounded-2xl border p-4",
                        correct
                          ? "border-emerald-200 bg-emerald-50"
                          : "border-red-200 bg-red-50",
                      ].join(" ")}
                    >
                      <p
                        className={[
                          "text-sm font-black",
                          correct ? "text-emerald-700" : "text-red-700",
                        ].join(" ")}
                      >
                        {correct
                          ? "✅ Bonne réponse"
                          : "❌ Réponse à corriger"}
                      </p>

                      <p className="mt-2 text-sm font-bold text-slate-700">
                        Ta réponse : {userAnswer || "Aucune réponse"}
                      </p>

                      <div className="mt-1 text-sm font-bold text-emerald-700">
                        Bonne réponse :{" "}
                        {expected.length > 0 ? (
                          <MarkdownMath inline>{expected.join(" ou ")}</MarkdownMath>
                        ) : (
                          "Non disponible"
                        )}
                      </div>

                      {q.question.explanation ? (
                        <MarkdownMath className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                          {q.question.explanation}
                        </MarkdownMath>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => openCorrectionChat(q)}
                        className="mt-4 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-slate-800"
                      >
                        Poser une question sur cette correction
                      </button>
                    </div>
                  ) : null}
                </article>
              );
            })}

            {!submitted ? (
              <div className="sticky bottom-4 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(true);
                    setChatOpen(true);
                    setChatQuestionContext(questions[0] ?? null);
                    setTimeout(() => {
                      bilanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                  className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-4 text-base font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
                >
                  🏁 Valider
                </button>
              </div>
            ) : (
              /* Retour élève du 11/06/2026 : le bouton d'enregistrement
                 uniquement dans le bilan (en haut) était raté par les élèves
                 → il reste visible ici, collé en bas de l'écran. */
              <div className="sticky bottom-4 rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-wrap items-center gap-3">
                  {eleve && !saved ? (
                    <button
                      type="button"
                      onClick={enregistrerResultatParcours}
                      disabled={saving}
                      className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Enregistrement..." : "✅ Enregistrer ma note"}
                    </button>
                  ) : null}

                  {eleve && saved ? (
                    <span className="rounded-2xl bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-800 ring-1 ring-emerald-200">
                      Note enregistrée ✅
                    </span>
                  ) : null}

                  {!eleve ? (
                    <Link
                      href="/auth/signin-eleve"
                      className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-black text-white shadow-lg hover:bg-amber-400"
                    >
                      Se connecter pour enregistrer
                    </Link>
                  ) : null}

                  <button
                    type="button"
                    onClick={() =>
                      bilanRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    ⬆️ Voir le bilan
                  </button>

                  <button
                    type="button"
                    onClick={startParcours}
                    className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-3 text-sm font-black text-slate-950 shadow-lg hover:from-emerald-300 hover:to-sky-300"
                  >
                    Refaire un parcours
                  </button>

                  <button
                    type="button"
                    onClick={resetParcours}
                    className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    Changer de classe
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {submitted ? (
      <CorrectionChatBox
          open={chatOpen}
          messages={chatMessages}
          question={chatQuestion}
          loading={chatLoading}
          context={chatQuestionContext}
          canAsk={canAskCorrectionQuestion}
          onOpen={() => setChatOpen(true)}
          onClose={() => setChatOpen(false)}
          onQuestionChange={setChatQuestion}
          onSend={sendChatQuestion}
        />
      ) : null}
    </main>
  );
}

function CorrectionChatBox({
  open,
  messages,
  question,
  loading,
  context,
  canAsk,
  onOpen,
  onClose,
  onQuestionChange,
  onSend,
}: {
  open: boolean;
  messages: ParcoursChatMessage[];
  question: string;
  loading: boolean;
  context: ParcoursQuestion | null;
  canAsk: boolean;
  onOpen: () => void;
  onClose: () => void;
  onQuestionChange: (value: string) => void;
  onSend: () => void;
}) {
  if (!open) {
    if (!canAsk) {
      return (
        <aside className="fixed bottom-4 right-4 z-50 flex h-[300px] w-[150px] flex-col overflow-hidden rounded-3xl border border-cyan-200 bg-white shadow-2xl sm:h-[600px] sm:w-[300px]">
          <div className="bg-gradient-to-br from-cyan-500 via-emerald-500 to-orange-400 px-3 py-3 text-white sm:px-5 sm:py-5">
            <div className="text-xs font-black leading-4 sm:text-lg sm:leading-6">
              Question au coach
            </div>
            <div className="mt-1 hidden text-xs font-bold text-white/85 sm:block">
              EleveAI Reunion
            </div>
          </div>
          <div className="flex flex-1 items-center bg-gradient-to-b from-cyan-50 via-white to-orange-50 px-3 text-center sm:px-6">
            <p className="text-xs font-black leading-5 text-slate-800 sm:text-base sm:leading-7">
              Posez une question : connectez-vous / inscrivez-vous pour dialoguer avec le coach.
            </p>
          </div>
          <Link
            href="/auth/signin-eleve"
            className="m-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-2 text-center text-[11px] font-black text-white shadow-sm hover:from-cyan-400 hover:to-emerald-400 sm:m-4 sm:px-4 sm:py-3 sm:text-sm"
          >
            Connexion
          </Link>
        </aside>
      );
    }

    return null;
  }

  return (
    <aside className="fixed bottom-4 right-4 z-50 flex max-h-[78vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-cyan-100 bg-gradient-to-r from-cyan-500 via-emerald-500 to-orange-400 px-4 py-3 text-white">
        <div>
          <div className="text-sm font-black">Question sur la correction</div>
          <div className="mt-1 text-xs text-slate-300">
            {context?.notionLabel ?? "Choisis une correction"}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-black hover:bg-white/30"
        >
          Fermer
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
        {messages.length === 0 ? (
          canAsk ? (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-3 text-sm font-semibold text-sky-900">
              Pose ta question sur l&apos;explication ou sur la bonne réponse. Le coach
              utilise le contexte de cette correction.
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-900">
              Posez une question : connectez-vous pour dialoguer.
            </div>
          )
        ) : (
          messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={[
                "whitespace-pre-line rounded-2xl px-3 py-2 text-sm leading-6",
                message.role === "student"
                  ? "ml-8 bg-emerald-100 font-semibold text-emerald-950"
                  : "mr-8 bg-white text-slate-800 shadow-sm ring-1 ring-slate-200",
              ].join(" ")}
            >
              {message.text}
            </div>
          ))
        )}
        {loading ? (
          <div className="mr-8 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-500 shadow-sm ring-1 ring-slate-200">
            Le coach réfléchit...
          </div>
        ) : null}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <textarea
          value={question}
          onChange={(event) => onQuestionChange(event.target.value)}
          placeholder="Ex : Pourquoi ma réponse est fausse ?"
          rows={3}
          disabled={loading || !canAsk}
          className="w-full resize-none rounded-2xl border border-slate-300 px-3 py-2 text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!question.trim() || loading || !canAsk}
          className="mt-2 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-black text-slate-950 shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </div>
    </aside>
  );
}
