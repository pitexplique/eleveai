// ─── Fiche de cours : les périmètres (6e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/perimetres.bank.ts, notionId aire_perimetre).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo au mode
// classe. Les nombres sont ceux de la banque ; la feuille d'exercices
// (lib/fiches-exercices/maths-6e-aire-perimetre.tsx) n'en partage aucun.
//
// Micro-compétences 6/6 :
// - aire_perimetre_comprendre → définition + figure (l'escalier), propriété 1
//                               (le tour déplié, 5 × 4), méthode 1, pièges 1 et 3
// - aire_perimetre_carre      → propriété 2 (5 cm), méthode 2, usage 1 (7 cm),
//                               exemple 1 (9 cm), entraînement 1
// - aire_perimetre_rectangle  → propriété 3 (6 × 2), méthode 2, usage 2 (6 × 4),
//                               entraînement 2 (5 × 2)
// - aire_perimetre_figure     → propriété 4 (le zigzag), usage 3 (3, 4, 5, 6 cm),
//                               exemple 3 (le L), entraînement 3
// - aire_perimetre_probleme   → méthode 3, exemple 2 (le grillage du jardin 8 × 3)
// - aire_perimetre_defi       → exemple 4 (deux carrés de 3 recollés),
//                               entraînement 4 (côté d'un carré de 28 cm) et 5
//
// ⭐ LE DISQUE N'EST PAS ICI : c'est la notion `cercle_disque`, sa propre fiche.
//
// ⛔ UN SEUL DESSIN PAR BLOC, JAMAIS DEUX EMPILÉS : projetés, deux quadrillages
// l'un sous l'autre débordaient de 95 px (mesuré le 30/09). Les deux carrés
// séparés ET recollés tiennent dans UN quadrillage, côte à côte.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

type Case = [number, number];

function rectCells(rows: number, cols: number, r0 = 0, c0 = 0): Case[] {
  const cells: Case[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([r0 + r, c0 + c]);
  return cells;
}

/** Le quadrillage, contour en ROUGE : ici le contour EST le périmètre. */
const grille = (rows: number, cols: number, cells: Case[], cellSize?: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: cellSize ?? (cols > 6 ? 24 : 32) },
      grid: { rows, cols, filledCells: cells },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />
);

/** Un rectangle (ou un carré) coté, ses quatre angles droits codés. */
const rectangleCote = (
  largeur: number,
  hauteur: number,
  labels: { AB?: string; BC?: string; CD?: string; DA?: string }
) => {
  const x0 = 48;
  const y0 = 45;
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        size: { width: x0 * 2 + largeur, height: y0 * 2 + hauteur },
        points: {
          A: { x: x0, y: y0 },
          B: { x: x0 + largeur, y: y0 },
          C: { x: x0 + largeur, y: y0 + hauteur },
          D: { x: x0, y: y0 + hauteur },
        },
        sideLabels: labels,
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
        marks: { rightAnglesAt: ["A", "B", "C", "D"] },
      }}
    />
  );
};

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : un escalier. Le contour rouge se suit du doigt ; les traits gris
// de l'intérieur ne comptent pas.
const escalier: Case[] = [
  [0, 0],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [3, 1], [3, 2], [3, 3],
];

// ⭐ LE TOUR DÉPLIÉ (banque : « Un rectangle mesure 5 cm sur 4 cm. Que vaut
// son périmètre ? »). Un périmètre est une LONGUEUR : les quatre côtés bout à
// bout font une barre de 18 cm. Cadre de 240 : 12 × 226/240 = 11,3 px (le
// cadre de 320 donnait 8,5 px, mesuré).
const tourDeplie = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Le tour du rectangle 5 × 4",
      total: "18 cm",
      parts: [
        { label: "L", value: "5" },
        { label: "l", value: "4" },
        { label: "L", value: "5" },
        { label: "l", value: "4" },
      ],
      questionLabel: "5 + 4 + 5 + 4 = 18 cm",
      size: { width: 240, height: 190 },
    }}
  />
);

// Le zigzag : six carreaux, deux décrochements. Aucune formule ne marche.
const zigzag: Case[] = [
  [0, 0], [0, 1],
  [1, 1], [1, 2],
  [2, 2], [2, 3],
];

// La croix de la méthode 1 : cinq carreaux, douze côtés de carreau au tour.
const croix: Case[] = [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1]];

// La figure en L de l'exemple 3 : bloc 2 × 4 en haut, bloc 2 × 2 en bas.
// Son tour fait 4 + 2 + 2 + 2 + 2 + 4 = 16 carreaux.
const figureL: Case[] = [...rectCells(2, 4, 0, 0), ...rectCells(2, 2, 2, 0)];

// LE RECOLLEMENT, dans UN SEUL quadrillage : deux carrés de 3 séparés (à
// gauche), puis les mêmes recollés (à droite). Sans texte dans le dessin.
const deuxCarres: Case[] = [
  ...rectCells(3, 3, 0, 0),
  ...rectCells(3, 3, 0, 4),
  ...rectCells(3, 6, 0, 8),
];

// Le mémo : deux colonnes, jamais trois.
const memoCalculs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Figure", "Périmètre"],
      rows: [
        { values: ["Carré", "4 × côté"] },
        { values: ["Rectangle", "2 × (L + l)"] },
        { values: ["Autre figure", "j'additionne tout"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// USAGE 3 : une figure sans nom, dessinée à l'échelle (30 px pour 1 cm) :
// 3 cm en haut, 5 cm penché, 6 cm en bas, 4 cm à gauche.
const quatreCotes = (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 270, height: 210 },
      points: {
        A: { x: 45, y: 45 },
        B: { x: 135, y: 45 },
        C: { x: 225, y: 165 },
        D: { x: 45, y: 165 },
      },
      sideLabels: { AB: "3 cm", BC: "5 cm", CD: "6 cm", DA: "4 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAnglesAt: ["A", "D"] },
    }}
  />
);

// MÉTHODE 3 : l'addition posée du tour d'un rectangle de 7 cm sur 3 cm.
const additionPosee = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "addition",
      title: "7 + 3 + 7 + 3",
      numbers: ["7", "3", "7", "3"],
      result: "20",
      display: { showResult: true, compact: false },
      questionLabel: "20 cm : c'est le tour.",
    }}
  />
);

const pieges = [
  "Calculer 5 × 4 = 20. C'est l'aire ! Le tour fait 5 + 4 + 5 + 4 = 18 cm.",
  "S'arrêter à 6 + 2 = 8 cm. C'est seulement la moitié du tour.",
  "Écrire cm². Un périmètre est une longueur : il s'écrit en cm.",
];

const aRetenir = [
  "Le périmètre, c'est la longueur du tour de la figure.",
  "Carré : 4 × côté. Rectangle : 2 × (longueur + largeur).",
  "Autre figure : j'additionne tous les côtés du tour.",
];

export const fichePerimetres6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-perimetre",
  titre: "Les périmètres",
  accroche:
    "Le périmètre, c'est la longueur du tour d'une figure. Carré, rectangle ou figure tordue : on sait tous les calculer !",
  identite: [
    { label: "Le mot clé", valeur: "Le tour de la figure" },
    { label: "Le secret", valeur: "Je suis le bord avec le doigt" },
    { label: "Outil", valeur: "La règle graduée" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son tour. On suit le bord, sans rien oublier. C'est une longueur : on l'écrit en cm ou en m.",
  },
  figure: {
    schema: grille(4, 4, escalier),
    legende: "Le tour, c'est le trait rouge. Les traits gris de l'intérieur ne comptent pas.",
  },
  proprietes: [
    {
      titre: "Le tour, mis bout à bout",
      micros: ["aire_perimetre_comprendre"],
      texte: "Je mets les côtés bout à bout : j'obtiens une seule longueur. C'est le périmètre.",
      schema: tourDeplie,
    },
    {
      titre: "Le carré",
      micros: ["aire_perimetre_carre"],
      texte: "Un carré a 4 côtés égaux. P = 4 × côté : 4 × 5 = 20 cm.",
      schema: rectangleCote(150, 150, { AB: "5 cm", BC: "5 cm", CD: "5 cm", DA: "5 cm" }),
    },
    {
      titre: "Le rectangle",
      micros: ["aire_perimetre_rectangle"],
      texte: "2 longueurs et 2 largeurs. P = 2 × (6 + 2) = 2 × 8 = 16 cm.",
      // « 6 cm » et non « L = 6 cm » : sur un rectangle aussi plat, l'étiquette
      // longue touchait le point B (rendu vérifié le 30/09).
      schema: rectangleCote(192, 72, { AB: "6 cm", BC: "2 cm" }),
    },
    {
      titre: "Une figure tordue",
      micros: ["aire_perimetre_figure"],
      texte: "Pas de formule : j'additionne tous les côtés du tour. Les traits de l'intérieur ne comptent pas.",
      schema: legende(grille(3, 4, zigzag), "Je suis le rouge, jamais le gris."),
    },
  ],
  reel: {
    texte:
      "Un grillage fait le tour d'un jardin. Une baguette fait le tour d'un cadre. Un ruban fait le tour d'un cadeau. Pour les acheter, on calcule un périmètre.",
  },
  historique: {
    texte:
      "« Périmètre » vient du grec : « autour » et « mesure ». En Égypte, le Nil débordait chaque année. Les champs perdaient leurs limites. Des arpenteurs les retraçaient avec des cordes.",
  },
  formule: {
    contexte: "Carré de côté c, rectangle L sur l",
    expression: "Carré : P = 4 × c ; rectangle : P = 2 × (L + l)",
    legende: "Pour une autre figure, j'additionne tous les côtés.",
    schema: memoCalculs,
  },
  methode: [
    {
      titre: "Je suis le tour du doigt",
      micros: ["aire_perimetre_comprendre"],
      texte: "Je pars d'un coin et je fais tout le tour. Je compte chaque côté une seule fois.",
      schema: legende(grille(3, 3, croix), "12 côtés de carreau : P = 12 cm."),
    },
    {
      titre: "Je choisis le calcul",
      micros: ["aire_perimetre_carre", "aire_perimetre_rectangle"],
      texte: "Carré : 4 × côté. Rectangle : 2 × (L + l). Sinon, j'additionne tout.",
      schema: rectangleCote(192, 96, { AB: "L", BC: "l" }),
    },
    {
      titre: "Je calcule et j'écris l'unité",
      micros: ["aire_perimetre_probleme"],
      texte: "Je fais le calcul. Puis j'écris l'unité : cm ou m, jamais cm².",
      schema: additionPosee,
    },
  ],
  usages: [
    {
      titre: "Le carré",
      micros: ["aire_perimetre_carre"],
      detail: "Un carré de 7 cm de côté. P = 4 × 7 = 28 cm.",
      schema: rectangleCote(140, 140, { AB: "7 cm", BC: "7 cm", CD: "7 cm", DA: "7 cm" }),
    },
    {
      titre: "Le rectangle",
      micros: ["aire_perimetre_rectangle"],
      detail: "Un rectangle de 6 cm sur 4 cm. P = 2 × (6 + 4) = 20 cm.",
      schema: rectangleCote(186, 124, { AB: "6 cm", BC: "4 cm" }),
    },
    {
      titre: "Une figure sans nom",
      micros: ["aire_perimetre_figure"],
      detail: "Ses côtés mesurent 3, 5, 6 et 4 cm. P = 3 + 5 + 6 + 4 = 18 cm.",
      schema: quatreCotes,
    },
  ],
  exemples: [
    {
      titre: "Le périmètre d'un carré",
      micros: ["aire_perimetre_carre"],
      donnees: "Un carré a un côté de 9 cm.",
      question: "Quel est son périmètre ?",
      schema: rectangleCote(150, 150, { AB: "9 cm", BC: "9 cm", CD: "9 cm", DA: "9 cm" }),
      solution: "Un carré a 4 côtés égaux. P = 4 × 9 = 36 cm. Attention : 9 × 9 donne l'aire, pas le tour.",
    },
    {
      titre: "Le grillage du jardin",
      micros: ["aire_perimetre_probleme", "aire_perimetre_rectangle"],
      donnees: "Un jardin rectangulaire mesure 8 m sur 3 m.",
      question: "Quelle longueur de grillage pour faire le tour ?",
      schema: rectangleCote(192, 72, { AB: "8 m", BC: "3 m" }),
      solution: "Le grillage fait le tour. P = 2 × (8 + 3) = 22. Il faut 22 m de grillage.",
    },
    {
      titre: "Une figure en L",
      micros: ["aire_perimetre_figure"],
      donnees: "Chaque carreau mesure 1 cm de côté.",
      question: "Quel est le périmètre de la figure en L ?",
      schema: grille(4, 4, figureL),
      solution: "Pas de formule : je suis le tour rouge. 4 + 2 + 2 + 2 + 2 + 4 = 16. Le périmètre est 16 cm.",
    },
    {
      titre: "Deux carrés recollés",
      micros: ["aire_perimetre_defi", "aire_perimetre_figure"],
      donnees: "Deux carrés de 3 cm, collés par un côté (à droite).",
      question: "Quel est le périmètre de la figure collée ?",
      schema: grille(3, 14, deuxCarres, 16),
      solution: "Ils forment un rectangle 6 × 3. P = 2 × (6 + 3) = 18 cm. Le côté collé ne compte plus.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un carré a un côté de 6 cm. Calcule son périmètre.",
      correction: "4 côtés égaux : P = 4 × 6 = 24 cm.",
      micros: ["aire_perimetre_carre"],
    },
    {
      question: "Un rectangle mesure 5 cm sur 2 cm. Calcule son périmètre.",
      correction: "P = 2 × (5 + 2) = 2 × 7 = 14 cm.",
      micros: ["aire_perimetre_rectangle"],
    },
    {
      question: "Les carreaux mesurent 1 cm. Quel est le périmètre de l'escalier de la définition ?",
      correction: "Je suis le tour : 4 en bas, 4 à gauche, et 4 + 4 pour les marches. P = 16 cm.",
      micros: ["aire_perimetre_figure"],
    },
    {
      question: "Défi : un carré a un périmètre de 28 cm. Combien mesure un côté ?",
      correction: "Je fais le calcul à l'envers : 28 ÷ 4 = 7. Un côté mesure 7 cm. Je vérifie : 4 × 7 = 28.",
      micros: ["aire_perimetre_defi"],
    },
    {
      question: "Défi : on colle deux carrés de 5 cm par un côté. Le périmètre vaut-il 40 cm ?",
      correction: "Non. On obtient un rectangle de 10 cm sur 5 cm. P = 2 × (10 + 5) = 30 cm.",
      micros: ["aire_perimetre_defi"],
    },
  ],
  tiMargo: {
    objectif: "Le périmètre, c'est le tour !",
    definition: "Je suis le bord avec le doigt !",
    formule: "Carré : 4 fois le côté !",
    pieges: "5 × 4, c'est l'aire, pas le tour !",
    retenir: "Un tour s'écrit en cm, jamais en cm² !",
    exercice: "À toi ! Compte les 4 côtés.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est engendré depuis la fiche (slidesDepuisFiche) : ce tableau
// n'est qu'un interrupteur, un tableau vide couperait le mode classe.
export const slidesPerimetres6e: ClasseSlide[] = slidesDepuisFiche(fichePerimetres6e);
