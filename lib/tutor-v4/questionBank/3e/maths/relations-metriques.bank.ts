// RELATIONS MÉTRIQUES DU TRIANGLE RECTANGLE (05/11/2026).
//
// Québec, Maroc, Sénégal, Côte d'Ivoire. Hors du programme français : notion masquée, voir
// `lib/tutor-v4/micros-masquees.ts`. Le triangle ABC est rectangle en A, H est le pied de
// la hauteur issue de A : AH × BC = AB × AC, AH² = HB × HC, AB² = BH × BC, AC² = CH × CB.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Les triangles viennent de triplets multipliés et
// H se CALCULE : tout tombe juste, et la figure dit la vérité. La réponse n'y est jamais écrite.

import { figureConstruction, point } from "@/lib/canvas/construction";
import { entre, expliquer, fabriqueGabarits, fr, mesure, nomsTriangle, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const gabarit = fabriqueGabarits("3e", "relations_metriques", ["triangle_rectangle", "hauteur", "canvas"]);

/**
 * ⛔ « FT = / 156 cm » coupé en bout de ligne à 375 px (05/11/2026). Ces énoncés sont du texte,
 * pas des formules : on colle « = » à ce qui l'entoure par des espaces insécables. Les
 * correcteurs relisent le texte avec des espaces ordinaires.
 */
const sansCoupure = (t: string) => t.replace(/ = /g, " = ");
const tpl: typeof gabarit = (microId, n, difficulty, hint, generate) =>
  gabarit(microId, n, difficulty, hint, () => {
    const q = generate() as Record<string, unknown>;
    return { ...q, text: sansCoupure(String(q.text)) };
  });

const DEF_P = "dans un triangle rectangle, le produit de l’hypoténuse par la hauteur est égal au produit des deux côtés de l’angle droit : c’est deux fois l’aire, calculée de deux façons.";
const DEF_C = "dans un triangle rectangle, le carré de la hauteur est égal au produit des deux segments qu’elle découpe sur l’hypoténuse ; le carré d’un côté de l’angle droit est égal au produit de sa projection par l’hypoténuse.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;

const net = (x: number) => Math.round(x * 1e6) / 1e6;

type T = { ab: number; ac: number; bc: number; ah: number; hb: number; hc: number };

/** Un triangle rectangle qui tombe juste : un triplet multiplié ; hauteur et pied calculés. `maxHyp` : réaliste en contexte. */
const FAMILLES: { t: [number, number, number]; k: number[] }[] = [
  { t: [3, 4, 5], k: [1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 25] },
  { t: [7, 24, 25], k: [1, 2, 5] },
  { t: [5, 12, 13], k: [13] },
  { t: [8, 15, 17], k: [17] },
];
function triangle(maxHyp = Infinity): T {
  for (;;) {
    const f = un(FAMILLES.flatMap((x) => (x.t[0] === 3 ? [x, x, x] : [x])));
    const k = un(f.k);
    const [a, b, c] = Math.random() < 0.5 ? [f.t[0], f.t[1], f.t[2]] : [f.t[1], f.t[0], f.t[2]];
    const ab = a * k;
    const ac = b * k;
    const bc = c * k;
    const ah = (ab * ac) / bc;
    const hb = (ab * ab) / bc;
    const hc = (ac * ac) / bc;
    const propre = (x: number) => Number.isInteger(Math.round(x * 1e6) / 1e4);
    if (bc <= maxHyp && [ah, hb, hc].every(propre)) return { ab, ac, bc, ah: net(ah), hb: net(hb), hc: net(hc) };
  }
}

/** HB et HC dont le produit est un carré parfait : AH tombe juste. */
const COUPLES: [number, number][] = [[1, 4], [1, 9], [2, 8], [4, 9], [3, 12], [2, 18], [4, 16], [9, 16], [3, 27], [5, 20], [4, 25], [6, 24], [8, 18], [4, 36], [9, 25], [16, 25], [9, 36], [5, 45], [7, 28], [6, 54], [10, 40], [8, 32], [12, 27], [1, 16], [1, 25], [2, 32], [3, 48], [2, 50]];
const couple = (): [number, number] => {
  const c = un(COUPLES);
  return Math.random() < 0.5 ? c : [c[1], c[0]];
};

/** La figure : B et C sur la base, A au-dessus, H calculé. Les textes : ce qu'on donne. */
function figure(noms: { a: string; b: string; c: string; h?: string }, hb: number, hc: number, textes: { ab?: string; ac?: string; bc?: string; ah?: string; hb?: string; hc?: string } = {}, sansNom = false) {
  const { a, b, c } = noms;
  const h = noms.h ?? "H";
  // H reste à au moins 22 % d'un bout : sinon son nom et sa longueur se posent sur B ou C.
  const r = Math.min(0.78, Math.max(0.22, hb / (hb + hc)));
  // Une longueur sur la base se lit sous la base : le cadre ne laissait pas la place à « 30 cm », posé dans le triangle.
  const sousLaBase: Record<string, ReturnType<typeof point>> = textes.bc || textes.hb || textes.hc ? { bas: point(2, -0.25) } : {};
  const pts = { [b]: point(0, 0), [c]: point(4, 0), [h]: point(4 * r, 0), [a]: point(4 * r, 4 * Math.sqrt(r * (1 - r))), ...sousLaBase };
  return figureConstruction(
    pts,
    {
      polygones: [{ sommets: [a, b, c] }],
      segments: [
        { a, b: h, couleur: "#dc2626", epais: true, texte: textes.ah },
        ...(textes.ab ? [{ a, b, texte: textes.ab }] : []),
        ...(textes.ac ? [{ a, b: c, texte: textes.ac }] : []),
        ...(textes.bc ? [{ a: b, b: c, texte: textes.bc }] : []),
        ...(textes.hb ? [{ a: h, b, couleur: "#2563eb", texte: textes.hb }] : []),
        ...(textes.hc ? [{ a: h, b: c, couleur: "#059669", texte: textes.hc }] : []),
      ],
      angles: [
        { sommet: a, de: b, vers: c, droit: true },
        { sommet: h, de: a, vers: c, droit: true },
      ],
      description: "Un triangle rectangle et la hauteur issue de l’angle droit",
    },
    sansNom ? [a, b, c, h, "bas"] : ["bas"],
  );
}

const CADRES = (a: string, b: string, c: string) => [
  `Le triangle ${a}${b}${c} est rectangle en ${a}, et H est le pied de la hauteur issue de ${a}.`,
  `${a}${b}${c} est un triangle rectangle en ${a}. La hauteur issue de ${a} coupe [${b}${c}] en H.`,
  `Dans le triangle ${a}${b}${c} rectangle en ${a}, [${a}H] est la hauteur relative à l’hypoténuse.`,
  `On considère le triangle ${a}${b}${c} rectangle en ${a}, de hauteur [${a}H].`,
  `Soit ${a}${b}${c} un triangle rectangle en ${a}, et H le pied de sa hauteur sur [${b}${c}].`,
  `Le triangle ${a}${b}${c}, rectangle en ${a}, a pour hauteur [${a}H].`,
];

/* Les situations : les longueurs sont toujours écrites dans le même ordre, le correcteur les relit ainsi. */
const SITUATIONS: { o: (a: string, b: string, c: string) => string; q: string; u: string; k: number; max: number }[] = [
  { o: (a, b, c) => `Les deux pans d’un toit se coupent à angle droit. Ils mesurent ${a} et ${b}, pour une largeur de ${c}.`, q: "Quelle est la hauteur du toit ?", u: "m", k: 1, max: 20 },
  { o: (a, b, c) => `Une tente a deux pans perpendiculaires de ${a} et ${b}, et une base de ${c}.`, q: "Quelle est la hauteur du mât central ?", u: "dm", k: 1, max: 50 },
  { o: (a, b, c) => `Un terrain triangulaire a un coin à angle droit. Ses côtés mesurent ${a}, ${b} et, en face du coin, ${c}.`, q: "Quel est le plus court chemin du coin à la clôture opposée ?", u: "m", k: 5, max: 200 },
  { o: (a, b, c) => `Une voile triangulaire a un angle droit, entre des côtés de ${a} et ${b}. Le troisième côté fait ${c}.`, q: "Quelle est la longueur de la couture, perpendiculaire au grand côté, qui part de l’angle droit ?", u: "dm", k: 2, max: 120 },
  { o: (a, b, c) => `Une équerre de menuisier a des côtés de ${a} et ${b} et un grand côté de ${c}.`, q: "Quelle est la longueur du renfort, perpendiculaire au grand côté, qui part de l’angle droit ?", u: "cm", k: 2, max: 100 },
  { o: (a, b, c) => `Une charpente a deux poutres perpendiculaires de ${a} et ${b}, sur une portée de ${c}.`, q: "Quelle est la longueur du poteau vertical sous le faîte ?", u: "dm", k: 3, max: 150 },
  { o: (a, b, c) => `Deux câbles perpendiculaires de ${a} et ${b} tiennent un mât, leurs pieds étant écartés de ${c}.`, q: "Quelle est la hauteur du mât ?", u: "m", k: 2, max: 60 },
  { o: (a, b, c) => `Un pont a deux haubans perpendiculaires de ${a} et ${b}, attachés au tablier à ${c} l’un de l’autre.`, q: "Quelle est la hauteur du pylône au-dessus du tablier ?", u: "m", k: 5, max: 300 },
  { o: (a, b, c) => `Une rampe de skate a une face de ${a} et une autre de ${b}, perpendiculaires, sur une base de ${c}.`, q: "Quelle est la hauteur de la rampe ?", u: "dm", k: 1, max: 50 },
  { o: (a, b, c) => `Un cerf-volant triangulaire a un angle droit entre deux baguettes de ${a} et ${b}. Le dernier côté fait ${c}.`, q: "Quelle est la longueur de la baguette, perpendiculaire au dernier côté, partant de l’angle droit ?", u: "cm", k: 5, max: 200 },
  { o: (a, b, c) => `Un fronton de temple a deux pentes perpendiculaires de ${a} et ${b}, pour une largeur de ${c}.`, q: "Quelle est sa hauteur ?", u: "dm", k: 2, max: 200 },
];

const SITUATIONS_2: { o: (a: string, b: string) => string; q: string; u: string; k: number; max: number }[] = [
  { o: (a, b) => `Les deux pans perpendiculaires d’un toit mesurent ${a} et ${b}.`, q: "Quelle est la hauteur du toit ?", u: "m", k: 1, max: 20 },
  { o: (a, b) => `Une tente a deux pans perpendiculaires de ${a} et ${b}.`, q: "Quelle est la hauteur du mât central ?", u: "dm", k: 1, max: 50 },
  { o: (a, b) => `Un terrain triangulaire a un coin à angle droit, entre des côtés de ${a} et ${b}.`, q: "Quel est le plus court chemin du coin au côté opposé ?", u: "m", k: 5, max: 200 },
  { o: (a, b) => `Une équerre a deux côtés de l’angle droit de ${a} et ${b}.`, q: "Quelle est la distance de l’angle droit au grand côté ?", u: "cm", k: 2, max: 100 },
  { o: (a, b) => `Une voile triangulaire a un angle droit entre des côtés de ${a} et ${b}.`, q: "Quelle est la distance de l’angle droit au grand côté ?", u: "dm", k: 2, max: 120 },
  { o: (a, b) => `Deux câbles perpendiculaires de ${a} et ${b} tiennent un mât.`, q: "Quelle est la hauteur du mât ?", u: "m", k: 2, max: 60 },
  { o: (a, b) => `Deux poutres perpendiculaires de ${a} et ${b} forment une charpente.`, q: "Quelle est la longueur du poteau vertical sous le faîte ?", u: "dm", k: 3, max: 150 },
  { o: (a, b) => `Un fronton a deux pentes perpendiculaires de ${a} et ${b}.`, q: "Quelle est sa hauteur ?", u: "dm", k: 2, max: 200 },
  { o: (a, b) => `Une plaque triangulaire a un angle droit entre des bords de ${a} et ${b}.`, q: "Quelle est la distance de ce coin au bord opposé ?", u: "cm", k: 5, max: 200 },
  { o: (a, b) => `Un champ triangulaire au bord d’une ravine de La Réunion a un angle droit, entre des côtés de ${a} et ${b}.`, q: "Quelle est la distance de ce coin au côté opposé ?", u: "m", k: 5, max: 300 },
];

const ARCHES: { o: string; d: string; q: string; u: string; k: number }[] = [
  { o: "Une arche de pont en demi-cercle", d: "un diamètre", q: "Quelle est sa hauteur à cet endroit ?", u: "m", k: 1 },
  { o: "Un tunnel en demi-cercle", d: "une largeur", q: "Quelle est sa hauteur à cet endroit ?", u: "dm", k: 2 },
  { o: "Une serre en demi-cercle", d: "une largeur", q: "Quelle est sa hauteur à cet endroit ?", u: "dm", k: 1 },
  { o: "Une porte romane en demi-cercle", d: "une largeur", q: "Quelle est sa hauteur à cet endroit, au-dessus du départ de l’arc ?", u: "dm", k: 1 },
  { o: "Un rideau de scène tendu en demi-cercle", d: "une largeur", q: "Quelle est sa hauteur à cet endroit ?", u: "dm", k: 2 },
  { o: "Un hangar en demi-cercle", d: "une largeur", q: "Quelle est sa hauteur à cet endroit ?", u: "m", k: 1 },
  { o: "Un igloo vu en coupe", d: "un diamètre", q: "Quelle est sa hauteur à cet endroit ?", u: "dm", k: 1 },
  { o: "Une grotte en demi-cercle", d: "une largeur", q: "Quelle est la hauteur du plafond à cet endroit ?", u: "m", k: 1 },
  { o: "Un dôme de planétarium vu en coupe", d: "un diamètre", q: "Quelle est sa hauteur à cet endroit ?", u: "m", k: 1 },
  { o: "Une voûte de cathédrale", d: "une largeur", q: "Quelle est sa hauteur à cet endroit, au-dessus du départ de l’arc ?", u: "m", k: 1 },
];

const VISEES: { o: string; m: string }[] = [
  { o: "d’un arbre", m: "Une forestière" },
  { o: "d’une tour", m: "Un géomètre" },
  { o: "d’un mât de voilier", m: "Une navigatrice" },
  { o: "d’un phare", m: "Un gardien" },
  { o: "d’un immeuble", m: "Une architecte" },
  { o: "d’un minaret", m: "Une étudiante" },
  { o: "d’un pylône électrique", m: "Une technicienne" },
  { o: "d’une éolienne", m: "Un ingénieur" },
  { o: "d’un clocher", m: "Un élève" },
  { o: "d’un séquoia", m: "Un garde forestier" },
];
const OEIL: [number, number][] = [[1.6, 4], [1.5, 3], [1.5, 6], [1.6, 8], [2, 6], [2, 8], [1.8, 6], [1.8, 9], [1.5, 9], [2, 10], [1.6, 5], [1.8, 3], [2, 4], [2, 5], [1.5, 5], [1.6, 6]];

const PANS: { o: string; b: string; q: string; u: string; k: number; max: number }[] = [
  { o: "Un toit à deux pans perpendiculaires", b: "large", q: "Quelle est la longueur du pan de ce côté ?", u: "m", k: 1, max: 20 },
  { o: "Une tente à deux pans perpendiculaires", b: "large", q: "Quelle est la longueur du pan de ce côté ?", u: "dm", k: 1, max: 50 },
  { o: "Un fronton à deux pentes perpendiculaires", b: "large", q: "Quelle est la longueur de la pente de ce côté ?", u: "dm", k: 2, max: 200 },
  { o: "Une charpente à deux poutres perpendiculaires", b: "large", q: "Quelle est la longueur de la poutre de ce côté ?", u: "dm", k: 3, max: 150 },
  { o: "Une voile à angle droit", b: "longue", q: "Quelle est la longueur du bord de ce côté ?", u: "dm", k: 2, max: 120 },
  { o: "Une équerre de menuisier", b: "longue", q: "Quelle est la longueur de l’arête de ce côté ?", u: "cm", k: 2, max: 100 },
  { o: "Un pont à deux haubans perpendiculaires", b: "long", q: "Quelle est la longueur du hauban de ce côté ?", u: "m", k: 5, max: 300 },
  { o: "Une rampe à deux faces perpendiculaires", b: "longue", q: "Quelle est la longueur de la face de ce côté ?", u: "dm", k: 1, max: 50 },
  { o: "Un chalet à deux pans perpendiculaires", b: "large", q: "Quelle est la longueur du pan de ce côté ?", u: "m", k: 1, max: 20 },
  { o: "Un terrain triangulaire à angle droit", b: "long", q: "Quelle est la longueur de la clôture de ce côté ?", u: "m", k: 5, max: 200 },
];

export const relationsMetriquesBank = [
  /* ===== AH × BC = AB × AC ===== */

  tpl("metrique_produit", 1, 1, "AH × BC = AB × AC, donc AH = AB × AC ÷ BC.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u} et ${b}${c} = ${t.bc} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u}, ${b}${c} = ${t.bc} ${u}.`, `Ici, ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u} et ${b}${c} = ${t.bc} ${u}.`])} ${un([`Calcule ${a}H.`, `Que vaut ${a}H ?`, `Combien mesure ${a}H ?`, `Trouve la longueur ${a}H.`, `Quelle est la hauteur ${a}H ?`])}`;
    return { text, format: "short", expected: mesure(t.ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, ac: `${t.ac} ${u}`, bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_P, `${a}H × ${b}${c} = ${a}${b} × ${a}${c}.`, `${t.ab} × ${t.ac} ÷ ${t.bc} = ${fr(t.ah)}.`, `${a}H mesure ${fr(t.ah)} ${u}.`) };
  }),

  tpl("metrique_produit", 2, 1, "L’hypoténuse se multiplie par la hauteur, les deux côtés de l’angle droit entre eux.", () => {
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const juste = `${a}H × ${b}${c} = ${a}${b} × ${a}${c}`;
    const text = `${un(CADRES(a, b, c))} ${un(["Quelle égalité est vraie ?", "Laquelle de ces égalités est juste ?", "Quelle relation peut-on écrire ?", "Choisis l’égalité correcte.", "Quelle est la bonne relation ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, [`${a}H × ${a}${b} = ${b}${c} × ${a}${c}`, `${a}H × ${a}${c} = ${a}${b} × ${b}${c}`, `${a}H + ${b}${c} = ${a}${b} + ${a}${c}`, `${a}H × ${a}${b} × ${a}${c} = ${b}${c}`]), expected: [juste], comparator: "mcq_exact", canvas: figure({ a, b, c }, t.hb, t.hc), explanation: expliquer(DEF_P, "l’aire vaut base × hauteur ÷ 2, de deux façons.", `${b}${c} × ${a}H ÷ 2 = ${a}${b} × ${a}${c} ÷ 2.`, juste + ".") };
  }),

  tpl("metrique_produit", 3, 1, "Lis les trois côtés sur la figure, puis côté × côté ÷ hypoténuse.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const text = un([
      `D’après la figure, combien mesure la hauteur ${a}H ?`,
      `Le triangle ${a}${b}${c} est rectangle en ${a}. Lis ses côtés sur la figure et calcule ${a}H.`,
      `Les longueurs sont écrites sur la figure. Calcule la hauteur ${a}H.`,
      `Utilise les côtés de la figure pour trouver ${a}H.`,
      `Sur cette figure, [${a}H] est une hauteur. Que vaut ${a}H ?`,
      `Voici un triangle rectangle en ${a}. Quelle est la longueur de la hauteur ${a}H ?`,
      `La figure donne les trois côtés. Trouve ${a}H.`,
    ]);
    return { text, format: "short", expected: mesure(t.ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, ac: `${t.ac} ${u}`, bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_P, "produit des côtés de l’angle droit, divisé par l’hypoténuse.", `${t.ab} × ${t.ac} ÷ ${t.bc} = ${fr(t.ah)}.`, `${a}H mesure ${fr(t.ah)} ${u}.`) };
  }),

  tpl("metrique_produit", 4, 1, "AH = AB × AC ÷ BC : l’hypoténuse divise.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const juste = `${t.ab} × ${t.ac} ÷ ${t.bc}`;
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u} et ${b}${c} = ${t.bc} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u}, ${b}${c} = ${t.bc} ${u}.`])} ${un([`Quel calcul donne ${a}H ?`, `Lequel de ces calculs donne ${a}H ?`, `Comment calculer ${a}H ?`, `Quel calcul faut-il faire pour trouver ${a}H ?`])}`;
    return { text, format: "qcm", choices: qcm(juste, [`${t.ab} × ${t.bc} ÷ ${t.ac}`, `${t.ac} × ${t.bc} ÷ ${t.ab}`, `${t.ab} × ${t.ac} × ${t.bc}`]), expected: [juste], comparator: "mcq_exact", canvas: figure({ a, b, c }, t.hb, t.hc, { bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_P, "on isole la hauteur en divisant par l’hypoténuse.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("metrique_produit", 5, 2, "Pythagore donne l’hypoténuse, puis la relation donne la hauteur.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u} et ${a}${c} = ${t.ac} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u} et ${a}${c} = ${t.ac} ${u}.`, `Les côtés de l’angle droit mesurent ${a}${b} = ${t.ab} ${u} et ${a}${c} = ${t.ac} ${u}.`])} ${un([`Calcule ${a}H.`, `Que vaut ${a}H ?`, `Calcule ${b}${c}, puis ${a}H : que vaut ${a}H ?`, `Trouve la hauteur ${a}H.`])}`;
    return { text, format: "short", expected: mesure(t.ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, ac: `${t.ac} ${u}` }), explanation: expliquer(DEF_P, `Pythagore donne ${b}${c} = ${t.bc}.`, `${t.ab} × ${t.ac} ÷ ${t.bc} = ${fr(t.ah)}.`, `${a}H mesure ${fr(t.ah)} ${u}.`) };
  }),

  tpl("metrique_produit", 6, 2, "BC = AB × AC ÷ AH.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u} et ${a}H = ${fr(t.ah)} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u}, ${a}H = ${fr(t.ah)} ${u}.`, `Ici, ${a}${b} = ${t.ab} ${u}, ${a}${c} = ${t.ac} ${u} et ${a}H = ${fr(t.ah)} ${u}.`])} ${un([`Sans Pythagore, calcule ${b}${c}.`, `Que vaut ${b}${c} ?`, `Utilise la hauteur pour trouver ${b}${c}.`, `Combien mesure l’hypoténuse ${b}${c} ?`])}`;
    return { text, format: "short", expected: mesure(t.bc, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, ac: `${t.ac} ${u}`, ah: `${fr(t.ah)} ${u}` }), explanation: expliquer(DEF_P, "on isole l’hypoténuse.", `${t.ab} × ${t.ac} ÷ ${fr(t.ah)} = ${t.bc}.`, `${b}${c} mesure ${t.bc} ${u}.`) };
  }),

  tpl("metrique_produit", 7, 2, "AB = AH × BC ÷ AC.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}H = ${fr(t.ah)} ${u}, ${b}${c} = ${t.bc} ${u} et ${a}${c} = ${t.ac} ${u}.`, `On sait que ${a}H = ${fr(t.ah)} ${u}, ${b}${c} = ${t.bc} ${u}, ${a}${c} = ${t.ac} ${u}.`, `Ici, ${a}H = ${fr(t.ah)} ${u}, ${b}${c} = ${t.bc} ${u} et ${a}${c} = ${t.ac} ${u}.`])} ${un([`Calcule ${a}${b}.`, `Que vaut ${a}${b} ?`, `Combien mesure ${a}${b} ?`, `Trouve la longueur ${a}${b}.`])}`;
    return { text, format: "short", expected: mesure(t.ab, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ac: `${t.ac} ${u}`, bc: `${t.bc} ${u}`, ah: `${fr(t.ah)} ${u}` }), explanation: expliquer(DEF_P, "on isole le côté cherché.", `${fr(t.ah)} × ${t.bc} ÷ ${t.ac} = ${t.ab}.`, `${a}${b} mesure ${t.ab} ${u}.`) };
  }),

  tpl("metrique_produit", 8, 2, "L’aire vaut hypoténuse × hauteur ÷ 2 : hauteur = aire × 2 ÷ hypoténuse.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const aire = (t.ab * t.ac) / 2;
    const text = `${un(CADRES(a, b, c))} ${un([`Son aire vaut ${fr(aire)} ${u}², et ${b}${c} = ${t.bc} ${u}.`, `Il a une aire de ${fr(aire)} ${u}², avec ${b}${c} = ${t.bc} ${u}.`, `On sait que ${b}${c} = ${t.bc} ${u}, et que son aire vaut ${fr(aire)} ${u}².`])} ${un([`Calcule ${a}H.`, `Que vaut ${a}H ?`, `Trouve la hauteur ${a}H.`, `Combien mesure ${a}H ?`])}`;
    return { text, format: "short", expected: mesure(t.ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_P, "aire = hypoténuse × hauteur ÷ 2.", `${fr(aire)} × 2 ÷ ${t.bc} = ${fr(t.ah)}.`, `${a}H mesure ${fr(t.ah)} ${u}.`) };
  }),

  tpl("metrique_produit", 9, 3, "Deux côtés de l’angle droit, une hypoténuse : côté × côté ÷ hypoténuse.", () => {
    const o = un(SITUATIONS);
    const t = triangle(o.max / o.k);
    const f = (x: number) => `${fr(x * o.k)} ${o.u}`;
    const reponse = t.ah * o.k;
    const text = `${o.o(f(t.ab), f(t.ac), f(t.bc))} ${o.q}`;
    return { text, format: "short", expected: mesure(reponse, o.u), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, t.hb, t.hc, { ab: f(t.ab), ac: f(t.ac), bc: f(t.bc) }, true), explanation: expliquer(DEF_P, "la longueur cherchée est la hauteur issue de l’angle droit.", `${fr(t.ab * o.k)} × ${fr(t.ac * o.k)} ÷ ${fr(t.bc * o.k)} = ${fr(reponse)}.`, `elle mesure ${fr(reponse)} ${o.u}.`) };
  }),

  tpl("metrique_produit", 10, 3, "Il manque l’hypoténuse : Pythagore d’abord, puis la relation.", () => {
    const o = un(SITUATIONS_2);
    const t = triangle(o.max / o.k);
    const f = (x: number) => `${fr(x * o.k)} ${o.u}`;
    const reponse = t.ah * o.k;
    const text = `${o.o(f(t.ab), f(t.ac))} ${o.q} ${un(["", "Calcule d’abord le troisième côté."])}`.trim();
    return { text, format: "short", expected: mesure(reponse, o.u), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, t.hb, t.hc, { ab: f(t.ab), ac: f(t.ac) }, true), explanation: expliquer(DEF_P, `Pythagore donne le grand côté : ${fr(t.bc * o.k)}.`, `${fr(t.ab * o.k)} × ${fr(t.ac * o.k)} ÷ ${fr(t.bc * o.k)} = ${fr(reponse)}.`, `elle mesure ${fr(reponse)} ${o.u}.`) };
  }),

  tpl("metrique_produit", 11, 3, "Grand côté = côté × côté ÷ hauteur.", () => {
    const o = un(SITUATIONS_2);
    const t = triangle(o.max / o.k);
    const f = (x: number) => `${fr(x * o.k)} ${o.u}`;
    const reponse = t.bc * o.k;
    const q = o.q.replace(/ \?$/, "").replace(/^Quelle est |^Quel est /, "");
    const debut = o.o(f(t.ab), f(t.ac));
    const text = `${debut} On mesure ${f(t.ah)} pour ${q}. ${un(["Sans Pythagore, combien mesure le troisième côté ?", "Quelle est la longueur du troisième côté ? Utilise la hauteur.", "Trouve le troisième côté grâce à cette mesure."])}`;
    return { text, format: "short", expected: mesure(reponse, o.u), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, t.hb, t.hc, { ab: f(t.ab), ac: f(t.ac), ah: f(t.ah) }, true), explanation: expliquer(DEF_P, "on isole le grand côté dans la relation.", `${fr(t.ab * o.k)} × ${fr(t.ac * o.k)} ÷ ${fr(t.ah * o.k)} = ${fr(reponse)}.`, `il mesure ${fr(reponse)} ${o.u}.`) };
  }),

  /* ===== AH² = HB × HC, AB² = BH × BC ===== */

  tpl("metrique_carre", 1, 1, "AH² = HB × HC : on multiplie, puis on prend la racine carrée.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const [hb, hc] = couple();
    const ah = Math.sqrt(hb * hc);
    const text = `${un(CADRES(a, b, c))} ${un([`On a H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `On sait que H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `Ici, H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `Le point H découpe l’hypoténuse : H${b} = ${hb} ${u}, H${c} = ${hc} ${u}.`])} ${un([`Calcule ${a}H.`, `Que vaut ${a}H ?`, `Combien mesure ${a}H ?`, `Trouve la hauteur ${a}H.`])}`;
    return { text, format: "short", expected: mesure(ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, hb, hc, { hb: `${hb} ${u}`, hc: `${hc} ${u}` }), explanation: expliquer(DEF_C, `${a}H² = H${b} × H${c}.`, `${hb} × ${hc} = ${hb * hc}, et √${hb * hc} = ${ah}.`, `${a}H mesure ${ah} ${u}.`) };
  }),

  tpl("metrique_carre", 2, 1, "AB² = BH × BC : le côté, sa projection, l’hypoténuse.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${b}H = ${fr(t.hb)} ${u} et ${b}${c} = ${t.bc} ${u}.`, `On sait que ${b}H = ${fr(t.hb)} ${u} et ${b}${c} = ${t.bc} ${u}.`, `Ici, ${b}H = ${fr(t.hb)} ${u}, et l’hypoténuse ${b}${c} = ${t.bc} ${u}.`])} ${un([`Calcule ${a}${b}.`, `Que vaut ${a}${b} ?`, `Combien mesure ${a}${b} ?`, `Trouve la longueur ${a}${b}.`])}`;
    return { text, format: "short", expected: mesure(t.ab, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { hb: `${fr(t.hb)} ${u}`, bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_C, `${a}${b}² = ${b}H × ${b}${c}.`, `${fr(t.hb)} × ${t.bc} = ${t.ab * t.ab}, et √${t.ab * t.ab} = ${t.ab}.`, `${a}${b} mesure ${t.ab} ${u}.`) };
  }),

  tpl("metrique_carre", 3, 1, "La hauteur au carré, c’est le produit des deux morceaux de l’hypoténuse.", () => {
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const cas = un([
      { juste: `${a}H² = H${b} × H${c}`, faux: [`${a}H² = H${b} + H${c}`, `${a}H² = ${a}${b} × ${a}${c}`, `${a}H² = H${b} × ${b}${c}`] },
      { juste: `${a}${b}² = ${b}H × ${b}${c}`, faux: [`${a}${b}² = ${c}H × ${b}${c}`, `${a}${b}² = ${b}H × ${c}H`, `${a}${b}² = ${b}H + ${b}${c}`] },
      { juste: `${a}${c}² = ${c}H × ${c}${b}`, faux: [`${a}${c}² = ${b}H × ${c}${b}`, `${a}${c}² = ${b}H × ${c}H`, `${a}${c}² = ${c}H + ${c}${b}`] },
    ]);
    const text = `${un(CADRES(a, b, c))} ${un(["Quelle égalité est vraie ?", "Laquelle de ces égalités est juste ?", "Quelle relation peut-on écrire ?", "Choisis l’égalité correcte.", "Quelle est la bonne relation ?"])}`;
    return { text, format: "qcm", choices: qcm(cas.juste, cas.faux), expected: [cas.juste], comparator: "mcq_exact", canvas: figure({ a, b, c }, t.hb, t.hc), explanation: expliquer(DEF_C, "les triangles formés par la hauteur sont semblables au grand triangle.", cas.juste + ".", `la bonne relation est ${cas.juste}.`) };
  }),

  tpl("metrique_carre", 4, 1, "AH² se lit directement : c’est H_ × H_.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const hb = entre(2, 20);
    const hc = entre(2, 20);
    const text = `${un(CADRES(a, b, c))} ${un([`On a H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `On sait que H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `Ici, H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`])} ${un([`Combien vaut ${a}H² ?`, `Calcule ${a}H².`, `Que vaut le carré de ${a}H ?`, `Donne la valeur de ${a}H².`])}`;
    return { text, format: "short", expected: mesure(hb * hc, `${u}²`), comparator: "number_equal", canvas: figure({ a, b, c }, hb, hc, { hb: `${hb} ${u}`, hc: `${hc} ${u}` }), explanation: expliquer(DEF_C, `${a}H² = H${b} × H${c}.`, `${hb} × ${hc} = ${hb * hc}.`, `${a}H² vaut ${hb * hc} ${u}².`) };
  }),

  tpl("metrique_carre", 5, 2, "HC = AH² ÷ HB.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const [hb, hc] = couple();
    const ah = Math.sqrt(hb * hc);
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}H = ${ah} ${u} et H${b} = ${hb} ${u}.`, `On sait que ${a}H = ${ah} ${u} et H${b} = ${hb} ${u}.`, `Ici, ${a}H = ${ah} ${u} et H${b} = ${hb} ${u}.`])} ${un([`Calcule H${c}.`, `Que vaut H${c} ?`, `Combien mesure H${c} ?`, `Trouve la longueur H${c}.`])}`;
    return { text, format: "short", expected: mesure(hc, u), comparator: "number_equal", canvas: figure({ a, b, c }, hb, hc, { ah: `${ah} ${u}`, hb: `${hb} ${u}` }), explanation: expliquer(DEF_C, `${a}H² = H${b} × H${c}.`, `${ah} × ${ah} ÷ ${hb} = ${hc}.`, `H${c} mesure ${hc} ${u}.`) };
  }),

  tpl("metrique_carre", 6, 2, "BC = AB² ÷ BH.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle();
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u} et ${b}H = ${fr(t.hb)} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u} et ${b}H = ${fr(t.hb)} ${u}.`, `Ici, ${a}${b} = ${t.ab} ${u} et ${b}H = ${fr(t.hb)} ${u}.`])} ${un([`Calcule ${b}${c}.`, `Que vaut ${b}${c} ?`, `Combien mesure l’hypoténuse ${b}${c} ?`, `Trouve la longueur ${b}${c}.`])}`;
    return { text, format: "short", expected: mesure(t.bc, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, hb: `${fr(t.hb)} ${u}` }), explanation: expliquer(DEF_C, `${a}${b}² = ${b}H × ${b}${c}.`, `${t.ab} × ${t.ab} ÷ ${fr(t.hb)} = ${t.bc}.`, `${b}${c} mesure ${t.bc} ${u}.`) };
  }),

  tpl("metrique_carre", 7, 2, "BH = AB² ÷ BC.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    const t = triangle(50);
    const text = `${un(CADRES(a, b, c))} ${un([`On a ${a}${b} = ${t.ab} ${u} et ${b}${c} = ${t.bc} ${u}.`, `On sait que ${a}${b} = ${t.ab} ${u} et ${b}${c} = ${t.bc} ${u}.`, `Ici, ${a}${b} = ${t.ab} ${u} et ${b}${c} = ${t.bc} ${u}.`])} ${un([`Calcule ${b}H.`, `Que vaut ${b}H ?`, `Combien mesure ${b}H ?`, `Trouve la longueur ${b}H.`])}`;
    return { text, format: "short", expected: mesure(t.hb, u), comparator: "number_equal", canvas: figure({ a, b, c }, t.hb, t.hc, { ab: `${t.ab} ${u}`, bc: `${t.bc} ${u}` }), explanation: expliquer(DEF_C, `${a}${b}² = ${b}H × ${b}${c}.`, `${t.ab} × ${t.ab} ÷ ${t.bc} = ${fr(t.hb)}.`, `${b}H mesure ${fr(t.hb)} ${u}.`) };
  }),

  tpl("metrique_carre", 8, 2, "Prends le produit, puis la racine carrée, et arrondis à la fin.", () => {
    const u = un(UNITES);
    const [a, b, c] = nomsTriangle();
    let hb = entre(2, 15);
    let hc = entre(2, 15);
    while (Number.isInteger(Math.sqrt(hb * hc))) {
      hb = entre(2, 15);
      hc = entre(2, 15);
    }
    const ah = Math.round(Math.sqrt(hb * hc) * 10) / 10;
    const text = `${un(CADRES(a, b, c))} ${un([`On a H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `On sait que H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`, `Ici, H${b} = ${hb} ${u} et H${c} = ${hc} ${u}.`])} ${un([`Calcule ${a}H, arrondi au dixième.`, `Donne ${a}H au dixième près.`, `Que vaut ${a}H, au dixième ?`, `Trouve une valeur approchée de ${a}H au dixième.`])}`;
    return { text, format: "short", expected: mesure(ah, u), comparator: "number_equal", canvas: figure({ a, b, c }, hb, hc, { hb: `${hb} ${u}`, hc: `${hc} ${u}` }), explanation: expliquer(DEF_C, `${a}H² = H${b} × H${c}.`, `${hb} × ${hc} = ${hb * hc}, et √${hb * hc} ≈ ${fr(ah)}.`, `${a}H mesure environ ${fr(ah)} ${u}.`) };
  }),

  tpl("metrique_carre", 9, 3, "La hauteur coupe le diamètre en deux morceaux : h² = produit des morceaux.", () => {
    const o = un(ARCHES);
    const [hb, hc] = couple();
    const h = Math.sqrt(hb * hc) * o.k;
    const D = (hb + hc) * o.k;
    const x = hb * o.k;
    const text = phrase(
      [`${o.o} a ${o.d} de ${D} ${o.u}. On se place à ${x} ${o.u} d’un des pieds.`, `${o.o} a ${o.d} de ${D} ${o.u}. On mesure sa hauteur à ${x} ${o.u} d’un bord.`, `${o.o} a ${o.d} de ${D} ${o.u}, et on regarde à ${x} ${o.u} de l’un des bords.`],
      [o.q],
    );
    return { text, format: "short", expected: mesure(h, o.u), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, hb, hc, { hb: `${x} ${o.u}`, bc: `${D} ${o.u}` }, true), explanation: expliquer(DEF_C, "le triangle inscrit dans le demi-cercle est rectangle : la hauteur coupe le diamètre en deux morceaux.", `${x} × ${D - x} = ${x * (D - x)}, et √${x * (D - x)} = ${h}.`, `la hauteur est de ${h} ${o.u}.`) };
  }),

  tpl("metrique_carre", 10, 3, "L’œil, le sommet, le pied : un triangle rectangle. distance² = hauteur de l’œil × reste.", () => {
    const o = un(VISEES);
    const [e, d] = un(OEIL);
    const reste = (d * d) / e;
    const total = Math.round((reste + e) * 10) / 10;
    const text = phrase(
      [
        `${o.m} tient une équerre à ${fr(e)} m du sol, à ${d} m du pied ${o.o}. Un côté de l’équerre vise le sommet, l’autre le pied.`,
        `Pour mesurer la hauteur ${o.o}, ${o.m.toLowerCase()} se place à ${d} m du pied, l’équerre à ${fr(e)} m du sol, et vise le sommet et le pied.`,
        `À ${d} m du pied ${o.o}, ${o.m.toLowerCase()} vise le sommet et le pied avec une équerre tenue à ${fr(e)} m du sol.`,
      ],
      ["Quelle est la hauteur totale, au dixième ?", "Combien cela fait-il du sol au sommet, au dixième ?", "Calcule la hauteur totale, arrondie au dixième."],
    );
    return { text, format: "short", expected: mesure(total, "m"), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, e, reste, { ah: `${d} m`, hb: `${fr(e)} m` }, true), explanation: expliquer(DEF_C, "l’équerre est au sommet de l’angle droit, et la distance au pied est la hauteur du triangle.", `${d} × ${d} ÷ ${fr(e)} = ${fr(reste)}, puis ${fr(reste)} + ${fr(e)} = ${fr(total)}.`, `la hauteur totale est de ${fr(total)} m.`) };
  }),

  tpl("metrique_carre", 11, 3, "côté² = sa projection × hypoténuse.", () => {
    const o = un(PANS);
    const t = triangle(o.max / o.k);
    const f = (x: number) => `${fr(x * o.k)} ${o.u}`;
    const reponse = t.ab * o.k;
    const text = phrase(
      [
        `${o.o} est ${o.b} de ${f(t.bc)}. La hauteur issue de l’angle droit tombe à ${f(t.hb)} d’un bord.`,
        `${o.o} mesure ${f(t.bc)} d’un bord à l’autre. La hauteur issue de l’angle droit arrive à ${f(t.hb)} d’un bord.`,
        `${o.o} a une base de ${f(t.bc)}. Le pied de la hauteur issue de l’angle droit est à ${f(t.hb)} d’un bout.`,
      ],
      [o.q],
    );
    return { text, format: "short", expected: mesure(reponse, o.u), comparator: "number_equal", canvas: figure({ a: "A", b: "B", c: "C" }, t.hb, t.hc, { hb: f(t.hb), bc: f(t.bc) }, true), explanation: expliquer(DEF_C, "le côté cherché a pour projection le morceau donné.", `${fr(t.hb * o.k)} × ${fr(t.bc * o.k)} = ${fr(reponse * reponse)}, et la racine donne ${fr(reponse)}.`, `il mesure ${fr(reponse)} ${o.u}.`) };
  }),
];
