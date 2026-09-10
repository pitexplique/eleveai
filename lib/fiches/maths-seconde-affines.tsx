// ─── Fiche de cours : les fonctions affines (2de) ─────────────────────────────
//
// Douzième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/fonctions-affines.bank.ts
// (notion fonctions_affines_2de), et sur la 5e comme étalon.
//
// ⭐ CE QUE LA MESURE A CHANGÉ AU COACH LE 10/09/2026. Les quatre micros
// passaient tous les seuils, et trois gestes manquaient quand même :
//   — LA LECTURE GRAPHIQUE tenait en UN item figé, alors qu'une fonction affine
//     EST une droite : lire a et b sur un dessin est la question type ;
//   — LES DEUX POINTS QUELCONQUES n'existaient qu'en items figés, le gabarit ne
//     tirant que f(0) — ce qui DONNE b et supprime le calcul de la pente ;
//   — LE SIGNE ne se demandait que « positive », jamais négative, et jamais dans
//     la forme du tableau, qui est pourtant l'écriture attendue.
// Sept gabarits ajoutés : 575 → 1 094 énoncés.
//
// ⭐ ICI LE VISUEL EST LA DROITE. Aucun tableau : la fonction affine se montre,
// et chaque propriété porte son dessin. Les calculs, eux, passent par les
// schémas de `lib/fiches/schemas.tsx` — une formule avec la partie utile en
// couleur, jamais une cellule.
//
// ⛔ LE PIÈGE CENTRAL : le signe de a décide de TOUT — du sens de variation, et
// donc de l'ordre des signes dans le tableau. L'élève qui l'oublie répond juste
// une fois sur deux, par hasard.
//
// Micro-compétences couvertes :
// - affine_forme                 → définition, figure, propriétés « La droite » et « Parallèles », exos 1-2
// - affine_calculer_image        → méthode 1, exemple 1, exos 3-4
// - affine_determiner_expression → propriété « Deux points suffisent », méthode 2, exemple 2, exos 5-6-7
// - affine_signe                 → propriétés « Le sens » et « Le signe », usages, exemples 3-4, exos 8-9-10

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
 * Une ou plusieurs droites dans un repère.
 *
 * ⛔ 240 DE LARGE, ET C'EST LA POCHE QUI DÉCIDE, PAS LE BUREAU. Premier essai à
 * 260 : 15,4 px en 1280 — confortable — mais **10,4 px en 375**, sous le seuil
 * de 11. La carte ne fait plus que ~245 px sur un téléphone, et la police d'axe,
 * qui vaut 11 en unités de `viewBox`, se rend à 11 × 245 / 260.
 * 👉 La règle est donc : `viewBox` ≤ largeur de la carte EN POCHE. À 240, on
 * obtient 11,2 px en 375 et 15,3 px en 1280.
 *
 * ⚠️ Et l'ancienne consigne « 220 » n'était pas fausse, elle était DATÉE : elle
 * venait des cartes à trois colonnes. Depuis le 10/09 les propriétés sont en
 * deux colonnes, donc plus larges — une contrainte mesurée se re-mesure quand
 * la mise en page change.
 *
 * ⛔ Et onze graduations au maximum — la leçon de la fiche du repère, où treize
 * étiquettes se chevauchaient malgré une police à 12,4 px. D'où la fenêtre
 * −5/5 partout.
 */
function droites(
  courbes: { a: number; b: number; couleur: string; id: string }[],
  points?: { x: number; y: number; label?: string; couleur?: string }[],
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 240, height: 230 },
        xmin: -5,
        xmax: 5,
        ymin: -5,
        ymax: 5,
        grille: true,
        courbes: courbes.map((c) => ({
          id: c.id,
          type: "affine" as const,
          a: c.a,
          b: c.b,
          couleur: c.couleur,
        })),
        points,
      }}
    />
  );
}

export const ficheAffinesSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonctions-affines-2de",
  titre: "Les fonctions affines",
  accroche:
    "Deux nombres suffisent à tout dire : l'un donne la PENTE, l'autre le point de DÉPART. Et une fois qu'on les tient, on sait dessiner la droite, prévoir le sens de variation, et lire le signe — sans calculer autre chose.",
  identite: [
    { label: "Mots clés", valeur: "Droite, pente, départ, croissante, décroissante" },
    { label: "Le secret", valeur: "Le signe du premier nombre décide de tout" },
    { label: "Outil", valeur: "Une droite : deux points suffisent à la tracer" },
  ],

  definition: {
    texte:
      "Une fonction AFFINE s'écrit $f(x) = ax + b$, où $a$ et $b$ sont deux nombres fixés. Le nombre $a$ est le COEFFICIENT DIRECTEUR — de combien on monte quand $x$ augmente de $1$ — et $b$ l'ORDONNÉE À L'ORIGINE, c'est-à-dire $f(0)$. ⭐ Sa représentation graphique est toujours une DROITE, et c'est ce qui rend ce chapitre visuel de bout en bout.",
  },

  figure: {
    schema: droites(
      [{ id: "f", a: 2, b: 1, couleur: BLEU }],
      [
        { x: 0, y: 1, label: "b = 1", couleur: ROUGE },
        { x: 1, y: 3, label: "+2", couleur: VERT },
      ],
    ),
    legende:
      "La droite de $f(x) = 2x + 1$. En rouge, l'ordonnée à l'origine : la droite coupe l'axe vertical en $1$. En vert, un pas de $1$ vers la droite fait monter de $2$ — c'est le coefficient directeur.",
  },

  proprietes: [
    {
      titre: "La droite : $a$ est la pente, $b$ le départ",
      texte:
        "$b$ se lit là où la droite coupe l'axe VERTICAL. $a$ se lit en avançant de $1$ vers la droite : on regarde de combien on monte — ou de combien on descend. ⚠️ À ne pas confondre avec le point où la droite coupe l'axe horizontal, qui est la racine.",
      schema: droites(
        [
          { id: "f", a: 2, b: 1, couleur: BLEU },
          { id: "g", a: -1, b: 3, couleur: ROUGE },
        ],
      ),
      // f monte de 2 par pas de 1 ; g descend de 1. Les deux coupent l'axe
      // vertical en 1 et 3 : les deux lectures se voient d'un coup.
    },
    {
      titre: "⛔ Le signe de $a$ décide du sens",
      texte:
        "Si $a > 0$, la fonction est CROISSANTE : la droite monte. Si $a < 0$, elle est DÉCROISSANTE : la droite descend. Si $a = 0$, la fonction est constante et la droite est horizontale. ⭐ Une fonction affine ne change jamais de sens en chemin — c'est ce qui la distingue de toutes les fonctions de référence sauf le cube.",
      schema: cas(
        [
          { formule: `${enVert("a")} > 0`, verdict: "croissante ↗", couleur: VERT },
          { formule: `${enRouge("a")} < 0`, verdict: "décroissante ↘", couleur: ROUGE },
        ],
        "Le second nombre, b, ne change rien au sens : il fait seulement glisser la droite vers le haut ou vers le bas.",
      ),
    },
    {
      titre: "Deux points suffisent",
      texte:
        "Deux inconnues, donc deux informations. Connaissant $f(x_1)$ et $f(x_2)$, on calcule $a$ par le quotient des variations, puis on remplace dans une des deux égalités pour trouver $b$.",
      schema: egalites(
        [
          `a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}`,
          `f(1) = 5 \\quad f(3) = 11 \\;\\Rightarrow\\; a = \\dfrac{11 - 5}{3 - 1} = ${enRouge("3")}`,
          `5 = 3 \\times 1 + b \\;\\Rightarrow\\; b = ${enBleu("2")}`,
        ],
        "⛔ On divise par l'écart des ABSCISSES. Oublier ce dénominateur est l'erreur la plus fréquente du chapitre.",
      ),
    },
    {
      titre: "Le signe : une seule racine",
      texte:
        "Une fonction affine ne s'annule qu'une fois, en $x = -\\dfrac{b}{a}$, et change de signe à cet endroit. L'ORDRE des deux signes suit le sens de variation : croissante, elle est négative puis positive ; décroissante, l'inverse.",
      schema: egalites(
        [
          `f(x) = 2x - 6 \\;\\Rightarrow\\; x_0 = ${enRouge("3")}`,
          `x < 3 : f(x) < 0 \\qquad x > 3 : f(x) > 0`,
        ],
        "Ici a = 2 est positif, donc la fonction croît : elle est négative AVANT sa racine.",
      ),
    },
    {
      titre: "Deux droites parallèles ont le même $a$",
      texte:
        "Le coefficient directeur donne l'inclinaison. Deux droites sont parallèles si et seulement si elles ont le MÊME $a$ — l'ordonnée à l'origine n'y change rien. ⭐ Changer $b$ fait GLISSER la droite ; changer $a$ la fait PIVOTER.",
      schema: droites([
        { id: "f", a: 2, b: 1, couleur: BLEU },
        { id: "g", a: 2, b: -3, couleur: VERT },
      ]),
    },
  ],

  reel: {
    texte:
      "Une course en taxi coûte $4$ € de prise en charge, puis $1{,}20$ € par kilomètre. Le prix s'écrit $f(x) = 1{,}2x + 4$ : le $4$ est ce qu'on paie AVANT de rouler, le $1{,}2$ ce que coûte chaque kilomètre. ⭐ C'est le modèle de tout ce qui a un coût fixe et un coût par unité — un abonnement, une location, une facture d'électricité. Et la question « à partir de combien de kilomètres l'autre taxi devient-il moins cher ? » est exactement une inéquation entre deux fonctions affines.",
  },

  historique: {
    texte:
      "Le mot vient du latin affinis, « voisin, apparenté » : la fonction affine est la PARENTE de la fonction linéaire $x \\mapsto ax$, dont elle ne diffère que par un décalage. Les Grecs savaient déjà tout de la droite, mais il a fallu attendre Descartes et ses coordonnées, en 1637, pour qu'une droite devienne une ÉQUATION — et donc qu'on puisse calculer sur elle au lieu de la tracer.",
  },

  methode: [
    {
      titre: "Je calcule une image, ou un antécédent",
      texte:
        "Une image : je remplace $x$ par le nombre. Un antécédent : je résous $ax + b = k$, une équation du premier degré. ⭐ Les deux gestes vont dans des sens opposés.",
      schema: egalites(
        [
          `f(x) = 3x - 4`,
          `f(${enBleu("5")}) = 3 \\times 5 - 4 = ${enBleu("11")}`,
          `3x - 4 = ${enRouge("8")} \\;\\Rightarrow\\; x = ${enRouge("4")}`,
        ],
        "En bleu une image, en rouge un antécédent.",
      ),
    },
    {
      titre: "Je trouve $a$ puis $b$, dans cet ordre",
      texte:
        "$a$ se calcule seul, par le quotient des variations. $b$ vient ensuite, en remplaçant dans une des égalités. ⛔ On ne peut pas faire l'inverse : $b$ dépend de $a$.",
      schema: egalite(
        `a = \\dfrac{\\Delta f}{\\Delta x} \\quad \\text{puis} \\quad b = f(x_1) - a\\,x_1`,
        "Deux étapes, jamais dans l'autre sens.",
      ),
    },
    {
      titre: "Pour le signe, je cherche la racine",
      texte:
        "Je résous $ax + b = 0$, ce qui donne la racine. Puis le signe de $a$ me dit de quel côté la fonction est négative — je n'ai rien d'autre à calculer.",
      schema: cas(
        [
          { formule: "a > 0", verdict: "$-$ puis $+$", couleur: VERT },
          { formule: "a < 0", verdict: "$+$ puis $-$", couleur: ROUGE },
        ],
        "La racine dit OÙ ça change, le signe de a dit DANS QUEL ORDRE.",
      ),
    },
  ],

  usages: [
    {
      titre: "Tracer une droite",
      detail:
        "Deux points suffisent, et les plus commodes sont $f(0) = b$ et un second point au choix. On place, on relie, on prolonge.",
      schema: droites(
        [{ id: "f", a: -2, b: 3, couleur: ROUGE }],
        [
          { x: 0, y: 3, label: "(0 ; 3)", couleur: BLEU },
          { x: 2, y: -1, label: "(2 ; −1)", couleur: BLEU },
        ],
      ),
    },
    {
      titre: "Résoudre une inéquation",
      detail:
        "$f(x) > 0$ se lit sur le tableau de signes, ou directement sur la droite : c'est l'intervalle où elle est AU-DESSUS de l'axe horizontal.",
      schema: egalites(
        [
          `f(x) = -2x + 6`,
          `f(x) > 0 \\iff x < ${enRouge("3")}`,
        ],
        "a est négatif, donc la fonction est positive AVANT sa racine.",
      ),
    },
    {
      titre: "Comparer deux offres",
      detail:
        "Deux fonctions affines, une inéquation : on cherche à partir de quand l'une passe sous l'autre. C'est le problème type, et il vient du monde réel.",
      schema: droites([
        { id: "f", a: 1, b: 2, couleur: BLEU },
        { id: "g", a: 2, b: -1, couleur: ROUGE },
      ]),
    },
  ],

  exemples: [
    {
      titre: "Une image et un antécédent",
      donnees: "$f(x) = -3x + 5$.",
      question: "Calculer $f(2)$, puis l'antécédent de $14$.",
      schema: egalites(
        [
          `f(2) = -3 \\times 2 + 5 = ${enBleu("-1")}`,
          `-3x + 5 = 14 \\;\\Rightarrow\\; x = ${enRouge("-3")}`,
        ],
      ),
      solution:
        "$f(2) = -3 \\times 2 + 5 = -6 + 5 = -1$. Pour l'antécédent de $14$, on résout $-3x + 5 = 14$, soit $-3x = 9$, donc $x = -3$. ⚠️ Le second calcul est une ÉQUATION, pas un remplacement : c'est le geste inverse du premier.",
    },
    {
      titre: "Deux points, une expression",
      donnees: "$f$ est affine, $f(1) = 5$ et $f(4) = 14$.",
      question: "Déterminer $f$.",
      schema: egalites(
        [
          `a = \\dfrac{14 - 5}{4 - 1} = \\dfrac{9}{3} = ${enRouge("3")}`,
          `5 = 3 \\times 1 + b \\;\\Rightarrow\\; b = ${enBleu("2")}`,
        ],
      ),
      solution:
        "Le coefficient directeur vaut $a = \\dfrac{14 - 5}{4 - 1} = \\dfrac{9}{3} = 3$. On remplace ensuite dans $f(1) = 5$ : $3 \\times 1 + b = 5$, donc $b = 2$. Ainsi $f(x) = 3x + 2$. ⭐ Vérification : $f(4) = 12 + 2 = 14$ ✓ — elle coûte deux secondes et attrape la plupart des erreurs.",
    },
    {
      titre: "Le signe d'une fonction croissante",
      donnees: "$f(x) = 4x - 12$.",
      question: "Sur quel intervalle $f$ est-elle négative ?",
      schema: egalites(
        [
          `4x - 12 = 0 \\;\\Rightarrow\\; x = ${enRouge("3")}`,
          `a = 4 > 0 \\;\\Rightarrow\\; \\text{croissante}`,
        ],
      ),
      solution:
        "La racine est $x = 3$. Comme $a = 4$ est positif, la fonction est croissante : elle est donc négative AVANT $3$, et positive après. Réponse : $f$ est négative sur $]-\\infty \\,;\\, 3[$.",
    },
    {
      titre: "⛔ Le même travail, mais $a$ négatif",
      donnees: "$f(x) = -5x + 10$.",
      question: "Sur quel intervalle $f$ est-elle négative ?",
      schema: egalites(
        [
          `-5x + 10 = 0 \\;\\Rightarrow\\; x = ${enRouge("2")}`,
          `a = -5 < 0 \\;\\Rightarrow\\; \\text{décroissante}`,
        ],
      ),
      solution:
        "La racine est $x = 2$, comme précédemment un seul point. Mais $a = -5$ est NÉGATIF, donc la fonction décroît : elle est positive avant $2$ et négative après. Réponse : $f$ est négative sur $]2 \\,;\\, +\\infty[$. ⛔ Même méthode, réponse opposée — c'est le signe de $a$, et lui seul, qui a tout changé.",
    },
  ],

  pieges: [
    "⛔ Pour trouver $a$ à partir de deux points, on DIVISE par l'écart des abscisses. $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$, et non $y_2 - y_1$.",
    "⛔ Le signe de $a$ décide de l'ordre des signes. Croissante : négative PUIS positive. Décroissante : l'inverse. Ne pas regarder $a$, c'est répondre au hasard.",
    "⛔ $b$ est l'ordonnée à l'origine, PAS la racine. $b$ est là où la droite coupe l'axe VERTICAL ; la racine est là où elle coupe l'axe horizontal.",
    "⛔ Une image se calcule en remplaçant ; un antécédent se calcule en RÉSOLVANT. Les deux gestes vont en sens opposés.",
    "⛔ Deux droites parallèles ont le même $a$, quel que soit leur $b$. Changer $b$ fait glisser la droite, pas pivoter.",
    "⛔ Une fonction affine ne change jamais de sens en chemin. Si votre tableau de variations a un creux, ce n'est pas une fonction affine.",
  ],

  aRetenir: [
    "$f(x) = ax + b$ : $a$ est la pente, $b$ l'ordonnée à l'origine.",
    "Sa représentation est une DROITE, et deux points suffisent à la tracer.",
    "$a > 0$ : croissante. $a < 0$ : décroissante. $a = 0$ : constante.",
    "À partir de deux points : $a = \\dfrac{y_2 - y_1}{x_2 - x_1}$, puis $b = y_1 - a\\,x_1$.",
    "Une seule racine, en $x = -\\dfrac{b}{a}$, et un seul changement de signe.",
    "Parallèles $\\iff$ même $a$.",
  ],

  entrainement: [
    {
      question: "Dans $f(x) = -7x + 2$, quels sont le coefficient directeur et l'ordonnée à l'origine ?",
      correction:
        "$a = -7$ et $b = 2$. Le coefficient directeur est le nombre DEVANT le $x$, signe compris.",
    },
    {
      question: "La fonction $f(x) = 5$ est-elle affine ?",
      correction:
        "Oui : c'est le cas $a = 0$ et $b = 5$. Sa droite est horizontale, et la fonction est constante.",
    },
    {
      question: "Soit $f(x) = 4x - 3$. Calculer $f(-2)$.",
      correction:
        "$f(-2) = 4 \\times (-2) - 3 = -8 - 3 = -11$.",
    },
    {
      question: "Soit $f(x) = 2x + 7$. Quel est l'antécédent de $1$ ?",
      correction:
        "On résout $2x + 7 = 1$, soit $2x = -6$, donc $x = -3$.",
    },
    {
      question: "$f$ est affine avec $f(2) = 7$ et $f(5) = 16$. Que vaut $a$ ?",
      correction:
        "$a = \\dfrac{16 - 7}{5 - 2} = \\dfrac{9}{3} = 3$. ⛔ Pas $9$ : il faut diviser par l'écart des abscisses.",
    },
    {
      question: "Même fonction : déterminer son expression.",
      correction:
        "Avec $a = 3$, on remplace dans $f(2) = 7$ : $3 \\times 2 + b = 7$, donc $b = 1$. Ainsi $f(x) = 3x + 1$. Vérification : $f(5) = 15 + 1 = 16$ ✓.",
    },
    {
      question: "$f$ est affine, $f(0) = -4$ et $f(3) = 5$. Déterminer $f$.",
      correction:
        "Ici $b$ est donné directement : $b = f(0) = -4$. Puis $a = \\dfrac{5 - (-4)}{3 - 0} = 3$. Donc $f(x) = 3x - 4$.",
    },
    {
      question: "En quelle valeur $f(x) = 6x - 18$ s'annule-t-elle ?",
      correction:
        "On résout $6x - 18 = 0$, soit $6x = 18$, donc $x = 3$.",
    },
    {
      question: "Sur quel intervalle $f(x) = -3x + 9$ est-elle positive ?",
      correction:
        "Racine : $x = 3$. Comme $a = -3 < 0$, la fonction décroît : elle est positive AVANT sa racine, donc sur $]-\\infty \\,;\\, 3[$.",
    },
    {
      question: "La droite de $f(x) = 5x - 1$ est-elle parallèle à celle de $g(x) = 5x + 8$ ?",
      correction:
        "Oui : les deux ont le même coefficient directeur, $5$. Leurs ordonnées à l'origine diffèrent, ce qui les fait seulement glisser l'une par rapport à l'autre.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesAffinesSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fonctions affines - 2de",
    section: {
      type: "objectif",
      phrase: "Deux nombres, une droite, et tout le reste en découle",
      sousPhrase:
        "$a$ est la pente, $b$ le point de départ. Et c'est le signe de $a$ qui décide du sens de variation comme de l'ordre des signes.",
    },
  },
];
