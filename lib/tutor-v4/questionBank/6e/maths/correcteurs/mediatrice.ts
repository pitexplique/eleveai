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
  else if (/Que sait-on de (?:cette droite|la médiatrice)|Comment (?:cette droite|la médiatrice de \[..\]) coupe|Où la médiatrice coupe/.test(t)) juste = (c) => /milieu/.test(c) && /angle droit/.test(c) && !/biais/.test(c);
  else if (/Combien de médiatrices|plusieurs médiatrices|a-t-il de médiatrices/.test(t)) juste = (c) => c === "une seule";
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
  const x = t.match(new RegExp(`avec ${E}([A-Z]) = (\\d+(?:,\\d+)?) cm`))?.[2];
  const ang = t.match(/[àÀ] (\d+)°/)?.[1];
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
  const K = t.match(/\b([A-Z])(?: est)?,? sur la médiatrice/)?.[1] ?? t.match(/\b([A-Z]) appartient à la médiatrice/)?.[1];
  if (!s || !K) return ["segment ou point illisible"];
  const ls = longueursNommees(t);
  const ks = Object.keys(ls);
  if (ks.length !== 1 || ks[0][0] !== K || !s.includes(ks[0][1])) return [...p, `donnée illisible : ${ks.join(", ")}`];
  if (!plausible(ls[ks[0]])) p.push("distance peu plausible");
  const Y = s.find((x) => x !== ks[0][1])!;
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  if (!fin.includes(`${K}${Y}`) && !fin.includes(`de ${Y} est`)) p.push(`on ne demande pas la distance ${K}${Y}`);
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
  if (!kE) return ["longueurs illisibles"];
  const a = kE[1].v;
  // Le trajet (07/11/2026) n'a plus besoin de EF ; s'il est écrit, il doit tenir.
  if (base && kE[1].u !== base.u) p.push("unités différentes");
  if (base && !(a > base.v / 2)) p.push(`${kE[0]} = ${a} trop court : le point serait sur le segment ou n’existerait pas`);
  if (/va de .* puis à/.test(t)) verifierMesure(q, Math.round(2 * a * 100) / 100, kE[1].u, p);
  else if (base && /périmètre (?:du triangle|de [A-Z]{3})/.test(t)) verifierMesure(q, Math.round((2 * a + base.v) * 100) / 100, base.u, p);
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
  else if (/([A-Z]{2}) = ([A-Z]{2})\. Que peut-(?:on|il|elle) en déduire/.test(t)) juste = (c) => /est sur la médiatrice/.test(c);
  else if (/(?:est sur|sur) la médiatrice de .*\. (?:Que peut-on en déduire|Quelle égalité est sûre)/.test(t)) juste = (c) => /^([A-Z])([A-Z]) = \1([A-Z])$/.test(c);
  else if (/n’est PAS sur la médiatrice|hors de la médiatrice/.test(t)) juste = (c) => c === "elles sont différentes";
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// MEDIATRICE_CONSTRUIRE
function corrigerCompas(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/[Pp]lie (?:sa|une|la) feuille/.test(t)) {
    uneSeuleJuste(q, (c) => /^la médiatrice de/.test(c), p);
    return p;
  }
  const L = t.match(/(?:mesure|[A-Z]{2} =) (\d+(?:,\d+)?) cm/)?.[1];
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

// =====================================================================
// ⭐ 07/11/2026 — les gabarits « d'autres questions » (voir mediatrice.bank.ts).
// Chacun reconnaît sa tournure ; une tournure inconnue est un défaut.

/** Vérifie la réponse d'un oui/non ou vrai/faux : la seule proposition juste. */
const reponseBool = (q: Q, v: boolean, p: string[], oui = "oui", non = "non") => uneSeuleJuste(q, (c) => c === (v ? oui : non), p);
const egalTexte = (q: Q, attendu: string, p: string[]) => uneSeuleJuste(q, (c) => c === attendu, p);

// ----- DEFINITION ★1
function corrigerDefVraiFaux(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let v: boolean;
  if (/passe par son milieu|est perpendiculaire à \[|coupe \[..\] en son milieu|coupe \[..\] à angle droit|est une droite/.test(t)) v = true;
  else if (/est parallèle à \[|passe par le point [A-Z]|est un segment|coupe \[..\] en biais/.test(t)) v = false;
  else return ["affirmation non reconnue"];
  reponseBool(q, v, p, "vrai", "faux");
  return p;
}
function corrigerDefCompleter(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/est … à \[/.test(t)) egalTexte(q, "perpendiculaire", p);
  else if (/passe par son …/.test(t)) egalTexte(q, "milieu", p);
  else if (/est une …/.test(t)) egalTexte(q, "droite", p);
  else if (/degrés/.test(t)) verifierMesure(q, 90, "°", p);
  else if (/sorte d’angle|forme quel angle/.test(t)) egalTexte(q, "un angle droit", p);
  else if (/Par quel point de|Quel point de/.test(t)) egalTexte(q, "son milieu", p);
  else return ["question non reconnue"];
  return p;
}
/** Les droites (d1), (d2), (d3) de la figure : perpendiculaire à [EF] ? par son milieu ? */
function lireTroisDroites(q: Q, E: string, F: string, p: string[]) {
  const f = q.canvas && q.canvas.kind === "droites" ? (q.canvas as DroitesCanvasData) : null;
  if (!f) return null;
  const e = f.points?.find((x) => x.label === E);
  const ff = f.points?.find((x) => x.label === F);
  if (!e || !ff) {
    p.push(`figure sans les points ${E} et ${F}`);
    return null;
  }
  const marques = f.markers?.rightAngles ?? [];
  return f.lines
    .filter((l) => /^\(d\d\)$/.test(l.label ?? ""))
    .map((l) => {
      const a = l.from as Pt;
      const b = l.to as Pt;
      const [ux, uy, vx, vy] = [b.x - a.x, b.y - a.y, ff.x - e.x, ff.y - e.y];
      const perp = Math.abs(ux * vx + uy * vy) / (Math.hypot(ux, uy) * Math.hypot(vx, vy)) < 0.02;
      const mil = Math.abs(ux * ((e.y + ff.y) / 2 - a.y) - uy * ((e.x + ff.x) / 2 - a.x)) / Math.hypot(ux, uy) < 1.5;
      if (perp !== marques.some((m) => m.lineB === l.id)) p.push(`figure : marque d’angle droit fausse sur ${l.label}`);
      return { label: l.label!, perp, mil };
    });
}
function corrigerDefTroisDroites(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = segmentDe(t) ?? (() => {
    // « Quelle droite passe par K sans angle droit ? » : le segment se lit sur la figure.
    const f = q.canvas as DroitesCanvasData | undefined;
    const pts = f?.points ?? [];
    return pts.length >= 2 ? [pts[0].label ?? "", pts[1].label ?? ""] : null;
  })();
  if (!s) return ["segment illisible"];
  const K = (q.canvas as DroitesCanvasData | undefined)?.points?.[2];
  const nomK = t.match(/\b([A-Z]) est le milieu/)?.[1] ?? t.match(/par ([A-Z]) sans|à côté de ([A-Z])/)?.slice(1).find(Boolean);
  if (nomK && K?.label !== nomK) p.push(`figure : le milieu s’appelle ${K?.label}, pas ${nomK}`);
  const ds = lireTroisDroites(q, s[0], s[1], p);
  if (!ds || ds.length !== 3) return [...p, "figure illisible"];
  let cherche: (d: { perp: boolean; mil: boolean }) => boolean;
  if (/médiatrice/.test(t)) cherche = (d) => d.perp && d.mil;
  else if (/en biais|sans angle droit/.test(t)) cherche = (d) => !d.perp && d.mil;
  else if (/loin du milieu|à côté de/.test(t)) cherche = (d) => d.perp && !d.mil;
  else return ["question non reconnue"];
  const justes = ds.filter(cherche);
  if (justes.length !== 1) return [...p, `${justes.length} droite(s) conviennent`];
  egalTexte(q, justes[0].label, p);
  return p;
}
/** « (d) est la médiatrice de [EF]. EF = 10 cm. Calcule EK » : le milieu, dans les deux sens. */
function corrigerNombreMilieu(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  const [E, F] = s;
  if (q.canvas) {
    const lu = lireDroites(q, E, F, p);
    if (!lu || !lu.perp || !lu.parMilieu) p.push("figure : (d) n’est pas la médiatrice");
  }
  if (/angle marqué/.test(t)) {
    verifierMesure(q, 90, "°", p);
    return p;
  }
  const estEF = (x: string) => x === E + F || x === F + E;
  const seg = t.match(/\[[A-Z]{2}\] mesure (\d+(?:,\d+)?) cm/)?.[1];
  const ls = longueursNommees(t);
  const donnees = Object.entries(ls);
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  const cible = fin.match(/\b([A-Z]{2})\b/)?.[1];
  if (!cible) return [...p, "longueur demandée illisible"];
  let L: number;
  if (seg) L = num(seg);
  else if (donnees.length === 1) L = estEF(donnees[0][0]) ? donnees[0][1].v : 2 * donnees[0][1].v;
  else return [...p, "donnée illisible"];
  if (!estEF(cible) && !cible.includes(E) && !cible.includes(F)) p.push(`${cible} n’est pas une moitié de [${E}${F}]`);
  verifierMesure(q, estEF(cible) ? L : L / 2, "cm", p);
  return p;
}
function corrigerDefNom(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/conditions/.test(t)) {
    egalTexte(q, "2", p);
    return p;
  }
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  if (/perpendiculaire à \[..\] (?:en|par) son milieu|coupe \[..\] en son milieu, à angle droit/i.test(t)) egalTexte(q, `la médiatrice de [${s[0]}${s[1]}]`, p);
  else return ["description non reconnue"];
  return p;
}

// ----- DEFINITION ★2
function corrigerDefLireFigure(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = segmentDe(t);
  const f = q.canvas as DroitesCanvasData | undefined;
  const E = s?.[0] ?? f?.points?.[0]?.label;
  const F = s?.[1] ?? f?.points?.[1]?.label;
  if (!E || !F) return ["segment illisible"];
  const lu = lireDroites(q, E, F, p);
  if (!lu) return [...p, "figure illisible"];
  const K = t.match(/\b([A-Z]) est le milieu/)?.[1];
  if (K) {
    const m = lu.pt(K);
    const [e, ff] = [lu.pt(E)!, lu.pt(F)!];
    if (!m || Math.abs(m.x - (e.x + ff.x) / 2) > 1 || Math.abs(m.y - (e.y + ff.y) / 2) > 1) p.push(`figure : ${K} n’est pas au milieu`);
  }
  if (/manque-t-il|encore à/.test(t)) {
    uneSeuleJuste(
      q,
      (c) => {
        if (/^rien/.test(c)) return lu.perp && lu.parMilieu;
        if (/^passer par/.test(c)) return lu.perp && !lu.parMilieu;
        if (/^être perpendiculaire/.test(c)) return !lu.perp && lu.parMilieu;
        if (/^les deux/.test(c)) return !lu.perp && !lu.parMilieu;
        return false;
      },
      p,
    );
  } else if (/perpendiculaire à|angle droit avec/.test(t)) reponseBool(q, lu.perp, p);
  else if (/passe-t-elle par|coupe-t-elle/.test(t)) reponseBool(q, lu.parMilieu, p);
  else return [...p, "question non reconnue"];
  return p;
}
/** Une droite décrite par son angle et sa position : est-ce la médiatrice ? */
function milieuDecrit(t: string): boolean | null {
  if (/pas en son milieu|à côté de son milieu|, en [A-Z]\./.test(t)) return false;
  if (/en son milieu/.test(t)) return true;
  const eg = t.match(/en ([A-Z]), à \d+°, avec ([A-Z])([A-Z]) = ([A-Z])([A-Z])/);
  if (eg && eg[3] === eg[1] && eg[4] === eg[1] && eg[2] !== eg[5]) return true;
  return null;
}
function corrigerDefMesuresCourtes(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const ang = t.match(/[àÀ] (\d+)°/)?.[1];
  const mil = milieuDecrit(t);
  if (!ang || mil === null) return ["angle ou position illisible"];
  reponseBool(q, num(ang) === 90 && mil, p);
  return p;
}
function corrigerDefCombien(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let a: string;
  if (/droites passent par le milieu de|droites sont perpendiculaires à/.test(t)) a = "une infinité";
  else if (/droites perpendiculaires à \[..\] passent par son milieu|médiatrices a|droites passent par [A-Z] et sont perpendiculaires/.test(t)) a = "une seule";
  else if (/milieux a|points de \[..\] sont sur sa médiatrice|points communs/.test(t)) a = "un seul";
  else return ["question non reconnue"];
  egalTexte(q, a, p);
  return p;
}
const defVraie = (c: string): boolean | null => {
  if (/^elle passe par le milieu|^elle est perpendiculaire|^elle coupe \[..\] à angle droit|^c’est une droite/.test(c)) return true;
  if (/^elle passe par [A-Z]$|^elle est parallèle|^c’est un segment|^elle coupe \[..\] en biais/.test(c)) return false;
  return null;
};
function corrigerDefManque(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/Une droite passe par le milieu de \[..\]\. Que/.test(t)) uneSeuleJuste(q, (c) => /^être perpendiculaire/.test(c), p);
  else if (/Une droite est perpendiculaire à \[..\]\. Que/.test(t)) uneSeuleJuste(q, (c) => /^passer par le milieu/.test(c), p);
  else if (/passe par [A-Z] et est perpendiculaire|en biais\. Est-ce/.test(t)) reponseBool(q, false, p);
  else if (/est perpendiculaire à \[..\], en son milieu\. Est-ce/.test(t)) reponseBool(q, true, p);
  else if (/phrase (?:est )?vraie/.test(t)) uneSeuleJuste(q, (c) => defVraie(c) === true, p);
  else if (/phrase (?:est )?fausse|Trouve l’erreur/.test(t)) uneSeuleJuste(q, (c) => defVraie(c) === false, p);
  else return ["question non reconnue"];
  if (/phrase|erreur/.test(t) && (q.choices ?? []).some((c) => defVraie(c) === null)) p.push("proposition non reconnue");
  return p;
}

// ----- DEFINITION ★3
function corrigerDefSituation(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const ang = t.match(/à (\d+)°/)?.[1];
  const mil = milieuDecrit(t);
  if (!ang || mil === null) return ["angle ou position illisible"];
  const est = num(ang) === 90 && mil;
  if (/Que représente/.test(t)) {
    if (!est) p.push("on demande ce que représente une droite qui n’est pas la médiatrice");
    egalTexte(q, "sa médiatrice", p);
  } else if (/médiatrice/.test(t)) reponseBool(q, est, p);
  else return ["question non reconnue"];
  return p;
}
function corrigerDefSituationCalcul(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = segmentDe(t);
  if (!s || !/est la médiatrice de/.test(t)) return ["segment illisible"];
  const coupe = t.match(/coupe \[..\] à (\d+(?:,\d+)?) m de ([A-Z])/);
  if (coupe) {
    if (!/Combien mesure [A-Z]{2}|longueur de \[|Calcule [A-Z]{2}/.test(t)) p.push("question non reconnue");
    verifierMesure(q, 2 * num(coupe[1]), "m", p);
    return p;
  }
  if (/Quel angle/.test(t)) {
    verifierMesure(q, 90, "°", p);
    return p;
  }
  const L = longueursNommees(t)[s[0] + s[1]];
  if (!L || !/distance de [A-Z] coupe-t-elle|combien de [A-Z] coupe-t-elle/.test(t)) return [...p, "question non reconnue"];
  verifierMesure(q, L.v / 2, L.u, p);
  return p;
}

// ----- PROPRIETE ★2
function corrigerPropDeduire(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  const K = t.match(/\b([A-Z]) (?:est sur|appartient à) la médiatrice/)?.[1];
  if (!s || !K) return ["segment ou point illisible"];
  const dem = t.match(/égale à ([A-Z])([A-Z])/);
  if (dem) {
    if (dem[1] !== K || !s.includes(dem[2])) p.push("longueur demandée illisible");
    const Y = s.find((x) => x !== dem[2]);
    if (q.comparator !== "exact_text" || !q.expected.includes(`${K}${Y}`) || !q.expected.includes(`${Y}${K}`)) p.push(`il faut accepter ${K}${Y} et ${Y}${K}`);
    return p;
  }
  if (!/en déduire|égalité est vraie|Que sait-on/.test(t)) return ["question non reconnue"];
  egalTexte(q, `${K}${s[0]} = ${K}${s[1]}`, p);
  return p;
}
function corrigerPropReciproqueCourte(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const vs = Object.values(longueursNommees(t));
  if (vs.length === 2) {
    reponseBool(q, egal(vs[0].v, vs[1].v), p);
    return p;
  }
  if (/[A-Z]{2} = [A-Z]{2}\. Où|de [A-Z]{2} = [A-Z]{2} pour|égale distance de|aussi près de/.test(t)) uneSeuleJuste(q, (c) => /^sur la médiatrice de/.test(c), p);
  else return ["question non reconnue"];
  return p;
}
function corrigerPropFigure(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = segmentDe(t);
  if (!s) return ["segment illisible"];
  const [E, F] = s;
  const lu = lireDroites(q, E, F, p);
  if (!lu || !lu.perp || !lu.parMilieu) return [...p, "figure : (d) n’est pas la médiatrice"];
  const dist = (l: string) => {
    const a = lu.pt(l);
    const [e, ff] = [lu.pt(E)!, lu.pt(F)!];
    return a ? Math.abs(Math.hypot(a.x - e.x, a.y - e.y) - Math.hypot(a.x - ff.x, a.y - ff.y)) : null;
  };
  const ls = longueursNommees(t);
  const donnees = Object.keys(ls);
  if (donnees.length === 1) {
    const K = donnees[0][0];
    const d = dist(K);
    if (d === null || d > 1) p.push(`figure : ${K} n’est pas sur (d)`);
    const fin = t.split(/(?<=[.?]) /).pop() ?? "";
    if (!fin.includes(K + (donnees[0][1] === E ? F : E))) p.push("on ne demande pas l’autre distance");
    verifierMesure(q, ls[donnees[0]].v, ls[donnees[0]].u, p);
    return p;
  }
  if (/Quel point est/.test(t)) {
    uneSeuleJuste(q, (c) => /^[A-Z]$/.test(c) && (dist(c) ?? 99) < 1, p);
    return p;
  }
  const K = t.match(/\b([A-Z]) est-il à égale distance/)?.[1] ?? t.match(/A-t-on ([A-Z])[A-Z] =/)?.[1];
  if (!K) return [...p, "question non reconnue"];
  const d = dist(K);
  if (d === null) return [...p, `figure sans ${K}`];
  reponseBool(q, d < 1, p);
  return p;
}
function corrigerPropSommeTriangle(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = t.match(/(?:médiatrice de )\[([A-Z])([A-Z])\]/)?.slice(1, 3);
  const iso = t.match(/isocèle en ([A-Z])\./)?.[1];
  if (iso) {
    const c = (q.choices ?? []).find((x) => /^sur la médiatrice de/.test(x));
    if (!c) return ["pas de proposition « sur la médiatrice »"];
    const m = c.match(/\[([A-Z])([A-Z])\]/);
    if (!m || m[1] === iso || m[2] === iso) p.push("la médiatrice n’est pas celle du côté opposé");
    egalTexte(q, c, p);
    return p;
  }
  const K = t.match(/\b([A-Z]) est sur la médiatrice/)?.[1];
  if (!s || !K) return ["segment ou point illisible"];
  const somme = t.match(/([A-Z])([A-Z]) \+ ([A-Z])([A-Z]) = (\d+) cm/);
  if (somme) {
    verifierMesure(q, num(somme[5]) / 2, "cm", p);
    return p;
  }
  const ls = longueursNommees(t);
  const u = Object.values(ls);
  if (u.length === 1 && /\+/.test(t)) {
    verifierMesure(q, 2 * u[0].v, u[0].u, p);
    return p;
  }
  if (/nature du triangle|Comment est le triangle/.test(t)) {
    egalTexte(q, `isocèle en ${K}`, p);
    return p;
  }
  return ["question non reconnue"];
}
function corrigerPropVraiFaux(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let v: boolean;
  if (/si [A-Z]{2} = [A-Z]{2}, [A-Z] est sur la médiatrice|alors ([A-Z])[A-Z] = \1[A-Z]|le milieu de \[..\] est à égale distance/i.test(t) && !/\+/.test(t)) v = true;
  else if (/si [A-Z]{2} = [A-Z]{2}, [A-Z] est le milieu|, [A-Z] est sur \[|alors [A-Z]{2} \+|tout point de la médiatrice de \[..\] est sur/i.test(t)) v = false;
  else return ["affirmation non reconnue"];
  reponseBool(q, v, p, "vrai", "faux");
  return p;
}

// ----- PROPRIETE ★5
function corrigerPropPerimetre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  if (!s) return ["segment illisible"];
  const [E, F] = s;
  const per = t.match(/(?:périmètre|tour)[^.]*?(\d+) (cm|m)\b/);
  const ls = longueursNommees(t);
  if (per && ls[E + F]) {
    const [P, b] = [num(per[1]), ls[E + F].v];
    if (per[2] !== ls[E + F].u) p.push("unités différentes");
    const a = (P - b) / 2;
    if (!(2 * a > b)) p.push("le triangle n’existe pas");
    const fin = t.split(/(?<=[.?]) /).pop() ?? "";
    if (!/\b[A-Z][A-Z]\b/.test(fin)) p.push("longueur demandée illisible");
    verifierMesure(q, a, per[2], p);
    return p;
  }
  const dem = /de part et d’autre/.test(t);
  const d = Object.entries(ls);
  if (!dem || d.length !== 2) return [...p, "question non reconnue"];
  const [a, c] = [d[0][1].v, d[1][1].v];
  if (/périmètre/.test(t)) verifierMesure(q, 2 * (a + c), "cm", p);
  else if (/[A-Z]{2} \+ [A-Z]{2}/.test(t)) verifierMesure(q, a + c, "cm", p);
  else return [...p, "question non reconnue"];
  return p;
}
function corrigerPropCote(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const cote = t.match(/du côté de ([A-Z]) par rapport|dans la partie qui contient ([A-Z])/);
  if (cote) {
    const C = cote[1] ?? cote[2];
    const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
    const K = t.match(/([A-Z]) est (?:du côté|dans la partie)/)?.[1];
    if (!s || !K || !s.includes(C)) return ["côté illisible"];
    const autre = s.find((x) => x !== C);
    egalTexte(q, `${K}${C} < ${K}${autre}`, p);
    return p;
  }
  const nommees = longueursNommees(t);
  let E: string, F: string, dE: number, dF: number;
  const ecrit = t.match(/([A-Z]) est à (\d+) cm de ([A-Z]) et à (\d+) cm de ([A-Z])/);
  if (ecrit) [E, dE, F, dF] = [ecrit[3], num(ecrit[2]), ecrit[5], num(ecrit[4])];
  else {
    const c = Object.entries(nommees);
    if (c.length !== 2) return ["distances illisibles"];
    [E, dE, F, dF] = [c[0][0][1], c[0][1].v, c[1][0][1], c[1][1].v];
  }
  if (egal(dE, dF)) return ["les distances sont égales : il n’y a pas de côté"];
  const pres = dE < dF ? E : F;
  if (/De quel côté|Où est/.test(t)) egalTexte(q, `du côté de ${pres}`, p);
  else if (/plus près|plus proche/.test(t)) egalTexte(q, `de ${pres}`, p);
  else return ["question non reconnue"];
  return p;
}
function corrigerPropTableau(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = t.match(/médiatrice de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  if (!s) return ["segment illisible"];
  const ls = longueursNommees(t);
  const parPoint = new Map<string, number[]>();
  for (const [k, v] of Object.entries(ls)) {
    if (!s.includes(k[1])) return [`${k} ne va pas vers une extrémité`];
    parPoint.set(k[0], [...(parPoint.get(k[0]) ?? []), v.v]);
  }
  if (parPoint.size !== 3 || [...parPoint.values()].some((x) => x.length !== 2)) return ["il faut deux distances pour trois points"];
  const sur = [...parPoint.entries()].filter(([, v]) => egal(v[0], v[1])).map(([n]) => n);
  const hors = [...parPoint.keys()].filter((n) => !sur.includes(n));
  if (/Combien de ces points|combien de ces points/.test(t)) {
    if (num(q.expected[0]) !== sur.length) p.push(`réponse ${q.expected[0]}, recomptée ${sur.length}`);
  } else if (/n’est PAS sur|hors de/.test(t)) {
    if (hors.length !== 1) return [`${hors.length} points hors de la médiatrice`];
    egalTexte(q, hors[0], p);
  } else if (/Quel point (?:est sur|appartient)/.test(t)) {
    if (sur.length !== 1) return [`${sur.length} points sur la médiatrice`];
    egalTexte(q, sur[0], p);
  } else return ["question non reconnue"];
  return p;
}
function corrigerPropCercle(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/\bse coupent en\b|coupe en [A-Z]/.test(t) && /est-il sur la médiatrice/.test(t)) {
    const rs = [...t.matchAll(/rayon (\d+) cm/g)].map((m) => num(m[1]));
    const memes = /même rayon|Deux cercles de rayon/.test(t) || (rs.length === 2 && egal(rs[0], rs[1]));
    uneSeuleJuste(q, (c) => (memes ? /^oui : .*deux rayons/.test(c) : /^non : .* différentes$/.test(c)), p);
    return p;
  }
  if (/Où se trouve|Sur quelle droite/.test(t)) uneSeuleJuste(q, (c) => /^sur la médiatrice de/.test(c), p);
  else if (/[A-Z]{2} \+ [A-Z]{2}/.test(t)) {
    const r = t.match(/rayon (\d+) cm/)?.[1];
    if (!r) return ["rayon illisible"];
    verifierMesure(q, 2 * num(r), "cm", p);
  } else if (/Passe-t-il par|est-il sur ce cercle/.test(t)) reponseBool(q, true, p);
  else return ["question non reconnue"];
  return p;
}
function corrigerPropArgument(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const s = t.match(/médiatrices? de \[([A-Z])([A-Z])\]/)?.slice(1, 3);
  if (/Pour prouver|Quelle égalité prouve/.test(t)) {
    const K = t.match(/que ([A-Z]) est sur/)?.[1];
    if (!s || !K) return ["segment ou point illisible"];
    egalTexte(q, `${K}${s[0]} = ${K}${s[1]}`, p);
  } else if (/mesurer/.test(t)) uneSeuleJuste(q, (c) => /^les distances/.test(c), p);
  else if (/aussi sur le segment|à la fois sur/.test(t)) uneSeuleJuste(q, (c) => /est le milieu de/.test(c), p);
  else if (/Compare|Que peut-on dire de/.test(t)) {
    // Sur les deux médiatrices : KE = KF et KF = KG, donc KE = KG.
    const m = t.match(/([A-Z]{2}) et ([A-Z]{2})(?: \?|\.)$/);
    if (!m || m[1][0] !== m[2][0]) return ["longueurs à comparer illisibles"];
    egalTexte(q, `${m[1]} = ${m[2]}`, p);
  } else if (/Que représente|Quelle est la droite/.test(t)) uneSeuleJuste(q, (c) => /^la médiatrice de/.test(c), p);
  else return ["question non reconnue"];
  return p;
}

// ----- CONSTRUIRE ★2
function corrigerConsOutils(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/Pour mesurer|mesure la longueur|le milieu de \[..\]/.test(t) && !/l’angle droit/.test(t)) egalTexte(q, "la règle graduée", p);
  else if (/l’angle droit/.test(t)) egalTexte(q, "l’équerre", p);
  else if (/même écartement|trace des arcs/.test(t)) egalTexte(q, "le compas", p);
  else if (/Sans compas/.test(t)) egalTexte(q, "la règle graduée et l’équerre", p);
  else if (/combien de fois change-t-on/.test(t)) egalTexte(q, "jamais", p);
  else return ["question non reconnue"];
  return p;
}
function corrigerConsEtapes(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/en premier|Que marque-t-on d’abord/.test(t)) uneSeuleJuste(q, (c) => /^le milieu de/.test(c), p);
  else if (/Le milieu de \[..\] est (?:marqué|placé)/.test(t)) uneSeuleJuste(q, (c) => /^la perpendiculaire à .* en ce point$/.test(c), p);
  else if (/partent les arcs/.test(t)) uneSeuleJuste(q, (c) => /^de [A-Z] et de [A-Z]$/.test(c), p);
  else if (/Que fait-on ensuite/.test(t)) egalTexte(q, "on joint ces deux points", p);
  else if (/garde-t-on identique|Que ne change-t-on pas/.test(t)) egalTexte(q, "l’écartement", p);
  else if (/combien de points|Combien de points/.test(t)) egalTexte(q, "2", p);
  else if (/Qu’obtient-on|Quelle droite joint/.test(t)) uneSeuleJuste(q, (c) => /^la médiatrice de/.test(c), p);
  else return ["question non reconnue"];
  return p;
}
function corrigerConsMilieuNombre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const direct = t.match(/(?:\[..\] mesure|[A-Z]{2} =) (\d+(?:,\d+)?) cm\./)?.[1];
  if (direct && /équerre|milieu/.test(t)) {
    verifierMesure(q, num(direct) / 2, "cm", p);
    return p;
  }
  const x = t.match(/à (\d+) cm de [A-Z]/)?.[1];
  if (!x || !/milieu/.test(t)) return [...p, "question non reconnue"];
  verifierMesure(q, 2 * num(x), "cm", p);
  return p;
}
function corrigerConsEcartement(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const moitie = t.match(/L’écartement (vaut la moitié|vaut moins que la moitié|vaut plus que la moitié) de/)?.[1];
  if (moitie) {
    egalTexte(q, moitie === "vaut la moitié" ? "1" : moitie.includes("moins") ? "0" : "2", p);
    return p;
  }
  const L = t.match(/(?:\[..\] mesure|[A-Z]{2} =) (\d+) cm\./)?.[1];
  if (!L) return ["longueur illisible"];
  const demi = num(L) / 2;
  const x = t.match(/(?:écartement de|Avec|en ouvrant de) (\d+) cm/)?.[1];
  if (x) {
    if (egal(num(x), demi)) p.push("écartement égal à la moitié : oui ou non serait discutable");
    reponseBool(q, num(x) > demi, p);
  } else if (/dépasser|plus grand que/.test(t)) verifierMesure(q, demi, "cm", p);
  else if (/trop petit|ne convient pas|ne se coupent-ils pas/.test(t))
    uneSeuleJuste(
      q,
      (c) => {
        const m = mesure(c);
        return Boolean(m && m.v <= demi);
      },
      p,
    );
  else return ["question non reconnue"];
  return p;
}
function corrigerConsArcs(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const f = q.canvas && q.canvas.kind === "droites" ? (q.canvas as DroitesCanvasData) : null;
  if (!f || !f.points || f.points.length !== 4) return ["figure illisible"];
  const [e, ff, s1, s2] = f.points;
  const mx = (e.x + ff.x) / 2;
  if (Math.abs(s1.x - mx) > 1 || Math.abs(s2.x - mx) > 1) p.push("figure : les points d’intersection ne sont pas sur la médiatrice");
  if (f.lines.some((l) => l.id !== "AB")) p.push("figure : elle ne doit pas tracer la médiatrice");
  const [S, T] = [s1.label, s2.label];
  if (/Que représente|Qu’est-ce que/.test(t)) uneSeuleJuste(q, (c) => /^la médiatrice de/.test(c), p);
  else if (/Quelle droite/.test(t)) egalTexte(q, `(${S}${T})`, p);
  else {
    const e2 = t.match(/(?:Écartement de|Compas ouvert de|[A-Z]{2} =|est à) (\d+) cm/)?.[1];
    if (!e2) return [...p, "écartement illisible"];
    if (/[A-Z]{2} \+ [A-Z]{2}/.test(t)) verifierMesure(q, 2 * num(e2), "cm", p);
    else if (/Combien mesure|Trouve|à combien de/.test(t)) verifierMesure(q, num(e2), "cm", p);
    else return [...p, "question non reconnue"];
  }
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  mediatrice_definition_tpl_vrai_faux: corrigerDefVraiFaux,
  mediatrice_definition_tpl_completer: corrigerDefCompleter,
  mediatrice_definition_tpl_trois_droites: corrigerDefTroisDroites,
  mediatrice_definition_tpl_nombre: corrigerNombreMilieu,
  mediatrice_definition_tpl_nom: corrigerDefNom,
  mediatrice_definition_tpl_lire_figure: corrigerDefLireFigure,
  mediatrice_definition_tpl_mesures_courtes: corrigerDefMesuresCourtes,
  mediatrice_definition_tpl_nombre_k: corrigerNombreMilieu,
  mediatrice_definition_tpl_combien: corrigerDefCombien,
  mediatrice_definition_tpl_manque: corrigerDefManque,
  mediatrice_definition_tpl_situation: corrigerDefSituation,
  mediatrice_definition_tpl_situation_calcul: corrigerDefSituationCalcul,
  mediatrice_propriete_tpl_deduire: corrigerPropDeduire,
  mediatrice_propriete_tpl_reciproque_courte: corrigerPropReciproqueCourte,
  mediatrice_propriete_tpl_figure: corrigerPropFigure,
  mediatrice_propriete_tpl_somme_triangle: corrigerPropSommeTriangle,
  mediatrice_propriete_tpl_vrai_faux: corrigerPropVraiFaux,
  mediatrice_propriete_tpl_perimetre: corrigerPropPerimetre,
  mediatrice_propriete_tpl_cote: corrigerPropCote,
  mediatrice_propriete_tpl_tableau: corrigerPropTableau,
  mediatrice_propriete_tpl_cercle: corrigerPropCercle,
  mediatrice_propriete_tpl_argument: corrigerPropArgument,
  mediatrice_construire_tpl_outils: corrigerConsOutils,
  mediatrice_construire_tpl_etapes: corrigerConsEtapes,
  mediatrice_construire_tpl_milieu_nombre: corrigerConsMilieuNombre,
  mediatrice_construire_tpl_ecartement: corrigerConsEcartement,
  mediatrice_construire_tpl_arcs: corrigerConsArcs,
  mediatrice_propriete_tpl_distance: corrigerDistance,
  mediatrice_propriete_tpl_distance_situation: corrigerDistance,
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
