"use client";

import { useState } from "react";
import type { Bulletin, PeriodeCle } from "@/lib/bulletin/types";

// Affichage « tableau de bord » d'un bulletin (compteurs à aiguille, notes /20).
// Réutilisable : aperçu accueil (données de démo) ET dashboard élève.
// Carte blanche autonome → s'intègre aussi bien sur fond clair que foncé.

const MATIERES: Record<string, { emoji: string; label: string }> = {
  maths: { emoji: "🔢", label: "Maths" },
  francais: { emoji: "📚", label: "Français" },
  anglais: { emoji: "🇬🇧", label: "Anglais" },
  espagnol: { emoji: "🇪🇸", label: "Espagnol" },
  eco: { emoji: "📈", label: "Éco" },
  brevet: { emoji: "🎓", label: "Brevet" },
};
const matInfo = (m: string) => MATIERES[m] ?? { emoji: "📘", label: m };

const PERIODES: { cle: PeriodeCle; label: string; jours: number }[] = [
  { cle: "30j", label: "30 jours", jours: 30 },
  { cle: "trim", label: "Trimestre", jours: 90 },
  { cle: "debut", label: "Depuis le début", jours: 180 },
];

function tier(v: number) {
  if (v < 8) return "#E24B4A";
  if (v < 12) return "#EF9F27";
  if (v < 16) return "#639922";
  return "#1D9E75";
}
function fr(n: number | null) {
  return n === null ? "—" : n.toFixed(1).replace(".", ",");
}

function Gauge({ value, size }: { value: number | null; size: number }) {
  const max = 20;
  const v = value ?? 0;
  const stroke = size * 0.085;
  const cx = size / 2;
  const cy = size * 0.52;
  const r = size * 0.42;
  const pt = (a: number): [number, number] => {
    const rad = (a * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  };
  const L = pt(180);
  const R = pt(0);
  const av = 180 * (1 - Math.max(0, Math.min(v, max)) / max);
  const V = pt(av);
  const nr = r * 0.8;
  const na = (av * Math.PI) / 180;
  const nx = cx + nr * Math.cos(na);
  const ny = cy - nr * Math.sin(na);
  return (
    <svg viewBox={`0 0 ${size} ${size * 0.6}`} className="mx-auto block w-full" style={{ maxWidth: size }}>
      <path d={`M ${L[0]} ${L[1]} A ${r} ${r} 0 0 1 ${R[0]} ${R[1]}`} fill="none" stroke="#e2e8f0" strokeWidth={stroke} strokeLinecap="round" />
      {value !== null && v > 0.1 && (
        <path d={`M ${L[0]} ${L[1]} A ${r} ${r} 0 0 1 ${V[0]} ${V[1]}`} fill="none" stroke={tier(v)} strokeWidth={stroke} strokeLinecap="round" />
      )}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#0f172a" strokeWidth={size * 0.022} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={size * 0.04} fill="#0f172a" />
    </svg>
  );
}

export default function BulletinDashboard({ bulletin }: { bulletin: Bulletin }) {
  const [cle, setCle] = useState<PeriodeCle>("30j");
  const p = bulletin.periodes[cle];
  const fenetre = PERIODES.find((x) => x.cle === cle)?.jours ?? 30;
  const assPct = Math.min(100, Math.round((p.assiduite.jours / fenetre) * 100));
  const assColor =
    p.assiduite.niveau === "Assidu" ? "#1D9E75" : p.assiduite.niveau === "Régulier" ? "#EF9F27" : "#94a3b8";
  const progColor = p.progression === null ? "#64748b" : p.progression >= 0 ? "#1D9E75" : "#E24B4A";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 text-slate-900 shadow-xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-black text-sky-700">
            {(bulletin.prenom || "É").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-base font-black leading-tight">Bulletin de {bulletin.prenom || "—"}</p>
            <p className="text-xs font-semibold text-slate-500">{bulletin.classe ?? "—"}</p>
          </div>
        </div>
        <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1">
          {PERIODES.map((x) => (
            <button
              key={x.cle}
              type="button"
              onClick={() => setCle(x.cle)}
              className={[
                "rounded-lg px-3 py-1.5 text-xs font-bold transition",
                cle === x.cle ? "bg-white text-slate-900 shadow" : "text-slate-500 hover:text-slate-800",
              ].join(" ")}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 p-3">
          <p className="text-xs font-semibold text-slate-500">Moyenne générale</p>
          <Gauge value={p.moyenne} size={170} />
          <p className="text-2xl font-black">
            {fr(p.moyenne)}
            <span className="text-sm font-bold text-slate-400"> /20</span>
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl border border-slate-200 p-3">
            <p className="text-xs font-semibold text-slate-500">⛽ Assiduité</p>
            <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full" style={{ width: `${assPct}%`, background: assColor }} />
            </div>
            <p className="mt-1.5 text-sm">
              <span className="font-bold">{p.assiduite.jours} jours</span> d&apos;activité ·{" "}
              <span className="text-slate-500">{p.assiduite.niveau}</span>
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-3">
            <p className="text-xs font-semibold text-slate-500">📈 Progression</p>
            <p className="text-2xl font-black" style={{ color: progColor }}>
              {p.progression === null ? "—" : `${p.progression >= 0 ? "+" : ""}${fr(p.progression)}`}
              <span className="text-sm font-bold text-slate-400"> pts</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {p.matieres.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-slate-200 p-4 text-center text-sm text-slate-500">
            Pas encore de note — fais quelques exercices, tes compteurs vont grimper !
          </p>
        ) : (
          p.matieres.map((m) => (
            <div key={m.matiere} className="rounded-2xl border border-slate-200 p-2 text-center">
              <p className="text-xs font-semibold text-slate-500">
                {matInfo(m.matiere).emoji} {matInfo(m.matiere).label}
              </p>
              <Gauge value={m.note} size={116} />
              <p className="text-base font-black">
                {fr(m.note)}
                <span className="text-[11px] font-bold text-slate-400">/20</span>
              </p>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 rounded-2xl border border-sky-200 bg-sky-50 p-3">
        <p className="text-xs font-black uppercase tracking-wide text-sky-700">💬 Appréciation</p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-sky-900">{p.appreciation}</p>
      </div>
    </div>
  );
}
