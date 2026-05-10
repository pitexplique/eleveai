// tutor-v4/components/ThalesCanvas.tsx
"use client";

import type { ThalesCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: ThalesCanvasData;
};

type Point = { x: number; y: number };

type SideKey = "AB" | "AC" | "BC" | "AM" | "AN" | "MN" | "BM" | "CN";

function mid(P: Point, Q: Point): Point {
  return {
    x: (P.x + Q.x) / 2,
    y: (P.y + Q.y) / 2,
  };
}

function labelText(
  x: number,
  y: number,
  text: string,
  color = "#0f172a",
  anchor: "start" | "middle" | "end" = "middle"
) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="13"
      fontWeight="900"
      fill={color}
      stroke="white"
      strokeWidth="3"
      paintOrder="stroke"
    >
      {text}
    </text>
  );
}

function parallelMarks(P: Point, Q: Point, color: string, double = false) {
  const mx = (P.x + Q.x) / 2;
  const my = (P.y + Q.y) / 2;

  return (
    <g>
      <line
        x1={mx - 8}
        y1={my - 6}
        x2={mx + 2}
        y2={my + 6}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {double ? (
        <line
          x1={mx + 2}
          y1={my - 6}
          x2={mx + 12}
          y2={my + 6}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ) : null}
    </g>
  );
}

export default function ThalesCanvas({ figure }: Props) {
  if (figure.kind !== "thales") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 250;

  const variant = figure.variant ?? "triangle";

  const showLabels = figure.display?.showLabels ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showSideLabels = figure.display?.showSideLabels ?? true;
  const showParallelMarks = figure.display?.showParallelMarks ?? true;
  const highlightParallel = figure.display?.highlightParallel ?? true;
  const showFormula = figure.display?.showFormula ?? true;

  const strokeMain = figure.colors?.triangleStroke ?? "#0f172a";
  const parallelBase = figure.colors?.parallelStroke ?? "#dc2626";
  const parallelColor = highlightParallel ? parallelBase : strokeMain;
  const helperColor = figure.colors?.highlightStroke ?? "#64748b";
  const pointFill = figure.colors?.pointFill ?? strokeMain;
  const labelFill = figure.colors?.labelFill ?? strokeMain;
  const sideLabelFill = figure.colors?.sideLabelFill ?? strokeMain;

  const getLabel = (key: "A" | "B" | "C" | "M" | "N", fallback: string) =>
    figure.labels?.[key] ?? fallback;

  const getSideLabel = (key: SideKey) => figure.sideLabels?.[key];

  if (variant === "papillon") {
    const A = figure.points?.A ?? { x: 170, y: 125 };
    const B = figure.points?.B ?? { x: 55, y: 215 };
    const C = figure.points?.C ?? { x: 285, y: 35 };
    const M = figure.points?.M ?? { x: 65, y: 35 };
    const N = figure.points?.N ?? { x: 275, y: 215 };

    return (
      <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          aria-label="Configuration de Thalès en papillon"
        >
          <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke={strokeMain} strokeWidth={2.5} />
          <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke={strokeMain} strokeWidth={2.5} />

          <line x1={B.x} y1={B.y} x2={M.x} y2={M.y} stroke={parallelColor} strokeWidth={3} />
          <line x1={C.x} y1={C.y} x2={N.x} y2={N.y} stroke={parallelColor} strokeWidth={3} />

          {showParallelMarks ? (
            <>
              {parallelMarks(B, M, parallelColor)}
              {parallelMarks(C, N, parallelColor)}
            </>
          ) : null}

          {showPoints
            ? [A, B, C, M, N].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={4} fill={pointFill} />
              ))
            : null}

          {showLabels ? (
            <>
              {labelText(A.x, A.y - 10, getLabel("A", "A"), labelFill)}
              {labelText(B.x - 8, B.y + 18, getLabel("B", "B"), labelFill, "end")}
              {labelText(C.x + 8, C.y - 8, getLabel("C", "C"), labelFill, "start")}
              {labelText(M.x - 8, M.y - 8, getLabel("M", "M"), labelFill, "end")}
              {labelText(N.x + 8, N.y + 18, getLabel("N", "N"), labelFill, "start")}
            </>
          ) : null}

          {showSideLabels ? (
            <>
              {getSideLabel("AB")
                ? labelText(mid(A, B).x - 12, mid(A, B).y + 10, getSideLabel("AB")!, sideLabelFill)
                : null}
              {getSideLabel("AC")
                ? labelText(mid(A, C).x + 14, mid(A, C).y - 8, getSideLabel("AC")!, sideLabelFill)
                : null}
              {getSideLabel("AM")
                ? labelText(mid(A, M).x - 14, mid(A, M).y - 8, getSideLabel("AM")!, sideLabelFill)
                : null}
              {getSideLabel("AN")
                ? labelText(mid(A, N).x + 14, mid(A, N).y + 12, getSideLabel("AN")!, sideLabelFill)
                : null}
              {getSideLabel("BM")
                ? labelText(mid(B, M).x - 22, mid(B, M).y, getSideLabel("BM")!, parallelColor)
                : null}
              {getSideLabel("CN")
                ? labelText(mid(C, N).x + 22, mid(C, N).y, getSideLabel("CN")!, parallelColor)
                : null}
            </>
          ) : null}

          {showFormula ? (
            <text
              x={width / 2}
              y={height - 12}
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fill="#16a34a"
              stroke="white"
              strokeWidth="3"
              paintOrder="stroke"
            >
              {figure.formula ?? "AM / AN = AB / AC"}
            </text>
          ) : null}
        </svg>
      </div>
    );
  }

  const A = figure.points?.A ?? { x: 55, y: 210 };
  const B = figure.points?.B ?? { x: 285, y: 210 };
  const C = figure.points?.C ?? { x: 180, y: 35 };
  const M = figure.points?.M ?? { x: 120, y: 210 };
  const N = figure.points?.N ?? { x: 150, y: 115 };

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Configuration de Thalès dans un triangle"
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke={strokeMain}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        <line
          x1={M.x}
          y1={M.y}
          x2={N.x}
          y2={N.y}
          stroke={parallelColor}
          strokeWidth={3}
          strokeLinecap="round"
        />

        <line
          x1={A.x}
          y1={A.y}
          x2={N.x}
          y2={N.y}
          stroke={helperColor}
          strokeWidth={1.2}
          strokeDasharray="4 4"
          opacity={0.45}
        />

        {showParallelMarks ? (
          <>
            {parallelMarks(M, N, parallelColor)}
            {parallelMarks(B, C, parallelColor)}
          </>
        ) : null}

        {showPoints
          ? [A, B, C, M, N].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill={pointFill} />
            ))
          : null}

        {showLabels ? (
          <>
            {labelText(A.x - 8, A.y + 18, getLabel("A", "A"), labelFill, "end")}
            {labelText(B.x + 8, B.y + 18, getLabel("B", "B"), labelFill, "start")}
            {labelText(C.x, C.y - 10, getLabel("C", "C"), labelFill)}
            {labelText(M.x, M.y + 18, getLabel("M", "M"), labelFill)}
            {labelText(N.x - 8, N.y - 8, getLabel("N", "N"), labelFill, "end")}
          </>
        ) : null}

        {showSideLabels ? (
          <>
            {getSideLabel("AM")
              ? labelText(mid(A, M).x, A.y + 32, getSideLabel("AM")!, sideLabelFill)
              : null}

            {getSideLabel("AB")
              ? labelText(mid(A, B).x, A.y + 48, getSideLabel("AB")!, sideLabelFill)
              : null}

            {getSideLabel("AN")
              ? labelText(mid(A, N).x - 20, mid(A, N).y - 4, getSideLabel("AN")!, sideLabelFill)
              : null}

            {getSideLabel("AC")
              ? labelText(mid(A, C).x - 28, mid(A, C).y - 16, getSideLabel("AC")!, sideLabelFill)
              : null}

            {getSideLabel("MN")
              ? labelText(mid(M, N).x - 18, mid(M, N).y + 4, getSideLabel("MN")!, parallelColor)
              : null}

            {getSideLabel("BC")
              ? labelText(mid(B, C).x + 24, mid(B, C).y + 2, getSideLabel("BC")!, parallelColor)
              : null}
          </>
        ) : null}

        {showFormula ? (
          <text
            x={width / 2}
            y={height - 12}
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill="#16a34a"
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {figure.formula ?? "AM / AB = AN / AC = MN / BC"}
          </text>
        ) : null}
      </svg>
    </div>
  );
}