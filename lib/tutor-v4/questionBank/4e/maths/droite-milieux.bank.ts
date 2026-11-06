// LE THÉORÈME DES MILIEUX ET SA RÉCIPROQUE (06/11/2026).
//
// Maroc (2AC), Sénégal (4e), Côte d'Ivoire (4e). Le BO du cycle 4
// (`docs/bo-maths-cycle4-recopie.md`) ne le nomme pas : il donne Thalès, qui le contient.
// Notion masquée, voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Figures calculées : un milieu est vraiment le
// milieu, et le correcteur le contrôle SUR la figure.

import { figureConstruction, milieu, point, piedPerpendiculaire, type P } from "@/lib/canvas/construction";
import { ang, cap, enDegres, entre, expliquer, fr, melange, mesure, nomsLibres, nomsTriangle, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { fabriqueInsecable } from "./outils-insecables";

const tpl = fabriqueInsecable("droite_milieux", ["milieu", "triangle", "parallèle", "canvas"]);

const DEF = "dans un triangle, la droite qui passe par les milieux de deux côtés est parallèle au troisième côté, et le segment qui joint ces milieux mesure la moitié de ce côté.";
const DEF_R = "dans un triangle, la droite qui passe par le milieu d’un côté et qui est parallèle à un deuxième côté coupe le troisième côté en son milieu.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;

const noms = () => {
  const [A, B, C] = nomsTriangle();
  const [M, N, P] = nomsLibres([A, B, C], 3);
  return { A, B, C, M, N, P, T: `${A}${B}${C}` };
};
type Noms = ReturnType<typeof noms>;

function tourner(pts: Record<string, P>, degres: number) {
  const c = Math.cos((degres * Math.PI) / 180);
  const s = Math.sin((degres * Math.PI) / 180);
  return Object.fromEntries(Object.entries(pts).map(([k, p]) => [k, point(p.x * c - p.y * s, p.x * s + p.y * c)]));
}

/** Un triangle ni isocèle ni rectangle : le sommet de tête n'est jamais à l'aplomb du milieu. */
const sommetsTriangle = (L: number) => ({ b: point(0, 0), c: point(L, 0), a: point(L * un([0.26, 0.32, 0.38, 0.62, 0.68, 0.74]), L * (0.72 + Math.random() * 0.25)) });

/** Le triangle, ses milieux codés ; le segment des milieux en rouge. */
function figMilieux(n: Noms, o: { L?: number; a?: P; troisMilieux?: boolean; texteBC?: string; texteMN?: string; codeN?: boolean; angle?: { sommet: string; de: string; vers: string; texte?: string } }) {
  const L = o.L ?? 10;
  const t = sommetsTriangle(L);
  const a = o.a ?? t.a;
  const pts: Record<string, P> = { [n.A]: a, [n.B]: t.b, [n.C]: t.c, [n.M]: milieu(a, t.b), [n.N]: milieu(a, t.c) };
  if (o.troisMilieux) pts[n.P] = milieu(t.b, t.c);
  const code = o.codeN === false ? [] : [{ a: n.A, b: n.N, code: 2 }, { a: n.N, b: n.C, code: 2 }];
  return figureConstruction(tourner(pts, un([0, 0, 0, -9, 9, 14])), {
    polygones: [{ sommets: [n.A, n.B, n.C] }],
    segments: [
      { a: n.A, b: n.M, code: 1 },
      { a: n.M, b: n.B, code: 1 },
      ...code,
      { a: n.M, b: n.N, couleur: "#dc2626", texte: o.texteMN },
      ...(o.texteBC ? [{ a: n.B, b: n.C, texte: o.texteBC }] : []),
      ...(o.troisMilieux ? [{ a: n.B, b: n.P, code: 3 }, { a: n.P, b: n.C, code: 3 }, { a: n.M, b: n.P, couleur: "#dc2626" }, { a: n.N, b: n.P, couleur: "#dc2626" }] : []),
    ],
    angles: o.angle ? [o.angle] : [],
    description: `Le triangle ${n.T} et les milieux de ses côtés`,
  });
}

/** Le sommet de tête d'un triangle dont on connaît les trois côtés (B à l'origine, C sur l'axe). */
function sommetParCotes(ab: number, ac: number, bc: number): P {
  const x = (ab * ab + bc * bc - ac * ac) / (2 * bc);
  return point(x, Math.sqrt(Math.max(ab * ab - x * x, 0.01)));
}

/** Trois côtés qui font un vrai triangle, ni plat, ni isocèle. */
function troisCotes(): [number, number, number] {
  const a = entre(6, 18);
  const b = a + un([2, 3, 4, 5]);
  const c = entre(b - a + 3, a + b - 3);
  return c === a || c === b ? [a, b, c + 1] : [a, b, c];
}

const debutMilieux = ({ A, B, C, M, N, T }: Noms) => {
  const f = un([
    `${M} est le milieu de [${A}${B}] et ${N} est le milieu de [${A}${C}]`,
    `${M} et ${N} sont les milieux respectifs de [${A}${B}] et [${A}${C}]`,
    `[${A}${B}] a pour milieu ${M} et [${A}${C}] a pour milieu ${N}`,
    `${M} et ${N} sont les milieux de [${A}${B}] et de [${A}${C}]`,
  ]);
  return un([`Dans le triangle ${T}, ${f}.`, `${T} est un triangle : ${f}.`, `On trace un triangle ${T}. ${cap(f)}.`, `Voici un triangle ${T}, où ${f}.`]);
};

const debutReciproque = ({ A, B, C, M, N, T }: Noms) => {
  const mil = un([`${M} est le milieu de [${A}${B}]`, `[${A}${B}] a pour milieu ${M}`]);
  const par = un([
    `La parallèle à (${B}${C}) passant par ${M} coupe [${A}${C}] en ${N}.`,
    `La droite passant par ${M} et parallèle à (${B}${C}) coupe [${A}${C}] en ${N}.`,
    `Par ${M}, on trace la parallèle à (${B}${C}) : elle coupe [${A}${C}] en ${N}.`,
    `${N} est le point où la parallèle à (${B}${C}) menée par ${M} coupe [${A}${C}].`,
  ]);
  return un([`Dans le triangle ${T}, ${mil}. ${par}`, `${T} est un triangle et ${mil}. ${par}`, `On trace un triangle ${T}, et ${mil}. ${par}`]);
};

/* Un triangle dans la vie : la barre relie les milieux, ou part du milieu parallèlement au bas. */
type Situation = { o: string; base: string; barre: string; ce: string; u: string; L: [number, number] };
const SITUATIONS: Situation[] = [
  { o: "La charpente d’un abri", base: "la poutre du bas", barre: "une traverse", ce: "cette traverse", u: "m", L: [4, 14] },
  { o: "Un escabeau ouvert", base: "l’écart entre ses pieds", barre: "une sangle", ce: "cette sangle", u: "cm", L: [60, 120] },
  { o: "Le portique d’une balançoire vu de côté", base: "l’écart entre ses deux pieds", barre: "une barre de renfort", ce: "cette barre", u: "cm", L: [120, 240] },
  { o: "Une voile de bateau", base: "sa bordure du bas", barre: "une latte", ce: "cette latte", u: "dm", L: [20, 60] },
  { o: "Un pylône électrique vu de face", base: "sa base", barre: "une poutrelle", ce: "cette poutrelle", u: "m", L: [6, 16] },
  { o: "L’entrée d’une tente", base: "le bas de l’entrée", barre: "un cordon", ce: "ce cordon", u: "cm", L: [80, 200] },
  { o: "Un panneau de signalisation", base: "son côté du bas", barre: "une bande réfléchissante", ce: "cette bande", u: "cm", L: [50, 100] },
  { o: "Le trépied d’un pupitre de musique", base: "l’écart entre deux pieds", barre: "un tirant", ce: "ce tirant", u: "cm", L: [30, 60] },
  { o: "Le pignon d’une case de Hell-Bourg", base: "le bas du pignon", barre: "une traverse", ce: "cette traverse", u: "dm", L: [40, 90] },
  { o: "Une ferme de pont métallique", base: "sa poutre du bas", barre: "une barre", ce: "cette barre", u: "m", L: [8, 20] },
  { o: "Un cerf-volant", base: "sa baguette du bas", barre: "une ficelle", ce: "cette ficelle", u: "cm", L: [40, 90] },
  { o: "Le support d’un télescope vu de face", base: "l’écart entre deux pieds", barre: "un tirant", ce: "ce tirant", u: "cm", L: [50, 120] },
];

const OBSTACLES = ["un lac", "un étang", "un marais", "un ravin", "une colline", "une forêt", "un bâtiment", "une carrière", "une rivière", "une zone de lave"];
const METIERS: [string, string][] = [["Une géomètre", "elle"], ["Un arpenteur", "il"], ["Une ingénieure", "elle"], ["Un technicien", "il"], ["Une cartographe", "elle"], ["Un forestier", "il"], ["Une archéologue", "elle"], ["Un architecte", "il"]];
const OBJETS_RUBAN: { o: string; lien: string; u: string; k: number }[] = [
  { o: "Une voile triangulaire", lien: "de ruban", u: "dm", k: 2 },
  { o: "Un parterre triangulaire", lien: "de bordure", u: "m", k: 1 },
  { o: "Un fanion", lien: "de galon", u: "cm", k: 2 },
  { o: "Un coussin triangulaire", lien: "de passepoil", u: "cm", k: 3 },
  { o: "Un vitrail triangulaire", lien: "de plomb", u: "cm", k: 5 },
  { o: "Un terrain de jeu triangulaire", lien: "de ligne peinte", u: "m", k: 2 },
  { o: "Une nappe triangulaire", lien: "de dentelle", u: "cm", k: 5 },
  { o: "Un jardin triangulaire", lien: "de grillage", u: "m", k: 3 },
  { o: "Une enseigne triangulaire", lien: "de néon", u: "cm", k: 4 },
];
const EMBOITES: { qui: string; quoi: string; u: string }[] = [
  { qui: "Une graphiste", quoi: "un logo", u: "cm" },
  { qui: "Un artiste", quoi: "une fresque", u: "dm" },
  { qui: "Une tisserande", quoi: "un tapis", u: "cm" },
  { qui: "Un développeur", quoi: "un décor de jeu vidéo", u: "mm" },
  { qui: "Une céramiste", quoi: "un carrelage", u: "cm" },
  { qui: "Un maître verrier", quoi: "un vitrail", u: "cm" },
  { qui: "Une architecte", quoi: "une façade", u: "dm" },
  { qui: "Un élève", quoi: "un dessin de Sierpiński", u: "mm" },
];
const PENTES: { o: string; p: string; pc: string; u: string; h: [number, number] }[] = [
  { o: "Une rampe d’accès", p: "un poteau", pc: "ce poteau", u: "cm", h: [40, 120] },
  { o: "Un toboggan", p: "un pied", pc: "ce pied", u: "cm", h: [120, 300] },
  { o: "Une tyrolienne", p: "un pylône", pc: "ce pylône", u: "m", h: [8, 40] },
  { o: "Un escalator", p: "un support", pc: "ce support", u: "m", h: [4, 12] },
  { o: "Un tremplin", p: "un étai", pc: "cet étai", u: "m", h: [2, 10] },
  { o: "Une passerelle d’embarquement", p: "un pilier", pc: "ce pilier", u: "m", h: [3, 9] },
  { o: "Un funiculaire", p: "un pilier", pc: "ce pilier", u: "m", h: [20, 80] },
  { o: "Un plan incliné d’atelier", p: "un tasseau", pc: "ce tasseau", u: "cm", h: [20, 90] },
  { o: "Un module de skate", p: "un montant", pc: "ce montant", u: "cm", h: [40, 150] },
  { o: "Un tapis roulant de chantier", p: "un support", pc: "ce support", u: "dm", h: [10, 40] },
];

export const droiteMilieuxBank = [
  /* ===== LE THÉORÈME ===== */

  tpl("milieux_droite", 1, 1, "Le segment qui joint les milieux mesure la moitié du troisième côté.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(5, 40);
    const text = `${debutMilieux(n)} ${un([`On a ${n.B}${n.C} = ${v} ${u}.`, `De plus, ${n.B}${n.C} = ${v} ${u}.`, `Le côté [${n.B}${n.C}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${n.M}${n.N} ?`, `Calcule ${n.M}${n.N}.`, `Que vaut ${n.M}${n.N} ?`, `Combien mesure [${n.M}${n.N}] ?`])}`;
    return { text, format: "short", expected: mesure(v / 2, u), comparator: "number_equal", canvas: figMilieux(n, { L: v, texteBC: `${v} ${u}` }), explanation: expliquer(DEF, `[${n.M}${n.N}] joint les milieux, et le troisième côté est [${n.B}${n.C}].`, `${v} ÷ 2 = ${fr(v / 2)}.`, `${n.M}${n.N} = ${fr(v / 2)} ${u}.`) };
  }),

  tpl("milieux_droite", 2, 1, "Le troisième côté mesure le double du segment qui joint les milieux.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(3, 30);
    const text = `${debutMilieux(n)} ${un([`On a ${n.M}${n.N} = ${v} ${u}.`, `De plus, ${n.M}${n.N} = ${v} ${u}.`, `Le segment [${n.M}${n.N}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${n.B}${n.C} ?`, `Calcule ${n.B}${n.C}.`, `Que vaut ${n.B}${n.C} ?`, `Combien mesure [${n.B}${n.C}] ?`])}`;
    return { text, format: "short", expected: mesure(2 * v, u), comparator: "number_equal", canvas: figMilieux(n, { L: 2 * v, texteMN: `${v} ${u}` }), explanation: expliquer(DEF, `${n.M}${n.N} est la moitié de ${n.B}${n.C}, donc ${n.B}${n.C} en est le double.`, `2 × ${v} = ${2 * v}.`, `${n.B}${n.C} = ${2 * v} ${u}.`) };
  }),

  tpl("milieux_droite", 3, 1, "Deux milieux dans un triangle : pense à la droite parallèle au troisième côté.", () => {
    const n = noms();
    const d = `(${n.M}${n.N})`;
    const c = `(${n.B}${n.C})`;
    const juste = `${d} et ${c} sont parallèles`;
    const text = `${debutMilieux(n)} ${un([`Que peut-on dire des droites ${d} et ${c} ?`, `Quelle est la position de ${d} par rapport à ${c} ?`, "Laquelle de ces phrases est juste ?", `Que sait-on de ${d} et ${c} ?`])}`;
    return { text, format: "qcm", choices: qcm(juste, [`${d} et ${c} sont perpendiculaires`, `${d} et ${c} se coupent en ${n.M}`, `${d} et ${c} se coupent en ${n.A}`]), expected: [juste], comparator: "mcq_exact", canvas: figMilieux(n, {}), explanation: expliquer(DEF, `${n.M} et ${n.N} sont les milieux de deux côtés, et le troisième est [${n.B}${n.C}].`, `${d} est donc parallèle à ${c}.`, `${juste}.`) };
  }),

  tpl("milieux_droite", 4, 1, "Le côté cherché est celui qui ne porte aucun des deux milieux.", () => {
    const n = noms();
    const juste = `(${n.B}${n.C})`;
    const text = `${debutMilieux(n)} ${un([`À quelle droite (${n.M}${n.N}) est-elle parallèle ?`, `De quel côté (${n.M}${n.N}) est-elle parallèle ?`, `Quelle droite est parallèle à (${n.M}${n.N}) ?`, `Trouve la parallèle à (${n.M}${n.N}) parmi ces droites.`])}`;
    return { text, format: "qcm", choices: qcm(juste, [`(${n.A}${n.B})`, `(${n.A}${n.C})`, "Aucune de ces droites"]), expected: [juste], comparator: "mcq_exact", canvas: figMilieux(n, {}), explanation: expliquer(DEF, `${n.M} est sur [${n.A}${n.B}], ${n.N} sur [${n.A}${n.C}] : le troisième côté est [${n.B}${n.C}].`, `(${n.M}${n.N}) lui est parallèle.`, `c’est ${juste}.`) };
  }),

  tpl("milieux_droite", 5, 2, "Chaque côté du petit triangle est la moitié d’un côté du grand : le périmètre aussi.", () => {
    const n = noms();
    const u = un(UNITES);
    const [ab, ac, bc] = melange(troisCotes());
    const per = (ab + ac + bc) / 2;
    const donnees = un([`${n.A}${n.B} = ${ab} ${u}, ${n.A}${n.C} = ${ac} ${u} et ${n.B}${n.C} = ${bc} ${u}`, `${n.B}${n.C} = ${bc} ${u}, ${n.A}${n.B} = ${ab} ${u} et ${n.A}${n.C} = ${ac} ${u}`]);
    const text = `${debutMilieux(n)} ${un([`On a ${donnees}.`, `On sait que ${donnees}.`, `Les mesures sont ${donnees}.`])} ${un([`Quel est le périmètre du triangle ${n.A}${n.M}${n.N} ?`, `Calcule le périmètre du triangle ${n.A}${n.M}${n.N}.`, `Que vaut le périmètre du triangle ${n.A}${n.M}${n.N} ?`])}`;
    return { text, format: "short", expected: mesure(per, u), comparator: "number_equal", canvas: figMilieux(n, { L: bc, a: sommetParCotes(ab, ac, bc) }), explanation: expliquer(DEF, `${n.A}${n.M}, ${n.A}${n.N} et ${n.M}${n.N} valent les moitiés de ${n.A}${n.B}, ${n.A}${n.C} et ${n.B}${n.C}.`, `${fr(ab / 2)} + ${fr(ac / 2)} + ${fr(bc / 2)} = ${fr(per)}.`, `le périmètre vaut ${fr(per)} ${u}.`) };
  }),

  tpl("milieux_droite", 6, 2, "Les milieux des trois côtés forment un triangle : son périmètre est la moitié de celui du grand.", () => {
    const n = noms();
    const u = un(UNITES);
    const petit = `${n.M}${n.N}${n.P}`;
    const versPetit = Math.random() < 0.5;
    const v = versPetit ? 2 * entre(6, 40) : entre(6, 40);
    const donne = versPetit ? n.T : petit;
    const cherche = versPetit ? petit : n.T;
    const juste = versPetit ? v / 2 : 2 * v;
    const mil = un([`${n.M}, ${n.N} et ${n.P} sont les milieux respectifs de [${n.A}${n.B}], [${n.A}${n.C}] et [${n.B}${n.C}].`, `on place ${n.M}, ${n.N} et ${n.P} aux milieux respectifs de [${n.A}${n.B}], [${n.A}${n.C}] et [${n.B}${n.C}].`]);
    const text = `Dans le triangle ${n.T}, ${mil} ${un([`Le triangle ${donne} a pour périmètre ${v} ${u}.`, `Le périmètre du triangle ${donne} vaut ${v} ${u}.`])} ${un([`Quel est le périmètre du triangle ${cherche} ?`, `Calcule le périmètre du triangle ${cherche}.`, `Que vaut le périmètre du triangle ${cherche} ?`])}`;
    return { text, format: "short", expected: mesure(juste, u), comparator: "number_equal", canvas: figMilieux(n, { troisMilieux: true }), explanation: expliquer(DEF, `chaque côté du triangle ${petit} mesure la moitié d’un côté du triangle ${n.T}.`, versPetit ? `${v} ÷ 2 = ${fr(juste)}.` : `2 × ${v} = ${juste}.`, `le périmètre vaut ${fr(juste)} ${u}.`) };
  }),

  tpl("milieux_droite", 7, 2, "Compte les paires de côtés parallèles du quadrilatère.", () => {
    const n = noms();
    const trapeze = Math.random() < 0.5;
    const nom = trapeze ? `${n.B}${n.C}${n.N}${n.M}` : `${n.A}${n.M}${n.P}${n.N}`;
    const juste = trapeze ? "Un trapèze" : "Un parallélogramme";
    const debut = trapeze ? debutMilieux(n) : `Dans le triangle ${n.T}, ${n.M}, ${n.N} et ${n.P} sont les milieux respectifs de [${n.A}${n.B}], [${n.A}${n.C}] et [${n.B}${n.C}].`;
    const text = `${debut} ${un([`Quelle est la nature du quadrilatère ${nom} ?`, `Le quadrilatère ${nom} est :`, `Que peut-on dire du quadrilatère ${nom} ?`, `Quel type de quadrilatère est ${nom} ?`])}`;
    const pourquoi = trapeze ? `(${n.M}${n.N}) est parallèle à (${n.B}${n.C}), et [${n.M}${n.B}] et [${n.N}${n.C}] ne le sont pas.` : `(${n.M}${n.P}) est parallèle à (${n.A}${n.C}) et (${n.N}${n.P}) à (${n.A}${n.B}).`;
    return { text, format: "qcm", choices: qcm(juste, [trapeze ? "Un parallélogramme" : "Un trapèze", "Un rectangle", "Un losange", "Un carré"]), expected: [juste], comparator: "mcq_exact", canvas: figMilieux(n, { troisMilieux: !trapeze }), explanation: expliquer(DEF, "on cherche les côtés parallèles.", pourquoi, `${nom} est ${juste.toLowerCase()}.`) };
  }),

  tpl("milieux_droite", 8, 2, "Les deux droites sont parallèles : les angles correspondants sont égaux.", () => {
    const n = noms();
    const a = entre(38, 78);
    const enB = Math.random() < 0.5;
    const donne = enB ? ang(n.A, n.B, n.C) : ang(n.A, n.C, n.B);
    const cherche = enB ? ang(n.A, n.M, n.N) : ang(n.A, n.N, n.M);
    const L = 10;
    const k = 6 + Math.random() * 3;
    const r = (a * Math.PI) / 180;
    const pied = enB ? point(k * Math.cos(r), k * Math.sin(r)) : point(L - k * Math.cos(r), k * Math.sin(r));
    const text = `${debutMilieux(n)} ${un([`On a ${donne} = ${a}°.`, `De plus, ${donne} = ${a}°.`, `On mesure ${donne} = ${a}°.`])} ${un([`Que vaut ${cherche} ?`, `Quelle est la mesure de ${cherche} ?`, `Combien mesure ${cherche} ?`])}`;
    return { text, format: "short", expected: enDegres(a), comparator: "number_equal", canvas: figMilieux(n, { L, a: pied, angle: enB ? { sommet: n.B, de: n.A, vers: n.C, texte: `${a}°` } : { sommet: n.C, de: n.A, vers: n.B, texte: `${a}°` } }), explanation: expliquer(DEF, `(${n.M}${n.N}) est parallèle à (${n.B}${n.C}) : les deux angles sont correspondants.`, `ils ont la même mesure, ${a}°.`, `${cherche} = ${a}°.`) };
  }),

  tpl("milieux_droite", 9, 3, "La barre joint deux milieux : elle mesure la moitié du côté du bas.", () => {
    const s = un(SITUATIONS);
    const v = entre(s.L[0], s.L[1]);
    const n = { A: "A", B: "B", C: "C", M: "M", N: "N", P: "P", T: "ABC" };
    const text = phrase(
      [
        `${s.o} forme un triangle. ${cap(s.base)} mesure ${v} ${s.u}, et ${s.barre} relie les milieux des deux autres côtés.`,
        `${s.o} dessine un triangle, et ${s.base} mesure ${v} ${s.u}. On fixe ${s.barre} entre les milieux des deux autres côtés.`,
        `${cap(s.barre)} joint les milieux de deux côtés du triangle que forme ${s.o.charAt(0).toLowerCase() + s.o.slice(1)}. Le troisième côté, ${s.base}, mesure ${v} ${s.u}.`,
      ],
      [`Quelle est la longueur de ${s.ce} ?`, `Combien mesure ${s.ce} ?`, `Quelle longueur faut-il prévoir pour ${s.ce} ?`],
    );
    return { text, format: "short", expected: mesure(v / 2, s.u), comparator: "number_equal", canvas: figMilieux(n, { L: v }), explanation: expliquer(DEF, `${s.ce} joint les milieux de deux côtés.`, `${v} ÷ 2 = ${fr(v / 2)}.`, `il faut ${fr(v / 2)} ${s.u}.`) };
  }),

  tpl("milieux_droite", 10, 3, "On mesure ce qu’on peut atteindre, entre les milieux, puis on double.", () => {
    const [pro, il] = un(METIERS);
    const obs = un(OBSTACLES);
    const v = entre(30, 480);
    const verbe = un([`${il} place M au milieu de [AB] et N au milieu de [AC], puis mesure MN = ${v} m.`, `${il} marque le milieu M de [AB] et le milieu N de [AC], et trouve MN = ${v} m.`]);
    const n = { A: "A", B: "B", C: "C", M: "M", N: "N", P: "P", T: "ABC" };
    const text = phrase(
      [
        `${pro} veut connaître la distance entre deux points B et C, séparés par ${obs}. Depuis un point A, ${verbe}`,
        `Entre les points B et C, il y a ${obs}. ${pro} choisit un point A d’où l’on atteint B et C : ${verbe}`,
        `${pro} ne peut pas mesurer directement la distance BC, à cause d’${obs}. Depuis un point A, ${verbe}`,
      ],
      ["Quelle est la distance BC ?", "Combien mesure BC ?", "Que vaut la distance entre B et C ?"],
    );
    return { text, format: "short", expected: mesure(2 * v, "m"), comparator: "number_equal", canvas: figMilieux(n, { L: 2 * v, texteMN: `${v} m` }), explanation: expliquer(DEF, "MN est la moitié de BC, donc BC en est le double.", `2 × ${v} = ${2 * v}.`, `la distance BC est de ${fr(2 * v)} m.`) };
  }),

  tpl("milieux_droite", 11, 3, "Les trois segments valent les moitiés des trois côtés : la moitié du périmètre.", () => {
    const s = un(OBJETS_RUBAN);
    const [a, b, c] = melange(troisCotes()).map((x) => x * s.k);
    const total = (a + b + c) / 2;
    const text = phrase(
      [
        `${s.o} a des côtés de ${a} ${s.u}, ${b} ${s.u} et ${c} ${s.u}. On relie les milieux des trois côtés avec une longueur ${s.lien}.`,
        `Les trois côtés de ${s.o.charAt(0).toLowerCase() + s.o.slice(1)} mesurent ${a} ${s.u}, ${b} ${s.u} et ${c} ${s.u}. On joint leurs milieux, deux à deux, avec une longueur ${s.lien}.`,
        `${s.o} mesure ${a} ${s.u}, ${b} ${s.u} et ${c} ${s.u} sur ses côtés. Une longueur ${s.lien} relie les milieux des côtés, deux à deux.`,
      ],
      ["Quelle longueur faut-il en tout ?", "Quelle longueur totale faut-il prévoir ?", "Combien cela fait-il en tout ?"],
    );
    return { text, format: "short", expected: mesure(total, s.u), comparator: "number_equal", explanation: expliquer(DEF, "chaque segment mesure la moitié du côté qu’il ne touche pas.", `(${a} + ${b} + ${c}) ÷ 2 = ${fr(total)}.`, `il faut ${fr(total)} ${s.u}.`) };
  }),

  tpl("milieux_droite", 12, 3, "À chaque étape, le côté est divisé par 2.", () => {
    const s = un(EMBOITES);
    const fois = entre(2, 4);
    const L = 2 ** fois * entre(2, 12);
    const final = L / 2 ** fois;
    const h = (L * Math.sqrt(3)) / 2;
    const pts: Record<string, P> = { a0: point(0, 0), b0: point(L, 0), c0: point(L / 2, h) };
    const polygones = [{ sommets: ["a0", "b0", "c0"] }];
    for (let i = 1; i <= fois; i++) {
      pts[`a${i}`] = milieu(pts[`a${i - 1}`], pts[`b${i - 1}`]);
      pts[`b${i}`] = milieu(pts[`b${i - 1}`], pts[`c${i - 1}`]);
      pts[`c${i}`] = milieu(pts[`c${i - 1}`], pts[`a${i - 1}`]);
      polygones.push({ sommets: [`a${i}`, `b${i}`, `c${i}`] });
    }
    const text = phrase(
      [
        `${s.qui} dessine, pour ${s.quoi}, un triangle équilatéral de côté ${L} ${s.u}. On relie les milieux de ses côtés pour obtenir un triangle plus petit, et on fait de même dans ce nouveau triangle. Au total, on trace ${fois} nouveaux triangles.`,
        `Pour ${s.quoi}, ${s.qui.charAt(0).toLowerCase() + s.qui.slice(1)} part d’un triangle équilatéral de côté ${L} ${s.u}. À chaque étape, le nouveau triangle relie les milieux des côtés du précédent. Au total, on trace ${fois} nouveaux triangles.`,
      ],
      ["Quel est le côté du dernier triangle ?", "Combien mesure le côté du plus petit triangle ?", "Que vaut le côté du dernier triangle tracé ?", "Quelle longueur a le côté du dernier triangle ?"],
    );
    return { text, format: "short", expected: mesure(final, s.u), comparator: "number_equal", canvas: figureConstruction(pts, { polygones, description: "Des triangles emboîtés, chacun reliant les milieux du précédent" }, Object.keys(pts)), explanation: expliquer(DEF, `à chaque étape, le côté est divisé par 2, et il y a ${fois} étapes.`, `${L} ÷ ${2 ** fois} = ${fr(final)}.`, `le dernier côté mesure ${fr(final)} ${s.u}.`) };
  }),

  /* ===== LA RÉCIPROQUE ===== */

  tpl("milieux_reciproque", 1, 1, "La parallèle coupe l’autre côté en son milieu.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(5, 40);
    const seg = un([`${n.A}${n.N}`, `${n.N}${n.C}`]);
    const text = `${debutReciproque(n)} ${un([`On a ${n.A}${n.C} = ${v} ${u}.`, `De plus, ${n.A}${n.C} = ${v} ${u}.`, `Le côté [${n.A}${n.C}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${seg} ?`, `Calcule ${seg}.`, `Que vaut ${seg} ?`])}`;
    return { text, format: "short", expected: mesure(v / 2, u), comparator: "number_equal", canvas: figMilieux(n, { codeN: false }), explanation: expliquer(DEF_R, `${n.M} est un milieu et la droite est parallèle à (${n.B}${n.C}) : ${n.N} est le milieu de [${n.A}${n.C}].`, `${v} ÷ 2 = ${fr(v / 2)}.`, `${seg} = ${fr(v / 2)} ${u}.`) };
  }),

  tpl("milieux_reciproque", 2, 1, "Le point d’arrivée est un milieu : les deux moitiés sont égales, le côté entier vaut le double.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(3, 30);
    const donne = un([`${n.A}${n.N}`, `${n.N}${n.C}`]);
    const versCote = Math.random() < 0.5;
    const cherche = versCote ? `${n.A}${n.C}` : donne === `${n.A}${n.N}` ? `${n.N}${n.C}` : `${n.A}${n.N}`;
    const juste = versCote ? 2 * v : v;
    const text = `${debutReciproque(n)} ${un([`On a ${donne} = ${v} ${u}.`, `De plus, ${donne} = ${v} ${u}.`, `Le segment [${donne}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${cherche} ?`, `Calcule ${cherche}.`, `Que vaut ${cherche} ?`])}`;
    return { text, format: "short", expected: mesure(juste, u), comparator: "number_equal", canvas: figMilieux(n, { codeN: false }), explanation: expliquer(DEF_R, `${n.N} est le milieu de [${n.A}${n.C}].`, versCote ? `2 × ${v} = ${juste}.` : "les deux moitiés sont égales.", `${cherche} = ${juste} ${u}.`) };
  }),

  tpl("milieux_reciproque", 3, 1, "Un milieu, une parallèle : la droite arrive au milieu de l’autre côté.", () => {
    const n = noms();
    const juste = `Le milieu de [${n.A}${n.C}]`;
    const text = `${debutReciproque(n)} ${un([`Que représente ${n.N} pour le segment [${n.A}${n.C}] ?`, `Que peut-on dire du point ${n.N} ?`, `Quel est le rôle du point ${n.N} sur [${n.A}${n.C}] ?`, `Où se trouve ${n.N} sur [${n.A}${n.C}] ?`])}`;
    return { text, format: "qcm", choices: qcm(juste, [`Le tiers de [${n.A}${n.C}] en partant de ${n.A}`, `Le pied de la hauteur issue de ${n.B}`, `Le quart de [${n.A}${n.C}] en partant de ${n.C}`]), expected: [juste], comparator: "mcq_exact", canvas: figMilieux(n, { codeN: false }), explanation: expliquer(DEF_R, `${n.M} est le milieu de [${n.A}${n.B}], et la droite est parallèle à (${n.B}${n.C}).`, `elle coupe donc [${n.A}${n.C}] en son milieu.`, `${n.N} est le milieu de [${n.A}${n.C}].`) };
  }),

  tpl("milieux_reciproque", 4, 1, "Il faut les deux : un milieu ET une parallèle.", () => {
    const n = noms();
    const d = `(${n.M}${n.N})`;
    const c = `(${n.B}${n.C})`;
    const juste = `${n.M} est le milieu de [${n.A}${n.B}] et ${d} est parallèle à ${c}`;
    const text = phrase(
      [
        `Dans le triangle ${n.T}, ${n.M} est sur [${n.A}${n.B}] et ${n.N} est sur [${n.A}${n.C}].`,
        `${n.T} est un triangle, ${n.M} un point de [${n.A}${n.B}] et ${n.N} un point de [${n.A}${n.C}].`,
        `On place ${n.M} sur [${n.A}${n.B}] et ${n.N} sur [${n.A}${n.C}], dans le triangle ${n.T}.`,
      ],
      [`Quelles informations suffisent pour affirmer que ${n.N} est le milieu de [${n.A}${n.C}] ?`, `Que faut-il savoir pour conclure que ${n.N} est le milieu de [${n.A}${n.C}] ?`, `Quelle condition permet de dire que ${n.N} est le milieu de [${n.A}${n.C}] ?`],
    );
    return { text, format: "qcm", choices: qcm(juste, [`${d} est parallèle à ${c}`, `${n.M} est le milieu de [${n.A}${n.B}]`, `${n.M} est le milieu de [${n.A}${n.B}] et ${d} est perpendiculaire à ${c}`]), expected: [juste], comparator: "mcq_exact", canvas: figMilieux(n, { codeN: false }), explanation: expliquer(DEF_R, "une seule des deux conditions ne suffit pas.", `il faut le milieu de [${n.A}${n.B}] et la parallèle à ${c}.`, `${juste}.`) };
  }),

  tpl("milieux_reciproque", 5, 2, "Le point d’arrivée est un milieu : tu peux alors appliquer le théorème des milieux.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(5, 40);
    const text = `${debutReciproque(n)} ${un([`On a ${n.B}${n.C} = ${v} ${u}.`, `De plus, ${n.B}${n.C} = ${v} ${u}.`, `Le côté [${n.B}${n.C}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${n.M}${n.N} ?`, `Calcule ${n.M}${n.N}.`, `Que vaut ${n.M}${n.N} ?`])}`;
    return { text, format: "short", expected: mesure(v / 2, u), comparator: "number_equal", canvas: figMilieux(n, { L: v, codeN: false, texteBC: `${v} ${u}` }), explanation: expliquer(DEF_R, `${n.N} est le milieu de [${n.A}${n.C}]. ${n.M}${n.N} joint donc deux milieux.`, `${v} ÷ 2 = ${fr(v / 2)}.`, `${n.M}${n.N} = ${fr(v / 2)} ${u}.`) };
  }),

  tpl("milieux_reciproque", 6, 2, "Le petit triangle a des côtés deux fois plus courts.", () => {
    const n = noms();
    const u = un(UNITES);
    const [ab, ac, bc] = melange(troisCotes());
    const per = (ab + ac + bc) / 2;
    const text = `${debutReciproque(n)} ${un([`On a ${n.A}${n.B} = ${ab} ${u}, ${n.A}${n.C} = ${ac} ${u} et ${n.B}${n.C} = ${bc} ${u}.`, `On sait que ${n.A}${n.B} = ${ab} ${u}, ${n.A}${n.C} = ${ac} ${u} et ${n.B}${n.C} = ${bc} ${u}.`])} ${un([`Quel est le périmètre du triangle ${n.A}${n.M}${n.N} ?`, `Calcule le périmètre du triangle ${n.A}${n.M}${n.N}.`, `Que vaut le périmètre du triangle ${n.A}${n.M}${n.N} ?`])}`;
    return { text, format: "short", expected: mesure(per, u), comparator: "number_equal", canvas: figMilieux(n, { L: bc, a: sommetParCotes(ab, ac, bc), codeN: false }), explanation: expliquer(DEF_R, `${n.N} est le milieu de [${n.A}${n.C}] : les côtés du triangle ${n.A}${n.M}${n.N} sont les moitiés de ceux de ${n.T}.`, `(${ab} + ${ac} + ${bc}) ÷ 2 = ${fr(per)}.`, `le périmètre vaut ${fr(per)} ${u}.`) };
  }),

  tpl("milieux_reciproque", 7, 2, "Vérifie d’abord que le point de départ est bien le milieu du côté.", () => {
    const n = noms();
    const u = un(UNITES);
    const ab = 2 * entre(4, 20);
    const milieuVrai = Math.random() < 0.5;
    const am = milieuVrai ? ab / 2 : ab / 2 + un([-3, -2, -1, 1, 2, 3]);
    const t = am / ab;
    const L = 10;
    const tr = sommetsTriangle(L);
    const m = { x: tr.a.x + (tr.b.x - tr.a.x) * t, y: tr.a.y + (tr.b.y - tr.a.y) * t };
    const c = { x: tr.a.x + (tr.c.x - tr.a.x) * t, y: tr.a.y + (tr.c.y - tr.a.y) * t };
    const oui = `Oui, car ${n.M} est le milieu de [${n.A}${n.B}]`;
    const non = `Non, car ${n.M} n’est pas le milieu de [${n.A}${n.B}]`;
    const juste = milieuVrai ? oui : non;
    const debut = un([`Dans le triangle ${n.T}, ${n.M} est sur [${n.A}${n.B}], avec ${n.A}${n.M} = ${am} ${u} et ${n.A}${n.B} = ${ab} ${u}.`, `${n.T} est un triangle et ${n.M} est un point de [${n.A}${n.B}] : ${n.A}${n.M} = ${am} ${u} et ${n.A}${n.B} = ${ab} ${u}.`]);
    const text = `${debut} ${un([`La parallèle à (${n.B}${n.C}) passant par ${n.M} coupe [${n.A}${n.C}] en ${n.N}.`, `La droite passant par ${n.M} et parallèle à (${n.B}${n.C}) coupe [${n.A}${n.C}] en ${n.N}.`])} ${un([`${n.N} est-il le milieu de [${n.A}${n.C}] ?`, `Le point ${n.N} est-il le milieu de [${n.A}${n.C}] ?`, `Peut-on dire que ${n.N} est le milieu de [${n.A}${n.C}] ?`])}`;
    const canvas = figureConstruction(
      tourner({ [n.A]: tr.a, [n.B]: tr.b, [n.C]: tr.c, [n.M]: point(m.x, m.y), [n.N]: point(c.x, c.y) }, un([0, 0, -9, 9])),
      { polygones: [{ sommets: [n.A, n.B, n.C] }], segments: [{ a: n.M, b: n.N, couleur: "#dc2626" }], description: `Le triangle ${n.T} et la parallèle à (${n.B}${n.C})` },
    );
    return { text, format: "qcm", choices: qcm(juste, [milieuVrai ? non : oui, `Oui, car (${n.M}${n.N}) est parallèle à (${n.B}${n.C})`, "On ne peut pas savoir"]), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_R, `on compare ${n.A}${n.M} à la moitié de ${n.A}${n.B}.`, `${ab} ÷ 2 = ${ab / 2}, et ${n.A}${n.M} = ${am}.`, `${juste}.`) };
  }),

  tpl("milieux_reciproque", 8, 2, "Deux droites perpendiculaires à une même droite sont parallèles.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = 2 * entre(3, 20);
    const h = v * (0.55 + Math.random() * 0.4);
    const seg = un([`${n.A}${n.N}`, `${n.N}${n.B}`]);
    const a = point(v, 0);
    const b = point(0, 0);
    const c = point(0, h);
    const m = milieu(a, c);
    const debut = un([
      `Le triangle ${n.T} est rectangle en ${n.B}, et ${n.M} est le milieu de [${n.A}${n.C}]. La perpendiculaire à (${n.A}${n.B}) passant par ${n.M} coupe [${n.A}${n.B}] en ${n.N}.`,
      `${n.T} est un triangle rectangle en ${n.B}, et [${n.A}${n.C}] a pour milieu ${n.M}. La droite passant par ${n.M} et perpendiculaire à (${n.A}${n.B}) coupe [${n.A}${n.B}] en ${n.N}.`,
      `Dans le triangle ${n.T}, rectangle en ${n.B}, ${n.M} est le milieu de [${n.A}${n.C}]. On trace par ${n.M} la perpendiculaire à (${n.A}${n.B}) : elle coupe [${n.A}${n.B}] en ${n.N}.`,
    ]);
    const text = `${debut} ${un([`On a ${n.A}${n.B} = ${v} ${u}.`, `Le côté [${n.A}${n.B}] mesure ${v} ${u}.`])} ${un([`Quelle est la longueur ${seg} ?`, `Calcule ${seg}.`, `Que vaut ${seg} ?`])}`;
    const canvas = figureConstruction(
      tourner({ [n.A]: a, [n.B]: b, [n.C]: c, [n.M]: m, [n.N]: piedPerpendiculaire(m, a, b) }, un([0, 0, 180, 90])),
      { polygones: [{ sommets: [n.A, n.B, n.C] }], segments: [{ a: n.A, b: n.M, code: 1 }, { a: n.M, b: n.C, code: 1 }, { a: n.M, b: n.N, couleur: "#dc2626" }], angles: [{ sommet: n.B, de: n.A, vers: n.C, droit: true }, { sommet: n.N, de: n.M, vers: n.A, droit: true }], description: `Le triangle ${n.T}, rectangle en ${n.B}, et une perpendiculaire à [${n.A}${n.B}]` },
    );
    return { text, format: "short", expected: mesure(v / 2, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_R, `(${n.M}${n.N}) et (${n.C}${n.B}) sont perpendiculaires à (${n.A}${n.B}) : elles sont parallèles, et ${n.N} est le milieu de [${n.A}${n.B}].`, `${v} ÷ 2 = ${fr(v / 2)}.`, `${seg} = ${fr(v / 2)} ${u}.`) };
  }),

  tpl("milieux_reciproque", 9, 3, "La barre part d’un milieu et reste parallèle au bas : elle arrive au milieu de l’autre côté.", () => {
    const s = un(SITUATIONS);
    const v = entre(s.L[0], s.L[1]);
    const n = { A: "A", B: "B", C: "C", M: "M", N: "N", P: "P", T: "ABC" };
    const text = phrase(
      [
        `${s.o} forme un triangle. ${cap(s.barre)} part du milieu d’un côté et rejoint l’autre côté en restant parallèle au côté du bas. Cet autre côté mesure ${v} ${s.u}.`,
        `Dans le triangle que forme ${s.o.charAt(0).toLowerCase() + s.o.slice(1)}, ${s.barre} part du milieu d’un côté, parallèlement au côté du bas. Le côté d’arrivée mesure ${v} ${s.u}.`,
      ],
      [`À quelle distance du sommet du haut arrive ${s.ce} ?`, `À quelle distance du sommet du haut se fixe ${s.ce} ?`, `Quelle distance sépare le sommet du haut de l’arrivée de ${s.ce} ?`],
    );
    return { text, format: "short", expected: mesure(v / 2, s.u), comparator: "number_equal", canvas: figMilieux(n, { codeN: false }), explanation: expliquer(DEF_R, `${s.ce} part d’un milieu et reste parallèle au bas : son arrivée est le milieu de l’autre côté.`, `${v} ÷ 2 = ${fr(v / 2)}.`, `la distance est de ${fr(v / 2)} ${s.u}.`) };
  }),

  tpl("milieux_reciproque", 10, 3, "Elle arrive au milieu de l’autre côté : elle joint donc deux milieux.", () => {
    const s = un(SITUATIONS);
    const v = entre(s.L[0], s.L[1]);
    const n = { A: "A", B: "B", C: "C", M: "M", N: "N", P: "P", T: "ABC" };
    const text = phrase(
      [
        `${s.o} forme un triangle, et ${s.base} mesure ${v} ${s.u}. ${cap(s.barre)} part du milieu d’un autre côté et reste parallèle au côté du bas.`,
        `${s.o} dessine un triangle, et ${s.base} mesure ${v} ${s.u}. On pose ${s.barre} depuis le milieu d’un autre côté, parallèlement au côté du bas.`,
      ],
      [`Quelle est la longueur de ${s.ce} ?`, `Combien mesure ${s.ce} ?`, `Quelle longueur faut-il prévoir pour ${s.ce} ?`],
    );
    return { text, format: "short", expected: mesure(v / 2, s.u), comparator: "number_equal", canvas: figMilieux(n, { L: v, codeN: false }), explanation: expliquer(DEF_R, `${s.ce} arrive au milieu de l’autre côté, et joint donc deux milieux.`, `${v} ÷ 2 = ${fr(v / 2)}.`, `il faut ${fr(v / 2)} ${s.u}.`) };
  }),

  tpl("milieux_reciproque", 11, 3, "Coupe le trapèze par sa diagonale : deux triangles, deux fois la réciproque.", () => {
    const [A, B, C, D] = ["A", "B", "C", "D"];
    const p = 2 * entre(2, 8);
    const g = p + 2 * entre(2, 8);
    const u = un(UNITES);
    const h = (p + g) * (0.3 + Math.random() * 0.15);
    const x = (g - p) * un([0.25, 0.4, 0.6]);
    const pa = point(x, h);
    const pb = point(x + p, h);
    const pc = point(g, 0);
    const pd = point(0, 0);
    const cas = un([
      { seg: "MI", v: p / 2, c: `MI = ${p} ÷ 2`, ex: "dans le triangle ABD, MI est la moitié de AB" },
      { seg: "IN", v: g / 2, c: `IN = ${g} ÷ 2`, ex: "dans le triangle BCD, IN est la moitié de DC" },
      { seg: "MN", v: (p + g) / 2, c: `MN = ${p / 2} + ${g / 2}`, ex: "MN = MI + IN, avec MI moitié de AB et IN moitié de DC" },
    ]);
    const text = phrase(
      [
        `ABCD est un trapèze, avec (AB) et (DC) parallèles, AB = ${p} ${u} et DC = ${g} ${u}. M est le milieu de [AD]. La parallèle à (AB) passant par M coupe [BD] en I et [BC] en N.`,
        `Dans le trapèze ABCD, (AB) et (DC) sont parallèles, AB = ${p} ${u} et DC = ${g} ${u}. Par le milieu M de [AD], on trace la parallèle à (AB) : elle coupe [BD] en I et [BC] en N.`,
        `Le trapèze ABCD a pour bases AB = ${p} ${u} et DC = ${g} ${u}, parallèles. La droite passant par le milieu M de [AD], parallèle à (AB), coupe [BD] en I et [BC] en N.`,
      ],
      [`Quelle est la longueur ${cas.seg} ?`, `Calcule ${cas.seg}.`, `Que vaut ${cas.seg} ?`],
    );
    const canvas = figureConstruction(
      { [A]: pa, [B]: pb, [C]: pc, [D]: pd, M: milieu(pa, pd), I: milieu(pb, pd), N: milieu(pb, pc) },
      { polygones: [{ sommets: [A, B, C, D] }], segments: [{ a: B, b: D, couleur: "#64748b" }, { a: "M", b: "N", couleur: "#dc2626" }, { a: A, b: "M", code: 1 }, { a: "M", b: D, code: 1 }], description: "Le trapèze ABCD, une diagonale et la parallèle aux bases" },
    );
    return { text, format: "short", expected: mesure(cas.v, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_R, cas.ex + ".", `${cas.c} = ${fr(cas.v)}.`, `${cas.seg} = ${fr(cas.v)} ${u}.`) };
  }),

  tpl("milieux_reciproque", 12, 3, "Le support vertical et la hauteur sont parallèles, et le support part d’un milieu.", () => {
    const s = un(PENTES);
    const v = entre(s.h[0], s.h[1]);
    const L = 10;
    const hf = Math.max(3, Math.min(8, v * (L / s.h[1])));
    const pts = { A: point(0, 0), B: point(L, 0), C: point(L, hf), M: point(L / 2, 0), N: point(L / 2, hf / 2) };
    const text = phrase(
      [
        `${s.o} monte en ligne droite, du sol jusqu’à ${v} ${s.u} de haut. On pose ${s.p} vertical, à mi-distance, sur le sol, entre le départ et l’aplomb de l’arrivée.`,
        `${s.o} monte en ligne droite, et son point le plus haut est à ${v} ${s.u} du sol. ${cap(s.p)} vertical est posé dessous, au sol, à mi-distance du départ et de l’aplomb de l’arrivée.`,
        `${s.o} part du sol et monte en ligne droite à ${v} ${s.u} de haut. ${cap(s.p)} vertical est posé au sol, au milieu de la distance entre le départ et l’aplomb de l’arrivée.`,
      ],
      [`Quelle est la hauteur de ${s.pc} ?`, `Combien mesure ${s.pc} ?`, `Quelle hauteur faut-il prévoir pour ${s.pc} ?`],
    );
    const canvas = figureConstruction(pts, { polygones: [{ sommets: ["A", "B", "C"] }], segments: [{ a: "A", b: "M", code: 1 }, { a: "M", b: "B", code: 1 }, { a: "M", b: "N", couleur: "#dc2626" }, { a: "B", b: "C", texte: `${v} ${s.u}` }], angles: [{ sommet: "B", de: "A", vers: "C", droit: true }, { sommet: "M", de: "B", vers: "N", droit: true }], description: "Une pente, sa hauteur et un support vertical posé à mi-distance" }, ["A", "B", "C", "M", "N"]);
    return { text, format: "short", expected: mesure(v / 2, s.u), comparator: "number_equal", canvas, explanation: expliquer(DEF_R, "le support est parallèle à la hauteur et part d’un milieu : il arrive au milieu de la pente, et il joint deux milieux.", `${v} ÷ 2 = ${fr(v / 2)}.`, `il mesure ${fr(v / 2)} ${s.u}.`) };
  }),
];
