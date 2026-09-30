// ─── Fiche de cours : les aires (6e) ────────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/aires.bank.ts (notionId aire_surface).
//
// ⭐ RÉÉCRITE LE 30/09/2026 POUR DES 6e QUI LISENT DIFFICILEMENT : phrases
// courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo au mode
// classe. Les nombres sont ceux de la banque ; la feuille d'exercices
// (lib/fiches-exercices/maths-6e-aire-surface.tsx) n'en partage aucun.
//
// Micro-compétences de aire_surface 6/6 (+ les deux automatismes utiles) :
// - aire_rectangle  → propriété 2 (6 × 4), formule (4 rangées de 6), méthode 2,
//                     exemple 1 (8 × 5), entraînement 2
// - aire_carre      → propriété 3 (5 × 5), méthode 2 (7 × 7), entraînement 3
// - aire_comparer   → propriété 4 (les mêmes 12 carreaux recollés), méthode 3,
//                     usage 2 (jardin 7 × 3 ou potager de 5), exemple 4
//                     (250 cm² ou 3 dm²)
// - aire_decomposer → propriété 5 (le T), usage 3 (le zigzag), exemples 2 (le L)
//                     et 3 (la figure biscornue)
// - aire_probleme   → usage 2 (le jardin et le potager)
// - aire_defi       → entraînement 4 (même aire, périmètres différents) et 5
//                     (carré de 36 cm²)
// - aire_comprendre, aire_compter (notion voisine aire_unite) → définition +
//   figure, propriété 1, usage 1, entraînement 1.
//
// ⭐ LES CONVERSIONS D'AIRE (1 dm² = 100 cm²) VIVENT DANS LA FICHE VOISINE
// `maths-6e-aire-unite.tsx` (aire_convertir) : ici elles ne servent qu'à
// comparer (exemple 4).
//
// ⛔ UN SEUL DESSIN PAR BLOC, JAMAIS DEUX EMPILÉS : projetés, deux
// quadrillages l'un sous l'autre débordaient de 103 à 155 px (mesuré le
// 30/09). Deux formes à comparer tiennent dans UN quadrillage, côte à côte.
// ⛔ PAS DE TABLEAU DE CONVERSION (BO 6e : « déconseillé à ce stade »).

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

/**
 * Le quadrillage. `unites` marque chaque carreau d'un « 1 » (compter),
 * `contour` trace le tour en rouge (opposer l'aire au périmètre).
 * ⚠️ À 32 px la case, 8 colonnes tombent à 10 px de chiffre sur un téléphone ;
 * au-delà de 6 colonnes, 24 px.
 */
const grille = (
  rows: number,
  cols: number,
  cells: Case[],
  opts: { unites?: boolean; contour?: boolean; cellSize?: number } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: opts.cellSize ?? (cols > 6 ? 24 : 32) },
      grid: { rows, cols, filledCells: cells },
      display: {
        showGrid: true,
        showFilled: true,
        showCellLabels: opts.unites ?? false,
        showPerimeter: opts.contour ?? false,
      },
    }}
  />
);

/** Un rectangle CÔTÉ : ses dimensions écrites, ses quatre angles droits codés. */
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

/** Un tableau de deux colonnes (jamais trois). */
const tableau = (headers: [string, string], lignes: [string, string][], ligneForte?: number) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers,
      rows: lignes.map((values) => ({ values })),
      highlight: ligneForte === undefined ? { col: 1 } : { row: ligneForte },
    }}
  />
);

// ─── Les formes ───────────────────────────────────────────────────────────────

// L'escalier de la définition : dix carreaux, ni rectangle ni carré.
const escalier: Case[] = [
  [0, 0],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [3, 1], [3, 2], [3, 3],
];

// Douze carreaux en rectangle 3 × 4 (compter).
const bloc12: Case[] = rectCells(3, 4);

// COMPARER SANS MESURER, dans UN quadrillage : les 12 carreaux en rectangle à
// gauche, les MÊMES 12 recollés en L à droite (colonne 4 vide entre les deux).
const memeAire: Case[] = [...rectCells(3, 4, 0, 0), ...rectCells(2, 4, 0, 5), ...rectCells(2, 2, 2, 5)];

// Le T de la propriété « découper » : 5 carreaux en haut + 2 en dessous.
const formeT: Case[] = [...rectCells(1, 5, 0, 0), [1, 2], [2, 2]];

// La croix de l'usage 1 : neuf carreaux, aucune forme connue.
const croix: Case[] = [
  [0, 1],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2],
  [3, 1], [3, 2],
];

// Le zigzag de l'usage 3 : six carreaux, trois rectangles de 2.
const zigzag: Case[] = [
  [0, 0], [0, 1],
  [1, 1], [1, 2],
  [2, 2], [2, 3],
];

// La figure en L de l'exemple 2 : rectangle 4 × 3 (12) + carré 2 × 2 (4) = 16.
const figureL: Case[] = [...rectCells(3, 4, 0, 0), ...rectCells(2, 2, 3, 0)];

// La figure biscornue de l'exemple 3 : 2 + 4 + 3 = 9 carreaux.
const biscornue: Case[] = [
  [0, 0], [0, 1],
  [1, 0], [1, 1], [1, 2], [1, 3],
  [2, 2], [2, 3], [2, 4],
];

// ─── Les dessins qui ne sont pas des quadrillages ─────────────────────────────

const choisirLaMethode = tableau(
  ["La forme", "Je fais"],
  [
    ["Rectangle", "longueur × largeur"],
    ["Carré", "côté × côté"],
    ["Figure tordue", "je découpe"],
  ]
);

const carreSeptPose = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      title: "Carré de 7 cm de côté",
      numbers: ["7", "7"],
      result: "49",
      display: { showResult: true, compact: false },
      questionLabel: "49 : c'est l'aire, en cm².",
    }}
  />
);

const lePetitDeux = tableau(
  ["J'écris", "C'est"],
  [
    ["24 cm", "une longueur"],
    ["24 cm²", "une aire"],
  ],
  1
);

const jardinOuPotager = tableau(
  ["Terrain", "Aire"],
  [
    ["Jardin 7 m × 3 m", "21 m²"],
    ["Potager 5 m × 5 m", "25 m²"],
  ],
  1
);

const afficheOuFeuille = tableau(
  ["Aire donnée", "En cm²"],
  [
    ["Affiche : 250 cm²", "250 cm²"],
    ["Feuille : 3 dm²", "300 cm²"],
  ],
  1
);

const pieges = [
  "Confondre aire et périmètre. L'aire, c'est l'intérieur. Le périmètre, c'est le tour.",
  "Additionner longueur et largeur. Pour une aire, je multiplie.",
  "Oublier le petit 2. Une aire s'écrit en cm², pas en cm.",
];

const aRetenir = [
  "L'aire, c'est la place à l'intérieur. Elle s'écrit en cm² ou en m².",
  "Rectangle : longueur × largeur. Carré : côté × côté.",
  "Figure tordue : je la découpe, puis j'additionne les morceaux.",
];

export const ficheAires6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "L'aire, c'est la place à l'intérieur d'une figure. On compte des carreaux, on multiplie, ou on découpe !",
  identite: [
    { label: "Le mot clé", valeur: "L'aire : l'intérieur de la figure" },
    { label: "Le secret", valeur: "Multiplier, c'est compter plus vite" },
    { label: "Unités", valeur: "cm², m² (avec le petit 2)" },
  ],
  definition: {
    texte:
      "L'aire, c'est la place à l'intérieur d'une figure. On la mesure en carreaux. 1 cm² est l'aire d'un carré de 1 cm de côté.",
  },
  figure: {
    schema: grille(4, 4, escalier, { contour: true }),
    legende: "En rouge, le tour : le périmètre. En bleu, l'intérieur : l'aire.",
  },
  proprietes: [
    {
      titre: "Compter les carreaux",
      micros: ["aire_compter", "aire_comprendre"],
      texte: "Chaque carreau vaut 1 unité d'aire. 12 carreaux, c'est une aire de 12 unités.",
      schema: grille(3, 4, bloc12, { unites: true }),
    },
    {
      titre: "L'aire du rectangle",
      micros: ["aire_rectangle"],
      texte: "Aire = longueur × largeur. 6 × 4 = 24 cm².",
      schema: rectangleCote(186, 124, { AB: "6 cm", BC: "4 cm" }),
    },
    {
      titre: "L'aire du carré",
      micros: ["aire_carre"],
      texte: "Tous les côtés sont égaux. Aire = côté × côté : 5 × 5 = 25 cm².",
      schema: rectangleCote(150, 150, { AB: "5 cm", BC: "5 cm", CD: "5 cm", DA: "5 cm" }),
    },
    {
      titre: "Comparer sans mesurer",
      micros: ["aire_comparer"],
      texte: "Je découpe et je recolle les morceaux. Si rien ne manque, les deux aires sont égales.",
      schema: legende(grille(4, 9, memeAire, { contour: true }), "Les mêmes 12 carreaux, rangés autrement."),
    },
    {
      titre: "Découper une figure",
      micros: ["aire_decomposer"],
      texte: "Je coupe la figure en rectangles. J'additionne les aires des morceaux.",
      schema: legende(grille(3, 5, formeT, { unites: true, contour: true }), "5 en haut + 2 en dessous = 7."),
    },
  ],
  reel: {
    texte:
      "Pour peindre un mur, on calcule son aire. Pour poser du carrelage aussi. Une annonce donne la surface d'un logement en m². La question est toujours : quelle surface couvrir ?",
  },
  historique: {
    texte:
      "En Égypte, le Nil débordait chaque année. L'eau effaçait les limites des champs. Des arpenteurs remesuraient alors chaque champ. L'aire servait à calculer l'impôt.",
  },
  formule: {
    contexte: "Rectangle L sur l, carré de côté c",
    expression: "Rectangle : L × l ; carré : c × c",
    legende: "4 rangées de 6 carreaux : 4 × 6 = 24. Multiplier, c'est compter vite.",
    schema: grille(4, 6, rectCells(4, 6), { unites: true }),
  },
  methode: [
    {
      titre: "Je regarde la forme",
      micros: ["aire_rectangle", "aire_carre", "aire_decomposer"],
      texte: "La forme décide du calcul. Rectangle ou carré : une formule. Sinon, je découpe.",
      schema: choisirLaMethode,
    },
    {
      titre: "Je multiplie",
      micros: ["aire_rectangle", "aire_carre"],
      texte: "Carré de 7 cm de côté : 7 × 7 = 49. L'aire est 49 cm².",
      schema: carreSeptPose,
    },
    {
      titre: "J'écris l'unité carrée",
      micros: ["aire_comparer"],
      texte: "Une aire s'écrit avec le petit 2. Pour comparer, je mets les aires dans la même unité.",
      schema: lePetitDeux,
    },
  ],
  usages: [
    {
      titre: "Compter les carreaux",
      micros: ["aire_compter"],
      detail: "La figure n'a pas de nom ? Je compte ses carreaux : 9 unités d'aire.",
      schema: grille(4, 3, croix, { unites: true }),
    },
    {
      titre: "Choisir le plus grand terrain",
      micros: ["aire_probleme", "aire_comparer"],
      detail: "Jardin : 7 × 3 = 21 m². Potager : 5 × 5 = 25 m². Le potager est plus grand.",
      schema: jardinOuPotager,
    },
    {
      titre: "Découper la figure",
      micros: ["aire_decomposer"],
      detail: "Le zigzag, ce sont 3 morceaux de 2 carreaux. 2 + 2 + 2 = 6 carreaux.",
      schema: grille(3, 4, zigzag, { contour: true }),
    },
  ],
  exemples: [
    {
      titre: "L'aire d'un rectangle",
      micros: ["aire_rectangle"],
      donnees: "Un rectangle mesure 8 cm sur 5 cm.",
      question: "Quelle est son aire ?",
      schema: rectangleCote(192, 120, { AB: "8 cm", BC: "5 cm" }),
      solution: "Aire = longueur × largeur. 8 × 5 = 40. L'aire est 40 cm². Attention : 8 + 5 + 8 + 5 = 26 cm, c'est le tour.",
    },
    {
      titre: "Une figure en L",
      micros: ["aire_decomposer"],
      donnees: "Un rectangle de 4 cm sur 3 cm et un carré de 2 cm.",
      question: "Quelle est l'aire de la figure en L ?",
      schema: grille(5, 4, figureL, { contour: true }),
      solution: "Rectangle : 4 × 3 = 12 cm². Carré : 2 × 2 = 4 cm². Total : 12 + 4 = 16 cm².",
    },
    {
      titre: "Une figure biscornue",
      micros: ["aire_decomposer"],
      donnees: "Chaque carreau mesure 1 cm².",
      question: "Quelle est l'aire de cette figure ?",
      schema: grille(3, 5, biscornue, { contour: true }),
      solution: "Aucune formule ne marche. Je compte rangée par rangée : 2 + 4 + 3 = 9. L'aire est 9 cm².",
    },
    {
      titre: "Comparer deux aires",
      micros: ["aire_comparer"],
      donnees: "Une affiche : 250 cm². Une feuille : 3 dm².",
      question: "Laquelle a la plus grande aire ?",
      schema: afficheOuFeuille,
      solution: "1 dm² = 100 cm². Donc 3 dm² = 300 cm². 300 est plus grand que 250 : c'est la feuille.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une surface couvre 3 rangées de 4 carreaux unités. Quelle est son aire ?",
      correction: "3 × 4 = 12. L'aire est 12 unités d'aire.",
      micros: ["aire_compter"],
    },
    {
      question: "Calcule l'aire d'un rectangle de 4 cm sur 3 cm.",
      correction: "4 × 3 = 12. L'aire est 12 cm².",
      micros: ["aire_rectangle"],
    },
    {
      question: "Calcule l'aire d'un carré de 9 cm de côté.",
      correction: "9 × 9 = 81. L'aire est 81 cm². Attention : 4 × 9 = 36 cm, c'est le tour.",
      micros: ["aire_carre"],
    },
    {
      question: "Défi : deux rectangles peuvent-ils avoir la même aire, mais pas le même tour ?",
      correction: "Oui. 3 × 4 et 2 × 6 font tous les deux 12 cm². Leurs tours font 14 cm et 16 cm.",
      micros: ["aire_defi"],
    },
    {
      question: "Défi : un carré a une aire de 36 cm². Combien mesure un côté ?",
      correction: "Je cherche le nombre qui, fois lui-même, fait 36. 6 × 6 = 36. Le côté mesure 6 cm.",
      micros: ["aire_defi"],
    },
  ],
  tiMargo: {
    objectif: "L'aire, c'est l'intérieur !",
    definition: "Le tour en rouge, l'aire en bleu !",
    formule: "Multiplier, c'est compter vite !",
    pieges: "Pour l'aire, je multiplie, je n'ajoute pas !",
    retenir: "Une aire s'écrit avec un petit 2 : cm² !",
    exercice: "À toi ! Compte les carreaux.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// Le mode classe est engendré depuis la fiche (slidesDepuisFiche) : ce tableau
// n'est qu'un interrupteur, un tableau vide couperait le mode classe.
export const slidesAires6e: ClasseSlide[] = slidesDepuisFiche(ficheAires6e);
