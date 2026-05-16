// tutor-v4/components/StatGraphCanvas.tsx
"use client";

import type { StatGraphCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: StatGraphCanvasData;
};

const DEFAULT_COLORS = [
  "#94a3b8",
  "#cbd5e1",
  "#e2e8f0",
  "#d1d5db",
  "#e5e7eb",
  "#f1f5f9",
];

function getColor(index: number, color?: string) {
  return color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

export default function StatGraphCanvas({ figure }: Props) {
  if (figure.kind !== "stat_graph") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 220;

  const data = figure.data ?? [];
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((sum, d) => sum + d.value, 0);

  const showLabels = figure.display?.showLabels ?? true;
  const showValues = figure.display?.showValues ?? true;
  const highlightIndex = figure.display?.highlightIndex;

  const axisBottom = height - 32;
  const topPadding = 24;
  const usableHeight = axisBottom - topPadding;

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      {figure.title ? (
        <p className="mb-2 text-center text-sm font-bold text-slate-800">
          {figure.title}
        </p>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Graphique statistique"
      >
        <rect x={0} y={0} width={width} height={height} rx={12} fill="white" />

        {(figure.graphType === "barres" || figure.graphType === "batons") && (
          <>
            <line
              x1={28}
              y1={axisBottom}
              x2={width - 12}
              y2={axisBottom}
              stroke="#0f172a"
              strokeWidth={2}
            />
            <line
              x1={28}
              y1={axisBottom}
              x2={28}
              y2={topPadding}
              stroke="#0f172a"
              strokeWidth={2}
            />
          </>
        )}

        {figure.graphType === "barres" &&
          data.map((d, i) => {
            const slot = (width - 48) / data.length;
            const barWidth = Math.max(22, slot * 0.62);
            const x = 34 + i * slot + (slot - barWidth) / 2;
            const barHeight = (d.value / max) * usableHeight;
            const y = axisBottom - barHeight;
            const active = highlightIndex === i;

            return (
              <g key={`${d.label}-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={5}
                  fill={getColor(i, d.color)}
                  stroke={active ? "#f59e0b" : "#334155"}
                  strokeWidth={active ? 3 : 1.5}
                />

                {showValues && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 7}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="900"
                    fill="#0f172a"
                    stroke="white"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {d.value}
                  </text>
                )}

                {showLabels && (
                  <text
                    x={x + barWidth / 2}
                    y={axisBottom + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}

        {figure.graphType === "batons" &&
          data.map((d, i) => {
            const slot = (width - 48) / data.length;
            const x = 34 + i * slot + slot / 2;
            const y = axisBottom - (d.value / max) * usableHeight;
            const active = highlightIndex === i;

            return (
              <g key={`${d.label}-${i}`}>
                <line
                  x1={x}
                  y1={axisBottom}
                  x2={x}
                  y2={y}
                  stroke={getColor(i, d.color)}
                  strokeWidth={active ? 6 : 4}
                  strokeLinecap="round"
                />

                <circle
                  cx={x}
                  cy={y}
                  r={active ? 6 : 4.5}
                  fill={getColor(i, d.color)}
                  stroke="#0f172a"
                  strokeWidth={1.5}
                />

                {showValues && (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="900"
                    fill="#0f172a"
                    stroke="white"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {d.value}
                  </text>
                )}

                {showLabels && (
                  <text
                    x={x}
                    y={axisBottom + 20}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="800"
                    fill="#0f172a"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}

        {figure.graphType === "camembert" && total > 0
          ? (() => {
              const cx = width / 2;
              const cy = height / 2 - 4;
              const r = Math.min(width, height) * 0.32;
              let startAngle = -Math.PI / 2;

              return (
                <>
                  {data.map((d, i) => {
                    const angle = (d.value / total) * Math.PI * 2;
                    const endAngle = startAngle + angle;

                    const start = polarToCartesian(cx, cy, r, startAngle);
                    const end = polarToCartesian(cx, cy, r, endAngle);
                    const largeArc = angle > Math.PI ? 1 : 0;
                    const active = highlightIndex === i;

                    const labelAngle = startAngle + angle / 2;
                    const labelPoint = polarToCartesian(cx, cy, r * 0.64, labelAngle);

                    const path = [
                      `M ${cx} ${cy}`,
                      `L ${start.x} ${start.y}`,
                      `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
                      "Z",
                    ].join(" ");

                    startAngle = endAngle;

                    return (
                      <g key={`${d.label}-${i}`}>
                        <path
                          d={path}
                          fill={getColor(i, d.color)}
                          stroke={active ? "#f59e0b" : "white"}
                          strokeWidth={active ? 4 : 2}
                        />

                        {showLabels && (
                          <text
                            x={labelPoint.x}
                            y={labelPoint.y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#0f172a"
                            stroke="white"
                            strokeWidth="2"
                            paintOrder="stroke"
                          >
                            {d.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {showValues && (
                    <text
                      x={cx}
                      y={height - 12}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="800"
                      fill="#475569"
                    >
                      total : {total}
                    </text>
                  )}
                </>
              );
            })()
          : null}
      </svg>
    </div>
  );
}