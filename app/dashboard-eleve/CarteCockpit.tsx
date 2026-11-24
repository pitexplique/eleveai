"use client";

// ✈️ LE COCKPIT DE L'ÉLÈVE (23/11/2026). Frédéric : « les élèves ne comprennent
// pas trop comment ils ont 16,5/20 » ; « comme un tableau Vercel » ; « un
// tableau de bord de commandant de bord dans un avion ».
//
// En haut, le pare-brise : le ciel, le soleil, le choix de la période. Dessous,
// le tableau de bord sombre : 4 cadrans qui s'allument (moyenne, séances,
// questions, jours), un badge « + / − » face à la période d'avant, et une
// courbe. Cliquer sur un cadran change la courbe (comme les cases de Vercel).
//
// Puis LE TABLEAU DES SÉANCES : une ligne par séance du coach, sa note, et si
// elle compte. La moyenne est écrite EN CLAIR sous le tableau, avec ses
// nombres : (13 + 15 + 8 …) ÷ 12 = 12. L'élève refait le calcul s'il veut.
//
// ⛔ Même calcul que « Ce que voit ton prof » (lib/server/bulletinClasse.ts) :
// la moyenne des notes /20 des séances, SAUF les séances d'entraînement 🏋️
// (details.entrainement, choisi par l'élève au coach). Les deux chiffres
// doivent toujours être les mêmes sur 3 mois.

import Link from "next/link";
import { useMemo, useState } from "react";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import type { Notion } from "./CarteMesNotions";

export type SeanceCockpit = {
  id: string;
  classe: string;
  notion_id: string;
  score_sur_20: number | null;
  bonnes_reponses: number;
  nb_tentatives: number;
  details: unknown;
  created_at: string;
  /** Calculé par /api/dashboard (règle de classe, 24/11/2026). */
  compte_moyenne?: boolean;
  /** Niveau de la séance quand elle est faite hors de la classe de l'élève (« 4e »). */
  hors_classe?: string | null;
};

type Cadran = "moyenne" | "seances" | "questions" | "jours";

const JOUR = 24 * 60 * 60 * 1000;
const PERIODES = [
  { id: 7, label: "7 jours" },
  { id: 30, label: "30 jours" },
  { id: 90, label: "3 mois" },
] as const;

const lienCoach = (n: Notion) =>
  `/coach/serie?classe=${encodeURIComponent(n.classe)}&matiere=maths&notion=${encodeURIComponent(
    n.notionId
  )}&${displayParamForClasse(n.classe)}`;

const virgule = (n: number) => (Math.round(n * 10) / 10).toString().replace(".", ",");

export function estEntrainement(details: unknown): boolean {
  return !!(details && typeof details === "object" && (details as { entrainement?: unknown }).entrainement === true);
}

// ⭐ 24/11/2026 — RÈGLE DE CLASSE : la séance compte-t-elle dans la moyenne ?
// Le serveur le dit (compte_moyenne) ; sans lui (ancienne réponse), on
// retombe sur le seul choix « Entraînement ».
export function horsMoyenne(s: SeanceCockpit): boolean {
  if (typeof s.compte_moyenne === "boolean") return !s.compte_moyenne;
  return estEntrainement(s.details);
}

// 24/11/2026 : les séances des fiches d'exercices interactives (details.source).
export function estExercices(details: unknown): boolean {
  return !!(details && typeof details === "object" && (details as { source?: unknown }).source === "exercices");
}

function libelleNotion(s: SeanceCockpit, titreNotion: (classe: string, id: string) => string) {
  const d = s.details as { notionLabel?: unknown } | null;
  if (d && typeof d.notionLabel === "string" && d.notionLabel.trim()) return d.notionLabel;
  return titreNotion(s.classe, s.notion_id);
}

function jourCle(t: number) {
  const d = new Date(t);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function dateCourte(t: number) {
  return new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

type Mesures = {
  moyenne: number | null;
  seances: number;
  questions: number;
  jours: number;
  /** Séances qui comptent (hors entraînement) : bonnes réponses et questions. */
  justesComptees: number;
  questionsComptees: number;
};

// ⚖️ MOYENNE PONDÉRÉE (23/11/2026, Frédéric : « si tu pondères il faut
// expliquer à l'élève ») : toutes les bonnes réponses ÷ toutes les questions
// × 20. Une séance d'une seule question ne pèse plus autant qu'une de 30.
// Même calcul que lib/server/bulletinClasse.ts (« Ce que voit ton prof »).
function mesurer(liste: SeanceCockpit[]): Mesures {
  const comptent = liste.filter((s) => !horsMoyenne(s) && (s.nb_tentatives || 0) > 0);
  const justesComptees = comptent.reduce((a, s) => a + (s.bonnes_reponses || 0), 0);
  const questionsComptees = comptent.reduce((a, s) => a + (s.nb_tentatives || 0), 0);
  return {
    moyenne: questionsComptees > 0 ? Math.round((justesComptees / questionsComptees) * 200) / 10 : null,
    seances: liste.length,
    questions: liste.reduce((a, s) => a + (s.nb_tentatives || 0), 0),
    jours: new Set(liste.map((s) => jourCle(new Date(s.created_at).getTime()))).size,
    justesComptees,
    questionsComptees,
  };
}

const CADRANS: { id: Cadran; label: string; couleur: string; trait: string; lueur: string }[] = [
  { id: "moyenne", label: "Moyenne générale", couleur: "text-emerald-300", trait: "#34d399", lueur: "shadow-emerald-500/30" },
  { id: "seances", label: "Séances", couleur: "text-cyan-300", trait: "#22d3ee", lueur: "shadow-cyan-500/30" },
  { id: "questions", label: "Questions", couleur: "text-amber-300", trait: "#fbbf24", lueur: "shadow-amber-500/30" },
  { id: "jours", label: "Jours de vol", couleur: "text-violet-300", trait: "#a78bfa", lueur: "shadow-violet-500/30" },
];

export default function CarteCockpit({
  seances,
  notions = null,
  titreNotion,
  septJoursSeulement = false,
}: {
  seances: SeanceCockpit[];
  /** Les notions du coach (/api/mes-notions) : le panneau « à retravailler ». */
  notions?: Notion[] | null;
  titreNotion: (classe: string, id: string) => string;
  /** Compte gratuit : le serveur n'envoie que les 7 derniers jours. */
  septJoursSeulement?: boolean;
}) {
  const [periode, setPeriode] = useState<number>(septJoursSeulement ? 7 : 30);
  const [cadran, setCadran] = useState<Cadran>("moyenne");
  const [toutVoir, setToutVoir] = useState(false);
  // La barre de gauche (23/11/2026, Frédéric : « mettre aussi les notions sur
  // la barre de gauche ») : null = toutes les notions.
  const [notionChoisie, setNotionChoisie] = useState<string | null>(null);

  // Les séances sans aucune réponse ne disent rien : on les laisse de côté.
  const toutes = useMemo(
    () =>
      seances
        .filter((s) => (s.nb_tentatives || 0) > 0)
        .map((s) => ({ s, t: new Date(s.created_at).getTime() }))
        .filter((x) => Number.isFinite(x.t))
        .sort((a, b) => b.t - a.t),
    [seances]
  );

  // Les notions de la barre, la plus récente d'abord.
  const menu = useMemo(() => {
    const vu = new Map<string, { cle: string; titre: string; classe: string; nb: number }>();
    for (const { s } of toutes) {
      const cle = `${s.classe}|${s.notion_id}`;
      const deja = vu.get(cle);
      if (deja) deja.nb++;
      else vu.set(cle, { cle, titre: libelleNotion(s, titreNotion), classe: s.classe, nb: 1 });
    }
    return [...vu.values()];
    // titreNotion change à chaque rendu du parent ; les séances suffisent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toutes]);

  const utiles = useMemo(
    () => (notionChoisie ? toutes.filter((x) => `${x.s.classe}|${x.s.notion_id}` === notionChoisie) : toutes),
    [toutes, notionChoisie]
  );

  const maintenant = Date.now();
  const debut = maintenant - periode * JOUR;
  const dansPeriode = utiles.filter((x) => x.t >= debut).map((x) => x.s);
  const avant = utiles.filter((x) => x.t >= debut - periode * JOUR && x.t < debut).map((x) => x.s);
  const m = mesurer(dansPeriode);
  const mAvant = mesurer(avant);

  // Courbe : une valeur par jour de la période.
  const points = useMemo(() => {
    const parJour: SeanceCockpit[][] = Array.from({ length: periode }, () => []);
    for (const x of utiles) {
      const i = Math.floor((x.t - debut) / JOUR);
      if (i >= 0 && i < periode) parJour[i].push(x.s);
    }
    return parJour.map((liste) => {
      const mm = mesurer(liste);
      if (cadran === "moyenne") return mm.moyenne;
      if (cadran === "seances") return mm.seances;
      if (cadran === "questions") return mm.questions;
      return liste.length ? 1 : 0;
    });
    // `debut` bouge à chaque rendu (Date.now) : la période et les séances suffisent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utiles, periode, cadran]);

  if (toutes.length === 0) return null;

  // Notions à retravailler : moins de 80 % de justes sur 3 réponses au moins
  // (mêmes seuils que le prof), la plus fragile d'abord.
  const aRetravailler = (notions ?? [])
    .map((n) => {
      const j = n.micros.reduce((acc, x) => acc + x.j, 0);
      const t = n.micros.reduce((acc, x) => acc + x.t, 0);
      return { n, t, pct: t ? Math.round((j / t) * 100) : 0 };
    })
    .filter((x) => x.t >= 3 && x.pct < 80)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 8);

  const valeur = (c: Cadran, x: Mesures) => (c === "moyenne" ? x.moyenne : x[c]);
  const affiche = (c: Cadran, v: number | null) => (v === null ? "—" : c === "moyenne" ? virgule(v) : String(v));

  const actif = CADRANS.find((c) => c.id === cadran)!;
  const max = cadran === "moyenne" ? 20 : cadran === "jours" ? 1 : Math.max(1, ...points.map((p) => p ?? 0));

  // Géométrie de la courbe (viewBox fixe, mise à l'échelle par le navigateur).
  const L = 600, H = 190, G = 34, D = 10, HAUT = 12, BAS = 26;
  const x = (i: number) => G + (periode === 1 ? 0 : (i / (periode - 1)) * (L - G - D));
  const y = (v: number) => HAUT + (1 - v / max) * (H - HAUT - BAS);
  const pts = points.map((v, i) => (v === null ? null : { x: x(i), y: y(v) }));
  const presents = pts.filter((p): p is { x: number; y: number } => p !== null);
  const ligne = presents.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const aire = presents.length
    ? `${ligne} L${presents[presents.length - 1].x.toFixed(1)},${H - BAS} L${presents[0].x.toFixed(1)},${H - BAS} Z`
    : "";
  const graduations = cadran === "moyenne" ? [0, 10, 20] : cadran === "jours" ? [] : [0, Math.round(max / 2), max];
  const largeurBarre = Math.max(3, ((L - G - D) / periode) * 0.7);
  const reperes = [0, Math.floor((periode - 1) / 2), periode - 1];

  const lignes = toutVoir ? dansPeriode : dansPeriode.slice(0, 8);
  const nbEntrainement = dansPeriode.filter((s) => horsMoyenne(s) && !s.hors_classe).length;
  const nbHorsClasse = dansPeriode.filter((s) => !!s.hors_classe).length;

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-black text-white shadow-2xl md:flex">
      {/* ── La barre de gauche : les notions (comme le menu de Vercel) ── */}
      <aside className="hidden w-60 shrink-0 border-r border-slate-800 bg-slate-950 p-3 md:block">
        <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Notions</div>
        <nav className="space-y-0.5">
          {[{ cle: null as string | null, titre: "Vue d’ensemble", classe: "", nb: toutes.length }, ...menu].map((o) => {
            const actif = notionChoisie === o.cle;
            return (
              <button
                key={o.cle ?? "tout"}
                type="button"
                onClick={() => setNotionChoisie(o.cle)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                  actif ? "bg-slate-800 font-semibold text-white" : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span className="min-w-0 truncate">
                  {o.cle ? "" : "▲ "}
                  {o.titre}
                  {o.classe && <span className="ml-1 text-xs text-slate-500">{o.classe.toUpperCase()}</span>}
                </span>
                <span className="shrink-0 text-xs tabular-nums text-slate-500">{o.nb}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
      {/* ── L'en-tête, comme Vercel : titre, nombre de séances, période ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-3 pt-4 sm:px-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="text-lg font-bold">✈️ Mon cockpit</h2>
          <span className="flex items-center gap-1.5 text-sm text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {utiles.length} séance{utiles.length > 1 ? "s" : ""}
            {notionChoisie ? ` · ${menu.find((o) => o.cle === notionChoisie)?.titre ?? ""}` : " au coach"}
          </span>
        </div>
        <div className="flex gap-1 rounded-lg border border-slate-800 bg-slate-950 p-1">
          {PERIODES.map((p) => {
            const ferme = septJoursSeulement && p.id !== 7;
            return (
              <button
                key={p.id}
                type="button"
                disabled={ferme}
                onClick={() => setPeriode(p.id)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                  periode === p.id
                    ? "bg-slate-800 text-white"
                    : ferme
                      ? "cursor-not-allowed text-slate-600"
                      : "text-slate-400 hover:text-white"
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sur téléphone, la barre devient une liste déroulante. */}
      <div className="px-4 pb-3 md:hidden">
        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500" htmlFor="cockpit-notion">
          Notion
        </label>
        <select
          id="cockpit-notion"
          value={notionChoisie ?? ""}
          onChange={(e) => setNotionChoisie(e.target.value || null)}
          className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="">Vue d’ensemble ({toutes.length})</option>
          {menu.map((o) => (
            <option key={o.cle} value={o.cle}>
              {o.titre} {o.classe.toUpperCase()} ({o.nb})
            </option>
          ))}
        </select>
      </div>
      {/* ── Les cases collées + la courbe ── */}
      <div className="mx-3 mb-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 sm:mx-4">
        <div className="grid grid-cols-2 border-b border-slate-800 lg:grid-cols-4">
          {CADRANS.map((c, k) => {
            const v = valeur(c.id, m);
            const va = valeur(c.id, mAvant);
            const ecart = v !== null && va !== null && avant.length > 0 ? Math.round((v - va) * 10) / 10 : null;
            const choisi = cadran === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCadran(c.id)}
                aria-pressed={choisi}
                className={`relative p-4 text-left transition ${k % 2 ? "border-l border-slate-800" : ""} ${
                  k > 1 ? "border-t border-slate-800 lg:border-t-0" : ""
                } ${k === 2 ? "lg:border-l" : ""} ${choisi ? "bg-black" : "hover:bg-slate-900"}`}
              >
                <div className="text-sm font-semibold text-slate-400">{c.id === "moyenne" && notionChoisie ? "Moyenne de la notion" : c.label}</div>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-3xl font-bold tabular-nums tracking-tight text-white">{affiche(c.id, v)}</span>
                  {c.id === "moyenne" && v !== null && <span className="text-sm font-semibold text-slate-500">/20</span>}
                  {ecart !== null && ecart !== 0 && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-bold ${
                        ecart > 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {ecart > 0 ? "+" : "−"}
                      {c.id === "moyenne" ? virgule(Math.abs(ecart)) : Math.abs(ecart)}
                    </span>
                  )}
                </div>
                {choisi && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />}
              </button>
            );
          })}
        </div>

        <div className="p-2 sm:p-3">
          <svg viewBox={`0 0 ${L} ${H}`} className="h-auto w-full" role="img" aria-label={`Courbe : ${actif.label}`}>
            <defs>
              <linearGradient id="cockpit-aire" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {graduations.map((g) => (
              <g key={g}>
                <line x1={G} x2={L - D} y1={y(g)} y2={y(g)} stroke="#1e293b" />
                <text x={G - 6} y={y(g) + 4} textAnchor="end" fontSize="11" fill="#64748b">
                  {g}
                </text>
              </g>
            ))}
            {cadran === "jours"
              ? points.map((v, i) =>
                  v ? (
                    <rect
                      key={i}
                      x={x(i) - largeurBarre / 2}
                      y={HAUT + 20}
                      width={largeurBarre}
                      height={H - HAUT - BAS - 20}
                      rx="2"
                      fill="#3b82f6"
                      opacity="0.75"
                    />
                  ) : null
                )
              : (
                <>
                  {aire && <path d={aire} fill="url(#cockpit-aire)" />}
                  {ligne && <path d={ligne} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinejoin="round" />}
                  {presents.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="#3b82f6" />
                  ))}
                </>
              )}
            {reperes.map((i) => (
              <text
                key={i}
                x={x(i)}
                y={H - 6}
                textAnchor={i === 0 ? "start" : i === periode - 1 ? "end" : "middle"}
                fontSize="11"
                fill="#64748b"
              >
                {dateCourte(debut + (i + 0.5) * JOUR)}
              </text>
            ))}
          </svg>
          {cadran === "moyenne" && presents.length === 0 && (
            <p className="pb-2 text-center text-sm text-slate-500">Aucune séance notée sur cette période.</p>
          )}
          <p className="px-1 pt-1 text-xs text-slate-500">
            Le badge compare avec les {periode} jours d&apos;avant. Clique sur une case pour changer la courbe.
          </p>
        </div>
      </div>

      {/* ── Deux panneaux, comme « Pages / Referrers » chez Vercel ── */}
      <div className="mx-3 mb-3 grid gap-3 sm:mx-4 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950">
          <div className="flex items-end justify-between border-b border-slate-800 px-4 pt-3">
            <span className="border-b-2 border-white pb-2 text-sm font-semibold">Mes notes</span>
            <span className="pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Note /20</span>
          </div>
          {dansPeriode.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">Pas de séance sur ces {periode} jours.</p>
          ) : (
            <ul className="space-y-1 p-2">
              {lignes.map((s) => {
                const entr = horsMoyenne(s);
                const note = s.score_sur_20;
                const largeur = note === null ? 0 : Math.max(2, (note / 20) * 100);
                return (
                  <li key={s.id} className="relative overflow-hidden rounded-md">
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 ${entr ? "bg-slate-800/40" : "bg-blue-500/15"}`}
                      style={{ width: `${largeur}%` }}
                    />
                    <div className="relative flex items-center justify-between gap-3 px-3 py-2 text-sm">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-slate-100">{libelleNotion(s, titreNotion)}</span>
                        <span className="block text-xs text-slate-500">
                          {dateCourte(new Date(s.created_at).getTime())} · {s.classe.toUpperCase()} ·{" "}
                          {s.bonnes_reponses}/{s.nb_tentatives} justes · {estExercices(s.details) ? "📄 exercices" : "🎯 coach"}
                          {!s.hors_classe && entr && " · 🏋️ entraînement"}
                          {s.hors_classe && (
                            <span className="ml-1.5 rounded bg-amber-400/15 px-1.5 py-0.5 font-semibold text-amber-300">
                              {s.hors_classe} · hors moyenne
                            </span>
                          )}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 font-bold tabular-nums ${entr ? "text-slate-500 line-through" : "text-white"}`}
                      >
                        {note === null ? "—" : virgule(note)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {dansPeriode.length > 8 && (
            <button
              type="button"
              onClick={() => setToutVoir((v) => !v)}
              className="mx-4 mb-3 text-sm font-semibold text-slate-300 underline hover:text-white"
            >
              {toutVoir ? "Voir moins" : `Voir les ${dansPeriode.length} séances`}
            </button>
          )}
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950">
          <div className="flex items-end justify-between border-b border-slate-800 px-4 pt-3">
            <span className="border-b-2 border-white pb-2 text-sm font-semibold">Notions à retravailler</span>
            <span className="pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Justes</span>
          </div>
          {aRetravailler.length === 0 ? (
            <p className="p-4 text-sm text-slate-400">
              {notions && notions.length > 0
                ? "Rien à retravailler pour l’instant. Bravo !"
                : "Fais quelques séances au coach : tes notions apparaîtront ici."}
            </p>
          ) : (
            <ul className="space-y-1 p-2">
              {aRetravailler.map(({ n, pct, t }) => (
                <li key={n.cle}>
                  <Link href={lienCoach(n)} className="relative block overflow-hidden rounded-md hover:bg-slate-900">
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 ${pct < 50 ? "bg-red-500/15" : "bg-amber-500/15"}`}
                      style={{ width: `${Math.max(2, pct)}%` }}
                    />
                    <span className="relative flex items-center justify-between gap-3 px-3 py-2 text-sm">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-slate-100">{n.titre}</span>
                        <span className="block text-xs text-slate-500">
                          {n.classe.toUpperCase()} · {t} réponses · 🎯 s’entraîner
                        </span>
                      </span>
                      <span className={`shrink-0 font-bold tabular-nums ${pct < 50 ? "text-red-400" : "text-amber-300"}`}>
                        {pct} %
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ── La moyenne, expliquée avec ses nombres (phrases courtes : les 6e lisent mal) ── */}
      <div className="mx-3 mb-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm sm:mx-4">
        <div className="font-semibold text-white">🧮 Comment on calcule ta moyenne</div>
        <p className="mt-1 text-slate-300">On compte toutes tes questions. Puis toutes tes bonnes réponses.</p>
        {m.questionsComptees > 0 ? (
          <p className="mt-2 text-base font-semibold tabular-nums text-slate-100">
            {m.justesComptees} bonne{m.justesComptees > 1 ? "s" : ""} réponse{m.justesComptees > 1 ? "s" : ""} sur{" "}
            {m.questionsComptees} question{m.questionsComptees > 1 ? "s" : ""} :<br />
            {m.justesComptees} ÷ {m.questionsComptees} × 20 ={" "}
            <span className="text-blue-400">{virgule(m.moyenne ?? 0)}/20</span>
          </p>
        ) : (
          <p className="mt-2 font-semibold text-slate-100">Aucune séance notée sur cette période.</p>
        )}
        <p className="mt-2 text-slate-300">
          ⚖️ Une séance de 30 questions compte plus qu’une séance d’une seule question.
        </p>
        <p className="mt-1 text-slate-300">Une seule erreur ne fait donc pas chuter ta moyenne.</p>
        {nbEntrainement > 0 && (
          <p className="mt-1 text-slate-400">
            🏋️ {nbEntrainement} séance{nbEntrainement > 1 ? "s" : ""} d’entraînement : elle
            {nbEntrainement > 1 ? "s ne comptent" : " ne compte"} pas dans la moyenne.
          </p>
        )}
        {nbHorsClasse > 0 && (
          <p className="mt-1 text-slate-400">
            🧭 {nbHorsClasse} séance{nbHorsClasse > 1 ? "s" : ""} dans une autre classe que la tienne : elle
            {nbHorsClasse > 1 ? "s ne comptent" : " ne compte"} pas dans la moyenne.
          </p>
        )}
      </div>
      </div>
    </section>
  );
}
