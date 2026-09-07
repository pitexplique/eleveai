// lib/canvas/TableauSignesCanvas.tsx
"use client";

import TexteMath from "@/components/fiches/TexteMath";
import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = { figure: CanvasFigure };

/**
 * LE TABLEAU DE SIGNES.
 *
 * Créé le 07/09/2026 à la demande de Frédéric, qui a montré les formes qu'un
 * professeur trace au tableau : un facteur seul, deux facteurs avec le quotient
 * en bas, et jusqu'à trois facteurs. Aucun canvas du dépôt ne les dessinait —
 * `fonction_tableau` est un tableau de VALEURS, et le faire passer pour un
 * tableau de signes aurait été un dessin qui ment sur son énoncé.
 *
 * ⛔ IL EST EN HTML, ET NON EN SVG, ET C'EST LA RAISON D'ÊTRE DE LA RÉÉCRITURE.
 * Frédéric, le jour même : « quand tu écris quotient il faut vraiment l'écrire
 * (x+2)/(x+3) en KaTeX ». Or KaTeX ne peut RIEN rendre dans un `<text>` SVG : la
 * première version affichait « le quotient » en toutes lettres, faute de pouvoir
 * écrire la fraction. En HTML, chaque libellé passe par `TexteMath` et la
 * fraction s'écrit vraiment. Un tableau de signes est d'ailleurs un tableau.
 *
 * ⛔ LA DOUBLE BARRE N'EST PAS UN ZÉRO. Sur un quotient, la valeur qui annule le
 * dénominateur est INTERDITE : elle se marque « ‖ » et non « 0 ». Confondre les
 * deux, c'est enseigner qu'on peut diviser par zéro.
 *
 * ⛔ ET LE MOINS EST LE SIGNE MOINS, pas le trait d'union. Vu au rendu de la
 * version SVG : à taille égale, un « - » ASCII paraît deux fois plus petit qu'un
 * « + » et se lit mal au fond de la classe.
 */
export default function TableauSignesCanvas({ figure }: Props) {
  if (figure.kind !== "tableau_signes") return null;

  const bornes = figure.bornes ?? [];
  const lignes = figure.lignes ?? [];
  if (bornes.length < 2) return null;

  const intervalles = bornes.length - 1;

  // Une colonne de libellés, puis une colonne par intervalle. Les bornes se
  // posent SUR les séparations et non dans les cases : elles sortent donc du
  // flux, positionnées en pourcentage de la zone des intervalles.
  const colonnes = `minmax(76px, auto) repeat(${intervalles}, minmax(50px, 1fr))`;

  return (
    <div className="mx-auto w-full max-w-[440px] overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">
          <TexteMath>{figure.titre}</TexteMath>
        </div>
      ) : null}

      <div className="min-w-[248px] rounded-md border border-slate-900">
        {/* En-tête : x, puis les bornes posées sur les séparations */}
        <div className="grid border-b border-slate-900" style={{ gridTemplateColumns: colonnes }}>
          <div className="border-r border-slate-900 px-2 py-1.5 text-center text-[15px] font-extrabold italic text-slate-900">
            x
          </div>
          <div className="relative col-start-2 -col-end-1 py-1.5" style={{ gridColumn: `2 / -1` }}>
            {bornes.map((b, i) => (
              <span
                key={`b-${i}`}
                className="absolute top-1.5 whitespace-nowrap text-[13px] font-bold text-slate-900"
                style={{
                  left: `${(i / intervalles) * 100}%`,
                  // ⛔ Les bornes extrêmes ne se centrent PAS sur le bord : mesuré
                  // au rendu de la version SVG, « −∞ » chevauchait la barre de
                  // gauche et « +∞ » sortait du cadre, coupé en deux.
                  transform:
                    i === 0
                      ? "translateX(2px)"
                      : i === bornes.length - 1
                        ? "translateX(-100%) translateX(-2px)"
                        : "translateX(-50%)",
                }}
              >
                <TexteMath>{b}</TexteMath>
              </span>
            ))}
            {/* Les bornes étant hors flux, ce texte invisible donne sa hauteur. */}
            <span className="invisible text-[13px]">0</span>
          </div>
        </div>

        {/* Les lignes de signes */}
        {lignes.map((ligne, li) => (
          <div
            key={`l-${li}`}
            className={`grid items-center ${li < lignes.length - 1 ? "border-b border-slate-900" : ""}`}
            style={{ gridTemplateColumns: colonnes }}
          >
            <div className="self-stretch border-r border-slate-900 px-2 py-2 text-center text-[13px] font-semibold leading-tight text-slate-900 flex items-center justify-center">
              <TexteMath>{ligne.label}</TexteMath>
            </div>

            <div className="relative" style={{ gridColumn: `2 / -1` }}>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${intervalles}, 1fr)` }}>
                {ligne.signes.map((s, i) => (
                  <div
                    key={`s-${li}-${i}`}
                    className={`py-2 text-center text-xl font-extrabold ${
                      s === "+" ? "text-emerald-700" : "text-red-700"
                    }`}
                  >
                    {s === "+" ? "+" : "−"}
                  </div>
                ))}
              </div>

              {/* Les marques SUR les bornes intérieures */}
              {(ligne.marques ?? []).map((m, i) => {
                if (!m) return null;
                const gauche = `${((i + 1) / intervalles) * 100}%`;
                if (m === "||") {
                  return (
                    <span
                      key={`m-${li}-${i}`}
                      aria-label="valeur interdite"
                      className="absolute inset-y-0 flex items-center text-xl font-black leading-none text-red-700"
                      style={{ left: gauche, transform: "translateX(-50%)" }}
                    >
                      ‖
                    </span>
                  );
                }
                return (
                  <span
                    key={`m-${li}-${i}`}
                    className="absolute inset-y-0 flex items-center bg-white px-1 text-base font-extrabold leading-none text-slate-900"
                    style={{ left: gauche, transform: "translateX(-50%)" }}
                  >
                    0
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
