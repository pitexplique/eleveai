import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE parallelogrammes.bank.ts (notion parallelogramme, 09/10/2026).
// Ils relisent dans le TEXTE le nom du quadrilatère (« parallélogramme FGHE » :
// l'ordre des lettres dit quels côtés sont opposés), les longueurs (« FG = 6 cm »,
// « [FG] mesure 6 cm »), les angles (« l’angle en F », « l’angle de sommet F »,
// « l’angle EFG ») ; dans la FIGURE les lettres, les étiquettes et la FORME
// (côtés opposés parallèles et égaux, angle dessiné = angle écrit, rapport des
// côtés = rapport des étiquettes, angles droits codés = droits) ; puis ils
// refont le raisonnement : côté opposé, angle opposé ou consécutif, milieu des
// diagonales, cas particulier, réciproque. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
const NB = "(\\d+(?:,\\d+)?)";
const U = "(cm|m)";
const K4 = ["A", "B", "C", "D"] as const;
const COTES4 = ["AB", "BC", "CD", "DA"] as const;

/** Le nom du quadrilatère : « parallélogramme FGHE », « losange KLMN », « EFGH est… ». */
export function nomQuad(t: string): string | null {
  const m =
    t.match(/(?:parallélogramme|quadrilatère|losange|rectangle|carré) ([A-Z]{4})(?![A-Za-z])/) ??
    t.match(/(?:^|\. )([A-Z]{4}) est un/);
  return m ? m[1] : null;
}
/** [XY] avec les lettres dans l'ordre alphabétique. */
const seg = (x: string, y: string) => `[${[x, y].sort().join("")}]`;
const memeSeg = (a: string, b: string) => a.length === 2 && b.length === 2 && [...a].sort().join("") === [...b].sort().join("");

/** La longueur de [XY] écrite dans le texte (« XY = 6 cm », « [XY] mesure 6 cm », dans les deux sens). */
export function longueurTexte(t: string, x: string, y: string): { v: number; u: string } | null {
  for (const s of [x + y, y + x]) {
    const m =
      t.match(new RegExp(`(?<![A-Z])${s} = ${NB} ${U}(?![a-z])`)) ??
      t.match(new RegExp(`\\[${s}\\] mesure ${NB} ${U}(?![a-z])`));
    if (m) return { v: num(m[1]), u: m[2] };
  }
  return null;
}

/** L'angle en L écrit dans le texte (« l’angle en L mesure 70° », « l’angle de sommet L », « l’angle KLM », « un angle de 70° en L »). */
export function angleTexte(t: string, nom: string, L: string): number | null {
  const i = nom.indexOf(L);
  const v1 = nom[(i + 3) % 4];
  const v2 = nom[(i + 1) % 4];
  const m =
    t.match(new RegExp(`angle en ${L} (?:mesure|vaut) ${NB}°`)) ??
    t.match(new RegExp(`angle de sommet ${L} (?:mesure|vaut) ${NB}°`)) ??
    t.match(new RegExp(`angle (?:${v1}${L}${v2}|${v2}${L}${v1}) (?:mesure|vaut) ${NB}°`)) ??
    t.match(new RegExp(`angle de ${NB}° en ${L}(?![A-Za-z])`));
  return m ? num(m[1]) : null;
}

/** La dernière phrase (la question). */
const question = (t: string) => {
  const morceaux = t.split(/(?<=[.?!:]) /);
  return morceaux[morceaux.length - 1];
};

/** La valeur attendue et son unité. */
function reponse(q: Q, juste: number, unite: string, quoi: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), juste)) p.push(`attendu « ${q.expected[0]} », ${quoi} : ${juste}`);
  else if (m[2].trim() !== unite) p.push(`unité de la réponse « ${m[2]} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/* ─── LA FIGURE ─────────────────────────────────────────────────────────── */

type Pt = { x: number; y: number };
const vec = (a: Pt, b: Pt) => ({ x: b.x - a.x, y: b.y - a.y });
const lgr = (a: Pt, b: Pt) => Math.hypot(b.x - a.x, b.y - a.y);
function angleAu(P: Record<string, Pt>, k: number): number {
  const s = P[K4[k]], u = P[K4[(k + 3) % 4]], w = P[K4[(k + 1) % 4]];
  const a = vec(s, u), b = vec(s, w);
  return (Math.acos((a.x * b.x + a.y * b.y) / Math.hypot(a.x, a.y) / Math.hypot(b.x, b.y)) * 180) / Math.PI;
}
const etiq = (s: unknown) => {
  const m = String(s ?? "").match(/^(\d+(?:,\d+)?)/);
  return m ? num(m[1]) : null;
};
/** La figure est-elle un parallélogramme (AB = DC en vecteurs) ? */
export function figureEstPara(c: any): boolean {
  const P = c.points;
  const ab = vec(P.A, P.B), dc = vec(P.D, P.C);
  return Math.hypot(ab.x - dc.x, ab.y - dc.y) < 1;
}

/**
 * La figure relue : lettres = nom du texte dans l'ordre ; codage des
 * parallèles cohérent avec le dessin ; angles droits codés droits ; côtés
 * codés égaux égaux ; étiquettes d'angles et de côtés = mesures du texte ET du
 * dessin ; points dans le cadre.
 */
export function verifierFigure(q: Q, nom: string | null): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind !== "quadrilatere") return ["canvas qui n'est pas un quadrilatère"];
  const p: string[] = [];
  const lettres = K4.map((k) => c.labels?.[k] ?? k).join("");
  if (nom && lettres !== nom) p.push(`la figure est nommée ${lettres}, le texte dit ${nom}`);
  const P = c.points;
  const para = figureEstPara(c);
  const paires = c.marks?.parallelSides?.length ?? 0;
  if (paires === 2 && !para) p.push("deux paires de côtés codées parallèles, mais la figure n'est pas un parallélogramme");
  if (paires === 1) {
    if (para) p.push("une seule paire codée parallèle, mais la figure est un parallélogramme");
    const ab = vec(P.A, P.B), dc = vec(P.D, P.C);
    if (Math.abs(ab.x * dc.y - ab.y * dc.x) > 1) p.push("la paire codée parallèle ne l'est pas sur le dessin");
  }
  for (const k of c.marks?.rightAnglesAt ?? []) {
    const i = K4.indexOf(k);
    if (Math.abs(angleAu(P, i) - 90) > 1) p.push(`angle droit codé en ${k} mais dessiné à ${angleAu(P, i).toFixed(0)}°`);
  }
  for (const [s1, s2] of c.marks?.equalSides ?? []) {
    const l1 = lgr(P[s1[0]], P[s1[1]]), l2 = lgr(P[s2[0]], P[s2[1]]);
    if (Math.abs(l1 / l2 - 1) > 0.02) p.push(`côtés ${s1} et ${s2} codés égaux mais dessinés différents`);
  }
  for (let i = 0; i < 4; i++) {
    const v = etiq(c.angleLabels?.[K4[i]]);
    if (v == null) continue;
    if (Math.abs(angleAu(P, i) - v) > 1.5) p.push(`l'angle en ${lettres[i]} est étiqueté ${v}° mais dessiné à ${angleAu(P, i).toFixed(0)}°`);
    if (nom) {
      const t = angleTexte(q.text, nom, lettres[i]);
      if (t !== v) p.push(`l'angle en ${lettres[i]} vaut ${t}° dans le texte, ${v}° sur la figure`);
    }
  }
  const cotes = COTES4.map((s, i) => ({ s, i, v: etiq(c.sideLabels?.[s]) })).filter((x) => x.v != null);
  for (const { s, i, v } of cotes) {
    const t = longueurTexte(q.text, lettres[i], lettres[(i + 1) % 4]);
    if (!t || t.v !== v) p.push(`le côté ${lettres[i]}${lettres[(i + 1) % 4]} vaut ${t?.v} dans le texte, ${v} sur la figure (${s})`);
  }
  for (let a = 0; a < cotes.length; a++)
    for (let b = a + 1; b < cotes.length; b++) {
      const r1 = cotes[a].v! / cotes[b].v!;
      const s1 = cotes[a].s, s2 = cotes[b].s;
      const r2 = lgr(P[s1[0]], P[s1[1]]) / lgr(P[s2[0]], P[s2[1]]);
      if (Math.abs(r1 / r2 - 1) > 0.02) p.push(`les côtés ${s1} et ${s2} n'ont pas sur la figure le rapport de leurs étiquettes`);
    }
  for (const k of K4) if (P[k].x < 5 || P[k].x > 335 || P[k].y < 5 || P[k].y > 245) p.push(`le point ${k} sort du cadre`);
  return p;
}

/* ─── PARA_RECONNAITRE ──────────────────────────────────────────────────── */

function corrFigureEstPara(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["quadrilatère sans nom"];
  const c = q.canvas as any;
  if (!c) return ["la question porte sur la figure, mais il n'y en a pas"];
  const para = figureEstPara(c) && (c.marks?.parallelSides?.length ?? 0) === 2;
  const juste = (x: string) => x.startsWith(para ? "oui" : "non");
  return [
    ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », la figure ${para ? "est" : "n'est pas"} un parallélogramme`]),
    ...qcmUnique(q, juste),
    ...verifierFigure(q, nom),
  ];
}

function corrVocabulaire(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["parallélogramme sans nom"];
  const qu = question(q.text);
  let juste: (c: string) => boolean;
  let attendu: string;
  const sommet = qu.match(/sommet (?:opposé au|fait face au|n’est pas voisin du) sommet ([A-Z])/);
  const cote = qu.match(/\[([A-Z])([A-Z])\]/);
  if (sommet) {
    const i = nom.indexOf(sommet[1]);
    if (i < 0) return [`le sommet ${sommet[1]} n'est pas dans ${nom}`];
    attendu = nom[(i + 2) % 4];
    juste = (c) => c === attendu;
  } else if (/diagonales/.test(qu)) {
    const d1 = seg(nom[0], nom[2]), d2 = seg(nom[1], nom[3]);
    attendu = `${d1} et ${d2}`;
    juste = (c) => {
      const m = c.match(/^(\[[A-Z]{2}\]) et (\[[A-Z]{2}\])$/);
      return !!m && new Set([m[1], m[2]]).size === 2 && [m[1], m[2]].every((x) => x === d1 || x === d2);
    };
  } else if (cote) {
    const i = nom.indexOf(cote[1]), j = nom.indexOf(cote[2]);
    if (i < 0 || j < 0 || ((j - i + 4) % 4 !== 1 && (i - j + 4) % 4 !== 1)) return [`${cote[0]} n'est pas un côté de ${nom}`];
    const k = Math.min(i, j) === 0 && Math.max(i, j) === 3 ? 3 : Math.min(i, j);
    attendu = seg(nom[(k + 2) % 4], nom[(k + 3) % 4]);
    juste = (c) => c === attendu;
  } else return ["question non reconnue"];
  return [
    ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », il faut ${attendu}`]),
    ...qcmUnique(q, juste),
    ...verifierFigure(q, nom),
  ];
}

/** Côtés opposés de nom ? (deux segments sans lettre commune, tous deux des côtés). */
function opposes(nom: string, a: string, b: string): boolean {
  const cote = (s: string) => {
    const i = nom.indexOf(s[0]), j = nom.indexOf(s[1]);
    return i >= 0 && j >= 0 && ((j - i + 4) % 4 === 1 || (i - j + 4) % 4 === 1);
  };
  return cote(a) && cote(b) && ![...a].some((l) => b.includes(l));
}

function corrSuffit(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["quadrilatère sans nom"];
  const info = q.text.match(/on sait seulement ceci : (.*)\. Peut-on/)?.[1];
  if (!info) return ["information non lue"];
  const par = [...info.matchAll(/\(([A-Z]{2})\) \/\/ \(([A-Z]{2})\)/g)].map((m) => [m[1], m[2]]);
  for (const [a, b] of par) if (!opposes(nom, a, b)) return [`(${a}) et (${b}) ne sont pas deux côtés opposés de ${nom}`];
  let oui: boolean;
  if (par.length === 2) oui = !memeSeg(par[0][0], par[1][0]) && !memeSeg(par[0][0], par[1][1]);
  else if (par.length === 1) {
    const eg = info.match(/et ([A-Z]{2}) = ([A-Z]{2})/);
    oui = !!eg && [eg[1], eg[2]].every((x) => par[0].some((y) => memeSeg(x, y)));
  } else if (/ont le même milieu/.test(info)) oui = true;
  else if (/quatre côtés ont la même longueur/.test(info)) oui = true;
  else if (/diagonales .* (ont la même longueur|sont perpendiculaires)/.test(info)) oui = false;
  else return ["information non reconnue"];
  const juste = (c: string) => c.startsWith(oui ? "oui" : "non");
  return [...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} »`]), ...qcmUnique(q, juste)];
}

/* ─── PARA_COTES_ANGLES ─────────────────────────────────────────────────── */

/** Le sommet dont la question demande l'angle (« l’angle en G », « de sommet G », « l’angle FGH »). */
function sommetDemande(qu: string, nom: string): string | null {
  const m = qu.match(/angle (?:en|de sommet) ([A-Z])(?![A-Za-z])/);
  if (m) return m[1];
  const t = qu.match(/angle ([A-Z])([A-Z])([A-Z])(?![A-Za-z])/);
  if (!t) return null;
  const i = nom.indexOf(t[2]);
  const v = [nom[(i + 1) % 4], nom[(i + 3) % 4]];
  return i >= 0 && v.includes(t[1]) && v.includes(t[3]) && t[1] !== t[3] ? t[2] : null;
}
/** Les angles connus du texte : sommet → mesure. */
function anglesConnus(t: string, nom: string): Record<string, number> {
  const r: Record<string, number> = {};
  for (const L of nom) {
    const v = angleTexte(t, nom, L);
    if (v != null) r[L] = v;
  }
  return r;
}
/** La mesure de l'angle en L déduite d'un angle connu (opposé : égal ; consécutif : 180 − a). */
function angleDeduit(nom: string, connus: Record<string, number>, L: string): number | null {
  for (const [S, a] of Object.entries(connus)) {
    const d = (nom.indexOf(L) - nom.indexOf(S) + 4) % 4;
    if (d === 0 || d === 2) return a;
    return 180 - a;
  }
  return null;
}

function corrAngle(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["parallélogramme sans nom"];
  const connus = anglesConnus(q.text, nom);
  if (Object.keys(connus).length !== 1) return [`un angle connu attendu, lus : ${JSON.stringify(connus)}`];
  const L = sommetDemande(question(q.text), nom);
  if (!L) return ["angle demandé non lu"];
  if (L in connus) return ["l'angle demandé est déjà donné"];
  const v = angleDeduit(nom, connus, L)!;
  const a = Object.values(connus)[0];
  const p = [...reponse(q, v, /°/.test(String(q.expected[0])) ? "°" : "", `l’angle en ${L}`)];
  if (a <= 0 || a >= 180 || a === 90) p.push(`angle donné peu plausible : ${a}°`);
  return [...p, ...verifierFigure(q, nom)];
}

/** Toutes les longueurs de côtés du texte, rangées par côté (0 : nom[0]nom[1], …). */
function cotesConnus(t: string, nom: string): Record<number, { v: number; u: string }> {
  const r: Record<number, { v: number; u: string }> = {};
  for (let i = 0; i < 4; i++) {
    const l = longueurTexte(t, nom[i], nom[(i + 1) % 4]);
    if (l) r[i] = l;
  }
  return r;
}
/** Le côté demandé par la question (un nom de deux lettres) : son rang, ou null. */
function coteDemande(qu: string, nom: string): number | null {
  const m = qu.match(/(?<![A-Za-z])\[?([A-Z])([A-Z])\]?(?![A-Za-z])/);
  if (!m) return null;
  for (let i = 0; i < 4; i++) if (memeSeg(m[1] + m[2], nom[i] + nom[(i + 1) % 4])) return i;
  return null;
}

function corrCote(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["parallélogramme sans nom"];
  const connus = cotesConnus(q.text, nom);
  const i = coteDemande(question(q.text), nom);
  if (i == null) return ["côté demandé non lu"];
  if (i in connus) return ["le côté demandé est déjà donné"];
  const face = connus[(i + 2) % 4];
  if (!face) return ["le côté opposé au côté demandé n'est pas donné"];
  const ks = Object.values(connus);
  const p: string[] = [];
  if (ks.length === 2 && ks[0].v === ks[1].v) p.push("les deux côtés donnés sont égaux : le piège ne se voit pas");
  return [...p, ...reponse(q, face.v, face.u, `le côté opposé`), ...verifierFigure(q, nom)];
}

function corrPerimetre(q: Q): string[] {
  const nom = nomQuad(q.text);
  if (!nom) return ["parallélogramme sans nom"];
  const connus = cotesConnus(q.text, nom);
  const idx = Object.keys(connus).map(Number);
  if (idx.length !== 2 || (idx[1] - idx[0]) % 2 === 0) return ["deux côtés consécutifs attendus"];
  const [a, b] = idx.map((i) => connus[i]);
  if (a.u !== b.u) return ["unités différentes"];
  if (!/périmètre/.test(question(q.text))) return ["la question ne porte pas sur le périmètre"];
  return [...reponse(q, Math.round(2 * (a.v + b.v) * 100) / 100, a.u, "le périmètre"), ...verifierFigure(q, nom)];
}

/* ─── PARA_DIAGONALES (13/10/2026) ──────────────────────────────────────── */

/** Le centre : « se coupent en I », « a pour centre K ». */
const centreTexte = (t: string) => t.match(/se coupent en ([A-Z])(?![A-Za-z])/)?.[1] ?? t.match(/a pour centre ([A-Z])(?![A-Za-z])/)?.[1] ?? null;

/** La figure : ses diagonales dessinées dans le rapport des diagonales du texte (et le côté donné). */
function figureDesDiagonales(q: Q, nom: string, demi: Record<string, number>, cote: { i: number; v: number } | null): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  const p: string[] = [];
  if (!c.display?.showDiagonals) p.push("les diagonales ne sont pas dessinées");
  if (!figureEstPara(c)) p.push("la figure n'est pas un parallélogramme");
  const P = c.points;
  const ac = lgr(P.A, P.C), bd = lgr(P.B, P.D);
  if (demi[nom[0]] != null && demi[nom[1]] != null && Math.abs(ac / bd / (demi[nom[0]] / demi[nom[1]]) - 1) > 0.03)
    p.push(`diagonales dessinées dans le rapport ${(ac / bd).toFixed(2)}, le texte dit ${(demi[nom[0]] / demi[nom[1]]).toFixed(2)}`);
  if (cote && demi[nom[0]] != null) {
    const s = COTES4[cote.i];
    const l = lgr(P[s[0]], P[s[1]]);
    if (Math.abs(l / ac / (cote.v / (2 * demi[nom[0]])) - 1) > 0.03) p.push(`le côté ${s} n'est pas dessiné à sa mesure`);
  }
  return p;
}

function corrDiagonales(q: Q): string[] {
  const t = q.text;
  const nom = nomQuad(t);
  if (!nom) return ["parallélogramme sans nom"];
  const I = centreTexte(t);
  if (!I || nom.includes(I)) return ["centre introuvable ou confondu avec un sommet"];
  const opp = (V: string) => nom[(nom.indexOf(V) + 2) % 4];
  const qu = question(t);
  const p: string[] = [];
  // symétrique d'un point, d'un côté ; milieu d'une diagonale
  let m = qu.match(/symétrique du point ([A-Z])|sur quel point arrive ([A-Z])/);
  if (m) {
    const juste = opp(m[1] ?? m[2]);
    return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut ${juste}`]), ...qcmUnique(q, (c) => c === juste), ...verifierFigure(q, nom)];
  }
  m = qu.match(/(?:symétrique du côté|arrive le côté) \[([A-Z])([A-Z])\]/);
  if (m) {
    const juste = seg(opp(m[1]), opp(m[2]));
    return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut ${juste}`]), ...qcmUnique(q, (c) => c === juste), ...verifierFigure(q, nom)];
  }
  m = qu.match(/milieu (?:du segment |de )?\[([A-Z])([A-Z])\]/);
  if (m) {
    if (opp(m[1]) !== m[2]) return [`[${m[1]}${m[2]}] n'est pas une diagonale de ${nom}`];
    return [...(q.expected[0] === I ? [] : [`attendu « ${q.expected[0]} », il faut ${I}`]), ...qcmUnique(q, (c) => c === I), ...verifierFigure(q, nom)];
  }
  // les longueurs connues : demi-diagonales (du sommet au centre)
  const demi: Record<string, number> = {};
  const unites = new Set<string>();
  const poser = (V: string, v: number, quoi: string) => {
    for (const W of [V, opp(V)]) {
      if (demi[W] != null && !egal(demi[W], v)) p.push(`deux longueurs différentes pour ${W}${I} (${quoi})`);
      demi[W] = v;
    }
  };
  for (const V of nom) {
    const l = longueurTexte(t, V, I);
    if (l) {
      poser(V, l.v, `${V}${I}`);
      unites.add(l.u);
    }
  }
  for (const V of nom.slice(0, 2)) {
    const l = longueurTexte(t, V, opp(V));
    if (l) {
      poser(V, l.v / 2, `diagonale [${V}${opp(V)}]`);
      unites.add(l.u);
    }
  }
  let cote: { i: number; v: number } | null = null;
  for (let i = 0; i < 4; i++) {
    const l = longueurTexte(t, nom[i], nom[(i + 1) % 4]);
    if (l) {
      cote = { i, v: l.v };
      unites.add(l.u);
    }
  }
  if (unites.size !== 1) return [`unités du texte : ${[...unites].join(", ") || "aucune"}`];
  const u = [...unites][0];
  let juste: number;
  let quoi: string;
  const tri = qu.match(/périmètre du triangle ([A-Z]{3})/);
  if (tri) {
    const L = [...tri[1]].filter((x) => x !== I);
    if (L.length !== 2 || !cote) return ["triangle illisible"];
    const [V, W] = L;
    const i = nom.indexOf(V), j = nom.indexOf(W);
    if (!((cote.i === i && (i + 1) % 4 === j) || (cote.i === j && (j + 1) % 4 === i))) return [`le côté [${V}${W}] n'est pas celui donné`];
    const [a, b, c] = [demi[V], demi[W], cote.v];
    if (a == null || b == null) return ["demi-diagonale inconnue"];
    if (!(c < a + b && a < b + c && b < a + c)) p.push(`triangle impossible : ${a}, ${b}, ${c}`);
    juste = a + b + c;
    quoi = `le périmètre ${a} + ${b} + ${c}`;
  } else if (/somme des longueurs des deux diagonales|bout à bout/.test(qu)) {
    if (demi[nom[0]] == null || demi[nom[1]] == null) return ["une diagonale inconnue"];
    juste = 2 * (demi[nom[0]] + demi[nom[1]]);
    quoi = "la somme des diagonales";
  } else if (/écart|plus (longue|courte)/.test(qu)) {
    if (demi[nom[0]] == null || demi[nom[1]] == null) return ["une diagonale inconnue"];
    juste = Math.abs(2 * demi[nom[0]] - 2 * demi[nom[1]]);
    quoi = "l'écart des diagonales";
    const mm = qu.match(/diagonale \[([A-Z])([A-Z])\] est-elle plus (longue|courte)/);
    if (mm && (demi[mm[1]] > demi[nom[(nom.indexOf(mm[1]) + 1) % 4]]) !== (mm[3] === "longue")) p.push(`« plus ${mm[3]} » est faux`);
  } else {
    const s = qu.match(/(?<![A-Za-z])\[?([A-Z])([A-Z])\]?(?![A-Za-z])/);
    if (!s) return ["longueur demandée non lue"];
    const [, a, b] = s;
    if (a === I || b === I) {
      const V = a === I ? b : a;
      if (longueurTexte(t, V, I)) return ["la longueur demandée est déjà donnée"];
      juste = demi[V];
    } else if (opp(a) === b) {
      if (longueurTexte(t, a, b)) return ["la diagonale demandée est déjà donnée"];
      juste = 2 * demi[a];
    } else return [`[${a}${b}] n'est ni une diagonale ni une demi-diagonale`];
    if (juste == null || Number.isNaN(juste)) return ["la longueur demandée ne se déduit pas du texte"];
    quoi = `[${a}${b}]`;
  }
  return [...p, ...reponse(q, Math.round(juste * 100) / 100, u, quoi), ...figureDesDiagonales(q, nom, demi, cote), ...verifierFigure(q, nom)];
}

/* ─── PARA_PARTICULIERS (13/10/2026) ────────────────────────────────────── */

/** Ce que chaque figure EST (inclusions) : un carré est un losange, un rectangle, un parallélogramme. */
const EST: Record<string, string[]> = {
  carré: ["carré", "losange", "rectangle", "parallélogramme"],
  losange: ["losange", "parallélogramme"],
  rectangle: ["rectangle", "parallélogramme"],
  parallélogramme: ["parallélogramme"],
};
/** Les choix oui / non ou vrai / faux, et la bonne réponse attendue. */
function ouiNon(q: Q, vrai: boolean, pourquoi: string): string[] {
  const vf = /Vrai ou faux/.test(q.text);
  const [o, n] = vf ? ["vrai", "faux"] : ["oui", "non"];
  const p: string[] = [];
  if (!(q.choices?.length === 2 && q.choices.includes(o) && q.choices.includes(n))) p.push(`propositions ${q.choices?.join(" | ")} au lieu de ${o} / ${n}`);
  if (q.expected[0] !== (vrai ? o : n)) p.push(`attendu « ${q.expected[0]} » : ${pourquoi}`);
  return p;
}

function corrParticuliers(q: Q): string[] {
  const t = q.text;
  const qu = question(t);
  const incl = t.match(/(?:[Tt]out|Un) (carré|losange|rectangle|parallélogramme) (?:est-il toujours|est toujours|est) un (carré|losange|rectangle|parallélogramme)(?![a-zé])/);
  if (incl) return ouiNon(q, EST[incl[1]].includes(incl[2]), `un ${incl[1]} ${EST[incl[1]].includes(incl[2]) ? "est" : "n'est pas"} toujours un ${incl[2]}`);
  const nom = nomQuad(t);
  if (!nom) return ["quadrilatère sans nom"];
  const cotesEgaux = (a: string, b: string) => {
    // deux côtés consécutifs
    const i = nom.indexOf(a[0]), j = nom.indexOf(a[1]);
    const ok = (x: string) => {
      const u = nom.indexOf(x[0]), v = nom.indexOf(x[1]);
      return u >= 0 && v >= 0 && ((u - v + 4) % 4 === 1 || (v - u + 4) % 4 === 1);
    };
    return i >= 0 && j >= 0 && ok(a) && ok(b) && [...a].some((l) => b.includes(l)) && !memeSeg(a, b);
  };
  if (/(?:[Ee]st-ce un|il un) carré/.test(qu)) {
    if (/est un losange|un losange/.test(t)) {
      const a = t.match(/mesure (\d+)°/);
      if (!a) return ["angle du losange introuvable"];
      return ouiNon(q, num(a[1]) === 90, `losange d'angle ${a[1]}°`);
    }
    const L = [...t.matchAll(/(?<![A-Z])([A-Z]{2}) = (\d+(?:,\d+)?) cm/g)];
    if (L.length !== 2 || !cotesEgaux(L[0][1], L[1][1])) return ["deux côtés consécutifs du rectangle attendus"];
    return ouiNon(q, num(L[0][2]) === num(L[1][2]), `rectangle de côtés ${L[0][2]} et ${L[1][2]}`);
  }
  if (/nature|particulier/.test(qu)) {
    if (!/est un parallélogramme|le parallélogramme/.test(t)) return ["le texte ne dit pas que c'est un parallélogramme"];
    let losange = /perpendiculaires/.test(t);
    let rect = /est droit|mesure 90°|ont la même longueur/.test(t);
    const eg = t.match(/(?<![A-Z])([A-Z]{2}) = ([A-Z]{2})(?![A-Z])/);
    if (eg) {
      if (!cotesEgaux(eg[1], eg[2])) return [`${eg[1]} et ${eg[2]} ne sont pas deux côtés consécutifs`];
      losange = true;
    }
    const L = [...t.matchAll(/(?<![A-Z])([A-Z]{2}) = (\d+(?:,\d+)?) cm/g)];
    if (L.length === 2 && num(L[0][2]) === num(L[1][2])) {
      const [a, b] = [L[0][1], L[1][1]];
      const diag = (x: string) => (nom.indexOf(x[0]) - nom.indexOf(x[1]) + 4) % 2 === 0;
      if (diag(a) && diag(b) && !memeSeg(a, b)) rect = true;
      else if (cotesEgaux(a, b)) losange = true;
      else return ["mesures illisibles"];
    }
    const juste = losange && rect ? "un carré" : losange ? "un losange" : rect ? "un rectangle" : null;
    if (!juste) return ["indice non reconnu"];
    return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », c'est ${juste}`]), ...qcmUnique(q, (c) => c === juste)];
  }
  // les mesures
  const type = t.match(/est un (losange|rectangle|carré)/)?.[1];
  if (!type) return ["figure non nommée"];
  const I = centreTexte(t);
  const sm = qu.match(/(?<![A-Za-z])\[?([A-Z])([A-Z])\]?(?![A-Za-z])/);
  if (type === "losange") {
    const cote = t.match(/losange de côté (\d+(?:,\d+)?) cm/) ?? t.match(/(?<![A-Z])[A-Z]{2} = (\d+(?:,\d+)?) cm/);
    if (/angle/.test(qu)) {
      const a = qu.match(/angle ([A-Z])([A-Z])([A-Z])/);
      if (!I || !a || a[2] !== I || !cotesEgaux(a[1] + a[3], a[1] + a[3]) && Math.abs(nom.indexOf(a[1]) - nom.indexOf(a[3])) % 2 !== 1) return ["angle des diagonales illisible"];
      return reponse(q, 90, "°", "l'angle des diagonales d'un losange");
    }
    if (!cote) return ["côté du losange introuvable"];
    if (/périmètre/.test(qu)) return reponse(q, 4 * num(cote[1]), "cm", "le périmètre du losange");
    if (!sm || !cotesEgaux(sm[1] + sm[2], nom[0] + nom[1]) && !cotesEgaux(sm[1] + sm[2], nom[1] + nom[2])) return ["côté demandé non lu"];
    return reponse(q, num(cote[1]), "cm", "un côté du losange");
  }
  if (type === "carré") {
    const per = t.match(/périmètre (\d+) cm/);
    if (!per) return ["périmètre introuvable"];
    return reponse(q, num(per[1]) / 4, "cm", "le côté du carré");
  }
  // rectangle : diagonales de même longueur, qui se coupent en leur milieu
  const d = t.match(/(?:diagonale \[([A-Z]{2})\] mesure|(?<![A-Z])([A-Z]{2}) =) (\d+(?:,\d+)?) cm/);
  if (!d || !sm) return ["diagonale introuvable"];
  const D = d[1] ?? d[2];
  if ((nom.indexOf(D[0]) - nom.indexOf(D[1]) + 4) % 2 !== 0) return [`${D} n'est pas une diagonale`];
  const demande = sm[1] + sm[2];
  if (I && demande.includes(I)) return reponse(q, num(d[3]) / 2, "cm", "une demi-diagonale du rectangle");
  if ((nom.indexOf(demande[0]) - nom.indexOf(demande[1]) + 4) % 2 !== 0 || memeSeg(demande, D)) return ["la longueur demandée n'est pas l'autre diagonale"];
  return reponse(q, num(d[3]), "cm", "l'autre diagonale du rectangle");
}

/* ─── PARA_CONSTRUIRE (13/10/2026) ──────────────────────────────────────── */

const OUTILS: [RegExp, string][] = [
  [/ouvrir un angle|tracer un angle de/, "le rapporteur"],
  [/arc de cercle/, "le compas"],
  [/tracer le segment .* de \d/, "la règle graduée"],
  [/angle .* est droit|angle droit/, "l’équerre"],
];

function corrConstruire(q: Q): string[] {
  const t = q.text;
  const nom = nomQuad(t);
  if (!nom) return ["parallélogramme sans nom"];
  const qu = question(t);
  const connus = cotesConnus(t, nom);
  const longueur = (i: number) => connus[i] ?? connus[(i + 2) % 4];
  /** La distance entre deux sommets voisins, par le côté opposé si besoin. */
  const dist = (x: string, y: string) => {
    for (let i = 0; i < 4; i++) if (memeSeg(x + y, nom[i] + nom[(i + 1) % 4])) return longueur(i)?.v ?? null;
    return null;
  };
  // instrument
  const outil = qu.match(/Quel instrument faut-il pour (.+) \?/);
  if (outil) {
    const o = OUTILS.find(([re]) => re.test(outil[1]));
    if (!o) return ["étape non reconnue"];
    return [...(q.expected[0] === o[1] ? [] : [`attendu « ${q.expected[0]} », il faut ${o[1]}`]), ...qcmUnique(q, (c) => c === o[1])];
  }
  // symétrique par le centre
  const sym = t.match(/milieu ([A-Z]) de \[([A-Z])([A-Z])\]/);
  if (sym && /symétrique/.test(qu)) {
    const [, , x, y] = sym;
    if (nom[(nom.indexOf(x) + 2) % 4] !== y) return [`[${x}${y}] n'est pas une diagonale`];
    const M = qu.match(/([A-Z]) est alors le symétrique|point ([A-Z]) est-il le symétrique|De quel point ([A-Z]) est-il/);
    const m = M?.[1] ?? M?.[2] ?? M?.[3];
    if (!m) return ["point cherché non lu"];
    const juste = nom[(nom.indexOf(m) + 2) % 4];
    return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut ${juste}`]), ...qcmUnique(q, (c) => c === juste)];
  }
  // le quatrième sommet : le point non tracé
  const traces = t.match(/([A-Z]), ([A-Z]) et ([A-Z]) (?:sont tracés|placés|sont placés)/);
  const M = traces ? [...nom].find((x) => !traces.slice(1).includes(x)) : null;
  if (/[Oo]ù (?:se trouve|faut-il placer)/.test(qu)) {
    if (!M) return ["sommet à placer non lu"];
    const lu = (c: string) => {
      const m = c.match(/^à (\d+(?:,\d+)?) cm de ([A-Z]) et à (\d+(?:,\d+)?) cm de ([A-Z])$/);
      return m && [m[2], m[4]].every((v) => dist(M, v) != null) && egal(num(m[1]), dist(M, m[2])!) && egal(num(m[3]), dist(M, m[4])!) && m[2] !== m[4];
    };
    return [...(lu(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} » : faux`]), ...qcmUnique(q, (c) => !!lu(c))];
  }
  const rayon = qu.match(/arc de cercle de centre ([A-Z])/);
  if (rayon) {
    if (!M) return ["sommet à placer non lu"];
    const d = dist(M, rayon[1]);
    if (d == null) return [`${M} et ${rayon[1]} ne sont pas voisins`];
    return reponse(q, d, "cm", `${M}${rayon[1]}`);
  }
  // les mesures à préparer
  if (/périmètre/.test(qu)) {
    const idx = Object.keys(connus).map(Number);
    if (idx.length !== 2 || (idx[1] - idx[0]) % 2 === 0) return ["deux côtés consécutifs attendus"];
    return [...reponse(q, 2 * (connus[idx[0]].v + connus[idx[1]].v), "cm", "le périmètre"), ...verifierFigure(q, nom)];
  }
  const ang = qu.match(/angle faut-il tracer en ([A-Z])/);
  if (ang) {
    const c = anglesConnus(t, nom);
    if (Object.keys(c).length !== 1) return ["un angle connu attendu"];
    if (ang[1] in c) return ["l'angle demandé est donné"];
    return [...reponse(q, angleDeduit(nom, c, ang[1])!, "°", `l'angle en ${ang[1]}`), ...verifierFigure(q, nom)];
  }
  const cote = qu.match(/longueur faut-il donner à \[([A-Z])([A-Z])\]/);
  if (cote) {
    for (let i = 0; i < 4; i++)
      if (memeSeg(cote[1] + cote[2], nom[i] + nom[(i + 1) % 4])) {
        if (connus[i]) return ["le côté demandé est donné"];
        const f = connus[(i + 2) % 4];
        if (!f) return ["le côté opposé n'est pas donné"];
        return [...reponse(q, f.v, f.u, "le côté opposé"), ...verifierFigure(q, nom)];
      }
    return ["côté demandé illisible"];
  }
  return ["question non reconnue"];
}

/* ─── PARA_DEFI (13/10/2026) ────────────────────────────────────────────── */

/** Deux sommets consécutifs du nom ? */
const consecutifs = (nom: string, x: string, y: string) => {
  const d = (nom.indexOf(x) - nom.indexOf(y) + 4) % 4;
  return nom.includes(x) && nom.includes(y) && (d === 1 || d === 3);
};

function corrDefiMesures(q: Q): string[] {
  const t = q.text;
  const nom = nomQuad(t);
  if (!nom) return ["parallélogramme sans nom"];
  const qu = question(t);
  // périmètre à rebours
  const per = t.match(/périmètre est (\d+) (cm|m) et ([A-Z])([A-Z]) = (\d+) (cm|m)/);
  if (per) {
    const [, p, u, x, y, v, u2] = per;
    if (u !== u2) return ["unités différentes"];
    const dem = qu.match(/([A-Z])([A-Z])(?![A-Za-z])/);
    if (!dem || !consecutifs(nom, x, y) || !consecutifs(nom, dem[1], dem[2]) || memeSeg(x + y, dem[1] + dem[2])) return ["côtés illisibles"];
    // le côté demandé est consécutif au côté donné (ou opposé à un côté consécutif) : demi-périmètre − côté donné
    const opposeDonne = ![...dem[1] + dem[2]].some((l) => (x + y).includes(l));
    const juste = opposeDonne ? num(v) : num(p) / 2 - num(v);
    const p2: string[] = [];
    if (num(p) / 2 - num(v) <= 0) p2.push("périmètre trop petit pour ce côté");
    return [...p2, ...reponse(q, juste, u, "demi-périmètre moins le côté donné")];
  }
  // angles liés : « mesure 40° de plus que », « le triple de »
  const plus = t.match(/angle en ([A-Z]) mesure (\d+)° de plus que l’angle en ([A-Z])/);
  const fois = t.match(/angle en ([A-Z]) mesure (le double|le triple|le quadruple|cinq fois) de l’angle en ([A-Z])/);
  const dem = qu.match(/angle en ([A-Z])/)?.[1];
  if (plus || fois) {
    const [X, Y] = plus ? [plus[1], plus[3]] : [fois![1], fois![3]];
    if (!consecutifs(nom, X, Y)) return [`${X} et ${Y} ne sont pas consécutifs`];
    // on cherche x (en X) et y (en Y) avec x + y = 180
    let x: number;
    if (plus) x = (180 + num(plus[2])) / 2;
    else {
      const k = { "le double": 2, "le triple": 3, "le quadruple": 4, "cinq fois": 5 }[fois![2]]!;
      x = (180 * k) / (k + 1);
    }
    if (dem !== X && dem !== Y) return ["angle demandé non lu"];
    return reponse(q, dem === X ? x : 180 - x, "°", `l'angle en ${dem}`);
  }
  // sommes d'angles
  const connus = anglesConnus(t, nom);
  if (Object.keys(connus).length !== 1) return ["un angle connu attendu"];
  const so = qu.match(/angles en ([A-Z]) et en ([A-Z])/);
  if (!so) return ["question non reconnue"];
  const val = (L: string) => (L in connus ? connus[L] : angleDeduit(nom, connus, L)!);
  return reponse(q, val(so[1]) + val(so[2]), "°", `somme des angles en ${so[1]} et ${so[2]}`);
}

function corrDefiSuffit(q: Q): string[] {
  const t = q.text;
  const nom = nomQuad(t) ?? t.match(/quadrilatère ([A-Z]{4})/)?.[1];
  if (!nom) return ["quadrilatère sans nom"];
  let oui: boolean | null = null;
  const I = t.match(/se coupent en ([A-Z]),/)?.[1];
  const par = t.match(/\(([A-Z]{2})\) et \(([A-Z]{2})\) sont parallèles/);
  if (I) {
    // les quatre demi-diagonales
    const L: Record<string, number> = {};
    for (const m of t.matchAll(/(?<![A-Z])([A-Z]{2}) = (?:([A-Z]{2}) = )?(\d+) cm/g)) for (const s of [m[1], m[2]].filter(Boolean)) L[s.replace(I, "")] = num(m[3]);
    if (Object.keys(L).length !== 4) return ["demi-diagonales illisibles"];
    const opp = (V: string) => nom[(nom.indexOf(V) + 2) % 4];
    oui = [...nom].every((V) => egal(L[V], L[opp(V)]));
  } else if (par) {
    const [a, b] = [par[1], par[2]];
    if (!opposes(nom, a, b)) return [`(${a}) et (${b}) ne sont pas opposés`];
    const la = longueurTexte(t, a[0], a[1]) ?? (t.match(new RegExp(`${a} = ${b} = (\\d+) cm`)) ? { v: 0, u: "cm" } : null);
    const lb = longueurTexte(t, b[0], b[1]) ?? la;
    if (new RegExp(`${a} = ${b} = (\\d+) cm`).test(t)) oui = true;
    else if (la && lb) oui = egal(la.v, lb.v);
    else return ["longueurs illisibles"];
  } else if (/se coupent en leur milieu/.test(t)) oui = true;
  else if (/opposés sont parallèles et de même longueur/.test(t)) oui = true;
  else if (/quatre côtés ont la même longueur/.test(t)) oui = true;
  else if (/deux de ses côtés sont parallèles|diagonales sont perpendiculaires|diagonales ont la même longueur/.test(t)) oui = false;
  if (oui == null) return ["information non reconnue"];
  const vf = /Vrai ou faux/.test(t);
  const [o, n] = vf ? ["vrai", "faux"] : ["oui", "non"];
  const p: string[] = [];
  if (!(q.choices?.length === 2 && q.choices.includes(o) && q.choices.includes(n))) p.push("propositions oui / non ou vrai / faux attendues");
  if (q.expected[0] !== (oui ? o : n)) p.push(`attendu « ${q.expected[0]} », il faut « ${oui ? o : n} »`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  para_defi_tpl_1: corrDefiMesures,
  para_defi_tpl_2: corrDefiSuffit,
  para_construire_tpl_1: corrConstruire,
  para_construire_tpl_2: corrConstruire,
  para_particuliers_tpl_1: corrParticuliers,
  para_particuliers_tpl_2: corrParticuliers,
  para_particuliers_qcm_tpl_propriete: corrParticuliers,
  para_diagonales_tpl_1: corrDiagonales,
  para_diagonales_tpl_2: corrDiagonales,
  para_diagonales_tpl_milieu: corrDiagonales,
  para_diagonales_qcm_tpl_symetrique: corrDiagonales,
  para_cotes_angles_tpl_1: corrAngle,
  para_cotes_angles_tpl_angle_oppose: corrAngle,
  para_cotes_angles_tpl_2: corrCote,
  para_cotes_angles_tpl_cote_oppose: corrCote,
  para_cotes_angles_tpl_perimetre: corrPerimetre,
  para_reconnaitre_tpl_1: corrFigureEstPara,
  para_reconnaitre_tpl_vocabulaire: corrVocabulaire,
  para_reconnaitre_qcm_tpl_suffit: corrSuffit,
});
