// lib/canvas/PatronsCubeCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

// Plusieurs assemblages de carrés, chacun avec son nom : « lequel est un patron de cube ? ».
// Un carré peut porter un nombre (la face d'un dé) ; un carré en pointillés est une place possible.

const C = 22;

export default function PatronsCubeCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "patrons_cube") return null;
  const liste = figure.patrons.map((p) => {
    const toutes = [...p.cases, ...(p.places ?? []).map((x) => x.case)];
    const rmin = Math.min(...toutes.map(([r]) => r));
    const cmin = Math.min(...toutes.map(([, c]) => c));
    const rmax = Math.max(...toutes.map(([r]) => r));
    const cmax = Math.max(...toutes.map(([, c]) => c));
    return { ...p, rmin, cmin, h: (rmax - rmin + 1) * C, w: (cmax - cmin + 1) * C };
  });
  const parLigne = liste.length === 4 ? 2 : liste.length;
  const W = Math.max(...liste.map((p) => p.w)) + 24;
  const H = Math.max(...liste.map((p) => p.h)) + (liste.some((p) => p.nom) ? 30 : 12);
  const lignes = Math.ceil(liste.length / parLigne);
  return (
    <svg viewBox={`0 0 ${parLigne * W} ${lignes * H}`} width="100%" style={{ maxWidth: Math.min(parLigne * W * 1.2, 520), display: "block", margin: "0 auto" }} role="img" aria-label="Des assemblages de carrés">
      {liste.map((p, i) => {
        const x0 = (i % parLigne) * W + (W - p.w) / 2;
        const y0 = Math.floor(i / parLigne) * H + 6;
        const X = (c: number) => x0 + (c - p.cmin) * C;
        const Y = (r: number) => y0 + (r - p.rmin) * C;
        return (
          <g key={i}>
            {p.cases.map(([r, c], k) => (
              <rect key={k} x={X(c)} y={Y(r)} width={C} height={C} fill="#bfdbfe" stroke="#1e3a8a" strokeWidth={1.4} />
            ))}
            {(p.textes ?? []).map((t, k) => (
              <text key={k} x={X(t.case[1]) + C / 2} y={Y(t.case[0]) + C / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill="#1e3a8a">{t.texte}</text>
            ))}
            {(p.places ?? []).map((t, k) => (
              <g key={k}>
                <rect x={X(t.case[1])} y={Y(t.case[0])} width={C} height={C} fill="#fff7ed" stroke="#ea580c" strokeWidth={1.4} strokeDasharray="3 3" />
                <text x={X(t.case[1]) + C / 2} y={Y(t.case[0]) + C / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#c2410c">{t.texte}</text>
              </g>
            ))}
            {p.nom ? <text x={(i % parLigne) * W + W / 2} y={y0 + p.h + 18} textAnchor="middle" fontSize={15} fontWeight={700} fill="#0f172a">{p.nom}</text> : null}
          </g>
        );
      })}
    </svg>
  );
}
