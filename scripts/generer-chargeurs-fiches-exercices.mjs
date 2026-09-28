// Fabrique lib/fiches-exercices/chargeurs.ts : pour chaque feuille du registre,
// la fonction qui charge SA donnée. Le composeur (/fiches-exercices/composer)
// en a besoin pour piocher dans plusieurs feuilles sans toutes les importer.
//
// La correspondance se LIT dans les pages : chacune importe sa donnée depuis
// `@/lib/fiches-exercices/<fichier>`. On ne la réécrit pas à la main.
//
// À relancer après chaque nouvelle feuille :
//   node scripts/generer-chargeurs-fiches-exercices.mjs

import { readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const racine = "app/fiches-exercices";
const registre = readFileSync("lib/fiches-exercices/registre.ts", "utf8");
const cles = [...registre.matchAll(/^\s*"([a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+)":\s*\{/gm)].map((m) => m[1]);

const lignes = [];
const manquantes = [];
for (const cle of cles) {
  const page = join(racine, cle, "page.tsx");
  let source;
  try {
    if (!statSync(page).isFile()) throw new Error();
    source = readFileSync(page, "utf8");
  } catch {
    manquantes.push(`${cle} (pas de page)`);
    continue;
  }
  const imp = source.match(/import\s*\{\s*(\w+)\s*\}\s*from\s*"(@\/lib\/fiches-exercices\/[\w-]+)"/);
  if (!imp) {
    manquantes.push(`${cle} (import introuvable)`);
    continue;
  }
  lignes.push(`  "${cle}": () => import("${imp[2]}").then((m) => m.${imp[1]}),`);
}

const sortie = `// ⚠️ FICHIER GÉNÉRÉ par scripts/generer-chargeurs-fiches-exercices.mjs — ne pas
// l'écrire à la main. Une feuille du registre → la fonction qui charge sa donnée.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

export const CHARGEURS_FICHES_EXERCICES: Record<string, () => Promise<FicheExercicesData>> = {
${lignes.join("\n")}
};
`;
writeFileSync("lib/fiches-exercices/chargeurs.ts", sortie);
console.log(`${lignes.length} chargeurs écrits sur ${cles.length} feuilles du registre.`);
if (manquantes.length) console.log("Sans chargeur :\n  " + manquantes.join("\n  "));
