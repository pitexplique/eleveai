// ─── Les dessins des feuilles « nombres et calcul » du CE2 (17/11/2026, lot F) ─
//
// Partagés par `maths-ce2-nombre-entier.tsx` et `maths-ce2-calcul-mental.tsx`.
// Le reste (droite graduée, opération posée, billes, paquets, cases d'une
// suite) vient des feuilles du CE1 et du CM1 (`dessins-ce1-nombres-calcul.tsx`,
// `dessins-calcul-cm1.tsx`, `dessins-cm1-nombres.tsx`), importés tels quels.
// Ici, le seul dessin propre au CE2 : le MATÉRIEL DE NUMÉRATION JUSQU'À 9 999,
// avec le gros cube de mille (10 plaques de cent empilées).
// ⛔ Le dessin ne donne JAMAIS la réponse : aucun nombre écrit, l'enfant compte.
// ⛔ Texte NU dans les SVG. Un viewBox de 300 de large au plus, mis à
// l'échelle : rien ne déborde à 375 px, pas de min-w.

import type { ReactNode } from "react";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const VERT = "#16a34a";
const VIOLET = "#7c3aed";
const BLEU_CLAIR = "#bfdbfe";

/** Un cube de mille en perspective : face avant quadrillée, dessus et côté. */
const cubeMille = (x: number, y: number, k: string): ReactNode => {
  const a = 34; // côté de la face avant
  const p = 10; // profondeur
  const traits = Array.from({ length: 9 }, (_, i) => (i + 1) * (a / 10));
  return (
    <g key={k}>
      <path d={`M ${x} ${y + p} L ${x + p} ${y} L ${x + a + p} ${y} L ${x + a} ${y + p} Z`} fill="#ddd6fe" stroke={VIOLET} strokeWidth={1.4} />
      <path d={`M ${x + a} ${y + p} L ${x + a + p} ${y} L ${x + a + p} ${y + a} L ${x + a} ${y + a + p} Z`} fill="#c4b5fd" stroke={VIOLET} strokeWidth={1.4} />
      <rect x={x} y={y + p} width={a} height={a} fill="#ede9fe" stroke={VIOLET} strokeWidth={1.6} />
      {traits.map((t, i) => (
        <g key={i}>
          <line x1={x + t} y1={y + p} x2={x + t} y2={y + p + a} stroke={VIOLET} strokeWidth={0.45} />
          <line x1={x} y1={y + p + t} x2={x + a} y2={y + p + t} stroke={VIOLET} strokeWidth={0.45} />
        </g>
      ))}
    </g>
  );
};

/** Une plaque de cent : un carré de 10 × 10. */
const plaque = (x: number, y: number, k: string): ReactNode => {
  const P = 34;
  return (
    <g key={k}>
      <rect x={x} y={y} width={P} height={P} fill={BLEU_CLAIR} stroke={BLEU} strokeWidth={1.5} />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <line x1={x + ((i + 1) * P) / 10} y1={y} x2={x + ((i + 1) * P) / 10} y2={y + P} stroke={BLEU} strokeWidth={0.45} />
          <line x1={x} y1={y + ((i + 1) * P) / 10} x2={x + P} y2={y + ((i + 1) * P) / 10} stroke={BLEU} strokeWidth={0.45} />
        </g>
      ))}
    </g>
  );
};

/**
 * LE MATÉRIEL DE NUMÉRATION DU CE2 : `m` cubes de mille, `c` plaques de cent,
 * `d` barres de dix, `u` petits cubes. Une rangée par sorte (les barres et les
 * cubes partagent la dernière). Rien d'écrit : l'enfant compte. 9 de chaque au plus.
 */
export const baseDixMille = (m: number, c: number, d: number, u: number) => {
  const W = 300;
  const enfants: ReactNode[] = [];
  let y = 8;
  // Les cubes de mille : 6 par rangée au plus.
  if (m) {
    const pas = 48;
    for (let k = 0; k < m; k++) enfants.push(cubeMille(8 + (k % 6) * pas, y + Math.floor(k / 6) * 50, `m${k}`));
    y += Math.ceil(m / 6) * 50 + 8;
  }
  // Les plaques de cent : 7 par rangée au plus.
  if (c) {
    const pas = 40;
    for (let k = 0; k < c; k++) enfants.push(plaque(8 + (k % 7) * pas, y + Math.floor(k / 7) * 40, `c${k}`));
    y += Math.ceil(c / 7) * 40 + 8;
  }
  // Les barres de dix, puis les cubes, sur la même rangée.
  if (d || u) {
    const H = 34;
    for (let k = 0; k < d; k++) {
      const x = 8 + k * 12;
      enfants.push(
        <g key={`d${k}`}>
          <rect x={x} y={y} width={8} height={H} fill="#fed7aa" stroke={ORANGE} strokeWidth={1.3} />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={x} y1={y + ((i + 1) * H) / 10} x2={x + 8} y2={y + ((i + 1) * H) / 10} stroke={ORANGE} strokeWidth={0.55} />
          ))}
        </g>,
      );
    }
    const xU = 8 + d * 12 + (d ? 14 : 0);
    for (let k = 0; k < u; k++)
      enfants.push(<rect key={`u${k}`} x={xU + Math.floor(k / 3) * 12} y={y + H - 9 - (k % 3) * 12} width={9} height={9} fill="#bbf7d0" stroke={VERT} strokeWidth={1.3} />);
    y += H + 8;
  }
  const H = y;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Matériel de numération : cubes de mille, plaques, barres et cubes">
        {enfants}
      </svg>
    </div>
  );
};
