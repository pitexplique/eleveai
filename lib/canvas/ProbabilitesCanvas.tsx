// tutor-v4/components/ProbabilitesCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type DiceFace = 1 | 2 | 3 | 4 | 5 | 6;

const COULEURS = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
];

function couleur(index: number) {
  return COULEURS[index % COULEURS.length];
}

function isDiceFace(face: number): face is DiceFace {
  return face === 1 || face === 2 || face === 3 || face === 4 || face === 5 || face === 6;
}

function estSurligne(
  casesSurlignees: Array<[number, number]> | undefined,
  row: number,
  col: number
) {
  return casesSurlignees?.some(([r, c]) => r === row && c === col) ?? false;
}

function pointsDe(face: DiceFace) {
  const positions = {
    1: [[50, 50]],
    2: [
      [30, 30],
      [70, 70],
    ],
    3: [
      [30, 30],
      [50, 50],
      [70, 70],
    ],
    4: [
      [30, 30],
      [70, 30],
      [30, 70],
      [70, 70],
    ],
    5: [
      [30, 30],
      [70, 30],
      [50, 50],
      [30, 70],
      [70, 70],
    ],
    6: [
      [30, 28],
      [70, 28],
      [30, 50],
      [70, 50],
      [30, 72],
      [70, 72],
    ],
  } as const;

  return positions[face];
}

export default function CanvasProbabilites({ figure }: Props) {
  if (figure.kind !== "probabilites") return null;

  const width = figure.size?.width ?? 320;
  const height = figure.size?.height ?? 240;

  if (figure.variant === "de") {
    const rawFaces = figure.de?.faces ?? [1, 2, 3, 4, 5, 6];
    const faces: DiceFace[] = rawFaces.filter(isDiceFace);

    const rawSurligne = figure.de?.surligne ?? [];
    const surligne: DiceFace[] = rawSurligne.filter(isDiceFace);

    return (
      <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="grid grid-cols-3 gap-3">
          {faces.map((face, index) => {
            const active = surligne.includes(face);

            return (
              <svg
                key={`${face}-${index}`}
                viewBox="0 0 100 100"
                className={[
                  "h-auto w-full rounded-xl border-2",
                  active
                    ? "border-amber-400 bg-amber-50"
                    : "border-slate-300 bg-white",
                ].join(" ")}
                aria-label={`Dé face ${face}`}
              >
                <rect
                  x="8"
                  y="8"
                  width="84"
                  height="84"
                  rx="16"
                  fill={active ? "#fef3c7" : "#f8fafc"}
                  stroke="#0f172a"
                  strokeWidth="3"
                />

                {pointsDe(face).map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="6" fill="#0f172a" />
                ))}
              </svg>
            );
          })}
        </div>
      </div>
    );
  }

  if (figure.variant === "roue") {
    const segments = figure.roue?.segments ?? [];
    const total = segments.reduce((s, seg) => s + seg.poids, 0) || 1;

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.36;

    let angleCourant = -Math.PI / 2;

    return (
      <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full">
          {segments.map((seg, index) => {
            const angle = (seg.poids / total) * 2 * Math.PI;
            const angleSuivant = angleCourant + angle;

            const x1 = cx + radius * Math.cos(angleCourant);
            const y1 = cy + radius * Math.sin(angleCourant);
            const x2 = cx + radius * Math.cos(angleSuivant);
            const y2 = cy + radius * Math.sin(angleSuivant);

            const grandArc = angle > Math.PI ? 1 : 0;

            const d = `
              M ${cx} ${cy}
              L ${x1} ${y1}
              A ${radius} ${radius} 0 ${grandArc} 1 ${x2} ${y2}
              Z
            `;

            const angleMilieu = angleCourant + angle / 2;
            const lx = cx + radius * 0.62 * Math.cos(angleMilieu);
            const ly = cy + radius * 0.62 * Math.sin(angleMilieu);

            angleCourant = angleSuivant;

            return (
              <g key={`${seg.label}-${index}`}>
                <path
                  d={d}
                  fill={seg.couleur ?? couleur(index)}
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="900"
                  fill="white"
                  stroke="#0f172a"
                  strokeWidth="2"
                  paintOrder="stroke"
                >
                  {seg.label}
                </text>
              </g>
            );
          })}

          <circle cx={cx} cy={cy} r="7" fill="#0f172a" />
          <path
            d={`M ${cx} ${cy - radius - 8} L ${cx - 8} ${cy - radius + 12} L ${
              cx + 8
            } ${cy - radius + 12} Z`}
            fill="#0f172a"
          />
        </svg>
      </div>
    );
  }

  if (figure.variant === "billes") {
    const elements = figure.billes?.elements ?? [];
    const columns = Math.min(6, Math.max(3, Math.ceil(Math.sqrt(elements.length))));
    const cell = 44;
    const svgWidth = columns * cell;
    const rows = Math.ceil(elements.length / columns);
    const svgHeight = rows * cell;

    return (
      <div className="mx-auto w-full max-w-[320px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="block h-auto w-full">
          {elements.map((el, index) => {
            const col = index % columns;
            const row = Math.floor(index / columns);
            const x = col * cell + cell / 2;
            const y = row * cell + cell / 2;

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="17"
                  fill={el.couleur}
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                {el.label ? (
                  <text
                    x={x}
                    y={y + 5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="900"
                    fill="white"
                    stroke="#0f172a"
                    strokeWidth="1.5"
                    paintOrder="stroke"
                  >
                    {el.label}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  if (figure.variant === "tableau") {
    const entetes = figure.tableau?.entetes ?? [];
    const lignes = figure.tableau?.lignes ?? [];
    const casesSurlignees = figure.tableau?.casesSurlignees;

    return (
      <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-center text-sm">
          {entetes.length > 0 ? (
            <thead>
              <tr>
                {entetes.map((entete, col) => (
                  <th
                    key={col}
                    className="border border-slate-200 bg-slate-100 px-3 py-2 font-black text-slate-800"
                  >
                    {entete}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}

          <tbody>
            {lignes.map((ligne, row) => (
              <tr key={row}>
                {ligne.map((cellule, col) => {
                  const active = estSurligne(casesSurlignees, row, col);

                  return (
                    <td
                      key={col}
                      className={[
                        "border border-slate-200 px-3 py-2 font-bold",
                        active
                          ? "bg-amber-100 text-amber-900"
                          : "bg-white text-slate-800",
                      ].join(" ")}
                    >
                      {cellule}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}