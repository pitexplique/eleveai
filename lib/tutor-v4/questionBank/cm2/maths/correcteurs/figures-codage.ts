import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { nombres, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE figures-codage.bank.ts. Vide = juste. Ils lisent le codage de la
// figure ET vérifient que les coordonnées le respectent.

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const coteLong = (f: any, s: string) => dist(f.points[s[0]], f.points[s[1]]);
/** Les côtés codés égaux doivent vraiment l'être sur le dessin, à 2 % près. */
const codageVrai = (f: any): string[] => {
  const p: string[] = [];
  for (const [u, w] of f.marks?.equalSides ?? []) if (Math.abs(coteLong(f, u) - coteLong(f, w)) > 0.02 * coteLong(f, u)) p.push(`${u} ≠ ${w} sur le dessin`);
  const droits: string[] = f.marks?.rightAnglesAt ?? (f.marks?.rightAngleAt ? [f.marks.rightAngleAt] : []);
  const ordre = Object.keys(f.points);
  for (const s of droits) {
    const i = ordre.indexOf(s);
    const a = f.points[ordre[(i + 1) % ordre.length]];
    const b = f.points[ordre[(i + ordre.length - 1) % ordre.length]];
    const o = f.points[s];
    const ps = (a.x - o.x) * (b.x - o.x) + (a.y - o.y) * (b.y - o.y);
    if (Math.abs(ps) > 1) p.push(`angle en ${s} non droit`);
  }
  return p;
};
const avecCodage = (fn: (q: Q) => string[]) => (q: Q) => [...codageVrai(q.canvas), ...fn(q)];

const SENS: [RegExp, string][] = [
  [/(?:Quel signe montre un angle droit|coder un angle droit)/, "Un petit carré"],
  [/(?:Quel signe montre deux côtés égaux|coder deux côtés de même longueur)/, "Le même petit trait"],
  [/petit carré/, "Un angle droit"],
  [/(?:même petit trait|même trait)/, "Ils ont la même longueur"],
];
const sens = (q: Q) => {
  const m = SENS.find(([r]) => r.test(q.text));
  return m ? texte(q, m[1]) : ["question inconnue"];
};
const nomPoint = (f: any, cle: string) => f.labels[cle];
const cotesEgaux = (q: Q) => {
  const f = q.canvas as any;
  const [u, w] = f.marks.equalSides[0];
  const nom = (s: string) => [nomPoint(f, s[0]), nomPoint(f, s[1])].sort().join("");
  const attendu = [nom(u), nom(w)].sort().join(" ");
  return unique(q, (c) => [...c.matchAll(/\[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2]].sort().join("")).sort().join(" ") === attendu);
};
const ouDroit = (q: Q) => {
  const f = q.canvas as any;
  return texte(q, `En ${nomPoint(f, f.marks.rightAngleAt)}`);
};
const natureQuad = (q: Q) => {
  const f = q.canvas as any;
  const droits = (f.marks.rightAnglesAt ?? []).length === 4;
  const egaux = new Set((f.marks.equalSides ?? []).flat()).size === 4;
  return texte(q, droits && egaux ? "Un carré" : droits ? "Un rectangle" : "Un losange");
};
const natureTri = (q: Q) => {
  const f = q.canvas as any;
  const n = (f.marks.equalSides ?? []).length;
  const d = !!f.marks.rightAngleAt;
  return texte(q, n === 2 ? "Équilatéral" : d && n === 1 ? "Rectangle et isocèle" : d ? "Rectangle" : "Isocèle");
};
const longueurCodee = (q: Q) => {
  const m = q.text.match(/mesure (\d+) cm/);
  return m ? reponse(q, Number(m[1]), "cm") : ["longueur illisible"];
};
const perimetreIso = (q: Q) => {
  const f = q.canvas as any;
  const L = Number(q.text.match(/mesure (\d+) m/)?.[1]);
  const B = Number(String(f.sideLabels.AB).match(/\d+/)?.[0]);
  if (B >= 2 * L) return ["triangle impossible"];
  return reponse(q, 2 * L + B, "m");
};
const perimetre4 = (q: Q) => {
  return reponse(q, 4 * Number(q.text.match(/mesure (\d+) m/)?.[1]), "m");
};
const estCarre = (q: Q) => {
  const f = q.canvas as any;
  const ok = (f.marks.rightAnglesAt ?? []).length === 4 && new Set((f.marks.equalSides ?? []).flat()).size === 4;
  return texte(q, ok ? "Oui" : "Non");
};

/* cercle */
const rayon = (q: Q) => reponse(q, nombres(q.text)[0], "cm");
const position = (q: Q) => {
  const [r, x] = nombres(q.text);
  return texte(q, x === r ? "Sur le cercle" : x < r ? "À l'intérieur du cercle" : "À l'extérieur du cercle");
};
const lireCercle = (q: Q) => {
  const f = q.canvas as any;
  const O = { x: f.circle.cx, y: f.circle.cy };
  return (f.points as any[]).filter((p) => p.id !== "O").map((p) => ({ nom: p.label, k: dist(p, O) / f.circle.r }));
};
const surCercle = (q: Q) => {
  const j = lireCercle(q).filter((p) => Math.abs(p.k - 1) < 0.01);
  return j.length === 1 ? texte(q, `Le point ${j[0].nom}`) : [`${j.length} points sur le cercle`];
};
const dedans = (q: Q) => {
  const j = lireCercle(q).filter((p) => p.k < 0.95);
  return j.length === 1 ? texte(q, `Le point ${j[0].nom}`) : [`${j.length} points à l’intérieur`];
};
const diametre = (q: Q) => {
  const x = nombres(q.text)[0];
  const veutRayon = /diamètre de|diamètre \[.+\] mesure/.test(q.text);
  return reponse(q, veutRayon ? x / 2 : x * 2, "cm");
};
const cercleOuDisque = (q: Q) => texte(q, /à moins de/.test(q.text) ? "Un disque" : "Un cercle");
const atteint = (q: Q) => {
  const [r, x] = nombres(q.text);
  return texte(q, x <= r ? "Oui" : "Non");
};
const formeContexte = (q: Q) => {
  const trace = /bien tendue|trace un trait|exactement|en restant/.test(q.text);
  return texte(q, trace ? "Un cercle" : "Un disque");
};
const plusLoin = (q: Q) => reponse(q, nombres(q.text)[0] * 2, /km/.test(q.text) ? "km" : "m");

/* programme : on simule. Une étape utilise des points ; « Trace un segment », « Place X » en créent. */
const cree = (e: string) => {
  const s = new Set<string>();
  const m = e.match(/Trace un segment \[([A-Z])([A-Z])\]/);
  if (m) { s.add(m[1]); s.add(m[2]); }
  const d = e.match(/Trace une droite passant par ([A-Z]) et ([A-Z])/);
  if (d) { s.add(d[1]); s.add(d[2]); }
  const p = e.match(/Place (?:un point )?([A-Z])\b/);
  if (p) s.add(p[1]);
  return s;
};
const utilise = (e: string) => {
  const c = cree(e);
  const l = new Set<string>(e.match(/\b[A-Z]\b/g) ?? []);
  for (const m of e.matchAll(/[[(]([A-Z])([A-Z])[\])]/g)) { l.add(m[1]); l.add(m[2]); }
  return [...l].filter((x) => !c.has(x));
};
/** Une suite d'étapes est possible si chacune n'utilise que ce qui existe déjà. */
const valide = (l: string[]) => {
  const vus = new Set<string>();
  let droite = false;
  let cercle = false;
  for (const e of l) {
    if (e === "…") return false;
    for (const u of utilise(e)) if (!vus.has(u)) return false;
    if (/cette droite|cette parallèle/.test(e) && !droite) return false;
    if (/sur le cercle|aux deux cercles/.test(e) && !cercle) return false;
    for (const c of cree(e)) vus.add(c);
    if (/perpendiculaire|parallèle à|Trace une droite/.test(e)) droite = true;
    if (/Trace (?:un cercle|deux cercles)/.test(e)) cercle = true;
  }
  return true;
};
const etapesListe = (t: string) => t.split("\n").map((x) => x.trim()).filter((x) => /^(?:•|\d\.) /.test(x)).map((x) => x.replace(/^(?:•|\d\.) /, ""));
const peutFinirPar = (l: string[], e: string) => {
  const r0 = l.filter((x) => x !== e);
  return r0.length === 2 && (valide([r0[0], r0[1], e]) || valide([r0[1], r0[0], e]));
};
const peutCommencerPar = (l: string[], e: string) => {
  const r0 = l.filter((x) => x !== e);
  return r0.length === 2 && (valide([e, r0[0], r0[1]]) || valide([e, r0[1], r0[0]]));
};
const premier = (q: Q) => {
  const l = etapesListe(q.text);
  if (l.length !== 3) return ["liste illisible"];
  return unique(q, (c) => l.includes(c) && peutCommencerPar(l, c));
};
const dernier = (q: Q) => {
  const l = etapesListe(q.text);
  if (l.length !== 3) return ["liste illisible"];
  return unique(q, (c) => l.includes(c) && peutFinirPar(l, c));
};
const suivante = (q: Q) => {
  const debut = q.text.split(/(?<=\.) /)[0];
  return unique(q, (c) => !/^Rien/.test(c) && valide([debut, c]));
};
const ordreBon = (q: Q) => {
  const l = etapesListe(q.text);
  if (l.length !== 3) return ["liste illisible"];
  return unique(q, (c) => valide(c.split(", ").map((n) => l[Number(n) - 1])));
};
const manque = (q: Q) => {
  const l = etapesListe(q.text);
  if (l.indexOf("…") !== 1) return ["trou illisible"];
  return unique(q, (c) => valide([l[0], c, l[2]]));
};
const figureSuivie = (q: Q) => {
  const m = q.text.match(/segment \[[A-Z]+\] de (\d+) cm/);
  const n = q.text.match(/à (\d+) cm de/);
  if (!m || !n) return ["longueurs illisibles"];
  return texte(q, m[1] === n[1] ? "Un carré" : "Un rectangle");
};
const troisieme = (q: Q) => {
  const m = q.text.match(/([A-Z]) est un point commun/);
  return m ? texte(q, `Le point ${m[1]}`) : ["point illisible"];
};
const figureContexte = (q: Q) => {
  const l = [...q.text.matchAll(/(\d+) m\b/g)].map((m) => m[1]);
  if (l.length !== 2) return ["longueurs illisibles"];
  return texte(q, l[0] === l[1] ? "Un carré" : "Un rectangle");
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  figure_codage_tpl_1: sens,
  figure_codage_tpl_2: avecCodage(cotesEgaux),
  figure_codage_tpl_3: avecCodage(ouDroit),
  figure_codage_tpl_4: avecCodage(natureQuad),
  figure_codage_tpl_5: avecCodage(natureTri),
  figure_codage_tpl_6: avecCodage(longueurCodee),
  figure_codage_tpl_7: avecCodage(perimetreIso),
  figure_codage_tpl_8: avecCodage(perimetre4),
  figure_codage_tpl_9: avecCodage(estCarre),
  cercle_ensemble_points_tpl_1: rayon,
  cercle_ensemble_points_tpl_2: position,
  cercle_ensemble_points_tpl_3: surCercle,
  cercle_ensemble_points_tpl_4: diametre,
  cercle_ensemble_points_tpl_5: cercleOuDisque,
  cercle_ensemble_points_tpl_6: dedans,
  cercle_ensemble_points_tpl_7: atteint,
  cercle_ensemble_points_tpl_8: formeContexte,
  cercle_ensemble_points_tpl_9: plusLoin,
  figure_programme_construction_tpl_1: premier,
  figure_programme_construction_tpl_2: dernier,
  figure_programme_construction_tpl_3: suivante,
  figure_programme_construction_tpl_4: ordreBon,
  figure_programme_construction_tpl_5: manque,
  figure_programme_construction_tpl_6: figureSuivie,
  figure_programme_construction_tpl_7: premier,
  figure_programme_construction_tpl_8: troisieme,
  figure_programme_construction_tpl_9: figureContexte,
});
