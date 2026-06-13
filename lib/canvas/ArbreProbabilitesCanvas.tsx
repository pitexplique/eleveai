// lib/canvas/ArbreProbabilitesCanvas.tsx
"use client";

import type { ArbreProbabilitesCanvasData, ArbreProbaNoeud } from "@/lib/tutor-v4/types";

type Props = {
  figure: ArbreProbabilitesCanvasData;
};

type Placed = {
  x: number;
  y: number;
  node: ArbreProbaNoeud;
  children: Placed[];
};

const COL_X = [24, 168, 320];
const ROW_H = 48;
const PAD_TOP = 24;

const COULEUR_BRANCHE = "#475569";
const COULEUR_PROBA = "#2563eb";
const COULEUR_LABEL = "#0f172a";
const COULEUR_DEPART = "#0f172a";

function countLeaves(n: ArbreProbaNoeud): number {
  if (!n.enfants || n.enfants.length === 0) return 1;
  return n.enfants.reduce((sum, c) => sum + countLeaves(c), 0);
}

export default function ArbreProbabilitesCanvas({ figure }: Props) {
  if (figure.kind !== "arbre_proba") return null;

  const roots = figure.racineEnfants ?? [];
  const totalLeaves = roots.reduce((sum, r) => sum + countLeaves(r), 0);

  const width = figure.size?.width ?? 360;
  const height = figure.size?.height ?? PAD_TOP * 2 + Math.max(1, totalLeaves) * ROW_H;

  // Placement : les feuilles sont réparties verticalement, un nœud interne se
  // place à la moyenne des ordonnées de ses enfants.
  let cursor = 0;
  function place(node: ArbreProbaNoeud, depth: number): Placed {
    const x = COL_X[Math.min(depth + 1, COL_X.length - 1)];
    if (!node.enfants || node.enfants.length === 0) {
      const y = PAD_TOP + (cursor + 0.5) * ROW_H;
      cursor += 1;
      return { x, y, node, children: [] };
    }
    const children = node.enfants.map((c) => place(c, depth + 1));
    const y = (children[0].y + children[children.length - 1].y) / 2;
    return { x, y, node, children };
  }

  const placedRoots = roots.map((r) => place(r, 0));
  const rootY =
    placedRoots.length > 0
      ? (placedRoots[0].y + placedRoots[placedRoots.length - 1].y) / 2
      : height / 2;
  const departure = { x: COL_X[0], y: rootY };

  const edges: { x1: number; y1: number; x2: number; y2: number; proba?: string }[] = [];
  const nodes: Placed[] = [];

  function walk(parent: { x: number; y: number }, p: Placed) {
    edges.push({ x1: parent.x, y1: parent.y, x2: p.x, y2: p.y, proba: p.node.proba });
    nodes.push(p);
    p.children.forEach((c) => walk({ x: p.x, y: p.y }, c));
  }
  placedRoots.forEach((r) => walk(departure, r));

  return (
    <div className="mx-auto w-full max-w-[400px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">{figure.titre}</div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Arbre pondéré de probabilités"
      >
        <circle cx={departure.x} cy={departure.y} r={4} fill={COULEUR_DEPART} />

        {edges.map((e, i) => {
          const mx = (e.x1 + e.x2) / 2;
          const my = (e.y1 + e.y2) / 2;
          return (
            <g key={`edge-${i}`}>
              <line
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke={COULEUR_BRANCHE}
                strokeWidth={1.8}
              />
              {e.proba ? (
                <text
                  x={mx}
                  y={my - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={COULEUR_PROBA}
                  stroke="white"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {e.proba}
                </text>
              ) : null}
            </g>
          );
        })}

        {nodes.map((p, i) => (
          <text
            key={`node-${i}`}
            x={p.x + 8}
            y={p.y + 5}
            fontSize="14"
            fontWeight="900"
            fill={COULEUR_LABEL}
            stroke="white"
            strokeWidth="2.5"
            paintOrder="stroke"
          >
            {p.node.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
