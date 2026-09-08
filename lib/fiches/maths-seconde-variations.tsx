// ─── Fiche de cours : variations et extremums (2de) ───────────────────────────
//
// Troisième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/fonction-variations.bank.ts
// (notion fonction_variations_extremums), et sur la 5e comme étalon.
//
// ⭐ PRIORITÉ DONNÉE PAR LE CONTRÔLE COMMUN de mars 2025 : sa question 8 demande
// « donner le tableau de variation de la fonction g » — À PARTIR D'UNE COURBE,
// pour 1 point. C'est le geste que la fiche montre en premier.
//
// ⛔ LE PIÈGE CENTRAL : le sens de variation N'EST PAS le signe. Une courbe peut
// monter tout en restant sous l'axe des abscisses. Les deux lectures se font sur
// le même dessin et ne disent pas la même chose.
//
// ⛔ ET LE SECOND : un extremum est une IMAGE, donc une ORDONNÉE. L'abscisse dit
// OÙ il est atteint, l'ordonnée dit COMBIEN il vaut. Les confondre est l'erreur
// la plus fréquente du chapitre.
//
// Micro-compétences couvertes :
// - variation_croissance → définition, propriété « L'ordre des images », méthode 1, exos 1-2-3
// - variation_tableau    → figure, propriété « Le tableau résume », méthode 2, usages, exos 4-5-6-7
// - variation_extremum   → propriété « L'extremum », méthode 3, exemples 3-4, exos 8-9-10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/**
 * Le tableau de variations, dessiné par le moteur du coach.
 *
 * ⛔ TOUT Y EST DU TEXTE NU, SANS UN SEUL DOLLAR. Ce canvas est en SVG, et KaTeX
 * ne rend RIEN dans un `<text>` SVG : passer « $-3$ » affichait les dollars en
 * clair à l'élève — 40 d'un coup, mesurés au rendu. On écrit « −3 » avec le vrai
 * signe moins typographique.
 *
 * ⛔ ET LES LIBELLÉS SONT COURTS — « f ′(x) », « f » — jamais « variations de f ».
 * Le SVG ne passe pas un texte à la ligne : un libellé long repousse toute la
 * grille et fait sortir le tableau du bloc.
 *
 * ⛔ ET IL NE VA PAS DANS `methode` NI `exemples` : ces blocs font 80 px, et ce
 * canvas est en SVG. Il vit dans `figure`, `proprietes` et `usages`.
 */
function variations(
  bornes: string[],
  valeurs: string[],
  derivee?: { label: string; signes: ("+" | "-")[]; marques?: ("0" | "||" | "")[] },
  titre?: string,
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        titre,
        bornes,
        derivee,
        variations: { label: "f", valeurs },
      }}
    />
  );
}

/**
 * Une courbe.
 *
 * ⛔ viewBox SOUS 225 : les nombres des AXES de ce canvas sont écrits en 11, pas
 * en 12. À 240 ils rendent 10,3 px, sous le plancher.
 * ⛔ Et huit unités par axe au plus, sinon les graduations se touchent.
 */
function courbe(
  a: number,
  b: number,
  c: number,
  points: { x: number; y: number; label?: string }[] = [],
  bornes = { xmin: -2, xmax: 4, ymin: -3, ymax: 3 },
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: 215, height: 195 },
        ...bornes,
        grille: true,
        courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
        misesEnEvidence: points.map((p) => ({
          point: { x: p.x, y: p.y, label: p.label, couleur: "#dc2626" },
        })),
      }}
    />
  );
}

/** Un tableau de valeurs — HTML, donc lisible même dans un bloc de 80 px. */
function tableau(xs: number[], ys: number[], highlight?: number) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fonction_tableau",
        titre: "Tableau de valeurs",
        xValues: xs,
        yValues: ys,
        highlightIndex: highlight,
        size: { width: 240, height: 110 },
      }}
    />
  );
}

export const ficheVariationsSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonction-variations-extremums-2de",
  titre: "Variations et extremums",
  accroche:
    "Un tableau de variations tient en deux flèches et trois nombres, et pourtant il dit tout : où la fonction monte, où elle descend, et quelle est la plus grande valeur qu'elle atteint. C'est le résumé d'une courbe, écrit en une ligne.",
  identite: [
    { label: "Mots clés", valeur: "Croissante, décroissante, maximum, minimum, extremum" },
    { label: "Le secret", valeur: "Le sens change là où se trouve l'extremum" },
    { label: "Outil", valeur: "Le tableau de variations" },
  ],

  definition: {
    texte:
      "Une fonction est CROISSANTE sur un intervalle si, quand $x$ augmente, $f(x)$ augmente aussi : l'ordre est conservé. Elle est DÉCROISSANTE si l'ordre s'inverse. Le tableau de variations résume ces sens par des flèches, et donne les valeurs atteintes aux bornes.",
  },

  figure: {
    schema: variations(
      ["−3", "1", "5"],
      ["-2", "4", "0"],
      undefined,
      "f croît puis décroît",
    ),
    legende:
      "La flèche monte jusqu'en $1$, puis redescend. La fonction atteint $4$ en $x = 1$ : c'est son maximum.",
  },

  proprietes: [
    {
      titre: "L'ordre des images",
      texte:
        "Croissante : $a < b$ donne $f(a) < f(b)$, l'ordre est CONSERVÉ. Décroissante : il s'INVERSE. C'est ce qui permet de comparer deux images sans les calculer.",
      schema: variations(["0", "6"], ["1", "7"], undefined, "Croissante : l'ordre tient"),
    },
    {
      titre: "L'extremum est une ORDONNÉE",
      texte:
        "Au changement de sens, la fonction atteint un extremum. L'abscisse dit OÙ il est atteint, l'ordonnée dit COMBIEN il vaut — confondre les deux est l'erreur la plus fréquente.",
      schema: courbe(-1, 2, 2, [{ x: 1, y: 3 }], { xmin: -2, xmax: 4, ymin: -3, ymax: 4 }),
    },
    {
      titre: "Croissante n'est pas positive",
      texte:
        "Le sens de variation et le signe sont deux lectures du même dessin, et elles ne disent pas la même chose : une courbe peut monter en restant sous l'axe des abscisses.",
      schema: courbe(0, 1, -2, [], { xmin: -1, xmax: 5, ymin: -3, ymax: 3 }),
    },
    {
      titre: "Le tableau résume la courbe",
      texte:
        "Deux flèches et trois nombres remplacent tout le dessin. On y lit le sens, les extremums, et les valeurs aux bornes de l'intervalle d'étude.",
      schema: variations(
        ["−2", "0", "3"],
        ["5", "-1", "8"],
        { label: "f ′(x)", signes: ["-", "+"], marques: ["0"] },
      ),
    },
  ],

  reel: {
    texte:
      "La température d'une journée à Saint-Denis monte du lever du soleil jusqu'en début d'après-midi, puis redescend jusqu'au matin suivant. Un tableau de variations le dit en une ligne : croissante jusqu'à 14 h, décroissante ensuite, avec un maximum de 29 °C atteint à 14 h.",
  },

  historique: {
    texte:
      "Avant le calcul différentiel, on cherchait les maximums au cas par cas, par des astuces géométriques. Fermat, vers 1636, remarque que la courbe « s'aplatit » près d'un extremum — l'idée qui deviendra la dérivée, et qui fera du tableau de variations un outil systématique.",
  },

  methode: [
    {
      titre: "Je repère les changements de sens",
      texte:
        "Sur la courbe, je cherche les endroits où elle cesse de monter pour descendre, ou l'inverse. Chacun donne une colonne du tableau.",
      schema: tableau([-1, 0, 1, 2, 3], [0, 3, 4, 3, 0], 2),
    },
    {
      titre: "Je dresse le tableau",
      texte:
        "Les abscisses de ces changements, plus les bornes de l'intervalle, forment la ligne du haut. Entre elles, une flèche par intervalle.",
      schema: tableau([-1, 1, 3], [0, 4, 0], 1),
    },
    {
      titre: "Je lis l'extremum",
      texte:
        "Au sommet d'une flèche montante suivie d'une descendante : un maximum. Sa valeur est l'ORDONNÉE écrite à cet endroit.",
      schema: tableau([0, 1, 2], [3, 4, 3], 1),
    },
  ],

  usages: [
    {
      titre: "Comparer sans calculer",
      detail:
        "Si $f$ croît sur $[0\\,;6]$, alors $f(2) < f(5)$ — sans connaître ni l'une ni l'autre valeur.",
      schema: variations(["0", "6"], ["1", "7"], undefined, "Croissante sur [0 ; 6]"),
    },
    {
      titre: "Trouver un maximum",
      detail:
        "Le tableau le donne directement : c'est la valeur au sommet, atteinte à l'abscisse écrite au-dessus.",
      schema: variations(["−3", "1", "5"], ["-2", "4", "0"], undefined, "Maximum 4 en 1"),
    },
    {
      titre: "Lire un signe de dérivée",
      detail:
        "En première, la ligne du haut donnera le signe de $f'$ : positif quand $f$ monte, négatif quand elle descend.",
      schema: variations(
        ["−2", "0", "3"],
        ["5", "-1", "8"],
        { label: "f ′(x)", signes: ["-", "+"], marques: ["0"] },
      ),
    },
  ],

  exemples: [
    {
      titre: "Comparer deux images",
      donnees: "$f$ est croissante sur $[0\\,;\\,10]$.",
      question: "Comparer $f(3)$ et $f(7)$.",
      schema: tableau([0, 3, 7, 10], [1, 4, 8, 11], 1),
      solution:
        "Les deux nombres appartiennent à $[0\\,;\\,10]$, et $3 < 7$. Comme $f$ croît, l'ordre est CONSERVÉ : $f(3) < f(7)$. On conclut sans calculer une seule image.",
    },
    {
      titre: "Le sens s'inverse",
      donnees: "$g$ est décroissante sur $[-4\\,;\\,0]$.",
      question: "Comparer $g(-3)$ et $g(-1)$.",
      schema: tableau([-4, -3, -1, 0], [9, 7, 3, 1], 1),
      solution:
        "$-3 < -1$, mais $g$ DÉCROÎT : l'ordre s'inverse, donc $g(-3) > g(-1)$. Le tableau le confirme, $7 > 3$ — attention, sur les négatifs le réflexe se trompe souvent.",
    },
    {
      titre: "Lire un maximum",
      donnees: "$h$ croît sur $[-3\\,;\\,1]$ puis décroît sur $[1\\,;\\,5]$, avec $h(1) = 4$.",
      question: "Quel est le maximum de $h$, et où est-il atteint ?",
      schema: tableau([-3, 1, 5], [-2, 4, 0], 1),
      solution:
        "Le changement de sens a lieu en $x = 1$, et la fonction y vaut $4$. Le MAXIMUM vaut $4$ — c'est l'ordonnée — et il est ATTEINT EN $1$ — c'est l'abscisse. Les deux nombres ne jouent pas le même rôle.",
    },
    {
      titre: "Monter sans être positive",
      donnees: "$u$ croît sur $[-1\\,;\\,5]$, avec $u(-1) = -2$ et $u(5) = 4$.",
      question: "$u$ est-elle positive sur tout l'intervalle ?",
      schema: tableau([-1, 1, 3, 5], [-2, 0, 2, 4], 1),
      solution:
        "Non. Elle MONTE partout, mais elle part de $-2$ : elle reste négative jusqu'à s'annuler en $1$, puis devient positive. Croissante et positive sont deux choses différentes.",
    },
  ],

  pieges: [
    "⛔ CROISSANTE n'est pas POSITIVE. Une courbe peut monter en restant tout entière sous l'axe des abscisses.",
    "⛔ Un EXTREMUM est une ORDONNÉE. L'abscisse dit où il est atteint, l'ordonnée dit combien il vaut — c'est l'erreur la plus fréquente du chapitre.",
    "⛔ Sur une fonction DÉCROISSANTE, l'ordre des images s'INVERSE. Le réflexe « plus grand donne plus grand » se trompe une fois sur deux.",
    "⛔ Une fonction n'est croissante que SUR UN INTERVALLE. Dire « $f$ est croissante » sans préciser où ne veut rien dire.",
    "⛔ Un tableau de variations ne donne PAS les valeurs entre deux bornes : il dit seulement dans quel sens on va de l'une à l'autre.",
  ],

  aRetenir: [
    "Croissante : $a < b$ donne $f(a) < f(b)$ — l'ordre est conservé.",
    "Décroissante : $a < b$ donne $f(a) > f(b)$ — l'ordre s'inverse.",
    "Le sens change exactement là où se trouve un extremum.",
    "Un maximum est la plus grande ORDONNÉE atteinte ; son abscisse dit seulement où.",
    "Le tableau se lit de gauche à droite, comme la courbe.",
    "Comparer deux images sans les calculer : c'est à cela que sert le sens de variation.",
  ],

  entrainement: [
    {
      question: "$f$ est croissante sur $[0\\,;\\,8]$. Comparer $f(2)$ et $f(6)$.",
      correction:
        "$2 < 6$ et les deux sont dans $[0\\,;\\,8]$. La fonction croît, donc l'ordre est conservé : $f(2) < f(6)$.",
    },
    {
      question: "$g$ est décroissante sur $[1\\,;\\,9]$. Comparer $g(3)$ et $g(8)$.",
      correction:
        "$3 < 8$, mais $g$ décroît : l'ordre s'INVERSE. Donc $g(3) > g(8)$.",
    },
    {
      question:
        "$h$ est décroissante sur $[-5\\,;\\,-1]$. Comparer $h(-4)$ et $h(-2)$.",
      correction:
        "$-4 < -2$ — on compare bien les antécédents, pas leurs valeurs absolues. Comme $h$ décroît, $h(-4) > h(-2)$.",
    },
    {
      question:
        "Une fonction croît sur $]-\\infty\\,;\\,2]$ puis décroît sur $[2\\,;\\,+\\infty[$. Que se passe-t-il en $x = 2$ ?",
      correction:
        "Le sens change : la fonction y atteint un MAXIMUM. Elle monte jusqu'en $2$, puis redescend.",
    },
    {
      question:
        "Une fonction décroît puis croît. Le changement de sens donne un maximum ou un minimum ?",
      correction:
        "Un MINIMUM : la fonction descend jusqu'à un creux, puis remonte. Le creux est la plus petite valeur atteinte.",
    },
    {
      question:
        "Dans un tableau de variations, que signifie une flèche qui descend ?",
      correction:
        "Que la fonction est DÉCROISSANTE sur cet intervalle : quand $x$ augmente, $f(x)$ diminue.",
    },
    {
      question:
        "Un tableau donne $f(-1) = 3$ et $f(4) = 9$, avec une flèche montante entre les deux. Que vaut $f(2)$ ?",
      correction:
        "On ne peut pas le savoir. Le tableau dit seulement que $f(2)$ est compris entre $3$ et $9$ — il ne donne aucune valeur intermédiaire.",
    },
    {
      question:
        "$f$ croît sur $[-2\\,;\\,3]$ puis décroît sur $[3\\,;\\,7]$, et $f(3) = 10$. Quel est le maximum de $f$ ?",
      correction:
        "Le maximum vaut $10$ — c'est l'ordonnée, la valeur atteinte. Il est atteint EN $x = 3$, qui est l'abscisse. Répondre $3$ serait confondre les deux.",
    },
    {
      question:
        "Une fonction croît sur $[0\\,;\\,5]$ avec $f(0) = -4$ et $f(5) = -1$. Est-elle positive ?",
      correction:
        "Non : elle monte, mais elle reste NÉGATIVE sur tout l'intervalle, de $-4$ à $-1$. Croissante ne veut pas dire positive.",
    },
    {
      question:
        "Peut-on dire « $f$ est croissante » sans autre précision ?",
      correction:
        "Non. Une fonction est croissante SUR UN INTERVALLE. La fonction carré, par exemple, décroît sur les négatifs et croît sur les positifs : dire qu'elle est croissante, sans préciser où, est faux.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesVariationsSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Variations - 2de",
    section: {
      type: "objectif",
      phrase: "Lire un tableau de variations, et le dresser depuis une courbe",
      sousPhrase:
        "Deux flèches et trois nombres résument toute une courbe : où elle monte, où elle descend, et la plus grande valeur qu'elle atteint.",
    },
  },
];
