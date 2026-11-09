"use client";

// « MES NOTIONS » — la version élève du bilan prof (/prof/classes/bilan) :
// chaque notion de maths travaillée au coach, et pour chacune ses micros
// 🟩 compris · 🟧 en cours · 🟥 pas compris, avec réponses justes / réponses.
// Mêmes seuils que le prof : 80 % de justes sur 3 réponses au moins = compris,
// moins de 50 % = pas compris. Données : /api/mes-notions.

import Link from "next/link";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";

type Micro = { id: string; libelle: string; j: number; t: number };
export type Notion = {
  cle: string;
  titre: string;
  classe: string;
  notionId: string;
  derniere: string;
  nbMicrosNotion: number;
  micros: Micro[];
};

type Verdict = "compris" | "en-cours" | "pas-compris";

function verdict(m: Micro): Verdict {
  if (m.t < 3) return "en-cours";
  const r = m.j / m.t;
  return r >= 0.8 ? "compris" : r < 0.5 ? "pas-compris" : "en-cours";
}

const STYLE: Record<Verdict, { pastille: string; libelle: string }> = {
  compris: { pastille: "bg-emerald-200 text-emerald-900", libelle: "🟩 compris" },
  "en-cours": { pastille: "bg-amber-100 text-amber-900", libelle: "🟧 en cours" },
  "pas-compris": { pastille: "bg-red-200 text-red-900", libelle: "🟥 pas compris" },
};

// ── GRAPHIQUE EN ÉTOILE (09/11/2026, Frédéric : « ça manque de graphique en
// étoile sur le nombre de notions travaillées ») : une branche par notion
// travaillée, longueur = % de bonnes réponses cumulées sur la notion (le
// nombre de micros « compris » reste à 0 tant qu'il y a moins de 3 réponses,
// l'étoile serait plate). Une étoile demande 3 branches : en dessous, des barres.
function pctNotion(n: Notion) {
  const j = n.micros.reduce((s, m) => s + m.j, 0);
  const t = n.micros.reduce((s, m) => s + m.t, 0);
  return t ? Math.round((100 * j) / t) : 0;
}

// Verdict d'une NOTION, mêmes seuils que les micros : vu du premier coup par
// les parents (« ils doivent voir du premier coup ce qui va et ce qui va pas »).
function etatNotion(n: Notion): Verdict {
  const t = n.micros.reduce((s, m) => s + m.t, 0);
  const p = pctNotion(n);
  if (t < 3) return "en-cours";
  return p >= 80 ? "compris" : p < 50 ? "pas-compris" : "en-cours";
}

const COULEUR: Record<Verdict, string> = {
  compris: "#059669",
  "en-cours": "#d97706",
  "pas-compris": "#dc2626",
};

function court(texte: string, max = 24) {
  return texte.length > max ? `${texte.slice(0, max - 1)}…` : texte;
}

function EtoileNotions({ notions }: { notions: Notion[] }) {
  const points = notions.slice(0, 12).map((n) => ({ titre: n.titre, pct: pctNotion(n), etat: etatNotion(n) }));
  const vaBien = notions.filter((n) => etatNotion(n) === "compris");
  const aTravailler = notions
    .filter((n) => etatNotion(n) !== "compris")
    .sort((a, b) => pctNotion(a) - pctNotion(b));

  // SUGGESTIONS (09/11, Frédéric : « et en dessous des suggestions ») : pour les
  // 3 notions les plus faibles, le micro le plus fragile à refaire au Coach,
  // avec le lien direct. Lisible par un parent sans connaître le site.
  const suggestions = aTravailler.slice(0, 3).map((n) => {
    const fragile = [...n.micros].sort((a, b) => a.j / a.t - b.j / b.t)[0];
    const tot = n.micros.reduce((s, m) => s + m.t, 0);
    const texte =
      tot < 3
        ? `Faire encore quelques exercices sur « ${n.titre} » : ${tot} réponse${tot > 1 ? "s" : ""}, c'est trop tôt pour juger.`
        : `Revoir « ${fragile.libelle} » (${n.titre}) : ${fragile.j} bonne${fragile.j > 1 ? "s" : ""} réponse${fragile.j > 1 ? "s" : ""} sur ${fragile.t}.`;
    const href = `/coach/serie?classe=${encodeURIComponent(n.classe)}&matiere=maths&notion=${encodeURIComponent(
      n.notionId
    )}&microId=${encodeURIComponent(fragile.id)}&${displayParamForClasse(n.classe)}`;
    return { cle: n.cle, texte, href };
  });

  const blocSuggestions = (
    <div className="mt-3 rounded-2xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
      <p className="text-sm font-black text-indigo-900">💡 Suggestions</p>
      <ul className="mt-2 space-y-2">
        {suggestions.map((sg) => (
          <li key={sg.cle} className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-indigo-950">
            <span>{sg.texte}</span>
            <Link href={sg.href} className="shrink-0 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-500">
              🎯 S&apos;entraîner
            </Link>
          </li>
        ))}
        {suggestions.length === 0 ? (
          <li className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold text-indigo-950">
            <span>Tout ce qui a été travaillé est compris : place à une nouvelle notion !</span>
            <Link href="/coach-ia/maths" className="shrink-0 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-black text-white hover:bg-indigo-500">
              ➕ Nouvelle notion
            </Link>
          </li>
        ) : null}
        <li className="text-xs font-semibold text-indigo-800">
          Le plus efficace : 10 minutes de Coach par jour, plutôt qu&apos;une heure le dimanche.
        </li>
      </ul>
    </div>
  );

  const bilan = (
    <>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl bg-emerald-50 p-3 ring-1 ring-emerald-100">
        <p className="text-sm font-black text-emerald-800">✅ Ce qui va ({vaBien.length})</p>
        {vaBien.length === 0 ? (
          <p className="mt-1 text-xs font-semibold text-emerald-700">Pas encore de notion maîtrisée : ça viendra !</p>
        ) : (
          <ul className="mt-1 space-y-0.5 text-sm font-semibold text-emerald-900">
            {vaBien.map((n) => <li key={n.cle}>{n.titre} · {pctNotion(n)} %</li>)}
          </ul>
        )}
      </div>
      <div className="rounded-2xl bg-red-50 p-3 ring-1 ring-red-100">
        <p className="text-sm font-black text-red-800">⚠️ À travailler ({aTravailler.length})</p>
        {aTravailler.length === 0 ? (
          <p className="mt-1 text-xs font-semibold text-red-700">Rien à signaler : tout est compris.</p>
        ) : (
          <ul className="mt-1 space-y-0.5 text-sm font-semibold text-red-900">
            {aTravailler.map((n) => (
              <li key={n.cle}>
                {n.titre} · {pctNotion(n)} %
                {etatNotion(n) === "en-cours" && n.micros.reduce((s, m) => s + m.t, 0) < 3 ? " (trop tôt pour dire)" : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    {blocSuggestions}
    </>
  );
  const nb = notions.length;

  const entete = (
    <p className="text-sm font-black text-slate-700">
      ⭐ {nb} notion{nb > 1 ? "s" : ""} travaillée{nb > 1 ? "s" : ""}
      <span className="font-semibold text-slate-500"> · % de bonnes réponses par notion</span>
    </p>
  );

  // Barres colorées : sous 3 notions, et sur téléphone (les noms de l'étoile y
  // deviennent illisibles).
  const barres = (classe: string) => (
        <ul className={`mt-3 space-y-2 ${classe}`}>
          {points.map((p) => (
            <li key={p.titre}>
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span>{p.titre}</span>
                <span>{p.pct} %</span>
              </div>
              <div className="mt-1 h-3 rounded-full bg-slate-200">
                <div className="h-3 rounded-full" style={{ width: `${Math.max(p.pct, 2)}%`, background: COULEUR[p.etat] }} />
              </div>
            </li>
          ))}
        </ul>
  );

  if (points.length < 3) {
    return (
      <div className="mt-4 rounded-2xl bg-slate-50/60 p-4 ring-1 ring-slate-100">
        {entete}
        {barres("")}
        <p className="mt-2 text-xs font-semibold text-slate-500">
          L&apos;étoile apparaît dès 3 notions travaillées.
        </p>
        {bilan}
      </div>
    );
  }

  const CX = 400; // centre (largeur 800 : place pour les noms à gauche et à droite)
  const C = 185;
  const R = 145; // rayon à 100 %
  const angle = (i: number) => -Math.PI / 2 + (2 * Math.PI * i) / points.length;
  const xy = (i: number, r: number) => [CX + r * Math.cos(angle(i)), C + r * Math.sin(angle(i))];
  const poly = (r: (i: number) => number) =>
    points.map((_, i) => xy(i, r(i)).map((v) => v.toFixed(1)).join(",")).join(" ");

  return (
    <div className="mt-4 rounded-2xl bg-slate-50/60 p-4 ring-1 ring-slate-100">
      {entete}
      {barres("sm:hidden")}
      <svg viewBox="0 0 800 370" className="mx-auto mt-2 hidden w-full max-w-3xl sm:block" role="img"
        aria-label={`Graphique en étoile : ${points.map((p) => `${p.titre} ${p.pct} %`).join(", ")}`}>
        {[25, 50, 75, 100].map((g) => (
          <polygon key={g} points={poly(() => (R * g) / 100)} fill="none" stroke="#e2e8f0" strokeWidth={1} />
        ))}
        {points.map((_, i) => {
          const [x, y] = xy(i, R);
          return <line key={i} x1={CX} y1={C} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />;
        })}
        <polygon points={poly((i) => (R * Math.max(points[i].pct, 3)) / 100)}
          fill="rgba(16,185,129,0.25)" stroke="#059669" strokeWidth={2.5} strokeLinejoin="round" />
        {points.map((p, i) => {
          const [x, y] = xy(i, (R * Math.max(p.pct, 3)) / 100);
          return <circle key={i} cx={x} cy={y} r={6} fill={COULEUR[p.etat]} stroke="white" strokeWidth={1.5} />;
        })}
        {points.map((p, i) => {
          const [x, y] = xy(i, R + 18);
          const cos = Math.cos(angle(i));
          const ancre = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
          return (
            <text key={i} x={x} y={y} textAnchor={ancre} dominantBaseline="middle"
              fontSize={14} fontWeight={800} fill={COULEUR[p.etat]}>
              <title>{p.titre}</title>
              {court(p.titre)} · {p.pct} %
            </text>
          );
        })}
      </svg>
      {nb > points.length ? (
        <p className="text-xs font-semibold text-slate-500">Les 12 notions les plus récentes sont dans l&apos;étoile.</p>
      ) : null}
      {bilan}
    </div>
  );
}

// Les données sont chargées par le tableau de bord (/api/mes-notions), qui
// s'en sert aussi pour nommer les notions du tableau du Coach.
export default function CarteMesNotions({ notions }: { notions: Notion[] | null }) {
  if (notions === null) return null;

  return (
    <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-white p-6 shadow-xl">
      <h2 className="text-2xl font-black text-slate-900">🧠 Mes notions et micros compris</h2>
      <p className="mt-1 text-sm font-semibold text-slate-600">
        Toutes tes séances du Coach de maths, cumulées. Compris = 80 % de bonnes réponses ou plus,
        sur 3 réponses au moins.
      </p>

      {notions.length === 0 ? (
        <div className="mt-4 rounded-2xl bg-amber-50 p-4 font-bold text-amber-800">
          Rien encore : fais une série au Coach de maths et tes notions s&apos;afficheront ici.
        </div>
      ) : (
        <>
        <EtoileNotions notions={notions} />
        <ul className="mt-4 space-y-4">
          {notions.map((n) => {
            const compris = n.micros.filter((m) => verdict(m) === "compris").length;
            const total = Math.max(n.nbMicrosNotion, n.micros.length);
            return (
              <li key={n.cle} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-black text-slate-900">{n.titre}</p>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                      {n.classe} · {new Date(n.derniere).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-800">
                    {compris} / {total} micro{total > 1 ? "s" : ""} compris
                  </span>
                </div>
                <ul className="mt-3 grid gap-2 md:grid-cols-2">
                  {n.micros.map((m) => {
                    const v = verdict(m);
                    return (
                      <li
                        key={m.id}
                        className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 ring-1 ring-slate-100"
                      >
                        <span className="text-sm font-semibold text-slate-800">{m.libelle}</span>
                        <span
                          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-black ${STYLE[v].pastille}`}
                          title={STYLE[v].libelle}
                        >
                          {m.j}/{m.t}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`/coach/serie?classe=${encodeURIComponent(n.classe)}&matiere=maths&notion=${encodeURIComponent(
                    n.notionId
                  )}&${displayParamForClasse(n.classe)}`}
                  className="mt-3 inline-block text-sm font-black text-indigo-700 underline underline-offset-2"
                >
                  Continuer cette notion →
                </Link>
              </li>
            );
          })}
        </ul>
        </>
      )}

      <p className="mt-4 text-xs font-semibold text-slate-500">
        🟩 compris · 🟧 en cours · 🟥 pas compris (moins de 50 %)
      </p>
    </div>
  );
}
