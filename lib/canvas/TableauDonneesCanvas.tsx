// tutor-v4/components/TableauDonneesCanvas.tsx
"use client";

import { typographier } from "@/lib/fiches/typographie";

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

export default function TableauDonneesCanvas({ figure: brute }: Props) {
  // ─── L'espace insécable, ici aussi ──────────────────────────────────────────
  //
  // ⭐ CE CANVAS N'EN EST PAS UN. Malgré son nom et son dossier, il ne dessine
  // rien : il rend un vrai `<table>` HTML, et c'est le NAVIGATEUR qui coupe ses
  // lignes. Le raisonnement de `lib/fiches/typographie.ts` s'applique donc mot
  // pour mot — sauf que `TexteMath` ne le traverse jamais, puisque ses textes
  // arrivent en DONNÉES de figure (`headers`, `questionLabel`…) et non en enfants.
  //
  // ⛔ MESURÉ LE 31/08/2026, ET C'EST CE QUI A CHOISI L'ENDROIT. Les 3 coupures
  // restantes après le commit « Le guillemet fermant ne part plus seul a la
  // ligne » sortent TOUTES d'ici, à 375 px :
  //   /fiches-cours/maths/6e/stat-donnee ....... 2 (deux `questionLabel`)
  //   /fiches-cours/maths/4e/algo-programmation  1 (un `<th>` de `headers`)
  //
  // Elles avaient été prises pour du JSX écrit à la main, donc pour une limite
  // de la méthode. Ce n'en est pas une : 155 fichiers passent par ce composant
  // (115 fiches et 39 banques du coach), et une seule ligne les couvre tous.
  //
  // ⭐ POURQUOI `typographier` ET NON `insecables` SUR CHAQUE CHAMP. Ce tableau
  // écrit du texte à SIX endroits (`title`, `caption`, `headers`, `row.label`,
  // les valeurs de cellule, `questionLabel`) ; un septième champ demain serait
  // oublié. La traversée les couvre tous, laisse passer les nombres et les
  // booléens de `display`, et reste idempotente.
  //
  // ⛔ ET POURQUOI PAS DANS `CanvasRenderer`, qui aurait couvert les 33 canvas
  // d'un coup : les autres dessinent en SVG et coupent leurs lignes EUX-MÊMES,
  // `PhraseCanvas` et `ConjugaisonCanvas` en découpant leur texte sur `" "`.
  // Une insécable y changerait le découpage et donc la mise en page, sans que
  // rien ne l'ait mesuré. Ici le navigateur coupe, et l'insécable est
  // exactement l'instruction qu'il attend.
  const figure = typographier(brute);

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