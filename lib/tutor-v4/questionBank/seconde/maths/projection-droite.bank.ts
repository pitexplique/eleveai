// PROJECTION SUR UNE DROITE PARALLÈLEMENT À UNE AUTRE (06/11/2026). Hors programme français de 2de
// (registre `hors_france`). Lignes visées : Maroc TC II-2, Belgique S6 3.3.1c, Sénégal 4e AG 6.
// `geo_projete_orthogonal` calcule le pied d'une perpendiculaire dans un repère : ici, on travaille
// ce que la projection conserve (milieux, rapports sur une même direction), et le lien avec Thalès.
// Les noms de segments restent du texte, avec des espaces insécables : rien ne se coupe autour de
// « = » ni avant le point (rapport des captures du 05/11).

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl as explBrut, fabrique, fr, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "projection_droite", "2de_");
const M = "projection_parallele";

const NB = " ";
/** Dans une explication : « 5 + (−1) », jamais « 5 + -1 ». */
const expl = (a: string, b: string, c: string, d: string) =>
  explBrut(a, b, c, d).replace(/([+×÷−-] )-(\d+(?:,\d+)?)/g, "$1(−$2)").replace(/(^|[\s(|])-(\d)/g, "$1−$2");
const qu = (s: string) => s.replace(/ \?/g, `${NB}?`).replace(/ :/g, `${NB}:`);
const eg = (x: string, v: number, u = "cm") => `${x}${NB}=${NB}${fr(v)}${NB}${u}`;
const moins = (s: string) => s.replace(/-/g, "−");
const TRIO = [["A", "B", "C"], ["A", "B", "C"], ["E", "F", "G"], ["M", "N", "P"], ["R", "S", "T"], ["K", "L", "U"]];
const UNITES = ["cm", "cm", "dm", "m", "mm"];
const PAR = ["sur la droite (d) parallèlement à la droite (δ)", "sur (d) parallèlement à (δ)", "sur (d), dans la direction de (δ)", "sur la droite (d), selon la direction de (δ)"];
const OUVRE = (p: string) => un([`On note p la projection ${p}.`, `Soit p la projection ${p}.`, `On projette ${p}.`, `On considère la projection ${p}.`, `La lettre p désigne la projection ${p}.`]);
const DEF = "la projection sur (d) parallèlement à (δ) envoie un point M sur le point M' de (d) tel que (MM') soit parallèle à (δ).";
const DEF_R = "une projection conserve les milieux et les rapports de longueurs sur une même droite, ou sur des droites parallèles (si elles ne sont pas parallèles à (δ)) : c'est le théorème de Thalès.";

/* ───────────────── figures ───────────────── */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
const r2 = (x: number) => Math.round(x * 100) / 100;
/** (d) et (δ) : l'angle de (d) et celui de (δ) par rapport à (d), jamais droit. */
function directions() {
  const al = un([0, 0, 0, 8, -8, 12, -12]);
  const be = un([48, 55, 62, 118, 125, 132]);
  const u = { x: Math.cos(rad(al)), y: Math.sin(rad(al)) };
  const v = { x: Math.cos(rad(al + be)), y: Math.sin(rad(al + be)) };
  return { u, v, n: { x: -u.y, y: u.x } };
}
const surD = (u: Pt, t: number): Pt => ({ x: r2(u.x * t), y: r2(u.y * t) });
function cadre(u: Pt, v: Pt, n: Pt, tMin: number, tMax: number, hMax: number) {
  const a = surD(u, tMin - 1);
  const b = surD(u, tMax + 1);
  const dn = { x: r2(u.x * (tMax + 0.1) + n.x * 0.01), y: r2(u.y * (tMax + 0.1) + n.y * 0.01) };
  const d0 = { x: r2(u.x * tMax + n.x * hMax * 0.8), y: r2(u.y * tMax + n.y * hMax * 0.8) };
  const d1 = { x: r2(d0.x + v.x * 1.8), y: r2(d0.y + v.y * 1.8) };
  return { a, b, dn, d0, d1 };
}
function baseFigure(c: ReturnType<typeof cadre>) {
  return {
    points: [
      { id: "d_0", ...c.a, cache: true }, { id: "d_1", ...c.b, cache: true }, { id: "d_n", ...c.dn, cache: true },
      { id: "dir_0", ...c.d0, cache: true }, { id: "dir_1", ...c.d1, cache: true },
    ],
    droites: [{ a: "d_0", b: "d_1", couleur: "#2563eb" }],
    segments: [
      { a: "d_n", b: "d_1", texte: "(d)", sansTrait: true, couleur: "#2563eb" },
      { a: "dir_0", b: "dir_1", texte: "(δ)", couleur: "#dc2626" },
    ] as Record<string, unknown>[],
  };
}
/** Un point à projeter, et quatre candidats sur (d) : l'image, le pied de la perpendiculaire, deux leurres. */
function figureCandidats(nom: string, lettres: string[]) {
  const { u, v, n } = directions();
  const s0 = 1;
  const h = un([3, 3.5, 4]);
  const vu = v.x * u.x + v.y * u.y;
  const vn = v.x * n.x + v.y * n.y;
  const t = s0 - (h * vu) / vn;
  const P = { x: u.x * s0 + n.x * h, y: u.y * s0 + n.y * h };
  const ts = [t, s0, s0 + (s0 - t), t + (t > s0 ? 2.2 : -2.2)].sort((a, b) => a - b);
  const c = cadre(u, v, n, ts[0], Math.max(ts[3], s0 + 3), h);
  const b = baseFigure(c);
  const noms = lettres.slice(0, 4);
  const cand = ts.map((x, i) => ({ id: noms[i], ...surD(u, x) }));
  const juste = noms[ts.indexOf(t)];
  const fig = { kind: "construction", points: [...b.points, { id: nom, x: r2(P.x), y: r2(P.y) }, ...cand], droites: b.droites, segments: b.segments, description: "La droite (d), la direction (δ), un point et quatre points de (d)." } as CanvasFigure;
  return { fig, juste, noms };
}
/** Des points alignés sur une oblique, à des distances proportionnelles aux longueurs de l'énoncé. */
function figureAlignes(noms: string[], pos: number[]) {
  const { u, v, n } = directions();
  const k = 6 / Math.max(...pos.map(Math.abs), 1e-6);
  const w = un([18, -18, 25]);
  const dir = { x: u.x * Math.cos(rad(w)) - u.y * Math.sin(rad(w)), y: u.y * Math.cos(rad(w)) + u.x * Math.sin(rad(w)) };
  const O = { x: u.x * 0 + n.x * 4.5, y: u.y * 0 + n.y * 4.5 };
  const hauts = pos.map((p) => ({ x: O.x + dir.x * p * k, y: O.y + dir.y * p * k }));
  const vn = v.x * n.x + v.y * n.y;
  const ims = hauts.map((P) => {
    const h = P.x * n.x + P.y * n.y;
    return { x: P.x - (h / vn) * v.x, y: P.y - (h / vn) * v.y };
  });
  const ts = ims.map((i) => i.x * u.x + i.y * u.y);
  // (δ) se pose à droite de tout : sur la figure, elle ne doit croiser ni un point ni une liaison.
  const tout = [...ts, ...hauts.map((h) => h.x * u.x + h.y * u.y)];
  const c = cadre(u, v, n, Math.min(...tout), Math.max(...tout) + 1.8 + Math.max(0, -1.8 * (v.x * u.x + v.y * u.y)), 5);
  const b = baseFigure(c);
  const points = [...b.points];
  const segments = [...b.segments];
  noms.forEach((x, i) => {
    points.push({ id: x, x: r2(hauts[i].x), y: r2(hauts[i].y), cache: false }, { id: `${x}'`, x: r2(ims[i].x), y: r2(ims[i].y), cache: false });
    segments.push({ a: x, b: `${x}'`, pointille: true, couleur: "#64748b" });
  });
  segments.push({ a: noms[0], b: noms[noms.length - 1], couleur: "#0f172a" });
  return { kind: "construction", points, droites: b.droites, segments, description: "Des points alignés, leurs images sur (d), et les parallèles à (δ) qui les relient." } as CanvasFigure;
}

/* ───────────────── contextes ───────────────── */

const OMBRES = [
  "Au coucher du soleil, un câble tendu porte trois fanions",
  "Le long d'une rampe d'accès, trois lampes sont fixées",
  "Sur le hauban d'un voilier, trois poulies sont alignées",
  "Sur le fil d'une tyrolienne, trois repères sont peints",
  "Sur une échelle de pompier appuyée à un mur, trois barreaux sont repérés",
  "Le long d'un tapis roulant incliné, trois colis sont posés",
  "Sur une rampe de skate, trois marques sont tracées",
  "Sur le câble d'un téléphérique, trois pinces sont fixées",
  "Sur une conduite de montagne, trois vannes sont placées",
  "Sur la rambarde d'un sentier du Maïdo, à La Réunion, trois panneaux sont fixés",
  "Sur le bras incliné d'une grue, trois projecteurs sont alignés",
  "Sur le tuyau d'un toboggan, trois repères sont collés",
];
const LIGNES = [
  ["Une couturière", "une bande de tissu"], ["Un ébéniste", "une planche"], ["Une graphiste", "une bande de papier"], ["Un carreleur", "une baguette"],
  ["Une architecte", "une règle de carton"], ["Un luthier", "une bande de bois"], ["Une élève", "une feuille cartonnée"], ["Un relieur", "une bande de cuir"],
  ["Une tapissière", "un galon"], ["Un maquettiste", "une latte"],
];
const INCLINES = [
  ["Une rampe d'accès", "le sol"], ["Le câble d'une tyrolienne", "le sol"], ["Une échelle", "le sol"], ["Un toboggan", "le sol"], ["Un tapis roulant", "le sol du hangar"],
  ["Une passerelle", "le quai"], ["Un toit plat incliné", "le sol"], ["Un rail de travelling", "le plateau"], ["Une piste de lancement de drone", "le terrain"], ["Une gouttière", "le sol"],
];

/* ───────────────── gabarits ───────────────── */

const FAITS: { q: (a: string, b: string) => string; j: (a: string, b: string) => string; f: (a: string, b: string) => string[]; c: string }[] = [
  { q: (a) => `Le point ${a} est sur la droite (d). Quelle est son image ?`, j: (a) => `${a} lui-même`, f: () => ["Le pied de la perpendiculaire", "Un autre point de (d)", "Il n'a pas d'image"], c: "Un point de (d) ne bouge pas : la parallèle à (δ) qui passe par lui coupe (d) en lui-même." },
  { q: (a, b) => `La droite (${a}${b}) est parallèle à (δ). Que peut-on dire des images de ${a} et de ${b} ?`, j: () => "Elles sont confondues", f: () => ["Elles sont symétriques", "Leur distance reste la même", "Elles n'existent pas"], c: "Une même parallèle à (δ) passe par les deux points : elle coupe (d) en un seul point." },
  { q: (a, b) => `Le point I est le milieu de [${a}${b}]. Où se trouve l'image de I ?`, j: (a, b) => `Au milieu de [${a}'${b}']`, f: (a, b) => [`En ${a}'`, `Au tiers de [${a}'${b}']`, "On ne peut pas le savoir"], c: "Une projection conserve les milieux." },
  { q: () => "Où se trouvent les images de tous les points du plan ?", j: () => "Sur la droite (d)", f: () => ["Sur la droite (δ)", "Sur une droite parallèle à (δ)", "Partout dans le plan"], c: "Par définition, l'image est un point de (d)." },
  { q: () => "On suppose (δ) perpendiculaire à (d). Comment s'appelle cette projection ?", j: () => "La projection orthogonale sur (d)", f: () => ["La symétrie d'axe (d)", "La translation de direction (δ)", "La rotation d'angle droit"], c: "Quand (δ) est perpendiculaire à (d), le projeté est le pied de la perpendiculaire : c'est la projection orthogonale." },
  { q: (a, b) => `Le segment [${a}${b}] est parallèle à (d). Que peut-on dire de ${a}'${b}' ?`, j: (a, b) => `${a}'${b}'${NB}=${NB}${a}${b}`, f: (a, b) => [`${a}'${b}'${NB}=${NB}2${NB}×${NB}${a}${b}`, `${a}'${b}'${NB}<${NB}${a}${b}`, `${a}'${b}'${NB}=${NB}0`], c: "Le segment et (d) sont parallèles, ses deux liaisons aussi : on obtient un parallélogramme." },
];
const CONSERVE = [
  { q: (a: string, b: string, c: string, e: string) => `Les segments [${a}${b}] et [${c}${e}] sont parallèles. A-t-on toujours ${a}'${b}' ÷ ${c}'${e}'${NB}=${NB}${a}${b} ÷ ${c}${e} ?`, oui: true, c: "Sur des droites parallèles, le rapport est conservé." },
  { q: (a: string, b: string, c: string, e: string) => `Les segments [${a}${b}] et [${c}${e}] ne sont pas parallèles. A-t-on toujours ${a}'${b}' ÷ ${c}'${e}'${NB}=${NB}${a}${b} ÷ ${c}${e} ?`, oui: false, c: "Sur des directions différentes, chaque segment est réduit différemment : le rapport n'est pas conservé." },
  { q: (a: string, b: string, c: string, e: string) => `Les points ${a}, ${b}, ${c} et ${e} sont alignés. A-t-on toujours ${a}'${b}' ÷ ${c}'${e}'${NB}=${NB}${a}${b} ÷ ${c}${e} ?`, oui: true, c: "Sur une même droite, le rapport est conservé." },
  { q: (a: string, b: string) => `A-t-on toujours ${a}'${b}'${NB}=${NB}${a}${b} ?`, oui: false, c: "Une projection ne conserve pas les longueurs en général." },
];
const OUI = "Oui, toujours";
const NON = "Non, pas en général";

export const projectionDroiteBank: TutorBankItemV4[] = [
  tpl(M, 1, 1, "Trace mentalement la parallèle à (δ) qui passe par le point : où coupe-t-elle (d) ?", () => {
    const nom = un(["A", "B", "M", "N", "E"]);
    const { fig, juste, noms } = figureCandidats(nom, un([["P", "Q", "R", "S"], ["F", "G", "H", "K"], ["T", "U", "V", "W"], ["I", "J", "K", "L"]]));
    const q = un([`Quel point est l'image de ${nom} par cette projection ?`, `Sur quel point de (d) le point ${nom} est-il envoyé ?`, `Quelle est l'image de ${nom} ?`, `Lequel de ces points est le projeté de ${nom} ?`, `Où arrive le point ${nom} après la projection ?`]);
    return qcm(qu(`${OUVRE(un(PAR))}\n\n${q}`), juste, noms, expl(DEF, `mène par ${nom} la parallèle à (δ).`, `Elle coupe (d) en ${juste}.`, `L'image de ${nom} est ${juste}.`), fig);
  }),
  tpl(M, 2, 1, "Une projection conserve les milieux : l'abscisse du milieu est la moyenne des deux abscisses.", () => {
    const [a, b] = un(TRIO);
    const x = entre(-9, 9);
    const y = x + 2 * entre(1, 8) * un([1, 1, -1]);
    const m = (x + y) / 2;
    const debut = un(["Sur (d), munie d'un repère,", "La droite (d) est graduée :", "Sur la droite (d), graduée,", "On gradue la droite (d) :"]);
    const q = un(["Quelle est l'abscisse de I' ?", "Quelle abscisse a le point I' ?", "Où se trouve I' sur (d) : à quelle abscisse ?", "Que vaut l'abscisse de I' ?"]);
    return court(
      qu(`${OUVRE(un(PAR))} ${debut} ${a}' a pour abscisse ${moins(String(x))} et ${b}' a pour abscisse ${moins(String(y))}. Le point I est le milieu de [${a}${b}], et I' est son image.\n\n${q}`),
      m,
      expl(DEF_R, "I' est le milieu de [A'B'] : prends la moyenne des abscisses.", `(${x} + ${y}) ÷ 2 = ${m}.`, `I' a pour abscisse ${m}.`),
    );
  }),
  tpl(M, 3, 1, "Le milieu reste le milieu : la moitié de la longueur image.", () => {
    const [a, b] = un(TRIO);
    const u = un(UNITES);
    const v = 2 * entre(2, 15);
    const cas = entre(0, 2);
    const pre = `${OUVRE(un(PAR))} Le point I est le milieu de [${a}${b}]. On note ${a}', ${b}' et I' leurs images.`;
    const fig = figureAlignes([a, "I", b], [0, 1, 2]);
    if (cas === 0) {
      const q = un([`Combien mesure ${a}'I' ?`, `Quelle est la longueur ${a}'I' ?`, `Que vaut ${a}'I' ?`]);
      return court(qu(`${pre} On mesure ${eg(`${a}'${b}'`, v, u)}.\n\n${q}`), v / 2, expl(DEF_R, "I' est le milieu de l'image.", `${v} ÷ 2 = ${v / 2}.`, `${a}'I' = ${v / 2} ${u}.`), fig);
    }
    if (cas === 1) {
      const q = un([`Combien mesure I'${b}' ?`, `Quelle est la longueur I'${b}' ?`, `Que vaut I'${b}' ?`]);
      return court(qu(`${pre} On mesure ${eg(`${a}'${b}'`, v, u)}.\n\n${q}`), v / 2, expl(DEF_R, "I' est le milieu de l'image.", `${v} ÷ 2 = ${v / 2}.`, `I'${b}' = ${v / 2} ${u}.`), fig);
    }
    const q = un([`Combien mesure ${a}'${b}' ?`, `Quelle est la longueur ${a}'${b}' ?`, `Que vaut ${a}'${b}' ?`]);
    return court(qu(`${pre} On mesure ${eg(`${a}'I'`, v, u)}.\n\n${q}`), 2 * v, expl(DEF_R, "I' est le milieu de l'image.", `2 × ${v} = ${2 * v}.`, `${a}'${b}' = ${2 * v} ${u}.`), fig);
  }),
  tpl(M, 4, 1, "Reviens à la définition : on suit la parallèle à (δ) jusqu'à (d).", () => {
    const [a, b] = un(TRIO);
    const k = entre(0, FAITS.length - 1);
    const fait = FAITS[k];
    const j = fait.j(a, b);
    return qcm(qu(`${OUVRE(un(PAR))}\n\n${fait.q(a, b)}`), j, fait.f(a, b), expl(DEF, "applique la définition à ce cas.", fait.c, `Réponse : ${j}.`));
  }),

  /* ★2 */
  tpl(M, 5, 2, "Sur une même droite, les rapports sont conservés : cherche le coefficient qui passe de la figure à son image.", () => {
    const [a, b, c] = un(TRIO);
    const u = un(UNITES);
    const r = un([0.5, 1.5, 2, 0.8, 1.25, 0.75, 3]);
    const base = un([4, 8, 12, 16, 20]);
    const ab = base;
    const ac = base * un([1.5, 2, 2.5, 3, 4, 5]);
    const abi = ab * r;
    const aci = ac * r;
    const q = un([`Combien mesure ${a}'${c}' ?`, `Quelle est la longueur ${a}'${c}' ?`, `Que vaut ${a}'${c}' ?`, `Déduis-en la longueur ${a}'${c}'.`]);
    return court(
      qu(`${OUVRE(un(PAR))} Les points ${a}, ${b} et ${c} sont alignés, et leurs images sont ${a}', ${b}' et ${c}'. On a ${eg(`${a}${b}`, ab, u)}, ${eg(`${a}${c}`, ac, u)} et ${eg(`${a}'${b}'`, abi, u)}.\n\n${q}`),
      aci,
      expl(DEF_R, `${a}'${c}' ÷ ${a}'${b}' = ${a}${c} ÷ ${a}${b}.`, `${a}'${c}' = ${fr(abi)} × ${fr(ac)} ÷ ${fr(ab)} = ${fr(aci)}.`, `${a}'${c}' = ${fr(aci)} ${u}.`),
      figureAlignes([a, b, c], [0, ab, ac]),
    );
  }),
  tpl(M, 6, 2, "Une égalité entre vecteurs colinéaires se transporte : le coefficient ne change pas.", () => {
    const [a, b, c] = un(TRIO);
    const [k, ktex] = un<[number, string]>([[2, "2"], [3, "3"], [0.5, "\\dfrac{1}{2}"], [1.5, "\\dfrac{3}{2}"], [-2, "-2"], [-0.5, "-\\dfrac{1}{2}"], [0.25, "\\dfrac{1}{4}"], [2.5, "\\dfrac{5}{2}"], [-3, "-3"]]);
    const v = (x: string, y: string) => `\\overrightarrow{${x}${y}}`;
    const eq = `$${v(a, c)} = ${ktex}\\,${v(a, b)}$`;
    const eq2 = `$${v(`${a}'`, `${c}'`)} = k\\,${v(`${a}'`, `${b}'`)}$`;
    const pre = `${OUVRE(un(PAR))} Trois points alignés vérifient :\n\n${eq}`;
    if (Math.random() < 0.5) {
      const q = un(["Quelle est la valeur de k dans l'égalité entre leurs images ?", "Quel nombre k vérifie l'égalité entre leurs images ?", "Que vaut k pour leurs images ?"]);
      return court(qu(`${pre}\n\n${q}\n\n${eq2}`), k, expl("une projection conserve le coefficient de colinéarité : si AC = k AB en vecteurs, alors A'C' = k A'B'.", "garde le même coefficient.", `Le coefficient reste ${fr(k)}.`, `k = ${fr(k)}.`));
    }
    const u = un(UNITES);
    const x = 4 * entre(1, 9);
    const q = un([`Combien mesure ${a}'${c}' ?`, `Quelle est la longueur ${a}'${c}' ?`, `Que vaut ${a}'${c}' ?`]);
    return court(qu(`${pre}\n\nOn mesure ${eg(`${a}'${b}'`, x, u)}.\n\n${q}`), x * Math.abs(k), expl("une projection conserve le coefficient de colinéarité.", "une longueur est positive : on prend la valeur absolue du coefficient.", `${x} × ${fr(Math.abs(k))} = ${fr(x * Math.abs(k))}.`, `${a}'${c}' = ${fr(x * Math.abs(k))} ${u}.`));
  }),
  tpl(M, 7, 2, "Segments parallèles : même rapport avant et après la projection.", () => {
    const [a, b] = un(TRIO);
    const [c, e] = un([["C", "D"], ["G", "H"], ["V", "W"], ["X", "Y"]]);
    const u = un(UNITES);
    const r = un([0.5, 1.5, 2, 0.75, 1.25, 0.8]);
    const ab = un([4, 8, 12, 16, 20]);
    const cd = un([4, 8, 12, 16, 20, 28, 36].filter((x) => x !== ab));
    const q = un([`Combien mesure ${c}'${e}' ?`, `Quelle est la longueur ${c}'${e}' ?`, `Que vaut ${c}'${e}' ?`, `Déduis-en la longueur ${c}'${e}'.`]);
    return court(
      qu(`${OUVRE(un(PAR))} Les segments [${a}${b}] et [${c}${e}] sont parallèles, et leur direction n'est pas celle de (δ). On a ${eg(`${a}${b}`, ab, u)}, ${eg(`${c}${e}`, cd, u)} et ${eg(`${a}'${b}'`, ab * r, u)}.\n\n${q}`),
      cd * r,
      expl(DEF_R, `${c}'${e}' ÷ ${a}'${b}' = ${c}${e} ÷ ${a}${b}.`, `${fr(ab * r)} × ${cd} ÷ ${ab} = ${fr(cd * r)}.`, `${c}'${e}' = ${fr(cd * r)} ${u}.`),
    );
  }),
  tpl(M, 8, 2, "Le rapport n'est conservé que sur une même direction.", () => {
    const [a, b] = un(TRIO);
    const [c, e] = un([["C", "D"], ["G", "H"], ["V", "W"], ["X", "Y"]]);
    const k = un(CONSERVE);
    const j = k.oui ? OUI : NON;
    return qcm(
      qu(`${OUVRE(un(PAR))} Les images sont notées avec un prime.\n\n${k.q(a, b, c, e)}`),
      j,
      [OUI, NON, "Seulement si les segments sont perpendiculaires à (δ)", "Seulement si la projection est orthogonale"],
      expl(DEF_R, "regarde si les segments ont la même direction.", k.c, `Réponse : ${j.toLowerCase()}.`),
    );
  }),
  tpl(M, 9, 2, "Le coefficient se garde : l'abscisse de l'image se calcule à partir de celles de A' et de B'.", () => {
    const [a, b, c] = un(TRIO);
    const [k, ktex] = un<[number, string]>([[2, "2"], [3, "3"], [0.5, "\\dfrac{1}{2}"], [-1, "-1"], [1.5, "\\dfrac{3}{2}"], [0.25, "\\dfrac{1}{4}"], [-2, "-2"]]);
    const x = entre(-8, 8);
    const y = x + 4 * entre(1, 4) * un([1, -1]);
    const r = x + k * (y - x);
    const q = un([`Quelle est l'abscisse de ${c}' ?`, `Quelle abscisse a le point ${c}' ?`, `Que vaut l'abscisse de ${c}' ?`]);
    return court(
      qu(`${OUVRE(un(PAR))} Sur (d) graduée, ${a}' a pour abscisse ${moins(String(x))} et ${b}' a pour abscisse ${moins(String(y))}. Le point ${c} vérifie :\n\n$\\overrightarrow{${a}${c}} = ${ktex}\\,\\overrightarrow{${a}${b}}$\n\n${q}`),
      r,
      expl("une projection conserve le coefficient de colinéarité.", `l'abscisse de ${c}' vaut x(${a}') + k × (x(${b}') − x(${a}')).`, `${x} + ${fr(k)} × (${y - x}) = ${fr(r)}.`, `${c}' a pour abscisse ${fr(r)}.`),
    );
  }),

  /* ★3 */
  tpl(M, 10, 3, "Les rayons du soleil sont parallèles : l'ombre est une projection, et Thalès donne les longueurs.", () => {
    const [a, b, c] = un(TRIO);
    const k = un([1, 1, 2, 3]);
    const ab = k * un([2, 3, 4, 5]);
    const bc = k * un([1, 3, 5, 6, 7]);
    const r = un([0.5, 1.5, 2, 0.75, 1.25]);
    const q = un([`Quelle est la longueur de l'ombre ${b}'${c}', en m ?`, `Combien mesure l'ombre ${b}'${c}', en m ?`, `Que vaut ${b}'${c}', en m ?`]);
    return court(
      qu(`${un(OMBRES)} : ${a}, ${b} et ${c}, sur une même droite. Les rayons du soleil, parallèles, donnent leurs ombres ${a}', ${b}' et ${c}' sur un sol plat. On a ${eg(`${a}${b}`, ab, "m")}, ${eg(`${b}${c}`, bc, "m")} et ${eg(`${a}'${b}'`, ab * r, "m")}.\n\n${q}`),
      bc * r,
      expl(DEF_R, "les rayons sont parallèles : l'ombre est une projection sur le sol, et le rapport se conserve.", `${b}'${c}' = ${fr(ab * r)} × ${bc} ÷ ${ab} = ${fr(bc * r)}.`, `${b}'${c}' = ${fr(bc * r)} m.`),
      figureAlignes([a, b, c], [0, ab, ab + bc]),
    );
  }),
  tpl(M, 11, 3, "Des droites parallèles et équidistantes découpent toute oblique en parts égales.", () => {
    const [qui, obj] = un(LIGNES);
    const n = un([3, 4, 5, 6, 7, 8, 9]);
    const part = un([3, 4, 5, 6, 7, 2.5, 3.5]);
    const L = n * part;
    const q = un(["Quelle est la longueur de chaque morceau, en cm ?", "Combien mesure chaque morceau, en cm ?", "Quelle longueur a un morceau, en cm ?"]);
    return court(
      qu(`${qui} veut partager ${obj} de ${fr(L)}${NB}cm en parts égales, sans calculer. L'objet, posé en travers d'une feuille à lignes parallèles et équidistantes, a ses deux bouts sur deux lignes, et ${n} intervalles les séparent.\n\n${q}`),
      part,
      expl(DEF_R, "chaque ligne projette la graduation de la feuille sur la bande : des intervalles égaux donnent des morceaux égaux.", `${fr(L)} ÷ ${n} = ${fr(part)}.`, `Chaque morceau mesure ${fr(part)} cm.`),
    );
  }),
  tpl(M, 12, 3, "Avec un soleil au zénith, la projection est orthogonale : un triangle rectangle apparaît.", () => {
    const [nom, sol] = un(INCLINES);
    const k = un([1, 1, 2, 3]);
    const [o, h, c] = un([[12, 5, 13], [8, 6, 10], [4, 3, 5], [15, 8, 17], [24, 7, 25], [12, 9, 15]]).map((x) => x * k);
    const q = un([`Quelle est la longueur de l'ombre, en m ?`, `Combien mesure l'ombre, en m ?`, `Quelle longueur fait cette ombre, en m ?`]);
    return court(
      qu(`${nom} est rectiligne et mesure ${c}${NB}m entre ses deux bouts. L'un de ses bouts est ${h}${NB}m plus haut que l'autre au-dessus de ${sol}. Le soleil est juste au-dessus : l'ombre sur ${sol} est une projection orthogonale.\n\n${q}`),
      o,
      expl("quand (δ) est perpendiculaire à (d), c'est la projection orthogonale : le cas particulier où les liaisons font un angle droit avec (d).", "le segment, son ombre et le dénivelé forment un triangle rectangle.", `${c}² − ${h}² = ${c * c - h * h} = ${o}².`, `L'ombre mesure ${o} m.`),
    );
  }),
  tpl(M, 13, 3, "Écris que le vecteur MM' est colinéaire au vecteur directeur, et que M' est sur l'axe.", () => {
    const [a, b] = un<[number, number]>([[1, 1], [2, 1], [1, 2], [3, 1], [2, 3], [3, 2], [-1, 1], [-2, 1], [-1, 2], [0, 1], [1, 4]]);
    const axeX = Math.random() < 0.6 || a === 0;
    const pa = axeX ? b : a;
    const y = pa * un([-4, -3, -2, -1, 1, 2, 3, 4]);
    const x = entre(-6, 6);
    const [X, Y] = axeX ? [x, y] : [y, x];
    const r = axeX ? X - (Y * a) / b : Y - (X * b) / a;
    const P = un(["M", "N", "E", "F"]);
    const q = axeX ? un([`Quelle est l'abscisse de ${P}' ?`, `Que vaut l'abscisse du projeté ${P}' ?`, `À quelle abscisse arrive ${P}' ?`]) : un([`Quelle est l'ordonnée de ${P}' ?`, `Que vaut l'ordonnée du projeté ${P}' ?`, `À quelle ordonnée arrive ${P}' ?`]);
    const axe = axeX ? "l'axe des abscisses" : "l'axe des ordonnées";
    return court(
      qu(`Dans un repère, on projette sur ${axe}, parallèlement à une droite de vecteur directeur $\\vec{u}\\,(${a}\\,;\\,${b})$. Le point $${P}(${X}\\,;\\,${Y})$ a pour image ${P}'.\n\n${q}`),
      r,
      expl(DEF, `${P}${P}' est colinéaire à u, et ${P}' est sur ${axe}.`, axeX ? `On descend de ${Y} en ordonnée : soit ${Y} ÷ ${b} fois le vecteur u, donc ${X} − ${a} × ${Y} ÷ ${b} = ${fr(r)}.` : `On enlève ${X} en abscisse : soit ${X} ÷ ${a} fois le vecteur u, donc ${Y} − ${b} × ${X} ÷ ${a} = ${fr(r)}.`, `La réponse est ${fr(r)}.`),
    );
  }),
];
