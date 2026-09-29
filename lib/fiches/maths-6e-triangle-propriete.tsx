// ─── Fiche de cours : angles du triangle et triangle possible (6e) ────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/triangles.bank.ts, notionId triangle_propriete — lecture seule).
//
// Micro-compétences 4/4 → blocs :
//   triangle_somme_angle     → définition + figure, propriétés 1 et 2 (180°,
//                              triangle rectangle), formule, usage 2, exercice 2
//   triangle_angle_manquant  → méthode 1 (180 − les deux autres), usage 1
//                              (isocèle), exemple 1 (le toit), exercice 1
//   triangle_possible_ou_non → propriété 4 (les longueurs qui ne ferment pas),
//                              méthode 2 (le test), usage 3, exemple 3 (les
//                              pailles), exercices 3 et 4
//   triangle_propriete_defi  → propriété 3 (équilatéral), méthode 3 (90-45-45),
//                              exemple 2 (deux angles droits), exercices 5 et 6
//
// ⭐ LES NOMBRES SONT CEUX DE LA BANQUE : 40 + 60 → 80 ; 30 + 80 → 70 ; 40 + 90
// → 50 ; rectangle 35 → 55 ; isocèle de sommet 40 → 70 et 70 ; 100 et deux
// angles égaux → 40 et 40 ; équilatéral → 60 ; 90-45-45 ; 70-60-50 ; côtés
// 2-3-6 (non), 4-5-7 (oui), 3-4-7 (aplati), 5-5-5, 1-2-10, 6-8-10 ; un angle
// de 179° ; les angles ne donnent pas les longueurs.
// ⛔ Le 60° + 70° de la banque est l'exemple de la fiche voisine
// `maths-6e-triangles.tsx` : il n'est pas repris ici.
//
// ⭐ LES ANGLES SONT DESSINÉS EN SVG LOCAL (`schemas-angles-6e.tsx`), ET JUSTES.
// Le sommet C se CALCULE à partir des deux angles de la base : un arc marqué
// 40° ouvre vraiment 40°. ⛔ Pourquoi pas `triangle` pour les angles : il écrit
// la mesure à un décalage FIXE du sommet (+10, −10), sans arc — sur un angle de
// 40° en A, le côté [AC] traverse l'étiquette. Le canvas `triangle` garde ce
// qu'il fait bien : les longueurs sur les côtés (6-8-10). `droites` montre les
// bâtons couchés bout à bout ; `schema_barre` le 180° partagé ; `calcul_pose`
// la soustraction ; `tableau_donnees` le test des longueurs.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";
import {
  BLEU,
  Dessin,
  NOIR,
  ORANGE,
  ROUGE,
  VERT,
  legende,
  polaire,
  type ArcAngle,
  type Coin,
  type Pt,
  type Trait,
} from "@/lib/fiches/schemas-angles-6e";

const RAD = Math.PI / 180;

/**
 * UN TRIANGLE ABC DONT LES ANGLES SONT EXACTS. A en bas à gauche, B en bas à
 * droite ; C se déduit des angles `a` (en A) et `b` (en B) : la hauteur vaut
 * base ÷ (cot a + cot b).
 * La mesure s'écrit sur la bissectrice de l'angle, assez loin du sommet pour
 * tenir DANS l'angle : r ≥ 20 ÷ sin(angle ÷ 2).
 */
function triangle(opts: {
  titre: string;
  a: number;
  b: number;
  base?: number;
  mesures?: { A?: string; B?: string; C?: string };
  couleurs?: { A?: string; B?: string; C?: string };
  droit?: "A" | "B" | "C";
  /** Côtés codés égaux (un petit trait vert chacun). */
  cotes?: ("AB" | "BC" | "CA")[];
  /** Angles codés égaux (un petit trait sur l'arc). */
  anglesEgaux?: ("A" | "B" | "C")[];
  noms?: boolean;
}) {
  const base = opts.base ?? 180;
  const cot = (d: number) => (Math.abs(d - 90) < 1e-9 ? 0 : 1 / Math.tan(d * RAD));
  const h = base / (cot(opts.a) + cot(opts.b));
  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: base, y: 0 };
  const C: Pt = { x: h * cot(opts.a), y: -h };
  const c = 180 - opts.a - opts.b;
  // Les directions des deux côtés en chaque sommet, dans le sens des angles.
  const secteurs = {
    A: { o: A, de: 0, a: opts.a, mesure: opts.a },
    B: { o: B, de: 180 - opts.b, a: 180, mesure: opts.b },
    C: { o: C, de: 180 + opts.a, a: 360 - opts.b, mesure: c },
  } as const;
  const couleur = { A: BLEU, B: VERT, C: ORANGE, ...opts.couleurs };
  const arcs: ArcAngle[] = [];
  const coins: Coin[] = [];
  (["A", "B", "C"] as const).forEach((s) => {
    const sec = secteurs[s];
    if (opts.droit === s) {
      coins.push({ o: sec.o, dir: sec.de, c: 14 });
      return;
    }
    const texte = opts.mesures?.[s];
    const rTexte = Math.max(52, 20 / Math.sin((sec.mesure / 2) * RAD));
    arcs.push({
      o: sec.o,
      de: sec.de,
      a: sec.a,
      r: 26,
      couleur: couleur[s],
      texte,
      rTexte,
      code: opts.anglesEgaux?.includes(s),
    });
  });
  const traits: Trait[] = (opts.cotes ?? []).map((cote) => {
    const [p, q] = cote === "AB" ? [A, B] : cote === "BC" ? [B, C] : [C, A];
    const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const L = Math.hypot(q.x - p.x, q.y - p.y);
    const n = { x: (-(q.y - p.y) / L) * 7, y: ((q.x - p.x) / L) * 7 };
    return { de: { x: m.x - n.x, y: m.y - n.y }, a: { x: m.x + n.x, y: m.y + n.y }, couleur: VERT };
  });
  const noms = opts.noms ?? true;
  return (
    <Dessin
      titre={opts.titre}
      polygones={[{ pts: [A, B, C] }]}
      traits={traits}
      arcs={arcs}
      coins={coins}
      points={[A, B, C]}
      textes={
        noms
          ? [
              { p: { x: A.x - 14, y: A.y + 10 }, texte: "A" },
              { p: { x: B.x + 14, y: B.y + 10 }, texte: "B" },
              { p: { x: C.x, y: C.y - 18 }, texte: "C" },
            ]
          : []
      }
    />
  );
}

// ─── LA FIGURE DE LA DÉFINITION : 40° + 60° + 80° ─────────────────────────────
const figureDefinition = triangle({
  titre: "Le triangle ABC et ses trois angles",
  a: 40,
  b: 60,
  base: 200,
  mesures: { A: "40°", B: "60°", C: "80°" },
});

// ─── LES TROIS COINS RECOLLÉS : un angle plat ─────────────────────────────────
// Les mêmes couleurs que les angles du triangle ABC : bleu 40°, vert 60°,
// orange 80°. Posés côte à côte, ils remplissent exactement le demi-tour.
const O: Pt = { x: 0, y: 0 };
const coinsRecolles = (
  <Dessin
    titre="Les trois angles du triangle mis côte à côte"
    traits={[
      { de: polaire(180, 125), a: polaire(0, 125) },
      { de: O, a: polaire(40, 110), couleur: "#64748b", epaisseur: 2 },
      { de: O, a: polaire(100, 110), couleur: "#64748b", epaisseur: 2 },
    ]}
    arcs={[
      { o: O, de: 0, a: 40, r: 40, couleur: BLEU, plein: "#dbeafe", texte: "40°", rTexte: 72 },
      { o: O, de: 40, a: 100, r: 40, couleur: VERT, plein: "#dcfce7", texte: "60°", rTexte: 72 },
      { o: O, de: 100, a: 180, r: 40, couleur: ORANGE, plein: "#fef3c7", texte: "80°", rTexte: 72 },
    ]}
    points={[O]}
    textes={[{ p: { x: 0, y: 22 }, texte: "180° en tout", couleur: NOIR }]}
  />
);

// ─── LE TRIANGLE RECTANGLE : 35° + 55° = 90° ──────────────────────────────────
const rectangle3555 = triangle({
  titre: "Un triangle rectangle : 35° et 55°",
  a: 35,
  b: 55,
  base: 200,
  droit: "C",
  mesures: { A: "35°", B: "55°" },
});

// ─── L'ÉQUILATÉRAL : trois côtés égaux, trois angles de 60° ───────────────────
const equilateral = triangle({
  titre: "Le triangle équilatéral : trois angles de 60°",
  a: 60,
  b: 60,
  base: 160,
  mesures: { A: "60°", B: "60°", C: "60°" },
  cotes: ["AB", "BC", "CA"],
});

// ─── TROIS LONGUEURS QUI NE FERMENT PAS : 2 + 3 < 6 ───────────────────────────
// Les deux petits côtés, couchés sur le grand depuis chaque bout : il reste un
// trou de 1 cm. 35 px par centimètre, à l'échelle.
const baton = (id: string, x1: number, x2: number, y: number, label: string, color: string) => ({
  id,
  type: "segment" as const,
  from: { x: x1, y },
  to: { x: x2, y },
  label,
  color,
  strokeWidth: 6,
});
const nonFerme = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 250, height: 110 },
      lines: [
        baton("AB", 20, 230, 85, "6 cm", NOIR),
        baton("A2", 20, 90, 45, "2 cm", BLEU),
        baton("B3", 125, 230, 45, "3 cm", VERT),
      ],
      display: { showGrid: false, showLabels: true, showPoints: false },
    }}
  />
);

// ─── TROIS PAILLES QUI SE RECOUVRENT TOUT JUSTE : 3 + 4 = 7 ───────────────────
const aplati = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 250, height: 110 },
      lines: [
        baton("AB", 20, 230, 85, "7 cm", NOIR),
        baton("A3", 20, 110, 45, "3 cm", BLEU),
        baton("B4", 110, 230, 45, "4 cm", VERT),
      ],
      display: { showGrid: false, showLabels: true, showPoints: false },
    }}
  />
);

// ─── 180° PARTAGÉ EN TROIS : la formule, à l'échelle ──────────────────────────
const barre180 = (parts: string[], question: string) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 230, height: 170 },
      total: "180°",
      parts: parts.map((value, i) => ({
        label: "",
        value,
        color: ["#dbeafe", "#dcfce7", "#fef3c7"][i],
      })),
      questionLabel: question,
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: true },
    }}
  />
);

// ─── 180 − 110 = 70 ───────────────────────────────────────────────────────────
const soustraction = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      numbers: ["180", "110"],
      result: "70",
      display: { showResult: true, compact: true },
      questionLabel: "30 + 80 = 110, puis 180 − 110",
    }}
  />
);

// ─── LE TEST DES LONGUEURS ────────────────────────────────────────────────────
const testLongueurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["2 petits côtés", "grand", "triangle ?"],
      rows: [
        { values: ["4 + 5 = 9", "7", "oui"] },
        { values: ["2 + 3 = 5", "6", "non"] },
      ],
      highlight: { col: 2 },
      caption: "les deux petits doivent dépasser le grand",
      display: { compact: true, striped: true },
    }}
  />
);

// ─── 90° + 45° + 45° ──────────────────────────────────────────────────────────
const rectangleIsocele = triangle({
  titre: "Un triangle rectangle isocèle : 90°, 45° et 45°",
  a: 45,
  b: 45,
  base: 190,
  droit: "C",
  mesures: { A: "45°", B: "45°" },
  cotes: ["BC", "CA"],
});

// ─── L'ISOCÈLE DE SOMMET 40° : deux angles égaux à trouver ────────────────────
const isocele40 = triangle({
  titre: "Un triangle isocèle dont l'angle du sommet mesure 40°",
  a: 70,
  b: 70,
  base: 110,
  mesures: { A: "?", B: "?", C: "40°" },
  couleurs: { A: ROUGE, B: ROUGE },
  cotes: ["BC", "CA"],
  anglesEgaux: ["A", "B"],
});

// ─── 6, 8 ET 10 cm : le triangle existe (canvas `triangle`, côtés cotés) ──────
// À l'échelle : 22 px par cm. AB = 10 cm, AC = 8 cm, donc cos A = 0,8.
const triangle6810 = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 260, height: 190 },
      points: { A: { x: 20, y: 160 }, B: { x: 240, y: 160 }, C: { x: 160.8, y: 54.4 } },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      sideLabels: { AB: "10 cm", BC: "6 cm", CA: "8 cm" },
    }}
  />
);

// ─── LE TOIT : 100° en haut, deux angles égaux en bas ─────────────────────────
const toit = triangle({
  titre: "Le toit : un triangle isocèle avec un angle de 100°",
  a: 40,
  b: 40,
  base: 210,
  mesures: { A: "?", B: "?", C: "100°" },
  couleurs: { A: ROUGE, B: ROUGE },
  cotes: ["BC", "CA"],
  anglesEgaux: ["A", "B"],
});

// ─── DEUX ANGLES DROITS : les côtés ne se rejoignent jamais ───────────────────
const deuxAnglesDroits = (() => {
  const A: Pt = { x: 0, y: 0 };
  const B: Pt = { x: 150, y: 0 };
  return (
    <Dessin
      titre="Deux angles droits : les côtés montent sans se rejoindre"
      traits={[
        { de: A, a: B },
        { de: A, a: { x: 0, y: -125 }, fleche: true },
        { de: B, a: { x: 150, y: -125 }, fleche: true },
      ]}
      coins={[
        { o: A, dir: 0, c: 16 },
        { o: B, dir: 90, c: 16 },
      ]}
      points={[A, B]}
      textes={[
        { p: { x: -14, y: 12 }, texte: "A" },
        { p: { x: 164, y: 12 }, texte: "B" },
        { p: { x: 38, y: -30 }, texte: "90°", couleur: ROUGE },
        { p: { x: 112, y: -30 }, texte: "90°", couleur: ROUGE },
        { p: { x: 75, y: -100 }, texte: "C ?", couleur: ROUGE, taille: 20 },
      ]}
    />
  );
})();

// ─── L'EXERCICE FLASH : 40° et 90°, le troisième ? ────────────────────────────
const flash4090 = triangle({
  titre: "Un triangle avec un angle de 40° et un angle droit",
  a: 40,
  b: 90,
  base: 170,
  droit: "B",
  mesures: { A: "40°", C: "?" },
  couleurs: { C: ROUGE },
});

const pieges = [
  "Croire que 180° dépend de la taille du triangle. Non : c'est vrai pour TOUS les triangles.",
  "Dire « possible » quand 3 + 4 = 7. Il faut que ce soit PLUS grand : ici, le triangle est tout plat.",
  "Mesurer l'angle sur le dessin au lieu de le calculer. Un dessin n'est jamais parfait.",
];

const aRetenir = [
  "Dans tout triangle, les trois angles font 180° en tout.",
  "Angle manquant : 180 moins la somme des deux angles connus.",
  "Triangle possible : les deux petits côtés ensemble dépassent le grand.",
];

export const ficheTrianglePropriete6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "triangle-propriete",
  titre: "Les angles du triangle et le triangle possible",
  accroche:
    "Découpe les trois coins d'un triangle en papier et colle-les côte à côte. Ils forment toujours un angle plat : 180° !",
  identite: [
    { label: "Le nombre clé", valeur: "180° pour tous les triangles" },
    { label: "Le calcul", valeur: "Angle manquant = 180 − les deux autres" },
    { label: "Le test", valeur: "Les deux petits côtés dépassent le grand" },
  ],
  definition: {
    texte:
      "Un triangle a trois angles, un à chaque sommet. Leurs mesures ajoutées font toujours 180°. Mais trois longueurs ne font pas toujours un triangle : il faut que les côtés se rejoignent.",
  },
  figure: {
    schema: legende(figureDefinition, "40° + 60° + 80° = 180°"),
    legende: "Petit ou grand, pointu ou aplati : le total des trois angles fait 180°.",
  },
  proprietes: [
    {
      titre: "Les trois angles font 180°",
      micros: ["triangle_somme_angle"],
      texte: "On colle les trois coins côte à côte : ils forment un angle plat. Un angle plat mesure 180°.",
      schema: coinsRecolles,
    },
    {
      titre: "Dans un triangle rectangle",
      micros: ["triangle_somme_angle", "triangle_angle_manquant"],
      texte: "L'angle droit prend déjà 90°. Les deux autres angles font 90° à eux deux : 35° et 55°.",
      schema: rectangle3555,
    },
    {
      titre: "Dans un triangle équilatéral",
      micros: ["triangle_propriete_defi"],
      texte: "Ses trois angles sont égaux. Chacun mesure 180 ÷ 3 = 60°.",
      schema: equilateral,
    },
    {
      titre: "Trois longueurs ne ferment pas toujours",
      micros: ["triangle_possible_ou_non"],
      texte: "Avec 2 cm, 3 cm et 6 cm, les deux petits côtés sont trop courts. Ils ne se rejoignent pas.",
      schema: legende(nonFerme, "2 + 3 = 5 : il manque 1 cm."),
    },
  ],
  reel: {
    texte:
      "Regarde tes équerres : l'une a des angles de 90°, 45° et 45°. L'autre a des angles de 90°, 60° et 30°. Dans les deux cas, le total fait 180°. Et à travers la pelouse, le chemin direct est plus court que le détour par les deux autres côtés.",
  },
  historique: {
    texte:
      "Blaise Pascal est né en 1623. D'après sa sœur, il a trouvé seul, vers 12 ans, que les trois angles d'un triangle font deux angles droits. Deux angles droits, c'est 180°. Le Grec Euclide l'avait déjà démontré 1 900 ans plus tôt !",
  },
  formule: {
    contexte: "Dans un triangle ABC",
    expression: "$\\widehat{A} + \\widehat{B} + \\widehat{C} = 180°$",
    legende: "Elle sert à trouver l'angle qui manque : 180 − 40 − 60 = 80°.",
    schema: barre180(["40°", "60°", "80°"], "les 3 angles de ABC"),
  },
  methode: [
    {
      titre: "Trouver l'angle qui manque",
      micros: ["triangle_angle_manquant"],
      texte: "On ajoute les deux angles connus : 30 + 80 = 110. On retire de 180 : 180 − 110 = 70°.",
      schema: soustraction,
    },
    {
      titre: "Tester trois longueurs",
      micros: ["triangle_possible_ou_non"],
      texte: "On ajoute les deux plus petites longueurs. Le résultat doit être plus grand que la troisième.",
      schema: testLongueurs,
    },
    {
      titre: "Tester trois angles",
      micros: ["triangle_propriete_defi"],
      texte: "On ajoute les trois angles. 90 + 45 + 45 = 180 : ce triangle existe.",
      schema: rectangleIsocele,
    },
  ],
  usages: [
    {
      titre: "Un triangle isocèle",
      micros: ["triangle_angle_manquant"],
      detail: "Ses deux angles du bas sont égaux. Le sommet fait 40° : il reste 140°, donc 70° chacun.",
      schema: isocele40,
    },
    {
      titre: "Trois angles donnés",
      micros: ["triangle_somme_angle"],
      detail: "On les ajoute : 70 + 60 + 50 = 180. Le triangle est possible.",
      schema: barre180(["70°", "60°", "50°"], "70 + 60 + 50 = 180"),
    },
    {
      titre: "Trois longueurs données",
      micros: ["triangle_possible_ou_non"],
      detail: "6 + 8 = 14, plus grand que 10. Le triangle de côtés 6 cm, 8 cm et 10 cm existe.",
      schema: triangle6810,
    },
  ],
  exemples: [
    {
      titre: "Le toit de la cabane",
      micros: ["triangle_angle_manquant", "triangle_propriete_defi"],
      donnees: "Le toit d'une cabane est un triangle isocèle. L'angle du haut mesure 100°.",
      question: "Combien mesurent les deux angles du bas ?",
      schema: toit,
      solution:
        "Il reste 180 − 100 = 80°. Les deux angles du bas sont égaux. 80 ÷ 2 = 40 : chacun mesure 40°.",
    },
    {
      titre: "Deux angles droits ?",
      micros: ["triangle_propriete_defi"],
      donnees: "Sarah veut dessiner un triangle qui a deux angles droits.",
      question: "Est-ce possible ?",
      schema: deuxAnglesDroits,
      solution:
        "Non. Deux angles droits font déjà 90 + 90 = 180°. Il ne reste rien pour le troisième angle. Les deux côtés montent sans jamais se rejoindre.",
    },
    {
      titre: "Les trois pailles",
      micros: ["triangle_possible_ou_non"],
      donnees: "Tom a trois pailles de 3 cm, 4 cm et 7 cm.",
      question: "Peut-il fabriquer un triangle ?",
      schema: aplati,
      solution:
        "Non. 3 + 4 = 7 : les deux petites pailles recouvrent tout juste la grande. Le triangle serait tout plat. Il faut que les deux petites dépassent la grande.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans un triangle, deux angles mesurent 40° et 90°. Combien mesure le troisième ?",
      correction: "40 + 90 = 130, puis 180 − 130 = 50°.",
      micros: ["triangle_angle_manquant"],
    },
    {
      question: "Dans un triangle, un angle mesure 100°. Combien font les deux autres angles ensemble ?",
      correction: "180 − 100 = 80°.",
      micros: ["triangle_somme_angle"],
    },
    {
      question: "Peut-on construire un triangle de côtés 5 cm, 5 cm et 5 cm ?",
      correction: "Oui : 5 + 5 = 10, plus grand que 5. C'est un triangle équilatéral.",
      micros: ["triangle_possible_ou_non"],
    },
    {
      question: "Peut-on construire un triangle de côtés 1 cm, 2 cm et 10 cm ?",
      correction: "Non : 1 + 2 = 3, plus petit que 10. Les deux petits côtés ne se rejoignent pas.",
      micros: ["triangle_possible_ou_non"],
    },
    {
      question: "Un triangle peut-il avoir un angle de 179° ?",
      correction: "Oui. Les deux autres angles font alors 1° à eux deux. Le triangle est très aplati.",
      micros: ["triangle_propriete_defi"],
    },
    {
      question: "On connaît les trois angles d'un triangle. Connaît-on la longueur de ses côtés ?",
      correction: "Non. Un petit triangle et un grand triangle peuvent avoir les mêmes angles.",
      micros: ["triangle_propriete_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "Trois coins recollés : un angle plat !",
    formule: "On ajoute, puis on retire de 180 !",
    methode: "Les 2 petits côtés doivent dépasser le grand !",
    pieges: "3 + 4 = 7 : le triangle est tout plat !",
    retenir: "180° pour TOUS les triangles !",
    exercice: "À toi ! Pense à 180°.",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesTrianglePropriete6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Angles du triangle - 6e",
    teinte: "objectif",
    schema: avecMargo(coinsRecolles, "Trois coins recollés : un angle plat !", "joie"),
    section: {
      type: "objectif",
      phrase: "Les 3 angles d'un triangle font 180°",
      sousPhrase: "Pour tous les triangles, petits ou grands.",
      encadre: { titre: "Et aussi", texte: "Trois longueurs ne font pas toujours un triangle." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: figureDefinition,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Tes équerres : 90°, 45° et 45°, ou 90°, 60° et 30°. Le total fait toujours 180°.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Vers 12 ans, Blaise Pascal a trouvé seul que les angles d'un triangle font 180°.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(soustraction, "On ajoute, puis on retire de 180 !"),
    section: {
      type: "objectif",
      phrase: "Angle manquant = 180 − les deux autres",
      sousPhrase: "30° et 80° : 30 + 80 = 110, puis 180 − 110 = 70°.",
      encadre: { titre: "Le contrôle", texte: "Les trois angles ensemble doivent refaire 180°." },
    },
  },
  {
    titre: "Des triangles spéciaux",
    badge: "3 cas",
    teinte: "propriete",
    schema: equilateral,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle", texte: "Les deux autres angles font 90° à eux deux." },
        { titre: "Isocèle", texte: "Les deux angles du bas sont égaux." },
        { titre: "Équilatéral", texte: "Trois angles de 60°." },
      ],
    },
  },
  {
    titre: "Le test des longueurs",
    badge: "Triangle possible ?",
    teinte: "definition",
    schema: avecMargo(nonFerme, "2 + 3 = 5, plus petit que 6 : ça ne ferme pas !", "attention"),
    section: {
      type: "objectif",
      phrase: "Les 2 petits côtés doivent dépasser le grand",
      sousPhrase: "4 cm, 5 cm et 7 cm : 4 + 5 = 9, plus grand que 7. Le triangle existe.",
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: rectangleIsocele,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Angle manquant", texte: "Ajouter les deux angles connus, puis retirer de 180." },
        { titre: "Trois longueurs", texte: "Les deux plus petites ensemble doivent dépasser la grande." },
        { titre: "Trois angles", texte: "Leur total doit faire 180 : 90 + 45 + 45 = 180." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le toit de la cabane",
    teinte: "exemple",
    schema: toit,
    section: {
      type: "exemple",
      enonce: "Le toit est un triangle isocèle. L'angle du haut mesure 100°.",
      question: "Combien mesurent les deux angles du bas ?",
      correction: "180 − 100 = 80, puis 80 ÷ 2 = 40. Chacun mesure 40°.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(aplati, "3 + 4 = 7 : le triangle est tout plat !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(flash4090, "À toi ! Pense à 180°."),
    section: {
      type: "exercice",
      enonce: "Dans un triangle, un angle mesure 40° et un autre est un angle droit.",
      question: "Combien mesure le troisième angle ?",
      indice: "Un angle droit mesure 90°.",
      correction: "40 + 90 = 130, puis 180 − 130 = 50°.",
    },
  },
];
