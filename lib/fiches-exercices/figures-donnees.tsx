// ─── Les dessins des feuilles « données » de STMG (22/10/2026) ────────────────
//
// Repris À L'IDENTIQUE de la feuille de 4e `maths-4e-stat-donnee.tsx` (elle-même
// reprise du CM2) : `barres` (axe gradué, bâtons, axe tronqué), `camembert`
// (légende en dessous, pourcentages en option), `grille` (tableau HTML). Ajouté :
// `croise`, le TABLEAU CROISÉ d'effectifs, avec ses marges en gras.
// ⛔ Aucune largeur minimale : rien ne défile à 375 px (contrairement à
// `tableauProba` et `diagramme` de figures.tsx).
// ⭐ Les scripts de recalcul RELISENT les arguments de chaque appel : les écrire
// en clair dans la feuille (nombres, chaînes), jamais calculés.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 37.5 → « 37,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => {
  const s = String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");
  // 12450 → « 12 450 » (espace fine insécable) à partir de cinq chiffres.
  return Math.abs(x) >= 10000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : s;
};

export type Barre = { label: string; value: number };

const graduationsDe = (debut: number, vmax: number, pas: number) =>
  Array.from({ length: Math.round((vmax - debut) / pas) + 1 }, (_, k) => debut + k * pas);

/**
 * Diagramme en BARRES (ou en BÂTONS), SVG viewBox 300, police 14. Avec `pas`,
 * l'axe est gradué et AUCUNE valeur n'est écrite : on LIT la hauteur. Sans
 * `pas`, la valeur est écrite au-dessus de chaque barre. `debut` : l'axe part
 * de ce nombre (axe TRONQUÉ, graduation de départ en rouge). `surligne` : une
 * barre en orange. `unite` : le nom de l'axe, en haut à gauche.
 */
export const barres = (
  data: Barre[],
  opts: { pas?: number; debut?: number; batons?: boolean; surligne?: number; unite?: string } = {},
) => {
  const W = 300;
  const G = opts.pas ? 44 : 16;
  const D = 10;
  const HAUT = 32;
  const BAS = 154;
  const debut = opts.debut ?? 0;
  const max = Math.max(1, ...data.map((d) => d.value));
  const vmax = opts.pas ? debut + Math.ceil((max - debut) / opts.pas) * opts.pas : max;
  const y = (v: number) => BAS - ((v - debut) / (vmax - debut)) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = opts.batons ? 8 : Math.min(40, slot * 0.6);
  const H = BAS + 30;
  const graduations = opts.pas ? graduationsDe(debut, vmax, opts.pas) : [];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={opts.batons ? "Diagramme en bâtons" : "Diagramme en barres"}>
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {opts.unite ? (
          <text x="6" y="16" fontSize="14" fontWeight="700" fill="#475569">
            {opts.unite}
          </text>
        ) : null}
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 4} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 8} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill={debut && g === debut ? ROUGE : "#334155"}>
              {fr(g)}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 8} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          const actif = opts.surligne === i;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx={opts.batons ? 1 : 3} fill={actif ? "#fed7aa" : "#bfdbfe"} stroke={actif ? ORANGE : BLEU} strokeWidth={actif ? 2.5 : 1.5} />
              {opts.pas ? null : (
                <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                  {fr(d.value)}
                </text>
              )}
              <text x={x + bw / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const TEINTES = ["#93c5fd", "#fdba74", "#86efac", "#fde68a", "#c4b5fd", "#fca5a5"];

/**
 * DIAGRAMME CIRCULAIRE : secteurs dans le sens des aiguilles d'une montre à
 * partir du haut, LÉGENDE en dessous. `valeurs` : le nombre dans chaque secteur
 * (false : disque muet). `pourcent` : « A : 45 % » dans la légende, une ligne
 * par secteur.
 */
export const camembert = (data: Barre[], valeurs = true, pourcent = false) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const [cx, cy, r] = [150, 94, 84];
  const pt = (a: number, rr: number) => [cx + rr * Math.cos((a * Math.PI) / 180), cy + rr * Math.sin((a * Math.PI) / 180)];
  let a0 = -90;
  const parts = data.map((d, i) => {
    const da = (d.value / total) * 360;
    const [a, b] = [a0, a0 + da];
    a0 = b;
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    const [lx, ly] = pt((a + b) / 2, r * 0.6);
    return {
      d: `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${da > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      lx,
      ly,
      couleur: TEINTES[i % TEINTES.length],
    };
  });
  const parLigne = pourcent ? 1 : 2;
  const H = 196 + Math.ceil(data.length / parLigne) * 20;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme circulaire">
        <rect x="0" y="0" width="300" height={H} rx="10" fill="#fff" />
        {parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.couleur} stroke="#ffffff" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#0f172a" strokeWidth={1.5} />
        {valeurs && !pourcent
          ? parts.map((p, i) => (
              <text key={`v${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a" stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
                {fr(data[i].value)}
              </text>
            ))
          : null}
        {data.map((d, i) => {
          const x = pourcent ? 70 : i % 2 === 0 ? 24 : 162;
          const yy = 204 + Math.floor(i / parLigne) * 20;
          return (
            <g key={`l${i}`}>
              <rect x={x} y={yy - 12} width="14" height="14" rx="3" fill={parts[i].couleur} stroke="#0f172a" strokeWidth="1" />
              <text x={x + 20} y={yy} fontSize="14" fontWeight="700" fill="#334155">
                {pourcent ? `${d.label} : ${fr(d.value)} %` : d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Le tableau d'un énoncé ou d'un corrigé (HTML, lisible à toutes les largeurs).
 * `total` met la dernière ligne en gras ; `surligne` met une ligne en orange.
 * ⛔ Texte NU dans les cases (pas de KaTeX).
 */
export const grille = (entetes: string[], lignes: (string | number)[][], opts: { total?: boolean; surligne?: number } = {}) => (
  <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1.5 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => {
          const total = opts.total && i === lignes.length - 1;
          const sur = opts.surligne === i;
          return (
            <tr key={i} className={sur ? "bg-orange-100 font-bold text-orange-800" : total ? "bg-slate-50 font-bold" : ""}>
              {l.map((c, j) => (
                <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                  {typeof c === "number" ? fr(c) : c}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

/**
 * Le TABLEAU CROISÉ d'effectifs (ou de fréquences) : la première colonne nomme
 * les lignes, la première ligne nomme les colonnes. La ligne et la colonne
 * « Total » (les MARGES) sont en gras sur fond gris, le total général dans le
 * coin. Une case « ? » ou « … » est à trouver (fond jaune). `surligne` : des
 * cases [ligne, colonne] en orange (les cases lues par le corrigé), comptées
 * dans `lignes` (0 = première ligne de données) et dans `entetes`.
 * ⛔ 5 colonnes au plus, texte NU, nombres en clair (le script les relit).
 */
export const croise = (entetes: string[], lignes: (string | number)[][], surligne: [number, number][] = []) => {
  const colTotal = entetes.findIndex((e) => /^total$/i.test(e));
  return (
    <div className="mx-auto w-full max-w-[22rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
      <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
        <thead>
          <tr>
            {entetes.map((e, i) => (
              <th key={i} className={["border border-slate-300 px-1.5 py-1 font-bold", i === colTotal ? "bg-slate-200 text-slate-900" : "bg-sky-50 text-sky-900"].join(" ")}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((l, i) => {
            const ligneTotal = /^total$/i.test(String(l[0]));
            return (
              <tr key={i}>
                {l.map((c, j) => {
                  const sur = surligne.some(([a, b]) => a === i && b === j);
                  const marge = ligneTotal || j === colTotal;
                  const inconnue = c === "?" || c === "…";
                  const fond = sur
                    ? "bg-orange-100 font-black text-orange-800"
                    : inconnue
                      ? "bg-amber-50 font-black text-amber-700"
                      : j === 0
                        ? "bg-sky-50 font-bold text-sky-900 text-left"
                        : marge
                          ? "bg-slate-100 font-bold text-slate-900"
                          : "text-slate-800";
                  return (
                    <td key={j} className={["border border-slate-300 px-1.5 py-0.5", fond].join(" ")}>
                      {typeof c === "number" ? fr(c) : c}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/**
 * L'INTERVALLE DE FLUCTUATION sur l'axe des fréquences (22/10/2026, feuille
 * d'échantillonnage) : une droite graduée de `min` à `max` (pas `pas`, dix
 * graduations au plus), la bande verte [p − e ; p + e] si `e` est donné, la
 * proportion p du modèle (trait rouge) et des fréquences OBSERVÉES (points
 * orange, nommés au-dessus). Sans `e`, on ne dessine que l'axe et les points :
 * l'élève trace la bande lui-même.
 * ⛔ Texte NU dans `label` (SVG). Le script relit tous les nombres.
 */
export const intervalle = (
  min: number,
  max: number,
  pas: number,
  opts: { p?: number; e?: number; points?: Barre[] } = {},
) => {
  const [G, D, Y] = [22, 278, 70];
  const x = (v: number) => G + ((v - min) / (max - min)) * (D - G);
  const n = Math.round((max - min) / pas);
  const ticks = Array.from({ length: n + 1 }, (_, k) => Math.round((min + k * pas) * 1e6) / 1e6);
  const { p, e, points = [] } = opts;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 110" className="block h-auto w-full" role="img" aria-label="Fréquences sur une droite graduée">
        <rect x="0" y="0" width="300" height="110" rx="10" fill="#fff" />
        {p !== undefined && e !== undefined ? (
          <rect x={x(p - e)} y={Y - 12} width={x(p + e) - x(p - e)} height="24" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
        ) : null}
        <line x1={G - 8} y1={Y} x2={D + 8} y2={Y} stroke="#0f172a" strokeWidth="1.5" />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - 5} x2={x(t)} y2={Y + 5} stroke="#0f172a" strokeWidth="1.2" />
            <text x={x(t)} y={Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">
              {fr(t)}
            </text>
          </g>
        ))}
        {p !== undefined ? (
          <g>
            <line x1={x(p)} y1={Y - 16} x2={x(p)} y2={Y + 16} stroke="#dc2626" strokeWidth="2.5" />
            <text x={x(p)} y={Y + 40} textAnchor="middle" fontSize="13" fontWeight="800" fill="#dc2626">
              p
            </text>
          </g>
        ) : null}
        {points.map((pt, i) => (
          <g key={i}>
            <circle cx={x(pt.value)} cy={Y} r="5" fill={ORANGE} stroke="#fff" strokeWidth="1.5" />
            <text x={x(pt.value)} y={Y - 20 - (i % 2) * 14} textAnchor="middle" fontSize="13" fontWeight="800" fill="#9a3412" stroke="#fff" strokeWidth="3" paintOrder="stroke">
              {pt.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
