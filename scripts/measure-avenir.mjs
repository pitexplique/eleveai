// Mesure du vivier « Concours Avenir » : combien d'items de nos banques
// sont utilisables tels quels dans une épreuve blanche ?
// Critères Avenir : QCU (une seule bonne réponse) à 4 propositions.
// Parsing statique des .bank.ts (même esprit que audit-prereq-graph.mjs).
import fs from "node:fs";
import path from "node:path";

const NIVEAU = process.argv[2] || "terminale-spe";
const DIFF_MIN = Number(process.argv[3] || 3); // niveau concours : on écarte le trop facile
const ROOT = path.resolve(`lib/tutor-v4/questionBank/${NIVEAU}/maths`);

// Sections officielles de l'épreuve (sujet 2026) -> notions de nos banques.
const SECTIONS = {
  "Calculs numériques et suites": [
    "suite_numerique",
    "limite_suite",
    "algorithmique_python",
  ],
  "Études de fonctions": [
    "derivation_fonction",
    "limite_fonction",
    "continuite_tvi",
    "convexite_fonction",
    "fonction_exponentielle",
    "fonction_logarithme",
  ],
  "Probabilités et dénombrement": [
    "probabilite_conditionnelle",
    "variable_aleatoire",
    "loi_binomiale",
    "denombrement_combinatoire",
    "concentration_echantillonnage",
  ],
  "Équations différentielles, primitives et calcul intégral": [
    "equation_differentielle",
    "primitive_integrale",
  ],
  Géométrie: ["geometrie_espace", "produit_scalaire_espace"],
};

// Extrait le contenu d'un tableau `champ: [ ... ]` en respectant les chaînes
// (le LaTeX contient des crochets : "$[1;+\infty[$").
function readArray(src, from) {
  const start = src.indexOf("[", from);
  if (start === -1) return null;
  let depth = 0;
  let inStr = false;
  for (let i = start; i < src.length; i += 1) {
    const c = src[i];
    if (inStr) {
      if (c === "\\") i += 1;
      else if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') inStr = true;
    else if (c === "[") depth += 1;
    else if (c === "]") {
      depth -= 1;
      if (depth === 0) return src.slice(start + 1, i);
    }
  }
  return null;
}

function countStrings(chunk) {
  let n = 0;
  let inStr = false;
  for (let i = 0; i < chunk.length; i += 1) {
    const c = chunk[i];
    if (inStr) {
      if (c === "\\") i += 1;
      else if (c === '"') {
        inStr = false;
        n += 1;
      }
      continue;
    }
    if (c === '"') inStr = true;
  }
  return n;
}

function parseBank(file) {
  const src = fs.readFileSync(file, "utf8");
  const items = [];
  const marks = [...src.matchAll(/kind:\s*"(fixed|template)"/g)];
  marks.forEach((m, i) => {
    const start = m.index;
    const end = i + 1 < marks.length ? marks[i + 1].index : src.length;
    const chunk = src.slice(start, end);
    if (m[1] === "template") {
      items.push({ kind: "template" });
      return;
    }
    const notionId = /notionId:\s*"([^"]+)"/.exec(chunk)?.[1] ?? null;
    const difficulty = Number(/difficulty:\s*(\d)/.exec(chunk)?.[1] ?? 0);
    const format = /format:\s*"([^"]+)"/.exec(chunk)?.[1] ?? null;
    const canvas = /\bcanvas:/.test(chunk);
    let nbChoices = 0;
    let nbExpected = 0;
    const ci = chunk.search(/\bchoices:/);
    if (ci !== -1) nbChoices = countStrings(readArray(chunk, ci) ?? "");
    const ei = chunk.search(/\bexpected:/);
    if (ei !== -1) nbExpected = countStrings(readArray(chunk, ei) ?? "");
    items.push({ kind: "fixed", notionId, difficulty, format, nbChoices, nbExpected, canvas });
  });
  return items;
}

const all = [];
for (const f of fs.readdirSync(ROOT).filter((f) => f.endsWith(".bank.ts"))) {
  all.push(...parseBank(path.join(ROOT, f)));
}

const fixed = all.filter((i) => i.kind === "fixed");
// Éligible Avenir : QCU strict à 4 propositions, une seule bonne réponse.
const eligible = fixed.filter(
  (i) => i.format === "qcm" && i.nbChoices === 4 && i.nbExpected === 1 && i.difficulty >= DIFF_MIN
);

const byNotion = new Map();
for (const i of eligible) byNotion.set(i.notionId, (byNotion.get(i.notionId) ?? 0) + 1);

console.log(`\n=== Vivier Concours Avenir — ${NIVEAU} (difficulté >= ${DIFF_MIN}) ===\n`);
console.log(`Items 'fixed' au total ......... ${fixed.length}`);
console.log(`QCM (tous formats) ............. ${fixed.filter((i) => i.format === "qcm").length}`);
console.log(`QCU 4 propositions, 1 réponse .. ${fixed.filter((i) => i.format === "qcm" && i.nbChoices === 4 && i.nbExpected === 1).length}`);
console.log(`  dont difficulté >= ${DIFF_MIN} ......... ${eligible.length}   <-- VIVIER`);
console.log(`  dont avec figure (canvas) ..... ${eligible.filter((i) => i.canvas).length}`);

console.log(`\n--- Par section de l'épreuve ---`);
let totalCible = 0;
for (const [section, notions] of Object.entries(SECTIONS)) {
  const n = notions.reduce((s, id) => s + (byNotion.get(id) ?? 0), 0);
  totalCible += n;
  // le sujet officiel propose 12 questions par section
  const epreuves = Math.floor(n / 12);
  console.log(`${String(n).padStart(4)} items | ${epreuves} épreuve(s) sans répétition | ${section}`);
}

console.log(`\n--- Par notion ---`);
[...byNotion.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([id, n]) => console.log(`${String(n).padStart(4)}  ${id}`));

const epreuvesCompletes = Math.min(
  ...Object.values(SECTIONS).map((notions) =>
    Math.floor(notions.reduce((s, id) => s + (byNotion.get(id) ?? 0), 0) / 12)
  )
);
console.log(`\n=> ${totalCible} items éligibles`);
console.log(`=> ${epreuvesCompletes} épreuves blanches complètes (60 q, 12/section) SANS aucune répétition`);
console.log(`=> soit ${epreuvesCompletes * 60} questions distinctes jouables\n`);
