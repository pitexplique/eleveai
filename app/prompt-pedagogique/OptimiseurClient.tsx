// app/optimiseur/OptimiseurClient.tsx
// ✅ Version PUBLIQUE (élèves + profs)
// - Retire le bandeau ISO/AIMS + la section "Validation humaine"
// - Garde : chips Type + Public, scoring, optimisation, courbe, historique, label "attendus"
// ✅ + OPTION 1 : Drawer “pitexplique Premium — passer à 20/20” (coach en 1–3 questions)
// ✅ FIX BUG: Premium reprend parfois l'ancien prompt -> utilisation de refs "always-latest"
//    - promptRef : dernier texte instantané
//    - reportRef/scoreRef : dernier scoring instantané
//    - startPremium() lit les refs
//    - applyPremium() met à jour state + ref
// ✅ FIX: clientRunId envoyé à /premium/start pour garantir 1 session active par "run" côté serveur

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useEleve } from "@/context/EleveContext";
import {
  DEFAULT_MAX_ITERS,
  DEFAULT_TARGET_SCORE,
  RUBRIC_VERSION,
  type PromptType,
} from "@/lib/promptRubric";

type Audience = "profs" | "eleves";

type ScoreReport = {
  rubricVersion: number;
  score: number;
  breakdown: {
    clarity: number;
    context: number;
    compliance: number;
    structure: number;
    robustness: number;
  };
  strengths: string[];
  fixes: string[];
  risks: string[];
};

type Iteration = {
  iter: number;
  score?: number;
  prompt: string;
  report?: ScoreReport;
  note?: string;
  type?: PromptType;
  audience?: Audience;
};

// ✅ Premium types (Option 1)
type PremiumQuestion = { id: string; gap: string; question: string };
type PremiumResult = {
  improvedPrompt: string;
  changes: string[];
  estimatedScoreAfter?: number;
};
type PremiumMsg = { role: "pit" | "user"; text: string };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function formatTemp(t: number) {
  return Math.round(t * 100) / 100;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-3 py-2 rounded-full text-xs font-semibold border transition",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

/** ✅ Label dynamique : quelques attendus par Type + Public (UX) */
function getExpectations(type: PromptType, audience: Audience) {
  const baseEleve = [
    "Consignes courtes (1 tâche à la fois)",
    "Exemple + étapes",
    "Checklist",
  ];
  const baseProf = [
    "Durée + matériel",
    "Déroulé + mise en commun",
    "Critères mesurables + checklist",
  ];

  if (audience === "eleves") {
    switch (type) {
      case "evaluation":
        return {
          title: "Attendus (Élèves • Évaluation)",
          pills: ["Consignes claires", "Espaces Réponse ____", "Sans correction"],
          lines: [
            ...baseEleve,
            "Espaces “Réponse : ____”",
            "Barème seulement si demandé",
          ],
        };
      case "fiche":
        return {
          title: "Attendus (Élèves • Fiche / méthode)",
          pills: ["Étapes numérotées", "Exemple", "Erreur fréquente"],
          lines: [...baseEleve, "Synthèse “À retenir”", "Sans blabla"],
        };
      case "seance":
        return {
          title: "Attendus (Élèves • Séance)",
          pills: ["Objectif", "Étapes", "Temps"],
          lines: [...baseEleve, "Temps indicatifs", "Trace attendue simple"],
        };
      case "sequence":
        return {
          title: "Attendus (Élèves • Séquence)",
          pills: ["Séances", "Objectifs", "Tâches"],
          lines: [
            ...baseEleve,
            "Ce que je fais séance 1/2/3",
            "Trace / production",
          ],
        };
      case "projet":
        return {
          title: "Attendus (Élèves • Projet)",
          pills: ["Livrable", "Étapes", "Critères"],
          lines: [...baseEleve, "Rôles si groupe", "Critères simples"],
        };
      default:
        return {
          title: "Attendus (Élèves)",
          pills: ["Clair", "Étapes", "Checklist"],
          lines: baseEleve,
        };
    }
  }

  // audience === "profs"
  switch (type) {
    case "evaluation":
      return {
        title: "Attendus (Profs • Évaluation)",
        pills: ["Barème /20", "Critères", "Correction séparée"],
        lines: [...baseProf, "Barème explicite", "Une consigne = une question"],
      };
    case "fiche":
      return {
        title: "Attendus (Profs • Fiche / méthode)",
        pills: ["Étapes", "Exemple", "Erreur fréquente"],
        lines: [...baseProf, "À retenir + contre-exemple", "Version élève si demandé"],
      };
    case "seance":
      return {
        title: "Attendus (Profs • Séance)",
        pills: ["Phases", "Différenciation", "Trace"],
        lines: [...baseProf, "Différenciation (base/attendu/défi) si pertinent"],
      };
    case "sequence":
      return {
        title: "Attendus (Profs • Séquence)",
        pills: ["Progression", "Traces", "Évaluation"],
        lines: [...baseProf, "Progression séance 1→2→3", "Évaluation(s) / traces"],
      };
    case "projet":
      return {
        title: "Attendus (Profs • Projet)",
        pills: ["Livrable", "Grille", "Modalités"],
        lines: [...baseProf, "Rôles/étapes + exigences de traces"],
      };
    default:
      return {
        title: "Attendus (Profs)",
        pills: ["Déroulé", "Critères", "Checklist"],
        lines: baseProf,
      };
  }
}

function makeClientRunId() {
  // stable dans l’onglet tant que la page reste montée
  // crypto.randomUUID() si dispo, sinon fallback
  try {
    // @ts-ignore
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      // @ts-ignore
      return crypto.randomUUID();
    }
  } catch {}
  return `cr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export default function OptimiseurClient() {
  // 🔒 Réservé aux connectés : chaque appel API porte le jeton de session.
  const { eleve } = useEleve();
  // La session est relue depuis localStorage après montage : on attend
  // avant d'afficher le mur pour ne pas le faire clignoter aux connectés.
  const [sessionPrete, setSessionPrete] = useState(false);
  useEffect(() => setSessionPrete(true), []);

  const enteteAuth = (): HeadersInit => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${eleve?.token || ""}`,
  });

  const [prompt, setPrompt] = useState("");

  // ✅ always-latest refs (FIX timing)
  const promptRef = useRef<string>("");
  const reportRef = useRef<ScoreReport | null>(null);
  const scoreRef = useRef<number | null>(null);

  // ✅ clientRunId pour Premium (évite reprise d’une session précédente)
  const clientRunIdRef = useRef<string>(makeClientRunId());

  // ✅ MODIF : vise 20 par défaut (sinon remets DEFAULT_TARGET_SCORE)
  const [targetScore, setTargetScore] = useState<number>(20);
  const [maxIters, setMaxIters] = useState(DEFAULT_MAX_ITERS);

  const [optimisationOn, setOptimisationOn] = useState(true);
  const [showCurve, setShowCurve] = useState(true);

  const [loading, setLoading] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [error, setError] = useState<string>("");

  const [currentScore, setCurrentScore] = useState<number | null>(null);
  const [currentReport, setCurrentReport] = useState<ScoreReport | null>(null);

  const [history, setHistory] = useState<Iteration[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const [model, setModel] = useState<"gpt-4o-mini" | "gpt-4o">("gpt-4o-mini");
  const [temperatureImprove, setTemperatureImprove] = useState<number>(0);

  // ✅ Type de ressource (chips)
  const [promptType, setPromptType] = useState<PromptType>("seance");

  // ✅ Audience (chips)
  const [audience, setAudience] = useState<Audience>("profs");

  // ✅ Label dynamique (attendus)
  const expectations = useMemo(
    () => getExpectations(promptType, audience),
    [promptType, audience],
  );

  // ✅ PREMIUM state (Option 1)
  const [premiumOpen, setPremiumOpen] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [premiumError, setPremiumError] = useState<string>("");

  const [premiumSessionId, setPremiumSessionId] = useState<string | null>(null);
  const [premiumStep, setPremiumStep] = useState(0);
  const [premiumTotal, setPremiumTotal] = useState(0);

  const [premiumQuestion, setPremiumQuestion] = useState<PremiumQuestion | null>(
    null,
  );
  const [premiumDraft, setPremiumDraft] = useState("");
  const [premiumChat, setPremiumChat] = useState<PremiumMsg[]>([]);
  const [premiumDone, setPremiumDone] = useState(false);
  const [premiumResult, setPremiumResult] = useState<PremiumResult | null>(null);

  const scores = useMemo(() => {
    return history
      .map((h) => (typeof h.score === "number" ? h.score : null))
      .filter((x): x is number => x !== null);
  }, [history]);

  const best = useMemo(() => {
    if (!scores.length) return null;
    return Math.max(...scores);
  }, [scores]);

  const scoreOnce = async (p: string, signal?: AbortSignal) => {
    const res = await fetch("/api/optimiseur/score", {
      method: "POST",
      headers: enteteAuth(),
      signal,
      body: JSON.stringify({
        prompt: p,
        model,
        temperature: 0,
        meta: { type: promptType, audience },
      }),
    });

    const text = await res.text();
    let data: any = null;

    try {
      data = JSON.parse(text);
    } catch {
      console.log("⚠️ Réponse non JSON brute (score):", text);
    }

    if (!res.ok) {
      console.log("❌ RAW SCORE:", text);
      throw new Error(data?.error || "Erreur scoring.");
    }

    return data as ScoreReport;
  };

  const improveOnce = async (
    p: string,
    report: ScoreReport,
    signal?: AbortSignal,
  ) => {
    const res = await fetch("/api/optimiseur/improve", {
      method: "POST",
      headers: enteteAuth(),
      signal,
      body: JSON.stringify({
        prompt: p,
        scoreReport: report,
        model,
        temperature: formatTemp(temperatureImprove),
        type: promptType,
        audience,
      }),
    });

    const text = await res.text();
    let data: any = null;

    try {
      data = JSON.parse(text);
    } catch {
      console.log("⚠️ Réponse non JSON brute (improve):", text);
    }

    if (!res.ok) {
      console.log("❌ RAW IMPROVE:", text);
      if (data?.raw) console.log("📦 RAW FIELD (improve):", data.raw);
      if (data?.repairedRaw) console.log("🛠 REPAIRED RAW:", data.repairedRaw);
      throw new Error(data?.error || "Erreur improve.");
    }

    return data as { improvedPrompt: string; changes: string[] };
  };

  const stop = () => {
    setStopped(true);
    abortRef.current?.abort();
  };

  const reset = () => {
    stop();
    setError("");
    setLoading(false);
    setStopped(false);
    setHistory([]);
    setCurrentScore(null);
    setCurrentReport(null);
    reportRef.current = null;
    scoreRef.current = null;

    // ✅ reset premium too
    setPremiumOpen(false);
    setPremiumLoading(false);
    setPremiumError("");
    setPremiumSessionId(null);
    setPremiumStep(0);
    setPremiumTotal(0);
    setPremiumQuestion(null);
    setPremiumDraft("");
    setPremiumChat([]);
    setPremiumDone(false);
    setPremiumResult(null);

    // ✅ nouveau run id Premium (optionnel mais propre)
    clientRunIdRef.current = makeClientRunId();
  };

  const runScoreOnly = async () => {
    const p = (promptRef.current || prompt || "").trim();
    if (!p) {
      setError("Colle un prompt avant de scorer.");
      return;
    }

    setError("");
    setStopped(false);
    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const report = await scoreOnce(p, abortRef.current.signal);
      setCurrentReport(report);
      setCurrentScore(report.score);
      reportRef.current = report;
      scoreRef.current = report.score;

      setHistory((h) => [
        ...h,
        {
          iter: h.length + 1,
          score: report.score,
          prompt: p,
          report,
          note: "Scoring",
          type: promptType,
          audience,
        },
      ]);
    } catch (e: any) {
      if (String(e?.name) !== "AbortError") {
        setError(e?.message || "Erreur scoring.");
      }
    } finally {
      setLoading(false);
    }
  };

  const runOptimisation = async () => {
    const initial = (promptRef.current || prompt || "").trim();
    if (!initial) {
      setError("Colle un prompt avant de lancer Valeria.");
      return;
    }

    setError("");
    setStopped(false);
    setLoading(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    let p = initial;
    let bestPrompt = p;
    let bestScore = -Infinity;

    try {
      for (let i = 1; i <= maxIters; i++) {
        if (ctrl.signal.aborted) break;

        const report = await scoreOnce(p, ctrl.signal);
        setCurrentReport(report);
        setCurrentScore(report.score);
        reportRef.current = report;
        scoreRef.current = report.score;

        setHistory((h) => [
          ...h,
          {
            iter: h.length + 1,
            score: report.score,
            prompt: p,
            report,
            note: `Itération ${i} — score`,
            type: promptType,
            audience,
          },
        ]);

        if (report.score > bestScore) {
          bestScore = report.score;
          bestPrompt = p;
        }

        if (report.score >= targetScore) break;
        if (!optimisationOn) break;
        if (ctrl.signal.aborted) break;

        const improved = await improveOnce(p, report, ctrl.signal);

        const next = String(improved.improvedPrompt || "").trim();
        if (!next || next.length < 20) {
          setHistory((h) => [
            ...h,
            {
              iter: h.length + 1,
              prompt: bestPrompt,
              score: bestScore,
              note: "Improve invalide → stop",
              type: promptType,
              audience,
            },
          ]);
          break;
        }

        p = next;
      }

      setPrompt(bestPrompt);
      promptRef.current = bestPrompt; // ✅ sync ref
    } catch (e: any) {
      if (String(e?.name) !== "AbortError") {
        setError(e?.message || "Erreur optimisation.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copy = async (txt: string) => {
    try {
      await navigator.clipboard.writeText(txt);
    } catch {}
  };

// ✅ PREMIUM handlers (Option 1) — FIX: use refs to avoid stale prompt/report
const startPremium = async () => {
  if (premiumLoading) return;

  const latestPrompt = (promptRef.current || prompt || "").trim();
  const latestReport = reportRef.current || currentReport;
  const latestScore = scoreRef.current ?? currentScore;

  if (!latestReport || latestScore === null) {
    setPremiumError("Scorer d’abord.");
    setPremiumOpen(true);
    return;
  }
  if (!latestPrompt) {
    setPremiumError("Colle un prompt d’abord.");
    setPremiumOpen(true);
    return;
  }
  if (latestScore >= 20) {
    setPremiumError("");
    setPremiumChat([{ role: "pit", text: "Tu es déjà à 20/20 ✅" }]);
    setPremiumDone(true);
    setPremiumOpen(true);
    return;
  }

  // ✅ 1 clic Premium = 1 run = 1 session (ultra robuste)
  // (évite toute ambiguïté entre relances rapides / multi-clics)
  clientRunIdRef.current = makeClientRunId();

  setPremiumError("");
  setPremiumLoading(true);
  setPremiumResult(null);
  setPremiumDone(false);
  setPremiumChat([]);
  setPremiumDraft("");
  setPremiumSessionId(null);
  setPremiumStep(0);
  setPremiumTotal(0);
  setPremiumQuestion(null);

  try {
    const res = await fetch("/api/optimiseur/premium/start", {
      method: "POST",
      headers: enteteAuth(),
      body: JSON.stringify({
        prompt: latestPrompt, // ✅ always latest
        scoreReport: latestReport, // ✅ always latest
        model,
        type: promptType,
        audience,
        clientRunId: clientRunIdRef.current, // ✅ NEW run id for this click
      }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Erreur premium start.");

    if (data?.alreadyPerfect) {
      setPremiumOpen(true);
      setPremiumChat([{ role: "pit", text: "Tu es déjà à 20/20 ✅" }]);
      setPremiumDone(true);
      setPremiumLoading(false);
      return;
    }

    setPremiumSessionId(data.sessionId);
    setPremiumStep(data.step);
    setPremiumTotal(data.totalSteps);
    setPremiumQuestion(data.question);

    setPremiumChat([
      { role: "pit", text: `On vise 20/20. Question ${data.step}/${data.totalSteps} :` },
      { role: "pit", text: data.question?.question || "—" },
    ]);

    setPremiumOpen(true);
  } catch (e: any) {
    setPremiumError(e?.message || "Erreur premium.");
    setPremiumOpen(true);
  } finally {
    setPremiumLoading(false);
  }
};

  const sendPremiumAnswer = async () => {
    if (!premiumSessionId || !premiumQuestion) return;
    const a = premiumDraft.trim();
    if (!a) return;

    setPremiumError("");
    setPremiumLoading(true);

    try {
      setPremiumChat((c) => [...c, { role: "user", text: a }]);
      setPremiumDraft("");

      const res = await fetch("/api/optimiseur/premium/answer", {
        method: "POST",
        headers: enteteAuth(),
        body: JSON.stringify({
          sessionId: premiumSessionId,
          questionId: premiumQuestion.id,
          answer: a,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Erreur premium answer.");

      if (data?.done) {
        setPremiumDone(true);
        setPremiumChat((c) => [
          ...c,
          { role: "pit", text: "Parfait. Je génère ta version 20/20…" },
        ]);

        const res2 = await fetch("/api/optimiseur/premium/complete", {
          method: "POST",
          headers: enteteAuth(),
          body: JSON.stringify({ sessionId: premiumSessionId }),
        });

        const out = await res2.json().catch(() => null);
        if (!res2.ok) throw new Error(out?.error || "Erreur premium complete.");

        const improvedPrompt = String(out?.improvedPrompt || "").trim();
        setPremiumResult({
          improvedPrompt,
          changes: Array.isArray(out?.changes) ? out.changes.map(String) : [],
          estimatedScoreAfter: Number(out?.estimatedScoreAfter ?? 20),
        });

        setPremiumChat((c) => [
          ...c,
          { role: "pit", text: "✅ Version prête. Tu peux l’appliquer ou la copier." },
        ]);

        return;
      }

      // next question
      setPremiumStep(data.step);
      setPremiumTotal(data.totalSteps);
      setPremiumQuestion(data.question);

      setPremiumChat((c) => [
        ...c,
        { role: "pit", text: `Question ${data.step}/${data.totalSteps} :` },
        { role: "pit", text: data.question?.question || "—" },
      ]);
    } catch (e: any) {
      setPremiumError(e?.message || "Erreur premium.");
    } finally {
      setPremiumLoading(false);
    }
  };

  const applyPremium = () => {
    const next = String(premiumResult?.improvedPrompt || "").trim();
    if (!next) return;

    setPrompt(next);
    promptRef.current = next; // ✅ FIX
    setPremiumOpen(false);

    // ✅ optionnel: rescoring automatique après apply
    setTimeout(() => {
      runScoreOnly().catch(() => {});
    }, 0);
  };

  const curveSvg = useMemo(() => {
    if (!showCurve || scores.length < 2) return null;

    const w = 520;
    const h = 160;
    const pad = 18;

    const minY = 0;
    const maxY = 20;

    const pts = scores.map((s, idx) => {
      const x = pad + (idx / (scores.length - 1)) * (w - 2 * pad);
      const y = pad + ((maxY - s) / (maxY - minY)) * (h - 2 * pad);
      return { x, y, s };
    });

    const d = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ");

    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[160px]">
        <line
          x1={pad}
          y1={h - pad}
          x2={w - pad}
          y2={h - pad}
          stroke="currentColor"
          opacity="0.15"
        />
        <line
          x1={pad}
          y1={pad}
          x2={pad}
          y2={h - pad}
          stroke="currentColor"
          opacity="0.15"
        />

        <line
          x1={pad}
          x2={w - pad}
          y1={pad + ((maxY - targetScore) / (maxY - minY)) * (h - 2 * pad)}
          y2={pad + ((maxY - targetScore) / (maxY - minY)) * (h - 2 * pad)}
          stroke="currentColor"
          opacity="0.25"
          strokeDasharray="4 4"
        />

        <path d={d} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill="currentColor" opacity="0.9" />
            <text
              x={p.x + 6}
              y={p.y - 6}
              fontSize="10"
              fill="currentColor"
              opacity="0.65"
            >
              {p.s.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    );
  }, [scores, showCurve, targetScore]);

  const premiumQCount = useMemo(() => {
    if (currentScore === null) return 3;
    return clamp(Math.ceil(20 - currentScore), 1, 3);
  }, [currentScore]);

  // 🔒 Mur de connexion : l'optimiseur est réservé aux utilisateurs connectés.
  if (!eleve) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
        {sessionPrete && (
          <div className="mx-auto w-full max-w-xl px-4 py-24 text-center space-y-5">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-sky-900">
              ✨ Valeria — Optimiseur de prompts pédagogique
            </p>
            <h1 className="text-3xl font-extrabold text-[#0047B6]">
              Réservé aux utilisateurs connectés
            </h1>
            <p className="text-slate-600">
              L&apos;optimiseur analyse et améliore tes prompts avec l&apos;IA.
              Connecte-toi avec tes codes établissement ou ton email pour
              l&apos;utiliser — c&apos;est gratuit.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#0047B6] text-white font-semibold hover:bg-[#003a94] transition"
            >
              Se connecter
            </Link>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
<header className="space-y-3">
  <div className="flex flex-wrap items-center gap-2">
    <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-sky-900">
      ✨ Valeria — Optimiseur de prompts pédagogique
    </p>
  </div>

  <h1 className="text-3xl font-extrabold text-[#0047B6]">
    Ton prompt devient plus clair, plus solide et plus fiable
  </h1>

  <p className="text-sm text-slate-700 max-w-2xl">
    Valeria analyse ton prompt, le note sur 20 (grille v{RUBRIC_VERSION}) et
    propose des améliorations progressives pour atteindre un niveau
    pédagogique élevé. Tu peux suivre l’évolution du score et décider
    quand arrêter l’optimisation.
  </p>

  <p className="text-[12px] text-slate-500 max-w-2xl">
    🔒 Valeria intègre en interne des garde-fous de qualité et de sécurité
    inspirés des bonnes pratiques de gouvernance de l’IA (ISO/IEC 42001)
    afin de limiter les dérives et améliorer la fiabilité des prompts.
  </p>
</header>

        {/* PARAMS */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Type chips */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Type de ressource</label>
              <div className="flex flex-wrap gap-2">
                <Chip active={promptType === "seance"} onClick={() => setPromptType("seance")}>
                  Séance
                </Chip>
                <Chip
                  active={promptType === "evaluation"}
                  onClick={() => setPromptType("evaluation")}
                >
                  Évaluation
                </Chip>
                <Chip active={promptType === "sequence"} onClick={() => setPromptType("sequence")}>
                  Séquence
                </Chip>
                <Chip active={promptType === "fiche"} onClick={() => setPromptType("fiche")}>
                  Fiche / méthode
                </Chip>
                <Chip active={promptType === "projet"} onClick={() => setPromptType("projet")}>
                  Projet
                </Chip>
                <Chip active={promptType === "autre"} onClick={() => setPromptType("autre")}>
                  Autre
                </Chip>
              </div>
              <p className="text-[11px] text-slate-500">
                Rend le scoring plus juste et évite les dérives.
              </p>
            </div>

            {/* Audience chips */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Public</label>
              <div className="flex flex-wrap gap-2">
                <Chip active={audience === "profs"} onClick={() => setAudience("profs")}>
                  👩‍🏫 Profs
                </Chip>
                <Chip active={audience === "eleves"} onClick={() => setAudience("eleves")}>
                  🧑‍🎓 Élèves
                </Chip>
              </div>
              <p className="text-[11px] text-slate-500">Transmis à l’API (scoring + improve).</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Score cible (sur 20)</label>
              <input
                type="number"
                step="0.5"
                value={targetScore}
                onChange={(e) =>
                  setTargetScore(clamp(Number(e.target.value || DEFAULT_TARGET_SCORE), 0, 20))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-[11px] text-slate-500">Recommandé : 19.5 (mais 20 possible)</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Max itérations</label>
              <input
                type="number"
                min={1}
                max={12}
                value={maxIters}
                onChange={(e) =>
                  setMaxIters(clamp(Number(e.target.value || DEFAULT_MAX_ITERS), 1, 12))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-[11px] text-slate-500">V1 stable : 6</p>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <label className="text-xs font-semibold text-slate-600">Options</label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setOptimisationOn((v) => !v)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                    optimisationOn
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {optimisationOn ? "✅ Optimisation ON" : "⛔ Optimisation OFF"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCurve((v) => !v)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                    showCurve
                      ? "bg-sky-50 border-sky-200 text-sky-900"
                      : "bg-slate-50 border-slate-200 text-slate-700"
                  }`}
                >
                  {showCurve ? "📈 Courbe ON" : "📉 Courbe OFF"}
                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="px-3 py-2 rounded-lg text-xs font-semibold border border-rose-200 bg-rose-50 text-rose-900"
                >
                  🔄 Reset
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Scoring à température 0 (stable). Improve réglable (tests). Stop possible à tout moment.
              </p>
            </div>
          </div>

          {/* Label dynamique */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">{expectations.title}</p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Ces attendus servent de repères : si ton prompt les contient, tu montes plus facilement vers 19–20.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {expectations.pills.map((x) => (
                  <span
                    key={x}
                    className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-3 grid gap-1 sm:grid-cols-2 text-[12px] text-slate-700">
              {expectations.lines.map((x, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-[2px] text-slate-400">•</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Model + Temperature controls */}
          <div className="grid gap-3 sm:grid-cols-3 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Modèle</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModel("gpt-4o-mini")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                    model === "gpt-4o-mini"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  gpt-4o-mini
                </button>
                <button
                  type="button"
                  onClick={() => setModel("gpt-4o")}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                    model === "gpt-4o"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  gpt-4o
                </button>
              </div>
              <p className="text-[11px] text-slate-500">S’applique à Score + Improve.</p>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600">
                Température (Improve) : <span className="font-bold">{formatTemp(temperatureImprove)}</span>
              </label>
              <input
                type="range"
                min={0}
                max={0.8}
                step={0.05}
                value={temperatureImprove}
                onChange={(e) => setTemperatureImprove(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>0 (déterministe)</span>
                <span>0.8 (plus créatif)</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROMPT */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-[#0047B6]">1) Prompt</h2>
            <button
              type="button"
              onClick={() => copy((promptRef.current || prompt || "").trim())}
              disabled={!((promptRef.current || prompt || "").trim())}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                ((promptRef.current || prompt || "").trim())
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              📋 Copier
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => {
              const v = e.target.value;
              setPrompt(v);
              promptRef.current = v; // ✅ always latest
            }}
            placeholder="Colle ici ton prompt à optimiser…"
            className="w-full min-h-[220px] border rounded-xl px-3 py-2 text-[12px] font-mono bg-slate-50"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={runScoreOnly}
              disabled={loading || !((promptRef.current || prompt || "").trim())}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                loading || !((promptRef.current || prompt || "").trim())
                  ? "bg-slate-100 text-slate-400"
                  : "bg-white border border-slate-300 hover:bg-slate-50"
              }`}
            >
              🧪 Scorer
            </button>

            <button
              type="button"
              onClick={runOptimisation}
              disabled={loading || !((promptRef.current || prompt || "").trim())}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                loading || !((promptRef.current || prompt || "").trim())
                  ? "bg-sky-100 text-sky-500"
                  : "bg-[#0047B6] text-white hover:bg-[#003894]"
              }`}
            >
              ✨ Lancer Valeria
            </button>

            <button
              type="button"
              onClick={stop}
              disabled={!loading}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                !loading
                  ? "bg-slate-100 text-slate-400"
                  : "bg-amber-100 text-amber-900 hover:bg-amber-200"
              }`}
            >
              ⏹ Stop
            </button>

            {loading && (
              <span className="text-xs text-slate-600">Valeria tourne… (tu peux Stop quand tu veux)</span>
            )}

            {stopped && !loading && (
              <span className="text-xs font-semibold text-amber-700">⏸ Arrêt demandé.</span>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
              <p className="text-sm font-semibold text-rose-800">⚠️ {error}</p>
            </div>
          )}
        </section>

        {/* SCORE */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0047B6]">2) Indicateurs (aide à la décision)</h2>
            <div className="text-xs text-slate-600">
              {best !== null ? (
                <span>
                  Meilleur : <b>{best.toFixed(1)}/20</b>
                </span>
              ) : (
                <span>—</span>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Score actuel</p>
              <p className="text-3xl font-extrabold">
                {currentScore === null ? "—" : `${currentScore.toFixed(1)}`}
                <span className="text-base font-semibold text-slate-600"> /20</span>
              </p>
              <p className="text-[11px] text-slate-500">Cible : {targetScore.toFixed(1)}</p>

              <p className="mt-2 text-[11px] text-slate-500">
                Type : <b>{promptType}</b> • Public : <b>{audience}</b> • Modèle : <b>{model}</b> • Improve temp :{" "}
                <b>{formatTemp(temperatureImprove)}</b>
              </p>
              <p className="text-[11px] text-slate-500">Rubrique : v{RUBRIC_VERSION}</p>

              {/* ✅ Premium button (Option 1) */}
              <button
                type="button"
                onClick={startPremium}
                disabled={
                  premiumLoading ||
                  loading ||
                  !((promptRef.current || prompt || "").trim()) ||
                  currentScore === null ||
                  currentReport === null ||
                  currentScore >= 20
                }
                className={[
                  "mt-3 w-full px-3 py-2 rounded-lg text-xs font-bold border transition",
                  premiumLoading ||
                  loading ||
                  !currentReport ||
                  currentScore === null ||
                  currentScore >= 20
                    ? "bg-slate-100 text-slate-400 border-slate-200"
                    : "bg-purple-600 text-white border-purple-700 hover:bg-purple-700",
                ].join(" ")}
              >
                🟣 pitexplique Premium — passer à 20/20
              </button>
              <p className="mt-1 text-[11px] text-slate-500">Coaching : {premiumQCount} question(s).</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Breakdown</p>
              {currentReport ? (
                <ul className="mt-2 text-[12px] text-slate-800 space-y-1">
                  <li>
                    Clarté : <b>{currentReport.breakdown.clarity}/4</b>
                  </li>
                  <li>
                    Contexte : <b>{currentReport.breakdown.context}/4</b>
                  </li>
                  <li>
                    Conformité : <b>{currentReport.breakdown.compliance}/4</b>
                  </li>
                  <li>
                    Structure : <b>{currentReport.breakdown.structure}/4</b>
                  </li>
                  <li>
                    Robustesse : <b>{currentReport.breakdown.robustness}/4</b>
                  </li>
                </ul>
              ) : (
                <p className="mt-2 text-[12px] text-slate-500">Lance un scoring.</p>
              )}
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Conseils clés</p>
              {currentReport?.fixes?.length ? (
                <ul className="mt-2 text-[12px] text-slate-800 list-disc pl-4 space-y-1">
                  {currentReport.fixes.slice(0, 4).map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-[12px] text-slate-500">—</p>
              )}
            </div>
          </div>

          {curveSvg && (
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-semibold text-slate-700 mb-2">📈 Courbe de convergence</p>
              <div className="text-slate-900">{curveSvg}</div>
              <p className="mt-2 text-[11px] text-slate-500">Ligne pointillée = score cible.</p>
            </div>
          )}
        </section>

        {/* HISTORIQUE */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-3">
          <h2 className="text-lg font-bold text-[#0047B6]">3) Historique</h2>

          {history.length === 0 ? (
            <p className="text-sm text-slate-600">Aucun run. Clique sur “Scorer” ou “Lancer Valeria”.</p>
          ) : (
            <div className="space-y-2">
              {history
                .slice()
                .reverse()
                .slice(0, 10)
                .map((h) => (
                  <div key={h.iter} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-800">#{h.iter} — {h.note || "Itération"}</p>
                        <p className="text-xs text-slate-700">
                          Score :{" "}
                          <b>{typeof h.score === "number" ? `${h.score.toFixed(1)}/20` : "—"}</b>{" "}
                          <span className="text-slate-500">
                            • Type : {h.type || "—"} • Public : {h.audience || "—"}
                          </span>
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => copy(h.prompt)}
                        className="px-2 py-1 text-[11px] font-semibold border rounded-md bg-white border-slate-300 hover:bg-slate-100"
                      >
                        📋 Copier
                      </button>
                    </div>

                    <p className="mt-2 text-[11px] text-slate-600 line-clamp-3 font-mono">
                      {h.prompt.replace(/\s+/g, " ").slice(0, 260)}
                      {h.prompt.length > 260 ? "…" : ""}
                    </p>
                  </div>
                ))}
              <p className="text-[11px] text-slate-500">Affichage : 10 derniers événements.</p>
            </div>
          )}
        </section>
      </div>

      {/* ✅ PREMIUM DRAWER (Option 1) */}
      {premiumOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => !premiumLoading && setPremiumOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[460px] bg-white shadow-2xl border-l border-slate-200 flex flex-col">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-black">
                  π
                </div>
                <div>
                  <p className="text-sm font-extrabold">pitexplique Premium</p>
                  <p className="text-[11px] text-slate-500">
                    {premiumDone
                      ? "Résultat"
                      : premiumTotal
                        ? `Question ${premiumStep}/${premiumTotal}`
                        : "Coaching vers 20/20"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => !premiumLoading && setPremiumOpen(false)}
                className="px-2 py-1 rounded-md border text-xs font-semibold bg-white hover:bg-slate-50"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-3">
              {premiumChat.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={[
                      "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug border whitespace-pre-wrap",
                      m.role === "user"
                        ? "bg-sky-50 border-sky-200 text-slate-900"
                        : "bg-slate-50 border-slate-200 text-slate-900",
                    ].join(" ")}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {premiumError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                  <p className="text-xs font-semibold text-rose-800">⚠️ {premiumError}</p>
                </div>
              )}

              {premiumResult && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 space-y-2">
                  <p className="text-xs font-extrabold text-emerald-900">
                    ✅ Version prête ({(premiumResult.estimatedScoreAfter ?? 20).toFixed(1)}/20 estimé)
                  </p>

                  {premiumResult.changes?.length ? (
                    <ul className="text-[12px] text-emerald-900 list-disc pl-4 space-y-1">
                      {premiumResult.changes.slice(0, 6).map((x, i) => (
                        <li key={i}>{x}</li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={applyPremium}
                      className="px-3 py-2 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
                    >
                      Appliquer
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(premiumResult.improvedPrompt)}
                      className="px-3 py-2 rounded-lg text-xs font-bold border bg-white hover:bg-slate-50"
                    >
                      Copier
                    </button>
                  </div>
                </div>
              )}
            </div>

            {!premiumDone && (
              <div className="p-4 border-t border-slate-200 space-y-2">
                <textarea
                  value={premiumDraft}
                  onChange={(e) => setPremiumDraft(e.target.value)}
                  placeholder="Ta réponse…"
                  className="w-full min-h-[72px] border rounded-xl px-3 py-2 text-[12px] bg-slate-50"
                  disabled={premiumLoading}
                />
                <button
                  type="button"
                  onClick={sendPremiumAnswer}
                  disabled={premiumLoading || !premiumDraft.trim() || !premiumQuestion}
                  className={[
                    "w-full px-3 py-2 rounded-lg text-xs font-bold border transition",
                    premiumLoading || !premiumDraft.trim() || !premiumQuestion
                      ? "bg-slate-100 text-slate-400 border-slate-200"
                      : "bg-slate-900 text-white border-slate-900 hover:bg-slate-800",
                  ].join(" ")}
                >
                  {premiumLoading ? "…" : "Envoyer"}
                </button>
                <p className="text-[11px] text-slate-500">
                  Objectif : répondre aux 1–3 points qui manquent pour atteindre 20/20.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}