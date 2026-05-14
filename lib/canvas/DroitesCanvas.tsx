// tutor-v4/components/DroitesCanvas.tsx
"use client";

import type { DroitesCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: DroitesCanvasData;
};

const DEFAULT_COLORS = {
  background: "#ffffff",
  grid: "#e2e8f0",
  text: "#0f172a",
  point: "#ef4444",
  intersection: "#f97316",
  rightAngle: "#ef4444",
  parallel: "#8b5cf6",
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lineLabelPosition(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  return {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 10,
  };
}

function extendLine(
  from: { x: number; y: number },
  to: { x: number; y: number },
  width: number,
  height: number
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const extension = Math.max(width, height);

  return {
    from: {
      x: from.x - ux * extension,
      y: from.y - uy * extension,
    },
    to: {
      x: to.x + ux * extension,
      y: to.y + uy * extension,
    },
  };
}

export default function DroitesCanvas({ figure }: Props) {
  if (figure.kind !== "droites") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 240;

  const colors = {
    ...DEFAULT_COLORS,
    ...(figure.colors ?? {}),
  };

  const showGrid =
    figure.display?.showGrid ?? figure.grid?.show ?? true;

  const showLabels = figure.display?.showLabels ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showIntersections = figure.display?.showIntersections ?? true;
  const showRightAngleMarkers =
    figure.display?.showRightAngleMarkers ?? true;
  const showParallelMarkers =
    figure.display?.showParallelMarkers ?? true;

  const gridRows = figure.grid?.rows ?? 6;
  const gridCols = figure.grid?.cols ?? 8;

  const gridStepX = width / gridCols;
  const gridStepY = height / gridRows;

  const lineMap = new Map(
    figure.lines.map((line) => [line.id, line])
  );

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure de droites"
      >
        <defs>
          <marker
            id="droites-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 8 3 L 0 6 Z" fill={colors.text} />
          </marker>
        </defs>

        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={14}
          fill={colors.background}
        />

        {showGrid ? (
          <>
            {Array.from({ length: gridCols + 1 }, (_, i) => {
              const x = i * gridStepX;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={height}
                  stroke={colors.grid}
                  strokeWidth={1}
                />
              );
            })}

            {Array.from({ length: gridRows + 1 }, (_, i) => {
              const y = i * gridStepY;
              return (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke={colors.grid}
                  strokeWidth={1}
                />
              );
            })}
          </>
        ) : null}

        {figure.lines.map((line) => {
          const color = line.color ?? "#2563eb";
          const strokeWidth = line.strokeWidth ?? 4;

          const shouldExtend =
            line.type === "droite" || line.display?.extend === true;

          const coords = shouldExtend
            ? extendLine(line.from, line.to, width, height)
            : {
                from: line.from,
                to: line.to,
              };

          const markerStart =
            line.type === "droite" || line.type === "demi_droite"
              ? "url(#droites-arrow)"
              : undefined;

          const markerEnd =
            line.type === "droite" || line.type === "demi_droite"
              ? "url(#droites-arrow)"
              : undefined;

          const labelPos = lineLabelPosition(line.from, line.to);

          return (
            <g key={line.id}>
              <line
                x1={coords.from.x}
                y1={coords.from.y}
                x2={coords.to.x}
                y2={coords.to.y}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={line.dashed ? "8 6" : undefined}
                markerStart={
                  line.type === "droite" ? markerStart : undefined
                }
                markerEnd={
                  line.type === "droite" || line.type === "demi_droite"
                    ? markerEnd
                    : undefined
                }
              />

              {showLabels &&
              line.label &&
              line.display?.showLabel !== false ? (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="900"
                  fill={color}
                  stroke="white"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {line.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {showParallelMarkers && figure.markers?.parallels
          ? figure.markers.parallels.map((marker, index) => {
              const lineA = lineMap.get(marker.lineA);
              const lineB = lineMap.get(marker.lineB);
              if (!lineA || !lineB) return null;

              const color = marker.color ?? colors.parallel;
              const count = marker.markCount ?? 1;

              const posA = lineLabelPosition(lineA.from, lineA.to);
              const posB = lineLabelPosition(lineB.from, lineB.to);

              return (
                <g key={`parallel-${index}`}>
                  {Array.from({ length: count }, (_, i) => (
                    <g key={`parallel-mark-${index}-${i}`}>
                      <line
                        x1={posA.x - 8 + i * 8}
                        y1={posA.y + 18}
                        x2={posA.x - 1 + i * 8}
                        y2={posA.y + 10}
                        stroke={color}
                        strokeWidth={3}
                        strokeLinecap="round"
                      />
                      <line
                        x1={posB.x - 8 + i * 8}
                        y1={posB.y + 18}
                        x2={posB.x - 1 + i * 8}
                        y2={posB.y + 10}
                        stroke={color}
                        strokeWidth={3}
                        strokeLinecap="round"
                      />
                    </g>
                  ))}
                </g>
              );
            })
          : null}

        {showRightAngleMarkers && figure.markers?.rightAngles
          ? figure.markers.rightAngles.map((marker, index) => {
              const size = marker.size ?? 22;
              const color = marker.color ?? colors.rightAngle;

              return (
                <path
                  key={`right-angle-${index}`}
                  d={`
                    M ${marker.x + size} ${marker.y}
                    L ${marker.x + size} ${marker.y - size}
                    L ${marker.x} ${marker.y - size}
                  `}
                  fill="none"
                  stroke={color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              );
            })
          : null}

        {showIntersections && figure.intersections
          ? figure.intersections.map((point, index) => {
              const color = point.color ?? colors.intersection;
              const r = point.highlight ? 10 : 7;

              return (
                <g key={`intersection-${index}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={r}
                    fill={color}
                    stroke="#0f172a"
                    strokeWidth={2}
                  />

                  {point.highlight ? (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth={3}
                      strokeDasharray="4 4"
                    />
                  ) : null}

                  {showLabels && point.label ? (
                    <text
                      x={point.x + 12}
                      y={point.y - 10}
                      fontSize="15"
                      fontWeight="900"
                      fill={colors.text}
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {point.label}
                    </text>
                  ) : null}
                </g>
              );
            })
          : null}

        {showPoints && figure.points
          ? figure.points.map((point, index) => {
              const color = point.color ?? colors.point;
              const r = point.highlight ? 9 : 7;

              return (
                <g key={`point-${point.label ?? index}`}>
                  <circle
                    cx={clamp(point.x, 0, width)}
                    cy={clamp(point.y, 0, height)}
                    r={r}
                    fill={color}
                    stroke="#0f172a"
                    strokeWidth={2}
                  />

                  {point.highlight ? (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={r + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth={3}
                      strokeDasharray="4 4"
                    />
                  ) : null}

                  {showLabels && point.label ? (
                    <text
                      x={point.x + 12}
                      y={point.y - 10}
                      fontSize="15"
                      fontWeight="900"
                      fill={colors.text}
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {point.label}
                    </text>
                  ) : null}
                </g>
              );
            })
          : null}
      </svg>
    </div>
  );
}