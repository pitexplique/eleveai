"use client";

import type { CanvasFigure, SuiteCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

const THEME_ICONS: Record<
  NonNullable<SuiteCanvasData["theme"]>,
  {
    icon: string;
    label: string;
  }
> = {
  nombre: {
    icon: "🔢",
    label: "nombre",
  },
  margouillat: {
    icon: "🦎",
    label: "margouillat",
  },
  pieces: {
    icon: "🪙",
    label: "pièce",
  },
  eau: {
    icon: "💧",
    label: "goutte d’eau",
  },
  dechet: {
    icon: "🥫",
    label: "déchet",
  },
  jeu_video: {
    icon: "🎮",
    label: "niveau",
  },
  surf: {
    icon: "🏄",
    label: "surf",
  },
  requin: {
    icon: "🦈",
    label: "requin",
  },
  pi: {
    icon: "π",
    label: "symbole",
  },
};

function isSuiteCanvas(figure: CanvasFigure): figure is SuiteCanvasData {
  return figure.kind === "suite";
}

function displayTerm(term: number | string) {
  if (typeof term === "number") {
    return Number.isInteger(term) ? String(term) : String(term).replace(".", ",");
  }

  return term;
}

function IconDisplay({
  icon,
  value,
}: {
  icon: string;
  value: number | string;
}) {
  if (typeof value !== "number") {
    return (
      <div className="text-3xl font-black leading-none text-violet-800">
        {value}
      </div>
    );
  }

  if (value <= 0) {
    return (
      <div className="text-2xl font-black leading-none text-slate-500">
        {displayTerm(value)}
      </div>
    );
  }

  if (value <= 6) {
    return (
      <div className="flex max-w-[90px] flex-wrap justify-center gap-0.5 text-xl leading-none">
        {Array.from({ length: value }, (_, index) => (
          <span key={index}>{icon}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1 text-xl font-black text-slate-800">
      <span className="text-2xl">{icon}</span>
      <span>× {displayTerm(value)}</span>
    </div>
  );
}

export default function SuiteCanvas({ figure }: Props) {
  if (!isSuiteCanvas(figure)) return null;

  const theme = figure.theme ?? "nombre";
  const iconData = THEME_ICONS[theme];

  const terms = figure.terms ?? [];
  const arrows = figure.arrows ?? [];

  const showIcons = figure.display?.showIcons ?? theme !== "nombre";
  const showArrows = figure.display?.showArrows ?? true;
  const showRule = figure.display?.showRule ?? false;
  const showLabels = figure.display?.showLabels ?? true;

  return (
    <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {figure.titre ? (
        <div className="mb-3 text-center text-sm font-black text-slate-800">
          {figure.titre}
        </div>
      ) : null}

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
        <div className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
          Suite
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {terms.map((term, index) => {
            const isMissing =
              figure.missingIndex === index ||
              term === "?" ||
              term === "…";

            return (
              <div
                key={`${term}-${index}`}
                className="flex items-center justify-center gap-2"
              >
                <div
                  className={`flex min-h-20 min-w-20 flex-col items-center justify-center rounded-2xl border px-3 py-2 shadow-sm ${
                    isMissing
                      ? "border-violet-300 bg-violet-50 text-violet-900"
                      : "border-sky-200 bg-white text-slate-900"
                  }`}
                >
                  {showIcons && !isMissing ? (
                    <IconDisplay icon={iconData.icon} value={term} />
                  ) : (
                    <div
                      className={`text-2xl font-black ${
                        isMissing ? "text-violet-800" : "text-slate-900"
                      }`}
                    >
                      {displayTerm(term)}
                    </div>
                  )}

                  {showLabels ? (
                    <div className="mt-1 text-center text-[10px] font-semibold text-slate-500">
                      terme {index + 1}
                    </div>
                  ) : null}
                </div>

                {index < terms.length - 1 ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-black text-slate-400">→</div>

                    {showArrows && arrows[index] ? (
                      <div className="mt-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-black text-amber-700">
                        {arrows[index]}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {showRule && figure.rule ? (
        <div className="mt-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-center">
          <div className="text-xs font-bold uppercase tracking-wide text-emerald-600">
            Règle
          </div>
          <div className="mt-1 text-sm font-black text-emerald-800">
            {figure.rule}
          </div>
        </div>
      ) : null}

      {figure.phrase ? (
        <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-semibold leading-relaxed text-slate-600">
          {figure.phrase}
        </p>
      ) : null}
    </div>
  );
}