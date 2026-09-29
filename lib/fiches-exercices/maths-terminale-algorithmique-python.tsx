// ─── Fiche d'exercices : algorithmique et Python (terminale spé) ─────────────
//                              20 exercices corrigés
//
// Feuille du 29/09/2026, alignée sur la banque `lib/tutor-v4/questionBank/
// terminale-spe/maths/algorithmique-python.bank.ts` (six micros). Pas de fiche
// de cours.
//
// ⭐⭐ LE FIL : LE PROGRAMME SERT LE COURS DE TERMINALE. La 1re spé a appris la
// liste, la fonction qui renvoie, la boucle de seuil, Euler pour y′ = y et
// Newton (`maths-premiere-algorithmique.tsx` : rien n'en est repris). Ici, chaque
// programme rencontre un chapitre de terminale : le seuil se calcule AUSSI avec
// ln, la dichotomie s'appuie sur le théorème des valeurs intermédiaires, les
// rectangles encadrent une intégrale sans primitive, Euler approche y′ = ay + b,
// la simulation rejoint la loi binomiale, la somme de variables aléatoires et
// l'inégalité de Bienaymé-Tchebychev.
//
// ⭐ LES DESSINS : le programme (`programme`, imprimé : il EST la question), sa
// trace (`trace`), les termes d'une suite (`repere`), une loi en barres
// (`diagramme`). Les programmes courts sont écrits dans l'énoncé, entre « » ;
// leurs dessins du corrigé passent en `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-terminale-spe-algorithmique-python.mjs`
// EXÉCUTE chaque programme avec Python (les simulations avec une graine).
//
// Micro-compétences : python_lire_algorithme (1, 4, 6, 9, 10, 18, 19),
// python_variable_boucle (2, 6, 8, 9, 10, 16, 19), python_suite (1, 5, 11, 12,
// 16, 17, 20), python_seuil (3, 8, 12, 15, 17, 20), python_simulation_proba (4,
// 7, 13, 14, 15, 18), python_defi (17, 18, 19, 20). 6/6.
//
// Faits cités : aucun fait réel. Le médicament, le robot, le condensateur, le
// capital, le café, l'usine et la rumeur sont des MODÈLES. Résultats
// mathématiques cités : la série harmonique diverge ; la fonction x ↦ e^(−x²)
// n'a pas de primitive qui s'écrive avec les fonctions usuelles ;
// (1 + 1/n)^n → e.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, diagramme, programme, repere, tableau, trace } from "@/lib/fiches-exercices/figures";

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

export const exercicesAlgorithmiquePythonTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "algorithmique-python",
  titre: "Algorithmique et Python",
  accroche:
    "Vingt exercices où le programme rencontre le cours de terminale : seuils calculés avec ln, dichotomie, méthode des rectangles, méthode d'Euler, simulations et lois de probabilité. Un rappel avant chaque niveau. Suis chaque programme ligne à ligne au brouillon, puis ouvre la correction : elle fait la trace, et la confirme par le calcul.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme par exercice : le suivre ligne à ligne, noter les valeurs, conclure.",
      rappel: [
        "« for k in range(n) » répète le bloc $n$ fois, pour k = $0$, $1$, …, $n - 1$. « range(1, n + 1) » va de $1$ à $n$.",
        "« while condition: » répète le bloc TANT QUE la condition est vraie. Pour un seuil, la boucle s'arrête au premier rang où la condition devient fausse.",
        "« random() » renvoie un nombre au hasard dans $[0 ; 1[$ : le test « random() < p » est vrai avec la probabilité $p$.",
        "Une fonction RENVOIE son résultat avec « return ». On l'appelle ensuite comme en maths : u(3), S(4)…",
      ],
      exercices: [
        {
          enonce:
            "On considère la fonction Python suivante : « def u(n): », puis, en retrait, « v = 1 », « for k in range(n): », « v = 0.5 * v + 3 » (en double retrait) et « return v ».\na) Quelle suite $(u_n)$ cette fonction calcule-t-elle ? Donner $u_0$ et la relation de récurrence.\nb) Faire la trace de u(3).\nc) Que renvoie u(0) ? Pourquoi ?",
          correction:
            "a) v part de $1$, puis la boucle remplace v par $0{,}5v + 3$ à chaque tour.\nC'est la suite définie par $u_0 = 1$ et $u_{n+1} = 0{,}5u_n + 3$ : u(n) renvoie $u_n$.\nb) Pour u(3), la boucle fait $3$ tours (k = $0$, $1$, $2$).\nDépart : v vaut $1$.\nk = $0$ : v vaut $0{,}5 \\times 1 + 3 = 3{,}5$.\nk = $1$ : v vaut $0{,}5 \\times 3{,}5 + 3 = 4{,}75$.\nk = $2$ : v vaut $0{,}5 \\times 4{,}75 + 3 = 5{,}375$.\nu(3) renvoie $5{,}375$, c'est $u_3$.\nc) range(0) est vide : la boucle ne tourne pas, et u(0) renvoie $1$, c'est-à-dire $u_0$.\n⚠️ Le piège : croire que « range(3) » fait tourner la boucle pour k = $1$, $2$, $3$. Il y a bien trois tours, mais k commence à $0$ ; ici k ne sert qu'à compter.\n⭐ Sur le dessin : la trace, une ligne par tour. La dernière ligne, en rouge, est la valeur renvoyée.",
          schema: ecranSeulement(trace(["k", "v"], [["début", 1], [0, 3.5], [1, 4.75], [2, 5.375]])),
          micros: ["python_lire_algorithme", "python_suite"],
        },
        {
          enonce:
            "Voici une fonction : « def S(n): », puis, en retrait, « s = 0 », « for k in range(1, n + 1): », « s = s + k**2 » (en double retrait) et « return s ».\na) Faire la trace de S(4). Que calcule S(n) ?\nb) Un élève écrit « for k in range(n): » à la place. Que renvoie alors son S(4) ?\nc) Vérifier sur S(4) et S(10) la formule $S(n) = \\dfrac{n(n + 1)(2n + 1)}{6}$, qu'on démontre par récurrence.",
          correction:
            "a) k prend les valeurs $1$, $2$, $3$, $4$, et s accumule les carrés.\nDépart : s vaut $0$. Puis $0 + 1 = 1$, $1 + 4 = 5$, $5 + 9 = 14$, $14 + 16 = 30$.\nS(4) renvoie $30$. S(n) calcule $1^2 + 2^2 + \\cdots + n^2$.\nb) « range(4) » donne k = $0$, $1$, $2$, $3$ : on obtient $0 + 1 + 4 + 9 = 14$.\nC'est la somme jusqu'à $3^2$ seulement, soit S(3).\nc) Pour $n = 4$ : $\\dfrac{4 \\times 5 \\times 9}{6} = 30$. Pour $n = 10$ : $\\dfrac{10 \\times 11 \\times 21}{6} = 385$, et S(10) renvoie bien $385$.\n⛔ Le piège de la borne : « range(n) » s'arrête à $n - 1$. Pour aller jusqu'à $n$, on écrit « range(1, n + 1) ».\n⚠️ Deux vérifications ne démontrent pas la formule : le programme ne teste qu'un nombre fini de cas. La preuve se fait par récurrence.\n⭐ Sur le dessin : la trace de S(4), qui finit sur $30$.",
          schema: ecranSeulement(trace(["k", "s"], [["début", 0], [1, 1], [2, 5], [3, 14], [4, 30]])),
          micros: ["python_variable_boucle"],
        },
        {
          enonce:
            "La suite $(u_n)$ est définie par $u_0 = 10$ et $u_{n+1} = 0{,}8u_n + 1$. On admet que $u_n = 5 + 5 \\times 0{,}8^n$.\na) Que renvoie seuil(e), en termes de la suite ?\nb) Calculer seuil(0.1) à l'aide du logarithme népérien.\nc) Pourquoi la boucle s'arrête-t-elle, quel que soit e > 0 ?",
          figure: programme(["def seuil(e):", "    n = 0", "    u = 10", "    while u - 5 >= e:", "        u = 0.8 * u + 1", "        n = n + 1", "    return n"]),
          correction:
            "a) La boucle calcule les termes tant que l'écart $u_n - 5$ reste $\\geqslant e$. Elle renvoie le PREMIER rang $n$ tel que $u_n - 5 < e$.\nb) $u_n - 5 < 0{,}1$ équivaut à $5 \\times 0{,}8^n < 0{,}1$, soit $0{,}8^n < 0{,}02$.\nLa fonction ln est strictement croissante : $n\\ln(0{,}8) < \\ln(0{,}02)$.\nOn divise par $\\ln(0{,}8)$, qui est NÉGATIF : l'inégalité change de sens. $n > \\dfrac{\\ln(0{,}02)}{\\ln(0{,}8)} \\approx 17{,}53$.\nLe premier entier qui convient est $18$ : seuil(0.1) renvoie $18$.\nc) $-1 < 0{,}8 < 1$, donc $0{,}8^n \\to 0$ et $u_n - 5 \\to 0$. L'écart finit par passer sous n'importe quel e > 0 : la condition du while devient fausse.\n⛔ Le piège : oublier que $\\ln(0{,}8) < 0$ et écrire $n < 17{,}53$.\n⭐ Sur le dessin : les termes descendent vers la droite $y = 5$ sans l'atteindre ; au rang $8$, l'écart vaut encore $0{,}84$.",
          schema: ecranSeulement(repere([-1, 9, -1, 11], [], termes(0, [10, 9, 8.2, 7.56, 7.05, 6.64, 6.31, 6.05, 5.84]), 5, true)),
          micros: ["python_seuil"],
        },
        {
          enonce:
            "On considère la fonction X ci-dessous.\na) Que simule le test « random() < p » ?\nb) Quelle loi suit le nombre renvoyé par X(5, 0.3) ? Justifier.\nc) Calculer la probabilité que X(5, 0.3) renvoie $2$, et l'espérance de cette loi.",
          figure: programme(["from random import random", "", "def X(n, p):", "    s = 0", "    for k in range(n):", "        if random() < p:", "            s = s + 1", "    return s"]),
          correction:
            "a) random() tombe au hasard dans $[0 ; 1[$. Il tombe sous $p$ avec la probabilité $p$ : le test simule un succès de probabilité $p$.\nb) La boucle répète $n$ fois la même épreuve, et chaque tirage est indépendant des autres. s compte les succès.\nX(5, 0.3) suit donc la loi binomiale $\\mathcal{B}(5 ; 0{,}3)$.\nc) $P(X = 2) = \\dbinom{5}{2} \\times 0{,}3^2 \\times 0{,}7^3$.\nCela fait $10 \\times 0{,}09 \\times 0{,}343 = 0{,}3087$.\n$E(X) = np = 5 \\times 0{,}3 = 1{,}5$ : en moyenne, sur beaucoup d'appels, X(5, 0.3) renvoie $1{,}5$.\n⚠️ Un appel renvoie un ENTIER, jamais $1{,}5$. L'espérance est une moyenne à long terme.\n⚠️ Écrire « random() > p » simulerait l'échec : sa probabilité est $1 - p$.\n⭐ Sur le dessin : la loi de X. La plus haute barre est $k = 1$ ; $k = 2$ vient juste après, avec $0{,}309$.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "0", value: 0.168 },
              { label: "1", value: 0.36 },
              { label: "2", value: 0.309 },
              { label: "3", value: 0.132 },
              { label: "4", value: 0.028 },
              { label: "5", value: 0.002 },
            ]),
          ),
          micros: ["python_simulation_proba", "python_lire_algorithme"],
        },
        {
          enonce:
            "On considère la fonction : « def termes(N): », puis, en retrait, « L = [1] », « for k in range(N): », « L.append((L[-1] + 6)**0.5) » (en double retrait) et « return L ».\na) Quelle suite $(u_n)$ la liste contient-elle ?\nb) Combien d'éléments contient termes(3) ? Donner-les, arrondis au millième.\nc) On admet que la suite converge. Trouver sa limite.",
          correction:
            "a) L[-1] est le DERNIER élément de la liste. À chaque tour, on ajoute $\\sqrt{u + 6}$, où $u$ est le dernier terme calculé.\nLa liste contient les termes de $u_0 = 1$ et $u_{n+1} = \\sqrt{u_n + 6}$.\nb) termes(3) contient $u_0$, $u_1$, $u_2$ et $u_3$ : QUATRE éléments.\n$u_1 = \\sqrt{7} \\approx 2{,}646$, $u_2 = \\sqrt{8{,}646} \\approx 2{,}940$, $u_3 \\approx 2{,}990$.\nc) La fonction $f(x) = \\sqrt{x + 6}$ est continue : la limite $\\ell$ vérifie $\\ell = \\sqrt{\\ell + 6}$.\nOn élève au carré : $\\ell^2 - \\ell - 6 = 0$, soit $(\\ell - 3)(\\ell + 2) = 0$.\nUne racine carrée est positive, donc $\\ell = 3$.\n⚠️ termes(N) renvoie $N + 1$ termes, de $u_0$ à $u_N$ : la liste commence par $u_0$.\n⭐ Sur le dessin : les termes montent très vite vers la droite $y = 3$.",
          schema: ecranSeulement(repere([-1, 6, -1, 4], [], termes(0, [1, 2.65, 2.94, 2.99, 3, 3]), 3)),
          micros: ["python_suite"],
        },
        {
          enonce:
            "Voici une fonction qui teste une liste : « def croissante(L): », puis, en retrait, « for i in range(len(L) - 1): », « if L[i + 1] < L[i]: » (en double retrait), « return False » (en triple retrait), et enfin « return True » (en simple retrait).\na) Que renvoient croissante([2, 5, 5, 9]) et croissante([1, 4, 3, 8]) ?\nb) Combien de comparaisons fait-elle, au plus, sur une liste de $n$ éléments ?\nc) On pose $u_n = 10n - n^2$. Que renvoie croissante([10*n - n**2 for n in range(6)]) ? La suite $(u_n)$ est-elle croissante ?",
          correction:
            "a) La fonction compare chaque élément au suivant. Elle renvoie False dès qu'elle trouve une descente.\n[2, 5, 5, 9] : $5 < 2$, $5 < 5$ et $9 < 5$ sont faux. La boucle va au bout : True.\n[1, 4, 3, 8] : à i = $1$, $3 < 4$ est vrai : False, sans regarder la suite.\nb) i va de $0$ à $n - 2$ : $n - 1$ comparaisons au plus.\nc) La liste vaut [0, 9, 16, 21, 24, 25] : elle monte, la fonction renvoie True.\nMais $u_6 = 60 - 36 = 24 < u_5 = 25$ : la suite n'est PAS croissante.\n$u_{n+1} - u_n = 9 - 2n$, négatif dès $n \\geqslant 5$ : la suite décroît à partir du rang $5$.\n⛔ Le piège : un programme ne regarde qu'un nombre FINI de termes. Il peut réfuter (« False »), jamais démontrer une propriété de toute la suite.\n⚠️ « return False » est DANS la boucle : la fonction s'arrête au premier False. « return True » est APRÈS la boucle.\n⭐ Sur le dessin : les valeurs montent jusqu'à $25$, puis redescendent à $24$.",
          schema: ecranSeulement(tableau(["n", "0", "1", "2", "3", "4", "5", "6"], ["u(n)", 0, 9, 16, 21, 24, 25, 24])),
          micros: ["python_lire_algorithme", "python_variable_boucle"],
        },
        {
          enonce:
            "La fonction mc tire N points au hasard dans le carré $[0 ; 1] \\times [0 ; 1]$.\na) Quand le compteur c augmente-t-il ? Le dire avec la courbe de $y = x^2$.\nb) Vers quel nombre mc(N) se rapproche-t-il quand N est grand ? Le calculer par une intégrale.",
          figure: programme(["from random import random", "", "def mc(N):", "    c = 0", "    for k in range(N):", "        x = random()", "        y = random()", "        if y < x**2:", "            c = c + 1", "    return c / N"]),
          correction:
            "a) Le point de coordonnées (x ; y) est pris au hasard dans le carré. c augmente quand $y < x^2$, c'est-à-dire quand le point tombe SOUS la parabole.\nb) mc(N) est la fréquence des points sous la parabole. Pour N grand, elle se rapproche de la probabilité de tomber sous la courbe.\nLe carré a une aire de $1$ : cette probabilité est l'aire sous la courbe.\n$\\displaystyle\\int_0^1 x^2\\,\\mathrm{d}x = \\left[\\dfrac{x^3}{3}\\right]_0^1 = \\dfrac{1}{3}$.\nmc(N) se rapproche de $\\dfrac{1}{3} \\approx 0{,}333$.\n⚠️ Deux appels de mc(1000) ne renvoient pas le même nombre : c'est une fréquence, qui fluctue autour de $\\dfrac{1}{3}$.\n⭐ Sur le dessin : la parabole coupe le carré gris en deux ; la partie sous la courbe occupe un tiers du carré.",
          schema: ecranSeulement(repere([-1, 2, -1, 2], [{ q: [1, 0, 0] }, { pts: [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]], couleur: GRIS }])),
          micros: ["python_simulation_proba"],
        },
        {
          enonce:
            "On exécute « n = 0 », « s = 0 », puis « while s <= 3: » suivi, en retrait, des deux lignes « n = n + 1 » et « s = s + 1 / n ». On affiche enfin n.\na) Que vaut s à la fin de chaque tour ?\nb) Qu'affiche le programme ?\nc) Avec « while s <= 10: », le programme s'arrête-t-il ?",
          correction:
            "a) Au tour $n$, on ajoute $\\dfrac{1}{n}$ : s vaut $H_n = 1 + \\dfrac{1}{2} + \\cdots + \\dfrac{1}{n}$.\nb) On calcule : $H_{10} \\approx 2{,}929$, encore $\\leqslant 3$, puis $H_{11} \\approx 3{,}020$.\nLa boucle s'arrête au premier $n$ tel que $H_n > 3$ : le programme affiche $11$.\nc) Oui. On admet que $H_n \\to +\\infty$ : la somme dépasse n'importe quel nombre. Mais il faut attendre $n = 12\\,367$ pour dépasser $10$.\n⚠️ Le terme ajouté $\\dfrac{1}{n}$ tend vers $0$, et pourtant la somme tend vers $+\\infty$. Des termes qui tendent vers $0$ ne suffisent pas à faire une somme finie.\n⭐ Sur le dessin : les points $H_n$ montent de moins en moins vite, mais le onzième passe au-dessus de la droite $y = 3$.",
          schema: ecranSeulement(repere([-1, 12, -1, 4], [], termes(1, [1, 1.5, 1.83, 2.08, 2.28, 2.45, 2.59, 2.72, 2.83, 2.93, 3.02]), 3, true)),
          micros: ["python_seuil", "python_variable_boucle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Un programme au service d'un chapitre : on le lit, on l'exécute à la main, puis on justifie par le cours.",
      rappel: [
        "Dichotomie : si $f$ est continue et change de signe sur $[a ; b]$, on coupe l'intervalle en deux et on garde la moitié où $f$ change de signe. Après $k$ tours, la longueur est divisée par $2^k$.",
        "Rectangles : avec $n$ rectangles de largeur $h = \\dfrac{b - a}{n}$, la somme des aires approche $\\displaystyle\\int_a^b f(x)\\,\\mathrm{d}x$. Si $f$ est croissante, les rectangles à gauche sont en dessous, ceux à droite au-dessus.",
        "Euler pour $y' = F(y)$ : on avance à petits pas $h$ en suivant la tangente, $y_{k+1} = y_k + h \\times F(y_k)$.",
        "Moyenne $M$ de $N$ copies indépendantes de $X$ : $E(M) = E(X)$, $V(M) = \\dfrac{V(X)}{N}$. Bienaymé-Tchebychev : $P(|M - E(X)| \\geqslant \\delta) \\leqslant \\dfrac{V(M)}{\\delta^2}$.",
      ],
      exercices: [
        {
          enonce:
            "Après une prise de médicament, la concentration dans le sang (en mg/L) au bout de $t$ heures est modélisée par $C(t) = 10t\\mathrm{e}^{-t}$. Le médicament est efficace tant que $C(t) \\geqslant 2$.\na) Étudier les variations de $C$ sur $[1 ; 5]$, et montrer que $C(t) = 2$ a une unique solution $\\alpha$ dans cet intervalle.\nb) Faire la trace de dicho(1, 5, 0.5). Que renvoie cet appel ? Interpréter.\nc) Combien de tours faut-il pour dicho(1, 5, 0.001) ?",
          figure: programme(["from math import exp", "", "def C(t):", "    return 10 * t * exp(-t)", "", "def dicho(a, b, e):", "    while b - a > e:", "        m = (a + b) / 2", "        if C(m) > 2:", "            a = m", "        else:", "            b = m", "    return a, b"]),
          correction:
            "a) $C'(t) = 10\\mathrm{e}^{-t} - 10t\\mathrm{e}^{-t}$ $= 10(1 - t)\\mathrm{e}^{-t}$, négatif pour $t > 1$ : $C$ est strictement décroissante sur $[1 ; 5]$.\n$C(1) = 10\\mathrm{e}^{-1} \\approx 3{,}68$ et $C(5) = 50\\mathrm{e}^{-5} \\approx 0{,}34$. $C$ est continue, et $2$ est entre ces deux valeurs.\nD'après le théorème des valeurs intermédiaires (cas strictement monotone), $C(t) = 2$ a une unique solution $\\alpha$ dans $[1 ; 5]$.\nb) Départ : a = $1$, b = $5$.\nm = $3$ : $C(3) \\approx 1{,}49 < 2$, donc b = $3$.\nm = $2$ : $C(2) \\approx 2{,}71 > 2$, donc a = $2$.\nm = $2{,}5$ : $C(2{,}5) \\approx 2{,}05 > 2$, donc a = $2{,}5$.\nb − a vaut $0{,}5$, qui n'est pas $> 0{,}5$ : la boucle s'arrête. L'appel renvoie (2.5, 3.0).\nDonc $2{,}5 \\leqslant \\alpha \\leqslant 3$ : le médicament cesse d'être efficace entre $2$ h $30$ et $3$ h après la prise.\nc) Après $k$ tours, la longueur vaut $\\dfrac{4}{2^k}$. Il faut $\\dfrac{4}{2^k} \\leqslant 0{,}001$, soit $2^k \\geqslant 4\\,000$.\n$2^{11} = 2\\,048$ et $2^{12} = 4\\,096$ : il faut $12$ tours.\n⚠️ Le test « C(m) > 2 : a = m » vient de ce que $C$ est DÉCROISSANTE : si $C(m) > 2$, la solution est à droite de m. Pour une fonction croissante, on échangerait a et b.\n⭐ Sur le dessin : la trace. Chaque ligne coupe l'intervalle en deux ; la dernière encadre $\\alpha$ entre $2{,}5$ et $3$.",
          schema: ecranSeulement(trace(["m", "C(m)", "a", "b"], [["—", "—", 1, 5], [3, "1.49", 1, 3], [2, "2.71", 2, 3], [2.5, "2.05", 2.5, 3]])),
          micros: ["python_lire_algorithme", "python_variable_boucle"],
        },
        {
          enonce:
            "Un robot démarre. Sa vitesse, en m/s, au bout de $t$ secondes, est $v(t) = t^2$. La distance parcourue entre $0$ et $2$ s est $\\displaystyle\\int_0^2 t^2\\,\\mathrm{d}t$.\na) Que renvoie rect(0, 2, 4) ? Faire le calcul à la main.\nb) Quelle ligne modifier pour placer les rectangles à droite ? Que renvoie alors l'appel ?\nc) Calculer la distance exacte, et vérifier l'encadrement.\nd) Quelle valeur de n garantit un encadrement d'amplitude $0{,}01$ ?",
          figure: programme(["def f(t):", "    return t**2", "", "def rect(a, b, n):", "    h = (b - a) / n", "    s = 0", "    for k in range(n):", "        s = s + f(a + k * h)", "    return s * h"]),
          correction:
            "a) h = $\\dfrac{2 - 0}{4} = 0{,}5$. k va de $0$ à $3$ : on prend f aux points $0$ ; $0{,}5$ ; $1$ ; $1{,}5$, c'est-à-dire aux bords GAUCHES.\ns = $0 + 0{,}25 + 1 + 2{,}25 = 3{,}5$, et l'appel renvoie $3{,}5 \\times 0{,}5 = 1{,}75$.\nb) On remplace « f(a + k * h) » par « f(a + (k + 1) * h) » : les bords droits $0{,}5$ ; $1$ ; $1{,}5$ ; $2$.\ns = $0{,}25 + 1 + 2{,}25 + 4 = 7{,}5$, et l'appel renvoie $3{,}75$.\nc) $\\displaystyle\\int_0^2 t^2\\,\\mathrm{d}t = \\left[\\dfrac{t^3}{3}\\right]_0^2 = \\dfrac{8}{3} \\approx 2{,}667$ m.\n$v$ est croissante sur $[0 ; 2]$ : les rectangles à gauche sont sous la courbe, ceux à droite au-dessus. On a bien $1{,}75 \\leqslant \\dfrac{8}{3} \\leqslant 3{,}75$.\nd) Les deux sommes diffèrent de $h \\times (v(2) - v(0)) = \\dfrac{2}{n} \\times 4 = \\dfrac{8}{n}$.\n$\\dfrac{8}{n} \\leqslant 0{,}01$ donne $n \\geqslant 800$.\n⚠️ Avec $4$ rectangles, l'écart est énorme ($2$ m). L'encadrement devient précis quand $n$ grandit, parce que l'écart est divisé par $n$.\n⭐ Sur le dessin : l'escalier orange des rectangles à gauche reste sous la parabole ; son aire, $1{,}75$, est trop petite.",
          schema: ecranSeulement(
            repere([-1, 3, -1, 5], [{ q: [1, 0, 0] }, { pts: [[0, 0], [0.5, 0], [0.5, 0.25], [1, 0.25], [1, 1], [1.5, 1], [1.5, 2.25], [2, 2.25], [2, 0]], couleur: ORANGE }]),
          ),
          micros: ["python_variable_boucle", "python_lire_algorithme"],
        },
        {
          enonce:
            "On charge un condensateur. La tension $u$ (en volts) à ses bornes vérifie $u' = 4 - 2u$ et $u(0) = 0$, le temps $t$ étant en secondes.\na) Vérifier que $u(t) = 2 - 2\\mathrm{e}^{-2t}$ est la solution.\nb) Faire la trace de euler(0.25, 1). Comparer à la valeur exacte $u(1)$.\nc) Montrer que, pour $h = 0{,}25$, la méthode calcule $y_{k+1} = 0{,}5y_k + 1$. Vers quoi tendent ces valeurs ?",
          figure: programme(["def euler(h, T):", "    t = 0", "    u = 0", "    while t < T:", "        u = u + h*(4 - 2*u)", "        t = t + h", "    return u"]),
          correction:
            "a) $u'(t) = 4\\mathrm{e}^{-2t}$, et $4 - 2u(t) = 4 - 4 + 4\\mathrm{e}^{-2t} = 4\\mathrm{e}^{-2t}$ : l'équation est vérifiée.\nEt $u(0) = 2 - 2 = 0$. D'après le cours, c'est l'unique solution.\nb) Chaque tour avance de $0{,}25$ s en suivant la tangente : u reçoit u + $0{,}25 \\times (4 - 2u)$.\n$t = 0{,}25$ : $0 + 0{,}25 \\times 4 = 1$.\n$t = 0{,}5$ : $1 + 0{,}25 \\times 2 = 1{,}5$.\n$t = 0{,}75$ : $1{,}5 + 0{,}25 \\times 1 = 1{,}75$.\n$t = 1$ : $1{,}75 + 0{,}25 \\times 0{,}5 = 1{,}875$. L'appel renvoie $1{,}875$.\nValeur exacte : $u(1) = 2 - 2\\mathrm{e}^{-2} \\approx 1{,}729$. L'erreur vaut environ $0{,}15$ V.\nc) $y_{k+1} = y_k + 0{,}25(4 - 2y_k) = 0{,}5y_k + 1$. C'est une suite arithmético-géométrique, de point fixe $\\ell = 0{,}5\\ell + 1$, soit $\\ell = 2$.\nComme $-1 < 0{,}5 < 1$, les valeurs tendent vers $2$ : la même limite que $u(t)$ quand $t \\to +\\infty$.\n⛔ Le piège des nombres à virgule : avec h = $0{,}1$, Python ne stocke pas $0{,}1$ exactement. Après dix pas, t vaut $0{,}9999\\ldots < 1$, et la boucle fait un ONZIÈME tour.\n⭐ Sur le dessin : la ligne brisée orange d'Euler part de l'origine avec la pente $4$ et passe AU-DESSUS de la courbe bleue.",
          schema: ecranSeulement(
            repere(
              [-1, 2, -1, 3],
              [
                { pts: echantillon((t) => 2 - 2 * Math.exp(-2 * t), 0, 2) },
                { pts: [[0, 0], [0.25, 1], [0.5, 1.5], [0.75, 1.75], [1, 1.875]], couleur: ORANGE },
              ],
              [],
              2,
            ),
          ),
          micros: ["python_suite"],
        },
        {
          enonce:
            "Un retraité place $20\\,000$ €. Chaque année, le capital rapporte $2$ %, puis il retire $2\\,000$ €. On exécute « C = 20000 », « n = 0 », puis « while C > 0: » suivi, en retrait, de « C = 1.02 * C - 2000 » et « n = n + 1 ». On affiche enfin n.\na) On note $C_n$ le capital après $n$ années. Justifier que $C_{n+1} = 1{,}02C_n - 2\\,000$.\nb) On pose $v_n = C_n - 100\\,000$. Montrer que $(v_n)$ est géométrique ; en déduire $C_n$.\nc) Déterminer, avec ln, ce qu'affiche le programme. Interpréter.",
          correction:
            "a) Rapporter $2$ %, c'est multiplier par $1{,}02$. Puis on retire $2\\,000$ € : $C_{n+1} = 1{,}02C_n - 2\\,000$.\nb) $v_{n+1} = 1{,}02C_n - 2\\,000 - 100\\,000$, soit $v_{n+1} = 1{,}02C_n - 102\\,000$.\nOn factorise : $v_{n+1} = 1{,}02(C_n - 100\\,000) = 1{,}02v_n$.\n$(v_n)$ est géométrique de raison $1{,}02$, avec $v_0 = -80\\,000$. Donc $C_n = 100\\,000 - 80\\,000 \\times 1{,}02^n$.\nc) La boucle s'arrête au premier $n$ tel que $C_n \\leqslant 0$, soit $1{,}02^n \\geqslant 1{,}25$.\nln est croissante, et $\\ln(1{,}02) > 0$ : $n \\geqslant \\dfrac{\\ln(1{,}25)}{\\ln(1{,}02)} \\approx 11{,}27$.\nLe programme affiche $12$.\nOn peut faire $11$ retraits complets ; la douzième année, le capital ne suffit plus : $C_{11} \\approx 530$ €, puis $C_{12} \\approx -1\\,459$ €.\n⚠️ Ici $\\ln(1{,}02) > 0$ : l'inégalité garde son sens. Avec une raison entre $0$ et $1$, elle changerait de sens.\n⭐ Sur le dessin : le capital fond de plus en plus vite, parce que les intérêts diminuent avec lui.",
          schema: ecranSeulement(tableau(["n", "0", "5", "10", "11", "12"], ["C(n)", "20000", "11674", "2480", "530", "−1459"])),
          micros: ["python_suite", "python_seuil"],
        },
        {
          enonce:
            "On lance deux dés équilibrés et on note $S$ la somme. $X$ est le résultat d'un dé : $E(X) = 3{,}5$ et $V(X) = \\dfrac{35}{12}$.\na) Que renvoie moyenne(N) ?\nb) Calculer $E(S)$ et $V(S)$.\nc) On note $M$ la valeur renvoyée par moyenne(1000). Donner $E(M)$ et $V(M)$, puis majorer $P(|M - 7| \\geqslant 0{,}5)$.",
          figure: programme(["from random import randint", "", "def moyenne(N):", "    t = 0", "    for k in range(N):", "        a = randint(1, 6)", "        b = randint(1, 6)", "        t = t + a + b", "    return t / N"]),
          correction:
            "a) Chaque tour lance deux dés et ajoute leur somme à t. moyenne(N) renvoie la moyenne de $N$ sommes de deux dés.\nb) $S = X_1 + X_2$ : $E(S) = 3{,}5 + 3{,}5 = 7$.\nLes deux dés sont INDÉPENDANTS : les variances s'ajoutent. $V(S) = \\dfrac{35}{12} + \\dfrac{35}{12} = \\dfrac{35}{6}$.\nc) $M$ est la moyenne de $1\\,000$ copies indépendantes de $S$ : $E(M) = 7$ et $V(M) = \\dfrac{35}{6\\,000}$.\nBienaymé-Tchebychev : $P(|M - 7| \\geqslant 0{,}5)$ $\\leqslant \\dfrac{35}{6\\,000 \\times 0{,}25} = \\dfrac{35}{1\\,500} \\approx 0{,}023$.\nMoins de $2{,}4$ % des appels s'écartent de $7$ d'au moins $0{,}5$.\n⛔ Le piège : remplacer « a + b » par « 2 * a ». La moyenne ne change pas, mais $V(2X) = 4V(X) = \\dfrac{35}{3}$ : deux fois plus que $V(S)$. Lancer deux dés, ce n'est pas doubler un dé.\n⭐ Sur le dessin : pour chaque somme, le nombre de cas sur $36$. La loi de $S$ est en triangle ; la plus haute barre est $7$, avec $6$ cas, soit $\\dfrac{6}{36} \\approx 0{,}167$.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "2", value: 1 },
              { label: "3", value: 2 },
              { label: "4", value: 3 },
              { label: "5", value: 4 },
              { label: "6", value: 5 },
              { label: "7", value: 6 },
              { label: "8", value: 5 },
              { label: "9", value: 4 },
              { label: "10", value: 3 },
              { label: "11", value: 2 },
              { label: "12", value: 1 },
            ]),
          ),
          micros: ["python_simulation_proba"],
        },
        {
          enonce:
            "Une puce part de $0$ sur une droite graduée. Chaque seconde, elle saute de $+1$ ou de $-1$, avec la même probabilité, indépendamment. On simule $10$ sauts : « x = 0 », puis « for k in range(10): » suivi, en retrait, de « if random() < 0.5: x = x + 1 » et « else: x = x - 1 ». On affiche enfin x.\na) Quelles valeurs le programme peut-il afficher ?\nb) On note $D$ le nombre de sauts vers la droite. Donner la loi de $D$, et exprimer x en fonction de $D$.\nc) Calculer la probabilité que la puce revienne en $0$.\nd) Calculer l'espérance et la variance de la position finale.",
          correction:
            "a) Avec $D$ sauts à droite et $10 - D$ à gauche, x vaut $D - (10 - D) = 2D - 10$.\nC'est un nombre PAIR entre $-10$ et $10$ : $-10$, $-8$, …, $8$, $10$.\nb) Dix sauts indépendants, chacun « à droite » avec la probabilité $0{,}5$ : $D$ suit $\\mathcal{B}(10 ; 0{,}5)$.\nc) x = $0$ équivaut à $D = 5$. $P(D = 5) = \\dbinom{10}{5} \\times 0{,}5^{10} = \\dfrac{252}{1\\,024} \\approx 0{,}246$.\nd) $E(D) = 5$ et $V(D) = 10 \\times 0{,}5 \\times 0{,}5 = 2{,}5$.\nx = $2D - 10$ : $E(x) = 2 \\times 5 - 10 = 0$, et $V(x) = 2^2 \\times 2{,}5 = 10$.\n⚠️ $V(2D - 10) = 4V(D)$ : on multiplie la variance par le CARRÉ de $2$, et le $-10$ ne change rien.\n⚠️ Revenir en $0$ est l'issue la plus probable, et pourtant elle n'arrive qu'une fois sur quatre environ.\n⭐ Sur le dessin : pour chaque position finale, le nombre de chemins sur $1\\,024$. La loi est symétrique autour de $0$, et les positions impaires n'ont pas de barre.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "−10", value: 1 },
              { label: "−8", value: 10 },
              { label: "−6", value: 45 },
              { label: "−4", value: 120 },
              { label: "−2", value: 210 },
              { label: "0", value: 252 },
              { label: "2", value: 210 },
              { label: "4", value: 120 },
              { label: "6", value: 45 },
              { label: "8", value: 10 },
              { label: "10", value: 1 },
            ]),
          ),
          micros: ["python_simulation_proba"],
        },
        {
          enonce:
            "À un jeu, on lance un dé équilibré jusqu'à obtenir un $6$. La fonction attente simule une partie.\na) Que renvoie attente() ?\nb) On note $N$ ce nombre. Justifier que $P(N > n) = \\left(\\dfrac{5}{6}\\right)^n$.\nc) Trouver, avec ln, le plus petit $n$ tel que $P(N > n) < 0{,}01$. Interpréter.\nd) Un élève écrit « d = randint(1, 6) » avant la boucle, puis « while d != 6: ». Que se passe-t-il ?",
          figure: programme(["from random import randint", "", "def attente():", "    n = 1", "    while randint(1, 6) != 6:", "        n = n + 1", "    return n"]),
          correction:
            "a) Chaque test du while lance un NOUVEAU dé. Tant que ce n'est pas un $6$, n augmente. attente() renvoie le rang du premier $6$.\nb) $N > n$ signifie : aucun $6$ lors des $n$ premiers lancers. Les lancers sont indépendants, chacun sans $6$ avec la probabilité $\\dfrac{5}{6}$.\nDonc $P(N > n) = \\left(\\dfrac{5}{6}\\right)^n$.\nc) $\\left(\\dfrac{5}{6}\\right)^n < 0{,}01$ équivaut à $n\\ln\\left(\\dfrac{5}{6}\\right) < \\ln(0{,}01)$.\n$\\ln\\left(\\dfrac{5}{6}\\right) < 0$ : on divise et on retourne l'inégalité. $n > \\dfrac{\\ln(0{,}01)}{\\ln(5/6)} \\approx 25{,}26$.\nLe plus petit entier est $n = 26$ : dans plus de $99$ % des parties, le $6$ sort en $26$ lancers au plus.\nd) Le dé n'est lancé qu'une fois. Si d ne vaut pas $6$, d ne change plus : la condition reste vraie, la boucle ne s'arrête JAMAIS.\n⛔ Le piège de d) : une boucle while doit modifier ce qu'elle teste.\n⚠️ En c), $\\ln\\left(\\dfrac{5}{6}\\right)$ est négatif : l'inégalité change de sens.\n⭐ Sur le dessin : les points $P(N > n)$ descendent de $1$ vers $0$, divisés par $1{,}2$ à chaque lancer.",
          schema: ecranSeulement(repere([-1, 9, -1, 2], [], termes(0, [1, 0.83, 0.69, 0.58, 0.48, 0.4, 0.33, 0.28, 0.23]))),
          micros: ["python_simulation_proba", "python_seuil"],
        },
        {
          enonce:
            "On place $1$ € à un taux annuel de $100$ %, avec des intérêts composés $n$ fois par an : au bout d'un an, on a $\\left(1 + \\dfrac{1}{n}\\right)^n$ €.\na) Calculer ce capital pour $n = 1$, $n = 2$ et $n = 12$.\nb) On exécute « s = 1 », « f = 1 », puis « for k in range(1, 9): » suivi, en retrait, de « f = f * k » et « s = s + 1 / f ». Que contient f à la fin du tour k ? Que calcule s ?\nc) On admet que les deux méthodes approchent $\\mathrm{e}$. Laquelle est la plus rapide ?",
          correction:
            "a) $n = 1$ : $2$ €. $n = 2$ : $1{,}5^2 = 2{,}25$ €. $n = 12$ : $\\left(\\dfrac{13}{12}\\right)^{12} \\approx 2{,}613$ €.\nb) f est multiplié par k à chaque tour : à la fin du tour k, f vaut $k!$.\ns vaut $1 + \\dfrac{1}{1!} + \\dfrac{1}{2!} + \\cdots + \\dfrac{1}{8!} \\approx 2{,}718279$.\nc) Avec $n = 365$ : $\\left(1 + \\dfrac{1}{365}\\right)^{365} \\approx 2{,}7146$, encore à $0{,}004$ de $\\mathrm{e} \\approx 2{,}718282$.\nLa somme s, avec seulement $8$ tours, est à $3 \\times 10^{-6}$ de $\\mathrm{e}$ : elle est bien plus rapide.\n⚠️ On ne recalcule pas $k!$ à chaque tour : on garde f et on le multiplie par k. C'est le même geste que pour une suite, $u_k = k \\times u_{k-1}$.\n⭐ Pourquoi $\\mathrm{e}$ ? $\\ln\\left(\\left(1 + \\dfrac{1}{n}\\right)^n\\right) = n\\ln\\left(1 + \\dfrac{1}{n}\\right)$, qui tend vers $1$ : c'est la limite de $\\dfrac{\\ln(1 + x)}{x}$ en $0$.\n⭐ Sur le dessin : le capital monte avec n, mais de moins en moins : il plafonne sous $\\mathrm{e}$.",
          schema: ecranSeulement(tableau(["n", "1", "2", "12", "365"], ["capital", 2, 2.25, 2.613, 2.7146])),
          micros: ["python_suite", "python_variable_boucle"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac : le cours démontre, le programme calcule, et les deux doivent être d'accord.",
      rappel: [
        "Un programme ne DÉMONTRE rien : il calcule des valeurs, confirme une conjecture ou trouve un seuil. La preuve vient du cours.",
        "Avant de lancer une boucle while, s'assurer qu'elle s'arrête : la condition doit finir par devenir fausse.",
        "Pour une variable aléatoire de loi binomiale, « comb(n, k) » (module math) donne $\\dbinom{n}{k}$.",
      ],
      exercices: [
        {
          titre: "Le café qui refroidit",
          enonce:
            "Un café est servi à $90$ °C dans une pièce à $20$ °C. Sa température $T$ (en °C) au bout de $t$ minutes vérifie $T' = -0{,}1(T - 20)$ et $T(0) = 90$. On le boit quand il passe sous $40$ °C.\na) Vérifier que $T(t) = 20 + 70\\mathrm{e}^{-0{,}1t}$ est la solution.\nb) Le programme applique la méthode d'Euler de pas h. Montrer que, pour h = $1$, il calcule $T_{k+1} = 0{,}9T_k + 2$, puis que $T_k = 20 + 70 \\times 0{,}9^k$.\nc) Qu'affiche le programme pour h = $1$ ?\nd) Déterminer le temps exact où $T$ passe sous $40$ °C. Pourquoi Euler annonce-t-il un café buvable trop tôt ?\ne) Qu'affiche le programme pour h = $0{,}5$ ?",
          figure: programme(["t = 0", "T = 90", "h = 1", "while T >= 40:", "    T = T + h * (2 - 0.1 * T)", "    t = t + h", "print(t)"]),
          correction:
            "a) $T'(t) = -7\\mathrm{e}^{-0{,}1t}$, et $-0{,}1(T - 20) = -0{,}1 \\times 70\\mathrm{e}^{-0{,}1t}$ $= -7\\mathrm{e}^{-0{,}1t}$. Et $T(0) = 20 + 70 = 90$.\nb) $2 - 0{,}1T = -0{,}1(T - 20)$ : la ligne est bien un pas d'Euler. Avec h = $1$, $T_{k+1} = T_k + 2 - 0{,}1T_k = 0{,}9T_k + 2$.\nOn pose $w_k = T_k - 20$ : $w_{k+1} = 0{,}9T_k - 18 = 0{,}9w_k$, géométrique de raison $0{,}9$ et $w_0 = 70$.\nDonc $T_k = 20 + 70 \\times 0{,}9^k$.\nc) La boucle s'arrête au premier $k$ tel que $T_k < 40$, soit $0{,}9^k < \\dfrac{2}{7}$.\n$\\ln(0{,}9) < 0$ : $k > \\dfrac{\\ln(2/7)}{\\ln(0{,}9)} \\approx 11{,}89$. Le programme affiche $12$.\nd) $20 + 70\\mathrm{e}^{-0{,}1t} < 40$ équivaut à $\\mathrm{e}^{-0{,}1t} < \\dfrac{2}{7}$, soit $-0{,}1t < \\ln\\left(\\dfrac{2}{7}\\right)$.\nDonc $t > 10\\ln(3{,}5) \\approx 12{,}53$ min.\nLa courbe de $T$ est convexe ($T'' = 0{,}7\\mathrm{e}^{-0{,}1t} > 0$) : elle est au-dessus de ses tangentes. Euler, qui suit les tangentes, descend plus vite que la vraie température.\ne) Avec h = $0{,}5$ : $T_k = 20 + 70 \\times 0{,}95^k$, sous $40$ dès que $k > \\dfrac{\\ln(2/7)}{\\ln(0{,}95)} \\approx 24{,}42$.\nDonc $k = 25$ pas de $0{,}5$ min : le programme affiche $12{,}5$, plus près de $12{,}53$.\n⚠️ Le programme affiche un TEMPS, $t = k \\times h$, pas un nombre de pas : pour h = $0{,}5$, $25$ pas font $12{,}5$ min.\n⭐ Sur le dessin (une graduation = $5$ min et $10$ °C) : les points d'Euler sont sous la courbe bleue ; ils passent la droite des $40$ °C avant elle.",
          schema: ecranSeulement(
            repere(
              [-1, 6, -1, 10],
              [{ pts: echantillon((x) => 2 + 7 * Math.exp(-0.5 * x), 0, 6) }],
              termes(0, [9, 6.13, 4.44, 3.44, 2.85, 2.5]),
              [4, 2],
              true,
            ),
          ),
          micros: ["python_defi", "python_suite", "python_seuil"],
        },
        {
          titre: "Le contrôle qualité",
          enonce:
            "Une machine produit des pièces dont $5$ % sont défectueuses. On prélève un lot de $50$ pièces ; la production est assez grande pour assimiler le prélèvement à des tirages avec remise. $X$ est le nombre de pièces défectueuses du lot.\na) Quelle est la loi de $X$ ? Que renvoie P(k) ? Calculer P(0).\nb) Que renvoie seuil() ? On donne $P(X \\leqslant 4) \\approx 0{,}896$ et $P(X \\leqslant 5) \\approx 0{,}962$.\nc) Règle de l'usine : si un lot contient plus de seuil() pièces défectueuses, on arrête la machine. Quelle est la probabilité d'arrêter à tort une machine qui fonctionne bien ?\nd) Calculer $E(X)$ et l'écart type de $X$.",
          figure: programme(["from math import comb", "", "def P(k):", "    a = comb(50, k)", "    b = 0.05**k", "    c = 0.95**(50 - k)", "    return a * b * c", "", "def seuil():", "    k = 0", "    s = P(0)", "    while s < 0.95:", "        k = k + 1", "        s = s + P(k)", "    return k"]),
          correction:
            "a) $50$ épreuves identiques et indépendantes, chacune « défectueuse » avec la probabilité $0{,}05$ : $X$ suit $\\mathcal{B}(50 ; 0{,}05)$.\nP(k) renvoie $\\dbinom{50}{k} \\times 0{,}05^k \\times 0{,}95^{50-k}$, c'est-à-dire $P(X = k)$.\nP(0) = $0{,}95^{50} \\approx 0{,}077$.\nb) s cumule $P(X = 0) + \\cdots + P(X = k)$, c'est-à-dire $P(X \\leqslant k)$. La boucle s'arrête au premier $k$ tel que $P(X \\leqslant k) \\geqslant 0{,}95$.\n$P(X \\leqslant 4) \\approx 0{,}896 < 0{,}95$ et $P(X \\leqslant 5) \\approx 0{,}962$ : seuil() renvoie $5$.\nc) On arrête la machine si $X \\geqslant 6$. Pour une machine qui fonctionne bien : $P(X \\geqslant 6) = 1 - P(X \\leqslant 5) \\approx 0{,}038$.\nEnviron $3{,}8$ % des lots feraient arrêter la machine à tort.\nd) $E(X) = 50 \\times 0{,}05 = 2{,}5$, et $\\sigma(X) = \\sqrt{50 \\times 0{,}05 \\times 0{,}95} \\approx 1{,}54$.\n⚠️ $P(X \\geqslant 6) = 1 - P(X \\leqslant 5)$, et non $1 - P(X \\leqslant 6)$ : le contraire de « au moins $6$ » est « au plus $5$ ».\n⚠️ La boucle s'arrête toujours : $P(X \\leqslant 50) = 1 \\geqslant 0{,}95$.\n⭐ Sur le dessin : la loi de $X$, en probabilités pour $1\\,000$ (la barre $2$ vaut $261$, soit $0{,}261$). Presque toute la probabilité est entre $0$ et $5$ ; les barres $6$ et $7$ sont minuscules.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "0", value: 77 },
              { label: "1", value: 202 },
              { label: "2", value: 261 },
              { label: "3", value: 220 },
              { label: "4", value: 136 },
              { label: "5", value: 66 },
              { label: "6", value: 26 },
              { label: "7", value: 9 },
            ]),
          ),
          micros: ["python_defi", "python_simulation_proba", "python_lire_algorithme"],
        },
        {
          titre: "Une aire sans primitive",
          enonce:
            "La section d'un canal a pour profil la courbe de $f(x) = \\mathrm{e}^{-x^2}$. On veut l'aire $I = \\displaystyle\\int_0^1 \\mathrm{e}^{-x^2}\\,\\mathrm{d}x$, mais on ne sait pas écrire de primitive de $f$ avec les fonctions usuelles.\na) Étudier les variations de $f$ sur $[0 ; 1]$.\nb) Que calculent g et d dans encadre(n) ? Justifier que $d \\leqslant I \\leqslant g$.\nc) Calculer encadre(4), à $10^{-3}$ près.\nd) Montrer que $g - d = \\dfrac{1 - \\mathrm{e}^{-1}}{n}$. Quelle valeur de n garantit une amplitude $\\leqslant 0{,}01$ ?",
          figure: programme(["from math import exp", "", "def f(x):", "    return exp(-x**2)", "", "def encadre(n):", "    h = 1 / n", "    g = 0", "    d = 0", "    for k in range(n):", "        g = g + h * f(k*h)", "        d = d + h * f(k*h + h)", "    return d, g"]),
          correction:
            "a) $f'(x) = -2x\\mathrm{e}^{-x^2}$, négatif sur $[0 ; 1]$ : $f$ est décroissante.\nb) g ajoute les aires des rectangles de hauteur $f$ au bord GAUCHE, d celles des rectangles de hauteur $f$ au bord DROIT.\n$f$ décroît : sur chaque bande, elle est sous sa valeur de gauche et au-dessus de sa valeur de droite. En sommant : $d \\leqslant I \\leqslant g$.\nc) h = $0{,}25$. g = $0{,}25 \\times (1 + \\mathrm{e}^{-1/16}$ $+\\, \\mathrm{e}^{-1/4} + \\mathrm{e}^{-9/16})$, soit g ≈ $0{,}822$.\nd s'obtient en remplaçant $f(0) = 1$ par $f(1) = \\mathrm{e}^{-1}$ : d ≈ $0{,}664$. L'appel renvoie environ (0.664, 0.822).\nd) Les deux sommes ont les mêmes termes, sauf le premier de g et le dernier de d : $g - d = h(f(0) - f(1)) = \\dfrac{1 - \\mathrm{e}^{-1}}{n}$.\n$\\dfrac{1 - \\mathrm{e}^{-1}}{n} \\leqslant 0{,}01$ donne $n \\geqslant 100(1 - \\mathrm{e}^{-1}) \\approx 63{,}2$ : n = $64$ suffit.\nencadre(64) renvoie environ (0.7419, 0.7517) : $I \\approx 0{,}747$.\n⚠️ Ici $f$ DÉCROÎT : ce sont les rectangles à gauche qui sont au-dessus. C'est l'inverse d'une fonction croissante.\n⭐ Sur le dessin : les rectangles à gauche (orange) dépassent de la courbe ; leur aire, $0{,}822$, majore $I$.",
          schema: ecranSeulement(
            repere(
              [-1, 2, -1, 2],
              [
                { pts: echantillon((x) => Math.exp(-x * x), -1, 2) },
                { pts: [[0, 0], [0, 1], [0.25, 1], [0.25, 0.939], [0.5, 0.939], [0.5, 0.779], [0.75, 0.779], [0.75, 0.57], [1, 0.57], [1, 0]], couleur: ORANGE },
              ],
            ),
          ),
          micros: ["python_defi", "python_variable_boucle", "python_lire_algorithme"],
        },
        {
          titre: "La rumeur au lycée",
          enonce:
            "Une rumeur circule dans un lycée. La proportion d'élèves qui la connaissent au bout de $n$ heures est modélisée par $p_0 = 0{,}01$ et $p_{n+1} = 1{,}5p_n - 0{,}5p_n^2$. On note $f(x) = 1{,}5x - 0{,}5x^2$.\na) Montrer que $f$ est croissante sur $[0 ; 1]$, et calculer $f(0)$ et $f(1)$.\nb) Montrer par récurrence que $0 < p_n \\leqslant p_{n+1} < 1$ pour tout $n$.\nc) En déduire que $(p_n)$ converge, et trouver sa limite.\nd) Que renvoient jour(0.5) et jour(0.99) ?\ne) Que se passe-t-il si l'on appelle jour(1) ?",
          figure: programme(["def jour(s):", "    n = 0", "    p = 0.01", "    while p < s:", "        p = 1.5*p - 0.5*p*p", "        n = n + 1", "    return n"]),
          correction:
            "a) $f'(x) = 1{,}5 - x > 0$ sur $[0 ; 1]$ : $f$ est croissante. $f(0) = 0$ et $f(1) = 1$.\nb) Initialisation : $p_0 = 0{,}01$ et $p_1 = 0{,}015 - 0{,}00005 = 0{,}01495$. On a $0 < p_0 \\leqslant p_1 < 1$.\nHérédité : si $0 < p_n \\leqslant p_{n+1} < 1$, on applique $f$, croissante sur $[0 ; 1]$ : $f(0) < f(p_n) \\leqslant f(p_{n+1}) < f(1)$.\nC'est $0 < p_{n+1} \\leqslant p_{n+2} < 1$. Les inégalités strictes restent strictes, car $f$ est STRICTEMENT croissante.\nc) $(p_n)$ est croissante et majorée par $1$ : elle converge vers un réel $\\ell$, avec $f(\\ell) = \\ell$ ($f$ est continue).\n$1{,}5\\ell - 0{,}5\\ell^2 = \\ell$ donne $0{,}5\\ell(1 - \\ell) = 0$ : $\\ell = 0$ ou $\\ell = 1$.\nLa suite croît à partir de $0{,}01$, donc $\\ell \\geqslant 0{,}01$ : $\\lim p_n = 1$. Tout le lycée finit par connaître la rumeur.\nd) jour(s) renvoie le premier $n$ tel que $p_n \\geqslant s$.\nOn calcule : $p_{10} \\approx 0{,}411$ et $p_{11} \\approx 0{,}532$ : jour(0.5) renvoie $11$.\nPuis $p_{18} \\approx 0{,}988$ et $p_{19} \\approx 0{,}994$ : jour(0.99) renvoie $19$.\ne) D'après b), $p_n < 1$ pour tout $n$ : la condition « p < 1 » reste toujours vraie, et la boucle ne s'arrête jamais.\n⛔ Le piège de e) : une suite qui TEND vers $1$ n'atteint pas forcément $1$. Une boucle de seuil demande un seuil strictement sous la limite.\n⚠️ En c), deux valeurs vérifient $f(\\ell) = \\ell$ : c'est la croissance de la suite qui élimine $0$.\n⭐ Sur le dessin : la courbe en S. La rumeur démarre lentement, s'emballe vers le rang $10$, puis plafonne sous la droite $y = 1$.",
          schema: ecranSeulement(
            repere([-1, 14, -1, 2], [], termes(0, [0.01, 0.015, 0.022, 0.033, 0.049, 0.073, 0.106, 0.154, 0.219, 0.305, 0.411, 0.532, 0.656, 0.769, 0.858]), 1, true),
          ),
          micros: ["python_defi", "python_suite", "python_seuil"],
        },
      ],
    },
  ],
};
