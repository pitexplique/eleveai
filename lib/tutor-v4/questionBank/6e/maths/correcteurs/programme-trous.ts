import { avecRegleMotsCles } from "./pourcentages";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, NB, egal, justeNombre, justeTexte, justeUnique, nombres, num } from "../../../cm1/maths/correcteurs/outils";

// Les correcteurs de programme-trous.bank.ts : relisent le calcul, les angles nommés
// (mesurés sur la figure quand elle existe) et la fraction. Vide = juste.

const fig = (q: Q) => q.canvas as any;
const et = (...l: string[][]) => l.flat();

/* ── decimal_multiplier_decimaux ── */
const RE_PROD = new RegExp(`${NB} × ${NB}`, "g");
const dernier = (t: string) => {
  const l = [...t.matchAll(RE_PROD)];
  const m = l[l.length - 1];
  return m ? { a: num(m[1]), b: num(m[2]), ta: m[1], tb: m[2] } : null;
};
const decs = (s: string) => (s.split(",")[1] ?? "").length;
function produit(q: Q) {
  const p = dernier(q.text);
  if (!p) return ["produit illisible"];
  return justeNombre(q, Math.round(p.a * p.b * 1e6) / 1e6);
}
function nbChiffres(q: Q) {
  const p = dernier(q.text);
  if (!p) return ["produit illisible"];
  return justeTexte(q, `${decs(p.ta) + decs(p.tb)} chiffres`);
}
function connu(q: Q) {
  const m = q.text.match(new RegExp(`${NB} × ${NB} = ${NB}`));
  if (m && num(m[1]) * num(m[2]) !== num(m[3])) return ["produit donné faux"];
  return produit(q);
}
function pose(q: Q) {
  const c = fig(q);
  if (c?.kind !== "calcul_pose" || c.display?.showResult || c.result) return ["pose absente ou qui donne le résultat"];
  return produit(q);
}
function plusPetit(q: Q) {
  if (/diminue/.test(q.text)) {
    const [x, k] = nombres(q.text);
    return justeTexte(q, x * k < x ? "Oui" : "Non");
  }
  const p = dernier(q.text)!;
  const reste = q.text.replace(RE_PROD, "");
  const tests = nombres(reste).pop()!;
  return justeTexte(q, p.a * p.b < tests ? "Oui" : "Non");
}
function aireGrille(q: Q) {
  const g = fig(q).grid;
  const lignes = new Set(g.filledCells.map((c: number[]) => c[0])).size, cols = new Set(g.filledCells.map((c: number[]) => c[1])).size;
  if (g.filledCells.length !== lignes * cols) return ["zone non rectangulaire"];
  return justeNombre(q, (lignes * cols) / 100, "m²");
}
function prix(q: Q) {
  const px = num(q.text.match(new RegExp(`${NB} € le kilo`))![1]);
  const m = num(q.text.match(new RegExp(`${NB} kg`))![1]);
  const t = Math.round(px * m * 100) / 100;
  return justeTexte(q, `${t.toFixed(2).replace(".", ",")} €`);
}
function aire(q: Q) {
  const m = q.text.match(new RegExp(`${NB} m sur ${NB} m`))!;
  return justeNombre(q, Math.round(num(m[1]) * num(m[2]) * 1e6) / 1e6, "m²");
}
function corrige(q: Q) {
  const m = q.text.match(new RegExp(`${NB} × ${NB} = ${NB}`))!;
  const juste = Math.round(num(m[1]) * num(m[2]) * 1e6) / 1e6;
  if (egal(juste, num(m[3]))) return ["le résultat annoncé faux est juste"];
  return justeNombre(q, juste);
}

/* ── angle_relations ── */
const hats = (t: string) => [...t.matchAll(/\\widehat\{([A-Z]{3})\}/g)].map((m) => m[1]);
const point = (q: Q, l: string) => fig(q).points.find((p: any) => p.label === l);
/** La mesure lue sur la figure, arrondie à 5° (les coordonnées sont entières). */
function mesure(q: Q, h: string) {
  const o = point(q, h[1]), u = point(q, h[0]), v = point(q, h[2]);
  if (!o || !u || !v) return NaN;
  const a = Math.atan2(-(u.y - o.y), u.x - o.x), b = Math.atan2(-(v.y - o.y), v.x - o.x);
  let d = Math.abs(((a - b) * 180) / Math.PI);
  if (d > 180) d = 360 - d;
  return Math.round(d / 5) * 5;
}
const mesuresTexte = (t: string) => [...t.matchAll(/(\d+)°/g)].map((m) => Number(m[1]));
const nomme = (q: Q, juste: string) => justeTexte(q, juste);
function adjacents(q: Q) {
  const [h1, h2] = hats(q.text);
  if (h1[1] !== h2[1] || h1[2] !== h2[0]) return ["pas de côté commun"];
  const t = mesure(q, h1[0] + h1[1] + h2[2]);
  if (t !== mesure(q, h1) + mesure(q, h2)) return ["les angles se recouvrent"];
  return nomme(q, "Adjacents");
}
function opposes(q: Q) {
  const [h1, h2] = hats(q.text);
  if (mesure(q, h1[0] + h1[1] + h2[0]) !== 180 || mesure(q, h1[2] + h1[1] + h2[2]) !== 180) return ["ces angles ne sont pas opposés sur la figure"];
  return nomme(q, "Opposés par le sommet");
}
const supplementaire = (q: Q) => justeNombre(q, 180 - mesuresTexte(q.text)[0], "°");
/** La figure doit montrer la mesure annoncée, et la réponse est celle de l'angle demandé. */
function surFigure(q: Q) {
  const h = hats(q.text);
  const t = mesuresTexte(q.text);
  const dep = h[0];
  if (mesure(q, dep) !== t[0]) return [`figure : ${dep} vaut ${mesure(q, dep)}°, texte ${t[0]}°`];
  return justeNombre(q, mesure(q, h[h.length - 1]), "°");
}
function adjSomme(q: Q) {
  const h = hats(q.text);
  const t = mesuresTexte(q.text);
  if (mesure(q, h[0]) !== t[0] || mesure(q, h[1]) !== t[1]) return ["figure et texte différents"];
  return justeNombre(q, mesure(q, h[2]), "°");
}
const oppCtx = (q: Q) => justeNombre(q, mesuresTexte(q.text)[0], "°");
const voisinCtx = (q: Q) => justeNombre(q, 180 - mesuresTexte(q.text)[0], "°");
function quatreAngles(q: Q) {
  const t = mesuresTexte(q.text)[0];
  return justeTexte(q, `${t}°, ${180 - t}°, ${t}°, ${180 - t}°`);
}
function surDroite(q: Q) {
  const h = hats(q.text);
  const t = mesuresTexte(q.text);
  const al = q.text.match(/([A-Z]), ([A-Z]) et ([A-Z])/)!;
  if (mesure(q, al[1] + al[2] + al[3]) !== 180) return ["points non alignés sur la figure"];
  if (mesure(q, h[0]) !== t[0] || mesure(q, h[1]) !== t[1]) return ["figure et texte différents"];
  return justeNombre(q, 180 - t[0] - t[1], "°");
}

/* ── fraction_quotient ── */
const FR = /(\d+)\/(\d+)/;
const laFrac = (t: string) => { const m = t.match(FR)!; return { a: Number(m[1]), b: Number(m[2]) }; };
const div = (t: string) => { const m = t.match(/(\d+) ÷ (\d+)/)!; return { a: Number(m[1]), b: Number(m[2]) }; };
const enFraction = (q: Q) => { const { a, b } = div(q.text); return justeTexte(q, `${a}/${b}`); };
const enDivision = (q: Q) => { const { a, b } = laFrac(q.text); return justeTexte(q, `${a} ÷ ${b}`); };
const trou = (q: Q) => {
  const m = q.text.match(/(\d+) × … = (\d+)/)!;
  return justeUnique(q, (c) => { const f = c.match(/^(\d+)\/(\d+)$/); return !!f && Number(m[1]) * Number(f[1]) === Number(m[2]) * Number(f[2]); });
};
const valeurFrac = (q: Q) => { const { a, b } = laFrac(q.text); return justeNombre(q, Math.round((a / b) * 1e6) / 1e6); };
const nature = (a: number, b: number) => {
  if (a % b === 0) return "Un nombre entier";
  const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
  let d = b / g(a, b);
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 ? "Un nombre décimal non entier" : "Un nombre non décimal";
};
const natureQ = (q: Q) => {
  const m = q.text.match(FR) ?? q.text.match(/(\d+) ÷ (\d+)/)!;
  return justeTexte(q, nature(Number(m[1]), Number(m[2])));
};
const produitFrac = (q: Q) => {
  const m = q.text.match(/(\d+) × (\d+)\/(\d+)/)!;
  return justeNombre(q, (Number(m[1]) * Number(m[2])) / Number(m[3]));
};
const partage = (q: Q) => {
  const m = q.text.match(/On partage (\d+) .* entre (\d+) /) ?? null;
  const n = m ? [Number(m[1]), Number(m[2])] : (() => { const x = q.text.match(/^(\d+) .* se partagent (\d+) /)!; return [Number(x[2]), Number(x[1])]; })();
  if (fig(q).parts.length !== n[1] || fig(q).total !== String(n[0])) return ["schéma différent du texte"];
  return justeUnique(q, (c) => { const f = c.match(/^(\d+)\/(\d+) /); return !!f && Number(f[1]) === n[0] && Number(f[2]) === n[1]; });
};
const partDecimale = (q: Q) => {
  const [a, b] = nombres(q.text);
  return justeNombre(q, Math.round((a / b) * 1e6) / 1e6);
};
const nonDecimale = (q: Q) => justeUnique(q, (c) => { const f = laFrac(c); return nature(f.a, f.b) === "Un nombre non décimal"; });
const encadre = (q: Q) => {
  const { a, b } = laFrac(q.text);
  const e = Math.floor(a / b);
  return justeTexte(q, `Entre ${e} et ${e + 1}`);
};

const D = "decimal_multiplier_decimaux_tpl_", R = "angle_relations_tpl_", F = "fraction_quotient_tpl_";
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  [`${D}1`]: produit, [`${D}2`]: nbChiffres, [`${D}3`]: connu, [`${D}4`]: pose, [`${D}5`]: connu, [`${D}6`]: plusPetit, [`${D}7`]: aireGrille, [`${D}8`]: prix, [`${D}9`]: aire, [`${D}10`]: corrige,
  [`${R}1`]: adjacents, [`${R}2`]: opposes, [`${R}3`]: supplementaire, [`${R}4`]: surFigure, [`${R}5`]: adjSomme, [`${R}6`]: surFigure, [`${R}7`]: oppCtx, [`${R}8`]: voisinCtx, [`${R}9`]: quatreAngles, [`${R}10`]: surDroite,
  [`${F}1`]: enFraction, [`${F}2`]: enDivision, [`${F}3`]: trou, [`${F}4`]: valeurFrac, [`${F}5`]: natureQ, [`${F}6`]: produitFrac, [`${F}7`]: partage, [`${F}8`]: partDecimale, [`${F}9`]: nonDecimale, [`${F}10`]: encadre,
});
void et;
