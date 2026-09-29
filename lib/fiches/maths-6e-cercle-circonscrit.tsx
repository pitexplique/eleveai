// ─── Fiche de cours : médiatrices d'un triangle et cercle circonscrit (6e) ────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/cercle-circonscrit.bank.ts, notionId cercle_circonscrit).
//
// Micro-compétences 3/3 — le mapping micro → blocs :
//   circonscrit_concourantes → propriétés 1 et 2 (le croisement, la preuve),
//                              exemples 1 et 3
//   circonscrit_construire   → définition + figure, propriété 3, réflexes 1 à 3,
//                              piège 1
//   circonscrit_defi         → usages 1 à 3 (assiette, puits, points alignés),
//                              exemple 2, pièges 2 et 3
//
// ⭐ C'EST LA PREMIÈRE PREUVE DE L'ANNÉE (en-tête de la banque) : le BO veut que
// l'élève RESTITUE les arguments. La preuve tient en trois lignes « je sais /
// donc », et elle a son propre dessin : un tableau à deux colonnes.
//
// ⭐ LE TRIANGLE EST INSCRIT PAR CONSTRUCTION : ses sommets sont posés par leur
// angle sur le cercle (210°, 330°, 70°), donc exactement dessus, et le centre
// est le vrai centre. Les médiatrices sont CALCULÉES (milieu du côté, direction
// vers O) : elles sont perpendiculaires et passent par O, sans rien à l'œil.
// ⚠️ Ces angles ne sont pas pris au hasard. Le nom d'un point s'écrit en haut à
// droite de lui : une médiatrice qui partirait de O vers le haut à droite (entre
// 25° et 65°) passerait sur le « O ». Avec 210°, 330° et 70°, les trois
// médiatrices partent à 90°, 20° et 140° : le « O » reste lisible.
//
// Les nombres viennent de la banque : OA = 5 → OB = 5 (gabarit) ; rayon 6 cm ;
// OB = 6 → diamètre 12 (gabarit du défi).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import type { CercleCanvasData, DroitesCanvasData } from "@/lib/tutor-v4/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Trait = DroitesCanvasData["lines"][number];
type PointD = NonNullable<DroitesCanvasData["points"]>[number];
type Pt = { x: number; y: number };

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ROUGE = "#ef4444";
const NOIR = "#0f172a";
const GRIS = "#94a3b8";

const legende = (dessin: ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ─── Le triangle et son cercle ────────────────────────────────────────────────
// Cadre 240 : lettres en 15 → 14 px dans une carte de téléphone.
const LARGEUR = 240;
const O: Pt = { x: 120, y: 112 };
const R = 78;
const surCercle = (deg: number, c: Pt = O, r = R): Pt => ({
  x: c.x + r * Math.cos((deg * Math.PI) / 180),
  y: c.y - r * Math.sin((deg * Math.PI) / 180),
});
const A = surCercle(210);
const B = surCercle(330);
const C = surCercle(70);
const milieu = (p: Pt, q: Pt): Pt => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });

/** La médiatrice de [PQ] : la droite du milieu de [PQ] vers O (qui est dessus). */
const mediatrice = (id: string, p: Pt, q: Pt, color = BLEU): Trait => {
  const m = milieu(p, q);
  return { id, type: "droite", from: m, to: O, color, dashed: true, strokeWidth: 3 };
};

const cotes: Trait[] = [
  { id: "AB", type: "segment", from: A, to: B, color: NOIR, strokeWidth: 3 },
  { id: "BC", type: "segment", from: B, to: C, color: NOIR, strokeWidth: 3 },
  { id: "CA", type: "segment", from: C, to: A, color: NOIR, strokeWidth: 3 },
];
const sommets: PointD[] = [
  { ...A, label: "A" },
  { ...B, label: "B" },
  { ...C, label: "C" },
];
/** Les milieux, en petits ronds blancs : la médiatrice y passe. */
const milieux = (paires: [Pt, Pt][]): PointD[] => paires.map(([p, q]) => ({ ...milieu(p, q), color: "#ffffff" }));

const droites = (hauteur: number, lines: Trait[], points: PointD[]) => (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: LARGEUR, height: hauteur },
      lines,
      points,
      display: { showGrid: false, showLabels: true, showPoints: true },
    }}
  />
);

const cercle = (
  opts: { cercle?: boolean; arcs?: CercleCanvasData["arcs"] },
  points: CercleCanvasData["points"],
  segments: CercleCanvasData["segments"]
) => (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: { width: LARGEUR, height: 205 },
      circle: { cx: O.x, cy: O.y, r: R, showCircle: opts.cercle ?? true },
      points,
      segments,
      arcs: opts.arcs,
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

const pointsTriangle: CercleCanvasData["points"] = [
  { id: "A", ...A, label: "A" },
  { id: "B", ...B, label: "B" },
  { id: "C", ...C, label: "C" },
];
const cordesTriangle: CercleCanvasData["segments"] = [
  { id: "AB", kind: "corde", from: "A", to: "B", color: NOIR },
  { id: "BC", kind: "corde", from: "B", to: "C", color: NOIR },
  { id: "CA", kind: "corde", from: "C", to: "A", color: NOIR },
];
const pointO = { id: "O", ...O, label: "O", highlight: true };

// DÉFINITION — le cercle passe par les trois sommets.
const figureDefinition = cercle({}, pointsTriangle, cordesTriangle);

// PROPRIÉTÉ 1 — les trois médiatrices se croisent en O.
const figureTroisMediatrices = droites(
  210,
  [...cotes, mediatrice("mAB", A, B), mediatrice("mBC", B, C), mediatrice("mCA", C, A)],
  [...sommets, ...milieux([[A, B], [B, C], [C, A]]), { ...O, label: "O", color: ROUGE, highlight: true }]
);

// PROPRIÉTÉ 2 — la preuve, en trois lignes « je sais / donc ».
const tableauPreuve = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["je sais que…", "donc…"],
      rows: [
        { values: ["O est sur la médiatrice de [AB]", "OA = OB"] },
        { values: ["O est sur la médiatrice de [BC]", "OB = OC"] },
        { values: ["OA = OB et OB = OC", "OA = OC : O est sur la médiatrice de [AC]"] },
      ],
      highlight: { row: 2 },
      display: { striped: true },
    }}
  />
);

// PROPRIÉTÉ 3 — trois rayons égaux. ⛔ Les longueurs ne s'écrivent PAS sur les
// rayons : dans ce cadre, « 6 cm » touchait le « A » et le côté [AC] (vu au
// rendu). La légende sous le dessin les porte.
const figureRayons = cercle({}, [...pointsTriangle, pointO], [
  ...cordesTriangle,
  { id: "OA", kind: "rayon", from: "O", to: "A", dashed: true },
  { id: "OB", kind: "rayon", from: "O", to: "B", dashed: true },
  { id: "OC", kind: "rayon", from: "O", to: "C", dashed: true },
]);

// RÉFLEXE 1 — deux médiatrices suffisent.
const figureDeuxMediatrices = droites(
  210,
  [...cotes, mediatrice("mAB", A, B), mediatrice("mBC", B, C)],
  [...sommets, ...milieux([[A, B], [B, C]]), { ...O, label: "O", color: ROUGE, highlight: true }]
);

// RÉFLEXE 2 — pointer en O, ouvrir jusqu'à A, et commencer à tourner. L'arc
// part de A (210° dans le repère de la banque, soit 150° pour le SVG, dont
// l'axe vertical descend) et remonte vers la gauche.
const figureCompas = cercle(
  { cercle: false, arcs: [{ id: "trace", startAngle: 150, endAngle: 235, color: BLEU }] },
  [...pointsTriangle, pointO],
  [...cordesTriangle, { id: "OA", kind: "rayon", from: "O", to: "A" }]
);

// RÉFLEXE 3 — le cercle tracé passe AUSSI par B et C : on vérifie.
const figureVerifier = cercle(
  {},
  [
    { id: "A", ...A, label: "A" },
    { id: "B", ...B, label: "B", highlight: true },
    { id: "C", ...C, label: "C", highlight: true },
    pointO,
  ],
  cordesTriangle
);

// USAGE 1 — l'assiette cassée : un morceau du bord, trois points dessus, deux
// cordes, leurs médiatrices tracées jusqu'au croisement. Cercle de centre O,
// rayon 75 ; le morceau va de 100° à 240° (160° à 260° pour le SVG, idem).
const RA = 75;
const QA = [120, 170, 220].map((d) => surCercle(d, O, RA));
const IA = [milieu(QA[0], QA[1]), milieu(QA[1], QA[2])];
const figureAssiette = (
  <CanvasRenderer
    figure={{
      kind: "cercle",
      size: { width: LARGEUR, height: 200 },
      circle: { cx: O.x, cy: O.y, r: RA, showCircle: false },
      arcs: [{ id: "bord", startAngle: 120, endAngle: 260, color: BLEU }],
      points: [
        { id: "P1", ...QA[0], label: "" },
        { id: "P2", ...QA[1], label: "" },
        { id: "P3", ...QA[2], label: "" },
        { id: "I1", ...IA[0], label: "", color: "#ffffff" },
        { id: "I2", ...IA[1], label: "", color: "#ffffff" },
        pointO,
      ],
      segments: [
        { id: "c1", kind: "corde", from: "P1", to: "P2", color: NOIR },
        { id: "c2", kind: "corde", from: "P2", to: "P3", color: NOIR },
        { id: "m1", kind: "segment", from: "I1", to: "O", color: BLEU, dashed: true },
        { id: "m2", kind: "segment", from: "I2", to: "O", color: BLEU, dashed: true },
      ],
      display: { showLabels: true, showPoints: true, showCenter: true },
    }}
  />
);

// USAGE 2 — trois maisons et un puits. Maisons à 100°, 220° et 340° d'un cercle
// de rayon 75 autour du puits P : les médiatrices tracées partent à 160° et 100°,
// loin du mot « puits ».
const P: Pt = { x: 120, y: 105 };
const M1 = surCercle(100, P, 75);
const M2 = surCercle(220, P, 75);
const M3 = surCercle(340, P, 75);
const versP = (id: string, p: Pt, q: Pt): Trait => ({ id, type: "droite", from: milieu(p, q), to: P, color: BLEU, dashed: true, strokeWidth: 3 });
const figurePuits = droites(
  195,
  [
    { id: "s1", type: "segment", from: M1, to: M2, color: GRIS, strokeWidth: 2, dashed: true },
    { id: "s2", type: "segment", from: M2, to: M3, color: GRIS, strokeWidth: 2, dashed: true },
    { id: "s3", type: "segment", from: M3, to: M1, color: GRIS, strokeWidth: 2, dashed: true },
    versP("m12", M1, M2),
    versP("m23", M2, M3),
  ],
  [
    { ...M1, color: NOIR },
    { ...M2, color: NOIR },
    { ...M3, color: NOIR },
    { ...P, label: "puits", color: ROUGE, highlight: true },
  ]
);

// USAGE 3 — trois points alignés : deux médiatrices PARALLÈLES. La marque
// d'angle droit est dessinée en bas à gauche (celle du canvas, en haut à droite,
// tombait sur le nom du point).
const angleDroit = (id: string, x: number, y: number, c = 12): Trait[] => [
  { id: `${id}-1`, type: "segment", from: { x: x - c, y }, to: { x: x - c, y: y + c }, color: ROUGE, strokeWidth: 3 },
  { id: `${id}-2`, type: "segment", from: { x: x - c, y: y + c }, to: { x, y: y + c }, color: ROUGE, strokeWidth: 3 },
];
const figureAlignes = droites(
  160,
  [
    { id: "ABC", type: "segment", from: { x: 30, y: 95 }, to: { x: 220, y: 95 }, color: NOIR, strokeWidth: 3 },
    { id: "m1", type: "droite", from: { x: 75, y: 20 }, to: { x: 75, y: 60 }, color: BLEU, dashed: true, strokeWidth: 3 },
    { id: "m2", type: "droite", from: { x: 170, y: 20 }, to: { x: 170, y: 60 }, color: BLEU, dashed: true, strokeWidth: 3 },
    ...angleDroit("a1", 75, 95),
    ...angleDroit("a2", 170, 95),
  ],
  [
    { x: 30, y: 95, label: "A" },
    { x: 120, y: 95, label: "B" },
    { x: 220, y: 95, label: "C" },
  ]
);

// EXEMPLE 2 — le diamètre vaut deux rayons : 6 + 6 = 12.
const barreDiametre = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 240, height: 200 },
      total: "diamètre = 12 cm",
      parts: [
        { label: "rayon", value: "6", color: "#dbeafe" },
        { label: "rayon", value: "6", color: "#dbeafe" },
      ],
      questionLabel: "2 × 6 = 12",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// EXEMPLE 3 — la preuve dessinée : deux médiatrices bleues donnent O, la
// troisième (verte) passe par O elle aussi.
const figurePreuve = droites(
  210,
  [...cotes, mediatrice("mAB", A, B), mediatrice("mBC", B, C), mediatrice("mCA", C, A, VERT)],
  [...sommets, ...milieux([[A, B], [B, C], [C, A]]), { ...O, label: "O", color: ROUGE, highlight: true }]
);

const pieges = [
  "Le cercle circonscrit passe par les trois SOMMETS. Il ne touche pas les côtés en leur milieu.",
  "Le centre n'est pas le milieu d'un côté. C'est le croisement des médiatrices.",
  "Trois points alignés n'ont pas de cercle : leurs médiatrices ne se croisent jamais.",
];

const aRetenir = [
  "Les trois médiatrices d'un triangle se croisent en un même point O.",
  "O est à la même distance des trois sommets : OA = OB = OC.",
  "Le cercle de centre O passant par A passe aussi par B et C.",
];

export const ficheCercleCirconscrit6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "cercle-circonscrit",
  titre: "Le cercle circonscrit à un triangle",
  accroche:
    "Un seul cercle passe par les trois sommets d'un triangle. Son centre se trouve avec deux médiatrices.",
  identite: [
    { label: "Le mot", valeur: "Circonscrit veut dire « tracé autour »" },
    { label: "Le centre", valeur: "Le croisement des médiatrices" },
    { label: "Le rayon", valeur: "Du centre à un sommet" },
  ],
  definition: {
    texte:
      "Le cercle circonscrit à un triangle passe par ses trois sommets. Son centre est à la même distance des trois sommets.",
  },
  figure: {
    schema: legende(figureDefinition, "A, B et C sont sur le cercle."),
    legende: "Chaque triangle a un seul cercle circonscrit.",
  },
  proprietes: [
    {
      titre: "Les trois médiatrices se croisent",
      micros: ["circonscrit_concourantes"],
      texte: "Les trois médiatrices d'un triangle passent par un même point. On l'appelle O.",
      schema: legende(figureTroisMediatrices, "Trois médiatrices, un seul croisement : O."),
    },
    {
      titre: "La preuve en trois lignes",
      micros: ["circonscrit_concourantes"],
      texte:
        "On part de deux médiatrices, qui se croisent en O. On prouve que la troisième passe aussi par O.",
      schema: tableauPreuve,
    },
    {
      titre: "Trois rayons égaux",
      micros: ["circonscrit_construire"],
      texte: "OA = OB = OC : c'est le rayon du cercle circonscrit. Si OA = 6 cm, alors OB = OC = 6 cm.",
      schema: legende(figureRayons, "OA = OB = OC = 6 cm."),
    },
  ],
  reel: {
    texte:
      "Une assiette ronde est cassée : il ne reste qu'un morceau du bord. Avec trois points du bord, on retrouve son centre et sa taille. Trois maisons veulent un puits à la même distance de chacune. On le creuse au croisement des médiatrices.",
  },
  historique: {
    texte:
      "Il y a environ 2 300 ans, le Grec Euclide pose déjà le problème. Comment tracer le cercle qui passe par les trois sommets d'un triangle ? Sa méthode : couper deux côtés en leur milieu, et tracer les perpendiculaires. C'est exactement la méthode des deux médiatrices.",
  },
  methode: [
    {
      titre: "Tracer deux médiatrices",
      micros: ["circonscrit_construire"],
      texte:
        "On construit au compas les médiatrices de deux côtés. Leur croisement est le centre O.",
      schema: legende(figureDeuxMediatrices, "Deux médiatrices suffisent."),
    },
    {
      titre: "Ouvrir le compas de O à A",
      micros: ["circonscrit_construire"],
      texte: "On pique le compas en O. On l'ouvre jusqu'au sommet A : c'est le rayon.",
      schema: legende(figureCompas, "Le rayon est OA : le compas part de A."),
    },
    {
      titre: "Tracer et vérifier",
      micros: ["circonscrit_construire"],
      texte: "On trace le cercle. Il doit passer par B et par C : sinon, on reprend le tracé.",
      schema: legende(figureVerifier, "Le cercle passe bien par B et par C."),
    },
  ],
  usages: [
    {
      titre: "Réparer une assiette cassée",
      micros: ["circonscrit_defi"],
      detail:
        "On pose trois points sur le bord du morceau. Les médiatrices de deux cordes se croisent au centre de l'assiette.",
      schema: legende(figureAssiette, "Il ne reste qu'un morceau, mais on trouve le centre O."),
    },
    {
      titre: "Un puits pour trois maisons",
      micros: ["circonscrit_defi"],
      detail:
        "Le puits doit être à la même distance des trois maisons. Il y a une seule place : le croisement des médiatrices.",
      schema: legende(figurePuits, "Une seule place possible pour le puits."),
    },
    {
      titre: "Trois points alignés : impossible",
      micros: ["circonscrit_defi"],
      detail:
        "Si A, B et C sont alignés, les deux médiatrices sont parallèles. Elles ne se croisent pas : aucun cercle ne passe par les trois.",
      schema: legende(figureAlignes, "Deux médiatrices parallèles, pas de centre."),
    },
  ],
  exemples: [
    {
      titre: "Une longueur de plus",
      micros: ["circonscrit_concourantes"],
      donnees: "O est le point de croisement des médiatrices du triangle ABC. OA = 5 cm.",
      question: "Combien mesure OB ?",
      schema: legende(figureRayons, "OA = 5 cm. Et OB ?"),
      solution: "O est sur les trois médiatrices. Donc OA = OB = OC. Donc OB = 5 cm.",
    },
    {
      titre: "Du rayon au diamètre",
      micros: ["circonscrit_defi"],
      donnees: "Le centre O du cercle circonscrit au triangle ABC vérifie OB = 6 cm.",
      question: "Quel est le diamètre de ce cercle ?",
      schema: barreDiametre,
      solution: "OB est un rayon : le rayon vaut 6 cm. Le diamètre vaut deux rayons : 2 × 6 = 12 cm.",
    },
    {
      titre: "Refaire la preuve",
      micros: ["circonscrit_concourantes"],
      donnees: "O est le croisement des médiatrices de [AB] et de [BC].",
      question: "Pourquoi la médiatrice de [AC] passe-t-elle aussi par O ?",
      schema: figurePreuve,
      solution:
        "O est sur la médiatrice de [AB], donc OA = OB. O est sur la médiatrice de [BC], donc OB = OC. Alors OA = OC. Donc O est sur la médiatrice de [AC].",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Qu'est-ce que le cercle circonscrit à un triangle ?",
      correction: "C'est le cercle qui passe par les trois sommets du triangle.",
      micros: ["circonscrit_construire"],
      schema: figureDefinition,
    },
    {
      question: "Combien de médiatrices faut-il tracer, au minimum, pour trouver le centre ?",
      correction: "Deux. La troisième passe forcément par leur croisement : elle sert seulement à vérifier.",
      micros: ["circonscrit_construire"],
    },
    {
      question: "O est le croisement des médiatrices du triangle MNP, et OM = 8 cm. Combien mesure OP ?",
      correction: "OP = 8 cm, car OM = ON = OP.",
      micros: ["circonscrit_concourantes"],
    },
    {
      question: "Le rayon du cercle circonscrit au triangle ABC mesure 6 cm. Combien mesure OB ?",
      correction: "OB = 6 cm : B est sur le cercle, donc [OB] est un rayon.",
      micros: ["circonscrit_construire"],
    },
    {
      question: "A, B et C sont alignés. Peut-on tracer un cercle qui passe par les trois ?",
      correction: "Non. Les médiatrices de [AB] et de [BC] sont parallèles : elles ne se croisent pas.",
      micros: ["circonscrit_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  tiMargo: {
    objectif: "Un seul cercle passe par les trois sommets !",
    reel: "Trois points du bord suffisent pour trouver le centre !",
    methode: "Deux médiatrices suffisent pour trouver O !",
    pieges: "Le cercle passe par les sommets, pas par les milieux !",
    retenir: "OA = OB = OC : trois rayons égaux.",
    exercice: "À toi ! Le cercle passe par les trois sommets.",
  },
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesCercleCirconscrit6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Cercle circonscrit - 6e",
    teinte: "objectif",
    schema: avecMargo(figureDefinition, "Un seul cercle passe par les trois sommets !"),
    section: {
      type: "objectif",
      phrase: "Tracer le cercle qui passe par les trois sommets",
      sousPhrase: "Son centre est à la même distance de A, de B et de C.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: figureAssiette,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Une assiette cassée ? Trois points du bord suffisent pour retrouver son centre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Il y a 2 300 ans, Euclide trouvait déjà ce centre avec deux perpendiculaires.",
      },
    },
  },
  {
    titre: "Les trois médiatrices",
    badge: "Propriété",
    teinte: "propriete",
    schema: avecMargo(figureTroisMediatrices, "Les trois se croisent au même point !", "joie"),
    section: {
      type: "objectif",
      phrase: "Les trois médiatrices se croisent en un point O",
      sousPhrase: "O est le centre du cercle circonscrit.",
    },
  },
  {
    titre: "La preuve",
    badge: "Propriété",
    teinte: "propriete",
    schema: tableauPreuve,
    section: {
      type: "etapes",
      etapes: [
        "O est sur la médiatrice de [AB], donc OA = OB.",
        "O est sur la médiatrice de [BC], donc OB = OC.",
        "Donc OA = OC : O est sur la médiatrice de [AC].",
      ],
    },
  },
  {
    titre: "Construire le cercle",
    badge: "Méthode",
    teinte: "methode",
    schema: avecMargo(figureDeuxMediatrices, "Deux médiatrices suffisent !"),
    section: {
      type: "etapes",
      etapes: [
        "Trace les médiatrices de deux côtés.",
        "Appelle O leur point de croisement.",
        "Pique en O, ouvre le compas jusqu'à A.",
        "Trace le cercle : il passe par B et C.",
      ],
    },
  },
  {
    titre: "Trois points alignés",
    badge: "Défi",
    teinte: "propriete",
    schema: avecMargo(figureAlignes, "Trois points alignés : aucun cercle !", "attention"),
    section: {
      type: "objectif",
      phrase: "Les médiatrices sont parallèles",
      sousPhrase: "Elles ne se croisent jamais : pas de centre, donc pas de cercle.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Une longueur",
    teinte: "exemple",
    schema: figureRayons,
    section: {
      type: "exemple",
      enonce: "O est le croisement des médiatrices du triangle ABC. OA = 5 cm.",
      question: "Combien mesure OB ?",
      correction: "OA = OB = OC, donc OB = 5 cm.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: figureCompas,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les sommets", texte: "Le cercle passe par les trois SOMMETS, pas par le milieu des côtés." },
        { titre: "Le centre", texte: "Ce n'est pas le milieu d'un côté : c'est le croisement des médiatrices." },
        { titre: "Le rayon", texte: "On ouvre le compas de O jusqu'à un sommet." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(barreDiametre, "À toi ! Un diamètre, c'est deux rayons.", "joie"),
    section: {
      type: "exercice",
      enonce: "Le centre O du cercle circonscrit vérifie OB = 6 cm.",
      question: "Quel est le diamètre du cercle ?",
      indice: "OB est un rayon.",
      correction: "2 × 6 = 12 cm.",
    },
  },
];
