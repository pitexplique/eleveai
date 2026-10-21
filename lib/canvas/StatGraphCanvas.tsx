// lib/canvas/StatGraphCanvas.tsx
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

// Le camembert en gris ne se lisait pas (20/10/2026) : six gris voisins, et
// l'œil ne retrouve plus quelle part est laquelle. Des teintes franches et claires.
const PIE_COLORS = [
  "#93c5fd",
  "#fcd34d",
  "#6ee7b7",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#5eead4",
  "#f9a8d4",
];

const BLEU = "#2563eb";

function getColor(index: number, color?: string) {
  return color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
}

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

/** Un pas rond (1, 2, 5 × 10^k) qui donne environ 5 graduations. */
function pasRond(etendue: number) {
  const brut = Math.max(etendue, 1e-9) / 5;
  const p = 10 ** Math.floor(Math.log10(brut));
  for (const m of [1, 2, 5, 10]) if (m * p >= brut) return m * p;
  return 10 * p;
}

/** Écriture française d'un nombre : virgule, espace des milliers. */
function fr(n: number) {
  return n.toLocaleString("fr-FR", { maximumFractionDigits: 2 }).replace(/ | /g, " ");
}

/**
 * Des pourcentages arrondis à l'unité dont la SOMME fait 100 (méthode du plus
 * fort reste) : un camembert qui afficherait 33 + 33 + 33 = 99 % serait faux
 * aux yeux d'un statisticien, et d'un élève attentif.
 */
function pourcentagesEntiers(valeurs: number[]) {
  const total = valeurs.reduce((s, v) => s + v, 0);
  if (total <= 0) return valeurs.map(() => 0);
  const exacts = valeurs.map((v) => (v / total) * 100);
  const bas = exacts.map(Math.floor);
  let reste = 100 - bas.reduce((s, v) => s + v, 0);
  const ordre = exacts.map((e, i) => [e - Math.floor(e), i] as const).sort((a, b) => b[0] - a[0]);
  for (const [, i] of ordre) {
    if (reste <= 0) break;
    bas[i] += 1;
    reste -= 1;
  }
  return bas;
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
  const showAxis = figure.display?.showAxis ?? false;
  const axeY = figure.display?.axeY;

  const type = figure.graphType;
  const axes = type !== "camembert";

  // L'axe vertical : de yMin à un sommet rond.
  const yMin = figure.display?.yMin ?? 0;
  const step = figure.display?.step ?? pasRond(max - yMin);
  const yTop = showAxis ? Math.max(yMin + step, Math.ceil(max / step) * step) : max;
  const graduations: number[] = [];
  if (showAxis) for (let v = yMin; v <= yTop + step / 1000; v += step) graduations.push(v);

  const axisBottom = height - 32;
  const topPadding = axeY ? 34 : 24;
  const usableHeight = axisBottom - topPadding;
  // Les chiffres des graduations ont besoin de place à gauche.
  const longueur = Math.max(1, ...graduations.map((g) => fr(g).length));
  const axisLeft = showAxis ? 16 + longueur * 7 : 28;
  const plotLeft = axisLeft + 6;
  const plotWidth = width - 12 - plotLeft;

  const yOf = (v: number) =>
    axisBottom - (Math.max(0, Math.min(v, yTop) - yMin) / Math.max(1e-9, yTop - yMin)) * usableHeight;

  const slot = plotWidth / Math.max(1, data.length);
  const valueText = (x: number, y: number, v: number, dy = 7) =>
    showValues ? (
      <text
        x={x}
        y={y - dy}
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill="#0f172a"
        stroke="white"
        strokeWidth="2"
        paintOrder="stroke"
      >
        {fr(v)}
      </text>
    ) : null;
  const labelText = (x: number, d: string) =>
    showLabels ? (
      <text x={x} y={axisBottom + 20} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
        {d}
      </text>
    ) : null;

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

        {axes && showAxis &&
          graduations.map((g) => (
            <g key={`g-${g}`}>
              <line x1={axisLeft} y1={yOf(g)} x2={width - 12} y2={yOf(g)} stroke="#e2e8f0" strokeWidth={1} />
              <line x1={axisLeft - 4} y1={yOf(g)} x2={axisLeft} y2={yOf(g)} stroke="#0f172a" strokeWidth={1.5} />
              <text x={axisLeft - 7} y={yOf(g) + 4} textAnchor="end" fontSize="12" fontWeight="700" fill="#334155">
                {fr(g)}
              </text>
            </g>
          ))}

        {axes && (
          <>
            <line x1={axisLeft} y1={axisBottom} x2={width - 12} y2={axisBottom} stroke="#0f172a" strokeWidth={2} />
            <line x1={axisLeft} y1={axisBottom} x2={axisLeft} y2={topPadding - 6} stroke="#0f172a" strokeWidth={2} />
            {axeY ? (
              <text x={axisLeft - 4} y={14} textAnchor="start" fontSize="11" fontWeight="700" fill="#475569">
                {axeY}
              </text>
            ) : null}
          </>
        )}

        {type === "barres" &&
          data.map((d, i) => {
            const barWidth = Math.max(22, slot * 0.62);
            const x = plotLeft + i * slot + (slot - barWidth) / 2;
            const y = yOf(d.value);
            const active = highlightIndex === i;

            return (
              <g key={`${d.label}-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={axisBottom - y}
                  rx={5}
                  fill={getColor(i, d.color)}
                  stroke={active ? "#f59e0b" : "#334155"}
                  strokeWidth={active ? 3 : 1.5}
                />
                {valueText(x + barWidth / 2, y, d.value)}
                {labelText(x + barWidth / 2, d.label)}
              </g>
            );
          })}

        {type === "histogramme" &&
          data.map((d, i) => {
            // Barres JOINTIVES : les classes se suivent sans trou.
            const x = plotLeft + i * slot;
            const y = yOf(d.value);
            const active = highlightIndex === i;
            const bornes = figure.bornes;

            return (
              <g key={`${d.label}-${i}`}>
                <rect
                  x={x}
                  y={y}
                  width={slot}
                  height={axisBottom - y}
                  fill={d.color ?? "#bfdbfe"}
                  stroke={active ? "#f59e0b" : "#1e3a8a"}
                  strokeWidth={active ? 3 : 1.5}
                />
                {valueText(x + slot / 2, y, d.value)}
                {showLabels && bornes && bornes.length === data.length + 1 ? (
                  <>
                    {i === 0 ? (
                      <text x={x} y={axisBottom + 18} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                        {fr(bornes[0])}
                      </text>
                    ) : null}
                    <text x={x + slot} y={axisBottom + 18} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">
                      {fr(bornes[i + 1])}
                    </text>
                  </>
                ) : (
                  labelText(x + slot / 2, d.label)
                )}
              </g>
            );
          })}

        {type === "batons" &&
          data.map((d, i) => {
            const x = plotLeft + i * slot + slot / 2;
            const y = yOf(d.value);
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
                {valueText(x, y, d.value, 10)}
                {labelText(x, d.label)}
              </g>
            );
          })}

        {type === "courbe" && data.length > 0 && (
          <>
            <polyline
              points={data.map((d, i) => `${plotLeft + i * slot + slot / 2},${yOf(d.value)}`).join(" ")}
              fill="none"
              stroke={BLEU}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            {data.map((d, i) => {
              const x = plotLeft + i * slot + slot / 2;
              const y = yOf(d.value);
              const active = highlightIndex === i;
              return (
                <g key={`${d.label}-${i}`}>
                  {active ? (
                    <line x1={x} y1={y} x2={x} y2={axisBottom} stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" />
                  ) : null}
                  <circle cx={x} cy={y} r={active ? 6 : 4} fill={active ? "#f59e0b" : BLEU} stroke="white" strokeWidth={1.5} />
                  {valueText(x, y, d.value, 10)}
                  {labelText(x, d.label)}
                </g>
              );
            })}
          </>
        )}

        {type === "camembert" && total > 0
          ? (() => {
              const cx = width / 2;
              const cy = height / 2 - 4;
              const r = Math.min(width, height) * 0.32;
              let startAngle = -Math.PI / 2;
              const parts = pourcentagesEntiers(data.map((d) => d.value));
              const parPart = figure.display?.valeursParts ?? false;
              const enPourcent = parPart && (figure.display?.pourcentages ?? false);

              return (
                <>
                  {data.map((d, i) => {
                    const angle = (d.value / total) * Math.PI * 2;
                    const endAngle = startAngle + angle;

                    const start = polarToCartesian(cx, cy, r, startAngle);
                    const end = polarToCartesian(cx, cy, r, endAngle);
                    const largeArc = angle > Math.PI ? 1 : 0;
                    const active = highlightIndex === i;

                    // Une petite part écrit son nom DEHORS : dedans, il débordait.
                    // Un nom long déborde plus tôt : on lui demande un secteur plus large.
                    const petite = angle < (parPart ? 0.75 : 0.55) + Math.max(0, d.label.length - 4) * 0.2;
                    const labelAngle = startAngle + angle / 2;
                    const labelPoint = polarToCartesian(cx, cy, petite ? r + 16 : r * 0.62, labelAngle);
                    const ancre = petite ? (Math.cos(labelAngle) >= 0 ? "start" : "end") : "middle";

                    const path =
                      data.length === 1
                        ? `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`
                        : [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`, "Z"].join(" ");

                    startAngle = endAngle;
                    const valeur = enPourcent ? `${parts[i]} %` : fr(d.value);

                    return (
                      <g key={`${d.label}-${i}`}>
                        <path
                          d={path}
                          fill={d.color ?? PIE_COLORS[i % PIE_COLORS.length]}
                          stroke={active ? "#f59e0b" : "white"}
                          strokeWidth={active ? 4 : 2}
                        />
                        {showLabels || parPart ? (
                          <text
                            x={labelPoint.x}
                            y={labelPoint.y}
                            textAnchor={ancre}
                            dominantBaseline="middle"
                            fontSize="12"
                            fontWeight="900"
                            fill="#0f172a"
                            stroke="white"
                            strokeWidth="2"
                            paintOrder="stroke"
                          >
                            {showLabels ? d.label : null}
                            {showLabels && parPart ? (
                              <tspan x={labelPoint.x} dy="14" fontWeight="800">
                                {valeur}
                              </tspan>
                            ) : parPart ? (
                              valeur
                            ) : null}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}

                  {showValues && !enPourcent && (
                    <text x={cx} y={height - 8} textAnchor="middle" fontSize="12" fontWeight="800" fill="#475569">
                      total : {fr(total)}
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
