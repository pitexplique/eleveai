import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4, DroitesCanvasData, CercleCanvasData } from "@/lib/tutor-v4/types";
import { uneSeuleJuste, decimalesOk, longueursLues } from "./triangles";

// Correcteurs des gabarits de mediatrice.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT le texte et la figure : les noms des points, les
// longueurs, l'angle, la position de la droite (d) sur le dessin — est-elle
// vraiment perpendiculaire, passe-t-elle vraiment par le milieu ? — puis
// refait le raisonnement (définition, propriété d'équidistance dans les deux
// sens, construction au compas) et vérifie que seule la réponse attendue est
// juste, avec son unité.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(s.replace(",", "."));
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;

/** « 4,5 cm » → { v, u } ; sans unité → null. */
function mesure(e: string) {
  const m = e.trim().match(/^(\d+(?:,\d+)?) ?(mm|cm|m|km|°)$/);
  return m ? { v: num(m[1]), u: m[2] } : null;
}
function verifierMesure(q: Q, juste: number, unite: string, p: string[]) {
  const att = mesure(q.expected[0]);
  if (!att) return void p.push(`réponse sans unité : « ${q.expected[0]} »`);
  if (att.u !== unite) p.push(`unité ${att.u}, attendue ${unite}`);
  if (!egal(att.v, juste)) p.push(`réponse ${q.expected[0]}, recalculée ${String(juste).replace(".", ",")} ${unite}`);
}
const segmentDe = (t: string) => t.match(/\[([A-Z])([A-Z])\]/)?.slice(1, 3) ?? null;

// ----- La figure « segment et droite (d) »
type Pt = { x: number; y: number };
function lireDroites(q: Q, E: string, F: string, p: string[]) {
  const f = q.canvas && q.canvas.kind === "droites" ? (q.canvas as DroitesCanvasData) : null;
  if (!f) return null;
  const pt = (l: string) => f.points?.find((x) => x.label === l);
  const [e, fF] = [pt(E), pt(F)];
  if (!e || !fF) {
    p.push(`figure sans les points ${E} et ${F}`);
    return null;
  }
  const d = f.lines.find((l) => l.id === "d");
  if (!d) return null;
  const from = d.from as Pt;
  const to = d.to as Pt;
  const ux = to.x - from.x;
  const uy = to.y - from.y;
  const vx = fF.x - e.x;
  const vy = fF.y - e.y;
  const cos = Math.abs(ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy));
  const perp = cos < 0.02;
  const mx = (e.x + fF.x) / 2;
  const my = (e.y + fF.y) / 2;
  const distMilieu = Math.abs(ux * (my - from.y) - uy * (mx - from.x)) / Math.hypot(ux, uy);
  const parMilieu = distMilieu < 1.5;
  const marque = Boolean(f.markers?.rightAngles?.length) && f.display?.showRightAngleMarkers !== false;
  if (marque !== perp) p.push(`figure : marque d’angle droit ${marque ? "présente" : "absente"}, droite ${perp ? "" : "non "}perpendiculaire`);
  return { f, perp, parMilieu, pt };
}

/** Ce qu'affirme une réponse « (d) est-elle la médiatrice ? » : [perpendiculaire, par le milieu]. */
function affirme(c: string): [boolean, boolean] | null {
  if (/^oui : elle est perpendiculaire .* et passe par son milieu$/.test(c)) return [true, true];
  if (/^non : elle est perpendiculaire .*, mais ne passe pas par son milieu$/.test(c)) return [true, false];
  if (/^non : elle passe par le milieu .*, mais n’est pas perpendiculaire$/.test(c)) return [false, true];
  if (/^non : elle n’est pas perpendiculaire .* et ne passe pas par son milieu$/.test(c)) return [false, false];
  return null;
}
function jugerMediatrice(q: Q, perp: boolean, parMilieu: boolean, p: string[]) {
  uneSeuleJuste(
    q,
    (c) => {
      const a = affirme(c);
      return Boolean(a && a[0] === perp && a[1] === parMilieu);
    },
    p,
  );
}

// =====================================================================
// MEDIATRICE_DEFINITION
function corrigerDefinition(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  const [E, F] = s;
  let juste: (c: string) => boolean;
  if (/Qu’est-ce que la médiatrice|Quelle droite est la médiatrice|définition de la médiatrice/.test(t))
    juste = (c) => c.includes(`perpendiculaire à [${E}${F}]`) && /passe par son milieu/.test(c) && !/parallèle/.test(c) && !new RegExp(`passe par [${E}${F}]$`).test(c);
  else if (/Que sait-on de cette droite|Comment cette droite coupe/.test(t)) juste = (c) => /milieu/.test(c) && /angle droit/.test(c) && !/biais/.test(c);
  else if (/Combien de médiatrices|plusieurs médiatrices/.test(t)) juste = (c) => c === "une seule";
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}
function corrigerFigure(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  const lu = lireDroites(q, s[0], s[1], p);
  if (!lu) return [...p, "figure illisible"];
  const M = t.match(/([A-Z]) est le milieu/)?.[1];
  if (M) {
    const m = lu.pt(M);
    const e = lu.pt(s[0])!;
    const f = lu.pt(s[1])!;
    if (!m || Math.abs(m.x - (e.x + f.x) / 2) > 1 || Math.abs(m.y - (e.y + f.y) / 2) > 1) p.push(`figure : ${M} n’est pas au milieu`);
  }
  jugerMediatrice(q, lu.perp, lu.parMilieu, p);
  return p;
}
function corrigerMesures(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  const [E] = s;
  const L = longueursLues(t)[0]?.v;
  const x = t.match(new RegExp(`${E}([A-Z]) = (\\d+(?:,\\d+)?) cm, et fait`))?.[2];
  const ang = t.match(/un angle de (\d+)°/)?.[1];
  if (L === undefined || !x || !ang) return ["longueur, position ou angle illisible"];
  if (num(x) <= 0 || num(x) >= L) p.push(`le point de coupe n’est pas sur le segment (${x} cm sur ${L} cm)`);
  jugerMediatrice(q, num(ang) === 90, egal(num(x), L / 2), p);
  return p;
}
function corrigerRaisons(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/passe par le milieu de \[..\], donc c’est sa médiatrice/.test(t)) juste = (c) => /^non/.test(c) && /perpendiculaire/.test(c);
  else if (/est perpendiculaire à \[..\], donc c’est sa médiatrice/.test(t)) juste = (c) => /^non/.test(c) && /milieu/.test(c);
  else if (/un segment, une demi-droite ou une droite/.test(t)) juste = (c) => /^une droite/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// MEDIATRICE_PROPRIETE
/** Les longueurs nommées du texte : « KE = 4,5 m » → { KE: { v, u } } (lettres dans l'ordre écrit). */
function longueursNommees(t: string) {
  const r: Record<string, { v: number; u: string }> = {};
  for (const m of t.matchAll(/\b([A-Z])([A-Z]) = (\d+(?:,\d+)?) (cm|m|km)\b/g)) r[m[1] + m[2]] = { v: num(m[3]), u: m[4] };
  return r;
}
const plausible = (l: { v: number; u: string }) => l.v > 0 && (l.u !== "km" || l.v <= 50) && (l.u !== "m" || l.v <= 1000) && (l.u !== "cm" || l.v <= 500);
function corrigerDistance(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  const K = t.match(/(?:point|au point) ([A-Z])(?: est)?,? sur la médiatrice/)?.[1];
  if (!s || !K) return ["segment ou point illisible"];
  const ls = longueursNommees(t);
  const ks = Object.keys(ls);
  if (ks.length !== 1 || ks[0][0] !== K || !s.includes(ks[0][1])) return [...p, `donnée illisible : ${ks.join(", ")}`];
  if (!plausible(ls[ks[0]])) p.push("distance peu plausible");
  const Y = s.find((x) => x !== ks[0][1])!;
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  if (!fin.includes(`${K}${Y}`) && !fin.includes(`de ${Y} se trouve`)) p.push(`on ne demande pas la distance ${K}${Y}`);
  verifierMesure(q, ls[ks[0]].v, ls[ks[0]].u, p);
  return p;
}
function corrigerTrajet(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  if (!s) return ["segment illisible"];
  const [E, F] = s;
  const ls = longueursNommees(t);
  const base = ls[E + F];
  const kE = Object.entries(ls).find(([k]) => k !== E + F && k[1] === E);
  if (!base || !kE) return ["longueurs illisibles"];
  const a = kE[1].v;
  if (kE[1].u !== base.u) p.push("unités différentes");
  if (!(a > base.v / 2)) p.push(`${kE[0]} = ${a} trop court : le point serait sur le segment ou n’existerait pas`);
  if (/va de .* puis de/.test(t)) verifierMesure(q, Math.round(2 * a * 100) / 100, base.u, p);
  else if (/périmètre du triangle/.test(t)) verifierMesure(q, Math.round((2 * a + base.v) * 100) / 100, base.u, p);
  else p.push("question non reconnue");
  return p;
}
function corrigerReciproque(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const ls = Object.values(longueursNommees(t));
  if (ls.length !== 2) return [`il faut deux distances, lu : ${ls.length}`];
  const egales = egal(ls[0].v, ls[1].v) && ls[0].u === ls[1].u;
  uneSeuleJuste(q, (c) => (egales ? /^oui : ([A-Z]{2}) = ([A-Z]{2})$/.test(c) : /^non : .* sont différentes$/.test(c)), p);
  return p;
}
function corrigerSens(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/donc [A-Z] est le milieu/.test(t)) juste = (c) => /seulement sur la médiatrice/.test(c);
  else if (/On sait que ([A-Z]{2}) = ([A-Z]{2})\. Que peut-on en déduire/.test(t)) juste = (c) => /est sur la médiatrice/.test(c);
  else if (/est sur la médiatrice de .*\. Que peut-on en déduire/.test(t)) juste = (c) => /^([A-Z])([A-Z]) = \1([A-Z])$/.test(c);
  else if (/n’est PAS sur la médiatrice/.test(t)) juste = (c) => c === "elles sont différentes";
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// MEDIATRICE_CONSTRUIRE
function corrigerCompas(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/plie sa feuille/.test(t)) {
    uneSeuleJuste(q, (c) => /^la médiatrice de/.test(c), p);
    return p;
  }
  const L = t.match(/Il mesure (\d+(?:,\d+)?) cm/)?.[1];
  if (!L) return ["longueur illisible"];
  uneSeuleJuste(
    q,
    (c) => {
      const m = mesure(c);
      return Boolean(m && m.u === "cm" && m.v > num(L) / 2 && m.v <= num(L) * 1.5);
    },
    p,
  );
  return p;
}
function corrigerMilieu(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const m = t.match(/segment \[([A-Z])([A-Z])\] de (\d+(?:,\d+)?) (cm|m)\b/);
  if (!m) return ["longueur illisible"];
  if (!plausible({ v: num(m[3]), u: m[4] })) p.push("longueur peu plausible");
  verifierMesure(q, num(m[3]) / 2, m[4], p);
  return p;
}
function corrigerArcs(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  const L = t.match(/Il mesure (\d+(?:,\d+)?) cm/)?.[1];
  const x = t.match(/ouvre son compas de (\d+(?:,\d+)?) cm/)?.[1];
  if (L && x) {
    const [l, e] = [num(L), num(x)];
    juste = e > l / 2 ? (c) => /se coupent en deux points/.test(c) : egal(e, l / 2) ? (c) => /se touchent en un seul point/.test(c) : (c) => /ne se coupent pas/.test(c);
  } else if (/Pourquoi cela suffit-il/.test(t)) juste = (c) => /une seule droite/.test(c);
  else if (/MÊME écartement/.test(t)) juste = (c) => /égale distance/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// MEDIATRICE_PROBLEME
function corrigerCercle(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const O = t.match(/cercle de centre ([A-Z])/)?.[1];
  const corde = t.match(/\[([A-Z])([A-Z])\] est une corde/)?.slice(1, 3);
  if (!O || !corde || corde.includes(O)) return ["centre ou corde illisible"];
  const f = q.canvas && q.canvas.kind === "cercle" ? (q.canvas as CercleCanvasData) : null;
  if (f) {
    const lab = (id: string) => f.points?.find((x) => x.id === id);
    if (lab("O")?.label !== O || lab("P")?.label !== corde[0] || lab("Q")?.label !== corde[1]) p.push("figure : noms différents du texte");
    const cx = f.circle?.cx ?? 0;
    const cy = f.circle?.cy ?? 0;
    for (const id of ["P", "Q"]) {
      const pt = lab(id);
      if (pt && Math.abs(Math.hypot(pt.x - cx, pt.y - cy) - (f.circle?.r ?? 0)) > 2) p.push(`figure : ${pt.label} n’est pas sur le cercle`);
    }
  }
  const ray = t.match(/rayon mesure (\d+(?:,\d+)?) (cm|m)\b/);
  const dia = t.match(/diamètre mesure (\d+(?:,\d+)?) (cm|m)\b/);
  if (ray || dia) {
    const r = ray ? num(ray[1]) : num(dia![1]) / 2;
    const u = (ray ?? dia)![2];
    const fin = t.split(/(?<=[.?]) /).pop() ?? "";
    const dem = fin.match(/\b([A-Z])([A-Z])\b/);
    if (!dem || !dem.slice(1, 3).includes(O) || !dem.slice(1, 3).some((x) => corde.includes(x))) p.push("on ne demande pas la distance du centre à un point du cercle");
    verifierMesure(q, r, u, p);
  } else if (/isocèle\. En quel sommet/.test(t)) uneSeuleJuste(q, (c) => c === O, p);
  else if (/est-il sur la médiatrice/.test(t)) uneSeuleJuste(q, (c) => /^oui : .*deux rayons$/.test(c), p);
  else p.push("question non reconnue");
  return p;
}
function corrigerProbleme(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/même distance de (deux|les deux)/.test(t)) juste = (c) => /^n’importe où sur la médiatrice/.test(c);
  else if (/perdu son centre/.test(t)) juste = (c) => /deux cordes/.test(c) && /croisement/.test(c);
  else if (/égale distance de trois/.test(t)) juste = (c) => /croisement de deux médiatrices/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// MEDIATRICE_DEFI
function corrigerDefiDistances(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const eq2 = [...t.matchAll(/([A-Z])([A-Z]) = ([A-Z])([A-Z]) = (\d+) cm/g)];
  const ls = longueursNommees(t);
  let juste: (c: string) => boolean;
  if (eq2.length === 2) {
    // Deux points chacun à égale distance des extrémités : la droite qui les joint est la médiatrice.
    if (!eq2.every((m) => m[1] === m[3] && m[2] !== m[4])) return ["égalités illisibles"];
    if (eq2[0][1] === eq2[1][1]) p.push("les deux points sont le même");
    juste = (c) => /^la médiatrice de/.test(c);
  } else if (eq2.length === 1 && /milieu/.test(t)) juste = (c) => /^oui : .* sur la médiatrice$/.test(c);
  else if (Object.keys(ls).length === 2) {
    const [a, b] = Object.values(ls).map((x) => x.v);
    juste = egal(a, b) ? (c) => /^oui/.test(c) : (c) => /^non : .* différentes$/.test(c);
  } else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}
function corrigerDefiRaisons(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  const iso = t.match(/isocèle en ([A-Z]), avec ([A-Z])([A-Z]) = ([A-Z])([A-Z]) = \d+ cm/);
  if (iso) {
    if (iso[2] !== iso[1] || iso[4] !== iso[1]) p.push("les côtés égaux ne partent pas du sommet principal");
    juste = (c) => /^oui : .*égale distance/.test(c);
  } else if (/plie sa feuille le long de la médiatrice/.test(t)) juste = (c) => /vient se poser exactement sur/.test(c);
  else if (/Combien de médiatrices/.test(t)) juste = (c) => /^deux médiatrices suffisent/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  mediatrice_propriete_tpl_distance: corrigerDistance,
  mediatrice_propriete_tpl_1: corrigerTrajet,
  mediatrice_propriete_tpl_2: corrigerReciproque,
  mediatrice_propriete_tpl_ouverte: corrigerSens,
  mediatrice_construire_tpl_compas: corrigerCompas,
  mediatrice_construire_tpl_1: corrigerMilieu,
  mediatrice_construire_tpl_ouverte: corrigerArcs,
  mediatrice_probleme_tpl_1: corrigerCercle,
  mediatrice_probleme_tpl_ouverte: corrigerProbleme,
  mediatrice_defi_tpl_1: corrigerDefiDistances,
  mediatrice_defi_tpl_ouverte: corrigerDefiRaisons,
  mediatrice_definition_tpl_connaitre: corrigerDefinition,
  mediatrice_definition_tpl_figure: corrigerFigure,
  mediatrice_definition_tpl_1: corrigerMesures,
  mediatrice_definition_tpl_ouverte: corrigerRaisons,
};

export { mesure, verifierMesure, segmentDe, num, egal };
export type { CercleCanvasData };
