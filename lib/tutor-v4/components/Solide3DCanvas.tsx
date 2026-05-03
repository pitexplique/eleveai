// tutor-v4/components/Solide3DCanvas.tsx

/**
 * ============================================
 * 🎯 SOLIDE 3D CANVAS — Tutor V4
 * ============================================
 *
 * Ce composant permet d'afficher des solides en 3D
 * pour les exercices de volume en 6e / 5e.
 *
 * ✔ Solides supportés :
 * - cube
 * - pavé droit
 * - prisme droit
 * - cylindre
 * - assemblage de cubes (unités de volume)
 *
 * ✔ Objectifs pédagogiques :
 * - visualiser la base (aire de base)
 * - visualiser la hauteur
 * - comprendre la formule :
 *      V = aire de base × hauteur
 * - compter des cubes unités (volume discret)
 *
 * ✔ Points forts :
 * - base colorée automatiquement
 * - hauteur mise en évidence (rouge)
 * - labels dynamiques (L, l, h, r...)
 * - affichage formule optionnel
 * - support mobile (SVG responsive)
 *
 * ============================================
 * 🧪 EXEMPLE D’UTILISATION (QuestionBank)
 * ============================================
 *
 * canvas: {
 *   kind: "solide_3d",
 *   solide: "pave_droit",
 *
 *   dimensions: {
 *     longueur: 8,
 *     largeur: 3,
 *     hauteur: 5,
 *   },
 *
 *   labels: {
 *     longueur: "8 cm",
 *     largeur: "3 cm",
 *     hauteur: "5 cm",
 *     aireBase: "24 cm²",
 *   },
 *
 *   highlight: {
 *     base: true,
 *     hauteur: true,
 *   },
 *
 *   display: {
 *     showLabels: true,
 *     showDimensions: true,
 *     showFormulaHint: true,
 *   },
 * }
 *
 * 👉 Variante assemblage de cubes :
 *
 * canvas: {
 *   kind: "solide_3d",
 *   solide: "assemblage_cubes",
 *
 *   cubes: [
 *     { x: 0, y: 0, z: 0 },
 *     { x: 1, y: 0, z: 0 },
 *     { x: 0, y: 1, z: 0 },
 *     { x: 1, y: 1, z: 0 },
 *     { x: 0, y: 0, z: 1 },
 *   ],
 *
 *   display: {
 *     showLabels: true,
 *   },
 * }
 *
 * ============================================
 */

"use client";

"use client";

import type { ReactNode } from "react";
import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type SolideKind =
  | "cube"
  | "pave_droit"
  | "prisme"
  | "cylindre"
  | "assemblage_cubes";

type Point = {
  x: number;
  y: number;
};

type CubeCell3D = {
  x: number;
  y: number;
  z: number;
};

type Solide3DCanvasData = {
  kind: "solide_3d";
  solide: SolideKind;

  dimensions?: {
    longueur?: number;
    largeur?: number;
    hauteur?: number;
    cote?: number;
    rayon?: number;
    aireBase?: number;
  };

  labels?: {
    longueur?: string;
    largeur?: string;
    hauteur?: string;
    cote?: string;
    rayon?: string;
    aireBase?: string;
    volume?: string;
  };

  highlight?: {
    base?: boolean;
    hauteur?: boolean;
    volume?: boolean;
  };

  display?: {
    showLabels?: boolean;
    showDimensions?: boolean;
    showFormulaHint?: boolean;
    showUnitCubes?: boolean;
  };

  colors?: {
    baseFill?: string;
    baseStroke?: string;
    bodyFill?: string;
    bodyStroke?: string;
    heightStroke?: string;
    labelFill?: string;
    cubeFill?: string;
    cubeStroke?: string;
  };

  cubes?: CubeCell3D[];

  size?: {
    width?: number;
    height?: number;
  };
};

const DEFAULT_COLORS = {
  baseFill: "#fde68a",
  baseStroke: "#f59e0b",
  bodyFill: "#e0f2fe",
  bodyStroke: "#0f172a",
  heightStroke: "#dc2626",
  labelFill: "#0f172a",
  cubeFill: "#dbeafe",
  cubeStroke: "#1e40af",
};

function isSolide3D(figure: CanvasFigure): figure is Solide3DCanvasData {
  return figure.kind === "solide_3d";
}

function polygon(points: Point[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

function mid(a: Point, b: Point): Point {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

function Label({
  x,
  y,
  children,
  color = "#0f172a",
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
})   {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="15"
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

function DimensionLine({
  from,
  to,
  label,
  color = "#0369a1",
  labelOffset = { x: 0, y: 0 },
}: {
  from: Point;
  to: Point;
  label?: string;
  color?: string;
  labelOffset?: Point;
}) {
  const m = mid(from, to);

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <circle cx={from.x} cy={from.y} r={3.2} fill={color} />
      <circle cx={to.x} cy={to.y} r={3.2} fill={color} />
      {label ? (
        <Label x={m.x + labelOffset.x} y={m.y + labelOffset.y} color={color}>
          {label}
        </Label>
      ) : null}
    </g>
  );
}

function drawPaveOrCube({
  isCube,
  data,
  colors,
}: {
  isCube: boolean;
  data: Solide3DCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const highlightBase = data.highlight?.base ?? true;
  const highlightHeight = data.highlight?.hauteur ?? false;

  const showLabels = data.display?.showLabels ?? true;
  const showDimensions = data.display?.showDimensions ?? true;
  const showFormulaHint = data.display?.showFormulaHint ?? false;

  const frontA = { x: 82, y: 98 };
  const frontB = { x: 222, y: 98 };
  const frontC = { x: 222, y: 198 };
  const frontD = { x: 82, y: 198 };

  const depth = isCube ? { x: 48, y: -42 } : { x: 62, y: -38 };

  const backA = { x: frontA.x + depth.x, y: frontA.y + depth.y };
  const backB = { x: frontB.x + depth.x, y: frontB.y + depth.y };
  const backC = { x: frontC.x + depth.x, y: frontC.y + depth.y };
  const backD = { x: frontD.x + depth.x, y: frontD.y + depth.y };

  const baseLabel =
    data.labels?.aireBase ??
    (isCube ? "base carrée" : "base rectangulaire");

  const cote = data.labels?.cote ?? `${data.dimensions?.cote ?? "c"} cm`;
  const longueur =
    data.labels?.longueur ?? `${data.dimensions?.longueur ?? "L"} cm`;
  const largeur =
    data.labels?.largeur ?? `${data.dimensions?.largeur ?? "l"} cm`;
  const hauteur =
    data.labels?.hauteur ?? `${data.dimensions?.hauteur ?? "h"} cm`;

  return (
    <>
      {/* face arrière */}
      <polygon
        points={polygon([backA, backB, backC, backD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.78}
      />

      {/* face gauche */}
      <polygon
        points={polygon([frontA, backA, backD, frontD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.88}
      />

      {/* face droite */}
      <polygon
        points={polygon([frontB, backB, backC, frontC])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.95}
      />

      {/* base */}
      <polygon
        points={polygon([frontD, frontC, backC, backD])}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.5}
        opacity={highlightBase ? 0.95 : 0.85}
      />

      {/* face avant */}
      <polygon
        points={polygon([frontA, frontB, frontC, frontD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.55}
      />

      {/* arêtes visibles */}
      {[frontA, frontB, frontC, frontD].map((p, i) => {
        const q = [backA, backB, backC, backD][i];
        return (
          <line
            key={`edge-${i}`}
            x1={p.x}
            y1={p.y}
            x2={q.x}
            y2={q.y}
            stroke={colors.bodyStroke}
            strokeWidth={2.3}
          />
        );
      })}

      {showDimensions && (
        <>
          {isCube ? (
            <>
              <DimensionLine
                from={frontD}
                to={frontC}
                label={cote}
                labelOffset={{ x: 0, y: 20 }}
              />
              <DimensionLine
                from={frontC}
                to={backC}
                label={cote}
                labelOffset={{ x: 18, y: 14 }}
              />
              <DimensionLine
                from={frontB}
                to={frontC}
                label={cote}
                color={highlightHeight ? colors.heightStroke : "#0369a1"}
                labelOffset={{ x: 24, y: 2 }}
              />
            </>
          ) : (
            <>
              <DimensionLine
                from={frontD}
                to={frontC}
                label={longueur}
                labelOffset={{ x: 0, y: 20 }}
              />
              <DimensionLine
                from={frontC}
                to={backC}
                label={largeur}
                labelOffset={{ x: 22, y: 14 }}
              />
              <DimensionLine
                from={frontB}
                to={frontC}
                label={hauteur}
                color={highlightHeight ? colors.heightStroke : "#0369a1"}
                labelOffset={{ x: 24, y: 2 }}
              />
            </>
          )}
        </>
      )}

      {showLabels && highlightBase ? (
        <Label
          x={(frontD.x + frontC.x + backC.x + backD.x) / 4}
          y={(frontD.y + frontC.y + backC.y + backD.y) / 4 + 8}
          color={colors.baseStroke}
        >
          {baseLabel}
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = aire de base × hauteur
        </Label>
      ) : null}
    </>
  );
}

function drawPrisme({
  data,
  colors,
}: {
  data: Solide3DCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const highlightBase = data.highlight?.base ?? true;
  const highlightHeight = data.highlight?.hauteur ?? false;

  const showLabels = data.display?.showLabels ?? true;
  const showDimensions = data.display?.showDimensions ?? true;
  const showFormulaHint = data.display?.showFormulaHint ?? false;

  const A = { x: 76, y: 194 };
  const B = { x: 176, y: 194 };
  const C = { x: 126, y: 104 };

  const d = { x: 78, y: -36 };

  const A2 = { x: A.x + d.x, y: A.y + d.y };
  const B2 = { x: B.x + d.x, y: B.y + d.y };
  const C2 = { x: C.x + d.x, y: C.y + d.y };

  const hauteur =
    data.labels?.hauteur ?? `${data.dimensions?.hauteur ?? "h"} cm`;
  const aireBase =
    data.labels?.aireBase ??
    `${data.dimensions?.aireBase ?? "Aire base"} cm²`;

  return (
    <>
      {/* faces latérales */}
      <polygon
        points={polygon([A, B, B2, A2])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
        opacity={0.86}
      />
      <polygon
        points={polygon([B, C, C2, B2])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
        opacity={0.74}
      />
      <polygon
        points={polygon([C, A, A2, C2])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
        opacity={0.68}
      />

      {/* base triangulaire avant */}
      <polygon
        points={polygon([A, B, C])}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
      />

      {/* base arrière */}
      <polygon
        points={polygon([A2, B2, C2])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
        opacity={0.55}
      />

      {showDimensions ? (
        <DimensionLine
          from={B}
          to={B2}
          label={hauteur}
          color={highlightHeight ? colors.heightStroke : "#0369a1"}
          labelOffset={{ x: 26, y: -6 }}
        />
      ) : null}

      {showLabels && highlightBase ? (
        <Label x={126} y={170} color={colors.baseStroke}>
          {aireBase}
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = aire de base × hauteur
        </Label>
      ) : null}
    </>
  );
}

function drawCylindre({
  data,
  colors,
}: {
  data: Solide3DCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const highlightBase = data.highlight?.base ?? true;
  const highlightHeight = data.highlight?.hauteur ?? false;

  const showLabels = data.display?.showLabels ?? true;
  const showDimensions = data.display?.showDimensions ?? true;
  const showFormulaHint = data.display?.showFormulaHint ?? false;

  const cx = 170;
  const topY = 74;
  const bottomY = 190;
  const rx = 74;
  const ry = 24;

  const rayon = data.labels?.rayon ?? `${data.dimensions?.rayon ?? "r"} cm`;
  const hauteur =
    data.labels?.hauteur ?? `${data.dimensions?.hauteur ?? "h"} cm`;
  const aireBase =
    data.labels?.aireBase ??
    `${data.dimensions?.aireBase ?? "πr²"} cm²`;

  return (
    <>
      {/* corps */}
      <path
        d={`
          M ${cx - rx} ${topY}
          L ${cx - rx} ${bottomY}
          A ${rx} ${ry} 0 0 0 ${cx + rx} ${bottomY}
          L ${cx + rx} ${topY}
          A ${rx} ${ry} 0 0 0 ${cx - rx} ${topY}
        `}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.78}
      />

      {/* base inférieure coloriée */}
      <ellipse
        cx={cx}
        cy={bottomY}
        rx={rx}
        ry={ry}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
      />

      {/* ellipse supérieure */}
      <ellipse
        cx={cx}
        cy={topY}
        rx={rx}
        ry={ry}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
        opacity={0.9}
      />

      {/* rayon */}
      {showDimensions ? (
        <>
          <DimensionLine
            from={{ x: cx, y: bottomY }}
            to={{ x: cx + rx, y: bottomY }}
            label={rayon}
            labelOffset={{ x: 0, y: -12 }}
          />

          <DimensionLine
            from={{ x: cx + rx + 20, y: topY }}
            to={{ x: cx + rx + 20, y: bottomY }}
            label={hauteur}
            color={highlightHeight ? colors.heightStroke : "#0369a1"}
            labelOffset={{ x: 26, y: 4 }}
          />
        </>
      ) : null}

      {showLabels && highlightBase ? (
        <Label x={cx} y={bottomY + 8} color={colors.baseStroke}>
          {aireBase}
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = aire de base × hauteur
        </Label>
      ) : null}
    </>
  );
}

function isoPoint(cell: CubeCell3D, origin: Point, s: number): Point {
  const dx = 0.85 * s;
  const dy = 0.48 * s;
  const dz = s;

  return {
    x: origin.x + (cell.x - cell.y) * dx,
    y: origin.y + (cell.x + cell.y) * dy - cell.z * dz,
  };
}

function drawSmallCube({
  cell,
  origin,
  s,
  colors,
  highlightTop = false,
}: {
  cell: CubeCell3D;
  origin: Point;
  s: number;
  colors: typeof DEFAULT_COLORS;
  highlightTop?: boolean;
}) {
  const p = isoPoint(cell, origin, s);

  const dx = 0.85 * s;
  const dy = 0.48 * s;

  const top = [
    { x: p.x, y: p.y - s },
    { x: p.x + dx, y: p.y - s + dy },
    { x: p.x, y: p.y - s + 2 * dy },
    { x: p.x - dx, y: p.y - s + dy },
  ];

  const left = [
    { x: p.x - dx, y: p.y - s + dy },
    { x: p.x, y: p.y - s + 2 * dy },
    { x: p.x, y: p.y + 2 * dy },
    { x: p.x - dx, y: p.y + dy },
  ];

  const right = [
    { x: p.x + dx, y: p.y - s + dy },
    { x: p.x, y: p.y - s + 2 * dy },
    { x: p.x, y: p.y + 2 * dy },
    { x: p.x + dx, y: p.y + dy },
  ];

  return (
    <g key={`${cell.x}-${cell.y}-${cell.z}`}>
      <polygon
        points={polygon(left)}
        fill="#bfdbfe"
        stroke={colors.cubeStroke}
        strokeWidth={1.8}
      />
      <polygon
        points={polygon(right)}
        fill="#93c5fd"
        stroke={colors.cubeStroke}
        strokeWidth={1.8}
      />
      <polygon
        points={polygon(top)}
        fill={highlightTop ? colors.baseFill : colors.cubeFill}
        stroke={highlightTop ? colors.baseStroke : colors.cubeStroke}
        strokeWidth={highlightTop ? 2.4 : 1.8}
      />
    </g>
  );
}

function drawAssemblageCubes({
  data,
  colors,
}: {
  data: Solide3DCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const cubes =
    data.cubes ??
    [
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 0, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
    ];

  const highlightBase = data.highlight?.base ?? false;
  const showLabels = data.display?.showLabels ?? true;

  const origin = { x: 160, y: 170 };
  const s = 32;

  const sorted = [...cubes].sort((a, b) => {
    const da = a.x + a.y + a.z;
    const db = b.x + b.y + b.z;
    return da - db;
  });

  const maxZ = Math.max(...cubes.map((c) => c.z));

  return (
    <>
      {sorted.map((cell) =>
        drawSmallCube({
          cell,
          origin,
          s,
          colors,
          highlightTop: highlightBase && cell.z === maxZ,
        })
      )}

      {showLabels ? (
        <Label x={170} y={232} color="#1e40af">
          {cubes.length} cubes unités
        </Label>
      ) : null}
    </>
  );
}

export default function Solide3DCanvas({ figure }: Props) {
  if (!isSolide3D(figure)) return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 250;

  const colors = {
    ...DEFAULT_COLORS,
    ...(figure.colors ?? {}),
  };

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Solide en perspective"
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          rx={14}
          fill="white"
        />

        {figure.solide === "cube"
          ? drawPaveOrCube({
              isCube: true,
              data: figure,
              colors,
            })
          : null}

        {figure.solide === "pave_droit"
          ? drawPaveOrCube({
              isCube: false,
              data: figure,
              colors,
            })
          : null}

        {figure.solide === "prisme"
          ? drawPrisme({
              data: figure,
              colors,
            })
          : null}

        {figure.solide === "cylindre"
          ? drawCylindre({
              data: figure,
              colors,
            })
          : null}

        {figure.solide === "assemblage_cubes"
          ? drawAssemblageCubes({
              data: figure,
              colors,
            })
          : null}
      </svg>
    </div>
  );
}