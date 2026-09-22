// ─── Fiche d'exercices : variations et extremums (seconde) ───────────────────
//
// Deuxième feuille du bloc « Fonctions » de seconde (21/09/2026, le soir).
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/
// fonction-variations.bank.ts` (notionId fonction_variations_extremums) et sur
// la fiche de cours `lib/fiches/maths-seconde-variations.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni f(3)/f(7), ni g(−3)/g(−1),
// ni ses dix exercices).
//
// ⭐ LES DEUX PIÈGES DU CHAPITRE, et la feuille est bâtie dessus :
// - un extremum est une VALEUR (une ordonnée), atteinte EN une abscisse (2, 4,
//   8, 13, 18) — et il se cherche aussi AUX BORDS (4, 6, 13) ;
// - on ne compare deux images que sur un intervalle où le sens ne change pas
//   (7, 12 : deux courbes du même tableau donnent deux réponses opposées).
//
// ⭐ LE CONTRÔLE COMMUN (question 8) : « dresser le tableau depuis une courbe »
// — exercices 1, 11, 14, 19, avec la courbe dans l'énoncé.
//
// ⭐ LE MONDE : une crue, le 100 m de Bolt, un potager, une éolienne, la distance
// Terre-Soleil (et le paradoxe des saisons).
// Sources :
// - Usain Bolt, Berlin 2009, temps de passage tous les 10 m (analyse
//   biomécanique de l'IAAF) : 1,89 · 2,88 · 3,78 · 4,64 · 5,47 · 6,29 · 7,10 ·
//   7,92 · 8,75 · 9,58 s — d'où les temps par tranche de l'exercice 17.
// - Éolienne de 3 MW : démarrage à 3 m/s, puissance nominale à 12 m/s, arrêt à
//   25 m/s (courbe de puissance type ; la courbe entre 3 et 12 est simplifiée).
// - Terre-Soleil : périhélie vers le 3 janvier, 147,1 millions de km ; aphélie
//   vers le 5 juillet, 152,1 millions de km.
//
// ⭐ Le canvas `tableau_variations` sait dessiner une fonction CONSTANTE depuis ce
// soir (exercice 19) : deux valeurs égales, une flèche horizontale.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-variations-2de.mjs`.
//
// Micro-compétences : variation_tableau (1, 2, 6, 8, 11, 13, 14, 15, 16, 18,
// 19, 20), variation_croissance (3, 5, 7, 8, 9, 12, 14, 16, 17, 19, 20),
// variation_extremum (2, 4, 6, 8, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauVariations, type Courbe } from "@/lib/fiches-exercices/figures";

/* Les courbes lues dans les énoncés — et redessinées, marquées, dans les corrigés. */
const COURBE_1: Courbe[] = [{ q: [1, 2, -3] }];
const COURBE_11: Courbe[] = [{ p: [1, -3, 0, 2] }];
const CRUE_14: Courbe[] = [{ pts: [[0, 1], [2, 2], [4, 6], [7, 3], [10, 1.5]] }];
const EOLIENNE_19: Courbe[] = [{ pts: [[0, 0], [3, 0], [6, 0.5], [9, 1.5], [12, 3], [25, 3]] }];

export const exercicesVariationsSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "fonction-variations-extremums",
  titre: "Variations et extremums d'une fonction",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une courbe, dresser et lire un tableau de variations, comparer deux images sans les calculer, démontrer un sens de variation, trouver un maximum. Une crue, le 100 m de Usain Bolt, un potager, une éolienne, la distance de la Terre au Soleil. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/fonction-variations-extremums", titre: "Variations et extremums" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire, dresser, comparer : un geste par exercice.",
      rappel: [
        "CROISSANTE sur un intervalle : quand $x$ augmente, $f(x)$ augmente. L'ordre est conservé : $a < b$ donne $f(a) < f(b)$.",
        "DÉCROISSANTE : l'ordre s'inverse, $a < b$ donne $f(a) > f(b)$.",
        "Le tableau de variations : les $x$ en haut, les valeurs de $f$ en bas, une flèche par morceau.",
        "Le MAXIMUM est la plus grande VALEUR prise par $f$ ; il est atteint EN une abscisse. Même chose pour le minimum.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-4\\,;\\,2]$.\na) Sur quel intervalle $f$ est-elle décroissante ? croissante ?\nb) Dresser son tableau de variations.",
          figure: repere([-4, 2, -5, 6], COURBE_1),
          correction:
            "a) On lit la courbe de gauche à droite : elle descend de $x = -4$ à $x = -1$, puis monte jusqu'à $x = 2$.\n$f$ est décroissante sur $[-4\\,;\\,-1]$ et croissante sur $[-1\\,;\\,2]$.\nb) En haut, les abscisses $-4$, $-1$ et $2$. En bas, les valeurs $f(-4) = 5$, $f(-1) = -4$ et $f(2) = 5$, reliées par une flèche qui descend puis une flèche qui monte.\n⛔ Le piège : écrire les ORDONNÉES dans la ligne du haut. En haut, ce sont les $x$ ; en bas, ce que vaut $f$.",
          schema: tableauVariations([-4, -1, 2], [5, -4, 5]),
          micros: ["variation_tableau"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $g$ définie sur $[-4\\,;\\,5]$.\na) Sur quel(s) intervalle(s) $g$ est-elle croissante ? décroissante ?\nb) Quel est le maximum de $g$ ? son minimum ? Où sont-ils atteints ?",
          figure: tableauVariations([-4, 0, 3, 5], [1, -3, 4, 2], "g"),
          correction:
            "a) Une flèche qui monte : $g$ est croissante sur $[0\\,;\\,3]$.\nDes flèches qui descendent : $g$ est décroissante sur $[-4\\,;\\,0]$ et sur $[3\\,;\\,5]$.\nb) La plus grande valeur du tableau est $4$ : le maximum vaut $4$, atteint en $x = 3$. La plus petite est $-3$ : le minimum vaut $-3$, atteint en $x = 0$.\n⛔ Le piège : répondre « le maximum est $3$ ». $3$ dit OÙ (l'abscisse), $4$ dit COMBIEN (la valeur).",
          micros: ["variation_tableau", "variation_extremum"],
        },
        {
          enonce: "a) $f$ est croissante sur $[-5\\,;\\,5]$. Comparer $f(-3)$ et $f(1)$, puis $f(2{,}5)$ et $f(2{,}05)$.\nb) $g$ est décroissante sur $[0\\,;\\,10]$. Comparer $g(\\sqrt{2})$ et $g(1{,}5)$.",
          correction:
            "a) $-3 < 1$, et $f$ croissante conserve l'ordre : $f(-3) < f(1)$.\n$2{,}05 < 2{,}5$ (on compare $2{,}05$ et $2{,}50$), donc $f(2{,}05) < f(2{,}5)$.\nb) $\\sqrt{2} \\approx 1{,}414$, donc $\\sqrt{2} < 1{,}5$. Mais $g$ décroissante INVERSE l'ordre : $g(\\sqrt{2}) > g(1{,}5)$.\n⛔ Le piège au a) : croire que $2{,}05 > 2{,}5$ parce que « $05$ » s'écrit avec plus de chiffres.",
          micros: ["variation_croissance"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $h$ définie sur $[-3\\,;\\,6]$.\na) Quel est le maximum de $h$, et où est-il atteint ?\nb) Quel est son minimum ?",
          figure: tableauVariations([-3, 1, 6], [2, 7, -4], "h"),
          correction:
            "a) $h$ monte jusqu'en $x = 1$, puis redescend : le maximum vaut $7$, atteint en $x = 1$.\nb) Le tableau n'a pas de « creux » : le minimum est à l'un des deux bords. On compare $h(-3) = 2$ et $h(6) = -4$.\nLe minimum vaut $-4$, atteint en $x = 6$, au BORD de l'intervalle.\n⛔ Le piège : chercher le minimum seulement là où la flèche change de sens. Les bords comptent aussi.",
          micros: ["variation_extremum"],
        },
        {
          enonce: "Sans tracer, donner le sens de variation sur $\\mathbb{R}$ de :\na) $f(x) = 4x - 7$\nb) $g(x) = -2x + 5$\nc) $h(x) = 3 - \\dfrac{x}{2}$\nd) $k(x) = 6$",
          correction:
            "Pour une fonction affine $ax + b$, c'est le signe de $a$ qui décide : $a > 0$, croissante ; $a < 0$, décroissante ; $a = 0$, constante.\na) $a = 4 > 0$ : $f$ est croissante sur $\\mathbb{R}$.\nb) $a = -2 < 0$ : $g$ est décroissante sur $\\mathbb{R}$.\nc) $h(x) = -\\dfrac{1}{2}x + 3$ : $a = -\\dfrac{1}{2} < 0$, $h$ est décroissante.\nd) $a = 0$ : $k$ est constante, sa courbe est une droite horizontale.\n⛔ Le piège au c) : lire $a = 3$, le premier nombre écrit. Le coefficient de $x$ est $-\\dfrac{1}{2}$.",
          // f en bleu qui monte, g en orange qui descend.
          schema: repere([-1, 3, -6, 6], [{ q: [0, 4, -7] }, { q: [0, -2, 5], couleur: ORANGE }]),
          micros: ["variation_croissance"],
        },
        {
          enonce: "La fonction $u$ est définie sur $[0\\,;\\,8]$. Elle est décroissante sur $[0\\,;\\,3]$ et croissante sur $[3\\,;\\,8]$, avec $u(0) = 5$, $u(3) = -1$ et $u(8) = 7$.\na) Dresser le tableau de variations de $u$.\nb) Quel est le minimum de $u$ ? son maximum ?",
          correction:
            "a) Trois abscisses en haut : $0$, $3$ et $8$. En bas, les valeurs $5$, $-1$ et $7$, avec une flèche qui descend puis une flèche qui monte.\nb) Le minimum vaut $-1$, atteint en $x = 3$, au fond du creux.\nPour le maximum, on compare les deux bords : $u(0) = 5$ et $u(8) = 7$. Le maximum vaut $7$, atteint en $x = 8$.\n⛔ Le piège au b) : oublier un des deux bords, et répondre $5$.",
          schema: tableauVariations([0, 3, 8], [5, -1, 7], "u"),
          micros: ["variation_tableau", "variation_extremum"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $f$ définie sur $[-2\\,;\\,6]$.\na) Comparer $f(-1)$ et $f(1)$.\nb) Comparer $f(3)$ et $f(5)$.\nc) Peut-on comparer $f(0)$ et $f(4)$ ?",
          figure: tableauVariations([-2, 2, 6], [0, 5, 1]),
          correction:
            "a) $-1$ et $1$ sont tous deux dans $[-2\\,;\\,2]$, où $f$ croît : l'ordre est conservé, $f(-1) < f(1)$.\nb) $3$ et $5$ sont dans $[2\\,;\\,6]$, où $f$ décroît : l'ordre s'inverse, $f(3) > f(5)$.\nc) Non. $0$ et $4$ ne sont pas sur le même morceau : entre les deux, $f$ monte puis redescend.\nLes deux courbes dessinées ont TOUTES LES DEUX ce tableau. Sur la bleue, $f(0) < f(4)$ ; sur l'orange, $f(0) > f(4)$.\n⛔ Le piège au c) : conclure $f(0) < f(4)$ parce que $0 < 4$. On ne compare que sur un intervalle où le sens ne change pas.",
          schema: repere([-2, 6, -1, 6], [
            { pts: [[-2, 0], [0, 1], [2, 5], [4, 4], [6, 1]] },
            { pts: [[-2, 0], [0, 4], [2, 5], [4, 2], [6, 1]], couleur: ORANGE },
          ], [{ x: 0, y: 1 }, { x: 4, y: 4 }, { x: 0, y: 4 }, { x: 4, y: 2 }]),
          micros: ["variation_croissance"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $f$ définie sur $[-4\\,;\\,4]$. Vrai ou faux ? Justifier.\na) $f(-3) > f(-2)$.\nb) $f$ est positive sur $[-1\\,;\\,4]$.\nc) Le minimum de $f$ sur $[-4\\,;\\,4]$ est $-1$.\nd) L'équation $f(x) = 4$ a exactement une solution.",
          figure: tableauVariations([-4, -1, 4], [3, -2, 8]),
          correction:
            "a) VRAI. $-3$ et $-2$ sont dans $[-4\\,;\\,-1]$, où $f$ décroît, et $-3 < -2$ : l'ordre s'inverse, $f(-3) > f(-2)$.\nb) FAUX. $f(-1) = -2$ est négatif. Une fonction peut monter en étant négative.\nc) FAUX. Le minimum VAUT $-2$ ; il est ATTEINT en $-1$. Le nombre $-1$ est une abscisse.\nd) VRAI. Sur $[-4\\,;\\,-1]$, $f$ va de $3$ à $-2$ : elle ne passe jamais par $4$. Sur $[-1\\,;\\,4]$, elle monte de $-2$ à $8$ : elle passe par $4$ une seule fois.\n⭐ Ci-dessous, UNE courbe possible : l'horizontale $y = 4$ la coupe une seule fois.",
          schema: repere([-4, 4, -3, 9], [{ pts: [[-4, 3], [-1, -2], [4, 8]] }], [{ x: 2, y: 4 }], 4),
          micros: ["variation_croissance", "variation_extremum", "variation_tableau"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : démontrer, compter les solutions, justifier un extremum.",
      rappel: [
        "Démontrer un sens de variation : on prend $a < b$ et on étudie le SIGNE de $f(b) - f(a)$.",
        "Un carré est toujours positif ou nul : $(x - 3)^2 + 2 \\geqslant 2$ montre un minimum, à condition qu'il soit ATTEINT.",
        "Compter les solutions de $f(x) = k$ : flèche par flèche, on regarde si $k$ est entre les deux bouts.",
        "Les extremums se cherchent aussi aux BORDS de l'intervalle.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = -3x + 2$. On prend deux nombres $a < b$.\na) Calculer $f(b) - f(a)$, et l'écrire sous la forme $k(b - a)$.\nb) Quel est le signe de $f(b) - f(a)$ ?\nc) En déduire le sens de variation de $f$ sur $\\mathbb{R}$.",
          correction:
            "a) $f(b) - f(a) = (-3b + 2) - (-3a + 2) = -3b + 3a = -3(b - a)$.\nb) $a < b$, donc $b - a > 0$. On multiplie par $-3$, négatif : $-3(b - a) < 0$.\nc) Pour tous $a < b$, on a $f(b) - f(a) < 0$, c'est-à-dire $f(a) > f(b)$ : l'ordre s'inverse, $f$ est décroissante sur $\\mathbb{R}$.\n⭐ C'est la DÉFINITION qui démontre : on ne regarde pas un dessin, on prouve pour tous les $a < b$ à la fois.\n⛔ Le piège au a) : oublier la parenthèse, et écrire $-3b + 2 - 3a + 2$.",
          schema: repere([-2, 3, -5, 7], [{ q: [0, -3, 2] }], [{ x: -1, y: 5 }, { x: 2, y: -4 }]),
          micros: ["variation_croissance"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 6x + 11$.\na) Vérifier que $f(x) = (x - 3)^2 + 2$.\nb) En déduire que $f(x) \\geqslant 2$ pour tout nombre $x$.\nc) Quel est le minimum de $f$, et où est-il atteint ?",
          correction:
            "a) $(x - 3)^2 + 2 = x^2 - 6x + 9 + 2 = x^2 - 6x + 11$. ✓\nb) Un carré est toujours positif ou nul : $(x - 3)^2 \\geqslant 0$. On ajoute $2$ des deux côtés : $(x - 3)^2 + 2 \\geqslant 2$, soit $f(x) \\geqslant 2$.\nc) La valeur $2$ est atteinte quand le carré est nul, pour $x = 3$ : $f(3) = 0 + 2 = 2$. Le minimum de $f$ vaut $2$, atteint en $x = 3$.\n⛔ Le piège au c) : s'arrêter à « $f(x) \\geqslant 2$ ». Un minimum doit être ATTEINT : il faut le $x$ qui donne $2$.",
          schema: repere([-1, 6, -1, 8], [{ q: [1, -6, 11] }], [{ x: 3, y: 2 }], 2),
          micros: ["variation_extremum"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-1\\,;\\,3]$.\na) Dresser son tableau de variations.\nb) Donner le maximum et le minimum de $f$ sur $[-1\\,;\\,3]$, et où ils sont atteints.\nc) Combien l'équation $f(x) = 1$ a-t-elle de solutions ?",
          figure: repere([-1, 3, -3, 4], COURBE_11),
          correction:
            "a) La courbe monte de $x = -1$ à $x = 0$, descend jusqu'à $x = 2$, puis remonte jusqu'à $x = 3$. Les valeurs : $f(-1) = -2$, $f(0) = 2$, $f(2) = -2$ et $f(3) = 2$.\nb) Le maximum vaut $2$, et il est atteint DEUX fois : en $x = 0$ et en $x = 3$. Le minimum vaut $-2$, atteint en $x = -1$ et en $x = 2$.\nc) Sur chacun des trois morceaux, $f$ va de $-2$ à $2$ ou de $2$ à $-2$ : elle passe par $1$ une fois sur chacun. L'équation $f(x) = 1$ a TROIS solutions.\n⭐ Le tableau suffit pour COMPTER les solutions, sans les calculer.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([-1, 0, 2, 3], [-2, 2, -2, 2])}
              {repere([-1, 3, -3, 4], COURBE_11, [], 1)}
            </div>
          ),
          micros: ["variation_tableau", "variation_extremum"],
        },
        {
          enonce: "Une fonction $f$ est décroissante sur $[-6\\,;\\,-2]$ et croissante sur $[-2\\,;\\,4]$, avec $f(-2) = -5$.\na) Comparer $f(-5)$ et $f(-3)$.\nb) Comparer $f(0)$ et $f(3)$.\nc) Montrer que $f(x) \\geqslant -5$ pour tout $x$ de $[-6\\,;\\,4]$.\nd) Peut-on comparer $f(-4)$ et $f(2)$ ?",
          correction:
            "a) $-5 < -3$, dans $[-6\\,;\\,-2]$ où $f$ décroît : l'ordre s'inverse, $f(-5) > f(-3)$.\nb) $0 < 3$, dans $[-2\\,;\\,4]$ où $f$ croît : $f(0) < f(3)$.\nc) Sur $[-6\\,;\\,-2]$, $f$ descend jusqu'à $f(-2) = -5$ : toutes ses valeurs y sont supérieures ou égales à $-5$. Sur $[-2\\,;\\,4]$, elle monte à partir de $-5$ : encore supérieures ou égales à $-5$.\nDonc $f(x) \\geqslant -5$ partout : $-5$ est le minimum de $f$, atteint en $-2$.\nd) Non : $-4$ et $2$ sont de part et d'autre de $-2$, là où le sens change. Il faudrait connaître les valeurs.\n⭐ Ci-dessous, UNE courbe possible. D'autres respectent le même énoncé.\n⛔ Le piège au a) : penser « $-5$ est plus petit, donc $f(-5)$ aussi ». Sur un morceau décroissant, c'est l'inverse.",
          schema: repere([-6, 4, -6, 4], [{ pts: [[-6, 3], [-2, -5], [4, 4]] }], [{ x: -5, y: 1 }, { x: -3, y: -3 }, { x: -2, y: -5 }]),
          micros: ["variation_croissance", "variation_extremum"],
        },
        {
          enonce: "Voici le tableau de variations d'une fonction $g$ définie sur $[-5\\,;\\,4]$.\na) Combien l'équation $g(x) = 2$ a-t-elle de solutions ?\nb) Et l'équation $g(x) = 5$ ?\nc) Et l'équation $g(x) = -4$ ?\nd) Donner le maximum et le minimum de $g$ sur $[-5\\,;\\,4]$.",
          figure: tableauVariations([-5, -2, 1, 4], [-3, 4, 0, 6], "g"),
          correction:
            "On regarde, flèche par flèche, si la valeur cherchée est entre les deux bouts.\na) De $-3$ à $4$ : $2$ est entre les deux, une solution. De $4$ à $0$ : encore une. De $0$ à $6$ : encore une. TROIS solutions.\nb) $5$ n'est atteint que sur la dernière flèche, de $0$ à $6$ : UNE solution.\nc) La plus petite valeur du tableau est $-3$ : $g$ ne descend jamais jusqu'à $-4$. AUCUNE solution.\nd) Le maximum vaut $6$, atteint en $x = 4$. Le sommet $4$, en $x = -2$, n'est qu'un maximum LOCAL. Le minimum vaut $-3$, atteint en $x = -5$.\n⛔ Le piège au d) : prendre le premier sommet pour le maximum. On compare TOUTES les valeurs du haut, bords compris.",
          schema: repere([-5, 4, -4, 7], [{ pts: [[-5, -3], [-2, 4], [1, 0], [4, 6]] }], [], 2),
          micros: ["variation_tableau", "variation_extremum"],
        },
        {
          enonce: "Pendant une crue, on mesure la hauteur d'eau $h(t)$ d'une rivière sous un pont, en mètres, $t$ heures après le début des fortes pluies.\na) Dresser le tableau de variations de $h$ sur $[0\\,;\\,10]$.\nb) Quelle a été la hauteur maximale, et à quel moment ?\nc) La vigilance crue est déclenchée quand l'eau dépasse $4$ m. Combien de temps a-t-elle duré ?\nd) Sans lire les valeurs, comparer $h(1)$ et $h(3)$, puis $h(5)$ et $h(9)$.",
          figure: repere([0, 10, -1, 7], CRUE_14),
          correction:
            "a) L'eau monte de $t = 0$ à $t = 4$, puis redescend jusqu'à $t = 10$. Les valeurs : $h(0) = 1$, $h(4) = 6$ et $h(10) = 1{,}5$.\nb) Le maximum vaut $6$ m, atteint au bout de $4$ heures : c'est le pic de crue.\nc) L'horizontale $y = 4$ coupe la courbe en $t = 3$ et en $t = 6$ : l'eau dépasse $4$ m de $3$ h à $6$ h, soit pendant $3$ heures.\nd) $1$ et $3$ sont dans $[0\\,;\\,4]$, où $h$ croît : $h(1) < h(3)$. $5$ et $9$ sont dans $[4\\,;\\,10]$, où $h$ décroît : $h(5) > h(9)$.\n⛔ Le piège au c) : répondre « $4$ heures », l'instant du pic. On demande une DURÉE : de $3$ h à $6$ h.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([0, 4, 10], [1, 6, 1.5], "h", "t")}
              {repere([0, 10, -1, 7], CRUE_14, [{ x: 3, y: 4 }, { x: 6, y: 4 }], 4)}
            </div>
          ),
          micros: ["variation_tableau", "variation_extremum", "variation_croissance"],
        },
        {
          enonce: "Soit $g(x) = 2 - (x + 1)^2$, définie sur $[-4\\,;\\,2]$.\na) Montrer que $g(x) \\leqslant 2$ pour tout $x$, et en déduire le maximum de $g$.\nb) Calculer $g(-4)$ et $g(2)$.\nc) On admet que $g$ est croissante sur $[-4\\,;\\,-1]$ et décroissante sur $[-1\\,;\\,2]$. Dresser son tableau de variations, et donner son minimum.",
          correction:
            "a) $(x + 1)^2 \\geqslant 0$, donc $-(x + 1)^2 \\leqslant 0$, et $2 - (x + 1)^2 \\leqslant 2$.\nLa valeur $2$ est atteinte quand le carré s'annule, en $x = -1$ : $g(-1) = 2$. Le maximum vaut $2$, atteint en $x = -1$.\nb) $g(-4) = 2 - (-3)^2 = 2 - 9 = -7$ et $g(2) = 2 - 3^2 = 2 - 9 = -7$.\nc) En haut : $-4$, $-1$, $2$. En bas : $-7$, $2$, $-7$. Le minimum vaut $-7$, atteint deux fois, en $x = -4$ et en $x = 2$.\n⛔ Le piège au a) : écrire $-(x + 1)^2 \\geqslant 0$. Multiplier par $-1$ retourne l'inégalité.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([-4, -1, 2], [-7, 2, -7], "g")}
              {repere([-4, 2, -8, 4], [{ q: [-1, -2, 1] }], [{ x: -1, y: 2 }, { x: -4, y: -7 }, { x: 2, y: -7 }])}
            </div>
          ),
          micros: ["variation_extremum", "variation_tableau"],
        },
        {
          enonce: "Une fonction $f$ est croissante sur $[0\\,;\\,4]$, avec $f(0) = 1$ et $f(4) = 5$.\na) Que peut-on dire de $f(2)$ ?\nb) Vérifier que $u(x) = x + 1$ et $v(x) = 0{,}25x^2 + 1$ prennent les mêmes valeurs que $f$ en $0$ et en $4$. On admet qu'elles sont croissantes sur $[0\\,;\\,4]$.\nc) Calculer $u(2)$ et $v(2)$. Que peut-on en conclure ?",
          correction:
            "a) $0 < 2 < 4$ et $f$ croît : $f(0) < f(2) < f(4)$, soit $1 < f(2) < 5$. C'est TOUT ce qu'on peut dire.\nb) $u(0) = 1$ et $u(4) = 5$. De même $v(0) = 1$ et $v(4) = 0{,}25 \\times 16 + 1 = 5$.\nc) $u(2) = 3$ et $v(2) = 0{,}25 \\times 4 + 1 = 2$. Les deux fonctions ont le MÊME tableau de variations, et pas la même image de $2$.\nUn tableau de variations ne donne pas les valeurs entre ses bornes : il ne dit que le sens.\n⛔ Le piège au a) : répondre $f(2) = 3$, « au milieu ». Rien n'oblige la fonction à monter régulièrement.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauVariations([0, 4], [1, 5])}
              {repere([0, 4, -1, 6], [{ q: [0, 1, 1] }, { q: [0.25, 0, 1], couleur: ORANGE }], [{ x: 2, y: 3 }, { x: 2, y: 2 }])}
            </div>
          ),
          micros: ["variation_tableau", "variation_croissance"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on lit le sens de variation, on trouve l'extremum, on répond par une phrase.",
      rappel: [
        "Avant de comparer deux valeurs, on vérifie qu'elles sont sur un même intervalle où le sens ne change pas.",
        "Un maximum peut être atteint en plusieurs points, ou sur tout un intervalle.",
        "On répond avec l'unité : « $6$ m au bout de $4$ heures », pas « $x = 4$ ».",
      ],
      exercices: [
        {
          titre: "Le 100 m de Usain Bolt",
          enonce: "Berlin, 2009 : Usain Bolt court le 100 m en $9{,}58$ s, record du monde toujours en vigueur. Le tableau donne le temps mis pour chaque tranche de $10$ m.\na) Calculer sa vitesse moyenne, en m/s, sur la première tranche, puis sur la tranche de $60$ à $70$ m. Arrondir au centième.\nb) Sur quelles tranches sa vitesse augmente-t-elle ? Justifier à partir des temps, sans tout calculer.\nc) Quelle est sa vitesse maximale, en km/h ?\nd) Que se passe-t-il sur les $30$ derniers mètres ?",
          figure: tableau(
            ["Tranche (m)", "0 à 10", "10 à 20", "20 à 30", "30 à 40", "40 à 50", "50 à 60", "60 à 70", "70 à 80", "80 à 90", "90 à 100"],
            ["Temps (s)", "1,89", "0,99", "0,90", "0,86", "0,83", "0,82", "0,81", "0,82", "0,83", "0,83"],
            "ecran",
          ),
          correction:
            "a) Vitesse $=$ distance $\\div$ temps. Première tranche : $\\dfrac{10}{1{,}89} \\approx 5{,}29$ m/s. De $60$ à $70$ m : $\\dfrac{10}{0{,}81} \\approx 12{,}35$ m/s.\nb) Pour une même distance, plus le temps est COURT, plus la vitesse est grande : temps et vitesse varient en sens contraires.\nLes temps diminuent de $1{,}89$ s à $0{,}81$ s, de la première tranche à celle de $60$ à $70$ m : sa vitesse augmente sur toutes ces tranches.\nc) La vitesse est maximale sur la tranche de $60$ à $70$ m, celle du temps le plus court : $\\dfrac{10}{0{,}81} \\times 3{,}6 \\approx 44{,}4$ km/h.\nd) Les temps remontent : $0{,}82$ s, puis $0{,}83$ s deux fois. Sa vitesse diminue un peu : environ $12{,}20$ m/s, puis $12{,}05$ m/s. Même le recordman du monde ralentit à la fin.\n⭐ Sa vitesse CROÎT puis DÉCROÎT : elle a un maximum, entre $60$ et $70$ m.\n⛔ Le piège au b) : « le temps diminue, donc la vitesse diminue ». Temps et vitesse varient en sens CONTRAIRES.",
          // En abscisse, le numéro de la tranche ; en ordonnée, la vitesse en m/s.
          schema: repere([0, 10, -2, 14], [{ pts: [[1, 5.29], [2, 10.1], [3, 11.11], [4, 11.63], [5, 12.05], [6, 12.2], [7, 12.35], [8, 12.2], [9, 12.05], [10, 12.05]] }], [{ x: 7, y: 12.35 }]),
          micros: ["variation_croissance", "variation_extremum"],
        },
        {
          titre: "Le plus grand potager",
          enonce: "Avec $36$ m de grillage, on veut clôturer un potager rectangulaire. On note $x$ sa largeur, en mètres.\na) Montrer que sa longueur vaut $18 - x$, et que $x$ est entre $0$ et $18$.\nb) Montrer que son aire est $A(x) = 81 - (x - 9)^2$.\nc) En déduire l'aire maximale, et les dimensions du potager.\nd) Dresser le tableau de variations de $A$ sur $[0\\,;\\,18]$. On admet que $A$ croît jusqu'à $9$, puis décroît.",
          correction:
            "a) Le périmètre vaut $2x + 2L = 36$, donc $x + L = 18$ et la longueur vaut $L = 18 - x$. Les deux longueurs sont positives : $0 < x < 18$.\nb) $A(x) = x(18 - x) = 18x - x^2$. Et $81 - (x - 9)^2 = 81 - x^2 + 18x - 81 = 18x - x^2$. ✓\nc) $(x - 9)^2 \\geqslant 0$, donc $A(x) \\leqslant 81$, et $A(9) = 81$. L'aire maximale vaut $81$ m², pour $x = 9$ ; la longueur vaut alors $18 - 9 = 9$ m. Le meilleur rectangle est un CARRÉ.\nd) $A(0) = 0$, $A(9) = 81$ et $A(18) = 0$ : une flèche qui monte de $0$ à $81$, puis une flèche qui redescend à $0$.\n⛔ Le piège au c) : répondre « $9$ » à la question de l'aire. $9$ m est la largeur ; l'aire vaut $81$ m².",
          schema: tableauVariations([0, 9, 18], [0, 81, 0], "A"),
          micros: ["variation_extremum", "variation_tableau"],
        },
        {
          titre: "L'éolienne",
          enonce: "La courbe donne la puissance $P(v)$ produite par une éolienne, en mégawatts (MW), selon la vitesse du vent $v$, en m/s. Au-delà de $25$ m/s (90 km/h), l'éolienne s'arrête pour ne pas casser.\na) Dresser le tableau de variations de $P$ sur $[0\\,;\\,25]$.\nb) Quelle est la puissance maximale ? Pour quelles vitesses du vent est-elle atteinte ?\nc) Comparer $P(5)$ et $P(8)$, puis $P(14)$ et $P(22)$.\nd) Quand le vent passe de $6$ à $12$ m/s, sa vitesse double. Que devient la puissance ?",
          figure: repere([0, 25, -1, 4], EOLIENNE_19),
          correction:
            "a) $P$ est constante, et nulle, sur $[0\\,;\\,3]$ : le vent est trop faible pour faire tourner les pales. Elle est croissante sur $[3\\,;\\,12]$, puis constante sur $[12\\,;\\,25]$, où elle vaut $3$ MW.\nb) Le maximum vaut $3$ MW, et il est atteint pour TOUTES les vitesses de $[12\\,;\\,25]$, pas en un seul point.\nc) $5$ et $8$ sont dans $[3\\,;\\,12]$, où $P$ croît : $P(5) < P(8)$. $14$ et $22$ sont dans $[12\\,;\\,25]$, où $P$ est constante : $P(14) = P(22) = 3$.\nd) $P(6) = 0{,}5$ et $P(12) = 3$ : la vitesse double, et la puissance est multipliée par $6$. Un vent deux fois plus fort donne bien plus que deux fois plus d'énergie.\n⛔ Le piège au b) : « le maximum est atteint en $12$ ». Il l'est en $12$, mais aussi en $20$ ou en $25$ : sur tout un intervalle.",
          schema: tableauVariations([0, 3, 12, 25], [0, 0, 3, 3], "P", "v"),
          micros: ["variation_tableau", "variation_extremum", "variation_croissance"],
        },
        {
          titre: "La Terre et le Soleil",
          enonce: "La distance entre la Terre et le Soleil change au cours de l'année. On note $d(t)$ cette distance, en millions de km, $t$ jours après le 3 janvier. Voici le tableau de variations de $d$ sur $[0\\,;\\,365]$.\na) Quand la Terre est-elle au plus près du Soleil ? au plus loin ?\nb) Comparer $d(30)$ et $d(90)$, puis $d(200)$ et $d(300)$.\nc) De combien la distance varie-t-elle au cours de l'année ? Et en pourcentage de la plus petite ?\nd) En France, c'est en janvier qu'il fait le plus froid. Qu'en conclure sur l'origine des saisons ?",
          figure: tableauVariations([0, 183, 365], ["147,1", "152,1", "147,1"], "d", "t"),
          correction:
            "a) $d$ croît sur $[0\\,;\\,183]$, puis décroît. Le minimum, $147{,}1$ millions de km, est atteint en $t = 0$ (le 3 janvier) et en $t = 365$. Le maximum, $152{,}1$ millions de km, en $t = 183$, le 5 juillet.\nb) $30$ et $90$ sont dans $[0\\,;\\,183]$, où $d$ croît : $d(30) < d(90)$. $200$ et $300$ sont dans $[183\\,;\\,365]$, où $d$ décroît : $d(200) > d(300)$.\nc) $152{,}1 - 147{,}1 = 5$ millions de km. Rapporté à la plus petite distance : $\\dfrac{5}{147{,}1} \\approx 0{,}034$, soit environ $3{,}4$ %.\nd) C'est au début de janvier que la Terre est le PLUS PRÈS du Soleil, en plein hiver en France. La distance ne fait donc pas les saisons : elle ne varie que de $3$ %. Les saisons viennent de l'inclinaison de l'axe de la Terre.\n⭐ En Australie, janvier est l'été : le même jour, deux saisons opposées, à la même distance du Soleil.",
          micros: ["variation_tableau", "variation_extremum", "variation_croissance"],
        },
      ],
    },
  ],
};
