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
  if (/[Cc]ombien de (sommets|côtés|angles)/.test(t) || /a combien de/.test(t)) juste = (c) => c === "3";
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
  const ls = longueursLues(t);
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
  if (!QUESTION_PRECISE.test(t)) p.push("la question ne demande pas la nature la plus précise");
  const cn = cotesNommes(f);
  const lg = (k: string) => cn[k.split("").sort().join("")];
  const proches = (u: number, v: number) => Math.abs(u - v) / Math.max(u, v) < 0.02;
  let n: string;
  const eg3 = t.match(/On sait que ([A-Z]{2}) = ([A-Z]{2}) = ([A-Z]{2})\./);
  const eg2 = t.match(/On sait que ([A-Z]{2}) = ([A-Z]{2}), et que ([A-Z]{2}) est plus (long|court)\./);
  if (eg3) {
    n = "équilatéral";
    if (!proches(lg(eg3[1]), lg(eg3[2])) || !proches(lg(eg3[2]), lg(eg3[3]))) p.push("figure : les côtés annoncés égaux ne le sont pas");
  } else if (eg2) {
    n = "isocèle";
    const [u, v, w] = [lg(eg2[1]), lg(eg2[2]), lg(eg2[3])];
    if (!proches(u, v)) p.push("figure : les côtés annoncés égaux ne le sont pas");
    if (eg2[4] === "long" ? !(w > u * 1.03) : !(w < u * 0.97)) p.push(`figure : ${eg2[3]} n’est pas plus ${eg2[4]}`);
  } else if (/trois longueurs différentes/.test(t)) {
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
  for (const m of t.matchAll(/[Ll]’angle en ([A-Z]) mesure (\d+(?:,\d+)?)°/g)) {
    const k = (["A", "B", "C"] as const)[noms.indexOf(m[1])];
    if (!k) p.push(`sommet ${m[1]} absent de la figure`);
    else if (Math.abs(g[k] - num(m[2])) > 2) p.push(`figure : angle en ${m[1]} de ${g[k].toFixed(1)}°, ${m[2]}° dans le texte`);
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
function corrigerDefiReconnaissance(q: Q): string[] {
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
    const droit = /il a un angle droit/.test(t);
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
  const V = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/)?.slice(1, 4) ?? [];
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
  const connus: Record<string, number> = {};
  for (const m of t.matchAll(/[Ll]’angle en ([A-Z])(?: mesure| :) (\d+(?:,\d+)?)°/g)) connus[m[1]] = num(m[2]);
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
  if (new RegExp(`[Ll]’angle en ${r.demande}(?: mesure| :) \\d`).test(t)) p.push("l’angle demandé est déjà donné");
  if (q.format === "qcm") uneSeuleJuste(q, (c) => mesure(c)?.u === "°" && egal(mesure(c)!.v, rep), p);
  else verifierMesure(q, rep, "°", p);
  return p;
}
function corrigerSommeDeuxAutres(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const m = t.match(/L’angle en ([A-Z]) mesure (\d+)°/);
  if (!m) return ["angle connu illisible"];
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
  const droits = (t.match(/angle droit/g) ?? []).length;
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
};

// Outils partagés avec les autres correcteurs de géométrie.
export { egal, decimalesOk, uneSeuleJuste, fig, nomsFig, memesNoms };
