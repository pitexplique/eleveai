// ─── Fiche de cours : les triangles (6e) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/triangles.bank.ts, notionId triangle_figure — lecture seule).
// Réécrite le 30/09/2026 au standard des fiches de 6e (étalon :
// `maths-6e-bissectrice-angle.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo dans le mode classe.
//
// Micro-compétences 5/5 → blocs :
//   triangle_nommer      → définition + figure, méthode 1 (nommer), usage 1,
//                          exemple 1 (KLM), exercices 1 et 6
//   triangle_sommet_cote → propriété 1 (le côté opposé), usage 1 (DEF),
//                          exercice 3
//   triangle_type_cote   → propriété 2 (isocèle, équilatéral), méthode 2
//                          (quelconque), usage 3 (7 cm, 7 cm, 4 cm),
//                          exemple 1, exercice 2
//   triangle_type_angle  → propriété 3 (rectangle, obtusangle), méthode 3
//                          (triangle aigu), exemple 2 (120°), exercices 4 et 5
//   triangle_defi        → usage 2 (rectangle ET isocèle), exemple 3
//                          (équilatéral, donc aussi isocèle)
//
// ⛔ LA SOMME DES ANGLES (180°) ET LE TRIANGLE POSSIBLE NE SONT PLUS ICI. Ils
// sont la notion `triangle_propriete`, qui a sa fiche depuis le 29/09
// (`maths-6e-triangle-propriete.tsx`). La fiche de juin les enseignait aussi :
// deux fiches disaient la même chose, avec les mêmes nombres (60° + 70°).
//
// ⭐ LES NOMBRES ET LES LETTRES SONT CEUX DE LA BANQUE : ABC, DEF, KLM, RST ;
// un angle de 120° ; deux côtés de a cm et un de b cm (7 et 4). La feuille
// d'exercices (`lib/fiches-exercices/maths-6e-triangle-figure.tsx`) a évité
// exprès ABC, DEF, KLM, RST : on les garde. ⛔ Aucun de ses exemples (PIN, MUR,
// BUS, panneau, cerf-volant, potager, 5-7-5…).
//
// ⭐ UN DESSIN PAR BLOC, JAMAIS DEUX FOIS LE MÊME. Le canvas `triangle` garde
// ce qu'il fait bien : les noms, les côtés nommés ou cotés, les codages. Les
// DEUX triangles côte à côte (isocèle / équilatéral, rectangle / obtusangle)
// sont des SVG locaux (`schemas-angles-6e.tsx`) : ⛔ la pile de trois canvas de
// juin débordait de 222 px en mode classe. Un seul dessin, deux figures justes.
// Le côté [DE] rouge et le triangle de 120° sont aussi des SVG locaux : le
// canvas ne sait ni colorier un côté, ni poser un arc juste (il écrit la
// mesure à un décalage fixe du sommet).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import {
  BLEU,
  Dessin,
  ORANGE,
  ROUGE,
  VERT,
  legende,
  type Pt,
  type Trait,
} from "@/lib/fiches/schemas-angles-6e";

type Sommet = "A" | "B" | "C";
type Cote = "AB" | "BC" | "CA";

/** Un triangle du moteur du coach (le même dessin que dans les exercices). */
const triangle = (
  points: Record<Sommet, Pt>,
  opts: {
    labels?: Partial<Record<Sommet, string>>;
    sideLabels?: Partial<Record<Cote, string>>;
    marks?: { rightAngleAt?: Sommet; equalSides?: Array<[Cote, Cote]> };
    showAngles?: boolean;
    size?: { width?: number; height?: number };
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: opts.size ?? { width: 220, height: 180 },
      points,
      display: {
        showPoints: !!opts.labels,
        showLabels: !!opts.labels,
        showSides: true,
        showAngles: opts.showAngles ?? false,
      },
      labels: opts.labels,
      sideLabels: opts.sideLabels,
      marks: opts.marks,
    }}
  />
);

/** Le petit trait vert qui code un côté, au milieu de [pq]. */
const code = (p: Pt, q: Pt): Trait => {
  const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
  const L = Math.hypot(q.x - p.x, q.y - p.y) || 1;
  const n = { x: (-(q.y - p.y) / L) * 7, y: ((q.x - p.x) / L) * 7 };
  return { de: { x: m.x - n.x, y: m.y - n.y }, a: { x: m.x + n.x, y: m.y + n.y }, couleur: VERT };
};

// ─── LA FIGURE DE LA DÉFINITION : 3 sommets, 3 côtés ──────────────────────────
const schemaTriangleABC = triangle(
  { A: { x: 40, y: 180 }, B: { x: 245, y: 180 }, C: { x: 150, y: 40 } },
  { labels: { A: "A", B: "B", C: "C" }, size: { width: 280, height: 220 } }
);

// ─── LE CÔTÉ OPPOSÉ : les trois côtés portent leur nom ────────────────────────
const anatomie = legende(
  triangle(
    { A: { x: 35, y: 145 }, B: { x: 195, y: 145 }, C: { x: 115, y: 35 } },
    { labels: { A: "A", B: "B", C: "C" }, sideLabels: { AB: "AB", BC: "BC", CA: "CA" }, showAngles: true }
  ),
  "Le côté opposé à A, c'est [BC]."
);

// ─── ISOCÈLE ET ÉQUILATÉRAL, CÔTE À CÔTE ──────────────────────────────────────
// Deux figures justes : l'isocèle a deux côtés de 110 (base 90), l'équilatéral
// trois côtés de 100. Un petit trait vert par côté égal.
const coteACote = (() => {
  const I = { A: { x: 0, y: 0 }, B: { x: 90, y: 0 }, C: { x: 45, y: -100.4 } };
  const E = { A: { x: 135, y: 0 }, B: { x: 235, y: 0 }, C: { x: 185, y: -86.6 } };
  return (
    <Dessin
      titre="Un triangle isocèle et un triangle équilatéral"
      polygones={[{ pts: [I.A, I.B, I.C] }, { pts: [E.A, E.B, E.C] }]}
      traits={[
        code(I.B, I.C),
        code(I.C, I.A),
        code(E.A, E.B),
        code(E.B, E.C),
        code(E.C, E.A),
      ]}
      textes={[
        { p: { x: 45, y: 22 }, texte: "isocèle", couleur: VERT },
        { p: { x: 185, y: 22 }, texte: "équilatéral", couleur: VERT },
      ]}
    />
  );
})();

// ─── RECTANGLE ET OBTUSANGLE, CÔTE À CÔTE ─────────────────────────────────────
// Le rectangle a son angle droit en bas à gauche ; l'obtusangle, un angle de
// 113° en bas à gauche (arc rouge).
const rectangleObtus = (() => {
  const R = { A: { x: 0, y: 0 }, B: { x: 100, y: 0 }, C: { x: 0, y: -90 } };
  const T = { A: { x: 150, y: 0 }, B: { x: 255, y: 0 }, C: { x: 125, y: -60 } };
  const dirAC = (Math.atan2(-(T.C.y - T.A.y), T.C.x - T.A.x) * 180) / Math.PI;
  return (
    <Dessin
      titre="Un triangle rectangle et un triangle obtusangle"
      polygones={[{ pts: [R.A, R.B, R.C] }, { pts: [T.A, T.B, T.C] }]}
      coins={[{ o: R.A, dir: 0, c: 16 }]}
      arcs={[{ o: T.A, de: 0, a: dirAC, r: 22, couleur: ROUGE }]}
      textes={[
        { p: { x: 50, y: 22 }, texte: "rectangle", couleur: ROUGE },
        { p: { x: 200, y: 22 }, texte: "obtusangle", couleur: ROUGE },
      ]}
    />
  );
})();

// ─── NOMMER : les trois lettres, et rien d'autre ──────────────────────────────
const trianglePourNommer = legende(
  triangle(
    { A: { x: 35, y: 145 }, B: { x: 195, y: 145 }, C: { x: 145, y: 35 } },
    { labels: { A: "D", B: "E", C: "F" } }
  ),
  "Triangle DEF, ou FED, ou EFD : c'est le même."
);

// ─── QUELCONQUE : aucun codage ────────────────────────────────────────────────
const quelconque = legende(
  triangle({ A: { x: 25, y: 145 }, B: { x: 200, y: 145 }, C: { x: 70, y: 40 } }),
  "Aucun petit trait : le triangle est quelconque."
);

// ─── TRIANGLE AIGU : trois angles pointus (45°, 63°, 72°) ─────────────────────
// ⚠️ SVG local : le canvas `triangle` avec `showAngles` et sans mesure ne
// dessine AUCUN arc (vu au rendu) — la légende parlait d'angles invisibles.
// C se calcule à partir des angles en A (45°) et en B (63°) : chaque arc
// ouvre vraiment sa mesure.
const aigu = (() => {
  const RAD = Math.PI / 180;
  const base = 200;
  const cot = (d: number) => 1 / Math.tan(d * RAD);
  const h = base / (cot(45) + cot(63));
  const A = { x: 0, y: 0 };
  const B = { x: base, y: 0 };
  const C = { x: h * cot(45), y: -h };
  return legende(
    <Dessin
      titre="Un triangle aigu : 45°, 63° et 72°"
      polygones={[{ pts: [A, B, C] }]}
      arcs={[
        { o: A, de: 0, a: 45, r: 24, couleur: BLEU, texte: "45°", rTexte: 54 },
        { o: B, de: 117, a: 180, r: 24, couleur: VERT, texte: "63°", rTexte: 50 },
        { o: C, de: 225, a: 297, r: 24, couleur: ORANGE, texte: "72°", rTexte: 50 },
      ]}
    />,
    "Trois angles aigus : le triangle est aigu."
  );
})();

// ─── LE CÔTÉ OPPOSÉ À F, EN ROUGE ─────────────────────────────────────────────
const opposeF = (() => {
  const D = { x: 0, y: 0 };
  const E = { x: 170, y: 0 };
  const F = { x: 110, y: -110 };
  return (
    <Dessin
      titre="Le triangle DEF et le côté opposé au sommet F"
      polygones={[{ pts: [D, E, F] }]}
      traits={[{ de: D, a: E, couleur: ROUGE, epaisseur: 5 }]}
      points={[D, E, F]}
      textes={[
        { p: { x: -14, y: 12 }, texte: "D" },
        { p: { x: 184, y: 12 }, texte: "E" },
        { p: { x: 110, y: -128 }, texte: "F", couleur: BLEU },
        { p: { x: 85, y: 20 }, texte: "[DE]", couleur: ROUGE },
      ]}
    />
  );
})();

// ─── RECTANGLE ET ISOCÈLE À LA FOIS ───────────────────────────────────────────
const rectangleEtIsocele = legende(
  triangle(
    { A: { x: 45, y: 150 }, B: { x: 45, y: 40 }, C: { x: 155, y: 150 } },
    { marks: { rightAngleAt: "A", equalSides: [["AB", "CA"]] }, showAngles: true }
  ),
  "Un angle droit ET deux côtés égaux."
);

// ─── 7 cm, 7 cm ET 4 cm, À L'ÉCHELLE (30 px par cm) ───────────────────────────
// ⚠️ À 20 px par cm, les deux « 7 cm » (écrits au milieu des côtés, à 40 px
// l'un de l'autre) se touchaient (vu au rendu). À 30 px par cm : 60 px.
const isocele774 = triangle(
  { A: { x: 60, y: 225 }, B: { x: 180, y: 225 }, C: { x: 120, y: 23.8 } },
  { sideLabels: { AB: "4 cm", BC: "7 cm", CA: "7 cm" }, size: { width: 240, height: 250 } }
);

// ─── EXEMPLE 1 : le triangle isocèle KLM ──────────────────────────────────────
const triangleKLM = triangle(
  { A: { x: 40, y: 180 }, B: { x: 150, y: 40 }, C: { x: 260, y: 180 } },
  { labels: { A: "K", B: "L", C: "M" }, marks: { equalSides: [["AB", "BC"]] }, size: { width: 280, height: 220 } }
);

// ─── EXEMPLE 2 : un triangle avec un angle de 120° (et 35°, 25°) ──────────────
// C se calcule à partir des angles en A (120°) et en B (35°) : la hauteur vaut
// base ÷ (cot 120° + cot 35°). L'arc marqué 120° ouvre vraiment 120°.
const triangle120 = (() => {
  const RAD = Math.PI / 180;
  const base = 120;
  const cot = (d: number) => 1 / Math.tan(d * RAD);
  const h = base / (cot(120) + cot(35));
  const A = { x: 0, y: 0 };
  const B = { x: base, y: 0 };
  const C = { x: h * cot(120), y: -h };
  return (
    <Dessin
      titre="Un triangle qui a un angle de 120°"
      polygones={[{ pts: [A, B, C] }]}
      arcs={[{ o: A, de: 0, a: 120, r: 24, couleur: ROUGE, texte: "120°", rTexte: 52 }]}
      points={[A, B, C]}
      textes={[
        { p: { x: 4, y: 18 }, texte: "A" },
        { p: { x: base + 14, y: 12 }, texte: "B" },
        { p: { x: C.x - 14, y: C.y - 8 }, texte: "C" },
      ]}
    />
  );
})();

// ─── EXEMPLE 3 : les trois côtés codés (la figure de la banque) ───────────────
// A en bas à gauche, B en bas à droite, C en haut : le canvas pose ses lettres
// à un décalage fixe pensé pour CETTE orientation (A en haut, « B » et « C »
// tombaient sur les côtés — vu au rendu).
const equilateralCode = triangle(
  { A: { x: 40, y: 168 }, B: { x: 200, y: 168 }, C: { x: 120, y: 30 } },
  {
    labels: { A: "A", B: "B", C: "C" },
    marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] },
    size: { width: 240, height: 200 },
  }
);

const pieges = [
  "Confondre sommet et côté. A est un point, [AB] est un segment.",
  "Oublier qu'un équilatéral est aussi isocèle. Trois côtés égaux, c'est au moins deux.",
  "Juger à l'œil. Seuls les codages et les mesures comptent.",
];

const aRetenir = [
  "Un triangle a 3 sommets, 3 côtés et 3 angles.",
  "Côtés : équilatéral (3 égaux), isocèle (2 égaux), quelconque (aucun).",
  "Angles : rectangle (un droit), obtusangle (un obtus), aigu (trois aigus).",
];

export const ficheTriangles6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "triangle-figure",
  titre: "Les triangles",
  accroche:
    "Trois points, trois traits pour les relier : voilà un triangle. On le reconnaît à ses côtés et à ses angles.",
  identite: [
    { label: "Le mot clé", valeur: "3 sommets, 3 côtés, 3 angles" },
    { label: "Le secret", valeur: "On lit les codages : petits traits et petit carré" },
    { label: "Les outils", valeur: "La règle, le compas et l'équerre" },
  ],
  definition: {
    texte:
      "Un triangle est une figure fermée qui a trois côtés. Ses trois sommets sont des points : A, B et C. On le nomme avec ses sommets : triangle ABC.",
  },
  figure: {
    schema: schemaTriangleABC,
    legende: "Le triangle ABC : 3 sommets et 3 côtés, [AB], [BC] et [CA].",
  },
  proprietes: [
    {
      titre: "Le côté opposé",
      micros: ["triangle_sommet_cote"],
      texte: "Le côté opposé à un sommet ne passe pas par ce sommet. Dans ABC, le côté opposé à A est [BC].",
      schema: anatomie,
    },
    {
      titre: "Isocèle ou équilatéral",
      micros: ["triangle_type_cote"],
      texte: "Deux côtés égaux : le triangle est isocèle. Trois côtés égaux : il est équilatéral.",
      schema: legende(coteACote, "Les petits traits disent : même longueur."),
    },
    {
      titre: "Rectangle ou obtusangle",
      micros: ["triangle_type_angle"],
      texte: "Un angle droit : le triangle est rectangle. Un angle obtus : il est obtusangle.",
      schema: legende(rectangleObtus, "Le petit carré dit : angle droit."),
    },
  ],
  reel: {
    texte:
      "Fais un carré avec quatre bâtons et appuie dessus : il s'écrase. Fais un triangle : il tient bon. Le triangle ne se déforme pas. C'est pour cela qu'on en voit dans les ponts et les grues.",
  },
  historique: {
    texte:
      "« Triangle » vient du latin : « tri » veut dire trois, « angulus » veut dire angle. Vers 300 avant J.-C., le Grec Euclide range les triangles en familles. Il les classe selon leurs côtés, puis selon leurs angles. On utilise encore ses noms : isocèle, équilatéral.",
  },
  methode: [
    {
      titre: "Nommer",
      micros: ["triangle_nommer"],
      texte: "On écrit « triangle » puis les trois sommets. L'ordre des lettres ne compte pas.",
      schema: trianglePourNommer,
    },
    {
      titre: "Lire les côtés",
      micros: ["triangle_type_cote"],
      texte: "On compte les côtés codés égaux : 3, 2 ou aucun. Aucun : le triangle est quelconque.",
      schema: quelconque,
    },
    {
      titre: "Lire les angles",
      micros: ["triangle_type_angle"],
      texte: "On regarde le plus grand angle : droit, obtus ou aigu ? S'il est aigu, le triangle est aigu.",
      schema: aigu,
    },
  ],
  usages: [
    {
      titre: "Trouver le côté opposé",
      micros: ["triangle_nommer", "triangle_sommet_cote"],
      detail: "Le côté opposé à F ne touche pas F. Dans le triangle DEF, c'est [DE].",
      schema: opposeF,
    },
    {
      titre: "Deux familles à la fois",
      micros: ["triangle_defi"],
      detail: "On lit les côtés, puis les angles. Ce triangle est rectangle ET isocèle.",
      schema: rectangleEtIsocele,
    },
    {
      titre: "Avec des longueurs",
      micros: ["triangle_type_cote"],
      detail: "On compare les longueurs. 7 cm, 7 cm et 4 cm : deux côtés égaux, il est isocèle.",
      schema: isocele774,
    },
  ],
  exemples: [
    {
      titre: "Nommer et reconnaître",
      micros: ["triangle_nommer", "triangle_type_cote"],
      donnees: "Ses sommets sont K, L et M. [KL] et [LM] ont le même codage.",
      question: "Quel est son nom ? Quelle est sa nature ?",
      schema: triangleKLM,
      solution: "C'est le triangle KLM. Il a deux côtés égaux : il est isocèle.",
    },
    {
      titre: "Un angle de 120°",
      micros: ["triangle_type_angle"],
      donnees: "Un triangle a un angle de 120°.",
      question: "Quelle est sa nature, selon ses angles ?",
      schema: triangle120,
      solution: "120° est plus grand que 90° : cet angle est obtus. Le triangle a un angle obtus : il est obtusangle.",
    },
    {
      titre: "Équilatéral, et encore ?",
      micros: ["triangle_defi"],
      donnees: "Les trois côtés du triangle ABC portent le même codage.",
      question: "Est-il équilatéral ? Est-il aussi isocèle ?",
      schema: equilateralCode,
      solution:
        "Trois côtés égaux : il est équilatéral. Il a donc au moins deux côtés égaux. Il est aussi isocèle.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un triangle a pour sommets R, S et T. Comment le nomme-t-on ?",
      correction: "Triangle RST. On peut aussi écrire TSR ou STR : l'ordre ne compte pas.",
      micros: ["triangle_nommer"],
    },
    {
      question: "Un triangle a trois côtés de longueurs différentes. Quelle est sa nature ?",
      correction: "Aucun côté égal : il est quelconque.",
      micros: ["triangle_type_cote"],
    },
    {
      question: "Dans le triangle ABC, quel sommet est opposé au côté [BC] ?",
      correction: "Le sommet A. C'est le seul qui ne touche pas [BC].",
      micros: ["triangle_sommet_cote"],
    },
    {
      question: "Un triangle a ses trois angles plus petits que 90°. Quelle est sa nature ?",
      correction: "Ses trois angles sont aigus : c'est un triangle aigu.",
      micros: ["triangle_type_angle"],
    },
    {
      question: "Un triangle a un angle droit. Quelle est sa nature ?",
      correction: "Il est rectangle. On code l'angle droit avec un petit carré.",
      micros: ["triangle_type_angle"],
    },
    {
      question: "« Triangle ABC » et « triangle CBA » : est-ce le même triangle ?",
      correction: "Oui. Ce sont les mêmes trois sommets, lus dans un autre ordre.",
      micros: ["triangle_nommer"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "3 sommets, 3 côtés, 3 angles !",
    definition: "Un sommet est un point. Un côté est un segment !",
    methode: "D'abord les côtés, puis les angles !",
    pieges: "Un équilatéral est aussi isocèle !",
    retenir: "Lis les codages, pas la forme !",
    exercice: "Cherche les petits traits et le petit carré !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesTriangles6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Triangles - 6e",
    teinte: "objectif",
    schema: schemaTriangleABC,
    section: {
      type: "objectif",
      phrase: "Nommer un triangle et reconnaître sa nature",
      sousPhrase: "3 sommets, 3 côtés, 3 angles.",
    },
  },
  {
    titre: "Les familles",
    badge: "Côtés et angles",
    teinte: "propriete",
    schema: coteACote,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Selon les côtés", texte: "Équilatéral, isocèle, quelconque." },
        { titre: "Selon les angles", texte: "Rectangle, obtusangle, aigu." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: triangle120,
    section: {
      type: "exercice",
      enonce: "Un triangle a un angle de 120°.",
      question: "Quelle est sa nature ?",
      indice: "Compare 120° à l'angle droit.",
      correction: "120° est obtus : le triangle est obtusangle.",
    },
  },
];
