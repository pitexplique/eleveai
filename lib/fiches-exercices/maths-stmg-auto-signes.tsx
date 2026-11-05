// ─── Fiche d'exercices : signe d'une expression (STMG) — 20 exercices ───────────
//
// Notion auto_signes du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts`). Le coach
// demande : le signe de ax + b, le seuil de rentabilité (premier entier qui rend
// un bénéfice positif), le signe de a(x − r₁)(x − r₂) entre et hors des racines,
// la règle des signes dans un tableau, et l'inéquation P(x) ≤ 0 lue sur le tableau.
// ⛔ Pas de discriminant : les racines se lisent sur la forme factorisée.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8, 15) ; réparation de vélos
// (mécanicienne), météo (météorologue), chauffage (chauffagiste), brasserie
// (brasseuse), plongeon (entraîneuse), serre (horticultrice), hôtel (hôtelière),
// sérigraphie (imprimeur), fromagerie (fromagère), pharmacie (pharmacien), cabinet
// comptable (stagiaire).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-2.mjs`,
// qui relit aussi les tableaux de signes dessinés.
//
// Micro-compétences : auto_alg_signe_premier_degre (1, 2, 3, 9, 10, 11, 17),
// auto_alg_signe_factorisee (4, 5, 6, 12, 13, 14, 18), auto_alg_tableau_signes
// (7, 8, 15, 16, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauSignes } from "@/lib/fiches-exercices/figures";

// Un signe : le mot, au masculin ou au féminin (« l'expression est positive »), ou + / −.
const POSITIF = ["positif", "positive", "+"];
const NEGATIF = ["négatif", "négative", "-"];

export const exercicesAutoSignesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-signes",
  titre: "Signe d'une expression",
  accroche:
    "Vingt exercices pour savoir en un coup d'œil si une expression est positive ou négative : le signe de ax + b, le seuil de rentabilité, le signe d'un produit de deux facteurs, le tableau de signes et l'inéquation qu'il résout. Un atelier de vélos, un réfrigérateur à vaccins, un plongeoir, une serre, une fromagerie. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Écris un intervalle ainsi : ]2 ; 5[ ou [2 ; +∞[ . Écris un signe par le mot positif ou négatif.",
      rappel: [
        "$ax + b$ s'annule une seule fois. Si $a$ est positif : négative avant, positive après. Si $a$ est négatif : positive avant, négative après.",
        "Le signe d'un produit, c'est le produit des signes : $(-) \\times (-) = (+)$ et $(+) \\times (-) = (-)$.",
        "$a(x - r_1)(x - r_2)$ s'annule en $r_1$ et $r_2$. Elle est du signe de $a$ à l'EXTÉRIEUR des racines, du signe contraire ENTRE elles.",
        "Le tableau de signes : une ligne par facteur, un 0 sous la valeur qui l'annule, et le produit sur la dernière ligne.",
      ],
      exercices: [
        {
          enonce:
            "On étudie l'expression $x - 3$.\na) Pour quelle valeur s'annule-t-elle ?\nb) Sur quel intervalle est-elle strictement positive ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "]3 ; +∞[" },
          ],
          correction:
            "a) $x - 3 = 0$ donne $x = 3$.\nb) Le coefficient de $x$ est 1, positif : l'expression est négative avant 3, positive après.\n⛔ Le piège : répondre $-3$ au a). La valeur qui annule $x - 3$ est 3 : $3 - 3 = 0$.\nRéponse : a) 3 ; b) ]3 ; +∞[.",
          schema: tableauSignes(["−∞", "3", "+∞"], [["$x - 3$", ["-", "+"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "On étudie l'expression $-2x + 8$.\na) Pour quelle valeur s'annule-t-elle ?\nb) Sur quel intervalle est-elle strictement positive ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "]-∞ ; 4[" },
          ],
          correction:
            "a) $-2x + 8 = 0$ donne $2x = 8$, donc $x = 4$.\nb) Le coefficient de $x$ est $-2$, négatif : l'expression est positive AVANT 4, négative après.\nVérification : pour $x = 0$, $-2 \\times 0 + 8 = 8$, positif. ✔\n⛔ Le piège au b) : répondre ]4 ; +∞[, comme si le signe était toujours « moins puis plus ». Avec $a$ négatif, c'est l'inverse.\nRéponse : a) 4 ; b) ]−∞ ; 4[.",
          schema: tableauSignes(["−∞", "4", "+∞"], [["$-2x + 8$", ["+", "-"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "On étudie l'expression $3x + 6$.\na) Pour quelle valeur s'annule-t-elle ?\nb) Quel est son signe pour $x = 5$ ?\nc) Quel est son signe pour $x = -4$ ?",
          reponses: [
            { question: "a)", attendu: "-2" },
            { question: "b)", attendu: POSITIF },
            { question: "c)", attendu: NEGATIF },
          ],
          correction:
            "a) $3x + 6 = 0$ donne $3x = -6$, donc $x = -2$.\nb) 5 est après $-2$, et $a = 3$ est positif : positif. Vérification : $3 \\times 5 + 6 = 21$. ✔\nc) $-4$ est avant $-2$ : négatif. Vérification : $3 \\times (-4) + 6 = -6$. ✔\n⛔ Le piège au a) : répondre 2. Le $+ 6$ fait tomber la valeur du côté négatif.\nRéponse : a) $-2$ ; b) positif ; c) négatif.",
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "On étudie l'expression $P(x) = (x - 1)(x - 5)$. Pour quelles valeurs de $x$ s'annule-t-elle ? Donne les deux nombres.",
          reponses: [{ attendu: "1 ; 5" }],
          correction:
            "Un produit est nul quand l'un de ses facteurs est nul.\n$x - 1 = 0$ donne $x = 1$, et $x - 5 = 0$ donne $x = 5$.\n⛔ Le piège : répondre $-1$ et $-5$, en lisant les nombres avec leur signe. Pour annuler $x - 1$, il faut $x = 1$.\nRéponse : 1 et 5.",
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "Sans développer, quel est le signe de $(x - 2)(x + 3)$ pour $x = 0$ ? Réponds positif ou négatif.",
          reponses: [{ attendu: NEGATIF }],
          correction:
            "Pour $x = 0$, le premier facteur vaut $0 - 2 = -2$ : négatif.\nLe second vaut $0 + 3 = 3$ : positif.\n$(-) \\times (+) = (-)$ : le produit est négatif.\n⛔ Le piège : ne regarder qu'un seul facteur. C'est la règle des signes sur les DEUX qui décide.\nRéponse : négatif.",
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "Sans tracer la courbe, quel est le signe de $-2(x - 1)(x - 4)$ pour $x$ strictement compris entre 1 et 4 ? Réponds positif ou négatif.",
          reponses: [{ attendu: POSITIF }],
          correction:
            "Les racines sont 1 et 4, et $a = -2$ est négatif.\nEntre les racines, l'expression est du signe CONTRAIRE à celui de $a$ : positif.\nVérification pour $x = 2$ : $-2 \\times 1 \\times (-2) = 4$. ✔\n⛔ Le piège : donner le signe de $a$ entre les racines. Le signe de $a$ vaut à l'EXTÉRIEUR.\nRéponse : positif.",
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "Le tableau donne les signes des deux facteurs de $P(x) = (x + 1)(x - 3)$. Quel est le signe de $P(x)$ sur chaque intervalle ? Réponds positif ou négatif.\na) sur ]−∞ ; −1[\nb) sur ]−1 ; 3[\nc) sur ]3 ; +∞[",
          figure: tableauSignes(["−∞", "−1", "3", "+∞"], [
            ["$x + 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 3$", ["-", "-", "+"], ["", "0"]],
          ]),
          reponses: [
            { question: "a)", attendu: POSITIF },
            { question: "b)", attendu: NEGATIF },
            { question: "c)", attendu: POSITIF },
          ],
          correction:
            "On multiplie les signes de chaque colonne.\na) $(-) \\times (-) = (+)$ : positif.\nb) $(+) \\times (-) = (-)$ : négatif.\nc) $(+) \\times (+) = (+)$ : positif.\n⛔ Le piège au a) : écrire négatif parce qu'il y a deux signes moins. Deux moins font un plus.\nRéponse : a) positif ; b) négatif ; c) positif.",
          schema: tableauSignes(["−∞", "−1", "3", "+∞"], [
            ["$x + 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 3$", ["-", "-", "+"], ["", "0"]],
            ["$P(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["auto_alg_tableau_signes"],
        },
        {
          enonce:
            "Le tableau donne le signe de $P(x) = (x + 4)(x - 2)$. Quel est l'ensemble des solutions de $P(x) \\leqslant 0$ ?",
          figure: tableauSignes(["−∞", "−4", "2", "+∞"], [
            ["$x + 4$", ["-", "+", "+"], ["0", ""]],
            ["$x - 2$", ["-", "-", "+"], ["", "0"]],
            ["$P(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          reponses: [{ attendu: "[-4 ; 2]" }],
          correction:
            "On lit la dernière ligne : $P(x)$ est négatif sur ]−4 ; 2[.\nIl est nul en $-4$ et en 2. Avec $\\leqslant$, ces deux valeurs conviennent : les crochets se ferment.\n⛔ Le piège : écrire ]−4 ; 2[. Cet intervalle répond à $P(x) < 0$, pas à $P(x) \\leqslant 0$.\nRéponse : [−4 ; 2].",
          micros: ["auto_alg_tableau_signes"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à traduire : on trouve où ça s'annule, puis on donne le signe de part et d'autre.",
      rappel: [
        "Un bénéfice $B(x) = ux - f$ devient positif après sa racine $x = f \\div u$. On prend le premier ENTIER au-dessus : on ne vend pas une fraction d'article.",
        "Dans une situation, $x$ reste souvent positif : on coupe l'intervalle à 0.",
        "Pour résoudre une inéquation avec un tableau : on lit la dernière ligne. Crochets ouverts avec $<$ et $>$, fermés avec $\\leqslant$ et $\\geqslant$.",
      ],
      exercices: [
        {
          enonce:
            "Une mécanicienne répare des vélos. Chaque réparation rapporte 14 € de marge, et ses frais fixes du mois sont de 500 € (modèle). Son bénéfice est $B(x) = 14x - 500$, où $x$ est le nombre de réparations.\na) Calcule $B(30)$.\nb) À partir de combien de réparations le bénéfice devient-il positif ?\nc) Calcule le bénéfice pour ce nombre de réparations.",
          reponses: [
            { question: "a)", attendu: "-80 €" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "4 €" },
          ],
          correction:
            "a) $14 \\times 30 - 500 = 420 - 500 = -80$ € : une perte.\nb) $14x - 500 > 0$ donne $x > 500 \\div 14 \\approx 35{,}7$. Le premier entier au-dessus est 36.\nc) $14 \\times 36 - 500 = 504 - 500 = 4$ €.\n⛔ Le piège au b) : garder 35, en coupant la virgule. À 35 réparations, $B = 490 - 500 = -10$ € : encore une perte.\nRéponse : a) $-80$ € ; b) 36 ; c) 4 €.",
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "Une météorologue utilise un modèle simple : la température à $x$ kilomètres d'altitude est $T(x) = 12 - 6x$, en °C, un jour donné.\na) Pour quelle altitude $x$ la température est-elle nulle ?\nb) Sur quel intervalle la température est-elle strictement positive ? On prend $x \\geqslant 0$.\nc) Quel est le signe de $T(3)$ ? Réponds positif ou négatif.\nd) À partir de quelle altitude, en mètres, la température passe-t-elle sous 0 ?",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "[0 ; 2[" },
            { question: "c)", attendu: NEGATIF },
            { question: "d)", attendu: "2 000 m" },
          ],
          correction:
            "a) $12 - 6x = 0$ donne $6x = 12$, donc $x = 2$.\nb) Le coefficient de $x$ est $-6$ : l'expression est positive avant 2. En partant de $x = 0$ : [0 ; 2[.\nc) $T(3) = 12 - 18 = -6$ : négatif.\nd) $x$ est en kilomètres : $2 \\times 1\\,000 = 2\\,000$ m.\n⛔ Le piège au b) : répondre ]2 ; +∞[. Plus on monte, plus il fait froid : le signe passe de plus à moins.\nRéponse : a) 2 ; b) [0 ; 2[ ; c) négatif ; d) 2 000 m.",
          schema: tableauSignes(["0", "2", "+∞"], [["$12 - 6x$", ["+", "-"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "Un chauffagiste suit une cuve de 900 L de fioul qui perd 30 L par jour (modèle). Il reste $R(x) = 900 - 30x$ litres au bout de $x$ jours.\na) Au bout de combien de jours $R(x)$ s'annule-t-il ?\nb) Sur quel intervalle $R(x)$ est-il strictement positif, avec $x \\geqslant 0$ ?\nc) Combien reste-t-il de litres au bout de 12 jours ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "[0 ; 30[" },
            { question: "c)", attendu: "540 L" },
          ],
          correction:
            "a) $900 - 30x = 0$ donne $x = 900 \\div 30 = 30$.\nb) Le coefficient de $x$ est négatif : $R(x)$ est positif avant 30. En partant de 0 : [0 ; 30[.\nc) $900 - 30 \\times 12 = 900 - 360 = 540$ L.\n⛔ Le piège au b) : fermer le crochet en 30. À ce moment, la cuve est vide : $R(30) = 0$ n'est pas strictement positif.\nRéponse : a) 30 ; b) [0 ; 30[ ; c) 540 L.",
          schema: tableauSignes(["0", "30", "+∞"], [["$900 - 30x$", ["+", "-"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "Une brasseuse modélise son bénéfice par $B(x) = -2(x - 3)(x - 10)$, en centaines d'euros, pour $x$ centaines de litres.\na) Pour quelles valeurs de $x$ le bénéfice est-il nul ? Donne les deux nombres.\nb) Quel est le signe du coefficient $a = -2$ ? Réponds positif ou négatif.\nc) Sur quel intervalle le bénéfice est-il strictement positif ?\nd) Calcule $B(5)$.",
          reponses: [
            { question: "a)", attendu: "3 ; 10" },
            { question: "b)", attendu: NEGATIF },
            { question: "c)", attendu: "]3 ; 10[" },
            { question: "d)", attendu: "20" },
          ],
          correction:
            "a) Un facteur nul : $x = 3$ ou $x = 10$.\nb) $-2$ est négatif : la parabole est tournée vers le bas.\nc) Entre les racines, l'expression est du signe contraire à celui de $a$ : positive sur ]3 ; 10[.\nd) $B(5) = -2 \\times (5 - 3) \\times (5 - 10) = -2 \\times 2 \\times (-5) = 20$.\n⛔ Le piège au c) : répondre « à l'extérieur », ce qui serait vrai avec $a$ positif.\nRéponse : a) 3 et 10 ; b) négatif ; c) ]3 ; 10[ ; d) 20.",
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "Une entraîneuse de plongeon utilise le modèle $h(t) = -5(t + 1)(t - 2)$ : $h$ est la hauteur en mètres au-dessus de l'eau, $t$ le temps en secondes après le saut.\na) Pour quelles valeurs de $t$ l'expression s'annule-t-elle ? Donne les deux nombres.\nb) Calcule la hauteur à $t = 1$.\nc) Sur quel intervalle la plongeuse est-elle au-dessus de l'eau, avec $t \\geqslant 0$ ?",
          reponses: [
            { question: "a)", attendu: "-1 ; 2" },
            { question: "b)", attendu: "10 m" },
            { question: "c)", attendu: "[0 ; 2[" },
          ],
          correction:
            "a) $t + 1 = 0$ donne $t = -1$, et $t - 2 = 0$ donne $t = 2$.\nb) $h(1) = -5 \\times 2 \\times (-1) = 10$ m.\nc) $a = -5$ est négatif : $h(t)$ est positive entre $-1$ et 2. Un temps ne se compte pas avant le saut : on part de $t = 0$. Donc [0 ; 2[.\n⛔ Le piège au c) : garder ]−1 ; 2[. La valeur $t = -1$ est une racine du calcul, pas un instant du plongeon.\nRéponse : a) $-1$ et 2 ; b) 10 m ; c) [0 ; 2[.",
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "Une horticultrice suit l'écart à 20 °C de sa serre : $E(t) = (t - 2)(t - 8)$, en °C, pour $t$ heures, sur $[0\\,;\\,10]$ (modèle). La courbe est tracée ci-dessous.\na) Pour quelles valeurs de $t$ l'écart est-il nul ? Donne les deux nombres.\nb) Quel est le signe de l'écart entre 2 h et 8 h ? Réponds positif ou négatif.\nc) Sur quel ensemble la serre est-elle au-dessus de 20 °C ?\nd) Calcule $E(1)$.",
          figure: repere([-1, 10, -10, 5], [{ q: [1, -10, 16] }], [], undefined, true),
          reponses: [
            { question: "a)", attendu: "2 ; 8" },
            { question: "b)", attendu: NEGATIF },
            { question: "c)", attendu: "[0 ; 2[ ∪ ]8 ; 10]" },
            { question: "d)", attendu: "7" },
          ],
          correction:
            "a) $t = 2$ ou $t = 8$.\nb) $a = 1$ est positif : la parabole est tournée vers le haut, donc sous l'axe entre ses racines. Négatif.\nc) Au-dessus de 20 °C veut dire $E(t) > 0$ : à l'extérieur des racines, en restant sur $[0\\,;\\,10]$.\nd) $E(1) = (1 - 2)(1 - 8) = (-1) \\times (-7) = 7$.\n⛔ Le piège au c) : répondre ]2 ; 8[. Sur cet intervalle, l'écart est négatif, donc la serre est en dessous de 20 °C.\nRéponse : a) 2 et 8 ; b) négatif ; c) [0 ; 2[ ∪ ]8 ; 10] ; d) 7.",
          schema: tableauSignes(["0", "2", "8", "10"], [["$E(t)$", ["+", "-", "+"], ["0", "0"]]], "t"),
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce:
            "On étudie $P(x) = (x + 2)(x - 1)$.\na) Quelles sont ses deux racines ?\nb) Dresse son tableau de signes. Donne le signe de $P(x)$ sur les trois intervalles, de gauche à droite, avec + et − séparés par un point-virgule.\nc) Résous $P(x) < 0$.\nd) Résous $P(x) \\geqslant 0$.",
          reponses: [
            { question: "a)", attendu: "-2 ; 1" },
            { question: "b)", attendu: "+ ; - ; +", ordre: true },
            { question: "c)", attendu: "]-2 ; 1[" },
            { question: "d)", attendu: "]-∞ ; -2] ∪ [1 ; +∞[" },
          ],
          correction:
            "a) $x + 2 = 0$ donne $-2$, et $x - 1 = 0$ donne 1.\nb) On multiplie les signes de chaque colonne : + puis − puis + (voir le tableau).\nc) On lit le signe − : ]−2 ; 1[, crochets ouverts car l'inégalité est stricte.\nd) On lit les signes +, et on ajoute les racines : crochets fermés aux racines.\n⛔ Le piège au d) : mettre un crochet fermé à l'infini. Un infini s'écrit toujours avec un crochet ouvert.\nRéponse : a) $-2$ et 1 ; b) + ; − ; + ; c) ]−2 ; 1[ ; d) ]−∞ ; −2] ∪ [1 ; +∞[.",
          schema: tableauSignes(["−∞", "−2", "1", "+∞"], [
            ["$x + 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 1$", ["-", "-", "+"], ["", "0"]],
            ["$P(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["auto_alg_tableau_signes"],
        },
        {
          enonce:
            "Une hôtelière modélise le résultat d'une offre par $R(x) = (4 - x)(x + 1)$, en centaines d'euros, où $x$ est une hausse de prix en dizaines d'euros (modèle).\na) Pour quelles valeurs $R(x)$ s'annule-t-il ? Donne les deux nombres.\nb) Donne le signe de $R(x)$ sur les trois intervalles, de gauche à droite, avec + et − séparés par un point-virgule.\nc) Sur quel intervalle le résultat est-il strictement positif, avec $x \\geqslant 0$ ?\nd) Calcule $R(2)$.",
          reponses: [
            { question: "a)", attendu: "-1 ; 4" },
            { question: "b)", attendu: "- ; + ; -", ordre: true },
            { question: "c)", attendu: "[0 ; 4[" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "a) $4 - x = 0$ donne 4, et $x + 1 = 0$ donne $-1$.\nb) ⚠️ Le facteur $4 - x$ est positif AVANT 4. Le produit donne : − puis + puis − (voir le tableau).\nc) On lit le signe + sur ]−1 ; 4[. Avec $x \\geqslant 0$, cela donne [0 ; 4[.\nd) $R(2) = (4 - 2)(2 + 1) = 2 \\times 3 = 6$.\n⛔ Le piège au b) : traiter $4 - x$ comme $x - 4$. Le coefficient de $x$ y est négatif : plus puis moins.\nRéponse : a) $-1$ et 4 ; b) − ; + ; − ; c) [0 ; 4[ ; d) 6.",
          schema: tableauSignes(["−∞", "−1", "4", "+∞"], [
            ["$4 - x$", ["+", "+", "-"], ["", "0"]],
            ["$x + 1$", ["-", "+", "+"], ["0", ""]],
            ["$R(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["auto_alg_tableau_signes"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : les racines, le tableau, la ligne du produit, puis la phrase dans la situation.",
      rappel: [
        "La méthode : on cherche les racines, on dresse le tableau, on lit la dernière ligne, on répond dans la situation.",
        "Le domaine compte : on coupe l'intervalle à ce que permet la situation.",
        "Vérifier : on choisit une valeur dans l'intervalle trouvé, on calcule, et on regarde le signe.",
      ],
      exercices: [
        {
          titre: "Le seuil de l'atelier",
          enonce:
            "Un imprimeur de tee-shirts gagne 16 € de marge par tee-shirt, avec 740 € de frais fixes par mois (modèle). Le bénéfice, en euros, est $B(x) = 16x - 740$, où $x$ est le nombre de tee-shirts.\na) Calcule $B(46)$.\nb) À partir de combien de tee-shirts le bénéfice devient-il positif ?\nc) Les frais fixes augmentent de 100 €. Quel est le nouveau seuil ?\nd) Avec ces nouveaux frais, quel est le bénéfice au seuil ?",
          reponses: [
            { question: "a)", attendu: "-4 €" },
            { question: "b)", attendu: "47" },
            { question: "c)", attendu: "53" },
            { question: "d)", attendu: "8 €" },
          ],
          correction:
            "a) $16 \\times 46 - 740 = 736 - 740 = -4$ € : une petite perte.\nb) $740 \\div 16 = 46{,}25$. Le premier entier au-dessus est 47. Vérification : $16 \\times 47 - 740 = 12$. ✔\nc) Les frais passent à $740 + 100 = 840$ €. $840 \\div 16 = 52{,}5$, donc le seuil est 53.\nd) $16 \\times 53 - 840 = 848 - 840 = 8$ €.\n⛔ Le piège au c) : ajouter 100 au seuil. C'est aux frais qu'on ajoute 100 ; le seuil, lui, ne monte que de 6.\nRéponse : a) $-4$ € ; b) 47 ; c) 53 ; d) 8 €.",
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          titre: "La production de la fromagère",
          enonce:
            "Une fromagère modélise son bénéfice par $B(x) = -0{,}5(x - 2)(x - 12)$, en centaines d'euros, pour $x$ centaines de litres de lait, $x \\geqslant 0$.\na) Quelles sont les deux racines ?\nb) Donne le signe de $B(x)$ sur les trois intervalles de $\\mathbb{R}$, de gauche à droite, avec + et − séparés par un point-virgule.\nc) Pour quelles valeurs le bénéfice est-il strictement positif ?\nd) Calcule $B(7)$.\ne) Quel est le signe de $B(13)$ ? Réponds positif ou négatif.",
          reponses: [
            { question: "a)", attendu: "2 ; 12" },
            { question: "b)", attendu: "- ; + ; -", ordre: true },
            { question: "c)", attendu: "]2 ; 12[" },
            { question: "d)", attendu: "12,5" },
            { question: "e)", attendu: NEGATIF },
          ],
          correction:
            "a) $x = 2$ ou $x = 12$.\nb) $a = -0{,}5$ est négatif : le signe de $a$ à l'extérieur, le contraire entre les racines. Donc − ; + ; −.\nc) On lit le signe + : ]2 ; 12[.\nd) $B(7) = -0{,}5 \\times 5 \\times (-5) = 12{,}5$.\ne) 13 est à l'extérieur des racines : signe de $a$, négatif. Vérification : $-0{,}5 \\times 11 \\times 1 = -5{,}5$. ✔\n⛔ Le piège au e) : croire que produire plus rapporte toujours plus. Au-delà de 12, le modèle donne une perte.\nRéponse : a) 2 et 12 ; b) − ; + ; − ; c) ]2 ; 12[ ; d) 12,5 ; e) négatif.",
          schema: tableauSignes(["−∞", "2", "12", "+∞"], [["$B(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["auto_alg_signe_factorisee", "auto_alg_tableau_signes"],
        },
        {
          titre: "Le réfrigérateur à vaccins",
          enonce:
            "Un pharmacien surveille un réfrigérateur après une panne. L'écart à la température permise est $E(t) = (2t - 8)(t - 1)$, pour $t$ en heures, sur $[0\\,;\\,6]$ (modèle). Tout va bien quand $E(t) \\leqslant 0$.\na) Quelles sont les deux racines ?\nb) Donne le signe de $E(t)$ sur les trois intervalles de $[0\\,;\\,6]$, de gauche à droite, avec + et − séparés par un point-virgule.\nc) Résous $E(t) \\leqslant 0$.\nd) Pendant combien d'heures tout va-t-il bien ?",
          reponses: [
            { question: "a)", attendu: "1 ; 4" },
            { question: "b)", attendu: "+ ; - ; +", ordre: true },
            { question: "c)", attendu: "[1 ; 4]" },
            { question: "d)", attendu: "3 h" },
          ],
          correction:
            "a) $2t - 8 = 0$ donne $t = 8 \\div 2 = 4$, et $t - 1 = 0$ donne $t = 1$.\nb) Sur [0 ; 1[ : $(-) \\times (-) = (+)$. Sur ]1 ; 4[ : $(-) \\times (+) = (-)$. Sur ]4 ; 6] : $(+) \\times (+) = (+)$.\nc) On lit le signe −, et on ajoute les racines, car l'inégalité est large : [1 ; 4].\nd) $4 - 1 = 3$ heures.\n⛔ Le piège au a) : répondre 8 pour le premier facteur. La racine de $2t - 8$ est $8 \\div 2$.\nRéponse : a) 1 et 4 ; b) + ; − ; + ; c) [1 ; 4] ; d) 3 h.",
          schema: tableauSignes(["0", "1", "4", "6"], [
            ["$2t - 8$", ["-", "-", "+"], ["", "0"]],
            ["$t - 1$", ["-", "+", "+"], ["0", ""]],
            ["$E(t)$", ["+", "-", "+"], ["0", "0"]],
          ], "t"),
          micros: ["auto_alg_tableau_signes"],
        },
        {
          titre: "Le rapport du stagiaire",
          enonce:
            "Dans un cabinet comptable, Malik, stagiaire, étudie $P(x) = -(x + 3)(x - 2)$. Il écrit deux phrases.\nPhrase 1 : « $P(0)$ est positif. »\nPhrase 2 : « $P(x)$ est négatif sur ]−3 ; 2[. »\na) La phrase 1 est-elle vraie ? Réponds vrai ou faux.\nb) La phrase 2 est-elle vraie ? Réponds vrai ou faux.\nc) Résous $P(x) \\geqslant 0$.\nd) Calcule $P(3)$.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "[-3 ; 2]" },
            { question: "d)", attendu: "-6" },
          ],
          correction:
            "Les racines sont $-3$ et 2, et $a = -1$ est négatif.\na) $P(0) = -(0 + 3)(0 - 2) = -3 \\times (-2) = 6$, positif : vrai.\nb) Entre les racines, le signe est le contraire de celui de $a$ : positif. La phrase est fausse.\nc) $P(x)$ est positif entre les racines, nul en $-3$ et 2 : [−3 ; 2].\nd) $P(3) = -(3 + 3)(3 - 2) = -6 \\times 1 = -6$.\n⛔ Le piège au b) : oublier le signe moins placé devant le produit. C'est lui qui retourne la parabole.\nRéponse : a) vrai ; b) faux ; c) [−3 ; 2] ; d) $-6$.",
          schema: tableauSignes(["−∞", "−3", "2", "+∞"], [["$P(x)$", ["-", "+", "-"], ["0", "0"]]]),
          micros: ["auto_alg_tableau_signes"],
        },
      ],
    },
  ],
};
