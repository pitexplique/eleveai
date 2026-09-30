// ─── Fiche de cours : la symétrie axiale (6e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/symetrie.bank.ts, notionId sym_axiale — lecture seule).
// Réécrite le 30/09/2026 au standard des fiches de 6e (étalon :
// `maths-6e-bissectrice-angle.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo dans le mode classe.
//
// Micro-compétences 6/6 → blocs :
//   sym_reconnaitre → définition + figure, méthode 1 (plier en pensée),
//                     exemple 1, exercice 1
//   sym_point       → propriétés 1 et 2 (même distance ; l'axe coupe [AA'] en
//                     son milieu, à angle droit), méthodes 2 et 3, exemple 2,
//                     exercice 2
//   sym_figure      → méthode 3 (chaque sommet), usage 1 (un quadrilatère),
//                     exercice 3
//   sym_propriete   → propriété 3 (rien ne change), usage 2 (l'angle de 40°),
//                     exercice 4
//   sym_axe         → propriété 4 (les 4 axes du carré), usage 3 (les 3 axes
//                     du triangle équilatéral), exercice 5
//   sym_defi        → exemple 3 (l'aire du carré : 16 cm²), exercice 6
//
// ⭐ LES NOMBRES SONT CEUX DE LA BANQUE : A à 3 carreaux d'un axe vertical ; à
// 4 carreaux d'un axe horizontal ; un segment de 7 cm et de 6 cm ; un angle de
// 40° ; un carré de 16 cm² ; 4 axes pour le carré, 2 pour le rectangle, 3 pour
// le triangle équilatéral, une infinité pour le cercle. La feuille d'exercices
// (`lib/fiches-exercices/maths-6e-sym-axiale.tsx`) a évité exprès ces nombres,
// le carrelage et le papillon : on les garde. ⛔ Aucun de ses exemples (chalet
// et lac, logo du club, lettres, sapin, billard, drapeaux…). « Carrelage à La
// Réunion » (banque) devient « carrelage ».
//
// ⭐ UN DESSIN PAR BLOC, JAMAIS DEUX FOIS LE MÊME. Le canvas `transformation`
// dessine toujours une figure, un axe et son image : il garde la définition,
// les exemples, le pliage raté, le report de distance et la figure entière.
// `droites` pose ce qu'il ne sait pas faire (le milieu, l'angle droit, les 4
// axes du carré) ; le tableau dit « rien ne change ». Les nouveaux dessins de
// septembre (l'angle de 40° et son image, les 3 axes du triangle, le carré de
// 16 cm²) sont des SVG locaux (`schemas-angles-6e.tsx`) : figures JUSTES, un
// arc de 40° ouvre vraiment 40°.
//
// ⚠️ `cellSize: 22, padding: 18` SUR TOUS LES QUADRILLAGES, et c'est mesuré : à
// 30, la phrase du bas du canvas tombait à 8,7 px dans un bloc de 199 px. Le
// `padding` est passé de 10 à 18 le 30/09 : le canvas écrit « axe » à
// `padding − 6` au-dessus du quadrillage, et à 10 le mot sortait du cadre par
// le haut (mesuré : haut du texte à −6). À 18, il rentre ; les lettres restent
// à 11,3 px sur 200 px de SVG.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import {
  BLEU,
  Dessin,
  ORANGE,
  ROUGE,
  legende,
  polaire,
  type Pt,
} from "@/lib/fiches/schemas-angles-6e";

const NOIR = "#0f172a";

type PointGrille = { x: number; y: number };

/** Une figure, un axe et son image, sur le quadrillage du coach (8 × 6). */
const miroir = (opts: {
  axe: { type: "vertical"; x: number; label: string } | { type: "horizontal"; y: number; label: string };
  source: PointGrille[];
  sourceLabel: string;
  image: PointGrille[];
  imageLabel: string;
  pointilles?: boolean;
}) => (
  <CanvasRenderer
    figure={{
      kind: "transformation",
      transformation: "symetrie_axiale",
      grid: { rows: 6, cols: 8 },
      size: { cellSize: 22, padding: 18 },
      axis: opts.axe,
      source: { points: opts.source, label: opts.sourceLabel },
      image: { points: opts.image, label: opts.imageLabel },
      display: {
        showTransformationInfo: true,
        showGrid: true,
        showLabels: true,
        showPoints: true,
        showDashedLinks: opts.pointilles ?? true,
      },
    }}
  />
);

// ─── LA FIGURE DE LA DÉFINITION ───────────────────────────────────────────────
const schemaSymetrie = miroir({
  axe: { type: "vertical", x: 4, label: "axe" },
  source: [{ x: 1, y: 1 }, { x: 1, y: 4 }, { x: 3, y: 1 }],
  sourceLabel: "figure",
  image: [{ x: 7, y: 1 }, { x: 7, y: 4 }, { x: 5, y: 1 }],
  imageLabel: "image",
});

// ─── UN POINT SUR L'AXE NE BOUGE PAS ──────────────────────────────────────────
// ⚠️ UNE SEULE ÉTIQUETTE : A et A' sont au même endroit, leurs deux noms se
// chevauchaient (mesuré en juin).
const pointSurLAxe = legende(
  miroir({
    axe: { type: "vertical", x: 4, label: "axe" },
    source: [{ x: 4, y: 2 }],
    sourceLabel: "A = A'",
    image: [{ x: 4, y: 2 }],
    imageLabel: "",
    pointilles: false,
  }),
  "A est sur l'axe : son image, c'est lui-même."
);

// ─── L'AXE COUPE [AA'] EN SON MILIEU, À ANGLE DROIT ───────────────────────────
const laMediatrice = legende(
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 250, height: 200 },
      lines: [
        {
          id: "axe",
          type: "droite",
          // ⚠️ Une `droite` est prolongée jusqu'aux bords : `from` et `to` ne
          // fixent que sa direction… et la place du mot « axe », écrit à leur
          // milieu. Posé à y = 90 (juin), il touchait encore le point M (vu au
          // rendu, 30/09) : le milieu descend à y = 150, M reste à y = 60.
          from: { x: 125, y: 110 },
          to: { x: 125, y: 190 },
          label: "axe",
          color: ROUGE,
          display: { showLabel: true, showArrows: false },
        },
        {
          id: "segment",
          type: "segment",
          from: { x: 45, y: 60 },
          to: { x: 205, y: 60 },
          color: BLEU,
          display: { showLabel: false, showArrows: false },
        },
      ],
      points: [
        { x: 45, y: 60, label: "A", color: BLEU },
        { x: 125, y: 60, label: "M", color: ROUGE, highlight: true },
        { x: 205, y: 60, label: "A'", color: BLEU },
      ],
      markers: {
        rightAngles: [{ x: 125, y: 60, lineA: "axe", lineB: "segment" }],
      },
    }}
  />,
  "M est le milieu de [AA'], et l'angle est droit."
);

// ─── RIEN NE CHANGE : la colonne « après » redit la colonne « avant » ─────────
const cequiSeConserve = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Mesure", "Avant", "Après"],
      rows: [
        { values: ["un segment", "7 cm", "7 cm"] },
        { values: ["un angle", "40°", "40°"] },
        { values: ["une aire", "12 cm²", "12 cm²"] },
      ],
      highlight: { col: 2 },
      display: { compact: true },
    }}
  />
);

// ─── LES 4 AXES DU CARRÉ ──────────────────────────────────────────────────────
const lesQuatreAxesDuCarre = legende(
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 250, height: 220 },
      lines: [
        { id: "h", type: "segment", from: { x: 60, y: 55 }, to: { x: 190, y: 55 }, color: NOIR, strokeWidth: 3, display: { showLabel: false } },
        { id: "d", type: "segment", from: { x: 190, y: 55 }, to: { x: 190, y: 185 }, color: NOIR, strokeWidth: 3, display: { showLabel: false } },
        { id: "b", type: "segment", from: { x: 190, y: 185 }, to: { x: 60, y: 185 }, color: NOIR, strokeWidth: 3, display: { showLabel: false } },
        { id: "g", type: "segment", from: { x: 60, y: 185 }, to: { x: 60, y: 55 }, color: NOIR, strokeWidth: 3, display: { showLabel: false } },
        { id: "ax1", type: "droite", from: { x: 125, y: 40 }, to: { x: 125, y: 200 }, color: ROUGE, dashed: true, display: { showLabel: false } },
        { id: "ax2", type: "droite", from: { x: 45, y: 120 }, to: { x: 205, y: 120 }, color: ROUGE, dashed: true, display: { showLabel: false } },
        { id: "ax3", type: "droite", from: { x: 48, y: 43 }, to: { x: 202, y: 197 }, color: ROUGE, dashed: true, display: { showLabel: false } },
        { id: "ax4", type: "droite", from: { x: 202, y: 43 }, to: { x: 48, y: 197 }, color: ROUGE, dashed: true, display: { showLabel: false } },
      ],
    }}
  />,
  "Le carré a 4 axes de symétrie."
);

// ─── PLIER EN PENSÉE : le contre-exemple, ça ne se superpose pas ──────────────
const leProblemeDuPliage = legende(
  miroir({
    axe: { type: "vertical", x: 4, label: "axe" },
    source: [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 1, y: 4 }],
    sourceLabel: "figure",
    // Étiquette courte : « pas l'image » chevauchait le mot « axe » (mesuré).
    image: [{ x: 6, y: 1 }, { x: 5, y: 3 }, { x: 7, y: 4 }],
    imageLabel: "faux",
    pointilles: false,
  }),
  "Plié, ça ne tombe pas dessus : pas de symétrie."
);

// ─── TRACER LA PERPENDICULAIRE : A' n'existe pas encore ───────────────────────
const laPerpendiculaire = legende(
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 250, height: 200 },
      lines: [
        {
          id: "axe",
          type: "droite",
          // Le mot « axe » loin de la perpendiculaire (voir `laMediatrice`).
          from: { x: 125, y: 110 },
          to: { x: 125, y: 190 },
          label: "axe",
          color: ROUGE,
          display: { showLabel: true, showArrows: false },
        },
        {
          id: "perp",
          type: "droite",
          from: { x: 45, y: 60 },
          to: { x: 210, y: 60 },
          color: BLEU,
          dashed: true,
          display: { showLabel: false, showArrows: false },
        },
      ],
      points: [{ x: 45, y: 60, label: "A", color: BLEU, highlight: true }],
      markers: {
        rightAngles: [{ x: 125, y: 60, lineA: "axe", lineB: "perp" }],
      },
    }}
  />,
  "A' sera sur cette droite."
);

// ─── REPORTER LA DISTANCE : l'axe est couché ──────────────────────────────────
// ⚠️ Pas d'étiquette sur un axe HORIZONTAL : le canvas la pose hors du cadre.
const reporterLaDistance = legende(
  miroir({
    axe: { type: "horizontal", y: 3, label: "" },
    source: [{ x: 2, y: 1 }],
    sourceLabel: "A",
    image: [{ x: 2, y: 5 }],
    imageLabel: "A'",
  }),
  "2 carreaux au-dessus, 2 carreaux en dessous."
);

// ─── CONSTRUIRE L'IMAGE D'UNE FIGURE : sommet par sommet ──────────────────────
const figureEntiere = legende(
  miroir({
    axe: { type: "vertical", x: 4, label: "axe" },
    source: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 4 }],
    sourceLabel: "figure",
    image: [{ x: 7, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 3 }, { x: 7, y: 4 }],
    imageLabel: "image",
  }),
  "4 sommets, 4 images, puis on relie."
);

// ─── L'IMAGE D'UN ANGLE DE 40° MESURE 40° ─────────────────────────────────────
const angleEtImage = (() => {
  const G: Pt = { x: -30, y: 0 };
  const D: Pt = { x: 30, y: 0 };
  return (
    <Dessin
      titre="Un angle de 40° et son image : 40° aussi"
      traits={[
        { de: { x: 0, y: -90 }, a: { x: 0, y: 22 }, couleur: ROUGE, pointille: true },
        { de: G, a: polaire(180, 80, G) },
        { de: G, a: polaire(140, 80, G) },
        { de: D, a: polaire(0, 80, D) },
        { de: D, a: polaire(40, 80, D) },
      ]}
      arcs={[
        { o: G, de: 140, a: 180, r: 26, couleur: BLEU, texte: "40°", rTexte: 50 },
        { o: D, de: 0, a: 40, r: 26, couleur: ORANGE, texte: "40°", rTexte: 50 },
      ]}
      points={[G, D]}
      textes={[{ p: { x: 0, y: -102 }, texte: "axe", couleur: ROUGE }]}
    />
  );
})();

// ─── LES 3 AXES DU TRIANGLE ÉQUILATÉRAL ───────────────────────────────────────
// Côté 170, hauteur 147,2. Chaque axe va d'un sommet au milieu du côté opposé.
const troisAxes = (() => {
  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: 170, y: 0 };
  const C: Pt = { x: 85, y: -147.2 };
  const axe = (s: Pt, p: Pt, q: Pt) => {
    const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const en = (t: number) => ({ x: s.x + t * (m.x - s.x), y: s.y + t * (m.y - s.y) });
    return { de: en(-0.12), a: en(1.14), couleur: ROUGE, pointille: true };
  };
  return (
    <Dessin
      titre="Le triangle équilatéral et ses 3 axes de symétrie"
      polygones={[{ pts: [A, B, C], fond: "#ffffff" }]}
      traits={[axe(A, B, C), axe(B, C, A), axe(C, A, B)]}
    />
  );
})();

// ─── EXEMPLE 1 : une figure et son reflet ─────────────────────────────────────
const symReflet = miroir({
  axe: { type: "vertical", x: 4, label: "axe" },
  source: [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 1, y: 4 }],
  sourceLabel: "figure",
  image: [{ x: 7, y: 1 }, { x: 5, y: 2 }, { x: 7, y: 4 }],
  imageLabel: "image",
});

// ─── EXEMPLE 2 : A à 3 carreaux de l'axe ──────────────────────────────────────
const symPoint = miroir({
  axe: { type: "vertical", x: 4, label: "axe" },
  source: [{ x: 1, y: 3 }],
  sourceLabel: "A",
  image: [{ x: 7, y: 3 }],
  imageLabel: "A'",
});

// ─── EXEMPLE 3 : le carré de 16 cm² et son image ──────────────────────────────
const carre16 = (
  <Dessin
    titre="Un carré de 16 cm² et son image par symétrie"
    polygones={[
      {
        pts: [
          { x: -130, y: -80 },
          { x: -50, y: -80 },
          { x: -50, y: 0 },
          { x: -130, y: 0 },
        ],
        fond: "#dbeafe",
        couleur: BLEU,
      },
      {
        pts: [
          { x: 50, y: -80 },
          { x: 130, y: -80 },
          { x: 130, y: 0 },
          { x: 50, y: 0 },
        ],
        fond: "#ffedd5",
        couleur: ORANGE,
      },
    ]}
    traits={[{ de: { x: 0, y: -100 }, a: { x: 0, y: 16 }, couleur: ROUGE, pointille: true }]}
    textes={[
      { p: { x: -90, y: -40 }, texte: "16 cm²", couleur: BLEU },
      { p: { x: 90, y: -40 }, texte: "?", couleur: ORANGE, taille: 24 },
      { p: { x: 0, y: -112 }, texte: "axe", couleur: ROUGE },
    ]}
  />
);

const pieges = [
  "Placer A' à une autre distance de l'axe. A et A' sont à la même distance.",
  "Tracer [AA'] penché. Il coupe l'axe à angle droit.",
  "Faire glisser la figure. Une symétrie la retourne, comme un miroir.",
];

const aRetenir = [
  "L'axe est un miroir : pliée, la figure tombe sur son image.",
  "A' est de l'autre côté de l'axe, à la même distance que A.",
  "La symétrie garde les longueurs, les angles et les aires.",
];

export const ficheSymetrie6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "sym-axiale",
  titre: "La symétrie axiale",
  accroche:
    "Pose un miroir sur un dessin : tu vois son reflet. La symétrie axiale fabrique ce reflet, de l'autre côté d'une droite.",
  identite: [
    { label: "Le mot clé", valeur: "L'axe, comme un miroir" },
    { label: "Le secret", valeur: "Même distance à l'axe, de l'autre côté" },
    { label: "Le geste", valeur: "Plier le long de l'axe" },
  ],
  definition: {
    texte:
      "La symétrie axiale fait le reflet d'une figure, comme un miroir. Le miroir est une droite : l'axe de symétrie. Si on plie le long de l'axe, la figure et son image se superposent.",
  },
  figure: {
    schema: schemaSymetrie,
    legende: "Pliée le long de l'axe, la figure tombe sur son image.",
  },
  proprietes: [
    {
      titre: "L'image d'un point",
      micros: ["sym_point"],
      texte: "A' est de l'autre côté de l'axe, à la même distance. Un point sur l'axe ne bouge pas.",
      schema: pointSurLAxe,
    },
    {
      titre: "L'axe coupe [AA'] en son milieu",
      micros: ["sym_point"],
      texte: "L'axe coupe [AA'] en son milieu, à angle droit. On dit que l'axe est la médiatrice de [AA'].",
      schema: laMediatrice,
    },
    {
      titre: "Rien ne change de taille",
      micros: ["sym_propriete"],
      texte: "L'image a les mêmes longueurs, les mêmes angles et la même aire. La symétrie ne déforme rien.",
      schema: cequiSeConserve,
    },
    {
      titre: "Les axes d'une figure",
      micros: ["sym_axe"],
      texte: "Un carré a 4 axes de symétrie. Un rectangle en a 2, un cercle en a une infinité.",
      schema: lesQuatreAxesDuCarre,
    },
  ],
  reel: {
    texte:
      "Les deux ailes d'un papillon sont symétriques. Une feuille d'arbre l'est presque, le long de sa nervure. Ton visage aussi, presque. L'axe passe au milieu.",
  },
  historique: {
    texte:
      "Le mot « symétrie » vient du grec. Il voulait dire « belle proportion ». Les artisans de l'Égypte et de la Grèce antiques l'utilisaient déjà. Ils décoraient temples et poteries avec des motifs symétriques.",
  },
  methode: [
    {
      titre: "Plier en pensée",
      micros: ["sym_reconnaitre"],
      texte: "On imagine qu'on plie le long de l'axe. Si tout se superpose, c'est une symétrie.",
      schema: leProblemeDuPliage,
    },
    {
      titre: "Tracer la perpendiculaire",
      micros: ["sym_point"],
      texte: "On trace la droite qui passe par A et coupe l'axe à angle droit. A' sera sur cette droite.",
      schema: laPerpendiculaire,
    },
    {
      titre: "Reporter la distance",
      micros: ["sym_point", "sym_figure"],
      texte: "On mesure la distance de A à l'axe. On la reporte de l'autre côté : c'est A'.",
      schema: reporterLaDistance,
    },
  ],
  usages: [
    {
      titre: "L'image d'une figure",
      micros: ["sym_figure"],
      detail: "On construit l'image de chaque sommet. Puis on relie les images dans le même ordre.",
      schema: figureEntiere,
    },
    {
      titre: "Une mesure à trouver",
      micros: ["sym_propriete"],
      detail: "L'image d'un angle de 40° mesure 40°. L'image d'un segment de 7 cm mesure 7 cm.",
      schema: legende(angleEtImage, "Même mesure des deux côtés."),
    },
    {
      titre: "Compter les axes",
      micros: ["sym_axe"],
      detail: "On cherche chaque pli qui marche. Le triangle équilatéral a 3 axes.",
      schema: legende(troisAxes, "Un axe par sommet."),
    },
  ],
  exemples: [
    {
      titre: "Reconnaître une symétrie",
      micros: ["sym_reconnaitre"],
      donnees: "Une figure est retournée de l'autre côté d'une droite.",
      question: "Est-ce une symétrie axiale ?",
      schema: symReflet,
      solution: "Chaque point et son image sont à la même distance de l'axe. C'est une symétrie axiale.",
    },
    {
      titre: "L'image d'un point",
      micros: ["sym_point"],
      donnees: "Le point A est à 3 carreaux à gauche d'un axe vertical.",
      question: "Où placer son image A' ?",
      schema: symPoint,
      solution:
        "On reste sur la même ligne du quadrillage. On passe de l'autre côté de l'axe. A' est à 3 carreaux à droite de l'axe.",
    },
    {
      titre: "Défi : l'aire de l'image",
      micros: ["sym_defi", "sym_propriete"],
      donnees: "Un carré a une aire de 16 cm².",
      question: "Quelle est l'aire de son image par symétrie ?",
      schema: carre16,
      solution: "La symétrie ne déforme rien. L'image a aussi une aire de 16 cm².",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Sur un carrelage, une figure est retournée de l'autre côté d'un axe vertical, comme dans un miroir. Quelle transformation est-ce ?",
      correction: "Une symétrie axiale : la figure est retournée. Une figure qui glisse sans se retourner, ce n'en est pas une.",
      micros: ["sym_reconnaitre"],
    },
    {
      question: "Le point A est à 4 carreaux au-dessus d'un axe horizontal. Où se trouve son image A' ?",
      correction: "À 4 carreaux en dessous de l'axe, sur la même colonne.",
      micros: ["sym_point"],
    },
    {
      question: "Pour construire l'image d'un triangle ABC, que faut-il faire ?",
      correction: "On construit A', B' et C', les images des trois sommets. Puis on relie A', B' et C'.",
      micros: ["sym_figure"],
    },
    {
      question: "Un segment [AB] mesure 6 cm. Combien mesure son image [A'B'] ?",
      correction: "6 cm. La symétrie garde les longueurs.",
      micros: ["sym_propriete"],
    },
    {
      question: "Combien d'axes de symétrie a un rectangle qui n'est pas un carré ?",
      correction: "2 axes : ils passent par les milieux des côtés opposés. Les diagonales n'en sont pas.",
      micros: ["sym_axe"],
    },
    {
      question: "Deux figures « ont l'air » symétriques. Peut-on conclure ?",
      correction: "Non. On vérifie chaque sommet : même distance de l'axe, de l'autre côté.",
      micros: ["sym_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "L'axe, c'est un miroir !",
    definition: "Plie : tout doit se superposer !",
    methode: "Même distance, de l'autre côté !",
    pieges: "On retourne la figure, on ne la fait pas glisser !",
    retenir: "La symétrie ne déforme rien !",
    exercice: "Compte les carreaux jusqu'à l'axe !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesSymetrie6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Symétrie axiale - 6e",
    teinte: "objectif",
    schema: schemaSymetrie,
    section: {
      type: "objectif",
      phrase: "Reconnaître et construire une symétrie axiale",
      sousPhrase: "L'axe est un miroir : l'image est le reflet.",
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: symPoint,
    section: {
      type: "objectif",
      phrase: "Même distance à l'axe, de l'autre côté",
      sousPhrase: "A à 3 carreaux à gauche, A' à 3 carreaux à droite.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: carre16,
    section: {
      type: "exercice",
      enonce: "Un carré a une aire de 16 cm².",
      question: "Quelle est l'aire de son image par symétrie axiale ?",
      indice: "La symétrie ne déforme rien.",
      correction: "16 cm² aussi.",
    },
  },
];
