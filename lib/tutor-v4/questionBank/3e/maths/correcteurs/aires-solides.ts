import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, longueursDe, mesuresDe, reponseLongueur, reponsePi, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE aires-solides.bank.ts (05/11/2026) : ils relisent les mesures du
// TEXTE, dans l'ordre de l'énoncé, et refont le calcul. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const L = (q: Q) => longueursDe(q.text);
const avecRetrait = (f: (v: number[]) => number, unite: string) => (q: Q) => {
  const l = L(q);
  return l.length ? reponseLongueur(q, f(l.map((m) => m.v)), `${l[0].u}${unite}`) : ["mesures illisibles"];
};
const enPi = (f: (v: number[]) => number) => (q: Q) => {
  const l = L(q);
  return l.length ? reponsePi(q, f(l.map((m) => m.v)), `${l[0].u}²`) : ["mesures illisibles"];
};

function calculPrisme(q: Q) {
  const [p, h] = L(q);
  return p && h ? reponseQcm(q, `${p.v} × ${h.v}`) : ["mesures illisibles"];
}
function totalePrisme(q: Q) {
  const [al, b] = airesDe(q.text);
  return al && b ? reponseLongueur(q, al.v + 2 * b.v, al.u) : ["aires illisibles"];
}
function triangleBase(q: Q) {
  const l = L(q);
  if (l.length !== 4) return ["côtés et hauteur illisibles"];
  const [a, b, c, h] = l.map((m) => m.v);
  if (a + b <= c || a + c <= b || b + c <= a) return ["triangle impossible"];
  return reponseLongueur(q, (a + b + c) * h, `${l[0].u}²`);
}
function totaleTriangleRectangle(q: Q) {
  const l = L(q).map((m) => m.v);
  const u = L(q)[0]?.u;
  if (l.length !== 4 || !u) return ["côtés et hauteur illisibles"];
  // La hauteur est la seule mesure qui n'appartient pas au triplet de Pythagore.
  for (let k = 0; k < 4; k++) {
    const reste = l.filter((_, i) => i !== k).sort((x, y) => x - y);
    if (reste[0] ** 2 + reste[1] ** 2 === reste[2] ** 2) return reponseLongueur(q, (reste[0] + reste[1] + reste[2]) * l[k] + reste[0] * reste[1], `${u}²`);
  }
  return ["pas de triangle rectangle"];
}
function pave(q: Q) {
  const l = L(q);
  if (l.length !== 3) return ["dimensions illisibles"];
  const [a, b, c] = l.map((m) => m.v);
  return reponseLongueur(q, 2 * (a * b + a * c + b * c), `${l[0].u}²`);
}
function paveOuvert(q: Q) {
  const l = L(q);
  if (l.length !== 3) return ["dimensions illisibles"];
  const [a, b, c] = l.map((m) => m.v);
  return reponseLongueur(q, 2 * (a + b) * c + a * b, `${l[0].u}²`);
}
function hauteurPrisme(q: Q) {
  const [al] = airesDe(q.text);
  const [p] = L(q);
  return al && p ? reponseLongueur(q, al.v / p.v, p.u) : ["mesures illisibles"];
}

function calculCylindre(q: Q) {
  const [r, h] = L(q);
  return r && h ? reponseQcm(q, `2 × π × ${r.v} × ${h.v}`) : ["mesures illisibles"];
}
function flanc314(q: Q) {
  const [r, h] = L(q);
  return r && h && /3,14/.test(q.text) ? reponseLongueur(q, 2 * 3.14 * r.v * h.v, `${r.u}²`) : ["mesures illisibles"];
}
function hauteurCylindre(q: Q) {
  const [a] = mesuresDe(q.text).filter((m) => m.pi);
  const [r] = L(q);
  return a && r ? reponseLongueur(q, a.v / (2 * r.v), r.u) : ["mesures illisibles"];
}
function effetCylindre(q: Q) {
  const [A] = airesDe(q.text);
  if (!A) return ["aire illisible"];
  const k = /double son rayon et sa hauteur/.test(q.text) ? 4 : /double/.test(q.text) ? 2 : /triple/.test(q.text) ? 3 : 0;
  return k ? reponseLongueur(q, A.v * k, A.u) : ["changement illisible"];
}

function calculCone(q: Q) {
  const [r, g] = L(q);
  return r && g ? reponseQcm(q, `π × ${r.v} × ${g.v}`) : ["mesures illisibles"];
}
function apothemePossible(q: Q) {
  const [c, a] = L(q);
  return c && a && a.v > c.v / 2 ? [] : ["un apothème doit dépasser la moitié du côté"];
}
const lateralePyramide = (q: Q) => [...apothemePossible(q), ...avecRetrait(([c, a]) => 2 * c * a, "²")(q)];
const totalePyramide = (q: Q) => [...apothemePossible(q), ...avecRetrait(([c, a]) => 2 * c * a + c * c, "²")(q)];
const generatricePossible = (q: Q) => {
  const [r, g] = L(q);
  return r && g && g.v > r.v ? [] : ["une génératrice dépasse le rayon"];
};
const lateraleCone = (q: Q) => [...generatricePossible(q), ...enPi(([r, g]) => r * g)(q)];
const totaleCone = (q: Q) => [...generatricePossible(q), ...enPi(([r, g]) => r * g + r * r)(q)];

function calculSphere(q: Q) {
  const [r] = L(q);
  return r ? reponseQcm(q, `4 × π × ${r.v} × ${r.v}`) : ["rayon illisible"];
}
function rayonSphere(q: Q) {
  const [a] = mesuresDe(q.text).filter((m) => m.pi);
  if (!a) return ["aire illisible"];
  return reponseLongueur(q, Math.sqrt(a.v / 4), a.u.replace("²", ""));
}
function effetSphere(q: Q) {
  const [A] = airesDe(q.text);
  if (!A) return ["aire illisible"];
  const k = /double/.test(q.text) ? 2 : /triple/.test(q.text) ? 3 : Number(q.text.match(/par (\d)/)?.[1] ?? 0);
  return k ? reponseLongueur(q, A.v * k * k, A.u) : ["changement illisible"];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  aire_prisme_droit_tpl_1: avecRetrait(([p, h]) => p * h, "²"),
  aire_prisme_droit_tpl_2: calculPrisme,
  aire_prisme_droit_tpl_3: triangleBase,
  aire_prisme_droit_tpl_4: totalePrisme,
  aire_prisme_droit_tpl_5: pave,
  aire_prisme_droit_tpl_6: paveOuvert,
  aire_prisme_droit_tpl_7: hauteurPrisme,
  aire_prisme_droit_tpl_8: totaleTriangleRectangle,

  aire_cylindre_tpl_1: enPi(([r, h]) => 2 * r * h),
  aire_cylindre_tpl_2: calculCylindre,
  aire_cylindre_tpl_3: enPi(([d, h]) => d * h),
  aire_cylindre_tpl_4: enPi(([r, h]) => 2 * r * h + 2 * r * r),
  aire_cylindre_tpl_5: flanc314,
  aire_cylindre_tpl_6: enPi(([r, h]) => 2 * r * h + r * r),
  aire_cylindre_tpl_7: hauteurCylindre,
  aire_cylindre_tpl_8: effetCylindre,

  aire_pyramide_cone_tpl_1: lateralePyramide,
  aire_pyramide_cone_tpl_2: lateraleCone,
  aire_pyramide_cone_tpl_3: totalePyramide,
  aire_pyramide_cone_tpl_4: totaleCone,
  aire_pyramide_cone_tpl_5: calculCone,
  aire_pyramide_cone_tpl_6: lateralePyramide,
  aire_pyramide_cone_tpl_7: lateraleCone,
  aire_pyramide_cone_tpl_8: enPi(([r, h]) => r * Math.hypot(r, h)),
  aire_pyramide_cone_tpl_9: avecRetrait(([c, h]) => 2 * c * Math.hypot(c / 2, h), "²"),

  aire_sphere_tpl_1: enPi(([r]) => 4 * r * r),
  aire_sphere_tpl_2: calculSphere,
  aire_sphere_tpl_3: enPi(([d]) => d * d),
  aire_sphere_tpl_4: avecRetrait(([r]) => 4 * 3.14 * r * r, "²"),
  aire_sphere_tpl_5: enPi(([r]) => 4 * r * r),
  aire_sphere_tpl_6: enPi(([r]) => 2 * r * r),
  aire_sphere_tpl_7: rayonSphere,
  aire_sphere_tpl_8: effetSphere,
});
