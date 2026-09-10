// ─── Fiche de cours : les expressions littérales (2de) ────────────────────────
//
// Treizième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/expressions-litterales.bank.ts
// (notion expressions_litterales_2de), et sur la 5e comme étalon.
//
// ⭐ CE QUE LA MESURE A CHANGÉ AU COACH LE 10/09/2026 : c'était la notion la
// plus MAIGRE de la seconde — 272 énoncés, contre 1 094 pour les affines. Les
// trois micros passaient les seuils, et deux gestes du programme manquaient
// entièrement :
//   — LE PROGRAMME DE CALCUL, un seul item figé, alors que c'est l'exercice
//     type : on enchaîne des opérations et on DÉMONTRE que le résultat suit une
//     règle, quelle que soit la valeur de départ ;
//   — PROUVER OU RÉFUTER UNE ÉGALITÉ, zéro item, alors que c'est le geste
//     logique du chapitre.
// Sept gabarits ajoutés : 272 → 715 énoncés.
//
// ⭐ LE FIL DE LA FICHE, ET IL EST ASYMÉTRIQUE — c'est ce qui doit rester :
//   · pour RÉFUTER une égalité, UN SEUL contre-exemple suffit ;
//   · pour la DÉMONTRER, aucun nombre d'exemples ne suffit — il faut la lettre.
// C'est exactement à quoi sert une expression littérale, et beaucoup d'élèves
// traversent la seconde sans que ce soit dit aussi nettement.
//
// ⛔ LE PIÈGE CENTRAL : substituer une valeur NÉGATIVE sans parenthèses.
// Avec x = -2, $x^2$ vaut 4 et non -4 — mais écrit sans parenthèses, le calcul
// se trompe de signe.
//
// Micro-compétences couvertes :
// - expr_modeliser          → propriété « Traduire », le réel, méthode 1, exemples 1-2, exos 1-2-3
// - expr_reduire_substituer → propriétés « Réduire » et « Substituer », méthode 2, exemple 3, exos 4-5-6
// - expr_exprimer_variable  → propriété « Retourner une formule », usages, exos 7-8
//   (et la preuve/réfutation, servie par expr_reduire_substituer, exemple 4, exos 9-10)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import {
  egalite,
  egalites,
  cas,
  enBleu,
  enRouge,
  enVert,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

export const ficheExpressionsSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "expressions-litterales-2de",
  titre: "Les expressions littérales",
  accroche:
    "Une lettre remplace tous les nombres à la fois. C'est ce qui change tout : avec des exemples, on CONSTATE ; avec une lettre, on DÉMONTRE. Et la différence n'est pas une nuance — c'est ce qui sépare « ça marche à chaque fois que j'essaie » de « c'est vrai, toujours ».",
  identite: [
    { label: "Mots clés", valeur: "Lettre, expression, réduire, remplacer, démontrer" },
    { label: "Le secret", valeur: "Un seul contre-exemple suffit à réfuter, jamais à prouver" },
    { label: "Outil", valeur: "Une lettre qui vaut pour tous les nombres à la fois" },
  ],

  definition: {
    texte:
      "Une EXPRESSION LITTÉRALE est un calcul où figurent des lettres : $3x + 5$, $x^2 - 2x$, $2(L + \\ell)$. La lettre représente un nombre quelconque — on dit une VARIABLE. RÉDUIRE une expression, c'est l'écrire plus simplement en regroupant les termes semblables ; SUBSTITUER, c'est remplacer la lettre par une valeur pour obtenir un nombre.",
  },

  figure: {
    schema: egalites(
      [
        `\\text{choisir } ${enBleu("x")}`,
        `\\text{ajouter } 3 \\;\\rightarrow\\; ${enBleu("x")} + 3`,
        `\\text{multiplier par } 2 \\;\\rightarrow\\; 2${enBleu("x")} + 6`,
        `\\text{retirer } 6 \\;\\rightarrow\\; ${enRouge("2x")}`,
      ],
      "Un programme de calcul, traduit étape par étape. Le résultat est TOUJOURS le double du nombre choisi — et cette seule ligne le prouve pour tous les nombres à la fois.",
    ),
    legende:
      "⭐ Essayer avec $5$, puis $12$, puis $-3$ ferait DEVINER la règle. L'écrire avec $x$ la DÉMONTRE. C'est à cela que sert une expression littérale.",
  },

  proprietes: [
    {
      titre: "Traduire une phrase, une figure",
      texte:
        "« Le double de $x$ augmenté de $3$ » s'écrit $2x + 3$. « Le double de la somme de $x$ et $3$ » s'écrit $2(x + 3)$ : les parenthèses disent qu'on additionne AVANT de multiplier. ⚠️ Deux phrases voisines, deux expressions différentes.",
      schema: cas(
        [
          { formule: "2x + 3", verdict: "le double de $x$, puis $+3$", couleur: VERT },
          { formule: "2(x + 3)", verdict: "la somme, PUIS le double", couleur: ROUGE },
        ],
        "Avec x = 5 : la première donne 13, la seconde 16. L'ordre des opérations n'est pas un détail.",
      ),
    },
    {
      titre: "Réduire : regrouper les semblables",
      texte:
        "On additionne les termes en $x$ entre eux, et les nombres seuls entre eux. ⛔ Un terme en $x$ et un nombre ne se regroupent JAMAIS : $3x + 5$ ne vaut pas $8x$, et ne se simplifie pas.",
      schema: egalites(
        [
          `5x + 7 - ${enRouge("2x")} + 1`,
          `(5x - ${enRouge("2x")}) + (7 + 1)`,
          `${enVert("3x + 8")}`,
        ],
        "On sépare les deux familles, on additionne dans chacune, et on s'arrête là.",
      ),
    },
    {
      titre: "⛔ Substituer : garder les parenthèses",
      texte:
        "Remplacer $x$ par une valeur NÉGATIVE se fait toujours entre parenthèses. Avec $x = -2$, on écrit $(-2)^2 = 4$ : un carré est positif, même pour un nombre négatif. Sans parenthèses, on lit $-2^2 = -4$, et le signe est faux.",
      schema: egalites(
        [
          `x^2 + 3x \\quad \\text{avec } x = ${enRouge("-2")}`,
          `(${enRouge("-2")})^2 + 3 \\times (${enRouge("-2")}) = 4 - 6`,
          `= ${enVert("-2")}`,
        ],
        "Les parenthèses ne sont pas de la décoration : elles portent le signe.",
      ),
    },
    {
      titre: "Retourner une formule",
      texte:
        "Dans $U = RI$, exprimer $I$ revient à isoler $I$ : $I = \\dfrac{U}{R}$. On applique les mêmes gestes que pour une équation — faire la même chose des deux côtés — mais avec des lettres au lieu de nombres.",
      schema: egalites(
        [
          `P = 2(L + \\ell)`,
          `\\dfrac{P}{2} = L + \\ell`,
          `\\ell = ${enRouge("\\dfrac{P}{2} - L")}`,
        ],
        "Le périmètre d'un rectangle, retourné pour donner la largeur.",
      ),
    },
    {
      titre: "⭐ Prouver, ou réfuter : ce n'est pas symétrique",
      texte:
        "Pour montrer qu'une égalité est FAUSSE, un seul contre-exemple suffit. Pour montrer qu'elle est VRAIE pour tout $x$, aucun nombre d'exemples ne suffit — il faut réduire les deux membres et voir qu'ils coïncident.",
      schema: cas(
        [
          { formule: "\\text{réfuter}", verdict: "UN contre-exemple", couleur: ROUGE },
          { formule: "\\text{démontrer}", verdict: "le calcul littéral", couleur: VERT },
        ],
        "⛔ Mille exemples justes ne démontrent rien. Un seul exemple faux réfute tout.",
      ),
    },
  ],

  reel: {
    texte:
      "« Pense à un nombre, ajoute $3$, multiplie par $2$, retire $6$ — je te dis que tu obtiens le double de ton nombre. » Le tour marche à tous les coups, et il n'a rien de magique : $2(x+3) - 6 = 2x$. ⭐ Le calcul littéral est ce qui transforme un tour de passe-passe en démonstration. Et c'est le même geste qui sert partout ailleurs : quand une facture s'écrit $0{,}15x + 12$, la lettre permet de répondre pour TOUS les clients d'un coup, au lieu de refaire le calcul pour chacun.",
  },

  historique: {
    texte:
      "Avant 1591, on résolvait les équations avec des phrases : « la chose et son carré valent dix ». C'est François Viète, avocat au service d'Henri IV et mathématicien à ses heures, qui a l'idée de noter par des LETTRES non seulement l'inconnue, mais aussi les nombres connus. D'un coup, un problème particulier devient une formule générale, et le calcul se fait sur les lettres avant de se faire sur les nombres. C'est de là que vient tout ce chapitre.",
  },

  methode: [
    {
      titre: "Je traduis étape par étape",
      texte:
        "Je nomme $x$ le nombre choisi, puis j'écris ce qu'il devient après CHAQUE instruction, sans en sauter une. Les parenthèses apparaissent dès qu'on opère sur un résultat entier.",
      schema: egalites(
        [`x \\;\\rightarrow\\; x + 4 \\;\\rightarrow\\; 3(x + 4)`],
        "« Ajouter 4, puis tripler » : le triple porte sur TOUT ce qui précède.",
      ),
    },
    {
      titre: "Je réduis avant de remplacer",
      texte:
        "Une expression réduite se calcule plus vite et se trompe moins. ⭐ Et si je dois substituer plusieurs valeurs, je ne réduis qu'une fois pour toutes.",
      schema: egalite(
        `4x + 5 - x + 1 = ${enVert("3x + 6")}`,
        "Trois termes deviennent deux : moins d'occasions de se tromper.",
      ),
    },
    {
      titre: "Je conclus sur ce que je peux affirmer",
      texte:
        "Si les deux membres se réduisent pareil, l'égalité est vraie pour tout $x$ et je peux l'écrire. S'ils diffèrent, je donne UNE valeur qui le montre — c'est une preuve complète.",
      schema: cas(
        [
          { formule: "\\text{même réduction}", verdict: "vraie pour tout $x$", couleur: VERT },
          { formule: "\\text{réductions différentes}", verdict: "un contre-exemple", couleur: ROUGE },
        ],
      ),
    },
  ],

  usages: [
    {
      titre: "Démontrer un programme de calcul",
      detail:
        "On traduit, on réduit, et la règle apparaît. Le résultat vaut pour tous les nombres de départ — c'est ce qu'un tableau d'essais ne donnera jamais.",
      schema: egalites(
        [`2(x + 3) - 6 = 2x + 6 - 6 = ${enRouge("2x")}`],
        "Toujours le double du nombre choisi.",
      ),
    },
    {
      titre: "Exprimer une grandeur en fonction d'une autre",
      detail:
        "Un rectangle de largeur $x$ et de longueur $x + 4$ a pour aire $x(x+4) = x^2 + 4x$, et pour périmètre $4x + 8$. ⚠️ Deux formules différentes pour la même figure : lire l'énoncé décide.",
      schema: cas(
        [
          { formule: "x(x+4) = x^2 + 4x", verdict: "l'AIRE", couleur: VERT },
          { formule: "2(x + x + 4) = 4x + 8", verdict: "le PÉRIMÈTRE", couleur: ROUGE },
        ],
      ),
    },
    {
      titre: "Retourner une formule de physique",
      detail:
        "$d = vt$ donne $t = \\dfrac{d}{v}$, $U = RI$ donne $I = \\dfrac{U}{R}$. Le geste est le même que pour une équation : on isole la lettre qu'on veut.",
      schema: egalites(
        [`d = v\\,t`, `t = ${enRouge("\\dfrac{d}{v}")}`],
        "On divise les deux membres par v.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Deux phrases voisines",
      donnees: "« Le triple de $x$ augmenté de $2$ » et « le triple de la somme de $x$ et $2$ ».",
      question: "Écrire les deux expressions.",
      schema: cas(
        [
          { formule: "3x + 2", verdict: "le triple, PUIS $+2$", couleur: VERT },
          { formule: "3(x + 2)", verdict: "la somme, PUIS le triple", couleur: ROUGE },
        ],
      ),
      solution:
        "La première s'écrit $3x + 2$, la seconde $3(x + 2)$. ⚠️ Elles ne sont pas égales : avec $x = 4$, la première donne $14$ et la seconde $18$. Les parenthèses disent ce qu'on fait EN PREMIER, et c'est le mot « somme » qui les impose.",
    },
    {
      titre: "Un programme de calcul",
      donnees: "« Choisir un nombre, le multiplier par $5$, ajouter $10$, puis diviser par $5$. »",
      question: "Que peut-on affirmer du résultat ?",
      schema: egalites(
        [`x \\;\\rightarrow\\; 5x \\;\\rightarrow\\; 5x + 10`, `\\dfrac{5x + 10}{5} = ${enRouge("x + 2")}`],
      ),
      solution:
        "On obtient toujours le nombre choisi augmenté de $2$. En effet $\\dfrac{5x + 10}{5} = x + 2$. ⭐ Trois essais auraient fait deviner la règle ; cette ligne-là la démontre pour tous les nombres, y compris les négatifs et les décimaux.",
    },
    {
      titre: "⛔ Substituer un négatif",
      donnees: "L'expression $x^2 - 4x$.",
      question: "Que vaut-elle pour $x = -3$ ?",
      schema: egalites(
        [
          `(${enRouge("-3")})^2 - 4 \\times (${enRouge("-3")})`,
          `9 + 12 = ${enVert("21")}`,
        ],
      ),
      solution:
        "$(-3)^2 = 9$ — un carré est positif — et $-4 \\times (-3) = +12$, car le produit de deux négatifs est positif. Total : $21$. ⛔ Sans parenthèses on aurait écrit $-3^2 = -9$, puis $-9 - 12 = -21$ : deux erreurs de signe pour une seule paire de parenthèses oubliée.",
    },
    {
      titre: "⭐ Vraie, ou fausse ?",
      donnees: "L'égalité $(x + 3)^2 = x^2 + 9$.",
      question: "Est-elle vraie pour tout $x$ ?",
      schema: egalites(
        [
          `x = 0 \\;:\\; 9 = 9 \\;\\checkmark`,
          `x = ${enRouge("1")} \\;:\\; 16 \\neq 10 \\;\\times`,
        ],
        "⛔ Le premier essai ne prouve rien : il fallait en trouver UN qui échoue.",
      ),
      solution:
        "Elle est FAUSSE. Avec $x = 1$ : à gauche $(1+3)^2 = 16$, à droite $1 + 9 = 10$. Un seul contre-exemple suffit à conclure. ⚠️ Attention au choix : avec $x = 0$, les deux membres valent $9$ — cet essai-là n'aurait rien montré. ⭐ Et la vraie égalité est $(x+3)^2 = x^2 + 6x + 9$ : c'est le double produit $6x$ qui manquait.",
    },
  ],

  pieges: [
    "⛔ $3x + 5$ ne se réduit pas. Un terme en $x$ et un nombre seul ne sont pas semblables : la réponse n'est ni $8x$ ni $8$.",
    "⛔ Substituer un nombre négatif se fait ENTRE PARENTHÈSES. Avec $x = -2$, $x^2$ vaut $4$ ; écrit $-2^2$, on lit $-4$.",
    "⛔ « Le double de $x$ augmenté de $3$ » ($2x + 3$) et « le double de la somme de $x$ et $3$ » ($2(x+3)$) ne sont pas la même expression.",
    "⛔ Des exemples ne DÉMONTRENT jamais une égalité, même vérifiés dix fois. Ils peuvent seulement la réfuter.",
    "⛔ Un contre-exemple mal choisi ne prouve rien : $x = 0$ vérifie $(x+3)^2 = x^2 + 9$, alors que l'égalité est fausse.",
    "⛔ L'aire et le périmètre d'une même figure donnent deux expressions différentes. C'est l'énoncé qui décide, pas l'habitude.",
  ],

  aRetenir: [
    "Une lettre représente un nombre QUELCONQUE : elle vaut pour tous à la fois.",
    "Réduire : on regroupe les $x$ ensemble, les nombres ensemble, jamais les deux.",
    "Substituer un négatif : toujours entre parenthèses. $(-2)^2 = 4$.",
    "Un programme de calcul se traduit étape par étape, en gardant $x$.",
    "⭐ UN contre-exemple réfute. Aucun nombre d'exemples ne démontre.",
    "Pour démontrer une égalité : réduire les deux membres et les comparer.",
  ],

  entrainement: [
    {
      question: "Écrire « le quadruple de $x$ diminué de $7$ ».",
      correction: "$4x - 7$. Le quadruple porte sur $x$ seul, puis on retire $7$.",
    },
    {
      question: "Écrire « le quadruple de la différence entre $x$ et $7$ ».",
      correction:
        "$4(x - 7)$. Le mot « différence » impose de soustraire AVANT de multiplier, d'où les parenthèses.",
    },
    {
      question: "Un carré a pour côté $x + 2$. Quel est son périmètre ?",
      correction:
        "$4(x + 2) = 4x + 8$. Les quatre côtés sont égaux, donc le périmètre est quatre fois le côté.",
    },
    {
      question: "Réduire $7x + 4 - 3x + 5$.",
      correction:
        "Termes en $x$ : $7x - 3x = 4x$. Nombres : $4 + 5 = 9$. Donc $4x + 9$.",
    },
    {
      question: "Réduire $2x + 6 - 5x + 1$.",
      correction:
        "$2x - 5x = -3x$ et $6 + 1 = 7$, donc $-3x + 7$. ⚠️ Le coefficient est négatif : $-3x$, pas $3x$.",
    },
    {
      question: "Que vaut $x^2 + 2x$ pour $x = -4$ ?",
      correction:
        "$(-4)^2 + 2 \\times (-4) = 16 - 8 = 8$. Le carré est positif, le second terme négatif.",
    },
    {
      question: "Dans $A = \\dfrac{bh}{2}$, exprimer $h$ en fonction de $A$ et $b$.",
      correction:
        "On multiplie par $2$ : $2A = bh$. Puis on divise par $b$ : $h = \\dfrac{2A}{b}$.",
    },
    {
      question: "Dans $y = 3x - 6$, exprimer $x$ en fonction de $y$.",
      correction:
        "On ajoute $6$ : $y + 6 = 3x$. Puis on divise par $3$ : $x = \\dfrac{y + 6}{3}$.",
    },
    {
      question: "Programme : « choisir un nombre, ajouter $5$, multiplier par $3$, retirer $15$ ». Que peut-on affirmer ?",
      correction:
        "On obtient toujours le triple du nombre choisi : $3(x + 5) - 15 = 3x + 15 - 15 = 3x$.",
    },
    {
      question: "L'égalité $(x - 2)^2 = x^2 - 4$ est-elle vraie pour tout $x$ ?",
      correction:
        "Non. Avec $x = 1$ : à gauche $(1-2)^2 = 1$, à droite $1 - 4 = -3$. Un contre-exemple suffit. ⚠️ Avec $x = 2$ les deux membres valent $0$ : cet essai-là n'aurait rien montré. La vraie égalité est $(x-2)^2 = x^2 - 4x + 4$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesExpressionsSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Expressions littérales - 2de",
    section: {
      type: "objectif",
      phrase: "Passer de « ça marche à chaque essai » à « c'est vrai, toujours »",
      sousPhrase:
        "Une lettre vaut pour tous les nombres à la fois. Un contre-exemple réfute ; seul le calcul littéral démontre.",
    },
  },
];
