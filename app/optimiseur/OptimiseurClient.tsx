// app/optimiseur/OptimiseurClient.tsx
"use client";

import { useMemo, useRef, useState } from "react";
import {
  DEFAULT_MAX_ITERS,
  DEFAULT_TARGET_SCORE,
  RUBRIC_VERSION,
} from "@/lib/promptRubric";

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
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function formatTemp(t: number) {
  // on évite les flottants chelous
  return Math.round(t * 100) / 100;
}

export default function OptimiseurClient() {
  const [prompt, setPrompt] = useState("");

  const [targetScore, setTargetScore] = useState(DEFAULT_TARGET_SCORE);
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

  // 🔧 tes ajouts : choix modèle + temperature (pour IMPROVE)
  const [model, setModel] = useState<"gpt-4o-mini" | "gpt-4o">("gpt-4o-mini");
  const [temperatureImprove, setTemperatureImprove] = useState<number>(0);

  const scores = useMemo(() => {
    return history
      .map((h) => (typeof h.score === "number" ? h.score : null))
      .filter((x): x is number => x !== null);
  }, [history]);

  const best = useMemo(() => {
    if (!scores.length) return null;
    return Math.max(...scores);
  }, [scores]);

  // --- API helpers (debug robuste: lecture text puis parse JSON) ---

  const scoreOnce = async (p: string, signal?: AbortSignal) => {
    const res = await fetch("/api/optimiseur/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        prompt: p, 
        // on force scoring stable (temp=0)
        model,
        temperature: 0,
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
      // très utile si ton API renvoie { raw: "..."} en cas de JSON invalide
      if (data?.raw) console.log("📦 RAW FIELD (improve):", data.raw);
      throw new Error(data?.error || "Erreur improve.");
    }

    return data as { improvedPrompt: string; changes: string[] };
  };

  // --- Controls ---

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

  // --- Actions ---

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

        // 1) SCORE (toujours temp=0)
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
          },
        ]);

        if (report.score > bestScore) {
          bestScore = report.score;
          bestPrompt = p;
        }

        // stop condition
        if (report.score >= targetScore) break;

        // 2) IMPROVE (si toggle ON)
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
            },
          ]);
          break;
        }

        p = next;
      }

      // Fin : remet le meilleur prompt dans le champ
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
    } catch {
      // ignore
    }
  };

  // --- Courbe simple (SVG) ---

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
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="currentColor" opacity="0.15" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="currentColor" opacity="0.15" />

        {/* cible */}
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
            ✨ Valeria · Optimiseur de prompt (V1)
          </p>
          <h1 className="text-3xl font-extrabold text-[#0047B6]">
            Scoring → Optimisation → Convergence
          </h1>
          <p className="text-sm text-slate-700 max-w-2xl">
            Colle un prompt, Valeria l’évalue (/20) via une grille interne (v{RUBRIC_VERSION}),
            puis l’améliore en boucle jusqu’à la cible (ou stop).
          </p>
        </header>

        {/* PARAMS */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
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
              <p className="text-[11px] text-slate-500">Recommandé : 19.5</p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600">Max itérations</label>
              <input
                type="number"
                min={1}
                max={12}
                value={maxIters}
                onChange={(e) => setMaxIters(clamp(Number(e.target.value || DEFAULT_MAX_ITERS), 1, 12))}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-[11px] text-slate-500">V1 stable : 6</p>
            </div>

            <div className="space-y-2">
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

          {/* NEW: Model + Temperature controls */}
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
              <span className="text-xs text-slate-600">
                Valeria tourne… (tu peux Stop quand tu veux)
              </span>
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
                Modèle : <b>{model}</b> • Improve temp : <b>{formatTemp(temperatureImprove)}</b>
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-600">Breakdown</p>
              {currentReport ? (
                <ul className="mt-2 text-[12px] text-slate-800 space-y-1">
                  <li>Clarté : <b>{currentReport.breakdown.clarity}/4</b></li>
                  <li>Contexte : <b>{currentReport.breakdown.context}/4</b></li>
                  <li>Conformité : <b>{currentReport.breakdown.compliance}/4</b></li>
                  <li>Structure : <b>{currentReport.breakdown.structure}/4</b></li>
                  <li>Robustesse : <b>{currentReport.breakdown.robustness}/4</b></li>
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
            <p className="text-sm text-slate-600">
              Aucun run. Clique sur “Scorer” ou “Lancer Valeria”.
            </p>
          ) : (
            <div className="space-y-2">
              {history
                .slice()
                .reverse()
                .slice(0, 10)
                .map((h) => (
                  <div key={h.iter} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800">
                        #{h.iter} — {h.note || "Itération"}
                      </p>
                      <p className="text-xs text-slate-700">
                        Score :{" "}
                        <b>{typeof h.score === "number" ? `${h.score.toFixed(1)}/20` : "—"}</b>
                      </p>
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

