// ─── Fiche de cours : le parallélogramme (5e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/parallelogrammes.bank.ts (notionId parallelogramme).
// Dessinée par le canvas « quadrilatere » du coach — le même que dans les
// exercices, avec le codage des côtés parallèles, des côtés égaux, des angles,
// les diagonales et la hauteur.
//
// Micro-compétences couvertes (les 6 de la notion) :
// - para_reconnaitre    → définition + figure (ABCD, côtés parallèles codés),
//                         propriété « Deux paires de côtés parallèles »,
//                         exemple 1, entraînement 1
// - para_cotes_angles   → propriété « Côtés et angles opposés », exemple 2
//                         (angle en A = 70° → angle en C), entraînement 2
// - para_diagonales     → propriété « Les diagonales », exemple 3 (AO = 4 → AC),
//                         entraînement 3
// - para_particuliers   → propriété « Losange, rectangle, carré » (les trois
//                         dessinés côte à côte), exemple 4, entraînement 4
// - para_construire     → méthode (les 3 gestes de construction), usages
// - para_defi           → pièges (« tous les angles égaux » : faux) + défi
//
// Les nombres sont CEUX DE LA BANQUE : l'angle de 70° en A, AO = 4 cm.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Pt = { x: number; y: number };
type Sommets = { A: Pt; B: Pt; C: Pt; D: Pt };

// Le parallélogramme de référence : sa forme « penchée » se reconnaît d'un coup
// d'œil, et elle rend visible que la hauteur n'est PAS un côté.
const P_ABCD: Sommets = {
  A: { x: 45, y: 185 },
  B: { x: 220, y: 185 },
  C: { x: 265, y: 65 },
  D: { x: 90, y: 65 },
};

// Les trois parallélogrammes particuliers, chacun avec ce qui le distingue.
const P_LOSANGE: Sommets = {
  A: { x: 150, y: 200 },
  B: { x: 255, y: 125 },
  C: { x: 150, y: 50 },
  D: { x: 45, y: 125 },
};
const P_RECTANGLE: Sommets = {
  A: { x: 45, y: 175 },
  B: { x: 255, y: 175 },
  C: { x: 255, y: 75 },
  D: { x: 45, y: 75 },
};
const P_CARRE: Sommets = {
  A: { x: 85, y: 205 },
  B: { x: 235, y: 205 },
  C: { x: 235, y: 55 },
  D: { x: 85, y: 55 },
};

const quad = (
  points: Sommets,
  opts: {
    labels?: boolean;
    angleLabels?: Partial<Record<"A" | "B" | "C" | "D", string>>;
    sideLabels?: Partial<Record<"AB" | "BC" | "CD" | "DA", string>>;
    paralleles?: boolean;
    egaux?: boolean;
    diagonales?: boolean;
    anglesDroits?: ("A" | "B" | "C" | "D")[];
    hauteur?: string;
  } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 300, height: 250 },
      points,
      labels: opts.labels === false ? undefined : { A: "A", B: "B", C: "C", D: "D" },
      angleLabels: opts.angleLabels,
      sideLabels: opts.sideLabels,
      display: {
        showPoints: true,
        showLabels: opts.labels !== false,
        showSides: true,
        showAngles: !!opts.angleLabels,
        showDiagonals: !!opts.diagonales,
      },
      marks: {
        ...(opts.paralleles ? { parallelSides: [["AB", "CD"], ["AD", "BC"]] as [
          "AB" | "CD" | "AD" | "BC",
          "AB" | "CD" | "AD" | "BC"
        ][] } : {}),
        ...(opts.egaux ? { equalSides: [["AB", "CD"], ["BC", "DA"]] as [
          "AB" | "CD" | "BC" | "DA",
          "AB" | "CD" | "BC" | "DA"
        ][] } : {}),
        ...(opts.anglesDroits ? { rightAnglesAt: opts.anglesDroits } : {}),
      },
      ...(opts.hauteur
        ? { height: { fromVertex: "D" as const, onSide: "AB" as const, label: opts.hauteur } }
        : {}),
    }}
  />
);

// Trois figures empilées (REGLES.md § 2 ter : dans une carte, on empile) : la
// propriété parle de TROIS cas particuliers, il lui faut les trois.
const trio = (items: { figure: React.ReactNode; nom: string }[]) => (
  <div className="space-y-2">
    {items.map((it) => (
      <div key={it.nom}>
        {it.figure}
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

const pieges = [
  "Croire que tous les angles d'un parallélogramme sont égaux : ce sont les angles OPPOSÉS qui le sont (70° et 70°, 110° et 110°).",
  "Confondre avec le trapèze : le trapèze n'a qu'UNE paire de côtés parallèles, le parallélogramme en a deux.",
  "Prendre un côté oblique pour la hauteur : la hauteur est perpendiculaire à la base.",
];

const aRetenir = [
  "Un parallélogramme a deux paires de côtés parallèles — c'est sa définition.",
  "Côtés opposés égaux, angles opposés égaux, angles consécutifs de somme 180°.",
  "Les diagonales se coupent en leur milieu : ce point est son centre de symétrie.",
];

export const ficheParallelogramme5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "parallelogramme",
  titre: "Le parallélogramme",
  accroche:
    "Deux paires de côtés parallèles : voilà tout ce qui définit un parallélogramme. Tout le reste — côtés égaux, angles opposés, diagonales qui se coupent en leur milieu — en découle.",
  identite: [
    { label: "Mots clés", valeur: "Côtés parallèles, opposés, diagonales, centre" },
    { label: "Le secret", valeur: "Un demi-tour autour du centre le laisse identique" },
    { label: "Outil", valeur: "La règle, l'équerre et le compas" },
  ],
  definition: {
    texte:
      "Un parallélogramme est un quadrilatère dont les côtés opposés sont parallèles deux à deux. Dans ABCD, (AB) est parallèle à (DC) et (AD) est parallèle à (BC). Attention : un quadrilatère qui n'a qu'une seule paire de côtés parallèles est un trapèze, pas un parallélogramme.",
  },
  figure: {
    schema: quad(P_ABCD, { paralleles: true }),
    legende:
      "Le parallélogramme ABCD : les deux paires de côtés parallèles sont codées par des flèches identiques.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis), et quatre dessins qui
  // ne montrent pas la même chose : le codage des parallèles, celui des côtés
  // et angles opposés, les diagonales avec leur centre, et les trois cas
  // particuliers empilés.
  proprietes: [
    {
      titre: "Deux paires de côtés parallèles",
      texte: "C'est la définition : (AB) // (DC) et (AD) // (BC).",
      schema: quad(P_ABCD, { paralleles: true }),
    },
    {
      titre: "Côtés et angles opposés",
      texte: "Les côtés opposés sont égaux ; les angles opposés aussi. Deux angles consécutifs font 180°.",
      schema: quad(P_ABCD, {
        egaux: true,
        angleLabels: { A: "70°", B: "110°", C: "70°", D: "110°" },
      }),
    },
    {
      titre: "Les diagonales",
      texte: "Elles se coupent en leur milieu. Ce point est le centre de symétrie de la figure.",
      schema: quad(P_ABCD, { diagonales: true }),
    },
    {
      titre: "Losange, rectangle, carré",
      texte: "Quatre côtés égaux → losange ; quatre angles droits → rectangle ; les deux → carré.",
      schema: trio([
        { figure: quad(P_LOSANGE, { labels: false, egaux: true }), nom: "losange : 4 côtés égaux" },
        {
          figure: quad(P_RECTANGLE, { labels: false, anglesDroits: ["A", "B", "C", "D"] }),
          nom: "rectangle : 4 angles droits",
        },
        {
          figure: quad(P_CARRE, { labels: false, egaux: true, anglesDroits: ["A", "B", "C", "D"] }),
          nom: "carré : les deux à la fois",
        },
      ]),
    },
  ],
  reel: {
    texte:
      "Le parallélogramme est partout dès qu'une chose penche sans se déformer : un portail à barreaux qu'on ouvre, un escabeau, un cric de voiture, l'ombre d'une fenêtre sur le sol en fin de journée, les losanges d'un grillage.",
  },
  historique: {
    texte:
      "Euclide, il y a plus de 2300 ans, démontrait déjà que les côtés opposés d'un parallélogramme sont égaux. Le mot lui-même vient du grec « parallelogrammon » : « aux lignes parallèles ».",
  },
  formule: {
    contexte: "L'aire d'un parallélogramme",
    expression: "aire = base × hauteur",
    legende:
      "La hauteur est perpendiculaire à la base — jamais le côté oblique. Base 7 cm, hauteur 4 cm → 28 cm².",
    schema: quad(P_ABCD, { sideLabels: { AB: "7 cm" }, hauteur: "4 cm" }),
  },
  methode: [
    {
      titre: "Je trace un côté et un angle",
      texte: "Je pose la base [AB], puis le côté [AD] avec l'angle voulu.",
      schema: quad(P_ABCD, { sideLabels: { AB: "base" } }),
    },
    {
      titre: "Je reporte les longueurs",
      texte: "Le côté opposé a la même longueur : je reporte [AB] depuis D, et [AD] depuis B.",
      schema: quad(P_ABCD, { egaux: true }),
    },
    {
      titre: "Je vérifie par les diagonales",
      texte: "Elles doivent se couper exactement en leur milieu.",
      schema: quad(P_ABCD, { diagonales: true }),
    },
  ],
  usages: [
    {
      titre: "Reconnaître",
      detail: "Deux paires de côtés parallèles : si une seule, c'est un trapèze.",
      schema: quad(P_ABCD, { paralleles: true }),
    },
    {
      titre: "Calculer un angle",
      detail: "Les angles opposés sont égaux, les consécutifs font 180°.",
      schema: quad(P_ABCD, { angleLabels: { A: "70°", C: "?" } }),
    },
    {
      titre: "Calculer l'aire",
      detail: "Base × hauteur, avec la hauteur perpendiculaire à la base.",
      schema: quad(P_ABCD, { sideLabels: { AB: "7 cm" }, hauteur: "4 cm" }),
    },
  ],
  exemples: [
    {
      titre: "Est-ce un parallélogramme ?",
      donnees: "Un quadrilatère dont une seule paire de côtés est parallèle.",
      question: "Comment s'appelle-t-il ?",
      schema: quad(P_ABCD, { paralleles: true }),
      solution:
        "C'est un trapèze, pas un parallélogramme : il en faut DEUX paires. Sur la figure ci-contre, les deux paires sont codées — c'est bien un parallélogramme.",
    },
    {
      titre: "Trouver un angle",
      donnees: "Dans le parallélogramme ABCD, l'angle en A mesure 70°.",
      question: "Combien mesure l'angle en C ? Et l'angle en B ?",
      schema: quad(P_ABCD, { angleLabels: { A: "70°", B: "?", C: "?", D: "110°" } }),
      solution:
        "A et C sont opposés, donc l'angle en C mesure aussi 70°. A et B sont consécutifs, donc leur somme fait 180° : l'angle en B mesure 180 − 70 = 110°.",
    },
    {
      titre: "Une diagonale",
      donnees: "Les diagonales de ABCD se coupent en O, et AO = 4 cm.",
      question: "Combien mesure la diagonale [AC] ?",
      schema: quad(P_ABCD, { diagonales: true }),
      solution:
        "O est le milieu de [AC], donc OC = AO = 4 cm. La diagonale [AC] mesure 4 + 4 = 8 cm.",
    },
    {
      titre: "Un cas particulier",
      donnees: "Un parallélogramme dont les quatre côtés sont égaux.",
      question: "Comment s'appelle-t-il ?",
      schema: quad(P_LOSANGE, { labels: false, egaux: true }),
      solution:
        "C'est un losange. S'il avait en plus quatre angles droits, ce serait un carré.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un quadrilatère n'a qu'une seule paire de côtés parallèles. Comment s'appelle-t-il ?",
      correction: "C'est un trapèze : le parallélogramme, lui, a DEUX paires de côtés parallèles.",
    },
    {
      question: "Dans un parallélogramme, l'angle en A mesure 55°. Combien mesurent les trois autres ?",
      correction:
        "L'angle opposé (en C) mesure aussi 55°. Les deux autres sont consécutifs à A : 180 − 55 = 125° chacun.",
    },
    {
      question: "Les diagonales d'un parallélogramme se coupent en O, avec BO = 3 cm. Combien mesure [BD] ?",
      correction: "O est le milieu de [BD] : OD = 3 cm, donc BD = 3 + 3 = 6 cm.",
    },
    {
      question: "Un carré est-il un parallélogramme ?",
      correction:
        "Oui : ses côtés opposés sont parallèles deux à deux. C'est même un parallélogramme particulier — à la fois losange et rectangle.",
    },
    {
      question: "Un parallélogramme a une base de 9 cm et une hauteur de 5 cm. Quelle est son aire ?",
      correction: "aire = base × hauteur = 9 × 5 = 45 cm². (On ne divise pas par 2 : ce n'est pas un triangle.)",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

// ⚠️ Le mode classe est ENGENDRÉ depuis la fiche (lib/fiches/slidesDepuisFiche).
// Ce tableau n'est plus lu : il ne sert qu'à dire « cette fiche se projette ».
export const slidesParallelogramme5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le parallélogramme - 5e",
    section: {
      type: "objectif",
      phrase: "Reconnaître, décrire et construire un parallélogramme",
      sousPhrase: "Deux paires de côtés parallèles, et tout le reste en découle.",
    },
  },
];
