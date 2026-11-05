import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egal, nombres, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE problemes-recherche.bank.ts. Vide = juste. Force brute : on
// essaie toutes les solutions à partir des nombres relus dans l'énoncé.

const unite = (q: Q) => String(q.expected[0]).replace(/^[\d ,]+/, "").trim();
const produit = (q: Q) => reponse(q, nombres(q.text).reduce((p, x) => p * x, 1));

/* dénombrer */
const tableauCodes = (q: Q) => {
  const f = q.canvas as any;
  return reponse(q, f.rows.length * (f.rows[0].values.length - 1));
};
const codes = (q: Q) => {
  const l = q.text.match(/Lettres : ([A-E, ]+)\./)?.[1].split(", ").length;
  const c = q.text.match(/Chiffres : ([\d, ]+)\./)?.[1].split(", ").length;
  if (!l || !c) return ["listes illisibles"];
  return reponse(q, l * c);
};
const chiffres = (t: string) => t.match(/(?:les chiffres|chiffres) ([\d, ]+)\./)?.[1].split(", ").map(Number) ?? [];
const sansRepeter = (q: Q) => {
  const c = chiffres(q.text);
  let t = 0;
  for (const d of c) for (const u of c) if (d !== u) t++;
  return c.length ? reponse(q, t) : ["chiffres illisibles"];
};
const avecRepeter = (q: Q) => {
  const c = chiffres(q.text);
  return c.length ? reponse(q, c.length ** 2) : ["chiffres illisibles"];
};

/* toutes les solutions */
const sommes = (q: Q) => {
  const n = nombres(q.text)[0];
  let t = 0;
  for (let a = 1; a < n; a++) if (a <= n - a) t++;
  return reponse(q, t);
};
const ev = (c: string) => {
  const m = c.match(/^(\d+) × (\d+)$/);
  return m ? Number(m[1]) * Number(m[2]) : NaN;
};
const calculQuiDonne = (q: Q) => {
  const n = nombres(q.text)[0];
  return unique(q, (c) => ev(c) === n);
};
const nbRect = (n: number) => {
  let t = 0;
  for (let L = 1; L * L <= n; L++) if (n % L === 0) t++;
  return t;
};
const rectangles = (q: Q) => reponse(q, nbRect(nombres(q.text)[0]));
const nbSol = (N: number, p: number, q2: number) => {
  let t = 0;
  for (let a = 0; a * p <= N; a++) for (let b = 0; a * p + b * q2 <= N; b++) if (a * p + b * q2 === N) t++;
  return t;
};
const boitesLaquelle = (q: Q) => {
  const N = nombres(q.text)[0];
  return unique(q, (c) => {
    const [a, p, b, r] = nombres(c);
    return a * p + b * r === N;
  });
};
const nbBoites = (q: Q) => {
  // Boîtes de p ou q objets, on veut N.
  const m = q.text.match(/(\d+)(?: €)? ou (?:de )?(\d+)/);
  if (!m) return ["boîtes illisibles"];
  const p = Number(m[1]);
  const r = Number(m[2]);
  const reste = nombres(q.text.replace(m[0], ""));
  if (reste.length !== 1) return [`total illisible : ${reste.join(",")}`];
  return reponse(q, nbSol(reste[0], p, r));
};
const manquant = (q: Q) => {
  const n = nombres(q.text)[0];
  const deja = [...(q.text.split(/ :|On a :/).pop() ?? "").matchAll(/(\d+) × (\d+)/g)].map((m) => `${m[1]} × ${m[2]}`);
  return unique(q, (c) => ev(c) === n && !deja.includes(c));
};
const codeSomme = (q: Q) => {
  const s = q.text.match(/chiffres vaut (\d+)/);
  if (!s) return ["somme illisible"];
  let t = 0;
  for (let d = 1; d <= 9; d++) for (let u = 0; u <= 9; u++) if (d + u === Number(s[1])) t++;
  return reponse(q, t);
};

/* optimiser */
const minPaquets = (N: number, p: number, r: number) => {
  let m = Infinity;
  for (let a = 0; a * p <= N; a++) if ((N - a * p) % r === 0) m = Math.min(m, a + (N - a * p) / r);
  return m;
};
const paquets = (q: Q) => {
  const m = q.text.match(/paquets de (\d+) et de (\d+)/);
  if (!m) return ["paquets illisibles"];
  const N = nombres(q.text.replace(m[0], ""))[0];
  return reponse(q, minPaquets(N, Number(m[1]), Number(m[2])), "paquets");
};
const paquetsContexte = (q: Q) => {
  const b = q.text.match(/de (\d+) ou de (\d+)/);
  if (!b) return ["illisible"];
  const N = nombres(q.text)[0];
  return reponse(q, minPaquets(N, Number(b[1]), Number(b[2])));
};
const lotUnite = (q: Q) => {
  const [u, k, lot] = nombres(q.text);
  return texte(q, lot < k * u ? "Le lot" : "À l'unité");
};
const maxObjets = (q: Q) => {
  const [t, u] = nombres(q.text);
  return reponse(q, Math.floor(t / u));
};
const aireMax = (P: number) => {
  let m = 0;
  for (let L = 1; L < P / 2; L++) m = Math.max(m, L * (P / 2 - L));
  return m;
};
const aire = (q: Q) => reponse(q, aireMax(nombres(q.text)[0]), unite(q));
const deuxOffres = (q: Q) => {
  const [a, pa, b, pb, N] = nombres(q.text);
  return reponse(q, Math.min((N / a) * pa, (N / b) * pb), "€");
};
const pieces = (q: Q) => {
  const N = nombres(q.text)[3];
  let m = Infinity;
  for (let c = 0; c * 5 <= N; c++) for (let d = 0; c * 5 + d * 2 <= N; d++) m = Math.min(m, c + d + (N - c * 5 - d * 2));
  return reponse(q, m, "pièces");
};
const carnet = (q: Q) => {
  const [u, k, c, N] = nombres(q.text);
  let m = N * u;
  for (let a = 1; a <= 10; a++) m = Math.min(m, a * c + Math.max(0, N - a * k) * u);
  return reponse(q, m, "€");
};

/* motif */
const lireSuite = (t: string) => {
  const p = [...t.matchAll(/(?:[Éé]tape )?(\d+)(?: [a-zé]+)? : (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])]);
  if (p.length < 3) return null;
  const a = p[1][1] - p[0][1];
  if (p[2][1] - p[1][1] !== a) return null;
  return { a, b: p[0][1] - a };
};
/** Les carrés du dessin : les colonnes contiguës forment une étape. */
const lireDessin = (q: Q) => {
  const f = q.canvas as any;
  const parCol = new Map<number, number>();
  for (const [, c] of f.grid.filledCells) parCol.set(c, (parCol.get(c) ?? 0) + 1);
  const cols = [...parCol.keys()].sort((x, y) => x - y);
  const etapes: number[] = [];
  let prec = -5;
  for (const c of cols) {
    if (c !== prec + 1) etapes.push(0);
    etapes[etapes.length - 1] += parCol.get(c)!;
    prec = c;
  }
  if (etapes.length !== 3 || etapes[1] - etapes[0] !== etapes[2] - etapes[1]) return null;
  const a = etapes[1] - etapes[0];
  return { a, b: etapes[0] - a };
};
const dernier = (t: string) => {
  const l = nombres(t);
  return l[l.length - 1];
};
const etapeTexte = (q: Q) => {
  const s = lireSuite(q.text);
  return s ? reponse(q, s.a * dernier(q.text) + s.b) : ["suite illisible"];
};
const etapeDessin = (q: Q) => {
  const s = lireDessin(q);
  return s ? reponse(q, s.a * dernier(q.text) + s.b) : ["dessin illisible"];
};
const ajoutDessin = (q: Q) => {
  const s = lireDessin(q);
  return s ? reponse(q, s.a) : ["dessin illisible"];
};
const evCalcul = (c: string) => {
  const m = c.match(/^(\d+) ([×+]) (\d+)(?: \+ (\d+))?$/);
  if (!m) return NaN;
  const r = m[2] === "×" ? Number(m[1]) * Number(m[3]) : Number(m[1]) + Number(m[3]);
  return r + (m[4] ? Number(m[4]) : 0);
};
const calculMotif = (q: Q) => {
  const s = lireSuite(q.text);
  if (!s) return ["suite illisible"];
  const n = dernier(q.text);
  return unique(q, (c) => egal(evCalcul(c), s.a * n + s.b));
};
const motifContexte = (q: Q) => {
  const s = lireSuite(q.text);
  return s ? reponse(q, s.a * dernier(q.text) + s.b, unite(q)) : ["suite illisible"];
};
const motifInverse = (q: Q) => {
  const s = lireSuite(q.text);
  if (!s) return ["suite illisible"];
  const r = dernier(q.text);
  return reponse(q, (r - s.b) / s.a);
};
const motifVrai = (q: Q) => {
  const s = lireSuite(q.text);
  const m = q.text.match(/annonce (\d+) [^\d]+? pour (\d+) /);
  if (!s || !m) return ["illisible"];
  return texte(q, Number(m[1]) === s.a * Number(m[2]) + s.b ? "Oui" : "Non");
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  probleme_denombrement_tpl_1: produit,
  probleme_denombrement_tpl_2: tableauCodes,
  probleme_denombrement_tpl_3: codes,
  probleme_denombrement_tpl_4: produit,
  probleme_denombrement_tpl_5: sansRepeter,
  probleme_denombrement_tpl_6: avecRepeter,
  probleme_denombrement_tpl_7: produit,
  probleme_denombrement_tpl_8: produit,
  probleme_denombrement_tpl_9: produit,
  probleme_toutes_solutions_tpl_1: sommes,
  probleme_toutes_solutions_tpl_2: calculQuiDonne,
  probleme_toutes_solutions_tpl_3: rectangles,
  probleme_toutes_solutions_tpl_4: boitesLaquelle,
  probleme_toutes_solutions_tpl_5: nbBoites,
  probleme_toutes_solutions_tpl_6: manquant,
  probleme_toutes_solutions_tpl_7: nbBoites,
  probleme_toutes_solutions_tpl_8: rectangles,
  probleme_toutes_solutions_tpl_9: codeSomme,
  probleme_optimisation_tpl_1: paquets,
  probleme_optimisation_tpl_2: lotUnite,
  probleme_optimisation_tpl_3: maxObjets,
  probleme_optimisation_tpl_4: aire,
  probleme_optimisation_tpl_5: deuxOffres,
  probleme_optimisation_tpl_6: pieces,
  probleme_optimisation_tpl_7: paquetsContexte,
  probleme_optimisation_tpl_8: carnet,
  probleme_optimisation_tpl_9: aire,
  algebre_motif_rang_tpl_1: etapeTexte,
  algebre_motif_rang_tpl_2: etapeDessin,
  algebre_motif_rang_tpl_3: ajoutDessin,
  algebre_motif_rang_tpl_4: etapeTexte,
  algebre_motif_rang_tpl_5: etapeDessin,
  algebre_motif_rang_tpl_6: calculMotif,
  algebre_motif_rang_tpl_7: motifContexte,
  algebre_motif_rang_tpl_8: motifInverse,
  algebre_motif_rang_tpl_9: motifVrai,
});
