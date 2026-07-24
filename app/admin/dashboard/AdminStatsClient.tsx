// app/admin/dashboard/AdminStatsClient.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { prenomCourt } from "@/lib/prenom";

type EtabItem = { code: string; eleves: number; profs: number };

type Stats = {
  ok: boolean;
  scope: string;
  etablissements: EtabItem[];
  kpis: {
    comptesEtab: { eleves: number; profs: number; principaux: number };
    comptesEmail: {
      total: number;
      paid: number;
      eleves: number;
      cahier: number;
      newsletter: number;
    };
    nbEtablissements: number;
    activitesTotal: number;
    activitesAujourdhui: number;
    activites7j: number;
    elevesAvecResultats: number;
    moyenneGenerale: number | null;
    connectesAujourdhui: number;
    connectes7j: number;
    connectes30j: number;
  };
  parModule: Record<string, number>;
  moyenneParModule: Record<string, number | null>;
  engagement: { date: string; count: number }[];
  derniersConnectes: {
    code_utilisateur: string | null;
    nom: string | null;
    classe: string | null;
    type: string | null;
    source: string | null;
    created_at: string;
  }[];
  navigation: {
    total30: number;
    topPages: { page: string; count: number; count7: number }[];
  };
  geo: {
    total30: number;
    /** Vues sans pays : lignes d'avant la colonne `pays`, ou dev local. Hors calcul. */
    inconnus30: number;
    inconnus7: number;
    parPays: { pays: string; count: number; count7: number }[];
    topPagesParPays: Record<string, { page: string; count: number }[]>;
  };
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
      reponse: string | null;
      reponse_at: string | null;
      suspectIA?: boolean;
      raisonIA?: string | null;
    }[];
  };
};

const MODULES: { key: string; label: string; color: string }[] = [
  { key: "parcours", label: "🛤️ Parcours", color: "bg-violet-500" },
  { key: "calcul", label: "⚡ Calcul rapide", color: "bg-lime-500" },
  { key: "defis", label: "🎯 Défis du jour", color: "bg-orange-500" },
  { key: "coach", label: "🧠 Coach IA", color: "bg-indigo-500" },
  { key: "english", label: "🇬🇧 English-Maths", color: "bg-sky-500" },
  { key: "dictee", label: "✍️ Dictée du jour", color: "bg-cyan-500" },
];

// Libellés lisibles des sections (1er segment d'URL) — « où vont les élèves ».
const SECTION_LABELS: Record<string, string> = {
  "/": "🏠 Accueil",
  "/accueil": "🏠 Accueil",
  "/tutor-v4": "🧠 Coach / Tutor",
  "/coach-ia": "🧠 Coach IA",
  "/parcours": "🛤️ Parcours",
  "/parcours-ia": "🤖 Parcours IA",
  "/calcul-rapide": "⚡ Calcul rapide",
  "/dico": "📖 Dico",
  "/fiches-cours": "📄 Fiches de cours",
  "/maths-974": "🌋 Maths 974",
  "/cahier-vacances": "☀️ Cahiers de vacances",
  "/eval-pix-ia": "🤖 Éval Pix IA",
};
function sectionLabel(page: string) {
  return SECTION_LABELS[page] ?? page;
}

// Code ISO 2 lettres -> drapeau emoji (indicateurs régionaux Unicode).
function drapeau(code: string) {
  if (!/^[A-Z]{2}$/.test(code)) return "🏳️";
  return String.fromCodePoint(
    ...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
const PAYS_NOMS: Record<string, string> = {
  FR: "France", RE: "La Réunion", US: "États-Unis", GP: "Guadeloupe",
  MQ: "Martinique", GF: "Guyane", YT: "Mayotte", NC: "Nouvelle-Calédonie",
  PF: "Polynésie fr.", TN: "Tunisie", MG: "Madagascar", MU: "Maurice",
  KM: "Comores", SC: "Seychelles", BE: "Belgique", CH: "Suisse", CA: "Canada",
  MA: "Maroc", DZ: "Algérie", SN: "Sénégal", CI: "Côte d'Ivoire", CM: "Cameroun",
  DE: "Allemagne", GB: "Royaume-Uni", ES: "Espagne", IT: "Italie",
  PT: "Portugal", NL: "Pays-Bas", LU: "Luxembourg", CN: "Chine", IN: "Inde",
  RU: "Russie", BR: "Brésil",
};
function paysLabel(code: string) {
  if (!code || code === "??") return "🏳️ Inconnu";
  return `${drapeau(code)} ${PAYS_NOMS[code] ?? code}`;
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
  const [openAvis, setOpenAvis] = useState<Set<string | number>>(new Set());
  const [openPays, setOpenPays] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Réponses aux avis (retours_eleves), saisies depuis le dashboard.
  const [avisDrafts, setAvisDrafts] = useState<Record<string, string>>({});
  const [savingAvis, setSavingAvis] = useState<string | number | null>(null);

  async function saveAvisReply(id: string | number, reponse: string) {
    setSavingAvis(id);
    await fetch("/api/admin/retours", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, reponse }),
    });
    await load(scope);
    setSavingAvis(null);
  }

  // Avis repliés par défaut : on n'affiche que le titre, le texte se déplie au clic.
  const toggleAvis = (id: string | number) =>
    setOpenAvis((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

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
              label="Inscrits via le cahier"
              value={stats.kpis.comptesEmail.cahier}
              sub={`${stats.kpis.comptesEmail.newsletter} consentent à la newsletter`}
              color="text-teal-400"
            />
            <Kpi
              label="Établissements"
              value={stats.kpis.nbEtablissements}
              sub="collèges actifs"
              color="text-sky-400"
            />
            {/* Élèves connectés = vrais logins (code établissement ou email),
                depuis la table `connexions`. À ne pas confondre avec les scores
                enregistrés (l'ancien chiffre était mal labellisé). */}
            <Kpi
              label="Élèves connectés"
              value={stats.kpis.connectesAujourdhui}
              sub={`7j : ${stats.kpis.connectes7j} · 30j : ${stats.kpis.connectes30j}`}
              color="text-cyan-400"
            />
            <Kpi
              label="Élèves avec résultats"
              value={stats.kpis.elevesAvecResultats}
              sub="ont enregistré ≥ 1 exercice"
              color="text-emerald-400"
            />
            <Kpi
              label="Avis"
              value={stats.avis.total}
              sub={`note moy. ${stats.avis.noteMoyenne ?? "—"}`}
              color="text-amber-400"
            />
            <Kpi
              label="Évaluations aujourd'hui"
              value={stats.kpis.activitesAujourdhui}
              sub="résultats enregistrés"
              color="text-white"
            />
            <Kpi
              label="Évaluations 7 jours"
              value={stats.kpis.activites7j}
              sub="résultats enregistrés"
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

          <div className="grid gap-4">
            {/* Évaluation par module */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-sm font-bold text-slate-200">
                🎯 Évaluation par module
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
                Moyenne des élèves par module
              </p>
              <div className="mt-4 space-y-2.5">
                {MODULES.map((m) => {
                  const moy = stats.moyenneParModule[m.key];
                  const n = stats.parModule[m.key] ?? 0;
                  return (
                    <div key={m.key}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          {m.label}
                        </span>
                        <span className="font-bold text-slate-400">
                          {moy !== null ? `${moy}%` : "—"}
                          <span className="ml-1 font-medium text-slate-600">
                            ({n})
                          </span>
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${m.color}`}
                          style={{ width: `${moy ?? 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Où vont les élèves (navigation agrégée, sans identité) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-200">📍 Où vont les élèves</h3>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">
                {stats.navigation.total30} vues · 30j
              </span>
            </div>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              Sections les plus visitées par les élèves connectés — agrégé, sans identité.
            </p>

            {stats.navigation.topPages.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                Aucune donnée de navigation pour l'instant. (As-tu exécuté{" "}
                <code className="rounded bg-slate-800 px-1 text-slate-300">
                  supabase/pages_vues.sql
                </code>{" "}
                en base ?)
              </p>
            ) : (
              <div className="mt-4 space-y-2.5">
                {(() => {
                  const max = Math.max(
                    ...stats.navigation.topPages.map((p) => p.count),
                    1
                  );
                  return stats.navigation.topPages.map((p) => (
                    <div key={p.page}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-300">
                          {sectionLabel(p.page)}
                        </span>
                        <span className="font-bold text-slate-400">
                          {p.count}
                          <span className="ml-1 font-medium text-slate-600">
                            (7j : {p.count7})
                          </span>
                        </span>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-500"
                          style={{ width: `${(p.count / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>

          {/* D'où viennent les visiteurs (pays via Vercel, anonymes inclus) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-200">🌍 D&apos;où viennent les visiteurs</h3>
              <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-slate-300">
                {stats.geo.total30} vues · 30j
              </span>
            </div>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              Pays des visiteurs, via Vercel — agrégé, sans IP.{" "}
              <span className="text-slate-400">
                Anonymes inclus depuis le 24/07
              </span>{" "}
              (avant cette date : élèves connectés uniquement, soit ~2 % du trafic
              réel). Clique un pays pour voir ses pages.
            </p>

            {stats.geo.parPays.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                Aucune donnée pays pour l&apos;instant. (Colonne{" "}
                <code className="rounded bg-slate-800 px-1 text-slate-300">pays</code>{" "}
                ajoutée en base ? Non rétroactif : compte à partir du déploiement.)
              </p>
            ) : (
              <div className="mt-4 space-y-2.5">
                {(() => {
                  const max = Math.max(
                    ...stats.geo.parPays.map((p) => p.count),
                    1
                  );
                  return stats.geo.parPays.map((p) => {
                    const pct = Math.round((p.count / stats.geo.total30) * 100);
                    const isOpen = openPays === p.pays;
                    const pages = stats.geo.topPagesParPays[p.pays] ?? [];
                    return (
                      <div key={p.pays}>
                        <button
                          type="button"
                          onClick={() => setOpenPays(isOpen ? null : p.pays)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300">
                              {paysLabel(p.pays)}
                            </span>
                            <span className="font-bold text-slate-400">
                              {p.count}
                              <span className="ml-1 font-medium text-slate-600">
                                ({pct}% · 7j : {p.count7})
                              </span>
                            </span>
                          </div>
                          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-800">
                            <div
                              className="h-full rounded-full bg-emerald-500"
                              style={{ width: `${(p.count / max) * 100}%` }}
                            />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                            <p className="mb-1.5 text-[11px] font-bold text-slate-400">
                              Pages visitées depuis {paysLabel(p.pays)}
                            </p>
                            {pages.length === 0 ? (
                              <p className="text-xs text-slate-500">Aucune page détaillée.</p>
                            ) : (
                              <ul className="space-y-1">
                                {pages.map((pg) => (
                                  <li
                                    key={pg.page}
                                    className="flex items-center justify-between text-xs"
                                  >
                                    <span className="text-slate-300">
                                      {sectionLabel(pg.page)}
                                    </span>
                                    <span className="font-bold text-slate-500">{pg.count}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            )}

            {stats.geo.inconnus30 > 0 && (
              <p className="mt-3 border-t border-slate-800 pt-2 text-[11px] text-slate-500">
                + {stats.geo.inconnus30} vue{stats.geo.inconnus30 > 1 ? "s" : ""} sans pays
                {stats.geo.inconnus7 > 0
                  ? ` (dont ${stats.geo.inconnus7} sur 7 j)`
                  : " (aucune récente)"}{" "}
                — lignes écrites avant l&apos;ajout de la colonne{" "}
                <code className="rounded bg-slate-800 px-1 text-slate-300">pays</code>, ou dev
                local. Exclues des pourcentages ci-dessus.
              </p>
            )}
          </div>

          {/* Derniers connectés = vrais logins (code établissement ou email) */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-slate-200">🔌 Derniers connectés</h3>
              <span className="rounded-full bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-300">
                {stats.kpis.connectesAujourdhui} aujourd'hui
              </span>
            </div>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              Vrais logins (code établissement ou email), les plus récents en premier.
            </p>

            {stats.derniersConnectes.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                Aucune connexion enregistrée sur ce périmètre.
              </p>
            ) : (
              <div className="mt-3 divide-y divide-slate-800">
                {stats.derniersConnectes.map((c, i) => (
                  <div
                    key={`${c.code_utilisateur ?? "?"}-${c.created_at}-${i}`}
                    className="flex flex-wrap items-center justify-between gap-2 py-2 text-xs"
                  >
                    {/* Prénom seul (jamais le nom de famille) via prenomCourt. */}
                    <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                      {prenomCourt(c.nom) || c.code_utilisateur || "—"}
                      {c.classe ? (
                        <span className="font-medium text-slate-500">· {c.classe}</span>
                      ) : null}
                      {c.type && c.type !== "eleve" ? (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                          {c.type}
                        </span>
                      ) : null}
                    </span>
                    <span className="flex items-center gap-2 text-slate-400">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          c.source === "email"
                            ? "bg-amber-500/15 text-amber-300"
                            : "bg-sky-500/15 text-sky-300"
                        }`}
                      >
                        {c.source === "email" ? "✉️ email" : "🏫 code"}
                      </span>
                      <span>{dateAvis(c.created_at)}</span>
                    </span>
                  </div>
                ))}
              </div>
            )}
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
                {stats.avis.derniers.map((a) => {
                  const ouvert = openAvis.has(a.id);
                  return (
                    <div
                      key={a.id}
                      className="rounded-xl border border-slate-800 bg-slate-950/50"
                    >
                      {/* En-tête cliquable : seul le titre est visible par défaut */}
                      <button
                        type="button"
                        onClick={() => toggleAvis(a.id)}
                        className="flex w-full flex-wrap items-center justify-between gap-2 p-3 text-left text-xs"
                      >
                        {/* Prénom seul (jamais le nom de famille) via prenomCourt :
                            « NOM Prénom » → « Prénom ». Règle RGPD du site. */}
                        <span className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <span className="text-slate-500">{ouvert ? "▾" : "▸"}</span>
                          {prenomCourt(a.prenom)}
                          {a.classe ? ` · ${a.classe}` : ""}
                          {a.code_etablissement ? ` · ${a.code_etablissement}` : ""}
                        </span>
                        <span className="flex items-center gap-2 text-slate-400">
                          {a.suspectIA ? (
                            <span
                              title={a.raisonIA ?? "Ressemble à un copier-collé d'IA"}
                              className="rounded-full bg-fuchsia-500/20 px-2 py-0.5 text-[10px] font-black text-fuchsia-300"
                            >
                              🤖 IA probable
                            </span>
                          ) : null}
                          {a.note ? (
                            <span className="text-amber-300">
                              {"★".repeat(Math.round(a.note))}
                            </span>
                          ) : null}
                          {a.type ? <span>{a.type}</span> : null}
                          <span>{dateAvis(a.created_at)}</span>
                        </span>
                      </button>
                      {/* Texte + zone de réponse, dépliés au clic */}
                      {ouvert && (
                        <div className="px-3 pb-3">
                          {a.message && (
                            <p className="whitespace-pre-wrap text-sm text-slate-200">
                              {a.message}
                            </p>
                          )}

                          <div className="mt-2 rounded-lg border border-slate-800 bg-slate-950/40 p-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
                                ✍️ Ma réponse
                              </span>
                              {a.reponse_at && (
                                <span className="text-[10px] font-semibold text-emerald-400">
                                  envoyée le {dateAvis(a.reponse_at)}
                                </span>
                              )}
                            </div>
                            <textarea
                              value={avisDrafts[String(a.id)] ?? a.reponse ?? ""}
                              onChange={(e) =>
                                setAvisDrafts((d) => ({
                                  ...d,
                                  [String(a.id)]: e.target.value,
                                }))
                              }
                              placeholder="Écris ta réponse à l'élève…"
                              rows={2}
                              className="mt-1.5 w-full resize-y rounded-md border border-slate-700 bg-slate-950/60 px-2.5 py-1.5 text-sm text-slate-100 placeholder-slate-500"
                            />
                            <div className="mt-1.5 flex justify-end">
                              <button
                                onClick={() =>
                                  saveAvisReply(a.id, avisDrafts[String(a.id)] ?? a.reponse ?? "")
                                }
                                disabled={savingAvis === a.id}
                                className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50"
                              >
                                {savingAvis === a.id ? "Enregistrement…" : "💬 Enregistrer la réponse"}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
