// lib/canvas/EchelleCanvas.tsx
"use client";

import { typographier } from "@/lib/fiches/typographie";

import type {
  CanvasFigure,
  EchelleCanvasData,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

function isEchelleCanvas(figure: CanvasFigure): figure is EchelleCanvasData {
  return figure.kind === "echelle";
}

function Segment({
  x1,
  x2,
  y,
  label,
  color = "#2563eb",
  dashed = false,
}: {
  x1: number;
  x2: number;
  y: number;
  label?: string;
  color?: string;
  dashed?: boolean;
}) {
  const mid = (x1 + x2) / 2;

  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={color}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={dashed ? "8 8" : undefined}
      />

      <circle cx={x1} cy={y} r={6} fill="#0f172a" />
      <circle cx={x2} cy={y} r={6} fill="#0f172a" />

      <text
        x={x1}
        y={y - 12}
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#0f172a"
      >
        A
      </text>

      <text
        x={x2}
        y={y - 12}
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#0f172a"
      >
        B
      </text>

      {label ? (
        <text
          x={mid}
          y={y + 28}
          textAnchor="middle"
          fontSize="17"
          fontWeight="900"
          fill={color}
          stroke="white"
          strokeWidth={3}
          paintOrder="stroke"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function RatioBox({ label }: { label?: string }) {
  if (!label) return null;

  return (
    <div className="mb-3 rounded-2xl bg-indigo-50 px-4 py-2 text-center text-sm font-black text-indigo-900 ring-1 ring-indigo-100">
      Échelle : {label}
    </div>
  );
}

export default function EchelleCanvas({ figure: brute }: Props) {
  // ⛔ MÊME DÉFAUT LATENT QUE `CalculPoseCanvas`, MÊME GESTE. Ce canvas dessine
  // en SVG, mais son `questionLabel` est rendu dans un `<div>` HTML sous le
  // dessin — donc coupé par le navigateur, donc concerné. Le SVG, lui, ne coupe
  // jamais ses lignes : l'insécable y est inerte, et elle ne change aucune
  // largeur (elle remplace une suite d'espaces, elle n'en ajoute jamais).
  // Voir `lib/fiches/typographie.ts`.
  const figure = typographier(brute);

  if (!isEchelleCanvas(figure)) return null;

  const width = figure.size?.width ?? 420;
  const height = figure.size?.height ?? 240;

  const showEchelle = figure.display?.showEchelle ?? true;
  const showLabels = figure.display?.showLabels ?? true;

  const startLabel = figure.points?.start ?? "A";
  const endLabel = figure.points?.end ?? "B";

  if (figure.variant === "correspondance") {
    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {figure.title ? (
          <div className="mb-2 text-center text-base font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        {showEchelle ? <RatioBox label={figure.echelleLabel} /> : null}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          aria-label="Correspondance d’échelle"
        >
          <rect x="0" y="0" width={width} height={height} rx="16" fill="white" />

          <text
            x="36"
            y="72"
            fontSize="15"
            fontWeight="900"
            fill="#475569"
          >
            PLAN
          </text>

          <line
            x1="120"
            y1="68"
            x2="210"
            y2="68"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle cx="120" cy="68" r="5" fill="#0f172a" />
          <circle cx="210" cy="68" r="5" fill="#0f172a" />

          <text
            x="165"
            y="98"
            textAnchor="middle"
            fontSize="17"
            fontWeight="900"
            fill="#2563eb"
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {figure.planLabel ?? "1 cm sur le plan"}
          </text>

          <text
            x="36"
            y="158"
            fontSize="15"
            fontWeight="900"
            fill="#475569"
          >
            RÉALITÉ
          </text>

          <line
            x1="120"
            y1="154"
            x2="330"
            y2="154"
            stroke="#16a34a"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle cx="120" cy="154" r="5" fill="#0f172a" />
          <circle cx="330" cy="154" r="5" fill="#0f172a" />

          <text
            x="225"
            y="184"
            textAnchor="middle"
            fontSize="17"
            fontWeight="900"
            fill="#16a34a"
            stroke="white"
            strokeWidth="3"
            paintOrder="stroke"
          >
            {figure.reelLabel ?? "distance réelle"}
          </text>

          <path
            d="M 220 86 C 255 90, 270 112, 278 132"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            markerEnd="url(#arrow)"
          />

          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  if (figure.variant === "distance_reelle") {
    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {figure.title ? (
          <div className="mb-2 text-center text-base font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        {showEchelle ? <RatioBox label={figure.echelleLabel} /> : null}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          aria-label="Distance réelle à calculer"
        >
          <rect x="0" y="0" width={width} height={height} rx="16" fill="white" />

          {showLabels ? (
            <>
              <text x="32" y="70" fontSize="15" fontWeight="900" fill="#475569">
                PLAN
              </text>
              <text x="32" y="164" fontSize="15" fontWeight="900" fill="#475569">
                RÉALITÉ
              </text>
            </>
          ) : null}

          <Segment
            x1={115}
            x2={250}
            y={68}
            label={figure.planDistance ?? "?"}
            color="#2563eb"
          />

          <Segment
            x1={115}
            x2={345}
            y={162}
            label={figure.reelDistance ?? "?"}
            color={figure.reelDistance === "?" || !figure.reelDistance ? "#f59e0b" : "#16a34a"}
            dashed={figure.reelDistance === "?" || !figure.reelDistance}
          />

          <text
            x="210"
            y="120"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#64748b"
          >
            on cherche la distance réelle
          </text>
        </svg>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  if (figure.variant === "distance_plan") {
    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {figure.title ? (
          <div className="mb-2 text-center text-base font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        {showEchelle ? <RatioBox label={figure.echelleLabel} /> : null}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full"
          aria-label="Distance sur le plan à calculer"
        >
          <rect x="0" y="0" width={width} height={height} rx="16" fill="white" />

          {showLabels ? (
            <>
              <text x="32" y="70" fontSize="15" fontWeight="900" fill="#475569">
                PLAN
              </text>
              <text x="32" y="164" fontSize="15" fontWeight="900" fill="#475569">
                RÉALITÉ
              </text>
            </>
          ) : null}

          <Segment
            x1={115}
            x2={250}
            y={68}
            label={figure.planDistance ?? "?"}
            color={figure.planDistance === "?" || !figure.planDistance ? "#f59e0b" : "#2563eb"}
            dashed={figure.planDistance === "?" || !figure.planDistance}
          />

          <Segment
            x1={115}
            x2={345}
            y={162}
            label={figure.reelDistance ?? "?"}
            color="#16a34a"
          />

          <text
            x="210"
            y="120"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#64748b"
          >
            on cherche la distance sur le plan
          </text>
        </svg>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  return null;
}