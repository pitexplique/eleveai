// ─── Fiche d'exercices : x ↦ aˣ, variations et courbe (1re, sans spé) ────────
//                              20 exercices corrigés
//
// Chapitre « Variation exponentielle » (BOP1VE) de la première SANS
// spécialité (28/09/2026), quatrième feuille : le sens de variation selon la
// base, la courbe qu'on LIT, et le lien suite géométrique → fonction qui la
// prolonge. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/fonction-exponentielle.bank.ts`.
//
// ⛔ x ↦ aˣ avec a > 0 et x ⩾ 0 : pas d'exponentielle eˣ, pas de logarithme.
// Une équation aˣ = k se résout par LECTURE graphique, vérifiée par le calcul.
//
// ⭐⭐ LE FIL : LA BASE DÉCIDE DU SENS, LA COURBE N'EST PAS UNE DROITE. Les
// pièges nommés : f(0) lu 0 (2, 3), la moyenne de deux termes prise pour la
// valeur entre eux (6, 15), l'ordre des images renversé quand a < 1 (7), la
// perte fixe au lieu de la perte en pourcentage (9, 17), x compté en années
// quand il compte les décennies (11), la taille de départ qui ne décide pas
// à long terme (18).
//
// ⭐ Dessins : une courbe dans l'énoncé de chaque lecture — les courbes sont
// des points échantillonnés, écrits EN CLAIR, que le script recalcule.
// Contextes : économie (voiture 9, placement 16, vélo électrique 19), physique
// (lumière sous l'eau 15, pression en montagne 17), histoire-géo
// (recensements 11, deux villes et l'exode rural 18), sport (fréquence
// cardiaque 10, sortie longue 12), écologie (CO₂ 13, truites 20), nature
// (moisissure 14). Faits réels cités : la pression au niveau de la mer
// (environ 1 013 hPa), l'altitude du mont Blanc (environ 4,8 km) et de
// l'Everest (environ 8,8 km), exercice 17.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-expo-fonction-lecture.mjs`.
//
// Micro-compétences : expo_fct_variations (1, 2, 4, 7, 8, 9, 10, 12, 13, 14,
// 15, 16, 17, 18, 19, 20), expo_fct_graphique (3, 4, 5, 9, 10, 11, 12, 13,
// 14, 16, 17, 18, 19, 20), expo_fct_prolonger_suite (6, 8, 11, 15, 19, 20).
// 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, tableauVariations } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les courbes qu'on LIT restent imprimées. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesExpoFonctionLecturePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "expo-fonction-lecture",
  titre: "Fonction exponentielle : variations et courbe",
  accroche:
    "Vingt exercices pour lire la courbe d'une fonction x ↦ aˣ, trouver son sens de variation d'après sa base, et voir comment elle prolonge une suite géométrique. Des courbes à lire dans presque chaque énoncé, un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f(x) = a^x$, avec $a > 0$ et $x \\geq 0$. Si $a > 1$, $f$ est croissante ; si $0 < a < 1$, $f$ est décroissante ; si $a = 1$, $f$ est constante.",
        "Toutes ces courbes passent par le point $(0 ; 1)$, car $a^0 = 1$. Et $a^x > 0$ : la courbe reste au-dessus de l'axe des abscisses.",
        "La fonction $x \\mapsto a^x$ PROLONGE la suite géométrique $u_n = a^n$ : mêmes valeurs aux entiers, et des valeurs entre eux.",
      ],
      exercices: [
        {
          enonce: "Donner le sens de variation, pour $x \\geq 0$, de $f(x) = 1{,}8^x$, de $g(x) = 0{,}7^x$ et de $h(x) = 1^x$.",
          correction:
            "On compare la base à $1$.\n$1{,}8 > 1$ : $f$ est croissante.\n$0 < 0{,}7 < 1$ : $g$ est décroissante.\n$1^x = 1$ pour tout $x$ : $h$ est constante.\n⚠️ $g$ décroît, mais reste strictement positive : $0{,}7^x$ n'atteint jamais $0$.\nSur le dessin : $f$ en bleu monte, $g$ en orange descend, $h$ en vert reste à $1$.",
          schema: ecranSeulement(repere([-1, 4, -1, 7], [{ pts: [[0, 1], [0.5, 1.34], [1, 1.8], [1.5, 2.41], [2, 3.24], [2.5, 4.35], [3, 5.83]] }, { pts: [[0, 1], [0.5, 0.84], [1, 0.7], [1.5, 0.59], [2, 0.49], [2.5, 0.41], [3, 0.34]], couleur: ORANGE }, { pts: [[0, 1], [3, 1]], couleur: "#16a34a" }])),
          micros: ["expo_fct_variations"],
        },
        {
          enonce: "Dresser le tableau de variations de $f(x) = 2^x$ sur l'intervalle $[0 ; 3]$.",
          correction:
            "$2 > 1$ : $f$ est croissante sur $[0 ; 3]$.\nAux bornes : $f(0) = 2^0 = 1$ et $f(3) = 2^3 = 8$.\nLe tableau a une seule flèche, qui monte de $1$ à $8$.\n⚠️ $f(0) = 1$, pas $0$.",
          schema: ecranSeulement(tableauVariations([0, 3], [1, 8], "f")),
          micros: ["expo_fct_variations"],
        },
        {
          enonce: "La courbe ci-dessous est celle de $f(x) = 2^x$ sur $[0 ; 3]$.\na) Lire $f(2)$.\nb) Lire une valeur approchée de $f(1{,}5)$, puis la calculer au centième.\nc) Lire l'antécédent de $4$ par $f$.",
          figure: repere([-1, 4, -1, 9], [{ pts: [[0, 1], [0.5, 1.41], [1, 2], [1.5, 2.83], [2, 4], [2.5, 5.66], [3, 8]] }]),
          correction:
            "a) Le point d'abscisse $2$ a pour ordonnée $4$ : $f(2) = 4$.\nb) Au-dessus de $1{,}5$, la courbe est un peu en dessous de $3$ : on lit environ $2{,}8$. Le calcul donne $2^{1{,}5} \\approx 2{,}83$.\nc) On part de $4$ sur l'axe vertical, on rejoint la courbe, on descend : l'antécédent est $2$.\n⭐ Une lecture graphique donne une VALEUR APPROCHÉE ; le calcul la précise.",
          micros: ["expo_fct_graphique"],
        },
        {
          enonce: "Le repère montre les courbes de $f(x) = 1{,}5^x$ et de $g(x) = 0{,}5^x$ sur $[0 ; 4]$. Laquelle est la bleue ? Justifier sans calcul.",
          figure: repere([-1, 5, -1, 6], [
            { pts: [[0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38], [3.5, 4.13], [4, 5.06]] },
            { pts: [[0, 1], [0.5, 0.71], [1, 0.5], [1.5, 0.35], [2, 0.25], [2.5, 0.18], [3, 0.13], [3.5, 0.09], [4, 0.06]], couleur: ORANGE },
          ]),
          correction:
            "$1{,}5 > 1$ : $f$ est croissante. $0 < 0{,}5 < 1$ : $g$ est décroissante.\nLa courbe bleue monte : c'est celle de $f$. L'orange descend : c'est celle de $g$.\n⭐ Les deux se croisent en $(0 ; 1)$ : $1{,}5^0 = 0{,}5^0 = 1$.\n⚠️ L'orange s'approche de l'axe des abscisses sans jamais le toucher.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
        {
          enonce: "a) Justifier que les courbes de toutes les fonctions $x \\mapsto a^x$ passent par un même point.\nb) Pour $x > 0$, lequel est le plus grand : $2^x$ ou $3^x$ ? Vérifier pour $x = 2$.",
          correction:
            "a) $a^0 = 1$ pour tout $a > 0$ : toutes les courbes passent par le point $(0 ; 1)$.\nb) Pour $x > 0$, plus la base est grande, plus $a^x$ est grand : $3^x > 2^x$.\nPour $x = 2$ : $3^2 = 9$ et $2^2 = 4$.\n⚠️ En $x = 0$, les deux valent $1$ : l'écart n'apparaît qu'ensuite.\nSur le dessin, $3^x$ en bleu, $2^x$ en orange.",
          schema: ecranSeulement(
            repere([-1, 3, -1, 10], [
              { pts: [[0, 1], [0.25, 1.32], [0.5, 1.73], [0.75, 2.28], [1, 3], [1.25, 3.95], [1.5, 5.2], [1.75, 6.84], [2, 9]] },
              { pts: [[0, 1], [0.5, 1.41], [1, 2], [1.5, 2.83], [2, 4]], couleur: ORANGE },
            ], [], undefined, true),
          ),
          micros: ["expo_fct_graphique"],
        },
        {
          enonce: "On considère la suite $u_n = 2^n$ et la fonction $f(x) = 2^x$.\na) Comparer $u_3$ et $f(3)$.\nb) Calculer $f(2{,}5)$ au centième. Entre quels termes de la suite se trouve-t-il ?\nc) Que sait calculer la fonction, que la suite ne sait pas calculer ?",
          correction:
            "a) $u_3 = 2^3 = 8$ et $f(3) = 2^3 = 8$ : les mêmes. Aux entiers, la fonction et la suite coïncident.\nb) $f(2{,}5) = 2^{2{,}5} \\approx 5{,}66$ : entre $u_2 = 4$ et $u_3 = 8$.\nc) La suite n'a de valeur qu'aux rangs entiers ; la fonction en a une pour tout $x \\geq 0$ : elle PROLONGE la suite.\n⚠️ $f(2{,}5)$ n'est pas la moyenne de $4$ et $8$, soit $6$ : entre deux points, la courbe n'est pas une droite.\nSur le dessin, les points rouges des rangs entiers sont ceux de la suite ; le point d'abscisse $2{,}5$ n'existe que pour la fonction.",
          schema: ecranSeulement(repere([-1, 4, -1, 9], [{ pts: [[0, 1], [0.5, 1.41], [1, 2], [1.5, 2.83], [2, 4], [2.5, 5.66], [3, 8]] }], [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 2.5, y: 5.66 }, { x: 3, y: 8 }])),
          micros: ["expo_fct_prolonger_suite"],
        },
        {
          enonce: "Sans calculatrice, comparer :\na) $0{,}8^{2{,}5}$ et $0{,}8^3$ ;\nb) $1{,}2^{1{,}5}$ et $1{,}2^2$.",
          correction:
            "a) $x \\mapsto 0{,}8^x$ est décroissante, car $0{,}8 < 1$. Comme $2{,}5 < 3$, les images sont rangées dans l'ordre CONTRAIRE : $0{,}8^{2{,}5} > 0{,}8^3$.\nb) $x \\mapsto 1{,}2^x$ est croissante, car $1{,}2 > 1$. Comme $1{,}5 < 2$ : $1{,}2^{1{,}5} < 1{,}2^2$.\n✔️ À la calculatrice : $0{,}8^{2{,}5} \\approx 0{,}572$ et $0{,}8^3 = 0{,}512$ ; $1{,}2^{1{,}5} \\approx 1{,}315$ et $1{,}2^2 = 1{,}44$.\nSur le dessin : $0{,}8^x$ en orange descend, donc le point en $2{,}5$ est plus haut que celui en $3$ ; $1{,}2^x$ en bleu monte, donc le point en $1{,}5$ est plus bas que celui en $2$.",
          schema: ecranSeulement(repere([-1, 4, -1, 2], [{ pts: [[0, 1], [0.5, 0.89], [1, 0.8], [1.5, 0.72], [2, 0.64], [2.5, 0.57], [3, 0.51]], couleur: ORANGE }, { pts: [[0, 1], [0.5, 1.1], [1, 1.2], [1.5, 1.31], [2, 1.44]] }], [{ x: 2.5, y: 0.57 }, { x: 3, y: 0.512 }, { x: 1.5, y: 1.31 }, { x: 2, y: 1.44 }])),
          micros: ["expo_fct_variations"],
        },
        {
          enonce: "On considère la suite géométrique $v_n = 3 \\times 0{,}5^n$.\na) Quelle fonction prolonge cette suite ?\nb) Calculer $f(1{,}5)$ au centième. Où se trouve ce point par rapport aux points de la suite ?\nc) Cette fonction est-elle croissante ou décroissante ?",
          correction:
            "a) $f(x) = 3 \\times 0{,}5^x$, pour $x \\geq 0$ : elle prend les mêmes valeurs que la suite aux entiers.\nb) $f(1{,}5) = 3 \\times 0{,}5^{1{,}5} \\approx 1{,}06$ : le point $(1{,}5 ; 1{,}06)$ est sur la courbe, entre les points de rangs $1$ et $2$.\nc) $0 < 0{,}5 < 1$ et $3 > 0$ : $f$ est décroissante, comme la suite.\nSur le dessin, les points rouges sont ceux de la suite, et la courbe les relie.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 4], [{ pts: [[0, 3], [0.5, 2.12], [1, 1.5], [1.5, 1.06], [2, 0.75], [2.5, 0.53], [3, 0.38], [3.5, 0.27], [4, 0.19]] }], [
              { x: 0, y: 3 },
              { x: 1, y: 1.5 },
              { x: 1.5, y: 1.06 },
              { x: 2, y: 0.75 },
              { x: 3, y: 0.375 },
              { x: 4, y: 0.1875 },
            ]),
          ),
          micros: ["expo_fct_prolonger_suite", "expo_fct_variations"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Lire sur la courbe, puis vérifier par le calcul, et conclure par une phrase.",
      rappel: [
        "Lire $f(a)$ : on part de $a$ sur l'axe horizontal, on monte jusqu'à la courbe, on lit l'ordonnée.",
        "Résoudre $f(x) = k$ : on part de $k$ sur l'axe vertical, on va jusqu'à la courbe, on lit l'abscisse. C'est une valeur approchée.",
        "Base plus grande que $1$ : la courbe monte de plus en plus vite. Base entre $0$ et $1$ : elle descend de moins en moins vite, sans toucher l'axe.",
      ],
      exercices: [
        {
          titre: "La valeur d'une voiture",
          enonce:
            "Une voiture neuve vaut $12\\,000$ €. Sa valeur, en milliers d'euros, au bout de $x$ années, est $V(x) = 12 \\times 0{,}8^x$ (modèle), représentée ci-dessous.\na) Quel est le sens de variation de $V$ ? Justifier avec la base.\nb) Lire $V(2)$, puis le calculer.\nc) Au bout de combien de temps la voiture a-t-elle perdu la moitié de sa valeur ? Lire une valeur approchée.\nd) Vaudra-t-elle un jour $0$ € selon ce modèle ?",
          figure: repere([-1, 6, -1, 13], [{ pts: [[0, 12], [0.5, 10.73], [1, 9.6], [1.5, 8.59], [2, 7.68], [2.5, 6.87], [3, 6.14], [3.5, 5.5], [4, 4.92], [4.5, 4.4], [5, 3.93]] }], [], undefined, true),
          correction:
            "a) $0 < 0{,}8 < 1$ : $V$ est décroissante. La voiture perd de la valeur chaque année.\nb) On lit environ $7{,}7$. Le calcul : $V(2) = 12 \\times 0{,}64 = 7{,}68$, soit $7\\,680$ €.\nc) La moitié, c'est $6$ milliers d'euros. On part de $6$ sur l'axe vertical : la courbe atteint cette hauteur pour $x$ un peu plus grand que $3$. Environ $3$ ans et un mois.\n✔️ $V(3) = 12 \\times 0{,}512 \\approx 6{,}14$ : encore un peu au-dessus de $6$.\nd) Non : $0{,}8^x$ reste strictement positif. La valeur s'approche de $0$ sans l'atteindre.\n⚠️ Elle ne perd pas $20$ % de $12\\,000$ €, soit $2\\,400$ €, chaque année : elle perd $20$ % de sa valeur DU MOMENT.",
          schema: ecranSeulement(
            repere([-1, 6, -1, 13], [{ pts: [[0, 12], [0.5, 10.73], [1, 9.6], [1.5, 8.59], [2, 7.68], [2.5, 6.87], [3, 6.14], [3.5, 5.5], [4, 4.92], [4.5, 4.4], [5, 3.93]] }], [
              { x: 3.11, y: 6 },
            ], 6, true),
          ),
          micros: ["expo_fct_graphique", "expo_fct_variations"],
        },
        {
          titre: "Le cœur après un sprint",
          enonce:
            "Après un sprint, on mesure l'écart entre la fréquence cardiaque d'une sportive et sa fréquence au repos. Cet écart, en dizaines de battements par minute, vaut $E(x) = 8 \\times 0{,}7^x$ au bout de $x$ minutes (modèle).\na) L'écart augmente-t-il ou diminue-t-il ? Justifier avec la base.\nb) Lire $E(1)$ et $E(3)$, puis les calculer.\nc) Au bout de combien de minutes l'écart passe-t-il sous $20$ battements par minute ?",
          figure: repere([-1, 6, -1, 9], [{ pts: [[0, 8], [0.5, 6.69], [1, 5.6], [1.5, 4.69], [2, 3.92], [2.5, 3.28], [3, 2.74], [3.5, 2.3], [4, 1.92], [4.5, 1.61], [5, 1.34]] }]),
          correction:
            "a) $0 < 0{,}7 < 1$ : $E$ est décroissante. Le cœur ralentit, et revient vers son rythme de repos.\nb) $E(1) = 8 \\times 0{,}7 = 5{,}6$ dizaines, soit $56$ battements par minute d'écart.\n$E(3) = 8 \\times 0{,}343 \\approx 2{,}74$ dizaines, soit environ $27$ battements.\nc) $20$ battements, c'est $2$ dizaines. La courbe passe sous la hauteur $2$ un peu avant $x = 4$ : $E(4) \\approx 1{,}92$. Réponse : un peu moins de $4$ minutes.\n⭐ Plus l'écart est petit, plus il diminue lentement : la courbe s'aplatit.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
        {
          titre: "Les recensements d'une ville",
          enonce:
            "Une ville est recensée tous les dix ans. On modélise sa population, en dizaines de milliers d'habitants, par $P(x) = 5 \\times 1{,}2^x$, où $x$ compte les DÉCENNIES depuis 1900. Les points rouges sont les recensements ; la courbe bleue, la fonction $P$.\na) Donner les populations recensées en 1900, 1910 et 1920. Quelle suite forment-elles ?\nb) Quelle population le modèle donne-t-il en 1925 ?\nc) À quoi sert la fonction, puisque les recensements n'ont lieu que tous les dix ans ?",
          figure: repere([-1, 5, -1, 12], [{ pts: [[0, 5], [0.5, 5.48], [1, 6], [1.5, 6.57], [2, 7.2], [2.5, 7.89], [3, 8.64], [3.5, 9.46], [4, 10.37]] }], [
            { x: 0, y: 5 },
            { x: 1, y: 6 },
            { x: 2, y: 7.2 },
            { x: 3, y: 8.64 },
            { x: 4, y: 10.37 },
          ], undefined, true),
          correction:
            "a) $P(0) = 5$, $P(1) = 6$, $P(2) = 7{,}2$ : $50\\,000$, $60\\,000$ et $72\\,000$ habitants. Une suite géométrique de raison $1{,}2$ : on multiplie par $1{,}2$ à chaque décennie.\nb) 1925, c'est $x = 2{,}5$ décennies. $P(2{,}5) = 5 \\times 1{,}2^{2{,}5} \\approx 7{,}89$ dizaines de milliers, soit environ $79\\,000$ habitants.\nc) La fonction PROLONGE la suite : sa courbe passe par tous les points des recensements, et donne une estimation entre deux recensements.\n⚠️ 1925 n'est pas $x = 25$ : ici, $x$ compte les décennies, pas les années.",
          micros: ["expo_fct_prolonger_suite", "expo_fct_graphique"],
        },
        {
          titre: "La sortie longue",
          enonce:
            "Une coureuse augmente la distance de sa sortie longue de $10$ % par semaine (modèle). La courbe donne $D(x) = 6 \\times 1{,}1^x$, la distance en km, $x$ semaines après le début de sa préparation.\na) Quel est le sens de variation de $D$ ?\nb) Lire à partir de quelle semaine sa sortie dépasse $9$ km. Le vérifier par le calcul.\nc) Son entraîneur veut qu'elle ne dépasse pas $10$ km avant la semaine $6$. Le plan est-il respecté ?",
          figure: repere([-1, 7, -1, 12], [{ pts: [[0, 6], [1, 6.6], [2, 7.26], [3, 7.99], [4, 8.78], [5, 9.66], [6, 10.63]] }], [], undefined, true),
          correction:
            "a) $1{,}1 > 1$ : $D$ est croissante.\nb) On part de $9$ sur l'axe vertical : la courbe atteint cette hauteur entre $x = 4$ et $x = 5$. Les sorties ont lieu aux semaines entières : c'est à partir de la semaine $5$.\nCalcul : $D(4) = 6 \\times 1{,}1^4 \\approx 8{,}78$ et $D(5) \\approx 9{,}66$. ✔️\nc) $D(5) \\approx 9{,}66$, sous $10$, et $D(6) \\approx 10{,}63$, au-dessus : elle dépasse $10$ km à la semaine $6$, pas avant. Le plan est respecté.\n⭐ Chaque semaine, elle ajoute un peu plus que la précédente : $+0{,}6$ km, puis $+0{,}66$ km…",
          micros: ["expo_fct_graphique", "expo_fct_variations"],
        },
        {
          titre: "Deux scénarios pour le climat",
          enonce:
            "Deux scénarios de baisse des émissions de CO₂ d'une région, en indice (base $10$ en 2025) : scénario $A$, $-5$ % par an, $f(x) = 10 \\times 0{,}95^x$ (en bleu) ; scénario $B$, $-10$ % par an, $g(x) = 10 \\times 0{,}9^x$ (en orange). $x$ compte les années depuis 2025.\na) Justifier que les deux fonctions sont décroissantes. Laquelle décroît le plus vite ?\nb) Lire en quelle année le scénario $B$ divise les émissions par deux. La ligne en pointillés marque la moitié.\nc) Le scénario $A$ y parvient-il en 2035 ?",
          figure: repere([-1, 11, -1, 11], [
            { pts: [[0, 10], [1, 9.5], [2, 9.03], [3, 8.57], [4, 8.15], [5, 7.74], [6, 7.35], [7, 6.98], [8, 6.63], [9, 6.3], [10, 5.99]] },
            { pts: [[0, 10], [1, 9], [2, 8.1], [3, 7.29], [4, 6.56], [5, 5.9], [6, 5.31], [7, 4.78], [8, 4.3], [9, 3.87], [10, 3.49]], couleur: ORANGE },
          ], [], 5, true),
          correction:
            "a) $0{,}95$ et $0{,}9$ sont entre $0$ et $1$ : les deux fonctions sont décroissantes. La base la plus petite, $0{,}9$, fait baisser le plus vite : la courbe orange passe en dessous.\nb) La courbe orange passe sous la hauteur $5$ entre $x = 6$ et $x = 7$ : $g(6) \\approx 5{,}31$ et $g(7) \\approx 4{,}78$. C'est en 2032, pour $x = 7$.\nc) En 2035, $x = 10$ : $f(10) = 10 \\times 0{,}95^{10} \\approx 5{,}99$. Encore au-dessus de $5$ : non.\n⚠️ Dix baisses de $5$ % ne font pas $-50$ % : il reste environ $60$ % des émissions.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
        {
          titre: "Une tache de moisissure",
          enonce:
            "On mesure la surface d'une tache de moisissure, en cm², sur une tranche de pain. On la modélise par $f(x) = a^x$, où $x$ est le temps en jours et $a > 0$. La courbe passe par le point $A$.\na) Lire $f(0)$ et $f(1)$. En déduire $a$.\nb) La fonction est-elle croissante ? Calculer $f(2)$ et $f(3)$, et les comparer à la courbe.\nc) Selon ce modèle, quelle surface au bout de $6$ jours ? Est-ce réaliste sur des semaines ?",
          figure: repere([-1, 4, -1, 5], [{ pts: [[0, 1], [0.5, 1.22], [1, 1.5], [1.5, 1.84], [2, 2.25], [2.5, 2.76], [3, 3.38]] }], [
            { x: 1, y: 1.5, label: "A" },
          ]),
          correction:
            "a) $f(0) = 1$ : normal, puisque $a^0 = 1$. Au point $A$, $f(1) = 1{,}5$. Or $f(1) = a^1 = a$ : donc $a = 1{,}5$.\nb) $1{,}5 > 1$ : $f$ est croissante. $f(2) = 1{,}5^2 = 2{,}25$ et $f(3) = 1{,}5^3 = 3{,}375$ : ce sont bien les hauteurs de la courbe en $2$ et en $3$.\nc) $f(6) = 1{,}5^6 \\approx 11{,}4$ cm². Possible sur quelques jours ; sur des semaines, la tache deviendrait plus grande que le pain : le modèle ne vaut qu'un temps.\n⭐ Sur la courbe de $x \\mapsto a^x$, le point d'abscisse $1$ donne directement la base : $f(1) = a$.",
          micros: ["expo_fct_graphique", "expo_fct_variations"],
        },
        {
          titre: "La lumière entre deux profondeurs",
          enonce:
            "Sous l'eau d'un lac, l'intensité lumineuse (en % de celle de la surface) est donnée, mètre par mètre, par la suite $u_n = 100 \\times 0{,}8^n$ (modèle).\na) Quelle fonction $f$ prolonge cette suite à toutes les profondeurs $x \\geq 0$ ?\nb) Calculer l'intensité à $2{,}5$ m de profondeur, au dixième.\nc) Quel est le sens de variation de $f$ ? Sans calcul, entre quelles valeurs se trouve l'intensité entre $2$ m et $3$ m ?",
          correction:
            "a) $f(x) = 100 \\times 0{,}8^x$ : aux entiers, $f(n) = u_n$.\nb) $f(2{,}5) = 100 \\times 0{,}8^{2{,}5} \\approx 57{,}2$ %.\nc) $0 < 0{,}8 < 1$ : $f$ est décroissante. Entre $2$ m et $3$ m, l'intensité est donc comprise entre $u_3 = 51{,}2$ % et $u_2 = 64$ %.\n✔️ $57{,}2$ est bien entre les deux.\n⚠️ À $2{,}5$ m, l'intensité n'est pas la moyenne de $64$ et $51{,}2$, soit $57{,}6$ : la courbe n'est pas une droite.\nSur le dessin, l'intensité est en dizaines de %.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 11], [{ pts: [[0, 10], [0.5, 8.94], [1, 8], [1.5, 7.16], [2, 6.4], [2.5, 5.72], [3, 5.12], [3.5, 4.58], [4, 4.1]] }], [
              { x: 0, y: 10 },
              { x: 1, y: 8 },
              { x: 2, y: 6.4 },
              { x: 2.5, y: 5.72 },
              { x: 3, y: 5.12 },
              { x: 4, y: 4.096 },
            ], undefined, true),
          ),
          micros: ["expo_fct_prolonger_suite", "expo_fct_variations"],
        },
        {
          titre: "Un placement sur dix ans",
          enonce:
            "Un capital de $5\\,000$ € est placé à $4$ % par an. Au bout de $x$ années, il vaut $C(x) = 5\\,000 \\times 1{,}04^x$ euros. Voici son tableau de variations sur $[0 ; 10]$.\na) Quel est le sens de variation de $C$ ? Le justifier avec la base.\nb) Quel est le capital minimal sur $[0 ; 10]$ ? le maximal ?\nc) Le capital dépasse-t-il $6\\,000$ € avant $10$ ans ? Justifier, puis trouver l'année à la calculatrice.",
          figure: tableauVariations([0, 10], ["5 000", "7 401,22"], "C"),
          correction:
            "a) $1{,}04 > 1$ : $C$ est croissante. La flèche monte.\nb) Le minimum est au départ : $C(0) = 5\\,000$ €. Le maximum est à la fin : $C(10) \\approx 7\\,401{,}22$ €.\nc) $C$ est croissante et passe de $5\\,000$ à environ $7\\,401$ : elle franchit $6\\,000$ en chemin.\nÀ la calculatrice : $C(4) \\approx 5\\,849{,}29$ et $C(5) \\approx 6\\,083{,}26$. Le capital dépasse $6\\,000$ € au bout de $5$ ans.\n⭐ Le tableau ne donne pas les valeurs intermédiaires, mais il garantit que la fonction passe par toutes les valeurs entre ses bornes.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Calculatrice autorisée.",
      rappel: [
        "On lit, puis on vérifie par le calcul : une lecture donne une valeur approchée.",
        "Le sens de variation se déduit de la base : $a > 1$, croissante ; $0 < a < 1$, décroissante.",
        "Une suite géométrique ne donne que les valeurs aux entiers ; la fonction qui la prolonge donne aussi toutes les valeurs entre eux.",
      ],
      exercices: [
        {
          titre: "L'air en montagne",
          enonce:
            "La pression de l'air diminue avec l'altitude. Dans un modèle simple, elle vaut $P(x) = 1\\,013 \\times 0{,}88^x$ hectopascals (hPa) à $x$ km d'altitude. La courbe la donne en centaines de hPa.\na) Que vaut $P(0)$ ? Quel est le sens de variation de $P$ ? Pourquoi ?\nb) Le sommet du mont Blanc est à environ $4{,}8$ km d'altitude. Lire, puis calculer, la pression à ce sommet (à l'unité).\nc) À quelle altitude la pression est-elle la moitié de celle du niveau de la mer ? Lire une valeur approchée.\nd) Le sommet de l'Everest est à environ $8{,}8$ km. Quelle fraction de la pression du niveau de la mer y reste-t-il ?",
          figure: repere([-1, 10, -1, 11], [{ pts: [[0, 10.13], [1, 8.91], [2, 7.84], [3, 6.9], [4, 6.07], [5, 5.35], [6, 4.7], [7, 4.14], [8, 3.64], [9, 3.21]] }], [], undefined, true),
          correction:
            "a) $P(0) = 1\\,013$ hPa : la pression au niveau de la mer. $0 < 0{,}88 < 1$ : $P$ est décroissante. La pression baisse quand on monte.\nb) En $x = 4{,}8$, on lit un peu plus de $5$ centaines. Calcul : $P(4{,}8) = 1\\,013 \\times 0{,}88^{4{,}8} \\approx 548$ hPa.\nc) La moitié, c'est $506{,}5$ hPa, soit environ $5{,}1$ centaines. La courbe atteint cette hauteur pour $x \\approx 5{,}4$ : vers $5{,}4$ km d'altitude.\n✔️ $P(5{,}4) \\approx 508$ hPa, tout près de la moitié.\nd) $0{,}88^{8{,}8} \\approx 0{,}325$ : il reste environ un tiers de la pression du niveau de la mer.\n⭐ C'est pourquoi on respire mal en haute montagne : chaque inspiration apporte moins d'air.\n⚠️ La pression ne baisse pas de $12$ % de $1\\,013$ hPa à chaque kilomètre : elle baisse de $12$ % de sa valeur à l'altitude où l'on est.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
        {
          titre: "Deux villes, deux rythmes",
          enonce:
            "Avec l'exode rural, deux villes grandissent. La ville $A$ compte $30\\,000$ habitants en 1950 et gagne $3$ % par an ; la ville $B$ en compte $20\\,000$ et gagne $5$ % par an (modèles). Le graphique donne leurs populations en dizaines de milliers ; l'abscisse compte les DÉCENNIES depuis 1950 ($A$ en bleu, $B$ en orange).\na) Exprimer les deux populations, en dizaines de milliers, en fonction du nombre $t$ d'années depuis 1950. Donner leur sens de variation.\nb) Lire vers quelle année $B$ dépasse $A$.\nc) Vérifier par le calcul pour 1970, puis pour 1975.\nd) La ville $B$ était plus petite au départ. Pourquoi finit-elle devant ?",
          figure: repere([-1, 4, -1, 10], [
            { pts: [[0, 3], [0.5, 3.48], [1, 4.03], [1.5, 4.67], [2, 5.42], [2.5, 6.28], [3, 7.28]] },
            { pts: [[0, 2], [0.5, 2.55], [1, 3.26], [1.5, 4.16], [2, 5.31], [2.5, 6.77], [3, 8.64]], couleur: ORANGE },
          ], [], undefined, true),
          correction:
            "a) $A(t) = 3 \\times 1{,}03^t$ et $B(t) = 2 \\times 1{,}05^t$. Les bases $1{,}03$ et $1{,}05$ sont plus grandes que $1$ : les deux fonctions sont croissantes.\nb) Les courbes se croisent un peu après l'abscisse $2$, soit un peu plus de $20$ ans après 1950 : vers 1971.\nc) En 1970, $t = 20$ : $A(20) \\approx 5{,}42$ et $B(20) \\approx 5{,}31$ : $A$ est encore devant.\nEn 1975, $t = 25$ : $A(25) \\approx 6{,}28$ et $B(25) \\approx 6{,}77$ : $B$ est passée devant.\nd) $B$ a la plus grande base : sa courbe monte plus vite, et finit par rattraper $A$, quel que soit l'écart de départ.\n⭐ À long terme, c'est le TAUX qui décide, pas la taille de départ.\n⚠️ Sur le graphique, l'abscisse $2$ veut dire $20$ ans, pas $2$ ans.",
          micros: ["expo_fct_variations", "expo_fct_graphique"],
        },
        {
          titre: "Un vélo électrique d'occasion",
          enonce:
            "Un vélo électrique neuf coûte $1\\,000$ €. On estime qu'il perd $30$ % de sa valeur par an (modèle). Sa valeur au bout de $n$ années entières est $v_n = 1\\,000 \\times 0{,}7^n$ ; la courbe représente, en centaines d'euros, la fonction $V(x) = 1\\,000 \\times 0{,}7^x$.\na) Quelle différence y a-t-il entre $v_n$ et $V(x)$ ? Comparer $v_2$ et $V(2)$.\nb) Quel est le sens de variation de $V$ ?\nc) Lire au bout de combien de temps le vélo a perdu la moitié de sa valeur. Le vérifier avec $V(1{,}5)$ et $V(2)$.\nd) Un acheteur en propose $600$ € au bout de $18$ mois. Est-ce plus ou moins que la valeur du modèle ?",
          figure: repere([-1, 6, -1, 11], [{ pts: [[0, 10], [0.5, 8.37], [1, 7], [1.5, 5.86], [2, 4.9], [2.5, 4.1], [3, 3.43], [3.5, 2.87], [4, 2.4], [4.5, 2.01], [5, 1.68]] }], [], undefined, true),
          correction:
            "a) La suite ne donne la valeur qu'au bout d'années ENTIÈRES ; la fonction la donne à tout moment : elle prolonge la suite. $v_2 = V(2) = 1\\,000 \\times 0{,}49 = 490$ €.\nb) $0 < 0{,}7 < 1$ : $V$ est décroissante.\nc) La moitié, c'est $5$ centaines. La courbe passe sous $5$ un peu avant $x = 2$ : un peu moins de deux ans.\n✔️ $V(1{,}5) \\approx 585{,}66$ €, au-dessus de $500$ ; $V(2) = 490$ €, en dessous.\nd) $18$ mois, c'est $x = 1{,}5$ : le modèle donne environ $586$ €. Les $600$ € proposés sont un peu PLUS que la valeur du modèle : bonne affaire pour le vendeur.\n⚠️ $18$ mois ne s'écrit pas $x = 18$ : $x$ compte les années.",
          micros: ["expo_fct_prolonger_suite", "expo_fct_variations", "expo_fct_graphique"],
        },
        {
          titre: "Des truites et des quotas",
          enonce:
            "Dans un lac, on compte $8\\,000$ truites. Deux scénarios (modèles) : avec des quotas de pêche, la population augmente de $10$ % par an (courbe bleue) ; sans quotas, elle baisse de $15$ % par an (courbe orange). Les populations sont en milliers, et $x$ compte les années.\na) Écrire les deux fonctions. Associer chacune à sa courbe, en justifiant par la base.\nb) Lire l'écart entre les deux scénarios au bout de $3$ ans, puis le calculer.\nc) Sans quotas, au bout de combien de temps la population passe-t-elle sous $4\\,000$ truites ?\nd) Si l'on compte les truites une fois par an, quelles suites obtient-on ? Quel lien avec les fonctions ?",
          figure: repere([-1, 6, -1, 14], [
            { pts: [[0, 8], [1, 8.8], [2, 9.68], [3, 10.65], [4, 11.71], [5, 12.88]] },
            { pts: [[0, 8], [1, 6.8], [2, 5.78], [3, 4.91], [4, 4.18], [5, 3.55]], couleur: ORANGE },
          ], [], undefined, true),
          correction:
            "a) Avec quotas : $f(x) = 8 \\times 1{,}1^x$. Base $1{,}1 > 1$, fonction croissante : c'est la courbe bleue, qui monte.\nSans quotas : $g(x) = 8 \\times 0{,}85^x$. Base $0{,}85 < 1$, fonction décroissante : c'est la courbe orange.\nb) En $x = 3$, on lit environ $10{,}6$ et environ $4{,}9$. Calcul : $f(3) = 8 \\times 1{,}331 \\approx 10{,}65$ et $g(3) = 8 \\times 0{,}614125 \\approx 4{,}91$. L'écart est d'environ $5{,}7$ milliers de truites.\nc) $4\\,000$ truites, c'est $4$ milliers. La courbe orange passe sous $4$ un peu après $x = 4$ : $g(4) \\approx 4{,}18$ et $g(5) \\approx 3{,}55$. Un peu plus de $4$ ans.\nd) Les suites $u_n = 8 \\times 1{,}1^n$ et $v_n = 8 \\times 0{,}85^n$ : des suites géométriques. Les fonctions les PROLONGENT entre deux comptages.\n⭐ Même départ, deux destins : c'est la base, au-dessus ou en dessous de $1$, qui décide.",
          micros: ["expo_fct_variations", "expo_fct_graphique", "expo_fct_prolonger_suite"],
        },
      ],
    },
  ],
};
