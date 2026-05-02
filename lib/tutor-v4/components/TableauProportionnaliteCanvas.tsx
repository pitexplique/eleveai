"use client";

import { useState } from "react";

type MissingCell = {
  row: number;
  col: number;
};

type CanvasTableauProportionnalite = {
  kind: "tableau_proportionnalite";
  rows: number;
  cols: number;
  values: (string | "")[][];
  missing: MissingCell[];
  rowLabels?: string[];
  colLabels?: string[];
};

type Props = {
  canvas: CanvasTableauProportionnalite;
  onChange?: (answers: string[]) => void;
};

export default function TableauProportionnaliteCanvas({
  canvas,
  onChange,
}: Props) {
  const { values, missing, rowLabels, colLabels } = canvas;

  // état local des réponses
  const [inputs, setInputs] = useState<Record<string, string>>({});

  function isMissing(row: number, col: number) {
    return missing.some((m) => m.row === row && m.col === col);
  }

  function handleChange(row: number, col: number, value: string) {
    const key = `${row}-${col}`;
    const updated = { ...inputs, [key]: value };

    setInputs(updated);

    // renvoie les réponses dans l’ordre des missing
    if (onChange) {
      const answers = missing.map((m) => {
        const k = `${m.row}-${m.col}`;
        return updated[k] || "";
      });
      onChange(answers);
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <table className="w-full border-collapse text-center">
        {/* COL LABELS */}
        {colLabels && (
          <thead>
            <tr>
              <th className="p-2"></th>
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
              {/* ROW LABEL */}
              <td className="p-2 text-sm font-semibold text-slate-700 whitespace-nowrap">
                {rowLabels?.[i]}
              </td>

              {row.map((cell, j) => {
                const missingCell = isMissing(i, j);

                if (missingCell) {
                  const key = `${i}-${j}`;

                  return (
                    <td key={j} className="p-1">
                      <input
                        value={inputs[key] || ""}
                        onChange={(e) =>
                          handleChange(i, j, e.target.value)
                        }
                        className="w-16 md:w-20 rounded-md border border-blue-300 bg-blue-50 text-center text-sm p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="?"
                      />
                    </td>
                  );
                }

                return (
                  <td
                    key={j}
                    className="p-2 text-sm font-medium text-slate-800"
                  >
                    {cell}
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