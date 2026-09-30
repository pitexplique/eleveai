// ─── Fiche de cours : la proportionnalité (6e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/proportionnalite.bank.ts
// (notionId prop_proportionnalite).
//
// ⭐ RÉÉCRITE LE 30/09/2026 AU STANDARD DES 6e QUI LISENT DIFFICILEMENT :
// phrases courtes, une idée par phrase, un dessin sur CHAQUE bloc, Ti Margo en
// mode classe (champ `tiMargo`). Les dessins justes de juin sont gardés.
//
// Micro-compétences 6/6 (le champ `micros` de chaque bloc fait foi) :
// - prop_reconnaitre → propriété 1 (× 2 contre + 3), réflexe 1, usage 1 (l'âge
//                      et la taille), exemple 1 (2 billets 6 €, 4 billets 11 €)
// - prop_coeff       → définition + figure (cahiers × 2), propriété 2 (× 3),
//                      formule, entraînement 3 (3 objets, 12 €)
// - prop_unite       → propriété 3 (15 € pour 5), réflexe 2 (4 objets, 12 €),
//                      exemple 3 (4 personnes, 200 g de farine), entraînements 1 et 2
// - prop_table       → propriété 4 (2 potions, 10 pièces), usage 2 (4 coffres,
//                      12 pièces), exemple 2 (3 cahiers, 6 €), entraînement 4
// - prop_direct      → réflexe 3 (7 × 3 = 21 €), usage 3 (10 maillots, 50 €),
//                      exemple 3, entraînement 1
// - prop_defi        → exemple 3 (la recette de la banque), entraînement 5
// Nombres de la banque, sauf les entraînements de juin (stylos, tickets, crêpes,
// cycliste) gardés tels quels. ⛔ Aucun exemple commun avec la feuille
// `lib/fiches-exercices/maths-6e-prop-proportionnalite.tsx` (elle évite les nôtres).
//
// ⭐ LE TABLEAU NE REVIENT QUE LÀ OÙ IL EST LE GESTE (coefficient, case à
// compléter). Ailleurs : la barre découpée (revenir à 1), la barre recollée
// (multiplier), un diagramme (ce qui n'est PAS proportionnel).
// ⛔ AUCUN LATEX, aucun tableau de plus de 3 colonnes courtes.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Le tableau de proportionnalité du coach (le même que dans les exercices). */
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
        size: { width: 240, height: 130 },
      }}
    />
  );
}

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** `n` parts égales de valeur `v`, bout à bout. */
const barre = (titre: string, total: string, n: number, v: string, question: string, etiquette = "") => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: titre,
      total,
      parts: Array.from({ length: n }, () => ({ label: etiquette, value: v })),
      questionLabel: question,
      size: { width: 240, height: 190 },
    }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : les cahiers, toujours × 2.
const tableauCahiers = tableauProp(
  ["cahiers", "prix (€)"],
  [
    ["1", "3", "5"],
    ["2", "6", "10"],
  ],
  [
    { row: 0, col: 0 },
    { row: 1, col: 0 },
  ]
);

// PROPRIÉTÉ 1 : RECONNAÎTRE, C'EST VOIR LE CONTRE-EXEMPLE. A multiplie, B ajoute.
const proportionnelOuPas = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Proportionnel ou pas ?",
      headers: ["Objets", "Prix A", "Prix B"],
      rows: [
        { values: ["1", "2", "2"] },
        { values: ["2", "4", "5"] },
        { values: ["3", "6", "8"] },
      ],
      highlight: { col: 1 },
    }}
  />,
  "A : toujours × 2 · B : + 3, pas proportionnel"
);

// PROPRIÉTÉ 2 : le coefficient, lu entre les deux lignes (1 cahier = 3 €).
const leCoefficient = legende(
  tableauProp(
    ["objets", "prix (€)"],
    [
      ["1", "2", "4"],
      ["3", "6", "12"],
    ],
    [{ row: 1, col: 2 }]
  ),
  "Toujours × 3 : le coefficient est 3"
);

// PROPRIÉTÉ 3 : revenir à 1, c'est découper. 15 € en 5 parts de 3.
const leToutEnCinqParts = barre("15 € pour 5 objets", "15 €", 5, "3", "15 ÷ 5 = 3 € l'objet", "1");

// PROPRIÉTÉ 4 : une colonne × 3, l'autre aussi (le jeu vidéo de la banque).
const potions = legende(
  tableauProp(
    ["potions", "pièces"],
    [
      ["2", "6"],
      ["10", "?"],
    ],
    [{ row: 1, col: 1 }]
  ),
  "6 potions = 3 fois 2 potions : 3 × 10 = 30"
);

// LA FORMULE : 5 cahiers à 2 €, recollés.
const cinqCahiers = barre("5 cahiers à 2 €", "10 €", 5, "2", "2 × 5 = 10 €");

// RÉFLEXE 1 : nommer les deux grandeurs, rien d'autre.
const lesDeuxGrandeurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Deux grandeurs",
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

// RÉFLEXE 2 : la colonne du 1, laissée vide.
const laColonneDeLUnite = legende(
  tableauProp(
    ["objets", "prix (€)"],
    [
      ["1", "4", "7"],
      ["", "12", "21"],
    ],
    [{ row: 1, col: 0 }]
  ),
  "D'abord le prix de 1 : 12 ÷ 4 = 3"
);

// RÉFLEXE 3 : multiplier, c'est recoller 7 parts de 3.
const septPartsRecollees = barre("7 objets à 3 €", "21 €", 7, "3", "7 × 3 = 21 €", "3");

// USAGE 1 : l'âge et la taille (banque). La taille ne double pas.
const ageTaille = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Taille (cm)",
      data: [
        { label: "10 ans", value: 140, color: "#bfdbfe" },
        { label: "20 ans", value: 170, color: "#bbf7d0" },
        { label: "× 2 ?", value: 280, color: "#fecaca" },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 210, height: 180 },
    }}
  />
);

// USAGE 2 : 4 coffres, 12 pièces ; 8 coffres, le double.
const coffres = tableauProp(
  ["coffres", "pièces"],
  [
    ["4", "8"],
    ["12", "24"],
  ],
  [{ row: 1, col: 1 }]
);

// USAGE 3 : 10 maillots pour 50 € ; la moitié, 5 maillots.
const maillots = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "10 maillots : 50 €",
      total: "50 €",
      parts: [
        { label: "5 maillots", value: "25 €", color: "#bfdbfe" },
        { label: "5 maillots", value: "25 €", color: "#e2e8f0" },
      ],
      questionLabel: "La moitié : 50 ÷ 2 = 25 €",
      size: { width: 240, height: 190 },
    }}
  />
);

// EXEMPLES
const billets = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Billets", "Prix"],
      rows: [
        { values: ["2", "6 €"] },
        { values: ["4", "11 €"] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
      questionLabel: "6 × 2 = 12 €, pas 11 €",
    }}
  />
);
const cahiersACompleter = tableauProp(
  ["cahiers", "prix (€)"],
  [
    ["3", "5"],
    ["6", "?"],
  ],
  [{ row: 1, col: 1 }]
);
const farine = barre("200 g pour 4 personnes", "200 g", 4, "50", "200 ÷ 4 = 50 g par personne", "1");

const pieges = [
  "Ajouter au lieu de multiplier. + 3 à chaque fois, ce n'est pas proportionnel.",
  "Multiplier trop vite. Je cherche d'abord la valeur pour 1.",
  "Mélanger les deux lignes. Les objets en haut, les prix en bas.",
];

const aRetenir = [
  "Proportionnel : on multiplie toujours par le même nombre.",
  "Ce nombre s'appelle le coefficient.",
  "Je reviens à 1, puis je multiplie.",
];

export const ficheProportionnalite6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Deux fois plus de cahiers, deux fois plus cher : c'est la proportionnalité. On apprend à la reconnaître et à s'en servir.",
  identite: [
    { label: "Mots clés", valeur: "Coefficient, tableau, unité" },
    { label: "Le secret", valeur: "Toujours × le même nombre" },
    { label: "Méthode reine", valeur: "Revenir à 1" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre. Ce nombre s'appelle le coefficient. Il fait passer d'une ligne du tableau à l'autre.",
  },
  figure: {
    schema: tableauCahiers,
    legende: "D'une ligne à l'autre, toujours × 2 : le coefficient est 2.",
  },
  proprietes: [
    {
      titre: "Reconnaître",
      micros: ["prop_reconnaitre"],
      texte: "Si une grandeur double, l'autre double aussi. Ajouter le même nombre ne suffit pas.",
      schema: proportionnelOuPas,
    },
    {
      titre: "Le coefficient",
      micros: ["prop_coeff"],
      texte: "Je divise un prix par sa quantité : 6 ÷ 2 = 3. Le coefficient est 3 partout.",
      schema: leCoefficient,
    },
    {
      titre: "Revenir à 1",
      micros: ["prop_unite"],
      texte: "Je cherche d'abord la valeur pour 1. 5 objets pour 15 € : 1 objet coûte 3 €.",
      schema: leToutEnCinqParts,
    },
    {
      titre: "Multiplier une colonne",
      micros: ["prop_table"],
      texte: "Si une quantité est multipliée par 3, l'autre aussi. 6 potions coûtent 3 fois plus que 2.",
      schema: potions,
    },
  ],
  reel: {
    texte:
      "Une recette pour 6 au lieu de 4 : toutes les quantités changent. Le prix des pommes dépend de leur masse. Un sirop se mélange toujours avec la même dose d'eau. Sur une carte, les distances suivent les vraies.",
  },
  historique: {
    texte:
      "Les proportions servent depuis l'Antiquité. Les marchands s'en servaient pour fixer leurs prix. Leur méthode s'appelle la « règle de trois ». On l'enseigne depuis des siècles.",
  },
  formule: {
    contexte: "Avec le coefficient",
    expression: "prix = coefficient × quantité",
    legende: "1 cahier coûte 2 €. Donc 5 cahiers coûtent 2 × 5 = 10 €.",
    schema: cinqCahiers,
  },
  methode: [
    {
      titre: "Je nomme les deux grandeurs",
      micros: ["prop_reconnaitre"],
      texte: "Je cherche ce qui change : des objets et un prix, un temps et une distance.",
      schema: lesDeuxGrandeurs,
    },
    {
      titre: "Je reviens à 1",
      micros: ["prop_unite"],
      texte: "Je divise pour trouver la valeur d'un seul. 4 objets pour 12 € : 12 ÷ 4 = 3 €.",
      schema: laColonneDeLUnite,
    },
    {
      titre: "Je multiplie",
      micros: ["prop_direct"],
      texte: "Je multiplie la valeur d'un seul par la quantité voulue. 7 objets : 7 × 3 = 21 €.",
      schema: septPartsRecollees,
    },
  ],
  usages: [
    {
      titre: "Pas toujours proportionnel",
      micros: ["prop_reconnaitre"],
      detail: "L'âge et la taille ne sont pas proportionnels. À 20 ans, on ne mesure pas le double de ses 10 ans.",
      schema: ageTaille,
    },
    {
      titre: "Dans un jeu vidéo",
      micros: ["prop_table"],
      detail: "4 coffres coûtent 12 pièces. 8 coffres, c'est le double : 24 pièces.",
      schema: coffres,
    },
    {
      titre: "Pour une équipe",
      micros: ["prop_direct"],
      detail: "10 maillots coûtent 50 €. 5 maillots, c'est la moitié : 25 €.",
      schema: maillots,
    },
  ],
  exemples: [
    {
      titre: "Reconnaître",
      micros: ["prop_reconnaitre"],
      donnees: "2 billets coûtent 6 €. 4 billets coûtent 11 €.",
      question: "Le prix est-il proportionnel au nombre de billets ?",
      schema: billets,
      solution: "Les billets passent de 2 à 4 : c'est le double. Le double de 6 €, c'est 12 €. Or on paie 11 €. Ce n'est pas proportionnel.",
    },
    {
      titre: "Compléter un tableau",
      micros: ["prop_table", "prop_unite"],
      donnees: "3 cahiers coûtent 6 €.",
      question: "Combien coûtent 5 cahiers ?",
      schema: cahiersACompleter,
      solution: "1 cahier coûte 6 ÷ 3 = 2 €. 5 cahiers coûtent 5 × 2 = 10 €.",
    },
    {
      titre: "Une recette",
      micros: ["prop_unite", "prop_direct", "prop_defi"],
      donnees: "Pour 4 personnes, il faut 200 g de farine.",
      question: "Combien de farine pour 6 personnes ?",
      schema: farine,
      solution: "Pour 1 personne : 200 ÷ 4 = 50 g. Pour 6 personnes : 6 × 50 = 300 g. Il faut 300 g de farine.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "2 stylos coûtent 4 €. Combien coûtent 7 stylos ?",
      correction: "1 stylo coûte 4 ÷ 2 = 2 €. 7 stylos coûtent 7 × 2 = 14 €.",
      micros: ["prop_unite", "prop_direct"],
    },
    {
      question: "5 tickets coûtent 15 €. Combien coûtent 3 tickets ?",
      correction: "1 ticket coûte 15 ÷ 5 = 3 €. 3 tickets coûtent 3 × 3 = 9 €.",
      micros: ["prop_unite"],
    },
    {
      question: "3 objets coûtent 12 €. Quel est le coefficient ?",
      correction: "12 ÷ 3 = 4. Le coefficient est 4 : un objet coûte 4 €.",
      micros: ["prop_coeff"],
    },
    {
      question: "Pour 10 crêpes, il faut 250 g de farine. Combien pour 20 crêpes ?",
      correction: "20 crêpes, c'est le double de 10. Il faut le double de farine : 500 g.",
      micros: ["prop_table"],
    },
    {
      question: "Un cycliste roule toujours à la même vitesse. Il fait 12 km en 30 min. Combien en 1 h ?",
      correction: "1 h, c'est 2 fois 30 min. Il roule 2 fois plus loin : 24 km.",
      micros: ["prop_defi"],
    },
  ],
  tiMargo: {
    objectif: "Toujours × le même nombre !",
    definition: "Ce nombre magique, c'est le coefficient !",
    methode: "D'abord la valeur d'un seul, ensuite je multiplie !",
    pieges: "+ 3 à chaque fois, ce n'est pas proportionnel !",
    retenir: "Je reviens à 1, puis je multiplie !",
    exercice: "À toi ! Cherche le prix d'un stylo.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Ce tableau n'est plus projeté (le mode classe est engendré par la fiche,
// `slidesDepuisFiche`) : la page le passe encore, il reste court.
export const slidesProportionnalite6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Proportionnalité - 6e",
    teinte: "objectif",
    schema: avecMargo(tableauCahiers, "Toujours × le même nombre !", "joie"),
    section: {
      type: "objectif",
      phrase: "Reconnaître une situation proportionnelle",
      sousPhrase: "D'une ligne à l'autre, on multiplie toujours par le même nombre.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(proportionnelOuPas, "+ 3 à chaque fois, ce n'est pas proportionnel !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(leToutEnCinqParts, "À toi ! Reviens d'abord à 1.", "joie"),
    section: {
      type: "exercice",
      enonce: "2 stylos coûtent 4 €.",
      question: "Combien coûtent 7 stylos ?",
      indice: "Cherche d'abord le prix d'un stylo.",
      correction: "1 stylo coûte 2 €. 7 stylos coûtent 14 €.",
    },
  },
];
