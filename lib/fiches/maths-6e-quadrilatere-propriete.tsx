// ─── Fiche de cours : propriétés des quadrilatères (6e) ───────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/quadrilateres.bank.ts, notionId quadrilatere_propriete — lecture seule).
//
// ⚠️ ÉCRITE MALGRÉ L'AVERTISSEMENT DE FIN AOÛT (en-tête de
// `maths-6e-cercle-disque.tsx` : « on n'écrit pas quadrilatere_propriete avant
// réparation de sa banque »). Frédéric demande désormais toutes les fiches de
// 6e (30/09). Mesuré à l'écriture : `quadrilatere_propriete_defi` compte 4
// énoncés figés et 1 générateur qui RE-TIRE trois de ces 4 énoncés (plus un de
// `quadrilatere_defi`) — soit 5 questions distinctes. La banque reste pauvre ;
// la fiche ne la répare pas.
//
// Micro-compétences 5/5 → blocs :
//   quadrilatere_lire_propriete       → définition + figure, propriété 1 (le
//                                       codage), méthode 1, exercices 1 et 6
//   quadrilatere_lien_propriete       → propriétés 2 à 5, méthode 2,
//                                       exemple 1 (le terrain), exercice 2
//   quadrilatere_conclusion           → méthode 3 (ne pas conclure à l'œil),
//                                       exemple 1, exercice 3
//   quadrilatere_completer_construire → usages 1 à 3, exercice 4
//   quadrilatere_propriete_defi       → propriété 5 (les familles), exemples 2
//                                       et 3, exercice 5
//
// ⭐ Pas de répétition avec la fiche voisine `maths-6e-quadrilateres.tsx`
// (vocabulaire, « 4 côtés égaux sans angle droit, est-ce un carré ? ») : ici
// on RAISONNE à partir des propriétés.
//
// ⛔ LE PIÈGE DU CANVAS `quadrilatere` QUI A DÉCIDÉ DES DESSINS : son codage des
// côtés égaux met `idx + 1` traits sur la paire numéro `idx`. Coder un losange
// comme le fait la banque (`[AB,BC], [BC,CD], [CD,DA]`) donne donc 1, 3, 5 et
// 3 traits sur les quatre côtés — un codage FAUX, qui dit « côtés différents ».
// On ne peut coder d'un même trait que DEUX côtés. D'où :
//   • rectangle : `[AB,CD]` (1 trait) et `[BC,DA]` (2 traits) — juste ;
//   • losange et carré : les LONGUEURS écrites sur les 4 côtés (« 4 cm »).
// Les parallèles (`parallelSides`) et les angles droits, eux, sont justes.
// Toutes les figures sont exactes : rectangles à angles droits réels, losange
// de côté 120 (vecteur AD = (−48 ; 110)), terrain de basket à l'échelle 28 × 15.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import type { QuadrilatereCanvasData } from "@/lib/tutor-v4/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { legende } from "@/lib/fiches/schemas-angles-6e";

type Sommets = QuadrilatereCanvasData["points"];

/** Un quadrilatère du coach : sommets, codage, et rien d'autre. */
const quad = (
  size: { width: number; height: number },
  points: Sommets,
  marks: QuadrilatereCanvasData["marks"] = {},
  sideLabels?: QuadrilatereCanvasData["sideLabels"],
  diagonales = false
) => (
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size,
      points,
      marks,
      sideLabels,
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false, showDiagonals: diagonales },
    }}
  />
);

const TOUS = ["A", "B", "C", "D"] as ("A" | "B" | "C" | "D")[];

// Les formes, une fois pour toutes.
const RECTANGLE_LARGE: Sommets = { A: { x: 40, y: 40 }, B: { x: 220, y: 40 }, C: { x: 220, y: 140 }, D: { x: 40, y: 140 } };
const PARALLELOGRAMME: Sommets = { A: { x: 70, y: 40 }, B: { x: 230, y: 40 }, C: { x: 190, y: 145 }, D: { x: 30, y: 145 } };
const RECTANGLE_HAUT: Sommets = { A: { x: 55, y: 30 }, B: { x: 165, y: 30 }, C: { x: 165, y: 170 }, D: { x: 55, y: 170 } };
const LOSANGE: Sommets = { A: { x: 100, y: 40 }, B: { x: 220, y: 40 }, C: { x: 172, y: 150 }, D: { x: 52, y: 150 } };
const CARRE: Sommets = { A: { x: 50, y: 35 }, B: { x: 180, y: 35 }, C: { x: 180, y: 165 }, D: { x: 50, y: 165 } };
const PRESQUE_CARRE: Sommets = { A: { x: 55, y: 35 }, B: { x: 190, y: 35 }, C: { x: 190, y: 160 }, D: { x: 55, y: 160 } };
// Un parallélogramme où SEULE une paire de côtés est codée (figure de la banque).
const UNE_PAIRE: Sommets = { A: { x: 35, y: 80 }, B: { x: 175, y: 60 }, C: { x: 215, y: 180 }, D: { x: 75, y: 200 } };
const TERRAIN: Sommets = { A: { x: 32, y: 40 }, B: { x: 228, y: 40 }, C: { x: 228, y: 145 }, D: { x: 32, y: 145 } };
const QUELCONQUE: Sommets = { A: { x: 55, y: 40 }, B: { x: 200, y: 55 }, C: { x: 225, y: 160 }, D: { x: 35, y: 140 } };

const QUATRE_CM = { AB: "4 cm", BC: "4 cm", CD: "4 cm", DA: "4 cm" };

// ─── LA FIGURE : un rectangle entièrement codé ────────────────────────────────
const rectangleCode = quad({ width: 260, height: 180 }, RECTANGLE_LARGE, {
  rightAnglesAt: TOUS,
  equalSides: [
    ["AB", "CD"],
    ["BC", "DA"],
  ],
});

// ─── LE CODAGE, EN DEUX COLONNES ──────────────────────────────────────────────
const tableauCodage = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["sur la figure", "ça veut dire"],
      rows: [
        { values: ["un petit carré", "un angle droit"] },
        { values: ["le même trait", "la même longueur"] },
        { values: ["le même chevron", "des côtés parallèles"] },
      ],
      display: { compact: true, striped: true },
    }}
  />
);

const parallelogramme = quad({ width: 260, height: 180 }, PARALLELOGRAMME, {
  parallelSides: [
    ["AB", "CD"],
    ["BC", "DA"],
  ],
});

const rectangleAngles = quad({ width: 220, height: 200 }, RECTANGLE_HAUT, { rightAnglesAt: TOUS });

const losange = quad({ width: 260, height: 180 }, LOSANGE, {}, QUATRE_CM);

// ─── LES FAMILLES : le carré est dans les deux ────────────────────────────────
// ⭐ SVG local : aucun canvas ne dessine des ensembles. Deux ovales qui se
// chevauchent — les rectangles, les losanges — et, dans la partie commune, le
// carré. C'est la réponse dessinée à « un carré est-il un rectangle ? ».
const familles = (
  <div className="mx-auto w-full rounded-xl border border-slate-200 bg-white p-2 shadow-sm" style={{ maxWidth: 260 }}>
    <svg viewBox="0 0 250 175" className="block h-auto w-full" role="img" aria-label="Le carré est un rectangle et un losange">
      <ellipse cx="95" cy="100" rx="84" ry="62" fill="#dbeafe" fillOpacity="0.7" stroke="#2563eb" strokeWidth="3" />
      <ellipse cx="155" cy="100" rx="84" ry="62" fill="#dcfce7" fillOpacity="0.6" stroke="#16a34a" strokeWidth="3" />
      {/* Un rectangle dans sa famille */}
      <rect x="26" y="90" width="36" height="20" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      {/* Un losange dans la sienne : côté 22 partout (le côté penché vaut (−9 ; 20), soit 21,9) */}
      <polygon points="200,88 222,88 213,108 191,108" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      {/* Le carré, dans les deux */}
      <rect x="113" y="104" width="24" height="24" fill="white" stroke="#0f172a" strokeWidth="2.5" />
      <text x="70" y="22" textAnchor="middle" fontSize="16" fontWeight="900" fill="#2563eb" stroke="white" strokeWidth="3" paintOrder="stroke">rectangles</text>
      <text x="185" y="22" textAnchor="middle" fontSize="16" fontWeight="900" fill="#16a34a" stroke="white" strokeWidth="3" paintOrder="stroke">losanges</text>
      <text x="125" y="92" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="3" paintOrder="stroke">carrés</text>
    </svg>
  </div>
);

const unePaire = quad({ width: 260, height: 230 }, UNE_PAIRE, { equalSides: [["AB", "CD"]] });

// ─── CE QU'ON PEUT CONCLURE : le tableau des figures ──────────────────────────
const tableauConclure = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["je lis", "je conclus"],
      rows: [
        { values: ["2 paires de côtés parallèles", "parallélogramme"] },
        { values: ["4 angles droits", "rectangle"] },
        { values: ["4 côtés égaux", "losange"] },
        { values: ["4 angles droits et 4 côtés égaux", "carré"] },
      ],
      highlight: { col: 1 },
      display: { compact: true, striped: true },
    }}
  />
);

const presqueCarre = quad({ width: 240, height: 190 }, PRESQUE_CARRE, { rightAnglesAt: TOUS });

// ─── COMPLÉTER : ce qu'il faut ajouter ────────────────────────────────────────
const rectangleVersCarre = quad({ width: 230, height: 200 }, CARRE, {
  rightAnglesAt: TOUS,
  equalSides: [["AB", "BC"]],
});

const losangeVersCarre = quad({ width: 230, height: 200 }, CARRE, { rightAnglesAt: ["A"] }, QUATRE_CM);

// ─── CONSTRUIRE : quatre sommets, dans l'ordre, sur un quadrillage ────────────
const NOIR = "#0f172a";
const construction = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 240, height: 180 },
      grid: { rows: 6, cols: 8 },
      lines: [
        { id: "AB", type: "segment", from: { x: 45, y: 45 }, to: { x: 195, y: 45 }, color: NOIR, strokeWidth: 3 },
        { id: "BC", type: "segment", from: { x: 195, y: 45 }, to: { x: 195, y: 135 }, color: NOIR, strokeWidth: 3 },
        { id: "CD", type: "segment", from: { x: 195, y: 135 }, to: { x: 45, y: 135 }, color: NOIR, strokeWidth: 3 },
        { id: "DA", type: "segment", from: { x: 45, y: 135 }, to: { x: 45, y: 45 }, color: NOIR, strokeWidth: 3 },
      ],
      points: [
        { x: 45, y: 45, label: "A", color: "#2563eb" },
        { x: 195, y: 45, label: "B", color: "#2563eb" },
        { x: 195, y: 135, label: "C", color: "#2563eb" },
        { x: 45, y: 135, label: "D", color: "#2563eb" },
      ],
      display: { showGrid: true, showLabels: true, showPoints: true },
    }}
  />
);

const terrain = quad({ width: 260, height: 170 }, TERRAIN, { rightAnglesAt: TOUS }, { AB: "28 m", BC: "15 m" });
const carreComplet = quad({ width: 230, height: 200 }, CARRE, { rightAnglesAt: TOUS }, QUATRE_CM);
const diagonales = quad({ width: 260, height: 190 }, QUELCONQUE, {}, undefined, true);

const pieges = [
  "Juger à l'œil. Une figure qui a l'air d'un carré n'en est un que si c'est codé.",
  "Croire qu'un carré n'est pas un rectangle. Il l'est : il a 4 angles droits.",
  "Dire « carré » avec seulement 4 côtés égaux. Il manque les angles droits : c'est un losange.",
];

const aRetenir = [
  "4 angles droits : rectangle. 4 côtés égaux : losange. Les deux : carré.",
  "2 paires de côtés parallèles : parallélogramme.",
  "On conclut avec ce qui est codé, jamais à l'œil.",
];

export const ficheQuadrilaterePropriete6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "quadrilatere-propriete",
  titre: "Les propriétés des quadrilatères",
  accroche:
    "Une figure codée raconte ses propriétés : angles droits, côtés égaux, côtés parallèles. On les lit, et on trouve son nom.",
  identite: [
    { label: "Lire", valeur: "Petit carré, traits, chevrons : le codage parle" },
    { label: "Conclure", valeur: "Avec ce qui est codé, jamais à l'œil" },
    { label: "Le secret", valeur: "Un carré est un rectangle ET un losange" },
  ],
  definition: {
    texte:
      "Une propriété, c'est ce qu'on sait sur une figure : ses angles droits, ses côtés égaux, ses côtés parallèles. La nature, c'est son nom : rectangle, losange, carré. On trouve la nature grâce aux propriétés, jamais à l'œil.",
  },
  figure: {
    schema: legende(rectangleCode, "4 petits carrés : 4 angles droits"),
    legende: "Ce rectangle a 4 angles droits et ses côtés opposés de même longueur.",
  },
  proprietes: [
    {
      titre: "Lire le codage",
      micros: ["quadrilatere_lire_propriete"],
      texte: "Chaque marque sur la figure a un sens. On la lit comme un message.",
      schema: tableauCodage,
    },
    {
      titre: "Deux paires de côtés parallèles",
      micros: ["quadrilatere_lien_propriete"],
      texte: "Les côtés opposés sont parallèles deux à deux. C'est un parallélogramme.",
      schema: parallelogramme,
    },
    {
      titre: "Quatre angles droits",
      micros: ["quadrilatere_lien_propriete"],
      texte: "Un quadrilatère qui a 4 angles droits est un rectangle.",
      schema: rectangleAngles,
    },
    {
      titre: "Quatre côtés égaux",
      micros: ["quadrilatere_lien_propriete"],
      texte: "Un quadrilatère qui a 4 côtés égaux est un losange.",
      schema: losange,
    },
    {
      titre: "Les deux à la fois : le carré",
      micros: ["quadrilatere_lien_propriete", "quadrilatere_propriete_defi"],
      texte: "4 angles droits et 4 côtés égaux : c'est un carré. Le carré est donc un rectangle ET un losange.",
      schema: familles,
    },
  ],
  reel: {
    texte:
      "Pour tracer un terrain de sport, on ne se fie pas à ses yeux. On vérifie les angles droits à l'équerre. Un carreau, une case de jeu de dames, un écran : tu peux lire leurs propriétés. Et une table carrée est aussi une table rectangulaire !",
  },
  historique: {
    texte:
      "Il y a 2 300 ans, le Grec Euclide a donné un nom à chaque quadrilatère. Pour lui, un carré n'était PAS un rectangle ! Aujourd'hui, on range le carré dans les deux familles. C'est plus simple : ce qui est vrai pour tous les rectangles est vrai pour le carré.",
  },
  methode: [
    {
      titre: "Lister ce qui est codé",
      micros: ["quadrilatere_lire_propriete"],
      texte: "On écrit tout ce que le codage dit. Ici : deux côtés de même longueur, et c'est tout.",
      schema: unePaire,
    },
    {
      titre: "Chercher la propriété qui suffit",
      micros: ["quadrilatere_lien_propriete"],
      texte: "On compare avec le tableau des figures. Une seule propriété peut suffire : 4 angles droits donnent un rectangle.",
      schema: tableauConclure,
    },
    {
      titre: "Ne pas conclure trop vite",
      micros: ["quadrilatere_conclusion"],
      texte: "Cette figure a l'air d'un carré. Mais seuls ses 4 angles droits sont codés : c'est un rectangle, sans plus.",
      schema: presqueCarre,
    },
  ],
  usages: [
    {
      titre: "D'un rectangle à un carré",
      micros: ["quadrilatere_completer_construire"],
      detail: "Le rectangle a déjà 4 angles droits. Si deux côtés qui se suivent sont égaux, c'est un carré.",
      schema: rectangleVersCarre,
    },
    {
      titre: "D'un losange à un carré",
      micros: ["quadrilatere_completer_construire"],
      detail: "Le losange a déjà 4 côtés égaux. On ajoute un angle droit : c'est un carré.",
      schema: losangeVersCarre,
    },
    {
      titre: "Construire sur un quadrillage",
      micros: ["quadrilatere_completer_construire"],
      detail: "On place les 4 sommets dans l'ordre : A, B, C, D. On les relie, puis on revient à A.",
      schema: construction,
    },
  ],
  exemples: [
    {
      titre: "Le terrain de basket",
      micros: ["quadrilatere_lien_propriete", "quadrilatere_conclusion"],
      donnees: "Un terrain de basket a 4 angles droits. Il mesure 28 m sur 15 m.",
      question: "Quelle est sa nature ? Est-ce un carré ?",
      schema: terrain,
      solution:
        "Il a 4 angles droits : c'est un rectangle. Ses côtés ne sont pas tous égaux : 28 m et 15 m. Ce n'est donc pas un carré.",
    },
    {
      titre: "Un carré est-il un rectangle ?",
      micros: ["quadrilatere_propriete_defi"],
      donnees: "Tom dit : « Un carré, ce n'est pas un rectangle ! »",
      question: "A-t-il raison ?",
      schema: carreComplet,
      solution:
        "Non. Le carré a 4 angles droits : c'est donc un rectangle. Il a aussi 4 côtés égaux : c'est aussi un losange. Le carré est un rectangle particulier.",
    },
    {
      titre: "Deux diagonales, et alors ?",
      micros: ["quadrilatere_propriete_defi"],
      donnees: "On sait seulement qu'un quadrilatère a deux diagonales.",
      question: "Peut-on trouver sa nature ?",
      schema: diagonales,
      solution:
        "Non. Tous les quadrilatères ont deux diagonales. Cette information ne dit rien. Il faut des angles droits, des côtés égaux ou des côtés parallèles.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Combien de paires de côtés parallèles un rectangle possède-t-il ?",
      correction: "2 paires : ses côtés opposés sont parallèles.",
      micros: ["quadrilatere_lire_propriete"],
    },
    {
      question: "Un quadrilatère a 4 angles droits, mais ses côtés ne sont pas tous égaux. Quelle est sa nature ?",
      correction: "C'est un rectangle. Ce n'est pas un carré.",
      micros: ["quadrilatere_lien_propriete"],
    },
    {
      question: "Un quadrilatère a deux paires de côtés parallèles. Est-ce forcément un rectangle ?",
      correction: "Non. C'est un parallélogramme. Pour dire rectangle, il faudrait aussi un angle droit.",
      micros: ["quadrilatere_conclusion"],
    },
    {
      question: "Que faut-il ajouter à un rectangle pour être sûr que c'est un carré ?",
      correction: "Deux côtés qui se suivent de même longueur. Alors ses 4 côtés sont égaux.",
      micros: ["quadrilatere_completer_construire"],
    },
    {
      question: "Un carré est-il aussi un losange ?",
      correction: "Oui : il a 4 côtés égaux.",
      micros: ["quadrilatere_propriete_defi"],
    },
    {
      question: "Dans un carré, que peut-on dire des deux diagonales ?",
      correction: "Elles ont la même longueur et elles sont perpendiculaires.",
      micros: ["quadrilatere_lire_propriete"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "Le codage parle : apprends à le lire !",
    definition: "On trouve le nom avec les propriétés, pas à l'œil !",
    methode: "Liste d'abord TOUT ce qui est codé !",
    pieges: "Il a l'air carré ? Vérifie le codage !",
    retenir: "Le carré est un rectangle ET un losange !",
    exercice: "Cherche la propriété qui suffit !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
export const slidesQuadrilaterePropriete6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Propriétés des quadrilatères - 6e",
    teinte: "objectif",
    schema: rectangleCode,
    section: {
      type: "objectif",
      phrase: "Lire les propriétés, puis trouver le nom",
      sousPhrase: "Angles droits, côtés égaux, côtés parallèles : le codage parle.",
    },
  },
  {
    titre: "Ce que l'on conclut",
    badge: "Le tableau",
    teinte: "propriete",
    schema: familles,
    section: {
      type: "cartes",
      cartes: [
        { titre: "4 angles droits", texte: "C'est un rectangle." },
        { titre: "4 côtés égaux", texte: "C'est un losange." },
        { titre: "Les deux", texte: "C'est un carré : rectangle ET losange." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: terrain,
    section: {
      type: "exercice",
      enonce: "Un terrain a 4 angles droits. Il mesure 28 m sur 15 m.",
      question: "Rectangle ? Carré ?",
      correction: "Rectangle : 4 angles droits. Pas carré : 28 m et 15 m.",
    },
  },
];
