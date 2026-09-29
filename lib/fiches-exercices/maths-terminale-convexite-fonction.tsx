// ─── Fiche d'exercices : la convexité (terminale spé) ─────────────────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`, alignée
// sur `lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank.ts`, au
// niveau du bac.
//
// ⭐⭐ LE FIL : LA CONVEXITÉ SE VOIT. Une courbe convexe est « en vallée » : au-
// dessus de ses tangentes, au-dessous de ses cordes. Chaque corrigé dessine la
// courbe ET la tangente (ou la corde) qui porte la réponse ; le point
// d'inflexion est marqué en rouge.
//
// Micro-compétences : convexite_reconnaitre (1, 6, 8, 12, 13, 15, 18, 19),
// convexite_derivee_seconde (2, 3, 5, 9, 10, 12, 14, 16, 17),
// convexite_point_inflexion (1, 3, 5, 7, 9, 10, 14, 16, 17),
// convexite_tangente (4, 9, 11, 13, 18, 20), convexite_defi (17, 18, 19, 20).
// 5/5.
//
// Faits cités : aucun fait réel. L'épidémie, l'engrais, les bactéries, la
// voiture, l'alcoolémie, la banque à 100 % et le câble sont des MODÈLES. La
// méthode de Newton (exercice 20) est un résultat mathématique.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableauSignes } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

export const exercicesConvexiteFonctionTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "convexite-fonction",
  titre: "Convexité",
  accroche:
    "Vingt exercices, de la lecture d'une courbe au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la courbe avec la tangente ou la corde qui porte la réponse.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f$ est convexe sur $I$ si sa courbe est au-dessus de chacune de ses tangentes, et au-dessous de chacune de ses cordes. Elle est concave dans le cas contraire. Convexe : « en vallée » ; concave : « en colline ».",
        "Si $f$ est deux fois dérivable : $f$ convexe $\\iff$ $f'$ croissante $\\iff$ $f'' \\geqslant 0$. Et $f$ concave $\\iff$ $f'$ décroissante $\\iff$ $f'' \\leqslant 0$.",
        "Un point d'inflexion est un point où la courbe TRAVERSE sa tangente : la convexité y change. Si $f''$ s'annule en changeant de signe en $a$, le point d'abscisse $a$ est un point d'inflexion.",
        "À connaître : $x^2$ et $\\mathrm{e}^{x}$ sont convexes sur $\\mathbb{R}$ ; $\\sqrt{x}$ et $\\ln x$ sont concaves sur leur ensemble de définition.",
      ],
      exercices: [
        {
          enonce:
            "On a tracé la courbe de $f(x) = x^3 - 3x$ et, en orange, sa tangente à l'origine.\na) Lire sur quel intervalle $f$ semble convexe, sur lequel elle semble concave.\nb) Le confirmer avec $f''$.\nc) Que dire du point $O$ ?",
          figure: repere([-3, 3, -3, 3], [{ p: [1, 0, -3, 0] }, { q: [0, -3, 0], couleur: ORANGE }]),
          correction:
            "a) À gauche de $0$, la courbe fait une « colline » : $f$ semble concave sur $]-\\infty ; 0]$. À droite, elle fait une « vallée » : $f$ semble convexe sur $[0 ; +\\infty[$.\nb) $f'(x) = 3x^2 - 3$, puis $f''(x) = 6x$.\n$f''(x) \\leqslant 0$ pour $x \\leqslant 0$ et $f''(x) \\geqslant 0$ pour $x \\geqslant 0$ : c'est confirmé.\nc) $f''$ s'annule en $0$ en changeant de signe : $O(0 ; 0)$ est un point d'inflexion.\n⭐ Sur le dessin : la tangente orange $y = -3x$ passe AU-DESSUS de la courbe à gauche de $O$, au-dessous à droite. La courbe traverse sa tangente.\n⚠️ Une courbe convexe n'est pas forcément croissante : ici, $f$ est convexe sur $[0 ; 1]$ et pourtant elle y descend.",
          micros: ["convexite_reconnaitre", "convexite_point_inflexion"],
        },
        {
          enonce: "Soit $f(x) = x^4 - 6x^2 + 1$ sur $\\mathbb{R}$.\nÉtudier la convexité de $f$ à l'aide de sa dérivée seconde.",
          correction:
            "$f'(x) = 4x^3 - 12x$, puis $f''(x) = 12x^2 - 12$.\nOn factorise : $f''(x) = 12(x - 1)(x + 1)$.\nC'est un trinôme qui s'annule en $-1$ et $1$ ; il est positif à l'extérieur des racines.\nDonc $f$ est convexe sur $]-\\infty ; -1]$ et sur $[1 ; +\\infty[$, concave sur $[-1 ; 1]$.\n⭐ Le tableau de signes range tout : une ligne par facteur, puis $f''(x)$.\n⚠️ On étudie le signe de $f''$, pas celui de $f'$ : le signe de $f'$ donne les variations, celui de $f''$ donne la convexité.",
          schema: tableauSignes(
            ["$-\\infty$", "$-1$", "$1$", "$+\\infty$"],
            [
              ["$x - 1$", ["-", "-", "+"], ["", "0"]],
              ["$x + 1$", ["-", "+", "+"], ["0", ""]],
              ["$f''(x)$", ["+", "-", "+"], ["0", "0"]],
            ],
          ),
          micros: ["convexite_derivee_seconde"],
        },
        {
          enonce: "Soit $f(x) = x\\,\\mathrm{e}^{x}$ sur $\\mathbb{R}$.\na) Calculer $f'(x)$ puis $f''(x)$.\nb) Étudier la convexité de $f$ et donner son point d'inflexion.",
          correction:
            "a) Produit $uv$ avec $u = x$ et $v = \\mathrm{e}^{x}$ : $f'(x) = \\mathrm{e}^{x} + x\\,\\mathrm{e}^{x} = (x + 1)\\,\\mathrm{e}^{x}$.\nDe même : $f''(x) = \\mathrm{e}^{x} + (x + 1)\\,\\mathrm{e}^{x} = (x + 2)\\,\\mathrm{e}^{x}$.\nb) $\\mathrm{e}^{x} > 0$ : $f''(x)$ a le signe de $x + 2$.\n$f$ est concave sur $]-\\infty ; -2]$ et convexe sur $[-2 ; +\\infty[$.\n$f''$ s'annule en $-2$ en changeant de signe : le point $A(-2 ; -2\\mathrm{e}^{-2})$ est un point d'inflexion, avec $-2\\mathrm{e}^{-2} \\approx -0{,}27$.\n⚠️ Ne pas oublier $\\mathrm{e}^{x} > 0$ : c'est lui qui permet de ne regarder que $x + 2$.\n⭐ Sur le dessin : le point rouge est l'inflexion. À gauche la courbe « bombe » vers le haut, à droite elle se creuse.",
          schema: ecranSeulement(repere([-5, 2, -2, 4], [{ pts: echantillon((x) => x * Math.exp(x), -5, 2, -2, 4) }], [{ x: -2, y: -0.27, label: "" }])),
          micros: ["convexite_derivee_seconde", "convexite_point_inflexion"],
        },
        {
          enonce: "a) Justifier que la fonction exponentielle est convexe sur $\\mathbb{R}$.\nb) Donner sa tangente au point d'abscisse $0$.\nc) En déduire que, pour tout réel $x$, $\\mathrm{e}^{x} \\geqslant x + 1$.",
          correction:
            "a) $(\\mathrm{e}^{x})'' = \\mathrm{e}^{x} > 0$ : la fonction exponentielle est convexe sur $\\mathbb{R}$.\nb) La tangente en $0$ : $y = \\mathrm{e}^{0}(x - 0) + \\mathrm{e}^{0}$, soit $y = x + 1$.\nc) Une fonction convexe a sa courbe au-dessus de ses tangentes. Donc $\\mathrm{e}^{x} \\geqslant x + 1$ pour tout $x$.\n⭐ Sur le dessin : la droite orange $y = x + 1$ touche la courbe en $(0 ; 1)$ et reste partout en dessous.\n⚠️ L'égalité n'a lieu qu'en $x = 0$. Partout ailleurs, l'inégalité est stricte.",
          schema: repere([-3, 3, -2, 5], [{ pts: echantillon(Math.exp, -3, 3, -2, 5) }, { q: [0, 1, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }]),
          micros: ["convexite_tangente"],
        },
        {
          enonce:
            "⚠️ La courbe ci-dessous est celle de la DÉRIVÉE SECONDE $f''$ d'une fonction $f$.\na) Sur quels intervalles $f$ est-elle convexe ? concave ?\nb) Combien la courbe de $f$ a-t-elle de points d'inflexion ? En quelles abscisses ?",
          figure: repere([-3, 4, -3, 4], [{ q: [1, -1, -2] }]),
          correction:
            "a) On lit le SIGNE de $f''$ : la parabole est au-dessus de l'axe avant $-1$ et après $2$, au-dessous entre les deux.\nDonc $f$ est convexe sur $]-\\infty ; -1]$ et sur $[2 ; +\\infty[$, concave sur $[-1 ; 2]$.\nb) $f''$ s'annule en changeant de signe en $-1$ et en $2$ : deux points d'inflexion, d'abscisses $-1$ et $2$.\n⚠️ Le piège : la parabole est « en vallée », mais c'est la courbe de $f''$, pas celle de $f$. On ne lit pas sa forme, on lit son SIGNE.\n⭐ Ici $f''(x) = x^2 - x - 2 = (x + 1)(x - 2)$ : les racines se lisent là où la courbe coupe l'axe.",
          micros: ["convexite_derivee_seconde", "convexite_point_inflexion"],
        },
        {
          enonce:
            "La courbe ci-dessous est celle de la DÉRIVÉE $f'$ d'une fonction $f$.\na) Sur quel intervalle $f$ est-elle convexe ? concave ?\nb) En quelle abscisse la courbe de $f$ a-t-elle un point d'inflexion ?",
          figure: repere([-2, 4, -3, 4], [{ q: [1, -2, -1] }]),
          correction:
            "a) $f$ est convexe là où $f'$ est CROISSANTE. La courbe de $f'$ descend jusqu'en $x = 1$, puis remonte.\nDonc $f$ est concave sur $]-\\infty ; 1]$ et convexe sur $[1 ; +\\infty[$.\nb) La convexité change en $x = 1$ : c'est l'abscisse du point d'inflexion.\n⚠️ Le signe de $f'$ ne sert à rien ici : il donne les variations de $f$. Pour la convexité, on lit les VARIATIONS de $f'$.\n⭐ Sur le dessin : le point le plus bas de la courbe de $f'$ ($x = 1$) donne l'inflexion de $f$. Là, $f$ descend le plus vite.",
          micros: ["convexite_reconnaitre"],
        },
        {
          enonce:
            "a) Soit $f(x) = x^4$. On a $f''(0) = 0$. Le point $O$ est-il un point d'inflexion ?\nb) Soit $g(x) = x^3 - 3x^2 + 2$. Déterminer le point d'inflexion de sa courbe.",
          correction:
            "a) $f''(x) = 12x^2$ : elle s'annule en $0$, mais elle reste POSITIVE des deux côtés.\n$f$ est convexe sur tout $\\mathbb{R}$ : la convexité ne change pas, $O$ n'est pas un point d'inflexion.\nb) $g'(x) = 3x^2 - 6x$ et $g''(x) = 6x - 6$.\n$g''$ s'annule en $1$ en changeant de signe (négative avant, positive après).\n$g(1) = 1 - 3 + 2 = 0$ : le point d'inflexion est $(1 ; 0)$.\n⛔ « $f''(a) = 0$ » ne suffit pas : il faut que $f''$ CHANGE DE SIGNE en $a$.\n⭐ Le tableau montre la différence : la ligne de $12x^2$ touche $0$ sans changer de signe, celle de $6x - 6$ change de signe.",
          schema: ecranSeulement(
            tableauSignes(
              ["$-\\infty$", "$0$", "$1$", "$+\\infty$"],
              [
                ["$12x^2$", ["+", "+", "+"], ["0", ""]],
                ["$6x - 6$", ["-", "-", "+"], ["", "0"]],
              ],
            ),
          ),
          micros: ["convexite_point_inflexion"],
        },
        {
          enonce:
            "Soit $f(x) = x^2$, et les points $A(-1 ; 1)$ et $B(2 ; 4)$ de sa courbe.\na) Donner l'équation de la droite $(AB)$.\nb) Montrer que, sur $[-1 ; 2]$, la courbe est sous la corde $[AB]$.",
          correction:
            "a) Le coefficient directeur vaut $\\dfrac{4 - 1}{2 - (-1)} = 1$. La droite passe par $A$ : $y = x + 2$.\nb) On étudie la différence : $x^2 - (x + 2) = x^2 - x - 2 = (x - 2)(x + 1)$.\nSur $[-1 ; 2]$, $x - 2 \\leqslant 0$ et $x + 1 \\geqslant 0$ : le produit est négatif. Donc $x^2 \\leqslant x + 2$.\n⭐ C'est la définition de la convexité : entre deux de ses points, une courbe convexe passe SOUS la corde.\n⚠️ En dehors de $[-1 ; 2]$, c'est l'inverse : la courbe repasse au-dessus de la droite.\n⭐ Sur le dessin : le segment orange relie $A$ et $B$ au-dessus de la parabole.",
          schema: ecranSeulement(
            repere([-2, 3, -1, 5], [{ q: [1, 0, 0] }, { pts: [[-1, 1], [2, 4]], couleur: ORANGE }], [{ x: -1, y: 1, label: "" }, { x: 2, y: 4, label: "" }]),
          ),
          micros: ["convexite_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Tangente en $a$ : $y = f'(a)(x - a) + f(a)$. Pour comparer la courbe et la tangente, on étudie le signe de la différence, ou on utilise la convexité.",
        "En un point d'inflexion, $f'$ change de sens : c'est là que $f$ monte (ou descend) le plus vite. Dans un contexte, c'est souvent le moment où « ça commence à ralentir ».",
        "Un trinôme $ax^2 + bx + c$ avec $a > 0$ est positif sur $\\mathbb{R}$ si et seulement si son discriminant est négatif ou nul.",
      ],
      exercices: [
        {
          enonce:
            "Une entreprise fabrique $q$ centaines d'objets par jour, avec $q \\in [0 ; 3]$. Le coût, en milliers d'euros, est $C(q) = q^3 - 3q^2 + 4q + 2$.\na) Étudier la convexité de $C$ et donner son point d'inflexion $I$.\nb) Donner l'équation de la tangente $T$ en $I$, puis la position de la courbe par rapport à $T$.\nc) Le coût marginal est $C'(q)$. Pour quelle production est-il le plus faible ?",
          correction:
            "a) $C'(q) = 3q^2 - 6q + 4$ et $C''(q) = 6q - 6$.\n$C''(q) \\leqslant 0$ sur $[0 ; 1]$ et $C''(q) \\geqslant 0$ sur $[1 ; 3]$ : $C$ est concave, puis convexe.\n$C''$ change de signe en $1$, et $C(1) = 1 - 3 + 4 + 2 = 4$ : $I(1 ; 4)$.\nb) $C'(1) = 3 - 6 + 4 = 1$. Donc $T : y = 1 \\times (q - 1) + 4$, soit $y = q + 3$.\n$C(q) - (q + 3) = q^3 - 3q^2 + 3q - 1 = (q - 1)^3$.\nC'est négatif avant $1$, positif après : la courbe est sous $T$ sur $[0 ; 1]$, au-dessus sur $[1 ; 3]$. Elle traverse sa tangente en $I$.\nc) $C'$ décroît sur $[0 ; 1]$ (car $C'' \\leqslant 0$), puis croît. Son minimum est $C'(1) = 1$.\nLe coût marginal est le plus faible pour $100$ objets par jour : $1\\,000$ € par centaine supplémentaire.\n⭐ Sur le dessin : la droite orange $T$ traverse la courbe au point rouge $I$.\n⚠️ Le coût est toujours CROISSANT ($C'(q) = 3(q - 1)^2 + 1 > 0$). C'est sa façon de croître qui change en $I$.",
          schema: repere([-1, 3, -1, 11], [{ p: [1, -3, 4, 2] }, { q: [0, 1, 3], couleur: ORANGE }], [{ x: 1, y: 4, label: "" }], undefined, true),
          micros: ["convexite_point_inflexion", "convexite_tangente", "convexite_derivee_seconde"],
        },
        {
          enonce:
            "Dans une ville, le nombre total de personnes touchées par une épidémie, en milliers, $t$ semaines après son début, est modélisé par $N(t) = \\dfrac{10}{1 + \\mathrm{e}^{3 - t}}$, pour $t \\geqslant 0$.\nOn admet que $N''(t) = \\dfrac{10\\,u\\,(u - 1)}{(1 + u)^3}$, où $u = \\mathrm{e}^{3-t}$.\na) Étudier la convexité de $N$ et donner son point d'inflexion.\nb) Interpréter ce point dans le contexte.\nc) Déterminer la limite de $N$ en $+\\infty$ et l'interpréter.",
          correction:
            "a) $\\mathrm{e}^{3-t} > 0$ et $(1 + \\mathrm{e}^{3-t})^3 > 0$ : $N''(t)$ a le signe de $\\mathrm{e}^{3-t} - 1$.\n$\\mathrm{e}^{3-t} - 1 > 0 \\iff \\mathrm{e}^{3-t} > \\mathrm{e}^{0} \\iff 3 - t > 0 \\iff t < 3$.\n$N$ est convexe sur $[0 ; 3]$, concave sur $[3 ; +\\infty[$. Point d'inflexion : $N(3) = \\dfrac{10}{1 + 1} = 5$, soit $I(3 ; 5)$.\nb) $N'(t)$ est le nombre de nouveaux cas par semaine. Il augmente tant que $N$ est convexe, puis diminue.\nL'épidémie accélère pendant $3$ semaines, puis elle ralentit. Au pic, $N'(3) = \\dfrac{10 \\times 1}{(1 + 1)^2} = 2{,}5$ : $2\\,500$ nouveaux cas par semaine.\nc) $\\mathrm{e}^{3-t} \\to 0$ quand $t \\to +\\infty$, donc $N(t) \\to 10$.\nÀ long terme, environ $10\\,000$ personnes auront été touchées.\n⚠️ Après l'inflexion, $N$ continue de CROÎTRE : c'est le rythme des nouveaux cas qui baisse, pas le nombre total.\n⭐ Sur le dessin : la courbe en S se creuse jusqu'au point rouge $(3 ; 5)$, puis se bombe et s'aplatit sous la droite $y = 10$.",
          schema: repere([-1, 9, -1, 11], [{ pts: echantillon((t) => 10 / (1 + Math.exp(3 - t)), 0, 9) }], [{ x: 3, y: 5, label: "" }], 10, true),
          micros: ["convexite_derivee_seconde", "convexite_point_inflexion"],
        },
        {
          enonce:
            "Démonstration. Soit $f$ deux fois dérivable et convexe sur $\\mathbb{R}$, et $a$ un réel. On pose $g(x) = f(x) - [f'(a)(x - a) + f(a)]$.\na) Calculer $g'(x)$ et justifier que $g'$ est croissante.\nb) En déduire le signe de $g'$, puis que $g(x) \\geqslant 0$ pour tout $x$. Conclure.\nc) Application : montrer que $\\mathrm{e}^{x} \\geqslant \\mathrm{e}\\,x$ pour tout réel $x$.",
          correction:
            "a) $g'(x) = f'(x) - f'(a)$. Comme $f$ est convexe, $f'$ est croissante, donc $g'$ aussi.\nb) $g'(a) = 0$ et $g'$ est croissante : $g'(x) \\leqslant 0$ pour $x \\leqslant a$, et $g'(x) \\geqslant 0$ pour $x \\geqslant a$.\n$g$ décroît puis croît : elle a un minimum en $a$, qui vaut $g(a) = 0$. Donc $g(x) \\geqslant 0$ pour tout $x$.\nConclusion : la courbe d'une fonction convexe est au-dessus de chacune de ses tangentes.\nc) L'exponentielle est convexe. Sa tangente en $1$ : $y = \\mathrm{e}(x - 1) + \\mathrm{e} = \\mathrm{e}\\,x$.\nDonc $\\mathrm{e}^{x} \\geqslant \\mathrm{e}\\,x$ pour tout $x$, avec égalité en $x = 1$.\n⚠️ En b), c'est la CROISSANCE de $g'$ qui donne son signe, à partir de $g'(a) = 0$. Sans convexité, rien ne marche.\n⭐ Sur le dessin : la droite orange $y = \\mathrm{e}\\,x$ passe par l'origine et touche la courbe au point rouge $(1 ; \\mathrm{e})$.",
          schema: ecranSeulement(repere([-2, 3, -1, 6], [{ pts: echantillon(Math.exp, -2, 3, -1, 6) }, { q: [0, 2.718, 0], couleur: ORANGE }], [{ x: 1, y: 2.72, label: "" }])),
          micros: ["convexite_tangente"],
        },
        {
          enonce:
            "Pour un réel $a$, on pose $f(x) = x^4 + ax^3 + 6x^2$.\na) Calculer $f''(x)$.\nb) Pour quelles valeurs de $a$ la fonction $f$ est-elle convexe sur $\\mathbb{R}$ ?\nc) Pour $a = 5$, étudier la convexité de $f$.",
          correction:
            "a) $f'(x) = 4x^3 + 3ax^2 + 12x$, puis $f''(x) = 12x^2 + 6ax + 12$.\nb) $f$ est convexe sur $\\mathbb{R}$ si et seulement si $f''(x) \\geqslant 0$ pour tout $x$.\nLe trinôme a un coefficient $12 > 0$ : il faut $\\Delta \\leqslant 0$. Or $\\Delta = 36a^2 - 4 \\times 12 \\times 12 = 36a^2 - 576$.\n$36a^2 \\leqslant 576 \\iff a^2 \\leqslant 16 \\iff -4 \\leqslant a \\leqslant 4$.\nc) Pour $a = 5$ : $f''(x) = 12x^2 + 30x + 12$, soit $f''(x) = 6(2x^2 + 5x + 2) = 6(2x + 1)(x + 2)$.\n$f$ est convexe sur $]-\\infty ; -2]$ et sur $\\left[-\\dfrac{1}{2} ; +\\infty\\right[$, concave sur $\\left[-2 ; -\\dfrac{1}{2}\\right]$. Deux points d'inflexion.\n⚠️ $\\Delta = 0$ est permis : pour $a = 4$, $f''(x) = 12(x + 1)^2$ s'annule en $-1$ sans changer de signe. $f$ reste convexe.",
          schema: ecranSeulement(
            tableauSignes(
              ["$-\\infty$", "$-2$", "$-\\dfrac{1}{2}$", "$+\\infty$"],
              [
                ["$2x + 1$", ["-", "-", "+"], ["", "0"]],
                ["$x + 2$", ["-", "+", "+"], ["0", ""]],
                ["$f''(x)$", ["+", "-", "+"], ["0", "0"]],
              ],
            ),
          ),
          micros: ["convexite_derivee_seconde", "convexite_reconnaitre"],
        },
        {
          enonce:
            "Un agronome modélise le rendement d'un champ de blé, en tonnes par hectare, en fonction de la quantité $x$ d'engrais, en centaines de kilos par hectare : $R(x) = 5 + 2\\ln(1 + x)$, pour $x \\geqslant 0$.\na) Montrer que $R$ est concave.\nb) Comparer le gain de rendement de la première centaine de kilos à celui de la cinquième. Lien avec a) ?\nc) Donner la tangente en $0$ et en déduire que $R(x) \\leqslant 2x + 5$.",
          correction:
            "a) $R'(x) = \\dfrac{2}{1 + x}$, puis $R''(x) = -\\dfrac{2}{(1 + x)^2} < 0$. $R$ est concave sur $[0 ; +\\infty[$.\nb) Première centaine : $R(1) - R(0) = 2\\ln 2 \\approx 1{,}39$ t/ha.\nCinquième centaine : $R(5) - R(4) = 2\\ln 6 - 2\\ln 5 = 2\\ln\\left(\\dfrac{6}{5}\\right) \\approx 0{,}36$ t/ha.\nChaque centaine rapporte moins que la précédente : c'est la concavité, $R'$ est décroissante. On parle de rendements décroissants.\nc) $R'(0) = 2$ et $R(0) = 5$ : tangente $y = 2x + 5$.\n$R$ est concave : sa courbe est SOUS ses tangentes. Donc $R(x) \\leqslant 2x + 5$.\n⚠️ Prolonger la tendance du début (la tangente) SURESTIME le rendement : à $x = 4$, on prévoirait $13$ t/ha au lieu de $R(4) \\approx 8{,}22$.\n⭐ Sur le dessin : la droite orange s'écarte de plus en plus au-dessus de la courbe.",
          schema: repere([-1, 8, -1, 10], [{ pts: echantillon((x) => 5 + 2 * Math.log(1 + x), 0, 8) }, { q: [0, 2, 5], couleur: ORANGE }], [], undefined, true),
          micros: ["convexite_reconnaitre", "convexite_tangente"],
        },
        {
          enonce:
            "En statistique, la « courbe en cloche » a pour équation $y = f(x)$, avec $f(x) = \\mathrm{e}^{-x^2/2}$.\na) Calculer $f'(x)$, puis montrer que $f''(x) = (x^2 - 1)\\,\\mathrm{e}^{-x^2/2}$.\nb) Étudier la convexité de $f$ et donner ses points d'inflexion.",
          correction:
            "a) $f = \\mathrm{e}^{u}$ avec $u(x) = -\\dfrac{x^2}{2}$, donc $u'(x) = -x$ et $f'(x) = -x\\,\\mathrm{e}^{-x^2/2}$.\nOn dérive le produit $-x \\times \\mathrm{e}^{-x^2/2}$ : $f''(x) = -\\mathrm{e}^{-x^2/2}$ $+ (-x)(-x)\\,\\mathrm{e}^{-x^2/2}$.\nSoit $f''(x) = (x^2 - 1)\\,\\mathrm{e}^{-x^2/2}$.\nb) L'exponentielle est positive : $f''(x)$ a le signe de $x^2 - 1 = (x - 1)(x + 1)$.\n$f$ est convexe sur $]-\\infty ; -1]$ et sur $[1 ; +\\infty[$, concave sur $[-1 ; 1]$.\nPoints d'inflexion : $(-1 ; \\mathrm{e}^{-1/2})$ et $(1 ; \\mathrm{e}^{-1/2})$, avec $\\mathrm{e}^{-1/2} \\approx 0{,}61$.\n⭐ Sur le dessin : les deux points rouges marquent où la cloche passe de « colline » à « pente qui s'adoucit ». En statistique, ils sont à un écart type de la moyenne.\n⚠️ En a), ne pas oublier le facteur $u'(x) = -x$ en dérivant $\\mathrm{e}^{u}$.",
          schema: ecranSeulement(repere([-3, 3, -1, 2], [{ pts: echantillon((x) => Math.exp((-x * x) / 2), -3, 3) }], [{ x: -1, y: 0.61, label: "" }, { x: 1, y: 0.61, label: "" }])),
          micros: ["convexite_derivee_seconde", "convexite_point_inflexion"],
        },
        {
          enonce:
            "Une population de bactéries double chaque heure : au temps $t$ (en heures), elle compte $N(t) = 2^t$ milliers, où $2^t = \\mathrm{e}^{t\\ln 2}$. Un technicien mesure $N(0) = 1$ et $N(1) = 2$, puis estime $N(0{,}5)$ en traçant la droite qui relie ces deux mesures.\na) Montrer que $N$ est convexe.\nb) En déduire que $2^t \\leqslant 1 + t$ pour $t \\in [0 ; 1]$.\nc) L'estimation du technicien est-elle trop forte ou trop faible ?",
          correction:
            "a) $N(t) = \\mathrm{e}^{t\\ln 2}$, donc $N'(t) = \\ln 2 \\times \\mathrm{e}^{t\\ln 2}$ et $N''(t) = (\\ln 2)^2\\,\\mathrm{e}^{t\\ln 2} > 0$. $N$ est convexe.\nb) La corde qui relie $(0 ; 1)$ et $(1 ; 2)$ a pour équation $y = 1 + t$.\nUne courbe convexe est SOUS ses cordes entre les deux points : $2^t \\leqslant 1 + t$ sur $[0 ; 1]$.\nc) Le technicien estime $N(0{,}5) \\approx 1{,}5$. Or $N(0{,}5) = \\sqrt{2} \\approx 1{,}41$ : l'estimation est trop forte.\n⚠️ En dehors de $[0 ; 1]$, c'est l'inverse : à $t = 3$, $2^3 = 8$ alors que la droite donne $4$. Prolonger la droite sous-estime la croissance.\n⭐ Sur le dessin : entre les deux points rouges, le segment orange passe au-dessus de la courbe.",
          schema: repere([-1, 3, -1, 5], [{ pts: echantillon((t) => 2 ** t, -1, 3, -1, 5) }, { q: [0, 1, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }, { x: 1, y: 2, label: "" }]),
          micros: ["convexite_reconnaitre"],
        },
        {
          enonce:
            "Une voiture démarre. La distance parcourue, en mètres, au bout de $t$ secondes, est $d(t) = -t^3 + 6t^2$, pour $t \\in [0 ; 4]$.\na) Calculer la vitesse $v(t) = d'(t)$ et l'accélération $a(t) = d''(t)$.\nb) Étudier la convexité de $d$ et interpréter.\nc) Quelle est la vitesse maximale ? Quelle distance la voiture a-t-elle parcourue quand elle s'arrête ?",
          correction:
            "a) $v(t) = -3t^2 + 12t$ et $a(t) = -6t + 12$.\nb) $a(t) \\geqslant 0$ sur $[0 ; 2]$ et $a(t) \\leqslant 0$ sur $[2 ; 4]$.\n$d$ est convexe sur $[0 ; 2]$ : la voiture accélère. Elle est concave sur $[2 ; 4]$ : la voiture freine.\nLe point d'abscisse $2$ est un point d'inflexion : $d(2) = -8 + 24 = 16$ m.\nc) $v$ croît puis décroît : la vitesse est maximale en $t = 2$, et $v(2) = -12 + 24 = 12$ m/s.\n$v(4) = -48 + 48 = 0$ : la voiture s'arrête à $t = 4$, après $d(4) = -64 + 96 = 32$ m.\n⭐ Sur le dessin, c'est la courbe de la VITESSE : elle monte jusqu'au point rouge $(2 ; 12)$, puis redescend à $0$.\n⚠️ Au point d'inflexion, la voiture ne s'arrête pas : c'est là qu'elle roule le plus VITE.",
          schema: ecranSeulement(repere([-1, 5, -1, 13], [{ q: [-3, 12, 0] }], [{ x: 2, y: 12, label: "" }], undefined, true)),
          micros: ["convexite_point_inflexion", "convexite_derivee_seconde"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. La convexité y dit quand le phénomène ralentit.",
      rappel: [
        "Plan type : dérivée, variations, dérivée seconde, convexité, point d'inflexion, puis l'interprétation dans le contexte.",
        "Une inégalité du type $f(x) \\geqslant$ (ou $\\leqslant$) une droite se démontre souvent par la convexité : la tangente, ou la corde.",
        "Croissance comparée : $\\displaystyle\\lim_{t \\to +\\infty} t\\,\\mathrm{e}^{-t} = 0$.",
      ],
      exercices: [
        {
          titre: "L'alcoolémie",
          enonce:
            "Après un verre, le taux d'alcool dans le sang d'une personne, en g/L, est modélisé par $f(t) = 2t\\,\\mathrm{e}^{-t}$, où $t \\geqslant 0$ est le temps en heures.\na) Étudier les variations de $f$. Quel est le taux maximal ?\nb) Montrer que $f''(t) = 2(t - 2)\\,\\mathrm{e}^{-t}$. Étudier la convexité de $f$.\nc) Interpréter le point d'inflexion.\nd) Déterminer la limite de $f$ en $+\\infty$.\ne) Pendant combien de temps le taux dépasse-t-il $0{,}5$ g/L ?",
          correction:
            "a) $f'(t) = 2\\mathrm{e}^{-t} - 2t\\,\\mathrm{e}^{-t} = 2(1 - t)\\,\\mathrm{e}^{-t}$, du signe de $1 - t$.\n$f$ croît sur $[0 ; 1]$ et décroît sur $[1 ; +\\infty[$. Maximum : $f(1) = \\dfrac{2}{\\mathrm{e}} \\approx 0{,}74$ g/L, une heure après.\nb) $f''(t) = -2\\mathrm{e}^{-t} - 2(1 - t)\\,\\mathrm{e}^{-t}$, soit $f''(t) = 2(t - 2)\\,\\mathrm{e}^{-t}$.\n$f$ est concave sur $[0 ; 2]$, convexe sur $[2 ; +\\infty[$. Point d'inflexion : $(2 ; 4\\mathrm{e}^{-2})$, avec $4\\mathrm{e}^{-2} \\approx 0{,}54$.\nc) $f'$ est minimale en $t = 2$ : c'est là que le taux BAISSE le plus vite, de $f'(2) = -2\\mathrm{e}^{-2} \\approx -0{,}27$ g/L par heure.\nAprès $2$ h, la baisse ralentit.\nd) Croissance comparée : $t\\,\\mathrm{e}^{-t} \\to 0$, donc $f(t) \\to 0$. L'alcool finit par disparaître.\ne) À la calculatrice (ou par dichotomie) : $f(t) = 0{,}5$ pour $t_1 \\approx 0{,}36$ et $t_2 \\approx 2{,}15$.\nLe taux dépasse $0{,}5$ g/L pendant environ $1{,}8$ h, soit $1$ h $48$ min.\n⭐ Sur le dessin, une graduation vaut $0{,}1$ g/L : la courbe passe au-dessus de la droite $y = 5$ (donc $0{,}5$ g/L) entre $t_1$ et $t_2$. Les points rouges : le maximum, puis l'inflexion.\n⚠️ Le point d'inflexion n'est pas le maximum : au maximum, $f' = 0$ ; à l'inflexion, c'est $f''$ qui s'annule.",
          schema: repere([-1, 7, -1, 8], [{ pts: echantillon((t) => 20 * t * Math.exp(-t), 0, 7) }], [{ x: 1, y: 7.36, label: "" }, { x: 2, y: 5.41, label: "" }], 5),
          micros: ["convexite_derivee_seconde", "convexite_point_inflexion", "convexite_defi"],
        },
        {
          titre: "La banque à 100 %",
          enonce:
            "Une banque imaginaire offre un taux de $100$ % par an. Si les intérêts sont versés en $n$ fois dans l'année (au taux $\\dfrac{100}{n}$ % à chaque fois), $1$ € devient $\\left(1 + \\dfrac{1}{n}\\right)^n$ € au bout d'un an.\na) Montrer que $g(x) = \\ln(1 + x)$ est concave sur $]-1 ; +\\infty[$.\nb) Donner sa tangente en $0$. En déduire que $\\ln(1 + x) \\leqslant x$ pour $x > -1$.\nc) En déduire que $\\left(1 + \\dfrac{1}{n}\\right)^n \\leqslant \\mathrm{e}$ pour tout $n \\geqslant 1$.\nd) Calculer le capital pour $n = 1$, $n = 12$ et $n = 365$. Conclure.",
          correction:
            "a) $g'(x) = \\dfrac{1}{1 + x}$ et $g''(x) = -\\dfrac{1}{(1 + x)^2} < 0$ : $g$ est concave.\nb) $g(0) = 0$ et $g'(0) = 1$ : la tangente en $0$ est $y = x$.\n$g$ est concave, donc sa courbe est sous ses tangentes : $\\ln(1 + x) \\leqslant x$.\nc) On écrit $\\left(1 + \\dfrac{1}{n}\\right)^n = \\mathrm{e}^{n\\ln(1 + 1/n)}$.\nAvec $x = \\dfrac{1}{n}$ : $n\\ln\\left(1 + \\dfrac{1}{n}\\right) \\leqslant n \\times \\dfrac{1}{n} = 1$.\nL'exponentielle est croissante : $\\left(1 + \\dfrac{1}{n}\\right)^n \\leqslant \\mathrm{e}^{1} = \\mathrm{e}$.\nd) $n = 1$ : $2$ €. $n = 12$ : environ $2{,}613$ €. $n = 365$ : environ $2{,}715$ €.\nVerser plus souvent rapporte un peu plus, mais le capital ne dépassera jamais $\\mathrm{e} \\approx 2{,}718$ €.\n⚠️ En c), il faut la croissance de l'exponentielle pour passer de l'inégalité sur l'exposant à l'inégalité sur les puissances.\n⭐ Sur le dessin : la droite orange $y = x$ touche la courbe de $\\ln(1 + x)$ en $O$, et reste au-dessus.",
          schema: repere([-1, 4, -2, 4], [{ pts: echantillon((x) => Math.log(1 + x), -0.85, 4, -2, 4) }, { q: [0, 1, 0], couleur: ORANGE }]),
          micros: ["convexite_reconnaitre", "convexite_tangente", "convexite_defi"],
        },
        {
          titre: "Le câble entre deux pylônes",
          enonce:
            "Un câble pend entre deux pylônes. Dans un repère où l'unité vaut $10$ m, il a la forme de la courbe de $f(x) = \\dfrac{\\mathrm{e}^{x} + \\mathrm{e}^{-x}}{2}$ pour $x \\in [-2 ; 2]$ ; les sommets des pylônes sont aux points d'abscisses $-2$ et $2$.\na) Montrer que $f$ est paire. Calculer $f'(x)$ et étudier les variations de $f$.\nb) Montrer que $f''(x) = f(x)$, puis que $f$ est convexe.\nc) Justifier que le câble reste sous le segment qui relie les sommets des pylônes.\nd) La flèche du câble est la différence de hauteur entre les sommets et le point le plus bas. La calculer, en mètres.",
          correction:
            "a) $f(-x) = \\dfrac{\\mathrm{e}^{-x} + \\mathrm{e}^{x}}{2} = f(x)$ : $f$ est paire, sa courbe est symétrique par rapport à l'axe des ordonnées.\n$f'(x) = \\dfrac{\\mathrm{e}^{x} - \\mathrm{e}^{-x}}{2}$. Or $\\mathrm{e}^{x} > \\mathrm{e}^{-x} \\iff x > -x \\iff x > 0$.\n$f$ décroît sur $[-2 ; 0]$ et croît sur $[0 ; 2]$ ; son minimum est $f(0) = 1$.\nb) $f''(x) = \\dfrac{\\mathrm{e}^{x} + \\mathrm{e}^{-x}}{2} = f(x)$, et c'est positif (somme de deux exponentielles). $f$ est convexe.\nc) Une courbe convexe est sous ses cordes : le câble est sous le segment qui relie ses deux extrémités.\nd) $f(2) = \\dfrac{\\mathrm{e}^{2} + \\mathrm{e}^{-2}}{2} \\approx 3{,}76$ et $f(0) = 1$.\nLa flèche vaut $f(2) - f(0) \\approx 2{,}76$ unités, soit environ $27{,}6$ m.\n⚠️ Ce n'est pas une parabole : $f$ n'est pas un polynôme. Elle croît bien plus vite loin du centre.\n⭐ Sur le dessin : le segment orange relie les sommets, à la hauteur $3{,}76$. Le point rouge, le plus bas, est à la hauteur $1$.",
          schema: repere([-3, 3, -1, 5], [{ pts: echantillon((x) => (Math.exp(x) + Math.exp(-x)) / 2, -2, 2) }, { pts: [[-2, 3.762], [2, 3.762]], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }]),
          micros: ["convexite_reconnaitre", "convexite_defi"],
        },
        {
          titre: "Approcher ln 3 par les tangentes",
          enonce:
            "Pour approcher la solution de $\\mathrm{e}^{x} = 3$, on utilise la fonction convexe $f(x) = \\mathrm{e}^{x} - 3$ et la méthode de Newton : on part de $x_0 = 2$ ; la tangente à la courbe au point d'abscisse $x_n$ coupe l'axe des abscisses en $x_{n+1}$.\na) Montrer que la tangente au point d'abscisse $a$ coupe l'axe des abscisses en $a - 1 + 3\\mathrm{e}^{-a}$.\nb) Calculer $x_1$.\nc) Justifier, par la convexité, que $f(x_1) \\geqslant 0$, donc que $x_1 \\geqslant \\ln 3$.\nd) La fonction Python ci-dessous calcule $x_n$. Que renvoie newton(4) ?",
          figure: programme(["from math import exp", "", "def newton(n):", "    x = 2", "    for k in range(n):", "        x = x-1+3*exp(-x)", "    return x"]),
          correction:
            "a) $f'(a) = \\mathrm{e}^{a}$. La tangente : $y = \\mathrm{e}^{a}(x - a) + \\mathrm{e}^{a} - 3$.\nElle coupe l'axe quand $y = 0$ : $x - a = -\\dfrac{\\mathrm{e}^{a} - 3}{\\mathrm{e}^{a}} = -1 + 3\\mathrm{e}^{-a}$, soit $x = a - 1 + 3\\mathrm{e}^{-a}$.\nb) $x_1 = 2 - 1 + 3\\mathrm{e}^{-2} = 1 + 3\\mathrm{e}^{-2} \\approx 1{,}406$.\nc) $f$ est convexe : sa courbe est au-dessus de sa tangente en $x_0$. En $x_1$, la tangente vaut $0$, donc $f(x_1) \\geqslant 0$.\nAlors $\\mathrm{e}^{x_1} \\geqslant 3$, donc $x_1 \\geqslant \\ln 3$ : on approche $\\ln 3$ par au-dessus.\nd) La boucle applique $n$ fois la formule de a). Les valeurs : $x_2 \\approx 1{,}1414$, $x_3 \\approx 1{,}0995$, puis newton(4) renvoie environ $1{,}098613$.\nOr $\\ln 3 \\approx 1{,}098612$ : six décimales presque toutes justes en quatre étapes.\n⭐ Sur le dessin : la tangente orange en $x_0 = 2$ coupe l'axe au point rouge $x_1 \\approx 1{,}41$, encore à droite de $\\ln 3 \\approx 1{,}10$, où la courbe coupe l'axe.\n⚠️ Sans la convexité, une tangente pourrait envoyer $x_1$ de l'autre côté de la solution, et la suite pourrait s'égarer.",
          schema: repere([-1, 3, -4, 5], [{ pts: echantillon((x) => Math.exp(x) - 3, -1, 3, -4, 5) }, { q: [0, 7.389, -10.389], couleur: ORANGE }], [{ x: 1.41, y: 0, label: "" }]),
          micros: ["convexite_tangente", "convexite_defi"],
        },
      ],
    },
  ],
};
