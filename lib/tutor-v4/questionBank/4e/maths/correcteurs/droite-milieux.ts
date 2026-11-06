import type { CorrecteursMaths } from "./types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { coordonneesFigure, degresDe, estMilieuSurFigure, longueursDe, perpendiculaireSurFigure, reponseDegres, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { longueurNommee, texteLu } from "../outils-insecables";

// LES CORRECTEURS DE droite-milieux.bank.ts (06/11/2026) : ils relisent dans le TEXTE quels
// points sont des milieux et quelles longueurs sont données, refont le calcul, et vérifient
// la figure (milieux, parallèles). Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** Les milieux annoncés : point, extrémités. */
function milieux(t: string) {
  const res: { m: string; a: string; b: string }[] = [];
  const pousse = (m: string, s: string) => res.push({ m, a: s[0], b: s[1] });
  for (const x of t.matchAll(/\b([A-Z]) est le milieu de \[([A-Z]{2})\]/g)) pousse(x[1], x[2]);
  for (const x of t.matchAll(/\[([A-Z]{2})\] a pour milieu ([A-Z])/g)) pousse(x[2], x[1]);
  for (const x of t.matchAll(/\b([A-Z]) et ([A-Z]) sont les milieux (?:respectifs )?de \[([A-Z]{2})\] et (?:de )?\[([A-Z]{2})\]/g)) {
    pousse(x[1], x[3]);
    pousse(x[2], x[4]);
  }
  for (const x of t.matchAll(/\b([A-Z]), ([A-Z]) et ([A-Z]) sont les milieux respectifs de \[([A-Z]{2})\], \[([A-Z]{2})\] et \[([A-Z]{2})\]/g)) {
    pousse(x[1], x[4]);
    pousse(x[2], x[5]);
    pousse(x[3], x[6]);
  }
  for (const x of t.matchAll(/[Oo]n place ([A-Z]), ([A-Z]) et ([A-Z]) aux milieux respectifs de \[([A-Z]{2})\], \[([A-Z]{2})\] et \[([A-Z]{2})\]/g)) {
    pousse(x[1], x[4]);
    pousse(x[2], x[5]);
    pousse(x[3], x[6]);
  }
  return res;
}

/** Deux milieux : le sommet commun, le troisième côté. */
function configuration(q: Q) {
  const ms = milieux(texteLu(q));
  if (ms.length < 2) return null;
  const [p, s] = ms;
  const A = [p.a, p.b].find((x) => x === s.a || x === s.b);
  if (!A) return null;
  const B = p.a === A ? p.b : p.a;
  const C = s.a === A ? s.b : s.a;
  return { A, B, C, M: p.m, N: s.m };
}

function figureDitMilieux(q: Q): string[] {
  return milieux(texteLu(q)).flatMap((x) => (estMilieuSurFigure(q, x.m, x.a, x.b) ? [] : [`${x.m} n’est pas le milieu de [${x.a}${x.b}] sur la figure`]));
}

function paralleleSurFigure(q: Q, a: string, b: string, c: string, d: string) {
  const [pa, pb, pc, pd] = coordonneesFigure(q, [a, b, c, d]);
  return !!pa && !!pb && !!pc && !!pd && Math.abs((pb.x - pa.x) * (pd.y - pc.y) - (pb.y - pa.y) * (pd.x - pc.x)) < 1e-7;
}

function moitieDuTroisieme(q: Q) {
  const c = configuration(q);
  if (!c) return ["milieux illisibles"];
  const L = longueurNommee(texteLu(q), `${c.B}${c.C}`);
  if (!L) return ["troisième côté illisible"];
  if (!new RegExp(`${c.M}${c.N}`).test(texteLu(q))) return ["le segment demandé n’est pas celui des milieux"];
  return [...figureDitMilieux(q), ...reponseLongueur(q, L.v / 2, L.u)];
}

function doubleDuSegment(q: Q) {
  const c = configuration(q);
  if (!c) return ["milieux illisibles"];
  const L = longueurNommee(texteLu(q), `${c.M}${c.N}`);
  if (!L) return ["segment illisible"];
  return [...figureDitMilieux(q), ...reponseLongueur(q, 2 * L.v, L.u)];
}

function positionDesDroites(q: Q) {
  const c = configuration(q);
  if (!c) return ["milieux illisibles"];
  const p = paralleleSurFigure(q, c.M, c.N, c.B, c.C) ? [] : ["les droites ne sont pas parallèles sur la figure"];
  return [...p, ...figureDitMilieux(q), ...reponseQcm(q, `(${c.M}${c.N}) et (${c.B}${c.C}) sont parallèles`)];
}

function cotePorteur(q: Q) {
  const c = configuration(q);
  if (!c) return ["milieux illisibles"];
  const p = paralleleSurFigure(q, c.M, c.N, c.B, c.C) ? [] : ["les droites ne sont pas parallèles sur la figure"];
  return [...p, ...reponseQcm(q, `(${c.B}${c.C})`)];
}

/** Trois côtés d'un triangle : le petit triangle au sommet a la moitié du périmètre. */
function perimetrePetit(q: Q) {
  const t = texteLu(q);
  const lus = [...t.matchAll(/\b([A-Z]{2}) = (\d+)/g)].map((m) => ({ nom: m[1], v: Number(m[2]) }));
  if (lus.length !== 3 || new Set(lus.flatMap((l) => l.nom.split(""))).size !== 3) return ["trois côtés d’un triangle attendus"];
  const [x, y, z] = lus.map((l) => l.v);
  const inegalite = x < y + z && y < x + z && z < x + y ? [] : [`triangle impossible : ${x}, ${y}, ${z}`];
  return [...inegalite, ...reponseLongueur(q, (x + y + z) / 2, longueursDe(t)[0].u)];
}

function perimetreMilieux(q: Q) {
  const t = texteLu(q);
  const ms = milieux(t);
  if (ms.length !== 3) return ["trois milieux attendus"];
  const v = longueursDe(t)[0];
  const cherche = t.match(/périmètre du triangle ([A-Z]{3}) ?[?.]\s*$/)?.[1];
  if (!v || !cherche) return ["périmètre illisible"];
  const versPetit = cherche.split("").every((x) => ms.some((m) => m.m === x));
  return [...figureDitMilieux(q), ...reponseLongueur(q, versPetit ? v.v / 2 : 2 * v.v, v.u)];
}

function natureQuadrilatere(q: Q) {
  const n = texteLu(q).match(/quadrilatère ([A-Z]{4})|quadrilatère est ([A-Z]{4})/);
  const nom = n?.[1] ?? n?.[2];
  if (!nom) return ["quadrilatère illisible"];
  const [a, b, c, d] = nom.split("");
  const p1 = paralleleSurFigure(q, a, b, c, d);
  const p2 = paralleleSurFigure(q, b, c, d, a);
  if (!p1 && !p2) return ["aucun côté parallèle sur la figure"];
  const pts = coordonneesFigure(q, [a, b, c, d]);
  if (p1 && p2) {
    const l1 = Math.hypot(pts[0]!.x - pts[1]!.x, pts[0]!.y - pts[1]!.y);
    const l2 = Math.hypot(pts[1]!.x - pts[2]!.x, pts[1]!.y - pts[2]!.y);
    if (Math.abs(l1 - l2) < 1e-6) return ["la figure est un losange"];
    if (perpendiculaireSurFigure(q, a, b, b, c)) return ["la figure est un rectangle"];
  }
  return reponseQcm(q, p1 && p2 ? "Un parallélogramme" : "Un trapèze");
}

function angleCorrespondant(q: Q) {
  const t = texteLu(q);
  const a = degresDe(t)[0];
  const donne = t.match(/\\widehat\{([A-Z]{3})\}/)?.[1];
  const c = configuration(q);
  if (a == null || !donne || !c) return ["angle illisible"];
  const hautDe = donne[1] === c.B ? c.M : c.N;
  const cherche = [...t.matchAll(/\\widehat\{([A-Z]{3})\}/g)].map((m) => m[1])[1];
  if (cherche?.[1] !== hautDe) return [`l’angle demandé n’est pas au bon sommet : ${cherche}`];
  const [s, x, y] = coordonneesFigure(q, [donne[1], donne[0], donne[2]]);
  if (!s || !x || !y) return ["figure illisible"];
  const figure = (Math.acos(((x.x - s.x) * (y.x - s.x) + (x.y - s.y) * (y.y - s.y)) / (Math.hypot(x.x - s.x, x.y - s.y) * Math.hypot(y.x - s.x, y.y - s.y))) * 180) / Math.PI;
  return [...(Math.abs(figure - a) < 1e-6 ? [] : [`la figure montre ${figure}° au lieu de ${a}°`]), ...reponseDegres(q, a)];
}

/** La seule longueur du texte, divisée par 2 ou doublée. */
const uneLongueur = (f: (v: number) => number) => (q: Q) => {
  const l = longueursDe(texteLu(q));
  return l.length === 1 ? reponseLongueur(q, f(l[0].v), l[0].u) : [`${l.length} longueurs lues au lieu d’une`];
};

function troisLongueurs(q: Q) {
  const l = longueursDe(texteLu(q));
  if (l.length !== 3) return [`${l.length} longueurs lues au lieu de trois`];
  const [x, y, z] = l.map((v) => v.v);
  const inegalite = x < y + z && y < x + z && z < x + y ? [] : [`triangle impossible : ${x}, ${y}, ${z}`];
  return [...inegalite, ...reponseLongueur(q, (x + y + z) / 2, l[0].u)];
}

function emboites(q: Q) {
  const t = texteLu(q);
  const L = longueursDe(t)[0];
  const n = Number(t.match(/on trace (\d) nouveaux triangles/)?.[1]);
  if (!L || !n) return ["côté ou nombre illisible"];
  const polys = (q.canvas as ConstructionCanvasData)?.polygones?.length;
  return [...(polys === n + 1 ? [] : [`${polys} triangles dessinés pour ${n} étapes`]), ...reponseLongueur(q, L.v / 2 ** n, L.u)];
}

/* ===== Réciproque : le milieu, la parallèle, le point d'arrivée. ===== */

function reciproque(q: Q) {
  const t = texteLu(q);
  const ms = milieux(t)[0];
  const arrivee = t.match(/coupe \[([A-Z]{2})\] en ([A-Z])/) ?? t.match(/([A-Z]) est le point où .* coupe \[([A-Z]{2})\]/);
  const paralleleA = t.match(/parallèle à \(([A-Z]{2})\)/)?.[1];
  if (!ms || !arrivee || !paralleleA) return null;
  const [cote, N] = /^[A-Z]{2}$/.test(arrivee[1]) ? [arrivee[1], arrivee[2]] : [arrivee[2], arrivee[1]];
  const A = cote.split("").find((x) => x === ms.a || x === ms.b);
  if (!A) return null;
  const B = ms.a === A ? ms.b : ms.a;
  const C = cote[0] === A ? cote[1] : cote[0];
  if (paralleleA !== `${B}${C}`) return null;
  return { A, B, C, M: ms.m, N };
}

function verifieParallele(q: Q, c: NonNullable<ReturnType<typeof reciproque>>) {
  return [...(paralleleSurFigure(q, c.M, c.N, c.B, c.C) ? [] : ["(MN) n’est pas parallèle sur la figure"]), ...(estMilieuSurFigure(q, c.N, c.A, c.C) ? [] : ["l’arrivée n’est pas le milieu sur la figure"])];
}

function moitieDuCote(q: Q) {
  const c = reciproque(q);
  if (!c) return ["configuration illisible"];
  const t = texteLu(q);
  const L = longueurNommee(t, `${c.A}${c.C}`);
  if (!L) return ["côté illisible"];
  return [...verifieParallele(q, c), ...reponseLongueur(q, L.v / 2, L.u)];
}

function deUneMoitie(q: Q) {
  const c = reciproque(q);
  if (!c) return ["configuration illisible"];
  const t = texteLu(q);
  const an = longueurNommee(t, `${c.A}${c.N}`);
  const nc = longueurNommee(t, `${c.N}${c.C}`);
  const v = an ?? nc;
  if (!v) return ["moitié illisible"];
  const demande = t.match(/(?:longueur |Calcule |vaut )([A-Z]{2}) ?[?.]\s*$/)?.[1];
  if (!demande) return ["segment demandé illisible"];
  return [...verifieParallele(q, c), ...reponseLongueur(q, demande === `${c.A}${c.C}` ? 2 * v.v : v.v, v.u)];
}

function roleDuPoint(q: Q) {
  const c = reciproque(q);
  if (!c) return ["configuration illisible"];
  return [...verifieParallele(q, c), ...reponseQcm(q, `Le milieu de [${c.A}${c.C}]`)];
}

function conditions(q: Q) {
  const t = texteLu(q);
  const m = t.match(/([A-Z]) (?:est sur|un point de|sur) \[([A-Z]{2})\]/);
  const n = t.match(/([A-Z]) est le milieu de \[([A-Z]{2})\] \?/) ?? t.match(/([A-Z]) est le milieu de \[([A-Z]{2})\]/);
  if (!m || !n) return ["points illisibles"];
  const A = m[2].split("").find((x) => n[2].includes(x));
  if (!A) return ["sommet illisible"];
  const B = m[2][0] === A ? m[2][1] : m[2][0];
  const C = n[2][0] === A ? n[2][1] : n[2][0];
  return reponseQcm(q, `${m[1]} est le milieu de [${m[2]}] et (${m[1]}${n[1]}) est parallèle à (${B}${C})`);
}

function segmentDesMilieux(q: Q) {
  const c = reciproque(q);
  if (!c) return ["configuration illisible"];
  const L = longueurNommee(texteLu(q), `${c.B}${c.C}`);
  if (!L) return ["côté illisible"];
  return [...verifieParallele(q, c), ...reponseLongueur(q, L.v / 2, L.u)];
}

function milieuOuNon(q: Q) {
  const t = texteLu(q);
  const m = t.match(/([A-Z])([A-Z]) = (\d+) (?:mm|cm|dm|m) et ([A-Z])([A-Z]) = (\d+)/);
  if (!m) return ["longueurs illisibles"];
  const [, A, M, am, , B, ab] = m;
  const estMilieu = 2 * Number(am) === Number(ab);
  const C = t.match(/\(([A-Z]{2})\)/)?.[1]?.replace(B, "");
  const N = t.match(/coupe \[[A-Z]{2}\] en ([A-Z])/)?.[1];
  if (!C || !N) return ["points illisibles"];
  const parallele = paralleleSurFigure(q, M, N, B, C) ? [] : ["(MN) n’est pas parallèle sur la figure"];
  const milieuFigure = estMilieuSurFigure(q, N, A, C) === estMilieu ? [] : ["la figure contredit le texte sur le milieu"];
  return [...parallele, ...milieuFigure, ...reponseQcm(q, estMilieu ? `Oui, car ${M} est le milieu de [${A}${B}]` : `Non, car ${M} n’est pas le milieu de [${A}${B}]`)];
}

function perpendiculaireMilieu(q: Q) {
  const t = texteLu(q);
  const r = t.match(/rectangle en ([A-Z])/)?.[1];
  const ms = milieux(t)[0];
  const arr = t.match(/coupe \[([A-Z]{2})\] en ([A-Z])/);
  if (!r || !ms || !arr) return ["configuration illisible"];
  const L = longueurNommee(t, arr[1]);
  if (!L) return ["côté illisible"];
  const [a, b] = arr[1].split("");
  const autre = a === r ? b : a;
  const C = ms.a === autre ? ms.b : ms.a;
  const p = [
    ...(perpendiculaireSurFigure(q, ms.m, arr[2], a, b) ? [] : ["la droite n’est pas perpendiculaire sur la figure"]),
    ...(estMilieuSurFigure(q, arr[2], a, b) ? [] : ["l’arrivée n’est pas le milieu sur la figure"]),
    ...(perpendiculaireSurFigure(q, autre, r, C, r) ? [] : ["pas d’angle droit sur la figure"]),
  ];
  return [...p, ...reponseLongueur(q, L.v / 2, L.u)];
}

function trapeze(q: Q) {
  const t = texteLu(q);
  const ab = longueurNommee(t, "AB");
  const dc = longueurNommee(t, "DC");
  const seg = t.match(/(?:longueur |Calcule |vaut )(MI|IN|MN) ?[?.]\s*$/)?.[1];
  if (!ab || !dc || !seg) return ["trapèze illisible"];
  const juste = seg === "MI" ? ab.v / 2 : seg === "IN" ? dc.v / 2 : (ab.v + dc.v) / 2;
  const p = [
    ...(paralleleSurFigure(q, "A", "B", "D", "C") ? [] : ["bases non parallèles sur la figure"]),
    ...(paralleleSurFigure(q, "M", "N", "A", "B") ? [] : ["(MN) non parallèle sur la figure"]),
    ...(estMilieuSurFigure(q, "I", "B", "D") ? [] : ["I n’est pas le milieu de [BD]"]),
    ...(estMilieuSurFigure(q, "N", "B", "C") ? [] : ["N n’est pas le milieu de [BC]"]),
  ];
  return [...p, ...reponseLongueur(q, juste, ab.u)];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  milieux_droite_tpl_1: moitieDuTroisieme,
  milieux_droite_tpl_2: doubleDuSegment,
  milieux_droite_tpl_3: positionDesDroites,
  milieux_droite_tpl_4: cotePorteur,
  milieux_droite_tpl_5: perimetrePetit,
  milieux_droite_tpl_6: perimetreMilieux,
  milieux_droite_tpl_7: natureQuadrilatere,
  milieux_droite_tpl_8: angleCorrespondant,
  milieux_droite_tpl_9: uneLongueur((v) => v / 2),
  milieux_droite_tpl_10: uneLongueur((v) => 2 * v),
  milieux_droite_tpl_11: troisLongueurs,
  milieux_droite_tpl_12: emboites,

  milieux_reciproque_tpl_1: moitieDuCote,
  milieux_reciproque_tpl_2: deUneMoitie,
  milieux_reciproque_tpl_3: roleDuPoint,
  milieux_reciproque_tpl_4: conditions,
  milieux_reciproque_tpl_5: segmentDesMilieux,
  milieux_reciproque_tpl_6: perimetrePetit,
  milieux_reciproque_tpl_7: milieuOuNon,
  milieux_reciproque_tpl_8: perpendiculaireMilieu,
  milieux_reciproque_tpl_9: uneLongueur((v) => v / 2),
  milieux_reciproque_tpl_10: uneLongueur((v) => v / 2),
  milieux_reciproque_tpl_11: trapeze,
  milieux_reciproque_tpl_12: uneLongueur((v) => v / 2),
});
