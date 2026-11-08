// scripts/metiers-pour-video.ts — quel métier montrer dans une vidéo (08/11/2026).
//
//   npx tsx scripts/metiers-pour-video.ts 4e nombre_premier
//   npx tsx scripts/metiers-pour-video.ts 6e            (toutes les notions)
//
// Lit la matrice métiers (lib/matrice/metiers.ts). Les métiers marqués
// « déjà en vidéo » sont ceux qu'une vidéo de la notion montre déjà : pour un
// nouvel épisode, en prendre un AUTRE (varier les décors et les métiers,
// filles et garçons), ou en inventer un du catalogue et l'ajouter à la matrice.

import { NOTIONS_COACH } from "../lib/matrice/notions.generated";
import { metiersDeLaNotion } from "../lib/matrice/metiers";

const [classe, notion] = process.argv.slice(2);
if (!classe || !NOTIONS_COACH.maths[classe]) {
  console.log(`Usage : npx tsx scripts/metiers-pour-video.ts <classe> [notion]\nClasses : ${Object.keys(NOTIONS_COACH.maths).join(", ")}`);
  process.exit(1);
}
const notions = NOTIONS_COACH.maths[classe].filter((n) => !notion || n.id === notion);
if (!notions.length) {
  console.log(`Notion inconnue en ${classe} : ${notion}`);
  process.exit(1);
}
for (const n of notions) {
  console.log(`\n## ${classe} · ${n.id} — ${n.label}`);
  for (const m of metiersDeLaNotion(classe, n.id))
    console.log(`- ${m.phrase}${m.enVideo ? "   [déjà en vidéo]" : ""}${m.reunion ? "   [974]" : ""}   (${m.centres.join(", ")} ; ${m.etudes})`);
}
