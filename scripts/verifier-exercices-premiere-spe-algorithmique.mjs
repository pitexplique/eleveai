// Recalcul INDÉPENDANT des vingt corrigés de la feuille « Algorithmique et
// programmation » de 1re spé (lib/fiches-exercices/maths-premiere-algorithmique.tsx).
//
// ⭐ L'AUTRE CHEMIN, LE PLUS DIRECT : chaque programme dessiné (`programme([…])`)
// est RELU dans le source et EXÉCUTÉ par Python ; les programmes écrits dans
// l'énoncé entre « » sont relus dans le texte et exécutés aussi. Chaque trace
// est comparée à une exécution INSTRUMENTÉE (des print ajoutés dans la boucle),
// chaque liste dessinée en cases (`cases`) à ce que Python affiche, chaque point
// d'un repère au terme recalculé. La simulation tourne avec la graine 23.
// Puis les règles de rendu : un dessin par exercice, 12 à 14 dessins imprimés,
// repères (ymin < 0, `grand` au-delà de 10 unités, 15 au plus), lignes de code
// de 30 signes au plus, aucune fin de ligne dans une chaîne.
//
//   node scripts/verifier-exercices-premiere-spe-algorithmique.mjs

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { RACINE, controlesCommuns, creerVerif, lireFeuille, lancer } from "./verifier-exercices-commun.mjs";

/* ── Python ─────────────────────────────────────────────────────────────── */
const ENV = { ...process.env, PYTHONIOENCODING: "utf-8", PYTHONUTF8: "1" };
const net = (s) => String(s ?? "").replace(/\r\n/g, "\n").trim();
function py(code) {
  try {
    return { sortie: net(execFileSync("python", ["-c", code], { encoding: "utf8", env: ENV, stdio: ["pipe", "pipe", "pipe"] })), erreur: null };
  } catch (e) {
    return { sortie: net(e.stdout), erreur: net(e.stderr).split("\n").pop() };
  }
}

/* ── Lecture du source TSX ──────────────────────────────────────────────── */
/** Les arguments de premier niveau de l'appel dont `i` pointe la parenthèse ouvrante ; les chaînes sont sautées. */
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
/** Tous les appels `nom(…)` d'un texte, avec leur rôle (figure ou schéma). */
function appels(t, nom) {
  return [...t.matchAll(new RegExp(`(?<![\\w.])${nom}\\(`, "g"))].map((m) => {
    const avant = t.slice(0, m.index);
    const role = avant.lastIndexOf("figure:") > avant.lastIndexOf("schema:") ? "figure" : "schema";
    return { role, ...args(t, m.index + m[0].length - 1) };
  });
}
const chaines = (t) => [...t.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
const programmes = (bloc) => appels(bloc, "programme").map((a) => chaines(a.args[0]).join("\n"));
const lignesProg = (bloc) => appels(bloc, "programme").map((a) => chaines(a.args[0]));
const traces = (bloc) => appels(bloc, "trace").map((a) => JSON.parse(a.args[1]));
const casesDe = (bloc) => appels(bloc, "cases").map((a) => ({ role: a.role, rangees: [...a.args[0].matchAll(/\{ nom: "([^"]*)", valeurs: \[([^\]]*)\] \}/g)].map((m) => ({ nom: m[1], valeurs: JSON.parse(`[${m[2]}]`) })) }));
function reperes(bloc) {
  return appels(bloc, "repere").map((a) => {
    const [cadre, courbes = "[]", marques = "[]", horiz, grand] = a.args;
    return {
      role: a.role,
      cadre: JSON.parse(cadre),
      q: [...courbes.matchAll(/\bq: (\[[^\]]*\])/g)].map((m) => JSON.parse(m[1])),
      p: [...courbes.matchAll(/\bp: (\[[^\]]*\])/g)].map((m) => JSON.parse(m[1])),
      pts: [...courbes.matchAll(/\bpts: (\[\[[\s\S]*?\]\])/g)].map((m) => JSON.parse(m[1])),
      marques: [...marques.matchAll(/\{ x: (-?[\d.]+), y: (-?[\d.]+)(?:, label: "([^"]*)")? \}/g)].map((m) => ({ x: Number(m[1]), y: Number(m[2]), label: m[3] })),
      horizontale: horiz === undefined || horiz === "undefined" ? [] : [].concat(JSON.parse(horiz)),
      grand: grand === "true",
    };
  });
}
/** Deux tableaux de lignes égaux, cellule par cellule (« − » lu comme « - », nombres comparés en nombres). */
function memes(lu, attendu) {
  if (!lu || lu.length !== attendu.length) return false;
  return lu.every((l, i) => l.length === attendu[i].length && l.every((x, j) => {
    const a = String(x).replace(/−/g, "-"), b = String(attendu[i][j]).replace(/−/g, "-");
    return a === b || (a !== "" && b !== "" && !isNaN(Number(a)) && !isNaN(Number(b)) && Math.abs(Number(a) - Number(b)) < 1e-9);
  }));
}
const lignesPy = (sortie) => sortie.split("\n").map((l) => l.trim().split(/\s+/));

/* ── Les règles de rendu, communes aux feuilles de 1re spé de ce lot ─────── */
function rendu(source, f, v) {
  v.titre("Rendu");
  const sans = f.blocs.map((b, i) => (/\b(figure|schema):/.test(b.split(/\n\s+micros:/)[0]) ? null : i + 1)).filter(Boolean);
  v.ok("chaque exercice a au moins un dessin", sans.length === 0 && f.blocs.length === 20, `sans dessin : ${sans.join(", ")}`);

  // ⛔ Aucune ligne ne se termine à l'intérieur d'une chaîne "…".
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
      for (const m of r.marques) if (m.label && (y1 - m.y < 2 || Number.isInteger(m.x) && m.y === 0 || m.x === 0 && Number.isInteger(m.y))) fautes.push(`${i + 1} : étiquette « ${m.label} » sur un bord ou une graduation`);
    }
    for (const a of appels(b, "tableau")) {
      const [e, l] = [JSON.parse(a.args[0]), JSON.parse(a.args[1].replace(/−/g, "-"))];
      if (e.length !== l.length) fautes.push(`${i + 1} : tableau ${e.length} en-têtes pour ${l.length} cases`);
    }
    for (const lignes of lignesProg(b)) for (const l of lignes) {
      if (l.length > 30) fautes.push(`${i + 1} : « ${l} » fait ${l.length} signes`);
      if (/\\"|\$/.test(l)) fautes.push(`${i + 1} : guillemet double ou $ dans « ${l} »`);
    }
    for (const nom of ["cases", "venn", "intervalles", "tableauProba", "diagramme"]) {
      for (const a of appels(b, nom)) for (const s of chaines(a.args.join(","))) {
        if (s.includes("$")) fautes.push(`${i + 1} : $ dans un dessin SVG (« ${s} »)`);
        if (/(^|[\s(;])-\d/.test(s)) fautes.push(`${i + 1} : tiret au lieu du signe moins (« ${s} »)`);
      }
    }
    for (const a of appels(b, "diagramme")) {
      const labels = [...a.args[1].matchAll(/label: "([^"]*)"/g)].map((m) => m[1]);
      if (labels.length >= 4 && labels.some((l) => l.length > 9)) fautes.push(`${i + 1} : libellé de barre de plus de 9 signes`);
    }
  });
  v.ok("repères, tableaux, programmes et textes des dessins aux règles", fautes.length === 0, fautes.slice(0, 3).join(" | "));
}

/* ── Le recalcul ────────────────────────────────────────────────────────── */
function verifier(source, v) {
  const f = lireFeuille(source);
  const e = (k) => f.enonces[k - 1] ?? "";
  const c = (k) => f.corrections[k - 1] ?? "";
  const b = (k) => f.blocs[k - 1] ?? "";
  const ecrit = (k, t) => v.ok(`${k}. le corrigé écrit ${t}`, c(k).includes(t), t);
  const dansEnonce = (k, t) => v.ok(`${k}. l'énoncé donne « ${t} »`, e(k).includes(`« ${t} »`), t);
  const prog = (k, i = 0) => programmes(b(k))[i] ?? "";
  /** Le programme k, suivi de `suite`, affiche exactement `attendu`. */
  const affiche = (k, suite, attendu, { i = 0, remplace } = {}) => {
    let code = prog(k, i);
    if (remplace) code = code.replace(remplace[0], remplace[1]);
    const r = py(`${code}\n${suite}`);
    v.ok(`${k}. Python affiche ${JSON.stringify(attendu)}`, !r.erreur && r.sortie === attendu, r.erreur ?? r.sortie);
    return r.sortie;
  };
  const traceJuste = (k, attendu, quoi) => v.ok(`${k}. la trace est l'exécution pas à pas (${quoi})`, memes(traces(b(k))[0], attendu), JSON.stringify(traces(b(k))[0]) + " ≠ " + JSON.stringify(attendu));
  const casesJustes = (k, role, attendu) => {
    const lu = casesDe(b(k)).find((x) => x.role === role);
    v.ok(`${k}. les cases (${role}) sont les listes de Python`, !!lu && JSON.stringify(lu.rangees.map((r) => r.valeurs)) === JSON.stringify(attendu), JSON.stringify(lu?.rangees));
  };

  rendu(source, f, v);

  v.titre("★ Un seul geste");
  dansEnonce(1, "a, b = 1, 1");
  dansEnonce(1, "a, b = b, a + b");
  const p1 = "a, b = 1, 1\nprint(0, a, b)\n" + [1, 2, 3].map((t) => `a, b = b, a + b\nprint(${t}, a, b)`).join("\n");
  traceJuste(1, lignesPy(py(p1).sortie), "affectation simultanée");
  v.ok("1. a) 3 et 5", py("a, b = 1, 1\n" + "a, b = b, a + b\n".repeat(3) + "print(a, b)").sortie === "3 5" && c(1).includes("a vaut $3$ et b vaut $5$"));
  v.ok("1. b) 4 et 8 avec deux lignes", py("a, b = 1, 1\n" + "a = b\nb = a + b\n".repeat(3) + "print(a, b)").sortie === "4 8" && c(1).includes("a vaut $4$ et b vaut $8$"));

  for (const t of ["L = [3, 6, 9, 12]", "L = []", "for k in range(4): L.append(3 * k)", "L = [3*k for k in range(1, 5)]"]) dansEnonce(2, t);
  const A2 = py("L = [3, 6, 9, 12]\nprint(L)").sortie, B2 = py("L = []\nfor k in range(4): L.append(3 * k)\nprint(L)").sortie, C2 = py("L = [3*k for k in range(1, 5)]\nprint(L)").sortie;
  v.ok("2. A = C ≠ B", A2 === C2 && A2 !== B2 && c(2).includes(`L vaut ${B2}`) && c(2).includes(`L vaut ${A2}`), `${A2} ${B2} ${C2}`);
  v.ok("2. B corrigé redonne A", py("L = []\nfor k in range(1, 5): L.append(3 * k)\nprint(L)").sortie === A2 && c(2).includes("« for k in range(1, 5): L.append(3 * k) »"));
  casesJustes(2, "schema", [JSON.parse(A2), JSON.parse(B2)]);

  dansEnonce(3, "L = [5, 8, 2, 9, 4]");
  const r3 = py("L = [5, 8, 2, 9, 4]\nprint(L[0], L[3], L[-1], len(L))\nL[1] = 7\nprint(L)").sortie.split("\n");
  v.ok("3. L[0], L[3], L[-1], len(L) = 5 9 4 5", r3[0] === "5 9 4 5" && ["PREMIER élément, $5$", "quatrième élément : $9$", "DERNIER élément : $4$", "nombre d'éléments : $5$"].every((t) => c(3).includes(t)), r3[0]);
  v.ok("3. après L[1] = 7", c(3).includes(`L devient ${r3[1]}`), r3[1]);
  v.ok("3. L[5] : IndexError", /IndexError/.test(py("L = [5, 8, 2, 9, 4]\nprint(L[5])").erreur ?? "") && c(3).includes("IndexError"));
  casesJustes(3, "figure", [[5, 8, 2, 9, 4]]);
  casesJustes(3, "schema", [JSON.parse(r3[1])]);

  affiche(4, "", "17");
  const pas4 = py(prog(4).replace("for x in T:\n    if x > m:\n        m = x", "for x in T:\n    o = 'oui' if x > m else 'non'\n    if x > m:\n        m = x\n    print(x, o, m)")).sortie.split("\n").slice(0, -1).map((l) => l.split(" "));
  traceJuste(4, pas4, "x, x > m ?, m");
  v.ok("4. m = 0 échoue sur une semaine négative", py(prog(4).replace("T = [12, 15, 9, 17, 14]", "T = [-8, -3, -11]").replace("m = T[0]", "m = 0")).sortie === "0");

  dansEnonce(5, "u = 5");
  dansEnonce(5, "for k in range(4): u = 2 * u - 3");
  affiche(5, "", "35");
  const pas5 = py("u = 5\nfor k in range(4):\n    u = 2 * u - 3\n    print(k, u, 'u' + '₀₁₂₃₄₅'[k + 1])").sortie;
  traceJuste(5, lignesPy(pas5), "k, u, rang");
  v.ok("5. le programme du corrigé est celui de l'énoncé", prog(5).includes("for k in range(4):\n    u = 2 * u - 3"));
  ecrit(5, "u vaut $35 = u_4$");

  affiche(6, "print(nb_racines(1, -2, 1), nb_racines(2, 3, -5), nb_racines(1, 1, 1))", "1 2 0");
  const d6 = py("for a, b, c in [(1, -2, 1), (2, 3, -5), (1, 1, 1)]:\n    print(b**2 - 4*a*c)").sortie.split("\n");
  traceJuste(6, [["(1, -2, 1)", d6[0], 1], ["(2, 3, -5)", d6[1], 2], ["(1, 1, 1)", d6[2], 0]], "discriminants");
  v.ok("6. « == » est bien à la ligne 5", (lignesProg(b(6))[0][4] ?? "").includes("=="));

  for (const t of ["n = 0", "s = 0", "while s <= 30:", "n = n + 1", "s = s + n"]) dansEnonce(7, t);
  affiche(7, "", "8 36");
  const pas7 = py("n = 0\ns = 0\nwhile s <= 30:\n    n = n + 1\n    s = s + n\n    print(n, n, s)").sortie;
  traceJuste(7, lignesPy(pas7), "n, s");
  ecrit(7, "affiche « 8 36 »");

  affiche(8, "print(f(4))\ny = f(4) + 1\nprint(y)", "5\n6");
  const g8 = py(`${prog(8)}\nz = g(4) + 1`);
  v.ok("8. g(4) + 1 affiche 5 puis TypeError", g8.sortie === "5" && /TypeError/.test(g8.erreur ?? ""), `${g8.sortie} / ${g8.erreur}`);
  v.ok("8. g(4) vaut None", py(`${prog(8)}\nprint(g(4))`).sortie === "5\nNone");

  v.titre("★★ Type devoir");
  for (const t of ["u = 1", "L = [u]", "for n in range(5):", "u = u + n", "L.append(u)", "M = [1 + n*(n-1)//2 for n in range(6)]"]) dansEnonce(9, t);
  const L9 = py("u = 1\nL = [u]\nfor n in range(5):\n    u = u + n\n    L.append(u)\nprint(L)").sortie;
  const M9 = py("M = [1 + n*(n-1)//2 for n in range(6)]\nprint(M)").sortie;
  v.ok("9. L = M = [1, 1, 2, 4, 7, 11]", L9 === M9 && c(9).includes(`L vaut ${L9}`) && c(9).includes(`M vaut aussi ${M9}`), `${L9} ${M9}`);
  casesJustes(9, "schema", [JSON.parse(L9)]);
  const r9 = reperes(b(9))[0];
  const q9 = (x) => r9.q[0][0] * x * x + r9.q[0][1] * x + r9.q[0][2];
  v.ok("9. les points du repère sont (n ; uₙ), sur la parabole tracée", JSON.stringify(r9.marques.map((m) => [m.x, m.y])) === JSON.stringify(JSON.parse(L9).map((u, n) => [n, u])) && r9.marques.every((m) => Math.abs(q9(m.x) - m.y) < 1e-12));

  affiche(10, "print(jours_secs(mm))", "3");
  affiche(10, "print(moyenne([0, 12, 3, 0, 25, 9, 0]))", "7.0", { i: 1 });
  v.ok("10. somme 49, 7 jours", py("print(sum([0, 12, 3, 0, 25, 9, 0]), len([0, 12, 3, 0, 25, 9, 0]))").sortie === "49 7" && prog(10).startsWith("mm = [0, 12, 3, 0, 25, 9, 0]"));
  ecrit(10, "« moyenne(mm) » renvoie « 7.0 »");

  const e11 = "e = [alt[i+1] - alt[i] for i in range(len(alt) - 1)]";
  dansEnonce(11, "alt = [320, 450, 610, 580, 720]");
  v.ok("11. l'énoncé donne la liste en compréhension", e(11).includes(`« ${e11} »`));
  const r11 = py(`alt = [320, 450, 610, 580, 720]\n${e11}\nprint(e)\nprint(sum(x for x in e if x > 0), alt[-1] - alt[0])`).sortie.split("\n");
  v.ok("11. e et dénivelé positif", c(11).includes(`e vaut ${r11[0]}`) && r11[1] === "430 400" && c(11).includes("$130 + 160 + 140 = 430$ m") && c(11).includes("$720 - 320 = 400$ m"), r11.join(" | "));
  v.ok("11. range(len(alt)) : IndexError", /IndexError/.test(py(`alt = [320, 450, 610, 580, 720]\n${e11.replace("len(alt) - 1", "len(alt)")}`).erreur ?? ""));
  casesJustes(11, "schema", [[320, 450, 610, 580, 720], JSON.parse(r11[0])]);

  affiche(12, "", "6");
  const u12 = py("u = 1\nL = [u]\nfor n in range(8):\n    u = 0.6 * u + 3\n    L.append(u)\nprint(L)").sortie;
  const r12 = reperes(b(12))[0];
  v.ok("12. les points sont les termes u₀ … u₈", JSON.stringify(r12.marques.map((m) => [m.x, m.y])) === JSON.stringify(JSON.parse(u12).map((u, n) => [n, u])), u12);
  v.ok("12. seuil 7 et droite 8 dessinés", JSON.stringify(r12.horizontale) === "[7,8]");
  v.ok("12. u reste sous 7,5 (donc sous 8) sur 100 000 tours", py("u = 1\nm = 0\nfor k in range(100000):\n    u = 0.6 * u + 3\n    m = max(m, u)\nprint(m <= 7.5, m < 8)").sortie === "True True");
  v.ok("12. u₄ ≈ 6,66 ; u₅ ≈ 6,99 ; u₆ ≈ 7,20", py("u = 1\nfor n in range(6):\n    u = 0.6 * u + 3\n    print(round(u, 2))").sortie === "3.6\n5.16\n6.1\n6.66\n6.99\n7.2" && ["$u_4 \\approx 6{,}66$", "$u_5 \\approx 6{,}99$", "$u_6 \\approx 7{,}20$", "$u_3 = 6{,}096$"].every((t) => c(12).includes(t)));

  const s13 = affiche(13, "", "[3.0, 2.100000000000002, 2.0100000000000007]");
  v.ok("13. l'énoncé cite exactement cette sortie", e(13).includes(`« ${s13} »`));
  const r13 = reperes(b(13))[0];
  const ligne = ([, m, p], x) => m * x + p;
  v.ok("13. sécante (1 ; 1)-(2 ; 4) de pente 3 et tangente de pente 2 en 1", ligne(r13.q[1], 1) === 1 && ligne(r13.q[1], 2) === 4 && r13.q[1][1] === 3 && r13.q[2][1] === 2 && ligne(r13.q[2], 1) === 1 && r13.marques.every((m) => m.x * m.x === m.y));

  affiche(14, "", "2.44140625");
  const pas14 = py(prog(14).replace("    x = x + h", "    x = x + h\n    print(x, y)").replace("print(y)", "")).sortie;
  traceJuste(14, lignesPy(pas14).map((l, i) => [i + 1, ...l]), "x, y");
  const r14 = reperes(b(14))[0];
  v.ok("14. la ligne d'Euler dessinée passe par les points de la trace", memes(r14.pts[0], [[0, 1], ...lignesPy(pas14)]));
  const h01 = py(prog(14).replace("h = 0.25", "h = 0.1").replace("    x = x + h", "    x = x + h\n    print(x)").replace("print(y)", "print(round(y, 2))")).sortie.split("\n");
  v.ok("14. avec h = 0.1 : 11 tours, x vaut 0.9999999999999999 au 10e", h01.length === 12 && h01[9] === "0.9999999999999999" && c(14).includes("$0{,}9999999999999999$"), h01.join(" "));
  v.ok("14. 1,1¹¹ ≈ 2,85 affiché ; 1,1¹⁰ ≈ 2,59", h01[11] === "2.85" && Math.abs(1.1 ** 10 - 2.59) < 0.005 && c(14).includes("$1{,}1^{11} \\approx 2{,}85$"));

  affiche(15, "print(diviseurs(12), est_premier(13), est_premier(1), diviseurs(0))\nprint(P)", "[1, 2, 3, 4, 6, 12] True False []\n[2, 3, 5, 7, 11, 13, 17, 19]");
  casesJustes(15, "schema", [[1, 2, 3, 4, 6, 12], [2, 3, 5, 7, 11, 13, 17, 19]]);
  affiche(15, "print(est_premier(13))", "False", { remplace: ["range(1, n + 1)", "range(1, n)"] });
  ecrit(15, "P vaut [2, 3, 5, 7, 11, 13, 17, 19]");

  for (const t of ["S = 0", "u = 1", "for k in range(5):", "S = S + u", "u = u / 2"]) dansEnonce(16, t);
  affiche(16, "", "1.9375");
  affiche(16, "", "0.96875", { remplace: ["    S = S + u\n    u = u / 2", "    u = u / 2\n    S = S + u"] });
  const pas16 = py("S = 0\nu = 1\nfor k in range(5):\n    S = S + u\n    u = u / 2\n    print(k, S, u)").sortie;
  traceJuste(16, lignesPy(pas16), "k, S, u");
  ecrit(16, "$2 - 1{,}9375 = 0{,}0625$");

  v.titre("★★★ Problèmes");
  const s17 = affiche(17, "from random import seed\nseed(23)\nprint([moyenne(N) for N in (10, 100, 10000)])", "[-0.8, 0.0, 0.1703]");
  const v17 = JSON.parse(s17 || "[]");
  v.ok("17. l'énoncé et la trace portent le VRAI essai", memes(traces(b(17))[0], [[10, v17[0]], [100, v17[1]], [10000, v17[2]]]) && e(17).includes("« -0.8 »") && e(17).includes("« 0.0 »") && e(17).includes("« 0.1703 »"));
  const E = (5 * 1 + 1 * 2 - 2 * 3) / 6;
  v.ok("17. E(X) = 1/6 (loi relue dans le programme)", Math.abs(E - 1 / 6) < 1e-15 && prog(17).includes("if d == 6:\n        return 5") && prog(17).includes("elif d >= 4:\n        return 1") && prog(17).includes("return -2") && c(17).includes("\\dfrac{5 + 2 - 6}{6} = \\dfrac{1}{6}"));

  affiche(18, "", "11");
  const t18 = py(prog(18).replace("    n = n + 1", "    n = n + 1\n    print(n, a, round(b, 2))").replace("print(n)", "")).sortie.split("\n");
  v.ok("18. mois 10 : 10 et 9,31 ; mois 11 : 10,5 et 11,64", t18[9] === "10 10.0 9.31" && t18[10] === "11 10.5 11.64" && c(18).includes("$a_{10} = 10$ et $b_{10} \\approx 9{,}31$") && c(18).includes("$a_{11} = 10{,}5$ et $b_{11} \\approx 11{,}64$"), t18.slice(9).join(" | "));
  const r18 = reperes(b(18))[0];
  v.ok("18. la ligne de B passe par les 1,25ⁿ (au millième), la droite de A est 5 + 0,5n", r18.pts[0].length === 12 && r18.pts[0].every(([n, y]) => Math.abs(y - 1.25 ** n) < 0.001) && JSON.stringify(r18.q[0]) === "[0,0.5,5]");
  v.ok("18. points marqués au mois 11 sur A et sur B", r18.marques.some((m) => m.x === 11 && m.y === 5 + 0.5 * 11) && r18.marques.some((m) => m.x === 11 && Math.abs(m.y - 1.25 ** 11) < 0.001));

  affiche(19, "print(plus_rapide(T), C, sum(T) / len(T))", "4 [312, 617, 915, 1216, 1500] 300.0");
  casesJustes(19, "schema", [[312, 305, 298, 301, 284], [312, 617, 915, 1216, 1500]]);
  ecrit(19, "C vaut [312, 617, 915, 1216, 1500]");
  v.ok("19. 284 s = 4 min 44 s ; 1 500 s = 25 min ; 300 s = 5 min", 4 * 60 + 44 === 284 && 1500 / 60 === 25 && 300 / 60 === 5);

  const s20 = affiche(20, "print(newton(1, 4))", "[1, 1.5, 1.4166666666666667, 1.4142156862745099, 1.4142135623746899]");
  v.ok("20. l'énoncé cite exactement cette sortie", e(20).includes(`« ${s20} »`));
  const r2 = "41421356237309504880";
  const justes = JSON.parse(s20 || "[]").map((x) => { const d = String(x).split(".")[1] ?? ""; let k = 0; while (k < d.length && d[k] === r2[k]) k++; return k; });
  v.ok("20. décimales justes : 0, 2, 5, 11", JSON.stringify(justes.slice(1)) === "[0,2,5,11]" && ["aucune décimale juste", "$2$ décimales", "$5$ décimales", "$11$ décimales"].every((t) => c(20).includes(t)), JSON.stringify(justes));
  v.ok("20. x₂ = 17/12", Math.abs(1.5 - (1.5 ** 2 - 2) / 3 - 17 / 12) < 1e-15 && c(20).includes("\\dfrac{17}{12}"));
  const r20 = reperes(b(20))[0];
  v.ok("20. la tangente dessinée passe par (1 ; −1), de pente 2, et coupe l'axe en 1,5", ligne(r20.q[1], 1) === -1 && r20.q[1][1] === 2 && ligne(r20.q[1], 1.5) === 0 && r20.marques.every((m) => Math.abs(m.x * m.x - 2 - m.y) < 1e-12 || m.y === 0));
}

const FICHIER = "lib/fiches-exercices/maths-premiere-algorithmique.tsx";
process.on("exit", () => {
  // Le bilan en une ligne : les contrôles faux de la passe propre, casses ratées comprises.
  const v = creerVerif(false);
  const source = fs.readFileSync(path.join(RACINE, FICHIER), "utf8");
  try { verifier(source, v); } catch (err) { v.ok("recalcul", false, String(err)); }
  controlesCommuns(v, source, { notionId: "algorithmique", classe: "premiere-spe" });
  const n = v.erreurs() + (process.exitCode && !v.erreurs() ? 1 : 0);
  console.log(`\n${n} fausses`);
});

lancer({
  nom: "ALGORITHMIQUE ET PROGRAMMATION · 1re spé · 20 exercices",
  fichier: FICHIER,
  notionId: "algorithmique",
  classe: "premiere-spe",
  verifier,
  casses: [
    ["ex. 1 : la trace fausse", "[2, 2, 3], [3, 3, 5]]", "[2, 2, 3], [3, 3, 6]]"],
    ["ex. 2 : la liste B dessinée fausse", "{ nom: \"B\", valeurs: [0, 3, 6, 9] }", "{ nom: \"B\", valeurs: [3, 6, 9, 12] }"],
    ["ex. 3 : la liste de l'énoncé dessinée autrement", "cases([{ nom: \"L\", valeurs: [5, 8, 2, 9, 4] }])", "cases([{ nom: \"L\", valeurs: [5, 8, 2, 9, 1] }])"],
    ["ex. 4 : le test à l'envers", "\"    if x > m:\"", "\"    if x < m:\""],
    ["ex. 5 : le rang faux dans la trace", "[3, 35, \"u₄\"]", "[3, 35, \"u₃\"]"],
    ["ex. 6 : un discriminant faux", "[\"(2, 3, −5)\", 49, 2]", "[\"(2, 3, −5)\", 47, 2]"],
    ["ex. 7 : le seuil changé dans le programme", "\"while s <= 30:\"", "\"while s <= 36:\""],
    ["ex. 9 : un point faux", "{ x: 4, y: 7 }", "{ x: 4, y: 8 }"],
    ["ex. 10 : un jour de pluie en plus", "\"mm = [0, 12, 3, 0, 25, 9, 0]\"", "\"mm = [0, 12, 3, 1, 25, 9, 0]\""],
    ["ex. 11 : un écart dessiné sans son signe", "valeurs: [130, 160, -30, 140]", "valeurs: [130, 160, 30, 140]"],
    ["ex. 12 : un terme arrondi dans le repère", "{ x: 6, y: 7.196736 }", "{ x: 6, y: 7.2 }"],
    ["ex. 13 : un pas changé", "\"     [1, 0.1, 0.01]]\"", "\"     [1, 0.1, 0.001]]\""],
    ["ex. 14 : un point d'Euler faux", "[0.75, 1.953125], [1, 2.44140625]], couleur", "[0.75, 1.95], [1, 2.44140625]], couleur"],
    ["ex. 15 : n oublié dans ses diviseurs", "\"    for d in range(1, n + 1):\"", "\"    for d in range(1, n):\""],
    ["ex. 16 : la trace de u fausse", "[4, 1.9375, 0.03125]", "[4, 1.9375, 0.0625]"],
    ["ex. 17 : le gain du 6 changé", "\"        return 5\"", "\"        return 6\""],
    ["ex. 18 : 20 % au lieu de 25 %", "\"    b = b * 1.25\"", "\"    b = b * 1.2\""],
    ["ex. 19 : un cumul faux", "valeurs: [312, 617, 915, 1216, 1500]", "valeurs: [312, 617, 915, 1216, 1501]"],
    ["ex. 20 : les décimales justes mal comptées", "$11$ décimales", "$12$ décimales"],
    ["rendu : un dessin de plus à l'impression", "schema: ecranSeulement(cases([{ nom: \"A et C\"", "schema: (cases([{ nom: \"A et C\""],
    ["rendu : une vraie fin de ligne dans une chaîne", "a) A est écrite en EXTENSION", "a) A est écrite\nen EXTENSION"],
    ["rendu : une ligne de code de plus de 30 signes", "\"    k = len(diviseurs(n))\"", "\"    k = len(diviseurs(n)) + 0 * 1\""],
    ["rendu : un repère de 13 unités sans « grand »", "{ x: 5, y: 11 }], undefined, true)", "{ x: 5, y: 11 }], undefined, false)"],
  ],
});
