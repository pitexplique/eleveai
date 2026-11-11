// Renfort LIMITES DE SUITES de Terminale spé (10/11/2026).
//
// Mesure du 10/11 (scripts/mesurer-squelettes-coach.ts terminale-spe
// limite_suite) : 9 à 16 squelettes par micro, 11 à 18 répétitions sur 20 à
// chaque étoile. Générateurs : familles de suites × tournures × situations.
// Aucune question « open » : QCM ou réponse courte numérique.
// Les outils (nombres, QCM, situations) viennent de suites-renfort.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { affN, affU, cPlusK, co, court, expl, fabriquer, geoN, n, nuage, pick, qcm, rint, rond, sg, situationAffine, type LigneRenfort } from "./suites-renfort";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

const PINF = "$+\\infty$";
const MINF = "$-\\infty$";
const AUCUNE = "la suite n'a pas de limite";
const FI = "on ne peut pas conclure : forme indéterminée";
const val$ = (x: number) => `$${n(x)}$`;

/** Fraction réduite en LaTeX : « 2 », « \dfrac{2}{3} », « -\dfrac{1}{2} ». */
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
export function frac(p: number, q: number) {
  if (q < 0) { p = -p; q = -q; }
  const g = pgcd(p, q) || 1;
  const [a, b] = [p / g, q / g];
  if (b === 1) return n(a);
  return `${a < 0 ? "-" : ""}\\dfrac{${Math.abs(a)}}{${b}}`;
}

/** Quatre choix distincts : la bonne réponse et trois pièges pris dans la liste. */
function choix(bon: string, autres: string[]) {
  return [...new Set(autres.filter((x) => x !== bon))];
}

/* =========================================================
   LIMITE_SUITE_INTERPRETER
========================================================= */

const conv = (L: number) => `converger vers $${n(L)}$`;
const T_PINF = "tendre vers $+\\infty$";
const T_MINF = "tendre vers $-\\infty$";
const T_AUC = "n'avoir aucune limite";

function genLimNuage() {
  const t = rint(1, 6);
  const L = rint(-2, 6);
  const c = pick([2, 3, -2, -3]);
  const nb = 12;
  let y: number[] = [];
  let bon = "", raison = "";
  if (t === 1) { const q = pick([0.5, 0.6, -0.6]); y = Array.from({ length: nb }, (_, k) => L + c * q ** k); bon = conv(L); raison = `les points se rapprochent de la droite d'équation $y = ${n(L)}$`; }
  else if (t === 2) { y = Array.from({ length: nb }, (_, k) => L + c / (k + 1)); bon = conv(L); raison = `les points se rapprochent de la droite d'équation $y = ${n(L)}$`; }
  else if (t === 3) { const k0 = pick([0.8, 1, 1.5]); y = Array.from({ length: nb }, (_, k) => L + k0 * k); bon = T_PINF; raison = "les points montent sans se stabiliser"; }
  else if (t === 4) { y = Array.from({ length: nb }, (_, k) => 0.5 * 1.4 ** k); bon = T_PINF; raison = "les points montent de plus en plus vite"; }
  else if (t === 5) { const k0 = pick([0.8, 1, 1.5]); y = Array.from({ length: nb }, (_, k) => L + 4 - k0 * k); bon = T_MINF; raison = "les points descendent sans se stabiliser"; }
  else { y = Array.from({ length: nb }, (_, k) => L + 2 * (-1) ** k); bon = T_AUC; raison = `les points sautent sans cesse entre $${n(L - 2)}$ et $${n(L + 2)}$`; }
  y = y.map((v) => rond(v, 3));
  const pieges = [conv(rond(y[0], 0)), conv(0), conv(L + 2), T_PINF, T_MINF, T_AUC].filter((x) => x !== bon);
  return qcm(
    pick(["Voici les premiers termes d'une suite $(u_n)$, représentés par les points $(n\\,;u_n)$. Quand $n$ devient grand, la suite semble :", "D'après le nuage de points ci-dessous, la suite $(u_n)$ semble :", "Un capteur enregistre une mesure $u_n$ chaque seconde (graphique ci-dessous). Sur le long terme, la suite semble :", "Observe les points $(n\\,;u_n)$. Quelle conjecture peut-on faire ?"]),
    bon,
    melangeEnPlace([...new Set(pieges)]).slice(0, 3),
    expl("une suite converge vers $L$ si ses termes finissent par être aussi proches de $L$ qu'on veut.", "on regarde où se dirigent les points quand $n$ augmente.", `${raison}.`, `la suite semble ${bon}.`),
    nuage(y)
  );
}

const PHRASES_LIM: Array<() => { ctx: string; F: string; bon: string; raison: string }> = [
  () => { const T = pick([18, 19, 20, 21, 22]), c = pick([60, 80, 150]); return { ctx: "la température d'un plat sorti du four (en °C) après $n$ minutes", F: `${T} + ${c} \\times 0{,}9^n`, bon: conv(T), raison: `$0{,}9^n$ tend vers 0, donc $u_n$ tend vers ${T}` }; },
  () => { const V = pick([50, 55, 60]); return { ctx: "la vitesse d'une parachutiste (en m/s) après $n$ secondes", F: `${V} - ${V} \\times 0{,}8^n`, bon: conv(V), raison: `$0{,}8^n$ tend vers 0, donc $u_n$ tend vers ${V}` }; },
  () => { const c = pick([40, 60, 80]); return { ctx: "la charge d'une batterie (en %) après $n$ quarts d'heure", F: `100 - ${c} \\times 0{,}7^n`, bon: conv(100), raison: "$0{,}7^n$ tend vers 0, donc $u_n$ tend vers 100" }; },
  () => { const c = pick([12, 20, 30]); return { ctx: "la concentration d'un médicament (en mg/L) $n$ heures après l'arrêt de la perfusion", F: `${c} \\times 0{,}6^n`, bon: conv(0), raison: "$0{,}6^n$ tend vers 0" }; },
  () => { const H = pick([4, 5, 6]), c = pick([2, 3]); return { ctx: "la hauteur d'un bambou (en m) au bout de $n$ semaines", F: `${H} - \\dfrac{${c}}{n + 1}`, bon: conv(H), raison: `$\\dfrac{${c}}{n + 1}$ tend vers 0, donc $u_n$ tend vers ${H}` }; },
  () => { const c = pick([500, 1000, 2000]); return { ctx: "un capital placé à intérêts composés (en €) après $n$ années", F: `${c} \\times 1{,}05^n`, bon: T_PINF, raison: "$1{,}05 > 1$, donc $1{,}05^n$ tend vers $+\\infty$" }; },
  () => { const k = pick([6000, 8000, 10000]); return { ctx: "le nombre total de pas comptés par un podomètre après $n$ jours", F: `${k}n`, bon: T_PINF, raison: `$${k}n$ dépasse tout nombre` }; },
  () => { const c = pick([50, 100, 200]); return { ctx: "le nombre de bactéries d'une culture après $n$ heures", F: `${c} \\times 2^n`, bon: T_PINF, raison: "$2^n$ tend vers $+\\infty$" }; },
  () => { const c = pick([300, 500]), k = pick([40, 60]); return { ctx: "le solde d'un compte (en €) après $n$ mois sans aucune rentrée d'argent", F: `${c} - ${k}n`, bon: T_MINF, raison: `$-${k}n$ tend vers $-\\infty$` }; },
  () => { const k = pick([3, 5, 8]); return { ctx: "l'altitude d'un sous-marin qui plonge sans s'arrêter (en m) après $n$ minutes", F: `-${k}n`, bon: T_MINF, raison: `$-${k}n$ tend vers $-\\infty$` }; },
  () => ({ ctx: "l'état d'une lampe qui clignote (1 : allumée, 0 : éteinte) à la seconde $n$", F: "\\dfrac{1 + (-1)^n}{2}", bon: T_AUC, raison: "les termes valent alternativement 1 et 0" }),
  () => { const c = pick([2, 3, 5]); return { ctx: "la position d'un balancier (en cm) à la seconde $n$", F: `${c}(-1)^n`, bon: T_AUC, raison: `les termes valent alternativement $${c}$ et $-${c}$` }; },
];

function genLimPhrase() {
  const p = pick(PHRASES_LIM)();
  return qcm(
    `${pick(["On modélise", "Une scientifique modélise", "Un technicien modélise"])} ${p.ctx} par $u_n = ${p.F}$. ${pick(["Quand $n$ devient très grand, la suite $(u_n)$ semble :", "Sur le long terme, la suite $(u_n)$ va :", "Que fait la suite $(u_n)$ quand $n$ tend vers $+\\infty$ ?"])}`,
    p.bon,
    melangeEnPlace([conv(0), conv(1), conv(100), T_PINF, T_MINF, T_AUC].filter((x) => x !== p.bon)).slice(0, 3),
    expl("on cherche vers quoi se dirigent les termes quand $n$ devient grand.", "on repère le terme qui tend vers 0 (ou qui grandit sans fin).", `${p.raison}.`, `la suite va ${p.bon}.`)
  );
}

/** Tableau de valeurs de la calculatrice : on conjecture (piège : la limite n'est pas le dernier terme affiché). */
function genLimTableau() {
  const t = rint(1, 4);
  const L = rint(-3, 8), c = pick([2, 3, 5, 7]);
  let F = "", f: (k: number) => number, bon = "";
  if (t === 1) { F = `${n(L)} + \\dfrac{${c}}{n}`; f = (k) => L + c / k; bon = conv(L); }
  else if (t === 2) { F = `${n(L)} - \\dfrac{${c}}{\\sqrt{n}}`; f = (k) => L - c / Math.sqrt(k); bon = conv(L); }
  else if (t === 3) { F = `${c}n${sg(L)}`; f = (k) => c * k + L; bon = T_PINF; }
  else { F = `${n(L)} - ${c}\\sqrt{n}`; f = (k) => L - c * Math.sqrt(k); bon = T_MINF; }
  const ks = [10, 100, 1000, 10000];
  const v = ks.map((k) => rond(f!(k), 4));
  const ligne = ks.map((k, i) => `$u_{${k}} \\approx ${n(v[i])}$`).join(", ");
  return qcm(
    `${pick(["Une calculatrice donne, pour", "Un tableur affiche, pour", "Une élève calcule, pour"])} $u_n = ${F}$ : ${ligne}. ${pick(["La suite semble :", "Quelle conjecture peut-on faire ?", "Quand $n$ tend vers $+\\infty$, la suite semble :"])}`,
    bon,
    [conv(v[3]), ...melangeEnPlace([...new Set([conv(L), conv(0), T_PINF, T_MINF, T_AUC])].filter((x) => x !== bon))].slice(0, 3),
    expl("la limite est la valeur dont les termes se rapprochent, pas la valeur d'un terme.", "on regarde comment évoluent les valeurs quand $n$ est multiplié par 10.", t <= 2 ? `les écarts à $${n(L)}$ deviennent de plus en plus petits.` : `les valeurs ${t === 3 ? "augmentent" : "diminuent"} sans se stabiliser.`, `la suite semble ${bon}.`)
  );
}

const DEF_CONV = "tout intervalle ouvert contenant $L$ contient tous les termes $u_n$ à partir d'un certain rang";
const DEF_PINF = "tout intervalle $]A\\,;+\\infty[$ contient tous les termes $u_n$ à partir d'un certain rang";
const CTX_DEF = [
  "la suite des températures d'un four",
  "la suite des prix d'une action",
  "la suite des distances parcourues par un robot",
  "la suite des concentrations d'un polluant",
  "la suite des scores moyens d'un jeu en ligne",
  "la suite des débits d'une rivière",
];

function genLimDef() {
  const L = rint(-5, 20);
  const ctx = pick(CTX_DEF);
  if (rint(1, 3) === 1) {
    return qcm(
      `${pick([`Un rapport indique que ${ctx} $(u_n)$ tend vers $+\\infty$.`, "On dit que la suite $(u_n)$ tend vers $+\\infty$.", `Une ingénieure lit que ${ctx} $(u_n)$ diverge vers $+\\infty$.`])} Cela signifie que :`,
      DEF_PINF,
      ["$u_n > A$ pour au moins un rang $n$, quel que soit $A$", "la suite $(u_n)$ est croissante", "les termes $u_n$ finissent par valoir $+\\infty$"],
      expl("$(u_n)$ tend vers $+\\infty$ si, pour tout réel $A$, tous les termes finissent par dépasser $A$.", "on vérifie que la propriété porte sur TOUS les termes à partir d'un rang.", "dépasser $A$ une seule fois ne suffit pas ; une suite qui tend vers $+\\infty$ n'est pas forcément croissante.", `${DEF_PINF}.`)
    );
  }
  const bon = DEF_CONV.replace(/\$L\$/g, `$${n(L)}$`);
  return qcm(
    `${pick([`Un rapport indique que ${ctx} $(u_n)$ converge vers $${n(L)}$.`, `On dit que la suite $(u_n)$ converge vers $${n(L)}$.`, `Une ingénieure lit que ${ctx} $(u_n)$ a pour limite $${n(L)}$.`])} Cela signifie que :`,
    bon,
    [`$u_n = ${n(L)}$ à partir d'un certain rang`, `$u_n < ${n(L)}$ pour tout entier $n$`, `tous les termes sont dans l'intervalle $]${n(L - 1)}\\,;${n(L + 1)}[$ dès le rang 0`, `la suite est croissante et majorée par $${n(L)}$`],
    expl("$(u_n)$ converge vers $L$ si tout intervalle ouvert contenant $L$ contient tous les termes à partir d'un certain rang.", "on élimine les phrases trop fortes (égalité, dès le rang 0) ou sans rapport (sens de variation).", `les termes peuvent ne jamais valoir $${n(L)}$, être au-dessus ou au-dessous.`, `${bon}.`)
  );
}

/** Rang à partir duquel une condition est remplie (suite monotone). */
function genLimRang() {
  const t = rint(1, 5);
  let F = "", cond = "", N = 0, calc = "";
  if (t === 1) {
    const L = pick([-2, -1, 1, 2, 3, 4, 5, 7, 9]), c = pick([1, 2, 3, 5]), e = pick([0.1, 0.01, 0.001]);
    F = `${n(L)} + \\dfrac{${c}}{n}`; cond = `$|u_n${sg(-L)}| < ${n(e)}$`;
    N = Math.floor(rond(c / e)) + 1; calc = `$\\dfrac{${c}}{n} < ${n(e)}$ donc $n > ${n(rond(c / e))}$`;
  } else if (t === 2) {
    const L = pick([-2, -1, 1, 2, 3, 4, 5, 7, 9]), c = pick([1, 2, 4]), e = pick([0.01, 0.001]);
    F = `${n(L)} + ${c === 1 ? "" : `${c} \\times `}0{,}5^n`; cond = `$|u_n${sg(-L)}| < ${n(e)}$`;
    N = 0; while (c * 0.5 ** N >= e) N++; calc = `$${c === 1 ? "" : `${c} \\times `}0{,}5^n < ${n(e)}$ dès $n = ${N}$`;
  } else if (t === 3) {
    const A = pick([10000, 1000000, 40000]);
    F = "n^2"; cond = `$u_n > ${n(A)}$`;
    N = Math.floor(Math.sqrt(A)) + 1; calc = `$n^2 > ${n(A)}$ donc $n > ${n(Math.sqrt(A))}$`;
  } else if (t === 4) {
    const a = pick([2, 3, 4, 5]), b = pick([5, 7, 10]), A = pick([1000, 500, 2000]);
    F = `${a}n - ${b}`; cond = `$u_n > ${n(A)}$`;
    N = Math.floor((A + b) / a) + 1; calc = `$${a}n - ${b} > ${A}$ donc $n > ${n(rond((A + b) / a))}$`;
  } else {
    const A = pick([1000, 1000000, 100]);
    F = "2^n"; cond = `$u_n > ${n(A)}$`;
    N = 0; while (2 ** N <= A) N++; calc = `$2^{${N - 1}} = ${2 ** (N - 1)}$ et $2^{${N}} = ${2 ** N}$`;
  }
  return court(
    pick([
      `Soit $u_n = ${F}$ pour tout entier $n \\ge 1$. À partir de quel rang (le plus petit) a-t-on ${cond} ?`,
      `Soit $u_n = ${F}$ pour tout entier $n \\ge 1$. Quel est le plus petit entier $N$ tel que, pour tout $n \\ge N$, ${cond} ?`,
      `Une programmeuse étudie $u_n = ${F}$ (pour $n \\ge 1$). Elle cherche le premier rang $N$ à partir duquel ${cond}. Que vaut $N$ ?`,
      `Un ingénieur qualité modélise un réglage par $u_n = ${F}$ (pour $n \\ge 1$). Quel est le plus petit rang $N$ à partir duquel ${cond} ?`,
    ]),
    N,
    expl("dire qu'une suite tend vers une limite, c'est dire qu'à partir d'un certain rang, les termes vérifient la condition.", "on résout l'inéquation d'inconnue $n$ (la suite est monotone).", `${calc}.`, `le plus petit rang est $N = ${N}$.`)
  );
}

/* =========================================================
   LIMITE_SUITE_CALCULER
========================================================= */

const lab = (L: number | "+" | "-" | "aucune") => (L === "+" ? PINF : L === "-" ? MINF : L === "aucune" ? AUCUNE : val$(L));

function genLimRef(niveau: number) {
  return () => {
    const k = pick([2, 3, 5, 4]), b = rint(-6, 9) || 2;
    const fam: Array<[string, number | "+" | "-", string]> = niveau === 1
      ? [["n", "+", "$n$ grandit sans fin"], ["n^2", "+", "$n^2$ grandit sans fin"], ["n^3", "+", "$n^3$ grandit sans fin"], ["\\sqrt{n}", "+", "$\\sqrt{n}$ grandit sans fin"], ["\\dfrac{1}{n}", 0, "$\\dfrac{1}{n}$ devient aussi petit qu'on veut"], ["\\dfrac{1}{n^2}", 0, "$\\dfrac{1}{n^2}$ tend vers 0"], ["\\dfrac{1}{\\sqrt{n}}", 0, "$\\dfrac{1}{\\sqrt{n}}$ tend vers 0"], ["-n", "-", "$-n$ décroît sans fin"], ["-n^2", "-", "$-n^2$ décroît sans fin"]]
      : [[`${k}n^2${sg(b)}`, "+", `$${k}n^2$ tend vers $+\\infty$`], [`${n(b)} - \\dfrac{${k}}{n}`, b, `$\\dfrac{${k}}{n}$ tend vers 0`], [`${n(b)} + \\dfrac{${k}}{\\sqrt{n}}`, b, `$\\dfrac{${k}}{\\sqrt{n}}$ tend vers 0`], [`${n(b)} - ${k}n^3`, "-", `$-${k}n^3$ tend vers $-\\infty$`], [`\\dfrac{${k}}{n^2}${sg(b)}`, b, `$\\dfrac{${k}}{n^2}$ tend vers 0`], [`${k}\\sqrt{n}${sg(b)}`, "+", `$${k}\\sqrt{n}$ tend vers $+\\infty$`]];
    const [F, L, raison] = pick(fam);
    const bon = lab(L);
    return qcm(
      pick([`Pour tout entier $n \\ge 1$, on pose $u_n = ${F}$. Quelle est la limite de $(u_n)$ ?`, `Soit $u_n = ${F}$ ($n \\ge 1$). Quand $n$ tend vers $+\\infty$, $u_n$ tend vers :`, `Quelle est la limite en $+\\infty$ de la suite définie par $u_n = ${F}$ ($n \\ge 1$) ?`]),
      bon,
      choix(bon, [PINF, MINF, val$(0), val$(niveau === 1 ? 1 : b), val$(k)]),
      expl("limites de référence : $n$, $n^2$, $\\sqrt{n}$ tendent vers $+\\infty$ ; $\\dfrac{1}{n}$, $\\dfrac{1}{n^2}$, $\\dfrac{1}{\\sqrt{n}}$ tendent vers 0.", "on repère le terme qui commande la limite.", `${raison}.`, `la limite est ${bon}.`)
    );
  };
}

function genLimGeo() {
  const q = pick([0.3, 0.5, 0.9, 0.99, 1.1, 1.5, 2, 3, -0.5, -0.8, -2, -1.5]);
  const a = pick([1, 2, 3, -1, -2, 5]);
  const b = pick([0, 0, 2, -3, 4, 1]);
  const F = `${geoN(a, q)}${sg(b)}`;
  const L: number | "+" | "-" | "aucune" = Math.abs(q) < 1 ? b : q > 1 ? (a > 0 ? "+" : "-") : "aucune";
  const bon = lab(L);
  const raison = Math.abs(q) < 1 ? `$-1 < ${n(q)} < 1$, donc $${q < 0 ? `(${n(q)})` : n(q)}^n$ tend vers 0` : q > 1 ? `$${n(q)} > 1$, donc $${n(q)}^n$ tend vers $+\\infty$ (et on multiplie par $${n(a)}$)` : `$${n(q)} \\le -1$ : les termes changent de signe en grandissant`;
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Quelle est la limite de $(u_n)$ ?`, `Que peut-on dire de la limite de la suite définie par $u_n = ${F}$ ?`, `Une économiste modélise une grandeur par $u_n = ${F}$. Quand $n$ tend vers $+\\infty$ :`]),
    bon,
    choix(bon, [PINF, MINF, val$(b), val$(0), AUCUNE, val$(a + b)]),
    expl("$q^n$ tend vers 0 si $-1 < q < 1$, vers $+\\infty$ si $q > 1$, et n'a pas de limite si $q \\le -1$.", "on regarde la raison $q$, puis le coefficient devant $q^n$.", `${raison}.`, L === "aucune" ? "la suite n'a pas de limite." : `la limite est ${bon}.`)
  );
}

/** Polynôme en n : le terme de plus haut degré l'emporte. */
function genLimPoly() {
  const a = pick([1, 2, 3, -1, -2, 4]);
  const b = pick([5, 10, 20, -7, 100]);
  const c = rint(-9, 9);
  const t = rint(1, 3);
  const F = t === 1 ? `${co(a)}n^2${sg(b)}n${sg(c)}` : t === 2 ? `${co(a)}n^3${sg(-Math.abs(b))}n^2` : `${co(a)}n^2${sg(-Math.sign(a) * Math.abs(b))}n`;
  const bon = a > 0 ? PINF : MINF;
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Quelle est la limite de $(u_n)$ ?`, `Un élève dit : « $u_n = ${F}$, c'est une forme indéterminée ». Quelle est la limite de $(u_n)$ ?`, `Quand $n$ tend vers $+\\infty$, la suite $u_n = ${F}$ tend vers :`]),
    bon,
    [a > 0 ? MINF : PINF, val$(0), FI, val$(a)],
    expl("pour un polynôme en $n$, on factorise par le terme de plus haut degré.", `on écrit $u_n = ${co(a)}n^${t === 2 ? 3 : 2}\\left(1 + \\dots\\right)$, où les autres termes divisés tendent vers 0.`, `$${co(a)}n^${t === 2 ? 3 : 2}$ tend vers ${bon} et la parenthèse tend vers 1.`, `la limite est ${bon} : l'indétermination est levée.`)
  );
}

/** Quotients : on factorise par les termes dominants. */
function ratAuHasard() {
  const t = rint(1, 4);
  const a = pick([1, 2, 3, 4, 5, -2, -3]), c = pick([1, 2, 3, 4, 5]);
  let b = rint(-6, 6), d = rint(1, 7);
  if (b * c === a * d) b += 1;
  if (t === 1) return { F: `\\dfrac{${affN(a, b)}}{${affN(c, d)}}`, L: frac(a, c), v: a / c, piege: frac(b, d), raison: `on divise en haut et en bas par $n$ : la limite est $\\dfrac{${a}}{${c}}$` };
  if (t === 2) return { F: `\\dfrac{${co(a)}n^2${sg(b)}}{${co(c)}n^2${sg(d)}}`, L: frac(a, c), v: a / c, piege: frac(b, d), raison: `on divise par $n^2$ : la limite est $\\dfrac{${a}}{${c}}$` };
  if (t === 3) return { F: `\\dfrac{${affN(a, b)}}{n^2${sg(d)}}`, L: "0", v: 0, piege: frac(a, 1), raison: "le dénominateur, de degré 2, l'emporte sur le numérateur, de degré 1" };
  d = d || 1;
  return { F: `\\dfrac{${co(a)}n^2${sg(b)}}{${affN(c, d)}}`, L: a > 0 ? "+" : "-", v: NaN, piege: frac(a, c), raison: "le numérateur, de degré 2, l'emporte sur le dénominateur, de degré 1" };
}

function genLimRat() {
  const r = ratAuHasard();
  const bon = r.L === "+" ? PINF : r.L === "-" ? MINF : `$${r.L}$`;
  return qcm(
    pick([`Soit $u_n = ${r.F}$ pour tout $n \\in \\mathbb{N}$. Quelle est la limite de $(u_n)$ ?`, `On a « $\\dfrac{\\infty}{\\infty}$ » pour $u_n = ${r.F}$. Après factorisation, on trouve que $(u_n)$ tend vers :`, `Une chimiste modélise un rendement par $u_n = ${r.F}$. Sa limite est :`]),
    bon,
    choix(bon, [`$${r.piege}$`, val$(0), PINF, MINF, FI]),
    expl("pour un quotient de polynômes en $n$, on factorise en haut et en bas par le terme de plus haut degré.", "on compare les degrés, puis les coefficients dominants.", `${r.raison}.`, `la limite est ${bon}.`)
  );
}

function genLimRatCourt() {
  const [a, c] = pick([[2, 1], [3, 1], [1, 2], [3, 2], [5, 2], [6, 4], [3, 4], [7, 5], [-4, 2], [9, 3]] as const);
  let b = rint(-6, 6);
  const d = rint(1, 7);
  if (b * c === a * d) b += 1;
  const F = rint(1, 2) === 1 ? `\\dfrac{${affN(a, b)}}{${affN(c, d)}}` : `\\dfrac{${co(a)}n^2${sg(b)}}{${co(c)}n^2${sg(d)}}`;
  return court(
    pick([`Soit $u_n = ${F}$ pour tout $n \\in \\mathbb{N}$. Quelle est la limite de $(u_n)$ ? (Donne un nombre décimal.)`, `Calcule la limite de la suite définie par $u_n = ${F}$.`, `Un logiciel affiche les termes de $u_n = ${F}$. Vers quelle valeur se rapprochent-ils ?`]),
    a / c,
    expl("on factorise en haut et en bas par le terme de plus haut degré.", "les autres termes, divisés, tendent vers 0.", `la limite est le quotient des coefficients dominants : $\\dfrac{${a}}{${c}} = ${n(a / c)}$.`, `la limite est $${n(a / c)}$.`)
  );
}

/** Croissances comparées et formes plus difficiles. */
function genLimExpo() {
  const a = pick([2, 3, 4, 5, 6]);
  const fam: Array<[string, string, string, string[]]> = [
    [`\\dfrac{n^${pick([2, 3])}}{2^n}`, "$0$", "l'exponentielle $2^n$ l'emporte sur toute puissance de $n$", [PINF, "$1$", FI]],
    [`\\dfrac{2^n}{n^${pick([2, 3])}}`, PINF, "l'exponentielle $2^n$ l'emporte sur toute puissance de $n$", ["$0$", "$1$", FI]],
    ["ne^{-n}", "$0$", "$\\dfrac{n}{e^n}$ : l'exponentielle l'emporte", [PINF, "$1$", "$e$"]],
    [`\\dfrac{e^n}{n^${pick([2, 3])}}`, PINF, "l'exponentielle l'emporte sur toute puissance de $n$", ["$0$", "$1$", "$e$"]],
    ["\\dfrac{\\ln n}{n}", "$0$", "$n$ l'emporte sur $\\ln n$", [PINF, "$1$", FI]],
    [`\\sqrt{n^2 + ${a}n} - n`, `$${frac(a, 2)}$`, `on multiplie par la quantité conjuguée : $u_n = \\dfrac{${a}n}{\\sqrt{n^2 + ${a}n} + n}$, qui tend vers $\\dfrac{${a}}{2}$`, ["$0$", PINF, `$${a}$`]],
    [`\\dfrac{3^n - 2^n}{3^n}`, "$1$", "$u_n = 1 - \\left(\\dfrac{2}{3}\\right)^n$ et $\\left(\\dfrac{2}{3}\\right)^n$ tend vers 0", ["$0$", PINF, FI]],
    [`\\dfrac{${a}^n}{${a + 1}^n}`, "$0$", `$u_n = \\left(\\dfrac{${a}}{${a + 1}}\\right)^n$ avec $0 < \\dfrac{${a}}{${a + 1}} < 1$`, ["$1$", PINF, `$${frac(a, a + 1)}$`]],
    [`\\dfrac{${a + 1}^n}{${a}^n}`, PINF, `$u_n = \\left(\\dfrac{${a + 1}}{${a}}\\right)^n$ avec $\\dfrac{${a + 1}}{${a}} > 1$`, ["$1$", "$0$", `$${frac(a + 1, a)}$`]],
  ];
  const [F, bon, raison, pieges] = pick(fam);
  return qcm(
    pick([`Soit $u_n = ${F}$ pour tout entier $n \\ge 1$. Quelle est la limite de $(u_n)$ ?`, `Quelle est la limite en $+\\infty$ de la suite définie par $u_n = ${F}$ ($n \\ge 1$) ?`, `Un data scientist compare deux croissances avec $u_n = ${F}$ ($n \\ge 1$). Quand $n$ tend vers $+\\infty$, $u_n$ tend vers :`]),
    bon,
    pieges,
    expl("croissances comparées : $e^n$ (ou $q^n$ avec $q > 1$) l'emporte sur toute puissance de $n$, qui l'emporte sur $\\ln n$.", "on repère le terme qui « gagne », ou on transforme l'écriture.", `${raison}.`, `la limite est ${bon}.`)
  );
}

/* =========================================================
   LIMITE_SUITE_OPERATIONS
========================================================= */

const LIM = "\\lim\\limits_{n \\to +\\infty}";
const OPS_CTX = [
  "",
  "Une économiste étudie deux suites $(u_n)$ et $(v_n)$. ",
  "En physique, deux mesures sont modélisées par $(u_n)$ et $(v_n)$. ",
  "Un ingénieur combine deux signaux $(u_n)$ et $(v_n)$. ",
];

function genOpsFinies() {
  const a = rint(-6, 9), b = pick([1, 2, 4, 5, -2, -4, 3]);
  const k = pick([2, 3, 5]);
  const [E, v] = pick([
    ["u_n + v_n", a + b],
    ["u_n - v_n", a - b],
    ["u_n v_n", a * b],
    [`${k}u_n - v_n`, k * a - b],
    ["u_n^2 + v_n", a * a + b],
    ["\\dfrac{u_n}{v_n}", a / b],
  ] as Array<[string, number]>);
  if (!Number.isInteger(v * 1000)) return genOpsFinies();
  return court(
    `${pick(OPS_CTX)}On sait que $${LIM} u_n = ${n(a)}$ et $${LIM} v_n = ${n(b)}$. ${pick(["Que vaut", "Quelle est la valeur de"])} $${LIM} \\left(${E}\\right)$ ?`,
    v,
    expl("si $(u_n)$ et $(v_n)$ ont des limites finies, la limite d'une somme, d'un produit ou d'un quotient (dénominateur non nul) s'obtient en opérant sur les limites.", "on remplace $u_n$ et $v_n$ par leurs limites.", `$${E.replace(/u_n/g, `(${n(a)})`).replace(/v_n/g, `(${n(b)})`)} = ${n(v)}$.`, `la limite vaut $${n(v)}$.`)
  );
}

/** Limites infinies : règles opératoires et formes indéterminées. */
type Lim = number | "+" | "-" | "0+";
const ecrit = (l: Lim) => (l === "+" ? "+\\infty" : l === "-" ? "-\\infty" : l === "0+" ? "0" : n(l));
const OPS_INF = ["$+\\infty$", "$-\\infty$", "$0$", FI];

function genOpsInfini() {
  const a = pick([2, 3, 5, -2, -3, -4]);
  const cas: Array<[Lim, Lim, string, string, string]> = [
    [a, "+", "u_n + v_n", "$+\\infty$", "nombre + $(+\\infty)$ = $+\\infty$"],
    [a, "-", "u_n + v_n", "$-\\infty$", "nombre + $(-\\infty)$ = $-\\infty$"],
    [a, "+", "u_n v_n", a > 0 ? "$+\\infty$" : "$-\\infty$", `$${n(a)} \\times (+\\infty)$ : règle des signes`],
    [a, "-", "u_n v_n", a > 0 ? "$-\\infty$" : "$+\\infty$", `$${n(a)} \\times (-\\infty)$ : règle des signes`],
    [a, "+", "\\dfrac{u_n}{v_n}", "$0$", "un nombre divisé par une quantité infinie tend vers 0"],
    [a, "-", "\\dfrac{u_n}{v_n}", "$0$", "un nombre divisé par une quantité infinie tend vers 0"],
    ["+", "+", "u_n + v_n", "$+\\infty$", "$(+\\infty) + (+\\infty) = +\\infty$"],
    ["+", "-", "u_n v_n", "$-\\infty$", "$(+\\infty) \\times (-\\infty) = -\\infty$"],
    ["+", "+", "u_n - v_n", FI, "« $+\\infty - \\infty$ » est une forme indéterminée"],
    [0, "+", "u_n v_n", FI, "« $0 \\times \\infty$ » est une forme indéterminée"],
    ["+", "-", "\\dfrac{u_n}{v_n}", FI, "« $\\dfrac{\\infty}{\\infty}$ » est une forme indéterminée"],
    [a, "0+", "\\dfrac{u_n}{v_n}", a > 0 ? "$+\\infty$" : "$-\\infty$", `$${n(a)}$ divisé par une quantité positive qui tend vers 0`],
    ["-", "-", "u_n + v_n", "$-\\infty$", "$(-\\infty) + (-\\infty) = -\\infty$"],
  ];
  const [lu, lv, E, bon, raison] = pick(cas);
  const hyp = `$${LIM} u_n = ${ecrit(lu)}$ et $${LIM} v_n = ${ecrit(lv)}$${lv === "0+" ? " avec $v_n > 0$ pour tout $n$" : ""}`;
  return qcm(
    `${pick(OPS_CTX)}On sait que ${hyp}. ${pick(["Que peut-on dire de", "Quelle est"])} $${LIM} \\left(${E}\\right)$ ?`,
    bon,
    OPS_INF,
    expl("règles opératoires : on conclut directement, sauf dans les formes indéterminées « $\\infty - \\infty$ », « $0 \\times \\infty$ » et « $\\dfrac{\\infty}{\\infty}$ ».", "on applique la règle qui correspond aux deux limites.", `${raison}.`, bon === FI ? "on ne peut pas conclure directement : il faut transformer l'écriture." : `la limite est ${bon}.`)
  );
}

/** Expressions concrètes à limite finie (réponse courte). */
function genOpsExpr() {
  const a = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]), b = pick([2, 3, 4, 5]), c = pick([1, 2, 7]);
  const [F, v, raison] = pick([
    [`${n(a)} + \\dfrac{${b}}{n} - \\dfrac{${c}}{n^2}`, a, `$\\dfrac{${b}}{n}$ et $\\dfrac{${c}}{n^2}$ tendent vers 0`],
    [`\\left(${n(a)} + \\dfrac{1}{n}\\right)\\left(${b} - \\dfrac{${c}}{n}\\right)`, a * b, `produit des limites : $${n(a)} \\times ${b}$`],
    [`\\dfrac{${n(a * b)} + \\dfrac{${c}}{n}}{${b} + \\dfrac{1}{n^2}}`, a, `quotient des limites : $\\dfrac{${n(a * b)}}{${b}}$`],
    [`\\dfrac{${affN(b, c)}}{n}${sg(a)}`, a + b, `$\\dfrac{${affN(b, c)}}{n} = ${b} + \\dfrac{${c}}{n}$ tend vers ${b}`],
    [`${n(a)} - ${b}e^{-n}`, a, "$e^{-n}$ tend vers 0"],
  ] as Array<[string, number, string]>);
  return court(
    `${pick(["Soit", "On considère la suite définie par", "Une analyste étudie", "Un chercheur modélise une mesure par"])} $u_n = ${F}$, pour $n \\ge 1$. ${pick(["Quelle est la limite de $(u_n)$ ?", "Vers quel nombre tend $u_n$ ?", "Calcule la limite de $(u_n)$."])}`,
    v,
    expl("on utilise les limites de référence et les opérations sur les limites.", "on cherche la limite de chaque morceau.", `${raison}.`, `la limite est $${n(v)}$.`)
  );
}

/** Expressions concrètes à limite infinie (QCM). */
function genOpsExprInf() {
  const k = pick([2, 3, 5]);
  const [F, bon, raison] = pick([
    [`n^2 + \\sqrt{n}`, PINF, "somme de deux termes qui tendent vers $+\\infty$"],
    [`-n + \\dfrac{${k}}{n}`, MINF, "$-n$ tend vers $-\\infty$ et $\\dfrac{" + k + "}{n}$ vers 0"],
    [`(${k} - n)(n + 1)`, MINF, "produit d'un terme qui tend vers $-\\infty$ et d'un terme qui tend vers $+\\infty$"],
    [`e^n + n`, PINF, "somme de deux termes qui tendent vers $+\\infty$"],
    [`\\dfrac{1}{n} - n^2`, MINF, "$\\dfrac{1}{n}$ tend vers 0 et $-n^2$ vers $-\\infty$"],
    [`\\dfrac{${k}}{n^2} + \\dfrac{1}{n}`, "$0$", "somme de deux termes qui tendent vers 0"],
    [`n\\left(${k} - \\dfrac{1}{n}\\right)`, PINF, `$n$ tend vers $+\\infty$ et la parenthèse vers $${k} > 0$`],
    [`\\dfrac{${k}}{\\sqrt{n}}`, "$0$", "un nombre divisé par une quantité qui tend vers $+\\infty$"],
  ] as Array<[string, string, string]>);
  return qcm(
    `${pick(["Soit", "On considère", "Une élève étudie"])} $u_n = ${F}$, pour $n \\ge 1$. ${pick(["Quelle est la limite de $(u_n)$ ?", "Quand $n$ tend vers $+\\infty$ :", "La suite $(u_n)$ tend vers :"])}`,
    bon,
    OPS_INF,
    expl("on applique les opérations sur les limites, morceau par morceau.", "on vérifie qu'on n'est pas dans une forme indéterminée.", `${raison}.`, `la limite est ${bon}.`)
  );
}

/** Formes indéterminées levées. */
function genOpsFI() {
  const a = pick([2, 3, 4, 5, 6]);
  const [F, bon, forme, raison, pieges] = pick([
    [`n^2 - ${a}n`, PINF, "$\\infty - \\infty$", `$u_n = n^2\\left(1 - \\dfrac{${a}}{n}\\right)$`, [MINF, "$0$", FI]],
    [`n - ${a}\\sqrt{n}`, PINF, "$\\infty - \\infty$", `$u_n = n\\left(1 - \\dfrac{${a}}{\\sqrt{n}}\\right)$`, [MINF, "$0$", FI]],
    [`\\dfrac{${a}n^2 + n}{n^2 + 1}`, `$${a}$`, "$\\dfrac{\\infty}{\\infty}$", `on divise par $n^2$ : $u_n = \\dfrac{${a} + \\dfrac{1}{n}}{1 + \\dfrac{1}{n^2}}$`, [PINF, "$1$", FI]],
    [`\\sqrt{n + ${a}} - \\sqrt{n}`, "$0$", "$\\infty - \\infty$", `quantité conjuguée : $u_n = \\dfrac{${a}}{\\sqrt{n + ${a}} + \\sqrt{n}}$`, [PINF, `$${a}$`, FI]],
    [`\\dfrac{${a}n}{n + 1} - ${a}`, "$0$", "$\\dfrac{\\infty}{\\infty}$", `$u_n = -\\dfrac{${a}}{n + 1}$`, [`$${a}$`, MINF, FI]],
    [`\\dfrac{n^2 - 1}{n - 1}`, PINF, "$\\dfrac{\\infty}{\\infty}$", "pour $n \\ge 2$, $u_n = n + 1$", ["$1$", "$0$", FI]],
  ] as Array<[string, string, string, string, string[]]>);
  return qcm(
    `La suite $u_n = ${F}$ (pour $n \\ge 2$) donne une forme indéterminée « ${forme} ». ${pick(["Après l'avoir levée, on trouve que $(u_n)$ tend vers :", "Quelle est finalement sa limite ?", "Un élève factorise. Que trouve-t-il pour la limite ?"])}`,
    bon,
    pieges,
    expl("une forme indéterminée ne veut pas dire « pas de limite » : il faut transformer l'écriture.", "on factorise par le terme dominant, ou on utilise la quantité conjuguée.", `${raison}.`, `la limite est ${bon}.`)
  );
}

/* =========================================================
   LIMITE_SUITE_COMPARAISON
========================================================= */

const NC = "on ne peut pas conclure";
const COMP_CHOIX = ["$(u_n)$ tend vers $+\\infty$", "$(u_n)$ tend vers $-\\infty$", "$(u_n)$ converge vers $0$", NC];
const COMP_CTX = [
  "",
  "Un statisticien compare deux suites. ",
  "Une biologiste encadre la taille d'une population. ",
  "Un ingénieur réseau majore un temps de réponse. ",
  "Une actuaire compare deux modèles. ",
];

/** Théorème de comparaison : minorée par une suite qui tend vers +∞, etc. */
function genCompMinore() {
  const k = pick([1, 2, 3]), b = pick([1, 2, 5]);
  const [g, sens, limG] = pick([
    [affN(k, b), "\\ge", "+"],
    [`n^2`, "\\ge", "+"],
    [`\\sqrt{n}`, "\\ge", "+"],
    [affN(-k, b), "\\le", "-"],
    [`-n^2 + ${b}`, "\\le", "-"],
    [affN(k, b), "\\le", "+"],
    [affN(-k, b), "\\ge", "-"],
    [`\\dfrac{${b}}{n}`, "\\ge", "0"],
  ] as Array<[string, string, string]>);
  let bon: string, raison: string;
  if (sens === "\\ge" && limG === "+") { bon = COMP_CHOIX[0]; raison = "$(u_n)$ est minorée par une suite qui tend vers $+\\infty$ : théorème de comparaison"; }
  else if (sens === "\\le" && limG === "-") { bon = COMP_CHOIX[1]; raison = "$(u_n)$ est majorée par une suite qui tend vers $-\\infty$ : théorème de comparaison"; }
  else { bon = NC; raison = sens === "\\le" ? "être plus petite qu'une suite qui tend vers $+\\infty$ ne donne aucune limite" : limG === "-" ? "être plus grande qu'une suite qui tend vers $-\\infty$ ne donne aucune limite" : "être plus grande qu'une suite qui tend vers 0 ne donne pas la limite"; }
  return qcm(
    `${pick(COMP_CTX)}Pour tout entier $n \\ge 1$, on a $u_n ${sens} ${g}$. ${pick(["Que peut-on en déduire ?", "Que peut-on conclure sur $(u_n)$ ?", "Quelle conclusion est correcte ?"])}`,
    bon,
    COMP_CHOIX,
    expl("si $u_n \\ge v_n$ et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$ ; si $u_n \\le v_n$ et $v_n \\to -\\infty$, alors $u_n \\to -\\infty$.", `on cherche la limite de $${g}$ et le sens de l'inégalité.`, `${raison}.`, bon === NC ? "on ne peut pas conclure avec cette seule inégalité." : `${bon}.`)
  );
}

/** Gendarmes : encadrement explicite, limite commune (réponse courte). */
function genGendarmes() {
  const L = pick([-3, -2, -1, 1, 2, 3, 4, 5, 7]), a = pick([1, 2, 3, 5]), b = pick([1, 2, 4]);
  const [inf, sup] = pick([
    [`${n(L)} - \\dfrac{${a}}{n}`, `${n(L)} + \\dfrac{${b}}{n}`],
    [`${n(L)} - \\dfrac{${a}}{n^2}`, `${n(L)} + \\dfrac{${b}}{\\sqrt{n}}`],
    [`\\dfrac{${co(L)}n - ${a}}{n}`, `\\dfrac{${co(L)}n + ${b}}{n}`],
    [`${n(L)} - e^{-n}`, `${n(L)} + \\dfrac{${b}}{n + 1}`],
  ] as Array<[string, string]>);
  return court(
    `${pick(COMP_CTX)}Pour tout $n \\ge 1$ : $${inf} \\le u_n \\le ${sup}$. ${pick(["Quelle est la limite de $(u_n)$ ?", "Vers quel nombre converge $(u_n)$ ?", "Donne la limite de $(u_n)$."])}`,
    L,
    expl("théorème des gendarmes : si $v_n \\le u_n \\le w_n$ et si $(v_n)$ et $(w_n)$ ont la même limite $\\ell$, alors $(u_n)$ converge vers $\\ell$.", "on calcule la limite des deux suites qui encadrent.", `les deux bornes tendent vers $${n(L)}$.`, `$(u_n)$ converge vers $${n(L)}$.`)
  );
}

/** Gendarmes : piège des bornes de limites différentes. */
function genGendarmesPiege() {
  const L = pick([1, 2, 3, 4]), M = L + pick([1, 2, 3]), a = pick([1, 2, 5]);
  const memes = Math.random() < 0.5;
  const sup = memes ? `${L} + \\dfrac{${a}}{n}` : `${M} + \\dfrac{${a}}{n}`;
  const inf = `${L} - \\dfrac{1}{n}`;
  const bon = memes ? `$(u_n)$ converge vers $${L}$` : "on ne peut pas conclure sur la limite";
  return qcm(
    `${pick(COMP_CTX)}Pour tout $n \\ge 1$ : $${inf} \\le u_n \\le ${sup}$. ${pick(["Que peut-on affirmer ?", "Quelle affirmation est vraie ?"])}`,
    bon,
    [`$(u_n)$ converge vers $${L}$`, `$(u_n)$ converge vers $${M}$`, "on ne peut pas conclure sur la limite", memes ? "$(u_n)$ n'a pas de limite" : `$(u_n)$ converge vers $${n((L + M) / 2)}$`],
    expl("le théorème des gendarmes ne s'applique que si les deux bornes ont la MÊME limite.", "on calcule la limite de chaque borne.", memes ? `les deux bornes tendent vers $${L}$.` : `les bornes tendent vers $${L}$ et $${M}$ : limites différentes.`, memes ? `$(u_n)$ converge vers $${L}$.` : "l'encadrement ne donne pas la limite (on sait seulement qu'elle reste entre ces valeurs, si elle existe).")
  );
}

/** Encadrement d'un sinus ou d'un cosinus. */
function genEncadrementTrig() {
  const a = pick([1, 2, 3, 5]), L = pick([0, 1, 2, -1, 4]);
  const tr = pick(["\\sin(n)", "\\cos(n)", "(-1)^n"]);
  const [F, bon, raison] = pick([
    [`${L === 0 ? "" : `${n(L)} + `}\\dfrac{${co(a)}${tr}}{n}`, `$${n(L)}$`, `$-\\dfrac{${a}}{n} \\le \\dfrac{${co(a)}${tr}}{n} \\le \\dfrac{${a}}{n}$, et ces bornes tendent vers 0`],
    [`${L === 0 ? "" : `${n(L)} + `}\\dfrac{${tr}}{n^2}`, `$${n(L)}$`, `$-\\dfrac{1}{n^2} \\le \\dfrac{${tr}}{n^2} \\le \\dfrac{1}{n^2}$, et ces bornes tendent vers 0`],
    [`n + ${co(a)}${tr}`, PINF, `$u_n \\ge n - ${a}$, qui tend vers $+\\infty$`],
    [`-n^2 + ${tr}`, MINF, `$u_n \\le -n^2 + 1$, qui tend vers $-\\infty$`],
  ] as Array<[string, string, string]>);
  return qcm(
    `On pose $u_n = ${F}$ pour $n \\ge 1$. ${pick(["Quelle est la limite de $(u_n)$ ?", "Que vaut la limite de $(u_n)$ ?", "La suite $(u_n)$ :"])}`,
    bon,
    [`$${n(L)}$`, `$${n(L + a)}$`, PINF, MINF, AUCUNE, `$${n(L + 1)}$`],
    expl(`${tr.includes("-1") ? "$(-1)^n$" : `$${tr}$`} reste entre $-1$ et $1$ : on encadre $u_n$ puis on utilise les gendarmes ou la comparaison.`, "on encadre le terme qui oscille.", `${raison}.`, `la limite est ${bon}.`)
  );
}

/** Comparaison concrète : quelle inégalité permet de conclure ? */
function genCompConcret() {
  const k = pick([2, 3, 5]);
  const [F, bon, pieges, raison] = pick([
    [`n^2 + ${k}\\cos(n)`, `$u_n \\ge n^2 - ${k}$`, [`$u_n \\le n^2 + ${k}$`, `$u_n \\ge -${k}$`, `$u_n \\le ${k}$`], `$n^2 - ${k}$ tend vers $+\\infty$`],
    [`${k}n + (-1)^n`, `$u_n \\ge ${k}n - 1$`, [`$u_n \\le ${k}n + 1$`, `$u_n \\ge -1$`, `$u_n \\le ${k}n$`], `$${k}n - 1$ tend vers $+\\infty$`],
    [`-n + ${k}\\sin(n)`, `$u_n \\le -n + ${k}$`, [`$u_n \\ge -n - ${k}$`, `$u_n \\le ${k}$`, `$u_n \\ge -${k}$`], `$-n + ${k}$ tend vers $-\\infty$`],
    [`\\sqrt{n} - ${k}\\sin(n)`, `$u_n \\ge \\sqrt{n} - ${k}$`, [`$u_n \\le \\sqrt{n} + ${k}$`, `$u_n \\ge -${k}$`, `$u_n \\le \\sqrt{n}$`], `$\\sqrt{n} - ${k}$ tend vers $+\\infty$`],
  ] as Array<[string, string, string[], string]>);
  return qcm(
    `${pick(COMP_CTX)}On veut la limite de $u_n = ${F}$. ${pick(["Quelle inégalité, vraie pour tout $n \\ge 1$, permet de conclure ?", "Quelle inégalité vraie suffit pour trouver la limite ?"])}`,
    bon,
    pieges,
    expl("pour montrer $u_n \\to +\\infty$ on MINORE $u_n$ par une suite qui tend vers $+\\infty$ ; pour $-\\infty$ on la MAJORE.", "l'inégalité doit être vraie ET aller dans le bon sens.", `${raison}.`, `l'inégalité utile est ${bon}.`)
  );
}

/* =========================================================
   LIMITE_SUITE_MONOTONE_BORNEE
========================================================= */

const CONV_INC = "elle converge, mais on ne connaît pas encore sa limite";
const TCM_CTX: Array<[string, string]> = [
  ["Une biologiste montre que la suite $(u_n)$ des effectifs d'une population de truites", "truites"],
  ["Un banquier montre que la suite $(u_n)$ des montants d'un placement", "euros"],
  ["Une pharmacienne montre que la suite $(u_n)$ des quantités de médicament dans le sang", "mg"],
  ["Un ingénieur montre que la suite $(u_n)$ des températures d'un four", "degrés"],
  ["Une informaticienne montre que la suite $(u_n)$ des temps de calcul", "ms"],
  ["Un élève montre que la suite $(u_n)$", ""],
  ["Une écologue montre que la suite $(u_n)$ des surfaces de forêt", "hectares"],
];

function genTCM() {
  const M = pick([10, 20, 50, 100, 500, 1000]);
  const [ctx] = pick(TCM_CTX);
  const cas: Array<[string, string, string]> = [
    [`est croissante et majorée par $${M}$`, CONV_INC, "croissante et majorée : elle converge (théorème de convergence monotone)"],
    [`est décroissante et minorée par $${M}$`, CONV_INC, "décroissante et minorée : elle converge (théorème de convergence monotone)"],
    ["est croissante et n'est pas majorée", "elle tend vers $+\\infty$", "une suite croissante non majorée tend vers $+\\infty$"],
    ["est décroissante et n'est pas minorée", "elle tend vers $-\\infty$", "une suite décroissante non minorée tend vers $-\\infty$"],
    [`est croissante et minorée par $${M}$`, NC, "une suite croissante est toujours minorée par son premier terme : cela n'apprend rien"],
    [`est décroissante et majorée par $${M}$`, NC, "une suite décroissante est toujours majorée par son premier terme : cela n'apprend rien"],
  ];
  const k = rint(0, 9);
  const [hyp, bon, raison] = cas[k < 3 ? 0 : k < 6 ? 1 : k - 4];
  const infini = hyp.includes("décroissante") ? "elle tend vers $-\\infty$" : "elle tend vers $+\\infty$";
  return qcm(
    `${ctx} ${hyp}. ${pick(["Que peut-on en conclure ?", "Que permet d'affirmer le théorème de convergence monotone ?", "Quelle conclusion est correcte ?"])}`,
    bon,
    [CONV_INC, `elle converge vers $${M}$`, infini, NC],
    expl("théorème de convergence monotone : une suite croissante et majorée (ou décroissante et minorée) converge ; il ne donne PAS la valeur de la limite.", "on regarde si le sens de variation et la borne vont ensemble.", `${raison}.`, bon === CONV_INC ? `la suite converge, mais rien ne dit que sa limite est $${M}$.` : `${bon}.`)
  );
}

const TCM_PREF = ["", "Dans un exercice de bac, ", "En TD, ", "Pour son exposé, une élève note : ", "Un professeur rappelle : ", "Dans un devoir, "];
const TCM_SUITE = ["une suite", "la suite des effectifs d'une colonie de fourmis", "la suite des soldes d'un compte", "la suite des concentrations d'un polluant", "la suite des vitesses d'un drone", "la suite des abonnés d'une chaîne"];

function genTCMHypo() {
  const t = rint(0, 2);
  if (t === 0) {
    const croiss = Math.random() < 0.5;
    return qcm(
      `${pick(TCM_PREF)}on veut appliquer le théorème de convergence monotone à ${pick(TCM_SUITE)}, dont on sait qu'elle est ${croiss ? "croissante" : "décroissante"}. ${pick(["Que faut-il encore démontrer ?", "Quelle propriété manque ?", "Que reste-t-il à prouver ?"])}`.replace(/^o/, "O"),
      croiss ? "qu'elle est majorée" : "qu'elle est minorée",
      ["qu'elle est majorée", "qu'elle est minorée", "que tous ses termes sont positifs", "que sa limite est finie"],
      expl("le théorème demande le sens de variation ET une borne du bon côté.", croiss ? "une suite croissante doit être majorée." : "une suite décroissante doit être minorée.", "« sa limite est finie » est justement ce qu'on veut prouver.", croiss ? "il faut montrer qu'elle est majorée." : "il faut montrer qu'elle est minorée.")
    );
  }
  if (t === 1) {
    return qcm(
      `${pick(TCM_PREF)}${pick(["laquelle de ces conditions suffit pour que", "quelle condition garantit que", "quelle hypothèse permet d'affirmer que"])} ${pick(TCM_SUITE)} ${pick(["converge ?", "a une limite finie ?"])}`.replace(/^l/, "L").replace(/^q/, "Q"),
      pick(["être croissante et majorée", "être décroissante et minorée"]),
      ["être croissante et minorée", "être décroissante et majorée", "être majorée", "être bornée", "être croissante"],
      expl("théorème de convergence monotone.", "il faut le sens de variation ET la borne du bon côté.", "une suite bornée peut osciller, comme $(-1)^n$ ; une suite croissante peut tendre vers $+\\infty$.", "seule la condition monotone + borne du bon côté suffit.")
    );
  }
  const M = pick([3, 5, 10, 100]);
  return qcm(
    `${pick(TCM_PREF)}${pick(TCM_SUITE)} $(u_n)$ est croissante et majorée par $${M}$. ${pick(["Quelle affirmation est FAUSSE ?", "Laquelle de ces phrases est fausse ?", "Une seule phrase est fausse. Laquelle ?"])}`.replace(/^(.)/, (x) => x.toUpperCase()).replace(/^Une suite \$\(u_n\)\$/, "Une suite $(u_n)$"),
    `sa limite est forcément $${M}$`,
    [`$u_n \\le ${M}$ pour tout $n$`, "elle converge", `sa limite $\\ell$ vérifie $\\ell \\le ${M}$`, "elle est minorée par $u_0$"],
    expl("un majorant n'est pas forcément la limite.", `$${M}$ est UN majorant ; $${M + 1}$ en est un autre.`, `la limite est le plus petit des majorants, qui peut être plus petit que $${M}$.`, `« sa limite est forcément $${M}$ » est faux.`)
  );
}

/** Où se trouve la limite ? */
function genTCMLimite() {
  const croiss = Math.random() < 0.5;
  const u0 = pick([1, 2, 3, 5]), B = u0 + pick([4, 6, 9, 15]);
  const [lo, hi] = croiss ? [u0, B] : [u0 - pick([2, 3, 5]), B];
  const bon = croiss ? `$${lo} \\le \\ell \\le ${hi}$` : `$${lo} \\le \\ell \\le ${hi}$`;
  const [qui] = pick(TCM_CTX);
  const fin = pick(["Que sait-on de $\\ell$ ?", "Quel encadrement de $\\ell$ est sûr ?", "Où se trouve forcément $\\ell$ ?"]);
  const txt = croiss
    ? `${qui} est croissante, avec $u_0 = ${u0}$ et $u_n \\le ${B}$ pour tout $n$. Elle converge donc vers un réel $\\ell$. ${fin}`
    : `${qui} est décroissante, avec $u_0 = ${B}$ et $u_n \\ge ${lo}$ pour tout $n$. Elle converge donc vers un réel $\\ell$. ${fin}`;
  return qcm(
    txt,
    bon,
    [croiss ? `$\\ell = ${hi}$` : `$\\ell = ${lo}$`, croiss ? `$\\ell > ${hi}$` : `$\\ell < ${lo}$`, croiss ? `$\\ell < ${lo}$` : `$\\ell > ${hi}$`],
    expl("si $(u_n)$ converge vers $\\ell$ et $a \\le u_n \\le b$ pour tout $n$, alors $a \\le \\ell \\le b$.", croiss ? "croissante : $u_0 \\le u_n$ ; majorée : $u_n \\le " + B + "$." : "décroissante : $u_n \\le u_0$ ; minorée : $u_n \\ge " + lo + "$.", "on passe à la limite dans les inégalités (larges).", `${bon}, sans pouvoir dire mieux pour l'instant.`)
  );
}

/** Situation récurrente : on a prouvé « monotone + borne » ; que conclure ? */
const SIT_TCM = [
  "Une apicultrice modélise le nombre de ruches (en dizaines) par",
  "Un hydrologue modélise le volume d'un réservoir (en milliers de m³) par",
  "Une infirmière modélise la quantité de médicament dans le sang (en mg) par",
  "Un gestionnaire modélise le nombre d'abonnés (en milliers) par",
  "Une climatologue modélise une température moyenne (en °C) par",
  "On considère la suite définie par",
];

function genTCMSituation() {
  const a = pick([0.5, 0.2, 0.8, 0.25, 0.75, 0.4, 0.6]), L = pick([4, 5, 8, 10, 12, 20]);
  const b = rond(L * (1 - a));
  if (!Number.isInteger(rond(b * 100))) return genTCMSituation();
  const croiss = Math.random() < 0.5;
  const u0 = croiss ? L - pick([2, 3, 4]) : L + pick([2, 5, 8]);
  const B = croiss ? L + pick([1, 2, 5, 10]) : L - pick([1, 2, 3]);
  const bon = croiss ? `$(u_n)$ converge vers un réel $\\ell \\le ${n(B)}$` : `$(u_n)$ converge vers un réel $\\ell \\ge ${n(B)}$`;
  return qcm(
    `${pick(SIT_TCM)} $u_0 = ${n(u0)}$ et $u_{n+1} = ${n(a)}u_n + ${n(b)}$. On a démontré par récurrence que $(u_n)$ est ${croiss ? `croissante et que $u_n \\le ${n(B)}$` : `décroissante et que $u_n \\ge ${n(B)}$`} pour tout $n$. ${pick(["Que peut-on conclure ?", "Quelle conclusion est juste à ce stade ?", "Que permet d'affirmer le théorème de convergence monotone ?"])}`,
    bon,
    [`$(u_n)$ converge vers $${n(B)}$`, croiss ? "$(u_n)$ tend vers $+\\infty$" : "$(u_n)$ tend vers $-\\infty$", "on ne peut pas conclure", `$(u_n)$ converge vers $${n(u0)}$`],
    expl("théorème de convergence monotone : croissante et majorée (ou décroissante et minorée) donne la convergence.", `la borne $${n(B)}$ donne seulement $\\ell ${croiss ? "\\le" : "\\ge"} ${n(B)}$.`, `pour la valeur, on résoudrait $\\ell = ${n(a)}\\ell + ${n(b)}$, d'où $\\ell = ${n(L)}$, différent de $${n(B)}$.`, `${bon}.`)
  );
}

/** Exemple concret : le majorant n'est pas la limite. */
function genTCMExemple() {
  const L = pick([1, 2, 3, 4, 5, 10]), c = pick([1, 2, 3, 5]), e = pick([1, 2, 5]);
  const croiss = Math.random() < 0.5;
  const F = croiss ? `${n(L)} - \\dfrac{${c}}{n + 1}` : `${n(L)} + \\dfrac{${c}}{n + 1}`;
  const borne = croiss ? L + e : L - e;
  const u0 = croiss ? L - c : L + c;
  return qcm(
    `${pick(["Soit ", "Une ingénieure modélise une vitesse par ", "Un économiste modélise un prix par "])}$u_n = ${F}$. ${croiss ? `Cette suite est croissante et majorée par $${n(borne)}$` : `Cette suite est décroissante et minorée par $${n(borne)}$`}. ${pick(["Quelle est sa limite ?", "Vers quoi converge-t-elle ?"])}`,
    `$${n(L)}$`,
    [`$${n(borne)}$`, `$${n(u0)}$`, croiss ? PINF : MINF, `$${n(L + (croiss ? -e : e))}$`],
    expl("le théorème de convergence monotone dit seulement que la suite converge ; pour trouver la limite, on la calcule.", `$\\dfrac{${c}}{n + 1}$ tend vers 0.`, `donc $u_n$ tend vers $${n(L)}$ ; la borne $${n(borne)}$ n'est pas la limite.`, `la limite est $${n(L)}$.`)
  );
}

/** Point fixe après convergence (réponse courte). */
function genTCMPointFixe() {
  const a = pick([0.5, 0.2, 0.8, 0.25, 0.75, 0.6, 0.4]), L = pick([2, 4, 5, 8, 10, 20, 40]);
  const b = rond(L * (1 - a));
  if (!Number.isInteger(b * 100)) return genTCMPointFixe();
  const u0 = pick([0, 1, L / 2, L + 4]);
  const croiss = u0 < L;
  return court(
    `$u_0 = ${n(u0)}$ et $u_{n+1} = ${n(a)}u_n + ${n(b)}$. On a démontré par récurrence que $(u_n)$ est ${croiss ? `croissante et majorée par $${n(L + 5)}$` : `décroissante et minorée par $${n(L - 1)}$`}. Elle converge donc vers $\\ell$, qui vérifie $\\ell = ${n(a)}\\ell + ${n(b)}$. ${pick(["Que vaut $\\ell$ ?", "Calcule $\\ell$."])}`,
    L,
    expl("si $u_{n+1} = f(u_n)$ avec $f$ continue et si $(u_n)$ converge vers $\\ell$, alors $\\ell = f(\\ell)$.", `on résout $\\ell = ${n(a)}\\ell + ${n(b)}$ : $${n(rond(1 - a))}\\ell = ${n(b)}$.`, `$\\ell = ${n(b)} \\div ${n(rond(1 - a))} = ${n(L)}$.`, `la limite est $${n(L)}$ (et non le ${croiss ? "majorant" : "minorant"} donné).`)
  );
}

/* =========================================================
   LIMITE_SUITE_DEFI
========================================================= */

/** Équation vérifiée par la limite. */
function genDefiEq() {
  const a = pick([2, 3, 4, 5]), b = pick([1, 2, 3, 6]), h = pick([0.5, 0.2, 0.25]);
  const [f, bon, pieges] = pick([
    [`${n(h)}u_n + ${b}`, `$\\ell = ${n(h)}\\ell + ${b}$`, [`$\\ell = ${n(h)} + ${b}$`, `$\\ell = ${n(h)}\\ell$`, `$${n(h)}\\ell + ${b} = 0$`]],
    [`\\sqrt{${a}u_n + ${b}}`, `$\\ell = \\sqrt{${a}\\ell + ${b}}$`, [`$\\ell = \\sqrt{${a} + ${b}}$`, `$\\ell = \\sqrt{${a}\\ell} + ${b}$`, `$\\sqrt{${a}\\ell + ${b}} = 0$`]],
    [`\\dfrac{${a}u_n}{u_n + ${b}}`, `$\\ell = \\dfrac{${a}\\ell}{\\ell + ${b}}$`, [`$\\ell = \\dfrac{${a}}{${b}}$`, `$\\ell = \\dfrac{${a}\\ell}{${b}}$`, `$\\dfrac{${a}\\ell}{\\ell + ${b}} = 0$`]],
    [`\\dfrac{u_n}{2} + \\dfrac{${b}}{u_n}`, `$\\ell = \\dfrac{\\ell}{2} + \\dfrac{${b}}{\\ell}$`, [`$\\ell = \\dfrac{1}{2} + ${b}$`, `$\\ell = \\dfrac{\\ell}{2}$`, `$\\dfrac{\\ell}{2} + \\dfrac{${b}}{\\ell} = 0$`]],
  ] as Array<[string, string, string[]]>);
  return qcm(
    `${pick(["", "Dans un algorithme de calcul, ", "Un modèle de population donne ", "Une ingénieure en informatique programme ", "En économie, on étudie ", "Un biologiste modélise une culture par "])}$u_0 = ${pick([1, 2, 3])}$ et $u_{n+1} = ${f}$. On admet que $(u_n)$ converge vers $\\ell$ (avec $\\ell > 0$). ${pick(["Quelle équation vérifie $\\ell$ ?", "Quelle égalité permet de trouver $\\ell$ ?"])}`,
    bon,
    pieges,
    expl("si $u_{n+1} = f(u_n)$, $f$ continue, et $(u_n)$ converge vers $\\ell$, alors $\\ell = f(\\ell)$.", "on fait tendre $n$ vers $+\\infty$ des deux côtés : $u_n \\to \\ell$ et $u_{n+1} \\to \\ell$.", "on remplace donc $u_n$ ET $u_{n+1}$ par $\\ell$.", `l'équation est ${bon}.`)
  );
}

/** Limite d'une suite affine via la suite auxiliaire (réponse courte). */
function genDefiLim() {
  const a = pick([0.5, 0.2, 0.8, 0.25, 0.75, 0.4, 0.9]), L = pick([3, 4, 5, 8, 10, 12, 20, 50]);
  const b = rond(L * (1 - a));
  if (!Number.isInteger(b * 100)) return genDefiLim();
  const u0 = pick([0, 1, 2, L + 10]);
  if (u0 === L) return genDefiLim();
  const [ctx, unite] = pick([
    ["", ""],
    [`Un lac contient $${n(u0)}$ tonnes de poissons ; chaque année il en reste $${n(a * 100)}\\,\\%$ et on en ajoute $${n(b)}$ tonnes. `, ""],
    [`Un abonnement compte $${n(u0)}$ milliers d'inscrits ; chaque mois $${n(rond((1 - a) * 100))}\\,\\%$ partent et $${n(b)}$ milliers arrivent. `, ""],
    [`Une pharmacienne suit un traitement : $${n(u0)}$ mg au départ, le corps garde $${n(a * 100)}\\,\\%$ chaque jour et on injecte $${n(b)}$ mg. `, ""],
  ] as Array<[string, string]>);
  void unite;
  const avecV = Math.random() < 0.5;
  return court(
    `${ctx}On modélise par $u_0 = ${n(u0)}$ et $u_{n+1} = ${n(a)}u_n + ${n(b)}$.${avecV ? ` On pose $v_n = u_n - ${n(L)}$ : $(v_n)$ est géométrique de raison $${n(a)}$.` : ""} ${pick(["Quelle est la limite de $(u_n)$ ?", "Vers quelle valeur se stabilise $u_n$ ?"])}`,
    L,
    expl("pour $u_{n+1} = au_n + b$ avec $0 < a < 1$ : $v_n = u_n - \\ell$ est géométrique de raison $a$, donc tend vers 0.", `$\\ell = ${n(a)}\\ell + ${n(b)}$ donne $\\ell = ${n(L)}$.`, `$v_n = (u_0 - ${n(L)}) \\times ${n(a)}^n \\to 0$ car $0 < ${n(a)} < 1$.`, `$u_n$ tend vers $${n(L)}$, quel que soit $u_0$.`)
  );
}

/** Seuil : à partir de quel rang u_n est proche de sa limite ? */
function genDefiSeuilLim() {
  const L = pick([5, 10, 20, 100]), c = pick([2, 4, 5, 10]), q = pick([0.5, 0.8, 0.9, 0.6]), eps = pick([0.01, 0.05, 0.1, 0.5]);
  let N = 0;
  while (c * q ** N >= eps) N++;
  return court(
    `${pick(["", "Un technicien règle un capteur. ", "Une chimiste suit une concentration. ", "Une kinésithérapeute suit l'amplitude d'un mouvement. ", "Un ingénieur du son règle un volume. ", "Une agronome suit la hauteur d'une culture. "])}On a $u_n = ${n(L)} - ${c} \\times ${n(q)}^n$. Sa limite est $${n(L)}$. ${pick([`Quel est le plus petit entier $n$ tel que $${n(L)} - u_n < ${n(eps)}$ ?`, `À partir de quel rang $n$ a-t-on $u_n > ${n(rond(L - eps))}$ ?`])}`,
    N,
    expl(`l'écart à la limite est $${n(L)} - u_n = ${c} \\times ${n(q)}^n$, qui décroît vers 0.`, `on cherche le premier $n$ tel que $${c} \\times ${n(q)}^n < ${n(eps)}$ (logarithme ou calculatrice).`, `pour $n = ${N - 1}$ : $${n(rond(c * q ** (N - 1)))}$ ; pour $n = ${N}$ : $${n(rond(c * q ** N))}$.`, `le rang cherché est $${N}$.`)
  );
}

/** Somme géométrique : limite (réponse courte). */
function genDefiSommeGeo() {
  const a = pick([1, 2, 3, 4, 5, 6, 10]), q = pick([0.5, 0.2, 0.25, 0.75, 0.8, 0.9, 0.6, 0.4]);
  const S = a / (1 - q);
  if (!Number.isInteger(rond(S * 100))) return genDefiSommeGeo();
  const ctx = pick([
    "",
    `Une balle rebondit : chaque trajet vaut $${n(q)}$ fois le précédent, le premier fait $${a}$ m. `,
    `Un médicament : la première dose est de $${a}$ mg, puis chaque dose vaut $${n(q)}$ fois la précédente. `,
    `Une entreprise verse $${a}$ milliers d'euros, puis chaque année $${n(q)}$ fois le montant précédent. `,
  ]);
  return court(
    `${ctx}On pose $S_n = \\displaystyle\\sum_{k=0}^{n} ${a} \\times ${n(q)}^k$. ${pick(["Quelle est la limite de $(S_n)$ ?", "Vers quel nombre converge $(S_n)$ ?"])}`,
    rond(S),
    expl(`somme des termes d'une suite géométrique : $S_n = ${a} \\times \\dfrac{1 - ${n(q)}^{n+1}}{1 - ${n(q)}}$.`, `$${n(q)}^{n+1}$ tend vers 0 car $0 < ${n(q)} < 1$.`, `$S_n \\to \\dfrac{${a}}{1 - ${n(q)}} = \\dfrac{${a}}{${n(rond(1 - q))}} = ${n(rond(S))}$.`, `la limite est $${n(rond(S))}$.`)
  );
}

/** Résoudre ℓ = f(ℓ) ne suffit pas : il faut savoir si la suite converge. */
function genDefiConclure() {
  const a = Math.random() < 0.5 ? pick([0.5, 0.2, 0.25, 0.4, 0.8]) : pick([2, 3]), L = pick([1, 2, 3, 4, 5, 10]);
  const b = rond(L * (1 - a));
  if (!Number.isInteger(b * 100)) return genDefiConclure();
  const u0 = L + pick([-3, -2, -1, 1, 2, 3, 5]);
  const bon = a < 1 ? `$(u_n)$ converge vers $${n(L)}$` : u0 > L ? "$(u_n)$ tend vers $+\\infty$" : "$(u_n)$ tend vers $-\\infty$";
  return qcm(
    `${pick(["", "Dans un exercice sur une population de bactéries, ", "Un modèle de trésorerie d'une association donne ", "En TD, ", "Un économiste propose le modèle ", "Pour un jeu vidéo, une développeuse règle un score par "])}$u_0 = ${n(u0)}$ et $u_{n+1} = ${co(a)}u_n${sg(b)}$. ${pick(["Un élève", "Un camarade", "Une stagiaire"])} résout $\\ell = ${co(a)}\\ell${sg(b)}$, trouve $\\ell = ${n(L)}$ et affirme que $(u_n)$ converge vers $${n(L)}$. ${pick(["Qu'en est-il vraiment ?", "Que fait vraiment la suite $(u_n)$ ?"])}`,
    bon,
    [`$(u_n)$ converge vers $${n(L)}$`, "$(u_n)$ tend vers $+\\infty$", "$(u_n)$ tend vers $-\\infty$", `$(u_n)$ converge vers $${n(u0)}$`],
    expl("$\\ell = f(\\ell)$ donne la seule limite POSSIBLE, à condition que la suite converge.", `$u_n - ${n(L)}$ est géométrique de raison $${n(a)}$ : $u_n = ${n(L)}${sg(u0 - L)} \\times ${n(a)}^n$.`, a < 1 ? `$0 < ${n(a)} < 1$ : $${n(a)}^n \\to 0$.` : `$${n(a)} > 1$ : $${n(a)}^n \\to +\\infty$, multiplié par $${n(u0 - L)}$.`, `${bon}.`)
  );
}

/* =========================================================
   LA TABLE : micro, étoile, clé, générateur, indice
========================================================= */

const IND = {
  nuage: "Regarde vers quelle hauteur se rapprochent les points quand $n$ grandit.",
  ref: "Limites de référence : $n$, $n^2$ et $\\sqrt{n}$ tendent vers $+\\infty$ ; $\\dfrac{1}{n}$ tend vers $0$ ; pour $q^n$, tout dépend de $q$.",
  ops: "Opère sur les limites, sauf dans les formes indéterminées.",
  fi: "Factorise par le terme qui domine.",
  comp: "Minorer pour $+\\infty$, majorer pour $-\\infty$, encadrer pour une limite finie.",
  tcm: "Croissante + majorée, ou décroissante + minorée : elle converge, mais la borne n'est pas forcément la limite.",
  defi: "Si $(u_n)$ converge vers $\\ell$ et $u_{n+1} = f(u_n)$, alors $\\ell = f(\\ell)$.",
};

const LIGNES: LigneRenfort[] = [
  ["limite_suite_interpreter", 1, "limNuage", genLimNuage, IND.nuage],
  ["limite_suite_interpreter", 1, "limPhrase", genLimPhrase, IND.nuage],
  ["limite_suite_interpreter", 1, "limTableau", genLimTableau, IND.nuage],
  ["limite_suite_interpreter", 2, "limNuage", genLimNuage, IND.nuage],
  ["limite_suite_interpreter", 2, "limTableau", genLimTableau, IND.nuage],
  ["limite_suite_interpreter", 2, "limDef", genLimDef, IND.nuage],
  ["limite_suite_interpreter", 3, "limDef", genLimDef, IND.nuage],
  ["limite_suite_interpreter", 3, "limPhrase", genLimPhrase, IND.nuage],
  ["limite_suite_interpreter", 3, "limRang", genLimRang, IND.nuage],
  ["limite_suite_interpreter", 4, "limRang", genLimRang, IND.nuage],
  ["limite_suite_interpreter", 4, "limTableau", genLimTableau, IND.nuage],
  ["limite_suite_interpreter", 4, "limNuage", genLimNuage, IND.nuage],

  ["limite_suite_calculer", 1, "limRef1", genLimRef(1), IND.ref],
  ["limite_suite_calculer", 1, "limGeo", genLimGeo, IND.ref],
  ["limite_suite_calculer", 1, "limPoly", genLimPoly, IND.ref],
  ["limite_suite_calculer", 2, "limRef2", genLimRef(2), IND.ref],
  ["limite_suite_calculer", 2, "limGeo", genLimGeo, IND.ref],
  ["limite_suite_calculer", 2, "limPoly", genLimPoly, IND.ref],
  ["limite_suite_calculer", 3, "limRat", genLimRat, IND.fi],
  ["limite_suite_calculer", 3, "limRatCourt", genLimRatCourt, IND.fi],
  ["limite_suite_calculer", 3, "limExpo", genLimExpo, IND.ref],
  ["limite_suite_calculer", 4, "limRat", genLimRat, IND.fi],
  ["limite_suite_calculer", 4, "limExpo", genLimExpo, IND.ref],
  ["limite_suite_calculer", 4, "limRatCourt", genLimRatCourt, IND.fi],
  ["limite_suite_calculer", 5, "limRatCourt", genLimRatCourt, IND.fi],
  ["limite_suite_calculer", 5, "limExpo", genLimExpo, IND.ref],
  ["limite_suite_calculer", 5, "opsFI", genOpsFI, IND.fi],

  ["limite_suite_operations", 2, "opsFinies", genOpsFinies, IND.ops],
  ["limite_suite_operations", 2, "opsInfini", genOpsInfini, IND.ops],
  ["limite_suite_operations", 2, "opsExpr", genOpsExpr, IND.ops],
  ["limite_suite_operations", 3, "opsInfini", genOpsInfini, IND.ops],
  ["limite_suite_operations", 3, "opsExpr", genOpsExpr, IND.ops],
  ["limite_suite_operations", 3, "opsExprInf", genOpsExprInf, IND.ops],
  ["limite_suite_operations", 4, "opsExprInf", genOpsExprInf, IND.ops],
  ["limite_suite_operations", 4, "opsInfini", genOpsInfini, IND.ops],
  ["limite_suite_operations", 4, "opsFI", genOpsFI, IND.fi],
  ["limite_suite_operations", 5, "opsFI", genOpsFI, IND.fi],
  ["limite_suite_operations", 5, "opsExprInf", genOpsExprInf, IND.ops],
  ["limite_suite_operations", 5, "opsFinies", genOpsFinies, IND.ops],

  ["limite_suite_comparaison", 3, "compMinore", genCompMinore, IND.comp],
  ["limite_suite_comparaison", 3, "gendarmes", genGendarmes, IND.comp],
  ["limite_suite_comparaison", 3, "gendarmesPiege", genGendarmesPiege, IND.comp],
  ["limite_suite_comparaison", 4, "compMinore", genCompMinore, IND.comp],
  ["limite_suite_comparaison", 4, "gendarmesPiege", genGendarmesPiege, IND.comp],
  ["limite_suite_comparaison", 4, "encTrig", genEncadrementTrig, IND.comp],
  ["limite_suite_comparaison", 5, "encTrig", genEncadrementTrig, IND.comp],
  ["limite_suite_comparaison", 5, "compConcret", genCompConcret, IND.comp],
  ["limite_suite_comparaison", 5, "gendarmes", genGendarmes, IND.comp],

  ["limite_suite_monotone_bornee", 2, "tcm", genTCM, IND.tcm],
  ["limite_suite_monotone_bornee", 2, "tcmHypo", genTCMHypo, IND.tcm],
  ["limite_suite_monotone_bornee", 2, "tcmLimite", genTCMLimite, IND.tcm],
  ["limite_suite_monotone_bornee", 3, "tcm", genTCM, IND.tcm],
  ["limite_suite_monotone_bornee", 3, "tcmLimite", genTCMLimite, IND.tcm],
  ["limite_suite_monotone_bornee", 3, "tcmHypo", genTCMHypo, IND.tcm],
  ["limite_suite_monotone_bornee", 3, "tcmSituation", genTCMSituation, IND.tcm],
  ["limite_suite_monotone_bornee", 4, "tcmSituation", genTCMSituation, IND.tcm],
  ["limite_suite_monotone_bornee", 5, "tcmSituation", genTCMSituation, IND.tcm],
  ["limite_suite_monotone_bornee", 4, "tcmExemple", genTCMExemple, IND.tcm],
  ["limite_suite_monotone_bornee", 4, "tcm", genTCM, IND.tcm],
  ["limite_suite_monotone_bornee", 4, "tcmLimite", genTCMLimite, IND.tcm],
  ["limite_suite_monotone_bornee", 5, "tcmPointFixe", genTCMPointFixe, IND.tcm],
  ["limite_suite_monotone_bornee", 5, "tcmExemple", genTCMExemple, IND.tcm],
  ["limite_suite_monotone_bornee", 5, "tcmHypo", genTCMHypo, IND.tcm],

  ["limite_suite_defi", 4, "defiEq", genDefiEq, IND.defi],
  ["limite_suite_defi", 4, "defiLim", genDefiLim, IND.defi],
  ["limite_suite_defi", 4, "defiConclure", genDefiConclure, IND.defi],
  ["limite_suite_defi", 4, "defiSommeGeo", genDefiSommeGeo, IND.defi],
  ["limite_suite_defi", 5, "defiSeuilLim", genDefiSeuilLim, IND.defi],
  ["limite_suite_defi", 5, "defiSommeGeo", genDefiSommeGeo, IND.defi],
  ["limite_suite_defi", 5, "defiConclure", genDefiConclure, IND.defi],
  ["limite_suite_defi", 5, "defiLim", genDefiLim, IND.defi],
  ["limite_suite_defi", 5, "defiEq", genDefiEq, IND.defi],
  ["limite_suite_defi", 4, "defiSeuilLim", genDefiSeuilLim, IND.defi],
];

export const renfortLimitesSuites: TutorBankItemV4[] = fabriquer("tle_limites_renfort", "limite_suite", "limites-suites", LIGNES);
