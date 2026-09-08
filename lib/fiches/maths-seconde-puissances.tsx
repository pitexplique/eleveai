// ─── Fiche de cours : les puissances (2de) ────────────────────────────────────
//
// Sixième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/puissances.bank.ts
// (notion puissances_2de), et sur la 5e comme étalon.
//
// ⭐ PRIORITÉ DONNÉE PAR LE CONTRÔLE COMMUN de mars 2025 : sa question 2.2
// demande d'écrire $B = \dfrac{7^4 \times 7^{-5}}{(7^3)^4}$ sous la forme $7^n$.
// Elle enchaîne les TROIS règles d'un coup — et c'est exactement ce que la
// banque n'entraînait pas : chaque règle y était enseignée séparément, aucun
// énoncé ne les combinait. La micro `puiss_expression_composee` a été écrite le
// 08/09/2026 pour combler ce trou, et cette fiche est bâtie autour d'elle.
//
// ⭐ L'IDÉE DIRECTRICE, ET ELLE EST CONTRE-INTUITIVE POUR L'ÉLÈVE : dans ce
// chapitre, ON NE CALCULE RIEN. La réponse attendue est une puissance, pas un
// nombre. Calculer $7^4 = 2401$ n'avance à rien — la base est la même partout,
// seuls les exposants travaillent. Tout le reste de la fiche en découle.
//
// ⛔ LE PIÈGE CENTRAL : appliquer la règle de la parenthèse au produit. L'élève
// qui écrit $a^5 \times a^3 = a^{15}$ a multiplié au lieu d'additionner.
//
// Micro-compétences couvertes :
// - puiss_calcul                → définition, figure, exemple 1, exos 1-2
// - puiss_produit_quotient      → propriétés « Le produit » et « Le quotient », exos 3-4
// - puiss_puissance_puissance   → propriété « La puissance d'une puissance », exo 5
// - puiss_exposant_negatif      → propriété « L'exposant négatif », exo 6
// - puiss_expression_composee   → méthode entière, exemple 3 (le contrôle), exos 7-8
// - puiss_notation_scientifique → usages, le réel, exemple 4, exos 9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ Un canvas SVG y rendrait ses textes à 4 px : la règle est mesurée.
 *
 * ⛔⛔ ET IL NE PREND QUE DU TEXTE NU, SANS UN SEUL DOLLAR. `TexteMath` ne le
 * traverse jamais : ses textes arrivent en DONNÉES de figure — `headers`,
 * `values`, `label`, `title` — et non en enfants. Écrire « $a^m$ » afficherait
 * les dollars à l'élève. On écrit « aᵐ » en Unicode.
 *
 * ⚠️ Ce chapitre est celui qui souffre le plus de cette règle : tout y est
 * exposant. Les exposants Unicode disponibles sont ⁰¹²³⁴⁵⁶⁷⁸⁹ ⁿ ᵐ ⁺ ⁻ — et
 * c'est assez, à condition de ne jamais écrire ᵖ ni ᵠ, qui manquent ou rendent
 * mal selon la police.
 */
function tableau(
  headers: string[],
  rows: { label: string; values: (string | number)[] }[],
  title?: string,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        title,
        headers,
        rows,
        display: { striped: true, compact: true },
      }}
    />
  );
}

export const fichePuissancesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "puissances-2de",
  titre: "Les puissances",
  accroche:
    "Quatre règles, et un réflexe qui vaut tout le chapitre : quand la base est la même partout, on ne calcule RIEN. On ne touche qu'aux exposants — et la réponse attendue est une puissance, pas un nombre.",
  identite: [
    { label: "Mots clés", valeur: "Base, exposant, produit, quotient, notation scientifique" },
    { label: "Le secret", valeur: "Même base : on ne calcule pas, on compte les exposants" },
    { label: "Outil", valeur: "Les quatre règles, appliquées par étages" },
  ],

  definition: {
    texte:
      "Pour un nombre $a$ et un entier $n > 0$, $a^n$ est le produit de $n$ facteurs égaux à $a$ : $a^5 = a \\times a \\times a \\times a \\times a$. On pose de plus $a^0 = 1$ et, pour $a \\neq 0$, $a^{-n} = \\dfrac{1}{a^n}$. Le nombre $a$ s'appelle la BASE, et $n$ l'EXPOSANT.",
  },

  figure: {
    schema: tableau(
      ["", "aᵐ × aⁿ", "aᵐ ÷ aⁿ", "(aᵐ)ⁿ", "a⁻ⁿ"],
      [{ label: "égale", values: ["aᵐ⁺ⁿ", "aᵐ⁻ⁿ", "aᵐˣⁿ", "1 ÷ aⁿ"] }],
      "Les quatre règles",
    ),
    legende:
      "Trois règles portent sur les exposants — on additionne, on soustrait, on multiplie — et la quatrième dit ce que signifie un exposant négatif. Toutes exigent la MÊME BASE.",
  },

  proprietes: [
    {
      titre: "Le produit : on ADDITIONNE",
      texte:
        "$a^m \\times a^n = a^{m+n}$. On compte les facteurs : $a^3 \\times a^2$, c'est trois $a$ puis deux $a$, donc cinq $a$. ⛔ On n'écrit JAMAIS $a^{6}$ — multiplier les exposants est l'erreur la plus fréquente.",
      schema: tableau(
        ["", "a³ × a²", "juste", "faux"],
        [{ label: "vaut", values: ["aaa × aa", "a⁵", "a⁶"] }],
        "On compte les facteurs, on ne les multiplie pas",
      ),
    },
    {
      titre: "Le quotient : on SOUSTRAIT",
      texte:
        "$\\dfrac{a^m}{a^n} = a^{m-n}$ pour $a \\neq 0$. Les $a$ du bas simplifient ceux du haut. Et la règle marche même quand le bas est plus grand : $\\dfrac{a^2}{a^5} = a^{-3}$.",
      schema: tableau(
        ["", "a⁵ ÷ a²", "a² ÷ a⁵", "a⁴ ÷ a⁴"],
        [{ label: "vaut", values: ["a³", "a⁻³", "a⁰ = 1"] }],
        "Le résultat peut être négatif ou nul",
      ),
    },
    {
      titre: "La puissance d'une puissance : on MULTIPLIE",
      texte:
        "$(a^m)^n = a^{m \\times n}$. C'est ici — et seulement ici — qu'on multiplie les exposants : $(a^2)^3 = a^2 \\times a^2 \\times a^2 = a^6$. ⚠️ Ne pas confondre avec $a^2 \\times a^3 = a^5$.",
      schema: tableau(
        ["", "(a²)³", "a² × a³"],
        [{ label: "vaut", values: ["a⁶", "a⁵"] }],
        "Deux écritures voisines, deux règles opposées",
      ),
    },
    {
      titre: "L'exposant négatif : c'est un INVERSE",
      texte:
        "$a^{-n} = \\dfrac{1}{a^n}$ pour $a \\neq 0$. ⛔ Ce n'est pas un nombre négatif : $2^{-3} = \\dfrac{1}{8}$, qui est positif. Un exposant négatif retourne la fraction, il ne change pas le signe.",
      schema: tableau(
        ["", "2⁻³", "10⁻²", "a⁻¹"],
        [{ label: "vaut", values: ["1/8", "0,01", "1/a"] }],
        "Un inverse, pas un opposé",
      ),
    },
  ],

  reel: {
    texte:
      "Un disque dur de $1$ To contient $10^{12}$ octets ; une photo de téléphone en pèse environ $4 \\times 10^6$. Combien de photos ? $\\dfrac{10^{12}}{4 \\times 10^6} = \\dfrac{1}{4} \\times 10^{6} = 2{,}5 \\times 10^5$, soit $250\\,000$ photos. Sans les puissances, il aurait fallu poser une division à treize chiffres — c'est exactement pour cela que l'informatique, l'astronomie et la physique ne comptent qu'en puissances de $10$.",
  },

  historique: {
    texte:
      "Archimède, au IIIᵉ siècle avant notre ère, écrit L'Arénaire pour démontrer qu'on peut compter les grains de sable de l'univers : faute d'exposants, il invente un système d'« ordres » de nombres. Il faudra attendre Descartes et sa Géométrie, en 1637, pour que l'exposant s'écrive comme aujourd'hui, en petit et en haut à droite. Les exposants négatifs, eux, sont l'œuvre de Wallis et de Newton, au siècle suivant.",
  },

  methode: [
    {
      titre: "Je vérifie que la base est la même",
      texte:
        "Les quatre règles ne fonctionnent QUE sur une base commune. $2^3 \\times 3^2$ ne se réduit pas — les bases diffèrent, il n'y a rien à faire des exposants.",
      schema: tableau(
        ["", "7⁴ × 7⁻⁵", "2³ × 3²"],
        [{ label: "on réduit ?", values: ["oui", "non"] }],
      ),
    },
    {
      titre: "Je réduis par étages",
      texte:
        "Le numérateur d'un côté, le dénominateur de l'autre, chacun ramené à une seule puissance. On ne mélange les deux qu'à la fin.",
      schema: tableau(
        ["étage", "haut", "bas"],
        [{ label: "réduit à", values: ["7⁴ × 7⁻⁵ = 7⁻¹", "(7³)⁴ = 7¹²"] }],
      ),
    },
    {
      titre: "Je soustrais, et je m'arrête",
      texte:
        "$\\dfrac{7^{-1}}{7^{12}} = 7^{-1-12} = 7^{-13}$. ⭐ Et on s'ARRÊTE : la question demandait $7^n$, pas une valeur décimale.",
      schema: tableau(
        ["", "n", "à calculer ?"],
        [{ label: "réponse", values: ["−13", "non"] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Réduire une expression",
      detail:
        "C'est la question type du contrôle : ramener une expression à la forme $a^n$. On enchaîne les règles, on ne calcule jamais.",
      schema: tableau(
        ["", "(a²)³ × a⁴", "a⁵ × a³ ÷ a²"],
        [{ label: "vaut", values: ["a¹⁰", "a⁶"] }],
        "La réponse est une puissance",
      ),
    },
    {
      titre: "Écrire en notation scientifique",
      detail:
        "Un nombre s'écrit $a \\times 10^n$ avec $1 \\leqslant a < 10$ — un seul chiffre avant la virgule, et pas $0$. Cette condition rend l'écriture UNIQUE.",
      schema: tableau(
        ["", "45 300", "0,000 72"],
        [{ label: "s'écrit", values: ["4,53 × 10⁴", "7,2 × 10⁻⁴"] }],
        "Un seul chiffre devant la virgule",
      ),
    },
    {
      titre: "Comparer des ordres de grandeur",
      detail:
        "L'ordre de grandeur, c'est la puissance de $10$ toute seule. Elle suffit pour comparer : $10^{-27}$ et $10^{-9}$ sont séparés par un facteur mille milliards.",
      schema: tableau(
        ["", "atome H", "cheveu", "Terre-Soleil"],
        [{ label: "ordre", values: ["10⁻²⁷ kg", "10⁻⁴ m", "10¹¹ m"] }],
        "Trois échelles du monde",
      ),
    },
  ],

  exemples: [
    {
      titre: "Lire une puissance",
      donnees: "$(-2)^4$ et $-2^4$.",
      question: "Ces deux écritures donnent-elles le même nombre ?",
      schema: tableau(
        ["", "(−2)⁴", "−2⁴"],
        [{ label: "vaut", values: ["16", "−16"] }],
      ),
      solution:
        "Non. Dans $(-2)^4$, la parenthèse dit que c'est $-2$ qui est élevé à la puissance $4$ : $(-2)\\times(-2)\\times(-2)\\times(-2) = 16$. Dans $-2^4$, seul le $2$ est élevé, et le signe reste devant : $-16$. ⭐ La parenthèse n'est pas décorative, elle dit QUI est la base.",
    },
    {
      titre: "Produit et quotient",
      donnees: "$\\dfrac{a^7 \\times a^3}{a^4}$ avec $a \\neq 0$.",
      question: "Simplifier.",
      schema: tableau(
        ["", "haut", "puis"],
        [{ label: "réduit", values: ["a⁷ × a³ = a¹⁰", "a¹⁰ ÷ a⁴ = a⁶"] }],
      ),
      solution:
        "On réduit d'abord le haut : $a^7 \\times a^3 = a^{7+3} = a^{10}$. Puis on soustrait l'exposant du bas : $\\dfrac{a^{10}}{a^4} = a^{10-4} = a^6$.",
    },
    {
      titre: "La question du contrôle",
      donnees: "$B = \\dfrac{7^4 \\times 7^{-5}}{\\left(7^3\\right)^4}$.",
      question: "Écrire $B$ sous la forme $7^n$.",
      schema: tableau(
        ["", "haut", "bas", "B"],
        [{ label: "vaut", values: ["7⁻¹", "7¹²", "7⁻¹³"] }],
      ),
      solution:
        "Haut : $7^4 \\times 7^{-5} = 7^{4-5} = 7^{-1}$. Bas : $\\left(7^3\\right)^4 = 7^{3 \\times 4} = 7^{12}$. Donc $B = \\dfrac{7^{-1}}{7^{12}} = 7^{-1-12} = 7^{-13}$. ⭐ Les trois règles se suivent, et on ne calcule aucune valeur : $n = -13$.",
    },
    {
      titre: "Notation scientifique",
      donnees: "$0{,}000\\,58$.",
      question: "Écrire ce nombre en notation scientifique.",
      schema: tableau(
        ["", "mantisse", "rangs", "écriture"],
        [{ label: "0,000 58", values: ["5,8", "4", "5,8 × 10⁻⁴"] }],
      ),
      solution:
        "On place la virgule après le premier chiffre non nul : $5{,}8$. Elle a avancé de $4$ rangs, et le nombre est plus petit que $1$, donc l'exposant est $-4$ : $0{,}000\\,58 = 5{,}8 \\times 10^{-4}$. ⚠️ $58 \\times 10^{-5}$ vaut bien le même nombre, mais ce n'est PAS la notation scientifique — $58$ n'est pas entre $1$ et $10$.",
    },
  ],

  pieges: [
    "⛔ $a^m \\times a^n = a^{m+n}$, on ADDITIONNE. Écrire $a^5 \\times a^3 = a^{15}$, c'est appliquer au produit la règle de la parenthèse — l'erreur numéro un du chapitre.",
    "⛔ Un exposant négatif ne donne pas un nombre négatif. $2^{-3} = \\dfrac{1}{8}$, c'est un INVERSE, pas un opposé.",
    "⛔ Les règles exigent la MÊME BASE. $2^3 \\times 3^2$ ne se réduit pas : on ne peut ni additionner ni multiplier les exposants, il faut calculer $8 \\times 9 = 72$.",
    "⛔ $(-2)^4 = 16$ mais $-2^4 = -16$. La parenthèse dit qui est la base.",
    "⛔ On ne calcule pas la valeur quand la réponse demandée est $a^n$. $7^{-13}$ est la réponse ; le décimal correspondant n'a aucun intérêt et fait perdre des points.",
    "⛔ $45{,}3 \\times 10^3$ n'est pas de la notation scientifique : il faut exactement un chiffre avant la virgule, et il ne doit pas être $0$.",
  ],

  aRetenir: [
    "$a^m \\times a^n = a^{m+n}$ — on additionne.",
    "$\\dfrac{a^m}{a^n} = a^{m-n}$ — on soustrait.",
    "$(a^m)^n = a^{m \\times n}$ — on multiplie, et c'est le seul cas.",
    "$a^{-n} = \\dfrac{1}{a^n}$ et $a^0 = 1$ (avec $a \\neq 0$).",
    "Une expression composée se réduit PAR ÉTAGES : le haut, le bas, puis la soustraction.",
    "Notation scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$.",
  ],

  entrainement: [
    {
      question: "Combien vaut $3^4$ ?",
      correction:
        "$3 \\times 3 \\times 3 \\times 3 = 81$. ⚠️ Ce n'est pas $3 \\times 4 = 12$ : l'exposant compte les facteurs, il ne multiplie pas.",
    },
    {
      question: "Combien valent $(-3)^2$ et $-3^2$ ?",
      correction:
        "$(-3)^2 = 9$ car la base est $-3$. Mais $-3^2 = -9$ : seul le $3$ est élevé au carré, le signe reste devant.",
    },
    {
      question: "Simplifier $a^6 \\times a^5$ (avec $a \\neq 0$).",
      correction:
        "On additionne : $a^{6+5} = a^{11}$. ⛔ Pas $a^{30}$ — on ne multiplie les exposants que dans $(a^m)^n$.",
    },
    {
      question: "Simplifier $\\dfrac{a^3}{a^8}$ (avec $a \\neq 0$).",
      correction:
        "On soustrait : $a^{3-8} = a^{-5}$. L'exposant négatif est normal ici, il signifie $\\dfrac{1}{a^5}$.",
    },
    {
      question: "Simplifier $\\left(a^4\\right)^3$ (avec $a \\neq 0$).",
      correction:
        "On multiplie : $a^{4 \\times 3} = a^{12}$. C'est le seul cas où les exposants se multiplient.",
    },
    {
      question: "Combien vaut $5^{-2}$ ?",
      correction:
        "$5^{-2} = \\dfrac{1}{5^2} = \\dfrac{1}{25} = 0{,}04$. C'est un nombre POSITIF, plus petit que $1$.",
    },
    {
      question: "Écrire $\\dfrac{2^5 \\times 2^{-3}}{\\left(2^2\\right)^4}$ sous la forme $2^n$.",
      correction:
        "Haut : $2^{5-3} = 2^2$. Bas : $2^{2 \\times 4} = 2^8$. Donc $2^{2-8} = 2^{-6}$, soit $n = -6$.",
    },
    {
      question: "Un élève écrit $\\dfrac{a^5 \\times a^3}{a^2} = a^{7{,}5}$. Où est l'erreur ?",
      correction:
        "Il a multiplié $5 \\times 3$ puis divisé par $2$. Il fallait ADDITIONNER puis SOUSTRAIRE : $\\dfrac{a^8}{a^2} = a^6$. Un exposant issu de ces règles est toujours entier.",
    },
    {
      question: "Écrire $73\\,000$ en notation scientifique.",
      correction:
        "$7{,}3 \\times 10^4$. La virgule recule de $4$ rangs, donc l'exposant vaut $4$.",
    },
    {
      question: "Écrire $0{,}0046$ en notation scientifique, puis donner son ordre de grandeur.",
      correction:
        "$4{,}6 \\times 10^{-3}$ : la virgule avance de $3$ rangs et le nombre est plus petit que $1$, d'où l'exposant négatif. Son ordre de grandeur est $10^{-3}$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesPuissancesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Puissances - 2de",
    section: {
      type: "objectif",
      phrase: "Réduire une expression à la forme $a^n$, sans jamais la calculer",
      sousPhrase:
        "Quatre règles sur les exposants — additionner, soustraire, multiplier, inverser — et une base qui doit rester la même.",
    },
  },
];
