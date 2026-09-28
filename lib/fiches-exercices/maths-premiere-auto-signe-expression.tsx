// ─── Fiche d'exercices : le signe d'une expression (1re, automatismes) ────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (épreuve anticipée, première partie,
// SANS CALCULATRICE), sur le modèle de l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-algebre.bank.ts`.
// L'exercice 2 est celui des Centres étrangers (juin 2026) : $(2x+4)(-3x-9) = 0$.
//
// ⛔ PAS DE DISCRIMINANT : il n'est pas au programme de la première sans
// spécialité. Le signe d'une expression du second degré se lit TOUJOURS sur sa
// forme FACTORISÉE, par un tableau de signes (une ligne par facteur).
//
// ⭐⭐ LE FIL : UNE QUESTION DE SIGNE SE CACHE PARTOUT. « Bénéficiaire »,
// « excédent », « il gèle », « moins cher » : chaque fois, on demande si une
// quantité est positive ou négative. Les exercices 9, 10, 17, 18, 19 et 20 sont
// bâtis sur cette traduction.
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (tableaux de signes, droites et paraboles dans un repère :
// « positif » se lit « au-dessus de l'axe ») et un lien à l'ÉCONOMIE ou à
// l'HISTOIRE-GÉO (seuil de rentabilité, recette, solde commercial, altitude du
// gel, population, prix d'équilibre). Les chiffres sont des MODÈLES arrondis,
// jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-signe-expression.mjs`
// (il relit aussi chaque tableau de signes et le refait facteur par facteur).
//
// Micro-compétences : auto_alg_produit_nul (1, 2, 3, 11, 12, 16, 17, 18),
// auto_alg_signe_premier_degre (4, 5, 6, 9, 10, 13, 19, 20),
// auto_alg_signe_factorisee (7, 8, 11, 14, 15, 17, 18). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau, tableauSignes } from "@/lib/fiches-exercices/figures";

export const exercicesAutoSigneExpressionPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-signe-expression",
  titre: "Le signe d'une expression",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : résoudre une équation produit nul, trouver le signe de $ax + b$, dresser le tableau de signes d'un produit. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Produit nul : $A \\times B = 0$ quand $A = 0$ ou $B = 0$. On résout chaque facteur séparément.",
        "$ax + b$ s'annule en $x = -\\dfrac{b}{a}$. Elle a le signe de $a$ APRÈS cette valeur, le signe contraire AVANT.",
        "Pour un produit de facteurs : une ligne par facteur dans le tableau, puis la règle des signes colonne par colonne.",
      ],
      exercices: [
        {
          enonce: "Résoudre l'équation $(x - 3)(x + 5) = 0$.",
          correction:
            "Un produit est nul quand l'un de ses facteurs est nul.\nPremier facteur : $x - 3 = 0$ donne $x = 3$.\nSecond facteur : $x + 5 = 0$ donne $x = -5$.\nLes solutions sont $-5$ et $3$.\n⚠️ Le piège : recopier les nombres des parenthèses, $-3$ et $5$. On RÉSOUT chaque équation, et les signes s'inversent.",
          micros: ["auto_alg_produit_nul"],
        },
        {
          enonce: "Résoudre l'équation $(2x + 4)(-3x - 9) = 0$.",
          correction:
            "Un produit est nul quand l'un de ses facteurs est nul.\n$2x + 4 = 0$ donne $2x = -4$, donc $x = -2$.\n$-3x - 9 = 0$ donne $-3x = 9$, donc $x = \\dfrac{9}{-3} = -3$.\nLes solutions sont $-3$ et $-2$.\n⚠️ On divise par $-3$, signe compris : $x = -3$, et non $3$.\n⭐ C'est la question du sujet des Centres étrangers, en juin 2026.",
          micros: ["auto_alg_produit_nul"],
        },
        {
          enonce: "Résoudre l'équation $x(5x - 10) = 0$.",
          correction:
            "Le produit a deux facteurs : $x$ et $5x - 10$.\nPremier facteur : $x = 0$.\nSecond facteur : $5x - 10 = 0$ donne $5x = 10$, donc $x = 2$.\nLes solutions sont $0$ et $2$.\n⛔ Diviser les deux membres par $x$ ferait PERDRE la solution $0$. On ne divise jamais par une expression qui peut être nulle.",
          micros: ["auto_alg_produit_nul"],
        },
        {
          enonce: "Étudier le signe de $2x - 6$ selon les valeurs de $x$.",
          correction:
            "On cherche d'abord où l'expression s'annule : $2x - 6 = 0$ donne $x = 3$.\nLe coefficient de $x$ est $2$, positif : l'expression AUGMENTE quand $x$ augmente.\nElle est donc négative avant $3$, nulle en $3$, positive après.\n✔️ Test rapide : pour $x = 0$, $2 \\times 0 - 6 = -6$, négatif. C'est cohérent.\n⭐ Règle : $ax + b$ a le signe de $a$ APRÈS sa racine.",
          schema: tableauSignes(["−∞", "3", "+∞"], [["$2x - 6$", ["-", "+"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce: "Étudier le signe de $-3x + 12$ selon les valeurs de $x$.",
          correction:
            "Racine : $-3x + 12 = 0$ donne $-3x = -12$, donc $x = 4$.\nLe coefficient de $x$ est $-3$, négatif : l'expression DIMINUE quand $x$ augmente.\nElle est positive avant $4$, nulle en $4$, négative après.\n✔️ Test : pour $x = 0$, on trouve $12$, positif.\n⚠️ Le piège : répondre « positive après $4$ » par réflexe. C'est le signe de $a$ qui décide.",
          schema: tableauSignes(["−∞", "4", "+∞"], [["$-3x + 12$", ["+", "-"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce: "Pour quelles valeurs de $x$ l'expression $5 - x$ est-elle strictement positive ?",
          correction:
            "On écrit l'expression dans l'ordre habituel : $5 - x = -x + 5$. Ici $a = -1$, négatif.\nRacine : $5 - x = 0$ donne $x = 5$.\nComme $a < 0$, l'expression est positive AVANT $5$.\nRéponse : $5 - x > 0$ pour $x < 5$.\n⭐ Sur le dessin, la droite $y = 5 - x$ est au-dessus de l'axe des abscisses tant que $x < 5$. « Positif » se lit « au-dessus de l'axe ».",
          schema: repere([-2, 8, -3, 7], [{ q: [0, -1, 5] }], [{ x: 5, y: 0, label: "5" }]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce: "Dresser le tableau de signes de $(x - 1)(x + 2)$.",
          correction:
            "Chaque facteur est du premier degré : on cherche sa racine.\n$x - 1 = 0$ pour $x = 1$ ; $x + 2 = 0$ pour $x = -2$.\nOn range les racines dans l'ordre sur la ligne des $x$ : d'abord $-2$, puis $1$.\nLes deux facteurs ont un coefficient $1$, positif : chacun est négatif avant sa racine, positif après.\nRègle des signes, colonne par colonne : $(-) \\times (-) = +$, puis $(+) \\times (-) = -$, puis $(+) \\times (+) = +$.\nLe produit est négatif entre $-2$ et $1$, positif à l'extérieur.\n⚠️ Une ligne PAR FACTEUR, puis la ligne du produit. On ne devine pas le signe du produit d'un coup.",
          schema: tableauSignes(["−∞", "−2", "1", "+∞"], [
            ["$x + 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 1$", ["-", "-", "+"], ["", "0"]],
            ["$(x - 1)(x + 2)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce: "Pour quelles valeurs de $x$ le produit $(3 - x)(x + 4)$ est-il positif ?",
          correction:
            "Racines : $3 - x = 0$ pour $x = 3$ ; $x + 4 = 0$ pour $x = -4$.\n$x + 4$ a un coefficient positif : négatif avant $-4$, positif après.\n$3 - x$ a un coefficient $-1$, négatif : positif AVANT $3$, négatif après.\nAvant $-4$ : $(+) \\times (-) = -$. Entre $-4$ et $3$ : $(+) \\times (+) = +$. Après $3$ : $(-) \\times (+) = -$.\nLe produit est positif pour $-4 < x < 3$ (et nul en $-4$ et en $3$).\n⚠️ Le facteur $3 - x$ « tourne à l'envers » : c'est lui qui retourne le résultat habituel.\n⭐ Sa courbe est une parabole tournée vers le bas : au-dessus de l'axe ENTRE ses deux racines.",
          schema: tableauSignes(["−∞", "−4", "3", "+∞"], [
            ["$x + 4$", ["-", "+", "+"], ["0", ""]],
            ["$3 - x$", ["+", "+", "-"], ["", "0"]],
            ["$(3 - x)(x + 4)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["auto_alg_signe_factorisee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la question en signe, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "« Bénéficiaire », « excédent », « il gèle », « la population augmente » : ce sont des questions de SIGNE ($> 0$ ou $< 0$).",
        "On cherche la racine (là où l'expression vaut $0$), puis on regarde le signe du coefficient de la variable.",
        "Sur un graphique : positif = courbe AU-DESSUS de l'axe des abscisses ; négatif = EN DESSOUS.",
      ],
      exercices: [
        {
          titre: "Le seuil de rentabilité",
          enonce:
            "Une artisane fabrique des bols. Chaque bol vendu lui rapporte $4$ € de marge, et elle paie $200$ € de frais fixes par mois (loyer de l'atelier, électricité). Pour $x$ bols vendus dans le mois, son bénéfice est $B(x) = 4x - 200$ euros. À partir de combien de bols vendus est-elle bénéficiaire ?",
          correction:
            "Être bénéficiaire, c'est avoir $B(x) > 0$ : c'est une question de SIGNE.\nRacine : $4x - 200 = 0$ donne $x = \\dfrac{200}{4} = 50$.\nLe coefficient $4$ est positif : $B(x)$ est négatif avant $50$, positif après.\nÀ $50$ bols, elle ne gagne rien et ne perd rien. Elle est bénéficiaire à partir de $51$ bols.\n⭐ Ce nombre $50$ s'appelle le SEUIL DE RENTABILITÉ : tout commerçant le calcule avant d'ouvrir.",
          schema: tableauSignes(["0", "50", "+∞"], [["$4x - 200$", ["-", "+"], ["0"]]]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          titre: "Où commence le gel ?",
          enonce:
            "Dans un modèle simplifié, la température baisse d'environ $6$ °C chaque fois qu'on monte d'un kilomètre. Un jour de printemps, il fait $9$ °C au pied d'une montagne. À $h$ kilomètres au-dessus du pied, la température est $T(h) = 9 - 6h$ degrés. À partir de quelle altitude gèle-t-il, c'est-à-dire $T(h) < 0$ ?",
          correction:
            "« Il gèle » veut dire « la température est négative » : c'est une question de signe.\nRacine : $9 - 6h = 0$ donne $6h = 9$, soit $h = \\dfrac{9}{6} = 1{,}5$.\nLe coefficient de $h$ est $-6$, négatif : $T(h)$ est positive avant $1{,}5$, négative après.\nIl gèle à partir de $1{,}5$ km au-dessus du pied, soit $1\\,500$ m.\n⚠️ En résolvant $9 - 6h < 0$ comme une inéquation, on divise par $-6$ : le sens de l'inégalité se RETOURNE. La règle du signe de $a$ évite ce piège.",
          schema: tableauSignes(["0", "1,5", "+∞"], [["$9 - 6h$", ["+", "-"], ["0"]]], "h"),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce:
            "La courbe ci-dessous représente la fonction $f(x) = (x + 1)(x - 3)$.\na) Lire les abscisses des points où la courbe coupe l'axe des abscisses. Les retrouver par le calcul.\nb) Lire sur le dessin le signe de $f(x)$, puis le justifier par la règle des signes.",
          figure: repere([-3, 5, -5, 6], [{ q: [1, -2, -3] }], [], undefined, true),
          correction:
            "a) Sur le dessin, la courbe coupe l'axe en $-1$ et en $3$.\nPar le calcul : $(x + 1)(x - 3) = 0$ quand $x + 1 = 0$ ou $x - 3 = 0$, soit $x = -1$ ou $x = 3$.\nb) La courbe est SOUS l'axe entre $-1$ et $3$ : $f(x) < 0$. Elle est au-dessus à l'extérieur : $f(x) > 0$.\nJustification : entre $-1$ et $3$, $x + 1$ est positif et $x - 3$ est négatif. Un produit de signes contraires est négatif.\n⭐ Le dessin et le calcul disent la même chose. Le calcul donne les valeurs EXACTES ; le dessin aide à ne pas se tromper de sens.",
          schema: tableauSignes(["−∞", "−1", "3", "+∞"], [
            ["$x + 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 3$", ["-", "-", "+"], ["", "0"]],
            ["$f(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["auto_alg_produit_nul", "auto_alg_signe_factorisee"],
        },
        {
          titre: "Le prix qui fait tout perdre",
          enonce:
            "Un vendeur de sweat-shirts observe que, s'il les vend $x$ euros pièce, il en vend $60 - 2x$ par semaine. Sa recette est donc $R(x) = x(60 - 2x)$ euros.\na) Pour quels prix la recette est-elle nulle ? Expliquer chaque réponse par une phrase.\nb) Calculer $R(10)$ et $R(20)$.",
          correction:
            "a) $R(x)$ est un produit : il est nul quand $x = 0$ ou quand $60 - 2x = 0$.\n$60 - 2x = 0$ donne $2x = 60$, soit $x = 30$.\nÀ $0$ €, il donne ses sweat-shirts : la recette est nulle.\nÀ $30$ €, il en vend $60 - 60 = 0$ : personne n'achète, la recette est nulle aussi.\nb) $R(10) = 10 \\times (60 - 20) = 10 \\times 40 = 400$ €.\n$R(20) = 20 \\times (60 - 40) = 20 \\times 20 = 400$ €.\n⭐ Deux prix très différents, la même recette : vendre beaucoup pas cher, ou moins mais plus cher.",
          schema: tableau(["prix (€)", "0", "10", "20", "30"], ["recette (€)", 0, 400, 400, 0]),
          micros: ["auto_alg_produit_nul"],
        },
        {
          titre: "Une ville qui grandit, puis rétrécit",
          enonce:
            "Dans un modèle, la population d'une ville moyenne varie chaque année de $v(t) = 3 - 0{,}5t$ milliers d'habitants, $t$ années après 2020. Quand $v(t) > 0$, la population augmente ; quand $v(t) < 0$, elle diminue. Jusqu'en quelle année la population augmente-t-elle ?",
          correction:
            "Racine : $3 - 0{,}5t = 0$ donne $0{,}5t = 3$, soit $t = \\dfrac{3}{0{,}5} = 6$.\nLe coefficient de $t$ est $-0{,}5$, négatif : $v(t)$ est positif avant $6$, négatif après.\nLa population augmente jusqu'en $2020 + 6 = 2026$, puis elle diminue.\n⚠️ Une variation négative ne veut pas dire une population négative : la ville PERD des habitants, elle en a encore beaucoup.\n⭐ Diviser par $0{,}5$, c'est multiplier par $2$ : $3 \\div 0{,}5 = 6$.",
          schema: tableauSignes(["0", "6", "+∞"], [["$3 - 0{,}5t$", ["+", "-"], ["0"]]], "t"),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          enonce: "Résoudre l'inéquation $(2x - 1)(x + 3) < 0$ à l'aide d'un tableau de signes.",
          correction:
            "Racines : $2x - 1 = 0$ donne $x = \\dfrac{1}{2}$ ; $x + 3 = 0$ donne $x = -3$.\nOn range : $-3$, puis $\\dfrac{1}{2}$.\nLes deux facteurs ont un coefficient positif ($2$ et $1$) : chacun est négatif avant sa racine, positif après.\nLe produit est positif avant $-3$, négatif entre $-3$ et $\\dfrac{1}{2}$, positif après $\\dfrac{1}{2}$.\nL'inéquation demande « strictement négatif » : les solutions sont les $x$ tels que $-3 < x < \\dfrac{1}{2}$.\n⚠️ $2x - 1 = 0$ donne $x = \\dfrac{1}{2}$, et non $x = 2$ ou $x = 1$.\n⚠️ L'inégalité est stricte : $-3$ et $\\dfrac{1}{2}$ annulent le produit, ils ne sont PAS solutions.",
          schema: tableauSignes(["−∞", "−3", "$\\dfrac{1}{2}$", "+∞"], [
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$2x - 1$", ["-", "-", "+"], ["", "0"]],
            ["$(2x - 1)(x + 3)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce: "On pose $P(x) = 3(x + 2)(x - 4)$ et $Q(x) = -3(x + 2)(x - 4)$. Donner le signe de $P(x)$, puis celui de $Q(x)$.",
          correction:
            "Racines communes : $x + 2 = 0$ pour $x = -2$ ; $x - 4 = 0$ pour $x = 4$.\nLe produit $(x + 2)(x - 4)$ est positif à l'extérieur de $-2$ et $4$, négatif entre les deux.\nLe facteur $3$ est toujours positif : il ne change aucun signe. $P(x)$ est négatif pour $-2 < x < 4$, positif à l'extérieur.\nLe facteur $-3$ est toujours négatif : il retourne TOUS les signes. $Q(x)$ est positif pour $-2 < x < 4$, négatif à l'extérieur.\n⭐ Un nombre devant les parenthèses compte comme un facteur : une ligne de plus dans le tableau, avec un seul signe partout.",
          schema: tableauSignes(["−∞", "−2", "4", "+∞"], [
            ["$x + 2$", ["-", "+", "+"], ["0", ""]],
            ["$x - 4$", ["-", "-", "+"], ["", "0"]],
            ["$P(x)$", ["+", "-", "+"], ["0", "0"]],
            ["$-3$", ["-", "-", "-"], ["", ""]],
            ["$Q(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["auto_alg_signe_factorisee"],
        },
        {
          enonce: "a) Résoudre l'équation $x^2 = 7x$.\nb) Résoudre l'équation $x^2 - 16 = 0$ en factorisant.",
          correction:
            "a) On ramène tout d'un côté : $x^2 - 7x = 0$.\nOn factorise par $x$ : $x(x - 7) = 0$.\nProduit nul : $x = 0$ ou $x = 7$.\n⛔ Diviser par $x$ donnerait seulement $x = 7$ : on perdrait la solution $0$.\nb) $x^2 - 16 = x^2 - 4^2 = (x - 4)(x + 4)$.\nProduit nul : $x = 4$ ou $x = -4$.\n⚠️ $x^2 = 16$ a DEUX solutions : $4$ et $-4$, car $(-4)^2 = 16$ aussi.",
          micros: ["auto_alg_produit_nul"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On traduit la question en signe : « gagner », « excédent », « moins cher » deviennent $> 0$ ; « perdre », « déficit » deviennent $< 0$.",
        "Racines d'abord (produit nul), tableau de signes ensuite, phrase de conclusion enfin, avec l'unité de l'énoncé.",
      ],
      exercices: [
        {
          titre: "Le prix du billet",
          enonce:
            "Une association organise un concert. D'après son étude, si le billet coûte $p$ euros, son bénéfice est $B(p) = (p - 5)(25 - p)$ centaines d'euros (modèle).\na) Pour quels prix le bénéfice est-il nul ?\nb) Dresser le tableau de signes de $B(p)$ pour $p$ entre $0$ et $30$.\nc) Pour quels prix l'association gagne-t-elle de l'argent ?\nd) Calculer $B(10)$, $B(15)$ et $B(20)$. Quel prix conseiller ?",
          correction:
            "a) Produit nul : $p - 5 = 0$ ou $25 - p = 0$, soit $p = 5$ ou $p = 25$.\nb) $p - 5$ est négatif avant $5$, positif après (coefficient $1$).\n$25 - p$ est positif avant $25$, négatif après (coefficient $-1$).\nRègle des signes : $B(p)$ est négatif entre $0$ et $5$, positif entre $5$ et $25$, négatif entre $25$ et $30$.\nc) L'association gagne de l'argent pour un billet entre $5$ € et $25$ € (bornes exclues).\nd) $B(10) = 5 \\times 15 = 75$, $B(15) = 10 \\times 10 = 100$, $B(20) = 15 \\times 5 = 75$.\nSoit $7\\,500$ €, $10\\,000$ € et $7\\,500$ € : parmi ces trois prix, on conseille $15$ €.\n⭐ Trop bon marché, on ne couvre pas les frais ; trop cher, la salle se vide. Le bon prix est entre les deux racines.",
          schema: (
            <>
              {tableauSignes(["0", "5", "25", "30"], [
                ["$p - 5$", ["-", "+", "+"], ["0", ""]],
                ["$25 - p$", ["+", "+", "-"], ["", "0"]],
                ["$B(p)$", ["-", "+", "-"], ["0", "0"]],
              ], "p")}
              {diagramme("barres", [
                { label: "10 €", value: 75 },
                { label: "15 €", value: 100 },
                { label: "20 €", value: 75 },
              ])}
            </>
          ),
          micros: ["auto_alg_produit_nul", "auto_alg_signe_factorisee"],
        },
        {
          titre: "Excédent ou déficit ?",
          enonce:
            "Dans un modèle, le solde commercial d'un pays (ses exportations moins ses importations) vaut $s(t) = (t - 3)(t - 8)$ milliards d'euros, $t$ années après 2010, pour $t$ entre $0$ et $11$.\na) Calculer $s(0)$. En 2010, le pays était-il en excédent ou en déficit ?\nb) En quelles années le solde est-il nul ?\nc) Dresser le tableau de signes de $s(t)$. Pendant quelle période le pays est-il en déficit ?",
          correction:
            "a) $s(0) = (0 - 3)(0 - 8) = (-3) \\times (-8) = 24$. Le solde est positif : en 2010, le pays était en EXCÉDENT de $24$ milliards.\nb) Produit nul : $t = 3$ ou $t = 8$, soit en $2013$ et en $2018$.\nc) Les deux facteurs ont un coefficient positif : négatifs avant leur racine, positifs après.\nAvant $3$ : $(-) \\times (-) = +$. Entre $3$ et $8$ : $(+) \\times (-) = -$. Après $8$ : $(+) \\times (+) = +$.\nLe pays est en déficit entre 2013 et 2018, puis revient en excédent.\n⭐ Sur la courbe, le déficit se voit : c'est le moment où elle passe SOUS l'axe.\n⚠️ $s(0) = 24$ : $(-3) \\times (-8)$ est POSITIF. Moins par moins donne plus.",
          schema: (
            <>
              {tableauSignes(["0", "3", "8", "11"], [
                ["$t - 3$", ["-", "+", "+"], ["0", ""]],
                ["$t - 8$", ["-", "-", "+"], ["", "0"]],
                ["$s(t)$", ["+", "-", "+"], ["0", "0"]],
              ], "t")}
              {repere([-1, 11, -7, 7], [{ q: [1, -11, 24] }], [{ x: 3, y: 0, label: "2013" }, { x: 8, y: 0, label: "2018" }], undefined, true)}
            </>
          ),
          micros: ["auto_alg_produit_nul", "auto_alg_signe_factorisee"],
        },
        {
          titre: "Deux offres d'électricité",
          enonce:
            "Deux fournisseurs proposent (tarifs inventés) : offre $A$, $150$ € d'abonnement par an plus $0{,}20$ € par kWh ; offre $B$, $90$ € d'abonnement plus $0{,}25$ € par kWh.\na) Calculer le coût de chaque offre pour $1\\,000$ kWh consommés dans l'année.\nb) Pour $x$ kWh, exprimer $A(x)$, $B(x)$, puis la différence $D(x) = A(x) - B(x)$.\nc) Étudier le signe de $D(x)$. Quelle offre conseiller, selon la consommation ?",
          correction:
            "a) $A$ : $150 + 0{,}20 \\times 1\\,000 = 150 + 200 = 350$ €. $B$ : $90 + 0{,}25 \\times 1\\,000 = 90 + 250 = 340$ €.\nb) $A(x) = 150 + 0{,}2x$ et $B(x) = 90 + 0{,}25x$.\n$D(x) = 150 + 0{,}2x - 90 - 0{,}25x = 60 - 0{,}05x$.\nc) Racine : $0{,}05x = 60$, soit $x = \\dfrac{60}{0{,}05} = \\dfrac{6\\,000}{5} = 1\\,200$.\nLe coefficient $-0{,}05$ est négatif : $D(x)$ est positif avant $1\\,200$, négatif après.\n$D(x) > 0$ veut dire « $A$ coûte plus cher que $B$ ».\nConclusion : en dessous de $1\\,200$ kWh par an, choisir $B$ ; au-dessus, choisir $A$.\n⭐ Pour diviser par $0{,}05$, on multiplie le haut et le bas par $100$.",
          schema: tableau(["consommation (kWh)", "800", "1 200", "1 600"], ["A − B (€)", 20, 0, -20]),
          micros: ["auto_alg_signe_premier_degre"],
        },
        {
          titre: "Le marché des fraises",
          enonce:
            "Sur un marché, quand le kilo de fraises coûte $p$ euros, les clients veulent acheter $D(p) = 50 - p$ kilos (la demande), et les producteurs veulent vendre $O(p) = 2p - 10$ kilos (l'offre), pour $p$ entre $5$ et $50$ (modèle).\na) Montrer que $D(p) - O(p) = 60 - 3p$, puis étudier son signe.\nb) Pour quels prix manque-t-il des fraises ?\nc) Quel est le prix d'équilibre ? Combien de kilos s'échangent alors, et quelle est la recette des producteurs ?",
          correction:
            "a) $D(p) - O(p) = 50 - p - (2p - 10) = 50 - p - 2p + 10 = 60 - 3p$.\n⚠️ Le moins devant la parenthèse change TOUS les signes : $-(2p - 10) = -2p + 10$.\nRacine : $3p = 60$, soit $p = 20$. Le coefficient $-3$ est négatif : positif avant $20$, négatif après.\nb) Il manque des fraises quand la demande dépasse l'offre, donc quand $D(p) - O(p) > 0$ : pour un prix inférieur à $20$ €.\nc) À $20$ €, la différence est nulle : l'offre égale la demande. C'est le prix d'équilibre.\nOn échange $D(20) = 50 - 20 = 30$ kilos (et $O(20) = 40 - 10 = 30$ : ✔️).\nRecette : $20 \\times 30 = 600$ €.\n⭐ Au-dessus de $20$ €, il reste des fraises invendues : les prix ont tendance à baisser. En dessous, elles manquent : ils ont tendance à monter.",
          schema: tableauSignes(["5", "20", "50"], [["$60 - 3p$", ["+", "-"], ["0"]]], "p"),
          micros: ["auto_alg_signe_premier_degre"],
        },
      ],
    },
  ],
};
