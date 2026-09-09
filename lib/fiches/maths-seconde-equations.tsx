// ─── Fiche de cours : équations et inéquations du premier degré (2de) ─────────
//
// Septième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/equations-inequations.bank.ts
// (notion equations_inequations_1er_degre), et sur la 5e comme étalon.
//
// ⭐ LE COACH EST DÉJÀ SOLIDE ICI : 1 825 énoncés, 36 items, cinq micros, aucune
// en dette de renouvellement. C'est la notion la mieux servie de la seconde —
// rien à renforcer avant d'écrire, contrairement aux puissances.
//
// ⭐ L'IDÉE DIRECTRICE : une équation a UNE solution, une inéquation en a une
// INFINITÉ. Tout le reste en découle — l'une se vérifie en remplaçant, l'autre se
// raconte par un intervalle et se dessine sur une droite graduée.
//
// ⛔ LE PIÈGE CENTRAL, ET IL EST UNIQUE À CE CHAPITRE : diviser une inéquation
// par un nombre NÉGATIF retourne le sens de l'inégalité. C'est la seule règle du
// programme qui n'ait pas d'équivalent du côté des équations, et c'est pour ça
// qu'elle s'oublie.
//
// Micro-compétences couvertes :
// - equation_resoudre             → définition, propriété « Résoudre une équation », méthode, exemple 1, exos 1-2-3
// - equation_probleme             → usages « Mettre en équation », le réel, exemple 4, exos 8-9
// - inequation_resoudre           → propriétés « Résoudre une inéquation » et « Le signe négatif », exemple 2, exos 4-5-6
// - inequation_intervalle         → propriété « L'ensemble des solutions », usages, exemple 3, exo 7
// - comparer_difference_quotient  → usages « Comparer deux quantités », exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ ET IL NE PREND QUE DU TEXTE NU : `TexteMath` ne le traverse jamais, ses
 * textes arrivant en DONNÉES de figure. On écrit « 2x ⩽ 6 » en Unicode, jamais
 * « $2x \leqslant 6$ ».
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

/**
 * Une droite graduée — SVG, donc RÉSERVÉE aux rubriques larges : `proprietes`
 * (225 px) et `usages` (220 px). Sa police vaut 14 en unités de `viewBox`, donc
 * une largeur de 280 la rend à 11,25 px en poche. Au delà de 299, l'élève lit
 * sous 11 px.
 *
 * ⛔ Et pas plus de onze graduations : au delà les valeurs se chevauchent.
 */
function droite(
  points: { value: number; label?: string }[],
  min: number,
  max: number,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step: 1,
        points,
        display: {
          showTicks: true,
          showValues: true,
          showPoints: true,
          showPointLabels: true,
          showZero: true,
        },
        size: { width: 280, height: 78 },
      }}
    />
  );
}

export const ficheEquationsSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "equations-inequations-1er-degre",
  titre: "Équations et inéquations du premier degré",
  accroche:
    "Une équation a UNE solution, une inéquation en a une INFINITÉ. Les gestes de résolution sont pourtant les mêmes — à une exception près, et c'est elle qui fait perdre des points : diviser par un nombre négatif retourne le sens de l'inégalité.",
  identite: [
    { label: "Mots clés", valeur: "Inconnue, solution, inégalité, intervalle" },
    { label: "Le secret", valeur: "Le signe change de sens quand on divise par un négatif" },
    { label: "Outil", valeur: "Faire la même chose des deux côtés" },
  ],

  definition: {
    texte:
      "Une ÉQUATION est une égalité contenant une inconnue, souvent notée $x$ : la résoudre, c'est trouver toutes les valeurs de $x$ qui la rendent vraie. Une INÉQUATION est la même chose avec un signe $<$, $\\leqslant$, $>$ ou $\\geqslant$. Du premier degré signifie que $x$ apparaît sans puissance : $3x + 4 = 19$, et jamais $x^2$.",
  },

  figure: {
    schema: tableau(
      ["", "3x + 4 = 19", "3x + 4 > 19"],
      [
        { label: "type", values: ["équation", "inéquation"] },
        { label: "solutions", values: ["x = 5, une seule", "x > 5, une infinité"] },
        { label: "s'écrit", values: ["S = {5}", "S = ]5 ; +∞["] },
      ],
      "Une seule, ou une infinité",
    ),
    legende:
      "Mêmes calculs, deux réponses de nature différente : un NOMBRE d'un côté, un INTERVALLE de l'autre. Écrire « x = 5 » à une inéquation, c'est répondre à côté.",
  },

  proprietes: [
    {
      titre: "Résoudre une équation : la balance",
      texte:
        "On peut ajouter, soustraire, multiplier ou diviser par un même nombre non nul DES DEUX CÔTÉS : l'égalité tient. C'est l'image de la balance — ce qu'on fait à gauche, on le fait à droite.",
      schema: tableau(
        ["étape", "3x + 4 = 19", "3x = 15", "x = 5"],
        [{ label: "on a fait", values: ["départ", "−4 des deux côtés", "÷3 des deux côtés"] }],
        "Deux gestes, et c'est fini",
      ),
    },
    {
      titre: "Résoudre une inéquation : les mêmes gestes",
      texte:
        "Ajouter ou soustraire un nombre ne change RIEN au sens de l'inégalité. Multiplier ou diviser par un nombre POSITIF non plus. Jusque-là, tout se passe comme pour une équation.",
      schema: tableau(
        ["étape", "2x + 1 > 7", "2x > 6", "x > 3"],
        [{ label: "on a fait", values: ["départ", "−1", "÷2, positif"] }],
        "Le sens n'a pas bougé",
      ),
    },
    {
      titre: "⛔ Sauf par un NÉGATIF : le sens se retourne",
      texte:
        "Multiplier ou diviser une inéquation par un nombre négatif RENVERSE l'inégalité. On le voit sur des nombres : $2 < 5$, mais en multipliant par $-1$, $-2 > -5$. C'est la seule règle du chapitre sans équivalent chez les équations.",
      schema: tableau(
        ["", "2 < 5", "×(−1)", "−4x ⩾ 8"],
        [{ label: "devient", values: ["vrai", "−2 > −5", "x ⩽ −2"] }],
        "Le symbole bascule",
      ),
    },
    {
      titre: "L'ensemble des solutions est un intervalle",
      texte:
        "Une inéquation a une infinité de solutions : on ne les liste pas, on les décrit. $x > 3$ s'écrit $S = \\,]3 \\,;\\, +\\infty[$, et se dessine sur une droite graduée. ⚠️ Vers l'infini, le crochet est TOUJOURS ouvert.",
      schema: droite([{ value: 3, label: "3" }], -1, 7),
    },
  ],

  reel: {
    texte:
      "Deux forfaits téléphone : le premier coûte $12$ € par mois sans engagement, le second $5$ € plus $0{,}25$ € par Go consommé. À partir de combien de Go le second devient-il plus cher ? On résout $5 + 0{,}25x > 12$, soit $0{,}25x > 7$, donc $x > 28$. Au-delà de $28$ Go, le premier forfait est le bon. ⭐ La réponse n'est pas un nombre mais un SEUIL — et c'est exactement pourquoi la question s'écrit avec une inéquation et non avec une égalité.",
  },

  historique: {
    texte:
      "Le mot algèbre vient du titre d'un livre : Al-jabr wa'l-muqābala, écrit à Bagdad vers 820 par al-Khwârizmî. Ses deux mots nomment précisément les deux gestes de la fiche — al-jabr, « la restauration », c'est ajouter la même chose des deux côtés pour faire disparaître un terme négatif ; al-muqābala, « la mise en balance », c'est réduire les termes semblables. Douze siècles plus tard, on résout encore une équation en faisant exactement ces deux choses.",
  },

  methode: [
    {
      titre: "Je rassemble les $x$ d'un côté",
      texte:
        "Tous les termes en $x$ à gauche, tous les nombres à droite. On y arrive en ajoutant ou soustrayant la même chose des deux côtés.",
      schema: tableau(
        ["", "5x + 3 = 2x + 12", "puis"],
        [{ label: "devient", values: ["5x − 2x = 12 − 3", "3x = 9"] }],
      ),
    },
    {
      titre: "Je divise, et je regarde le signe",
      texte:
        "Diviser par le coefficient de $x$. ⛔ S'il s'agit d'une inéquation ET que ce coefficient est négatif, le symbole se retourne à ce moment précis.",
      schema: tableau(
        ["", "3x = 9", "−3x > 9"],
        [{ label: "donne", values: ["x = 3", "x < −3"] }],
      ),
    },
    {
      titre: "Je conclus dans la bonne langue",
      texte:
        "Une équation se conclut par $S = \\{3\\}$, une inéquation par un intervalle. Et une équation se VÉRIFIE : je remplace $x$ par ma valeur et je regarde si l'égalité tient.",
      schema: tableau(
        ["", "équation", "inéquation"],
        [{ label: "on écrit", values: ["S = {3}", "S = ]−∞ ; −3["] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Mettre un problème en équation",
      detail:
        "On nomme l'inconnue par une phrase — « soit $x$ le nombre cherché » — puis on traduit l'énoncé mot à mot. « Le double d'un nombre augmenté de $3$ vaut $11$ » devient $2x + 3 = 11$.",
      schema: tableau(
        ["", "le double de x", "augmenté de 3", "vaut 11"],
        [{ label: "s'écrit", values: ["2x", "2x + 3", "2x + 3 = 11"] }],
        "Mot à mot",
      ),
    },
    {
      titre: "Traduire en intervalle",
      detail:
        "Le crochet est fermé quand la borne est atteinte ($\\leqslant$, $\\geqslant$) et ouvert sinon. Vers l'infini, il est toujours ouvert.",
      schema: tableau(
        ["", "x > 3", "x ⩽ −2", "−1 ⩽ x < 4"],
        [{ label: "intervalle", values: ["]3 ; +∞[", "]−∞ ; −2]", "[−1 ; 4["] }],
        "Le crochet suit le symbole",
      ),
    },
    {
      titre: "Comparer deux quantités",
      detail:
        "Pour savoir laquelle de $A$ et $B$ est la plus grande, on étudie le SIGNE de $A - B$. Si $A - B > 0$, alors $A > B$. Pour deux nombres strictement positifs, le quotient $\\dfrac{A}{B}$ répond aussi.",
      schema: tableau(
        ["A − B", "positif", "nul", "négatif"],
        [{ label: "conclusion", values: ["A > B", "A = B", "A < B"] }],
        "Le signe de la différence",
      ),
    },
  ],

  exemples: [
    {
      titre: "Une équation avec des $x$ des deux côtés",
      donnees: "$5x + 3 = 2x + 12$.",
      question: "Résoudre.",
      schema: tableau(
        ["", "étape 1", "étape 2", "étape 3"],
        [{ label: "on obtient", values: ["3x + 3 = 12", "3x = 9", "x = 3"] }],
      ),
      solution:
        "Je retire $2x$ des deux côtés : $3x + 3 = 12$. Je retire $3$ : $3x = 9$. Je divise par $3$ : $x = 3$. Vérification : $5 \\times 3 + 3 = 18$ et $2 \\times 3 + 12 = 18$ — l'égalité tient. Donc $S = \\{3\\}$.",
    },
    {
      titre: "Une inéquation qui se retourne",
      donnees: "$-4x + 1 \\geqslant 9$.",
      question: "Résoudre.",
      schema: tableau(
        ["", "−4x ⩾ 8", "÷(−4)", "résultat"],
        [{ label: "signe", values: ["⩾", "il bascule", "x ⩽ −2"] }],
      ),
      solution:
        "Je retire $1$ : $-4x \\geqslant 8$ — le sens n'a pas bougé, on n'a fait qu'une soustraction. Je divise par $-4$, et LÀ le symbole se retourne : $x \\leqslant -2$. Donc $S = \\,]-\\infty \\,;\\, -2]$. ⚠️ Le contrôle : je remplace $x$ par $-3$, qui est bien $\\leqslant -2$ ; $-4 \\times (-3) + 1 = 13 \\geqslant 9$, c'est vrai.",
    },
    {
      titre: "Du symbole à l'intervalle",
      donnees: "$S$ est l'ensemble des $x$ tels que $x \\leqslant 4$.",
      question: "Écrire $S$ sous forme d'intervalle.",
      schema: tableau(
        ["", "borne", "atteinte ?", "vers"],
        [{ label: "x ⩽ 4", values: ["4", "oui", "−∞"] }],
      ),
      solution:
        "La borne $4$ est atteinte, donc le crochet est FERMÉ de son côté ; du côté de $-\\infty$ il est ouvert, comme toujours. Donc $S = \\,]-\\infty \\,;\\, 4]$. ⚠️ Le crochet fermé se tourne vers l'intérieur — écrire $[-\\infty \\,;\\, 4]$ n'a pas de sens : l'infini n'est pas un nombre, il ne peut pas être atteint.",
    },
    {
      titre: "Un problème mis en équation",
      donnees: "La somme de deux entiers consécutifs vaut $47$.",
      question: "Quels sont ces deux entiers ?",
      schema: tableau(
        ["", "le petit", "le grand", "leur somme"],
        [{ label: "s'écrit", values: ["x", "x + 1", "2x + 1 = 47"] }],
      ),
      solution:
        "Soit $x$ le plus petit des deux entiers ; le suivant vaut $x + 1$. L'énoncé donne $x + (x+1) = 47$, soit $2x + 1 = 47$, puis $2x = 46$ et $x = 23$. Les deux entiers sont $23$ et $24$. Vérification : $23 + 24 = 47$. ⭐ La phrase « soit $x$ le plus petit » n'est pas décorative : sans elle, la réponse ne veut rien dire.",
    },
  ],

  pieges: [
    "⛔ Diviser une inéquation par un NÉGATIF retourne le symbole. $-2x > 6$ donne $x < -3$, et non $x > -3$. C'est l'erreur la plus coûteuse du chapitre.",
    "⛔ Ajouter ou soustraire ne retourne JAMAIS rien. Seules la multiplication et la division par un négatif basculent le sens.",
    "⛔ Une inéquation ne se conclut pas par $x = 3$. Sa réponse est un intervalle : il y a une infinité de solutions, pas une.",
    "⛔ Vers l'infini, le crochet est toujours OUVERT. $[3 \\,;\\, +\\infty]$ n'existe pas : $+\\infty$ n'est pas un nombre.",
    "⛔ Dans une mise en équation, on écrit d'abord ce que $x$ DÉSIGNE. Sans cette phrase, un résultat juste ne répond à aucune question.",
    "⛔ On ne « passe » pas un terme de l'autre côté par magie : on ajoute ou on soustrait la même chose des deux côtés. C'est le même geste, mais le dire ainsi évite les erreurs de signe.",
  ],

  aRetenir: [
    "On fait la même chose DES DEUX CÔTÉS : c'est le seul geste autorisé.",
    "Une équation a une solution, une inéquation en a une infinité.",
    "⛔ Multiplier ou diviser une inéquation par un négatif RETOURNE le symbole.",
    "L'ensemble des solutions s'écrit en intervalle : $S = \\,]3 \\,;\\, +\\infty[$.",
    "Crochet fermé si la borne est atteinte, ouvert sinon — et toujours ouvert vers l'infini.",
    "Pour comparer $A$ et $B$, j'étudie le signe de $A - B$.",
  ],

  entrainement: [
    {
      question: "Résoudre $4x + 5 = 21$.",
      correction:
        "$4x = 16$ puis $x = 4$. Vérification : $4 \\times 4 + 5 = 21$. Donc $S = \\{4\\}$.",
    },
    {
      question: "Résoudre $7x - 3 = 4x + 9$.",
      correction:
        "Je retire $4x$ : $3x - 3 = 9$. J'ajoute $3$ : $3x = 12$, donc $x = 4$. Vérification : $7 \\times 4 - 3 = 25$ et $4 \\times 4 + 9 = 25$.",
    },
    {
      question: "Résoudre $3(x + 2) = 18$.",
      correction:
        "Je développe : $3x + 6 = 18$, donc $3x = 12$ et $x = 4$. (On pouvait aussi diviser d'emblée par $3$ : $x + 2 = 6$.)",
    },
    {
      question: "Résoudre $5x + 2 > 17$.",
      correction:
        "$5x > 15$, puis $x > 3$ — le $5$ est positif, le sens ne bouge pas. $S = \\,]3 \\,;\\, +\\infty[$.",
    },
    {
      question: "Résoudre $-3x \\geqslant 12$.",
      correction:
        "Je divise par $-3$ : le symbole se RETOURNE, donc $x \\leqslant -4$. $S = \\,]-\\infty \\,;\\, -4]$. Contrôle : $x = -5$ donne $15 \\geqslant 12$, vrai.",
    },
    {
      question: "Résoudre $2x + 9 < 5x - 3$.",
      correction:
        "Je retire $2x$ : $9 < 3x - 3$. J'ajoute $3$ : $12 < 3x$, donc $4 < x$, c'est-à-dire $x > 4$. $S = \\,]4 \\,;\\, +\\infty[$.",
    },
    {
      question: "Écrire l'ensemble des $x$ tels que $-1 \\leqslant x < 6$ sous forme d'intervalle.",
      correction:
        "$[-1 \\,;\\, 6[$. La borne $-1$ est atteinte, donc crochet fermé ; la borne $6$ ne l'est pas, donc crochet ouvert.",
    },
    {
      question: "La somme de trois entiers consécutifs vaut $72$. Quels sont-ils ?",
      correction:
        "Soit $x$ le plus petit : $x + (x+1) + (x+2) = 72$, soit $3x + 3 = 72$, donc $x = 23$. Ce sont $23$, $24$ et $25$.",
    },
    {
      question: "Un rectangle a une longueur qui dépasse sa largeur $x$ de $4$ cm et un périmètre de $36$ cm. Quelle est sa largeur ?",
      correction:
        "Le périmètre vaut $2(x + x + 4) = 36$, soit $4x + 8 = 36$, donc $4x = 28$ et $x = 7$ cm. La longueur vaut alors $11$ cm — et $2 \\times (7 + 11) = 36$.",
    },
    {
      question: "On a $A = 3x + 5$ et $B = 3x - 2$. Lequel est le plus grand ?",
      correction:
        "$A - B = (3x + 5) - (3x - 2) = 7$, qui est strictement positif quel que soit $x$. Donc $A > B$ toujours — les $3x$ se sont éliminés, la comparaison ne dépend pas de $x$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesEquationsSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Équations et inéquations - 2de",
    section: {
      type: "objectif",
      phrase: "Résoudre, et savoir dire ses solutions dans la bonne langue",
      sousPhrase:
        "Une équation donne un nombre, une inéquation un intervalle. Et diviser par un négatif retourne le symbole.",
    },
  },
];
