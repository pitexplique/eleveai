// ─── Fiche de cours : les fractions plus grandes que 1 (CM2) ────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/fractions-superieures.bank.ts, notionId
// `fraction_mixte`. CM2 = 10-11 ans : peu de mots, un dessin du coach par bloc.
//
// ⭐ TOUT REPOSE SUR UNE SEULE RELATION, comme dans la banque : d/d = 1. Quatre
// quarts font un entier. Ensuite, c'est la TABLE du bas qui fait le travail :
// 58/7 = 56/7 + 2/7 = 8 + 2/7 (exemple de réussite du BO). Une fraction plus
// grande que 1 ne tient pas dans un disque : elle se voit sur la DROITE, ou en
// barres bout à bout.
// ⛔ Pas d'addition de deux fractions ici : c'est la fiche `fraction-calcul`.
//
// Micro-compétences 3/3 (le champ `micros` de chaque bloc fait foi) :
// - fraction_mixte_ecrire    → définition + figure (7/4 = 4/4 + 3/4), propriété 1
//                              (4/4 = 1), propriété 2 (58/7 = 8 + 2/7), réflexe 1
//                              (la table de 7), usages 1-2, exemple 1 (7/4),
//                              entraînements 1, 2
// - fraction_mixte_regrouper → propriété 3 (3 = 12/4, 3 + 1/4 = 13/4), propriété 4
//                              (2 + 3/5 = 13/5, le bas ne change pas), réflexe 2,
//                              exemple 2 (13/4), entraînements 3, 4
// - fraction_encadrer        → propriété 5 (7/3 entre 2 et 3), réflexe 3 (la table
//                              de 8 pour 43/8), usage 3 (ranger 4/3, 7/3, 10/3),
//                              exemple 3 (43/8), défi (9/2 n'est pas entre 9 et 10),
//                              entraînement 5 (58/7)
// Tous les nombres sortent de la banque (items fixes et gabarits).
//
// ⛔ AUCUN LATEX : « 7/4 » partout. ⚠️ Les droites sont graduées à l'ENTIER
// (comme la banque) : au-delà, les valeurs des graduations se chevauchent.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const BLEU = "#3b82f6";
const VERT = "#10b981";
const ORANGE = "#f59e0b";
const ROUGE = "#dc2626";

type Frac = { numerator: number; denominator: number; label?: string; color?: string };
type Point = { value: number; label: string; color: string };

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** Deux barres l'une sous l'autre : l'entier plein, puis le reste. */
const comparer = (a: Frac, b: Frac) => (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "compare", fractions: [a, b], size: { width: 250, height: 210 } }}
  />
);

/** Un disque plein : d/d = 1. */
const disque = (f: Frac) => (
  <CanvasRenderer figure={{ kind: "fraction", model: "circle", fraction: f, size: { width: 250, height: 200 } }} />
);

/** La droite graduée À L'ENTIER, le point posé entre deux. */
const droite = (min: number, max: number, points: Point[]) => (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min,
      max,
      step: 1,
      points,
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 90 },
    }}
  />
);

/** Des barres bout à bout, à la mesure de leur valeur. */
const barres = (
  total: string,
  parts: { label: string; value: string; color?: string }[],
  question: string
) => (
  <CanvasRenderer
    figure={{ kind: "schema_barre", total, parts, questionLabel: question, size: { width: 230, height: 200 } }}
  />
);

/** Un tableau à deux colonnes (jamais trois : il doit tenir sur un téléphone). */
const tableau = (title: string, headers: [string, string], rows: [string, string][]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title,
      headers,
      rows: rows.map((values) => ({ values })),
      highlight: { col: 1 },
    }}
  />
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : 7/4, c'est un entier plein (4/4) et 3/4 (banque : 7/4 = 1 + 3/4).
const septQuarts = comparer(
  { numerator: 4, denominator: 4, label: "4/4 = 1", color: BLEU },
  { numerator: 3, denominator: 4, label: "3/4", color: VERT }
);

// PROPRIÉTÉ 1 : 4 quarts font 1 (banque : « combien de quarts pour 1 entier ? »).
const quatreQuarts = legende(disque({ numerator: 4, denominator: 4, label: "4/4 = 1", color: ORANGE }), "4 quarts : un entier");

// PROPRIÉTÉ 2 : 58/7 = 56/7 + 2/7 (banque, exemple de réussite du BO).
const cinquanteHuitSeptiemes = barres(
  "58/7",
  [
    { label: "56/7 = 8 entiers", value: "56", color: BLEU },
    { label: "2/7", value: "2", color: VERT },
  ],
  "58/7 = 8 + 2/7"
);

// PROPRIÉTÉ 3 : 3 = 12/4, plus 1/4 : 13/4 (banque).
const treizeQuarts = barres(
  "13/4",
  [
    { label: "4/4", value: "4", color: BLEU },
    { label: "4/4", value: "4", color: BLEU },
    { label: "4/4", value: "4", color: BLEU },
    { label: "1/4", value: "1", color: VERT },
  ],
  "4 + 4 + 4 + 1 = 13 quarts"
);

// PROPRIÉTÉ 4 : tout se compte en cinquièmes, avant comme après (banque).
const enCinquiemes = tableau("2 + 3/5", ["Je compte", "En cinquièmes"], [
  ["2 entiers", "10/5"],
  ["3/5", "3/5"],
  ["En tout", "13/5"],
]);

// PROPRIÉTÉ 5 : 7/3 est entre 2 et 3 (banque).
const septTiers = legende(droite(0, 4, [{ value: 7 / 3, label: "7/3", color: VERT }]), "7/3 est entre 2 et 3");

// RÉFLEXE 1 : la table de 7 pour 58/7 (banque).
const tableDe7 = tableau("58/7 : la table de 7", ["La table", "Je garde ?"], [
  ["7 × 7 = 49", "oui, moins que 58"],
  ["7 × 8 = 56", "oui, moins que 58"],
  ["7 × 9 = 63", "non, plus que 58"],
]);

// RÉFLEXE 2 : 2 × 5 = 10, puis 10 + 3 = 13 : 13/5 est entre 2 et 3.
const treizeCinquiemes = legende(droite(0, 3, [{ value: 2.6, label: "13/5", color: BLEU }]), "2 + 3/5 = 13/5");

// RÉFLEXE 3 : la table de 8 pour 43/8 (banque).
const tableDe8 = tableau("43/8 : la table de 8", ["La table", "Donc"], [
  ["8 × 5 = 40", "5 entiers, reste 3"],
  ["8 × 6 = 48", "trop grand"],
]);

// USAGE 1 : le cross de l'école, 11/4 km (gabarit de la banque).
const cross = legende(droite(0, 3, [{ value: 2.75, label: "11/4", color: VERT }]), "11/4 km = 2 km et 3/4 de km");

// USAGE 2 : une bouteille de 3/2 L.
const bouteille = legende(
  comparer(
    { numerator: 2, denominator: 2, label: "2/2 = 1 L", color: BLEU },
    { numerator: 1, denominator: 2, label: "1/2 L", color: VERT }
  ),
  "3/2 L = 1 L et 1/2 L"
);

// USAGE 3 : ranger 4/3, 7/3, 10/3 (banque : laquelle est entre 2 et 3 ?).
const rangerTiers = legende(
  droite(0, 4, [
    { value: 4 / 3, label: "4/3", color: BLEU },
    { value: 7 / 3, label: "7/3", color: VERT },
    { value: 10 / 3, label: "10/3", color: ORANGE },
  ]),
  "Une fraction par case entre deux entiers"
);

// EXEMPLES
const septQuartsDroite = droite(0, 2, [{ value: 1.75, label: "7/4", color: VERT }]);
const treizeQuartsDroite = droite(0, 4, [{ value: 3.25, label: "13/4", color: BLEU }]);
const quaranteTroisHuitiemes = droite(3, 7, [{ value: 43 / 8, label: "43/8", color: VERT }]);
// LE DÉFI : 9/2 est entre 4 et 5, pas entre 9 et 10.
const neufDemis = droite(0, 10, [
  { value: 4.5, label: "9/2", color: VERT },
  { value: 9.5, label: "pas ici", color: ROUGE },
]);

const pieges = [
  "Croire qu'une fraction est toujours plus petite que 1. 7/4 dépasse 1.",
  "Chercher 9/2 près de 9. 9/2 = 4 + 1/2 : il est entre 4 et 5.",
  "Changer le bas en regroupant. 2 + 3/5 = 13/5, pas 13/10.",
];

const aRetenir = [
  "Le bas compte les parts d'un entier : 4/4 = 1.",
  "Pour sortir les entiers, j'utilise la table du bas.",
  "Une fraction plus grande que 1 est entre deux entiers qui se suivent.",
];

export const ficheFractionMixteCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "fraction-mixte",
  titre: "Les fractions plus grandes que 1",
  accroche:
    "On a mangé plus qu'une pizza ? Une fraction peut dépasser 1. On l'écrit alors avec des entiers et un reste.",
  identite: [
    { label: "Mots clés", valeur: "Entier, fraction, encadrer" },
    { label: "Le secret", valeur: "4 quarts font 1 entier" },
    { label: "Outil", valeur: "La table du bas et la droite graduée" },
  ],
  definition: {
    texte:
      "Une fraction dépasse 1 quand le haut est plus grand que le bas. On peut l'écrire comme un entier plus une fraction : 7/4 = 1 + 3/4.",
  },
  figure: {
    schema: septQuarts,
    legende: "7/4 = 4/4 + 3/4 = 1 + 3/4.",
  },
  proprietes: [
    {
      titre: "Un entier en parts",
      micros: ["fraction_mixte_ecrire"],
      texte: "4 quarts font 1. 7 septièmes font 1. 8 huitièmes font 1.",
      schema: quatreQuarts,
    },
    {
      titre: "Sortir les entiers",
      micros: ["fraction_mixte_ecrire"],
      texte: "Je cherche combien d'entiers tiennent dedans. 58/7 = 56/7 + 2/7 = 8 + 2/7.",
      schema: cinquanteHuitSeptiemes,
    },
    {
      titre: "Regrouper",
      micros: ["fraction_mixte_regrouper"],
      texte: "Un entier se change en parts. 3 = 12/4, donc 3 + 1/4 = 13/4.",
      schema: treizeQuarts,
    },
    {
      titre: "Le bas ne change pas",
      micros: ["fraction_mixte_regrouper"],
      texte: "Je compte tout dans la même part. 2 + 3/5 = 10/5 + 3/5 = 13/5.",
      schema: enCinquiemes,
    },
    {
      titre: "Encadrer",
      micros: ["fraction_encadrer"],
      texte: "Une fraction plus grande que 1 est entre deux entiers qui se suivent. 2 < 7/3 < 3.",
      schema: septTiers,
    },
  ],
  reel: {
    texte:
      "Au cross de l'école, on court 11/4 km : 2 km et 3/4. Une bouteille de 3/2 L, c'est 1 L et demi. Une recette demande 5/2 kg de pommes : 2 kg et demi.",
  },
  historique: {
    texte:
      "Les Égyptiens écrivaient déjà « 2 et 1/2 » il y a 4 000 ans. Ils mettaient l'entier d'abord, puis le morceau qui reste. On fait pareil aujourd'hui.",
  },
  methode: [
    {
      titre: "Je récite la table du bas",
      micros: ["fraction_mixte_ecrire"],
      texte: "Pour 58/7, je récite la table de 7. Je m'arrête juste avant 58 : 7 × 8 = 56.",
      schema: tableDe7,
    },
    {
      titre: "Je multiplie, puis j'ajoute",
      micros: ["fraction_mixte_regrouper"],
      texte: "2 + 3/5 : 2 × 5 = 10, puis 10 + 3 = 13. Donc 13/5.",
      schema: treizeCinquiemes,
    },
    {
      titre: "Je trouve les deux entiers",
      micros: ["fraction_encadrer"],
      texte: "43/8 = 5 + 3/8. Donc 43/8 est entre 5 et 6.",
      schema: tableDe8,
    },
  ],
  usages: [
    {
      titre: "Courir",
      micros: ["fraction_mixte_ecrire"],
      detail: "Lou court 11/4 km au cross. 8/4 = 2, il reste 3/4 : 2 km et 3/4.",
      schema: cross,
    },
    {
      titre: "Lire une bouteille",
      micros: ["fraction_mixte_ecrire"],
      detail: "Une bouteille de 3/2 L : 2/2 = 1 L, plus 1/2 L.",
      schema: bouteille,
    },
    {
      titre: "Ranger",
      micros: ["fraction_encadrer"],
      detail: "4/3 est entre 1 et 2. 7/3 entre 2 et 3. 10/3 entre 3 et 4.",
      schema: rangerTiers,
    },
  ],
  exemples: [
    {
      titre: "Écrire avec un entier",
      micros: ["fraction_mixte_ecrire"],
      donnees: "Le point A est à 7/4.",
      question: "Complète : 7/4 = 1 + …/4.",
      schema: septQuartsDroite,
      solution: "4/4 = 1. Il reste 7 − 4 = 3 quarts. Donc 7/4 = 1 + 3/4.",
    },
    {
      titre: "Une seule fraction",
      micros: ["fraction_mixte_regrouper"],
      donnees: "On a 3 + 1/4.",
      question: "Écris-le avec une seule fraction : 3 + 1/4 = …/4.",
      schema: treizeQuartsDroite,
      solution: "3 entiers = 3 × 4 = 12 quarts. 12 + 1 = 13. Donc 3 + 1/4 = 13/4.",
    },
    {
      titre: "Encadrer",
      micros: ["fraction_encadrer"],
      donnees: "La fraction 43/8.",
      question: "Entre quels entiers qui se suivent se trouve-t-elle ?",
      schema: quaranteTroisHuitiemes,
      solution: "8 × 5 = 40 et 8 × 6 = 48. 43 est entre 40 et 48. Donc 43/8 est entre 5 et 6.",
    },
    {
      titre: "Le défi",
      micros: ["fraction_encadrer"],
      donnees: "Un élève dit : « 9/2 est entre 9 et 10. »",
      question: "Où est son erreur ?",
      schema: neufDemis,
      solution: "9/2, ce sont 9 demis, pas 9 entiers. 2 demis font 1, donc 8/2 = 4. 9/2 = 4 + 1/2 : entre 4 et 5.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Combien de quarts faut-il pour faire 1 entier ?",
      correction: "4 quarts : 4/4 = 1.",
      micros: ["fraction_mixte_ecrire"],
    },
    {
      question: "Écris 58/7 comme un entier plus une fraction.",
      correction: "7 × 8 = 56. 58 − 56 = 2. Donc 58/7 = 8 + 2/7.",
      micros: ["fraction_mixte_ecrire"],
    },
    {
      question: "Complète : 3 = …/4.",
      correction: "1 = 4/4. 3 entiers : 3 × 4 = 12. Donc 3 = 12/4.",
      micros: ["fraction_mixte_regrouper"],
    },
    {
      question: "Écris 2 + 3/5 avec une seule fraction.",
      correction: "2 × 5 = 10 cinquièmes. 10 + 3 = 13. Donc 2 + 3/5 = 13/5. Le bas reste 5.",
      micros: ["fraction_mixte_regrouper"],
    },
    {
      question: "Entre quels entiers qui se suivent se trouve 58/7 ?",
      correction: "58/7 = 8 + 2/7. Donc 58/7 est entre 8 et 9.",
      micros: ["fraction_encadrer"],
    },
  ],
  tiMargo: {
    objectif: "Une fraction peut dépasser 1 !",
    definition: "4 quarts, ça fait 1 entier !",
    methode: "La table du bas fait tout le travail !",
    pieges: "9/2, ce sont 9 demis, pas 9 entiers !",
    retenir: "Le bas ne change jamais quand je regroupe !",
    exercice: "À toi ! Récite la table de 7.",
  },
  coachHref: "/coach-ia/maths?classe=cm2",
};

// ⛔ Le mode classe est engendré par la fiche (`slidesDepuisFiche`) : la page
// passe encore ce tableau, il reste court (même patron que la fiche de 6e).
export const slidesFractionMixteCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions plus grandes que 1 - CM2",
    teinte: "objectif",
    schema: avecMargo(septQuarts, "4 quarts, ça fait 1 entier !", "joie"),
    section: {
      type: "objectif",
      phrase: "Écrire une fraction avec des entiers",
      sousPhrase: "7/4 = 4/4 + 3/4 = 1 + 3/4.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(neufDemis, "9/2, ce sont 9 demis, pas 9 entiers !", "attention"),
    section: { type: "etapes", etapes: pieges },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(tableDe7, "À toi ! Récite la table de 7.", "joie"),
    section: {
      type: "exercice",
      enonce: "La fraction 58/7.",
      question: "Écris-la comme un entier plus une fraction.",
      indice: "Cherche dans la table de 7 le nombre juste avant 58.",
      correction: "7 × 8 = 56, il reste 2. Donc 58/7 = 8 + 2/7.",
    },
  },
];
