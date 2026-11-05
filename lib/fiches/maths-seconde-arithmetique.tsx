// ─── Fiche de cours : multiples, diviseurs, pair et impair (2de) ───────────────
//
// Dix-huitième fiche de seconde (21/09/2026). Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/arithmetique-entiers.bank.ts (notion
// arithmetique_entiers). Écrite APRÈS sa feuille d'exercices
// (lib/fiches-exercices/maths-seconde-arithmetique.tsx), dans l'ordre demandé
// par Frédéric. ⛔ Aucun calcul de la feuille n'est repris ici.
//
// ⛔ 05/11/2026 : le programme de seconde 2026 (annexe, BO n°14 du 02/04/2026)
// arrête l'arithmétique à multiple, diviseur, pair, impair. Les nombres premiers
// et la décomposition sont retirés de la fiche, à la demande de Frédéric.
//
// ⭐ L'IDÉE DIRECTRICE : TOUT SE DIT PAR UNE ÉGALITÉ. « 8 divise 56 » veut dire
// 56 = 8 × 7 ; « pair » veut dire 2k ; « impair » veut dire 2k + 1. Les critères
// de divisibilité évitent de poser la division, et servent à simplifier.
//
// ⭐ LA DÉMONSTRATION DU BO (« la somme de deux multiples de a est un multiple
// de a ») est une propriété de la fiche, faite avec des lettres. L'autre (« le
// carré d'un impair est impair ») est dans la feuille, exercice 9.
//
// ⭐ Les sigles PGCD et PPCM ne sont pas écrits : « le plus grand diviseur
// commun », « le plus petit multiple commun ». Écrire simplement.
//
// Micro-compétences couvertes :
// - arith_multiple_diviseur     → définition, figure, propriétés 1-6, méthode 1, 2 et 4, exemples 1, 2 et 4, exos 1-7, 9
// - arith_fraction_irreductible → propriété 7, méthode 3, usage 3, exemple 3, exo 8
// - arith_probleme              → usages 1-2, exo 10

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
  titre: "Multiples, diviseurs, pair et impair",
  accroche:
    "Pair, multiple, diviseur : derrière chacun de ces mots, il y a une égalité. Les critères de divisibilité évitent de poser la division, une fraction se simplifie jusqu'au bout, et chaque affirmation se justifie par un calcul.",
  identite: [
    { label: "Mots clés", valeur: "Multiple, diviseur, pair, impair, critère de divisibilité, fraction irréductible" },
    { label: "Le secret", valeur: "« 8 divise 56 », c'est l'égalité 56 = 8 × 7" },
    { label: "Outil", valeur: "Les critères de divisibilité" },
  ],

  definition: {
    texte:
      "Soient $a$ et $b$ deux entiers. On dit que $b$ est un DIVISEUR de $a$, et que $a$ est un MULTIPLE de $b$, s'il existe un entier $k$ tel que $a = b \\times k$. Un entier est PAIR s'il s'écrit $2k$, IMPAIR s'il s'écrit $2k + 1$.",
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
        ["on regarde", "oui ?"],
        [
          { label: "par 5", values: ["le dernier chiffre : 5", "oui"] },
          { label: "par 9", values: ["la somme : 18", "oui"] },
          { label: "par 4", values: ["les deux derniers : 45", "non"] },
        ],
        "Le nombre 7 245",
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Pair et impair dans les calculs",
      texte:
        "Une somme est paire quand ses deux termes sont de même nature : $7 + 9 = 16$ et $4 + 6 = 10$. Un produit est pair dès qu'un de ses facteurs est pair : seul un impair fois un impair reste impair, comme $7 \\times 9 = 63$.",
      schema: tableau(
        ["somme", "produit"],
        [
          { label: "pair, pair", values: ["pair", "pair"] },
          { label: "pair, impair", values: ["impair", "pair"] },
          { label: "impair, impair", values: ["pair", "impair"] },
        ],
      ),
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Le diviseur d'un diviseur",
      texte:
        "Si $a$ divise $b$ et si $b$ divise $c$, alors $a$ divise $c$. PREUVE : $b = a \\times k$ et $c = b \\times m$, donc $c = a \\times (k \\times m)$, et $k \\times m$ est un entier. Par exemple, $6$ divise $18$ et $18$ divise $90$, donc $6$ divise $90$.",
      schema: tableau(
        ["l'égalité", "vrai ?"],
        [
          { label: "6 divise 18", values: ["18 = 6 × 3", "oui"] },
          { label: "18 divise 90", values: ["90 = 18 × 5", "oui"] },
          { label: "6 divise 90", values: ["90 = 6 × 15", "oui"] },
        ],
      ),
      micros: ["arith_multiple_diviseur"],
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
        "Une fraction est IRRÉDUCTIBLE quand son numérateur et son dénominateur n'ont plus aucun diviseur commun, sauf $1$. On divise les deux nombres par un même diviseur, et on recommence tant qu'on peut. $\\dfrac{72}{150} = \\dfrac{36}{75} = \\dfrac{12}{25}$ : on a divisé par $2$, puis par $3$.",
      schema: tableau(
        ["÷ 2", "puis ÷ 3"],
        [
          { label: "72", values: ["36", "12"] },
          { label: "150", values: ["75", "25"] },
        ],
        "On recommence tant qu'on peut",
      ),
      micros: ["arith_fraction_irreductible"],
    },
  ],

  reel: {
    texte:
      "Sous le code-barres d'un produit, il y a $13$ chiffres, et le dernier ne sert qu'à vérifier les autres. La caisse multiplie un chiffre sur deux par $3$, puis additionne tout : le total doit être un multiple de $10$. Si un seul chiffre est mal lu, le total n'en est plus un, et la caisse refuse le produit.",
  },

  historique: {
    texte:
      "Vers 300 avant notre ère, les Éléments d'Euclide démontrent déjà que la somme de nombres pairs est paire, et que le produit de deux nombres impairs est impair. Le même livre donne une méthode pour trouver le plus grand diviseur commun : on retire le plus petit nombre du plus grand, et on recommence. Avec $24$ et $36$ : $12$ et $24$, puis $12$ et $12$. C'est $12$.",
  },

  methode: [
    {
      titre: "Je cherche les diviseurs par paires",
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
      titre: "Je regarde les critères avant de diviser",
      texte:
        "Le dernier chiffre pour $2$, $5$ et $10$. Les deux derniers pour $4$. La somme des chiffres pour $3$ et $9$. Pour un autre nombre, je pose la division et je regarde le reste.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Je simplifie jusqu'au bout",
      texte:
        "Je divise le numérateur et le dénominateur par un même diviseur, puis je recommence, jusqu'à ce que seul $1$ les divise tous les deux.",
      micros: ["arith_fraction_irreductible"],
    },
    {
      titre: "Je démontre avec une lettre",
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
      schema: tableau(["ses plus grands diviseurs", "commun"], [
        { label: "24", values: ["24, 12", "12"] },
        { label: "36", values: ["36, 18, 12", "12"] },
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
      detail: "$\\dfrac{60}{84} = \\dfrac{15}{21} = \\dfrac{5}{7}$ : on divise par un diviseur commun, puis on recommence, jusqu'à ce que seul $1$ reste en commun.",
      schema: tableau(["÷ 4", "puis ÷ 3"], [
        { label: "60", values: ["15", "5"] },
        { label: "84", values: ["21", "7"] },
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
      titre: "Divisible ou pas ?",
      donnees: "Le nombre $3\\,492$.",
      question: "Est-il divisible par $2$ ? par $5$ ? par $4$ ? par $9$ ?",
      schema: tableau(["on regarde", "oui ?"], [
        { label: "par 2", values: ["le dernier chiffre : 2", "oui"] },
        { label: "par 5", values: ["le dernier chiffre : 2", "non"] },
        { label: "par 4", values: ["les deux derniers : 92", "oui"] },
        { label: "par 9", values: ["la somme : 18", "oui"] },
      ], "Le nombre 3 492"),
      solution:
        "Il finit par $2$ : divisible par $2$, pas par $5$. Ses deux derniers chiffres forment $92 = 4 \\times 23$ : divisible par $4$. La somme de ses chiffres vaut $3 + 4 + 9 + 2 = 18$ : divisible par $9$. Et en effet, $3\\,492 = 9 \\times 388$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      titre: "Simplifier en plusieurs fois",
      donnees: "La fraction $\\dfrac{168}{180}$.",
      question: "La rendre irréductible.",
      schema: tableau(["÷ 2, puis ÷ 2", "puis ÷ 3"], [
        { label: "168", values: ["42", "14"] },
        { label: "180", values: ["45", "15"] },
      ]),
      solution:
        "Les deux nombres sont pairs, deux fois de suite : $\\dfrac{168}{180} = \\dfrac{84}{90} = \\dfrac{42}{45}$. Les sommes des chiffres, $6$ et $9$, sont divisibles par $3$ : $\\dfrac{42}{45} = \\dfrac{14}{15}$. Les diviseurs de $14$ sont $1$, $2$, $7$, $14$, ceux de $15$ sont $1$, $3$, $5$, $15$ : seul $1$ est commun, c'est fini.",
      micros: ["arith_fraction_irreductible"],
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
    "$1$ et le nombre lui-même sont toujours des diviseurs : ne les oublie pas dans la liste.",
    "$0$ est pair : il s'écrit $2 \\times 0$.",
    "La somme des chiffres dit la divisibilité par $3$ et par $9$, jamais par $4$ ou par $6$.",
    "Simplifier jusqu'au bout : $\\dfrac{18}{24} = \\dfrac{9}{12}$ n'est pas fini, car $9$ et $12$ sont encore divisibles par $3$. On écrit $\\dfrac{3}{4}$.",
    "Un exemple n'est pas une preuve. Pour démontrer, on écrit les nombres avec une lettre.",
  ],

  aRetenir: [
    "$b$ divise $a$ quand $a = b \\times k$, avec $k$ entier.",
    "Pair : $2k$. Impair : $2k + 1$.",
    "Par $2$, $5$ ou $10$ : le dernier chiffre. Par $4$ : les deux derniers. Par $3$ ou $9$ : la somme des chiffres.",
    "Une fraction est irréductible quand seul $1$ divise à la fois son numérateur et son dénominateur.",
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
      question: "$2\\,715$ est-il divisible par $5$ ? par $3$ ? par $9$ ?",
      correction: "Il finit par $5$ : oui par $5$. $2 + 7 + 1 + 5 = 15$ : oui par $3$, non par $9$. En effet, $2\\,715 = 5 \\times 543 = 3 \\times 905$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "$87$ a-t-il d'autres diviseurs que $1$ et $87$ ?",
      correction: "Oui : $8 + 7 = 15$ est divisible par $3$, et $87 = 3 \\times 29$. $3$ et $29$ sont donc aussi des diviseurs de $87$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "Donner tous les diviseurs de $100$.",
      correction: "Par paires : $1 \\times 100$, $2 \\times 50$, $4 \\times 25$, $5 \\times 20$, $10 \\times 10$. Les diviseurs sont $1$, $2$, $4$, $5$, $10$, $20$, $25$, $50$ et $100$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "$132$ est-il divisible par $4$ ? par $6$ ?",
      correction: "Ses deux derniers chiffres forment $32 = 4 \\times 8$ : oui par $4$, et $132 = 4 \\times 33$. Oui par $6$ aussi : $132 = 6 \\times 22$.",
      micros: ["arith_multiple_diviseur"],
    },
    {
      question: "Rendre $\\dfrac{45}{75}$ irréductible.",
      correction: "Les deux finissent par $5$ : $\\dfrac{45}{75} = \\dfrac{9}{15}$. Puis $9$ et $15$ sont divisibles par $3$ : $\\dfrac{9}{15} = \\dfrac{3}{5}$.",
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
    badge: "Multiples et diviseurs - 2de",
    section: {
      type: "objectif",
      phrase: "Justifier par une égalité, et simplifier jusqu'au bout",
      sousPhrase:
        "« 8 divise 56 » s'écrit 56 = 8 × 7. Les critères de divisibilité font le reste : diviseurs communs, fractions irréductibles, partages.",
    },
  },
];
