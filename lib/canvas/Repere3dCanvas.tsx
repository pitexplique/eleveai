// lib/canvas/Repere3dCanvas.tsx
"use client";

import type { Repere3dCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: Repere3dCanvasData;
};

const COULEUR_AXE = "#0f172a";
const COULEUR_SEGMENT = "#475569";
const COULEUR_POINT = "#dc2626";

// Perspective cavalière : l'axe y (profondeur) est tracé en oblique, réduit.
const ANGLE = Math.PI / 6; // 30°
const FUITE = 0.5; // facteur de fuite
const COS = Math.cos(ANGLE);
const SIN = Math.sin(ANGLE);

// Projette (x, y, z) sur un plan "mathématique" (px vers la droite, py vers le haut).
function projeter(x: number, y: number, z: number): { px: number; py: number } {
  return {
    px: x + FUITE * y * COS,
    py: z + FUITE * y * SIN,
  };
}

export default function Repere3dCanvas({ figure }: Props) {
  if (figure.kind !== "repere3d") return null;

  const points = figure.points ?? [];
  const segments = figure.segments ?? [];
  const afficherAxes = figure.afficherAxes !== false;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 280;
  const pad = 28;

  // Longueur des axes : un peu au-delà de la plus grande coordonnée.
  const maxCoord = Math.max(
    1,
    ...points.flatMap((p) => [Math.abs(p.x), Math.abs(p.y), Math.abs(p.z)])
  );
  const axisLen = Math.ceil(maxCoord) + 1;

  // Points "math" à cadrer : origine, extrémités d'axes, et les points donnés.
  const mathPts: { px: number; py: number }[] = [projeter(0, 0, 0)];
  if (afficherAxes) {
    mathPts.push(projeter(axisLen, 0, 0), projeter(0, axisLen, 0), projeter(0, 0, axisLen));
  }
  points.forEach((p) => mathPts.push(projeter(p.x, p.y, p.z)));

  const minPx = Math.min(...mathPts.map((m) => m.px));
  const maxPx = Math.max(...mathPts.map((m) => m.px));
  const minPy = Math.min(...mathPts.map((m) => m.py));
  const maxPy = Math.max(...mathPts.map((m) => m.py));

  const rangePx = Math.max(0.001, maxPx - minPx);
  const rangePy = Math.max(0.001, maxPy - minPy);
  const scale = Math.min((width - 2 * pad) / rangePx, (height - 2 * pad) / rangePy);

  // Transforme un point math en coordonnées écran (SVG, py inversé).
  function ecran(px: number, py: number): { sx: number; sy: number } {
    return {
      sx: pad + (px - minPx) * scale,
      sy: height - pad - (py - minPy) * scale,
    };
  }

  function ecranPoint3d(x: number, y: number, z: number) {
    const { px, py } = projeter(x, y, z);
    return ecran(px, py);
  }

  const O = ecranPoint3d(0, 0, 0);
  const axes = afficherAxes
    ? [
        { tip: ecranPoint3d(axisLen, 0, 0), label: "x" },
        { tip: ecranPoint3d(0, axisLen, 0), label: "y" },
        { tip: ecranPoint3d(0, 0, axisLen), label: "z" },
      ]
    : [];

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">{figure.titre}</div>
      ) : null}

      <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" aria-label="Repère 3D">
        {axes.map((axe, i) => (
          <g key={`axe-${i}`}>
            <line
              x1={O.sx}
              y1={O.sy}
              x2={axe.tip.sx}
              y2={axe.tip.sy}
              stroke={COULEUR_AXE}
              strokeWidth={1.5}
            />
            <text
              x={axe.tip.sx + 4}
              y={axe.tip.sy - 4}
              fontSize="13"
              fontStyle="italic"
              fontWeight="700"
              fill={COULEUR_AXE}
            >
              {axe.label}
            </text>
          </g>
        ))}

        {segments.map((seg, i) => {
          const a = points[seg.de];
          const b = points[seg.a];
          if (!a || !b) return null;
          const sa = ecranPoint3d(a.x, a.y, a.z);
          const sb = ecranPoint3d(b.x, b.y, b.z);
          return (
            <line
              key={`seg-${i}`}
              x1={sa.sx}
              y1={sa.sy}
              x2={sb.sx}
              y2={sb.sy}
              stroke={seg.couleur ?? COULEUR_SEGMENT}
              strokeWidth={2}
              strokeDasharray={seg.pointille ? "5 4" : undefined}
            />
          );
        })}

        {points.map((p, i) => {
          const s = ecranPoint3d(p.x, p.y, p.z);
          return (
            <g key={`pt-${i}`}>
              <circle cx={s.sx} cy={s.sy} r={4} fill={p.couleur ?? COULEUR_POINT} />
              {p.label ? (
                <text
                  x={s.sx + 7}
                  y={s.sy - 6}
                  fontSize="13"
                  fontWeight="900"
                  fill={p.couleur ?? COULEUR_POINT}
                  stroke="white"
                  strokeWidth="2.5"
                  paintOrder="stroke"
                >
                  {p.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
