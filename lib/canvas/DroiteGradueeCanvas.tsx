// tutor-v4/components/DroiteGradueeCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type NumberLinePoint = {
  value: number;
  label?: string;
  color?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function valueToX(
  value: number,
  min: number,
  max: number,
  leftPad: number,
  rightPad: number,
  width: number
) {
  const usableWidth = width - leftPad - rightPad;
  if (max === min) return leftPad + usableWidth / 2;
  return leftPad + ((value - min) / (max - min)) * usableWidth;
}

function formatTick(value: number) {
  const rounded = Math.round(value * 100) / 100;

  if (Number.isInteger(rounded)) {
    return String(rounded);
  }

  return rounded
    .toFixed(3)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", ",");
}

export default function DroiteGradueeCanvas({ figure }: Props) {
  if (figure.kind !== "number_line") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 120;

  const min = figure.min ?? -5;
  const max = figure.max ?? 5;
  const step = figure.step ?? 1;

  const leftPad = 28;
  const rightPad = 28;

  const showTicks = figure.display?.showTicks ?? true;
  const showValues = figure.display?.showValues ?? true;
  const showPoints = figure.display?.showPoints ?? true;
  const showPointLabels = figure.display?.showPointLabels ?? true;
  const showZero = figure.display?.showZero ?? true;

  const points = (figure.points ?? []) as NumberLinePoint[];

  const ticks: number[] = [];
  const safeStep = step > 0 ? step : 1;

  for (let v = min; v <= max + 1e-9; v += safeStep) {
    ticks.push(Math.round(v * 1000000) / 1000000);
  }

  const axisStartX = valueToX(min, min, max, leftPad, rightPad, width);
  const axisEndX = valueToX(max, min, max, leftPad, rightPad, width);

  // ─── La place au-dessus de l'axe ────────────────────────────────────────────
  // ⛔ L'AXE NE SE CENTRE PAS (Frédéric, 20/08/2026, en relisant la fiche des
  // opérations sur les relatifs). Une étiquette de point se dessine 52 px
  // au-dessus de l'axe ; sur une droite plate — 360 × 90, l'étalon de seconde —
  // l'axe centré tombait à 45, donc « départ » et « arrivée » se dessinaient à
  // −7 : HORS du cadre, coupés en haut. L'axe descend maintenant autant qu'il
  // faut pour que les étiquettes tiennent.
  //
  // Et quand deux étiquettes se chevauchent — « départ −5 » et « arrivée −3 »
  // sur des points voisins, elles s'écrasaient l'une sur l'autre et se lisaient
  // « départ·arrivée −3 » — la seconde monte d'un cran. Le dessin gagne alors en
  // hauteur plutôt que de mentir sur ce qu'il montre.
  const LARGEUR_CAR = 8; // fontSize 14, fontWeight 900
  const CRAN = 22; // un étage d'étiquettes
  const BAS = 32; // les nombres de la graduation, dessinés à axisY + 26

  const etiquettes = showPoints && showPointLabels
    ? points
        .filter((pt) => pt.label)
        .map((pt) => {
          const x = valueToX(clamp(pt.value, min, max), min, max, leftPad, rightPad, width);
          const demiLargeur = (String(pt.label).length * LARGEUR_CAR) / 2 + 5;
          return { x, gauche: x - demiLargeur, droite: x + demiLargeur };
        })
        .sort((a, b) => a.gauche - b.gauche)
    : [];

  // Un étage par étiquette : on prend le premier où elle ne touche personne.
  const finDEtage: number[] = [];
  const etageParX = new Map<number, number>();
  for (const e of etiquettes) {
    let etage = 0;
    while (finDEtage[etage] !== undefined && e.gauche < finDEtage[etage]) etage += 1;
    finDEtage[etage] = e.droite;
    etageParX.set(e.x, etage);
  }
  const etages = Math.max(finDEtage.length, 1);

  // Le fond blanc d'une étiquette commence 52 px au-dessus de l'axe : il faut
  // donc 56 pour l'étage du bas, plus un cran par étage supplémentaire.
  const hautNecessaire = 56 + CRAN * (etages - 1);
  const axisY = Math.max(Math.round(height / 2), hautNecessaire);
  const hauteurTotale = Math.max(height, axisY + BAS);

  return (
    <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${hauteurTotale}`}
        className="block h-auto w-full"
        aria-label="Droite graduée"
      >
        {/* Axe */}
        <line
          x1={axisStartX}
          y1={axisY}
          x2={axisEndX}
          y2={axisY}
          stroke="#0f172a"
          strokeWidth={2.8}
          strokeLinecap="round"
        />

        {/* Flèche droite */}
        <path
          d={`M ${axisEndX - 10} ${axisY - 6} L ${axisEndX} ${axisY} L ${
            axisEndX - 10
          } ${axisY + 6}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Flèche gauche */}
        <path
          d={`M ${axisStartX + 10} ${axisY - 6} L ${axisStartX} ${axisY} L ${
            axisStartX + 10
          } ${axisY + 6}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Graduations */}
        {showTicks &&
          ticks.map((tick) => {
            const x = valueToX(tick, min, max, leftPad, rightPad, width);
            const isZero = Math.abs(tick) < 1e-9;

            if (isZero && !showZero) return null;

            return (
              <g key={`tick-${tick}`}>
                <line
                  x1={x}
                  y1={axisY - 8}
                  x2={x}
                  y2={axisY + 8}
                  stroke="#0f172a"
                  strokeWidth={2}
                  strokeLinecap="round"
                />

                {showValues ? (
                  <text
                    x={x}
                    y={axisY + 26}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="800"
                    fill={isZero ? "#dc2626" : "#0f172a"}
                    stroke="white"
                    strokeWidth="2"
                    paintOrder="stroke"
                  >
                    {formatTick(tick)}
                  </text>
                ) : null}
              </g>
            );
          })}

        {/* Points */}
        {showPoints &&
          points.map((pt, index) => {
            const value = clamp(pt.value, min, max);
            const x = valueToX(value, min, max, leftPad, rightPad, width);
            const pointColor = pt.color ?? "#2563eb";

            return (
              <g key={`point-${index}-${pt.label ?? pt.value}`}>
                <line
                  x1={x}
                  y1={axisY}
                  x2={x}
                  y2={axisY - 22}
                  stroke={pointColor}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                />

                <circle cx={x} cy={axisY - 24} r={5} fill={pointColor} />

                {showPointLabels && pt.label ? (
                  (() => {
                    // L'étage calculé plus haut, et un fond blanc à la MESURE du
                    // texte : à 32 px fixes il ne couvrait que le milieu de
                    // « départ −5 », et les mots voisins se touchaient quand même.
                    const haut = axisY - 52 - CRAN * (etageParX.get(x) ?? 0);
                    const largeur = String(pt.label).length * LARGEUR_CAR + 10;
                    return (
                  <>
                    <rect
                      x={x - largeur / 2}
                      y={haut}
                      width={largeur}
                      height={20}
                      rx={5}
                      fill="white"
                      opacity={0.95}
                    />
                    <line
                      x1={x}
                      y1={haut + 20}
                      x2={x}
                      y2={axisY - 26}
                      stroke={pointColor}
                      strokeWidth={1.2}
                      strokeDasharray="2 2"
                      opacity={0.55}
                    />
                    <text
                      x={x}
                      y={haut + 14}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="900"
                      fill={pointColor}
                      stroke="white"
                      strokeWidth="2"
                      paintOrder="stroke"
                    >
                      {pt.label}
                    </text>
                  </>
                    );
                  })()
                ) : null}
              </g>
            );
          })}
      </svg>
    </div>
  );
}