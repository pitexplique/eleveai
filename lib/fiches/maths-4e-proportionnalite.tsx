// ─── Fiche de cours : la proportionnalité (4e) ─────────────────────────────────
//
// RÉÉCRITE le 30/09/2026 : les élèves de Frédéric sont sur ce chapitre. La
// version du 28/08 avait trois défauts, mesurés en la relisant :
//   · elle parlait encore des POURCENTAGES (formule, « à retenir », accroche,
//     deux diapos, l'exercice flash + 15 % puis − 15 %), partis le 28/08 dans la
//     notion voisine `prop_ratio_pourcentage` ;
//   · son contre-exemple écrivait « + 4 » sous un tableau où l'on ajoute 3 ;
//   · le GRAPHIQUE (points alignés avec l'origine), attendu en 4e, n'y était pas.
// Et elle était écrite en phrases de manuel. Ici : une idée par phrase, un
// dessin par bloc (canvas du coach), les exemples de leur âge, pas La Réunion
// par défaut. Le mode classe est ENGENDRÉ par `slidesDepuisFiche` : plus de
// diapos écrites à la main, qui ne suivaient pas la fiche.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank.ts`,
// notionId prop_proportionnalite : prop_reconnaitre, prop_table, prop_graphique,
// prop_coeff, prop_quatrieme, prop_probleme, prop_relation, prop_defi.
// ⭐ 05/10/2026 : les deux micros neuves du coach ont leur bloc — le graphique
// (« Sur un graphique », lu aussi pour une valeur) et la relation y = k × x
// (bloc « La relation », lue sur le graphique au point d'abscisse 1).
// ⛔ Aucun exemple de la feuille d'exercices de 4e n'est repris (piles, noix de
// cajou, flyers, imprimante 3D, miel, vélos, mortier, ressort, trailleuse,
// pâte à pain, ombres, panneaux, pompes).
//
// ⭐ LES DESSINS, choisis pour ce qu'ils montrent :
//   · la correspondance et son coefficient → `tableau_proportionnalite` ;
//   · les quotients qu'on compare          → `tableau_donnees` ;
//   · la droite par l'origine (et l'autre) → `fonctionGraphique`, par `repere()` ;
//   · la case vide du produit en croix     → `tableau_proportionnalite`, case manquante.
// Dans `methode` et `exemples`, seuls des canvas HTML (largeur des blocs).

import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { ORANGE, repere } from "@/lib/fiches-exercices/figures";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

/** Un dessin et sa phrase, sous lui. Les libellés DANS le dessin restent en écriture simple. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/** Le tableau de proportionnalité du coach : deux lignes, les cases vides marquées. */
const tableauProp = (valeurs: string[][], manquantes: { row: number; col: number }[], colonnes: string[], lignes: string[]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: 228, height: 150 },
      rows: valeurs.length,
      cols: valeurs[0].length,
      rowLabels: lignes,
      colLabels: colonnes,
      values: valeurs,
      missing: manquantes,
      display: { showRowLabels: true, showColLabels: true, showMissing: true, showGrid: true },
    }}
  />
);

/** Un petit tableau de données (HTML : il tient dans tous les blocs). */
const donnees = (headers: string[], lignes: string[][], surligne?: number, caption?: string) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers,
      rows: lignes.map((values) => ({ values })),
      ...(surligne !== undefined ? { highlight: { row: surligne } } : {}),
      ...(caption ? { caption } : {}),
      display: { compact: true, striped: true },
    }}
  />
);

// Les places de match : le fil rouge de la fiche. 1 place coûte 9 €.
const placesDeMatch = tableauProp(
  [
    ["3", "5", "8"],
    ["27", "45", "72"],
  ],
  [],
  ["", "", ""],
  ["places", "prix (€)"],
);

// ⭐ LE CONTRE-EXEMPLE : un tableau RÉGULIER (on ajoute 4 € à chaque heure) qui
// n'est pas proportionnel, à cause de l'entrée payée une fois. Le trampoline :
// 5 € l'entrée, puis 4 € l'heure.
const trampoline = legende(
  donnees(
    ["heures", "prix (€)", "prix ÷ heures"],
    [
      ["1", "9", "9"],
      ["2", "13", "6,5"],
      ["3", "17", "5,66…"],
    ],
  ),
  "on ajoute 4 € à chaque heure, mais le quotient change",
);

const pieges = [
  "Croire qu'un tableau régulier est proportionnel. Ajouter toujours le même nombre, ce n'est pas multiplier toujours par le même nombre.",
  "Dire « c'est une droite, donc c'est proportionnel ». La droite doit aussi passer par l'origine.",
  "Trouver la relation avec la première colonne seulement. Elle doit marcher pour TOUTES les colonnes.",
  "Faire un produit en croix sans avoir vérifié que la situation est proportionnelle. Le calcul donne alors un résultat faux, sans prévenir.",
];

const aRetenir = [
  "Proportionnel : on passe d'une grandeur à l'autre en multipliant toujours par le même nombre, le coefficient.",
  "Sur un graphique : des points alignés avec l'origine.",
  "La relation : y = k × x, où k est le coefficient. Sur le graphique, k est la valeur de y pour x = 1.",
  "Case vide d'un tableau de proportionnalité : je multiplie les deux nombres de la diagonale complète, puis je divise par le troisième.",
];

export const ficheProportionnalite4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Proportionnel, c'est multiplier toujours par le même nombre. En 4e, on le reconnaît aussi sur un graphique, on écrit la relation y = k × x, et on trouve une valeur manquante avec le produit en croix.",
  identite: [
    { label: "Le secret", valeur: "Multiplier toujours par le même nombre" },
    { label: "L'outil de 4e", valeur: "Le produit en croix" },
    { label: "Le piège", valeur: "Régulier ne veut pas dire proportionnel" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le même nombre.\n\nCe nombre s'appelle le coefficient de proportionnalité.",
  },
  figure: {
    schema: placesDeMatch,
    legende: "Une place coûte 9 € : on multiplie toujours par 9.",
  },
  proprietes: [
    {
      titre: "Le coefficient",
      micros: ["prop_coeff", "prop_table"],
      texte:
        "Pour le trouver, je divise un nombre du bas par celui du haut. Je dois trouver le même quotient dans TOUTES les colonnes.",
      schema: legende(
        donnees(
          ["places", "prix (€)", "prix ÷ places"],
          [
            ["3", "27", "9"],
            ["5", "45", "9"],
            ["8", "72", "9"],
          ],
        ),
        "le même quotient partout : c'est le coefficient",
      ),
    },
    {
      titre: "Régulier ne veut pas dire proportionnel",
      micros: ["prop_reconnaitre", "prop_defi"],
      texte:
        "Au trampoline, l'entrée coûte 5 €, puis 4 € par heure. Le prix augmente toujours de 4 € : c'est régulier. Mais les quotients changent : ce n'est pas proportionnel.",
      schema: trampoline,
    },
    {
      titre: "Sur un graphique",
      micros: ["prop_graphique", "prop_reconnaitre"],
      texte:
        "Une situation de proportionnalité donne des points alignés avec l'origine. La droite bleue passe par l'origine : proportionnel. La droite orange ne passe pas par l'origine : pas proportionnel. Pour lire une valeur, je pars de l'axe horizontal, je monte jusqu'à la droite, puis je lis l'axe vertical.",
      schema: legende(
        repere([-1, 5, -1, 9], [{ pts: [[0, 0], [4.5, 9]] }, { pts: [[0, 3], [5, 8]], couleur: ORANGE }], [{ x: 0, y: 0 }]),
        "bleue : par l'origine ; orange : non",
      ),
    },
    {
      titre: "La relation",
      micros: ["prop_relation", "prop_graphique"],
      texte:
        "Deux grandeurs proportionnelles sont reliées par y = k × x, où k est le coefficient. Pour les places de match : prix = 9 × nombre de places. Pour trouver k, je divise un y par son x. Sur le graphique, k est la valeur de y pour x = 1.",
      schema: legende(
        repere([-1, 5, -1, 9], [{ pts: [[0, 0], [4.5, 9]] }], [
          { x: 1, y: 2, label: "(1 ; 2)" },
          { x: 3, y: 6, label: "(3 ; 6)" },
        ]),
        "pour x = 1, y = 2 : la relation est y = 2 × x",
      ),
    },
    {
      titre: "Le produit en croix",
      micros: ["prop_quatrieme", "prop_table"],
      texte:
        "Dans un tableau de proportionnalité, pour trouver la case vide, je multiplie les deux nombres de la diagonale complète, puis je divise par le troisième.",
      schema: legende(
        tableauProp(
          [
            ["3", "5"],
            ["27", "?"],
          ],
          [{ row: 1, col: 1 }],
          ["", ""],
          ["places", "prix (€)"],
        ),
        "? = 5 × 27 ÷ 3 = 45 €",
      ),
    },
  ],
  reel: {
    texte:
      "Le prix de plusieurs places de concert. La distance d'une course à allure régulière. Une recette qu'on double. Des euros changés en dollars pendant un voyage. Dès qu'un seul nombre relie deux grandeurs, c'est de la proportionnalité.",
  },
  historique: {
    texte:
      "Le produit en croix s'appelait autrefois la « règle de trois » : on connaît trois nombres, on cherche le quatrième. En 1202, le mathématicien italien Fibonacci l'explique aux marchands dans son livre, le Liber Abaci.",
  },
  formule: {
    contexte: "Le produit en croix : a correspond à b, et c correspond à ?",
    expression: "? = c × b ÷ a",
    legende: "Je multiplie en diagonale, puis je divise par le nombre qui reste.",
  },
  methode: [
    {
      titre: "Je vérifie",
      micros: ["prop_reconnaitre"],
      texte: "Je divise chaque nombre du bas par celui du haut. Même quotient partout : c'est proportionnel.",
      schema: donnees(["haut", "bas", "bas ÷ haut"], [["4", "10", "2,5"], ["6", "15", "2,5"]]),
    },
    {
      titre: "Je range dans un tableau",
      micros: ["prop_table", "prop_probleme"],
      texte: "Une ligne par grandeur, avec son unité. La case cherchée reste vide.",
      schema: tableauProp(
        [
          ["4", "7"],
          ["10", "?"],
        ],
        [{ row: 1, col: 1 }],
        ["", ""],
        ["litres", "prix (€)"],
      ),
    },
    {
      titre: "Je calcule",
      micros: ["prop_coeff", "prop_quatrieme"],
      texte: "Trois chemins, le même résultat : le coefficient, le prix d'une unité, ou le produit en croix.",
      schema: donnees(
        ["chemin", "calcul"],
        [
          ["coefficient", "7 × 2,5 = 17,5"],
          ["unité", "1 L : 2,5 €, donc 7 L : 17,5 €"],
          ["croix", "7 × 10 ÷ 4 = 17,5"],
        ],
      ),
    },
  ],
  usages: [
    {
      titre: "Reconnaître",
      micros: ["prop_reconnaitre", "prop_graphique"],
      detail: "Dans un tableau : le même quotient partout. Sur un graphique : des points alignés avec l'origine.",
    },
    {
      titre: "Trouver une valeur",
      micros: ["prop_quatrieme", "prop_coeff"],
      detail: "Une seule valeur : le produit en croix. Plusieurs valeurs : le coefficient, calculé une fois.",
    },
    {
      titre: "Écrire la relation",
      micros: ["prop_relation"],
      detail: "Je calcule k une fois, je vérifie sur toutes les colonnes, puis j'écris y = k × x.",
    },
    {
      titre: "Résoudre un problème",
      micros: ["prop_probleme", "prop_defi"],
      detail: "L'énoncé ne dit pas « proportionnel ». Je me demande : si je double l'un, l'autre double-t-il ?",
    },
  ],
  exemples: [
    {
      titre: "Les places de concert",
      micros: ["prop_quatrieme", "prop_probleme"],
      donnees: "4 places de concert coûtent 34 €. Le prix est proportionnel au nombre de places.",
      question: "Combien coûtent 7 places ?",
      schema: tableauProp(
        [
          ["4", "7"],
          ["34", "?"],
        ],
        [{ row: 1, col: 1 }],
        ["", ""],
        ["places", "prix (€)"],
      ),
      solution:
        "Produit en croix : 7 × 34 = 238, puis 238 ÷ 4 = 59,5. Les 7 places coûtent 59,50 €.\n\nContrôle par l'unité : une place coûte 34 ÷ 4 = 8,50 €, et 7 × 8,50 = 59,50 €.",
    },
    {
      titre: "Proportionnel ou pas ?",
      micros: ["prop_reconnaitre", "prop_defi"],
      donnees: "Un canoë se loue 10 € pour le gilet, puis 6 € par heure. 2 h coûtent 22 €, 4 h coûtent 34 €.",
      question: "Le prix est-il proportionnel à la durée ?",
      schema: donnees(["heures", "prix (€)", "prix ÷ heures"], [["2", "22", "11"], ["4", "34", "8,5"]]),
      solution:
        "Non. 22 ÷ 2 = 11, mais 34 ÷ 4 = 8,5. Le quotient change.\n\nLa cause : les 10 € du gilet, payés une seule fois. Ici, pas de produit en croix !",
    },
    {
      titre: "Le prix d'une unité",
      micros: ["prop_coeff", "prop_table"],
      donnees: "6 canettes coûtent 4,20 €.",
      question: "Combien coûtent 10 canettes ?",
      schema: tableauProp(
        [
          ["6", "1", "10"],
          ["4,20", "?", "?"],
        ],
        [
          { row: 1, col: 1 },
          { row: 1, col: 2 },
        ],
        ["", "", ""],
        ["canettes", "prix (€)"],
      ),
      solution: "Une canette : 4,20 ÷ 6 = 0,70 €. Dix canettes : 10 × 0,70 = 7 €.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans un tableau de proportionnalité, 4 correspond à 14. À quoi correspond 10 ?",
      correction: "Le coefficient : 14 ÷ 4 = 3,5. Donc 10 correspond à 10 × 3,5 = 35.",
      micros: ["prop_table", "prop_coeff"],
    },
    {
      question: "Un élève dit : « 3 correspond à 12, donc 5 correspond à 14, car j'ajoute 2. » A-t-il raison ?",
      correction:
        "Non. En proportionnalité, on multiplie, on n'ajoute pas. Le coefficient est 12 ÷ 3 = 4, donc 5 correspond à 5 × 4 = 20.",
      micros: ["prop_reconnaitre", "prop_defi"],
    },
    {
      question: "Un graphique est une droite qui passe par l'origine et par le point (4 ; 6). Est-ce une situation de proportionnalité ? Quel est le coefficient ?",
      correction: "Oui : c'est une droite qui passe par l'origine. Le coefficient est 6 ÷ 4 = 1,5.",
      micros: ["prop_graphique", "prop_coeff"],
    },
    {
      question: "Dans un tableau, x = 3 donne y = 12, x = 5 donne y = 20 et x = 8 donne y = 32. Quelle relation relie y à x ?",
      correction: "12 ÷ 3 = 4, 20 ÷ 5 = 4 et 32 ÷ 8 = 4 : le même coefficient partout. La relation est y = 4 × x.",
      micros: ["prop_relation", "prop_table"],
    },
    {
      question: "Il faut 2,5 kg de farine pour 6 pizzas. Combien en faut-il pour 9 pizzas ?",
      correction: "Produit en croix : 9 × 2,5 = 22,5, puis 22,5 ÷ 6 = 3,75. Il faut 3,75 kg de farine.",
      micros: ["prop_quatrieme", "prop_probleme"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

/** Le mode classe : ENGENDRÉ par la fiche, jamais recopié. */
export const slidesProportionnalite4e = slidesDepuisFiche(ficheProportionnalite4e);
