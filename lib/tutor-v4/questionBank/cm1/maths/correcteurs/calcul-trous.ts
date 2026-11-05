import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import { type Q, NB, justeNombre, justeTexte, justeUnique, nombres, num, valeur } from "./outils";

// Les correcteurs de calcul-trous.bank.ts : relisent le calcul, le programme,
// l'heure ou la figure, et refont le raisonnement. Vide = juste.

/* ── multiplication_decimale_posee ── */
const RE_MUL = new RegExp(`${NB} × ${NB}`, "g");
const dernierProduit = (t: string) => {
  const l = [...t.matchAll(RE_MUL)];
  const m = l[l.length - 1];
  return m ? { a: num(m[1]), b: num(m[2]) } : null;
};
function produit(q: Q) {
  const p = dernierProduit(q.text);
  if (!p) return ["produit illisible"];
  return justeNombre(q, p.a * p.b);
}
function produitConnu(q: Q) {
  const m = q.text.match(new RegExp(`${NB} × ${NB} = ${NB}`));
  if (!m || num(m[1]) * num(m[2]) !== num(m[3])) return [`produit donné faux : ${q.text}`];
  return produit(q);
}
function nbChiffres(q: Q) {
  const p = q.text.match(new RegExp(`${NB} × ${NB}`));
  if (!p) return ["produit illisible"];
  const dec = (p[1].split(",")[1] ?? "").length;
  return justeTexte(q, `${dec} chiffre${dec > 1 ? "s" : ""}`);
}
function pose(q: Q) {
  const c = q.canvas as any;
  if (c?.kind !== "calcul_pose") return ["figure absente"];
  if (c.result || c.display?.showResult) return ["la pose montre le résultat"];
  return justeNombre(q, num(c.numbers[0]) * num(c.numbers[1]));
}
function prix(q: Q) {
  const [x, n] = nombres(q.text);
  return justeNombre(q, x * n, "€");
}
function longueur(q: Q) {
  const [x, n] = nombres(q.text);
  return justeNombre(q, x * n);
}
function rendu(q: Q) {
  const prixU = Number(q.text.match(new RegExp(`${NB} €`))![1].replace(",", "."));
  const n = Number(q.text.match(/achète (\d+)/)![1]);
  const b = num(q.text.match(new RegExp(`(?:avec|billet de) ${NB} €`))![1]);
  if (prixU * n > b) return ["le billet ne suffit pas"];
  return justeNombre(q, b - prixU * n, "€");
}

/* ── algebre_programme_calcul ── */
type Et = { o: string; k: number };
function lireEtapes(t: string): Et[] {
  const l: Et[] = [];
  for (const m of t.matchAll(/(ajoute|retire|multiplie par|prends le double|multiplié par)(?: (\d+))?/gi)) {
    const o = m[1].toLowerCase();
    l.push({ o, k: o === "prends le double" ? 2 : Number(m[2]) });
  }
  return l;
}
const applique = (v: number, e: Et) => (e.o === "ajoute" ? v + e.k : e.o === "retire" ? v - e.k : v * e.k);
const execute = (v: number, l: Et[]) => l.reduce(applique, v);
function programme(q: Q) {
  const n = nombres(q.text)[0];
  const l = lireEtapes(q.text);
  if (!l.length) return ["étapes illisibles"];
  return justeNombre(q, execute(n, l));
}
function ctxStock(q: Q) {
  const n = nombres(q.text)[0];
  const k = Number(q.text.match(/multiplié par (\d+)/)![1]);
  const a = Number(q.text.match(/ajoute (\d+)/)![1]);
  return justeNombre(q, n * k + a);
}
function deuxProgrammes(q: Q) {
  const n = nombres(q.text)[0];
  const [ta, tb] = q.text.split("Programme B");
  const ra = execute(n, lireEtapes(ta.split("Programme A")[1])), rb = execute(n, lireEtapes(tb));
  if (ra === rb) return ["résultats égaux"];
  return justeTexte(q, ra > rb ? "Programme A" : "Programme B");
}
function quelleEtape(q: Q) {
  const [n, r] = nombres(q.text);
  return justeUnique(q, (c) => {
    const l = lireEtapes(c);
    return l.length === 1 && applique(n, l[0]) === r;
  });
}
function remonter(q: Q) {
  const l = lireEtapes(q.text);
  const nb = nombres(q.text);
  const r = nb[nb.length - 1];
  return justeUnique(q, (c) => execute(valeur(c)!, l) === r);
}
function quelProgramme(q: Q) {
  const [n, r] = nombres(q.text);
  return justeUnique(q, (c) => execute(n, lireEtapes(c)) === r);
}

/* ── calcul_estimer ── */
const lireOp = (t: string) => {
  const m = t.match(new RegExp(`${NB} ([+−×÷]) ${NB}`));
  if (!m) return null;
  const a = num(m[1]), b = num(m[3]);
  return { a, b, op: m[2], r: m[2] === "+" ? a + b : m[2] === "−" ? a - b : m[2] === "×" ? a * b : a / b };
};
/** Une seule proposition est proche du résultat exact. */
function prochePropose(q: Q, exact: number) {
  return justeUnique(q, (c) => { const v = valeur(c); return v !== null && Math.abs(v - exact) / exact < 0.2; });
}
/** Le nombre rond le plus proche ; un petit facteur reste tel quel. */
const rond = (x: number) => (x < 10 ? x : x < 100 ? Math.round(x / 10) * 10 : Math.round(x / 100) * 100);
const rondSomme = (x: number) => (x < 100 ? Math.round(x / 10) * 10 : Math.round(x / 100) * 100);
function estimer(q: Q) {
  const o = lireOp(q.text);
  if (!o) return ["calcul illisible"];
  if (o.op === "÷") return prochePropose(q, o.r);
  const a = rond(o.a), b = o.op === "×" ? rond(o.b) : rondSomme(o.b);
  return justeNombre(q, o.op === "+" ? a + b : o.op === "−" ? a - b : a * b);
}
function calculSimple(q: Q) {
  const o = lireOp(q.text);
  if (!o) return ["calcul illisible"];
  return justeUnique(q, (c) => {
    const s = lireOp(c);
    if (!s || s.op !== o.op) return false;
    if (o.op === "÷") return s.b === o.b && Math.abs(s.a - o.a) / o.a < 0.2;
    return s.a === rond(o.a) && s.b === (o.op === "×" ? rond(o.b) : rondSomme(o.b));
  });
}
function estimerPrix(q: Q) {
  const nb = nombres(q.text);
  const px = nb.find((x) => !Number.isInteger(x))!;
  const n = nb.find((x) => x !== px)!;
  return prochePropose(q, px * n);
}
function estimerSomme(q: Q) {
  const [a, b] = nombres(q.text);
  return prochePropose(q, a + b);
}
function possible(q: Q) {
  const m = q.text.match(new RegExp(`trouve ${NB} pour ${NB} × ${NB}`));
  if (!m) return ["énoncé illisible"];
  const prop = num(m[1]), exact = num(m[2]) * num(m[3]);
  return justeTexte(q, prop === exact ? "Oui" : "Non");
}
function bonResultat(q: Q) {
  const o = lireOp(q.text);
  if (!o) return ["calcul illisible"];
  return justeNombre(q, o.r);
}

/* ── calcul_procedures ── */
function astuceAdd(q: Q) {
  const o = lireOp(q.text)!;
  return justeUnique(q, (c) => {
    const m = c.match(/^ajouter (\d+), puis retirer (\d+)$/);
    return !!m && Number(m[1]) - Number(m[2]) === o.b && Number(m[1]) % 10 === 0;
  });
}
const ETAPES_MUL = (c: string, n: number) => {
  if (/^multiplier par 10, puis prendre la moitié$/.test(c)) return (n * 10) / 2;
  if (/^prendre le double, puis encore le double$/.test(c)) return n * 4;
  if (/^prendre le double, trois fois de suite$/.test(c)) return n * 8;
  return null;
};
function astuceMul(q: Q) {
  const o = lireOp(q.text)!;
  return justeUnique(q, (c) => ETAPES_MUL(c, o.a) === o.r);
}
function calcOp(q: Q) {
  const o = lireOp(q.text.replace(/^[^.]*\d[^.]*\. /, ""));
  if (!o) return ["calcul illisible"];
  return justeNombre(q, o.r);
}
function decomposer(q: Q) {
  const o = lireOp(q.text)!;
  return justeUnique(q, (c) => {
    const m = c.match(/^(\d+) × (\d+) \+ (\d+) × (\d+)$/);
    return !!m && Number(m[1]) + Number(m[3]) === o.a && m[2] === m[4] && Number(m[2]) === o.b && Number(m[1]) * Number(m[2]) + Number(m[3]) * Number(m[4]) === o.r;
  });
}
function ctxAdd(q: Q) {
  const [n, k] = nombres(q.text);
  return justeNombre(q, n + k);
}
function ctxMul(q: Q) {
  const [n, m] = nombres(q.text);
  return justeNombre(q, n * m);
}
function trouDist(q: Q) {
  const m = q.text.match(/(\d+) × (\d+) = (\d+) × (\d+) \+ …/);
  if (!m || m[2] !== m[4]) return ["égalité illisible"];
  const u = Number(m[1]) - Number(m[3]);
  return justeTexte(q, `${u} × ${m[2]}`);
}

/* ── duree_positionner_aiguilles ── */
const lireHeure = (t: string) => {
  const m = t.match(/(\d{1,2}) h(?: (\d{2}))?/);
  return m ? { h: Number(m[1]) % 12 || 12, hBrut: Number(m[1]), m: m[2] ? Number(m[2]) : 0 } : null;
};
const suiv = (h: number) => (h === 12 ? 1 : h + 1);
function aiguille(q: Q) {
  const x = lireHeure(q.text);
  if (!x) return ["heure illisible"];
  if (/grande/.test(q.text)) return justeTexte(q, `Sur le ${x.m === 0 ? 12 : x.m / 5}`);
  const pos = x.m === 0 ? `Sur le ${x.h}` : x.m < 20 ? `Juste après le ${x.h}` : x.m <= 40 ? `Entre le ${x.h} et le ${suiv(x.h)}` : `Juste avant le ${suiv(x.h)}`;
  return justeTexte(q, pos);
}
function plusTard(q: Q) {
  const c = q.canvas as any;
  if (c?.kind !== "duree" || !c.time) return ["horloge absente"];
  if (c.display?.showDigital) return ["l'affichage numérique donne l'heure"];
  const dt = nombres(q.text)[0];
  const r = (c.time.minute + dt) % 60;
  return justeTexte(q, `Sur le ${r === 0 ? 12 : r / 5}`);
}
function nombresPasses(q: Q) {
  const m = nombres(q.text)[0];
  return justeNombre(q, m / 5);
}

/* ── probabilite_issues ── */
function nbIssuesExp(q: Q) {
  const t = q.text;
  const m = t.match(/dé à (\d+) faces|roue à (\d+) cases|de 1 à (\d+)/);
  const n = m ? Number(m[1] ?? m[2] ?? m[3]) : /pièce/.test(t) ? 2 : /semaine/.test(t) ? 7 : /saison/.test(t) ? 4 : /mois/.test(t) ? 12 : 0;
  if (!n) return ["expérience illisible"];
  return justeNombre(q, n);
}
function listeIssues(q: Q) {
  const t = q.text;
  const m = t.match(/dé à (\d+) faces|de 1 à (\d+)/);
  const n = m ? Number(m[1] ?? m[2]) : 0;
  const j = /pièce/.test(t) ? "Pile et Face" : /saison/.test(t) ? "Printemps, été, automne et hiver" : n ? `${Array.from({ length: n - 1 }, (_, i) => i + 1).join(", ")} et ${n}` : "";
  if (!j) return ["expérience illisible"];
  return justeTexte(q, j);
}
function estIssue(q: Q) {
  const [f, v] = nombres(q.text.replace(/à partir de 1/, ""));
  return justeTexte(q, v >= 1 && v <= f ? "Oui" : "Non");
}
const NOM_COUL: Record<string, string> = { "#ef4444": "rouge", "#3b82f6": "bleu", "#22c55e": "vert", "#eab308": "jaune", "#a855f7": "violet", "#f97316": "orange" };
function couleursSac(q: Q) {
  const c = q.canvas as any;
  return new Set<string>(c.billes.elements.map((e: any) => NOM_COUL[e.couleur]));
}
function issuesSac(q: Q) {
  const s = couleursSac(q);
  return justeUnique(q, (c) => {
    const l = c.split(/, | et /);
    return l.length === s.size && l.every((x) => s.has(x));
  });
}
function issuesRoue(q: Q) {
  const c = q.canvas as any;
  return justeNombre(q, new Set(c.roue.segments.map((s: any) => s.label)).size);
}
function condition(t: string): ((x: number) => boolean) | null {
  if (/nombre pair/.test(t)) return (x) => x % 2 === 0;
  if (/nombre impair/.test(t)) return (x) => x % 2 === 1;
  if (/multiple de 3/.test(t)) return (x) => x % 3 === 0;
  const m = t.match(/(plus de|moins de|au moins|au plus) (\d)/);
  if (!m) return null;
  const k = Number(m[2]);
  return m[1] === "plus de" ? (x) => x > k : m[1] === "moins de" ? (x) => x < k : m[1] === "au moins" ? (x) => x >= k : (x) => x <= k;
}
function compteFaces(q: Q) {
  const f = condition(q.text);
  if (!f) return ["condition illisible"];
  return justeNombre(q, [1, 2, 3, 4, 5, 6].filter(f).length);
}
function lettres(q: Q) {
  const m = q.text.match(/\b[A-Z]{4,}\b/);
  if (!m) return ["mot illisible"];
  return justeNombre(q, new Set(m[0]).size);
}
function couleursListe(q: Q) {
  const m = q.text.match(/ : ([^.]+)\./);
  if (!m) return ["liste illisible"];
  return justeNombre(q, m[1].split(", ").length);
}
function facesGagnantes(q: Q) {
  const f = condition(q.text);
  if (!f) return ["condition illisible"];
  return justeTexte(q, [1, 2, 3, 4, 5, 6].filter(f).join(", "));
}
function possibleSac(q: Q) {
  const s = couleursSac(q);
  const imp = /impossible|ne peut pas/.test(q.text);
  return justeUnique(q, (c) => { const x = c.replace("Tirer une bille ", "").replace(/^bleue$/, "bleu").replace(/^verte$/, "vert").replace(/^violette$/, "violet"); return imp ? !s.has(x) : s.has(x); });
}

const M = "cm1_multiplication_decimale_posee_tpl_", A = "cm1_algebre_programme_calcul_tpl_", E = "cm1_calcul_estimer_tpl_", P = "cm1_calcul_procedures_tpl_", D = "cm1_duree_positionner_aiguilles_tpl_", I = "cm1_probabilite_issues_tpl_";
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  [`${M}1`]: produit, [`${M}2`]: produitConnu, [`${M}3`]: nbChiffres, [`${M}4`]: produit, [`${M}5`]: produitConnu, [`${M}6`]: pose, [`${M}7`]: prix, [`${M}8`]: longueur, [`${M}9`]: produit, [`${M}10`]: rendu,
  [`${A}1`]: programme, [`${A}2`]: programme, [`${A}3`]: programme, [`${A}4`]: programme, [`${A}5`]: deuxProgrammes, [`${A}6`]: quelleEtape, [`${A}7`]: programme, [`${A}8`]: ctxStock, [`${A}9`]: remonter, [`${A}10`]: quelProgramme,
  [`${E}1`]: estimer, [`${E}2`]: estimer, [`${E}3`]: calculSimple, [`${E}4`]: estimer, [`${E}5`]: estimer, [`${E}6`]: calculSimple, [`${E}7`]: estimerPrix, [`${E}8`]: estimerSomme, [`${E}9`]: possible, [`${E}10`]: bonResultat,
  [`${P}1`]: astuceAdd, [`${P}2`]: calcOp, [`${P}3`]: astuceMul, [`${P}4`]: calcOp, [`${P}5`]: decomposer, [`${P}6`]: calcOp, [`${P}7`]: ctxAdd, [`${P}8`]: ctxMul, [`${P}9`]: trouDist, [`${P}10`]: calcOp,
  [`${D}1`]: aiguille, [`${D}2`]: aiguille, [`${D}3`]: aiguille, [`${D}4`]: aiguille, [`${D}5`]: aiguille, [`${D}6`]: aiguille, [`${D}7`]: aiguille, [`${D}8`]: aiguille, [`${D}9`]: plusTard, [`${D}10`]: nombresPasses,
  [`${I}1`]: nbIssuesExp, [`${I}2`]: listeIssues, [`${I}3`]: estIssue, [`${I}4`]: issuesSac, [`${I}5`]: issuesRoue, [`${I}6`]: compteFaces, [`${I}7`]: lettres, [`${I}8`]: couleursListe, [`${I}9`]: facesGagnantes, [`${I}10`]: possibleSac,
});
