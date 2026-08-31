// tutor-v4/components/CalculPoseCanvas.tsx
"use client";

import { INSECABLE, typographier } from "@/lib/fiches/typographie";

type CalculOperation =
  | "addition"
  | "soustraction"
  | "multiplication"
  | "division";

export type CalculPoseCanvasData = {
  kind: "calcul_pose";

  operation: CalculOperation;
  title?: string;

  numbers: string[];
  result?: string;
  retenues?: string[];

  highlight?: {
    row?: number;
    col?: number;
    cell?: {
      row: number;
      col: number;
    };
  };

  division?: {
    dividende: string;
    diviseur: string;
    quotient?: string;
    reste?: string;
  };

  display?: {
    showResult?: boolean;
    showRetenues?: boolean;
    compact?: boolean;
  };

  questionLabel?: string;
};

type Props = {
  figure: CalculPoseCanvasData;
};

const SYMBOLS: Record<CalculOperation, string> = {
  addition: "+",
  soustraction: "−",
  multiplication: "×",
  division: "÷",
};

function splitDigits(value: string) {
  return value.replace(/\s/g, "").split("");
}

function padLeft(arr: string[], size: number) {
  return Array.from({ length: size - arr.length }, () => "").concat(arr);
}

function isHighlighted(
  row: number,
  col: number,
  highlight?: CalculPoseCanvasData["highlight"]
) {
  if (!highlight) return false;

  if (highlight.cell) {
    return highlight.cell.row === row && highlight.cell.col === col;
  }

  if (highlight.row !== undefined && highlight.row === row) return true;
  if (highlight.col !== undefined && highlight.col === col) return true;

  return false;
}

export default function CalculPoseCanvas({ figure: brute }: Props) {
  // ⛔ MESURÉ LE 31/08/2026 SUR LES 32 PAGES QUI PASSENT PAR CE CANVAS, à 375 px :
  // 336 occurrences à risque, 15 coupures fautives (4,46 %) — et les QUINZE sont
  // le même `quotient :` ci-dessous, coupé en « quotient / : 12 » parce que la
  // colonne de la grille est étroite. Voir `lib/fiches/typographie.ts` pour le
  // protocole et pour la raison de poser l'insécable au rendu.
  //
  // Deux gestes différents, parce que le texte arrive de deux façons :
  //   • les LIBELLÉS ÉCRITS ICI portent `{INSECABLE}`, la constante nommée —
  //     c'est justement le caractère qu'on ne verrait pas s'il était collé en
  //     dur dans la chaine ;
  //   • le texte qui vient de la FIGURE (`title`, `questionLabel`) passe par
  //     `typographier`, comme dans `TableauDonneesCanvas`.
  const figure = typographier(brute);

  const compact = figure.display?.compact ?? false;
  const showResult = figure.display?.showResult ?? true;
  const showRetenues = figure.display?.showRetenues ?? true;

  const cellSize = compact ? 30 : 38;
  const fontSize = compact ? "text-base" : "text-xl";

  if (figure.operation === "division") {
    const d = figure.division;

    return (
      <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {figure.title ? (
          <div className="mb-3 text-center text-base font-black text-slate-800">
            {figure.title}
          </div>
        ) : null}

        <div className="rounded-xl border border-slate-300 bg-slate-50 p-4">
          <div className="text-center text-2xl font-black text-slate-900">
            {d?.dividende ?? figure.numbers[0]} ÷{" "}
            {d?.diviseur ?? figure.numbers[1]}
          </div>

          {showResult && d?.quotient ? (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl bg-sky-100 px-3 py-2 text-center font-black text-slate-900">
                quotient{INSECABLE}: {d.quotient}
              </div>
              <div className="rounded-xl bg-amber-100 px-3 py-2 text-center font-black text-slate-900">
                reste{INSECABLE}: {d.reste ?? "0"}
              </div>
            </div>
          ) : null}

          {showResult && d?.quotient ? (
            <div className="mt-3 rounded-xl bg-white px-3 py-2 text-center text-sm font-bold text-slate-700">
              Vérification{INSECABLE}: dividende = diviseur × quotient + reste
            </div>
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

  const numberDigits = figure.numbers.map(splitDigits);
  const resultDigits = figure.result ? splitDigits(figure.result) : [];
  const retenueDigits = figure.retenues ?? [];

  const maxDigits = Math.max(
    ...numberDigits.map((n) => n.length),
    resultDigits.length,
    retenueDigits.length,
    1
  );

  const paddedNumbers = numberDigits.map((digits) => padLeft(digits, maxDigits));
  const paddedResult = padLeft(resultDigits, maxDigits);
  const paddedRetenues = padLeft(retenueDigits, maxDigits);

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {figure.title ? (
        <div className="mb-3 text-center text-base font-black text-slate-800">
          {figure.title}
        </div>
      ) : null}

      <div className="mx-auto w-fit rounded-xl bg-slate-50 p-3">
        {showRetenues && paddedRetenues.some(Boolean) ? (
          <div className="mb-1 flex items-center">
            <div style={{ width: cellSize }} />
            {paddedRetenues.map((digit, col) => (
              <div
                key={`retenue-${col}`}
                style={{ width: cellSize, height: cellSize * 0.7 }}
                className="flex items-center justify-center text-xs font-black text-amber-700"
              >
                {digit}
              </div>
            ))}
          </div>
        ) : null}

        {paddedNumbers.map((digits, row) => (
          <div key={`row-${row}`} className="flex items-center">
            <div
              style={{ width: cellSize }}
              className={`${fontSize} text-center font-black text-slate-900`}
            >
              {row === paddedNumbers.length - 1 ? SYMBOLS[figure.operation] : ""}
            </div>

            {digits.map((digit, col) => {
              const active = isHighlighted(row, col, figure.highlight);

              return (
                <div
                  key={`${row}-${col}`}
                  style={{ width: cellSize, height: cellSize }}
                  className={[
                    "flex items-center justify-center border border-slate-300 font-black",
                    fontSize,
                    active
                      ? "bg-yellow-200 text-slate-950 ring-2 ring-yellow-500"
                      : "bg-white text-slate-900",
                  ].join(" ")}
                >
                  {digit}
                </div>
              );
            })}
          </div>
        ))}

        {showResult ? (
          <>
            <div className="ml-[38px] mt-1 border-t-4 border-slate-900" />

            <div className="mt-1 flex items-center">
              <div style={{ width: cellSize }} />
              {paddedResult.map((digit, col) => {
                const rowIndex = paddedNumbers.length;
                const active = isHighlighted(rowIndex, col, figure.highlight);

                return (
                  <div
                    key={`result-${col}`}
                    style={{ width: cellSize, height: cellSize }}
                    className={[
                      "flex items-center justify-center border border-slate-300 font-black",
                      fontSize,
                      active
                        ? "bg-yellow-200 text-slate-950 ring-2 ring-yellow-500"
                        : "bg-emerald-50 text-emerald-800",
                    ].join(" ")}
                  >
                    {digit}
                  </div>
                );
              })}
            </div>
          </>
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