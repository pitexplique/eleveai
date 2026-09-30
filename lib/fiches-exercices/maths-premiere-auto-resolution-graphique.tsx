// ─── Fiche d'exercices : résolution graphique (1re, automatismes) ─────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (28/09/2026), sur le modèle de l'étalon
// `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve anticipée,
// SANS CALCULATRICE : toutes les intersections tombent sur la grille ou au
// milieu d'un carreau. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/lecture-graphique.bank.ts` :
// « l'ensemble des solutions de f(x) ≥ 3 lu sur la courbe » (Centres
// étrangers, juin 2026).
//
// ⭐⭐ LE FIL : UNE HORIZONTALE, ET DES ABSCISSES. Résoudre f(x) = k ou f(x) < k,
// c'est tracer y = k et lire les ABSCISSES — des heures, des années, des
// tonnes —, pas des ordonnées. Les ensembles de solutions ne sont pas toujours
// des intervalles : trois solutions (11), des points isolés (8, 19, 20), une
// réunion (2, 15, 16), rien du tout (1, 8). Le signe se lit par rapport à
// l'AXE, les variations par rapport au SENS de la courbe (3, 13, 18).
//
// ⭐ Frédéric, 28/09 : courbe à LIRE dans l'énoncé, lecture MARQUÉE dans le
// corrigé (horizontale y = k, points d'intersection, tableaux dessinés). Liens à
// l'ÉCONOMIE et à l'HISTOIRE-GÉO : bénéfice, chiffre d'affaires, balance
// commerciale, placements, chômage ; station de ski, ville industrielle, marée,
// qualité de l'air, bassin minier. Les chiffres sont des MODÈLES arrondis.
// Les exercices 2, 6, 7 et 8 reprennent les courbes des exercices 1 et 4 :
// moins de dessins, et le PDF tient.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-resolution-graphique.mjs`.
//
// Micro-compétences : auto_fct_resoudre_graphiquement (1, 2, 8, 9, 10, 11, 15,
// 16, 17, 18, 19, 20), auto_fct_signe_graphique (3, 6, 9, 10, 13, 18),
// auto_fct_variations_graphique (4, 7, 11, 14, 16, 17, 18, 19, 20),
// auto_fct_lire_croissance (5, 12, 14, 17, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier : le PDF doit tenir
 *  en 12 pages. Les courbes qu'on LIT et les tableaux restent imprimés. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoResolutionGraphiquePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-resolution-graphique",
  titre: "Résolution graphique",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : résoudre f(x) = k et f(x) < k sur une courbe, lire le signe d'une fonction, dresser son tableau de variations, dire si une croissance accélère ou ralentit. Un rappel de cours de trois lignes avant chaque niveau, et une correction qui marque la lecture sur le dessin.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une lecture par question. Sans calculatrice.",
      rappel: [
        "Résoudre $f(x) = k$ : on trace l'horizontale d'ordonnée $k$ ; les solutions sont les ABSCISSES des points d'intersection.",
        "$f(x) > k$ : les abscisses des points de la courbe AU-DESSUS de cette horizontale ; $f(x) < k$ : EN DESSOUS.",
        "$f$ est positive là où sa courbe est au-dessus de l'axe des abscisses, négative là où elle est en dessous.",
        "$f$ est croissante là où sa courbe monte, de gauche à droite ; le tableau de variations résume les montées et les descentes.",
      ],
      exercices: [
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-3 ; 5]$. Résoudre graphiquement : $f(x) = 0$ ; $f(x) = -3$ ; $f(x) = -5$.",
          figure: repere([-3, 5, -5, 7], [{ q: [1, -2, -3] }], [], undefined, true),
          correction:
            "On trace l'horizontale d'ordonnée $k$, et on lit les abscisses des points d'intersection.\n$f(x) = 0$ : la courbe coupe l'axe des abscisses en $-1$ et en $3$. $S = \\{-1 ; 3\\}$.\n$f(x) = -3$ : $S = \\{0 ; 2\\}$.\n$f(x) = -5$ : l'horizontale passe sous le point le plus bas, d'ordonnée $-4$. Aucune solution : $S = \\varnothing$.\n⚠️ Les solutions sont des ABSCISSES : répondre « $-3$ », c'est recopier la question.\nSur le dessin, les deux points rouges de l'axe des abscisses sont en $-1$ et en $3$.",
          schema: ecranSeulement(repere([-3, 5, -5, 7], [{ q: [1, -2, -3] }], [
            // Étiquettes vidées (30/09/2026) : le « −1 » se posait sur la
            // graduation « 1 » de l'axe vertical. L'axe des abscisses les porte déjà.
            { x: -1, y: 0, label: "" },
            { x: 3, y: 0, label: "" },
            { x: 0, y: -3, label: "0" },
            { x: 2, y: -3, label: "2" },
          ], -3, true)),
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce: "On reprend la courbe de l'exercice 1. Sur $[-3 ; 5]$, résoudre graphiquement : $f(x) < 0$ ; $f(x) \\geqslant 5$.",
          correction:
            "$f(x) < 0$ : la courbe est SOUS l'axe des abscisses entre $-1$ et $3$. $S = ]-1 ; 3[$, crochets ouverts car l'inégalité est stricte.\n$f(x) \\geqslant 5$ : la courbe est au-dessus de l'horizontale d'ordonnée $5$ pour $x \\leqslant -2$ et pour $x \\geqslant 4$. Sur $[-3 ; 5]$ : $S = [-3 ; -2] \\cup [4 ; 5]$.\n⚠️ En $-1$ et en $3$, $f(x) = 0$ : ce n'est pas « $< 0$ », d'où les crochets ouverts.",
          schema: ecranSeulement(repere([-3, 5, -5, 7], [{ q: [1, -2, -3] }], [
            { x: -2, y: 5, label: "−2" },
            { x: 4, y: 5, label: "4" },
          ], 5, true)),
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$ définie sur $[-4 ; 5]$. Dresser le tableau de signes de $f$.",
          figure: repere([-4, 5, -4, 6], [{ q: [0.5, -0.5, -3] }]),
          correction:
            "On repère où la courbe coupe l'axe des abscisses : en $-2$ et en $3$.\nAvant $-2$, la courbe est au-dessus de l'axe : $f(x) > 0$.\nEntre $-2$ et $3$, elle est en dessous : $f(x) < 0$.\nAprès $3$, elle est de nouveau au-dessus : $f(x) > 0$.\n⚠️ Le signe de $f(x)$ se lit par rapport à l'axe HORIZONTAL, pas selon que la courbe monte ou descend.",
          schema: ecranSeulement(tableauSignes(["−4", "−2", "3", "5"], [["$f(x)$", ["+", "-", "+"], ["0", "0"]]])),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. Dresser son tableau de variations sur $[-2 ; 2]$.",
          figure: repere([-3, 3, -4, 4], [{ p: [1, 0, -3, 0] }]),
          correction:
            "On parcourt la courbe de gauche à droite.\nDe $x = -2$ à $x = -1$, elle MONTE de $-2$ à $2$.\nDe $-1$ à $1$, elle DESCEND de $2$ à $-2$.\nDe $1$ à $2$, elle remonte de $-2$ à $2$.\n⭐ La première ligne du tableau porte les abscisses où la courbe change de sens ; la seconde, les ordonnées de ces points.\n⚠️ Une flèche qui monte veut dire « croissante » : on n'y écrit pas de signe.",
          schema: tableauVariations(["−2", "−1", "1", "2"], ["−2", "2", "−2", "2"]),
          micros: ["auto_fct_variations_graphique"],
        },
        {
          enonce: "Deux grandeurs augmentent : la bleue (une droite) et l'orange.\na) De combien augmente chacune entre $x = 0$ et $x = 2$, puis entre $x = 4$ et $x = 6$ ?\nb) Laquelle augmente à vitesse constante ? Laquelle accélère ?",
          figure: repere([-1, 7, -1, 11], [{ q: [0, 1, 1] }, { q: [0.25, 0, 1], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) Bleue : de $1$ à $3$, puis de $5$ à $7$ : $+2$ à chaque fois.\nOrange : de $1$ à $2$ ($+1$), puis de $5$ à $10$ ($+5$).\nb) La bleue augmente à vitesse constante : c'est une droite, une croissance linéaire.\nL'orange augmente de plus en plus vite : la courbe se redresse, la croissance accélère.\n⚠️ « Croissante » ne dit pas COMMENT on monte : les deux sont croissantes, mais pas de la même façon.",
          schema: ecranSeulement(repere([-1, 7, -1, 11], [{ q: [0, 1, 1] }, { q: [0.25, 0, 1], couleur: ORANGE }], [
            { x: 0, y: 1, label: "" },
            { x: 2, y: 3, label: "" },
            { x: 2, y: 2, label: "" },
            { x: 4, y: 5, label: "" },
            { x: 6, y: 7, label: "" },
            { x: 6, y: 10, label: "" },
          ], undefined, true)),
          micros: ["auto_fct_lire_croissance"],
        },
        {
          enonce: "On reprend la courbe de l'exercice 1. Dresser le tableau de signes de $f$ sur $[-3 ; 5]$.",
          correction:
            "La courbe coupe l'axe des abscisses en $-1$ et en $3$ : ce sont les valeurs où $f(x) = 0$.\nAu-dessus de l'axe avant $-1$ : $+$. En dessous entre $-1$ et $3$ : $-$. Au-dessus après $3$ : $+$.\n⭐ C'est la même lecture que « $f(x) < 0$ » à l'exercice 2 : le tableau de signes range toutes ces réponses d'un coup.",
          schema: ecranSeulement(tableauSignes(["−3", "−1", "3", "5"], [["$f(x)$", ["+", "-", "+"], ["0", "0"]]])),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          enonce: "La courbe de l'exercice 1 est celle de $f(x) = x^2 - 2x - 3$. Dresser le tableau de variations de $f$ sur $[-3 ; 5]$, puis donner le minimum de $f$.",
          correction:
            "La courbe descend jusqu'à son point le plus bas, $(1 ; -4)$, puis remonte.\n$f(-3) = 9 + 6 - 3 = 12$ et $f(5) = 25 - 10 - 3 = 12$ : ces valeurs sortent du dessin, on les calcule.\n$f$ est décroissante sur $[-3 ; 1]$ et croissante sur $[1 ; 5]$. Son minimum est $-4$, atteint en $x = 1$.\n⚠️ Le minimum est $-4$, une ordonnée ; il est atteint EN $1$, une abscisse. Deux nombres, deux rôles.",
          schema: tableauVariations(["−3", "1", "5"], [12, -4, 12]),
          micros: ["auto_fct_variations_graphique"],
        },
        {
          enonce: "On reprend la courbe de l'exercice 4, sur $[-2 ; 2]$. Résoudre graphiquement : $f(x) = 2$ ; $f(x) \\leqslant -2$ ; $f(x) > 2$.",
          correction:
            "$f(x) = 2$ : l'horizontale d'ordonnée $2$ touche la courbe en $x = -1$ (la bosse) et en $x = 2$ (le bout). $S = \\{-1 ; 2\\}$.\n$f(x) \\leqslant -2$ : la courbe ne descend jamais sous $-2$ ; elle y est en $x = -2$ et en $x = 1$. $S = \\{-2 ; 1\\}$.\n$f(x) > 2$ : la courbe ne monte jamais au-dessus de $2$. $S = \\varnothing$.\n⚠️ Une inéquation peut avoir pour solutions quelques points isolés, ou rien du tout : ce n'est pas toujours un intervalle.",
          schema: ecranSeulement(repere([-3, 3, -4, 4], [{ p: [1, 0, -3, 0] }], [
            { x: -1, y: 2, label: "" },
            { x: 2, y: 2, label: "" },
            { x: -2, y: -2, label: "−2" },
            { x: 1, y: -2, label: "1" },
          ], [2, -2])),
          micros: ["auto_fct_resoudre_graphiquement"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la question, lire la courbe, répondre avec l'unité. Sans calculatrice.",
      rappel: [
        "« Dépasser $k$ », c'est $f(x) > k$ ; « rester sous $k$ », c'est $f(x) < k$.",
        "La réponse est un ensemble d'ABSCISSES (des heures, des années, des tonnes…), pas d'ordonnées.",
        "Une croissance qui accélère : la courbe se redresse. Qui ralentit : elle s'aplatit. Qui double à intervalles réguliers : elle s'envole.",
      ],
      exercices: [
        {
          titre: "Une journée d'hiver en montagne",
          enonce:
            "La courbe donne la température $T$, en °C, relevée dans une station de ski. Une unité horizontale vaut $3$ heures, à partir de minuit ($x = 0$).\na) Dresser le tableau de signes de $T$ sur $[0 ; 8]$.\nb) Pendant quelles heures gèle-t-il (température négative) ?\nc) Résoudre $T(x) \\geqslant 3$ et traduire en heures.",
          figure: repere([-1, 9, -5, 6], [{ pts: [[0, -3], [1, -4], [2, -3], [3, 0], [4, 3], [5, 4], [6, 2], [7, 0], [8, -2]] }], [], undefined, true),
          correction:
            "a) La courbe coupe l'axe des abscisses en $x = 3$ et en $x = 7$. Elle est en dessous avant $3$, au-dessus entre $3$ et $7$, en dessous après $7$.\nb) $T(x) < 0$ pour $x$ dans $[0 ; 3[$ et dans $]7 ; 8]$. En heures : de minuit à $9$ h, puis de $21$ h à minuit.\nc) L'horizontale d'ordonnée $3$ coupe la courbe en $x = 4$ et en $x = 5{,}5$, au milieu de $5$ et $6$. $S = [4 ; 5{,}5]$ : de $12$ h à $16$ h $30$.\n⚠️ On convertit : $x = 3$, ce n'est pas $3$ h, c'est $3 \\times 3 = 9$ h.",
          schema: tableauSignes(["0", "3", "7", "8"], [["$T(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["auto_fct_signe_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "Le bénéfice d'un atelier",
          enonce:
            "Un atelier fabrique $x$ centaines d'objets, avec $0 \\leqslant x \\leqslant 6$. Son bénéfice $B(x)$, en milliers d'euros, est donné par la courbe.\na) Pour quelles productions l'atelier est-il bénéficiaire, c'est-à-dire $B(x) > 0$ ?\nb) Pour quelles productions le bénéfice atteint-il au moins $3\\,000$ € ?\nc) Donner le signe de $B$ sur $[0 ; 6]$.",
          figure: repere([-1, 7, -6, 6], [{ q: [-1, 6, -5] }], [], undefined, true),
          correction:
            "a) La courbe est au-dessus de l'axe entre $1$ et $5$ : $S = ]1 ; 5[$. Entre $100$ et $500$ objets, bornes exclues.\nb) $B(x) \\geqslant 3$ : la courbe est au-dessus de l'horizontale d'ordonnée $3$ entre $2$ et $4$. $S = [2 ; 4]$ : de $200$ à $400$ objets.\nc) $B$ est négatif sur $[0 ; 1[$, nul en $1$, positif sur $]1 ; 5[$, nul en $5$, négatif sur $]5 ; 6]$.\n⚠️ En $x = 1$ et en $x = 5$, le bénéfice est nul : l'atelier ne perd rien, mais ne gagne rien non plus. D'où les crochets ouverts en a).",
          schema: ecranSeulement(repere([-1, 7, -6, 6], [{ q: [-1, 6, -5] }], [
            { x: 1, y: 0, label: "1" },
            { x: 5, y: 0, label: "5" },
            { x: 2, y: 3, label: "2" },
            { x: 4, y: 3, label: "4" },
          ], 3, true)),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_signe_graphique"],
        },
        {
          titre: "Une ville industrielle",
          enonce:
            "La courbe donne la population d'une ville industrielle, en dizaines de milliers d'habitants. L'abscisse compte les décennies depuis 1900 (chiffres d'un modèle).\na) Dresser le tableau de variations de la population de 1900 à 2020.\nb) Quand la population est-elle la plus grande ? Combien d'habitants ?\nc) En quelles années la ville comptait-elle $50\\,000$ habitants ?",
          figure: repere([-1, 13, -1, 10], [{ pts: [[0, 2], [3, 5], [6, 8], [10, 4], [12, 5]] }], [], undefined, true),
          correction:
            "a) La courbe monte de 1900 à 1960, descend de 1960 à 2000, puis remonte jusqu'en 2020.\nb) Au sommet, en 1960 ($x = 6$) : $8$ dizaines de milliers, soit $80\\,000$ habitants.\nc) $50\\,000$ habitants, c'est $5$. L'horizontale d'ordonnée $5$ coupe la courbe trois fois : en $x = 3$, $x = 9$ et $x = 12$, soit en 1930, 1990 et 2020.\n⭐ Ce modèle raconte une ville qui grandit avec ses usines, décline quand elles ferment, puis repart un peu.\n⚠️ Une équation lue sur une courbe peut avoir trois solutions : on suit l'horizontale jusqu'au bout.",
          schema: tableauVariations(["1900", "1960", "2000", "2020"], ["20 000", "80 000", "40 000", "50 000"], "P", "année"),
          micros: ["auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "Deux jeunes entreprises",
          enonce:
            "La figure donne le chiffre d'affaires de deux jeunes entreprises, en millions d'euros, en fonction des années (chiffres d'un modèle) : $A$ en bleu, $B$ en orange.\na) De combien augmente le chiffre d'affaires de $A$ chaque année ? Et celui de $B$ ?\nb) Décrire la croissance de chacune.\nc) À partir de quelle année $B$ fait-il au moins autant que $A$ ?",
          figure: repere([-1, 4, -1, 11], [{ q: [0, 1, 2] }, { pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) $A$ : $2$, $3$, $4$, $5$ : $+1$ million par an. $B$ : $1$, $2$, $4$, $8$ : il DOUBLE chaque année.\nb) $A$ croît à vitesse constante : une droite. $B$ croît de plus en plus vite : chaque hausse est le double de la précédente ($+1$, $+2$, $+4$).\nc) En année $2$, les deux valent $4$ millions ; en année $3$, $B$ fait $8$ contre $5$. $B$ fait au moins autant que $A$ à partir de l'année $2$.\n⚠️ Au début, $B$ est derrière : une croissance qui double finit par dépasser une croissance constante, mais pas tout de suite.",
          schema: ecranSeulement(repere([-1, 4, -1, 11], [{ q: [0, 1, 2] }, { pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [
            { x: 2, y: 4, label: "année 2" },
            { x: 3, y: 8, label: "" },
          ], undefined, true)),
          micros: ["auto_fct_lire_croissance"],
        },
        {
          titre: "La balance commerciale",
          enonce:
            "La courbe donne le solde commercial d'un pays (exportations moins importations), en dizaines de milliards d'euros, sur sept ans (chiffres d'un modèle).\na) Dresser le tableau de signes du solde sur $[0 ; 6]$.\nb) Pendant quelles années le pays est-il en déficit (solde négatif) ?",
          figure: repere([-1, 7, -3, 4], [{ pts: [[0, 2], [1, 1], [2, 0], [3, -2], [4, -1], [5, 0], [6, 1]] }]),
          correction:
            "a) La courbe touche l'axe en $x = 2$ et en $x = 5$. Le solde est positif avant $2$, négatif entre $2$ et $5$, positif après $5$.\nb) Déficit pour $x$ dans $]2 ; 5[$ : entre l'année $2$ et l'année $5$, le pays importe plus qu'il n'exporte.\n⭐ Solde positif : un excédent, le pays vend plus qu'il n'achète. Solde négatif : un déficit.\n⚠️ En $x = 4$, le solde remonte, mais il reste négatif : monter n'est pas être positif.",
          schema: tableauSignes(["0", "2", "5", "6"], [["solde", ["+", "-", "+"], ["0", "0"]]]),
          micros: ["auto_fct_signe_graphique"],
        },
        {
          titre: "Les ventes d'un jeu vidéo",
          enonce:
            "La courbe donne le nombre total d'exemplaires vendus d'un jeu vidéo, en millions, en fonction du nombre d'années depuis sa sortie (chiffres d'un modèle).\na) Donner les variations du nombre total de ventes.\nb) Combien d'exemplaires sont vendus pendant chacune des quatre années ?\nc) La croissance accélère-t-elle ou ralentit-elle ?\nd) Quand atteint-on $7$ millions ?",
          figure: repere([-1, 5, -1, 12], [{ pts: [[0, 0], [1, 4], [2, 7], [3, 9], [4, 10]] }], [], undefined, true),
          correction:
            "a) Le total est croissant sur $[0 ; 4]$ : un total de ventes ne peut que monter.\nb) $4$, puis $3$, puis $2$, puis $1$ million : ce sont les hausses d'une année sur l'autre.\nc) Elle ralentit : chaque année, on vend moins que l'année d'avant. La courbe s'aplatit.\nd) Au bout de $2$ ans.\n⚠️ Un total qui augmente de moins en moins vite reste croissant : ralentir n'est pas baisser.",
          schema: ecranSeulement(
            diagramme("batons", [
              { label: "année 1", value: 4 },
              { label: "année 2", value: 3 },
              { label: "année 3", value: 2 },
              { label: "année 4", value: 1 },
            ]),
          ),
          micros: ["auto_fct_lire_croissance", "auto_fct_variations_graphique"],
        },
        {
          titre: "La qualité de l'air",
          enonce:
            "La courbe donne la concentration $C$ de particules fines dans l'air d'une grande ville, en dizaines de µg/m³, au cours d'une journée. Une unité horizontale vaut $3$ heures, depuis minuit (chiffres d'un modèle). L'horizontale marque le seuil d'information : $50$ µg/m³.\na) Résoudre graphiquement $C(x) > 5$.\nb) Traduire en heures de la journée.",
          figure: repere([-1, 9, -1, 9], [{ pts: [[0, 2], [1, 3], [2, 5], [3, 7], [4, 5], [5, 3], [6, 5], [7, 7], [8, 3]] }], [], 5),
          correction:
            "a) La courbe est strictement au-dessus de l'horizontale entre $2$ et $4$, puis entre $6$ et $7{,}5$ : de $7$ à $8$, elle descend de $7$ à $3$ et passe à $5$ au milieu. $S = ]2 ; 4[ \\cup ]6 ; 7{,}5[$.\nb) $x = 2$ : $6$ h ; $x = 4$ : $12$ h ; $x = 6$ : $18$ h ; $x = 7{,}5$ : $22$ h $30$. Le seuil est dépassé de $6$ h à $12$ h, puis de $18$ h à $22$ h $30$.\n⭐ Deux pics dans la journée, sans doute ceux des trajets du matin et du soir.\n⚠️ Une réunion de deux intervalles s'écrit avec $\\cup$ : « dans l'un, ou dans l'autre ».",
          schema: ecranSeulement(repere([-1, 9, -1, 9], [{ pts: [[0, 2], [1, 3], [2, 5], [3, 7], [4, 5], [5, 3], [6, 5], [7, 7], [8, 3]] }], [
            { x: 2, y: 5, label: "6 h" },
            { x: 4, y: 5, label: "12 h" },
            { x: 6, y: 5, label: "18 h" },
            { x: 7.5, y: 5, label: "22 h 30" },
          ], 5)),
          micros: ["auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "La marée",
          enonce:
            "La courbe donne la hauteur d'eau $h$ dans un port, en mètres, en fonction du temps $t$, en heures (modèle simplifié : une vraie marée suit une courbe arrondie).\na) Dresser le tableau de variations de $h$ sur $[0 ; 9]$.\nb) À quelles heures la mer est-elle haute ? basse ?\nc) Un bateau a besoin d'au moins $5$ m d'eau. Résoudre $h(t) \\geqslant 5$.",
          figure: repere([-1, 10, -1, 10], [{ pts: [[0, 2], [3, 8], [6, 2], [9, 8]] }], [], undefined, true),
          correction:
            "a) La hauteur monte de $2$ à $8$ entre $0$ et $3$ h, descend de $8$ à $2$ entre $3$ h et $6$ h, remonte de $2$ à $8$ entre $6$ h et $9$ h.\nb) Pleine mer à $3$ h et à $9$ h ($8$ m) ; basse mer à $6$ h ($2$ m).\nc) La courbe est à $5$ m au milieu de chaque montée ou descente : en $1{,}5$, $4{,}5$ et $7{,}5$. $S = [1{,}5 ; 4{,}5] \\cup [7{,}5 ; 9]$ : de $1$ h $30$ à $4$ h $30$, puis à partir de $7$ h $30$.\n⭐ Environ six heures entre une pleine mer et une basse mer : c'est le rythme des marées sur les côtes de la Manche et de l'Atlantique.\n⚠️ $1{,}5$ h, c'est $1$ h $30$ min, pas $1$ h $50$.",
          schema: tableauVariations(["0", "3", "6", "9"], [2, 8, 2, 8], "h", "t"),
          micros: ["auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On lit, on traduit, on répond avec l'unité : « de $6$ h à $12$ h », « entre $100$ et $500$ objets ».",
        "Inégalité stricte ($<$, $>$) : crochets ouverts. Inégalité large ($\\leqslant$, $\\geqslant$) : crochets fermés.",
        "Un tableau de variations se lit sur les changements de SENS ; un tableau de signes, sur les passages par l'AXE.",
      ],
      exercices: [
        {
          titre: "Deux placements",
          enonce:
            "Deux capitaux, en milliers d'euros, sont placés pendant trente ans ; l'abscisse compte les décennies (chiffres d'un modèle). Le capital $L$ (en bleu) gagne la même somme chaque décennie ; le capital $E$ (en orange) double à chaque décennie, et ses points sont reliés par des segments.\na) Décrire la croissance de chaque capital.\nb) Donner les variations de $L$ et de $E$ sur $[0 ; 3]$.\nc) Résoudre graphiquement $E(x) \\geqslant 4$.\nd) Au bout de dix ans, puis de trente ans, quel placement est le meilleur ?",
          figure: repere([-1, 4, -1, 10], [{ q: [0, 2, 1] }, { pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) $L$ : $+2$ milliers par décennie, une croissance à vitesse constante (une droite). $E$ : $\\times 2$ par décennie, une croissance qui accélère ($+1$, $+2$, $+4$).\nb) Les deux sont croissants sur $[0 ; 3]$.\nc) La courbe orange est au-dessus de l'horizontale d'ordonnée $4$ à partir de $x = 2$ : $S = [2 ; 3]$, de la vingtième à la trentième année.\nd) Au bout de dix ans : $L = 3$ milliers, $E = 2$ : $L$ est meilleur. Au bout de trente ans : $L = 7$, $E = 8$ : $E$ est meilleur.\n⭐ La croissance qui double finit par gagner : c'est la force des intérêts composés sur le long terme.\n⚠️ Sur une courte durée, le placement qui double n'est pas forcément le meilleur.",
          schema: ecranSeulement(repere([-1, 4, -1, 10], [{ q: [0, 2, 1] }, { pts: [[0, 1], [1, 2], [2, 4], [3, 8]], couleur: ORANGE }], [
            { x: 2, y: 4, label: "20 ans" },
            { x: 1, y: 3, label: "" },
            { x: 1, y: 2, label: "" },
            { x: 3, y: 8, label: "" },
          ], 4, true)),
          micros: ["auto_fct_lire_croissance", "auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "Le bénéfice d'une coopérative",
          enonce:
            "Une coopérative agricole produit $x$ tonnes de fromage par mois, avec $0 \\leqslant x \\leqslant 8$. Son bénéfice $B(x)$, en milliers d'euros, est donné par la courbe (chiffres d'un modèle).\na) Dresser le tableau de variations de $B$ sur $[0 ; 8]$.\nb) Dresser son tableau de signes.\nc) Résoudre $B(x) \\geqslant 1{,}5$ et interpréter.\nd) Quelle production conseiller ?",
          figure: repere([-1, 9, -7, 4], [{ q: [-0.5, 4, -6] }], [], undefined, true),
          correction:
            "a) La courbe monte de $-6$ (en $0$) à $2$ (en $4$), puis redescend à $-6$ (en $8$).\nb) Elle coupe l'axe en $2$ et en $6$ : $B$ est négatif sur $[0 ; 2[$, positif sur $]2 ; 6[$, négatif sur $]6 ; 8]$.\nc) La courbe est au-dessus de l'horizontale d'ordonnée $1{,}5$ entre $3$ et $5$ : $S = [3 ; 5]$. Entre $3$ et $5$ tonnes, le bénéfice est d'au moins $1\\,500$ €.\nd) $4$ tonnes par mois : c'est là que le bénéfice est le plus grand, $2\\,000$ €.\n⚠️ Sous $2$ tonnes, la coopérative perd de l'argent ; au-delà de $6$ tonnes aussi.\n⭐ Le tableau de variations dit où est le maximum ; le tableau de signes dit où l'on gagne de l'argent. Ce sont deux questions différentes.",
          schema: (
            <>
              {tableauVariations(["0", "4", "8"], [-6, 2, -6], "B")}
              {tableauSignes(["0", "2", "6", "8"], [["$B(x)$", ["-", "+", "-"], ["0", "0"]]])}
            </>
          ),
          micros: ["auto_fct_variations_graphique", "auto_fct_signe_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "Un bassin minier",
          enonce:
            "La courbe donne la production de charbon d'un bassin minier, en dizaines de millions de tonnes par an. L'abscisse compte les décennies depuis 1900 (chiffres d'un modèle).\na) Décrire les variations de la production de 1900 à 2000.\nb) Quand la production est-elle la plus forte ?\nc) Résoudre graphiquement $P(x) \\geqslant 5$ et traduire en années.",
          figure: repere([-1, 11, -1, 9], [{ pts: [[0, 2], [3, 5], [4, 3], [6, 7], [8, 3], [10, 0]] }], [], undefined, true),
          correction:
            "a) Croissante de 1900 à 1930, décroissante de 1930 à 1940, croissante de 1940 à 1960, puis décroissante jusqu'en 2000, où elle s'arrête.\nb) En 1960 ($x = 6$) : $7$ dizaines de millions, soit $70$ millions de tonnes.\nc) L'horizontale d'ordonnée $5$ touche la courbe en $x = 3$, puis la courbe est au-dessus de $x = 5$ à $x = 7$. $S = \\{3\\} \\cup [5 ; 7]$ : en 1930, puis de 1950 à 1970.\n⚠️ En $x = 3$, la courbe touche l'horizontale sans passer au-dessus : cette solution est un point isolé.\n⭐ Le modèle raconte un creux autour de 1940, puis le déclin des mines.",
          schema: ecranSeulement(repere([-1, 11, -1, 9], [{ pts: [[0, 2], [3, 5], [4, 3], [6, 7], [8, 3], [10, 0]] }], [
            { x: 3, y: 5, label: "1930" },
            { x: 5, y: 5, label: "1950" },
            { x: 7, y: 5, label: "1970" },
          ], 5, true)),
          micros: ["auto_fct_variations_graphique", "auto_fct_resoudre_graphiquement"],
        },
        {
          titre: "Le chômage et ses cycles",
          enonce:
            "La courbe donne le taux de chômage $T$ d'un pays, en %, de 2000 à 2020. Une unité horizontale vaut deux ans, à partir de 2000 (chiffres d'un modèle).\na) Pendant quelles périodes le chômage baisse-t-il ?\nb) Résoudre graphiquement $T(x) \\geqslant 8$ et traduire en années.\nc) Comparer la hausse de 2004 à 2008 et celle de 2016 à 2020 : laquelle est la plus rapide ?",
          figure: repere([-1, 11, -1, 12], [{ pts: [[0, 8], [2, 6], [4, 10], [6, 10], [8, 6], [10, 7]] }], [], undefined, true),
          correction:
            "a) La courbe descend sur $[0 ; 2]$ et sur $[6 ; 8]$ : de 2000 à 2004, puis de 2012 à 2016.\nb) L'horizontale d'ordonnée $8$ touche la courbe en $x = 0$, puis la courbe est au-dessus de $x = 3$ à $x = 7$. $S = \\{0\\} \\cup [3 ; 7]$ : en 2000, puis de 2006 à 2014.\nc) De 2004 à 2008 ($x$ de $2$ à $4$), le taux passe de $6$ à $10$ : $+4$ points en quatre ans. De 2016 à 2020, de $6$ à $7$ : $+1$ point seulement. La première hausse est quatre fois plus rapide.\n⚠️ $x = 3$ correspond à $2000 + 3 \\times 2 = 2006$ : on convertit avec l'échelle.\n⭐ Entre 2008 et 2012, le taux reste à $10$ % : la courbe est plate, le chômage ne varie pas.",
          schema: ecranSeulement(repere([-1, 11, -1, 12], [{ pts: [[0, 8], [2, 6], [4, 10], [6, 10], [8, 6], [10, 7]] }], [
            { x: 3, y: 8, label: "2006" },
            { x: 7, y: 8, label: "2014" },
          ], 8, true)),
          micros: ["auto_fct_resoudre_graphiquement", "auto_fct_variations_graphique", "auto_fct_lire_croissance"],
        },
      ],
    },
  ],
};
