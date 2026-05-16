// tutor-v4/components/SchemaBarreCanvas.tsx
"use client";

import type { CanvasFigure, SchemaBarreCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

const DEFAULT_COLORS = [
  "#dbeafe", // bleu clair
  "#dcfce7", // vert clair
  "#fef3c7", // jaune clair
  "#fce7f3", // rose clair
  "#ede9fe", // violet clair
];

function isSchemaBarreCanvas(
  figure: CanvasFigure
): figure is SchemaBarreCanvasData {
  return figure.kind === "schema_barre";
}

function getColor(index: number, color?: string) {
  return color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

export default function SchemaBarreCanvas({ figure }: Props) {
  if (!isSchemaBarreCanvas(figure)) return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 190;

  const parts = figure.parts ?? [];

  const showTotal = figure.display?.showTotal ?? true;
  const showPartLabels = figure.display?.showPartLabels ?? true;
  const showValues = figure.display?.showValues ?? true;
  const showQuestion = figure.display?.showQuestion ?? true;

  const barX = 24;
  const barY = 74;
  const barHeight = 46;
  const barWidth = width - 48;

  const titleY = 24;
  const totalY = 58;
  const labelY = barY + barHeight + 24;

  const partCount = Math.max(1, parts.length);
  const partWidth = barWidth / partCount;

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Schéma en barres"
      >
        <rect x={0} y={0} width={width} height={height} rx={14} fill="white" />

        {figure.title ? (
          <text
            x={width / 2}
            y={titleY}
            textAnchor="middle"
            fontSize="15"
            fontWeight="900"
            fill="#0f172a"
          >
            {figure.title}
          </text>
        ) : null}

        {showTotal && figure.total ? (
          <g>
            <line
              x1={barX}
              y1={totalY}
              x2={barX + barWidth}
              y2={totalY}
              stroke="#0f172a"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={barX}
              y1={totalY - 6}
              x2={barX}
              y2={totalY + 6}
              stroke="#0f172a"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={barX + barWidth}
              y1={totalY - 6}
              x2={barX + barWidth}
              y2={totalY + 6}
              stroke="#0f172a"
              strokeWidth={2}
              strokeLinecap="round"
            />

            <rect
              x={width / 2 - 34}
              y={totalY - 17}
              width={68}
              height={22}
              rx={6}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth={1}
            />

            <text
              x={width / 2}
              y={totalY - 2}
              textAnchor="middle"
              fontSize="14"
              fontWeight="900"
              fill="#0f172a"
            >
              {figure.total}
            </text>
          </g>
        ) : null}

        {parts.map((part, index) => {
          const x = barX + index * partWidth;
          const fill = part.unknown ? "#fee2e2" : getColor(index, part.color);
          const stroke = part.unknown ? "#dc2626" : "#334155";

          return (
            <g key={`${part.label}-${index}`}>
              <rect
                x={x}
                y={barY}
                width={partWidth}
                height={barHeight}
                fill={fill}
                stroke={stroke}
                strokeWidth={2}
                rx={index === 0 || index === partCount - 1 ? 8 : 0}
              />

              {part.unknown ? (
                <text
                  x={x + partWidth / 2}
                  y={barY + 30}
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="900"
                  fill="#dc2626"
                  stroke="white"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  ?
                </text>
              ) : showValues && part.value ? (
                <text
                  x={x + partWidth / 2}
                  y={barY + 30}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="900"
                  fill="#0f172a"
                  stroke="white"
                  strokeWidth="3"
                  paintOrder="stroke"
                >
                  {part.value}
                </text>
              ) : null}

              {showPartLabels ? (
                <text
                  x={x + partWidth / 2}
                  y={labelY}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="800"
                  fill="#334155"
                >
                  {part.label}
                </text>
              ) : null}
            </g>
          );
        })}

        {showQuestion && figure.questionLabel ? (
          <text
            x={width / 2}
            y={height - 18}
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fill="#475569"
          >
            {figure.questionLabel}
          </text>
        ) : null}
      </svg>
    </div>
  );
}