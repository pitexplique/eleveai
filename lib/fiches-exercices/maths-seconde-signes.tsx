// ─── Fiche d'exercices : le signe d'une expression (seconde) ─────────────────
//
// Troisième feuille du bloc « Fonctions » de seconde (21/09/2026, le soir).
// Alignée sur la banque `lib/tutor-v4/questionBank/seconde/maths/
// signes-expression.bank.ts` (notionId signes_expression_2de) et sur la fiche
// de cours `lib/fiches/maths-seconde-signes.tsx`.
// ⛔ Aucun calcul de la fiche de cours n'est repris (ni −3x + 9, ni (x − 2)/(x + 3),
// ni (2x − 6)(x + 1), ni les racines −2 et 3 de sa courbe, ni ses dix exercices).
//
// ⭐ CE QUI COINCE VRAIMENT (Frédéric, 07/09) : LE POSITIONNEMENT. Dans quelle
// colonne tombe le zéro, combien de colonnes, où va la double barre. D'où les
// exercices 3 et 5, qui le demandent en toutes lettres, et le 13 à trois
// facteurs. Les noms varient : f, g, h, u, B, C, M, v.
//
// ⭐ CHAQUE CORRIGÉ DRESSE SON TABLEAU (Frédéric, 21/09 : « n'oublie pas dans la
// correction d'utiliser les canvas »).
//
// ⭐ LE MONDE : un maraîcher, une transformation au rugby (la barre à 3 m), la
// fenêtre d'action d'un médicament, un abonnement de salle de sport, le
// variomètre d'un parapentiste — où le SIGNE de la vitesse donne le SENS de
// variation de l'altitude : la dérivée, un an avant.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-signes.mjs` — chaque
// tableau est RELU et chaque case recalculée sur la formule de sa ligne : le
// signe au milieu de chaque colonne, et sous chaque borne un 0, une double
// barre ou rien, selon que la formule s'annule, n'existe pas, ou ni l'un ni
// l'autre.
//
// Micro-compétences : signes_premier_degre (1, 2, 4, 9, 19), signes_produit
// (3, 4, 9, 11, 12, 13, 15, 16, 17), signes_quotient (5, 10, 14, 18, 19),
// signes_resoudre_equation (6, 7, 8, 12, 20), signes_resoudre_inequation (2, 7,
// 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableauSignes, type Courbe } from "@/lib/fiches-exercices/figures";

/* Les courbes lues dans les énoncés. */
const COURBE_8: Courbe[] = [{ q: [1, 1, -2] }];
const VARIO_20: Courbe[] = [{ pts: [[0, 2], [1, 3], [2, 0], [3, -2], [5, 0], [6, 2], [7, 2], [8, 0], [10, -3]] }];

export const exercicesSignesSeconde: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "signes-expression-2de",
  titre: "Le signe d'une expression",
  accroche:
    "Vingt exercices, du geste seul au problème : le signe de ax + b, le tableau de signes d'un produit et d'un quotient, la double barre, les équations produit nul, les inéquations. Un maraîcher, une transformation au rugby, un médicament, une salle de sport, un parapentiste. Un rappel de cours avant chaque niveau, et chaque corrigé dresse son tableau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    { href: "/fiches-cours/maths/seconde/signes-expression-2de", titre: "Le signe d'une expression" },
  ],
  coachHref: "/coach-ia/maths?classe=seconde",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un signe, un tableau, une équation : un geste par exercice.",
      rappel: [
        "Le signe de $ax + b$ : on cherche la valeur qui l'annule. À DROITE de cette valeur, le signe de $a$ ; à gauche, le signe contraire.",
        "Un produit ou un quotient : une ligne par facteur, les valeurs rangées dans l'ordre CROISSANT, puis la règle des signes, colonne par colonne.",
        "Sous une valeur qui annule, un $0$. Sous une valeur INTERDITE (un dénominateur nul), une double barre.",
        "Un produit est nul si et seulement si l'un de ses facteurs est nul.",
      ],
      exercices: [
        {
          enonce: "Soit $f(x) = 2x - 8$.\na) Pour quelle valeur $f(x)$ s'annule-t-elle ?\nb) Quel est le signe de $f(x)$ avant, puis après cette valeur ?\nc) Dresser le tableau de signes de $f$.",
          correction:
            "a) $2x - 8 = 0$ donne $2x = 8$, donc $x = 4$.\nb) Le coefficient de $x$ est $2$, positif : $f(x)$ est NÉGATIF avant $4$ et POSITIF après. On vérifie avec $x = 0$ : $f(0) = -8$, négatif. ✓\nc) En haut : $-\\infty$, $4$, $+\\infty$. En bas : $-$, puis un $0$ sous le $4$, puis $+$.\n⭐ Pour $ax + b$ : le signe de $a$ à DROITE de la valeur qui annule, le signe contraire à gauche.",
          schema: tableauSignes(["−∞", "4", "+∞"], [["$2x - 8$", ["-", "+"], ["0"]]]),
          micros: ["signes_premier_degre"],
        },
        {
          enonce: "Soit $g(x) = -3x - 6$.\na) Résoudre $g(x) = 0$.\nb) Dresser le tableau de signes de $g$.\nc) Pour quelles valeurs de $x$ a-t-on $g(x) > 0$ ?",
          correction:
            "a) $-3x - 6 = 0$ donne $-3x = 6$, donc $x = -2$.\nb) Le coefficient $-3$ est négatif : $g(x)$ est POSITIF avant $-2$ et NÉGATIF après. Vérification : $g(0) = -6$, négatif, et $0$ est bien après $-2$. ✓\nc) $g(x) > 0$ pour $x < -2$, c'est-à-dire sur $]{-\\infty}\\,;\\,-2[$.\n⛔ Le piège : écrire « $-$ puis $+$ » par habitude. Avec $a$ négatif, c'est l'inverse.",
          schema: tableauSignes(["−∞", "−2", "+∞"], [["$-3x - 6$", ["+", "-"], ["0"]]]),
          micros: ["signes_premier_degre", "signes_resoudre_inequation"],
        },
        {
          enonce: "Soit $h(x) = (x - 5)(x + 1)$.\na) Pour quelles valeurs chaque facteur s'annule-t-il ?\nb) Dans quel ordre les écrire en haut du tableau ? Combien y a-t-il de colonnes de signes ?\nc) Dresser le tableau de signes de $h$.",
          correction:
            "a) $x - 5 = 0$ pour $x = 5$ ; $x + 1 = 0$ pour $x = -1$.\nb) Dans l'ordre CROISSANT : $-\\infty$, $-1$, $5$, $+\\infty$. Deux valeurs découpent TROIS colonnes.\nc) $x - 5$ : $-$, $-$, $+$ (il s'annule en $5$). $x + 1$ : $-$, $+$, $+$ (il s'annule en $-1$).\nOn applique la règle des signes, colonne par colonne : $h(x)$ est $+$, puis $-$, puis $+$, avec un $0$ sous $-1$ et sous $5$.\n⛔ Le piège au b) : écrire $5$ avant $-1$, dans l'ordre où on les a trouvées.",
          schema: tableauSignes(["−∞", "−1", "5", "+∞"], [
            ["$x - 5$", ["-", "-", "+"], ["", "0"]],
            ["$x + 1$", ["-", "+", "+"], ["0", ""]],
            ["$h(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["signes_produit"],
        },
        {
          enonce: "Dresser le tableau de signes de $u(x) = (3 - x)(2x + 4)$.",
          correction:
            "Les valeurs qui annulent : $3 - x = 0$ pour $x = 3$, et $2x + 4 = 0$ pour $x = -2$. En haut : $-\\infty$, $-2$, $3$, $+\\infty$.\n$3 - x$ a pour coefficient $-1$, négatif : $+$ avant $3$, $-$ après.\n$2x + 4$ a pour coefficient $2$, positif : $-$ avant $-2$, $+$ après.\nLe produit : $-$, $+$, $-$, avec un $0$ en $-2$ et en $3$.\n⛔ Le piège : lire le coefficient de $3 - x$ comme $3$. C'est le nombre devant le $x$ qui compte : $-1$.",
          schema: tableauSignes(["−∞", "−2", "3", "+∞"], [
            ["$3 - x$", ["+", "+", "-"], ["", "0"]],
            ["$2x + 4$", ["-", "+", "+"], ["0", ""]],
            ["$u(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_premier_degre"],
        },
        {
          enonce: "Soit $g(x) = \\dfrac{2x - 1}{x + 4}$.\na) Quelle est la valeur interdite ?\nb) Dresser le tableau de signes de $g$. Où va la double barre ?",
          correction:
            "a) On annule le DÉNOMINATEUR : $x + 4 = 0$ pour $x = -4$. La valeur interdite est $-4$.\nb) Le numérateur s'annule en $\\dfrac{1}{2}$. En haut : $-\\infty$, $-4$, $\\dfrac{1}{2}$, $+\\infty$.\n$2x - 1$ : $-$, $-$, $+$. $x + 4$ : $-$, $+$, $+$.\nUn quotient suit la même règle des signes qu'un produit : $+$, $-$, $+$.\nSous $-4$, une DOUBLE BARRE : $g$ n'y existe pas. Sous $\\dfrac{1}{2}$, un $0$.\n⛔ Le piège : mettre un $0$ sous $-4$. On ne divise jamais par zéro : la valeur interdite n'a pas d'image.",
          schema: tableauSignes(["−∞", "−4", "$\\dfrac{1}{2}$", "+∞"], [
            ["$2x - 1$", ["-", "-", "+"], ["", "0"]],
            ["$x + 4$", ["-", "+", "+"], ["0", ""]],
            ["$g(x)$", ["+", "-", "+"], ["||", "0"]],
          ]),
          micros: ["signes_quotient"],
        },
        {
          enonce: "Résoudre :\na) $(x - 4)(3x + 9) = 0$\nb) $x(5 - x) = 0$\nc) $(2x + 1)^2 = 0$",
          correction:
            "Un produit est nul si et seulement si l'UN de ses facteurs est nul.\na) $x - 4 = 0$ ou $3x + 9 = 0$ : $x = 4$ ou $x = -3$.\nb) $x = 0$ ou $5 - x = 0$ : $x = 0$ ou $x = 5$.\nc) C'est le produit $(2x + 1)(2x + 1)$ : $2x + 1 = 0$, donc $x = -\\dfrac{1}{2}$. Une seule solution.\n⛔ Le piège au b) : oublier $x = 0$. Le $x$ seul est un facteur, lui aussi.",
          micros: ["signes_resoudre_equation"],
        },
        {
          enonce: "Voici le tableau de signes d'une fonction $f$ définie sur $\\mathbb{R}$. Résoudre :\na) $f(x) = 0$\nb) $f(x) > 0$\nc) $f(x) \\leqslant 0$",
          figure: tableauSignes(["−∞", "−3", "1", "4", "+∞"], [["$f(x)$", ["+", "-", "+", "-"], ["0", "0", "0"]]]),
          correction:
            "a) On lit les ZÉROS : $x = -3$, $x = 1$ et $x = 4$.\nb) On garde les colonnes $+$, sans les bornes (inégalité stricte) : $]{-\\infty}\\,;\\,-3[ \\cup ]1\\,;\\,4[$.\nc) On garde les colonnes $-$, AVEC les zéros (inégalité large) : $[-3\\,;\\,1] \\cup [4\\,;\\,+\\infty[$.\n⛔ Le piège au b) : ne répondre que $]1\\,;\\,4[$. Il y a DEUX colonnes $+$.",
          micros: ["signes_resoudre_equation", "signes_resoudre_inequation"],
        },
        {
          enonce: "Voici la courbe d'une fonction $u$ définie sur $[-3\\,;\\,2]$.\na) Dresser le tableau de signes de $u$.\nb) Résoudre $u(x) < 0$.",
          figure: repere([-3, 2, -3, 5], COURBE_8),
          correction:
            "a) On regarde la courbe par rapport à l'AXE des abscisses : au-dessus, $u$ est positive ; en dessous, négative.\nElle coupe l'axe en $x = -2$ et en $x = 1$ : $u$ est $+$ sur $[-3\\,;\\,-2]$, $-$ sur $[-2\\,;\\,1]$, $+$ sur $[1\\,;\\,2]$, avec un $0$ en $-2$ et en $1$.\nb) La courbe est SOUS l'axe entre $-2$ et $1$, bornes exclues : $]{-2}\\,;\\,1[$.\n⛔ Le piège : lire le sens de variation au lieu du signe. La courbe descend puis remonte ; ce qu'on lit ici, c'est si elle est au-dessus ou en dessous de l'axe.",
          schema: tableauSignes(["−3", "−2", "1", "2"], [["$u(x)$", ["+", "-", "+"], ["0", "0"]]]),
          micros: ["signes_resoudre_equation", "signes_resoudre_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : factoriser, dresser le tableau, conclure par des intervalles.",
      rappel: [
        "Une inéquation : tout à gauche, $0$ à droite, on FACTORISE, puis on dresse le tableau de signes.",
        "Inégalité large ($\\leqslant$, $\\geqslant$) : les zéros sont compris. Une valeur interdite ne l'est JAMAIS.",
        "On ne multiplie jamais les deux membres par une expression dont on ne connaît pas le signe.",
      ],
      exercices: [
        {
          enonce: "Résoudre l'inéquation $(4 - 2x)(x + 3) > 0$.",
          correction:
            "On étudie le signe du produit dans un tableau.\n$4 - 2x = 0$ pour $x = 2$, coefficient $-2$ négatif : $+$ puis $-$.\n$x + 3 = 0$ pour $x = -3$, coefficient positif : $-$ puis $+$.\nEn haut : $-\\infty$, $-3$, $2$, $+\\infty$. Le produit : $-$, $+$, $-$.\nOn garde la colonne $+$, bornes exclues : les solutions forment $]{-3}\\,;\\,2[$.\n⛔ Le piège : développer. $-2x^2 - 2x + 12 > 0$ ne se résout pas en seconde ; la forme factorisée, si.",
          schema: tableauSignes(["−∞", "−3", "2", "+∞"], [
            ["$4 - 2x$", ["+", "+", "-"], ["", "0"]],
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$(4 - 2x)(x + 3)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_premier_degre", "signes_resoudre_inequation"],
        },
        {
          enonce: "Résoudre l'inéquation $\\dfrac{x - 5}{2x + 2} \\leqslant 0$.",
          correction:
            "Valeur interdite : $2x + 2 = 0$ pour $x = -1$. Le numérateur s'annule en $5$.\nEn haut : $-\\infty$, $-1$, $5$, $+\\infty$.\n$x - 5$ : $-$, $-$, $+$. $2x + 2$ : $-$, $+$, $+$. Le quotient : $+$, $-$, $+$, avec une double barre sous $-1$ et un $0$ sous $5$.\nOn garde la colonne $-$ ET le zéro (inégalité large), mais JAMAIS la valeur interdite : $]{-1}\\,;\\,5]$.\n⛔ Le piège : fermer le crochet en $-1$ parce que l'inégalité est large. En $-1$, le quotient n'existe pas.",
          schema: tableauSignes(["−∞", "−1", "5", "+∞"], [
            ["$x - 5$", ["-", "-", "+"], ["", "0"]],
            ["$2x + 2$", ["-", "+", "+"], ["0", ""]],
            ["$\\dfrac{x - 5}{2x + 2}$", ["+", "-", "+"], ["||", "0"]],
          ]),
          micros: ["signes_quotient", "signes_resoudre_inequation"],
        },
        {
          enonce: "Soit $f(x) = x^2 - 9$.\na) Factoriser $f(x)$.\nb) Dresser le tableau de signes de $f$.\nc) Résoudre $x^2 < 9$.",
          correction:
            "a) C'est $a^2 - b^2$ avec $a = x$ et $b = 3$ : $f(x) = (x - 3)(x + 3)$.\nb) $x - 3$ : $-$, $-$, $+$. $x + 3$ : $-$, $+$, $+$. Le produit : $+$, $-$, $+$, avec un $0$ en $-3$ et en $3$.\nc) $x^2 < 9$ revient à $x^2 - 9 < 0$ : c'est la colonne $-$, soit $]{-3}\\,;\\,3[$.\n⛔ Le piège au c) : écrire « $x < 3$ ». Avec $x = -5$, on a bien $x < 3$, mais $x^2 = 25$, qui n'est pas plus petit que $9$.",
          schema: tableauSignes(["−∞", "−3", "3", "+∞"], [
            ["$x - 3$", ["-", "-", "+"], ["", "0"]],
            ["$x + 3$", ["-", "+", "+"], ["0", ""]],
            ["$f(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_resoudre_inequation"],
        },
        {
          enonce: "Soit $g(x) = 3x^2 - 12x$.\na) Factoriser $g(x)$.\nb) Résoudre $g(x) = 0$.\nc) Résoudre $g(x) < 0$.",
          correction:
            "a) Le facteur commun est $3x$ : $g(x) = 3x(x - 4)$.\nb) $3x = 0$ ou $x - 4 = 0$ : $x = 0$ ou $x = 4$.\nc) $3x$ : $-$, $+$, $+$. $x - 4$ : $-$, $-$, $+$. Le produit : $+$, $-$, $+$. On garde la colonne $-$ : $]0\\,;\\,4[$.\n⛔ Le piège au b) : diviser par $x$ pour « simplifier », et perdre la solution $0$.",
          schema: tableauSignes(["−∞", "0", "4", "+∞"], [
            ["$3x$", ["-", "+", "+"], ["0", ""]],
            ["$x - 4$", ["-", "-", "+"], ["", "0"]],
            ["$g(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_resoudre_equation", "signes_resoudre_inequation"],
        },
        {
          enonce: "Soit $h(x) = (x + 2)(x - 1)(3 - x)$.\na) Combien le tableau a-t-il de colonnes de signes ?\nb) Dresser le tableau de signes de $h$.\nc) Résoudre $h(x) \\geqslant 0$.",
          correction:
            "a) Trois facteurs, trois valeurs qui annulent : $-2$, $1$ et $3$. Elles découpent QUATRE colonnes.\nb) $x + 2$ : $-$, $+$, $+$, $+$. $x - 1$ : $-$, $-$, $+$, $+$. $3 - x$ : $+$, $+$, $+$, $-$.\nDans chaque colonne, on compte les $-$ : un nombre PAIR donne $+$, un nombre impair donne $-$. Le produit : $+$, $-$, $+$, $-$.\nc) Les colonnes $+$, zéros compris : $]{-\\infty}\\,;\\,-2] \\cup [1\\,;\\,3]$.\n⛔ Le piège : s'arrêter à deux lignes. Chaque facteur a la sienne, même le troisième.",
          schema: tableauSignes(["−∞", "−2", "1", "3", "+∞"], [
            ["$x + 2$", ["-", "+", "+", "+"], ["0", "", ""]],
            ["$x - 1$", ["-", "-", "+", "+"], ["", "0", ""]],
            ["$3 - x$", ["+", "+", "+", "-"], ["", "", "0"]],
            ["$h(x)$", ["+", "-", "+", "-"], ["0", "0", "0"]],
          ]),
          micros: ["signes_produit", "signes_resoudre_inequation"],
        },
        {
          enonce: "Résoudre l'inéquation $\\dfrac{3}{x - 2} \\geqslant 1$.",
          correction:
            "On ne multiplie PAS par $x - 2$ : on ne connaît pas son signe, et le sens de l'inégalité en dépend.\nOn ramène tout à gauche : $\\dfrac{3}{x - 2} - 1 \\geqslant 0$. Au même dénominateur : $\\dfrac{3 - (x - 2)}{x - 2} = \\dfrac{5 - x}{x - 2}$.\n$5 - x$ : $+$, $+$, $-$ (un $0$ en $5$). $x - 2$ : $-$, $+$, $+$ (valeur interdite $2$).\nLe quotient : $-$, $+$, $-$, avec une double barre en $2$ et un $0$ en $5$.\nOn garde la colonne $+$ et le zéro : $]2\\,;\\,5]$.\n⭐ On vérifie avec $x = 3$ : $\\dfrac{3}{1} = 3$, qui est bien $\\geqslant 1$. Et avec $x = 0$ : $-\\dfrac{3}{2}$, qui ne l'est pas. ✓",
          schema: tableauSignes(["−∞", "2", "5", "+∞"], [
            ["$5 - x$", ["+", "+", "-"], ["", "0"]],
            ["$x - 2$", ["-", "+", "+"], ["0", ""]],
            ["$\\dfrac{5 - x}{x - 2}$", ["-", "+", "-"], ["||", "0"]],
          ]),
          micros: ["signes_quotient", "signes_resoudre_inequation"],
        },
        {
          enonce: "Soit $f(x) = x^2$ et $g(x) = 2x + 3$.\na) Montrer que $f(x) - g(x) = (x - 3)(x + 1)$.\nb) Dresser le tableau de signes de $f(x) - g(x)$.\nc) En déduire la position de la parabole par rapport à la droite.",
          correction:
            "a) $f(x) - g(x) = x^2 - 2x - 3$. Et $(x - 3)(x + 1) = x^2 + x - 3x - 3 = x^2 - 2x - 3$. ✓\nb) $x - 3$ : $-$, $-$, $+$. $x + 1$ : $-$, $+$, $+$. Le produit : $+$, $-$, $+$, avec un $0$ en $-1$ et en $3$.\nc) Là où la différence est POSITIVE, $f(x) > g(x)$ : la parabole est AU-DESSUS de la droite, sur $]{-\\infty}\\,;\\,-1[$ et sur $]3\\,;\\,+\\infty[$. Entre $-1$ et $3$, elle est en dessous ; en $-1$ et en $3$, elles se coupent.\n⭐ Comparer deux courbes, c'est étudier le SIGNE de leur différence.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["−∞", "−1", "3", "+∞"], [
                ["$x - 3$", ["-", "-", "+"], ["", "0"]],
                ["$x + 1$", ["-", "+", "+"], ["0", ""]],
                ["$f(x) - g(x)$", ["+", "-", "+"], ["0", "0"]],
              ])}
              {repere([-2, 4, -2, 10], [{ q: [1, 0, 0] }, { q: [0, 2, 3], couleur: ORANGE }], [{ x: -1, y: 1 }, { x: 3, y: 9 }])}
            </div>
          ),
          micros: ["signes_produit", "signes_resoudre_inequation"],
        },
        {
          enonce: "Un maraîcher vend des paniers de légumes. Pour $x$ paniers vendus dans la semaine, son bénéfice, en euros, est $B(x) = -2(x - 10)(x - 60)$, pour $x$ entre $0$ et $80$.\na) Dresser le tableau de signes de $B$ sur $[0\\,;\\,80]$.\nb) Combien de paniers doit-il vendre pour gagner de l'argent ?\nc) Que se passe-t-il s'il en vend $70$ ?",
          correction:
            "a) $x - 10$ s'annule en $10$, $x - 60$ en $60$. Le facteur $-2$ est toujours négatif : il a sa ligne, avec des $-$ partout.\n$-2$ : $-$, $-$, $-$. $x - 10$ : $-$, $+$, $+$. $x - 60$ : $-$, $-$, $+$. Le produit : $-$, $+$, $-$.\nb) Il gagne de l'argent quand $B(x) > 0$ : pour $x$ dans $]10\\,;\\,60[$, c'est-à-dire de $11$ à $59$ paniers.\nc) $B(70) = -2 \\times 60 \\times 10 = -1\\,200$ : il PERD $1\\,200$ € dans la semaine. Trop de paniers coûtent plus qu'ils ne rapportent.\n⛔ Le piège au a) : oublier le $-2$. Il retourne tous les signes.",
          schema: tableauSignes(["0", "10", "60", "80"], [
            ["$-2$", ["-", "-", "-"], ["", ""]],
            ["$x - 10$", ["-", "+", "+"], ["0", ""]],
            ["$x - 60$", ["-", "-", "+"], ["", "0"]],
            ["$B(x)$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_resoudre_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : on traduit en inéquation, on dresse le tableau, on répond par une phrase.",
      rappel: [
        "On traduit la question en inéquation, puis on la ramène à « quelque chose $\\geqslant 0$ » ou « $< 0$ ».",
        "Un facteur toujours positif (un carré plus un nombre, une durée) ne change pas le signe.",
        "On répond à la question posée : une distance, une durée, un nombre de séances.",
      ],
      exercices: [
        {
          titre: "La transformation au rugby",
          enonce: "Au rugby, pour réussir une transformation, le ballon doit passer entre les poteaux, AU-DESSUS de la barre transversale, à $3$ m du sol. On modélise la hauteur du ballon, en mètres, par $h(x) = 0{,}4x - 0{,}01x^2$, où $x$ est la distance horizontale parcourue, en mètres.\na) Montrer que $h(x) - 3 = -0{,}01(x - 10)(x - 30)$.\nb) Dresser le tableau de signes de $h(x) - 3$ sur $[0\\,;\\,40]$.\nc) À quelle distance des poteaux le buteur peut-il tirer pour que le ballon passe au-dessus de la barre ?\nd) À quelle distance le ballon retombe-t-il au sol ?",
          correction:
            "a) $-0{,}01(x - 10)(x - 30) = -0{,}01(x^2 - 40x + 300) = -0{,}01x^2 + 0{,}4x - 3$, qui est bien $h(x) - 3$. ✓\nb) $-0{,}01$ : $-$ partout. $x - 10$ : $-$, $+$, $+$. $x - 30$ : $-$, $-$, $+$. Le produit : $-$, $+$, $-$, avec un $0$ en $10$ et en $30$.\nc) Le ballon passe au-dessus de la barre quand $h(x) \\geqslant 3$, soit $h(x) - 3 \\geqslant 0$ : pour $x$ dans $[10\\,;\\,30]$. Le buteur doit tirer entre $10$ et $30$ m des poteaux.\nd) $h(x) = 0{,}01x(40 - x)$ s'annule en $x = 0$, au moment du tir, et en $x = 40$ : le ballon retombe à $40$ m.\n⭐ Trop près, le ballon n'est pas encore assez haut ; trop loin, il est déjà redescendu.\n⛔ Le piège au c) : répondre « $10$ m ». La réponse est un INTERVALLE de distances.",
          schema: tableauSignes(["0", "10", "30", "40"], [
            ["$-0{,}01$", ["-", "-", "-"], ["", ""]],
            ["$x - 10$", ["-", "+", "+"], ["0", ""]],
            ["$x - 30$", ["-", "-", "+"], ["", "0"]],
            ["$h(x) - 3$", ["-", "+", "-"], ["0", "0"]],
          ]),
          micros: ["signes_produit", "signes_resoudre_inequation"],
        },
        {
          titre: "La fenêtre d'un médicament",
          enonce: "Après la prise d'un médicament, sa concentration dans le sang, en mg/L, est $C(t) = \\dfrac{20t}{t^2 + 4}$, où $t$ est le temps en heures. Le médicament agit quand la concentration dépasse $4$ mg/L.\na) Montrer que $C(t) - 4 = \\dfrac{-4(t - 1)(t - 4)}{t^2 + 4}$.\nb) Pourquoi le dénominateur ne change-t-il jamais le signe ?\nc) Dresser le tableau de signes de $C(t) - 4$ pour $t \\geqslant 0$.\nd) Pendant combien de temps le médicament agit-il ?",
          correction:
            "a) $C(t) - 4 = \\dfrac{20t - 4(t^2 + 4)}{t^2 + 4} = \\dfrac{-4t^2 + 20t - 16}{t^2 + 4}$. Et $-4(t - 1)(t - 4) = -4(t^2 - 5t + 4) = -4t^2 + 20t - 16$. ✓\nb) $t^2 + 4 \\geqslant 4 > 0$ : le dénominateur est TOUJOURS positif. Pas de valeur interdite, et le signe de $C(t) - 4$ est celui du numérateur.\nc) $-4$ : $-$ partout. $t - 1$ : $-$, $+$, $+$. $t - 4$ : $-$, $-$, $+$. Le tout : $-$, $+$, $-$, avec un $0$ en $1$ et en $4$.\nd) $C(t) - 4 \\geqslant 0$ pour $t$ dans $[1\\,;\\,4]$ : le médicament agit de $1$ h à $4$ h après la prise, soit pendant $3$ heures.\n⭐ Une fenêtre, et pas un effet qui dure : c'est pour cela que les prises s'espacent dans la journée.",
          schema: (
            <div className="grid gap-2 print:grid-cols-2 print:items-start">
              {tableauSignes(["0", "1", "4", "+∞"], [
                ["$-4$", ["-", "-", "-"], ["", ""]],
                ["$t - 1$", ["-", "+", "+"], ["0", ""]],
                ["$t - 4$", ["-", "-", "+"], ["", "0"]],
                ["$t^2 + 4$", ["+", "+", "+"], ["", ""]],
                ["$C(t) - 4$", ["-", "+", "-"], ["0", "0"]],
              ], "t")}
              {repere([0, 8, -1, 6], [{ pts: [[0, 0], [0.5, 2.35], [1, 4], [1.5, 4.8], [2, 5], [3, 4.62], [4, 4], [5, 3.45], [6, 3], [8, 2.35]] }], [{ x: 1, y: 4 }, { x: 4, y: 4 }], 4)}
            </div>
          ),
          micros: ["signes_quotient", "signes_produit", "signes_resoudre_inequation"],
        },
        {
          titre: "L'abonnement à la salle de sport",
          enonce: "Une salle de sport propose un abonnement à $300$ € par an, qui donne ensuite droit à chaque séance pour $5$ €. Sans abonnement, la séance coûte $11$ €.\na) Avec l'abonnement, montrer que le prix moyen d'une séance, pour $n$ séances dans l'année, est $M(n) = \\dfrac{300 + 5n}{n}$.\nb) Montrer que $M(n) - 11 = \\dfrac{300 - 6n}{n}$.\nc) Dresser le tableau de signes de $M(n) - 11$ pour $n > 0$.\nd) À partir de combien de séances par an l'abonnement est-il rentable ?",
          correction:
            "a) Pour $n$ séances, on paie $300 + 5n$ euros ; partagé entre $n$ séances, cela fait $M(n) = \\dfrac{300 + 5n}{n}$.\nb) $M(n) - 11 = \\dfrac{300 + 5n - 11n}{n} = \\dfrac{300 - 6n}{n}$.\nc) $300 - 6n$ s'annule en $n = 50$, avec un coefficient négatif : $+$ puis $-$. Le dénominateur $n$ est positif. Le quotient : $+$ avant $50$, un $0$ en $50$, $-$ après.\nd) L'abonnement est rentable quand $M(n) < 11$, c'est-à-dire $M(n) - 11 < 0$ : pour $n > 50$. À partir de $51$ séances, à peu près une par semaine.\n⭐ À $50$ séances, les deux formules coûtent pareil : $300 + 250 = 550$ € et $50 \\times 11 = 550$ €.\n⛔ Le piège au d) : répondre « $50$ ». À $50$ séances, on paie exactement pareil ; il faut dépasser.",
          schema: tableauSignes(["0", "50", "+∞"], [
            ["$300 - 6n$", ["+", "-"], ["0"]],
            ["$n$", ["+", "+"], [""]],
            ["$M(n) - 11$", ["+", "-"], ["0"]],
          ], "n"),
          micros: ["signes_quotient", "signes_premier_degre", "signes_resoudre_inequation"],
        },
        {
          titre: "Le parapentiste",
          enonce: "Un parapentiste vole au-dessus des Alpes. Son variomètre enregistre sa vitesse verticale $v(t)$, en m/s, $t$ minutes après le décollage : positive quand il monte, négative quand il descend.\na) Dresser le tableau de signes de $v$ sur $[0\\,;\\,10]$.\nb) Pendant quelles périodes monte-t-il ?\nc) À quels instants atteint-il un sommet, avant de redescendre ?\nd) En déduire le sens de variation de son altitude sur $[0\\,;\\,10]$.",
          figure: repere([0, 10, -4, 4], VARIO_20),
          correction:
            "a) La courbe coupe l'axe en $t = 2$, $t = 5$ et $t = 8$. Au-dessus de l'axe, $v$ est positive : $+$ sur $[0\\,;\\,2]$, $-$ sur $[2\\,;\\,5]$, $+$ sur $[5\\,;\\,8]$, $-$ sur $[8\\,;\\,10]$.\nb) Il monte quand $v(t) > 0$ : sur $[0\\,;\\,2[$, puis sur $]5\\,;\\,8[$, quand il trouve une colonne d'air chaud, un « thermique ».\nc) Il est au sommet quand il passe de la montée à la descente, c'est-à-dire quand $v$ passe de $+$ à $-$ : en $t = 2$ et en $t = 8$.\nd) Son altitude croît quand $v$ est positive et décroît quand $v$ est négative : elle croît sur $[0\\,;\\,2]$, décroît sur $[2\\,;\\,5]$, croît sur $[5\\,;\\,8]$ et décroît sur $[8\\,;\\,10]$.\n⭐ Le SIGNE de la vitesse donne le SENS de variation de l'altitude : c'est l'idée de la dérivée, que tu retrouveras en première.\n⛔ Le piège au c) : répondre $t = 1$, là où $v$ est la plus grande. Monter le plus vite, ce n'est pas être le plus haut.",
          schema: tableauSignes(["0", "2", "5", "8", "10"], [["$v(t)$", ["+", "-", "+", "-"], ["0", "0", "0"]]], "t"),
          micros: ["signes_resoudre_equation", "signes_resoudre_inequation"],
        },
      ],
    },
  ],
};
