// tutor-v4/components/FonctionGraphiqueCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type Point = { x: number; y: number };

const COULEUR_AXES = "#0f172a";
const COULEUR_GRILLE = "#cbd5e1";
const COULEUR_COURBE = "#2563eb";
const COULEUR_POINT = "#dc2626";
const COULEUR_VERTICALE = "#f97316";
const COULEUR_HORIZONTALE = "#7c3aed";

function toSvgX(x: number, xmin: number, xmax: number, width: number) {
  return ((x - xmin) / (xmax - xmin)) * width;
}

function toSvgY(y: number, ymin: number, ymax: number, height: number) {
  return height - ((y - ymin) / (ymax - ymin)) * height;
}

function formatNumber(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default function FonctionGraphiqueCanvas({ figure }: Props) {
  if (figure.kind !== "fonctionGraphique") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 260;

  const xmin = figure.xmin;
  const xmax = figure.xmax;
  const ymin = figure.ymin;
  const ymax = figure.ymax;

  const courbes = figure.courbes ?? [];
  const points = figure.points ?? [];
  const misesEnEvidence = figure.misesEnEvidence ?? [];

  const xAxisY = ymin <= 0 && ymax >= 0 ? toSvgY(0, ymin, ymax, height) : height;
  const yAxisX = xmin <= 0 && xmax >= 0 ? toSvgX(0, xmin, xmax, width) : 0;

  function pointToSvg(p: Point) {
    return {
      x: toSvgX(p.x, xmin, xmax, width),
      y: toSvgY(p.y, ymin, ymax, height),
    };
  }

  function computeY(courbe: NonNullable<typeof figure.courbes>[number], x: number) {
    if (courbe.type === "lineaire") return (courbe.a ?? 1) * x;
    if (courbe.type === "affine") return (courbe.a ?? 1) * x + (courbe.b ?? 0);
    if (courbe.type === "quadratique") {
      return (courbe.a ?? 1) * x * x + (courbe.b ?? 0) * x + (courbe.c ?? 0);
    }
    return null;
  }

  function pathForCourbe(courbe: NonNullable<typeof figure.courbes>[number]) {
    if (courbe.type === "points") {
      const pts = courbe.points ?? [];
      return pts
        .map((p, index) => {
          const s = pointToSvg(p);
          return `${index === 0 ? "M" : "L"} ${s.x} ${s.y}`;
        })
        .join(" ");
    }

    const steps = 120;
    const parts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const x = xmin + ((xmax - xmin) * i) / steps;
      const y = computeY(courbe, x);

      if (y === null || y < ymin - 1 || y > ymax + 1) continue;

      const s = pointToSvg({ x, y });
      parts.push(`${parts.length === 0 ? "M" : "L"} ${s.x} ${s.y}`);
    }

    return parts.join(" ");
  }

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          {figure.titre}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Graphique de fonction"
      >
        {figure.grille !== false &&
          Array.from({ length: xmax - xmin + 1 }, (_, i) => xmin + i).map((x) => {
            const sx = toSvgX(x, xmin, xmax, width);
            return (
              <line
                key={`gx-${x}`}
                x1={sx}
                y1={0}
                x2={sx}
                y2={height}
                stroke={COULEUR_GRILLE}
                strokeWidth={0.8}
              />
            );
          })}

        {figure.grille !== false &&
          Array.from({ length: ymax - ymin + 1 }, (_, i) => ymin + i).map((y) => {
            const sy = toSvgY(y, ymin, ymax, height);
            return (
              <line
                key={`gy-${y}`}
                x1={0}
                y1={sy}
                x2={width}
                y2={sy}
                stroke={COULEUR_GRILLE}
                strokeWidth={0.8}
              />
            );
          })}

        <line x1={0} y1={xAxisY} x2={width} y2={xAxisY} stroke={COULEUR_AXES} strokeWidth={2.2} />
        <line x1={yAxisX} y1={0} x2={yAxisX} y2={height} stroke={COULEUR_AXES} strokeWidth={2.2} />

        {Array.from({ length: xmax - xmin + 1 }, (_, i) => xmin + i).map((x) => {
          const sx = toSvgX(x, xmin, xmax, width);
          return (
            <text key={`tx-${x}`} x={sx} y={xAxisY + 16} textAnchor="middle" fontSize="10" fill="#334155">
              {x !== 0 ? formatNumber(x) : "0"}
            </text>
          );
        })}

        {Array.from({ length: ymax - ymin + 1 }, (_, i) => ymin + i).map((y) => {
          if (y === 0) return null;
          const sy = toSvgY(y, ymin, ymax, height);
          return (
            <text key={`ty-${y}`} x={yAxisX + 5} y={sy - 4} fontSize="10" fill="#334155">
              {formatNumber(y)}
            </text>
          );
        })}

        {courbes.map((courbe) => (
          <path
            key={courbe.id}
            d={pathForCourbe(courbe)}
            fill="none"
            stroke={courbe.couleur ?? COULEUR_COURBE}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {misesEnEvidence.map((m, index) => {
          const elements = [];

          if (m.verticale) {
            const sx = toSvgX(m.verticale.x, xmin, xmax, width);
            elements.push(
              <line
                key={`v-${index}`}
                x1={sx}
                y1={0}
                x2={sx}
                y2={height}
                stroke={m.verticale.couleur ?? COULEUR_VERTICALE}
                strokeWidth={2}
                strokeDasharray="6 5"
              />
            );
          }

          if (m.horizontale) {
            const sy = toSvgY(m.horizontale.y, ymin, ymax, height);
            elements.push(
              <line
                key={`h-${index}`}
                x1={0}
                y1={sy}
                x2={width}
                y2={sy}
                stroke={m.horizontale.couleur ?? COULEUR_HORIZONTALE}
                strokeWidth={2}
                strokeDasharray="6 5"
              />
            );
          }

          if (m.point) {
            const s = pointToSvg(m.point);
            elements.push(
              <g key={`p-${index}`}>
                <circle cx={s.x} cy={s.y} r={5} fill={m.point.couleur ?? COULEUR_POINT} />
                {m.point.label ? (
                  <text
                    x={s.x + 8}
                    y={s.y - 8}
                    fontSize="13"
                    fontWeight="900"
                    fill={m.point.couleur ?? COULEUR_POINT}
                    stroke="white"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {m.point.label}
                  </text>
                ) : null}
              </g>
            );
          }

          return <g key={`mise-${index}`}>{elements}</g>;
        })}

        {points.map((p, index) => {
          const s = pointToSvg(p);
          return (
            <g key={`pt-${index}`}>
              <circle cx={s.x} cy={s.y} r={4.5} fill={p.couleur ?? COULEUR_POINT} />
              {p.label ? (
                <text
                  x={s.x + 7}
                  y={s.y - 7}
                  fontSize="12"
                  fontWeight="900"
                  fill={p.couleur ?? COULEUR_POINT}
                  stroke="white"
                  strokeWidth="2"
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