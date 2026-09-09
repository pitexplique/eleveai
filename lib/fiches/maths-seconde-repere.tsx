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
import {
  egalite,
  egalites,
  cas,
  enBleu,
  enRouge,
  enVert,
  BLEU,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

/**
 * ⛔ PLUS AUCUN TABLEAU DANS CETTE FICHE — Frédéric, 10/09/2026, après avoir
 * relu la fiche des vecteurs : « fiche vecteur parfaite, mieux vaut des schémas
 * que des tableaux ». C'est une préférence générale, pas un correctif local.
 *
 * ⚠️ Et ce n'est PAS que les tableaux étaient faux. La veille, sur cette fiche
 * même : « il était clair, juste un problème de mettre en deux colonnes ». Ils
 * étaient à l'étroit, la largeur a été corrigée séparément. Le schéma l'emporte
 * parce qu'il dit MIEUX — une formule avec la partie utile en couleur montre
 * l'idée, là où un tableau la décrit.
 *
 * Les quatorze tableaux sont devenus des schémas de `lib/fiches/schemas.tsx` :
 * `egalites` pour un calcul qui se déroule, `cas` pour une comparaison, et le
 * repère dessiné ci-dessous pour une position.
 */

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
    // ⛔ `egalites` ET NON `cas` ICI, et c'est mesuré : dans le bloc figure, deux
    // cartes de `cas` tombent à 141 px alors que ces deux formules font 208 et
    // 223 px. `cas` est fait pour des étiquettes COURTES ; une formule longue
    // prend la pleine largeur.
    schema: egalites(
      [
        enBleu("M") + "\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\right)",
        enRouge("AB") + " = \\sqrt{(x_B-x_A)^2+(y_B-y_A)^2}",
      ],
      "En bleu le milieu, qui est un POINT. En rouge la distance, qui est un NOMBRE. Ce sont les deux seules formules du chapitre.",
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
      schema: egalites(
        [
          "A(2\\,;4) \\qquad B(8\\,;10)",
          "x_M = \\dfrac{2+8}{2} = " + enRouge("5"),
          "y_M = \\dfrac{4+10}{2} = " + enVert("7"),
        ],
        "Deux moyennes, et le milieu vaut M(5 ; 7).",
      ),
    },
    {
      titre: "La distance : Pythagore déguisé",
      texte:
        "Dans un repère ORTHONORMÉ, $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$. C'est le théorème de Pythagore appliqué au triangle rectangle dont $[AB]$ est l'hypoténuse et dont les côtés sont l'écart horizontal et l'écart vertical.",
      schema: egalites(
        [
          "A(1\\,;2) \\qquad B(4\\,;6)",
          "AB = \\sqrt{" + enRouge("3") + "^2 + " + enVert("4") + "^2}",
          "AB = \\sqrt{25} = 5",
        ],
        "En rouge l'écart horizontal, en vert le vertical : le triangle rectangle est caché dans la formule.",
      ),
    },
    {
      titre: "⛔ Sans repère orthonormé, pas de distance",
      texte:
        "Si les axes ne sont pas perpendiculaires, ou si leurs unités diffèrent, il n'y a aucun triangle rectangle : Pythagore ne s'applique plus et la formule ment. Le milieu, lui, reste valable dans n'importe quel repère.",
      schema: cas(
        [
          { formule: "\\text{le milieu}", verdict: "valable partout", couleur: VERT },
          { formule: "\\text{la distance}", verdict: "orthonormé exigé", couleur: ROUGE },
        ],
        "Sans angle droit ni unité commune, il n'y a aucun triangle rectangle — donc pas de Pythagore.",
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
      schema: egalites(
        [
          "A(" + enRouge("2") + "\\,;" + enVert("5") + ")",
          "B(" + enRouge("6") + "\\,;" + enVert("1") + ")",
        ],
        "En rouge les abscisses, en vert les ordonnées. On ne les mélange plus.",
      ),
    },
    {
      titre: "Je choisis l'outil selon la question",
      texte:
        "Parallélogramme ou symétrique ? C'est le MILIEU. Nature d'un triangle, longueur, cercle ? C'est la DISTANCE. Aucune question de ce chapitre n'en demande un troisième.",
      schema: cas(
        [
          { formule: "\\text{parallélogramme}", verdict: "le MILIEU", couleur: BLEU },
          { formule: "\\text{nature du triangle}", verdict: "la DISTANCE", couleur: ROUGE },
        ],
        "La question dit l'outil, et il n'y en a que deux.",
      ),
    },
    {
      titre: "Je reste sur les carrés",
      texte:
        "Pour la nature d'un triangle, je compare $AB^2$, $AC^2$ et $BC^2$ sans jamais sortir les racines : une égalité approchée ne démontre rien.",
      schema: egalite(
        "AB^2 + AC^2 = BC^2",
        "On compare les CARRÉS : 9 + 16 = 25. Aucune racine à sortir.",
      ),
    },
  ],

  usages: [
    {
      titre: "Prouver un parallélogramme",
      detail:
        "$ABCD$ est un parallélogramme si et seulement si $[AC]$ et $[BD]$ ont le même milieu. ⛔ Ce sont les DIAGONALES : celles qui sautent une lettre, pas les côtés $[AB]$ et $[CD]$.",
      schema: egalites(
        [
          "\\text{milieu de } [" + enRouge("AC") + "] = \\text{milieu de } [" + enRouge("BD") + "]",
          "\\Updownarrow",
          "ABCD \\text{ parallélogramme}",
        ],
        "Les diagonales sautent une lettre : [AC] et [BD], jamais les côtés.",
      ),
    },
    {
      titre: "Trouver la nature d'un triangle",
      detail:
        "Deux longueurs égales : isocèle. Pythagore vérifié sur les carrés : rectangle. Les deux à la fois : rectangle isocèle. Aucune des deux : quelconque.",
      schema: cas(
        [
          { formule: "AB = AC", verdict: "isocèle en $A$", couleur: BLEU },
          { formule: "AB^2 + AC^2 = BC^2", verdict: "rectangle en $A$", couleur: ROUGE },
        ],
        "Les deux à la fois : rectangle isocèle. Aucune des deux : quelconque.",
      ),
    },
    {
      titre: "Construire le symétrique d'un point",
      detail:
        "« $B$ est le symétrique de $A$ par rapport à $C$ » signifie exactement « $C$ est le milieu de $[AB]$ ». On écrit la formule du milieu à l'envers : $x_B = 2x_C - x_A$.",
      schema: egalites(
        [
          "x_B = " + enRouge("2") + "x_C - x_A",
          "x_B = 2 \\times 4 - 1 = 7",
        ],
        "La formule du milieu écrite à l'envers. Avec A(1 ; 3) et C(4 ; 5) : B(7 ; 7).",
      ),
    },
  ],

  exemples: [
    {
      titre: "Lire des coordonnées",
      donnees: "Un point situé à $4$ à gauche de l'origine et $3$ en dessous.",
      question: "Quelles sont ses coordonnées ?",
      schema: cas(
        [
          { formule: "\\leftarrow \\text{ à gauche}", verdict: "$x$ négatif", couleur: ROUGE },
          { formule: "\\downarrow \\text{ en dessous}", verdict: "$y$ négatif", couleur: VERT },
        ],
      ),
      solution:
        "Vers la gauche, l'abscisse est négative ; vers le bas, l'ordonnée l'est aussi. Le point est donc $(-4 \\,;\\, -3)$. ⚠️ On écrit toujours l'abscisse en premier.",
    },
    {
      titre: "Un milieu",
      donnees: "$A(-3 \\,;\\, 5)$ et $B(7 \\,;\\, -1)$.",
      question: "Coordonnées du milieu $M$ de $[AB]$ ?",
      schema: egalites(
        [
          "x_M = \\dfrac{-3+7}{2} = 2",
          "y_M = \\dfrac{5+(-1)}{2} = 2",
        ],
        "Les négatifs entrent dans la moyenne comme les autres.",
      ),
      solution:
        "$x_M = \\dfrac{-3 + 7}{2} = 2$ et $y_M = \\dfrac{5 + (-1)}{2} = 2$. Donc $M(2 \\,;\\, 2)$. ⚠️ Les nombres négatifs entrent dans la moyenne comme les autres : c'est là que se perdent les signes.",
    },
    {
      titre: "Une distance",
      donnees: "$A(1 \\,;\\, -2)$ et $B(5 \\,;\\, 1)$, repère orthonormé.",
      question: "Calculer $AB$.",
      schema: egalites(
        [
          "AB = \\sqrt{" + enRouge("4") + "^2 + " + enVert("3") + "^2}",
          "AB = \\sqrt{25} = 5",
        ],
        "En rouge l'écart horizontal, en vert le vertical.",
      ),
      solution:
        "$AB = \\sqrt{(5-1)^2 + (1-(-2))^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = \\sqrt{25} = 5$. ⭐ Les carrés effacent les signes : peu importe qu'on calcule $x_B - x_A$ ou l'inverse.",
    },
    {
      titre: "La nature d'un triangle",
      donnees: "$A(1 \\,;\\, 1)$, $B(4 \\,;\\, 2)$ et $C(-1 \\,;\\, 7)$, repère orthonormé.",
      question: "Quelle est la nature du triangle $ABC$ ?",
      schema: egalites(
        [
          "AB^2 = 10 \\quad AC^2 = 40 \\quad BC^2 = 50",
          enRouge("10 + 40 = 50"),
        ],
        "Pythagore est vérifié : le triangle est rectangle en A.",
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
