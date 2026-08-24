// tutor-v4/components/Solide3DCanvas.tsx

"use client";

import type { ReactNode } from "react";
import type {
  CanvasFigure,
  Solide3DCanvasData,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type Point = {
  x: number;
  y: number;
};

type CubeCell3D = {
  x: number;
  y: number;
  z: number;
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
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      // ⚠️ 15 → 19 LE 24/08/2026, ET C'EST UNE MESURE, PAS UN GOÛT. Les cubes
      // sont projetés depuis une origine FIXE (160, 170) au pas de 32 px : la
      // largeur du viewBox ne met pas le dessin à l'échelle, elle le ROGNE.
      // `size.width` ne pouvait donc pas servir à grossir les lettres — seule la
      // police le peut. À 15 dans un cadre de 340, « 15 cubes unités » tombait à
      // 9,9 px dans une carte de propriété et à 8,8 dans un bloc d'exemple.
      fontSize="19"
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
      <polygon
        points={polygon([backA, backB, backC, backD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.78}
      />

      <polygon
        points={polygon([frontA, backA, backD, frontD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.88}
      />

      <polygon
        points={polygon([frontB, backB, backC, frontC])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.95}
      />

      <polygon
        points={polygon([frontD, frontC, backC, backD])}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.5}
        opacity={highlightBase ? 0.95 : 0.85}
      />

      <polygon
        points={polygon([frontA, frontB, frontC, frontD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.55}
      />

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

      {showDimensions ? (
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
      ) : null}

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

      <polygon
        points={polygon([A, B, C])}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
      />

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

      <ellipse
        cx={cx}
        cy={bottomY}
        rx={rx}
        ry={ry}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
      />

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

function drawCone({
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
  const baseY = 190;
  const top = { x: 170, y: 54 };
  const rx = 78;
  const ry = 25;

  const rayon = data.labels?.rayon ?? `${data.dimensions?.rayon ?? "r"} cm`;
  const hauteur =
    data.labels?.hauteur ?? `${data.dimensions?.hauteur ?? "h"} cm`;
  const aireBase = data.labels?.aireBase ?? "base";

  return (
    <>
      <path
        d={`
          M ${top.x} ${top.y}
          L ${cx - rx} ${baseY}
          A ${rx} ${ry} 0 0 0 ${cx + rx} ${baseY}
          Z
        `}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.82}
      />

      <ellipse
        cx={cx}
        cy={baseY}
        rx={rx}
        ry={ry}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
        opacity={0.95}
      />

      {showDimensions ? (
        <>
          <DimensionLine
            from={top}
            to={{ x: cx, y: baseY }}
            label={hauteur}
            color={highlightHeight ? colors.heightStroke : "#0369a1"}
            labelOffset={{ x: 25, y: 0 }}
          />

          <DimensionLine
            from={{ x: cx, y: baseY }}
            to={{ x: cx + rx, y: baseY }}
            label={rayon}
            color="#0369a1"
            labelOffset={{ x: 0, y: -12 }}
          />
        </>
      ) : null}

      <circle cx={cx} cy={baseY} r={3.5} fill="#0f172a" opacity={0.85} />

      {showLabels && highlightBase ? (
        <Label x={cx} y={baseY + 8} color={colors.baseStroke}>
          {aireBase}
        </Label>
      ) : null}

      {showLabels ? (
        <Label x={top.x} y={top.y - 10} color={colors.bodyStroke}>
          cône
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = aire de base × hauteur ÷ 3
        </Label>
      ) : null}
    </>
  );
}

function drawBoule({
  data,
  colors,
}: {
  data: Solide3DCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const showLabels = data.display?.showLabels ?? true;
  const showDimensions = data.display?.showDimensions ?? true;
  const showFormulaHint = data.display?.showFormulaHint ?? false;

  const cx = 170;
  const cy = 126;
  const r = 72;

  const rayon = data.labels?.rayon ?? `${data.dimensions?.rayon ?? "r"} cm`;
  const diametre =
    data.labels?.diametre ?? `${data.dimensions?.diametre ?? "2r"} cm`;

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={3}
        opacity={0.9}
      />

      <ellipse
        cx={cx}
        cy={cy}
        rx={r}
        ry={22}
        fill="none"
        stroke={colors.bodyStroke}
        strokeWidth={2}
        opacity={0.45}
      />

      <ellipse
        cx={cx + 8}
        cy={cy + 18}
        rx={42}
        ry={20}
        fill="#bfdbfe"
        opacity={0.45}
      />

      {showDimensions ? (
        <>
          <DimensionLine
            from={{ x: cx, y: cy }}
            to={{ x: cx + r, y: cy }}
            label={rayon}
            color="#0369a1"
            labelOffset={{ x: 0, y: -12 }}
          />

          <DimensionLine
            from={{ x: cx - r, y: cy + 48 }}
            to={{ x: cx + r, y: cy + 48 }}
            label={diametre}
            color="#7c3aed"
            labelOffset={{ x: 0, y: 22 }}
          />
        </>
      ) : null}

      <circle cx={cx} cy={cy} r={4} fill="#0f172a" />

      {showLabels ? (
        <Label x={cx} y={cy - r - 14} color={colors.bodyStroke}>
          boule
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = (4/3)πr³
        </Label>
      ) : null}
    </>
  );
}

function drawPyramide({
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

  const A = { x: 88, y: 188 };
  const B = { x: 222, y: 188 };
  const C = { x: 268, y: 146 };
  const D = { x: 132, y: 146 };

  const S = { x: 176, y: 58 };
  const O = { x: 178, y: 166 };

  const hauteur =
    data.labels?.hauteur ?? `${data.dimensions?.hauteur ?? "h"} cm`;

  const baseLabel = data.labels?.aireBase ?? "base";

  return (
    <>
      <polygon
        points={polygon([A, B, C, D])}
        fill={highlightBase ? colors.baseFill : colors.bodyFill}
        stroke={highlightBase ? colors.baseStroke : colors.bodyStroke}
        strokeWidth={highlightBase ? 3.2 : 2.6}
        opacity={0.9}
      />

      <polygon
        points={polygon([S, A, B])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.82}
      />

      <polygon
        points={polygon([S, B, C])}
        fill="#bfdbfe"
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.76}
      />

      <polygon
        points={polygon([S, C, D])}
        fill="#dbeafe"
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.62}
      />

      <polygon
        points={polygon([S, D, A])}
        fill="#e0f2fe"
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
        opacity={0.68}
      />

      {[A, B, C, D].map((p, i) => (
        <line
          key={`pyramide-edge-${i}`}
          x1={S.x}
          y1={S.y}
          x2={p.x}
          y2={p.y}
          stroke={colors.bodyStroke}
          strokeWidth={2.5}
        />
      ))}

      {showDimensions ? (
        <DimensionLine
          from={S}
          to={O}
          label={hauteur}
          color={highlightHeight ? colors.heightStroke : "#0369a1"}
          labelOffset={{ x: 24, y: 0 }}
        />
      ) : null}

      <circle cx={O.x} cy={O.y} r={3.5} fill="#0f172a" opacity={0.8} />

      {showLabels && highlightBase ? (
        <Label x={176} y={174} color={colors.baseStroke}>
          {baseLabel}
        </Label>
      ) : null}

      {showLabels ? (
        <Label x={S.x} y={S.y - 10} color={colors.bodyStroke}>
          pyramide
        </Label>
      ) : null}

      {showFormulaHint ? (
        <Label x={170} y={232} color="#16a34a">
          V = aire de base × hauteur ÷ 3
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

  // ⛔ LE COMPTE NE S'ECRIT PAS SUR LE SOLIDE (Frederic, 20/08, capture a
  // l'appui : « 24 cubes unités » etait pose au milieu du pave, blanc sur bleu,
  // en travers des aretes). Il etait fixe a (170, 232) en dur — donc au hasard
  // de la taille de l'assemblage. On calcule la boite reellement occupee par
  // les cubes projetes et on pose l'etiquette DESSOUS, centree.
  const dxIso = 0.85 * s;
  const dyIso = 0.48 * s;
  const projetes = cubes.map((c) => ({
    x: origin.x + (c.x - c.y) * dxIso,
    bas: origin.y + (c.x + c.y) * dyIso - c.z * s + dyIso,
  }));
  const labelX = (Math.min(...projetes.map((p) => p.x)) + Math.max(...projetes.map((p) => p.x))) / 2;
  const labelY = Math.max(...projetes.map((p) => p.bas)) + 26;

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
        <Label x={labelX} y={labelY} color="#1e40af">
          {cubes.length} cubes unités
        </Label>
      ) : null}
    </>
  );
}

export default function Solide3DCanvas({ figure }: Props) {
  if (!isSolide3D(figure)) return null;

  const width = figure.size?.width ?? 340;

  // ⚠️ UN ASSEMBLAGE DEBORDAIT DE SON CADRE. Les petits cubes sont projetes
  // depuis une origine fixe (160, 170) avec un pas de 32 px : un pave 4 x 3 x 2
  // descend jusqu'a y = 278, pour une hauteur de 250. Le bas du solide ET son
  // etiquette sortaient donc du viewBox, en silence. La hauteur par defaut suit
  // maintenant l'encombrement reel de l'assemblage (le reste des solides garde
  // ses 250).
  const hauteurAssemblage = (() => {
    if (figure.solide !== "assemblage_cubes" || !figure.cubes?.length) return null;
    const bas = Math.max(
      ...figure.cubes.map((c) => 170 + (c.x + c.y) * 0.48 * 32 - c.z * 32 + 0.48 * 32)
    );
    return Math.ceil(bas + 40);
  })();
  const height = figure.size?.height ?? Math.max(250, hauteurAssemblage ?? 0);

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

        {figure.solide === "cube" ? (
          drawPaveOrCube({
            isCube: true,
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "pave_droit" ? (
          drawPaveOrCube({
            isCube: false,
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "prisme" ? (
          drawPrisme({
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "cylindre" ? (
          drawCylindre({
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "cone" ? (
          drawCone({
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "boule" ? (
          drawBoule({
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "pyramide" ? (
          drawPyramide({
            data: figure,
            colors,
          })
        ) : null}

        {figure.solide === "assemblage_cubes" ? (
          drawAssemblageCubes({
            data: figure,
            colors,
          })
        ) : null}
      </svg>
    </div>
  );
}