// ─── Fiche de cours : la proportionnalité (6e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/proportionnalite.bank.ts
// (notionId prop_proportionnalite).
// Refaite au standard « montrer, pas raconter » (retour Frédéric 13/07) : la
// proportionnalité MONTRÉE dans le tableau du coach (coefficient, cellule « ? »,
// passage par l'unité) plutôt que racontée. Propriétés = une ligne chacune.
//
// Micro-compétences couvertes :
// - prop_reconnaitre → propriété « Reconnaître », exemple « Reconnaître » (table ×2),
//                      piège 1, entraînement 1
// - prop_coeff       → definition, figure (table cahiers, coefficient), propriété
//                      « Le coefficient », formule
// - prop_direct      → exemple « Compléter » (4e proportionnelle), entraînement 2
// - prop_table       → exemple « Compléter » (tableau), usages 3, entraînement 3
// - prop_unite       → propriété « Passer par l'unité », methode, exemple « Recette »,
//                      usages 2, entraînement 3
// - prop_defi        → entraînement 4 (vitesse) + slide « exercice flash »

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le tableau de proportionnalité du coach (le même que dans les exercices) :
// l'élève VOIT les deux lignes et le « ? » à trouver.
function tableauProp(
  rowLabels: string[],
  values: string[][],
  highlight?: { row: number; col: number }[]
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_proportionnalite",
        rows: values.length,
        cols: values[0].length,
        rowLabels,
        values,
        missing: [],
        highlightedCells: highlight,
        display: { showRowLabels: true, showColLabels: false, showGrid: true },
      }}
    />
  );
}

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ LE TABLEAU DE PROPORTIONNALITÉ SERVAIT DÉJÀ CINQ FOIS (figure, formule, les
// trois exemples). Six de plus et la fiche entière n'aurait été qu'un seul
// dessin répété onze fois (REGLES.md § 2 bis). Il ne revient donc que deux fois,
// pour deux lectures différentes — le coefficient entre les LIGNES, puis la
// COLONNE du 1 — et les quatre autres blocs montrent ce qu'un tableau ne montre
// pas : l'alignement des points, un tout découpé en parts égales, et deux
// grandeurs simplement nommées.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// LE COEFFICIENT VIT ENTRE LES DEUX LIGNES. La case allumée est celle qu'on
// obtient en multipliant celle du dessus — c'est le geste, pas le résultat.
const leCoefficient = legende(
  tableauProp(
    ["objets", "prix (€)"],
    [
      ["1", "2", "3", "5"],
      ["2", "4", "6", "10"],
    ],
    [{ row: 1, col: 3 }]
  ),
  "d'une ligne à l'autre, toujours × 2"
);

// ⭐ RECONNAÎTRE, C'EST DISPOSER D'UN CONTRE-EXEMPLE. Une seule situation
// proportionnelle ne prouve rien : ce qui apprend à reconnaître, c'est de voir
// À CÔTÉ une situation qui n'en est pas. La seconde ligne ajoute 3 à chaque fois
// — régulier, mais pas proportionnel. C'est le piège n° 1 de la fiche, dessiné.
//
// ⛔ CE BLOC A D'ABORD PORTÉ UN GRAPHIQUE (des points alignés passant par
// l'origine), et c'était la meilleure image — mais `fonctionGraphique` ne tient
// pas dans une carte de propriété : son repère est calculé sur un viewBox de
// 320, ses graduations tombaient à 9,5 px dans 228, et les rogner sort les axes
// du cadre. Mesuré, essayé, abandonné : le graphique demande un bloc large.
const proportionnelOuPas = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Proportionnel ou pas ?",
      headers: ["1", "2", "3", "La règle"],
      rows: [
        { label: "prix A", values: ["2", "4", "6", "× 2"] },
        { label: "prix B", values: ["2", "5", "8", "+ 3"] },
      ],
      highlight: { row: 0 },
    }}
  />,
  "A double quand la quantité double · B, non"
);

// REVENIR À L'UNITÉ, C'EST DÉCOUPER. Le tout vaut 15 €, il y a 5 objets : la
// barre montre les cinq parts ÉGALES, donc la division. Le tableau, lui, ne
// montre jamais un partage — il montre des nombres déjà calculés.
const leToutEnCinqParts = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "15 € pour 5 objets",
      total: "15 €",
      parts: [
        { label: "1", value: "3" },
        { label: "1", value: "3" },
        { label: "1", value: "3" },
        { label: "1", value: "3" },
        { label: "1", value: "3" },
      ],
      questionLabel: "15 ÷ 5 = 3 € l'objet",
      // ⚠️ Largeur sous 245, hauteur à 190 (§ 2 quater).
      size: { width: 240, height: 190 },
    }}
  />
);

// LIRE, C'EST NOMMER LES DEUX GRANDEURS — et rien de plus. Aucun calcul, aucun
// coefficient : le seul dessin de la fiche où il n'y a rien à trouver.
const lesDeuxGrandeurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Deux grandeurs, à chaque fois",
      headers: ["La première", "La seconde"],
      rows: [
        { values: ["des objets", "un prix"] },
        { values: ["des personnes", "une masse"] },
        { values: ["un temps", "une distance"] },
      ],
      highlight: { row: 0 },
    }}
  />
);

// LA COLONNE DU 1, ALLUMÉE. C'est le même tableau que la propriété, lu tout
// autrement : là on regardait les deux lignes, ici on regarde UNE colonne, et
// la case à trouver est laissée vide.
const laColonneDeLUnite = legende(
  tableauProp(
    ["objets", "prix (€)"],
    [
      ["1", "4", "7"],
      ["", "12", "21"],
    ],
    [{ row: 1, col: 0 }]
  ),
  "on cherche d'abord le prix de 1 : 12 ÷ 4 = 3"
);

// MULTIPLIER, C'EST RECOLLER LES PARTS. La propriété découpait 15 € en cinq
// parts de 3 ; ici on part de la part et on en met sept bout à bout. Même
// dessin, geste inverse — et c'est exactement la méthode en deux temps.
const septPartsRecollees = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "7 objets à 3 €",
      total: "21 €",
      parts: [
        { label: "3", value: "3" },
        { label: "3", value: "3" },
        { label: "3", value: "3" },
        { label: "3", value: "3" },
        { label: "3", value: "3" },
        { label: "3", value: "3" },
        { label: "3", value: "3" },
      ],
      questionLabel: "7 × 3 = 21 €",
      size: { width: 240, height: 190 },
    }}
  />
);

const pieges = [
  "Croire qu'ajouter le même nombre suffit : c'est multiplier, pas additionner.",
  "Oublier de revenir à l'unité avant de multiplier.",
  "Mélanger les deux lignes du tableau (quantité et prix).",
];

const aRetenir = [
  "Proportionnel = on multiplie toujours par le même nombre (le coefficient).",
  "Le passage par l'unité est la méthode la plus simple en 6e.",
  "Une addition identique ne prouve pas une proportionnalité.",
];

export const ficheProportionnalite6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Une situation est proportionnelle quand on passe d'une grandeur à l'autre en multipliant toujours par le même nombre : le coefficient.",
  identite: [
    { label: "Mots clés", valeur: "Coefficient, tableau, unité" },
    { label: "Le secret", valeur: "Toujours × le même nombre" },
    { label: "Méthode reine", valeur: "Le passage par l'unité" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on passe des valeurs de l'une à celles de l'autre en multipliant toujours par le même nombre. Ce nombre s'appelle le coefficient de proportionnalité.",
  },
  figure: {
    schema: tableauProp(
      ["Cahiers", "Prix (€)"],
      [
        ["1", "3", "5"],
        ["2", "6", "10"],
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 0 },
      ]
    ),
    legende: "D'une ligne à l'autre, on multiplie toujours par 2 : le coefficient.",
  },
  proprietes: [
    {
      titre: "Le coefficient",
      micros: ["prop_coeff"],
      texte: "On passe d'une ligne à l'autre en multipliant par le même nombre (ici × 2).",
      schema: leCoefficient,
    },
    {
      titre: "Reconnaître",
      micros: ["prop_reconnaitre"],
      texte: "Si une grandeur double, l'autre double ; si elle triple, l'autre triple.",
      schema: proportionnelOuPas,
    },
    {
      titre: "Passer par l'unité",
      micros: ["prop_unite"],
      texte: "On cherche la valeur pour 1, puis on multiplie par la quantité voulue.",
      schema: leToutEnCinqParts,
    },
  ],
  reel: {
    texte:
      "La proportionnalité est partout : recettes, échelles de cartes, prix au kilo, vitesse, mélanges (sirop, peinture), conversions.",
  },
  historique: {
    texte:
      "On utilise les proportions depuis l'Antiquité : Égyptiens et Grecs s'en servaient pour construire et commercer. La fameuse « règle de trois » est enseignée depuis des siècles.",
  },
  formule: {
    contexte: "Tableau de proportionnalité",
    expression: "valeur d'arrivée = coefficient × valeur de départ",
    legende: "1 cahier = 2 € (coefficient 2), donc 3 cahiers = 6 € et 5 cahiers = 10 €.",
    schema: tableauProp(
      ["Cahiers", "Prix (€)"],
      [
        ["3", "5"],
        ["6", "10"],
      ]
    ),
  },
  methode: [
    { titre: "Je lis", texte: "Les deux grandeurs : objets et prix, personnes et masse, temps et distance…" , schema: lesDeuxGrandeurs , micros: ["prop_reconnaitre"] },
    { titre: "Je reviens à 1", texte: "Je cherche la valeur pour 1 unité (une division)." , schema: laColonneDeLUnite , micros: ["prop_unite"] },
    { titre: "Je multiplie", texte: "Je multiplie cette valeur par la quantité demandée." , schema: septPartsRecollees , micros: ["prop_direct"] },
  ],
  usages: [
    { titre: "Reconnaître", detail: "On double une quantité → l'autre double aussi." , micros: ["prop_reconnaitre"] },
    { titre: "Revenir à l'unité", detail: "Valeur pour 1, puis × la quantité : 1 cahier = 2 €, 5 cahiers = 10 €." , micros: ["prop_unite"] },
    { titre: "Compléter un tableau", detail: "On trouve la case « ? » avec le coefficient ou l'unité." , micros: ["prop_table"] },
  ],
  exemples: [
    {
      titre: "Reconnaître",
      micros: ["prop_reconnaitre"],
      donnees: "1 cahier → 2 €, 2 cahiers → 4 €, 3 cahiers → 6 €.",
      question: "Est-ce proportionnel ?",
      schema: tableauProp(
        ["Cahiers", "Prix (€)"],
        [
          ["1", "2", "3"],
          ["2", "4", "6"],
        ]
      ),
      solution: "On multiplie toujours par 2 d'une ligne à l'autre : oui, c'est proportionnel.",
    },
    {
      titre: "Compléter un tableau",
      micros: ["prop_table"],
      donnees: "3 cahiers coûtent 6 €.",
      question: "Combien coûtent 5 cahiers ?",
      schema: tableauProp(
        ["Cahiers", "Prix (€)"],
        [
          ["3", "5"],
          ["6", "?"],
        ],
        [{ row: 1, col: 1 }]
      ),
      solution: "1 cahier = 6 ÷ 3 = 2 €. Donc 5 cahiers = 5 × 2 = 10 €.",
    },
    {
      titre: "Recette (passage par l'unité)",
      micros: ["prop_unite", "prop_direct"],
      donnees: "Pour 4 personnes, il faut 200 g de riz.",
      question: "Combien pour 6 personnes ?",
      schema: tableauProp(
        ["Personnes", "Riz (g)"],
        [
          ["4", "6"],
          ["200", "?"],
        ],
        [{ row: 1, col: 1 }]
      ),
      solution: "1 personne = 200 ÷ 4 = 50 g. Donc 6 personnes = 6 × 50 = 300 g.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "2 stylos coûtent 4 €. Combien coûtent 7 stylos ?",
      correction: "1 stylo = 4 ÷ 2 = 2 €, donc 7 stylos = 7 × 2 = 14 €.",
    },
    {
      question: "5 tickets coûtent 15 €. Combien coûtent 3 tickets ?",
      correction: "1 ticket = 15 ÷ 5 = 3 €, donc 3 tickets = 3 × 3 = 9 €.",
    },
    {
      question: "Pour 10 crêpes, il faut 250 g de farine. Combien pour 20 crêpes ?",
      correction: "20 crêpes, c'est 2 × 10 crêpes, donc 2 × 250 = 500 g de farine.",
    },
    {
      question: "Un cycliste parcourt 12 km en 30 min à vitesse régulière. Quelle distance en 1 h ?",
      correction: "1 h = 2 × 30 min, donc il parcourt 2 × 12 = 24 km.",
      micros: ["prop_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesProportionnalite6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Proportionnalité - 6e",
    section: {
      type: "objectif",
      phrase: "Reconnaître une situation proportionnelle",
      sousPhrase: "On vérifie si les deux grandeurs changent toujours avec le même multiplicateur.",
      encadre: {
        titre: "La question",
        texte: "Si je multiplie une ligne, est-ce que l'autre est multipliée pareil ?",
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
        contenu: "Recettes, échelles de cartes, prix au kilo, vitesse, mélanges (sirop, peinture).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "On utilise les proportions depuis l'Antiquité. La « règle de trois » est enseignée depuis des siècles.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProportionnalite6e.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "La méthode au tableau",
    badge: "Passage par l'unité",
    section: {
      type: "etapes",
      etapes: ficheProportionnalite6e.methode.map((m) => m.texte),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Prix de cahiers",
    section: {
      type: "exemple",
      enonce: "3 cahiers coûtent 6 €.",
      question: "Combien coûtent 5 cahiers ?",
      correction: "1 cahier = 2 €, donc 5 cahiers = 5 × 2 = 10 €.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Recette",
    section: {
      type: "exemple",
      enonce: "Pour 4 personnes, il faut 200 g de riz.",
      question: "Combien pour 6 personnes ?",
      correction: "1 personne = 50 g, donc 6 personnes = 6 × 50 = 300 g.",
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
      enonce: "2 stylos coûtent 4 €.",
      question: "Combien coûtent 7 stylos ?",
      indice: "Cherche d'abord le prix d'un stylo.",
      correction: "1 stylo = 2 €, donc 7 stylos = 14 €.",
    },
  },
];
