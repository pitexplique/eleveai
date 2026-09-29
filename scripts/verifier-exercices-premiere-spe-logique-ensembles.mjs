// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Vocabulaire
// ensembliste et logique » de 1re spé
// (lib/fiches-exercices/maths-premiere-logique-ensembles.tsx).
//
// ⭐ L'AUTRE CHEMIN : les ensembles sont reconstruits ICI (termes d'une suite,
// produit cartésien, effectifs d'un sondage), les intervalles testés point par
// point sur une grille fine, les tableaux de vérité recalculés ligne à ligne,
// les identités vérifiées sur une centaine d'entiers, les contre-exemples et les
// racines recalculés. Puis les dessins sont RELUS dans le source : chaque point
// marqué sur sa courbe, chaque intervalle avec ses crochets, les zones du
// diagramme de Venn, les sommets du cerf-volant, les cases de chaque tableau.
// Enfin les règles de rendu : un dessin par exercice, 12 à 14 imprimés,
// repères, textes des SVG, aucune fin de ligne dans une chaîne.
//
//   node scripts/verifier-exercices-premiere-spe-logique-ensembles.mjs

import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, creerVerif, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Lecture du source TSX ──────────────────────────────────────────────── */
function args(t, i) {
  const out = [];
  let prof = 0, cur = "", str = null;
  for (let k = i + 1; k < t.length; k++) {
    const ch = t[k];
    if (str) {
      cur += ch;
      if (ch === "\\") { cur += t[++k]; continue; }
      if (ch === str) str = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { str = ch; cur += ch; continue; }
    if ("([{".includes(ch)) prof++;
    if (")]}".includes(ch)) {
      if (prof === 0) { if (cur.trim()) out.push(cur.trim()); return { args: out, fin: k }; }
      prof--;
    }
    if (ch === "," && prof === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
  }
  throw new Error("appel non fermé");
}
function appels(t, nom) {
  return [...t.matchAll(new RegExp(`(?<![\\w.])${nom}\\(`, "g"))].map((m) => {
    const avant = t.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    return { role, ...args(t, m.index + m[0].length - 1) };
  });
}
const chaines = (t) => [...t.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const lireJSON = (t) => JSON.parse(t.replace(/,(\s*[\]}])/g, "$1"));
function reperes(bloc) {
  return appels(bloc, "repere").map((a) => {
    const [cadre, courbes = "[]", marques = "[]", horiz, grand] = a.args;
    return {
      role: a.role,
      cadre: JSON.parse(cadre),
      q: [...courbes.matchAll(/\bq: (\[[^\]]*\])/g)].map((m) => JSON.parse(m[1])),
      p: [...courbes.matchAll(/\bp: (\[[^\]]*\])/g)].map((m) => JSON.parse(m[1])),
      echantillons: (courbes.match(/pts: echantillon\(/g) ?? []).length,
      marques: [...marques.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+)(?:, label: "([^"]*)")? \}/g)].map((m) => ({ x: Number(m[1]), y: Number(m[2]), label: m[3] })),
      horizontale: horiz === undefined || horiz === "undefined" ? [] : [].concat(JSON.parse(horiz)),
      grand: grand === "true",
    };
  });
}
const lesTraces = (bloc) => appels(bloc, "trace").map((a) => JSON.parse(a.args[1]));
const lesTableauxProba = (bloc) => appels(bloc, "tableauProba").map((a) => ({ entetes: lireJSON(a.args[0]), lignes: lireJSON(a.args[1]), surligne: a.args[2] ? lireJSON(a.args[2]) : [] }));
function lesIntervalles(bloc) {
  const a = appels(bloc, "intervalles")[0];
  if (!a) return [];
  return [...a.args[2].matchAll(/\{ ((?:de|a): [^}]*)\}/g)].map((m) => m[1]).map((t) => ({
    de: /\bde: (-?[\d.]+)/.test(t) ? Number(t.match(/\bde: (-?[\d.]+)/)[1]) : undefined,
    a: /\ba: (-?[\d.]+)/.test(t) ? Number(t.match(/\ba: (-?[\d.]+)/)[1]) : undefined,
    deInclus: /deInclus: true/.test(t),
    aInclus: /aInclus: true/.test(t),
    label: t.match(/label: "([^"]*)"/)[1],
  }));
}
function leVenn(bloc) {
  const a = appels(bloc, "venn")[0];
  if (!a) return null;
  const z = (cle) => { const m = a.args[0].match(new RegExp(`${cle}: \\[([^\\]]*)\\]`)); return m ? chaines(m[1]) : []; };
  return { aSeul: z("aSeul"), commun: z("commun"), bSeul: z("bSeul"), dehors: z("dehors") };
}
const lignesProg = (bloc) => appels(bloc, "programme").map((a) => chaines(a.args[0]));

/* ── Les règles de rendu (les mêmes que la feuille d'algorithmique) ──────── */
function rendu(source, f, v) {
  v.titre("Rendu");
  const sans = f.blocs.map((b, i) => (/\b(figure|schema):/.test(b.split(/\n\s+micros:/)[0]) ? null : i + 1)).filter(Boolean);
  v.ok("chaque exercice a au moins un dessin", sans.length === 0 && f.blocs.length === 20, `sans dessin : ${sans.join(", ")}`);

  const cassees = [];
  let etat = null;
  for (let k = 0, ligne = 1; k < source.length; k++) {
    const ch = source[k];
    if (ch === "\n") {
      if (etat === '"' || etat === "'") cassees.push(ligne);
      if (etat === "//") etat = null;
      ligne++;
      continue;
    }
    if (etat === "//") continue;
    if (etat === "/*") { if (ch === "*" && source[k + 1] === "/") { etat = null; k++; } continue; }
    if (etat === '"' || etat === "'" || etat === "`") { if (ch === "\\") k++; else if (ch === etat) etat = null; continue; }
    if (ch === "/" && source[k + 1] === "/") { etat = "//"; continue; }
    if (ch === "/" && source[k + 1] === "*") { etat = "/*"; continue; }
    if (ch === '"' || ch === "`") etat = ch;
  }
  v.ok("aucune fin de ligne à l'intérieur d'une chaîne", cassees.length === 0, `lignes ${cassees.join(", ")}`);

  const imprimes = (source.match(/\n\s+(schema|figure): (?!ecranSeulement)/g) ?? []).length;
  const ecran = (source.match(/\n\s+(schema|figure): ecranSeulement\(/g) ?? []).length;
  v.ok(`${imprimes} dessins imprimés (12 à 14), ${ecran} à l'écran seulement`, imprimes >= 12 && imprimes <= 14);

  // ⛔ Mesuré le 29/09 à 375 px : une formule KaTeX ne se coupe qu'après une relation ou un opérateur
  // (=, <, +, ⇒…). Un morceau insécable de plus de ~30 signes visibles (~300 px) fait déborder la PAGE.
  const visibles = (s) => {
    let t = s.replace(/\\left|\\right|\\,|\\!|\\ /g, "");
    for (let k = 0; k < 5; k++) t = t.replace(/\\d?frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, a, b) => (a.length >= b.length ? a : b));
    return t.replace(/\\[a-zA-Z]+/g, "X").replace(/[{}\s]/g, "").length;
  };
  const coupe = /\\(?:Leftrightarrow|Rightarrow|times|cdot|leqslant|geqslant|leq|geq|neq|approx|in|notin|subset|cup|cap|mapsto)(?![a-zA-Z])|[=<>+-]/g;
  const longues = f.textes.flatMap((t) => [...t.matchAll(/\$([^$]*)\$/g)].map((m) => m[1])).filter((fo) => Math.max(...fo.split(coupe).map(visibles)) > 30);
  v.ok("aucune formule insécable de plus de 30 signes (débordement à 375 px)", longues.length === 0, longues.slice(0, 2).join(" | "));

  const fautes = [];
  f.blocs.forEach((b, i) => {
    for (const r of reperes(b)) {
      const [x0, x1, y0, y1] = r.cadre;
      const u = Math.max(x1 - x0, y1 - y0);
      if (!(y0 < 0)) fautes.push(`${i + 1} : ymin ${y0} n'est pas < 0`);
      if (u > 10 && !r.grand) fautes.push(`${i + 1} : ${u} unités sans « grand »`);
      if (u > 15) fautes.push(`${i + 1} : ${u} unités (15 au plus)`);
      for (const m of r.marques) if (m.x < x0 || m.x > x1 || m.y < y0 || m.y > y1) fautes.push(`${i + 1} : (${m.x} ; ${m.y}) hors du cadre`);
      for (const m of r.marques) if (m.label && (y1 - m.y < 2 || (Number.isInteger(m.x) && m.y === 0) || (m.x === 0 && Number.isInteger(m.y)))) fautes.push(`${i + 1} : étiquette « ${m.label} » sur un bord ou une graduation`);
    }
    for (const a of appels(b, "tableau")) {
      const [e, l] = [JSON.parse(a.args[0]), JSON.parse(a.args[1].replace(/−/g, "-"))];
      if (e.length !== l.length) fautes.push(`${i + 1} : tableau ${e.length} en-têtes pour ${l.length} cases`);
    }
    for (const lignes of lignesProg(b)) for (const l of lignes) if (l.length > 30) fautes.push(`${i + 1} : « ${l} » fait ${l.length} signes`);
    for (const nom of ["venn", "intervalles", "tableauProba", "vecteurs", "diagramme"]) {
      for (const a of appels(b, nom)) for (const s of chaines(a.args.join(","))) {
        if (s.includes("$")) fautes.push(`${i + 1} : $ dans un dessin SVG (« ${s} »)`);
        if (/(^|[\s(;])-\d/.test(s)) fautes.push(`${i + 1} : tiret au lieu du signe moins (« ${s} »)`);
      }
    }
    for (const a of appels(b, "vecteurs")) for (const m of a.args[2]?.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "[^"]+" \}/g) ?? []) {
      const [x, y] = [Number(m[1]), Number(m[2])];
      if (x === 0 || y === 0) fautes.push(`${i + 1} : sommet (${x} ; ${y}) sur un axe, son nom tombe sur une graduation`);
    }
  });
  v.ok("repères, tableaux et textes des dessins aux règles", fautes.length === 0, fautes.slice(0, 3).join(" | "));
}

/* ── Outils de calcul ───────────────────────────────────────────────────── */
const entiers = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const GRILLE = entiers(-400, 400).map((k) => k / 20); // −20 à 20, pas 0,05, bornes comprises
const dans = (iv, x) => (iv.de === undefined || x > iv.de || (iv.deInclus && x === iv.de)) && (iv.a === undefined || x < iv.a || (iv.aInclus && x === iv.a));
const memeEnsemble = (p, q, g = GRILLE) => g.every((x) => p(x) === q(x));
const trinome = ([a, b, c]) => (x) => a * x * x + b * x + c;
const poly = (coefs) => (x) => coefs.reduce((s, c) => s * x + c, 0);
const pres = (a, b) => Math.abs(a - b) < 1e-9;

/* ── Le recalcul ────────────────────────────────────────────────────────── */
function verifier(source, v) {
  const f = lireFeuille(source);
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1] ?? "";
  const ecrit = (k, t) => v.ok(`${k}. le corrigé écrit ${t}`, c(k).includes(t), t);
  /** Les verdicts VRAIE / FAUSSE du corrigé, dans l'ordre. */
  const verdicts = (k) => (c(k).match(/\b(VRAIE|FAUSSE)\b/g) ?? []);
  /** Chaque point marqué de l'exercice k est sur l'une des courbes (q, p) de son repère. */
  const surCourbes = (k, extra = []) => {
    const r = reperes(b(k))[0];
    const fs = [...r.q.map(trinome), ...r.p.map(poly), ...extra];
    const hors = r.marques.filter((m) => !fs.some((g) => pres(g(m.x), m.y)));
    v.ok(`${k}. chaque point marqué est sur une courbe tracée`, r.marques.length > 0 && hors.length === 0, JSON.stringify(hors));
    return r;
  };
  const dessine = (k, label, pred, g = GRILLE) => {
    const ivs = lesIntervalles(b(k)).filter((iv) => iv.label === label);
    v.ok(`${k}. l'intervalle dessiné « ${label} » est le bon`, ivs.length > 0 && memeEnsemble((x) => ivs.some((iv) => dans(iv, x)), pred, g), JSON.stringify(ivs));
  };

  rendu(source, f, v);

  v.titre("★ Un seul geste");
  const U = new Set(entiers(0, 3000).map((n) => 3 * n + 1));
  v.ok("1. 100 ∈ U (rang 33), 2026 ∈ U (rang 675), 50 ∉ U, 2 ∉ U", U.has(100) && 3 * 33 + 1 === 100 && U.has(2026) && 3 * 675 + 1 === 2026 && !U.has(50) && !U.has(2));
  for (const t of ["$100 = u_{33}$", "$2026 = u_{675}$", "$50 \\notin U$", "$2 \\notin U$"]) ecrit(1, t);
  const t1 = appels(b(1), "tableau")[0];
  const [ent1, lig1] = [JSON.parse(t1.args[0]), JSON.parse(t1.args[1])];
  v.ok("1. le tableau donne uₙ = 3n + 1 sous chaque rang", ent1.slice(1).every((n, i) => n === "…" ? lig1[i + 1] === "…" : lig1[i + 1] === 3 * Number(n) + 1), JSON.stringify(lig1));

  const A2 = (x) => x * x - 4 < 0, B2 = (x) => x >= 0 && x <= 5;
  dessine(2, "A", A2);
  dessine(2, "B", B2);
  dessine(2, "A ∩ B", (x) => A2(x) && B2(x));
  dessine(2, "A ∪ B", (x) => A2(x) || B2(x));
  v.ok("2. 2 ∈ A ∪ B, 2 ∉ A ∩ B", (A2(2) || B2(2)) && !(A2(2) && B2(2)));
  for (const t of ["$A = \\,]-2\\,;\\,2[$", "$A \\cap B = [0\\,;\\,2[$", "$A \\cup B = \\,]-2\\,;\\,5]$", "$\\overline{A} = \\,]-\\infty\\,;\\,-2] \\cup [2\\,;\\,+\\infty[$"]) ecrit(2, t);
  v.ok("2. le complémentaire écrit est bien celui de A", memeEnsemble((x) => !A2(x), (x) => x <= -2 || x >= 2));

  const produit = ["P", "F"].flatMap((p) => [1, 2, 3, 4].map((d) => `(${p} ; ${d})`));
  const t3 = lesTableauxProba(b(3))[0];
  v.ok("3. le tableau contient les 8 couples, chacun à sa place", JSON.stringify(t3.lignes.flatMap((l) => l.slice(1))) === JSON.stringify(produit) && JSON.stringify(t3.lignes.map((l) => l[0])) === '["P","F"]');
  // ⭐ Écrit en DEUX formules (29/09, mesuré à 375 px : d'un seul tenant, KaTeX ne coupe pas et la page débordait).
  v.ok("3. l'ensemble écrit dans le corrigé est ce produit", c(3).includes(`$\\{${produit.slice(0, 4).join(" ; ")} ;$ $${produit.slice(4).join(" ; ")}\\}$`));
  v.ok("3. (2 ; 1) solution, (1 ; 2) non", 2 * 2 + 1 === 5 && 2 - 1 === 1 && 2 * 1 + 2 !== 5);
  ecrit(3, "$2 \\times 4 = 8$ éléments");

  const r4 = surCourbes(4);
  v.ok("4. la parabole tracée est (x − 1)(x + 2), ses points marqués sont ses racines", r4.q[0].join() === "1,1,-2" && JSON.stringify(r4.marques.map((m) => m.x).sort((x, y) => x - y)) === "[-2,1]" && r4.marques.every((m) => m.y === 0));
  v.ok("4. x² + y² = 0 seulement en (0 ; 0) ; (x − 3)² + (x + 1)² ne s'annule jamais", entiers(-20, 20).every((x) => entiers(-20, 20).every((y) => (x * x + y * y === 0) === (x === 0 && y === 0))) && GRILLE.every((x) => (x - 3) ** 2 + (x + 1) ** 2 >= 8));
  ecrit(4, "$x = 3$ ou $x = -1$");

  const r5 = surCourbes(5);
  v.ok("5. A(−3 ; 9) et B(1 ; 1) : a < b mais a² > b²", r5.marques.some((m) => m.x === -3 && m.y === 9) && r5.marques.some((m) => m.x === 1 && m.y === 1) && -3 < 1 && 9 > 1);
  v.ok("5. vrai sur [0 ; +∞[ (grille)", GRILLE.filter((x) => x >= 0).every((a) => GRILLE.filter((x) => x > a).every((bb) => a * a < bb * bb)));

  v.ok("6. Δ = 9 − 32 = −23, parabole toujours au-dessus de l'axe", 9 - 32 === -23 && GRILLE.every((x) => trinome([2, -3, 4])(x) > 0) && reperes(b(6))[0].q[0].join() === "2,-3,4");
  ecrit(6, "$\\Delta = (-3)^2 - 4 \\times 2 \\times 4 = 9 - 32 = -23$");
  v.ok("6. (x − 1)² s'annule en 1", trinome([1, -2, 1])(1) === 0 && c(6).includes("s'annule en $1$"));

  v.ok("7. verdicts VRAIE, FAUSSE, VRAIE, FAUSSE", verdicts(7).join() === "VRAIE,FAUSSE,VRAIE,FAUSSE", verdicts(7).join());
  v.ok("7. x² + 1 ≥ 1 ; m = n + 1 convient pour tout n", GRILLE.every((x) => x * x + 1 >= 1) && entiers(0, 1000).every((n) => n + 1 > n) && reperes(b(7))[0].q[0].join() === "1,0,1");

  const t8 = lesTableauxProba(b(8))[0];
  const imp = (p, q) => !p || q;
  v.ok("8. le tableau de vérité de P ⇒ Q", t8.lignes.every(([p, q, r]) => (imp(p === "V", q === "V") ? "V" : "F") === r) && t8.lignes.length === 4 && new Set(t8.lignes.map((l) => l[0] + l[1])).size === 4);
  v.ok("8. seule la ligne V, F est surlignée (la seule fausse)", JSON.stringify(t8.surligne) === JSON.stringify(t8.lignes.map((l, i) => (l[2] === "F" ? [i, 2] : null)).filter(Boolean)));
  ecrit(8, "« $\\exists x \\in \\mathbb{R}$, $x > 2$ et $x^2 \\leqslant 4$ »");
  ecrit(8, "« $\\exists n \\in \\mathbb{N},\\ u_n > 10$ »");

  v.titre("★★ Type devoir");
  const vec9 = appels(b(9), "vecteurs")[0];
  const pts9 = Object.fromEntries([...vec9.args[2].matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+), label: "([A-D])" \}/g)].map((m) => [m[3], [Number(m[1]), Number(m[2])]]));
  const seg9 = [...vec9.args[1].matchAll(/de: \[(-?[\d.]+), (-?[\d.]+)\], vers: \[(-?[\d.]+), (-?[\d.]+)\]/g)].map((m) => m.slice(1, 5).map(Number));
  const d2 = (P, Q) => (P[0] - Q[0]) ** 2 + (P[1] - Q[1]) ** 2;
  const { A, B, C, D } = pts9;
  const joint = (P, Q) => seg9.some(([a, bb, cc, dd]) => (a === P[0] && bb === P[1] && cc === Q[0] && dd === Q[1]) || (a === Q[0] && bb === Q[1] && cc === P[0] && dd === P[1]));
  v.ok("9. les segments tracés sont les 4 côtés et les 2 diagonales de ABCD", A && B && C && D && [[A, B], [B, C], [C, D], [D, A], [A, C], [B, D]].every(([P, Q]) => joint(P, Q)) && seg9.length === 6);
  const perp = (C[0] - A[0]) * (D[0] - B[0]) + (C[1] - A[1]) * (D[1] - B[1]) === 0;
  const milieuxDiff = A[0] + C[0] !== B[0] + D[0] || A[1] + C[1] !== B[1] + D[1];
  v.ok("9. diagonales perpendiculaires, côtés inégaux (AB² = 13, BC² = 8), milieux distincts", perp && d2(A, B) === 13 && d2(B, C) === 8 && milieuxDiff && c(9).includes("$AB = \\sqrt{13}$") && c(9).includes("$BC = \\sqrt{8}$"));

  const G9 = entiers(-200, 200).map((k) => k / 10);
  v.ok("10. x > 5 ⇒ x > 2 (réciproque fausse en 3) ; x > 2 ⇒ x² > 4 (réciproque fausse en −3)", G9.every((x) => imp(x > 5, x > 2) && imp(x > 2, x * x > 4)) && !(3 > 5) && 3 > 2 && 9 > 4 && !(-3 > 2));
  v.ok("10. Δ = 0 : une seule racine (x² − 2x + 1), donc Δ ≥ 0 n'est pas suffisant", 4 - 4 === 0 && trinome([1, -2, 1])(1) === 0);
  dessine(10, "x > 5", (x) => x > 5);
  dessine(10, "x > 2", (x) => x > 2);
  v.ok("10. il suffit, il suffit, il faut et il suffit, il faut", ["il SUFFIT que $x > 5$", "Il SUFFIT que $x > 2$", "Il FAUT ET IL SUFFIT que $r > 0$", "Il FAUT que $\\Delta \\geqslant 0$"].every((t) => c(10).includes(t)));

  v.ok("11. (x + 1)² − (x − 1)² = 4x sur 100 entiers ; racines 2 et 3", entiers(-50, 50).every((x) => (x + 1) ** 2 - (x - 1) ** 2 === 4 * x) && trinome([1, -5, 6])(2) === 0 && trinome([1, -5, 6])(3) === 0);
  const r11 = surCourbes(11);
  v.ok("11. les paraboles m = 2 et m = −2 ont Δ = 0 (racines −1 et 1), celle de m = 0 n'en a pas", r11.q.length === 3 && r11.q.filter(([a, bb, cc]) => bb * bb - 4 * a * cc === 0).map(([, bb]) => bb).sort().join() === "-2,2" && r11.q.some(([a, bb, cc]) => bb === 0 && bb * bb - 4 * a * cc < 0));
  ecrit(11, "soit $m = 2$ ou $m = -2$");

  v.ok("12. (3k + 1)² = 3(3k² + 2k) + 1 et (3k + 2)² = 3(3k² + 4k + 1) + 1 pour k de −50 à 50", entiers(-50, 50).every((k) => (3 * k + 1) ** 2 === 3 * (3 * k * k + 2 * k) + 1 && (3 * k + 2) ** 2 === 3 * (3 * k * k + 4 * k + 1) + 1));
  const t12 = lesTraces(b(12))[0];
  v.ok("12. la trace : restes de n et de n² justes", t12.length === 6 && t12.every(([n, r, n2, r2]) => r === n % 3 && n2 === n * n && r2 === (n * n) % 3));

  surCourbes(13);
  v.ok("13. p = 0, m = 1, puis 4 ≠ 2", 0 ** 2 === 0 && 1 ** 2 === 1 && 2 ** 2 === 4 && 1 * 2 + 0 === 2 && reperes(b(13))[0].q.map((q) => q.join()).join("|") === "1,0,0|0,1,0");
  ecrit(13, "On obtient $4 = 2$");

  const racine14 = (x) => Math.sqrt(x + 2);
  surCourbes(14, [racine14]);
  const cand14 = [-1, 2];
  v.ok("14. x² − x − 2 = 0 donne −1 et 2 ; seul 2 vérifie √(x + 2) = x", cand14.every((x) => x * x - x - 2 === 0) && cand14.filter((x) => pres(racine14(x), x)).join() === "2" && reperes(b(14))[0].echantillons === 1);
  ecrit(14, "l'ensemble des solutions est $\\{2\\}$");

  const u15 = (n) => (-1) ** n * n;
  const r15 = reperes(b(15))[0];
  v.ok("15. les points sont (n ; (−1)ⁿ n) pour n de 0 à 4", r15.marques.length === 5 && r15.marques.every((m, i) => m.x === i && m.y === u15(i)));
  v.ok("15. u₁ < u₀ (pas croissante) et u₂ > u₁ (pas décroissante)", u15(1) < u15(0) && u15(2) > u15(1) && c(15).includes("$u_1 = -1 < 0 = u_0$") && c(15).includes("$u_2 = 2 > -1 = u_1$"));

  const [N16, S16, M16, SM16] = [120, 70, 45, 20];
  const z16 = leVenn(b(16));
  v.ok("16. les zones du Venn : 50, 20, 25 et 25 dehors", z16 && Number(z16.aSeul[0]) === S16 - SM16 && Number(z16.commun[0]) === SM16 && Number(z16.bSeul[0]) === M16 - SM16 && parseInt(z16.dehors[0], 10) === N16 - (S16 + M16 - SM16), JSON.stringify(z16));
  for (const t of ["$70 + 45 - 20 = 95$", "$120 - 95 = 25$", "$50 + 25 = 75$"]) ecrit(16, t);
  v.ok("16. le « ou » exclusif compte 75", S16 - SM16 + (M16 - SM16) === 75);

  v.titre("★★★ Problèmes");
  const u17 = (n) => n * n - 6 * n + 11;
  const r17 = reperes(b(17)).find((r) => r.role === "figure");
  v.ok("17. la figure marque u₀ … u₆, sur la parabole tracée, et la droite y = 3", r17 && r17.marques.length === 7 && r17.marques.every((m, i) => m.x === i && m.y === u17(i)) && r17.q[0].join() === "1,-6,11" && JSON.stringify(r17.horizontale) === "[3]");
  v.ok("17. uₙ = (n − 3)² + 2 > 0 ; uₙ = 3 pour n = 2 et 4 seulement", entiers(0, 200).every((n) => u17(n) === (n - 3) ** 2 + 2 && u17(n) > 0) && entiers(0, 200).filter((n) => u17(n) === 3).join() === "2,4");
  const diff17 = entiers(0, 200).map((n) => u17(n + 1) - u17(n));
  const N17 = entiers(0, 200).find((N) => diff17.slice(N).every((d) => d > 0));
  v.ok("17. uₙ₊₁ − uₙ = 2n − 5 ; plus petit N : 3 ; u₁ < u₀", diff17.every((d, n) => d === 2 * n - 5) && N17 === 3 && u17(1) < u17(0) && c(17).includes("Le plus petit $N$ est $3$"));
  v.ok("17. verdicts VRAIE, VRAIE, FAUSSE, VRAIE", verdicts(17).join() === "VRAIE,VRAIE,FAUSSE,VRAIE", verdicts(17).join());

  const t18 = lesTableauxProba(b(18))[0];
  const vrai = (s) => s === "V";
  const combinaisons = [true, false].flatMap((T) => [true, false].flatMap((H) => [true, false].map((V) => [T, H, V])));
  v.ok("18. les 8 lignes, dans l'ordre, et H et V, alarme = T ou (H et V)", t18.lignes.length === 8 && t18.lignes.every((l, i) => {
    const [T, H, V] = combinaisons[i];
    return vrai(l[0]) === T && vrai(l[1]) === H && vrai(l[2]) === V && vrai(l[3]) === (H && V) && vrai(l[4]) === (T || (H && V));
  }));
  const sonne = t18.lignes.map((l, i) => (vrai(l[4]) ? [i, 4] : null)).filter(Boolean);
  v.ok("18. 5 situations ; les cases surlignées sont celles où l'alarme sonne", sonne.length === 5 && JSON.stringify(t18.surligne) === JSON.stringify(sonne) && c(18).includes("L'alarme sonne dans $5$ situations"));
  v.ok("18. la négation écrite équivaut à non (T ou (H et V)), sur les 8 cas", combinaisons.every(([T, H, V]) => (!(T || (H && V))) === (!T && (!H || !V))) && c(18).includes("(non $T$) et (non $H$ ou non $V$)"));

  const r19 = surCourbes(19);
  const cube = poly(r19.p[0]);
  const deriv0 = (cube(1e-6) - cube(-1e-6)) / 2e-6;
  v.ok("19. la courbe est x³ : f′(0) = 0, tangente y = 0 tracée, et f croît sur la grille", r19.p[0].join() === "1,0,0,0" && Math.abs(deriv0) < 1e-9 && r19.q[0].join() === "0,0,0" && GRILLE.every((x, i) => i === 0 || cube(x) > cube(GRILLE[i - 1])));
  v.ok("19. u₀ = −5, r = 1 : u₄ = −1 ; x² − 4x + 5 = (x − 2)² + 1 ; Δ = −4", -5 + 4 * 1 === -1 && GRILLE.every((x) => pres(x * x - 4 * x + 5, (x - 2) ** 2 + 1)) && 16 - 20 === -4);
  v.ok("19. verdicts FAUSSE, VRAIE, FAUSSE, VRAIE, FAUSSE", verdicts(19).join() === "FAUSSE,VRAIE,FAUSSE,VRAIE,FAUSSE", verdicts(19).join());

  v.ok("20. n(n + 1) pair et n² + n + 1 impair pour n de 0 à 1000", entiers(0, 1000).every((n) => (n * (n + 1)) % 2 === 0 && (n * n + n + 1) % 2 === 1));
  const atteint = (m) => entiers(0, 100).filter((n) => n * n + n + 1 === m);
  v.ok("20. 2026 jamais atteint, 2071 pour n = 45, 2027 jamais", atteint(2026).length === 0 && atteint(2071).join() === "45" && atteint(2027).length === 0 && 1 + 4 * 2070 === 8281 && 91 * 91 === 8281);
  for (const t of ["$\\Delta = 1 + 8\\,280 = 8\\,281 = 91^2$", "$n = \\dfrac{-1 + 91}{2} = 45$", "$45^2 + 45 + 1 = 2\\,025 + 46 = 2\\,071$"]) ecrit(20, t);
  const t20 = lesTraces(b(20))[0];
  v.ok("20. la trace : n(n + 1) et n² + n + 1 justes", t20.every(([n, p, q]) => p === n * (n + 1) && q === n * n + n + 1));
}

const FICHIER = "lib/fiches-exercices/maths-premiere-logique-ensembles.tsx";
process.on("exit", () => {
  // Le bilan en une ligne : les contrôles faux de la passe propre, casses ratées comprises.
  const v = creerVerif(false);
  const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");
  try { verifier(source, v); } catch (err) { v.ok("recalcul", false, String(err)); }
  controlesCommuns(v, source, { notionId: "logique_ensembles", classe: "premiere-spe" });
  const n = v.erreurs() + (process.exitCode && !v.erreurs() ? 1 : 0);
  console.log(`\n${n} fausses`);
});

lancer({
  nom: "VOCABULAIRE ENSEMBLISTE ET LOGIQUE · 1re spé · 20 exercices",
  fichier: FICHIER,
  notionId: "logique_ensembles",
  classe: "premiere-spe",
  verifier,
  casses: [
    ["ex. 1 : un terme faux dans le tableau", "[\"uₙ\", 1, 4, 7, 10, \"…\", 100]", "[\"uₙ\", 1, 4, 7, 10, \"…\", 101]"],
    ["ex. 2 : la borne 2 comprise dans A ∩ B", "{ de: 0, a: 2, deInclus: true, aInclus: false, label: \"A ∩ B\"", "{ de: 0, a: 2, deInclus: true, aInclus: true, label: \"A ∩ B\""],
    ["ex. 3 : un couple à l'envers", "\"(F ; 3)\"", "\"(3 ; F)\""],
    ["ex. 4 : une racine fausse marquée", "{ x: -2, y: 0 }, { x: 1, y: 0 }]))", "{ x: -1, y: 0 }, { x: 1, y: 0 }]))"],
    ["ex. 5 : le point A hors de la parabole", "{ x: -3, y: 9, label: \"A\" }", "{ x: -3, y: 8, label: \"A\" }"],
    ["ex. 6 : le discriminant faux", "= 9 - 32 = -23$", "= 9 - 32 = -22$"],
    ["ex. 7 : l'ordre des quantificateurs ignoré", "plus grand que TOUS les entiers $n$. » FAUSSE", "plus grand que TOUS les entiers $n$. » VRAIE"],
    ["ex. 8 : le tableau de l'implication faux", "[\"V\", \"F\", \"F\"], [\"F\", \"V\", \"V\"]", "[\"V\", \"F\", \"V\"], [\"F\", \"V\", \"V\"]"],
    ["ex. 9 : un sommet déplacé", "{ x: 5, y: 3, label: \"B\" }", "{ x: 6, y: 3, label: \"B\" }"],
    ["ex. 10 : l'intervalle x > 5 mal dessiné", "{ de: 5, deInclus: false, label: \"x > 5\"", "{ de: 4, deInclus: false, label: \"x > 5\""],
    ["ex. 11 : la parabole m = −2 remplacée par m = −3", "{ q: [1, -2, 1], couleur: ORANGE }", "{ q: [1, -3, 1], couleur: ORANGE }"],
    ["ex. 12 : un reste faux", "[5, 2, 25, 1]", "[5, 2, 25, 0]"],
    ["ex. 13 : un point hors des courbes", "{ x: 2, y: 4 }, { x: 2, y: 2 }]", "{ x: 2, y: 4 }, { x: 2, y: 3 }]"],
    ["ex. 14 : la fausse solution gardée", "l'ensemble des solutions est $\\\\{2\\\\}$", "l'ensemble des solutions est $\\\\{-1 ; 2\\\\}$"],
    ["ex. 15 : un terme sans son signe", "{ x: 3, y: -3 }", "{ x: 3, y: 3 }"],
    ["ex. 16 : une zone du Venn fausse", "bSeul: [\"25\"]", "bSeul: [\"35\"]"],
    ["ex. 17 : un point de la figure faux", "{ x: 4, y: 3 },\n              { x: 5, y: 6 }", "{ x: 4, y: 4 },\n              { x: 5, y: 6 }"],
    ["ex. 17 : le plus petit N faux", "Le plus petit $N$ est $3$", "Le plus petit $N$ est $4$"],
    ["ex. 18 : une ligne du tableau de vérité fausse", "[\"F\", \"V\", \"V\", \"V\", \"V\"]", "[\"F\", \"V\", \"V\", \"V\", \"F\"]"],
    ["ex. 19 : la courbe n'est plus x³", "{ p: [1, 0, 0, 0] }", "{ p: [1, 0, 1, 0] }"],
    ["ex. 20 : une case de la trace fausse", "[4, 20, 21]", "[4, 20, 22]"],
    ["ex. 20 : la racine entière fausse", "$n = \\\\dfrac{-1 + 91}{2} = 45$", "$n = \\\\dfrac{-1 + 91}{2} = 46$"],
    ["rendu : un dessin de plus à l'impression", "schema: ecranSeulement(repere([-4, 3, -3, 5]", "schema: (repere([-4, 3, -3, 5]"],
    ["rendu : un repère de 12 unités sans « grand »", "label: \"B\" }], undefined, true)", "label: \"B\" }], undefined, false)"],
    ["rendu : une étiquette sur la graduation de l'origine", "[{ x: 0, y: 0 }])", "[{ x: 0, y: 0, label: \"O\" }])"],
    ["rendu : l'ensemble des 8 couples en une seule formule (débordait à 375 px)", "(P ; 4) ;$ $(F ; 1)", "(P ; 4) ; (F ; 1)"],
    ["rendu : un tiret dans un SVG", "dehors: [\"25 : aucun des deux\"]", "dehors: [\"-25\"]"],
    ["rendu : une vraie fin de ligne dans une chaîne", "a) Un nombre $m$ est dans $U$", "a) Un nombre $m$\nest dans $U$"],
  ],
});
