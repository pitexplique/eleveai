// ─── Fiche d'exercices : degré 2, axe de symétrie et extremum (STMG) — 20 exercices
//
// Notion fct_degre2_symetrie du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts`). Le coach
// demande : l'axe au milieu des deux racines (ou de deux nombres de même image), et
// depuis le programme 2026 (parabole-image-egale.bank.ts) l'axe de ax² + bx + c en
// résolvant f(x) = c, sans formule, puis le sommet. L'extremum comme image de
// l'abscisse de l'axe, et la symétrie pour trouver une image ou un autre antécédent.
// Jamais de discriminant, de forme canonique ni de dérivée.
//
// ⭐ AUCUNE DONNÉE RÉELLE : toutes les formules sont des modèles ou des situations
// visiblement fictives (dont la température de l'ex. 16, un modèle assumé).
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; brasserie artisanale (brasseuse),
// rugby (buteur), architecture (tailleuse de pierre), énergie solaire (installateur),
// agronomie (agronome), comptabilité (comptable), théâtre (directrice), climat
// (climatologue) ; restauration (gérant de food-truck), transport (chauffeuse),
// préparation physique (préparatrice), marketing numérique (stagiaire).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-fonctions-2.mjs`.
//
// Micro-compétences : fct_d2_axe_symetrie (1, 2, 3, 10, 11, 13, 16, 17, 18, 19),
// fct_d2_axe_par_image_egale (4, 9, 14, 20), fct_d2_sommet_general (6, 9, 14, 20),
// fct_d2_extremum (5, 10, 11, 12, 13, 15, 16, 17, 18, 19),
// fct_d2_symetrie_images (7, 8, 11, 12, 13, 15, 16, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { repere, tableauVariations } from "@/lib/fiches-exercices/figures";
import { grille } from "@/lib/fiches-exercices/stmg-tableaux";

export const exercicesFctDegre2SymetrieStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "fct-degre2-symetrie",
  titre: "Degré 2 : axe de symétrie et extremum",
  accroche:
    "Vingt exercices pour se servir de la symétrie d'une parabole : trouver son axe au milieu des racines, calculer le maximum ou le minimum, retrouver une image sans calcul. Le bénéfice d'une brasserie, un coup de pied au rugby, des panneaux solaires, le prix d'un billet de théâtre, un camion sous une arche. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : le milieu des racines, l'image de l'axe, ou la symétrie.",
      rappel: [
        "L'axe de symétrie d'une parabole est la droite verticale qui passe par son sommet.",
        "Quand la parabole a deux racines, l'axe passe à leur milieu : son abscisse est $\\dfrac{x_1 + x_2}{2}$. Deux nombres de même image ont aussi l'axe pour milieu.",
        "L'extremum est atteint sur l'axe. Si $a > 0$, c'est un minimum ; si $a < 0$, c'est un maximum. Sa valeur est l'image de l'abscisse de l'axe.",
        "Deux nombres à la même distance de l'axe, de part et d'autre, ont la même image.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = (x - 2)(x - 6)$. Quelle est l'abscisse de l'axe de symétrie de sa parabole ?",
          reponses: [{ attendu: "4" }],
          correction:
            "Les racines sont $2$ et $6$.\nL'axe passe à leur milieu : $\\dfrac{2 + 6}{2} = 4$.\n⛔ Le piège : répondre 8, la somme. Il faut encore diviser par 2.\nRéponse : $4$.",
          micros: ["fct_d2_axe_symetrie"],
        },
        {
          enonce:
            "Soit $f(x) = -2(x + 3)(x - 1)$. Quelle est l'abscisse de l'axe de symétrie de sa parabole ?",
          reponses: [{ attendu: "-1" }],
          correction:
            "$x + 3 = 0$ donne $x = -3$, et $x - 1 = 0$ donne $x = 1$.\nLe milieu : $\\dfrac{-3 + 1}{2} = \\dfrac{-2}{2} = -1$.\nLe coefficient $-2$ ne change pas l'axe.\n⛔ Le piège : prendre $3$ et $-1$ pour racines. On trouve alors $1$, avec le mauvais signe.\nRéponse : $-1$.",
          micros: ["fct_d2_axe_symetrie"],
        },
        {
          enonce:
            "La courbe tracée est une parabole. Lis ses deux racines, puis donne l'abscisse de son axe de symétrie.",
          figure: repere([-2, 6, -6, 3], [{ q: [0.5, -2, -2.5] }]),
          reponses: [{ attendu: "2" }],
          correction:
            "La courbe coupe l'axe des abscisses en $-1$ et en $5$.\nLe milieu : $\\dfrac{-1 + 5}{2} = \\dfrac{4}{2} = 2$.\n⛔ Le piège : compter 3 en faisant $(5 + 1) \\div 2$. La racine $-1$ se compte avec son signe.\nRéponse : $2$.",
          micros: ["fct_d2_axe_symetrie"],
        },
        {
          enonce:
            "Soit $f(x) = 2x^2 - 8x + 3$. On a $f(1) = f(3)$. Quelle est l'abscisse de l'axe de symétrie de sa parabole ?",
          reponses: [{ attendu: "2" }],
          correction:
            "Deux nombres qui ont la même image encadrent l'axe.\nLe milieu de $1$ et $3$ : $\\dfrac{1 + 3}{2} = 2$.\n⛔ Le piège : répondre 4, la somme, ou chercher une formule avec $2$, $-8$ et $3$. Les deux nombres de même image suffisent.\nRéponse : $2$.",
          micros: ["fct_d2_axe_par_image_egale"],
        },
        {
          enonce:
            "Soit $f(x) = -(x - 1)(x - 3)$. La fonction $f$ a-t-elle un minimum ou un maximum ? Réponds minimum ou maximum.",
          reponses: [{ attendu: ["maximum", "un maximum", "le maximum"] }],
          correction:
            "Le coefficient devant le produit est $a = -1$, il est négatif.\nLa parabole est tournée vers le bas : son sommet est le point le plus haut.\n⛔ Le piège : croire qu'un signe moins donne un minimum. Une parabole tournée vers le bas monte puis redescend.\nRéponse : maximum.",
          micros: ["fct_d2_extremum"],
        },
        {
          enonce:
            "La parabole de $f(x) = x^2 - 6x + 5$ a pour axe la droite d'équation $x = 3$. Quelle est la valeur du minimum de $f$ ?",
          reponses: [{ attendu: "-4" }],
          correction:
            "Le minimum est atteint sur l'axe : on calcule l'image de $3$.\n$f(3) = 3^2 - 6 \\times 3 + 5 = 9 - 18 + 5 = -4$.\n⛔ Le piège : répondre 3. C'est l'endroit où le minimum est atteint, pas sa valeur.\nRéponse : $-4$.",
          micros: ["fct_d2_sommet_general"],
        },
        {
          enonce:
            "La parabole d'une fonction $f$ a pour axe la droite d'équation $x = 2$, et $f(0) = 5$. Que vaut $f(4)$ ?",
          reponses: [{ attendu: "5" }],
          correction:
            "$0$ et $4$ sont tous deux à la distance $2$ de l'axe $x = 2$.\nIls ont donc la même image : $f(4) = f(0) = 5$.\n⛔ Le piège : répondre 4 ou chercher une formule. La symétrie donne le résultat sans calcul.\nRéponse : $5$.",
          micros: ["fct_d2_symetrie_images"],
        },
        {
          enonce:
            "La parabole d'une fonction $f$ a pour axe la droite d'équation $x = 1$, et $f(-2) = 6$. Quel AUTRE nombre a pour image $6$ par $f$ ?",
          reponses: [{ attendu: "4" }],
          correction:
            "$-2$ est à la distance $3$ de l'axe : $1 - (-2) = 3$.\nOn reporte cette distance de l'autre côté : $1 + 3 = 4$.\n⛔ Le piège : répondre 2, l'opposé de $-2$. L'axe n'est pas en $0$, c'est la distance à $x = 1$ qui compte.\nRéponse : $4$.",
          micros: ["fct_d2_symetrie_images"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation : trouver l'axe, puis calculer l'image. Bien lire ce qui est demandé.",
      rappel: [
        "« Pour quelle quantité ? » demande une abscisse, celle de l'axe. « Quel est le maximum ? » demande une ordonnée, l'image de cette abscisse.",
        "Le coefficient $a$ ne change pas l'axe. Il dit si on a un maximum ou un minimum, et il compte dans le calcul de l'image.",
        "Pour trouver un autre antécédent : on mesure la distance à l'axe, on la reporte de l'autre côté.",
        "Pour $f(x) = ax^2 + bx + c$, on résout $f(x) = c$ : on enlève $c$ des deux côtés, on met $x$ en facteur. Une solution est $0$, l'axe passe au milieu des deux solutions.",
      ],
      exercices: [
        {
          enonce:
            "Élise, brasseuse, modélise son bénéfice mensuel, en euros, pour $x$ caisses vendues : $B(x) = -x^2 + 80x - 1\\,200$.\na) Résous l'équation $B(x) = -1\\,200$. Écris les deux solutions séparées par un point-virgule.\nb) Pour combien de caisses le bénéfice est-il maximal ?\nc) Quel est ce bénéfice maximal ?",
          reponses: [
            { question: "a)", attendu: "0 ; 80" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "400 €" },
          ],
          correction:
            "a) On ajoute $1\\,200$ des deux côtés : $-x^2 + 80x = 0$, soit $x(-x + 80) = 0$. Les solutions sont $0$ et $80$.\nb) L'axe passe à leur milieu : $\\dfrac{0 + 80}{2} = 40$. Comme $a = -1$ est négatif, c'est bien un maximum.\nc) $B(40) = -40^2 + 80 \\times 40 - 1\\,200 = -1\\,600 + 3\\,200 - 1\\,200 = 400$ €.\n⛔ Le piège : répondre 40 aux questions b) et c). L'une demande une quantité, l'autre un bénéfice.\nRéponse : a) $0$ et $80$ ; b) 40 caisses ; c) 400 €.",
          micros: ["fct_d2_axe_par_image_egale", "fct_d2_sommet_general"],
        },
        {
          enonce:
            "Un buteur de rugby tape un coup de pied haut (modèle). La hauteur du ballon, en mètres, à la distance $x$ du pied (en mètres), est $h(x) = -0{,}05x(x - 40)$.\na) À quelle distance le ballon est-il le plus haut ?\nb) Quelle hauteur maximale atteint-il ?",
          reponses: [
            { question: "a)", attendu: "20 m" },
            { question: "b)", attendu: "20 m" },
          ],
          correction:
            "a) Les racines sont $0$ et $40$ : $\\dfrac{0 + 40}{2} = 20$, soit 20 m.\nb) $h(20) = -0{,}05 \\times 20 \\times (20 - 40) = -0{,}05 \\times 20 \\times (-20) = 20$ m.\n⛔ Le piège au a) : oublier la racine $0$, car le facteur $x$ n'a pas de parenthèse. Ici les deux réponses valent 20 : c'est un hasard, l'une est une distance, l'autre une hauteur.\nRéponse : a) 20 m ; b) 20 m.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum"],
        },
        {
          enonce:
            "Agathe, tailleuse de pierre, restaure une arche (modèle). À l'abscisse $x$, en mètres, la hauteur en mètres est $h(x) = -0{,}5(x - 1)(x - 7)$, et $h(2) = 2{,}5$.\na) Quelle est l'abscisse de l'axe de symétrie ?\nb) Sans calcul, que vaut $h(6)$ ?\nc) Quelle est la hauteur maximale de l'arche ?",
          figure: repere([-1, 8, -1, 6], [{ q: [-0.5, 4, -3.5] }]),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2,5" },
            { question: "c)", attendu: "4,5 m" },
          ],
          correction:
            "a) $\\dfrac{1 + 7}{2} = 4$.\nb) $2$ et $6$ sont à la distance $2$ de l'axe $x = 4$ : $h(6) = h(2) = 2{,}5$.\nc) $h(4) = -0{,}5 \\times (4 - 1) \\times (4 - 7) = -0{,}5 \\times 3 \\times (-3) = 4{,}5$ m.\n⛔ Le piège au b) : refaire tout le calcul. La symétrie suffit, et elle se vérifie sur le dessin.\nRéponse : a) $4$ ; b) $2{,}5$ ; c) $4{,}5$ m.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          enonce:
            "Un installateur, Karim, étudie des panneaux solaires (modèle). La puissance produite en kW, à l'heure $t$, est $P(t) = -0{,}1(t - 7)(t - 19)$.\na) À quelle heure la production est-elle maximale ?\nb) Quelle est la puissance maximale ?\nc) On a $P(9) = 2$. À quelle autre heure la production vaut-elle aussi 2 kW ?",
          reponses: [
            { question: "a)", attendu: ["13", "13h00"] },
            { question: "b)", attendu: "3,6 kW" },
            { question: "c)", attendu: ["17", "17h00"] },
          ],
          correction:
            "a) $\\dfrac{7 + 19}{2} = 13$, soit 13 h 00.\nb) $P(13) = -0{,}1 \\times 6 \\times (-6) = 3{,}6$ kW.\nc) $9$ est à la distance $4$ de l'axe : $13 + 4 = 17$, soit 17 h 00.\n⛔ Le piège au c) : calculer $19 - 9$. On passe par l'axe, pas par la racine.\nRéponse : a) 13 h ; b) $3{,}6$ kW ; c) 17 h.",
          micros: ["fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          enonce:
            "Sarah, agronome, teste une dose d'engrais $x$, en dizaines de kg par hectare (modèle). Le tableau donne le gain de rendement $f(x)$, en quintaux par hectare, où $f$ est une fonction de degré 2.\na) Quelle est l'abscisse de l'axe de symétrie ?\nb) Quelle est la valeur du maximum de $f$ ?\nc) On sait que $f(0) = 0$. Que vaut $f(6)$ ?",
          figure: grille(["x", "1", "2", "3", "4"], [
            ["f(x)", 5, 8, 9, 8],
          ]),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "9" },
            { question: "c)", attendu: "0" },
          ],
          correction:
            "a) $f(2) = f(4) = 8$ : l'axe passe au milieu de $2$ et $4$, soit $\\dfrac{2 + 4}{2} = 3$.\nb) Le maximum est atteint sur l'axe : $f(3) = 9$.\nc) $0$ et $6$ sont à la distance $3$ de l'axe : $f(6) = f(0) = 0$.\n⛔ Le piège au a) : choisir 8, la valeur répétée. L'axe se lit sur les $x$, pas sur les images.\nRéponse : a) $3$ ; b) $9$ ; c) $0$.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          enonce:
            "Paul, comptable, suit l'écart au budget d'un service (modèle) : $E(x) = 2x^2 - 12x + 10$, en milliers d'euros, au mois $x$.\na) Résous l'équation $E(x) = 10$. Écris les deux solutions séparées par un point-virgule.\nb) Quelle est l'abscisse de l'axe de symétrie ?\nc) Cet écart a-t-il un minimum ou un maximum ? Réponds minimum ou maximum.\nd) Quelle est sa valeur ?",
          reponses: [
            { question: "a)", attendu: "0 ; 6" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: ["minimum", "un minimum", "le minimum"] },
            { question: "d)", attendu: "-8" },
          ],
          correction:
            "a) On enlève $10$ des deux côtés : $2x^2 - 12x = 0$, soit $x(2x - 12) = 0$. Donc $x = 0$ ou $2x - 12 = 0$, c'est-à-dire $x = 6$.\nb) $\\dfrac{0 + 6}{2} = 3$.\nc) $a = 2$ est positif : la parabole est tournée vers le haut, c'est un minimum.\nd) $E(3) = 2 \\times 9 - 12 \\times 3 + 10 = 18 - 36 + 10 = -8$.\n⛔ Le piège au a) : oublier la solution $0$. On met $x$ en facteur, on ne divise pas par $x$.\nRéponse : a) $0$ et $6$ ; b) $3$ ; c) minimum ; d) $-8$.",
          micros: ["fct_d2_axe_par_image_egale", "fct_d2_sommet_general"],
        },
        {
          enonce:
            "Olivia dirige un théâtre. La recette d'une soirée, en euros, pour un billet à $p$ euros, est $R(p) = -10p(p - 40)$ (modèle).\na) Pour quel prix la recette est-elle maximale ?\nb) Quelle est cette recette ?\nc) À 15 €, la recette vaut 3 750 €. Quel autre prix donne la même recette ?",
          reponses: [
            { question: "a)", attendu: "20 €" },
            { question: "b)", attendu: "4 000 €" },
            { question: "c)", attendu: "25 €" },
          ],
          correction:
            "a) Les racines sont $0$ et $40$ : $\\dfrac{0 + 40}{2} = 20$ €.\nb) $R(20) = -10 \\times 20 \\times (20 - 40) = -200 \\times (-20) = 4\\,000$ €.\nc) $15$ est à la distance $5$ de l'axe : $20 + 5 = 25$ €.\n⛔ Le piège au a) : croire que le billet le plus cher rapporte le plus. Au-delà de 20 €, la recette baisse d'après ce modèle.\nRéponse : a) 20 € ; b) 4 000 € ; c) 25 €.",
          micros: ["fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          enonce:
            "Pour un cours, Léon, climatologue, écrit un modèle de température moyenne, en °C, au mois $m$ : $T(m) = -0{,}5(m - 1)(m - 13)$. Ce modèle est fictif.\na) On a $T(3) = T(11)$. Quel mois se trouve sur l'axe de symétrie ? Donne son numéro.\nb) Quelle est la température maximale du modèle ?\nc) $T(5) = 16$. Quel autre mois a la même température ? Donne son numéro.",
          reponses: [
            { question: "a)", attendu: "7" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "9" },
          ],
          correction:
            "a) Le milieu de $3$ et $11$ : $\\dfrac{3 + 11}{2} = 7$.\nb) $T(7) = -0{,}5 \\times (7 - 1) \\times (7 - 13) = -0{,}5 \\times 6 \\times (-6) = 18$ °C.\nc) $5$ est à la distance $2$ de l'axe : $7 + 2 = 9$.\n⛔ Le piège au c) : répondre 11, la symétrique de 3. Chaque nombre a son propre symétrique.\nRéponse : a) 7 ; b) 18 °C ; c) 9.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : l'axe, l'extremum, puis la symétrie pour répondre vite.",
      rappel: [
        "Trois gestes dans l'ordre : les racines (ou les solutions de $f(x) = c$), le milieu, l'image du milieu.",
        "Le tableau de variations se déduit de l'axe : avec $a < 0$, la fonction croît avant l'axe et décroît après ; avec $a > 0$, c'est l'inverse.",
        "Une réponse se vérifie : le maximum doit être plus grand que les autres images calculées.",
      ],
      exercices: [
        {
          titre: "Le food-truck",
          enonce:
            "Ibrahim gère un food-truck. Son bénéfice par service, en euros, pour $x$ repas vendus, est $B(x) = -0{,}5(x - 10)(x - 70)$ (modèle).\na) Quelles sont les deux quantités où le bénéfice s'annule ? Écris-les séparées par un point-virgule.\nb) Pour combien de repas le bénéfice est-il maximal ?\nc) Quel est ce bénéfice maximal ?\nd) Pour 20 repas, le bénéfice vaut 250 €. Pour quelle autre quantité vaut-il aussi 250 € ?",
          reponses: [
            { question: "a)", attendu: "10 ; 70" },
            { question: "b)", attendu: "40" },
            { question: "c)", attendu: "450 €" },
            { question: "d)", attendu: "60" },
          ],
          correction:
            "a) $x - 10 = 0$ donne $10$, et $x - 70 = 0$ donne $70$.\nb) $\\dfrac{10 + 70}{2} = 40$, et $a = -0{,}5$ est négatif : c'est un maximum.\nc) $B(40) = -0{,}5 \\times 30 \\times (-30) = 450$ €.\nd) $20$ est à la distance $20$ de l'axe : $40 + 20 = 60$.\nLe tableau de variations ci-dessous résume l'étude entre 10 et 70 repas.\n⛔ Le piège au c) : oublier le $-0{,}5$ et répondre $-900$ ou $900$.\nRéponse : a) $10$ et $70$ ; b) 40 repas ; c) 450 € ; d) 60 repas.",
          schema: tableauVariations(["10", "40", "70"], ["0", "450", "0"], "B"),
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          titre: "Le camion sous l'arche",
          enonce:
            "Julie, chauffeuse, doit passer sous une arche (modèle), de profil $h(x) = -0{,}25(x + 4)(x - 4)$, en mètres, à la position $x$ (en mètres). Son camion fait 4 m de large et 3,5 m de haut, et il roule au milieu de l'arche.\na) Quelle est l'abscisse de l'axe de symétrie ?\nb) Quelle est la hauteur maximale de l'arche ?\nc) Le camion occupe l'espace de $x = -2$ à $x = 2$. Calcule $h(2)$.\nd) Que vaut $h(-2)$ ?\ne) Le camion passe-t-il ? Réponds oui ou non.",
          figure: repere([-5, 5, -2, 6], [{ q: [-0.25, 0, 4] }]),
          reponses: [
            { question: "a)", attendu: "0" },
            { question: "b)", attendu: "4 m" },
            { question: "c)", attendu: "3 m" },
            { question: "d)", attendu: "3 m" },
            { question: "e)", attendu: "non" },
          ],
          correction:
            "a) Les racines sont $-4$ et $4$ : $\\dfrac{-4 + 4}{2} = 0$.\nb) $h(0) = -0{,}25 \\times 4 \\times (-4) = 4$ m.\nc) $h(2) = -0{,}25 \\times 6 \\times (-2) = 3$ m.\nd) $-2$ et $2$ sont symétriques par rapport à l'axe : $h(-2) = 3$ m.\ne) Sur les bords du camion, l'arche ne fait que 3 m, et le camion fait 3,5 m : il ne passe pas.\n⛔ Le piège au e) : comparer 3,5 m à la hauteur maximale de 4 m. C'est au bord du camion que l'arche est la plus basse.\nRéponse : a) $0$ ; b) 4 m ; c) 3 m ; d) 3 m ; e) non.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          titre: "Deux athlètes",
          enonce:
            "Maya, préparatrice physique, modélise le gain de forme de deux athlètes, en points, selon $x$, le nombre d'heures d'entraînement par semaine : $P(x) = -2(x - 1)(x - 9)$ pour Noa et $Q(x) = -(x - 3)(x - 9)$ pour Rayan (modèle).\na) Pour combien d'heures le gain de Noa est-il maximal ?\nb) Quel est ce maximum ?\nc) Pour combien d'heures le gain de Rayan est-il maximal ?\nd) Quel est ce maximum ?\ne) $P(3) = 24$. Quel autre nombre d'heures donne le même gain à Noa ?\nf) Qui a le plus grand maximum ? Écris son prénom.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "32" },
            { question: "c)", attendu: "6" },
            { question: "d)", attendu: "9" },
            { question: "e)", attendu: "7" },
            { question: "f)", attendu: "Noa" },
          ],
          correction:
            "a) $\\dfrac{1 + 9}{2} = 5$ heures.\nb) $P(5) = -2 \\times 4 \\times (-4) = 32$.\nc) $\\dfrac{3 + 9}{2} = 6$ heures.\nd) $Q(6) = -3 \\times (-3) = 9$.\ne) $3$ est à la distance $2$ de l'axe $x = 5$ : $5 + 2 = 7$.\nf) $32$ est plus grand que $9$ : c'est Noa.\n⛔ Le piège au f) : comparer les abscisses 5 et 6. La question porte sur la valeur du maximum.\nRéponse : a) 5 ; b) $32$ ; c) 6 ; d) $9$ ; e) 7 ; f) Noa.",
          micros: ["fct_d2_axe_symetrie", "fct_d2_extremum", "fct_d2_symetrie_images"],
        },
        {
          titre: "La phrase du stagiaire",
          enonce:
            "Dans une entreprise d'applications, le gain mensuel pour $x$ milliers d'abonnés est $f(x) = -2x^2 + 80x - 600$, en euros (modèle). Le stagiaire Hugo écrit : « le maximum de $f$ vaut 20 ».\na) Résous l'équation $f(x) = -600$. Écris les deux solutions séparées par un point-virgule.\nb) Quelle est l'abscisse de l'axe de symétrie ?\nc) Calcule le maximum de $f$.\nd) La phrase d'Hugo est-elle juste ? Réponds oui ou non.\ne) $f(15) = 150$. Quel autre nombre a pour image $150$ ?",
          reponses: [
            { question: "a)", attendu: "0 ; 40" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "200" },
            { question: "d)", attendu: "non" },
            { question: "e)", attendu: "25" },
          ],
          correction:
            "a) On ajoute $600$ des deux côtés : $-2x^2 + 80x = 0$, soit $x(-2x + 80) = 0$. Les solutions sont $0$ et $40$.\nb) $\\dfrac{0 + 40}{2} = 20$.\nc) $a = -2$ est négatif : le maximum est atteint sur l'axe. $f(20) = -2 \\times 400 + 80 \\times 20 - 600 = -800 + 1\\,600 - 600 = 200$.\nd) Le maximum vaut 200, pas 20 : la phrase est fausse. Hugo a recopié l'abscisse à la place de l'image.\ne) $15$ est à la distance $5$ de l'axe : $20 + 5 = 25$.\n⛔ Le piège : confondre où le maximum est atteint et combien il vaut.\nRéponse : a) $0$ et $40$ ; b) $20$ ; c) $200$ ; d) non ; e) $25$.",
          micros: ["fct_d2_axe_par_image_egale", "fct_d2_sommet_general", "fct_d2_symetrie_images"],
        },
      ],
    },
  ],
};
