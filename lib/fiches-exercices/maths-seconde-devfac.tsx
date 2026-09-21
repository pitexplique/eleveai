// ─── Fiche d'exercices : développement et factorisation (seconde) — 20 exercices
//
// Troisième feuille du bloc « Nombres et calculs » (21/09/2026). Alignée sur la
// banque `lib/tutor-v4/questionBank/seconde/maths/developpement-factorisation.bank.ts`
// (notionId developpement_factorisation_2de) et sur la fiche de cours
// `lib/fiches/maths-seconde-devfac.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni (3x + 2)(x + 5), ni
// 7 − (2x + 5), ni x² − 36, ni 5x² − 20x = 0, ni ses dix exercices.
//
// ⭐⭐ LE FIL, CELUI DE FRÉDÉRIC (10/09/2026) : « surtout explique bien que
// c'est pour RÉSOUDRE une équation produit nul ». On factorise parce qu'un
// produit nul se résout, et qu'une somme ne se résout pas. Les exercices 8, 15,
// 16 et 20 le font travailler, et deux pièges le nomment : diviser par x (ou
// par une parenthèse) fait PERDRE une solution.
//
// ⛔ LE PIÈGE CENTRAL, le même que la fiche : le signe moins devant une
// parenthèse change TOUS les termes (exercices 2, 9, 11).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-devfac.mjs` — chaque
// forme du corrigé est lue telle qu'elle est écrite, évaluée en fractions
// exactes en neuf valeurs de x, et comparée à l'expression de l'énoncé.
//
// Micro-compétences : devfac_developper_simple (1, 2, 9, 10),
// devfac_developper_double (3, 4, 9, 10, 14, 17, 18, 19, 20),
// devfac_facteur_commun (5, 6, 11, 12, 16, 19), devfac_factoriser_identite (7,
// 13, 20), devfac_choisir_forme (8, 15, 16, 17, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ Deux colonnes de valeurs, jamais trois, et du texte NU (x², pas `$`).
const tableau = (
  title: string,
  headers: [string, string],
  rows: { label: string; values: [string, string] }[],
) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows }} />
  </div>
);

export const exercicesDevfacSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "developpement-factorisation-2de",
  titre: "Développer et factoriser",
  accroche:
    "Vingt exercices, du calcul seul au problème : développer, factoriser, et surtout choisir la bonne forme pour résoudre une équation. Une terrasse, un cadre photo, un programme de calcul. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/developpement-factorisation-2de", titre: "Développement et factorisation" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On vérifie en refaisant le chemin inverse.",
      rappel: [
        "DÉVELOPPER, c'est transformer un produit en somme : $k(a + b) = ka + kb$, et $(a + b)(c + d) = ac + ad + bc + bd$ — quatre produits.",
        "FACTORISER, c'est l'inverse : on repère ce qui est commun à tous les termes et on le met devant. $ka + kb = k(a + b)$.",
        "PRODUIT NUL : un produit est nul si et seulement si l'un de ses facteurs est nul.",
      ],
      exercices: [
        {
          enonce: "Développer.\na) $5(x - 2)$\nb) $-3(2x + 4)$\nc) $x(x - 7)$\nd) $2x(3x + 1)$",
          correction:
            "On multiplie le facteur de devant par CHAQUE terme de la parenthèse.\na) $5(x - 2) = 5 \\times x - 5 \\times 2 = 5x - 10$.\nb) $-3(2x + 4) = -3 \\times 2x - 3 \\times 4 = -6x - 12$.\nc) $x(x - 7) = x \\times x - x \\times 7 = x^2 - 7x$.\nd) $2x(3x + 1) = 2x \\times 3x + 2x \\times 1 = 6x^2 + 2x$.\n⛔ Le piège : ne multiplier que le premier terme, et écrire $5x - 2$. Le facteur de devant multiplie TOUS les termes.",
          micros: ["devfac_developper_simple"],
        },
        {
          enonce: "Développer et réduire.\na) $10 - (x + 4)$\nb) $3x - (5 - 2x)$\nc) $-(x - 1) + 2(x + 3)$",
          correction:
            "Un signe moins devant une parenthèse change le signe de TOUS les termes qu'elle contient.\na) $10 - (x + 4) = 10 - x - 4 = 6 - x$.\nb) $3x - (5 - 2x) = 3x - 5 + 2x = 5x - 5$.\nc) $-(x - 1) + 2(x + 3) = -x + 1 + 2x + 6 = x + 7$.\n⛔ Le piège : ne changer que le premier signe. $10 - (x + 4)$ n'est pas $10 - x + 4$ : on retire $x$ ET on retire $4$.",
          micros: ["devfac_developper_simple"],
        },
        {
          enonce: "Développer et réduire.\na) $(x + 4)(x + 2)$\nb) $(x - 3)(x + 7)$",
          correction:
            "Chaque terme de la première parenthèse multiplie chaque terme de la seconde : quatre produits.\na) $(x + 4)(x + 2) = x^2 + 2x + 4x + 8 = x^2 + 6x + 8$.\nb) $(x - 3)(x + 7) = x^2 + 7x - 3x - 21 = x^2 + 4x - 21$.\n⭐ On écrit les quatre produits avant de réduire.\n⛔ Le piège : écrire $x^2 + 8$. On a oublié les deux produits du milieu.",
          micros: ["devfac_developper_double"],
        },
        {
          enonce: "Développer et réduire.\na) $(3x - 1)(2x + 5)$\nb) $(4 - x)(x + 2)$",
          correction:
            "a) Les quatre produits : $3x \\times 2x = 6x^2$ ; $3x \\times 5 = 15x$ ; $-1 \\times 2x = -2x$ ; $-1 \\times 5 = -5$.\n$(3x - 1)(2x + 5) = 6x^2 + 15x - 2x - 5 = 6x^2 + 13x - 5$.\nb) $(4 - x)(x + 2) = 4x + 8 - x^2 - 2x = -x^2 + 2x + 8$.\n⭐ On range le résultat : d'abord $x^2$, puis $x$, puis le nombre seul.\n⛔ Le piège au a) : écrire $-1 \\times 5 = +5$. Le signe du $-1$ reste dans chaque produit.",
          schema: tableau("Les quatre produits du a)", ["× 2x", "× 5"], [
            { label: "3x", values: ["6x²", "15x"] },
            { label: "−1", values: ["−2x", "−5"] },
          ]),
          micros: ["devfac_developper_double"],
        },
        {
          enonce: "Factoriser.\na) $6x + 15$\nb) $10x - 4$\nc) $x^2 + 9x$\nd) $12x^2 - 8x$",
          correction:
            "On cherche ce qui est commun à tous les termes, et on le met devant la parenthèse.\na) $6x = 3 \\times 2x$ et $15 = 3 \\times 5$, donc $6x + 15 = 3(2x + 5)$.\nb) $10x = 2 \\times 5x$ et $4 = 2 \\times 2$, donc $10x - 4 = 2(5x - 2)$.\nc) $x^2 = x \\times x$ et $9x = x \\times 9$, donc $x^2 + 9x = x(x + 9)$.\nd) $12x^2 = 4x \\times 3x$ et $8x = 4x \\times 2$, donc $12x^2 - 8x = 4x(3x - 2)$.\n⭐ On vérifie en redéveloppant : $3(2x + 5)$ redonne bien $6x + 15$.\n⛔ Le piège au d) : s'arrêter à $4(3x^2 - 2x)$. On sort TOUT ce qui est commun, ici $4x$.",
          micros: ["devfac_facteur_commun"],
        },
        {
          enonce: "Factoriser $(x + 2)(3x - 1) + (x + 2)(x + 6)$.",
          correction:
            "Le facteur commun est une parenthèse entière : $(x + 2)$.\nOn la met devant, et on garde ce qui reste de chaque terme : $(x + 2)\\left[(3x - 1) + (x + 6)\\right]$.\nOn réduit le crochet : $3x - 1 + x + 6 = 4x + 5$.\nDonc $(x + 2)(3x - 1) + (x + 2)(x + 6) = (x + 2)(4x + 5)$.\n⛔ Le piège : tout développer. On arrive à $4x^2 + 13x + 10$ : c'est le contraire de ce qu'on demande.",
          micros: ["devfac_facteur_commun"],
        },
        {
          enonce: "Factoriser à l'aide d'une identité remarquable.\na) $x^2 - 49$\nb) $x^2 + 8x + 16$\nc) $x^2 - 12x + 36$",
          correction:
            "On reconnaît la forme avant de factoriser.\na) Une différence de deux carrés, $x^2 - 7^2$ : $x^2 - 49 = (x - 7)(x + 7)$.\nb) $16 = 4^2$, et le terme du milieu vaut $2 \\times x \\times 4 = 8x$ : $x^2 + 8x + 16 = (x + 4)^2$.\nc) $36 = 6^2$ et $2 \\times x \\times 6 = 12x$, avec un signe moins : $x^2 - 12x + 36 = (x - 6)^2$.\n⛔ Le piège : écrire $x^2 - 49 = (x - 7)^2$. Le carré $(x - 7)^2$ a TROIS termes, dont un terme en $x$ au milieu ; $x^2 - 49$ n'en a que deux.",
          micros: ["devfac_factoriser_identite"],
        },
        {
          enonce: "Résoudre l'équation $(2x - 6)(x + 5) = 0$.",
          correction:
            "Un produit est nul si et seulement si l'un de ses facteurs est nul.\nPremier facteur : $2x - 6 = 0$, donc $2x = 6$ et $x = 3$.\nSecond facteur : $x + 5 = 0$, donc $x = -5$.\nL'équation a deux solutions : $x = 3$ ou $x = -5$.\n⛔ Le piège : développer. On obtiendrait $2x^2 + 4x - 30 = 0$, qu'on ne sait pas résoudre en seconde. La forme factorisée est déjà la bonne.",
          micros: ["devfac_choisir_forme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Une ligne par étape, et des crochets dès qu'un signe moins s'en mêle.",
      rappel: [
        "SOUSTRAIRE UN PRODUIT : on le développe d'abord entre crochets, puis on change tous ses signes. $5 - \\left[x^2 + 3x - 4\\right] = 5 - x^2 - 3x + 4$.",
        "Le facteur commun peut être une parenthèse entière : $(x + 1)A + (x + 1)B = (x + 1)(A + B)$.",
        "Pour RÉSOUDRE, on ramène tout d'un côté et on factorise. On ne divise jamais par $x$ : on perdrait une solution.",
      ],
      exercices: [
        {
          enonce: "Développer et réduire $A = (x + 3)(x - 2) - (x - 1)(x + 4)$.",
          correction:
            "On développe chaque produit à part, et on met le second entre crochets à cause du signe moins.\n$(x + 3)(x - 2) = x^2 - 2x + 3x - 6 = x^2 + x - 6$.\n$(x - 1)(x + 4) = x^2 + 4x - x - 4 = x^2 + 3x - 4$.\n$A = x^2 + x - 6 - \\left[x^2 + 3x - 4\\right] = x^2 + x - 6 - x^2 - 3x + 4 = -2x - 2$.\n⛔ Le piège : écrire $- x^2 + 3x - 4$, où seul le premier signe a changé. Le moins s'applique aux TROIS termes du second produit.",
          micros: ["devfac_developper_simple", "devfac_developper_double"],
        },
        {
          enonce: "Développer et réduire $B = 3(x - 1)(x + 2)$.",
          correction:
            "On développe d'abord les deux parenthèses, puis on multiplie par $3$.\n$(x - 1)(x + 2) = x^2 + 2x - x - 2 = x^2 + x - 2$.\n$B = 3\\left(x^2 + x - 2\\right) = 3x^2 + 3x - 6$.\n⛔ Le piège : distribuer le $3$ dans les DEUX parenthèses, $(3x - 3)(3x + 6)$. Cela multiplie par $9$, pas par $3$.",
          micros: ["devfac_developper_simple", "devfac_developper_double"],
        },
        {
          enonce: "Factoriser $C = (2x - 3)(x + 4) - (2x - 3)(5x - 1)$.",
          correction:
            "Le facteur commun est $(2x - 3)$. On le met devant : $C = (2x - 3)\\left[(x + 4) - (5x - 1)\\right]$.\nLe signe moins porte sur toute la seconde parenthèse : $(x + 4) - (5x - 1) = x + 4 - 5x + 1 = -4x + 5$.\nDonc $C = (2x - 3)(-4x + 5)$.\n⛔ Le piège : écrire $x + 4 - 5x - 1$. Le $-1$ devient $+1$ en sortant de la parenthèse.",
          micros: ["devfac_facteur_commun"],
        },
        {
          enonce: "Factoriser $D = (x - 4)(2x + 1) + (x - 4)$.",
          correction:
            "Le facteur commun est $(x - 4)$. Le second terme, c'est $(x - 4) \\times 1$.\n$D = (x - 4)\\left[(2x + 1) + 1\\right] = (x - 4)(2x + 2)$.\nOn peut encore sortir $2$, car $2x + 2 = 2(x + 1)$. Donc $D = 2(x - 4)(x + 1)$.\n⛔ Le piège : oublier le $1$ et écrire $(x - 4)(2x + 1)$. Quand un terme EST le facteur commun, il reste $1$ à sa place.",
          micros: ["devfac_facteur_commun"],
        },
        {
          enonce: "Factoriser $E = (x + 1)^2 - 9$.",
          correction:
            "On reconnaît $a^2 - b^2$, avec $a = x + 1$ et $b = 3$.\nDonc $E = \\left[(x + 1) - 3\\right]\\left[(x + 1) + 3\\right]$.\nOn réduit chaque crochet : $E = (x - 2)(x + 4)$.\n⭐ On vérifie en développant les deux écritures : $(x - 2)(x + 4)$ et $(x + 1)^2 - 9$ donnent toutes les deux $x^2 + 2x - 8$.\n⛔ Le piège : développer $(x + 1)^2$ d'abord. On arrive à $x^2 + 2x - 8$, qu'on ne sait plus factoriser directement.",
          micros: ["devfac_factoriser_identite"],
        },
        {
          enonce: "a) Montrer que, pour tout nombre $x$ : $(x + 1)(x + 5) - (x + 3)^2 = -4$.\nb) En déduire, sans calculatrice, la valeur de $101 \\times 105 - 103^2$.",
          correction:
            "a) On développe chaque morceau.\n$(x + 1)(x + 5) = x^2 + 5x + x + 5 = x^2 + 6x + 5$.\n$(x + 3)^2 = (x + 3)(x + 3) = x^2 + 3x + 3x + 9 = x^2 + 6x + 9$.\nLa différence : $x^2 + 6x + 5 - \\left[x^2 + 6x + 9\\right] = 5 - 9 = -4$. Les $x^2$ et les $6x$ s'en vont.\nb) On prend $x = 100$ : $101 \\times 105 - 103^2 = -4$.\n⭐ Le calcul avec $x$ fait en une ligne ce que la calculatrice ferait en trois.",
          micros: ["devfac_developper_double"],
        },
        {
          enonce: "Résoudre l'équation $x^2 = 5x$.",
          correction:
            "On ramène tout d'un côté pour avoir zéro : $x^2 - 5x = 0$.\nOn factorise par $x$ : $x(x - 5) = 0$.\nUn produit est nul si l'un des facteurs est nul : $x = 0$ ou $x - 5 = 0$.\nLes solutions sont $x = 0$ ou $x = 5$.\n⛔ Le piège : diviser par $x$ des deux côtés. On trouve $x = 5$, et on PERD la solution $x = 0$. On n'a pas le droit de diviser par un nombre qui peut valoir zéro.",
          micros: ["devfac_choisir_forme"],
        },
        {
          enonce: "Résoudre l'équation $(x + 2)(x - 3) = (x + 2)(2x + 1)$.",
          correction:
            "On ramène tout du même côté : $(x + 2)(x - 3) - (x + 2)(2x + 1) = 0$.\nOn factorise par $(x + 2)$ : $(x + 2)\\left[(x - 3) - (2x + 1)\\right] = 0$, soit $(x + 2)(-x - 4) = 0$.\n$x + 2 = 0$ donne $x = -2$ ; $-x - 4 = 0$ donne $x = -4$.\nLes solutions sont $x = -2$ ou $x = -4$.\n⛔ Le piège : simplifier par $(x + 2)$ des deux côtés. Il reste $x - 3 = 2x + 1$, donc $x = -4$, et on a perdu $x = -2$.",
          micros: ["devfac_facteur_commun", "devfac_choisir_forme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations complètes. On écrit l'expression, on choisit la forme, et on conclut par une phrase.",
      rappel: [
        "On traduit l'énoncé par une expression, puis on choisit la forme : développée pour calculer une valeur, factorisée pour résoudre « $= 0$ ».",
        "L'aire d'un rectangle est longueur $\\times$ largeur : c'est un produit, donc une forme factorisée toute prête.",
      ],
      exercices: [
        {
          titre: "La terrasse et son gazon",
          enonce: "Une terrasse rectangulaire mesure $(x + 5)$ m sur $(x + 2)$ m, avec $x > 0$. On y pose un carré de gazon de côté $x$ m ; le reste est carrelé.\na) Exprimer l'aire totale de la terrasse sous forme développée.\nb) Montrer que l'aire carrelée vaut $7x + 10$.\nc) Calculer les trois aires pour $x = 4$.\nd) Pour quelle valeur de $x$ l'aire carrelée vaut-elle $45$ m² ?",
          correction:
            "a) $(x + 5)(x + 2) = x^2 + 2x + 5x + 10 = x^2 + 7x + 10$.\nb) On retire l'aire du gazon, $x^2$ : $x^2 + 7x + 10 - x^2 = 7x + 10$.\nc) Pour $x = 4$ : la terrasse fait $9 \\times 6 = 54$ m², le gazon $4^2 = 16$ m², le carrelage $7 \\times 4 + 10 = 38$ m². On vérifie : $54 - 16 = 38$. ✓\nd) $7x + 10 = 45$, donc $7x = 35$ et $x = 5$. L'aire carrelée vaut $45$ m² quand le gazon a $5$ m de côté.\n⭐ Les $x^2$ se sont annulés : il ne reste qu'une équation du premier degré.",
          schema: tableau("Pour x = 4", ["aire", "calcul"], [
            { label: "Terrasse", values: ["54 m²", "9 × 6"] },
            { label: "Gazon", values: ["16 m²", "4 × 4"] },
            { label: "Carrelage", values: ["38 m²", "7 × 4 + 10"] },
          ]),
          micros: ["devfac_developper_double", "devfac_choisir_forme"],
        },
        {
          titre: "Un programme qui trouve le carré",
          enonce: "Voici un programme de calcul.\n• Choisir un nombre.\n• Lui ajouter $3$.\n• Multiplier le résultat par le nombre de départ diminué de $3$.\n• Ajouter $9$.\na) Tester le programme avec $4$, puis avec $-5$.\nb) Quelle conjecture peut-on faire ?\nc) La démontrer.",
          correction:
            "a) Avec $4$ : $4 + 3 = 7$, puis $7 \\times (4 - 3) = 7$, puis $7 + 9 = 16$.\nAvec $-5$ : $-5 + 3 = -2$, puis $-2 \\times (-5 - 3) = -2 \\times (-8) = 16$, puis $16 + 9 = 25$.\nb) $16 = 4^2$ et $25 = (-5)^2$ : le programme semble donner le CARRÉ du nombre de départ.\nc) On appelle $x$ le nombre de départ. Le programme calcule $(x + 3)(x - 3) + 9$.\n$(x + 3)(x - 3) = x^2 - 3x + 3x - 9 = x^2 - 9$.\nDonc $(x + 3)(x - 3) + 9 = x^2 - 9 + 9 = x^2$. Le résultat est toujours le carré du nombre de départ.\n⛔ Le piège : conclure après les essais. Deux exemples ne prouvent rien : seul le calcul avec $x$ vaut pour TOUS les nombres.",
          micros: ["devfac_developper_double"],
        },
        {
          titre: "Le cadre photo",
          enonce: "Une photo de $10$ cm sur $15$ cm est entourée d'un cadre de largeur $x$ cm, tout autour.\na) Expliquer pourquoi les dimensions extérieures sont $(10 + 2x)$ cm et $(15 + 2x)$ cm.\nb) Développer l'aire totale.\nc) En déduire l'aire du cadre seul, puis la factoriser.\nd) Calculer l'aire du cadre pour $x = 2{,}5$. Que remarque-t-on ?",
          correction:
            "a) Le cadre ajoute $x$ de chaque côté : $x$ à gauche et $x$ à droite, soit $2x$ en tout. D'où $10 + 2x$ et $15 + 2x$.\nb) $(10 + 2x)(15 + 2x) = 150 + 20x + 30x + 4x^2 = 4x^2 + 50x + 150$.\nc) On retire la photo, $10 \\times 15 = 150$ cm² : le cadre seul mesure $4x^2 + 50x$ cm².\nLe facteur commun est $2x$ : $4x^2 + 50x = 2x(2x + 25)$.\nd) $2 \\times 2{,}5 \\times (2 \\times 2{,}5 + 25) = 5 \\times 30 = 150$ cm². C'est exactement l'aire de la photo.\n⭐ La forme factorisée rend le d) facile : deux facteurs simples au lieu de trois termes.\n⛔ Le piège au a) : écrire $10 + x$. Le cadre est des DEUX côtés de la photo.",
          micros: ["devfac_developper_double", "devfac_facteur_commun"],
        },
        {
          titre: "Trois formes, trois travaux",
          enonce: "On considère $g(x) = (x - 3)^2 - 16$.\na) Développer $g(x)$.\nb) Factoriser $g(x)$.\nc) En choisissant chaque fois la forme la plus adaptée : calculer $g(0)$ ; résoudre $g(x) = 0$ ; résoudre $g(x) = -7$ ; calculer $g(3)$.",
          correction:
            "a) $(x - 3)^2 = x^2 - 6x + 9$, donc $g(x) = x^2 - 6x + 9 - 16 = x^2 - 6x - 7$.\nb) On reconnaît $a^2 - b^2$ avec $a = x - 3$ et $b = 4$ : $g(x) = \\left[(x - 3) - 4\\right]\\left[(x - 3) + 4\\right] = (x - 7)(x + 1)$.\nc) $g(0)$ : la forme développée donne tout de suite $g(0) = -7$.\n$g(x) = 0$ : la forme factorisée. $(x - 7)(x + 1) = 0$, donc $x = 7$ ou $x = -1$.\n$g(x) = -7$ : la forme développée. $x^2 - 6x - 7 = -7$ donne $x^2 - 6x = 0$, soit $x(x - 6) = 0$ : $x = 0$ ou $x = 6$.\n$g(3)$ : la forme de départ. $g(3) = 0^2 - 16 = -16$.\n⭐ Trois écritures du même nombre, et chacune a son travail.",
          schema: tableau("Quelle forme pour quoi ?", ["forme", "écriture"], [
            { label: "Calculer g(0)", values: ["développée", "x² − 6x − 7"] },
            { label: "Résoudre g(x) = 0", values: ["factorisée", "(x − 7)(x + 1)"] },
            { label: "Calculer g(3)", values: ["de départ", "(x − 3)² − 16"] },
          ]),
          micros: ["devfac_developper_double", "devfac_factoriser_identite", "devfac_choisir_forme"],
        },
      ],
    },
  ],
};
