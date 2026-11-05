import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, egal, fractions, justeNombre, justeTexte, justeUnique, nombres, num, valeur, NB } from "./outils";

// Les correcteurs de fractions-decimaux-trous.bank.ts : ils relisent le calcul écrit
// dans l'énoncé et le refont. Vide = juste.

const valF = (s: string) => { const m = s.match(/^(\d+)\/(\d+)$/); return m ? Number(m[1]) / Number(m[2]) : null; };
/** Une seule proposition vaut n/d, et l'attendue s'écrit exactement n/d. */
function justeFrac(q: Q, n: number, d: number): string[] {
  return [...justeTexte(q, `${n}/${d}`), ...justeUnique(q, (c) => { const v = valF(c); return v !== null && egal(v, n / d); })];
}

/* ── fraction_additionner ── */
/** Calcule une expression de fractions de même dénominateur : a/d + b/d − c/d. */
function lireExpr(t: string) {
  const m = t.match(/\d+\/\d+(?: [+−] \d+\/\d+)+/);
  if (!m) return null;
  const fs = fractions(m[0]);
  const ops = [...m[0].matchAll(/[+−]/g)].map((x) => x[0]);
  const d = fs[0][1];
  if (fs.some((x) => x[1] !== d)) return null;
  let n = fs[0][0];
  ops.forEach((o, i) => { n += o === "+" ? fs[i + 1][0] : -fs[i + 1][0]; });
  return { n, d };
}
function exprFrac(q: Q) {
  const e = lireExpr(q.text);
  if (!e) return ["expression illisible"];
  return justeFrac(q, e.n, e.d);
}
function barreOp(q: Q) {
  const fs = fractions(q.text);
  const [[a, d], [b]] = fs;
  const fig = q.canvas as any;
  if (fig?.fraction?.numerator !== a || fig?.fraction?.denominator !== d) return ["la barre ne montre pas la première fraction"];
  return justeFrac(q, /retire|enlève/.test(q.text) ? a - b : a + b, d);
}
const DE: Record<string, number> = { tiers: 3, quart: 4, quarts: 4, cinquième: 5, cinquièmes: 5, sixième: 6, sixièmes: 6, septième: 7, septièmes: 7, huitième: 8, huitièmes: 8, neuvième: 9, neuvièmes: 9, dixième: 10, dixièmes: 10, douzième: 12, douzièmes: 12 };
function enMots(q: Q) {
  const m = q.text.match(/(\d+) (\p{L}+) ([+−]) (\d+) (\p{L}+)/u);
  if (!m || DE[m[2]] !== DE[m[5]]) return ["calcul en mots illisible"];
  const n = m[3] === "+" ? Number(m[1]) + Number(m[4]) : Number(m[1]) - Number(m[4]);
  return justeUnique(q, (c) => { const x = c.match(/^(\d+) (\p{L}+)$/u); return !!x && Number(x[1]) === n && DE[x[2]] === DE[m[2]]; });
}
function trouFrac(q: Q) {
  const m = q.text.match(/(\d+)\/(\d+) ([+−]) … = (\d+)\/(\d+)/);
  if (!m || m[2] !== m[5]) return ["égalité à trou illisible"];
  const b = m[3] === "+" ? Number(m[4]) - Number(m[1]) : Number(m[1]) - Number(m[4]);
  return justeFrac(q, b, Number(m[2]));
}
function complementUn(q: Q) {
  const [[a, d]] = fractions(q.text);
  return justeFrac(q, d - a, d);
}
function ctxAdd(q: Q) {
  const [[a, d], [b, d2]] = fractions(q.text);
  if (d !== d2) return ["dénominateurs différents"];
  return justeFrac(q, a + b, d);
}
function ctxSous(q: Q) {
  const [[a, d], [b, d2]] = fractions(q.text);
  if (d !== d2 || b >= a) return ["soustraction impossible"];
  return justeFrac(q, a - b, d);
}
function depasse(q: Q) {
  const [[a, d], [b]] = fractions(q.text);
  return justeTexte(q, a + b > d ? "Oui" : "Non");
}
function reste(q: Q) {
  const [[a, d], [b]] = fractions(q.text);
  return justeFrac(q, d - a - b, d);
}

/* ── fraction_mixte_regrouper ── */
/** « 2 + 3/4 » ou « 3/4 + 2 » dans le texte. */
function lireMixte(t: string) {
  const m = t.match(/(\d+) \+ (\d+)\/(\d+)/) ?? t.match(/(\d+)\/(\d+) \+ (\d+)/);
  if (!m) return null;
  return /(\d+)\/(\d+) \+ (\d+)/.test(m[0]) ? { k: Number(m[3]), a: Number(m[1]), d: Number(m[2]) } : { k: Number(m[1]), a: Number(m[2]), d: Number(m[3]) };
}
function mixte(q: Q) {
  const x = lireMixte(q.text);
  if (!x) return ["somme illisible"];
  if (x.a >= x.d) return ["la fraction dépasse 1"];
  return justeFrac(q, x.k * x.d + x.a, x.d);
}
function combienDans(q: Q) {
  const k = nombres(q.text)[0];
  const d = DE[(q.text.match(/de (\p{L}+)/u) ?? q.text.match(/combien de (\p{L}+)/u))?.[1] ?? ""];
  if (!d) return ["dénominateur illisible"];
  return justeNombre(q, k * d);
}
function entierSur(q: Q) {
  const md = q.text.match(/(?:…\/|sur |dénominateur )(\d+)/);
  if (!md) return ["dénominateur illisible"];
  const d = Number(md[1]);
  const k = Number(q.text.replace(md[0], " ").match(/\d+/)?.[0]);
  return justeFrac(q, k * d, d);
}
function barreMixte(q: Q) {
  const [[a, d]] = fractions(q.text);
  const k = nombres(q.text)[0];
  const fig = q.canvas as any;
  if (fig?.fraction?.numerator !== a) return ["la barre ne montre pas la fraction"];
  return justeFrac(q, k * d + a, d);
}
function mixteMots(q: Q) {
  const x = lireMixte(q.text);
  if (!x) return ["somme illisible"];
  return justeNombre(q, x.k * x.d + x.a);
}
function ctxMixte(q: Q) {
  const k = nombres(q.text)[0];
  const [[a, d]] = fractions(q.text);
  return justeFrac(q, k * d + a, d);
}
function ctxMesure(q: Q) {
  const k = nombres(q.text)[0];
  const [[a, d]] = fractions(q.text);
  return justeNombre(q, k * d + a);
}
function sommeEgale(q: Q) {
  const [[n, d]] = fractions(q.text);
  return justeUnique(q, (c) => { const x = lireMixte(c); return !!x && x.a < x.d && egal(x.k * x.d + x.a, n) && x.d === d; });
}
function plusGrandMixte(q: Q) {
  const x = lireMixte(q.text);
  const fs = fractions(q.text);
  if (!x) return ["somme illisible"];
  const y = fs[fs.length - 1];
  const g = x.k + x.a / x.d, h = y[0] / y[1];
  if (egal(g, h)) return ["valeurs égales"];
  const grand = /plus grand/.test(q.text);
  return justeTexte(q, (grand ? g > h : g < h) ? `${x.k} + ${x.a}/${x.d}` : `${y[0]}/${y[1]}`);
}

/* ── decimal_somme_fractions ── */
/** La somme écrite dans une chaîne : nombres et fractions, tout ajouté. */
function valeurSomme(s: string): number | null {
  if (!s.includes("+") && !/^\d+\/\d+$/.test(s)) return null;
  let t = 0;
  for (const m of s.split("+").map((x) => x.trim())) {
    const v = /\//.test(m) ? valF(m) : Number(m.replace(",", "."));
    if (v === null || Number.isNaN(v)) return null;
    t += v;
  }
  return t;
}
function decVersSomme(q: Q) {
  const x = nombres(q.text)[0];
  return justeUnique(q, (c) => { const v = valeurSomme(c); return v !== null && egal(v, x); });
}
function sommeVersDec(q: Q) {
  const m = q.text.match(/[\d/]+(?: \+ [\d/]+)+/);
  if (!m) return ["somme illisible"];
  return justeNombre(q, valeurSomme(m[0])!);
}
function valeurChiffre(q: Q) {
  const l = q.text.match(new RegExp(`${NB}`, "g"))!;
  const dec = l.map((s) => s).find((s) => s.includes(","))!;
  const c = l.find((s) => !s.includes(","))!;
  const [, d] = dec.split(",");
  const i = d.indexOf(c);
  if (i < 0 || d.lastIndexOf(c) !== i) return [`chiffre ${c} ambigu dans ${dec}`];
  return justeTexte(q, i === 0 ? `${c}/10` : `${c}/100`);
}
function trouSomme(q: Q) {
  const x = nombres(q.text)[0];
  const m = q.text.match(/= (.+?) \+ (.+?) \+ (.+?)(?:\.| ?$|\. )/);
  if (!m) return ["égalité illisible"];
  const connu = [m[1], m[2], m[3]].filter((p) => !p.includes("…"));
  const s = connu.reduce((t, p) => t + valeurSomme(p + " + 0")!, 0);
  return justeUnique(q, (c) => { const v = valF(c); return v !== null && egal(v, x - s); });
}
function grille(q: Q) {
  const fig = q.canvas as any;
  const [[k], [a, dix]] = fractions(q.text);
  if (fig?.grid?.shaded !== k || dix !== 10) return ["grille incohérente"];
  return justeUnique(q, (c) => { const v = valF(c); return v !== null && egal(v, k / 100 - a / 10); });
}
function mesureSomme(q: Q) { return decVersSomme(q); }
function mesureDec(q: Q) {
  const e = nombres(q.text)[0];
  const [[a, d]] = fractions(q.text);
  return justeNombre(q, e + a / d);
}

/* ── fraction_decimale_comparer ── */
const SIGNE = (x: number, y: number) => (x < y ? "<" : x > y ? ">" : "=");
function comparerDeux(q: Q) {
  const fs = fractions(q.text);
  if (fs.length !== 2) return ["deux fractions attendues"];
  const [p, r] = fs;
  const s = SIGNE(p[0] / p[1], r[0] / r[1]);
  return justeTexte(q, `${p[0]}/${p[1]} ${s} ${r[0]}/${r[1]}`);
}
function dixCent(q: Q) {
  const fs = fractions(q.text);
  if (fs.length) { const [a, d] = fs[0]; const cible = d === 10 ? 100 : 10; return justeFrac(q, (a * cible) / d, cible); }
  // « …/100 » échappe à fractions() seulement si le numérateur est absent : on relit.
  return ["fraction illisible"];
}
function plusGrandeListe(q: Q) {
  const grand = /grande/.test(q.text);
  const vals = (q.choices ?? []).map((c) => valF(c)!);
  const j = grand ? Math.max(...vals) : Math.min(...vals);
  return justeUnique(q, (c) => egal(valF(c)!, j));
}
function encadrerFrac(q: Q) {
  const [[n, d]] = fractions(q.text);
  const x = n / d;
  const entiers = /entiers/.test(q.text);
  return justeUnique(q, (c) => {
    const p = c.split(" < ");
    if (p.length !== 3) return false;
    const lo = valF(p[0]) ?? Number(p[0]), hi = valF(p[2]) ?? Number(p[2]);
    if (!(lo < x && x < hi)) return false;
    return entiers ? egal(hi - lo, 1) : egal(hi - lo, 0.1);
  });
}
function droiteFrac(q: Q) {
  const pt = (q.canvas as any).points[0];
  const n = Math.round(pt.value * 10);
  if ((q.canvas as any).minorStep !== 0.1) return ["petite graduation absente"];
  return justeFrac(q, n, 10);
}
function rangement(q: Q) {
  const croissant = !/plus grand au plus petit/.test(q.text);
  return justeUnique(q, (c) => {
    const sep = c.includes(" < ") ? " < " : " > ";
    const v = c.split(sep).map((x) => valF(x)!);
    return sep === (croissant ? " < " : " > ") && v.every((y, i) => i === 0 || (croissant ? y > v[i - 1] : y < v[i - 1]));
  });
}
function quiPlus(q: Q) {
  const fs = fractions(q.text);
  const [p, r] = fs;
  const ph = q.text.split(".").map((s) => s.trim());
  const nom = (s: string) => s.replace(/ (court|verse|boit|pèse|mesure|pose|avance de|fait|contient|parcourt) .*$/, "");
  const j = p[0] / p[1] > r[0] / r[1] ? nom(ph[0]) : nom(ph[1]);
  return justeTexte(q, j);
}
function intercaler(q: Q) {
  const [[a], [b]] = fractions(q.text);
  return justeUnique(q, (c) => { const v = valF(c); return v !== null && v > a / 10 && v < b / 10; });
}

/* ── decimal_puissance_dix ── */
function calculP(q: Q) {
  const m = q.text.match(new RegExp(`${NB} ([×÷]) ${NB}(?: ([×÷]) ${NB})?`));
  if (!m) return ["calcul illisible"];
  let r = m[2] === "×" ? num(m[1]) * num(m[3]) : num(m[1]) / num(m[3]);
  if (m[4]) r = m[4] === "×" ? r * num(m[5]) : r / num(m[5]);
  return justeNombre(q, r);
}
const RANGS = ["millième", "centième", "dixième", "unité", "dizaine", "centaine", "millier"];
function valeurApres(q: Q) {
  const m = q.text.match(new RegExp(`${NB}`, "g"))!;
  const dec = m.find((s) => s.includes(","))!;
  const fois = /×|multipli/.test(q.text);
  const c = m.find((s) => !s.includes(",") && s !== "10")!;
  const [e, d] = dec.split(",");
  const iD = d.indexOf(c);
  const iE = e.lastIndexOf(c);
  let rang: number;
  if (iD >= 0 && iE < 0) rang = 2 - iD;
  else if (iE === e.length - 1 && iD < 0) rang = 3;
  else return [`chiffre ${c} ambigu dans ${dec}`];
  const nv = rang + (fois ? 1 : -1);
  return justeUnique(q, (x) => { const y = x.match(/^(\d+) (\p{L}+?)s?$/u); return !!y && y[1] === c && RANGS.indexOf(y[2]) === nv; });
}
function trouP(q: Q) {
  const m = q.text.match(new RegExp(`${NB} ([×÷]) … = ${NB}`));
  if (!m) return ["égalité illisible"];
  const a = num(m[1]), b = num(m[3]);
  return justeNombre(q, m[2] === "×" ? b / a : a / b);
}
function prixFois(q: Q) {
  const px = nombres(q.text)[0];
  const k = nombres(q.text)[1];
  return justeNombre(q, px * k, "€");
}
function un10e(q: Q) {
  const [k, x] = nombres(q.text);
  if (k !== 10) return ["10 attendu"];
  return justeNombre(q, x / 10);
}
const FACTEUR: Record<string, Record<string, number>> = { m: { cm: 100, mm: 1000, km: 0.001 }, km: { m: 1000 }, kg: { g: 1000 }, L: { cL: 100 }, cm: { mm: 10, m: 0.01 }, g: { kg: 0.001 }, cL: { L: 0.01 }, mm: { cm: 0.1 }, dm: { m: 0.1 } };
function conversion(q: Q) {
  const m = q.text.match(new RegExp(`${NB} (km|mm|cm|dm|m|kg|g|cL|L)\\.`));
  const a = q.text.match(/(?:en|Convertis en) (km|mm|cm|dm|m|kg|g|cL|L)\b/);
  if (!m || !a) return ["mesure illisible"];
  const k = FACTEUR[m[2]]?.[a[1]];
  if (!k) return [`conversion inconnue ${m[2]} → ${a[1]}`];
  return justeNombre(q, num(m[1]) * k, a[1]);
}

/* ── decimal_ajouter_dixiemes ── */
const VAL: Record<string, number> = { dixième: 0.1, dixièmes: 0.1, centième: 0.01, centièmes: 0.01 };
const dt = (s: string) => [...s.matchAll(new RegExp(`${NB} (dixièmes?|centièmes?)`, "g"))].map((m) => ({ n: num(m[1]), v: VAL[m[2]] }));
function ajouter(q: Q) {
  const [p] = dt(q.text);
  const x = nombres(q.text.replace(new RegExp(`${NB} (dixièmes?|centièmes?)`, "g"), " "))[0];
  if (!p || x === undefined) return ["texte illisible"];
  const moins = /Enlève|Retire|enlève|−|avant/.test(q.text);
  return justeNombre(q, x + (moins ? -1 : 1) * p.n * p.v);
}
function calculJ(q: Q) {
  const m = q.text.match(new RegExp(`${NB} ([+−]) ${NB}`));
  if (!m) return ["calcul illisible"];
  return justeNombre(q, m[2] === "+" ? num(m[1]) + num(m[3]) : num(m[1]) - num(m[3]));
}
function ajouterDeux(q: Q) {
  const ps = dt(q.text);
  const x = nombres(q.text.replace(new RegExp(`${NB} (dixièmes?|centièmes?)`, "g"), " "))[0];
  return justeNombre(q, x + ps.reduce((t, p) => t + p.n * p.v, 0));
}
function chrono(q: Q) {
  const [p] = dt(q.text);
  const x = nombres(q.text.replace(new RegExp(`${NB} (dixièmes?|centièmes?)`, "g"), " ").replace(/\b\d+ m\b(?! ?:)/, (s) => (/fait son/.test(q.text) ? " " : s)))[0];
  const moins = /de moins/.test(q.text);
  return justeNombre(q, x + (moins ? -1 : 1) * p.n * p.v);
}
function centimes(q: Q) {
  const [x, c] = nombres(q.text);
  return justeNombre(q, x + (/baisse/.test(q.text) ? -1 : 1) * c / 100, "€");
}
function deuxEtapes(q: Q) {
  const ps = dt(q.text);
  const x = nombres(q.text.replace(new RegExp(`${NB} (dixièmes?|centièmes?)`, "g"), " "))[0];
  const aj = q.text.match(/[Aa]joute (\d+) (dixièmes?|centièmes?)/);
  const en = q.text.match(/[Ee]nlève (\d+) (dixièmes?|centièmes?)/);
  if (!aj || !en || ps.length !== 2) return ["étapes illisibles"];
  return justeNombre(q, x + Number(aj[1]) * VAL[aj[2]] - Number(en[1]) * VAL[en[2]]);
}
function manque(q: Q) {
  const [x, c] = nombres(q.text);
  const v = /dixièmes/.test(q.text) ? 0.1 : 0.01;
  return justeNombre(q, (c - x) / v);
}

const A = "cm1_fraction_additionner_tpl_", R = "cm1_fraction_mixte_regrouper_tpl_", S = "cm1_decimal_somme_fractions_tpl_", C = "cm1_fraction_decimale_comparer_tpl_", P = "cm1_decimal_puissance_dix_tpl_", J = "cm1_decimal_ajouter_dixiemes_tpl_";
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  [`${A}1`]: exprFrac, [`${A}2`]: barreOp, [`${A}3`]: enMots, [`${A}4`]: exprFrac, [`${A}5`]: trouFrac, [`${A}6`]: complementUn, [`${A}7`]: ctxAdd, [`${A}8`]: ctxSous, [`${A}9`]: exprFrac, [`${A}10`]: depasse, [`${A}11`]: reste,
  [`${R}1`]: mixte, [`${R}2`]: combienDans, [`${R}3`]: entierSur, [`${R}4`]: mixte, [`${R}5`]: barreMixte, [`${R}6`]: mixteMots, [`${R}7`]: ctxMixte, [`${R}8`]: ctxMesure, [`${R}9`]: sommeEgale, [`${R}10`]: plusGrandMixte,
  [`${S}1`]: decVersSomme, [`${S}2`]: sommeVersDec, [`${S}3`]: valeurChiffre, [`${S}4`]: trouSomme, [`${S}5`]: decVersSomme, [`${S}6`]: sommeVersDec, [`${S}7`]: sommeVersDec, [`${S}8`]: grille, [`${S}9`]: mesureSomme, [`${S}10`]: mesureDec, [`${S}11`]: sommeVersDec, [`${S}12`]: sommeVersDec,
  [`${C}1`]: comparerDeux, [`${C}2`]: comparerDeux, [`${C}3`]: dixCent, [`${C}4`]: plusGrandeListe, [`${C}5`]: encadrerFrac, [`${C}6`]: droiteFrac, [`${C}7`]: rangement, [`${C}8`]: quiPlus, [`${C}9`]: intercaler, [`${C}10`]: rangement, [`${C}11`]: comparerDeux,
  [`${P}1`]: calculP, [`${P}2`]: valeurApres, [`${P}3`]: trouP, [`${P}4`]: calculP, [`${P}5`]: trouP, [`${P}6`]: valeurApres, [`${P}7`]: prixFois, [`${P}8`]: un10e, [`${P}9`]: conversion, [`${P}10`]: calculP,
  [`${J}1`]: ajouter, [`${J}2`]: ajouter, [`${J}3`]: calculJ, [`${J}4`]: ajouter, [`${J}5`]: ajouterDeux, [`${J}6`]: calculJ, [`${J}7`]: chrono, [`${J}8`]: centimes, [`${J}9`]: deuxEtapes, [`${J}10`]: manque,
});
