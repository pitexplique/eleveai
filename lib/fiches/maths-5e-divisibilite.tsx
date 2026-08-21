// ─── Fiche de cours : multiples, diviseurs et divisibilité (5e) ────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/divisibilite.bank.ts (notionId divisibilite).
//
// ⚠️ LE DÉFI DE CETTE NOTION : elle n'a rien de géométrique, et pourtant tout s'y
// dessine. Un multiple, c'est un RECTANGLE qui se ferme (42 cases rangées en
// 6 × 7) ; un critère de divisibilité par 3, c'est une SOMME DE CHIFFRES qu'on
// met bout à bout ; lister des diviseurs, c'est un TABLEAU de paires. Trois
// canvas du coach, trois idées différentes — le pire aurait été de tout écrire.
//
// Micro-compétences couvertes (les 5 de la notion) :
// - div_multiple_diviseur → définition + figure (42 = 6 × 7 en rectangle),
//                           propriété « Multiple et diviseur », exemple 1,
//                           entraînements 1 et 2
// - div_critere_2_5_10    → propriété « Par 2, 5 et 10 », exemple 2 (375),
//                           entraînement 3
// - div_critere_3_9       → propriété « Par 3 et 9 », exemple 3 (4 152),
//                           entraînement 4
// - div_lister_diviseurs  → propriété « Lister les diviseurs », exemple 4 (24),
//                           méthode, entraînement 5
// - div_defi              → pièges (13 se termine par 3 mais n'est pas divisible
//                           par 3) + défi
//
// Les nombres sont CEUX DE LA BANQUE : 7 × 6 = 42, 375, 4 152, 13, les
// diviseurs de 24.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⭐ UN MULTIPLE EST UN RECTANGLE QUI SE FERME. 42 jetons se rangent en 6 lignes
// de 7 sans qu'il en reste : c'est exactement ce que veut dire « 42 est un
// multiple de 7 ». Le canvas `figure_libre` dessine la grille remplie.
const rectangle = (lignes: number, colonnes: number) => {
  const cases: [number, number][] = [];
  for (let r = 0; r < lignes; r++) for (let c = 0; c < colonnes; c++) cases.push([r, c]);
  return (
    <CanvasRenderer
      figure={{
        kind: "figure_libre",
        grid: { rows: lignes, cols: colonnes, filledCells: cases },
        display: { showGrid: true, showFilled: true, showPerimeter: true },
      }}
    />
  );
};

// Un rectangle qui NE se ferme pas : 13 cases, une dernière ligne incomplète.
// C'est le dessin du reste — donc de la non-divisibilité.
const rectangleIncomplet = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: {
        rows: 5,
        cols: 3,
        filledCells: [
          [0, 0], [0, 1], [0, 2],
          [1, 0], [1, 1], [1, 2],
          [2, 0], [2, 1], [2, 2],
          [3, 0], [3, 1], [3, 2],
          [4, 0],
        ],
      },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
    }}
  />
);

// La somme des chiffres, mise bout à bout : les parts sont à l'échelle de leur
// valeur, donc 4 + 1 + 5 + 2 se voit vraiment faire 12.
const sommeChiffres = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "4 152 : la somme de ses chiffres",
      total: "12",
      parts: [
        { label: "4", value: "4" },
        { label: "1", value: "1" },
        { label: "5", value: "5" },
        { label: "2", value: "2" },
      ],
      questionLabel: "12 est dans la table de 3 → 4 152 est divisible par 3.",
      size: { width: 340, height: 175 },
    }}
  />
);

// Les diviseurs vont PAR PAIRES : c'est ce qui garantit qu'on n'en oublie
// aucun, et un tableau le montre mieux qu'une liste.
const paires = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les diviseurs de 24, par paires",
      headers: ["On multiplie", "…par", "et on obtient"],
      rows: [
        { label: "1", values: ["24", "24"] },
        { label: "2", values: ["12", "24"] },
        { label: "3", values: ["8", "24"] },
        { label: "4", values: ["6", "24"] },
      ],
      display: { striped: true },
    }}
  />
);

// Le dernier chiffre décide, et lui seul : un tableau le dit d'un coup d'œil.
const dernierChiffre = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le dernier chiffre suffit",
      headers: ["Divisible par", "si le nombre se termine par"],
      rows: [
        { label: "2", values: ["0, 2, 4, 6 ou 8"] },
        { label: "5", values: ["0 ou 5"] },
        { label: "10", values: ["0"] },
      ],
      display: { striped: true },
    }}
  />
);

const pieges = [
  "Regarder le dernier chiffre pour la divisibilité par 3 : 13 se termine par 3 et n'est PAS divisible par 3 (1 + 3 = 4).",
  "Confondre multiple et diviseur : 42 est un multiple de 7, et 7 est un diviseur de 42.",
  "Oublier que tout nombre est divisible par 1 et par lui-même.",
];

const aRetenir = [
  "a est un multiple de b quand la division a ÷ b tombe juste (reste 0) ; b est alors un diviseur de a.",
  "Par 2, 5 ou 10 : seul le dernier chiffre décide.",
  "Par 3 ou 9 : on additionne les chiffres, et on regarde cette somme.",
];

export const ficheDivisibilite5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "divisibilite",
  titre: "Multiples, diviseurs et divisibilité",
  accroche:
    "Un multiple, c'est un nombre de jetons qui se range en rectangle plein. Reconnaître ces nombres au premier regard, sans poser la division : c'est tout l'objet des critères de divisibilité.",
  identite: [
    { label: "Mots clés", valeur: "Multiple, diviseur, reste, critère" },
    { label: "Le secret", valeur: "La division tombe juste : le reste vaut 0" },
    { label: "Outil", valeur: "Le dernier chiffre, ou la somme des chiffres" },
  ],
  definition: {
    texte:
      "Un nombre a est un multiple d'un nombre b lorsque la division de a par b tombe juste, c'est-à-dire que son reste vaut 0. On dit alors aussi que b est un diviseur de a. Puisque 7 × 6 = 42, le nombre 42 est un multiple de 7 (et de 6), et 7 est un diviseur de 42.",
  },
  figure: {
    schema: rectangle(6, 7),
    legende:
      "42 cases rangées en 6 lignes de 7, sans qu'il en reste une seule : voilà pourquoi 42 est un multiple de 7.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis) — et quatre canvas
  // différents, parce que ces quatre idées n'ont rien en commun : un rectangle
  // qui se ferme, un tableau de dernières décimales, une somme de chiffres mise
  // bout à bout, un tableau de paires.
  proprietes: [
    {
      titre: "Multiple et diviseur",
      texte: "Deux mots pour la même égalité : 42 = 7 × 6, donc 42 est un multiple de 7 et 7 un diviseur de 42.",
      schema: rectangle(6, 7),
    },
    {
      titre: "Par 2, 5 et 10",
      texte: "Seul le dernier chiffre décide, quelle que soit la taille du nombre.",
      schema: dernierChiffre,
    },
    {
      titre: "Par 3 et 9",
      texte: "On additionne les chiffres : si la somme est dans la table de 3 (ou de 9), le nombre l'est aussi.",
      schema: sommeChiffres,
    },
    {
      titre: "Lister les diviseurs",
      texte: "On cherche par paires, à partir de 1, jusqu'à ce que les deux nombres se croisent.",
      schema: paires,
    },
  ],
  reel: {
    texte:
      "Les diviseurs servent dès qu'il faut partager sans casser : répartir 24 élèves en équipes égales, ranger des chaises en rangées complètes, découper une plaque de gâteau en parts identiques. Un nombre premier de convives, et il restera toujours quelqu'un à part.",
  },
  historique: {
    texte:
      "Le crible d'Ératosthène, imaginé il y a plus de 2200 ans à Alexandrie, cherchait déjà les nombres qui n'ont aucun diviseur en dehors de 1 et d'eux-mêmes : les nombres premiers. Aujourd'hui, ce sont eux qui protègent les paiements sur Internet.",
  },
  formule: {
    contexte: "Multiple et diviseur",
    expression: "a = b × k",
    legende:
      "S'il existe un entier k tel que a = b × k, alors a est un multiple de b, et b est un diviseur de a. Exemple : 42 = 7 × 6.",
    schema: rectangle(6, 7),
  },
  methode: [
    {
      titre: "Je regarde le dernier chiffre",
      texte: "Il répond tout de suite pour 2, 5 et 10.",
      schema: dernierChiffre,
    },
    {
      titre: "J'additionne les chiffres",
      texte: "Pour 3 et 9, c'est cette somme qu'il faut regarder, pas le nombre lui-même.",
      schema: sommeChiffres,
    },
    {
      titre: "Je cherche par paires",
      texte: "1 et le nombre, 2 et sa moitié… jusqu'à ce que les deux se rejoignent.",
      schema: paires,
    },
  ],
  usages: [
    {
      titre: "Reconnaître un multiple",
      detail: "La division tombe juste : les jetons forment un rectangle plein.",
      schema: rectangle(4, 5),
    },
    {
      titre: "Trancher sans calculer",
      detail: "Les critères répondent au premier regard, sans poser la division.",
      schema: dernierChiffre,
    },
    {
      titre: "Partager en parts égales",
      detail: "Les diviseurs d'un nombre sont toutes les façons de le partager sans reste.",
      schema: paires,
    },
  ],
  exemples: [
    {
      titre: "Multiple ou diviseur ?",
      donnees: "On sait que 7 × 6 = 42.",
      question: "Que peut-on dire de 42 et de 7 ?",
      schema: rectangle(6, 7),
      solution:
        "42 est un multiple de 7 (et de 6), et 7 est un diviseur de 42. Les 42 cases se rangent en 6 lignes de 7 sans reste.",
    },
    {
      titre: "Le nombre 375",
      donnees: "Le nombre 375.",
      question: "Est-il divisible par 2 ? par 5 ?",
      schema: dernierChiffre,
      solution:
        "Il se termine par 5 : il n'est donc PAS divisible par 2 (il faudrait 0, 2, 4, 6 ou 8), mais il est divisible par 5.",
    },
    {
      titre: "Le nombre 4 152",
      donnees: "Le nombre 4 152.",
      question: "Est-il divisible par 3 ? Sans poser la division.",
      schema: sommeChiffres,
      solution:
        "J'additionne les chiffres : 4 + 1 + 5 + 2 = 12. Or 12 est dans la table de 3, donc 4 152 est divisible par 3. (12 n'est pas dans la table de 9 : il n'est donc pas divisible par 9.)",
    },
    {
      titre: "Tous les diviseurs de 24",
      donnees: "Le nombre 24.",
      question: "Quels sont tous ses diviseurs ?",
      schema: paires,
      solution:
        "Je cherche par paires : 1 × 24, 2 × 12, 3 × 8, 4 × 6. Après 4, les nombres se croisent. Les diviseurs de 24 sont donc 1, 2, 3, 4, 6, 8, 12 et 24.",
    },
    {
      titre: "Le piège du 13",
      donnees: "Le nombre 13, qui se termine par 3.",
      question: "Est-il divisible par 3 ?",
      schema: rectangleIncomplet,
      solution:
        "Non. Le dernier chiffre ne dit rien pour 3 : il faut additionner les chiffres, et 1 + 3 = 4, qui n'est pas dans la table de 3. Sur le dessin, la dernière ligne reste incomplète : il reste 1.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Zéro est-il un multiple de 7 ?",
      correction: "Oui : 0 = 7 × 0, et la division 0 ÷ 7 tombe juste. Zéro est un multiple de tous les nombres.",
    },
    {
      question: "Quel nombre est un diviseur de TOUS les nombres entiers ?",
      correction: "Le nombre 1 : tout nombre a s'écrit a = 1 × a.",
    },
    {
      question: "Un nombre se termine par 0. Par lesquels est-il forcément divisible ?",
      correction: "Par 2, par 5 et par 10 à la fois — c'est le seul dernier chiffre qui réunit les trois critères.",
    },
    {
      question: "Le nombre 738 est-il divisible par 9 ?",
      correction:
        "7 + 3 + 8 = 18, qui est dans la table de 9. Donc oui, 738 est divisible par 9 — et par 3 du même coup.",
    },
    {
      question: "Liste tous les diviseurs de 18.",
      correction: "Par paires : 1 × 18, 2 × 9, 3 × 6. Les diviseurs sont 1, 2, 3, 6, 9 et 18.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

// ⚠️ Le mode classe est ENGENDRÉ depuis la fiche (lib/fiches/slidesDepuisFiche).
// Ce tableau n'est plus lu : il ne sert qu'à dire « cette fiche se projette ».
export const slidesDivisibilite5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Divisibilité - 5e",
    section: {
      type: "objectif",
      phrase: "Reconnaître un multiple sans poser la division",
      sousPhrase: "Un multiple, c'est un nombre de jetons qui se range en rectangle plein.",
    },
  },
];
