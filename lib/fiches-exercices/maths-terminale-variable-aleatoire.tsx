// ─── Fiche d'exercices : sommes de variables aléatoires (terminale spé) ───────
//                              20 exercices corrigés
//
// Feuille de terminale spé du 29/09/2026, une par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/terminale-spe/maths/variables-aleatoires.bank.ts`
// (notionId variable_aleatoire), au niveau du bac.
//
// ⭐⭐ LE FIL : ON ADDITIONNE DES VARIABLES. L'espérance d'une somme est la
// somme des espérances, TOUJOURS ; la variance d'une somme est la somme des
// variances, SEULEMENT si les variables sont indépendantes. Puis E(aX + b),
// V(aX + b), l'échantillon (S_n et M_n), et ce que l'écart type veut dire.
//
// ⛔ Pas de répétition de la feuille de 1re spé (`maths-premiere-variables-
// aleatoires.tsx` : loi, E et V d'UNE variable) : ici, toute question passe par
// une somme, une transformation affine ou un échantillon.
//
// ⛔ LES PIÈGES NOMMÉS : ajouter les écarts types (4, 7, 14, 17, 19), oublier
// le carré de V(aX + b) (3, 8, 10, 11), X1 + X2 pris pour 2X (6), additionner
// les variances sans indépendance (9), sommes non équiprobables (1).
//
// ⭐ LES DESSINS : lois en barres, tableau des sommes de deux dés, tableau
// des produits (indépendance), arbres, le triangle 3-4-5 des écarts types,
// les points √n (écart type d'une somme) et 2/√n (d'une moyenne), la charge
// de l'ascenseur, le programme Python. Ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Micro-compétences : va_definition (1, 15, 16), va_loi_probabilite (1, 5, 9,
// 10, 13, 16, 18), va_esperance (2, 7, 9, 10, 12, 13, 16, 17, 18, 19, 20),
// va_variance_ecart_type (3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19,
// 20), va_interpreter (6, 8, 12, 14, 17, 18, 19, 20), va_defi (17, 18, 19, 20).
// 6/6.
//
// Faits cités : aucun fait réel. Boulangerie, QCM, taxi, chamboule-tout,
// trajet, menuiserie, caisse, ascenseur et résistance sont des MODÈLES. Un jeu
// de 52 cartes a 13 cœurs et 26 cartes rouges (règle du jeu, pas une mesure).

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, arbre, diagramme, intervalles, programme, repere, tableau, tableauProba, trace, triangle } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Des points (n ; valeur) à partir du rang n0 (valeurs EN CLAIR, arrondies). */
const termes = (n0: number, valeurs: number[]) => valeurs.map((y, i) => ({ x: n0 + i, y, label: "" }));

export const exercicesVariableAleatoireTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "variable-aleatoire",
  titre: "Sommes de variables aléatoires",
  accroche:
    "Vingt exercices, du calcul d'une espérance au problème de bac, avec un rappel de cours avant chaque niveau. On y additionne des variables aléatoires : l'espérance suit toujours, la variance seulement si elles sont indépendantes. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine les lois.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Pour deux variables aléatoires $X$ et $Y$ quelconques : $E(X + Y) = E(X) + E(Y)$. Et $E(aX + b) = aE(X) + b$. C'est la linéarité de l'espérance.",
        "$V(aX + b) = a^2V(X)$ et $\\sigma(aX + b) = |a|\\,\\sigma(X)$ : ajouter $b$ décale les valeurs sans les écarter.",
        "Si $X$ et $Y$ sont INDÉPENDANTES : $V(X + Y) = V(X) + V(Y)$. Ce sont les variances qui s'ajoutent, pas les écarts types.",
        "Un échantillon de taille $n$ : $n$ variables $X_1$, …, $X_n$ indépendantes et de même loi. Leur somme $S_n$ vérifie $E(S_n) = nE(X)$ et $V(S_n) = nV(X)$.",
      ],
      exercices: [
        {
          enonce:
            "On lance deux dés tétraédriques équilibrés, dont les faces portent $1$, $2$, $3$ et $4$. On note $X_1$ et $X_2$ les résultats, et $S = X_1 + X_2$. Le tableau donne $S$ pour chaque couple.\na) Pourquoi $S$ est-elle une variable aléatoire ? Quelles valeurs prend-elle ?\nb) Donner la loi de $S$.\nc) Calculer $E(S)$, puis comparer avec $E(X_1) + E(X_2)$.",
          figure: tableauProba(["+", "1", "2", "3", "4"], [["1", "2", "3", "4", "5"], ["2", "3", "4", "5", "6"], ["3", "4", "5", "6", "7"], ["4", "5", "6", "7", "8"]], [[0, 4], [1, 3], [2, 2], [3, 1]]),
          correction:
            "a) À chaque issue (un couple de faces), $S$ associe un nombre réel : c'est une fonction définie sur l'univers, donc une variable aléatoire.\nSes valeurs : $2$, $3$, $4$, $5$, $6$, $7$ et $8$.\nb) Les $16$ couples sont équiprobables. On compte les cases de chaque somme dans le tableau :\n$P(S = 2) = \\dfrac{1}{16}$, $P(S = 3) = \\dfrac{2}{16}$, $P(S = 4) = \\dfrac{3}{16}$, $P(S = 5) = \\dfrac{4}{16}$,\n$P(S = 6) = \\dfrac{3}{16}$, $P(S = 7) = \\dfrac{2}{16}$, $P(S = 8) = \\dfrac{1}{16}$.\nc) $E(S) = \\dfrac{2 \\times 1 + 3 \\times 2 + \\cdots + 8 \\times 1}{16} = \\dfrac{80}{16} = 5$.\nPour un dé : $E(X_1) = \\dfrac{1 + 2 + 3 + 4}{4} = 2{,}5$. Et $2{,}5 + 2{,}5 = 5$ : on retrouve $E(S)$ sans passer par la loi.\n⚠️ Les sept valeurs de $S$ ne sont PAS équiprobables : les couples le sont, pas les sommes.\n⭐ Sur le tableau : les cases surlignées donnent $S = 5$, sur une diagonale de $4$ cases. Le diagramme (en seizièmes) monte puis redescend, en toit.",
          schema: ecranSeulement(diagramme("barres", [{ label: "2", value: 1 }, { label: "3", value: 2 }, { label: "4", value: 3 }, { label: "5", value: 4 }, { label: "6", value: 3 }, { label: "7", value: 2 }, { label: "8", value: 1 }])),
          micros: ["va_definition", "va_loi_probabilite"],
        },
        {
          enonce:
            "Dans une boulangerie, on note $X$ le nombre de baguettes et $Y$ le nombre de croissants vendus entre $7$ h et $8$ h. On sait que $E(X) = 30$ et $E(Y) = 18$. Une baguette coûte $1{,}20$ € et un croissant $1{,}50$ €. On note $R$ la recette de cette heure, en euros.\na) Exprimer $R$ en fonction de $X$ et $Y$.\nb) Calculer $E(R)$.\nc) Les ventes de baguettes et de croissants sont sans doute liées. Cela change-t-il le résultat du b) ?",
          correction:
            "a) $R = 1{,}2X + 1{,}5Y$.\nb) Par linéarité : $E(R) = 1{,}2E(X) + 1{,}5E(Y)$.\n$E(R) = 1{,}2 \\times 30 + 1{,}5 \\times 18 = 36 + 27 = 63$ €.\nc) Non. La linéarité de l'espérance est vraie pour TOUTES les variables, liées ou non.\n⚠️ Pour la variance de $R$, en revanche, il faudrait que $X$ et $Y$ soient indépendantes : ici, on ne pourrait pas conclure.\n⭐ Sur le tableau : chaque ligne multiplie une espérance par un prix, et la dernière ligne ajoute les deux produits.",
          schema: ecranSeulement(trace(["", "espérance", "prix (€)", "produit (€)"], [["X", "30", "1,20", "36"], ["Y", "18", "1,50", "27"], ["R", "", "", "63"]])),
          micros: ["va_esperance"],
        },
        {
          enonce:
            "$X$ prend les valeurs $0$, $1$ et $2$ avec les probabilités $0{,}2$ ; $0{,}5$ et $0{,}3$ (diagramme en %). On pose $Y = 10X - 4$.\na) Calculer $E(X)$ et $V(X)$.\nb) En déduire $E(Y)$, $V(Y)$ et $\\sigma(Y)$, sans la loi de $Y$.\nc) Vérifier $E(Y)$ à l'aide de la loi de $Y$.",
          figure: diagramme("batons", [{ label: "0", value: 20 }, { label: "1", value: 50 }, { label: "2", value: 30 }]),
          correction:
            "a) $E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}5 + 2 \\times 0{,}3 = 1{,}1$.\n$E(X^2) = 0 + 1 \\times 0{,}5 + 4 \\times 0{,}3 = 1{,}7$, donc $V(X) = 1{,}7 - 1{,}1^2 = 0{,}49$.\nb) $E(Y) = 10E(X) - 4 = 11 - 4 = 7$.\n$V(Y) = 10^2 \\times V(X) = 100 \\times 0{,}49 = 49$, et $\\sigma(Y) = \\sqrt{49} = 7$.\nc) $Y$ prend les valeurs $-4$, $6$ et $16$, avec les probabilités $0{,}2$ ; $0{,}5$ et $0{,}3$.\n$E(Y) = -0{,}8 + 3 + 4{,}8 = 7$ : c'est bien le même résultat.\n⚠️ $V(10X - 4)$ n'est pas $10V(X) - 4$ : le $-4$ disparaît, et le $10$ passe au carré.\n⭐ Sur les dessins : les barres ont les mêmes hauteurs, mais les valeurs de $Y$ sont $10$ fois plus écartées. Le $-4$ décale tout, sans rien écarter.",
          schema: ecranSeulement(diagramme("batons", [{ label: "−4", value: 20 }, { label: "6", value: 50 }, { label: "16", value: 30 }])),
          micros: ["va_variance_ecart_type"],
        },
        {
          enonce:
            "$X$ et $Y$ sont deux variables aléatoires indépendantes, avec $\\sigma(X) = 3$ et $\\sigma(Y) = 4$.\na) Calculer $V(X + Y)$, puis $\\sigma(X + Y)$.\nb) Calculer $\\sigma(X - Y)$.\nc) Pourquoi ne trouve-t-on pas $7$ au a) ?",
          correction:
            "a) $X$ et $Y$ sont indépendantes : $V(X + Y) = V(X) + V(Y) = 9 + 16 = 25$.\nDonc $\\sigma(X + Y) = \\sqrt{25} = 5$.\nb) $V(X - Y) = V(X) + (-1)^2V(Y) = 9 + 16 = 25$, donc $\\sigma(X - Y) = 5$ aussi.\nc) Ce sont les VARIANCES qui s'ajoutent. Les écarts types se combinent comme les côtés d'un triangle rectangle : $3^2 + 4^2 = 5^2$.\n⚠️ $\\sigma(X + Y) = 3 + 4 = 7$ est faux. Et $V(X - Y)$ n'est pas $V(X) - V(Y)$ : une différence disperse autant qu'une somme.\n⭐ Sur le dessin : les côtés de l'angle droit mesurent $3$ et $4$ ; l'hypoténuse, $5$, est l'écart type de la somme.",
          schema: ecranSeulement(triangle({ A: [0, 0], B: [4, 0], C: [0, 3] }, { noms: { A: "", B: "", C: "" }, cotes: { AB: "σ(Y) = 4", CA: "σ(X) = 3", BC: "σ(X + Y) = 5" }, droit: "A" })),
          micros: ["va_variance_ecart_type"],
        },
        {
          enonce:
            "Un magasin reçoit $X$ livraisons le matin et $Y$ l'après-midi. $X$ vaut $0$ ou $1$, avec $P(X = 1) = 0{,}3$. $Y$ vaut $0$, $1$ ou $2$, avec les probabilités $0{,}5$ ; $0{,}3$ et $0{,}2$. On admet que $X$ et $Y$ sont indépendantes, et on pose $S = X + Y$.\na) Calculer la probabilité de chaque couple de valeurs de $X$ et $Y$.\nb) En déduire la loi de $S$.\nc) Calculer $E(S)$ de deux façons.",
          correction:
            "a) Par indépendance, la probabilité d'un couple est le produit des probabilités : par exemple $0{,}7 \\times 0{,}3 = 0{,}21$ pour $X = 0$ et $Y = 1$. Le tableau donne les six produits.\nb) On regroupe les cases de même somme :\n$P(S = 0) = 0{,}35$ ; $P(S = 1) = 0{,}21 + 0{,}15 = 0{,}36$ ;\n$P(S = 2) = 0{,}14 + 0{,}09 = 0{,}23$ ; $P(S = 3) = 0{,}06$.\nContrôle : $0{,}35 + 0{,}36 + 0{,}23 + 0{,}06 = 1$.\nc) Avec la loi : $E(S) = 0{,}36 + 2 \\times 0{,}23 + 3 \\times 0{,}06 = 1$.\nPar linéarité : $E(X) = 0{,}3$ et $E(Y) = 0{,}3 + 0{,}4 = 0{,}7$, donc $E(S) = 1$.\n⚠️ Multiplier les probabilités n'est permis QUE parce que $X$ et $Y$ sont indépendantes.\n⭐ Sur le tableau : les deux cases surlignées donnent $S = 1$ ; on les additionne.",
          schema: tableauProba(["X ; Y", "0 (0,5)", "1 (0,3)", "2 (0,2)"], [["0 (0,7)", "0,35", "0,21", "0,14"], ["1 (0,3)", "0,15", "0,09", "0,06"]], [[0, 2], [1, 1]]),
          micros: ["va_loi_probabilite"],
        },
        {
          enonce:
            "On lance un dé équilibré ; on admet que son résultat $X$ vérifie $E(X) = 3{,}5$ et $V(X) = \\dfrac{35}{12}$.\nJeu A : on lance le dé une fois et on double le résultat, $A = 2X$.\nJeu B : on lance le dé deux fois, de façon indépendante, et on additionne, $B = X_1 + X_2$.\na) Comparer $E(A)$ et $E(B)$.\nb) Comparer $V(A)$ et $V(B)$. Quel jeu est le plus dispersé ?",
          correction:
            "a) $E(A) = 2E(X) = 7$ et $E(B) = E(X_1) + E(X_2) = 7$ : même espérance.\nb) $V(A) = 2^2V(X) = 4 \\times \\dfrac{35}{12} = \\dfrac{35}{3} \\approx 11{,}67$.\n$V(B) = V(X_1) + V(X_2) = \\dfrac{35}{6} \\approx 5{,}83$, par indépendance.\nLe jeu A a une variance DOUBLE : il est le plus dispersé ($\\sigma(A) \\approx 3{,}42$ contre $\\sigma(B) \\approx 2{,}42$).\n⚠️ $X_1 + X_2$ n'est pas $2X$ : deux lancers différents se compensent souvent, un lancer doublé jamais.\n⭐ Sur les dessins (en trente-sixièmes) : A a six barres égales, de $2$ à $12$ ; B a onze barres en toit, serrées autour de $7$.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {ecranSeulement(diagramme("barres", [{ label: "2", value: 6 }, { label: "4", value: 6 }, { label: "6", value: 6 }, { label: "8", value: 6 }, { label: "10", value: 6 }, { label: "12", value: 6 }]))}
              {diagramme("barres", [{ label: "2", value: 1 }, { label: "3", value: 2 }, { label: "4", value: 3 }, { label: "5", value: 4 }, { label: "6", value: 5 }, { label: "7", value: 6 }, { label: "8", value: 5 }, { label: "9", value: 4 }, { label: "10", value: 3 }, { label: "11", value: 2 }, { label: "12", value: 1 }])}
            </div>
          ),
          micros: ["va_variance_ecart_type", "va_interpreter"],
        },
        {
          enonce:
            "Une machine remplit des paquets de riz. La masse d'un paquet, en grammes, est une variable aléatoire d'espérance $1\\,000$ et d'écart type $5$. Un carton contient $12$ paquets, dont les masses sont indépendantes. On note $S$ la masse totale de riz du carton.\na) Calculer $E(S)$.\nb) Calculer $V(S)$, puis $\\sigma(S)$ au gramme près.",
          correction:
            "a) $S = X_1 + \\cdots + X_{12}$, donc $E(S) = 12 \\times 1\\,000 = 12\\,000$ g.\nb) Les masses sont indépendantes : $V(S) = 12 \\times 5^2 = 300$.\n$\\sigma(S) = \\sqrt{300} \\approx 17$ g.\n⚠️ Ce n'est pas $12 \\times 5 = 60$ g : les écarts des paquets se compensent en partie. L'écart type de la somme vaut $5\\sqrt{12}$, pas $5 \\times 12$.\n⭐ Sur le dessin (une graduation = $5$ g) : les points $\\sqrt{n}$ donnent l'écart type de $n$ paquets. Ils restent loin sous la droite orange $y = n$, qui serait le calcul faux. Pour $12$ paquets : $3{,}46$ graduations, soit environ $17$ g.",
          schema: repere([-1, 13, -1, 13], [{ q: [0, 1, 0], couleur: ORANGE }], termes(1, [1, 1.41, 1.73, 2, 2.24, 2.45, 2.65, 2.83, 3, 3.16, 3.32, 3.46]), undefined, true),
          micros: ["va_esperance", "va_variance_ecart_type"],
        },
        {
          enonce:
            "À un concours, la note $X$ d'un candidat a pour espérance $11$ et pour écart type $4$. On pose $Z = \\dfrac{X - 11}{4}$ : c'est la note centrée réduite.\na) Calculer $E(Z)$ et $\\sigma(Z)$.\nb) Léa a eu $17$. Que vaut $Z$ pour elle ? Interpréter.\nc) À une autre épreuve, d'espérance $9$ et d'écart type $2$, Tom a eu $13$. Qui a le meilleur résultat, relativement aux autres candidats ?",
          correction:
            "a) $Z = \\dfrac{1}{4}X - \\dfrac{11}{4}$ : c'est une expression $aX + b$, avec $a = \\dfrac{1}{4}$.\n$E(Z) = \\dfrac{1}{4} \\times 11 - \\dfrac{11}{4} = 0$ et $\\sigma(Z) = \\dfrac{1}{4} \\times 4 = 1$.\nb) $Z = \\dfrac{17 - 11}{4} = 1{,}5$ : Léa est à $1{,}5$ écart type au-dessus de l'espérance.\nc) Pour Tom : $\\dfrac{13 - 9}{2} = 2$. Il est à $2$ écarts types au-dessus : relativement, il a mieux réussi que Léa, avec une note plus basse.\n⚠️ $V(Z) = \\dfrac{V(X)}{16} = 1$ : on divise la variance par $4^2$, pas par $4$.\n⭐ Le tableau traduit les notes en « nombre d'écarts types » : $11$ devient $0$, et chaque pas de $4$ points compte pour $1$.",
          schema: ecranSeulement(tableau(["X", "3", "7", "11", "15", "17"], ["Z", "−2", "−1", "0", "1", "1,5"])),
          micros: ["va_interpreter", "va_variance_ecart_type"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Loi de $X + Y$, avec $X$ et $Y$ indépendantes : la case $(i ; j)$ a la probabilité $P(X = i) \\times P(Y = j)$, puis on regroupe les cases de même somme.",
        "Formule de König-Huygens : $V(X) = E(X^2) - E(X)^2$.",
        "Compter avec des indicatrices : si $X_i$ vaut $1$ quand l'événement $A_i$ est réalisé et $0$ sinon, alors $E(X_i) = P(A_i)$, et $X_1 + \\cdots + X_n$ compte les événements réalisés.",
        "⚠️ L'espérance d'une somme n'a besoin d'aucune hypothèse. La variance d'une somme demande l'indépendance.",
      ],
      exercices: [
        {
          enonce:
            "On tire une carte au hasard dans un jeu de $52$ cartes. $X$ vaut $1$ si la carte est un cœur, $0$ sinon. $Y$ vaut $1$ si la carte est rouge (cœur ou carreau), $0$ sinon. On pose $S = X + Y$.\na) Calculer $E(X)$, $E(Y)$, puis $E(S)$.\nb) Déterminer la loi de $S$ et retrouver $E(S)$.\nc) Calculer $V(X)$, $V(Y)$ et $V(S)$. A-t-on $V(S) = V(X) + V(Y)$ ? Expliquer.",
          correction:
            "a) Il y a $13$ cœurs et $26$ cartes rouges : $E(X) = P(X = 1) = \\dfrac{1}{4}$ et $E(Y) = \\dfrac{1}{2}$.\nPar linéarité : $E(S) = \\dfrac{1}{4} + \\dfrac{1}{2} = \\dfrac{3}{4}$.\nb) Carte noire : $S = 0$. Carreau : $S = 0 + 1 = 1$. Cœur : $S = 1 + 1 = 2$.\n$P(S = 0) = \\dfrac{1}{2}$, $P(S = 1) = \\dfrac{1}{4}$, $P(S = 2) = \\dfrac{1}{4}$.\n$E(S) = \\dfrac{1}{4} + 2 \\times \\dfrac{1}{4} = \\dfrac{3}{4}$ : même résultat.\nc) Une variable qui vaut $1$ avec la probabilité $p$, et $0$ sinon, a pour variance $p(1 - p)$ : $V(X) = \\dfrac{3}{16}$ et $V(Y) = \\dfrac{1}{4} = \\dfrac{4}{16}$.\n$E(S^2) = 1 \\times \\dfrac{1}{4} + 4 \\times \\dfrac{1}{4} = \\dfrac{5}{4}$, donc $V(S) = \\dfrac{5}{4} - \\dfrac{9}{16} = \\dfrac{11}{16}$.\nOr $V(X) + V(Y) = \\dfrac{7}{16}$ : l'égalité est FAUSSE.\nC'est que $X$ et $Y$ ne sont pas indépendantes : un cœur est toujours rouge, donc $X = 1$ entraîne $Y = 1$. Les deux variables grandissent ensemble, et leur somme se disperse davantage.\n⚠️ La linéarité de l'espérance marche toujours ; l'addition des variances demande l'indépendance.\n⭐ Le tableau donne $S$ pour chaque couleur : deux couleurs sur quatre donnent $0$.",
          schema: ecranSeulement(tableau(["Couleur", "Pique", "Trèfle", "Carreau", "Cœur"], ["X + Y", 0, 0, 1, 2])),
          micros: ["va_loi_probabilite", "va_esperance", "va_variance_ecart_type"],
        },
        {
          enonce:
            "Un QCM compte $20$ questions, chacune avec $4$ réponses dont une seule juste. Un élève répond au hasard, de façon indépendante d'une question à l'autre. $X_i$ vaut $1$ s'il répond juste à la question $i$, $0$ sinon, et $N = X_1 + \\cdots + X_{20}$.\na) Calculer $E(X_i)$ et $V(X_i)$.\nb) En déduire $E(N)$, $V(N)$ et $\\sigma(N)$.\nc) Une bonne réponse rapporte $3$ points, une mauvaise en retire $1$. Exprimer la note $T$ en fonction de $N$, puis calculer $E(T)$ et $\\sigma(T)$. Interpréter.",
          correction:
            "a) $E(X_i) = P(X_i = 1) = \\dfrac{1}{4}$ et $V(X_i) = \\dfrac{1}{4} \\times \\dfrac{3}{4} = \\dfrac{3}{16}$.\nb) Par linéarité : $E(N) = 20 \\times \\dfrac{1}{4} = 5$.\nLes $X_i$ sont indépendantes : $V(N) = 20 \\times \\dfrac{3}{16} = 3{,}75$, et $\\sigma(N) = \\sqrt{3{,}75} \\approx 1{,}94$.\nc) $N$ bonnes réponses et $20 - N$ mauvaises : $T = 3N - (20 - N) = 4N - 20$.\n$E(T) = 4 \\times 5 - 20 = 0$ et $\\sigma(T) = 4\\sigma(N) \\approx 7{,}75$.\nAu hasard, la note vaut $0$ en moyenne : le barème annule le hasard. Mais elle fluctue d'environ $8$ points d'une copie à l'autre.\n⚠️ $\\sigma(4N - 20) = 4\\sigma(N)$, mais $V(4N - 20) = 16V(N)$ : le $4$ passe au carré dans la variance, pas dans l'écart type.\n⭐ On a retrouvé l'espérance $np$ et la variance $np(1 - p)$ de la loi binomiale $\\mathcal{B}(20 ; 0{,}25)$ : une loi binomiale est une somme.\n⭐ Sur le dessin (en %) : les barres culminent en $N = 5$ ; au-delà de $10$, elles sont invisibles (moins de $0{,}5$ % en tout).",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 0 }, { label: "1", value: 2 }, { label: "2", value: 7 }, { label: "3", value: 13 }, { label: "4", value: 19 }, { label: "5", value: 20 }, { label: "6", value: 17 }, { label: "7", value: 11 }, { label: "8", value: 6 }, { label: "9", value: 3 }, { label: "10", value: 1 }])),
          micros: ["va_loi_probabilite", "va_esperance", "va_variance_ecart_type"],
        },
        {
          enonce:
            "Démonstration du cours. Soit $X$ une variable aléatoire, $a$ et $b$ deux réels, et $Y = aX + b$.\na) Montrer que $Y - E(Y) = a\\left(X - E(X)\\right)$.\nb) En déduire que $V(Y) = a^2V(X)$, puis que $\\sigma(Y) = |a|\\,\\sigma(X)$.\nc) Application : le prix d'une course de taxi est $P = 2{,}5D + 4$ (en €), où la distance $D$ (en km) a pour espérance $6$ et pour écart type $2$. Calculer $E(P)$ et $\\sigma(P)$.\nd) Avec une remise, un client paie $Q = 30 - 2D$. Calculer $\\sigma(Q)$.",
          correction:
            "a) Par linéarité, $E(Y) = aE(X) + b$.\nDonc $Y - E(Y) = aX + b - aE(X) - b = a\\left(X - E(X)\\right)$.\nb) $V(Y) = E\\left((Y - E(Y))^2\\right)$ $= E\\left(a^2(X - E(X))^2\\right)$.\nPar linéarité, on sort la constante $a^2$ : $V(Y) = a^2E\\left((X - E(X))^2\\right) = a^2V(X)$.\nEnfin $\\sigma(Y) = \\sqrt{a^2V(X)} = |a|\\,\\sigma(X)$, car $\\sqrt{a^2} = |a|$.\nc) $E(P) = 2{,}5 \\times 6 + 4 = 19$ € et $\\sigma(P) = 2{,}5 \\times 2 = 5$ €.\nd) $\\sigma(Q) = |-2| \\times 2 = 4$ €.\n⚠️ Un écart type n'est jamais négatif : $\\sigma(Q) = 4$, pas $-4$. C'est pour cela qu'on écrit $|a|$.\n⭐ Sur le tableau : quand $D$ passe de $E - \\sigma$ à $E + \\sigma$ (de $4$ à $8$ km), le prix passe de $14$ à $24$ € : $5$ € de chaque côté de $19$.",
          schema: ecranSeulement(trace(["", "E − σ", "E", "E + σ"], [["D (km)", "4", "6", "8"], ["P (€)", "14", "19", "24"]])),
          micros: ["va_variance_ecart_type"],
        },
        {
          enonce:
            "À un stand de chamboule-tout, le gain net $G$ d'une partie (en €) vaut $-2$ avec la probabilité $0{,}7$ et $5$ avec la probabilité $0{,}3$. Un joueur fait $100$ parties indépendantes ; $S$ est son gain total.\na) Calculer $E(G)$, $V(G)$ et $\\sigma(G)$.\nb) Calculer $E(S)$ et $\\sigma(S)$.\nc) Le joueur est-il sûr de gagner de l'argent sur $100$ parties ? Et sur $10\\,000$ parties ?",
          figure: diagramme("batons", [{ label: "−2 €", value: 70 }, { label: "5 €", value: 30 }]),
          correction:
            "a) $E(G) = -2 \\times 0{,}7 + 5 \\times 0{,}3 = -1{,}4 + 1{,}5 = 0{,}1$ €.\n$E(G^2) = 4 \\times 0{,}7 + 25 \\times 0{,}3 = 10{,}3$, donc $V(G) = 10{,}3 - 0{,}01 = 10{,}29$ et $\\sigma(G) \\approx 3{,}21$ €.\nb) $E(S) = 100 \\times 0{,}1 = 10$ € et, par indépendance, $V(S) = 100 \\times 10{,}29 = 1\\,029$.\n$\\sigma(S) = \\sqrt{1\\,029} \\approx 32{,}1$ €.\nc) Non : il gagne $10$ € en moyenne, mais son gain total s'écarte d'habitude d'environ $32$ € de cette moyenne. Perdre de l'argent sur $100$ parties n'a rien de rare.\nSur $10\\,000$ parties : $E = 1\\,000$ € et $\\sigma = \\sqrt{102\\,900} \\approx 321$ €. L'écart type ne fait plus qu'un tiers de l'espérance : finir en perte devient rare.\n⚠️ L'espérance grandit comme $n$, l'écart type seulement comme $\\sqrt{n}$ : c'est pour cela que le hasard « se tasse » sur un grand nombre de parties.\n⭐ Sur le diagramme (en %) : $70$ % de chances de perdre $2$ € à chaque partie. L'espérance positive vient des gains de $5$ €, plus rares.",
          micros: ["va_esperance", "va_variance_ecart_type", "va_interpreter"],
        },
        {
          enonce:
            "Pour aller au lycée, Inès prend le bus, puis marche. La durée du bus $T_1$ (en minutes) vaut $10$ avec la probabilité $0{,}6$ et $15$ avec la probabilité $0{,}4$. La durée de la marche, attente comprise, $T_2$, vaut $5$, $10$ ou $20$ avec les probabilités $0{,}5$ ; $0{,}3$ et $0{,}2$. On suppose $T_1$ et $T_2$ indépendantes, et on pose $T = T_1 + T_2$.\na) À l'aide de l'arbre, déterminer la loi de $T$.\nb) Calculer $E(T)$ de deux façons.\nc) Calculer $V(T_1)$, $V(T_2)$, puis $\\sigma(T)$.\nd) Inès part $25$ minutes avant la sonnerie. Quelle est la probabilité qu'elle soit à l'heure ?",
          figure: arbre([
            { label: "Bus 10", proba: "0,6", enfants: [{ label: "5 : T = 15", proba: "0,5" }, { label: "10 : T = 20", proba: "0,3" }, { label: "20 : T = 30", proba: "0,2" }] },
            { label: "Bus 15", proba: "0,4", enfants: [{ label: "5 : T = 20", proba: "0,5" }, { label: "10 : T = 25", proba: "0,3" }, { label: "20 : T = 35", proba: "0,2" }] },
          ]),
          correction:
            "a) Chaque chemin donne une durée ; par indépendance, sa probabilité est le produit des branches.\n$T = 15$ : $0{,}6 \\times 0{,}5 = 0{,}3$. $T = 20$ : $0{,}6 \\times 0{,}3 + 0{,}4 \\times 0{,}5 = 0{,}38$.\n$T = 25$ : $0{,}4 \\times 0{,}3 = 0{,}12$. $T = 30$ : $0{,}6 \\times 0{,}2 = 0{,}12$. $T = 35$ : $0{,}4 \\times 0{,}2 = 0{,}08$.\nb) Avec la loi, on additionne les produits valeur × probabilité : $E(T) = 4{,}5 + 7{,}6 + 3 + 3{,}6 + 2{,}8 = 21{,}5$ min.\nPar linéarité : $E(T_1) = 6 + 6 = 12$ et $E(T_2) = 2{,}5 + 3 + 4 = 9{,}5$, donc $E(T) = 21{,}5$ min.\nc) $E(T_1^2) = 0{,}6 \\times 100 + 0{,}4 \\times 225 = 150$, donc $V(T_1) = 150 - 144 = 6$.\n$E(T_2^2) = 12{,}5 + 30 + 80 = 122{,}5$, donc $V(T_2) = 122{,}5 - 90{,}25 = 32{,}25$.\nPar indépendance, $V(T) = 38{,}25$ et $\\sigma(T) \\approx 6{,}2$ min.\nd) $P(T \\leqslant 25) = 0{,}3 + 0{,}38 + 0{,}12 = 0{,}8$.\n⚠️ $T = 20$ s'obtient par DEUX chemins (bus rapide et marche de $10$ min, ou bus lent et marche de $5$ min) : on additionne leurs probabilités.\n⭐ Sur l'arbre : chaque feuille porte la durée totale ; les deux feuilles « T = 20 » se regroupent.",
          micros: ["va_loi_probabilite", "va_esperance", "va_variance_ecart_type"],
        },
        {
          enonce:
            "Un menuisier assemble un tenon dans une mortaise. La largeur $M$ de la mortaise (en mm) a pour espérance $20{,}10$ et pour écart type $0{,}03$ ; la largeur $T$ du tenon a pour espérance $20{,}00$ et pour écart type $0{,}04$. Les deux pièces viennent de machines différentes : $M$ et $T$ sont indépendantes. Le jeu de l'assemblage est $J = M - T$.\na) Calculer $E(J)$ et $\\sigma(J)$.\nb) Le menuisier veut un jeu entre $0$ et $0{,}2$ mm. Exprimer ces bornes à l'aide de $E(J)$ et $\\sigma(J)$.\nc) Un fournisseur propose des tenons d'écart type $0{,}01$ mm. Que devient $\\sigma(J)$ ? Interpréter.",
          correction:
            "a) $E(J) = E(M) - E(T) = 0{,}10$ mm.\n$V(J) = V(M) + V(T)$ $= 0{,}0009 + 0{,}0016 = 0{,}0025$, donc $\\sigma(J) = 0{,}05$ mm.\nb) $0 = 0{,}10 - 2 \\times 0{,}05$ et $0{,}2 = 0{,}10 + 2 \\times 0{,}05$ : l'intervalle voulu est $[E(J) - 2\\sigma(J) ; E(J) + 2\\sigma(J)]$.\nc) $V(J) = 0{,}0009 + 0{,}0001 = 0{,}001$, donc $\\sigma(J) \\approx 0{,}032$ mm. L'intervalle voulu s'étend alors à plus de $3$ écarts types de chaque côté : les assemblages ratés deviennent plus rares.\n⚠️ $\\sigma(M - T)$ ne vaut ni $0{,}04 - 0{,}03$, ni $0{,}03 + 0{,}04$ : on passe par les variances, qui s'AJOUTENT, même pour une différence.\n⭐ Sur la droite (en centièmes de mm) : l'intervalle voulu va de $0$ à $20$, centré sur l'espérance $10$, avec $5$ centièmes d'écart type.",
          schema: ecranSeulement(intervalles(-5, 25, [{ de: 0, a: 20, deInclus: true, aInclus: true, label: "E ± 2σ" }], 5, [{ value: 10, label: "E" }])),
          micros: ["va_variance_ecart_type", "va_interpreter"],
        },
        {
          enonce:
            "On lance deux dés équilibrés, de façon indépendante. On admet que le résultat $X$ d'un dé vérifie $E(X) = 3{,}5$ et $V(X) = \\dfrac{35}{12}$. On considère la fonction Python ci-dessous.\na) Que représente d à chaque passage dans la boucle ?\nb) Que calcule ecart(n) ?\nc) Vers quel nombre ecart(n) devrait-elle s'approcher pour $n$ grand ? Justifier par le cours.\nd) Démontrer la valeur admise de $V(X)$.",
          figure: programme(["from random import randint", "", "def ecart(n):", "    s = 0", "    for i in range(n):", "        x = randint(1, 6)", "        y = randint(1, 6)", "        d = x + y - 7", "        s = s + d * d", "    return s / n"]),
          correction:
            "a) x et y sont les deux dés ; d est l'écart entre leur somme et $7$.\nb) La boucle ajoute d × d à s, $n$ fois, puis on divise par $n$ : ecart(n) est la moyenne des carrés des écarts à $7$, sur $n$ lancers des deux dés.\nc) $7 = E(X_1 + X_2)$. La moyenne des carrés des écarts à l'espérance approche la variance :\n$V(X_1 + X_2) = V(X_1) + V(X_2) = \\dfrac{35}{6} \\approx 5{,}83$, par indépendance.\nUne exécution de ecart(200000) donne bien un nombre proche de $5{,}83$.\nd) $E(X^2) = \\dfrac{1 + 4 + 9 + 16 + 25 + 36}{6} = \\dfrac{91}{6}$.\nPuis $V(X) = \\dfrac{91}{6} - 3{,}5^2 = \\dfrac{182 - 147}{12} = \\dfrac{35}{12}$.\n⚠️ Sans l'indépendance des deux dés, on ne pourrait pas ajouter les variances.\n⭐ Le programme est une expérience : il mesure une variance que le cours calcule.",
          micros: ["va_variance_ecart_type", "va_definition"],
        },
        {
          enonce:
            "À la sortie d'un vestiaire, $n$ personnes récupèrent leur manteau, mais les manteaux sont rendus au hasard : toutes les répartitions sont équiprobables. $X$ est le nombre de personnes qui récupèrent LEUR manteau.\na) Pour $n = 3$, lister les $6$ répartitions, puis donner la loi de $X$ et $E(X)$.\nb) Pour $n$ quelconque, $X_i$ vaut $1$ si la personne $i$ récupère son manteau, $0$ sinon. Calculer $E(X_i)$, puis $E(X)$.\nc) Les $X_i$ sont-elles indépendantes ? Est-ce gênant ?",
          correction:
            "a) On écrit les manteaux reçus par les personnes $1$, $2$ et $3$ : 123, 132, 213, 231, 312, 321.\nCes répartitions donnent $X = 3$, $1$, $1$, $0$, $0$ et $1$.\n$P(X = 0) = \\dfrac{2}{6}$, $P(X = 1) = \\dfrac{3}{6}$, $P(X = 3) = \\dfrac{1}{6}$.\n$E(X) = \\dfrac{3}{6} + 3 \\times \\dfrac{1}{6} = 1$.\nb) La personne $i$ reçoit un manteau au hasard parmi $n$ : $E(X_i) = P(X_i = 1) = \\dfrac{1}{n}$.\n$X = X_1 + \\cdots + X_n$, donc $E(X) = n \\times \\dfrac{1}{n} = 1$, quel que soit $n$.\nc) Non : si les $n - 1$ premières personnes ont leur manteau, la dernière a forcément le sien. Ce n'est pas gênant : la linéarité de l'espérance ne demande aucune indépendance.\n⚠️ $X = 2$ est impossible pour $n = 3$ : si deux personnes ont leur manteau, la troisième a aussi le sien.\n⭐ Le tableau montre les six répartitions : la moyenne des valeurs de $X$ vaut $1$.",
          schema: ecranSeulement(trace(["rendus", "X"], [["1 2 3", "3"], ["1 3 2", "1"], ["2 1 3", "1"], ["2 3 1", "0"], ["3 1 2", "0"], ["3 2 1", "1"], ["moyenne", "1"]])),
          micros: ["va_definition", "va_loi_probabilite", "va_esperance"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. On additionne des variables, puis on interprète.",
      rappel: [
        "Plan type : on nomme la variable, on dresse sa loi, on calcule $E$ et $V$, puis on passe à la somme ou à la moyenne de $n$ copies indépendantes.",
        "Moyenne d'un échantillon : $M_n = \\dfrac{S_n}{n}$, donc $E(M_n) = E(X)$ et $V(M_n) = \\dfrac{V(X)}{n}$.",
        "Interpréter : l'espérance dit « combien en moyenne » ; l'écart type dit « de combien on s'en écarte d'habitude », dans la même unité.",
      ],
      exercices: [
        {
          titre: "La file de la caisse",
          enonce:
            "Dans un supermarché, la durée de passage $D$ d'un client à une caisse (en minutes) suit la loi du diagramme : $1$ min avec la probabilité $0{,}3$ ; $2$ min avec $0{,}5$ ; $4$ min avec $0{,}2$. Les durées des clients sont indépendantes.\na) Calculer $E(D)$, $V(D)$ et $\\sigma(D)$.\nb) Une caissière voit passer $30$ clients ; on note $T$ la durée totale. Calculer $E(T)$ et $\\sigma(T)$.\nc) La caissière a prévu $70$ minutes. Est-ce large ?\nd) Pour $n$ clients, calculer le rapport $\\dfrac{\\sigma(T_n)}{E(T_n)}$ pour $n = 30$, puis pour $n = 120$. Que remarque-t-on ?",
          figure: diagramme("batons", [{ label: "1 min", value: 30 }, { label: "2 min", value: 50 }, { label: "4 min", value: 20 }]),
          correction:
            "a) $E(D) = 0{,}3 + 1 + 0{,}8 = 2{,}1$ min.\n$E(D^2) = 0{,}3 + 4 \\times 0{,}5 + 16 \\times 0{,}2 = 5{,}5$, donc $V(D) = 5{,}5 - 2{,}1^2 = 1{,}09$ et $\\sigma(D) \\approx 1{,}04$ min.\nb) $T = D_1 + \\cdots + D_{30}$ : $E(T) = 30 \\times 2{,}1 = 63$ min.\nPar indépendance, $V(T) = 30 \\times 1{,}09 = 32{,}7$ et $\\sigma(T) \\approx 5{,}7$ min.\nc) $70 - 63 = 7$ min, un peu plus d'un écart type : la marge est modeste, un dépassement arrivera de temps en temps.\nd) $n = 30$ : $\\dfrac{5{,}72}{63} \\approx 0{,}09$.\n$n = 120$ : $E = 252$ et $\\sigma = \\sqrt{130{,}8} \\approx 11{,}4$, donc le rapport vaut environ $0{,}045$.\nQuatre fois plus de clients : l'écart relatif est divisé par $2$, car $\\dfrac{\\sqrt{n}}{n} = \\dfrac{1}{\\sqrt{n}}$.\n⚠️ $\\sigma(T) = 30 \\times 1{,}04$ serait faux : c'est la VARIANCE qu'on multiplie par $30$.\n⭐ Sur le diagramme (en %) : la moitié des clients passe en $2$ min, mais les clients à $4$ min ($20$ %) tirent l'espérance au-dessus de $2$.",
          micros: ["va_defi", "va_esperance", "va_variance_ecart_type", "va_interpreter"],
        },
        {
          titre: "Pièce, puis dé",
          enonce:
            "Une association propose un jeu : on paie $3$ €, puis on lance une pièce équilibrée et un dé équilibré. Face rapporte $2$ € ; un $6$ au dé rapporte $6$ €. On note $X$ le gain de la pièce, $Y$ celui du dé, et $N = X + Y - 3$ le gain net du joueur.\na) Donner les lois de $X$ et de $Y$, leurs espérances et leurs variances.\nb) En déduire $E(N)$ et $V(N)$.\nc) À l'aide de l'arbre, donner la loi de $N$, et vérifier les résultats du b).\nd) $1\\,000$ parties indépendantes sont jouées dans la journée. Donner l'espérance et l'écart type du bénéfice $B$ de l'association. Interpréter.",
          figure: arbre([
            { label: "Face", proba: "1/2", enfants: [{ label: "6 : N = 5", proba: "1/6" }, { label: "autre : N = −1", proba: "5/6" }] },
            { label: "Pile", proba: "1/2", enfants: [{ label: "6 : N = 3", proba: "1/6" }, { label: "autre : N = −3", proba: "5/6" }] },
          ]),
          correction:
            "a) $X$ vaut $0$ ou $2$, avec la probabilité $\\dfrac{1}{2}$ chacun : $E(X) = 1$ et $V(X) = \\dfrac{0 + 4}{2} - 1^2 = 1$.\n$Y$ vaut $6$ avec la probabilité $\\dfrac{1}{6}$, et $0$ sinon : $E(Y) = 1$ et $V(Y) = 36 \\times \\dfrac{1}{6} - 1^2 = 5$.\nb) $E(N) = 1 + 1 - 3 = -1$ €.\nLa pièce et le dé sont indépendants : $V(N) = V(X) + V(Y) = 6$ (le $-3$ ne change pas la variance).\nc) $P(N = 5) = \\dfrac{1}{12}$, $P(N = 3) = \\dfrac{1}{12}$, $P(N = -1) = \\dfrac{5}{12}$, $P(N = -3) = \\dfrac{5}{12}$.\n$E(N) = \\dfrac{5 + 3 - 5 - 15}{12} = -1$.\n$E(N^2) = \\dfrac{25 + 9 + 5 + 45}{12} = 7$, donc $V(N) = 7 - 1 = 6$ : les deux calculs concordent.\nd) Le bénéfice de l'association est l'opposé du gain des joueurs : $B = -(N_1 + \\cdots + N_{1000})$.\n$E(B) = 1\\,000$ € et $V(B) = 1\\,000 \\times 6 = 6\\,000$, donc $\\sigma(B) \\approx 77{,}5$ €.\nPour perdre de l'argent, l'association devrait s'écarter de sa moyenne de près de $13$ écarts types : c'est extrêmement improbable.\n⚠️ $V(-S) = (-1)^2V(S) = V(S)$ : changer de camp ne change pas la dispersion.\n⭐ Sur l'arbre : deux feuilles sur quatre font perdre le joueur, avec en tout $\\dfrac{10}{12}$ des chances.",
          micros: ["va_defi", "va_loi_probabilite", "va_esperance", "va_variance_ecart_type", "va_interpreter"],
        },
        {
          titre: "La charge de l'ascenseur",
          enonce:
            "Un ascenseur porte au plus $630$ kg. On modélise la masse d'un usager par une variable aléatoire d'espérance $75$ kg et d'écart type $12$ kg ; les masses des usagers sont indépendantes. On note $S_n$ la masse totale de $n$ usagers.\na) Calculer $E(S_8)$ et $\\sigma(S_8)$.\nb) La plaque indique « $8$ personnes ». L'écart entre $630$ et $E(S_8)$ représente combien d'écarts types ? Commenter.\nc) Le constructeur adopte la règle $E(S_n) + 3\\sigma(S_n) \\leqslant 630$. Montrer que $E(S_n) + 3\\sigma(S_n) = 75n + 36\\sqrt{n}$.\nd) Combien d'usagers cette règle autorise-t-elle au plus ?",
          correction:
            "a) $E(S_8) = 8 \\times 75 = 600$ kg.\nPar indépendance, $V(S_8) = 8 \\times 12^2 = 1\\,152$, donc $\\sigma(S_8) \\approx 33{,}9$ kg.\nb) $\\dfrac{630 - 600}{33{,}9} \\approx 0{,}88$ : moins d'un écart type. Avec $8$ personnes, dépasser $630$ kg n'est pas un événement rare.\nc) $E(S_n) = 75n$ et $\\sigma(S_n) = \\sqrt{n \\times 144} = 12\\sqrt{n}$. Donc $E(S_n) + 3\\sigma(S_n) = 75n + 36\\sqrt{n}$.\nd) $n = 7$ : $525 + 36\\sqrt{7} \\approx 620{,}2$, qui est $\\leqslant 630$.\n$n = 8$ : $600 + 36\\sqrt{8} \\approx 701{,}8$, qui dépasse $630$.\nLa fonction $n \\mapsto 75n + 36\\sqrt{n}$ est croissante : la règle autorise au plus $7$ usagers.\n⚠️ $\\sigma(S_8)$ n'est pas $8 \\times 12 = 96$ kg : c'est $12\\sqrt{8}$.\n⭐ Sur le dessin (une graduation = $100$ kg) : les points $75n + 36\\sqrt{n}$ passent au-dessus de la droite $y = 6{,}3$ entre $n = 7$ et $n = 8$.",
          schema: repere([-1, 10, -1, 9], [], termes(1, [1.11, 2.01, 2.87, 3.72, 4.55, 5.38, 6.2, 7.02, 7.83]), 6.3, true),
          micros: ["va_defi", "va_esperance", "va_variance_ecart_type", "va_interpreter"],
        },
        {
          titre: "Mesurer plusieurs fois",
          enonce:
            "Un appareil mesure une résistance électrique. Chaque mesure $X_i$ (en ohms) a pour espérance la vraie valeur $r$ et pour écart type $2$ ; les mesures sont indépendantes. On fait $n$ mesures, et on retient leur moyenne $M_n = \\dfrac{X_1 + \\cdots + X_n}{n}$.\na) Montrer que $E(M_n) = r$ et $V(M_n) = \\dfrac{4}{n}$.\nb) Calculer $\\sigma(M_4)$. Interpréter.\nc) Combien de mesures faut-il pour que $\\sigma(M_n) \\leqslant 0{,}5$ ?\nd) Pour diviser l'écart type par $10$, par combien faut-il multiplier le nombre de mesures ?",
          correction:
            "a) Par linéarité : $E(M_n) = \\dfrac{1}{n}\\left(E(X_1) + \\cdots + E(X_n)\\right)$ $= \\dfrac{nr}{n} = r$.\nPar indépendance : $V(X_1 + \\cdots + X_n) = 4n$.\nPuis $V(aS) = a^2V(S)$ avec $a = \\dfrac{1}{n}$ : $V(M_n) = \\dfrac{4n}{n^2} = \\dfrac{4}{n}$.\nb) $\\sigma(M_4) = \\sqrt{\\dfrac{4}{4}} = 1$ : la moyenne de $4$ mesures s'écarte d'habitude de $1$ ohm de la vraie valeur, deux fois moins qu'une mesure seule.\nc) $\\sigma(M_n) = \\dfrac{2}{\\sqrt{n}} \\leqslant 0{,}5$ équivaut à $\\sqrt{n} \\geqslant 4$, soit $n \\geqslant 16$.\nd) Pour diviser $\\dfrac{2}{\\sqrt{n}}$ par $10$, il faut multiplier $\\sqrt{n}$ par $10$, donc $n$ par $100$.\n⚠️ Diviser par $n$ dans la moyenne divise la variance par $n^2$, pas par $n$ ; c'est la somme, avec ses $n$ variances, qui ramène à $\\dfrac{4}{n}$.\n⭐ Sur le dessin : les points $\\dfrac{2}{\\sqrt{n}}$ descendent vite, puis de plus en plus lentement vers la droite $y = 0{,}5$, qu'ils n'atteignent qu'à $n = 16$.",
          schema: repere([-1, 9, -1, 3], [], termes(1, [2, 1.41, 1.15, 1, 0.89, 0.82, 0.76, 0.71]), 0.5),
          micros: ["va_defi", "va_esperance", "va_variance_ecart_type", "va_interpreter"],
        },
      ],
    },
  ],
};
