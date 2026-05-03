// tutor-v4/components/ThalesCanvas.tsx
"use client";

/**
 * ============================================
 * 🎯 THALES CANVAS — Tutor V4
 * ============================================
 *
 * Ce composant affiche une configuration de Thalès.
 *
 * ✔ Variantes :
 * - "triangle" → niveau 4e (programme officiel)
 * - "papillon" → prévu pour 3e (non utilisé ici)
 *
 * ✔ Objectifs pédagogiques :
 * - visualiser des droites parallèles
 * - repérer les points A, B, C, M, N
 * - comprendre les rapports :
 *      AM / AB = AN / AC
 * - aider à la rédaction
 *
 * ============================================
 * 🧪 EXEMPLE D’UTILISATION (QuestionBank)
 * ============================================
 *
 * canvas: {
 *   kind: "thales",
 *   variant: "triangle",
 *
 *   sideLabels: {
 *     AM: "3 cm",
 *     AB: "6 cm",
 *     AN: "4 cm",
 *     AC: "?",
 *   },
 *
 *   display: {
 *     showPoints: true,
 *     showLabels: true,
 *     showSideLabels: true,
 *     showParallelMarks: true,
 *     highlightParallel: true,
 *   },
 * }
 *
 * ============================================
 */

import type { ThalesCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: ThalesCanvasData;
};

export default function ThalesCanvas({ figure }: Props) {
  if (figure.kind !== "thales") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 240;

  const showLabels = figure.display?.showLabels ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showSideLabels = figure.display?.showSideLabels ?? true;
  const showParallelMarks = figure.display?.showParallelMarks ?? true;

  const A = { x: 60, y: 200 };
  const B = { x: 260, y: 200 };
  const C = { x: 180, y: 60 };

  const M = { x: 120, y: 200 };
  const N = { x: 160, y: 140 };

  const parallelColor = "#dc2626";

  const getLabel = (key: "A" | "B" | "C" | "M" | "N", fallback: string) =>
    figure.labels?.[key] ?? fallback;

  const getSideLabel = (
    key: "AB" | "AC" | "BC" | "AM" | "AN" | "MN" | "BM" | "CN"
  ) => figure.sideLabels?.[key];

  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border bg-white p-2">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.5}
        />

        <line
          x1={M.x}
          y1={M.y}
          x2={N.x}
          y2={N.y}
          stroke={parallelColor}
          strokeWidth={2.5}
        />

        {showParallelMarks && (
          <>
            <line
              x1={200}
              y1={120}
              x2={210}
              y2={130}
              stroke={parallelColor}
              strokeWidth={2}
            />
            <line
              x1={210}
              y1={120}
              x2={220}
              y2={130}
              stroke={parallelColor}
              strokeWidth={2}
            />
          </>
        )}

        {showPoints &&
          [A, B, C, M, N].map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#0f172a" />
          ))}

        {showLabels && (
          <>
            <text x={A.x - 10} y={A.y + 15}>
              {getLabel("A", "A")}
            </text>
            <text x={B.x + 5} y={B.y + 15}>
              {getLabel("B", "B")}
            </text>
            <text x={C.x} y={C.y - 10}>
              {getLabel("C", "C")}
            </text>
            <text x={M.x - 10} y={M.y + 15}>
              {getLabel("M", "M")}
            </text>
            <text x={N.x + 5} y={N.y - 5}>
              {getLabel("N", "N")}
            </text>
          </>
        )}

        {showSideLabels && (
          <>
            {getSideLabel("AM") && (
              <text x={(A.x + M.x) / 2} y={A.y + 25}>
                {getSideLabel("AM")}
              </text>
            )}

            {getSideLabel("AB") && (
              <text x={(A.x + B.x) / 2} y={A.y + 40}>
                {getSideLabel("AB")}
              </text>
            )}

            {getSideLabel("AN") && (
              <text x={(A.x + N.x) / 2 - 10} y={(A.y + N.y) / 2}>
                {getSideLabel("AN")}
              </text>
            )}

            {getSideLabel("AC") && (
              <text x={(A.x + C.x) / 2 - 15} y={(A.y + C.y) / 2 - 10}>
                {getSideLabel("AC")}
              </text>
            )}
          </>
        )}

        <text x={100} y={220} fill="#16a34a" fontWeight="bold">
          AM / AB = AN / AC
        </text>
      </svg>
    </div>
  );
}