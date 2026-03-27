"use client";

import type {
  CanvasFigure,
  CanvasPointLabel,
  CanvasSideLabel,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type Point = { x: number; y: number };

function mid(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function norm(vx: number, vy: number) {
  const n = Math.hypot(vx, vy) || 1;
  return { x: vx / n, y: vy / n };
}

function angleSquarePath(vertex: Point, p1: Point, p2: Point, size = 12) {
  const v1x = p1.x - vertex.x;
  const v1y = p1.y - vertex.y;
  const v2x = p2.x - vertex.x;
  const v2y = p2.y - vertex.y;

  const u1 = norm(v1x, v1y);
  const u2 = norm(v2x, v2y);

  const pA = { x: vertex.x + u1.x * size, y: vertex.y + u1.y * size };
  const pB = { x: pA.x + u2.x * size, y: pA.y + u2.y * size };
  const pC = { x: vertex.x + u2.x * size, y: vertex.y + u2.y * size };

  return `M ${pA.x} ${pA.y} L ${pB.x} ${pB.y} L ${pC.x} ${pC.y}`;
}

function getSidePoints(
  side: CanvasSideLabel,
  A: Point,
  B: Point,
  C: Point
): [Point, Point] {
  switch (side) {
    case "AB":
      return [A, B];
    case "BC":
      return [B, C];
    case "CA":
      return [C, A];
  }
}

function angleArcPath(vertex: Point, p1: Point, p2: Point, radius = 16) {
  const u1 = norm(p1.x - vertex.x, p1.y - vertex.y);
  const u2 = norm(p2.x - vertex.x, p2.y - vertex.y);

  const start = { x: vertex.x + u1.x * radius, y: vertex.y + u1.y * radius };
  const end = { x: vertex.x + u2.x * radius, y: vertex.y + u2.y * radius };

  const cross = u1.x * u2.y - u1.y * u2.x;
  const sweepFlag = cross > 0 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweepFlag} ${end.x} ${end.y}`;
}

function getAngleNeighbors(
  vertexLabel: CanvasPointLabel,
  A: Point,
  B: Point,
  C: Point
): [Point, Point, Point] {
  switch (vertexLabel) {
    case "A":
      return [A, B, C];
    case "B":
      return [B, A, C];
    case "C":
      return [C, A, B];
  }
}

function labelPosition(label: CanvasPointLabel, p: Point): Point {
  switch (label) {
    case "A":
      return { x: p.x - 16, y: p.y - 8 };
    case "B":
      return { x: p.x + 8, y: p.y - 8 };
    case "C":
      return { x: p.x - 6, y: p.y - 10 };
  }
}

function angleLabelPosition(label: CanvasPointLabel, p: Point): Point {
  switch (label) {
    case "A":
      return { x: p.x + 10, y: p.y - 10 };
    case "B":
      return { x: p.x - 24, y: p.y - 10 };
    case "C":
      return { x: p.x + 10, y: p.y + 14 };
  }
}

export default function TriangleCanvas({ figure }: Props) {
  if (figure.kind !== "triangle") return null;

  const width = figure.size?.width ?? 280;
  const height = figure.size?.height ?? 240;

  const A = figure.points.A;
  const B = figure.points.B;
  const C = figure.points.C;

  const showPoints = figure.display?.showPoints ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showSides = figure.display?.showSides ?? true;
  const showAngles = figure.display?.showAngles ?? true;

  const labelA = figure.labels?.A ?? "A";
  const labelB = figure.labels?.B ?? "B";
  const labelC = figure.labels?.C ?? "C";

  const angleA = figure.angleLabels?.A;
  const angleB = figure.angleLabels?.B;
  const angleC = figure.angleLabels?.C;

  const sideAB = figure.sideLabels?.AB;
  const sideBC = figure.sideLabels?.BC;
  const sideCA = figure.sideLabels?.CA;

  const mAB = mid(A, B);
  const mBC = mid(B, C);
  const mCA = mid(C, A);

  const equalSides = figure.marks?.equalSides ?? [];
  const equalAngles = figure.marks?.equalAngles ?? [];

  const posLabelA = labelPosition("A", A);
  const posLabelB = labelPosition("B", B);
  const posLabelC = labelPosition("C", C);

  const posAngleA = angleLabelPosition("A", A);
  const posAngleB = angleLabelPosition("B", B);
  const posAngleC = angleLabelPosition("C", C);

  return (
    <div className="mx-auto w-full max-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure triangle"
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth={1.8}
        />

        {showPoints && (
          <>
            <circle cx={A.x} cy={A.y} r={3} fill="#0f172a" />
            <circle cx={B.x} cy={B.y} r={3} fill="#0f172a" />
            <circle cx={C.x} cy={C.y} r={3} fill="#0f172a" />
          </>
        )}

        {showLabels && (
          <>
            <text
              x={posLabelA.x}
              y={posLabelA.y}
              fontSize="12"
              fontWeight="700"
              fill="#0f172a"
            >
              {labelA}
            </text>
            <text
              x={posLabelB.x}
              y={posLabelB.y}
              fontSize="12"
              fontWeight="700"
              fill="#0f172a"
            >
              {labelB}
            </text>
            <text
              x={posLabelC.x}
              y={posLabelC.y}
              fontSize="12"
              fontWeight="700"
              fill="#0f172a"
            >
              {labelC}
            </text>
          </>
        )}

        {showAngles && (
          <>
            {angleA ? (
              <text
                x={posAngleA.x}
                y={posAngleA.y}
                fontSize="11"
                fill="#7c3aed"
                fontWeight="700"
              >
                {angleA}
              </text>
            ) : null}
            {angleB ? (
              <text
                x={posAngleB.x}
                y={posAngleB.y}
                fontSize="11"
                fill="#7c3aed"
                fontWeight="700"
              >
                {angleB}
              </text>
            ) : null}
            {angleC ? (
              <text
                x={posAngleC.x}
                y={posAngleC.y}
                fontSize="11"
                fill="#7c3aed"
                fontWeight="700"
              >
                {angleC}
              </text>
            ) : null}
          </>
        )}

        {showSides && (
          <>
            {sideAB ? (
              <text
                x={mAB.x}
                y={mAB.y + 14}
                textAnchor="middle"
                fontSize="11"
                fill="#0369a1"
                fontWeight="700"
              >
                {sideAB}
              </text>
            ) : null}
            {sideBC ? (
              <text
                x={mBC.x + 11}
                y={mBC.y}
                textAnchor="middle"
                fontSize="11"
                fill="#0369a1"
                fontWeight="700"
              >
                {sideBC}
              </text>
            ) : null}
            {sideCA ? (
              <text
                x={mCA.x - 11}
                y={mCA.y}
                textAnchor="middle"
                fontSize="11"
                fill="#0369a1"
                fontWeight="700"
              >
                {sideCA}
              </text>
            ) : null}
          </>
        )}

        {figure.marks?.rightAngleAt ? (
          <path
            d={
              figure.marks.rightAngleAt === "A"
                ? angleSquarePath(A, B, C)
                : figure.marks.rightAngleAt === "B"
                ? angleSquarePath(B, A, C)
                : angleSquarePath(C, A, B)
            }
            fill="none"
            stroke="#dc2626"
            strokeWidth={1.8}
          />
        ) : null}

        {equalSides.map(([s1, s2], idx) => {
          const [p1a, p1b] = getSidePoints(s1, A, B, C);
          const [p2a, p2b] = getSidePoints(s2, A, B, C);

          const m1 = mid(p1a, p1b);
          const m2 = mid(p2a, p2b);

          const tickSize = 7;

          const dx1 = p1b.x - p1a.x;
          const dy1 = p1b.y - p1a.y;
          const n1 = Math.hypot(dx1, dy1) || 1;
          const nx1 = -dy1 / n1;
          const ny1 = dx1 / n1;

          const dx2 = p2b.x - p2a.x;
          const dy2 = p2b.y - p2a.y;
          const n2 = Math.hypot(dx2, dy2) || 1;
          const nx2 = -dy2 / n2;
          const ny2 = dx2 / n2;

          return (
            <g key={`${s1}-${s2}-${idx}`} stroke="#16a34a" strokeWidth={1.8}>
              <line
                x1={m1.x - (nx1 * tickSize) / 2}
                y1={m1.y - (ny1 * tickSize) / 2}
                x2={m1.x + (nx1 * tickSize) / 2}
                y2={m1.y + (ny1 * tickSize) / 2}
              />
              <line
                x1={m2.x - (nx2 * tickSize) / 2}
                y1={m2.y - (ny2 * tickSize) / 2}
                x2={m2.x + (nx2 * tickSize) / 2}
                y2={m2.y + (ny2 * tickSize) / 2}
              />
            </g>
          );
        })}

        {equalAngles.map(([v1, v2], idx) => {
          const [vertex1, p1a, p1b] = getAngleNeighbors(v1, A, B, C);
          const [vertex2, p2a, p2b] = getAngleNeighbors(v2, A, B, C);

          const radius = 14 + idx * 2;

          return (
            <g
              key={`${v1}-${v2}-${idx}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={1.8}
            >
              <path d={angleArcPath(vertex1, p1a, p1b, radius)} />
              <path d={angleArcPath(vertex2, p2a, p2b, radius)} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}