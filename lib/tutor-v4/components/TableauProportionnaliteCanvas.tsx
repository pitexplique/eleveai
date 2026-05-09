"use client";

import { useState } from "react";

type MissingCell = {
  row: number;
  col: number;
};

export type CanvasTableauProportionnalite = {
  kind: "tableau_proportionnalite";
  rows: number;
  cols: number;
  values: (string | "")[][];
  missing: MissingCell[];
  rowLabels?: string[];
  colLabels?: string[];
};

type Props = {
  figure: CanvasTableauProportionnalite;
  onChange?: (answers: string[]) => void;
};

export default function TableauProportionnaliteCanvas({
  figure,
  onChange,
}: Props) {
  const { values, missing, rowLabels, colLabels } = figure;
  const [inputs, setInputs] = useState<Record<string, string>>({});

  function isMissing(row: number, col: number) {
    return missing.some((m) => m.row === row && m.col === col);
  }

  function handleChange(row: number, col: number, value: string) {
    const key = `${row}-${col}`;
    const updated = { ...inputs, [key]: value };

    setInputs(updated);

    if (onChange) {
      const answers = missing.map((m) => updated[`${m.row}-${m.col}`] || "");
      onChange(answers);
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <table className="w-full border-collapse text-center">
        {colLabels && (
          <thead>
            <tr>
              {rowLabels ? <th className="p-2" /> : null}
              {colLabels.map((label, i) => (
                <th key={i} className="p-2 text-xs text-slate-500">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {values.map((row, i) => (
            <tr key={i}>
              {rowLabels ? (
                <td className="whitespace-nowrap p-2 text-sm font-semibold text-slate-700">
                  {rowLabels[i]}
                </td>
              ) : null}

              {row.map((cell, j) => {
                const missingCell = isMissing(i, j);
                const key = `${i}-${j}`;

                return (
                  <td key={j} className="border border-slate-200 p-1">
                    {missingCell ? (
                      <input
                        value={inputs[key] || ""}
                        onChange={(e) => handleChange(i, j, e.target.value)}
                        className="w-16 rounded-md border border-blue-300 bg-blue-50 p-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-20"
                        placeholder="?"
                      />
                    ) : (
                      <span className="text-sm font-medium text-slate-800">
                        {cell}
                      </span>
                    )}
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