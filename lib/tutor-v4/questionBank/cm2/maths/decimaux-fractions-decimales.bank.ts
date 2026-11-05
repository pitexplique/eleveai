// FRACTIONS DÉCIMALES ET ÷ 10, 100, 1 000 (05/11/2026).
// Trous du programme de CM2 : cm2-N-decimaux-5, -6, -7 ; cm2-N-mental-8.
// ⛔ La division par 10 s'explique d'abord par la VALEUR DES CHIFFRES (chaque
// chiffre devient 10 fois plus petit), jamais par « on déplace la virgule » seul.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, exp, fr, gabarits, melange, net, qcm, qcmN, un, v } from "./trous-outils";

/* ───────────────────────── decimal_somme_fractions ───────────────────────── */

const ds = gabarits("decimal_somme_fractions", "nombre_decimal", ["fraction_decimale"]);
const DEF_S = "un nombre décimal se découpe en partie entière, dixièmes et centièmes.";
/** e, d, c : 35,78 = 35 + 7/10 + 8/100. */
const tire = (zero = false) => {
  const e = entre(1, 60);
  const d = zero ? 0 : entre(1, 9);
  const c = entre(1, 9);
  return { e, d, c, x: net(e + d / 10 + c / 100) };
};
const somme = (e: number, d: number, c: number) => `${e}${d ? ` + ${d}/10` : ""}${c ? ` + ${c}/100` : ""}`;
const expS = (e: number, d: number, c: number) =>
  exp(DEF_S, "le premier chiffre après la virgule compte les dixièmes, le deuxième compte les centièmes.", `${fr(net(e + d / 10 + c / 100))} = ${somme(e, d, c)}.`, `on écrit ${somme(e, d, c)}.`);
const fauxS = (e: number, d: number, c: number) => [
  `${e} + ${c}/10 + ${d}/100`,
  `${e} + ${d}/100 + ${c}/10`.replace(/^/, ""),
  `${e} + ${d}${c}/10`,
  `${d} + ${e}/10 + ${c}/100`,
  `${e} + ${d}/10 + ${c}/10`,
  `${e} + ${d}/100 + ${c}/1000`,
].filter((s) => s !== somme(e, d, c) && s !== `${e} + ${d}/100 + ${c}/10`);
const INTRO_S = ["", "Sépare les chiffres.", "Regarde la place de chaque chiffre.", "Pense aux dixièmes et aux centièmes."];

const decimalSommeFractions: TutorBankItemV4[] = [
  ds(1, "Le premier chiffre après la virgule : les dixièmes. Le deuxième : les centièmes.", () => {
    const { e, d, c, x } = tire();
    return qcm(somme(e, d, c), fauxS(e, d, c), expS(e, d, c), v(INTRO_S, [`Quelle somme est égale à ${fr(x)} ?`, `Comment écrire ${fr(x)} en somme de fractions décimales ?`, `Choisis la somme égale à ${fr(x)}.`, `${fr(x)} est égal à quelle somme ?`, `Quelle écriture correspond à ${fr(x)} ?`]));
  }),
  ds(1, "Le chiffre juste après la virgule compte les dixièmes.", () => {
    const e = entre(1, 60);
    const d = entre(1, 9);
    const x = net(e + d / 10);
    return qcmN(d, [e, d + 1, d === 1 ? 2 : d - 1, 10 - d, d * 10], exp(DEF_S, "le chiffre juste après la virgule compte les dixièmes.", `${fr(x)} = ${e} + ${d}/10.`, `le numérateur est ${d}.`), v(INTRO_S, [`Complète : ${fr(x)} = ${e} + …/10. Quel nombre manque ?`, `${fr(x)} = ${e} + …/10. Quel est le numérateur ?`, `Il manque un nombre dans ${fr(x)} = ${e} + …/10. Lequel ?`, `Quel numérateur faut-il pour avoir ${fr(x)} = ${e} + …/10 ?`]));
  }),
  ds(1, "Ajoute la partie entière, les dixièmes, puis les centièmes.", () => {
    const { e, d, c, x } = tire();
    return qcmN(x, [net(e + c / 10 + d / 100), net(d + e / 100 + c / 1000), net(e + d / 100 + c / 1000), net(e + d / 10), net(e + d / 10 + c / 10)], expS(e, d, c), v(INTRO_S, [`Quel nombre est égal à ${somme(e, d, c)} ?`, `${somme(e, d, c)} : quel est ce nombre décimal ?`, `Écris à virgule : ${somme(e, d, c)}.`, `Que vaut ${somme(e, d, c)} ?`, `Quelle écriture à virgule donne ${somme(e, d, c)} ?`]));
  }),

  // ★2 : le zéro au milieu.
  ds(2, "S'il n'y a pas de dixièmes, le chiffre des dixièmes est 0.", () => {
    const { e, c, x } = tire(true);
    return qcm(`${e} + ${c}/100`, [`${e} + ${c}/10`, `${e} + 0/10 + ${c}/10`, `${e} + ${c}/1000`, `${c} + ${e}/100`], exp(DEF_S, "le chiffre 0 des dixièmes ne compte rien : on ne l'écrit pas dans la somme.", `${fr(x)} = ${e} + 0/10 + ${c}/100 = ${e} + ${c}/100.`, `on écrit ${e} + ${c}/100.`), v(["Attention au zéro.", "Regarde bien le 0.", "Il y a un 0 après la virgule."], [`Quelle somme est égale à ${fr(x)} ?`, `Comment écrire ${fr(x)} avec des fractions décimales ?`, `Choisis la somme égale à ${fr(x)}.`, `${fr(x)} est égal à quelle somme ?`, `Quelle écriture correspond à ${fr(x)} ?`]));
  }),
  // ★2 : depuis la fraction décimale.
  ds(2, "Dans 3578/100, compte les centaines de centièmes : elles font les unités.", () => {
    const { e, d, c, x } = tire();
    const n = e * 100 + d * 10 + c;
    return qcm(somme(e, d, c), fauxS(e, d, c), exp(DEF_S, "100 centièmes font 1 unité, 10 centièmes font 1 dixième.", `${n}/100 = ${fr(x)} = ${somme(e, d, c)}.`, `on écrit ${somme(e, d, c)}.`), v(["Une fraction décimale peut se découper.", "On peut découper cette fraction.", "Regarde les centièmes."], [`Quelle somme est égale à ${n}/100 ?`, `Comment découper ${n}/100 ?`, `${n}/100 est égal à quelle somme ?`, `Écris ${n}/100 comme une somme.`, `Quelle somme donne ${n}/100 ?`]));
  }),
  // ★2 : avec une grille de cent cases.
  ds(2, "Une colonne de la grille vaut 1 dixième, une case vaut 1 centième.", () => {
    const d = entre(1, 8);
    const c = entre(1, 9);
    const canvas: CanvasFigure = { kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded: d * 10 + c }, display: { showFraction: false, showLabel: false } };
    return qcm(`${d}/10 + ${c}/100`, [`${c}/10 + ${d}/100`, `${d + c}/10`, `${d}/100 + ${c}/100`, `${d * 10 + c}/10`], exp("une grille de 100 cases représente 1 unité.", "on compte d'abord les paquets de 10 cases, puis les cases restantes.", `${d * 10 + c} cases = ${d} dizaines de cases et ${c} cases.`, `la partie coloriée vaut ${d}/10 + ${c}/100.`), v(["La grille entière vaut 1.", "Cette grille de 100 cases vaut 1.", "Toute la grille représente une unité."], ["Quelle somme donne la partie coloriée ?", "Que vaut la partie coloriée ?", "Comment écrire la partie coloriée ?", "Choisis la somme égale à la partie coloriée.", "Quelle écriture correspond à la partie coloriée ?"]), canvas);
  }),

  // ★3 : mesures.
  ds(3, "Sépare les mètres, les dixièmes et les centièmes de mètre.", () => {
    const C = un([
      { o: "Une planche", u: "m" }, { o: "Un paquet de riz", u: "kg" }, { o: "Une bouteille de sirop", u: "L" }, { o: "Un fil électrique", u: "m" }, { o: "Une pastèque", u: "kg" },
      { o: "Un sentier", u: "km" }, { o: "Un requin-baleine", u: "m" }, { o: "Une cuve", u: "L" }, { o: "Un sac de ciment", u: "kg" }, { o: "Une corde d’escalade", u: "m" }, { o: "Un tronçon de rivière", u: "km" }, { o: "Un bidon d’huile", u: "L" },
    ]);
    const { e, d, c } = tire();
    const E = (e % 25) + 1;
    const X = net(E + d / 10 + c / 100);
    return qcm(somme(E, d, c), fauxS(E, d, c), expS(E, d, c), `${C.o} ${v(["mesure", "fait"])} ${fr(X)} ${C.u}. ${v(["Quelle somme est égale à ce nombre ?", "Comment écrire ce nombre avec des fractions décimales ?", "Quelle écriture de ce nombre est juste ?"])}`);
  }),
  // ★3 : additions de dixièmes et centièmes dans un autre ordre.
  ds(3, "Remets d'abord les morceaux dans l'ordre : unités, dixièmes, centièmes.", () => {
    const { e, d, c, x } = tire();
    const ordres = [`${c}/100 + ${e} + ${d}/10`, `${d}/10 + ${c}/100 + ${e}`, `${c}/100 + ${d}/10 + ${e}`];
    const expr = un(ordres);
    return qcmN(x, [net(e + c / 10 + d / 100), net(c + d / 10 + e / 100), net(d + c / 10 + e / 100), net(e + d / 10)], expS(e, d, c), `${v(["Un élève a mélangé les morceaux :", "Les morceaux sont dans le désordre :", "Un robot écrit les morceaux au hasard :", "Le cahier montre ce calcul :"])} ${expr}. ${v(["Quel est ce nombre ?", "Quel nombre obtient-on ?", "Quelle est son écriture à virgule ?"])}`);
  }),
  // ★3 : construire le nombre avec des pièces.
  ds(3, "1 centime, c'est 1/100 d'euro ; 10 centimes, c'est 1/10 d'euro.", () => {
    const e = entre(2, 45);
    const d = entre(1, 9);
    const c = entre(1, 9);
    const x = net(e + d / 10 + c / 100);
    const P = un(["Dans une tirelire", "Dans un porte-monnaie", "Sur une table", "Dans une boîte de jeu", "Au fond d’un sac", "Dans une caisse de kermesse"]);
    return qcmN(x, [net(e + c / 10 + d / 100), net(e + d / 100 + c / 1000), net(e + d + c), net(e + d / 10)], exp("1 euro vaut 100 centimes.", "les pièces de 10 centimes comptent des dixièmes d'euro, celles de 1 centime des centièmes.", `${e} + ${d}/10 + ${c}/100 = ${fr(x)}.`, `il y a ${fr(x)} €.`), `${P}, il y a ${e} pièces de 1 €, ${d} pièces de 10 centimes et ${c} pièces de 1 centime. ${v(["Combien d’euros en tout ?", "Quelle somme, en euros ?", "Combien cela fait-il, en euros ?"])}`, undefined, "€");
  }),
];

/* ───────────────────────── fraction_decimale_comparer ───────────────────────── */

const fc = gabarits("fraction_decimale_comparer", "nombre_decimal", ["fraction_decimale"]);
const VAL = (n: number, d: number) => net(n / d);
const expC = (a: [number, number], b: [number, number]) =>
  exp(
    "pour comparer des fractions décimales, on les écrit avec le même dénominateur ou à virgule.",
    "on écrit chaque fraction sous forme de nombre à virgule.",
    `${a[0]}/${a[1]} = ${fr(VAL(...a))} et ${b[0]}/${b[1]} = ${fr(VAL(...b))}.`,
    `${a[0]}/${a[1]} ${VAL(...a) < VAL(...b) ? "<" : VAL(...a) > VAL(...b) ? ">" : "="} ${b[0]}/${b[1]}.`,
  );
const signe = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");
const SIGNE = ["Quel signe faut-il mettre entre", "Quel signe va entre", "Choisis le signe entre", "Compare avec le bon signe :", "Quel symbole écrire entre"];
const INTRO_C = ["", "Compare.", "Écris-les à virgule si besoin.", "Pense à la valeur de chaque fraction."];
/** Une fraction décimale de dénominateur d, sans simplification évidente au 2e tirage. */
const fractionD = (d: number, max = d - 1) => [entre(1, max), d] as [number, number];

const fractionDecimaleComparer: TutorBankItemV4[] = [
  fc(1, "Même dénominateur : on compare les numérateurs.", () => {
    const d = un([10, 100, 1000]);
    const a = entre(1, d === 10 ? 9 : 99);
    let b = entre(1, d === 10 ? 9 : 99);
    while (b === a) b = entre(1, d === 10 ? 9 : 99);
    return qcm(signe(a, b), ["<", ">", "="], expC([a, d], [b, d]), v(INTRO_C, SIGNE) + ` ${a}/${d} et ${b}/${d} ?`);
  }),
  fc(1, "Écris les deux à virgule, puis compare.", () => {
    const a: [number, number] = [entre(1, 9), 10];
    let b: [number, number] = [entre(1, 99), 100];
    while (VAL(...a) === VAL(...b)) b = [entre(1, 99), 100];
    const g = VAL(...a) > VAL(...b);
    return qcm(g ? `${a[0]}/10` : `${b[0]}/100`, [g ? `${b[0]}/100` : `${a[0]}/10`, "Elles sont égales"], expC(a, b), v(INTRO_C, [`Quelle fraction est la plus grande : ${a[0]}/10 ou ${b[0]}/100 ?`, `Laquelle est la plus grande, ${a[0]}/10 ou ${b[0]}/100 ?`, `Entre ${a[0]}/10 et ${b[0]}/100, laquelle vaut le plus ?`, `${a[0]}/10 ou ${b[0]}/100 : laquelle gagne ?`, `Choisis la plus grande : ${a[0]}/10 ou ${b[0]}/100.`]));
  }),
  fc(1, "Multiplie le numérateur et le dénominateur par 10.", () => {
    const a = entre(1, 9);
    const k = un([10, 100]);
    const d2 = 10 * k;
    return qcmN(a * k, [a, a + k, a * k * 10, a + 10], exp("10 centièmes font 1 dixième.", `on multiplie le haut et le bas par ${k}.`, `${a}/10 = ${a * k}/${d2}.`, `il faut écrire ${a * k}.`), v(INTRO_C, [`Complète : ${a}/10 = …/${d2}. Quel nombre manque ?`, `${a}/10 = …/${d2}. Quel est le numérateur ?`, `Quel numérateur donne ${a}/10 = …/${d2} ?`, `Il manque un nombre dans ${a}/10 = …/${d2}. Lequel ?`]));
  }),

  fc(2, "Écris-les avec le même dénominateur, ou à virgule.", () => {
    const egal = Math.random() < 0.35;
    const a: [number, number] = [entre(1, 9), 10];
    let b: [number, number] = egal ? [a[0] * 10, 100] : [entre(1, 99), 100];
    if (!egal) while (b[0] === a[0] * 10) b = [entre(1, 99), 100];
    const [x, y] = Math.random() < 0.5 ? [a, b] : [b, a];
    return qcm(signe(VAL(...x), VAL(...y)), ["<", ">", "="], expC(x, y), v(INTRO_C, SIGNE) + ` ${x[0]}/${x[1]} et ${y[0]}/${y[1]} ?`);
  }),
  // ★2 : encadrer entre deux entiers.
  fc(2, "Cherche combien de fois 10 (ou 100) va dans le numérateur.", () => {
    const d = un([10, 100]);
    const e = entre(1, 30);
    const n = e * d + entre(1, d - 1);
    return qcm(`entre ${e} et ${e + 1}`, [`entre ${e - 1} et ${e}`, `entre ${e + 1} et ${e + 2}`, `entre ${n} et ${n + 1}`, `entre ${e * 10} et ${e * 10 + 1}`], exp("encadrer, c'est trouver l'entier juste avant et l'entier juste après.", `${d}/${d} = 1 : on compte les unités dans ${n}/${d}.`, `${n}/${d} = ${fr(n / d)}.`, `${n}/${d} est entre ${e} et ${e + 1}.`), v(INTRO_C, [`Entre quels entiers se trouve ${n}/${d} ?`, `${n}/${d} est compris entre quels entiers ?`, `Encadre ${n}/${d} par deux entiers qui se suivent.`, `Où placer ${n}/${d} ?`, `Quels entiers qui se suivent encadrent ${n}/${d} ?`]));
  }),
  // ★2 : lire sur la droite.
  fc(2, "Lis les deux points sur la droite : le plus à droite est le plus grand.", () => {
    const pts = melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2);
    const canvas: CanvasFigure = { kind: "number_line", size: { width: 420, height: 110 }, min: 0, max: 1, step: 1, minorStep: 0.1, points: [{ value: pts[0] / 10, label: "A", color: "#2563eb" }, { value: pts[1] / 10, label: "B", color: "#dc2626" }], display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true } };
    const C = un([{ t: "le plus grand", g: true }, { t: "le plus petit", g: false }]);
    const ga = pts[0] > pts[1];
    const juste = C.g === ga ? `${pts[0]}/10 (point A)` : `${pts[1]}/10 (point B)`;
    return qcm(juste, [C.g === ga ? `${pts[1]}/10 (point B)` : `${pts[0]}/10 (point A)`, "Ils sont égaux"], exp("sur une droite graduée, plus on va à droite, plus le nombre est grand.", "de 0 à 1, il y a 10 petits intervalles : chacun vaut 1/10.", `A est sur ${pts[0]}/10 et B sur ${pts[1]}/10.`, `${C.t} est ${juste}.`), v(["La droite va de 0 à 1.", "Regarde les points A et B.", "Chaque petit intervalle vaut 1/10.", "Lis les deux points."], [`Quel est ${C.t} nombre ?`, `Quel point repère ${C.t} nombre ?`, `Où est ${C.t} nombre ?`, `Choisis ${C.t} nombre.`]), canvas);
  }),

  // ★3 : intercaler.
  fc(3, "Écris les deux bornes en centièmes : les fractions entre elles apparaissent.", () => {
    const a = entre(1, 8);
    const n = a * 10 + un([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const fauxL = [`${a * 10 - 5}/100`, `${(a + 1) * 10 + 3}/100`, `${a + 2}/10`, `${a * 10 + 5}/1000`];
    return qcm(`${n}/100`, fauxL, exp("intercaler, c'est trouver un nombre entre deux autres.", `on écrit ${a}/10 = ${a * 10}/100 et ${a + 1}/10 = ${(a + 1) * 10}/100.`, `${a * 10}/100 < ${n}/100 < ${(a + 1) * 10}/100.`, `${n}/100 convient.`), v(["Une fraction se cache entre deux autres.", "On veut intercaler une fraction.", "Cherche la fraction du milieu.", "Trouve une fraction entre les deux."], [`Quelle fraction est comprise entre ${a}/10 et ${a + 1}/10 ?`, `Laquelle se place entre ${a}/10 et ${a + 1}/10 ?`, `Laquelle peut-on écrire entre ${a}/10 et ${a + 1}/10 ?`, `Entre ${a}/10 et ${a + 1}/10, laquelle convient ?`]));
  }),
  // ★3 : en situation.
  fc(3, "Écris les deux mesures à virgule, puis compare.", () => {
    const C = un([
      ["Lina", "Hugo", "a couru", "km"], ["Un escargot", "une limace", "a parcouru", "m"], ["Une sauteuse", "un sauteur", "a sauté", "m"], ["Un chat", "un lapin", "pèse", "kg"], ["Une carafe", "une bouteille", "contient", "L"],
      ["Une corde", "un ruban", "mesure", "m"], ["Un colis", "une valise", "pèse", "kg"], ["Tom", "Awa", "a nagé", "km"], ["Un tuyau", "une planche", "mesure", "m"], ["Un seau", "un arrosoir", "contient", "L"], ["Une tortue", "un crabe", "a marché", "km"], ["Un melon", "un ananas", "pèse", "kg"],
    ]);
    const a: [number, number] = [entre(11, 99), 10];
    let b: [number, number] = [entre(101, 999), 100];
    while (VAL(...a) === VAL(...b)) b = [entre(101, 999), 100];
    const g = VAL(...a) > VAL(...b);
    const [A, B] = [C[0], C[1]];
    return qcm(g ? cap(A) : cap(B), [g ? cap(B) : cap(A), "Autant l’un que l’autre"], expC(a, b), `${A} ${C[2]} ${a[0]}/10 ${C[3]}. ${cap(B)} ${C[2]} ${b[0]}/100 ${C[3]}. ${v(["Qui a la plus grande mesure ?", "Lequel des deux a le plus grand nombre ?", "Où est la mesure la plus grande ?"])}`);
  }),
  // ★3 : encadrer au dixième.
  fc(3, "Écris la fraction à virgule : regarde le chiffre des dixièmes.", () => {
    const e = entre(1, 9);
    const d = entre(0, 8);
    const c = entre(1, 9);
    const n = e * 100 + d * 10 + c;
    const bas = e * 10 + d;
    const C = un(["Un élève veut écrire", "Une camarade propose d’encadrer", "Un professeur demande d’encadrer", "Pour un concours, il faut encadrer", "Un robot doit encadrer", "Sur un cahier, on doit encadrer"]);
    return qcm(`${bas}/10 < ${n}/100 < ${bas + 1}/10`, [`${bas - 1}/10 < ${n}/100 < ${bas}/10`, `${bas + 1}/10 < ${n}/100 < ${bas + 2}/10`, `${e}/10 < ${n}/100 < ${e + 1}/10`, `${n}/10 < ${n}/100 < ${n + 1}/10`], exp("encadrer au dixième, c'est trouver les deux dixièmes voisins.", "on écrit la fraction à virgule et on lit le chiffre des dixièmes.", `${n}/100 = ${fr(n / 100)}, entre ${fr(bas / 10)} et ${fr((bas + 1) / 10)}.`, `${bas}/10 < ${n}/100 < ${bas + 1}/10.`), `${C} ${n}/100 entre deux dixièmes voisins. ${v(["Quel encadrement est juste ?", "Choisis l’encadrement exact.", "Quelle écriture convient ?"])}`);
  }),
];

/* ───────────────────────── fraction_decimale_ordonner ───────────────────────── */

const fo = gabarits("fraction_decimale_ordonner", "nombre_decimal", ["fraction_decimale"]);
const ecr = (l: [number, number][]) => l.map(([n, d]) => `${n}/${d}`).join(" ; ");
const trier = (l: [number, number][], sens: "c" | "d") => [...l].sort((a, b) => (sens === "c" ? 1 : -1) * (VAL(...a) - VAL(...b)));
/** Propositions fausses : l'ordre inverse, deux permutations, l'ordre des numérateurs. */
function fauxOrdres(l: [number, number][], sens: "c" | "d") {
  const j = trier(l, sens);
  const inv = [...j].reverse();
  const nums = [...l].sort((a, b) => (sens === "c" ? 1 : -1) * (a[0] - b[0]));
  const perm1 = [j[1], j[0], ...j.slice(2)];
  const perm2 = [j[0], ...j.slice(2), j[1]];
  return [nums, inv, perm1, perm2].map(ecr);
}
const distinctes = (l: [number, number][]) => new Set(l.map((x) => VAL(...x))).size === l.length;
const tirageListe = (fab: () => [number, number][]) => {
  for (;;) {
    const l = fab();
    if (distinctes(l)) return l;
  }
};
const expO = (l: [number, number][], sens: "c" | "d") => {
  const j = trier(l, sens);
  return exp(
    "ranger dans l'ordre croissant, c'est du plus petit au plus grand ; décroissant, du plus grand au plus petit.",
    "on écrit chaque fraction à virgule, puis on compare.",
    l.map(([n, d]) => `${n}/${d} = ${fr(VAL(n, d))}`).join(" ; ") + ".",
    `l'ordre est ${ecr(j)}.`,
  );
};
const ORDRE = (s: "c" | "d") => (s === "c" ? "croissant" : "décroissant");
const INTRO_O = ["", "Écris-les à virgule.", "Compare-les deux par deux.", "Prends ton temps."];
const DEMANDE_O = (s: "c" | "d", l: string) => [
  `Range dans l'ordre ${ORDRE(s)} : ${l}.`,
  `Quel est l'ordre ${ORDRE(s)} de ${l} ?`,
  `Classe dans l'ordre ${ORDRE(s)} : ${l}.`,
  `Choisis le bon rangement ${ORDRE(s)} de ${l}.`,
];
const fractionDecimaleOrdonner: TutorBankItemV4[] = [
  fo(1, "Même dénominateur : on range les numérateurs.", () => {
    const d = un([10, 100]);
    const l = tirageListe(() => melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3).map((n) => [d === 10 ? n : n * entre(1, 11), d] as [number, number]));
    return qcm(ecr(trier(l, "c")), fauxOrdres(l, "c"), expO(l, "c"), v(INTRO_O, DEMANDE_O("c", ecr(l))));
  }),
  fo(1, "Du plus grand au plus petit.", () => {
    const d = un([10, 100]);
    const l = tirageListe(() => melange([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3).map((n) => [d === 10 ? n : n * entre(1, 11), d] as [number, number]));
    return qcm(ecr(trier(l, "d")), fauxOrdres(l, "d"), expO(l, "d"), v(INTRO_O, DEMANDE_O("d", ecr(l))));
  }),
  fo(1, "Écris-les à virgule, puis cherche le plus petit ou le plus grand.", () => {
    const l = tirageListe(() => [[entre(1, 9), 10], [entre(1, 99), 100], [entre(1, 9), 10]] as [number, number][]);
    const g = Math.random() < 0.5;
    const j = trier(l, g ? "d" : "c")[0];
    return qcm(`${j[0]}/${j[1]}`, l.filter((x) => x !== j).map((x) => `${x[0]}/${x[1]}`), expO(l, g ? "d" : "c"), v(INTRO_O, [`Quelle est la ${g ? "plus grande" : "plus petite"} fraction : ${ecr(l)} ?`, `Parmi ${ecr(l)}, laquelle est la ${g ? "plus grande" : "plus petite"} ?`, `Trouve la ${g ? "plus grande" : "plus petite"} : ${ecr(l)}.`, `Laquelle vaut le ${g ? "plus" : "moins"} : ${ecr(l)} ?`]));
  }),
  fo(2, "Mets tout sur 100, ou écris à virgule.", () => {
    const l = tirageListe(() => [[entre(1, 9), 10], [entre(1, 99), 100], [entre(1, 99), 100], [entre(1, 9), 10]] as [number, number][]);
    const s = un(["c", "d"] as const);
    return qcm(ecr(trier(l, s)), fauxOrdres(l, s), expO(l, s), v(INTRO_O, DEMANDE_O(s, ecr(l))));
  }),
  fo(2, "Mets tout en millièmes si besoin.", () => {
    const l = tirageListe(() => [[entre(1, 9), 10], [entre(11, 99), 100], [entre(101, 999), 1000]] as [number, number][]);
    const s = un(["c", "d"] as const);
    return qcm(ecr(trier(l, s)), fauxOrdres(l, s), expO(l, s), v(["Trois dénominateurs différents !", "Attention aux dénominateurs.", "Les dénominateurs changent.", "Dixièmes, centièmes et millièmes."], DEMANDE_O(s, ecr(l))));
  }),
  fo(2, "Une fraction peut dépasser 1 : regarde sa partie entière.", () => {
    const l = tirageListe(() => [[entre(11, 49), 10], [entre(101, 499), 100], [entre(1, 9), 10]] as [number, number][]);
    const s = un(["c", "d"] as const);
    return qcm(ecr(trier(l, s)), fauxOrdres(l, s), expO(l, s), v(["Certaines fractions dépassent 1.", "Attention, certaines sont plus grandes que 1.", "Cherche d’abord les parties entières.", "Une fraction vaut moins que 1, pas les autres."], DEMANDE_O(s, ecr(l))));
  }),
  fo(3, "Écris chaque mesure à virgule, puis range.", () => {
    const C = un([
      { o: "Trois élèves ont sauté", u: "m", q: "Quel saut va en premier ?" }, { o: "Trois colis pèsent", u: "kg", q: "Quel colis est en tête ?" }, { o: "Trois bouteilles contiennent", u: "L", q: "Laquelle est en tête ?" }, { o: "Trois rubans mesurent", u: "m", q: "Lequel est en tête ?" },
      { o: "Trois nageurs ont parcouru", u: "km", q: "Lequel est en tête ?" }, { o: "Trois coureuses ont couru", u: "km", q: "Laquelle est en tête ?" }, { o: "Trois poissons pèsent", u: "kg", q: "Lequel est en tête ?" }, { o: "Trois tortues ont avancé", u: "m", q: "Laquelle est en tête ?" }, { o: "Trois gourdes contiennent", u: "L", q: "Laquelle est en tête ?" },
    ]);
    const l = tirageListe(() => [[entre(11, 49), 10], [entre(101, 499), 100], [entre(11, 49), 10]] as [number, number][]);
    const s = un(["c", "d"] as const);
    const avecU = l.map(([n, d]) => `${n}/${d} ${C.u}`).join(", ");
    return qcm(ecr(trier(l, s)), fauxOrdres(l, s), expO(l, s), `${C.o} ${avecU}. ${v([`Quel est le classement dans l’ordre ${ORDRE(s)} ?`, `Range ces nombres dans l’ordre ${ORDRE(s)}.`, `Choisis le bon ordre ${ORDRE(s)}.`])}`);
  }),
  fo(3, "Écris les quatre nombres à virgule pour trouver celui du milieu.", () => {
    const l = tirageListe(() => [[entre(1, 9), 10], [entre(1, 99), 100], [entre(1, 99), 100]] as [number, number][]);
    const j = trier(l, "c")[1];
    const P = un(["Sur le podium,", "Dans une course,", "Au concours,", "Dans le jeu,", "Pour le relais,", "Dans ce classement,"]);
    return qcm(`${j[0]}/${j[1]}`, l.filter((x) => x !== j).map((x) => `${x[0]}/${x[1]}`), expO(l, "c"), `${P} les scores sont ${ecr(l)}. ${v(["Quel score est celui du milieu ?", "Quelle fraction est au milieu, une fois rangées ?", "Rangées, laquelle se trouve au milieu ?"])}`);
  }),
  fo(3, "Compare les mesures écrites à virgule.", () => {
    const l = tirageListe(() => [[entre(11, 49), 10], [entre(101, 499), 100], [entre(1001, 4999), 1000]] as [number, number][]);
    const g = Math.random() < 0.5;
    const j = trier(l, g ? "d" : "c")[0];
    const C = un(["Des grenouilles sautent", "Des élèves lancent une balle à", "Des enfants font un saut de", "Des robots avancent de", "Des pêcheurs jettent leur ligne à", "Des athlètes lancent un poids à"]);
    return qcm(`${j[0]}/${j[1]} m`, l.filter((x) => x !== j).map((x) => `${x[0]}/${x[1]} m`), expO(l, g ? "d" : "c"), `${C} ${l.map(([n, d]) => `${n}/${d} m`).join(", ")}. ${v([`Quelle mesure est la ${g ? "plus grande" : "plus petite"} ?`, `Laquelle est la ${g ? "plus grande" : "plus petite"} ?`, `Trouve la ${g ? "plus grande" : "plus petite"} de ces mesures.`])}`);
  }),
];

/* ───────────────────────── decimal_diviser_puissance_dix ───────────────────────── */

const dp = gabarits("decimal_diviser_puissance_dix", "nombre_decimal", ["puissance_dix"]);
const COLS = ["c", "d", "u", "dixièmes", "centièmes", "millièmes", "dix-mill."];
/** Le tableau de numération avant / après, calculé à partir du nombre. */
function tableau(x: number, k: number): CanvasFigure {
  const cases = (n: number) => {
    const [e, d = ""] = String(net(n)).split(".");
    const E = e.padStart(3, " ").split("").map((c) => (c === " " ? "" : c));
    const D = d.padEnd(4, " ").split("").map((c) => (c === " " ? "" : c));
    return [...E, ...D];
  };
  const y = net(x / k);
  const col = COLS.map((_, i) => i);
  const a = cases(x);
  const b = cases(y);
  const garde = col.filter((i) => a[i] !== "" || b[i] !== "" || i === 2);
  return {
    kind: "tableau_donnees",
    headers: ["", ...garde.map((i) => COLS[i])],
    rows: [
      { label: fr(x), values: garde.map((i) => a[i]) },
      { label: `÷ ${fr(k)}`, values: garde.map((i) => b[i]) },
    ],
    display: { compact: true },
  };
}
const expD = (x: number, k: number) => {
  const r = net(x / k);
  const mot = k === 10 ? "10" : k === 100 ? "100" : "1 000";
  return exp(
    `diviser par ${mot}, c'est rendre chaque chiffre ${mot} fois plus petit.`,
    `chaque chiffre prend une valeur ${mot} fois plus petite : les dizaines deviennent des ${k === 10 ? "unités" : k === 100 ? "dixièmes" : "centièmes"}. On le voit aussi : la virgule se retrouve ${k === 10 ? "un rang" : k === 100 ? "deux rangs" : "trois rangs"} plus à gauche.`,
    `${fr(x)} ÷ ${mot} = ${fr(r)}.`,
    `le résultat est ${fr(r)}.`,
  );
};
const fauxD = (x: number, k: number) => {
  const r = net(x / k);
  return [net(x * k), net(r * 10), net(r / 10), net(x - k), net(r * 100), net(r / 100)].filter((f) => f > 0 && f !== r);
};
const CALC = (c: string) => [`Calcule : ${c}.`, `Combien font ${c} ?`, `Quel est le résultat de ${c} ?`, `Trouve le résultat de ${c}.`, `Que vaut ${c} ?`, `Donne le résultat : ${c}.`, `Effectue ${c}.`, `Choisis le résultat de ${c}.`, `${c}, ça fait combien ?`];
const INTRO_D = ["", "Chaque chiffre devient plus petit.", "Pense à la valeur des chiffres.", "Regarde le tableau."];
const decimauxSimples = () => {
  const n = entre(11, 999);
  return net(n / un([1, 10]));
};
const decimalDiviserPuissanceDix: TutorBankItemV4[] = [
  dp(1, "Chaque chiffre devient 10 fois plus petit.", () => {
    const x = decimauxSimples();
    return qcmN(net(x / 10), fauxD(x, 10), expD(x, 10), v(INTRO_D, CALC(`${fr(x)} ÷ 10`)), tableau(x, 10));
  }),
  dp(1, "Un chiffre des dizaines devient un chiffre des unités.", () => {
    const d = entre(1, 9);
    const u = entre(1, 9);
    const t = entre(1, 9);
    const x = net(d * 10 + u + t / 10);
    const C = un([{ nom: "dizaines", val: d, apres: "unités", f: ["dizaines", "centaines", "dixièmes"] }, { nom: "unités", val: u, apres: "dixièmes", f: ["unités", "dizaines", "centièmes"] }, { nom: "dixièmes", val: t, apres: "centièmes", f: ["dixièmes", "unités", "millièmes"] }]);
    const y = C;
    return qcm(`Les ${y.apres}`, y.f.map((m) => `Les ${m}`), exp("diviser par 10, c'est rendre chaque chiffre 10 fois plus petit.", "chaque rang vaut 10 fois moins que le rang à sa gauche.", `${fr(x)} ÷ 10 = ${fr(net(x / 10))}.`, `le chiffre des ${y.nom} passe aux ${y.apres}.`), v(["On calcule " + fr(x) + " ÷ 10.", "On divise " + fr(x) + " par 10.", "Regarde " + fr(x) + " ÷ 10."], [`Que deviennent les ${y.nom} ?`, `En quoi se changent les ${y.nom} ?`, `Le chiffre des ${y.nom} devient le chiffre de quel rang ?`, `Où vont les ${y.nom} ?`, `Dans quel rang arrive le chiffre des ${y.nom} ?`]));
  }),
  dp(1, "Chaque chiffre vaut 10 fois moins : les dizaines deviennent des unités.", () => {
    const x = entre(1, 99) * 10;
    return qcmN(x / 10, [x * 10, x / 100, x - 10, x + 10], expD(x, 10), v(["Les dizaines deviennent des unités.", "Un nombre rond.", "Commence simple."], CALC(`${fr(x)} ÷ 10`)));
  }),

  dp(2, "÷ 100 : chaque chiffre devient 100 fois plus petit.", () => {
    const x = decimauxSimples();
    return qcmN(net(x / 100), fauxD(x, 100), expD(x, 100), v(INTRO_D, CALC(`${fr(x)} ÷ 100`)), tableau(x, 100));
  }),
  dp(2, "÷ 1 000 : chaque chiffre devient 1 000 fois plus petit.", () => {
    const x = entre(11, 999);
    return qcmN(net(x / 1000), fauxD(x, 1000), expD(x, 1000), v(INTRO_D, CALC(`${fr(x)} ÷ 1 000`)), tableau(x, 1000));
  }),
  dp(2, "Compare les deux nombres : de combien de rangs chaque chiffre a-t-il reculé ?", () => {
    const x = decimauxSimples();
    const k = un([10, 100, 1000]);
    const y = net(x / k);
    const trou = un(["k", "x"] as const);
    if (trou === "k")
      return qcmN(k, [10, 100, 1000, 10000].filter((a) => a !== k), expD(x, k), v(INTRO_D, [`${fr(x)} ÷ … = ${fr(y)}. Par quel nombre a-t-on divisé ?`, `Complète : ${fr(x)} ÷ … = ${fr(y)}.`, `Quel diviseur donne ${fr(x)} ÷ … = ${fr(y)} ?`, `Il manque un nombre : ${fr(x)} ÷ … = ${fr(y)}. Lequel ?`]));
    return qcmN(x, [net(x * 10), net(x / 10), net(x * 100), net(y)], exp(`on remonte : diviser par ${fr(k)}, l'inverse, c'est multiplier par ${fr(k)}.`, `on multiplie le résultat par ${fr(k)}.`, `${fr(y)} × ${fr(k)} = ${fr(x)}.`, `le nombre de départ est ${fr(x)}.`), v(INTRO_D, [`… ÷ ${fr(k)} = ${fr(y)}. Quel est le nombre de départ ?`, `Complète : … ÷ ${fr(k)} = ${fr(y)}.`, `Quel nombre divisé par ${fr(k)} donne ${fr(y)} ?`, `Il manque un nombre : … ÷ ${fr(k)} = ${fr(y)}. Lequel ?`]));
  }),

  dp(3, "Le prix d'un seul, c'est le total divisé par le nombre d'objets.", () => {
    const k = un([10, 100]);
    const C = un([
      { o: "stylos", p: "Un lot de", t: "coûte" }, { o: "cahiers", p: "Un carton de", t: "coûte" }, { o: "billes", p: "Un sac de", t: "coûte" }, { o: "mangues", p: "Une cagette de", t: "coûte" },
      { o: "bouteilles", p: "Un pack de", t: "coûte" }, { o: "cartes", p: "Une boîte de", t: "coûte" }, { o: "savons", p: "Un lot de", t: "coûte" }, { o: "crayons", p: "Une boîte de", t: "coûte" },
    ]);
    const x = k === 10 ? net(entre(12, 89) + un([0, 0.5])) : entre(120, 980);
    return qcmN(net(x / k), [net(x * k), net((x / k) * 10), net(x / k / 10), net(x - k)], expD(x, k), `${C.p} ${k} ${C.o} ${C.t} ${fr(x)} €. ${v(["Quel est le prix d’un objet ?", "Combien coûte un seul objet ?", "Combien paie-t-on par objet ?"])}`, undefined, "€");
  }),
  dp(3, "La masse d'un seul, c'est la masse totale divisée par le nombre.", () => {
    const k = un([10, 100, 1000]);
    const C = un([
      { o: "feuilles de papier", u: [4, 4.5, 5, 5.5, 6] }, { o: "clous", u: [2, 2.5, 3, 4.5, 6] }, { o: "grains de café", u: [0.1, 0.12, 0.15, 0.18, 0.2] }, { o: "perles", u: [0.5, 1.2, 1.5, 2.5, 3] },
      { o: "pièces de monnaie", u: [2.3, 3.9, 4.1, 5.7, 7.8] }, { o: "biscuits", u: [6, 7.5, 8.5, 12, 15] }, { o: "trombones", u: [0.4, 0.5, 0.8, 1.1, 1.5] }, { o: "graines de letchi", u: [2, 2.5, 3.5, 4, 4.5] },
    ]);
    const x = net(un(C.u) * k);
    return qcmN(net(x / k), [net(x * k), net((x / k) * 10), net(x / k / 10), net(x - k)], expD(x, k), `${fr(k)} ${C.o} pèsent ${fr(x)} g. ${v(["Quelle est la masse d’un seul objet ?", "Combien pèse un seul objet ?", "Que pèse chaque objet, si tous sont pareils ?"])}`, undefined, "g");
  }),
  dp(3, "Partager en 10 ou en 100 parts égales, c'est diviser par 10 ou par 100.", () => {
    const k = un([10, 100]);
    const C = un([
      { o: "Une corde", u: "m", v: "est coupée" }, { o: "Une route", u: "km", v: "est découpée" }, { o: "Un sentier", u: "km", v: "est découpé" }, { o: "Un jus de fruits", u: "L", v: "est versé" }, { o: "Une bande de tissu", u: "m", v: "est coupée" }, { o: "Une piste cyclable", u: "km", v: "est découpée" }, { o: "Une réserve d’eau", u: "L", v: "est répartie" }, { o: "Un rouleau de fil", u: "m", v: "est coupé" },
    ]);
    const x = decimauxSimples();
    return qcmN(net(x / k), [net(x * k), net((x / k) * 10), net(x / k / 10), net(x - k)], expD(x, k), `${C.o} de ${fr(x)} ${C.u} ${C.v} en ${k} parts égales. ${v(["Quelle est la taille d’une part ?", "Combien mesure une part ?", "Que vaut chaque part ?"])}`, undefined, C.u);
  }),
];

export const decimauxFractionsDecimalesBank: TutorBankItemV4[] = [
  ...decimalSommeFractions,
  ...fractionDecimaleComparer,
  ...fractionDecimaleOrdonner,
  ...decimalDiviserPuissanceDix,
];
