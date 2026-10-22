// ─── Fiche d'exercices : changement de variable (Tle STMG) — 20 exercices ────
//
// Cinquième et dernière feuille STMG « séries statistiques à deux variables »
// (22/10/2026), après le nuage, l'ajustement, les moindres carrés et
// l'interpolation (mêmes dessins, même ton). Alignée sur la banque
// `lib/tutor-v4/questionBank/stmg/maths/statistique-deux-variables.bank.ts`,
// notion stat_changement_variable : APPLIQUER un changement de variable donné
// ($u = x^2$, $z = 1/x$, $Y = \log y$, les trois exemples du BO), LIRE le nuage
// transformé et conjecturer qu'il est presque aligné, REVENIR aux variables de
// départ après l'ajustement affine.
// ⭐ Chaque famille a SES situations (la banque, 21/10) : $x^2$ pour une aire ou
// un freinage, $1/x$ pour un coût fixe partagé, $\log y$ pour une croissance
// ou une décroissance en pourcentage. Le logarithme est le logarithme décimal
// du programme de STMG ; ses valeurs sont arrondies au millième, et les
// droites de la calculatrice sont calculées sur ces valeurs arrondies.
//
// ⭐ LES DONNÉES RÉELLES, sourcées :
//   · ex. 10 — production d'électricité solaire en France (RTE, bilans
//     électriques, en TWh) : 7,4 ; 8,3 ; 9,2 ; 10,2 ; 11,6 ; 12,6 ; 14,3 ;
//     18,6 ; 21,6 (2015 → 2023) ;
//   · ex. 19 — transistors des processeurs Intel (fiches techniques Intel) :
//     4004 (1971) 2 300 ; 8086 (1978) 29 000 ; 80386 (1985) 275 000 ; Pentium
//     (1993) 3,1 millions ; Pentium 4 (2000) 42 millions ; Core 2 Duo (2006)
//     291 millions ; 80486 (1989) 1,2 million ; Apple M1 (2020) 16 milliards ;
//   · ex. 17 — distances de freinage sur route sèche, ordre de grandeur de
//     la Sécurité routière (modèle physique, proportionnel au carré de la
//     vitesse).
// Le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
// Métiers, un par exercice : paysagiste, gestionnaire de production,
// chargé de communication, contrôleuse de gestion, analyste marketing,
// responsable des achats, poseur de gazon, data analyst, pizzaiolo,
// analyste de la transition énergétique, responsable logistique,
// développeuse d'applications, gestionnaire de patrimoine, technicien en
// reconditionnement, pharmacologue, éditrice, monitrice d'auto-école,
// microbiologiste, ingénieure en microélectronique, gérante d'une société de
// navettes.
//
// ⭐ Les dessins : `nuage` et `grille`, de `stmg-deux-variables-figures.tsx`.
// 14 imprimés.
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-stat-changement-variable.mjs`
// (chaque valeur transformée, chaque droite de la calculatrice recalculée sur
// les valeurs arrondies annoncées, chaque retour aux variables de départ).
//
// Micro-compétences : statT_cv_appliquer (1, 2, 3, 9, 10, 11, 12, 14, 15, 16,
// 17, 18, 19, 20), statT_cv_lire (4, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20),
// statT_cv_revenir (5, 6, 7, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement, grille, nuage } from "@/lib/fiches-exercices/stmg-deux-variables-figures";

export const exercicesStatChangementVariableStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "stat-changement-variable",
  titre: "Changement de variable",
  accroche:
    "Vingt exercices, du geste seul au problème : quand le nuage se courbe, changer de variable ($x^2$, $1/x$ ou $\\log y$) pour le rendre presque aligné, ajuster par une droite, puis revenir aux variables de départ pour estimer. Le prix des pizzas, le solaire en France, le freinage d'une voiture, la croissance des bactéries, la loi de Moore, le prix d'une navette partagée. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le nuage transformé et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : calculer une variable transformée, lire le nuage transformé, ou revenir aux variables de départ.",
      rappel: [
        "Quand le nuage de $(x ; y)$ se courbe, on change de variable pour obtenir un nuage presque aligné, puis on l'ajuste par une droite.",
        "Trois changements : $u = x^2$ (une aire, un freinage), $z = \\dfrac{1}{x}$ (un coût fixe partagé), $Y = \\log y$ (une croissance en pourcentage).",
        "Le logarithme décimal : $\\log 10 = 1$, $\\log 100 = 2$, $\\log 1000 = 3$. Il transforme un produit par 10 en une addition de 1.",
        "Pour revenir : je remplace $u$ par $x^2$, $z$ par $\\dfrac{1}{x}$ ; et si $\\log y = ax + b$, alors $y = 10^{ax + b}$.",
      ],
      exercices: [
        {
          enonce:
            "Une paysagiste pose du gazon en rouleaux sur des pelouses carrées. Elle relève le côté $c$ de chaque pelouse, en mètres, et le prix de la pose, en euros.\na) Calcule $u = c^2$ pour chaque pelouse. Que représente $u$ ?\nb) Pourquoi le prix dépend-il de $c^2$ plutôt que de $c$ ?",
          figure: grille(["côté c (m)", "prix (€)"], [
            [2, 35],
            [3, 75],
            [4, 131],
            [5, 203],
            [6, 291],
          ]),
          correction:
            "a) $2^2 = 4$ ; $3^2 = 9$ ; $4^2 = 16$ ; $5^2 = 25$ ; $6^2 = 36$. $u$ est la surface de la pelouse, en m².\nb) Le gazon se vend au mètre carré : le prix suit la SURFACE. Quand le côté double, la surface est multipliée par 4.\n⛔ Le piège au a) : calculer $2 \\times c$ au lieu de $c^2$. $c^2 = c \\times c$ : $5^2 = 25$, pas 10.\nRéponse : a) 4, 9, 16, 25, 36 m² ; b) le prix suit la surface.",
          micros: ["statT_cv_appliquer"],
        },
        {
          enonce:
            "Un gestionnaire de production calcule le coût moyen d'une pièce, en euros, selon la quantité produite dans le mois, en centaines.\nQuantité : 1, 2, 3, 4, 5, 6. Coût moyen : 62, 32, 22, 17, 14, 12.\nCalcule $z = \\dfrac{1}{q}$ pour chaque quantité $q$. Arrondis au millième.",
          correction:
            "$\\dfrac{1}{1} = 1$ ; $\\dfrac{1}{2} = 0{,}5$ ; $\\dfrac{1}{3} \\approx 0{,}333$ ; $\\dfrac{1}{4} = 0{,}25$ ; $\\dfrac{1}{5} = 0{,}2$ ; $\\dfrac{1}{6} \\approx 0{,}167$.\n⭐ Plus on produit, plus $z$ est petit : le coût fixe de l'usine se partage entre davantage de pièces.\n⛔ Le piège : calculer $q - 1$ ou $\\dfrac{q}{1}$. L'inverse de 4 est $\\dfrac{1}{4} = 0{,}25$.\nRéponse : 1 ; 0,5 ; 0,333 ; 0,25 ; 0,2 ; 0,167.",
          schema: ecranSeulement(
            grille(["q", "coût moyen", "z = 1/q"], [
              [1, 62, 1],
              [2, 32, 0.5],
              [3, 22, 0.333],
              [4, 17, 0.25],
              [5, 14, 0.2],
              [6, 12, 0.167],
            ]),
          ),
          micros: ["statT_cv_appliquer"],
        },
        {
          enonce:
            "Un chargé de communication suit les vues d'une vidéo, jour après jour : 200 ; 800 ; 3 200 ; 12 800.\na) Calcule $Y = \\log y$ pour chaque jour. Arrondis au millième.\nb) Calcule les hausses de $Y$ d'un jour au suivant. Que remarques-tu ?",
          correction:
            "a) $\\log 200 \\approx 2{,}301$ ; $\\log 800 \\approx 2{,}903$ ; $\\log 3200 \\approx 3{,}505$ ; $\\log 12800 \\approx 4{,}107$.\nb) $2{,}903 - 2{,}301 = 0{,}602$ ; $3{,}505 - 2{,}903 = 0{,}602$ ; $4{,}107 - 3{,}505 = 0{,}602$. Les hausses de $Y$ sont constantes.\n⭐ Chaque jour, les vues sont multipliées par 4, et $\\log 4 \\approx 0{,}602$ : le logarithme change une multiplication en addition. Les points $(x ; Y)$ sont alignés.\n⛔ Le piège : chercher des hausses constantes dans les vues elles-mêmes : 600, 2 400, 9 600. Elles grandissent ; ce sont les QUOTIENTS qui sont constants.\nRéponse : a) 2,301 ; 2,903 ; 3,505 ; 4,107 ; b) des hausses constantes de 0,602.",
          schema: ecranSeulement(
            nuage([0, 5, 1, 2, 4.5, 0.5], [
              { x: 1, y: 2.301 },
              { x: 2, y: 2.903 },
              { x: 3, y: 3.505 },
              { x: 4, y: 4.107 },
            ], { noms: ["jour", "Y = log y"] }),
          ),
          micros: ["statT_cv_appliquer"],
        },
        {
          enonce:
            "Dans l'usine de l'exercice 2, une contrôleuse de gestion place les points $(z ; c)$, où $z = \\dfrac{1}{q}$ et $c$ est le coût moyen d'une pièce, en euros.\na) Les points du nuage transformé sont-ils presque alignés ?\nb) Quelle relation peut-on conjecturer entre $c$ et $z$ ?\nc) La droite passe par $(0 ; 2)$ et $(1 ; 62)$. Donne son équation.",
          figure: nuage([0, 1.2, 0.2, 0, 70, 10], [
            { x: 1, y: 62 },
            { x: 0.5, y: 32 },
            { x: 0.333, y: 22 },
            { x: 0.25, y: 17 },
            { x: 0.2, y: 14 },
            { x: 0.167, y: 12 },
          ], { noms: ["z = 1/q", "coût moyen (€)"] }),
          correction:
            "a) Oui : les six points sont sur une même droite, à l'arrondi près.\nb) $c$ est une fonction affine de $z$ : $c = az + b$.\nc) $a = \\dfrac{62 - 2}{1 - 0} = 60$ et $b = 2$ : $c = 60z + 2$.\n⭐ Le nuage $(q ; c)$, lui, se courbe : il descend vite puis s'aplatit. Le changement de variable l'a « redressé ».\n⛔ Le piège : conclure que $c$ est affine en $q$. C'est en $z = \\dfrac{1}{q}$ que le nuage est aligné, pas en $q$.\nRéponse : a) oui ; b) $c$ affine en $z$ ; c) $c = 60z + 2$.",
          micros: ["statT_cv_lire"],
        },
        {
          enonce:
            "Une analyste marketing suit les partages d'une publication, jour après jour. Elle a ajusté $Y = \\log y$ en fonction du jour $x$ par la droite $Y = 0{,}3x + 1$.\na) Exprime $y$ en fonction de $x$.\nb) Estime le nombre de partages le jour 2, puis le jour 5. Arrondis à l'unité.",
          correction:
            "a) $\\log y = 0{,}3x + 1$, donc $y = 10^{0{,}3x + 1}$.\nb) Jour 2 : $y = 10^{0{,}3 \\times 2 + 1} = 10^{1{,}6} \\approx 40$ partages.\nJour 5 : $y = 10^{0{,}3 \\times 5 + 1} = 10^{2{,}5} \\approx 316$ partages.\n⛔ Le piège : s'arrêter à $Y = 1{,}6$ et annoncer 1,6 partage. $Y$ est le LOGARITHME du nombre de partages : il faut revenir à $y = 10^{Y}$.\nRéponse : a) $y = 10^{0{,}3x + 1}$ ; b) environ 40, puis 316 partages.",
          schema: ecranSeulement(
            nuage([0, 6, 1, 0, 3, 0.5], [], { noms: ["jour", "Y = log y"], droites: [[0.3, 1]], lectures: [{ x: 2 }, { x: 5 }] }),
          ),
          micros: ["statT_cv_revenir"],
        },
        {
          enonce:
            "Un responsable des achats reprend l'ajustement de l'exercice 4 : $c = 60z + 2$, avec $z = \\dfrac{1}{q}$, où $q$ est la quantité produite en centaines et $c$ le coût moyen d'une pièce en euros.\na) Exprime $c$ en fonction de $q$.\nb) Quel coût moyen prévoir pour 800 pièces ? Pour 150 pièces ?\nc) Que devient le coût moyen quand la production devient très grande ?",
          correction:
            "a) Je remplace $z$ par $\\dfrac{1}{q}$ : $c = \\dfrac{60}{q} + 2$.\nb) 800 pièces : $q = 8$, $c = \\dfrac{60}{8} + 2 = 7{,}5 + 2 = 9{,}5$ €.\n150 pièces : $q = 1{,}5$, $c = \\dfrac{60}{1{,}5} + 2 = 40 + 2 = 42$ €.\nc) $\\dfrac{60}{q}$ devient très petit : le coût moyen se rapproche de 2 €, le coût de la matière de chaque pièce. Les 60 centaines d'euros de coûts fixes se partagent entre de plus en plus de pièces.\n⛔ Le piège au b) : remplacer $q$ par 800. La quantité est comptée en centaines.\nRéponse : a) $c = \\dfrac{60}{q} + 2$ ; b) 9,50 € et 42 € ; c) il se rapproche de 2 €.",
          schema: ecranSeulement(
            nuage([0, 10, 1, 0, 70, 10], [
              { x: 1, y: 62 },
              { x: 1.5, y: 42 },
              { x: 2, y: 32 },
              { x: 3, y: 22 },
              { x: 4, y: 17 },
              { x: 5, y: 14 },
              { x: 6, y: 12 },
              { x: 8, y: 9.5 },
            ], { noms: ["quantité (centaines)", "coût moyen (€)"] }),
          ),
          micros: ["statT_cv_revenir"],
        },
        {
          enonce:
            "Un poseur de gazon, collègue de la paysagiste de l'exercice 1, a ajusté le prix de la pose $p$, en euros, en fonction de la surface $u = c^2$ : $p = 8u + 3$.\na) Exprime $p$ en fonction du côté $c$.\nb) Quel prix pour une pelouse carrée de 7 m de côté ? De 10 m ?\nc) Le côté passe de 5 m à 10 m. Le prix double-t-il ?",
          correction:
            "a) Je remplace $u$ par $c^2$ : $p = 8c^2 + 3$.\nb) $c = 7$ : $p = 8 \\times 49 + 3 = 392 + 3 = 395$ €. $c = 10$ : $p = 8 \\times 100 + 3 = 803$ €.\nc) À 5 m : $8 \\times 25 + 3 = 203$ €. À 10 m : 803 €, presque 4 fois plus : la surface est multipliée par 4, pas par 2.\n⛔ Le piège au b) : calculer $8 \\times 7 + 3 = 59$. On ajuste en $u = c^2$ : il faut d'abord élever le côté au carré.\nRéponse : a) $p = 8c^2 + 3$ ; b) 395 € et 803 € ; c) non, presque 4 fois plus.",
          schema: ecranSeulement(
            nuage([0, 40, 5, 0, 350, 50], [
              { x: 4, y: 35 },
              { x: 9, y: 75 },
              { x: 16, y: 131 },
              { x: 25, y: 203 },
              { x: 36, y: 291 },
            ], { noms: ["surface u (m²)", "prix (€)"], droites: [[8, 3]] }),
          ),
          micros: ["statT_cv_revenir"],
        },
        {
          enonce:
            "Un data analyst suit le nombre d'utilisateurs actifs d'un réseau social, en milliers, à la fin de chacun des six premiers mois : 12 ; 18 ; 27 ; 40 ; 61 ; 91. Il a placé les points $(x ; Y)$, avec $Y = \\log y$ arrondi au millième : 1,079 ; 1,255 ; 1,431 ; 1,602 ; 1,785 ; 1,959.\na) Le nuage transformé est-il presque aligné ?\nb) Calcule les hausses de $Y$. Que peut-on conjecturer sur l'évolution de $y$ ?\nc) $10^{0{,}176} \\approx 1{,}5$. Traduis en pourcentage.",
          figure: nuage([0, 7, 1, 1, 2.2, 0.2], [
            { x: 1, y: 1.079 },
            { x: 2, y: 1.255 },
            { x: 3, y: 1.431 },
            { x: 4, y: 1.602 },
            { x: 5, y: 1.785 },
            { x: 6, y: 1.959 },
          ], { noms: ["rang du mois", "Y = log y"] }),
          correction:
            "a) Oui : les six points se rapprochent d'une droite.\nb) $0{,}176$ ; $0{,}176$ ; $0{,}171$ ; $0{,}183$ ; $0{,}174$ : des hausses presque constantes, autour de $0{,}176$.\nAjouter $0{,}176$ au logarithme, c'est multiplier $y$ par $10^{0{,}176}$ : chaque mois, le nombre d'utilisateurs est multiplié par un même nombre.\nc) Multiplier par $1{,}5$, c'est augmenter de 50 % par mois.\n⛔ Le piège : conclure que $y$ augmente « de 0,176 millier par mois ». Une hausse constante de $\\log y$ est une hausse constante en POURCENTAGE de $y$.\nRéponse : a) oui ; b) $y$ est multiplié par un même nombre chaque mois ; c) + 50 % par mois.",
          micros: ["statT_cv_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une série complète : je transforme une variable, je vérifie que le nouveau nuage est presque aligné, j'utilise la droite de la calculatrice, puis je reviens aux variables de départ.",
      rappel: [
        "J'écris toujours la nouvelle variable : « on pose $u = x^2$ », « on pose $Y = \\log y$ ».",
        "La calculatrice ajuste la NOUVELLE variable : la droite relie $u$ et $y$, ou $x$ et $Y$, pas $x$ et $y$.",
        "Si $\\log y = ax + b$, alors $y = 10^{b} \\times (10^{a})^{x}$ : $y$ est multiplié par $10^{a}$ quand $x$ augmente de 1.",
        "J'arrondis les valeurs transformées comme l'énoncé l'annonce, et je garde ces arrondis jusqu'au bout.",
      ],
      exercices: [
        {
          enonce:
            "Un pizzaiolo cherche à fixer ses prix de façon cohérente. Voici ceux de ses quatre tailles de pizza.\na) On pose $u = d^2$, où $d$ est le diamètre. Calcule $u$ pour chaque pizza.\nb) Le nuage $(u ; p)$ est dessiné dans la correction. Est-il presque aligné ?\nc) La calculatrice donne $p = 0{,}0108u + 0{,}72$ ($a$ au dix-millième, $b$ au centième). Exprime $p$ en fonction de $d$.\nd) Quel prix pour une pizza de 36 cm ? Arrondis au centime.",
          figure: grille(["diamètre d (cm)", "prix p (€)"], [
            [26, 8],
            [30, 10.5],
            [34, 13],
            [40, 18],
          ]),
          correction:
            "a) $26^2 = 676$ ; $30^2 = 900$ ; $34^2 = 1156$ ; $40^2 = 1600$.\nb) Oui : les quatre points $(u ; p)$ se rapprochent d'une droite. Le prix suit la SURFACE de la pizza, proportionnelle à $d^2$.\nc) Je remplace $u$ par $d^2$ : $p = 0{,}0108d^2 + 0{,}72$.\nd) $p = 0{,}0108 \\times 36^2 + 0{,}72 = 0{,}0108 \\times 1296 + 0{,}72 = 13{,}9968 + 0{,}72 \\approx 14{,}72$ €.\n⭐ La 40 cm coûte $18 \\div 8 = 2{,}25$ fois la 26 cm : c'est juste, sa surface est $1600 \\div 676 \\approx 2{,}37$ fois plus grande.\n⛔ Le piège au d) : remplacer $u$ par 36. Ici $u = d^2 = 1296$.\nRéponse : a) 676, 900, 1 156, 1 600 ; b) oui ; c) $p = 0{,}0108d^2 + 0{,}72$ ; d) environ 14,72 €.",
          schema: ecranSeulement(
            nuage([600, 1800, 200, 6, 20, 2], [
              { x: 676, y: 8 },
              { x: 900, y: 10.5 },
              { x: 1156, y: 13 },
              { x: 1600, y: 18 },
            ], { noms: ["u = d²", "prix (€)"], droites: [[0.0108, 0.72]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          enonce:
            "Un analyste de la transition énergétique étudie la production d'électricité solaire en France (source : RTE). On note $x$ le rang de l'année (2015 a le rang 0) et $Y = \\log y$, arrondi au millième.\na) Calcule les deux valeurs de $Y$ manquantes.\nb) Le nuage $(x ; Y)$ est-il presque aligné ?\nc) La calculatrice donne $Y = 0{,}0564x + 0{,}8503$ (coefficients au dix-millième). Exprime $y$ en fonction de $x$.\nd) Calcule $10^{0{,}0564}$ au millième. De quel pourcentage la production augmente-t-elle chaque année, selon ce modèle ?\ne) Que donne le modèle pour 2019 ? RTE a mesuré 11,6 TWh.",
          figure: grille(["année", "solaire (TWh)", "Y = log y"], [
            [2015, 7.4, "?"],
            [2016, 8.3, 0.919],
            [2017, 9.2, 0.964],
            [2018, 10.2, 1.009],
            [2019, 11.6, 1.064],
            [2020, 12.6, 1.1],
            [2021, 14.3, 1.155],
            [2022, 18.6, 1.27],
            [2023, 21.6, "?"],
          ]),
          correction:
            "a) $\\log 7{,}4 \\approx 0{,}869$ et $\\log 21{,}6 \\approx 1{,}334$.\nb) Oui : les points montent presque régulièrement, avec un bond en 2022, année d'installations record.\nc) $\\log y = 0{,}0564x + 0{,}8503$, donc $y = 10^{0{,}0564x + 0{,}8503}$.\nd) $10^{0{,}0564} \\approx 1{,}139$ : chaque année, la production est multipliée par environ 1,139, soit une hausse d'environ 13,9 % par an.\ne) 2019 : $x = 4$. $y = 10^{0{,}0564 \\times 4 + 0{,}8503} = 10^{1{,}0759} \\approx 11{,}9$ TWh, contre 11,6 mesurés : le modèle est proche.\n⛔ Le piège au d) : lire 0,0564 comme une hausse de 5,64 %. Le coefficient porte sur le LOGARITHME ; le multiplicateur est $10^{0{,}0564}$.\nRéponse : a) 0,869 et 1,334 ; b) oui ; c) $y = 10^{0{,}0564x + 0{,}8503}$ ; d) environ + 13,9 % par an ; e) environ 11,9 TWh.",
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          enonce:
            "Un responsable logistique étudie la durée d'une livraison, en heures, selon la vitesse moyenne du camion, en km/h, sur un même trajet.\na) On pose $z = \\dfrac{1}{v}$. Calcule $z$ pour chaque vitesse, au dix-millième.\nb) Le nuage $(z ; t)$ est-il presque aligné ?\nc) La calculatrice, avec les valeurs exactes de $z$, donne $t = 240z + 0{,}5$. Exprime $t$ en fonction de $v$.\nd) Que représentent 240 et 0,5 ?\ne) Quelle durée prévoir à 90 km/h ? Donne-la en heures et minutes.",
          figure: grille(["vitesse v (km/h)", "durée t (h)"], [
            [40, 6.5],
            [60, 4.5],
            [80, 3.5],
            [100, 2.9],
            [120, 2.5],
          ]),
          correction:
            "a) $\\dfrac{1}{40} = 0{,}025$ ; $\\dfrac{1}{60} \\approx 0{,}0167$ ; $\\dfrac{1}{80} = 0{,}0125$ ; $\\dfrac{1}{100} = 0{,}01$ ; $\\dfrac{1}{120} \\approx 0{,}0083$.\nb) Oui : les cinq points sont alignés.\nc) Je remplace $z$ par $\\dfrac{1}{v}$ : $t = \\dfrac{240}{v} + 0{,}5$.\nd) $\\dfrac{240}{v}$ est le temps de route pour 240 km : le trajet fait 240 km. 0,5 h, soit 30 minutes, ne dépend pas de la vitesse : le chargement et le déchargement.\ne) $t = \\dfrac{240}{90} + 0{,}5 \\approx 2{,}667 + 0{,}5 = 3{,}167$ h. $0{,}167$ h, c'est $0{,}167 \\times 60 \\approx 10$ minutes : environ 3 h 10 min.\n⛔ Le piège au e) : écrire 3,17 h = 3 h 17 min. Une heure compte 60 minutes, pas 100.\nRéponse : c) $t = \\dfrac{240}{v} + 0{,}5$ ; d) 240 km et 30 min de chargement ; e) environ 3 h 10 min.",
          schema: ecranSeulement(
            nuage([0, 0.03, 0.005, 0, 7, 1], [
              { x: 0.025, y: 6.5 },
              { x: 0.0167, y: 4.5 },
              { x: 0.0125, y: 3.5 },
              { x: 0.01, y: 2.9 },
              { x: 0.0083, y: 2.5 },
            ], { noms: ["z = 1/v", "durée (h)"], droites: [[240, 0.5]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          enonce:
            "Une fleuriste compose des bouquets ronds. Elle relève le diamètre du bouquet et le nombre de fleurs.\nDiamètre (cm) : 20, 30, 40, 50, 60. Fleurs : 13, 28, 50, 79, 113.\nElle hésite entre deux changements de variable : $u = d^2$, ou $Y = \\log y$.\na) Calcule $u$ pour chaque bouquet, puis $Y$ au millième.\nb) Calcule les hausses de $Y$ d'un bouquet au suivant. Sont-elles à peu près constantes ?\nc) Calcule, d'un bouquet au suivant, la hausse du nombre de fleurs divisée par la hausse de $u$. Au millième. Conclus : quel changement de variable choisir ?",
          correction:
            "a) $u$ : 400 ; 900 ; 1 600 ; 2 500 ; 3 600. $Y$ : $1{,}114$ ; $1{,}447$ ; $1{,}699$ ; $1{,}898$ ; $2{,}053$.\nb) $0{,}333$ ; $0{,}252$ ; $0{,}199$ ; $0{,}155$ : elles diminuent nettement. Le nuage $(d ; Y)$ se courbe.\nc) $\\dfrac{15}{500} = 0{,}03$ ; $\\dfrac{22}{700} \\approx 0{,}031$ ; $\\dfrac{29}{900} \\approx 0{,}032$ ; $\\dfrac{34}{1100} \\approx 0{,}031$ : presque constant. Le nuage $(u ; y)$ est presque aligné : on choisit $u = d^2$.\n⭐ C'est logique : le nombre de fleurs suit la SURFACE du bouquet, pas une croissance en pourcentage.\n⛔ Le piège : choisir le logarithme dès que le nuage de départ se courbe vers le haut. On teste, et on garde le changement qui aligne vraiment les points.\nRéponse : a) voir les listes ; b) non ; c) environ 0,03 à chaque fois, donc $u = d^2$.",
          schema: ecranSeulement(
            nuage([0, 4000, 500, 0, 120, 20], [
              { x: 400, y: 13 },
              { x: 900, y: 28 },
              { x: 1600, y: 50 },
              { x: 2500, y: 79 },
              { x: 3600, y: 113 },
            ], { noms: ["u = d²", "fleurs"] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire"],
        },
        {
          enonce:
            "Une gestionnaire de patrimoine modélise la valeur d'un placement, en euros, au bout de $x$ années : $\\log y = 0{,}0414x + 3$.\na) Exprime $y$ en fonction de $x$. Quelle est la valeur de départ ?\nb) Calcule $10^{0{,}0414}$ au centième. Quel est le taux d'intérêt annuel ?\nc) Quelle valeur au bout de 10 ans ? Arrondis à l'euro.\nd) Au bout de combien d'années le placement aura-t-il doublé ? Utilise $\\log 2000 \\approx 3{,}301$.",
          correction:
            "a) $y = 10^{0{,}0414x + 3}$. Pour $x = 0$ : $y = 10^{3} = 1000$ €.\nb) $10^{0{,}0414} \\approx 1{,}10$ : la valeur est multipliée par 1,10 chaque année, un taux de 10 % par an.\nc) $y = 10^{0{,}0414 \\times 10 + 3} = 10^{3{,}414} \\approx 2594$ €.\nd) Je résous $0{,}0414x + 3 = 3{,}301$ : $0{,}0414x = 0{,}301$, donc $x = 0{,}301 \\div 0{,}0414 \\approx 7{,}27$. Le placement double au cours de la 8e année.\n⛔ Le piège au c) : calculer $0{,}0414 \\times 10 + 3 = 3{,}414$ et annoncer 3,414 €. C'est le logarithme de la valeur.\nRéponse : a) $y = 10^{0{,}0414x + 3}$, 1 000 € ; b) 10 % ; c) environ 2 594 € ; d) au cours de la 8e année.",
          schema: ecranSeulement(
            nuage([0, 12, 2, 2.8, 3.6, 0.1], [], { noms: ["années", "log y"], droites: [[0.0414, 3]], lectures: [{ x: 10 }] }),
          ),
          micros: ["statT_cv_revenir"],
        },
        {
          enonce:
            "Un technicien en reconditionnement de smartphones relève le prix de revente moyen d'un modèle selon son âge.\na) Calcule $Y = \\log y$ pour chaque âge, au millième.\nb) La calculatrice, sur ces valeurs arrondies, donne $Y = -0{,}0967x + 2{,}9028$. Exprime $y$ en fonction de l'âge $x$.\nc) Calcule $10^{-0{,}0967}$ au centième. Traduis en pourcentage.\nd) Quel prix de revente prévoir à 6 ans ? Arrondis à l'euro.",
          figure: grille(["âge x (ans)", "prix y (€)"], [
            [0, 800],
            [1, 640],
            [2, 512],
            [3, 410],
            [4, 328],
          ]),
          correction:
            "a) $\\log 800 \\approx 2{,}903$ ; $\\log 640 \\approx 2{,}806$ ; $\\log 512 \\approx 2{,}709$ ; $\\log 410 \\approx 2{,}613$ ; $\\log 328 \\approx 2{,}516$.\nb) $y = 10^{-0{,}0967x + 2{,}9028}$.\nc) $10^{-0{,}0967} \\approx 0{,}80$ : chaque année, le prix est multiplié par 0,80, une baisse de 20 % par an.\nd) $y = 10^{-0{,}0967 \\times 6 + 2{,}9028} = 10^{2{,}3226} \\approx 210$ €.\n⛔ Le piège au c) : traduire 0,80 par « baisse de 80 % ». Multiplier par 0,80, c'est garder 80 % : on perd 20 %.\nRéponse : b) $y = 10^{-0{,}0967x + 2{,}9028}$ ; c) − 20 % par an ; d) environ 210 €.",
          micros: ["statT_cv_appliquer", "statT_cv_revenir"],
        },
        {
          enonce:
            "Une pharmacologue mesure la concentration d'un médicament dans le sang, en mg/L, heure après heure après une injection.\na) Calcule $Y = \\log C$ pour chaque mesure, au millième.\nb) La calculatrice, sur ces valeurs arrondies, donne $Y = -0{,}1551t + 1{,}6022$. Exprime $C$ en fonction de $t$.\nc) Calcule $10^{-0{,}1551}$ au centième. Que perd le sang chaque heure ?\nd) Le médicament n'agit plus sous 5 mg/L. Avec $\\log 5 \\approx 0{,}699$, trouve au bout de combien de temps, en heures et minutes.",
          figure: grille(["temps t (h)", "concentration C (mg/L)"], [
            [0, 40],
            [1, 28],
            [2, 19.6],
            [3, 13.7],
            [4, 9.6],
            [5, 6.7],
          ]),
          correction:
            "a) $1{,}602$ ; $1{,}447$ ; $1{,}292$ ; $1{,}137$ ; $0{,}982$ ; $0{,}826$.\nb) $C = 10^{-0{,}1551t + 1{,}6022}$.\nc) $10^{-0{,}1551} \\approx 0{,}70$ : chaque heure, la concentration est multipliée par 0,70. Le sang perd 30 % du médicament par heure.\nd) Je résous $-0{,}1551t + 1{,}6022 = 0{,}699$ : $0{,}1551t = 0{,}9032$, donc $t = 0{,}9032 \\div 0{,}1551 \\approx 5{,}82$ h. $0{,}82 \\times 60 \\approx 49$ minutes : environ 5 h 49 min.\n⛔ Le piège au d) : résoudre $-0{,}1551t + 1{,}6022 = 5$. On compare des logarithmes : il faut $\\log 5$, pas 5.\nRéponse : b) $C = 10^{-0{,}1551t + 1{,}6022}$ ; c) 30 % par heure ; d) environ 5 h 49 min.",
          micros: ["statT_cv_appliquer", "statT_cv_revenir"],
        },
        {
          enonce:
            "Une éditrice étudie le coût d'impression d'un livre, par exemplaire, selon le tirage, en milliers d'exemplaires.\na) On pose $z = \\dfrac{1}{n}$. Calcule $z$ pour chaque tirage $n$.\nb) Le nuage $(z ; c)$ est-il presque aligné ?\nc) La calculatrice donne $c = 8{,}22z + 2{,}93$ (coefficients au centième). Exprime $c$ en fonction de $n$.\nd) Quel coût par exemplaire pour un tirage de 8 000 ? Arrondis au centime.\ne) Que représentent 8,22 et 2,93 ?",
          figure: grille(["tirage n (milliers)", "coût c (€)"], [
            [1, 11.2],
            [2, 6.9],
            [4, 5.1],
            [5, 4.5],
            [10, 3.8],
          ]),
          correction:
            "a) $1$ ; $0{,}5$ ; $0{,}25$ ; $0{,}2$ ; $0{,}1$.\nb) Oui : les cinq points $(z ; c)$ se rapprochent d'une droite.\nc) $c = \\dfrac{8{,}22}{n} + 2{,}93$.\nd) $n = 8$ : $c = \\dfrac{8{,}22}{8} + 2{,}93 = 1{,}0275 + 2{,}93 \\approx 3{,}96$ €.\ne) 2,93 € : le coût de chaque exemplaire (papier, encre), même pour un très grand tirage. 8,22 : les frais fixes (mise en page, calage des machines), environ 8 220 €, partagés entre les $n$ milliers d'exemplaires.\n⛔ Le piège au d) : remplacer $n$ par 8 000. Le tirage est compté en milliers.\nRéponse : c) $c = \\dfrac{8{,}22}{n} + 2{,}93$ ; d) environ 3,96 € ; e) frais fixes et coût par exemplaire.",
          schema: ecranSeulement(
            nuage([0, 1.2, 0.2, 0, 12, 2], [
              { x: 1, y: 11.2 },
              { x: 0.5, y: 6.9 },
              { x: 0.25, y: 5.1 },
              { x: 0.2, y: 4.5 },
              { x: 0.1, y: 3.8 },
            ], { noms: ["z = 1/n", "coût (€)"], droites: [[8.22, 2.93]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation complète : je choisis et j'applique le changement de variable, je vérifie l'alignement, j'utilise la droite de la calculatrice, je reviens aux variables de départ, puis je discute le résultat.",
      rappel: [
        "Le choix se fait d'après la situation : une aire ou un freinage, $x^2$ ; un coût fixe partagé, $\\dfrac{1}{x}$ ; un pourcentage constant, $\\log y$.",
        "La droite de la calculatrice relie les variables transformées ; je reviens toujours aux variables de départ avant de conclure.",
        "Une estimation loin des données reste une extrapolation, même après un changement de variable.",
      ],
      exercices: [
        {
          titre: "Le freinage",
          enonce:
            "Une monitrice d'auto-école veut montrer à ses élèves l'effet de la vitesse sur la distance de freinage, sur route sèche (ordre de grandeur de la Sécurité routière). On note $x$ la vitesse en dizaines de km/h et $d$ la distance de freinage en mètres.\na) Calcule $x$, puis $u = x^2$, pour chaque vitesse.\nb) Le nuage $(u ; d)$ est-il presque aligné ?\nc) La calculatrice donne $d = 0{,}49u - 0{,}02$ (coefficients au centième). Exprime $d$ en fonction de $x$.\nd) Estime la distance de freinage à 80 km/h.\ne) Compare les distances à 50 et à 100 km/h. Que dire à un élève qui roule deux fois plus vite ?",
          figure: grille(["vitesse (km/h)", "freinage d (m)"], [
            [30, 4.4],
            [50, 12.3],
            [70, 24.1],
            [90, 39.9],
            [110, 59.6],
            [130, 83.2],
          ]),
          correction:
            "a) $x$ : 3, 5, 7, 9, 11, 13. $u = x^2$ : 9, 25, 49, 81, 121, 169.\nb) Oui : les six points $(u ; d)$ sont presque sur une droite. Le nuage $(x ; d)$, lui, se courbe vers le haut.\nc) Je remplace $u$ par $x^2$ : $d = 0{,}49x^2 - 0{,}02$.\nd) 80 km/h : $x = 8$. $d = 0{,}49 \\times 64 - 0{,}02 = 31{,}36 - 0{,}02 = 31{,}34$ m, soit environ 31 m.\ne) À 50 km/h : $d = 0{,}49 \\times 25 - 0{,}02 = 12{,}23$ m. À 100 km/h : $d = 0{,}49 \\times 100 - 0{,}02 = 48{,}98$ m. $48{,}98 \\div 12{,}23 \\approx 4$ : à vitesse double, la distance de freinage est multipliée par 4.\n⭐ Il faut encore y ajouter la distance parcourue pendant le temps de réaction, avant même de freiner.\n⛔ Le piège au d) : remplacer $x$ par 80. La vitesse est comptée en dizaines de km/h : $x = 8$, et $u = 64$.\nRéponse : c) $d = 0{,}49x^2 - 0{,}02$ ; d) environ 31 m ; e) quatre fois plus de distance.",
          schema: ecranSeulement(
            nuage([0, 180, 20, 0, 90, 15], [
              { x: 9, y: 4.4 },
              { x: 25, y: 12.3 },
              { x: 49, y: 24.1 },
              { x: 81, y: 39.9 },
              { x: 121, y: 59.6 },
              { x: 169, y: 83.2 },
            ], { noms: ["u = x²", "freinage (m)"], droites: [[0.49, -0.02]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          titre: "Les bactéries",
          enonce:
            "Un microbiologiste compte des bactéries dans un milieu de culture, en bactéries par mL, toutes les heures.\na) Calcule $Y = \\log N$ pour chaque mesure, au millième.\nb) Calcule les hausses de $Y$. Avec $\\log 2 \\approx 0{,}301$, que peut-on conjecturer ?\nc) La calculatrice, sur ces valeurs arrondies, donne $Y = 0{,}3006t + 3{,}0024$. Exprime $N$ en fonction de $t$.\nd) Estime le nombre de bactéries au bout de 2 h 30.\ne) Que donne le modèle au bout de 10 h ? Est-ce crédible ?",
          figure: grille(["temps t (h)", "bactéries N (par mL)"], [
            [0, "1 000"],
            [1, "2 000"],
            [2, "4 100"],
            [3, "7 900"],
            [4, "16 200"],
            [5, "31 800"],
          ]),
          correction:
            "a) $3$ ; $3{,}301$ ; $3{,}613$ ; $3{,}898$ ; $4{,}21$ ; $4{,}502$.\nb) $0{,}301$ ; $0{,}312$ ; $0{,}285$ ; $0{,}312$ ; $0{,}292$ : environ $0{,}3$, soit $\\log 2$. Chaque heure, le nombre de bactéries double.\nc) $N = 10^{0{,}3006t + 3{,}0024}$.\nd) $t = 2{,}5$ : $N = 10^{0{,}3006 \\times 2{,}5 + 3{,}0024} = 10^{3{,}7539} \\approx 5674$ bactéries par mL.\ne) $t = 10$ : $N = 10^{6{,}0084} \\approx 1\\,020\\,000$, plus d'un million. Extrapolation douteuse : dans un milieu fermé, la nourriture s'épuise et la croissance finit par s'arrêter.\n⛔ Le piège au b) : croire que les bactéries augmentent de 0,3 par heure. C'est le LOGARITHME qui augmente de $0{,}3$ : le nombre, lui, est multiplié par $10^{0{,}3} \\approx 2$.\nRéponse : b) un doublement par heure ; c) $N = 10^{0{,}3006t + 3{,}0024}$ ; d) environ 5 674 ; e) environ 1 020 000, peu crédible.",
          schema: ecranSeulement(
            nuage([0, 6, 1, 2.8, 4.8, 0.4], [
              { x: 0, y: 3 },
              { x: 1, y: 3.301 },
              { x: 2, y: 3.613 },
              { x: 3, y: 3.898 },
              { x: 4, y: 4.21 },
              { x: 5, y: 4.502 },
            ], { noms: ["temps (h)", "Y = log N"], droites: [[0.3006, 3.0024]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          titre: "La loi de Moore",
          enonce:
            "Une ingénieure en microélectronique présente la loi de Moore : le nombre de transistors d'un processeur double environ tous les deux ans. Elle relève six processeurs Intel (source : fiches techniques d'Intel). On note $x$ le nombre d'années depuis 1970 et $Y = \\log y$, où $y$ est le nombre de transistors.\na) Calcule $x$ et $Y$, au millième, pour chaque processeur.\nb) La calculatrice, sur ces valeurs arrondies, donne $Y = 0{,}1447x + 3{,}2483$. Exprime $y$ en fonction de $x$.\nc) Calcule $10^{0{,}1447}$ au millième. Quelle hausse annuelle ? Avec $\\log 2 \\approx 0{,}301$, en combien d'années le nombre de transistors double-t-il ?\nd) Estime le nombre de transistors en 1989. L'Intel 80486, sorti cette année-là, en comptait 1,2 million.\ne) Que prévoit le modèle pour 2020 ? L'Apple M1 de 2020 en compte 16 milliards. Conclus.",
          figure: grille(["année", "processeur", "transistors"], [
            [1971, "4004", "2 300"],
            [1978, "8086", "29 000"],
            [1985, "80386", "275 000"],
            [1993, "Pentium", "3 100 000"],
            [2000, "Pentium 4", "42 000 000"],
            [2006, "Core 2 Duo", "291 000 000"],
          ]),
          correction:
            "a) $x$ : 1, 8, 15, 23, 30, 36. $Y$ : $3{,}362$ ; $4{,}462$ ; $5{,}439$ ; $6{,}491$ ; $7{,}623$ ; $8{,}464$. Le nuage $(x ; Y)$ est presque aligné.\nb) $y = 10^{0{,}1447x + 3{,}2483}$.\nc) $10^{0{,}1447} \\approx 1{,}395$ : environ 39,5 % de transistors en plus chaque année.\nDoubler, c'est ajouter $\\log 2 \\approx 0{,}301$ au logarithme : $0{,}301 \\div 0{,}1447 \\approx 2{,}08$ ans. La loi de Moore se vérifie : environ tous les deux ans.\nd) 1989 : $x = 19$. $y = 10^{0{,}1447 \\times 19 + 3{,}2483} = 10^{5{,}9976} \\approx 994\\,000$, environ un million, proche des 1,2 million du 80486.\ne) 2020 : $x = 50$. $y = 10^{0{,}1447 \\times 50 + 3{,}2483} = 10^{10{,}4833} \\approx 3{,}04 \\times 10^{10}$, environ 30 milliards : presque le double des 16 milliards réels. Le rythme a ralenti : les transistors approchent la taille de quelques atomes.\n⛔ Le piège au c) : prendre 0,1447 pour une hausse de 14,47 %. Le multiplicateur annuel est $10^{0{,}1447}$.\nRéponse : b) $y = 10^{0{,}1447x + 3{,}2483}$ ; c) + 39,5 % par an, doublement en 2 ans environ ; d) environ 994 000 ; e) environ 30 milliards, le modèle surestime.",
          schema: ecranSeulement(
            nuage([0, 40, 5, 3, 9, 1], [
              { x: 1, y: 3.362 },
              { x: 8, y: 4.462 },
              { x: 15, y: 5.439 },
              { x: 23, y: 6.491 },
              { x: 30, y: 7.623 },
              { x: 36, y: 8.464 },
            ], { noms: ["années depuis 1970", "Y = log y"], droites: [[0.1447, 3.2483]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
        {
          titre: "La navette partagée",
          enonce:
            "La gérante d'une société de navettes vers l'aéroport affiche le prix par passager selon le nombre de passagers qui partagent le trajet.\nPassagers : 1, 2, 3, 4, 6, 8. Prix par passager (€) : 38, 20, 14, 11, 8, 6,5.\na) Le nuage $(n ; p)$ ci-dessous est-il presque aligné ?\nb) On pose $z = \\dfrac{1}{n}$. Calcule $z$ au millième.\nc) La calculatrice, avec les valeurs exactes de $z$, donne $p = 36z + 2$. Exprime $p$ en fonction de $n$.\nd) Que représentent 36 et 2 ?\ne) Combien de passagers faut-il, au moins, pour que chacun paie moins de 7 € ?",
          figure: nuage([0, 9, 1, 0, 40, 5], [
            { x: 1, y: 38 },
            { x: 2, y: 20 },
            { x: 3, y: 14 },
            { x: 4, y: 11 },
            { x: 6, y: 8 },
            { x: 8, y: 6.5 },
          ], { noms: ["passagers", "prix par passager (€)"] }),
          correction:
            "a) Non : le nuage descend très vite, puis s'aplatit. Il se courbe.\nb) $z$ : $1$ ; $0{,}5$ ; $0{,}333$ ; $0{,}25$ ; $0{,}167$ ; $0{,}125$. Le nuage $(z ; p)$, lui, est aligné.\nc) $p = \\dfrac{36}{n} + 2$.\nd) 36 € : le prix de la course, partagé entre les $n$ passagers. 2 € : des frais payés par chaque passager, quel que soit leur nombre.\ne) $\\dfrac{36}{n} + 2 < 7$ donne $\\dfrac{36}{n} < 5$, donc $n > 36 \\div 5 = 7{,}2$. Il faut au moins 8 passagers.\n⭐ La recette de la course vaut $n \\times p = 36 + 2n$ : 52 € avec 8 passagers.\n⛔ Le piège au e) : répondre 7 passagers. Avec 7, chacun paie $\\dfrac{36}{7} + 2 \\approx 7{,}14$ €, plus de 7 €.\nRéponse : a) non ; c) $p = \\dfrac{36}{n} + 2$ ; d) la course et les frais par passager ; e) 8 passagers.",
          schema: ecranSeulement(
            nuage([0, 1.2, 0.2, 0, 40, 5], [
              { x: 1, y: 38 },
              { x: 0.5, y: 20 },
              { x: 0.333, y: 14 },
              { x: 0.25, y: 11 },
              { x: 0.167, y: 8 },
              { x: 0.125, y: 6.5 },
            ], { noms: ["z = 1/n", "prix par passager (€)"], droites: [[36, 2]] }),
          ),
          micros: ["statT_cv_appliquer", "statT_cv_lire", "statT_cv_revenir"],
        },
      ],
    },
  ],
};
