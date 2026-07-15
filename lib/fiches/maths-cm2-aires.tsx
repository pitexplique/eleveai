// ─── Fiche de cours : les aires (CM2) ───────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/aires.bank.ts (notionId aire).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE la surface :
// comptage de carreaux (figure_libre), rectangle/carré (quadrilatere), triangle.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - aire_comprendre        → definition (la surface), figure (comptage carreaux), propriété « Une surface », piège périmètre
// - aire_carre_rectangle   → propriété « Rectangle et carré », exemple « Le rectangle » (4×3=12), exemple « Le carré » (5→25)
// - aire_triangle_rectangle→ propriété « Le triangle rectangle », exemple « Le triangle » (6×4÷2=12)
// - aire_composer          → propriété « Découper », exemple « La figure en L » (12+4=16)
// - aire_defi              → défi dessiné (potager rectangle 6 m × 4 m → 24 m²)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

function rectCells(rows: number, cols: number, r0 = 0, c0 = 0): Array<[number, number]> {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([r0 + r, c0 + c]);
  return cells;
}

// L'aire = compter les carreaux : un bloc 4 × 3 = 12 carreaux sur quadrillage.
const aireCarreaux = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows: 4, cols: 5, filledCells: rectCells(3, 4) },
      display: { showGrid: true, showFilled: true, showPerimeter: false },
    }}
  />
);

const rectangle43 = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      points: {
        A: { x: 50, y: 60 },
        B: { x: 230, y: 60 },
        C: { x: 230, y: 190 },
        D: { x: 50, y: 190 },
      },
      sideLabels: { AB: "L = 4 cm", BC: "l = 3 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }}
  />
);

const carre5 = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 190, y: 70 },
        C: { x: 190, y: 190 },
        D: { x: 70, y: 190 },
      },
      sideLabels: { AB: "5 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    }}
  />
);

// Un triangle rectangle : base 6 (AB) et hauteur 4 (BC), angle droit en B.
const triangleRect = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      points: {
        A: { x: 60, y: 190 },
        B: { x: 240, y: 190 },
        C: { x: 240, y: 70 },
      },
      sideLabels: { AB: "base 6 cm", BC: "hauteur 4 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAngleAt: "B" },
    }}
  />
);

// La figure en L : rectangle 4 × 3 (12) + carré 2 × 2 (4) = 16 carreaux.
const aireFigureL = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 4,
        filledCells: [...rectCells(3, 4, 0, 0), ...rectCells(2, 2, 3, 0)],
      },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />
);

const pieges = [
  "Confondre l'aire (la surface, à l'intérieur) et le périmètre (le tour de la figure).",
  "Oublier l'unité carrée : une aire s'écrit en cm² ou en m², jamais en cm.",
  "Additionner longueur et largeur au lieu de les multiplier : l'aire d'un rectangle, c'est L × l.",
];

const aRetenir = [
  "L'aire mesure la surface d'une figure : on compte les carreaux. Elle s'écrit en cm², m²…",
  "Aire du rectangle = Longueur × largeur. Aire du carré = côté × côté.",
  "Triangle rectangle : (base × hauteur) ÷ 2. Figure compliquée : on la découpe.",
];

export const ficheAiresCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "aire",
  titre: "Les aires",
  accroche:
    "L'aire d'une figure, c'est la surface qu'elle occupe : la place à l'intérieur. On la mesure en comptant les carreaux, et on l'écrit en cm² ou en m².",
  identite: [
    { label: "Mots clés", valeur: "Aire, surface, carreau, cm², longueur, largeur" },
    { label: "Le secret", valeur: "On compte la surface à l'intérieur (pas le tour)" },
    { label: "Outil", valeur: "Le quadrillage et les formules L × l" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de sa surface, c'est-à-dire la place qu'elle occupe à l'intérieur de son contour. On la mesure en unités carrées : le centimètre carré (cm²) est un carré de 1 cm de côté. Compter les carreaux d'un quadrillage, c'est mesurer une aire.",
  },
  figure: {
    schema: aireCarreaux,
    legende: "Cette figure occupe 12 carreaux : son aire est 12 carreaux (ici 4 × 3 = 12).",
  },
  proprietes: [
    {
      titre: "Une surface",
      texte: "L'aire, c'est l'intérieur de la figure, pas son tour. Elle s'écrit en cm² ou m² (jamais en cm).",
    },
    {
      titre: "Rectangle et carré",
      texte: "Aire du rectangle = Longueur × largeur. Aire du carré = côté × côté.",
    },
    {
      titre: "Le triangle rectangle",
      texte: "C'est la moitié d'un rectangle : aire = (base × hauteur) ÷ 2.",
    },
    {
      titre: "Découper",
      texte: "Une figure compliquée se découpe en rectangles et carrés : on additionne leurs aires.",
    },
  ],
  reel: {
    texte:
      "L'aire répond à de vraies questions à La Réunion : combien de carreaux pour couvrir le sol d'une case ? Combien de gazon pour un jardin créole ? Quelle surface de terrain pour planter des letchis ? On mesure toujours une surface, en m².",
  },
  historique: {
    texte:
      "Il y a plus de 4000 ans, les Égyptiens calculaient déjà l'aire des champs le long du Nil pour savoir combien de blé ils pouvaient récolter, et pour partager les impôts. Ils utilisaient déjà des surfaces rectangulaires.",
  },
  formule: {
    contexte: "Rectangle L × l, carré de côté c, triangle rectangle de base b et hauteur h",
    expression: "A (rectangle) = L × l   ;   A (carré) = c × c   ;   A (triangle rect.) = (b × h) ÷ 2",
    legende: "L'aire s'exprime toujours en unités carrées : cm², m²…",
  },
  methode: [
    { titre: "Je regarde l'intérieur", texte: "L'aire, c'est la surface à l'intérieur, pas le tour." },
    { titre: "Je compte ou je calcule", texte: "Je compte les carreaux, ou j'applique la formule (L × l)." },
    { titre: "Je mets l'unité carrée", texte: "Le résultat est une surface : en cm² ou m²." },
  ],
  usages: [
    { titre: "Carreler", detail: "Combien de carreaux pour couvrir un sol." },
    { titre: "Le gazon", detail: "Quelle surface de gazon pour un jardin (en m²)." },
    { titre: "La peinture", detail: "Quelle surface de mur à peindre." },
  ],
  exemples: [
    {
      titre: "Le rectangle",
      donnees: "Un rectangle mesure 4 cm de longueur et 3 cm de largeur.",
      question: "Quelle est son aire ?",
      schema: rectangle43,
      solution:
        "On multiplie la longueur par la largeur : A = 4 × 3 = 12. L'aire est 12 cm² (12 carreaux de 1 cm).",
    },
    {
      titre: "Le carré",
      donnees: "Un carré a des côtés de 5 cm.",
      question: "Quelle est son aire ?",
      schema: carre5,
      solution:
        "On multiplie le côté par lui-même : A = 5 × 5 = 25. L'aire est 25 cm².",
    },
    {
      titre: "Le triangle rectangle",
      donnees: "Un triangle rectangle a une base de 6 cm et une hauteur de 4 cm.",
      question: "Quelle est son aire ?",
      schema: triangleRect,
      solution:
        "C'est la moitié d'un rectangle 6 × 4 : A = (6 × 4) ÷ 2 = 24 ÷ 2 = 12 cm².",
    },
    {
      titre: "La figure en L",
      donnees: "Une figure en L sur un quadrillage.",
      question: "Quelle est son aire ?",
      schema: aireFigureL,
      solution:
        "On la découpe : un rectangle 4 × 3 (12 carreaux) et un carré 2 × 2 (4 carreaux). Aire = 12 + 4 = 16 carreaux.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle est l'aire d'un rectangle de 6 cm sur 4 cm ?",
      correction:
        "A = L × l = 6 × 4 = 24 cm².",
    },
    {
      question: "Quelle est l'aire d'un carré de côté 7 cm ?",
      correction:
        "A = côté × côté = 7 × 7 = 49 cm².",
    },
    {
      question: "Un triangle rectangle a une base de 8 cm et une hauteur de 5 cm. Quelle est son aire ?",
      correction:
        "A = (base × hauteur) ÷ 2 = (8 × 5) ÷ 2 = 40 ÷ 2 = 20 cm².",
    },
    {
      question: "Un potager rectangulaire mesure 6 m sur 4 m. Quelle est sa surface ?",
      correction:
        "C'est l'aire : A = 6 × 4 = 24 m².",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesAiresCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Aires - CM2",
    section: {
      type: "objectif",
      phrase: "Mesurer la surface d'une figure",
      sousPhrase:
        "L'aire, c'est la place à l'intérieur de la figure. On la mesure en comptant les carreaux.",
      encadre: {
        titre: "L'idée",
        texte: "C'est une surface (cm², m²), pas un tour (cm).",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Combien de carreaux pour un sol, combien de gazon pour un jardin, quelle surface de mur à peindre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les Égyptiens calculaient déjà l'aire des champs le long du Nil pour savoir combien de blé récolter.",
      },
    },
  },
  {
    titre: "Les formules",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle", texte: "A = L × l. 4 sur 3 → 4 × 3 = 12 cm²." },
        { titre: "Carré", texte: "A = côté × côté. Côté 5 → 5 × 5 = 25 cm²." },
        { titre: "Triangle rectangle", texte: "A = (base × hauteur) ÷ 2." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAiresCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le rectangle",
    section: {
      type: "exemple",
      enonce: "Un rectangle mesure 4 cm sur 3 cm.",
      question: "Quelle est son aire ?",
      correction: "A = L × l = 4 × 3 = 12 cm².",
    },
  },
  {
    titre: "Ne pas confondre",
    badge: "Aire ≠ périmètre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'aire",
        contenu: "C'est la SURFACE (l'intérieur). Elle se mesure en cm².",
      },
      droite: {
        variante: "piege",
        titre: "Le périmètre (attention !)",
        contenu: "C'est le TOUR. Il se mesure en cm. Ce n'est pas la même chose.",
      },
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
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
    section: {
      type: "exercice",
      enonce: "Un potager rectangulaire mesure 6 m sur 4 m.",
      question: "Quelle est sa surface ?",
      indice: "La surface, c'est l'aire : A = L × l.",
      correction: "A = 6 × 4 = 24 m².",
    },
  },
];
