// tutor-v4/components/TransformationCanvas.tsx
"use client";

import type { CanvasFigure, TransformationCanvasData } from "@/lib/tutor-v4/types";

type Point = { x: number; y: number };

type Props = {
  figure: CanvasFigure;
};

function isTransformationCanvas(
  figure: CanvasFigure
): figure is TransformationCanvasData {
  return figure.kind === "transformation";
}

function gridToSvg(p: Point, cellSize: number, padding: number): Point {
  return {
    x: padding + p.x * cellSize,
    y: padding + p.y * cellSize,
  };
}

function polygonPoints(points: Point[], cellSize: number, padding: number) {
  return points
    .map((p) => {
      const s = gridToSvg(p, cellSize, padding);
      return `${s.x},${s.y}`;
    })
    .join(" ");
}

function mid(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function transformationLabel(kind: TransformationCanvasData["transformation"]) {
  switch (kind) {
    case "symetrie_axiale":
      return "Symétrie axiale";
    case "symetrie_centrale":
      return "Symétrie centrale";
    case "translation":
      return "Translation";
    case "rotation":
      return "Rotation";
    case "homothetie":
      return "Homothétie";
  }
}

function Label({
  x,
  y,
  children,
  color = "#0f172a",
}: {
  x: number;
  y: number;
  children: string;
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="14"
      fontWeight="900"
      fill={color}
      stroke="white"
      strokeWidth="3"
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

function Arrow({
  from,
  to,
  color = "#dc2626",
  label,
}: {
  from: Point;
  to: Point;
  color?: string;
  label?: string;
}) {
  const m = mid(from, to);

  return (
    <g>
      <defs>
        <marker
          id="arrow-transformation"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill={color} />
        </marker>
      </defs>

      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        markerEnd="url(#arrow-transformation)"
      />

      {label ? (
        <Label x={m.x} y={m.y - 8} color={color}>
          {label}
        </Label>
      ) : null}
    </g>
  );
}

export default function TransformationCanvas({ figure }: Props) {
  if (!isTransformationCanvas(figure)) return null;

  const rows = figure.grid?.rows ?? 8;
  const cols = figure.grid?.cols ?? 8;

  const cellSize = figure.size?.cellSize ?? 32;
  const padding = figure.size?.padding ?? 20;

  const width = figure.size?.width ?? cols * cellSize + padding * 2;
  const height = figure.size?.height ?? rows * cellSize + padding * 2 + 34;

  const showGrid = figure.display?.showGrid ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showDashedLinks = figure.display?.showDashedLinks ?? true;
  // ⛔⛔ CE DÉFAUT ÉTAIT À `true`, ET IL DIVULGUAIT DES RÉPONSES — inversé le
  // 01/09/2026. Le titre écrit « Symétrie axiale » au-dessus du dessin ; quand
  // la question est « Quelle transformation retourne une figure comme dans un
  // miroir ? », le dessin répond à la place de l'élève.
  //
  // MESURÉ sur les items chargés (et non par grep : chaque banque passe par un
  // helper, donc grep n'en voyait qu'un par fichier) — 57 items emploient ce
  // canvas, 30 affichaient le titre, et 4 d'entre eux avaient ce titre POUR
  // RÉPONSE : trois en 3e (`..._reactivation_fixed_1/2/3`) et un en 4e
  // (`4e_sym_axiale_fixed_1`).
  //
  // ⭐ POURQUOI INVERSER LE DÉFAUT PLUTÔT QUE CORRIGER LES QUATRE. Rustiner les
  // quatre laissait le piège intact : le prochain item qui demande la nature
  // d'une transformation l'affichera encore, sauf si son auteur y pense. Avec
  // le défaut à `false`, un oubli fait perdre une étiquette utile — jamais une
  // réponse. C'est le sens sûr, et c'est déjà celui de `HomothetieCanvas`.
  // ⚠️ Conséquence assumée : les 26 autres dessins perdent leur titre. Ils ne
  // perdent pas leur sens — les fiches légendent déjà leurs figures elles-mêmes.
  // Pour le retrouver, il suffit de passer `showTransformationInfo: true`.
  const showTransformationInfo =
    figure.display?.showTransformationInfo ?? false;

  const sourceColor = figure.source.color ?? "#2563eb";
  const sourceFill = figure.source.fill ?? "#dbeafe";

  const imageColor = figure.image?.color ?? "#dc2626";
  const imageFill = figure.image?.fill ?? "#fee2e2";

  const sourceSvg = figure.source.points.map((p) =>
    gridToSvg(p, cellSize, padding)
  );

  const imageSvg =
    figure.image?.points.map((p) => gridToSvg(p, cellSize, padding)) ?? [];

  const centerSvg = figure.center
    ? gridToSvg(figure.center.point, cellSize, padding)
    : null;

  const vectorSvg = figure.vector
    ? {
        from: gridToSvg(figure.vector.from, cellSize, padding),
        to: gridToSvg(figure.vector.to, cellSize, padding),
      }
    : null;

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {showTransformationInfo ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          {transformationLabel(figure.transformation)}
          {figure.angleDeg !== undefined ? ` — ${figure.angleDeg}°` : ""}
          {figure.ratio !== undefined ? ` — k = ${figure.ratio}` : ""}
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Figure de transformation"
      >
        <rect x={0} y={0} width={width} height={height} rx={12} fill="white" />

        {showGrid ? (
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
                  stroke="#cbd5e1"
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
                  stroke="#cbd5e1"
                  strokeWidth={1}
                />
              );
            })}
          </>
        ) : null}

        {/* Axe pour symétrie axiale */}
        {figure.axis ? (
          <>
            {figure.axis.type === "vertical" && figure.axis.x !== undefined ? (
              <>
                <line
                  x1={padding + figure.axis.x * cellSize}
                  y1={padding}
                  x2={padding + figure.axis.x * cellSize}
                  y2={padding + rows * cellSize}
                  stroke="#16a34a"
                  strokeWidth={3}
                  strokeDasharray="8 5"
                />
                {figure.axis.label ? (
                  <Label
                    x={padding + figure.axis.x * cellSize}
                    y={padding - 6}
                    color="#16a34a"
                  >
                    {figure.axis.label}
                  </Label>
                ) : null}
              </>
            ) : null}

            {figure.axis.type === "horizontal" && figure.axis.y !== undefined ? (
              <>
                <line
                  x1={padding}
                  y1={padding + figure.axis.y * cellSize}
                  x2={padding + cols * cellSize}
                  y2={padding + figure.axis.y * cellSize}
                  stroke="#16a34a"
                  strokeWidth={3}
                  strokeDasharray="8 5"
                />
                {figure.axis.label ? (
                  <Label
                    x={width - padding}
                    y={padding + figure.axis.y * cellSize - 8}
                    color="#16a34a"
                  >
                    {figure.axis.label}
                  </Label>
                ) : null}
              </>
            ) : null}

            {figure.axis.type === "line" &&
            figure.axis.from &&
            figure.axis.to ? (
              <>
                <line
                  x1={gridToSvg(figure.axis.from, cellSize, padding).x}
                  y1={gridToSvg(figure.axis.from, cellSize, padding).y}
                  x2={gridToSvg(figure.axis.to, cellSize, padding).x}
                  y2={gridToSvg(figure.axis.to, cellSize, padding).y}
                  stroke="#16a34a"
                  strokeWidth={3}
                  strokeDasharray="8 5"
                />
                {figure.axis.label ? (
                  <Label
                    x={
                      mid(
                        gridToSvg(figure.axis.from, cellSize, padding),
                        gridToSvg(figure.axis.to, cellSize, padding)
                      ).x
                    }
                    y={
                      mid(
                        gridToSvg(figure.axis.from, cellSize, padding),
                        gridToSvg(figure.axis.to, cellSize, padding)
                      ).y - 10
                    }
                    color="#16a34a"
                  >
                    {figure.axis.label}
                  </Label>
                ) : null}
              </>
            ) : null}
          </>
        ) : null}

        {/* Segments point → image */}
        {showDashedLinks && imageSvg.length === sourceSvg.length
          ? sourceSvg.map((p, i) => (
              <line
                key={`link-${i}`}
                x1={p.x}
                y1={p.y}
                x2={imageSvg[i].x}
                y2={imageSvg[i].y}
                stroke="#94a3b8"
                strokeWidth={1.8}
                strokeDasharray="5 5"
              />
            ))
          : null}

        <polygon
          points={polygonPoints(figure.source.points, cellSize, padding)}
          fill={sourceFill}
          stroke={sourceColor}
          strokeWidth={3}
          strokeLinejoin="round"
        />

        {figure.image ? (
          <polygon
            points={polygonPoints(figure.image.points, cellSize, padding)}
            fill={imageFill}
            stroke={imageColor}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        ) : null}

        {showPoints
          ? sourceSvg.map((p, i) => (
              <circle
                key={`source-point-${i}`}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={sourceColor}
              />
            ))
          : null}

        {showPoints
          ? imageSvg.map((p, i) => (
              <circle
                key={`image-point-${i}`}
                cx={p.x}
                cy={p.y}
                r={4}
                fill={imageColor}
              />
            ))
          : null}

        {showLabels && figure.source.label && sourceSvg[0] ? (
          <Label x={sourceSvg[0].x} y={sourceSvg[0].y - 10} color={sourceColor}>
            {figure.source.label}
          </Label>
        ) : null}

        {showLabels && figure.image?.label && imageSvg[0] ? (
          <Label x={imageSvg[0].x} y={imageSvg[0].y - 10} color={imageColor}>
            {figure.image.label}
          </Label>
        ) : null}

        {centerSvg ? (
          <g>
            <circle
              cx={centerSvg.x}
              cy={centerSvg.y}
              r={6}
              fill="#f97316"
              stroke="#0f172a"
              strokeWidth={2}
            />
            {showLabels ? (
              <Label x={centerSvg.x + 15} y={centerSvg.y - 10} color="#f97316">
                {figure.center?.label ?? "O"}
              </Label>
            ) : null}
          </g>
        ) : null}

        {vectorSvg ? (
          <Arrow
            from={vectorSvg.from}
            to={vectorSvg.to}
            color="#7c3aed"
            label={figure.vector?.label ?? "vecteur"}
          />
        ) : null}

        <text
          x={width / 2}
          y={height - 10}
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#475569"
        >
          {/* ⚠️ RACCOURCIE LE 24/08/2026. « figure bleue : départ — figure
              rouge : image » fait 43 signes, soit ~280 px en 12 px de police :
              centrée sur un cadre de 240 à 270, elle SORTAIT du <svg> des deux
              côtés. Le défaut touchait les six dessins de symétrie de la 6e —
              et il ne se voyait pas, le texte débordant sur du blanc. Mesuré au
              rendu (rectangle du texte contre rectangle du svg). */}
          bleu : départ · rouge : image
        </text>
      </svg>
    </div>
  );
}