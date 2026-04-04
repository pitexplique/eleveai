// tutor-v4/components/QuadrilatereCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type Point = { x: number; y: number };
type CanvasQuadPointLabel = "A" | "B" | "C" | "D";
type CanvasQuadSideLabel = "AB" | "BC" | "CD" | "DA" | "AC" | "BD";

function mid(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function norm(vx: number, vy: number) {
  const n = Math.hypot(vx, vy) || 1;
  return { x: vx / n, y: vy / n };
}

function angleSquarePath(vertex: Point, p1: Point, p2: Point, size = 20) {
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

function angleArcPath(vertex: Point, p1: Point, p2: Point, radius = 16) {
  const u1 = norm(p1.x - vertex.x, p1.y - vertex.y);
  const u2 = norm(p2.x - vertex.x, p2.y - vertex.y);

  const start = { x: vertex.x + u1.x * radius, y: vertex.y + u1.y * radius };
  const end = { x: vertex.x + u2.x * radius, y: vertex.y + u2.y * radius };

  const cross = u1.x * u2.y - u1.y * u2.x;
  const sweepFlag = cross > 0 ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 ${sweepFlag} ${end.x} ${end.y}`;
}

function getSidePoints(
  side: CanvasQuadSideLabel,
  A: Point,
  B: Point,
  C: Point,
  D: Point
): [Point, Point] {
  switch (side) {
    case "AB":
      return [A, B];
    case "BC":
      return [B, C];
    case "CD":
      return [C, D];
    case "DA":
      return [D, A];
    case "AC":
      return [A, C];
    case "BD":
      return [B, D];
  }
}

function getAngleNeighbors(
  vertexLabel: CanvasQuadPointLabel,
  A: Point,
  B: Point,
  C: Point,
  D: Point
): [Point, Point, Point] {
  switch (vertexLabel) {
    case "A":
      return [A, D, B];
    case "B":
      return [B, A, C];
    case "C":
      return [C, B, D];
    case "D":
      return [D, C, A];
  }
}

function labelPosition(label: CanvasQuadPointLabel, p: Point): Point {
  switch (label) {
    case "A":
      return { x: p.x - 18, y: p.y - 10 };
    case "B":
      return { x: p.x + 8, y: p.y - 10 };
    case "C":
      return { x: p.x + 8, y: p.y + 20 };
    case "D":
      return { x: p.x - 18, y: p.y + 20 };
  }
}

function angleLabelPosition(label: CanvasQuadPointLabel, p: Point): Point {
  switch (label) {
    case "A":
      return { x: p.x + 12, y: p.y - 10 };
    case "B":
      return { x: p.x - 28, y: p.y - 10 };
    case "C":
      return { x: p.x - 28, y: p.y + 24 };
    case "D":
      return { x: p.x + 12, y: p.y + 24 };
  }
}

function getTickSegment(a: Point, b: Point, tickSize = 12) {
  const m = mid(a, b);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const n = Math.hypot(dx, dy) || 1;
  const nx = -dy / n;
  const ny = dx / n;

  return {
    x1: m.x - (nx * tickSize) / 2,
    y1: m.y - (ny * tickSize) / 2,
    x2: m.x + (nx * tickSize) / 2,
    y2: m.y + (ny * tickSize) / 2,
  };
}

function getParallelMarkSegments(a: Point, b: Point, variant: 1 | 2) {
  const m = mid(a, b);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const n = Math.hypot(dx, dy) || 1;

  const ux = dx / n;
  const uy = dy / n;

  const px = -uy;
  const py = ux;

  const offset = variant === 1 ? 0 : 7;
  const markLength = 12;
  const arm = 6;

  const cx = m.x + px * offset;
  const cy = m.y + py * offset;

  const p1 = {
    x: cx - (ux * markLength) / 2 - px * arm,
    y: cy - (uy * markLength) / 2 - py * arm,
  };
  const p2 = {
    x: cx + (ux * markLength) / 2,
    y: cy + (uy * markLength) / 2,
  };
  const p3 = {
    x: cx - (ux * markLength) / 2 + px * arm,
    y: cy - (uy * markLength) / 2 + py * arm,
  };

  return { p1, p2, p3 };
}

export default function QuadrilatereCanvas({ figure }: Props) {
  if (figure.kind !== "quadrilatere") return null;

  const width = figure.size?.width ?? 300;
  const height = figure.size?.height ?? 240;

  const A = figure.points.A;
  const B = figure.points.B;
  const C = figure.points.C;
  const D = figure.points.D;

  const showPoints = figure.display?.showPoints ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showSides = figure.display?.showSides ?? true;
  const showAngles = figure.display?.showAngles ?? true;
  const showDiagonals = figure.display?.showDiagonals ?? false;

  const labelA = figure.labels?.A ?? "A";
  const labelB = figure.labels?.B ?? "B";
  const labelC = figure.labels?.C ?? "C";
  const labelD = figure.labels?.D ?? "D";

  const angleA = figure.angleLabels?.A;
  const angleB = figure.angleLabels?.B;
  const angleC = figure.angleLabels?.C;
  const angleD = figure.angleLabels?.D;

  const sideAB = figure.sideLabels?.AB;
  const sideBC = figure.sideLabels?.BC;
  const sideCD = figure.sideLabels?.CD;
  const sideDA = figure.sideLabels?.DA;
  const sideAC = figure.sideLabels?.AC;
  const sideBD = figure.sideLabels?.BD;

  const mAB = mid(A, B);
  const mBC = mid(B, C);
  const mCD = mid(C, D);
  const mDA = mid(D, A);
  const mAC = mid(A, C);
  const mBD = mid(B, D);

  const equalSides = figure.marks?.equalSides ?? [];
  const equalAngles = figure.marks?.equalAngles ?? [];
  const rightAnglesAt = figure.marks?.rightAnglesAt ?? [];
  const parallelSides = figure.marks?.parallelSides ?? [];

  const posLabelA = labelPosition("A", A);
  const posLabelB = labelPosition("B", B);
  const posLabelC = labelPosition("C", C);
  const posLabelD = labelPosition("D", D);

  const posAngleA = angleLabelPosition("A", A);
  const posAngleB = angleLabelPosition("B", B);
  const posAngleC = angleLabelPosition("C", C);
  const posAngleD = angleLabelPosition("D", D);

  return (
    <div className="mx-auto w-full max-w-[240px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure quadrilatère"
      >
        <polygon
          points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`}
          fill="#f8fafc"
          stroke="#0f172a"
          strokeWidth={2.8}
        />

        {showDiagonals && (
          <>
            <line
              x1={A.x}
              y1={A.y}
              x2={C.x}
              y2={C.y}
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
            <line
              x1={B.x}
              y1={B.y}
              x2={D.x}
              y2={D.y}
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          </>
        )}

        {showPoints && (
          <>
            <circle cx={A.x} cy={A.y} r={4.5} fill="#0f172a" />
            <circle cx={B.x} cy={B.y} r={4.5} fill="#0f172a" />
            <circle cx={C.x} cy={C.y} r={4.5} fill="#0f172a" />
            <circle cx={D.x} cy={D.y} r={4.5} fill="#0f172a" />
          </>
        )}

        {showLabels && (
          <>
            <text
              x={posLabelA.x}
              y={posLabelA.y}
              fontSize="18"
              fontWeight="900"
              fill="#0f172a"
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labelA}
            </text>
            <text
              x={posLabelB.x}
              y={posLabelB.y}
              fontSize="18"
              fontWeight="900"
              fill="#0f172a"
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labelB}
            </text>
            <text
              x={posLabelC.x}
              y={posLabelC.y}
              fontSize="18"
              fontWeight="900"
              fill="#0f172a"
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labelC}
            </text>
            <text
              x={posLabelD.x}
              y={posLabelD.y}
              fontSize="18"
              fontWeight="900"
              fill="#0f172a"
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labelD}
            </text>
          </>
        )}

        {showAngles && (
          <>
            {angleA ? (
              <g>
                <rect
                  x={posAngleA.x - 4}
                  y={posAngleA.y - 14}
                  width={34}
                  height={22}
                  rx={4}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={posAngleA.x}
                  y={posAngleA.y}
                  fontSize="16"
                  fill="#7c3aed"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {angleA}
                </text>
              </g>
            ) : null}

            {angleB ? (
              <g>
                <rect
                  x={posAngleB.x - 4}
                  y={posAngleB.y - 14}
                  width={34}
                  height={22}
                  rx={4}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={posAngleB.x}
                  y={posAngleB.y}
                  fontSize="16"
                  fill="#7c3aed"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {angleB}
                </text>
              </g>
            ) : null}

            {angleC ? (
              <g>
                <rect
                  x={posAngleC.x - 4}
                  y={posAngleC.y - 14}
                  width={34}
                  height={22}
                  rx={4}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={posAngleC.x}
                  y={posAngleC.y}
                  fontSize="16"
                  fill="#7c3aed"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {angleC}
                </text>
              </g>
            ) : null}

            {angleD ? (
              <g>
                <rect
                  x={posAngleD.x - 4}
                  y={posAngleD.y - 14}
                  width={34}
                  height={22}
                  rx={4}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={posAngleD.x}
                  y={posAngleD.y}
                  fontSize="16"
                  fill="#7c3aed"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {angleD}
                </text>
              </g>
            ) : null}
          </>
        )}

        {showSides && (
          <>
            {sideAB ? (
              <g>
                <rect
                  x={mAB.x - 22}
                  y={mAB.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mAB.x}
                  y={mAB.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideAB}
                </text>
              </g>
            ) : null}

            {sideBC ? (
              <g>
                <rect
                  x={mBC.x - 22}
                  y={mBC.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mBC.x}
                  y={mBC.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideBC}
                </text>
              </g>
            ) : null}

            {sideCD ? (
              <g>
                <rect
                  x={mCD.x - 22}
                  y={mCD.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mCD.x}
                  y={mCD.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideCD}
                </text>
              </g>
            ) : null}

            {sideDA ? (
              <g>
                <rect
                  x={mDA.x - 22}
                  y={mDA.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mDA.x}
                  y={mDA.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideDA}
                </text>
              </g>
            ) : null}

            {showDiagonals && sideAC ? (
              <g>
                <rect
                  x={mAC.x - 22}
                  y={mAC.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mAC.x}
                  y={mAC.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideAC}
                </text>
              </g>
            ) : null}

            {showDiagonals && sideBD ? (
              <g>
                <rect
                  x={mBD.x - 22}
                  y={mBD.y - 12}
                  width={44}
                  height={20}
                  rx={5}
                  fill="white"
                  opacity={0.9}
                />
                <text
                  x={mBD.x}
                  y={mBD.y + 4}
                  textAnchor="middle"
                  fontSize="15"
                  fill="#0369a1"
                  fontWeight="900"
                  stroke="white"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {sideBD}
                </text>
              </g>
            ) : null}
          </>
        )}

        {rightAnglesAt.map((vertex) => {
          const d =
            vertex === "A"
              ? angleSquarePath(A, D, B)
              : vertex === "B"
                ? angleSquarePath(B, A, C)
                : vertex === "C"
                  ? angleSquarePath(C, B, D)
                  : angleSquarePath(D, C, A);

          return (
            <path
              key={`right-${vertex}`}
              d={d}
              fill="none"
              stroke="#dc2626"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {equalSides.map(([s1, s2], idx) => {
          const [p1a, p1b] = getSidePoints(s1, A, B, C, D);
          const [p2a, p2b] = getSidePoints(s2, A, B, C, D);

          const seg1 = getTickSegment(p1a, p1b);
          const seg2 = getTickSegment(p2a, p2b);

          return (
            <g
              key={`${s1}-${s2}-${idx}`}
              stroke="#16a34a"
              strokeWidth={3}
              strokeLinecap="round"
            >
              <line
                x1={seg1.x1}
                y1={seg1.y1}
                x2={seg1.x2}
                y2={seg1.y2}
              />
              <line
                x1={seg2.x1}
                y1={seg2.y1}
                x2={seg2.x2}
                y2={seg2.y2}
              />
            </g>
          );
        })}

        {equalAngles.map(([v1, v2], idx) => {
          const [vertex1, p1a, p1b] = getAngleNeighbors(v1, A, B, C, D);
          const [vertex2, p2a, p2b] = getAngleNeighbors(v2, A, B, C, D);

          const radius = 20 + idx * 6;

          return (
            <g
              key={`${v1}-${v2}-${idx}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeLinecap="round"
            >
              <path d={angleArcPath(vertex1, p1a, p1b, radius)} />
              <path d={angleArcPath(vertex2, p2a, p2b, radius)} />
            </g>
          );
        })}

        {parallelSides.map(([s1, s2], idx) => {
          const [p1a, p1b] = getSidePoints(s1, A, B, C, D);
          const [p2a, p2b] = getSidePoints(s2, A, B, C, D);

          const variant = ((idx % 2) + 1) as 1 | 2;

          const seg1 = getParallelMarkSegments(p1a, p1b, variant);
          const seg2 = getParallelMarkSegments(p2a, p2b, variant);

          return (
            <g
              key={`${s1}-${s2}-parallel-${idx}`}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={`M ${seg1.p1.x} ${seg1.p1.y} L ${seg1.p2.x} ${seg1.p2.y} L ${seg1.p3.x} ${seg1.p3.y}`}
              />
              <path
                d={`M ${seg2.p1.x} ${seg2.p1.y} L ${seg2.p2.x} ${seg2.p2.y} L ${seg2.p3.x} ${seg2.p3.y}`}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}