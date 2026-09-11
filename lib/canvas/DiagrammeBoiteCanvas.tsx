"use client";

import type { CanvasFigure } from "@/lib/tutor-v4/types";

type Props = {
  figure: CanvasFigure;
};

type Serie = {
  label?: string;
  min: number;
  q1: number;
  mediane: number;
  q3: number;
  max: number;
  couleur?: string;
};

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const ARDOISE = "#0f172a";

/** Le fond d'une boîte, dérivé de sa couleur de trait. */
const FONDS: Record<string, string> = {
  "#2563eb": "#dbeafe",
  "#059669": "#d1fae5",
  "#c2410c": "#ffedd5",
  "#7c3aed": "#ede9fe",
};

function nombre(v: number) {
  const arrondi = Math.round(v * 100) / 100;
  if (Number.isInteger(arrondi)) return String(arrondi);
  return arrondi
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", ",");
}

export default function DiagrammeBoiteCanvas({ figure }: Props) {
  if (figure.kind !== "diagramme_boite") return null;

  const series = (figure.series ?? []) as Serie[];
  if (series.length === 0) return null;

  // ⚠️ 320, comme la droite graduée, et pour la même raison : le SVG se met à
  // la largeur de sa carte (`w-full`), donc un viewBox plus large que la carte
  // RÉTRÉCIT le texte d'autant. Dans une carte de fiche en poche, un viewBox de
  // 340 ramenait le fontSize 12 à 9,9 px. La règle est : viewBox ≤ la largeur
  // de la carte en poche, pas ≤ la largeur sur l'écran du bureau.
  const largeur = figure.size?.width ?? 320;

  const montrerAxe = figure.display?.showAxis ?? true;
  const montrerValeurs = figure.display?.showValues ?? true;
  const montrerEcart = figure.display?.showEcartInterquartile ?? false;

  // ─── Les bornes de l'axe ────────────────────────────────────────────────────
  // Elles se CALCULENT à partir de la série quand on ne les donne pas : une
  // borne devinée coupe une moustache, et une moustache coupée ne se voit pas —
  // elle se lit comme un maximum au mauvais endroit.
  const toutes = series.flatMap((s) => [s.min, s.q1, s.mediane, s.q3, s.max]);
  const vraiMin = Math.min(...toutes);
  const vraiMax = Math.max(...toutes);
  const marge = (vraiMax - vraiMin || 1) * 0.08;
  const axeMin = figure.min ?? Math.floor(vraiMin - marge);
  const axeMax = figure.max ?? Math.ceil(vraiMax + marge);

  // Une étiquette de série à gauche prend de la place sur toute la hauteur.
  const aDesLibelles = series.some((s) => s.label);
  const LARGEUR_CAR_LIBELLE = 8.7; // fontSize 16, fontWeight 700
  const libelleLarge = aDesLibelles
    ? Math.min(
        92,
        Math.max(
          ...series.map((s) => (s.label ?? "").length * LARGEUR_CAR_LIBELLE),
        ) + 8,
      )
    : 0;

  const gauche = 18 + libelleLarge;
  const droite = 18;
  const utile = largeur - gauche - droite;

  const versX = (v: number) => {
    if (axeMax === axeMin) return gauche + utile / 2;
    const borne = Math.max(axeMin, Math.min(axeMax, v));
    return gauche + ((borne - axeMin) / (axeMax - axeMin)) * utile;
  };

  // ─── Les cinq nombres, empilés quand ils se touchent ─────────────────────────
  // Q1 et la médiane peuvent être voisins de deux unités : écrits sur la même
  // ligne, « 12 » et « 13 » se recouvrent et on lit un nombre qui n'existe pas.
  // Chaque étiquette prend donc le premier étage où elle ne touche personne, et
  // le dessin gagne en hauteur plutôt que de mentir.
  const LARGEUR_CAR = 10; // fontSize 16, fontWeight 800
  const CRAN = 22;

  function etages(serie: Serie) {
    // Deux des cinq nombres peuvent être ÉGAUX — c'est le cas d'une série très
    // resserrée, où Q1 = médiane = Q3. Écrits une fois par quartile, ils
    // s'empilaient sur trois étages : trois fois « 10 » l'un au-dessus de
    // l'autre, qui se lit comme trois valeurs différentes. On n'écrit donc
    // qu'une fois chaque nombre.
    const vus = new Set<number>();
    const cles: { valeur: number; x: number }[] = [];
    for (const v of [
      serie.min,
      serie.q1,
      serie.mediane,
      serie.q3,
      serie.max,
    ]) {
      if (vus.has(v)) continue;
      vus.add(v);
      cles.push({ valeur: v, x: versX(v) });
    }
    cles.sort((a, b) => a.x - b.x);
    const fins: number[] = [];
    const place = cles.map((c) => {
      const demi = (nombre(c.valeur).length * LARGEUR_CAR) / 2 + 3;
      let etage = 0;
      while (fins[etage] !== undefined && c.x - demi < fins[etage]) etage += 1;
      fins[etage] = c.x + demi;
      return { ...c, etage };
    });
    return { place, hauteur: Math.max(fins.length, 1) };
  }

  const parSerie = series.map((s) => {
    const e = montrerValeurs ? etages(s) : { place: [], hauteur: 0 };
    const hautNombres = montrerValeurs ? 6 + CRAN * e.hauteur : 0;
    const hautBoite = 40;
    const basEcart = montrerEcart ? 28 : 0;
    return {
      serie: s,
      place: e.place,
      hautNombres,
      hautBoite,
      basEcart,
      total: hautNombres + hautBoite + basEcart + 12,
    };
  });

  const hautAxe = montrerAxe ? 36 : 6;
  const hauteur =
    parSerie.reduce((somme, p) => somme + p.total, 0) + hautAxe + 6;

  // Où commence chaque bande.
  let curseur = 4;
  const bandes = parSerie.map((p) => {
    const debut = curseur;
    curseur += p.total;
    return { ...p, debut };
  });

  const axeY = hauteur - hautAxe + 4;

  // Les graduations de l'axe : un pas donné, sinon cinq repères ronds.
  const pas = figure.step ?? Math.max(1, Math.round((axeMax - axeMin) / 5));
  const graduations: number[] = [];
  if (montrerAxe) {
    for (let v = axeMin; v <= axeMax + 1e-9; v += pas) {
      graduations.push(Math.round(v * 1000000) / 1000000);
    }
  }

  return (
    <figure className="mx-auto w-full max-w-[360px]">
      {figure.titre ? (
        <figcaption className="mb-1 text-center text-[13px] font-semibold text-slate-700">
          {figure.titre}
        </figcaption>
      ) : null}
      <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <svg
          viewBox={`0 0 ${largeur} ${hauteur}`}
          className="block h-auto w-full"
          aria-label={
            figure.titre ??
            "Diagramme en boîte : minimum, premier quartile, médiane, troisième quartile, maximum"
          }
        >
          {bandes.map((b, index) => {
            const s = b.serie;
            const trait = s.couleur ?? BLEU;
            const fond = FONDS[trait] ?? "#dbeafe";

            const yBoite = b.debut + b.hautNombres;
            const yMilieu = yBoite + b.hautBoite / 2;

            const xMin = versX(s.min);
            const xQ1 = versX(s.q1);
            const xMe = versX(s.mediane);
            const xQ3 = versX(s.q3);
            const xMax = versX(s.max);

            // Une boîte de moins de 3 px ne se voit plus : on lui garde un corps.
            const largeurBoite = Math.max(3, xQ3 - xQ1);

            return (
              <g key={`serie-${index}-${s.label ?? index}`}>
                {/* Le nom de la série, à gauche de sa boîte */}
                {s.label ? (
                  <text
                    x={gauche - 8}
                    y={yMilieu + 6}
                    textAnchor="end"
                    fontSize="16"
                    fontWeight="700"
                    fill={trait}
                  >
                    {s.label}
                  </text>
                ) : null}

                {/* Les moustaches */}
                <line
                  x1={xMin}
                  y1={yMilieu}
                  x2={xQ1}
                  y2={yMilieu}
                  stroke={ARDOISE}
                  strokeWidth={1.8}
                />
                <line
                  x1={xQ3}
                  y1={yMilieu}
                  x2={xMax}
                  y2={yMilieu}
                  stroke={ARDOISE}
                  strokeWidth={1.8}
                />

                {/* Les deux bouts */}
                <line
                  x1={xMin}
                  y1={yBoite + 7}
                  x2={xMin}
                  y2={yBoite + b.hautBoite - 7}
                  stroke={ARDOISE}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                />
                <line
                  x1={xMax}
                  y1={yBoite + 7}
                  x2={xMax}
                  y2={yBoite + b.hautBoite - 7}
                  stroke={ARDOISE}
                  strokeWidth={2.4}
                  strokeLinecap="round"
                />

                {/* La boîte : la moitié centrale de la série */}
                <rect
                  x={xQ1}
                  y={yBoite}
                  width={largeurBoite}
                  height={b.hautBoite}
                  rx={3}
                  fill={fond}
                  stroke={trait}
                  strokeWidth={2.2}
                />

                {/* La médiane, en rouge : c'est elle qu'on lit en premier */}
                <line
                  x1={xMe}
                  y1={yBoite}
                  x2={xMe}
                  y2={yBoite + b.hautBoite}
                  stroke={ROUGE}
                  strokeWidth={3.2}
                  strokeLinecap="round"
                />

                {/* Les cinq nombres, chacun à son étage */}
                {b.place.map((p) => {
                  const y = yBoite - 6 - CRAN * p.etage;
                  const estMediane = Math.abs(p.valeur - s.mediane) < 1e-9;
                  return (
                    <g key={`val-${index}-${p.valeur}-${p.etage}`}>
                      <line
                        x1={p.x}
                        y1={y + 3}
                        x2={p.x}
                        y2={yBoite - 1}
                        stroke={estMediane ? ROUGE : "#94a3b8"}
                        strokeWidth={1}
                        strokeDasharray="2 2"
                      />
                      <text
                        x={p.x}
                        y={y}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="800"
                        fill={estMediane ? ROUGE : ARDOISE}
                        stroke="white"
                        strokeWidth="2.5"
                        paintOrder="stroke"
                      >
                        {nombre(p.valeur)}
                      </text>
                    </g>
                  );
                })}

                {/* L'écart interquartile, accolade sous la boîte */}
                {montrerEcart ? (
                  <g>
                    <path
                      d={`M ${xQ1} ${yBoite + b.hautBoite + 4} L ${xQ1} ${
                        yBoite + b.hautBoite + 9
                      } L ${xQ3} ${yBoite + b.hautBoite + 9} L ${xQ3} ${
                        yBoite + b.hautBoite + 4
                      }`}
                      fill="none"
                      stroke={trait}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text
                      x={(xQ1 + xQ3) / 2}
                      y={yBoite + b.hautBoite + 24}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill={trait}
                      stroke="white"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                    >
                      {`Q3 − Q1 = ${nombre(s.q3 - s.q1)}`}
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}

          {/* L'axe et ses graduations */}
          {montrerAxe ? (
            <g>
              <line
                x1={gauche}
                y1={axeY}
                x2={largeur - droite + 6}
                y2={axeY}
                stroke={ARDOISE}
                strokeWidth={1.8}
              />
              <path
                d={`M ${largeur - droite - 2} ${axeY - 4} L ${
                  largeur - droite + 6
                } ${axeY} L ${largeur - droite - 2} ${axeY + 4}`}
                fill="none"
                stroke={ARDOISE}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {graduations.map((g) => (
                <g key={`grad-${g}`}>
                  <line
                    x1={versX(g)}
                    y1={axeY - 4}
                    x2={versX(g)}
                    y2={axeY + 4}
                    stroke={ARDOISE}
                    strokeWidth={1.4}
                  />
                  <text
                    x={versX(g)}
                    y={axeY + 19}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#475569"
                  >
                    {nombre(g)}
                  </text>
                </g>
              ))}
            </g>
          ) : null}
        </svg>
      </div>
    </figure>
  );
}
