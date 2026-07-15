// ─── Fiche de cours : la proportionnalité (CM2) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/proportionnalite.bank.ts (notionId proportionnalite).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE le tableau de
// proportionnalité (canvas tableau_proportionnalite du coach).
//
// Micro-compétences couvertes (les 6 de la banque) :
// - prop_reconnaitre → definition, exemple « Reconnaître » (carnets 1→2€), propriété « On reconnaît »
// - prop_tableau     → figure (tableau jus/personnes), propriété « Le tableau », exemple « Le tableau » (jus)
// - prop_coefficient → propriété « Le coefficient », exemple « Le coefficient » (3 → 12, ×4), méthode
// - prop_quatrieme   → propriété « Le retour à l'unité », exemple « Le prix de 5 » (3 ballons 18€ → 5), entraînement
// - prop_probleme    → exemple « Un problème » (4 gâteaux 12 œufs → 6), usages
// - prop_defi        → défi dessiné (4 samoussas 60 g → 10 samoussas)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le tableau de proportionnalité dessiné par le moteur du coach.
const tableau = (
  values: (number | string)[][],
  rowLabels: string[],
  highlight: [number, number][] = []
) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: values.length,
      cols: values[0].length,
      rowLabels,
      values: values.map((row) => row.map((v) => String(v))),
      missing: [],
      highlightedCells: highlight.map(([row, col]) => ({ row, col })),
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

const pieges = [
  "Croire qu'ajouter le même nombre suffit : proportionnel, c'est MULTIPLIER par le même nombre.",
  "Vouloir tout faire d'un coup : on passe souvent par le prix de 1 (le retour à l'unité).",
  "Oublier que doubler l'un doit doubler l'autre : sinon ce n'est pas proportionnel.",
];

const aRetenir = [
  "Proportionnel = on multiplie toujours par le même nombre (le coefficient).",
  "Le coefficient, c'est la valeur pour 1 : le prix d'un seul objet.",
  "Retour à l'unité : je calcule la valeur de 1, puis je multiplie.",
];

export const ficheProportionnaliteCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Deux fois plus de gâteaux, deux fois plus d'œufs : c'est la proportionnalité. Un seul nombre, le coefficient, relie les deux grandeurs.",
  identite: [
    { label: "Mots clés", valeur: "Proportionnel, coefficient, tableau, unité" },
    { label: "Le secret", valeur: "On multiplie toujours par le même nombre" },
    { label: "Outil", valeur: "Le tableau de proportionnalité" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le même nombre, appelé coefficient. Si on double une grandeur, l'autre double aussi. Exemple : 1 carnet coûte 2 €, alors 3 carnets coûtent 3 × 2 = 6 €.",
  },
  figure: {
    schema: tableau(
      [
        [2, 4, 8],
        [4, 8, 16],
      ],
      ["Verres", "Personnes"],
      [[0, 0], [1, 0]]
    ),
    legende: "Deux fois plus de personnes, deux fois plus de verres : c'est proportionnel.",
  },
  proprietes: [
    {
      titre: "On reconnaît",
      texte: "Si on double (ou triple) l'une des grandeurs, l'autre double (ou triple) aussi.",
    },
    {
      titre: "Le tableau",
      texte: "On range les deux grandeurs dans un tableau à deux lignes pour bien voir le lien.",
    },
    {
      titre: "Le coefficient",
      texte: "C'est le nombre qui fait passer d'une ligne à l'autre : de 3 à 12, on multiplie par 4.",
    },
    {
      titre: "Le retour à l'unité",
      texte: "On calcule la valeur de 1 (le prix d'un seul objet), puis on multiplie.",
    },
  ],
  reel: {
    texte:
      "La proportionnalité est partout à La Réunion : la recette de samoussas (plus de samoussas, plus de farce), le prix au marché (3 mangues, 6 mangues…), l'essence (plus de litres, plus cher). À chaque fois, on multiplie par le même nombre.",
  },
  historique: {
    texte:
      "La proportionnalité est très ancienne : les marchands et les bâtisseurs de l'Égypte et de la Grèce l'utilisaient déjà pour les recettes, les échanges et les plans. On parlait de « règle de trois ».",
  },
  methode: [
    { titre: "Je vérifie que c'est proportionnel", texte: "Doubler l'un double-t-il l'autre ? Alors oui." },
    { titre: "Je cherche la valeur de 1", texte: "Je divise pour trouver le prix (ou la quantité) d'un seul." },
    { titre: "Je multiplie", texte: "Je multiplie cette valeur de 1 par le nombre demandé." },
  ],
  usages: [
    { titre: "Une recette", detail: "4 gâteaux → 12 œufs. Pour 1 gâteau : 3 œufs." },
    { titre: "Un prix", detail: "3 ballons → 18 €. Pour 1 ballon : 6 €." },
    { titre: "Une quantité", detail: "4 samoussas → 60 g de farce. Pour 1 : 15 g." },
  ],
  exemples: [
    {
      titre: "Reconnaître",
      donnees: "1 carnet coûte 2 €, et 3 carnets coûtent 6 €.",
      question: "Est-ce proportionnel ?",
      schema: tableau(
        [
          [1, 3],
          [2, 6],
        ],
        ["Carnets", "Prix (€)"],
        [[0, 0], [1, 0]]
      ),
      solution:
        "3 fois plus de carnets, 3 fois plus cher (3 × 2 = 6). On multiplie par le même nombre : oui, c'est proportionnel.",
    },
    {
      titre: "Le tableau",
      donnees: "2 verres de jus pour 4 personnes.",
      question: "Combien de verres pour 8 personnes ?",
      schema: tableau(
        [
          [4, 8],
          [2, 4],
        ],
        ["Personnes", "Verres"],
        [[0, 1], [1, 1]]
      ),
      solution:
        "8 personnes, c'est 2 fois plus que 4. Donc 2 fois plus de verres : 2 × 2 = 4 verres.",
    },
    {
      titre: "Le coefficient",
      donnees: "Dans un tableau, on passe de 3 à 12.",
      question: "Par quel nombre multiplie-t-on ?",
      schema: tableau(
        [
          [3, 12],
        ],
        ["Valeur"],
        [[0, 0], [0, 1]]
      ),
      solution:
        "On cherche le coefficient : 3 × ? = 12. Comme 3 × 4 = 12, on multiplie par 4.",
    },
    {
      titre: "Le prix de 5 (retour à l'unité)",
      donnees: "3 ballons coûtent 18 €.",
      question: "Combien coûtent 5 ballons au même prix ?",
      schema: tableau(
        [
          [3, 1, 5],
          [18, 6, 30],
        ],
        ["Ballons", "Prix (€)"],
        [[0, 1], [1, 1]]
      ),
      solution:
        "Je cherche le prix d'un ballon : 18 ÷ 3 = 6 €. Puis pour 5 ballons : 5 × 6 = 30 €.",
    },
    {
      titre: "Un problème",
      donnees: "Pour 4 gâteaux, il faut 12 œufs.",
      question: "Combien d'œufs pour 6 gâteaux ?",
      schema: tableau(
        [
          [4, 1, 6],
          [12, 3, 18],
        ],
        ["Gâteaux", "Œufs"],
        [[0, 1], [1, 1]]
      ),
      solution:
        "Pour 1 gâteau : 12 ÷ 4 = 3 œufs. Pour 6 gâteaux : 6 × 3 = 18 œufs.",
    },
    {
      titre: "Le défi 974",
      donnees: "Pour 4 samoussas, il faut 60 g de farce.",
      question: "Combien de farce pour 10 samoussas ?",
      schema: tableau(
        [
          [4, 1, 10],
          [60, 15, 150],
        ],
        ["Samoussas", "Farce (g)"],
        [[0, 1], [1, 1]]
      ),
      solution:
        "Pour 1 samoussa : 60 ÷ 4 = 15 g. Pour 10 samoussas : 10 × 15 = 150 g de farce.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "1 stylo coûte 3 €. Est-ce proportionnel si 4 stylos coûtent 12 € ?",
      correction:
        "4 fois plus de stylos, 4 fois plus cher : 4 × 3 = 12. Oui, c'est proportionnel.",
    },
    {
      question: "Dans un tableau, on passe de 5 à 20. Quel est le coefficient ?",
      correction:
        "5 × ? = 20. Comme 5 × 4 = 20, le coefficient est 4.",
    },
    {
      question: "3 ballons coûtent 18 €. Combien coûtent 5 ballons ?",
      correction:
        "Prix d'un ballon : 18 ÷ 3 = 6 €. Pour 5 ballons : 5 × 6 = 30 €.",
    },
    {
      question: "Pour 4 samoussas, il faut 60 g de farce. Combien pour 10 samoussas ?",
      correction:
        "Pour 1 samoussa : 60 ÷ 4 = 15 g. Pour 10 : 10 × 15 = 150 g.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesProportionnaliteCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Proportionnalité - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître une situation proportionnelle et la compléter",
      sousPhrase:
        "Proportionnel, c'est multiplier toujours par le même nombre. Deux fois plus de gâteaux, deux fois plus d'œufs.",
      encadre: {
        titre: "L'idée",
        texte: "On passe souvent par la valeur de 1 (le retour à l'unité).",
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
          "Les recettes (samoussas, gâteaux), les prix au marché, l'essence : partout on multiplie par le même nombre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les marchands de l'Égypte et de la Grèce l'utilisaient déjà : on parlait de « règle de trois ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProportionnaliteCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Le retour à l'unité",
    badge: "La clé",
    section: {
      type: "cartes",
      cartes: [
        { titre: "1. La valeur de 1", texte: "3 ballons → 18 €, donc 1 ballon → 18 ÷ 3 = 6 €." },
        { titre: "2. On multiplie", texte: "5 ballons → 5 × 6 = 30 €." },
        { titre: "3. On vérifie", texte: "Plus de ballons, plus cher : c'est cohérent." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Une recette",
    section: {
      type: "exemple",
      enonce: "Pour 4 gâteaux, il faut 12 œufs.",
      question: "Combien d'œufs pour 6 gâteaux ?",
      correction: "Pour 1 gâteau : 12 ÷ 4 = 3 œufs. Pour 6 : 6 × 3 = 18 œufs.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Le coefficient",
    section: {
      type: "exemple",
      enonce: "Dans un tableau, on passe de 3 à 12.",
      question: "Par quel nombre multiplie-t-on ?",
      correction: "3 × 4 = 12, donc le coefficient est 4.",
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
      enonce: "Pour 4 samoussas, il faut 60 g de farce.",
      question: "Combien de farce pour 10 samoussas ?",
      indice: "Cherche d'abord la farce pour 1 samoussa : 60 ÷ 4.",
      correction: "Pour 1 samoussa : 60 ÷ 4 = 15 g. Pour 10 : 10 × 15 = 150 g.",
    },
  },
];
