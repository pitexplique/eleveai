"use client";

import { useState } from "react";
import type { TableauProportionnaliteCanvasData } from "@/lib/tutor-v4/types";

type Props = {
  figure: TableauProportionnaliteCanvasData;
  onChange?: (answers: string[]) => void;
};

function cellKey(row: number, col: number) {
  return `${row}-${col}`;
}

export default function TableauProportionnaliteCanvas({
  figure,
  onChange,
}: Props) {
  const {
    values,
    missing,
    rowLabels,
    colLabels,
    highlightedCells,
    display,
  } = figure;

  const [inputs, setInputs] = useState<Record<string, string>>({});

  const showRowLabels = display?.showRowLabels ?? true;
  const showColLabels = display?.showColLabels ?? true;
  const showMissing = display?.showMissing ?? true;
  const showGrid = display?.showGrid ?? true;

  function isMissing(row: number, col: number) {
    return missing.some((m) => m.row === row && m.col === col);
  }

  function isHighlighted(row: number, col: number) {
    return (
      highlightedCells?.some((cell) => cell.row === row && cell.col === col) ??
      false
    );
  }

  function handleChange(row: number, col: number, value: string) {
    const key = cellKey(row, col);
    const updated = { ...inputs, [key]: value };

    setInputs(updated);

    if (onChange) {
      const answers = missing.map((m) => updated[cellKey(m.row, m.col)] || "");
      onChange(answers);
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <table className="w-full border-collapse text-center">
        {showColLabels && colLabels ? (
          <thead>
            <tr>
              {showRowLabels && rowLabels ? <th className="p-2" /> : null}

              {colLabels.map((label, index) => (
                <th
                  key={`col-${index}`}
                  className="p-2 text-xs font-bold text-slate-500"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
        ) : null}

        <tbody>
          {values.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {showRowLabels && rowLabels ? (
                <td className="whitespace-nowrap p-2 text-sm font-semibold text-slate-700">
                  {rowLabels[rowIndex]}
                </td>
              ) : null}

              {row.map((cell, colIndex) => {
                const missingCell = showMissing && isMissing(rowIndex, colIndex);
                const highlighted = isHighlighted(rowIndex, colIndex);
                const key = cellKey(rowIndex, colIndex);

                return (
                  <td
                    key={key}
                    className={[
                      showGrid ? "border border-slate-200" : "",
                      highlighted ? "bg-amber-100" : "",
                      "p-1",
                    ].join(" ")}
                  >
                    {missingCell ? (
                      <input
                        value={inputs[key] || ""}
                        onChange={(event) =>
                          handleChange(rowIndex, colIndex, event.target.value)
                        }
                        className="w-16 rounded-md border border-blue-300 bg-blue-50 p-1 text-center text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-20"
                        placeholder="?"
                      />
                    ) : (
                      <span
                        className={[
                          "text-sm font-semibold",
                          highlighted ? "text-amber-900" : "text-slate-800",
                        ].join(" ")}
                      >
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