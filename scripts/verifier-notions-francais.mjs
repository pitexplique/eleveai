// Vérifie qu'aucune notion de français ne dépasse CINQ micro-compétences.
//
// ⭐ POURQUOI CE SCRIPT EXISTE (24/08/2026). Règle de Frédéric, énoncée pour le
// CM2 le 20/08, pour la 6e le 22/08, et redite pour la 5e le 24/08 : « ils sont
// petits, donc 3-4 micros par notion, 5 au maximum », « il faut DÉCOUPER, pas
// enlever ». Elle a été enfreinte trois fois de suite, et chaque fois pour la
// même raison : le compte ne se voit nulle part. Une notion de dix-neuf micros
// ne fait rien tomber en panne — elle s'affiche dans le coach comme une liste
// que personne ne lit, et elle ne tient dans aucune fiche de cours.
//
// Il vérifie aussi les deux erreurs voisines, qui ne cassent rien non plus :
//   • une micro rattachée à une notion qui n'existe pas → elle disparaît du
//     coach en silence ;
//   • un prérequis qui pointe vers un id inexistant → il ne sert à personne, et
//     rien ne le dit.
//
// Usage : node scripts/verifier-notions-francais.mjs [classe…]
//         (sans argument : toutes les classes de français)
// Sortie : code 1 si une règle est enfreinte — utilisable en pré-commit.

import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

register("./lib/alias-loader.mjs", import.meta.url);

const RACINE = path.resolve("lib/tutor-v4/knowledge/francais");
const MAX_MICROS = 5;

const demandees = process.argv.slice(2);
const classes = (
  demandees.length
    ? demandees
    : fs
        .readdirSync(RACINE, { withFileTypes: true })
        .filter((e) => e.isDirectory() && e.name !== "shared")
        .map((e) => e.name)
).sort();

let fautes = 0;

for (const classe of classes) {
  const dossier = path.join(RACINE, classe);
  const { notions } = await import(pathToFileURL(path.join(dossier, "notions.ts")).href);
  const { microSkills } = await import(pathToFileURL(path.join(dossier, "microSkills.ts")).href);

  const parNotion = new Map(notions.map((n) => [n.id, []]));
  const orphelines = [];
  for (const micro of microSkills) {
    if (parNotion.has(micro.notionId)) parNotion.get(micro.notionId).push(micro.id);
    else orphelines.push(`${micro.id} → ${micro.notionId}`);
  }

  const trop = notions.filter((n) => parNotion.get(n.id).length > MAX_MICROS);
  const vides = notions.filter((n) => parNotion.get(n.id).length === 0);
  const idsMicros = new Set(microSkills.map((m) => m.id));
  const idsNotions = new Set(notions.map((n) => n.id));
  const prereqMicro = microSkills.flatMap((m) =>
    (m.prerequis ?? []).filter((p) => !idsMicros.has(p)).map((p) => `${m.id} → ${p}`)
  );
  const prereqNotion = notions.flatMap((n) =>
    (n.prerequis ?? []).filter((p) => !idsNotions.has(p)).map((p) => `${n.id} → ${p}`)
  );

  const maxi = Math.max(0, ...notions.map((n) => parNotion.get(n.id).length));
  const etat = trop.length || orphelines.length || prereqMicro.length || prereqNotion.length ? "⛔" : "✅";
  console.log(
    `\n${etat} ${classe.toUpperCase()} — ${notions.length} notions, ${microSkills.length} micros, ` +
      `maximum ${maxi} par notion`
  );

  for (const n of notions) {
    const nb = parNotion.get(n.id).length;
    const alerte = nb > MAX_MICROS ? `  ⛔ ${nb - MAX_MICROS} de trop` : nb === 0 ? "  ⚠️ vide" : "";
    console.log(`   ${String(nb).padStart(2)}  ${n.id.padEnd(30)} ${n.label}${alerte}`);
  }

  if (orphelines.length) console.log(`   ⛔ micros sans notion : ${orphelines.join(", ")}`);
  if (prereqMicro.length) console.log(`   ⛔ prérequis de micro cassés : ${prereqMicro.join(", ")}`);
  if (prereqNotion.length) console.log(`   ⛔ prérequis de notion cassés : ${prereqNotion.join(", ")}`);
  if (vides.length) console.log(`   ⚠️ notions sans aucune micro : ${vides.map((n) => n.id).join(", ")}`);

  fautes += trop.length + orphelines.length + prereqMicro.length + prereqNotion.length;
}

console.log(
  fautes
    ? `\n⛔ ${fautes} problème(s). La règle : ${MAX_MICROS} micros par notion au maximum, on découpe, on n'enlève pas.`
    : `\n✅ Toutes les classes vérifiées : ${MAX_MICROS} micros par notion au maximum, aucun rattachement cassé.`
);
process.exit(fautes ? 1 : 0);
