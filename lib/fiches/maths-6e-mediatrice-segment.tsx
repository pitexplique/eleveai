// ─── Fiche de cours : la médiatrice d'un segment (6e) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/mediatrice.bank.ts, notionId mediatrice_segment).
//
// Micro-compétences 5/5 — le mapping micro → blocs :
//   mediatrice_definition → définition + figure, exemple 1, piège 1
//   mediatrice_propriete  → propriétés 1, 2 et 3 (les DEUX sens), exemple 2, piège 2
//   mediatrice_construire → réflexes 1, 2 et 3 (compas, équerre, pliage), piège 3
//   mediatrice_probleme   → usages 1 et 2 (milieu d'une corde, centre perdu)
//   mediatrice_defi       → usage 3 (point de rendez-vous), exemple 3 (isocèle)
//
// ⭐ LA PROPRIÉTÉ SE LIT DANS LES DEUX SENS (en-tête de la banque) : c'est le
// second — « même distance, donc sur la médiatrice » — qui sert à démontrer, et
// c'est celui qu'on oublie. Il a sa propre carte, un tableau à deux colonnes
// « je sais / donc », et sa ligne est surlignée.
//
// Les nombres viennent de la banque : PA = 7 → PB = 7 ; AB = 6 → équerre à
// 3 cm ; KE = 9 (gabarit 3 à 14). Les villages de La Réunion de la banque sont
// remplacés par deux copains : on ne met pas La Réunion par défaut.
//
// ⚠️ `droites` pose sa marque d'angle droit EN HAUT À DROITE du point, et le nom
// d'un point au même endroit : « M » tombait dans le petit carré. La marque est
// donc dessinée ici avec deux petits traits, EN BAS À GAUCHE (`angleDroit`).
// Elle ne vaut que pour un segment horizontal et une droite verticale, ce qui
// est le cas de toutes les figures de la fiche.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import type { CercleCanvasData, DroitesCanvasData } from "@/lib/tutor-v4/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Trait = DroitesCanvasData["lines"][number];
type Point = NonNullable<DroitesCanvasData["points"]>[number];

const L = 260;
const BLEU = "#2563eb";
const VIOLET = "#7c3aed";
const ORANGE = "#ea580c";
const ROUGE = "#ef4444";
const NOIR = "#0f172a";

const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

const droites = (hauteur: number, lines: Trait[], points: Point[]) => (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: L, height: hauteur },
      lines,
      points,
      display: { showGrid: false, showLabels: true, showPoints: true },
    }}
  />
);

/** Une étiquette seule : un trait de longueur et d'épaisseur nulles ne dessine
 *  rien, il ne porte que son nom, centré en x, posé sur la ligne `y`. */
const etiquette = (id: string, x: number, y: number, texte: string, color: string): Trait => ({
  id,
  type: "segment",
  from: { x, y: y + 10 },
  to: { x, y: y + 10 },
  color,
  strokeWidth: 0,
  label: texte,
});

/** La marque d'angle droit, en bas à gauche du point (voir l'en-tête). */
const angleDroit = (id: string, x: number, y: number, c = 14): Trait[] => [
  { id: `${id}-1`, type: "segment", from: { x: x - c, y }, to: { x: x - c, y: y + c }, color: ROUGE, strokeWidth: 3 },
  { id: `${id}-2`, type: "segment", from: { x: x - c, y: y + c }, to: { x, y: y + c }, color: ROUGE, strokeWidth: 3 },
];

/** Une droite verticale (la médiatrice, ou une autre). */
const verticale = (id: string, x: number, color = BLEU): Trait => ({
  id,
  type: "droite",
  from: { x, y: 20 },
  to: { x, y: 60 },
  color,
});

// LA DÉFINITION : perpendiculaire (la marque) ET par le milieu (3 cm, 3 cm).
// AB = 6 cm est le nombre de la banque (gabarit de construction).
const figureDefinition = droites(
  160,
  [
    verticale("d", 130),
    { id: "AB", type: "segment", from: { x: 40, y: 105 }, to: { x: 220, y: 105 }, color: NOIR },
    ...angleDroit("ad", 130, 105),
    etiquette("ld", 150, 30, "(d)", BLEU),
    etiquette("lAM", 80, 142, "3 cm", NOIR),
    etiquette("lMB", 180, 142, "3 cm", NOIR),
  ],
  [
    { x: 40, y: 105, label: "A" },
    { x: 130, y: 105, label: "M", color: ROUGE, highlight: true },
    { x: 220, y: 105, label: "B" },
  ]
);

// PROPRIÉTÉ, SENS 1 : P sur la médiatrice, donc PA = PB (7 cm, banque).
const figureSens1 = droites(
  155,
  [
    verticale("d", 130),
    { id: "AB", type: "segment", from: { x: 40, y: 125 }, to: { x: 220, y: 125 }, color: NOIR },
    ...angleDroit("ad", 130, 125),
    { id: "PA", type: "segment", from: { x: 130, y: 30 }, to: { x: 40, y: 125 }, color: VIOLET, dashed: true },
    { id: "PB", type: "segment", from: { x: 130, y: 30 }, to: { x: 220, y: 125 }, color: VIOLET, dashed: true },
    etiquette("lPA", 56, 70, "7 cm", VIOLET),
    etiquette("lPB", 204, 70, "7 cm", VIOLET),
  ],
  [
    { x: 40, y: 125, label: "A" },
    { x: 220, y: 125, label: "B" },
    { x: 130, y: 30, label: "P", color: VIOLET, highlight: true },
  ]
);

// PROPRIÉTÉ, SENS 2 : le tableau « je sais / donc ». La 2e ligne est celle
// qui sert à démontrer.
const tableauDeuxSens = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["je sais que…", "donc…"],
      rows: [
        { values: ["P est sur la médiatrice", "PA = PB"] },
        { values: ["KA = KB", "K est sur la médiatrice"] },
      ],
      highlight: { row: 1 },
      display: { striped: true },
    }}
  />
);

// PROPRIÉTÉ 3 : hors de la médiatrice, deux distances différentes. À l'échelle,
// 18 px pour 1 cm : AB = 10 cm, NA = 5 cm, NB = 8 cm. N se calcule :
// x = (90² − 144² + 180²) ÷ 360 ≈ 54,9 depuis A ; y = √(90² − 54,9²) ≈ 71,3.
const figureHors = droites(
  135,
  [
    verticale("d", 130),
    { id: "AB", type: "segment", from: { x: 40, y: 110 }, to: { x: 220, y: 110 }, color: NOIR },
    ...angleDroit("ad", 130, 110),
    { id: "NA", type: "segment", from: { x: 94.9, y: 38.7 }, to: { x: 40, y: 110 }, color: ORANGE, dashed: true },
    { id: "NB", type: "segment", from: { x: 94.9, y: 38.7 }, to: { x: 220, y: 110 }, color: ORANGE, dashed: true },
    etiquette("lNA", 45, 72, "5 cm", ORANGE),
    etiquette("lNB", 192, 68, "8 cm", ORANGE),
  ],
  [
    { x: 40, y: 110, label: "A" },
    { x: 220, y: 110, label: "B" },
    { x: 94.9, y: 38.7, label: "N", color: ORANGE, highlight: true },
  ]
);

// RÉFLEXE 1 — LE COMPAS. ⛔ Aucun canvas ne trace un ARC : `droites` ne fait
// que des traits, `cercle` un seul cercle. SVG local, donc, dans le même cadre
// que les canvas (260 de large, lettres en 15 → 13 px dans une carte).
// A (60 ; 95), B (200 ; 95), même écartement 100 : les arcs se croisent en
// x = 130, y = 95 ± √(100² − 70²) ≈ 95 ± 71,4. Les arcs sont CENTRÉS sur ces
// croisements (± 20°), jamais posés à l'œil.
const CA = { x: 60, y: 95 };
const CB = { x: 200, y: 95 };
const RAYON = 100;
const arc = (c: { x: number; y: number }, de: number, a: number) => {
  const p = (deg: number) => ({ x: c.x + RAYON * Math.cos((deg * Math.PI) / 180), y: c.y + RAYON * Math.sin((deg * Math.PI) / 180) });
  const s = p(de);
  const e = p(a);
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${RAYON} ${RAYON} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
};
const DEMI_ANGLE = (Math.acos(70 / RAYON) * 180) / Math.PI; // ≈ 45,6°
const Y_HAUT = 95 - Math.sqrt(RAYON * RAYON - 70 * 70);
const Y_BAS = 95 + Math.sqrt(RAYON * RAYON - 70 * 70);

const constructionCompas = (
  <div className="mx-auto w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <svg viewBox="0 0 260 190" className="block h-auto w-full" aria-label="Construction de la médiatrice au compas">
      <line x1={130} y1={4} x2={130} y2={186} stroke={BLEU} strokeWidth={3} />
      <line x1={CA.x} y1={95} x2={CB.x} y2={95} stroke={NOIR} strokeWidth={3} />
      {[
        arc(CA, -DEMI_ANGLE - 20, -DEMI_ANGLE + 20),
        arc(CA, DEMI_ANGLE - 20, DEMI_ANGLE + 20),
        arc(CB, 180 + DEMI_ANGLE - 20, 180 + DEMI_ANGLE + 20),
        arc(CB, 180 - DEMI_ANGLE - 20, 180 - DEMI_ANGLE + 20),
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={ORANGE} strokeWidth={3} strokeLinecap="round" />
      ))}
      <circle cx={130} cy={Y_HAUT} r={5} fill={ORANGE} stroke={NOIR} strokeWidth={1.5} />
      <circle cx={130} cy={Y_BAS} r={5} fill={ORANGE} stroke={NOIR} strokeWidth={1.5} />
      <circle cx={CA.x} cy={95} r={6} fill={ROUGE} stroke={NOIR} strokeWidth={2} />
      <circle cx={CB.x} cy={95} r={6} fill={ROUGE} stroke={NOIR} strokeWidth={2} />
      <text x={CA.x - 14} y={100} textAnchor="end" fontSize="15" fontWeight="900" fill={NOIR}>
        A
      </text>
      <text x={CB.x + 14} y={100} fontSize="15" fontWeight="900" fill={NOIR}>
        B
      </text>
    </svg>
  </div>
);

// RÉFLEXE 2 — la règle graduée : AB = 6 cm, le milieu à 3 cm (banque).
const regleMilieu = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      size: { width: 240, height: 80 },
      min: 0,
      max: 6,
      step: 1,
      points: [
        { value: 0, label: "A", color: NOIR },
        { value: 3, label: "M", color: ROUGE },
        { value: 6, label: "B", color: NOIR },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    }}
  />
);

// RÉFLEXE 3 — le pliage : la feuille, le pli au milieu, A et B de part et d'autre.
const figurePliage = droites(
  175,
  [
    { id: "f1", type: "segment", from: { x: 15, y: 15 }, to: { x: 245, y: 15 }, color: "#94a3b8", strokeWidth: 2 },
    { id: "f2", type: "segment", from: { x: 245, y: 15 }, to: { x: 245, y: 160 }, color: "#94a3b8", strokeWidth: 2 },
    { id: "f3", type: "segment", from: { x: 245, y: 160 }, to: { x: 15, y: 160 }, color: "#94a3b8", strokeWidth: 2 },
    { id: "f4", type: "segment", from: { x: 15, y: 160 }, to: { x: 15, y: 15 }, color: "#94a3b8", strokeWidth: 2 },
    { id: "pli", type: "segment", from: { x: 130, y: 15 }, to: { x: 130, y: 160 }, color: ORANGE, dashed: true },
    { id: "AB", type: "segment", from: { x: 50, y: 95 }, to: { x: 210, y: 95 }, color: NOIR },
    etiquette("lpli", 152, 40, "pli", ORANGE),
  ],
  [
    { x: 50, y: 95, label: "A" },
    { x: 210, y: 95, label: "B" },
  ]
);

// USAGES 1 ET 2 — le cercle. Cadre 240 : lettres en 15 → 14 px dans une carte.
// Les points sont posés par leur ANGLE sur le cercle (repère « y vers le haut »,
// comme la banque), donc exactement sur le cercle.
const CX = 120;
const CY = 100;
const R = 80;
const surCercle = (deg: number) => ({
  x: CX + R * Math.cos((deg * Math.PI) / 180),
  y: CY - R * Math.sin((deg * Math.PI) / 180),
});
const cercle = (points: CercleCanvasData["points"], segments: CercleCanvasData["segments"]) => (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: { width: 240, height: 195 },
      circle: { cx: CX, cy: CY, r: R, showCircle: true },
      points,
      segments,
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

// USAGE 1 — le milieu d'une corde : la perpendiculaire depuis O tombe au milieu H.
const P1 = surCercle(200);
const Q1 = surCercle(330);
const H1 = { x: (P1.x + Q1.x) / 2, y: (P1.y + Q1.y) / 2 };
const figureCorde = cercle(
  [
    { id: "O", x: CX, y: CY, label: "O", highlight: true },
    { id: "P", x: P1.x, y: P1.y, label: "P" },
    { id: "Q", x: Q1.x, y: Q1.y, label: "Q" },
    { id: "H", x: H1.x, y: H1.y, label: "H", color: VIOLET },
  ],
  [
    { id: "PQ", kind: "corde", from: "P", to: "Q" },
    { id: "OH", kind: "segment", from: "O", to: "H", color: VIOLET, dashed: true },
  ]
);

// USAGE 2 — le centre perdu : deux cordes, leurs deux médiatrices, qui se
// croisent en O. La médiatrice de la corde (200° ; 330°) est la droite des
// angles 85° et 265° ; celle de la corde (340° ; 50°), des angles 15° et 195°.
// ⚠️ Les deux cordes sont choisies pour que leurs médiatrices se coupent
// franchement (70°) : avec des cordes voisines, elles se confondaient en un X
// trop fermé — vu au rendu.
const P2 = surCercle(340);
const Q2 = surCercle(50);
const m1a = surCercle(85);
const m1b = surCercle(265);
const m2a = surCercle(15);
const m2b = surCercle(195);
const figureCentre = cercle(
  [
    { id: "O", x: CX, y: CY, label: "O", highlight: true },
    { id: "P1", x: P1.x, y: P1.y, label: "" },
    { id: "Q1", x: Q1.x, y: Q1.y, label: "" },
    { id: "P2", x: P2.x, y: P2.y, label: "" },
    { id: "Q2", x: Q2.x, y: Q2.y, label: "" },
    { id: "m1a", x: m1a.x, y: m1a.y, label: "" },
    { id: "m1b", x: m1b.x, y: m1b.y, label: "" },
    { id: "m2a", x: m2a.x, y: m2a.y, label: "" },
    { id: "m2b", x: m2b.x, y: m2b.y, label: "" },
  ],
  [
    { id: "c1", kind: "corde", from: "P1", to: "Q1" },
    { id: "c2", kind: "corde", from: "P2", to: "Q2" },
    { id: "d1", kind: "segment", from: "m1a", to: "m1b", color: BLEU, dashed: true },
    { id: "d2", kind: "segment", from: "m2a", to: "m2b", color: BLEU, dashed: true },
  ]
);

// USAGE 3 — deux copains en E et F : tous les points de la médiatrice sont à
// égale distance des deux maisons. Trois rendez-vous possibles, parmi une infinité.
const figureRendezVous = droites(
  185,
  [
    verticale("d", 130),
    { id: "EF", type: "segment", from: { x: 40, y: 115 }, to: { x: 220, y: 115 }, color: NOIR },
    ...angleDroit("ad", 130, 115),
  ],
  [
    { x: 40, y: 115, label: "E" },
    { x: 220, y: 115, label: "F" },
    { x: 130, y: 30, color: VIOLET },
    { x: 130, y: 72, color: VIOLET },
    { x: 130, y: 165, color: VIOLET },
  ]
);

// EXEMPLE 1 — perpendiculaire, mais pas au milieu : ce n'est pas la médiatrice.
const figurePasMilieu = droites(
  150,
  [
    verticale("d", 178),
    { id: "AB", type: "segment", from: { x: 40, y: 100 }, to: { x: 220, y: 100 }, color: NOIR },
    ...angleDroit("ad", 178, 100),
    etiquette("ld", 198, 30, "(d)", BLEU),
  ],
  [
    { x: 40, y: 100, label: "A" },
    { x: 130, y: 100, label: "M", color: ROUGE, highlight: true },
    { x: 220, y: 100, label: "B" },
  ]
);

// EXEMPLE 2 — K SOUS le segment, sur la médiatrice de [EF] : KE = 9 cm, KF = ?
const figureK = droites(
  165,
  [
    verticale("d", 130),
    { id: "EF", type: "segment", from: { x: 40, y: 45 }, to: { x: 220, y: 45 }, color: NOIR },
    ...angleDroit("ad", 130, 45),
    { id: "KE", type: "segment", from: { x: 130, y: 140 }, to: { x: 40, y: 45 }, color: VIOLET, dashed: true },
    { id: "KF", type: "segment", from: { x: 130, y: 140 }, to: { x: 220, y: 45 }, color: VIOLET, dashed: true },
    etiquette("lKE", 55, 118, "9 cm", VIOLET),
    etiquette("lKF", 205, 118, "?", VIOLET),
  ],
  [
    { x: 40, y: 45, label: "E" },
    { x: 220, y: 45, label: "F" },
    { x: 130, y: 140, label: "K", color: VIOLET, highlight: true },
  ]
);

// EXEMPLE 3 — le triangle isocèle en A : la hauteur issue de A tombe au milieu
// de [BC]. Triangle symétrique (B et C à 80 de l'axe x = 120), donc le pied de
// la hauteur est EXACTEMENT le milieu de [BC] : c'est la médiatrice.
const figureIsocele = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 240, height: 215 },
      points: { A: { x: 120, y: 30 }, B: { x: 40, y: 190 }, C: { x: 200, y: 190 } },
      marks: { equalSides: [["AB", "CA"]] },
      height: { fromVertex: "A", label: "(d)" },
      display: { showPoints: true, showLabels: true, showSides: false, showAngles: false },
    }}
  />
);

// EXERCICE 1 — par le milieu, mais penchée à 70° : la droite part de M dans
// la direction 70° (cos 70° ≈ 0,342 ; sin 70° ≈ 0,940), donc sans angle droit.
const figureSeptante = droites(
  150,
  [
    { id: "AB", type: "segment", from: { x: 40, y: 100 }, to: { x: 220, y: 100 }, color: NOIR },
    { id: "d", type: "droite", from: { x: 130, y: 100 }, to: { x: 130 + 60 * 0.342, y: 100 - 60 * 0.94 }, color: BLEU },
  ],
  [
    { x: 40, y: 100, label: "A" },
    { x: 130, y: 100, label: "M", color: ROUGE, highlight: true },
    { x: 220, y: 100, label: "B" },
  ]
);

const pieges = [
  "Une droite qui passe par le milieu n'est pas forcément la médiatrice. Il faut aussi l'angle droit.",
  "MA = MB ne veut pas dire que M est le milieu. M est seulement sur la médiatrice.",
  "Au compas, on change d'écartement entre A et B. Il faut garder le même.",
];

const aRetenir = [
  "La médiatrice de [AB] est perpendiculaire à [AB] et passe par son milieu.",
  "Sur la médiatrice de [AB], chaque point est à égale distance de A et B.",
  "Si PA = PB, alors P est sur la médiatrice de [AB].",
];

export const ficheMediatriceSegment6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "mediatrice-segment",
  titre: "La médiatrice d'un segment",
  accroche:
    "La médiatrice coupe un segment en deux, bien droit. Tous ses points sont à la même distance des deux bouts.",
  identite: [
    { label: "Deux conditions", valeur: "Perpendiculaire ET par le milieu" },
    { label: "Le secret", valeur: "Même distance de A et de B" },
    { label: "Les outils", valeur: "Compas, équerre ou pliage" },
  ],
  definition: {
    texte:
      "La médiatrice de [AB] est une droite. Elle est perpendiculaire à [AB]. Elle passe par le milieu de [AB].",
  },
  figure: {
    schema: legende(figureDefinition, "L'angle droit, et deux moitiés de 3 cm."),
    legende: "La médiatrice est une droite : elle continue des deux côtés.",
  },
  proprietes: [
    {
      titre: "Sur la médiatrice : même distance",
      micros: ["mediatrice_propriete"],
      texte: "Si P est sur la médiatrice de [AB], alors PA = PB.",
      schema: legende(figureSens1, "PA = 7 cm, donc PB = 7 cm."),
    },
    {
      titre: "Même distance : sur la médiatrice",
      micros: ["mediatrice_propriete"],
      texte: "Et dans l'autre sens : si KA = KB, alors K est sur la médiatrice de [AB]. C'est ce sens qui sert à prouver.",
      schema: tableauDeuxSens,
    },
    {
      titre: "Ailleurs, pas la même distance",
      micros: ["mediatrice_propriete"],
      texte: "Un point qui n'est pas sur la médiatrice est plus près de A, ou plus près de B.",
      schema: legende(figureHors, "N est plus près de A : 5 cm contre 8 cm."),
    },
  ],
  reel: {
    texte:
      "Deux copains habitent en E et en F. Ils cherchent un point de rendez-vous à la même distance des deux maisons. Tous les points de la médiatrice conviennent. Et pour retrouver le centre d'une assiette ronde, on trace deux médiatrices.",
  },
  historique: {
    texte:
      "Il y a environ 2 300 ans, le Grec Euclide écrit un grand livre de géométrie. Sa toute première construction trace deux cercles de même rayon, l'un autour de A, l'autre autour de B. Leurs points de croisement sont sur la médiatrice de [AB]. C'est encore la construction au compas qu'on fait en classe.",
  },
  methode: [
    {
      titre: "Au compas",
      micros: ["mediatrice_construire"],
      texte:
        "Avec le même écartement, on trace deux arcs depuis A, puis deux depuis B. On relie les deux croisements : c'est la médiatrice.",
      schema: legende(constructionCompas, "Même écartement depuis A et depuis B."),
    },
    {
      titre: "À la règle et à l'équerre",
      micros: ["mediatrice_construire"],
      texte:
        "On mesure AB et on place le milieu : pour 6 cm, à 3 cm de A. Puis on trace la perpendiculaire en ce point, à l'équerre.",
      schema: legende(regleMilieu, "AB = 6 cm : le milieu M est à 3 cm."),
    },
    {
      titre: "Par pliage",
      micros: ["mediatrice_construire"],
      texte: "On plie la feuille pour poser A exactement sur B. Le pli est la médiatrice de [AB].",
      schema: legende(figurePliage, "Le pli envoie A sur B."),
    },
  ],
  usages: [
    {
      titre: "Le milieu d'une corde",
      micros: ["mediatrice_probleme"],
      detail:
        "OP = OQ, car ce sont deux rayons. Donc O est sur la médiatrice de [PQ] : la perpendiculaire depuis O tombe au milieu H.",
      schema: legende(figureCorde, "H est le milieu de la corde [PQ]."),
    },
    {
      titre: "Retrouver le centre perdu",
      micros: ["mediatrice_probleme"],
      detail:
        "On trace deux cordes, puis leurs médiatrices. Le centre du cercle est leur point de croisement.",
      schema: legende(figureCentre, "Deux médiatrices, un seul croisement : O."),
    },
    {
      titre: "Un point de rendez-vous",
      micros: ["mediatrice_defi"],
      detail:
        "Tous les points de la médiatrice de [EF] sont à égale distance de E et de F. Il y a donc une infinité de rendez-vous possibles.",
      schema: legende(figureRendezVous, "Chaque point violet convient."),
    },
  ],
  exemples: [
    {
      titre: "Médiatrice ou pas ?",
      micros: ["mediatrice_definition"],
      donnees: "La droite (d) est perpendiculaire à [AB]. Elle ne passe pas par le milieu M.",
      question: "Est-ce la médiatrice de [AB] ?",
      schema: figurePasMilieu,
      solution:
        "Non. La marque montre l'angle droit : c'est bon. Mais (d) coupe [AB] à côté du milieu. Il manque une condition, ce n'est donc pas la médiatrice.",
    },
    {
      titre: "Trouver une longueur",
      micros: ["mediatrice_propriete"],
      donnees: "Le point K est sur la médiatrice de [EF]. KE = 9 cm.",
      question: "Combien mesure KF ?",
      schema: figureK,
      solution:
        "K est sur la médiatrice de [EF]. Donc K est à égale distance de E et de F. Donc KF = KE = 9 cm.",
    },
    {
      titre: "Le triangle isocèle",
      micros: ["mediatrice_defi"],
      donnees: "Le triangle ABC est isocèle en A : AB = AC.",
      question: "La droite qui passe par A et par le milieu de [BC] est-elle la médiatrice de [BC] ?",
      schema: figureIsocele,
      solution:
        "Oui. AB = AC, donc A est sur la médiatrice de [BC]. Le milieu de [BC] est aussi sur cette médiatrice. Deux points suffisent pour une droite : c'est bien elle.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une droite passe par le milieu de [AB] et fait un angle de 70° avec lui. Est-ce la médiatrice ?",
      correction: "Non. Elle passe par le milieu, mais l'angle n'est pas droit.",
      micros: ["mediatrice_definition"],
      schema: figureSeptante,
    },
    {
      question: "P est sur la médiatrice de [AB] et PA = 7 cm. Combien mesure PB ?",
      correction: "PB = 7 cm, car P est à égale distance de A et de B.",
      micros: ["mediatrice_propriete"],
    },
    {
      question: "KA = 6 cm et KB = 8 cm. K est-il sur la médiatrice de [AB] ?",
      correction: "Non. Les deux distances sont différentes : K est plus près de A.",
      micros: ["mediatrice_propriete"],
    },
    {
      question: "On veut tracer la médiatrice de [AB], avec AB = 10 cm, à la règle et à l'équerre. Où pose-t-on l'équerre ?",
      correction: "Au milieu de [AB], à 10 ÷ 2 = 5 cm de A.",
      micros: ["mediatrice_construire"],
    },
    {
      question: "Un cercle de centre O a un rayon de 4 cm. [PQ] est une corde. Combien mesure OP ?",
      correction: "OP = 4 cm : [OP] est un rayon. De même OQ = 4 cm, donc O est sur la médiatrice de [PQ].",
      micros: ["mediatrice_probleme"],
    },
    {
      question: "SA = SB = 5 cm, et M est le milieu de [AB]. La droite (SM) est-elle la médiatrice de [AB] ?",
      correction: "Oui. S est sur la médiatrice, et M aussi. Deux points suffisent : (SM) est la médiatrice.",
      micros: ["mediatrice_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  tiMargo: {
    objectif: "Deux conditions : l'angle droit ET le milieu !",
    reel: "Un rendez-vous à égale distance ? Sur la médiatrice !",
    methode: "Au compas, garde le même écartement !",
    pieges: "Angle droit sans milieu : ce n'est pas la médiatrice !",
    retenir: "Sur la médiatrice : même distance des deux bouts.",
    exercice: "À toi ! Vérifie les deux conditions.",
  },
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesMediatriceSegment6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Médiatrice - 6e",
    teinte: "objectif",
    schema: avecMargo(figureDefinition, "Deux conditions : l'angle droit ET le milieu !"),
    section: {
      type: "objectif",
      phrase: "La médiatrice coupe un segment en deux, bien droit",
      sousPhrase: "Elle est perpendiculaire au segment et passe par son milieu.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: figureRendezVous,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Un rendez-vous à égale distance de deux maisons ? N'importe quel point de la médiatrice.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Il y a 2 300 ans, Euclide traçait déjà deux cercles de même rayon, autour de A et de B.",
      },
    },
  },
  {
    titre: "Sur la médiatrice",
    badge: "Propriété",
    teinte: "propriete",
    schema: avecMargo(figureSens1, "Sur la médiatrice : même distance de A et de B !"),
    section: {
      type: "objectif",
      phrase: "P est sur la médiatrice, donc PA = PB",
      sousPhrase: "PA = 7 cm, donc PB = 7 cm.",
    },
  },
  {
    titre: "Dans l'autre sens",
    badge: "Propriété",
    teinte: "propriete",
    schema: tableauDeuxSens,
    section: {
      type: "objectif",
      phrase: "KA = KB, donc K est sur la médiatrice",
      sousPhrase: "C'est ce sens-là qui sert à prouver.",
    },
  },
  {
    titre: "Construire au compas",
    badge: "Méthode",
    teinte: "methode",
    schema: avecMargo(constructionCompas, "Garde le même écartement !", "joie"),
    section: {
      type: "etapes",
      etapes: [
        "Ouvre le compas plus grand que la moitié de AB.",
        "Pointe en A : un arc au-dessus, un arc au-dessous.",
        "Même écartement, pointe en B : deux arcs qui coupent les premiers.",
        "Relie les deux croisements à la règle.",
      ],
    },
  },
  {
    titre: "Trois façons de construire",
    badge: "Méthode",
    teinte: "methode",
    schema: figurePliage,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Au compas", texte: "Deux arcs depuis A, deux depuis B, même écartement. On relie les croisements." },
        { titre: "À l'équerre", texte: "On place le milieu à la règle, puis l'angle droit à l'équerre." },
        { titre: "Par pliage", texte: "On pose A sur B en pliant. Le pli est la médiatrice." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le centre perdu",
    teinte: "exemple",
    schema: figureCentre,
    section: {
      type: "exemple",
      enonce: "On a tracé un cercle, mais on a perdu son centre.",
      question: "Comment le retrouver ?",
      correction: "On trace deux cordes, puis leurs médiatrices. Elles se croisent au centre O.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(figurePasMilieu, "Angle droit, mais pas au milieu : raté !", "attention"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "Une seule condition", texte: "Il faut l'angle droit ET le milieu. Une seule ne suffit pas." },
        { titre: "Pas le milieu", texte: "MA = MB : M est sur la médiatrice, pas forcément au milieu." },
        { titre: "Le compas", texte: "On garde le même écartement depuis A et depuis B." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(figureK, "À toi ! Même distance des deux bouts.", "joie"),
    section: {
      type: "exercice",
      enonce: "K est sur la médiatrice de [EF], et KE = 9 cm.",
      question: "Combien mesure KF ?",
      indice: "Sur la médiatrice, les deux distances sont égales.",
      correction: "KF = 9 cm.",
    },
  },
];
