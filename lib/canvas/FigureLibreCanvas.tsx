// tutor-v4/components/FigureLibreCanvas.tsx

"use client";

import type { FigureLibreCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: FigureLibreCanvasData;
};

type GridCell = [row: number, col: number];
type GridPoint = [row: number, col: number];

function cellKey([row, col]: GridCell): string {
  return `${row}-${col}`;
}

function pointKey([row, col]: GridPoint): string {
  return `${row}-${col}`;
}

function gridToPixel(
  row: number,
  col: number,
  cellSize: number,
  padding: number
) {
  return {
    x: padding + col * cellSize,
    y: padding + row * cellSize,
  };
}

function buildPerimeterSegments(filledCells: GridCell[]) {
  const filled = new Set(filledCells.map(cellKey));

  const segments: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }> = [];

  for (const [row, col] of filledCells) {
    const top: GridCell = [row - 1, col];
    const right: GridCell = [row, col + 1];
    const bottom: GridCell = [row + 1, col];
    const left: GridCell = [row, col - 1];

    // top edge
    if (!filled.has(cellKey(top))) {
      segments.push({
        x1: col,
        y1: row,
        x2: col + 1,
        y2: row,
      });
    }

    // right edge
    if (!filled.has(cellKey(right))) {
      segments.push({
        x1: col + 1,
        y1: row,
        x2: col + 1,
        y2: row + 1,
      });
    }

    // bottom edge
    if (!filled.has(cellKey(bottom))) {
      segments.push({
        x1: col,
        y1: row + 1,
        x2: col + 1,
        y2: row + 1,
      });
    }

    // left edge
    if (!filled.has(cellKey(left))) {
      segments.push({
        x1: col,
        y1: row,
        x2: col,
        y2: row + 1,
      });
    }
  }

  return segments;
}

function buildPathFromGridPoints(
  points: GridPoint[],
  cellSize: number,
  padding: number
): string {
  if (points.length === 0) return "";

  const pixelPoints = points.map(([row, col]) =>
    gridToPixel(row, col, cellSize, padding)
  );

  const [first, ...rest] = pixelPoints;
  return [
    `M ${first.x} ${first.y}`,
    ...rest.map((p) => `L ${p.x} ${p.y}`),
  ].join(" ");
}

export default function FigureLibreCanvas({ figure }: Props) {
  if (figure.kind !== "figure_libre") return null;

  const rows = figure.grid.rows;
  const cols = figure.grid.cols;
  const filledCells = figure.grid.filledCells ?? [];

  const cellSize = figure.size?.cellSize ?? 32;
  const padding = figure.size?.padding ?? 16;

  const width = figure.size?.width ?? cols * cellSize + padding * 2;
  const height = figure.size?.height ?? rows * cellSize + padding * 2;

  const showGrid = figure.display?.showGrid ?? true;
  const showFilled = figure.display?.showFilled ?? true;
  const showCellLabels = figure.display?.showCellLabels ?? false;
  const showPerimeter = figure.display?.showPerimeter ?? false;
  const showVertices = figure.display?.showVertices ?? false;
  const showVertexLabels = figure.display?.showVertexLabels ?? false;

  const filledColor = figure.colors?.filled ?? "#dbeafe";
  const gridColor = figure.colors?.grid ?? "#cbd5e1";
  const borderColor = figure.colors?.border ?? "#0f172a";
  const perimeterColor = figure.colors?.perimeter ?? "#dc2626";
  const vertexColor = figure.colors?.vertex ?? "#7c3aed";
  const vertexLabelColor = figure.colors?.vertexLabel ?? "#0f172a";

  const perimeterSegments = buildPerimeterSegments(filledCells);

  const vertices = figure.vertices ?? {};
  const vertexEntries = Object.entries(vertices) as Array<[string, GridPoint]>;

  const pathD =
    figure.perimeterPath && figure.perimeterPath.length > 0
      ? buildPathFromGridPoints(figure.perimeterPath, cellSize, padding)
      : "";

  return (
    <div className="mx-auto w-full max-w-[280px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure libre sur quadrillage"
      >
        {/* fond */}
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="white"
          rx={10}
        />

        {/* quadrillage */}
        {showGrid && (
          <>
            {Array.from({ length: rows + 1 }, (_, r) => {
              const y = padding + r * cellSize;
              return (
                <line
                  key={`h-${r}`}
                  x1={padding}
                  y1={y}
                  x2={padding + cols * cellSize}
                  y2={y}
                  stroke={gridColor}
                  strokeWidth={1}
                />
              );
            })}

            {Array.from({ length: cols + 1 }, (_, c) => {
              const x = padding + c * cellSize;
              return (
                <line
                  key={`v-${c}`}
                  x1={x}
                  y1={padding}
                  x2={x}
                  y2={padding + rows * cellSize}
                  stroke={gridColor}
                  strokeWidth={1}
                />
              );
            })}
          </>
        )}

        {/* cases remplies */}
        {showFilled &&
          filledCells.map(([row, col]) => {
            const x = padding + col * cellSize;
            const y = padding + row * cellSize;

            return (
              <rect
                key={`cell-${row}-${col}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                fill={filledColor}
                stroke={borderColor}
                strokeWidth={1.4}
              />
            );
          })}

        {/* labels des cases */}
        {showCellLabels &&
          filledCells.map(([row, col]) => {
            const cx = padding + col * cellSize + cellSize / 2;
            const cy = padding + row * cellSize + cellSize / 2 + 5;

            return (
              <text
                key={`label-${row}-${col}`}
                x={cx}
                y={cy}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#334155"
              >
                1
              </text>
            );
          })}

        {/* contour automatique */}
        {showPerimeter &&
          !pathD &&
          perimeterSegments.map((seg, index) => {
            const p1 = gridToPixel(seg.y1, seg.x1, cellSize, padding);
            const p2 = gridToPixel(seg.y2, seg.x2, cellSize, padding);

            return (
              <line
                key={`perim-${index}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={perimeterColor}
                strokeWidth={3}
                strokeLinecap="round"
              />
            );
          })}

        {/* contour explicite si perimeterPath fourni */}
        {showPerimeter && pathD ? (
          <path
            d={pathD}
            fill="none"
            stroke={perimeterColor}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* sommets nommés */}
        {showVertices &&
          vertexEntries.map(([label, [row, col]]) => {
            const p = gridToPixel(row, col, cellSize, padding);
            return (
              <circle
                key={`vertex-${pointKey([row, col])}-${label}`}
                cx={p.x}
                cy={p.y}
                r={4.5}
                fill={vertexColor}
              />
            );
          })}

        {showVertexLabels &&
          vertexEntries.map(([label, [row, col]]) => {
            const p = gridToPixel(row, col, cellSize, padding);
            return (
              <text
                key={`vertex-label-${pointKey([row, col])}-${label}`}
                x={p.x + 8}
                y={p.y - 8}
                fontSize="16"
                fontWeight="900"
                fill={vertexLabelColor}
                stroke="white"
                strokeWidth="2"
                paintOrder="stroke"
              >
                {label}
              </text>
            );
          })}
      </svg>
    </div>
  );
}