// ─── Les dessins des trois feuilles de fractions du CM2 (25/10/2026) ──────────
//
// Partagés par `maths-cm2-fraction.tsx`, `maths-cm2-fraction-mixte.tsx` et
// `maths-cm2-fraction-calcul.tsx`. Repris des feuilles de 6e
// (`maths-6e-fraction-nombre.tsx` : `droiteRel`, `barres`, `grille` devenue
// `carreaux`) et du canvas `fraction` du coach (disque, rectangle partagé en
// lignes × colonnes, grille de 100, comparaison) — le même dessin que dans les
// exercices du coach CM2.
// ⭐ Frédéric, 25/10 : « les élèves adorent les schémas », « n'oublie pas les
// canvas camembert etc ! ». Et les billes rangées (`jetons`), qu'il adore
// (07/10) : prendre 2/3 de 12, c'est encadrer 2 rangées sur 3.
// ⛔ Texte NU dans les dessins (SVG : KaTeX n'y passe pas), « 3/4 » écrit en
// clair. Chaque appel s'écrit avec des arguments EN CLAIR : les scripts de
// recalcul `scripts/verifier-exercices-cm2-fraction*.mjs` les relisent.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";
const VIDE = "#f1f5f9";
const COULEURS = [BLEU, ORANGE, VERT, "#eab308"];

export type Point = { value: number; label: string; color?: string };
export type Saut = { de: number; vers: number; label: string };

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
export const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 1,5 : un nombre écrit comme au tableau (texte NU). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(Math.round(v * 1e6) / 1e6)).split(".");
  return (v < 0 ? "−" : "") + e + (d ? "," + d : "");
};

/** UN DISQUE (camembert) du coach, coupé en `d` parts égales, `n` coloriées.
 *  `ecrire` : la fraction écrite dessous (seulement quand l'énoncé la donne). */
export const disque = (n: number, d: number, ecrire = false) => (
  <div className="mx-auto w-full max-w-[13rem] print:max-w-[9rem]">
    <CanvasRenderer figure={{ kind: "fraction", model: "circle", fraction: { numerator: n, denominator: d }, display: { showFraction: ecrire } } as never} />
  </div>
);

/** Deux disques côte à côte : deux tartes de même taille (ou deux pizzas,
 *  pour une fraction plus grande que 1). `ecrire` : les fractions dessous. */
export const deuxDisques = (a: [number, number], b: [number, number], ecrire = true) => (
  <div className="mx-auto grid w-full min-w-0 max-w-[22rem] grid-cols-1 gap-2 sm:grid-cols-2 print:max-w-[16rem] print:grid-cols-2">
    {[a, b].map(([n, d], i) => (
      <CanvasRenderer key={i} figure={{ kind: "fraction", model: "circle", fraction: { numerator: n, denominator: d }, display: { showFraction: ecrire } } as never} />
    ))}
  </div>
);

/** UN RECTANGLE partagé en `lignes` × `colonnes` cases égales, les `n`
 *  premières coloriées (dans l'ordre de lecture). Canvas `fraction`, modèle grid. */
export const rect = (lignes: number, colonnes: number, n: number) => (
  <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
    <CanvasRenderer figure={{ kind: "fraction", model: "grid", grid: { rows: lignes, cols: colonnes, shaded: n }, display: { showFraction: false } } as never} />
  </div>
);

/** LA GRILLE DE 100 : 1 case = 1/100 = 0,01 = 1 %. */
export const cent = (n: number) => (
  <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
    <CanvasRenderer figure={{ kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded: n }, display: { showFraction: false } } as never} />
  </div>
);

/** Deux BARRES du coach l'une sous l'autre, même longueur (modèle `compare`). */
export const comparer = (a: [number, number], b: [number, number]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    <CanvasRenderer
      figure={
        {
          kind: "fraction",
          model: "compare",
          fractions: [
            { numerator: a[0], denominator: a[1] },
            { numerator: b[0], denominator: b[1], color: "#f59e0b" },
          ],
          size: { width: 320, height: 205 },
        } as never
      }
    />
  </div>
);

/**
 * Des BARRES EMPILÉES, toutes de la même longueur (le même tout), coupées en
 * `d` parts égales ; `parts` donne les parts coloriées, groupe par groupe
 * (bleu, orange, vert). `fois` : la barre est répétée (2 ou 3 unités côte à
 * côte, pour une fraction plus grande que 1). Le nom à gauche : 10 signes au plus.
 */
export const barres = (liste: { d: number; label: string; parts: number[]; fois?: number }[]) => {
  const [x0, h, pas] = [100, 26, 38];
  const maxFois = Math.max(...liste.map((b) => b.fois ?? 1));
  const L = 190 / maxFois;
  const H = liste.length * pas + 6;
  const couleur = (k: number, parts: number[]) => {
    let fin = 0;
    for (let g = 0; g < parts.length; g++) {
      fin += parts[g];
      if (k < fin) return COULEURS[g];
    }
    return VIDE;
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Barres de fractions">
        {liste.map((b, i) => {
          const y = 6 + i * pas;
          const n = b.d * (b.fois ?? 1);
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {b.label}
              </text>
              {Array.from({ length: n }, (_, k) => (
                <rect key={k} x={x0 + (k * L) / b.d} y={y} width={L / b.d} height={h} fill={couleur(k, b.parts)} stroke={NOIR} strokeWidth={n > 16 ? 0.8 : 1.4} />
              ))}
              {Array.from({ length: (b.fois ?? 1) - 1 }, (_, u) => (
                <line key={`u${u}`} x1={x0 + (u + 1) * L} y1={y - 4} x2={x0 + (u + 1) * L} y2={y + h + 4} stroke={ROUGE} strokeWidth={3} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
/** La légende sous un dessin : un carré de couleur et un nom (7 signes au plus). */
const legende = (H: number, items: { color: string; label: string }[]) =>
  items.map((l, k) => (
    <g key={l.label}>
      <rect x={14 + k * 72} y={H - 20} width={12} height={12} fill={l.color} stroke="#475569" strokeWidth={1} />
      <text x={30 + k * 72} y={H - 9} fontSize="14" fontWeight="700" fill={NOIR}>
        {l.label}
      </text>
    </g>
  ));

/**
 * UNE GRILLE de `lignes` × `colonnes` carreaux égaux, remplie dans l'ordre de
 * lecture par chaque groupe (`n` carreaux de sa couleur) ; les carreaux qui
 * restent sont clairs, nommés par `reste`. Légende dessous, 4 noms au plus.
 */
export const carreaux = (lignes: number, colonnes: number, groupes: { n: number; nom: string }[], reste = "") => {
  const c = colonnes >= 10 ? 20 : 26;
  const x0 = (300 - colonnes * c) / 2;
  const couleur = (i: number) => {
    let fin = 0;
    for (let g = 0; g < groupes.length; g++) {
      fin += groupes[g].n;
      if (i < fin) return COULEURS[g];
    }
    return VIDE;
  };
  const items = [...groupes.map((g, i) => ({ color: COULEURS[i], label: g.nom })), ...(reste ? [{ color: VIDE, label: reste }] : [])].filter((l) => l.label);
  const H = lignes * c + 8 + (items.length ? 28 : 0);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Grille de carreaux égaux">
        {Array.from({ length: lignes * colonnes }, (_, i) => (
          <rect key={i} x={x0 + (i % colonnes) * c} y={4 + Math.floor(i / colonnes) * c} width={c} height={c} fill={couleur(i)} stroke="#475569" strokeWidth={1} />
        ))}
        {legende(H, items)}
      </svg>
    </div>
  );
};

/**
 * DES BILLES RANGÉES (Frédéric les adore, 07/10/2026) : `rangees` rangées de
 * `parRangee` billes, chaque rangée ENCADRÉE (c'est une part égale). Les
 * billes se colorient dans l'ordre de lecture, groupe par groupe ; les autres
 * restent claires. Prendre 2/3 de 12 billes = colorier 2 rangées sur 3.
 */
export const jetons = (rangees: number, parRangee: number, groupes: { n: number; nom: string }[], reste = "") => {
  const r = parRangee > 8 ? 10 : 12;
  const pas = 2 * r + 6;
  const x0 = (300 - parRangee * pas) / 2;
  const couleur = (i: number) => {
    let fin = 0;
    for (let g = 0; g < groupes.length; g++) {
      fin += groupes[g].n;
      if (i < fin) return COULEURS[g];
    }
    return VIDE;
  };
  const items = [...groupes.map((g, i) => ({ color: COULEURS[i], label: g.nom })), ...(reste ? [{ color: VIDE, label: reste }] : [])].filter((l) => l.label);
  const H = rangees * (pas + 6) + 10 + (items.length ? 28 : 0);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Billes rangées en parts égales">
        {Array.from({ length: rangees }, (_, l) => (
          <rect key={`c${l}`} x={x0 - 4} y={6 + l * (pas + 6)} width={parRangee * pas + 2} height={pas} rx={10} fill="none" stroke={ORANGE} strokeWidth={2} />
        ))}
        {Array.from({ length: rangees * parRangee }, (_, i) => (
          <circle key={i} cx={x0 + (i % parRangee) * pas + r - 1} cy={6 + Math.floor(i / parRangee) * (pas + 6) + pas / 2} r={r} fill={couleur(i)} stroke={NOIR} strokeWidth={1.2} />
        ))}
        {legende(H, items)}
      </svg>
    </div>
  );
};

/**
 * Une droite graduée HORIZONTALE (celle des feuilles de 6e) : une graduation
 * tous les `pas`, un nombre tous les `nombres`, des points nommés SOUS les
 * nombres, et des arcs fléchés (`sauts`). ⛔ Onze nombres écrits au plus.
 */
export const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let rg = 0;
      while (fins[rg] !== undefined && cx - demi < fins[rg]) rg++;
      fins[rg] = cx + demi;
      rangs.set(i, rg);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};
