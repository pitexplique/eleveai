import type { CorrecteursMaths } from "./types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { coordonneesFigure, degresDe, longueursDe, perpendiculaireSurFigure, reponseDegres, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { num } from "./grandeurs";
import { longueurNommee, texteLu } from "../outils-insecables";

// LES CORRECTEURS DE tangente-cercle.bank.ts (06/11/2026) : ils relisent le centre, le point
// de contact et les longueurs dans le TEXTE, et mesurent SUR LA FIGURE les distances et les
// angles droits. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const fig = (q: Q) => q.canvas as ConstructionCanvasData;
const centreDe = (t: string) => t.match(/(?:de|pour) centre ([A-Z])/)?.[1];
const contactDe = (t: string) => t.match(/\ben ([A-Z])\b/)?.[1];
const ligneDe = (t: string) => t.match(/\((?:d₁|d|Δ|D)\)/)?.[0];

/** Le contrôle commun : le point de contact est sur le cercle, à angle droit du rayon. */
function tangenteSurFigure(q: Q, O: string, T: string): string[] {
  const f = fig(q);
  const c = f?.cercles?.[0];
  const [po, pt] = coordonneesFigure(q, [O, T]);
  if (!c || !po || !pt) return ["cercle illisible sur la figure"];
  const p: string[] = [];
  if (c.centre !== O) p.push("le centre du cercle n’est pas le centre annoncé");
  if (Math.abs(Math.hypot(po.x - pt.x, po.y - pt.y) - c.rayon) > 1e-9) p.push("le point de contact n’est pas sur le cercle");
  const d = f.droites?.[0];
  if (d && !perpendiculaireSurFigure(q, O, T, d.a, d.b)) p.push("la droite n’est pas perpendiculaire au rayon sur la figure");
  return p;
}

function angleDroit(q: Q) {
  const t = texteLu(q);
  const [O, T] = [centreDe(t), contactDe(t)];
  if (!O || !T) return ["centre ou contact illisible"];
  return [...tangenteSurFigure(q, O, T), ...reponseDegres(q, 90)];
}

function perpendiculaires(q: Q) {
  const t = texteLu(q);
  const [O, T, d] = [centreDe(t), contactDe(t), ligneDe(t)];
  if (!O || !T || !d) return ["configuration illisible"];
  return [...tangenteSurFigure(q, O, T), ...reponseQcm(q, `${d} et (${O}${T}) sont perpendiculaires`)];
}

const unSeulPoint = (q: Q) => (/tangente/.test(q.text) ? reponseQcm(q, "Un seul point") : ["le texte ne parle pas de tangente"]);

/** La droite nommée sur la figure : son texte, et ses deux points. */
const nommees = (q: Q) => (fig(q)?.segments ?? []).filter((s) => s.sansTrait);

function troisDroitesParT(q: Q) {
  const t = texteLu(q);
  const O = centreDe(t) ?? t.match(/\[([A-Z])[A-Z]\]/)?.[1];
  const T = fig(q)?.segments?.find((s) => !s.sansTrait)?.b;
  if (!O || !T) return ["figure illisible"];
  const justes = nommees(q).filter((s) => perpendiculaireSurFigure(q, s.a, s.b, O, T));
  return justes.length === 1 ? reponseQcm(q, justes[0].texte!) : [`${justes.length} droite(s) tangente(s) sur la figure`];
}

/** Pythagore rectangle en T : deux longueurs nommées données, on rend la troisième. */
function pythagoreTangente(q: Q) {
  const t = texteLu(q);
  const [O, T] = [centreDe(t), contactDe(t)];
  const M = [...new Set([...t.matchAll(/\b([A-Z])([A-Z]) = /g)].flatMap((m) => [m[1], m[2]]))].find((x) => x !== O && x !== T);
  if (!O || !T || !M) return ["points illisibles"];
  const [r, x, h] = [longueurNommee(t, `${O}${T}`), longueurNommee(t, `${T}${M}`), longueurNommee(t, `${O}${M}`)];
  const u = (r ?? x ?? h)?.u;
  if (!u) return ["longueurs illisibles"];
  const juste = !h ? Math.hypot(r!.v, x!.v) : !x ? Math.sqrt(h.v ** 2 - r!.v ** 2) : Math.sqrt(h.v ** 2 - x.v ** 2);
  return [...tangenteSurFigure(q, O, T), ...reponseLongueur(q, juste, u)];
}

function reciproquePythagore(q: Q) {
  const t = texteLu(q);
  const O = centreDe(t);
  const [, T] = t.match(/\b([A-Z]) est un point du cercle/) ?? t.match(/passe par ([A-Z])/) ?? [];
  const M = t.match(/\(([A-Z])([A-Z])\)/)?.[2];
  if (!O || !T || !M) return ["points illisibles"];
  const [r, x, h] = [longueurNommee(t, `${O}${T}`), longueurNommee(t, `${T}${M}`), longueurNommee(t, `${O}${M}`)];
  if (!r || !x || !h) return ["longueurs illisibles"];
  const vrai = r.v ** 2 + x.v ** 2 === h.v ** 2;
  const f = perpendiculaireSurFigure(q, O, T, T, M) === vrai ? [] : ["la figure contredit les longueurs"];
  return [...f, ...reponseQcm(q, vrai ? `Oui, car le triangle ${O}${T}${M} est rectangle en ${T}` : `Non, car le triangle ${O}${T}${M} n’est pas rectangle en ${T}`)];
}

/** Dans l'ordre : rayon, puis hypoténuse. */
function deuxLongueurs(f: (a: number, b: number) => number) {
  return (q: Q) => {
    const [a, b] = longueursDe(texteLu(q));
    return a && b ? reponseLongueur(q, f(a.v, b.v), a.u) : ["longueurs illisibles"];
  };
}

function angleComplementaire(q: Q) {
  const t = texteLu(q);
  const a = degresDe(t)[0];
  const angles = [...t.matchAll(/\\widehat\{([A-Z]{3})\}/g)].map((m) => m[1]);
  if (a == null || angles.length < 2) return ["angles illisibles"];
  const [T, O, M] = angles[0].split("");
  const [po, pt, pm] = coordonneesFigure(q, [O, T, M]);
  if (!po || !pt || !pm) return ["figure illisible"];
  const figure = (Math.atan2(Math.hypot(pt.x - pm.x, pt.y - pm.y), Math.hypot(po.x - pt.x, po.y - pt.y)) * 180) / Math.PI;
  const f = Math.abs(figure - a) < 1e-6 ? [] : [`la figure montre ${figure}° au lieu de ${a}°`];
  return [...f, ...tangenteSurFigure(q, O, T), ...(angles[1] === `${T}${M}${O}` ? [] : ["l’angle demandé n’est pas en M"]), ...reponseDegres(q, 90 - a)];
}

function deuxTangentes(q: Q) {
  const t = texteLu(q);
  const O = centreDe(t);
  const nom = t.match(/(?:quadrilatère |de )([A-Z]{4})\b/)?.[1];
  if (!O || !nom) return ["quadrilatère illisible"];
  const [, T, M] = nom.split("");
  const [r, h] = [longueurNommee(t, `${O}${T}`), longueurNommee(t, `${O}${M}`)];
  if (!r || !h) return ["longueurs illisibles"];
  const S = nom[3];
  const [pm, pt, ps] = coordonneesFigure(q, [M, T, S]);
  const egaux = pm && pt && ps && Math.abs(Math.hypot(pm.x - pt.x, pm.y - pt.y) - Math.hypot(pm.x - ps.x, pm.y - ps.y)) < 1e-9 ? [] : ["les deux tangentes n’ont pas la même longueur sur la figure"];
  const x = Math.sqrt(h.v ** 2 - r.v ** 2);
  return [...egaux, ...(perpendiculaireSurFigure(q, O, T, T, M) ? [] : ["pas d’angle droit en T sur la figure"]), ...reponseLongueur(q, 2 * (r.v + x), r.u)];
}

/* ===== Position ===== */

const SEC = (d: string) => `${d} coupe le cercle en deux points`;
const TAN = (d: string) => `${d} est tangente au cercle`;
const EXT = (d: string) => `${d} ne touche pas le cercle`;
const posQcm = (q: Q, dist: number, r: number, d: string) => reponseQcm(q, dist < r ? SEC(d) : dist === r ? TAN(d) : EXT(d));

/** Le rayon est la longueur qui suit « rayon », la distance est l'autre. */
function rayonEtDistance(t: string) {
  const l = longueursDe(t);
  if (l.length !== 2) return null;
  const parRayon = t.match(/rayon (?:de )?(\d+(?:,\d+)?) ?(?:mm|cm|dm|km|m)/);
  if (!parRayon) return null;
  const r = num(parRayon[1]);
  const dist = l.map((x) => x.v).find((v, i, tab) => !(v === r && i === tab.indexOf(r)));
  return dist == null ? { r, dist: r } : { r, dist };
}

function positionRayonDistance(q: Q) {
  const t = texteLu(q);
  const lu = rayonEtDistance(t);
  const d = ligneDe(t);
  return lu && d ? posQcm(q, lu.dist, lu.r, d) : ["rayon ou distance illisible"];
}

function nombrePoints(q: Q) {
  const lu = rayonEtDistance(texteLu(q));
  if (!lu) return ["rayon ou distance illisible"];
  const nb = lu.dist < lu.r ? 2 : lu.dist === lu.r ? 1 : 0;
  return String(q.expected[0]) === String(nb) ? [] : [`attendu ${q.expected[0]}, juste ${nb}`];
}

function tangenteEgalite(q: Q) {
  const l = longueursDe(texteLu(q));
  return l.length === 1 && /tangente/.test(q.text) ? reponseLongueur(q, l[0].v, l[0].u) : ["une longueur et une tangente attendues"];
}

function troisPositions(q: Q) {
  const t = texteLu(q);
  const f = fig(q);
  const c = f?.cercles?.[0];
  const O = c ? f.points.find((p) => p.id === c.centre) : undefined;
  if (!c || !O) return ["figure illisible"];
  const voulu = /tangente|un seul point/.test(t) ? 0 : /deux points|traverse/.test(t) ? -1 : 1;
  const justes = nommees(q).filter((s) => {
    const a = f.points.find((p) => p.id === s.a)!;
    const b = f.points.find((p) => p.id === s.b)!;
    const dist = Math.abs((b.x - a.x) * (a.y - O.y) - (b.y - a.y) * (a.x - O.x)) / Math.hypot(b.x - a.x, b.y - a.y);
    return Math.abs(dist - c.rayon) < 1e-9 ? voulu === 0 : dist < c.rayon ? voulu === -1 : voulu === 1;
  });
  return justes.length === 1 ? reponseQcm(q, justes[0].texte!) : [`${justes.length} droite(s) conviennent`];
}

function parDiametre(q: Q) {
  const t = texteLu(q);
  const D = t.match(/[Dd]iamètre (?:de |mesure |du cercle de centre [A-Z] mesure )?(\d+)/)?.[1] ?? t.match(/diamètre[^.]*? (\d+) ?(?:mm|cm|dm|m)/)?.[1];
  const d = ligneDe(t);
  const l = longueursDe(t);
  if (!D || !d || l.length !== 2) return ["diamètre ou distance illisible"];
  const iD = l.findIndex((x) => x.v === Number(D));
  const dist = l[iD === 0 ? 1 : 0].v;
  return posQcm(q, dist, Number(D) / 2, d);
}

function choisirRayon(q: Q) {
  const t = texteLu(q);
  const dist = longueursDe(t)[0];
  if (!dist) return ["distance illisible"];
  const test = /coupe/.test(t) ? (r: number) => r > dist.v : /tangente/.test(t) || /est tangente/.test(t) ? (r: number) => r === dist.v : (r: number) => r < dist.v;
  const justes = (q.choices ?? []).filter((c) => test(longueursDe(c)[0]?.v ?? NaN));
  return justes.length === 1 ? reponseQcm(q, justes[0]) : [`${justes.length} rayon(s) conviennent`];
}

function piedPuisPosition(q: Q) {
  const t = texteLu(q);
  const l = longueursDe(t);
  const d = ligneDe(t);
  if (l.length !== 3 || !d) return ["longueurs illisibles"];
  const dist = Math.sqrt(l[0].v ** 2 - l[1].v ** 2);
  return posQcm(q, dist, l[2].v, d);
}

function pointInterieur(q: Q) {
  const t = texteLu(q);
  const [nomOA] = t.match(/\b[A-Z]{2}(?= = )/) ?? [];
  const oa = nomOA ? longueurNommee(t, nomOA) : undefined;
  const r = t.match(/rayon (?:de )?(\d+)/)?.[1];
  const d = ligneDe(t);
  if (!oa || !r || !d) return ["longueurs illisibles"];
  return oa.v < Number(r) ? reponseQcm(q, SEC(d)) : ["le point n’est pas à l’intérieur du cercle"];
}

/** La portée suit le verbe de la zone ; la distance suit « passe ». */
function zone(t: string) {
  const r = t.match(/jusqu’à (\d+)/)?.[1];
  const d = t.match(/passe(?:, au plus près,)? à (\d+)/)?.[1];
  return r && d ? { r: Number(r), dist: Number(d) } : null;
}

function zoneAtteinte(q: Q) {
  const z = zone(texteLu(q));
  if (!z) return ["portée ou distance illisible"];
  return reponseQcm(q, z.dist < z.r ? "Seulement une portion" : z.dist === z.r ? "Un seul point" : "Aucun point");
}

function portion(q: Q) {
  const t = texteLu(q);
  const z = zone(t);
  const u = longueursDe(t)[0]?.u;
  if (!z || !u) return ["portée ou distance illisible"];
  return reponseLongueur(q, 2 * Math.sqrt(z.r ** 2 - z.dist ** 2), u);
}

function manque(q: Q) {
  const t = texteLu(q);
  const z = zone(t);
  const u = longueursDe(t)[0]?.u;
  if (!z || !u) return ["portée ou distance illisible"];
  return z.dist > z.r ? reponseLongueur(q, z.dist - z.r, u) : ["le tracé est déjà atteint"];
}

function porteeMini(q: Q) {
  const t = texteLu(q);
  const l = longueursDe(t);
  if (l.length !== 2) return ["longueurs illisibles"];
  const [a, b] = l.map((x) => x.v);
  return reponseLongueur(q, Math.sqrt(Math.abs(a * a - b * b)), l[0].u);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  tangente_rayon_tpl_1: angleDroit,
  tangente_rayon_tpl_2: perpendiculaires,
  tangente_rayon_tpl_3: unSeulPoint,
  tangente_rayon_tpl_4: troisDroitesParT,
  tangente_rayon_tpl_5: pythagoreTangente,
  tangente_rayon_tpl_6: pythagoreTangente,
  tangente_rayon_tpl_7: pythagoreTangente,
  tangente_rayon_tpl_8: reciproquePythagore,
  tangente_rayon_tpl_9: deuxLongueurs((r, h) => Math.sqrt(h * h - r * r)),
  tangente_rayon_tpl_10: deuxLongueurs((r, x) => Math.hypot(r, x)),
  tangente_rayon_tpl_11: angleComplementaire,
  tangente_rayon_tpl_12: deuxTangentes,

  cercle_droite_position_tpl_1: positionRayonDistance,
  cercle_droite_position_tpl_2: nombrePoints,
  cercle_droite_position_tpl_3: tangenteEgalite,
  cercle_droite_position_tpl_4: troisPositions,
  cercle_droite_position_tpl_5: parDiametre,
  cercle_droite_position_tpl_6: choisirRayon,
  cercle_droite_position_tpl_7: piedPuisPosition,
  cercle_droite_position_tpl_8: pointInterieur,
  cercle_droite_position_tpl_9: zoneAtteinte,
  cercle_droite_position_tpl_10: portion,
  cercle_droite_position_tpl_11: manque,
  cercle_droite_position_tpl_12: porteeMini,
});
