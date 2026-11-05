import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { airesDe, degresDe, longueursDe, reponseDegres, reponseLongueur, reponsePi, reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";

// LES CORRECTEURS DE arcs-secteurs.bank.ts (05/11/2026) : ils relisent rayon (ou diamètre),
// angle et aires dans le TEXTE, et refont le calcul, sans rien reprendre du gabarit. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const au10e = (x: number) => Math.round(x * 10) / 10;
const NOM_PART: Record<number, string> = { 180: "la moitié", 120: "le tiers", 90: "le quart", 72: "le cinquième", 60: "le sixième", 45: "le huitième", 36: "le dixième", 30: "le douzième" };

/** Le rayon : le premier nombre avec unité, divisé par 2 si l'énoncé donne le diamètre. */
function rayon(q: Q): { r: number; u: string } | null {
  const l = longueursDe(q.text)[0];
  return l ? { r: /diamètre/.test(q.text) ? l.v / 2 : l.v, u: l.u } : null;
}
const angle = (q: Q) => degresDe(q.text)[0];

/** Coefficient de π de l'arc d'angle a. */
const coefArc = (r: number, a: number) => (2 * r * a) / 360;
/** Coefficient de π du secteur d'angle a. */
const coefSec = (r: number, a: number) => (r * r * a) / 360;

const avec = (f: (r: number, a: number, u: string, q: Q) => string[]) => (q: Q) => {
  const R = rayon(q);
  const a = angle(q);
  return R && a ? f(R.r, a, R.u, q) : ["rayon ou angle illisible"];
};

const part = (mot: string) => (q: Q) => {
  const a = angle(q);
  return a && NOM_PART[a] ? reponseQcm(q, `${NOM_PART[a]} du ${mot}`) : ["angle illisible"];
};

function arcDepuisCercle(q: Q) {
  const C = longueursDe(q.text)[0];
  const a = angle(q);
  return C && a ? reponseLongueur(q, (C.v * a) / 360, C.u) : ["longueur ou angle illisible"];
}

function secteurDepuisDisque(q: Q) {
  const D = airesDe(q.text)[0];
  const a = angle(q);
  return D && a ? reponseLongueur(q, (D.v * a) / 360, D.u) : ["aire ou angle illisible"];
}

function arcProportion(q: Q) {
  const [a1, a2] = degresDe(q.text);
  const L = longueursDe(q.text)[0];
  return a1 && a2 && L ? reponseLongueur(q, (L.v * a2) / a1, L.u) : ["données illisibles"];
}

function secteurProportion(q: Q) {
  const [a1, a2] = degresDe(q.text);
  const S = airesDe(q.text)[0];
  return a1 && a2 && S ? reponseLongueur(q, (S.v * a2) / a1, S.u) : ["données illisibles"];
}

/** Angle retrouvé depuis l'arc en π : rayon en premier ou en second. */
function angleDepuisArc(q: Q) {
  const l = longueursDe(q.text);
  const arc = l.find((m) => m.pi);
  const r = l.find((m) => !m.pi);
  return arc && r ? reponseDegres(q, (arc.v * 360) / (2 * r.v)) : ["arc ou rayon illisible"];
}

function rayonDepuisArc(q: Q) {
  const arc = longueursDe(q.text).find((m) => m.pi);
  const a = angle(q);
  return arc && a ? reponseLongueur(q, (arc.v * 360) / (2 * a), arc.u) : ["arc ou angle illisible"];
}

function angleDepuisSecteur(q: Q) {
  const S = airesDe(q.text).find((m) => m.pi);
  const r = longueursDe(q.text)[0];
  return S && r ? reponseDegres(q, (S.v * 360) / (r.v * r.v)) : ["aire ou rayon illisible"];
}

function rayonDepuisSecteur(q: Q) {
  const S = airesDe(q.text).find((m) => m.pi);
  const a = angle(q);
  if (!S || !a) return ["aire ou angle illisible"];
  return reponseLongueur(q, Math.sqrt((S.v * 360) / a), S.u.replace("²", ""));
}

function aiguille(q: Q) {
  const r = longueursDe(q.text)[0];
  const m = Number(q.text.match(/(\d+) minutes/)?.[1]);
  return r && m ? reponseLongueur(q, au10e(Math.PI * coefArc(r.v, 6 * m)), r.u) : ["longueur ou minutes illisibles"];
}

function partage(q: Q) {
  const r = longueursDe(q.text)[0];
  const n = Number(q.text.match(/en (\d+) /)?.[1]);
  return r && n ? reponseLongueur(q, au10e((Math.PI * r.v * r.v) / n), `${r.u}²`) : ["rayon ou nombre de parts illisible"];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  arc_longueur_tpl_1: avec((r, a, u, q) => reponsePi(q, coefArc(r, a), u)),
  arc_longueur_tpl_2: part("cercle"),
  arc_longueur_tpl_3: arcDepuisCercle,
  arc_longueur_tpl_4: avec((r, a, _u, q) => reponseQcm(q, `2 × π × ${r} × ${a} ÷ 360`)),
  arc_longueur_tpl_5: avec((r, a, u, q) => reponseLongueur(q, au10e(Math.PI * coefArc(r, a)), u)),
  arc_longueur_tpl_6: avec((r, a, u, q) => reponsePi(q, coefArc(r, a), u)),
  arc_longueur_tpl_7: arcProportion,
  arc_longueur_tpl_8: avec((r, a, u, q) => reponsePi(q, coefArc(r, 360 - a), u)),
  arc_longueur_tpl_9: angleDepuisArc,
  arc_longueur_tpl_10: rayonDepuisArc,
  arc_longueur_tpl_11: avec((r, a, u, q) => reponseLongueur(q, au10e(Math.PI * coefArc(r, a)), u)),
  arc_longueur_tpl_12: aiguille,

  secteur_aire_tpl_1: avec((r, a, u, q) => reponsePi(q, coefSec(r, a), `${u}²`)),
  secteur_aire_tpl_2: part("disque"),
  secteur_aire_tpl_3: secteurDepuisDisque,
  secteur_aire_tpl_4: avec((r, a, _u, q) => reponseQcm(q, `π × ${r} × ${r} × ${a} ÷ 360`)),
  secteur_aire_tpl_5: avec((r, a, u, q) => reponseLongueur(q, au10e(Math.PI * coefSec(r, a)), `${u}²`)),
  secteur_aire_tpl_6: avec((r, a, u, q) => reponsePi(q, coefSec(r, a), `${u}²`)),
  secteur_aire_tpl_7: secteurProportion,
  secteur_aire_tpl_8: avec((r, a, u, q) => reponsePi(q, coefSec(r, 360 - a), `${u}²`)),
  secteur_aire_tpl_9: angleDepuisSecteur,
  secteur_aire_tpl_10: rayonDepuisSecteur,
  secteur_aire_tpl_11: avec((r, a, u, q) => reponseLongueur(q, au10e(Math.PI * coefSec(r, a)), `${u}²`)),
  secteur_aire_tpl_12: partage,
});
