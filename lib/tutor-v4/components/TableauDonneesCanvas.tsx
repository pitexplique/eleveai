// tutor-v4/components/TableauDonneesCanvas.tsx
"use client";

type CellValue = string | number;

export type TableauDonneesCanvasData = {
  kind: "tableau_donnees";

  title?: string;
  caption?: string;

  headers: string[];

  rows: {
    label?: string;
    values: CellValue[];
  }[];

  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };

  display?: {
    compact?: boolean;
    striped?: boolean;
  };

  questionLabel?: string;
};

type Props = {
  figure: TableauDonneesCanvasData;
};

export default function TableauDonneesCanvas({ figure }: Props) {
  const compact = figure.display?.compact ?? false;
  const striped = figure.display?.striped ?? true;

  const fontSize = compact ? "text-[12px]" : "text-sm";
  const padding = compact ? "px-2 py-1.5" : "px-3 py-2";

  function isHighlighted(row: number, col: number) {
    if (figure.highlight?.cell) {
      return (
        figure.highlight.cell.row === row &&
        figure.highlight.cell.col === col
      );
    }

    if (
      figure.highlight?.row !== undefined &&
      figure.highlight.row === row
    ) {
      return true;
    }

    if (
      figure.highlight?.col !== undefined &&
      figure.highlight.col === col
    ) {
      return true;
    }

    return false;
  }

  return (
    <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* TITRE */}
      {figure.title ? (
        <div className="mb-3 text-center text-base font-black text-slate-800">
          {figure.title}
        </div>
      ) : null}

      {/* TABLEAU */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden rounded-xl border border-slate-300">
          <thead>
            <tr>
              {/* coin haut gauche */}
              <th
                className={`border border-slate-300 bg-slate-800 text-white ${padding} ${fontSize} font-black`}
              >
                Données
              </th>

              {figure.headers.map((header, index) => (
                <th
                  key={index}
                  className={`border border-slate-300 bg-slate-800 text-white ${padding} ${fontSize} font-black`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {figure.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={
                  striped && rowIndex % 2 === 1
                    ? "bg-slate-50"
                    : "bg-white"
                }
              >
                {/* PREMIÈRE COLONNE */}
                <td
                  className={`border border-slate-300 bg-sky-100 text-slate-900 ${padding} ${fontSize} font-bold`}
                >
                  {row.label}
                </td>

                {row.values.map((value, colIndex) => {
                  const highlighted = isHighlighted(rowIndex, colIndex);

                  return (
                    <td
                      key={colIndex}
                      className={`
                        border border-slate-300
                        text-center
                        ${padding}
                        ${fontSize}
                        font-semibold
                        ${
                          highlighted
                            ? "bg-yellow-200 text-slate-950 ring-2 ring-yellow-500"
                            : "bg-white text-slate-800"
                        }
                      `}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CAPTION */}
      {figure.caption ? (
        <div className="mt-3 text-center text-xs font-medium text-slate-600">
          {figure.caption}
        </div>
      ) : null}

      {/* QUESTION */}
      {figure.questionLabel ? (
        <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-center text-sm font-bold text-amber-900">
          {figure.questionLabel}
        </div>
      ) : null}
    </div>
  );
}