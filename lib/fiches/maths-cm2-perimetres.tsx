// ─── Fiche de cours : les périmètres (CM2) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/perimetres.bank.ts (notionId perimetre).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On DESSINE le contour
// (canvas figure_libre / triangle / quadrilatere du coach).
//
// Micro-compétences couvertes (les 5 de la banque) :
// - perimetre_comprendre    → definition (le tour), figure (contour rouge), propriété « Une longueur », piège aire
// - perimetre_triangle      → propriété « Le triangle », exemple « Le triangle » (5+6+7=18)
// - perimetre_quadrilatere  → propriété « Rectangle et carré », exemple « Le rectangle » (8 et 5 → 26), exemple « Le carré » (7 → 28)
// - perimetre_polygone      → propriété « Une figure quelconque », exemple « Le polygone » (contour)
// - perimetre_defi          → défi dessiné (jardin rectangle 12 m × 8 m → grillage 40 m)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le contour d'une figure quelconque (figure en L sur quadrillage), le tour
// tracé en rouge : le même dessin que dans les exercices du coach.
const figureContour = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: {
        rows: 6,
        cols: 6,
        filledCells: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [3, 1],
        ],
      },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />
);

const triangle567 = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      points: {
        A: { x: 70, y: 180 },
        B: { x: 230, y: 180 },
        C: { x: 140, y: 60 },
      },
      sideLabels: { AB: "7 cm", BC: "6 cm", CA: "5 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
    }}
  />
);

const rectangle85 = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      points: {
        A: { x: 50, y: 60 },
        B: { x: 250, y: 60 },
        C: { x: 250, y: 135 },
        D: { x: 50, y: 135 },
      },
      sideLabels: { AB: "L = 8 cm", BC: "l = 5 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }}
  />
);

const carre7 = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      points: {
        A: { x: 70, y: 70 },
        B: { x: 190, y: 70 },
        C: { x: 190, y: 190 },
        D: { x: 70, y: 190 },
      },
      sideLabels: { AB: "7 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: {
        rightAnglesAt: ["A", "B", "C", "D"],
        equalSides: [["AB", "BC"], ["BC", "CD"], ["CD", "DA"]],
      },
    }}
  />
);

const pieges = [
  "Confondre périmètre et aire : le périmètre est le TOUR (en cm) ; l'aire est la surface (en cm²).",
  "Faire longueur × largeur pour un rectangle : ça, c'est l'aire. Le périmètre, c'est 2 × (L + l).",
  "Oublier un côté : pour le périmètre, on additionne TOUS les côtés du contour.",
];

const aRetenir = [
  "Le périmètre, c'est la longueur du tour de la figure. Il se mesure en cm, m, km…",
  "Carré : P = 4 × côté. Rectangle : P = 2 × (Longueur + largeur).",
  "Figure quelconque : on additionne les longueurs de tous les côtés.",
];

export const fichePerimetresCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "perimetre",
  titre: "Les périmètres",
  accroche:
    "Le périmètre d'une figure, c'est la longueur de son tour. On en a besoin dès qu'on veut entourer quelque chose : un jardin, un cadre, un terrain de foot.",
  identite: [
    { label: "Mots clés", valeur: "Périmètre, contour, côté, longueur, largeur" },
    { label: "Le secret", valeur: "On additionne le tour (jamais l'intérieur)" },
    { label: "Outil", valeur: "L'addition, et les formules du carré et du rectangle" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son contour, c'est-à-dire de tout son tour. C'est une longueur : on l'exprime avec une unité de longueur, comme le centimètre (cm) ou le mètre (m), jamais en cm².",
  },
  figure: {
    schema: figureContour,
    legende: "Le périmètre, c'est tout le contour (en rouge) : on suit le tour, jamais l'intérieur.",
  },
  proprietes: [
    {
      titre: "Une longueur",
      texte: "Le périmètre se mesure en cm, m ou km. Ce n'est pas une surface (cm²), c'est un tour.",
    },
    {
      titre: "Le triangle",
      texte: "On additionne les 3 côtés. Côtés 5, 6 et 7 cm : P = 5 + 6 + 7 = 18 cm.",
    },
    {
      titre: "Rectangle et carré",
      texte: "Rectangle : P = 2 × (L + l). Carré : P = 4 × côté (les 4 côtés sont égaux).",
    },
    {
      titre: "Une figure quelconque",
      texte: "S'il n'y a pas de formule, on additionne les longueurs de tous les côtés du contour.",
    },
  ],
  reel: {
    texte:
      "Calculer un périmètre répond à une vraie question à La Réunion : quelle longueur de grillage pour entourer un jardin créole ? Quelle longueur de bordure autour d'un terrain de pétanque ? Quel ruban pour faire le tour d'un cadeau ?",
  },
  historique: {
    texte:
      "Le mot « périmètre » vient du grec : « peri » (autour) et « metron » (mesure). Il y a plus de 4000 ans, les arpenteurs d'Égypte mesuraient déjà le tour des champs avec des cordes à nœuds, après chaque crue du Nil.",
  },
  formule: {
    contexte: "Carré de côté c, rectangle de longueur L et de largeur l",
    expression: "P (carré) = 4 × c    ;    P (rectangle) = 2 × (L + l)",
    legende: "Pour une figure quelconque : on additionne tous les côtés du contour.",
  },
  methode: [
    { titre: "Je repère le contour", texte: "Je suis le tour de la figure, jamais l'intérieur." },
    { titre: "Je choisis", texte: "Carré ou rectangle → une formule. Sinon → j'additionne tous les côtés." },
    { titre: "Je garde l'unité", texte: "Le résultat est une longueur : en cm, m ou km." },
  ],
  usages: [
    { titre: "Clôturer", detail: "Longueur de grillage pour entourer un jardin." },
    { titre: "Encadrer", detail: "Longueur de baguette pour faire un cadre." },
    { titre: "Faire le tour", detail: "Distance pour faire le tour d'un terrain de sport." },
  ],
  exemples: [
    {
      titre: "Le triangle",
      donnees: "Un triangle a pour côtés 5 cm, 6 cm et 7 cm.",
      question: "Quel est son périmètre ?",
      schema: triangle567,
      solution:
        "On additionne les trois côtés du contour : 5 + 6 + 7 = 18. Le périmètre est 18 cm.",
    },
    {
      titre: "Le rectangle",
      donnees: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur.",
      question: "Quel est son périmètre ?",
      schema: rectangle85,
      solution:
        "Il y a 2 longueurs et 2 largeurs : P = 2 × (8 + 5) = 2 × 13 = 26 cm.",
    },
    {
      titre: "Le carré",
      donnees: "Un carré a des côtés de 7 cm.",
      question: "Quel est son périmètre ?",
      schema: carre7,
      solution:
        "Les 4 côtés sont égaux : P = 4 × 7 = 28 cm.",
    },
    {
      titre: "Une figure quelconque",
      donnees: "Une figure dessinée sur un quadrillage (voir le contour rouge).",
      question: "Comment trouver son périmètre ?",
      schema: figureContour,
      solution:
        "On suit le contour et on additionne la longueur de chaque petit côté du tour. On ne compte jamais les traits de l'intérieur.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un triangle a des côtés de 4 cm, 5 cm et 6 cm. Quel est son périmètre ?",
      correction:
        "On additionne les 3 côtés : 4 + 5 + 6 = 15. Le périmètre est 15 cm.",
    },
    {
      question: "Un rectangle mesure 10 cm sur 4 cm. Quel est son périmètre ?",
      correction:
        "P = 2 × (10 + 4) = 2 × 14 = 28 cm.",
    },
    {
      question: "Un carré a un côté de 9 cm. Quel est son périmètre ?",
      correction:
        "P = 4 × 9 = 36 cm.",
    },
    {
      question: "Un jardin rectangulaire mesure 12 m sur 8 m. Quelle longueur de grillage pour l'entourer ?",
      correction:
        "C'est le périmètre : P = 2 × (12 + 8) = 2 × 20 = 40 m de grillage.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesPerimetresCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Périmètres - CM2",
    section: {
      type: "objectif",
      phrase: "Calculer la longueur du tour d'une figure",
      sousPhrase:
        "Le périmètre, c'est le contour : on suit tout le tour de la figure, jamais l'intérieur.",
      encadre: {
        titre: "L'idée",
        texte: "C'est une longueur (cm, m), pas une surface (cm²).",
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
          "Le grillage autour d'un jardin, la bordure d'un terrain de pétanque, le ruban autour d'un cadeau.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Périmètre » vient du grec : peri (autour) + metron (mesure). Les Égyptiens mesuraient le tour des champs avec des cordes à nœuds.",
      },
    },
  },
  {
    titre: "Les formules",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Carré", texte: "P = 4 × côté. Côté 7 cm → 4 × 7 = 28 cm." },
        { titre: "Rectangle", texte: "P = 2 × (L + l). 8 et 5 → 2 × 13 = 26 cm." },
        { titre: "Figure quelconque", texte: "On additionne tous les côtés du contour." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePerimetresCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le rectangle",
    section: {
      type: "exemple",
      enonce: "Un rectangle mesure 8 cm sur 5 cm.",
      question: "Quel est son périmètre ?",
      correction: "P = 2 × (8 + 5) = 2 × 13 = 26 cm.",
    },
  },
  {
    titre: "Ne pas confondre",
    badge: "Périmètre ≠ aire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le périmètre",
        contenu: "C'est le TOUR de la figure. Il se mesure en cm, m, km.",
      },
      droite: {
        variante: "piege",
        titre: "L'aire (attention !)",
        contenu: "C'est la SURFACE. Elle se mesure en cm². Ce n'est pas la même chose.",
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
      enonce: "Un jardin rectangulaire mesure 12 m sur 8 m.",
      question: "Quelle longueur de grillage pour l'entourer ?",
      indice: "Le grillage suit le tour : c'est le périmètre, P = 2 × (L + l).",
      correction: "P = 2 × (12 + 8) = 2 × 20 = 40 m de grillage.",
    },
  },
];
