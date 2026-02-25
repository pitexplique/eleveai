// app/optimiseur/OptimiseurClient.tsx
// ✅ Valeria V2-ready : Type en chips + Audience (Profs/Élèves) en chips
// ✅ targetScore par défaut = 20
// ✅ Envoie meta.type + meta.audience à /score, et type + audience à /improve
// ✅ NEW : affiche un label dynamique (attendus) selon Type + Public

"use client";

import React, { useMemo, useRef, useState } from "react";
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
          lines: [...baseEleve, "Espaces “Réponse : ____”", "Barème seulement si demandé"],
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
          lines: [...baseEleve, "Ce que je fais séance 1/2/3", "Trace / production"],
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

export default function OptimiseurClient() {
  const [prompt, setPrompt] = useState("");

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

  // ✅ NEW : label dynamique (attendus)
  const expectations = useMemo(
    () => getExpectations(promptType, audience),
    [promptType, audience],
  );

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
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        prompt: p,
        model,
        temperature: 0,
        // ✅ IMPORTANT : ton API score lit body.meta.type + meta.audience
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

  const improveOnce = async (p: string, report: ScoreReport, signal?: AbortSignal) => {
    const res = await fetch("/api/optimiseur/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        prompt: p,
        scoreReport: report,
        model,
        temperature: formatTemp(temperatureImprove),
        // ✅ IMPORTANT : ton API improve lit body.type + audience
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
  };

  const runScoreOnly = async () => {
    const p = prompt.trim();
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
    const initial = prompt.trim();
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
            <text x={p.x + 6} y={p.y - 6} fontSize="10" fill="currentColor" opacity="0.65">
              {p.s.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>
    );
  }, [scores, showCurve, targetScore]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 space-y-6">
        <header className="space-y-2">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-sky-900">
            ✨ Valeria — Optimiseur de prompts (notation + améliorations)
          </p>

          <h1 className="text-3xl font-extrabold text-[#0047B6]">
            Ton prompt devient plus clair, plus solide, plus conforme
          </h1>

          <p className="text-sm text-slate-700 max-w-2xl">
            Valeria évalue ton prompt sur 20 (grille v{RUBRIC_VERSION}), repère les points faibles, puis
            l’améliore étape par étape jusqu’au score cible (ou arrêt manuel). Résultat : un prompt fiable
            et directement exploitable.
          </p>
        </header>

        {/* PARAMS */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* ✅ Type chips */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Type de ressource</label>
              <div className="flex flex-wrap gap-2">
                <Chip active={promptType === "seance"} onClick={() => setPromptType("seance")}>
                  Séance
                </Chip>
                <Chip active={promptType === "evaluation"} onClick={() => setPromptType("evaluation")}>
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
              <p className="text-[11px] text-slate-500">Rend le scoring plus juste et évite les dérives.</p>
            </div>

            {/* ✅ Audience chips */}
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

          {/* ✅ NEW : Label dynamique selon Type + Public */}
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
              onClick={() => copy(prompt)}
              disabled={!prompt.trim()}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border ${
                prompt.trim()
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              📋 Copier
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Colle ici ton prompt à optimiser…"
            className="w-full min-h-[220px] border rounded-xl px-3 py-2 text-[12px] font-mono bg-slate-50"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={runScoreOnly}
              disabled={loading || !prompt.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                loading || !prompt.trim()
                  ? "bg-slate-100 text-slate-400"
                  : "bg-white border border-slate-300 hover:bg-slate-50"
              }`}
            >
              🧪 Scorer
            </button>

            <button
              type="button"
              onClick={runOptimisation}
              disabled={loading || !prompt.trim()}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                loading || !prompt.trim()
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

        {/* SCORE LIVE */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0047B6]">2) Score en temps réel</h2>
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
              <p className="text-[11px] text-slate-500">
                Type : <b>{promptType}</b> • Public : <b>{audience}</b> • Modèle : <b>{model}</b> • Improve temp :{" "}
                <b>{formatTemp(temperatureImprove)}</b>
              </p>
              <p className="text-[11px] text-slate-500">Rubrique : v{RUBRIC_VERSION}</p>
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
                          Score : <b>{typeof h.score === "number" ? `${h.score.toFixed(1)}/20` : "—"}</b>{" "}
                          <span className="text-slate-500">• Type : {h.type || "—"} • Public : {h.audience || "—"}</span>
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
    </main>
  );
}