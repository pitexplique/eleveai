// tutor-v4/components/QuadrilatereCanvas.tsx
"use client";

import type {
  CanvasFigure,
  QuadrilatereCanvasPointLabel,
  QuadrilatereCanvasSideLabel,
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

function angleSquarePath(vertex: Point, p1: Point, p2: Point, size = 20) {
  const u1 = norm(p1.x - vertex.x, p1.y - vertex.y);
  const u2 = norm(p2.x - vertex.x, p2.y - vertex.y);

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
  side: QuadrilatereCanvasSideLabel,
  A: Point,
  B: Point,
  C: Point,
  D: Point
): [Point, Point] {
  switch (side) {
    case "AB":
    case "BA":
      return [A, B];

    case "BC":
    case "CB":
      return [B, C];

    case "CD":
    case "DC":
      return [C, D];

    case "DA":
    case "AD":
      return [D, A];

    case "AC":
    case "CA":
      return [A, C];

    case "BD":
    case "DB":
      return [B, D];
  }
}

function getAngleNeighbors(
  vertexLabel: QuadrilatereCanvasPointLabel,
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

function labelPosition(label: QuadrilatereCanvasPointLabel, p: Point): Point {
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

function angleLabelPosition(
  label: QuadrilatereCanvasPointLabel,
  p: Point
): Point {
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

function getTickSegment(a: Point, b: Point, tickSize = 12, offset = 0) {
  const m = mid(a, b);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const n = Math.hypot(dx, dy) || 1;

  const nx = -dy / n;
  const ny = dx / n;

  const cx = m.x + nx * offset;
  const cy = m.y + ny * offset;

  return {
    x1: cx - (nx * tickSize) / 2,
    y1: cy - (ny * tickSize) / 2,
    x2: cx + (nx * tickSize) / 2,
    y2: cy + (ny * tickSize) / 2,
  };
}

function getMultipleTickSegments(
  a: Point,
  b: Point,
  tickCount: number,
  tickSize = 12,
  spacing = 7
) {
  if (tickCount <= 1) {
    return [getTickSegment(a, b, tickSize, 0)];
  }

  const segments = [];
  const startOffset = -((tickCount - 1) * spacing) / 2;

  for (let i = 0; i < tickCount; i++) {
    segments.push(getTickSegment(a, b, tickSize, startOffset + i * spacing));
  }

  return segments;
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

  return {
    p1: {
      x: cx - (ux * markLength) / 2 - px * arm,
      y: cy - (uy * markLength) / 2 - py * arm,
    },
    p2: {
      x: cx + (ux * markLength) / 2,
      y: cy + (uy * markLength) / 2,
    },
    p3: {
      x: cx - (ux * markLength) / 2 + px * arm,
      y: cy - (uy * markLength) / 2 + py * arm,
    },
  };
}

export default function QuadrilatereCanvas({ figure }: Props) {
  if (figure.kind !== "quadrilatere") return null;

  const width = figure.size?.width ?? 300;
  const height = figure.size?.height ?? 240;

  const A = figure.points.A;
  const B = figure.points.B;
  const C = figure.points.C;
  const D = figure.points.D;

  // ─── La hauteur du parallélogramme ──────────────────────────────────────────
  // Projection orthogonale du sommet sur la droite qui porte la base : même
  // calcul qu'au triangle, même raison d'être — « base × hauteur » ne veut rien
  // dire tant que la hauteur n'est pas tracée sur la figure.
  const hauteurQuad = (() => {
    const h = figure.height;
    if (!h) return null;
    const pt = (n: string) => (n === "A" ? A : n === "B" ? B : n === "C" ? C : D);
    const P = pt(h.fromVertex);
    const Q = pt(h.onSide[0]);
    const R = pt(h.onSide[1]);
    const dx = R.x - Q.x;
    const dy = R.y - Q.y;
    const len2 = dx * dx + dy * dy || 1;
    const t = ((P.x - Q.x) * dx + (P.y - Q.y) * dy) / len2;
    const pied = { x: Q.x + t * dx, y: Q.y + t * dy };
    const norme = Math.hypot(dx, dy) || 1;
    const ux = dx / norme;
    const uy = dy / norme;
    const vers = Math.hypot(P.x - pied.x, P.y - pied.y) || 1;
    const vx = (P.x - pied.x) / vers;
    const vy = (P.y - pied.y) / vers;
    const c = 11;
    const sens = t > 0.5 ? -1 : 1;
    return {
      P,
      pied,
      label: h.label,
      carre: [
        { x: pied.x + sens * c * ux, y: pied.y + sens * c * uy },
        { x: pied.x + sens * c * ux + c * vx, y: pied.y + sens * c * uy + c * vy },
        { x: pied.x + c * vx, y: pied.y + c * vy },
      ],
      prolonge: t < 0 || t > 1 ? [t < 0 ? Q : R, pied] : null,
    };
  })();

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

  const sideAB = figure.sideLabels?.AB ?? figure.sideLabels?.BA;
  const sideBC = figure.sideLabels?.BC ?? figure.sideLabels?.CB;
  const sideCD = figure.sideLabels?.CD ?? figure.sideLabels?.DC;
  const sideDA = figure.sideLabels?.DA ?? figure.sideLabels?.AD;
  const sideAC = figure.sideLabels?.AC ?? figure.sideLabels?.CA;
  const sideBD = figure.sideLabels?.BD ?? figure.sideLabels?.DB;

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

        {hauteurQuad ? (
          <g>
            {hauteurQuad.prolonge ? (
              <line
                x1={hauteurQuad.prolonge[0].x}
                y1={hauteurQuad.prolonge[0].y}
                x2={hauteurQuad.prolonge[1].x}
                y2={hauteurQuad.prolonge[1].y}
                stroke="#94a3b8"
                strokeWidth={1.6}
                strokeDasharray="4 3"
              />
            ) : null}
            <line
              x1={hauteurQuad.P.x}
              y1={hauteurQuad.P.y}
              x2={hauteurQuad.pied.x}
              y2={hauteurQuad.pied.y}
              stroke="#7c3aed"
              strokeWidth={2.6}
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
            <polyline
              points={hauteurQuad.carre.map((p) => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke="#7c3aed"
              strokeWidth={2}
            />
            {hauteurQuad.label ? (
              <text
                x={(hauteurQuad.P.x + hauteurQuad.pied.x) / 2 + 8}
                y={(hauteurQuad.P.y + hauteurQuad.pied.y) / 2}
                fontSize="13"
                fontWeight="900"
                fill="#7c3aed"
                stroke="white"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {hauteurQuad.label}
              </text>
            ) : null}
          </g>
        ) : null}

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
            {[A, B, C, D].map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4.5} fill="#0f172a" />
            ))}
          </>
        )}

        {showLabels && (
          <>
            <text x={posLabelA.x} y={posLabelA.y} fontSize="18" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="2" paintOrder="stroke">{labelA}</text>
            <text x={posLabelB.x} y={posLabelB.y} fontSize="18" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="2" paintOrder="stroke">{labelB}</text>
            <text x={posLabelC.x} y={posLabelC.y} fontSize="18" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="2" paintOrder="stroke">{labelC}</text>
            <text x={posLabelD.x} y={posLabelD.y} fontSize="18" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="2" paintOrder="stroke">{labelD}</text>
          </>
        )}

        {showAngles && (
          <>
            {angleA && (
              <text x={posAngleA.x} y={posAngleA.y} fontSize="16" fill="#7c3aed" fontWeight="900" stroke="white" strokeWidth="2" paintOrder="stroke">{angleA}</text>
            )}
            {angleB && (
              <text x={posAngleB.x} y={posAngleB.y} fontSize="16" fill="#7c3aed" fontWeight="900" stroke="white" strokeWidth="2" paintOrder="stroke">{angleB}</text>
            )}
            {angleC && (
              <text x={posAngleC.x} y={posAngleC.y} fontSize="16" fill="#7c3aed" fontWeight="900" stroke="white" strokeWidth="2" paintOrder="stroke">{angleC}</text>
            )}
            {angleD && (
              <text x={posAngleD.x} y={posAngleD.y} fontSize="16" fill="#7c3aed" fontWeight="900" stroke="white" strokeWidth="2" paintOrder="stroke">{angleD}</text>
            )}
          </>
        )}

        {showSides && (
          <>
            {sideAB && <SideLabel point={mAB} label={sideAB} />}
            {sideBC && <SideLabel point={mBC} label={sideBC} />}
            {sideCD && <SideLabel point={mCD} label={sideCD} />}
            {sideDA && <SideLabel point={mDA} label={sideDA} />}
            {showDiagonals && sideAC && <SideLabel point={mAC} label={sideAC} />}
            {showDiagonals && sideBD && <SideLabel point={mBD} label={sideBD} />}
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

          const segs1 = getMultipleTickSegments(p1a, p1b, idx + 1);
          const segs2 = getMultipleTickSegments(p2a, p2b, idx + 1);

          return (
            <g key={`${s1}-${s2}-${idx}`} stroke="#16a34a" strokeWidth={3} strokeLinecap="round">
              {[...segs1, ...segs2].map((seg, i) => (
                <line key={i} x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2} />
              ))}
            </g>
          );
        })}

        {equalAngles.map(([v1, v2], idx) => {
          const [vertex1, p1a, p1b] = getAngleNeighbors(v1, A, B, C, D);
          const [vertex2, p2a, p2b] = getAngleNeighbors(v2, A, B, C, D);
          const radius = 20 + idx * 6;

          return (
            <g key={`${v1}-${v2}-${idx}`} fill="none" stroke="#f59e0b" strokeWidth={3} strokeLinecap="round">
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
            <g key={`${s1}-${s2}-parallel-${idx}`} fill="none" stroke="#8b5cf6" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d={`M ${seg1.p1.x} ${seg1.p1.y} L ${seg1.p2.x} ${seg1.p2.y} L ${seg1.p3.x} ${seg1.p3.y}`} />
              <path d={`M ${seg2.p1.x} ${seg2.p1.y} L ${seg2.p2.x} ${seg2.p2.y} L ${seg2.p3.x} ${seg2.p3.y}`} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SideLabel({ point, label }: { point: Point; label: string }) {
  return (
    <g>
      <rect
        x={point.x - 24}
        y={point.y - 13}
        width={48}
        height={22}
        rx={5}
        fill="white"
        opacity={0.9}
      />
      <text
        x={point.x}
        y={point.y + 4}
        textAnchor="middle"
        fontSize="15"
        fill="#0369a1"
        fontWeight="900"
        stroke="white"
        strokeWidth="2"
        paintOrder="stroke"
      >
        {label}
      </text>
    </g>
  );
}