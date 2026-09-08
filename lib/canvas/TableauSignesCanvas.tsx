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
 * ⛔ IL EST EN HTML, ET NON EN SVG. Frédéric : « quand tu écris quotient il faut
 * vraiment l'écrire (x+2)/(x+3) en KaTeX ». Or KaTeX ne rend RIEN dans un
 * `<text>` SVG : la première version affichait « le quotient » en toutes lettres,
 * faute de pouvoir écrire la fraction. Chaque libellé passe par `TexteMath`.
 *
 * ⭐ CHAQUE BORNE A SA PROPRE COLONNE — réécriture du 08/09/2026, et c'est ce qui
 * a réglé le problème pour de bon. Les bornes étaient posées EN POURCENTAGE, hors
 * flux : la dernière, ancrée au bord même de la zone, se faisait couper par le
 * cadre (« on ne voit pas la partie droite », capture à l'appui), et je rattrapais
 * à coups de marges sans jamais fermer le sujet. En colonnes alternées — borne,
 * intervalle, borne, intervalle… — plus rien ne peut déborder ni se chevaucher,
 * par construction. Les `0` et les `‖` tombent d'eux-mêmes dans la colonne de
 * leur borne, qui est exactement leur place.
 *
 * ⛔ PAS DE SECOND CADRE NI DE MARGE : « coller le tableau au cadre pour gagner de
 * l'espace ». L'enveloppe portait une bordure arrondie ET 12 px de padding de
 * chaque côté — un double encadrement, 24 px perdus dans un bloc qui n'en fait
 * que 250. Le tableau a déjà sa bordure.
 *
 * ⛔ LA DOUBLE BARRE N'EST PAS UN ZÉRO. Sur un quotient, la valeur qui annule le
 * dénominateur est INTERDITE : « ‖ » et non « 0 ». Les confondre, c'est enseigner
 * qu'on peut diviser par zéro.
 *
 * ⛔ ET LE MOINS EST LE SIGNE MOINS, pas le trait d'union : à taille égale, un
 * « - » ASCII paraît deux fois plus petit qu'un « + ».
 */
export default function TableauSignesCanvas({ figure }: Props) {
  if (figure.kind !== "tableau_signes") return null;

  const bornes = figure.bornes ?? [];
  const lignes = figure.lignes ?? [];
  if (bornes.length < 2) return null;

  const intervalles = bornes.length - 1;

  // Libellés, puis borne, intervalle, borne, intervalle… jusqu'à la dernière
  // borne. Les colonnes de bornes se dimensionnent sur leur contenu ; celles des
  // intervalles se partagent ce qui reste.
  const colonnes = `minmax(52px, 88px) auto repeat(${intervalles}, minmax(26px, 1fr) auto)`;

  return (
    <div className="mx-auto w-full max-w-[440px]">
      {figure.titre ? (
        <div className="mb-1.5 text-center text-sm font-black text-slate-800">
          <TexteMath>{figure.titre}</TexteMath>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-md border border-slate-900 bg-white">
        {/* En-tête : x, puis les bornes, chacune dans sa colonne */}
        <div
          className="grid items-center border-b border-slate-900"
          style={{ gridTemplateColumns: colonnes }}
        >
          <div className="border-r border-slate-900 px-1.5 py-1.5 text-center text-[15px] font-extrabold italic text-slate-900">
            x
          </div>
          {bornes.map((b, i) => (
            <div key={`b-${i}`} className="contents">
              <div className="px-0.5 py-1.5 text-center text-[13px] font-bold leading-none text-slate-900">
                <TexteMath>{b}</TexteMath>
              </div>
              {i < intervalles ? <div aria-hidden /> : null}
            </div>
          ))}
        </div>

        {/* Les lignes de signes */}
        {lignes.map((ligne, li) => (
          <div
            key={`l-${li}`}
            className={`grid items-stretch ${li < lignes.length - 1 ? "border-b border-slate-900" : ""}`}
            style={{ gridTemplateColumns: colonnes }}
          >
            <div className="flex items-center justify-center border-r border-slate-900 px-1.5 py-2 text-center text-[13px] font-semibold leading-tight text-slate-900">
              <TexteMath>{ligne.label}</TexteMath>
            </div>

            {bornes.map((_, i) => {
              // La colonne de la borne : un zéro, une double barre, ou rien.
              // ⛔ Les bornes EXTRÊMES ne portent jamais de marque : $-\infty$ et
              // $+\infty$ ne sont pas des valeurs que l'expression puisse annuler.
              const marque = i > 0 && i < bornes.length - 1 ? (ligne.marques ?? [])[i - 1] : "";
              const signe = i < intervalles ? ligne.signes[i] : null;
              return (
                <div key={`c-${li}-${i}`} className="contents">
                  <div className="flex items-center justify-center px-0.5">
                    {marque === "||" ? (
                      <span
                        aria-label="valeur interdite"
                        className="text-xl font-black leading-none text-red-700"
                      >
                        ‖
                      </span>
                    ) : marque === "0" ? (
                      <span className="text-base font-extrabold leading-none text-slate-900">0</span>
                    ) : null}
                  </div>
                  {signe !== null ? (
                    <div
                      className={`py-2 text-center text-xl font-extrabold leading-none ${
                        signe === "+" ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {signe === "+" ? "+" : "−"}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
