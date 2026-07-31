// Contrôle structurel des banques « concours » (format QCU officiel).
//
// Ne vérifie PAS les mathématiques — seulement ce qu'une machine peut voir.
// Écrit après avoir laissé passer deux défauts réels à la main :
//   - une question dont DEUX propositions étaient correctes ;
//   - deux distracteurs mathématiquement identiques (e×e^{-2x} et e^{1-2x}),
//     qu'un candidat peut éliminer ensemble.
//
// Usage : node scripts/valider-banques-concours.mjs [niveau]

import fs from "node:fs";
import path from "node:path";

const NIVEAU = process.argv[2] || "terminale-spe";
const ROOT = path.resolve(`lib/tutor-v4/questionBank/${NIVEAU}/maths`);
const MICRO_SRC = path.resolve(`lib/tutor-v4/knowledge/maths/${NIVEAU}/microSkills.ts`);

const microsConnus = new Set(
  [...fs.readFileSync(MICRO_SRC, "utf8").matchAll(/id:\s*"([a-z0-9_]+)"/g)].map((m) => m[1])
);

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

function extraireChaines(chunk) {
  const out = [];
  let inStr = false;
  let buf = "";
  for (let i = 0; i < chunk.length; i += 1) {
    const c = chunk[i];
    if (inStr) {
      if (c === "\\") {
        buf += c + (chunk[i + 1] ?? "");
        i += 1;
      } else if (c === '"') {
        inStr = false;
        out.push(buf);
        buf = "";
      } else buf += c;
      continue;
    }
    if (c === '"') inStr = true;
  }
  return out;
}

/** Normalise une proposition pour repérer deux écritures du même objet. */
function normaliser(s) {
  return s
    .replace(/\\[,;!]/g, "")
    .replace(/\\dfrac/g, "\\frac")
    .replace(/\\times\s*/g, "*")
    .replace(/[\s{}$]/g, "")
    .toLowerCase();
}

const problemes = [];
const vusIds = new Set();
let nbItems = 0;

const fichiers = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith("-concours.bank.ts"));

if (fichiers.length === 0) {
  console.log("Aucune banque « -concours.bank.ts » trouvée.");
  process.exit(0);
}

for (const fichier of fichiers) {
  const src = fs.readFileSync(path.join(ROOT, fichier), "utf8");
  const marks = [...src.matchAll(/kind:\s*"(fixed|template)"/g)];

  marks.forEach((m, i) => {
    const chunk = src.slice(m.index, i + 1 < marks.length ? marks[i + 1].index : src.length);
    const id = /\bid:\s*"([^"]+)"/.exec(chunk)?.[1] ?? "(sans id)";
    const ou = `${fichier} · ${id}`;
    nbItems += 1;

    if (m[1] === "template") {
      problemes.push(`${ou} : item « template » — non tirable par l'épreuve.`);
      return;
    }

    if (vusIds.has(id)) problemes.push(`${ou} : identifiant en double.`);
    vusIds.add(id);

    const micro = /microId:\s*"([a-z0-9_]+)"/.exec(chunk)?.[1];
    if (!micro || !microsConnus.has(micro)) {
      problemes.push(`${ou} : microId inconnu « ${micro} ».`);
    }

    const format = /format:\s*"([^"]+)"/.exec(chunk)?.[1];
    if (format !== "qcm") problemes.push(`${ou} : format « ${format} » (attendu : qcm).`);

    const diff = Number(/difficulty:\s*(\d)/.exec(chunk)?.[1] ?? 0);
    if (diff < 3) problemes.push(`${ou} : difficulté ${diff} — écartée du tirage concours.`);

    if (/\bcanvas:/.test(chunk)) problemes.push(`${ou} : contient un canvas (exclu).`);

    const ci = chunk.search(/\bchoices:/);
    const ei = chunk.search(/\bexpected:/);
    const choix = ci === -1 ? [] : extraireChaines(readArray(chunk, ci) ?? "");
    const attendu = ei === -1 ? [] : extraireChaines(readArray(chunk, ei) ?? "");

    if (choix.length !== 4) problemes.push(`${ou} : ${choix.length} propositions (attendu : 4).`);
    if (attendu.length !== 1) problemes.push(`${ou} : ${attendu.length} réponses correctes (attendu : 1).`);

    if (attendu.length === 1 && !choix.includes(attendu[0])) {
      problemes.push(`${ou} : la réponse attendue ne figure pas parmi les propositions.`);
    }

    // Deux propositions identiques (au strict) ou équivalentes (après normalisation).
    const vues = new Map();
    for (const c of choix) {
      const cle = normaliser(c);
      if (vues.has(cle)) {
        problemes.push(
          `${ou} : propositions équivalentes « ${vues.get(cle)} » et « ${c} » — éliminables ensemble.`
        );
      }
      vues.set(cle, c);
    }

    if (!/\bhint:/.test(chunk)) problemes.push(`${ou} : pas d'indice.`);
    if (!/\bexplanation:/.test(chunk)) problemes.push(`${ou} : pas d'explication.`);
  });
}

console.log(`\n${nbItems} items contrôlés dans ${fichiers.length} banque(s) « concours ».\n`);

if (problemes.length === 0) {
  console.log("Aucun problème structurel détecté.");
  console.log("(Rappel : la justesse mathématique, elle, reste à relire à la main.)\n");
  process.exit(0);
}

console.log(`${problemes.length} problème(s) :\n`);
problemes.forEach((p) => console.log(`  - ${p}`));
console.log();
process.exit(1);
