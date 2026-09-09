// ─── Fiche de cours : repère et coordonnées (2de) ─────────────────────────────
//
// Huitième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/repere-coordonnees.bank.ts
// (notion repere_coordonnees), et sur la 5e comme étalon.
//
// ⭐ CE QUE LA RELECTURE DU CONTRÔLE A CHANGÉ AU COACH : les trois micros
// d'origine — lire un point, calculer un milieu, calculer une distance —
// enseignaient les GESTES. Or un sujet ne demande jamais un geste isolé : il
// demande ce que ces gestes PROUVENT. « ABCD est-il un parallélogramme ? »,
// « quelle est la nature du triangle ABC ? ». La micro `repere_configuration`
// a été écrite le 08/09/2026 pour ça, et la fiche est construite autour d'elle.
//
// ⭐ LES DEUX SEULES FORMULES DU CHAPITRE, et il faut le dire à l'élève :
//   — le milieu, c'est la MOYENNE des coordonnées ;
//   — la distance, c'est PYTHAGORE, écrit avec des coordonnées.
// Tout le reste est du raisonnement.
//
// ⛔ LE PIÈGE CENTRAL : dans ABCD, les diagonales sont [AC] et [BD] — celles
// qui sautent une lettre. Comparer les milieux de [AB] et [CD] ne prouve rien,
// et c'est l'erreur qui coûte le plus cher.
//
// Micro-compétences couvertes :
// - repere_coordonnees_point → définition, propriété « Le repère », exemple 1, exo 1
// - repere_milieu            → propriété « Le milieu », méthode, exemple 2, exos 2-3
// - repere_distance          → propriété « La distance », exemple 3, exos 4-5
// - repere_configuration     → usages entiers, exemple 4, exos 6 à 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Un tableau — HTML, donc lisible partout, y compris dans `methode` et
 * `exemples` dont les blocs peuvent ne faire que 80 px.
 *
 * ⛔ ET IL NE PREND QUE DU TEXTE NU : `TexteMath` ne le traverse jamais, ses
 * textes arrivant en DONNÉES de figure. On écrit « (3 ; −2) », jamais « $(3;-2)$ ».
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
 * Un repère avec des points — SVG, donc RÉSERVÉ à `proprietes` (225 px) et
 * `usages` (220 px). Sa police d'axes vaut 11 en unités de `viewBox` : à 220 de
 * large, l'élève lit à 11,25 px en poche. ⛔ Au delà de 225, il passe sous 11.
 *
 * ⛔ Et aucun point ne se pose SUR le bord : son étiquette se dessine au-dessus
 * et déborderait. Deux unités de marge, d'où la fenêtre −4/4 pour des points
 * qui ne dépassent pas 2.
 *
 * ⛔⛔ ET LE NOMBRE DE GRADUATIONS COMPTE AUTANT QUE LA POLICE. Première
 * version : fenêtre −6/6, soit treize étiquettes sur 220 px. La police valait
 * 12,4 px — largement au-dessus du seuil — et pourtant « −6 » chevauchait
 * « −5 », mesuré aux deux largeurs. Neuf étiquettes tiennent, treize non : une
 * police lisible ne garantit pas un axe lisible.
 */
function repere(points: { x: number; y: number; label: string; couleur?: string }[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 220, height: 200 },
        xmin: -4,
        xmax: 4,
        ymin: -4,
        ymax: 4,
        grille: true,
        points,
      }}
    />
  );
}

export const ficheRepereSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "repere-coordonnees",
  titre: "Repère et coordonnées",
  accroche:
    "Deux formules seulement : le milieu est une MOYENNE, la distance est PYTHAGORE. Tout l'intérêt du chapitre est ailleurs — c'est ce qu'elles permettent de DÉMONTRER : qu'un quadrilatère est un parallélogramme, qu'un triangle est rectangle, sans jamais rien mesurer.",
  identite: [
    { label: "Mots clés", valeur: "Abscisse, ordonnée, milieu, distance, orthonormé" },
    { label: "Le secret", valeur: "Les diagonales de $ABCD$ sont $[AC]$ et $[BD]$" },
    { label: "Outil", valeur: "La moyenne pour le milieu, Pythagore pour la distance" },
  ],

  definition: {
    texte:
      "Un repère du plan est formé d'une origine $O$ et de deux axes gradués. Tout point $M$ y a un couple de coordonnées $(x \\,;\\, y)$ : $x$ est son ABSCISSE, lue sur l'axe horizontal, et $y$ son ORDONNÉE, lue sur l'axe vertical. Le repère est ORTHONORMÉ quand les deux axes sont perpendiculaires et ont la même unité — condition sans laquelle la formule de la distance est fausse.",
  },

  figure: {
    schema: tableau(
      ["", "milieu de [AB]", "distance AB"],
      [
        { label: "formule", values: ["moyenne des coordonnées", "Pythagore"] },
        { label: "résultat", values: ["un POINT", "un NOMBRE"] },
        { label: "repère", values: ["quelconque suffit", "orthonormé obligatoire"] },
      ],
      "Les deux formules, et ce qui les sépare",
    ),
    legende:
      "Le milieu rend un point, la distance rend un nombre. Et seule la seconde exige un repère orthonormé — c'est la question que le sujet pose pour vérifier qu'on l'a compris.",
  },

  proprietes: [
    {
      titre: "Lire et placer un point",
      texte:
        "On lit toujours l'abscisse EN PREMIER. Ci-contre $A(2 \\,;\\, 2)$, $B(-2 \\,;\\, 1)$ — à gauche, donc abscisse négative — et $C(1 \\,;\\, -2)$, en dessous. ⚠️ $B(-2\\,;1)$ et $B(1\\,;-2)$ ne sont pas le même point : c'est justement $C$.",
      schema: repere([
        { x: 2, y: 2, label: "A", couleur: "#dc2626" },
        { x: -2, y: 1, label: "B", couleur: "#2563eb" },
        { x: 1, y: -2, label: "C", couleur: "#059669" },
      ]),
    },
    {
      titre: "Le milieu : une moyenne",
      texte:
        "Le milieu $M$ de $[AB]$ a pour coordonnées $\\left(\\dfrac{x_A + x_B}{2} \\,;\\, \\dfrac{y_A + y_B}{2}\\right)$. C'est la moyenne des abscisses et la moyenne des ordonnées — rien de plus.",
      schema: tableau(
        ["A(2 ; 4)", "B(8 ; 10)", "milieu"],
        [{ label: "calcul", values: ["(2+8)÷2 = 5", "(4+10)÷2 = 7", "M(5 ; 7)"] }],
        "Deux moyennes, deux coordonnées",
      ),
    },
    {
      titre: "La distance : Pythagore déguisé",
      texte:
        "Dans un repère ORTHONORMÉ, $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$. C'est le théorème de Pythagore appliqué au triangle rectangle dont $[AB]$ est l'hypoténuse et dont les côtés sont l'écart horizontal et l'écart vertical.",
      schema: tableau(
        ["A(1 ; 2)", "B(4 ; 6)", "écarts", "AB"],
        [{ label: "calcul", values: ["—", "—", "3 et 4", "√(9+16) = 5"] }],
        "Le triangle rectangle est caché dans la formule",
      ),
    },
    {
      titre: "⛔ Sans repère orthonormé, pas de distance",
      texte:
        "Si les axes ne sont pas perpendiculaires, ou si leurs unités diffèrent, il n'y a aucun triangle rectangle : Pythagore ne s'applique plus et la formule ment. Le milieu, lui, reste valable dans n'importe quel repère.",
      schema: tableau(
        ["", "milieu", "distance"],
        [{ label: "repère quelconque", values: ["valable", "FAUSSE"] }],
        "Une seule des deux formules est exigeante",
      ),
    },
  ],

  reel: {
    texte:
      "Un GPS ne connaît rien d'autre que des coordonnées. Quand une application affiche « la boulangerie est à $340$ m », elle a fait exactement le calcul de cette fiche : deux soustractions, deux carrés, une racine. Et quand elle propose un point de rendez-vous à mi-chemin entre deux amis, elle calcule un milieu — une moyenne d'abscisses et une moyenne d'ordonnées. Les deux seules formules du chapitre tournent des milliards de fois par jour.",
  },

  historique: {
    texte:
      "En 1637, Descartes publie La Géométrie — le même livre où il fixe l'écriture des exposants. Il y fait une chose alors inouïe : donner une adresse chiffrée à chaque point du plan, si bien qu'une figure devient une équation et qu'un raisonnement géométrique devient un calcul. Fermat y était arrivé de son côté, un an plus tôt, sans publier. C'est de là que vient le mot « cartésien », et c'est de là que vient la possibilité de PROUVER qu'un triangle est rectangle sans jamais poser une équerre dessus.",
  },

  methode: [
    {
      titre: "J'écris les coordonnées avant tout",
      texte:
        "Je note $A(x_A \\,;\\, y_A)$ et $B(x_B \\,;\\, y_B)$ au brouillon. La moitié des erreurs du chapitre sont des confusions entre l'abscisse et l'ordonnée.",
      schema: tableau(
        ["", "xA", "yA", "xB", "yB"],
        [{ label: "A(2;5) B(6;1)", values: [2, 5, 6, 1] }],
      ),
    },
    {
      titre: "Je choisis l'outil selon la question",
      texte:
        "Parallélogramme ou symétrique ? C'est le MILIEU. Nature d'un triangle, longueur, cercle ? C'est la DISTANCE. Aucune question de ce chapitre n'en demande un troisième.",
      schema: tableau(
        ["question", "parallélogramme", "isocèle", "rectangle"],
        [{ label: "outil", values: ["milieu", "distance", "distance"] }],
      ),
    },
    {
      titre: "Je reste sur les carrés",
      texte:
        "Pour la nature d'un triangle, je compare $AB^2$, $AC^2$ et $BC^2$ sans jamais sortir les racines : une égalité approchée ne démontre rien.",
      schema: tableau(
        ["", "AB²", "AC²", "BC²"],
        [{ label: "on compare", values: [9, 16, 25] }],
      ),
    },
  ],

  usages: [
    {
      titre: "Prouver un parallélogramme",
      detail:
        "$ABCD$ est un parallélogramme si et seulement si $[AC]$ et $[BD]$ ont le même milieu. ⛔ Ce sont les DIAGONALES : celles qui sautent une lettre, pas les côtés $[AB]$ et $[CD]$.",
      schema: tableau(
        ["dans ABCD", "[AC]", "[BD]", "[AB]"],
        [{ label: "c'est", values: ["diagonale", "diagonale", "côté"] }],
        "Sauter une lettre",
      ),
    },
    {
      titre: "Trouver la nature d'un triangle",
      detail:
        "Deux longueurs égales : isocèle. Pythagore vérifié sur les carrés : rectangle. Les deux à la fois : rectangle isocèle. Aucune des deux : quelconque.",
      schema: tableau(
        ["on constate", "AB = AC", "AB² + AC² = BC²"],
        [{ label: "on conclut", values: ["isocèle en A", "rectangle en A"] }],
        "Deux constats, deux conclusions",
      ),
    },
    {
      titre: "Construire le symétrique d'un point",
      detail:
        "« $B$ est le symétrique de $A$ par rapport à $C$ » signifie exactement « $C$ est le milieu de $[AB]$ ». On écrit la formule du milieu à l'envers : $x_B = 2x_C - x_A$.",
      schema: tableau(
        ["A(1 ; 3)", "C(4 ; 5)", "B"],
        [{ label: "calcul", values: ["—", "2×4 − 1 = 7", "B(7 ; 7)"] }],
        "La formule du milieu retournée",
      ),
    },
  ],

  exemples: [
    {
      titre: "Lire des coordonnées",
      donnees: "Un point situé à $4$ à gauche de l'origine et $3$ en dessous.",
      question: "Quelles sont ses coordonnées ?",
      schema: tableau(
        ["", "à gauche", "en dessous"],
        [{ label: "signe", values: ["x négatif", "y négatif"] }],
      ),
      solution:
        "Vers la gauche, l'abscisse est négative ; vers le bas, l'ordonnée l'est aussi. Le point est donc $(-4 \\,;\\, -3)$. ⚠️ On écrit toujours l'abscisse en premier.",
    },
    {
      titre: "Un milieu",
      donnees: "$A(-3 \\,;\\, 5)$ et $B(7 \\,;\\, -1)$.",
      question: "Coordonnées du milieu $M$ de $[AB]$ ?",
      schema: tableau(
        ["", "abscisse", "ordonnée"],
        [{ label: "moyenne", values: ["(−3+7)÷2 = 2", "(5−1)÷2 = 2"] }],
      ),
      solution:
        "$x_M = \\dfrac{-3 + 7}{2} = 2$ et $y_M = \\dfrac{5 + (-1)}{2} = 2$. Donc $M(2 \\,;\\, 2)$. ⚠️ Les nombres négatifs entrent dans la moyenne comme les autres : c'est là que se perdent les signes.",
    },
    {
      titre: "Une distance",
      donnees: "$A(1 \\,;\\, -2)$ et $B(5 \\,;\\, 1)$, repère orthonormé.",
      question: "Calculer $AB$.",
      schema: tableau(
        ["", "écart en x", "écart en y", "AB"],
        [{ label: "vaut", values: ["5 − 1 = 4", "1 − (−2) = 3", "5"] }],
      ),
      solution:
        "$AB = \\sqrt{(5-1)^2 + (1-(-2))^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$. ⭐ Les carrés effacent les signes : peu importe qu'on calcule $x_B - x_A$ ou l'inverse.",
    },
    {
      titre: "La nature d'un triangle",
      donnees: "$A(1 \\,;\\, 1)$, $B(4 \\,;\\, 2)$ et $C(-1 \\,;\\, 7)$, repère orthonormé.",
      question: "Quelle est la nature du triangle $ABC$ ?",
      schema: tableau(
        ["", "AB²", "AC²", "BC²"],
        [{ label: "vaut", values: [10, 40, 50] }],
      ),
      solution:
        "$AB^2 = 3^2 + 1^2 = 10$, $AC^2 = (-2)^2 + 6^2 = 40$, $BC^2 = (-5)^2 + 5^2 = 50$. Or $10 + 40 = 50$, c'est-à-dire $AB^2 + AC^2 = BC^2$ : par la réciproque de Pythagore, le triangle est RECTANGLE EN $A$, le sommet opposé au plus grand côté. ⭐ On n'a sorti aucune racine — et c'est exactement ce qui rend la preuve exacte.",
    },
  ],

  pieges: [
    "⛔ Dans $ABCD$, les diagonales sont $[AC]$ et $[BD]$ — celles qui sautent une lettre. Comparer les milieux de $[AB]$ et $[CD]$ ne prouve rien du tout.",
    "⛔ La formule de la distance exige un repère ORTHONORMÉ. Sans angle droit ni unité commune, il n'y a pas de triangle rectangle, donc pas de Pythagore.",
    "⛔ Le milieu est une SOMME divisée par deux, pas une différence. $\\dfrac{x_A + x_B}{2}$, jamais $\\dfrac{x_B - x_A}{2}$ — cette dernière est un écart, pas une position.",
    "⛔ Un milieu est un POINT, il a deux coordonnées. Une distance est un NOMBRE, positif. Rendre l'un pour l'autre est l'erreur de lecture d'énoncé la plus fréquente.",
    "⛔ Pour la réciproque de Pythagore, on reste sur les CARRÉS. Sortir les racines donne des décimaux approchés, et une égalité approchée ne démontre rien.",
    "⛔ $A(3\\,;2)$ et $A(2\\,;3)$ sont deux points différents. L'abscisse s'écrit toujours en premier.",
  ],

  aRetenir: [
    "Milieu de $[AB]$ : $\\left(\\dfrac{x_A+x_B}{2} \\,;\\, \\dfrac{y_A+y_B}{2}\\right)$ — une moyenne.",
    "Distance : $AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}$ — Pythagore, et seulement en repère orthonormé.",
    "$ABCD$ parallélogramme $\\iff$ $[AC]$ et $[BD]$ ont le même milieu.",
    "$B$ symétrique de $A$ par rapport à $C$ $\\iff$ $C$ est le milieu de $[AB]$.",
    "Nature d'un triangle : deux longueurs égales pour isocèle, Pythagore sur les carrés pour rectangle.",
    "Un milieu est un point ; une distance est un nombre.",
  ],

  entrainement: [
    {
      question: "Placer mentalement $A(-2 \\,;\\, 4)$ : où se trouve-t-il ?",
      correction:
        "À $2$ unités à gauche de l'origine et $4$ au-dessus — donc dans le quart en haut à gauche du repère.",
    },
    {
      question: "Coordonnées du milieu de $[AB]$ avec $A(2 \\,;\\, 4)$ et $B(8 \\,;\\, 10)$ ?",
      correction:
        "$\\left(\\dfrac{2+8}{2} \\,;\\, \\dfrac{4+10}{2}\\right) = (5 \\,;\\, 7)$.",
    },
    {
      question: "Coordonnées du milieu de $[AB]$ avec $A(-5 \\,;\\, 3)$ et $B(1 \\,;\\, -7)$ ?",
      correction:
        "$\\left(\\dfrac{-5+1}{2} \\,;\\, \\dfrac{3-7}{2}\\right) = (-2 \\,;\\, -2)$. Les signes entrent dans la moyenne comme le reste.",
    },
    {
      question: "Calculer $AB$ avec $A(0 \\,;\\, 0)$ et $B(6 \\,;\\, 8)$, repère orthonormé.",
      correction:
        "$AB = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.",
    },
    {
      question: "Calculer $AB$ avec $A(-1 \\,;\\, 2)$ et $B(3 \\,;\\, -1)$, repère orthonormé.",
      correction:
        "Écarts : $3 - (-1) = 4$ et $-1 - 2 = -3$. Donc $AB = \\sqrt{16 + 9} = \\sqrt{25} = 5$.",
    },
    {
      question: "Peut-on utiliser la formule de la distance dans un repère non orthonormé ?",
      correction:
        "Non. Elle repose sur Pythagore, qui exige un angle droit entre les axes et une même unité. La formule du milieu, elle, reste valable.",
    },
    {
      question: "Soit $A(1 \\,;\\, 2)$, $B(5 \\,;\\, 3)$ et $C(6 \\,;\\, 7)$. Quel point $D$ rend $ABCD$ parallélogramme ?",
      correction:
        "Les diagonales $[AC]$ et $[BD]$ doivent avoir le même milieu, donc $x_D = x_A + x_C - x_B = 1 + 6 - 5 = 2$ et $y_D = 2 + 7 - 3 = 6$. Ainsi $D(2 \\,;\\, 6)$.",
    },
    {
      question: "Soit $A(0 \\,;\\, 1)$ et $C(3 \\,;\\, -2)$. Quel est le symétrique $B$ de $A$ par rapport à $C$ ?",
      correction:
        "$C$ doit être le milieu de $[AB]$, donc $x_B = 2 \\times 3 - 0 = 6$ et $y_B = 2 \\times (-2) - 1 = -5$. Ainsi $B(6 \\,;\\, -5)$.",
    },
    {
      question: "Soit $A(0 \\,;\\, 0)$, $B(3 \\,;\\, 1)$ et $C(1 \\,;\\, 3)$. Nature du triangle $ABC$ ?",
      correction:
        "$AB^2 = 9 + 1 = 10$ et $AC^2 = 1 + 9 = 10$ : les deux sont égaux, donc le triangle est ISOCÈLE EN $A$. ($BC^2 = 4 + 4 = 8$, différent, donc il n'est pas équilatéral.)",
    },
    {
      question: "Soit $A(2 \\,;\\, 1)$, $B(5 \\,;\\, 2)$ et $C(0 \\,;\\, 7)$. Nature du triangle $ABC$ ?",
      correction:
        "$AB^2 = 9 + 1 = 10$, $AC^2 = 4 + 36 = 40$, $BC^2 = 25 + 25 = 50$. Comme $10 + 40 = 50$, la réciproque de Pythagore donne un triangle RECTANGLE EN $A$.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesRepereSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Repère et coordonnées - 2de",
    section: {
      type: "objectif",
      phrase: "Démontrer une figure sans jamais rien mesurer",
      sousPhrase:
        "Le milieu est une moyenne, la distance est Pythagore. Avec ces deux formules on prouve un parallélogramme et la nature d'un triangle.",
    },
  },
];
