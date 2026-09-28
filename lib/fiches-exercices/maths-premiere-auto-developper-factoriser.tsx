// ─── Fiche d'exercices : développer et factoriser (1re, automatismes) ────────
//                              20 exercices corrigés
//
// Quatrième feuille des automatismes de première (28/09/2026), bâtie sur
// l'étalon `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve
// anticipée, SANS CALCULATRICE, et sans discriminant.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-algebre.bank.ts` :
// l'identité remarquable est tombée à trois des six sujets de juin 2026 —
// (2x − 5)² (Antilles), (2x + 5)² (Asie), (x − 4)² (Centres étrangers) ;
// l'exercice 3 reprend le premier.
//
// ⭐⭐ LE FIL : DÉVELOPPER, C'EST DÉCOUPER UNE AIRE. Chaque produit est dessiné
// comme un rectangle coupé en morceaux (la grille « × » des exercices 2, 3, 7
// et 9) : le double produit de (a + b)², ce sont les DEUX bandes qu'on oublie.
// Et une même expression a trois formes, chacune pour un usage : développée
// pour calculer, factorisée pour les zéros, « A moins un carré » pour le
// maximum (exercices 18 et 20).
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (aires, courbes, diagrammes, tableau
// de signes) et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (champ agrandi,
// recette d'un cinéma, coût moyen, pavage d'une place, « +10 % puis −10 % »,
// jardin public, concert, bénéfice d'un artisan, tables de carrés d'autrefois).
// Les chiffres sont des MODÈLES, jamais présentés comme des données officielles.
//
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé (3, 7, 12, 15) sont
// montrés à l'écran seulement (`ecranSeulement`, comme dans
// `maths-premiere-tc-derivation.tsx`).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-developper-factoriser.mjs`.
//
// Micro-compétences : auto_alg_developper (1, 2, 9, 10, 15, 17, 18),
// auto_alg_identites (3, 4, 9, 11, 14, 15, 18, 19), auto_alg_factoriser_commun
// (5, 8, 12, 17), auto_alg_factoriser_identite (6, 7, 13, 16, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, repere, tableau, tableauProba, tableauSignes } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAutoDevelopperFactoriserPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-developper-factoriser",
  titre: "Développer et factoriser",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : développer un produit, utiliser les identités remarquables, factoriser par un facteur commun ou par une identité. Les développements sont dessinés comme des aires. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Développer : chaque terme de la première parenthèse multiplie chaque terme de la seconde. $(a + b)(c + d) = ac + ad + bc + bd$.",
        "Les identités remarquables : $(a + b)^2 = a^2 + 2ab + b^2$ ; $(a - b)^2 = a^2 - 2ab + b^2$ ; $(a + b)(a - b) = a^2 - b^2$.",
        "Factoriser, c'est le chemin inverse : on repère un facteur COMMUN, ou une identité remarquable.",
      ],
      exercices: [
        {
          enonce: "Développer et réduire $A = 3(2x - 5)$ et $B = -2(x - 4)$.",
          correction:
            "On distribue le facteur de devant à CHAQUE terme de la parenthèse.\n$A = 3 \\times 2x - 3 \\times 5 = 6x - 15$.\n$B = (-2) \\times x + (-2) \\times (-4) = -2x + 8$.\n⚠️ Le piège, dans $B$ : écrire $-2x - 8$. Moins par moins donne PLUS.",
          micros: ["auto_alg_developper"],
        },
        {
          enonce: "Développer et réduire $(2x + 3)(x - 5)$.",
          correction:
            "Quatre produits : chaque terme de la première parenthèse par chaque terme de la seconde.\n$2x \\times x = 2x^2$ ; $2x \\times (-5) = -10x$ ; $3 \\times x = 3x$ ; $3 \\times (-5) = -15$.\nOn additionne : $2x^2 - 10x + 3x - 15$.\nOn réduit les termes en $x$ : $-10x + 3x = -7x$.\nRésultat : $2x^2 - 7x - 15$.\n⭐ Le tableau range les quatre produits : une ligne par terme de la première parenthèse, une colonne par terme de la seconde.\n✔️ Test en $x = 1$ : $(2 + 3)(1 - 5) = -20$, et $2 - 7 - 15 = -20$.",
          schema: tableauProba(["×", "x", "−5"], [
            ["2x", "2x²", "−10x"],
            ["3", "3x", "−15"],
          ]),
          micros: ["auto_alg_developper"],
        },
        {
          enonce: "Développer $(2x - 5)^2$.",
          correction:
            "C'est $(a - b)^2$ avec $a = 2x$ et $b = 5$.\n$a^2 = (2x)^2 = 4x^2$.\n$2ab = 2 \\times 2x \\times 5 = 20x$.\n$b^2 = 5^2 = 25$.\nDonc $(2x - 5)^2 = 4x^2 - 20x + 25$.\n⚠️ Le piège : $(2x - 5)^2 = 4x^2 - 25$. Le carré ne se distribue pas : le double produit $20x$ est la moitié oubliée. Dans le tableau, ce sont les DEUX cases $-10x$.\n⭐ Question tombée à l'épreuve anticipée de juin 2026 (Antilles).",
          schema: ecranSeulement(
            tableauProba(["×", "2x", "−5"], [
              ["2x", "4x²", "−10x"],
              ["−5", "−10x", "25"],
            ]),
          ),
          micros: ["auto_alg_identites"],
        },
        {
          enonce: "Développer $(3x + 1)(3x - 1)$.",
          correction:
            "C'est $(a + b)(a - b)$ avec $a = 3x$ et $b = 1$ : le résultat est $a^2 - b^2$.\n$(3x)^2 - 1^2 = 9x^2 - 1$.\n⭐ Les deux termes en $x$ s'annulent : $-3x + 3x = 0$. C'est pour cela qu'il ne reste que deux termes.\n⚠️ Le piège : $(3x)^2 = 3x^2$. Le carré porte sur le $3$ ET sur le $x$ : $9x^2$.",
          micros: ["auto_alg_identites"],
        },
        {
          enonce: "Factoriser $6x^2 + 15x$.",
          correction:
            "On cherche ce que les deux termes ont en commun.\n$6x^2 = 3x \\times 2x$ et $15x = 3x \\times 5$ : le facteur commun est $3x$.\nDonc $6x^2 + 15x = 3x(2x + 5)$.\n✔️ On vérifie en développant : $3x \\times 2x + 3x \\times 5 = 6x^2 + 15x$.\n⚠️ Le piège : s'arrêter à $x(6x + 15)$ ou à $3(2x^2 + 5x)$. C'est juste, mais incomplet : on sort le plus grand facteur commun.",
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          enonce: "Factoriser $x^2 - 49$.",
          correction:
            "C'est une différence de deux carrés : $x^2 - 7^2$.\nOn applique $a^2 - b^2 = (a - b)(a + b)$ avec $a = x$ et $b = 7$.\n$x^2 - 49 = (x - 7)(x + 7)$.\n⚠️ Le piège : écrire $(x - 49)(x + 49)$. Dans les parenthèses, on met la RACINE : $7$, pas $49$.",
          micros: ["auto_alg_factoriser_identite"],
        },
        {
          enonce: "Factoriser $x^2 + 10x + 25$.",
          correction:
            "Trois termes, dont deux carrés : $x^2$ et $25 = 5^2$. On pense à $(a + b)^2 = a^2 + 2ab + b^2$.\nAvec $a = x$ et $b = 5$, le double produit vaut $2 \\times x \\times 5 = 10x$ : c'est bien le terme du milieu.\nDonc $x^2 + 10x + 25 = (x + 5)^2$.\n⭐ Le dessin : un carré de côté $x + 5$, découpé en un carré $x^2$, un carré $25$ et deux rectangles $5x$.\n⚠️ Toujours contrôler le double produit : $x^2 + 12x + 25$ ne se factorise pas ainsi.",
          schema: ecranSeulement(
            tableauProba(["×", "x", "5"], [
              ["x", "x²", "5x"],
              ["5", "5x", "25"],
            ]),
          ),
          micros: ["auto_alg_factoriser_identite"],
        },
        {
          enonce: "Factoriser $(x + 1)(2x - 3) + (x + 1)(x + 4)$.",
          correction:
            "Le facteur commun est une parenthèse entière : $(x + 1)$.\nOn le sort, et on garde ce qui reste de chaque terme : $(x + 1)\\left[(2x - 3) + (x + 4)\\right]$.\nOn réduit le crochet : $2x - 3 + x + 4 = 3x + 1$.\nDonc l'expression vaut $(x + 1)(3x + 1)$.\n⚠️ Le piège : tout développer. Ce serait juste, mais on voulait un PRODUIT.",
          micros: ["auto_alg_factoriser_commun"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la situation par une expression, la transformer, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Aire d'un rectangle $=$ longueur $\\times$ largeur : développer, c'est découper le rectangle en morceaux.",
        "Recette $=$ prix $\\times$ quantité : quand les deux dépendent de $x$, on obtient un produit à développer.",
        "Pour tester une égalité, on remplace $x$ par une valeur simple ($0$, $1$, $2$) : si les deux côtés diffèrent, l'égalité est fausse.",
      ],
      exercices: [
        {
          titre: "Le champ agrandi",
          enonce:
            "Un agriculteur possède un champ carré de $x$ hm de côté. Il l'agrandit de $3$ hm dans chaque sens, et le champ reste carré.\na) Exprimer l'aire du nouveau champ, puis la développer.\nb) Un voisin affirme : « L'aire a augmenté de $9$ hm². » Qu'en penser ?\nc) Calculer le gain d'aire pour $x = 5$, en hectares ($1$ hm² $= 1$ ha).",
          correction:
            "a) Nouveau côté : $x + 3$. Aire : $(x + 3)^2 = x^2 + 6x + 9$.\nb) L'ancienne aire était $x^2$. Le gain est $(x^2 + 6x + 9) - x^2 = 6x + 9$, et pas $9$.\nLe voisin a oublié les deux bandes de $3$ sur $x$ : c'est le double produit $6x$.\nc) Pour $x = 5$ : $6 \\times 5 + 9 = 39$ hm², soit $39$ ha.\n✔️ Directement : $8^2 - 5^2 = 64 - 25 = 39$.\n⭐ Le tableau montre les quatre morceaux : l'ancien champ $x^2$, deux bandes $3x$, et un petit carré de $9$.",
          schema: tableauProba(["×", "x", "3"], [
            ["x", "x²", "3x"],
            ["3", "3x", "9"],
          ]),
          micros: ["auto_alg_identites", "auto_alg_developper"],
        },
        {
          titre: "La recette d'un cinéma",
          enonce:
            "Un cinéma vend ses places $8$ € et accueille $200$ spectateurs par séance. Une étude (modèle) prévoit que chaque euro de baisse du prix attire $50$ spectateurs de plus. On baisse le prix de $x$ euros.\na) Exprimer le prix et le nombre de spectateurs en fonction de $x$.\nb) Montrer que la recette vaut $R(x) = -50x^2 + 200x + 1\\,600$.\nc) Calculer la recette pour $x = 0$, $1$, $2$, $3$ et $4$. Quelle baisse choisir ?",
          correction:
            "a) Prix : $8 - x$. Spectateurs : $200 + 50x$.\nb) Recette $=$ prix $\\times$ spectateurs $= (8 - x)(200 + 50x)$.\nOn développe : $8 \\times 200 + 8 \\times 50x - x \\times 200 - x \\times 50x = 1\\,600 + 400x - 200x - 50x^2$.\nOn réduit : $R(x) = -50x^2 + 200x + 1\\,600$.\nc) $R(0) = 1\\,600$ ; $R(1) = 1\\,750$ ; $R(2) = 1\\,800$ ; $R(3) = 1\\,750$ ; $R(4) = 1\\,600$.\nLa meilleure recette, $1\\,800$ €, s'obtient pour une baisse de $2$ € : des places à $6$ €.\n✔️ Avec la forme produit : $R(2) = 6 \\times 300 = 1\\,800$.\n⚠️ Baisser le prix peut AUGMENTER la recette… jusqu'à un certain point seulement.",
          schema: diagramme(
            "barres",
            [
              { label: "8 €", value: 1600 },
              { label: "7 €", value: 1750 },
              { label: "6 €", value: 1800 },
              { label: "5 €", value: 1750 },
              { label: "4 €", value: 1600 },
            ],
            2,
          ),
          micros: ["auto_alg_developper"],
        },
        {
          titre: "Le calcul mental du marchand",
          enonce:
            "Un commerçant vend $19$ articles à $21$ €, puis $98$ articles à $102$ €.\na) Écrire $21 \\times 19$ sous la forme $(20 + 1)(20 - 1)$, et calculer de tête.\nb) Même méthode pour $102 \\times 98$.\nc) Calculer de tête $101^2$ avec l'identité $(a + b)^2$.",
          correction:
            "a) $(20 + 1)(20 - 1) = 20^2 - 1^2 = 400 - 1 = 399$ €.\nb) $102 \\times 98 = (100 + 2)(100 - 2) = 100^2 - 2^2 = 10\\,000 - 4 = 9\\,996$ €.\nc) $101^2 = (100 + 1)^2 = 10\\,000 + 2 \\times 100 \\times 1 + 1 = 10\\,201$.\n⭐ Les identités remarquables ne servent pas qu'au calcul littéral : ce sont aussi des outils de calcul mental.\n⚠️ Le piège au c) : $101^2 = 10\\,000 + 1 = 10\\,001$. Le double produit, $200$, ne s'oublie pas.",
          micros: ["auto_alg_identites"],
        },
        {
          titre: "Le coût moyen",
          enonce:
            "Une entreprise fabrique $x$ centaines d'objets. Son coût de production, en centaines d'euros, est (modèle) $C(x) = 12x^2 + 30x$.\na) Factoriser $C(x)$.\nb) Le coût moyen est $\\dfrac{C(x)}{x}$. En déduire son expression, pour $x > 0$.\nc) Calculer le coût moyen pour $x = 1$, $2$ et $5$.",
          correction:
            "a) $12x^2 = 6x \\times 2x$ et $30x = 6x \\times 5$ : le facteur commun est $6x$. $C(x) = 6x(2x + 5)$.\nb) $\\dfrac{C(x)}{x} = \\dfrac{6x(2x + 5)}{x} = 6(2x + 5) = 12x + 30$.\nc) Pour $x = 1$ : $42$. Pour $x = 2$ : $54$. Pour $x = 5$ : $90$.\n⭐ La forme factorisée rend la division par $x$ immédiate : on barre le $x$ du facteur commun.\n⚠️ Le piège : $\\dfrac{12x^2 + 30x}{x} = 12x^2 + 30$. Il faut diviser CHAQUE terme par $x$.",
          schema: ecranSeulement(tableau(["x", "1", "2", "5"], ["coût moyen", 42, 54, 90])),
          micros: ["auto_alg_factoriser_commun"],
        },
        {
          titre: "La place et sa fontaine",
          enonce:
            "Une place carrée de $x$ mètres de côté est pavée, sauf une fontaine carrée de $4$ m de côté en son centre.\na) Exprimer l'aire pavée en fonction de $x$.\nb) La factoriser.\nc) Calculer de tête l'aire pavée pour $x = 24$. Le pavage coûte $50$ € le m² : quel est le prix ?",
          correction:
            "a) Grand carré moins petit carré : $x^2 - 16$.\nb) C'est une différence de deux carrés, $x^2 - 4^2$ : $x^2 - 16 = (x - 4)(x + 4)$.\nc) $(24 - 4)(24 + 4) = 20 \\times 28 = 560$ m².\nPrix : $560 \\times 50 = 28\\,000$ €.\n⭐ La forme factorisée se calcule de tête : $20 \\times 28$, plutôt que $24^2 - 16$.\n⚠️ Le piège : $(x - 16)(x + 16)$. On met la racine de $16$, c'est-à-dire $4$.",
          micros: ["auto_alg_factoriser_identite"],
        },
        {
          titre: "Une égalité suspecte",
          enonce:
            "Un élève écrit $(x - 2)^2 = x^2 - 4$. Le graphique montre $y = (x - 2)^2$ en bleu et $y = x^2 - 4$ en orange.\na) Tester cette égalité pour $x = 0$.\nb) Donner le bon développement.\nc) Les deux courbes sont-elles confondues ? En quel point se coupent-elles ?",
          figure: repere([-3, 5, -5, 10], [{ q: [1, -4, 4] }, { q: [1, 0, -4], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) Pour $x = 0$ : à gauche, $(0 - 2)^2 = 4$ ; à droite, $0 - 4 = -4$. Les deux côtés diffèrent : l'égalité est FAUSSE.\nb) $(x - 2)^2 = x^2 - 2 \\times x \\times 2 + 2^2 = x^2 - 4x + 4$.\nc) Non : les deux courbes se coupent en un seul point, $(2\\,;\\,0)$. Partout ailleurs, elles sont séparées.\n⭐ Un seul contre-exemple suffit pour prouver qu'une égalité est fausse.\n⚠️ Le carré ne se distribue pas : $(a - b)^2 \\neq a^2 - b^2$.",
          micros: ["auto_alg_identites"],
        },
        {
          titre: "Plus 10 %, puis moins 10 %",
          enonce:
            "Un prix de $200$ € augmente de $10$ %, puis baisse de $10$ %.\na) Calculer le prix final.\nb) Augmenter de $10$ %, c'est multiplier par $1 + t$ avec $t = 0{,}1$ ; baisser de $10$ %, c'est multiplier par $1 - t$. Développer $(1 + t)(1 - t)$.\nc) Expliquer pourquoi le prix final est toujours plus bas que le prix de départ, quel que soit le taux $t$ entre $0$ et $1$.",
          correction:
            "a) $200 \\times 1{,}1 = 220$ €, puis $220 \\times 0{,}9 = 198$ €.\nb) C'est l'identité $(a + b)(a - b) = a^2 - b^2$ : $(1 + t)(1 - t) = 1 - t^2$.\nPour $t = 0{,}1$ : $1 - 0{,}01 = 0{,}99$. Et $200 \\times 0{,}99 = 198$ €. ✔️\nc) Le prix est multiplié par $1 - t^2$. Dès que $t \\neq 0$, $t^2 > 0$, donc $1 - t^2 < 1$ : le prix baisse.\n⚠️ Le piège : « plus $10$ % puis moins $10$ %, on revient au départ ». On perd $t^2$, ici $1$ %.\n⭐ Avec $t = 0{,}2$ : $1 - 0{,}04 = 0{,}96$, on perd $4$ %.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Départ", value: 200 },
              { label: "+10 %", value: 220 },
              { label: "puis −10 %", value: 198 },
            ]),
          ),
          micros: ["auto_alg_identites", "auto_alg_developper"],
        },
        {
          enonce: "Factoriser à l'aide d'une identité remarquable :\na) $4x^2 - 12x + 9$ ;\nb) $(x + 3)^2 - 25$.",
          correction:
            "a) Deux carrés, $4x^2 = (2x)^2$ et $9 = 3^2$, et un terme du milieu négatif : on pense à $(a - b)^2$.\nLe double produit vaut $2 \\times 2x \\times 3 = 12x$ : c'est bien lui.\n$4x^2 - 12x + 9 = (2x - 3)^2$.\nb) Une différence de deux carrés : $(x + 3)^2 - 5^2$, avec $a = x + 3$ et $b = 5$.\n$(a - b)(a + b) = (x + 3 - 5)(x + 3 + 5) = (x - 2)(x + 8)$.\n✔️ Test en $x = 0$ : $3^2 - 25 = -16$, et $(-2) \\times 8 = -16$.\n⚠️ Le piège au b) : oublier que $a$ est TOUTE la parenthèse $x + 3$.",
          micros: ["auto_alg_factoriser_identite"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On choisit la forme de l'expression selon la question : développée pour calculer, factorisée pour trouver quand elle s'annule.",
        "Une forme comme $A - (x - c)^2$ montre un MAXIMUM : un carré est toujours positif ou nul, donc l'expression ne dépasse jamais $A$.",
        "On vérifie en remplaçant $x$ par une valeur simple.",
      ],
      exercices: [
        {
          titre: "L'allée du jardin",
          enonce:
            "Un jardin public rectangulaire mesure $20$ m sur $12$ m. On trace à l'intérieur, le long des bords, une allée de largeur $x$ mètres ; le reste est une pelouse rectangulaire.\na) Justifier que la pelouse mesure $20 - 2x$ sur $12 - 2x$, et développer son aire.\nb) En déduire que l'aire de l'allée vaut $64x - 4x^2$, puis la factoriser.\nc) L'allée fait $1$ m de large. Calculer son aire. Le revêtement coûte $25$ € le m² : quel est le prix ?",
          correction:
            "a) L'allée prend $x$ de chaque côté : on retire $2x$ à chaque dimension.\nAire de la pelouse : $(20 - 2x)(12 - 2x) = 240 - 40x - 24x + 4x^2 = 4x^2 - 64x + 240$.\nb) Allée $=$ jardin $-$ pelouse $= 240 - (4x^2 - 64x + 240) = 64x - 4x^2$.\nFacteur commun $4x$ : $64x - 4x^2 = 4x(16 - x)$.\nc) Pour $x = 1$ : $4 \\times 1 \\times 15 = 60$ m². Prix : $60 \\times 25 = 1\\,500$ €.\n✔️ Directement : jardin $240$ m², pelouse $18 \\times 10 = 180$ m², allée $60$ m².\n⚠️ Le piège : retirer $x$ au lieu de $2x$. L'allée longe les DEUX bords de chaque dimension.\n⚠️ Et le signe moins devant la parenthèse change TOUS les signes.",
          schema: tableau(["largeur x (m)", "1", "2", "3"], ["allée (m²)", 60, 112, 156]),
          micros: ["auto_alg_developper", "auto_alg_factoriser_commun"],
        },
        {
          titre: "Le prix du concert",
          enonce:
            "Un organisateur fixe le prix $x$ d'une place, en euros. Une étude (modèle) donne la recette, en euros : $R(x) = 2\\,000 - 2(x - 10)^2$.\na) Développer $R(x)$.\nb) Calculer $R(0)$, $R(5)$, $R(10)$, $R(15)$ et $R(20)$.\nc) Expliquer, sans calcul, pourquoi la recette ne dépasse jamais $2\\,000$ €. Pour quel prix l'atteint-elle ?",
          correction:
            "a) D'abord le carré : $(x - 10)^2 = x^2 - 20x + 100$.\nPuis on multiplie par $-2$ : $-2x^2 + 40x - 200$.\nEnfin : $R(x) = 2\\,000 - 2x^2 + 40x - 200 = -2x^2 + 40x + 1\\,800$.\nb) $R(0) = 2\\,000 - 2 \\times 100 = 1\\,800$ ; $R(5) = 2\\,000 - 2 \\times 25 = 1\\,950$ ; $R(10) = 2\\,000$ ; $R(15) = 1\\,950$ ; $R(20) = 1\\,800$.\nc) Un carré est toujours positif ou nul : $(x - 10)^2 \\geqslant 0$. On retire donc à $2\\,000$ un nombre positif ou nul : $R(x) \\leqslant 2\\,000$.\nL'égalité a lieu quand le carré est nul, c'est-à-dire pour $x = 10$ : des places à $10$ €.\n⭐ La forme développée sert à calculer ; la forme « $2\\,000$ moins un carré » montre le MAXIMUM d'un coup d'œil. Le diagramme est symétrique autour de $10$ €.\n⚠️ Le piège : oublier de distribuer le $-2$ sur les TROIS termes du carré.",
          schema: diagramme(
            "barres",
            [
              { label: "0 €", value: 1800 },
              { label: "5 €", value: 1950 },
              { label: "10 €", value: 2000 },
              { label: "15 €", value: 1950 },
              { label: "20 €", value: 1800 },
            ],
            2,
          ),
          micros: ["auto_alg_identites", "auto_alg_developper"],
        },
        {
          titre: "Multiplier avec des carrés",
          enonce:
            "Avant les calculatrices, des tables de carrés ont servi à faciliter les multiplications. Voici l'idée.\na) Développer $(a + b)^2 - (a - b)^2$.\nb) Retrouver ce résultat en factorisant l'expression avec $A^2 - B^2 = (A - B)(A + B)$.\nc) En déduire $23 \\times 17$, à l'aide de $40^2$ et de $6^2$.\nd) Un marchand vend $23$ lots à $17$ €. Quelle est sa recette ?",
          correction:
            "a) $(a + b)^2 - (a - b)^2 = (a^2 + 2ab + b^2) - (a^2 - 2ab + b^2) = 4ab$.\nb) Avec $A = a + b$ et $B = a - b$ : $A - B = 2b$ et $A + B = 2a$. L'expression vaut $2b \\times 2a = 4ab$. Même résultat.\nc) On pose $a = 23$ et $b = 17$ : $a + b = 40$ et $a - b = 6$.\n$4 \\times 23 \\times 17 = 40^2 - 6^2 = 1\\,600 - 36 = 1\\,564$.\nDonc $23 \\times 17 = 1\\,564 \\div 4 = 391$.\nd) La recette est de $391$ €.\n⭐ Une multiplication devient une soustraction de deux carrés, lus dans une table, puis une division par $4$.\n⚠️ Le piège au a) : oublier les parenthèses autour de $(a - b)^2$. Le signe moins porte sur ses trois termes.",
          micros: ["auto_alg_identites", "auto_alg_factoriser_identite"],
        },
        {
          titre: "Le bénéfice d'un artisan",
          enonce:
            "Un artisan fabrique $x$ centaines d'objets par mois, avec $0 \\leqslant x \\leqslant 6$. Son bénéfice, en milliers d'euros, est (modèle) $B(x) = 4 - (x - 3)^2$. Le graphique montre la courbe de $B$.\na) Développer $B(x)$.\nb) Factoriser $B(x)$ à l'aide d'une identité remarquable.\nc) Pour quelles productions le bénéfice est-il nul ? Vérifier sur le graphique.\nd) Quel est le bénéfice maximal, et pour quelle production ?",
          figure: repere([-1, 7, -6, 5], [{ q: [-1, 6, -5] }], [], undefined, true),
          correction:
            "a) $(x - 3)^2 = x^2 - 6x + 9$, donc $B(x) = 4 - x^2 + 6x - 9 = -x^2 + 6x - 5$.\nb) $4 = 2^2$ : $B(x) = 2^2 - (x - 3)^2$, une différence de deux carrés.\n$B(x) = \\left(2 - (x - 3)\\right)\\left(2 + (x - 3)\\right) = (5 - x)(x - 1)$.\nc) Un produit est nul quand l'un de ses facteurs est nul : $x = 5$ ou $x = 1$. Pour $100$ ou $500$ objets, l'artisan ne gagne rien : la courbe coupe l'axe en $1$ et en $5$.\nd) $(x - 3)^2 \\geqslant 0$, donc $B(x) \\leqslant 4$, avec égalité pour $x = 3$. Bénéfice maximal : $4\\,000$ €, pour $300$ objets.\n⭐ Le tableau de signes : le bénéfice est positif entre $1$ et $5$ centaines d'objets, négatif en dehors.\n⚠️ Le piège au b) : $2 - (x - 3) = 2 - x - 3$. Le moins devant la parenthèse change aussi le signe du $3$ : $2 - x + 3 = 5 - x$.",
          schema: tableauSignes(["0", "1", "5", "6"], [
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$5 - x$", ["+", "+", "-"], ["", "0"]],
            ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["auto_alg_factoriser_identite"],
        },
      ],
    },
  ],
};
