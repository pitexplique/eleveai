// ─── Fiche d'exercices : primitives et intégrales (terminale spé) ─────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur l'étalon `maths-terminale-limite-suite.tsx`. Alignée
// sur `lib/tutor-v4/questionBank/terminale-spe/maths/primitives-integrales.bank.ts`
// et sa version `-concours` (formes u'e^u et u'/u, intégration par parties,
// lecture d'une aire sans calcul : demi-disque, fonction impaire).
//
// ⭐⭐ LE FIL : UNE INTÉGRALE SE VOIT. Chaque aire calculée est HACHURÉE sur le
// dessin (aide locale `bande` : une ligne brisée de segments verticaux entre
// deux courbes) ; une valeur moyenne est un rectangle ou une droite de même
// aire ; une primitive est tracée à côté de sa fonction.
//
// ⛔ Aucune feuille de 1re spé sur le thème (les primitives sont au programme
// de terminale seulement).
//
// Micro-compétences : primitive_reconnaitre (1, 4, 10, 12, 15, 18),
// primitive_calculer (2, 3, 4, 16, 20), integrale_calculer (5, 6, 9, 10, 13,
// 17), integrale_aire (6, 7, 11, 12, 13, 14, 18, 19), integrale_valeur_moyenne
// (8, 9, 14, 19, 20), integrale_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : « aire sous la courbe » est le nom que donnent les pharmaciens
// à l'intégrale d'une concentration (ex. 9) ; la courbe en cloche des
// statisticiens (ex. 12) ; le coefficient de Gini des économistes (ex. 19) ;
// la tension efficace du secteur en France, 230 V (ex. 20). Le reste (médicament,
// panneau solaire, cuve, usine, crue, pays imaginaire) : des MODÈLES.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau } from "@/lib/fiches-exercices/figures";

const GRIS = "#94a3b8";
const VERT = "#16a34a";

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

/** Le HACHURAGE d'un domaine entre `bas` et `haut`, de a à b : une ligne brisée
 *  qui monte et descend en segments verticaux (un tous les `pas`), en suivant
 *  les deux courbes. Pour l'aire sous une courbe : `bas = () => 0`. */
const bande = (haut: (x: number) => number, bas: (x: number) => number, a: number, b: number, pas = 0.1): [number, number][] => {
  const n = Math.max(1, Math.round((b - a) / pas));
  const r = (v: number) => Math.round(v * 1000) / 1000;
  const pts: [number, number][] = [];
  for (let k = 0; k <= n; k++) {
    const x = r(a + ((b - a) * k) / n);
    const [y1, y2] = [r(bas(x)), r(haut(x))];
    if (k % 2 === 0) pts.push([x, y1], [x, y2]);
    else pts.push([x, y2], [x, y1]);
  }
  return pts;
};

export const exercicesPrimitiveIntegraleTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "primitive-integrale",
  titre: "Primitives et intégrales",
  accroche:
    "Vingt exercices, de la primitive qu'on reconnaît au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle hachure l'aire que l'intégrale calcule.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$F$ est une primitive de $f$ sur $I$ si $F' = f$ sur $I$. Deux primitives de $f$ diffèrent d'une constante : on écrit $F(x) + C$. On vérifie TOUJOURS en dérivant.",
        "Primitives à connaître : $x^n$ donne $\\dfrac{x^{n+1}}{n + 1}$ ; $\\dfrac{1}{x}$ donne $\\ln(x)$ sur $]0 ; +\\infty[$ ; $\\mathrm{e}^{ax}$ donne $\\dfrac{1}{a}\\mathrm{e}^{ax}$. Et les formes $u'\\mathrm{e}^{u}$, $\\dfrac{u'}{u}$ (avec $u > 0$), $u'u^n$.",
        "$\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x = F(b) - F(a)$. Si $f \\geqslant 0$ sur $[a ; b]$, c'est l'aire, en unités d'aire, du domaine entre la courbe, l'axe des abscisses et les droites $x = a$ et $x = b$.",
        "Valeur moyenne de $f$ sur $[a ; b]$ : $\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.",
      ],
      exercices: [
        {
          enonce:
            "Soit $f(x) = (x + 1)\\mathrm{e}^{x}$ et $F(x) = x\\mathrm{e}^{x}$, pour $x$ réel.\na) Montrer que $F$ est une primitive de $f$ sur $\\mathbb{R}$.\nb) Sans dériver une seconde fois, donner le sens de variation de $F$.",
          correction:
            "a) On dérive le produit : $F'(x) = 1 \\times \\mathrm{e}^{x} + x\\mathrm{e}^{x}$.\nDonc $F'(x) = (x + 1)\\mathrm{e}^{x} = f(x)$ : $F$ est une primitive de $f$.\nb) $F' = f$ : les variations de $F$ se lisent sur le signe de $f$.\n$\\mathrm{e}^{x} > 0$, donc $f(x)$ a le signe de $x + 1$ : négatif avant $-1$, positif après.\n$F$ est décroissante sur $]-\\infty ; -1]$ et croissante sur $[-1 ; +\\infty[$. Son minimum vaut $F(-1) = -\\mathrm{e}^{-1} \\approx -0{,}37$.\n⚠️ Le signe de $f$ donne le SENS DE VARIATION de $F$, pas son signe : sur $[-1 ; 0]$, $F$ croît mais reste négative.\n⭐ Sur le dessin : la courbe orange de $F$ descend tant que la courbe bleue de $f$ est sous l'axe, puis remonte. Son point le plus bas est à l'abscisse $-1$, là où $f$ s'annule.",
          schema: ecranSeulement(
            repere(
              [-4, 2, -1, 4],
              [
                { pts: echantillon((x) => (x + 1) * Math.exp(x), -4, 2, -1, 4) },
                { pts: echantillon((x) => x * Math.exp(x), -4, 2, -1, 4), couleur: ORANGE },
              ],
              [{ x: -1, y: -0.37, label: "" }],
            ),
          ),
          micros: ["primitive_reconnaitre"],
        },
        {
          enonce:
            "Donner une primitive de chaque fonction sur l'intervalle indiqué :\na) $f(x) = 3x^2 - 4x + 5$ sur $\\mathbb{R}$\nb) $g(x) = \\mathrm{e}^{2x}$ sur $\\mathbb{R}$\nc) $h(x) = \\dfrac{1}{x^2}$ sur $]0 ; +\\infty[$\nd) $k(x) = \\dfrac{2x}{x^2 + 1}$ sur $\\mathbb{R}$",
          correction:
            "a) On primitive terme à terme : $F(x) = x^3 - 2x^2 + 5x$.\nb) La dérivée de $\\mathrm{e}^{2x}$ est $2\\mathrm{e}^{2x}$ : il faut compenser le $2$. $G(x) = \\dfrac{1}{2}\\mathrm{e}^{2x}$.\nc) $\\dfrac{1}{x^2} = x^{-2}$, dont une primitive est $\\dfrac{x^{-1}}{-1}$ : $H(x) = -\\dfrac{1}{x}$.\nd) Le numérateur $2x$ est la dérivée de $u(x) = x^2 + 1$, qui est strictement positif : $k = \\dfrac{u'}{u}$, et $K(x) = \\ln(x^2 + 1)$.\nOn vérifie en dérivant : $K'(x) = \\dfrac{2x}{x^2 + 1}$.\n⚠️ En b), $\\mathrm{e}^{2x}$ n'est pas sa propre primitive : en dérivant, le $2$ sort. On divise donc par $2$.\n⚠️ En c), le signe moins : $-\\dfrac{1}{x}$ a pour dérivée $+\\dfrac{1}{x^2}$.\n⭐ Sur le dessin (d) : $K$, en orange, descend là où $k$ est négative et monte là où $k$ est positive. Son minimum est en $0$, où $k$ s'annule.",
          schema: ecranSeulement(
            repere(
              [-3, 3, -2, 3],
              [
                { pts: echantillon((x) => (2 * x) / (x * x + 1), -3, 3) },
                { pts: echantillon((x) => Math.log(x * x + 1), -3, 3), couleur: ORANGE },
              ],
            ),
          ),
          micros: ["primitive_calculer"],
        },
        {
          enonce: "Soit $f(x) = 6x^2 - 2x + 1$.\na) Donner toutes les primitives de $f$ sur $\\mathbb{R}$.\nb) Déterminer celle qui vérifie $F(1) = 4$.",
          correction:
            "a) Une primitive est $x \\mapsto 2x^3 - x^2 + x$. Les autres s'obtiennent en ajoutant une constante : $F(x) = 2x^3 - x^2 + x + C$, avec $C$ réel.\nb) $F(1) = 2 - 1 + 1 + C = 2 + C$.\n$F(1) = 4$ donne $C = 2$. Donc $F(x) = 2x^3 - x^2 + x + 2$.\n⚠️ Sans le $+ C$, on ne pourrait pas tenir compte de la condition : on trouverait $F(1) = 2$, et on serait coincé.\n⭐ Sur le dessin : les primitives de $f$ ont toutes la même forme, décalées vers le haut ou vers le bas. Une seule, en orange, passe par le point $(1 ; 4)$.",
          schema: ecranSeulement(
            repere(
              [-2, 2, -2, 8],
              [
                { p: [2, -1, 1, -2], couleur: GRIS },
                { p: [2, -1, 1, 0], couleur: GRIS },
                { p: [2, -1, 1, 2], couleur: ORANGE },
              ],
              [{ x: 1, y: 4, label: "" }],
            ),
          ),
          micros: ["primitive_calculer"],
        },
        {
          enonce:
            "Reconnaître la forme, puis donner une primitive :\na) $f(x) = 2x\\,\\mathrm{e}^{x^2}$ sur $\\mathbb{R}$\nb) $g(x) = \\dfrac{3x^2}{x^3 + 1}$ sur $]0 ; +\\infty[$\nc) $h(x) = (2x + 1)(x^2 + x)^3$ sur $\\mathbb{R}$\nd) $k(x) = \\cos(x)\\sin(x)$ sur $\\mathbb{R}$",
          correction:
            "a) Avec $u(x) = x^2$ : $u'(x) = 2x$, et $f = u'\\mathrm{e}^{u}$. Une primitive est $F(x) = \\mathrm{e}^{x^2}$.\nb) Avec $u(x) = x^3 + 1$, strictement positif sur $]0 ; +\\infty[$ : $u'(x) = 3x^2$, et $g = \\dfrac{u'}{u}$. Donc $G(x) = \\ln(x^3 + 1)$.\nc) Avec $u(x) = x^2 + x$ : $u'(x) = 2x + 1$, et $h = u'u^3$. Donc $H(x) = \\dfrac{(x^2 + x)^4}{4}$.\nd) Avec $u(x) = \\sin(x)$ : $u'(x) = \\cos(x)$, et $k = u'u$. Donc $K(x) = \\dfrac{\\sin^2(x)}{2}$.\n⚠️ En c), ne pas oublier le $\\dfrac{1}{4}$ : la dérivée de $u^4$ est $4u'u^3$, pas $u'u^3$.\n⚠️ En b), le logarithme demande $u > 0$ : c'est pourquoi l'intervalle est précisé.\n⭐ Le tableau résume : on cherche d'abord $u$, puis on vérifie que $u'$ est bien là, en facteur.",
          schema: ecranSeulement(tableau(["question", "a", "b", "c", "d"], ["forme", "u′eᵘ", "u′/u", "u′u³", "u′u"])),
          micros: ["primitive_reconnaitre", "primitive_calculer"],
        },
        {
          enonce:
            "Calculer :\na) $\\displaystyle\\int_0^2 (x^2 + 1)\\,\\mathrm{d}x$\nb) $\\displaystyle\\int_0^1 \\mathrm{e}^{2x}\\,\\mathrm{d}x$\nc) $\\displaystyle\\int_1^{\\mathrm{e}} \\dfrac{1}{x}\\,\\mathrm{d}x$",
          correction:
            "a) Une primitive de $x^2 + 1$ est $F(x) = \\dfrac{x^3}{3} + x$.\nL'intégrale vaut $F(2) - F(0) = \\dfrac{8}{3} + 2 - 0 = \\dfrac{14}{3} \\approx 4{,}67$.\nb) Une primitive de $\\mathrm{e}^{2x}$ est $\\dfrac{1}{2}\\mathrm{e}^{2x}$.\nL'intégrale vaut $\\dfrac{\\mathrm{e}^{2}}{2} - \\dfrac{1}{2}$, soit $\\dfrac{\\mathrm{e}^{2} - 1}{2} \\approx 3{,}19$.\nc) Une primitive de $\\dfrac{1}{x}$ sur $[1 ; \\mathrm{e}]$ est $\\ln(x)$. L'intégrale vaut $\\ln(\\mathrm{e}) - \\ln(1) = 1 - 0 = 1$.\n⚠️ On écrit toujours $F(b) - F(a)$, dans cet ordre. En b), oublier $F(0) = \\dfrac{1}{2}$ donnerait $3{,}69$ : faux.\n⭐ Sur le dessin (a) : la fonction est positive, l'intégrale est l'aire hachurée. Elle tient dans le rectangle de $2$ sur $5$ (aire $10$) et dépasse celui de $2$ sur $1$ (aire $2$) : $4{,}67$ est plausible.",
          schema: ecranSeulement(repere([-1, 3, -1, 6], [{ q: [1, 0, 1] }, { pts: bande((x) => x * x + 1, () => 0, 0, 2), couleur: ORANGE }])),
          micros: ["integrale_calculer"],
        },
        {
          enonce:
            "Le domaine hachuré est limité par la courbe de $f(x) = -x^2 + 4x$, l'axe des abscisses, et les droites $x = 0$ et $x = 4$.\na) Justifier que son aire, en unités d'aire, est $\\displaystyle\\int_0^4 f(x)\\,\\mathrm{d}x$.\nb) Calculer cette aire.\nc) Sur le dessin d'un élève, une unité mesure $2$ cm sur chaque axe. Donner l'aire en cm².",
          figure: repere([-1, 5, -1, 5], [{ q: [-1, 4, 0] }, { pts: bande((x) => -x * x + 4 * x, () => 0, 0, 4), couleur: ORANGE }]),
          correction:
            "a) $f(x) = x(4 - x)$ est positive sur $[0 ; 4]$ : les deux facteurs y sont positifs. Pour une fonction positive, l'intégrale est l'aire sous la courbe.\nb) Une primitive de $f$ est $F(x) = -\\dfrac{x^3}{3} + 2x^2$.\nL'aire vaut $F(4) - F(0) = -\\dfrac{64}{3} + 32 = \\dfrac{32}{3} \\approx 10{,}67$ unités d'aire.\nc) Une unité d'aire est un carré de $2$ cm sur $2$ cm, soit $4$ cm². L'aire vaut $\\dfrac{32}{3} \\times 4 = \\dfrac{128}{3} \\approx 42{,}67$ cm².\n⚠️ L'unité d'aire vaut $2 \\times 2 = 4$ cm², pas $2$ cm² : on multiplie les unités des deux axes.\n⭐ Sur le dessin : le domaine tient dans le carré de $4$ sur $4$, d'aire $16$. Il en remplit les deux tiers : $\\dfrac{2}{3} \\times 16 = \\dfrac{32}{3}$. C'est un résultat d'Archimède sur la parabole.",
          micros: ["integrale_aire", "integrale_calculer"],
        },
        {
          enonce:
            "Sans chercher de primitive, calculer :\na) $\\displaystyle\\int_{-2}^{2} \\sqrt{4 - x^2}\\,\\mathrm{d}x$, dont le domaine est hachuré ;\nb) $\\displaystyle\\int_{-1}^{1} x^3\\,\\mathrm{d}x$.",
          figure: repere(
            [-3, 3, -1, 3],
            [
              { pts: echantillon((x) => Math.sqrt(Math.max(0, 4 - x * x)), -2, 2) },
              { pts: bande((x) => Math.sqrt(Math.max(0, 4 - x * x)), () => 0, -2, 2), couleur: ORANGE },
            ],
          ),
          correction:
            "a) Si $y = \\sqrt{4 - x^2}$, alors $y \\geqslant 0$ et $x^2 + y^2 = 4$ : la courbe est le demi-cercle supérieur de centre $O$ et de rayon $2$.\nLa fonction est positive : l'intégrale est l'aire du demi-disque, soit $\\dfrac{\\pi \\times 2^2}{2} = 2\\pi \\approx 6{,}28$.\nb) La fonction cube est impaire : l'aire au-dessus de l'axe, sur $[0 ; 1]$, est la même que l'aire au-dessous, sur $[-1 ; 0]$. Elles se compensent : l'intégrale vaut $0$.\nVérification : $\\left[\\dfrac{x^4}{4}\\right]_{-1}^{1} = \\dfrac{1}{4} - \\dfrac{1}{4} = 0$.\n⚠️ En b), l'intégrale est nulle, mais l'aire du domaine entre la courbe et l'axe ne l'est pas : elle vaut $2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}$. Sous l'axe, l'intégrale compte l'aire en NÉGATIF.\n⭐ Sur le dessin : le domaine hachuré est un demi-disque de rayon $2$. On reconnaît une figure dont on connaît l'aire.",
          micros: ["integrale_aire"],
        },
        {
          enonce: "Calculer la valeur moyenne de la fonction carré sur $[0 ; 2]$. Pour quelle valeur de $x$ la fonction prend-elle cette valeur ?",
          correction:
            "La valeur moyenne de $f$ sur $[a ; b]$ est $\\mu = \\dfrac{1}{b - a}\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$.\nIci, $\\displaystyle\\int_0^2 x^2\\,\\mathrm{d}x = \\left[\\dfrac{x^3}{3}\\right]_0^2 = \\dfrac{8}{3}$.\nOn divise par la longueur $2 - 0 = 2$ : $\\mu = \\dfrac{4}{3} \\approx 1{,}33$.\n$x^2 = \\dfrac{4}{3}$ avec $x \\in [0 ; 2]$ donne $x = \\dfrac{2}{\\sqrt{3}} \\approx 1{,}15$.\n⚠️ La moyenne n'est pas celle des valeurs aux bornes : $\\dfrac{f(0) + f(2)}{2} = 2$, c'est faux ici.\n⚠️ On n'oublie pas de diviser par la longueur de l'intervalle.\n⭐ Sur le dessin : le rectangle orange, de hauteur $\\dfrac{4}{3}$, a la même aire que le domaine sous la parabole. Ce qui dépasse à droite comble ce qui manque à gauche. Le point rouge est en $x \\approx 1{,}15$.",
          schema: repere([-1, 3, -1, 5], [{ q: [1, 0, 0] }, { pts: [[0, 0], [0, 1.333], [2, 1.333], [2, 0]], couleur: ORANGE }], [{ x: 1.15, y: 1.33, label: "" }]),
          micros: ["integrale_valeur_moyenne"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Intégration par parties : $\\displaystyle\\int_a^b uv' = \\big[uv\\big]_a^b - \\displaystyle\\int_a^b u'v$. On choisit pour $u$ ce qui se simplifie en dérivant ($t$, $\\ln$).",
        "Linéarité, relation de Chasles, positivité : si $f \\leqslant g$ sur $[a ; b]$, alors $\\displaystyle\\int_a^b f \\leqslant \\displaystyle\\int_a^b g$. L'aire entre deux courbes est $\\displaystyle\\int_a^b (g - f)$, avec $g$ au-dessus.",
        "Si $f$ est continue, $x \\mapsto \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$ est LA primitive de $f$ qui s'annule en $a$.",
        "Dans un contexte, une intégrale cumule : une vitesse donne une distance, un débit un volume, une puissance une énergie.",
      ],
      exercices: [
        {
          enonce:
            "La concentration d'un médicament dans le sang, en mg/L, $t$ heures après la prise, est modélisée par $c(t) = 5t\\,\\mathrm{e}^{-t}$.\na) À l'aide d'une intégration par parties, montrer que $\\displaystyle\\int_0^4 t\\,\\mathrm{e}^{-t}\\,\\mathrm{d}t = 1 - 5\\mathrm{e}^{-4}$.\nb) Les pharmaciens appellent « aire sous la courbe » l'intégrale $\\displaystyle\\int_0^4 c(t)\\,\\mathrm{d}t$. La calculer, à $0{,}01$ près.\nc) Quelle est la concentration moyenne sur les quatre premières heures ?",
          correction:
            "a) On pose $u(t) = t$ et $v'(t) = \\mathrm{e}^{-t}$. Alors $u'(t) = 1$ et $v(t) = -\\mathrm{e}^{-t}$.\n$\\displaystyle\\int_0^4 t\\,\\mathrm{e}^{-t}\\,\\mathrm{d}t$ $= \\big[-t\\,\\mathrm{e}^{-t}\\big]_0^4 + \\displaystyle\\int_0^4 \\mathrm{e}^{-t}\\,\\mathrm{d}t$.\nLe crochet vaut $-4\\mathrm{e}^{-4} - 0$. L'intégrale restante vaut $\\big[-\\mathrm{e}^{-t}\\big]_0^4 = 1 - \\mathrm{e}^{-4}$.\nTotal : $-4\\mathrm{e}^{-4} + 1 - \\mathrm{e}^{-4} = 1 - 5\\mathrm{e}^{-4}$.\nb) Par linéarité, l'aire sous la courbe vaut $5(1 - 5\\mathrm{e}^{-4}) = 5 - 25\\mathrm{e}^{-4} \\approx 4{,}54$.\nc) $\\mu = \\dfrac{1}{4}(5 - 25\\mathrm{e}^{-4}) \\approx 1{,}14$ mg/L.\n⚠️ Une primitive de $\\mathrm{e}^{-t}$ est $-\\mathrm{e}^{-t}$ : le signe moins perdu est l'erreur classique de l'intégration par parties.\n⚠️ On choisit $u(t) = t$, qui devient $1$ en dérivant. Avec $v'(t) = t$, l'intégrale restante serait plus compliquée que celle du départ.\n⭐ Sur le dessin : l'aire hachurée est l'« aire sous la courbe ». La droite horizontale $y \\approx 1{,}14$ est la concentration moyenne : le rectangle qu'elle forme sur $[0 ; 4]$ a la même aire.",
          schema: repere(
            [-1, 5, -1, 3],
            [
              { pts: echantillon((t) => 5 * t * Math.exp(-t), 0, 5) },
              { pts: bande((t) => 5 * t * Math.exp(-t), () => 0, 0, 4), couleur: ORANGE },
            ],
            [],
            1.14,
          ),
          micros: ["integrale_calculer", "integrale_valeur_moyenne"],
        },
        {
          enonce:
            "a) Vérifier que $G(x) = x\\ln(x) - x$ est une primitive de $\\ln$ sur $]0 ; +\\infty[$.\nb) En déduire l'aire du domaine sous la courbe de $\\ln$, entre $1$ et $\\mathrm{e}$.\nc) Par une intégration par parties, calculer $\\displaystyle\\int_1^{\\mathrm{e}} x\\ln(x)\\,\\mathrm{d}x$.",
          correction:
            "a) $G'(x) = 1 \\times \\ln(x) + x \\times \\dfrac{1}{x} - 1 = \\ln(x)$. C'est bien une primitive de $\\ln$.\nb) $\\ln$ est positive sur $[1 ; \\mathrm{e}]$. L'aire vaut $G(\\mathrm{e}) - G(1) = (\\mathrm{e} - \\mathrm{e}) - (0 - 1) = 1$ unité d'aire.\nc) On pose $u(x) = \\ln(x)$ et $v'(x) = x$ : $u'(x) = \\dfrac{1}{x}$ et $v(x) = \\dfrac{x^2}{2}$.\n$\\displaystyle\\int_1^{\\mathrm{e}} x\\ln(x)\\,\\mathrm{d}x$ $= \\left[\\dfrac{x^2}{2}\\ln(x)\\right]_1^{\\mathrm{e}} - \\displaystyle\\int_1^{\\mathrm{e}} \\dfrac{x}{2}\\,\\mathrm{d}x$.\nLe crochet vaut $\\dfrac{\\mathrm{e}^2}{2}$. L'intégrale restante vaut $\\left[\\dfrac{x^2}{4}\\right]_1^{\\mathrm{e}} = \\dfrac{\\mathrm{e}^2 - 1}{4}$.\nTotal : $\\dfrac{\\mathrm{e}^2}{2} - \\dfrac{\\mathrm{e}^2 - 1}{4} = \\dfrac{\\mathrm{e}^2 + 1}{4} \\approx 2{,}10$.\n⚠️ On DÉRIVE le logarithme, qui devient $\\dfrac{1}{x}$ : c'est $u = \\ln$, pas $v' = \\ln$ (on n'en connaissait pas de primitive avant a).\n⭐ Sur le dessin : l'aire hachurée sous la courbe de $\\ln$, entre $1$ et $\\mathrm{e}$, vaut exactement $1$ : autant qu'un carré de côté $1$.",
          schema: ecranSeulement(
            repere(
              [-1, 4, -1, 2],
              [
                { pts: echantillon((x) => Math.log(x), 0.2, 4, -1, 2) },
                { pts: bande((x) => Math.log(x), () => 0, 1, 2.718), couleur: ORANGE },
              ],
            ),
          ),
          micros: ["primitive_reconnaitre", "integrale_calculer"],
        },
        {
          enonce:
            "Un artisan découpe une feuille décorative dans une plaque de laiton. Dans un repère où une unité vaut $5$ cm, la feuille est le domaine compris entre les courbes de $f(x) = \\sqrt{2x}$ et de $g(x) = \\dfrac{x^2}{2}$.\na) Montrer que les deux courbes se coupent aux points d'abscisses $0$ et $2$.\nb) Sur $[0 ; 2]$, quelle courbe est au-dessus ?\nc) Calculer l'aire de la feuille en unités d'aire, puis en cm².",
          figure: repere(
            [-1, 3, -1, 3],
            [
              { pts: echantillon((x) => Math.sqrt(2 * x), 0, 3) },
              { q: [0.5, 0, 0], couleur: VERT },
              { pts: bande((x) => Math.sqrt(2 * x), (x) => (x * x) / 2, 0, 2), couleur: ORANGE },
            ],
          ),
          correction:
            "a) $\\sqrt{2x} = \\dfrac{x^2}{2}$. Les deux membres sont positifs : on élève au carré. $2x = \\dfrac{x^4}{4}$, soit $x(x^3 - 8) = 0$.\nDonc $x = 0$ ou $x^3 = 8$, c'est-à-dire $x = 2$.\nb) En $x = 1$ : $f(1) = \\sqrt{2} \\approx 1{,}41$ et $g(1) = 0{,}5$. Les courbes ne se coupent pas entre $0$ et $2$ : celle de $f$ est au-dessus sur tout $[0 ; 2]$.\nc) L'aire vaut $\\displaystyle\\int_0^2 \\left(\\sqrt{2x} - \\dfrac{x^2}{2}\\right)\\mathrm{d}x$.\n$\\sqrt{2x} = \\sqrt{2}\\sqrt{x}$, et une primitive de $\\sqrt{x}$ est $\\dfrac{2}{3}x\\sqrt{x}$ (on le vérifie en dérivant).\nEn $2$ : $\\sqrt{2} \\times \\dfrac{2}{3} \\times 2\\sqrt{2} = \\dfrac{8}{3}$. Une primitive de $\\dfrac{x^2}{2}$ est $\\dfrac{x^3}{6}$, qui vaut $\\dfrac{4}{3}$ en $2$.\nL'aire vaut $\\dfrac{8}{3} - \\dfrac{4}{3} = \\dfrac{4}{3}$ u.a. Une unité d'aire vaut $5 \\times 5 = 25$ cm² : l'aire est $\\dfrac{100}{3} \\approx 33{,}3$ cm².\n⚠️ On intègre « celle du haut moins celle du bas ». Dans l'autre sens, on trouverait $-\\dfrac{4}{3}$ : une aire n'est jamais négative.\n⭐ Sur le dessin : la feuille hachurée est coincée entre la courbe bleue de $f$, au-dessus, et la parabole verte de $g$, au-dessous.",
          micros: ["integrale_aire"],
        },
        {
          enonce:
            "On pose $G(x) = \\displaystyle\\int_0^x \\mathrm{e}^{-t^2}\\,\\mathrm{d}t$. La courbe de $t \\mapsto \\mathrm{e}^{-t^2}$ est la « courbe en cloche » des statisticiens ; on ne sait pas écrire de primitive de cette fonction avec les fonctions usuelles.\na) Justifier que $G$ est dérivable sur $\\mathbb{R}$ et donner $G'(x)$. En déduire le sens de variation de $G$.\nb) On admet que $\\mathrm{e}^{u} \\geqslant 1 + u$ pour tout réel $u$. Montrer que, pour $t \\in [0 ; 1]$ : $1 - t^2 \\leqslant \\mathrm{e}^{-t^2} \\leqslant 1$.\nc) En déduire un encadrement de $G(1)$.",
          correction:
            "a) $t \\mapsto \\mathrm{e}^{-t^2}$ est continue sur $\\mathbb{R}$ : $G$ est sa primitive qui s'annule en $0$. Donc $G$ est dérivable et $G'(x) = \\mathrm{e}^{-x^2}$.\nUne exponentielle est strictement positive : $G' > 0$, et $G$ est strictement croissante sur $\\mathbb{R}$.\nb) Avec $u = -t^2$ : $\\mathrm{e}^{-t^2} \\geqslant 1 - t^2$.\nEt $-t^2 \\leqslant 0$, donc $\\mathrm{e}^{-t^2} \\leqslant \\mathrm{e}^{0} = 1$, car l'exponentielle est croissante.\nc) On intègre l'encadrement sur $[0 ; 1]$ : les inégalités se conservent, car les bornes sont dans l'ordre ($0 < 1$).\n$\\displaystyle\\int_0^1 (1 - t^2)\\,\\mathrm{d}t = 1 - \\dfrac{1}{3} = \\dfrac{2}{3}$ et $\\displaystyle\\int_0^1 1\\,\\mathrm{d}t = 1$.\nDonc $\\dfrac{2}{3} \\leqslant G(1) \\leqslant 1$. La calculatrice donne $G(1) \\approx 0{,}747$.\n⚠️ Pas besoin de primitive pour dériver $G$ : $G'(x)$ s'obtient en remplaçant $t$ par $x$ dans la fonction intégrée, c'est tout.\n⭐ Sur le dessin : l'aire hachurée, $G(1)$, est plus grande que l'aire sous la parabole grise $y = 1 - t^2$, et plus petite que celle du carré de côté $1$, sous la droite $y = 1$.",
          schema: repere(
            [-2, 2, -1, 2],
            [
              { pts: echantillon((t) => Math.exp(-t * t), -2, 2) },
              { q: [-1, 0, 1], couleur: GRIS },
              { pts: bande((t) => Math.exp(-t * t), () => 0, 0, 1), couleur: ORANGE },
            ],
            [],
            1,
          ),
          micros: ["primitive_reconnaitre", "integrale_aire"],
        },
        {
          enonce:
            "Une cuve est reliée à une pompe réversible. Son débit, en m³ par heure, est $d(t) = 4 - 2t$ pour $t \\in [0 ; 3]$, en heures. Un débit positif fait entrer de l'eau, un débit négatif en fait sortir. La variation du volume entre $a$ et $b$ est $\\displaystyle\\int_a^b d(t)\\,\\mathrm{d}t$.\na) Quel volume entre dans la cuve pendant les deux premières heures ?\nb) Calculer $\\displaystyle\\int_2^3 d(t)\\,\\mathrm{d}t$. Interpréter.\nc) En déduire, avec la relation de Chasles, la variation du volume sur $[0 ; 3]$.\nd) On ajoute un robinet qui verse $0{,}5$ m³ par heure. Quelle est la nouvelle variation sur $[0 ; 3]$ ?",
          figure: repere(
            [-1, 4, -3, 5],
            [
              { q: [0, -2, 4] },
              { pts: bande((t) => 4 - 2 * t, () => 0, 0, 2), couleur: VERT },
              { pts: bande((t) => 4 - 2 * t, () => 0, 2, 3), couleur: ORANGE },
            ],
          ),
          correction:
            "Une primitive de $d$ est $D(t) = 4t - t^2$.\na) $\\displaystyle\\int_0^2 d(t)\\,\\mathrm{d}t = D(2) - D(0) = 4 - 0 = 4$ : $4$ m³ entrent.\nb) $\\displaystyle\\int_2^3 d(t)\\,\\mathrm{d}t = D(3) - D(2) = 3 - 4 = -1$. Pendant la dernière heure, $1$ m³ sort de la cuve.\nc) Chasles : $\\displaystyle\\int_0^3 = \\displaystyle\\int_0^2 + \\displaystyle\\int_2^3 = 4 + (-1) = 3$. Le volume a augmenté de $3$ m³.\nd) Par linéarité : $\\displaystyle\\int_0^3 (d(t) + 0{,}5)\\,\\mathrm{d}t = 3 + 0{,}5 \\times 3 = 4{,}5$ m³.\n⚠️ La variation ($3$ m³) n'est pas l'eau qui a traversé la pompe ($4 + 1 = 5$ m³) : sous l'axe, l'intégrale compte en négatif.\n⭐ Sur le dessin : le triangle vert, au-dessus de l'axe (aire $4$), est l'eau qui entre ; le triangle orange, au-dessous (aire $1$), est l'eau qui sort.",
          micros: ["integrale_calculer", "integrale_aire"],
        },
        {
          enonce:
            "La puissance d'un panneau solaire, en kW, $t$ heures après $6$ h du matin, est modélisée par $P(t) = -0{,}1t^2 + 1{,}2t$ pour $t \\in [0 ; 12]$. L'énergie produite, en kWh, est l'intégrale de la puissance.\na) Calculer l'énergie produite dans la journée.\nb) Calculer la puissance moyenne sur la journée.\nc) À quelles heures la puissance est-elle égale à cette moyenne ?",
          correction:
            "a) Une primitive de $P$ est $F(t) = -\\dfrac{t^3}{30} + 0{,}6t^2$.\n$E = F(12) - F(0) = -57{,}6 + 86{,}4 = 28{,}8$ kWh.\nb) $\\mu = \\dfrac{1}{12 - 0} \\times 28{,}8 = 2{,}4$ kW.\nc) $-0{,}1t^2 + 1{,}2t = 2{,}4$ équivaut à $t^2 - 12t + 24 = 0$ (on multiplie par $-10$).\n$\\Delta = 144 - 96 = 48$, donc $t = 6 - 2\\sqrt{3} \\approx 2{,}54$ ou $t = 6 + 2\\sqrt{3} \\approx 9{,}46$.\nSoit vers $8$ h $32$ et vers $15$ h $28$.\n⚠️ On divise par la durée de production, $12$ h, pas par $24$ h.\n⚠️ Des kW multipliés par des heures donnent des kWh : l'énergie et la puissance n'ont pas la même unité.\n⭐ Sur le dessin : l'aire hachurée est l'énergie. La droite horizontale $y = 2{,}4$ coupe la courbe aux deux instants trouvés en c), marqués en rouge.",
          schema: repere(
            [-1, 13, -1, 5],
            [{ q: [-0.1, 1.2, 0] }, { pts: bande((t) => -0.1 * t * t + 1.2 * t, () => 0, 0, 12, 0.25), couleur: ORANGE }],
            [
              { x: 2.54, y: 2.4, label: "" },
              { x: 9.46, y: 2.4, label: "" },
            ],
            2.4,
            true,
          ),
          micros: ["integrale_valeur_moyenne", "integrale_aire"],
        },
        {
          enonce:
            "Démonstration du cours. Soit $f$ continue, positive et croissante sur $[a ; b]$, et $F(x) = \\displaystyle\\int_a^x f(t)\\,\\mathrm{d}t$, l'aire sous la courbe entre $a$ et $x$.\na) Soit $x \\in [a ; b[$ et $h > 0$ tel que $x + h \\leqslant b$. Montrer que $h f(x) \\leqslant F(x + h) - F(x) \\leqslant h f(x + h)$.\nb) En déduire que $\\dfrac{F(x + h) - F(x)}{h}$ tend vers $f(x)$ quand $h$ tend vers $0$ par valeurs positives.\nc) Exemple : $f(t) = 1 + \\dfrac{t^2}{4}$, $x = 2$ et $h = 0{,}5$. Écrire l'encadrement de a) et le comparer à la valeur exacte.",
          correction:
            "a) Par Chasles, $F(x + h) - F(x) = \\displaystyle\\int_x^{x+h} f(t)\\,\\mathrm{d}t$ : c'est l'aire de la bande entre $x$ et $x + h$.\n$f$ est croissante : pour $t \\in [x ; x + h]$, $f(x) \\leqslant f(t) \\leqslant f(x + h)$.\nLa bande contient le rectangle de base $h$ et de hauteur $f(x)$, et tient dans celui de hauteur $f(x + h)$. D'où l'encadrement.\nb) On divise par $h > 0$ : $f(x) \\leqslant \\dfrac{F(x + h) - F(x)}{h} \\leqslant f(x + h)$.\n$f$ est continue, donc $f(x + h) \\to f(x)$. Par le théorème des gendarmes, le quotient tend vers $f(x)$.\nOn raisonne de même pour $h < 0$ : $F$ est dérivable et $F' = f$. $F$ est une primitive de $f$.\nc) $0{,}5 \\times f(2) = 0{,}5 \\times 2 = 1$ et $0{,}5 \\times f(2{,}5) = 0{,}5 \\times 2{,}5625 \\approx 1{,}28$.\nValeur exacte : $\\left[t + \\dfrac{t^3}{12}\\right]_2^{2{,}5} \\approx 1{,}135$. Elle est bien entre $1$ et $1{,}28$.\n⚠️ Diviser par $h$ garde le sens des inégalités parce que $h > 0$. Pour $h < 0$, elles se retournent : il faut refaire le raisonnement.\n⭐ Sur le dessin : la bande hachurée est coincée entre le petit rectangle gris (hauteur $f(2) = 2$) et le grand (hauteur $f(2{,}5) \\approx 2{,}56$).",
          schema: repere(
            [-1, 4, -1, 4],
            [
              { q: [0.25, 0, 1] },
              { pts: [[2, 0], [2, 2.563], [2.5, 2.563], [2.5, 0]], couleur: GRIS },
              { pts: [[2, 2], [2.5, 2]], couleur: GRIS },
              { pts: bande((t) => 1 + (t * t) / 4, () => 0, 2, 2.5, 0.05), couleur: ORANGE },
            ],
          ),
          micros: ["primitive_reconnaitre"],
        },
        {
          enonce:
            "Une usine fabrique $q$ tonnes d'engrais par jour, avec $q \\in [0 ; 5]$. Le coût marginal, en milliers d'euros par tonne, est $C_m(q) = 0{,}3q^2 - 1{,}2q + 1{,}5$. Le coût total $C$ est la primitive de $C_m$ qui vaut, en $0$, les coûts fixes : $C(0) = 1$.\na) Déterminer $C(q)$.\nb) Combien coûte une production de $5$ tonnes ?\nc) Calculer $\\displaystyle\\int_2^4 C_m(q)\\,\\mathrm{d}q$. Interpréter.",
          correction:
            "a) Les primitives de $C_m$ sont les fonctions $q \\mapsto 0{,}1q^3 - 0{,}6q^2 + 1{,}5q + K$, avec $K$ réel.\n$C(0) = K = 1$. Donc $C(q) = 0{,}1q^3 - 0{,}6q^2 + 1{,}5q + 1$.\nb) $C(5) = 12{,}5 - 15 + 7{,}5 + 1 = 6$ : $6\\,000$ euros.\nc) $\\displaystyle\\int_2^4 C_m(q)\\,\\mathrm{d}q = C(4) - C(2)$ $= 3{,}8 - 2{,}4 = 1{,}4$.\nPasser de $2$ à $4$ tonnes coûte $1\\,400$ euros de plus.\n⚠️ Sans la constante, on aurait $C(0) = 0$ : on oublierait les coûts fixes, les $1\\,000$ euros dépensés même sans rien produire.\n⭐ Sur le dessin : la courbe orange du coût total monte toujours, car $C_m > 0$. Elle monte le moins vite en $q = 2$, là où la courbe bleue du coût marginal est au plus bas.",
          schema: ecranSeulement(repere([-1, 6, -1, 7], [{ q: [0.3, -1.2, 1.5] }, { p: [0.1, -0.6, 1.5, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }])),
          micros: ["primitive_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. L'intégrale y mesure une quantité du contexte.",
      rappel: [
        "Suite d'intégrales $I_n$ : on calcule $I_0$, on relie $I_n$ et $I_{n+1}$ (linéarité, intégration par parties), puis on encadre la fonction intégrée pour trouver la limite.",
        "Positivité : si $f \\geqslant 0$ sur $[a ; b]$, avec $a \\leqslant b$, alors $\\displaystyle\\int_a^b f \\geqslant 0$.",
        "Une intégrale jusqu'à $\\lambda$ peut avoir une limite quand $\\lambda \\to +\\infty$ : un domaine infini peut avoir une aire finie.",
      ],
      exercices: [
        {
          titre: "Calculer ln 2 avec un ordinateur",
          enonce:
            "Pour tout entier $n \\geqslant 0$, on pose $I_n = \\displaystyle\\int_0^1 \\dfrac{x^n}{1 + x}\\,\\mathrm{d}x$.\na) Calculer $I_0$.\nb) Montrer que $I_n + I_{n+1} = \\dfrac{1}{n + 1}$. En déduire $I_1$ et $I_2$.\nc) Montrer que $0 \\leqslant I_n \\leqslant \\dfrac{1}{n + 1}$. En déduire la limite de $(I_n)$.\nd) On note $S_n = 1 - \\dfrac{1}{2} + \\dfrac{1}{3} - \\cdots + \\dfrac{(-1)^{n+1}}{n}$ et on admet que $\\ln 2 - S_n = (-1)^n I_n$. Montrer que $S_n$ tend vers $\\ln 2$.\ne) La fonction Python ci-dessous calcule $S_n$. Que renvoie approx(4) ? Quelle valeur de $n$ garantit une erreur inférieure à $10^{-3}$ ?",
          figure: programme(["def approx(n):", "    s = 0", "    for k in range(1, n + 1):", "        s = s + (-1)**(k+1)/k", "    return s"]),
          correction:
            "a) $I_0 = \\displaystyle\\int_0^1 \\dfrac{1}{1 + x}\\,\\mathrm{d}x = \\big[\\ln(1 + x)\\big]_0^1 = \\ln 2$.\nb) Par linéarité : $I_n + I_{n+1} = \\displaystyle\\int_0^1 \\dfrac{x^n(1 + x)}{1 + x}\\,\\mathrm{d}x$ $= \\displaystyle\\int_0^1 x^n\\,\\mathrm{d}x = \\dfrac{1}{n + 1}$.\nAvec $n = 0$ : $I_1 = 1 - \\ln 2 \\approx 0{,}307$. Avec $n = 1$ : $I_2 = \\dfrac{1}{2} - I_1 = \\ln 2 - \\dfrac{1}{2} \\approx 0{,}193$.\nc) Sur $[0 ; 1]$, $1 + x \\geqslant 1$, donc $0 \\leqslant \\dfrac{x^n}{1 + x} \\leqslant x^n$.\nOn intègre, bornes dans l'ordre : $0 \\leqslant I_n \\leqslant \\dfrac{1}{n + 1}$. Par les gendarmes, $\\lim I_n = 0$.\nd) $|\\ln 2 - S_n| = I_n \\leqslant \\dfrac{1}{n + 1}$, qui tend vers $0$ : $S_n$ tend vers $\\ln 2$.\ne) approx(4) calcule $S_4 = 1 - \\dfrac{1}{2} + \\dfrac{1}{3} - \\dfrac{1}{4} = \\dfrac{7}{12} \\approx 0{,}5833$.\nL'erreur est au plus $\\dfrac{1}{n + 1}$, et $\\dfrac{1}{n + 1} \\leqslant 10^{-3}$ dès que $n + 1 \\geqslant 1\\,000$ : avec $n = 999$, c'est garanti.\n⚠️ En c), c'est $1 + x \\geqslant 1$ qui permet de majorer. Majorer $I_n$ par $1$ serait juste, mais ne donnerait pas la limite.\n⚠️ $S_4 \\approx 0{,}58$ est encore loin de $\\ln 2 \\approx 0{,}693$ : cette somme s'approche lentement.\n⭐ Sur le dessin : les sommes $S_n$ sautent d'un côté à l'autre de la droite $y = \\ln 2$, de moins en moins loin. $\\ln 2$ est toujours entre deux sommes qui se suivent.",
          schema: ecranSeulement(repere([-1, 9, -1, 2], [], termes(1, [1, 0.5, 0.83, 0.58, 0.78, 0.62, 0.76, 0.63]), 0.693)),
          micros: ["integrale_defi", "integrale_calculer"],
        },
        {
          titre: "Le volume d'une crue",
          enonce:
            "Après un orage, le débit d'un ruisseau, en milliers de m³ par heure, est modélisé par $d(t) = (2t + 1)\\mathrm{e}^{-t}$, où $t \\geqslant 0$ est le temps en heures. Le volume écoulé entre $0$ et $\\lambda$ est $V(\\lambda) = \\displaystyle\\int_0^{\\lambda} d(t)\\,\\mathrm{d}t$.\na) Étudier les variations de $d$ sur $[0 ; +\\infty[$. Quand le débit est-il maximal ?\nb) Vérifier que $D(t) = -(2t + 3)\\mathrm{e}^{-t}$ est une primitive de $d$.\nc) En déduire que $V(\\lambda) = 3 - (2\\lambda + 3)\\mathrm{e}^{-\\lambda}$.\nd) Déterminer la limite de $V(\\lambda)$ quand $\\lambda$ tend vers $+\\infty$. Interpréter.\ne) Au bout de combien de temps la moitié de ce volume total est-elle passée, à la minute près ?",
          correction:
            "a) $d'(t) = 2\\mathrm{e}^{-t} - (2t + 1)\\mathrm{e}^{-t}$ $= (1 - 2t)\\mathrm{e}^{-t}$.\n$\\mathrm{e}^{-t} > 0$ : $d'$ a le signe de $1 - 2t$. $d$ croît sur $[0 ; 0{,}5]$, puis décroît.\nLe débit est maximal au bout d'une demi-heure : $d(0{,}5) = 2\\mathrm{e}^{-0{,}5} \\approx 1{,}21$ millier de m³ par heure.\nb) $D'(t) = -2\\mathrm{e}^{-t} + (2t + 3)\\mathrm{e}^{-t}$ $= (2t + 1)\\mathrm{e}^{-t} = d(t)$.\nc) $V(\\lambda) = D(\\lambda) - D(0) = -(2\\lambda + 3)\\mathrm{e}^{-\\lambda} + 3$.\nd) $\\lambda\\mathrm{e}^{-\\lambda} \\to 0$ (croissances comparées) et $\\mathrm{e}^{-\\lambda} \\to 0$. Donc $V(\\lambda) \\to 3$.\nAu total, la crue fait passer $3\\,000$ m³, même si, dans ce modèle, le ruisseau ne s'arrête jamais de couler.\ne) On cherche $V(\\lambda) = 1{,}5$. $V$ est continue et strictement croissante, car $V' = d > 0$ : il y a une seule solution.\nÀ la calculatrice : $\\lambda \\approx 1{,}327$ h, soit environ $1$ h $20$ min.\n⚠️ $D(0) = -3$, pas $0$ : oublier de le retrancher donnerait un volume négatif.\n⭐ Sur le dessin : le débit monte vite jusqu'au point rouge, puis décroît lentement. L'aire hachurée, de $0$ à $1{,}327$, est la moitié de l'aire totale sous la courbe.",
          schema: repere(
            [-1, 8, -1, 2],
            [
              { pts: echantillon((t) => (2 * t + 1) * Math.exp(-t), 0, 8) },
              { pts: bande((t) => (2 * t + 1) * Math.exp(-t), () => 0, 0, 1.327), couleur: ORANGE },
            ],
            [{ x: 0.5, y: 1.21, label: "" }],
          ),
          micros: ["integrale_defi", "integrale_aire", "primitive_reconnaitre"],
        },
        {
          titre: "Mesurer les inégalités de revenus",
          enonce:
            "Dans un pays imaginaire, on range les foyers du plus modeste au plus aisé. $L(x)$ est la part des revenus totaux perçue par la proportion $x$ des foyers les plus modestes. On modélise : $L(x) = \\dfrac{\\mathrm{e}^{x} - 1}{\\mathrm{e} - 1}$ pour $x \\in [0 ; 1]$.\na) Calculer $L(0)$, $L(1)$ et $L(0{,}5)$. Interpréter $L(0{,}5)$.\nb) Calculer $\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x$.\nc) On admet que $L(x) \\leqslant x$ sur $[0 ; 1]$. Les économistes mesurent les inégalités par le coefficient de Gini : deux fois l'aire entre la droite $y = x$ et la courbe de $L$. Le calculer.\nd) Que vaudrait-il si tous les foyers avaient le même revenu ?",
          correction:
            "a) $L(0) = \\dfrac{1 - 1}{\\mathrm{e} - 1} = 0$ et $L(1) = \\dfrac{\\mathrm{e} - 1}{\\mathrm{e} - 1} = 1$.\n$L(0{,}5) = \\dfrac{\\sqrt{\\mathrm{e}} - 1}{\\mathrm{e} - 1} \\approx 0{,}378$ : les $50$ % de foyers les plus modestes perçoivent environ $37{,}8$ % des revenus.\nb) Une primitive de $L$ est $x \\mapsto \\dfrac{\\mathrm{e}^{x} - x}{\\mathrm{e} - 1}$.\n$\\displaystyle\\int_0^1 L(x)\\,\\mathrm{d}x = \\dfrac{(\\mathrm{e} - 1) - 1}{\\mathrm{e} - 1}$ $= \\dfrac{\\mathrm{e} - 2}{\\mathrm{e} - 1} \\approx 0{,}418$.\nC'est aussi la valeur moyenne de $L$ sur $[0 ; 1]$, car l'intervalle a pour longueur $1$.\nc) Comme $L(x) \\leqslant x$, l'aire entre les courbes est $\\displaystyle\\int_0^1 (x - L(x))\\,\\mathrm{d}x = \\dfrac{1}{2} - \\dfrac{\\mathrm{e} - 2}{\\mathrm{e} - 1}$.\nLe coefficient de Gini vaut $1 - \\dfrac{2(\\mathrm{e} - 2)}{\\mathrm{e} - 1} = \\dfrac{3 - \\mathrm{e}}{\\mathrm{e} - 1} \\approx 0{,}164$.\nd) Si tous avaient le même revenu, $x$ % des foyers auraient $x$ % des revenus : $L(x) = x$. L'aire entre les courbes serait nulle, et le coefficient de Gini vaudrait $0$.\n⚠️ $\\displaystyle\\int_0^1 x\\,\\mathrm{d}x = \\dfrac{1}{2}$ : c'est l'aire du triangle sous la diagonale, pas $1$.\n⚠️ Sur le dessin, une graduation vaut $25$ % sur chaque axe : le point rouge $(2 ; 1{,}51)$ se lit « $50$ % des foyers, $37{,}8$ % des revenus ».\n⭐ Sur le dessin : l'aire hachurée, entre la diagonale grise et la courbe de $L$, mesure l'écart à l'égalité parfaite. Plus elle est grande, plus le pays est inégalitaire.",
          schema: repere(
            [-1, 5, -1, 5],
            [
              { q: [0, 1, 0], couleur: GRIS },
              { pts: echantillon((x) => (4 * (Math.exp(x / 4) - 1)) / (Math.E - 1), 0, 4) },
              { pts: bande((x) => x, (x) => (4 * (Math.exp(x / 4) - 1)) / (Math.E - 1), 0, 4, 0.2), couleur: ORANGE },
            ],
            [{ x: 2, y: 1.51, label: "" }],
          ),
          micros: ["integrale_defi", "integrale_aire", "integrale_valeur_moyenne"],
        },
        {
          titre: "La tension du secteur",
          enonce:
            "La tension d'une prise électrique est modélisée par $u(t) = U\\sin(t)$, en volts, où $U > 0$ est l'amplitude. Le temps est mesuré dans une unité où une période vaut $2\\pi$.\na) Calculer la valeur moyenne de $\\sin$ sur $[0 ; \\pi]$, puis sur $[0 ; 2\\pi]$. Pourquoi cette dernière est-elle décevante ?\nb) On rappelle que $\\cos(2t) = 1 - 2\\sin^2(t)$. Montrer que la valeur moyenne de $\\sin^2$ sur $[0 ; 2\\pi]$ vaut $\\dfrac{1}{2}$.\nc) Les électriciens utilisent la tension efficace $U_{\\text{eff}}$ : la racine carrée de la valeur moyenne de $u^2$ sur une période. Montrer que $U_{\\text{eff}} = \\dfrac{U}{\\sqrt{2}}$.\nd) En France, la tension efficace du secteur est de $230$ V. Quelle est l'amplitude $U$ ?",
          correction:
            "a) Une primitive de $\\sin$ est $-\\cos$.\nSur $[0 ; \\pi]$ : $\\dfrac{1}{\\pi}\\big[-\\cos(t)\\big]_0^{\\pi} = \\dfrac{1}{\\pi}(1 + 1) = \\dfrac{2}{\\pi} \\approx 0{,}64$.\nSur $[0 ; 2\\pi]$ : $\\dfrac{1}{2\\pi}\\big[-\\cos(t)\\big]_0^{2\\pi} = \\dfrac{1}{2\\pi}(-1 + 1) = 0$.\nLa tension moyenne sur une période est nulle : positive la moitié du temps, négative l'autre. Elle ne dit rien de la force du courant.\nb) $\\sin^2(t) = \\dfrac{1 - \\cos(2t)}{2}$. Une primitive est $\\dfrac{t}{2} - \\dfrac{\\sin(2t)}{4}$.\nSur $[0 ; 2\\pi]$, l'intégrale vaut $\\pi - 0 = \\pi$. La moyenne vaut $\\dfrac{\\pi}{2\\pi} = \\dfrac{1}{2}$.\nc) $u^2 = U^2\\sin^2(t)$. Par linéarité, sa moyenne est $U^2 \\times \\dfrac{1}{2}$. Donc $U_{\\text{eff}} = \\sqrt{\\dfrac{U^2}{2}} = \\dfrac{U}{\\sqrt{2}}$.\nd) $U = 230\\sqrt{2} \\approx 325$ V.\n⚠️ Une primitive de $\\cos(2t)$ est $\\dfrac{\\sin(2t)}{2}$ : on divise par $2$, on ne multiplie pas.\n⚠️ La tension efficace n'est pas la moyenne de $|u|$ : celle-ci vaut $\\dfrac{2U}{\\pi} \\approx 0{,}64\\,U$, alors que $\\dfrac{U}{\\sqrt{2}} \\approx 0{,}71\\,U$.\n⭐ Sur le dessin : la courbe bleue de $\\sin^2$ oscille entre $0$ et $1$, symétrique autour de la droite $y = \\dfrac{1}{2}$. Ce qui dépasse au-dessus comble exactement les creux : la moyenne est $\\dfrac{1}{2}$. En gris, la courbe de $\\sin$, de moyenne nulle.",
          schema: ecranSeulement(
            repere(
              [-1, 7, -1, 2],
              [
                { pts: echantillon((t) => Math.sin(t) ** 2, 0, 6.3) },
                { pts: echantillon((t) => Math.sin(t), 0, 6.3), couleur: GRIS },
              ],
              [],
              0.5,
            ),
          ),
          micros: ["integrale_valeur_moyenne", "integrale_defi", "primitive_calculer"],
        },
      ],
    },
  ],
};
