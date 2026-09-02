// tutor-v4/components/ReperageCanvas.tsx
"use client";

import type { ReperageCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: ReperageCanvasData;
};

const DEFAULT_COLORS = {
  background: "#ffffff",
  grid: "#cbd5e1",
  axisX: "#2563eb",
  axisY: "#16a34a",
  point: "#ef4444",
  target: "#f97316",
  path: "#8b5cf6",
  text: "#0f172a",
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ReperageCanvas({ figure }: Props) {
  if (figure.kind !== "reperage") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 280;

  const rows = figure.grid?.rows ?? 5;
  const cols = figure.grid?.cols ?? 5;

  const colors = {
    ...DEFAULT_COLORS,
    ...(figure.colors ?? {}),
  };

  const showGrid = figure.display?.showGrid ?? true;
  const showAxes = figure.display?.showAxes ?? true;
  const showCoordinates = figure.display?.showCoordinates ?? true;
  const showPointLabels = figure.display?.showPointLabels ?? true;
  const showTarget = figure.display?.showTarget ?? true;

  const marginLeft = 42;
  const marginRight = 18;
  const marginTop = 22;
  const marginBottom = 42;

  const gridWidth = width - marginLeft - marginRight;
  const gridHeight = height - marginTop - marginBottom;

  const cellW = gridWidth / cols;
  const cellH = gridHeight / rows;

  function toSvgX(x: number) {
    const safeX = clamp(x, 0, cols);
    return marginLeft + safeX * cellW;
  }

  function toSvgY(y: number) {
    const safeY = clamp(y, 0, rows);
    return marginTop + gridHeight - safeY * cellH;
  }

  function computePathPoints() {
    if (!figure.path) return [];

    const points = [
      {
        x: figure.path.start.x,
        y: figure.path.start.y,
      },
    ];

    let currentX = figure.path.start.x;
    let currentY = figure.path.start.y;

    for (const step of figure.path.steps) {
      if (step.direction === "droite") currentX += step.count;
      if (step.direction === "gauche") currentX -= step.count;
      if (step.direction === "haut") currentY += step.count;
      if (step.direction === "bas") currentY -= step.count;

      points.push({
        x: currentX,
        y: currentY,
      });
    }

    return points;
  }

  const pathPoints = computePathPoints();

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Quadrillage de repérage"
      >
        <defs>
          <marker
            id="reperage-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 8 3 L 0 6 Z" fill={colors.path} />
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
            {Array.from({ length: cols + 1 }, (_, i) => {
              const x = marginLeft + i * cellW;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  y1={marginTop}
                  x2={x}
                  y2={marginTop + gridHeight}
                  stroke={colors.grid}
                  strokeWidth={1.5}
                />
              );
            })}

            {Array.from({ length: rows + 1 }, (_, i) => {
              const y = marginTop + i * cellH;
              return (
                <line
                  key={`h-${i}`}
                  x1={marginLeft}
                  y1={y}
                  x2={marginLeft + gridWidth}
                  y2={y}
                  stroke={colors.grid}
                  strokeWidth={1.5}
                />
              );
            })}
          </>
        ) : null}

        {showAxes ? (
          <>
            <line
              x1={marginLeft}
              y1={marginTop + gridHeight}
              x2={marginLeft + gridWidth + 10}
              y2={marginTop + gridHeight}
              stroke={colors.axisX}
              strokeWidth={4}
              strokeLinecap="round"
              markerEnd="url(#reperage-arrow)"
            />

            <line
              x1={marginLeft}
              y1={marginTop + gridHeight}
              x2={marginLeft}
              y2={marginTop - 10}
              stroke={colors.axisY}
              strokeWidth={4}
              strokeLinecap="round"
              markerEnd="url(#reperage-arrow)"
            />

            {/*
              ⛔ LES DEUX NOMS D'AXES SORTAIENT DU CADRE, et un `<svg>` rogne ce
              qui dépasse : ils étaient donc COUPÉS, sur tous leurs emplois du
              site. Corrigé le 02/09/2026, après la mesure de la classe de 4e.

              C'était arithmétique, pas une question de taille demandée :
                · le « x » était posé à `marginLeft + gridWidth + 12`, soit
                  `width − 6`, et il mesure environ 8 px de large — il finissait
                  donc à `width + 2`. Il est désormais ANCRÉ PAR LA FIN, à 4 px
                  du bord : il ne peut plus sortir, quelle que soit sa largeur.
                · le « y » avait sa ligne de base à `marginTop − 12`, soit 10 px,
                  pour une police de 15 dont le jambage monte d'environ 11 px :
                  son sommet était à −1. La base descend à `marginTop − 8`.

              ⚠️ Mesuré avant : « x » dépassait de 4,4 px à droite, « y » de
              7,1 px en haut. Aucun des deux ne faisait baisser la police ni ne
              cassait quoi que ce soit — c'est exactement le genre de défaut qui
              survit tant que personne ne mesure une fiche déjà publiée.
            */}
            {/*
              ⚠️ Le « x » est AU-DESSUS de l'axe, pas dessous : sous l'axe court la
              ligne des graduations, et l'y ramener le faisait chevaucher la
              dernière d'entre elles. Au-dessus, il occupe la marge de droite, où
              il n'y a rien.
            */}
            <text
              x={width - 4}
              y={marginTop + gridHeight - 6}
              textAnchor="end"
              fontSize="15"
              fontWeight="900"
              fill={colors.axisX}
            >
              x
            </text>

            {/*
              ⭐ LE « y » EST DESCENDU ET DÉCALÉ À DROITE (Frédéric, 02/09). Il
              était posé au-dessus de l'axe et à sa gauche, là où il n'y a que la
              marge : à cette hauteur, la boîte d'un « y » de 15 px — qui monte
              d'environ 14 px au-dessus de sa ligne de base — sortait du cadre de
              2,7 px, et le SVG la rognait.
              Il est maintenant DANS le cadre, juste à droite de l'axe et sous sa
              pointe : la place où un manuel écrit le nom d'un axe.
            */}
            <text
              x={marginLeft + 6}
              y={marginTop + 4}
              fontSize="15"
              fontWeight="900"
              fill={colors.axisY}
            >
              y
            </text>
          </>
        ) : null}

        {showCoordinates ? (
          <>
            {Array.from({ length: cols + 1 }, (_, i) => {
              const label = figure.grid?.xLabels?.[i] ?? String(i);
              return (
                <text
                  key={`x-label-${i}`}
                  x={toSvgX(i)}
                  y={marginTop + gridHeight + 24}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="900"
                  fill={colors.text}
                >
                  {label}
                </text>
              );
            })}

            {Array.from({ length: rows + 1 }, (_, i) => {
              const label = figure.grid?.yLabels?.[i] ?? String(i);
              return (
                <text
                  key={`y-label-${i}`}
                  x={marginLeft - 18}
                  y={toSvgY(i) + 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="900"
                  fill={colors.text}
                >
                  {label}
                </text>
              );
            })}
          </>
        ) : null}

        {pathPoints.length >= 2
          ? pathPoints.slice(0, -1).map((point, index) => {
              const next = pathPoints[index + 1];
              const step = figure.path?.steps[index];

              const x1 = toSvgX(point.x);
              const y1 = toSvgY(point.y);
              const x2 = toSvgX(next.x);
              const y2 = toSvgY(next.y);

              const color = step?.color ?? figure.path?.color ?? colors.path;

              return (
                <line
                  key={`path-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeWidth={5}
                  strokeLinecap="round"
                  markerEnd={
                    figure.path?.showArrows === false
                      ? undefined
                      : "url(#reperage-arrow)"
                  }
                />
              );
            })
          : null}

        {figure.path?.start ? (
          <g>
            <circle
              cx={toSvgX(figure.path.start.x)}
              cy={toSvgY(figure.path.start.y)}
              r={8}
              fill={figure.path.start.color ?? colors.point}
              stroke="#0f172a"
              strokeWidth={2}
            />

            {showPointLabels && figure.path.start.label ? (
              <text
                x={toSvgX(figure.path.start.x) + 11}
                y={toSvgY(figure.path.start.y) - 10}
                fontSize="14"
                fontWeight="900"
                fill={colors.text}
                stroke="white"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {figure.path.start.label}
              </text>
            ) : null}
          </g>
        ) : null}

        {figure.points?.map((point, index) => {
          const px = toSvgX(point.x);
          const py = toSvgY(point.y);

          return (
            <g key={`${point.label ?? "point"}-${index}`}>
              <circle
                cx={px}
                cy={py}
                r={8}
                fill={point.color ?? colors.point}
                stroke="#0f172a"
                strokeWidth={2}
              />

              {showPointLabels && point.label ? (
                // ⛔ L'ÉTIQUETTE BASCULE À GAUCHE PRÈS DU BORD DROIT (02/09/2026).
                // Elle était TOUJOURS posée à `px + 11` : un point placé dans la
                // dernière colonne la poussait donc hors du cadre, et le `<svg>`
                // la rognait. Mesuré sur la fiche de repérage de 4e, où « (6 ; 2) »
                // sortait aux deux largeurs — le point était pourtant à
                // l'intérieur, seule sa légende dépassait.
                //
                // Le seuil compte en PIXELS DE TEXTE, pas en cases : on estime la
                // largeur du libellé à 7 px par caractère, la mesure de REGLES.md.
                // S'il ne tient pas à droite, on l'ancre par la fin et on la pose
                // à gauche du point. Un libellé à gauche reste lisible ; un
                // libellé coupé, non.
                (() => {
                  const largeurEstimee = (point.label?.length ?? 0) * 7;
                  const tientADroite = px + 11 + largeurEstimee < width - 4;
                  return (
                    <text
                      x={tientADroite ? px + 11 : px - 11}
                      y={py - 10}
                      textAnchor={tientADroite ? "start" : "end"}
                      fontSize="14"
                      fontWeight="900"
                      fill={colors.text}
                      stroke="white"
                      strokeWidth={3}
                      paintOrder="stroke"
                    >
                      {point.label}
                    </text>
                  );
                })()
              ) : null}
            </g>
          );
        })}

        {figure.target && showTarget ? (
          <g>
            {figure.target.hidden ? (
              <>
                <circle
                  cx={toSvgX(figure.target.x)}
                  cy={toSvgY(figure.target.y)}
                  r={10}
                  fill="#fef3c7"
                  stroke={figure.target.color ?? colors.target}
                  strokeWidth={3}
                  strokeDasharray="4 3"
                />
                <text
                  x={toSvgX(figure.target.x)}
                  y={toSvgY(figure.target.y) + 5}
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill={figure.target.color ?? colors.target}
                >
                  ?
                </text>
              </>
            ) : (
              <>
                <circle
                  cx={toSvgX(figure.target.x)}
                  cy={toSvgY(figure.target.y)}
                  r={9}
                  fill={figure.target.color ?? colors.target}
                  stroke="#0f172a"
                  strokeWidth={2}
                />

                {showPointLabels && figure.target.label ? (
                  <text
                    x={toSvgX(figure.target.x) + 11}
                    y={toSvgY(figure.target.y) - 10}
                    fontSize="14"
                    fontWeight="900"
                    fill={colors.text}
                    stroke="white"
                    strokeWidth={3}
                    paintOrder="stroke"
                  >
                    {figure.target.label}
                  </text>
                ) : null}
              </>
            )}
          </g>
        ) : null}
      </svg>
    </div>
  );
}