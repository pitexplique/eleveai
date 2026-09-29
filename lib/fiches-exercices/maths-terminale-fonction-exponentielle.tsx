// ─── Fiche d'exercices : la fonction exponentielle (terminale spé) ────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`, alignée
// sur `lib/tutor-v4/questionBank/terminale-spe/maths/exponentielle.bank.ts`, au
// niveau du bac.
//
// ⛔ Pas de répétition de la feuille de 1re spé (`maths-premiere-exponentielle.
// tsx` : simplifier, résoudre e^a = e^b, dériver e^{ax+b}). Ici : les LIMITES,
// les croissances comparées (démontrées), la dérivée de e^u, les équations par
// changement de variable X = e^x, les études complètes de bac.
//
// ⭐⭐ LE FIL : L'EXPONENTIELLE GAGNE TOUJOURS. Chaque corrigé dessine la courbe,
// son asymptote en ligne horizontale, et le point qui porte la réponse.
//
// Micro-compétences : exp_definition (5, 8), exp_proprietes (3, 5, 14, 17, 19),
// exp_deriver (4, 9, 10, 12, 16, 18, 20), exp_equation_inequation (6, 7, 10,
// 13, 14, 17, 19, 20), exp_limite (1, 2, 3, 8, 9, 10, 11, 12, 14, 15, 18, 19,
// 20), exp_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : aucun fait réel. Le condensateur, les algorithmes, les noyaux,
// l'offre et la demande, la caféine, les doses et l'arbre sont des MODÈLES. Le
// logarithme népérien sert ici à écrire des solutions (x = ln a) : il est vu en
// même temps en terminale.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Les termes d'une suite en points rouges, à partir du rang n0 (valeurs EN CLAIR, arrondies). */
const termes = (n0: number, valeurs: number[]) => valeurs.map((y, i) => ({ x: n0 + i, y, label: "" }));

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

export const exercicesFonctionExponentielleTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "fonction-exponentielle",
  titre: "Fonction exponentielle",
  accroche:
    "Vingt exercices, des limites de référence au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la courbe, son asymptote et le point qui porte la réponse.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$\\displaystyle\\lim_{x \\to +\\infty} \\mathrm{e}^{x} = +\\infty$ et $\\displaystyle\\lim_{x \\to -\\infty} \\mathrm{e}^{x} = 0$ : la droite $y = 0$ est asymptote en $-\\infty$. Pour $\\mathrm{e}^{u(x)}$, on cherche d'abord la limite de $u(x)$.",
        "Croissances comparées : $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\mathrm{e}^{x}}{x^n} = +\\infty$ et $\\displaystyle\\lim_{x \\to -\\infty} x^n\\,\\mathrm{e}^{x} = 0$. L'exponentielle l'emporte sur toute puissance.",
        "$(\\mathrm{e}^{u})' = u'\\,\\mathrm{e}^{u}$. Et $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\mathrm{e}^{x} - 1}{x} = 1$ : c'est le nombre dérivé de $\\exp$ en $0$.",
        "$\\mathrm{e}^{a} = \\mathrm{e}^{b} \\iff a = b$ ; $\\mathrm{e}^{a} < \\mathrm{e}^{b} \\iff a < b$. Et $\\mathrm{e}^{x} > 0$ pour tout $x$.",
      ],
      exercices: [
        {
          enonce:
            "Déterminer les limites :\na) $\\displaystyle\\lim_{x \\to +\\infty} \\mathrm{e}^{-2x + 1}$\nb) $\\displaystyle\\lim_{x \\to -\\infty} \\mathrm{e}^{x^2}$\nc) $\\displaystyle\\lim_{x \\to 0^+} \\mathrm{e}^{1/x}$ et $\\displaystyle\\lim_{x \\to 0^-} \\mathrm{e}^{1/x}$\nd) $\\displaystyle\\lim_{x \\to +\\infty} \\mathrm{e}^{1/x}$",
          correction:
            "On cherche d'abord la limite de l'exposant, puis on applique l'exponentielle.\na) $-2x + 1 \\to -\\infty$, et $\\mathrm{e}^{X} \\to 0$ quand $X \\to -\\infty$ : la limite vaut $0$.\nb) $x^2 \\to +\\infty$ : la limite vaut $+\\infty$.\nc) Quand $x \\to 0^+$, $\\dfrac{1}{x} \\to +\\infty$ : $\\mathrm{e}^{1/x} \\to +\\infty$.\nQuand $x \\to 0^-$, $\\dfrac{1}{x} \\to -\\infty$ : $\\mathrm{e}^{1/x} \\to 0$.\nd) $\\dfrac{1}{x} \\to 0$, donc $\\mathrm{e}^{1/x} \\to \\mathrm{e}^{0} = 1$.\n⚠️ En c), le côté compte : à droite de $0$ la courbe s'envole, à gauche elle s'écrase sur l'axe.\n⭐ Sur le dessin (courbe de $\\mathrm{e}^{1/x}$) : les deux branches s'approchent de la droite $y = 1$ loin de l'origine.",
          schema: ecranSeulement(
            repere([-4, 4, -1, 6], [{ pts: echantillon((x) => Math.exp(1 / x), -4, -0.05) }, { pts: echantillon((x) => Math.exp(1 / x), 0.6, 4, -1, 6) }], [], 1),
          ),
          micros: ["exp_limite"],
        },
        {
          enonce:
            "Déterminer les limites, par croissance comparée :\na) $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\mathrm{e}^{x}}{x^3}$\nb) $\\displaystyle\\lim_{x \\to -\\infty} x\\,\\mathrm{e}^{x}$\nc) $\\displaystyle\\lim_{x \\to +\\infty} x^2\\,\\mathrm{e}^{-x}$",
          correction:
            "a) Forme « $\\dfrac{\\infty}{\\infty}$ ». Par croissance comparée, $\\dfrac{\\mathrm{e}^{x}}{x^3} \\to +\\infty$.\nb) Forme « $\\infty \\times 0$ ». Par croissance comparée, $x\\,\\mathrm{e}^{x} \\to 0$.\nc) On écrit $x^2\\,\\mathrm{e}^{-x} = \\dfrac{x^2}{\\mathrm{e}^{x}}$, l'inverse de $\\dfrac{\\mathrm{e}^{x}}{x^2}$, qui tend vers $+\\infty$. Donc la limite vaut $0$.\n⭐ Sur le dessin (courbe de $x\\,\\mathrm{e}^{x}$) : à gauche, elle descend jusqu'à $-\\dfrac{1}{\\mathrm{e}} \\approx -0{,}37$ en $x = -1$, puis remonte se coller à l'axe. L'exponentielle écrase le facteur $x$.\n⚠️ En c), $\\mathrm{e}^{-x}$ ne tend pas vers $+\\infty$ : il faut le passer au dénominateur pour reconnaître la croissance comparée.",
          schema: repere([-6, 2, -1, 3], [{ pts: echantillon((x) => x * Math.exp(x), -6, 2, -1, 3) }], [{ x: -1, y: -0.37, label: "" }]),
          micros: ["exp_limite"],
        },
        {
          enonce: "Lever l'indétermination :\na) $\\displaystyle\\lim_{x \\to +\\infty} (\\mathrm{e}^{x} - x)$\nb) $\\displaystyle\\lim_{x \\to +\\infty} (\\mathrm{e}^{2x} - 3\\mathrm{e}^{x} + 1)$",
          correction:
            "a) Forme « $\\infty - \\infty$ ». On factorise par $\\mathrm{e}^{x}$, qui domine : $\\mathrm{e}^{x} - x = \\mathrm{e}^{x}\\left(1 - \\dfrac{x}{\\mathrm{e}^{x}}\\right)$.\nPar croissance comparée, $\\dfrac{x}{\\mathrm{e}^{x}} \\to 0$ : la parenthèse tend vers $1$, et la limite vaut $+\\infty$.\nb) $\\mathrm{e}^{2x} = (\\mathrm{e}^{x})^2$ : on factorise par $\\mathrm{e}^{2x}$.\n$\\mathrm{e}^{2x} - 3\\mathrm{e}^{x} + 1$ $= \\mathrm{e}^{2x}\\left(1 - 3\\mathrm{e}^{-x} + \\mathrm{e}^{-2x}\\right)$. La parenthèse tend vers $1$ : la limite vaut $+\\infty$.\n⚠️ $\\dfrac{\\mathrm{e}^{x}}{\\mathrm{e}^{2x}} = \\mathrm{e}^{x - 2x} = \\mathrm{e}^{-x}$ : on soustrait les exposants.\n⭐ Le tableau le montre : $\\mathrm{e}^{x} - x$ vaut déjà $22\\,016{,}5$ en $x = 10$.",
          schema: ecranSeulement(tableau(["x", "1", "5", "10"], ["eˣ − x", "1,7", "143,4", "22 016,5"])),
          micros: ["exp_limite", "exp_proprietes"],
        },
        {
          enonce: "Dériver :\na) $f(x) = \\mathrm{e}^{x^2 - 3x}$\nb) $g(x) = x\\,\\mathrm{e}^{-2x}$, puis étudier le signe de $g'(x)$\nc) $h(x) = \\dfrac{\\mathrm{e}^{x}}{\\mathrm{e}^{x} + 1}$",
          correction:
            "a) $f = \\mathrm{e}^{u}$ avec $u(x) = x^2 - 3x$ et $u'(x) = 2x - 3$ : $f'(x) = (2x - 3)\\,\\mathrm{e}^{x^2 - 3x}$.\nb) Produit : $g'(x) = 1 \\times \\mathrm{e}^{-2x} + x \\times (-2)\\,\\mathrm{e}^{-2x}$, soit $g'(x) = (1 - 2x)\\,\\mathrm{e}^{-2x}$.\n$\\mathrm{e}^{-2x} > 0$ : $g'(x)$ a le signe de $1 - 2x$, positif avant $\\dfrac{1}{2}$, négatif après.\nc) Quotient : le numérateur de $h'(x)$ est $\\mathrm{e}^{x}(\\mathrm{e}^{x} + 1) - \\mathrm{e}^{x} \\times \\mathrm{e}^{x} = \\mathrm{e}^{x}$.\nDonc $h'(x) = \\dfrac{\\mathrm{e}^{x}}{(\\mathrm{e}^{x} + 1)^2}$.\n⚠️ En b), la dérivée de $\\mathrm{e}^{-2x}$ est $-2\\,\\mathrm{e}^{-2x}$ : on oublie souvent le facteur $-2$.\n⭐ Le tableau de signes : la ligne de l'exponentielle n'a que des $+$, c'est $1 - 2x$ qui décide.",
          schema: tableauSignes(
            ["$-\\infty$", "$\\dfrac{1}{2}$", "$+\\infty$"],
            [
              ["$1 - 2x$", ["+", "-"], ["0"]],
              ["$\\mathrm{e}^{-2x}$", ["+", "+"], [""]],
              ["$g'(x)$", ["+", "-"], ["0"]],
            ],
          ),
          micros: ["exp_deriver"],
        },
        {
          enonce:
            "Pour tout entier $n$, on pose $u_n = \\mathrm{e}^{-0{,}5n}$.\na) Montrer que $(u_n)$ est une suite géométrique.\nb) En déduire sa limite, et la limite de $S_n = u_0 + u_1 + \\cdots + u_n$.",
          correction:
            "a) $u_{n+1} = \\mathrm{e}^{-0{,}5(n + 1)}$ $= \\mathrm{e}^{-0{,}5n} \\times \\mathrm{e}^{-0{,}5}$, car $\\mathrm{e}^{a + b} = \\mathrm{e}^{a}\\,\\mathrm{e}^{b}$.\nDonc $u_{n+1} = \\mathrm{e}^{-0{,}5}\\,u_n$ : suite géométrique de raison $q = \\mathrm{e}^{-0{,}5} \\approx 0{,}61$, de premier terme $u_0 = 1$.\nb) $0 < q < 1$, donc $\\lim u_n = 0$.\n$S_n = \\dfrac{1 - q^{n+1}}{1 - q}$, et $q^{n+1} \\to 0$ : $\\lim S_n = \\dfrac{1}{1 - \\mathrm{e}^{-0{,}5}} \\approx 2{,}54$.\n⚠️ $\\mathrm{e}^{-0{,}5} < 1$ parce que $-0{,}5 < 0$ : c'est la croissance de l'exponentielle, $\\mathrm{e}^{-0{,}5} < \\mathrm{e}^{0}$.\n⭐ Sur le dessin : les termes $1$ ; $0{,}61$ ; $0{,}37$… sont multipliés par $0{,}61$ à chaque pas.",
          schema: ecranSeulement(repere([-1, 7, -1, 2], [], termes(0, [1, 0.61, 0.37, 0.22, 0.14, 0.08, 0.05]))),
          micros: ["exp_definition", "exp_proprietes"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ : $\\mathrm{e}^{2x} + \\mathrm{e}^{x} - 2 = 0$.\nIndication : poser $X = \\mathrm{e}^{x}$.",
          correction:
            "$\\mathrm{e}^{2x} = (\\mathrm{e}^{x})^2 = X^2$. L'équation devient $X^2 + X - 2 = 0$.\n$\\Delta = 1 + 8 = 9$ : $X = \\dfrac{-1 + 3}{2} = 1$ ou $X = \\dfrac{-1 - 3}{2} = -2$.\n$\\mathrm{e}^{x} = 1$ donne $x = 0$. $\\mathrm{e}^{x} = -2$ est impossible, car $\\mathrm{e}^{x} > 0$.\nUne seule solution : $x = 0$.\n⛔ Le piège : garder $X = -2$. Une exponentielle n'est jamais négative.\n⭐ Sur le dessin : la courbe de $\\mathrm{e}^{2x} + \\mathrm{e}^{x} - 2$ ne coupe l'axe qu'en $0$. À gauche, elle s'aplatit sur la droite $y = -2$.",
          schema: repere([-4, 2, -3, 3], [{ pts: echantillon((x) => Math.exp(2 * x) + Math.exp(x) - 2, -4, 2, -3, 3) }], [{ x: 0, y: 0, label: "" }], -2),
          micros: ["exp_equation_inequation"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ :\na) $\\mathrm{e}^{x}(x - 2) > 0$\nb) $(\\mathrm{e}^{x} - 1)(x + 3) \\leqslant 0$",
          correction:
            "a) $\\mathrm{e}^{x} > 0$, donc le produit a le signe de $x - 2$ : $S = ]2 ; +\\infty[$.\nb) $\\mathrm{e}^{x} - 1 \\geqslant 0 \\iff \\mathrm{e}^{x} \\geqslant \\mathrm{e}^{0} \\iff x \\geqslant 0$.\n$x + 3 \\geqslant 0 \\iff x \\geqslant -3$.\nLe tableau de signes donne un produit négatif ou nul entre $-3$ et $0$ : $S = [-3 ; 0]$.\n⚠️ $\\mathrm{e}^{x} - 1$ n'est pas toujours positif : il est négatif pour $x < 0$. C'est $\\mathrm{e}^{x}$ seul qui est toujours positif.\n⭐ Les bornes $-3$ et $0$ sont incluses : l'inégalité est large, et le produit s'y annule.",
          schema: tableauSignes(
            ["$-\\infty$", "$-3$", "$0$", "$+\\infty$"],
            [
              ["$x + 3$", ["-", "+", "+"], ["0", ""]],
              ["$\\mathrm{e}^{x} - 1$", ["-", "-", "+"], ["", "0"]],
              ["produit", ["+", "-", "+"], ["0", "0"]],
            ],
          ),
          micros: ["exp_equation_inequation"],
        },
        {
          enonce: "a) Justifier que $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\mathrm{e}^{x} - 1}{x} = 1$.\nb) En déduire $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\mathrm{e}^{3x} - 1}{x}$.",
          correction:
            "a) $\\dfrac{\\mathrm{e}^{x} - 1}{x} = \\dfrac{\\mathrm{e}^{x} - \\mathrm{e}^{0}}{x - 0}$ : c'est le taux d'accroissement de $\\exp$ entre $0$ et $x$.\nQuand $x \\to 0$, il tend vers le nombre dérivé $\\exp'(0) = \\mathrm{e}^{0} = 1$.\nb) On écrit $\\dfrac{\\mathrm{e}^{3x} - 1}{x} = 3 \\times \\dfrac{\\mathrm{e}^{3x} - 1}{3x}$.\nAvec $X = 3x \\to 0$ : $\\dfrac{\\mathrm{e}^{X} - 1}{X} \\to 1$. La limite vaut $3$.\n⚠️ Forme « $\\dfrac{0}{0}$ » : on ne remplace pas $x$ par $0$, on reconnaît un nombre dérivé.\n⭐ Le tableau le confirme : $1{,}0517$, puis $1{,}0050$, puis $1{,}0005$ : ça tend vers $1$.",
          schema: ecranSeulement(tableau(["x", "0,1", "0,01", "0,001"], ["(eˣ − 1)/x", "1,0517", "1,0050", "1,0005"])),
          micros: ["exp_limite", "exp_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Étude d'une fonction : limites aux bornes, dérivée, signe de la dérivée (l'exponentielle est positive : on regarde l'autre facteur), tableau de variations.",
        "Une limite finie $\\ell$ en $+\\infty$ donne une asymptote horizontale $y = \\ell$ ; une limite infinie en $a$ donne une asymptote verticale $x = a$.",
        "$\\mathrm{e}^{x} = a$, avec $a > 0$, a pour unique solution $x = \\ln a$. Si $a \\leqslant 0$, pas de solution.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = (2 - x)\\,\\mathrm{e}^{x}$ sur $\\mathbb{R}$.\na) Déterminer les limites de $f$ en $-\\infty$ et en $+\\infty$. Que dire de la courbe en $-\\infty$ ?\nb) Montrer que $f'(x) = (1 - x)\\,\\mathrm{e}^{x}$ et dresser le tableau de variations.\nc) Résoudre $f(x) = 0$.",
          correction:
            "a) En $-\\infty$ : $f(x) = 2\\mathrm{e}^{x} - x\\,\\mathrm{e}^{x}$. $\\mathrm{e}^{x} \\to 0$ et, par croissance comparée, $x\\,\\mathrm{e}^{x} \\to 0$. Donc $f(x) \\to 0$.\nLa droite $y = 0$ est asymptote à la courbe en $-\\infty$.\nEn $+\\infty$ : $2 - x \\to -\\infty$ et $\\mathrm{e}^{x} \\to +\\infty$. Le produit tend vers $-\\infty$.\nb) $f'(x) = -\\mathrm{e}^{x} + (2 - x)\\,\\mathrm{e}^{x} = (1 - x)\\,\\mathrm{e}^{x}$, du signe de $1 - x$.\n$f$ croît sur $]-\\infty ; 1]$ et décroît sur $[1 ; +\\infty[$. Maximum : $f(1) = \\mathrm{e} \\approx 2{,}72$.\nc) $\\mathrm{e}^{x} \\neq 0$, donc $f(x) = 0 \\iff 2 - x = 0 \\iff x = 2$.\n⚠️ En $-\\infty$, $2 - x \\to +\\infty$ et $\\mathrm{e}^{x} \\to 0$ : forme indéterminée. On développe pour voir la croissance comparée.\n⭐ Le tableau : la flèche monte de $0$ (en $-\\infty$) à $\\mathrm{e} \\approx 2{,}72$, puis descend vers $-\\infty$.",
          schema: tableauVariations(["−∞", "1", "+∞"], ["0", "2,72", "−∞"]),
          micros: ["exp_limite", "exp_deriver"],
        },
        {
          enonce:
            "Quand on charge un condensateur, la tension à ses bornes, en volts, au temps $t$ en millisecondes, est $u(t) = 5\\left(1 - \\mathrm{e}^{-t/2}\\right)$, pour $t \\geqslant 0$.\na) Déterminer la limite de $u$ en $+\\infty$. Interpréter.\nb) Calculer $u'(t)$. Donner la tangente à l'origine. Où coupe-t-elle la droite $y = 5$ ?\nc) Au bout de combien de temps la tension atteint-elle $99$ % de sa valeur limite ?",
          correction:
            "a) $-\\dfrac{t}{2} \\to -\\infty$, donc $\\mathrm{e}^{-t/2} \\to 0$ et $u(t) \\to 5$.\nLa tension se rapproche de $5$ V sans jamais l'atteindre : asymptote $y = 5$.\nb) La dérivée de $\\mathrm{e}^{-t/2}$ est $-\\dfrac{1}{2}\\,\\mathrm{e}^{-t/2}$. Donc $u'(t) = 2{,}5\\,\\mathrm{e}^{-t/2} > 0$.\n$u(0) = 0$ et $u'(0) = 2{,}5$ : la tangente à l'origine est $y = 2{,}5t$. Elle atteint $5$ en $t = 2$.\nc) $u(t) \\geqslant 4{,}95 \\iff 1 - \\mathrm{e}^{-t/2} \\geqslant 0{,}99$ $\\iff \\mathrm{e}^{-t/2} \\leqslant 0{,}01$.\n$\\iff -\\dfrac{t}{2} \\leqslant \\ln(0{,}01) \\iff t \\geqslant -2\\ln(0{,}01) = 2\\ln 100 \\approx 9{,}21$ ms.\n⭐ Sur le dessin : la tangente orange coupe l'asymptote au point rouge d'abscisse $2$. En physique, ce temps s'appelle la constante de temps.\n⚠️ En c), multiplier par $-2$ RETOURNE l'inégalité.",
          schema: repere([-1, 11, -1, 6], [{ pts: echantillon((t) => 5 * (1 - Math.exp(-t / 2)), 0, 11) }, { q: [0, 2.5, 0], couleur: ORANGE }], [{ x: 2, y: 5, label: "" }], 5, true),
          micros: ["exp_limite", "exp_deriver", "exp_equation_inequation"],
        },
        {
          enonce:
            "Pour traiter $n$ données, un algorithme A met $n^3$ microsecondes, un algorithme B met $\\mathrm{e}^{0{,}1n}$ microsecondes.\na) Comparer les deux durées pour $n = 10$ et pour $n = 100$.\nb) Déterminer $\\displaystyle\\lim_{n \\to +\\infty} \\dfrac{\\mathrm{e}^{0{,}1n}}{n^3}$. Conclure.\nc) Que renvoie la fonction Python ci-dessous ? Interpréter.",
          figure: programme(["from math import exp", "", "def seuil():", "    n = 2", "    while exp(0.1*n) <= n**3:", "        n = n + 1", "    return n"]),
          correction:
            "a) Pour $n = 10$ : A met $1\\,000$ µs, B met $\\mathrm{e}^{1} \\approx 2{,}7$ µs. B est bien plus rapide.\nPour $n = 100$ : A met $10^6$ µs, B met $\\mathrm{e}^{10} \\approx 22\\,026$ µs. B reste plus rapide.\nb) On pose $X = 0{,}1n$, donc $n = 10X$ et $n^3 = 1\\,000X^3$ : $\\dfrac{\\mathrm{e}^{0{,}1n}}{n^3} = \\dfrac{1}{1\\,000} \\times \\dfrac{\\mathrm{e}^{X}}{X^3}$.\nPar croissance comparée, $\\dfrac{\\mathrm{e}^{X}}{X^3} \\to +\\infty$ : la limite vaut $+\\infty$. Pour de grandes données, B devient infiniment plus lent que A.\nc) La boucle avance tant que B est plus rapide que A. Elle renvoie $151$ : le premier $n \\geqslant 2$ où B devient plus lent.\n⚠️ Pour de petites données, l'algorithme exponentiel semble meilleur. C'est un piège classique en informatique.\n⭐ À partir de $n = 151$, l'écart ne fait que se creuser : pour $n = 200$, B met déjà environ $60$ fois plus de temps que A.",
          micros: ["exp_limite"],
        },
        {
          enonce:
            "Soit $f(x) = \\dfrac{\\mathrm{e}^{x}}{x}$ sur $]0 ; +\\infty[$.\na) Déterminer les limites de $f$ en $0$ et en $+\\infty$.\nb) Montrer que $f'(x) = \\dfrac{(x - 1)\\,\\mathrm{e}^{x}}{x^2}$ et dresser le tableau de variations.\nc) En déduire que $\\mathrm{e}^{x} \\geqslant \\mathrm{e}\\,x$ pour tout $x > 0$.",
          correction:
            "a) En $0$ : $\\mathrm{e}^{x} \\to 1$ et $x \\to 0^+$. Le quotient tend vers $+\\infty$ : asymptote verticale $x = 0$.\nEn $+\\infty$ : par croissance comparée, $\\dfrac{\\mathrm{e}^{x}}{x} \\to +\\infty$.\nb) Quotient : $f'(x) = \\dfrac{\\mathrm{e}^{x} \\times x - \\mathrm{e}^{x} \\times 1}{x^2}$ $= \\dfrac{(x - 1)\\,\\mathrm{e}^{x}}{x^2}$.\n$\\mathrm{e}^{x} > 0$ et $x^2 > 0$ : $f'(x)$ a le signe de $x - 1$.\n$f$ décroît sur $]0 ; 1]$, croît sur $[1 ; +\\infty[$. Minimum : $f(1) = \\mathrm{e} \\approx 2{,}72$.\nc) Pour tout $x > 0$, $f(x) \\geqslant \\mathrm{e}$, soit $\\dfrac{\\mathrm{e}^{x}}{x} \\geqslant \\mathrm{e}$. On multiplie par $x > 0$ : $\\mathrm{e}^{x} \\geqslant \\mathrm{e}\\,x$.\n⚠️ En $0$, ce n'est PAS une forme indéterminée : $\\dfrac{1}{0^+}$ donne $+\\infty$.\n⭐ Le tableau : deux flèches qui partent de $+\\infty$ et y retournent, avec un creux à $\\mathrm{e}$.",
          schema: tableauVariations(["0", "1", "+∞"], ["+∞", "2,72", "+∞"]),
          micros: ["exp_limite", "exp_deriver"],
        },
        {
          enonce: "Résoudre dans $\\mathbb{R}$ l'équation $\\mathrm{e}^{x} + \\mathrm{e}^{-x} = \\dfrac{5}{2}$.",
          correction:
            "On pose $X = \\mathrm{e}^{x} > 0$. Alors $\\mathrm{e}^{-x} = \\dfrac{1}{X}$, et l'équation devient $X + \\dfrac{1}{X} = \\dfrac{5}{2}$.\nOn multiplie par $2X$, qui n'est pas nul : $2X^2 + 2 = 5X$, soit $2X^2 - 5X + 2 = 0$.\n$\\Delta = 25 - 16 = 9$ : $X = \\dfrac{5 + 3}{4} = 2$ ou $X = \\dfrac{5 - 3}{4} = \\dfrac{1}{2}$.\nLes deux sont positifs : $\\mathrm{e}^{x} = 2$ donne $x = \\ln 2$, et $\\mathrm{e}^{x} = \\dfrac{1}{2}$ donne $x = -\\ln 2$.\n$S = \\{-\\ln 2 ; \\ln 2\\}$, avec $\\ln 2 \\approx 0{,}69$.\n⚠️ $\\mathrm{e}^{-x} = \\dfrac{1}{\\mathrm{e}^{x}}$, pas $-\\mathrm{e}^{x}$.\n⭐ Sur le dessin : la courbe, symétrique, coupe la droite $y = 2{,}5$ en deux points rouges opposés.",
          schema: ecranSeulement(
            repere([-3, 3, -1, 5], [{ pts: echantillon((x) => Math.exp(x) + Math.exp(-x), -3, 3, -1, 5) }], [{ x: -0.69, y: 2.5, label: "" }, { x: 0.69, y: 2.5, label: "" }], 2.5),
          ),
          micros: ["exp_equation_inequation"],
        },
        {
          enonce:
            "Un échantillon radioactif contient $N(t) = 1\\,000\\,\\mathrm{e}^{-0{,}05t}$ milliards de noyaux, $t$ jours après le début des mesures.\na) Étudier les variations de $N$ et sa limite en $+\\infty$.\nb) Montrer qu'il existe une durée $T$ telle que, pour tout $t$, $N(t + T) = \\dfrac{N(t)}{2}$. La calculer.\nc) Combien reste-t-il de noyaux au bout de $60$ jours ?",
          correction:
            "a) $N'(t) = 1\\,000 \\times (-0{,}05)\\,\\mathrm{e}^{-0{,}05t}$ $= -50\\,\\mathrm{e}^{-0{,}05t} < 0$ : $N$ est décroissante.\n$-0{,}05t \\to -\\infty$, donc $N(t) \\to 0$.\nb) $N(t + T) = 1\\,000\\,\\mathrm{e}^{-0{,}05t}\\,\\mathrm{e}^{-0{,}05T}$ $= N(t)\\,\\mathrm{e}^{-0{,}05T}$.\nOn veut $\\mathrm{e}^{-0{,}05T} = \\dfrac{1}{2}$, soit $-0{,}05T = \\ln\\dfrac{1}{2} = -\\ln 2$, donc $T = 20\\ln 2 \\approx 13{,}9$ jours.\nC'est la demi-vie : elle ne dépend pas de $t$.\nc) $N(60) = 1\\,000\\,\\mathrm{e}^{-3} \\approx 49{,}8$ milliards de noyaux.\n⭐ Sur le dessin, une graduation vaut $10$ jours en abscisse et $100$ milliards en ordonnée. La courbe passe par le point rouge (moitié de départ) après $1{,}39$ graduation, soit $13{,}9$ jours.\n⚠️ Au bout de deux demi-vies, il ne reste pas $0$ : il reste le quart.",
          schema: repere([-1, 9, -1, 11], [{ pts: echantillon((x) => 10 * Math.exp(-0.5 * x), 0, 9) }], [{ x: 1.39, y: 5, label: "" }], 5, true),
          micros: ["exp_proprietes", "exp_equation_inequation", "exp_limite"],
        },
        {
          enonce:
            "Démonstration du cours. On pose $g(x) = \\mathrm{e}^{x} - \\dfrac{x^2}{2}$ sur $[0 ; +\\infty[$.\na) On admet que $\\mathrm{e}^{x} \\geqslant x + 1$ pour tout $x$. Montrer que $g$ est croissante.\nb) En déduire que $\\mathrm{e}^{x} > \\dfrac{x^2}{2}$ pour $x \\geqslant 0$, puis que $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\mathrm{e}^{x}}{x} = +\\infty$.\nc) En déduire $\\displaystyle\\lim_{x \\to -\\infty} x\\,\\mathrm{e}^{x}$.",
          correction:
            "a) $g'(x) = \\mathrm{e}^{x} - x$. Or $\\mathrm{e}^{x} \\geqslant x + 1 > x$ : $g'(x) > 0$. $g$ est croissante.\nb) $g(0) = 1$, et $g$ croît : $g(x) \\geqslant 1 > 0$. Donc $\\mathrm{e}^{x} > \\dfrac{x^2}{2}$.\nPour $x > 0$, on divise par $x$ : $\\dfrac{\\mathrm{e}^{x}}{x} > \\dfrac{x}{2}$. Et $\\dfrac{x}{2} \\to +\\infty$.\nPar comparaison, $\\dfrac{\\mathrm{e}^{x}}{x} \\to +\\infty$.\nc) On pose $X = -x$, qui tend vers $+\\infty$ : $x\\,\\mathrm{e}^{x} = -X\\,\\mathrm{e}^{-X} = -\\dfrac{X}{\\mathrm{e}^{X}}$.\n$\\dfrac{\\mathrm{e}^{X}}{X} \\to +\\infty$, donc son inverse tend vers $0$ : $\\displaystyle\\lim_{x \\to -\\infty} x\\,\\mathrm{e}^{x} = 0$.\n⚠️ En b), on divise par $x$ POSITIF : l'inégalité garde son sens.\n⭐ Sur le dessin : la courbe de l'exponentielle reste au-dessus de la parabole orange $y = \\dfrac{x^2}{2}$, qui tend déjà vers $+\\infty$.",
          schema: ecranSeulement(repere([-1, 4, -1, 6], [{ pts: echantillon(Math.exp, -1, 4, -1, 6) }, { q: [0.5, 0, 0], couleur: ORANGE }])),
          micros: ["exp_limite"],
        },
        {
          enonce:
            "a) Donner l'équation de la tangente à la courbe de l'exponentielle au point d'abscisse $a$.\nb) Déterminer la seule tangente qui passe par l'origine du repère.\nc) Étudier $h(x) = \\mathrm{e}^{x} - \\mathrm{e}\\,x$ et en déduire la position de la courbe par rapport à cette tangente.",
          correction:
            "a) $\\exp'(a) = \\mathrm{e}^{a}$ : la tangente est $y = \\mathrm{e}^{a}(x - a) + \\mathrm{e}^{a}$.\nb) Elle passe par $O(0 ; 0)$ si $0 = \\mathrm{e}^{a}(0 - a) + \\mathrm{e}^{a} = \\mathrm{e}^{a}(1 - a)$.\n$\\mathrm{e}^{a} \\neq 0$, donc $a = 1$. La tangente est $y = \\mathrm{e}(x - 1) + \\mathrm{e}$, soit $y = \\mathrm{e}\\,x$.\nc) $h'(x) = \\mathrm{e}^{x} - \\mathrm{e}$, négatif pour $x < 1$ et positif pour $x > 1$.\n$h$ a un minimum en $1$ : $h(1) = \\mathrm{e} - \\mathrm{e} = 0$. Donc $h(x) \\geqslant 0$ : la courbe est au-dessus de sa tangente.\n⚠️ En b), on ne remplace pas $x$ par $1$ dès le départ : c'est $a$, l'inconnue, qu'on cherche.\n⭐ Sur le dessin : la droite orange part de l'origine et touche la courbe au point rouge $(1 ; \\mathrm{e})$.",
          schema: ecranSeulement(repere([-2, 3, -1, 6], [{ pts: echantillon(Math.exp, -2, 3, -1, 6) }, { q: [0, 2.718, 0], couleur: ORANGE }], [{ x: 1, y: 2.72, label: "" }])),
          micros: ["exp_deriver"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. L'exponentielle y décrit une croissance ou une décroissance.",
      rappel: [
        "Plan type : limites, dérivée (avec $(\\mathrm{e}^{u})' = u'\\,\\mathrm{e}^{u}$), signe, tableau de variations, puis les questions du contexte.",
        "Pour une limite en $t\\,\\mathrm{e}^{-at}$, on fait apparaître $X\\,\\mathrm{e}^{-X}$ avec $X = at$, puis on applique la croissance comparée.",
        "Une solution qu'on ne sait pas calculer se trouve à la calculatrice ou par dichotomie, en justifiant qu'elle existe (théorème des valeurs intermédiaires).",
      ],
      exercices: [
        {
          titre: "L'offre et la demande",
          enonce:
            "Pour un prix de vente de $x$ euros, les producteurs proposent $O(x) = \\mathrm{e}^{0{,}5x} - 1$ milliers d'objets, et les clients en demandent $D(x) = 5\\,\\mathrm{e}^{-0{,}5x}$ milliers, pour $x \\geqslant 0$.\na) Étudier les variations de $O$ et de $D$, puis leurs limites en $+\\infty$. Interpréter.\nb) Le prix d'équilibre vérifie $O(x) = D(x)$. En posant $X = \\mathrm{e}^{0{,}5x}$, montrer que $X^2 - X - 5 = 0$.\nc) En déduire le prix d'équilibre et la quantité échangée.\nd) À partir de quel prix la demande passe-t-elle sous $1\\,000$ objets ?",
          correction:
            "a) $O'(x) = 0{,}5\\,\\mathrm{e}^{0{,}5x} > 0$ : l'offre croît. $D'(x) = -2{,}5\\,\\mathrm{e}^{-0{,}5x} < 0$ : la demande décroît.\n$O(x) \\to +\\infty$ et $D(x) \\to 0$ : plus c'est cher, plus on veut vendre, et moins on veut acheter.\nb) $\\mathrm{e}^{-0{,}5x} = \\dfrac{1}{X}$ : l'équation devient $X - 1 = \\dfrac{5}{X}$.\nOn multiplie par $X > 0$ : $X^2 - X = 5$, soit $X^2 - X - 5 = 0$.\nc) $\\Delta = 1 + 20 = 21$ : $X = \\dfrac{1 + \\sqrt{21}}{2} \\approx 2{,}79$ (l'autre racine est négative, on l'écarte).\n$\\mathrm{e}^{0{,}5x} = X$ donne $x = 2\\ln X \\approx 2{,}05$ €.\nLa quantité échangée : $D(x) = \\dfrac{5}{X} \\approx 1{,}79$ millier, soit environ $1\\,790$ objets.\nd) $5\\,\\mathrm{e}^{-0{,}5x} < 1 \\iff \\mathrm{e}^{-0{,}5x} < 0{,}2$ $\\iff -0{,}5x < \\ln 0{,}2$ $\\iff x > -2\\ln 0{,}2 = 2\\ln 5$.\nSoit $x > 2\\ln 5 \\approx 3{,}22$ € : au-delà de $3{,}22$ €.\n⛔ En c), la racine $\\dfrac{1 - \\sqrt{21}}{2}$ est négative : $\\mathrm{e}^{0{,}5x}$ ne peut pas l'égaler.\n⭐ Sur le dessin : l'offre (bleue) monte, la demande (orange) descend ; le point rouge est l'équilibre, vers $(2{,}05 ; 1{,}79)$.",
          schema: repere(
            [-1, 5, -1, 6],
            [{ pts: echantillon((x) => Math.exp(0.5 * x) - 1, 0, 5, -1, 6) }, { pts: echantillon((x) => 5 * Math.exp(-0.5 * x), 0, 5), couleur: ORANGE }],
            [{ x: 2.05, y: 1.79, label: "" }],
          ),
          micros: ["exp_equation_inequation", "exp_proprietes", "exp_defi"],
        },
        {
          titre: "La caféine dans le sang",
          enonce:
            "Après une boisson, la concentration de caféine dans le sang, en mg/L, est $C(t) = 5t\\,\\mathrm{e}^{-0{,}4t}$, où $t \\geqslant 0$ est en heures.\na) Montrer que $C'(t) = 5(1 - 0{,}4t)\\,\\mathrm{e}^{-0{,}4t}$. Quand la concentration est-elle maximale ? Combien vaut-elle ?\nb) En écrivant $C(t) = 12{,}5 \\times 0{,}4t\\,\\mathrm{e}^{-0{,}4t}$, déterminer la limite de $C$ en $+\\infty$.\nc) Pendant quelle période la concentration dépasse-t-elle $3$ mg/L ? (au centième)\nd) Que renvoie la fonction attente() ci-dessous ? Interpréter.",
          figure: programme(["from math import exp", "", "def C(t):", "    return 5*t*exp(-0.4*t)", "", "def attente():", "    t = 2.5", "    while C(t) >= 1:", "        t = t + 0.1", "    return round(t, 1)"]),
          correction:
            "a) Produit : $C'(t) = 5\\,\\mathrm{e}^{-0{,}4t} + 5t \\times (-0{,}4)\\,\\mathrm{e}^{-0{,}4t}$, soit $C'(t) = 5(1 - 0{,}4t)\\,\\mathrm{e}^{-0{,}4t}$.\nL'exponentielle est positive : $C'(t) \\geqslant 0 \\iff t \\leqslant 2{,}5$. $C$ croît jusqu'à $2{,}5$ h, puis décroît.\nMaximum : $C(2{,}5) = 12{,}5\\,\\mathrm{e}^{-1} \\approx 4{,}60$ mg/L, deux heures et demie après.\nb) Avec $X = 0{,}4t \\to +\\infty$ : $X\\,\\mathrm{e}^{-X} = \\dfrac{X}{\\mathrm{e}^{X}} \\to 0$ par croissance comparée. Donc $C(t) \\to 0$.\nc) $C$ est continue et croît de $0$ à $4{,}60$ sur $[0 ; 2{,}5]$ : l'équation $C(t) = 3$ y a une solution, $t_1 \\approx 0{,}84$.\nElle décroît de $4{,}60$ vers $0$ ensuite : une autre solution, $t_2 \\approx 5{,}57$.\nLa concentration dépasse $3$ mg/L entre $0{,}84$ h et $5{,}57$ h environ.\nd) La boucle part du pic et avance de $0{,}1$ h tant que $C(t) \\geqslant 1$. Elle renvoie $9{,}8$ : environ $9{,}8$ h après la boisson, la concentration passe sous $1$ mg/L.\n⚠️ La boucle part de $2{,}5$, après le pic : partie de $0$, elle s'arrêterait tout de suite, car $C(0) = 0 < 1$.\n⭐ Sur le dessin : la courbe dépasse la droite $y = 3$ entre $t_1$ et $t_2$ ; le point rouge est le pic.",
          schema: repere([-1, 12, -1, 6], [{ pts: echantillon((t) => 5 * t * Math.exp(-0.4 * t), 0, 12) }], [{ x: 2.5, y: 4.6, label: "" }], 3, true),
          micros: ["exp_deriver", "exp_limite", "exp_defi"],
        },
        {
          titre: "Des doses répétées",
          enonce:
            "Un patient reçoit une dose de médicament toutes les $12$ heures. Juste après la première dose, la concentration vaut $2$ mg/L ; entre deux doses, elle est multipliée par $\\mathrm{e}^{-1}$, puis la dose suivante ajoute $2$ mg/L. On note $u_n$ la concentration juste après la dose $n + 1$ : $u_0 = 2$ et $u_{n+1} = \\mathrm{e}^{-1}u_n + 2$.\na) On pose $\\ell = \\dfrac{2}{1 - \\mathrm{e}^{-1}}$ et $v_n = u_n - \\ell$. Montrer que $(v_n)$ est géométrique de raison $\\mathrm{e}^{-1}$.\nb) En déduire que $u_n = \\ell - (\\ell - 2)\\,\\mathrm{e}^{-n}$, puis la limite de $(u_n)$.\nc) Vérifier que $\\dfrac{\\ell}{\\ell - 2} = \\mathrm{e}$. À partir de quelle dose la concentration dépasse-t-elle $99$ % de $\\ell$ ?",
          correction:
            "a) $\\ell$ vérifie $\\ell = \\mathrm{e}^{-1}\\ell + 2$, car $\\ell(1 - \\mathrm{e}^{-1}) = 2$.\n$v_{n+1} = \\mathrm{e}^{-1}u_n + 2 - \\ell$ $= \\mathrm{e}^{-1}u_n + 2 - (\\mathrm{e}^{-1}\\ell + 2)$.\nSoit $v_{n+1} = \\mathrm{e}^{-1}(u_n - \\ell) = \\mathrm{e}^{-1}v_n$.\n$(v_n)$ est géométrique de raison $\\mathrm{e}^{-1}$, de premier terme $v_0 = 2 - \\ell$.\nb) $v_n = (2 - \\ell)(\\mathrm{e}^{-1})^n = (2 - \\ell)\\,\\mathrm{e}^{-n}$, donc $u_n = \\ell - (\\ell - 2)\\,\\mathrm{e}^{-n}$.\n$\\mathrm{e}^{-n} \\to 0$ : $\\lim u_n = \\ell \\approx 3{,}16$ mg/L. La concentration se stabilise.\nc) $\\ell - 2 = \\dfrac{2 - 2(1 - \\mathrm{e}^{-1})}{1 - \\mathrm{e}^{-1}}$ $= \\dfrac{2\\mathrm{e}^{-1}}{1 - \\mathrm{e}^{-1}}$, donc $\\dfrac{\\ell}{\\ell - 2} = \\dfrac{1}{\\mathrm{e}^{-1}} = \\mathrm{e}$.\n$u_n \\geqslant 0{,}99\\ell \\iff (\\ell - 2)\\,\\mathrm{e}^{-n} \\leqslant 0{,}01\\ell$ $\\iff \\mathrm{e}^{-n} \\leqslant 0{,}01\\,\\mathrm{e}$.\nSoit $\\mathrm{e}^{-n-1} \\leqslant 0{,}01$, donc $-n - 1 \\leqslant \\ln 0{,}01$, soit $n \\geqslant \\ln 100 - 1 \\approx 3{,}6$.\nDonc $n = 4$ : à partir de la cinquième dose.\n⚠️ $(\\mathrm{e}^{-1})^n = \\mathrm{e}^{-n}$ : on multiplie les exposants.\n⭐ Sur le dessin : les termes $2$ ; $2{,}74$ ; $3{,}01$ ; $3{,}11$… montent vers la droite $y = \\ell \\approx 3{,}16$.",
          schema: repere([-1, 8, -1, 4], [], termes(0, [2, 2.74, 3.01, 3.11, 3.14, 3.16, 3.16, 3.16]), 3.164),
          micros: ["exp_proprietes", "exp_limite", "exp_equation_inequation", "exp_defi"],
        },
        {
          titre: "La croissance d'un arbre",
          enonce:
            "La hauteur d'un arbre, en mètres, $t$ années après sa plantation, est modélisée par $H(t) = 10\\,\\mathrm{e}^{-2\\mathrm{e}^{-0{,}5t}}$, pour $t \\geqslant 0$.\na) Quelle est la hauteur à la plantation ?\nb) Déterminer la limite de $H$ en $+\\infty$. Interpréter.\nc) Montrer que $H'(t) = 10\\,\\mathrm{e}^{-0{,}5t}\\,\\mathrm{e}^{-2\\mathrm{e}^{-0{,}5t}}$. En déduire les variations de $H$.\nd) Au bout de combien d'années l'arbre atteint-il $90$ % de sa hauteur limite ?",
          correction:
            "a) $H(0) = 10\\,\\mathrm{e}^{-2} \\approx 1{,}35$ m.\nb) $\\mathrm{e}^{-0{,}5t} \\to 0$, donc l'exposant $-2\\mathrm{e}^{-0{,}5t} \\to 0$, et $H(t) \\to 10\\,\\mathrm{e}^{0} = 10$.\nL'arbre ne dépassera jamais $10$ m : il s'en approche.\nc) $H = 10\\,\\mathrm{e}^{u}$ avec $u(t) = -2\\mathrm{e}^{-0{,}5t}$, et $u'(t) = -2 \\times (-0{,}5)\\,\\mathrm{e}^{-0{,}5t} = \\mathrm{e}^{-0{,}5t}$.\nDonc $H'(t) = 10\\,u'(t)\\,\\mathrm{e}^{u(t)}$, c'est la formule. Un produit d'exponentielles est positif : $H$ est croissante.\nd) $H(t) \\geqslant 9 \\iff \\mathrm{e}^{-2\\mathrm{e}^{-0{,}5t}} \\geqslant 0{,}9$ $\\iff -2\\mathrm{e}^{-0{,}5t} \\geqslant \\ln 0{,}9$.\nSoit $\\mathrm{e}^{-0{,}5t} \\leqslant -\\dfrac{\\ln 0{,}9}{2} \\approx 0{,}0527$, puis $-0{,}5t \\leqslant \\ln(0{,}0527)$, donc $t \\geqslant 5{,}89$.\nL'arbre atteint $9$ m au bout d'environ $5{,}9$ ans.\n⚠️ En d), diviser par $-2$ puis par $-0{,}5$ retourne DEUX fois l'inégalité.\n⭐ Sur le dessin : la courbe part du point rouge $(0 ; 1{,}35)$, monte en S, et s'aplatit sous la droite $y = 10$.",
          schema: repere([-1, 12, -1, 11], [{ pts: echantillon((t) => 10 * Math.exp(-2 * Math.exp(-0.5 * t)), 0, 12) }], [{ x: 0, y: 1.35, label: "" }], 10, true),
          micros: ["exp_deriver", "exp_limite", "exp_equation_inequation", "exp_defi"],
        },
      ],
    },
  ],
};
