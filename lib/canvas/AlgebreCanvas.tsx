// lib/canvas/AlgebreCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type AlgebreTheme =
  | "margouillat"
  | "pomme"
  | "eau"
  | "dechet"
  | "surf"
  | "jeu_video"
  | "tresor"
  | "pieces"
  | "requin"
  | "pi";

type AlgebreCanvasData = {
  kind: "algebre";
  theme?: AlgebreTheme;
  titre?: string;
  groupesCaches?: number;
  objetsVisibles?: number;
  symbole?: string;
  expression?: string;
  phrase?: string;
  display?: {
    showConcret?: boolean;
    showExpression?: boolean;
    showPhrase?: boolean;
    showLabels?: boolean;
  };
};

const THEME_ICONS: Record<
  AlgebreTheme,
  {
    visible: string;
    cache: string;
    labelVisible: string;
    labelCache: string;
  }
> = {
  margouillat: {
    visible: "🦎",
    cache: "🌿",
    labelVisible: "margouillat",
    labelCache: "feuille",
  },

  pomme: {
    visible: "🍎",
    cache: "🧺",
    labelVisible: "pomme",
    labelCache: "panier",
  },

  eau: {
    visible: "💧",
    cache: "🛢️",
    labelVisible: "litre d’eau",
    labelCache: "réservoir",
  },

  dechet: {
    visible: "🥫",
    cache: "🗑️",
    labelVisible: "déchet",
    labelCache: "sac-poubelle",
  },

  surf: {
    visible: "🏄",
    cache: "🌊",
    labelVisible: "vague surfée",
    labelCache: "session de surf",
  },

  jeu_video: {
    visible: "🎮",
    cache: "⭐",
    labelVisible: "niveau",
    labelCache: "score inconnu",
  },

  tresor: {
    visible: "🧰",
    cache: "💎",
    labelVisible: "coffre",
    labelCache: "trésor inconnu",
  },

  pieces: {
    visible: "🪙",
    cache: "🫙",
    labelVisible: "pièce",
    labelCache: "bocal de pièces",
  },

  requin: {
    visible: "🦈",
    cache: "🪸",
    labelVisible: "requin",
    labelCache: "zone du récif",
  },

  pi: {
    visible: "π",
    cache: "🧠",
    labelVisible: "symbole",
    labelCache: "idée inconnue",
  },
};

function isAlgebreCanvas(figure: CanvasFigure): figure is AlgebreCanvasData {
  return figure.kind === "algebre";
}

function getExpression({
  groupesCaches,
  objetsVisibles,
  symbole,
}: {
  groupesCaches: number;
  objetsVisibles: number;
  symbole: string;
}) {
  const parts: string[] = [];

  if (groupesCaches > 0) {
    if (groupesCaches === 1) {
      parts.push(symbole);
    } else {
      parts.push(`${groupesCaches}${symbole}`);
    }
  }

  if (objetsVisibles > 0) {
    parts.push(String(objetsVisibles));
  }

  return parts.length > 0 ? parts.join(" + ") : "0";
}

function RepeatedHiddenGroups({
  icon,
  count,
  symbole,
  showLabels,
  label,
}: {
  icon: string;
  count: number;
  symbole: string;
  showLabels: boolean;
  label: string;
}) {
  if (count <= 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`hidden-${index}`}
          className="flex min-w-16 flex-col items-center rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 shadow-sm"
        >
          <div className="text-3xl leading-none">{icon}</div>

          <div className="mt-1 rounded-full bg-white px-2 py-0.5 text-sm font-black text-amber-700 shadow-sm">
            {symbole}
          </div>

          {showLabels ? (
            <div className="mt-1 text-center text-[10px] font-semibold text-slate-500">
              {label}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function RepeatedVisibleObjects({
  icon,
  count,
  showLabels,
  label,
}: {
  icon: string;
  count: number;
  showLabels: boolean;
  label: string;
}) {
  if (count <= 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={`visible-${index}`}
          className="flex min-w-12 flex-col items-center rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 shadow-sm"
        >
          <div className="text-3xl leading-none">{icon}</div>

          {showLabels ? (
            <div className="mt-1 text-center text-[10px] font-semibold text-slate-500">
              {label}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function AlgebreCanvas({ figure }: Props) {
  if (!isAlgebreCanvas(figure)) return null;

  const theme = figure.theme ?? "margouillat";
  const icons = THEME_ICONS[theme];

  const groupesCaches = figure.groupesCaches ?? 0;
  const objetsVisibles = figure.objetsVisibles ?? 0;
  const symbole = figure.symbole ?? "x";

  const showConcret = figure.display?.showConcret ?? true;
  const showExpression = figure.display?.showExpression ?? true;
  const showPhrase = figure.display?.showPhrase ?? true;
  const showLabels = figure.display?.showLabels ?? true;

  const expression =
    figure.expression ??
    getExpression({
      groupesCaches,
      objetsVisibles,
      symbole,
    });

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {figure.titre ? (
        <div className="mb-3 text-center text-sm font-black text-slate-800">
          {figure.titre}
        </div>
      ) : null}

      {showConcret ? (
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <div className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
            Situation concrète
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <RepeatedHiddenGroups
              icon={icons.cache}
              count={groupesCaches}
              symbole={symbole}
              showLabels={showLabels}
              label={icons.labelCache}
            />

            {groupesCaches > 0 && objetsVisibles > 0 ? (
              <div className="text-2xl font-black text-slate-400">+</div>
            ) : null}

            <RepeatedVisibleObjects
              icon={icons.visible}
              count={objetsVisibles}
              showLabels={showLabels}
              label={icons.labelVisible}
            />
          </div>
        </div>
      ) : null}

      {showExpression ? (
        <>
          <div className="my-3 flex items-center justify-center">
            <div className="rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">
              je modélise
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4 text-center">
            <div className="text-xs font-bold uppercase tracking-wide text-violet-500">
              Écriture algébrique
            </div>

            <div className="mt-1 text-3xl font-black text-violet-800">
              {expression}
            </div>
          </div>
        </>
      ) : null}

      {showPhrase && figure.phrase ? (
        <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-center text-xs font-semibold leading-relaxed text-slate-600">
          {figure.phrase}
        </p>
      ) : null}
    </div>
  );
}