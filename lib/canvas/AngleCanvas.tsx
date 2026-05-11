// tutor-v4/components/AngleCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

const COULEURS = {
  angle: "#3b82f6",
  angleRight: "#ef4444",
  segment: "#0f172a",
  label: "#0f172a",
};

export default function AngleCanvas({ figure }: Props) {
  if (figure.kind !== "angle") return null;

  const width = figure.size?.width ?? 300;
  const height = figure.size?.height ?? 220;

  const angleDeg = figure.angle?.angleDeg ?? 60;

  const showLabels = figure.angle?.display?.showLabels ?? true;
  const showMeasure = figure.angle?.display?.showMeasure ?? true;
  const showArc = figure.angle?.display?.showArc ?? true;
  const showRightAngle =
    figure.angle?.display?.showRightAngle ?? angleDeg === 90;

  const placeholder = figure.angle?.display?.placeholder;

  const labels = figure.angle?.labels ?? {};

  const cx = width / 2;
  const cy = height * 0.75;
  const radius = 82;

  const angleRad = (angleDeg * Math.PI) / 180;

  const rightX = cx + radius;
  const rightY = cy;

  const leftX = cx + radius * Math.cos(-angleRad);
  const leftY = cy + radius * Math.sin(-angleRad);

  const arcRadius = 42;

  const arcStartX = cx + arcRadius;
  const arcStartY = cy;

  const arcEndX = cx + arcRadius * Math.cos(-angleRad);
  const arcEndY = cy + arcRadius * Math.sin(-angleRad);

  const labelAngle = -angleRad / 2;
  const labelX = cx + (arcRadius + 22) * Math.cos(labelAngle);
  const labelY = cy + (arcRadius + 22) * Math.sin(labelAngle);

  const angleLabel = showMeasure
    ? labels.angle ?? `${angleDeg}°`
    : placeholder;

  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure angle"
      >
        <rect x={0} y={0} width={width} height={height} rx={12} fill="white" />

        {/* Côtés de l'angle */}
        <line
          x1={cx}
          y1={cy}
          x2={rightX}
          y2={rightY}
          stroke={COULEURS.segment}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={leftX}
          y2={leftY}
          stroke={COULEURS.segment}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* Arc coloré */}
        {showArc && !showRightAngle ? (
          <path
            d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${
              angleDeg > 180 ? 1 : 0
            } 0 ${arcEndX} ${arcEndY}`}
            fill="none"
            stroke={COULEURS.angle}
            strokeWidth={4}
            strokeLinecap="round"
          />
        ) : null}

        {/* Angle droit */}
        {showRightAngle ? (
          <path
            d={`M ${cx + 24} ${cy} L ${cx + 24} ${cy - 24} L ${cx} ${
              cy - 24
            }`}
            fill="none"
            stroke={COULEURS.angleRight}
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* Sommet */}
        <circle cx={cx} cy={cy} r={4.5} fill={COULEURS.segment} />

        {/* Labels des points */}
        {showLabels ? (
          <>
            <text
              x={cx - 14}
              y={cy + 22}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.vertex ?? "O"}
            </text>

            <text
              x={rightX + 8}
              y={rightY + 5}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.right ?? "B"}
            </text>

            <text
              x={leftX - 12}
              y={leftY - 8}
              fontSize="16"
              fontWeight="900"
              fill={COULEURS.label}
              stroke="white"
              strokeWidth="2"
              paintOrder="stroke"
            >
              {labels.left ?? "A"}
            </text>
          </>
        ) : null}

        {/* Mesure ou placeholder */}
        {angleLabel && !showRightAngle ? (
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="15"
            fontWeight="900"
            fill={COULEURS.angle}
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {angleLabel}
          </text>
        ) : null}
      </svg>
    </div>
  );
}