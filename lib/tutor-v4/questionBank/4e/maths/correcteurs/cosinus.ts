import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, cle, lireValeur, num, proche } from "./pythagore";

// LES CORRECTEURS DE cosinus.bank.ts (notion trigo_cosinus, 08/10/2026).
//
// Ils lisent le texte (LaTeX retiré) : le triangle, le sommet de l'angle droit
// (« rectangle en A », « l'angle BAC est droit », « (AB) ⊥ (AC) », « = 90° »),
// l'angle étudié, les longueurs, les angles et les cosinus donnés, l'arrondi
// demandé. Ils RÉSOLVENT le triangle sans passer par le gabarit (deux côtés →
// Pythagore ; un côté et un angle → cosinus, et sinus pour CONTRÔLER le côté
// opposé), puis vérifient la réponse : la bonne longueur ou le bon angle, à
// l'arrondi annoncé (exacte quand aucun arrondi n'est annoncé), l'unité,
// l'hypoténuse = le côté en face de l'angle droit et le plus long, l'adjacent
// = le côté qui touche l'angle sans être l'hypoténuse. Sur la FIGURE : les
// noms des sommets, l'angle droit codé au bon sommet (et vraiment droit),
// l'angle marqué au bon sommet avec la bonne valeur, les longueurs sur les bons
// côtés et le « ? » sur l'inconnue. Cosinus seulement : aucun sinus, aucune
// tangente dans les énoncés ni les réponses. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Le texte sans LaTeX : « $\widehat{KHZ}$ » → « ∠KHZ », « \dfrac{4}{5} » → « 4/5 », « 13{,}8 » → « 13,8 ». */
export function sansLatex(s: string): string {
  let t = String(s)
    .replace(/\\widehat\{([A-Z]+)\}/g, "∠$1")
    .replace(/\{,\}/g, ",")
    .replace(/\\(?:;|,|!)/g, "")
    .replace(/\\ldots/g, "…")
    .replace(/\\cos\^\{-1\}/g, "cos⁻¹")
    .replace(/\\cos/g, "cos")
    .replace(/\^\\circ/g, "°")
    .replace(/\\perp/g, "⊥")
    .replace(/\\text\{([^{}]*)\}/g, "$1");
  for (let k = 0; k < 3; k++) t = t.replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");
  return t.replace(/\$/g, "").replace(/ +/g, " ").trim();
}

type Cos = {
  nom: string | null;
  droit: string | null;
  /** Longueurs par côté (lettres triées). */
  L: Map<string, number>;
  unites: Set<string>;
  /** Angles donnés (degrés) et cosinus donnés, par sommet. */
  ang: Map<string, number>;
  cos: Map<string, number>;
};

/** Le sommet d'un angle écrit « ∠K » ou « ∠HKZ ». */
const sommet = (a: string) => (a.length === 3 ? a[1] : a);

function lire(t: string): Cos {
  const nom =
    t.match(/triangle ([A-Z]{3})\b/)?.[1] ??
    t.match(/(?<![∠A-Z])([A-Z]{3}) est (?:un triangle )?rectangle/)?.[1] ??
    t.match(/(?:Dans|dans) ([A-Z]{3})\b/)?.[1] ??
    (t.match(/On note ([A-Z]), ([A-Z]) et ([A-Z])/)?.slice(1, 4).join("") || null);
  let droit = t.match(/(?:rectangle|angle droit) en ([A-Z])\b/)?.[1] ?? t.match(/∠([A-Z]{3}) est droit/)?.[1]?.[1] ?? t.match(/∠([A-Z]{3}) = 90°/)?.[1]?.[1] ?? null;
  const perp = t.match(/\(([A-Z]{2})\) ⊥ \(([A-Z]{2})\)/);
  if (!droit && perp) droit = [...perp[1]].find((x) => perp[2].includes(x)) ?? null;
  const L = new Map<string, number>();
  const unites = new Set<string>();
  const poser = (s: string, v: string, u: string) => {
    L.set(cle(s), num(v));
    unites.add(u);
  };
  for (const m of t.matchAll(new RegExp(`\\b([A-Z]{2}) = ${NB} (cm|m)\\b`, "g"))) poser(m[1], m[2], m[3]);
  for (const m of t.matchAll(new RegExp(`\\[([A-Z]{2})\\] mesure ${NB} (cm|m)\\b`, "g"))) poser(m[1], m[2], m[3]);
  for (const m of t.matchAll(new RegExp(`${NB} (cm|m) \\(\\[([A-Z]{2})\\]\\)`, "g"))) poser(m[3], m[1], m[2]);
  // « [GE] est la longueur, [GK] la largeur » et « mesure 63 cm de long et 60 cm de large ».
  const rect = t.match(new RegExp(`mesure ${NB} (cm|m) de long et ${NB} (cm|m) de large`));
  const lg = t.match(/\[([A-Z]{2})\] est la longueur, \[([A-Z]{2})\] la largeur/);
  if (rect && lg) {
    poser(lg[1], rect[1], rect[2]);
    poser(lg[2], rect[3], rect[4]);
    if (!droit) droit = [...lg[1]].find((x) => lg[2].includes(x)) ?? null;
  }
  // « son hypoténuse mesure 13 cm », « d'hypoténuse 11 m », « dont l'hypoténuse mesure 7 cm ».
  const h = t.match(new RegExp(`(?:hypoténuse mesure|d'hypoténuse) ${NB} (cm|m)\\b`));
  if (h && nom && droit) poser([...nom].filter((x) => x !== droit).join(""), h[1], h[2]);
  const ang = new Map<string, number>();
  for (const m of t.matchAll(/∠([A-Z]{1,3}) = (\d+)°/g)) if (m[2] !== "90") ang.set(sommet(m[1]), Number(m[2]));
  const cos = new Map<string, number>();
  for (const m of t.matchAll(new RegExp(`cos\\(∠([A-Z]{1,3})\\) = ${NB}(?![\\d/])`, "g"))) cos.set(sommet(m[1]), num(m[2]));
  for (const m of t.matchAll(new RegExp(`le cosinus de l'angle ∠([A-Z]{1,3}) vaut ${NB}`, "g"))) cos.set(sommet(m[1]), num(m[2]));
  return { nom, droit, L, unites, ang, cos };
}

/** Le triangle résolu : les trois côtés et l'angle en chaque sommet aigu. */
type Resolu = { cote: (s: string) => number; angle: (v: string) => number; hyp: string; aigus: [string, string] };

function resoudre(T: Cos): { R: Resolu | null; pb: string[] } {
  const pb: string[] = [];
  if (!T.nom || new Set(T.nom).size !== 3) return { R: null, pb: [`triangle illisible : ${T.nom}`] };
  if (!T.droit || !T.nom.includes(T.droit)) return { R: null, pb: [`angle droit illisible (${T.droit})`] };
  const [P, Q] = [...T.nom].filter((x) => x !== T.droit) as [string, string];
  const hyp = cle(P + Q);
  const aP = cle(T.droit + P); // adjacent à P, opposé à Q
  const aQ = cle(T.droit + Q);
  for (const s of T.L.keys()) if (![hyp, aP, aQ].includes(s)) pb.push(`[${s}] n'est pas un côté de ${T.nom}`);
  if (T.unites.size > 1) pb.push(`unités mélangées : ${[...T.unites].join(", ")}`);
  let h = T.L.get(hyp);
  let p = T.L.get(aP);
  let q = T.L.get(aQ);
  const connus = [h, p, q].filter((x) => x != null).length;
  // cos de l'angle en P, s'il est donné (directement, ou par l'angle en P ou en Q).
  const rad = (d: number) => (d * Math.PI) / 180;
  let cP: number | undefined;
  if (T.cos.has(P)) cP = T.cos.get(P);
  else if (T.cos.has(Q)) cP = Math.sqrt(1 - T.cos.get(Q)! ** 2);
  else if (T.ang.has(P)) cP = Math.cos(rad(T.ang.get(P)!));
  else if (T.ang.has(Q)) cP = Math.sin(rad(T.ang.get(Q)!));
  for (const [v, c] of T.cos) if (!(c > 0 && c < 1)) pb.push(`cos en ${v} = ${c} : un cosinus d'angle aigu est entre 0 et 1`);
  for (const [v, a] of T.ang) if (!(a > 0 && a < 90)) pb.push(`angle en ${v} = ${a}° : pas un angle aigu`);
  if (connus >= 2) {
    if (h != null && p != null && !(h > p)) pb.push(`l'hypoténuse [${hyp}] n'est pas plus longue que [${aP}]`);
    if (h != null && q != null && !(h > q)) pb.push(`l'hypoténuse [${hyp}] n'est pas plus longue que [${aQ}]`);
    if (connus === 3 && !proche(h! * h!, p! * p! + q! * q!, 1e-6)) pb.push("les trois longueurs ne vérifient pas Pythagore");
    if (h == null) h = Math.sqrt(p! * p! + q! * q!);
    if (p == null) p = Math.sqrt(h * h - q! * q!);
    if (q == null) q = Math.sqrt(h * h - p * p);
  } else if (connus === 1 && cP != null) {
    const sP = Math.sqrt(1 - cP * cP);
    if (h != null) [p, q] = [h * cP, h * sP];
    else if (p != null) [h, q] = [p / cP, (p / cP) * sP];
    else [h, p] = [q! / sP, (q! / sP) * cP];
  } else if (cP == null || connus === 0) {
    // Seul un angle ou un cosinus est donné : les angles suffisent.
    if (cP == null) return { R: null, pb: [...pb, "données insuffisantes"] };
    h = 1;
    p = cP;
    q = Math.sqrt(1 - cP * cP);
  }
  if (cP != null && connus >= 2) {
    // Une donnée de trop doit être cohérente.
    if (!proche(cP, p! / h!, 1e-3)) pb.push("l'angle donné ne va pas avec les longueurs");
  }
  const H = h!, Pp = p!, Qq = q!;
  const R: Resolu = {
    hyp,
    aigus: [P, Q],
    cote: (s) => (cle(s) === hyp ? H : cle(s) === aP ? Pp : cle(s) === aQ ? Qq : NaN),
    angle: (v) => (v === P ? (Math.acos(Pp / H) * 180) / Math.PI : v === Q ? (Math.acos(Qq / H) * 180) / Math.PI : NaN),
  };
  return { R, pb };
}

/** Le pas d'arrondi annoncé (null = valeur exacte attendue). */
function pasAnnonce(t: string): number | null {
  if (/au dixième de degré près|au dixième près|au dixième\b/.test(t)) return 0.1;
  if (/à l'unité près|au degré près|au mètre près/.test(t)) return 1;
  return null;
}
const arrondir = (x: number, pas: number) => Math.round(x / pas) * pas;

/** La valeur attendue, à l'arrondi annoncé ; exacte (deux décimales au plus) sinon. */
function verifier(q: Q, brute: number, pas: number | null, u: string): string[] {
  const p: string[] = [];
  const e = lireValeur(sansLatex(String(q.expected[0])));
  if (!e) return [`réponse attendue illisible : « ${q.expected[0]} »`];
  if (pas == null) {
    if (Math.abs(brute * 100 - Math.round(brute * 100)) > 1e-6) p.push(`${brute} ne tombe pas juste et aucun arrondi n'est annoncé`);
    if (!proche(e.v, brute, 1e-6)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${brute}`);
  } else {
    const ok = [brute, brute + 1e-9, brute - 1e-9].some((x) => proche(e.v, arrondir(x, pas), 1e-9));
    if (!ok) p.push(`attendu « ${q.expected[0]} », le calcul donne ${brute} (arrondi au pas ${pas} : ${arrondir(brute, pas)})`);
    if (pas === 1 && Math.abs(brute - Math.round(brute)) < 1e-9 && /dixième/.test(q.text)) p.push("arrondi inutile");
  }
  if (e.u !== u) p.push(`unité de la réponse « ${e.u || "aucune"} » au lieu de « ${u || "aucune"} »`);
  return p;
}

// ─── La figure ──────────────────────────────────────────────────────────────

type Fig = {
  kind?: string;
  points?: Record<"A" | "B" | "C", { x: number; y: number }>;
  labels?: Record<"A" | "B" | "C", string>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
  marks?: { rightAngleAt?: "A" | "B" | "C" };
};

/**
 * La figure : mêmes sommets, angle droit codé au bon sommet et vraiment droit,
 * angle marqué au sommet étudié (avec sa valeur s'il est donné, « ? » s'il est
 * cherché), longueurs données sur les bons côtés, « ? » sur la longueur cherchée.
 */
function verifierFigure(q: Q, T: Cos, o: { angle?: string | null; valeurAngle?: string; cherche?: string | null }): string[] {
  const f = q.canvas as Fig | undefined;
  if (!f) return ["la figure manque"];
  if (f.kind !== "triangle" || !f.labels || !f.points) return ["figure : un triangle attendu"];
  const p: string[] = [];
  const noms = [f.labels.A, f.labels.B, f.labels.C];
  if (T.nom && cle(noms.join("")) !== cle(T.nom)) p.push(`figure : sommets ${noms.join("")} au lieu de ${T.nom}`);
  const k = f.marks?.rightAngleAt;
  if (!k || f.labels[k] !== T.droit) p.push(`figure : l'angle droit devrait être codé en ${T.droit}`);
  if (k) {
    const P = f.points;
    const [u, v] = (["A", "B", "C"] as const).filter((x) => x !== k).map((x) => ({ x: P[x].x - P[k].x, y: P[x].y - P[k].y }));
    if (Math.abs(u.x * v.x + u.y * v.y) / (Math.hypot(u.x, u.y) * Math.hypot(v.x, v.y)) > 0.03) p.push("figure : l'angle codé droit ne l'est pas sur le dessin");
  }
  const al = Object.entries(f.angleLabels ?? {}) as ["A" | "B" | "C", string][];
  if (o.angle !== undefined) {
    const marque = al.find(([kk]) => kk !== k);
    if (o.angle && (!marque || f.labels[marque[0]] !== o.angle)) p.push(`figure : l'angle marqué devrait être en ${o.angle}`);
    if (marque && o.valeurAngle !== undefined && marque[1] !== o.valeurAngle) p.push(`figure : l'angle porte « ${marque[1]} » au lieu de « ${o.valeurAngle} »`);
  }
  for (const [s, x, y] of [["AB", "A", "B"], ["BC", "B", "C"], ["CA", "C", "A"]] as const) {
    const lab = String(f.sideLabels?.[s] ?? "").trim();
    const seg = cle(f.labels[x] + f.labels[y]);
    if (lab === "?") {
      if (o.cherche !== undefined && o.cherche !== seg && o.cherche !== "*") p.push(`figure : « ? » sur [${seg}] au lieu de ${o.cherche ? `[${o.cherche}]` : "nulle part"}`);
      continue;
    }
    if (!lab) {
      if (T.L.has(seg)) p.push(`figure : la longueur de [${seg}] n'est pas écrite`);
      if (o.cherche === seg) p.push(`figure : la longueur cherchée [${seg}] n'est pas marquée « ? »`);
      continue;
    }
    const v = lireValeur(lab);
    if (!v || !T.L.has(seg) || !proche(v.v, T.L.get(seg)!)) p.push(`figure : [${seg}] porte « ${lab} », le texte dit ${T.L.get(seg) ?? "rien"}`);
    else if (!T.unites.has(v.u)) p.push(`figure : unité « ${v.u} » sur [${seg}]`);
  }
  return p;
}

// ─── Côtés : hypoténuse, adjacent, opposé ───────────────────────────────────

const segChoix = (c: string) => cle(sansLatex(c).replace(/[[\]]/g, ""));

function corrigerCotes(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  if (!T.nom || !T.droit || !T.nom.includes(T.droit)) return [`triangle ou angle droit illisible : ${t}`];
  const [P, Qv] = [...T.nom].filter((x) => x !== T.droit);
  const hyp = cle(P + Qv);
  const ch = (q.choices ?? []).map(sansLatex);
  let juste: (c: string) => boolean;
  let angle: string | null = null;
  const a = t.match(/(?:l'angle (?:aigu )?|cos\()∠([A-Z]{1,3})/)?.[1];
  if (/adjacent/.test(t) && a) {
    angle = sommet(a);
    juste = (c) => segChoix(c) === cle(T.droit! + angle!);
  } else if (/opposé|en face de l'angle ∠/.test(t) && a) {
    angle = sommet(a);
    juste = (c) => segChoix(c) === cle(T.droit! + [P, Qv].find((x) => x !== angle)!);
  } else if (ch.every((c) => / et /.test(c))) juste = (c) => sansLatex(c).split(" et ").every((s) => s.includes(T.droit!));
  else if (/hypoténuse|plus long|en face de l'angle droit|ne touche pas l'angle droit/.test(t)) juste = (c) => segChoix(c) === hyp;
  else return [`question illisible : ${t}`];
  if (angle && !(angle === P || angle === Qv)) return [`l'angle étudié ${angle} n'est pas un angle aigu du triangle`];
  return [...qcmUnique({ ...q, choices: q.choices, expected: q.expected }, (c) => juste(c)), ...verifierFigure(q, T, { angle: angle ?? undefined })];
}

// ─── Définition ─────────────────────────────────────────────────────────────

/** La lettre au numérateur ou au dénominateur qui manque. */
function corrigerTrou(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const { R, pb } = resoudreLettres(T);
  if (!R) return pb;
  const a = t.match(/cos\(∠([A-Z]{1,3})\)/)?.[1];
  if (!a) return [...pb, "angle illisible"];
  const S = sommet(a);
  if (!R.aigus.includes(S)) return [...pb, `${S} n'est pas un angle aigu`];
  const adj = cle(T.droit! + S);
  const num_ = /(?:…|\?)\/([A-Z]{2})|faut-il diviser par ([A-Z]{2})/.exec(t);
  const den = /([A-Z]{2})\/(?:…|\?)|divise-t-on ([A-Z]{2})/.exec(t);
  let bon: string;
  if (num_) {
    if (cle(num_[1] ?? num_[2]) !== R.hyp) pb.push(`le dénominateur écrit (${num_[1] ?? num_[2]}) n'est pas l'hypoténuse`);
    bon = adj;
  } else if (den) {
    if (cle(den[1] ?? den[2]) !== adj) pb.push(`le numérateur écrit (${den[1] ?? den[2]}) n'est pas l'adjacent`);
    bon = R.hyp;
  } else return [...pb, "trou illisible"];
  return [...pb, ...qcmUnique(q, (c) => segChoix(c) === bon), ...verifierFigure(q, T, { angle: S })];
}

/** Les lettres seulement (pas de longueurs) : hypoténuse et côtés de l'angle droit. */
function resoudreLettres(T: Cos): { R: { hyp: string; aigus: string[] } | null; pb: string[] } {
  if (!T.nom || !T.droit || !T.nom.includes(T.droit)) return { R: null, pb: [`triangle ou angle droit illisible (${T.nom}, ${T.droit})`] };
  const aigus = [...T.nom].filter((x) => x !== T.droit);
  return { R: { hyp: cle(aigus.join("")), aigus }, pb: [] };
}

/** « XY/ZW » = adjacent / hypoténuse ? */
function fractionJuste(T: Cos, S: string, f: string): boolean | null {
  const m = f.match(/^([A-Z]{2})\/([A-Z]{2})$/);
  if (!m) return null;
  const hyp = cle([...T.nom!].filter((x) => x !== T.droit).join(""));
  return cle(m[1]) === cle(T.droit! + S) && cle(m[2]) === hyp;
}

function corrigerFormule(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const { R, pb } = resoudreLettres(T);
  if (!R) return pb;
  const choix = (q.choices ?? []).map(sansLatex);
  const a = (t.match(/∠([A-Z]{1,3})/) ?? choix[0]?.match(/∠([A-Z]{1,3})/))?.[1];
  if (!a) return [...pb, "angle illisible"];
  const S = sommet(a);
  return [
    ...pb,
    ...qcmUnique(q, (c) => fractionJuste(T, S, sansLatex(c).replace(/^cos\(∠[A-Z]{1,3}\) = /, "")) === true),
    ...verifierFigure(q, T, { angle: S }),
  ];
}

/** Un élève écrit une égalité : juste seulement si c'est l'adjacent sur l'hypoténuse. */
function corrigerEleve(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const { R, pb } = resoudreLettres(T);
  if (!R) return pb;
  const m = t.match(/cos\(∠([A-Z]{1,3})\) = ([A-Z]{2}\/[A-Z]{2})/);
  if (!m) return [...pb, "égalité illisible"];
  const S = sommet(m[1]);
  const ok = fractionJuste(T, S, m[2]);
  const [oui, non] = (q.choices ?? []).includes("vrai") ? ["vrai", "faux"] : ["oui", "non"];
  return [...pb, ...qcmUnique(q, (c) => c === (ok ? oui : non)), ...verifierFigure(q, T, { angle: S })];
}

/** La fraction du cosinus avec les longueurs. */
function corrigerValeurFraction(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const { R, pb } = resoudre(T);
  if (!R) return pb;
  const a = t.match(/cos\(∠([A-Z]{1,3})\)/)?.[1];
  if (!a) return [...pb, "angle illisible"];
  const S = sommet(a);
  const adj = T.L.get(cle(T.droit! + S));
  const h = T.L.get(R.hyp);
  if (adj == null || h == null) return [...pb, "l'adjacent et l'hypoténuse ne sont pas tous deux donnés"];
  const juste = (c: string) => {
    const m = sansLatex(c).match(new RegExp(`^${NB}/${NB}$`));
    return !!m && proche(num(m[1]), adj) && proche(num(m[2]), h);
  };
  return [...pb, ...qcmUnique(q, juste), ...verifierFigure(q, T, { angle: S, valeurAngle: "" })];
}

/** Une affirmation chiffrée « cos(∠X) = 0,6 » ou « = 50/14 » : juste ou non ? */
function corrigerAffirmation(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const m = t.match(new RegExp(`cos\\(∠([A-Z]{1,3})\\) = (${NB}/${NB}|${NB})`));
  if (!m) return ["affirmation illisible"];
  const S = sommet(m[1]);
  T.cos.delete(S);
  const { R, pb } = resoudre(T);
  if (!R) return pb;
  const v = m[2].includes("/") ? num(m[2].split("/")[0]) / num(m[2].split("/")[1]) : num(m[2]);
  const vrai = proche(v, R.cote(cle(T.droit! + S)) / R.cote(R.hyp), 1e-9);
  const [oui, non] = (q.choices ?? []).includes("vrai") ? ["vrai", "faux"] : ["oui", "non"];
  return [...pb, ...qcmUnique(q, (c) => c === (vrai ? oui : non)), ...verifierFigure(q, T, { angle: S, valeurAngle: "" })];
}

// ─── Calculs : longueur, angle, cosinus, périmètre ──────────────────────────

/** Ce que demande la question, lu dans le texte. */
function demande(t: string): { sorte: "angle" | "cos" | "perimetre" | "longueur"; cible: string | null } {
  if (/périmètre/.test(t)) return { sorte: "perimetre", cible: null };
  if (/degré|en degrés/.test(t)) {
    const as = [...t.matchAll(/∠([A-Z]{1,3})/g)];
    return { sorte: "angle", cible: as.length ? sommet(as[as.length - 1][1]) : null };
  }
  if (/valeur décimale|écriture décimale|calcule cos\(|Que vaut cos\(/.test(t)) {
    // « cos(∠P) », ou l'angle qu'on obtiendra avec la touche cos⁻¹.
    const cs = [...t.matchAll(/cos\(∠([A-Z]{1,3})\)/g)];
    const as = [...t.matchAll(/∠([A-Z]{1,3})/g)];
    const dernier = cs.length ? cs[cs.length - 1] : as[as.length - 1];
    return { sorte: "cos", cible: dernier ? sommet(dernier[1]) : null };
  }
  const segs = [...t.matchAll(/(?<![A-Z∠])([A-Z]{2})(?![A-Z])/g)];
  return { sorte: "longueur", cible: segs.length ? cle(segs[segs.length - 1][1]) : null };
}

/** Le correcteur général : résout le triangle du texte et vérifie la réponse et la figure. */
function corrigerCalcul(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const d = demande(t);
  // La donnée cherchée ne doit pas être lue comme une donnée.
  if (d.sorte === "cos" && d.cible) T.cos.delete(d.cible);
  const { R, pb } = resoudre(T);
  if (!R) return pb;
  const u = [...T.unites][0] ?? "";
  const pas = pasAnnonce(t);
  const p = [...pb];
  let brute: number;
  let figure: Parameters<typeof verifierFigure>[2];
  const angleDonne = [...T.ang.keys()][0] ?? [...T.cos.keys()][0] ?? null;
  if (d.sorte === "longueur") {
    if (!d.cible || Number.isNaN(R.cote(d.cible))) return [...p, `longueur cherchée illisible (${d.cible})`];
    if (T.L.has(d.cible)) p.push(`[${d.cible}] est déjà donnée`);
    brute = R.cote(d.cible);
    p.push(...verifier(q, brute, pas, u));
    figure = { angle: angleDonne, valeurAngle: T.ang.has(angleDonne ?? "") ? `${T.ang.get(angleDonne!)}°` : "", cherche: d.cible };
  } else if (d.sorte === "perimetre") {
    brute = R.cote(R.hyp) + R.cote(cle(T.droit! + R.aigus[0])) + R.cote(cle(T.droit! + R.aigus[1]));
    p.push(...verifier(q, brute, pas, u));
    if (!u) p.push("un périmètre sans unité");
    figure = { angle: angleDonne, valeurAngle: T.ang.has(angleDonne ?? "") ? `${T.ang.get(angleDonne!)}°` : "", cherche: "*" };
  } else if (d.sorte === "angle") {
    if (!d.cible || !R.aigus.includes(d.cible)) return [...p, `angle cherché illisible (${d.cible})`];
    if (T.ang.has(d.cible)) p.push("l'angle cherché est déjà donné");
    brute = R.angle(d.cible);
    p.push(...verifier(q, brute, pas, ""));
    figure = { angle: d.cible, valeurAngle: "?", cherche: null };
  } else {
    if (!d.cible || !R.aigus.includes(d.cible)) return [...p, `cosinus demandé illisible (${d.cible})`];
    brute = R.cote(cle(T.droit! + d.cible)) / R.cote(R.hyp);
    p.push(...verifier(q, brute, null, ""));
    figure = { angle: d.cible, cherche: T.L.has(R.hyp) ? null : R.hyp };
  }
  // Cosinus seulement : ni sinus ni tangente dans ce que voit l'élève.
  if (/\bsin\b|\btan\b|(?<!co)sinus|tangente/.test(t)) p.push("sinus ou tangente dans l'énoncé (4e : le cosinus seulement)");
  return [...p, ...verifierFigure(q, T, figure)];
}

// ─── Problèmes : la situation modélisée ─────────────────────────────────────

/**
 * Un problème : la phrase « On modélise … par le triangle XYZ rectangle en R :
 * S est …, R …, X … » fixe l'angle étudié (S) ; les mesures de l'objet sont
 * lues dans le texte et sur la figure, qui doivent dire la même chose.
 */
function corrigerProbleme(q: Q): string[] {
  const t = sansLatex(q.text);
  const T = lire(t);
  const m = t.match(/triangle ([A-Z]{3}) rectangle en ([A-Z]) : ([A-Z]) est .+?, ([A-Z]) .+? et ([A-Z]) /);
  if (!m) return ["modélisation illisible"];
  const [, nom, droit, S, R2, X] = m;
  const p: string[] = [];
  if (R2 !== droit) p.push(`le sommet de l'angle droit est ${droit}, mais la phrase décrit ${R2} en deuxième`);
  if (cle(S + R2 + X) !== cle(nom)) p.push("les trois points décrits ne sont pas ceux du triangle");
  const f = q.canvas as Fig | undefined;
  if (!f?.labels || !f.sideLabels) return [...p, "la figure manque"];
  // Les longueurs : celles de la figure, qui doivent être exactement celles du texte.
  const L = new Map<string, number>();
  let inconnue: string | null = null;
  for (const [s, x, y] of [["AB", "A", "B"], ["BC", "B", "C"], ["CA", "C", "A"]] as const) {
    const lab = String(f.sideLabels[s] ?? "").trim();
    if (lab === "?") inconnue = cle(f.labels[x] + f.labels[y]);
    else if (lab) {
      const v = lireValeur(lab);
      if (v) L.set(cle(f.labels[x] + f.labels[y]), v.v);
    }
  }
  const dansTexte = [...t.matchAll(new RegExp(`${NB} m\\b`, "g"))].map((x) => num(x[1]));
  const surFigure = [...L.values()];
  if (cle(dansTexte.map(String).join("|")) !== cle(surFigure.map(String).join("|")) || dansTexte.length !== surFigure.length)
    p.push(`le texte donne ${dansTexte.join(", ")} m, la figure ${surFigure.join(", ")}`);
  const angTexte = t.match(/(\d+)°/)?.[1];
  const cosTexte = t.match(new RegExp(`cos\\(∠([A-Z])\\) = ${NB}`));
  const marque = Object.entries(f.angleLabels ?? {})[0] as ["A" | "B" | "C", string] | undefined;
  if (!marque || f.labels[marque[0]] !== S) p.push(`figure : l'angle étudié (${S}) n'est pas celui marqué`);
  if (cosTexte && cosTexte[1] !== S) p.push(`le cosinus donné porte sur ${cosTexte[1]} au lieu de ${S}`);
  const Tm: Cos = { nom, droit, L, unites: new Set(["m"]), ang: new Map(), cos: new Map() };
  if (angTexte && marque?.[1] === "?") p.push("un angle est donné alors que la figure le cherche");
  if (angTexte) Tm.ang.set(S, Number(angTexte));
  if (cosTexte) Tm.cos.set(S, num(cosTexte[2]));
  p.push(...verifierFigure(q, Tm, { angle: S, valeurAngle: marque?.[1] === "?" ? "?" : angTexte ? `${angTexte}°` : "", cherche: inconnue }));
  const { R, pb } = resoudre(Tm);
  if (!R) return [...p, ...pb];
  p.push(...pb);
  const pas = pasAnnonce(t) ?? 0.1;
  if (marque?.[1] === "?") return [...p, ...verifier(q, R.angle(S), pas, "")];
  if (!inconnue) return [...p, "inconnue illisible"];
  // Plausibilité : l'objet incliné (l'hypoténuse) mesure entre 1 m et 1 km.
  const hyp = R.cote(R.hyp);
  if (hyp < 1 || hyp > 1000) p.push(`objet de ${hyp} m : invraisemblable`);
  return [...p, ...verifier(q, R.cote(inconnue), pas, "m")];
}

const C = corrigerCalcul;
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  // Côtés
  "4e_cos_cotes_tpl_1": corrigerCotes,
  "4e_cos_cotes_tpl_3_angle_droit": corrigerCotes,
  "4e_cos_cotes_tpl_2_hyp": corrigerCotes,
  // Définition
  "4e_cos_definition_tpl_1_valeur": corrigerValeurFraction,
  "4e_cos_definition_tpl_3_trou": corrigerTrou,
  "4e_cos_definition_tpl_4_eleve": corrigerEleve,
  "4e_cos_definition_tpl_5_decimal": C,
  "4e_cos_definition_tpl_2_formule_c": corrigerFormule,
  // Longueurs
  "4e_cos_calculer_longueur_tpl_1_adjacent_60": C,
  "4e_cos_calculer_longueur_tpl_6_cos_donne": C,
  "4e_cos_calculer_longueur_tpl_2_decimal": C,
  "4e_cos_calculer_longueur_tpl_3_hypotenuse": C,
  "4e_cos_calculer_longueur_tpl_4_decimal_hyp": C,
  "4e_cos_calculer_longueur_tpl_7_autre_angle": C,
  "4e_cos_calculer_longueur_tpl_5_adjacent_decimal": C,
  // Angles
  "4e_cos_calculer_angle_tpl_1": C,
  "4e_cos_calculer_angle_tpl_4_moitie": C,
  "4e_cos_calculer_angle_tpl_2_ratio": C,
  "4e_cos_calculer_angle_tpl_3": C,
  "4e_cos_calculer_angle_tpl_5_autre_angle": C,
  // Problèmes
  "4e_cos_probleme_tpl_1_echelle": corrigerProbleme,
  "4e_cos_probleme_tpl_5_adjacent": corrigerProbleme,
  "4e_cos_probleme_tpl_2_rampe": corrigerProbleme,
  "4e_cos_probleme_tpl_3_toboggan": corrigerProbleme,
  "4e_cos_probleme_tpl_4_hypotenuse": corrigerProbleme,
  "4e_cos_probleme_tpl_2": corrigerProbleme,
  "4e_cos_probleme_tpl_3_valeur_donnee": corrigerProbleme,
  // Défis
  "4e_cos_defi_tpl_1_combine": C,
  "4e_cos_defi_tpl_4_affirmation": corrigerAffirmation,
  "4e_cos_defi_tpl_5_pythagore_cos": C,
  "4e_cos_defi_tpl_2_longueur": C,
  "4e_cos_defi_tpl_3_hypotenuse": C,
});
