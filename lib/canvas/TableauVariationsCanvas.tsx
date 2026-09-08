// lib/canvas/TableauVariationsCanvas.tsx
"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = { figure: CanvasFigure };

/**
 * Lit un nombre ecrit A LA FRANCAISE.
 *
 * ⛔ `Number("−4")` vaut NaN : le moins typographique (U+2212) n'est PAS le
 * tiret ASCII, et la virgule decimale n'est pas le point. Sans cette lecture,
 * une fleche partirait dans le mauvais sens sans la moindre erreur — le pire
 * des defauts, celui qui se voit seulement en classe.
 */
function nombre(t: string): number {
  return Number(
    t
      .replace(/−/g, "-")
      .replace(/ |\s/g, "")
      .replace(",", "."),
  );
}

/**
 * LE TABLEAU DE VARIATIONS.
 *
 * Séparé du tableau de signes le 07/09/2026 à la demande de Frédéric : ce sont
 * deux objets que le professeur trace pour deux raisons différentes, et les
 * mélanger dans un seul type obligeait chaque appel à préciser ce qu'il ne
 * voulait pas.
 *
 * Il garde SA ligne de dérivée, car c'est ainsi qu'il se présente en classe :
 * le signe de $f'(x)$ au-dessus, les flèches en dessous.
 *
 * ⛔ LES FLÈCHES NE SE DÉCRIVENT PAS, ELLES SE DÉDUISENT. On donne la valeur de
 * la fonction à chaque borne, et le sens de chaque flèche se lit en comparant
 * deux valeurs successives. Décrire les flèches à la main laisserait écrire une
 * flèche montante entre 9 et 4 — un dessin qui contredirait ses propres nombres.
 */
export default function TableauVariationsCanvas({ figure }: Props) {
  if (figure.kind !== "tableau_variations") return null;

  const bornes = figure.bornes ?? [];
  const derivee = figure.derivee;
  const variations = figure.variations;

  if (bornes.length < 2 || !variations || variations.valeurs.length !== bornes.length) return null;

  const intervalles = bornes.length - 1;

  // ⛔ LA COLONNE DE GAUCHE SE MESURE. « variations de f » fait trois fois la
  // largeur de « f », et une colonne figée l'aurait fait déborder sur la
  // première case de flèches.
  const LARGEUR_CAR = 7.2;
  const colGauche = Math.min(
    80,
    Math.max(64, ...[variations.label, derivee?.label ?? "", "x"].map((t) => t.length * LARGEUR_CAR + 16)),
  );

  // ⛔ AFFINE AVANT SA PREMIERE UTILISATION (08/09/2026). A 78 px par intervalle
  // et une colonne de gauche jusqu'a 190, le dessin faisait 424 px de large — le
  // double d'un bloc de fiche, ou il aurait rendu ses nombres a 8 px. A 54, un
  // tableau a trois intervalles tient en 226 et rend a 11 px.
  //
  // ⚠️ EN CONTREPARTIE, LES LIBELLES DOIVENT ETRE COURTS : « f ′(x) » et « f »,
  // pas « variations de f ». Le SVG ne sait pas passer un texte a la ligne, donc
  // un libelle long repousse toute la grille vers la droite.
  const LARGEUR_INTER = 54;
  const HAUT_ENTETE = 36;
  const HAUT_DERIVEE = 42;
  const HAUT_VARIATIONS = 84;

  const largeur = colGauche + intervalles * LARGEUR_INTER;
  const yDerivee = HAUT_ENTETE;
  const yVar = HAUT_ENTETE + (derivee ? HAUT_DERIVEE : 0);
  const hauteur = yVar + HAUT_VARIATIONS;

  const xBorne = (i: number) => colGauche + i * LARGEUR_INTER;
  const xMilieu = (i: number) => colGauche + (i + 0.5) * LARGEUR_INTER;

  const TRAIT = "#0f172a";
  const PLUS = "#15803d";
  const MOINS = "#b91c1c";
  const FLECHE = "#ea580c";

  return (
    <div className="mx-auto w-full max-w-[440px] overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      {figure.titre ? (
        <div className="mb-2 text-center text-sm font-black text-slate-800">{figure.titre}</div>
      ) : null}

      <svg viewBox={`0 0 ${largeur} ${hauteur}`} className="block h-auto w-full" aria-label="Tableau de variations">
        <rect x={0} y={0} width={largeur} height={hauteur} fill="none" stroke={TRAIT} strokeWidth={1.6} />
        <line x1={0} y1={yDerivee} x2={largeur} y2={yDerivee} stroke={TRAIT} strokeWidth={1.6} />
        {derivee ? <line x1={0} y1={yVar} x2={largeur} y2={yVar} stroke={TRAIT} strokeWidth={1.6} /> : null}
        <line x1={colGauche} y1={0} x2={colGauche} y2={hauteur} stroke={TRAIT} strokeWidth={1.6} />

        {/* L'en-tête */}
        <text x={colGauche / 2} y={23} textAnchor="middle" fontSize={15} fontWeight={800} fontStyle="italic" fill={TRAIT}>
          x
        </text>
        {/* ⛔ LES BORNES EXTREMES NE SE CENTRENT PAS SUR LE BORD. Vu au rendu :
            « −∞ » centré sur la barre verticale la chevauchait, et « +∞ » sortait
            du cadre par la droite, coupé en deux. La première s'ancre à gauche
            juste après la barre, la dernière à droite juste avant le bord. */}
        {bornes.map((b, i) => {
          const premiere = i === 0;
          const derniere = i === bornes.length - 1;
          return (
            <text
              key={`b-${i}`}
              x={premiere ? xBorne(i) + 8 : derniere ? xBorne(i) - 8 : xBorne(i)}
              y={23}
              textAnchor={premiere ? "start" : derniere ? "end" : "middle"}
              fontSize={14}
              fontWeight={700}
              fill={TRAIT}
            >
              {b}
            </text>
          );
        })}

        {/* La ligne de la dérivée */}
        {derivee ? (
          <g>
            <text x={colGauche / 2} y={yDerivee + 27} textAnchor="middle" fontSize={13} fontWeight={700} fill={TRAIT}>
              {derivee.label}
            </text>
            {derivee.signes.map((s, i) => (
              <text
                key={`s-${i}`}
                x={xMilieu(i)}
                y={yDerivee + 29}
                textAnchor="middle"
                fontSize={20}
                fontWeight={800}
                fill={s === "+" ? PLUS : MOINS}
              >
                {s === "-" ? "−" : s}
              </text>
            ))}
            {(derivee.marques ?? []).map((m, i) =>
              m === "0" ? (
                <text
                  key={`m-${i}`}
                  x={xBorne(i + 1)}
                  y={yDerivee + 28}
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight={800}
                  fill={TRAIT}
                  stroke="white"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  0
                </text>
              ) : null,
            )}
          </g>
        ) : null}

        {/* Les flèches, déduites des valeurs */}
        <text
          x={colGauche / 2}
          y={yVar + HAUT_VARIATIONS / 2 + 4}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill={TRAIT}
        >
          {variations.label}
        </text>

        {variations.valeurs.slice(0, -1).map((v, i) => {
          const monte = nombre(variations.valeurs[i + 1]) > nombre(v);
          const y1 = yVar + (monte ? HAUT_VARIATIONS - 20 : 24);
          const y2 = yVar + (monte ? 24 : HAUT_VARIATIONS - 20);
          return (
            <line
              key={`f-${i}`}
              x1={xBorne(i) + 14}
              y1={y1}
              x2={xBorne(i + 1) - 14}
              y2={y2}
              stroke={FLECHE}
              strokeWidth={2.2}
              markerEnd="url(#pointeVar)"
            />
          );
        })}

        {/* ⛔ PREMIERE ET DERNIERE VALEURS ANCREES VERS L'INTERIEUR. Mesure au
            rendu : centree sur le bord du cadre, la derniere valeur en sortait
            de moitie — exactement le piege deja corrige sur les bornes. */}
        {variations.valeurs.map((v, i) => {
          // Une valeur se pose EN HAUT si elle domine sa (ou ses) voisine(s),
          // en bas sinon : c'est ce qui fait lire le tableau d'un coup d'œil.
          const prec = i > 0 ? nombre(variations.valeurs[i - 1]) : null;
          const suiv = i < variations.valeurs.length - 1 ? nombre(variations.valeurs[i + 1]) : null;
          const val = nombre(v);
          const enHaut = (prec !== null && val > prec) || (suiv !== null && val > suiv);
          return (
            <text
              key={`v-${i}`}
              x={i === 0 ? xBorne(i) + 6 : i === variations.valeurs.length - 1 ? xBorne(i) - 6 : xBorne(i)}
              y={yVar + (enHaut ? 22 : HAUT_VARIATIONS - 12)}
              textAnchor={i === 0 ? "start" : i === variations.valeurs.length - 1 ? "end" : "middle"}
              fontSize={14}
              fontWeight={800}
              fill={TRAIT}
              stroke="white"
              strokeWidth={3.5}
              paintOrder="stroke"
            >
              {v}
            </text>
          );
        })}

        <defs>
          <marker id="pointeVar" markerWidth={7} markerHeight={7} refX={6} refY={3} orient="auto">
            <path d="M0,0 L7,3 L0,6 Z" fill={FLECHE} />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
