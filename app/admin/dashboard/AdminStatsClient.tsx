// app/admin/dashboard/AdminStatsClient.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type EtabItem = { code: string; eleves: number; profs: number };

type Stats = {
  ok: boolean;
  scope: string;
  etablissements: EtabItem[];
  kpis: {
    comptesEtab: { eleves: number; profs: number; principaux: number };
    comptesEmail: { total: number; paid: number; eleves: number };
    nbEtablissements: number;
    activitesTotal: number;
    activitesAujourdhui: number;
    activites7j: number;
    moyenneGenerale: number | null;
    elevesActifs7j: number;
    elevesActifs30j: number;
  };
  parModule: Record<string, number>;
  engagement: { date: string; count: number }[];
  avis: {
    total: number;
    nonTraites: number;
    noteMoyenne: number | null;
    derniers: {
      id: string | number;
      type: string | null;
      note: number | null;
      message: string | null;
      prenom: string | null;
      classe: string | null;
      code_etablissement: string | null;
      created_at: string;
    }[];
  };
};

const MODULES: { key: string; label: string; color: string }[] = [
  { key: "parcours", label: "🛤️ Parcours", color: "bg-violet-500" },
  { key: "calcul", label: "⚡ Calcul rapide", color: "bg-lime-500" },
  { key: "defis", label: "🎯 Défis du jour", color: "bg-orange-500" },
  { key: "coach", label: "🧠 Coach IA", color: "bg-indigo-500" },
  { key: "english", label: "🇬🇧 English-Maths", color: "bg-sky-500" },
];

function jourCourt(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(d);
}

function dateAvis(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function Kpi({
  label,
  value,
  sub,
  color = "text-white",
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-1.5 text-2xl font-black ${color}`}>{value}</p>
      {sub && <p className="mt-0.5 text-[11px] font-semibold text-slate-500">{sub}</p>}
    </div>
  );
}

export default function AdminStatsClient() {
  const [scope, setScope] = useState("all");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (s: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/admin/stats?etab=${encodeURIComponent(s)}`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Erreur de chargement");
      setStats(data as Stats);
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(scope);
  }, [scope, load]);

  const scopeLabel = useMemo(() => {
    if (scope === "all") return "Toute la plateforme";
    if (scope === "INDEPENDANT") return "Comptes sans collège";
    return `Collège ${scope}`;
  }, [scope]);

  const maxEngagement = useMemo(
    () => Math.max(1, ...(stats?.engagement.map((e) => e.count) ?? [1])),
    [stats]
  );
  const totalModules = useMemo(
    () =>
      Math.max(
        1,
        Object.values(stats?.parModule ?? {}).reduce((s, n) => s + n, 0)
      ),
    [stats]
  );

  return (
    <section className="space-y-5">
      {/* Sélecteur de périmètre */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Périmètre
          </p>
          <p className="text-lg font-black text-white">{scopeLabel}</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-semibold text-slate-100"
          >
            <option value="all">🌍 Toute la plateforme</option>
            <option value="INDEPENDANT">👤 Sans collège (comptes email)</option>
            <optgroup label="Collèges">
              {stats?.etablissements.map((e) => (
                <option key={e.code} value={e.code}>
                  🏫 {e.code} ({e.eleves} él.)
                </option>
              ))}
            </optgroup>
          </select>
          <button
            type="button"
            onClick={() => load(scope)}
            className="rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800"
          >
            ↻
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300">
          {error}
        </p>
      )}

      {loading || !stats ? (
        <p className="text-slate-400">Chargement des statistiques…</p>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi
              label="Élèves (collèges)"
              value={stats.kpis.comptesEtab.eleves}
              sub={`${stats.kpis.comptesEtab.profs + stats.kpis.comptesEtab.principaux} profs / staff`}
              color="text-emerald-400"
            />
            <Kpi
              label="Comptes sans collège"
              value={stats.kpis.comptesEmail.total}
              sub={`${stats.kpis.comptesEmail.paid} payants`}
              color="text-amber-400"
            />
            <Kpi
              label="Établissements"
              value={stats.kpis.nbEtablissements}
              sub="collèges actifs"
              color="text-sky-400"
            />
            <Kpi
              label="Élèves actifs (7j)"
              value={stats.kpis.elevesActifs7j}
              sub={`${stats.kpis.elevesActifs30j} sur 30j`}
              color="text-pink-400"
            />
            <Kpi
              label="Activités totales"
              value={stats.kpis.activitesTotal}
              sub="tous modules"
              color="text-white"
            />
            <Kpi
              label="Aujourd'hui"
              value={stats.kpis.activitesAujourdhui}
              sub="activités"
              color="text-white"
            />
            <Kpi
              label="7 derniers jours"
              value={stats.kpis.activites7j}
              sub="activités"
              color="text-white"
            />
            <Kpi
              label="Moyenne générale"
              value={
                stats.kpis.moyenneGenerale !== null
                  ? `${stats.kpis.moyenneGenerale} %`
                  : "—"
              }
              sub="tous modules notés"
              color="text-purple-400"
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Engagement 7 jours */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-bold text-slate-200">
                📈 Engagement — 7 derniers jours
              </h3>
              <div className="mt-4 flex h-32 items-end justify-between gap-2">
                {stats.engagement.map((e) => (
                  <div key={e.date} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400">
                      {e.count}
                    </span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400"
                      style={{
                        height: `${Math.max(4, (e.count / maxEngagement) * 100)}px`,
                      }}
                    />
                    <span className="text-[10px] font-semibold capitalize text-slate-500">
                      {jourCourt(e.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Répartition par module */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-bold text-slate-200">
                🧩 Répartition par module
              </h3>
              <div className="mt-4 space-y-2.5">
                {MODULES.map((m) => {
                  const n = stats.parModule[m.key] ?? 0;
                  const pct = Math.round((n / totalModules) * 100);
                  return (
                    <div key={m.key}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          {m.label}
                        </span>
                        <span className="font-bold text-slate-400">
                          {n} · {pct}%
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${m.color}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Derniers avis */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-200">⭐ Derniers avis</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 font-bold text-amber-300">
                  Note moy. {stats.avis.noteMoyenne ?? "—"}
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 font-bold text-slate-300">
                  {stats.avis.total} retours
                </span>
                {stats.avis.nonTraites > 0 && (
                  <span className="rounded-full bg-pink-500/20 px-2.5 py-1 font-bold text-pink-300">
                    {stats.avis.nonTraites} non traités
                  </span>
                )}
              </div>
            </div>

            {stats.avis.derniers.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">Aucun avis sur ce périmètre.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {stats.avis.derniers.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-xl border border-slate-800 bg-slate-950/50 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-emerald-300">
                        {a.prenom || "Élève"}
                        {a.classe ? ` · ${a.classe}` : ""}
                        {a.code_etablissement ? ` · ${a.code_etablissement}` : ""}
                      </span>
                      <span className="flex items-center gap-2 text-slate-400">
                        {a.note ? (
                          <span className="text-amber-300">
                            {"★".repeat(Math.round(a.note))}
                          </span>
                        ) : null}
                        {a.type ? <span>{a.type}</span> : null}
                        <span>{dateAvis(a.created_at)}</span>
                      </span>
                    </div>
                    {a.message && (
                      <p className="mt-1.5 whitespace-pre-wrap text-sm text-slate-200">
                        {a.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
