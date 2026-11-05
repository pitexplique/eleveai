import type { CorrecteursMaths } from "./types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, longueursDe, perpendiculaireSurFigure, reponseLongueur, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE distance-droite.bank.ts (05/11/2026) : ils relisent les longueurs dans
// le TEXTE et vérifient SUR LA FIGURE quel segment est vraiment perpendiculaire à la droite.
// La figure dit la vérité ; un énoncé qui la contredit est une faute. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const l = (q: Q) => longueursDe(q.text);
const fig = (q: Q) => q.canvas as ConstructionCanvasData;

/** Le segment tracé qui est perpendiculaire à la droite de base (x1 x2) sur la figure. */
function segmentsPerpendiculaires(q: Q): [string, string][] {
  return (fig(q)?.segments ?? [])
    .filter((s) => !s.a.startsWith("x") && !s.a.startsWith("y") && perpendiculaireSurFigure(q, s.a, s.b, "x1", "x2"))
    .map((s) => [s.a, s.b]);
}

/** La plus courte des longueurs du texte : elle est la distance, et la figure doit le confirmer. */
function laPlusCourte(q: Q) {
  const m = l(q);
  if (m.length < 2) return ["longueurs illisibles"];
  const juste = Math.min(...m.map((x) => x.v));
  const p = segmentsPerpendiculaires(q).length === 1 ? [] : ["aucun segment perpendiculaire unique sur la figure"];
  // La figure est à l'échelle : le segment perpendiculaire y a la longueur annoncée.
  const [a, b] = segmentsPerpendiculaires(q)[0] ?? [];
  const pa = fig(q)?.points.find((x) => x.id === a);
  const pb = fig(q)?.points.find((x) => x.id === b);
  if (pa && pb && Math.abs(Math.hypot(pa.x - pb.x, pa.y - pb.y) - juste) > 1e-9) p.push("la figure ne dit pas la même distance que le texte");
  return [...p, ...reponseLongueur(q, juste, m[0].u)];
}

/** Sans échelle : seulement le minimum du texte. */
function minimumTexte(q: Q) {
  const m = l(q);
  return m.length >= 2 ? reponseLongueur(q, Math.min(...m.map((x) => x.v)), m[0].u) : ["longueurs illisibles"];
}

/** Le QCM « quel segment » : le seul choix perpendiculaire sur la figure. */
function choixPerpendiculaire(q: Q) {
  const justes = (q.choices ?? []).filter((c) => {
    const m = c.match(/^\[([A-Z])([A-Z])\]$/);
    return m && perpendiculaireSurFigure(q, m[1], m[2], "x1", "x2");
  });
  return justes.length === 1 ? reponseQcm(q, justes[0]) : [`${justes.length} segment(s) perpendiculaire(s) parmi les choix`];
}

/** Le QCM « quel segment » du texte : le plus court. Les choix sont vérifiés sur la figure. */
function choixPlusCourt(q: Q) {
  const noms = [...q.text.matchAll(/([A-Z]{2}) = (\d+(?:,\d+)?)/g)].map((m) => ({ nom: m[1], v: Number(m[2].replace(",", ".")) }));
  if (noms.length !== 3) return ["trois longueurs attendues"];
  const min = noms.reduce((a, b) => (b.v < a.v ? b : a));
  const p = perpendiculaireSurFigure(q, min.nom[0], min.nom[1], "x1", "x2") ? [] : [`[${min.nom}] n’est pas perpendiculaire sur la figure`];
  return [...p, ...reponseQcm(q, `[${min.nom}]`)];
}

/** La possible : la seule longueur au moins égale à la distance. */
function longueurPossible(q: Q) {
  const d = l(q)[0];
  if (!d) return ["distance illisible"];
  const bonnes = (q.choices ?? []).filter((c) => (longueursDe(c)[0]?.v ?? 0) >= d.v);
  return bonnes.length === 1 ? reponseQcm(q, bonnes[0]) : [`${bonnes.length} longueurs possibles au lieu d’une`];
}

/** Pythagore : la première longueur est l'hypoténuse, la seconde l'écart au pied. */
function parPythagore(q: Q) {
  const [o, x] = l(q);
  if (!o || !x) return ["longueurs illisibles"];
  return reponseLongueur(q, Math.sqrt(o.v * o.v - x.v * x.v), o.u);
}

function hauteurDuTriangle(q: Q) {
  const t = q.text.match(/\b([A-Z])H = (\d+)/);
  const b = q.text.match(/\(([A-Z])([A-Z])\)/);
  if (!t || !b) return ["hauteur ou droite illisible"];
  const p = perpendiculaireSurFigure(q, t[1], "H", b[1], b[2]) ? [] : ["la hauteur n’est pas perpendiculaire sur la figure"];
  return [...p, ...reponseLongueur(q, Number(t[2]), l(q)[0].u)];
}

function rectangle(q: Q) {
  const AB = Number(q.text.match(/AB = (\d+)/)?.[1]);
  const BC = Number(q.text.match(/BC = (\d+)/)?.[1]);
  const d = q.text.match(/\(([A-D]{2})\)/)?.[1];
  if (!AB || !BC || !d) return ["rectangle illisible"];
  return reponseLongueur(q, d === "AB" || d === "CD" ? BC : AB, l(q)[0].u);
}

function hauteurParAire(q: Q) {
  const a = airesDe(q.text)[0];
  const b = l(q)[0];
  return a && b ? reponseLongueur(q, (2 * a.v) / b.v, b.u) : ["aire ou côté illisible"];
}

function baseParAire(q: Q) {
  const a = airesDe(q.text)[0];
  const b = l(q)[0];
  return a && b ? reponseLongueur(q, a.v / b.v, b.u) : ["aire ou côté illisible"];
}

/** La première longueur du texte, et la seconde s'il y en a une. */
const texteDeux = (f: (a: number, b: number) => number) => (q: Q) => {
  const [a, b] = l(q);
  return a ? reponseLongueur(q, f(a.v, b?.v ?? 0), a.u) : ["longueurs illisibles"];
};

function hauteurParallelogramme(q: Q) {
  const h = Number(q.text.match(/DH = (\d+)/)?.[1]);
  if (!h) return ["hauteur illisible"];
  const p = perpendiculaireSurFigure(q, "D", "H", "A", "B") ? [] : ["[DH] n’est pas perpendiculaire sur la figure"];
  return [...p, ...reponseLongueur(q, h, l(q)[0].u)];
}

function intervalles(q: Q) {
  const n = Number(q.text.match(/(\d+) [^.,]*parallèles/)?.[1]);
  const e = l(q)[0];
  return n && e ? reponseLongueur(q, (n - 1) * e.v, e.u) : ["nombre ou écart illisible"];
}

const DEF_POINT = "La longueur du segment perpendiculaire à la droite, issu du point";
const DEF_PARA = "La longueur d’un segment perpendiculaire aux deux droites";

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  distance_point_droite_tpl_1: laPlusCourte,
  distance_point_droite_tpl_2: choixPerpendiculaire,
  distance_point_droite_tpl_3: (q) => reponseQcm(q, DEF_POINT),
  distance_point_droite_tpl_4: choixPlusCourt,
  distance_point_droite_tpl_5: parPythagore,
  distance_point_droite_tpl_6: longueurPossible,
  distance_point_droite_tpl_7: hauteurDuTriangle,
  distance_point_droite_tpl_8: rectangle,
  distance_point_droite_tpl_9: minimumTexte,
  distance_point_droite_tpl_10: parPythagore,
  distance_point_droite_tpl_11: hauteurParAire,
  distance_point_droite_tpl_12: hauteurParAire,

  distance_paralleles_tpl_1: laPlusCourte,
  distance_paralleles_tpl_2: choixPerpendiculaire,
  distance_paralleles_tpl_3: texteDeux((a) => a),
  distance_paralleles_tpl_4: (q) => reponseQcm(q, DEF_PARA),
  distance_paralleles_tpl_5: texteDeux((a, b) => a + b),
  distance_paralleles_tpl_6: texteDeux((a) => a / 2),
  distance_paralleles_tpl_7: parPythagore,
  distance_paralleles_tpl_8: hauteurParallelogramme,
  distance_paralleles_tpl_9: minimumTexte,
  distance_paralleles_tpl_10: intervalles,
  distance_paralleles_tpl_11: baseParAire,
  distance_paralleles_tpl_12: baseParAire,
});
