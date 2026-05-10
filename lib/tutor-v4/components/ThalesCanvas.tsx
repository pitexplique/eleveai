// tutor-v4/components/ThalesCanvas.tsx
"use client";

import type { ThalesCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: ThalesCanvasData;
};

type Point = { x: number; y: number };
type SideKey = "AB" | "AC" | "BC" | "AM" | "AN" | "MN" | "BM" | "CN";

function mid(P: Point, Q: Point): Point {
  return { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 };
}

function pointOnSegment(P: Point, Q: Point, t: number): Point {
  return { x: P.x + t * (Q.x - P.x), y: P.y + t * (Q.y - P.y) };
}

function labelText(
  x: number,
  y: number,
  text: string,
  color = "#0f172a",
  anchor: "start" | "middle" | "end" = "middle",
  fontSize = 13,
  strokeWidth = 3
) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={fontSize}
      fontWeight="900"
      fill={color}
      stroke="white"
      strokeWidth={strokeWidth}
      paintOrder="stroke"
    >
      {text}
    </text>
  );
}

function fractionText(
  x: number,
  y: number,
  num: string,
  den: string,
  color = "#16a34a",
  fontSize = 11,
  strokeWidth = 2
) {
  return (
    <g>
      <text
        x={x}
        y={y - 5}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="900"
        fill={color}
        stroke="white"
        strokeWidth={2.5}
        paintOrder="stroke"
      >
        {num}
      </text>
      <line
        x1={x - 13}
        y1={y}
        x2={x + 13}
        y2={y}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <text
        x={x}
        y={y + 13}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="900"
        fill={color}
        stroke="white"
        strokeWidth={2.5}
        paintOrder="stroke"
      >
        {den}
      </text>
    </g>
  );
}

function fractionFormula(
  width: number,
  y: number,
  fontSize: number,
  textStrokeWidth: number
) {
  const color = "#16a34a";

  return (
    <g aria-label="Rapports de Thalès">
      {fractionText(width / 2 - 72, y, "AM", "AB", color, fontSize)}
      {labelText(
        width / 2 - 36,
        y + 4,
        "=",
        color,
        "middle",
        fontSize + 1,
        textStrokeWidth
      )}
      {fractionText(width / 2, y, "AN", "AC", color, fontSize)}
      {labelText(
        width / 2 + 36,
        y + 4,
        "=",
        color,
        "middle",
        fontSize + 1,
        textStrokeWidth
      )}
      {fractionText(width / 2 + 72, y, "MN", "BC", color, fontSize)}
    </g>
  );
}

function parallelMarks(
  P: Point,
  Q: Point,
  color: string,
  strokeWidth = 2,
  markSize = 6
) {
  const mx = (P.x + Q.x) / 2;
  const my = (P.y + Q.y) / 2;

  return (
    <g>
      <line
        x1={mx - markSize}
        y1={my - markSize + 2}
        x2={mx + 2}
        y2={my + markSize - 2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
}

export default function ThalesCanvas({ figure }: Props) {
  if (figure.kind !== "thales") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 270;
  const isCompact = width <= 340;

  const labelFontSize = isCompact ? 12 : 13;
  const sideFontSize = isCompact ? 12 : 13;
  const formulaFontSize = isCompact ? 10.5 : 12;

  const pointRadius = isCompact ? 4.5 : 4;
  const mainStrokeWidth = isCompact ? 2.3 : 2.5;
  const parallelStrokeWidth = isCompact ? 3 : 3;
  const helperStrokeWidth = 1.2;
  const textStrokeWidth = isCompact ? 3.2 : 3;
  const markStrokeWidth = isCompact ? 1.8 : 2;
  const markSize = isCompact ? 5 : 6;

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
    const A = figure.points?.A ?? { x: 170, y: 135 };
    const B = figure.points?.B ?? { x: 55, y: 225 };
    const C = figure.points?.C ?? { x: 285, y: 55 };
    const M = figure.points?.M ?? { x: 65, y: 55 };
    const N = figure.points?.N ?? { x: 275, y: 225 };

    return (
      <div className="mx-auto w-full max-w-[390px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          aria-label="Configuration de Thalès en papillon"
        >
          {showFormula ? fractionFormula(width, 24, formulaFontSize, textStrokeWidth) : null}

          <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke={strokeMain} strokeWidth={mainStrokeWidth} />
          <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke={strokeMain} strokeWidth={mainStrokeWidth} />
          <line x1={B.x} y1={B.y} x2={M.x} y2={M.y} stroke={parallelColor} strokeWidth={parallelStrokeWidth} />
          <line x1={C.x} y1={C.y} x2={N.x} y2={N.y} stroke={parallelColor} strokeWidth={parallelStrokeWidth} />

          {showParallelMarks ? (
            <>
              {parallelMarks(B, M, parallelColor, markStrokeWidth, markSize)}
              {parallelMarks(C, N, parallelColor, markStrokeWidth, markSize)}
            </>
          ) : null}

          {showPoints
            ? [A, B, C, M, N].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={pointRadius} fill={pointFill} />
              ))
            : null}

          {showLabels ? (
            <>
              {labelText(A.x, A.y - 10, getLabel("A", "A"), labelFill, "middle", labelFontSize, textStrokeWidth)}
              {labelText(B.x - 8, B.y + 18, getLabel("B", "B"), labelFill, "end", labelFontSize, textStrokeWidth)}
              {labelText(C.x + 8, C.y - 8, getLabel("C", "C"), labelFill, "start", labelFontSize, textStrokeWidth)}
              {labelText(M.x - 8, M.y - 8, getLabel("M", "M"), labelFill, "end", labelFontSize, textStrokeWidth)}
              {labelText(N.x + 8, N.y + 18, getLabel("N", "N"), labelFill, "start", labelFontSize, textStrokeWidth)}
            </>
          ) : null}

          {showSideLabels ? (
            <>
              {getSideLabel("AB")
                ? labelText(mid(A, B).x - 12, mid(A, B).y + 10, getSideLabel("AB")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
                : null}
              {getSideLabel("AC")
                ? labelText(mid(A, C).x + 14, mid(A, C).y - 8, getSideLabel("AC")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
                : null}
              {getSideLabel("AM")
                ? labelText(mid(A, M).x - 14, mid(A, M).y - 8, getSideLabel("AM")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
                : null}
              {getSideLabel("AN")
                ? labelText(mid(A, N).x + 14, mid(A, N).y + 12, getSideLabel("AN")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
                : null}
              {getSideLabel("BM")
                ? labelText(mid(B, M).x - 22, mid(B, M).y, getSideLabel("BM")!, parallelColor, "middle", sideFontSize, textStrokeWidth)
                : null}
              {getSideLabel("CN")
                ? labelText(mid(C, N).x + 22, mid(C, N).y, getSideLabel("CN")!, parallelColor, "middle", sideFontSize, textStrokeWidth)
                : null}
            </>
          ) : null}
        </svg>
      </div>
    );
  }

  const A = figure.points?.A ?? { x: 55, y: 230 };
  const B = figure.points?.B ?? { x: 285, y: 230 };
  const C = figure.points?.C ?? { x: 180, y: 70 };
  const M = figure.points?.M ?? { x: 120, y: 230 };

  const t = B.x !== A.x ? (M.x - A.x) / (B.x - A.x) : 0.3;
  const N = figure.points?.N ?? pointOnSegment(A, C, t);

  return (
    <div className="mx-auto w-full max-w-[390px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Configuration de Thalès dans un triangle"
      >
        {showFormula ? fractionFormula(width, 24, formulaFontSize, textStrokeWidth) : null}

        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="none"
          stroke={strokeMain}
          strokeWidth={mainStrokeWidth}
          strokeLinejoin="round"
        />

        <line
          x1={M.x}
          y1={M.y}
          x2={N.x}
          y2={N.y}
          stroke={parallelColor}
          strokeWidth={parallelStrokeWidth}
          strokeLinecap="round"
        />

        <line
          x1={A.x}
          y1={A.y}
          x2={N.x}
          y2={N.y}
          stroke={helperColor}
          strokeWidth={helperStrokeWidth}
          strokeDasharray="4 4"
          opacity={0.45}
        />

        {showParallelMarks
          ? parallelMarks(M, N, parallelColor, markStrokeWidth, markSize)
          : null}

        {showPoints
          ? [A, B, C, M, N].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={pointRadius} fill={pointFill} />
            ))
          : null}

        {showLabels ? (
          <>
            {labelText(A.x - 8, A.y + 18, getLabel("A", "A"), labelFill, "end", labelFontSize, textStrokeWidth)}
            {labelText(B.x + 4, B.y + 14, getLabel("B", "B"), labelFill, "start", labelFontSize, textStrokeWidth)}
            {labelText(C.x, C.y - 10, getLabel("C", "C"), labelFill, "middle", labelFontSize, textStrokeWidth)}
            {labelText(M.x, M.y + 18, getLabel("M", "M"), labelFill, "middle", labelFontSize, textStrokeWidth)}
            {labelText(N.x - 8, N.y - 8, getLabel("N", "N"), labelFill, "end", labelFontSize, textStrokeWidth)}
          </>
        ) : null}

        {showSideLabels ? (
          <>
            {getSideLabel("AM")
              ? labelText(mid(A, M).x, A.y + 26, getSideLabel("AM")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
              : null}
            {getSideLabel("AB")
              ? labelText(mid(A, B).x, A.y + 40, getSideLabel("AB")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
              : null}
            {getSideLabel("AN")
              ? labelText(mid(A, N).x - 20, mid(A, N).y - 4, getSideLabel("AN")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
              : null}
            {getSideLabel("AC")
              ? labelText(mid(A, C).x - 28, mid(A, C).y - 16, getSideLabel("AC")!, sideLabelFill, "middle", sideFontSize, textStrokeWidth)
              : null}
            {getSideLabel("MN")
              ? labelText(mid(M, N).x - 18, mid(M, N).y + 4, getSideLabel("MN")!, parallelColor, "middle", sideFontSize, textStrokeWidth)
              : null}
            {getSideLabel("BC")
              ? labelText(mid(B, C).x + 24, mid(B, C).y + 2, getSideLabel("BC")!, parallelColor, "middle", sideFontSize, textStrokeWidth)
              : null}
          </>
        ) : null}
      </svg>
    </div>
  );
}