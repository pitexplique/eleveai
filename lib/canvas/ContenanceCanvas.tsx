// lib/canvas/ContenanceCanvas.tsx
"use client";

import type {
  CanvasFigure,
  ContenanceCanvasData,
  ContenanceCanvasObject,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

function isContenanceCanvas(
  figure: CanvasFigure
): figure is ContenanceCanvasData {
  return figure.kind === "contenance";
}

function ContenantCard({
  objet,
  showContenances,
  showLabels,
}: {
  objet: ContenanceCanvasObject;
  showContenances: boolean;
  showLabels: boolean;
}) {
  return (
    <div className="flex min-w-[110px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-sky-50 px-3 py-3 shadow-sm">
      <div className="text-4xl leading-none">{objet.icon ?? "🥤"}</div>

      {showLabels ? (
        <div className="mt-2 text-center text-sm font-black text-slate-800">
          {objet.label}
        </div>
      ) : null}

      {showContenances && objet.contenance ? (
        <div className="mt-1 rounded-full bg-blue-100 px-3 py-1 text-sm font-black text-blue-800">
          {objet.contenance}
        </div>
      ) : null}
    </div>
  );
}

function compareContenances(
  gauche?: ContenanceCanvasObject,
  droite?: ContenanceCanvasObject
): "gauche" | "droite" | "egal" | null {
  if (gauche?.millilitres === undefined || droite?.millilitres === undefined) {
    return null;
  }

  if (gauche.millilitres > droite.millilitres) return "gauche";
  if (droite.millilitres > gauche.millilitres) return "droite";
  return "egal";
}

function BottleIcon({
  x,
  y,
  height,
  fillLevel,
  label,
}: {
  x: number;
  y: number;
  height: number;
  fillLevel: number;
  label?: string;
}) {
  const width = 52;
  const neckWidth = 22;
  const neckHeight = 22;
  const bodyHeight = height - neckHeight;
  const bodyY = y + neckHeight;
  const liquidHeight = bodyHeight * fillLevel;
  const liquidY = bodyY + bodyHeight - liquidHeight;

  return (
    <g>
      {/* bouchon */}
      <rect
        x={x + (width - neckWidth) / 2}
        y={y}
        width={neckWidth}
        height={10}
        rx={4}
        fill="#0f172a"
      />

      {/* col */}
      <rect
        x={x + (width - neckWidth) / 2}
        y={y + 8}
        width={neckWidth}
        height={neckHeight}
        rx={6}
        fill="#e0f2fe"
        stroke="#0f172a"
        strokeWidth={2}
      />

      {/* corps */}
      <rect
        x={x}
        y={bodyY}
        width={width}
        height={bodyHeight}
        rx={16}
        fill="#f8fafc"
        stroke="#0f172a"
        strokeWidth={2.5}
      />

      {/* liquide */}
      <rect
        x={x + 4}
        y={liquidY}
        width={width - 8}
        height={liquidHeight}
        rx={12}
        fill="#38bdf8"
        opacity={0.75}
      />

      {/* reflet */}
      <path
        d={`M ${x + 13} ${bodyY + 14} C ${x + 5} ${bodyY + 45}, ${
          x + 8
        } ${bodyY + 85}, ${x + 16} ${bodyY + 105}`}
        fill="none"
        stroke="white"
        strokeWidth={4}
        opacity={0.8}
        strokeLinecap="round"
      />

      {label ? (
        <text
          x={x + width / 2}
          y={y + height + 18}
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          fill="#0f172a"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

export default function ContenanceCanvas({ figure }: Props) {
  if (!isContenanceCanvas(figure)) return null;

  const showContenances = figure.display?.showContenances ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showComparison = figure.display?.showComparison ?? true;

  if (figure.variant === "objets") {
    const objets = figure.objets ?? [];

    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {objets.map((objet, index) => (
            <ContenantCard
              key={`${objet.label}-${index}`}
              objet={objet}
              showContenances={showContenances}
              showLabels={showLabels}
            />
          ))}
        </div>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  if (figure.variant === "comparaison") {
    const gauche = figure.gauche;
    const droite = figure.droite;
    const comparison = compareContenances(gauche, droite);

    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg
          viewBox="0 0 430 190"
          className="mb-2 block h-auto w-full"
          aria-label="Comparaison de contenances"
        >
          <rect x="0" y="0" width="430" height="190" rx="16" fill="white" />

          <BottleIcon
            x={92}
            y={22}
            height={125}
            fillLevel={
              comparison === "gauche"
                ? 0.9
                : comparison === "droite"
                  ? 0.55
                  : 0.75
            }
            label={gauche?.contenance}
          />

          <BottleIcon
            x={286}
            y={22}
            height={125}
            fillLevel={
              comparison === "droite"
                ? 0.9
                : comparison === "gauche"
                  ? 0.55
                  : 0.75
            }
            label={droite?.contenance}
          />

          {showComparison && comparison === "egal" ? (
            <text
              x="215"
              y="32"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill="#16a34a"
            >
              même contenance
            </text>
          ) : null}

          {showComparison && comparison === "gauche" ? (
            <text
              x="215"
              y="32"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill="#2563eb"
            >
              gauche contient plus
            </text>
          ) : null}

          {showComparison && comparison === "droite" ? (
            <text
              x="215"
              y="32"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill="#2563eb"
            >
              droite contient plus
            </text>
          ) : null}
        </svg>

        <div className="grid grid-cols-2 gap-3">
          {gauche ? (
            <ContenantCard
              objet={gauche}
              showContenances={showContenances}
              showLabels={showLabels}
            />
          ) : null}

          {droite ? (
            <ContenantCard
              objet={droite}
              showContenances={showContenances}
              showLabels={showLabels}
            />
          ) : null}
        </div>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  if (figure.variant === "conversion") {
    return (
      <div className="mx-auto w-full max-w-[380px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="rounded-2xl bg-sky-100 px-5 py-3 text-2xl font-black text-sky-900">
            {figure.from}
          </div>

          <div className="text-3xl font-black text-slate-700">=</div>

          <div className="rounded-2xl bg-emerald-100 px-5 py-3 text-2xl font-black text-emerald-900">
            {figure.to ?? "?"}
          </div>
        </div>

        <div className="mt-3 text-center text-sm font-bold text-slate-600">
          1 L = 1000 mL
        </div>

        {figure.questionLabel ? (
          <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
            {figure.questionLabel}
          </div>
        ) : null}
      </div>
    );
  }

  if (figure.variant === "estimation") {
    const objet = figure.objet;
    const choix = figure.choix ?? [];

    return (
      <div className="mx-auto w-full max-w-[430px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {objet ? (
          <div className="mb-3 flex justify-center">
            <ContenantCard
              objet={objet}
              showContenances={false}
              showLabels={showLabels}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {choix.map((choice) => (
            <div
              key={choice}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-black text-slate-800"
            >
              {choice}
            </div>
          ))}
        </div>

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