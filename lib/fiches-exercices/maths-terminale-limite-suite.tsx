// ─── Fiche d'exercices : les limites de suites (terminale spé) ────────────────
//                              20 exercices corrigés
//
// Première feuille de terminale spé (29/09/2026), écrite comme ÉTALON des dix-
// huit : une par notion du coach. Alignée sur `lib/tutor-v4/questionBank/
// terminale-spe/maths/limites-suites.bank.ts`, au niveau du bac.
//
// ⭐⭐ LE FIL : UNE LIMITE SE VOIT. Chaque corrigé dessine les termes en points,
// et leur limite en ligne horizontale ; les suites u(n+1) = f(u(n)) ont leur
// escalier (la « toile d'araignée ») entre la courbe de f et la droite y = x.
//
// ⛔ Pas de répétition de la feuille des suites de 1re spé : ici, on CALCULE des
// limites (formes indéterminées, comparaison, gendarmes, convergence monotone),
// et on démontre ce que le BO demande (inégalité de Bernoulli, donc q^n → +∞).
//
// Micro-compétences : limite_suite_interpreter (1, 10, 15, 17, 18, 19),
// limite_suite_calculer (2, 3, 6, 10, 18, 19), limite_suite_operations (4, 5,
// 6, 11, 12), limite_suite_comparaison (7, 8, 13, 14, 15, 20),
// limite_suite_monotone_bornee (9, 16, 17, 20), limite_suite_defi (17, 18, 19,
// 20). 6/6.
//
// Faits cités : aucun fait réel. Le lac, les truites et la balle sont des
// MODÈLES ; π²/6 (exercice 20) est un résultat mathématique (Euler).

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, programme, repere, tableau } from "@/lib/fiches-exercices/figures";

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

/** Le flocon de Koch à l'étape n : triangle équilatéral de côté 3 centré en O,
 *  sommets dans le sens direct ; chaque tiers du milieu est remplacé par une
 *  pointe tournée vers l'extérieur (rotation de −60°). Ligne brisée fermée. */
const koch = (n: number): [number, number][] => {
  const h = Math.sqrt(3);
  let pts: [number, number][] = [[0, h], [-1.5, -h / 2], [1.5, -h / 2], [0, h]];
  for (let e = 0; e < n; e++) {
    const suivant: [number, number][] = [pts[0]];
    for (let i = 0; i + 1 < pts.length; i++) {
      const [ax, ay] = pts[i];
      const [bx, by] = pts[i + 1];
      const [dx, dy] = [(bx - ax) / 3, (by - ay) / 3];
      const [c, s] = [0.5, -Math.sqrt(3) / 2];
      suivant.push([ax + dx, ay + dy], [ax + dx + dx * c - dy * s, ay + dy + dx * s + dy * c], [ax + 2 * dx, ay + 2 * dy], [bx, by]);
    }
    pts = suivant;
  }
  return pts.map(([x, y]) => [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]);
};

export const exercicesLimiteSuiteTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "limite-suite",
  titre: "Limites de suites",
  accroche:
    "Vingt exercices, de la lecture d'un graphique au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine les termes de la suite qui s'approchent de leur limite.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$\\lim u_n = \\ell$ : tout intervalle ouvert qui contient $\\ell$ contient TOUS les termes à partir d'un certain rang. $\\lim u_n = +\\infty$ : les termes dépassent n'importe quel nombre $A$ à partir d'un certain rang.",
        "À connaître : $n$, $n^2$, $n^3$, $\\sqrt{n}$ tendent vers $+\\infty$ ; leurs inverses tendent vers $0$. Et $q^n$ tend vers $0$ si $-1 < q < 1$, vers $+\\infty$ si $q > 1$ ; il n'a pas de limite si $q \\leqslant -1$.",
        "Formes indéterminées : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{\\infty}{\\infty}$ et $\\dfrac{0}{0}$. On les lève en factorisant par le terme qui domine.",
        "Comparaison : si $u_n \\geqslant v_n$ et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$. Gendarmes : si $v_n \\leqslant u_n \\leqslant w_n$, et si $v_n$ et $w_n$ tendent vers $\\ell$, alors $u_n \\to \\ell$.",
      ],
      exercices: [
        {
          enonce:
            "On a placé les premiers termes de la suite $u_n = 3 - \\dfrac{2}{n + 1}$.\na) Vers quel nombre semblent-ils se rapprocher ?\nb) À partir de quel rang a-t-on $2{,}9 < u_n < 3{,}1$ ?\nc) Même question pour $2{,}99 < u_n < 3{,}01$.",
          figure: repere([-1, 9, -1, 4], [], termes(0, [1, 2, 2.33, 2.5, 2.6, 2.67, 2.71, 2.75, 2.78]), 3),
          correction:
            "a) Les points montent et viennent se tasser sous la droite $y = 3$ : on conjecture que $\\lim u_n = 3$.\nb) On retire toujours un nombre positif à $3$, donc $u_n < 3 < 3{,}1$. Il reste à obtenir $u_n > 2{,}9$, c'est-à-dire $3 - u_n < 0{,}1$.\nOr $3 - u_n = \\dfrac{2}{n + 1}$. On résout $\\dfrac{2}{n + 1} < 0{,}1$, soit $n + 1 > 20$, donc $n > 19$.\nÀ partir du rang $20$, tous les termes sont dans l'intervalle.\nc) $\\dfrac{2}{n + 1} < 0{,}01$ donne $n + 1 > 200$, donc $n > 199$ : à partir du rang $200$.\n⭐ C'est le sens de « $u_n$ tend vers $3$ » : aussi petit que soit l'intervalle autour de $3$, les termes finissent TOUS par y entrer, et n'en sortent plus.\n⚠️ « Se rapprocher » ne suffit pas : les termes se rapprochent aussi de $4$ (leur distance à $4$ diminue), mais ils ne tendent pas vers $4$.",
          micros: ["limite_suite_interpreter"],
        },
        {
          enonce:
            "Donner la limite de chaque suite, définie pour $n \\geqslant 1$ :\na) $n^3$\nb) $\\dfrac{5}{\\sqrt{n}}$\nc) $-2n^2$\nd) $2 + \\dfrac{4}{n}$",
          correction:
            "a) $\\lim n^3 = +\\infty$ : c'est une limite de référence.\nb) $\\sqrt{n} \\to +\\infty$, donc $\\dfrac{1}{\\sqrt{n}} \\to 0$, et $\\dfrac{5}{\\sqrt{n}} = 5 \\times \\dfrac{1}{\\sqrt{n}} \\to 0$.\nc) $n^2 \\to +\\infty$ et on multiplie par $-2$, un nombre NÉGATIF : $-2n^2 \\to -\\infty$.\nd) $\\dfrac{4}{n} \\to 0$, donc $2 + \\dfrac{4}{n} \\to 2$.\n⚠️ En c), multiplier par un négatif retourne le signe de la limite : $+\\infty$ devient $-\\infty$.\n⭐ Sur le dessin (suite d) : les termes descendent vers la droite $y = 2$ sans jamais la toucher.",
          schema: ecranSeulement(repere([-1, 9, -1, 7], [], termes(1, [6, 4, 3.33, 3, 2.8, 2.67, 2.57, 2.5]), 2)),
          micros: ["limite_suite_calculer"],
        },
        {
          enonce: "Donner la limite, si elle existe :\na) $0{,}8^n$\nb) $1{,}05^n$\nc) $4 \\times (-0{,}5)^n$\nd) $(-2)^n$",
          correction:
            "On regarde où se trouve la raison $q$.\na) $-1 < 0{,}8 < 1$, donc $\\lim 0{,}8^n = 0$.\nb) $1{,}05 > 1$, donc $\\lim 1{,}05^n = +\\infty$.\nc) $-1 < -0{,}5 < 1$, donc $(-0{,}5)^n \\to 0$, et $4 \\times (-0{,}5)^n \\to 0$.\nd) $q = -2 \\leqslant -1$ : les termes valent $1$, $-2$, $4$, $-8$, $16$… Ils changent de signe à chaque rang et grandissent en valeur absolue : la suite n'a PAS de limite.\n⚠️ $(-2)^n$ ne tend pas vers $-\\infty$ : un terme sur deux est positif.\n⭐ Sur le dessin (suite c) : les termes sautent d'un côté à l'autre de l'axe, mais les sauts rétrécissent de moitié à chaque fois. Ils tendent vers $0$.",
          schema: ecranSeulement(repere([-1, 7, -3, 5], [], termes(0, [4, -2, 1, -0.5, 0.25, -0.125, 0.0625]))),
          micros: ["limite_suite_calculer"],
        },
        {
          enonce:
            "Déterminer la limite de chaque suite, pour $n \\geqslant 1$ :\na) $u_n = n^2 + 3n$\nb) $v_n = \\left(2 + \\dfrac{1}{n}\\right)\\left(5 - \\dfrac{3}{n^2}\\right)$\nc) $w_n = \\dfrac{3}{n^2 + 1}$",
          correction:
            "a) $n^2 \\to +\\infty$ et $3n \\to +\\infty$. Une somme de deux termes qui tendent vers $+\\infty$ tend vers $+\\infty$ : $\\lim u_n = +\\infty$.\nb) $2 + \\dfrac{1}{n} \\to 2$ et $5 - \\dfrac{3}{n^2} \\to 5$. Le produit tend vers $2 \\times 5 = 10$.\nc) $n^2 + 1 \\to +\\infty$, et $3$ divisé par un nombre qui grandit sans fin tend vers $0$ : $\\lim w_n = 0$.\n⚠️ En b), on multiplie les limites parce qu'elles sont FINIES. Un facteur qui tend vers $0$ et l'autre vers $+\\infty$ donneraient une forme indéterminée.\n⭐ Le tableau montre $v_n$ qui s'approche de $10$ : $10{,}437$, puis $10{,}049$, puis $10{,}005$.",
          schema: ecranSeulement(tableau(["n", "1", "10", "100", "1000"], ["v(n)", 6, 10.437, 10.049, 10.005])),
          micros: ["limite_suite_operations"],
        },
        {
          enonce:
            "Soit $u_n = n^2 - 5n$.\na) Pourquoi ne peut-on pas conclure directement sur sa limite ?\nb) Lever l'indétermination en factorisant par $n^2$.",
          correction:
            "a) $n^2 \\to +\\infty$ et $-5n \\to -\\infty$ : on est devant la forme « $\\infty - \\infty$ », qui est indéterminée.\nb) Pour $n \\geqslant 1$ : $u_n = n^2\\left(1 - \\dfrac{5}{n}\\right)$.\n$\\dfrac{5}{n} \\to 0$, donc $1 - \\dfrac{5}{n} \\to 1$.\nAlors $u_n$ est le produit d'un terme qui tend vers $+\\infty$ par un terme qui tend vers $1$ : $\\lim u_n = +\\infty$.\n⭐ On factorise par le terme de plus haut degré : c'est lui qui gagne.\n⚠️ « Indéterminée » ne veut pas dire « pas de limite » : cela veut dire que les règles ne suffisent pas, et qu'il faut transformer l'écriture.",
          schema: ecranSeulement(tableau(["n", "10", "100", "1000"], ["n² − 5n", "50", "9 500", "995 000"])),
          micros: ["limite_suite_operations"],
        },
        {
          enonce: "Déterminer la limite de la suite $u_n = \\dfrac{3n^2 + 1}{n^2 + 4}$.",
          correction:
            "Le numérateur et le dénominateur tendent vers $+\\infty$ : forme « $\\dfrac{\\infty}{\\infty}$ », indéterminée.\nOn divise en haut et en bas par $n^2$, pour $n \\geqslant 1$ : $u_n = \\dfrac{3 + \\dfrac{1}{n^2}}{1 + \\dfrac{4}{n^2}}$.\n$\\dfrac{1}{n^2} \\to 0$ et $\\dfrac{4}{n^2} \\to 0$ : le numérateur tend vers $3$, le dénominateur vers $1$.\nDonc $\\lim u_n = 3$.\n⭐ Pour un quotient de polynômes en $n$, on factorise par le plus haut degré en haut ET en bas.\n⚠️ Diviser par $n^2$ n'est permis que si $n \\neq 0$ : on se place pour $n \\geqslant 1$, ce qui ne change pas la limite.",
          schema: ecranSeulement(repere([-1, 9, -1, 4], [], termes(0, [0.25, 0.8, 1.63, 2.15, 2.45, 2.62, 2.73, 2.79, 2.84]), 3)),
          micros: ["limite_suite_calculer", "limite_suite_operations"],
        },
        {
          enonce: "Soit $u_n = n + (-1)^n$.\na) Montrer que, pour tout $n$, $u_n \\geqslant n - 1$.\nb) En déduire la limite de $(u_n)$.",
          correction:
            "a) $(-1)^n$ vaut $1$ ou $-1$, donc $(-1)^n \\geqslant -1$.\nOn ajoute $n$ des deux côtés : $u_n \\geqslant n - 1$.\nb) $\\lim (n - 1) = +\\infty$. Comme $u_n$ reste AU-DESSUS de $n - 1$, le théorème de comparaison donne $\\lim u_n = +\\infty$.\n⚠️ La suite n'est pas croissante ($u_0 = 1$ et $u_1 = 0$) : elle tend pourtant vers $+\\infty$. Tendre vers l'infini ne demande pas de monter à chaque pas.\n⭐ Sur le dessin : les points sautillent, mais restent tous au-dessus de la droite orange $y = n - 1$, qui les pousse vers le haut.",
          schema: repere([-1, 9, -2, 10], [{ q: [0, 1, -1], couleur: ORANGE }], termes(0, [1, 0, 3, 2, 5, 4, 7, 6, 9]), undefined, true),
          micros: ["limite_suite_comparaison"],
        },
        {
          enonce: "Soit $u_n = \\dfrac{\\cos(n)}{n}$ pour $n \\geqslant 1$.\na) Montrer que $-\\dfrac{1}{n} \\leqslant u_n \\leqslant \\dfrac{1}{n}$.\nb) En déduire la limite de $(u_n)$.",
          correction:
            "a) Pour tout réel, $-1 \\leqslant \\cos(n) \\leqslant 1$.\nOn divise par $n$, qui est POSITIF : le sens des inégalités ne change pas. $-\\dfrac{1}{n} \\leqslant u_n \\leqslant \\dfrac{1}{n}$.\nb) $\\lim -\\dfrac{1}{n} = 0$ et $\\lim \\dfrac{1}{n} = 0$.\n$u_n$ est coincée entre deux suites qui tendent vers $0$ : par le théorème des gendarmes, $\\lim u_n = 0$.\n⚠️ $\\cos(n)$ n'a pas de limite. Ce qu'on utilise, c'est qu'il reste BORNÉ entre $-1$ et $1$.\n⭐ Sur le dessin : les points restent dans l'entonnoir formé par les courbes $y = \\dfrac{1}{x}$ et $y = -\\dfrac{1}{x}$, qui se referme sur l'axe.",
          schema: repere(
            [-1, 9, -2, 2],
            [
              { pts: echantillon((x) => 1 / x, 0.5, 9), couleur: ORANGE },
              { pts: echantillon((x) => -1 / x, 0.5, 9), couleur: ORANGE },
            ],
            termes(1, [0.54, -0.21, -0.33, -0.16, 0.06, 0.16, 0.11, -0.02]),
          ),
          micros: ["limite_suite_comparaison"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Convergence monotone : une suite croissante et majorée converge ; une suite décroissante et minorée converge. ⚠️ Le théorème ne donne PAS la limite.",
        "Si $u_{n+1} = f(u_n)$, si $(u_n)$ converge vers $\\ell$ et si $f$ est continue en $\\ell$, alors $f(\\ell) = \\ell$ : on trouve la limite en résolvant cette équation.",
        "Suite $u_{n+1} = au_n + b$ : on pose $v_n = u_n - \\ell$, où $\\ell = a\\ell + b$. Alors $(v_n)$ est géométrique de raison $a$.",
        "Récurrence : on vérifie la propriété au premier rang (initialisation), puis on montre que si elle est vraie au rang $n$, elle est vraie au rang $n + 1$ (hérédité).",
      ],
      exercices: [
        {
          enonce:
            "Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \\sqrt{2u_n + 3}$.\na) Montrer par récurrence que, pour tout $n$, $1 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 3$.\nb) En déduire que $(u_n)$ converge.\nc) Déterminer sa limite.",
          correction:
            "On note $f(x) = \\sqrt{2x + 3}$. Elle est croissante sur $\\left[-\\dfrac{3}{2} ; +\\infty\\right[$ : $x \\mapsto 2x + 3$ est croissante, et la racine aussi.\na) Initialisation : $u_0 = 1$ et $u_1 = \\sqrt{5} \\approx 2{,}24$. On a bien $1 \\leqslant 1 \\leqslant \\sqrt{5} \\leqslant 3$.\nHérédité : on suppose $1 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 3$. Comme $f$ est croissante, elle garde l'ordre : $f(1) \\leqslant f(u_n) \\leqslant f(u_{n+1}) \\leqslant f(3)$.\nC'est-à-dire $\\sqrt{5} \\leqslant u_{n+1} \\leqslant u_{n+2} \\leqslant 3$, et $\\sqrt{5} \\geqslant 1$. La propriété est vraie au rang $n + 1$.\nb) La suite est croissante ($u_n \\leqslant u_{n+1}$) et majorée par $3$ : d'après le théorème de convergence monotone, elle converge.\nc) Sa limite $\\ell$ vérifie $\\ell = \\sqrt{2\\ell + 3}$, car $f$ est continue. On élève au carré : $\\ell^2 = 2\\ell + 3$, soit $\\ell^2 - 2\\ell - 3 = 0$, ou $(\\ell - 3)(\\ell + 1) = 0$.\nDonc $\\ell = 3$ ou $\\ell = -1$. Tous les termes sont $\\geqslant 1$, donc $\\ell \\geqslant 1$ : $\\lim u_n = 3$.\n⚠️ « Majorée par $3$ » ne dit pas que la limite est $3$ : une suite majorée par $3$ l'est aussi par $100$. La limite se trouve en c).\n⭐ Sur le dessin : l'escalier orange monte de la courbe à la droite $y = x$, et se coince au point $(3 ; 3)$ où elles se croisent.",
          schema: repere(
            [-1, 4, -1, 4],
            [
              { pts: echantillon((x) => Math.sqrt(2 * x + 3), -1, 4, -1, 4) },
              { q: [0, 1, 0], couleur: GRIS },
              { pts: [[1, 0], [1, 2.236], [2.236, 2.236], [2.236, 2.734], [2.734, 2.734], [2.734, 2.91], [2.91, 2.91]], couleur: ORANGE },
            ],
            [{ x: 3, y: 3, label: "" }],
          ),
          micros: ["limite_suite_monotone_bornee"],
        },
        {
          enonce:
            "Un lac contient $50$ tonnes de polluant en 2025. Chaque année, $20$ % du polluant est éliminé naturellement, puis une usine en rejette $4$ tonnes. On note $u_n$ la masse de polluant, en tonnes, l'année $2025 + n$ : $u_0 = 50$ et $u_{n+1} = 0{,}8u_n + 4$.\na) On pose $v_n = u_n - 20$. Montrer que $(v_n)$ est géométrique.\nb) En déduire $u_n$ en fonction de $n$, puis la limite de $(u_n)$. Interpréter.\nc) À partir de quelle année la masse passe-t-elle sous $21$ tonnes ?",
          correction:
            "a) $v_{n+1} = u_{n+1} - 20 = 0{,}8u_n + 4 - 20$, soit $v_{n+1} = 0{,}8u_n - 16$.\nOn factorise par $0{,}8$ : $v_{n+1} = 0{,}8(u_n - 20) = 0{,}8v_n$.\n$(v_n)$ est géométrique de raison $0{,}8$, de premier terme $v_0 = 50 - 20 = 30$.\nb) $v_n = 30 \\times 0{,}8^n$, donc $u_n = 20 + 30 \\times 0{,}8^n$.\n$-1 < 0{,}8 < 1$, donc $0{,}8^n \\to 0$ et $\\lim u_n = 20$.\nÀ long terme, le lac garde environ $20$ tonnes de polluant : c'est l'équilibre où les $20$ % éliminés ($4$ tonnes) compensent exactement le rejet.\nc) $u_n < 21$ équivaut à $30 \\times 0{,}8^n < 1$, soit $0{,}8^n < \\dfrac{1}{30} \\approx 0{,}0333$.\nÀ la calculatrice : $0{,}8^{15} \\approx 0{,}0352$ (trop grand) et $0{,}8^{16} \\approx 0{,}0281$.\nDonc $n = 16$ : la masse passe sous $21$ tonnes en $2041$.\n⭐ D'où vient le $20$ ? C'est la solution de $\\ell = 0{,}8\\ell + 4$ : la masse qui ne bouge plus d'une année à l'autre.\n⚠️ Sur le dessin, une graduation vaut $10$ tonnes : les points descendent vers la droite $y = 2$, c'est-à-dire $20$ tonnes.",
          schema: repere([-1, 9, -1, 6], [], termes(0, [5, 4.4, 3.92, 3.54, 3.23, 2.98, 2.79, 2.63, 2.5]), 2),
          micros: ["limite_suite_calculer", "limite_suite_interpreter"],
        },
        {
          enonce:
            "Déterminer la limite de chaque suite :\na) $u_n = \\dfrac{3^n + 2^n}{3^n - 1}$, pour $n \\geqslant 1$\nb) $v_n = \\dfrac{2^n - 5^n}{4^n}$",
          correction:
            "a) En haut et en bas, $3^n$ domine : on divise par $3^n$.\n$u_n = \\dfrac{1 + \\left(\\dfrac{2}{3}\\right)^n}{1 - \\left(\\dfrac{1}{3}\\right)^n}$.\n$-1 < \\dfrac{2}{3} < 1$ et $-1 < \\dfrac{1}{3} < 1$ : les deux puissances tendent vers $0$.\nDonc $\\lim u_n = \\dfrac{1 + 0}{1 - 0} = 1$.\nb) On sépare : $v_n = \\dfrac{2^n}{4^n} - \\dfrac{5^n}{4^n} = 0{,}5^n - 1{,}25^n$.\n$0{,}5^n \\to 0$ et $1{,}25^n \\to +\\infty$ : $\\lim v_n = -\\infty$.\n⭐ Avec des puissances, on factorise par celle dont la base est la plus grande : c'est elle qui domine.\n⚠️ $\\dfrac{2^n}{4^n}$ n'est pas $\\dfrac{2}{4}$ : c'est $\\left(\\dfrac{2}{4}\\right)^n$.",
          schema: ecranSeulement(repere([-1, 9, -1, 3], [], termes(1, [2.5, 1.63, 1.35, 1.21, 1.14, 1.09, 1.06, 1.04]), 1)),
          micros: ["limite_suite_operations"],
        },
        {
          enonce:
            "Pour $n \\geqslant 1$, on pose $w_n = \\sqrt{n^2 + n} - n$.\na) Montrer que $w_n = \\dfrac{n}{\\sqrt{n^2 + n} + n}$.\nb) En déduire la limite de $(w_n)$.",
          correction:
            "a) On multiplie en haut et en bas par l'expression conjuguée $\\sqrt{n^2 + n} + n$ :\n$w_n = \\dfrac{(\\sqrt{n^2 + n} - n)(\\sqrt{n^2 + n} + n)}{\\sqrt{n^2 + n} + n}$.\nEn haut, $(a - b)(a + b) = a^2 - b^2$ : on obtient $n^2 + n - n^2 = n$. D'où le résultat.\nb) On divise en haut et en bas par $n$. Comme $n > 0$, $\\sqrt{n^2 + n} = n\\sqrt{1 + \\dfrac{1}{n}}$.\n$w_n = \\dfrac{1}{\\sqrt{1 + \\dfrac{1}{n}} + 1}$.\n$\\dfrac{1}{n} \\to 0$, donc le dénominateur tend vers $\\sqrt{1} + 1 = 2$ : $\\lim w_n = \\dfrac{1}{2}$.\n⚠️ Forme « $\\infty - \\infty$ » : on pourrait croire que les deux termes « s'annulent » et que la limite vaut $0$. Le tableau montre le contraire.",
          schema: ecranSeulement(tableau(["n", "1", "10", "100", "1000"], ["w(n)", 0.4142, 0.4881, 0.4988, 0.4999])),
          micros: ["limite_suite_operations"],
        },
        {
          enonce:
            "Démonstration du cours. Soit $a > 0$.\na) Montrer par récurrence que, pour tout entier $n$, $(1 + a)^n \\geqslant 1 + na$.\nb) En déduire que, si $q > 1$, alors $\\lim q^n = +\\infty$.\nc) D'après cette inégalité, à partir de quel rang est-on sûr que $1{,}5^n > 100$ ?",
          correction:
            "a) Initialisation : pour $n = 0$, $(1 + a)^0 = 1$ et $1 + 0 \\times a = 1$. On a bien $1 \\geqslant 1$.\nHérédité : on suppose $(1 + a)^n \\geqslant 1 + na$. On multiplie par $1 + a$, qui est POSITIF : l'inégalité garde son sens.\n$(1 + a)^{n+1} \\geqslant (1 + na)(1 + a) = 1 + a + na + na^2$.\nOr $na^2 \\geqslant 0$, donc $(1 + a)^{n+1} \\geqslant 1 + (n + 1)a$. La propriété est vraie au rang $n + 1$.\nb) Si $q > 1$, on pose $a = q - 1 > 0$. Alors $q^n = (1 + a)^n \\geqslant 1 + na$.\nComme $a > 0$, $\\lim (1 + na) = +\\infty$. Par comparaison, $\\lim q^n = +\\infty$.\nc) Ici $a = 0{,}5$ : $1{,}5^n \\geqslant 1 + 0{,}5n$. On veut $1 + 0{,}5n > 100$, soit $n > 198$ : à partir du rang $199$.\n⭐ L'inégalité est grossière : en réalité, $1{,}5^{12} \\approx 129{,}7$ dépasse déjà $100$. Mais elle suffit pour la limite.\n⚠️ La démonstration demande $a > 0$ : c'est pourquoi on pose $a = q - 1$, positif parce que $q > 1$.\n⭐ Sur le dessin : les points $1{,}5^n$ décollent au-dessus de la droite orange $y = 1 + 0{,}5n$, qui tend déjà vers $+\\infty$.",
          schema: ecranSeulement(repere([-1, 7, -1, 12], [{ q: [0, 0.5, 1], couleur: ORANGE }], termes(0, [1, 1.5, 2.25, 3.38, 5.06, 7.59, 11.39]), undefined, true)),
          micros: ["limite_suite_comparaison"],
        },
        {
          enonce:
            "Pour $n \\geqslant 1$, on pose $S_n = \\dfrac{n}{n^2 + 1} + \\dfrac{n}{n^2 + 2}$ $+ \\cdots + \\dfrac{n}{n^2 + n}$ (une somme de $n$ termes).\na) Montrer que $\\dfrac{n^2}{n^2 + n} \\leqslant S_n \\leqslant \\dfrac{n^2}{n^2 + 1}$.\nb) En déduire la limite de $(S_n)$.",
          correction:
            "a) Pour chaque $k$ entre $1$ et $n$ : $n^2 + 1 \\leqslant n^2 + k \\leqslant n^2 + n$.\nQuand le dénominateur grandit, la fraction diminue : $\\dfrac{n}{n^2 + n} \\leqslant \\dfrac{n}{n^2 + k} \\leqslant \\dfrac{n}{n^2 + 1}$.\nOn additionne ces $n$ encadrements : $n \\times \\dfrac{n}{n^2 + n} \\leqslant S_n \\leqslant n \\times \\dfrac{n}{n^2 + 1}$.\nC'est l'encadrement demandé.\nb) À gauche : $\\dfrac{n^2}{n^2 + n} = \\dfrac{1}{1 + \\dfrac{1}{n}} \\to 1$. À droite : $\\dfrac{n^2}{n^2 + 1} = \\dfrac{1}{1 + \\dfrac{1}{n^2}} \\to 1$.\nPar le théorème des gendarmes, $\\lim S_n = 1$.\n⚠️ Chaque terme tend vers $0$, mais il y en a de plus en plus : on ne peut PAS dire « une somme de termes qui tendent vers $0$ tend vers $0$ ».\n⭐ Sur le dessin : les points $S_n$ sont pris en sandwich entre les deux courbes, qui montent toutes les deux vers $1$.",
          schema: repere(
            [-1, 9, -1, 2],
            [
              { pts: echantillon((x) => x / (x + 1), 0, 9) },
              { pts: echantillon((x) => (x * x) / (x * x + 1), 0, 9), couleur: ORANGE },
            ],
            termes(1, [0.5, 0.73, 0.82, 0.87, 0.9, 0.91, 0.93, 0.94]),
          ),
          micros: ["limite_suite_comparaison"],
        },
        {
          enonce:
            "On considère la suite définie par $u_0 = 2$ et $u_{n+1} = 1{,}5u_n + 1$, et la fonction Python ci-dessous.\na) Montrer par récurrence que $u_n \\geqslant n + 2$ pour tout $n$. En déduire la limite de $(u_n)$.\nb) Que renvoie seuil(A) ? Que renvoie seuil(1000) ?\nc) Pourquoi la boucle s'arrête-t-elle toujours, quel que soit $A$ ?",
          figure: programme(["def seuil(A):", "    n = 0", "    u = 2", "    while u <= A:", "        u = 1.5 * u + 1", "        n = n + 1", "    return n"]),
          correction:
            "a) Initialisation : $u_0 = 2 \\geqslant 0 + 2$.\nHérédité : si $u_n \\geqslant n + 2$, alors $u_{n+1} = 1{,}5u_n + 1 \\geqslant 1{,}5(n + 2) + 1 = 1{,}5n + 4$.\nOr $1{,}5n + 4 \\geqslant n + 3$, car la différence vaut $0{,}5n + 1 \\geqslant 0$. Donc $u_{n+1} \\geqslant (n + 1) + 2$.\n$\\lim (n + 2) = +\\infty$ : par comparaison, $\\lim u_n = +\\infty$.\nb) La boucle calcule les termes tant qu'ils restent $\\leqslant A$. Elle renvoie le PREMIER rang $n$ tel que $u_n > A$.\nLes termes : $2$, $4$, $7$, $11{,}5$… jusqu'à $u_{13} \\approx 776{,}5$, encore $\\leqslant 1000$, puis $u_{14} \\approx 1165{,}7$.\nDonc seuil(1000) renvoie $14$.\nc) Parce que $u_n \\to +\\infty$ : par définition, pour n'importe quel $A$, les termes finissent par dépasser $A$. La condition du while devient fausse.\n⚠️ Avec une suite qui converge vers $20$, seuil(1000) ne s'arrêterait jamais : on ne lance une boucle de seuil qu'après avoir su que le seuil sera atteint.",
          micros: ["limite_suite_interpreter", "limite_suite_comparaison"],
        },
        {
          enonce:
            "Pour approcher $\\sqrt{2}$ sans calculatrice, on utilise la suite $u_0 = 3$ et $u_{n+1} = \\dfrac{1}{2}\\left(u_n + \\dfrac{2}{u_n}\\right)$. On admet que $u_n > 0$ pour tout $n$.\na) Montrer que $u_{n+1} - \\sqrt{2} = \\dfrac{(u_n - \\sqrt{2})^2}{2u_n}$. En déduire que $u_n \\geqslant \\sqrt{2}$ pour tout $n$.\nb) Montrer que $u_{n+1} - u_n = \\dfrac{2 - u_n^2}{2u_n}$. En déduire que $(u_n)$ est décroissante.\nc) Montrer que $(u_n)$ converge et trouver sa limite.",
          correction:
            "a) $u_{n+1} - \\sqrt{2} = \\dfrac{u_n^2 + 2 - 2\\sqrt{2}\\,u_n}{2u_n}$, en réduisant au même dénominateur.\nEn haut, on reconnaît $(u_n - \\sqrt{2})^2$. D'où la formule.\nUn carré est positif et $2u_n > 0$ : $u_{n+1} \\geqslant \\sqrt{2}$ pour tout $n$. Et $u_0 = 3 \\geqslant \\sqrt{2}$ aussi.\nb) $u_{n+1} - u_n = \\dfrac{1}{2}\\left(\\dfrac{2}{u_n} - u_n\\right) = \\dfrac{2 - u_n^2}{2u_n}$.\nComme $u_n \\geqslant \\sqrt{2}$, $u_n^2 \\geqslant 2$ : le numérateur est négatif. La suite est décroissante.\nc) Décroissante et minorée par $\\sqrt{2}$ : elle converge (convergence monotone).\nSa limite $\\ell$ vérifie $\\ell = \\dfrac{1}{2}\\left(\\ell + \\dfrac{2}{\\ell}\\right)$, soit $2\\ell = \\ell + \\dfrac{2}{\\ell}$, donc $\\ell^2 = 2$.\nComme $\\ell \\geqslant \\sqrt{2} > 0$ : $\\lim u_n = \\sqrt{2}$.\n⭐ Et c'est rapide : $u_1 = \\dfrac{11}{6} \\approx 1{,}8333$, $u_2 \\approx 1{,}4621$, $u_3 \\approx 1{,}4150$, puis $u_4 \\approx 1{,}414214$, qui a déjà six décimales justes.\n⚠️ Sans l'hypothèse $u_n > 0$, on ne pourrait ni diviser par $u_n$, ni écarter $\\ell = -\\sqrt{2}$.",
          schema: repere([-1, 6, -1, 4], [], termes(0, [3, 1.83, 1.46, 1.41, 1.41]), 1.414),
          micros: ["limite_suite_monotone_bornee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. La limite y dit ce qui se passe à long terme.",
      rappel: [
        "Une limite se lit dans le contexte : « à long terme, la population se stabilise vers… », « la distance ne dépassera jamais… ».",
        "Somme géométrique : $1 + q + q^2 + \\cdots + q^{n-1} = \\dfrac{1 - q^n}{1 - q}$, pour $q \\neq 1$.",
        "Plan type d'une suite $u_{n+1} = f(u_n)$ : variations de $f$, récurrence, convergence monotone, puis la limite par $f(\\ell) = \\ell$.",
      ],
      exercices: [
        {
          titre: "Les truites du bassin",
          enonce:
            "Un pisciculteur élève des truites. Le nombre de truites, en milliers, l'année $n$, est modélisé par $u_0 = 1$ et $u_{n+1} = 1{,}6u_n - 0{,}1u_n^2$. On note $f(x) = 1{,}6x - 0{,}1x^2$.\na) Montrer que $f$ est croissante sur $[0 ; 6]$ et calculer $f(6)$.\nb) Montrer par récurrence que $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 6$ pour tout $n$.\nc) En déduire que $(u_n)$ converge, puis déterminer sa limite. Interpréter.\nd) Au bout de combien d'années le bassin dépasse-t-il $5\\,000$ truites ?",
          correction:
            "a) $f'(x) = 1{,}6 - 0{,}2x$, positive pour $x \\leqslant 8$ : $f$ est croissante sur $[0 ; 6]$.\n$f(6) = 9{,}6 - 3{,}6 = 6$.\nb) Initialisation : $u_0 = 1$ et $u_1 = 1{,}6 - 0{,}1 = 1{,}5$. On a $0 \\leqslant 1 \\leqslant 1{,}5 \\leqslant 6$.\nHérédité : si $0 \\leqslant u_n \\leqslant u_{n+1} \\leqslant 6$, ces nombres sont dans $[0 ; 6]$, où $f$ est croissante : $f(0) \\leqslant f(u_n) \\leqslant f(u_{n+1}) \\leqslant f(6)$.\nSoit $0 \\leqslant u_{n+1} \\leqslant u_{n+2} \\leqslant 6$ : c'est la propriété au rang $n + 1$.\nc) La suite est croissante et majorée par $6$ : elle converge vers un réel $\\ell$.\n$f$ est continue, donc $f(\\ell) = \\ell$ : $1{,}6\\ell - 0{,}1\\ell^2 = \\ell$, soit $0{,}1\\ell(6 - \\ell) = 0$. Donc $\\ell = 0$ ou $\\ell = 6$.\nLa suite est croissante et $u_0 = 1$ : tous les termes sont $\\geqslant 1$, donc $\\ell \\geqslant 1$. D'où $\\lim u_n = 6$.\nÀ long terme, le bassin se stabilise vers $6\\,000$ truites : c'est la population que le bassin peut nourrir.\nd) On calcule : $u_5 \\approx 4{,}725$, puis $u_6 \\approx 5{,}327$. Le bassin dépasse $5\\,000$ truites au bout de $6$ ans.\n⚠️ En c), deux valeurs vérifient $f(\\ell) = \\ell$. C'est la croissance de la suite qui élimine $0$.\n⭐ Sur le dessin : l'escalier orange monte entre la parabole et la droite $y = x$ vers le point $(6 ; 6)$.",
          schema: repere(
            [-1, 8, -1, 8],
            [
              { q: [-0.1, 1.6, 0] },
              { q: [0, 1, 0], couleur: GRIS },
              { pts: [[1, 0], [1, 1.5], [1.5, 1.5], [1.5, 2.175], [2.175, 2.175], [2.175, 3.007], [3.007, 3.007], [3.007, 3.907], [3.907, 3.907], [3.907, 4.725], [4.725, 4.725]], couleur: ORANGE },
            ],
            [{ x: 6, y: 6, label: "" }],
          ),
          micros: ["limite_suite_monotone_bornee", "limite_suite_defi", "limite_suite_interpreter"],
        },
        {
          titre: "La balle qui rebondit",
          enonce:
            "On lâche une balle d'une hauteur de $2$ m. À chaque rebond, elle remonte à $60$ % de sa hauteur précédente. On note $h_n$ la hauteur atteinte après le $n$-ième rebond, avec $h_0 = 2$.\na) Exprimer $h_n$ en fonction de $n$ et donner sa limite.\nb) On note $D_n$ la distance totale parcourue quand la balle touche le sol pour la $(n + 1)$-ième fois. Justifier que $D_n = 2 + 2(h_1 + \\cdots + h_n)$.\nc) Montrer que $D_n = 8 - 6 \\times 0{,}6^n$.\nd) La distance totale a-t-elle une limite ? Interpréter.",
          correction:
            "a) Chaque hauteur est la précédente multipliée par $0{,}6$ : $(h_n)$ est géométrique, et $h_n = 2 \\times 0{,}6^n$.\n$-1 < 0{,}6 < 1$ : $\\lim h_n = 0$. Les rebonds s'éteignent.\nb) La balle tombe d'abord de $2$ m. Puis, à chaque rebond $k$, elle MONTE de $h_k$ et REDESCEND de $h_k$ : cela fait $2h_k$.\nc) $h_1 + \\cdots + h_n = 2 \\times 0{,}6 \\times (1 + 0{,}6 + \\cdots + 0{,}6^{n-1})$, soit $1{,}2 \\times \\dfrac{1 - 0{,}6^n}{1 - 0{,}6}$.\nCela fait $3(1 - 0{,}6^n)$, car $\\dfrac{1{,}2}{0{,}4} = 3$.\nDonc $D_n = 2 + 6(1 - 0{,}6^n) = 8 - 6 \\times 0{,}6^n$.\nd) $0{,}6^n \\to 0$, donc $\\lim D_n = 8$.\nDans ce modèle, la balle rebondit une infinité de fois, mais la distance totale ne dépasse jamais $8$ m.\n⚠️ Une infinité de trajets ne fait pas forcément une distance infinie : ils raccourcissent assez vite.\n⚠️ En c), la somme commence à $h_1$, pas à $h_0$ : le premier trajet de $2$ m est compté à part.\n⭐ Sur le dessin : $D_0 = 2$, $D_1 = 4{,}4$, $D_2 = 5{,}84$… Les points montent vers la droite $y = 8$ sans l'atteindre.",
          schema: repere([-1, 7, -1, 10], [], termes(0, [2, 4.4, 5.84, 6.7, 7.22, 7.53, 7.72]), 8, true),
          micros: ["limite_suite_calculer", "limite_suite_defi", "limite_suite_interpreter"],
        },
        {
          titre: "Le flocon de Koch",
          enonce:
            "On part d'un triangle équilatéral de côté $3$ (étape $0$). À chaque étape, on coupe chaque côté en trois, et on remplace le tiers du milieu par deux côtés d'un petit triangle équilatéral tourné vers l'extérieur. Le dessin montre l'étape $2$.\na) Combien le flocon a-t-il de côtés à l'étape $n$ ? Quelle est leur longueur ? En déduire le périmètre $P_n$.\nb) Déterminer la limite de $(P_n)$.\nc) On admet que l'aire vérifie $A_n = A_0\\left(1 + \\dfrac{3}{5}\\left(1 - \\left(\\dfrac{4}{9}\\right)^n\\right)\\right)$. Déterminer sa limite.\nd) Que dire de ce flocon ?",
          figure: repere([-3, 3, -3, 3], [{ pts: koch(2) }]),
          correction:
            "a) Chaque côté devient $4$ côtés : le nombre de côtés est multiplié par $4$ à chaque étape. À l'étape $n$ : $3 \\times 4^n$ côtés.\nChaque longueur est divisée par $3$ : à l'étape $n$, un côté mesure $\\dfrac{3}{3^n}$.\n$P_n = 3 \\times 4^n \\times \\dfrac{3}{3^n} = 9 \\times \\left(\\dfrac{4}{3}\\right)^n$.\nb) $\\dfrac{4}{3} > 1$, donc $\\left(\\dfrac{4}{3}\\right)^n \\to +\\infty$, et $\\lim P_n = +\\infty$.\nc) $-1 < \\dfrac{4}{9} < 1$, donc $\\left(\\dfrac{4}{9}\\right)^n \\to 0$.\nAlors $A_n \\to A_0\\left(1 + \\dfrac{3}{5}\\right) = \\dfrac{8}{5}A_0$.\nd) Le périmètre devient aussi grand qu'on veut, alors que l'aire reste finie : elle ne dépasse jamais $\\dfrac{8}{5}$ de celle du triangle de départ.\n⭐ Vérification à l'étape $2$ : $3 \\times 16 = 48$ côtés, de longueur $\\dfrac{1}{3}$, soit $P_2 = 16$. La formule donne bien $9 \\times \\dfrac{16}{9} = 16$.\n⚠️ Les deux suites ne se comportent pas pareil : $\\dfrac{4}{3}$ est plus grand que $1$, $\\dfrac{4}{9}$ est plus petit. Tout se joue sur la raison.",
          micros: ["limite_suite_calculer", "limite_suite_defi", "limite_suite_interpreter"],
        },
        {
          titre: "Une somme qui ne dépasse jamais 2",
          enonce:
            "Pour $n \\geqslant 1$, on pose $u_n = 1 + \\dfrac{1}{2^2} + \\dfrac{1}{3^2} + \\cdots + \\dfrac{1}{n^2}$.\na) Montrer que $(u_n)$ est croissante.\nb) Montrer que, pour $k \\geqslant 2$, $\\dfrac{1}{k^2} \\leqslant \\dfrac{1}{k - 1} - \\dfrac{1}{k}$.\nc) En déduire que $u_n \\leqslant 2 - \\dfrac{1}{n}$, puis que $(u_n)$ converge.\nd) Sa limite vaut-elle $2$ ?",
          correction:
            "a) $u_{n+1} - u_n = \\dfrac{1}{(n + 1)^2} > 0$ : on ajoute un nombre positif à chaque rang. La suite est croissante.\nb) $\\dfrac{1}{k - 1} - \\dfrac{1}{k} = \\dfrac{k - (k - 1)}{k(k - 1)} = \\dfrac{1}{k(k - 1)}$.\nOr $k(k - 1) \\leqslant k^2$, donc $\\dfrac{1}{k(k - 1)} \\geqslant \\dfrac{1}{k^2}$.\nc) On écrit l'inégalité pour $k = 2$, $3$, …, $n$, et on additionne :\n$\\dfrac{1}{2^2} + \\cdots + \\dfrac{1}{n^2}$ $\\leqslant \\left(1 - \\dfrac{1}{2}\\right) + \\left(\\dfrac{1}{2} - \\dfrac{1}{3}\\right) + \\cdots$\nÀ droite, tout se simplifie en chaîne (somme télescopique) : il reste $1 - \\dfrac{1}{n}$.\nOn ajoute le premier terme $1$ : $u_n \\leqslant 2 - \\dfrac{1}{n} \\leqslant 2$.\nLa suite est croissante et majorée par $2$ : elle converge.\nd) On sait seulement que la limite est $\\leqslant 2$. En fait, elle vaut $\\dfrac{\\pi^2}{6} \\approx 1{,}645$ : c'est un résultat d'Euler, hors programme.\n⚠️ « Majorée par $2$ » ne veut pas dire « tend vers $2$ ». Un majorant n'est pas une limite.\n⭐ Sur le dessin : les points $u_n$ restent sous la courbe orange $y = 2 - \\dfrac{1}{x}$, elle-même sous la droite $y = 2$.",
          schema: repere(
            [-1, 9, -1, 3],
            [{ pts: echantillon((x) => 2 - 1 / x, 0.6, 9), couleur: ORANGE }],
            termes(1, [1, 1.25, 1.36, 1.42, 1.46, 1.49, 1.51, 1.53]),
            2,
          ),
          micros: ["limite_suite_monotone_bornee", "limite_suite_comparaison", "limite_suite_defi"],
        },
      ],
    },
  ],
};
