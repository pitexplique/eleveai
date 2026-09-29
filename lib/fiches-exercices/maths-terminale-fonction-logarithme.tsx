// ─── Fiche d'exercices : la fonction logarithme népérien (terminale spé) ──────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`, alignée
// sur `lib/tutor-v4/questionBank/terminale-spe/maths/logarithme.bank.ts`, au
// niveau du bac.
//
// ⭐⭐ LE FIL : LE LOGARITHME DÉFAIT L'EXPONENTIELLE. Il fait descendre les
// exposants : c'est l'outil des seuils (suites géométriques, placements,
// populations), des échelles (pH, décibels) et des comparaisons a^b / b^a.
// Chaque corrigé dessine la courbe et le point qui porte la réponse, ou le
// programme qui cherche le seuil.
//
// Micro-compétences : ln_definition (1, 3, 8), ln_proprietes (2, 9, 13, 19,
// 20), ln_deriver (5, 11, 12, 17, 19), ln_equation_inequation (3, 4, 7, 9, 10,
// 15, 16, 17, 18, 20), ln_limite (6, 8, 11, 14, 17, 19), ln_defi (17, 18, 19,
// 20). 6/6.
//
// Faits cités : la définition du pH (pH = −log[H₃O⁺]) et celle du niveau
// sonore en décibels (L = 10 log(I/I₀)) sont des définitions de physique-
// chimie ; la division par 4 de l'intensité quand la distance double est
// donnée comme hypothèse du modèle. Tout le reste (placement, bénéfice,
// réserve d'oiseaux, machines) est un MODÈLE.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau, tableauSignes, tableauVariations } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

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

export const exercicesFonctionLogarithmeTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "fonction-logarithme",
  titre: "Fonction logarithme népérien",
  accroche:
    "Vingt exercices, de la définition au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la courbe, le seuil cherché ou le programme qui le trouve.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Pour $a > 0$, $\\ln a$ est l'unique réel $x$ tel que $\\mathrm{e}^{x} = a$. Donc $\\mathrm{e}^{\\ln a} = a$ pour $a > 0$, et $\\ln(\\mathrm{e}^{x}) = x$ pour tout $x$. $\\ln 1 = 0$ et $\\ln \\mathrm{e} = 1$.",
        "Pour $a > 0$ et $b > 0$ : $\\ln(ab) = \\ln a + \\ln b$, $\\ln\\dfrac{a}{b} = \\ln a - \\ln b$, $\\ln(a^n) = n\\ln a$, $\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a$.",
        "$\\ln$ est définie, dérivable et croissante sur $]0 ; +\\infty[$, avec $\\ln'(x) = \\dfrac{1}{x}$ et $(\\ln u)' = \\dfrac{u'}{u}$. Donc $\\ln a < \\ln b \\iff a < b$.",
        "Limites : $\\displaystyle\\lim_{x \\to 0^+} \\ln x = -\\infty$, $\\displaystyle\\lim_{x \\to +\\infty} \\ln x = +\\infty$, $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x} = 0$ et $\\displaystyle\\lim_{x \\to 0^+} x\\ln x = 0$.",
      ],
      exercices: [
        {
          enonce:
            "Calculer sans calculatrice :\na) $\\ln 1$, $\\ln \\mathrm{e}$ et $\\ln(\\mathrm{e}^3)$\nb) $\\mathrm{e}^{\\ln 5}$ et $\\mathrm{e}^{2\\ln 3}$\nc) $\\ln\\left(\\dfrac{1}{\\sqrt{\\mathrm{e}}}\\right)$",
          correction:
            "a) $\\mathrm{e}^{0} = 1$, donc $\\ln 1 = 0$. $\\mathrm{e}^{1} = \\mathrm{e}$, donc $\\ln \\mathrm{e} = 1$. Et $\\ln(\\mathrm{e}^3) = 3$.\nb) $\\mathrm{e}^{\\ln 5} = 5$ : l'exponentielle défait le logarithme.\n$\\mathrm{e}^{2\\ln 3} = \\mathrm{e}^{\\ln(3^2)} = 3^2 = 9$.\nc) $\\dfrac{1}{\\sqrt{\\mathrm{e}}} = \\mathrm{e}^{-1/2}$, donc $\\ln\\left(\\dfrac{1}{\\sqrt{\\mathrm{e}}}\\right) = -\\dfrac{1}{2}$.\n⚠️ $\\mathrm{e}^{2\\ln 3}$ ne vaut pas $2 \\times 3$ : le $2$ passe en exposant de $3$.\n⭐ Sur le dessin : la courbe de $\\ln$ (orange) est le reflet de celle de $\\exp$ (bleue) dans la droite grise $y = x$. Elle passe par $(1 ; 0)$ et $(\\mathrm{e} ; 1)$.",
          schema: repere(
            [-3, 5, -3, 5],
            [{ pts: echantillon(Math.exp, -3, 5, -3, 5) }, { pts: echantillon(Math.log, 0.05, 5, -3, 5), couleur: ORANGE }, { q: [0, 1, 0], couleur: GRIS }],
            [{ x: 1, y: 0, label: "" }],
          ),
          micros: ["ln_definition"],
        },
        {
          enonce:
            "Écrire en fonction de $\\ln 2$ et $\\ln 3$ :\na) $\\ln 12$\nb) $\\ln\\dfrac{8}{9}$\nc) $\\ln\\sqrt{6}$\nd) $\\ln\\dfrac{1}{18}$",
          correction:
            "On décompose en facteurs premiers, puis on applique les règles.\na) $12 = 2^2 \\times 3$ : $\\ln 12 = 2\\ln 2 + \\ln 3$.\nb) $\\dfrac{8}{9} = \\dfrac{2^3}{3^2}$ : $\\ln\\dfrac{8}{9} = 3\\ln 2 - 2\\ln 3$.\nc) $\\ln\\sqrt{6} = \\dfrac{1}{2}\\ln 6 = \\dfrac{1}{2}(\\ln 2 + \\ln 3)$.\nd) $18 = 2 \\times 3^2$ : $\\ln\\dfrac{1}{18} = -\\ln 18 = -\\ln 2 - 2\\ln 3$.\n⛔ $\\ln(a + b)$ ne se découpe pas : $\\ln 5 \\neq \\ln 2 + \\ln 3$. Seul un PRODUIT devient une somme.\n⭐ Le tableau vérifie a) : $2 \\times 0{,}693 + 1{,}099 = 2{,}485$.",
          schema: ecranSeulement(tableau(["x", "2", "3", "12"], ["ln x", "0,693", "1,099", "2,485"])),
          micros: ["ln_proprietes"],
        },
        {
          enonce: "Résoudre :\na) $\\ln(2x - 1) = 1$\nb) $\\mathrm{e}^{x} = 7$",
          correction:
            "a) L'équation n'a de sens que si $2x - 1 > 0$, soit $x > \\dfrac{1}{2}$.\n$\\ln(2x - 1) = 1 \\iff 2x - 1 = \\mathrm{e}^{1} \\iff x = \\dfrac{\\mathrm{e} + 1}{2} \\approx 1{,}86$.\nCette valeur est bien supérieure à $\\dfrac{1}{2}$ : $S = \\left\\{\\dfrac{\\mathrm{e} + 1}{2}\\right\\}$.\nb) $\\mathrm{e}^{x} = 7 \\iff x = \\ln 7 \\approx 1{,}95$.\n⚠️ On commence TOUJOURS par l'ensemble où l'équation a un sens : $\\ln$ n'accepte que des nombres strictement positifs.\n⭐ Sur le dessin : la courbe de $\\ln(2x - 1)$ coupe la droite $y = 1$ au point rouge d'abscisse $1{,}86$.",
          schema: repere([-1, 5, -3, 3], [{ pts: echantillon((x) => Math.log(2 * x - 1), 0.55, 5, -3, 3) }], [{ x: 1.86, y: 1, label: "" }], 1),
          micros: ["ln_equation_inequation", "ln_definition"],
        },
        {
          enonce: "Résoudre :\na) $\\ln x < 2$\nb) $\\ln(3 - x) \\geqslant 0$",
          correction:
            "a) Ensemble de définition : $x > 0$. Puis $\\ln x < 2 \\iff \\ln x < \\ln(\\mathrm{e}^2) \\iff x < \\mathrm{e}^2$.\n$S = ]0 ; \\mathrm{e}^2[$, avec $\\mathrm{e}^2 \\approx 7{,}39$.\nb) Ensemble de définition : $3 - x > 0$, soit $x < 3$.\n$\\ln(3 - x) \\geqslant 0 = \\ln 1 \\iff 3 - x \\geqslant 1 \\iff x \\leqslant 2$.\n$S = ]-\\infty ; 2]$.\n⚠️ En a), oublier $x > 0$ donnerait $]-\\infty ; \\mathrm{e}^2[$ : faux, $\\ln(-1)$ n'existe pas.\n⭐ Sur le dessin : la courbe de $\\ln$ reste sous la droite $y = 2$ tant que $x < \\mathrm{e}^2$, au point rouge.",
          schema: ecranSeulement(repere([-1, 9, -3, 3], [{ pts: echantillon(Math.log, 0.05, 9, -3, 3) }], [{ x: 7.39, y: 2, label: "" }], 2)),
          micros: ["ln_equation_inequation"],
        },
        {
          enonce: "Dériver :\na) $f(x) = x\\ln x - x$ sur $]0 ; +\\infty[$\nb) $g(x) = \\ln(x^2 + 1)$ sur $\\mathbb{R}$, puis étudier le signe de $g'(x)$\nc) $h(x) = \\ln(3x)$ sur $]0 ; +\\infty[$",
          correction:
            "a) $(x\\ln x)' = 1 \\times \\ln x + x \\times \\dfrac{1}{x} = \\ln x + 1$. Donc $f'(x) = \\ln x + 1 - 1 = \\ln x$.\nb) $g = \\ln u$ avec $u(x) = x^2 + 1 > 0$ : $g'(x) = \\dfrac{u'(x)}{u(x)} = \\dfrac{2x}{x^2 + 1}$.\nLe dénominateur est positif : $g'(x)$ a le signe de $2x$.\nc) $h'(x) = \\dfrac{3}{3x} = \\dfrac{1}{x}$.\n⭐ En c), c'est logique : $\\ln(3x) = \\ln 3 + \\ln x$, et $\\ln 3$ est une constante.\n⚠️ En b), $(\\ln u)'$ n'est pas $\\dfrac{1}{u}$ : il faut multiplier par $u'$.",
          schema: tableauSignes(
            ["$-\\infty$", "$0$", "$+\\infty$"],
            [
              ["$2x$", ["-", "+"], ["0"]],
              ["$x^2 + 1$", ["+", "+"], [""]],
              ["$g'(x)$", ["-", "+"], ["0"]],
            ],
          ),
          micros: ["ln_deriver"],
        },
        {
          enonce:
            "Déterminer les limites :\na) $\\displaystyle\\lim_{x \\to 0^+} (1 - \\ln x)$\nb) $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x^2}$\nc) $\\displaystyle\\lim_{x \\to 0^+} x\\ln x$\nd) $\\displaystyle\\lim_{x \\to +\\infty} (\\ln x - x)$",
          correction:
            "a) $\\ln x \\to -\\infty$, donc $-\\ln x \\to +\\infty$ et $1 - \\ln x \\to +\\infty$.\nb) $\\dfrac{\\ln x}{x^2} = \\dfrac{\\ln x}{x} \\times \\dfrac{1}{x}$ : produit de deux termes qui tendent vers $0$. La limite vaut $0$.\nc) Forme « $0 \\times \\infty$ ». Par croissance comparée, $x\\ln x \\to 0$.\nd) Forme « $\\infty - \\infty$ ». On factorise : $\\ln x - x = x\\left(\\dfrac{\\ln x}{x} - 1\\right)$.\nLa parenthèse tend vers $-1$ : la limite vaut $-\\infty$.\n⚠️ En d), on factorise par $x$, qui l'emporte sur $\\ln x$ : le logarithme croît beaucoup plus lentement.\n⭐ Sur le dessin (courbe de $x\\ln x$) : elle part de l'origine, descend jusqu'à $-\\dfrac{1}{\\mathrm{e}} \\approx -0{,}37$ en $x = \\dfrac{1}{\\mathrm{e}}$, puis remonte.",
          schema: repere([-1, 3, -1, 4], [{ pts: echantillon((x) => x * Math.log(x), 0.05, 3, -1, 4) }], [{ x: 0.37, y: -0.37, label: "" }]),
          micros: ["ln_limite"],
        },
        {
          enonce: "Déterminer le plus petit entier $n$ tel que $0{,}8^n < 0{,}01$.",
          correction:
            "$\\ln$ est croissante : $0{,}8^n < 0{,}01 \\iff \\ln(0{,}8^n) < \\ln 0{,}01$ $\\iff n\\ln 0{,}8 < \\ln 0{,}01$.\nOr $\\ln 0{,}8 < 0$, car $0{,}8 < 1$. On divise par un NÉGATIF : l'inégalité change de sens.\n$n > \\dfrac{\\ln 0{,}01}{\\ln 0{,}8} \\approx 20{,}6$. Le plus petit entier est $n = 21$.\n⛔ Le piège : garder le sens et conclure $n < 20{,}6$. Toujours regarder le signe de $\\ln q$.\n⭐ Le tableau le confirme : $0{,}8^{20} \\approx 0{,}0115$ est encore trop grand, $0{,}8^{21} \\approx 0{,}0092$ passe sous $0{,}01$.",
          schema: ecranSeulement(tableau(["n", "20", "21"], ["0,8ⁿ", "0,0115", "0,0092"])),
          micros: ["ln_equation_inequation"],
        },
        {
          enonce: "a) Justifier que $\\displaystyle\\lim_{x \\to 0} \\dfrac{\\ln(1 + x)}{x} = 1$.\nb) En déduire $\\displaystyle\\lim_{h \\to 0} \\dfrac{\\ln(1 + 2h)}{h}$.",
          correction:
            "a) $\\dfrac{\\ln(1 + x)}{x} = \\dfrac{\\ln(1 + x) - \\ln 1}{(1 + x) - 1}$ : c'est le taux d'accroissement de $\\ln$ entre $1$ et $1 + x$.\nQuand $x \\to 0$, il tend vers le nombre dérivé $\\ln'(1) = \\dfrac{1}{1} = 1$.\nb) $\\dfrac{\\ln(1 + 2h)}{h} = 2 \\times \\dfrac{\\ln(1 + 2h)}{2h}$. Avec $x = 2h \\to 0$, la fraction tend vers $1$.\nLa limite vaut $2$.\n⚠️ Forme « $\\dfrac{0}{0}$ » : on reconnaît un nombre dérivé, on ne conclut pas « $0$ ».\n⭐ Le tableau montre $\\dfrac{\\ln(1 + x)}{x}$ : $0{,}9531$, puis $0{,}9950$, puis $0{,}9995$.",
          schema: ecranSeulement(tableau(["x", "0,1", "0,01", "0,001"], ["ln(1 + x)/x", "0,9531", "0,9950", "0,9995"])),
          micros: ["ln_limite", "ln_definition"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Équation ou inéquation avec $\\ln$ : 1) l'ensemble où tout a un sens ; 2) on regroupe en un seul $\\ln$ ; 3) $\\ln A = \\ln B \\iff A = B$ ; 4) on garde les solutions de l'ensemble du 1).",
        "Seuil : $q^n < a$ avec $0 < q < 1$ donne $n > \\dfrac{\\ln a}{\\ln q}$, car $\\ln q < 0$ retourne l'inégalité.",
        "Logarithme décimal : $\\log x = \\dfrac{\\ln x}{\\ln 10}$. Il vérifie les mêmes règles, et $\\log(10^n) = n$.",
      ],
      exercices: [
        {
          enonce: "Résoudre l'équation $\\ln x + \\ln(x - 2) = \\ln 3$.",
          correction:
            "Ensemble de définition : $x > 0$ et $x - 2 > 0$, soit $x > 2$.\nSur cet ensemble : $\\ln x + \\ln(x - 2) = \\ln(x(x - 2))$. L'équation devient $x(x - 2) = 3$.\nSoit $x^2 - 2x - 3 = 0$, ou $(x - 3)(x + 1) = 0$ : $x = 3$ ou $x = -1$.\n$-1$ n'est pas dans $]2 ; +\\infty[$ : on l'écarte. $S = \\{3\\}$.\n⛔ Le piège : garder $x = -1$. Pour cette valeur, $\\ln x$ et $\\ln(x - 2)$ n'existent même pas.\n⭐ Sur le dessin : la courbe, qui n'existe qu'à droite de $2$, coupe la droite $y = \\ln 3 \\approx 1{,}1$ en un seul point, d'abscisse $3$.",
          schema: ecranSeulement(repere([-1, 6, -3, 3], [{ pts: echantillon((x) => Math.log(x) + Math.log(x - 2), 2.05, 6, -3, 3) }], [{ x: 3, y: 1.1, label: "" }], 1.099)),
          micros: ["ln_equation_inequation", "ln_proprietes"],
        },
        {
          enonce:
            "On place $5\\,000$ € à $3$ % par an, intérêts composés. Au bout de $n$ années, le capital vaut $5\\,000 \\times 1{,}03^n$ €.\nAu bout de combien d'années dépasse-t-il $8\\,000$ € ?",
          correction:
            "$5\\,000 \\times 1{,}03^n > 8\\,000 \\iff 1{,}03^n > 1{,}6$.\n$\\ln$ est croissante : $n\\ln 1{,}03 > \\ln 1{,}6$.\n$\\ln 1{,}03 > 0$ : on divise sans changer le sens. $n > \\dfrac{\\ln 1{,}6}{\\ln 1{,}03} \\approx 15{,}9$.\nLe capital dépasse $8\\,000$ € au bout de $16$ ans.\n⚠️ Ici, $\\ln 1{,}03 > 0$ car $1{,}03 > 1$ : le sens ne change PAS. Il ne change que pour une raison entre $0$ et $1$.\n⭐ Le tableau le confirme : $7\\,789{,}84$ € après $15$ ans, $8\\,023{,}53$ € après $16$ ans.",
          schema: ecranSeulement(tableau(["années", "15", "16"], ["capital (€)", "7 789,84", "8 023,53"])),
          micros: ["ln_equation_inequation"],
        },
        {
          enonce:
            "Soit $f(x) = x - \\ln x$ sur $]0 ; +\\infty[$.\na) Déterminer la limite de $f$ en $0$, puis en $+\\infty$ en factorisant par $x$.\nb) Étudier les variations de $f$.\nc) En déduire que $\\ln x < x$ pour tout $x > 0$.",
          correction:
            "a) En $0$ : $x \\to 0$ et $-\\ln x \\to +\\infty$. Donc $f(x) \\to +\\infty$.\nEn $+\\infty$ : $f(x) = x\\left(1 - \\dfrac{\\ln x}{x}\\right)$. Or $\\dfrac{\\ln x}{x} \\to 0$ : la parenthèse tend vers $1$, et $f(x) \\to +\\infty$.\nb) $f'(x) = 1 - \\dfrac{1}{x} = \\dfrac{x - 1}{x}$. Sur $]0 ; +\\infty[$, $x > 0$ : le signe est celui de $x - 1$.\n$f$ décroît sur $]0 ; 1]$ et croît sur $[1 ; +\\infty[$. Minimum : $f(1) = 1 - 0 = 1$.\nc) Pour tout $x > 0$, $f(x) \\geqslant 1 > 0$, soit $x - \\ln x > 0$ : $\\ln x < x$.\n⚠️ En $+\\infty$, « $\\infty - \\infty$ » est indéterminée : c'est la factorisation qui conclut.\n⭐ Le tableau : deux flèches qui partent de $+\\infty$ et y retournent, avec un creux à $1$.",
          schema: tableauVariations(["0", "1", "+∞"], ["+∞", "1", "+∞"]),
          micros: ["ln_deriver", "ln_limite"],
        },
        {
          enonce:
            "Soit $f(x) = \\ln(x^2 - 4x + 5)$.\na) Montrer que $x^2 - 4x + 5 = (x - 2)^2 + 1$. En déduire que $f$ est définie sur $\\mathbb{R}$.\nb) Calculer $f'(x)$ et dresser les variations de $f$.\nc) Déterminer les limites de $f$ en $-\\infty$ et $+\\infty$.",
          correction:
            "a) $(x - 2)^2 + 1 = x^2 - 4x + 4 + 1 = x^2 - 4x + 5$. C'est une somme d'un carré et de $1$ : c'est toujours $\\geqslant 1 > 0$.\nDonc $\\ln(x^2 - 4x + 5)$ existe pour tout réel $x$.\nb) $f = \\ln u$ avec $u(x) = x^2 - 4x + 5$ : $f'(x) = \\dfrac{2x - 4}{x^2 - 4x + 5}$, du signe de $2x - 4$.\n$f$ décroît sur $]-\\infty ; 2]$ et croît sur $[2 ; +\\infty[$. Minimum : $f(2) = \\ln 1 = 0$.\nc) $x^2 - 4x + 5 \\to +\\infty$ en $\\pm\\infty$, et $\\ln X \\to +\\infty$ quand $X \\to +\\infty$ : les deux limites valent $+\\infty$.\n⚠️ Le signe de $f'$ se lit sur le numérateur SEULEMENT parce que le dénominateur est positif. On le justifie.\n⭐ Sur le dessin : la courbe est symétrique par rapport à la droite $x = 2$, et touche l'axe au point rouge $(2 ; 0)$.",
          schema: repere([-1, 5, -1, 3], [{ pts: echantillon((x) => Math.log(x * x - 4 * x + 5), -1, 5) }], [{ x: 2, y: 0, label: "" }]),
          micros: ["ln_deriver"],
        },
        {
          enonce:
            "En chimie, le pH d'une solution est $\\mathrm{pH} = -\\log c$, où $c$ est la concentration en ions oxonium, en mol/L, et $\\log x = \\dfrac{\\ln x}{\\ln 10}$.\na) Calculer le pH pour $c = 10^{-3}$.\nb) On dilue la solution dix fois : $c$ est divisée par $10$. Que devient le pH ?\nc) Calculer le pH pour $c = 4 \\times 10^{-5}$ (au centième).\nd) Quelle est la concentration d'une solution de pH $7{,}4$ ?",
          correction:
            "a) $\\log(10^{-3}) = \\dfrac{-3\\ln 10}{\\ln 10} = -3$, donc $\\mathrm{pH} = 3$.\nb) $-\\log\\dfrac{c}{10} = -(\\log c - \\log 10) = -\\log c + 1$. Le pH augmente de $1$.\nc) $\\log(4 \\times 10^{-5}) = \\log 4 - 5$, donc $\\mathrm{pH} = 5 - \\log 4 \\approx 4{,}40$.\nd) $-\\log c = 7{,}4 \\iff \\log c = -7{,}4$ $\\iff c = 10^{-7{,}4} \\approx 4{,}0 \\times 10^{-8}$ mol/L.\n⚠️ Diviser la concentration par $10$ n'enlève pas $10$ au pH : cela lui AJOUTE $1$. Le logarithme transforme les produits en sommes.\n⭐ Le tableau : chaque fois que $c$ est divisée par $10$, le pH gagne $1$.",
          schema: ecranSeulement(tableau(["c (mol/L)", "0,01", "0,001", "0,0001"], ["pH", "2", "3", "4"])),
          micros: ["ln_proprietes"],
        },
        {
          enonce:
            "Démonstration du cours.\na) En posant $X = \\ln x$, montrer que $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x} = 0$. On admet que $\\displaystyle\\lim_{X \\to +\\infty} \\dfrac{\\mathrm{e}^{X}}{X} = +\\infty$.\nb) En posant $X = \\dfrac{1}{x}$, en déduire $\\displaystyle\\lim_{x \\to 0^+} x\\ln x$.",
          correction:
            "a) Si $X = \\ln x$, alors $x = \\mathrm{e}^{X}$, et $X \\to +\\infty$ quand $x \\to +\\infty$.\n$\\dfrac{\\ln x}{x} = \\dfrac{X}{\\mathrm{e}^{X}}$, l'inverse de $\\dfrac{\\mathrm{e}^{X}}{X}$, qui tend vers $+\\infty$. Donc $\\dfrac{\\ln x}{x} \\to 0$.\nb) Si $X = \\dfrac{1}{x}$, alors $X \\to +\\infty$ quand $x \\to 0^+$.\n$x\\ln x = \\dfrac{1}{X}\\ln\\dfrac{1}{X} = -\\dfrac{\\ln X}{X}$. D'après a), cela tend vers $0$.\n⚠️ Le changement de variable doit aussi changer la LIMITE : $x \\to 0^+$ devient $X \\to +\\infty$.\n⭐ Le tableau : $\\dfrac{\\ln x}{x}$ vaut $0{,}2303$ en $10$, $0{,}0461$ en $100$, $0{,}0069$ en $1\\,000$.",
          schema: ecranSeulement(tableau(["x", "10", "100", "1000"], ["ln(x)/x", "0,2303", "0,0461", "0,0069"])),
          micros: ["ln_limite"],
        },
        {
          enonce: "Résoudre :\na) $\\ln(x + 1) - \\ln x \\leqslant \\ln 2$\nb) $(\\ln x)^2 - \\ln x - 2 > 0$",
          correction:
            "a) Ensemble : $x + 1 > 0$ et $x > 0$, soit $x > 0$.\n$\\ln\\dfrac{x + 1}{x} \\leqslant \\ln 2 \\iff \\dfrac{x + 1}{x} \\leqslant 2 \\iff x + 1 \\leqslant 2x$ (car $x > 0$) $\\iff x \\geqslant 1$.\n$S = [1 ; +\\infty[$.\nb) Ensemble : $x > 0$. On pose $X = \\ln x$ : $X^2 - X - 2 > 0$, soit $(X - 2)(X + 1) > 0$.\nC'est vrai pour $X < -1$ ou $X > 2$. Donc $\\ln x < -1$ ou $\\ln x > 2$.\n$S = ]0 ; \\mathrm{e}^{-1}[ \\cup ]\\mathrm{e}^2 ; +\\infty[$, avec $\\mathrm{e}^{-1} \\approx 0{,}37$ et $\\mathrm{e}^2 \\approx 7{,}39$.\n⚠️ En a), on multiplie par $x$ parce qu'il est POSITIF : l'inégalité garde son sens.\n⭐ Sur le dessin : la courbe de $(\\ln x)^2 - \\ln x - 2$ est au-dessus de l'axe avant le premier point rouge et après le second.",
          schema: repere([-1, 9, -3, 3], [{ pts: echantillon((x) => Math.log(x) ** 2 - Math.log(x) - 2, 0.05, 9, -3, 3) }], [{ x: 0.37, y: 0, label: "" }, { x: 7.39, y: 0, label: "" }]),
          micros: ["ln_equation_inequation"],
        },
        {
          enonce:
            "Pour résoudre une équation, on cherche la solution dans $[0 ; 1]$ par dichotomie : à chaque étape, l'intervalle est coupé en deux. La fonction Python ci-dessous compte les étapes.\na) Quelle est la longueur de l'intervalle après $n$ étapes ?\nb) Combien faut-il d'étapes pour une longueur inférieure à $10^{-6}$ ?\nc) Que renvoie etapes(10**-6) ?",
          figure: programme(["def etapes(p):", "    n = 0", "    L = 1", "    while L >= p:", "        L = L / 2", "        n = n + 1", "    return n"]),
          correction:
            "a) La longueur est divisée par $2$ à chaque étape : après $n$ étapes, elle vaut $\\dfrac{1}{2^n}$.\nb) $\\dfrac{1}{2^n} < 10^{-6} \\iff 2^n > 10^6 \\iff n\\ln 2 > 6\\ln 10$.\n$\\ln 2 > 0$ : $n > \\dfrac{6\\ln 10}{\\ln 2} \\approx 19{,}93$. Il faut $20$ étapes.\nc) La boucle divise $L$ par $2$ tant que $L \\geqslant 10^{-6}$ : etapes(10**-6) renvoie $20$.\n⭐ Vingt étapes pour six décimales : chaque étape gagne un chiffre binaire. Il en faut environ $3{,}3$ pour gagner une décimale.\n⚠️ $19{,}93$ n'est pas une réponse : un nombre d'étapes est entier, on prend l'entier SUIVANT.",
          micros: ["ln_equation_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. Le logarithme y fait descendre les exposants.",
      rappel: [
        "Plan type : ensemble de définition, limites (croissances comparées), dérivée avec $(\\ln u)' = \\dfrac{u'}{u}$, signe, tableau, puis les questions du contexte.",
        "Pour comparer $a^b$ et $b^a$ ($a, b > 0$), on compare leurs logarithmes : $b\\ln a$ et $a\\ln b$.",
        "Un seuil se trouve par le calcul ($\\ln$) ou par un programme (boucle while) ; les deux doivent donner le même rang.",
      ],
      exercices: [
        {
          titre: "Le bénéfice d'un atelier",
          enonce:
            "Un atelier fabrique $x$ centaines d'objets, avec $x \\in ]0 ; 13]$. Son bénéfice, en milliers d'euros, est $B(x) = 10x - 4x\\ln x$.\na) Déterminer la limite de $B$ en $0$.\nb) Montrer que $B'(x) = 6 - 4\\ln x$.\nc) Étudier les variations de $B$. Quelle production donne le bénéfice maximal ? Combien vaut-il ?\nd) À partir de quelle production l'atelier perd-il de l'argent ?",
          correction:
            "a) $10x \\to 0$ et, par croissance comparée, $x\\ln x \\to 0$. Donc $B(x) \\to 0$.\nb) $(x\\ln x)' = \\ln x + 1$, donc $B'(x) = 10 - 4(\\ln x + 1) = 6 - 4\\ln x$.\nc) $B'(x) \\geqslant 0 \\iff \\ln x \\leqslant 1{,}5 \\iff x \\leqslant \\mathrm{e}^{1{,}5} \\approx 4{,}48$.\n$B$ croît sur $]0 ; \\mathrm{e}^{1{,}5}]$ et décroît sur $[\\mathrm{e}^{1{,}5} ; 13]$.\nMaximum : $B(\\mathrm{e}^{1{,}5}) = \\mathrm{e}^{1{,}5}(10 - 4 \\times 1{,}5)$ $= 4\\mathrm{e}^{1{,}5} \\approx 17{,}93$, soit environ $17\\,930$ € pour $448$ objets.\nd) $B(x) = x(10 - 4\\ln x)$ et $x > 0$ : $B(x) < 0 \\iff \\ln x > 2{,}5 \\iff x > \\mathrm{e}^{2{,}5} \\approx 12{,}18$.\nAu-delà de $1\\,218$ objets environ, l'atelier perd de l'argent.\n⚠️ En c), le maximum se calcule avec la valeur EXACTE $\\mathrm{e}^{1{,}5}$, où $\\ln x = 1{,}5$ : c'est ce qui simplifie le calcul.\n⭐ Sur le dessin, une graduation vaut $2$ milliers d'euros : les points rouges sont le sommet $(4{,}48 ; 8{,}96)$ et le passage à zéro en $12{,}18$.",
          schema: repere([-1, 14, -1, 10], [{ pts: echantillon((x) => (10 * x - 4 * x * Math.log(x)) / 2, 0.05, 13, -1, 10) }], [{ x: 4.48, y: 8.96, label: "" }, { x: 12.18, y: 0, label: "" }], undefined, true),
          micros: ["ln_deriver", "ln_limite", "ln_equation_inequation", "ln_defi"],
        },
        {
          titre: "Les oiseaux de la réserve",
          enonce:
            "Une réserve compte $1\\,000$ oiseaux en 2025. Chaque année, $15$ % disparaissent, puis on en réintroduit $60$. On note $u_n$ le nombre d'oiseaux en $2025 + n$ : $u_0 = 1\\,000$ et $u_{n+1} = 0{,}85u_n + 60$.\na) On pose $v_n = u_n - 400$. Montrer que $(v_n)$ est géométrique.\nb) En déduire $u_n$ en fonction de $n$ et sa limite.\nc) Déterminer par le calcul l'année où la population passe sous $450$ oiseaux.\nd) Que renvoie la fonction seuil() ci-dessous ? Est-ce cohérent ?",
          figure: programme(["def seuil():", "    n = 0", "    u = 1000", "    while u >= 450:", "        u = 0.85*u + 60", "        n = n + 1", "    return n"]),
          correction:
            "a) $v_{n+1} = 0{,}85u_n + 60 - 400 = 0{,}85u_n - 340$.\nOn factorise : $v_{n+1} = 0{,}85(u_n - 400) = 0{,}85v_n$.\n$(v_n)$ est géométrique de raison $0{,}85$, de premier terme $v_0 = 600$.\nb) $v_n = 600 \\times 0{,}85^n$, donc $u_n = 400 + 600 \\times 0{,}85^n$.\n$0 < 0{,}85 < 1$ : $0{,}85^n \\to 0$ et $\\lim u_n = 400$. La population se stabilise vers $400$ oiseaux.\nc) $u_n < 450 \\iff 600 \\times 0{,}85^n < 50 \\iff 0{,}85^n < \\dfrac{1}{12}$.\n$\\iff n\\ln 0{,}85 < -\\ln 12 \\iff n > \\dfrac{\\ln 12}{-\\ln 0{,}85} \\approx 15{,}3$, car $\\ln 0{,}85 < 0$.\nDonc $n = 16$ : la population passe sous $450$ en $2041$.\nd) La boucle calcule les termes tant qu'ils restent $\\geqslant 450$ : elle renvoie $16$. C'est cohérent avec c) : $u_{15} \\approx 452{,}4$ et $u_{16} \\approx 444{,}6$.\n⚠️ En c), diviser par $\\ln 0{,}85$, négatif, RETOURNE l'inégalité.\n⭐ Sur le dessin, une graduation vaut $100$ oiseaux : les points descendent vers la droite $y = 4$, c'est-à-dire $400$ oiseaux.",
          schema: repere([-1, 9, -1, 11], [], termes(0, [10, 9.1, 8.34, 7.68, 7.13, 6.66, 6.26, 5.92, 5.63]), 4, true),
          micros: ["ln_equation_inequation", "ln_defi"],
        },
        {
          titre: "Qui a raison : e puissance π ou π puissance e ?",
          enonce:
            "Deux élèves se disputent. Léa affirme que $\\mathrm{e}^{\\pi} > \\pi^{\\mathrm{e}}$, Tom affirme le contraire. On étudie $f(x) = \\dfrac{\\ln x}{x}$ sur $]0 ; +\\infty[$.\na) Déterminer les limites de $f$ en $0$ et en $+\\infty$.\nb) Montrer que $f'(x) = \\dfrac{1 - \\ln x}{x^2}$ et dresser le tableau de variations.\nc) Pour $a > 0$ et $b > 0$, montrer que $a^b > b^a \\iff f(a) > f(b)$.\nd) Qui a raison ? Et pourquoi a-t-on $2^4 = 4^2$ ?",
          correction:
            "a) En $0$ : $\\ln x \\to -\\infty$ et $\\dfrac{1}{x} \\to +\\infty$ : $f(x) \\to -\\infty$. En $+\\infty$ : $f(x) \\to 0$ (croissance comparée).\nb) Quotient : $f'(x) = \\dfrac{\\dfrac{1}{x} \\times x - \\ln x \\times 1}{x^2} = \\dfrac{1 - \\ln x}{x^2}$, du signe de $1 - \\ln x$.\n$1 - \\ln x \\geqslant 0 \\iff x \\leqslant \\mathrm{e}$. $f$ croît sur $]0 ; \\mathrm{e}]$, décroît ensuite. Maximum : $f(\\mathrm{e}) = \\dfrac{1}{\\mathrm{e}} \\approx 0{,}37$.\nc) $\\ln$ est croissante : $a^b > b^a \\iff b\\ln a > a\\ln b$. On divise par $ab > 0$ : $\\iff \\dfrac{\\ln a}{a} > \\dfrac{\\ln b}{b}$.\nd) $f$ atteint son maximum en $\\mathrm{e}$, et $\\pi \\neq \\mathrm{e}$ : $f(\\mathrm{e}) > f(\\pi)$. D'après c), $\\mathrm{e}^{\\pi} > \\pi^{\\mathrm{e}}$ : Léa a raison.\nEn effet, $\\mathrm{e}^{\\pi} \\approx 23{,}14$ et $\\pi^{\\mathrm{e}} \\approx 22{,}46$.\nEt $f(4) = \\dfrac{\\ln 4}{4} = \\dfrac{2\\ln 2}{4} = \\dfrac{\\ln 2}{2} = f(2)$ : d'où $2^4 = 4^2$.\n⚠️ Les deux nombres sont proches : une intuition « à l'œil » ne tranche pas. C'est l'étude de fonction qui décide.\n⭐ Le tableau : $f$ monte de $-\\infty$ jusqu'à $0{,}37$ en $\\mathrm{e}$, puis redescend vers $0$. Le sommet est en $\\mathrm{e}$, et aucun autre nombre ne l'atteint.",
          schema: tableauVariations(["0", "e", "+∞"], ["−∞", "0,37", "0"]),
          micros: ["ln_deriver", "ln_limite", "ln_proprietes", "ln_defi"],
        },
        {
          titre: "Le bruit de l'atelier",
          enonce:
            "Le niveau sonore, en décibels (dB), d'un bruit d'intensité $I$ est $L = 10\\log\\dfrac{I}{I_0}$, où $I_0$ est une intensité de référence et $\\log x = \\dfrac{\\ln x}{\\ln 10}$. Une machine seule produit $70$ dB. Avec $n$ machines identiques, l'intensité est multipliée par $n$.\na) Montrer que $n$ machines produisent $L_n = 70 + 10\\log n$ dB.\nb) Quel est le niveau avec deux machines ? avec quatre ?\nc) Combien faut-il de machines pour atteindre $80$ dB ?\nd) On admet que l'intensité est divisée par $4$ quand on s'éloigne deux fois plus. De combien baisse le niveau ?\ne) Combien de machines au plus pour rester sous $85$ dB ?",
          correction:
            "a) $L_n = 10\\log\\dfrac{nI}{I_0} = 10\\left(\\log n + \\log\\dfrac{I}{I_0}\\right) = 10\\log n + 70$.\nb) $L_2 = 70 + 10\\log 2 \\approx 73{,}0$ dB. $L_4 = 70 + 20\\log 2 \\approx 76{,}0$ dB.\nc) $70 + 10\\log n = 80 \\iff \\log n = 1 \\iff n = 10$ : dix machines.\nd) $10\\log\\dfrac{I}{4I_0} = L - 10\\log 4$. Le niveau baisse de $10\\log 4 \\approx 6{,}0$ dB.\ne) $70 + 10\\log n < 85 \\iff \\log n < 1{,}5 \\iff n < 10^{1{,}5} \\approx 31{,}6$. Au plus $31$ machines.\n⚠️ Deux machines ne font pas $140$ dB : doubler l'intensité ajoute seulement $3$ dB. Le logarithme transforme le produit en somme.\n⭐ Sur le dessin : la courbe de $10\\log x$ (le niveau au-dessus de $70$ dB) passe par les points rouges $3$, $6$ et $10$ pour $2$, $4$ et $10$ machines. Chaque doublement ajoute la même hauteur.",
          schema: repere([-1, 13, -1, 12], [{ pts: echantillon((x) => 10 * Math.log10(x), 1, 13) }], [{ x: 2, y: 3.01, label: "" }, { x: 4, y: 6.02, label: "" }, { x: 10, y: 10, label: "" }], undefined, true),
          micros: ["ln_proprietes", "ln_equation_inequation", "ln_defi"],
        },
      ],
    },
  ],
};
