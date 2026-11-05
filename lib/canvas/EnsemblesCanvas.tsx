// lib/canvas/EnsemblesCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";
import { planEnsembles } from "./ensembles";

// Deux ou trois ensembles, chacun sa couleur, et les éléments placés par leurs
// appartenances : la position se calcule (./ensembles.ts), elle ne se saisit pas.

const COULEURS = [
  { trait: "#1d4ed8", fond: "rgba(59,130,246,0.13)" },
  { trait: "#c2410c", fond: "rgba(249,115,22,0.13)" },
  { trait: "#15803d", fond: "rgba(34,197,94,0.13)" },
];

export default function EnsemblesCanvas({ figure }: { figure: CanvasFigure }) {
  if (figure.kind !== "ensembles") return null;
  const plan = planEnsembles(figure);
  return (
    <svg
      viewBox={`0 0 ${plan.W} ${plan.H}`}
      width="100%"
      style={{ maxWidth: 480, display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.description ?? `Ensembles : ${figure.ensembles.join(", ")}`}
    >
      {plan.cercles.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={COULEURS[i].fond} stroke={COULEURS[i].trait} strokeWidth={2} />
      ))}
      {plan.noms.map((n, i) => (
        <text key={i} x={n.x} y={n.y} textAnchor={n.ancre} fontSize={14} fontWeight={700} fill={COULEURS[i].trait}>
          {n.lignes.map((l, k) => (
            <tspan key={k} x={n.x} dy={k === 0 ? 0 : 16}>{l}</tspan>
          ))}
        </text>
      ))}
      {plan.elements.map((e, i) => (
        <text key={i} x={e.x} y={e.y + 5} textAnchor="middle" fontSize={13.5} fontWeight={600} fill="#0f172a">{e.nom}</text>
      ))}
    </svg>
  );
}
