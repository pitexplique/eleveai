// tutor-v4/components/MasseCanvas.tsx
"use client";

import type {
  CanvasFigure,
  MasseCanvasData,
  MasseCanvasObject,
} from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

function isMasseCanvas(figure: CanvasFigure): figure is MasseCanvasData {
  return figure.kind === "masse";
}

function ObjetCard({
  objet,
  showMasses,
  showLabels,
}: {
  objet: MasseCanvasObject;
  showMasses: boolean;
  showLabels: boolean;
}) {
  return (
    <div className="flex min-w-[110px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 shadow-sm">
      <div className="text-4xl leading-none">{objet.icon ?? "📦"}</div>

      {showLabels ? (
        <div className="mt-2 text-center text-sm font-black text-slate-800">
          {objet.label}
        </div>
      ) : null}

      {showMasses && objet.masse ? (
        <div className="mt-1 rounded-full bg-sky-100 px-3 py-1 text-sm font-black text-sky-800">
          {objet.masse}
        </div>
      ) : null}
    </div>
  );
}

function compareMasses(
  gauche?: MasseCanvasObject,
  droite?: MasseCanvasObject
): "gauche" | "droite" | "egal" | null {
  if (gauche?.grammes === undefined || droite?.grammes === undefined) {
    return null;
  }

  if (gauche.grammes > droite.grammes) return "gauche";
  if (droite.grammes > gauche.grammes) return "droite";
  return "egal";
}

export default function MasseCanvas({ figure }: Props) {
  if (!isMasseCanvas(figure)) return null;

  const showMasses = figure.display?.showMasses ?? true;
  const showLabels = figure.display?.showLabels ?? true;
  const showComparison = figure.display?.showComparison ?? true;

  if (figure.variant === "objets") {
    const objets = figure.objets ?? [];

    return (
      <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {objets.map((objet, index) => (
            <ObjetCard
              key={`${objet.label}-${index}`}
              objet={objet}
              showMasses={showMasses}
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

  if (figure.variant === "balance") {
    const gauche = figure.gauche;
    const droite = figure.droite;
    const comparison = compareMasses(gauche, droite);

    const leftDown = comparison === "gauche";
    const rightDown = comparison === "droite";

    return (
      <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <svg
          viewBox="0 0 420 170"
          className="mb-2 block h-auto w-full"
          aria-label="Balance de masses"
        >
          <rect x="0" y="0" width="420" height="170" rx="16" fill="white" />

          {/* axe central */}
          <line
            x1="210"
            y1="55"
            x2="210"
            y2="135"
            stroke="#0f172a"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <polygon
            points="170,148 250,148 230,132 190,132"
            fill="#e2e8f0"
            stroke="#0f172a"
            strokeWidth="3"
          />

          {/* fléau */}
          <line
            x1="95"
            y1={leftDown ? 75 : rightDown ? 45 : 60}
            x2="325"
            y2={rightDown ? 75 : leftDown ? 45 : 60}
            stroke="#0f172a"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <circle cx="210" cy="60" r="8" fill="#0f172a" />

          {/* plateaux */}
          <line
            x1="115"
            y1={leftDown ? 75 : rightDown ? 45 : 60}
            x2="115"
            y2={leftDown ? 105 : rightDown ? 75 : 90}
            stroke="#64748b"
            strokeWidth="3"
          />
          <line
            x1="305"
            y1={rightDown ? 75 : leftDown ? 45 : 60}
            x2="305"
            y2={rightDown ? 105 : leftDown ? 75 : 90}
            stroke="#64748b"
            strokeWidth="3"
          />

          <ellipse
            cx="115"
            cy={leftDown ? 112 : rightDown ? 82 : 97}
            rx="55"
            ry="13"
            fill="#dbeafe"
            stroke="#1e40af"
            strokeWidth="3"
          />
          <ellipse
            cx="305"
            cy={rightDown ? 112 : leftDown ? 82 : 97}
            rx="55"
            ry="13"
            fill="#dbeafe"
            stroke="#1e40af"
            strokeWidth="3"
          />

          {showComparison && comparison === "egal" ? (
            <text
              x="210"
              y="30"
              textAnchor="middle"
              fontSize="16"
              fontWeight="900"
              fill="#16a34a"
            >
              même masse
            </text>
          ) : null}
        </svg>

        <div className="grid grid-cols-2 gap-3">
          {gauche ? (
            <ObjetCard
              objet={gauche}
              showMasses={showMasses}
              showLabels={showLabels}
            />
          ) : null}

          {droite ? (
            <ObjetCard
              objet={droite}
              showMasses={showMasses}
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
          1 kg = 1000 g
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
      <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        {objet ? (
          <div className="mb-3 flex justify-center">
            <ObjetCard
              objet={objet}
              showMasses={false}
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