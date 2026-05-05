// lib/tutor-v4/components/FonctionTableauCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

export default function FonctionTableauCanvas({ figure }: Props) {
  if (figure.kind !== "fonction_tableau") return null;

  const xValues = figure.xValues;
  const yValues = figure.yValues;
  const highlightIndex = figure.highlightIndex;
  const missing = figure.missing;

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-3 text-center text-sm font-black text-slate-800">
          {figure.titre}
        </div>
      ) : null}

      <table className="w-full border-collapse overflow-hidden rounded-lg text-center text-sm">
        <tbody>
          <tr>
            <th className="border border-slate-300 bg-slate-100 px-3 py-2 font-black text-slate-900">
              x
            </th>

            {xValues.map((x, index) => {
              const isHighlighted = highlightIndex === index;
              const isMissing =
                missing?.type === "antecedent" && missing.index === index;

              return (
                <td
                  key={`x-${index}`}
                  className={`border border-slate-300 px-3 py-2 font-bold ${
                    isHighlighted ? "bg-amber-100 text-amber-800" : "text-slate-800"
                  }`}
                >
                  {isMissing ? "?" : x}
                </td>
              );
            })}
          </tr>

          <tr>
            <th className="border border-slate-300 bg-sky-100 px-3 py-2 font-black text-sky-900">
              f(x)
            </th>

            {yValues.map((y, index) => {
              const isHighlighted = highlightIndex === index;
              const isMissing =
                missing?.type === "image" && missing.index === index;

              return (
                <td
                  key={`fx-${index}`}
                  className={`border border-slate-300 px-3 py-2 font-bold ${
                    isHighlighted ? "bg-amber-100 text-amber-800" : "text-slate-800"
                  }`}
                >
                  {isMissing ? "?" : y}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>

      {figure.consigne ? (
        <p className="mt-3 text-center text-xs font-semibold text-slate-600">
          {figure.consigne}
        </p>
      ) : null}
    </div>
  );
}