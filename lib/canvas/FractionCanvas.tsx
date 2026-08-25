// tutor-v4/components/FractionCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type FractionModel = "bar" | "circle" | "grid" | "compare";

type FractionPart = {
  numerator: number;
  denominator: number;
  label?: string;
  color?: string;
};

export type FractionCanvasData = {
  kind: "fraction";
  model?: FractionModel;
  fraction?: FractionPart;
  fractions?: FractionPart[];
  grid?: {
    rows: number;
    cols: number;
    shaded: number;
  };
  display?: {
    showLabel?: boolean;
    showFraction?: boolean;
    showParts?: boolean;
    unequalParts?: boolean;
  };
  size?: {
    width?: number;
    height?: number;
  };
};

const BLUE = "#38bdf8";
const RED = "#ef4444";
const BORDER = "#0f172a";
const EMPTY = "#f8fafc";

function isFractionCanvas(figure: CanvasFigure): figure is FractionCanvasData {
  return figure.kind === "fraction";
}

function fracText(f: FractionPart) {
  return `${f.numerator}/${f.denominator}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function BarFraction({
  f,
  width,
  y,
  unequalParts,
  showFraction,
}: {
  f: FractionPart;
  width: number;
  y: number;
  unequalParts?: boolean;
  showFraction?: boolean;
}) {
  const x = 24;
  const barW = width - 48;
  const h = 42;
  const den = Math.max(1, f.denominator);
  const num = clamp(f.numerator, 0, den);

  return (
    <g>
      {Array.from({ length: den }, (_, i) => {
        const partW = unequalParts
          ? (barW / den) * (i % 2 === 0 ? 0.82 : 1.18)
          : barW / den;

        const normalX = x + i * (barW / den);
        const fill = i < num ? f.color ?? BLUE : EMPTY;

        return (
          <rect
            key={i}
            x={normalX}
            y={y}
            width={unequalParts ? partW : barW / den}
            height={h}
            fill={fill}
            stroke={BORDER}
            strokeWidth={2}
          />
        );
      })}

      {showFraction !== false ? (
        <text
          x={width / 2}
          y={y + h + 28}
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill={BORDER}
        >
          {f.label ?? fracText(f)}
        </text>
      ) : null}
    </g>
  );
}

function CircleFraction({
  f,
  width,
  height,
  showFraction,
}: {
  f: FractionPart;
  width: number;
  height: number;
  showFraction?: boolean;
}) {
  const cx = width / 2;
  const cy = height / 2 - 8;
  const r = 70;
  const den = Math.max(1, f.denominator);
  const num = clamp(f.numerator, 0, den);
  const angle = (2 * Math.PI) / den;

  return (
    <g>
      {Array.from({ length: den }, (_, i) => {
        const start = -Math.PI / 2 + i * angle;
        const end = start + angle;
        const x1 = cx + r * Math.cos(start);
        const y1 = cy + r * Math.sin(start);
        const x2 = cx + r * Math.cos(end);
        const y2 = cy + r * Math.sin(end);
        const largeArc = angle > Math.PI ? 1 : 0;

        const d = `
          M ${cx} ${cy}
          L ${x1} ${y1}
          A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
          Z
        `;

        return (
          <path
            key={i}
            d={d}
            fill={i < num ? f.color ?? BLUE : EMPTY}
            stroke={BORDER}
            strokeWidth={2}
          />
        );
      })}

      {showFraction !== false ? (
        <text
          x={width / 2}
          y={height - 16}
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill={BORDER}
        >
          {f.label ?? fracText(f)}
        </text>
      ) : null}
    </g>
  );
}

function GridFraction({
  rows,
  cols,
  shaded,
  width,
  height,
}: {
  rows: number;
  cols: number;
  shaded: number;
  width: number;
  height: number;
}) {
  const cell = 34;
  const totalW = cols * cell;
  const totalH = rows * cell;
  const startX = (width - totalW) / 2;
  const startY = (height - totalH) / 2 - 8;
  const total = rows * cols;
  const safeShaded = clamp(shaded, 0, total);

  return (
    <g>
      {Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        return (
          <rect
            key={i}
            x={startX + col * cell}
            y={startY + row * cell}
            width={cell}
            height={cell}
            fill={i < safeShaded ? BLUE : EMPTY}
            stroke={BORDER}
            strokeWidth={2}
          />
        );
      })}

      <text
        x={width / 2}
        y={height - 14}
        textAnchor="middle"
        fontSize="18"
        fontWeight="900"
        fill={BORDER}
      >
        {safeShaded}/{total}
      </text>
    </g>
  );
}

export default function FractionCanvas({ figure }: Props) {
  if (!isFractionCanvas(figure)) return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 210;

  const model = figure.model ?? "bar";
  const showFraction = figure.display?.showFraction ?? true;
  const unequalParts = figure.display?.unequalParts ?? false;

  const fraction = figure.fraction ?? {
    numerator: 1,
    denominator: 2,
  };

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Représentation de fraction"
      >
        <rect x={0} y={0} width={width} height={height} rx={12} fill="white" />

        {model === "bar" ? (
          <BarFraction
            f={fraction}
            width={width}
            y={58}
            unequalParts={unequalParts}
            showFraction={showFraction}
          />
        ) : null}

        {model === "circle" ? (
          <CircleFraction
            f={fraction}
            width={width}
            height={height}
            showFraction={showFraction}
          />
        ) : null}

        {model === "grid" && figure.grid ? (
          <GridFraction
            rows={figure.grid.rows}
            cols={figure.grid.cols}
            shaded={figure.grid.shaded}
            width={width}
            height={height}
          />
        ) : null}

        {model === "compare" ? (
          <>
            <BarFraction
              f={figure.fractions?.[0] ?? { numerator: 1, denominator: 2 }}
              width={width}
              y={34}
              showFraction={showFraction}
            />
            <BarFraction
              f={figure.fractions?.[1] ?? { numerator: 1, denominator: 4 }}
              width={width}
              y={120}
              showFraction={showFraction}
            />
          </>
        ) : null}

        {unequalParts ? (
          <text
            x={width / 2}
            y={26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="900"
            fill={RED}
          >
            {/* ⚠️ RACCOURCIE LE 25/08/2026. « Attention : les parts ne sont pas
                égales » fait 39 signes, soit ~254 px en 13 px de police : sur la
                seule fiche qui emploie `unequalParts` (les fractions de 6e), le
                cadre mesure 250 et la phrase SORTAIT du <svg> des deux côtés.
                Invisible, puisqu'elle débordait sur du blanc — mesuré au rendu,
                rectangle du texte contre rectangle du svg. */}
            les parts ne sont pas égales
          </text>
        ) : null}
      </svg>
    </div>
  );
}