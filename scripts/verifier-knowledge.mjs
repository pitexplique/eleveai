// scripts/verifier-knowledge.mjs
//
// Contrôle la structure d'une classe : bo → notions → micro-compétences, et
// situations.ts s'il existe. Rejoue les règles de buildKnowledge() SANS lancer
// Next, plus trois vérifications que buildKnowledge ne fait pas :
//   - une notion sans micro-compétence (invisible au coach) ;
//   - un domaine sans notion (invisible partout) ;
//   - une situation rattachée à un identifiant qui n'est pas une notion
//     (l'erreur facile : y écrire un microId, qui se ressemble à s'y méprendre).
//
//   node --experimental-strip-types scripts/verifier-knowledge.mjs premiere
//   node --experimental-strip-types scripts/verifier-knowledge.mjs seconde maths
//
// Le second argument est la matière (« maths » par défaut).

import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const classe = process.argv[2];
const matiere = process.argv[3] ?? "maths";

if (!classe) {
  console.error("Usage : node --experimental-strip-types scripts/verifier-knowledge.mjs <classe> [matiere]");
  process.exit(2);
}

const dossier = path.resolve(process.cwd(), "lib/tutor-v4/knowledge", matiere, classe);
if (!existsSync(dossier)) {
  console.error(`Dossier introuvable : ${dossier}`);
  process.exit(2);
}

const charger = async (fichier) => import(pathToFileURL(path.join(dossier, fichier)).href);

const { bo } = await charger("bo.ts");
const { notions } = await charger("notions.ts");
const { microSkills } = await charger("microSkills.ts");

const cheminSituations = path.join(dossier, "situations.ts");
const situations = existsSync(cheminSituations)
  ? (await charger("situations.ts")).situations
  : null;

const erreurs = [];

const doublons = (items, quoi) => {
  const vus = new Set();
  for (const item of items) {
    if (vus.has(item.id)) erreurs.push(`Doublon ${quoi} : « ${item.id} »`);
    vus.add(item.id);
  }
};
doublons(notions, "notion");
doublons(microSkills, "micro");

const boIds = new Set(bo.map((b) => b.boId));
const notionIds = new Set(notions.map((n) => n.id));
const microIds = new Set(microSkills.map((m) => m.id));

for (const n of notions) {
  if (!boIds.has(n.boId)) erreurs.push(`Notion « ${n.id} » → domaine inconnu : « ${n.boId} »`);
  for (const p of n.prerequis) {
    if (!notionIds.has(p)) erreurs.push(`Notion « ${n.id} » → prérequis inconnu : « ${p} »`);
  }
}

for (const m of microSkills) {
  if (!notionIds.has(m.notionId)) erreurs.push(`Micro « ${m.id} » → notion inconnue : « ${m.notionId} »`);
  for (const p of m.prerequis) {
    if (!microIds.has(p)) erreurs.push(`Micro « ${m.id} » → prérequis inconnu : « ${p} »`);
  }
}

for (const n of notions) {
  if (!microSkills.some((m) => m.notionId === n.id)) {
    erreurs.push(`Notion « ${n.id} » : aucune micro-compétence, le coach ne pourra rien en faire`);
  }
}

for (const b of bo) {
  if (!notions.some((n) => n.boId === b.boId)) {
    erreurs.push(`Domaine « ${b.boId} » : aucune notion, il n'apparaîtra nulle part`);
  }
}

if (situations) {
  for (const [i, s] of situations.entries()) {
    for (const id of s.notionIds) {
      if (!notionIds.has(id)) {
        const indice = microIds.has(id) ? " (c'est une micro-compétence, pas une notion)" : "";
        erreurs.push(`Situation ${i + 1} (${s.discipline}) → notion inconnue : « ${id} »${indice}`);
      }
    }
  }
}

console.log(`${classe} / ${matiere}`);
console.log(`Domaines : ${bo.length}   Notions : ${notions.length}   Micros : ${microSkills.length}` +
  (situations ? `   Situations : ${situations.length}` : ""));

for (const b of bo) {
  const ns = notions.filter((n) => n.boId === b.boId);
  const nbMicros = microSkills.filter((m) => ns.some((n) => n.id === m.notionId)).length;
  console.log(`  ${b.boId}  ${String(ns.length).padStart(2)} notions  ${String(nbMicros).padStart(3)} micros  — ${b.label}`);
}

if (situations) {
  const couvertes = new Set(situations.flatMap((s) => s.notionIds));
  const sans = notions.filter((n) => !couvertes.has(n.id));
  if (sans.length) {
    console.log(`\n${sans.length} notion(s) sans situation — énoncés à inventer sans appui du BO :`);
    for (const n of sans) console.log(`  · ${n.id}`);
  }
}

if (erreurs.length) {
  console.log(`\n${erreurs.length} ERREUR(S) :`);
  for (const e of erreurs) console.log(`  ✗ ${e}`);
  process.exit(1);
}

console.log("\nAucune erreur.");
