// ─── Fiche d'exercices : variations et courbes des fonctions (1re spé) ────────
//                                    20 exercices corrigés
//
// Troisième feuille du format (17/09/2026), après l'exponentielle et le second
// degré. Alignée sur la banque `lib/tutor-v4/questionBank/premiere-spe/maths/
// variations-fonctions.bank.ts`, renforcée le matin même.
//
// ⭐⭐ LE FIL, celui de tout le chapitre : C'EST LE SIGNE DE f′ QUI PARLE, PAS
// SON SENS DE VARIATION. L'élève devant la courbe de f′ lit ses variations à
// elle, alors qu'on ne lui demande que sa position par rapport à l'axe. Deux
// exercices sont bâtis sur ce piège et un seul (le 20) le nomme.
//
// ⭐ CE QUE CETTE FEUILLE FAIT ET QUE LE COACH NE FAISAIT PAS avant ce matin :
// - on DÉRIVE (la dérivée n'est donnée que dans les quatre premiers) ;
// - on MET EN ÉQUATION (exercices 16 à 18 : la fonction à optimiser n'est pas
//   fournie, c'est l'élève qui l'écrit) ;
// - on justifie un extremum par le CHANGEMENT DE SIGNE, pas par l'annulation
//   seule (exercices 4, 11 et 20).
//
// ⛔ Aucune fonction de la fiche de cours n'est reprise : un corrigé déjà lu
// n'apprend rien. Toutes les racines de f′ sont entières, toutes les images
// demandées sont entières — l'élève moyen doit buter sur le raisonnement, pas
// sur une fraction.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-variations.mjs`.
//
// Micro-compétences : var_signe_derivee (1, 3, 15), var_second_degre (2, 7),
// var_extremum_tangente (4, 11), var_constante (5), var_tableau (6, 9, 12, 20),
// var_lecture_courbe (8, 20), var_extremum (9, 10, 16-18),
// var_position_relative (13, 19), var_inegalite (14), var_optimisation (16-18).
// 10/10.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/* ═══════════════════════════════════════════════════════════════════════════
 * LES TABLEAUX DESSINÉS DES CORRIGÉS (17/09/2026)
 *
 * Frédéric : « j'ai remarqué que dans la fiche d'exercices il y a l'explication,
 * mais jamais de dressage de tableau de signes et de variations avec les
 * canvas ». Un corrigé qui DIT « f croît puis décroît » sans MONTRER le tableau
 * demande à l'élève de le reconstruire de tête pour lire sa propre correction.
 *
 * ⭐ Ce sont les DEUX canvas du coach, servis tels quels : l'élève retrouve dans
 * son corrigé exactement la figure qu'il voit dans ses questions.
 * ⛔ Un canvas écrit du TEXTE BRUT : le vrai signe moins (−), jamais le trait
 * d'union du clavier, et « −∞ » en toutes lettres, jamais « \infty ».
 * ═══════════════════════════════════════════════════════════════════════════ */

const nb = (n: number) => String(n).replace("-", "−");

/** Le tableau de variations : signe de f ′ en haut, valeurs de f en bas. */
function tableauVariations(
  bornes: (number | string)[],
  signes: ("+" | "-")[],
  valeurs: (number | string)[],
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        bornes: bornes.map((b) => (typeof b === "number" ? nb(b) : b)),
        derivee: { label: "f ′(x)", signes, marques: Array(bornes.length - 2).fill("0") },
        variations: {
          label: "f(x)",
          valeurs: valeurs.map((v) => (typeof v === "number" ? nb(v) : v)),
        },
        size: { width: 380, height: 200 },
      }}
    />
  );
}

/** Le tableau de signes seul — celui qu'on dresse AVANT le tableau de variations. */
function tableauSignes(bornes: (number | string)[], label: string, signes: ("+" | "-")[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_signes",
        bornes: bornes.map((b) => (typeof b === "number" ? nb(b) : b)),
        lignes: [{ label, signes, marques: Array(bornes.length - 2).fill("0") }],
        size: { width: 380, height: 140 },
      }}
    />
  );
}

export const exercicesVariationsPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "variations-fonctions",
  titre: "Les variations d'une fonction",
  accroche:
    "Vingt exercices, du signe de la dérivée au problème d'optimisation, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/premiere-spe/variations-fonctions",
      titre: "Variations et courbes des fonctions",
    },
  ],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f'(x) > 0$ sur un intervalle : $f$ y est CROISSANTE. $f'(x) < 0$ : $f$ y est DÉCROISSANTE. $f'(x) = 0$ sur tout un intervalle : $f$ y est constante.",
        "On ne regarde jamais si $f'$ monte ou descend : on regarde SON SIGNE, c'est-à-dire si sa courbe est au-dessus ou en dessous de l'axe.",
        "Un trinôme est du signe de $a$ à l'extérieur de ses racines, et du signe contraire entre elles.",
        "Une somme $x^2 + k$ avec $k > 0$, ou un carré $(x - a)^2$, ne change jamais de signe : c'est souvent ce qui règle la question d'un coup.",
      ],
      exercices: [
        {
          enonce: "Soit $f$ dérivable sur $\\mathbb{R}$, avec $f'(x) = 2x - 6$. Sur quel intervalle $f$ est-elle décroissante ?",
          correction:
            "$f$ décroît là où sa dérivée est négative : on résout $f'(x) \\leqslant 0$.\n$2x - 6 \\leqslant 0$ donne $2x \\leqslant 6$, donc $x \\leqslant 3$.\n$f$ est décroissante sur $]-\\infty \\,;\\, 3]$, et croissante sur $[3 \\,;\\, +\\infty[$.\n⚠️ On répond par un INTERVALLE de $x$, jamais par un nombre seul : « $f$ décroît en $3$ » ne veut rien dire.",
          schema: tableauSignes(["−∞", 3, "+∞"], "f ′(x)", ["-", "+"]),
          micros: ["var_signe_derivee"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 8x + 1$ sur $\\mathbb{R}$. Donner les variations de $f$, et la valeur de son minimum.",
          correction:
            "On dérive : $f'(x) = 2x - 8$, qui s'annule pour $x = 4$.\n$a = 2 > 0$ : $f'$ est négative avant $4$, positive après. Donc $f$ décroît sur $]-\\infty \\,;\\, 4]$ puis croît sur $[4 \\,;\\, +\\infty[$.\nLe minimum est atteint en $x = 4$ et vaut $f(4) = 16 - 32 + 1 = -15$.\n⚠️ Le minimum VAUT $-15$ ; il est ATTEINT en $4$. Donner l'abscisse quand on demande la valeur est l'erreur la plus fréquente du chapitre.",
          schema: tableauVariations(["−∞", 4, "+∞"], ["-", "+"], ["+∞", -15, "+∞"]),
          micros: ["var_second_degre", "var_signe_derivee"],
        },
        {
          enonce: "Soit $f$ dérivable sur $\\mathbb{R}$, avec $f'(x) = 3x^2 + 2$. Que peut-on dire de $f$ ?",
          correction:
            "On cherche le signe de $f'$, sans rien résoudre.\n$3x^2 \\geqslant 0$ pour tout $x$, donc $3x^2 + 2 \\geqslant 2 > 0$ : la dérivée est strictement positive PARTOUT.\n$f$ est donc strictement croissante sur $\\mathbb{R}$, sans aucun extremum.\n⭐ Un carré ne peut pas être négatif : c'est ce qui règle la question sans calcul.",
          micros: ["var_signe_derivee"],
        },
        {
          enonce: "Soit $f$ dérivable sur $\\mathbb{R}$, avec $f'(x) = (x - 2)^2$. $f$ admet-elle un extremum en $2$ ?",
          correction:
            "$f'(2) = 0$ : la courbe de $f$ a bien une tangente horizontale au point d'abscisse $2$.\nMais un carré est toujours positif ou nul : $f'$ reste $\\geqslant 0$ de part et d'autre de $2$. Elle s'annule SANS CHANGER DE SIGNE.\n$f$ est donc croissante sur $\\mathbb{R}$ tout entier, et n'admet AUCUN extremum.\n⛔ « $f'(a) = 0$ » ne suffit jamais à conclure à un extremum : il faut que $f'$ change de signe. C'est exactement le cas de $x \\mapsto x^3$ en $0$.",
          micros: ["var_extremum_tangente"],
        },
        {
          enonce: "Donner les variations de $f(x) = 5$ et de $g(x) = -4x + 7$ sur $\\mathbb{R}$.",
          correction:
            "$f$ est constante : sa dérivée est nulle partout, $f'(x) = 0$. Sa courbe est une droite horizontale, elle ne monte ni ne descend.\n$g$ est affine : $g'(x) = -4$, strictement négative partout. $g$ est donc strictement décroissante sur $\\mathbb{R}$.\n⚠️ Une dérivée nulle EN UN POINT ne dit rien ; une dérivée nulle SUR TOUT UN INTERVALLE dit que la fonction y est constante. Ce sont deux énoncés différents.",
          micros: ["var_constante"],
        },
        {
          enonce:
            "Le tableau de variations de $f$ sur $[-4 \\,;\\, 6]$ indique : $f$ croît de $-3$ à $8$ sur $[-4 \\,;\\, 1]$, puis décroît de $8$ à $-2$ sur $[1 \\,;\\, 6]$.\na) Quel est le maximum de $f$ sur $[-4 \\,;\\, 6]$ ?\nb) Combien l'équation $f(x) = 0$ a-t-elle de solutions ?",
          correction:
            "a) Le maximum est la plus grande valeur atteinte : $8$, atteint en $x = 1$, là où la flèche cesse de monter.\nb) Sur $[-4 \\,;\\, 1]$, $f$ passe de $-3$ à $8$ : elle est continue et croissante, elle traverse donc $0$ une fois et une seule.\nSur $[1 \\,;\\, 6]$, elle passe de $8$ à $-2$ : elle traverse encore $0$ une fois.\nL'équation $f(x) = 0$ a donc exactement DEUX solutions.\n⭐ On ne calcule rien : un tableau de variations suffit à compter les solutions, parce qu'il dit que la fonction est monotone sur chaque morceau.",
          micros: ["var_tableau"],
        },
        {
          enonce: "Sans dériver, donner les variations de $f(x) = -2x^2 + 8x$ sur $\\mathbb{R}$, et son maximum.",
          correction:
            "C'est un trinôme : sa courbe est une parabole, et son sommet est en $\\alpha = -\\dfrac{b}{2a} = -\\dfrac{8}{-4} = 2$.\n$a = -2 < 0$ : la parabole est tournée vers le BAS. $f$ croît donc sur $]-\\infty \\,;\\, 2]$, puis décroît sur $[2 \\,;\\, +\\infty[$.\nLe maximum vaut $f(2) = -8 + 16 = 8$.\n⚠️ Quand $a$ est négatif, tout s'inverse : le sommet est un maximum, pas un minimum.",
          micros: ["var_second_degre"],
        },
        {
          enonce:
            "La courbe de la DÉRIVÉE $f'$ coupe l'axe des abscisses en $-1$ et en $3$. Elle est au-dessus de l'axe entre ces deux valeurs, et en dessous à l'extérieur. Donner les variations de $f$.",
          correction:
            "On ne lit pas les variations de $f'$, on lit SON SIGNE : au-dessus de l'axe, $f'$ est positive ; en dessous, négative.\n$f'$ est négative sur $]-\\infty \\,;\\, -1]$ : $f$ y décroît.\n$f'$ est positive sur $[-1 \\,;\\, 3]$ : $f$ y croît.\n$f'$ est négative sur $[3 \\,;\\, +\\infty[$ : $f$ y décroît.\n$f$ admet donc un minimum local en $-1$ et un maximum local en $3$.\n⛔ Le piège de tout le chapitre : la courbe de $f'$ monte avant son sommet, et cela ne dit rien de $f$. Ce qui compte, c'est le signe : $f'$ positive, $f$ croissante ; $f'$ négative, $f$ strictement décroissante.",
          schema: tableauSignes(["−∞", -1, 3, "+∞"], "f ′(x)", ["-", "+", "-"]),
          micros: ["var_lecture_courbe"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "L'étude complète, toujours dans cet ordre : on dérive, on factorise $f'$, on étudie son signe, on dresse le tableau, on calcule les images aux bornes et aux extremums.",
        "Un extremum se justifie par un CHANGEMENT de signe de $f'$, jamais par la seule annulation.",
        "Pour comparer deux courbes, on ne compare pas $f'$ et $g'$ : on pose $h = f - g$ et on étudie le SIGNE de $h$. $h > 0$ signifie $\\mathcal{C}_f$ au-dessus de $\\mathcal{C}_g$.",
        "Pour démontrer une inégalité $f(x) \\geqslant g(x)$, on pose $h = f - g$, on cherche le MINIMUM de $h$ et l'on montre qu'il est positif.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = x^3 - 3x^2 - 9x + 5$ sur $\\mathbb{R}$. Dresser le tableau de variations de $f$, images comprises.",
          correction:
            "On dérive : $f'(x) = 3x^2 - 6x - 9$.\nOn factorise : $f'(x) = 3(x^2 - 2x - 3) = 3(x - 3)(x + 1)$. La dérivée s'annule en $-1$ et en $3$.\nSon coefficient dominant $3$ est positif : $f'$ est positive à l'extérieur des racines, négative entre elles.\nDonc $f$ croît sur $]-\\infty \\,;\\, -1]$, décroît sur $[-1 \\,;\\, 3]$, puis croît sur $[3 \\,;\\, +\\infty[$.\nImages : $f(-1) = -1 - 3 + 9 + 5 = 10$ et $f(3) = 27 - 27 - 27 + 5 = -22$.\n$f$ admet un maximum local de $10$ en $-1$, et un minimum local de $-22$ en $3$.\n⚠️ Ces extremums sont LOCAUX : $f(x)$ dépasse $10$ pour $x$ assez grand.",
          schema: tableauVariations(["−∞", -1, 3, "+∞"], ["+", "-", "+"], ["−∞", 10, -22, "+∞"]),
          micros: ["var_tableau", "var_extremum"],
        },
        {
          enonce: "Soit $f(x) = 2x^3 - 9x^2 + 12x$ sur $\\mathbb{R}$. Déterminer les extremums locaux de $f$, et justifier leur nature.",
          correction:
            "$f'(x) = 6x^2 - 18x + 12 = 6(x^2 - 3x + 2) = 6(x - 1)(x - 2)$.\n$f'$ s'annule en $1$ et en $2$, et son coefficient dominant $6$ est positif : elle est positive, puis négative sur $]1 \\,;\\, 2[$, puis positive.\nEn $x = 1$, $f'$ passe du PLUS au MOINS : $f$ monte puis descend, c'est un MAXIMUM local. Il vaut $f(1) = 2 - 9 + 12 = 5$.\nEn $x = 2$, $f'$ passe du MOINS au PLUS : c'est un MINIMUM local, valant $f(2) = 16 - 36 + 24 = 4$.\n⭐ La nature de l'extremum ne se devine pas : elle se lit dans l'ORDRE des signes de $f'$.",
          micros: ["var_extremum"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 3x^2 + 3x$ sur $\\mathbb{R}$. Montrer que $f$ est croissante sur $\\mathbb{R}$, bien que sa dérivée s'annule.",
          correction:
            "$f'(x) = 3x^2 - 6x + 3 = 3(x^2 - 2x + 1) = 3(x - 1)^2$.\nUn carré est toujours positif ou nul : $f'(x) \\geqslant 0$ pour tout $x$, et $f'$ ne s'annule qu'en $x = 1$.\nUne dérivée positive, qui ne s'annule qu'en un point isolé, donne une fonction strictement croissante : $f$ croît sur $\\mathbb{R}$.\nEn $x = 1$, la courbe a une tangente horizontale — un palier — mais elle continue de monter juste après.\n⛔ Le réflexe « $f'$ s'annule donc il y a un extremum » est faux. Ici $f'$ ne CHANGE PAS de signe : il n'y a ni maximum ni minimum.",
          micros: ["var_extremum_tangente"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 12x$ sur l'intervalle $[-3 \\,;\\, 4]$. Dresser son tableau de variations, puis donner son maximum et son minimum sur cet intervalle.",
          correction:
            "$f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x - 2)(x + 2)$, qui s'annule en $-2$ et $2$.\n$f'$ est positive à l'extérieur de $[-2 \\,;\\, 2]$, négative à l'intérieur.\nSur $[-3 \\,;\\, 4]$ : $f$ croît sur $[-3 \\,;\\, -2]$, décroît sur $[-2 \\,;\\, 2]$, puis croît sur $[2 \\,;\\, 4]$.\nImages : $f(-3) = -27 + 36 = 9$, $f(-2) = -8 + 24 = 16$, $f(2) = 8 - 24 = -16$, $f(4) = 64 - 48 = 16$.\nLe maximum sur $[-3 \\,;\\, 4]$ vaut $16$ — et il est atteint DEUX fois, en $-2$ et en $4$. Le minimum vaut $-16$, atteint en $2$.\n⚠️ Sur un intervalle FERMÉ, il faut toujours calculer les images aux BORNES : ici, la borne $4$ égale le maximum local. Les oublier fait rater la réponse.",
          schema: tableauVariations([-3, -2, 2, 4], ["+", "-", "+"], [9, 16, -16, 16]),
          micros: ["var_tableau"],
        },
        {
          enonce:
            "Soit $f(x) = x^3$ et $g(x) = 3x - 2$.\na) Étudier la position relative des courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$.\nb) Que se passe-t-il en $x = 1$ ?",
          correction:
            "a) On pose $h(x) = f(x) - g(x) = x^3 - 3x + 2$, et l'on étudie SON signe.\nOn cherche une racine évidente : $h(1) = 1 - 3 + 2 = 0$. On factorise alors par $(x - 1)$ : $h(x) = (x - 1)^2(x + 2)$.\nOn vérifie en développant : $(x^2 - 2x + 1)(x + 2) = x^3 + 2x^2 - 2x^2 - 4x + x + 2 = x^3 - 3x + 2$. ✔️\n$(x - 1)^2 \\geqslant 0$ toujours : le signe de $h$ est donc celui de $(x + 2)$.\n$h(x) \\geqslant 0$ pour $x \\geqslant -2$ : $\\mathcal{C}_f$ est AU-DESSUS de $\\mathcal{C}_g$ sur $[-2 \\,;\\, +\\infty[$, et en dessous sur $]-\\infty \\,;\\, -2]$.\nb) En $x = 1$, $h(1) = 0$ sans que $h$ change de signe : les deux courbes se TOUCHENT sans se croiser. La droite est tangente à la courbe en ce point.\n⛔ Comparer $f'$ et $g'$ ne répond pas : deux courbes peuvent monter à la même vitesse sans être à la même hauteur.",
          micros: ["var_position_relative"],
        },
        {
          enonce: "Démontrer que pour tout $x \\geqslant 0$, on a $x^3 + 4 \\geqslant 3x$.",
          correction:
            "On ramène tout d'un côté : il s'agit de montrer que $h(x) = x^3 - 3x + 4$ est positive sur $[0 \\,;\\, +\\infty[$.\nOn dérive : $h'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Sur $[0 \\,;\\, +\\infty[$, seule la racine $1$ compte.\n$h'$ est négative sur $[0 \\,;\\, 1]$ et positive sur $[1 \\,;\\, +\\infty[$ : $h$ décroît puis croît, elle atteint donc son MINIMUM en $x = 1$.\nCe minimum vaut $h(1) = 1 - 3 + 4 = 2$.\nAinsi $h(x) \\geqslant 2 > 0$ pour tout $x \\geqslant 0$, donc $x^3 + 4 \\geqslant 3x$. ✔️\n⭐ Une inégalité ne se vérifie pas sur deux ou trois valeurs : on étudie la fonction différence et l'on montre que son minimum est positif. C'est cela, démontrer.",
          micros: ["var_inegalite"],
        },
        {
          enonce: "Soit $f$ dérivable sur $\\mathbb{R}$, avec $f'(x) = (x - 4)(x^2 + 1)$. Donner les variations de $f$.",
          correction:
            "La dérivée est un produit de deux facteurs : son signe est le produit des signes.\n$x^2 + 1 \\geqslant 1 > 0$ pour tout $x$ : ce facteur est toujours STRICTEMENT POSITIF, il ne change jamais le signe du produit.\nLe signe de $f'$ est donc exactement celui de $(x - 4)$ : négatif pour $x < 4$, positif pour $x > 4$.\n$f$ décroît sur $]-\\infty \\,;\\, 4]$, puis croît sur $[4 \\,;\\, +\\infty[$. Elle admet un minimum en $x = 4$.\n⭐ Repérer le facteur de signe constant évite tout un tableau : c'est le réflexe à prendre devant une dérivée factorisée.",
          schema: tableauSignes(["−∞", 4, "+∞"], "f ′(x)", ["-", "+"]),
          micros: ["var_signe_derivee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Ici, personne ne te donne la fonction : c'est à toi de l'écrire.",
      rappel: [
        "Mettre en équation : on nomme l'inconnue, on écrit la grandeur cherchée, puis on remplace par $x$ tout ce qu'on ne connaît pas. Un croquis évite la plupart des erreurs.",
        "On donne toujours l'INTERVALLE où $x$ a un sens : une longueur est positive, et ce qu'on découpe ne peut pas dépasser ce qu'on a.",
        "Optimiser : on dérive la fonction obtenue, on cherche où la dérivée s'annule, et l'on VÉRIFIE le changement de signe avant de conclure.",
        "On termine en répondant à la question posée, avec son unité — pas par « $x = 2$ » tout seul.",
      ],
      exercices: [
        {
          titre: "La boîte sans couvercle",
          enonce:
            "D'une plaque carrée de $12$ cm de côté, on découpe aux quatre coins un carré de côté $x$, puis on relève les bords pour former une boîte sans couvercle.\na) Entre quelles valeurs $x$ peut-il varier ?\nb) Exprimer le volume $V(x)$ de la boîte en fonction de $x$.\nc) Déterminer la valeur de $x$ qui rend ce volume maximal, et donner ce volume.",
          correction:
            "a) Le côté découpé est positif : $x > 0$. Sur chaque côté on retire $x$ à CHAQUE extrémité, soit $2x$ : il faut $12 - 2x > 0$, donc $x < 6$. Ainsi $x \\in \\,]0 \\,;\\, 6[$.\nb) La hauteur de la boîte est la profondeur du pli, c'est-à-dire $x$. Le fond est un carré de côté $12 - 2x$.\nDonc $V(x) = x(12 - 2x)^2$.\n⛔ Écrire $12 - x$ reviendrait à ne couper qu'un seul coin par côté : le croquis le montre tout de suite.\nc) On développe pour dériver : $V(x) = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$.\n$V'(x) = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x - 2)(x - 6)$.\nSur $]0 \\,;\\, 6[$, $V'$ s'annule seulement en $x = 2$, et elle y passe du PLUS au MOINS : c'est bien un maximum.\n$V(2) = 2 \\times (12 - 4)^2 = 2 \\times 64 = 128$.\nLe volume est maximal pour un carré de $2$ cm de côté, et vaut alors $128$ cm³.",
          micros: ["var_optimisation", "var_extremum"],
        },
        {
          titre: "L'enclos contre le mur",
          enonce:
            "Un enclos rectangulaire est adossé à un mur : le mur forme un côté, et l'on dispose de $40$ m de grillage pour les trois autres. On note $x$ la largeur, c'est-à-dire la longueur de chacun des deux côtés perpendiculaires au mur.\na) Exprimer l'aire $A(x)$ de l'enclos en fonction de $x$, et préciser l'intervalle d'étude.\nb) Déterminer les dimensions qui rendent l'aire maximale.",
          correction:
            "a) Le grillage couvre les deux largeurs et la longueur : il en part $2x$ pour les largeurs, donc la longueur vaut $40 - 2x$.\nL'aire est donc $A(x) = x(40 - 2x)$.\nIl faut $x > 0$ et $40 - 2x > 0$, soit $x < 20$ : on étudie sur $]0 \\,;\\, 20[$.\n⛔ Écrire $x(40 - x)$ serait supposer que le grillage ne sert qu'à deux côtés : le mur en remplace UN, pas deux.\nb) $A(x) = 40x - 2x^2$, donc $A'(x) = 40 - 4x$.\n$A'(x) = 0$ donne $x = 10$ ; $A'$ est positive avant $10$ et négative après : c'est un maximum.\nLa largeur vaut alors $10$ m, la longueur $40 - 20 = 20$ m, et l'aire $A(10) = 10 \\times 20 = 200$ m².\n⚠️ On répond par les DIMENSIONS et l'aire, avec leurs unités : « $x = 10$ » ne répond pas à la question posée.",
          micros: ["var_optimisation", "var_extremum"],
        },
        {
          titre: "Le bénéfice de l'association",
          enonce:
            "Une association vend des tee-shirts. Produire $x$ tee-shirts coûte $C(x) = x^2 + 20x + 300$ euros, et chaque tee-shirt est vendu $80$ euros. On suppose $0 \\leqslant x \\leqslant 60$.\na) Exprimer le bénéfice $B(x)$ en fonction de $x$.\nb) Combien faut-il en vendre pour que le bénéfice soit maximal ? Quel est alors ce bénéfice ?\nc) À partir de combien de tee-shirts l'association gagne-t-elle de l'argent ?",
          correction:
            "a) Le bénéfice est la recette moins le coût. La recette vaut $80x$.\n$B(x) = 80x - (x^2 + 20x + 300) = -x^2 + 60x - 300$.\n⛔ Le piège est d'oublier la parenthèse : le signe moins porte sur TOUT le coût, pas seulement sur son premier terme.\nb) $B'(x) = -2x + 60$, qui s'annule en $x = 30$. $B'$ est positive avant, négative après : c'est un maximum.\n$B(30) = -900 + 1800 - 300 = 600$. Il faut vendre $30$ tee-shirts, pour un bénéfice de $600$ euros.\nc) L'association gagne de l'argent quand $B(x) > 0$, soit $-x^2 + 60x - 300 > 0$.\n$\\Delta = 60^2 - 4 \\times (-1) \\times (-300) = 3600 - 1200 = 2400$, et $\\sqrt{2400} \\approx 49$.\nLes racines valent environ $\\dfrac{-60 + 49}{-2} \\approx 5{,}5$ et $\\dfrac{-60 - 49}{-2} \\approx 54{,}5$.\n$a < 0$ : le trinôme est positif ENTRE ses racines. Il faut donc vendre au moins $6$ tee-shirts (et pas plus de $54$).\n⚠️ Le nombre de tee-shirts est entier : on arrondit vers le haut pour la borne basse, vers le bas pour la borne haute.",
          micros: ["var_optimisation", "var_second_degre"],
        },
        {
          titre: "Une courbe et sa tangente",
          enonce:
            "Soit $f(x) = x^3 - 6x^2 + 9x$ et la droite $d$ d'équation $y = 9x$.\na) Dresser le tableau de variations de $f$ sur $\\mathbb{R}$.\nb) Étudier la position de la courbe $\\mathcal{C}_f$ par rapport à $d$.\nc) En quels points se rencontrent-elles ?",
          correction:
            "a) $f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3)$, qui s'annule en $1$ et $3$.\nLe coefficient $3$ est positif : $f'$ est positive, puis négative sur $]1 \\,;\\, 3[$, puis positive.\n$f$ croît sur $]-\\infty \\,;\\, 1]$, décroît sur $[1 \\,;\\, 3]$, puis croît sur $[3 \\,;\\, +\\infty[$.\nImages : $f(1) = 1 - 6 + 9 = 4$ (maximum local) et $f(3) = 27 - 54 + 27 = 0$ (minimum local).\nb) On pose $h(x) = f(x) - 9x = x^3 - 6x^2 = x^2(x - 6)$.\n\n$x^2 \\geqslant 0$ toujours : le signe de $h$ est celui de $(x - 6)$.\n$\\mathcal{C}_f$ est donc en dessous de $d$ sur $]-\\infty \\,;\\, 6]$, et au-dessus sur $[6 \\,;\\, +\\infty[$.\nc) Elles se rencontrent là où $h(x) = 0$, c'est-à-dire en $x = 0$ et $x = 6$.\nEn $x = 6$, $h$ change de signe : les courbes se CROISENT, au point $(6 \\,;\\, 54)$.\nEn $x = 0$, $h$ s'annule sans changer de signe : elles se TOUCHENT seulement, au point $(0 \\,;\\, 0)$ — la droite $d$ y est tangente à la courbe.\n⭐ Une racine double de la différence, c'est une tangence ; une racine simple, une traversée.",
          schema: tableauVariations(["−∞", 1, 3, "+∞"], ["+", "-", "+"], ["−∞", 4, 0, "+∞"]),
          micros: ["var_position_relative", "var_tableau"],
        },
        {
          titre: "Lire la courbe de la dérivée",
          enonce:
            "On donne la courbe de la DÉRIVÉE $f'$ d'une fonction $f$ définie sur $[-4 \\,;\\, 6]$. C'est une parabole tournée vers le haut, qui coupe l'axe des abscisses en $-2$ et en $4$, et dont le sommet est le point $(1 \\,;\\, -9)$.\na) Donner le signe de $f'$ sur $[-4 \\,;\\, 6]$.\nb) En déduire les variations de $f$.\nc) $f$ admet-elle un extremum en $x = 1$ ?\nd) On sait de plus que $f(-2) = 5$. Que vaut $f$ au point le plus haut de son tableau ?",
          correction:
            "a) On lit la POSITION par rapport à l'axe, pas le sens de variation de la parabole.\n$f'$ est positive sur $[-4 \\,;\\, -2]$, négative sur $[-2 \\,;\\, 4]$, positive sur $[4 \\,;\\, 6]$.\nb) $f$ croît sur $[-4 \\,;\\, -2]$, décroît sur $[-2 \\,;\\, 4]$, puis croît sur $[4 \\,;\\, 6]$.\nc) NON. En $x = 1$, on lit $f'(1) = -9$, qui n'est pas nul : la dérivée ne s'annule pas là, donc $f$ n'y a pas d'extremum.\n⛔ Le point $(1 \\,;\\, -9)$ est le sommet de la courbe de $f'$ : c'est l'endroit où $f'$ cesse de décroître. C'est une information sur $f'$, pas sur $f$. Confondre les deux est LA faute du chapitre.\nd) $f$ croît jusqu'en $-2$ puis décroît : le maximum local est atteint en $x = -2$, et vaut $f(-2) = 5$.\n⚠️ On ne peut rien dire de plus sans autre information : la courbe de $f'$ donne les VARIATIONS de $f$, jamais ses valeurs. Il faut une image de départ, et elle est toujours donnée dans l'énoncé.",
          // ⛔ Pas de tableau de VARIATIONS ici : le corrigé dit justement qu'on
          // ne connaît qu'une seule image. Un tableau aux valeurs inventées
          // contredirait la réponse. On dessine ce qui est certain : le signe.
          schema: tableauSignes([-4, -2, 4, 6], "f ′(x)", ["+", "-", "+"]),
          micros: ["var_lecture_courbe", "var_tableau", "var_extremum_tangente"],
        },
      ],
    },
  ],
};
