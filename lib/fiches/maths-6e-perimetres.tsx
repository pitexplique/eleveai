// ─── Fiche de cours : les périmètres (6e) ──────────────────────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/perimetres.bank.ts, notionId aire_perimetre).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - aire_perimetre_comprendre → accroche, définition + figure, propriété 1
//                               (un périmètre est une LONGUEUR), pièges 1 et 3
// - aire_perimetre_carre      → propriété 2, usage 1, exemple 1, formule
// - aire_perimetre_rectangle  → propriété 3, usage 2, exemple 2, formule
// - aire_perimetre_figure     → propriétés 4 et 5, usage 3, exemples 3 et 4
// - aire_perimetre_probleme   → reel, entraînement (le grillage)
// - aire_perimetre_defi       → entraînement (retrouver le côté, les deux carrés)
//
// ⭐ LE DISQUE N'EST PAS ICI. Le BO de 6e demande aussi le périmètre du disque
// (proportionnel au diamètre, P = π × d) : c'est devenu sa propre notion,
// `cercle_disque`, ouverte le 21/08/2026 — donc sa propre fiche. Une fiche = un
// notionId, sinon le badge « 📖 Fiche » du coach ne sait plus quoi allumer.
//
// ⭐ LE DESSIN SE CHOISIT POUR CE QU'IL MONTRE (REGLES.md § 2 bis). Les cinq
// propriétés portent cinq images de nature différente : le tour DÉPLIÉ en une
// barre (un périmètre est une longueur, pas une surface), le carré codé, le
// rectangle coté, une figure tordue dont on suit le contour rouge, et deux
// morceaux recollés dont le trait du milieu DISPARAÎT.

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
 * Le quadrillage, contour en ROUGE. Ici le contour est le sujet — c'est le
 * périmètre lui-même, alors que sur la fiche des aires c'était le remplissage.
 */
const grille = (
  rows: number,
  cols: number,
  cells: Case[],
  opts: { cellSize?: number } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: opts.cellSize ?? (cols > 6 ? 24 : 32) },
      grid: { rows, cols, filledCells: cells },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />
);

/** Un quadrilatère coté, ses quatre angles droits codés. */
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

// Dans une carte, on EMPILE (REGLES.md § 2 ter) : côte à côte, chaque dessin
// tomberait à 80 px de large.
const empiler = (
  haut: React.ReactNode,
  hautLabel: string,
  bas: React.ReactNode,
  basLabel: string
) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-rose-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-emerald-700">{basLabel}</p>
    </div>
  </div>
);

// ⭐ LE TOUR DÉPLIÉ. Un périmètre est une LONGUEUR : mis bout à bout, les
// quatre côtés du rectangle 8 × 3 font une barre de 22 cm. Aucun autre dessin
// de la fiche ne dit ça — et c'est la confusion n°1 avec l'aire.
const tourDeplie = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Le titre est écrit en 15 px sur la largeur du viewBox : au-delà de
      // ~28 caractères il DÉBORDE du cadre, en silence. Vu au rendu, pas à la
      // lecture (REGLES.md § 2 ter).
      title: "Le tour du rectangle 8 × 3",
      total: "22 cm",
      parts: [
        { label: "L", value: "8" },
        { label: "l", value: "3" },
        { label: "L", value: "8" },
        { label: "l", value: "3" },
      ],
      questionLabel: "8 + 3 + 8 + 3 = 22 cm",
      // 175 px de haut collaient les étiquettes L / l à la phrase du bas :
      // le canvas pose les unes à 144 et l'autre à hauteur − 18.
      size: { width: 320, height: 190 },
    }}
  />
);

// Le mémo des trois calculs. Un tableau, pas trois dessins : ce qui change
// d'une ligne à l'autre est le CALCUL, pas la figure.
const memoCalculs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Figure", "Ce qu'on additionne", "Le calcul"],
      rows: [
        { values: ["Carré", "4 côtés égaux", "P = 4 × c"] },
        { values: ["Rectangle", "2 longueurs, 2 largeurs", "P = 2 × (L + l)"] },
        { values: ["Figure quelconque", "tous les côtés du contour", "on additionne"] },
      ],
      highlight: { col: 2 },
    }}
  />
);

// ⭐ DES FIGURES TORDUES (Frédéric, 21/08/2026) : sur un rectangle, l'élève
// applique une formule sans réfléchir. Le périmètre d'une figure biscornue, lui,
// se suit du doigt.
const escalier: Case[] = [
  [0, 0],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [3, 1], [3, 2], [3, 3],
];

// La figure en L de l'exemple 3 : bloc 2 × 4 en haut, bloc 2 × 2 en bas.
// Son tour fait 4 + 2 + 2 + 2 + 2 + 4 = 16 carreaux.
const figureL: Case[] = [...rectCells(2, 4, 0, 0), ...rectCells(2, 2, 2, 0)];

// Le zigzag : six carreaux, deux décrochements — le contour serpente.
const zigzag: Case[] = [
  [0, 0], [0, 1],
  [1, 1], [1, 2],
  [2, 2], [2, 3],
];

// LE RECOLLEMENT. Deux carrés de 3 séparés : 12 + 12 = 24 de tour. Recollés :
// 18 seulement — le trait du milieu n'est plus un bord.
const deuxCarresSepares: Case[] = [...rectCells(3, 3, 0, 0), ...rectCells(3, 3, 0, 4)];
const deuxCarresRecolles: Case[] = rectCells(3, 6);

const pieges = [
  "Confondre aire et périmètre : 5 × 4 = 20 donne l'aire du rectangle de 5 cm sur 4 cm, pas son périmètre. Le périmètre, c'est le tour : 2 × (5 + 4) = 18 cm.",
  "Oublier que chaque côté compte deux fois dans un rectangle : 6 + 2 = 8 cm n'est que la moitié du tour, le périmètre vaut 2 × (6 + 2) = 16 cm.",
  "Additionner les périmètres de deux morceaux recollés : le trait de recollement n'est plus un bord, il ne compte plus.",
  "Se tromper d'unité : un périmètre est une longueur, il s'écrit en cm ou en m, jamais en cm² (réservé aux aires).",
];

const aRetenir = [
  "Le périmètre d'une figure, c'est la longueur de son contour : tout son tour, en cm ou en m.",
  "Carré : P = 4 × c. Rectangle : P = 2 × (L + l).",
  "Pour une figure quelconque, on additionne les longueurs de tous les côtés du contour extérieur.",
];

export const fichePerimetres6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-perimetre",
  titre: "Les périmètres",
  accroche:
    "Le périmètre d'une figure, c'est la longueur de son tour. On en a besoin dès qu'on veut entourer quelque chose : un jardin, un cadre, un terrain. En 6e, on apprend à le calculer pour le carré, le rectangle et n'importe quelle figure, même tordue.",
  identite: [
    { label: "Prérequis", valeur: "Additionner, multiplier, unités de longueur (cm, m)" },
    { label: "Idée clé", valeur: "Le périmètre = la longueur du contour de la figure" },
    { label: "Outil", valeur: "La règle graduée (et le calcul mental)" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son contour, c'est-à-dire de tout son tour. C'est une longueur : on l'exprime avec une unité de longueur, comme le centimètre (cm) ou le mètre (m), jamais en cm².",
  },
  figure: {
    // Une figure TORDUE dès la définition : le contour rouge se suit du doigt,
    // et les traits gris du quadrillage montrent bien ce qui n'en fait pas
    // partie.
    schema: grille(4, 4, escalier),
    legende:
      "Le périmètre, c'est tout le contour (en rouge) : on suit le tour de la figure, jamais les traits de l'intérieur.",
  },
  proprietes: [
    {
      titre: "C'est une longueur",
      micros: ["aire_perimetre_comprendre"],
      texte:
        "Mis bout à bout, les côtés d'une figure font une seule longueur : le périmètre. Il se mesure en cm ou en m, jamais en cm².",
      schema: tourDeplie,
    },
    {
      titre: "Le carré",
      micros: ["aire_perimetre_carre"],
      texte:
        "Un carré a 4 côtés de la même longueur. Son périmètre vaut donc 4 fois la longueur d'un côté : P = 4 × c. Exemple : un carré de côté 5 cm a un périmètre de 4 × 5 = 20 cm.",
      schema: rectangleCote(150, 150, {
        AB: "5 cm",
        BC: "5 cm",
        CD: "5 cm",
        DA: "5 cm",
      }),
    },
    {
      titre: "Le rectangle",
      micros: ["aire_perimetre_rectangle"],
      texte:
        "Un rectangle a 2 longueurs et 2 largeurs. Son périmètre vaut P = 2 × (L + l). Exemple : pour 8 cm sur 3 cm, on calcule 2 × (8 + 3) = 2 × 11 = 22 cm.",
      schema: rectangleCote(192, 72, { AB: "L = 8 cm", BC: "l = 3 cm" }),
    },
    {
      titre: "Une figure quelconque",
      micros: ["aire_perimetre_figure"],
      texte:
        "Quand la figure n'a pas de formule, on additionne les longueurs de tous les côtés du contour. On ne compte que le contour extérieur, jamais les traits à l'intérieur de la figure.",
      schema: legende(grille(3, 4, zigzag), "on suit le rouge, jamais le gris"),
    },
    {
      titre: "Deux morceaux recollés",
      micros: ["aire_perimetre_figure"],
      texte:
        "En recollant deux figures, le périmètre n'est pas la somme des deux périmètres : le trait de recollement disparaît, il n'est plus un bord.",
      schema: empiler(
        grille(3, 7, deuxCarresSepares),
        "séparés : 12 + 12 = 24 de tour",
        grille(3, 6, deuxCarresRecolles),
        "recollés : 18 seulement"
      ),
    },
  ],
  reel: {
    texte:
      "Calculer un périmètre, c'est répondre à une vraie question : quelle longueur de grillage pour clôturer le jardin ? Quelle longueur de baguette pour encadrer un dessin ? Quelle longueur de ruban pour faire le tour d'un paquet cadeau ? Quelle distance pour faire le tour du terrain de sport ?",
  },
  historique: {
    texte:
      "Le mot « périmètre » vient du grec : « peri » (autour) et « metron » (mesure). Vers 3000 avant J.-C., les arpenteurs d'Égypte mesuraient déjà le tour des champs avec des cordes à nœuds : après chaque crue du Nil, il fallait retrouver les limites de chaque parcelle.",
  },
  formule: {
    contexte: "Carré de côté c, rectangle de longueur L et de largeur l",
    expression: "P(carré) = 4 × c ; P(rectangle) = 2 × (L + l)",
    legende: "Pour une figure quelconque : on additionne tous les côtés du contour.",
    schema: memoCalculs,
  },
  methode: [
    {
      titre: "Repérer",
      micros: ["aire_perimetre_comprendre"],
      texte:
        "On suit le contour de la figure avec le doigt et on repère la longueur de chaque côté. On ne garde que le tour extérieur.",
      schema: legende(grille(4, 4, escalier), "un tour complet, décrochement par décrochement"),
    },
    {
      titre: "Écrire",
      micros: ["aire_perimetre_carre", "aire_perimetre_rectangle"],
      texte:
        "On choisit le bon calcul : 4 × c pour un carré, 2 × (L + l) pour un rectangle, la somme de tous les côtés sinon.",
      schema: rectangleCote(192, 72, { AB: "L = 8 cm", BC: "l = 3 cm" }),
    },
    {
      titre: "Calculer",
      micros: ["aire_perimetre_probleme"],
      texte:
        "On effectue le calcul, puis on écrit la réponse avec son unité de longueur : cm, m... jamais cm².",
      // La MÊME addition que la propriété 1, mais posée : là c'était une
      // longueur qu'on voyait, ici c'est un calcul qu'on effectue.
      schema: (
        <CanvasRenderer
          figure={{
            kind: "calcul_pose",
            operation: "addition",
            title: "Le tour du rectangle 8 cm × 3 cm",
            numbers: ["8", "3", "8", "3"],
            result: "22",
            display: { showResult: true, compact: false },
            questionLabel: "22 : c'est le périmètre, en cm.",
          }}
        />
      ),
    },
  ],
  usages: [
    {
      titre: "Le carré",
      micros: ["aire_perimetre_carre"],
      detail:
        "Les 4 côtés sont égaux : périmètre = 4 × côté. Un carré de côté 7 cm a un périmètre de 4 × 7 = 28 cm.",
      schema: rectangleCote(140, 140, {
        AB: "7 cm",
        BC: "7 cm",
        CD: "7 cm",
        DA: "7 cm",
      }),
    },
    {
      titre: "Le rectangle",
      micros: ["aire_perimetre_rectangle"],
      detail:
        "2 longueurs et 2 largeurs : périmètre = 2 × (L + l). Un rectangle de 6 cm sur 4 cm a un périmètre de 2 × (6 + 4) = 20 cm.",
      schema: rectangleCote(186, 124, { AB: "6 cm", BC: "4 cm" }),
    },
    {
      titre: "La figure quelconque",
      micros: ["aire_perimetre_figure"],
      detail:
        "Pas de formule : on additionne tous les côtés du contour. Sur un quadrillage, on compte les traits rouges un à un.",
      schema: grille(4, 4, figureL),
    },
  ],
  exemples: [
    {
      titre: "Le périmètre d'un carré",
      micros: ["aire_perimetre_carre"],
      donnees: "Un carré a un côté de 9 cm.",
      question: "Calculer son périmètre.",
      schema: rectangleCote(150, 150, {
        AB: "9 cm",
        BC: "9 cm",
        CD: "9 cm",
        DA: "9 cm",
      }),
      solution:
        "Un carré a 4 côtés égaux. P = 4 × 9 = 36 cm. Attention : 9 × 9 = 81 donnerait l'aire, pas le périmètre.",
    },
    {
      titre: "Le périmètre d'un rectangle",
      micros: ["aire_perimetre_rectangle"],
      donnees: "Un rectangle mesure 8 cm de longueur et 3 cm de largeur.",
      question: "Calculer son périmètre.",
      schema: rectangleCote(192, 72, { AB: "8 cm", BC: "3 cm" }),
      solution:
        "Un rectangle a 2 longueurs et 2 largeurs. P = 2 × (8 + 3) = 2 × 11 = 22 cm. Attention : 8 × 3 = 24 donnerait l'aire.",
    },
    {
      titre: "Une figure tordue sur quadrillage",
      micros: ["aire_perimetre_figure"],
      donnees: "Une figure en L sur un quadrillage dont les carreaux mesurent 1 cm de côté.",
      question: "Calculer son périmètre.",
      schema: grille(4, 4, figureL),
      solution:
        "Aucune formule ne s'applique : on suit le contour rouge et on compte les traits. En partant du coin en haut à gauche : 4 vers la droite, 2 vers le bas, 2 vers la gauche, 2 vers le bas, 2 vers la gauche, 4 vers le haut. P = 4 + 2 + 2 + 2 + 2 + 4 = 16 cm.",
    },
    {
      titre: "Deux carrés recollés",
      micros: ["aire_perimetre_figure"],
      donnees: "On colle deux carrés de 3 cm de côté par un côté entier.",
      question: "Quel est le périmètre de la figure obtenue ?",
      schema: empiler(
        grille(3, 7, deuxCarresSepares),
        "séparés : 12 cm + 12 cm",
        grille(3, 6, deuxCarresRecolles),
        "recollés : un rectangle 6 cm × 3 cm"
      ),
      solution:
        "On obtient un rectangle de 6 cm sur 3 cm : P = 2 × (6 + 3) = 18 cm. Ce n'est PAS 12 + 12 = 24 cm : le côté de recollement, compté deux fois, n'est plus un bord — on perd 3 + 3 = 6 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un carré a un côté de 6 cm. Calcule son périmètre.",
      correction:
        "Étape 1 : un carré a 4 côtés égaux. Étape 2 : P = 4 × 6. Étape 3 : P = 24 cm. On vérifie l'unité : le cm, une unité de longueur.",
    },
    {
      question: "Un rectangle mesure 8 cm de long et 3 cm de large. Calcule son périmètre.",
      correction:
        "Étape 1 : un rectangle a 2 longueurs et 2 largeurs. Étape 2 : P = 2 × (8 + 3) = 2 × 11. Étape 3 : P = 22 cm. Attention : 8 × 3 = 24 donnerait l'aire, pas le périmètre.",
    },
    {
      question:
        "Sur un quadrillage à carreaux de 1 cm, une figure en escalier occupe un carré de 4 carreaux sur 4. Quel est son périmètre ?",
      correction:
        "On suit le contour marche par marche. Chaque marche donne un pas vers la droite puis un pas vers le bas : au total, les pas horizontaux valent 4 cm et les pas verticaux 4 cm. Avec le grand côté du bas (4 cm) et le grand côté de gauche (4 cm), P = 4 + 4 + 4 + 4 = 16 cm.",
    },
    {
      question:
        "Problème : un jardin rectangulaire mesure 8 m de long et 3 m de large. Quelle longueur de grillage faut-il pour faire tout le tour ?",
      correction:
        "Étape 1 : le grillage suit tout le tour du jardin, on cherche donc le périmètre. Étape 2 : P = 2 × (8 + 3) = 2 × 11 = 22 m. Étape 3 : il faut 22 m de grillage.",
      micros: ["aire_perimetre_probleme"],
    },
    {
      question:
        "Défi : on recolle deux carrés de 5 cm de côté par un côté entier. Le périmètre de la figure obtenue vaut-il 40 cm ?",
      correction:
        "Non. On obtient un rectangle de 10 cm sur 5 cm : P = 2 × (10 + 5) = 30 cm. Les deux périmètres séparés font bien 20 + 20 = 40 cm, mais le côté de recollement (5 cm) était compté deux fois et n'est plus un bord : 40 − 5 − 5 = 30 cm.",
    },
    {
      question: "Défi : un carré a un périmètre de 28 cm. Combien mesure un côté ?",
      correction:
        "Étape 1 : le périmètre d'un carré vaut 4 × côté. Étape 2 : on fait le calcul à l'envers : côté = 28 ÷ 4. Étape 3 : un côté mesure 7 cm. Vérification : 4 × 7 = 28 cm.",
      micros: ["aire_perimetre_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ LE DIAPORAMA NE S'ÉCRIT PLUS À LA MAIN (20/08/2026). `FicheCoursClient`
// fabrique lui-même les slides depuis la fiche — une par propriété, par réflexe,
// par usage, par exemple, par exercice, chacune avec SON dessin. On l'engendre
// donc de la même source : il ne reste qu'un interrupteur (un tableau vide
// éteindrait le mode classe).
export const slidesPerimetres6e: ClasseSlide[] = slidesDepuisFiche(fichePerimetres6e);
