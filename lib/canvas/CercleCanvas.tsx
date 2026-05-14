// tutor-v4/components/CercleCanvas.tsx
"use client";

import type {
  CercleCanvasData,
  CercleCanvasPoint,
  CercleCanvasPointLabel,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CercleCanvasData;
};

const DEFAULT_COLORS = {
  background: "#ffffff",
  circle: "#2563eb",      // bleu : contour du cercle
  disk: "#dbeafe",        // bleu clair : disque
  center: "#ef4444",      // rouge : centre
  radius: "#16a34a",      // vert : rayon
  diameter: "#f97316",    // orange : diamètre
  chord: "#8b5cf6",       // violet : corde
  arc: "#eab308",         // jaune : arc
  point: "#0f172a",       // noir : points
  text: "#0f172a",
  highlight: "#facc15",   // jaune : surlignage
};

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const angleRad = (angleDeg * Math.PI) / 180;

  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);

  const diff = Math.abs(endAngle - startAngle);
  const largeArcFlag = diff > 180 ? 1 : 0;

  return [
    `M ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
  ].join(" ");
}

function getPoint(
  points: CercleCanvasPoint[],
  id: CercleCanvasPointLabel
): CercleCanvasPoint | undefined {
  return points.find((p) => p.id === id);
}

function segmentColor(
  kind: string,
  colors: typeof DEFAULT_COLORS,
  customColor?: string
) {
  if (customColor) return customColor;
  if (kind === "rayon") return colors.radius;
  if (kind === "diametre") return colors.diameter;
  if (kind === "corde") return colors.chord;
  return colors.point;
}

export default function CercleCanvas({ figure }: Props) {
  if (figure.kind !== "cercle") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 260;

  const colors = {
    ...DEFAULT_COLORS,
    ...(figure.colors ?? {}),
  };

  const cx = figure.circle?.cx ?? width / 2;
  const cy = figure.circle?.cy ?? height / 2;
  const r = figure.circle?.r ?? 85;

  const showLabels = figure.display?.showLabels ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showDisk =
    figure.display?.showDisk ?? figure.circle?.showDisk ?? false;
  const showCircle = figure.circle?.showCircle ?? true;

  const points = figure.points ?? [
    {
      id: "O",
      x: cx,
      y: cy,
      label: "O",
      color: colors.center,
      highlight: true,
    },
    {
      id: "A",
      x: cx + r,
      y: cy,
      label: "A",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure cercle"
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={14}
          fill={colors.background}
        />

        {showDisk ? (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={colors.disk}
            stroke="none"
          />
        ) : null}

        {showCircle ? (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={colors.circle}
            strokeWidth={4}
          />
        ) : null}

        {figure.arcs?.map((arc) => {
          const color = arc.color ?? colors.arc;
          const arcPath = describeArc(cx, cy, r + 2, arc.startAngle, arc.endAngle);

          const midAngle = (arc.startAngle + arc.endAngle) / 2;
          const labelPoint = polarToCartesian(cx, cy, r + 22, midAngle);

          return (
            <g key={arc.id}>
              <path
                d={arcPath}
                fill="none"
                stroke={color}
                strokeWidth={arc.highlight ? 8 : 5}
                strokeLinecap="round"
              />

              {showLabels && arc.label ? (
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill={colors.text}
                  stroke="white"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {arc.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {figure.segments?.map((segment) => {
          const from = getPoint(points, segment.from);
          const to = getPoint(points, segment.to);

          if (!from || !to) return null;

          const color = segmentColor(segment.kind, colors, segment.color);
          const midX = (from.x + to.x) / 2;
          const midY = (from.y + to.y) / 2;

          return (
            <g key={segment.id}>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={color}
                strokeWidth={segment.highlight ? 7 : 5}
                strokeLinecap="round"
                strokeDasharray={segment.dashed ? "8 6" : undefined}
              />

              {segment.highlight ? (
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={colors.highlight}
                  strokeWidth={11}
                  strokeLinecap="round"
                  opacity={0.28}
                />
              ) : null}

              {showLabels && segment.label ? (
                <text
                  x={midX}
                  y={midY - 12}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill={color}
                  stroke="white"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {segment.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {showPoints
          ? points.map((point) => {
              const isCenter = point.id === "O";
              const color = point.color ?? (isCenter ? colors.center : colors.point);
              const radius = point.highlight ? 8 : 6;

              return (
                <g key={point.id}>
                  {point.highlight ? (
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={radius + 6}
                      fill="none"
                      stroke={colors.highlight}
                      strokeWidth={4}
                      opacity={0.85}
                    />
                  ) : null}

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius}
                    fill={color}
                    stroke="#0f172a"
                    strokeWidth={2}
                  />

                  {showLabels && (point.label ?? point.id) ? (
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
                      {point.label ?? point.id}
                    </text>
                  ) : null}
                </g>
              );
            })
          : null}

        {figure.circle?.label && showLabels ? (
          <text
            x={cx}
            y={height - 16}
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill={colors.circle}
            stroke="white"
            strokeWidth={3}
            paintOrder="stroke"
          >
            {figure.circle.label}
          </text>
        ) : null}
      </svg>
    </div>
  );
}