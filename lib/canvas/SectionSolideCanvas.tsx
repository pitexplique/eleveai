// lib/tutor-v4/components/SectionSolideCanvas.tsx

"use client";

import type { ReactNode } from "react";
import type { SectionSolideCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: SectionSolideCanvasData;
};

type Point = {
  x: number;
  y: number;
};

const DEFAULT_COLORS = {
  bodyFill: "#e0f2fe",
  bodyStroke: "#0f172a",
  sectionFill: "#fed7aa",
  sectionStroke: "#f97316",
  labelFill: "#0f172a",
};

function polygon(points: Point[]) {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

function Label({
  x,
  y,
  children,
  color = "#0f172a",
  size = 14,
}: {
  x: number;
  y: number;
  children: ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize={size}
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

function Callout({
  from,
  to,
  label,
  color = "#f97316",
}: {
  from: Point;
  to: Point;
  label: string;
  color?: string;
}) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const arrowSize = 7;

  const arrowA = {
    x: to.x - arrowSize * Math.cos(angle - Math.PI / 6),
    y: to.y - arrowSize * Math.sin(angle - Math.PI / 6),
  };

  const arrowB = {
    x: to.x - arrowSize * Math.cos(angle + Math.PI / 6),
    y: to.y - arrowSize * Math.sin(angle + Math.PI / 6),
  };

  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
      />

      <path
        d={`M ${arrowA.x} ${arrowA.y} L ${to.x} ${to.y} L ${arrowB.x} ${arrowB.y}`}
        fill="none"
        stroke={color}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x={from.x - 46}
        y={from.y - 18}
        width={92}
        height={24}
        rx={8}
        fill="white"
        stroke={color}
        strokeWidth={1.8}
      />

      <text
        x={from.x}
        y={from.y - 2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

function MiniLegend({
  colors,
}: {
  colors: typeof DEFAULT_COLORS;
}) {
  return (
    <g>
      <rect
        x={12}
        y={210}
        width={118}
        height={28}
        rx={8}
        fill="white"
        stroke="#cbd5e1"
        strokeWidth={1.5}
      />

      <rect
        x={22}
        y={219}
        width={14}
        height={10}
        rx={2}
        fill={colors.sectionFill}
        stroke={colors.sectionStroke}
        strokeWidth={1.8}
      />

      <text
        x={44}
        y={228}
        fontSize="11"
        fontWeight="800"
        fill="#0f172a"
      >
        plan de coupe
      </text>
    </g>
  );
}

function getSectionName(figure: SectionSolideCanvasData) {
  if (figure.labels?.section) return figure.labels.section;

  if (figure.solide === "cube") {
    if (figure.section === "parallele_face") return "carré";
    if (figure.section === "horizontale") return "carré";
    if (figure.section === "verticale") return "rectangle";
    if (figure.section === "diagonale") return "rectangle";
  }

  if (figure.solide === "pave_droit") {
    if (figure.section === "parallele_face") return "rectangle";
    if (figure.section === "horizontale") return "rectangle";
    if (figure.section === "verticale") return "rectangle";
    if (figure.section === "diagonale") return "rectangle";
  }

  if (figure.solide === "cylindre") {
    if (figure.section === "parallele_base") return "disque";
    if (figure.section === "parallele_axe") return "rectangle";
    if (figure.section === "verticale") return "rectangle";
    if (figure.section === "horizontale") return "disque";
  }

  if (figure.solide === "cone") {
    if (figure.section === "parallele_base") return "disque";
    if (figure.section === "verticale") return "triangle";
  }

  if (figure.solide === "pyramide") {
    if (figure.section === "parallele_base") return "réduction de la base";
    if (figure.section === "verticale") return "triangle";
  }

  return "section";
}

function getSolideName(figure: SectionSolideCanvasData) {
  if (figure.labels?.solide) return figure.labels.solide;

  if (figure.solide === "cube") return "cube";
  if (figure.solide === "pave_droit") return "pavé droit";
  if (figure.solide === "cylindre") return "cylindre";
  if (figure.solide === "cone") return "cône";
  if (figure.solide === "pyramide") return "pyramide";

  return "solide";
}

function drawPaveOrCube({
  figure,
  colors,
}: {
  figure: SectionSolideCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const isCube = figure.solide === "cube";
  const showPlane = figure.display?.showPlane ?? true;
  const showSectionName = figure.display?.showSectionName ?? true;

  const frontA = { x: 82, y: 96 };
  const frontB = { x: 220, y: 96 };
  const frontC = { x: 220, y: 190 };
  const frontD = { x: 82, y: 190 };

  const depth = isCube ? { x: 48, y: -40 } : { x: 62, y: -36 };

  const backA = { x: frontA.x + depth.x, y: frontA.y + depth.y };
  const backB = { x: frontB.x + depth.x, y: frontB.y + depth.y };
  const backC = { x: frontC.x + depth.x, y: frontC.y + depth.y };
  const backD = { x: frontD.x + depth.x, y: frontD.y + depth.y };

  const horizontalSection: Point[] = [
    { x: frontA.x + 24, y: frontA.y + 30 },
    { x: frontB.x - 24, y: frontB.y + 30 },
    { x: backB.x - 24, y: backB.y + 30 },
    { x: backA.x + 24, y: backA.y + 30 },
  ];

  const verticalSection: Point[] = [
    { x: frontA.x + 58, y: frontA.y },
    { x: frontA.x + 58 + depth.x, y: frontA.y + depth.y },
    { x: frontD.x + 58 + depth.x, y: frontD.y + depth.y },
    { x: frontD.x + 58, y: frontD.y },
  ];

  const diagonalSection: Point[] = [
    { x: frontA.x, y: frontA.y },
    { x: frontC.x, y: frontC.y },
    { x: backC.x, y: backC.y },
    { x: backA.x, y: backA.y },
  ];

  const sectionPoints =
    figure.section === "diagonale"
      ? diagonalSection
      : figure.section === "verticale"
      ? verticalSection
      : horizontalSection;

  return (
    <>
      <polygon
        points={polygon([backA, backB, backC, backD])}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.4}
        opacity={0.75}
      />

      <polygon
        points={polygon([frontA, backA, backD, frontD])}
        fill="#dbeafe"
        stroke={colors.bodyStroke}
        strokeWidth={2.4}
        opacity={0.86}
      />

      <polygon
        points={polygon([frontB, backB, backC, frontC])}
        fill="#bfdbfe"
        stroke={colors.bodyStroke}
        strokeWidth={2.4}
        opacity={0.9}
      />

      <polygon
        points={polygon([frontA, frontB, frontC, frontD])}
        fill="#eff6ff"
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.65}
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
            strokeWidth={2.2}
          />
        );
      })}

      {showPlane ? (
        <>
          <polygon
            points={polygon(sectionPoints)}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.86}
          />

          <Callout
            from={{ x: 278, y: 72 }}
            to={sectionPoints[1]}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 72 }}
            to={sectionPoints[0]}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showSectionName ? (
        <Label x={170} y={226} color={colors.sectionStroke}>
          Section : {getSectionName(figure)}
        </Label>
      ) : null}
    </>
  );
}

function drawCylindre({
  figure,
  colors,
}: {
  figure: SectionSolideCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const showPlane = figure.display?.showPlane ?? true;
  const showSectionName = figure.display?.showSectionName ?? true;

  const cx = 170;
  const topY = 68;
  const bottomY = 188;
  const rx = 72;
  const ry = 23;

  const isHorizontal =
    figure.section === "parallele_base" || figure.section === "horizontale";

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
        cy={topY}
        rx={rx}
        ry={ry}
        fill="#eff6ff"
        stroke={colors.bodyStroke}
        strokeWidth={2.4}
      />

      <ellipse
        cx={cx}
        cy={bottomY}
        rx={rx}
        ry={ry}
        fill="#dbeafe"
        stroke={colors.bodyStroke}
        strokeWidth={2.4}
      />

      {showPlane && isHorizontal ? (
        <>
          <ellipse
            cx={cx}
            cy={128}
            rx={rx}
            ry={ry}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.88}
          />

          <Callout
            from={{ x: 278, y: 72 }}
            to={{ x: cx + 42, y: 128 }}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 82 }}
            to={{ x: cx - 42, y: 128 }}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showPlane && !isHorizontal ? (
        <>
          <polygon
            points={polygon([
              { x: cx - 42, y: topY + 8 },
              { x: cx + 42, y: topY + 8 },
              { x: cx + 42, y: bottomY - 8 },
              { x: cx - 42, y: bottomY - 8 },
            ])}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.84}
          />

          <Callout
            from={{ x: 278, y: 72 }}
            to={{ x: cx + 42, y: 116 }}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 82 }}
            to={{ x: cx - 42, y: 116 }}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showSectionName ? (
        <Label x={170} y={226} color={colors.sectionStroke}>
          Section : {getSectionName(figure)}
        </Label>
      ) : null}
    </>
  );
}

function drawCone({
  figure,
  colors,
}: {
  figure: SectionSolideCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const showPlane = figure.display?.showPlane ?? true;
  const showSectionName = figure.display?.showSectionName ?? true;

  const top = { x: 170, y: 48 };
  const cx = 170;
  const baseY = 190;
  const rx = 76;
  const ry = 24;

  const isHorizontal = figure.section === "parallele_base";

  return (
    <>
      <path
        d={`M ${top.x} ${top.y} L ${cx - rx} ${baseY} A ${rx} ${ry} 0 0 0 ${
          cx + rx
        } ${baseY} Z`}
        fill={colors.bodyFill}
        stroke={colors.bodyStroke}
        strokeWidth={2.8}
        opacity={0.86}
      />

      <ellipse
        cx={cx}
        cy={baseY}
        rx={rx}
        ry={ry}
        fill="#dbeafe"
        stroke={colors.bodyStroke}
        strokeWidth={2.5}
      />

      {showPlane && isHorizontal ? (
        <>
          <ellipse
            cx={cx}
            cy={120}
            rx={42}
            ry={14}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.88}
          />

          <Callout
            from={{ x: 278, y: 82 }}
            to={{ x: cx + 34, y: 120 }}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 84 }}
            to={{ x: cx - 34, y: 120 }}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showPlane && !isHorizontal ? (
        <>
          <polygon
            points={polygon([
              top,
              { x: cx - 38, y: baseY - 8 },
              { x: cx + 38, y: baseY - 8 },
            ])}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.84}
          />

          <Callout
            from={{ x: 278, y: 82 }}
            to={{ x: cx + 18, y: 112 }}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 84 }}
            to={{ x: cx - 20, y: 126 }}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showSectionName ? (
        <Label x={170} y={226} color={colors.sectionStroke}>
          Section : {getSectionName(figure)}
        </Label>
      ) : null}
    </>
  );
}

function drawPyramide({
  figure,
  colors,
}: {
  figure: SectionSolideCanvasData;
  colors: typeof DEFAULT_COLORS;
}) {
  const showPlane = figure.display?.showPlane ?? true;
  const showSectionName = figure.display?.showSectionName ?? true;

  const S = { x: 170, y: 46 };
  const A = { x: 78, y: 190 };
  const B = { x: 220, y: 190 };
  const C = { x: 270, y: 150 };
  const D = { x: 128, y: 150 };

  const isHorizontal = figure.section === "parallele_base";

  const sectionPoints: Point[] = isHorizontal
    ? [
        { x: 126, y: 144 },
        { x: 192, y: 144 },
        { x: 218, y: 124 },
        { x: 150, y: 124 },
      ]
    : [
        S,
        { x: 122, y: 180 },
        { x: 232, y: 166 },
      ];

  return (
    <>
      <polygon
        points={polygon([A, B, C, D])}
        fill="#dbeafe"
        stroke={colors.bodyStroke}
        strokeWidth={2.6}
      />

      <line x1={S.x} y1={S.y} x2={A.x} y2={A.y} stroke={colors.bodyStroke} strokeWidth={2.6} />
      <line x1={S.x} y1={S.y} x2={B.x} y2={B.y} stroke={colors.bodyStroke} strokeWidth={2.6} />
      <line x1={S.x} y1={S.y} x2={C.x} y2={C.y} stroke={colors.bodyStroke} strokeWidth={2.6} />
      <line x1={S.x} y1={S.y} x2={D.x} y2={D.y} stroke={colors.bodyStroke} strokeWidth={2.6} />

      <line
        x1={A.x}
        y1={A.y}
        x2={C.x}
        y2={C.y}
        stroke="#64748b"
        strokeWidth={1.6}
        strokeDasharray="5 4"
        opacity={0.6}
      />
      <line
        x1={B.x}
        y1={B.y}
        x2={D.x}
        y2={D.y}
        stroke="#64748b"
        strokeWidth={1.6}
        strokeDasharray="5 4"
        opacity={0.6}
      />

      {showPlane ? (
        <>
          <polygon
            points={polygon(sectionPoints)}
            fill={colors.sectionFill}
            stroke={colors.sectionStroke}
            strokeWidth={3.2}
            opacity={0.86}
          />

          <Callout
            from={{ x: 278, y: 76 }}
            to={isHorizontal ? { x: 210, y: 132 } : { x: 210, y: 150 }}
            label="plan"
            color={colors.sectionStroke}
          />

          <Callout
            from={{ x: 62, y: 82 }}
            to={isHorizontal ? { x: 138, y: 138 } : { x: 134, y: 160 }}
            label="section"
            color="#16a34a"
          />
        </>
      ) : null}

      {showSectionName ? (
        <Label x={170} y={226} color={colors.sectionStroke}>
          Section : {getSectionName(figure)}
        </Label>
      ) : null}
    </>
  );
}

export default function SectionSolideCanvas({ figure }: Props) {
  if (figure.kind !== "section_solide") return null;

  const width = figure.size?.width ?? 340;
  const height = figure.size?.height ?? 250;

  const colors = {
    ...DEFAULT_COLORS,
    ...(figure.colors ?? {}),
  };

  const showLabels = figure.display?.showLabels ?? true;
  const showMiniLegend = figure.display?.showPlane !== false;

  return (
    <div className="mx-auto w-full max-w-[340px] rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        aria-label="Section plane d’un solide"
      >
        <rect x={0} y={0} width={width} height={height} rx={14} fill="white" />

        {showLabels ? (
          <Label x={170} y={24} color={colors.labelFill} size={13}>
            {figure.labels?.titre ?? `Section d’un ${getSolideName(figure)}`}
          </Label>
        ) : null}

        {figure.solide === "cube" || figure.solide === "pave_droit"
          ? drawPaveOrCube({ figure, colors })
          : null}

        {figure.solide === "cylindre"
          ? drawCylindre({ figure, colors })
          : null}

        {figure.solide === "cone"
          ? drawCone({ figure, colors })
          : null}

        {figure.solide === "pyramide"
          ? drawPyramide({ figure, colors })
          : null}

        {showMiniLegend ? <MiniLegend colors={colors} /> : null}
      </svg>
    </div>
  );
}