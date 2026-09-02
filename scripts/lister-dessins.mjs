// scripts/lister-dessins.mjs
//
// TOUS LES DESSINS DISPONIBLES, SUR SIMPLE DEMANDE.
//
// ── POURQUOI (02/09/2026) ─────────────────────────────────────────────────────
// Frédéric : « il faudrait que tu aies en mémoire tous les dessins possibles »,
// « qu'on puisse consulter dans d'autres sessions », « et avoir la liste sur
// simple demande de ma part ».
//
// ⛔ UNE LISTE RECOPIÉE À LA MAIN SE PÉRIME EN SILENCE. Le catalogue
// (lib/canvas/CATALOGUE.md) explique ce que chaque dessin MONTRE — c'est sa
// valeur, et aucun script ne l'écrira. Mais l'INVENTAIRE, lui, se calcule : il
// est déjà écrit une fois, dans les types. On le relit là où il vit.
//
// ⭐ ET LE SCRIPT VÉRIFIE EN PASSANT CE QU'AUCUN TYPECHECK NE VOIT : un `kind`
// déclaré dans les types mais absent du `switch` de CanvasRenderer compile
// parfaitement et ne dessine RIEN — la fiche affiche un blanc. C'est le même
// genre de trou que la matrice d'entrée du coach : la déclaration ne prouve pas
// le branchement.
//
// ── USAGE ────────────────────────────────────────────────────────────────────
//   node scripts/lister-dessins.mjs           → l'inventaire
//   node scripts/lister-dessins.mjs --verifier → ne sort que les anomalies
//                                                (code 1 s'il y en a)

import fs from "node:fs";
import path from "node:path";

const RACINE = process.cwd();
const TYPES = path.join(RACINE, "lib/tutor-v4/types_canvas.ts");
const RENDU = path.join(RACINE, "lib/canvas/CanvasRenderer.tsx");
const CATALOGUE = path.join(RACINE, "lib/canvas/CATALOGUE.md");

const source = fs.readFileSync(TYPES, "utf8");
const rendu = fs.readFileSync(RENDU, "utf8");
const catalogue = fs.existsSync(CATALOGUE) ? fs.readFileSync(CATALOGUE, "utf8") : "";

/** Les membres d'une union de chaines : `export type X = "a" | "b";` */
function union(nom) {
  const m = new RegExp(`export type ${nom}\\s*=([\\s\\S]*?);`).exec(source);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

const kinds = [...new Set([...source.matchAll(/\bkind:\s*"([a-zA-Z_0-9]+)"/g)].map((m) => m[1]))].sort();
const branches = new Set([...rendu.matchAll(/case\s+"([a-zA-Z_0-9]+)"\s*:/g)].map((m) => m[1]));

// La ligne du catalogue qui décrit un kind : « | `nom` | ce qu'il montre | … »
const decrits = new Map();
for (const l of catalogue.split("\n")) {
  const m = /^\|\s*`([a-zA-Z_0-9]+)`\s*\|\s*([^|]+)\|/.exec(l);
  // ⚠️ LE PREMIER GAGNE. `personnage` et `objets` apparaissent deux fois dans le
  // catalogue : d'abord dans le tableau des kinds, puis en tête de leur section
  // détaillée où la première colonne liste leurs valeurs. Sans cette garde, la
  // description affichée devenait « nina (couettes) · teo (épis)… » au lieu de
  // ce que le canvas montre.
  if (m && !decrits.has(m[1])) decrits.set(m[1], m[2].replace(/\*\*/g, "").trim());
}

const inventaires = [
  ["personnage", "PersonnageId", "qui"],
  ["personnage", "PersonnagePose", "pose"],
  ["personnage", "PersonnageExpression", "expression"],
  ["objets", "ObjetId", "quoi"],
];

const orphelins = kinds.filter((k) => !branches.has(k));
const fantomes = [...branches].filter((k) => !kinds.includes(k)).sort();
const nonDecrits = kinds.filter((k) => !decrits.has(k));

const verifierSeulement = process.argv.includes("--verifier");

if (!verifierSeulement) {
  console.log(`\n${kinds.length} dessins disponibles — source : lib/tutor-v4/types_canvas.ts\n`);
  for (const k of kinds) {
    const d = decrits.get(k);
    const marque = branches.has(k) ? " " : "⛔";
    console.log(`${marque} ${k.padEnd(26)}${d ? d.slice(0, 84) : "— (absent du CATALOGUE)"}`);
  }

  for (const [kind, type, champ] of inventaires) {
    const vals = union(type);
    if (!vals.length) continue;
    console.log(`\n  ${kind}.${champ} — ${vals.length} valeurs`);
    console.log(`    ${vals.join(" · ")}`);
  }
  console.log(
    "\nCe que chaque dessin MONTRE, et quand ne pas l'employer : lib/canvas/CATALOGUE.md"
  );
}

const anomalies = [];
if (orphelins.length)
  anomalies.push(
    `⛔ déclaré dans les types mais ABSENT du switch de CanvasRenderer — la fiche affichera un blanc :\n     ${orphelins.join(", ")}`
  );
if (fantomes.length)
  anomalies.push(`⚠️ branché dans CanvasRenderer sans type correspondant :\n     ${fantomes.join(", ")}`);
if (nonDecrits.length)
  anomalies.push(`⚠️ absent du CATALOGUE (personne ne saura quand l'employer) :\n     ${nonDecrits.join(", ")}`);

if (anomalies.length) {
  console.log(`\n${anomalies.join("\n")}\n`);
  process.exit(1);
}
console.log("\n✅ chaque dessin est branché et décrit.\n");
