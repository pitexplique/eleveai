import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4, TriangleCanvasData } from "@/lib/tutor-v4/types";

// Correcteurs des gabarits de triangles.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT ce que voit l'élève — les noms des sommets, les
// longueurs, les angles écrits dans le texte, et la FIGURE (coordonnées,
// codages, noms des points) — puis refait le raisonnement : nature du
// triangle, somme des angles, inégalité triangulaire. Il vérifie que la
// réponse attendue est la seule juste, que l'unité est là, et que la figure
// dit la même chose que le texte (un triangle annoncé rectangle est vraiment
// droit sur le dessin, deux côtés codés égaux le sont vraiment).

type Q = TutorGeneratedQuestionV4;
const egal = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;
const num = (s: string) => Number(s.replace(",", "."));

// ----- Lecture du texte
/** Les longueurs écrites dans le texte, dans l'ordre : « 4,5 cm » → { v: 4.5, u: "cm" }. */
export function longueursLues(t: string) {
  return [...t.matchAll(/(\d+(?:,\d+)?)\s?(mm|cm|m|km)\b/g)].map((m) => ({ v: num(m[1]), u: m[2] }));
}
/**
 * Les angles NOMMÉS du texte, par sommet : « l’angle en C mesure 61° »,
 * « l’angle en C : 61° » ou « $\widehat{C}$ = 61° » → { C: 61 }.
 */
export function anglesNommesLus(t: string) {
  const r: Record<string, number> = {};
  for (const m of t.matchAll(/[Ll]’angle en ([A-Z])(?: mesure| :) (\d+(?:,\d+)?)°/g)) r[m[1]] = num(m[2]);
  for (const m of t.matchAll(/\$\\widehat\{([A-Z])\}\$ = (\d+(?:,\d+)?)°/g)) r[m[1]] = num(m[2]);
  return r;
}
/** Les angles écrits dans le texte : « 35° » → 35. */
export function anglesLus(t: string) {
  return [...t.matchAll(/(\d+(?:,\d+)?)\s?°/g)].map((m) => num(m[1]));
}
function decimalesOk(t: string, p: string[]) {
  for (const m of t.matchAll(/\d+,(\d+)/g)) if (m[1].length > 2) p.push(`plus de deux décimales : ${m[0]}`);
}

// ----- Lecture de la figure
type Fig = TriangleCanvasData;
const fig = (q: Q): Fig | null => (q.canvas && q.canvas.kind === "triangle" ? (q.canvas as Fig) : null);
const nomsFig = (f: Fig) => [f.labels?.A ?? "A", f.labels?.B ?? "B", f.labels?.C ?? "C"];
const d = (p: { x: number; y: number }, r: { x: number; y: number }) => Math.hypot(p.x - r.x, p.y - r.y);
/** Les angles du dessin, en degrés, aux sommets A, B, C du canvas. */
export function anglesFig(f: Fig) {
  const { A, B, C } = f.points;
  const ang = (S: typeof A, U: typeof A, V: typeof A) => {
    const a = Math.atan2(U.y - S.y, U.x - S.x) - Math.atan2(V.y - S.y, V.x - S.x);
    let deg = Math.abs((a * 180) / Math.PI);
    if (deg > 180) deg = 360 - deg;
    return deg;
  };
  return { A: ang(A, B, C), B: ang(B, A, C), C: ang(C, A, B) };
}
/** Les côtés du dessin : AB, BC, CA. */
export function cotesFig(f: Fig) {
  const { A, B, C } = f.points;
  return { AB: d(A, B), BC: d(B, C), CA: d(C, A) };
}
/** La figure porte-t-elle les noms des sommets lus dans le texte ? */
function memesNoms(f: Fig, sommets: string[], p: string[]) {
  const n = nomsFig(f);
  if ([...n].sort().join("") !== [...sommets].sort().join("")) p.push(`figure nommée ${n.join("")}, texte ${sommets.join("")}`);
}

/** Les sommets du triangle lus dans le texte (« sommets X, Y et Z », « triangle XYZ »). */
function sommetsTexte(t: string): string[] | null {
  const m =
    t.match(/sommets (?:sont )?([A-Z]), ([A-Z]) et ([A-Z])\b/) ??
    t.match(/les points ([A-Z]), ([A-Z]) et ([A-Z])\b/) ??
    t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/);
  return m ? [m[1], m[2], m[3]] : null;
}
const memeEnsemble = (a: string[], b: string[]) => a.length === b.length && [...a].sort().join("") === [...b].sort().join("");

/** QCM : la seule proposition juste doit être la réponse attendue. */
function uneSeuleJuste(q: Q, juste: (c: string) => boolean, p: string[]) {
  const justes = (q.choices ?? []).filter(juste);
  if (justes.length !== 1) p.push(`${justes.length} proposition(s) juste(s) : ${justes.join(" | ") || "aucune"}`);
  else if (justes[0] !== q.expected[0]) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${justes[0]} »`);
}

// =====================================================================
// TRIANGLE_NOMMER
function corrigerNommer(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const V = sommetsTexte(t);
  if (!V) return ["sommets illisibles dans le texte"];
  const f = fig(q);
  if (f) memesNoms(f, V, p);
  const nomTexte = t.match(/triangle ([A-Z]{3})\b/)?.[1];
  let juste: (c: string) => boolean;
  const ilEst = t.match(/Le point ([A-Z]) est-il un sommet/);
  if (ilEst) juste = (c) => c === (V.includes(ilEst[1]) ? "oui" : "non");
  else if (/combien de lettres/i.test(t)) juste = (c) => c === "3";
  else if (/sommets de ce triangle|ses sommets|Cite les sommets/.test(t))
    juste = (c) => {
      const m = c.match(/^([A-Z]), ([A-Z]) et ([A-Z])$/);
      return Boolean(m && memeEnsemble([m[1], m[2], m[3]], V));
    };
  else
    juste = (c) => {
      const m = c.match(/^triangle ([A-Z]+)$/);
      if (!m || !memeEnsemble(m[1].split(""), V)) return false;
      // « le même triangle autrement » : pas le nom déjà écrit.
      return !(/même triangle|autrement|autre nom/.test(t) && m[1] === nomTexte);
    };
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// TRIANGLE_SOMMET_COTE
const lettresSeg = (c: string) => c.match(/^\[([A-Z])([A-Z])\]$/)?.slice(1, 3) ?? null;
function corrigerSommetCote(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4);
  if (!V) return ["triangle illisible dans le texte"];
  const f = fig(q);
  if (f) memesNoms(f, V, p);
  // Les segments écrits avec les extrémités dans l'ordre alphabétique : [DK], pas [KD].
  for (const m of [t, ...(q.choices ?? [])].join(" ").matchAll(/\[([A-Z])([A-Z])\]/g))
    if (m[1] > m[2]) p.push(`segment écrit à l’envers : ${m[0]}`);
  const estCote = (u: string, v: string) => u !== v && V.includes(u) && V.includes(v);
  let juste: (c: string) => boolean;
  let m: RegExpMatchArray | null;
  if (/[Cc]ombien de (sommets|côtés|angles)/.test(t) || /a combien de/.test(t) || /Compte les (sommets|côtés|angles)/.test(t)) juste = (c) => c === "3";
  else if (/côtés de ce triangle|côtés du triangle|trois côtés/.test(t))
    juste = (c) => {
      const s = [...c.matchAll(/\[([A-Z])([A-Z])\]/g)].map((x) => [x[1], x[2]]);
      return s.length === 3 && s.every(([u, v]) => estCote(u, v)) && new Set(s.map((x) => x.join(""))).size === 3;
    };
  else if ((m = t.match(/Le segment \[([A-Z])([A-Z])\] est-il un côté/))) {
    const r = estCote(m[1], m[2]) ? "oui" : "non";
    juste = (c) => c === r;
  } else if ((m = t.match(/(?:relie les sommets|va de|joint) ([A-Z]) (?:et|à) ([A-Z])/))) {
    const [u, v] = [m[1], m[2]];
    juste = (c) => {
      const s = lettresSeg(c);
      return Boolean(s && memeEnsemble(s, [u, v]));
    };
  } else if ((m = t.match(/(?:extrémités du côté|Le côté) \[([A-Z])([A-Z])\]/)) && !/opposé|en face du|fait face/.test(t)) {
    const [u, v] = [m[1], m[2]];
    juste = (c) => {
      const s = c.match(/^([A-Z]) et ([A-Z])$/);
      return Boolean(s && memeEnsemble([s[1], s[2]], [u, v]));
    };
  } else if (/PAS un côté/.test(t))
    juste = (c) => {
      const s = lettresSeg(c);
      return Boolean(s && !estCote(s[0], s[1]));
    };
  else if ((m = t.match(/(?:opposé au sommet|en face du sommet|opposé à) ([A-Z])\b/))) {
    const S = m[1];
    juste = (c) => {
      const s = lettresSeg(c);
      return Boolean(s && estCote(s[0], s[1]) && !s.includes(S));
    };
  } else if ((m = t.match(/(?:opposé au côté|en face du côté|fait face au côté) \[([A-Z])([A-Z])\]/))) {
    const [u, v] = [m[1], m[2]];
    juste = (c) => V.includes(c) && c !== u && c !== v;
  } else return [...p, "question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// TRIANGLE_TYPE_COTE
/** « 12,5 cm » → { v: 12.5, u: "cm" } ; sans unité → null. */
function mesure(e: string) {
  const m = e.trim().match(/^(\d+(?:,\d+)?) ?(mm|cm|m|km|°)$/);
  return m ? { v: num(m[1]), u: m[2] } : null;
}
/** Une réponse libre : nombre + unité attendus, toutes les écritures acceptées justes. */
function verifierMesure(q: Q, juste: number, unite: string, p: string[]) {
  const att = mesure(q.expected[0]);
  if (!att) return p.push(`réponse sans unité : « ${q.expected[0]} »`);
  if (att.u !== unite) p.push(`unité ${att.u}, attendue ${unite}`);
  if (!egal(att.v, juste, 1e-6)) p.push(`réponse ${q.expected[0]}, recalculée ${String(juste).replace(".", ",")} ${unite}`);
  if (Math.round(juste * 100) !== juste * 100 && !egal(Math.round(juste * 100), juste * 100)) p.push(`réponse à plus de deux décimales : ${juste}`);
  return 0;
}
/** Longueurs plausibles pour leur unité. */
function plausibles(ls: { v: number; u: string }[], p: string[]) {
  for (const l of ls) {
    const enCm = l.u === "mm" ? l.v / 10 : l.u === "cm" ? l.v : l.u === "m" ? l.v * 100 : l.v * 100000;
    if (enCm < 0.5 || enCm > 100000) p.push(`longueur peu plausible : ${l.v} ${l.u}`);
  }
}
function natureDe(a: number, b: number, c: number) {
  const n = [a === b, b === c, a === c].filter(Boolean).length;
  return n === 3 ? "équilatéral" : n === 1 ? "isocèle" : "quelconque";
}
/** La figure est-elle à l'échelle des longueurs de ses côtés (étiquettes ou valeurs données) ? */
function figureALEchelle(f: Fig, l: { AB: number; BC: number; CA: number }, p: string[]) {
  const g = cotesFig(f);
  const r = [g.AB / l.AB, g.BC / l.BC, g.CA / l.CA];
  if (Math.max(...r) / Math.min(...r) > 1.04) p.push(`figure pas à l’échelle des longueurs (${l.AB}, ${l.BC}, ${l.CA})`);
}
/** Les longueurs « XY = 5 cm » du texte, par côté (lettres triées). */
function egalitesLongueurs(t: string) {
  const r: Record<string, { v: number; u: string }> = {};
  for (const m of t.matchAll(/\b([A-Z])([A-Z]) = (\d+(?:,\d+)?) (mm|cm|m|km)\b/g)) r[[m[1], m[2]].sort().join("")] = { v: num(m[3]), u: m[4] };
  return r;
}
/** Les longueurs d'une figure, par côté nommé avec les lettres de l'énoncé (triées). */
function cotesNommes(f: Fig) {
  const [a, b, c] = nomsFig(f);
  const g = cotesFig(f);
  return { [[a, b].sort().join("")]: g.AB, [[b, c].sort().join("")]: g.BC, [[c, a].sort().join("")]: g.CA } as Record<string, number>;
}
const QUESTION_PRECISE = /plus précis|le mieux|équilatéral, isocèle ou quelconque/;

function corrigerTypeCoteLongueurs(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  let ls = longueursLues(t);
  // ★1 nu : les longueurs ne sont écrites que sur la figure.
  const f0 = fig(q);
  if (ls.length === 0 && f0?.sideLabels) ls = Object.values(f0.sideLabels).flatMap((s) => longueursLues(String(s)));
  if (ls.length !== 3) return [`il faut trois longueurs, lu : ${ls.length}`];
  if (new Set(ls.map((l) => l.u)).size !== 1) p.push("unités différentes");
  plausibles(ls, p);
  const [a, b, c] = ls.map((l) => l.v);
  const [x, y, z] = [a, b, c].sort((u, v) => u - v);
  if (x + y <= z) p.push(`triangle impossible : ${x} + ${y} ≤ ${z}`);
  if (!QUESTION_PRECISE.test(t)) p.push("la question ne demande pas la nature la plus précise");
  const n = natureDe(a, b, c);
  uneSeuleJuste(q, (ch) => ch === n, p);
  const f = fig(q);
  if (!f) return [...p, "figure absente"];
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4);
  if (V) memesNoms(f, V, p);
  const lab = f.sideLabels ?? {};
  const vLab = (s?: string) => (s ? num(s.split(" ")[0]) : NaN);
  const l = { AB: vLab(lab.AB), BC: vLab(lab.BC), CA: vLab(lab.CA) };
  if ([l.AB, l.BC, l.CA].sort().join() !== [a, b, c].sort().join()) p.push("les longueurs de la figure ne sont pas celles du texte");
  else figureALEchelle(f, l, p);
  // Si le texte nomme les côtés (« XY = 5 cm »), la figure doit avoir les mêmes.
  const eg = egalitesLongueurs(t);
  const cn = cotesNommes(f);
  const etiquettes = { [Object.keys(cn)[0]]: l.AB, [Object.keys(cn)[1]]: l.BC, [Object.keys(cn)[2]]: l.CA };
  for (const [k, v] of Object.entries(eg)) if (etiquettes[k] !== v.v) p.push(`côté ${k} : ${v.v} dans le texte, ${etiquettes[k]} sur la figure`);
  return p;
}
function corrigerTypeCoteCodages(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  if (!f) return ["figure absente"];
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4);
  if (!V) return ["triangle illisible"];
  memesNoms(f, V, p);
  const cn = cotesNommes(f);
  const lg = (k: string) => cn[k.split("").sort().join("")];
  const proches = (u: number, v: number) => Math.abs(u - v) / Math.max(u, v) < 0.02;
  let n: string;
  // « On sait que XY = YZ… » (★3) ou « Dans le triangle N, XY = YZ… » (★2 nu).
  const eg3 = t.match(/(?:On sait que|On a|Dans le triangle [A-Z]{3},) ([A-Z]{2}) = ([A-Z]{2}) = ([A-Z]{2})\./);
  const eg2 = t.match(/(?:On sait que|On a|Dans le triangle [A-Z]{3},) ([A-Z]{2}) = ([A-Z]{2}),? et (?:que )?([A-Z]{2}) est plus (long|court)\./);
  if (eg3) {
    n = "équilatéral";
    if (!proches(lg(eg3[1]), lg(eg3[2])) || !proches(lg(eg3[2]), lg(eg3[3]))) p.push("figure : les côtés annoncés égaux ne le sont pas");
  } else if (eg2) {
    n = "isocèle";
    const [u, v, w] = [lg(eg2[1]), lg(eg2[2]), lg(eg2[3])];
    if (!proches(u, v)) p.push("figure : les côtés annoncés égaux ne le sont pas");
    if (eg2[4] === "long" ? !(w > u * 1.03) : !(w < u * 0.97)) p.push(`figure : ${eg2[3]} n’est pas plus ${eg2[4]}`);
  } else if (/(trois|3) longueurs différentes/.test(t)) {
    n = "quelconque";
    const g = Object.values(cn);
    if (proches(g[0], g[1]) || proches(g[1], g[2]) || proches(g[0], g[2])) p.push("figure : deux côtés égaux pour un triangle quelconque");
  } else {
    // Les codages de la figure : chaque paire de côtés codés égaux l'est vraiment, les autres non.
    const paires = f.marks?.equalSides ?? [];
    const g = cotesFig(f);
    const codes = new Set(paires.flat());
    for (const [s1, s2] of paires) if (!proches(g[s1], g[s2])) p.push(`codage ${s1} = ${s2} faux sur la figure`);
    n = codes.size === 3 ? "équilatéral" : codes.size === 2 ? "isocèle" : "quelconque";
    const sides = ["AB", "BC", "CA"] as const;
    for (let i = 0; i < 3; i++)
      for (let j = i + 1; j < 3; j++) {
        const lies = paires.some(([s1, s2]) => (s1 === sides[i] && s2 === sides[j]) || (s1 === sides[j] && s2 === sides[i]));
        if (!lies && n !== "équilatéral" && proches(g[sides[i]], g[sides[j]])) p.push(`côtés ${sides[i]} et ${sides[j]} égaux mais non codés`);
      }
  }
  // Un équilatéral est aussi isocèle : la question doit alors demander le nom le plus précis.
  if (n === "équilatéral" && !QUESTION_PRECISE.test(t)) p.push("la question ne demande pas la nature la plus précise");
  if (!/[Qq]uelle est sa nature|plus précis|le mieux|équilatéral, isocèle ou quelconque/.test(t)) p.push("la question ne demande pas la nature");
  uneSeuleJuste(q, (ch) => ch === n, p);
  return p;
}
function corrigerIsoceleEn(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const eg = egalitesLongueurs(t);
  const ks = Object.keys(eg);
  if (ks.length !== 3) return [`il faut trois longueurs nommées, lu : ${ks.length}`];
  plausibles(Object.values(eg), p);
  const egaux = ks.filter((k) => ks.some((k2) => k2 !== k && eg[k2].v === eg[k].v));
  if (egaux.length !== 2) return [...p, `il faut exactement deux côtés égaux, lu : ${egaux.join(", ")}`];
  const S = egaux[0].split("").find((x) => egaux[1].includes(x))!;
  uneSeuleJuste(q, (ch) => ch === S, p);
  const f = fig(q);
  if (f) {
    const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [];
    memesNoms(f, V, p);
    const cn = cotesNommes(f);
    const r = ks.map((k) => cn[k] / eg[k].v);
    if (Math.max(...r) / Math.min(...r) > 1.04) p.push("figure pas à l’échelle");
  }
  return p;
}
function corrigerEquilateralPerimetre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  if (!/équilatéral/.test(t)) return ["le texte ne dit pas « équilatéral »"];
  const m = t.match(/périmètre mesure (\d+(?:,\d+)?) (mm|cm|m|km)\b/);
  if (!m) return ["périmètre illisible"];
  plausibles([{ v: num(m[1]), u: m[2] }], p);
  verifierMesure(q, Math.round((num(m[1]) / 3) * 1e6) / 1e6, m[2], p);
  const f = fig(q);
  if (f) {
    const g = cotesFig(f);
    if (Math.max(g.AB, g.BC, g.CA) / Math.min(g.AB, g.BC, g.CA) > 1.03) p.push("figure : pas équilatérale");
    const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [];
    memesNoms(f, V, p);
  }
  return p;
}
function corrigerIsocelePerimetre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const S = t.match(/isocèle en ([A-Z])/)?.[1];
  if (!S) return ["sommet principal illisible"];
  const eg = egalitesLongueurs(t);
  const ks = Object.keys(eg);
  if (ks.length !== 2) return [`il faut deux longueurs, lu : ${ks.length}`];
  const cote = ks.find((k) => k.includes(S));
  const base = ks.find((k) => !k.includes(S));
  if (!cote || !base) return ["il faut un côté issu du sommet principal et la base"];
  if (eg[cote].u !== eg[base].u) p.push("unités différentes");
  plausibles(Object.values(eg), p);
  const [a, b] = [eg[cote].v, eg[base].v];
  if (b >= 2 * a) p.push(`triangle impossible : base ${b} ≥ ${a} + ${a}`);
  verifierMesure(q, Math.round((2 * a + b) * 100) / 100, eg[cote].u, p);
  const f = fig(q);
  if (f) {
    const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [];
    memesNoms(f, V, p);
    const cn = cotesNommes(f);
    const autre = Object.keys(cn).find((k) => k !== cote && k !== base)!;
    if (Math.abs(cn[cote] - cn[autre]) / cn[cote] > 0.02) p.push("figure : les deux côtés issus du sommet principal ne sont pas égaux");
    if (Math.abs(cn[base] / cn[cote] - b / a) > 0.04 * (b / a)) p.push("figure pas à l’échelle");
  }
  return p;
}

// =====================================================================
// TRIANGLE_TYPE_ANGLE
const NAT_ANGLES = {
  rectangle: "rectangle (un angle droit)",
  obtus: "obtusangle (un angle obtus)",
  aigu: "acutangle (trois angles aigus)",
};
/** Les angles écrits sur la figure, par sommet du dessin, et leur accord avec le dessin (±2°). */
function anglesDeLaFigure(f: Fig, p: string[]) {
  const g = anglesFig(f);
  const lab = f.angleLabels ?? {};
  const r: Record<"A" | "B" | "C", number | null> = { A: null, B: null, C: null };
  for (const k of ["A", "B", "C"] as const) {
    const s = lab[k];
    if (!s || !/\d/.test(s)) continue;
    r[k] = num(s.replace("°", ""));
    if (Math.abs(g[k] - r[k]!) > 2) p.push(`figure : l’angle en ${nomsFig(f)["ABC".indexOf(k)]} mesure ${g[k].toFixed(1)}° sur le dessin, ${r[k]}° écrit`);
  }
  if (f.marks?.rightAngleAt && Math.abs(g[f.marks.rightAngleAt] - 90) > 1.5) p.push("figure : l’angle marqué droit ne l’est pas");
  return r;
}
/** « l’angle en X mesure 40° » : la figure doit avoir ce même angle en X. */
function anglesNommesOk(t: string, f: Fig, p: string[]) {
  const g = anglesFig(f);
  const noms = nomsFig(f);
  for (const [S, v] of Object.entries(anglesNommesLus(t))) {
    const k = (["A", "B", "C"] as const)[noms.indexOf(S)];
    if (!k) p.push(`sommet ${S} absent de la figure`);
    else if (Math.abs(g[k] - v) > 2) p.push(`figure : angle en ${S} de ${g[k].toFixed(1)}°, ${v}° dans le texte`);
  }
}
function natureAngles(as: number[]) {
  const g = Math.max(...as);
  return g === 90 ? NAT_ANGLES.rectangle : g > 90 ? NAT_ANGLES.obtus : NAT_ANGLES.aigu;
}
function corrigerTypeAngle(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4);
  if (f && V) memesNoms(f, V, p);
  let as = anglesLus(t);
  if (as.length === 2) as = [...as, 180 - as[0] - as[1]];
  let rep: string | null = null;
  if (as.length === 3) {
    if (as.reduce((s, x) => s + x, 0) !== 180) p.push(`somme des angles ${as.join(" + ")} ≠ 180`);
    rep = natureAngles(as);
  }
  if (as.some((x) => x <= 0 || x >= 180)) p.push(`angle impossible : ${as.join(", ")}`);
  if (f) {
    const lus = anglesDeLaFigure(f, p);
    anglesNommesOk(t, f, p);
    const vals = Object.values(lus).filter((x): x is number => x !== null);
    if (vals.length === 3) {
      if (vals.reduce((s, x) => s + x, 0) !== 180) p.push("figure : somme des angles ≠ 180");
      const r2 = natureAngles(vals);
      if (rep && r2 !== rep) p.push("la figure et le texte ne donnent pas la même nature");
      rep = rep ?? r2;
      if (as.length === 3 && [...as].sort().join() !== [...vals].sort().join()) p.push("angles de la figure différents de ceux du texte");
    } else if (f.marks?.rightAngleAt) rep = rep ?? NAT_ANGLES.rectangle;
  }
  if (!rep) return [...p, "aucun angle lisible"];
  uneSeuleJuste(q, (c) => c === rep, p);
  return p;
}

// =====================================================================
// TRIANGLE_DEFI
/**
 * ★2 nu : tout est sur la figure — les longueurs écrites sur les côtés et,
 * s'il existe, le codage de l'angle droit. On relit le dessin comme l'élève.
 */
function corrigerDefiReconnaissanceFigure(q: Q, f: Fig): string[] {
  const p: string[] = [];
  const t = q.text;
  if (!/plus précis/.test(t)) p.push("la question ne demande pas la nature la plus précise");
  memesNoms(f, t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [], p);
  const lab = f.sideLabels ?? {};
  const l: Partial<Record<"AB" | "BC" | "CA", number>> = {};
  for (const k of ["AB", "BC", "CA"] as const) {
    const m = lab[k] ? longueursLues(String(lab[k]))[0] : undefined;
    if (m) l[k] = m.v;
  }
  const a = anglesFig(f);
  const droit = f.marks?.rightAngleAt;
  if (droit && Math.abs(a[droit] - 90) > 1.5) p.push("angle codé droit qui ne l’est pas");
  for (const k of ["A", "B", "C"] as const) if (k !== droit && Math.abs(a[k] - 90) < 4) p.push(`angle presque droit en ${k} sans codage : figure trompeuse`);
  const ks = Object.keys(l) as Array<"AB" | "BC" | "CA">;
  let n: string;
  if (ks.length === 3) {
    figureALEchelle(f, l as { AB: number; BC: number; CA: number }, p);
    const [x, y, z] = ks.map((k) => l[k]!).sort((u, v) => u - v);
    if (x + y <= z) p.push(`triangle impossible : ${x} + ${y} ≤ ${z}`);
    if (droit && !egal(x * x + y * y, z * z, 1e-6)) p.push(`angle droit codé mais ${x}² + ${y}² ≠ ${z}²`);
    const nat = natureDe(x, y, z);
    n = nat === "équilatéral" ? (droit ? "impossible" : "équilatéral") : nat === "isocèle" ? (droit ? "rectangle isocèle" : "isocèle") : droit ? "rectangle" : "quelconque";
  } else if (ks.length === 2 && droit) {
    // Deux côtés écrits : ils doivent être les deux côtés de l'angle droit, et égaux.
    if (!ks.every((k) => k.includes(droit))) p.push("les longueurs écrites ne sont pas les côtés de l’angle droit");
    const g = cotesFig(f);
    if (Math.abs(g[ks[0]] - g[ks[1]]) / g[ks[0]] > 0.02) p.push("figure : les deux côtés de l’angle droit ne sont pas égaux");
    n = l[ks[0]] === l[ks[1]] ? "rectangle isocèle" : "rectangle";
    if (n !== "rectangle isocèle") p.push("deux longueurs différentes : le troisième côté manque");
  } else return [...p, `longueurs illisibles sur la figure (${ks.length})`];
  uneSeuleJuste(q, (c) => c === n, p);
  return p;
}
function corrigerDefiReconnaissance(q: Q): string[] {
  const f0 = fig(q);
  if (f0 && longueursLues(q.text).length === 0) return corrigerDefiReconnaissanceFigure(q, f0);
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  if (!QUESTION_PRECISE.test(t)) p.push("la question ne demande pas la nature la plus précise");
  let n: string;
  const ri = t.match(/Deux de ses côtés mesurent chacun (\d+(?:,\d+)?) (cm|m), et l’angle entre eux est droit/);
  if (ri) {
    n = "rectangle isocèle";
    plausibles([{ v: num(ri[1]), u: ri[2] }], p);
  } else {
    const ls = longueursLues(t);
    if (ls.length !== 3) return [`il faut trois longueurs, lu : ${ls.length}`];
    plausibles(ls, p);
    const [x, y, z] = ls.map((l) => l.v).sort((u, v) => u - v);
    if (x + y <= z) p.push(`triangle impossible : ${x} + ${y} ≤ ${z}`);
    const droit = /[Ii]l a un angle droit/.test(t);
    const pasDroit = /n’a pas d’angle droit/.test(t);
    // Trois côtés égaux : jamais d'angle droit (trois angles de 60°), inutile de le dire.
    if (droit && pasDroit) return [...p, "angle droit annoncé et nié"];
    if (!droit && !pasDroit && !(x === y && y === z)) return [...p, "on ne sait pas s’il a un angle droit"];
    const pyth = egal(x * x + y * y, z * z, 1e-6);
    if (droit && !pyth) p.push(`angle droit annoncé mais ${x}² + ${y}² ≠ ${z}²`);
    if (!droit && pyth) p.push(`longueurs d’un triangle rectangle (${x}, ${y}, ${z}) annoncé sans angle droit`);
    const nat = natureDe(x, y, z);
    n = nat === "équilatéral" ? (droit ? "impossible" : "équilatéral") : nat === "isocèle" ? (droit ? "rectangle isocèle" : "isocèle") : droit ? "rectangle" : "quelconque";
  }
  uneSeuleJuste(q, (c) => c === n, p);
  return p;
}
function corrigerDefiRaisons(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/a l’air rectangle/.test(t)) juste = (c) => /^non/.test(c) && /codage|90°/.test(c);
  else if (/équilatéral\. Est-il aussi isocèle/.test(t)) juste = (c) => /^oui/.test(c) && /au moins deux/.test(c);
  else if (/à la fois rectangle et isocèle/.test(t)) juste = (c) => /^oui/.test(c) && /angle droit/.test(c) && /égaux/.test(c);
  else if (/équilatéral\. Peut-il être rectangle/.test(t)) juste = (c) => /^non/.test(c) && /60°/.test(c);
  else if (/isocèle sans mesurer/.test(t)) juste = (c) => /deux côtés/.test(c) && /même longueur/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}
function corrigerDefiCodages(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  if (!f) return ["figure absente"];
  const V = t.match(/[Tt]riangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [];
  memesNoms(f, V, p);
  if (!QUESTION_PRECISE.test(t) && !/nom le plus précis/.test(t)) p.push("la question ne demande pas la nature la plus précise");
  const g = cotesFig(f);
  const a = anglesFig(f);
  const proches = (u: number, v: number) => Math.abs(u - v) / Math.max(u, v) < 0.02;
  const paires = f.marks?.equalSides ?? [];
  for (const [s1, s2] of paires) if (!proches(g[s1], g[s2])) p.push(`codage ${s1} = ${s2} faux sur la figure`);
  const droit = f.marks?.rightAngleAt;
  if (droit && Math.abs(a[droit] - 90) > 1.5) p.push("angle codé droit qui ne l’est pas");
  if (!droit && Object.values(a).some((x) => Math.abs(x - 90) < 4)) p.push("angle presque droit sans codage : figure trompeuse");
  const codes = new Set(paires.flat());
  if (codes.size !== 3) {
    const s = ["AB", "BC", "CA"] as const;
    for (let i = 0; i < 3; i++)
      for (let j = i + 1; j < 3; j++) {
        const lies = paires.some(([u, v]) => (u === s[i] && v === s[j]) || (u === s[j] && v === s[i]));
        if (!lies && Math.abs(g[s[i]] - g[s[j]]) / Math.max(g[s[i]], g[s[j]]) < 0.05) p.push(`côtés ${s[i]} et ${s[j]} presque égaux sans codage`);
      }
  }
  const n = codes.size === 3 ? "équilatéral" : codes.size === 2 ? (droit ? "rectangle isocèle" : "isocèle") : droit ? "rectangle" : "quelconque";
  uneSeuleJuste(q, (c) => c === n, p);
  return p;
}
function corrigerIsoceleCoteManquant(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const S = t.match(/isocèle en ([A-Z])/)?.[1];
  const per = t.match(/périmètre mesure (\d+(?:,\d+)?) (cm|m)\b/);
  const eg = egalitesLongueurs(t);
  const ks = Object.keys(eg);
  if (!S || !per || ks.length !== 1) return ["données illisibles (sommet, périmètre, une longueur)"];
  const P = num(per[1]);
  const u = per[2];
  if (eg[ks[0]].u !== u) p.push("unités différentes");
  const donneeEstBase = !ks[0].includes(S);
  const v = eg[ks[0]].v;
  const cote = donneeEstBase ? (P - v) / 2 : v;
  const base = donneeEstBase ? v : P - 2 * v;
  if (!(base > 0 && base < 2 * cote)) p.push(`triangle impossible : côtés ${cote}, ${cote}, base ${base}`);
  // Ce qui est demandé : les deux lettres de la fin de la question.
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  const m = fin.match(/\[?([A-Z])([A-Z])\]?\s*[?.]$/);
  if (!m) return [...p, "longueur demandée illisible"];
  const demandeBase = !(m[1] === S || m[2] === S);
  if (demandeBase === donneeEstBase) p.push("on demande la longueur déjà donnée");
  verifierMesure(q, Math.round((demandeBase ? base : cote) * 100) / 100, u, p);
  const f = fig(q);
  if (f) {
    memesNoms(f, t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [], p);
    const cn = cotesNommes(f);
    const kb = Object.keys(cn).find((k) => !k.includes(S))!;
    const kc = Object.keys(cn).filter((k) => k.includes(S));
    if (Math.abs(cn[kc[0]] - cn[kc[1]]) / cn[kc[0]] > 0.02) p.push("figure : pas isocèle en " + S);
    if (Math.abs(cn[kb] / cn[kc[0]] - base / cote) > 0.04 * (base / cote)) p.push("figure pas à l’échelle");
  }
  return p;
}

// =====================================================================
// TRIANGLE_SOMME_ANGLE et TRIANGLE_ANGLE_MANQUANT
/** Les angles d'une figure, par NOM de sommet (lettres de l'énoncé). */
function anglesParNom(f: Fig) {
  const g = anglesFig(f);
  const [a, b, c] = nomsFig(f);
  return { [a]: g.A, [b]: g.B, [c]: g.C } as Record<string, number>;
}
/** Les étiquettes d'angle de la figure, par nom de sommet. */
function etiquettesParNom(f: Fig) {
  const [a, b, c] = nomsFig(f);
  const l = f.angleLabels ?? {};
  return { [a]: l.A, [b]: l.B, [c]: l.C } as Record<string, string | undefined>;
}
function corrigerSommeConnaitre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  if (f) {
    memesNoms(f, t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [], p);
    anglesDeLaFigure(f, p);
  }
  const as = anglesLus(t);
  if (as.length === 3) {
    const s = as.reduce((x, y) => x + y, 0);
    if (s !== 180) p.push(`les angles du texte font ${s}°`);
    if (f) {
      const lab = Object.values(etiquettesParNom(f)).filter(Boolean).map((x) => num(x!.replace("°", "")));
      if (lab.length && [...lab].sort().join() !== [...as].sort().join()) p.push("angles de la figure différents du texte");
    }
  }
  if (q.format === "qcm") uneSeuleJuste(q, (c) => /(^|\()180°\)?$/.test(c), p);
  else verifierMesure(q, 180, "°", p);
  return p;
}
/**
 * Les trois angles d'un triangle reconstruits à partir de ce que dit l'élève
 * peut lire : angles nommés du texte, « rectangle en S », « isocèle en S »,
 * étiquettes de la figure. Rend aussi le sommet demandé.
 */
function anglesReconstruits(q: Q, p: string[]) {
  const t = q.text;
  const f = fig(q);
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4);
  if (!V) return null;
  const connus: Record<string, number> = anglesNommesLus(t);
  if (f) {
    memesNoms(f, V, p);
    anglesDeLaFigure(f, p);
    for (const [k, s] of Object.entries(etiquettesParNom(f)))
      if (s && /\d/.test(s)) {
        const v = num(s.replace("°", ""));
        if (connus[k] !== undefined && connus[k] !== v) p.push(`angle en ${k} : ${connus[k]}° dans le texte, ${v}° sur la figure`);
        connus[k] = v;
      }
  }
  const rect = t.match(/rectangle en ([A-Z])/)?.[1];
  if (rect) {
    if (connus[rect] !== undefined && connus[rect] !== 90) p.push("angle droit annoncé, autre mesure lue");
    connus[rect] = 90;
    if (f && f.marks?.rightAngleAt && nomsFig(f)["ABC".indexOf(f.marks.rightAngleAt)] !== rect) p.push("angle droit codé au mauvais sommet");
  }
  const iso = t.match(/isocèle en ([A-Z])/)?.[1];
  if (iso) {
    const [u, v] = V.filter((x) => x !== iso);
    if (connus[u] !== undefined && connus[v] === undefined) connus[v] = connus[u];
    else if (connus[v] !== undefined && connus[u] === undefined) connus[u] = connus[v];
    else if (connus[iso] !== undefined) connus[u] = connus[v] = (180 - connus[iso]) / 2;
  }
  const inconnus = V.filter((x) => connus[x] === undefined);
  if (inconnus.length === 1) connus[inconnus[0]] = 180 - V.filter((x) => x !== inconnus[0]).reduce((s, x) => s + connus[x], 0);
  if (V.some((x) => connus[x] === undefined)) return null;
  const s = V.reduce((x, k) => x + connus[k], 0);
  if (!egal(s, 180)) p.push(`somme des angles ${s}°`);
  if (V.some((x) => connus[x] <= 0)) p.push("angle nul ou négatif");
  // Le sommet demandé : dans la dernière phrase, ou le « ? » de la figure, ou le seul inconnu.
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  let demande = fin.match(/angle en ([A-Z])/)?.[1];
  if (!demande && f) demande = Object.entries(etiquettesParNom(f)).find(([, s]) => s === "?")?.[0];
  if (!demande && inconnus.length === 1) demande = inconnus[0];
  if (f && demande) {
    const g = anglesParNom(f)[demande];
    if (Math.abs(g - connus[demande]) > 2) p.push(`figure : l’angle en ${demande} mesure ${g.toFixed(1)}° sur le dessin, ${connus[demande]}° par le calcul`);
  }
  return demande ? { connus, demande } : null;
}
function corrigerAngleManquant(q: Q): string[] {
  const p: string[] = [];
  const r = anglesReconstruits(q, p);
  if (!r) return [...p, "angles ou angle demandé illisibles"];
  const rep = r.connus[r.demande];
  const t = q.text;
  // L'angle demandé ne doit pas être déjà écrit dans le texte.
  if (anglesNommesLus(t)[r.demande] !== undefined) p.push("l’angle demandé est déjà donné");
  if (q.format === "qcm") uneSeuleJuste(q, (c) => mesure(c)?.u === "°" && egal(mesure(c)!.v, rep), p);
  else verifierMesure(q, rep, "°", p);
  return p;
}
function corrigerSommeDeuxAutres(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const lus = Object.entries(anglesNommesLus(t));
  if (lus.length !== 1) return [`il faut un seul angle connu, lu : ${lus.length}`];
  const m = ["", lus[0][0], String(lus[0][1])];
  const f = fig(q);
  if (f) {
    memesNoms(f, t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [], p);
    anglesDeLaFigure(f, p);
    if (Math.abs(anglesParNom(f)[m[1]] - num(m[2])) > 2) p.push(`figure : l’angle en ${m[1]} ne mesure pas ${m[2]}°`);
  }
  verifierMesure(q, 180 - num(m[2]), "°", p);
  return p;
}

// =====================================================================
// TRIANGLE_POSSIBLE_OU_NON
const existe = (ls: number[]) => {
  const [x, y, z] = [...ls].sort((u, v) => u - v);
  return x + y > z + 1e-9;
};
function corrigerPossible(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const ls = longueursLues(t);
  if (ls.length !== 3) return [`il faut trois longueurs, lu : ${ls.length}`];
  if (new Set(ls.map((l) => l.u)).size !== 1) p.push("unités différentes");
  plausibles(ls, p);
  const r = existe(ls.map((l) => l.v)) ? "oui" : "non";
  uneSeuleJuste(q, (c) => c === r, p);
  return p;
}
function corrigerTroisiemeCote(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const ls = longueursLues(t);
  if (ls.length !== 2) return [`il faut deux longueurs, lu : ${ls.length}`];
  plausibles(ls, p);
  const [a, b] = ls.map((l) => l.v);
  const u = ls[0].u;
  uneSeuleJuste(
    q,
    (c) => {
      const m = mesure(c);
      return Boolean(m && m.u === u && existe([a, b, m.v]));
    },
    p,
  );
  for (const c of q.choices ?? []) if (mesure(c)?.u !== u) p.push(`proposition sans la bonne unité : ${c}`);
  return p;
}

// =====================================================================
// TRIANGLE_PROPRIETE_DEFI
function corrigerDefiAnglesPossibles(q: Q): string[] {
  const p: string[] = [];
  const as = anglesLus(q.text);
  if (as.length !== 3) return [`il faut trois angles, lu : ${as.length}`];
  if (as.some((x) => x <= 0 || x >= 180)) p.push(`angle hors de 0-180 : ${as.join(", ")}`);
  const r = as.reduce((s, x) => s + x, 0) === 180 ? "oui" : "non";
  uneSeuleJuste(q, (c) => c === r, p);
  return p;
}
function corrigerDefiDeuxAngles(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const droits = (t.match(/angle droit/g) ?? []).length + 2 * (t.match(/deux angles droits/g) ?? []).length;
  const as = [...anglesLus(t), ...Array(droits).fill(90)];
  if (as.length !== 2) return [`il faut deux angles, lu : ${as.length}`];
  for (const m of t.matchAll(/angle obtus de (\d+)°/g)) if (num(m[1]) <= 90) p.push(`« obtus » pour ${m[1]}°`);
  for (const m of t.matchAll(/un angle de (\d+)°/g)) if (num(m[1]) >= 90) p.push(`angle de ${m[1]}° non qualifié d’obtus ou de droit`);
  const r = as[0] + as[1] < 180 ? "oui" : "non";
  uneSeuleJuste(q, (c) => c === r, p);
  return p;
}
function corrigerDefiIsoceleAngles(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  let rep: number;
  const ri = t.match(/rectangle et isocèle en ([A-Z])/);
  if (/équilatéral/.test(t)) rep = 60;
  else if (ri) {
    const dem = fin.match(/angle en ([A-Z])/)?.[1];
    if (!dem) return ["angle demandé illisible"];
    rep = dem === ri[1] ? 90 : 45;
  } else {
    const r = anglesReconstruits(q, p);
    if (!r) return [...p, "angles illisibles"];
    rep = r.connus[r.demande];
    if (new RegExp(`l’angle en ${r.demande} mesure \\d`).test(t)) p.push("l’angle demandé est déjà donné");
  }
  verifierMesure(q, rep, "°", p);
  return p;
}
function corrigerDefiIsoceleBase(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const m = t.match(/angles à la base (?:mesurent|de) (\d+)°/);
  if (!m) return ["angle à la base illisible"];
  const b = num(m[1]);
  const possible = 2 * b < 180;
  uneSeuleJuste(
    q,
    (c) => {
      const oui = c.match(/^oui : ses angles mesurent (\d+)°, (\d+)° et (\d+)°$/);
      if (oui) {
        const as = oui.slice(1, 4).map(num);
        return possible && as[0] === b && as[1] === b && as.reduce((s, x) => s + x, 0) === 180 && as[2] > 0;
      }
      const non = c.match(/^non : (\d+) \+ (\d+) = (\d+), il ne reste rien$/);
      return Boolean(non && !possible && num(non[1]) === b && num(non[2]) === b && num(non[3]) === 2 * b);
    },
    p,
  );
  return p;
}
function corrigerDefiIsocelePerimetre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  if (!/isocèle/.test(t)) return ["le texte ne dit pas « isocèle »"];
  const ls = longueursLues(t);
  if (ls.length !== 2) return [`il faut deux longueurs, lu : ${ls.length}`];
  plausibles(ls, p);
  const [a, b] = ls.map((l) => l.v);
  // Les deux triangles isocèles possibles : a, a, b et a, b, b.
  const cas = [[a, a, b], [a, b, b]].filter(existe);
  if (cas.length !== 1) return [...p, `${cas.length} triangle(s) possible(s) : la réponse n’est pas unique`];
  verifierMesure(q, Math.round(cas[0].reduce((s, x) => s + x, 0) * 100) / 100, ls[0].u, p);
  return p;
}


// =====================================================================
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS « À PLUSIEURS FAÇONS » (bank : section
// du 07/11). Même contrat qu'au-dessus : on relit le texte et la figure, on refait
// le raisonnement, jamais on ne recopie la réponse. Une tournure non reconnue est
// un défaut (« question non reconnue »).
// =====================================================================
const verdict = (q: Q, oui: boolean, p: string[]) => uneSeuleJuste(q, (c) => c === (oui ? "oui" : "non"), p);
const verite = (q: Q, vrai: boolean, p: string[]) => uneSeuleJuste(q, (c) => c === (vrai ? "vrai" : "faux"), p);
/** Les segments écrits [XY] : extrémités dans l'ordre alphabétique, sinon défaut. */
function segmentsRanges(q: Q, p: string[]) {
  for (const m of [q.text, ...(q.choices ?? [])].join(" ").matchAll(/\[([A-Z])([A-Z])\]/g)) if (m[1] > m[2]) p.push(`segment écrit à l’envers : ${m[0]}`);
}
const segsDe = (t: string) => [...t.matchAll(/\[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2]]);
const sansRepetition = (s: string) => new Set(s.split("")).size === s.length;

// ----- TRIANGLE_NOMMER
function corrigerNommerNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let m: RegExpMatchArray | null;
  // Deux noms comparés : rien à lire sur la figure.
  if ((m = t.match(/« triangle ([A-Z]{3}) » et « triangle ([A-Z]{3}) »/)) || (m = t.match(/le même triangle : « triangle ([A-Z]{3}) » et « triangle ([A-Z]{3}) »/))) {
    verdict(q, memeEnsemble(m[1].split(""), m[2].split("")), p);
    return p;
  }
  const estNomDe = (V: string[], c: string, sauf?: string) => {
    const n = c.match(/^triangle ([A-Z]+)$/)?.[1];
    return Boolean(n && n !== sauf && memeEnsemble(n.split(""), V) && sansRepetition(n));
  };
  const nomsAttendus = (V: string[], garde: (n: string) => boolean) => {
    const r: string[] = [];
    for (const a of V) for (const b of V) for (const c of V) if (a !== b && b !== c && a !== c && garde(a + b + c)) r.push(a + b + c);
    return r;
  };
  /** Réponse libre en lettres : la liste doit être exactement celle des noms permis. */
  const listeJuste = (noms: string[]) => {
    const att = [...q.expected].map(String).sort().join("|");
    const voulu = [...noms, ...noms.map((n) => `triangle ${n}`)].sort().join("|");
    if (att !== voulu) p.push(`écritures acceptées : ${att}, attendues : ${voulu}`);
  };
  // Trois côtés écrits : les sommets sont leurs lettres.
  if ((m = t.match(/\[([A-Z])([A-Z])\], \[([A-Z])([A-Z])\] et \[([A-Z])([A-Z])\]/))) {
    const V = [...new Set(m.slice(1, 7))];
    if (V.length !== 3) return ["les trois côtés n’ont pas trois sommets"];
    listeJuste(nomsAttendus(V, () => true));
    return p;
  }
  if ((m = t.match(/côté \[([A-Z])([A-Z])\] et le sommet ([A-Z])/))) {
    const V = [m[1], m[2], m[3]];
    if (new Set(V).size !== 3) return ["le sommet est déjà une extrémité du côté"];
    uneSeuleJuste(q, (c) => estNomDe(V, c), p);
    return p;
  }
  if ((m = t.match(/[Ll]e côté \[([A-Z])([A-Z])\]|pour côté \[([A-Z])([A-Z])\]/))) {
    const [u, v] = m[1] ? [m[1], m[2]] : [m[3], m[4]];
    uneSeuleJuste(q, (c) => c.includes(u) && c.includes(v), p);
    return p;
  }
  // Le nom seul dit les trois sommets : on répond sans regarder de figure.
  const nomLu = t.match(/triangle ([A-Z]{3})\b/)?.[1]?.split("");
  if ((m = t.match(/[Dd]eux sommets du triangle [A-Z]{3} sont ([A-Z]) et ([A-Z])|a les sommets ([A-Z]) et ([A-Z])|, ([A-Z]) et ([A-Z]) sont des sommets/)) && nomLu) {
    const [u, v] = m.slice(1).filter(Boolean);
    uneSeuleJuste(q, (c) => c === nomLu.find((x) => x !== u && x !== v), p);
    return p;
  }
  if ((m = t.match(/le sommet ([A-Z]) \?|Sans figure : ([A-Z]) est-il|\. ([A-Z]) en est-il/)) && nomLu) {
    verdict(q, nomLu.includes(m[1] ?? m[2] ?? m[3]), p);
    return p;
  }
  if ((m = t.match(/(?:pour sommets|sommets sont) ([A-Z]), ([A-Z]) et ([A-Z])\b|^([A-Z]), ([A-Z]) et ([A-Z]) sont les sommets/))) {
    const S3 = m.slice(1).filter(Boolean);
    uneSeuleJuste(q, (c) => estNomDe(S3, c), p);
    return p;
  }
  if (/alphabet/.test(t) && nomLu) {
    const alpha = [...nomLu].sort().join("");
    if (String(q.expected[0]) !== alpha) p.push(`attendu ${q.expected[0]}, recalculé ${alpha}`);
    return p;
  }
  const f = fig(q);
  if (!f) return ["figure absente"];
  const V = nomsFig(f);
  const nomTexte = t.match(/triangle ([A-Z]{3})\b(?! »)/)?.[1];
  if (nomTexte && sansRepetition(nomTexte)) memesNoms(f, nomTexte.split(""), p);
  if ((m = t.match(/« triangle ([A-Z]{2})… »/))) {
    if (!sansRepetition(m[1]) || !m[1].split("").every((x) => V.includes(x))) p.push("début de nom faux");
    const [u, v] = m[1].split("");
    uneSeuleJuste(q, (c) => c === V.find((x) => x !== u && x !== v), p);
  } else if ((m = t.match(/« triangle ([A-Z]{4}) »/))) {
    const nom = m[1];
    uneSeuleJuste(q, (c) => nom.includes(c) && !V.includes(c), p);
  } else if ((m = t.match(/« triangle ([A-Z])([A-Z])\2 »/))) {
    const [u, v] = [m[1], m[2]];
    uneSeuleJuste(q, (c) => c === V.find((x) => x !== u && x !== v), p);
  } else if ((m = t.match(/« (triangle [A-Z]+) »/)) && /est-il un nom|appeler ce triangle|s’appelle-t-il|convient-il/.test(t)) {
    const C = m[1];
    verdict(q, estNomDe(V, C), p);
  } else if ((m = t.match(/« ([^»]+) »/)) && /[Qq]ue (?:désigne|veut dire)/.test(t)) {
    const e = m[1];
    const r = /^\[[A-Z]{2}\]$/.test(e) ? "un côté" : /^[A-Z]$/.test(e) ? "un sommet" : /^triangle [A-Z]{3}$/.test(e) ? "le triangle" : null;
    if (!r) return [...p, `écriture inconnue : ${e}`];
    uneSeuleJuste(q, (c) => c === r, p);
  } else if ((m = t.match(/qui commence par ([A-Z])|commence par ([A-Z])\. Écris-le|Commence par ([A-Z]) :/))) {
    const D = m[1] ?? m[2] ?? m[3];
    if (!V.includes(D)) p.push("la lettre de départ n’est pas un sommet");
    listeJuste(nomsAttendus(V, (n) => n[0] === D));
  } else if (/commencent par|commence par/.test(t)) uneSeuleJuste(q, (c) => c === "2", p);
  else if (/façons|noms possibles|ordres de lettres/.test(t)) uneSeuleJuste(q, (c) => c === "6", p);
  else if (/autre nom pour|Change l’ordre|Donne un autre nom/.test(t) && q.format === "short") {
    if (!nomTexte) return [...p, "nom illisible"];
    listeJuste(nomsAttendus(V, (n) => n !== nomTexte));
    if (q.expected.map(String).includes(nomTexte)) p.push("le nom déjà écrit est accepté");
  } else if (/même triangle que|autre nom|s’écrit aussi/.test(t)) uneSeuleJuste(q, (c) => estNomDe(V, c, nomTexte), p);
  else if (/Écris le nom|nom du triangle tracé|s’appelle ce triangle|Donne le nom/.test(t)) listeJuste(nomsAttendus(V, () => true));
  else if (/Choisis le nom|Quel nom convient|bon nom|Coche le nom/.test(t)) uneSeuleJuste(q, (c) => estNomDe(V, c), p);
  else if (/sommets de ce triangle/.test(t))
    uneSeuleJuste(
      q,
      (c) => {
        const s = c.match(/^([A-Z]), ([A-Z]) et ([A-Z])$/);
        return Boolean(s && memeEnsemble(s.slice(1, 4), V));
      },
      p,
    );
  else if (/lettres/.test(t)) uneSeuleJuste(q, (c) => c === "3", p);
  else if (/n’est pas un sommet/.test(t)) uneSeuleJuste(q, (c) => !V.includes(c), p);
  else if ((m = t.match(/(?:^|\s)([A-Z]) (?:est-il un sommet|fait-il partie)|a-t-il un sommet ([A-Z])/))) verdict(q, V.includes(m[1] ?? m[2]), p);
  else if (/mal écrit|écriture fausse/.test(t)) uneSeuleJuste(q, (c) => !sansRepetition(c.replace("triangle ", "")), p);
  else if (/intrus|ne convient pas|nom faux|nom est faux/.test(t)) uneSeuleJuste(q, (c) => !estNomDe(V, c), p);
  else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_SOMMET_COTE
function corrigerSommetNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  if (!f) return ["figure absente"];
  const V = nomsFig(f);
  const nom = t.match(/triangle ([A-Z]{3})\b/)?.[1];
  if (nom) memesNoms(f, nom.split(""), p);
  segmentsRanges(q, p);
  const estCote = (u: string, v: string) => u !== v && V.includes(u) && V.includes(v);
  const seg1 = segsDe(t)[0];
  const reste = (ex: string[]) => V.filter((x) => !ex.includes(x));
  const segJuste = (c: string, u: string, v: string) => memeEnsemble(lettresSeg(c) ?? [], [u, v]);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/\[([A-Z])…\]/))) {
    const r = t.match(/(?:va de|relie|qui relie) ([A-Z]) (?:à|et) ([A-Z])/);
    if (!r || r[1] !== m[1]) return [...p, "lettre manquante illisible"];
    const att = r[2];
    if (!estCote(r[1], att)) p.push("ce côté n’existe pas sur la figure");
    uneSeuleJuste(q, (c) => c === att, p);
  } else if (/(?:Quels sont les|Choisis les 3|Cite les) sommets/.test(t))
    uneSeuleJuste(q, (c) => memeEnsemble(c.match(/^([A-Z]), ([A-Z]) et ([A-Z])$/)?.slice(1, 4) ?? [], V), p);
  else if (/(?:Quels sont les|Choisis les 3|Cite les) côtés/.test(t))
    uneSeuleJuste(
      q,
      (c) => {
        const s = segsDe(c);
        return s.length === 3 && s.every(([u, v]) => estCote(u, v)) && new Set(s.map((x) => x.join(""))).size === 3;
      },
      p,
    );
  else if (/Quel segment est un côté|Choisis un côté|Trouve un côté/.test(t))
    uneSeuleJuste(
      q,
      (c) => {
        const s = lettresSeg(c);
        return Boolean(s && estCote(s[0], s[1]));
      },
      p,
    );
  else if (/Quel point est un sommet|Choisis un sommet|Trouve un sommet/.test(t)) uneSeuleJuste(q, (c) => V.includes(c), p);
  else if (/sommet ou (?:un )?côté|Choisis le bon mot/.test(t)) {
    const r = seg1 ? "un côté" : "un sommet";
    if (!seg1) {
      const l = t.match(/(?:^|\s)([A-Z])(?: est| :|\.)/)?.[1];
      if (!l || !V.includes(l)) p.push("lettre lue qui n’est pas un sommet");
    }
    uneSeuleJuste(q, (c) => c === r, p);
  } else if (/Combien de côtés (?:partent|touchent)|combien de côtés se rejoignent|Compte les côtés qui arrivent/.test(t)) uneSeuleJuste(q, (c) => c === "2", p);
  else if (/Combien d’extrémités|relie combien de sommets|Combien de sommets touche/.test(t)) uneSeuleJuste(q, (c) => c === "2", p);
  else if (/Compte les (?:sommets|côtés|angles)|Combien de (?:sommets|côtés|angles) vois-tu|a combien de (?:sommets|côtés|angles)/.test(t)) uneSeuleJuste(q, (c) => c === "3", p);
  else if ((m = t.match(/(?:^|\s)([A-Z]) est-il un sommet|a-t-il un sommet ([A-Z])|Le point ([A-Z]) est-il sur la figure/))) verdict(q, V.includes(m[1] ?? m[2] ?? m[3]), p);
  else if (/est-il un côté|a-t-il le côté|fait-il partie des côtés/.test(t)) {
    if (!seg1) return [...p, "segment illisible"];
    verdict(q, estCote(seg1[0], seg1[1]), p);
  } else if ((m = t.match(/Le côté \[[A-Z]{2}\] est-il (?:opposé au|en face du) sommet ([A-Z])|([A-Z]) est-il le sommet opposé/))) {
    const S = m[1] ?? m[2];
    verdict(q, !seg1.includes(S) && estCote(seg1[0], seg1[1]), p);
  } else if ((m = t.match(/(?:^|\s)([A-Z]) est-il une extrémité|touche-t-il le sommet ([A-Z])|part-il du sommet ([A-Z])/))) verdict(q, seg1.includes(m[1] ?? m[2] ?? m[3]), p);
  else if ((m = t.match(/(?:relie|va de|joint) ([A-Z]) (?:et|à) ([A-Z])/))) {
    const [u, v] = [m[1], m[2]];
    if (!estCote(u, v)) p.push("ces lettres ne forment pas un côté");
    uneSeuleJuste(q, (c) => segJuste(c, u, v), p);
  } else if (/commun à|appartient à|se rejoignent en/.test(t)) {
    const [a, b] = segsDe(t);
    const commun = a.filter((x) => b.includes(x));
    if (commun.length !== 1) return [...p, "les deux côtés n’ont pas un seul sommet commun"];
    uneSeuleJuste(q, (c) => c === commun[0], p);
  } else if ((m = t.match(/Quels côtés (?:partent du|touchent le) sommet ([A-Z])|2 côtés qui arrivent en ([A-Z])/))) {
    const S = m[1] ?? m[2];
    uneSeuleJuste(
      q,
      (c) => {
        const s = segsDe(c);
        return s.length === 2 && s.every(([u, v]) => (u === S || v === S) && estCote(u, v));
      },
      p,
    );
  } else if (/troisième \?|dernier côté|Quel côté manque/.test(t)) {
    const [a, b] = segsDe(t);
    uneSeuleJuste(
      q,
      (c) => {
        const s = lettresSeg(c);
        return Boolean(s && estCote(s[0], s[1]) && s.join("") !== a.join("") && s.join("") !== b.join(""));
      },
      p,
    );
  } else if (/Quels sommets relie|va de quel sommet|Choisis les extrémités/.test(t)) {
    uneSeuleJuste(q, (c) => memeEnsemble(c.match(/^([A-Z]) et ([A-Z])$/)?.slice(1, 3) ?? [], seg1), p);
  } else if (/n’est pas une extrémité|hors du côté|ne touche pas (?:le côté )?\[|opposé au côté|en face du côté|en face de \[/.test(t)) {
    const att = reste(seg1);
    if (att.length !== 1) return [...p, "le côté n’est pas sur la figure"];
    uneSeuleJuste(q, (c) => c === att[0], p);
  } else if ((m = t.match(/(?:opposé au sommet|en face du sommet|ne touche pas|en face de) ([A-Z])\b/))) {
    const S = m[1];
    uneSeuleJuste(
      q,
      (c) => {
        const s = lettresSeg(c);
        return Boolean(s && estCote(s[0], s[1]) && !s.includes(S));
      },
      p,
    );
  } else if (/segment en trop|Quel segment est en trop|n’est pas un côté de ce triangle/.test(t))
    uneSeuleJuste(
      q,
      (c) => {
        const s = lettresSeg(c);
        return Boolean(s && !estCote(s[0], s[1]));
      },
      p,
    );
  else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_TYPE_COTE
/** Ce que dit une figure sur ses côtés : longueurs écrites, sinon codages. */
function natureDeLaFigure(f: Fig, p: string[]) {
  const lab = f.sideLabels ?? {};
  const ls = (["AB", "BC", "CA"] as const).map((k) => (lab[k] ? longueursLues(String(lab[k]))[0] : undefined));
  if (ls.every(Boolean)) {
    const [a, b, c] = ls.map((l) => l!.v);
    figureALEchelle(f, { AB: a, BC: b, CA: c }, p);
    return natureDe(a, b, c);
  }
  const g = cotesFig(f);
  const paires = f.marks?.equalSides ?? [];
  for (const [s1, s2] of paires) if (Math.abs(g[s1] - g[s2]) / Math.max(g[s1], g[s2]) > 0.02) p.push(`codage ${s1} = ${s2} faux sur la figure`);
  const codes = new Set(paires.flat());
  return codes.size === 3 ? "équilatéral" : codes.size === 2 ? "isocèle" : "quelconque";
}
/** Les noms (lettres triées) des côtés codés égaux. */
function cotesCodes(f: Fig) {
  const [a, b, c] = nomsFig(f);
  const nomme: Record<string, string> = { AB: [a, b].sort().join(""), BC: [b, c].sort().join(""), CA: [c, a].sort().join("") };
  return [...new Set((f.marks?.equalSides ?? []).flat())].map((k) => nomme[k]);
}
/** Le sommet principal d'une figure isocèle codée : la lettre commune aux deux côtés codés. */
function sommetCode(f: Fig) {
  const [u, v] = cotesCodes(f);
  return u && v ? u.split("").find((x) => v.includes(x)) : undefined;
}
const VRAIS_COTES: Record<string, boolean> = {
  "Un triangle équilatéral est aussi isocèle.": true,
  "Un triangle isocèle est toujours équilatéral.": false,
  "Un triangle quelconque a 2 côtés égaux.": false,
  "Un triangle équilatéral a 3 côtés égaux.": true,
  "Un triangle isocèle a au moins 2 côtés égaux.": true,
  "Un triangle quelconque a 3 côtés différents.": true,
  "Un triangle isocèle a 3 côtés différents.": false,
  "Un triangle équilatéral a 2 côtés différents.": false,
};
/** « 5 cm, 5 cm et 7 cm » → nature, ou null si ce n'est pas une série de longueurs. */
function natureSerie(c: string) {
  const ls = longueursLues(c);
  if (ls.length !== 3) return null;
  const [a, b, d] = ls.map((l) => l.v);
  const [x, y, z] = [a, b, d].sort((u, v) => u - v);
  return x + y > z ? natureDe(a, b, d) : "impossible";
}
function corrigerCoteNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  segmentsRanges(q, p);
  const f = fig(q);
  let m: RegExpMatchArray | null;
  const eg = egalitesLongueurs(t);
  const ks = Object.keys(eg);
  const fin = t.split(/(?<=[.?]) /).pop() ?? t;
  const finVF = t.match(/^(.*?) Vrai ou faux \?$/)?.[1];
  if (finVF && VRAIS_COTES[finVF] !== undefined) verite(q, VRAIS_COTES[finVF], p);
  else if (finVF && !longueursLues(finVF).length) return [...p, "phrase vrai/faux inconnue"];
  else if ((m = t.match(/^(.*?)(?: :|\.)? (?:[Ll]e triangle est|[Tt]riangle) (équilatéral|isocèle|quelconque)(?:,| :) vrai ou faux \?$/))) {
    const n = natureSerie(m[1]);
    if (!n) return [...p, "série illisible"];
    if (n === "équilatéral" && m[2] === "isocèle") p.push("question-piège : un équilatéral est aussi isocèle");
    verite(q, n === m[2], p);
  } else if (/(?:Quelles longueurs (?:forment|donnent)|Choisis les côtés d’) ?un triangle (équilatéral|isocèle|quelconque)/.test(t)) {
    const n = t.match(/triangle (équilatéral|isocèle|quelconque)/)![1];
    uneSeuleJuste(q, (c) => natureSerie(c) === n, p);
    // Un équilatéral proposé pour « isocèle » serait une deuxième bonne réponse.
    if (n === "isocèle" && (q.choices ?? []).some((c) => natureSerie(c) === "équilatéral")) p.push("un équilatéral parmi les leurres d’« isocèle »");
    for (const c of q.choices ?? []) if (natureSerie(c) === "impossible") p.push(`série impossible : ${c}`);
  } else if (/ne donnent pas un triangle isocèle|ne forment pas un triangle isocèle|Lequel ne l’est pas/.test(t)) uneSeuleJuste(q, (c) => natureSerie(c) === "quelconque", p);
  else if ((m = t.match(/(Quel triangle a|Comment s’appelle un triangle à|Choisis le nom d’un triangle à|Un triangle a) (3 côtés égaux|exactement 2 côtés égaux|3 côtés différents)/))) {
    const r = m[2] === "3 côtés égaux" ? "équilatéral" : m[2] === "3 côtés différents" ? "quelconque" : "isocèle";
    uneSeuleJuste(q, (c) => c === r, p);
  } else if (/triangle isocèle a au moins|a un triangle isocèle/.test(t)) uneSeuleJuste(q, (c) => c === "2", p);
  else if ((m = t.match(/triangle (équilatéral|quelconque) a (?:combien|…)|a un triangle (équilatéral|quelconque)/))) {
    const n = m[1] ?? m[2];
    uneSeuleJuste(q, (c) => c === (n === "équilatéral" ? "3" : "0"), p);
  } else if ((m = t.match(/[Ii]socèle en ([A-Z]) : |[Tt]riangle isocèle en ([A-Z]),/)) && /périmètre/.test(t)) {
    const S = m[1] ?? m[2];
    const cote = ks.find((k) => k.includes(S));
    const base = ks.find((k) => !k.includes(S));
    if (!cote || !base) return [...p, "il faut un côté issu du sommet principal et la base"];
    const [a, b] = [eg[cote].v, eg[base].v];
    if (b >= 2 * a) p.push(`triangle impossible : base ${b} ≥ ${a} + ${a}`);
    verifierMesure(q, Math.round((2 * a + b) * 100) / 100, eg[cote].u, p);
    if (f) {
      const cn = cotesNommes(f);
      const autre = Object.keys(cn).find((k) => k !== cote && k !== base)!;
      if (Math.abs(cn[cote] - cn[autre]) / cn[cote] > 0.02) p.push("figure : pas isocèle au sommet annoncé");
      if (Math.abs(cn[base] / cn[cote] - b / a) > 0.04 * (b / a)) p.push("figure pas à l’échelle");
    }
  } else if (/équilatéral/.test(t) && /périmètre/.test(t)) {
    const l = longueursLues(t);
    if (l.length !== 1) return [...p, "côté illisible"];
    verifierMesure(q, Math.round(3 * l[0].v * 100) / 100, l[0].u, p);
    if (f) {
      const g = cotesFig(f);
      if (Math.max(g.AB, g.BC, g.CA) / Math.min(g.AB, g.BC, g.CA) > 1.03) p.push("figure : pas équilatérale");
    }
  } else if (/équilatéral/.test(t) && ks.length === 1 && (m = fin.match(/([A-Z]{2})\b/))) {
    // « Triangle équilatéral, XY = 5 cm. Combien mesure YZ ? »
    const dem = m[1].split("").sort().join("");
    if (dem === ks[0]) p.push("on demande la longueur déjà donnée");
    if (f) {
      const g = cotesFig(f);
      if (Math.max(g.AB, g.BC, g.CA) / Math.min(g.AB, g.BC, g.CA) > 1.03) p.push("figure : pas équilatérale");
    }
    verifierMesure(q, eg[ks[0]].v, eg[ks[0]].u, p);
  } else if ((m = t.match(/isocèle en ([A-Z])/)) && ks.length === 1) {
    const S = m[1];
    if (!ks[0].includes(S)) p.push("la longueur donnée n’est pas un côté issu du sommet principal");
    const dem = fin.match(/\b([A-Z]{2})\b/)?.[1]?.split("").sort().join("");
    if (!dem || !dem.includes(S) || dem === ks[0]) return [...p, "longueur demandée illisible ou déjà donnée"];
    if (f) {
      const cn = cotesNommes(f);
      if (Math.abs(cn[ks[0]] - cn[dem]) / cn[dem] > 0.02) p.push("figure : les deux côtés ne sont pas égaux");
    }
    verifierMesure(q, eg[ks[0]].v, eg[ks[0]].u, p);
  } else if (ks.length === 3) {
    const [a, b, c] = ks.map((k) => eg[k].v);
    const n = natureDe(a, b, c);
    uneSeuleJuste(q, (ch) => ch === n, p);
    if (f) {
      const cn = cotesNommes(f);
      const r = ks.map((k) => cn[k] / eg[k].v);
      if (Math.max(...r) / Math.min(...r) > 1.04) p.push("figure pas à l’échelle");
      memesNoms(f, [...new Set(ks.join(""))], p);
    }
  } else if ((m = t.match(/^([A-Z]{2}) = ([A-Z]{2})\./))) {
    const [a, b] = [m[1], m[2]];
    const S = a.split("").find((x) => b.includes(x));
    if (!S) return [...p, "deux côtés sans sommet commun"];
    uneSeuleJuste(q, (c) => c === S, p);
    if (f) {
      const cn = cotesNommes(f);
      const [ka, kb] = [a, b].map((k) => k.split("").sort().join(""));
      if (Math.abs(cn[ka] - cn[kb]) / cn[ka] > 0.02) p.push("figure : les côtés annoncés égaux ne le sont pas");
    }
  } else if (!f) return [...p, "question non reconnue"];
  else if (/sommet principal|En quel sommet|en quel sommet/.test(t)) {
    const S = sommetCode(f);
    if (!S) return [...p, "aucun sommet principal codé"];
    natureDeLaFigure(f, p);
    uneSeuleJuste(q, (c) => c === S, p);
  } else if (/base/.test(t)) {
    const S = t.match(/isocèle en ([A-Z])|Isocèle en ([A-Z])/)?.slice(1).find(Boolean) ?? sommetCode(f);
    if (!S || (sommetCode(f) && sommetCode(f) !== S)) return [...p, "sommet principal illisible ou contredit"];
    uneSeuleJuste(q, (c) => memeEnsemble(lettresSeg(c) ?? [], nomsFig(f).filter((x) => x !== S)), p);
  } else if ((m = t.match(/même longueur que \[([A-Z])([A-Z])\]|égal à \[([A-Z])([A-Z])\]/))) {
    const k = (m[1] ? m[1] + m[2] : m[3] + m[4]) as string;
    const codes = cotesCodes(f);
    if (!codes.includes(k)) return [...p, "le côté donné n’est pas codé"];
    const att = codes.find((x) => x !== k)!;
    uneSeuleJuste(q, (c) => (lettresSeg(c) ?? []).join("") === att, p);
    natureDeLaFigure(f, p);
  } else if (/Combien de côtés sont égaux|portent un codage|sont codés/.test(t)) {
    const n = natureDeLaFigure(f, p);
    const r = n === "équilatéral" ? "3" : n === "isocèle" ? "2" : "0";
    uneSeuleJuste(q, (c) => c === r, p);
  } else if (/est-il isocèle \?|2 côtés (?:égaux|de même longueur)/.test(t)) {
    const n = natureDeLaFigure(f, p);
    if (n === "équilatéral") p.push("question-piège : un équilatéral est aussi isocèle");
    verdict(q, n === "isocèle", p);
  } else if (/est-il équilatéral \?|3 côtés (?:sont-ils )?égaux/.test(t)) verdict(q, natureDeLaFigure(f, p) === "équilatéral", p);
  else if (QUESTION_PRECISE.test(t) || /Quel mot décrit le mieux/.test(t)) {
    const n = natureDeLaFigure(f, p);
    uneSeuleJuste(q, (c) => c === n, p);
  } else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_TYPE_ANGLE
const MOT_DE_NATURE: Record<string, number> = { rectangle: 0, obtusangle: 1, acutangle: 2 };
const natureCourte = (as: number[]) => {
  const g = Math.max(...as);
  return g === 90 ? "rectangle" : g > 90 ? "obtusangle" : "acutangle";
};
const motUnAngle = (v: number) => (v === 90 ? "droit" : v < 90 ? "aigu" : "obtus");
/** Série « 30°, 60° et 90° » d'une proposition. */
const serieAngles = (c: string) => anglesLus(c);
function angleEnJuste(q: Q, S: string, p: string[]) {
  uneSeuleJuste(q, (c) => c === `l’angle en ${S}`, p);
}
function corrigerAngleNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  let m: RegExpMatchArray | null;
  const nom = t.match(/[Tt]riangle ([A-Z]{3})\b/)?.[1];
  if (f && nom) memesNoms(f, nom.split(""), p);
  const vals = f ? (Object.values(anglesDeLaFigure(f, p)).filter((x): x is number => x !== null) as number[]) : [];
  const parNom = f ? etiquettesParNom(f) : {};
  // Les mots seuls.
  if ((m = t.match(/(?:Quel triangle a|un triangle avec|Un triangle a) (un angle droit|un angle obtus|3 angles aigus)(?: \?|\.)/)) && !/autres/.test(t)) {
    const r = m[1] === "un angle droit" ? "rectangle" : m[1] === "un angle obtus" ? "obtusangle" : "acutangle";
    uneSeuleJuste(q, (c) => c === r, p);
  } else if (!/Trouve les 3 angles|Choisis les angles/.test(t) && (m = t.match(/triangle (rectangle|obtusangle|acutangle) a(?: combien|-t-il un angle (droit|obtus))|d’un triangle (rectangle|obtusangle|acutangle)|a un triangle (rectangle|obtusangle|acutangle)/))) {
    const nat = m[1] ?? m[3] ?? m[4];
    if (m[2]) verdict(q, (nat === "rectangle" && m[2] === "droit") || (nat === "obtusangle" && m[2] === "obtus"), p);
    else if (/angles aigus/.test(t)) uneSeuleJuste(q, (c) => c === (nat === "acutangle" ? "3" : "2"), p);
    else return [...p, "question non reconnue"];
    if (MOT_DE_NATURE[nat] === undefined) p.push("nature inconnue");
  } else if (/Comment sont les deux autres|Les deux autres sont-ils/.test(t)) {
    const d = anglesLus(t)[0] ?? (/angle droit/.test(t) ? 90 : NaN);
    if (!(d >= 90)) return [...p, "angle donné illisible"];
    uneSeuleJuste(q, (c) => c === "aigus", p);
  } else if (/angle droit mesure|mesure un angle droit|angle aigu mesure|angle aigu reste sous|angle obtus mesure|angle obtus dépasse/.test(t)) verifierMesure(q, 90, "°", p);
  else if (/(?:Quels angles forment |Choisis les angles d’|Trouve les 3 angles d’)un triangle (rectangle|obtusangle|acutangle)/.test(t)) {
    const n = t.match(/un triangle (rectangle|obtusangle|acutangle)/)![1];
    for (const c of q.choices ?? []) if (serieAngles(c).reduce((s, x) => s + x, 0) !== 180) p.push(`série qui ne fait pas 180° : ${c}`);
    uneSeuleJuste(q, (c) => natureCourte(serieAngles(c)) === n, p);
  } else if ((m = t.match(/(?:[Tt]riangle|est) (rectangle|obtusangle|acutangle)(?:,| :|\.) [Vv]rai ou faux/))) {
    const as = anglesLus(t);
    if (as.length !== 3 || as.reduce((s, x) => s + x, 0) !== 180) return [...p, `angles lus : ${as.join(", ")}`];
    verite(q, natureCourte(as) === m[1], p);
  } else if (f && vals.length === 1 && (m = t.match(/l’angle en ([A-Z])/))) {
    if (parNom[m[1]] !== `${vals[0]}°`) p.push("l’angle demandé n’est pas celui écrit sur la figure");
    uneSeuleJuste(q, (c) => c === motUnAngle(vals[0]), p);
  } else if (f && f.marks?.rightAngleAt && vals.length === 0) {
    const S = nomsFig(f)["ABC".indexOf(f.marks.rightAngleAt)];
    uneSeuleJuste(q, (c) => c === S, p);
  } else if (f && vals.length === 3) {
    if (vals.reduce((s, x) => s + x, 0) !== 180) p.push("figure : somme des angles ≠ 180");
    const entrees = Object.entries(parNom).map(([k, s]) => [k, num(String(s).replace("°", ""))] as [string, number]);
    if (/plus grand angle/.test(t)) {
      const g = Math.max(...vals);
      const qui = entrees.filter((e) => e[1] === g);
      if (qui.length !== 1) return [...p, "deux plus grands angles"];
      angleEnJuste(q, qui[0][0], p);
    } else if (/plus petit/.test(t)) {
      const g = Math.min(...vals);
      const qui = entrees.filter((e) => e[1] === g);
      if (qui.length !== 1) return [...p, "deux plus petits angles"];
      angleEnJuste(q, qui[0][0], p);
    } else if (/angle est obtus|angle obtus de ce/.test(t)) {
      const qui = entrees.filter((e) => e[1] > 90);
      if (qui.length !== 1) return [...p, "pas d’angle obtus unique"];
      angleEnJuste(q, qui[0][0], p);
    } else if (/angle (?:de ce triangle )?est droit|angle droit de ce/.test(t)) {
      const qui = entrees.filter((e) => e[1] === 90);
      if (qui.length !== 1) return [...p, "pas d’angle droit unique"];
      angleEnJuste(q, qui[0][0], p);
    } else if (/angles aigus/.test(t)) uneSeuleJuste(q, (c) => c === String(vals.filter((x) => x < 90).length), p);
    else if (/est-il rectangle \?|angle droit \?/.test(t)) verdict(q, Math.max(...vals) === 90, p);
    else if (/obtusangle \?|angle obtus \?/.test(t) && !/rectangle, obtusangle/.test(t)) verdict(q, Math.max(...vals) > 90, p);
    else uneSeuleJuste(q, (c) => c === natureAngles(vals), p);
  } else {
    // Deux ou trois angles dans le texte.
    let as = anglesLus(t);
    if (as.length === 2) as = [...as, 180 - as[0] - as[1]];
    if (as.length !== 3) return [...p, `question non reconnue : ${as.length} angles lus`];
    if (as.reduce((s, x) => s + x, 0) !== 180 || as.some((x) => x <= 0)) p.push(`angles impossibles : ${as.join(", ")}`);
    if (/est-il rectangle \?|angle droit \?/.test(t)) verdict(q, Math.max(...as) === 90, p);
    else if ((m = t.match(/^(?:Un angle mesure |Un angle de )?(\d+)/)) && /aigu, droit ou obtus|Quel mot décrit|Choisis le mot/.test(t) && anglesLus(t).length === 1) uneSeuleJuste(q, (c) => c === motUnAngle(num(m![1])), p);
    else uneSeuleJuste(q, (c) => c === natureAngles(as), p);
  }
  return p;
}
/** Un angle seul : « Un angle mesure 120°… », « 120 degrés : … ». */
function corrigerAngleSeul(q: Q): string[] {
  const t = q.text;
  if (fig(q) || /[Cc]ombien de degrés/.test(t)) return corrigerAngleNeuf(q);
  const p: string[] = [];
  const m = t.match(/(\d+)(?:°| degrés)/);
  if (!m) return ["angle illisible"];
  uneSeuleJuste(q, (c) => c === motUnAngle(num(m[1])), p);
  return p;
}

// ----- TRIANGLE_DEFI
const VRAIS_DEFI: Record<string, boolean> = {
  "Un triangle rectangle peut avoir 2 côtés égaux.": true,
  "Un triangle équilatéral peut être rectangle.": false,
  "Un triangle isocèle peut avoir un angle droit.": true,
  "Un triangle rectangle est toujours isocèle.": false,
  "Un triangle équilatéral est aussi isocèle.": true,
  "Un triangle rectangle a toujours 3 côtés différents.": false,
  "Un triangle rectangle isocèle a 3 côtés égaux.": false,
  "Un triangle rectangle isocèle a 2 angles de 45°.": true,
  "Un triangle équilatéral a 3 angles de 60°.": true,
  "Un triangle isocèle a toujours un angle droit.": false,
};
function corrigerDefiNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  let m: RegExpMatchArray | null;
  const finVF = t.match(/^(.*?) Vrai ou faux \?$/)?.[1];
  if (finVF) {
    if (VRAIS_DEFI[finVF] === undefined) return ["phrase vrai/faux inconnue"];
    verite(q, VRAIS_DEFI[finVF], p);
  } else if (/n’existe pas|impossible/.test(t)) uneSeuleJuste(q, (c) => /équilatéral/.test(c) && /rectangle/.test(c), p);
  else if (/dire « isocèle »/.test(t)) uneSeuleJuste(q, (c) => c === "les côtés", p);
  else if (/dire « rectangle »/.test(t)) uneSeuleJuste(q, (c) => c === "les angles", p);
  else if ((m = t.match(/triangle (rectangle isocèle|équilatéral) a combien (d’angles droits|de côtés égaux)|(d’angles droits|de côtés égaux) a un triangle (rectangle isocèle|équilatéral)/))) {
    const nat = m[1] ?? m[4];
    const quoi = m[2] ?? m[3];
    const r = quoi === "d’angles droits" ? (nat === "équilatéral" ? "0" : "1") : nat === "équilatéral" ? "3" : "2";
    uneSeuleJuste(q, (c) => c === r, p);
  } else if ((m = t.match(/(?:Quel triangle a|un triangle avec|le triangle avec) ([^?.]+?)(?: \?|\.)$/))) {
    const r = { "un angle droit et 2 côtés égaux": "rectangle isocèle", "un angle droit et 3 côtés différents": "rectangle", "3 côtés égaux": "équilatéral", "2 côtés égaux, sans angle droit": "isocèle" }[m[1]];
    if (!r) return [`description inconnue : ${m[1]}`];
    uneSeuleJuste(q, (c) => c === r, p);
  } else if (/égaux|est-il|a-t-il|Vois-tu/.test(t) && f && /Lis les codages|Observe les codages/.test(t)) {
    // Oui/non lu sur les codages.
    const a = anglesFig(f);
    const droit = f.marks?.rightAngleAt;
    if (droit && Math.abs(a[droit] - 90) > 1.5) p.push("angle codé droit qui ne l’est pas");
    const n = natureDeLaFigure(f, p);
    if (/rectangle \?|angle droit \?/.test(t)) verdict(q, Boolean(droit), p);
    else if (/équilatéral \?/.test(t)) verdict(q, n === "équilatéral", p);
    else {
      if (n === "équilatéral") p.push("question-piège : un équilatéral est aussi isocèle");
      verdict(q, n === "isocèle", p);
    }
  } else {
    const faits = t.split(/ (?=Quelle est sa nature|Quel mot|Choisis le nom)/)[0];
    const eg3 = faits.match(/^([A-Z]{2}) = ([A-Z]{2}) = ([A-Z]{2})\.$/);
    const droitS = faits.match(/\\widehat\{([A-Z])\}\$ = 90°/)?.[1];
    const autre = faits.match(/\\widehat\{([A-Z])\}\$ = (\d+)°/);
    const iso = faits.match(/^([A-Z]{2}) = ([A-Z]{2}) et/);
    const diff = /sont différents/.test(faits);
    let n: string | null = null;
    if (eg3) n = "équilatéral";
    else if (droitS && iso) n = "rectangle isocèle";
    else if (droitS && diff) n = "rectangle";
    else if (iso && autre) n = num(autre[2]) === 60 ? "équilatéral" : "isocèle";
    const as = anglesLus(t);
    if (!n && as.length === 3) {
      if (as.reduce((s, x) => s + x, 0) !== 180) return [`les angles font ${as.reduce((s, x) => s + x, 0)}°`];
      const d = Math.max(...as) === 90;
      const egaux = new Set(as).size;
      n = egaux === 1 ? "équilatéral" : egaux === 2 ? (d ? "rectangle isocèle" : "isocèle") : d ? "rectangle" : "quelconque";
    }
    if (!n) return ["question non reconnue"];
    uneSeuleJuste(q, (c) => c === n, p);
    if (f && (eg3 || iso || droitS)) {
      const cn = cotesNommes(f);
      const g = anglesParNom(f);
      if (eg3) {
        const v = Object.values(cn);
        if (Math.max(...v) / Math.min(...v) > 1.03) p.push("figure : pas équilatérale");
      }
      if (iso) {
        const [a, b] = [iso[1], iso[2]].map((k) => k.split("").sort().join(""));
        if (Math.abs(cn[a] - cn[b]) / cn[a] > 0.02) p.push("figure : les côtés annoncés égaux ne le sont pas");
      }
      if (droitS && Math.abs(g[droitS] - 90) > 1.5) p.push("figure : l’angle droit annoncé ne l’est pas");
      if (autre && Math.abs(g[autre[1]] - num(autre[2])) > 2) p.push("figure : l’angle annoncé n’a pas cette mesure");
    }
  }
  return p;
}

// ----- TRIANGLE_SOMME_ANGLE
function corrigerSommeNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  const lus = anglesLus(t);
  let m: RegExpMatchArray | null;
  const labels = f ? (Object.values(anglesDeLaFigure(f, p)).filter((x): x is number => x !== null) as number[]) : [];
  const nommes = Object.entries(anglesNommesLus(t));
  const somme = (c: string) => anglesLus(c).reduce((s, x) => s + x, 0);
  if (/Vrai ou faux/.test(t)) {
    if (lus.length !== 1) return ["une seule somme attendue"];
    verite(q, lus[0] === 180, p);
  } else if (/Complète|les 3 angles font combien/.test(t)) verifierMesure(q, 180, "°", p);
  else if (/Quels angles peuvent|vrai triangle|font 180° ?\.?$|Trouve les angles qui font/.test(t) && (q.choices?.length ?? 0) > 2) uneSeuleJuste(q, (c) => somme(c) === 180, p);
  else if (/ne font pas 180|n’est pas celle d’un triangle/.test(t)) uneSeuleJuste(q, (c) => somme(c) !== 180, p);
  else if (/font-ils 180|Trouves-tu 180/.test(t)) {
    const as = lus.filter((_, i) => i < 3 && (lus.length === 4 ? (/^Ces angles/.test(t) ? i >= 0 : true) : true));
    const trois = /^Ces angles font-ils/.test(t) ? lus.slice(1, 4) : lus.slice(0, 3);
    if (trois.length !== 3 || as.length < 3) return ["trois angles attendus"];
    verdict(q, trois.reduce((s, x) => s + x, 0) === 180, p);
  } else if (/Trois angles mesurent/.test(t)) {
    const trois = lus.slice(0, 3);
    const s = trois.reduce((a, b) => a + b, 0);
    if (s === 180) return ["ces angles font déjà 180°"];
    if (/manque/.test(t) && s > 180) p.push("il n’en manque pas, il y en a trop");
    if (/dépasse|de trop/.test(t) && s < 180) p.push("il n’y en a pas trop, il en manque");
    verifierMesure(q, Math.abs(180 - s), "°", p);
  } else if (/égaux/.test(t) && /Trois angles égaux|3 angles égaux|3 angles d’un triangle sont égaux/.test(t)) verifierMesure(q, 60, "°", p);
  else if ((m = t.match(/[Dd]eux angles (?:mesurent|égaux font) (\d+)° chacun/))) verifierMesure(q, 180 - 2 * num(m[1]), "°", p);
  else if (/2 autres (?:angles )?sont égaux/.test(t)) {
    if (lus.length !== 1) return ["un angle attendu"];
    verifierMesure(q, (180 - lus[0]) / 2, "°", p);
  } else if ((m = t.match(/[Dd]eux angles font (\d+)°|Les 2 autres font (\d+)°/))) verifierMesure(q, 180 - num(m[1] ?? m[2]), "°", p);
  else if (/angle droit|2 angles aigus/.test(t)) verifierMesure(q, 90, "°", p);
  else if (/Combien font les 2|somme des 2 autres|2 angles sans mesure/.test(t)) {
    const v = nommes[0]?.[1] ?? lus[0] ?? labels[0];
    if (v === undefined) return ["angle connu illisible"];
    if (labels.length !== 1 || labels[0] !== v) p.push("l’angle du texte n’est pas celui de la figure");
    verifierMesure(q, 180 - v, "°", p);
  } else if (labels.length === 3) {
    if (lus.length) p.push("angles dans le texte et sur la figure");
    verifierMesure(q, labels.reduce((s, x) => s + x, 0), "°", p);
    if (labels.reduce((s, x) => s + x, 0) !== 180) p.push("figure : somme ≠ 180");
  } else if (lus.length === 3) {
    const s = lus.reduce((a, b) => a + b, 0);
    if (s !== 180) p.push(`les angles font ${s}°`);
    verifierMesure(q, s, "°", p);
  } else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_ANGLE_MANQUANT
function corrigerManquantNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  const lus = anglesLus(t);
  let m: RegExpMatchArray | null;
  const repond = (v: number) => {
    if (v <= 0) p.push(`angle impossible : ${v}°`);
    if (q.format === "qcm") uneSeuleJuste(q, (c) => mesure(c)?.u === "°" && egal(mesure(c)!.v, v), p);
    else verifierMesure(q, v, "°", p);
  };
  const nommes = anglesNommesLus(t);
  if (f) {
    const lab = etiquettesParNom(f);
    anglesDeLaFigure(f, p);
    for (const [k, s] of Object.entries(lab)) if (s && /\d/.test(s) && nommes[k] !== undefined && num(s.replace("°", "")) !== nommes[k]) p.push(`angle en ${k} : texte et figure différents`);
  }
  if ((m = t.match(/\$\\widehat\{[A-Z]\}\$ \+ \$\\widehat\{[A-Z]\}\$ = (\d+)°/))) repond(180 - num(m[1]));
  else if ((m = t.match(/\$\\widehat\{([A-Z])\}\$ et \$\\widehat\{([A-Z])\}\$ mesurent (\d+)° chacun/))) repond(180 - 2 * num(m[3]));
  else if ((m = t.match(/\$\\widehat\{([A-Z])\}\$ = (\d+)°/)) && /sont égaux/.test(t)) {
    const r = (180 - num(m[2])) / 2;
    repond(r);
    if (f) {
      const g = anglesParNom(f)[nomsFig(f).find((x) => x !== m![1] && etiquettesParNom(f)[x] === "?")!];
      if (Math.abs(g - r) > 2) p.push("figure : l’angle demandé n’a pas cette mesure");
    }
  } else if (/[Vv]rai ou faux/.test(t)) {
    if (lus.length !== 3) return ["trois angles attendus"];
    verite(q, 180 - lus[0] - lus[1] === lus[2], p);
  } else if (/aigu, droit ou obtus|Quel mot décrit|Choisis le mot/.test(t)) {
    if (lus.length !== 2) return ["deux angles attendus"];
    uneSeuleJuste(q, (c) => c === motUnAngle(180 - lus[0] - lus[1]), p);
  } else if (/180° −/.test(t)) {
    if (lus.length !== 3 || lus[0] !== 180) return ["calcul illisible"];
    repond(lus[0] - lus[1] - lus[2]);
  } else if (/… = 180°|… \+/.test(t)) {
    if (lus.length !== 3 || lus[2] !== 180) return ["calcul illisible"];
    repond(180 - lus[0] - lus[1]);
  } else if ((m = t.match(/(?:[Dd]eux angles font|les 2 autres font) (\d+)°/))) repond(180 - num(m[1]));
  else if (/ensemble|Additionne/.test(t)) {
    if (lus.length !== 2) return ["deux angles attendus"];
    verifierMesure(q, lus[0] + lus[1], "°", p);
  } else if (/« \? »/.test(t) && f) {
    const lab = etiquettesParNom(f);
    const conn = Object.entries(lab).filter(([, s]) => s && /\d/.test(s)).map(([k, s]) => [k, num(s!.replace("°", ""))] as [string, number]);
    const qui = Object.entries(lab).find(([, s]) => s === "?")?.[0];
    if (!qui) return [...p, "figure : pas de « ? »"];
    let r: number;
    if (conn.length === 2) r = 180 - conn[0][1] - conn[1][1];
    else if (conn.length === 1 && sommetCode(f)) {
      // Isocèle codé : le sommet principal se lit aux deux côtés codés.
      const S = sommetCode(f)!;
      const base = conn[0][0] === S ? (180 - conn[0][1]) / 2 : conn[0][1];
      r = qui === S ? 180 - 2 * base : base;
    } else return [...p, "figure : il manque des angles écrits"];
    repond(r);
    if (Math.abs(anglesParNom(f)[qui] - r) > 2) p.push("figure : l’angle « ? » ne mesure pas la réponse");
  } else if (lus.length === 2) repond(180 - lus[0] - lus[1]);
  else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_POSSIBLE_OU_NON
function corrigerPossibleNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const ls = longueursLues(t);
  let m: RegExpMatchArray | null;
  const tries = ls.map((l) => l.v).sort((a, b) => a - b);
  if ((m = t.match(/(\d+) \+ (\d+) = (\d+)/)) && ls.length === 1) {
    if (num(m[1]) + num(m[2]) !== num(m[3])) p.push("addition fausse dans l’énoncé");
    verdict(q, num(m[3]) > ls[0].v, p);
    return p;
  }
  if ((m = t.match(/(\d+) \+ (\d+) (?:et|…) (\d+)/))) {
    const [s, z] = [num(m[1]) + num(m[2]), num(m[3])];
    uneSeuleJuste(q, (c) => c === (s < z ? "<" : s > z ? ">" : "="), p);
  } else if (/doivent-ils faire plus|doit-il être plus court/.test(t)) verdict(q, true, p);
  else if (/doivent-ils faire moins|doit-il être plus long/.test(t)) verdict(q, false, p);
  else if (/entiers?\b/.test(t)) {
    if (ls.length !== 2) return ["deux longueurs attendues"];
    const [a, b] = ls.map((l) => l.v).sort((x, y) => y - x);
    verifierMesure(q, /au plus|plus grand/.test(t) ? a + b - 1 : a - b + 1, ls[0].u, p);
  } else if (/Quelles longueurs forment|vrai triangle|triangle possible\.$|peut-on fermer le triangle/.test(t) && (q.choices?.length ?? 0) > 2) uneSeuleJuste(q, (c) => existe(longueursLues(c).map((l) => l.v)), p);
  else if (/ne forment pas|intrus|ne peut pas fermer|reste-t-il ouvert|Quelle série est impossible/.test(t)) uneSeuleJuste(q, (c) => !existe(longueursLues(c).map((l) => l.v)), p);
  else if (/impossible/.test(t) && ls.length === 2) {
    const [a, b] = ls.map((l) => l.v);
    for (const c of q.choices ?? []) if (mesure(c)?.u !== ls[0].u) p.push(`proposition sans la bonne unité : ${c}`);
    uneSeuleJuste(q, (c) => !existe([a, b, mesure(c)?.v ?? 0]), p);
  } else if (ls.length === 2 && /troisième|fermer le triangle/.test(t)) {
    const [a, b] = ls.map((l) => l.v);
    for (const c of q.choices ?? []) if (mesure(c)?.u !== ls[0].u) p.push(`proposition sans la bonne unité : ${c}`);
    uneSeuleJuste(q, (c) => existe([a, b, mesure(c)?.v ?? 0]), p);
  } else if (ls.length === 2 && /[Pp]etits|autres/.test(t)) {
    // « Les 2 petits côtés font 8 cm, le grand 7 cm » : les deux nombres dans un ordre ou l'autre.
    const [petits, grand] = /^(?:Le g|G)rand/.test(t) ? [ls[1].v, ls[0].v] : [ls[0].v, ls[1].v];
    verdict(q, petits > grand, p);
  } else if (/[Pp]lus grand|plus long/.test(t) && ls.length === 3) uneSeuleJuste(q, (c) => mesure(c)?.v === tries[2], p);
  else if (/plus petits|plus courts/.test(t) && ls.length === 3 && q.format === "qcm") {
    uneSeuleJuste(
      q,
      (c) => {
        const v = longueursLues(c).map((l) => l.v).sort((a, b) => a - b);
        return v.length === 2 && v[0] === tries[0] && v[1] === tries[1];
      },
      p,
    );
  } else if (/plus petits|plus courts/.test(t) && ls.length === 3) verifierMesure(q, tries[0] + tries[1], ls[0].u, p);
  else if (ls.length === 3) {
    if (new Set(ls.map((l) => l.u)).size !== 1) p.push("unités différentes");
    plausibles(ls, p);
    verdict(q, existe(ls.map((l) => l.v)), p);
  } else return [...p, "question non reconnue"];
  return p;
}

// ----- TRIANGLE_PROPRIETE_DEFI
const VRAIS_PROPRIETE: Record<string, boolean> = {
  "Un triangle peut avoir 2 angles droits.": false,
  "Un triangle peut avoir un angle droit.": true,
  "Un triangle peut avoir 2 angles obtus.": false,
  "Un triangle peut avoir un angle obtus.": true,
  "Un triangle peut avoir 3 angles aigus.": true,
  "Les 3 angles d’un triangle font 180°.": true,
  "Les 3 angles d’un triangle font 360°.": false,
  "Un triangle équilatéral a 3 angles de 60°.": true,
  "Un triangle a toujours un angle droit.": false,
  "Un triangle a au moins 2 angles aigus.": true,
  "Un triangle peut avoir un angle droit et un angle obtus.": false,
  "Un triangle rectangle a 2 angles aigus.": true,
  "Un triangle obtusangle a 2 angles aigus.": true,
  "Un triangle isocèle a 2 angles égaux.": true,
  "Un triangle peut avoir un angle de 180°.": false,
  "Les 2 angles aigus d’un triangle rectangle font 90°.": true,
  "Un triangle de côtés 3 cm, 4 cm et 9 cm existe.": false,
  "Un triangle de côtés 5 cm, 6 cm et 7 cm existe.": true,
};
function corrigerProprieteNeuf(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = fig(q);
  const lus = anglesLus(t);
  const ls = longueursLues(t);
  let m: RegExpMatchArray | null;
  const somme = (c: string) => anglesLus(c).reduce((s, x) => s + x, 0);
  const finVF = t.match(/^(.*?) Vrai ou faux \?$/)?.[1];
  if (finVF && VRAIS_PROPRIETE[finVF] !== undefined) verite(q, VRAIS_PROPRIETE[finVF], p);
  else if ((m = t.match(/[Ii]socèle en ([A-Z]), \$\\widehat\{([A-Z])\}\$ = (\d+)°, donc \$\\widehat\{([A-Z])\}\$ = (\d+)°/))) {
    if (m[2] === m[1] || m[4] !== m[1]) return ["sommets illisibles"];
    verite(q, num(m[5]) === 180 - 2 * num(m[3]), p);
  } else if (finVF) return ["phrase vrai/faux inconnue"];
  else if ((m = t.match(/[Rr]ectangle (?:et )?isocèle en ([A-Z])/))) {
    const dem = t.match(/\\widehat\{([A-Z])\}/)?.[1];
    if (!dem || dem === m[1]) return ["angle demandé illisible"];
    verifierMesure(q, 45, "°", p);
    if (f && Math.abs(anglesParNom(f)[dem] - 45) > 2) p.push("figure : pas 45°");
  } else if ((m = t.match(/[Ii]socèle en ([A-Z]), \$\\widehat\{([A-Z])\}\$ = (\d+)°/))) {
    const [S, C, v] = [m[1], m[2], num(m[3])];
    const dem = (t.split(/(?<=[.?]) /).pop() ?? "").match(/\\widehat\{([A-Z])\}/)?.[1];
    if (!dem || dem === C) return ["angle demandé illisible"];
    const base = C === S ? (180 - v) / 2 : v;
    const r = dem === S ? 180 - 2 * base : base;
    if (r <= 0) p.push("angle impossible");
    verifierMesure(q, r, "°", p);
    if (f && Math.abs(anglesParNom(f)[dem] - r) > 2) p.push("figure : l’angle demandé n’a pas cette mesure");
  } else if (/obtus/.test(t) && /[Aa]u plus/.test(t)) uneSeuleJuste(q, (c) => c === "1", p);
  else if (/droits/.test(t) && /[Aa]u plus/.test(t)) uneSeuleJuste(q, (c) => c === "1", p);
  else if (/aigus/.test(t) && /[Aa]u moins/.test(t)) uneSeuleJuste(q, (c) => c === "2", p);
  else if (/aigus/.test(t) && /[Aa]u plus/.test(t)) uneSeuleJuste(q, (c) => c === "3", p);
  else if (/équilatéral/.test(t)) verifierMesure(q, 60, "°", p);
  else if ((m = t.match(/3 angles de (\d+)°|Trois angles de (\d+)°/))) verdict(q, 3 * num(m[1] ?? m[2]) === 180, p);
  else if (/reste-t-il/.test(t)) {
    if (lus.length !== 2) return ["deux angles attendus"];
    const s = lus[0] + lus[1];
    if (s < 180) return [...p, "il reste de la place : la réponse « rien » serait fausse"];
    uneSeuleJuste(q, (c) => /^rien/.test(c), p);
  } else if (ls.length === 3) {
    verdict(q, existe(ls.map((l) => l.v)), p);
  } else if (/Quels angles forment|triangle possible|Quel triangle existe/.test(t)) uneSeuleJuste(q, (c) => somme(c) === 180, p);
  else if (/n’existe pas|impossible/.test(t)) uneSeuleJuste(q, (c) => somme(c) !== 180, p);
  else if (/égaux mesurent|2 angles de|deux angles de/.test(t)) {
    if (lus.length !== 1) return ["un angle attendu"];
    verifierMesure(q, 180 - 2 * lus[0], "°", p);
  } else if (lus.length === 2) {
    const r = 180 - lus[0] - lus[1];
    if (r <= 0) p.push("angle impossible");
    verifierMesure(q, r, "°", p);
  } else if (lus.length === 3 || lus.length === 4) {
    const trois = lus.slice(0, 3);
    verdict(q, trois.reduce((s, x) => s + x, 0) === 180, p);
  } else return [...p, "question non reconnue"];
  return p;
}

/** ★3 : le métier et deux angles : on retrouve le troisième, on en déduit le type. */
function corrigerTypeAngleMetier(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const as = anglesLus(t);
  if (as.length !== 2) return [`deux angles attendus, lu : ${as.length}`];
  const trois = [as[0], as[1], 180 - as[0] - as[1]];
  if (trois[2] <= 0) p.push("angle impossible");
  if (/est-il rectangle \?|angle droit \?/.test(t)) verdict(q, Math.max(...trois) === 90, p);
  else uneSeuleJuste(q, (c) => c === natureAngles(trois), p);
  if (t.split(/\s+/).length > 25) p.push("plus de 25 mots à ★3");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  triangle_possible_ou_non_tpl_simple: corrigerPossible,
  triangle_possible_ou_non_tpl_1: corrigerPossible,
  triangle_possible_ou_non_tpl_2: corrigerTroisiemeCote,
  triangle_propriete_defi_tpl_angles_possibles: corrigerDefiAnglesPossibles,
  triangle_propriete_defi_tpl_deux_angles: corrigerDefiDeuxAngles,
  triangle_propriete_defi_tpl_isocele_angles: corrigerDefiIsoceleAngles,
  triangle_propriete_defi_tpl_10: corrigerDefiIsoceleBase,
  triangle_propriete_defi_tpl_11: corrigerDefiIsocelePerimetre,
  triangle_somme_angle_tpl_1: corrigerSommeConnaitre,
  triangle_somme_angle_tpl_2: corrigerSommeDeuxAutres,
  triangle_angle_manquant_tpl_1: corrigerAngleManquant,
  triangle_angle_manquant_tpl_2: corrigerAngleManquant,
  triangle_angle_manquant_canvas_tpl_1: corrigerAngleManquant,
  triangle_defi_tpl_reconnaissance: corrigerDefiReconnaissance,
  triangle_defi_tpl_ouverte: corrigerDefiRaisons,
  triangle_defi_qcm_tpl_codages: corrigerDefiCodages,
  triangle_defi_tpl_isocele_cote_manquant: corrigerIsoceleCoteManquant,
  triangle_type_angle_tpl_mesures: corrigerTypeAngle,
  triangle_type_angle_qcm_tpl_1: corrigerTypeAngle,
  triangle_type_angle_tpl_2: corrigerTypeAngle,
  triangle_type_cote_tpl_longueurs: corrigerTypeCoteLongueurs,
  triangle_type_cote_tpl_1: corrigerTypeCoteCodages,
  triangle_type_cote_qcm_tpl_isocele_en: corrigerIsoceleEn,
  triangle_type_cote_tpl_equilateral_perimetre: corrigerEquilateralPerimetre,
  triangle_type_cote_tpl_isocele_perimetre: corrigerIsocelePerimetre,
  triangle_nommer_tpl_1: corrigerNommer,
  triangle_nommer_tpl_2: corrigerNommer,
  triangle_sommet_cote_tpl_compter: corrigerSommetCote,
  triangle_sommet_cote_tpl_1: corrigerSommetCote,
  triangle_sommet_cote_qcm_tpl_oppose: corrigerSommetCote,
  // 03/11/2026 : les situations d'avant, passées à ★3.
  triangle_nommer_tpl_ctx3: corrigerNommer,
  triangle_sommet_cote_tpl_ctx3: corrigerSommetCote,
  triangle_type_cote_tpl_longueurs_ctx3: corrigerTypeCoteLongueurs,
  triangle_type_cote_tpl_codages_ctx3: corrigerTypeCoteCodages,
  triangle_type_angle_tpl_ctx3: corrigerTypeAngle,
  triangle_somme_angle_tpl_ctx3: corrigerSommeConnaitre,
  triangle_somme_angle_tpl_deux_autres_ctx3: corrigerSommeDeuxAutres,
  triangle_angle_manquant_tpl_ctx3: corrigerAngleManquant,
  triangle_propriete_defi_tpl_angles_possibles_ctx3: corrigerDefiAnglesPossibles,
  triangle_propriete_defi_tpl_deux_angles_ctx3: corrigerDefiDeuxAngles,
  triangle_defi_tpl_reconnaissance_ctx3: corrigerDefiReconnaissance,
  // 07/11/2026 : les gabarits à plusieurs façons de poser (★1-★2, et un ★3 de métiers).
  triangle_nommer_tpl_lire: corrigerNommerNeuf,
  triangle_nommer_tpl_lettre: corrigerNommerNeuf,
  triangle_nommer_tpl_oui_non: corrigerNommerNeuf,
  triangle_nommer_tpl_ecritures: corrigerNommerNeuf,
  triangle_nommer_tpl_intrus: corrigerNommerNeuf,
  triangle_nommer_tpl_par_cotes: corrigerNommerNeuf,
  triangle_nommer_tpl_sommets_nus: corrigerNommerNeuf,
  triangle_sommet_cote_tpl_lire: corrigerSommetNeuf,
  triangle_sommet_cote_tpl_mots: corrigerSommetNeuf,
  triangle_sommet_cote_tpl_oui_non: corrigerSommetNeuf,
  triangle_sommet_cote_tpl_opposes: corrigerSommetNeuf,
  triangle_sommet_cote_tpl_communs: corrigerSommetNeuf,
  triangle_sommet_cote_tpl_extremites: corrigerSommetNeuf,
  triangle_type_cote_tpl_lire: corrigerCoteNeuf,
  triangle_type_cote_tpl_mots: corrigerCoteNeuf,
  triangle_type_cote_tpl_egaux: corrigerCoteNeuf,
  triangle_type_cote_tpl_isocele_nu: corrigerCoteNeuf,
  triangle_type_cote_tpl_trios: corrigerCoteNeuf,
  triangle_type_cote_tpl_proprietes: corrigerCoteNeuf,
  triangle_type_angle_tpl_seul: corrigerAngleSeul,
  triangle_type_angle_tpl_figure_nue: corrigerAngleNeuf,
  triangle_type_angle_tpl_mots: corrigerAngleNeuf,
  triangle_type_angle_tpl_deux_nommes: corrigerAngleNeuf,
  triangle_type_angle_tpl_trios: corrigerAngleNeuf,
  triangle_type_angle_tpl_lire: corrigerAngleNeuf,
  triangle_type_angle_tpl_metiers: corrigerTypeAngleMetier,
  triangle_defi_tpl_lire_codes: corrigerDefiCodages,
  triangle_defi_tpl_codes_oui_non: corrigerDefiNeuf,
  triangle_defi_tpl_mots: corrigerDefiNeuf,
  triangle_defi_tpl_angles_nature: corrigerDefiNeuf,
  triangle_defi_tpl_egalites: corrigerDefiNeuf,
  triangle_defi_tpl_vrai_faux: corrigerDefiNeuf,
  triangle_somme_angle_tpl_addition: corrigerSommeNeuf,
  triangle_somme_angle_tpl_vrai_faux: corrigerSommeNeuf,
  triangle_somme_angle_tpl_trios: corrigerSommeNeuf,
  triangle_somme_angle_tpl_reste: corrigerSommeNeuf,
  triangle_somme_angle_tpl_ecart: corrigerSommeNeuf,
  triangle_somme_angle_tpl_egaux: corrigerSommeNeuf,
  triangle_angle_manquant_tpl_calcul: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_figure_nue: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_qcm_nu: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_nomme_nu: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_egaux: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_controle: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_lire: corrigerManquantNeuf,
  triangle_angle_manquant_tpl_rect_iso: corrigerAngleManquant,
  triangle_possible_ou_non_tpl_grand: corrigerPossibleNeuf,
  triangle_possible_ou_non_tpl_comparer: corrigerPossibleNeuf,
  triangle_possible_ou_non_tpl_conclure: corrigerPossibleNeuf,
  triangle_possible_ou_non_tpl_troisieme_nu: corrigerPossibleNeuf,
  triangle_possible_ou_non_tpl_series: corrigerPossibleNeuf,
  triangle_possible_ou_non_tpl_nomme: corrigerPossibleNeuf,
  triangle_propriete_defi_tpl_somme_nue: corrigerProprieteNeuf,
  triangle_propriete_defi_tpl_calcul_nu: corrigerProprieteNeuf,
  triangle_propriete_defi_tpl_vrai_faux: corrigerProprieteNeuf,
  triangle_propriete_defi_tpl_isocele_nu: corrigerProprieteNeuf,
  triangle_propriete_defi_tpl_au_plus: corrigerProprieteNeuf,
  triangle_propriete_defi_tpl_melange: corrigerProprieteNeuf,
};

// Outils partagés avec les autres correcteurs de géométrie.
export { egal, decimalesOk, uneSeuleJuste, fig, nomsFig, memesNoms };
