// ─── Fiche de cours : les fonctions de référence (2de) ────────────────────────
//
// Dixième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/fonctions-reference.bank.ts
// (notion fonctions_reference_2de), et sur la 5e comme étalon.
//
// ⚠️ CALENDRIER : à La Réunion, ce chapitre tombe « en décembre voire février »
// (Frédéric). Il n'est PAS dans le contrôle commun de mars 2025, mais il arrive
// juste après lui dans la progression.
//
// ⭐ LE GESTE DE FRÉDÉRIC, ET IL EST LA COLONNE VERTÉBRALE DE CETTE FICHE. Ses
// mots : « je fais calculer l'image de 4 par la courbe racine carrée et je
// montre que −1 n'a pas d'image ; les autres ne le font pas, ils le font APRÈS
// sur les fonctions de référence ». Le coach n'avait AUCUN item sur une image
// qui n'existe pas — c'est pourtant ce qui distingue ces cinq fonctions les unes
// des autres. Deux gabarits l'ont comblé le 09/09/2026.
//
// ⛔ LE PIÈGE CENTRAL : « si a < b alors a² < b² » est FAUX. Sur les négatifs,
// élever au carré INVERSE l'ordre. C'est la seule des cinq fonctions qui change
// de sens de variation en cours de route.
//
// Micro-compétences couvertes :
// - reference_carre          → propriété « La fonction carré », exemple 2, exos 1-2
// - reference_inverse        → propriété « La fonction inverse », exos 3-4
// - reference_racine         → propriété « La fonction racine carrée », exemple 1, exos 5-6
// - reference_cube           → propriété « La fonction cube », exo 7
// - reference_comparer       → méthode, usages « Comparer sans calculer », exemple 3, exos 8-9
// - reference_resoudre       → usages « Résoudre f(x) = k », exemple 4, exo 10
// - reference_valeur_absolue → figure (la cinquième fonction, écrite le 04/09)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ ET IL NE PREND QUE DU TEXTE NU : `TexteMath` ne le traverse jamais.
 * On écrit « x² » en Unicode, jamais « $x^2$ ».
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

/** Échantillonne une fonction pour la tracer en `points`. */
function echantillonne(f: (x: number) => number, xmin: number, xmax: number, pas: number) {
  const pts: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    const xr = Math.round(x * 100) / 100;
    pts.push({ x: xr, y: Math.round(f(xr) * 100) / 100 });
  }
  return pts;
}

/**
 * Une courbe — SVG, donc RÉSERVÉE à `proprietes` (225 px) et `usages` (220 px).
 * La police des axes vaut 11 en unités de `viewBox` : à 220 de large, l'élève
 * lit à 11,25 px en poche. ⛔ Au delà de 225, il passe sous 11.
 *
 * ⛔ ET LE NOMBRE DE GRADUATIONS COMPTE AUTANT QUE LA POLICE — leçon payée sur
 * la fiche du repère, où treize étiquettes se chevauchaient à 12,4 px. Les
 * fenêtres ci-dessous sont donc étroites en X. En Y c'est moins critique : les
 * étiquettes s'empilent verticalement et disposent de plus de place chacune.
 */
function courbe(
  points: { x: number; y: number }[],
  fenetre: { xmin: number; xmax: number; ymin: number; ymax: number },
  marques?: { x: number; y: number; label: string; couleur?: string }[],
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 220, height: 200 },
        ...fenetre,
        grille: true,
        courbes: [{ id: "f", type: "points", couleur: "#2563eb", points }],
        misesEnEvidence: marques?.map((point) => ({ point })),
      }}
    />
  );
}

export const ficheFonctionsReferenceSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonctions-reference-2de",
  titre: "Les fonctions de référence",
  accroche:
    "Cinq fonctions à connaître par cœur, et trois questions à se poser sur chacune : qui a une image, dans quel sens elle varie, à quoi ressemble sa courbe. La première question surprend — la racine carrée refuse les négatifs, et l'inverse refuse zéro.",
  identite: [
    { label: "Mots clés", valeur: "Carré, inverse, racine, cube, valeur absolue" },
    { label: "Le secret", valeur: "Une fonction n'est pas obligée de donner une image à tout le monde" },
    { label: "Outil", valeur: "Le sens de variation, pour comparer sans calculer" },
  ],

  definition: {
    texte:
      "On appelle fonctions de référence cinq fonctions dont on connaît par cœur le domaine, les variations et la courbe : $x \\mapsto x^2$, $x \\mapsto \\dfrac{1}{x}$, $x \\mapsto \\sqrt{x}$, $x \\mapsto x^3$ et $x \\mapsto |x|$. Le DOMAINE DE DÉFINITION est l'ensemble des nombres qui ont une image — et il n'est pas toujours $\\mathbb{R}$.",
  },

  figure: {
    schema: tableau(
      ["x²", "1/x", "√x", "x³", "|x|"],
      [
        { label: "définie sur", values: ["ℝ", "ℝ sauf 0", "x ⩾ 0", "ℝ", "ℝ"] },
        { label: "courbe", values: ["parabole", "hyperbole", "demi-branche", "en S", "en V"] },
        { label: "variations", values: ["↘ puis ↗", "↘ des 2 côtés", "↗", "↗", "↘ puis ↗"] },
      ],
      "Les cinq, d'un coup d'œil",
    ),
    legende:
      "Deux d'entre elles seulement ont un domaine restreint : $\\sqrt{x}$ refuse les négatifs, $\\dfrac{1}{x}$ refuse zéro. Et deux d'entre elles changent de sens en chemin — celles dont la courbe a un creux.",
  },

  proprietes: [
    {
      titre: "La fonction carré : elle inverse l'ordre à gauche",
      texte:
        "Définie sur $\\mathbb{R}$, elle est DÉCROISSANTE sur $]-\\infty \\,;\\, 0]$ puis CROISSANTE sur $[0 \\,;\\, +\\infty[$. ⛔ Donc $-5 < -2$ mais $25 > 4$ : élever au carré n'a inversé l'ordre que parce qu'on était du côté négatif.",
      schema: courbe(
        echantillonne((x) => x * x, -3, 3, 0.25),
        { xmin: -3, xmax: 3, ymin: -1, ymax: 9 },
        [{ x: 0, y: 0, label: "S", couleur: "#dc2626" }],
      ),
    },
    {
      titre: "La fonction inverse : zéro est exclu",
      texte:
        "Définie sur $\\mathbb{R}^*$ — tous les réels SAUF zéro, car $\\dfrac{1}{0}$ n'a pas de sens. Elle est décroissante sur $]-\\infty \\,;\\, 0[$ ET sur $]0 \\,;\\, +\\infty[$, séparément : sa courbe est en deux morceaux qui ne se rejoignent jamais.",
      schema: courbe(
        [
          ...echantillonne((x) => 1 / x, -4, -0.25, 0.25),
          ...echantillonne((x) => 1 / x, 0.25, 4, 0.25),
        ],
        { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
      ),
    },
    {
      titre: "⭐ La racine carrée : $-1$ n'a pas d'image",
      texte:
        "Définie seulement sur $[0 \\,;\\, +\\infty[$. L'image de $4$ est $2$, celle de $9$ est $3$ — mais $-1$ n'en a AUCUNE : il n'existe pas de nombre dont le carré vaut $-1$. Sa courbe s'arrête net à l'origine et ne repart jamais vers la gauche.",
      schema: courbe(
        echantillonne((x) => Math.sqrt(x), 0, 9, 0.25),
        { xmin: -2, xmax: 9, ymin: -1, ymax: 4 },
        [{ x: 4, y: 2, label: "(4 ; 2)", couleur: "#dc2626" }],
      ),
    },
    {
      titre: "La fonction cube : elle ne trahit jamais l'ordre",
      texte:
        "Définie sur $\\mathbb{R}$ et CROISSANTE partout, négatifs compris : si $a < b$ alors $a^3 < b^3$, toujours. ⭐ C'est ce qui la distingue du carré, avec lequel on la confond — $(-3)^3 = -27$ garde son signe.",
      schema: courbe(
        echantillonne((x) => x ** 3, -2, 2, 0.2),
        { xmin: -2, xmax: 2, ymin: -8, ymax: 8 },
      ),
    },
  ],

  reel: {
    texte:
      "L'aire d'un carré de côté $x$ vaut $x^2$, son volume $x^3$ si c'est un cube — et inversement, connaître l'aire d'un terrain carré et vouloir son côté, c'est calculer $\\sqrt{x}$. Quant à la fonction inverse, elle décrit tout ce qui se partage : $8$ parts de gâteau pour $n$ convives, c'est $\\dfrac{8}{n}$ par personne. Plus il y a de monde, moins chacun en a — et jamais personne n'en a une part infinie, ce qui est exactement la raison pour laquelle $0$ n'a pas d'image.",
  },

  historique: {
    texte:
      "Nicole Oresme, à Paris au XIVᵉ siècle, est le premier à dessiner une grandeur qui varie en fonction d'une autre — deux siècles et demi avant Descartes et les coordonnées. Mais le mot « fonction » n'apparaît qu'en 1673 sous la plume de Leibniz, et la notation $f(x)$ qu'en 1734 sous celle d'Euler. Ces cinq courbes-là ont donc été tracées bien avant qu'on ait un mot pour les nommer.",
  },

  methode: [
    {
      titre: "1. Le nombre a-t-il une image ?",
      texte:
        "Avant tout calcul, on regarde le domaine. Un négatif sous une racine, un zéro au dénominateur : la réponse est « pas d'image », et c'est une réponse complète.",
      schema: tableau(
        ["√(−1)", "1/0", "(−1)³"],
        [{ label: "existe ?", values: ["non", "non", "oui : −1"] }],
      ),
    },
    {
      titre: "2. De quel côté de zéro suis-je ?",
      texte:
        "Pour le carré, l'inverse et la valeur absolue, le sens de variation CHANGE selon le côté. Situer les nombres par rapport à zéro décide de tout.",
      schema: tableau(
        ["sur les négatifs", "sur les positifs"],
        [{ label: "le carré", values: ["décroissant", "croissant"] }],
      ),
    },
    {
      titre: "3. Je conclus sans calculer",
      texte:
        "Une fonction croissante conserve l'ordre, une décroissante l'inverse. C'est ce qui permet de comparer $2{,}1^2$ et $2{,}3^2$ sans sortir la calculatrice.",
      schema: tableau(
        ["2,1 < 2,3", "conclusion"],
        [{ label: "positifs", values: ["croissant ici", "2,1² < 2,3²"] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Comparer sans calculer",
      detail:
        "C'est l'usage principal au contrôle. On situe les deux nombres, on lit le sens de variation, on conclut. ⛔ Sur les négatifs, le carré inverse : $-5 < -2$ donne $25 > 4$.",
      schema: tableau(
        ["a = −5, b = −2", "a = 2, b = 5"],
        [{ label: "a² et b²", values: ["a² > b²", "a² < b²"] }],
        "Le même calcul, deux conclusions",
      ),
    },
    {
      titre: "Résoudre $f(x) = k$",
      detail:
        "$x^2 = k$ a DEUX solutions si $k > 0$, une seule si $k = 0$, aucune si $k < 0$. Et $\\sqrt{x} = k$ n'a aucune solution dès que $k$ est négatif, puisqu'une racine n'est jamais négative.",
      schema: tableau(
        ["x² = 9", "x² = 0", "x² = −4"],
        [{ label: "solutions", values: ["2 : −3 et 3", "1 : zéro", "aucune"] }],
        "Le signe de k décide",
      ),
    },
    {
      titre: "Encadrer",
      detail:
        "Si $2 \\leqslant x \\leqslant 3$ alors $4 \\leqslant x^2 \\leqslant 9$. ⛔ Mais si $-3 \\leqslant x \\leqslant -2$, les bornes S'ÉCHANGENT : $4 \\leqslant x^2 \\leqslant 9$ aussi, en partant de l'autre bout.",
      schema: tableau(
        ["[2 ; 3]", "[−3 ; −2]"],
        [{ label: "x² dans", values: ["[4 ; 9]", "[4 ; 9]"] }],
        "Même encadrement, chemin inverse",
      ),
    },
  ],

  exemples: [
    {
      titre: "⭐ Une image qui n'existe pas",
      donnees: "La fonction racine carrée.",
      question: "Quelles sont les images de $4$ et de $-1$ ?",
      schema: tableau(
        ["4", "−1"],
        [{ label: "image", values: ["2", "aucune"] }],
      ),
      solution:
        "L'image de $4$ est $\\sqrt{4} = 2$, car $2^2 = 4$. Mais $-1$ n'a PAS d'image : $\\sqrt{-1}$ devrait être un nombre dont le carré vaut $-1$, et aucun carré n'est négatif. ⭐ Une fonction n'est pas obligée de donner une image à tout le monde — c'est même ce que veut dire « domaine de définition ».",
    },
    {
      titre: "Le carré sur les négatifs",
      donnees: "$a = -5$ et $b = -2$, donc $a < b$.",
      question: "Comparer $a^2$ et $b^2$.",
      schema: tableau(
        ["a = −5", "b = −2"],
        [{ label: "le carré", values: [25, 4] }],
      ),
      solution:
        "$a^2 = 25$ et $b^2 = 4$, donc $a^2 > b^2$. L'ordre s'est INVERSÉ, parce que la fonction carré est décroissante sur les négatifs. ⛔ Écrire « $a < b$ donc $a^2 < b^2$ » est l'erreur la plus fréquente du chapitre : cette implication n'est vraie que sur les positifs.",
    },
    {
      titre: "Comparer sans calculatrice",
      donnees: "$\\sqrt{17}$ et $\\sqrt{15}$.",
      question: "Lequel est le plus grand ?",
      schema: tableau(
        ["15 < 17", "la racine"],
        [{ label: "donc", values: ["—", "√15 < √17"] }],
      ),
      solution:
        "La fonction racine carrée est croissante sur $[0 \\,;\\, +\\infty[$ : elle conserve l'ordre. Comme $15 < 17$, on a $\\sqrt{15} < \\sqrt{17}$. ⭐ Aucune valeur approchée n'était nécessaire — et une valeur approchée n'aurait rien DÉMONTRÉ.",
    },
    {
      titre: "Une équation sans solution",
      donnees: "$\\sqrt{x} = -3$.",
      question: "Résoudre.",
      schema: tableau(
        ["√x", "−3"],
        [{ label: "signe", values: ["toujours ⩾ 0", "négatif"] }],
      ),
      solution:
        "Aucune solution. Une racine carrée est toujours positive ou nulle, elle ne peut donc jamais valoir $-3$. ⛔ Le réflexe d'élever au carré donnerait $x = 9$ — mais $\\sqrt{9} = 3$, et non $-3$ : la vérification élimine cette fausse solution. On regarde le signe AVANT de calculer.",
    },
  ],

  pieges: [
    "⛔ « $a < b$ donc $a^2 < b^2$ » est FAUX. Sur les négatifs, l'ordre s'inverse : $-5 < -2$ mais $25 > 4$.",
    "⛔ $\\sqrt{x}$ n'existe que pour $x \\geqslant 0$, et $\\dfrac{1}{x}$ que pour $x \\neq 0$. « Pas d'image » est une réponse complète, pas un aveu d'échec.",
    "⛔ Une racine carrée n'est JAMAIS négative. $\\sqrt{x} = -3$ n'a pas de solution, et élever au carré sans regarder le signe fabrique une fausse réponse.",
    "⛔ $x^2 = 9$ a DEUX solutions, $-3$ et $3$. N'en donner qu'une est l'oubli le plus courant.",
    "⛔ Le cube n'est pas le carré. $(-3)^3 = -27$ garde son signe, et la fonction cube est croissante partout — elle ne trahit jamais l'ordre.",
    "⛔ La fonction inverse est décroissante sur chacun de ses deux morceaux, mais pas d'un morceau à l'autre : $-2 < 3$ et pourtant $\\dfrac{1}{-2} < \\dfrac{1}{3}$. Il faut franchir zéro pour le voir.",
  ],

  aRetenir: [
    "Domaine : $x^2$, $x^3$ et $|x|$ sur $\\mathbb{R}$ ; $\\sqrt{x}$ sur $[0 \\,;\\, +\\infty[$ ; $\\dfrac{1}{x}$ sur $\\mathbb{R}^*$.",
    "Le carré et la valeur absolue décroissent puis croissent — le creux est en $0$.",
    "La racine et le cube sont croissantes : elles conservent l'ordre.",
    "L'inverse décroît sur chacun de ses deux morceaux, séparément.",
    "Une fonction croissante conserve l'ordre, une décroissante l'inverse : c'est ainsi qu'on compare sans calculer.",
    "$x^2 = k$ : deux solutions si $k > 0$, une si $k = 0$, aucune si $k < 0$.",
  ],

  entrainement: [
    {
      question: "Combien vaut l'image de $-7$ par la fonction carré ?",
      correction:
        "$(-7)^2 = 49$. Un carré est toujours positif, le signe disparaît.",
    },
    {
      question: "Combien l'équation $x^2 = 36$ a-t-elle de solutions ?",
      correction:
        "Deux : $x = 6$ et $x = -6$, car deux nombres opposés ont le même carré. Ne donner que $6$ est un demi-résultat.",
    },
    {
      question: "Quelle est l'image de $0$ par la fonction inverse ?",
      correction:
        "Elle n'existe pas. $\\dfrac{1}{0}$ n'a pas de sens : aucun nombre multiplié par $0$ ne donne $1$. C'est la seule valeur exclue.",
    },
    {
      question: "Comparer $\\dfrac{1}{3}$ et $\\dfrac{1}{8}$.",
      correction:
        "$3 < 8$ et la fonction inverse est décroissante sur les positifs, donc $\\dfrac{1}{3} > \\dfrac{1}{8}$. L'ordre s'inverse.",
    },
    {
      question: "Quelle est l'image de $-4$ par la fonction racine carrée ?",
      correction:
        "Elle n'existe pas : la racine carrée n'est définie que sur $[0 \\,;\\, +\\infty[$. Aucun nombre n'a $-4$ pour carré.",
    },
    {
      question: "Résoudre $\\sqrt{x} = 7$.",
      correction:
        "$7$ est positif, on peut élever au carré : $x = 49$. Vérification : $\\sqrt{49} = 7$.",
    },
    {
      question: "Comparer $(-4)^3$ et $(-2)^3$.",
      correction:
        "$-64$ et $-8$, donc $(-4)^3 < (-2)^3$. La fonction cube est croissante partout : l'ordre de $-4 < -2$ est conservé, contrairement au carré.",
    },
    {
      question: "Comparer $2{,}9^2$ et $3{,}1^2$ sans calculatrice.",
      correction:
        "Les deux nombres sont positifs et $2{,}9 < 3{,}1$ ; la fonction carré est croissante sur les positifs, donc $2{,}9^2 < 3{,}1^2$.",
    },
    {
      question: "On sait que $-3 \\leqslant x \\leqslant -1$. Encadrer $x^2$.",
      correction:
        "L'intervalle est entièrement négatif, où le carré DÉCROÎT : les bornes s'échangent. $(-1)^2 = 1$ devient le minimum et $(-3)^2 = 9$ le maximum, donc $1 \\leqslant x^2 \\leqslant 9$.",
    },
    {
      question: "Résoudre $x^2 = -16$.",
      correction:
        "Aucune solution : un carré n'est jamais négatif. Inutile de chercher une racine — le signe de $-16$ suffit à conclure.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesFonctionsReferenceSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fonctions de référence - 2de",
    section: {
      type: "objectif",
      phrase: "Comparer sans calculer, et savoir qui n'a pas d'image",
      sousPhrase:
        "Cinq fonctions, trois questions chacune : son domaine, son sens de variation, sa courbe. Et $-1$ n'a pas d'image par la racine carrée.",
    },
  },
];
