// ─── Fiche de cours : multiples, diviseurs et nombres premiers (2de) ──────────
//
// Dix-huitième fiche de seconde (21/09/2026). Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank.ts (notion
// arithmetique_entiers). Écrite APRÈS sa feuille d'exercices
// (lib/fiches-exercices/maths-seconde-arithmetique.tsx), dans l'ordre demandé
// par Frédéric. ⛔ Aucun calcul de la feuille n'est repris ici.
//
// ⭐ L'IDÉE DIRECTRICE : TOUT SE DIT PAR UNE ÉGALITÉ. « 8 divise 56 » veut dire
// 56 = 8 × 7 ; « pair » veut dire 2k ; « premier » veut dire « seulement 1 × n ».
// Et la décomposition en facteurs premiers est l'outil qui répond à tout le
// reste : diviseurs communs, fractions irréductibles, partages.
//
// ⭐ LA DÉMONSTRATION DU BO (« la somme de deux multiples de a est un multiple
// de a ») est une propriété de la fiche, faite avec des lettres. L'autre (« le
// carré d'un impair est impair ») est dans la feuille, exercice 9.
//
// ⭐ Les sigles PGCD et PPCM ne sont pas écrits : « le plus grand diviseur
// commun », « le plus petit multiple commun ». Écrire simplement.
//
// Micro-compétences couvertes :
// - arith_multiple_diviseur     → définition, figure, propriétés 1-3 et 6, exemples 1 et 4, exos 1-3, 9
// - arith_nombre_premier        → propriétés 4-5, méthode 2-3, exemple 2, exos 4-7
// - arith_fraction_irreductible → propriété 7, usage 3, exemple 3, exo 8
// - arith_probleme              → usages 1-2, le réel, exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/** Un tableau HTML : lisible partout, même dans un bloc de 80 px.
 *  ⛔ Du texte NU, sans dollar. ⛔ Deux colonnes de valeurs au plus. */
function tableau(
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
  title?: string,
) {
  return (
    <CanvasRenderer
      figure={{ kind: "tableau_donnees", title, headers, rows, display: { striped: true, compact: true } }}
    />
  );
}

export const ficheArithmetiqueSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "arithmetique-entiers",
  titre: "Multiples, diviseurs et nombres premiers",
  accroche:
    "Un nombre entier se décompose en nombres premiers, comme une molécule en atomes. Multiples, diviseurs, fractions irréductibles : tout le chapitre se lit dans cette décomposition. Et chaque affirmation se justifie par une égalité.",
  identite: [
    { label: "Mots clés", valeur: "Multiple, diviseur, pair, impair, nombre premier, fraction irréductible" },
    { label: "Le secret", valeur: "« 8 divise 56 », c'est l'égalité 56 = 8 × 7" },
    { label: "Outil", valeur: "La décomposition en facteurs premiers" },
  ],

  definition: {
    texte:
      "Soient $a$ et $b$ deux entiers. On dit que $b$ est un DIVISEUR de $a$, et que $a$ est un MULTIPLE de $b$, s'il existe un entier $k$ tel que $a = b \\times k$. Un entier est PAIR s'il s'écrit $2k$, IMPAIR s'il s'écrit $2k + 1$. Un nombre PREMIER est un entier qui a exactement deux diviseurs : $1$ et lui-même.",
  },

  figure: {
    schema: tableau(
      ["on multiplie par", "et on obtient"],
      [
        { label: "1", values: ["30", "30"] },
        { label: "2", values: ["15", "30"] },
        { label: "3", values: ["10", "30"] },
        { label: "5", values: ["6", "30"] },
      ],
      "Les diviseurs de 30, par paires",
    ),
    legende:
      "Les diviseurs de $30$ vont par paires : $1 \\times 30$, $2 \\times 15$, $3 \\times 10$, $5 \\times 6$. On s'arrête quand les deux facteurs se rejoignent. Il y en a $8$ : $1$, $2$, $3$, $5$, $6$, $10$, $15$ et $30$.",
  },

  proprietes: [
    {
      titre: "Multiple et diviseur : la même égalité",
      texte:
        "$56 = 8 \\times 7$ dit trois choses à la fois : $8$ divise $56$, $7$ divise $56$, et $56$ est un multiple de $8$ et de $7$. Pour justifier, on écrit l'égalité, pas une impression.",
      schema: tableau(
        ["divise 56 ?", "l'égalité"],
        [
          { label: "8", values: ["oui", "56 = 8 × 7"] },
          { label: "6", values: ["non", "56 = 6 × 9 + 2"] },
        ],
        "Un reste nul, ou pas",
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Pair et impair",
      texte:
        "Un entier PAIR s'écrit $2k$ ; un entier IMPAIR s'écrit $2k + 1$, avec $k$ entier. $38 = 2 \\times 19$ est pair. $55 = 2 \\times 27 + 1$ est impair. Ces écritures servent à DÉMONTRER, pas seulement à reconnaître.",
      schema: tableau(
        ["s'écrit", "donc"],
        [
          { label: "38", values: ["2 × 19", "pair"] },
          { label: "55", values: ["2 × 27 + 1", "impair"] },
        ],
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Les critères de divisibilité",
      texte:
        "Par $2$, $5$ ou $10$ : on regarde le dernier chiffre. Par $4$ : les deux derniers chiffres. Par $3$ ou $9$ : la somme des chiffres. Pour $7\\,245$ : il finit par $5$, et $7 + 2 + 4 + 5 = 18$. Il est donc divisible par $5$, par $3$ et par $9$.",
      schema: tableau(
        ["on regarde", "7 245 ?"],
        [
          { label: "par 5", values: ["le dernier chiffre : 5", "oui"] },
          { label: "par 9", values: ["la somme : 18", "oui"] },
          { label: "par 4", values: ["les deux derniers : 45", "non"] },
        ],
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Les nombres premiers",
      texte:
        "Un nombre premier n'a que deux diviseurs : $1$ et lui-même. Les premiers sont $2$, $3$, $5$, $7$, $11$, $13$, $17$, $19$, $23$, $29$… Le nombre $1$ n'est PAS premier : il n'a qu'un seul diviseur. Et $2$ est le seul nombre premier pair.",
      schema: tableau(
        ["diviseurs", "premier ?"],
        [
          { label: "13", values: ["1 et 13", "oui"] },
          { label: "15", values: ["1, 3, 5, 15", "non"] },
          { label: "1", values: ["1", "non"] },
        ],
      ),
      micros: ["arith_nombre_premier"],
    },
    {
      titre: "Décomposer en facteurs premiers",
      texte:
        "Tout entier plus grand que $1$ s'écrit comme un produit de nombres premiers, d'une seule façon. On divise par le plus petit premier possible, et on recommence. $72 = 2 \\times 2 \\times 2 \\times 3 \\times 3 = 2^3 \\times 3^2$.",
      schema: tableau(
        ["on divise par", "il reste"],
        [
          { label: "72", values: ["2", "36"] },
          { label: "36", values: ["2", "18"] },
          { label: "18", values: ["2", "9"] },
          { label: "9", values: ["3", "3"] },
          { label: "3", values: ["3", "1"] },
        ],
        "72 = 2³ × 3²",
      ),
      micros: ["arith_nombre_premier"],
    },
    {
      titre: "La somme de deux multiples",
      texte:
        "La somme de deux multiples de $a$ est un multiple de $a$. PREUVE : deux multiples de $a$ s'écrivent $a \\times k$ et $a \\times m$. Leur somme vaut $a \\times k + a \\times m = a \\times (k + m)$, et $k + m$ est un entier. Par exemple, $15 + 40 = 55 = 5 \\times 11$.",
      schema: tableau(
        ["s'écrit", "multiple de 5 ?"],
        [
          { label: "15", values: ["5 × 3", "oui"] },
          { label: "40", values: ["5 × 8", "oui"] },
          { label: "15 + 40", values: ["5 × 11", "oui"] },
        ],
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Rendre une fraction irréductible",
      texte:
        "Une fraction est IRRÉDUCTIBLE quand son numérateur et son dénominateur n'ont plus aucun diviseur commun, sauf $1$. On décompose les deux nombres, et on divise par ce qu'ils ont en commun. $72 = 2^3 \\times 3^2$ et $150 = 2 \\times 3 \\times 5^2$ ont en commun $2 \\times 3 = 6$ : $\\dfrac{72}{150} = \\dfrac{12}{25}$.",
      schema: tableau(
        ["décomposition", "÷ 6"],
        [
          { label: "72", values: ["2³ × 3²", "12"] },
          { label: "150", values: ["2 × 3 × 5²", "25"] },
        ],
        "Ce qui est commun : 2 × 3",
      ),
      micros: ["arith_fraction_irreductible"],
    },
  ],

  reel: {
    texte:
      "Quand tu paies en ligne, tes données sont protégées par des nombres premiers. Multiplier deux nombres premiers de plusieurs centaines de chiffres est facile pour un ordinateur. Mais retrouver ces deux nombres à partir de leur produit lui demanderait des milliers d'années. C'est sur cette différence que repose le chiffrement des cartes bancaires et des messageries.",
  },

  historique: {
    texte:
      "Vers 300 avant notre ère, Euclide démontre qu'il y a une infinité de nombres premiers : sa preuve tient en quelques lignes et on l'enseigne encore. À la même époque, Ératosthène invente un « crible » pour les trouver : on écrit les nombres, puis on barre les multiples de $2$, de $3$, de $5$… Ceux qui restent sont premiers.",
  },

  methode: [
    {
      titre: "1. Je cherche les diviseurs par paires",
      texte:
        "J'essaie $1$, $2$, $3$… et j'écris chaque paire. Je m'arrête quand les deux facteurs se rejoignent.",
      schema: tableau(["×", "= 20"], [
        { label: "1", values: ["20", "✓"] },
        { label: "2", values: ["10", "✓"] },
        { label: "4", values: ["5", "✓"] },
      ]),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "2. Je teste un nombre premier",
      texte:
        "Je divise par $2$, $3$, $5$, $7$… jusqu'à la racine carrée du nombre. Si aucune division ne tombe juste, il est premier.",
      micros: ["arith_nombre_premier"],
    },
    {
      titre: "3. Je décompose jusqu'au bout",
      texte:
        "Je divise par le plus petit premier possible, puis je recommence avec le quotient, jusqu'à obtenir $1$.",
      micros: ["arith_nombre_premier"],
    },
    {
      titre: "4. Je démontre avec une lettre",
      texte:
        "Un pair : $2k$. Un impair : $2k + 1$. Un multiple de $a$ : $a \\times k$. Je calcule, puis je reconnais la forme cherchée.",
      micros: ["arith_multiple_diviseur"],
    },
  ],

  usages: [
    {
      titre: "Partager sans reste",
      detail:
        "Faire des paquets identiques avec tout, le plus possible : on cherche le PLUS GRAND DIVISEUR COMMUN. Avec $24$ et $36$ : $12$ paquets.",
      schema: tableau(["décomposition", "commun"], [
        { label: "24", values: ["2³ × 3", "2² × 3"] },
        { label: "36", values: ["2² × 3²", "= 12"] },
      ]),
      micros: ["arith_probleme"],
    },
    {
      titre: "Attendre que deux cycles se retrouvent",
      detail:
        "Deux événements qui reviennent tous les $6$ et tous les $8$ jours se retrouvent après le PLUS PETIT MULTIPLE COMMUN : $24$ jours.",
      schema: tableau(["ses multiples", "commun"], [
        { label: "6", values: ["6, 12, 18, 24", "24"] },
        { label: "8", values: ["8, 16, 24", "24"] },
      ]),
      micros: ["arith_probleme"],
    },
    {
      titre: "Simplifier une fraction",
      detail: "On décompose, puis on divise par tout ce qui est commun, en une seule fois.",
      schema: tableau(["décomposition", "après"], [
        { label: "72", values: ["2³ × 3²", "12"] },
        { label: "150", values: ["2 × 3 × 5²", "25"] },
      ]),
      micros: ["arith_fraction_irreductible"],
    },
  ],

  exemples: [
    {
      titre: "Tous les diviseurs",
      donnees: "Le nombre $40$.",
      question: "Donner tous ses diviseurs.",
      schema: tableau(["×", "= 40"], [
        { label: "1", values: ["40", "✓"] },
        { label: "2", values: ["20", "✓"] },
        { label: "4", values: ["10", "✓"] },
        { label: "5", values: ["8", "✓"] },
      ]),
      solution:
        "Par paires : $1 \\times 40$, $2 \\times 20$, $4 \\times 10$, $5 \\times 8$. Ni $3$, ni $6$, ni $7$ ne divisent $40$. Les diviseurs sont $1$, $2$, $4$, $5$, $8$, $10$, $20$ et $40$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Premier ou pas ?",
      donnees: "Le nombre $119$.",
      question: "Est-il premier ?",
      schema: tableau(["reste", "divise ?"], [
        { label: "÷ 2", values: ["1", "non"] },
        { label: "÷ 3", values: ["2", "non"] },
        { label: "÷ 5", values: ["4", "non"] },
        { label: "÷ 7", values: ["0", "oui"] },
      ]),
      solution:
        "$\\sqrt{119} \\approx 10{,}9$ : on essaie $2$, $3$, $5$ et $7$. Les trois premiers ne tombent pas juste, mais $119 = 7 \\times 17$. Il n'est donc pas premier, même s'il en a l'air.",
      micros: ["arith_nombre_premier"],
    },
    {
      titre: "Décomposer pour simplifier",
      donnees: "La fraction $\\dfrac{168}{180}$.",
      question: "La rendre irréductible.",
      schema: tableau(["décomposition", "÷ 12"], [
        { label: "168", values: ["2³ × 3 × 7", "14"] },
        { label: "180", values: ["2² × 3² × 5", "15"] },
      ]),
      solution:
        "$168 = 2^3 \\times 3 \\times 7$ et $180 = 2^2 \\times 3^2 \\times 5$. Ils ont en commun $2^2 \\times 3 = 12$. Donc $\\dfrac{168}{180} = \\dfrac{14}{15}$, et $14 = 2 \\times 7$ n'a plus rien en commun avec $15 = 3 \\times 5$.",
      micros: ["arith_fraction_irreductible", "arith_nombre_premier"],
    },
    {
      titre: "Démontrer",
      donnees: "Deux nombres pairs.",
      question: "Démontrer que leur somme est paire.",
      schema: tableau(["s'écrit", "pair ?"], [
        { label: "1er nombre", values: ["2a", "oui"] },
        { label: "2e nombre", values: ["2b", "oui"] },
        { label: "somme", values: ["2(a + b)", "oui"] },
      ]),
      solution:
        "Deux nombres pairs s'écrivent $2a$ et $2b$, avec $a$ et $b$ entiers. Leur somme vaut $2a + 2b = 2(a + b)$ : c'est $2$ fois un entier, donc un nombre pair. ⭐ On prend deux lettres différentes : sinon on ne parlerait que de deux nombres égaux.",
      micros: ["arith_multiple_diviseur"],
    },
  ],

  pieges: [
    "$1$ n'est pas premier : il n'a qu'un seul diviseur.",
    "Un nombre impair n'est pas forcément premier : $9$, $15$, $21$, $119$ sont impairs et ne sont pas premiers.",
    "La somme des chiffres dit la divisibilité par $3$ et par $9$, jamais par $4$ ou par $6$.",
    "Décomposer jusqu'au bout : $12 = 4 \\times 3$ n'est pas fini, car $4$ n'est pas premier. On écrit $12 = 2^2 \\times 3$.",
    "Un exemple n'est pas une preuve. Pour démontrer, on écrit les nombres avec une lettre.",
  ],

  aRetenir: [
    "$b$ divise $a$ quand $a = b \\times k$, avec $k$ entier.",
    "Pair : $2k$. Impair : $2k + 1$.",
    "Premier : exactement deux diviseurs, $1$ et lui-même. $1$ n'est pas premier.",
    "Tout entier plus grand que $1$ se décompose en facteurs premiers, d'une seule façon.",
    "Partager : le plus grand diviseur commun. Se retrouver : le plus petit multiple commun.",
  ],

  entrainement: [
    {
      question: "$144$ est-il un multiple de $12$ ?",
      correction: "Oui : $144 = 12 \\times 12$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "Donner tous les diviseurs de $28$.",
      correction: "Par paires : $1 \\times 28$, $2 \\times 14$, $4 \\times 7$. Les diviseurs sont $1$, $2$, $4$, $7$, $14$ et $28$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "$5\\,832$ est-il divisible par $9$ ?",
      correction: "$5 + 8 + 3 + 2 = 18$, qui est divisible par $9$. Donc oui : $5\\,832 = 9 \\times 648$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "$61$ est-il premier ?",
      correction: "$\\sqrt{61} \\approx 7{,}8$. $61$ n'est divisible ni par $2$, ni par $3$, ni par $5$, ni par $7$ : il est premier.",
      micros: ["arith_nombre_premier"],
    },
    {
      question: "$87$ est-il premier ?",
      correction: "Non : $8 + 7 = 15$ est divisible par $3$, et $87 = 3 \\times 29$.",
      micros: ["arith_nombre_premier"],
    },
    {
      question: "Décomposer $100$ en produit de facteurs premiers.",
      correction: "$100 = 2 \\times 2 \\times 5 \\times 5 = 2^2 \\times 5^2$.",
      micros: ["arith_nombre_premier"],
    },
    {
      question: "Décomposer $132$ en produit de facteurs premiers.",
      correction: "$132 = 2 \\times 66 = 2 \\times 2 \\times 33 = 2^2 \\times 3 \\times 11$.",
      micros: ["arith_nombre_premier"],
    },
    {
      question: "Rendre $\\dfrac{45}{75}$ irréductible.",
      correction: "$45 = 3^2 \\times 5$ et $75 = 3 \\times 5^2$. En commun : $3 \\times 5 = 15$. Donc $\\dfrac{45}{75} = \\dfrac{3}{5}$.",
      micros: ["arith_fraction_irreductible"],
    },
    {
      question: "Démontrer que le produit d'un nombre pair par un entier quelconque est pair.",
      correction: "Un nombre pair s'écrit $2k$. Multiplié par un entier $m$ : $2k \\times m = 2 \\times (km)$, et $km$ est un entier. Le produit est pair.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "Avec $24$ billes et $36$ calots, on fait des sachets identiques, le plus possible, sans rien laisser. Combien de sachets, et que contient chacun ?",
      correction: "On cherche le plus grand diviseur commun de $24$ et $36$ : $12$. On fait $12$ sachets de $2$ billes et $3$ calots.",
      micros: ["arith_probleme"],
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesArithmetiqueSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Multiples et nombres premiers - 2de",
    section: {
      type: "objectif",
      phrase: "Justifier par une égalité, et décomposer en nombres premiers",
      sousPhrase:
        "« 8 divise 56 » s'écrit 56 = 8 × 7. La décomposition répond au reste : diviseurs communs, fractions irréductibles, partages.",
    },
  },
];
