// ─── Les dessins des feuilles STMG « séries à deux variables » (22/10/2026) ──
//
// Cinq feuilles (nuage, ajustement, moindres carrés, interpoler, changement de
// variable) partagent deux aides, sur le modèle de la feuille de 4e
// `maths-4e-stat-donnee.tsx` : du SVG local, viewBox 300, police 12-13, AUCUNE
// largeur minimale (rien ne défile à 375 px).
//   · `nuage` : le nuage de points du coach (`canvasNuage` de la banque
//     `statistique-deux-variables.bank.ts`), avec en option une ou deux
//     droites d'ajustement, le point moyen G, les écarts verticaux (moindres
//     carrés) et les pointillés d'une lecture graphique. ⭐ Les axes peuvent
//     partir d'une autre valeur que 0 (années, SMIC entre 10 et 12 €) : le
//     premier nombre de l'axe est alors écrit en rouge, comme l'axe tronqué de
//     la 4e. Une étiquette sur deux est sautée quand elles se touchent.
//   · `grille` : le tableau de données, en HTML (repris de la 4e).
// ⛔ Arguments écrits EN CLAIR dans les feuilles : les vérificateurs
// `scripts/verifier-exercices-stmg-*.mjs` les relisent et refont chaque calcul.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";

/** 37.5 → « 37,5 » : le texte NU d'un dessin (pas de KaTeX). */
export const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export type Pt = { x: number; y: number; label?: string };

export type OptsNuage = {
  /** Le nom des axes : [abscisse, ordonnée]. */
  noms?: [string, string];
  /** Les droites y = a x + b, [a, b] : la première en bleu, la seconde en vert. */
  droites?: [number, number][];
  /** Le point moyen G, en orange. */
  moyen?: [number, number];
  /** Les écarts verticaux de chaque point à la PREMIÈRE droite (pointillés rouges). */
  ecarts?: boolean;
  /** Les lectures sur la première droite : depuis une abscisse x, ou une ordonnée y. */
  lectures?: { x?: number; y?: number }[];
};

/** Les graduations min, min + pas… jusqu'à max. */
const grad = (min: number, max: number, pas: number) =>
  Array.from({ length: Math.round((max - min) / pas) + 1 }, (_, k) => Math.round((min + k * pas) * 1e6) / 1e6);

/** Largeur d'une étiquette en police 12 grasse. */
export const largeur = (s: string) => s.length * 7.2;

/**
 * Le NUAGE DE POINTS. `cadre` = [xmin, xmax, pasX, ymin, ymax, pasY] : les
 * axes gradués (10 intervalles au plus en x, 8 en y, le vérificateur le
 * contrôle). Les points rouges sont ceux du tableau ; `label` seulement pour
 * un point qu'on nomme (A, M, G…).
 */
export const nuage = (cadre: [number, number, number, number, number, number], points: Pt[], opts: OptsNuage = {}) => {
  const [xmin, xmax, px, ymin, ymax, py] = cadre;
  const gx = grad(xmin, xmax, px);
  const gy = grad(ymin, ymax, py);
  const W = 300;
  const G = 14 + Math.max(...gy.map((v) => largeur(fr(v))));
  const D = 14;
  const HAUT = 28;
  const BAS = 196;
  const H = opts.noms ? 236 : 220;
  const X = (x: number) => G + ((x - xmin) / (xmax - xmin)) * (W - G - D);
  const Y = (y: number) => BAS - ((y - ymin) / (ymax - ymin)) * (BAS - HAUT);
  const slot = (W - G - D) / (gx.length - 1);
  // Une étiquette sur k quand elles se touchent.
  const k = Math.max(1, Math.ceil((Math.max(...gx.map((v) => largeur(fr(v)))) + 4) / slot));
  /** Le morceau de la droite y = ax + b qui reste dans le cadre. */
  const segment = ([a, b]: [number, number]) => {
    let [x1, x2] = [xmin, xmax];
    if (a !== 0) {
      const [u, v] = [(ymin - b) / a, (ymax - b) / a].sort((p, q) => p - q);
      [x1, x2] = [Math.max(x1, u), Math.min(x2, v)];
    }
    return x1 < x2 ? { x1: X(x1), y1: Y(a * x1 + b), x2: X(x2), y2: Y(a * x2 + b) } : null;
  };
  const d0 = opts.droites?.[0];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Nuage de points">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        {gy.map((v, i) => (
          <g key={`y${i}`}>
            <line x1={G} y1={Y(v)} x2={W - D} y2={Y(v)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={G - 6} y={Y(v) + 4} textAnchor="end" fontSize="12" fontWeight="700" fill={i === 0 && ymin !== 0 ? ROUGE : "#334155"}>
              {fr(v)}
            </text>
          </g>
        ))}
        {gx.map((v, i) => (
          <g key={`x${i}`}>
            <line x1={X(v)} y1={HAUT} x2={X(v)} y2={BAS} stroke="#e2e8f0" strokeWidth="1" />
            {i % k === 0 ? (
              <text x={X(v)} y={BAS + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={i === 0 && xmin !== 0 ? ROUGE : "#334155"}>
                {fr(v)}
              </text>
            ) : null}
          </g>
        ))}
        <line x1={G} y1={HAUT - 10} x2={G} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G} y1={BAS} x2={W - D + 6} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {opts.noms ? (
          <>
            <text x="6" y="14" fontSize="12" fontWeight="700" fill="#475569">
              {opts.noms[1]}
            </text>
            <text x={W - 6} y={BAS + 34} textAnchor="end" fontSize="12" fontWeight="700" fill="#475569">
              {opts.noms[0]}
            </text>
          </>
        ) : null}
        {(opts.droites ?? []).map((d, i) => {
          const s = segment(d);
          return s ? <line key={`d${i}`} {...s} stroke={i === 0 ? BLEU : VERT} strokeWidth="2.5" /> : null;
        })}
        {opts.ecarts && d0
          ? points.map((p, i) => (
              <line key={`e${i}`} x1={X(p.x)} y1={Y(p.y)} x2={X(p.x)} y2={Y(d0[0] * p.x + d0[1])} stroke={ROUGE} strokeWidth="1.5" strokeDasharray="4 3" />
            ))
          : null}
        {d0
          ? (opts.lectures ?? []).map((l, i) => {
              const x = l.x ?? ((l.y as number) - d0[1]) / d0[0];
              const y = d0[0] * x + d0[1];
              return (
                <g key={`l${i}`} stroke={ORANGE} strokeWidth="1.8" strokeDasharray="5 4" fill="none">
                  <polyline points={`${X(x)},${BAS} ${X(x)},${Y(y)} ${G},${Y(y)}`} />
                </g>
              );
            })
          : null}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={X(p.x)} cy={Y(p.y)} r="4" fill={ROUGE} stroke="#fff" strokeWidth="1" />
            {p.label ? (
              <text x={X(p.x) + 7} y={Y(p.y) - 7} fontSize="13" fontWeight="800" fill={ROUGE} stroke="#fff" strokeWidth="3" paintOrder="stroke">
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
        {opts.moyen ? (
          <g>
            <rect x={X(opts.moyen[0]) - 5} y={Y(opts.moyen[1]) - 5} width="10" height="10" fill={ORANGE} stroke="#fff" strokeWidth="1" />
            <text x={X(opts.moyen[0]) + 8} y={Y(opts.moyen[1]) + 16} fontSize="13" fontWeight="800" fill={ORANGE} stroke="#fff" strokeWidth="3" paintOrder="stroke">
              G
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/**
 * Le tableau de données : une ligne par individu. Du HTML, lisible à toutes
 * les largeurs. `surligne` met une ligne en orange. ⛔ Texte NU dans les cases.
 */
export const grille = (entetes: string[], lignes: (string | number)[][], opts: { surligne?: number } = {}) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
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
        {lignes.map((l, i) => (
          <tr key={i} className={opts.surligne === i ? "bg-orange-100 font-bold text-orange-800" : ""}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                {typeof c === "number" ? fr(c) : c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
