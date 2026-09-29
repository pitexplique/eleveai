// ─── Fiche d'exercices : équations différentielles (terminale spé) ────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`. Alignée
// sur `lib/tutor-v4/questionBank/terminale-spe/maths/equations-differentielles.bank.ts`
// et sa version `-concours` (isoler y' avant de lire a, signe de −b/a,
// condition initiale ailleurs qu'en 0).
//
// ⭐⭐ LE FIL : UNE SOLUTION SE VOIT. Chaque solution est tracée ; la solution
// constante −b/a est une droite horizontale vers laquelle les courbes se
// couchent ; le CHAMP DE PENTES (aide locale `champ` : un petit trait de pente
// f(x, y) en chaque point d'une grille) montre qu'une solution suit la pente
// que l'équation impose, et qu'une fausse solution la coupe.
//
// ⛔ Pas de répétition de la feuille de 1re spé sur l'exponentielle : ici, on
// RÉSOUT (y' = ay, y' = ay + b, y' = ay + f avec solution particulière), on
// démontre la forme des solutions de y' = ay, et on modélise.
//
// Micro-compétences : equadiff_reconnaitre (1, 6, 8, 10, 12, 16, 17),
// equadiff_y_prime_ay (1, 2, 3, 6, 8, 9, 18), equadiff_y_prime_ay_b (4, 7,
// 10, 11, 12, 15, 16, 17, 18, 19), equadiff_solution_particuliere (5, 13, 14,
// 20), equadiff_condition_initiale (3, 7, 9, 10, 11, 12, 13, 14, 15, 17, 18,
// 19, 20), equadiff_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : la demi-vie du carbone 14, environ 5 730 ans (ex. 9, donnée
// par la constante λ de l'énoncé) ; la « loi de refroidissement de Newton »
// (nom du modèle, ex. 10) ; pour un circuit RC, 63 % de la charge au bout de
// τ et la règle des physiciens « chargé au bout de 5τ » (ex. 11). Le reste
// (café, parachutiste, étang, épargne, espèce, perfusion, enquête, maison) :
// des MODÈLES, chiffres choisis.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau, type Courbe } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

/** Le CHAMP DE PENTES d'une équation y' = pente(x, y) : en chaque point de la
 *  grille xs × ys, un petit trait gris (longueur 0,6) de pente pente(x, y). */
const champ = (pente: (x: number, y: number) => number, xs: number[], ys: number[]): Courbe[] =>
  xs.flatMap((x) =>
    ys.map((y) => {
      const s = pente(x, y);
      const d = 0.3 / Math.hypot(1, s);
      const r = (v: number) => Math.round(v * 1000) / 1000;
      return { pts: [[r(x - d), r(y - s * d)], [r(x + d), r(y + s * d)]] as [number, number][], couleur: GRIS };
    }),
  );

export const exercicesEquationDifferentielleTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "equation-differentielle",
  titre: "Équations différentielles",
  accroche:
    "Vingt exercices, de la solution qu'on vérifie au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle trace les solutions, qui se couchent sur leur état d'équilibre.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Une équation différentielle a pour inconnue une FONCTION $y$. Une solution sur $I$ est une fonction dérivable qui vérifie l'égalité pour TOUT $x$ de $I$.",
        "$y' = ay$ : les solutions sont les fonctions $x \\mapsto C\\mathrm{e}^{ax}$, avec $C$ réel.",
        "$y' = ay + b$, avec $a \\neq 0$ : les solutions sont les $x \\mapsto C\\mathrm{e}^{ax} - \\dfrac{b}{a}$. La constante $-\\dfrac{b}{a}$ est la solution constante.",
        "Une condition initiale $y(x_0) = y_0$ fixe $C$ : il y a alors une seule solution.",
      ],
      exercices: [
        {
          enonce:
            "On considère l'équation $(E)$ : $y' = 0{,}5y$. Le dessin montre, en gris, la pente imposée par $(E)$ en quelques points : en $(x ; y)$, une solution doit avoir une tangente de pente $0{,}5y$.\nParmi les fonctions suivantes, lesquelles sont solutions de $(E)$ sur $\\mathbb{R}$ ?\n$f_1(x) = \\mathrm{e}^{0{,}5x}$ ; $f_2(x) = -3\\mathrm{e}^{0{,}5x}$ ; $f_3(x) = \\mathrm{e}^{2x}$ ; $f_4(x) = 0{,}5\\mathrm{e}^{x}$ ; $f_5(x) = 0$.",
          figure: repere(
            [-4, 4, -4, 4],
            [
              ...champ((x, y) => 0.5 * y, [-3, -2, -1, 0, 1, 2, 3], [-3, -2, -1, 0, 1, 2, 3]),
              { pts: echantillon((x) => Math.exp(0.5 * x), -4, 4, -4, 4) },
              { pts: echantillon((x) => Math.exp(2 * x), -4, 4, -4, 4), couleur: ORANGE },
            ],
          ),
          correction:
            "On dérive, puis on compare $f'$ à $0{,}5f$.\n$f_1'(x) = 0{,}5\\mathrm{e}^{0{,}5x} = 0{,}5f_1(x)$ : solution.\n$f_2'(x) = -1{,}5\\mathrm{e}^{0{,}5x} = 0{,}5f_2(x)$ : solution.\n$f_3'(x) = 2\\mathrm{e}^{2x}$, alors que $0{,}5f_3(x) = 0{,}5\\mathrm{e}^{2x}$ : pas solution.\n$f_4'(x) = 0{,}5\\mathrm{e}^{x}$, alors que $0{,}5f_4(x) = 0{,}25\\mathrm{e}^{x}$ : pas solution.\n$f_5' = 0 = 0{,}5 \\times 0$ : la fonction nulle est solution.\n⚠️ Le $0{,}5$ doit être DANS l'exponentielle : $0{,}5\\mathrm{e}^{x}$ n'est pas solution, alors que $C\\mathrm{e}^{0{,}5x}$ l'est pour tout $C$.\n⚠️ Une solution doit vérifier l'égalité pour TOUT $x$, pas en un seul point.\n⭐ Sur le dessin : la courbe bleue de $f_1$ suit les petits traits gris en chaque point ; la courbe orange de $f_3$ les coupe, trop raide.",
          micros: ["equadiff_reconnaitre", "equadiff_y_prime_ay"],
        },
        {
          enonce: "Résoudre sur $\\mathbb{R}$ chaque équation différentielle :\na) $y' = -2y$\nb) $3y' = y$\nc) $y' + 4y = 0$\nd) $2y' - 5y = 0$",
          correction:
            "On isole $y'$ pour écrire $y' = ay$. Les solutions sont alors les $x \\mapsto C\\mathrm{e}^{ax}$, $C$ réel.\na) $a = -2$ : $y(x) = C\\mathrm{e}^{-2x}$.\nb) $y' = \\dfrac{1}{3}y$ : $y(x) = C\\mathrm{e}^{\\frac{x}{3}}$.\nc) $y' = -4y$ : $y(x) = C\\mathrm{e}^{-4x}$.\nd) $y' = \\dfrac{5}{2}y$ : $y(x) = C\\mathrm{e}^{\\frac{5x}{2}}$.\n⚠️ En b), $a = \\dfrac{1}{3}$, pas $3$ : on divise par le coefficient de $y'$ avant de lire $a$.\n⚠️ En c), $y' + 4y = 0$ donne $y' = -4y$ : le signe change quand $4y$ passe de l'autre côté.\n⭐ Le tableau donne $a$ pour chaque équation, une fois $y'$ isolé.",
          schema: ecranSeulement(tableau(["équation", "a", "b", "c", "d"], ["a", "−2", "1/3", "−4", "5/2"])),
          micros: ["equadiff_y_prime_ay"],
        },
        {
          enonce: "a) Déterminer la solution de $y' = -0{,}5y$ qui vérifie $y(0) = 4$.\nb) Déterminer la solution de $y' = 2y$ qui vérifie $y(2) = 3$.",
          correction:
            "a) Les solutions sont les $y(x) = C\\mathrm{e}^{-0{,}5x}$. $y(0) = C\\mathrm{e}^{0} = C$, donc $C = 4$ : $y(x) = 4\\mathrm{e}^{-0{,}5x}$.\nb) Les solutions sont les $y(x) = C\\mathrm{e}^{2x}$. $y(2) = C\\mathrm{e}^{4} = 3$, donc $C = 3\\mathrm{e}^{-4}$.\nAinsi $y(x) = 3\\mathrm{e}^{-4}\\mathrm{e}^{2x} = 3\\mathrm{e}^{2x - 4}$.\n⚠️ En b), la condition n'est pas en $0$ : $C$ n'est PAS la valeur $3$. On remplace $x$ par $2$ dans $C\\mathrm{e}^{2x}$.\n⭐ Sur le dessin (a) : chaque valeur de $C$ donne une courbe, et elles ne se croisent jamais. La seule qui passe par le point $(0 ; 4)$ est la courbe orange.",
          schema: repere(
            [-2, 5, -3, 6],
            [
              { pts: echantillon((x) => Math.exp(-0.5 * x), -2, 5, -3, 6), couleur: GRIS },
              { pts: echantillon((x) => 2 * Math.exp(-0.5 * x), -2, 5, -3, 6), couleur: GRIS },
              { pts: echantillon((x) => -2 * Math.exp(-0.5 * x), -2, 5, -3, 6), couleur: GRIS },
              { pts: echantillon((x) => 4 * Math.exp(-0.5 * x), -2, 5, -3, 6), couleur: ORANGE },
            ],
            [{ x: 0, y: 4, label: "" }],
          ),
          micros: ["equadiff_condition_initiale", "equadiff_y_prime_ay"],
        },
        {
          enonce: "Résoudre sur $\\mathbb{R}$ :\na) $y' = 2y - 6$\nb) $y' = -3y + 12$\nc) $y' + y = 5$\nd) $2y' = y + 1$",
          correction:
            "Pour $y' = ay + b$, avec $a \\neq 0$, les solutions sont les $x \\mapsto C\\mathrm{e}^{ax} - \\dfrac{b}{a}$, $C$ réel.\na) $a = 2$ et $b = -6$ : $-\\dfrac{b}{a} = 3$, et $y(x) = C\\mathrm{e}^{2x} + 3$.\nb) $a = -3$ et $b = 12$ : $-\\dfrac{b}{a} = 4$, et $y(x) = C\\mathrm{e}^{-3x} + 4$.\nc) $y' = -y + 5$ : $y(x) = C\\mathrm{e}^{-x} + 5$.\nd) $y' = 0{,}5y + 0{,}5$ : $-\\dfrac{b}{a} = -1$, et $y(x) = C\\mathrm{e}^{0{,}5x} - 1$.\n⚠️ Le signe de $-\\dfrac{b}{a}$ : en a), $-\\dfrac{-6}{2} = 3$, pas $-3$. On vérifie : la constante $3$ a pour dérivée $0$, et $2 \\times 3 - 6 = 0$.\n⭐ Sur le dessin (b) : les solutions se rapprochent toutes de la droite $y = 4$, la solution constante. Au-dessus, elles descendent ; au-dessous, elles montent.",
          schema: ecranSeulement(
            repere(
              [-1, 4, -1, 8],
              [
                { pts: echantillon((x) => 3 * Math.exp(-3 * x) + 4, -1, 4, -1, 8) },
                { pts: echantillon((x) => -4 * Math.exp(-3 * x) + 4, -1, 4, -1, 8) },
                { pts: echantillon((x) => 2 * Math.exp(-3 * x) + 4, -1, 4, -1, 8), couleur: ORANGE },
              ],
              [],
              4,
            ),
          ),
          micros: ["equadiff_y_prime_ay_b"],
        },
        {
          enonce:
            "On considère $(E)$ : $y' = -y + 2x + 3$.\na) Vérifier que $g(x) = 2x + 1$ est une solution de $(E)$.\nb) On admet que les solutions de $(E)$ sont les fonctions $g + h$, où $h$ est solution de $y' = -y$. Les donner.",
          correction:
            "a) $g'(x) = 2$. Et $-g(x) + 2x + 3 = -2x - 1 + 2x + 3 = 2$. Les deux membres sont égaux pour tout $x$ : $g$ est solution.\nb) Les solutions de $y' = -y$ sont les $h(x) = C\\mathrm{e}^{-x}$. Les solutions de $(E)$ sont donc les $y(x) = C\\mathrm{e}^{-x} + 2x + 1$, $C$ réel.\n⚠️ Une solution particulière ne suffit pas : il faut lui ajouter TOUTES les solutions de l'équation sans second membre, $y' = -y$.\n⚠️ Vérifier, c'est calculer les DEUX membres séparément, puis constater qu'ils sont égaux. On ne part pas de l'égalité à démontrer.\n⭐ Sur le dessin : les solutions bleues ($C = 3$ et $C = -2$) se rapprochent de la droite orange $y = 2x + 1$, car $C\\mathrm{e}^{-x}$ tend vers $0$ en $+\\infty$.",
          schema: repere(
            [-2, 4, -2, 8],
            [
              { q: [0, 2, 1], couleur: ORANGE },
              { pts: echantillon((x) => 3 * Math.exp(-x) + 2 * x + 1, -2, 4, -2, 8) },
              { pts: echantillon((x) => -2 * Math.exp(-x) + 2 * x + 1, -2, 4, -2, 8) },
            ],
          ),
          micros: ["equadiff_solution_particuliere"],
        },
        {
          enonce:
            "La courbe tracée est celle d'une fonction $f$, solution d'une équation $y' = ay$, avec sa tangente au point d'abscisse $0$.\na) Lire $f(0)$ et $f'(0)$.\nb) En déduire $a$, puis l'expression de $f(x)$.",
          figure: repere(
            [-3, 3, -1, 5],
            [{ pts: echantillon((x) => 2 * Math.exp(0.5 * x), -3, 3, -1, 5) }, { q: [0, 1, 2], couleur: ORANGE }],
            [{ x: 0, y: 2, label: "" }],
          ),
          correction:
            "a) La courbe passe par $(0 ; 2)$ : $f(0) = 2$. La tangente orange passe par $(0 ; 2)$ et $(-2 ; 0)$ : sa pente vaut $\\dfrac{2 - 0}{0 - (-2)} = 1$, donc $f'(0) = 1$.\nb) En $x = 0$, l'équation donne $f'(0) = a f(0)$, soit $1 = 2a$ : $a = 0{,}5$.\nLes solutions de $y' = 0{,}5y$ sont les $C\\mathrm{e}^{0{,}5x}$, et $f(0) = C = 2$. Donc $f(x) = 2\\mathrm{e}^{0{,}5x}$.\n⚠️ $a$ n'est pas la pente de la tangente : c'est la pente DIVISÉE par la valeur, $a = \\dfrac{f'(0)}{f(0)}$.\n⭐ Sur le dessin : la tangente coupe l'axe des abscisses en $-2$. Pour une solution de $y' = 0{,}5y$, elle le coupe toujours deux unités à gauche du point de contact : c'est $-\\dfrac{1}{a}$.",
          micros: ["equadiff_reconnaitre", "equadiff_y_prime_ay"],
        },
        {
          enonce: "Déterminer la solution de $y' = -0{,}5y + 3$ qui vérifie $y(0) = 1$, puis sa limite en $+\\infty$.",
          correction:
            "$-\\dfrac{b}{a} = -\\dfrac{3}{-0{,}5} = 6$ : les solutions sont les $y(x) = C\\mathrm{e}^{-0{,}5x} + 6$.\n$y(0) = C + 6 = 1$, donc $C = -5$ : $y(x) = 6 - 5\\mathrm{e}^{-0{,}5x}$.\n$\\mathrm{e}^{-0{,}5x} \\to 0$ quand $x \\to +\\infty$ : la limite vaut $6$.\n⚠️ On applique la condition à la solution COMPLÈTE : $C + 6 = 1$. Écrire $C = 1$ oublierait le $6$.\n⭐ Sur le dessin : la solution part du point $(0 ; 1)$ et monte vers la droite $y = 6$, sans jamais l'atteindre.",
          schema: ecranSeulement(repere([-1, 8, -1, 7], [{ pts: echantillon((x) => 6 - 5 * Math.exp(-0.5 * x), 0, 8) }], [{ x: 0, y: 1, label: "" }], 6)),
          micros: ["equadiff_condition_initiale", "equadiff_y_prime_ay_b"],
        },
        {
          enonce:
            "Démonstration du cours. Soit $a$ un réel.\na) Vérifier que, pour tout réel $C$, $x \\mapsto C\\mathrm{e}^{ax}$ est solution de $y' = ay$.\nb) Réciproquement, soit $y$ une solution. On pose $z(x) = y(x)\\mathrm{e}^{-ax}$. Montrer que $z' = 0$.\nc) Conclure.",
          correction:
            "a) $(C\\mathrm{e}^{ax})' = Ca\\mathrm{e}^{ax} = a \\times C\\mathrm{e}^{ax}$ : c'est bien une solution.\nb) On dérive le produit : $z'(x) = y'(x)\\mathrm{e}^{-ax} - a\\,y(x)\\mathrm{e}^{-ax}$.\nDonc $z'(x) = (y'(x) - a\\,y(x))\\mathrm{e}^{-ax} = 0$, car $y' = ay$.\nc) $z' = 0$ sur $\\mathbb{R}$, qui est un intervalle : $z$ est constante, égale à un réel $C$.\nAlors $y(x)\\mathrm{e}^{-ax} = C$, soit $y(x) = C\\mathrm{e}^{ax}$. Les solutions sont exactement ces fonctions.\n⚠️ « Dérivée nulle, donc constante » n'est vrai que sur un INTERVALLE.\n⚠️ Il faut les deux sens : a) montre que ces fonctions sont solutions, b) et c) qu'il n'y en a pas d'autres.\n⭐ Sur le dessin ($a = 1$) : par chaque point du plan passe une seule solution. Les courbes $C\\mathrm{e}^{x}$ ne se croisent jamais, et suivent toutes les petits traits gris.",
          schema: ecranSeulement(
            repere(
              [-3, 3, -3, 4],
              [
                ...champ((x, y) => y, [-2, -1, 0, 1, 2], [-2, -1, 0, 1, 2, 3]),
                { pts: echantillon((x) => Math.exp(x), -3, 3, -3, 4) },
                { pts: echantillon((x) => 0.5 * Math.exp(x), -3, 3, -3, 4) },
                { pts: echantillon((x) => -Math.exp(x), -3, 3, -3, 4), couleur: ORANGE },
              ],
            ),
          ),
          micros: ["equadiff_y_prime_ay", "equadiff_reconnaitre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Avec une condition $y(t_0) = y_0$ : on écrit la solution générale COMPLÈTE, puis on remplace $t$ par $t_0$ pour trouver $C$.",
        "Si $a < 0$, toutes les solutions de $y' = ay + b$ tendent vers $-\\dfrac{b}{a}$ en $+\\infty$ : c'est l'état d'équilibre du modèle.",
        "Pour $y' = ay + f$ : si $g$ est une solution particulière, les solutions sont les $x \\mapsto C\\mathrm{e}^{ax} + g(x)$.",
        "Une quantité qui décroît comme $\\mathrm{e}^{-\\lambda t}$ est divisée par $2$ au bout de la demi-vie $T = \\dfrac{\\ln 2}{\\lambda}$.",
      ],
      exercices: [
        {
          enonce:
            "Le carbone 14 d'un organisme mort se désintègre. Le nombre $N(t)$ de noyaux, $t$ années après la mort, vérifie $N' = -\\lambda N$, avec $\\lambda = 1{,}21 \\times 10^{-4}$ par an. On note $N_0 = N(0)$.\na) Exprimer $N(t)$ en fonction de $N_0$ et de $t$.\nb) Calculer la demi-vie du carbone 14, arrondie à la dizaine d'années.\nc) Un os ne contient plus que $25$ % du carbone 14 de départ. Quel est son âge, à la centaine d'années près ?",
          correction:
            "a) C'est $y' = ay$ avec $a = -\\lambda$ : $N(t) = C\\mathrm{e}^{-\\lambda t}$, et $N(0) = C = N_0$. Donc $N(t) = N_0\\mathrm{e}^{-\\lambda t}$.\nb) On cherche $T$ tel que $N(T) = \\dfrac{N_0}{2}$ : $\\mathrm{e}^{-\\lambda T} = \\dfrac{1}{2}$, soit $-\\lambda T = -\\ln 2$.\n$T = \\dfrac{\\ln 2}{\\lambda} \\approx 5\\,730$ ans.\nc) $\\mathrm{e}^{-\\lambda t} = 0{,}25$ donne $t = -\\dfrac{\\ln(0{,}25)}{\\lambda} = \\dfrac{\\ln 4}{\\lambda} \\approx 11\\,457$, soit environ $11\\,500$ ans.\n⭐ Plus vite : $25$ %, c'est la moitié de la moitié. L'âge vaut deux demi-vies, environ $2 \\times 5\\,730 = 11\\,460$ ans.\n⚠️ $\\ln(0{,}25)$ est négatif : le signe moins devant le quotient donne bien un âge positif.\n⭐ Sur le dessin (une graduation horizontale vaut $1\\,000$ ans, une verticale $10$ %) : la courbe coupe la droite $y = 5$ ($50$ %) vers $5{,}7$, puis la droite $y = 2{,}5$ ($25$ %) vers $11{,}5$.",
          schema: repere(
            [-1, 14, -1, 11],
            [{ pts: echantillon((x) => 10 * Math.exp(-0.121 * x), 0, 14) }],
            [
              { x: 5.73, y: 5, label: "" },
              { x: 11.46, y: 2.5, label: "" },
            ],
            [5, 2.5],
            true,
          ),
          micros: ["equadiff_y_prime_ay", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "Un café servi à $80$ °C refroidit dans une pièce à $20$ °C. Sa température $\\theta(t)$, en °C, $t$ minutes après, vérifie la loi de refroidissement de Newton : $\\theta' = -0{,}1(\\theta - 20)$, avec $\\theta(0) = 80$.\na) Écrire l'équation sous la forme $y' = ay + b$.\nb) Déterminer $\\theta(t)$.\nc) Au bout de combien de temps le café est-il à $40$ °C ?\nd) Quelle est la limite de $\\theta(t)$ ? Interpréter.",
          correction:
            "a) $\\theta' = -0{,}1\\theta + 2$ : $a = -0{,}1$ et $b = 2$.\nb) $-\\dfrac{b}{a} = 20$ : $\\theta(t) = C\\mathrm{e}^{-0{,}1t} + 20$. $\\theta(0) = C + 20 = 80$ donne $C = 60$.\nDonc $\\theta(t) = 20 + 60\\mathrm{e}^{-0{,}1t}$.\nc) $20 + 60\\mathrm{e}^{-0{,}1t} = 40$ équivaut à $\\mathrm{e}^{-0{,}1t} = \\dfrac{1}{3}$, soit $t = 10\\ln 3 \\approx 11$ min.\nd) $\\mathrm{e}^{-0{,}1t} \\to 0$, donc $\\theta(t) \\to 20$ : le café finit à la température de la pièce.\n⚠️ C'est l'ÉCART $\\theta - 20$ qui décroît comme une exponentielle, pas la température elle-même : elle ne tend pas vers $0$ °C.\n⚠️ Sur le dessin, une graduation horizontale vaut $5$ min et une verticale $10$ °C.\n⭐ Sur le dessin : la courbe part de $80$ °C et s'aplatit sur la droite $y = 2$ ($20$ °C). Elle coupe la droite $y = 4$ ($40$ °C) au point rouge, vers $2{,}2$ graduations, soit $11$ min.",
          schema: repere([-1, 8, -1, 9], [{ pts: echantillon((x) => 2 + 6 * Math.exp(-0.5 * x), 0, 8) }], [{ x: 2.2, y: 4, label: "" }], [2, 4]),
          micros: ["equadiff_y_prime_ay_b", "equadiff_condition_initiale", "equadiff_reconnaitre"],
        },
        {
          enonce:
            "On charge un condensateur à travers une résistance, sous une tension $E = 5$ V. La tension $u(t)$ à ses bornes, en volts, $t$ millisecondes après la fermeture de l'interrupteur, vérifie $2u' + u = 5$ et $u(0) = 0$. La constante $\\tau = 2$ ms est le temps caractéristique du circuit.\na) Déterminer $u(t)$.\nb) Calculer $u(\\tau)$. Quel pourcentage de $E$ est atteint ?\nc) Au bout de combien de temps le condensateur est-il chargé à $99$ % ? Comparer à $5\\tau$.",
          correction:
            "a) On divise par $2$ : $u' = -0{,}5u + 2{,}5$. $-\\dfrac{b}{a} = 5$ : $u(t) = C\\mathrm{e}^{-0{,}5t} + 5$.\n$u(0) = C + 5 = 0$, donc $C = -5$ et $u(t) = 5(1 - \\mathrm{e}^{-0{,}5t})$.\nb) $u(2) = 5(1 - \\mathrm{e}^{-1}) \\approx 3{,}16$ V, soit environ $63$ % de $E$.\nc) $u(t) = 4{,}95$ équivaut à $\\mathrm{e}^{-0{,}5t} = 0{,}01$, soit $t = 2\\ln(100) \\approx 9{,}2$ ms.\nC'est environ $4{,}6\\tau$ : un peu moins que les $5\\tau$ de la règle des physiciens.\n⚠️ On divise d'abord par $2$ : l'équation $2u' + u = 5$ donne $a = -0{,}5$, pas $a = -1$.\n⭐ Sur le dessin : la tension monte vite, puis s'aplatit sous la droite $y = 5$. Le point rouge marque $t = \\tau$, où $63$ % de la charge est faite.",
          schema: repere([-1, 12, -1, 6], [{ pts: echantillon((t) => 5 - 5 * Math.exp(-0.5 * t), 0, 12) }], [{ x: 2, y: 3.16, label: "" }], 5, true),
          micros: ["equadiff_y_prime_ay_b", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "Un parachutiste en chute, avant l'ouverture, subit un frottement proportionnel à sa vitesse. On modélise sa vitesse $v(t)$, en m/s, $t$ secondes après le saut, par $v' = 10 - 0{,}2v$ et $v(0) = 0$.\na) Déterminer $v(t)$.\nb) Quelle est la vitesse limite, en m/s puis en km/h ?\nc) Au bout de combien de temps atteint-il $90$ % de cette vitesse ?",
          correction:
            "a) $v' = -0{,}2v + 10$ : $-\\dfrac{b}{a} = \\dfrac{10}{0{,}2} = 50$, et $v(t) = C\\mathrm{e}^{-0{,}2t} + 50$.\n$v(0) = C + 50 = 0$ : $C = -50$, donc $v(t) = 50(1 - \\mathrm{e}^{-0{,}2t})$.\nb) $\\mathrm{e}^{-0{,}2t} \\to 0$ : la vitesse tend vers $50$ m/s, soit $50 \\times 3{,}6 = 180$ km/h.\nc) $v(t) = 45$ équivaut à $\\mathrm{e}^{-0{,}2t} = 0{,}1$, soit $t = 5\\ln(10) \\approx 11{,}5$ s.\n⚠️ La vitesse limite est la solution constante : le frottement y compense exactement le poids ($10 - 0{,}2v = 0$). On la trouve sans rien résoudre.\n⚠️ Pour passer des m/s aux km/h, on multiplie par $3{,}6$ (et non on divise).\n⭐ Sur le dessin (une graduation verticale vaut $10$ m/s) : la vitesse monte vers la droite $y = 5$, soit $50$ m/s. Le point rouge marque $90$ % de cette vitesse.",
          schema: ecranSeulement(repere([-1, 14, -1, 6], [{ pts: echantillon((t) => 5 * (1 - Math.exp(-0.2 * t)), 0, 14) }], [{ x: 11.51, y: 4.5, label: "" }], 5, true)),
          micros: ["equadiff_y_prime_ay_b", "equadiff_reconnaitre", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "On considère $(E)$ : $y' = 2y - 4x$.\na) Déterminer les réels $m$ et $p$ tels que $g(x) = mx + p$ soit solution de $(E)$.\nb) Montrer que $y$ est solution de $(E)$ si, et seulement si, $y - g$ est solution de $y' = 2y$.\nc) En déduire les solutions de $(E)$, puis celle qui vérifie $y(0) = 0$.",
          correction:
            "a) $g' = m$. On veut $m = 2(mx + p) - 4x$ pour tout $x$, soit $m = (2m - 4)x + 2p$.\nLe coefficient de $x$ doit être nul : $2m - 4 = 0$, donc $m = 2$. Puis $m = 2p$ : $p = 1$. Donc $g(x) = 2x + 1$.\nb) Comme $g' = 2g - 4x$ : $y' = 2y - 4x$ équivaut à $y' - g' = 2y - 2g$, c'est-à-dire $(y - g)' = 2(y - g)$.\nc) $y - g = C\\mathrm{e}^{2x}$ : les solutions sont les $y(x) = C\\mathrm{e}^{2x} + 2x + 1$.\n$y(0) = C + 1 = 0$ donne $C = -1$ : $y(x) = -\\mathrm{e}^{2x} + 2x + 1$.\n⚠️ En a), « pour tout $x$ » : on identifie les coefficients. Une seule valeur de $x$ ne suffirait pas.\n⭐ Sur le dessin : la solution orange colle à la droite $y = 2x + 1$ vers la gauche, puis s'en écarte brutalement : $-\\mathrm{e}^{2x}$ l'emporte quand $x$ grandit.",
          schema: ecranSeulement(
            repere([-3, 2, -4, 4], [{ q: [0, 2, 1] }, { pts: echantillon((x) => -Math.exp(2 * x) + 2 * x + 1, -3, 2, -4, 4), couleur: ORANGE }]),
          ),
          micros: ["equadiff_solution_particuliere", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "Après un accident, un polluant se déverse dans un étang. On modélise la masse $q(t)$ de polluant dans l'étang, en kg, $t$ jours après, par $q' + q = 10\\mathrm{e}^{-t}$ et $q(0) = 0$.\na) Vérifier que $g(t) = 10t\\,\\mathrm{e}^{-t}$ est solution de l'équation.\nb) En déduire toutes les solutions, puis $q(t)$.\nc) Quand la masse de polluant est-elle maximale ? Quelle est cette masse ?",
          correction:
            "a) $g'(t) = 10\\mathrm{e}^{-t} - 10t\\,\\mathrm{e}^{-t}$. Donc $g'(t) + g(t) = 10\\mathrm{e}^{-t}$ : $g$ est solution.\nb) L'équation s'écrit $q' = -q + 10\\mathrm{e}^{-t}$. Les solutions sont $g$ plus celles de $y' = -y$ : $q(t) = C\\mathrm{e}^{-t} + 10t\\,\\mathrm{e}^{-t}$.\n$q(0) = C = 0$ : $q(t) = 10t\\,\\mathrm{e}^{-t}$ ; c'est $g$ elle-même.\nc) $q'(t) = 10(1 - t)\\mathrm{e}^{-t}$, du signe de $1 - t$ : $q$ croît sur $[0 ; 1]$, puis décroît.\nLe maximum est atteint au bout d'un jour : $q(1) = 10\\mathrm{e}^{-1} \\approx 3{,}68$ kg.\n⚠️ Ici le second membre n'est pas constant : la formule $C\\mathrm{e}^{at} - \\dfrac{b}{a}$ ne s'applique PAS. On passe par la solution particulière.\n⭐ Sur le dessin : la masse monte tant que l'apport l'emporte, culmine au point rouge après un jour, puis l'étang élimine plus qu'il ne reçoit.",
          schema: repere([-1, 7, -1, 5], [{ pts: echantillon((t) => 10 * t * Math.exp(-t), 0, 7) }], [{ x: 1, y: 3.68, label: "" }]),
          micros: ["equadiff_solution_particuliere", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "Une épargnante place son argent à intérêts composés en continu, au taux de $3$ % par an, et verse régulièrement $1\\,200$ euros par an. Son capital $K(t)$, en euros, $t$ années après l'ouverture, vérifie $K' = 0{,}03K + 1\\,200$ et $K(0) = 0$.\na) Déterminer $K(t)$.\nb) Calculer le capital au bout de $10$ ans, à l'euro près. Quelle part vient des intérêts ?\nc) Que devient $K(t)$ quand $t$ tend vers $+\\infty$ ?",
          correction:
            "a) $-\\dfrac{b}{a} = -\\dfrac{1\\,200}{0{,}03} = -40\\,000$ : $K(t) = C\\mathrm{e}^{0{,}03t} - 40\\,000$.\n$K(0) = C - 40\\,000 = 0$ : $C = 40\\,000$, et $K(t) = 40\\,000(\\mathrm{e}^{0{,}03t} - 1)$.\nb) $K(10) = 40\\,000(\\mathrm{e}^{0{,}3} - 1) \\approx 13\\,994$ euros. Elle a versé $12\\,000$ euros : les intérêts rapportent environ $1\\,994$ euros.\nc) $0{,}03 > 0$, donc $\\mathrm{e}^{0{,}03t} \\to +\\infty$ et $K(t) \\to +\\infty$.\n⚠️ Ici $a > 0$ : les solutions s'ÉLOIGNENT de la solution constante $-40\\,000$. Il n'y a pas d'équilibre.\n⭐ Sur le dessin (une graduation verticale vaut $5\\,000$ euros) : la courbe bleue du capital passe au-dessus de la droite grise des versements cumulés. L'écart entre les deux, ce sont les intérêts.",
          schema: ecranSeulement(
            repere(
              [-1, 13, -1, 5],
              [{ pts: echantillon((t) => 8 * (Math.exp(0.03 * t) - 1), 0, 13) }, { q: [0, 0.24, 0], couleur: GRIS }],
              [{ x: 10, y: 2.8, label: "" }],
              undefined,
              true,
            ),
          ),
          micros: ["equadiff_y_prime_ay_b", "equadiff_condition_initiale"],
        },
        {
          enonce:
            "La courbe tracée est celle d'une solution $f$ d'une équation $y' = ay + b$. On lit : $f(0) = 1$, la tangente en $0$ a pour pente $1$, et la courbe s'approche de la droite $y = 3$ en $+\\infty$.\na) Justifier que $-\\dfrac{b}{a} = 3$. En déduire une relation entre $a$ et $b$.\nb) Avec la tangente en $0$, trouver $a$ et $b$.\nc) En déduire $f(x)$.",
          figure: repere(
            [-2, 7, -1, 4],
            [{ pts: echantillon((x) => 3 - 2 * Math.exp(-0.5 * x), -2, 7, -1, 4) }, { q: [0, 1, 1], couleur: ORANGE }],
            [{ x: 0, y: 1, label: "" }],
            3,
          ),
          correction:
            "a) Les solutions sont les $C\\mathrm{e}^{ax} - \\dfrac{b}{a}$. $f$ n'est pas constante ($C \\neq 0$) et a une limite finie : il faut $a < 0$, et alors $f \\to -\\dfrac{b}{a}$.\nDonc $-\\dfrac{b}{a} = 3$, soit $b = -3a$.\nb) En $0$ : $f'(0) = a f(0) + b$, soit $1 = a - 3a = -2a$. Donc $a = -0{,}5$ et $b = 1{,}5$.\nc) $f(x) = C\\mathrm{e}^{-0{,}5x} + 3$ et $f(0) = C + 3 = 1$ : $C = -2$. Donc $f(x) = 3 - 2\\mathrm{e}^{-0{,}5x}$.\nVérification : $f'(x) = \\mathrm{e}^{-0{,}5x}$, et $f'(0) = 1$.\n⚠️ Avec $a > 0$, $C\\mathrm{e}^{ax}$ partirait vers l'infini : une limite finie impose $a < 0$.\n⭐ Sur le dessin : la tangente orange en $(0 ; 1)$ a pour pente $1$, et la courbe se couche sur la droite $y = 3$, la solution constante.",
          micros: ["equadiff_reconnaitre", "equadiff_y_prime_ay_b"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. La solution y raconte une évolution.",
      rappel: [
        "Un changement de fonction inconnue ($z = \\dfrac{1}{y}$, ou $z = y - g$) ramène une équation nouvelle à $y' = ay + b$ : on résout en $z$, puis on revient à $y$, condition initiale comprise.",
        "Pour résoudre $\\mathrm{e}^{kt} = c$, avec $c > 0$ : $kt = \\ln c$.",
        "On interprète : la limite est l'état d'équilibre, un maximum est un pic, une date négative est dans le passé.",
      ],
      exercices: [
        {
          titre: "Une espèce réintroduite",
          enonce:
            "On réintroduit une espèce dans une réserve. Sa population $y(t)$, en centaines d'individus, $t$ années après, vérifie $y' = 0{,}05y(10 - y)$ et $y(0) = 1$. On admet que $y(t) > 0$ pour tout $t \\geqslant 0$.\na) Cette équation est-elle de la forme $y' = ay + b$ ?\nb) On pose $z = \\dfrac{1}{y}$. Montrer que $z' = -0{,}5z + 0{,}05$.\nc) En déduire $z(t)$, puis montrer que $y(t) = \\dfrac{10}{1 + 9\\mathrm{e}^{-0{,}5t}}$.\nd) Déterminer la limite de $y(t)$. Interpréter.\ne) Au bout de combien de temps la population atteint-elle $500$ individus ?",
          correction:
            "a) Non : $y' = 0{,}5y - 0{,}05y^2$ contient $y^2$. On ne sait pas la résoudre directement.\nb) $z' = -\\dfrac{y'}{y^2} = -\\dfrac{0{,}5y - 0{,}05y^2}{y^2}$ $= -\\dfrac{0{,}5}{y} + 0{,}05$.\nDonc $z' = -0{,}5z + 0{,}05$.\nc) $-\\dfrac{b}{a} = \\dfrac{0{,}05}{0{,}5} = 0{,}1$ : $z(t) = C\\mathrm{e}^{-0{,}5t} + 0{,}1$. Et $z(0) = \\dfrac{1}{y(0)} = 1$, donc $C = 0{,}9$.\n$y(t) = \\dfrac{1}{0{,}9\\mathrm{e}^{-0{,}5t} + 0{,}1}$. On multiplie en haut et en bas par $10$ : $y(t) = \\dfrac{10}{1 + 9\\mathrm{e}^{-0{,}5t}}$.\nd) $\\mathrm{e}^{-0{,}5t} \\to 0$, donc $y(t) \\to 10$. La population se stabilise vers $1\\,000$ individus : c'est ce que la réserve peut nourrir.\ne) $y(t) = 5$ équivaut à $1 + 9\\mathrm{e}^{-0{,}5t} = 2$, soit $\\mathrm{e}^{-0{,}5t} = \\dfrac{1}{9}$, et $t = 2\\ln 9 \\approx 4{,}4$ ans.\n⚠️ La condition initiale se transforme elle aussi : $z(0) = \\dfrac{1}{y(0)}$. Ici elle vaut $1$ parce que $y(0) = 1$ ; avec $y(0) = 2$, ce serait $0{,}5$.\n⭐ Sur le dessin : la courbe en S part lentement, s'accélère jusqu'au point rouge (la moitié, $500$ individus), puis ralentit et se couche sur la droite $y = 10$.",
          schema: repere([-1, 14, -1, 11], [{ pts: echantillon((t) => 10 / (1 + 9 * Math.exp(-0.5 * t)), 0, 14) }], [{ x: 4.39, y: 5, label: "" }], 10, true),
          micros: ["equadiff_defi", "equadiff_reconnaitre", "equadiff_y_prime_ay_b", "equadiff_condition_initiale"],
        },
        {
          titre: "Une perfusion",
          enonce:
            "Un patient reçoit un médicament par perfusion, à raison de $4$ mg par heure ; son organisme en élimine $20$ % par heure. La quantité $q(t)$ de médicament dans le sang, en mg, vérifie $q' = -0{,}2q + 4$, avec $q(0) = 0$. Le médicament est efficace au-dessus de $15$ mg.\na) Déterminer $q(t)$.\nb) Au bout de combien de temps le médicament devient-il efficace ?\nc) On arrête la perfusion au bout de $10$ heures. Ensuite, $q' = -0{,}2q$. Calculer $q(10)$, puis exprimer $q(t)$ pour $t \\geqslant 10$.\nd) Pendant combien de temps, en tout, le médicament est-il efficace ?",
          correction:
            "a) $-\\dfrac{b}{a} = \\dfrac{4}{0{,}2} = 20$ : $q(t) = C\\mathrm{e}^{-0{,}2t} + 20$. $q(0) = C + 20 = 0$, donc $q(t) = 20(1 - \\mathrm{e}^{-0{,}2t})$.\nb) $q(t) = 15$ équivaut à $\\mathrm{e}^{-0{,}2t} = 0{,}25$, soit $t = 5\\ln 4 \\approx 6{,}93$ h.\nc) $q(10) = 20(1 - \\mathrm{e}^{-2}) \\approx 17{,}29$ mg.\nPour $t \\geqslant 10$ : $q(t) = K\\mathrm{e}^{-0{,}2t}$, et la condition en $10$ donne $K\\mathrm{e}^{-2} = q(10)$.\nDonc $q(t) = q(10)\\,\\mathrm{e}^{-0{,}2(t - 10)}$.\nd) Pour $t \\geqslant 10$, $q(t) = 15$ équivaut à $\\mathrm{e}^{-0{,}2(t - 10)} = \\dfrac{15}{q(10)}$, soit $t = 10 + 5\\ln\\left(\\dfrac{q(10)}{15}\\right) \\approx 10{,}71$ h.\nLe médicament est efficace de $6{,}93$ h à $10{,}71$ h : environ $3{,}78$ h, soit $3$ h $47$ min.\n⚠️ Après l'arrêt, la condition initiale est en $t = 10$, pas en $0$ : on n'écrit pas $q(t) = q(10)\\mathrm{e}^{-0{,}2t}$.\n⭐ Sur le dessin (une graduation verticale vaut $5$ mg) : la courbe monte vers $20$ mg, puis redescend après $10$ h. La partie au-dessus de la droite $y = 3$ ($15$ mg) est la période efficace, entre les deux points rouges.",
          schema: repere(
            [-1, 14, -1, 5],
            [{ pts: echantillon((t) => (t <= 10 ? 4 * (1 - Math.exp(-0.2 * t)) : 4 * (1 - Math.exp(-2)) * Math.exp(-0.2 * (t - 10))), 0, 14) }],
            [
              { x: 6.93, y: 3, label: "" },
              { x: 10.71, y: 3, label: "" },
            ],
            3,
            true,
          ),
          micros: ["equadiff_defi", "equadiff_y_prime_ay_b", "equadiff_y_prime_ay", "equadiff_condition_initiale"],
        },
        {
          titre: "L'heure du décès",
          enonce:
            "Un enquêteur trouve un corps dans une pièce à $20$ °C. À $8$ h, la température du corps est de $30$ °C ; à $9$ h, elle est de $28$ °C. On admet que la température $\\theta(t)$, $t$ heures après $8$ h, vérifie $\\theta' = -k(\\theta - 20)$, avec $k > 0$, et qu'elle valait $37$ °C au moment du décès.\na) Montrer que $\\theta(t) = 20 + 10\\mathrm{e}^{-kt}$.\nb) Déterminer $k$.\nc) À quelle heure le décès a-t-il eu lieu, à la minute près ?",
          correction:
            "a) $\\theta' = -k\\theta + 20k$ : $-\\dfrac{b}{a} = \\dfrac{20k}{k} = 20$, et $\\theta(t) = C\\mathrm{e}^{-kt} + 20$.\n$\\theta(0) = C + 20 = 30$ donne $C = 10$.\nb) $\\theta(1) = 28$ : $10\\mathrm{e}^{-k} = 8$, soit $\\mathrm{e}^{-k} = 0{,}8$ et $k = -\\ln(0{,}8) = \\ln(1{,}25) \\approx 0{,}223$.\nc) On cherche $t$ tel que $\\theta(t) = 37$ : $10\\mathrm{e}^{-kt} = 17$, soit $-kt = \\ln(1{,}7)$.\n$t = -\\dfrac{\\ln(1{,}7)}{\\ln(1{,}25)} \\approx -2{,}38$ h, soit environ $2$ h $23$ min AVANT $8$ h.\nLe décès a eu lieu vers $5$ h $37$.\n⚠️ $t$ est négatif : c'est normal, le décès a eu lieu avant la première mesure. Le modèle se prolonge aux $t < 0$.\n⚠️ Sur le dessin, on a tracé l'écart à la pièce, $\\theta - 20$, et une graduation verticale vaut $2$ °C.\n⭐ Sur le dessin : les mesures de $8$ h et $9$ h sont les points en $0$ et en $1$. En remontant le temps vers la gauche, la courbe atteint la droite $y = 8{,}5$ (un écart de $17$ °C, donc $37$ °C) au point rouge, vers $-2{,}4$.",
          schema: repere(
            [-4, 6, -1, 10],
            [{ pts: echantillon((t) => 5 * 1.25 ** -t, -4, 6, -1, 10) }],
            [
              { x: -2.38, y: 8.5, label: "" },
              { x: 0, y: 5, label: "" },
              { x: 1, y: 4, label: "" },
            ],
            8.5,
            true,
          ),
          micros: ["equadiff_defi", "equadiff_y_prime_ay_b", "equadiff_condition_initiale"],
        },
        {
          titre: "Une maison sans chauffage",
          enonce:
            "Un matin, le chauffage d'une maison tombe en panne. Dehors, la température monte : elle vaut $10 + t$ degrés, $t$ heures après $6$ h. La température intérieure $\\theta(t)$, en °C, vérifie $\\theta' = -0{,}5\\big(\\theta - (10 + t)\\big)$, avec $\\theta(0) = 20$.\na) Vérifier que $g(t) = t + 8$ est une solution de l'équation.\nb) En déduire $\\theta(t)$.\nc) Étudier les variations de $\\theta$ sur $[0 ; 10]$. Quelle est la température intérieure la plus basse, et à quelle heure ?\nd) Comparer $\\theta(t)$ à la température extérieure quand $t$ devient grand.",
          correction:
            "a) $g'(t) = 1$. Et $-0{,}5\\big(t + 8 - 10 - t\\big) = -0{,}5 \\times (-2) = 1$ : $g$ est solution.\nb) L'équation s'écrit $\\theta' = -0{,}5\\theta + 5 + 0{,}5t$. Les solutions sont $g$ plus celles de $y' = -0{,}5y$ : $\\theta(t) = C\\mathrm{e}^{-0{,}5t} + t + 8$.\n$\\theta(0) = C + 8 = 20$ donne $C = 12$ : $\\theta(t) = 12\\mathrm{e}^{-0{,}5t} + t + 8$.\nc) $\\theta'(t) = -6\\mathrm{e}^{-0{,}5t} + 1$. $\\theta'(t) \\geqslant 0$ équivaut à $\\mathrm{e}^{-0{,}5t} \\leqslant \\dfrac{1}{6}$, soit $t \\geqslant 2\\ln 6 \\approx 3{,}58$.\n$\\theta$ décroît sur $[0 ; 2\\ln 6]$, puis croît. Le minimum vaut $\\theta(2\\ln 6) = 2 + 2\\ln 6 + 8 \\approx 13{,}6$ °C, vers $9$ h $35$.\nd) $\\theta(t) - (t + 8) = 12\\mathrm{e}^{-0{,}5t} \\to 0$ : la température intérieure finit par valoir la température extérieure moins $2$ °C. La maison suit le dehors avec deux heures de retard.\n⚠️ Le second membre dépend de $t$ : il n'y a PAS de solution constante, et la formule $-\\dfrac{b}{a}$ ne s'applique pas. On passe par $g$.\n⭐ Sur le dessin (une graduation verticale vaut $2$ °C) : la courbe bleue de l'intérieur descend jusqu'au point rouge, puis rejoint la droite orange $y = \\dfrac{t + 8}{2}$, juste sous la droite grise de l'extérieur.",
          schema: repere(
            [-1, 11, -1, 11],
            [
              { pts: echantillon((t) => 6 * Math.exp(-0.5 * t) + (t + 8) / 2, 0, 11) },
              { q: [0, 0.5, 4], couleur: ORANGE },
              { q: [0, 0.5, 5], couleur: GRIS },
            ],
            [{ x: 3.58, y: 6.79, label: "" }],
            undefined,
            true,
          ),
          micros: ["equadiff_defi", "equadiff_solution_particuliere", "equadiff_condition_initiale"],
        },
      ],
    },
  ],
};
