// ─── Fiche d'exercices : les suites numériques (terminale spé) ────────────────
//                              20 exercices corrigés
//
// Écrite le 29/09/2026 sur le modèle de l'étalon de terminale
// (`maths-terminale-limite-suite.tsx`). Alignée sur `lib/tutor-v4/questionBank/
// terminale-spe/maths/suites.bank.ts` et `suites-concours.bank.ts`.
//
// ⭐⭐ LE FIL : LA RÉCURRENCE. Une suite se donne terme après terme ; ce qu'on
// voit sur trois termes, on le DÉMONTRE pour tous par récurrence : une formule,
// une divisibilité, une borne, un sens de variation. Les corrigés dessinent les
// termes en points, et l'escalier des suites u(n+1) = f(u(n)).
//
// ⛔ Pas de calcul de limite ici : la feuille « Limites de suites » s'en charge.
// On s'arrête au comportement (croissante, majorée, qui dépasse qui, à partir
// de quand). ⛔ Pas de répétition des suites de 1re spé (reconnaître, sommes,
// suite auxiliaire) : on va plus loin, par la preuve.
//
// Micro-compétences : suite_reconnaitre (1, 15, 20), suite_calculer_termes (2,
// 13, 17), suite_explicite_recurrence (3, 9, 13, 15, 17, 20),
// suite_recurrence_preuve (4, 5, 9, 10, 11, 12, 16, 17, 18, 19, 20),
// suite_variation (6, 7, 8, 12, 13, 14, 15, 16, 18, 19), suite_bornee (5, 8,
// 12, 14, 18, 19), suite_defi (17, 18, 19, 20). 7/7.
//
// Faits cités : aucun fait réel. Les boulets, le livret, les bactéries, les
// deux villes, les poissons et les salaires sont des MODÈLES. Les tours de
// Hanoï sont un casse-tête (le nombre minimal de coups y est ADMIS).

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau, trace } from "@/lib/fiches-exercices/figures";

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

export const exercicesSuiteNumeriqueTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "suite-numerique",
  titre: "Suites et récurrence",
  accroche:
    "Vingt exercices sur les suites : calculer des termes, démontrer par récurrence, étudier les variations, montrer qu'une suite est bornée, jusqu'au problème de bac. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine les termes de la suite.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Une suite est définie explicitement ($u_n$ en fonction de $n$) ou par récurrence (un premier terme, puis $u_{n+1}$ en fonction de $u_n$). Arithmétique : $u_{n+1} = u_n + r$ et $u_n = u_0 + nr$. Géométrique : $u_{n+1} = qu_n$ et $u_n = u_0q^n$.",
        "Variations : on étudie le signe de $u_{n+1} - u_n$. Si tous les termes sont strictement positifs, on peut aussi comparer $\\dfrac{u_{n+1}}{u_n}$ à $1$. Si $u_n = f(n)$, les variations de $f$ sur $[0 ; +\\infty[$ donnent celles de la suite.",
        "Récurrence : l'initialisation (la propriété est vraie au premier rang), l'hérédité (si elle est vraie au rang $n$, alors elle est vraie au rang $n + 1$), puis la conclusion.",
        "Bornée : il existe deux nombres $m$ et $M$ tels que $m \\leqslant u_n \\leqslant M$ pour tout $n$ ($m$ est un minorant, $M$ un majorant).",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque suite, dire si elle est arithmétique, géométrique, ou ni l'une ni l'autre. Justifier.\na) $u_0 = 7$ et $u_{n+1} = u_n - 4$\nb) $v_n = 5 \\times 2^n$\nc) $w_0 = 0$ et $w_{n+1} = w_n + n$\nd) $t_0 = 2$ et $t_{n+1} = 3t_n - 2$",
          correction:
            "a) On passe d'un terme au suivant en ajoutant toujours $-4$ : la suite est arithmétique, de raison $-4$.\nb) Les termes ne sont jamais nuls. $\\dfrac{v_{n+1}}{v_n} = \\dfrac{5 \\times 2^{n+1}}{5 \\times 2^n} = 2$ : la suite est géométrique, de raison $2$.\nc) On ajoute $n$, qui change à chaque rang. $w_1 = 0$, $w_2 = 1$, $w_3 = 3$, $w_4 = 6$.\nLes écarts $0$, $1$, $2$, $3$ ne sont pas constants : pas arithmétique. Et $w_1 = 0$ mais $w_2 = 1$ : aucun $q$ ne donne $0 \\times q = 1$, donc pas géométrique.\nd) $t_1 = 4$, $t_2 = 10$, $t_3 = 28$. Les écarts $2$ puis $6$ : pas arithmétique. Les quotients $2$ puis $2{,}5$ : pas géométrique.\n⚠️ Pour dire « non », trois termes qui ne collent pas suffisent : c'est un contre-exemple. Pour dire « oui », il faut une preuve pour TOUT $n$, comme en a) et b).\n⭐ Sur le dessin (suite c) : les points ne sont pas alignés, ils montent de plus en plus vite. Une suite arithmétique aurait tous ses points sur une droite.",
          schema: repere([-1, 6, -1, 11], [], termes(0, [0, 0, 1, 3, 6, 10]), undefined, true),
          micros: ["suite_reconnaitre"],
        },
        {
          enonce:
            "Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \\dfrac{u_n}{1 + u_n}$.\na) Calculer $u_1$, $u_2$, $u_3$ et $u_4$, sous forme de fractions.\nb) Quelle formule explicite peut-on conjecturer ?",
          correction:
            "a) $u_1 = \\dfrac{1}{1 + 1} = \\dfrac{1}{2}$.\n$u_2 = \\dfrac{\\frac{1}{2}}{1 + \\frac{1}{2}} = \\dfrac{1}{2} \\times \\dfrac{2}{3} = \\dfrac{1}{3}$.\nDe même, $u_3 = \\dfrac{1}{4}$ et $u_4 = \\dfrac{1}{5}$.\nb) On conjecture que $u_n = \\dfrac{1}{n + 1}$ pour tout $n$.\n⭐ La preuve est une récurrence : si $u_n = \\dfrac{1}{n + 1}$, alors $u_{n+1} = \\dfrac{1}{n + 1} \\times \\dfrac{n + 1}{n + 2} = \\dfrac{1}{n + 2}$.\n⚠️ Avec une définition par récurrence, on ne peut pas sauter de rang : pour calculer $u_4$, il faut d'abord $u_3$.\n⚠️ Une conjecture n'est pas une preuve : quatre termes ne disent rien du cinquième.\n⭐ Sur le dessin : les points sont tous sur la courbe orange $y = \\dfrac{1}{x + 1}$.",
          schema: ecranSeulement(repere([-1, 6, -1, 2], [{ pts: echantillon((x) => 1 / (x + 1), 0, 6), couleur: ORANGE }], termes(0, [1, 0.5, 0.33, 0.25, 0.2, 0.17]))),
          micros: ["suite_calculer_termes"],
        },
        {
          enonce:
            "Soit $(v_n)$ définie par $v_0 = 1$ et $v_{n+1} = v_n + 2n + 3$.\na) Calculer $v_1$, $v_2$, $v_3$ et $v_4$. Que remarque-t-on ?\nb) Vérifier que $(n + 2)^2 - (n + 1)^2 = 2n + 3$.\nc) En déduire la forme explicite de $v_n$, puis $v_{99}$ sans calculer les termes précédents.",
          correction:
            "a) $v_1 = 1 + 3 = 4$, $v_2 = 4 + 5 = 9$, $v_3 = 9 + 7 = 16$, $v_4 = 16 + 9 = 25$. Ce sont les carrés $1^2$, $2^2$, $3^2$, $4^2$, $5^2$.\nb) $(n + 2)^2 - (n + 1)^2 = n^2 + 4n + 4 - n^2 - 2n - 1$ $= 2n + 3$.\nc) La suite $w_n = (n + 1)^2$ a le même premier terme ($w_0 = 1$) et, d'après b), la même relation : $w_{n+1} = w_n + 2n + 3$.\nDeux suites qui partent du même terme et avancent par la même règle sont égales (c'est une récurrence immédiate) : $v_n = (n + 1)^2$.\nDonc $v_{99} = 100^2 = 10\\,000$.\n⭐ La forme récurrente obligeait à calculer $99$ termes. La forme explicite donne $v_{99}$ en une ligne.\n⚠️ Attention au décalage : $v_{99} = 100^2$, pas $99^2$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3", "4"], ["v(n)", 1, 4, 9, 16, 25])),
          micros: ["suite_explicite_recurrence"],
        },
        {
          enonce: "Démontrer par récurrence que, pour tout entier naturel $n$, $2^n \\geqslant n + 1$.",
          correction:
            "On note $P(n)$ la propriété « $2^n \\geqslant n + 1$ ».\nInitialisation : $2^0 = 1$ et $0 + 1 = 1$. On a bien $1 \\geqslant 1$ : $P(0)$ est vraie.\nHérédité : on suppose $P(n)$ vraie pour un entier $n$, c'est-à-dire $2^n \\geqslant n + 1$. On veut $2^{n+1} \\geqslant n + 2$.\nOn multiplie par $2$, qui est positif : $2^{n+1} \\geqslant 2n + 2$.\nOr $2n + 2 = (n + 2) + n \\geqslant n + 2$, car $n \\geqslant 0$. Donc $2^{n+1} \\geqslant n + 2$ : $P(n + 1)$ est vraie.\nConclusion : $P(0)$ est vraie et $P$ est héréditaire, donc $P(n)$ est vraie pour tout $n$.\n⛔ On n'écrit jamais « supposons $P(n)$ vraie pour tout $n$ » : c'est justement ce qu'on veut démontrer. On la suppose pour UN entier $n$.\n⭐ Sur le dessin : les points $2^n$ touchent la droite orange $y = x + 1$ en $n = 0$ et $n = 1$, puis passent au-dessus et s'en écartent.",
          schema: repere([-1, 4, -1, 9], [{ q: [0, 1, 1], couleur: ORANGE }], termes(0, [1, 2, 4, 8])),
          micros: ["suite_recurrence_preuve"],
        },
        {
          enonce: "Soit $(u_n)$ définie par $u_0 = 0$ et $u_{n+1} = 0{,}5u_n + 2$. Démontrer par récurrence que, pour tout $n$, $0 \\leqslant u_n \\leqslant 4$.",
          correction:
            "Initialisation : $u_0 = 0$, et $0 \\leqslant 0 \\leqslant 4$.\nHérédité : on suppose $0 \\leqslant u_n \\leqslant 4$ pour un entier $n$.\nOn multiplie par $0{,}5$, qui est positif : $0 \\leqslant 0{,}5u_n \\leqslant 2$.\nOn ajoute $2$ : $2 \\leqslant u_{n+1} \\leqslant 4$. A fortiori, $0 \\leqslant u_{n+1} \\leqslant 4$.\nConclusion : pour tout $n$, $0 \\leqslant u_n \\leqslant 4$. La suite est bornée : minorée par $0$, majorée par $4$.\n⚠️ On encadre en suivant la formule, opération par opération. Multiplier par un nombre positif garde le sens des inégalités ; par un négatif, il s'inverse.\n⚠️ Un majorant n'est pas unique : $5$ ou $100$ en sont aussi.\n⭐ Sur le dessin : les points $0$, $2$, $3$, $3{,}5$… montent, mais restent sous la droite $y = 4$.",
          schema: ecranSeulement(repere([-1, 7, -1, 5], [], termes(0, [0, 2, 3, 3.5, 3.75, 3.88, 3.94]), 4)),
          micros: ["suite_bornee", "suite_recurrence_preuve"],
        },
        {
          enonce: "Soit $u_n = n^2 - 6n$ pour $n \\geqslant 0$.\na) Calculer $u_{n+1} - u_n$.\nb) En déduire le sens de variation de $(u_n)$.",
          correction:
            "a) $u_{n+1} - u_n = (n + 1)^2 - 6(n + 1) - n^2 + 6n$.\nOn développe : $n^2 + 2n + 1 - 6n - 6 - n^2 + 6n = 2n - 5$.\nb) $2n - 5 \\geqslant 0$ quand $n \\geqslant 2{,}5$, c'est-à-dire, pour un entier, $n \\geqslant 3$.\nPour $n \\geqslant 3$ : $u_{n+1} \\geqslant u_n$. La suite est croissante à partir du rang $3$.\nPour $n \\leqslant 2$ : $u_{n+1} < u_n$. Les premiers termes descendent : $u_0 = 0$, $u_1 = -5$, $u_2 = -8$, $u_3 = -9$.\n⚠️ La suite n'est pas croissante : elle l'est seulement « à partir du rang $3$ ». Il faut dire le rang.\n⭐ Sur le dessin : les points descendent jusqu'au plus bas, $u_3 = -9$, puis remontent.",
          schema: repere([-1, 7, -10, 1], [], termes(0, [0, -5, -8, -9, -8, -5, 0]), undefined, true),
          micros: ["suite_variation"],
        },
        {
          enonce:
            "Soit $u_n = n \\times 0{,}7^n$ pour $n \\geqslant 1$. Ses termes sont strictement positifs.\na) Montrer que $\\dfrac{u_{n+1}}{u_n} = 0{,}7 \\times \\dfrac{n + 1}{n}$.\nb) Pour quels $n$ ce quotient est-il inférieur ou égal à $1$ ? Conclure sur les variations.",
          correction:
            "a) $\\dfrac{u_{n+1}}{u_n} = \\dfrac{(n + 1) \\times 0{,}7^{n+1}}{n \\times 0{,}7^n}$. On simplifie par $0{,}7^n$ : il reste $0{,}7 \\times \\dfrac{n + 1}{n}$.\nb) On multiplie par $n > 0$ : $0{,}7(n + 1) \\leqslant n$ équivaut à $0{,}7 \\leqslant 0{,}3n$, soit $n \\geqslant \\dfrac{7}{3} \\approx 2{,}33$.\nPour $n \\geqslant 3$, le quotient est $\\leqslant 1$. Comme $u_n > 0$, cela donne $u_{n+1} \\leqslant u_n$ : la suite est décroissante à partir du rang $3$.\nPour $n = 1$ et $n = 2$, le quotient dépasse $1$ : $u_1 < u_2 < u_3$.\n⚠️ On compare le quotient à $1$ SEULEMENT pour des termes strictement positifs. Pour des termes négatifs, la conclusion s'inverserait.\n⭐ Sur le dessin : les points montent jusqu'à $u_3 \\approx 1{,}03$, puis redescendent.",
          schema: ecranSeulement(repere([-1, 9, -1, 2], [], termes(1, [0.7, 0.98, 1.03, 0.96, 0.84, 0.71, 0.58, 0.46]))),
          micros: ["suite_variation"],
        },
        {
          enonce:
            "Soit $u_n = \\dfrac{2n + 1}{n + 3}$ pour $n \\geqslant 0$, et $f(x) = \\dfrac{2x + 1}{x + 3}$ sur $[0 ; +\\infty[$.\na) Calculer $f'(x)$. En déduire le sens de variation de $(u_n)$.\nb) Montrer que $u_n < 2$ pour tout $n$. La suite est-elle bornée ?",
          correction:
            "a) $f'(x) = \\dfrac{2(x + 3) - (2x + 1)}{(x + 3)^2} = \\dfrac{5}{(x + 3)^2}$, strictement positif.\n$f$ est croissante sur $[0 ; +\\infty[$. Comme $u_n = f(n)$ et $n < n + 1$, on a $u_n < u_{n+1}$ : la suite est croissante.\nb) $2 - u_n = \\dfrac{2n + 6 - 2n - 1}{n + 3} = \\dfrac{5}{n + 3}$, qui est positif. Donc $u_n < 2$.\nLa suite est croissante, donc minorée par son premier terme $u_0 = \\dfrac{1}{3}$.\nElle est bornée : $\\dfrac{1}{3} \\leqslant u_n < 2$ pour tout $n$.\n⛔ Cette méthode marche pour $u_n = f(n)$, PAS pour $u_{n+1} = f(u_n)$ : là, « $f$ croissante » ne dit pas que la suite est croissante (voir l'exercice 15).\n⭐ Sur le dessin : les points sont posés sur la courbe de $f$, qui monte sous la droite $y = 2$.",
          schema: repere(
            [-1, 9, -1, 3],
            [{ pts: echantillon((x) => (2 * x + 1) / (x + 3), 0, 9) }],
            termes(0, [0.33, 0.75, 1, 1.17, 1.29, 1.38, 1.44, 1.5, 1.55]),
            2,
          ),
          micros: ["suite_variation", "suite_bornee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige la récurrence en entier.",
      rappel: [
        "Hérédité : on écrit l'hypothèse (la propriété au rang $n$), puis le but (la propriété au rang $n + 1$), et on passe de l'une à l'autre.",
        "Si $f$ est croissante sur un intervalle $I$, elle garde l'ordre : pour $a \\leqslant b$ dans $I$, $f(a) \\leqslant f(b)$. C'est l'outil des suites $u_{n+1} = f(u_n)$.",
        "« Divisible par $7$ » s'écrit par une égalité : il existe un entier $k$ tel que le nombre vaut $7k$.",
      ],
      exercices: [
        {
          enonce:
            "Des boulets sont empilés en pyramide à base carrée : $1$ boulet au sommet, $4$ à l'étage en dessous, $9$ au suivant… et $n^2$ à l'étage $n$. On note $S_n = 1^2 + 2^2 + \\cdots + n^2$ le nombre de boulets d'une pyramide de $n$ étages.\na) Calculer $S_1$, $S_2$, $S_3$, $S_4$. Exprimer $S_{n+1}$ en fonction de $S_n$.\nb) Démontrer par récurrence que, pour tout $n \\geqslant 1$, $S_n = \\dfrac{n(n + 1)(2n + 1)}{6}$.\nc) Combien faut-il de boulets pour une pyramide de $10$ étages ?",
          correction:
            "a) $S_1 = 1$, $S_2 = 5$, $S_3 = 14$, $S_4 = 30$. On ajoute l'étage suivant : $S_{n+1} = S_n + (n + 1)^2$.\nb) Initialisation : $\\dfrac{1 \\times 2 \\times 3}{6} = 1 = S_1$.\nHérédité : on suppose $S_n = \\dfrac{n(n + 1)(2n + 1)}{6}$. Le but : $S_{n+1} = \\dfrac{(n + 1)(n + 2)(2n + 3)}{6}$.\n$S_{n+1} = \\dfrac{n(n + 1)(2n + 1)}{6} + (n + 1)^2$.\nOn factorise par $(n + 1)$ : $S_{n+1} = \\dfrac{(n + 1)\\left(2n^2 + 7n + 6\\right)}{6}$, car $n(2n + 1) + 6(n + 1) = 2n^2 + 7n + 6$.\nOr $(n + 2)(2n + 3) = 2n^2 + 7n + 6$. C'est bien le but.\nc) $S_{10} = \\dfrac{10 \\times 11 \\times 21}{6} = 385$ boulets.\n⚠️ On FACTORISE par $(n + 1)$ au lieu de tout développer : on voit arriver la formule voulue.\n⚠️ Le but se trouve en remplaçant $n$ par $n + 1$ PARTOUT : $2n + 1$ devient $2(n + 1) + 1 = 2n + 3$.\n⭐ Le tableau : la formule redonne $1$, $5$, $14$, $30$, et $385$ pour $10$ étages.",
          schema: ecranSeulement(tableau(["n", "1", "2", "3", "4", "10"], ["boulets", 1, 5, 14, 30, 385])),
          micros: ["suite_recurrence_preuve", "suite_explicite_recurrence"],
        },
        {
          enonce:
            "Démontrer par récurrence que, pour tout entier naturel $n$, $3^{2n} - 2^n$ est divisible par $7$.\nOn pourra écrire $3^{2(n+1)} = 9 \\times 3^{2n}$.",
          correction:
            "On note $P(n)$ : « il existe un entier $k$ tel que $3^{2n} - 2^n = 7k$ ».\nInitialisation : $3^0 - 2^0 = 1 - 1 = 0 = 7 \\times 0$. $P(0)$ est vraie.\nHérédité : on suppose $3^{2n} - 2^n = 7k$, soit $3^{2n} = 7k + 2^n$.\n$3^{2(n+1)} - 2^{n+1} = 9 \\times 3^{2n} - 2 \\times 2^n$.\nOn remplace : $9(7k + 2^n) - 2 \\times 2^n = 63k + 7 \\times 2^n$.\nC'est $7(9k + 2^n)$, et $9k + 2^n$ est un entier : $P(n + 1)$ est vraie.\nConclusion : $3^{2n} - 2^n$ est divisible par $7$ pour tout $n$.\n⚠️ « Divisible par $7$ » ne se manipule pas en mots : on l'écrit $= 7k$, et c'est cette égalité qu'on utilise.\n⭐ Le tableau : $0$, $7$, $77 = 7 \\times 11$, $721 = 7 \\times 103$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3"], ["3²ⁿ − 2ⁿ", 0, 7, 77, 721])),
          micros: ["suite_recurrence_preuve"],
        },
        {
          enonce:
            "Un élève veut démontrer que, pour tout $n$, $4^n + 1$ est divisible par $3$. Il écrit :\n« Si $4^n + 1 = 3k$, alors $4^{n+1} + 1 = 4 \\times 4^n + 1$ $= 4(3k - 1) + 1 = 12k - 3 = 3(4k - 1)$. Donc c'est vrai pour tout $n$. »\na) Son calcul est-il juste ?\nb) Calculer $4^n + 1$ pour $n = 0$, $1$, $2$. Conclure.\nc) Démontrer que, en fait, $4^n - 1$ est divisible par $3$ pour tout $n$.",
          correction:
            "a) Oui : l'hérédité est juste. Si $4^n = 3k - 1$, alors $4^{n+1} + 1 = 12k - 3$, qui est divisible par $3$.\nb) $4^0 + 1 = 2$, $4^1 + 1 = 5$, $4^2 + 1 = 17$. Aucun n'est divisible par $3$.\nLa propriété est FAUSSE : l'initialisation ne marche pour aucun rang. La démonstration de l'élève ne prouve rien.\nc) Initialisation : $4^0 - 1 = 0 = 3 \\times 0$.\nHérédité : si $4^n - 1 = 3k$, alors $4^n = 3k + 1$, et $4^{n+1} - 1 = 4(3k + 1) - 1 = 12k + 3 = 3(4k + 1)$.\nDonc $4^n - 1$ est divisible par $3$ pour tout $n$.\n⛔ Une hérédité sans initialisation ne prouve RIEN : c'est une échelle dont on n'atteint jamais le premier barreau.\n⭐ Le tableau : $2$, $5$, $17$, $65$… Chacun laisse le reste $2$ dans la division par $3$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3"], ["4ⁿ + 1", 2, 5, 17, 65])),
          micros: ["suite_recurrence_preuve"],
        },
        {
          enonce:
            "Soit $(u_n)$ définie par $u_0 = 0{,}5$ et $u_{n+1} = u_n - u_n^2$. On note $f(x) = x - x^2$.\na) Montrer que $f$ est croissante sur $[0 ; 0{,}5]$.\nb) Démontrer par récurrence que $0 \\leqslant u_n \\leqslant 0{,}5$ pour tout $n$.\nc) Étudier le sens de variation de $(u_n)$.",
          correction:
            "a) $f'(x) = 1 - 2x$, positif pour $x \\leqslant 0{,}5$ : $f$ est croissante sur $[0 ; 0{,}5]$.\nb) Initialisation : $u_0 = 0{,}5$, et $0 \\leqslant 0{,}5 \\leqslant 0{,}5$.\nHérédité : on suppose $0 \\leqslant u_n \\leqslant 0{,}5$. Ces nombres sont dans $[0 ; 0{,}5]$, où $f$ est croissante : $f(0) \\leqslant f(u_n) \\leqslant f(0{,}5)$.\nOr $f(0) = 0$ et $f(0{,}5) = 0{,}25$. Donc $0 \\leqslant u_{n+1} \\leqslant 0{,}25 \\leqslant 0{,}5$.\nc) $u_{n+1} - u_n = -u_n^2 \\leqslant 0$ : la suite est décroissante.\nElle est donc aussi bornée : $0 \\leqslant u_n \\leqslant 0{,}5$.\n⚠️ En c), pas besoin de $f$ : la différence se lit directement. La croissance de $f$ servait en b), pour garder l'ordre.\n⚠️ $f$ n'est croissante que jusqu'à $0{,}5$ : il faut vérifier que les termes restent dans cet intervalle, c'est tout l'objet de b).\n⭐ Sur le dessin (une graduation vaut $0{,}1$) : les termes $0{,}5$, $0{,}25$, $0{,}1875$… descendent, sans jamais passer sous $0$.",
          schema: repere([-1, 8, -1, 6], [], termes(0, [5, 2.5, 1.88, 1.52, 1.29, 1.12, 1, 0.9])),
          micros: ["suite_recurrence_preuve", "suite_variation", "suite_bornee"],
        },
        {
          enonce:
            "Léa a $1\\,000$ € sur un livret qui rapporte $3$ % par an. Chaque année, après les intérêts, elle retire $50$ €. Son capital après $n$ années vérifie $C_0 = 1\\,000$ et $C_{n+1} = 1{,}03C_n - 50$.\na) Calculer $C_1$ et $C_2$.\nb) Démontrer par récurrence que $C_n \\leqslant 1\\,000$ pour tout $n$. En déduire que $(C_n)$ est décroissante.\nc) Que renvoie la fonction Python ci-contre ? Donner sa valeur.",
          figure: programme(["def annees():", "    n = 0", "    C = 1000", "    while C >= 500:", "        C = 1.03 * C - 50", "        n = n + 1", "    return n"]),
          correction:
            "a) $C_1 = 1{,}03 \\times 1\\,000 - 50 = 980$ et $C_2 = 1{,}03 \\times 980 - 50 = 959{,}4$.\nb) Initialisation : $C_0 = 1\\,000 \\leqslant 1\\,000$.\nHérédité : si $C_n \\leqslant 1\\,000$, alors $1{,}03C_n \\leqslant 1\\,030$, et $C_{n+1} \\leqslant 1\\,030 - 50 = 980 \\leqslant 1\\,000$.\nVariations : $C_{n+1} - C_n = 0{,}03C_n - 50 \\leqslant 30 - 50 = -20$. C'est négatif : le capital baisse chaque année.\nc) La boucle refait l'année tant que le capital est encore d'au moins $500$ €. Elle renvoie le PREMIER nombre d'années après lequel $C_n < 500$.\nÀ la calculatrice : $C_{18} \\approx 531{,}7$ et $C_{19} \\approx 497{,}7$. La fonction renvoie $19$.\n⚠️ La condition du while est celle pour CONTINUER : on boucle tant que $C \\geqslant 500$, on sort au premier $C < 500$.\n⭐ Le programme calcule par récurrence, un terme après l'autre : sans forme explicite, c'est la seule façon d'avancer.",
          schema: ecranSeulement(trace(["n", "C"], [[0, 1000], [1, 980], [2, "959,4"], ["…", "…"], [18, "531,7"], [19, "497,7"]])),
          micros: ["suite_calculer_termes", "suite_variation", "suite_explicite_recurrence"],
        },
        {
          enonce:
            "Pour $n \\geqslant 1$, on pose $u_n = \\dfrac{1}{n + 1} + \\dfrac{1}{n + 2} + \\cdots + \\dfrac{1}{2n}$, une somme de $n$ termes.\na) Calculer $u_1$ et $u_2$.\nb) Montrer que $u_{n+1} - u_n = \\dfrac{1}{2n + 1} - \\dfrac{1}{2n + 2}$. En déduire le sens de variation de $(u_n)$.\nc) Montrer que $\\dfrac{1}{2} \\leqslant u_n \\leqslant 1$ pour tout $n \\geqslant 1$.",
          correction:
            "a) $u_1 = \\dfrac{1}{2}$ et $u_2 = \\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{7}{12}$.\nb) $u_{n+1} = \\dfrac{1}{n + 2} + \\cdots + \\dfrac{1}{2n} + \\dfrac{1}{2n + 1} + \\dfrac{1}{2n + 2}$.\nLes termes de $\\dfrac{1}{n + 2}$ à $\\dfrac{1}{2n}$ s'en vont dans la différence : $u_{n+1} - u_n = \\dfrac{1}{2n + 1} + \\dfrac{1}{2n + 2} - \\dfrac{1}{n + 1}$.\nOr $\\dfrac{1}{n + 1} = \\dfrac{2}{2n + 2}$. Il reste $\\dfrac{1}{2n + 1} - \\dfrac{1}{2n + 2}$.\n$2n + 1 < 2n + 2$, donc $\\dfrac{1}{2n + 1} > \\dfrac{1}{2n + 2}$ : la différence est positive, la suite est croissante.\nc) Chacun des $n$ termes est entre le plus petit, $\\dfrac{1}{2n}$, et le plus grand, $\\dfrac{1}{n + 1}$.\nOn additionne : $n \\times \\dfrac{1}{2n} \\leqslant u_n \\leqslant n \\times \\dfrac{1}{n + 1}$, soit $\\dfrac{1}{2} \\leqslant u_n \\leqslant \\dfrac{n}{n + 1} < 1$.\n⚠️ De $u_n$ à $u_{n+1}$, la somme PERD son premier terme $\\dfrac{1}{n + 1}$ et GAGNE deux termes. Ce n'est pas « on ajoute un terme ».\n⭐ Sur le dessin : les points montent, mais restent entre les droites $y = 0{,}5$ et $y = 1$.",
          schema: ecranSeulement(repere([-1, 9, -1, 2], [], termes(1, [0.5, 0.58, 0.62, 0.63, 0.65, 0.65, 0.66, 0.66]), [0.5, 1])),
          micros: ["suite_variation", "suite_bornee"],
        },
        {
          enonce:
            "Soit $f(x) = 0{,}5x + 1$. On définit deux suites avec la même fonction : $u_n = f(n)$ d'une part ; $v_0 = 0$ et $v_{n+1} = f(v_n)$ d'autre part.\na) Calculer les quatre premiers termes de chaque suite. Laquelle est explicite ? Laquelle est récurrente ?\nb) Montrer que $(u_n)$ est croissante et n'est pas majorée.\nc) Démontrer par récurrence que $v_n \\leqslant v_{n+1} \\leqslant 2$ pour tout $n$.",
          correction:
            "a) $u_0 = 1$, $u_1 = 1{,}5$, $u_2 = 2$, $u_3 = 2{,}5$ : on remplace $x$ par $n$, c'est une forme explicite.\n$v_0 = 0$, $v_1 = 1$, $v_2 = 1{,}5$, $v_3 = 1{,}75$ : on applique $f$ au terme précédent, c'est une récurrence.\nb) $u_n = 0{,}5n + 1$ : la suite est arithmétique de raison $0{,}5 > 0$, donc croissante.\nPour tout nombre $M$, $u_n > M$ dès que $n > 2(M - 1)$ : aucun $M$ ne majore la suite.\nc) Initialisation : $v_0 = 0 \\leqslant v_1 = 1 \\leqslant 2$.\nHérédité : $f$ est croissante (coefficient $0{,}5 > 0$). Si $v_n \\leqslant v_{n+1} \\leqslant 2$, alors $f(v_n) \\leqslant f(v_{n+1}) \\leqslant f(2)$.\nOr $f(2) = 2$ : on obtient $v_{n+1} \\leqslant v_{n+2} \\leqslant 2$.\n⚠️ Même fonction, deux suites qui ne se ressemblent pas : $(u_n)$ dépasse tout nombre, $(v_n)$ reste sous $2$. Ne pas confondre $u_n = f(n)$ et $v_{n+1} = f(v_n)$.\n⭐ Sur le dessin : les points rouges $u_n$ sont SUR la droite bleue, aux abscisses $0$, $1$, $2$… L'escalier orange de $(v_n)$ rebondit entre la droite bleue et la droite grise $y = x$, et se coince vers le point $(2 ; 2)$.",
          schema: repere(
            [-1, 5, -1, 4],
            [
              { q: [0, 0.5, 1] },
              { q: [0, 1, 0], couleur: GRIS },
              { pts: [[0, 0], [0, 1], [1, 1], [1, 1.5], [1.5, 1.5], [1.5, 1.75], [1.75, 1.75]], couleur: ORANGE },
            ],
            termes(0, [1, 1.5, 2, 2.5, 3]),
          ),
          micros: ["suite_explicite_recurrence", "suite_reconnaitre", "suite_variation"],
        },
        {
          enonce:
            "Une culture contient $150$ milliers de bactéries. Chaque heure, leur nombre double, puis on en prélève $100$ milliers pour des analyses. En milliers : $u_0 = 150$ et $u_{n+1} = 2u_n - 100$.\na) Calculer $u_1$, $u_2$, $u_3$.\nb) Démontrer par récurrence que $u_n = 50 \\times 2^n + 100$ pour tout $n$.\nc) Étudier le sens de variation de $(u_n)$.\nd) Une autre culture ne contient que $90$ milliers de bactéries au départ. On admet qu'alors $u_n = 100 - 10 \\times 2^n$. Que se passe-t-il ?",
          correction:
            "a) $u_1 = 200$, $u_2 = 300$, $u_3 = 500$.\nb) Initialisation : $50 \\times 2^0 + 100 = 150 = u_0$.\nHérédité : si $u_n = 50 \\times 2^n + 100$, alors $u_{n+1} = 2(50 \\times 2^n + 100) - 100$.\nCela fait $50 \\times 2^{n+1} + 200 - 100 = 50 \\times 2^{n+1} + 100$ : c'est la formule au rang $n + 1$.\nc) $u_{n+1} - u_n = 50 \\times 2^{n+1} - 50 \\times 2^n = 50 \\times 2^n > 0$ : la suite est croissante.\nd) Les termes valent $90$, $80$, $60$, $20$, puis $u_4 = -60$.\nAu bout de $3$ heures, il reste $20$ milliers ; après doublement, $40$ milliers : on ne peut plus en prélever $100$. La culture s'éteint pendant la $4$e heure.\n⭐ Tout dépend du départ : au-dessus de $100$ milliers, la culture s'emballe ; en dessous, elle s'éteint. À $100$ pile, elle ne bouge pas : $2 \\times 100 - 100 = 100$.\n⚠️ Un nombre de bactéries négatif n'a pas de sens : là, le modèle cesse d'être valable.\n⭐ Sur le dessin (une graduation vaut $50$ milliers) : la ligne orange part de $150$ et s'envole ; les points rouges partent de $90$ et plongent. La droite $y = 2$ marque l'équilibre, $100$ milliers.",
          schema: repere(
            [-1, 5, -2, 11],
            [{ pts: [[0, 3], [1, 4], [2, 6], [3, 10]], couleur: ORANGE }],
            termes(0, [1.8, 1.6, 1.2, 0.4, -1.2]),
            2,
            true,
          ),
          micros: ["suite_recurrence_preuve", "suite_variation"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. On conjecture, on démontre, on interprète.",
      rappel: [
        "Plan type : calculer quelques termes, conjecturer, démontrer par récurrence, puis étudier les variations et les bornes.",
        "Croissante ne veut pas dire « de plus en plus grande sans fin » : une suite croissante peut être majorée. Et une suite décroissante peut être minorée.",
        "Dans un contexte, on interprète : un majorant est un plafond que la grandeur ne dépasse jamais, un minorant un plancher.",
      ],
      exercices: [
        {
          titre: "Les tours de Hanoï",
          enonce:
            "On empile $n$ disques de tailles différentes sur un piquet, du plus grand en bas au plus petit en haut. Il faut transporter la pile sur un autre piquet, un disque à la fois, sans jamais poser un disque sur un plus petit ; un troisième piquet sert d'appui. On note $h_n$ le nombre minimal de déplacements.\na) On admet que la méthode la plus rapide est : déplacer les $n$ disques du dessus sur l'appui, puis le grand disque, puis les $n$ disques par-dessus. En déduire que $h_1 = 1$ et $h_{n+1} = 2h_n + 1$.\nb) Calculer $h_2$, $h_3$, $h_4$. Conjecturer une formule explicite.\nc) La démontrer par récurrence.\nd) Étudier le sens de variation de $(h_n)$.\ne) La fonction Python ci-contre calcule $h_n$. Que renvoie coups(10) ? À un déplacement par seconde, combien de temps faut-il pour $20$ disques ?",
          figure: programme(["def coups(n):", "    if n == 1:", "        return 1", "    return 2*coups(n-1) + 1"]),
          correction:
            "a) Pour $n + 1$ disques : $h_n$ déplacements, puis $1$ pour le grand disque, puis encore $h_n$. Donc $h_{n+1} = 2h_n + 1$. Un seul disque se déplace en un coup : $h_1 = 1$.\nb) $h_2 = 3$, $h_3 = 7$, $h_4 = 15$. Ce sont les puissances de $2$ moins $1$ : on conjecture $h_n = 2^n - 1$.\nc) Initialisation : $2^1 - 1 = 1 = h_1$.\nHérédité : si $h_n = 2^n - 1$, alors $h_{n+1} = 2(2^n - 1) + 1 = 2^{n+1} - 2 + 1 = 2^{n+1} - 1$.\nConclusion : $h_n = 2^n - 1$ pour tout $n \\geqslant 1$.\nd) $h_{n+1} - h_n = 2^{n+1} - 2^n = 2^n > 0$ : la suite est croissante.\ne) coups(10) renvoie $2^{10} - 1 = 1\\,023$.\nPour $20$ disques : $2^{20} - 1 = 1\\,048\\,575$ secondes. On divise par $86\\,400$ secondes par jour : environ $12$ jours, sans pause.\n⚠️ La relation $h_{n+1} = 2h_n + 1$ n'est ni arithmétique ni géométrique : la formule $2^n - 1$ ne se devine pas, elle se DÉMONTRE.\n⚠️ Ici la suite commence à $n = 1$ : l'initialisation se fait au rang $1$.\n⭐ La fonction s'appelle elle-même, exactement comme la relation de récurrence : coups(n) a besoin de coups(n-1).",
          schema: ecranSeulement(tableau(["n", "1", "2", "3", "4", "10"], ["h(n)", 1, 3, 7, 15, 1023])),
          micros: ["suite_calculer_termes", "suite_explicite_recurrence", "suite_recurrence_preuve", "suite_defi"],
        },
        {
          titre: "Deux villes",
          enonce:
            "Deux villes A et B comptent ensemble $100$ milliers d'habitants, et ce total ne change pas. En 2025, A en compte $80$ milliers et B $20$ milliers. Chaque année, $10$ % des habitants de A partent vivre à B, et $20$ % des habitants de B partent vivre à A. On note $a_n$ et $b_n$ les populations, en milliers, l'année $2025 + n$.\na) Justifier que $a_{n+1} = 0{,}9a_n + 0{,}2b_n$, puis que $a_{n+1} = 0{,}7a_n + 20$.\nb) Démontrer par récurrence que $a_n \\geqslant \\dfrac{200}{3}$ pour tout $n$.\nc) Montrer que $(a_n)$ est décroissante.\nd) Un élu affirme : « à ce rythme, A passera un jour sous $60$ milliers d'habitants ». A-t-il raison ?",
          correction:
            "a) L'année suivante, A garde $90$ % de ses habitants et reçoit $20$ % de ceux de B : $a_{n+1} = 0{,}9a_n + 0{,}2b_n$.\nLe total vaut $100$, donc $b_n = 100 - a_n$ : $a_{n+1} = 0{,}9a_n + 20 - 0{,}2a_n = 0{,}7a_n + 20$.\nb) Initialisation : $a_0 = 80 \\geqslant \\dfrac{200}{3} \\approx 66{,}7$.\nHérédité : si $a_n \\geqslant \\dfrac{200}{3}$, alors $0{,}7a_n \\geqslant \\dfrac{140}{3}$, et $a_{n+1} \\geqslant \\dfrac{140}{3} + \\dfrac{60}{3} = \\dfrac{200}{3}$.\nc) $a_{n+1} - a_n = 20 - 0{,}3a_n$. Comme $a_n \\geqslant \\dfrac{200}{3}$, $0{,}3a_n \\geqslant 20$ : la différence est négative. La suite est décroissante.\nd) Non. La population de A baisse chaque année, mais elle reste toujours au-dessus de $\\dfrac{200}{3} \\approx 66{,}7$ milliers, donc au-dessus de $60$ milliers.\n⭐ D'où vient $\\dfrac{200}{3}$ ? C'est la solution de $\\ell = 0{,}7\\ell + 20$ : la population qui ne bougerait plus d'une année à l'autre.\n⚠️ « Décroissante » ne veut pas dire « descend aussi bas qu'on veut » : ici, la suite est minorée.\n⭐ Sur le dessin (une graduation vaut $10$ milliers) : les points $80$, $76$, $73{,}2$… descendent vers la droite $y = 6{,}67$ sans la franchir.",
          schema: repere([-1, 8, -1, 9], [], termes(0, [8, 7.6, 7.32, 7.12, 6.99, 6.89, 6.82, 6.78]), 6.667),
          micros: ["suite_recurrence_preuve", "suite_bornee", "suite_variation", "suite_defi"],
        },
        {
          titre: "Les poissons de la réserve",
          enonce:
            "Dans une réserve, une population de poissons, en milliers, suit le modèle $u_{n+1} = f(u_n)$ l'année $n$, où $f(x) = \\dfrac{3x}{1 + x}$. Au départ, $u_0 = 0{,}5$.\na) Étudier les variations de $f$ sur $[0 ; +\\infty[$. Calculer $f(0)$ et $f(2)$.\nb) Démontrer par récurrence que $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 2$ pour tout $n$.\nc) La population dépassera-t-elle un jour $2\\,000$ poissons ?\nd) Un autre bassin, surpeuplé, part de $u_0 = 4$. Démontrer par récurrence que $2 \\leqslant u_{n+1} \\leqslant u_n$ pour tout $n$. Comparer les deux bassins.",
          correction:
            "a) $f'(x) = \\dfrac{3(1 + x) - 3x}{(1 + x)^2} = \\dfrac{3}{(1 + x)^2} > 0$ : $f$ est croissante. $f(0) = 0$ et $f(2) = \\dfrac{6}{3} = 2$.\nb) Initialisation : $u_1 = \\dfrac{1{,}5}{1{,}5} = 1$, et $0 \\leqslant 0{,}5 \\leqslant 1 \\leqslant 2$.\nHérédité : si $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 2$, comme $f$ est croissante, $f(0) \\leqslant f(u_n) \\leqslant f(u_{n+1}) \\leqslant f(2)$.\nSoit $0 \\leqslant u_{n+1} \\leqslant u_{n+2} \\leqslant 2$ : la propriété est vraie au rang $n + 1$.\nc) Non : la population augmente chaque année, mais reste sous $2$ milliers. Elle vaut $0{,}5$, $1$, $1{,}5$, $1{,}8$, puis environ $1{,}93$…\nd) Initialisation : $u_1 = \\dfrac{12}{5} = 2{,}4$, et $2 \\leqslant 2{,}4 \\leqslant 4$.\nHérédité : si $2 \\leqslant u_{n+1} \\leqslant u_n$, alors $f(2) \\leqslant f(u_{n+1}) \\leqslant f(u_n)$, soit $2 \\leqslant u_{n+2} \\leqslant u_{n+1}$.\nCe bassin-là DIMINUE chaque année, sans jamais passer sous $2\\,000$ poissons.\nLes deux populations sont prises de part et d'autre de $2$ milliers : l'une monte vers ce niveau, l'autre y redescend. C'est le point fixe de $f$, la population que la réserve peut nourrir.\n⚠️ En d), l'ordre des termes est inversé : on adapte la propriété. $f$ croissante garde l'ordre dans les deux sens.\n⭐ Sur le dessin : l'escalier orange (départ $0{,}5$) monte, l'escalier vert (départ $4$) descend ; tous deux se coincent au point $(2 ; 2)$, où la courbe de $f$ coupe la droite grise $y = x$.",
          schema: repere(
            [-1, 5, -1, 4],
            [
              { pts: echantillon((x) => (3 * x) / (1 + x), 0, 5) },
              { q: [0, 1, 0], couleur: GRIS },
              { pts: [[0.5, 0], [0.5, 1], [1, 1], [1, 1.5], [1.5, 1.5], [1.5, 1.8], [1.8, 1.8], [1.8, 1.929], [1.929, 1.929]], couleur: ORANGE },
              { pts: [[4, 0], [4, 2.4], [2.4, 2.4], [2.4, 2.118], [2.118, 2.118], [2.118, 2.038]], couleur: VERT },
            ],
            [{ x: 2, y: 2, label: "" }],
          ),
          micros: ["suite_recurrence_preuve", "suite_variation", "suite_bornee", "suite_defi"],
        },
        {
          titre: "Deux offres d'emploi",
          enonce:
            "Offre A : $2\\,000$ € par mois la première année, puis $60$ € de plus chaque année. Offre B : $1\\,900$ € par mois la première année, puis $3$ % de plus chaque année. On note $a_n$ et $b_n$ les salaires mensuels l'année $n$, avec $a_0 = 2\\,000$ et $b_0 = 1\\,900$.\na) Reconnaître la nature de chaque suite. Donner $a_n$ et $b_n$ en fonction de $n$.\nb) Calculer $a_{12}$, $b_{12}$, $a_{13}$ et $b_{13}$ (à l'euro près).\nc) Démontrer par récurrence que $b_n > a_n$ pour tout $n \\geqslant 13$.\nd) Pour un contrat de $20$ ans (années $0$ à $19$), comparer la somme des salaires mensuels des deux offres.",
          correction:
            "a) On ajoute $60$ chaque année : $(a_n)$ est arithmétique de raison $60$, et $a_n = 2\\,000 + 60n$.\nOn multiplie par $1{,}03$ chaque année : $(b_n)$ est géométrique de raison $1{,}03$, et $b_n = 1\\,900 \\times 1{,}03^n$.\nb) $a_{12} = 2\\,720$ et $b_{12} \\approx 2\\,709$ : A est encore devant.\n$a_{13} = 2\\,780$ et $b_{13} \\approx 2\\,790$ : B passe devant l'année $13$.\nc) Initialisation : au rang $13$, $b_{13} \\approx 2\\,790 > 2\\,780 = a_{13}$.\nHérédité : on suppose $b_n > a_n$ pour un $n \\geqslant 13$. Alors $b_{n+1} = 1{,}03b_n > 1{,}03a_n$.\nOr $1{,}03a_n = 2\\,060 + 61{,}8n \\geqslant 2\\,060 + 60n = a_{n+1}$. Donc $b_{n+1} > a_{n+1}$.\nConclusion : à partir de l'année $13$, B paie toujours mieux que A.\nd) A : $20 \\times 2\\,000 + 60 \\times (0 + 1 + \\cdots + 19)$ $= 40\\,000 + 60 \\times 190 = 51\\,400$ €.\nB : $1\\,900 \\times \\dfrac{1{,}03^{20} - 1}{0{,}03} \\approx 51\\,054$ €.\nLa somme de A dépasse celle de B d'environ $346$ €. Avec $12$ mois par an, A rapporte environ $4\\,155$ € de plus sur les $20$ ans, malgré les sept dernières années.\n⚠️ Ici l'initialisation se fait au rang $13$, pas à $0$ : la propriété est fausse avant.\n⚠️ « B finit par gagner chaque mois » ne veut pas dire « B rapporte plus au total » : le retard des $13$ premières années pèse encore.\n⭐ Sur le dessin : l'écart $b_n - a_n$, en centaines d'euros. Il est négatif jusqu'à $n = 12$, puis positif à partir de $n = 13$.",
          schema: repere(
            [-1, 14, -2, 1],
            [],
            termes(0, [-1, -1.03, -1.04, -1.04, -1.02, -0.97, -0.91, -0.83, -0.73, -0.61, -0.47, -0.3, -0.11, 0.1, 0.34]),
            undefined,
            true,
          ),
          micros: ["suite_reconnaitre", "suite_explicite_recurrence", "suite_recurrence_preuve", "suite_defi"],
        },
      ],
    },
  ],
};
