// lib/canvas/ReglureCanvas.tsx
"use client";

import type { CanvasFigure, ReglureCanvasData } from "@/lib/tutor-v4/types";

// ─── LA RÉGLURE SEYÈS ─────────────────────────────────────────────────────────
// Voir le bloc de commentaire de `ReglureCanvasData` (types_canvas.ts) pour ce
// qu'elle est et pourquoi elle existe. Ici : comment elle se dessine.
//
// ⭐ LE SEUL CANVAS QUI NE MONTRE RIEN — c'est un espace à remplir. Il est donc
// jugé sur une exactitude et non sur une lisibilité : les interlignes doivent
// faire les millimètres du cahier, parce que c'est sur eux que l'enfant apprend
// la taille de ses lettres.
//
// ⭐ LA GÉOMÉTRIE DU SEYÈS, en une phrase : une bande d'écriture fait QUATRE
// interlignes, sa ligne du bas est forte, les trois autres sont fines, et des
// verticales tombent tous les huit millimètres. Le corps de la minuscule occupe
// UN interligne ; les hautes lettres montent jusqu'en haut de la bande.

type Props = { figure: CanvasFigure };

function isReglureCanvas(figure: CanvasFigure): figure is ReglureCanvasData {
  return figure.kind === "reglure";
}

/** 96 dpi : un millimètre vaut 3,7795 px. La réglure est le seul dessin du
 *  dépôt qui se pense en millimètres — c'est la mesure du cahier. */
const MM = 3.7795;

const ENCRE = "#111827";
const LIGNE_FORTE = "#64748b";
const LIGNE_FINE = "#cbd5e1";
const VERTICALE = "#e2e8f0";
const MODELE = "#64748b";
const DEPART = "#16a34a";

const FONT_CONSIGNE = 13;
const PAD = 8;

/** ⚠️ La pile cursive du système, faute de mieux. Les polices scolaires
 *  (Cursive Standard, Belle Allure) sont libres et devront être embarquées :
 *  la boucle du `b` et du `l` de l'école n'est pas celle de Segoe Script. */
const CURSIVE = '"Segoe Script", "Bradley Hand", "Comic Sans MS", cursive';

/**
 * ⛔ LA CONSIGNE SE PLIE — et j'avais oublié de le faire ici (rendu du 02/09).
 *
 * `PersonnageCanvas` et `ObjetsCanvas` coupent la leur ; la réglure l'écrivait
 * en UNE ligne centrée. Résultat sur la fiche `cp/copie` : « Pars du point vert.
 * Ces lettres commencent par un petit tour. » s'affichait « point vert. Ces
 * lettres commencent par un p » — coupée aux DEUX bouts, parce qu'un SVG masque
 * ce qui sort de son cadre et que le texte débordait des deux côtés du centre.
 * ⚠️ Le vérificateur `apercu-canvas.mjs` l'aurait dit : je ne l'avais pas passé
 * sur ce canvas-là.
 */
function largeurTexte(texte: string, fontSize: number) {
  return texte.length * fontSize * 0.52;
}

function couper(texte: string, largeurDispo: number, fontSize: number, maxLignes = 3) {
  if (largeurTexte(texte, fontSize) <= largeurDispo) return [texte];
  const lignes: string[] = [];
  let courante = "";
  for (const mot of texte.split(" ")) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (courante && largeurTexte(essai, fontSize) > largeurDispo) {
      lignes.push(courante);
      courante = mot;
    } else {
      courante = essai;
    }
  }
  if (courante) lignes.push(courante);
  return lignes.slice(0, maxLignes);
}

export default function ReglureCanvas({ figure }: Props) {
  if (!isReglureCanvas(figure)) return null;

  const interligne = (figure.interligne ?? 3) * MM;
  const lignes = Math.max(1, Math.min(8, figure.lignes ?? 3));
  const bande = interligne * 4;
  const width = Math.max(160, figure.size?.width ?? 250);

  const lignesConsigne = figure.consigne
    ? couper(figure.consigne, width - 2 * PAD, FONT_CONSIGNE, 3)
    : [];
  const hConsigne = lignesConsigne.length ? lignesConsigne.length * 16 + 8 : 0;

  const hauteurGrille = lignes * bande;
  const height = PAD + hauteurGrille + hConsigne + PAD;

  const x0 = PAD;
  const x1 = width - PAD;
  const y0 = PAD;

  // ⭐ Le corps de la minuscule occupe UN interligne : le modèle se dimensionne
  // donc sur l'interligne, jamais sur la hauteur de la bande. Le facteur 1,9
  // vient du rapport entre la hauteur de x et la taille de police d'une
  // cursive (≈ 0,52) — écrire `interligne` directement donnerait des lettres
  // deux fois trop petites.
  const policeModele = interligne * 1.9;

  const verticales: number[] = [];
  for (let x = x0 + 8 * MM; x < x1; x += 8 * MM) verticales.push(x);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, height: "auto", display: "block", margin: "0 auto" }}
      role="img"
      aria-label={figure.consigne ?? (figure.modele ? `Recopier : ${figure.modele}` : "lignes d'écriture")}
    >
      <rect x={0} y={0} width={width} height={height} fill="#ffffff" />

      {/* Les verticales d'abord : elles passent DERRIÈRE les horizontales, comme
          sur un cahier, sinon elles hachent la ligne de base. */}
      {verticales.map((x, i) => (
        <line key={i} x1={x} y1={y0} x2={x} y2={y0 + hauteurGrille} stroke={VERTICALE} strokeWidth={0.8} />
      ))}

      {Array.from({ length: lignes }).map((_, l) => {
        const base = y0 + (l + 1) * bande;
        return (
          <g key={l}>
            {[1, 2, 3].map((k) => (
              <line
                key={k}
                x1={x0}
                y1={base - k * interligne}
                x2={x1}
                y2={base - k * interligne}
                stroke={LIGNE_FINE}
                strokeWidth={0.7}
              />
            ))}
            <line x1={x0} y1={base} x2={x1} y2={base} stroke={LIGNE_FORTE} strokeWidth={1.1} />
            {figure.depart && (
              <circle cx={x0 + 3} cy={base - interligne / 2} r={2.2} fill={DEPART} />
            )}
          </g>
        );
      })}

      {/* Le modèle sur la première ligne, et sa reprise en pointillé sur la
          deuxième : on lit, puis on repasse, puis on écrit seul. */}
      {figure.modele && (
        <text
          x={x0 + 8}
          y={y0 + bande}
          fontSize={policeModele}
          fill={ENCRE}
          fontFamily={CURSIVE}
        >
          {figure.modele}
        </text>
      )}
      {figure.modele && figure.aRepasser && lignes > 1 && (
        <text
          x={x0 + 8}
          y={y0 + 2 * bande}
          fontSize={policeModele}
          fill="none"
          stroke={MODELE}
          /* ⛔ 1,2 et non 0,8, et des tirets plus longs que leurs trous : à
             3 mm d'interligne, le premier réglage donnait une trace si pâle
             qu'on ne savait pas quoi repasser. Un modèle à repasser doit se
             VOIR — c'est le seul trait de la fiche que l'enfant suit du crayon. */
          strokeWidth={1.2}
          strokeDasharray="3 2"
          fontFamily={CURSIVE}
        >
          {figure.modele}
        </text>
      )}

      {lignesConsigne.map((ligne, i) => (
        <text
          key={i}
          x={width / 2}
          y={y0 + hauteurGrille + FONT_CONSIGNE + 4 + i * 16}
          fontSize={FONT_CONSIGNE}
          fill="#334155"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {ligne}
        </text>
      ))}
    </svg>
  );
}
